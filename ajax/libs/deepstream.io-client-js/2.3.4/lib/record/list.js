'use strict';
/* eslint-disable prefer-rest-params */

var EventEmitter = require('component-emitter2');
var Record = require('./record');
var C = require('../constants/constants');

var ENTRY_ADDED_EVENT = 'entry-added';
var ENTRY_REMOVED_EVENT = 'entry-removed';
var ENTRY_MOVED_EVENT = 'entry-moved';

/**
 * A List is a specialised Record that contains
 * an Array of recordNames and provides a number
 * of convinience methods for interacting with them.
 *
 * @param {RecordHanlder} recordHandler
 * @param {String} name    The name of the list
 *
 * @constructor
 */
var List = function List(recordHandler, name, options) {
  if (typeof name !== 'string' || name.length === 0) {
    throw new Error('invalid argument name');
  }

  this._recordHandler = recordHandler;
  this._record = this._recordHandler.getRecord(name, options);
  this._record._applyUpdate = this._applyUpdate.bind(this);

  this._record.on('delete', this.emit.bind(this, 'delete'));
  this._record.on('discard', this._onDiscard.bind(this));
  this._record.on('ready', this._onReady.bind(this));

  this.isDestroyed = this._record.isDestroyed;
  this.isReady = this._record.isReady;
  this.name = name;
  this._queuedMethods = [];
  this._beforeStructure = null;
  this._hasAddListener = null;
  this._hasRemoveListener = null;
  this._hasMoveListener = null;

  this.delete = this._record.delete.bind(this._record);
  this.discard = this._record.discard.bind(this._record);
  this.whenReady = this._record.whenReady.bind(this);
};

EventEmitter(List.prototype); // eslint-disable-line

/**
 * Returns the array of list entries or an
 * empty array if the list hasn't been populated yet.
 *
 * @public
 * @returns {Array} entries
 */
List.prototype.getEntries = function () {
  var entries = this._record.get();

  if (!(entries instanceof Array)) {
    return [];
  }

  return entries;
};

/**
 * Returns true if the list is empty
 *
 * @public
 * @returns {Boolean} isEmpty
 */
List.prototype.isEmpty = function () {
  return this.getEntries().length === 0;
};

/**
 * Updates the list with a new set of entries
 *
 * @param {Array} entries
 * @param {Function} [callback]
 *
 * @public
 * @returns {void}
 */
List.prototype.setEntries = function (entries, callback) {
  var errorMsg = 'entries must be an array of record names';
  var i = void 0;

  if (!(entries instanceof Array)) {
    throw new Error(errorMsg);
  }

  for (i = 0; i < entries.length; i++) {
    if (typeof entries[i] !== 'string') {
      throw new Error(errorMsg);
    }
  }

  if (this._record.isReady === false) {
    this._queuedMethods.push(this.setEntries.bind(this, entries, callback));
  } else {
    this._beforeChange();
    if (callback) {
      this._record.set(entries, callback);
    } else {
      this._record.set(entries);
    }
    this._afterChange();
  }
};

/**
 * Wrapper function around the list.setEntries that returns a promise
 * if no callback is supplied.
 *
 * @param {Array} entries
 * @param {Function} callback
 *
 * @public
 * @returns {Promise|void} if a callback is omitted a Promise is returned
 *                         with the result of the write
 */
List.prototype.setEntriesWithAck = function (entries, callback) {
  var _this = this;

  if (callback) {
    return this.setEntries(entries, callback);
  }
  return new Promise(function (resolve, reject) {
    _this.setEntries(entries, function (error) {
      return error === null ? resolve() : reject(error);
    });
  });
};

/**
 * Removes an entry from the list
 *
 * @param {String} entry
 * @param {Number} [indexOrCallback]
 * @param {Function} [callback]
 *
 * @public
 * @returns {void}
 */
List.prototype.removeEntry = function (entry, indexOrCallback, callback) {
  var index = indexOrCallback;
  var cb = callback;
  if (typeof indexOrCallback === 'function') {
    cb = indexOrCallback;
    index = undefined;
  }

  if (this._record.isReady === false) {
    this._queuedMethods.push(this.removeEntry.bind(this, entry, index, cb));
    return;
  }

  var currentEntries = this._record.get();
  var hasIndex = this._hasIndex(index);
  var entries = [];
  var i = void 0;

  for (i = 0; i < currentEntries.length; i++) {
    if (currentEntries[i] !== entry || hasIndex && index !== i) {
      entries.push(currentEntries[i]);
    }
  }

  this._beforeChange();
  if (cb) {
    this._record.set(entries, cb);
  } else {
    this._record.set(entries);
  }
  this._afterChange();
};

/**
 * Wrapper function around the list.removeEntry that returns a promise
 * if no callback is supplied.
 *
 * @param {String} entry
 * @param {Number|Function} [indexOrCallback]
 * @param {Function} [callback]
 *
 * @public
 * @returns {Promise|void} if a callback is omitted a Promise is returned
 *                         with the result of the write
 */
List.prototype.removeEntryWithAck = function (entry, indexOrCallback, callback) {
  var _this2 = this;

  if (typeof indexOrCallback === 'number' && callback) {
    return this.removeEntry(entry, indexOrCallback, callback);
  }
  if (typeof indexOrCallback === 'function') {
    return this.removeEntry(entry, indexOrCallback);
  }
  return new Promise(function (resolve, reject) {
    _this2.removeEntry(entry, indexOrCallback, function (error) {
      return error === null ? resolve() : reject(error);
    });
  });
};

/**
 * Adds an entry to the list
 *
 * @param {String} entry
 * @param {Number|Function} [indexOrCallback]
 * @param {Function} [callback]
 *
 * @public
 * @returns {void}
 */
List.prototype.addEntry = function (entry, indexOrCallback, callback) {
  if (typeof entry !== 'string') {
    throw new Error('Entry must be a recordName');
  }

  var index = indexOrCallback;
  var cb = callback;
  if (typeof indexOrCallback === 'function') {
    cb = indexOrCallback;
    index = undefined;
  }

  if (this._record.isReady === false) {
    this._queuedMethods.push(this.addEntry.bind(this, entry, index, cb));
    return;
  }

  var hasIndex = this._hasIndex(index);
  var entries = this.getEntries();
  if (hasIndex) {
    entries.splice(index, 0, entry);
  } else {
    entries.push(entry);
  }

  this._beforeChange();
  if (cb) {
    this._record.set(entries, cb);
  } else {
    this._record.set(entries);
  }
  this._afterChange();
};

/**
 * Wrapper function around the list.addEntry that returns a promise
 * if no callback is supplied.
 *
 * @param {String} entry
 * @param {Number|Function} [index]
 * @param {Function} callback
 *
 * @public
 * @returns {Promise|void} if a callback is omitted a Promise is returned
 *                         with the result of the write
 */
List.prototype.addEntryWithAck = function (entry, indexOrCallback, callback) {
  var _this3 = this;

  if (typeof indexOrCallback === 'number' && callback) {
    return this.addEntry(entry, indexOrCallback, callback);
  }
  if (typeof indexOrCallback === 'function') {
    return this.addEntry(entry, indexOrCallback);
  }
  return new Promise(function (resolve, reject) {
    _this3.addEntry(entry, indexOrCallback, function (error) {
      return error === null ? resolve() : reject(error);
    });
  });
};

/**
 * Proxies the underlying Record's subscribe method. Makes sure
 * that no path is provided
 *
 * @public
 * @returns {void}
 */
List.prototype.subscribe = function () {
  var parameters = Record.prototype._normalizeArguments(arguments);

  if (parameters.path) {
    throw new Error('path is not supported for List.subscribe');
  }

  // Make sure the callback is invoked with an empty array for new records
  var listCallback = function (callback) {
    callback(this.getEntries());
  }.bind(this, parameters.callback);

  /**
  * Adding a property onto a function directly is terrible practice,
  * and we will change this as soon as we have a more seperate approach
  * of creating lists that doesn't have records default state.
  *
  * The reason we are holding a referencing to wrapped array is so that
  * on unsubscribe it can provide a reference to the actual method the
  * record is subscribed too.
  **/
  parameters.callback.wrappedCallback = listCallback;
  parameters.callback = listCallback;

  this._record.subscribe(parameters);
};

/**
 * Proxies the underlying Record's unsubscribe method. Makes sure
 * that no path is provided
 *
 * @public
 * @returns {void}
 */
List.prototype.unsubscribe = function () {
  var parameters = Record.prototype._normalizeArguments(arguments);

  if (parameters.path) {
    throw new Error('path is not supported for List.unsubscribe');
  }

  parameters.callback = parameters.callback.wrappedCallback;
  this._record.unsubscribe(parameters);
};

/**
 * Listens for changes in the Record's ready state
 * and applies them to this list
 *
 * @private
 * @returns {void}
 */
List.prototype._onReady = function () {
  this.isReady = true;

  for (var i = 0; i < this._queuedMethods.length; i++) {
    this._queuedMethods[i]();
  }

  this._queuedMethods = [];
  this.emit('ready');
};

/**
 * Listens for the record discard event and applies
 * changes to list
 *
 * @private
 * @returns {void}
 */
List.prototype._onDiscard = function () {
  this.isDestroyed = true;
  this.emit('discard');
};

/**
 * Proxies the underlying Record's _update method. Set's
 * data to an empty array if no data is provided.
 *
 * @param   {null}   path must (should :-)) be null
 * @param   {Array}  data
 *
 * @private
 * @returns {void}
 */
List.prototype._applyUpdate = function (message) {
  if (message.action === C.ACTIONS.PATCH) {
    throw new Error('PATCH is not supported for Lists');
  }

  if (message.data[2].charAt(0) !== '[') {
    message.data[2] = '[]';
  }

  this._beforeChange();
  Record.prototype._applyUpdate.call(this._record, message);
  this._afterChange();
};

/**
 * Validates that the index provided is within the current set of entries.
 *
 * @param {Number} index
 *
 * @private
 * @returns {Number}
 */
List.prototype._hasIndex = function (index) {
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
 *
 * @private
 * @returns {void}
 */
List.prototype._beforeChange = function () {
  this._hasAddListener = this.listeners(ENTRY_ADDED_EVENT).length > 0;
  this._hasRemoveListener = this.listeners(ENTRY_REMOVED_EVENT).length > 0;
  this._hasMoveListener = this.listeners(ENTRY_MOVED_EVENT).length > 0;

  if (this._hasAddListener || this._hasRemoveListener || this._hasMoveListener) {
    this._beforeStructure = this._getStructure();
  } else {
    this._beforeStructure = null;
  }
};

/**
 * Compares the structure of the list after a change to its previous structure and notifies
 * any add / move / remove listener. Won't do anything if no listeners are attached.
 *
 * @private
 * @returns {void}
 */
List.prototype._afterChange = function () {
  if (this._beforeStructure === null) {
    return;
  }

  var after = this._getStructure();
  var before = this._beforeStructure;
  var entry = void 0;
  var i = void 0;

  if (this._hasRemoveListener) {
    for (entry in before) {
      for (i = 0; i < before[entry].length; i++) {
        if (after[entry] === undefined || after[entry][i] === undefined) {
          this.emit(ENTRY_REMOVED_EVENT, entry, before[entry][i]);
        }
      }
    }
  }

  if (this._hasAddListener || this._hasMoveListener) {
    for (entry in after) {
      if (before[entry] === undefined) {
        for (i = 0; i < after[entry].length; i++) {
          this.emit(ENTRY_ADDED_EVENT, entry, after[entry][i]);
        }
      } else {
        for (i = 0; i < after[entry].length; i++) {
          if (before[entry][i] !== after[entry][i]) {
            if (before[entry][i] === undefined) {
              this.emit(ENTRY_ADDED_EVENT, entry, after[entry][i]);
            } else {
              this.emit(ENTRY_MOVED_EVENT, entry, after[entry][i]);
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
 *
 * @private
 * @returns {Array} structure
 */
List.prototype._getStructure = function () {
  var structure = {};
  var i = void 0;
  var entries = this._record.get();

  for (i = 0; i < entries.length; i++) {
    if (structure[entries[i]] === undefined) {
      structure[entries[i]] = [i];
    } else {
      structure[entries[i]].push(i);
    }
  }

  return structure;
};

module.exports = List;