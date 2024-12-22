import { useState } from 'react'

// Passed the whole object for person, displays individual names
const Person = ({person}) => {
  console.log(`This person's name is ${person.name}`)
  return (
    <li > {person.name} </li>
  )
}

// Titles
const Title = ({text}) => {
  return (
    <h2>{text}</h2>
  )
}

// Form to add a new person
const Form = ({addPerson, newPerson, onChange}) => {


  return (
    <form onSubmit={addPerson}>
      <div>
        Name: <input value={newPerson} onChange={onChange} />
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
    { name: 'Arto Hellas' }
  ]) 
  const [newPerson, setPerson] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked')

    // If name already exists in the list, prevented from adding + a notice
    if (persons.some(person => person.name === newPerson)) {
      alert(`${newPerson} is already added to phonebook`);
      return; // Exit the function
    }

    // creates a new object with provided input
    const personObject = {
      name: newPerson
    }

    // adds the new person object to the persons list
    setPersons(persons.concat(personObject))
    setPerson('')
  }

  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setPerson(event.target.value)
  }

  return (
    <div>

      <Title text={"Phonebook"} />
      <Form addPerson={addPerson} newPerson={newPerson} onChange={handlePersonChange}/>
      <br />

      <Title text={"Numbers"} />
      <Persons persons={persons} />  

    </div>
  )
}

export default App