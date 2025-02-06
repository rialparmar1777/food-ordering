"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/lib/CartContext";

export default function MealList() {
  const [meals, setMeals] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [query, setQuery] = useState("chicken"); // Default query
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
      .then((res) => res.json())
      .then((data) => {
        setMeals(data.meals || []);
      })
      .catch((error) => console.error("Error fetching meals:", error));
  }, [query]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setQuery(searchQuery);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-6">🍽️ Explore Our Meals</h2>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search for a meal..."
          className="p-2 border border-gray-300 rounded-l-md"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()} // Corrected onKeyPress (deprecated)
        />
        <button className="bg-yellow-500 text-black px-4 py-2 rounded-r-md font-bold" onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* Meals Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {meals.length > 0 ? (
          meals.map((meal) => (
            <div key={meal.idMeal} className="bg-white shadow-md p-4 rounded-lg text-center">
              <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-40 object-cover rounded" />
              <h3 className="text-xl font-semibold mt-4">{meal.strMeal}</h3>
              <p className="text-gray-600">{meal.strCategory}</p>
              <div className="flex flex-col gap-2 mt-3">
                <Link href={`/meal/${meal.idMeal}`} passHref>
                  <button className="px-4 py-2 bg-yellow-500 text-black font-bold rounded-lg">
                    View Recipe
                  </button>
                </Link>
                <button
                  className="px-4 py-2 bg-green-500 text-white font-bold rounded-lg"
                  onClick={() => addToCart(meal)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No meals found. Try a different search!</p>
        )}
      </div>
    </div>
  );
}
