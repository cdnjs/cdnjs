'use strict';
/* eslint-disable prefer-spread, prefer-rest-params, consistent-return, no-confusing-arrow */

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var jsonPath = require('./json-path');
var ResubscribeNotifier = require('../utils/resubscribe-notifier');
var EventEmitter = require('component-emitter2');
var C = require('../constants/constants');
var messageBuilder = require('../message/message-builder');
var messageParser = require('../message/message-parser');
var utils = require('../utils/utils');

/**
 * This class represents a single record - an observable
 * dataset returned by client.record.getRecord()
 *
 * @extends {EventEmitter}
 *
 * @param {String} name              The unique name of the record
 * @param {Object} recordOptions     A map of options, e.g. { persist: true }
 * @param {Connection} Connection    The instance of the server connection
 * @param {Object} options        Deepstream options
 * @param {Client} client        deepstream.io client
 *
 * @constructor
 */
var Record = function Record(name, recordOptions, connection, options, client) {
  if (typeof name !== 'string' || name.length === 0) {
    throw new Error('invalid argument name');
  }

  this.name = name;
  this.usages = 0;
  this._recordOptions = recordOptions;
  this._connection = connection;
  this._client = client;
  this._options = options;
  this.isReady = false;
  this.isDestroyed = false;
  this.hasProvider = false;
  this._$data = Object.create(null);
  this.version = null;
  this._eventEmitter = new EventEmitter();
  this._queuedMethodCalls = [];
  this._writeCallbacks = {};

  this._mergeStrategy = null;
  if (options.mergeStrategy) {
    this.setMergeStrategy(options.mergeStrategy);
  }

  this._ackTimeoutRegistry = client._$getAckTimeoutRegistry();
  this._resubscribeNotifier = new ResubscribeNotifier(this._client, this._sendRead.bind(this));

  this._readAckTimeout = this._ackTimeoutRegistry.add({
    topic: C.TOPIC.RECORD,
    name: name,
    action: C.ACTIONS.SUBSCRIBE,
    timeout: this._options.recordReadAckTimeout
  });
  this._responseTimeout = this._ackTimeoutRegistry.add({
    topic: C.TOPIC.RECORD,
    name: name,
    action: C.ACTIONS.READ,
    event: C.EVENT.RESPONSE_TIMEOUT,
    timeout: this._options.recordReadTimeout
  });
  this._sendRead();
};

EventEmitter(Record.prototype); // eslint-disable-line

/**
 * Set a merge strategy to resolve any merge conflicts that may occur due
 * to offline work or write conflicts. The function will be called with the
 * local record, the remote version/data and a callback to call once the merge has
 * completed or if an error occurs ( which leaves it in an inconsistent state until
 * the next update merge attempt ).
 *
 * @param   {Function} mergeStrategy A Function that can resolve merge issues.
 *
 * @public
 * @returns {void}
 */
Record.prototype.setMergeStrategy = function (mergeStrategy) {
  if (typeof mergeStrategy === 'function') {
    this._mergeStrategy = mergeStrategy;
  } else {
    throw new Error('Invalid merge strategy: Must be a Function');
  }
};

/**
 * Returns a copy of either the entire dataset of the record
 * or - if called with a path - the value of that path within
 * the record's dataset.
 *
 * Returning a copy rather than the actual value helps to prevent
 * the record getting out of sync due to unintentional changes to
 * its data
 *
 * @param   {[String]} path A JSON path, e.g. users[ 2 ].firstname
 *
 * @public
 * @returns {Mixed} value
 */
Record.prototype.get = function (path) {
  return jsonPath.get(this._$data, path, this._options.recordDeepCopy);
};

/**
 * Wrapper function around the record.set that returns a promise
 * if no callback is supplied.
 *
 * @param {String|Object}   pathOrData     the path or data to write to the record
 * @param {Object|Function}   dataOrCallback the data to write to the record or the write
 *                                  acknowledgement callback
 * @param {Function} callback       the callback with the result of the write
 * @returns {Promise} if a callback is omitted a Promise is returned with the result of the write
 */
Record.prototype.setWithAck = function (pathOrData, dataOrCallback, callback) {
  var _this = this;

  if (pathOrData && dataOrCallback && callback) {
    this.set(pathOrData, dataOrCallback, callback);
  } else if (pathOrData && typeof dataOrCallback === 'function') {
    this.set(pathOrData, dataOrCallback);
  } else if (pathOrData && (typeof dataOrCallback === 'undefined' ? 'undefined' : _typeof(dataOrCallback)) === 'object') {
    return new Promise(function (resolve, reject) {
      _this.set(pathOrData, dataOrCallback, function (error) {
        return error === null ? resolve() : reject(error);
      });
    });
  } else {
    return new Promise(function (resolve, reject) {
      _this.set(pathOrData, function (error) {
        return error === null ? resolve() : reject(error);
      });
    });
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
 *
 * @public
 * @returns {void}
 */
Record.prototype.set = function (pathOrData, dataOrCallback, callback) {
  var path = void 0;
  var data = void 0;
  if (arguments.length === 1) {
    // set( object )
    if ((typeof pathOrData === 'undefined' ? 'undefined' : _typeof(pathOrData)) !== 'object') {
      throw new Error('invalid argument data');
    }
    data = pathOrData;
  } else if (arguments.length === 2) {
    if (typeof pathOrData === 'string' && pathOrData.length !== 0 && typeof dataOrCallback !== 'function') {
      // set( path, data )
      path = pathOrData;
      data = dataOrCallback;
    } else if ((typeof pathOrData === 'undefined' ? 'undefined' : _typeof(pathOrData)) === 'object' && typeof dataOrCallback === 'function') {
      // set( data, callback )
      data = pathOrData;
      callback = dataOrCallback; // eslint-disable-line
    } else {
      throw new Error('invalid argument path');
    }
  } else if (arguments.length === 3) {
    // set( path, data, callback )
    if (typeof pathOrData !== 'string' || pathOrData.length === 0 || typeof callback !== 'function') {
      throw new Error('invalid arguments, must pass in a string, a value and a function');
    }
    path = pathOrData;
    data = dataOrCallback;
  }

  if (!path && (data === null || (typeof data === 'undefined' ? 'undefined' : _typeof(data)) !== 'object')) {
    throw new Error('invalid arguments, scalar values cannot be set without path');
  }

  if (this._checkDestroyed('set')) {
    return this;
  }

  if (!this.isReady) {
    this._queuedMethodCalls.push({ method: 'set', args: arguments });
    return this;
  }

  var oldValue = this._$data;
  var newValue = jsonPath.set(oldValue, path, data, this._options.recordDeepCopy);

  if (oldValue === newValue) {
    if (typeof callback === 'function') {
      var errorMessage = null;
      if (!utils.isConnected(this._client)) {
        errorMessage = 'Connection error: error updating record as connection was closed';
      }
      utils.requestIdleCallback(function () {
        return callback(errorMessage);
      });
    }
    return this;
  }

  var config = void 0;
  if (typeof callback === 'function') {
    config = {};
    config.writeSuccess = true;
    if (!utils.isConnected(this._client)) {
      utils.requestIdleCallback(function () {
        return callback('Connection error: error updating record as connection was closed');
      });
    } else {
      this._setUpCallback(this.version, callback);
    }
  }
  this._sendUpdate(path, data, config);
  this._applyChange(newValue);
  return this;
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
 *
 * @param   {[String]}    path      A JSON path within the record to subscribe to
 * @param   {Function}    callback         Callback function to notify on changes
 * @param   {[Boolean]}   triggerNow      A flag to specify whether the callback should
 *                                         be invoked immediatly with the current value
 *
 * @public
 * @returns {void}
 */
// eslint-disable-next-line
Record.prototype.subscribe = function (path, callback, triggerNow) {
  var _this2 = this;

  var args = this._normalizeArguments(arguments);

  if (args.path !== undefined && (typeof args.path !== 'string' || args.path.length === 0)) {
    throw new Error('invalid argument path');
  }
  if (typeof args.callback !== 'function') {
    throw new Error('invalid argument callback');
  }

  if (this._checkDestroyed('subscribe')) {
    return;
  }

  if (args.triggerNow) {
    this.whenReady(function () {
      _this2._eventEmitter.on(args.path, args.callback);
      args.callback(_this2.get(args.path));
    });
  } else {
    this._eventEmitter.on(args.path, args.callback);
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
 * @param   {[String|Function]}   pathOrCallback A JSON path
 * @param   {Function}         callback     The callback method. Please note, if a bound
 *                                          method was passed to subscribe, the same method
 *                                          must be passed to unsubscribe as well.
 *
 * @public
 * @returns {void}
 */
// eslint-disable-next-line
Record.prototype.unsubscribe = function (pathOrCallback, callback) {
  var args = this._normalizeArguments(arguments);

  if (args.path !== undefined && (typeof args.path !== 'string' || args.path.length === 0)) {
    throw new Error('invalid argument path');
  }
  if (args.callback !== undefined && typeof args.callback !== 'function') {
    throw new Error('invalid argument callback');
  }

  if (this._checkDestroyed('unsubscribe')) {
    return;
  }
  this._eventEmitter.off(args.path, args.callback);
};

/**
 * Removes all change listeners and notifies the server that the client is
 * no longer interested in updates for this record
 *
 * @public
 * @returns {void}
 */
Record.prototype.discard = function () {
  var _this3 = this;

  if (this._checkDestroyed('discard')) {
    return;
  }
  this.whenReady(function () {
    _this3.usages--;
    if (_this3.usages <= 0) {
      _this3.emit('destroyPending');
      _this3._discardTimeout = _this3._ackTimeoutRegistry.add({
        topic: C.TOPIC.RECORD,
        name: _this3.name,
        action: C.ACTIONS.UNSUBSCRIBE
      });
      _this3._connection.sendMsg(C.TOPIC.RECORD, C.ACTIONS.UNSUBSCRIBE, [_this3.name]);
    }
  });
};

/**
 * Deletes the record on the server.
 *
 * @public
 * @returns {void}
 */
Record.prototype.delete = function () {
  var _this4 = this;

  if (this._checkDestroyed('delete')) {
    return;
  }
  this.whenReady(function () {
    _this4.emit('destroyPending');
    _this4._deleteAckTimeout = _this4._ackTimeoutRegistry.add({
      topic: C.TOPIC.RECORD,
      name: _this4.name,
      action: C.ACTIONS.DELETE,
      event: C.EVENT.DELETE_TIMEOUT,
      timeout: _this4._options.recordDeleteTimeout
    });
    _this4._connection.sendMsg(C.TOPIC.RECORD, C.ACTIONS.DELETE, [_this4.name]);
  });
};

/**
 * Convenience method, similar to promises. Executes callback
 * whenever the record is ready, either immediatly or once the ready
 * event is fired
 *
 * @param   {Function} callback Will be called when the record is ready
 *
 * @returns {void}
 */
Record.prototype.whenReady = function (callback) {
  var _this5 = this;

  if (this.isReady === true) {
    if (callback) {
      callback(this);
      return;
    }
    return Promise.resolve(this);
  }
  if (callback) {
    this.once('ready', callback.bind(this, this));
  } else {
    return new Promise(function (resolve) {
      return _this5.once('ready', resolve.bind(_this5, _this5));
    });
  }
};

/**
 * Callback for incoming messages from the message handler
 *
 * @param   {Object} message parsed and validated deepstream message
 *
 * @package private
 * @returns {void}
 */
Record.prototype._$onMessage = function (message) {
  if (message.action === C.ACTIONS.READ) {
    if (this.version === null) {
      this._ackTimeoutRegistry.clear(message);
      this._onRead(message);
    } else {
      this._applyUpdate(message, this._client);
    }
  } else if (message.action === C.ACTIONS.ACK) {
    this._processAckMessage(message);
  } else if (message.action === C.ACTIONS.UPDATE || message.action === C.ACTIONS.PATCH) {
    this._applyUpdate(message, this._client);
  } else if (message.action === C.ACTIONS.WRITE_ACKNOWLEDGEMENT) {
    Record._handleWriteAcknowledgements(message, this._writeCallbacks, this._client);
  } else if (message.data[0] === C.EVENT.VERSION_EXISTS) {
    // Otherwise it should be an error, and dealt with accordingly
    this._recoverRecord(message.data[2], JSON.parse(message.data[3]), message);
  } else if (message.data[0] === C.EVENT.MESSAGE_DENIED) {
    this._clearTimeouts();
  } else if (message.action === C.ACTIONS.SUBSCRIPTION_HAS_PROVIDER) {
    var hasProvider = messageParser.convertTyped(message.data[1], this._client);
    this.hasProvider = hasProvider;
    this.emit('hasProviderChanged', hasProvider);
  }
};

Record._handleWriteAcknowledgements = function (message, callbacks, client) {
  var versions = JSON.parse(message.data[1]);
  for (var i = 0; i < versions.length; i++) {
    var callback = callbacks[versions[i]];
    if (callback !== undefined) {
      callback(messageParser.convertTyped(message.data[2], client));
      delete callbacks[versions[i]];
    }
  }
};

/**
 * Called when a merge conflict is detected by a VERSION_EXISTS error or if an update recieved
 * is directly after the clients. If no merge strategy is configure it will emit a VERSION_EXISTS
 * error and the record will remain in an inconsistent state.
 *
 * @param   {Number} remoteVersion The remote version number
 * @param   {Object} remoteData The remote object data
 * @param   {Object} message parsed and validated deepstream message
 *
 * @private
 * @returns {void}
 */
Record.prototype._recoverRecord = function (remoteVersion, remoteData, message) {
  message.processedError = true;
  if (this._mergeStrategy) {
    this._mergeStrategy(this, remoteData, remoteVersion, this._onRecordRecovered.bind(this, remoteVersion, remoteData, message));
  } else {
    this.emit('error', C.EVENT.VERSION_EXISTS, 'received update for ' + remoteVersion + ' but version is ' + this.version);
  }
};

Record.prototype._sendUpdate = function (path, data, config) {
  this.version++;
  var msgData = void 0;
  if (!path) {
    msgData = config === undefined ? [this.name, this.version, data] : [this.name, this.version, data, config];
    this._connection.sendMsg(C.TOPIC.RECORD, C.ACTIONS.UPDATE, msgData);
  } else {
    msgData = config === undefined ? [this.name, this.version, path, messageBuilder.typed(data)] : [this.name, this.version, path, messageBuilder.typed(data), config];
    this._connection.sendMsg(C.TOPIC.RECORD, C.ACTIONS.PATCH, msgData);
  }
};

/**
 * Callback once the record merge has completed. If successful it will set the
 * record state, else emit and error and the record will remain in an
 * inconsistent state until the next update.
 *
 * @param   {Number} remoteVersion The remote version number
 * @param   {Object} remoteData The remote object data
 * @param   {Object} message parsed and validated deepstream message
 *
 * @private
 * @returns {void}
 */
Record.prototype._onRecordRecovered = function (remoteVersion, remoteData, message, error, data) {
  if (!error) {
    var oldVersion = this.version;
    this.version = remoteVersion;

    var oldValue = this._$data;

    if (utils.deepEquals(oldValue, remoteData)) {
      return;
    }

    var newValue = jsonPath.set(oldValue, undefined, data, false);

    if (utils.deepEquals(data, remoteData)) {
      this._applyChange(data);

      var callback = this._writeCallbacks[remoteVersion];
      if (callback !== undefined) {
        callback(null);
        delete this._writeCallbacks[remoteVersion];
      }
      return;
    }

    var config = message.data[4];
    if (config && JSON.parse(config).writeSuccess) {
      var _callback = this._writeCallbacks[oldVersion];
      delete this._writeCallbacks[oldVersion];
      this._setUpCallback(this.version, _callback);
    }
    this._sendUpdate(undefined, data, config);
    this._applyChange(newValue);
  } else {
    this.emit('error', C.EVENT.VERSION_EXISTS, 'received update for ' + remoteVersion + ' but version is ' + this.version);
  }
};

/**
 * Callback for ack-messages. Acks can be received for
 * subscriptions, discards and deletes
 *
 * @param   {Object} message parsed and validated deepstream message
 *
 * @private
 * @returns {void}
 */
Record.prototype._processAckMessage = function (message) {
  var acknowledgedAction = message.data[0];

  if (acknowledgedAction === C.ACTIONS.SUBSCRIBE) {
    this._ackTimeoutRegistry.clear(message);
  } else if (acknowledgedAction === C.ACTIONS.DELETE) {
    this.emit('delete');
    this._destroy();
  } else if (acknowledgedAction === C.ACTIONS.UNSUBSCRIBE) {
    this.emit('discard');
    this._destroy();
  }
};

/**
 * Applies incoming updates and patches to the record's dataset
 *
 * @param   {Object} message parsed and validated deepstream message
 *
 * @private
 * @returns {void}
 */
Record.prototype._applyUpdate = function (message) {
  var version = parseInt(message.data[1], 10);
  var data = void 0;
  if (message.action === C.ACTIONS.PATCH) {
    data = messageParser.convertTyped(message.data[3], this._client);
  } else {
    data = JSON.parse(message.data[2]);
  }

  if (this.version === null) {
    this.version = version;
  } else if (this.version + 1 !== version) {
    if (message.action === C.ACTIONS.PATCH) {
      /**
      * Request a snapshot so that a merge can be done with the read reply which contains
      * the full state of the record
      **/
      this._connection.sendMsg(C.TOPIC.RECORD, C.ACTIONS.SNAPSHOT, [this.name]);
    } else {
      this._recoverRecord(version, data, message);
    }
    return;
  }

  this.version = version;
  this._applyChange(jsonPath.set(this._$data, message.action === C.ACTIONS.PATCH ? message.data[2] : undefined, data));
};

/**
 * Callback for incoming read messages
 *
 * @param   {Object} message parsed and validated deepstream message
 *
 * @private
 * @returns {void}
 */
Record.prototype._onRead = function (message) {
  this.version = parseInt(message.data[1], 10);
  this._applyChange(jsonPath.set(this._$data, undefined, JSON.parse(message.data[2])));
  this._setReady();
};

/**
 * Invokes method calls that where queued while the record wasn't ready
 * and emits the ready event
 *
 * @private
 * @returns {void}
 */
Record.prototype._setReady = function () {
  this.isReady = true;
  for (var i = 0; i < this._queuedMethodCalls.length; i++) {
    this[this._queuedMethodCalls[i].method].apply(this, this._queuedMethodCalls[i].args);
  }
  this._queuedMethodCalls = [];
  this.emit('ready');
};

Record.prototype._setUpCallback = function (currentVersion, callback) {
  var newVersion = Number(this.version) + 1;
  this._writeCallbacks[newVersion] = callback;
};

/**
 * Sends the read message, either initially at record
 * creation or after a lost connection has been re-established
 *
 * @private
 * @returns {void}
 */
Record.prototype._sendRead = function () {
  this._connection.sendMsg(C.TOPIC.RECORD, C.ACTIONS.CREATEORREAD, [this.name]);
};

/**
 * Compares the new values for every path with the previously stored ones and
 * updates the subscribers if the value has changed
 *
 * @private
 * @returns {void}
 */
Record.prototype._applyChange = function (newData) {
  if (this.isDestroyed) {
    return;
  }

  var oldData = this._$data;
  this._$data = newData;

  var paths = this._eventEmitter.eventNames();
  for (var i = 0; i < paths.length; i++) {
    var newValue = jsonPath.get(newData, paths[i], false);
    var oldValue = jsonPath.get(oldData, paths[i], false);

    if (newValue !== oldValue) {
      this._eventEmitter.emit(paths[i], this.get(paths[i]));
    }
  }
};

/**
 * Creates a map based on the types of the provided arguments
 *
 * @param {Arguments} args
 *
 * @private
 * @returns {Object} arguments map
 */
Record.prototype._normalizeArguments = function (args) {
  // If arguments is already a map of normalized parameters
  // (e.g. when called by AnonymousRecord), just return it.
  if (args.length === 1 && _typeof(args[0]) === 'object') {
    return args[0];
  }

  var result = Object.create(null);

  for (var i = 0; i < args.length; i++) {
    if (typeof args[i] === 'string') {
      result.path = args[i];
    } else if (typeof args[i] === 'function') {
      result.callback = args[i];
    } else if (typeof args[i] === 'boolean') {
      result.triggerNow = args[i];
    }
  }

  return result;
};

/**
 * Clears all timeouts that are set when the record is created
 *
 * @private
 * @returns {void}
 */
Record.prototype._clearTimeouts = function () {
  this._ackTimeoutRegistry.remove({ ackId: this._readAckTimeout, silent: true });
  this._ackTimeoutRegistry.remove({ ackId: this._responseTimeout, silent: true });
  this._ackTimeoutRegistry.remove({ ackId: this._deleteAckTimeout, silent: true });
  this._ackTimeoutRegistry.remove({ ackId: this._discardTimeout, silent: true });
};

/**
 * A quick check that's carried out by most methods that interact with the record
 * to make sure it hasn't been destroyed yet - and to handle it gracefully if it has.
 *
 * @param   {String} methodName The name of the method that invoked this check
 *
 * @private
 * @returns {Boolean} is destroyed
 */
Record.prototype._checkDestroyed = function (methodName) {
  if (this.isDestroyed) {
    this.emit('error', 'Can\'t invoke \'' + methodName + '\'. Record \'' + this.name + '\' is already destroyed');
    return true;
  }

  return false;
};

/**
 * Destroys the record and nulls all
 * its dependencies
 *
 * @private
 * @returns {void}
 */
Record.prototype._destroy = function () {
  this._clearTimeouts();
  this._eventEmitter.off();
  this._resubscribeNotifier.destroy();
  this.isDestroyed = true;
  this.isReady = false;
  this._client = null;
  this._eventEmitter = null;
  this._connection = null;
};

module.exports = Record;