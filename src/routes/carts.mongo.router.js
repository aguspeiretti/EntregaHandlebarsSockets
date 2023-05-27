import { Router } from "express";
import CartsManager from "../dao/mongo/managers/cart.js";

const router = Router();

export default router;

const cartsManager = new CartsManager();

router.get("/", async (req, res) => {
  const carts = await cartsManager.getCarts();
  res.send(carts);
});

router.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const carts = await cartsManager.getCartById({ _id: cid });
    if (!carts)
      res.status(404).send({ status: "error", error: "product not found" });
    res.send({ status: "succes", payload: carts });
  } catch (err) {
    console.log(err);
  }
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
router.post("/:cid/:pid", async (req, res) => {
  try {
    const { cid } = req.params;
    const { pid } = req.params;
    const addProductCart = await cartsManager.addProductToCart(cid, pid);
    res.send({ status: "succes", payload: addProductCart });
  } catch (err) {
    console.log(err);
  }
});

router.put("/:cid/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const newQuantity = req.body.quantity;

  try {
    const cart = await cartsManager.getCarts({ _id: cid });

    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }

    const productIndex = cart.products.findIndex(
      (product) => product._id.toString() === pid
    );

    if (productIndex === -1) {
      return res
        .status(404)
        .json({ error: "Producto no encontrado en el carrito" });
    }

    cart.products[productIndex].quantity = newQuantity;

    const updatedCart = await cartsManager.updateCart(cid, cart);

    return res.json(updatedCart);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.delete("/:cid/products/:pid", async (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const deletedProductCart = await cartsManager.deleteProductToCart(cid, pid);
    res.send({ status: "succes", payload: deletedProductCart });
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const deletedCart = await cartsManager.deleteCart(cid);
    res.send({ status: "success", payload: deletedCart });
  } catch (err) {
    console.log(err);
  }
});
