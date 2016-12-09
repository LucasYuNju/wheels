const EventEmitter = require('events').EventEmitter;
const emitter = new EventEmitter();

const logger = () => {
    console.log("received");
};

emitter.on("message", logger);
emitter.on("message", logger);

emitter.emit("message", "hello world");
