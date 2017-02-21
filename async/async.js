/*
async function func() {
    const result = await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(1);
        }, 1000);
    });
    console.log(result);
}
*/

/**
 * generator实现的等价的函数
 */
function func() {
    return autoExecute(function *() {
        const result = yield new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(1);
            }, 1000);
        });
        console.log("result", result);
    });
}

/**
 * Promise executor
 */
function autoExecute(genF) {
    return new Promise((resolve, reject) => {
        const generator = genF();
        function doNext(func) {
            let next = null;
            try {
                next = func();
            } catch (e) {
                reject(e);
            }
            if (next.done) {
                return resolve(next.value);
            }
            // 这样写，可以同时处理next.value是Promise和不是Promise的情况
            Promise.resolve(next.value).then(result => {
                doNext(() => {
                    return generator.next(result);
                });
            }, reason => {
                doNext(() => {
                    throw new Error(reason);
                });
            });
        }
        doNext(() => {
            return generator.next();
        });
    });
}

asyncEquivalance();
