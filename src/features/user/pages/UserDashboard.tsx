import React from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../../../components/common/Layout";
import { Button, Dialog, Card, Input } from "../../../components/common/UI";
import Modal from "../../../components/common/Modal";
import BankCard from "../../../components/common/BankCard";
import { SwipableCardStack } from "../../../components/common/SwipableCardStack";
import {
  MOCK_TRANSACTIONS,
  RATE_TIERS,
} from "../../../constants/mock.constants";
import { useUserDashboardStore } from "../stores/userDashboardStore";
import { useSplitStore } from "../stores/splitStore";
import { useWalletStore, type WalletCard } from "../stores/walletStore";
import { CreateSplitModal } from "../components/CreateSplitModal";

import {
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  UserPlus,
  Banana,
  Percent,
  Info,
} from "lucide-react";
import { UserRole } from "../../../types";

// Mock Data
const STATS = [
  {
    label: "Total Balance",
    value: "$12,450.00",
    change: "+12.5%",
    sub: "Available for payout",
  },
  {
    label: "Total Revenue (30d)",
    value: "$8,240.50",
    change: "+12.5%",
    sub: "From 3 sources",
  },
  {
    label: "Paid to Team (30d)",
    value: "$2,100.00",
    change: "+12.5%",
    sub: "Across 4 members",
  },
];

export const UserDashboard: React.FC = () => {
  const navigate = useNavigate();
  const {
    isSubscriptionModalOpen,
    isInviteOpen,
    inviteEmail,
    setSubscriptionModalOpen,
    setInviteOpen,
    setInviteEmail,
    resetInviteForm,
  } = useUserDashboardStore();

  const { setCreateSplitOpen } = useSplitStore();
  const { wallets } = useWalletStore();

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    resetInviteForm();
    // Mock toast or success logic would go here
  };

  return (
    <Layout role={UserRole.CREATOR}>
      <div className="space-y-6">
        <div className="flex flex-col justify-between md:flex-row md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Hello, John 👋</h1>
            <p className="text-slate-400">
              Here's what's happening with your splits today.
            </p>
          </div>
          <div className="flex gap-3">
            {/* <Button variant="secondary" onClick={() => setInviteOpen(true)}>
              <UserPlus size={18} className="mr-2" />
              Invite Member
            </Button> */}
            <Button onClick={() => setCreateSplitOpen(true)}>
              <Plus size={18} className="mr-2" />
              New Split
            </Button>
          </div>
        </div>
        {/* Top Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STATS.map((stat, idx) => (
            <div
              key={idx}
              className="bg-slate-900 rounded-2xl p-6 border border-slate-800 relative overflow-hidden group"
            >
              {/* Watermark */}
              <div className="absolute top-1/2 right-4 -translate-y-1/2 opacity-5 group-hover:opacity-10 transition-opacity">
                <Banana className="w-24 h-24 text-banana-400 rotate-12" />
              </div>

              <div className="relative z-10">
                <p className="text-slate-400 font-medium text-sm mb-1">
                  {stat.label}
                </p>
                <h2 className="text-3xl font-bold text-white mb-3">
                  {stat.value}
                </h2>
                <div className="flex items-center text-xs">
                  <span className="bg-green-500/10 text-green-400 px-1.5 py-0.5 rounded font-medium mr-2">
                    {stat.change}
                  </span>
                  <span className="text-slate-500">{stat.sub}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Recent Transactions */}
          <div className="lg:col-span-2">
            <div className="bg-slate-900 rounded-2xl border border-slate-800 flex flex-col max-h-[600px]">
              <div className="p-6 flex justify-between items-center border-b border-slate-800/50 shrink-0">
                <h3 className="text-lg font-bold text-white">
                  Recent Transactions
                </h3>
                <button
                  className="text-sm text-slate-400 hover:text-white transition-colors"
                  onClick={() => navigate("/dashboard/transactions")}
                >
                  View All
                </button>
              </div>

              <div className="p-6 overflow-y-auto">
                <div className="hidden sm:grid grid-cols-12 sm:items-center text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 px-2">
                  <div className="col-span-5">Description</div>
                  <div className="col-span-3">Date</div>
                  <div className="col-span-2">Status</div>
                  <div className="col-span-2 text-right">Amount</div>
                </div>

                <div className="space-y-3">
                  {MOCK_TRANSACTIONS.map((tx) => (
                    <div
                      key={tx.id}
                      className="group flex flex-col sm:grid sm:grid-cols-12 items-start sm:items-center p-3 rounded-xl hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-800"
                    >
                      {/* Description & Icon */}
                      <div className="col-span-5 flex items-center gap-4 mb-2 sm:mb-0">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                            tx.type === "INCOME"
                              ? "bg-green-500/10 text-green-400"
                              : "bg-red-500/10 text-red-400"
                          }`}
                        >
                          {tx.type === "EXPENSE" ? (
                            <ArrowDownLeft size={20} />
                          ) : (
                            <ArrowUpRight size={20} />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-white text-sm">
                            {tx.desc}
                          </p>
                          {tx.sub && (
                            <p className="text-xs text-slate-500">{tx.sub}</p>
                          )}
                        </div>
                      </div>

                      {/* Date */}
                      <div className="col-span-3 text-sm text-slate-400 mb-2 sm:mb-0 w-full flex justify-between sm:block">
                        <span className="sm:hidden text-xs text-slate-600 uppercase font-bold mr-2">
                          Date:
                        </span>
                        {tx.date}
                      </div>

                      {/* Status */}
                      <div className="col-span-2 mb-2 sm:mb-0 w-full flex justify-between sm:block">
                        <span className="sm:hidden text-xs text-slate-600 uppercase font-bold mr-2">
                          Status:
                        </span>
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border ${
                            tx.status === "COMPLETED"
                              ? "bg-green-500/10 text-green-400 border-green-500/20"
                              : "bg-banana-400/10 text-banana-400 border-banana-400/20"
                          }`}
                        >
                          {tx.status}
                        </span>
                      </div>

                      {/* Amount */}
                      <div className="col-span-2 text-right w-full flex justify-between sm:block">
                        <span className="sm:hidden text-xs text-slate-600 uppercase font-bold mr-2">
                          Amount:
                        </span>
                        <span
                          className={`font-bold text-sm ${
                            tx.type === "INCOME"
                              ? "text-green-400"
                              : "text-slate-200"
                          }`}
                        >
                          {tx.type === "INCOME" ? "+" : "-"}$
                          {tx.amount.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Widgets */}
          <div className="space-y-6">
            {/* Subscription Widget */}
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-banana-400/10 p-2 rounded-lg text-banana-400">
                  <Percent size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Platform Fees
                  </h4>
                  <p className="text-xs text-slate-500">Current Rate</p>
                </div>
              </div>

              <h3 className="text-3xl font-bold text-white mb-2">5.0%</h3>
              <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                Fees are calculated based on your monthly agency revenue volume.
              </p>

              <button
                onClick={() => setSubscriptionModalOpen(true)}
                className="w-full py-2.5 px-4 rounded-lg border border-slate-600 text-sm font-medium text-slate-300 hover:text-white hover:border-slate-500 transition-colors flex items-center justify-center gap-2"
              >
                <Info size={16} /> View Fee Schedule
              </button>
            </div>

            {/* Card Widget */}
            <div className={`relative ${wallets.length > 1 ? "pt-10" : ""}`}>
              <SwipableCardStack<WalletCard>
                items={wallets}
                getItemKey={(wallet) => wallet.id}
                className="h-[280px] w-full"
                maxVisibleCards={3}
                renderCard={(wallet) => (
                  <BankCard
                    balance={wallet.balance || "$0.00"}
                    bankName={wallet.bankName}
                    last4={wallet.last4}
                    color={wallet.color}
                    className="shadow-lg"
                  />
                )}
              />
              {/* <div className="absolute bottom-4 right-4 z-40">
                <Button
                  className="bg-dark-900/20 hover:bg-dark-900/30 text-dark-900 border-none text-xs px-3 py-1.5"
                  onClick={() => navigate("/dashboard/wallet")}
                >
                  Manage
                </Button>
              </div> */}
            </div>

            {/* My Team Teaser */}
            <Card title="My Team">
              <div className="space-y-4">
                {[
                  { name: "Bob Editor", role: "Editor", split: "15%" },
                  { name: "Charlie Writer", role: "Script", split: "10%" },
                  { name: "Sarah FX", role: "VFX", split: "5%" },
                ].map((member, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-linear-to-tr from-slate-700 to-slate-600 flex items-center justify-center text-xs font-bold text-white border border-slate-500">
                        {member.name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">
                          {member.name}
                        </p>
                        <p className="text-xs text-slate-500">{member.role}</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-banana-400 bg-banana-400/10 px-2 py-1 rounded">
                      {member.split}
                    </span>
                  </div>
                ))}
              </div>
              <Button
                variant="text"
                fullWidth
                className="mt-4"
                onClick={() => navigate("/dashboard/team")}
              >
                View All Members
              </Button>
            </Card>
          </div>
        </div>
      </div>

      {/* Pricing Modal */}
      <Modal
        isOpen={isSubscriptionModalOpen}
        onClose={() => setSubscriptionModalOpen(false)}
        title="Volume Based Pricing"
        size="lg"
      >
        <div className="pt-2 pb-6">
          <p className="text-slate-400 text-center mb-8 max-w-xl mx-auto">
            BananaSplits fees start at{" "}
            <strong className="text-banana-400">5%</strong>. Fees automatically
            decrease as you reach higher monthly earnings volume.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {RATE_TIERS.map((tier, idx) => (
              <div
                key={idx}
                className={`relative p-6 rounded-xl border flex flex-col items-center text-center transition-all ${
                  tier.active
                    ? "bg-banana-400/10 border-banana-400 shadow-[0_0_20px_rgba(250,204,21,0.1)]"
                    : "bg-slate-800/50 border-slate-700 opacity-60 hover:opacity-100 hover:bg-slate-800"
                }`}
              >
                {tier.active && (
                  <div className="absolute -top-3 bg-banana-400 text-slate-900 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Current Tier
                  </div>
                )}
                {idx === 2 && !tier.active && (
                  <div className="absolute -top-3 bg-banana-400 text-slate-900 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Most Popular
                  </div>
                )}

                <div className="mb-4">
                  <h4 className="text-lg font-bold text-white mb-1">
                    {idx === 0 && "Starter"}
                    {idx === 1 && "Green Banana"}
                    {idx === 2 && "Ripe Banana"}
                    {idx === 3 && "Golden Banana"}
                  </h4>
                </div>

                <h3 className="text-2xl font-bold text-white mb-1">
                  {tier.threshold}
                </h3>
                <p className="text-xs text-slate-500 uppercase tracking-wide mb-6">
                  {tier.desc}
                </p>

                <div className="flex-1 flex items-center justify-center">
                  <div className="text-3xl font-black text-white tracking-tight">
                    {tier.rate}
                  </div>
                </div>

                <p className="mt-4 text-xs text-slate-400">platform fee</p>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-slate-800/50 rounded-lg p-4 text-center border border-slate-700/50">
            <p className="text-sm text-slate-400">
              Reach <span className="text-white font-bold">$100k</span> to
              unlock 3.75% rates.
            </p>
          </div>
        </div>
      </Modal>

      <Dialog
        isOpen={isInviteOpen}
        onClose={() => setInviteOpen(false)}
        title="Invite Team Member"
      >
        <form onSubmit={handleInvite} className="space-y-4">
          <p className="text-sm text-slate-400">
            Send an invitation to a new team member. They will need to set up
            their bank details to receive payments.
          </p>
          <Input
            label="Email Address"
            placeholder="colleague@example.com"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
          />
          <div className="flex justify-end gap-2 mt-6">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setInviteOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Send Invite</Button>
          </div>
        </form>
      </Dialog>

      <CreateSplitModal />
    </Layout>
  );
};
