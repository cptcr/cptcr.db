interface SchemaDefinition {
    [key: string]: any;
}

interface Document {
    [key: string]: any;
}

export class Schema {
    constructor(private definition: SchemaDefinition) {}

    validate(doc: Document): boolean {
        // Basic validation logic (this can be extended)
        for (const key of Object.keys(this.definition)) {
            if (!(key in doc)) {
                throw new Error(`Missing required field: ${key}`);
            }
            if (typeof doc[key] !== this.definition[key]) {
                throw new Error(`Expected ${key} to be of type ${this.definition[key]}, but got ${typeof doc[key]}`);
            }
        }
        return true;
    }
}
