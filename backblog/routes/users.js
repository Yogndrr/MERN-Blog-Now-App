const User = require('../models/User')
const bcrypt = require('bcrypt');
const router = require('express').Router()

router.get("/user/:id", async (req, res) => {
    let result = await User.findById(req.params.id)
    res.send(result)
})

router.put("/user/:id", async (req, res) => {
    if (req.body.password) {
        const salt = await bcrypt.genSalt(10)
        res.body.password = await bcrypt.hash(res.body.password, salt)
    }
    const result = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    res.send(result)
})

router.delete("/user/:id", async (req, res) => {
    const result = await User.findByIdAndDelete(req.params.id)
    res.send(result)
})

module.exports = router