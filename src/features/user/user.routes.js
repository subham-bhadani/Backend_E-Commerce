import express from "express";
import UserController from "./user.controller.js";

const router = express.Router();

const userController = new UserController();

router.post("/signup", (req, res) => {
  userController.signup(req, res);
});
router.post("/signin", (req, res) => {
  userController.signin(req, res);
});
router.get("/getUsers", (req, res) => {
  userController.getUsers(req, res);
});

export { router as userRouter };
