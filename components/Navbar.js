"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/lib/CartContext";
import Link from "next/link";
import { ShoppingCart, Menu, X } from "lucide-react";

export default function Navbar() {
  const { cart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-gray-900/80 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <h1 className="text-3xl font-bold tracking-wide text-white uppercase cursor-pointer transition-all duration-300 hover:text-orange-500">
          🍽️ FoodOrder
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-lg font-semibold">
          {["Home", "Menu", "About", "Contact"].map((item) => (
            <li key={item} className="relative group">
              <Link
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="text-white transition-all duration-300 hover:text-orange-500"
              >
                {item}
              </Link>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </li>
          ))}
          <li>
            <Link href="/login" className="text-white hover:text-orange-500 transition-all duration-300">
              Login
            </Link>
          </li>
          <li>
            <Link href="/register" className="text-white hover:text-orange-500 transition-all duration-300">
              Register
            </Link>
          </li>
        </ul>

        {/* Right-side Icons */}
        <div className="flex items-center space-x-6">
          {/* Cart Icon */}
          <Link href="/cart" className="relative group">
            <ShoppingCart size={28} className="text-orange-500 transition-transform duration-300 hover:scale-110" />
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full text-xs px-2">
                {cart.length}
              </span>
            )}
          </Link>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} className="text-orange-500" /> : <Menu size={28} className="text-orange-500" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Slide-in Effect */}
      <div
        className={`fixed top-0 right-0 h-full w-3/4 bg-gray-900 text-white shadow-lg transform transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button className="absolute top-5 right-5 text-orange-500" onClick={() => setIsOpen(false)}>
          <X size={28} />
        </button>
        <ul className="flex flex-col items-center justify-center space-y-6 h-full text-lg">
          {["Home", "Menu", "About", "Contact", "Login", "Register"].map((item) => (
            <li key={item}>
              <Link
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="text-white hover:text-orange-500 transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
