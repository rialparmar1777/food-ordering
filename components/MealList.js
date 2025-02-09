"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/lib/CartContext";
import Link from "next/link";
import { Loader, Search } from "lucide-react";
import { useSpring, animated } from "@react-spring/web";
import { motion } from "framer-motion";

export default function MealList() {
  const [meals, setMeals] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [query, setQuery] = useState("chicken");
  const [loading, setLoading] = useState(false);
  const { addToCart } = useCart();
  const [flyingImage, setFlyingImage] = useState(null);

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

  // Flying Image Animation with @react-spring
  const flyingAnimation = useSpring({
    to: {
      opacity: flyingImage ? 0 : 1,
      transform: flyingImage
        ? "translate(200px, -100px) scale(0.5)" // Adjust the end position (towards cart)
        : "translate(0, 0) scale(1)",
    },
    config: { tension: 170, friction: 26 },
  });

  // Handle adding item to cart and animating image
  const handleAddToCart = (meal, imageElement) => {
    if (!imageElement) return;

    // Get the position of the clicked image
    const rect = imageElement.getBoundingClientRect();
    
    // Set the flying image state with its position
    setFlyingImage({
      id: meal.idMeal,
      src: meal.strMealThumb,
      startX: rect.left + window.scrollX,
      startY: rect.top + window.scrollY,
      width: rect.width,
      height: rect.height,
    });

    // Add the meal to the cart after the animation
    setTimeout(() => {
      addToCart(meal);
      setFlyingImage(null);
    }, 800); // Flying animation duration
  };

  return (
    <div className="p-6 bg-gradient-to-br from-[#09122c] to-[#872341] text-white min-h-screen">
      {/* Title */}
      <motion.h2
        className="text-5xl font-extrabold text-center mb-6 text-[#FF8C00] drop-shadow-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        🍽️ Explore Our Meals
      </motion.h2>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for a meal..."
            className="p-3 pl-10 bg-[#222] border border-[#444] rounded-lg shadow-lg text-white focus:ring-2 focus:ring-[#FF8C00] transition"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
        </div>
        <button
          className="ml-2 bg-[#FF8C00] text-black px-4 py-2 rounded-lg font-bold hover:bg-black hover:text-[#FF8C00] transition-all transform hover:translate-x-2"
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
                className="relative bg-[#2c2c2c]/80 backdrop-blur-md shadow-xl p-6 rounded-lg text-center hover:scale-105 hover:shadow-2xl transition-all"
                variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
              >
                {/* Floating image animation */}
                {flyingImage && flyingImage.id === meal.idMeal && (
                  <motion.img
                    src={flyingImage.src}
                    alt="Flying meal"
                    initial={{
                      left: flyingImage.startX,
                      top: flyingImage.startY,
                      width: flyingImage.width,
                      height: flyingImage.height,
                      opacity: 1,
                    }}
                    animate={{
                      left: "90%", // Adjust based on cart location
                      top: "5%",
                      width: 50,
                      height: 50,
                      opacity: 0.5,
                    }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed z-50 pointer-events-none"
                  />
                )}

                {/* Meal Image */}
                <animated.img
                  style={flyingImage === meal.idMeal ? flyingAnimation : {}}
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="w-full h-40 object-cover rounded-md mb-4 cursor-pointer hover:scale-110 transition-all"
                  onClick={(e) => handleAddToCart(meal, e.target)}
                />

                {/* Meal Name */}
                <h3 className="text-2xl font-semibold text-[#FF8C00] mb-4">
                  {meal.strMeal}
                </h3>

                {/* Buttons */}
                <div className="flex flex-col gap-3 mt-4">
                  {/* View Recipe Button */}
                  <Link href={`/meal/${meal.idMeal}`}>
                    <motion.button
                      className="px-4 py-2 bg-[#FFFF00] text-black font-bold rounded-lg hover:bg-black hover:text-[#FF8C00] transition-all transform hover:translate-x-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View Recipe
                    </motion.button>
                  </Link>

                  {/* Add to Cart Button */}
                  <motion.button
                    className="px-4 py-2 bg-[#FF8C00] text-black font-bold rounded-lg hover:bg-black hover:text-[#FF8C00] transition-all transform hover:translate-x-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => handleAddToCart(meal, e.target.previousElementSibling)}
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
