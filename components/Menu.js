"use client";

import { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FaUtensils, FaPercent, FaStar, FaFire } from "react-icons/fa";
import { Carousel } from "@/components/Carousel";

export default function Menu() {
const [meals, setMeals] = useState([]);
const [offers, setOffers] = useState([
{ name: "Burger King Combo", discount: "20% Off", icon:  },
{ name: "McD Special Meal", discount: "Buy 1 Get 1", icon:  },
]);

useEffect(() => {
fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
.then((res) => res.json())
.then((data) => setMeals(data.meals.slice(0, 6)))
.catch((error) => console.error("Error fetching meals:", error));
}, []);

const fadeIn = useSpring({ opacity: 1, from: { opacity: 0 }, config: { duration: 800 } });

return (
<>


<animated.h1 style={fadeIn} className="text-4xl font-bold text-center mb-6">
🍽️ Explore Our Menu
</animated.h1>



 Today's Special Offers


{offers.map((offer, index) => (
<animated.div
key={index}
style={useSpring({ transform: "scale(1)", from: { transform: "scale(0.8)" } })}
className="p-6 bg-white shadow-lg rounded-lg text-center flex flex-col items-center gap-3 hover:shadow-2xl transition-all"
>
{offer.icon}
{offer.name}
{offer.discount}
</animated.div>
))}



🍔 Regular Meals

{meals.map((meal) => (
<animated.div
key={meal.idMeal}
className="p-4 bg-white shadow-md rounded-lg hover:shadow-xl transition transform hover:scale-105"
style={useSpring({ transform: "scale(1)", from: { transform: "scale(0.8)" } })}
>

{meal.strMeal}
</animated.div>
))}




</>
);
}