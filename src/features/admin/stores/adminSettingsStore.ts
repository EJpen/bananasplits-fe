import { create } from "zustand";

type Theme = "dark" | "light";

interface AdminSettingsState {
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

export const useAdminSettingsStore = create<AdminSettingsState>((set) => ({
  // Personal Information - Mock data for admin
  firstName: "Admin",
  lastName: "User",
  email: "admin@banana.com",

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
    console.log("Admin personal info saved");
  },

  updatePassword: () => {
    // Mock update - would call API in real app
    console.log("Admin password updated");
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
