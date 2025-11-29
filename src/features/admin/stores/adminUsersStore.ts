import { create } from "zustand";
import { MOCK_USERS } from "../../../constants/mock.constants";
import type { User } from "../../../types";

type StatusFilter = "all" | "verified" | "pending" | "suspended";
type RoleFilter = "all" | "CREATOR" | "MEMBER";

interface AdminUsersState {
  users: User[];
  searchTerm: string;
  statusFilter: StatusFilter;
  roleFilter: RoleFilter;
  selectedUserId: string | null;

  // Actions
  setSearchTerm: (term: string) => void;
  setStatusFilter: (filter: StatusFilter) => void;
  setRoleFilter: (filter: RoleFilter) => void;
  setSelectedUserId: (userId: string | null) => void;
  getFilteredUsers: () => User[];
}

export const useAdminUsersStore = create<AdminUsersState>((set, get) => ({
  users: MOCK_USERS,
  searchTerm: "",
  statusFilter: "all",
  roleFilter: "all",
  selectedUserId: null,

  setSearchTerm: (term) => set({ searchTerm: term }),
  setStatusFilter: (filter) => set({ statusFilter: filter }),
  setRoleFilter: (filter) => set({ roleFilter: filter }),
  setSelectedUserId: (userId) => set({ selectedUserId: userId }),

  getFilteredUsers: () => {
    const { users, searchTerm, statusFilter, roleFilter } = get();

    return users.filter((user) => {
      const matchesSearch =
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || user.status === statusFilter;

      const matchesRole = roleFilter === "all" || user.role === roleFilter;

      return matchesSearch && matchesStatus && matchesRole;
    });
  },
}));
