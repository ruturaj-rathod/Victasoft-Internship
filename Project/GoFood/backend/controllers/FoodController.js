const FoodItem = require('../models/FoodItem');
const CategoryName = require('../models/FoodCategory');
const FoodCategory = require('../models/FoodCategory');

exports.newFood = async(req, res) => {
    try {
        const foodItem = await FoodItem.create(req.body);
        res.status(200).json({
            success: true,
            foodItem
        });
    } catch (error) {
        res.json({
            success: false,
            message: error
        });
    }
}

exports.getAllFood = async(req, res) => {
    try {
        const foodItems = await FoodItem.find({});
        const categoryItem = await CategoryName.find({});
        res.json({
            success: true,
            food_items: [foodItems, categoryItem]
        });
    } catch (error) {
        res.json({
            success: false,
            message: "Something went wrong"
        });
    }
}

exports.deleteFood = async (req, res) => {
    try {
        const foodItem = await FoodItem.findById(req.params.id);

        if(!foodItem) {
            return res.status(404).json({
                success: false,
                message: "Food item not found"
            });
        }

        await foodItem.remove();

        res.status(200).json({
            success: true,
            message: "Food deleted successfully"
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Food item is not deleted"
        })
    }
}

//Add food category
exports.createCategory = async (req, res) => {
    try {
        const category = await FoodCategory.create(req.body);
        res.status(200).json({
            success: true,
            category
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Something went wrong"
        });
    }
}