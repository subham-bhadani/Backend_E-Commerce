import { getDb } from "../../config/mongodb.js";
import { ObjectId } from "mongodb";

export default class ProductRepository {
  constructor() {
    this.collection = "products";
  }

  async addProduct(newProduct) {
    try {
      const db = getDb();
      const collection = db.collection(this.collection);
      await collection.insertOne(newProduct);
      return newProduct;
    } catch (err) {
      console.log(err, "error in model");
      throw new ApplicationError(500, "Error in adding product");
    }
  }

  async getAllProducts() {
    try {
      const db = getDb();
      const collection = db.collection(this.collection);
      const products = await collection.find().toArray();
      console.log(products, "products in model");
      return products;
    } catch (err) {
      console.error(err, "error in getAllProducts");
      throw new ApplicationError(500, "Something went wrong with the database");
    }
  }

  async getProductById(id) {
    try {
      const db = getDb();
      const collection = db.collection(this.collection);
      console.log(id, "id in model");
      const product = await collection.findOne({ _id: new ObjectId(id) });
      console.log(product, "product in model");
      return product;
    } catch (err) {
      console.error(err, "error in getProductById");
      throw new ApplicationError(500, "Something went wrong with the database");
    }
  }

  async filter(minPrice, maxPrice) {
    try {
      const db = getDb();
      const collection = db.collection(this.collection);
      let filterExpression = {};

      if (minPrice && maxPrice) {
        filterExpression.price = {
          $gte: Number(minPrice),
          $lte: Number(maxPrice),
        };
      } else if (minPrice) {
        filterExpression.price = { $gte: Number(minPrice) };
      } else if (maxPrice) {
        filterExpression.price = { $lte: Number(maxPrice) };
      }

      console.log(filterExpression, "filterExpression");
      const result = await collection.find(filterExpression).toArray();
      console.log(result, "result in");
      return result;
    } catch (err) {
      console.error(err, "error in filter");
      throw new ApplicationError(500, "Something went wrong with the database");
    }
  }

  // async rateProduct(userID, productID, rating) {
  //   try {
  //     const db = getDb();
  //     const collection = db.collection(this.collection);
  //     const product = await collection.findOne({
  //       _id: new ObjectId(productID),
  //     });
  //     if (!product) {
  //       throw new ApplicationError(404, "Product not found");
  //     }
  //     const userRating = product?.ratings?.find(
  //       (r) => r.userID.toString() === userID
  //     );
  //     if (userRating) {
  //       await collection.updateOne(
  //         {
  //           _id: new ObjectId(productID),
  //           "ratings.userID": new ObjectId(userID),
  //         },
  //         { $set: { "ratings.$.rating": rating } }
  //       );
  //     } else {
  //       await collection.updateOne(
  //         { _id: new ObjectId(productID) },
  //         { $push: { ratings: { userID: new ObjectId(userID), rating } } }
  //       );
  //     }
  //   } catch {
  //     throw new ApplicationError(500, "Something went wrong with the database");
  //   }
  // }

  async rateProduct(userID, productID, rating) {
    try {
      const db = getDb();
      const collection = db.collection(this.collection);
      await collection.updateOne(
        { _id: new ObjectId(productID) },
        { $pull: { ratings: { userID: new ObjectId(userID) } } }
      );

      await collection.updateOne(
        { _id: new ObjectId(productID) },
        { $push: { ratings: { userID: new ObjectId(userID), rating } } }
      );
    } catch {
      throw new ApplicationError(500, "Something went wrong with the database");
    }
  }
}
