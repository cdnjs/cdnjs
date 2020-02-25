'use strict';

var MERGE_STRATEGIES = require('./constants/merge-strategies');

module.exports = {
  /**
   * @param {Number} heartBeatInterval           How often you expect the heartbeat to be sent.
   *                                             If two heatbeats are missed in a row the client
   *                                             will consider the server to have disconnected
   *                                             and will close the connection in order to
   *                                             establish a new one.
   */
  heartbeatInterval: 30000,

  /**
   * @param {Number} reconnectIntervalIncrement  Specifies the number of milliseconds by
   *                                             which the time until the next reconnection
   *                                             attempt will be incremented after every
   *                                             unsuccesful attempt.
   *                                             E.g. for 1500: if the connection is lost,
   *                                             the client will attempt to reconnect immediatly,
   *                                             if that fails it will try again after 1.5 seconds,
   *                                             if that fails it will try again after 3 seconds
   *                                             and so on
   */
  reconnectIntervalIncrement: 4000,

  /**
   * @param {Number} maxReconnectInterval        Specifies the maximum number of milliseconds for
   *                                             the reconnectIntervalIncrement
   *                                             The amount of reconnections will reach this value
   *                                             then reconnectIntervalIncrement will be ignored.
   */
  maxReconnectInterval: 180000,

  /**
   * @param {Number} maxReconnectAttempts        The number of reconnection attempts until the
   *                                             client gives up and declares the connection closed
   */
  maxReconnectAttempts: 5,

  /**
   * @param {Number} rpcAckTimeout               The number of milliseconds after which a rpc will
   *                                             create an error if no Ack-message has been received
   */
  rpcAckTimeout: 6000,

  /**
   * @param {Number} rpcResponseTimeout          The number of milliseconds after which a rpc will
   *                                             create an error if no response-message has been
   *                                             received
   */
  rpcResponseTimeout: 10000,

  /**
   * @param {Number} subscriptionTimeout         The number of milliseconds that can pass after
   *                                             providing/unproviding a RPC or subscribing/
   *                                             unsubscribing/listening to a record before an
   *                                             error is thrown
   */
  subscriptionTimeout: 2000,

  /**
   * @param {Number} maxMessagesPerPacket        If the implementation tries to send a large
   *                                             number of messages at the same time, the deepstream
   *                                             client will try to split them into smaller packets
   *                                             and send these every
   *                                             <timeBetweenSendingQueuedPackages> ms.
   *
   *                                             This parameter specifies the number of messages
   *                                             after which deepstream sends the packet and
   *                                             queues the remaining messages.
   *                                             Set to Infinity to turn the feature off.
   *
   */
  maxMessagesPerPacket: 100,

  /**
   * @param {Number} timeBetweenSendingQueuedPackages
   *                                             Please see description for
   *                                             maxMessagesPerPacket. Sets the time in ms.
   */
  timeBetweenSendingQueuedPackages: 16,

  /**
   * @param {Number} recordReadAckTimeout       The number of milliseconds from the moment
   *                                            client.record.getRecord() is called until an error
   *                                            is thrown since no ack message has been received.
   */
  recordReadAckTimeout: 15000,

  /**
   * @param {Number} recordReadTimeout           The number of milliseconds from the moment
   *                                             client.record.getRecord() is called until an error
   *                                             is thrown since no data has been received.
   */
  recordReadTimeout: 15000,

  /**
   * @param {Number} recordDeleteTimeout         The number of milliseconds from the moment
   *                                             record.delete() is called until an error is
   *                                             thrown since no delete ack message had been
   *                                             received.
   *                                             Please take into account that the deletion is only
   *                                             complete after the record has been deleted from
   *                                             both cache and storage
   */
  recordDeleteTimeout: 15000,

  /**
   * @param {String} path path to connect to
   */
  path: '/deepstream',

  /**
   *  @param {Function} mergeStrategy            This provides the default strategy used to
   *                                             deal with merge conflicts.
   *                                             If the merge strategy is not succesfull it will
   *                                             set an error, else set the returned data as the
   *                                             latest revision. This can be overriden on a per
   *                                             record basis by setting the `setMergeStrategy`.
   */
  mergeStrategy: MERGE_STRATEGIES.REMOTE_WINS,

  /**
   * @param {Boolean} recordDeepCopy             Setting to false disabled deepcopying of record
   *                                             data when provided via `get()` in a `subscribe`
   *                                             callback. This improves speed at the expense of
   *                                             the user having to ensure object immutability.
   */
  recordDeepCopy: true,

  /**
   * https://github.com/websockets/ws/blob/master/doc/ws.md#new-websocketaddress-protocols-options
   *
   * @param {Object} nodeSocketOptions           Options to pass to the websocket constructor in
   *                                             node.
   * @default null
   */
  nodeSocketOptions: null
};