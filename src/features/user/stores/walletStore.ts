import { create } from "zustand";
import { MOCK_WALLETS } from "../../../constants/mock.constants";
import type { Wallet } from "../../../types";

type CardColor = "yellow" | "blue" | "green" | "red";

const CARD_COLORS: CardColor[] = ["yellow", "blue", "green", "red"];

export interface WalletCard extends Wallet {
  color: CardColor;
}

interface WalletStore {
  wallets: WalletCard[];

  // Actions
  cycleCards: () => void;
  addWallet: (wallet: Omit<Wallet, "id">) => void;
  removeWallet: (id: string) => void;
  getWalletCount: () => number;
}

// Initialize wallets with colors
const initializeWallets = (): WalletCard[] => {
  return MOCK_WALLETS.map((wallet, index) => ({
    ...wallet,
    color: CARD_COLORS[index % CARD_COLORS.length],
  }));
};

export const useWalletStore = create<WalletStore>((set, get) => ({
  wallets: initializeWallets(),

  cycleCards: () => {
    set((state) => {
      const newWallets = [...state.wallets];
      const movedWallet = newWallets.shift();
      if (movedWallet) newWallets.push(movedWallet);
      return { wallets: newWallets };
    });
  },

  addWallet: (wallet) => {
    const newWallet: WalletCard = {
      ...wallet,
      id: `wallet_${Date.now()}`,
      color: CARD_COLORS[get().wallets.length % CARD_COLORS.length],
    };
    set((state) => ({ wallets: [...state.wallets, newWallet] }));
  },

  removeWallet: (id) => {
    set((state) => ({
      wallets: state.wallets.filter((w) => w.id !== id),
    }));
  },

  getWalletCount: () => {
    return get().wallets.length;
  },
}));
