import cartsModel from "../models/carts.js";

export default class CartsManager {
  getCarts = (params) => {
    return cartsModel.find(params).lean();
  };

  getCartsBy = (params) => {
    return cartsModel.findOne(params).lean();
  };

  createCart = (product) => {
    return cartsModel.create(product);
  };

  addProductToCart = () => {};

  updateCart = (id, products) => {
    return cartsModel.findByIdAndUpdate(id, { $set: { products } });
  };

  deleteCart = (id) => {
    return cartsModel.findByIdAndDelete(id);
  };
}
