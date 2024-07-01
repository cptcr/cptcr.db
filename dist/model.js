"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
const collection_1 = require("./collection");
class Model {
    constructor(name, schema, db) {
        this.collection = new collection_1.Collection(`${db.getDbPath()}/${name}.bson`, schema);
    }
    setFilePath(filePath) {
        this.collection.setFilePath(filePath);
    }
    insert(doc) {
        return this.collection.insert(doc);
    }
    find(query) {
        return this.collection.find(query);
    }
    findOne(query) {
        return this.collection.findOne(query);
    }
    update(query, update) {
        return this.collection.update(query, update);
    }
    delete(query) {
        return this.collection.delete(query);
    }
    count(query) {
        return this.collection.count(query);
    }
    distinct(field) {
        return this.collection.distinct(field);
    }
    findById(id) {
        return this.collection.findById(id);
    }
    findByIdAndUpdate(id, update) {
        return this.collection.findByIdAndUpdate(id, update);
    }
    findByIdAndDelete(id) {
        return this.collection.findByIdAndDelete(id);
    }
}
exports.Model = Model;
