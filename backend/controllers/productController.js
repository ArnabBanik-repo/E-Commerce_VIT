const Product = require("../models/product");

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("listedBy");
    res.status(200).json({
      status: "success",
      results: products.length,
      data: {
        products,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("listedBy");
    res.status(200).json({
      status: "success",
      data: { product },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "no such user exists",
    });
  }
};
exports.addProduct = async (req, res) => {
  try {
    const newProduct = await (
      await Product.create(req.body)
    ).populate("listedBy");
    res.status(200).json({
      status: "success",
      data: {
        product: newProduct,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: "success",
      data: {
        product: updatedProduct,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: { product },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
