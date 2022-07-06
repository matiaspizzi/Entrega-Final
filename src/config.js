require('dotenv').config()
const MongoStore = require('connect-mongo')
const mongoose = require('mongoose')
const yargs = require('yargs/yargs')(process.argv.slice(2))
const os = require('os')
const logger = require('./utils/logger.utils.js')

const argv = yargs
.alias({
    p: 'port',
    m: 'mode',
    db: 'database'
})
.default({
  port: process.env.PORT,
  mode: 'fork', // 'fork' o 'cluster',
  database: 'memoria' // 'memoria', 'mongo' o 'sqlite'
})
 .argv

const config = {
    yarg: argv,
    port: argv.port,
    modo: argv.mode,
    persistencia: argv.database,
    cantProcesadores: os.cpus().length,
    mongo: {
        url: process.env.MONGO_ATLAS_URL,
        database: "tercer_entrega",
        collectionNameUsers: "users",
        collectionNameCarritos: "carritos",
        collectionNameProductos: "productos",
        collectionNameMensajes: "mensajes",
    },
    session: {
        store: MongoStore.create({ mongoUrl: `${process.env.MONGO_ATLAS_URL}`}),
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 600000,
        },
    },
    sqlite: {
        productos:{
            client: 'sqlite3',
            connection: {
                filename: `${__dirname}/DB/productos.sqlite`
            },
            useNullAsDefault: true
        },
        mensajes:{
            client: 'sqlite3',
            connection: {
                filename: `${__dirname}/DB/mensajes.sqlite`
            },
            useNullAsDefault: true
        }
    },
}

mongoose.connect(config.mongo.url, {})
    .then(logger.info('Mongo Atlas conectado'))
    .catch(err => logger.error(err))

module.exports = config