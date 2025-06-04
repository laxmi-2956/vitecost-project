const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      ref: "user",
    },
    products: [
      {
        productId: {
          type: String,
        },
        image: {
          type: String,
        },
        price: {
          type: Number,
        },

        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true }
);

const CartModel = mongoose.model("cart", cartSchema);

module.exports = CartModel;
