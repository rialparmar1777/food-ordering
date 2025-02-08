"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import Carousel from "@/components/Carousel";
import { fetchRandomMeals } from "@/lib/api";

export default function Menu() {
  const [featuredMeals, setFeaturedMeals] = useState([]);
  const [offers, setOffers] = useState([]);
  const [menuCategories, setMenuCategories] = useState([]);

  useEffect(() => {
    async function loadData() {
      const meals = await fetchRandomMeals(5);
      setFeaturedMeals(meals);

      // Mock offers (Replace with API data if available)
      setOffers([
        { name: "Big Mac Combo", price: "6.99", image: "/bigmac.jpg" },
        { name: "Cheesy Pizza", price: "8.99", image: "/cheesypizza.jpg" },
        { name: "Chicken Wrap", price: "5.49", image: "/chickenwrap.jpg" },
      ]);

      // Mock categories (Replace with API data if available)
      setMenuCategories([
        { name: "Burgers", image: "/burger.jpg" },
        { name: "Pasta", image: "/pasta.jpg" },
        { name: "Desserts", image: "/dessert.jpg" },
        { name: "Drinks", image: "/drinks.jpg" },
      ]);
    }
    loadData();
  }, []);

  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <section className="w-full py-6 bg-[#09122c]">
        <h2 className="text-center text-white text-3xl font-bold mb-4">
          Explore Our Menu
        </h2>
        <Carousel />
      </section>

      {/* Today's Offers Section */}
      <section className="p-6 bg-[#872341] text-white text-center">
        <h2 className="text-3xl font-bold mb-4">🔥 Today's Offers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offers.map((offer, index) => (
            <div key={index} className="bg-[#be3144] p-4 rounded-lg shadow-lg">
              <Image
                src={offer.image}
                alt={offer.name}
                width={200}
                height={200}
                className="mx-auto rounded-md"
              />
              <h3 className="text-xl font-bold mt-2">{offer.name}</h3>
              <p className="text-lg font-semibold mt-2">Now: ${offer.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Menu Categories */}
      <section className="p-6">
        <h2 className="text-3xl font-bold text-center mb-6">🍽️ Our Menu</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {menuCategories.map((category, index) => (
            <div
              key={index}
              className="bg-[#2c2c2c] p-4 rounded-lg text-white text-center hover:scale-105 transition-transform"
            >
              <Image
                src={category.image}
                alt={category.name}
                width={150}
                height={150}
                className="mx-auto rounded-md"
              />
              <h3 className="text-lg font-bold mt-2">{category.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
