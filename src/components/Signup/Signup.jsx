import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
 // Load environment variables from .env file
const BACKEND_URL = "https://buddymatcher-node.onrender.com" // Fallback to localhost 

const Signup = () => {
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BACKEND_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, Fullname: fullname, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/profile");
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1929] text-white flex items-center justify-center px-6">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-8">
            <i className="fas fa-user-plus text-3xl text-blue-400"></i>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Join CodeMatch
            </span>
          </div>
          <h2 className="text-3xl font-bold mb-2">Create an Account</h2>
          <p className="text-gray-400">Start coding with your buddy today</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <input
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="w-full px-4 py-3 bg-[#1A2332] border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Your full name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-[#1A2332] border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Username"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-[#1A2332] border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[#1A2332] border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/50"
          >
            Sign Up
          </button>

          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </form>

        <div className="text-center">
          <p className="text-gray-400">
            Already have an account?{" "}
            <a href="/login" className="text-blue-400 hover:text-blue-300">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
