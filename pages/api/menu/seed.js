import { connectToDatabase } from "@/lib/mongodb";
import MenuItem from "@/models/MenuItem";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Only POST allowed" });

  await connectToDatabase();
  await MenuItem.deleteMany();

  const sampleItems = [
    { name: "Cheese Pizza", description: "Classic cheese pizza", price: 12.99, image: "/pizza.jpg" },
    { name: "Burger", description: "Juicy beef burger", price: 9.99, image: "/burger.jpg" },
    { name: "Pasta", description: "Creamy Alfredo pasta", price: 14.99, image: "/pasta.jpg" },
  ];

  await MenuItem.insertMany(sampleItems);
  return res.status(201).json({ message: "Menu Seeded!" });
}
