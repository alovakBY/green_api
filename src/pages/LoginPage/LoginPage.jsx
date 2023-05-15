import React, { useEffect, useState } from 'react'
import { Alert, Button, Form, Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import { usePopup } from '@/hooks/usePopup.jsx'
import { useUserStore } from '@/store/index.js'

import classes from './login-page.module.scss'

export const LoginPage = () => {
   const [idInstance, setIdInstance] = useState('1101818458')
   const [apiTokenInstance, setApiTokenInstance] = useState(
      '49c7f4a7899840f09c768578e1bf1ed9aea46d9d83624a599e',
   )

   const { isAuth, error, loading, login } = useUserStore()

   const navigate = useNavigate()

   const { isShow } = usePopup(error)

   const handleLogin = async () => {
      await login(idInstance, apiTokenInstance)
      setIdInstance('')
      setApiTokenInstance('')
   }

   useEffect(() => {
      if (isAuth) {
         navigate('/')
      }
   }, [isAuth])

   return (
      <div className={classes.loginWrapper}>
         <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
               <Form.Label>ID Instance</Form.Label>
               <Form.Control
                  className={'input'}
                  type="text"
                  placeholder="Введите Ваш ID..."
                  value={idInstance}
                  onChange={(e) => setIdInstance(e.target.value)}
               />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
               <Form.Label>API Token Instance</Form.Label>
               <Form.Control
                  className={'input'}
                  type="text"
                  placeholder="Введите Ваш токен..."
                  value={apiTokenInstance}
                  onChange={(e) => setApiTokenInstance(e.target.value)}
               />
            </Form.Group>

            <div className={'text-end'}>
               {loading ? (
                  <Button variant="success" type="button" disabled>
                     <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                     />
                     <span className="ms-2 d-inline-block">Загрузка</span>
                  </Button>
               ) : (
                  <Button
                     variant="success"
                     type="button"
                     disabled={!idInstance || !apiTokenInstance}
                     onClick={() => handleLogin()}
                  >
                     Войти
                  </Button>
               )}
            </div>

            {error && isShow ? (
               <Alert variant={'danger'} className={'mt-3 mb-0'}>
                  {error}
               </Alert>
            ) : null}
         </Form>
      </div>
   )
}
