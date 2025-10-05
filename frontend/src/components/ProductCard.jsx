import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import "./ProductCard.css";

function ProductCard({ product }) {
  const { user } = useContext(AuthContext);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!user) {
      navigate("/auth"); // redirect to login/register page
      return;
    }
    addToCart(product);
  };

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <img
          src={`http://localhost:5000${product.image}`}
          alt={product.name}
          className="product-image"
        />
      </div>
      <div className="product-details">
        <h3>{product.name}</h3>
        {product.discount > 0 ? (
          <p>
            <span className="old-price">${product.price.toFixed(2)}</span>{" "}
            <span className="new-price">
              ${(product.price * (1 - product.discount)).toFixed(2)}
            </span>
          </p>
        ) : (
          <p>${product.price.toFixed(2)}</p>
        )}
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
}

export default ProductCard;
