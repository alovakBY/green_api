import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { MainLayout } from '@/components/MainLayout/MainLayout.jsx'
import { Router } from '@/routes/Routes.jsx'

import 'bootstrap/dist/css/bootstrap.min.css'
import '@/styles/common.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
   <BrowserRouter>
      <MainLayout>
         <Router />
      </MainLayout>
   </BrowserRouter>,
)
