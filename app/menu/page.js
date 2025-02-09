"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/lib/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { Loader, Search } from "lucide-react";
import { useSpring, animated } from "@react-spring/web";
import { FaShoppingCart } from "react-icons/fa";

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
    <div className="bg-[#09122c] text-white min-h-screen">
      <Navbar />
      <section className="py-8 text-center">
        <h2 className="text-4xl font-bold">🍽️ Explore Our Meals</h2>
      </section>

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
        <animated.section className="p-6">
          <h2 className="text-3xl font-bold text-center mb-6">🔥 Featured Meals</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {meals.length === 0 ? (
              <p className="text-center text-gray-400 col-span-full">
                No meals found. Try another search!
              </p>
            ) : (
              meals.map((meal) => (
                <div
                  key={meal.idMeal}
                  className="bg-[#872341] p-4 rounded-lg text-center transform transition hover:scale-105 hover:bg-[#3a3a3a]"
                >
                  <Image
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    width={200}
                    height={200}
                    className="mx-auto rounded-md"
                  />
                  <h3 className="text-xl font-semibold mt-2 text-[#FF8C00]">{meal.strMeal}</h3>
                  <div className="flex flex-col gap-2 mt-3">
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
                </div>
              ))
            )}
          </div>
        </animated.section>
      )}
      <Footer />
    </div>
  );
}