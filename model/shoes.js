const mongoose = require('mongoose')

const shoesSchema = new mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    brand: {
        type: String
    },
    color: {
        type: String
    },
    price: {
        type: Number
    },
    gender: {
        type: String
    },
    size: {
        type: Array 
    },
    shoeType: {
        type: String
    },
    images: {
        type: Array
    }
})

const shoes = mongoose.model('shoes', shoesSchema)
module.exports = shoes