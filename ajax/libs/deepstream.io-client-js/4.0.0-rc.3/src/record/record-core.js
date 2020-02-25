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
        this.name = name;
        this.services = services;
        this.options = options;
        this.recordServices = recordServices;
        this.whenComplete = whenComplete;
        this.readyCallbacks = [];
        this.emitter = new Emitter();
        this.data = Object.create(null);
        this.references = 1;
        this.hasProvider = false;
        this.pendingWrites = [];
        this.isReady = false;
        this.offlineLoadingAborted = false;
        this.version = null;
        this.responseTimeout = null;
        this.discardTimeout = null;
        this.deletedTimeout = null;
        this.readyTimer = -1;
        this.deleteResponse = null;
        if (typeof name !== 'string' || name.length === 0) {
            throw new Error('invalid argument name');
        }
        this.onConnectionLost = this.onConnectionLost.bind(this);
        this.onConnectionReestablished = this.onConnectionReestablished.bind(this);
        this.stateMachine = new state_machine_1.StateMachine(this.services.logger, {
            init: "INITIAL" /* INITIAL */,
            context: this,
            onStateChanged: this.onStateChanged,
            transitions: recordStateTransitions
        });
        this.recordServices.dirtyService.whenLoaded(this, this.onRecordLoadedFromStorage);
    }
    get recordState() {
        return this.stateMachine.state;
    }
    set usages(usages) {
        this.references = usages;
        if (this.references === 1) {
            this.services.timeoutRegistry.clear(this.discardTimeout);
            this.services.timerRegistry.remove(this.readyTimer);
            this.stateMachine.transition(message_constants_1.RECORD_ACTIONS.SUBSCRIBE);
        }
    }
    get usages() {
        return this.references;
    }
    onRecordLoadedFromStorage() {
        if (this.services.connection.isConnected) {
            if (!this.recordServices.dirtyService.isDirty(this.name)) {
                this.stateMachine.transition(message_constants_1.RECORD_ACTIONS.SUBSCRIBE);
            }
            else {
                this.services.storage.get(this.name, (recordName, version, data) => {
                    this.version = version;
                    this.data = data;
                    this.stateMachine.transition("RESUBSCRIBE" /* RESUBSCRIBE */);
                });
            }
        }
        else {
            this.stateMachine.transition("LOAD" /* LOAD */);
        }
        this.services.connection.onReestablished(this.onConnectionReestablished);
        this.services.connection.onLost(this.onConnectionLost);
    }
    onStateChanged(newState, oldState) {
        this.emitter.emit(constants_1.EVENT.RECORD_STATE_CHANGED, newState);
    }
    whenReady(context, callback) {
        if (callback) {
            this.whenReadyInternal(context, (realContext) => {
                callback(realContext);
            });
            return;
        }
        return new Promise(resolve => this.whenReadyInternal(context, () => resolve(context)));
    }
    /**
   */
    whenReadyInternal(context, callback) {
        if (this.isReady === true) {
            callback(context);
            return;
        }
        if (callback) {
            this.readyCallbacks.push({ callback, context });
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
        if (this.isReady === false) {
            this.pendingWrites.push({ path, data, callback });
            return;
        }
        const oldValue = this.data;
        const newValue = json_path_1.setValue(oldValue, path || null, data);
        if (oldValue === newValue) {
            if (callback) {
                this.services.timerRegistry.requestIdleCallback(() => callback(null, this.name));
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
    }
    /**
     * Wrapper function around the record.set that returns a promise
     * if no callback is supplied.
     * @returns {Promise} if a callback is omitted a Promise is returned with the result of the write
     */
    setWithAck(args) {
        if (args.callback) {
            this.set(args);
            return;
        }
        return new Promise((resolve, reject) => {
            args.callback = error => error === null ? resolve() : reject(error);
            this.set(args);
        });
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
            this.whenReadyInternal(null, () => {
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
        this.whenReadyInternal(null, () => {
            this.references--;
            if (this.references <= 0) {
                this.readyTimer = this.services.timerRegistry.add({
                    duration: this.options.recordReadTimeout,
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
        if (!this.services.connection.isConnected) {
            // this.services.logger.warn({ topic: TOPIC.RECORD }, RA.DELETE, 'Deleting while offline is not supported')
            if (callback) {
                this.services.timerRegistry.requestIdleCallback(() => {
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
        this.recordServices.mergeStrategy.setMergeStrategyByName(this.name, mergeStrategy);
    }
    saveRecordToOffline() {
        this.services.storage.set(this.name, this.version, this.data, () => { });
    }
    /**
     * Transition States
     */
    onSubscribing() {
        this.recordServices.readRegistry.register(this.name, this, this.handleReadResponse);
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
        this.recordServices.bulkSubscriptionService[message_constants_1.RECORD_ACTIONS.SUBSCRIBECREATEANDREAD_BULK].subscribe(this.name);
    }
    onResubscribing() {
        this.services.timerRegistry.remove(this.readyTimer);
        this.recordServices.headRegistry.register(this.name, this, this.handleHeadResponse);
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
                action: message_constants_1.RECORD_ACTIONS.HEAD,
                name: this.name
            }
        });
        this.recordServices.bulkSubscriptionService[message_constants_1.RECORD_ACTIONS.SUBSCRIBEANDHEAD_BULK].subscribe(this.name);
    }
    onOfflineLoading() {
        this.services.storage.get(this.name, (recordName, version, data) => {
            if (version === -1) {
                if (this.offlineLoadingAborted) {
                    // This occurred since we got a connection to the server
                    // meaning we no longer care about current state currently
                    this.offlineLoadingAborted = false;
                    return;
                }
                this.data = {};
                this.version = 1;
                this.recordServices.dirtyService.setDirty(this.name, true);
                this.services.storage.set(this.name, this.version, this.data, error => {
                    this.stateMachine.transition("LOADED" /* LOADED */);
                });
            }
            else {
                this.data = data;
                this.version = version;
                this.stateMachine.transition("LOADED" /* LOADED */);
            }
        });
    }
    abortOfflineLoading() {
        this.offlineLoadingAborted = true;
        this.onResubscribing();
    }
    onReady() {
        this.services.timeoutRegistry.clear(this.responseTimeout);
        this.applyPendingWrites();
        this.isReady = true;
        this.readyCallbacks.forEach(({ context, callback }) => {
            callback.call(context, context);
        });
    }
    applyPendingWrites() {
        const writeCallbacks = [];
        const oldData = this.data;
        let newData = oldData;
        for (let i = 0; i < this.pendingWrites.length; i++) {
            const { callback, path, data } = this.pendingWrites[i];
            if (callback) {
                writeCallbacks.push(callback);
            }
            newData = json_path_1.setValue(newData, path || null, data);
        }
        this.pendingWrites = [];
        this.applyChange(newData);
        const runFns = (err) => {
            for (let i = 0; i < writeCallbacks.length; i++) {
                writeCallbacks[i](err, this.name);
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
        if (message.action === message_constants_1.RECORD_ACTIONS.MESSAGE_DENIED ||
            message.action === message_constants_1.RECORD_ACTIONS.MESSAGE_PERMISSION_ERROR) {
            if (message.originalAction === message_constants_1.RECORD_ACTIONS.SUBSCRIBECREATEANDREAD ||
                message.originalAction === message_constants_1.RECORD_ACTIONS.SUBSCRIBEANDHEAD ||
                message.originalAction === message_constants_1.RECORD_ACTIONS.SUBSCRIBEANDREAD) {
                const subscribeMsg = Object.assign({}, message, { originalAction: message_constants_1.RECORD_ACTIONS.SUBSCRIBE });
                const actionMsg = Object.assign({}, message, { originalAction: message.originalAction === message_constants_1.RECORD_ACTIONS.SUBSCRIBECREATEANDREAD ? message_constants_1.RECORD_ACTIONS.READ_RESPONSE : message_constants_1.RECORD_ACTIONS.HEAD_RESPONSE });
                this.services.timeoutRegistry.remove(subscribeMsg);
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
    }
    handleReadResponse(message) {
        if (this.stateMachine.state === "MERGING" /* MERGING */) {
            this.recoverRecord(message.version, message.parsedData, message);
            this.recordServices.dirtyService.setDirty(this.name, false);
            return;
        }
        this.version = message.version;
        this.applyChange(json_path_1.setValue(this.data, null, message.parsedData));
        this.stateMachine.transition(message_constants_1.RECORD_ACTIONS.READ_RESPONSE);
    }
    handleHeadResponse(message) {
        const remoteVersion = message.version;
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
                this.sendUpdate(null, this.data);
                this.stateMachine.transition("RESUBSCRIBED" /* RESUBSCRIBED */);
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
            if (remoteVersion < this.version) {
                /**
                 *  deleted and created again remotely
                */
            }
            else if (this.version === remoteVersion) {
                this.stateMachine.transition("RESUBSCRIBED" /* RESUBSCRIBED */);
            }
            else {
                this.stateMachine.transition("INVALID_VERSION" /* INVALID_VERSION */);
                this.sendRead();
                this.recordServices.readRegistry.register(this.name, this, this.handleReadResponse);
            }
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
        if (!this.recordServices.dirtyService.isDirty(this.name)) {
            this.version++;
            this.recordServices.dirtyService.setDirty(this.name, true);
        }
        this.saveRecordToOffline();
    }
    sendUpdate(path = null, data, callback) {
        if (this.recordServices.dirtyService.isDirty(this.name)) {
            this.recordServices.dirtyService.setDirty(this.name, false);
        }
        else {
            this.version++;
        }
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
    sendCreateUpdate(data) {
        this.services.connection.sendMessage({
            name: this.name,
            topic: message_constants_1.TOPIC.RECORD,
            action: message_constants_1.RECORD_ACTIONS.CREATEANDUPDATE,
            version: 1,
            parsedData: data
        });
        this.recordServices.dirtyService.setDirty(this.name, false);
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
        this.whenReadyInternal(null, () => {
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
        this.recordServices.mergeStrategy.merge(this.name, this.version, this.get(), remoteVersion, remoteData, this.onRecordRecovered, this);
    }
    /**
   * Callback once the record merge has completed. If successful it will set the
   * record state, else emit and error and the record will remain in an
   * inconsistent state until the next update.
   */
    onRecordRecovered(error, recordName, mergedData, remoteVersion, remoteData) {
        if (error) {
            this.services.logger.error({ topic: message_constants_1.TOPIC.RECORD }, constants_1.EVENT.RECORD_VERSION_EXISTS);
        }
        this.version = remoteVersion;
        const oldValue = this.data;
        if (utils.deepEquals(oldValue, remoteData)) {
            return;
        }
        const newValue = json_path_1.setValue(oldValue, null, mergedData);
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
        this.stateMachine.transition("MERGED" /* MERGED */);
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
        this.services.timerRegistry.remove(this.readyTimer);
        this.services.timeoutRegistry.clear(this.responseTimeout);
        this.services.timeoutRegistry.clear(this.deletedTimeout);
        this.services.timeoutRegistry.clear(this.discardTimeout);
        this.services.connection.removeOnReestablished(this.onConnectionReestablished);
        this.services.connection.removeOnLost(this.onConnectionLost);
        this.emitter.off();
        this.isReady = false;
        this.whenComplete(this.name);
    }
    onConnectionReestablished() {
        this.stateMachine.transition("RESUBSCRIBE" /* RESUBSCRIBE */);
    }
    onConnectionLost() {
        this.saveRecordToOffline();
    }
}
exports.RecordCore = RecordCore;
const recordStateTransitions = [
    { name: message_constants_1.RECORD_ACTIONS.SUBSCRIBE, from: "INITIAL" /* INITIAL */, to: "SUBSCRIBING" /* SUBSCRIBING */, handler: RecordCore.prototype.onSubscribing },
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
//# sourceMappingURL=record-core.js.map