"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Operation;
(function (Operation) {
    Operation[Operation["GET"] = 0] = "GET";
    Operation[Operation["SET"] = 1] = "SET";
    Operation[Operation["DELETE"] = 2] = "DELETE";
})(Operation || (Operation = {}));
var Storage = /** @class */ (function () {
    function Storage(options) {
        var _this = this;
        this.isReady = false;
        this.queuedRequests = [];
        this.flushTimeout = null;
        if (typeof indexedDB === 'undefined' || indexedDB === null) {
            throw new Error('IndexDB currently not supported when deepstream in node');
        }
        this.flush = this.flush.bind(this);
        var request = indexedDB.open(options.storageDatabaseName, 1);
        request.onerror = function (event) {
            // TODO: Workflow for lack of permissions to use indexDB
        };
        request.onsuccess = function (event) {
            _this.db = event.target.result;
            _this.onReady();
        };
        request.onupgradeneeded = function () {
            var db = request.result;
            if (!db.objectStoreNames.contains('records')) {
                db.createObjectStore('records', { keyPath: 'name' });
            }
        };
    }
    Storage.prototype.get = function (recordName, callback) {
        this.queuedRequests.push({ recordName: recordName, callback: callback, operation: Operation.GET });
        this.registerFlush();
    };
    Storage.prototype.set = function (recordName, version, data, callback) {
        this.queuedRequests.push({ recordName: recordName, version: version, callback: callback, operation: Operation.SET });
        this.registerFlush();
    };
    Storage.prototype.delete = function (recordName, callback) {
        this.queuedRequests.push({ recordName: recordName, callback: callback, operation: Operation.DELETE });
        this.registerFlush();
    };
    Storage.prototype.registerFlush = function () {
        if (this.isReady && !this.flushTimeout) {
            this.flushTimeout = setTimeout(this.flush, 50);
        }
    };
    Storage.prototype.flush = function () {
        var transaction = this.db.transaction(['records'], 'readwrite');
        var objectStore = transaction.objectStore('records');
        this.queuedRequests.forEach(function (_a) {
            var operation = _a.operation, recordName = _a.recordName, version = _a.version, data = _a.data, callback = _a.callback;
            switch (operation) {
                case Operation.GET: {
                    var request_1 = objectStore.get(recordName);
                    // The api doesn't support get errors yet!
                    request_1.onerror = function (event) {
                        throw new Error("Requesting record " + recordName + " failed");
                    };
                    request_1.onsuccess = function () {
                        if (request_1.result) {
                            callback(request_1.result.name, request_1.result.version, request_1.result.data);
                        }
                        else {
                            callback(recordName, -1, null);
                        }
                    };
                    break;
                }
                case Operation.DELETE: {
                    var request = objectStore.delete(recordName);
                    request.onsuccess = function () { return callback(null); };
                    request.onerror = function (event) { return callback(event.errorCode); };
                    break;
                }
                case Operation.SET: {
                    var request = objectStore.put({ name: recordName, version: version, data: data });
                    request.onsuccess = function () { return callback(null); };
                    request.onerror = function (event) { return callback(event.errorCode); };
                    break;
                }
            }
        });
        this.queuedRequests = [];
        this.flushTimeout = null;
    };
    Storage.prototype.onReady = function () {
        this.isReady = true;
        this.flush();
    };
    return Storage;
}());
exports.Storage = Storage;
