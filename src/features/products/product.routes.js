import express from "express";
import ProductController from "./product.controller.js";
import upload from "../../middlewares/fileupload.middleware.js";

const router = express.Router();

const productController = new ProductController();

router.get("/getAllProducts", (req, res) => {
  productController.getAllProducts(req, res);
});
router.post("/addProduct", upload.single("imageUrl"), (req, res) => {
  productController.addProduct(req, res);
});

router.get("/getOneProduct/:id", (req, res) => {
  productController.getOne(req, res);
});

router.get("/filterProducts", (req, res) => {
  productController.filterProducts(req, res);
});

router.post("/rateProduct", (req, res) => {
  productController.rateProduct(req, res);
});

export default router;
