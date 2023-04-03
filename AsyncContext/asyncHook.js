const { createHook, executionAsyncId, triggerAsyncId } = require("async_hooks");
const { fd } = require("process").stdout;
const net = require("net");
const fs = require("fs");
const { type } = require("os");

// let indent = 0;
// createHook({
//     init (asyncId, type, triggerAsyncId) {
//         const eid = executionAsyncId();
//         const indentStr = ' '.repeat(indent);
//         fs.writeSync(
//             fd,
//             `${indentStr}${type}(${asyncId}) : trigger: ${triggerAsyncId} execution: ${eid}\n`
//         );
//     },
//     before(asyncId) {
//         const indentStr = ' '.repeat(indent);
//         fs.writeSync(
//             fd,
//             `${indentStr}before: ${asyncId}\n` 
//             );
//         indent += 2;
//     },
//     after(asyncId) {
//         const indentStr = ' '.repeat(indent);
//         fs.writeSync(
//             fd,
//             `${indentStr}After: ${asyncId}\n` 
//             );
//         indent -= 2;
//     },
//     destroy(asyncId) {
//         const indentStr = ' '.repeat(indent);
//         fs.writeSync(
//             fd,
//             `${indentStr}Destroy: ${asyncId}\n` 
//             );
//     }
// }).enable();

// net.createServer(() => {}).listen(8000, () => { console.log('Running')});

new Promise((resolve) => resolve(true)).then((a) => {});

const { createServer } = require('node:http');
const {
  executionAsyncResource,
} = require('async_hooks');
const sym = Symbol('state'); // Private symbol to avoid pollution

createHook({
  init(asyncId, type, triggerAsyncId, resource) {
    const cr = executionAsyncResource();
    if (cr) {
      resource[sym] = cr[sym];
    }
  },
}).enable();

const server = createServer((req, res) => {
  executionAsyncResource()[sym] = { state: req.url };
  setTimeout(function() {
    res.end(JSON.stringify(executionAsyncResource()[sym]));
  }, 100);
}).listen(3000);