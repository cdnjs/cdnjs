"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils = require("../util/utils");
var constants_1 = require("../constants");
var message_constants_1 = require("../../binary-protocol/src/message-constants");
var utils_1 = require("../../binary-protocol/src/utils");
var record_core_1 = require("./record-core");
var record_1 = require("./record");
var anonymous_record_1 = require("./anonymous-record");
var list_1 = require("./list");
var listener_1 = require("../util/listener");
var single_notifier_1 = require("./single-notifier");
var write_ack_service_1 = require("./write-ack-service");
var dirty_service_1 = require("./dirty-service");
var merge_strategy_service_1 = require("./merge-strategy-service");
var bulk_subscription_service_1 = require("../util/bulk-subscription-service");
var RecordHandler = /** @class */ (function () {
    function RecordHandler(services, options, recordServices, listener) {
        var _a;
        this.services = services;
        this.options = options;
        this.listener = listener || new listener_1.Listener(message_constants_1.TOPIC.RECORD, this.services);
        this.recordCores = new Map();
        this.recordServices = recordServices || {
            bulkSubscriptionService: (_a = {},
                _a[message_constants_1.RECORD_ACTIONS.SUBSCRIBECREATEANDREAD_BULK] = this.getBulkSubscriptionService(message_constants_1.RECORD_ACTIONS.SUBSCRIBECREATEANDREAD_BULK, message_constants_1.RECORD_ACTIONS.SUBSCRIBECREATEANDREAD),
                _a[message_constants_1.RECORD_ACTIONS.SUBSCRIBEANDHEAD_BULK] = this.getBulkSubscriptionService(message_constants_1.RECORD_ACTIONS.SUBSCRIBEANDHEAD_BULK, message_constants_1.RECORD_ACTIONS.SUBSCRIBEANDHEAD),
                _a[message_constants_1.RECORD_ACTIONS.SUBSCRIBEANDREAD_BULK] = this.getBulkSubscriptionService(message_constants_1.RECORD_ACTIONS.SUBSCRIBEANDREAD_BULK, message_constants_1.RECORD_ACTIONS.SUBSCRIBEANDREAD),
                _a),
            writeAckService: new write_ack_service_1.WriteAcknowledgementService(services),
            readRegistry: new single_notifier_1.SingleNotifier(services, message_constants_1.RECORD_ACTIONS.READ, options.recordReadTimeout),
            headRegistry: new single_notifier_1.SingleNotifier(services, message_constants_1.RECORD_ACTIONS.HEAD, options.recordReadTimeout),
            dirtyService: new dirty_service_1.DirtyService(services.storage, options.dirtyStorageName),
            mergeStrategy: new merge_strategy_service_1.MergeStrategyService(services, options.mergeStrategy)
        };
        this.dirtyService = this.recordServices.dirtyService;
        this.sendUpdatedData = this.sendUpdatedData.bind(this);
        this.onRecordUpdated = this.onRecordUpdated.bind(this);
        this.onMergeCompleted = this.onMergeCompleted.bind(this);
        this.getRecordCore = this.getRecordCore.bind(this);
        this.removeRecord = this.removeRecord.bind(this);
        this.onBulkSubscriptionSent = this.onBulkSubscriptionSent.bind(this);
        this.services.connection.registerHandler(message_constants_1.TOPIC.RECORD, this.handle.bind(this));
        this.services.connection.onReestablished(this.syncDirtyRecords.bind(this));
        if (this.services.connection.isConnected) {
            this.syncDirtyRecords();
        }
    }
    RecordHandler.prototype.setMergeStrategy = function (recordName, mergeStrategy) {
        if (typeof mergeStrategy === 'function') {
            this.recordServices.mergeStrategy.setMergeStrategyByName(recordName, mergeStrategy);
        }
        else {
            throw new Error('Invalid merge strategy: Must be a Function');
        }
    };
    RecordHandler.prototype.setMergeStrategyRegExp = function (regexp, mergeStrategy) {
        if (typeof mergeStrategy === 'function') {
            this.recordServices.mergeStrategy.setMergeStrategyByPattern(regexp, mergeStrategy);
        }
        else {
            throw new Error('Invalid merge strategy: Must be a Function');
        }
    };
    /**
   * Returns an existing record or creates a new one.
   *
   * @param   {String} name              the unique name of the record
   */
    RecordHandler.prototype.getRecord = function (name) {
        return new record_1.Record(this.getRecordCore(name));
    };
    /**
     * Returns an existing List or creates a new one. A list is a specialised
     * type of record that holds an array of recordNames.
     *
     * @param   {String} name       the unique name of the list
     */
    RecordHandler.prototype.getList = function (name) {
        return new list_1.List(this.getRecordCore(name));
    };
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
    RecordHandler.prototype.getAnonymousRecord = function () {
        return new anonymous_record_1.AnonymousRecord(this.getRecordCore);
    };
    /**
     * Allows to listen for record subscriptions made by this or other clients. This
     * is useful to create "active" data providers, e.g. providers that only provide
     * data for a particular record if a user is actually interested in it
     *
     * @param   {String}   pattern  A combination of alpha numeric characters and wildcards( * )
     * @param   {Function} callback
     */
    RecordHandler.prototype.listen = function (pattern, callback) {
        this.listener.listen(pattern, callback);
    };
    /**
     * Removes a listener that was previously registered with listenForSubscriptions
     *
     * @param   {String}   pattern  A combination of alpha numeric characters and wildcards( * )
     */
    RecordHandler.prototype.unlisten = function (pattern) {
        this.listener.unlisten(pattern);
    };
    RecordHandler.prototype.snapshot = function (name, callback) {
        var _this = this;
        if (typeof name !== 'string' || name.length === 0) {
            throw new Error('invalid argument: name');
        }
        if (callback !== undefined && typeof callback !== 'function') {
            throw new Error('invalid argument: callback');
        }
        var recordCore = this.recordCores.get(name);
        if (recordCore) {
            if (callback) {
                recordCore.whenReady(null, function () {
                    callback(null, recordCore.get());
                });
            }
            else {
                return new Promise(function (resolve, reject) {
                    recordCore.whenReady(null, function () {
                        resolve(recordCore.get());
                    });
                });
            }
            return;
        }
        if (callback) {
            this.recordServices.readRegistry.request(name, callback);
        }
        else {
            return new Promise(function (resolve, reject) {
                _this.recordServices.readRegistry.request(name, function (error, data) { return error ? reject(error) : resolve(data); });
            });
        }
    };
    RecordHandler.prototype.has = function (name, callback) {
        var _this = this;
        if (typeof name !== 'string' || name.length === 0) {
            throw new Error('invalid argument: name');
        }
        if (callback !== undefined && typeof callback !== 'function') {
            throw new Error('invalid argument: callback');
        }
        var cb;
        if (!callback) {
            return new Promise(function (resolve, reject) {
                cb = function (error, version) { return error ? reject(error) : resolve(version !== -1); };
                _this.head(name, cb);
            });
        }
        cb = function (error, version) { return error ? callback(error, null) : callback(null, version !== -1); };
        this.head(name, cb);
    };
    RecordHandler.prototype.head = function (name, callback) {
        var _this = this;
        if (typeof name !== 'string' || name.length === 0) {
            throw new Error('invalid argument: name');
        }
        if (callback !== undefined && typeof callback !== 'function') {
            throw new Error('invalid argument: callback');
        }
        var recordCore = this.recordCores.get(name);
        if (recordCore) {
            if (callback) {
                recordCore.whenReady(null, function () {
                    callback(null, recordCore.version);
                });
            }
            else {
                return new Promise(function (resolve, reject) {
                    recordCore.whenReady(null, function () {
                        resolve(recordCore.version);
                    });
                });
            }
            return;
        }
        if (callback) {
            this.recordServices.headRegistry.request(name, callback);
        }
        else {
            return new Promise(function (resolve, reject) {
                _this.recordServices.headRegistry.request(name, function (error, data) { return error ? reject(error) : resolve(data); });
            });
        }
    };
    RecordHandler.prototype.setDataWithAck = function (recordName) {
        var _this = this;
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        var args = utils.normalizeSetArguments(arguments, 1);
        if (!args.callback) {
            return new Promise(function (resolve, reject) {
                args.callback = function (error) { return error === null ? resolve() : reject(error); };
                _this.sendSetData(recordName, -1, args);
            });
        }
        this.sendSetData(recordName, -1, args);
    };
    RecordHandler.prototype.setData = function (recordName) {
        var args = utils.normalizeSetArguments(arguments, 1);
        this.sendSetData(recordName, -1, args);
    };
    RecordHandler.prototype.sendSetData = function (recordName, version, args) {
        var path = args.path, data = args.data, callback = args.callback;
        if (!recordName || typeof recordName !== 'string' || recordName.length === 0) {
            throw new Error('invalid argument: recordName must be an non empty string');
        }
        if (!path && (data === null || typeof data !== 'object')) {
            throw new Error('invalid argument: data must be an object when no path is provided');
        }
        var recordCores = this.recordCores.get(recordName);
        if (recordCores) {
            recordCores.set({ path: path, data: data, callback: callback });
            return;
        }
        var action;
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
        var message = {
            topic: message_constants_1.TOPIC.RECORD,
            action: action,
            name: recordName,
            path: path,
            version: version,
            parsedData: data
        };
        if (callback) {
            this.recordServices.writeAckService.send(message, callback);
        }
        else {
            this.services.connection.sendMessage(message);
        }
    };
    /**
     * Will be called by the client for incoming messages on the RECORD topic
     *
     * @param   {Object} message parsed and validated deepstream message
     */
    RecordHandler.prototype.handle = function (message) {
        if (message.isAck) {
            this.services.timeoutRegistry.remove(message);
            return;
        }
        if (message.action === message_constants_1.RECORD_ACTIONS.SUBSCRIPTION_FOR_PATTERN_FOUND ||
            message.action === message_constants_1.RECORD_ACTIONS.SUBSCRIPTION_FOR_PATTERN_REMOVED ||
            message.action === message_constants_1.RECORD_ACTIONS.LISTEN ||
            message.action === message_constants_1.RECORD_ACTIONS.UNLISTEN) {
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
        var recordCore = this.recordCores.get(message.name);
        if (recordCore) {
            recordCore.handle(message);
            return;
        }
        if (message.action === message_constants_1.RECORD_ACTIONS.VERSION_EXISTS) {
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
    };
    /**
     * Callback for 'deleted' and 'discard' events from a record. Removes the record from
     * the registry
     */
    RecordHandler.prototype.removeRecord = function (recordName) {
        this.recordCores.delete(recordName);
    };
    RecordHandler.prototype.getRecordCore = function (recordName) {
        var recordCore = this.recordCores.get(recordName);
        if (!recordCore) {
            recordCore = new record_core_1.RecordCore(recordName, this.services, this.options, this.recordServices, this.removeRecord);
            this.recordCores.set(recordName, recordCore);
        }
        return recordCore;
    };
    RecordHandler.prototype.syncDirtyRecords = function () {
        this.dirtyService.whenLoaded(this, this._syncDirtyRecords);
    };
    // TODO: Expose issues here, as there isn't a reason why a record core needs to exist in
    // order to sync up
    RecordHandler.prototype._syncDirtyRecords = function () {
        var dirtyRecords = this.dirtyService.getAll();
        for (var recordName in dirtyRecords) {
            var recordCore = this.recordCores.get(recordName);
            if (recordCore && recordCore.references.size > 0) {
                // if it isn't zero.. problem.
                continue;
            }
            this.services.storage.get(recordName, this.sendUpdatedData);
        }
    };
    RecordHandler.prototype.sendUpdatedData = function (recordName, version, data) {
        this.sendSetData(recordName, version, { data: data, callback: this.onRecordUpdated });
    };
    RecordHandler.prototype.onRecordUpdated = function (error, recordName) {
        if (!error) {
            this.dirtyService.setDirty(recordName, false);
        }
    };
    /**
    * Callback once the record merge has completed. If successful it will set the
    * record state, else emit and error and the record will remain in an
    * inconsistent state until the next update.
    */
    // private onMergeConflict (message: RecordWriteMessage): void {
    //   this.services.storage.get(message.name, (recordName: string, version: number, data: RecordData) => {
    //     this.recordServices.mergeStrategy.merge(
    //       message.name,
    //       version,
    //       data,
    //       message.version,
    //       message.parsedData,
    //       this.onMergeCompleted
    //     )
    //   })
    // }
    RecordHandler.prototype.onMergeCompleted = function (error, recordName, mergeData, remoteVersion, remoteData) {
        this.sendSetData(recordName, remoteVersion + 1, { data: mergeData });
    };
    RecordHandler.prototype.getBulkSubscriptionService = function (bulkSubscribe, subscribe) {
        return new bulk_subscription_service_1.BulkSubscriptionService(this.services, this.options.subscriptionInterval, message_constants_1.TOPIC.RECORD, bulkSubscribe, subscribe, message_constants_1.RECORD_ACTIONS.UNSUBSCRIBE_BULK, message_constants_1.RECORD_ACTIONS.UNSUBSCRIBE, this.onBulkSubscriptionSent);
    };
    RecordHandler.prototype.onBulkSubscriptionSent = function (message) {
        if (!message.names) {
            this.services.timeoutRegistry.add({ message: message });
        }
    };
    return RecordHandler;
}());
exports.RecordHandler = RecordHandler;
