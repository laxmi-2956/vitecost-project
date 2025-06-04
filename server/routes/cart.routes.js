const express = require("express");
const {
  addToCart,
  
  removeFromCart,
  getCart,
 
} = require("../controllers/cart.controller");

const cartRouter = express.Router();

cartRouter.post("/add", addToCart);
cartRouter.get("/getcart/:userId", getCart);
cartRouter.delete("/remove/:userId/:itemId", removeFromCart);


module.exports = cartRouter