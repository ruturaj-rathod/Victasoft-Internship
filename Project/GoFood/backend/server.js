const app = require("./app"); //app instance created in app.js
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');

//uncaught exception
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to uncaught exception`);

    server.close(() => {
        process.exit(1);
    });
});

//config .env file
dotenv.config({path:"./config/config.env"});

//connect to database
connectDatabase();

//listen app
const server = app.listen(process.env.PORT || 8080, () => {
    console.log(`Server is running on port : ${process.env.PORT}`);
})

//unhandled promise rejection
process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhandled promise rejection`);

    server.close(() => {
        process.exit(1);
    });
});