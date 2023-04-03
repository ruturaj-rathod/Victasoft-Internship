const mongoose = require('mongoose');

const FoodCategorySchema = mongoose.Schema({
    CategoryName: {
        type: String,
        require: [true, 'Category name is require']
    }
});

module.exports = mongoose.model('food_category', FoodCategorySchema);