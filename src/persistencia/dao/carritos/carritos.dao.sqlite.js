const config = require('../../../config.js')
const knex = require('knex')(config.sqlite.productos)
const logger = require('../../../utils/logger.utils.js')
const IDao = require('../IDao.js')

let carritosSqliteInstance = null;

class CarritosSqliteDAO extends IDao {
    constructor() {
        super()
        this.tabla = 'carritos'

        knex.schema.dropTableIfExists(`${this.tabla}`)
            .then(() => {
                knex.schema.createTable(`${this.tabla}`, table => {
                    table.string('id').primary().notNullable()
                    table.specificType('productos', "ARRAY").notNullable()
                }).then(() => {
                    logger.info('Carts database table created')
                }).catch((error) => {
                    logger.error(error)
                    throw error
                })
            })
    }

    static getInstance() {
        if (!carritosSqliteInstance) {
            carritosSqliteInstance = new CarritosSqliteDAO()
        }
        return carritosSqliteInstance;
    }

    async create(userId) {
        try {
            const newCart = { productos: [], id: userId }
            await knex.insert(newCart).from(`${this.tabla}`)
            const [cart] = await knex.select('*').from(`${this.tabla}`).where('id', userId)
            return cart
        } catch (error) {
            logger.error(error)
            throw error
        }
    }

    async getAll() {
        try {
            return await knex.from(`${this.tabla}`).select("*")
        } catch (error) {
            logger.error(error)
            throw error
        }
    }

    async clearAll(cartId) {
        try {
            return await knex.from(`${this.tabla}`).where({ id: cartId }).update({
                productos: []
            })
        } catch (error) {
            logger.error(error)
            throw error
        }
    }

    async saveProd(prod, cartId) {
        try {
            const cart = await this.collection.getById(cartId);
            if (cart) {
                const newCart = { ...cart, productos: [...cart.productos, prod] }
                await knex.from(`${this.tabla}`).where({ id: cartId }).update(newCart)
            }
            return await this.getById(cartId)
        } catch (error) {
            logger.error(error)
            return error;
        }
    }

    async deleteProd(prod, cartId) {
        try {
            const cart = await this.collection.getById(cartId);
            if (cart) {
                const newCart = { ...cart, productos: cart.productos.filter(p => p.id !== prod.id) }
                await knex.from(`${this.tabla}`).where({ id: cartId }).update(newCart)
            }
            return await this.getById(cartId)
        } catch (error) {
            logger.error(error)
            return error;
        }
    }

    async getById(id) {
        try {
            return await knex.from(`${this.tabla}`).where({ id: id }).select()
        } catch (error) {
            logger.error(error)
            throw error
        }
    }

    async deleteById(id) {
        try {
            return await knex.from(`${this.tabla}`).where({ id: id }).del()
        } catch (error) {
            logger.error(error)
            throw error
        }
    }
}

module.exports = CarritosSqliteDAO