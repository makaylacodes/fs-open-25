const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

// means that user will enter the password in the terminal when using the node cmd
const password = process.argv[2]

// Connection string provided by mongodb when created
const url =  `mongodb+srv://maat:${password}@personsdb.a8e4v.mongodb.net/personApp?retryWrites=true&w=majority&appName=personsDB`

mongoose.set('strictQuery',false)

mongoose.connect(url)

// Person schema sent to mongodb
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: String
})


// Establishes constructor function that creates a new JS object, Person
const Person = mongoose.model('Person', personSchema)

// Creates new Person object
const person = new Person({
    name: "Jamie",
    number: "75546",
    id: "1"
})

person.save().then(result => {
    // sends a success message to the console when person saved
  console.log('person saved!')
  mongoose.connection.close()
})


/* code block prints all the persons in the database to the console.
// {} are empty so everything is returned, can {name} to get specific results
Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })*/