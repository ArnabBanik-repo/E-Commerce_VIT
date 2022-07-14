const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    block: {
      type: String,
      length: 1,
    },
    room: {
      type: Number,
    },
    phone: {
      type: String,
      length: 10,
    },
    interests: {
      type: [
        {
          type: mongoose.Schema.ObjectId,
          ref: "Product",
          required: true,
        },
      ],
    },
    listedItems: {
      type: [
        {
          type: mongoose.Schema.ObjectId,
          ref: "Product",
        },
      ],
    },
  },
  { timestamps: true }
);
schema.plugin(findOrCreate);
const User = mongoose.model("User", schema);
module.exports = User;
