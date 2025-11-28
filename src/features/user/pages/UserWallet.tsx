import React, { useState, useRef } from "react";
import { Plus, Building2, ExternalLink } from "lucide-react";
import { Layout } from "../../../components/common/Layout";
import BankCard from "../../../components/common/BankCard";
import { useWalletStore } from "../stores/walletStore";
import { Button } from "../../../components/common/UI";

export const UserWallet: React.FC = () => {
  const { wallets } = useWalletStore();
  const [cardDisplayOrder, setCardDisplayOrder] = useState<number[]>(() =>
    wallets.map((_, i) => i)
  );
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const displayedCards = cardDisplayOrder
    .map((index) => wallets[index])
    .filter(Boolean);

  const cycleDisplayOrder = () => {
    setCardDisplayOrder((prev) => {
      const newOrder = [...prev];
      const first = newOrder.shift();
      if (first !== undefined) newOrder.push(first);
      return newOrder;
    });
  };

  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    dragStartX.current = clientX;
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    const delta = clientX - dragStartX.current;
    setDragX(delta);
  };

  const handleDragEnd = () => {
    setIsDragging(false);

    if (Math.abs(dragX) > 100) {
      const direction = dragX > 0 ? 1 : -1;
      setDragX(direction * 1000);

      setTimeout(() => {
        cycleDisplayOrder();
        setDragX(0);
      }, 300);
    } else {
      setDragX(0);
    }
  };

  // Mouse Handlers
  const onMouseDown = (e: React.MouseEvent) => handleDragStart(e.clientX);
  const onMouseMove = (e: React.MouseEvent) => handleDragMove(e.clientX);
  const onMouseUp = () => handleDragEnd();
  const onMouseLeave = () => {
    if (isDragging) handleDragEnd();
  };

  // Touch Handlers
  const onTouchStart = (e: React.TouchEvent) =>
    handleDragStart(e.touches[0].clientX);
  const onTouchMove = (e: React.TouchEvent) =>
    handleDragMove(e.touches[0].clientX);
  const onTouchEnd = () => handleDragEnd();

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Bank Accounts</h1>
            <p className="text-zinc-400">
              Manage your connected accounts and platforms.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mt-20">
          <div className="space-y-4">
            <div
              className="relative h-[300px] w-full max-w-md mx-auto md:mx-0 perspective-1000 pt-10"
              ref={containerRef}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseLeave}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {displayedCards.map((wallet, index) => {
                // Only render top 3 cards for performance
                if (index > 2) return null;

                const isTop = index === 0;
                let style: React.CSSProperties = {};

                if (isTop) {
                  style = {
                    transform: `translateX(${dragX}px) rotate(${
                      dragX * 0.05
                    }deg)`,
                    zIndex: 30,
                    cursor: isDragging ? "grabbing" : "grab",
                    transition: isDragging
                      ? "none"
                      : "transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",
                    top: "20px", // Offset for the peeking cards above
                  };
                } else {
                  const scale = 0.92 - index * 0.03;
                  const translateY = -20 - index * 8;
                  const opacity = 1 - index * 0.15;

                  style = {
                    transform: `scale(${scale}) translateY(${translateY}px)`,
                    zIndex: 30 - index * 10,
                    opacity: opacity,
                    transition: "transform 0.3s ease, opacity 0.3s ease",
                    filter: `brightness(${0.7 - index * 0.1})`,
                  };
                }

                return (
                  <div
                    key={wallet.id}
                    className="absolute top-0 left-0 w-full"
                    style={style}
                    onMouseDown={isTop ? onMouseDown : undefined}
                    onTouchStart={isTop ? onTouchStart : undefined}
                  >
                    <BankCard
                      balance={wallet.balance || "$0.00"}
                      bankName={wallet.bankName}
                      last4={wallet.last4}
                      color={wallet.color}
                      className="shadow-2xl"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Add New Account Card - Matched Height */}
          <div className="space-y-4 mt-5">
            <div className="border-2 border-dashed border-zinc-800 rounded-2xl p-6 flex flex-col items-center justify-center text-center h-64 hover:border-zinc-700 hover:bg-zinc-800/30 transition-all cursor-pointer group">
              <div className="w-14 h-14 rounded-full bg-zinc-800 group-hover:bg-zinc-700 flex items-center justify-center mb-4 transition-colors">
                <Plus
                  className="text-zinc-400 group-hover:text-white"
                  size={24}
                />
              </div>
              <h3 className="text-zinc-300 font-bold mb-1 text-lg">
                Link New Account
              </h3>
              <p className="text-sm text-zinc-500">
                Connect a bank to a platform
              </p>
            </div>
          </div>
        </div>

        {/* Connected Platforms Table */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white">Linked Accounts</h3>
          </div>

          <div className="bg-slate-900 rounded-2xl border border-slate-800 flex flex-col max-h-[600px]">
            <div className="p-6 overflow-y-auto">
              {/* Table Header */}
              <div className="hidden sm:grid grid-cols-12 sm:items-center text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 px-2">
                <div className="col-span-4">Bank Details</div>
                <div className="col-span-3">Account Type</div>
                <div className="col-span-3">Platform</div>
                <div className="col-span-2 text-right">Action</div>
              </div>

              {/* Table Rows */}
              <div className="space-y-3">
                {wallets.length === 0 ? (
                  <div className="p-12 text-center">
                    <p className="text-slate-400">No linked accounts</p>
                  </div>
                ) : (
                  wallets.map((wallet) => (
                    <div
                      key={wallet.id}
                      className="group flex flex-col sm:grid sm:grid-cols-12 items-start sm:items-center p-3 rounded-xl hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-800"
                    >
                      {/* Bank Details & Icon */}
                      <div className="col-span-4 flex items-center gap-4 mb-2 sm:mb-0">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 bg-slate-800 text-slate-400">
                          <Building2 size={20} />
                        </div>
                        <div>
                          <p className="font-semibold text-white text-sm">
                            {wallet.bankName}
                          </p>
                          <p className="text-xs text-slate-500">
                            •••• {wallet.last4}
                          </p>
                        </div>
                      </div>

                      {/* Account Type */}
                      <div className="col-span-3 text-sm text-slate-400 mb-2 sm:mb-0 w-full flex justify-between sm:block">
                        <span className="sm:hidden text-xs text-slate-600 uppercase font-bold mr-2">
                          Type:
                        </span>
                        {wallet.accountType || "-"}
                      </div>

                      {/* Platform */}
                      <div className="col-span-3 mb-2 sm:mb-0 w-full flex justify-between sm:block">
                        <span className="sm:hidden text-xs text-slate-600 uppercase font-bold mr-2">
                          Platform:
                        </span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border bg-banana-400/10 text-banana-400 border-banana-400/20">
                          {wallet.platform || "-"}
                        </span>
                      </div>

                      {/* Action */}
                      <div className="col-span-2 text-right w-full flex justify-between sm:justify-end">
                        <span className="sm:hidden text-xs text-slate-600 uppercase font-bold mr-2">
                          Action:
                        </span>
                        <button className="text-slate-500 hover:text-white transition-colors">
                          <ExternalLink size={16} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
