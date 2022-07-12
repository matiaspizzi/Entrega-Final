const session = require('express-session')
const config = require('../config.js')

// Este middleware se utiliza para que el socket.io pueda acceder a las variables de sesión
// this middleware is used to make the socket.io to access the session variables

const sessionMiddleware = session(config.session)

const wrap = (expressMiddleware) => (socket, next) =>
    expressMiddleware(socket.request, {}, next)

module.exports = { sessionMiddleware, wrap }