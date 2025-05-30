import axios from 'axios'
// The URL where the server is hosted and returns the persons list
const baseUrl = 'https://part3-backend-gt8j.onrender.com/api/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

const deletes = (id) => {
    return axios.delete(`${baseUrl}/${id}`);
  };

export default { 
  getAll: getAll, 
  create: create, 
  update: update,
  deletes: deletes 
}