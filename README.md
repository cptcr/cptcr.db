
# CPTCR Database

A local database that mimics MongoDB using BSON files. This library provides a simple interface for creating collections, inserting, querying, updating, and deleting documents. It supports custom schemas and models similar to Mongoose.

## Installation

You can install the package via npm:

```sh
npm install cptcr.db
```

## Project Structure

```
cptcr.db/
├── dist/
├── node_modules/
├── src/
│   ├── collection.ts
│   ├── db.ts
│   ├── index.ts
│   ├── model.ts
│   └── schema.ts
├── test/
│   └── test.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Usage

### TypeScript

#### Define a Schema

Create a schema to define the structure of your documents.

```typescript
import { Schema } from 'cptcr.db';

const userSchema = new Schema({
    name: 'string',
    age: 'number',
    email: 'string'
});
```

#### Initialize the Database

Initialize the database and create a model.

```typescript
import { Database } from 'cptcr.db';

const db = new Database('./data');
const User = db.model('User', userSchema);
```

#### Insert a Document

Insert a document into the collection.

```typescript
const newUser = { name: 'John Doe', age: 30, email: 'john@example.com' };
const insertedUser = User.insert(newUser);
console.log('Inserted user:', insertedUser);
```

#### Query Documents

Find documents in the collection.

```typescript
const foundUsers = User.find({ name: 'John Doe' });
console.log('Found users:', foundUsers);
```

#### Update a Document

Update a document in the collection.

```typescript
const updatedCount = User.update({ name: 'John Doe' }, { age: 31 });
console.log('Updated users count:', updatedCount);
```

#### Delete a Document

Delete a document from the collection.

```typescript
const deletedCount = User.delete({ name: 'John Doe' });
console.log('Deleted users count:', deletedCount);
```

#### Count Documents

Count documents in the collection.

```typescript
const userCount = User.count({ name: 'John Doe' });
console.log('User count:', userCount);
```

#### Distinct Values

Get distinct values of a field in the collection.

```typescript
const distinctAges = User.distinct('age');
console.log('Distinct ages:', distinctAges);
```

#### Find by ID

Find a document by its ID.

```typescript
if (insertedUser._id) {
    const foundUser = User.findById(insertedUser._id);
    console.log('Found user by ID:', foundUser);

    // Update by ID
    const updatedUser = User.findByIdAndUpdate(insertedUser._id, { age: 32 });
    console.log('Updated user by ID:', updatedUser);

    // Delete by ID
    const deletedUser = User.findByIdAndDelete(insertedUser._id);
    console.log('Deleted user by ID:', deletedUser);
} else {
    console.error('Inserted user does not have an _id.');
}
```

#### Set Custom File Path

Set a custom file path for the collection.

```typescript
User.setFilePath('./data/customUsers.bson');
console.log('Custom file path set.');
```

### JavaScript

While this library is primarily written in TypeScript, you can also use it in a JavaScript project. The usage is similar but without type annotations.

#### Define a Schema

Create a schema to define the structure of your documents.

```javascript
const { Schema } = require('cptcr.db');

const userSchema = new Schema({
    name: 'string',
    age: 'number',
    email: 'string'
});
```

#### Initialize the Database

Initialize the database and create a model.

```javascript
const { Database } = require('cptcr.db');

const db = new Database('./data');
const User = db.model('User', userSchema);
```

#### Insert a Document

Insert a document into the collection.

```javascript
const newUser = { name: 'John Doe', age: 30, email: 'john@example.com' };
const insertedUser = User.insert(newUser);
console.log('Inserted user:', insertedUser);
```

#### Query Documents

Find documents in the collection.

```javascript
const foundUsers = User.find({ name: 'John Doe' });
console.log('Found users:', foundUsers);
```

#### Update a Document

Update a document in the collection.

```javascript
const updatedCount = User.update({ name: 'John Doe' }, { age: 31 });
console.log('Updated users count:', updatedCount);
```

#### Delete a Document

Delete a document from the collection.

```javascript
const deletedCount = User.delete({ name: 'John Doe' });
console.log('Deleted users count:', deletedCount);
```

#### Count Documents

Count documents in the collection.

```javascript
const userCount = User.count({ name: 'John Doe' });
console.log('User count:', userCount);
```

#### Distinct Values

Get distinct values of a field in the collection.

```javascript
const distinctAges = User.distinct('age');
console.log('Distinct ages:', distinctAges);
```

#### Find by ID

Find a document by its ID.

```javascript
if (insertedUser._id) {
    const foundUser = User.findById(insertedUser._id);
    console.log('Found user by ID:', foundUser);

    // Update by ID
    const updatedUser = User.findByIdAndUpdate(insertedUser._id, { age: 32 });
    console.log('Updated user by ID:', updatedUser);

    // Delete by ID
    const deletedUser = User.findByIdAndDelete(insertedUser._id);
    console.log('Deleted user by ID:', deletedUser);
} else {
    console.error('Inserted user does not have an _id.');
}
```

#### Set Custom File Path

Set a custom file path for the collection.

```javascript
User.setFilePath('./data/customUsers.bson');
console.log('Custom file path set.');
```