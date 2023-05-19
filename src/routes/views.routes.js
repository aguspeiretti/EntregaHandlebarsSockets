import { Router } from "express";
import ProductsManager from "../dao/mongo/managers/productManager.js";

const router = Router();

const productsManager = new ProductsManager();

router.get("/", async (req, res) => {
  const products = await productsManager.getProducts();
  res.render("home", { products, css: "products" });
});

router.get("/realTimeProducts", async (req, res) => {
  res.render("realTimeProducts", { css: "realTimeProducts" });
});

router.get("/chat", async (req, res) => {
  res.render("chat");
});

export default router;
