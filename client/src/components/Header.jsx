import React, { useState } from 'react';
import "../css/Header.css"
import { FaSearch, FaUserCircle, FaShoppingCart, FaBars } from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom";
import Sidebar from './Sidebar'; 

const Header = () => {
  const navigate = useNavigate();
  const [showDealsDropdown, setShowDealsDropdown] = useState(false);
   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
   

  return (
    <header className="header">
      <div className="left-section">
        <img
          src="https://www.vitacost.com/images/lpa/VitacostLogo_2016_b.png"
          alt="Vitacost Logo"
          className="logo"
        />

        <nav className="nav-menu">
          <div className="nav-item" onClick={() => setIsSidebarOpen(true)} style={{ cursor: 'pointer' }}>
            <FaBars className="menu-icon" />
            <span>Shop</span>
          </div>
          <span className="nav-item">Menopause</span>
          <span className="nav-item">Tips & Recipes</span>

          <div
            className="nav-item deals"
            onMouseEnter={() => setShowDealsDropdown(true)}
            onMouseLeave={() => setShowDealsDropdown(false)}
          >
            Deals <span className="dropdown-arrow">▼</span>

            {showDealsDropdown && (
              <div className="dropdown-menu">
                <div className="dropdown-section">
                  <button className="deal-box green">Coupons <br /><span>& Discounts</span></button>
                  <button className="deal-box blue">Promo <br /><span>Pocket</span></button>
                </div>
                <div className="dropdown-icons">
                  <div className="icon-item">
                    🚚<span>Free Shipping</span>
                  </div>
                  <div className="icon-item">
                    🔄<span>Autoship</span>
                  </div>
                  <div className="icon-item">
                    ❗<span>Last Chance</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>

      <div className="search-section">
        <input type="text" placeholder="What can we help you find today?" />
        <button className="search-btn"><FaSearch /></button>
      </div>

      <div className="right-section">
        <div className="icon-block">
          <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
            <FaUserCircle />
            <span>Sign In</span>
          </Link>
        </div>
      <div className="icon-block cart-icon" onClick={() => navigate("/cart")} style={{ cursor: "pointer", position: "relative" }}>
  <FaShoppingCart />
  <span className="cart-badge">1</span> {/* Replace 1 with dynamic value */}
  <span>Cart</span>
</div>
      </div>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </header>
  );
};

export default Header;
