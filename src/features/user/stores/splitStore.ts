import { create } from "zustand";
import type { Split, SplitMember } from "../../../types/types";

interface SplitStore {
  isCreateSplitOpen: boolean;
  splitName: string;
  splitStartDate: string;
  creatorPercentage: number;
  members: SplitMember[];
  splits: Split[];

  setCreateSplitOpen: (open: boolean) => void;
  setSplitName: (name: string) => void;
  setSplitStartDate: (date: string) => void;
  setCreatorPercentage: (percentage: number) => void;
  addMember: () => void;
  removeMember: (id: string) => void;
  updateMemberEmail: (id: string, email: string) => void;
  updateMemberPercentage: (id: string, percentage: number) => void;
  getTotalPercentage: () => number;
  createSplit: () => void;
  resetForm: () => void;
}

export const useSplitStore = create<SplitStore>((set, get) => ({
  isCreateSplitOpen: false,
  splitName: "",
  splitStartDate: new Date().toISOString().split("T")[0],
  creatorPercentage: 50,
  members: [],
  splits: [],

  setCreateSplitOpen: (open) => set({ isCreateSplitOpen: open }),
  setSplitName: (name) => set({ splitName: name }),
  setSplitStartDate: (date) => set({ splitStartDate: date }),
  setCreatorPercentage: (percentage) => set({ creatorPercentage: percentage }),

  addMember: () => {
    const newMember: SplitMember = {
      id: Date.now().toString(),
      email: "",
      percentage: 0,
    };
    set((state) => ({ members: [...state.members, newMember] }));
  },

  removeMember: (id) => {
    set((state) => ({
      members: state.members.filter((m) => m.id !== id),
    }));
  },

  updateMemberEmail: (id, email) => {
    set((state) => ({
      members: state.members.map((m) => (m.id === id ? { ...m, email } : m)),
    }));
  },

  updateMemberPercentage: (id, percentage) => {
    set((state) => ({
      members: state.members.map((m) =>
        m.id === id ? { ...m, percentage } : m
      ),
    }));
  },

  getTotalPercentage: () => {
    const state = get();
    const membersTotal = state.members.reduce(
      (sum, m) => sum + m.percentage,
      0
    );
    return state.creatorPercentage + membersTotal;
  },

  createSplit: () => {
    const state = get();
    const newSplit: Split = {
      id: Date.now().toString(),
      name: state.splitName,
      startDate: state.splitStartDate,
      status: "active",
      creatorId: "1",
      creatorName: "Alice Maker",
      creatorPercentage: state.creatorPercentage,
      members: state.members,
      totalPercentage: state.getTotalPercentage(),
    };

    set((state) => ({
      splits: [...state.splits, newSplit],
    }));

    get().resetForm();
  },

  resetForm: () => {
    set({
      isCreateSplitOpen: false,
      splitName: "",
      splitStartDate: new Date().toISOString().split("T")[0],
      creatorPercentage: 50,
      members: [],
    });
  },
}));
