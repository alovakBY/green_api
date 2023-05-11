import create from 'zustand'

const useUserStore = create((set) => ({
   user: {
      isAuth: false,
      idInstance: null,
      apiTokenInstance: null,
   },
}))
export default useUserStore
