"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import { motion } from "framer-motion";

export default function About() {
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
    <div className="relative bg-gradient-to-r from-blue-800 via-purple-700 to-blue-800">
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-gray-900/80 backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto flex justify-between items-center p-4">
          <h1 className="text-3xl font-bold tracking-wide text-white uppercase cursor-pointer transition-all duration-300 hover:text-orange-500">
            🍽️ FoodOrder
          </h1>

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

          <div className="flex items-center space-x-6">
            {/* Cart Icon */}
            <Link href="/cart" className="relative group">
              <ShoppingCart size={28} className="text-white transition-transform duration-300 hover:scale-110" />
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

      {/* About Us Content */}
      <motion.div
        className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-600 to-blue-800 py-16 px-6 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-5xl font-extrabold text-white mb-8 text-center"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2 }}
        >
          About Us
        </motion.h1>
        <motion.p
          className="text-lg text-white mb-6 max-w-3xl text-center"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Welcome to FoodOrder! We are passionate about serving you delicious and fresh food, whether you're in the mood for
          salads, burgers, or pizza. Our mission is to provide a seamless food ordering experience, bringing your favorite
          meals right to your door.
        </motion.p>
        <div className="flex flex-col items-center gap-6 mb-12">
          <motion.div
            className="bg-white p-6 rounded-lg shadow-xl text-center max-w-lg transform hover:scale-105 transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-orange-500 mb-4">Our Mission</h3>
            <p className="text-lg text-gray-700">
              Our team is dedicated to ensuring that you always get the highest quality food made with the best ingredients.
              We are constantly updating our menu with new and exciting options to keep you coming back for more!
            </p>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-lg shadow-xl text-center max-w-lg transform hover:scale-105 transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-orange-500 mb-4">Join Us</h3>
            <p className="text-lg text-gray-700 mb-4">
              Become a part of our food community! Whether you're a passionate chef or a foodie, we welcome you to join
              the FoodOrder family and help us bring joy to others through delicious meals.
            </p>
            <Link href="/contact">
              <motion.button
                className="bg-orange-500 text-white py-2 px-6 rounded-full hover:bg-orange-400 transition"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                Get in Touch
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Testimonials Section */}
        <motion.div
          className="bg-gradient-to-r from-blue-900 to-purple-800 text-white py-16 px-6 w-full text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.h2
            className="text-4xl font-extrabold mb-8"
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ delay: 1 }}
          >
            What Our Customers Say
          </motion.h2>
          <div className="flex flex-wrap justify-center gap-8">
            {["John", "Emma", "David"].map((name) => (
              <div key={name} className="bg-white p-6 rounded-lg shadow-lg text-gray-700 w-80">
                <p className="text-lg italic mb-4">"Amazing food, excellent service! Will definitely order again."</p>
                <p className="font-semibold">{name}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
