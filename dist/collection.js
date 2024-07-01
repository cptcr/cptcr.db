"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collection = void 0;
const fs_1 = __importDefault(require("fs"));
const bson_1 = require("bson");
const uuid_1 = require("uuid");
class Collection {
    constructor(filePath, schema) {
        this.documents = [];
        this.schema = null;
        this.filePath = filePath;
        this.load();
        if (schema) {
            this.schema = schema;
        }
    }
    setFilePath(filePath) {
        this.filePath = filePath;
        this.load();
    }
    load() {
        if (fs_1.default.existsSync(this.filePath)) {
            const data = fs_1.default.readFileSync(this.filePath);
            const deserializedData = (0, bson_1.deserialize)(data);
            this.documents = Array.isArray(deserializedData) ? deserializedData : [];
        }
    }
    save() {
        const data = (0, bson_1.serialize)(this.documents);
        fs_1.default.writeFileSync(this.filePath, data);
    }
    insert(doc) {
        if (this.schema) {
            this.schema.validate(doc);
        }
        if (!doc._id) {
            doc._id = (0, uuid_1.v4)();
        }
        this.documents.push(doc);
        this.save();
        return doc;
    }
    find(query) {
        return this.documents.filter(doc => Object.keys(query).every(key => doc[key] === query[key]));
    }
    findOne(query) {
        return this.documents.find(doc => Object.keys(query).every(key => doc[key] === query[key])) || null;
    }
    update(query, update) {
        let updatedCount = 0;
        this.documents = this.documents.map(doc => {
            if (Object.keys(query).every(key => doc[key] === query[key])) {
                if (this.schema) {
                    this.schema.validate(Object.assign(Object.assign({}, doc), update));
                }
                updatedCount++;
                return Object.assign(Object.assign({}, doc), update);
            }
            return doc;
        });
        if (updatedCount > 0) {
            this.save();
        }
        return updatedCount;
    }
    delete(query) {
        const initialLength = this.documents.length;
        this.documents = this.documents.filter(doc => !Object.keys(query).every(key => doc[key] === query[key]));
        const deletedCount = initialLength - this.documents.length;
        if (deletedCount > 0) {
            this.save();
        }
        return deletedCount;
    }
    count(query) {
        return this.find(query).length;
    }
    distinct(field) {
        return [...new Set(this.documents.map(doc => doc[field]))];
    }
    findById(id) {
        return this.documents.find(doc => doc._id === id) || null;
    }
    findByIdAndUpdate(id, update) {
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
    findByIdAndDelete(id) {
        const doc = this.findById(id);
        if (doc) {
            this.documents = this.documents.filter(d => d._id !== id);
            this.save();
            return doc;
        }
        return null;
    }
}
exports.Collection = Collection;
