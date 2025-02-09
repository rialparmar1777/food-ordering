"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/lib/CartContext";
import { ShoppingCart, Menu, X } from "lucide-react"; // Import X here
import Navbar from "@/components/Navbar"; // You can use the same Navbar component if you want
import Footer from "@/components/Footer";
import Image from "next/image";
import { Loader, Search } from "lucide-react";
import { motion } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";
import Link from "next/link"; // Add Link for navigation

export default function FoodMenu() { // Rename to FoodMenu
  const [meals, setMeals] = useState([]);
  const [searchQuery, setSearchQuery] = useState("chicken");
  const [query, setQuery] = useState(searchQuery);  
  const [loading, setLoading] = useState(false);
  const { addToCart, cart } = useCart();

  useEffect(() => {
    setLoading(true);
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
      .then((res) => res.json())
      .then((data) => {
        setMeals(data.meals || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching meals:", error);
        setLoading(false);
      });
  }, [query]);

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
    <div className="bg-gradient-to-r from-blue-900 to-blue-600 text-white min-h-screen">
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-gray-900/80 backdrop-blur-md shadow-lg" : "bg-transparent"}`}
      >
        <div className="container mx-auto flex justify-between items-center p-4">
          {/* Logo */}
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
              <FaShoppingCart size={28} className="text-black transition-transform duration-300 hover:scale-110" />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full text-xs px-2">
                  {cart.length}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button className="md:hidden focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? (
                <X size={28} className="text-orange-500" />
              ) : (
                <Menu size={28} className="text-orange-500" />
              )}
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

      {/* Menu Content */}
      <section className="mt-16 py-8 text-center">
  <h2 className="text-5xl font-extrabold">🍽️ Explore Our Meals</h2>
</section>

      <div className="flex justify-center mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for a meal..."
            className="p-3 pl-12 bg-gray-800 border border-gray-600 rounded-full shadow-lg text-white focus:ring-2 focus:ring-orange-500 transition"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-4 top-3 text-gray-400" size={20} />
        </div>
        <button
          className="ml-3 bg-orange-500 text-black px-5 py-3 rounded-full font-bold hover:bg-orange-400 transition"
          onClick={() => setQuery(searchQuery)}
        >
          Search
        </button>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center">
          <Loader className="animate-spin text-orange-500" size={40} />
        </div>
      ) : (
        <motion.section className="p-8">
          <h2 className="text-4xl font-bold text-center mb-8">🔥 Featured Meals</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {meals.length === 0 ? (
              <p className="text-center text-gray-400 col-span-full">
                No meals found. Try another search!
              </p>
            ) : (
              meals.map((meal) => (
                <motion.div
                  key={meal.idMeal}
                  className="bg-gray-800 p-6 rounded-lg text-center transform transition hover:scale-105 hover:bg-gray-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Image
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    width={200}
                    height={200}
                    className="mx-auto rounded-md"
                  />
                  <h3 className="text-2xl font-semibold mt-4 text-orange-500">{meal.strMeal}</h3>
                  <div className="flex flex-col gap-3 mt-4">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400 transition"
                      onClick={() => window.location.href = `/meal/${meal.idMeal}`}
                    >
                      View Recipe
                    </button>
                    <button
                      className="bg-yellow-500 text-black px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-yellow-400 transition"
                      onClick={() => addToCart(meal)}
                    >
                      <FaShoppingCart /> Add to Cart
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.section>
      )}
      <Footer />
    </div>
  );
}
