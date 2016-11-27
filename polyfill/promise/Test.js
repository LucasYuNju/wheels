const Promize = require("./Promise");

// naive test
let promize = new Promize((resolve, reject) => {
    console.log("task start");
    const delay = new Promize((resolve, reject) => {
        setTimeout(() => {
            resolve(1);
        }, 1000);
    });
    resolve(delay);
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


// new Promize((resolve, reject) => {
//     reject("pikapika");
// })
// .then((result) => {
//     console.log("result", result);
// }, 
// (error) => {
//     console.log("error", error);
// });    
