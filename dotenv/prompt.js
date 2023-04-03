const prompt = require('prompts');

//using stdin 
/*process.stdin.on('data', data => {
    console.log(`You enter the ${data}`);
    process.exit();
});*/

(async () => {
    const response = await prompt({
        type: 'number',
        name: 'value',
        message: 'How old are you?',
        validate: value => value < 18 ? `You are not 18+` : true 
    });

    console.log(response);
})();