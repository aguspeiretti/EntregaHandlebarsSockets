import express from "express";
import ProductsRouter from "./routes/products.router.js";
import CartsRouter from "./routes/carts.routes.js";
import __dirname from "./utils.js";
import viewsRouter from "./routes/views.routes.js";
import handlebars from "express-handlebars";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/products", ProductsRouter);
app.use("/api/carts", CartsRouter);

app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");
app.use(express.static(`${__dirname}/public`));
app.use("/", viewsRouter);

app.listen(8080, () => {
  console.log("listening..");
});
