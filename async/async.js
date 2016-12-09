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
function asyncEquivalance() {
    return autoExecutor(function *() {
        const result = yield new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(1);
            }, 1000);
        });
        console.log("result", result);
    });
}

function autoExecutor(genF) {
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
