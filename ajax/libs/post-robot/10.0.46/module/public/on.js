"use strict";

exports.__esModule = true;
exports.on = on;
exports.once = once;

var _src = require("zalgo-promise/src");

var _drivers = require("../drivers");

var _conf = require("../conf");

const getDefaultServerOptions = () => {
  // $FlowFixMe
  return {};
};

function on(name, options, handler) {
  if (!name) {
    throw new Error('Expected name');
  }

  options = options || getDefaultServerOptions();

  if (typeof options === 'function') {
    handler = options;
    options = getDefaultServerOptions();
  }

  if (!handler) {
    throw new Error('Expected handler');
  }

  const winOrProxyWin = options.window;
  const domain = options.domain || _conf.WILDCARD;
  const successHandler = handler || options.handler;

  const errorHandler = options.errorHandler || (err => {
    throw err;
  });

  const requestListener = (0, _drivers.addRequestListener)({
    name,
    win: winOrProxyWin,
    domain
  }, {
    handler: successHandler,
    handleError: errorHandler
  });
  return {
    cancel() {
      requestListener.cancel();
    }

  };
}

function once(name, options, handler) {
  options = options || getDefaultServerOptions();

  if (typeof options === 'function') {
    handler = options;
    options = getDefaultServerOptions();
  }

  const promise = new _src.ZalgoPromise();
  let listener; // eslint-disable-line prefer-const

  options.errorHandler = err => {
    listener.cancel();
    promise.reject(err);
  };

  listener = on(name, options, event => {
    listener.cancel();
    promise.resolve(event);

    if (handler) {
      return handler(event);
    }
  }); // $FlowFixMe

  promise.cancel = listener.cancel; // $FlowFixMe

  return promise;
}