import { useState, useEffect } from 'react'
import countryService from './services/country.js'
import weatherService from './services/weather.js'
// import apiKey from '././env'

const Search = ({search, onChange}) => {
  return (
    <div>
      <p>Find countries: <input value={search} onChange={onChange}/> </p>
    </div>
  )
}

const CountryList = ({country, onShow}) => {
  console.log("This is country name", country.name.common)

  return (
    <li>{country.name.common} <button onClick={() => onShow(country)}>Show</button> </li>
  )
}

const Country = ({country, weather}) => {
  console.log("This is country name for individual component: ", country.name.common)

  //useEffect(effect(lat, lon), [])
  console.log("Weather data successfully retrieved", weather)
  console.log("the lat is ", country.capitalInfo.latlng[0], "and the lon is ", country.capitalInfo.latlng[1])
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Area : {country.area} km<sup>2</sup></p>
      <br />
      <h3>Languages</h3>
      <ol>
        {Object.values(country.languages).map(language => <li key={language} >{language}</li> )}
      </ol>
      <br />
      <h3>Flag</h3>
      <img 
        src={country.flags.png} 
        alt={`Flag of ${country.name.common}`} 
        style={{ width: '150px', height: 'auto' }} 
      />
      <Weather country={country} weather={weather} />
     
    </div>
  )
}

const Weather = ({country, weather}) => {

  const weatherDisplay = weather
    ?(<div>
        <p>Temperature is <span> {Math.round(weather.main.temp - 273.15)} &deg;<sup>C</sup> / {Math.round(1.8* (weather.main.temp - 273) + 32)} &deg;<sup>F</sup> </span></p>
        <img src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt="Weather icon" height={110} width={120}/> 
        <p>Wind is {weather.wind.speed} m/s</p> 
    </div>)
    :(
    <p>Loading weather data...</p>
    )
  return(
    <div>
      <br />
        <h3 >Weather in {country.capital} </h3>
        { weatherDisplay}

      </div> 
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState("")
  const [selected, setSelected]  = useState(null)
  

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
    setSelected(null)
  }

  const [weather, setWeather] = useState([])
  let lat = 0
  let lon = 0

  const hookWeather = () => {
    console.log("Inside of weatherservice hook in main app")
    if(selected){
      lat = selected.capitalInfo.latlng[0]
      lon = selected.capitalInfo.latlng[1]
    }
    weatherService
    .getAll(lat, lon)
    .then(response => {
      console.log("This is the response from server: ", response.data)
      setWeather(response.data)
    })
    .catch(error => {
      console.log("Failed to load data")
    })
  }
  useEffect(hookWeather, [])
  // Filter countries based on search
  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  )

  let content = selected // if selected value is not null
  ? <Country country={selected} weather = {weather} /> // display the component that displays all info for one specific country in list
  : filteredCountries.length === 1 // else if there's only one matching result in list
    ? <Country country={filteredCountries[0]} weather={weather}/> 
    // return component with all info for that specific country
    : filteredCountries.length < 10 // else if there are 10 or less matches
      ? filteredCountries.map(country => <CountryList key={country.cca3} country={country} onShow={setSelected} />) // display matches in a list with only country names
      : <p>Too many results, please be more specific.</p> // else there are too many results, need to be more specific

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
