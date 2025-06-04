const CartModel = require("../models/cart.model");

function parsePrice(price) {
  if (typeof price === "string") {
    const parsed = Number(price.replace(/[^0-9.]/g, ""));
    if (isNaN(parsed)) {
      throw new Error("Invalid price format");
    }
    return parsed;
  }

  return price;
}

const addToCart = async (req, res) => {
  const { userId, productId, image, price, quantity, description } = req.body;

  try {
    const parsedPrice = parsePrice(price);
    const quantityNum = Number(quantity);
    if (isNaN(quantityNum) || quantityNum <= 0) {
      return res.status(400).json({ message: "Invalid quantity" });
    }

    let cart = await CartModel.findOne({ userId });

    if (cart) {
      const index = cart.products.findIndex(
        (item) => item?.productId?.toString() === productId.toString()
      );

      if (index !== -1) {
        cart.products[index].quantity += quantityNum;
      } else {
        cart.products.push({
          productId,
          image,
          price: parsedPrice,
          quantity: quantityNum,
          description,
        });
      }

      await cart.save();
      return res.status(200).json({ message: "Cart updated", cart });
    } else {
      const newCart = new CartModel({
        userId,
        products: [
          {
            productId,
            image,
            price: parsedPrice,
            quantity: quantityNum,
            description,
          },
        ],
      });

      await newCart.save();
      return res.status(201).json({ message: "Cart created", cart: newCart });
    }
  } catch (error) {
    console.error("AddToCart Error:", error.message);
    return res.status(500).json({ message: error.message });
  }
};

// Get cart items
const getCart = async (req, res) => {
  try {
    const cart = await CartModel.findOne({
      userId: req.params.userId,
    });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json({ cart });
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error });
  }
};

// Remove product
const removeFromCart = async (req, res) => {
  const { userId, itemId } = req.params;

  try {
    const cart = await CartModel.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    console.log("Item to remove (itemId):", itemId);

    cart.products = cart.products.filter((item) => item.productId !== itemId);

    await cart.save();
    res.status(200).json({ message: "Removed from cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Error removing from cart", error });
  }
};

module.exports = {
  addToCart,
  getCart,
  removeFromCart,
};
