import React from "react";
import { Layout } from "../../../components/common/Layout";
import { Button } from "../../../components/common/UI";
import { useSplitStore } from "../stores/splitStore";
import { UserRole } from "../../../types";
import { Plus, Users, Calendar, TrendingUp } from "lucide-react";
import { CreateSplitModal } from "../components/CreateSplitModal";
import { SplitDetailDrawer } from "../components/SplitDetailDrawer";

export const UserSplits: React.FC = () => {
  const { splits, setCreateSplitOpen, openDetailDrawer, toggleSplitStatus } =
    useSplitStore();

  return (
    <Layout role={UserRole.CREATOR}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col justify-between md:flex-row md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">My Splits</h1>
            <p className="text-slate-400">
              Manage and view all your revenue splits
            </p>
          </div>
          <Button onClick={() => setCreateSplitOpen(true)}>
            <Plus size={18} className="mr-2" />
            New Split
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-green-500/10 p-2 rounded-lg text-green-400">
                <TrendingUp size={20} />
              </div>
              <p className="text-sm text-slate-400">Active Splits</p>
            </div>
            <p className="text-2xl font-bold text-white">
              {splits.filter((s) => s.status === "active").length}
            </p>
          </div>

          <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-slate-500/10 p-2 rounded-lg text-slate-400">
                <TrendingUp size={20} />
              </div>
              <p className="text-sm text-slate-400">Inactive Splits</p>
            </div>
            <p className="text-2xl font-bold text-white">
              {splits.filter((s) => s.status === "inactive").length}
            </p>
          </div>

          <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-banana-400/10 p-2 rounded-lg text-banana-400">
                <Users size={20} />
              </div>
              <p className="text-sm text-slate-400">Total Members</p>
            </div>
            <p className="text-2xl font-bold text-white">
              {splits.reduce((acc, split) => acc + split.members.length, 0)}
            </p>
          </div>
        </div>

        {/* Splits List */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 flex flex-col max-h-[600px]">
          <div className="p-6 border-b border-slate-800/50 shrink-0">
            <h3 className="text-lg font-bold text-white">All Splits</h3>
          </div>

          {splits.length === 0 ? (
            <div className="p-12 text-center">
              <div className="bg-slate-800/50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users size={32} className="text-slate-600" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                No splits yet
              </h3>
              <p className="text-slate-400 mb-6">
                Create your first split to start distributing revenue
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-800/50 overflow-y-auto">
              {splits.map((split) => (
                <div
                  key={split.id}
                  className="p-6 hover:bg-slate-800/30 transition-colors"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    {/* Split Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-semibold text-white">
                          {split.name}
                        </h4>
                        <span
                          className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${
                            split.status === "active"
                              ? "bg-green-500/10 text-green-400 border border-green-500/20"
                              : "bg-slate-500/10 text-slate-400 border border-slate-500/20"
                          }`}
                        >
                          {split.status}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                        <div className="flex items-center gap-2">
                          <Calendar size={16} />
                          <span>Started {split.startDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users size={16} />
                          <span>{split.members.length + 1} members</span>
                        </div>
                      </div>
                    </div>

                    {/* Members Preview */}
                    <div className="flex-1">
                      <div className="space-y-2">
                        {/* Creator */}
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-linear-to-tr from-banana-600 to-banana-500 flex items-center justify-center text-xs font-bold text-dark-900">
                              {split.creatorName[0]}
                            </div>
                            <span className="text-white font-medium">
                              {split.creatorName}
                            </span>
                            <span className="text-slate-500 text-xs">
                              (You)
                            </span>
                          </div>
                          <span className="text-banana-400 font-bold">
                            {split.creatorPercentage}%
                          </span>
                        </div>

                        {/* Members */}
                        {split.members.slice(0, 2).map((member) => (
                          <div
                            key={member.id}
                            className="flex items-center justify-between text-sm"
                          >
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-white">
                                {member.name?.[0] ||
                                  member.email[0].toUpperCase()}
                              </div>
                              <span className="text-slate-300">
                                {member.name || member.email}
                              </span>
                            </div>
                            <span className="text-slate-400 font-medium">
                              {member.percentage}%
                            </span>
                          </div>
                        ))}

                        {split.members.length > 2 && (
                          <p className="text-xs text-slate-500 pl-8">
                            +{split.members.length - 2} more
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button
                        variant="secondary"
                        onClick={() => openDetailDrawer(split)}
                      >
                        View Details
                      </Button>
                      {split.status === "active" && (
                        <Button
                          variant="text"
                          onClick={() => toggleSplitStatus(split.id)}
                        >
                          Deactivate
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <CreateSplitModal />
      <SplitDetailDrawer />
    </Layout>
  );
};
