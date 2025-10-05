import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import "./AdminDashboard.css";

function AdminDashboard() {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    featured: false,
    discount: 0,
    image: null,
  });

  // Fetch products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      if (!user?.token) {
        setMessage("❌ You must be logged in as admin.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/products", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setMessage("❌ Error fetching products. Is backend running?");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [user]);

  const handleUpdate = async (id, field, value) => {
    if (!user?.token) {
      setMessage("❌ Not authorized");
      return;
    }

    if (field === "discount") {
      value = Math.min(Math.max(value, 0), 0.9);
    }

    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ [field]: value }),
      });
      if (!res.ok) throw new Error("Failed to update product");
      const updated = await res.json();
      setProducts(products.map(p => (p._id === id ? updated : p)));
      setMessage("✅ Product updated successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to update product.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!user?.token) {
      setMessage("❌ Not authorized to add products");
      return;
    }

    if (!newProduct.image) {
      alert("Please select an image file!");
      return;
    }

    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("price", newProduct.price);
    formData.append("featured", newProduct.featured);
    formData.append("discount", newProduct.discount);
    formData.append("image", newProduct.image);

    try {
      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to add product");
      }

      const data = await res.json();
      setProducts(prev => [...prev, data]);
      setMessage("✅ Product added successfully!");
      setNewProduct({ name: "", price: "", featured: false, discount: 0, image: null });
    } catch (err) {
      console.error("Error adding product:", err);
      setMessage(`❌ ${err.message}`);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="admin-dashboard">
      <h2>Product Management</h2>
      {message && <p className="admin-message">{message}</p>}

      <form className="add-product-form" onSubmit={handleAddProduct}>
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price"
          min="0"
          step="0.01"
          value={newProduct.price}
          onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
          required
        />
        <label>
          Featured:
          <input
            type="checkbox"
            checked={newProduct.featured}
            onChange={e => setNewProduct({ ...newProduct, featured: e.target.checked })}
          />
        </label>
        <input
          type="number"
          placeholder="Discount (%)"
          min="0"
          max="90"
          step="5"
          value={Math.round(newProduct.discount * 100)}
          onChange={e =>
            setNewProduct({ ...newProduct, discount: Number(e.target.value) / 100 })
          }
        />
        <input
          type="file"
          accept="image/*"
          onChange={e => setNewProduct({ ...newProduct, image: e.target.files[0] })}
          required
        />
        <button type="submit">Add Product</button>
      </form>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Featured</th>
            <th>Discount (%)</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p._id}>
              <td><img src={p.image} alt={p.name} className="admin-thumb" /></td>
              <td>{p.name}</td>
              <td>
                <input
                  type="checkbox"
                  checked={p.featured}
                  onChange={e => handleUpdate(p._id, "featured", e.target.checked)}
                />
                {p.featured && <span className="featured-badge">★</span>}
              </td>
              <td>
                <input
                  type="number"
                  min="0"
                  max="90"
                  step="5"
                  value={Math.round(p.discount * 100)}
                  onChange={e => handleUpdate(p._id, "discount", Number(e.target.value) / 100)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
