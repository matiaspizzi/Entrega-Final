const MemoryDao = require('./mensajes/mensajes.dao.memory')
const MongoDao = require('./mensajes/mensajes.dao.mongo')
const FirebaseDao = require('./mensajes/mensajes.dao.firebase')

class MensajesFactoryDAO {
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

module.exports = MensajesFactoryDAO;