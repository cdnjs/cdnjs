"use strict";

exports.__esModule = true;
exports.openTunnelToOpener = openTunnelToOpener;

var _src = require("zalgo-promise/src");

var _src2 = require("cross-domain-utils/src");

var _src3 = require("belter/src");

var _global = require("../global");

var _common = require("./common");

function awaitRemoteBridgeForWindow(win) {
  return (0, _global.windowStore)('remoteBridgeAwaiters').getOrSet(win, () => {
    return _src.ZalgoPromise.try(() => {
      const frame = (0, _src2.getFrameByName)(win, (0, _common.getBridgeName)((0, _src2.getDomain)()));

      if (!frame) {
        return;
      }

      if ((0, _src2.isSameDomain)(frame) && (0, _global.getGlobal)((0, _src2.assertSameDomain)(frame))) {
        return frame;
      }

      return new _src.ZalgoPromise(resolve => {
        let interval;
        let timeout; // eslint-disable-line prefer-const

        interval = setInterval(() => {
          // eslint-disable-line prefer-const
          if (frame && (0, _src2.isSameDomain)(frame) && (0, _global.getGlobal)((0, _src2.assertSameDomain)(frame))) {
            clearInterval(interval);
            clearTimeout(timeout);
            return resolve(frame);
          }
        }, 100);
        timeout = setTimeout(() => {
          clearInterval(interval);
          return resolve();
        }, 2000);
      });
    });
  });
}

function openTunnelToOpener({
  on,
  send,
  receiveMessage
}) {
  return _src.ZalgoPromise.try(() => {
    const opener = (0, _src2.getOpener)(window);

    if (!opener || !(0, _common.needsBridge)({
      win: opener
    })) {
      return;
    }

    (0, _common.registerRemoteWindow)(opener);
    return awaitRemoteBridgeForWindow(opener).then(bridge => {
      if (!bridge) {
        return (0, _common.rejectRemoteSendMessage)(opener, new Error(`Can not register with opener: no bridge found in opener`));
      }

      if (!window.name) {
        return (0, _common.rejectRemoteSendMessage)(opener, new Error(`Can not register with opener: window does not have a name`));
      }

      return (0, _global.getGlobal)((0, _src2.assertSameDomain)(bridge)).openTunnelToParent({
        name: window.name,
        source: window,

        canary() {// pass
        },

        sendMessage(message) {
          try {
            (0, _src3.noop)(window);
          } catch (err) {
            return;
          }

          if (!window || window.closed) {
            return;
          }

          try {
            receiveMessage({
              data: message,
              // $FlowFixMe[object-this-reference]
              origin: this.origin,
              // $FlowFixMe[object-this-reference]
              source: this.source
            }, {
              on,
              send
            });
          } catch (err) {
            _src.ZalgoPromise.reject(err);
          }
        }

      }).then(({
        source,
        origin,
        data
      }) => {
        if (source !== opener) {
          throw new Error(`Source does not match opener`);
        }

        (0, _common.registerRemoteSendMessage)(source, origin, data.sendMessage);
      }).catch(err => {
        (0, _common.rejectRemoteSendMessage)(opener, err);
        throw err;
      });
    });
  });
}