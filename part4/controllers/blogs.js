const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

// Returns all blogs 
blogsRouter.get('/', (request, response, next) => {
    Blog
        .find({})
        .then((blogs) => {
            response.json(blogs);
        })
        .catch(error => next(error));
});

// Returns a specific blog by id
blogsRouter.get('/:id', (request, response, next) => {
    Blog    
        .findById(request.params.id)
        .then(blog => {
            response.json(blog);
        })
        .catch(error => next(error));
});

// Adds new blog to the mongodb database
blogsRouter.post('/', (request, response) => {
    const body = request.body;

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    });

    blog
        .save()
        .then((result) => {
            response.status(201).json(result);
        })
        .catch(error => next(error));
});

// Updates a specific blog by id
blogsRouter.put('/:id', (request, response, next) => {
    const updatedBlog = request.body;

    Blog    
        .findById(request.params.id)
        .then(blog => {
            
            if (!blog){
                return response.status(404).end();
            }

            blog.title = updatedBlog.title;
            blog.author = updatedBlog.author;
            blog.url = updatedBlog.url;
            blog.likes = updatedBlog.likes;

            return blog.save().then(updatedObject => {
                response.json(updatedObject);
            });
        })
        .catch(error => next(error));
});

// Deletes a specific blog by id
blogsRouter.delete('/:id', (request, response, next) => {
    Blog
        .findByIdAndDelete(request.params.id)
        .then(() => {
            response.status(204).end();
        })
        .catch(error => next(error));
        
})

module.exports = blogsRouter;