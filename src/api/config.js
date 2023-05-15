import axios from 'axios'

const BASE_URL = 'https://api.green-api.com/'

const config = {
   baseURL: BASE_URL,
   headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST',
      'Content-Type': 'application/json',
   },
   methods: ['GET', 'POST'],
}

const api = axios.create(config)

api.interceptors.response.use(
   (response) => {
      return response
   },
   (error) => {
      if (error.response.status === 401) {
         window.location.reload()
         return
      }
      return Promise.reject(error.response.data)
   },
)

export default api
