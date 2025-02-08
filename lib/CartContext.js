"use client";
import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (meal) => {
    const existingMeal = cart.find((item) => item.idMeal === meal.idMeal);
    
    if (existingMeal) {
      setCart((prev) =>
        prev.map((item) =>
          item.idMeal === meal.idMeal
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart((prev) => [...prev, { ...meal, quantity: 1 }]);
    }
  };

  const removeFromCart = (idMeal) => {
    setCart((prev) => prev.filter((meal) => meal.idMeal !== idMeal));
  };

  const clearCart = () => {
    setCart([]);
  };

  const updateQuantity = (idMeal, newQuantity) => {
    if (newQuantity <= 0) return;
    setCart((prev) =>
      prev.map((meal) =>
        meal.idMeal === idMeal ? { ...meal, quantity: newQuantity } : meal
      )
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}