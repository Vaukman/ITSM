import React, { useState } from "react";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState(""); // success/error message

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost/backend/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        console.log("User:", data.user);
        setMessage(data.success);
        // Optionally save user info and redirect
        // localStorage.setItem("user", JSON.stringify(data.user));
        // window.location.href = "/dashboard";
      } else {
        setMessage(data.error);
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background dark:bg-dark-background">
      <div className="bg-primary dark:bg-dark-primary p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-text dark:text-dark-text mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-text dark:text-dark-text mb-1"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-accent focus:outline-none focus:ring-2 focus:ring-secondary bg-accent/10 text-text dark:text-dark-text"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-text dark:text-dark-text mb-1"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-accent focus:outline-none focus:ring-2 focus:ring-secondary bg-accent/10 text-text dark:text-dark-text"
              placeholder="••••••••"
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
          <p className="text-center mt-4 text-sm text-red-500 dark:text-red-400">
            {message}
          </p>
        )}

        <div className="flex justify-between mt-4 text-sm">
          <a href="/forgot-password" className="text-secondary hover:underline">
            Forgot Password?
          </a>
          <a href="/register" className="text-secondary hover:underline">
            Register
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
