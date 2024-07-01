import fs from 'fs';
import { serialize, deserialize } from 'bson';
import { v4 as uuidv4 } from 'uuid';
import { Schema } from './schema';

interface Document {
    _id?: string;
    [key: string]: any;
}

export class Collection {
    private documents: Document[] = [];
    private schema: Schema | null = null;
    private filePath: string;

    constructor(filePath: string, schema?: Schema) {
        this.filePath = filePath;
        this.load();
        if (schema) {
            this.schema = schema;
        }
    }

    setFilePath(filePath: string) {
        this.filePath = filePath;
        this.load();
    }

    private load() {
        if (fs.existsSync(this.filePath)) {
            const data = fs.readFileSync(this.filePath);
            const deserializedData = deserialize(data) as Document[];
            this.documents = Array.isArray(deserializedData) ? deserializedData : [];
        }
    }

    private save() {
        const data = serialize(this.documents);
        fs.writeFileSync(this.filePath, data);
    }

    insert(doc: Document): Document {
        if (this.schema) {
            this.schema.validate(doc);
        }
        if (!doc._id) {
            doc._id = uuidv4();
        }
        this.documents.push(doc);
        this.save();
        return doc;
    }

    find(query: Partial<Document>): Document[] {
        return this.documents.filter(doc => 
            Object.keys(query).every(key => doc[key] === query[key])
        );
    }

    findOne(query: Partial<Document>): Document | null {
        return this.documents.find(doc => 
            Object.keys(query).every(key => doc[key] === query[key])
        ) || null;
    }

    update(query: Partial<Document>, update: Partial<Document>): number {
        let updatedCount = 0;
        this.documents = this.documents.map(doc => {
            if (Object.keys(query).every(key => doc[key] === query[key])) {
                if (this.schema) {
                    this.schema.validate({ ...doc, ...update });
                }
                updatedCount++;
                return { ...doc, ...update };
            }
            return doc;
        });
        if (updatedCount > 0) {
            this.save();
        }
        return updatedCount;
    }

    delete(query: Partial<Document>): number {
        const initialLength = this.documents.length;
        this.documents = this.documents.filter(doc => 
            !Object.keys(query).every(key => doc[key] === query[key])
        );
        const deletedCount = initialLength - this.documents.length;
        if (deletedCount > 0) {
            this.save();
        }
        return deletedCount;
    }

    count(query: Partial<Document>): number {
        return this.find(query).length;
    }

    distinct(field: string): any[] {
        return [...new Set(this.documents.map(doc => doc[field]))];
    }

    findById(id: string): Document | null {
        return this.documents.find(doc => doc._id === id) || null;
    }

    findByIdAndUpdate(id: string, update: Partial<Document>): Document | null {
        const doc = this.findById(id);
        if (doc) {
            Object.assign(doc, update);
            if (this.schema) {
                this.schema.validate(doc);
            }
            this.save();
            return doc;
        }
        return null;
    }

    findByIdAndDelete(id: string): Document | null {
        const doc = this.findById(id);
        if (doc) {
            this.documents = this.documents.filter(d => d._id !== id);
            this.save();
            return doc;
        }
        return null;
    }
}
