import React from 'react'

import { LogoIcon } from '@/static/icons/index.jsx'

import classes from './Header.module.scss'

export const Header = () => {
   return (
      <div className={classes.header}>
         <div className={classes.before}></div>
         <LogoIcon className={classes.logo} />
         <div>GREEN API</div>
      </div>
   )
}
