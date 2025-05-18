// Middleware is a function that receives 3 params; it's a function that can 
//be used to handle request and response objects.

const unknownEndpoint = (request, response) => {
    return response.status(404).send({ error: "unknown endpoint"});
}

const errorHandler = (error, request, response, next) => {

    if (error.name === "CastError" ){
        return response.status(400).send({error: "Malformatted id"});
    }

    else if (error.name === "ValidationError"){
        return response.status(400).json({ error: error.message});
    }

    next(error);
}

module.exports = {unknownEndpoint, errorHandler};