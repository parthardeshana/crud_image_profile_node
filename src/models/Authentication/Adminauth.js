const mongoose = require('mongoose')

const RegisterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
})

const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('RegisterSchema', RegisterSchema)
module.exports = mongoose.model('LoginSchema', LoginSchema)