(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.i18nextXHRBackend = factory());
}(this, function () { 'use strict';

  var arr = [];
  var each = arr.forEach;
  var slice = arr.slice;

  function defaults(obj) {
    each.call(slice.call(arguments, 1), function (source) {
      if (source) {
        for (var prop in source) {
          if (obj[prop] === undefined) obj[prop] = source[prop];
        }
      }
    });
    return obj;
  }

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var asyncGenerator = function () {
    function AwaitValue(value) {
      this.value = value;
    }

    function AsyncGenerator(gen) {
      var front, back;

      function send(key, arg) {
        return new Promise(function (resolve, reject) {
          var request = {
            key: key,
            arg: arg,
            resolve: resolve,
            reject: reject,
            next: null
          };

          if (back) {
            back = back.next = request;
          } else {
            front = back = request;
            resume(key, arg);
          }
        });
      }

      function resume(key, arg) {
        try {
          var result = gen[key](arg);
          var value = result.value;

          if (value instanceof AwaitValue) {
            Promise.resolve(value.value).then(function (arg) {
              resume("next", arg);
            }, function (arg) {
              resume("throw", arg);
            });
          } else {
            settle(result.done ? "return" : "normal", result.value);
          }
        } catch (err) {
          settle("throw", err);
        }
      }

      function settle(type, value) {
        switch (type) {
          case "return":
            front.resolve({
              value: value,
              done: true
            });
            break;

          case "throw":
            front.reject(value);
            break;

          default:
            front.resolve({
              value: value,
              done: false
            });
            break;
        }

        front = front.next;

        if (front) {
          resume(front.key, front.arg);
        } else {
          back = null;
        }
      }

      this._invoke = send;

      if (typeof gen.return !== "function") {
        this.return = undefined;
      }
    }

    if (typeof Symbol === "function" && Symbol.asyncIterator) {
      AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
        return this;
      };
    }

    AsyncGenerator.prototype.next = function (arg) {
      return this._invoke("next", arg);
    };

    AsyncGenerator.prototype.throw = function (arg) {
      return this._invoke("throw", arg);
    };

    AsyncGenerator.prototype.return = function (arg) {
      return this._invoke("return", arg);
    };

    return {
      wrap: function (fn) {
        return function () {
          return new AsyncGenerator(fn.apply(this, arguments));
        };
      },
      await: function (value) {
        return new AwaitValue(value);
      }
    };
  }();

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  // https://gist.github.com/Xeoncross/7663273
  function ajax(url, options, callback, data, cache) {
    // Must encode data
    if (data && (typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object') {
      var y = '',
          e = encodeURIComponent;
      for (var m in data) {
        y += '&' + e(m) + '=' + e(data[m]);
      }
      data = y.slice(1) + (!cache ? '&_t=' + new Date() : '');
    }

    try {
      var x = new (XMLHttpRequest || ActiveXObject)('MSXML2.XMLHTTP.3.0');
      x.open(data ? 'POST' : 'GET', url, 1);
      if (!options.crossDomain) {
        x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      }
      x.withCredentials = !!options.withCredentials;
      if (data) {
        x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      }
      x.onreadystatechange = function () {
        x.readyState > 3 && callback && callback(x.responseText, x);
      };
      x.send(data);
    } catch (e) {
      window.console && console.log(e);
    }
  }

  function getDefaults() {
    return {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
      addPath: 'locales/add/{{lng}}/{{ns}}',
      allowMultiLoading: false,
      parse: JSON.parse,
      crossDomain: false,
      ajax: ajax
    };
  }

  var Backend = function () {
    function Backend(services) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      classCallCheck(this, Backend);

      this.init(services, options);

      this.type = 'backend';
    }

    createClass(Backend, [{
      key: 'init',
      value: function init(services) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        this.services = services;
        this.options = defaults(options, this.options || {}, getDefaults());
      }
    }, {
      key: 'readMulti',
      value: function readMulti(languages, namespaces, callback) {
        var loadPath = this.options.loadPath;
        if (typeof this.options.loadPath === 'function') {
          loadPath = this.options.loadPath(languages, namespaces);
        }

        var url = this.services.interpolator.interpolate(loadPath, { lng: languages.join('+'), ns: namespaces.join('+') });

        this.loadUrl(url, callback);
      }
    }, {
      key: 'read',
      value: function read(language, namespace, callback) {
        var loadPath = this.options.loadPath;
        if (typeof this.options.loadPath === 'function') {
          loadPath = this.options.loadPath([language], [namespace]);
        }

        var url = this.services.interpolator.interpolate(loadPath, { lng: language, ns: namespace });

        this.loadUrl(url, callback);
      }
    }, {
      key: 'loadUrl',
      value: function loadUrl(url, callback) {
        var _this = this;

        this.options.ajax(url, this.options, function (data, xhr) {
          if (xhr.status >= 500 && xhr.status < 600) return callback('failed loading ' + url, true /* retry */);
          if (xhr.status >= 400 && xhr.status < 500) return callback('failed loading ' + url, false /* no retry */);

          var ret = void 0,
              err = void 0;
          try {
            ret = _this.options.parse(data, url);
          } catch (e) {
            err = 'failed parsing ' + url + ' to json';
          }
          if (err) return callback(err, false);
          callback(null, ret);
        });
      }
    }, {
      key: 'create',
      value: function create(languages, namespace, key, fallbackValue) {
        var _this2 = this;

        if (typeof languages === 'string') languages = [languages];

        var payload = {};
        payload[key] = fallbackValue || '';

        languages.forEach(function (lng) {
          var url = _this2.services.interpolator.interpolate(_this2.options.addPath, { lng: lng, ns: namespace });

          _this2.options.ajax(url, _this2.options, function (data, xhr) {
            //const statusCode = xhr.status.toString();
            // TODO: if statusCode === 4xx do log
          }, payload);
        });
      }
    }]);
    return Backend;
  }();

  Backend.type = 'backend';

  return Backend;

}));