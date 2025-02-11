"use client";
import React, { useEffect, useRef } from "react";

// Function to create the aurora effect
const Aurora = ({ colorStops, speed }) => {
  const canvasRef = useRef(null);

  // Function to initialize and animate the aurora effect
  const drawAurora = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    const gradient = ctx.createLinearGradient(0, 0, width, height);
    colorStops.forEach((color, index) => {
      gradient.addColorStop(index / (colorStops.length - 1), color);
    });

    const noise = new Array(width).fill(0).map(() => Math.random());
    let offset = 0;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(0, height / 2);

      // Create the wave-like aurora effect
      for (let i = 0; i < width; i++) {
        const y =
          height / 2 +
          Math.sin((i + offset) / 50) * 50 +
          Math.sin((i + offset) / 100) * 30 +
          noise[i % noise.length] * 20;

        ctx.lineTo(i, y);
      }

      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fill();

      offset += speed; // Control speed of the aurora movement
      requestAnimationFrame(animate);
    };

    animate();
  };

  useEffect(() => {
    drawAurora();
  }, [colorStops, speed]);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />;
};

export default Aurora;
