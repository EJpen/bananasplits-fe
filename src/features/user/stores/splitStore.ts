import { create } from "zustand";
import type { Split, SplitMember } from "../../../types";

interface SplitStore {
  isCreateSplitOpen: boolean;
  splitName: string;
  splitStartDate: string;
  creatorPercentage: number;
  members: SplitMember[];
  splits: Split[];

  // Drawer state
  isDetailDrawerOpen: boolean;
  selectedSplit: Split | null;
  isEditMode: boolean;
  editCreatorPercentage: number;
  editMembers: SplitMember[];

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

  // Drawer actions
  openDetailDrawer: (split: Split) => void;
  closeDetailDrawer: () => void;
  setEditMode: (edit: boolean) => void;
  setEditCreatorPercentage: (percentage: number) => void;
  updateEditMemberPercentage: (id: string, percentage: number) => void;
  getEditTotalPercentage: () => number;
  saveEditChanges: () => void;
  toggleSplitStatus: (splitId: string) => void;
}

export const useSplitStore = create<SplitStore>((set, get) => ({
  isCreateSplitOpen: false,
  splitName: "",
  splitStartDate: new Date().toISOString().split("T")[0],
  creatorPercentage: 50,
  members: [],
  splits: [],

  // Drawer state
  isDetailDrawerOpen: false,
  selectedSplit: null,
  isEditMode: false,
  editCreatorPercentage: 0,
  editMembers: [],

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
      creatorName: "John Doe",
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

  // Drawer actions
  openDetailDrawer: (split) => {
    set({
      isDetailDrawerOpen: true,
      selectedSplit: split,
      isEditMode: false,
      editCreatorPercentage: split.creatorPercentage,
      editMembers: split.members.map((m) => ({ ...m })),
    });
  },

  closeDetailDrawer: () => {
    set({
      isDetailDrawerOpen: false,
      selectedSplit: null,
      isEditMode: false,
      editCreatorPercentage: 0,
      editMembers: [],
    });
  },

  setEditMode: (edit) => set({ isEditMode: edit }),

  setEditCreatorPercentage: (percentage) =>
    set({ editCreatorPercentage: percentage }),

  updateEditMemberPercentage: (id, percentage) => {
    set((state) => ({
      editMembers: state.editMembers.map((m) =>
        m.id === id ? { ...m, percentage } : m
      ),
    }));
  },

  getEditTotalPercentage: () => {
    const state = get();
    const membersTotal = state.editMembers.reduce(
      (sum, m) => sum + m.percentage,
      0
    );
    return state.editCreatorPercentage + membersTotal;
  },

  saveEditChanges: () => {
    const state = get();
    if (!state.selectedSplit) return;

    const updatedSplit: Split = {
      ...state.selectedSplit,
      creatorPercentage: state.editCreatorPercentage,
      members: state.editMembers,
      totalPercentage: state.getEditTotalPercentage(),
    };

    set((state) => ({
      splits: state.splits.map((s) =>
        s.id === updatedSplit.id ? updatedSplit : s
      ),
      selectedSplit: updatedSplit,
      isEditMode: false,
    }));
  },

  toggleSplitStatus: (splitId) => {
    set((state) => ({
      splits: state.splits.map((s) =>
        s.id === splitId
          ? { ...s, status: s.status === "active" ? "inactive" : "active" }
          : s
      ),
      selectedSplit:
        state.selectedSplit?.id === splitId
          ? {
              ...state.selectedSplit,
              status:
                state.selectedSplit.status === "active" ? "inactive" : "active",
            }
          : state.selectedSplit,
    }));
  },
}));
