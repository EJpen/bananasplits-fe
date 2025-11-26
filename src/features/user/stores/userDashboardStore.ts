import { create } from "zustand";

interface UserDashboardState {
  isSubscriptionModalOpen: boolean;
  isInviteOpen: boolean;
  inviteEmail: string;
  setSubscriptionModalOpen: (isOpen: boolean) => void;
  setInviteOpen: (isOpen: boolean) => void;
  setInviteEmail: (email: string) => void;
  resetInviteForm: () => void;
}

export const useUserDashboardStore = create<UserDashboardState>((set) => ({
  isSubscriptionModalOpen: false,
  isInviteOpen: false,
  inviteEmail: "",
  setSubscriptionModalOpen: (isOpen) =>
    set({ isSubscriptionModalOpen: isOpen }),
  setInviteOpen: (isOpen) => set({ isInviteOpen: isOpen }),
  setInviteEmail: (email) => set({ inviteEmail: email }),
  resetInviteForm: () => set({ inviteEmail: "", isInviteOpen: false }),
}));
