const express = require('express');
const router = express.Router();
const productModel = require("../model/product.model");

router.post('/deleteProduct', async (req, res) => {
    const { id } = req.body;

    try {
        const status = await productModel.findOneAndDelete({_id: id})
        return res.json({ message: "Product Deleted 🟢", status: status })
    } catch (error) {
        return res
            .status(401)
            .json({ message: "Some error occurred while fetching product! 🔴" });
    }
})

module.exports = router