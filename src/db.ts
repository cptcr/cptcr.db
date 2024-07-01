import fs from 'fs';
import path from 'path';
import { Model } from './model';
import { Schema } from './schema';

export class Database {
    private dbPath: string;
    private collections: { [key: string]: Model } = {};

    constructor(dbPath: string) {
        this.dbPath = dbPath;
        if (!fs.existsSync(dbPath)) {
            fs.mkdirSync(dbPath, { recursive: true });
        }
    }

    getDbPath(): string {
        return this.dbPath;
    }

    model(name: string, schema: Schema): Model {
        if (!this.collections[name]) {
            this.collections[name] = new Model(name, schema, this);
        }
        return this.collections[name];
    }
}
