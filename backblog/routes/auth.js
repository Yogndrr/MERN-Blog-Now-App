const router = require('express').Router();
const bcrypt = require('bcrypt')

const User = require("../models/User")

router.post("/register", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(req.body.password, salt)

        let user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPass,
            profileDP: req.body.profileDP
        })

        let result = await user.save()
        result.password = undefined
        res.send(result)
    }
    catch (err) {
        res.status(500).json(err)
    }
})

router.post("/login", async (req, res) => {
    if (req.body.email && req.body.password) {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            const validated = await bcrypt.compare(req.body.password, user.password);
            if (validated) {
                user.password = undefined
                res.send(user)
            } else {
                res.send({ response: "Invalid password" });
            }
        } else {
            res.send({ response: "User not found" })
        }
    } else {
        res.send({ response: "Email and password are required" });
    }
})


module.exports = router