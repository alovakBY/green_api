import { Navigate, Outlet } from 'react-router-dom'

import { ROUTE_NAMES } from '@/constants/routeNames.js'
import useUserStore from '@/store/index.js'

export const PrivateRoute = () => {
   const { isAuth } = useUserStore((state) => state.user)

   return isAuth ? <Outlet /> : <Navigate to={ROUTE_NAMES.LOGIN} />
}
