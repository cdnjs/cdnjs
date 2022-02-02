"use strict";

exports.__esModule = true;
exports.deserializeMessage = deserializeMessage;
exports.serializeMessage = serializeMessage;

var _src = require("cross-domain-utils/src");

var _src2 = require("universal-serialize/src");

var _conf = require("../conf");

var _function = require("./function");

var _promise = require("./promise");

var _window = require("./window");

function serializeMessage(destination, domain, obj, {
  on,
  send
}) {
  return (0, _src2.serialize)(obj, {
    [_src2.TYPE.PROMISE]: (val, key) => (0, _promise.serializePromise)(destination, domain, val, key, {
      on,
      send
    }),
    [_src2.TYPE.FUNCTION]: (val, key) => (0, _function.serializeFunction)(destination, domain, val, key, {
      on,
      send
    }),
    [_src2.TYPE.OBJECT]: val => {
      return (0, _src.isWindow)(val) || _window.ProxyWindow.isProxyWindow(val) ? (0, _window.serializeWindow)(destination, domain, val, {
        send
      }) : val;
    }
  });
}

function deserializeMessage(source, origin, message, {
  send
}) {
  return (0, _src2.deserialize)(message, {
    [_conf.SERIALIZATION_TYPE.CROSS_DOMAIN_ZALGO_PROMISE]: serializedPromise => (0, _promise.deserializePromise)(source, origin, serializedPromise),
    [_conf.SERIALIZATION_TYPE.CROSS_DOMAIN_FUNCTION]: serializedFunction => (0, _function.deserializeFunction)(source, origin, serializedFunction, {
      send
    }),
    [_conf.SERIALIZATION_TYPE.CROSS_DOMAIN_WINDOW]: serializedWindow => (0, _window.deserializeWindow)(source, origin, serializedWindow, {
      send
    })
  });
}