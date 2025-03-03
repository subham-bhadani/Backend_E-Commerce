import express from "express";
import ProductModel from "./product.model.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

// const productModel = new ProductModel();

export default class ProductController {
  getAllProducts(req, res) {
    try {
      const products = ProductModel.getAll();
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  }

  addProduct(req, res) {
    try {
      console.log(req.body);
      // res.status(200).send("Post request received");
      const { name, price, sizes } = req.body;
      const newProduct = {
        name,
        price: parseFloat(price),
        sizes: sizes.split(","), // convert string to array
        imageUrl: req.file.filename, // get the filename from the file object
      };
      const createdRecord = ProductModel.addProduct(newProduct);
      res.status(201).send(createdRecord);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  }

  getOne(req, res) {
    try {
      console.log(req.params, "subhammmmm");
      const { id } = req.params;
      const product = ProductModel.getById(parseInt(id));
      if (!product) {
        res.status(404).send("Product not found");
      } else {
        res.status(200).send(product);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  }

  rateProduct(req, res, next) {
    try {
      const { userID, productID, rating } = req.query;
      ProductModel.rateProduct(userID, productID, rating);
      res.status(200).send("Rating added successfully");
    } catch (err) {
      next(err);
    }
  }

  filterProducts(req, res) {
    try {
      const { minPrice, maxPrice, category } = req.query;
      const result = ProductModel.filter(minPrice, maxPrice, category);
      console.log(result, "!!!!!!!!!!!!!!!!!");
      res.status(200).send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  }
}
