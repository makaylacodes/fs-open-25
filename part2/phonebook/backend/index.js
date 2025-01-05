const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

// need to use "npm install dotenv" to make sure can access variables in .env file
require('dotenv').config()

const app = express()


// Middleware is a function that receives 3 params; it's a function that can 
//be used to handle request and response objects.
// Morgan is a library to simplify process, records details of each RESTful request

// Create a custom token for logging POST data
morgan.token('body', (req) => {
  return req.body && Object.keys(req.body).length > 0
    ? JSON.stringify(req.body)
    : ''
})

app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.json())


// Establishes constructor function that creates a new JS object, Person
const Person = require('./models/person')

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.get('/', (request, response) => {
    response.send('<h1>Hello World</h1>')
})

// Exercise 3.13, returns all person objects in the mongodb database
app.get('/info', (request, response) => {
    const dateTime = () => new Date().toString({})

    // Displays date, time, and number of persons in mongodb database
    Person.find({}).countDocuments({})
    .then(persons => {
      console.log("Success")
      console.log("This is persons count: ", persons)
    
      // What displays in the browser
      response.send(`<h1>Hello World</h1> <p>Phonebook has info for <b>${persons}</b> people</p>
        <p>${dateTime()}</p>`)
      })
    .catch((error) => {
      console.error("Error fetching count:", error);
      response.status(500).send("Internal Server Error");
    })

    
})

// returns the entire list of persons, person objects with names, numbers, and ids
app.get('/api/persons', (request, response, next) => {
  try{
    Person.find({}).then(persons => {
      if(!persons){
        app.use(unknownEndpoint)
      }
      response.json(persons)
      console.log("phonebook:")
      persons.forEach(person => {
        console.log(`${person.name} ${person.number}`)
      })
    })
  }
  catch (error){
    next(error)
  }
})

const generateId = () => {

  Person.find({}).countDocuments({})
    .then(persons => {
      console.log("This is persons count: ", persons)
      return 30
    })
    .catch((error) => {
      //displays in terminal
      console.error("Error fetching count:", error)
      //displays in browser
      response.status(500).send("Internal Server Error")
    })


    /* const maxId = persons.length > 0
      ? Math.max(...persons.map(person => Number(person.id)))
      : 0
    return String(maxId + 1) */
}

// Exercise 3.5, implement functionality to add a new person to the phonebook + generate a new ID
app.post('/api/persons', (request, response) => {
    
    const body = request.body
    console.log("this is request.body : ", body)

    if (body.content) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
  
    const person = new Person({
        name: body.name,
        number: body.number,
        id: generateId()
      })

    if (!person.name){
        return response.status(400).json({
            error: 'name is missing'
        })
    }
    else if (!person.number){
        return response.status(400).json({
            error: 'number is missing'
        })
        }
    
  /*  else if (persons.find((p) => p.name === person.name) || persons.find((p) => p.number === person.number)){
        return response.status(400).json({
            error: 'name must be unique'
        }) 
    }*/
    console.log("This is the new person object : ", person)
    person.save().then(savedPerson => {
      response.json(savedPerson)
    })
  })

// returns one specific person object in the persons list
// Exercise 3.13, implement functionality to display a single entry from the mongodb database
app.get('/api/persons/:id', (request, response) => {
    // saves the id of the person being requested in the url
    const id = request.params.id

    Person.findOne({id: id}).then(person => {
      // If no person with the id is found, send error message
      if(!person){
        app.use(unknownEndpoint)
      }

      // if person with id is found, then return that object
      response.json(person) 
    })
    
})

// deletes one specific person object in the persons list
// Exercise 3.4, implement functionality to delete one specific entry
app.delete('/api/persons/:id', (request, response) => {
    // saves the id of the person being requested in the url
    const id = request.params.id

    // update the array by filtering out the person with the id in the delete request, removes from list
    persons = persons.filter(person => person.id !== id)

    //return confirmation status, no content matching left for the id
    response.status(204).end()
})

const PORT = process.env.PORT || 3002

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
