import axios from 'axios'

const baseUrl = '/api/login'
const loginIn = async (user) => {
  const res = await axios.post(baseUrl,user)
  return res
}

export default {
  loginIn
}