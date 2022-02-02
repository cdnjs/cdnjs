"use strict";

exports.__esModule = true;
exports.send = void 0;

var _src = require("zalgo-promise/src");

var _src2 = require("cross-domain-utils/src");

var _src3 = require("belter/src");

var _conf = require("../conf");

var _drivers = require("../drivers");

var _lib = require("../lib");

var _global = require("../global");

var _window = require("../serialize/window");

var _on = require("./on");

function validateOptions(name, win, domain) {
  if (!name) {
    throw new Error('Expected name');
  }

  if (domain) {
    if (typeof domain !== 'string' && !Array.isArray(domain) && !(0, _src3.isRegex)(domain)) {
      throw new TypeError(`Can not send ${name}. Expected domain ${JSON.stringify(domain)} to be a string, array, or regex`);
    }
  }

  if ((0, _src2.isWindowClosed)(win)) {
    throw new Error(`Can not send ${name}. Target window is closed`);
  }
}

function normalizeDomain(win, targetDomain, actualDomain, {
  send
}) {
  return _src.ZalgoPromise.try(() => {
    if (typeof targetDomain === 'string') {
      return targetDomain;
    }

    return _src.ZalgoPromise.try(() => {
      return actualDomain || (0, _lib.sayHello)(win, {
        send
      }).then(({
        domain
      }) => domain);
    }).then(normalizedDomain => {
      if (!(0, _src2.matchDomain)(targetDomain, targetDomain)) {
        throw new Error(`Domain ${(0, _src3.stringify)(targetDomain)} does not match ${(0, _src3.stringify)(targetDomain)}`);
      }

      return normalizedDomain;
    });
  });
}

const send = (winOrProxyWin, name, data, options) => {
  options = options || {};
  const domainMatcher = options.domain || _conf.WILDCARD;
  const responseTimeout = options.timeout || _conf.RES_TIMEOUT;
  const childTimeout = options.timeout || _conf.CHILD_WINDOW_TIMEOUT;
  const fireAndForget = options.fireAndForget || false;
  return _window.ProxyWindow.toProxyWindow(winOrProxyWin, {
    send
  }).awaitWindow().then(win => {
    // $FlowFixMe
    return _src.ZalgoPromise.try(() => {
      validateOptions(name, win, domainMatcher);

      if ((0, _src2.isAncestor)(window, win)) {
        return (0, _lib.awaitWindowHello)(win, childTimeout);
      }
    }).then(({
      domain: actualDomain
    } = {}) => {
      return normalizeDomain(win, domainMatcher, actualDomain, {
        send
      });
    }).then(targetDomain => {
      const domain = targetDomain;
      const logName = name === _conf.MESSAGE_NAME.METHOD && data && typeof data.name === 'string' ? `${data.name}()` : name;

      if (__DEBUG__) {
        console.info('send::req', logName, domain, '\n\n', data); // eslint-disable-line no-console
      }

      const promise = new _src.ZalgoPromise();
      const hash = `${name}_${(0, _src3.uniqueID)()}`;

      if (!fireAndForget) {
        const responseListener = {
          name,
          win,
          domain,
          promise
        };
        (0, _drivers.addResponseListener)(hash, responseListener);
        const reqPromises = (0, _global.windowStore)('requestPromises').getOrSet(win, () => []);
        reqPromises.push(promise);
        promise.catch(() => {
          (0, _drivers.markResponseListenerErrored)(hash);
          (0, _drivers.deleteResponseListener)(hash);
        });
        const totalAckTimeout = (0, _lib.isWindowKnown)(win) ? _conf.ACK_TIMEOUT_KNOWN : _conf.ACK_TIMEOUT;
        const totalResTimeout = responseTimeout;
        let ackTimeout = totalAckTimeout;
        let resTimeout = totalResTimeout;
        const interval = (0, _src3.safeInterval)(() => {
          if ((0, _src2.isWindowClosed)(win)) {
            return promise.reject(new Error(`Window closed for ${name} before ${responseListener.ack ? 'response' : 'ack'}`));
          }

          if (responseListener.cancelled) {
            return promise.reject(new Error(`Response listener was cancelled for ${name}`));
          }

          ackTimeout = Math.max(ackTimeout - _conf.RESPONSE_CYCLE_TIME, 0);

          if (resTimeout !== -1) {
            resTimeout = Math.max(resTimeout - _conf.RESPONSE_CYCLE_TIME, 0);
          }

          if (!responseListener.ack && ackTimeout === 0) {
            return promise.reject(new Error(`No ack for postMessage ${logName} in ${(0, _src2.getDomain)()} in ${totalAckTimeout}ms`));
          } else if (resTimeout === 0) {
            return promise.reject(new Error(`No response for postMessage ${logName} in ${(0, _src2.getDomain)()} in ${totalResTimeout}ms`));
          }
        }, _conf.RESPONSE_CYCLE_TIME);
        promise.finally(() => {
          interval.cancel();
          reqPromises.splice(reqPromises.indexOf(promise, 1));
        }).catch(_src3.noop);
      }

      return (0, _drivers.sendMessage)(win, domain, {
        id: (0, _src3.uniqueID)(),
        origin: (0, _src2.getDomain)(window),
        type: _conf.MESSAGE_TYPE.REQUEST,
        hash,
        name,
        data,
        fireAndForget
      }, {
        on: _on.on,
        send
      }).then(() => {
        return fireAndForget ? promise.resolve() : promise;
      }, err => {
        throw new Error(`Send request message failed for ${logName} in ${(0, _src2.getDomain)()}\n\n${(0, _src3.stringifyError)(err)}`);
      });
    });
  });
};

exports.send = send;