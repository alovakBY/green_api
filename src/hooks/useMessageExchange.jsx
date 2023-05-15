import { useEffect, useRef } from 'react'

import { useMessagesStore, usePhoneStore, useUserStore } from '@/store/index.js'

export const useMessageExchange = () => {
   const {
      messages,
      receiptId,
      getNotification,
      deleteNotification,
      sendMessage,
      error,
      sendError,
      removeNotificationId,
      sendLoading,
   } = useMessagesStore()

   const { idInstance, apiTokenInstance } = useUserStore()

   const { chatId } = usePhoneStore()

   const timer = useRef()

   useEffect(() => {
      getNotification(idInstance, apiTokenInstance, chatId)
      if (!timer.current) {
         timer.current = setInterval(() => {
            getNotification(idInstance, apiTokenInstance, chatId)
         }, 10000)

         return () => {
            clearInterval(timer.current)
         }
      }
   }, [])

   useEffect(() => {
      if (receiptId && removeNotificationId && receiptId === removeNotificationId) {
         deleteNotification(idInstance, apiTokenInstance, receiptId)
      }
   }, [receiptId, removeNotificationId])

   useEffect(() => {
      if (removeNotificationId === -1) {
         getNotification(idInstance, apiTokenInstance, chatId)
      }
   }, [removeNotificationId])

   const onSendMessage = async (message) => {
      await sendMessage(idInstance, apiTokenInstance, chatId, message)
   }

   return {
      messages,
      sendMessage: onSendMessage,
      errors: error || sendError,
      loading: sendLoading,
   }
}
