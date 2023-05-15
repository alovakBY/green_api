import create from 'zustand'
import { devtools } from 'zustand/middleware'

import { createChat, deleteMessage, getMessage, login, sendMessage } from '@/services/index.js'

export const useUserStore = create((set) => ({
   isAuth: false,
   idInstance: null,
   apiTokenInstance: null,
   error: null,
   loading: false,
   login: async (idInstance, apiTokenInstance) => {
      try {
         set({ loading: true, error: null })

         const data = await login(idInstance, apiTokenInstance)

         if (data?.data?.statusInstance === 'online') {
            set({
               apiTokenInstance,
               idInstance,
               isAuth: true,
               loading: false,
               error: null,
            })
         } else {
            throw new Error('Error. Try again')
         }
      } catch (error) {
         set({ loading: false, error: error.message })
      } finally {
         set({ loading: false })
      }
   },
}))

export const usePhoneStore = create((set) => ({
   error: null,
   loading: false,
   chatId: null,
   getChat: async function (idInstance, apiTokenInstance, phone) {
      try {
         set({ loading: true, error: null })

         const { data } = await createChat(idInstance, apiTokenInstance, phone)

         if (data?.existsWhatsapp) {
            set({
               chatId: `${phone}@c.us`,
               loading: false,
               error: null,
            })
         } else {
            throw new Error(
               'Error. This contact does not exist. Please, enter correct number phone.',
            )
         }
      } catch (error) {
         set({ loading: false, error: error.message || 'Error. Try again' })
      } finally {
         set({ loading: false })
      }
   },
}))

export const useMessagesStore = create(
   devtools((set) => ({
      error: null,
      loading: false,
      receiptId: null,
      messages: [],
      removeNotificationId: null,
      sendLoading: false,
      sendError: null,
      getNotification: async function (idInstance, apiTokenInstance, chatId) {
         try {
            set({ loading: true, error: null })

            const { data } = await getMessage(idInstance, apiTokenInstance)

            if (data) {
               set({
                  receiptId: data.receiptId,
                  removeNotificationId: data.receiptId,
               })
            }

            if (
               data &&
               data.body.typeWebhook === 'incomingMessageReceived' &&
               chatId === data.body.senderData.chatId
            ) {
               set((state) => {
                  return {
                     ...state,
                     messages: [
                        ...state.messages,
                        {
                           id: Date.now(),
                           text: data.body.messageData.textMessageData.textMessage,
                           type: 'incoming',
                        },
                     ],
                  }
               })
            }
         } catch (error) {
            set({ loading: false, error: error.message })
         } finally {
            set({ loading: false })
         }
      },
      deleteNotification: async function (idInstance, apiTokenInstance, receiptId) {
         try {
            const { data } = await deleteMessage(idInstance, `${apiTokenInstance}`, receiptId)

            if (data && data.result) {
               set({
                  removeNotificationId: -1,
               })
            }
         } catch (error) {
            set({ loading: false, error: error.message, removeNotificationId: null })
         } finally {
            set({ loading: false })
         }
      },
      sendMessage: async function (idInstance, apiTokenInstance, chatId, message) {
         try {
            set({ sendLoading: true, sendError: null })
            const { data } = await sendMessage(idInstance, apiTokenInstance, chatId, message)

            if (data) {
               set((state) => {
                  return {
                     ...state,
                     messages: [
                        ...state.messages,
                        {
                           id: Date.now(),
                           text: message,
                           type: 'outgoing',
                        },
                     ],
                  }
               })
            }
         } catch (error) {
            set({ sendLoading: false, sendError: error.message })
         } finally {
            set({ sendLoading: false })
         }
      },
   })),
)
