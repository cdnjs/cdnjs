"use strict";

exports.__esModule = true;
exports.deserializePromise = deserializePromise;
exports.serializePromise = serializePromise;

var _src = require("zalgo-promise/src");

var _src2 = require("universal-serialize/src");

var _conf = require("../conf");

var _function = require("./function");

var _window = require("./window");

function serializePromise(destination, domain, val, key, {
  on,
  send
}) {
  return (0, _src2.serializeType)(_conf.SERIALIZATION_TYPE.CROSS_DOMAIN_ZALGO_PROMISE, {
    then: (0, _function.serializeFunction)(destination, domain, (resolve, reject) => val.then(resolve, reject), key, {
      on,
      send
    })
  });
}

function deserializePromise(source, origin, {
  then
}) {
  return new _src.ZalgoPromise(then);
}