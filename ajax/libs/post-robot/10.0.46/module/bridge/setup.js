"use strict";

exports.__esModule = true;
exports.setupBridge = setupBridge;

var _parent = require("./parent");

var _bridge = require("./bridge");

var _child = require("./child");

function setupBridge({
  on,
  send,
  receiveMessage
}) {
  (0, _parent.listenForWindowOpen)();
  (0, _parent.listenForOpenTunnel)({
    on,
    send,
    receiveMessage
  });
  (0, _bridge.setupOpenTunnelToParent)({
    send
  });
  (0, _child.openTunnelToOpener)({
    on,
    send,
    receiveMessage
  });
}