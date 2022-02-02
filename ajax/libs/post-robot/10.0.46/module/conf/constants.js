"use strict";

exports.__esModule = true;
exports.WILDCARD = exports.SERIALIZATION_TYPE = exports.SEND_STRATEGY = exports.POSTROBOT_PROXY = exports.METHOD = exports.MESSAGE_TYPE = exports.MESSAGE_NAME = exports.MESSAGE_ACK = exports.BRIDGE_NAME_PREFIX = void 0;
const MESSAGE_TYPE = {
  REQUEST: 'postrobot_message_request',
  RESPONSE: 'postrobot_message_response',
  ACK: 'postrobot_message_ack'
};
exports.MESSAGE_TYPE = MESSAGE_TYPE;
const MESSAGE_ACK = {
  SUCCESS: 'success',
  ERROR: 'error'
};
exports.MESSAGE_ACK = MESSAGE_ACK;
const MESSAGE_NAME = {
  METHOD: 'postrobot_method',
  HELLO: 'postrobot_hello',
  OPEN_TUNNEL: 'postrobot_open_tunnel'
};
exports.MESSAGE_NAME = MESSAGE_NAME;
const SEND_STRATEGY = {
  POST_MESSAGE: 'postrobot_post_message',
  BRIDGE: 'postrobot_bridge',
  GLOBAL: 'postrobot_global'
};
exports.SEND_STRATEGY = SEND_STRATEGY;
const BRIDGE_NAME_PREFIX = '__postrobot_bridge__';
exports.BRIDGE_NAME_PREFIX = BRIDGE_NAME_PREFIX;
const POSTROBOT_PROXY = '__postrobot_proxy__';
exports.POSTROBOT_PROXY = POSTROBOT_PROXY;
const WILDCARD = '*';
exports.WILDCARD = WILDCARD;
const SERIALIZATION_TYPE = {
  CROSS_DOMAIN_ZALGO_PROMISE: 'cross_domain_zalgo_promise',
  CROSS_DOMAIN_FUNCTION: 'cross_domain_function',
  CROSS_DOMAIN_WINDOW: 'cross_domain_window'
};
exports.SERIALIZATION_TYPE = SERIALIZATION_TYPE;
const METHOD = {
  GET: 'get',
  POST: 'post'
};
exports.METHOD = METHOD;