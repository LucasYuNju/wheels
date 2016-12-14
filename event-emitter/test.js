const EventEmitter = require('./index');
const emitter = new EventEmitter();

const logger = (...args) => {
    console.log("received", ...args);
};

emitter.on("message", logger);
emitter.on("message", logger);

emitter.emit("message", "hello world");
