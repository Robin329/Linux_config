'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class TypedTask {
    constructor(func) {
        this.func = func;
        this.p = new Promise((resolve, reject) => {
            this.rs = resolve;
            this.rj = reject;
        });
    }
    execute() {
        const result = this.func();
        if (result instanceof Promise) {
            result.then(this.resolve.bind(this)).catch(this.reject.bind(this));
        }
        else {
            this.resolve(result);
        }
    }
    promise() {
        return this.p;
    }
    resolve(result) {
        this.rs(result);
    }
    reject(reason) {
        this.rj(reason);
    }
}
class TaskQueue {
    constructor() {
        this.tasks = [];
        this.idle = [];
        this.executing = null;
    }
    append(task, idle) {
        const t = new TypedTask(task);
        if (!idle) {
            this.tasks.push(t);
        }
        else {
            this.idle.push(t);
        }
        this.poke();
        return t.promise();
    }
    poke() {
        if (!this.executing) {
            const t = this.tasks.shift() || this.idle.shift();
            if (t) {
                this.executing = t;
                this.executing
                    .promise()
                    .then(this.finished.bind(this))
                    .catch(this.finished.bind(this));
                this.executing.execute();
            }
        }
    }
    finished() {
        this.executing = null;
        this.poke();
    }
}
exports.TaskQueue = TaskQueue;
//# sourceMappingURL=taskqueue.js.map