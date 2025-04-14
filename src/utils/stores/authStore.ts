import {create} from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type IAuth  = {
  token: string | null;
  setToken: (token: string | null) => void
}
const useAuthStore = create<IAuth>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token) => set({ token }),
    }),
    {
      name: 'auth-storage', 
      storage : createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;
