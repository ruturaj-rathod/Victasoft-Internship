const mongoose = require('mongoose')

const dbConnection = () => {
    mongoose.connect('mongodb://localhost:27017/test')
    .then(con => {
        console.log(`Database conncet successufully`);
    });
}

module.exports = dbConnection;