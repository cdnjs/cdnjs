"use strict";

exports.__esModule = true;
exports.createProxyWindow = createProxyWindow;
exports.deserializeMessage = deserializeMessage;
exports.destroy = destroy;
exports.serializeMessage = serializeMessage;
exports.setup = setup;
exports.toProxyWindow = toProxyWindow;

var _lib = require("./lib");

var _drivers = require("./drivers");

var _global = require("./global");

var _public = require("./public");

var _bridge = require("./bridge");

var _serialize = require("./serialize");

function serializeMessage(destination, domain, obj) {
  return (0, _serialize.serializeMessage)(destination, domain, obj, {
    on: _public.on,
    send: _public.send
  });
}

function deserializeMessage(source, origin, message) {
  return (0, _serialize.deserializeMessage)(source, origin, message, {
    on: _public.on,
    send: _public.send
  });
}

function createProxyWindow(win) {
  return new _serialize.ProxyWindow({
    send: _public.send,
    win
  });
}

function toProxyWindow(win) {
  return _serialize.ProxyWindow.toProxyWindow(win, {
    send: _public.send
  });
}

function setup() {
  if (!(0, _global.getGlobal)().initialized) {
    (0, _global.getGlobal)().initialized = true;
    (0, _drivers.setupGlobalReceiveMessage)({
      on: _public.on,
      send: _public.send
    });
    (0, _drivers.listenForMessages)({
      on: _public.on,
      send: _public.send
    });

    if (__POST_ROBOT__.__IE_POPUP_SUPPORT__) {
      (0, _bridge.setupBridge)({
        on: _public.on,
        send: _public.send,
        receiveMessage: _drivers.receiveMessage
      });
    }

    (0, _lib.initHello)({
      on: _public.on,
      send: _public.send
    });
  }
}

function destroy() {
  (0, _drivers.cancelResponseListeners)();
  (0, _drivers.stopListenForMessages)();
  (0, _global.deleteGlobal)();
}