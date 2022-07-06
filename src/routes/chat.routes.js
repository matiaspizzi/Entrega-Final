const express = require("express");
const router = express.Router();
const path = require('path')
const auth = require("../middlewares/auth.middlewares.js");

router.get('/chat', auth, (req, res) => {
    const user = req.user
    res.render(path.join(process.cwd(), '/src/views/chat.ejs'), { user })
})

module.exports = router