const express = require("express");
const router = express.Router();
const path = require('path')
const auth = require("../middlewares/auth.middlewares.js");

router.get('/carrito', auth, (req, res) => {
    res.render(path.join(process.cwd(), '/src/views/carrito.ejs'))
})

module.exports = router