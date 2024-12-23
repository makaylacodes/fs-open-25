import { useState, useEffect } from 'react'
import personService from './services/persons'

// Passed the whole object for person, displays individual names
const Person = ({person, onClick}) => {
  console.log(`This person's name is ${person.name}`)
  return (
    <li key={person.id}> {person.name} : {person.number} <button onClick={() => onClick(person.id)}>Delete</button> </li>
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
const Persons = ({persons, onClick}) => {
  return (
    <div>
      <Title text={"Numbers"} />
      <ol key={persons.id} >
        {persons.map(person => {
          return(
            <div key={person.id} >
              <Person person={person} onClick={onClick} />
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
  // keeps the ids in numerical order
    const maxId = persons.length > 0 ? Math.max(...persons.map(person => person.id)) : 0;

    // Saves id as a string instead of int
    const newId = (maxId + 1).toString()
    // creates a new object with provided input
    

    const person = persons.filter(person => person.name === newName);


    const personBool = persons.find((person) => person.name === newName && person.number === newNumber);
    const personObject = {
      name: newName,
      number: newNumber,
      id: newId
    }
    const sameId = person[0].id
    const updatedPersonObject = {
      name: newName,
      number: newNumber,
      id: sameId 
    }
    console.log("This is the person containing result", person)
    console.log("This is the person containing result, ID ", sameId)
    console.log("This is the new number ", personObject.number);
    console.log("This is the person object with new number", personObject)
    
    // If name already exists in the list, prevented from adding + a notice
    if (personBool) {
      alert(`${newName} is already added to phonebook`);
      console.log("Name already in phonebook, return")
      return; // Exit the function
    } 

    const result =  persons.find(person => person.name === newName && person.number !== newNumber) //if name is found in the db
    ? update(updatedPersonObject) //user is given choice to update the phone number
    : personService //if name is not found, the new person is added to the db
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setName('');
        setNumber('');
      });

      return result;
  }

  const update = (person) => {
    console.log("First message inside of update, acknowledge same name and different number")
    const confirmUpdate = window.confirm(`${newName} is already added to the phonebook. Replace the old number with the new one?` )
    console.log(`This is id ${person.id}`)
  

    if (confirmUpdate) {
      console.log("Yes was clicked");
      console.log(`This is the person object ${person.name}`)

      const changedPerson = { ...person}

      changedPerson.number = person.number
      console.log(`This is the changed person ${changedPerson.number}`)

      console.log(`This is the changed person id ${changedPerson.id}`)
      
      return (
        personService
        .update(person.id, changedPerson)
        .then(updatedPerson => {
          setPersons(persons.map(person => person.id !== changedPerson.id ? person : updatedPerson))
          setName('')
          setNumber('')
        })
      )
    }
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
  const deletePerson = (id) => {
    // Saves the person object with the id being deleted
    const personToDelete = persons.find(person => person.id === id);

    if (personToDelete && window.confirm(`Delete ${personToDelete.name}?`)) {
    // calls axios service to delete the person with the matching id
    personService
        .deletes(personToDelete.id)
        .then(() => {
          // returns and stores list in persons variable and excludes the deleted person
          setPersons(persons.filter(person => person.id !== personToDelete.id));
        })
        .catch(error => {
          alert(`The person '${personToDelete.name}' was already deleted from the server`);
        })
  }}
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
      <Persons persons={filteredPersons} onClick={deletePerson} />  

    </div>
  )
}

export default App