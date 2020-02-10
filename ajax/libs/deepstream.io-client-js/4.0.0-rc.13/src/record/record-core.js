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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../constants");
var message_constants_1 = require("../../binary-protocol/src/message-constants");
var json_path_1 = require("./json-path");
var Emitter = require("component-emitter2");
var utils = require("../util/utils");
var state_machine_1 = require("../util/state-machine");
var RecordCore = /** @class */ (function (_super) {
    __extends(RecordCore, _super);
    function RecordCore(name, services, options, recordServices, whenComplete) {
        var _this = _super.call(this) || this;
        _this.name = name;
        _this.services = services;
        _this.options = options;
        _this.recordServices = recordServices;
        _this.whenComplete = whenComplete;
        _this.readyCallbacks = [];
        _this.emitter = new Emitter();
        _this.data = Object.create(null);
        _this.references = 1;
        _this.hasProvider = false;
        _this.pendingWrites = [];
        _this.isReady = false;
        _this.offlineLoadingAborted = false;
        _this.version = null;
        _this.responseTimeout = null;
        _this.discardTimeout = null;
        _this.deletedTimeout = null;
        _this.readyTimer = -1;
        _this.deleteResponse = null;
        if (typeof name !== 'string' || name.length === 0) {
            throw new Error('invalid argument name');
        }
        _this.onConnectionLost = _this.onConnectionLost.bind(_this);
        _this.onConnectionReestablished = _this.onConnectionReestablished.bind(_this);
        _this.stateMachine = new state_machine_1.StateMachine(_this.services.logger, {
            init: "INITIAL" /* INITIAL */,
            context: _this,
            onStateChanged: _this.onStateChanged,
            transitions: recordStateTransitions
        });
        _this.recordServices.dirtyService.whenLoaded(_this, _this.onDirtyServiceLoaded);
        return _this;
    }
    Object.defineProperty(RecordCore.prototype, "recordState", {
        get: function () {
            return this.stateMachine.state;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecordCore.prototype, "usages", {
        get: function () {
            return this.references;
        },
        set: function (usages) {
            this.references = usages;
            if (this.references === 1) {
                this.services.timeoutRegistry.clear(this.discardTimeout);
                this.services.timerRegistry.remove(this.readyTimer);
                this.stateMachine.transition(message_constants_1.RECORD_ACTIONS.SUBSCRIBE);
            }
        },
        enumerable: true,
        configurable: true
    });
    RecordCore.prototype.onDirtyServiceLoaded = function () {
        var _this = this;
        if (this.services.connection.isConnected) {
            this.services.storage.get(this.name, function (recordName, version, data) {
                if (version === -1 && !_this.recordServices.dirtyService.isDirty(_this.name)) {
                    /**
                     * Record has never been created before
                     */
                    _this.stateMachine.transition(message_constants_1.RECORD_ACTIONS.SUBSCRIBECREATEANDREAD);
                }
                else {
                    _this.version = version;
                    _this.data = data;
                    _this.stateMachine.transition("RESUBSCRIBE" /* RESUBSCRIBE */);
                }
            });
        }
        else {
            this.stateMachine.transition("LOAD" /* LOAD */);
        }
        this.services.connection.onReestablished(this.onConnectionReestablished);
        this.services.connection.onLost(this.onConnectionLost);
    };
    RecordCore.prototype.onStateChanged = function (newState, oldState) {
        this.emitter.emit(constants_1.EVENT.RECORD_STATE_CHANGED, newState);
    };
    RecordCore.prototype.whenReady = function (context, callback) {
        var _this = this;
        if (callback) {
            this.whenReadyInternal(context, function (realContext) {
                callback(realContext);
            });
            return;
        }
        return new Promise(function (resolve) { return _this.whenReadyInternal(context, function () { return resolve(context); }); });
    };
    /**
   */
    RecordCore.prototype.whenReadyInternal = function (context, callback) {
        if (this.isReady === true) {
            callback(context);
            return;
        }
        if (callback) {
            this.readyCallbacks.push({ callback: callback, context: context });
        }
    };
    /**
   * Sets the value of either the entire dataset
   * or of a specific path within the record
   * and submits the changes to the server
   *
   * If the new data is equal to the current data, nothing will happen
   *
   * @param {[String|Object]} pathOrData Either a JSON path when called with
   *                                     two arguments or the data itself
   * @param {Object} data     The data that should be stored in the record
   */
    RecordCore.prototype.set = function (_a) {
        var _this = this;
        var path = _a.path, data = _a.data, callback = _a.callback;
        if (!path && (data === null || typeof data !== 'object')) {
            throw new Error('invalid arguments, scalar values cannot be set without path');
        }
        if (this.checkDestroyed('set')) {
            return;
        }
        if (this.isReady === false) {
            this.pendingWrites.push({ path: path, data: data, callback: callback });
            return;
        }
        var oldValue = this.data;
        var newValue = json_path_1.setValue(oldValue, path || null, data);
        if (oldValue === newValue) {
            if (callback) {
                this.services.timerRegistry.requestIdleCallback(function () { return callback(null, _this.name); });
            }
            return;
        }
        this.applyChange(newValue);
        if (this.services.connection.isConnected) {
            this.sendUpdate(path, data, callback);
        }
        else {
            if (callback) {
                callback(constants_1.EVENT.CLIENT_OFFLINE, this.name);
            }
            this.saveUpdate();
        }
    };
    /**
     * Wrapper function around the record.set that returns a promise
     * if no callback is supplied.
     * @returns {Promise} if a callback is omitted a Promise is returned with the result of the write
     */
    RecordCore.prototype.setWithAck = function (args) {
        var _this = this;
        if (args.callback) {
            this.set(args);
            return;
        }
        return new Promise(function (resolve, reject) {
            args.callback = function (error) { return error === null ? resolve() : reject(error); };
            _this.set(args);
        });
    };
    /**
   * Returns a copy of either the entire dataset of the record
   * or - if called with a path - the value of that path within
   * the record's dataset.
   *
   * Returning a copy rather than the actual value helps to prevent
   * the record getting out of sync due to unintentional changes to
   * its data
   */
    RecordCore.prototype.get = function (path) {
        return json_path_1.get(this.data, path || null, this.options.recordDeepCopy);
    };
    /**
   * Subscribes to changes to the records dataset.
   *
   * Callback is the only mandatory argument.
   *
   * When called with a path, it will only subscribe to updates
   * to that path, rather than the entire record
   *
   * If called with true for triggerNow, the callback will
   * be called immediatly with the current value
   */
    RecordCore.prototype.subscribe = function (args) {
        var _this = this;
        if (args.path !== undefined && (typeof args.path !== 'string' || args.path.length === 0)) {
            throw new Error('invalid argument path');
        }
        if (typeof args.callback !== 'function') {
            throw new Error('invalid argument callback');
        }
        if (this.checkDestroyed('subscribe')) {
            return;
        }
        if (args.triggerNow) {
            this.whenReadyInternal(null, function () {
                _this.emitter.on(args.path || '', args.callback);
                args.callback(_this.get(args.path));
            });
        }
        else {
            this.emitter.on(args.path || '', args.callback);
        }
    };
    /**
     * Removes a subscription that was previously made using record.subscribe()
     *
     * Can be called with a path to remove the callback for this specific
     * path or only with a callback which removes it from the generic subscriptions
     *
     * Please Note: unsubscribe is a purely client side operation. If the app is no longer
     * interested in receiving updates for this record from the server it needs to call
     * discard instead
     *
     * @param   {String}           path  A JSON path
     * @param   {Function}         callback     The callback method. Please note, if a bound
     *                                          method was passed to subscribe, the same method
     *                                          must be passed to unsubscribe as well.
     */
    RecordCore.prototype.unsubscribe = function (args) {
        if (args.path !== undefined && (typeof args.path !== 'string' || args.path.length === 0)) {
            throw new Error('invalid argument path');
        }
        if (args.callback !== undefined && typeof args.callback !== 'function') {
            throw new Error('invalid argument callback');
        }
        if (this.checkDestroyed('unsubscribe')) {
            return;
        }
        this.emitter.off(args.path || '', args.callback);
    };
    /**
    * Removes all change listeners and notifies the server that the client is
    * no longer interested in updates for this record
    */
    RecordCore.prototype.discard = function () {
        var _this = this;
        if (this.checkDestroyed('discard')) {
            return;
        }
        this.whenReadyInternal(null, function () {
            _this.references--;
            if (_this.references <= 0) {
                _this.readyTimer = _this.services.timerRegistry.add({
                    duration: _this.options.recordReadTimeout,
                    callback: _this.stateMachine.transition,
                    context: _this.stateMachine,
                    data: message_constants_1.RECORD_ACTIONS.UNSUBSCRIBE_ACK
                });
            }
        });
        this.stateMachine.transition(message_constants_1.RECORD_ACTIONS.UNSUBSCRIBE);
    };
    /**
     * Deletes the record on the server.
     */
    RecordCore.prototype.delete = function (callback) {
        var _this = this;
        if (!this.services.connection.isConnected) {
            // this.services.logger.warn({ topic: TOPIC.RECORD }, RA.DELETE, 'Deleting while offline is not supported')
            if (callback) {
                this.services.timerRegistry.requestIdleCallback(function () {
                    callback('Deleting while offline is not supported');
                });
                return;
            }
            return Promise.reject('Deleting while offline is not supported');
        }
        if (this.checkDestroyed('delete')) {
            return;
        }
        this.stateMachine.transition(message_constants_1.RECORD_ACTIONS.DELETE);
        if (callback && typeof callback === 'function') {
            this.deleteResponse = { callback: callback };
            this.sendDelete();
        }
        else {
            return new Promise(function (resolve, reject) {
                _this.deleteResponse = { resolve: resolve, reject: reject };
                _this.sendDelete();
            });
        }
    };
    /**
     * Set a merge strategy to resolve any merge conflicts that may occur due
     * to offline work or write conflicts. The function will be called with the
     * local record, the remote version/data and a callback to call once the merge has
     * completed or if an error occurs ( which leaves it in an inconsistent state until
     * the next update merge attempt ).
     */
    RecordCore.prototype.setMergeStrategy = function (mergeStrategy) {
        this.recordServices.mergeStrategy.setMergeStrategyByName(this.name, mergeStrategy);
    };
    RecordCore.prototype.saveRecordToOffline = function () {
        this.services.storage.set(this.name, this.version, this.data, function () { });
    };
    /**
     * Transition States
     */
    RecordCore.prototype.onSubscribing = function () {
        this.recordServices.readRegistry.register(this.name, this, this.handleReadResponse);
        this.responseTimeout = this.services.timeoutRegistry.add({
            message: {
                topic: message_constants_1.TOPIC.RECORD,
                action: message_constants_1.RECORD_ACTIONS.READ_RESPONSE,
                name: this.name
            }
        });
        this.recordServices.bulkSubscriptionService[message_constants_1.RECORD_ACTIONS.SUBSCRIBECREATEANDREAD_BULK].subscribe(this.name);
    };
    RecordCore.prototype.onResubscribing = function () {
        this.services.timerRegistry.remove(this.readyTimer);
        this.recordServices.headRegistry.register(this.name, this, this.handleHeadResponse);
        this.responseTimeout = this.services.timeoutRegistry.add({
            message: {
                topic: message_constants_1.TOPIC.RECORD,
                action: message_constants_1.RECORD_ACTIONS.HEAD,
                name: this.name
            }
        });
        this.recordServices.bulkSubscriptionService[message_constants_1.RECORD_ACTIONS.SUBSCRIBEANDHEAD_BULK].subscribe(this.name);
    };
    RecordCore.prototype.onOfflineLoading = function () {
        var _this = this;
        this.services.storage.get(this.name, function (recordName, version, data) {
            if (version === -1) {
                if (_this.offlineLoadingAborted) {
                    // This occurred since we got a connection to the server
                    // meaning we no longer care about current state currently
                    _this.offlineLoadingAborted = false;
                    return;
                }
                _this.data = {};
                _this.version = 1;
                // We do this sync in order to avoid the possibility of a race condition
                // where connection is established while we are saving. We could introduce
                // another transition but its probably overkill since we only set this
                // in order to allow the possibility of this record being retrieved in the
                // future to know its been created
                _this.services.storage.set(_this.name, _this.version, _this.data, function (error) { });
                _this.stateMachine.transition("LOADED" /* LOADED */);
            }
            else {
                _this.data = data;
                _this.version = version;
                _this.stateMachine.transition("LOADED" /* LOADED */);
            }
        });
    };
    RecordCore.prototype.abortOfflineLoading = function () {
        this.offlineLoadingAborted = true;
        this.onResubscribing();
    };
    RecordCore.prototype.onReady = function () {
        this.services.timeoutRegistry.clear(this.responseTimeout);
        this.applyPendingWrites();
        this.isReady = true;
        this.readyCallbacks.forEach(function (_a) {
            var context = _a.context, callback = _a.callback;
            callback.call(context, context);
        });
    };
    RecordCore.prototype.applyPendingWrites = function () {
        var _this = this;
        var writeCallbacks = [];
        var oldData = this.data;
        var newData = oldData;
        for (var i = 0; i < this.pendingWrites.length; i++) {
            var _a = this.pendingWrites[i], callback = _a.callback, path = _a.path, data = _a.data;
            if (callback) {
                writeCallbacks.push(callback);
            }
            newData = json_path_1.setValue(newData, path || null, data);
        }
        this.pendingWrites = [];
        this.applyChange(newData);
        var runFns = function (err) {
            for (var i = 0; i < writeCallbacks.length; i++) {
                writeCallbacks[i](err, _this.name);
            }
        };
        if (utils.deepEquals(oldData, newData)) {
            runFns(null);
            return;
        }
        if (this.services.connection.isConnected) {
            this.sendUpdate(null, newData, runFns);
        }
        else {
            runFns(constants_1.EVENT.CLIENT_OFFLINE);
            this.saveUpdate();
        }
    };
    RecordCore.prototype.onUnsubscribed = function () {
        if (this.services.connection.isConnected) {
            var message = {
                topic: message_constants_1.TOPIC.RECORD,
                action: message_constants_1.RECORD_ACTIONS.UNSUBSCRIBE,
                name: this.name
            };
            this.discardTimeout = this.services.timeoutRegistry.add({ message: message });
            this.services.connection.sendMessage(message);
        }
        this.emit(constants_1.EVENT.RECORD_DISCARDED);
        this.destroy();
    };
    RecordCore.prototype.onDeleted = function () {
        this.emit(constants_1.EVENT.RECORD_DELETED);
        this.destroy();
    };
    RecordCore.prototype.handle = function (message) {
        if (message.action === message_constants_1.RECORD_ACTIONS.PATCH || message.action === message_constants_1.RECORD_ACTIONS.UPDATE || message.action === message_constants_1.RECORD_ACTIONS.ERASE) {
            if (this.stateMachine.state === "MERGING" /* MERGING */) {
                // The scenario this covers is when a read is requested because the head doesn't match
                // but an updated comes in because we subscribed. In that scenario we just ignore the update
                // and wait for the read response. Hopefully the messages don't cross on the wire in which case
                // it might result in another merge conflict.
                return;
            }
            this.applyUpdate(message);
            return;
        }
        if (message.action === message_constants_1.RECORD_ACTIONS.DELETE_SUCCESS) {
            this.services.timeoutRegistry.clear(this.deletedTimeout);
            this.stateMachine.transition(message_constants_1.RECORD_ACTIONS.DELETE_SUCCESS);
            if (this.deleteResponse.callback) {
                this.deleteResponse.callback(null);
            }
            else if (this.deleteResponse.resolve) {
                this.deleteResponse.resolve();
            }
            return;
        }
        if (message.action === message_constants_1.RECORD_ACTIONS.DELETED) {
            this.stateMachine.transition(message_constants_1.RECORD_ACTIONS.DELETED);
            return;
        }
        if (message.action === message_constants_1.RECORD_ACTIONS.VERSION_EXISTS) {
            // what kind of message is version exists?
            // this.recoverRecord(message)
            return;
        }
        if (message.action === message_constants_1.RECORD_ACTIONS.MESSAGE_DENIED ||
            message.action === message_constants_1.RECORD_ACTIONS.MESSAGE_PERMISSION_ERROR) {
            if (message.originalAction === message_constants_1.RECORD_ACTIONS.SUBSCRIBECREATEANDREAD ||
                message.originalAction === message_constants_1.RECORD_ACTIONS.SUBSCRIBEANDHEAD ||
                message.originalAction === message_constants_1.RECORD_ACTIONS.SUBSCRIBEANDREAD) {
                var subscribeMsg = __assign({}, message, { originalAction: message_constants_1.RECORD_ACTIONS.SUBSCRIBE });
                var actionMsg = __assign({}, message, { originalAction: message.originalAction === message_constants_1.RECORD_ACTIONS.SUBSCRIBECREATEANDREAD ? message_constants_1.RECORD_ACTIONS.READ_RESPONSE : message_constants_1.RECORD_ACTIONS.HEAD_RESPONSE });
                this.services.timeoutRegistry.remove(subscribeMsg); // TODO: This doesn't contain correlationIds
                this.services.timeoutRegistry.remove(actionMsg);
            }
            this.emit(constants_1.EVENT.RECORD_ERROR, message_constants_1.RECORD_ACTIONS[message_constants_1.RECORD_ACTIONS.MESSAGE_DENIED], message_constants_1.RECORD_ACTIONS[message.originalAction]);
            if (message.originalAction === message_constants_1.RECORD_ACTIONS.DELETE) {
                if (this.deleteResponse.callback) {
                    this.deleteResponse.callback(message_constants_1.RECORD_ACTIONS[message_constants_1.RECORD_ACTIONS.MESSAGE_DENIED]);
                }
                else if (this.deleteResponse.reject) {
                    this.deleteResponse.reject(message_constants_1.RECORD_ACTIONS[message_constants_1.RECORD_ACTIONS.MESSAGE_DENIED]);
                }
            }
            return;
        }
        if (message.action === message_constants_1.RECORD_ACTIONS.SUBSCRIPTION_HAS_PROVIDER ||
            message.action === message_constants_1.RECORD_ACTIONS.SUBSCRIPTION_HAS_NO_PROVIDER) {
            this.hasProvider = message.action === message_constants_1.RECORD_ACTIONS.SUBSCRIPTION_HAS_PROVIDER;
            this.emit(constants_1.EVENT.RECORD_HAS_PROVIDER_CHANGED, this.hasProvider);
            return;
        }
    };
    RecordCore.prototype.handleReadResponse = function (message) {
        if (this.stateMachine.state === "MERGING" /* MERGING */) {
            this.recoverRecord(message.version, message.parsedData, message);
            this.recordServices.dirtyService.setDirty(this.name, false);
            return;
        }
        this.version = message.version;
        this.stateMachine.transition(message_constants_1.RECORD_ACTIONS.READ_RESPONSE);
        this.applyChange(json_path_1.setValue(this.data, null, message.parsedData));
    };
    RecordCore.prototype.handleHeadResponse = function (message) {
        var remoteVersion = message.version;
        if (this.recordServices.dirtyService.isDirty(this.name)) {
            if (remoteVersion === -1 && this.version === 1) {
                /**
                 * Record created while offline
                 */
                this.stateMachine.transition("SUBSCRIBED" /* SUBSCRIBED */);
                this.sendCreateUpdate(this.data);
            }
            else if (this.version === remoteVersion + 1) {
                /**
                 * record updated by client while offline
                */
                this.stateMachine.transition("RESUBSCRIBED" /* RESUBSCRIBED */);
                this.sendUpdate(null, this.data);
            }
            else {
                /**
                 * record updated by server when offline, get latest data
                 */
                this.stateMachine.transition("INVALID_VERSION" /* INVALID_VERSION */);
                this.sendRead();
                this.recordServices.readRegistry.register(this.name, this, this.handleReadResponse);
            }
        }
        else {
            if (this.version === remoteVersion) {
                this.stateMachine.transition("RESUBSCRIBED" /* RESUBSCRIBED */);
            }
            else {
                if (remoteVersion < this.version) {
                    /**
                     *  deleted and created again remotely, up to merge conflict I guess
                     */
                }
                this.stateMachine.transition("INVALID_VERSION" /* INVALID_VERSION */);
                this.sendRead();
                this.recordServices.readRegistry.register(this.name, this, this.handleReadResponse);
            }
        }
    };
    RecordCore.prototype.sendRead = function () {
        this.services.connection.sendMessage({
            topic: message_constants_1.TOPIC.RECORD,
            action: message_constants_1.RECORD_ACTIONS.READ,
            name: this.name
        });
    };
    RecordCore.prototype.saveUpdate = function () {
        if (!this.recordServices.dirtyService.isDirty(this.name)) {
            this.version++;
            this.recordServices.dirtyService.setDirty(this.name, true);
        }
        this.saveRecordToOffline();
    };
    RecordCore.prototype.sendUpdate = function (path, data, callback) {
        if (path === void 0) { path = null; }
        if (this.recordServices.dirtyService.isDirty(this.name)) {
            this.recordServices.dirtyService.setDirty(this.name, false);
        }
        else {
            this.version++;
        }
        var message = {
            topic: message_constants_1.TOPIC.RECORD,
            version: this.version,
            name: this.name
        };
        if (path) {
            if (data === undefined) {
                Object.assign(message, { action: message_constants_1.RECORD_ACTIONS.ERASE, path: path });
            }
            else {
                Object.assign(message, { action: message_constants_1.RECORD_ACTIONS.PATCH, path: path, parsedData: data });
            }
        }
        else {
            Object.assign(message, { action: message_constants_1.RECORD_ACTIONS.UPDATE, parsedData: data });
        }
        if (callback) {
            this.recordServices.writeAckService.send(message, callback);
        }
        else {
            this.services.connection.sendMessage(message);
        }
    };
    RecordCore.prototype.sendCreateUpdate = function (data) {
        this.services.connection.sendMessage({
            name: this.name,
            topic: message_constants_1.TOPIC.RECORD,
            action: message_constants_1.RECORD_ACTIONS.CREATEANDUPDATE,
            version: 1,
            parsedData: data
        });
        this.recordServices.dirtyService.setDirty(this.name, false);
    };
    /**
     * Applies incoming updates and patches to the record's dataset
     */
    RecordCore.prototype.applyUpdate = function (message) {
        var version = message.version;
        var data = message.parsedData;
        if (this.version === null) {
            this.version = version;
        }
        else if (this.version + 1 !== version) {
            this.stateMachine.transition("INVALID_VERSION" /* INVALID_VERSION */);
            if (message.action === message_constants_1.RECORD_ACTIONS.PATCH) {
                /**
                * Request a snapshot so that a merge can be done with the read reply which contains
                * the full state of the record
                **/
                this.sendRead();
            }
            else {
                // @ts-ignore
                this.recoverRecord(message.version, data, message);
            }
            return;
        }
        this.version = version;
        var newData;
        if (message.action === message_constants_1.RECORD_ACTIONS.PATCH) {
            newData = json_path_1.setValue(this.data, message.path, data);
        }
        else if (message.action === message_constants_1.RECORD_ACTIONS.ERASE) {
            newData = json_path_1.setValue(this.data, message.path, undefined);
        }
        else {
            newData = json_path_1.setValue(this.data, null, data);
        }
        this.applyChange(newData);
    };
    /**
     * Compares the new values for every path with the previously stored ones and
     * updates the subscribers if the value has changed
     */
    RecordCore.prototype.applyChange = function (newData) {
        if (this.stateMachine.inEndState) {
            return;
        }
        var oldData = this.data;
        this.data = newData;
        var paths = this.emitter.eventNames();
        for (var i = 0; i < paths.length; i++) {
            var newValue = json_path_1.get(newData, paths[i], false);
            var oldValue = json_path_1.get(oldData, paths[i], false);
            if (newValue !== oldValue) {
                this.emitter.emit(paths[i], this.get(paths[i]));
            }
        }
    };
    /**
     * If connected sends the delete message to server, otherwise
     * we delete in local storage and transition to delete success.
     */
    RecordCore.prototype.sendDelete = function () {
        var _this = this;
        this.whenReadyInternal(null, function () {
            if (_this.services.connection.isConnected) {
                var message = {
                    topic: message_constants_1.TOPIC.RECORD,
                    action: message_constants_1.RECORD_ACTIONS.DELETE,
                    name: _this.name
                };
                _this.deletedTimeout = _this.services.timeoutRegistry.add({
                    message: message,
                    event: constants_1.EVENT.RECORD_DELETE_TIMEOUT,
                    duration: _this.options.recordDeleteTimeout
                });
                _this.services.connection.sendMessage(message);
            }
            else {
                _this.services.storage.delete(_this.name, function () {
                    _this.services.timerRegistry.requestIdleCallback(function () {
                        _this.stateMachine.transition(message_constants_1.RECORD_ACTIONS.DELETE_SUCCESS);
                    });
                });
            }
        });
    };
    /**
     * Called when a merge conflict is detected by a VERSION_EXISTS error or if an update recieved
     * is directly after the clients. If no merge strategy is configure it will emit a VERSION_EXISTS
     * error and the record will remain in an inconsistent state.
     *
     * @param   {Number} remoteVersion The remote version number
     * @param   {Object} remoteData The remote object data
     * @param   {Object} message parsed and validated deepstream message
     */
    RecordCore.prototype.recoverRecord = function (remoteVersion, remoteData, message) {
        this.recordServices.mergeStrategy.merge(this.name, this.version, this.get(), remoteVersion, remoteData, this.onRecordRecovered, this);
    };
    /**
   * Callback once the record merge has completed. If successful it will set the
   * record state, else emit and error and the record will remain in an
   * inconsistent state until the next update.
   */
    RecordCore.prototype.onRecordRecovered = function (error, recordName, mergedData, remoteVersion, remoteData) {
        if (error) {
            this.services.logger.error({ topic: message_constants_1.TOPIC.RECORD }, constants_1.EVENT.RECORD_VERSION_EXISTS);
        }
        this.version = remoteVersion;
        var oldValue = this.data;
        if (utils.deepEquals(oldValue, remoteData)) {
            this.stateMachine.transition("MERGED" /* MERGED */);
            return;
        }
        var newValue = json_path_1.setValue(oldValue, null, mergedData);
        this.stateMachine.transition("MERGED" /* MERGED */);
        if (utils.deepEquals(mergedData, remoteData)) {
            this.applyChange(mergedData);
            // const callback = this.writeCallbacks.get(remoteVersion)
            // if (callback !== undefined) {
            //   callback(null)
            //   this.writeCallbacks.delete(remoteVersion)
            // }
        }
        else {
            this.applyChange(newValue);
            // this.sendUpdate(null, data, message.isWriteAck)
        }
    };
    /**
   * A quick check that's carried out by most methods that interact with the record
   * to make sure it hasn't been destroyed yet - and to handle it gracefully if it has.
   */
    RecordCore.prototype.checkDestroyed = function (methodName) {
        if (this.stateMachine.inEndState) {
            this.services.logger.error({ topic: message_constants_1.TOPIC.RECORD }, constants_1.EVENT.RECORD_ALREADY_DESTROYED, { methodName: methodName });
            return true;
        }
        return false;
    };
    /**
     * Destroys the record and nulls all
     * its dependencies
     */
    RecordCore.prototype.destroy = function () {
        this.services.timerRegistry.remove(this.readyTimer);
        this.services.timeoutRegistry.clear(this.responseTimeout);
        this.services.timeoutRegistry.clear(this.deletedTimeout);
        this.services.timeoutRegistry.clear(this.discardTimeout);
        this.services.connection.removeOnReestablished(this.onConnectionReestablished);
        this.services.connection.removeOnLost(this.onConnectionLost);
        this.emitter.off();
        this.isReady = false;
        this.whenComplete(this.name);
    };
    RecordCore.prototype.onConnectionReestablished = function () {
        this.stateMachine.transition("RESUBSCRIBE" /* RESUBSCRIBE */);
    };
    RecordCore.prototype.onConnectionLost = function () {
        this.saveRecordToOffline();
    };
    return RecordCore;
}(Emitter));
exports.RecordCore = RecordCore;
var recordStateTransitions = [
    { name: message_constants_1.RECORD_ACTIONS.SUBSCRIBECREATEANDREAD, from: "INITIAL" /* INITIAL */, to: "SUBSCRIBING" /* SUBSCRIBING */, handler: RecordCore.prototype.onSubscribing },
    { name: "LOAD" /* LOAD */, from: "INITIAL" /* INITIAL */, to: "LOADING_OFFLINE" /* LOADING_OFFLINE */, handler: RecordCore.prototype.onOfflineLoading },
    { name: "LOADED" /* LOADED */, from: "LOADING_OFFLINE" /* LOADING_OFFLINE */, to: "READY" /* READY */, handler: RecordCore.prototype.onReady },
    { name: "RESUBSCRIBE" /* RESUBSCRIBE */, from: "LOADING_OFFLINE" /* LOADING_OFFLINE */, to: "RESUBSCRIBING" /* RESUBSCRIBING */, handler: RecordCore.prototype.abortOfflineLoading },
    { name: message_constants_1.RECORD_ACTIONS.READ_RESPONSE, from: "SUBSCRIBING" /* SUBSCRIBING */, to: "READY" /* READY */, handler: RecordCore.prototype.onReady },
    { name: "SUBSCRIBED" /* SUBSCRIBED */, from: "RESUBSCRIBING" /* RESUBSCRIBING */, to: "READY" /* READY */ },
    { name: "RESUBSCRIBE" /* RESUBSCRIBE */, from: "INITIAL" /* INITIAL */, to: "RESUBSCRIBING" /* RESUBSCRIBING */, handler: RecordCore.prototype.onResubscribing },
    { name: "RESUBSCRIBE" /* RESUBSCRIBE */, from: "READY" /* READY */, to: "RESUBSCRIBING" /* RESUBSCRIBING */, handler: RecordCore.prototype.onResubscribing },
    { name: "RESUBSCRIBE" /* RESUBSCRIBE */, from: "UNSUBSCRIBING" /* UNSUBSCRIBING */, to: "RESUBSCRIBING" /* RESUBSCRIBING */, handler: RecordCore.prototype.onResubscribing },
    { name: "RESUBSCRIBED" /* RESUBSCRIBED */, from: "RESUBSCRIBING" /* RESUBSCRIBING */, to: "READY" /* READY */ },
    { name: "INVALID_VERSION" /* INVALID_VERSION */, from: "RESUBSCRIBING" /* RESUBSCRIBING */, to: "MERGING" /* MERGING */ },
    { name: "MERGED" /* MERGED */, from: "MERGING" /* MERGING */, to: "READY" /* READY */ },
    { name: message_constants_1.RECORD_ACTIONS.DELETE, from: "READY" /* READY */, to: "DELETING" /* DELETING */ },
    { name: message_constants_1.RECORD_ACTIONS.DELETED, from: "READY" /* READY */, to: "DELETED" /* DELETED */, handler: RecordCore.prototype.onDeleted },
    { name: message_constants_1.RECORD_ACTIONS.DELETE_SUCCESS, from: "DELETING" /* DELETING */, to: "DELETED" /* DELETED */, handler: RecordCore.prototype.onDeleted },
    { name: message_constants_1.RECORD_ACTIONS.UNSUBSCRIBE, from: "READY" /* READY */, to: "UNSUBSCRIBING" /* UNSUBSCRIBING */ },
    { name: message_constants_1.RECORD_ACTIONS.SUBSCRIBE, from: "UNSUBSCRIBING" /* UNSUBSCRIBING */, to: "READY" /* READY */ },
    { name: message_constants_1.RECORD_ACTIONS.UNSUBSCRIBE_ACK, from: "UNSUBSCRIBING" /* UNSUBSCRIBING */, to: "UNSUBSCRIBED" /* UNSUBSCRIBED */, handler: RecordCore.prototype.onUnsubscribed },
    { name: "INVALID_VERSION" /* INVALID_VERSION */, from: "READY" /* READY */, to: "MERGING" /* MERGING */ },
];
