"use client"; // Add this at the top

import { useCart } from "@/lib/CartContext";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export default function Navbar() {
  const { cart } = useCart();

  return (
    <nav className="bg-yellow-500 text-black p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">🍽️ FoodOrder</h1>
        <ul className="flex space-x-6">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/menu">Menu</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
        <div className="flex items-center space-x-4">
          <Link href="/cart" className="relative">
            <ShoppingCart size={24} />
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-2">
                {cart.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
