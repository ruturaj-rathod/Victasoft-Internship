const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    user : {
        type: String,
        required: true,
        unique: true
    },
    order_details : {
        type: Array,
        required: true 
    }
});

module.exports = mongoose.model("order", OrderSchema);