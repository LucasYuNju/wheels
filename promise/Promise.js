class Promize {
    constructor(task) {
        this._state = "pending";
        this._resolvedCallbacks = [];
        this._rejectedCallbacks = [];
        try {
            task(this._resolve.bind(this), this._reject.bind(this));
        } catch (e) {
            this._reject();
        }
    }

    _resolve(result) {
        setTimeout(() => {
            if (this._state === "pending") {
                this._state = "resolved";
                this._result = result;
                this._resolvedCallbacks.forEach(callback => {
                    callback(this._result);
                })
            }
        });
    }

    _reject(reason) {
        setTimeout(() => {
            if (this._state === "pending") {
                this._state = "rejected";
                this._result = reason;
                this._rejectedCallbacks.forEach(callback => {
                    callback(this._result);
                })
            }
        });
    }

    then(resolvedCallback, rejectedCallback) {
        if (this._state === "pending") {
            this._resolvedCallbacks.push(resolvedCallback);
            this._rejectedCallbacks.push(rejectedCallback);
        }
        else if (this._state === "resolved") {
            setTimeout(() => {
                resolvedCallback(this._result);
            });
        }
        else {
            setTimeout(() => {
                rejectedCallback(this._result);
            });
        }
    }
}

const promise = new Promize((resolve, reject) => {
    // 立即执行，不需要异步调用
    console.log("task start");
    resolve(1);
});

// resolvedCallback要异步调用
promise.then(result => {
    console.log("result", result);
}, reason => {
    console.error(reason);
});

console.log("done");
