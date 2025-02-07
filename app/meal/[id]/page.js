"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useCart } from "@/lib/CartContext";
import Navbar from "@/components/Navbar";
import { Loader } from "lucide-react";

export default function MealDetails() {
  const params = useParams();
  const mealId = params?.id;
  const [meal, setMeal] = useState(null);
  const { addToCart } = useCart();

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

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-6xl mx-auto">
        {/* Meal Title */}
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">{meal.strMeal}</h1>

        {/* Meal Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="flex justify-center">
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="w-full max-w-md rounded-lg shadow-md object-cover"
              style={{ maxHeight: "400px" }} // Restrict max height to prevent stretching
            />
          </div>

          {/* Info */}
          <div className="space-y-4">
            <p className="text-lg"><strong>🍽️ Category:</strong> {meal.strCategory}</p>
            <p className="text-lg"><strong>🌍 Area:</strong> {meal.strArea}</p>
            <p className="text-lg"><strong>📖 Instructions:</strong></p>
            <p className="text-gray-700 leading-relaxed text-justify">{meal.strInstructions}</p>

            {/* Add to Cart Button */}
            <button
              className="mt-4 px-6 py-3 bg-green-500 text-white font-bold rounded-lg text-lg hover:bg-green-600 transition shadow-md"
              onClick={() => addToCart(meal)}
            >
              ➕ Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
