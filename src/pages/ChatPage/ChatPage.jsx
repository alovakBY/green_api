import React, { useRef, useState } from 'react'
import { Alert, Spinner } from 'react-bootstrap'

import { useMessageExchange } from '@/hooks/useMessageExchange.jsx'
import { usePopup } from '@/hooks/usePopup.jsx'
import { SendIcon } from '@/static/icons/index.jsx'
import chatBg from '@/static/img/chat-bg.png'

import classes from './chat-page.module.scss'

export const ChatPage = () => {
   const [message, setMessage] = useState('')
   const scrollRef = useRef()

   const { messages, errors, loading, sendMessage } = useMessageExchange()

   const { isShow } = usePopup(errors)

   const handleSendMessage = () => {
      if (message.length) {
         sendMessage(message).finally(() => {
            setMessage('')
            scrollRef.current &&
               scrollRef.current.scrollTo({
                  top: scrollRef.current.scrollHeight,
               })
         })
      }
   }

   const onKeyDown = (e) => {
      if (e.code === 'Enter' && message.length) {
         sendMessage(message).finally(() => {
            setMessage('')
            scrollRef.current &&
               scrollRef.current.scrollTo({
                  top: scrollRef.current.scrollHeight,
               })
         })
      }
   }

   return (
      <div>
         <div
            ref={scrollRef}
            className={classes.messages}
            style={{ backgroundImage: `url(${chatBg})` }}
         >
            {messages.map(({ id, text, type }) => {
               return (
                  <div key={id} className={classes.messageWrapper}>
                     <div key={id} className={`${classes[type]} ${classes.message}`}>
                        {text}
                     </div>
                  </div>
               )
            })}
         </div>

         <div className={classes.textWrapper}>
            <input
               value={message}
               onChange={(e) => setMessage(e.target.value)}
               type={'text'}
               className={classes.input}
               placeholder={'Введите сообщение'}
               onKeyDown={onKeyDown}
            />
            <button onClick={handleSendMessage} disabled={loading}>
               {loading ? (
                  <Spinner
                     as="span"
                     animation="border"
                     size="sm"
                     role="status"
                     aria-hidden="true"
                  />
               ) : (
                  <SendIcon />
               )}
            </button>
         </div>

         <div className={classes.error}>
            {errors && isShow ? (
               <Alert variant={'danger'} className={'mt-3 mb-0'}>
                  {errors}
               </Alert>
            ) : null}
         </div>
      </div>
   )
}
