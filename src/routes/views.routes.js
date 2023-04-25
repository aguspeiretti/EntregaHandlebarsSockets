import { Router } from "express";
import ProductsManager from "../../managers/productsManager.js";

const productsManager = new ProductsManager();

const products = productsManager.getProducts();

const router = Router();

export default router;

router.get("/", async (rec, res) => {
  const allProducts = await products;
  res.render("home", { allProducts });
});
