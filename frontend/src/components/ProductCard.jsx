import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>${product.price.toFixed(2)}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
      <Link to={`/product-details/${product.id}`}>View Details</Link>
    </div>
  );
}

export default ProductCard;
