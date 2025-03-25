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
    })
    .catch((err) => {
      console.log("Error connecting to mongodb", err);
    });
};

export const getDb = () => {
  return client.db();
};
