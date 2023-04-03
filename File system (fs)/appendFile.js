const fs = require("fs");

// fs.appendFileSync('./greetings.txt', 'This is added to greetings.txt using appendFile');

// let readFile = fs.readFileSync('./greetings.txt');

// fs.chmodSync('./greetings.txt', 0o400);
// console.log('After remove access to write opreation trying to write in file');

// fs.writeFile('./greetings.txt', 'I overwrite this file', (err) => {
    //     if(err) {
        //         console.log(`Error ${err}`);
        //     }
        //     console.log('Write to file');
        // })
        // console.log(readFile.toString());
        // fs.chmodSync('./greetings.txt', 0o600);

// (async () => {
//     const fd =  await fs.promises.open('./test-dir/solution.txt');
//     // fd.createReadStream();
//     fd.truncate(5);
// })();

fs.watch('./greetings.txt', (eventType, filename) => {
    console.log(`\nThe file ${filename} was modified`);
    console.log(`\nThe Type of change is ${eventType}`);
});

setTimeout(() => fs.readFileSync("./greetings.txt"), 2000)

setTimeout(() => fs.rename("./greetings.txt", "new_file.txt", () => {}), 4000)

setTimeout(() => fs.rename("./new_file.txt", "greetings.txt", () => {}), 6000)