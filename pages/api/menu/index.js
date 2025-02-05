import { connectToDatabase } from "@/lib/mongodb";
import MenuItem from "@/models/MenuItem";

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === "GET") {
    const items = await MenuItem.find();
    return res.status(200).json(items);
  }

  if (req.method === "POST") {
    const { name, description, price, image } = req.body;
    if (!name || !price) return res.status(400).json({ error: "Name and Price are required" });

    const newItem = new MenuItem({ name, description, price, image });
    await newItem.save();
    return res.status(201).json(newItem);
  }

  res.status(405).json({ error: "Method Not Allowed" });
}
