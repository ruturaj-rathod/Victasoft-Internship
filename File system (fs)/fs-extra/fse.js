const fse = require('fs-extra');

fse.copy('greeting.js', 'greatings2.txt', (err) => {
    if(err) return console.error(err);
    console.log("Copy success");
});

fse.emptyDir('temp', (err) => {
    if(err) return console.error(err);
    console.log("Directory is created or empty the directory");
});

fse.ensureFile("temp1/user/index.html", (err) => {
    if(err) return console.error(err);
    console.log("File is created. If directory not exists it created");
});

fse.move('temp1/user/index.html', 'newtemp/index.html', (err) => {
    if(err) return console.error(err);
    console.log("File move. If directory not present it created");
});

fse.outputJSON('name.json', {name: 'RR'}, (err) => {
    console.log(err);
    fse.readJSON('name.json', (err, data) => {
        if(err) return console.log(err);
        console.log(data);
    })
})