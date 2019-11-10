!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var n;"undefined"!=typeof window?n=window:"undefined"!=typeof global?n=global:"undefined"!=typeof self&&(n=self),n.ReactInlineSVG=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
'use strict';

var Response = _dereq_('./response');

function RequestError(message, props) {
    var err = new Error(message);
    err.name = 'RequestError';
    this.name = err.name;
    this.message = err.message;
    if (err.stack) {
        this.stack = err.stack;
    }

    this.toString = function () {
        return this.message;
    };

    for (var k in props) {
        if (props.hasOwnProperty(k)) {
            this[k] = props[k];
        }
    }
}

RequestError.prototype = Error.prototype;

RequestError.create = function (message, req, props) {
    var err = new RequestError(message, props);
    Response.call(err, req);
    return err;
};

module.exports = RequestError;

},{"./response":4}],2:[function(_dereq_,module,exports){
'use strict';

var i,
    cleanURL = _dereq_('../plugins/cleanurl'),
    XHR = _dereq_('./xhr'),
    delay = _dereq_('./utils/delay'),
    createError = _dereq_('./error').create,
    Response = _dereq_('./response'),
    Request = _dereq_('./request'),
    extend = _dereq_('xtend'),
    once = _dereq_('./utils/once');

function factory(defaults, plugins) {
    defaults = defaults || {};
    plugins = plugins || [];

    function http(req, cb) {
        var xhr, plugin, done, k, timeoutId, supportsLoadAndErrorEvents;

        req = new Request(extend(defaults, req));

        for (i = 0; i < plugins.length; i++) {
            plugin = plugins[i];
            if (plugin.processRequest) {
                plugin.processRequest(req);
            }
        }

        // Give the plugins a chance to create the XHR object
        for (i = 0; i < plugins.length; i++) {
            plugin = plugins[i];
            if (plugin.createXHR) {
                xhr = plugin.createXHR(req);
                break; // First come, first serve
            }
        }
        xhr = xhr || new XHR();

        req.xhr = xhr;

        // Use a single completion callback. This can be called with or without
        // an error. If no error is passed, the request will be examined to see
        // if it was successful.
        done = once(delay(function (rawError) {
            clearTimeout(timeoutId);
            xhr.onload = xhr.onerror = xhr.onabort = xhr.onreadystatechange = xhr.ontimeout = xhr.onprogress = null;

            var err = getError(req, rawError);

            var res = err && err.isHttpError ? err : new Response(req);
            for (i = 0; i < plugins.length; i++) {
                plugin = plugins[i];
                if (plugin.processResponse) {
                    plugin.processResponse(res);
                }
            }
            if (err) {
                if (req.onerror) {
                    req.onerror(err);
                }
            } else {
                if (req.onload) {
                    req.onload(res);
                }
            }
            if (cb) {
                cb(err, res);
            }
        }));

        supportsLoadAndErrorEvents = ('onload' in xhr) && ('onerror' in xhr);
        xhr.onload = function () { done(); };
        xhr.onerror = done;
        xhr.onabort = function () { done(); };

        // We'd rather use `onload`, `onerror`, and `onabort` since they're the
        // only way to reliably detect successes and failures but, if they
        // aren't available, we fall back to using `onreadystatechange`.
        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) return;

            if (req.aborted) return done();

            if (!supportsLoadAndErrorEvents) {
                // Assume a status of 0 is an error. This could be a false
                // positive, but there's no way to tell when using
                // `onreadystatechange` ):
                // See matthewwithanm/react-inlinesvg#10.
                var err = xhr.status === 0 ? new Error('Internal XHR Error') : null;
                return done(err);
            }
        };


        // IE sometimes fails if you don't specify every handler.
        // See http://social.msdn.microsoft.com/Forums/ie/en-US/30ef3add-767c-4436-b8a9-f1ca19b4812e/ie9-rtm-xdomainrequest-issued-requests-may-abort-if-all-event-handlers-not-specified?forum=iewebdevelopment
        xhr.ontimeout = function () { /* noop */ };
        xhr.onprogress = function () { /* noop */ };

        xhr.open(req.method, req.url);

        if (req.timeout) {
            // If we use the normal XHR timeout mechanism (`xhr.timeout` and
            // `xhr.ontimeout`), `onreadystatechange` will be triggered before
            // `ontimeout`. There's no way to recognize that it was triggered by
            // a timeout, and we'd be unable to dispatch the right error.
            timeoutId = setTimeout(function () {
                req.timedOut = true;
                done();
                try {
                    xhr.abort();
                } catch (err) {}
            }, req.timeout);
        }

        for (k in req.headers) {
            if (req.headers.hasOwnProperty(k)) {
                xhr.setRequestHeader(k, req.headers[k]);
            }
        }

        xhr.send(req.body);

        return req;
    }

    var method,
        methods = ['get', 'post', 'put', 'head', 'patch', 'delete'],
        verb = function (method) {
            return function (req, cb) {
                req = new Request(req);
                req.method = method;
                return http(req, cb);
            };
        };
    for (i = 0; i < methods.length; i++) {
        method = methods[i];
        http[method] = verb(method);
    }

    http.plugins = function () {
        return plugins;
    };

    http.defaults = function (newValues) {
        if (newValues) {
            return factory(extend(defaults, newValues), plugins);
        }
        return defaults;
    };

    http.use = function () {
        var newPlugins = Array.prototype.slice.call(arguments, 0);
        return factory(defaults, plugins.concat(newPlugins));
    };

    http.bare = function () {
        return factory();
    };

    http.Request = Request;
    http.Response = Response;

    return http;
}

module.exports = factory({}, [cleanURL]);

/**
 * Analyze the request to see if it represents an error. If so, return it! An
 * original error object can be passed as a hint.
 */
function getError(req, err) {
    if (req.aborted)
        return createError('Request aborted', req, {name: 'Abort'});

    if (req.timedOut)
        return createError('Request timeout', req, {name: 'Timeout'});

    var xhr = req.xhr;
    var type = Math.floor(xhr.status / 100);

    var kind;
    switch (type) {
        case 0:
        case 2:
            // These don't represent errors unless the function was passed an
            // error object explicitly.
            if (!err) return;
            return createError(err.message, req);
        case 4:
            // Sometimes 4XX statuses aren't errors.
            if (xhr.status === 404 && !req.errorOn404) return;
            kind = 'Client';
            break;
        case 5:
            kind = 'Server';
            break;
        default:
            kind = 'HTTP';
    }
    var msg = kind + ' Error: ' +
              'The server returned a status of ' + xhr.status +
              ' for the request "' +
              req.method.toUpperCase() + ' ' + req.url + '"';
    return createError(msg, req);
}

},{"../plugins/cleanurl":10,"./error":1,"./request":3,"./response":4,"./utils/delay":5,"./utils/once":6,"./xhr":7,"xtend":9}],3:[function(_dereq_,module,exports){
'use strict';

function Request(optsOrUrl) {
    var opts = typeof optsOrUrl === 'string' ? {url: optsOrUrl} : optsOrUrl || {};
    this.method = opts.method ? opts.method.toUpperCase() : 'GET';
    this.url = opts.url;
    this.headers = opts.headers || {};
    this.body = opts.body;
    this.timeout = opts.timeout || 0;
    this.errorOn404 = opts.errorOn404 != null ? opts.errorOn404 : true;
    this.onload = opts.onload;
    this.onerror = opts.onerror;
}

Request.prototype.abort = function () {
    if (this.aborted) return;
    this.aborted = true;
    this.xhr.abort();
    return this;
};

Request.prototype.header = function (name, value) {
    var k;
    for (k in this.headers) {
        if (this.headers.hasOwnProperty(k)) {
            if (name.toLowerCase() === k.toLowerCase()) {
                if (arguments.length === 1) {
                    return this.headers[k];
                }

                delete this.headers[k];
                break;
            }
        }
    }
    if (value != null) {
        this.headers[name] = value;
        return value;
    }
};


module.exports = Request;

},{}],4:[function(_dereq_,module,exports){
'use strict';

var Request = _dereq_('./request');


function Response(req) {
    var i, lines, m,
        xhr = req.xhr;
    this.request = req;
    this.xhr = xhr;
    this.headers = {};

    // Browsers don't like you trying to read XHR properties when you abort the
    // request, so we don't.
    if (req.aborted || req.timedOut) return;

    this.status = xhr.status || 0;
    this.text = xhr.responseText;
    this.body = xhr.response || xhr.responseText;
    this.contentType = xhr.contentType || (xhr.getResponseHeader && xhr.getResponseHeader('Content-Type'));

    if (xhr.getAllResponseHeaders) {
        lines = xhr.getAllResponseHeaders().split('\n');
        for (i = 0; i < lines.length; i++) {
            if ((m = lines[i].match(/\s*([^\s]+):\s+([^\s]+)/))) {
                this.headers[m[1]] = m[2];
            }
        }
    }

    this.isHttpError = this.status >= 400;
}

Response.prototype.header = Request.prototype.header;


module.exports = Response;

},{"./request":3}],5:[function(_dereq_,module,exports){
'use strict';

// Wrap a function in a `setTimeout` call. This is used to guarantee async
// behavior, which can avoid unexpected errors.

module.exports = function (fn) {
    return function () {
        var
            args = Array.prototype.slice.call(arguments, 0),
            newFunc = function () {
                return fn.apply(null, args);
            };
        setTimeout(newFunc, 0);
    };
};

},{}],6:[function(_dereq_,module,exports){
'use strict';

// A "once" utility.
module.exports = function (fn) {
    var result, called = false;
    return function () {
        if (!called) {
            called = true;
            result = fn.apply(this, arguments);
        }
        return result;
    };
};

},{}],7:[function(_dereq_,module,exports){
module.exports = window.XMLHttpRequest;

},{}],8:[function(_dereq_,module,exports){
(function() {
  var URL, URL_PATTERN, defaults, urllite,
    __hasProp = {}.hasOwnProperty;

  URL_PATTERN = /^(?:(?:([^:\/?\#]+:)\/+|(\/\/))(?:([a-z0-9-\._~%]+)(?::([a-z0-9-\._~%]+))?@)?(([a-z0-9-\._~%!$&'()*+,;=]+)(?::([0-9]+))?)?)?([^?\#]*?)(\?[^\#]*)?(\#.*)?$/;

  urllite = function(raw, opts) {
    return urllite.URL.parse(raw, opts);
  };

  urllite.URL = URL = (function() {
    function URL(props) {
      var k, v, _ref;
      for (k in defaults) {
        if (!__hasProp.call(defaults, k)) continue;
        v = defaults[k];
        this[k] = (_ref = props[k]) != null ? _ref : v;
      }
      this.host || (this.host = this.hostname && this.port ? "" + this.hostname + ":" + this.port : this.hostname ? this.hostname : '');
      this.origin || (this.origin = this.protocol ? "" + this.protocol + "//" + this.host : '');
      this.isAbsolutePathRelative = !this.host && this.pathname.charAt(0) === '/';
      this.isPathRelative = !this.host && this.pathname.charAt(0) !== '/';
      this.isRelative = this.isSchemeRelative || this.isAbsolutePathRelative || this.isPathRelative;
      this.isAbsolute = !this.isRelative;
    }

    URL.parse = function(raw) {
      var m, pathname, protocol;
      m = raw.toString().match(URL_PATTERN);
      pathname = m[8] || '';
      protocol = m[1];
      return new urllite.URL({
        protocol: protocol,
        username: m[3],
        password: m[4],
        hostname: m[6],
        port: m[7],
        pathname: protocol && pathname.charAt(0) !== '/' ? "/" + pathname : pathname,
        search: m[9],
        hash: m[10],
        isSchemeRelative: m[2] != null
      });
    };

    return URL;

  })();

  defaults = {
    protocol: '',
    username: '',
    password: '',
    host: '',
    hostname: '',
    port: '',
    pathname: '',
    search: '',
    hash: '',
    origin: '',
    isSchemeRelative: false
  };

  module.exports = urllite;

}).call(this);

},{}],9:[function(_dereq_,module,exports){
module.exports = extend

function extend() {
    var target = {}

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (source.hasOwnProperty(key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}

},{}],10:[function(_dereq_,module,exports){
'use strict';

module.exports = {
    processRequest: function (req) {
        req.url = req.url.replace(/[^%]+/g, function (s) {
            return encodeURI(s);
        });
    }
};

},{}],11:[function(_dereq_,module,exports){
'use strict';

var
    urllite = _dereq_('urllite/lib/core'),
    once = _dereq_('../lib/utils/once'),
    warningShown = false;

var supportsXHR = once(function () {
    return (
        typeof window !== "undefined" &&
        window !== null &&
        window.XMLHttpRequest &&
        'withCredentials' in new window.XMLHttpRequest()
    );
});

// This plugin creates a Microsoft `XDomainRequest` in supporting browsers when
// the URL being requested is on a different domain. This is necessary to
// support IE9, which only supports CORS via its proprietary `XDomainRequest`
// object. We need to check the URL because `XDomainRequest` *doesn't* work for
// same domain requests (unless your server sends CORS headers).
// `XDomainRequest` also has other limitations (no custom headers), so we try to
// catch those and error.
module.exports = {
    createXHR: function (req) {
        var a, b, k;

        if (typeof window === "undefined" || window === null) {
            return;
        }

        a = urllite(req.url);
        b = urllite(window.location.href);

        // Don't do anything for same-domain requests.
        if (!a.host) {
            return;
        }
        if (a.protocol === b.protocol && a.host === b.host && a.port === b.port) {
            return;
        }

        // Show a warning if there are custom headers. We do this even in
        // browsers that won't use XDomainRequest so that users know there's an
        // issue right away, instead of if/when they test in IE9.
        if (!warningShown && req.headers) {
            for (k in req.headers) {
                if (req.headers.hasOwnProperty(k)) {
                    warningShown = true;
                    if (window && window.console && window.console.warn) {
                        window.console.warn("Request headers are ignored in old IE when using the oldiexdomain plugin.");
                    }
                    break;
                }
            }
        }

        // Don't do anything if we can't do anything (:
        // Don't do anything if the browser supports proper XHR.
        if (window.XDomainRequest && !supportsXHR()) {
            // We've come this far. Might as well make an XDomainRequest.
            var xdr = new window.XDomainRequest();
            xdr.setRequestHeader = function() {}; // Ignore request headers.
            return xdr;
        }
    }
};

},{"../lib/utils/once":6,"urllite/lib/core":8}],12:[function(_dereq_,module,exports){
module.exports = once

once.proto = once(function () {
  Object.defineProperty(Function.prototype, 'once', {
    value: function () {
      return once(this)
    },
    configurable: true
  })
})

function once (fn) {
  var f = function () {
    if (f.called) return f.value
    f.called = true
    return f.value = fn.apply(this, arguments)
  }
  f.called = false
  return f
}

},{}],13:[function(_dereq_,module,exports){
var InlineSVGError, PropTypes, React, Status, configurationError, createError, delay, getHash, http, httpplease, ieXDomain, isSupportedEnvironment, me, once, span, supportsInlineSVG, uniquifyIDs, unsupportedBrowserError,
  __slice = [].slice,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

React = (window.React);

once = _dereq_('once');

httpplease = _dereq_('httpplease');

ieXDomain = _dereq_('httpplease/plugins/oldiexdomain');

PropTypes = React.PropTypes;

span = React.DOM.span;

http = httpplease.use(ieXDomain);

Status = {
  PENDING: 'pending',
  LOADING: 'loading',
  LOADED: 'loaded',
  FAILED: 'failed',
  UNSUPPORTED: 'unsupported'
};

supportsInlineSVG = once(function() {
  var div;
  if (!document) {
    return false;
  }
  div = document.createElement('div');
  div.innerHTML = '<svg />';
  return div.firstChild && div.firstChild.namespaceURI === 'http://www.w3.org/2000/svg';
});

delay = function(fn) {
  return function() {
    var args, newFunc;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    newFunc = function() {
      return fn.apply(null, args);
    };
    setTimeout(newFunc, 0);
  };
};

isSupportedEnvironment = once(function() {
  return ((typeof window !== "undefined" && window !== null ? window.XMLHttpRequest : void 0) || (typeof window !== "undefined" && window !== null ? window.XDomainRequest : void 0)) && supportsInlineSVG();
});

uniquifyIDs = (function() {
  var idPattern, mkAttributePattern;
  mkAttributePattern = function(attr) {
    return "(?:(?:\\s|\\:)" + attr + ")";
  };
  idPattern = RegExp("(?:(" + (mkAttributePattern('id')) + ")=\"([^\"]+)\")|(?:(" + (mkAttributePattern('href')) + "|" + (mkAttributePattern('role')) + "|" + (mkAttributePattern('arcrole')) + ")=\"\\#([^\"]+)\")|(?:=\"url\\(\\#([^\\)]+)\\)\")", "g");
  return function(svgText, svgID) {
    var uniquifyID;
    uniquifyID = function(id) {
      return "" + id + "___" + svgID;
    };
    return svgText.replace(idPattern, function(m, p1, p2, p3, p4, p5) {
      if (p2) {
        return "" + p1 + "=\"" + (uniquifyID(p2)) + "\"";
      } else if (p4) {
        return "" + p3 + "=\"#" + (uniquifyID(p4)) + "\"";
      } else if (p5) {
        return "=\"url(#" + (uniquifyID(p5)) + ")\"";
      }
    });
  };
})();

getHash = function(str) {
  var chr, hash, i, _i, _ref;
  hash = 0;
  if (!str) {
    return hash;
  }
  for (i = _i = 0, _ref = str.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash = hash & hash;
  }
  return hash;
};

InlineSVGError = (function(_super) {
  __extends(InlineSVGError, _super);

  InlineSVGError.prototype.name = 'InlineSVGError';

  InlineSVGError.prototype.isSupportedBrowser = true;

  InlineSVGError.prototype.isConfigurationError = false;

  InlineSVGError.prototype.isUnsupportedBrowserError = false;

  function InlineSVGError(message) {
    this.message = message;
  }

  return InlineSVGError;

})(Error);

createError = function(message, attrs) {
  var err, k, v;
  err = new InlineSVGError(message);
  for (k in attrs) {
    if (!__hasProp.call(attrs, k)) continue;
    v = attrs[k];
    err[k] = v;
  }
  return err;
};

unsupportedBrowserError = function(message) {
  if (message == null) {
    message = 'Unsupported Browser';
  }
  return createError(message, {
    isSupportedBrowser: false,
    isUnsupportedBrowserError: true
  });
};

configurationError = function(message) {
  return createError(message, {
    isConfigurationError: true
  });
};

module.exports = me = React.createClass({
  statics: {
    Status: Status
  },
  displayName: 'InlineSVG',
  propTypes: {
    wrapper: PropTypes.func,
    src: PropTypes.string.isRequired,
    className: PropTypes.string,
    preloader: PropTypes.func,
    onLoad: PropTypes.func,
    onError: PropTypes.func,
    supportTest: PropTypes.func,
    uniquifyIDs: PropTypes.bool
  },
  getDefaultProps: function() {
    return {
      wrapper: span,
      supportTest: isSupportedEnvironment,
      uniquifyIDs: true
    };
  },
  getInitialState: function() {
    return {
      status: Status.PENDING
    };
  },
  componentDidMount: function() {
    if (this.state.status !== Status.PENDING) {
      return;
    }
    if (this.props.supportTest()) {
      if (this.props.src) {
        return this.setState({
          status: Status.LOADING
        }, this.load);
      } else {
        return delay((function(_this) {
          return function() {
            return _this.fail(configurationError('Missing source'));
          };
        })(this))();
      }
    } else {
      return delay((function(_this) {
        return function() {
          return _this.fail(unsupportedBrowserError());
        };
      })(this))();
    }
  },
  fail: function(error) {
    var status;
    status = error.isUnsupportedBrowserError ? Status.UNSUPPORTED : Status.FAILED;
    return this.setState({
      status: status
    }, (function(_this) {
      return function() {
        var _base;
        return typeof (_base = _this.props).onError === "function" ? _base.onError(error) : void 0;
      };
    })(this));
  },
  handleLoad: function(err, res) {
    if (err) {
      return this.fail(err);
    }
    if (!this.isMounted()) {
      return;
    }
    return this.setState({
      loadedText: res.text,
      status: Status.LOADED
    }, (function(_this) {
      return function() {
        var _base;
        return typeof (_base = _this.props).onLoad === "function" ? _base.onLoad() : void 0;
      };
    })(this));
  },
  load: function() {
    var m, text;
    if (m = this.props.src.match(/data:image\/svg[^,]*?(;base64)?,(.*)/)) {
      text = m[1] ? atob(m[2]) : decodeURIComponent(m[2]);
      return this.handleLoad(null, {
        text: text
      });
    } else {
      return http.get(this.props.src, this.handleLoad);
    }
  },
  getClassName: function() {
    var className;
    className = "isvg " + this.state.status;
    if (this.props.className) {
      className += " " + this.props.className;
    }
    return className;
  },
  render: function() {
    return this.props.wrapper({
      className: this.getClassName(),
      dangerouslySetInnerHTML: this.state.loadedText ? {
        __html: this.processSVG(this.state.loadedText)
      } : void 0
    }, this.renderContents());
  },
  processSVG: function(svgText) {
    if (this.props.uniquifyIDs) {
      return uniquifyIDs(svgText, getHash(this.props.src));
    } else {
      return svgText;
    }
  },
  renderContents: function() {
    switch (this.state.status) {
      case Status.UNSUPPORTED:
        return this.props.children;
      case Status.PENDING:
      case Status.LOADING:
        if (this.props.preloader) {
          return new this.props.preloader;
        }
    }
  }
});

},{"httpplease":2,"httpplease/plugins/oldiexdomain":11,"once":12}]},{},[13])
(13)
});