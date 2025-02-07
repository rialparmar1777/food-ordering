"use client"; // Ensures it's a client component

import { useState, useEffect } from "react";
import { useCart } from "@/lib/CartContext";
import Link from "next/link";
import Navbar from "@/components/Navbar"; // Import the Navbar component

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [totalPrice, setTotalPrice] = useState(0); // State to hold the total price
  const [taxAmount, setTaxAmount] = useState(0); // State to hold the tax amount

  // Update total price and tax whenever cart changes
  useEffect(() => {
    // Calculate total price before tax
    const totalPriceBeforeTax = cart.reduce(
      (total, meal) => total + (meal.price || 0) * (meal.quantity || 1),
      0
    );

    // Calculate tax (13% HST in Ontario)
    const calculatedTax = (totalPriceBeforeTax * 0.13).toFixed(2);

    // Update state values
    setTotalPrice((totalPriceBeforeTax + parseFloat(calculatedTax)).toFixed(2));
    setTaxAmount(calculatedTax);
  }, [cart]); // Recalculate whenever cart changes

  return (
    <div>
      {/* Navbar included on Cart Page */}
      <Navbar />

      {/* Cart Container */}
      <div className="p-6">
        <h2 className="text-3xl font-bold text-center mb-6">🛒 Your Cart</h2>

        {/* Empty Cart Message */}
        {cart.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          <div>
            {/* Cart Items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {cart.map((meal) => (
                <div
                  key={meal.idMeal}
                  className="bg-[#2c2c2c] text-white shadow-md p-4 rounded-lg text-center transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:bg-[#3a3a3a]"
                >
                  <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="w-full h-40 object-cover rounded mb-4"
                  />
                  <h3 className="text-xl font-semibold">{meal.strMeal}</h3>
                  <div className="flex justify-center items-center gap-4 mt-4">
                    {/* Quantity Adjustment */}
                    <button
                      className="bg-[#FF8C00] text-black px-2 py-1 rounded-full"
                      onClick={() =>
                        updateQuantity(meal.idMeal, meal.quantity - 1)
                      }
                      disabled={meal.quantity <= 1}
                    >
                      -
                    </button>
                    <p className="text-lg">{meal.quantity || 1}</p>
                    <button
                      className="bg-[#FF8C00] text-black px-2 py-1 rounded-full"
                      onClick={() =>
                        updateQuantity(meal.idMeal, meal.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                  <p className="text-gray-600 mt-2">
                    Price: ${(meal.price || 5.99) * (meal.quantity || 1)}
                  </p> {/* Updated price based on quantity */}
                  <button
                    className="mt-3 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                    onClick={() => removeFromCart(meal.idMeal)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Total Price, Tax and Checkout */}
            <div className="text-center mt-6">
              <h3 className="text-2xl font-bold">Total: ${totalPrice}</h3>
              <p className="text-lg text-gray-500">Tax (13% HST): ${taxAmount}</p>
              <Link href="/checkout">
                <button className="mt-4 bg-green-500 text-white px-6 py-3 text-lg font-bold rounded-lg hover:bg-green-600 transition">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
