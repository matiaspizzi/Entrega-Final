const mongoose = require("mongoose");
const carritoSchema = require("../../models/carrito.models");
const config = require("../../../config");
const logger = require("../../../utils/logger.utils");
const IDao = require('../IDao')

let carritoMongoInstance = null;

class CarritosMongoDAO extends IDao {
    constructor() {
        super()
        this.collection = mongoose.model(config.mongo.collectionCarritos, carritoSchema);
    }

    static getInstance() {
        if (!productMongoInstance) {
            carritoMongoInstance = new CarritosMongoDAO()
        }
        return carritoMongoInstance;
    }

    async create(userId) {
        try {
            const newElem = { productos: [], id: userId };
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
        try {
            if (prod) {
                for(let i = 0; i < cant; i++) {
                    await this.collection.updateOne(
                        { id: cartId },
                        { $push: { productos: prod } }
                    );
                }
                return await this.getById(cartId)
            }
        } catch (error) {
            logger.error(error)
            return error;
        }
    }

    async deleteProd(prod, cartId) {
        try {
            const cart = await this.getById(cartId)
            const index = cart.productos.findIndex(e => e.id == prod.id)
            if (index == -1) {
                return { error: `producto ${prod.id} no encontrado` }
            } else {
                await this.collection.updateOne(
                    { id: cartId },
                    [
                        {
                            $set: {
                                productos: {
                                    $let: {
                                        vars: { ix: { $indexOfArray: ["$productos", prod] } },
                                        in: {
                                            $cond: [{ $eq: ["$$ix", 0] }, {
                                                $concatArrays: [
                                                    { $slice: ["$productos", "$$ix"] },
                                                    { $slice: ["$productos", { $add: [1, "$$ix"] }, { $size: "$productos" }] }
                                                ]
                                            },
                                            {
                                                $concatArrays: [
                                                    { $slice: ["$productos", 0, "$$ix"] },
                                                    { $slice: ["$productos", { $add: [1, "$$ix"] }, { $size: "$productos" }] }
                                                ]
                                            }
                                            ]
                                        }
                                    }
                                }
                            }
                        }
                    ])
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
            else return { error: `carrito ${id} no encontrado` }
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
            } else {
                return { error: `carrito ${id} no encontrado` }
            }
        } catch (error) {
            logger.error(error)
            return error;
        }
    }
}

module.exports = CarritosMongoDAO;