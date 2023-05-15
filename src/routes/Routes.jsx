import { Route, Routes } from 'react-router'

import { ROUTE_NAMES } from '@/constants/routeNames.js'
import { ChatPage } from '@/pages/ChatPage/ChatPage.jsx'
import { HomePage } from '@/pages/HomePage/HomePage.jsx'
import { LoginPage } from '@/pages/LoginPage/LoginPage.jsx'
import { PrivateRoute } from '@/routes/PrivateRoute.jsx'

export const Router = () => {
   return (
      <Routes>
         <Route path={ROUTE_NAMES.LOGIN} element={<LoginPage />} />
         <Route element={<PrivateRoute />}>
            <Route path={ROUTE_NAMES.HOME} element={<HomePage />} />
            <Route path={ROUTE_NAMES.CHAT} element={<ChatPage />} />
         </Route>
      </Routes>
   )
}
