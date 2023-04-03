const EventEmitter = require("events");
const fs = require("fs");

class WithTime extends EventEmitter {
    execute(asyncFunc, ...args) {
        this.emit('begin');
        console.time('execute');
        asyncFunc(...args, (err, data) => {
            if(err) {
                return this.emit('error', err);
            }
            this.emit('data', data);
            console.timeEnd('execute');
            this.emit('end');
        });
    }
}

const withTime = new WithTime();

withTime.on('begin', () => console.log('About to start'));
withTime.on('end', () => console.log('About to End'));
withTime.on('error', (error) => console.log('Error emit' + error));
withTime.on('data', (data) => console.log('\n\n***\n' + data + '\n***\n\n'));

withTime.execute(fs.readFile, 'MyEmitter.js');