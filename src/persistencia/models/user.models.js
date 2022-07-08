const mongoose = require('mongoose')
const { Schema } = mongoose
const bcrypt = require('bcrypt')
const config = require('../../config')

const userSchema = new Schema({
    email: String,
    name: String,
    tel: String,
    address: String,
    age: Number,
    avatar: String,
    password: String,
})

userSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, 10)
}

userSchema.methods.matchPassword = (password, hash) => {
    return bcrypt.compareSync(password, hash)
}

module.exports = mongoose.model(config.mongo.collections.users, userSchema)