"use strict";

exports.__esModule = true;
exports.addRequestListener = addRequestListener;
exports.addResponseListener = addResponseListener;
exports.cancelResponseListeners = cancelResponseListeners;
exports.deleteResponseListener = deleteResponseListener;
exports.getRequestListener = getRequestListener;
exports.getResponseListener = getResponseListener;
exports.isResponseListenerErrored = isResponseListenerErrored;
exports.markResponseListenerErrored = markResponseListenerErrored;
exports.resetListeners = resetListeners;

var _src = require("cross-domain-utils/src");

var _src2 = require("belter/src");

var _global = require("../global");

var _conf = require("../conf");

var _window = require("../serialize/window");

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
} // eslint-disable-next-line complexity


function addRequestListener({
  name,
  win: winCandidate,
  domain
}, listener) {
  const requestListeners = (0, _global.windowStore)('requestListeners');

  if (!name || typeof name !== 'string') {
    throw new Error(`Name required to add request listener`);
  } // $FlowFixMe


  if (winCandidate && winCandidate !== _conf.WILDCARD && _window.ProxyWindow.isProxyWindow(winCandidate)) {
    // $FlowFixMe
    const proxyWin = winCandidate;
    const requestListenerPromise = proxyWin.awaitWindow().then(actualWin => {
      return addRequestListener({
        name,
        win: actualWin,
        domain
      }, listener);
    });
    return {
      cancel: () => {
        requestListenerPromise.then(requestListener => requestListener.cancel(), _src2.noop);
      }
    };
  } // $FlowFixMe


  let win = winCandidate;

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
  const strDomain = domain.toString();

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

  const winNameListeners = requestListeners.getOrSet(win, () => ({}));
  const winNameDomainListeners = (0, _src2.getOrSet)(winNameListeners, name, () => ({}));
  let winNameDomainRegexListeners;
  let winNameDomainRegexListener;

  if ((0, _src2.isRegex)(domain)) {
    winNameDomainRegexListeners = (0, _src2.getOrSet)(winNameDomainListeners, __DOMAIN_REGEX__, () => []);
    winNameDomainRegexListener = {
      regex: domain,
      listener
    };
    winNameDomainRegexListeners.push(winNameDomainRegexListener);
  } else {
    winNameDomainListeners[strDomain] = listener;
  }

  return {
    cancel() {
      delete winNameDomainListeners[strDomain];

      if (winNameDomainRegexListener) {
        winNameDomainRegexListeners.splice(winNameDomainRegexListeners.indexOf(winNameDomainRegexListener, 1));

        if (!winNameDomainRegexListeners.length) {
          delete winNameDomainListeners[__DOMAIN_REGEX__];
        }
      }

      if (!Object.keys(winNameDomainListeners).length) {
        delete winNameListeners[name];
      }

      if (win && !Object.keys(winNameListeners).length) {
        requestListeners.del(win);
      }
    }

  };
}