const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express(); //create app

//middleware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
})); //Access-Control-Allow-Origin
app.use(express.json()); //parse json body
app.use(cookieParser()); //parse cookie from header

//imports route
const userRoute = require('./routes/UserRoute');
const foodRoute = require('./routes/FoodRoute');
const orderRoute = require('./routes/OrderRoute');

app.use('/api/user', userRoute);
app.use('/api/food', foodRoute);
app.use('/api/order', orderRoute);

//error middleware
const errorMiddleware = require('./middleware/error');
app.use(errorMiddleware);

module.exports = app; //exports the app