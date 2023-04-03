const router = require('express').Router()
const createKitten = require('../Controller/KittenController')

router.post('/new', createKitten);

module.exports = router