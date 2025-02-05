"use client";
import { useEffect, useState } from "react";

export default function MenuList() {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch("/api/menu")
      .then((res) => res.json())
      .then((data) => setMenuItems(data));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Menu</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {menuItems.map((item) => (
          <div key={item._id} className="border p-4 rounded-lg shadow-lg">
            <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded-md" />
            <h3 className="text-lg font-semibold mt-2">{item.name}</h3>
            <p className="text-gray-600">{item.description}</p>
            <p className="font-bold text-yellow-600">${item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
