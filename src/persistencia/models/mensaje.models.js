const { Schema } = require('mongoose');

const mensajeSchema = new Schema({
    autor: {
        avatar: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true
        },
        nombre: {
            type: String,
            required: true
        }
    },
    texto: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true,
        unique: true
    },
    fyh: {
        type: String,
        required: true
    }
},
    {
        timestamps: false
    }
)

module.exports = mensajeSchema