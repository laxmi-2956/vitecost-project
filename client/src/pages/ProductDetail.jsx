import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/products/getproductdetails`,
        { productId: id }
      );
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-detail container">
      {/* Breadcrumbs */}
      <div className="breadcrumbs">
        <a href="#">Vitamins & Supplements</a> <span>›</span>
        <a href="#">Letter Vitamins</a> <span>›</span>
        <strong>{product.name || product.title || "Product"}</strong>
      </div>

      {/* Title */}
      <h2>
        <strong>{product.brand || "Brand"}</strong>{" "}
        {product.title || product.name}
      </h2>

      <div className="divider"></div>

      {/* Price and Review Section */}
      <div className="price-review">
        <div className="price-box">
          <strong>Our price: ${product.price}</strong>
          <div className="per-serving">$1.37 per serving</div>
        </div>
        <div className="review-box">
          <div className="stars">★★★★★</div>
          <div>
            4.7 (160) · <a href="#">Write a review</a>
          </div>
        </div>
      </div>

      {/* Product image and description */}
      <img src={product.image} alt={product.title || product.name} />
      <p>
        {product.content || product.description || "No description available."}
      </p>
    </div>
  );
};

export default ProductDetail;
