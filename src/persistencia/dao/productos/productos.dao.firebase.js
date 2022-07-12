const config = require('../../../config.js')
const firebase = require("firebase-admin");
const logger = require('../../../utils/logger.utils.js')
const IDao = require('../IDao.js')


let productFirebaseInstance = null;

class ProductosFirebaseDAO extends IDao {
    constructor() {
        super()
        this.collection = firebase.firestore().collection(config.firebase.collections.productos)
    }

    static getInstance() {
        if (!productFirebaseInstance) {
            productFirebaseInstance = new ProductosFirebaseDAO()
        }
        return productFirebaseInstance;
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

    async save(elem) {
        try {
            const elems = await this.getAll()
            let newId;
            if (elems.length == 0) {
                newId = 1;
            } else {
                newId = elems[elems.length - 1].id + 1;
            }
            const newElem = { ...elem, timestamp: Date.now(), id: newId };
            await this.collection.doc(`${newId}`).set(newElem);
            return await this.getAll()
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

    async update(elem, id) {
        try {
            const newElem = { ...elem, timestamp: Date.now() }
            await this.collection.doc(id).update(newElem)
            return await this.getById(id);
        } catch (error) {
            logger.error(error)
            return error;
        }
    }

    async deleteAll() {
        try {
            const snapshot = await this.collection.get();
            snapshot.forEach((doc) => {
                this.collection.doc(doc.id).delete()
            });
            return await this.getAll();
        } catch (error) {
            logger.error(error)
            return error;
        }
    }
}

module.exports = ProductosFirebaseDAO;
