const express = require('express');
const dbConnection = require('./database');
const kittenRoute = require('./Route/KitttenRoute');

const app = express();

//middleware
app.use(express.json());

app.use('/api/kitten', kittenRoute);

app.listen(8800, () => {
    console.log('Server is running on 8080');
    dbConnection();
});