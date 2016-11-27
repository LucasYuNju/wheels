class Promize {
    constructor(executor) {
        this.state = "pending";
        this.handlers = [];
        try {
            executor(this.resolve.bind(this), this.reject.bind(this));
        } catch (e) {
            this.reject();
        }
    }

    reject(reason) {
        this.state = "rejected";
        this.value = reason;
        setTimeout(() => {
            // 回调需要通过异步方式执行，用以保证一致可靠的执行顺序
            if (this.handlers.length) {
                this.handlers.forEach(this.handle.bind(this));
                this.handlers = [];
            }
            else {
                throw new Error("Unhandled promise rejection:" + reason);
            }
        });
    }

    // resolve将当前promise的状态改为fullfilled。 
    // 如果参数是promise的话，会等到参数promise状态改变之后，再修改当前promise状态
    resolve(promise) {
        if (promise && (typeof promise === "object" || typeof promise === 'function')) {
            const then = promise.then;
            if (then && typeof then === "function") {
                then.call(promise, this.resolve.bind(this), this.reject.bind(this));
                return;
            }
        }
        this.state = "fulfilled";
        this.value = promise;
        setTimeout(() => {
            this.handlers.forEach(this.handle.bind(this));
            this.handlers = [];            
        });
    }

    // 在状态转变为fullfilled的时候，执行onResolved和onRejected回调函数。
    handle(handler) {
        if (this.state === "pending") {
            this.handlers.push(handler);
            return;
        }
        // rejection handled
        this.handled = true;
        const cb = this.state === "fulfilled" ? handler.onResolved : handler.onRejected;
        cb(this.value);
    }

    // support promise chain
    then(onResolved, onRejected) {
        return new Promize((resolve, reject) => {
            const handler = {
                onResolved: (result) => {
                    try {
                        resolve(onResolved ? onResolved(result) : result);                        
                    }
                    catch (e) {
                        reject(e);
                    }
                },
                onRejected: (error) => {
                    // error bubbling
                    try{
                        reject(onRejected ? onRejected(error) : error);                        
                    }
                    catch (e) {
                        reject(e);
                    }
                }
            }
            this.handle(handler);
        });
    }
}

module.exports = Promize;
