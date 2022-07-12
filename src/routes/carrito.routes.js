const express = require("express");
const router = express.Router();
const path = require('path')
const auth = require("../middlewares/auth.middlewares.js");
const { mailerNewOrder } = require("../utils/nodemailer.utils.js");
const { twilioAdmin, twilioBuyer } = require("../utils/twilio.utils.js");

const productosController = require('../controllers/productos.controllers.js')
const carritosController = require('../controllers/carritos.controllers.js')

router.get('/carrito', auth, (_req, res) => {
    res.render(path.join(process.cwd(), '/src/views/carrito.ejs'))
})

router.post('/carrito/:prodId/add', auth, async (req, res) => {
    const prodId = req.params.prodId
    const cantidad = parseInt(req.body.cantidad)
    const { user } = req
    const producto = await productosController.getById(prodId)
    await carritosController.saveProd(producto, user.email, cantidad)
    res.redirect(`/home`)
})

router.post('/carrito/:prodId/delete', auth, async (req, res) => {
    const { user } = req
    const producto = await productosController.getById(req.params.prodId)
    await carritosController.deleteProd(producto, user.email)
    res.redirect(`/carrito`)
})

router.post('/carrito/checkout', auth, async (req, res) => {
    const carrito = await carritosController.getById(req.user.email);
    const productos = carrito.productos;
    await mailerNewOrder(productos, req.user);
    await twilioAdmin(req.user);
    await twilioBuyer(req.user.tel);
    await carritosController.deleteById(req.user.email);
    res.redirect(`/carrito`)
})

module.exports = router