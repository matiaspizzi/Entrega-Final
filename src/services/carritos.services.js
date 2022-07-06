const config = require('../config')
const CarritosDAO = require('../persistencia/dao/carritos.factory').getPersistencia(config.persistencia)

const create = async (userId) => {
    return await CarritosDAO.create(userId)
}

const getAll = async () => {
    return await CarritosDAO.getAll()
}

const clearAll = async (cartId) => {
    return await CarritosDAO.clearAll(cartId)
}

const saveProd = async (prod, cartId, cant) => {
    return await CarritosDAO.saveProd(prod, cartId, cant)
}

const deleteProd = async (prod, cartId) => {
    return await CarritosDAO.deleteProd(prod, cartId)
}

const getById = async (id) => {
    return await CarritosDAO.getById(id)
}

const deleteById = async (id) => {
    return await CarritosDAO.deleteById(id)
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