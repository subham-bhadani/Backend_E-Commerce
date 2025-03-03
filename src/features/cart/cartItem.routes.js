import express from "express";
import CartItemController from "./cartItem.controller.js";

const cartRouter = express.Router();

const cartItemController = new CartItemController();

cartRouter.post("/addToCart", cartItemController.addCartItem);
cartRouter.get("/getCartItems", cartItemController.getCartItems);
cartRouter.delete("/deleteCartItem", cartItemController.deleteCartItem);

export default cartRouter;
