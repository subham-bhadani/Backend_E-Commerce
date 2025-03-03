import express from "express";
import swagger from "swagger-ui-express";
import bodyParser from "body-parser";
import productRouter from "./src/features/products/product.routes.js";
import { userRouter } from "./src/features/user/user.routes.js";
import basicAuthorizer from "./src/middlewares/basicAuth.middleware.js";
import jwtAuth from "./src/middlewares/jwtAuth.middleware.js";
import cartRouter from "./src/features/cart/cartItem.routes.js";
import swaggerDocument from "./swagger.json" assert { type: "json" }; // Import swagger.json with assertion
import cors from "cors";
import { log } from "console";
import loggerMiddleware from "./src/middlewares/logger.middleware.js";
import { ApplicationError } from "./src/error-handler/applicationError.js";

const app = express();

// var corsOptions = {
//   origin: "http://localhost:3001",
//   // optionsSuccessStatus: 200,
// };

// app.use(cors(corsOptions));

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3001");
//   res.header("Access-Control-Allow-Headers", "*");
//   res.header("Access-Control-Allow-Methods", "*");
//   if (req.method === "OPTIONS") {
//     return res.status(200).end();
//   }
//   next();
// });

app.use(bodyParser.json());

app.use(loggerMiddleware);

app.use("/api-docs", swagger.serve, swagger.setup(swaggerDocument)); // Use swaggerDocument
app.use("/api/products", jwtAuth, productRouter);
app.use("/api/cart", jwtAuth, cartRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("Welcome to ecom api's");
});

app.use((err, req, res, next) => {
  console.log(err);
  if (err instanceof ApplicationError) {
    res.status(err.statusCode).send(err.message);
    return;
  }
  res.status(500).send("Something went wrong, Please try again later");
});

app.use((req, res) => {
  res.status(404).send("API not found");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
