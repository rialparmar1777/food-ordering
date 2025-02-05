import mongoose from "mongoose";

const MenuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  image: { type: String },
});

export default mongoose.models.MenuItem || mongoose.model("MenuItem", MenuItemSchema);
