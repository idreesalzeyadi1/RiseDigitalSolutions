import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useAuth } from "../../context/AuthContext";
import Button from "../../components/ui/Button";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const explicitRedirect = params.get("redirect");
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const cred = await login(form.email, form.password);

      // If a specific redirect was requested (e.g. after clicking "Enroll" on a
      // course), honor it. Otherwise, send the user to the dashboard that
      // matches their role.
      if (explicitRedirect) {
        navigate(explicitRedirect);
        return;
      }

      const snap = await getDoc(doc(db, "users", cred.user.uid));
      const role = snap.exists() ? snap.data().role : "student";

      if (role === "intern") navigate("/intern/dashboard");
      else if (role === "admin") navigate("/admin/dashboard");
      else navigate("/student/dashboard");
    } catch (err) {
      setError("Incorrect email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src="/assets/logo-circle.png" alt="RiseDigital Solutions" className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-2xl font-display font-bold text-navy-900">Welcome Back</h1>
          <p className="text-navy-600 text-sm mt-1">Log in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-surface-alt rounded-3xl p-8 space-y-4 shadow-sm">
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
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full rounded-xl border border-surface-alt px-4 py-2.5 text-sm focus-ring focus:border-brand-400"
            />
          </div>
          {error && <p className="text-xs text-red-500">{error}</p>}
          <Button type="submit" variant="gradient" className="w-full" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <p className="text-center text-sm text-navy-600 mt-6">
          Don't have an account?{" "}
          <Link to={`/signup?redirect=${explicitRedirect || "/student/dashboard"}`} className="text-brand-500 font-semibold">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
