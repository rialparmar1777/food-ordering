"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useCart } from "@/lib/CartContext";
import { ShoppingCart, Menu, X, Loader } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function MealDetails() {
  const params = useParams();
  const mealId = params?.id;
  const [meal, setMeal] = useState(null);
  const { addToCart, cart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (mealId) {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then((res) => res.json())
        .then((data) => {
          setMeal(data.meals ? data.meals[0] : null);
        })
        .catch((error) => console.error("Error fetching meal details:", error));
    }
  }, [mealId]);

  if (!meal) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="animate-spin text-yellow-500" size={40} />
      </div>
    );
  }

  const ingredients = Object.keys(meal)
    .filter((key) => key.startsWith("strIngredient") && meal[key])
    .map((key) => meal[key]);

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-gray-900/80 backdrop-blur-lg shadow-lg">
        <div className="container mx-auto flex justify-between items-center p-4">
          <h1 className="text-4xl font-bold tracking-wide text-white uppercase cursor-pointer transition-all duration-300 hover:text-orange-500">
            🍽️ FoodOrder
          </h1>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-8 text-lg font-semibold">
            {["Home", "Menu", "About", "Contact"].map((item) => (
              <li key={item} className="relative group">
                <Link
                  href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="text-white hover:text-orange-500 transition-all duration-300"
                >
                  {item}
                </Link>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </li>
            ))}
          </ul>

          {/* Cart Icon */}
          <div className="flex items-center space-x-6">
            <Link href="/cart" className="relative">
              <ShoppingCart size={28} className="text-white hover:scale-110 transition-transform duration-300" />
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
      </nav>

      {/* Meal Details Section */}
      <motion.div
        className="p-6 max-w-6xl mx-auto pt-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-5xl font-bold text-center mb-6 text-gray-800 tracking-tight"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {meal.strMeal}
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            className="flex justify-center"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="w-full max-w-md rounded-lg shadow-2xl object-cover"
              style={{ maxHeight: "400px" }}
            />
          </motion.div>

          <motion.div className="space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <p className="text-lg font-semibold text-gray-700"><strong>🍽️ Category:</strong> {meal.strCategory}</p>
            <p className="text-lg font-semibold text-gray-700"><strong>🌍 Area:</strong> {meal.strArea}</p>

            <p className="text-lg font-semibold text-gray-700">🛒 Ingredients:</p>
            <ul className="grid grid-cols-2 gap-2 text-gray-700">
              {ingredients.map((ingredient, index) => (
                <motion.li
                  key={index}
                  className="bg-gray-200 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-300 transition-all duration-300"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  {ingredient}
                </motion.li>
              ))}
            </ul>

            <motion.button
              className="mt-6 px-6 py-3 bg-green-500 text-white font-bold rounded-lg text-lg hover:bg-green-600 transition-all duration-300 ease-in-out shadow-lg transform hover:scale-105 active:scale-95"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => addToCart(meal)}
            >
              ➕ Add to Cart
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
