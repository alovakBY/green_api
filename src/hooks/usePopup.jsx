import { useEffect, useState } from 'react'

export const usePopup = (message, time = 5000) => {
   const [showPopup, setShowPopup] = useState(false)

   useEffect(() => {
      if (message) {
         setShowPopup(true)
         const timer = setTimeout(() => {
            setShowPopup(false)
         }, time)

         return () => {
            clearTimeout(timer)
         }
      }
   }, [message])

   return { isShow: showPopup }
}
