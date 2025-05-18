require('dotenv').config();

const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const app = express();

const blogSchema = mongoose.Schema({
    title: String,
    author:String,
    url: String,
    likes: Number,
});

const Blog = mongoose.model('Blog', blogSchema);

const mongoUrl = process.env.MONGODB_URI;

mongoose.connect(mongoUrl);

app.use(express.json());

app.get('/api/blogs', (request, response) => {
    Blog
        .find({})
        .then((blogs) => {
            response.json(blogs);
            console.log("The list has been returned");
        })
})

app.post('/api/blogs', (request, response) => {
    const blog = new Blog(request.body);

    blog
        .save({})
        .then((result) => {
            response.status(201).json(result);
            console.log("The new blog has been posted");
        })
})

const PORT = 3003;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

/*

// Middleware is a function that receives three parameters: request, response, next
// Prints information about every request that is sent to the server; The next function yields control to the next middleware
const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}
app.use(requestLogger)

// This middleware will be used for catching requests made to non-existent routes.
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
  
app.use(unknownEndpoint)

app.use(cors())


    */