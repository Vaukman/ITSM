import React, { useState } from "react";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost/backend/forgot_password.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.success) {
        setMessage(data.success);
      } else {
        setMessage(data.error || "Something went wrong!");
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background dark:bg-dark-background px-4">
      <div className="bg-primary dark:bg-dark-primary p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-text dark:text-dark-text mb-6">
          Forgot Password
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-lg border border-accent focus:outline-none focus:ring-2 focus:ring-secondary bg-accent/10 text-text dark:text-dark-text"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-secondary hover:bg-secondary/90 text-white font-semibold py-2 rounded-lg transition"
          >
            Send Reset Link
          </button>
        </form>

        {message && (
          <p
            className={`text-center mt-4 text-sm ${
              message.includes("success")
                ? "text-green-500 dark:text-green-400"
                : "text-red-500 dark:text-red-400"
            }`}
          >
            {message}
          </p>
        )}

        <p className="text-center mt-4 text-sm">
          <a
            href="/login"
            className="text-secondary hover:underline font-medium"
          >
            Back to login
          </a>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
