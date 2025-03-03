export default class UserModel {
  constructor(name, email, password, type, id) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.type = type;
    this.id = id;
  }

  static signup(name, email, password, type) {
    const newUser = new UserModel(name, email, password, type);
    console.log(newUser, "in model");
    newUser.id = user.length + 1;
    user.push(newUser);
    return newUser;
  }

  static signin(email, password) {
    const foundUser = user.find(
      (user) => user.email === email && user.password === password
    );
    return foundUser;
  }

  static getAllUser() {
    return user;
  }
}

var user = [
  {
    id: 1,
    name: "subham",
    email: "seller@ecom.com",
    password: "Subham@12",
    type: "seller",
  },
  {
    id: 2,
    name: "rahul",
    email: "customer@ecom.com",
    password: "Subham@12",
    type: "customer",
  },
];
