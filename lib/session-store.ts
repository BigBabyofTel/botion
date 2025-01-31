import { create } from 'zustand';
import { AuthContextType } from '@/lib/types';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useSessionStore = create<AuthContextType>()(
  persist(
    (set) => ({
      AccessToken: null,
      RefreshToken: null,
      userId: null,
      setUserId: (userId) => set({ userId }),
      isAuthenticated: false,
      setAccessToken: (AccessToken) => set({ AccessToken }),
      setRefreshToken: (RefreshToken) => set({ RefreshToken }),
      setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      deleteToken: () => set({ AccessToken: null, RefreshToken: null }),
      user: null,
      setUser: (user) => {
        set({ user });
      },
      deleteUser: () => set({ user: null }),
      deleteUserId: () => set({ userId: null }),
    }),
    {
      name: 'persistUser',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);