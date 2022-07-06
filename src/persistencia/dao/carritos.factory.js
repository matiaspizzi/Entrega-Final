const MemoryDao = require('./carritos/carritos.dao.memory')
const MongoDao = require('./carritos/carritos.dao.mongo')
const SqliteDao = require('./carritos/carritos.dao.sqlite')

class CarritosFactoryDAO {
    static getPersistencia(database) {
        switch (database) {
            case 'memoria':
                return MemoryDao.getInstance()
            case 'mongo':
                return MongoDao.getInstance()
            case 'sqlite':
                return SqliteDao.getInstance()
            default:
                return MongoDao.getInstance()
        }
    }
}

module.exports = CarritosFactoryDAO;