const mensajesServices = require('../services/mensajes.services')
const logger = require('../utils/logger.utils.js')

const getAll = async () => {
    try {
        return await mensajesServices.getAll()
    } catch (error) {
        logger.error(error)
        throw error
    }
}

const save = async (message) => {
    try {
        return await mensajesServices.save(message)
    } catch (error) {
        logger.error(error)
        throw error
    }
}

const getById = async () => {
    try {
        return await mensajesServices.getById(req.params.id)
    } catch (error) {
        logger.error(error)
        throw error
    }
}

const deleteById = async (id) => {
    try {
        return await mensajesServices.deleteById(id)
    } catch (error) {
        logger.error(error)
        throw error
    }
}

const deleteAll = async () => {
    try {
        return await mensajesServices.deleteAll()
    } catch (error) {
        logger.error(error)
        throw error
    }
}

module.exports = {
    getAll,
    getById,
    save,
    deleteById,
    deleteAll
}