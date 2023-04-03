require('dotenv').config();
//if we don't want use require than preload using cmd 'node -r dotenv/config index.js'

const hostname = process.env.HOST;
const database = process.env.DATABASE;
const port = process.env.PORT;

console.log(`Hostname : ${hostname}`);
console.log(`Database name : ${database}`);
console.log(`Port number : ${port}`);
