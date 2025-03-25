import CartItemModel from "./cartItem.model.js";
import CartItemRepository from "./cartItem.repository.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

export default class CartItemController {
  constructor() {
    this.cartItemRepository = new CartItemRepository();
  }
  addCartItem(req, res) {
    try {
      const { productID, quantity } = req.body;
      const userID = req.userID;
      const newCartItem = this.cartItemRepository.addCartItem(
        userID,
        productID,
        quantity
      );
      res.status(201).send("cart is updated");
    } catch (error) {
      console.error(error);
      res.status(200).send("Something went wrong");
    }
  }

  async getCartItems(req, res) {
    try {
      const userID = req.userID;
      const cartItems = await this.cartItemRepository.getCartItem(userID);
      res.status(200).send(cartItems);
    } catch (error) {
      console.error(error);
      res.status(200).send("Something went wrong");
    }
  }

  async deleteCartItem(req, res) {
    try {
      const userID = req.userID;
      const { cartItemID } = req.body;
      console.log(userID, cartItemID, "userID, cartItemID");
      const deletedItem = await this.cartItemRepository.deleteItem(
        userID,
        cartItemID
      );
      res.status(200).send(deletedItem);
    } catch (error) {
      console.error(error);
      if (error instanceof ApplicationError) {
        return res.status(error.statusCode).send(error.message);
      }
      res.status(500).send("Something went wrong");
    }
  }
}
