const Post = require('../models/Post');

const router = require('express').Router();

router.post("/write", async (req, res) => {
    try {
        const post = new Post(req.body)
        const result = await post.save()
        res.send(result)
    } catch (err) {
        res.status(500).json(err);
    }
})

// Get Your Posts
router.get("/posts/:id", async (req, res) => {
    try {
        const posts = await Post.find({ authorID: req.params.id });
        if (posts.length > 0) {
            res.send(posts);
        } else {
            res.send({ result: "No posts found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ result: "Internal Server Error" });
    }
});

// Get Posts Not Belonging to User
router.get("/others/:id", async (req, res) => {
    try {
        const posts = await Post.find({ authorID: { $ne: req.params.id } });
        if (posts.length > 0) {
            res.send(posts);
        } else {
            res.send({ result: "No posts found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ result: "Internal Server Error" });
    }
});

//Get Single Post
router.get("/post/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.send(post);
    } catch (err) {
        res.status(500).json(err);
    }
})

// Delete the Post
router.delete("/post/:id", async (req, res) => {
    const result = await Post.findByIdAndDelete(req.params.id)
    res.send(result)
})

// Delete all Posts by authorID
router.delete("/posts/:id", async (req, res) => {
    try {
        const result = await Post.deleteMany({ authorID: req.params.id })
        if (result.deletedCount === 0) {
            res.send("No posts found to delete")
        } else {
            res.send(result)
        }
    } catch (error) {
        res.status(500).send("Error deleting posts: " + error.message)
    }
})

// Update the Post
router.put("/post/:id", async (req, res) => {
    const result = await Post.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    res.send(result)
})

module.exports = router