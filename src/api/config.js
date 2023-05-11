import axios from 'axios'

const BASE_URL = 'https://api.green-api.com/'

const config = {
   baseURL: BASE_URL,
}

const api = axios.create(config)

export default api
