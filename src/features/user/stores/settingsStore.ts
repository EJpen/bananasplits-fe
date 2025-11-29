import { create } from "zustand";

type Theme = "dark" | "light";

interface SettingsState {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;

  // Appearance
  theme: Theme;

  // Security
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;

  // Actions
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setEmail: (email: string) => void;
  setTheme: (theme: Theme) => void;
  setCurrentPassword: (password: string) => void;
  setNewPassword: (password: string) => void;
  setConfirmNewPassword: (password: string) => void;
  savePersonalInfo: () => void;
  updatePassword: () => void;
  resetPasswordFields: () => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  // Personal Information - Mock data
  firstName: "John",
  lastName: "Doe",
  email: "john@banana.com",

  // Appearance
  theme: "dark",

  // Security
  currentPassword: "",
  newPassword: "",
  confirmNewPassword: "",

  // Actions
  setFirstName: (firstName) => set({ firstName }),
  setLastName: (lastName) => set({ lastName }),
  setEmail: (email) => set({ email }),
  setTheme: (theme) => set({ theme }),
  setCurrentPassword: (currentPassword) => set({ currentPassword }),
  setNewPassword: (newPassword) => set({ newPassword }),
  setConfirmNewPassword: (confirmNewPassword) => set({ confirmNewPassword }),

  savePersonalInfo: () => {
    // Mock save - would call API in real app
    console.log("Personal info saved");
  },

  updatePassword: () => {
    // Mock update - would call API in real app
    console.log("Password updated");
    set({
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
  },

  resetPasswordFields: () => {
    set({
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
  },
}));
