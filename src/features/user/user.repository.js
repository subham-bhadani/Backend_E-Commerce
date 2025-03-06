import { getDb } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

export default class UserRepository {
  async signup(newUser) {
    try {
      const db = getDb();
      console.log(db, "db in model");
      const collection = db.collection("users");
      console.log(newUser, "in model");
      await collection.insertOne(newUser);
      return newUser;
    } catch (err) {
      console.log(err, "error in model");
      throw new ApplicationError(500, "Error in signup");
    }
  }

  //   async signin(email, password) {
  //     try {
  //       const db = getDb();
  //       const collection = db.collection("users");
  //       const foundUser = await collection.findOne({ email, password });
  //       return foundUser;
  //     } catch (err) {
  //       console.log(err, "error in signin");
  //       throw new ApplicationError("Something went wrong with the database");
  //     }
  //   }

  async findByEmail(email) {
    try {
      const db = getDb();
      const collection = db.collection("users");
      const user = await collection.findOne({ email });
      return user;
    } catch (err) {
      throw new ApplicationError("User not found");
    }
  }

  async getAllUsers() {
    try {
      const db = getDb();
      const collection = db.collection("users");
      const users = await collection.find().toArray();
      console.log(users, "users in model");
      return users;
    } catch (err) {
      console.error(err, "error in getAllUsers");
      throw new ApplicationError(500, "Something went wrong with the database");
    }
  }
}
