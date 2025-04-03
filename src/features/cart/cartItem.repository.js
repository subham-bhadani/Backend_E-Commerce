import { getDb } from "../../config/mongodb.js";
import { ObjectId } from "mongodb";
import { ApplicationError } from "../../error-handler/applicationError.js";

export default class CartItemRepository {
  constructor() {
    this.collection = "cartItem";
  }

  async addCartItem(userID, productID, quantity) {
    try {
      const db = getDb();
      const collection = db.collection(this.collection);
      const id = await this.getNextCounter(db);
      await collection.updateOne(
        {
          userID: new ObjectId(userID),
          productID: new ObjectId(productID),
        },
        {
          $setOnInsert: { _id: id },
          $inc: { quantity: quantity },
        },
        { upsert: true }
      );
    } catch (err) {
      console.log(err, "error in model");
      throw new ApplicationError(500, "Error in adding cartItem");
    }
  }

  async getNextCounter(db) {
    const resultDocument = await db
      .collection("counters")
      .findOneAndUpdate(
        { _id: "cartItemId" },
        { $inc: { value: 1 } },
        { returnDocument: "after" }
      );
    console.log(resultDocument, "resultDocument in getNextCounter");
    console.log(
      resultDocument.value,
      "resultDocument.value.value in getNextCounter"
    );
    return resultDocument.value;
  }

  async getCartItem(userID) {
    try {
      const db = getDb();
      const collection = db.collection(this.collection);
      const cartItems = await collection
        .find({ userID: new ObjectId(userID) })
        .toArray();
      console.log(cartItems, "cartItems in model");
      return cartItems;
    } catch (err) {
      console.error(err, "error in getCartItem");
      throw new ApplicationError(500, "Something went wrong with the database");
    }
  }

  async deleteItem(userID, cartItemID) {
    try {
      const db = getDb();
      const collection = db.collection(this.collection);
      const result = await collection.deleteOne({
        userID: new ObjectId(userID),
        _id: new ObjectId(cartItemID),
      });
      return result;
    } catch (err) {
      console.error(err, "error in deleteItem");
      throw new ApplicationError(500, "Something went wrong with the database");
    }
  }
}
