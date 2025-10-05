import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: String,
  image: String,
  featured: { type: Boolean, default: false },
  discount: { type: Number, default: 0 },
});

const Product = mongoose.model("Product", productSchema);
export default Product;
