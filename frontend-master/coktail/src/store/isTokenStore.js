import { create } from 'zustand';
import { createJSONStorage, persist } from "zustand/middleware";

export const isUserStore = create(
  persist(
    (set) => ({
      user: {},
      setUser: (data) => set(() => ({ user: data })),
      isLogin: false,
      setIsLogin: (status) => set(() => ({isLogin: status}))
    }),
    {
      name: 'token-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  )
)