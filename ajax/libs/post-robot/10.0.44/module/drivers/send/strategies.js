"use strict";

exports.__esModule = true;
exports.SEND_MESSAGE_STRATEGIES = void 0;

var _src = require("cross-domain-utils/src");

var _conf = require("../../conf");

var _lib = require("../../lib");

var _global = require("../../global");

var _bridge = require("../../bridge");

const SEND_MESSAGE_STRATEGIES = {};
exports.SEND_MESSAGE_STRATEGIES = SEND_MESSAGE_STRATEGIES;

SEND_MESSAGE_STRATEGIES[_conf.SEND_STRATEGY.POST_MESSAGE] = (win, serializedMessage, domain) => {
  if (domain.indexOf(_src.PROTOCOL.FILE) === 0) {
    domain = _conf.WILDCARD;
  }

  if (__TEST__) {
    if ((0, _lib.needsGlobalMessagingForBrowser)() && (0, _src.isSameTopWindow)(window, win) === false) {
      return;
    }

    if (domain.indexOf(_src.PROTOCOL.MOCK) === 0) {
      if (!(0, _src.isActuallySameDomain)(win)) {
        throw new Error(`Attempting to send message to mock domain ${domain}, but window is actually cross-domain`);
      } // $FlowFixMe


      const windowDomain = (0, _src.getDomain)(win);

      if (windowDomain !== domain) {
        throw new Error(`Mock domain target ${domain} does not match window domain ${windowDomain}`);
      } // $FlowFixMe


      domain = (0, _src.getActualDomain)(win);
    }
  }

  win.postMessage(serializedMessage, domain);
};

if (__POST_ROBOT__.__IE_POPUP_SUPPORT__) {
  SEND_MESSAGE_STRATEGIES[_conf.SEND_STRATEGY.BRIDGE] = (win, serializedMessage, domain) => {
    if (!(0, _bridge.needsBridgeForBrowser)() && !(0, _bridge.isBridge)()) {
      throw new Error(`Bridge not needed for browser`);
    }

    if ((0, _src.isSameDomain)(win)) {
      throw new Error(`Post message through bridge disabled between same domain windows`);
    }

    if ((0, _src.isSameTopWindow)(window, win) !== false) {
      throw new Error(`Can only use bridge to communicate between two different windows, not between frames`);
    }

    (0, _bridge.sendBridgeMessage)(win, domain, serializedMessage);
  };
}

if (__POST_ROBOT__.__IE_POPUP_SUPPORT__ || __POST_ROBOT__.__GLOBAL_MESSAGE_SUPPORT__) {
  SEND_MESSAGE_STRATEGIES[_conf.SEND_STRATEGY.GLOBAL] = (win, serializedMessage) => {
    if (!(0, _lib.needsGlobalMessagingForBrowser)()) {
      throw new Error(`Global messaging not needed for browser`);
    }

    if (!(0, _src.isSameDomain)(win)) {
      throw new Error(`Post message through global disabled between different domain windows`);
    }

    if ((0, _src.isSameTopWindow)(window, win) !== false) {
      throw new Error(`Can only use global to communicate between two different windows, not between frames`);
    } // $FlowFixMe


    const foreignGlobal = (0, _global.getGlobal)(win);

    if (!foreignGlobal) {
      throw new Error(`Can not find postRobot global on foreign window`);
    }

    foreignGlobal.receiveMessage({
      source: window,
      origin: (0, _src.getDomain)(),
      data: serializedMessage
    });
  };
}