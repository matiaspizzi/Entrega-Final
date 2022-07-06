const IDao = require('../IDao')

let productMemoryInstance = null;

class ProductosMemoryDAO extends IDao {
    constructor(){
        super()
        this.products = []
    }

    static getInstance() {
        if (!productMemoryInstance) {
            productMemoryInstance = new ProductosMemoryDAO()
        }
        return productMemoryInstance;
    }

    getAll() {
        return this.products
    }

    save(data) {
        data.id = this.products.length + 1
        this.products.push(data)
        return this.products[this.products.length - 1]
    }
    
    getById(id) {
        const product = this.products.find(product => product.id == id)
        if(!product) { return { error: `Producto ${id} no encontrado` } }
        else { return product }
    }

    deleteById(id) {
        return this.products = this.products.filter(product => product.id != id)
    }

    update(data, id) {
        const index = this.products.findIndex(product => product.id == id)
        if (data.title) {this.products[index].title = data.title}
        if (data.price) {this.products[index].price = data.price}
        if (data.thumbnail) {this.products[index].thumbnail = data.thumbnail}
        return this.products[index]
    }

    deleteAll() {
        return this.products = []
    }
}

module.exports = ProductosMemoryDAO;