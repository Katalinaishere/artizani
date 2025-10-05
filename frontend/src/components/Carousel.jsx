import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Carousel.css";

function Carousel() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [current, setCurrent] = useState(0);
  const length = featuredProducts.length;
  const intervalTime = 5000;
  const autoScroll = true;
  let slideInterval;

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products"); // fetch all
        const data = await res.json();
        const featured = data.filter(p => p.featured); // only featured
        setFeaturedProducts(featured);
      } catch (err) {
        console.error("Error fetching featured products:", err);
      }
    };
    fetchFeaturedProducts();
  }, []);

  const nextSlide = () => setCurrent(current === length - 1 ? 0 : current + 1);
  const prevSlide = () => setCurrent(current === 0 ? length - 1 : current - 1);

  useEffect(() => {
    if (autoScroll && length > 0) {
      slideInterval = setInterval(nextSlide, intervalTime);
    }
    return () => clearInterval(slideInterval);
  }, [current, length]);

  if (length === 0) return null;

  return (
    <section className="hero-carousel">
      {featuredProducts.map((product, index) => (
        <div
          key={product._id}
          className={`carousel-item ${index === current ? "active" : ""}`}
        >
          <img src={product.image} alt={product.name} className="carousel-img" />
          <div className="carousel-text">
            {product.discount > 0 && (
              <span className="discount-badge">
                {Math.round(product.discount * 100)}% OFF
              </span>
            )}
            <h2>{product.name}</h2>
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
            <Link to={`/product/${product._id}`}>
              <button className="cta-btn">Shop Now</button>
            </Link>
          </div>
        </div>
      ))}

      <button className="carousel-arrow left" onClick={prevSlide}>❮</button>
      <button className="carousel-arrow right" onClick={nextSlide}>❯</button>

      <div className="carousel-dots">
        {featuredProducts.map((_, idx) => (
          <span
            key={idx}
            className={`dot ${idx === current ? "active" : ""}`}
            onClick={() => setCurrent(idx)}
          ></span>
        ))}
      </div>
    </section>
  );
}

export default Carousel;
