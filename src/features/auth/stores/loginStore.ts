import { create } from "zustand";

interface LoginState {
  email: string;
  password: string;
  loading: boolean;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setLoading: (loading: boolean) => void;
  resetForm: () => void;
}

export const useLoginStore = create<LoginState>((set) => ({
  email: "",
  password: "",
  loading: false,
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setLoading: (loading) => set({ loading }),
  resetForm: () => set({ email: "", password: "", loading: false }),
}));
