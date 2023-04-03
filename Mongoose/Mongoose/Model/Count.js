const mongoose = require('mongoose');

const countSchema = mongoose.Schema({
    name: String,
    balance: Number
})

const Count = mongoose.model('Count', countSchema);
module.exports = Count;