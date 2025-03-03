import express from "express";
import UserController from "./user.controller.js";

const router = express.Router();

const userController = new UserController();

router.post("/signup", userController.signup);
router.post("/signin", userController.signin);
router.get("/getUsers", userController.getUsers);

export { router as userRouter };
