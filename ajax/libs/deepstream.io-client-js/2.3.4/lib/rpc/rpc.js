'use strict';

var C = require('../constants/constants');
var messageParser = require('../message/message-parser');

/**
 * This class represents a single remote procedure
 * call made from the client to the server. It's main function
 * is to encapsulate the logic around timeouts and to convert the
 * incoming response data
 *
 * @param {Object}   options           deepstream client config
 * @param {Function} callback          the function that will be called once the request
 *                                     is complete or failed
 * @param {Client} client
 *
 * @constructor
 */
var Rpc = function Rpc(name, response, options, client) {
  this._options = options;
  this._response = response;
  this._client = client;
  this._ackTimeoutRegistry = client._$getAckTimeoutRegistry();
  this._ackTimeout = this._ackTimeoutRegistry.add({
    topic: C.TOPIC.RPC,
    action: C.ACTIONS.ACK,
    name: name,
    timeout: this._options.rpcAckTimeout,
    callback: this.error.bind(this)
  });
  this._responseTimeout = this._ackTimeoutRegistry.add({
    topic: C.TOPIC.RPC,
    action: C.ACTIONS.REQUEST,
    name: name,
    event: C.EVENT.RESPONSE_TIMEOUT,
    timeout: this._options.rpcResponseTimeout,
    callback: this.error.bind(this)
  });
};

/**
 * Called once an ack message is received from the server
 *
 * @public
 * @returns {void}
 */
Rpc.prototype.ack = function () {
  this._ackTimeoutRegistry.remove({
    ackId: this._ackTimeout
  });
};

/**
 * Called once a response message is received from the server.
 * Converts the typed data and completes the request
 *
 * @param   {String} data typed value
 *
 * @public
 * @returns {void}
 */
Rpc.prototype.respond = function (data) {
  var convertedData = messageParser.convertTyped(data, this._client);
  if (this._response.callback) {
    this._response.callback(null, convertedData);
  } else {
    this._response.resolve(convertedData);
  }
  this._complete();
};

/**
 * Callback for error messages received from the server. Once
 * an error is received the request is considered completed. Even
 * if a response arrives later on it will be ignored / cause an
 * UNSOLICITED_MESSAGE error
 *
 * @param   {String} errorMsg @TODO should be CODE and message
 *
 * @public
 * @returns {void}
 */
Rpc.prototype.error = function (timeout) {
  if (this._response.callback) {
    this._response.callback(timeout.event || timeout);
  } else {
    this._response.reject(timeout.event || timeout);
  }
  this._complete();
};

/**
 * Called after either an error or a response
 * was received
 *
 * @private
 * @returns {void}
 */
Rpc.prototype._complete = function () {
  this._ackTimeoutRegistry.remove({
    ackId: this._ackTimeout
  });
  this._ackTimeoutRegistry.remove({
    ackId: this._responseTimeout
  });
};

module.exports = Rpc;