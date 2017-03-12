/**
 * generator实现的等价的函数
 */
function func() {
    return autoExecute(function *() {
        const a = yield new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(1);
            }, 1000);
        });
        const b = yield new Promise((resolve, reject) => {
            resolve(2);
        });
        console.log("sum", a + b);
    });
}

/**
 * Promise executor
 */
function autoExecute(generator) {
    return new Promise((resolve, reject) => {
        const iterator = generator();
        function doNext(func) {
            let next = func();
            if (next.done) {
                return resolve(next.value);
            }
            // 同时处理next.value是Promise和不是Promise的情况
            Promise.resolve(next.value).then(result => {
                doNext(() => {
                    return iterator.next(result);
                });
            }, reason => {
                doNext(() => {
                    throw new Error(reason);
                });
            });
        }
        doNext(() => {
            return iterator.next();
        });
    });
}

func();
