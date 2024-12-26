const express = require('express')
const app = express()
app.use(express.json())
let persons = [
      {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": "1"
      },
      {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": "2"
      },
      {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": "3"
      },
      {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": "4"
      },
      {
        "id": "5",
        "name": "Slappy Sa",
        "number": "453-53-4232"
      },
      {
        "id": "6",
        "name": "Angie Loew",
        "number": "232-4334"
      },
      {
        "name": "hi",
        "number": "1234",
        "id": "7"
      },
      {
        "name": "Jamie",
        "number": "75546",
        "id": "8"
      },
      {
        "name": "Hammajs ",
        "number": "1232324",
        "id": "9"
      },
      {
        "name": "bew",
        "number": "32324",
        "id": "100"
      }
    ]


app.get('/', (request, response) => {
    response.send('<h1>Hello World</h1>')
})

// returns the entire list of persons, person objects with names, numbers, and ids
app.get('/api/persons', (request, response) => {
    response.json(persons)
})

const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(person => Number(person.id)))
      : 0
    return String(maxId + 1)
  }

app.post('/api/persons', (request, response) => {
    
    const body = request.body
    console.log("this is request.body : ", body)

    if (body.content) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
  
    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
      }
    console.log("This is the new person object : ", person)
    persons = persons.concat(person)
  
    response.json(person)
  })
// returns one specific person object in the persons list
app.get('/api/persons/:id', (request, response) => {
    // saves the id of the person being requested in the url
    const id = request.params.id

    // saves the one person object that has an id that matches the id in url request
    const person = persons.find(person => person.id === id)

    // return that person object in json if the id exists, if not then 404 not found code returned
    person ? response.json(person) : response.status(404).end()
    
})

// deletes one specific person object in the persons list
app.delete('/api/persons/:id', (request, response) => {
    // saves the id of the person being requested in the url
    const id = request.params.id

    // update the array by filtering out the person with the id in the delete request, removes from list
    persons = persons.filter(person => person.id !== id)

    //return confirmation status, no content matching left for the id
    response.status(204).end()
})

const PORT = 3002

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})