// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use('GreenCloud');

// Create a new document in the collection.
db.getCollection('User').insertOne({
    email: 'user@example.com',
    password: 'user'

});
