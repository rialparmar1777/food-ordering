"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="relative w-full h-screen bg-gradient-to-r from-[#09122c] to-[#be3144]">
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      <div className="container mx-auto h-full flex items-center justify-center relative z-10">
        <motion.div
          className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-center text-[#09122c] mb-6">Create an Account</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="block text-lg text-[#09122c] mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter your full name"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-lg text-[#09122c] mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter your email"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-lg text-[#09122c] mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Create a password"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="confirm-password" className="block text-lg text-[#09122c] mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Confirm your password"
              />
            </div>

            <div className="flex justify-between items-center mb-6">
              <Link href="/login" className="text-[#09122c] hover:text-orange-500">
                Already have an account? Login
              </Link>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 transition-all"
            >
              Register
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
