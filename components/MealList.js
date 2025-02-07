"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/lib/CartContext";
import Link from "next/link";
import { Loader, Search } from "lucide-react";
import { useSpring, animated } from '@react-spring/web';

export default function MealList() {
  const [meals, setMeals] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [query, setQuery] = useState("chicken");
  const [loading, setLoading] = useState(false);
  const { addToCart } = useCart();
  const [flyingImage, setFlyingImage] = useState(null); // Track the image being animated

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

  const flyingAnimation = useSpring({
    to: {
      opacity: flyingImage ? 0 : 1,
      transform: flyingImage
        ? "translate(200px, -100px) scale(0.5)"  // Adjust destination (cart location)
        : "translate(0, 0) scale(1)",
    },
    config: { tension: 170, friction: 26 },
  });

  const handleAddToCart = (meal, imageElement) => {
    setFlyingImage(imageElement);
    setTimeout(() => {
      addToCart(meal);
      setFlyingImage(null);
    }, 800); // Duration of the flying animation
  };

  return (
    <div className="p-6 bg-[#171717] text-[#ffffff]">
      {/* Title */}
      <h2 className="text-4xl font-extrabold text-center mb-6 animate-fade-in text-[#FF8C00]">
        🍽️ Explore Our Meals
      </h2>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for a meal..."
            className="p-2 pl-10 bg-[#333333] border border-[#444444] rounded-md shadow-md text-white focus:ring-2 focus:ring-[#FF8C00] transition"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
        <button
          className="ml-2 bg-[#FF8C00] text-black px-4 py-2 rounded-md font-bold hover:bg-[#FF6A00] transition"
          onClick={() => setQuery(searchQuery)}
        >
          Search
        </button>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center">
          <Loader className="animate-spin text-[#FF8C00]" size={32} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {meals.length === 0 ? (
            <p className="text-center text-gray-400 col-span-full">
              No meals found. Try another search!
            </p>
          ) : (
            meals.map((meal) => (
              <div
                key={meal.idMeal}
                className="bg-[#2c2c2c] shadow-xl p-6 rounded-lg text-center transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:bg-[#3a3a3a]"
              >
                <animated.img
                  style={flyingImage === meal.idMeal ? flyingAnimation : {}}
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="w-full h-40 object-cover rounded-md mb-4 cursor-pointer"
                  onClick={(e) => handleAddToCart(meal, e.target)}
                />
                <h3 className="text-2xl font-semibold text-[#FF8C00] mb-4">
                  {meal.strMeal}
                </h3>
                <div className="flex flex-col gap-3 mt-4">
                  {/* View Recipe Button */}
                  <Link href={`/meal/${meal.idMeal}`}>
                    <button className="px-4 py-2 bg-[#0A4F6B] text-white font-bold rounded-lg hover:bg-[#0A4F6B] transition">
                      View Recipe
                    </button>
                  </Link>

                  {/* Add to Cart Button */}
                  <button
                    className="px-4 py-2 bg-[#FF8C00] text-black font-bold rounded-lg hover:bg-[#FF6A00] transition"
                    onClick={(e) => handleAddToCart(meal, e.target.previousElementSibling)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
