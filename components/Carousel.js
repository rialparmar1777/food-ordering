"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

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
    <div className="relative w-full h-[300px] sm:h-[450px] overflow-hidden group">
      {images.map((image, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out transform ${
            i === index ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <Image
            src={image.src}
            alt={image.caption}
            layout="fill"
            objectFit="cover"
            priority={i === 0}
            className="rounded-lg shadow-lg"
          />
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-60 text-white px-4 py-2 rounded-md text-lg font-semibold">
            {image.caption}
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={() => setIndex((index - 1 + images.length) % images.length)}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-3 rounded-full hover:bg-opacity-75 transition-all"
        aria-label="Previous Slide"
      >
        &#10094;
      </button>
      <button
        onClick={() => setIndex((index + 1) % images.length)}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-3 rounded-full hover:bg-opacity-75 transition-all"
        aria-label="Next Slide"
      >
        &#10095;
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, i) => (
          <button
            key={i}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === index ? "bg-yellow-500 scale-125" : "bg-gray-300"
            } hover:scale-125`}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
