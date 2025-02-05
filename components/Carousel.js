"use client"; // Runs on the client-side
import { useState, useEffect } from "react";

// Image paths (Make sure these exist in the `public/` folder)
const images = [
  "/carousel1.jpg",
  "/carousel2.jpg",
  "/carousel3.jpg",
];

export default function Carousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[300px] sm:h-[400px] overflow-hidden">
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt="Food"
          className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
            i === index ? "opacity-100 scale-105" : "opacity-0"
          }`}
        />
      ))}

      {/* Dots for Navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, i) => (
          <button
            key={i}
            className={`w-3 h-3 rounded-full ${
              i === index ? "bg-yellow-500" : "bg-gray-300"
            }`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
