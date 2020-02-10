"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var utils = require("../util/utils");
var constants_1 = require("../constants");
var Emitter = require("component-emitter2");
var Record = /** @class */ (function (_super) {
    __extends(Record, _super);
    function Record(record) {
        var _this = _super.call(this) || this;
        _this.record = record;
        _this.subscriptions = [];
        _this.record.on(constants_1.EVENT.RECORD_READY, _this.emit.bind(_this, constants_1.EVENT.RECORD_READY, _this));
        _this.record.on(constants_1.EVENT.RECORD_DISCARDED, _this.emit.bind(_this, constants_1.EVENT.RECORD_DISCARDED));
        _this.record.on(constants_1.EVENT.RECORD_DELETED, _this.emit.bind(_this, constants_1.EVENT.RECORD_DELETED));
        _this.record.on(constants_1.EVENT.RECORD_ERROR, _this.emit.bind(_this, constants_1.EVENT.RECORD_ERROR));
        return _this;
    }
    Object.defineProperty(Record.prototype, "name", {
        get: function () {
            return this.record.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Record.prototype, "isReady", {
        get: function () {
            return this.record.isReady;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Record.prototype, "version", {
        get: function () {
            return this.record.version;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Record.prototype, "hasProvider", {
        get: function () {
            return this.record.hasProvider;
        },
        enumerable: true,
        configurable: true
    });
    Record.prototype.whenReady = function (callback) {
        if (callback) {
            this.record.whenReady(this, callback);
        }
        else {
            return this.record.whenReady(this);
        }
    };
    Record.prototype.get = function (path) {
        return this.record.get(path);
    };
    Record.prototype.set = function (dataOrPath, dataOrCallback, callback) {
        return this.record.set(utils.normalizeSetArguments(arguments));
    };
    Record.prototype.setWithAck = function (pathOrData, dataOrCallback, callback) {
        return this.record.setWithAck(utils.normalizeSetArguments(arguments));
    };
    /**
     * Deletes a path from the record. Equivalent to doing `record.set(path, undefined)`
     *
     * @param {String} path The path to be deleted
     */
    Record.prototype.erase = function (path) {
        if (!path) {
            throw new Error('unable to erase record data without path, consider using `delete`');
        }
        this.set(path, undefined);
    };
    Record.prototype.eraseWithAck = function (path, callback) {
        if (!path) {
            throw new Error('unable to erase record data without path, consider using `delete`');
        }
        if (callback) {
            this.setWithAck(path, undefined, callback);
        }
        else {
            return this.setWithAck(path, undefined);
        }
    };
    Record.prototype.subscribe = function (path, callback, triggerNow) {
        var parameters = utils.normalizeArguments(arguments);
        this.subscriptions.push(parameters);
        this.record.subscribe(parameters);
    };
    Record.prototype.unsubscribe = function (path, callback) {
        var parameters = utils.normalizeArguments(arguments);
        this.subscriptions = this.subscriptions.filter(function (subscription) {
            return (subscription.path !== parameters.path ||
                subscription.callback !== parameters.callback);
        });
        this.record.unsubscribe(parameters);
    };
    Record.prototype.discard = function () {
        for (var i = 0; i < this.subscriptions.length; i++) {
            this.record.unsubscribe(this.subscriptions[i]);
        }
        return this.record.discard();
    };
    Record.prototype.delete = function (callback) {
        return this.record.delete(callback);
    };
    Record.prototype.setMergeStrategy = function (mergeStrategy) {
        this.record.setMergeStrategy(mergeStrategy);
    };
    return Record;
}(Emitter));
exports.Record = Record;
