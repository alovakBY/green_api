import React from 'react'

import { Header } from '@/components/Header/Header.jsx'

import classes from './main-layout.module.scss'

export const MainLayout = ({ children }) => {
   return (
      <div className={classes.container}>
         <Header />
         {children}
      </div>
   )
}
