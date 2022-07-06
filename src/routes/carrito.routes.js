const express = require("express");
const router = express.Router();
const path = require('path')
const auth = require("../middlewares/auth.middlewares.js");

const productosController = require('../controllers/productos.controllers.js')
const carritosController = require('../controllers/carritos.controllers.js')

router.get('/carrito', auth, (_req, res) => {
    res.render(path.join(process.cwd(), '/src/views/carrito.ejs'))
})

router.post('/carrito/:prodId', auth, async (req, res) => {
    const prodId = req.params.prodId
    let { cantidad } = req.body
    cantidad = 1
    const { user } = req
    const producto = await productosController.getById(prodId)
    const resp = await carritosController.saveProd(producto[0], user.id,  cantidad)
})   

module.exports = router