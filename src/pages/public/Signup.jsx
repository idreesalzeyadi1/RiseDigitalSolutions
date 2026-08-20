import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Button from "../../components/ui/Button";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const redirect = params.get("redirect") || "/student/dashboard";
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signup({ ...form, role: "student" });
      navigate(redirect);
    } catch (err) {
      setError("Signup failed. This email may already be registered.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src="/assets/logo-circle.png" alt="RiseDigital Solutions" className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-2xl font-display font-bold text-navy-900">Create Your Account</h1>
          <p className="text-navy-600 text-sm mt-1">Sign up to enroll in Academy courses</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-surface-alt rounded-3xl p-8 space-y-4 shadow-sm">
          <div>
            <label className="block text-sm font-medium text-navy-800 mb-1.5">Full Name</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-xl border border-surface-alt px-4 py-2.5 text-sm focus-ring focus:border-brand-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy-800 mb-1.5">Email</label>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-xl border border-surface-alt px-4 py-2.5 text-sm focus-ring focus:border-brand-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy-800 mb-1.5">Password</label>
            <input
              required
              minLength={6}
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full rounded-xl border border-surface-alt px-4 py-2.5 text-sm focus-ring focus:border-brand-400"
            />
          </div>
          {error && <p className="text-xs text-red-500">{error}</p>}
          <Button type="submit" variant="gradient" className="w-full" disabled={loading}>
            {loading ? "Creating account..." : "Sign Up"}
          </Button>
        </form>

        <p className="text-center text-sm text-navy-600 mt-6">
          Already have an account?{" "}
          <Link to={`/login?redirect=${redirect}`} className="text-brand-500 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
