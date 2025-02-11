"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/CartContext";
import { useRouter } from "next/navigation";

export default function Success() {
  const router = useRouter();
  const { clearCart } = useCart();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
    clearCart(); // Clear cart after successful payment

    const timeout = setTimeout(() => {
      setShowConfetti(false);
    }, 3000); // Confetti disappears after 3 sec

    return () => clearTimeout(timeout);
  }, [clearCart]);

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-green-100 text-gray-800"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {showConfetti && <div className="text-6xl">🎊🎉✨</div>}
      
      <h1 className="text-4xl font-bold mb-4">🎉 Payment Successful!</h1>
      <p className="text-lg">Thank you for your order. Your payment has been received.</p>

      <motion.button
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => router.push("/")}
      >
        Go back to Home
      </motion.button>
    </motion.div>
  );
}
