import { Database } from './db';
import { Schema } from './schema';
import { Collection } from './collection';

export class Model {
    private collection: Collection;

    constructor(name: string, schema: Schema, db: Database) {
        this.collection = new Collection(`${db.getDbPath()}/${name}.bson`, schema);
    }

    setFilePath(filePath: string) {
        this.collection.setFilePath(filePath);
    }

    insert(doc: any) {
        return this.collection.insert(doc);
    }

    find(query: any) {
        return this.collection.find(query);
    }

    findOne(query: any) {
        return this.collection.findOne(query);
    }

    update(query: any, update: any) {
        return this.collection.update(query, update);
    }

    delete(query: any) {
        return this.collection.delete(query);
    }

    count(query: any) {
        return this.collection.count(query);
    }

    distinct(field: string) {
        return this.collection.distinct(field);
    }

    findById(id: string) {
        return this.collection.findById(id);
    }

    findByIdAndUpdate(id: string, update: any) {
        return this.collection.findByIdAndUpdate(id, update);
    }

    findByIdAndDelete(id: string) {
        return this.collection.findByIdAndDelete(id);
    }
}
