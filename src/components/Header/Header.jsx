import React from 'react'

import { Container } from '@/components/Container/Container.jsx'

import classes from './header.module.scss'

export const Header = () => {
   return (
      <div className={classes.header}>
         <Container>
            <div className={classes.wrapper}>Header</div>
         </Container>
      </div>
   )
}
