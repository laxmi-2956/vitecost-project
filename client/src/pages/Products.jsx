import React, { useEffect, useState } from "react";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => {
        alert("Failed to fetch product details");
        console.error(err);
      });
  }, []);

  return (
    <div>
      <h2>Vitacost Products</h2>
      {products.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <div key={product._id} className="product-card">
              <img src={product.image} alt={product.name} width="150" />
              <h3>{product.name}</h3>
              <p>₹{product.price}</p>
              <p>{product.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
