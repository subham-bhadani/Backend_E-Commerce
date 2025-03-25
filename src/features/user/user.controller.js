import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";
import UserRepository from "./user.repository.js";
import { ApplicationError } from "../../error-handler/applicationError.js";
import bcrypt from "bcrypt";

const jwtSecret = "7DCCB5957DA8EABEB99F1F36FDE89"; //   Replace with your actual secret

export default class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async signup(req, res) {
    try {
      const { name, email, password, type } = req.body;
      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = new UserModel(name, email, hashedPassword, type);
      await this.userRepository.signup(newUser);
      res.status(201).send(newUser);
    } catch (err) {
      res.status(500).send("Error in signup");
    }
  }

  async signin(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        return res.status(404).send("Incorrect credentials");
      } else {
        const result = await bcrypt.compare(password, user.password);
        if (!result) {
          throw new ApplicationError(401, "Invalid password");
        }
        const token = jwt.sign({ id: user._id, email: user.email }, jwtSecret, {
          expiresIn: "1h",
        });
        res.status(200).send({ token });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).send("Something went wrong");
    }
  }

  async getUsers(req, res) {
    try {
      const users = await this.userRepository.getAllUsers();
      console.log(users, "users in controller");
      res.status(200).send(users);
    } catch (err) {
      console.error(err);
      res.status(500).send("Something went wrong");
    }
  }
}
