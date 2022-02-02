"use strict";

exports.__esModule = true;
exports.destroyBridges = destroyBridges;
exports.hasBridge = hasBridge;
exports.linkUrl = linkUrl;
exports.linkWindow = linkWindow;
exports.listenForOpenTunnel = listenForOpenTunnel;
exports.listenForWindowOpen = listenForWindowOpen;
exports.openBridge = openBridge;

var _src = require("zalgo-promise/src");

var _src2 = require("cross-domain-utils/src");

var _conf = require("../conf");

var _lib = require("../lib");

var _global = require("../global");

var _common = require("./common");

function listenForOpenTunnel({
  on,
  send,
  receiveMessage
}) {
  const popupWindowsByName = (0, _global.globalStore)('popupWindowsByName');
  on(_conf.MESSAGE_NAME.OPEN_TUNNEL, ({
    source,
    origin,
    data
  }) => {
    const bridgePromise = (0, _global.globalStore)('bridges').get(origin);

    if (!bridgePromise) {
      throw new Error(`Can not find bridge promise for domain ${origin}`);
    }

    return bridgePromise.then(bridge => {
      if (source !== bridge) {
        throw new Error(`Message source does not matched registered bridge for domain ${origin}`);
      }

      if (!data.name) {
        throw new Error(`Register window expected to be passed window name`);
      }

      if (!data.sendMessage) {
        throw new Error(`Register window expected to be passed sendMessage method`);
      }

      if (!popupWindowsByName.has(data.name)) {
        throw new Error(`Window with name ${data.name} does not exist, or was not opened by this window`);
      }

      const getWindowDetails = () => {
        const winDetails = popupWindowsByName.get(data.name); // $FlowFixMe

        return winDetails;
      };

      if (!getWindowDetails().domain) {
        throw new Error(`We do not have a registered domain for window ${data.name}`);
      }

      if (getWindowDetails().domain !== origin) {
        throw new Error(`Message origin ${origin} does not matched registered window origin ${getWindowDetails().domain || 'unknown'}`);
      }

      (0, _common.registerRemoteSendMessage)(getWindowDetails().win, origin, data.sendMessage);
      return {
        sendMessage(message) {
          if (!window || window.closed) {
            return;
          }

          if (!getWindowDetails()) {
            return;
          }

          const domain = getWindowDetails().domain;

          if (!domain) {
            return;
          }

          try {
            receiveMessage({
              data: message,
              origin: domain,
              source: getWindowDetails().win
            }, {
              on,
              send
            });
          } catch (err) {
            _src.ZalgoPromise.reject(err);
          }
        }

      };
    });
  });
}

function openBridgeFrame(name, url) {
  const iframe = document.createElement(`iframe`);
  iframe.setAttribute(`name`, name);
  iframe.setAttribute(`id`, name);
  iframe.setAttribute(`style`, `display: none; margin: 0; padding: 0; border: 0px none; overflow: hidden;`);
  iframe.setAttribute(`frameborder`, `0`);
  iframe.setAttribute(`border`, `0`);
  iframe.setAttribute(`scrolling`, `no`);
  iframe.setAttribute(`allowTransparency`, `true`);
  iframe.setAttribute(`tabindex`, `-1`);
  iframe.setAttribute(`hidden`, `true`);
  iframe.setAttribute(`title`, ``);
  iframe.setAttribute(`role`, `presentation`);
  iframe.src = url;
  return iframe;
}

function hasBridge(url, domain) {
  const bridges = (0, _global.globalStore)('bridges');
  return bridges.has(domain || (0, _src2.getDomainFromUrl)(url));
}

function openBridge(url, domain) {
  const bridges = (0, _global.globalStore)('bridges');
  const bridgeFrames = (0, _global.globalStore)('bridgeFrames');
  domain = domain || (0, _src2.getDomainFromUrl)(url);
  return bridges.getOrSet(domain, () => _src.ZalgoPromise.try(() => {
    if ((0, _src2.getDomain)() === domain) {
      throw new Error(`Can not open bridge on the same domain as current domain: ${domain}`);
    }

    const name = (0, _common.getBridgeName)(domain);
    const frame = (0, _src2.getFrameByName)(window, name);

    if (frame) {
      throw new Error(`Frame with name ${name} already exists on page`);
    }

    const iframe = openBridgeFrame(name, url);
    bridgeFrames.set(domain, iframe);
    return _common.documentBodyReady.then(body => {
      body.appendChild(iframe);
      const bridge = iframe.contentWindow;
      return new _src.ZalgoPromise((resolve, reject) => {
        iframe.addEventListener('load', resolve);
        iframe.addEventListener('error', reject);
      }).then(() => {
        return (0, _lib.awaitWindowHello)(bridge, _conf.BRIDGE_TIMEOUT, `Bridge ${url}`);
      }).then(() => {
        return bridge;
      });
    });
  }));
}

function linkWindow({
  win,
  name,
  domain
}) {
  const popupWindowsByName = (0, _global.globalStore)('popupWindowsByName');
  const popupWindowsByWin = (0, _global.windowStore)('popupWindowsByWin');

  for (const winName of popupWindowsByName.keys()) {
    const details = popupWindowsByName.get(winName);

    if (!details || (0, _src2.isWindowClosed)(details.win)) {
      popupWindowsByName.del(winName);
    }
  }

  if ((0, _src2.isWindowClosed)(win)) {
    return {
      win,
      name,
      domain
    };
  }

  const details = popupWindowsByWin.getOrSet(win, () => {
    if (!name) {
      return {
        win
      };
    } // $FlowFixMe


    return popupWindowsByName.getOrSet(name, () => {
      return {
        win,
        name
      };
    });
  });

  if (details.win && details.win !== win) {
    throw new Error(`Different window already linked for window: ${name || 'undefined'}`);
  }

  if (name) {
    details.name = name;
    popupWindowsByName.set(name, details);
  }

  if (domain) {
    details.domain = domain;
    (0, _common.registerRemoteWindow)(win);
  }

  popupWindowsByWin.set(win, details);
  return details;
}

function linkUrl(win, url) {
  linkWindow({
    win,
    domain: (0, _src2.getDomainFromUrl)(url)
  });
}

function listenForWindowOpen() {
  const windowOpen = window.open;

  window.open = function windowOpenWrapper(url, name, options, last) {
    const win = windowOpen.call(this, (0, _src2.normalizeMockUrl)(url), name, options, last);

    if (!win) {
      return win;
    }

    linkWindow({
      win,
      name,
      domain: url ? (0, _src2.getDomainFromUrl)(url) : null
    });
    return win;
  };
}

function destroyBridges() {
  const bridges = (0, _global.globalStore)('bridges');
  const bridgeFrames = (0, _global.globalStore)('bridgeFrames');

  for (const domain of bridgeFrames.keys()) {
    const frame = bridgeFrames.get(domain);

    if (frame && frame.parentNode) {
      frame.parentNode.removeChild(frame);
    }
  }

  bridgeFrames.reset();
  bridges.reset();
}