import React, { useEffect, useState } from 'react'
import { Alert, Button, Form, Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import { usePopup } from '@/hooks/usePopup.jsx'
import { usePhoneStore, useUserStore } from '@/store/index.js'

import classes from './home-page.module.scss'

export const HomePage = () => {
   const [phoneNumber, setPhoneNumber] = useState('')
   const { idInstance, apiTokenInstance } = useUserStore()
   const { chatId, error, loading, getChat } = usePhoneStore()
   const navigate = useNavigate()

   const { isShow } = usePopup(error)
   const handleCreatChat = async () => {
      await getChat(idInstance, apiTokenInstance, phoneNumber)
      setPhoneNumber('')
   }

   useEffect(() => {
      if (chatId) {
         navigate('/chat')
      }
   }, [chatId])

   return (
      <Form className={classes.form}>
         <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Номер телефона</Form.Label>
            <Form.Control
               className={'input'}
               type="text"
               placeholder="Введите телефон получателя..."
               value={phoneNumber}
               onChange={(e) => setPhoneNumber(e.target.value)}
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
                  disabled={!phoneNumber}
                  onClick={() => handleCreatChat()}
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
   )
}
