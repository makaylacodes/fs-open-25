
const morgan = require('morgan');

// Morgan is a library to simplify process, records details of each RESTful request

// Create a custom token for logging HTTP request data
morgan.token('body', (req) => {
  return req.body && Object.keys(req.body).length > 0
    ? JSON.stringify(req.body)
    : ''
});

// Params for me to easily fill with whatever message needed
const error = (...params) => {
  console.log(...params)
}

// Params for me to easily fill with whatever message needed
const info = (...params) => {
  console.log(...params)
}
const morganLogger = morgan('Morgan method :method :url :status :res[content-length] - :response-time ms :body');

module.exports = {error, info, morganLogger};