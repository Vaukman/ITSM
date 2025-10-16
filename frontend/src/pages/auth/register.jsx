import React, { useState } from "react";

function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, password, confirmPassword } = formData;

    // Basic validation
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      alert("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const payload = { firstName, lastName, email, password, confirmPassword };

    try {
      const res = await fetch("http://localhost/backend/register.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        alert(data.success);
        // redirect to login page
        window.location.href = "/login";
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background dark:bg-dark-background">
      <div className="bg-primary dark:bg-dark-primary p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-text dark:text-dark-text mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-text dark:text-dark-text mb-1"
            >
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              placeholder="John"
              className="w-full px-4 py-2 rounded-lg border border-accent focus:outline-none focus:ring-2 focus:ring-secondary bg-accent/10 text-text dark:text-dark-text"
            />
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-text dark:text-dark-text mb-1"
            >
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              placeholder="Doe"
              className="w-full px-4 py-2 rounded-lg border border-accent focus:outline-none focus:ring-2 focus:ring-secondary bg-accent/10 text-text dark:text-dark-text"
            />
          </div>

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
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-lg border border-accent focus:outline-none focus:ring-2 focus:ring-secondary bg-accent/10 text-text dark:text-dark-text"
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
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-lg border border-accent focus:outline-none focus:ring-2 focus:ring-secondary bg-accent/10 text-text dark:text-dark-text"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-text dark:text-dark-text mb-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-lg border border-accent focus:outline-none focus:ring-2 focus:ring-secondary bg-accent/10 text-text dark:text-dark-text"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-secondary hover:bg-secondary/90 text-white font-semibold py-2 rounded-lg transition"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm text-accent mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-secondary hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;
