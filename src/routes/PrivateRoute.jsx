import { Navigate, Outlet } from 'react-router-dom'

import { ROUTE_NAMES } from '@/constants/routeNames.js'
import { useUserStore } from '@/store/index.js'

import classes from './route.module.scss'

export const PrivateRoute = () => {
   const { isAuth } = useUserStore((state) => state)

   return isAuth ? (
      <div className={classes.wrapper}>
         <div className={classes.before}></div>
         <Outlet />
      </div>
   ) : (
      <Navigate to={ROUTE_NAMES.LOGIN} />
   )
}
