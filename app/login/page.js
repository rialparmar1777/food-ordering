"use client";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login attempt:", { email, password, rememberMe });
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
            Login
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

            {/* Remember Me */}
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="mr-2 text-blue-500 focus:ring-blue-500"
              />
              <label htmlFor="rememberMe" className="text-lg font-medium text-white">
                Remember me
              </label>
            </div>

            {/* Forgot Password Link */}
            <div className="mb-6 text-right">
              <Link href="/forgot-password" className="text-blue-500 hover:text-blue-700 transition-all">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-all duration-300"
            >
              Login
            </button>
          </form>

          {/* Create Account Link */}
          <p className="mt-6 text-center text-white">
            Don't have an account?{" "}
            <Link href="/register" className="text-blue-500 hover:text-blue-700 transition-all">
              Create Account
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
