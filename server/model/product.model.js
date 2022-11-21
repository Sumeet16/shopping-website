const mongoose = require("mongoose");
const userModel = require("./user.model");

const productScheme = new mongoose.Schema({
    title: {
        required: true,
        type: String,
    },
    price: {
        required: true,
        type: Number,
    },
    description: {
        required: true,
        type: String,
    },
    productImage: {
        required: true,
        type: String,
    },
});

const productModel = new mongoose.model("PRODUCT", productScheme);

module.exports = productModel;