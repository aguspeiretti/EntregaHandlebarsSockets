import { Router } from "express";
import passport from "passport";
import UserManager from "../dao/mongo/managers/users.js";
import { createHash, validatePassword } from "../utils.js";

const userManager = new UserManager();

const router = Router();

router.post(
  "/register",
  passport.authenticate("register", {
    failureRedirect: "registerFail",
  }),
  async (req, res) => {
    try {
      res.send({ status: "success", messages: "registered" });
    } catch (error) {
      console.log(error);
    }
  }
);

router.get("/registerFail", (req, res) => {
  console.log(req.session.messages);
  res.status(400).send({ status: "error", error: req.session.messages });
});

router.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/api/sessions/loginFail",
  }),
  async (req, res) => {
    req.session.user = {
      name: req.user.name,
      role: req.user.role,
      id: req.user.id,
      email: req.user.email,
    };
    return res.send({ status: "success", messages: "registered" });
  }
);
router.get("/loginFail", (req, res) => {
  console.log(req.session.messages);
  res.status(400).send({ status: "error", error: req.session.messages });
});

router.post("/logout", (req, res) => {
  // Destruye la sesión
  req.session.destroy((err) => {
    if (err) {
      console.error("Error al destruir la sesión:", err);
      return res
        .status(500)
        .send({ status: "error", error: "Error al cerrar sesión" });
    }

    res.send({ status: "success", message: "Sesión cerrada correctamente" });
  });
});

router.post("/restorePassword", async (req, res) => {
  const { email, password } = req.body;

  const user = await userManager.getUsersBy({ email });
  console.log(user);
  if (!user)
    return res
      .status(400)
      .send({ status: "error", error: "Usuario no encontrado" });
  const isSamePassword = await validatePassword(password, user.password);
  console.log(password);
  if (isSamePassword)
    return res.status(400).send({
      status: "error",
      error: "Error al remplazar el password no puede ser la misma",
    });
  const newHassedPassword = await createHash(password);
  try {
    await userManager.updateOne(
      { email },
      { $set: { password: newHassedPassword } }
    );
    console.log(email, newHassedPassword);
  } catch (error) {
    console.log(error);
  }

  return res.send({ status: "success", messages: "reestablecida" });
});
export default router;
