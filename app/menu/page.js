"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/lib/CartContext";
import { Search } from "lucide-react";
import Navbar from "@/components/Navbar"; // ✅ Navbar remains unchanged
import Footer from "@/components/Footer";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";

// Custom Cursor
const CustomCursor = () => {
  return (
    <motion.div
      className="fixed pointer-events-none w-8 h-8 bg-orange-500 rounded-full mix-blend-difference"
      animate={{ x: 0, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 10 }}
    />
  );
};

export default function FoodMenu() {
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
    <div className="relative bg-gradient-to-r from-[#09122c] to-[#872341] text-white min-h-screen">
      <Navbar />

      {/* 🔥 Animated Banner Section */}
      <motion.section
        className="relative h-[400px] flex flex-col items-center justify-center text-center px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{
          backgroundImage: "url('/food-banner.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <motion.h1
          className="text-6xl font-extrabold text-white drop-shadow-lg"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          🍽️ Discover Delicious Meals!
        </motion.h1>
        <motion.p
          className="mt-4 text-lg text-gray-200 max-w-2xl"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          Explore a variety of mouth-watering dishes and order your favorites.
        </motion.p>
        <motion.button
          className="mt-6 bg-[#FF8C00] text-black px-8 py-4 rounded-full font-bold hover:bg-[#FF6A00] transition"
          whileHover={{ scale: 1.1 }}
          onClick={() => setQuery("chicken")}
        >
          Browse Now
        </motion.button>
      </motion.section>

      {/* 🔍 Search Bar */}
      <div className="flex justify-center mt-10">
        <motion.div className="relative">
          <input
            type="text"
            placeholder="Search for a meal..."
            className="p-4 pl-12 bg-[#2c2c2c] border border-[#444] rounded-full shadow-lg text-white focus:ring-4 focus:ring-[#FF8C00] transition"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-4 top-4 text-gray-400" size={20} />
        </motion.div>
        <motion.button
          className="ml-3 bg-[#FF8C00] text-black px-6 py-4 rounded-full font-bold hover:bg-[#FF6A00] transition"
          onClick={() => setQuery(searchQuery)}
          whileHover={{ scale: 1.1 }}
        >
          Search
        </motion.button>
      </div>

      {/* ⏳ Loading State */}
      {loading ? (
        <div className="flex justify-center items-center my-10">
          <motion.div className="animate-spin text-[#FF8C00]" style={{ fontSize: "40px" }}>
            🍕
          </motion.div>
        </div>
      ) : (
        <motion.section className="p-8">
          <h2 className="text-4xl font-bold text-center mb-8">🔥 Featured Meals</h2>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
            }}
          >
            {meals.length === 0 ? (
              <p className="text-center text-gray-400 col-span-full">
                No meals found. Try another search!
              </p>
            ) : (
              meals.map((meal) => (
                <motion.div
                  key={meal.idMeal}
                  className="relative bg-[#2c2c2c] backdrop-blur-xl p-6 rounded-xl text-center shadow-lg hover:shadow-2xl"
                  variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}
                  whileHover={{ rotate: 2, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                >
                  <Image
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    width={250}
                    height={250}
                    className="rounded-lg shadow-lg"
                  />
                  <h3 className="text-2xl font-semibold mt-4 text-[#FF8C00]">{meal.strMeal}</h3>
                  <div className="flex flex-col gap-3 mt-4">
                    <motion.button
                      className="bg-blue-500 text-white px-6 py-3 rounded-lg font-bold"
                      whileHover={{ scale: 1.1 }}
                      onClick={() => window.location.href = `/meal/${meal.idMeal}`}
                    >
                      View Recipe
                    </motion.button>
                    <motion.button
                      className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-bold flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.1 }}
                      onClick={() => addToCart(meal)}
                    >
                      <FaShoppingCart /> Add to Cart
                    </motion.button>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        </motion.section>
      )}

      <Footer />
      <CustomCursor />
    </div>
  );
}
