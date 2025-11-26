import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Card } from "../../../components/common/UI";
import { useLoginStore } from "../stores/loginStore";

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { email, password, loading, setEmail, setPassword, setLoading } =
    useLoginStore();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      if (email?.includes("admin")) {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-banana-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-banana-400 mb-4 shadow-lg shadow-banana-400/20">
            <span className="text-3xl font-bold text-slate-900">B</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-slate-400">Sign in to manage your splits</p>
        </div>

        <Card className="shadow-2xl border-slate-700/50">
          <form onSubmit={handleLogin} className="space-y-5">
            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div>
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="flex justify-end mt-2">
                <a
                  href="#"
                  className="text-xs text-banana-400 hover:text-banana-300 font-medium"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <Button type="submit" fullWidth isLoading={loading}>
              Sign In
            </Button>
          </form>
        </Card>

        <p className="mt-8 text-center text-sm text-slate-400">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-banana-400 hover:text-banana-300"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};
