import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSplitStore } from "../stores/splitStore";
import { Button } from "../../../components/common/UI";
import { X } from "lucide-react";

export const SplitDetailDrawer: React.FC = () => {
  const {
    isDetailDrawerOpen,
    selectedSplit,
    isEditMode,
    editCreatorPercentage,
    editMembers,
    closeDetailDrawer,
    setEditMode,
    setEditCreatorPercentage,
    updateEditMemberPercentage,
    getEditTotalPercentage,
    saveEditChanges,
  } = useSplitStore();

  const [activeTab, setActiveTab] = useState<"details" | "transactions">(
    "details"
  );

  // Mock data for display
  const currentSplitBalance = 18471.0;
  const yourPercentage = isEditMode
    ? editCreatorPercentage
    : selectedSplit?.creatorPercentage ?? 0;
  const yourTotalEarnings = (currentSplitBalance * yourPercentage) / 100;

  const editTotalPercentage = getEditTotalPercentage();
  const isValidEdit = editTotalPercentage === 100;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <AnimatePresence>
      {isDetailDrawerOpen && selectedSplit && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-70"
            onClick={closeDetailDrawer}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-slate-900 border-l border-slate-800 z-70 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-800 shrink-0">
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`text-sm font-medium ${
                    selectedSplit.status === "active"
                      ? "text-green-400"
                      : "text-slate-400"
                  }`}
                >
                  {selectedSplit.status === "active"
                    ? "Active split"
                    : "Inactive split"}
                </span>
                <button
                  onClick={closeDetailDrawer}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              <h2 className="text-xl font-bold text-white">
                {selectedSplit.name}
              </h2>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-slate-800 shrink-0">
              <button
                onClick={() => setActiveTab("details")}
                className={`flex-1 py-3 text-sm font-medium transition-colors ${
                  activeTab === "details"
                    ? "text-white border-b-2 border-banana-400"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Details
              </button>
              <button
                onClick={() => setActiveTab("transactions")}
                className={`flex-1 py-3 text-sm font-medium transition-colors ${
                  activeTab === "transactions"
                    ? "text-white border-b-2 border-banana-400"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Transactions
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === "details" ? (
                <div className="space-y-6">
                  {/* Split Info */}
                  <p className="text-sm text-slate-400">
                    Split created {formatDate(selectedSplit.startDate)} by{" "}
                    {selectedSplit.creatorName}
                  </p>

                  {/* Balance Cards */}
                  <div className="space-y-3">
                    <div className="bg-banana-400/10 rounded-xl p-4">
                      <p className="text-sm text-slate-400 mb-1">
                        Current Split balance
                      </p>
                      <p className="text-2xl font-bold text-white">
                        $
                        {currentSplitBalance.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                        })}
                      </p>
                    </div>

                    <div className="bg-banana-400/10 rounded-xl p-4">
                      <p className="text-sm text-slate-400 mb-1">
                        Your total earnings
                      </p>
                      <p className="text-2xl font-bold text-white">
                        $
                        {yourTotalEarnings.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Validation Warning */}
                  {isEditMode && !isValidEdit && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                      <p className="text-sm text-red-400">
                        Split must add up to 100% (currently{" "}
                        {editTotalPercentage}%)
                      </p>
                    </div>
                  )}

                  {/* Members List */}
                  <div className="space-y-3">
                    {/* Creator */}
                    <div className="flex items-center justify-between py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-linear-to-tr from-banana-600 to-banana-500 flex items-center justify-center text-sm font-bold text-dark-900">
                          {getInitials(selectedSplit.creatorName)}
                        </div>
                        <div>
                          <p className="text-white font-medium">You</p>
                          <p className="text-xs text-slate-500">
                            {selectedSplit.creatorName}
                          </p>
                        </div>
                      </div>
                      {isEditMode ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            inputMode="numeric"
                            value={editCreatorPercentage}
                            onChange={(e) => {
                              const value = e.target.value.replace(
                                /[^0-9]/g,
                                ""
                              );
                              const num =
                                value === ""
                                  ? 0
                                  : Math.min(100, Math.max(0, Number(value)));
                              setEditCreatorPercentage(num);
                            }}
                            className="w-16 bg-slate-800 border border-slate-600 rounded px-2 py-1 text-right text-sm text-white focus:outline-none focus:border-banana-400"
                          />
                          <span className="text-slate-400">%</span>
                        </div>
                      ) : (
                        <span className="text-slate-400 font-medium">
                          {selectedSplit.creatorPercentage}%
                        </span>
                      )}
                    </div>

                    {/* Members */}
                    {(isEditMode ? editMembers : selectedSplit.members).map(
                      (member) => (
                        <div
                          key={member.id}
                          className="flex items-center justify-between py-3"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-sm font-bold text-white">
                              {member.name
                                ? getInitials(member.name)
                                : member.email[0].toUpperCase()}
                            </div>
                            <div>
                              <p className="text-white font-medium">
                                {member.name || member.email}
                              </p>
                              {member.name && (
                                <p className="text-xs text-slate-500">
                                  {member.email}
                                </p>
                              )}
                            </div>
                          </div>
                          {isEditMode ? (
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                inputMode="numeric"
                                value={member.percentage}
                                onChange={(e) => {
                                  const value = e.target.value.replace(
                                    /[^0-9]/g,
                                    ""
                                  );
                                  const num =
                                    value === ""
                                      ? 0
                                      : Math.min(
                                          100,
                                          Math.max(0, Number(value))
                                        );
                                  updateEditMemberPercentage(member.id, num);
                                }}
                                className="w-16 bg-slate-800 border border-slate-600 rounded px-2 py-1 text-right text-sm text-white focus:outline-none focus:border-banana-400"
                              />
                              <span className="text-slate-400">%</span>
                            </div>
                          ) : (
                            <span className="text-slate-400 font-medium">
                              {member.percentage}%
                            </span>
                          )}
                        </div>
                      )
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-slate-400">No transactions yet</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-slate-800 shrink-0">
              {isEditMode ? (
                <div className="flex gap-3">
                  <Button
                    variant="secondary"
                    fullWidth
                    onClick={() => setEditMode(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    fullWidth
                    onClick={saveEditChanges}
                    disabled={!isValidEdit}
                  >
                    Save Changes
                  </Button>
                </div>
              ) : (
                <Button fullWidth onClick={() => setEditMode(true)}>
                  Edit split
                </Button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
