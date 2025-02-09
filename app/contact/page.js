"use client";
import { useState, useEffect } from "react";
import { useCart } from "@/lib/CartContext";
import { ShoppingCart, Menu, X } from "lucide-react";
import Link from "next/link";

export default function Contact() {
  const { cart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative">
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-gray-900/80 backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto flex justify-between items-center p-4">
          <h1 className="text-3xl font-bold tracking-wide text-black uppercase cursor-pointer transition-all duration-300 hover:text-orange-500">
            🍽️ FoodOrder
          </h1>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-8 text-lg font-semibold">
            {["Home", "Menu", "About", "Contact"].map((item) => (
              <li key={item} className="relative group">
                <Link
                  href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="text-black transition-all duration-300 hover:text-orange-500"
                >
                  {item}
                </Link>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </li>
            ))}
            <li>
              <Link href="/login" className="text-black hover:text-orange-500 transition-all duration-300">
                Login
              </Link>
            </li>
            <li>
              <Link href="/register" className="text-black hover:text-orange-500 transition-all duration-300">
                Register
              </Link>
            </li>
          </ul>

          {/* Right-side Icons */}
          <div className="flex items-center space-x-6">
            {/* Cart Icon */}
            <Link href="/cart" className="relative group">
              <ShoppingCart size={28} className="text-black transition-transform duration-300 hover:scale-110" />
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

      {/* Contact Content */}
      <div className="min-h-screen bg-gradient-to-r from-orange-100 via-white to-orange-100 py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="mt-16 py-8 text-center text-4xl font-extrabold text-black mb-6">
          Get in Touch with Us
        </h1>
        <p className="text-lg text-gray-700 text-center mb-12">
          Have questions, suggestions, or just want to say hi? We would love to hear from you! Fill out the form below to get started.
        </p>

        {/* Contact Form */}
        <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-xl ring-2 ring-gray-200">
          <form action="#" method="POST">
            <div className="mb-6">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                className="mt-1 p-4 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="mt-1 p-4 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Your Message
              </label>
              <textarea
                name="message"
                id="message"
                rows="6"
                required
                className="mt-1 p-4 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 px-6 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
