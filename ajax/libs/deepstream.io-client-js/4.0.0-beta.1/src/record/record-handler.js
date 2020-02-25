"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils = require("../util/utils");
const constants_1 = require("../constants");
const message_constants_1 = require("../../binary-protocol/src/message-constants");
const utils_1 = require("../../binary-protocol/src/utils");
const record_core_1 = require("./record-core");
const record_1 = require("./record");
const anonymous_record_1 = require("./anonymous-record");
const list_1 = require("./list");
const listener_1 = require("../util/listener");
const single_notifier_1 = require("./single-notifier");
const write_ack_service_1 = require("./write-ack-service");
const Emitter = require("component-emitter2");
class RecordHandler {
    constructor(services, options, listener) {
        this.services = services;
        this.options = options;
        this.emitter = new Emitter();
        this.listener = listener || new listener_1.Listener(message_constants_1.TOPIC.RECORD, this.services);
        this.recordCores = new Map();
        this.recordServices = {
            writeAckService: new write_ack_service_1.WriteAcknowledgementService(services),
            readRegistry: new single_notifier_1.SingleNotifier(services, message_constants_1.TOPIC.RECORD, message_constants_1.RECORD_ACTIONS.READ, options.recordReadTimeout),
            headRegistry: new single_notifier_1.SingleNotifier(services, message_constants_1.TOPIC.RECORD, message_constants_1.RECORD_ACTIONS.HEAD, options.recordReadTimeout)
        };
        this.getRecordCore = this.getRecordCore.bind(this);
        this.services.connection.registerHandler(message_constants_1.TOPIC.RECORD, this.handle.bind(this));
    }
    /**
   * Returns an existing record or creates a new one.
   *
   * @param   {String} name              the unique name of the record
   */
    getRecord(name) {
        return new record_1.Record(this.getRecordCore(name));
    }
    /**
     * Returns an existing List or creates a new one. A list is a specialised
     * type of record that holds an array of recordNames.
     *
     * @param   {String} name       the unique name of the list
     */
    getList(name) {
        return new list_1.List(this.getRecordCore(name));
    }
    /**
     * Returns an anonymous record. A anonymous record is effectively
     * a wrapper that mimicks the API of a record, but allows for the
     * underlying record to be swapped without loosing subscriptions etc.
     *
     * This is particularly useful when selecting from a number of similarly
     * structured records. E.g. a list of users that can be choosen from a list
     *
     * The only API difference to a normal record is an additional setName( name ) method.
     */
    getAnonymousRecord() {
        return new anonymous_record_1.AnonymousRecord(this.getRecordCore);
    }
    /**
     * Allows to listen for record subscriptions made by this or other clients. This
     * is useful to create "active" data providers, e.g. providers that only provide
     * data for a particular record if a user is actually interested in it
     *
     * @param   {String}   pattern  A combination of alpha numeric characters and wildcards( * )
     * @param   {Function} callback
     */
    listen(pattern, callback) {
        this.listener.listen(pattern, callback);
    }
    /**
     * Removes a listener that was previously registered with listenForSubscriptions
     *
     * @param   {String}   pattern  A combination of alpha numeric characters and wildcards( * )
     */
    unlisten(pattern) {
        this.listener.unlisten(pattern);
    }
    snapshot(name, callback) {
        if (typeof name !== 'string' || name.length === 0) {
            throw new Error('invalid argument: name');
        }
        if (callback !== undefined && typeof callback !== 'function') {
            throw new Error('invalid argument: callback');
        }
        const recordCore = this.recordCores.get(name);
        if (recordCore) {
            if (callback) {
                recordCore.whenReady(null, () => {
                    callback(null, recordCore.get());
                });
            }
            else {
                return new Promise((resolve, reject) => {
                    recordCore.whenReady(null, () => {
                        resolve(recordCore.get());
                    });
                });
            }
            return;
        }
        if (callback) {
            this.recordServices.readRegistry.request(name, { callback });
        }
        else {
            return new Promise((resolve, reject) => {
                this.recordServices.readRegistry.request(name, { resolve, reject });
            });
        }
    }
    has(name, callback) {
        if (typeof name !== 'string' || name.length === 0) {
            throw new Error('invalid argument: name');
        }
        if (callback !== undefined && typeof callback !== 'function') {
            throw new Error('invalid argument: callback');
        }
        let cb;
        if (!callback) {
            return new Promise((resolve, reject) => {
                cb = (error, version) => error ? reject(error) : resolve(version !== -1);
                this.head(name, cb);
            });
        }
        cb = (error, version) => error ? callback(error, null) : callback(null, version !== -1);
        this.head(name, cb);
    }
    head(name, callback) {
        if (typeof name !== 'string' || name.length === 0) {
            throw new Error('invalid argument: name');
        }
        if (callback !== undefined && typeof callback !== 'function') {
            throw new Error('invalid argument: callback');
        }
        const recordCore = this.recordCores.get(name);
        if (recordCore) {
            if (callback) {
                recordCore.whenReady(null, () => {
                    callback(null, recordCore.version);
                });
            }
            else {
                return new Promise((resolve, reject) => {
                    recordCore.whenReady(null, () => {
                        resolve(recordCore.version);
                    });
                });
            }
            return;
        }
        if (callback) {
            this.recordServices.headRegistry.request(name, { callback });
        }
        else {
            return new Promise((resolve, reject) => {
                this.recordServices.headRegistry.request(name, { resolve, reject });
            });
        }
    }
    setDataWithAck(recordName, ...rest) {
        const args = utils.normalizeSetArguments(arguments, 1);
        if (!args.callback) {
            return new Promise((resolve, reject) => {
                args.callback = error => error === null ? resolve() : reject(error);
                this.sendSetData(recordName, args);
            });
        }
        this.sendSetData(recordName, args);
    }
    setData(recordName) {
        const args = utils.normalizeSetArguments(arguments, 1);
        this.sendSetData(recordName, args);
    }
    sendSetData(recordName, args) {
        const { path, data, callback } = args;
        if (!recordName || typeof recordName !== 'string' || recordName.length === 0) {
            throw new Error('invalid argument: recordName must be an non empty string');
        }
        if (!path && (data === null || typeof data !== 'object')) {
            throw new Error('invalid argument: data must be an object when no path is provided');
        }
        const recordCores = this.recordCores.get(recordName);
        if (recordCores) {
            recordCores.set({ path, data, callback });
            return;
        }
        let action;
        if (path) {
            if (data === undefined) {
                action = message_constants_1.RECORD_ACTIONS.ERASE;
            }
            else {
                action = message_constants_1.RECORD_ACTIONS.CREATEANDPATCH;
            }
        }
        else {
            action = message_constants_1.RECORD_ACTIONS.CREATEANDUPDATE;
        }
        const message = {
            topic: message_constants_1.TOPIC.RECORD,
            action,
            name: recordName,
            path,
            version: -1,
            parsedData: data
        };
        if (callback) {
            this.recordServices.writeAckService.send(message, callback);
        }
        else {
            this.services.connection.sendMessage(message);
        }
    }
    /**
     * Will be called by the client for incoming messages on the RECORD topic
     *
     * @param   {Object} message parsed and validated deepstream message
     */
    handle(message) {
        if (message.action === message_constants_1.RECORD_ACTIONS.SUBSCRIPTION_FOR_PATTERN_FOUND ||
            message.action === message_constants_1.RECORD_ACTIONS.SUBSCRIPTION_FOR_PATTERN_REMOVED) {
            this.listener.handle(message);
            return;
        }
        if (utils_1.isWriteAck(message.action) || utils_1.isWriteAck(message.originalAction)) {
            this.recordServices.writeAckService.recieve(message);
            return;
        }
        if (message.action === message_constants_1.RECORD_ACTIONS.READ_RESPONSE || message.originalAction === message_constants_1.RECORD_ACTIONS.READ) {
            if (message.isError) {
                this.recordServices.readRegistry.recieve(message, message_constants_1.RECORD_ACTIONS[message.action]);
            }
            else {
                this.recordServices.readRegistry.recieve(message, null, message.parsedData);
            }
            return;
        }
        if (message.action === message_constants_1.RECORD_ACTIONS.HEAD_RESPONSE ||
            message.originalAction === message_constants_1.RECORD_ACTIONS.HEAD) {
            if (message.isError) {
                this.recordServices.headRegistry.recieve(message, message_constants_1.RECORD_ACTIONS[message.action]);
            }
            else {
                this.recordServices.headRegistry.recieve(message, null, message.version);
            }
        }
        const recordCore = this.recordCores.get(message.name);
        if (recordCore) {
            recordCore.handle(message);
            return;
        }
        if (message.action === message_constants_1.RECORD_ACTIONS.SUBSCRIPTION_HAS_PROVIDER ||
            message.action === message_constants_1.RECORD_ACTIONS.SUBSCRIPTION_HAS_NO_PROVIDER) {
            // record can receive a HAS_PROVIDER after discarding the record
            return;
        }
        if (message.isError) {
            this.services.logger.error(message);
            return;
        }
        this.services.logger.error(message, constants_1.EVENT.UNSOLICITED_MESSAGE);
    }
    /**
     * Callback for 'deleted' and 'discard' events from a record. Removes the record from
     * the registry
     */
    removeRecord(recordName) {
        this.recordCores.delete(recordName);
    }
    getRecordCore(recordName) {
        let recordCore = this.recordCores.get(recordName);
        if (!recordCore) {
            recordCore = new record_core_1.RecordCore(recordName, this.services, this.options, this.recordServices, this.removeRecord.bind(this));
            this.recordCores.set(recordName, recordCore);
        }
        else {
            recordCore.usages++;
        }
        return recordCore;
    }
}
exports.RecordHandler = RecordHandler;
//# sourceMappingURL=record-handler.js.map