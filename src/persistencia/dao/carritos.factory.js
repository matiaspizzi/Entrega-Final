const MemoryDao = require('./carritos/carritos.dao.memory')
const MongoDao = require('./carritos/carritos.dao.mongo')
const FirebaseDao = require('./carritos/carritos.dao.firebase')

class CarritosFactoryDAO {
    static getPersistencia(database) {
        switch (database) {
            case 'memoria':
                return MemoryDao.getInstance()
            case 'mongo':
                return MongoDao.getInstance()
            case 'firebase':
                return FirebaseDao.getInstance()
            default:
                return MongoDao.getInstance()
        }
    }
}

module.exports = CarritosFactoryDAO;