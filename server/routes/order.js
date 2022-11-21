const express = require("express");
const userModel = require("../model/user.model");
const router = express.Router();
const orderModel = require("../model/order.model");

router.post("/order", async (req, res) => {
    let { amount, productId, cproductTitle, userName, email } = req.body;
    const date = new Date();
    const dateTime = date.toLocaleString()
    try {
        // adding course to user db
        const newOrder = await orderModel.create({
            productId: productId,
            productName: cproductTitle,
            price: amount,
            time: dateTime,
            userName,
            email
        });

        const user = await userModel.findOneAndUpdate({ username: userName }, { $push: { "porder": [productId] } });

        return res.json({ message: "Payment Successfull", success: true })

    } catch (error) {
        console.log("Error: ", error);
        res.json({
            message: "Payment Failed",
            success: false
        })
    }
});


module.exports = router