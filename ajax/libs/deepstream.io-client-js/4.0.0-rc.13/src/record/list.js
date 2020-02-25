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
var List = /** @class */ (function (_super) {
    __extends(List, _super);
    function List(record) {
        var _this = _super.call(this) || this;
        _this.record = record;
        _this.originalApplyUpdate = _this.record.applyUpdate.bind(_this.record);
        _this.record.applyUpdate = _this.applyUpdate.bind(_this);
        _this.wrappedFunctions = new Map();
        _this.hasAddListener = false;
        _this.hasRemoveListener = false;
        _this.hasMoveListener = false;
        _this.subscriptions = [];
        return _this;
    }
    Object.defineProperty(List.prototype, "name", {
        get: function () {
            return this.record.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(List.prototype, "isReady", {
        get: function () {
            return this.record.isReady;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(List.prototype, "version", {
        get: function () {
            return this.record.version;
        },
        enumerable: true,
        configurable: true
    });
    List.prototype.whenReady = function (callback) {
        if (callback) {
            this.record.whenReady(this, callback);
        }
        else {
            return this.record.whenReady(this);
        }
    };
    List.prototype.discard = function () {
        this.destroy();
        this.record.discard();
    };
    List.prototype.delete = function (callback) {
        this.destroy();
        return this.record.delete(callback);
    };
    /**
     * Returns the array of list entries or an
     * empty array if the list hasn't been populated yet.
     */
    List.prototype.getEntries = function () {
        var entries = this.record.get();
        if (!(entries instanceof Array)) {
            return [];
        }
        return entries;
    };
    /**
   * Returns true if the list is empty
   */
    List.prototype.isEmpty = function () {
        return this.getEntries().length === 0;
    };
    List.prototype.setEntriesWithAck = function (entries, callback) {
        var _this = this;
        if (!callback) {
            return new Promise(function (resolve, reject) {
                _this.setEntries(entries, function (error) {
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
    };
    /**
    * Updates the list with a new set of entries
    */
    List.prototype.setEntries = function (entries, callback) {
        var errorMsg = 'entries must be an array of record names';
        var i;
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
            this.record.set({ data: entries, callback: callback });
            this.afterChange();
        }
    };
    /**
     * Removes an entry from the list
     *
     * @param {String} entry
     * @param {Number} [index]
     */
    List.prototype.removeEntry = function (entry, index, callback) {
        if (this.record.isReady === false) {
            // ...
            return;
        }
        // @ts-ignore
        var currentEntries = this.record.get();
        var hasIndex = this.hasIndex(index);
        var entries = [];
        var i;
        for (i = 0; i < currentEntries.length; i++) {
            if (currentEntries[i] !== entry || (hasIndex && index !== i)) {
                entries.push(currentEntries[i]);
            }
        }
        this.beforeChange();
        this.record.set({ data: entries, callback: callback });
        this.afterChange();
    };
    /**
   * Adds an entry to the list
   *
   * @param {String} entry
   * @param {Number} [index]
   */
    List.prototype.addEntry = function (entry, index, callback) {
        if (typeof entry !== 'string') {
            throw new Error('Entry must be a recordName');
        }
        if (this.record.isReady === false) {
            // ..
            return;
        }
        var hasIndex = this.hasIndex(index);
        var entries = this.getEntries();
        if (hasIndex) {
            entries.splice(index, 0, entry);
        }
        else {
            entries.push(entry);
        }
        this.beforeChange();
        this.record.set({ data: entries, callback: callback });
        this.afterChange();
    };
    /**
   * Proxies the underlying Record's subscribe method. Makes sure
   * that no path is provided
   */
    List.prototype.subscribe = function (callback) {
        var parameters = utils.normalizeArguments(arguments);
        if (parameters.path) {
            throw new Error('path is not supported for List.subscribe');
        }
        // Make sure the callback is invoked with an empty array for new records
        var listCallback = function (scope, cb) {
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
        this.subscriptions.push(parameters);
        this.record.subscribe(parameters);
    };
    /**
   * Proxies the underlying Record's unsubscribe method. Makes sure
   * that no path is provided
   */
    List.prototype.unsubscribe = function (callback) {
        var parameters = utils.normalizeArguments(arguments);
        if (parameters.path) {
            throw new Error('path is not supported for List.unsubscribe');
        }
        var listenCallback = this.wrappedFunctions.get(parameters.callback);
        parameters.callback = listenCallback;
        this.record.unsubscribe(parameters);
        this.wrappedFunctions.delete(parameters.callback);
    };
    /**
     * Proxies the underlying Record's _update method. Set's
     * data to an empty array if no data is provided.
     */
    List.prototype.applyUpdate = function (message) {
        if (!(message.parsedData instanceof Array)) {
            message.parsedData = [];
        }
        this.beforeChange();
        this.originalApplyUpdate(message);
        this.afterChange();
    };
    /**
     * Validates that the index provided is within the current set of entries.
     */
    List.prototype.hasIndex = function (index) {
        var hasIndex = false;
        var entries = this.getEntries();
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
    };
    /**
     * Establishes the current structure of the list, provided the client has attached any
     * add / move / remove listener
     *
     * This will be called before any change to the list, regardsless if the change was triggered
     * by an incoming message from the server or by the client
     */
    List.prototype.beforeChange = function () {
        this.hasAddListener = this.listeners(constants_1.EVENT.ENTRY_ADDED_EVENT).length > 0;
        this.hasRemoveListener = this.listeners(constants_1.EVENT.ENTRY_REMOVED_EVENT).length > 0;
        this.hasMoveListener = this.listeners(constants_1.EVENT.ENTRY_MOVED_EVENT).length > 0;
        if (this.hasAddListener || this.hasRemoveListener || this.hasMoveListener) {
            this.beforeStructure = this.getStructure();
        }
        else {
            this.beforeStructure = null;
        }
    };
    /**
     * Compares the structure of the list after a change to its previous structure and notifies
     * any add / move / remove listener. Won't do anything if no listeners are attached.
     */
    List.prototype.afterChange = function () {
        if (this.beforeStructure === null) {
            return;
        }
        var after = this.getStructure();
        var before = this.beforeStructure;
        var entry;
        var i;
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
    };
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
    List.prototype.getStructure = function () {
        var structure = {};
        var i;
        var entries = this.getEntries();
        for (i = 0; i < entries.length; i++) {
            if (structure[entries[i]] === undefined) {
                structure[entries[i]] = [i];
            }
            else {
                structure[entries[i]].push(i);
            }
        }
        return structure;
    };
    List.prototype.destroy = function () {
        for (var i = 0; i < this.subscriptions.length; i++) {
            this.record.unsubscribe(this.subscriptions[i]);
        }
        this.wrappedFunctions.clear();
    };
    return List;
}(Emitter));
exports.List = List;
