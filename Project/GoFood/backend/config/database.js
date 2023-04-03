const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
const connectDatabase = () => {
    
    mongoose.connect(process.env.URI)
        .then((data) => {
            console.log(`Connected with mongoDB ${data.connection.host}`);
        });
}

module.exports = connectDatabase;
