const IDao = require('../IDao')

let carritoMemoryInstance = null;

class CarritosMemoryDAO extends IDao {
    constructor() {
        super()
        this.carritos = []
    }

    static getInstance() {
        if (!carritoMemoryInstance) {
            carritoMemoryInstance = new CarritosMemoryDAO()
        }
        return carritoMemoryInstance;
    }

    create(userId) {
        const newElem = { productos: [], id: userId };
        this.carritos.push(newElem)
        return this.carritos[this.carritos.length - 1]
    }

    getAll() {
        return this.carritos
    }

    clearAll(cartId) {
        const cart = this.carritos.find(carrito => carrito.id === cartId)
        cart.productos = []
        return cart
    }

    saveProd(prod, cartId, cant) {
        let cart = this.carritos.find(cart => cart.id === cartId)
        if (!cart) {
            this.create(cartId)
            cart = this.carritos.find(cart => cart.id === cartId)
        }
        const newProd = {
            id: prod.id,
            title: prod.title,
            cantidad: cant,
            thumbnail: prod.thumbnail,
            price: prod.price
        }
        const prodExists = cart.productos.find(product => product.id === prod.id)
        if (prodExists) prodExists.cantidad += cant
        else cart.productos.push(newProd)
        return cart
    }

    deleteProd(prod, cartId) {
        const cart = this.carritos.find(carrito => carrito.id === cartId)
        const index = cart.productos.indexOf(product => product === prod)
        cart.productos.splice(index, 1)
        return cart
    }

    getById(id) {
        const cart = this.carritos.find(cart => cart.id == id)
        if (cart) return cart
    }

    deleteById(id) {
        return this.carritos = this.carritos.filter(product => product.id != id)
    }
}

module.exports = CarritosMemoryDAO;