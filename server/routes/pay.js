const express = require("express");
const userModel = require("../model/user.model");
const router = express.Router();
const orderModel = require("../model/order.model");

router.post("/pay", async (req, res) => {
    let { element, item } = req.body;
    try {
        if (element === "Approve") {
            // adding product to user db
            const delteItem = await userModel.findOneAndUpdate({ username: item.userName }, { $pull: { porder : item.productId } });
            const user = await userModel.findOneAndUpdate({ username: item.userName }, { $push: { "corder": [item.productId] } });
            const status = await orderModel.findOneAndDelete({ _id: item._id })
            const order = await orderModel.find();

            return res.json({ message: "User is updated! 🟢", message: "Payment Successfull", orders: order })
        } else {
            const status = await orderModel.findOneAndDelete({ _id: item._id })
            const order = await orderModel.find();
            return res.json({ message: "Order Deleted 🟢", orders: order })
        }
    } catch (error) {
        console.log("Error: ", error);
        res.json({
            message: "Payment Failed",
            success: false
        })
    }
});


module.exports = router