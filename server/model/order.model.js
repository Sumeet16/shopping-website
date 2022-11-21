const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  productId: {
    required: true,
    type: String,
  },
  productName: {
    required: true,
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});

const oderModel = new mongoose.model("ORDER", orderSchema);

module.exports = oderModel;