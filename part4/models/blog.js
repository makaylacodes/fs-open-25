const mongoose = require('mongoose'); 

const blogSchema = new mongoose.Schema({
    title: String,
    author:String,
    url: String,
    likes: Number,
});


// Check on this later, need it to remove the object id and v added auto in mongodb
blogSchema.set('toJSON', {   
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject.__v
        delete returnedObject._id
    }
});
    
// Establishes constructor function that creates a new JS object, Person and exports to index.js
module.exports = mongoose.model('Blog', blogSchema);

