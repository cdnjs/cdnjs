'use strict';

var C = require('../constants/constants');
var ResubscribeNotifier = require('./resubscribe-notifier');

/**
 * Provides a scaffold for subscriptionless requests to deepstream, such as the SNAPSHOT
 * and HAS functionality. The SingleNotifier multiplexes all the client requests so
 * that they can can be notified at once, and also includes reconnection funcionality
 * incase the connection drops.
 *
 * @param {Client} client          The deepstream client
 * @param {Connection} connection  The deepstream connection
 * @param {String} topic           Constant. One of C.TOPIC
 * @param {String} action          Constant. One of C.ACTIONS
 * @param {Number} timeoutDuration The duration of the timeout in milliseconds
 *
 * @constructor
 */
var SingleNotifier = function SingleNotifier(client, connection, topic, action, timeoutDuration) {
  this._client = client;
  this._connection = connection;
  this._topic = topic;
  this._action = action;
  this._timeoutDuration = timeoutDuration;
  this._requests = {};
  this._ackTimeoutRegistry = client._$getAckTimeoutRegistry();
  this._resubscribeNotifier = new ResubscribeNotifier(this._client, this._resendRequests.bind(this));
  this._onResponseTimeout = this._onResponseTimeout.bind(this);
};

/**
 * Check if there is a request pending with a specified name
 *
 * @param {String} name An identifier for the request, e.g. a record name
 *
 * @public
 * @returns {void}
 */
SingleNotifier.prototype.hasRequest = function (name) {
  return !!this._requests[name];
};

/**
 * Add a request. If one has already been made it will skip the server request
 * and multiplex the response
 *
 * @param {String} name An identifier for the request, e.g. a record name
 * @param {Object} response An object with property `callback` or `resolve` and `reject`
 *
 * @public
 * @returns {void}
 */
SingleNotifier.prototype.request = function (name, response) {
  if (!this._requests[name]) {
    this._requests[name] = [];
    this._connection.sendMsg(this._topic, this._action, [name]);
  }

  var ackId = this._ackTimeoutRegistry.add({
    topic: this._topic,
    event: C.EVENT.RESPONSE_TIMEOUT,
    name: name,
    action: this._action,
    timeout: this._timeoutDuration,
    callback: this._onResponseTimeout
  });
  this._requests[name].push({ response: response, ackId: ackId });
};

/**
 * Process a response for a request. This has quite a flexible API since callback functions
 * differ greatly and helps maximise reuse.
 *
 * @param {String} name An identifier for the request, e.g. a record name
 * @param {String} error Error message
 * @param {Object} data If successful, the response data
 *
 * @public
 * @returns {void}
 */
SingleNotifier.prototype.recieve = function (name, error, data) {
  var entries = this._requests[name];

  if (!entries) {
    this._client._$onError(this._topic, C.EVENT.UNSOLICITED_MESSAGE, 'no entry for ' + name);
    return;
  }

  for (var i = 0; i < entries.length; i++) {
    var entry = entries[i];
    this._ackTimeoutRegistry.remove({
      ackId: entry.ackId
    });

    if (entry.response.callback) {
      entry.response.callback(error, data);
    } else if (error) {
      entry.response.reject(data);
    } else {
      entry.response.resolve(data);
    }
  }
  delete this._requests[name];
};

/**
 * Will be invoked if a timeout occurs before a response arrives from the server
 *
 * @param {String} name An identifier for the request, e.g. a record name
 *
 * @private
 * @returns {void}
 */
SingleNotifier.prototype._onResponseTimeout = function (timeout) {
  var msg = 'No response received in time for ' + this._topic + '|' + this._action + '|' + timeout.name;
  this._client._$onError(this._topic, C.EVENT.RESPONSE_TIMEOUT, msg);
};

/**
 * Resends all the requests once the connection is back up
 *
 * @private
 * @returns {void}
 */
SingleNotifier.prototype._resendRequests = function () {
  for (var request in this._requests) {
    this._connection.sendMsg(this._topic, this._action, [request]);
  }
};

module.exports = SingleNotifier;