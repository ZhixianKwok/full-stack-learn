import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = person => {
    return axios.post(baseUrl, person)
}

const update = ( person ) => {
    return axios.put(`${baseUrl}/${person.id}`, person)
}

const remove = ( id ) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const personService = {
    getAll,
    create,
    update,
    remove
}

export default personService