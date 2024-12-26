import axios from 'axios'

// need import.meta.env.VITE_(whatever api name is) to import from .env in a vite app
const apiKey = import.meta.env.VITE_API_KEY

const getAll = (lat, lon) => {
    console.log(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
  return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
}

export default { 
  getAll: getAll
}