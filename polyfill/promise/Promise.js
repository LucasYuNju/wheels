class Promize {
    constructor(executor) {
        this.state = "pending";
        this.handlers = [];
        try {
            // 立即执行，不需要异步调用
            executor(this.resolve.bind(this), this.doReject.bind(this));
        } catch (e) {
            this.doReject();
        }
    }

    doResolve(result) {
        this.state = "fulfilled";
        this.value = result;
        // 将handler交给this.hanle()统一处理
        this.handlers.forEach(this.handle.bind(this));
        this.handlers = [];
    }

    doReject(reason) {
        this.state = "rejected";
        this.value = reason;
        this.handlers.forEach(this.handle.bind(this));
        this.handlers = [];
    }

    // doResolve的wrapper函数，能够处理参数为promise的情况
    resolve(promise) {
        let then = this.getThen(promise);
        try {
            if (then) {
                then.call(promise, this.resolve.bind(this), this.doReject.bind(this));
            }
            else {
                this.doResolve(promise);
            }
        } catch (e) {
            this.doReject(e);
        }
    }

    // 返回Promise的then方法
    getThen(promise) {
        if (promise && typeof promise === "object") {
            const then = promise.then;
            if (then && typeof then === "function") {
                return then;
            }
        }
        return null;
    }

    // 执行onResolved和onRejected回调函数
    handle(handler) {
        if (this.state === "pending") {
            this.handlers.push(handler);
        }
        else if (this.state === "fulfilled") {
            setTimeout(() => {
                handler.onResolved(this.value);
            }, 0);
        }
        else {
            setTimeout(() => {
                handler.onRejected(this.value);
            }, 0);
        }
    }

    then(onResolved, onRejected) {
        return new Promize((resolve, reject) => {
            const handler = {
                onResolved: (result) => {
                    try {
                        const resolvedResult = onResolved(result);
                        resolve(resolvedResult);
                    } catch (e) {
                        reject(e);
                    }
                },
                onRejected: (error) => {
                    try {
                        resolve(onFulfilled(error));
                    } catch (e) {
                        reject(e);
                    }
                }
            }
            this.handle(handler);
        });
    }
}

module.exports = Promize;
