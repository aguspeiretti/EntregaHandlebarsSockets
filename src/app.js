import express from "express";
import ProductsRouter from "./routes/products.mongoose.router.js";
import CartsRouter from "./routes/carts.routes.js";
import __dirname from "./utils.js";
import viewsRouter from "./routes/views.routes.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import ProductsManager from "../managers/productsManager.js";
import mongoose from "mongoose";

const app = express();
const connection = mongoose.connect(
  "mongodb+srv://aguspeiretti:123@agusdb.7mmevwy.mongodb.net/ecommers?retryWrites=true&w=majority"
);
const server = app.listen(8080, () => console.log("escuchando"));
const io = new Server(server);
app.use((req, res, next) => {
  req.io = io;
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/products", ProductsRouter);
app.use("/api/carts", CartsRouter);

app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");
app.use(express.static(`${__dirname}/public`));

app.use("/", viewsRouter);

io.on("connection", async (socket) => {
  console.log("nuevo cliente conectado");

  const productManager = new ProductsManager();
  const products = await productManager.getProducts();
  socket.emit("updateProducts", products);
});
