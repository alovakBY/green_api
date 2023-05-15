import api from '@/api/config.js'

export const login = (idInstance, apiTokenInstance) => {
   return api.get(
      `https://api.green-api.com/waInstance${idInstance}/getStatusInstance/${apiTokenInstance}`,
   )
}

export const createChat = (idInstance, apiTokenInstance, phone) => {
   return api.post(
      `https://api.green-api.com/waInstance${idInstance}/CheckWhatsapp/${apiTokenInstance}`,
      {
         phoneNumber: phone,
      },
   )
}

export const getMessage = (idInstance, apiTokenInstance) => {
   return api.get(
      `https://api.green-api.com/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`,
   )
}

export const deleteMessage = (idInstance, apiTokenInstance, receiptId) => {
   return api.delete(
      `https://api.green-api.com/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${receiptId}`,
   )
}

export const sendMessage = (idInstance, apiTokenInstance, chatId, message) => {
   return api.post(
      `https://api.green-api.com/waInstance${idInstance}/SendMessage/${apiTokenInstance}`,
      {
         chatId,
         message,
      },
   )
}
