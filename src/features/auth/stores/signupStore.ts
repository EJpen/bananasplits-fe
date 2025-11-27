import { create } from "zustand";
import { UserRole } from "../../../types";

interface SignupState {
  currentStep: number;
  splitType: UserRole | null;
  setCurrentStep: (step: number) => void;
  setSplitType: (type: UserRole | null) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetForm: () => void;
}

export const useSignupStore = create<SignupState>((set) => ({
  currentStep: 0,
  splitType: null,
  setCurrentStep: (step) => set({ currentStep: step }),
  setSplitType: (type) => set({ splitType: type }),
  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  prevStep: () =>
    set((state) => ({ currentStep: Math.max(0, state.currentStep - 1) })),
  resetForm: () => set({ currentStep: 0, splitType: null }),
}));
