const EventEmitter = require("events");

class MyEmitter extends EventEmitter {
    execute(taskFunk) {
        console.log('Before Executing');
        this.emit('begin');
        taskFunk();
        this.emit('end');
        console.log('After Executing');
    }
}

const logs = new MyEmitter();

logs.on('begin', () => console.log('About to begin'));
logs.on('end', () => console.log('About to end'));

logs.execute(() => console.log('Executing'));