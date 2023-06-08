import { Router } from "express";
import UserManager from "../dao/mongo/managers/users.js";
import passport from "passport";

const router = Router();

const userManager = new UserManager();

router.post(
  "/register",
  passport.authenticate("register", {
    failureRedirect: "registerFail",
  }),
  async (req, res) => {
    res.send({ status: "succes", messages: "registered" });
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
      email: req.user.email,
    };

    res.sendStatus(200);
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
  });
});

export default router;
