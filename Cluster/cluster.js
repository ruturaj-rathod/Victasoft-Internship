const cluster = require("cluster");
const http = require("http");

const numCPUs = 2;
if(cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);

    let worker;
    for(let i = 0; i < numCPUs; i++) {
        worker = cluster.fork();
        // worker.kill();
        worker.send('Announcing new server');
    }

    cluster.on('listening', (worker, address) => {
        console.log(`A worker is now connected to ${address.address}: ${address.port}`);
    });

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });

    cluster.on('message', (worker, message) => {
        console.log(`${worker.pid} is got message ${message}`)
    })
} else {
    http.createServer((req, res) => {
        res.writeHead(200);
        res.end('hello world\n');
      }).listen(8000, 'localhost');
    
      console.log(`Worker ${process.pid} started`);
}

// for (const worker of Object.values(cluster.workers)) {
//     worker.send("Announce");
// }