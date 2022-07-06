const MemoryDao = require('./productos/productos.dao.memory')
const MongoDao = require('./productos/productos.dao.mongo')
const FirebaseDao = require('./productos/productos.dao.firebase')

class ProductosFactoryDAO {
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

module.exports = ProductosFactoryDAO;