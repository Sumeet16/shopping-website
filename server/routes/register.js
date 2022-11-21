const express = require("express");
require("../db/conn");
const userModel = require("../model/user.model");
const admin = require("../model/admin.model")

const router = express.Router();


router.post("/registerUser", async (req, res) => {

    const { name, lname, username, email, password } = req.body;


    if (!username || !email || !password || !name || !lname) {
        return res.status(500).json({ error: "Please Enter all Fields" })
    }

    try {

        const fetchEmail = await userModel.findOne({ username: username });

        if (fetchEmail) {
            return res.status(500).json({ error: "User Already Registred" })
        } else {
            const add = new userModel({ name, lname, username, email, password });

            const result = await add.save();

            if (result) {
                res.status(200).json({ message: "User Regestered" });
            } else {
                res.status(422).json({ error: "Error Occurred in Adding" })
            }
        }
    } catch (err) {
        console.log(err);
    }
});

router.post("/addAdmin", async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(422).json({ error: "Please Fill All Required Feilds" })
    } else {
        const fetchAdmin = await admin.findOne({ username: username });

        if (fetchAdmin) {
            res.status(422).json({ error: "Admin Already Registered" });
        } else {
            const add = new admin({ username, email, password });

            const result = await add.save();

            if (result) {
                res.status(200).json({ message: "Admin Regestered" });
            } else {
                res.status(422).json({ error: "Error Occurred in Adding" })
            }
        }
    }
})

module.exports = router