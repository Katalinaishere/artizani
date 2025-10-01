import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { products as allProducts } from "../services/products";
import './Shop.css';

function Shop() {
  const [products, setProducts] = useState(allProducts);

  const handleRefresh = () => {
    setProducts([...allProducts]);
  };

  return (
    <div className="shop-container">
      <h1 className="shop-title">Shop</h1>
      <button className="refresh-btn" onClick={handleRefresh}>Refresh Products</button>

      <div className="shop-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Shop;
import './Shop.css';