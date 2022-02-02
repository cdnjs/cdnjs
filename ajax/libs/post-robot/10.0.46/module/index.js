"use strict";

exports.__esModule = true;
var _exportNames = {
  Promise: true,
  ProxyWindow: true,
  destroy: true,
  serializeMessage: true,
  deserializeMessage: true,
  createProxyWindow: true,
  toProxyWindow: true,
  on: true,
  once: true,
  send: true,
  markWindowKnown: true,
  cleanUpWindow: true,
  bridge: true,
  setup: true
};
exports.toProxyWindow = exports.serializeMessage = exports.send = exports.once = exports.on = exports.markWindowKnown = exports.destroy = exports.deserializeMessage = exports.createProxyWindow = exports.cleanUpWindow = exports.bridge = exports.ProxyWindow = exports.Promise = void 0;

var _setup = require("./setup");

exports.setup = _setup.setup;
exports.destroy = _setup.destroy;
exports.serializeMessage = _setup.serializeMessage;
exports.deserializeMessage = _setup.deserializeMessage;
exports.createProxyWindow = _setup.createProxyWindow;
exports.toProxyWindow = _setup.toProxyWindow;

var _bridge = require("./bridge");

var _src = require("zalgo-promise/src");

exports.Promise = _src.ZalgoPromise;

var _types = require("./types");

Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _types[key]) return;
  exports[key] = _types[key];
});

var _serialize = require("./serialize");

exports.ProxyWindow = _serialize.ProxyWindow;

var _public = require("./public");

exports.on = _public.on;
exports.once = _public.once;
exports.send = _public.send;

var _lib = require("./lib");

exports.markWindowKnown = _lib.markWindowKnown;

var _clean = require("./clean");

exports.cleanUpWindow = _clean.cleanUpWindow;
// $FlowFixMe
let bridge;
exports.bridge = bridge;

if (__POST_ROBOT__.__IE_POPUP_SUPPORT__) {
  exports.bridge = bridge = {
    setupBridge: _bridge.setupBridge,
    openBridge: _bridge.openBridge,
    linkWindow: _bridge.linkWindow,
    linkUrl: _bridge.linkUrl,
    isBridge: _bridge.isBridge,
    needsBridge: _bridge.needsBridge,
    needsBridgeForBrowser: _bridge.needsBridgeForBrowser,
    hasBridge: _bridge.hasBridge,
    needsBridgeForWin: _bridge.needsBridgeForWin,
    needsBridgeForDomain: _bridge.needsBridgeForDomain,
    destroyBridges: _bridge.destroyBridges
  };
}

if (__POST_ROBOT__.__AUTO_SETUP__) {
  (0, _setup.setup)();
}