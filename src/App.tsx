import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Login } from "./features/auth/pages/Login";
import { Signup } from "./features/auth/pages/Signup";
import { AdminDashboard } from "./features/admin/pages/AdminDashboard";
import { UserDashboard } from "./features/user/pages/UserDashboard";
import { UserSplits } from "./features/user/pages/UserSplits";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/dashboard/splits" element={<UserSplits />} />
        <Route path="/admin/*" element={<AdminDashboard />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
