import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../contexts/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const dummyProducts = [
      { id: 1, name: "Handmade Jam", price: 5.99, description: "Sweet homemade jam.", image: "/images/jam.jpg" },
      { id: 2, name: "Pickled Cucumbers", price: 7.49, description: "Crunchy and fresh pickles.", image: "/images/pickles.jpg" },
      { id: 3, name: "Sourdough Bread", price: 4.50, description: "Artisan bread with natural fermentation.", image: "/images/bread.jpg" }
    ];

    const foundProduct = dummyProducts.find(p => p.id === parseInt(id));
    setProduct(foundProduct);
  }, [id]);

  if (!product) return <h2>Loading product...</h2>;

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} />
      <p>{product.description}</p>
      <h3>${product.price.toFixed(2)}</h3>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
}

export default ProductDetails;
