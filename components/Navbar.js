"use client";

import { useState } from "react";
import { useCart } from "@/lib/CartContext";
import Link from "next/link";
import { ShoppingCart, Menu, X } from "lucide-react";

export default function Navbar() {
  const { cart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#717173] text-[#4b524e] p-4 shadow-lg sticky top-0 z-20">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-3xl font-bold text-[#000000] uppercase tracking-wider transform transition duration-500 hover:text-[#ffffff] hover:scale-105 cursor-pointer">
          🍽️ Food_Order
        </h1>

        {/* Menu for larger screens */}
        <ul className="hidden md:flex space-x-8 text-lg font-semibold transition-all duration-300">
          {["Home", "Menu", "About", "Contact"].map((item) => (
            <li key={item} className="relative group">
              <Link
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="text-[#000000] hover:text-[#ffffff] transition-all duration-300"
              >
                {item}
              </Link>
              
              <div className="absolute bottom-0 left-0 w-full h-1 bg-[#ffffff] scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </li>
          ))}
        </ul>

        {/* Right-side Cart & Mobile Menu Toggle */}
        <div className="flex items-center space-x-6">
          {/* Cart Icon */}
          <Link href="/cart" className="relative group font-mono">
            <ShoppingCart size={28} className="transform transition duration-300 hover:scale-110 text-[#e17564]" />
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 bg-[#872341] text-white rounded-full text-xs px-2">
                {cart.length}
              </span>
            )}
            <div className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-white opacity-70 group-hover:opacity-100 transition duration-200"></div>
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            className="md:hidden focus:outline-none transform transition duration-300 hover:scale-110"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} className="text-[#e17564]" /> : <Menu size={28} className="text-[#e17564]" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden flex flex-col items-center bg-[#872341] text-white py-4 space-y-4 animate__animated animate__fadeIn">
          {["Home", "Menu", "About", "Contact"].map((item) => (
            <li key={item} className="relative group">
              <Link
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="text-white hover:text-[#e17564] transition duration-300"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </Link>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-[#e17564] scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
