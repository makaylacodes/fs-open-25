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

// means that user will enter the name in the terminal when using the node cmd
const name = process.argv[3]

// means that user will enter the number in the terminal when using the node cmd
const number = process.argv[4]

if (!name || !number) {
    // code block prints all the persons in the database to the console.
    Person.find({}).then(result => {
        console.log("phonebook:")
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
} else {
    // Creates new Person object if the user provided name and number in terminal
    const person = new Person({
        name,
        number,
        id: "1"
    })


    person.save().then(result => {
        // sends a success message to the console when person saved
        console.log(`added ${result.name} ${result.number} to phonebook`)
        mongoose.connection.close()
    })
}