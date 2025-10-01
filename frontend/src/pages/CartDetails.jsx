import { useCart } from "../contexts/CartContext";

function CartDetails() {
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (cartItems.length === 0) {
    return <h2>Your cart is empty</h2>;
  }

  return (
    <div className="cart-details" style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Your Shopping Cart</h1>
      {cartItems.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #ddd",
            padding: "10px 0",
          }}
        >
          <div style={{ flex: 2 }}>
            <img
              src={item.image}
              alt={item.name}
              style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "5px" }}
            />
          </div>
          <div style={{ flex: 3 }}>
            <h3>{item.name}</h3>
            <p>${item.price.toFixed(2)}</p>
          </div>
          <div style={{ flex: 2, display: "flex", alignItems: "center", gap: "5px" }}>
            <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
          </div>
          <div style={{ flex: 1 }}>
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </div>
        </div>
      ))}
      <h2 style={{ textAlign: "right", marginTop: "20px" }}>Total: ${totalPrice.toFixed(2)}</h2>
    </div>
  );
}

export default CartDetails;
