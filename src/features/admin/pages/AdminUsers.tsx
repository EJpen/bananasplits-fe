import React from "react";
import { Layout } from "../../../components/common/Layout";
import { Card, Badge, Button } from "../../../components/common/UI";
import { Dropdown } from "../../../components/common/Dropdown";
import { useAdminUsersStore } from "../stores/adminUsersStore";
import {
  Search,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  UserPlus,
} from "lucide-react";
import { UserRole } from "../../../types";

const STATUS_OPTIONS = [
  { id: "all", name: "All Status" },
  { id: "verified", name: "Verified" },
  { id: "pending", name: "Pending" },
  { id: "suspended", name: "Suspended" },
];

const ROLE_OPTIONS = [
  { id: "all", name: "All Roles" },
  { id: "CREATOR", name: "Creator" },
  { id: "MEMBER", name: "Member" },
];

export const AdminUsers: React.FC = () => {
  const {
    searchTerm,
    statusFilter,
    roleFilter,
    setSearchTerm,
    setStatusFilter,
    setRoleFilter,
    getFilteredUsers,
  } = useAdminUsersStore();

  const filteredUsers = getFilteredUsers();

  return (
    <Layout role={UserRole.ADMIN}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Users</h1>
            <p className="text-slate-400">
              Manage all platform users and their permissions
            </p>
          </div>
          <Button>
            <UserPlus size={18} className="mr-2" />
            Add User
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
            <p className="text-sm text-slate-400">Total Users</p>
            <p className="text-2xl font-bold text-white mt-1">
              {filteredUsers.length}
            </p>
          </div>
          <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
            <p className="text-sm text-slate-400">Verified</p>
            <p className="text-2xl font-bold text-green-400 mt-1">
              {filteredUsers.filter((u) => u.status === "verified").length}
            </p>
          </div>
          <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
            <p className="text-sm text-slate-400">Pending</p>
            <p className="text-2xl font-bold text-banana-400 mt-1">
              {filteredUsers.filter((u) => u.status === "pending").length}
            </p>
          </div>
          <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
            <p className="text-sm text-slate-400">Suspended</p>
            <p className="text-2xl font-bold text-red-400 mt-1">
              {filteredUsers.filter((u) => u.status === "suspended").length}
            </p>
          </div>
        </div>

        {/* Users Table */}
        <Card title="All Users">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                size={18}
              />
              <input
                type="text"
                placeholder="Search users..."
                className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-slate-200 focus:ring-2 focus:ring-banana-400/50 focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Dropdown
                options={STATUS_OPTIONS}
                value={statusFilter}
                onChange={(value) =>
                  setStatusFilter(
                    value as "all" | "verified" | "pending" | "suspended"
                  )
                }
                placeholder="All Status"
              />
              <Dropdown
                options={ROLE_OPTIONS}
                value={roleFilter}
                onChange={(value) =>
                  setRoleFilter(value as "all" | "CREATOR" | "MEMBER")
                }
                placeholder="All Roles"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="p-4 font-medium">User</th>
                  <th className="p-4 font-medium">Role</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Bank Connected</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-400">
                      No users found matching your criteria
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-slate-700/20 transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-sm font-bold text-white">
                            {user.firstName[0]}
                            {user.lastName[0]}
                          </div>
                          <div>
                            <p className="font-medium text-white">
                              {user.firstName} {user.lastName}
                            </p>
                            <p className="text-xs text-slate-500">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span
                          className={`text-xs font-medium px-2 py-1 rounded ${
                            user.role === UserRole.CREATOR
                              ? "bg-purple-500/10 text-purple-400"
                              : "bg-blue-500/10 text-blue-400"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="p-4">
                        <Badge status={user.status} />
                      </td>
                      <td className="p-4 text-sm text-slate-300">
                        {user.bankConnected ? (
                          <div className="flex items-center gap-1.5 text-green-400">
                            <CheckCircle size={14} /> <span>Linked</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-slate-500">
                            <XCircle size={14} /> <span>Missing</span>
                          </div>
                        )}
                      </td>
                      <td className="p-4 text-right">
                        <button className="p-2 hover:bg-slate-700 rounded text-slate-400 hover:text-white transition-colors">
                          <MoreHorizontal size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination info */}
          <div className="mt-4 pt-4 border-t border-slate-700 flex items-center justify-between text-sm text-slate-400">
            <span>
              Showing {filteredUsers.length} of {filteredUsers.length} users
            </span>
          </div>
        </Card>
      </div>
    </Layout>
  );
};
