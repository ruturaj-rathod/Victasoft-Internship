const Kitten = require('../Model/Kitten')

module.exports = createKitten = async (req, res) => {
    try {
        const kitten = await Kitten.create({name: req.body.name})

        res.status(200).json({
            success: true,
            kitten
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error
        })
    }
}