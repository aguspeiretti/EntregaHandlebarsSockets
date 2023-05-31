import { Router } from "express";
import userModel from "../dao/mongo/models/user.js";

const router = Router();

router.post("/register", async (req, res) => {
  const result = userModel.create(req.body);
  res.send({ status: "succes", payload: result });
});

router.post("/login", async (req, res) => {
  //buscar el usuario
  const { email, password } = req.body;
  const user = await userModel.findOne({ email, password });
  console.log(user);
  if (!user) {
    return res
      .status(400)
      .send({ status: "error ", error: "usuario no encontrado" });
  }
  if (email === "adminCoder@coder.com" && password === "123456") {
    // si es el usuario administrador
    req.session.user = {
      name: "Coder Admin",
      email: user.email,
      role: "admin",
    };
  } else {
    // si es un usuario normal
    req.session.user = {
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      role: "usuario",
    };
  }
  res.send({ status: "succes" });
});
export default router;
