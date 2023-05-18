import productModel from "../models/products.js";

export default class ProductsManager {
  getProducts = (params) => {
    console.log("hola desde monguito");
    return productModel.find(params).lean();
  };

  getProductsBy = (params) => {
    return productModel.findOne(params).lean();
  };

  createProduct = (company) => {
    return productModel.create(company);
  };

  updateproduct = (id, company) => {
    return productModel.findByIdAndUpdate(id, { $set: company });
  };

  deleteCompany = (id) => {
    return productModel.findByIdAndDelete(id);
  };
}