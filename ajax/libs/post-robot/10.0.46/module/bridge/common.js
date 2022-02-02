"use strict";

exports.__esModule = true;
exports.documentBodyReady = void 0;
exports.findRemoteWindow = findRemoteWindow;
exports.getBridgeName = getBridgeName;
exports.isBridge = isBridge;
exports.needsBridge = needsBridge;
exports.needsBridgeForBrowser = needsBridgeForBrowser;
exports.needsBridgeForDomain = needsBridgeForDomain;
exports.needsBridgeForWin = needsBridgeForWin;
exports.registerRemoteSendMessage = registerRemoteSendMessage;
exports.registerRemoteWindow = registerRemoteWindow;
exports.rejectRemoteSendMessage = rejectRemoteSendMessage;
exports.sendBridgeMessage = sendBridgeMessage;

var _src = require("zalgo-promise/src");

var _src2 = require("cross-domain-utils/src");

var _src3 = require("belter/src");

var _conf = require("../conf");

var _global = require("../global");

function needsBridgeForBrowser() {
  if ((0, _src2.getUserAgent)(window).match(/MSIE|trident|edge\/12|edge\/13/i)) {
    return true;
  }

  return false;
}

function needsBridgeForWin(win) {
  if (!(0, _src2.isSameTopWindow)(window, win)) {
    return true;
  }

  return false;
}

function needsBridgeForDomain(domain, win) {
  if (domain) {
    if ((0, _src2.getDomain)() !== (0, _src2.getDomainFromUrl)(domain)) {
      return true;
    }
  } else if (win) {
    if (!(0, _src2.isSameDomain)(win)) {
      return true;
    }
  }

  return false;
}

function needsBridge({
  win,
  domain
}) {
  if (!needsBridgeForBrowser()) {
    return false;
  }

  if (domain && !needsBridgeForDomain(domain, win)) {
    return false;
  }

  if (win && !needsBridgeForWin(win)) {
    return false;
  }

  return true;
}

function getBridgeName(domain) {
  domain = domain || (0, _src2.getDomainFromUrl)(domain);
  const sanitizedDomain = domain.replace(/[^a-zA-Z0-9]+/g, '_');
  const id = `${_conf.BRIDGE_NAME_PREFIX}_${sanitizedDomain}`;
  return id;
}

function isBridge() {
  return Boolean(window.name && window.name === getBridgeName((0, _src2.getDomain)()));
}

const documentBodyReady = new _src.ZalgoPromise(resolve => {
  if (window.document && window.document.body) {
    return resolve(window.document.body);
  }

  const interval = setInterval(() => {
    if (window.document && window.document.body) {
      clearInterval(interval);
      return resolve(window.document.body);
    }
  }, 10);
});
exports.documentBodyReady = documentBodyReady;

function registerRemoteWindow(win) {
  const remoteWindowPromises = (0, _global.windowStore)('remoteWindowPromises');
  remoteWindowPromises.getOrSet(win, () => new _src.ZalgoPromise());
}

function findRemoteWindow(win) {
  const remoteWindowPromises = (0, _global.windowStore)('remoteWindowPromises');
  const remoteWinPromise = remoteWindowPromises.get(win);

  if (!remoteWinPromise) {
    throw new Error(`Remote window promise not found`);
  }

  return remoteWinPromise;
}

function registerRemoteSendMessage(win, domain, sendMessage) {
  const sendMessageWrapper = (remoteWin, remoteDomain, message) => {
    if (remoteWin !== win) {
      throw new Error(`Remote window does not match window`);
    }

    if (!(0, _src2.matchDomain)(remoteDomain, domain)) {
      throw new Error(`Remote domain ${remoteDomain} does not match domain ${domain}`);
    }

    sendMessage.fireAndForget(message);
  };

  findRemoteWindow(win).resolve(sendMessageWrapper);
}

function rejectRemoteSendMessage(win, err) {
  findRemoteWindow(win).reject(err).catch(_src3.noop);
}

function sendBridgeMessage(win, domain, message) {
  const messagingChild = (0, _src2.isOpener)(window, win);
  const messagingParent = (0, _src2.isOpener)(win, window);

  if (!messagingChild && !messagingParent) {
    throw new Error(`Can only send messages to and from parent and popup windows`);
  }

  return findRemoteWindow(win).then(sendMessage => {
    return sendMessage(win, domain, message);
  });
}