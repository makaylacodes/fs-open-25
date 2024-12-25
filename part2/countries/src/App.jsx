import { useState, useEffect } from 'react'
import countryService from './services/country.js'

const Search = ({search, onChange}) => {
  return (
    <div>
      <p>Find countries: <input value={search} onChange={onChange}/> </p>
    </div>
  )
}

const CountryList = ({country}) => {
  console.log("This is country name", country.name.common)
  return (
    <li>{country.name.common}</li>
  )
}

const Country = ({country}) => {
  console.log("This is country name for individual component: ", country.name.common)
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Area : {country.area} km<sup>2</sup></p>

      <h3>Languages</h3>
      <ol>
        {Object.values(country.languages).map(language => <li key={language} >{language}</li> )}
      </ol>
      <br />
      <br />
      <br />
      <img 
        src={country.flags.png} 
        alt={`Flag of ${country.name.common}`} 
        style={{ width: '150px', height: 'auto' }} 
      />
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState("")

  // fetches all persons listed in server
  const hook = () => {
    console.log('effect')
    countryService
    .getAll()
    .then(response => {
      setCountries(response.data)
      console.log("This is the response from server: ", response.data)
    })
  }
  useEffect(hook, [])

  const onSearchChange = (event) => {
    console.log("This is onsearch change, sets the value of country")
    setSearch(event.target.value)
    console.log("This is the search value : ", search)
  }

  // Filter countries based on search
  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  )

  let content = filteredCountries.length === 1
  ? <Country country={filteredCountries[0]} />
  : filteredCountries.length < 10
    ? filteredCountries.map(country => <CountryList key={country.cca3} country={country} />)
    : <p>Too many results, please be more specific.</p> 
   // else if (){
    //  return filteredCountries.map(country => <Country country={country} /> )

  return (
    <div>
      <Search search={search} onChange={onSearchChange} />
      <ol>
      {content}
      </ol>
      
    </div>
  )
}

export default App
