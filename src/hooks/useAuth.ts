import { create } from 'zustand';

type State = {
  isLogin: boolean;
};

type Action = {
  updateIsLogin: (isLogin: State['isLogin']) => void;
};

// Create your store, which includes both state and (optionally) actions
const useAuthStore = create<State & Action>((set) => ({
  isLogin: false,
  updateIsLogin: (isLogin) => set(() => ({ isLogin: isLogin }))
}));

export { useAuthStore };
