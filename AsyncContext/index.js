const http = require("http");
const { AsyncLocalStorage } = require("async_hooks");

const asyncLocalStrorage = new AsyncLocalStorage();

const notify = async (message) => {
    const id = asyncLocalStrorage.getStore(); //return the current store
    console.log(`${id} is ${message}`);
    asyncLocalStrorage.disable() //this will disable storage
} 


let reqId = 0;
const app = http.createServer((req, res) => {
    res.statusCode = 200;
    
    asyncLocalStrorage.run(reqId++, async () => {
        await notify('start');

        setImmediate(() => {
            notify('end')
        })
    });

    res.end("hello");
});

app.listen(8000, 'localhost', () => {
    console.log(`Server running at ${8000}`);
});
