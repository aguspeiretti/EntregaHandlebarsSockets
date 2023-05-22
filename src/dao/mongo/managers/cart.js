import cartsModel from "../models/carts.js";

export default class CartsManager {
  getCarts = (params) => {
    return cartsModel.find(params).lean();
  };

  getCartsBy = (params) => {
    return cartsModel.findOne(params).lean();
  };

  createCart = (company) => {
    return cartsModel.create(company);
  };

  updateCart = (id, company) => {
    return cartsModel.findByIdAndUpdate(id, { $set: company });
  };

  deleteCart = (id) => {
    return cartsModel.findByIdAndDelete(id);
  };
}
