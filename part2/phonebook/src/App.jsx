import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

// Passed the whole object for person, displays individual names
const Person = ({person}) => {
  console.log(`This person's name is ${person.name}`)
  return (
    <li > {person.name} : {person.number} </li>
  )
}

// Titles
const Title = ({text}) => {
  return (
    <h3>{text}</h3>
  )
}

// Form to add a new person
const Form = ({addPerson, newName, newNumber, onNameChange, onNumChange}) => {
  return (
    <form onSubmit={addPerson}>

      <Title text={"Add a new"} />

      <div>
        Name: <input value={newName} onChange={onNameChange} />
        Number: <input value={newNumber} onChange={onNumChange} />
      </div>

      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

// Component returns a list of all the people stored in the persons object
const Persons = ({persons}) => {
  return (
    <div>
      <Title text={"Numbers"} />
      <ol>
        {persons.map(person => {
          return(
            <div key={person.name}>
              <Person person={person} />
            </div> 
          )
        })}
      </ol> 
    </div>
  )
}

const Filter = ({search, onChange}) => {
  return(
    <div>
      Search: <input value={search} onChange={onChange} />
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setName] = useState('')
  const [newNumber, setNumber] = useState('')
  const [search, setSearch] = useState('')

  const hook = () => {
    console.log('effect')
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }
  useEffect(hook, [])
  console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked')

    // If name already exists in the list, prevented from adding + a notice
    if (persons.some(person => {
      return person.name === newName && person.number === newNumber})) {
      alert(`${newName} is already added to phonebook`);
      return; // Exit the function
    }

    // keeps the ids in numerical order
    const maxId = persons.length > 0 ? Math.max(...persons.map(person => person.id)) : 0;

    // creates a new object with provided input
    const personObject = {
      name: newName,
      number: newNumber,
      id: maxId + 1
    }

    personService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setName('')
        setNumber('')
      })
  }

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const handleNumChange = (event) => {
    setNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  // Saves a list of people that match the name in the search. If no search input, 
  // then the whole list of people is returned
  const filteredPersons = search
    ? persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
    : persons;

  return (
    <div>

      <h2>Phonebook</h2>
      <Form addPerson={addPerson} newName={newName} newNumber={newNumber} onNameChange={handleNameChange} onNumChange={handleNumChange}/>
      <br />
      <Filter search={search} onChange={handleSearchChange} />
      <Persons persons={filteredPersons} />  

    </div>
  )
}

export default App