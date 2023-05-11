import React, { useState } from 'react'

import { login } from '@/services'

export const LoginPage = () => {
   const [idInstance, setIdInstance] = useState('')
   const [apiTokenInstance, setApiTokenInstance] = useState('')

   const handleClickButton = async () => {
      const data = await login(idInstance, apiTokenInstance)

      console.log(111, data)
   }

   return (
      <div>
         <input
            placeholder="enter your idInstance"
            value={idInstance}
            onChange={(e) => setIdInstance(e.target.value)}
         />
         <input
            placeholder="enter your apiTokenInstance)"
            value={apiTokenInstance}
            onChange={(e) => setApiTokenInstance(e.target.value)}
         />
         <button onClick={handleClickButton}>click</button>
      </div>
   )
}
