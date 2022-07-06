const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../persistencia/models/user.models');
const logger = require('../utils/logger.utils');
const { mailerNewUser } = require('../utils/nodemailer.utils');
const carritosController = require('../controllers/carritos.controllers.js')

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id)
    done(null, user)
})

passport.use('local-register', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const user = await User.findOne({ email: email })
    if (user) {
        return done(null, false, req.flash('signupMessage', 'That email is already taken.'))
    } else {
        const newUser = new User()
        newUser.email = email
        newUser.name = req.body.name
        newUser.tel = req.body.full_phone
        newUser.address = req.body.address
        newUser.age = req.body.age
        newUser.avatar = req.body.avatar
        newUser.password = await newUser.encryptPassword(password)
        await newUser.save()
        logger.info(`Nuevo usuario registrado ${email}`)
        await mailerNewUser(newUser)
        logger.info(`Notificación de email enviada`)
        await carritosController.create(newUser.email)
        logger.info(`Carrito creado`)
        done(null, newUser)
    }
}))

passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const user = await User.findOne({ email: email })
    if (!user || !user.matchPassword(password, user.password)) {
        return done(null, false, req.flash('loginMessage', 'Invalid data.'))
    }
    global.user = user
    done(null, user);
}))