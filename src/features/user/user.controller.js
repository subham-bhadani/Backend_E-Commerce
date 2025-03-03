import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";

const jwtSecret = "7DCCB5957DA8EABEB99F1F36FDE89"; // Replace with your actual secret

export default class UserController {
  signup(req, res) {
    const { name, email, password, type } = req.body;
    console.log(req.body, "in controller");
    const newUser = UserModel.signup(name, email, password, type);
    res.status(201).send(newUser);
  }

  signin(req, res) {
    const { email, password } = req.body;
    console.log(req.body, "in controller");
    const foundUser = UserModel.signin(email, password);
    if (!foundUser) {
      return res.status(404).send("User not found");
    }
    console.log(foundUser, "found user");
    const token = jwt.sign(
      { id: foundUser.id, email: foundUser.email },
      jwtSecret,
      { expiresIn: "1h" }
    );
    // console.log(token._id, "token");
    res.status(200).send({ token });
  }

  getUsers(req, res) {
    const users = UserModel.getAllUser();
    res.json(users);
  }
}
