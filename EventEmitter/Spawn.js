const { spawn } = require('child_process');

const child = spawn('cmd');

process.stdin.pipe(child.stdin);

child.stdout.on('data', data => {console.log(`Child stdout:\n${data}`)});