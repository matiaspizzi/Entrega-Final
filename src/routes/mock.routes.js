const express = require("express");
const router = express.Router();

const { generarProductosFaker } = require("../utils/generadorMockProductos.utils.js");

router.get("/productos-test", (req, res) => {
    res.send(generarProductosFaker());
});

module.exports = router
