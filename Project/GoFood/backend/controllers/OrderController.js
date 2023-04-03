const Order = require('../models/Orders');

exports.makeOrder = (async (req, res, next) => {
    let data = req.body.order_data
    await data.splice(0, 0, { Order_date: req.body.order_date })
    // console.log("1231242343242354", req.body.email)

    //if email not exisitng in db then create: else: InsertMany()
    let eId = await Order.findOne({ 'user': req.body.email })
    // console.log(eId)
    if (eId === null) {
        try {
            // console.log(data)
            // console.log("1231242343242354", req.body.email)
            await Order.create({
                user: req.body.email,
                order_details: [data]
            }).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            // console.log(error.message)
            res.send("Server Error" + error.message)

        }
    }
    else {
        try {
            await Order.findOneAndUpdate({ user: req.body.email },
                { $push: { order_details: data } }).then(() => {
                    res.json({ success: true })
                })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)
        }
    }
});

exports.orders = async (req, res) => {
    try {
        const orders = await Order.findOne({ 'user': req.body.email});
        res.status(200).json({
            success: true,
            orders
        }) 
    } catch (error) {
        res.send("Something went wrong");
    }
}

//Get orders by admin
exports.getAllOrders = async (req, res) => {
    const email = req.params.email;
    try {
        const orders = await Order.findOne({ 'user': email});
        res.status(200).json({
            success: true,
            orders
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Something went wrong"
        });
    }
}