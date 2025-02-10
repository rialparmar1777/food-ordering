"use client";
import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.log("Passwords do not match!");
      return;
    }
    // Handle registration logic here
    console.log("Registration attempt:", { email, password });
  };

  return (
    <div className="min-h-screen relative flex justify-center items-center">
      {/* Background Video */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <video autoPlay muted loop className="w-full h-full object-cover">
          <source src="/background-video.mp4" type="video/mp4" />
          {/* Fallback image for unsupported browsers */}
          <img src="/rocket.gif" alt="Background" className="w-full h-full object-cover" />
        </video>
      </div>

      {/* Overlay to darken the background */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40 z-10"></div>

      {/* Rocket GIF positioned over the video */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20">
        <img
          src="/rocket.gif"
          alt="Rocket Animation"
          className="w-50 h-50 object-cover"
        />
      </div>

      {/* Rocket GIF positioned over the video */}
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20">
        <img
          src="/rocket.gif"
          alt="Rocket Animation"
          className="w-50 h-50 object-cover"
        />
      </div>

      {/* Form Container */}
      <div className="relative z-20 flex items-center justify-center bg-black bg-opacity-70 p-8 rounded-2xl shadow-xl w-full sm:w-96">
        {/* Form */}
        <div className="w-full sm:w-auto">
          <h2 className="text-4xl font-semibold text-center text-white mb-6">
            Register
          </h2>
          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-lg font-medium text-white mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 bg-gray-800 text-white placeholder-gray-500"
                required
                placeholder="Enter your email"
              />
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-lg font-medium text-white mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 bg-gray-800 text-white placeholder-gray-500"
                required
                placeholder="Enter your password"
              />
            </div>

            {/* Confirm Password Field */}
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-lg font-medium text-white mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 bg-gray-800 text-white placeholder-gray-500"
                required
                placeholder="Confirm your password"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-all duration-300"
            >
              Register
            </button>
          </form>

          {/* Login Link */}
          <p className="mt-4 text-center text-white">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 hover:text-blue-700 transition-all">
              Login
            </Link>
          </p>

          {/* Footer Credit */}
          <p className="mt-4 text-center text-gray-400 text-sm">
            Designed by <span className="font-semibold">@rial</span>
          </p>
        </div>
      </div>
    </div>
  );
}
