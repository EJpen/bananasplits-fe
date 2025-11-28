import { create } from "zustand";
import type { TeamMember } from "../../../types";
import { MOCK_TEAM_MEMBERS } from "../../../constants/mock.constants";

interface TeamStore {
  members: TeamMember[];

  // Actions
  removeMember: (id: string) => void;
  addMember: (member: TeamMember) => void;
  updateMemberStatus: (id: string, status: "active" | "pending") => void;
  getTotalMembers: () => number;
  getActiveMembers: () => number;
  getPendingMembers: () => number;
}

export const useTeamStore = create<TeamStore>((set, get) => ({
  members: MOCK_TEAM_MEMBERS,

  removeMember: (id) => {
    set((state) => ({
      members: state.members.filter((m) => m.id !== id),
    }));
  },

  addMember: (member) => {
    set((state) => ({
      members: [...state.members, member],
    }));
  },

  updateMemberStatus: (id, status) => {
    set((state) => ({
      members: state.members.map((m) => (m.id === id ? { ...m, status } : m)),
    }));
  },

  getTotalMembers: () => {
    return get().members.length;
  },

  getActiveMembers: () => {
    return get().members.filter((m) => m.status === "active").length;
  },

  getPendingMembers: () => {
    return get().members.filter((m) => m.status === "pending").length;
  },
}));
