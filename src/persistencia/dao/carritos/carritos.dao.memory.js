const IDao = require('../IDao')

let carritoMemoryInstance = null;

class CarritosMemoryDAO extends IDao {
    constructor(){
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
        const cart = this.carritos.find(carrito => carrito.id === cartId)
        if(cart == undefined) {
            this.create(cartId)
        }
        for(let i = 0; i < cant; i++) {
            const cart = this.carritos.find(carrito => carrito.id === cartId)
            cart.productos.push(prod)
        }
        return cart 
    }

    deleteProd(prod, cartId) {
        const cart = this.carritos.find(carrito => carrito.id === cartId)
        const index = cart.productos.indexOf(product => product.id == prod.id)
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