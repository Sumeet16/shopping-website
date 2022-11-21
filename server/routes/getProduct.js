const express = require('express');
const router = express.Router();
const productModel = require("../model/product.model");

router.get('/getProduct', async (req, res) => {
    try {
        const products = await productModel.find();
        return res.json({message: "All product are sent! 🟢", product: products})
    } catch (error) {
        return res
        .status(401)
        .json({ message: "Some error occurred while fetching product! 🔴" });
    }
})

module.exports = router