require('dotenv').config()
const MongoStore = require('connect-mongo')
const mongoose = require('mongoose')
const firebase = require('firebase-admin')
const os = require('os')
const logger = require('./utils/logger.utils.js')
const argv = require('./utils/yargs.utils.js')

const config = {
    yarg: argv,
    port: argv.port,
    modo: argv.mode,
    persistencia: argv.db,
    cantProcesadores: os.cpus().length,
    mongo: {
        url: process.env.MONGO_ATLAS_URL,
        database: "tercer_entrega",
        collections: {
            users: "users",
            carritos: "carritos",
            productos: "productos",
            mensajes: "mensajes",
        }
    },
    session: {
        store: MongoStore.create({ mongoUrl: `${process.env.MONGO_ATLAS_URL}` }),
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 600000,
        },
    },
    firebase: {
        collections: {
            carritos: 'carritos',
            productos: 'productos',
            mensajes: 'mensajes'
        },
        config: {
            type: process.env.FIREBASE_TYPE,
            project_id: process.env.FIREBASE_PROJECT_ID,
            private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
            private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
            client_email: process.env.FIREBASE_CLIENT_EMAIL,
            client_id: process.env.FIREBASE_CLIENT_ID,
            auth_uri: process.env.FIREBASE_AUTH_URI,
            token_uri: process.env.FIREBASE_TOKEN_URI,
            auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
            client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL
        }
    }
}

mongoose.connect(config.mongo.url, {})
    .then(logger.info('Mongo Atlas conectado'))
    .catch(err => logger.error(err))

if (config.persistencia == 'firebase') {
    firebase.initializeApp({
        credential: firebase.credential.cert(config.firebase.config)
    });
}

module.exports = config