import express, { Application } from "express";
import marketProducts from "./database";
import { IProduct, TProductRequest } from "./interfaces";
import {
  allProducts,
  createProduct,
  deleteProducts,
  retrieveProducts,
  updateProducts,
} from "./logic";
import {
  productsMiddlewareIdExist,
  productsMiddlewareNameExist,
} from "./middleware";

const app: Application = express();

app.use(express.json());

app.post("/products", productsMiddlewareNameExist, createProduct);
app.patch(
  "/products/:id",
  productsMiddlewareIdExist,
  productsMiddlewareNameExist,
  updateProducts
);
app.get("/products", allProducts);
app.get("/products/:id", productsMiddlewareIdExist, retrieveProducts);
app.delete("/products/:id", productsMiddlewareIdExist, deleteProducts);

app.listen(3000, () => {
  console.log("Server is running");
});
