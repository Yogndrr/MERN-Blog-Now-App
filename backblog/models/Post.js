const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    photo: {
        type: String
    },
    author: {
        type: String,
        required: true
    },
    authorID: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("post", postSchema)