"use client";

import { useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Carousel from "@/components/Carousel";
import Image from "next/image";
import { fetchRandomMeals } from "@/lib/api";
import { useCart } from "@/lib/CartContext";

export default function Menu() {
  const [featuredMeals, setFeaturedMeals] = useState([]);
  const [offers, setOffers] = useState([]);
  const [menuCategories, setMenuCategories] = useState([]);
  const { cart, addToCart } = useCart(); // Use the useCart hook to get cart state

  useEffect(() => {
    async function loadData() {
      const meals = await fetchRandomMeals(5);
      setFeaturedMeals(meals);

      setOffers([
        { name: "Big Mac Combo", price: "6.99", image: "/bigmac.jpg" },
        { name: "Cheesy Pizza", price: "8.99", image: "/cheesypizza.jpg" },
        { name: "Chicken Wrap", price: "5.49", image: "/chickenwrap.jpg" },
      ]);

      setMenuCategories([
        { name: "Burgers", image: "/burger.jpg" },
        { name: "Pasta", image: "/pasta.jpg" },
        { name: "Desserts", image: "/dessert.jpg" },
        { name: "Drinks", image: "/drinks.jpg" },
      ]);
    }
    loadData();
  }, []);

  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { tension: 280, friction: 60 },
  });

  const handleAddToCart = (item) => {
    addToCart(item);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar cartItemCount={cart.length} /> {/* Use cart from useCart */}

      <section className="w-full py-6 bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <h2 className="text-center text-4xl font-bold mb-4">🍽️ Explore Our Menu</h2>
        <Carousel />
      </section>

      <animated.section className="p-6 bg-orange-600 text-white text-center" style={fadeIn}>
        <h2 className="text-3xl font-bold mb-4">🔥 Today's Offers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offers.map((offer, index) => (
            <animated.div
              key={index}
              className="bg-orange-500 p-4 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300"
              style={fadeIn}
            >
              <Image
                src={offer.image}
                alt={offer.name}
                width={200}
                height={200}
                className="mx-auto rounded-md"
              />
              <h3 className="text-xl font-bold mt-2">{offer.name}</h3>
              <p className="text-lg font-semibold mt-2">Now: ${offer.price}</p>
              <button
                onClick={() => handleAddToCart(offer)}
                className="mt-4 bg-orange-400 text-black px-4 py-2 rounded-lg hover:bg-orange-300 transition"
              >
                Add to Cart
              </button>
            </animated.div>
          ))}
        </div>
      </animated.section>

      <animated.section className="p-6" style={fadeIn}>
        <h2 className="text-3xl font-bold text-center mb-6">🍽️ Featured Meals</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {featuredMeals.map((meal, index) => (
            <animated.div
              key={index}
              className="bg-gray-800 p-4 rounded-lg text-white text-center hover:scale-105 transition-transform"
              style={fadeIn}
            >
              <Image
                src={meal.image}
                alt={meal.name}
                width={150}
                height={150}
                className="mx-auto rounded-md"
              />
              <h3 className="text-lg font-bold mt-2">{meal.name}</h3>
              <p className="text-lg mt-2">{meal.description}</p>
              <button
                onClick={() => handleAddToCart(meal)}
                className="mt-4 bg-orange-400 text-black px-4 py-2 rounded-lg hover:bg-orange-300 transition"
              >
                Add to Cart
              </button>
            </animated.div>
          ))}
        </div>
      </animated.section>

      <animated.section className="p-6" style={fadeIn}>
        <h2 className="text-3xl font-bold text-center mb-6">🍽️ Our Menu</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {menuCategories.map((category, index) => (
            <animated.div
              key={index}
              className="bg-gray-800 p-4 rounded-lg text-white text-center hover:scale-105 transition-transform"
              style={fadeIn}
            >
              <Image
                src={category.image}
                alt={category.name}
                width={150}
                height={150}
                className="mx-auto rounded-md"
              />
              <h3 className="text-lg font-bold mt-2">{category.name}</h3>
            </animated.div>
          ))}
        </div>
      </animated.section>

      <Footer />
    </div>
  );
}