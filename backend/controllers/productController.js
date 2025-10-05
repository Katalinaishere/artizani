import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
};
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { featured, discount } = req.body;

  try {
    const updated = await Product.findByIdAndUpdate(
      id,
      { featured, discount },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update product", error });
  }
};
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, image, featured, discount } = req.body;

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      image,
      featured: featured || false,
      discount: discount || 0,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Failed to create product", error });
  }
};

// Admin can add/update/delete products (later)
