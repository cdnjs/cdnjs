!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var n;"undefined"!=typeof window?n=window:"undefined"!=typeof global?n=global:"undefined"!=typeof self&&(n=self),n.ReactInlineSVG=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
(function() {
  var delay,
    __slice = [].slice;

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

  module.exports = delay;

}).call(this);

},{}],2:[function(_dereq_,module,exports){
(function() {
  var RequestError, Response,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Response = _dereq_('./response');

  RequestError = (function(_super) {
    __extends(RequestError, _super);

    RequestError.prototype.name = 'RequestError';

    function RequestError(message) {
      this.message = message;
    }

    RequestError.create = function(message, req) {
      var err;
      err = new RequestError(message);
      Response.call(err, req);
      return err;
    };

    return RequestError;

  })(Error);

  module.exports = RequestError;

}).call(this);

},{"./response":7}],3:[function(_dereq_,module,exports){
(function() {
  var Request, Response, XHR, cleanURL, createError, delay, extend, factory, once,
    __hasProp = {}.hasOwnProperty,
    __slice = [].slice;

  cleanURL = _dereq_('./plugins/cleanurl');

  XHR = _dereq_('./xhr');

  delay = _dereq_('./delay');

  createError = _dereq_('./error').create;

  Response = _dereq_('./response');

  Request = _dereq_('./request');

  extend = _dereq_('xtend');

  once = _dereq_('once');

  factory = function(defaults, plugins) {
    var http, method, _fn, _i, _len, _ref;
    if (defaults == null) {
      defaults = {};
    }
    if (plugins == null) {
      plugins = [];
    }
    http = function(req, cb) {
      var done, k, plugin, v, xhr, _i, _j, _len, _len1, _ref;
      req = new Request(extend(defaults, req));
      for (_i = 0, _len = plugins.length; _i < _len; _i++) {
        plugin = plugins[_i];
        if (xhr = plugin != null ? typeof plugin.createXHR === "function" ? plugin.createXHR(req) : void 0 : void 0) {
          break;
        }
      }
      if (xhr == null) {
        xhr = new XHR;
      }
      done = once(delay(function(err) {
        var res, _j, _len1;
        xhr.onload = xhr.onerror = xhr.onreadystatechange = xhr.ontimeout = xhr.onprogress = null;
        res = (err != null ? err.isHttpError : void 0) ? err : new Response(req);
        for (_j = 0, _len1 = plugins.length; _j < _len1; _j++) {
          plugin = plugins[_j];
          if (typeof plugin.processResponse === "function") {
            plugin.processResponse(res);
          }
        }
        return cb(err, res);
      }));
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          switch (Math.floor(xhr.status / 100)) {
            case 2:
              return done();
            case 4:
              if (xhr.status === 404 && !req.errorOn404) {
                return done();
              } else {
                return done(createError('Client Error', req));
              }
              break;
            case 5:
              return done(createError('Server Error', req));
            default:
              return done(createError('HTTP Error', req));
          }
        }
      };
      xhr.onload = function() {
        return done();
      };
      xhr.onerror = function() {
        return done(createError('Internal XHR Error', req));
      };
      xhr.ontimeout = function() {};
      xhr.onprogress = function() {};
      req.xhr = xhr;
      for (_j = 0, _len1 = plugins.length; _j < _len1; _j++) {
        plugin = plugins[_j];
        if (typeof plugin.processRequest === "function") {
          plugin.processRequest(req);
        }
      }
      xhr.open(req.method, req.url);
      _ref = req.headers;
      for (k in _ref) {
        if (!__hasProp.call(_ref, k)) continue;
        v = _ref[k];
        xhr.setRequestHeader(k, v);
      }
      xhr.send(req.body);
      return req;
    };
    _ref = ['get', 'post', 'put', 'head', 'patch', 'delete'];
    _fn = function(http, method) {
      return http[method] = function(req, cb) {
        req = new Request(req);
        req.method = method;
        return http(req, cb);
      };
    };
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      method = _ref[_i];
      _fn(http, method);
    }
    http.plugins = function() {
      return plugins;
    };
    http.defaults = function(newValues) {
      if (newValues) {
        return factory(extend(defaults, newValues), plugins);
      } else {
        return defaults;
      }
    };
    http.use = function() {
      var newPlugins;
      newPlugins = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return factory(defaults, plugins.concat(newPlugins));
    };
    http.bare = function() {
      return factory();
    };
    return http;
  };

  module.exports = factory({}, [cleanURL]);

}).call(this);

},{"./delay":1,"./error":2,"./plugins/cleanurl":4,"./request":6,"./response":7,"./xhr":8,"once":11,"xtend":10}],4:[function(_dereq_,module,exports){
(function() {
  module.exports = {
    processRequest: function(req) {
      return req.url = req.url.replace(/[^%]+/g, function(s) {
        return encodeURI(s);
      });
    }
  };

}).call(this);

},{}],5:[function(_dereq_,module,exports){
(function() {
  var once, supportsXHR, urllite,
    __hasProp = {}.hasOwnProperty;

  urllite = _dereq_('urllite/lib/core');

  once = _dereq_('once');

  supportsXHR = once(function() {
    return (typeof window !== "undefined" && window !== null ? window.XMLHttpRequest : void 0) && 'withCredentials' in new window.XMLHttpRequest;
  });

  module.exports = {
    createXHR: function(req) {
      var a, b, k, _ref;
      if (typeof window === "undefined" || window === null) {
        return;
      }
      a = urllite(req.url);
      b = urllite(window.location.href);
      if (!a.host) {
        return;
      }
      if (a.protocol === b.protocol && a.host === b.host && a.port === b.port) {
        return;
      }
      if (req.headers) {
        _ref = req.headers;
        for (k in _ref) {
          if (!__hasProp.call(_ref, k)) continue;
          throw new Error("You can't provide request headers when using the oldiexdomain plugin.");
        }
      }
      if (!window.XDomainRequest) {
        return;
      }
      if (supportsXHR()) {
        return;
      }
      return new window.XDomainRequest;
    }
  };

}).call(this);

},{"once":11,"urllite/lib/core":9}],6:[function(_dereq_,module,exports){
(function() {
  var Request;

  Request = (function() {
    function Request(optsOrUrl) {
      var opts, _ref, _ref1;
      opts = typeof optsOrUrl === 'string' ? {
        url: optsOrUrl
      } : optsOrUrl;
      this.method = ((_ref = opts.method) != null ? _ref.toUpperCase() : void 0) || 'GET';
      this.url = opts.url;
      this.headers = opts.headers || {};
      this.body = opts.body;
      this.errorOn404 = (_ref1 = opts.errorOn404) != null ? _ref1 : true;
    }

    return Request;

  })();

  module.exports = Request;

}).call(this);

},{}],7:[function(_dereq_,module,exports){
(function() {
  var Response;

  Response = (function() {
    function Response(req) {
      var xhr;
      xhr = req.xhr;
      this.request = req;
      this.xhr = xhr;
      this.status = xhr.status || 0;
      this.text = xhr.responseText;
      this.body = xhr.response || xhr.responseText;
      this.contentType = xhr.contentType || (typeof xhr.getResponseHeader === "function" ? xhr.getResponseHeader('Content-Type') : void 0);
      this.headers = (function() {
        var header, headers, lines, m, _i, _len;
        headers = {};
        if (lines = typeof xhr.getAllResponseHeaders === "function" ? xhr.getAllResponseHeaders().split('\n') : void 0) {
          for (_i = 0, _len = lines.length; _i < _len; _i++) {
            header = lines[_i];
            if (m = header.match(/\s+([^\s]+):\s+([^\s]+)/)) {
              headers[m[1]] = m[2];
            }
          }
        }
        return headers;
      })();
      this.isHttpError = this.status >= 400;
    }

    return Response;

  })();

  module.exports = Response;

}).call(this);

},{}],8:[function(_dereq_,module,exports){
(function() {
  module.exports = window.XMLHttpRequest;

}).call(this);

},{}],9:[function(_dereq_,module,exports){
(function() {
  var URL, URL_PATTERN, defaults, urllite,
    __hasProp = {}.hasOwnProperty,
    __slice = [].slice;

  URL_PATTERN = /^(?:(?:([^:\/?\#]+:)\/+|(\/\/))(?:([a-z0-9-\._~%]+)(?::([a-z0-9-\._~%]+))?@)?(([a-z0-9-\._~%!$&'()*+,;=]+)(?::([0-9]+))?)?)?([^?\#]*?)(\?[^\#]*)?(\#.*)?$/;

  urllite = function(raw, opts) {
    return urllite.URL.parse(raw, opts);
  };

  urllite.URL = URL = (function() {
    function URL(props) {
      var k, v;
      for (k in props) {
        if (!__hasProp.call(props, k)) continue;
        v = props[k];
        this[k] = v;
      }
    }

    URL.parse = function(raw) {
      var m, pathname, protocol;
      m = raw.toString().match(URL_PATTERN);
      pathname = m[8] || '';
      protocol = m[1];
      return urllite._createURL({
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

  urllite._createURL = function() {
    var base, bases, k, props, v, _i, _len, _ref, _ref1;
    bases = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    props = {};
    for (_i = 0, _len = bases.length; _i < _len; _i++) {
      base = bases[_i];
      for (k in defaults) {
        if (!__hasProp.call(defaults, k)) continue;
        v = defaults[k];
        props[k] = (_ref = (_ref1 = base[k]) != null ? _ref1 : props[k]) != null ? _ref : v;
      }
    }
    props.host = props.hostname && props.port ? "" + props.hostname + ":" + props.port : props.hostname ? props.hostname : '';
    props.origin = props.protocol ? "" + props.protocol + "//" + props.host : '';
    props.isAbsolutePathRelative = !props.host && props.pathname.charAt(0) === '/';
    props.isPathRelative = !props.host && props.pathname.charAt(0) !== '/';
    props.isRelative = props.isSchemeRelative || props.isAbsolutePathRelative || props.isPathRelative;
    props.isAbsolute = !props.isRelative;
    return new urllite.URL(props);
  };

  module.exports = urllite;

}).call(this);

},{}],10:[function(_dereq_,module,exports){
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

},{}],11:[function(_dereq_,module,exports){
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

},{}],12:[function(_dereq_,module,exports){
var InlineSVGError, PropTypes, React, Status, configurationError, createError, delay, getComponentID, http, httpplease, ieXDomain, isSupportedEnvironment, me, once, span, supportsInlineSVG, uniquifyIDs, unsupportedBrowserError,
  __slice = [].slice,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

React = (window.React);

once = _dereq_('once');

httpplease = _dereq_('httpplease');

ieXDomain = _dereq_('httpplease/lib/plugins/oldiexdomain');

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
    console.log(error);
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
    return http.get(this.props.src, this.handleLoad);
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
      return uniquifyIDs(svgText, getComponentID(this));
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
      } else if (p3) {
        return "=\"url(#" + (uniquifyID(p3)) + ")\"";
      } else if (p5) {
        return "" + p4 + "=\"#" + (uniquifyID(p4)) + "\"";
      }
    });
  };
})();

getComponentID = (function() {
  var clean;
  clean = function(str) {
    return str.toString().replace(/[^a-zA-Z0-9]/g, '_');
  };
  return function(component) {
    return "" + (clean(component._rootNodeID)) + "__" + (clean(component._mountDepth));
  };
})();

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

},{"httpplease":3,"httpplease/lib/plugins/oldiexdomain":5,"once":11}]},{},[12])
(12)
});