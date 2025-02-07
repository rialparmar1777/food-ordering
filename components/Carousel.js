"use client"; // Runs on the client-side
import { useState, useEffect } from "react";

// Image paths (Make sure these exist in the `public/` folder)
const images = [
  { src: "/carousel1.jpg", caption: "Delicious Pizza 🍕" },
  { src: "/carousel2.jpg", caption: "Fresh Salads 🥗" },
  { src: "/carousel3.jpg", caption: "Tasty Burgers 🍔" },
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
    <div className="relative w-full h-[300px] sm:h-[400px] overflow-hidden group">
      {images.map((image, i) => (
        <div
          key={i}
          className={`absolute w-full h-full object-cover transition-opacity duration-1000 ease-in-out transform ${
            i === index ? "opacity-100 scale-105" : "opacity-0"
          }`}
        >
          <img
            src={image.src}
            alt="Food"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-black text-xl font-bold">
            {image.caption}
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={() => setIndex((index - 1 + images.length) % images.length)}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-all"
      >
        &#10094;
      </button>
      <button
        onClick={() => setIndex((index + 1) % images.length)}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-all"
      >
        &#10095;
      </button>

      {/* Dots for Navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, i) => (
          <button
            key={i}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === index ? "bg-yellow-500 scale-125" : "bg-gray-300"
            } hover:scale-125`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
