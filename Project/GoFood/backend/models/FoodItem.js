const mongoose = require('mongoose');

const FoodItemSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Food name is require"]
    },
    CategoryName: {
        type: String,
        required: [true, "Food category is require"]
    },
    img: {
        type: String,
        required: true
    },
    options: {
        type: Array,
        required: true
    },
    description: {
        type: String
    }
});

module.exports = mongoose.model("food_item", FoodItemSchema);