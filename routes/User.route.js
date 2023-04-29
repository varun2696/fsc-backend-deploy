const express = require('express');
const { UserModel } = require('../model/User.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userRouter = express.Router();


userRouter.post("/register", (req, res) => {
    const { email, pass, name, age } = req.body
    try {
        bcrypt.hash(pass, 4, async (err, hash) => {
            // Store hash in your password DB.
            if (err) {
                res.status(400).send({ "err": err.message })
            }
            else {
                const user = new UserModel({ email, name, age, pass: hash })
                await user.save();
                res.status(200).send({ msg: "User registerd successfully." })
            }
        });

    } catch (error) {
        res.status(400).send({ "err": error.message })
    }
})



userRouter.post("/login", async (req, res) => {
    const { email, pass } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        // console.log(user);
        if (user) {
            bcrypt.compare(pass, user.pass, (err, result) => {
                // result == true
                if (result) {
                    const token = jwt.sign({ author:user.name, authorId: user._id }, 'masai474');
                    res.status(200).send({ msg: "Login succesful!!", token: token })
                }
                else {
                    res.status(200).send({ msg: "Wrong credentials" })
                }
            });
        }
        else {
            res.status(200).send({ msg: "Wrong credentials" })
        }

    }
    catch (error) {
        res.status(400).send({ "err": error.message })
    }

})



module.exports = {
    userRouter
}