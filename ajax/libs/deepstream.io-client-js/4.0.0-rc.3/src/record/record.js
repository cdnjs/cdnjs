"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils = require("../util/utils");
const constants_1 = require("../constants");
const Emitter = require("component-emitter2");
class Record extends Emitter {
    constructor(record) {
        super();
        this.record = record;
        this.subscriptions = [];
        this.record.on(constants_1.EVENT.RECORD_READY, this.emit.bind(this, constants_1.EVENT.RECORD_READY, this));
        this.record.on(constants_1.EVENT.RECORD_DISCARDED, this.emit.bind(this, constants_1.EVENT.RECORD_DISCARDED));
        this.record.on(constants_1.EVENT.RECORD_DELETED, this.emit.bind(this, constants_1.EVENT.RECORD_DELETED));
        this.record.on(constants_1.EVENT.RECORD_ERROR, this.emit.bind(this, constants_1.EVENT.RECORD_ERROR));
    }
    get name() {
        return this.record.name;
    }
    get isReady() {
        return this.record.isReady;
    }
    get version() {
        return this.record.version;
    }
    get hasProvider() {
        return this.record.hasProvider;
    }
    whenReady(callback) {
        if (callback) {
            this.record.whenReady(this, callback);
        }
        else {
            return this.record.whenReady(this);
        }
    }
    get(path) {
        return this.record.get(path);
    }
    set(dataOrPath, dataOrCallback, callback) {
        return this.record.set(utils.normalizeSetArguments(arguments));
    }
    setWithAck(pathOrData, dataOrCallback, callback) {
        return this.record.setWithAck(utils.normalizeSetArguments(arguments));
    }
    /**
     * Deletes a path from the record. Equivalent to doing `record.set(path, undefined)`
     *
     * @param {String} path The path to be deleted
     */
    erase(path) {
        if (!path) {
            throw new Error('unable to erase record data without path, consider using `delete`');
        }
        this.set(path, undefined);
    }
    eraseWithAck(path, callback) {
        if (!path) {
            throw new Error('unable to erase record data without path, consider using `delete`');
        }
        if (callback) {
            this.setWithAck(path, undefined, callback);
        }
        else {
            return this.setWithAck(path, undefined);
        }
    }
    subscribe(path, callback, triggerNow) {
        const parameters = utils.normalizeArguments(arguments);
        this.subscriptions.push(parameters);
        this.record.subscribe(parameters);
    }
    unsubscribe(path, callback) {
        const parameters = utils.normalizeArguments(arguments);
        this.subscriptions = this.subscriptions.filter(subscription => {
            return (subscription.path !== parameters.path ||
                subscription.callback !== parameters.callback);
        });
        this.record.unsubscribe(parameters);
    }
    discard() {
        for (let i = 0; i < this.subscriptions.length; i++) {
            this.record.unsubscribe(this.subscriptions[i]);
        }
        return this.record.discard();
    }
    delete(callback) {
        return this.record.delete(callback);
    }
    setMergeStrategy(mergeStrategy) {
        this.record.setMergeStrategy(mergeStrategy);
    }
}
exports.Record = Record;
//# sourceMappingURL=record.js.map