export const UserRole = {
  CREATOR: "CREATOR",
  MEMBER: "MEMBER",
  ADMIN: "ADMIN",
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  status: "active" | "pending" | "suspended";
  bankConnected: boolean;
}

export interface Transaction {
  id: string;
  desc: string;
  sub: string;
  date: string;
  status: "COMPLETED" | "PENDING";
  amount: number;
  type: "INCOME" | "EXPENSE";
}

export interface ChartDataPoint {
  name: string;
  value: number;
  value2?: number;
}

export interface RateTiers {
  label: string;
  threshold: string;
  rate: string;
  active: boolean;
  desc: string;
}

export interface SplitMember {
  id: string;
  email: string;
  name?: string;
  percentage: number;
}

export interface Split {
  id: string;
  name: string;
  startDate: string;
  status: "active" | "inactive";
  creatorId: string;
  creatorName: string;
  creatorPercentage: number;
  members: SplitMember[];
  totalPercentage: number;
}
