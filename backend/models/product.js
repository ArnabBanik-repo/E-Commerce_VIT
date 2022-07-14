const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
      required: true,
    },
    size: {
      type: String,
    },
    color: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    listedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
const Product = mongoose.model("Product", schema);
module.exports = Product;
