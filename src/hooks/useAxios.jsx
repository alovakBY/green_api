import { useEffect, useState } from 'react'

export const useAxios = (asyncFunction) => {
   const [data, setData] = useState(null)
   const [error, setError] = useState(null)
   const [loading, setLoading] = useState(false)

   useEffect(() => {
      ;(async () => {
         setLoading(true)
         try {
            const { data } = await asyncFunction()

            setData(data)
         } catch (e) {
            setError(e.message)
         } finally {
            setLoading(false)
         }
      })()
   }, [asyncFunction])

   return {
      data,
      error,
      loading,
   }
}
