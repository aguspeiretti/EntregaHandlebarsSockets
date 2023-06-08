import { Router } from "express";
import passport from "passport";

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

// router.post(
//   "/login",
//   passport.authenticate("login", {
//     failureRedirect: "/api/sessions/loginFail",
//   }),
//   async (req, res) => {
//     req.session.user = {
//       name: req.user.name,
//       role: req.user.role,
//       email: req.user.email,
//     };

//     res.send({ status: "success", messages: "registered" });
//   }
// );
// router.get("/loginFail", (req, res) => {
//   console.log(req.session.messages);
//   res.status(400).send({ status: "error", error: req.session.messages });
// });

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

export default router;
