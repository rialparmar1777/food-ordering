"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useCart } from "@/lib/CartContext";

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

  if (!meal) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center">{meal.strMeal}</h1>
      <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full max-w-lg mx-auto rounded-lg mt-4" />
      <p className="text-lg mt-4"><strong>Category:</strong> {meal.strCategory}</p>
      <p className="text-lg"><strong>Area:</strong> {meal.strArea}</p>
      <p className="mt-4">{meal.strInstructions}</p>
      <button className="mt-4 px-4 py-2 bg-green-500 text-white font-bold rounded-lg" onClick={() => addToCart(meal)}>
        Add to Cart
      </button>
    </div>
  );
}