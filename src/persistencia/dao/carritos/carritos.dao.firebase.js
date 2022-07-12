const firebase = require("firebase-admin");
const config = require('../../../config.js')
const logger = require('../../../utils/logger.utils.js')
const IDao = require('../IDao.js')

let carritosFirebaseInstance = null;

class CarritosFirebaseDAO extends IDao {
    constructor() {
        super()
        this.collection = firebase.firestore().collection(config.firebase.collections.carritos)
    }

    static getInstance() {
        if (!carritosFirebaseInstance) {
            carritosFirebaseInstance = new CarritosFirebaseDAO()
        }
        return carritosFirebaseInstance;
    }

    async create(userId) {
        try {
            const newElem = { productos: [], id: userId };
            await this.collection.doc(`${userId}`).set(newElem);
            return await this.getAll();
        } catch (error) {
            logger.error(error)
            return error;
        }
    }

    async getAll() {
        try {
            const result = [];
            const snapshot = await this.collection.get();
            snapshot.forEach((doc) => {
                result.push({ id: doc.id, ...doc.data() });
            });
            return result;
        } catch (error) {
            logger.error(error)
            return error;
        }
    }

    async clearAll() {
        try {
            const cart = await this.getById(cartId)
            cart.productos = []
            await this.collection.doc(cartId).update(cart)
            return await this.getById(cartId)
        } catch (error) {
            logger.error(error)
            return error;
        }
    }

    async saveProd(prod, cartId, cant) {
        try {
            let cart = await this.getById(cartId)
            if (!cart) await this.create(cartId)
            cart = await this.getById(cartId)
            const newProd = {
                id: prod.id,
                title: prod.title,
                price: prod.price,
                cantidad: cant,
                thumbnail: prod.thumbnail
            }
            const prodIndex = cart.productos.findIndex(p => p.id === prod.id)
            if (prodIndex !== -1) cart.productos[prodIndex].cantidad += cant
            else cart.productos.push(newProd)

            await this.collection.doc(cartId).update(cart)
            return await this.getById(cartId)
        } catch (error) {
            logger.error(error)
            return error;
        }
    }

    async deleteProd(prod, cartId) {
        try {
            const cart = await this.getById(cartId)
            if (cart.id) {
                const prodIndex = cart.productos.findIndex(p => p.id === prod.id)
                if (prodIndex !== -1) {
                    cart.productos.splice(prodIndex, 1)
                    const newCart = { ...cart, timestamp: Date.now() }
                    await this.collection.doc(cartId).update(newCart)
                    return await this.getById(cartId)
                }
            }
        } catch (error) {
            logger.error(error)
            return error;
        }
    }

    async getById(id) {
        try {
            const doc = await this.collection.doc(id).get();
            const data = doc.data();
            if (data) return data
        } catch (error) {
            logger.error(error)
            return error;
        }
    }

    async deleteById(id) {
        try {
            const data = await this.getById(id)
            if (data.id) {
                await this.collection.doc(id).delete()
                return await this.getAll();
            } else return data
        } catch (error) {
            logger.error(error)
            return error;
        }
    }
}

module.exports = CarritosFirebaseDAO