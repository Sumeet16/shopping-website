const express = require('express');
const router = express.Router();
const productModel = require("../model/product.model");

router.post('/getProductById', async (req, res) => {
    const { id } = req.body;
    
    try {
        const products = await productModel.findOne({_id: id});
        return res.json({message: "products is sent! 🟢", product: products})
    } catch (error) {
        return res
        .status(401)
        .json({ message: "Some error occurred while fetching product! 🔴" });
    }
})

module.exports = router