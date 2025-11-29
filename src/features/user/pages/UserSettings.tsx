import React from "react";
import { Layout } from "../../../components/common/Layout";
import { Button } from "../../../components/common/UI";
import { useSettingsStore } from "../stores/settingsStore";
import { Moon, Sun } from "lucide-react";
import { UserRole } from "../../../types";

export const UserSettings: React.FC = () => {
  const {
    firstName,
    lastName,
    theme,
    currentPassword,
    newPassword,
    confirmNewPassword,
    setFirstName,
    setLastName,
    setTheme,
    setCurrentPassword,
    setNewPassword,
    setConfirmNewPassword,
    savePersonalInfo,
    updatePassword,
  } = useSettingsStore();

  const handleSavePersonalInfo = (e: React.FormEvent) => {
    e.preventDefault();
    savePersonalInfo();
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword === confirmNewPassword) {
      updatePassword();
    }
  };

  return (
    <Layout role={UserRole.CREATOR}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-white">Settings</h1>
          <p className="text-slate-400">
            Manage your account preferences and personal details
          </p>
        </div>

        {/* Personal Information */}
        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
          <h2 className="text-lg font-semibold text-white mb-6">
            Personal Information
          </h2>
          <form onSubmit={handleSavePersonalInfo} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-banana-400"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-banana-400"
                />
              </div>
            </div>
            <Button type="submit">Save Changes</Button>
          </form>
        </div>

        {/* Appearance */}
        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
          <h2 className="text-lg font-semibold text-white mb-2">Appearance</h2>
          <p className="text-sm text-slate-400 mb-6">
            Choose how BananaSplits looks to you. Select a theme below.
          </p>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setTheme("dark")}
              className={`flex items-center gap-3 px-6 py-4 rounded-xl border-2 transition-all ${
                theme === "dark"
                  ? "border-banana-400 bg-slate-800"
                  : "border-slate-700 bg-slate-800/50 hover:border-slate-600"
              }`}
            >
              <Moon size={20} className="text-slate-300" />
              <div className="text-left">
                <p className="text-white font-medium">Dark Mode</p>
                <p className="text-xs text-slate-400">Easy on the eyes</p>
              </div>
            </button>
            <button
              type="button"
              onClick={() => setTheme("light")}
              className={`flex items-center gap-3 px-6 py-4 rounded-xl border-2 transition-all ${
                theme === "light"
                  ? "border-banana-400 bg-slate-800"
                  : "border-slate-700 bg-slate-800/50 hover:border-slate-600"
              }`}
            >
              <Sun size={20} className="text-slate-300" />
              <div className="text-left">
                <p className="text-white font-medium">Light Mode</p>
                <p className="text-xs text-slate-400">Bright and clear</p>
              </div>
            </button>
          </div>
        </div>

        {/* Security */}
        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
          <h2 className="text-lg font-semibold text-white mb-6">Security</h2>
          <form onSubmit={handleUpdatePassword} className="space-y-4">
            <div>
              <label className="block text-sm text-slate-400 mb-2">
                Current Password
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-banana-400"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-banana-400"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-banana-400"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Button type="submit">Update Password</Button>
              <button
                type="button"
                className="text-sm text-banana-400 hover:text-banana-300 transition-colors"
              >
                I forgot my password
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};
