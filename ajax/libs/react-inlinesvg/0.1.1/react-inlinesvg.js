!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var n;"undefined"!=typeof window?n=window:"undefined"!=typeof global?n=global:"undefined"!=typeof self&&(n=self),n.ReactInlineSVG=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
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

},{}],2:[function(_dereq_,module,exports){
var InlineSVGError, PropTypes, React, Status, XHR, configurationError, createError, delay, httpError, isSupportedEnvironment, me, once, span, supportsInlineSVG, unsupportedBrowserError,
  __slice = [].slice,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

React = (window.React);

once = _dereq_('once');

PropTypes = React.PropTypes;

span = React.DOM.span;

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
    supportTest: PropTypes.func
  },
  getDefaultProps: function() {
    return {
      wrapper: span,
      supportTest: isSupportedEnvironment
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
    status = !error.isSupportedBrowser ? Status.UNSUPPORTED : Status.FAILED;
    return this.setState({
      status: status
    }, (function(_this) {
      return function() {
        var _base;
        return typeof (_base = _this.props).onError === "function" ? _base.onError(error) : void 0;
      };
    })(this));
  },
  handleResponse: function(txt) {
    if (!this.isMounted()) {
      return;
    }
    return this.setState({
      loadedText: txt,
      status: Status.LOADED
    }, (function(_this) {
      return function() {
        var _base;
        return typeof (_base = _this.props).onLoad === "function" ? _base.onLoad() : void 0;
      };
    })(this));
  },
  load: function() {
    var done, xhr;
    xhr = new XHR();
    done = once(delay((function(_this) {
      return function(err) {
        xhr.onload = xhr.onerror = xhr.onreadystatechange = null;
        if (err) {
          return _this.fail(err);
        } else {
          return _this.handleResponse(xhr.responseText);
        }
      };
    })(this)));
    xhr.onreadystatechange = (function(_this) {
      return function() {
        if (xhr.readyState === 4) {
          switch (xhr.status.toString().slice(0, 1)) {
            case '2':
              return done();
            case '4':
              return done(httpError('Client Error', xhr.status));
            case '5':
              return done(httpError('Server Error', xhr.status));
            default:
              return done(httpError('HTTP Error', xhr.status));
          }
        }
      };
    })(this);
    xhr.onload = function() {
      return done();
    };
    xhr.onerror = function() {
      return done(httpError('Internal XHR Error', xhr.status || 0));
    };
    xhr.open('GET', this.props.src);
    return xhr.send();
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
        __html: this.state.loadedText
      } : void 0
    }, this.renderContents());
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

XHR = (function() {
  if (typeof window === "undefined" || window === null) {
    return null;
  }
  if ((XHR = window.XMLHttpRequest) && 'withCredentials' in new XHR) {
    return XHR;
  }
  return window.XDomainRequest;
})();

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
  return XHR && supportsInlineSVG();
});

InlineSVGError = (function(_super) {
  __extends(InlineSVGError, _super);

  InlineSVGError.prototype.name = 'InlineSVGError';

  InlineSVGError.prototype.isHttpError = false;

  InlineSVGError.prototype.isSupportedBrowser = true;

  InlineSVGError.prototype.isConfigurationError = false;

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

httpError = function(message, statusCode) {
  return createError(message, {
    isHttpError: true,
    statusCode: statusCode
  });
};

unsupportedBrowserError = function(message) {
  if (message == null) {
    message = 'Unsupported Browser';
  }
  return createError(message, {
    isSupportedBrowser: false
  });
};

configurationError = function(message) {
  return createError(message, {
    isConfigurationError: true
  });
};

},{"once":1}]},{},[2])
(2)
});