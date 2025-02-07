"use client";

import { useCart } from "@/lib/CartContext";

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const totalPrice = cart.reduce((total, meal) => total + (meal.price || 0), 0).toFixed(2);

  const handlePayment = () => {
    alert("Payment successful! Thank you for your order.");
    clearCart();
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-6">💳 Checkout</h2>
      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty. Please add items before checking out.</p>
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
          <h3 className="text-xl font-bold mb-4">Total: ${totalPrice}</h3>
          <button
            className="w-full bg-blue-500 text-white px-4 py-3 text-lg font-bold rounded-lg"
            onClick={handlePayment}
          >
            Pay Now
          </button>
        </div>
      )}
    </div>
  );
}
