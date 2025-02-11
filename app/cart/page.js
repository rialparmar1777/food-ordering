"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import { motion } from "framer-motion";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState("0.00");
  const [taxAmount, setTaxAmount] = useState("0.00");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const subtotal = cart.reduce(
      (total, meal) => total + ((meal.price || 5.99) * (meal.quantity || 1)),
      0
    );
    const tax = (subtotal * 0.13).toFixed(2);
    setTaxAmount(tax);
    setTotalPrice((subtotal + parseFloat(tax)).toFixed(2));
  }, [cart]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#f72585] via-[#7209b7] to-[#3a0ca3] text-white">
      
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
          </ul>

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

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 right-0 h-full w-3/4 bg-gray-900 text-white shadow-lg transform transition-transform ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <button className="absolute top-5 right-5 text-orange-500" onClick={() => setIsOpen(false)}>
            <X size={28} />
          </button>
          <ul className="flex flex-col items-center justify-center space-y-6 h-full text-lg">
            {["Home", "Menu", "About", "Contact"].map((item) => (
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

      {/* Cart Section */}
      <motion.div
        className="container mx-auto mt-20 p-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl font-extrabold mb-8">🛒 Your Cart</h2>

        {cart.length === 0 ? (
          <p className="text-lg text-gray-300">Your cart is empty.</p>
        ) : (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {cart.map((meal) => (
                <motion.div
                  key={meal.idMeal}
                  className="bg-white/10 p-4 rounded-lg shadow-lg text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <img
                    src={meal.strMealThumb || meal.image}
                    alt={meal.strMeal}
                    className="w-full h-40 object-cover rounded mb-4"
                  />
                  <h3 className="text-xl font-semibold">{meal.strMeal}</h3>
                  <div className="flex justify-center items-center gap-4 mt-4">
                    <button
                      className="bg-yellow-400 text-black px-2 py-1 rounded-full"
                      onClick={() => updateQuantity(meal.idMeal, meal.quantity - 1)}
                      disabled={meal.quantity <= 1}
                    >
                      -
                    </button>
                    <p className="text-lg">{meal.quantity || 1}</p>
                    <button
                      className="bg-yellow-400 text-black px-2 py-1 rounded-full"
                      onClick={() => updateQuantity(meal.idMeal, meal.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <p className="text-gray-300 mt-2">
                    Price: ${(meal.price || 5.99) * (meal.quantity || 1)}
                  </p>
                  <button
                    className="mt-3 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                    onClick={() => removeFromCart(meal.idMeal)}
                  >
                    Remove
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Total Price Box */}
            <motion.div
              className="mt-10 p-6 bg-white/10 backdrop-blur-lg rounded-lg shadow-md max-w-md mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-2xl font-bold">Total: ${totalPrice}</h3>
              <p className="text-lg text-gray-300">Tax (13% HST): ${taxAmount}</p>
              <Link href="/checkout">
                <motion.button
                  className="mt-4 bg-green-500 text-white px-6 py-3 text-lg font-bold rounded-lg hover:bg-green-600 transition transform hover:scale-105"
                  whileHover={{ scale: 1.1, boxShadow: "0px 0px 10px rgba(0, 255, 0, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Proceed to Checkout
                </motion.button>
              </Link>
            </motion.div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
