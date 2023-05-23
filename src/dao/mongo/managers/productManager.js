import productModel from "../models/products.js";

export default class ProductsManager {
  getProducts = (params) => {
    return productModel.find(params).lean();
  };

  getProductsBy = (params) => {
    return productModel.findOne(params).lean();
  };

  createProduct = (product) => {
    return productModel.create(product);
  };

  updateproduct = (id, product => {
    return productModel.findByIdAndUpdate(id, { $set: product });
  };

  deleteProduct = (id) => {
    return productModel.findByIdAndDelete(id);
  };
}
