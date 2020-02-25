"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils = require("../util/utils");
const constants_1 = require("../constants");
const Emitter = require("component-emitter2");
class List extends Emitter {
    constructor(record) {
        super();
        this.record = record;
        this.originalApplyUpdate = this.record.applyUpdate.bind(this.record);
        this.record.applyUpdate = this.applyUpdate.bind(this);
        this.wrappedFunctions = new Map();
        this.hasAddListener = false;
        this.hasRemoveListener = false;
        this.hasMoveListener = false;
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
    whenReady(callback) {
        if (callback) {
            this.record.whenReady(this, callback);
        }
        else {
            return this.record.whenReady(this);
        }
    }
    /**
     * Returns the array of list entries or an
     * empty array if the list hasn't been populated yet.
     */
    getEntries() {
        const entries = this.record.get();
        if (!(entries instanceof Array)) {
            return [];
        }
        return entries;
    }
    /**
   * Returns true if the list is empty
   */
    isEmpty() {
        return this.getEntries().length === 0;
    }
    setEntriesWithAck(entries, callback) {
        if (!callback) {
            return new Promise((resolve, reject) => {
                this.setEntries(entries, (error) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve();
                    }
                });
            });
        }
        this.setEntries(entries, callback);
    }
    /**
    * Updates the list with a new set of entries
    */
    setEntries(entries, callback) {
        const errorMsg = 'entries must be an array of record names';
        let i;
        if (!(entries instanceof Array)) {
            throw new Error(errorMsg);
        }
        for (i = 0; i < entries.length; i++) {
            if (typeof entries[i] !== 'string') {
                throw new Error(errorMsg);
            }
        }
        if (this.record.isReady === false) {
            // ...
        }
        else {
            this.beforeChange();
            this.record.set({ data: entries, callback });
            this.afterChange();
        }
    }
    /**
     * Removes an entry from the list
     *
     * @param {String} entry
     * @param {Number} [index]
     */
    removeEntry(entry, index, callback) {
        if (this.record.isReady === false) {
            // ...
            return;
        }
        // @ts-ignore
        const currentEntries = this.record.get();
        const hasIndex = this.hasIndex(index);
        const entries = [];
        let i;
        for (i = 0; i < currentEntries.length; i++) {
            if (currentEntries[i] !== entry || (hasIndex && index !== i)) {
                entries.push(currentEntries[i]);
            }
        }
        this.beforeChange();
        this.record.set({ data: entries, callback });
        this.afterChange();
    }
    /**
   * Adds an entry to the list
   *
   * @param {String} entry
   * @param {Number} [index]
   */
    addEntry(entry, index, callback) {
        if (typeof entry !== 'string') {
            throw new Error('Entry must be a recordName');
        }
        if (this.record.isReady === false) {
            // ..
            return;
        }
        const hasIndex = this.hasIndex(index);
        const entries = this.getEntries();
        if (hasIndex) {
            entries.splice(index, 0, entry);
        }
        else {
            entries.push(entry);
        }
        this.beforeChange();
        this.record.set({ data: entries, callback });
        this.afterChange();
    }
    /**
   * Proxies the underlying Record's subscribe method. Makes sure
   * that no path is provided
   */
    subscribe(callback) {
        const parameters = utils.normalizeArguments(arguments);
        if (parameters.path) {
            throw new Error('path is not supported for List.subscribe');
        }
        // Make sure the callback is invoked with an empty array for new records
        const listCallback = function (scope, cb) {
            cb(scope.getEntries());
        }.bind(this, this, parameters.callback);
        /**
        * Adding a property onto a function directly is terrible practice,
        * and we will change this as soon as we have a more seperate approach
        * of creating lists that doesn't have records default state.
        *
        * The reason we are holding a referencing to wrapped array is so that
        * on unsubscribe it can provide a reference to the actual method the
        * record is subscribed too.
        **/
        this.wrappedFunctions.set(parameters.callback, listCallback);
        parameters.callback = listCallback;
        this.record.subscribe(parameters);
    }
    /**
   * Proxies the underlying Record's unsubscribe method. Makes sure
   * that no path is provided
   */
    unsubscribe(callback) {
        const parameters = utils.normalizeArguments(arguments);
        if (parameters.path) {
            throw new Error('path is not supported for List.unsubscribe');
        }
        const listenCallback = this.wrappedFunctions.get(parameters.callback);
        parameters.callback = listenCallback;
        this.record.unsubscribe(parameters);
        this.wrappedFunctions.delete(parameters.callback);
    }
    /**
     * Proxies the underlying Record's _update method. Set's
     * data to an empty array if no data is provided.
     */
    applyUpdate(message) {
        if (!(message.parsedData instanceof Array)) {
            message.parsedData = [];
        }
        this.beforeChange();
        this.originalApplyUpdate(message);
        this.afterChange();
    }
    /**
     * Validates that the index provided is within the current set of entries.
     */
    hasIndex(index) {
        let hasIndex = false;
        const entries = this.getEntries();
        if (index !== undefined) {
            if (isNaN(index)) {
                throw new Error('Index must be a number');
            }
            if (index !== entries.length && (index >= entries.length || index < 0)) {
                throw new Error('Index must be within current entries');
            }
            hasIndex = true;
        }
        return hasIndex;
    }
    /**
     * Establishes the current structure of the list, provided the client has attached any
     * add / move / remove listener
     *
     * This will be called before any change to the list, regardsless if the change was triggered
     * by an incoming message from the server or by the client
     */
    beforeChange() {
        this.hasAddListener = this.listeners(constants_1.EVENT.ENTRY_ADDED_EVENT).length > 0;
        this.hasRemoveListener = this.listeners(constants_1.EVENT.ENTRY_REMOVED_EVENT).length > 0;
        this.hasMoveListener = this.listeners(constants_1.EVENT.ENTRY_MOVED_EVENT).length > 0;
        if (this.hasAddListener || this.hasRemoveListener || this.hasMoveListener) {
            this.beforeStructure = this.getStructure();
        }
        else {
            this.beforeStructure = null;
        }
    }
    /**
     * Compares the structure of the list after a change to its previous structure and notifies
     * any add / move / remove listener. Won't do anything if no listeners are attached.
     */
    afterChange() {
        if (this.beforeStructure === null) {
            return;
        }
        const after = this.getStructure();
        const before = this.beforeStructure;
        let entry;
        let i;
        if (this.hasRemoveListener) {
            for (entry in before) {
                for (i = 0; i < before[entry].length; i++) {
                    if (after[entry] === undefined || after[entry][i] === undefined) {
                        this.emit(constants_1.EVENT.ENTRY_REMOVED_EVENT, entry, before[entry][i]);
                    }
                }
            }
        }
        if (this.hasAddListener || this.hasMoveListener) {
            for (entry in after) {
                if (before[entry] === undefined) {
                    for (i = 0; i < after[entry].length; i++) {
                        this.emit(constants_1.EVENT.ENTRY_ADDED_EVENT, entry, after[entry][i]);
                    }
                }
                else {
                    for (i = 0; i < after[entry].length; i++) {
                        if (before[entry][i] !== after[entry][i]) {
                            if (before[entry][i] === undefined) {
                                this.emit(constants_1.EVENT.ENTRY_ADDED_EVENT, entry, after[entry][i]);
                            }
                            else {
                                this.emit(constants_1.EVENT.ENTRY_MOVED_EVENT, entry, after[entry][i]);
                            }
                        }
                    }
                }
            }
        }
    }
    /**
     * Iterates through the list and creates a map with the entry as a key
     * and an array of its position(s) within the list as a value, e.g.
     *
     * {
     *   'recordA': [ 0, 3 ],
     *   'recordB': [ 1 ],
     *   'recordC': [ 2 ]
     * }
     */
    getStructure() {
        const structure = {};
        let i;
        const entries = this.getEntries();
        for (i = 0; i < entries.length; i++) {
            if (structure[entries[i]] === undefined) {
                structure[entries[i]] = [i];
            }
            else {
                structure[entries[i]].push(i);
            }
        }
        return structure;
    }
}
exports.List = List;
//# sourceMappingURL=list.js.map