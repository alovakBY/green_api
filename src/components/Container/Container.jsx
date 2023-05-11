import React from 'react'

import classes from './container.module.scss'

export const Container = ({ children }) => {
   return <div className={classes.container}>{children}</div>
}
