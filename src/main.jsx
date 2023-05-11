import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { Container } from '@/components/Container/Container.jsx'
import { MainLayout } from '@/components/MainLayout/MainLayout.jsx'
import { Router } from '@/routes/Routes.jsx'

import '@/styles/common.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
   <React.StrictMode>
      <BrowserRouter>
         <Container>
            <MainLayout>
               <Router />
            </MainLayout>
         </Container>
      </BrowserRouter>
   </React.StrictMode>,
)
