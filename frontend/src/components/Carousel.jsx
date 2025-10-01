
import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";      
import { Link } from "react-router-dom";
import "./Carousel.css";
import { products } from "../data/products";
import { useEffect } from "react";

function Carousel() {
    const { user } = useContext(AuthContext);

    // Filter featured products
    const featuredProducts = products.filter(p => p.featured);      
    const [current, setCurrent] = useState(0);
    const length = featuredProducts.length;
    const autoScroll = true;
    let slideInterval;
    let intervalTime = 5000;
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);


    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    };
    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    };
    const auto = () => {
        slideInterval = setInterval(nextSlide, intervalTime);
    };
    useEffect(() => {
        if (autoScroll) {
            auto();
        }
        return () => clearInterval(slideInterval);
    }, [current]);
    const handleTouchStart = (e) => {
        setTouchStart(e.targetTouches[0].clientX);
        setTouchEnd(null);
        clearInterval(slideInterval);
    };
    const handleTouchMove = (e) => {

        setTouchEnd(e.targetTouches[0].clientX);
        clearInterval(slideInterval);
    };
    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;

        if (isLeftSwipe) {
            nextSlide();
        } else if (isRightSwipe) {
            prevSlide();
        }
        setTouchStart(null);
        setTouchEnd(null);
        auto();
    };
    if (!Array.isArray(featuredProducts) || featuredProducts.length <= 0) {
        return null;
    }
    return (
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
      <img src={product.image} alt={product.name} className="carousel-img" />
      <div className="carousel-text">
        <h2>{product.name}</h2>
        <p>${product.price.toFixed(2)}</p>
        <Link to={`/product/${product.id}`}>
          <button className="cta-btn">View Product</button>
        </Link>
      </div>
    </div>
  ))}
  
  {/* Navigation Arrows */}
  <button className="carousel-arrow left" onClick={prevSlide}>❮</button>
  <button className="carousel-arrow right" onClick={nextSlide}>❯</button>

  {/* Dots */}
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