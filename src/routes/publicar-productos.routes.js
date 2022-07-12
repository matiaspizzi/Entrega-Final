const express = require("express");
const router = express.Router();
const path = require('path')
const auth = require("../middlewares/auth.middlewares.js");

router.get('/publicar-productos', auth, (_req, res) => {
    res.render(path.join(process.cwd(), '/src/views/publicar-productos.ejs'))
})

module.exports = router