const mongoose = require('mongoose')

const kittenSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is must required field']
    }
})

module.exports = mongoose.model('Kitten', kittenSchema)