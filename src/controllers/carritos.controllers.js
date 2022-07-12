const carritosServices = require('../services/carritos.services')
const logger = require('../utils/logger.utils.js')

const create = async (userId) => {
    try {
        return await carritosServices.create(userId)
    } catch (error) {
        logger.error(error)
        throw error
    }
}

const getAll = async () => {
    try {
        return await carritosServices.getAll()
    } catch (error) {
        logger.error(error)
        throw error
    }
}

const getById = async (id) => {
    try {
        return await carritosServices.getById(id)
    } catch (error) {
        logger.error(error)
        throw error
    }
}

const clearAll = async (cartId) => {
    try {
        return await carritosServices.clearAll(cartId)
    } catch (error) {
        logger.error(error)
        throw error
    }
}

const saveProd = async (prod, cartId, cant) => {
    try {
        return await carritosServices.saveProd(prod, cartId, cant)
    } catch (error) {
        logger.error(error)
        throw error
    }
}

const deleteProd = async (prod, cartId) => {
    try {
        await carritosServices.deleteProd(prod, cartId)
    } catch (error) {
        logger.error(error)
        throw error
    }
}

const deleteById = async (id) => {
    try {
        await carritosServices.deleteById(id)
    } catch (error) {
        logger.error(error)
        throw error
    }
}

module.exports = {
    create,
    getAll,
    clearAll,
    saveProd,
    deleteProd,
    getById,
    deleteById,
}