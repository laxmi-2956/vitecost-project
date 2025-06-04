const express = require('express');
const { getProducts, createProduct, getProductById, getTopSellers, getExploreShops, getFreshFinds, getInspiredProducts, getProductDetails } = require('../controllers/product.controller');

const productRouter = express.Router()

productRouter.get("/getproducts" ,getProducts ) 
productRouter.post("/createproduct" , createProduct) 
productRouter.get("/getsingleproduct/:id", getProductById);
productRouter.get("/top-sellers", getTopSellers);
productRouter.get("/explore-shops", getExploreShops);
productRouter.get("/fresh-finds", getFreshFinds);
productRouter.get("/inspired", getInspiredProducts);
productRouter.post("/getproductdetails", getProductDetails);

module.exports = productRouter