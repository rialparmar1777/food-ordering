"use client";

import { useCart } from "@/lib/CartContext";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    const stripe = await stripePromise;

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart }),
    });

    const data = await res.json();
    if (data.id) {
      await stripe.redirectToCheckout({ sessionId: data.id });
    } else {
      alert("Payment failed");
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-6">💳 Checkout</h2>
      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="max-w-lg mx-auto bg-white shadow-lg p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
          <ul className="mb-4">
            {cart.map((meal) => (
              <li key={meal.idMeal} className="flex justify-between py-2 border-b">
                <span>{meal.strMeal}</span>
                <span>${meal.price || "5.99"}</span>
              </li>
            ))}
          </ul>
          <button
            className="w-full bg-blue-500 text-white px-4 py-3 text-lg font-bold rounded-lg"
            onClick={handlePayment}
            disabled={loading}
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </div>
      )}
    </div>
  );
}
