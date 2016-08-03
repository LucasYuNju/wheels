const Promize = require("./Promise");

// naive test
let promize = new Promize((resolve, reject) => {
    console.log("task start");
    const delayPromize = new Promize((resolve, reject) => {
        setTimeout(() => {
            resolve(1);
        }, 1000);
    });
    resolve(delayPromize);
});

promize.then(result => {
    console.log(result);
    return 2;
})
.then(result => {
    console.log(result);
    return new Promize((resolve, reject) => {
        setTimeout(() => {
            resolve(3);
        }, 1000);
    });
})
.then(result => {
    console.log(result);
})

console.log("done");
