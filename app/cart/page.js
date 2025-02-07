"use client"; // Add this at the top

import { useCart } from "@/lib/CartContext";

export default function Cart() {
  const { cart } = useCart();

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-6">🛒 Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cart.map((meal) => (
            <div key={meal.idMeal} className="bg-white shadow-md p-4 rounded-lg text-center">
              <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-40 object-cover rounded" />
              <h3 className="text-xl font-semibold mt-4">{meal.strMeal}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
