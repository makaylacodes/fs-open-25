import { useState } from 'react'

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
    <h2>{text}</h2>
  )
}

// Form to add a new person
const Form = ({addPerson, newName, newNumber, onNameChange, onNumChange}) => {

  return (
    <form onSubmit={addPerson}>
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
    <ol>
      {persons.map(person => {
        return(
          <div key={person.name}>
            <Person person={person} />
          </div> 
        )
      })}
    </ol> 
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-12-34567' }
  ]) 
  const [newName, setName] = useState('')
  const [newNumber, setNumber] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked')

    // If name already exists in the list, prevented from adding + a notice
    if (persons.some(person => {
      return person.name === newName && person.number === newNumber})) {
      alert(`${newName} is already added to phonebook`);
      return; // Exit the function
    }

    // creates a new object with provided input
    const personObject = {
      name: newName,
      number: newNumber
    }

    // adds the new person object to the persons list
    setPersons(persons.concat(personObject))
    setName('')
    setNumber('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setName(event.target.value)
  }

  const handleNumChange = (event) => {
    console.log(event.target.value)
    setNumber(event.target.value)
  }

  return (
    <div>

      <Title text={"Phonebook"} />
      <Form addPerson={addPerson} newName={newName} newNumber={newNumber} onNameChange={handleNameChange} onNumChange={handleNumChange}/>
      <br />

      <Title text={"Numbers"} />
      <Persons persons={persons} />  

    </div>
  )
}

export default App