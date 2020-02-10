"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Storage = /** @class */ (function () {
    function Storage(options) {
        this.isReady = true;
        if (typeof localStorage === 'undefined' || localStorage === null) {
            try {
                var LocalStorage = require('node-localstorage').LocalStorage;
                this.storage = new LocalStorage(options.nodeStoragePath, options.nodeStorageSize * 1024 * 1024);
            }
            catch (e) {
                throw new Error('Attempting to use localStorage outside of browser without node-localstorage polyfill');
            }
        }
        else {
            this.storage = localStorage;
        }
    }
    Storage.prototype.get = function (recordName, callback) {
        var item = this.storage.getItem(recordName);
        if (item) {
            var doc = JSON.parse(item);
            setTimeout(callback.bind(this, recordName, doc.version, doc.data), 0);
            return;
        }
        setTimeout(callback.bind(this, recordName, -1, null), 0);
    };
    Storage.prototype.set = function (recordName, version, data, callback) {
        this.storage.setItem(recordName, JSON.stringify({ recordName: recordName, version: version, data: data }));
        setTimeout(callback, 0);
    };
    Storage.prototype.delete = function (recordName, callback) {
        this.storage.removeItem(recordName);
        setTimeout(callback, 0);
    };
    return Storage;
}());
exports.Storage = Storage;
