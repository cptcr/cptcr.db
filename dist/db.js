"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const fs_1 = __importDefault(require("fs"));
const model_1 = require("./model");
class Database {
    constructor(dbPath) {
        this.collections = {};
        this.dbPath = dbPath;
        if (!fs_1.default.existsSync(dbPath)) {
            fs_1.default.mkdirSync(dbPath, { recursive: true });
        }
    }
    getDbPath() {
        return this.dbPath;
    }
    model(name, schema) {
        if (!this.collections[name]) {
            this.collections[name] = new model_1.Model(name, schema, this);
        }
        return this.collections[name];
    }
}
exports.Database = Database;
