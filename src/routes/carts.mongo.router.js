import { Router } from "express";
import CartsManager from "../dao/mongo/managers/cart.js";

const router = Router();

export default router;

const cartsManager = new CartsManager();

router.get("/", async (req, res) => {});
router.post("/", async (req, res) => {});
router.get("/:cid", async (req, res) => {});
router.put("/:cid", async (req, res) => {});
router.delete("/:cid", async (req, res) => {});
