const mongoose = require("mongoose");
const carritoSchema = require("../../models/carrito.models");
const config = require("../../../config");
const logger = require("../../../utils/logger.utils");
const IDao = require('../IDao')

let carritoMongoInstance = null;

class CarritosMongoDAO extends IDao {
    constructor() {
        super()
        this.collection = mongoose.model(config.mongo.collections.carritos, carritoSchema);
    }

    static getInstance() {
        if (!carritoMongoInstance) {
            carritoMongoInstance = new CarritosMongoDAO()
        }
        return carritoMongoInstance;
    }

    async create(cartId) {
        try {
            const newElem = { productos: [], id: cartId };
            const elem = await this.collection(newElem);
            await elem.save();
            return await this.getAll();
        } catch (error) {
            logger.error(error)
            return error;
        }
    }

    async getAll() {
        try {
            const contenido = await this.collection.find();
            return contenido;
        } catch (error) {
            logger.error(error)
            return error;
        }
    }

    async clearAll(cartId) {
        try {
            await this.collection.updateOne(
                { id: cartId }, { $set: { productos: [] } }
            )
            return await this.getById(cartId)
        } catch (error) {
            logger.error(error)
            return error
        }
    }

    async saveProd(prod, cartId, cant) {
        const cart = await this.getById(cartId)
        const newProd = {
            id: prod.id,
            title: prod.title,
            price: prod.price,
            cantidad: cant,
            thumbnail: prod.thumbnail
        }
        if (!cart) await this.create(cartId)
        try {
            if (prod.id) {
                const index = cart.productos.findIndex(e => e.id == prod.id)
                if (index > -1) cart.productos[index].cantidad += cant
                else cart.productos.push(newProd)
            }
            await this.collection.updateOne(
                { id: cartId }, { $set: { productos: cart.productos } }
            )
            return await this.getById(cartId)
        }
        catch (error) {
            logger.error(error)
            return error;
        }
    }

    async deleteProd(prod, cartId) {
        try {
            const cart = await this.getById(cartId)
            const index = cart.productos.findIndex(e => e.id == prod.id)
            if (index > -1) {
                cart.productos.splice(index, 1)
                await this.collection.updateOne({ id: cartId }, { $set: { productos: cart.productos } })
                return await this.getById(cartId)
            }
        } catch (error) {
            logger.error(error)
            return error
        }
    }

    async getById(id) {
        try {
            const elem = await this.collection.find({ id: id });
            if (elem[0]) {
                return elem[0]
            }
        } catch (error) {
            logger.error(error)
            return error;
        }
    }

    async deleteById(id) {
        try {
            const cart = await this.getById(id)
            if (cart.id) {
                await this.collection.deleteOne(cart);
                return await this.getAll()
            }
        } catch (error) {
            logger.error(error)
            return error;
        }
    }
}

module.exports = CarritosMongoDAO;