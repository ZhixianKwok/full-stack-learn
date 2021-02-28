import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const createBlog = (newBlog) => {
  const config = {
    headers: {
      Authorization:token
    }
  }
  const request = axios.post(baseUrl,newBlog,config)
  return  request.then(response => response.data)
}

const updateBlog = (newBlog) => {
  const config = {
    headers: {
      Authorization:token
    }
  }
  const request = axios.put(`${baseUrl}/${newBlog.id}`,newBlog,config)
  return  request.then(response => response.data)
}

const deleteBlog = (id) => {
  const config = {
    headers: {
      Authorization:token
    }
  }
  const request = axios.delete(`${baseUrl}/${id}`,config)
  return request
}

export default { getAll , setToken , createBlog , updateBlog , deleteBlog }