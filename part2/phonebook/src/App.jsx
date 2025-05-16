import { useState, useEffect } from 'react'
import personService from './services/persons'
import './index.css'

// Passed the whole object for person, displays individual names
const Person = ({person, onClick}) => {
  const capitalize = (str) => {
    return str.replace(/^(.)|\s+(.)/g, c => c.toUpperCase()); //utilized code from codegrepper. Capitalizes the first letter of each word
  }
  return (
    <li key={person.id}> {capitalize(person.name)} : {person.number} <button onClick={() => onClick(person.id)}>Delete</button> </li>
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


// This is affected by the update function I put it, look into lowercases 
const Filter = ({search, onChange}) => {
  return(
    <div>
      Search: <input value={search} onChange={onChange} />
    </div>
  )
}

const Notification = ({message, errorEffect}) => {
  if (message === null) {
    return null
  }
  
  console.log(message)
  return (
    <div className='error'>
      {message}
      {errorEffect}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setName] = useState("")
  const [newNumber, setNumber] = useState("")
  const [search, setSearch] = useState("")
  const [errorMessage, setErrorMessage] = useState("some error happened")

  // fetches all persons listed in server
  const hook = () => {
    console.log('effect')
    personService
      .getAll()
      .then(response => {
        const lowerCasePersons = response.data.map(person => ({
          ...person,
          name: person.name.toLowerCase(), // Convert name to lowercase for easy search
        }))
        setPersons(lowerCasePersons)
      })
  }
  useEffect(hook, [])

  // Renders the error message
  const errorEffect = () => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
     
      return () => clearTimeout(timer); // Cleanup timer on component unmount or if errorMessage changes
    }
  }
   // 
  useEffect(errorEffect, [errorMessage])

  console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    // Without the line below, page auto refreshes at the end of this function, clearing console
    // Maybe takeout when done developing
    event.preventDefault()
    console.log(`Add person was clicked, this is the event `, event)

    const capitalize = (str) => {
      return str.replace(/^(.)|\s+(.)/g, c => c.toUpperCase()); //utilized code from codegrepper. Capitalizes the first letter of each word
    }
 

    const personObject = {
      name: newName,
      number: newNumber
    }
    // For objects, important to use a comma otherwise console tries to read everything as a string instead of object with elements
    console.log(`personObject for new person is : `, personObject)
    console.log(`personObject name is : `, personObject.name)
    console.log(`personObject number is : `, personObject.number)


    // returns true or false
    const samePerson = persons.some((person) => (person.name === personObject.name && person.number === newNumber))
    console.log("This is the same person bool object ", samePerson)
    
    // If name and phone number already exists in the list, prevented from adding + a notice
    if (samePerson) {
      setErrorMessage(`Person '${capitalize(personObject.name)}' is already in server`)
      alert(`${capitalize(personObject.name)} is already added to phonebook`)
      console.log("Name already in phonebook, return")
      return // Exit the function
    } 

    // returns true or false
    const sameName = persons.some((person) => person.name === personObject.name );
    console.log("This is the same NAME bool object ", sameName)
    // If name already exists in the list and the phone number is different, 
    if (sameName){
      // Gives option to update the contact
      if (window.confirm(`${capitalize(newName)} is already added to the phonebook. Replace the old number with the new one?`)){
        updatePerson()
      }
      // if clicked no, then the fields stay populated but server is not updated
      return // Exit the function 
    } 
 
   const addPersonService = personService
    .create(personObject)
    .then(() => {
      setPersons(persons.concat(personObject));
      setName('')
      setNumber('')
      setErrorMessage(`Added ${personObject.name}`)
    }) 
    .catch(error => {
      let message = error.response.data.error;
      console.log(message); 
      setErrorMessage(`${message}`)
      alert(`There was an error adding to the server`);
    }) 

    console.log("Successfully added person")
    return addPersonService
  }
 
  const updatePerson = () => {
    console.log("UpdatePerson function was successfully called ")
    
    // Filters out the person with the same name as the search, only use for and update. 
    // Big reminder to use "let" so the resulting object is properly saved, missed that and caused undefined because const can't be changed
    let personToUpdate = persons.find((person) => person.name === newName) 

    // update the number, this will be passed to the persons object in the frontend
    personToUpdate.number = newNumber

    console.log("This is person to update id: ", personToUpdate.id)

    const updatedPersonObject = {
        number: newNumber
      }
    const capitalize = (str) => {
        return str.replace(/^(.)|\s+(.)/g, c => c.toUpperCase()); //utilized code from codegrepper. Capitalizes the first letter of each word
      }
    // For objects, important to use a comma otherwise console tries to read everything as a string instead of object with elements
    console.log(`updatedPersonObject number is : `, updatedPersonObject.number)

    const updatePersonService = personService
    .update(newName, updatedPersonObject)
    .then(() => {
      setPersons(persons.map(person => person.name != newName ? person : personToUpdate));
      setName('')
      setNumber('')
      setErrorMessage(`${newName} updated in server`)
    })
    .catch(error => {
      setErrorMessage(`Information of ${capitalize(updatedPersonObject.name)} was already deleted from the server`)
      alert(`There was an error updating the person in the server`)
    }) 
    console.log("Successfully updated person")
   return updatePersonService
    
  }
  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const handleNumChange = (event) => {
    setNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value.toLowerCase())
  }
  const deletePerson = (id) => {
    // Saves the person object with the id being deleted
    const personToDelete = persons.find(person => person.id === id)
    console.log("This is person to delete id: ", personToDelete.id)
    const capitalize = (str) => {
      return str.replace(/^(.)|\s+(.)/g, c => c.toUpperCase()); //utilized code from codegrepper. Capitalizes the first letter of each word
    }
    if (personToDelete && window.confirm(`Delete ${capitalize(personToDelete.name)}?`)) {
    // calls axios service to delete the person with the matching id
    personService
        .deletes(personToDelete.id)
        .then(() => {
          // returns and stores list in persons variable and excludes the deleted person
          setPersons(persons.filter(person => person.id !== personToDelete.id))
          setErrorMessage(`${personToDelete.name} deleted in server`)
        })
        .catch(error => {
          alert(`The person '${capitalize(personToDelete.name)}' was already deleted from the server`)
          
        })
  }}

  // Saves a list of people that match the name in the search. If no search input, 
  // then the whole list of people is returned
  const filteredPersons = search
    ? persons.filter(person => person.name.includes(search))
    : persons;

  return (
    <div>

      <h2>Phonebook</h2>
      <Notification message={errorMessage} errorEffect= {errorEffect} />
      
      <Form addPerson={addPerson} newName={newName} newNumber={newNumber} onNameChange={handleNameChange} onNumChange={handleNumChange}/>
      <br />
      <Filter search={search} onChange={handleSearchChange} />
      <Persons persons={filteredPersons} onClick={deletePerson} />  

    </div>
  )
}

export default App