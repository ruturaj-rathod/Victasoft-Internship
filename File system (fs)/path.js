const path = require('path');

const filePathInfo = path.parse(__filename);

//path info
console.log('Current file path info : ');
console.log(filePathInfo);

//base file
console.log(`basename of path 'C://temp/index.html' ${path.basename("C://temp/index.html")}`);

//delimeter
console.log("Alll environment path using delimiter");
console.log(process.env.PATH.split(path.delimiter));

const { cwd } = require('process');

//this is node command run directory
console.log(`Current directory: ${cwd()} `);


//current javascript file directory and file name
console.log(`current directory is ${__dirname} and file directory is ${__filename}`);