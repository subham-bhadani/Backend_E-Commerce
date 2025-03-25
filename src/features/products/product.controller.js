import ProductModel from "./product.model.js";
// const productModel = new ProductModel();
import ProductRepository from "./product.repository.js";

export default class ProductController {
  constructor() {
    this.productRepository = new ProductRepository();
  }

  async getAllProducts(req, res) {
    try {
      const products = await this.productRepository.getAllProducts();
      res.status(200).send(products);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  }

  async addProduct(req, res) {
    try {
      const { name, price, sizes } = req.body;
      const newProduct = {
        name,
        price: parseFloat(price),
        sizes: sizes.split(","), // convert string to array
        imageUrl: req.file.filename, // get the filename from the file object
      };
      const product = await this.productRepository.addProduct(newProduct);
      console.log(product, "product in controller");
      res.status(201).send(product);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.params;
      const product = await this.productRepository.getProductById(id);
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

  async rateProduct(req, res, next) {
    try {
      const userID = req.userID;
      const { productID, rating } = req.body;
      console.log(productID, rating, userID, "productID, rating, userID");
      await this.productRepository.rateProduct(userID, productID, rating);
      res.status(200).send("Rating added successfully");
    } catch (err) {
      next(err);
    }
  }

  async filterProducts(req, res) {
    try {
      const { minPrice, maxPrice } = req.query;
      console.log(minPrice, maxPrice, "minPrice, maxPrice");
      const products = await this.productRepository.filter(minPrice, maxPrice);
      res.status(200).send(products);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  }
}
