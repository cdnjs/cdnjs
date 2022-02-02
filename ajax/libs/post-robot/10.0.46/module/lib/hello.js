"use strict";

exports.__esModule = true;
exports.awaitWindowHello = awaitWindowHello;
exports.getWindowInstanceID = getWindowInstanceID;
exports.initHello = initHello;
exports.sayHello = sayHello;

var _src = require("cross-domain-utils/src");

var _src2 = require("zalgo-promise/src");

var _src3 = require("belter/src");

var _conf = require("../conf");

var _global = require("../global");

function getInstanceID() {
  return (0, _global.globalStore)('instance').getOrSet('instanceID', _src3.uniqueID);
}

function getHelloPromise(win) {
  const helloPromises = (0, _global.windowStore)('helloPromises');
  return helloPromises.getOrSet(win, () => new _src2.ZalgoPromise());
}

function resolveHelloPromise(win, {
  domain
}) {
  const helloPromises = (0, _global.windowStore)('helloPromises');
  const existingPromise = helloPromises.get(win);

  if (existingPromise) {
    existingPromise.resolve({
      domain
    });
  }

  const newPromise = _src2.ZalgoPromise.resolve({
    domain
  });

  helloPromises.set(win, newPromise);
  return newPromise;
}

function listenForHello({
  on
}) {
  return on(_conf.MESSAGE_NAME.HELLO, {
    domain: _conf.WILDCARD
  }, ({
    source,
    origin
  }) => {
    resolveHelloPromise(source, {
      domain: origin
    });
    return {
      instanceID: getInstanceID()
    };
  });
}

function sayHello(win, {
  send
}) {
  return send(win, _conf.MESSAGE_NAME.HELLO, {
    instanceID: getInstanceID()
  }, {
    domain: _conf.WILDCARD,
    timeout: -1
  }).then(({
    origin,
    data: {
      instanceID
    }
  }) => {
    resolveHelloPromise(win, {
      domain: origin
    });
    return {
      win,
      domain: origin,
      instanceID
    };
  });
}

function getWindowInstanceID(win, {
  send
}) {
  return (0, _global.windowStore)('windowInstanceIDPromises').getOrSet(win, () => {
    return sayHello(win, {
      send
    }).then(({
      instanceID
    }) => instanceID);
  });
}

function initHello({
  on,
  send
}) {
  return (0, _global.globalStore)('builtinListeners').getOrSet('helloListener', () => {
    const listener = listenForHello({
      on
    });
    const parent = (0, _src.getAncestor)();

    if (parent) {
      sayHello(parent, {
        send
      }).catch(err => {
        // $FlowFixMe
        if (__TEST__ && (0, _global.getGlobal)(parent)) {
          throw err;
        }
      });
    }

    return listener;
  });
}

function awaitWindowHello(win, timeout = 5000, name = 'Window') {
  let promise = getHelloPromise(win);

  if (timeout !== -1) {
    promise = promise.timeout(timeout, new Error(`${name} did not load after ${timeout}ms`));
  }

  return promise;
}