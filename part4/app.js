const cors = require('cors');
const config = require('./utils/config');
const express = require('express');
const logger= require('./utils/logger');
const mongoose = require('mongoose');
const middleware = require('./utils/middleware');


const blogsRouter = require('./controllers/blogs');
const clientsRouter = require('./controllers/clients');

const app = express();

//const Blog = require('./models/blog');

mongoose.set('strictQuery',false);

mongoose
    .connect(config.MONGODB_URI)
    .then(result => {
        logger.info("Connected to MongoDB");
    })
    .catch(error => {
        logger.info("Error connecting to MongoDB", error.message);
    });

app.use(cors());

app.use(express.json());
app.use(logger.morganLogger); // need to have this line before the routes are declared to get it to load in console properly

app.use('/api/blogs', blogsRouter); // router for the api endpoints
app.use('/', clientsRouter); // router for the client frontend endpoints

app.use(middleware.unknownEndpoint); // middleware to handle unknown endpoints
app.use(middleware.errorHandler); // middleware to handle errors 

module.exports = app;