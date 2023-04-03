const fs = require('fs').promises;

//function to write file 
const writeFile = async () => {
    try {
        const csvHeaders = 'name,quantity,price';
        await fs.writeFile('groceries.csv', csvHeaders);
    } catch (error) {
        console.log(`Got an error trying to write a file : ${error.message}`);
    }
}

//add row to groceries.csv file
const addGroceryItem = async (name, quantity, price) => {
    try {
        const addItem = `\n${name},${quantity},${price}`;
        await fs.writeFile('groceries.csv', addItem, { flag: 'a'}); 
        // flage 'a' means append to the file. Defualt is 'w' means overwrite or create new if not exists
    } catch (error) {
        console.log(`Got an error trying to write a file: ${error.message}`);
    }
}

//Here we use wrapper function beacuase it write data in order other wise possible that order is not in sequence
( async function () {    
    await writeFile();
    await addGroceryItem("bread", 12, 2);
    await addGroceryItem("butter", 4, 10);
})();