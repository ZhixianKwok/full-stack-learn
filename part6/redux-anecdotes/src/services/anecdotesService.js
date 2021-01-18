import axios from 'axios'

const baseUrl ='http://localhost:3001'

const getAll = ()=>{
    return axios.get(`${baseUrl}/anecdotes`).then(res=>res.data)
}

const addAnecdotes = (anecdote)=>{
    return axios.post(`${baseUrl}/anecdotes`,anecdote).then(res=>res.data)
}

const updateAnecdotes = (id,anecdote)=>{
    return axios.put(`${baseUrl}/anecdotes/${id}`,anecdote).then(res=>res.data)
}

export default {
    getAll,
    addAnecdotes,
    updateAnecdotes
}