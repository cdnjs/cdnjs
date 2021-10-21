/* *
 *
 *  (c) 2020-2021 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Sophie Bremer
 *
 * */
'use strict';
/* *
 *
 *  Imports
 *
 * */
import H from '../Core/Globals.js';
/* *
 *
 *  Constants
 *
 * */
var win = H.win;
var delay = setTimeout;
/* *
 *
 *  Class
 *
 * */
/**
 * Simplified wrapper for Promise-support in outdated browsers.
 */
var DataPromise = /** @class */ (function () {
    /* *
     *
     *  Constructor
     *
     * */
    function DataPromise(executor) {
        /* *
         *
         *  Properties
         *
         * */
        this.jobs = [];
        this.state = DataPromise.State.Pending;
        this.value = void 0;
        if (win.Promise && !DataPromise.onlyPolyfill) {
            return new win.Promise(executor);
        }
        var promise = this;
        delay(function () {
            try {
                executor(function (value) { return promise.resolved(value); }, function (reason) { return promise.rejected(reason); });
            }
            catch (e) {
                promise.rejected(e);
            }
        }, 0);
    }
    /* *
     *
     *  Static Functions
     *
     * */
    DataPromise.isPromiseLike = function (promise) {
        return (typeof promise === 'object' &&
            promise !== null &&
            typeof promise.then === 'function');
    };
    DataPromise.reject = function (reason) {
        if (win.Promise && !DataPromise.onlyPolyfill) {
            return win.Promise.reject(reason);
        }
        return new DataPromise(function (resolve, reject) { return reject(reason); });
    };
    DataPromise.resolve = function (value) {
        if (win.Promise && !DataPromise.onlyPolyfill) {
            return win.Promise.resolve(value);
        }
        if (DataPromise.isPromiseLike(value)) {
            return new DataPromise(function (resolve, reject) {
                value.then(resolve, reject);
            });
        }
        return new DataPromise(function (resolve) { return resolve(value); });
    };
    /* *
     *
     *  Functions
     *
     * */
    DataPromise.prototype['catch'] = function (onrejected) {
        return this.then(null, onrejected);
    };
    DataPromise.prototype.rejected = function (reason) {
        var promise = this;
        if (promise.state === DataPromise.State.Pending) {
            promise.state = DataPromise.State.Rejected;
            promise.reason = reason;
            delay(function () { return promise.work(); }, 0);
        }
    };
    DataPromise.prototype.resolved = function (value) {
        var promise = this;
        if (promise.state === DataPromise.State.Pending) {
            if (DataPromise.isPromiseLike(value)) {
                value.then(function (value) { return promise.resolved(value); }, function (reason) { return promise.rejected(reason); });
            }
            else {
                promise.state = DataPromise.State.Fulfilled;
                promise.value = value;
                delay(function () { return promise.work(); }, 0);
            }
        }
    };
    DataPromise.prototype.then = function (onfulfilled, onrejected) {
        var promise = this, newPromise = new DataPromise(function () { return void 0; }), rejecter = function (reason) {
            if (onrejected) {
                try {
                    var result = onrejected(reason);
                    if (result instanceof DataPromise) {
                        result.then(function (value) {
                            return newPromise.resolved(value);
                        }, function (reason) {
                            return newPromise.rejected(reason);
                        });
                    }
                    else {
                        newPromise.resolved(result);
                    }
                    return;
                }
                catch (e) {
                    reason = e;
                }
            }
            if (newPromise.jobs.length) {
                newPromise.rejected(reason);
            }
            else if (reason) {
                throw reason;
            }
            else {
                throw new Error('Unhandled exception');
            }
        }, resolver = function (value) {
            if (onfulfilled) {
                try {
                    var result = onfulfilled(value);
                    if (result instanceof DataPromise) {
                        result.then(function (value) {
                            return newPromise.resolved(value);
                        }, function (reason) {
                            return newPromise.rejected(reason);
                        });
                    }
                    else {
                        newPromise.resolved(result);
                    }
                }
                catch (e) {
                    rejecter(e);
                }
            }
            else {
                newPromise.resolved(value);
            }
        };
        switch (promise.state) {
            case DataPromise.State.Fulfilled:
                resolver(promise.value);
                break;
            case DataPromise.State.Rejected:
                rejecter(promise.reason);
                break;
            default:
                promise.jobs.push({
                    resolve: resolver,
                    reject: rejecter
                });
                break;
        }
        return newPromise;
    };
    DataPromise.prototype.work = function () {
        var promise = this, jobs = promise.jobs;
        var job, rejectHandled;
        while ((job = jobs.shift())) {
            try {
                if (promise.state === DataPromise.State.Fulfilled) {
                    job.resolve(promise.value);
                }
                else if (job.reject) {
                    rejectHandled = true;
                    job.reject(promise.reason);
                }
            }
            catch (e) {
                rejectHandled = false;
                promise.reason = e;
                promise.state = DataPromise.State.Rejected;
            }
        }
        if (rejectHandled === false) {
            if (promise.reason) {
                throw promise.reason;
            }
            else {
                throw new Error('Unhandled rejection');
            }
        }
    };
    /* *
     *
     *  Static Properties
     *
     * */
    DataPromise.onlyPolyfill = false;
    return DataPromise;
}());
/* *
 *
 *  Class Namespace
 *
 * */
(function (DataPromise) {
    /* *
     *
     *  Declarations
     *
     * */
    /* *
     *
     *  Enumerations
     *
     * */
    var State;
    (function (State) {
        State[State["Fulfilled"] = 2] = "Fulfilled";
        State[State["Pending"] = 0] = "Pending";
        State[State["Rejected"] = 1] = "Rejected";
    })(State = DataPromise.State || (DataPromise.State = {}));
})(DataPromise || (DataPromise = {}));
/* *
 *
 *  Default Export
 *
 * */
export default DataPromise;
