"use strict";

exports.__esModule = true;
exports.setupOpenTunnelToParent = setupOpenTunnelToParent;

var _src = require("cross-domain-utils/src");

var _src2 = require("belter/src");

var _conf = require("../conf");

var _global = require("../global");

function cleanTunnelWindows() {
  const tunnelWindows = (0, _global.globalStore)('tunnelWindows');

  for (const key of tunnelWindows.keys()) {
    const tunnelWindow = tunnelWindows[key];

    try {
      (0, _src2.noop)(tunnelWindow.source);
    } catch (err) {
      tunnelWindows.del(key);
      continue;
    }

    if ((0, _src.isWindowClosed)(tunnelWindow.source)) {
      tunnelWindows.del(key);
    }
  }
}

function addTunnelWindow({
  name,
  source,
  canary,
  sendMessage
}) {
  cleanTunnelWindows();
  const id = (0, _src2.uniqueID)();
  const tunnelWindows = (0, _global.globalStore)('tunnelWindows');
  tunnelWindows.set(id, {
    name,
    source,
    canary,
    sendMessage
  });
  return id;
}

function setupOpenTunnelToParent({
  send
}) {
  (0, _global.getGlobal)(window).openTunnelToParent = function openTunnelToParent({
    name,
    source,
    canary,
    sendMessage
  }) {
    const tunnelWindows = (0, _global.globalStore)('tunnelWindows');
    const parentWindow = (0, _src.getParent)(window);

    if (!parentWindow) {
      throw new Error(`No parent window found to open tunnel to`);
    }

    const id = addTunnelWindow({
      name,
      source,
      canary,
      sendMessage
    });
    return send(parentWindow, _conf.MESSAGE_NAME.OPEN_TUNNEL, {
      name,

      sendMessage() {
        const tunnelWindow = tunnelWindows.get(id);

        try {
          // IE gets antsy if you try to even reference a closed window
          (0, _src2.noop)(tunnelWindow && tunnelWindow.source);
        } catch (err) {
          tunnelWindows.del(id);
          return;
        }

        if (!tunnelWindow || !tunnelWindow.source || (0, _src.isWindowClosed)(tunnelWindow.source)) {
          return;
        }

        try {
          tunnelWindow.canary();
        } catch (err) {
          return;
        } // $FlowFixMe[object-this-reference]


        tunnelWindow.sendMessage.apply(this, arguments);
      }

    }, {
      domain: _conf.WILDCARD
    });
  };
}