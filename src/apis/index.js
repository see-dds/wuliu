import axios from 'axios'
const $api = axios.create({
  baseURL: 'http://127.0.0.1:3001/api/v1'
})

$api.interceptors.response.use((response) => {
  return response.data
})
export default $api