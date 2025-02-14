"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/lib/CartContext";
import Link from "next/link";
import { Loader, Search } from "lucide-react";
import { motion } from "framer-motion";

export default function MealList() {
  const [meals, setMeals] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [query, setQuery] = useState("chicken");
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
    <div className="p-6 bg-gradient-to-br from-[#09122c] to-[#872341] text-white min-h-screen">
      {/* Title */}
      <motion.h2
        className="text-5xl font-extrabold text-center mb-8 text-[#FF8C00] drop-shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        🍽️ Explore Our Meals
      </motion.h2>

      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for a meal..."
            className="p-3 pl-10 bg-[#222] border border-[#444] rounded-lg shadow-lg text-black focus:ring-2 focus:ring-[#FF8C00] transition"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
        </div>
        <button
          className="ml-2 bg-[#FF8C00] text-black px-4 py-2 rounded-lg font-bold hover:bg-black hover:text-[#FF8C00] transition-all transform hover:scale-105"
          onClick={() => setQuery(searchQuery)}
        >
          Search
        </button>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center">
          <Loader className="animate-spin text-[#FF8C00]" size={40} />
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, scale: 0.9 },
            visible: { opacity: 1, scale: 1, transition: { staggerChildren: 0.2 } },
          }}
        >
          {meals.length === 0 ? (
            <p className="text-center text-gray-400 col-span-full">No meals found. Try another search!</p>
          ) : (
            meals.map((meal) => (
              <motion.div
                key={meal.idMeal}
                className="relative bg-[#ffffff08] backdrop-blur-md border border-[#ffffff1a] shadow-xl p-6 rounded-2xl text-center 
                hover:shadow-2xl hover:border-[#FF8C00] transition-all transform hover:scale-105"
                variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
              >
                {/* Meal Image */}
                <div className="relative overflow-hidden rounded-xl">
                  <motion.img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="w-full h-48 object-cover rounded-xl transition-all duration-300 hover:scale-110"
                  />
                </div>

                {/* Meal Name */}
                <h3 className="text-2xl font-semibold text-[#FF8C00] mt-4">
                  {meal.strMeal}
                </h3>

                {/* Description */}
                <p className="text-gray-300 text-sm mt-2">
                  A delicious {meal.strMeal} recipe for your cravings.
                </p>

                {/* Buttons */}
                <div className="flex justify-center gap-4 mt-5">
                  {/* View Recipe Button */}
                  <Link href={`/meal/${meal.idMeal}`}>
                    <motion.button
                      className="px-4 py-2 bg-[#FFFF00] text-black font-bold rounded-lg shadow-md hover:bg-black hover:text-[#FF8C00] 
                      transition-all transform hover:scale-105"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View Recipe
                    </motion.button>
                  </Link>

                  {/* Add to Cart Button */}
                  <motion.button
                    className="px-4 py-2 bg-[#FF8C00] text-black font-bold rounded-lg shadow-md hover:bg-black hover:text-[#FF8C00] 
                    transition-all transform hover:scale-105"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => addToCart(meal)}
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      )}
    </div>
  );
}
