import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost/backend/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include", // important for PHP session
      });

      const data = await res.json();

      if (data.success) {
        // Store user info in localStorage (optional)
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/"); // redirect to dashboard/home page
      } else {
        setMessage(data.error);
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="bg-primary p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-text mb-6">
          Sign In
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-lg border border-accent focus:outline-none focus:ring-2 focus:ring-secondary bg-accent/10 text-text"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-lg border border-accent focus:outline-none focus:ring-2 focus:ring-secondary bg-accent/10 text-text"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-secondary hover:bg-secondary/90 text-white font-semibold py-2 rounded-lg transition"
          >
            Sign In
          </button>
        </form>

        {message && (
          <p className="text-center mt-4 text-sm text-red-500">{message}</p>
        )}

        <p className="text-center mt-4 text-sm">
          <a href="/forgot-password" className="text-secondary hover:underline">
            Forgot password?
          </a>
        </p>

        <p className="text-center text-sm text-accent mt-4">
          Don’t have an account?{" "}
          <a href="/register" className="text-secondary hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
