//import fs module
const fs = require('fs').promises;

//readfile function
const readFile = async (filePath) => {
    try {
        const data = await fs.readFile(filePath);
        console.log(data.toString());
    } catch (error) {
        console.log(`Got an error trying to read the file: ${error.message}`);
    }
}

//call the readfile function for greeting.txt file
readFile('./greetings.txt');