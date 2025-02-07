"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/lib/CartContext";
import Link from "next/link";
import { Loader, Search } from "lucide-react";

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
    <div className="p-6">
      {/* Title */}
      <h2 className="text-3xl font-bold text-center mb-6 animate-fade-in">🍽️ Explore Our Meals</h2>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for a meal..."
            className="p-2 pl-10 border rounded-md shadow-md focus:ring-2 focus:ring-yellow-500 transition"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
        </div>
        <button
          className="ml-2 bg-yellow-500 text-black px-4 py-2 rounded-md font-bold hover:bg-yellow-600 transition"
          onClick={() => setQuery(searchQuery)}
        >
          Search
        </button>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center">
          <Loader className="animate-spin text-yellow-500" size={32} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {meals.length === 0 ? (
            <p className="text-center text-gray-500 col-span-full">No meals found. Try another search!</p>
          ) : (
            meals.map((meal) => (
              <div
                key={meal.idMeal}
                className="bg-white shadow-lg p-4 rounded-lg text-center transform transition duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="w-full h-40 object-cover rounded-md"
                />
                <h3 className="text-xl font-semibold mt-4">{meal.strMeal}</h3>
                <div className="flex flex-col gap-3 mt-4">
                  {/* View Recipe Button */}
                  <Link href={`/meal/${meal.idMeal}`}>
                    <button className="px-4 py-2 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-600 transition">
                      View Recipe
                    </button>
                  </Link>

                  {/* Add to Cart Button */}
                  <button
                    className="px-4 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition"
                    onClick={() => addToCart(meal)}
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
