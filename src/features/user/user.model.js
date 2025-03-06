import { getDb } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

export default class UserModel {
  constructor(name, email, password, type, id) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.type = type;
    this._id = id;
  }
}

// var user = [
//   {
//     id: 1,
//     name: "subham",
//     email: "seller@ecom.com",
//     password: "Subham@12",
//     type: "seller",
//   },
//   {
//     id: 2,
//     name: "rahul",
//     email: "customer@ecom.com",
//     password: "Subham@12",
//     type: "customer",
//   },
// ];
