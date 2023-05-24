import { Router } from "express";
import ProductsManager from "../dao/mongo/managers/productManager.js";

const router = Router();

export default router;

const productsManager = new ProductsManager();

router.get("/", async (req, res) => {
  const products = await productsManager.getProducts();
  req.io.emit("updateProducts", products);
  res.send({ status: "succes", payload: products });
});

router.post("/", async (req, res) => {
  const { title, description, thumbnail, code, price, status, category } =
    req.body;

  if (
    !title ||
    !description ||
    !thumbnail ||
    !code ||
    !price ||
    !status ||
    !category
  )
    return res
      .status(400)
      .send({ status: "error", error: "Incomplete Values" });

  const product = {
    title,
    description,
    thumbnail,
    code,
    price,
    status,
    category,
  };

  const result = await productsManager.createProduct(product);
  const products = await productsManager.getProducts();
  req.io.emit("updateProducts", products);

  res.sendStatus(201);
});

router.get("/:pid", async (req, res) => {
  const { pid } = req.params;
  const products = await productsManager.getProductsById({ _id: pid });
  if (!products)
    res.status(404).send({ status: "error", error: "product not found" });
  res.send({ status: "succes", payload: products });
});

router.put("/:pid", async (req, res) => {
  const { pid } = req.params;

  const updateProduct = req.body;

  const result = await productsManager.updateproduct(pid, updateProduct);
  const products = await productsManager.getProducts();
  req.io.emit("updateProducts", products);

  res.sendStatus(201);
});

router.delete("/:pid", async (req, res) => {
  const { pid } = req.params;

  await productsManager.deleteCompany(cid);
  const products = await productsManager.getProducts();
  req.io.emit("updateProducts", products);

  res.sendStatus(410);
});
