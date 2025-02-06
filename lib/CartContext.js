"use client";
import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (meal) => {
    setCart((prevCart) => {
      // Prevent duplicate meals in the cart
      if (!prevCart.some((item) => item.idMeal === meal.idMeal)) {
        return [...prevCart, meal];
      }
      return prevCart;
    });
  };

  return <CartContext.Provider value={{ cart, addToCart }}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
