import e from "express";
import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017/ecomdb";

let client;
export const connectToMongodb = () => {
  MongoClient.connect(url)
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
