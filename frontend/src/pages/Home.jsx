import { products } from "../services/products";
import { useState, useEffect, useRef } from "react";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  const featuredProducts = products.slice(0, 2);
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % featuredProducts.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [featuredProducts.length]);

  const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) nextSlide(); // swipe left
    if (touchStart - touchEnd < -50) prevSlide(); // swipe right
  };

  const testimonials = [
    { id: 1, name: "Alice", comment: "Delicious and fresh! I love it." },
    { id: 2, name: "Mark", comment: "Perfect gifts for my friends." },
    { id: 3, name: "Sophia", comment: "Amazing quality and taste!" },
  ];

  return (
    <div className="home-container">
      {/* Hero Carousel */}
      <section
        className="hero-carousel"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {featuredProducts.map((product, index) => (
          <div
            key={product.id}
            className={`carousel-item ${index === current ? "active" : ""}`}
          >
            <img src={product.image} alt={product.name} />
            <div className="carousel-text">
              <h2>{product.name}</h2>
              <p>${product.price}</p>
              <Link to={`/product-details/${product.id}`}>
                <button className="cta-btn">View Product</button>
              </Link>
            </div>
          </div>
        ))}
        {/* Optional arrows for desktop */}
        <button className="carousel-arrow left" onClick={prevSlide}>❮</button>
        <button className="carousel-arrow right" onClick={nextSlide}>❯</button>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="about-text">
          <h2>About Artisan Shop</h2>
          <p>
            Handcrafted jams, sourdough bread, and traditional goodies made with
            love. We focus on quality, freshness, and supporting local artisans.
          </p>
          <Link to="/about">
            <button className="cta-btn secondary">Learn More</button>
          </Link>
        </div>
        <div className="about-image-container">
          <img src="/images/about.jpg" alt="About Us" className="about-image" />
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="products-grid">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <h2>What Our Customers Say</h2>
        <div className="testimonials-grid">
          {testimonials.map((t) => (
            <div key={t.id} className="testimonial-card">
              <p>"{t.comment}"</p>
              <h4>- {t.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter">
        <h2>Stay Updated</h2>
        <p>Subscribe to our newsletter to get latest products and offers.</p>
        <form className="newsletter-form">
          <input type="email" placeholder="Enter your email" />
          <button type="submit">Subscribe</button>
        </form>
      </section>
    </div>
  );
}

export default Home;
