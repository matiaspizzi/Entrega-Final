const express = require("express");
const router = express.Router();
const path = require('path')
const auth = require("../middlewares/auth.middlewares.js");

router.get('/perfil', auth, (_req, res) => {
    res.render(path.join(process.cwd(), '/src/views/perfil.ejs'))
})

module.exports = router