const { spawn, exec, execFile } = require("child_process");

// const ls = spawn('cmd', ['-lh', 'usr']);

// ls.stdout.on('data', (data) => {
//     console.log(`stdout: ${data}`);
// });

// ls.stdin.on('data', () => {
//     console.log(`stdin: ${data}`);
// });

// ls.stderr.on('data', (data) => {
//     console.log(`stderr: ${data}`);
// })

// ls.on('close', (code) => {
//     console.log(`child process exited with code ${code}`);
// })

// const bat = spawn('cmd.exe', ['/c', 'my.bat']);
// bat.stdout.on('data', (data) => {
//     console.log(data.toString());
// })

// bat.on('exit', (code) => {
//     console.log(`Child exited with code ${code}`);
// });

const subprocess = spawn('bad_cmd');

subprocess.on('error', (err) => {
    console.log('Error is \n' + err);
})

// exec('echo "The \\$HOME variable is $HOME"', (error, stdout, stderr) => {
//     console.log(`stdout: ${stdout}`);
// });

// exec('node -v', (err, stdout, stderr) => {
//     console.log(`node stdout: ${stdout}`);
// })

// exec('ls', { shell: true },(err, stdout, stderr) => {
//     console.log(`stdout: ${stdout}`);
// })


// execFile('node', ['-v'], (err, stdout, stderr) => {
//     if(err) {
//         throw err;
//     }
//     console.log(`stdout: ${stdout}`);
//     console.log('stderr: ' + stderr);
// })

// if(process.argv[2] === 'child') {
//     setTimeout(() => {
//         console.log(`hello from ${process.argv[2]}!`)
//     }, 1_000);
// } else {
//     const { fork } = require('child_process');
//     const controller = new AbortController();

//     const { signal } = controller;

//     const child = fork(__filename, ['child'], { signal });

//     child.on('error', (err) => {

//     });
//     controller.abort();
// }