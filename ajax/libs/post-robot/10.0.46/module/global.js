"use strict";

exports.__esModule = true;
exports.WildCard = void 0;
exports.deleteGlobal = deleteGlobal;
exports.getGlobal = getGlobal;
exports.getGlobalKey = getGlobalKey;
exports.getWildcard = getWildcard;
exports.globalStore = globalStore;
exports.windowStore = windowStore;

var _src = require("cross-domain-safe-weakmap/src");

var _src2 = require("belter/src");

function getGlobalKey() {
  if (__POST_ROBOT__.__SCRIPT_NAMESPACE__) {
    return `${__POST_ROBOT__.__GLOBAL_KEY__}_${(0, _src2.getCurrentScriptUID)()}`;
  } else {
    return __POST_ROBOT__.__GLOBAL_KEY__;
  }
}

function getGlobal(win = window) {
  const globalKey = getGlobalKey();

  if (win !== window) {
    return win[globalKey];
  }

  const global = win[globalKey] = win[globalKey] || {};
  return global;
}

function deleteGlobal() {
  const globalKey = getGlobalKey();
  delete window[globalKey];
}

const getObj = () => ({});

function globalStore(key = 'store', defStore = getObj) {
  return (0, _src2.getOrSet)(getGlobal(), key, () => {
    let store = defStore();
    return {
      has: storeKey => {
        return store.hasOwnProperty(storeKey);
      },
      get: (storeKey, defVal) => {
        // $FlowFixMe
        return store.hasOwnProperty(storeKey) ? store[storeKey] : defVal;
      },
      set: (storeKey, val) => {
        store[storeKey] = val;
        return val;
      },
      del: storeKey => {
        delete store[storeKey];
      },
      getOrSet: (storeKey, getter) => {
        // $FlowFixMe
        return (0, _src2.getOrSet)(store, storeKey, getter);
      },
      reset: () => {
        store = defStore();
      },
      keys: () => {
        return Object.keys(store);
      }
    };
  });
}

class WildCard {}

exports.WildCard = WildCard;

function getWildcard() {
  const global = getGlobal();
  global.WINDOW_WILDCARD = global.WINDOW_WILDCARD || new WildCard();
  return global.WINDOW_WILDCARD;
}

function windowStore(key = 'store', defStore = getObj) {
  return globalStore('windowStore').getOrSet(key, () => {
    const winStore = new _src.WeakMap();

    const getStore = win => {
      return winStore.getOrSet(win, defStore);
    };

    return {
      has: win => {
        const store = getStore(win);
        return store.hasOwnProperty(key);
      },
      get: (win, defVal) => {
        const store = getStore(win); // $FlowFixMe

        return store.hasOwnProperty(key) ? store[key] : defVal;
      },
      set: (win, val) => {
        const store = getStore(win);
        store[key] = val;
        return val;
      },
      del: win => {
        const store = getStore(win);
        delete store[key];
      },
      getOrSet: (win, getter) => {
        const store = getStore(win);
        return (0, _src2.getOrSet)(store, key, getter);
      }
    };
  });
}