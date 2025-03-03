import express from "express";
import ProductController from "./product.controller.js";
import upload from "../../middlewares/fileupload.middleware.js";

const router = express.Router();

const productController = new ProductController();

router.get("/getAllProducts", productController.getAllProducts);
router.post(
  "/addProduct",
  upload.single("imageUrl"),
  productController.addProduct
);

router.get("/getOneProduct/:id", productController.getOne);

router.get("/filterProducts", productController.filterProducts);

router.post("/rateProduct", productController.rateProduct);

export default router;
