import React from "react";
import Modal from "../../../components/common/Modal";
import { Button } from "../../../components/common/UI";
import { useSplitStore } from "../stores/splitStore";
import { Trash2 } from "lucide-react";

export const CreateSplitModal: React.FC = () => {
  const {
    isCreateSplitOpen,
    splitName,
    splitStartDate,
    creatorPercentage,
    members,
    setCreateSplitOpen,
    setSplitName,
    setSplitStartDate,
    setCreatorPercentage,
    addMember,
    removeMember,
    updateMemberEmail,
    updateMemberPercentage,
    getTotalPercentage,
    createSplit,
    resetForm,
  } = useSplitStore();

  const totalPercentage = getTotalPercentage();
  const isValid = totalPercentage === 100 && splitName.trim() !== "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      createSplit();
    }
  };

  return (
    <Modal
      isOpen={isCreateSplitOpen}
      onClose={() => {
        resetForm();
        setCreateSplitOpen(false);
      }}
      title="Create Split"
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Split Name */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            * Split Name
          </label>
          <input
            value={splitName}
            onChange={(e) => setSplitName(e.target.value)}
            placeholder="Enter split name"
            required
            className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-banana-400"
          />
        </div>

        {/* Split Start Date */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            * Split Start Date
          </label>
          <input
            type="date"
            value={splitStartDate}
            onChange={(e) => setSplitStartDate(e.target.value)}
            required
            className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-banana-400"
          />
          <p className="text-xs text-slate-500 mt-1">
            You can set the Split Start Date retroactively for up to 45 days.
          </p>
        </div>

        {/* Validation Warning */}
        {totalPercentage !== 100 && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
            <p className="text-sm text-red-400">Split must add up to 100%</p>
          </div>
        )}

        {/* Split Percentages */}
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-white">Split Percentages</h3>
            <span className="text-2xl font-bold text-white">
              {totalPercentage}%
            </span>
          </div>

          <div className="space-y-3">
            {/* Creator Row */}
            <div className="flex items-center gap-3 bg-slate-900/50 p-3 rounded-lg border border-slate-700">
              <div className="w-10 h-10 rounded-full bg-linear-to-tr from-banana-600 to-banana-500 flex items-center justify-center text-sm font-bold text-dark-900 shrink-0">
                J
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">John Doe</p>
                <p className="text-xs text-slate-500">Creator</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  inputMode="numeric"
                  value={creatorPercentage}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, "");
                    const num =
                      value === ""
                        ? 0
                        : Math.min(100, Math.max(0, Number(value)));
                    setCreatorPercentage(num);
                  }}
                  className="w-15 bg-slate-800 border border-slate-600 rounded px-3 py-2 text-center text-sm text-white focus:outline-none focus:border-banana-400"
                />
                <span className="text-slate-400">%</span>
              </div>
            </div>

            {/* Member Rows */}
            {members.map((member) => (
              <div
                key={member.id}
                className="flex items-center gap-3 bg-slate-900/50 p-3 rounded-lg border border-slate-700"
              >
                <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-sm font-bold text-white shrink-0">
                  <span className="text-slate-400">+</span>
                </div>
                <div className="flex-1">
                  <input
                    type="email"
                    value={member.email}
                    onChange={(e) =>
                      updateMemberEmail(member.id, e.target.value)
                    }
                    placeholder="Creator Email Address"
                    className="w-full bg-transparent border-none text-sm text-white placeholder:text-slate-500 focus:outline-none"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeMember(member.id)}
                  className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    inputMode="numeric"
                    value={member.percentage}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, "");
                      const num =
                        value === ""
                          ? 0
                          : Math.min(100, Math.max(0, Number(value)));
                      updateMemberPercentage(member.id, num);
                    }}
                    className="w-15 bg-slate-800 border border-slate-600 rounded px-3 py-2 text-center text-sm text-white focus:outline-none focus:border-banana-400"
                  />
                  <span className="text-slate-400">%</span>
                </div>
              </div>
            ))}

            {/* Add Member Button */}
            <button
              type="button"
              onClick={addMember}
              className="w-full border-2 border-dashed border-slate-700 rounded-lg p-4 text-slate-400 hover:text-white hover:border-slate-600 transition-colors flex items-center justify-center gap-2"
            >
              <span className="text-xl">+</span>
              <span className="text-sm font-medium">Add Member</span>
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              resetForm();
              setCreateSplitOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={!isValid}>
            Create Split
          </Button>
        </div>
      </form>
    </Modal>
  );
};
