"use client";
import { useState, useEffect } from "react";
import { useCart } from "@/lib/CartContext";
import { ShoppingCart, Menu, X } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

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

      {/* Hero Section */}
      <motion.div
        className="relative bg-gradient-to-r from-orange-400 via-yellow-300 to-orange-600 h-screen flex flex-col justify-center items-center text-center text-white px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl font-bold mb-4">We'd Love to Hear From You!</h1>
        <p className="text-xl mb-6 max-w-xl mx-auto">
          Whether you have questions, feedback, or just want to connect, fill out the form below to get in touch with us!
        </p>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="#contact-form">
            <button className="px-8 py-3 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-400 transition duration-300">
              Get in Touch
            </button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Contact Content */}
      <div id="contact-form" className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white p-10 rounded-lg shadow-xl ring-2 ring-gray-200">
          <h2 className="text-3xl font-semibold text-center text-gray-900 mb-10">Send Us a Message</h2>

          {/* Form */}
          <form action="#" method="POST">
            <div className="grid grid-cols-1 gap-6">
              <div>
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

              <div>
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

              <div>
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
            </div>

            <motion.button
              type="submit"
              className="w-full py-4 px-6 mt-8 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              whileHover={{ scale: 1.05 }}
            >
              Send Message
            </motion.button>
          </form>
        </div>
      </div>

      {/* Contact Info Section */}
      <div className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6">Other Ways to Reach Us</h2>
          <div className="flex justify-center space-x-8">
            <div className="flex flex-col items-center">
              <div className="text-4xl mb-4">
                <span className="material-icons">phone_in_talk</span>
              </div>
              <p className="text-xl">Call Us: +1 234 567 890</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-4xl mb-4">
                <span className="material-icons">email</span>
              </div>
              <p className="text-xl">Email Us: rialparmar007@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
