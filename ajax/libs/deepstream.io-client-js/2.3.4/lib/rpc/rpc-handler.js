'use strict';

var C = require('../constants/constants');
var ResubscribeNotifier = require('../utils/resubscribe-notifier');
var RpcResponse = require('./rpc-response');
var Rpc = require('./rpc');
var messageParser = require('../message/message-parser');
var messageBuilder = require('../message/message-builder');

/**
 * The main class for remote procedure calls
 *
 * Provides the rpc interface and handles incoming messages
 * on the rpc topic
 *
 * @param {Object} options deepstream configuration options
 * @param {Connection} connection
 * @param {Client} client
 *
 * @constructor
 * @public
 */
var RpcHandler = function RpcHandler(options, connection, client) {
  this._options = options;
  this._connection = connection;
  this._client = client;
  this._rpcs = {};
  this._providers = {};
  this._ackTimeoutRegistry = client._$getAckTimeoutRegistry();
  this._resubscribeNotifier = new ResubscribeNotifier(this._client, this._reprovide.bind(this));
};

RpcHandler.prototype.providerNames = function () {
  return Object.keys(this._providers);
};

/**
 * Registers a callback function as a RPC provider. If another connected client calls
 * client.rpc.make() the request will be routed to this method
 *
 * The callback will be invoked with two arguments:
 *     {Mixed} data The data passed to the client.rpc.make function
 *     {RpcResponse} rpcResponse An object with methods to response,
 *                               acknowledge or reject the request
 *
 * Only one callback can be registered for a RPC at a time
 *
 * Please note: Deepstream tries to deliver data in its original format.
 * Data passed to client.rpc.make as a String will arrive as a String,
 * numbers or implicitly JSON serialized objects will arrive in their
 * respective format as well
 *
 * @public
 * @returns void
 */
RpcHandler.prototype.provide = function (name, callback) {
  if (typeof name !== 'string' || name.length === 0) {
    throw new Error('invalid argument name');
  }
  if (this._providers[name]) {
    throw new Error('RPC ' + name + ' already registered');
  }
  if (typeof callback !== 'function') {
    throw new Error('invalid argument callback');
  }

  this._ackTimeoutRegistry.add({
    topic: C.TOPIC.RPC,
    name: name,
    action: C.ACTIONS.SUBSCRIBE
  });
  this._providers[name] = callback;
  this._connection.sendMsg(C.TOPIC.RPC, C.ACTIONS.SUBSCRIBE, [name]);
};

/**
 * Unregisters this client as a provider for a remote procedure call
 *
 * @param   {String} name the name of the rpc
 *
 * @public
 * @returns {void}
 */
RpcHandler.prototype.unprovide = function (name) {
  if (typeof name !== 'string' || name.length === 0) {
    throw new Error('invalid argument name');
  }

  if (this._providers[name]) {
    delete this._providers[name];
    this._ackTimeoutRegistry.add({
      topic: C.TOPIC.RPC,
      name: name,
      action: C.ACTIONS.UNSUBSCRIBE
    });
    this._connection.sendMsg(C.TOPIC.RPC, C.ACTIONS.UNSUBSCRIBE, [name]);
  }
};

/**
 * Executes the actual remote procedure call
 *
 * @param   {String}   name     The name of the rpc
 * @param   {Mixed}    data     Serializable data that will be passed to the provider
 * @param   {Function} callback Will be invoked with the returned result or if the rpc failed
 *                              receives to arguments: error or null and the result
 *
 * @public
 * @returns {void}
 */
RpcHandler.prototype.make = function (name, data, callback) {
  var _this = this;

  // eslint-disable-line
  if (typeof name !== 'string' || name.length === 0) {
    throw new Error('invalid argument name');
  }

  var uid = this._client.getUid();
  var typedData = messageBuilder.typed(data);

  this._connection.sendMsg(C.TOPIC.RPC, C.ACTIONS.REQUEST, [name, uid, typedData]);
  if (callback && typeof callback === 'function') {
    this._rpcs[uid] = new Rpc(name, { callback: callback }, this._options, this._client);
  } else {
    return new Promise(function (resolve, reject) {
      _this._rpcs[uid] = new Rpc(name, { resolve: resolve, reject: reject }, _this._options, _this._client);
    });
  }
};

/**
 * Retrieves a RPC instance for a correlationId or throws an error
 * if it can't be found (which should never happen)
 *
 * @param {String} correlationId
 * @param {String} rpcName
 *
 * @private
 * @returns {Rpc}
 */
RpcHandler.prototype._getRpc = function (correlationId, rpcName, rawMessage) {
  var rpc = this._rpcs[correlationId];

  if (!rpc) {
    this._client._$onError(C.TOPIC.RPC, C.EVENT.UNSOLICITED_MESSAGE, rawMessage);
    return null;
  }

  return rpc;
};

/**
 * Handles incoming rpc REQUEST messages. Instantiates a new response object
 * and invokes the provider callback or rejects the request if no rpc provider
 * is present (which shouldn't really happen, but might be the result of a race condition
 * if this client sends a unprovide message whilst an incoming request is already in flight)
 *
 * @param   {Object} message The parsed deepstream RPC request message.
 *
 * @private
 * @returns {void}
 */
RpcHandler.prototype._respondToRpc = function (message) {
  var name = message.data[0];
  var correlationId = message.data[1];
  var data = null;
  var response = void 0;

  if (message.data[2]) {
    data = messageParser.convertTyped(message.data[2], this._client);
  }

  if (this._providers[name]) {
    response = new RpcResponse(this._connection, name, correlationId);
    this._providers[name](data, response);
  } else {
    this._connection.sendMsg(C.TOPIC.RPC, C.ACTIONS.REJECTION, [name, correlationId]);
  }
};

/**
 * Distributes incoming messages from the server
 * based on their action
 *
 * @param   {Object} message A parsed deepstream message
 *
 * @private
 * @returns {void}
 */
RpcHandler.prototype._$handle = function (message) {
  var rpcName = void 0;
  var correlationId = void 0;

  // RPC Requests
  if (message.action === C.ACTIONS.REQUEST) {
    this._respondToRpc(message);
    return;
  }

  // RPC subscription Acks
  if (message.action === C.ACTIONS.ACK && (message.data[0] === C.ACTIONS.SUBSCRIBE || message.data[0] === C.ACTIONS.UNSUBSCRIBE)) {
    this._ackTimeoutRegistry.clear(message);
    return;
  }

  // handle auth/denied subscription errors
  if (message.action === C.ACTIONS.ERROR) {
    if (message.data[0] === C.EVENT.MESSAGE_PERMISSION_ERROR) {
      return;
    }
    if (message.data[0] === C.EVENT.MESSAGE_DENIED && message.data[2] === C.ACTIONS.SUBSCRIBE) {
      this._ackTimeoutRegistry.remove({
        topic: C.TOPIC.RPC,
        action: C.ACTIONS.SUBSCRIBE,
        name: message.data[1]
      });
      return;
    }
  }

  /*
   * Error messages always have the error as first parameter. So the
   * order is different to ack and response messages
   */
  if (message.action === C.ACTIONS.ERROR || message.action === C.ACTIONS.ACK) {
    if (message.data[0] === C.EVENT.MESSAGE_DENIED && message.data[2] === C.ACTIONS.REQUEST) {
      correlationId = message.data[3];
    } else {
      correlationId = message.data[2];
    }
    rpcName = message.data[1];
  } else {
    rpcName = message.data[0];
    correlationId = message.data[1];
  }

  /*
  * Retrieve the rpc object
  */
  var rpc = this._getRpc(correlationId, rpcName, message.raw);
  if (rpc === null) {
    return;
  }

  // RPC Responses
  if (message.action === C.ACTIONS.ACK) {
    rpc.ack();
  } else if (message.action === C.ACTIONS.RESPONSE) {
    rpc.respond(message.data[2]);
    delete this._rpcs[correlationId];
  } else if (message.action === C.ACTIONS.ERROR) {
    message.processedError = true;
    rpc.error(message.data[0]);
    delete this._rpcs[correlationId];
  }
};

/**
 * Reregister providers to events when connection is lost
 *
 * @package private
 * @returns {void}
 */
RpcHandler.prototype._reprovide = function () {
  for (var rpcName in this._providers) {
    this._connection.sendMsg(C.TOPIC.RPC, C.ACTIONS.SUBSCRIBE, [rpcName]);
  }
};

module.exports = RpcHandler;