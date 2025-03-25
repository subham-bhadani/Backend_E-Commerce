import express from "express";
import CartItemController from "./cartItem.controller.js";

const cartRouter = express.Router();

const cartItemController = new CartItemController();

cartRouter.post("/addToCart", (req, res) => {
  cartItemController.addCartItem(req, res);
});
cartRouter.get("/getCartItems", (req, res) => {
  cartItemController.getCartItems(req, res);
});
cartRouter.delete("/deleteCartItem", (req, res) => {
  cartItemController.deleteCartItem(req, res);
});

export default cartRouter;
