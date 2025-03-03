import CartItemModel from "./cartItem.model.js";

export default class CartItemController {
  addCartItem(req, res) {
    const { productID, quantity } = req.body;
    const userID = req.userID;
    const newCartItem = CartItemModel.add(productID, userID, quantity);
    res.status(201).send(newCartItem);
  }

  getCartItems(req, res) {
    const userID = req.userID;
    console.log(userID);
    const cartItems = CartItemModel.getCartItem(userID);
    res.status(200).send(cartItems);
  }

  deleteCartItem(req, res) {
    const { productID } = req.body;
    const deletedItem = CartItemModel.deleteItem(productID);
    if (deletedItem === "Product not found in cart") {
      return res.status(404).send("Product not found in cart");
    }
    res.status(200).send(deletedItem);
  }
}
