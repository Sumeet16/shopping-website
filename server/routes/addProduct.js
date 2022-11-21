const express = require("express");
const productModel = require("../model/product.model");
const router = express.Router();

router.post("/addProduct", async (req, res) => {
  const { title, price, description, productImage } = req.body;
  try {
    if (!title || !description || !price || !productImage) {
      res
        .status(422)
        .json({ message: "Please fill out all the details! 🔴 " });
    }
    const product = await productModel.findOne({ title });
    if (product) {
      return res.status(409).json({ message: "A similar product exists! 🔴 " });
    }
    const newproduct = await productModel.create({
      title,
      price,
      description,
      productImage,
    });
    if (!newproduct) {
      res.json({
        message: "Some error occurred while adding a new product! 🔴 ",
      });
    }
    res.status(201).json({ message: "product added! 🟢" });
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Some error occurred while adding products! 🔴 " });
  }
});




module.exports = router