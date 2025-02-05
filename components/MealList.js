"use client";
import { useState, useEffect } from "react";

export default function MealList() {
  const [meals, setMeals] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery || "chicken"}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.meals) {
          setMeals(data.meals);
        } else {
          setMeals([]);
        }
      })
      .catch((error) => console.error("Error fetching meals:", error));
  }, [searchQuery]);

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
        />
        <button
          className="bg-yellow-500 text-black px-4 py-2 rounded-r-md font-bold"
          onClick={() => setSearchQuery(searchQuery)}
        >
          Search
        </button>
      </div>

      {/* Meals Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {meals.map((meal) => (
          <div key={meal.idMeal} className="bg-white shadow-md p-4 rounded-lg text-center">
            <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-40 object-cover rounded" />
            <h3 className="text-xl font-semibold mt-4">{meal.strMeal}</h3>
            <p className="text-gray-600">{meal.strCategory}</p>
            <button className="mt-3 px-4 py-2 bg-yellow-500 text-black font-bold rounded-lg">
              View Recipe
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
