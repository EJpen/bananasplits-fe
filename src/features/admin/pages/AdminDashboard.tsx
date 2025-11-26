import React from "react";
import { Layout } from "../../../components/common/Layout";
import { Card, Badge, Button } from "../../../components/common/UI";
import { MOCK_USERS, REVENUE_DATA, MOCK_USER_DISTRIBUTION } from "../../../constants/mock.constants";
import { useAdminStore } from "../stores/adminStore";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  Pie,
  PieChart,
  Cell,
  Legend,
} from "recharts";
import {
  Search,
  Filter,
  MoreHorizontal,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { UserRole } from "../../../types/types";

export const AdminDashboard: React.FC = () => {
  const { searchTerm, setSearchTerm } = useAdminStore();

  const filteredUsers = MOCK_USERS.filter(
    (u) =>
      u.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout role={UserRole.ADMIN}>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Overview</h1>
            <p className="text-slate-400 mt-1">
              Platform metrics and member management
            </p>
          </div>
          <Button>Export Report</Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="relative overflow-hidden group">
            <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <div className="w-24 h-24 bg-banana-400 rounded-full blur-2xl"></div>
            </div>
            <p className="text-sm font-medium text-slate-400">Total Revenue</p>
            <h3 className="text-3xl font-bold text-white mt-2">$245,900.00</h3>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-400 bg-green-400/10 px-2 py-0.5 rounded mr-2">
                +12.5%
              </span>
              <span className="text-slate-500">vs last month</span>
            </div>
          </Card>

          <Card>
            <p className="text-sm font-medium text-slate-400">Total Creators</p>
            <h3 className="text-3xl font-bold text-white mt-2">1,240</h3>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-400 bg-green-400/10 px-2 py-0.5 rounded mr-2">
                +3.2%
              </span>
              <span className="text-slate-500">vs last month</span>
            </div>
          </Card>

          <Card>
            <p className="text-sm font-medium text-slate-400">Total Members</p>
            <h3 className="text-3xl font-bold text-white mt-2">8,502</h3>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-banana-400 bg-banana-400/10 px-2 py-0.5 rounded mr-2">
                +8.1%
              </span>
              <span className="text-slate-500">vs last month</span>
            </div>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card title="Revenue Growth" className="lg:col-span-2">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={REVENUE_DATA}>
                  <defs>
                    <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#facc15" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#facc15" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#334155"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="name"
                    stroke="#64748b"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#64748b"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      borderColor: "#334155",
                      borderRadius: "8px",
                      color: "#f1f5f9",
                    }}
                    itemStyle={{ color: "#facc15" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#facc15"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorVal)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card title="User Distribution">
            <div className="h-[250px] w-full relative pb-4">
              <p className="text-sm text-zinc-400 mb-5">
                Breakdown by role & status
              </p>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 0, right: 20, bottom: 20, left: 20 }}>
                  <Pie
                    data={MOCK_USER_DISTRIBUTION}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={85}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {MOCK_USER_DISTRIBUTION.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#18181b",
                      borderColor: "#27272a",
                      color: "#fff",
                      borderRadius: "8px",
                    }}
                    itemStyle={{ color: "#fff" }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    iconType="circle"
                    formatter={(value) => (
                      <span className="text-zinc-300 text-sm ml-1">
                        {value}
                      </span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
              {/* Center Text overlay */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[30%] text-center pointer-events-none">
                <span className="text-2xl font-bold text-white">2.2k</span>
                <p className="text-xs text-zinc-500">Total</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Members Management Table */}
        <Card title="Manage Members">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                size={18}
              />
              <input
                type="text"
                placeholder="Search users..."
                className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-slate-200 focus:ring-2 focus:ring-banana-400/50 focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="secondary" className="flex items-center gap-2">
              <Filter size={16} /> Filter
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="p-4 font-medium">User</th>
                  <th className="p-4 font-medium">Role</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Bank Connected</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-slate-700/20 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-white">
                          {user.firstName[0]}
                          {user.lastName[0]}
                        </div>
                        <div>
                          <p className="font-medium text-white">
                            {user.firstName} {user.lastName}
                          </p>
                          <p className="text-xs text-slate-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded ${
                          user.role === UserRole.CREATOR
                            ? "bg-purple-500/10 text-purple-400"
                            : "bg-blue-500/10 text-blue-400"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4">
                      <Badge status={user.status} />
                    </td>
                    <td className="p-4 text-sm text-slate-300">
                      {user.bankConnected ? (
                        <div className="flex items-center gap-1.5 text-green-400">
                          <CheckCircle size={14} /> <span>Linked</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-slate-500">
                          <XCircle size={14} /> <span>Missing</span>
                        </div>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <button className="p-1 hover:bg-slate-700 rounded text-slate-400 hover:text-white">
                        <MoreHorizontal size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </Layout>
  );
};
