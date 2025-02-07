"use client";

import { useState } from "react";
import { useCart } from "@/lib/CartContext";
import Link from "next/link";
import { ShoppingCart, Menu, X } from "lucide-react";

export default function Navbar() {
  const { cart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-yellow-500 text-black p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold">🍽️ FoodOrder</h1>

        {/* Menu for larger screens */}
        <ul className="hidden md:flex space-x-6">
          {["Home", "Menu", "About", "Contact"].map((item) => (
            <li key={item}>
              <Link
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="hover:text-gray-700 transition duration-300"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right-side Cart & Mobile Menu Toggle */}
        <div className="flex items-center space-x-4">
          {/* Cart Icon */}
          <Link href="/cart" className="relative">
            <ShoppingCart size={28} />
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-2">
                {cart.length}
              </span>
            )}
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden flex flex-col items-center bg-yellow-600 text-white py-4 space-y-4">
          {["Home", "Menu", "About", "Contact"].map((item) => (
            <li key={item}>
              <Link
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="hover:text-gray-300 transition duration-300"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
