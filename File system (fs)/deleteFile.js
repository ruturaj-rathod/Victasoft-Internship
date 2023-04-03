const fs = require('fs').promises;

//deletefile function
const deleteFile = async (filePath) => {
    try {
        //this will delete permentlly and not move to recycle bin
        await fs.unlink(filePath); //here unlink function use to delete the file
        console.log(`Deleted ${filePath}`);
    } catch (error) {
        console.log(`Got an error to delete the file: ${error.message}`);
    }
}

deleteFile('groceries.csv');