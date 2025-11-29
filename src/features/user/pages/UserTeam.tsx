import React from "react";
import { Layout } from "../../../components/common/Layout";
import { Button } from "../../../components/common/UI";
import { UserRole } from "../../../types";
import {
  Users,
  Shield,
  UserPlus,
  Mail,
  UserX,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useTeamStore } from "../stores/teamStore";

export const UserTeam: React.FC = () => {
  const {
    members,
    removeMember,
    getTotalMembers,
    getActiveMembers,
    getPendingMembers,
  } = useTeamStore();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Layout role={UserRole.CREATOR}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col justify-between md:flex-row md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">My Team</h1>
            <p className="text-slate-400">
              Manage your team members and their roles
            </p>
          </div>
          <Button>
            <UserPlus size={18} className="mr-2" />
            Invite Member
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-banana-400/10 p-2 rounded-lg text-banana-400">
                <Users size={20} />
              </div>
              <p className="text-sm text-slate-400">Total Members</p>
            </div>
            <p className="text-2xl font-bold text-white">{getTotalMembers()}</p>
          </div>

          <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-green-500/10 p-2 rounded-lg text-green-400">
                <Users size={20} />
              </div>
              <p className="text-sm text-slate-400">Active Members</p>
            </div>
            <p className="text-2xl font-bold text-white">
              {getActiveMembers()}
            </p>
          </div>

          <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-yellow-500/10 p-2 rounded-lg text-yellow-400">
                <Users size={20} />
              </div>
              <p className="text-sm text-slate-400">Pending Invites</p>
            </div>
            <p className="text-2xl font-bold text-white">
              {getPendingMembers()}
            </p>
          </div>
        </div>

        {/* Team Members List */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 flex flex-col max-h-[600px]">
          <div className="p-6 flex justify-between items-center border-b border-slate-800/50 shrink-0">
            <h3 className="text-lg font-bold text-white">Team Members</h3>
          </div>

          {members.length === 0 ? (
            <div className="p-12 text-center">
              <div className="bg-slate-800/50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users size={32} className="text-slate-600" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                No team members yet
              </h3>
              <p className="text-slate-400 mb-6">
                Invite your first team member to start collaborating
              </p>
            </div>
          ) : (
            <div className="p-6 overflow-y-auto">
              {/* Table Header */}
              <div className="hidden sm:grid grid-cols-14 sm:items-center text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 px-2">
                <div className="col-span-4">Member</div>
                <div className="col-span-2">Position</div>
                <div className="col-span-3">Active Splits</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2">Bank Connected</div>
                <div className="col-span-1 text-right">Actions</div>
              </div>

              {/* Table Rows */}
              <div className="space-y-3">
                {members.map((member) => (
                  <div
                    key={member.id}
                    className="group flex flex-col sm:grid sm:grid-cols-14 items-start sm:items-center p-3 rounded-xl hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-800"
                  >
                    {/* Member Info */}
                    <div className="col-span-4 flex items-center gap-4 mb-2 sm:mb-0">
                      <div className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center text-sm font-bold text-white shrink-0">
                        {getInitials(member.name)}
                      </div>
                      <div>
                        <p className="font-semibold text-white text-sm">
                          {member.name}
                        </p>
                        <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                          <Mail size={12} />
                          <p className="text-xs">{member.email}</p>
                        </div>
                      </div>
                    </div>

                    {/* Role */}
                    <div className="col-span-2 mb-2 sm:mb-0 w-full flex justify-between sm:block">
                      <span className="sm:hidden text-xs text-slate-600 uppercase font-bold mr-2">
                        Role:
                      </span>
                      <div className="flex items-center gap-2">
                        <Shield size={14} className="text-banana-400" />
                        <span className="text-sm text-slate-300">
                          {member.role}
                        </span>
                      </div>
                    </div>

                    {/* Splits */}
                    <div className="col-span-3 mb-2 sm:mb-0 w-full flex justify-between sm:block">
                      <span className="sm:hidden text-xs text-slate-600 uppercase font-bold mr-2">
                        Splits:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {member.splits.map((split, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 bg-slate-800 border border-slate-700 rounded text-xs text-slate-300"
                          >
                            {split}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Status */}
                    <div className="col-span-2 mb-2 sm:mb-0 w-full flex justify-between sm:block">
                      <span className="sm:hidden text-xs text-slate-600 uppercase font-bold mr-2">
                        Status:
                      </span>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border ${
                          member.status === "verified"
                            ? "bg-green-500/10 text-green-400 border-green-500/20"
                            : "bg-banana-400/10 text-banana-400 border-banana-400/20"
                        }`}
                      >
                        {member.status}
                      </span>
                    </div>

                    {/* Bank Connected */}
                    <div className="col-span-2 mb-2 sm:mb-0 w-full flex justify-between sm:block">
                      <span className="sm:hidden text-xs text-slate-600 uppercase font-bold mr-2">
                        Bank:
                      </span>
                      {member.bankConnected ? (
                        <div className="flex items-center gap-1.5 text-green-400 text-sm">
                          <CheckCircle size={14} /> <span>Linked</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-slate-500 text-sm">
                          <XCircle size={14} /> <span>Missing</span>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="col-span-1 text-right w-full flex justify-between sm:block relative group">
                      <span className="sm:hidden text-xs text-slate-600 uppercase font-bold mr-2">
                        Actions:
                      </span>

                      <button
                        onClick={() => removeMember(member.id)}
                        aria-label="Remove from team"
                        className="p-1 hover:bg-red-500/10 rounded text-slate-400 hover:text-red-400 transition-colors"
                      >
                        <UserX size={18} />
                      </button>

                      {/* Tooltip */}
                      <span className="pointer-events-none absolute -top-8 right-0 whitespace-nowrap rounded bg-slate-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                        Remove from team
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};
