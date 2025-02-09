"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/lib/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { Loader, Search } from "lucide-react";
import { useSpring, animated } from "@react-spring/web";
import { FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Menu() {
  const [meals, setMeals] = useState([]);
  const [searchQuery, setSearchQuery] = useState("chicken");
  const [query, setQuery] = useState(searchQuery);  
  const [loading, setLoading] = useState(false);
  const { addToCart } = useCart();

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

  return (
    <div className="bg-gradient-to-r from-blue-900 to-blue-600 text-white min-h-screen">
      <Navbar />
      <section className="py-8 text-center">
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
        <animated.section className="p-8">
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
        </animated.section>
      )}
      <Footer />
    </div>
  );
}