import React from 'react'

import { Header } from '@/components/Header/Header.jsx'
import { useUserStore } from '@/store/index.js'

import classes from './main-layout.module.scss'

export const MainLayout = ({ children }) => {
   const { isAuth } = useUserStore((state) => state)

   return (
      <div className={classes.layout}>
         {!isAuth && <Header />}
         {children}
      </div>
   )
}
