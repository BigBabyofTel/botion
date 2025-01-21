import { create } from 'zustand';
import { SessionStore } from '@/lib/types';

export const useSessionStore = create<SessionStore>((set) => ({
  user: null,
  setUser: (user) => {
    set({ user });
  },
  deleteUser: () => set({ user: null }),
}));