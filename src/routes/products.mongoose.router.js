import { Router } from "express";
import ProductsManager from "../dao/mongo/managers/productManager.js";

const router = Router();

export default router;

const productsManager = new ProductsManager();

router.get("/", async (req, res) => {
  const products = await productsManager.getProducts();
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

  const company = {
    title,
    description,
    thumbnail,
    code,
    price,
    status,
    category,
  };

  const result = await companiesService.createCompany(company);

  res.sendStatus(201);
});

router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  const products = await productsManager.getProductsBy({ _id: cid });
  if (!products)
    res.status(404).send({ status: "error", error: "product not found" });
  res.send({ status: "succes", payload: products });
});

router.put("/:cid", async (req, res) => {
  const { cid } = req.params;

  const updateProduct = req.body;

  const result = await productsManager.updateproduct(cid, updateProduct);

  res.sendStatus(201);
});

router.delete("/:cid", async (req, res) => {
  const { cid } = req.params;

  await productsManager.deleteCompany(cid);

  res.sendStatus(201);
});
