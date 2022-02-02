"use strict";

exports.__esModule = true;
exports.ProxyWindow = void 0;
exports.deserializeWindow = deserializeWindow;
exports.serializeWindow = serializeWindow;

var _src = require("cross-domain-utils/src");

var _src2 = require("zalgo-promise/src");

var _src3 = require("belter/src");

var _src4 = require("universal-serialize/src");

var _conf = require("../conf");

var _global = require("../global");

var _lib = require("../lib");

var _bridge = require("../bridge");

function cleanupProxyWindows() {
  const idToProxyWindow = (0, _global.globalStore)('idToProxyWindow');

  for (const id of idToProxyWindow.keys()) {
    // $FlowFixMe
    if (idToProxyWindow.get(id).shouldClean()) {
      idToProxyWindow.del(id);
    }
  }
}

function getSerializedWindow(winPromise, {
  send,
  id = (0, _src3.uniqueID)()
}) {
  let windowNamePromise = winPromise.then(win => {
    if ((0, _src.isSameDomain)(win)) {
      return (0, _src.assertSameDomain)(win).name;
    }
  });
  const windowTypePromise = winPromise.then(window => {
    if (!(0, _src.isWindowClosed)(window)) {
      return (0, _src.getOpener)(window) ? _src.WINDOW_TYPE.POPUP : _src.WINDOW_TYPE.IFRAME;
    } else {
      throw new Error(`Window is closed, can not determine type`);
    }
  });
  windowNamePromise.catch(_src3.noop);
  windowTypePromise.catch(_src3.noop);

  const getName = () => winPromise.then(win => {
    if ((0, _src.isWindowClosed)(win)) {
      return;
    }

    if ((0, _src.isSameDomain)(win)) {
      return (0, _src.assertSameDomain)(win).name;
    }

    return windowNamePromise;
  });

  const getDefaultSetLocationOptions = () => {
    // $FlowFixMe
    return {};
  };

  const setLocation = (href, opts = getDefaultSetLocationOptions()) => winPromise.then(win => {
    const domain = `${window.location.protocol}//${window.location.host}`;
    const {
      method = _conf.METHOD.GET,
      body
    } = opts;

    if (href.indexOf('/') === 0) {
      href = `${domain}${href}`;
    } else if (!href.match(/^https?:\/\//) && href.indexOf(domain) !== 0) {
      throw new Error(`Expected url to be http or https url, or absolute path, got ${JSON.stringify(href)}`);
    }

    if (method === _conf.METHOD.POST) {
      return getName().then(name => {
        if (!name) {
          throw new Error(`Can not post to window without target name`);
        }

        (0, _src3.submitForm)({
          url: href,
          target: name,
          method,
          body
        });
      });
    } else if (method === _conf.METHOD.GET) {
      if ((0, _src.isSameDomain)(win)) {
        try {
          if (win.location && typeof win.location.replace === 'function') {
            // $FlowFixMe
            win.location.replace(href);
            return;
          }
        } catch (err) {// pass
        }
      }

      win.location = href;
    } else {
      throw new Error(`Unsupported method: ${method}`);
    }
  });

  return {
    id,
    getType: () => {
      return windowTypePromise;
    },
    getInstanceID: (0, _src3.memoizePromise)(() => winPromise.then(win => (0, _lib.getWindowInstanceID)(win, {
      send
    }))),
    close: () => winPromise.then(_src.closeWindow),
    getName,
    focus: () => winPromise.then(win => {
      win.focus();
    }),
    isClosed: () => winPromise.then(win => {
      return (0, _src.isWindowClosed)(win);
    }),
    setLocation,
    setName: name => winPromise.then(win => {
      if (__POST_ROBOT__.__IE_POPUP_SUPPORT__) {
        (0, _bridge.linkWindow)({
          win,
          name
        });
      }

      const sameDomain = (0, _src.isSameDomain)(win);
      const frame = (0, _src.getFrameForWindow)(win);

      if (!sameDomain) {
        throw new Error(`Can not set name for cross-domain window: ${name}`);
      }

      (0, _src.assertSameDomain)(win).name = name;

      if (frame) {
        frame.setAttribute('name', name);
      }

      windowNamePromise = _src2.ZalgoPromise.resolve(name);
    })
  };
}

class ProxyWindow {
  constructor({
    send,
    win,
    serializedWindow
  }) {
    this.id = void 0;
    this.isProxyWindow = true;
    this.serializedWindow = void 0;
    this.actualWindow = void 0;
    this.actualWindowPromise = void 0;
    this.send = void 0;
    this.name = void 0;
    this.actualWindowPromise = new _src2.ZalgoPromise();
    this.serializedWindow = serializedWindow || getSerializedWindow(this.actualWindowPromise, {
      send
    });
    (0, _global.globalStore)('idToProxyWindow').set(this.getID(), this);

    if (win) {
      this.setWindow(win, {
        send
      });
    }
  }

  getID() {
    return this.serializedWindow.id;
  }

  getType() {
    return this.serializedWindow.getType();
  }

  isPopup() {
    return this.getType().then(type => {
      return type === _src.WINDOW_TYPE.POPUP;
    });
  }

  setLocation(href, opts) {
    return this.serializedWindow.setLocation(href, opts).then(() => this);
  }

  getName() {
    return this.serializedWindow.getName();
  }

  setName(name) {
    return this.serializedWindow.setName(name).then(() => this);
  }

  close() {
    return this.serializedWindow.close().then(() => this);
  }

  focus() {
    const isPopupPromise = this.isPopup();
    const getNamePromise = this.getName();

    const reopenPromise = _src2.ZalgoPromise.hash({
      isPopup: isPopupPromise,
      name: getNamePromise
    }).then(({
      isPopup,
      name
    }) => {
      if (isPopup && name) {
        window.open('', name, 'noopener');
      }
    });

    const focusPromise = this.serializedWindow.focus();
    return _src2.ZalgoPromise.all([reopenPromise, focusPromise]).then(() => this);
  }

  isClosed() {
    return this.serializedWindow.isClosed();
  }

  getWindow() {
    return this.actualWindow;
  }

  setWindow(win, {
    send
  }) {
    this.actualWindow = win;
    this.actualWindowPromise.resolve(this.actualWindow);
    this.serializedWindow = getSerializedWindow(this.actualWindowPromise, {
      send,
      id: this.getID()
    });
    (0, _global.windowStore)('winToProxyWindow').set(win, this);
  }

  awaitWindow() {
    return this.actualWindowPromise;
  }

  matchWindow(win, {
    send
  }) {
    return _src2.ZalgoPromise.try(() => {
      if (this.actualWindow) {
        return win === this.actualWindow;
      }

      return _src2.ZalgoPromise.hash({
        proxyInstanceID: this.getInstanceID(),
        knownWindowInstanceID: (0, _lib.getWindowInstanceID)(win, {
          send
        })
      }).then(({
        proxyInstanceID,
        knownWindowInstanceID
      }) => {
        const match = proxyInstanceID === knownWindowInstanceID;

        if (match) {
          this.setWindow(win, {
            send
          });
        }

        return match;
      });
    });
  }

  unwrap() {
    return this.actualWindow || this;
  }

  getInstanceID() {
    return this.serializedWindow.getInstanceID();
  }

  shouldClean() {
    return Boolean(this.actualWindow && (0, _src.isWindowClosed)(this.actualWindow));
  }

  serialize() {
    return this.serializedWindow;
  }

  static unwrap(win) {
    return ProxyWindow.isProxyWindow(win) // $FlowFixMe
    ? win.unwrap() : win;
  }

  static serialize(win, {
    send
  }) {
    cleanupProxyWindows();
    return ProxyWindow.toProxyWindow(win, {
      send
    }).serialize();
  }

  static deserialize(serializedWindow, {
    send
  }) {
    cleanupProxyWindows();
    return (0, _global.globalStore)('idToProxyWindow').get(serializedWindow.id) || new ProxyWindow({
      serializedWindow,
      send
    });
  }

  static isProxyWindow(obj) {
    // $FlowFixMe
    return Boolean(obj && !(0, _src.isWindow)(obj) && obj.isProxyWindow);
  }

  static toProxyWindow(win, {
    send
  }) {
    cleanupProxyWindows();

    if (ProxyWindow.isProxyWindow(win)) {
      // $FlowFixMe
      return win;
    } // $FlowFixMe


    const actualWindow = win;
    return (0, _global.windowStore)('winToProxyWindow').get(actualWindow) || new ProxyWindow({
      win: actualWindow,
      send
    });
  }

}

exports.ProxyWindow = ProxyWindow;

function serializeWindow(destination, domain, win, {
  send
}) {
  return (0, _src4.serializeType)(_conf.SERIALIZATION_TYPE.CROSS_DOMAIN_WINDOW, ProxyWindow.serialize(win, {
    send
  }));
}

function deserializeWindow(source, origin, win, {
  send
}) {
  return ProxyWindow.deserialize(win, {
    send
  });
}