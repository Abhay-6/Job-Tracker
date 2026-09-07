import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!password.trim()) {
      setError("Password is required");
      return;
    }

    try {
      setError("");

      const response = await api.post("/users/login", {
        email,
        password,
      });

      console.log(response.data);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || "Failed to login");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo / Heading */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto bg-blue-600 rounded-xl flex items-center justify-center text-white text-xl font-bold">
            J
          </div>

          <h1 className="text-2xl font-bold text-white mt-3">Job Tracker</h1>

          <p className="text-slate-400 text-sm mt-1">
            Manage your job applications
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl p-7">
          {/* Back to Home */}
          <button
            onClick={() => navigate("/")}
            className="text-sm text-slate-400 hover:text-blue-400 transition mb-6"
          >
            ← Back to Home
          </button>

          <h2 className="text-2xl font-bold text-white">Welcome back</h2>

          <p className="text-sm text-slate-400 mt-1 mb-6">
            Login to continue to your dashboard
          </p>

          {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

          <form onSubmit={handleLogin}>
            {/* Email */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700
                           text-white rounded-lg px-4 py-3
                           placeholder:text-slate-600
                           focus:outline-none focus:ring-2
                           focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700
                           text-white rounded-lg px-4 py-3
                           placeholder:text-slate-600
                           focus:outline-none focus:ring-2
                           focus:ring-blue-500"
              />
            </div>

            {/* Login */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700
                         text-white py-3 rounded-lg font-semibold
                         transition"
            >
              Login
            </button>
          </form>

          <div className="border-t border-slate-800 mt-6 pt-5 text-center">
            <p className="text-sm text-slate-400">Don't have an account?</p>

            <button
              onClick={() => navigate("/register")}
              className="text-blue-400 hover:text-blue-300
                         font-medium mt-1 transition"
            >
              Create an account →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
