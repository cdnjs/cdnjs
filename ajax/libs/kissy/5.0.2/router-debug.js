/*
Copyright 2014, modulex-router@1.0.1
MIT Licensed
build time: Thu, 16 Oct 2014 07:02:18 GMT
*/
modulex.add("router", ["event-dom","url","event-custom","feature"], function(require, exports, module) {
var eventDom = require("event-dom");
var _url_ = require("url");
var eventCustom = require("event-custom");
var feature = require("feature");
/*
combined modules:
router
router/utils
router/route
router/request
*/
var routerUtils, routerRoute, routerRequest, router;
routerUtils = function (exports) {
  /**
   * utils for router
   * @author yiminghe@gmail.com
   */
  var utils;
  var DomEvent = eventDom;
  var toString = Object.prototype.toString;
  function removeVid(str) {
    return str.replace(/__ks-vid=.+$/, '');
  }
  function getVidFromHash(hash) {
    var m;
    if (m = hash.match(/__ks-vid=(.+)$/)) {
      return parseInt(m[1], 10);
    }
    return 0;
  }
  function getFragment(url) {
    var m = url.match(/#(.+)$/);
    return m && m[1] || '';
  }
  utils = {
    mix: function (t, s) {
      for (var p in s) {
        t[p] = s[p];
      }
      return t;
    },
    isArray: Array.isArray || function (obj) {
      return toString.call(obj) === '[object Array]';
    },
    urlDecode: function (s) {
      return decodeURIComponent(s.replace(/\+/g, ' '));
    },
    startsWith: function (str, prefix) {
      return str.lastIndexOf(prefix, 0) === 0;
    },
    endWithSlash: function (str) {
      return str.charAt(str.length - 1) === '/';
    },
    startWithSlash: function (str) {
      return str.charAt(0) === '/';
    },
    removeEndSlash: function (str) {
      if (this.endWithSlash(str)) {
        str = str.substring(0, str.length - 1);
      }
      return str;
    },
    removeStartSlash: function (str) {
      if (this.startWithSlash(str)) {
        str = str.substring(1);
      }
      return str;
    },
    addEndSlash: function (str) {
      return this.removeEndSlash(str) + '/';
    },
    addStartSlash: function (str) {
      if (str) {
        return '/' + this.removeStartSlash(str);
      } else {
        return str;
      }
    },
    // get full path from fragment for html history
    getFullPath: function (fragment, urlRoot) {
      return location.protocol + '//' + location.host + this.removeEndSlash(urlRoot) + this.addStartSlash(fragment);
    },
    equalsIgnoreSlash: function (str1, str2) {
      str1 = this.removeEndSlash(str1);
      str2 = this.removeEndSlash(str2);
      return str1 === str2;
    },
    getHash: function (url) {
      // 不能 location.hash
      // 1.
      // http://xx.com/#yy?z=1
      // ie6 => location.hash = #yy
      // 其他浏览器 => location.hash = #yy?z=1
      // 2.
      // #!/home/q={%22thedate%22:%2220121010~20121010%22}
      // firefox 15 => #!/home/q={"thedate":"20121010~20121010"}
      // !! :(
      return removeVid(getFragment(url).replace(/^!/, '')).replace(DomEvent.REPLACE_HISTORY, '');
    },
    removeVid: removeVid,
    hasVid: function (str) {
      return str.indexOf('__ks-vid=') !== -1;
    },
    addVid: function (str, vid) {
      return str + '__ks-vid=' + vid;
    },
    getVidFromUrlWithHash: function (url) {
      return getVidFromHash(getFragment(url));
    },
    getVidFromHash: getVidFromHash
  };
  exports = utils;
  return exports;
}();
routerRoute = function (exports) {
  /**
   * Router data structure
   * @author yiminghe@gmail.com
   */
  var util = routerUtils;
  /*
   transform route declaration to router reg
   @param str
   /search/:q
   /user/*path
   */
  function pathRegexp(path, keys, strict, sensitive) {
    if (util.isArray(path)) {
      path = '(' + path.join('|') + ')';
    }
    path = path.concat(strict ? '' : '/?').replace(/\/\(/g, '(?:/').replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?(\*)?/g, function (_, slash, format, key, capture, optional, star) {
      keys.push(key);
      slash = slash || '';
      return '' + (optional ? '' : slash) + '(?:' + (optional ? slash : '') + (format || '') + (capture || (format && '([^/.]+?)' || '([^/]+?)')) + ')' + (optional || '') + (star ? '(/*)?' : '');
    }).replace(/([\/.])/g, '\\$1').replace(/\*/g, '(.*)');
    return {
      keys: keys,
      regexp: new RegExp('^' + path + '$', sensitive ? '' : 'i')
    };
  }
  function Route(path, callbacks, option) {
    var self = this;
    self.path = path;
    self.callbacks = callbacks;
    self.keys = [];
    if (typeof path === 'string' || util.isArray(path)) {
      util.mix(self, pathRegexp(path, self.keys, option.strict, option.caseSensitive));
    } else {
      self.regexp = path;
    }
  }
  Route.prototype = {
    match: function (path) {
      var self = this, m = path.match(self.regexp);
      if (!m) {
        return false;
      }
      var keys = self.keys, params = [];
      for (var i = 1, len = m.length; i < len; ++i) {
        var key = keys[i - 1];
        var val = 'string' === typeof m[i] ? util.urlDecode(m[i]) : m[i];
        if (key) {
          params[key] = val;
        } else {
          params.push(val);
        }
      }
      return params;
    },
    removeCallback: function (callback) {
      var callbacks = this.callbacks || [];
      for (var i = callbacks.length - 1; i >= 0; i++) {
        if (callbacks === callback) {
          callbacks.splice(i, 1);
        }
      }
    }
  };
  exports = Route;
  return exports;
}();
routerRequest = function (exports) {
  /**
   * request data structure. instance passed to router callbacks
   * @author yiminghe@gmail.com
   */
  function Request(data) {
    for (var d in data) {
      this[d] = data[d];
    }
  }
  Request.prototype = {
    param: function (name) {
      var self = this;
      if (name in self.params) {
        return self.params[name];
      }
      return self.query[name];
    }
  };
  exports = Request;
  return exports;
}();
router = function (exports) {
  exports = {};
  var middlewares = [];
  var routes = [];
  var utils = routerUtils;
  var Route = routerRoute;
  var url = _url_;
  var Request = routerRequest;
  var DomEvent = eventDom;
  var CustomEvent = eventCustom;
  var getVidFromUrlWithHash = utils.getVidFromUrlWithHash;
  var win = window;
  var history = win.history;
  var supportNativeHashChange = feature.isHashChangeSupported();
  var supportHistoryPushState = !!(history && history.pushState);
  var BREATH_INTERVAL = 100;
  var viewUniqueId = 10;
  var viewsHistory = [viewUniqueId];
  var globalConfig = {
    urlRoot: '',
    useHash: !supportHistoryPushState
  };
  function setPathByHash(path, replace) {
    var hash = utils.addVid('#!' + path + (supportNativeHashChange ? '' : replace ? DomEvent.REPLACE_HISTORY : ''), viewUniqueId);
    if (replace) {
      location.replace(hash);
    } else {
      location.hash = hash;
    }
  }
  function getUrlForRouter(urlStr) {
    urlStr = urlStr || location.href;
    var uri = url.parse(urlStr);
    if (!globalConfig.useHash && supportHistoryPushState) {
      return uri.pathname.substr(globalConfig.urlRoot.length) + (uri.search || '');
    } else {
      return utils.getHash(urlStr);
    }
  }
  function fireMiddleWare(request, response, cb) {
    var index = -1;
    var len = middlewares.length;
    function next() {
      index++;
      if (index === len) {
        cb(request, response);
      } else {
        var middleware = middlewares[index];
        if (utils.startsWith(request.path + '/', middleware[0] + '/')) {
          var prefixLen = middleware[0].length;
          request.url = request.url.slice(prefixLen);
          var path = request.path;
          request.path = request.path.slice(prefixLen);
          middleware[1](request, next);
          request.url = request.originalUrl;
          request.path = path;
        } else {
          next();
        }
      }
    }
    next();
  }
  function fireRoutes(request, response) {
    var index = -1;
    var len = routes.length;
    function next() {
      index++;
      if (index !== len) {
        var route = routes[index];
        if (request.params = route.match(request.path)) {
          var callbackIndex = -1;
          var callbacks = route.callbacks;
          var callbacksLen = callbacks.length;
          var nextCallback = function (cause) {
            if (cause === 'route') {
              nextCallback = null;
              next();
            } else {
              callbackIndex++;
              if (callbackIndex !== callbacksLen) {
                request.route = route;
                callbacks[callbackIndex](request, response, nextCallback);
              }
            }
          };
          nextCallback('');
        } else {
          next();
        }
      }
    }
    next();
  }
  function dispatch(backward, replace) {
    var urlStr = getUrlForRouter();
    var uri = url.parse(urlStr, true);
    var query = uri.query;
    uri.search = '';
    uri.query = {};
    var path = url.stringify(uri) || '/';
    var request = new Request({
      query: query,
      backward: backward === true,
      replace: replace === true,
      forward: backward === false && replace === false,
      path: path,
      url: urlStr,
      originalUrl: urlStr
    });
    var response = { redirect: exports.navigate };
    exports.fire('dispatch', {
      request: request,
      response: response
    });
    fireMiddleWare(request, response, fireRoutes);
  }
  utils.mix(exports, CustomEvent.Target);
  exports.use = function (prefix, callback) {
    if (typeof prefix !== 'string') {
      callback = prefix;
      prefix = '';
    }
    middlewares.push([
      prefix,
      callback
    ]);
  };
  exports.navigate = function (path, opts) {
    opts = opts || {};
    var replace = opts.replace || false;
    var urlStr = getUrlForRouter();
    var uri = url.parse(urlStr);
    if (path.charAt(0) === '?') {
      uri.search = path;
      path = url.stringify(uri);
    }
    if (urlStr !== path) {
      if (!replace) {
        viewUniqueId++;
        viewsHistory.push(viewUniqueId);
      }
      if (!globalConfig.useHash && supportHistoryPushState) {
        history[replace ? 'replaceState' : 'pushState']({ vid: viewUniqueId }, '', utils.getFullPath(path, globalConfig.urlRoot));
        dispatch(false, replace);
      } else {
        if (supportHistoryPushState) {
          history[replace ? 'replaceState' : 'pushState']({ vid: viewUniqueId }, '', '#!' + path);
          dispatch(false, replace);
        } else {
          setPathByHash(path, replace);
        }
      }
    } else if (opts && opts.triggerRoute) {
      dispatch(false, true);
    }
  };
  exports.get = function (routePath) {
    var callbacks = [].slice.call(arguments, 1);
    routes.push(new Route(routePath, callbacks, globalConfig));
  };
  exports.matchRoute = function (path) {
    for (var i = 0, l = routes.length; i < l; i++) {
      if (routes[i].match(path)) {
        return routes[i];
      }
    }
    return false;
  };
  exports.removeRoute = function (routePath, callback) {
    for (var i = routes.length - 1; i >= 0; i--) {
      var r = routes[i];
      if (r.path === routePath) {
        if (callback) {
          r.removeCallback(callback);
          if (!r.callbacks.length) {
            routes.splice(i, 1);
          }
        } else {
          routes.splice(i, 1);
        }
      }
    }
  };
  exports.clearRoutes = function () {
    middlewares = [];
    routes = [];
  };
  exports.hasRoute = function (routePath) {
    for (var i = 0, l = routes.length; i < l; i++) {
      if (routes[i].path === routePath) {
        return routes[i];
      }
    }
    return false;
  };
  function dispatchByVid(vid) {
    var backward = false;
    var replace = false;
    if (vid === viewsHistory[viewsHistory.length - 2]) {
      backward = true;
      viewsHistory.pop();
    } else if (vid !== viewsHistory[viewsHistory.length - 1]) {
      viewsHistory.push(vid);
    } else {
      replace = true;
    }
    dispatch(backward, replace);
  }
  function onPopState(e) {
    var state = e.originalEvent.state;
    if (!state) {
      return;
    }
    dispatchByVid(state.vid);
  }
  function onHashChange(e) {
    var newURL = e.newURL || location.href;
    var vid = getVidFromUrlWithHash(newURL);
    if (!vid) {
      return;
    }
    dispatchByVid(vid);
  }
  exports.config = function (opts) {
    if (opts.urlRoot) {
      opts.urlRoot = opts.urlRoot.replace(/\/$/, '');
    }
    utils.mix(globalConfig, opts);
  };
  var started;
  exports.start = function (callback) {
    if (started) {
      return callback && callback.call(exports);
    }
    var useHash = globalConfig.useHash, urlRoot = globalConfig.urlRoot, triggerRoute = globalConfig.triggerRoute, locPath = location.pathname, href = location.href, hash = getUrlForRouter(), hashIsValid = location.hash.match(/#!.+/);
    if (!useHash) {
      if (supportHistoryPushState) {
        if (hashIsValid) {
          if (!urlRoot) {
            var tmp = location.hash.substring(2);
            if (tmp[0] === '/') {
              tmp = tmp.substring(1);
            }
            history.replaceState({}, '', href = location.protocol + '//' + location.host + location.pathname + tmp);
            triggerRoute = 1;
          } else if (utils.equalsIgnoreSlash(locPath, urlRoot)) {
            history.replaceState({}, '', href = utils.getFullPath(hash, urlRoot));
            triggerRoute = 1;
          } else {
            console.error('router: location path must be same with urlRoot!');
          }
        }
      } else if (!utils.equalsIgnoreSlash(locPath, urlRoot)) {
        location.replace(utils.addEndSlash(urlRoot) + '#!' + hash);
        return undefined;
      } else {
        useHash = true;
      }
    }
    setTimeout(function () {
      var needReplaceHistory = supportHistoryPushState;
      if (supportHistoryPushState) {
        DomEvent.on(win, 'popstate', onPopState);
      } else {
        DomEvent.on(win, 'hashchange', onHashChange);
        triggerRoute = 1;
      }
      if (useHash) {
        if (!getUrlForRouter()) {
          exports.navigate('/', { replace: true });
          triggerRoute = 0;
          needReplaceHistory = false;
        } else if (!supportHistoryPushState && getVidFromUrlWithHash(href) !== viewUniqueId) {
          setPathByHash(utils.getHash(href), true);
          triggerRoute = 0;
        } else if (supportHistoryPushState && utils.hasVid(href)) {
          location.replace(href = utils.removeVid(href));
        }
      }
      if (needReplaceHistory) {
        history.replaceState({ vid: viewUniqueId }, '', href);
      }
      if (triggerRoute) {
        dispatch(false, true);
      }
      if (callback) {
        callback(exports);
      }
    }, BREATH_INTERVAL);
    started = true;
    return exports;
  };
  exports.Utils = utils;
  exports.version = '1.0.1';
  exports.stop = function () {
    started = false;
    DomEvent.detach(win, 'hashchange', onHashChange);
    DomEvent.detach(win, 'popstate', onPopState);
  };
  return exports;
}();
module.exports = router;
});