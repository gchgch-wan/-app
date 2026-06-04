import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const ADMIN_PASSWORD = 'admin123'; // 默认密码，可在管理面板修改

interface AdminState {
  isLoggedIn: boolean;
  sessionExpiry: number;
  login: (password: string) => boolean;
  logout: () => void;
  changePassword: (newPassword: string) => void;
  checkSession: () => boolean;
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      sessionExpiry: 0,

      login: (password: string) => {
        if (password === ADMIN_PASSWORD) {
          const expiry = Date.now() + 8 * 60 * 60 * 1000; // 8小时session
          set({ isLoggedIn: true, sessionExpiry: expiry });
          return true;
        }
        return false;
      },

      logout: () => set({ isLoggedIn: false, sessionExpiry: 0 }),

      changePassword: (_newPassword: string) => {
        // 演示模式暂不支持改密码
      },

      checkSession: () => {
        const state = get();
        if (state.isLoggedIn && Date.now() < state.sessionExpiry) return true;
        set({ isLoggedIn: false, sessionExpiry: 0 });
        return false;
      },
    }),
    { name: 'nebula-fit-admin' }
  )
);
