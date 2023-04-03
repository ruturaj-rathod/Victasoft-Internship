const fs = require('fs').promises;

//movefile function
const moveFile = async (source, destination) => {
	try {
		await fs.rename(source, destination);
		console.log(`Moved file from ${source} to destination ${destination}`);
	} catch (error) { 
		console.log(`Got an error to move file: ${error.message}`);
	}
}

moveFile('greetings2.txt', 'test-dir/solution.txt');

