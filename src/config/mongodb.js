import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

// const url = process.env.DB_URL;

let client;
export const connectToMongodb = () => {
  MongoClient.connect(process.env.DB_URL)
    .then((clientInstance) => {
      client = clientInstance;
      console.log("Connected to mongodb");
      createCounter(client.db());
      createIndexes(client.db());
    })
    .catch((err) => {
      console.log("Error connecting to mongodb", err);
    });
};

export const getClient = () => {
  return client;
};

export const getDb = () => {
  return client.db();
};

const createCounter = async (db) => {
  const existingCounter = await db
    .collection("counters")
    .findOne({ _id: "cartItemId" });
  if (!existingCounter) {
    await db.collection("counters").insertOne({ _id: "cartItemId", value: 0 });
  }
};

const createIndexes = async (db) => {
  try {
    await db.collection("products").createIndex({ price: 1 });
    console.log("Index created");
  } catch (err) {
    console.log("Error creating index", err);
  }
};
