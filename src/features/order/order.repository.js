import { getClient, getDb } from "../../config/mongodb.js";
import { ObjectId } from "mongodb";
import OrderModel from "./order.model.js";

export default class OrderRepository {
  constructor() {
    this.collection = "orders";
  }

  async placeOrder(userId) {
    const client = getClient();
    const session = client.startSession();
    try {
      const db = getDb();
      session.startTransaction();

      // 1. Get cart items for the user and calculate the amount
      const items = await this.getTotalAmount(userId, session);
      const finalTotalAmount = items.reduce((acc, item) => {
        acc += item.totalAmount;
        return acc;
      }, 0);
      console.log(finalTotalAmount, "finalTotalAmount in getTotalAmount");

      // 2. Create an order record in the orders collection
      const newOrder = new OrderModel(
        new ObjectId(userId),
        finalTotalAmount,
        new Date()
      );
      const collection = db.collection(this.collection);
      await collection.insertOne(newOrder, { session });
      console.log(newOrder, "newOrder in placeOrder");

      // 3. Reduce the stock of the products in the products collection
      for (let item of items) {
        await db
          .collection("products")
          .updateOne(
            { _id: new ObjectId(item.productID) },
            { $inc: { stock: -item.quantity } },
            { session }
          );
      }

      // 4. Clear the cart for the user
      await db
        .collection("cartItem")
        .deleteMany({ userID: new ObjectId(userId) }, { session });

      // Commit the transaction
      await session.commitTransaction();
      console.log("Transaction committed successfully");
    } catch (err) {
      console.error(err, "error in placeOrder");

      // Abort the transaction in case of an error
      await session.abortTransaction();
      console.log("Transaction aborted due to an error");

      throw new ApplicationError(500, "Error in placing order");
    } finally {
      // End the session
      session.endSession();
    }
  }

  async getTotalAmount(userId, session) {
    const db = getDb();
    const items = await db
      .collection("cartItem")
      .aggregate(
        [
          // 1. get cart items for the user
          {
            $match: {
              userID: new ObjectId(userId),
            },
          },
          // 2. get the products from products collection.
          {
            $lookup: {
              from: "products",
              localField: "productID",
              foreignField: "_id",
              as: "productInfo",
            },
          },
          // 3. unwind the productInfo array to get the product details
          {
            $unwind: "$productInfo",
          },
          // 4. calculate the total amount for each cart item
          {
            $addFields: {
              totalAmount: {
                $multiply: ["$quantity", "$productInfo.price"],
              },
            },
          },
        ],
        { session }
      )
      .toArray();
    console.log(items, "items in getTotalAmount");
    return items;
  }
}
