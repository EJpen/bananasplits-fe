import type { User, Transaction, ChartDataPoint, RateTiers } from "../types";

import { UserRole } from "../types";

export const MOCK_USERS: User[] = [
  {
    id: "1",
    firstName: "Alice",
    lastName: "Maker",
    email: "alice@banana.com",
    role: UserRole.CREATOR,
    status: "active",
    bankConnected: true,
  },
  {
    id: "2",
    firstName: "Bob",
    lastName: "Editor",
    email: "bob@banana.com",
    role: UserRole.MEMBER,
    status: "active",
    bankConnected: true,
  },
  {
    id: "3",
    firstName: "Charlie",
    lastName: "Writer",
    email: "charlie@banana.com",
    role: UserRole.MEMBER,
    status: "pending",
    bankConnected: false,
  },
  {
    id: "4",
    firstName: "Dave",
    lastName: "Manager",
    email: "dave@banana.com",
    role: UserRole.ADMIN,
    status: "active",
    bankConnected: true,
  },
];

export const REVENUE_DATA: ChartDataPoint[] = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 2000 },
  { name: "Apr", value: 2780 },
  { name: "May", value: 1890 },
  { name: "Jun", value: 2390 },
  { name: "Jul", value: 3490 },
];

export const SUBSCRIPTION_TIERS = [
  {
    id: "green",
    name: "Green Banana",
    price: "$0",
    period: "/mo",
    description: "Essential tools for new creators starting out.",
    features: [
      "Unlimited Income Sources",
      "Split with up to 3 members",
      "Standard Payout Speed (3-5 days)",
      "Basic Analytics",
    ],
    accent: "border-green-500/50 text-green-400",
    bg: "bg-green-500/5 hover:bg-green-500/10",
    button: "bg-zinc-800 text-white hover:bg-zinc-700",
  },
  {
    id: "ripe",
    name: "Ripe Banana",
    price: "$19",
    period: "/mo",
    description: "Advanced features for growing teams & studios.",
    features: [
      "Everything in Green",
      "Split with up to 20 members",
      "Instant Payouts",
      "Detailed Expense Tracking",
      "Priority Support",
    ],
    recommended: true,
    accent: "border-banana-400 text-banana-400",
    bg: "bg-banana-400/10 hover:bg-banana-400/20",
    button: "bg-banana-400 text-dark-900 hover:bg-banana-500",
  },
  {
    id: "golden",
    name: "Golden Banana",
    price: "$99",
    period: "/mo",
    description: "Maximum power for established media empires.",
    features: [
      "Everything in Ripe",
      "Unlimited Team Members",
      "Multi-Currency Support",
      "Dedicated Account Manager",
      "White-label Reports",
    ],
    accent: "border-yellow-200 text-yellow-100",
    bg: "bg-gradient-to-br from-yellow-600/20 to-yellow-800/20 hover:from-yellow-600/30 hover:to-yellow-800/30",
    button:
      "bg-gradient-to-r from-yellow-200 to-yellow-500 text-dark-900 hover:opacity-90",
  },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "1",
    desc: "YouTube AdSense Oct",
    sub: "To: Sach T.",
    date: "2023-10-25",
    status: "COMPLETED",
    amount: 4500.0,
    type: "INCOME",
  },
  {
    id: "2",
    desc: "Split to Editor (Mark)",
    sub: "To: Mark T.",
    date: "2023-10-26",
    status: "COMPLETED",
    amount: 450.0,
    type: "EXPENSE",
  },
  {
    id: "3",
    desc: "Split to Scriptwriter",
    sub: "To: Sarah L.",
    date: "2023-10-26",
    status: "COMPLETED",
    amount: 225.0,
    type: "EXPENSE",
  },
  {
    id: "4",
    desc: "Sponsor: NordVPN",
    sub: "To: Jane L.",
    date: "2023-10-28",
    status: "PENDING",
    amount: 2000.0,
    type: "INCOME",
  },
  {
    id: "5",
    desc: "Equipment Upgrade",
    sub: "To: Tech Store",
    date: "2023-10-29",
    status: "COMPLETED",
    amount: 1200.0,
    type: "EXPENSE",
  },
];

export const RATE_TIERS: RateTiers[] = [
  {
    label: "Starter",
    threshold: "< $50k",
    rate: "5.0%",
    active: false,
    desc: "Standard",
  },
  {
    label: "Volume Tier 1",
    threshold: "$50k",
    rate: "4.20%",
    active: true,
    desc: "Monthly earnings",
  },
  {
    label: "Volume Tier 2",
    threshold: "$100k",
    rate: "3.75%",
    active: false,
    desc: "Monthly earnings",
  },
  {
    label: "Enterprise",
    threshold: "$500k",
    rate: "3.25%",
    active: false,
    desc: "Monthly earnings",
  },
];

export const MOCK_USER_DISTRIBUTION = [
  { name: "Creators", value: 1240, color: "#facc15" }, // banana-400
  { name: "Members", value: 850, color: "#a1a1aa" }, // zinc-400
  { name: "Pending", value: 124, color: "#ef4444" }, // red-500
];
