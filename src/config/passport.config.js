import passport from "passport";
import local from "passport-local";
import UserManager from "../dao/mongo/managers/users.js";
import { createHash, validatePassword } from "../utils.js";

const userManager = new UserManager();

const LocalStrategy = local.Strategy;

const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, email, password, done) => {
        const { first_name, last_name } = req.body;
        const exist = await userManager.getUsersBy({ email });
        if (exist) {
          return done(null, false, { messages: "el usuario ya existe" });
        }
        const hashedPassword = await createHash(password);
        const user = {
          first_name,
          last_name,
          email,
          password: hashedPassword,
        };
        const result = userManager.createUsers(user);

        done(null, result);
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        //buscar el usuario

        if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
          // si es el usuario administrador
          user = {
            name: "Coder Admin",
            email: "...",
            role: "admin",
          };
          return done(null, user);
        }
        let user;
        user = await userManager.getUsersBy({ email });
        if (!user) return res;
        done(null, false, { message: "credenciales incorrectas" });

        const isValidPassword = await validatePassword(password, user.password);

        if (!isValidPassword) return res;
        done(null, false, { message: "clave invalida" });

        user = {
          name: `${user.first_name} ${user.last_name}`,
          email: user.email,
          role: "user",
        };
        return done(null, user);
      }
    )
  );
  passport.serializeUser(function (user, done) {
    return null, user.id;
  });
  passport.deserializeUser(async function (id, done) {
    const user = await userManager.getUsersBy({ _id: id });
  });
};

export default initializePassport;
