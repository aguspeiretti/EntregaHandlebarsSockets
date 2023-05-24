import cartsModel from "../models/carts.js";
import productModel from "../models/products.js";

export default class CartsManager {
  getCarts = (params) => {
    return cartsModel.find(params).lean();
  };

  getCartById = (param) => {
    return cartsModel.findById(param);
  };

  createCart = (cart) => {
    return cartsModel.create(cart);
  };

  addProductToCart = async (cid, pid) => {
    const cart = await this.getCartById(cid);
    const productToAdd = await productModel.findById(pid);
    //ver si existe el carrito
    if (!cart) {
      console.log("el carrito no existe");
    }
    //ver si el producto existe
    if (!productToAdd) {
      console.log("el producto no existe");
    }
    console.log(cart.products, productToAdd._id);
    //ver si el producto esta en el carrito
    const isInCart = cart.products.find((p) => {
      p.products === productToAdd._id;
    });
    if (!isInCart) {
      cart.products.push({ product: pid, quantity: 1 });
    }
    cart.save();
  };

  deleteProductToCart = (cid, pid) => {};

  deleteCart = (cid) => {
    return cartsModel.findByIdAndDelete(cid);
  };
}
