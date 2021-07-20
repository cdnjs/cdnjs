"use strict";

exports.__esModule = true;
exports.resetListeners = resetListeners;
exports.addResponseListener = addResponseListener;
exports.getResponseListener = getResponseListener;
exports.deleteResponseListener = deleteResponseListener;
exports.cancelResponseListeners = cancelResponseListeners;
exports.markResponseListenerErrored = markResponseListenerErrored;
exports.isResponseListenerErrored = isResponseListenerErrored;
exports.getRequestListener = getRequestListener;
exports.addRequestListener = addRequestListener;

var _src = require("cross-domain-utils/src");

var _src2 = require("belter/src");

var _global = require("../global");

var _conf = require("../conf");

function resetListeners() {
  const responseListeners = (0, _global.globalStore)('responseListeners');
  const erroredResponseListeners = (0, _global.globalStore)('erroredResponseListeners');
  responseListeners.reset();
  erroredResponseListeners.reset();
}

const __DOMAIN_REGEX__ = '__domain_regex__';

function addResponseListener(hash, listener) {
  const responseListeners = (0, _global.globalStore)('responseListeners');
  responseListeners.set(hash, listener);
}

function getResponseListener(hash) {
  const responseListeners = (0, _global.globalStore)('responseListeners');
  return responseListeners.get(hash);
}

function deleteResponseListener(hash) {
  const responseListeners = (0, _global.globalStore)('responseListeners');
  responseListeners.del(hash);
}

function cancelResponseListeners() {
  const responseListeners = (0, _global.globalStore)('responseListeners');

  for (const hash of responseListeners.keys()) {
    const listener = responseListeners.get(hash);

    if (listener) {
      listener.cancelled = true;
    }

    responseListeners.del(hash);
  }
}

function markResponseListenerErrored(hash) {
  const erroredResponseListeners = (0, _global.globalStore)('erroredResponseListeners');
  erroredResponseListeners.set(hash, true);
}

function isResponseListenerErrored(hash) {
  const erroredResponseListeners = (0, _global.globalStore)('erroredResponseListeners');
  return erroredResponseListeners.has(hash);
}

function getRequestListener({
  name,
  win,
  domain
}) {
  const requestListeners = (0, _global.windowStore)('requestListeners');

  if (win === _conf.WILDCARD) {
    win = null;
  }

  if (domain === _conf.WILDCARD) {
    domain = null;
  }

  if (!name) {
    throw new Error(`Name required to get request listener`);
  }

  for (const winQualifier of [win, (0, _global.getWildcard)()]) {
    if (!winQualifier) {
      continue;
    }

    const nameListeners = requestListeners.get(winQualifier);

    if (!nameListeners) {
      continue;
    }

    const domainListeners = nameListeners[name];

    if (!domainListeners) {
      continue;
    }

    if (domain && typeof domain === 'string') {
      if (domainListeners[domain]) {
        return domainListeners[domain];
      }

      if (domainListeners[__DOMAIN_REGEX__]) {
        for (const {
          regex,
          listener
        } of domainListeners[__DOMAIN_REGEX__]) {
          if ((0, _src.matchDomain)(regex, domain)) {
            return listener;
          }
        }
      }
    }

    if (domainListeners[_conf.WILDCARD]) {
      return domainListeners[_conf.WILDCARD];
    }
  }
}

function addRequestListener({
  name,
  win,
  domain
}, listener) {
  const requestListeners = (0, _global.windowStore)('requestListeners');

  if (!name || typeof name !== 'string') {
    throw new Error(`Name required to add request listener`);
  }

  if (Array.isArray(win)) {
    const listenersCollection = [];

    for (const item of win) {
      listenersCollection.push(addRequestListener({
        name,
        domain,
        win: item
      }, listener));
    }

    return {
      cancel() {
        for (const cancelListener of listenersCollection) {
          cancelListener.cancel();
        }
      }

    };
  }

  if (Array.isArray(domain)) {
    const listenersCollection = [];

    for (const item of domain) {
      listenersCollection.push(addRequestListener({
        name,
        win,
        domain: item
      }, listener));
    }

    return {
      cancel() {
        for (const cancelListener of listenersCollection) {
          cancelListener.cancel();
        }
      }

    };
  }

  const existingListener = getRequestListener({
    name,
    win,
    domain
  });

  if (!win || win === _conf.WILDCARD) {
    win = (0, _global.getWildcard)();
  }

  domain = domain || _conf.WILDCARD;

  if (existingListener) {
    if (win && domain) {
      throw new Error(`Request listener already exists for ${name} on domain ${domain.toString()} for ${win === (0, _global.getWildcard)() ? 'wildcard' : 'specified'} window`);
    } else if (win) {
      throw new Error(`Request listener already exists for ${name} for ${win === (0, _global.getWildcard)() ? 'wildcard' : 'specified'} window`);
    } else if (domain) {
      throw new Error(`Request listener already exists for ${name} on domain ${domain.toString()}`);
    } else {
      throw new Error(`Request listener already exists for ${name}`);
    }
  }

  const nameListeners = requestListeners.getOrSet(win, () => ({}));
  const domainListeners = (0, _src2.getOrSet)(nameListeners, name, () => ({}));
  const strDomain = domain.toString();
  let regexListeners;
  let regexListener;

  if ((0, _src2.isRegex)(domain)) {
    regexListeners = (0, _src2.getOrSet)(domainListeners, __DOMAIN_REGEX__, () => []);
    regexListener = {
      regex: domain,
      listener
    };
    regexListeners.push(regexListener);
  } else {
    domainListeners[strDomain] = listener;
  }

  return {
    cancel() {
      delete domainListeners[strDomain];

      if (regexListener) {
        regexListeners.splice(regexListeners.indexOf(regexListener, 1));

        if (!regexListeners.length) {
          delete domainListeners[__DOMAIN_REGEX__];
        }
      }

      if (!Object.keys(domainListeners).length) {
        delete nameListeners[name];
      }

      if (win && !Object.keys(nameListeners).length) {
        requestListeners.del(win);
      }
    }

  };
}