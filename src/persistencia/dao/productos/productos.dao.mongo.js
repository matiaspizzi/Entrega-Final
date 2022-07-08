const mongoose = require("mongoose");
const productoSchema = require("../../models/producto.models.js");
const config = require("../../../config");
const IDao = require('../IDao')
const logger = require("../../../utils/logger.utils");

let productMongoInstance = null;

class ProductosMongoDAO extends IDao {
    constructor() {
        super()
        this.collection = mongoose.model(config.mongo.collections.productos, productoSchema);
    }

    static getInstance() {
        if (!productMongoInstance) {
            productMongoInstance = new ProductosMongoDAO()
        }
        return productMongoInstance;
    }

    async save(elem) {
        try {
            const elementos = await this.getAll()
            let newId;
            if (elementos.length == 0) {
                newId = 1;
            } else {
                newId = elementos[elementos.length - 1].id + 1;
            }
            const newElem = { ...elem, id: newId };
            const prodm = await this.collection(newElem);
            await prodm.save();
            return await this.getAll()
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

    async getById(id) {
        try {
            const elem = await this.collection.find({ id: id });
            if (elem[0]) return elem[0]
        } catch (error) {
            logger.error(error)
            return error;
        }
    }

    async update(elem, id) {
        try {
            await this.collection.updateOne({ id: id }, elem)
            return await this.getById(id);
        } catch (error) {
            logger.error(error)
            return error;
        }
    }

    async deleteById(id) {
        try {
            return await this.collection.deleteOne({ id: id });
        } catch (error) {
            logger.error(error)
            return error;
        }
    }

    async deleteAll() {
        try {
            await this.collection.deleteMany();
            return await this.getAll()
        } catch (error) {
            logger.error(error)
            return error;
        }
    }
}

module.exports = ProductosMongoDAO;