'use strict';

var C = require('../constants/constants');

/**
 * Parses ASCII control character seperated
 * message strings into digestable maps
 *
 * @constructor
 */
var MessageParser = function MessageParser() {
  this._actions = this._getActions();
};

/**
 * Main interface method. Receives a raw message
 * string, containing one or more messages
 * and returns an array of parsed message objects
 * or null for invalid messages
 *
 * @param   {String} message raw message
 *
 * @public
 *
 * @returns {Array} array of parsed message objects
 *                  following the format
 *                  {
 *                    raw: <original message string>
 *                    topic: <string>
 *                    action: <string - shortcode>
 *                    data: <array of strings>
 *                  }
 */
MessageParser.prototype.parse = function (message, client) {
  var parsedMessages = [];
  var rawMessages = message.split(C.MESSAGE_SEPERATOR);

  for (var i = 0; i < rawMessages.length; i++) {
    if (rawMessages[i].length > 2) {
      parsedMessages.push(this._parseMessage(rawMessages[i], client));
    }
  }

  return parsedMessages;
};

/**
 * Deserializes values created by MessageBuilder.typed to
 * their original format
 *
 * @param {String} value
 *
 * @public
 * @returns {Mixed} original value
 */
MessageParser.prototype.convertTyped = function (value, client) {
  var type = value.charAt(0);

  if (type === C.TYPES.STRING) {
    return value.substr(1);
  }

  if (type === C.TYPES.OBJECT) {
    try {
      return JSON.parse(value.substr(1));
    } catch (e) {
      client._$onError(C.TOPIC.ERROR, C.EVENT.MESSAGE_PARSE_ERROR, e.toString() + '(' + value + ')');
      return undefined;
    }
  }

  if (type === C.TYPES.NUMBER) {
    return parseFloat(value.substr(1));
  }

  if (type === C.TYPES.NULL) {
    return null;
  }

  if (type === C.TYPES.TRUE) {
    return true;
  }

  if (type === C.TYPES.FALSE) {
    return false;
  }

  if (type === C.TYPES.UNDEFINED) {
    return undefined;
  }

  client._$onError(C.TOPIC.ERROR, C.EVENT.MESSAGE_PARSE_ERROR, 'UNKNOWN_TYPE (' + value + ')');
  return undefined;
};

/**
 * Turns the ACTION:SHORTCODE constants map
 * around to facilitate shortcode lookup
 *
 * @private
 *
 * @returns {Object} actions
 */
MessageParser.prototype._getActions = function () {
  var actions = {};

  for (var key in C.ACTIONS) {
    actions[C.ACTIONS[key]] = key;
  }

  return actions;
};

/**
 * Parses an individual message (as oppnosed to a
 * block of multiple messages as is processed by .parse())
 *
 * @param   {String} message
 *
 * @private
 *
 * @returns {Object} parsedMessage
 */
MessageParser.prototype._parseMessage = function (message, client) {
  var parts = message.split(C.MESSAGE_PART_SEPERATOR);
  var messageObject = {};

  if (parts.length < 2) {
    client._$onError(C.TOPIC.ERROR, C.EVENT.MESSAGE_PARSE_ERROR, 'Insufficiant message parts');
    return null;
  }

  if (this._actions[parts[1]] === undefined) {
    client._$onError(C.TOPIC.ERROR, C.EVENT.MESSAGE_PARSE_ERROR, 'Unknown action ' + parts[1]);
    return null;
  }

  messageObject.raw = message;
  messageObject.topic = parts[0];
  messageObject.action = parts[1];
  messageObject.data = parts.splice(2);

  return messageObject;
};

module.exports = new MessageParser();