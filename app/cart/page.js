"use client"; // Ensures it's a client component

import { useCart } from "@/lib/CartContext";
import Link from "next/link";

export default function Cart() {
  const { cart, removeFromCart } = useCart();

  // Calculate total price
  const totalPrice = cart.reduce((total, meal) => total + (meal.price || 0), 0).toFixed(2);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-6">🛒 Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {cart.map((meal) => (
              <div key={meal.idMeal} className="bg-white shadow-md p-4 rounded-lg text-center">
                <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-40 object-cover rounded" />
                <h3 className="text-xl font-semibold mt-4">{meal.strMeal}</h3>
                <p className="text-gray-600 mt-2">Price: ${meal.price || "5.99"}</p> {/* Default price */}
                <button
                  className="mt-3 bg-red-500 text-white px-4 py-2 rounded-lg"
                  onClick={() => removeFromCart(meal.idMeal)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Total Price and Checkout */}
          <div className="text-center mt-6">
            <h3 className="text-2xl font-bold">Total: ${totalPrice}</h3>
            <Link href="/checkout">
              <button className="mt-4 bg-green-500 text-white px-6 py-3 text-lg font-bold rounded-lg">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
