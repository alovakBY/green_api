import api from '@/api/config.js'

export const login = async (idInstance, apiTokenInstance) => {
   try {
      const data = await api.get(
         `https://api.green-api.com/waInstance${idInstance}/getStatusInstance/${apiTokenInstance}`,
      )

      return data
   } catch (e) {
      return e
   }
}

export const getNewsItem = async (id) => {
   const { data } = await api.get(`item/${id}.json`)

   return data
}
