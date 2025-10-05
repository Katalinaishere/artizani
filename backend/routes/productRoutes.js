import express from "express";
import Product from "../models/Product.js";
import { getProducts, getProductById, updateProduct } from "../controllers/productController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// GET all products
router.get("/", getProducts);

// GET single product
router.get("/:id", getProductById);

// UPDATE product (admin only)
router.put("/:id", protect, adminOnly, updateProduct);

// ADD new product with image upload (admin only)
router.post("/", protect, adminOnly, upload.single("image"), async (req, res) => {
  try {
    const { name, price, featured, discount } = req.body;

    if (!name || !price || !req.file) {
      return res.status(400).json({ message: "Name, price, and image are required" });
    }

    const newProduct = new Product({
      name,
      price: parseFloat(price),
      featured: featured === "true",
      discount: parseFloat(discount) || 0,
      image: `/uploads/${req.file.filename}`,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json({ message: "Failed to add product", error: err.message });
  }
}); 

// GET all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
