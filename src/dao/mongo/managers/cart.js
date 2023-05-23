import cartsModel from "../models/carts.js";
import productModel from "../models/products.js";

export default class CartsManager {
  getCarts = (params) => {
    return cartsModel.find(params).lean();
  };

  getCartById = (param) => {
    console.log("hola", param);
    return cartsModel.findById(param);
  };

  createCart = (product) => {
    return cartsModel.create(product);
  };

  addProductToCart = (cid, pid) => {
    //verifico si existe el carrito
    const cart = cartsModel.findById(cid);
    if (!cart) {
      console.log("ese carrito no existe");
    }
    //si esta el produc sumo uno al quantity
    console.log(cart);
    const productIsInCart = cart.products.find(
      (product) => product.product.toString() === pid
    );
    if (productIsInCart) {
      productIsInCart.quantity += 1;
    } else {
      cart.products.push({ product: pid });
    }

    //actualizo el total amount del carrito
    const product = productModel.findById(pid);
    cart.totalAmount += product.price;

    //ahora gusrdo todo esto en el carrito con save
    cart.save();
    return cart;
  };

  deleteProductToCart = (cid, pid) => {
    const cart = cartsModel.findById(cid);
    if (!cart) {
      console.log("carrito no encontrado");
    }

    const productIndex = cart.products.findIndex((p) => {
      p.product.toString() === pid;
    });
    if (productIndex === -1) {
      console.log("Este Producto no esta en el carrito");
    }
    //ahora le resto el precio al totalAmount:

    const product = productModel.findById(pid);
    cart.totalAmount -= product.price * cart.products[productIndex].quantity;
    //borro el profucto del carrito:
    cart.products.splice(productIndex, 1);
    //guardo los cambios del carrito:
    cart.save();
    return cart;
  };

  deleteCart = (cid) => {
    return cartsModel.findByIdAndDelete(cid);
  };
}
