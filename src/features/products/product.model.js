import { ApplicationError } from "../../error-handler/applicationError.js";
import UserModel from "../user/user.model.js";

export default class ProductModel {
  constructor(id, name, desc, imageUrl, category, price, sizes) {
    this.id = id;
    this.name = name;
    this.desc = desc;
    this.imageUrl = imageUrl;
    this.category = category;
    this.price = price;
    this.sizes = sizes;
  }

  static getAll() {
    return products;
  }

  static addProduct(product) {
    product.id = products.length + 1;
    products.push(product);
    return product;
  }

  static getById(id) {
    return products.find((product) => product.id === id);
  }

  static filter(minPrice, maxPrice, category) {
    return products.filter(
      (product) =>
        (!minPrice || product.price >= minPrice) &&
        (!maxPrice || product.price <= maxPrice) &&
        (!category || product.category === category)
    );
  }

  static rateProduct(userID, productID, rating) {
    // 1. Validate user and product
    const user = UserModel.getAllUser().find((u) => u.id == userID);
    if (!user) {
      throw new ApplicationError("User not found", 404);
    }

    // Validate Product
    const product = products.find((p) => p.id == productID);
    if (!product) {
      throw new ApplicationError("Product not found", 404);
    }

    // Validate rating
    if (isNaN(rating) || rating < 1 || rating > 5) {
      throw new ApplicationError("Invalid rating value", 400);
    }

    // 2. Check if there are any ratings and if not then add ratings array.
    if (!product.ratings) {
      product.ratings = [];
    }

    // 3. Check if user rating is already available.
    const existingRatingIndex = product.ratings.findIndex(
      (r) => r.userID == userID
    );
    if (existingRatingIndex >= 0) {
      product.ratings[existingRatingIndex] = {
        userID: userID,
        rating: rating,
      };
    } else {
      // 4. if no existing rating, then add new rating.
      product.ratings.push({
        userID: userID,
        rating: rating,
      });
    }
  }
}

const products = [
  new ProductModel(
    1,
    "Nike Air Max",
    "Comfortable running shoes",
    "https://example.com/nike-air-max.jpg",
    "Shoes",
    120,
    ["7", "8", "9", "10"]
  ),
  new ProductModel(
    2,
    "Adidas Ultraboost",
    "High-performance sneakers",
    "https://example.com/adidas-ultraboost.jpg",
    "Shoes",
    150,
    ["6", "7", "8", "9", "10", "11"]
  ),
  new ProductModel(
    3,
    "Levi's 501 Jeans",
    "Classic straight-fit jeans",
    "https://example.com/levis-501.jpg",
    "Clothing",
    80,
    ["S", "M", "L", "XL"]
  ),
  new ProductModel(
    4,
    "Apple Watch Series 8",
    "Advanced smartwatch with health features",
    "https://example.com/apple-watch.jpg",
    "Accessories",
    399,
    []
  ),
  new ProductModel(
    5,
    "North Face Jacket",
    "Waterproof and windproof winter jacket",
    "https://example.com/north-face-jacket.jpg",
    "Clothing",
    200,
    ["M", "L", "XL"]
  ),
];
