import { Router } from "express";
import CartsManager from "../dao/mongo/managers/cart.js";

const router = Router();

export default router;

const cartsManager = new CartsManager();

router.get("/", async (req, res) => {
  const carts = await cartsManager.getCarts();
  res.send(carts);
});
router.post("/", async (req, res) => {
  try {
    cartsManager.createCart();
    res.send("cart created");
  } catch (error) {
    console.log(error);
    return res.status(404).send({ status: "error", error: "cart not created" });
  }
});

router.get("/:cid", async (req, res) => {});

router.put("/:cid", async (req, res) => {});

router.delete("/:cid", async (req, res) => {
  const { cid } = req.params;
  await cartsManager.deleteCart(cid);
  const carts = await cartsManager.getCarts();
  res.sendStatus(410);
});
