import { create } from "zustand";

interface AdminState {
  searchTerm: string;
  selectedUser: string | null;
  setSearchTerm: (term: string) => void;
  setSelectedUser: (userId: string | null) => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  searchTerm: "",
  selectedUser: null,
  setSearchTerm: (term) => set({ searchTerm: term }),
  setSelectedUser: (userId) => set({ selectedUser: userId }),
}));
