"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const message_constants_1 = require("../../binary-protocol/src/message-constants");
const json_path_1 = require("./json-path");
const Emitter = require("component-emitter2");
const utils = require("../util/utils");
const state_machine_1 = require("../util/state-machine");
class RecordCore extends Emitter {
    constructor(name, services, options, recordServices, whenComplete) {
        super();
        this.services = services;
        this.options = options;
        this.recordServices = recordServices;
        this.emitter = new Emitter();
        this.data = Object.create(null);
        this.name = name;
        this.whenComplete = whenComplete;
        this.references = 1;
        this.offlineDirty = false;
        if (typeof name !== 'string' || name.length === 0) {
            throw new Error('invalid argument name');
        }
        this.setMergeStrategy(options.mergeStrategy);
        this.stateMachine = new state_machine_1.StateMachine(this.services.logger, {
            init: 0 /* INITIAL */,
            onStateChanged: (newState, oldState) => {
                this.emitter.emit(constants_1.EVENT.RECORD_STATE_CHANGED, newState);
            },
            transitions: [
                { name: message_constants_1.RECORD_ACTIONS.SUBSCRIBE, from: 0 /* INITIAL */, to: 1 /* SUBSCRIBING */, handler: this.onSubscribing.bind(this) },
                { name: 0 /* LOAD */, from: 0 /* INITIAL */, to: 3 /* LOADING_OFFLINE */, handler: this.onOfflineLoading.bind(this) },
                { name: 1 /* LOADED */, from: 3 /* LOADING_OFFLINE */, to: 4 /* READY */, handler: this.onReady.bind(this) },
                { name: message_constants_1.RECORD_ACTIONS.READ_RESPONSE, from: 1 /* SUBSCRIBING */, to: 4 /* READY */, handler: this.onReady.bind(this) },
                { name: 2 /* RESUBSCRIBE */, from: 4 /* READY */, to: 2 /* RESUBSCRIBING */, handler: this.onResubscribing.bind(this) },
                { name: 3 /* RESUBSCRIBED */, from: 2 /* RESUBSCRIBING */, to: 4 /* READY */ },
                { name: 4 /* INVALID_VERSION */, from: 2 /* RESUBSCRIBING */, to: 5 /* MERGING */ },
                { name: message_constants_1.RECORD_ACTIONS.DELETE, from: 4 /* READY */, to: 8 /* DELETING */ },
                { name: message_constants_1.RECORD_ACTIONS.DELETED, from: 4 /* READY */, to: 9 /* DELETED */, handler: this.onDeleted.bind(this) },
                { name: message_constants_1.RECORD_ACTIONS.DELETE_SUCCESS, from: 8 /* DELETING */, to: 9 /* DELETED */, handler: this.onDeleted.bind(this) },
                { name: message_constants_1.RECORD_ACTIONS.UNSUBSCRIBE, from: 4 /* READY */, to: 6 /* UNSUBSCRIBING */ },
                { name: message_constants_1.RECORD_ACTIONS.SUBSCRIBE, from: 6 /* UNSUBSCRIBING */, to: 4 /* READY */ },
                { name: message_constants_1.RECORD_ACTIONS.UNSUBSCRIBE_ACK, from: 6 /* UNSUBSCRIBING */, to: 7 /* UNSUBSCRIBED */, handler: this.onUnsubscribed.bind(this) },
                { name: 4 /* INVALID_VERSION */, from: 4 /* READY */, to: 5 /* MERGING */ },
            ]
        });
        if (this.services.connection.isConnected) {
            this.stateMachine.transition(message_constants_1.RECORD_ACTIONS.SUBSCRIBE);
        }
        else {
            this.stateMachine.transition(0 /* LOAD */);
        }
    }
    get recordState() {
        return this.stateMachine.state;
    }
    set usages(usages) {
        this.references = usages;
        if (this.references === 1) {
            this.services.timerRegistry.remove(this.discardTimeout);
            this.stateMachine.transition(message_constants_1.RECORD_ACTIONS.SUBSCRIBE);
        }
    }
    get usages() {
        return this.references;
    }
    /**
   * Convenience method, similar to promises. Executes callback
   * whenever the record is ready, either immediatly or once the ready
   * event is fired
   * @param   {[Function]} callback Will be called when the record is ready
   */
    whenReady(context, callback) {
        if (this.isReady === true) {
            if (callback) {
                callback(context);
                return;
            }
            return Promise.resolve(context);
        }
        if (callback) {
            this.once(constants_1.EVENT.RECORD_READY, () => callback(context));
        }
        else {
            return new Promise((resolve, reject) => {
                this.once(constants_1.EVENT.RECORD_READY, () => resolve(context));
            });
        }
    }
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
    set({ path, data, callback }) {
        if (!path && (data === null || typeof data !== 'object')) {
            throw new Error('invalid arguments, scalar values cannot be set without path');
        }
        if (this.checkDestroyed('set')) {
            return;
        }
        if (!this.isReady) {
            // TODO
            return;
        }
        const oldValue = this.data;
        const newValue = json_path_1.setValue(oldValue, path || null, data);
        if (oldValue === newValue) {
            if (callback) {
                this.services.timerRegistry.requestIdleCallback(() => callback(null));
            }
            return;
        }
        this.applyChange(newValue);
        if (this.services.connection.isConnected) {
            this.sendUpdate(path, data, callback);
        }
        else {
            // todo: set, but...
            this.saveUpdate();
        }
    }
    /**
     * Wrapper function around the record.set that returns a promise
     * if no callback is supplied.
     * @returns {Promise} if a callback is omitted a Promise is returned with the result of the write
     */
    setWithAck(args) {
        if (!args.callback) {
            return new Promise((resolve, reject) => {
                args.callback = error => error === null ? resolve() : reject(error);
                this.set(args);
            });
        }
        else {
            this.set(args);
        }
    }
    /**
   * Returns a copy of either the entire dataset of the record
   * or - if called with a path - the value of that path within
   * the record's dataset.
   *
   * Returning a copy rather than the actual value helps to prevent
   * the record getting out of sync due to unintentional changes to
   * its data
   */
    get(path) {
        return json_path_1.get(this.data, path || null, this.options.recordDeepCopy);
    }
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
    subscribe(args) {
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
            this.whenReady(null, () => {
                this.emitter.on(args.path || '', args.callback);
                args.callback(this.get(args.path));
            });
        }
        else {
            this.emitter.on(args.path || '', args.callback);
        }
    }
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
    unsubscribe(args) {
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
    }
    /**
    * Removes all change listeners and notifies the server that the client is
    * no longer interested in updates for this record
    */
    discard() {
        if (this.checkDestroyed('discard')) {
            return;
        }
        this.whenReady(null, () => {
            this.references--;
            if (this.references <= 0) {
                this.discardTimeout = this.services.timerRegistry.add({
                    duration: this.options.discardTimeout,
                    callback: this.stateMachine.transition,
                    context: this.stateMachine,
                    data: message_constants_1.RECORD_ACTIONS.UNSUBSCRIBE_ACK
                });
            }
        });
        this.stateMachine.transition(message_constants_1.RECORD_ACTIONS.UNSUBSCRIBE);
    }
    /**
     * Deletes the record on the server.
     */
    delete(callback) {
        if (this.checkDestroyed('delete')) {
            return;
        }
        this.stateMachine.transition(message_constants_1.RECORD_ACTIONS.DELETE);
        if (callback && typeof callback === 'function') {
            this.deleteResponse = { callback };
            this.sendDelete();
        }
        else {
            return new Promise((resolve, reject) => {
                this.deleteResponse = { resolve, reject };
                this.sendDelete();
            });
        }
    }
    /**
     * Set a merge strategy to resolve any merge conflicts that may occur due
     * to offline work or write conflicts. The function will be called with the
     * local record, the remote version/data and a callback to call once the merge has
     * completed or if an error occurs ( which leaves it in an inconsistent state until
     * the next update merge attempt ).
     */
    setMergeStrategy(mergeStrategy) {
        if (typeof mergeStrategy === 'function') {
            this.mergeStrategy = mergeStrategy;
        }
        else {
            throw new Error('Invalid merge strategy: Must be a Function');
        }
    }
    /**
     * Transition States
     */
    onSubscribing() {
        this.recordServices.readRegistry.register(this.name, this.handleReadResponse.bind(this));
        this.services.timeoutRegistry.add({
            message: {
                topic: message_constants_1.TOPIC.RECORD,
                action: message_constants_1.RECORD_ACTIONS.SUBSCRIBE,
                name: this.name,
            }
        });
        this.responseTimeout = this.services.timeoutRegistry.add({
            message: {
                topic: message_constants_1.TOPIC.RECORD,
                action: message_constants_1.RECORD_ACTIONS.READ_RESPONSE,
                name: this.name
            }
        });
        this.services.connection.sendMessage({
            topic: message_constants_1.TOPIC.RECORD,
            action: message_constants_1.RECORD_ACTIONS.SUBSCRIBECREATEANDREAD,
            name: this.name
        });
    }
    onResubscribing() {
        this.recordServices.headRegistry.register(this.name, this.handleHeadResponse.bind(this));
        this.services.timeoutRegistry.add({
            message: {
                topic: message_constants_1.TOPIC.RECORD,
                action: message_constants_1.RECORD_ACTIONS.SUBSCRIBE,
                name: this.name,
            }
        });
        this.responseTimeout = this.services.timeoutRegistry.add({
            message: {
                topic: message_constants_1.TOPIC.RECORD,
                action: message_constants_1.RECORD_ACTIONS.HEAD_RESPONSE,
                name: this.name
            }
        });
        this.services.connection.sendMessage({
            topic: message_constants_1.TOPIC.RECORD,
            action: message_constants_1.RECORD_ACTIONS.SUBSCRIBEANDHEAD,
            name: this.name
        });
    }
    onOfflineLoading() {
        this.services.storage.get(this.name, (recordName, version, data) => {
            if (this.version === -1) {
                this.data = {};
                this.version = 1;
            }
            else {
                this.data = data;
                this.version = version;
            }
            this.stateMachine.transition(1 /* LOADED */);
        });
    }
    onReady() {
        this.services.timeoutRegistry.clear(this.responseTimeout);
        this.isReady = true;
        this.emit(constants_1.EVENT.RECORD_READY);
    }
    onUnsubscribed() {
        if (this.services.connection.isConnected) {
            const message = {
                topic: message_constants_1.TOPIC.RECORD,
                action: message_constants_1.RECORD_ACTIONS.UNSUBSCRIBE,
                name: this.name
            };
            this.discardTimeout = this.services.timeoutRegistry.add({ message });
            this.services.connection.sendMessage(message);
        }
        this.emit(constants_1.EVENT.RECORD_DISCARDED);
        this.destroy();
    }
    onDeleted() {
        this.emit(constants_1.EVENT.RECORD_DELETED);
        this.destroy();
    }
    handle(message) {
        if (message.isAck) {
            this.services.timeoutRegistry.remove(message);
            return;
        }
        if (message.action === message_constants_1.RECORD_ACTIONS.PATCH || message.action === message_constants_1.RECORD_ACTIONS.UPDATE || message.action === message_constants_1.RECORD_ACTIONS.ERASE) {
            this.applyUpdate(message);
            return;
        }
        if (message.action === message_constants_1.RECORD_ACTIONS.DELETE_SUCCESS) {
            this.stateMachine.transition(message.action);
            if (this.deleteResponse.callback) {
                this.deleteResponse.callback(null);
            }
            else if (this.deleteResponse.resolve) {
                this.deleteResponse.resolve();
            }
            return;
        }
        if (message.action === message_constants_1.RECORD_ACTIONS.DELETED) {
            this.stateMachine.transition(message.action);
            return;
        }
        if (message.action === message_constants_1.RECORD_ACTIONS.VERSION_EXISTS) {
            // what kind of message is version exists?
            // this.recoverRecord(message)
            return;
        }
        if (message.action === message_constants_1.RECORD_ACTIONS.MESSAGE_DENIED) {
            if (message.originalAction === message_constants_1.RECORD_ACTIONS.PATCH ||
                message.originalAction === message_constants_1.RECORD_ACTIONS.UPDATE ||
                message.originalAction === message_constants_1.RECORD_ACTIONS.ERASE ||
                message.originalAction === message_constants_1.RECORD_ACTIONS.DELETE ||
                message.originalAction === message_constants_1.RECORD_ACTIONS.CREATE ||
                message.originalAction === message_constants_1.RECORD_ACTIONS.READ ||
                message.originalAction === message_constants_1.RECORD_ACTIONS.SUBSCRIBECREATEANDREAD ||
                message.originalAction === message_constants_1.RECORD_ACTIONS.SUBSCRIBEANDHEAD) {
                this.emit(constants_1.EVENT.RECORD_ERROR, message_constants_1.RECORD_ACTIONS[message_constants_1.RECORD_ACTIONS.MESSAGE_DENIED], message_constants_1.RECORD_ACTIONS[message.originalAction]);
            }
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
    }
    handleReadResponse(message) {
        if (this.stateMachine.state === 5 /* MERGING */) {
            this.recoverRecord(message.version, message.parsedData, message);
            return;
        }
        this.version = message.version;
        this.applyChange(json_path_1.setValue(this.data, null, message.parsedData));
        this.stateMachine.transition(message_constants_1.RECORD_ACTIONS.READ_RESPONSE);
    }
    handleHeadResponse(message) {
        if (this.version === message.version) {
            this.stateMachine.transition(3 /* RESUBSCRIBED */);
        }
        else if (this.version + 1 === message.version) {
            this.version = message.version;
            this.applyChange(json_path_1.setValue(this.data, null, message.parsedData));
            this.stateMachine.transition(3 /* RESUBSCRIBED */);
        }
        else {
            this.stateMachine.transition(4 /* INVALID_VERSION */);
            this.sendRead();
        }
    }
    sendRead() {
        this.services.connection.sendMessage({
            topic: message_constants_1.TOPIC.RECORD,
            action: message_constants_1.RECORD_ACTIONS.READ,
            name: this.name
        });
    }
    saveUpdate() {
        if (!this.offlineDirty) {
            this.version++;
            this.offlineDirty = true;
        }
        this.services.storage.set(this.name, this.version, this.data, () => { });
    }
    sendUpdate(path = null, data, callback) {
        this.version++;
        const message = {
            topic: message_constants_1.TOPIC.RECORD,
            version: this.version,
            name: this.name
        };
        if (path) {
            if (data === undefined) {
                Object.assign(message, { action: message_constants_1.RECORD_ACTIONS.ERASE, path });
            }
            else {
                Object.assign(message, { action: message_constants_1.RECORD_ACTIONS.PATCH, path, parsedData: data });
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
    }
    /**
     * Applies incoming updates and patches to the record's dataset
     */
    applyUpdate(message) {
        const version = message.version;
        const data = message.parsedData;
        if (this.version === null) {
            this.version = version;
        }
        else if (this.version + 1 !== version) {
            if (message.action === message_constants_1.RECORD_ACTIONS.PATCH) {
                /**
                * Request a snapshot so that a merge can be done with the read reply which contains
                * the full state of the record
                **/
                this.sendRead();
            }
            else {
                this.recoverRecord(message.version, message.parsedData, message);
            }
            return;
        }
        this.version = version;
        let newData;
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
    }
    /**
     * Compares the new values for every path with the previously stored ones and
     * updates the subscribers if the value has changed
     */
    applyChange(newData) {
        if (this.stateMachine.inEndState) {
            return;
        }
        const oldData = this.data;
        this.data = newData;
        const paths = this.emitter.eventNames();
        for (let i = 0; i < paths.length; i++) {
            const newValue = json_path_1.get(newData, paths[i], false);
            const oldValue = json_path_1.get(oldData, paths[i], false);
            if (newValue !== oldValue) {
                this.emitter.emit(paths[i], this.get(paths[i]));
            }
        }
    }
    /**
     * If connected sends the delete message to server, otherwise
     * we delete in local storage and transition to delete success.
     */
    sendDelete() {
        this.whenReady(null, () => {
            if (this.services.connection.isConnected) {
                const message = {
                    topic: message_constants_1.TOPIC.RECORD,
                    action: message_constants_1.RECORD_ACTIONS.DELETE,
                    name: this.name
                };
                this.deletedTimeout = this.services.timeoutRegistry.add({
                    message,
                    event: constants_1.EVENT.RECORD_DELETE_TIMEOUT,
                    duration: this.options.recordDeleteTimeout
                });
                this.services.connection.sendMessage(message);
            }
            else {
                this.services.storage.delete(this.name, () => {
                    this.services.timerRegistry.requestIdleCallback(() => {
                        this.stateMachine.transition(message_constants_1.RECORD_ACTIONS.DELETE_SUCCESS);
                    });
                });
            }
        });
    }
    /**
     * Called when a merge conflict is detected by a VERSION_EXISTS error or if an update recieved
     * is directly after the clients. If no merge strategy is configure it will emit a VERSION_EXISTS
     * error and the record will remain in an inconsistent state.
     *
     * @param   {Number} remoteVersion The remote version number
     * @param   {Object} remoteData The remote object data
     * @param   {Object} message parsed and validated deepstream message
     */
    recoverRecord(remoteVersion, remoteData, message) {
        if (this.mergeStrategy) {
            this.mergeStrategy(this, remoteData, remoteVersion, this.onRecordRecovered.bind(this, remoteVersion, remoteData, message));
            return;
        }
        this.services.logger.error(message, constants_1.EVENT.RECORD_VERSION_EXISTS, { remoteVersion, record: this });
    }
    /**
   * Callback once the record merge has completed. If successful it will set the
   * record state, else emit and error and the record will remain in an
   * inconsistent state until the next update.
   *
   * @param   {Number} remoteVersion The remote version number
   * @param   {Object} remoteData The remote object data
   * @param   {Object} message parsed and validated deepstream message
   */
    onRecordRecovered(remoteVersion, remoteData, message, error, data) {
        if (error) {
            this.services.logger.error(message, constants_1.EVENT.RECORD_VERSION_EXISTS);
        }
        const oldVersion = this.version;
        this.version = remoteVersion;
        const oldValue = this.data;
        if (utils.deepEquals(oldValue, remoteData)) {
            return;
        }
        const newValue = json_path_1.setValue(oldValue, null, data);
        if (utils.deepEquals(data, remoteData)) {
            this.applyChange(data);
            // const callback = this.writeCallbacks.get(remoteVersion)
            // if (callback !== undefined) {
            //   callback(null)
            //   this.writeCallbacks.delete(remoteVersion)
            // }
            // return
        }
        // this.sendUpdate(null, data, message.isWriteAck)
        this.applyChange(newValue);
    }
    /**
   * A quick check that's carried out by most methods that interact with the record
   * to make sure it hasn't been destroyed yet - and to handle it gracefully if it has.
   */
    checkDestroyed(methodName) {
        if (this.stateMachine.inEndState) {
            this.services.logger.error({ topic: message_constants_1.TOPIC.RECORD }, constants_1.EVENT.RECORD_ALREADY_DESTROYED, { methodName });
            return true;
        }
        return false;
    }
    /**
     * Destroys the record and nulls all
     * its dependencies
     */
    destroy() {
        this.services.timerRegistry.remove(this.deletedTimeout);
        this.services.timerRegistry.remove(this.discardTimeout);
        this.services.timerRegistry.remove(this.responseTimeout);
        this.emitter.off();
        this.isReady = false;
        this.whenComplete(this.name);
    }
}
exports.RecordCore = RecordCore;
//# sourceMappingURL=record-core.js.map