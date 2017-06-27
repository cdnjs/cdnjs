(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define('i18next-locize-backend', factory) :
  (global.i18next-locize-backend = factory());
}(this, function () { 'use strict';

  var babelHelpers = {};
  babelHelpers.typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
  };

  babelHelpers.classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  babelHelpers.createClass = function () {
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

  babelHelpers.extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  babelHelpers;

  function debounce(func, wait, immediate) {
    var timeout;
    return function () {
      var context = this,
          args = arguments;
      var later = function later() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  function getLastOfPath(object, path, Empty) {
    function cleanKey(key) {
      return key && key.indexOf('###') > -1 ? key.replace(/###/g, '.') : key;
    }

    var stack = typeof path !== 'string' ? [].concat(path) : path.split('.');
    while (stack.length > 1) {
      if (!object) return {};

      var key = cleanKey(stack.shift());
      if (!object[key] && Empty) object[key] = new Empty();
      object = object[key];
    }

    if (!object) return {};
    return {
      obj: object,
      k: cleanKey(stack.shift())
    };
  }

  function setPath(object, path, newValue) {
    var _getLastOfPath = getLastOfPath(object, path, Object);

    var obj = _getLastOfPath.obj;
    var k = _getLastOfPath.k;


    obj[k] = newValue;
  }

  function pushPath(object, path, newValue, concat) {
    var _getLastOfPath2 = getLastOfPath(object, path, Object);

    var obj = _getLastOfPath2.obj;
    var k = _getLastOfPath2.k;


    obj[k] = obj[k] || [];
    if (concat) obj[k] = obj[k].concat(newValue);
    if (!concat) obj[k].push(newValue);
  }

  function getPath(object, path) {
    var _getLastOfPath3 = getLastOfPath(object, path);

    var obj = _getLastOfPath3.obj;
    var k = _getLastOfPath3.k;


    if (!obj) return undefined;
    return obj[k];
  }

  // https://gist.github.com/Xeoncross/7663273
  function ajax(url, options, callback, data, cache) {
    // Must encode data
    if (data && (typeof data === 'undefined' ? 'undefined' : babelHelpers.typeof(data)) === 'object') {
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
      x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      x.onreadystatechange = function () {
        x.readyState > 3 && callback && callback(x.responseText, x);
      };
      x.send(data);
    } catch (e) {
      window.console && console.log(e);
    }
  };

  // ajax.uriEncode = function(o) {
  //     var x, y = '', e = encodeURIComponent;
  //     for (x in o) y += '&' + e(x) + '=' + e(o[x]);
  //     return y.slice(1);
  // };
  //
  // ajax.collect = (a, f) {
  //     var n = [];
  //     for (var i = 0; i < a.length; i++) {
  //         var v = f(a[i]);
  //         if (v != null) n.push(v);
  //     }
  //     return n;
  // };
  //
  // ajax.serialize = function (f) {
  //     function g(n) {
  //         return f.getElementsByTagName(n);
  //     };
  //     var nv = function (e) {
  //         if (e.name) return encodeURIComponent(e.name) + '=' + encodeURIComponent(e.value);
  //     };
  //     var i = collect(g('input'), function (i) {
  //         if ((i.type != 'radio' && i.type != 'checkbox') || i.checked) return nv(i);
  //     });
  //     var s = collect(g('select'), nv);
  //     var t = collect(g('textarea'), nv);
  //     return i.concat(s).concat(t).join('&');
  // };
  //

  function getDefaults() {
    return {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
      addPath: 'locales/add/{{lng}}/{{ns}}',
      referenceLng: 'en',
      crossDomain: true,
      version: 'latest'
    };
  }

  var Backend = function () {
    function Backend(services) {
      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
      babelHelpers.classCallCheck(this, Backend);

      this.init(services, options);

      this.type = 'backend';
    }

    babelHelpers.createClass(Backend, [{
      key: 'init',
      value: function init(services) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        this.services = services;
        this.options = babelHelpers.extends({}, getDefaults(), this.options, options);

        this.queuedWrites = {};
        this.debouncedWrite = debounce(this.write, 10000);
      }
    }, {
      key: 'read',
      value: function read(language, namespace, callback) {
        var url = this.services.interpolator.interpolate(this.options.loadPath, { lng: language, ns: namespace, projectId: this.options.projectId, version: this.options.version });

        this.loadUrl(url, callback);
      }
    }, {
      key: 'loadUrl',
      value: function loadUrl(url, callback) {
        ajax(url, this.options, function (data, xhr) {
          var statusCode = xhr.status.toString();
          if (statusCode.indexOf('5') === 0) return callback('failed loading ' + url, true /* retry */);
          if (statusCode.indexOf('4') === 0) return callback('failed loading ' + url, false /* no retry */);

          var ret = void 0,
              err = void 0;
          try {
            ret = JSON.parse(data);
          } catch (e) {
            err = 'failed parsing ' + url + ' to json';
          }
          if (err) return callback(err, false);
          callback(null, ret);
        });
      }
    }, {
      key: 'create',
      value: function create(languages, namespace, key, fallbackValue, callback) {
        var _this = this,
            _arguments = arguments;

        if (!callback) callback = function callback() {};
        if (typeof languages === 'string') languages = [languages];

        languages.forEach(function (lng) {
          if (lng === _this.options.referenceLng) _this.queue.apply(_this, _arguments);
        });
      }
    }, {
      key: 'write',
      value: function write(lng, namespace) {
        var _this2 = this;

        var lock = getPath(this.queuedWrites, ['locks', lng, namespace]);
        if (lock) return;

        var url = this.services.interpolator.interpolate(this.options.addPath, { lng: lng, ns: namespace, projectId: this.options.projectId, version: this.options.version });

        var missings = getPath(this.queuedWrites, [lng, namespace]);
        setPath(this.queuedWrites, [lng, namespace], []);

        if (missings.length) {
          // lock
          setPath(this.queuedWrites, ['locks', lng, namespace], true);

          ajax(url, this.options, function (data, xhr) {
            //const statusCode = xhr.status.toString();
            // TODO: if statusCode === 4xx do log

            // unlock
            setPath(_this2.queuedWrites, ['locks', lng, namespace], false);

            missings.forEach(function (missing) {
              if (missing.callback) missing.callback();
            });

            // rerun
            _this2.debouncedWrite(lng, namespace);
          }, payload);
        }
      }
    }, {
      key: 'queue',
      value: function queue(lng, namespace, key, fallbackValue, callback) {
        pushPath(this.queuedWrites, [lng, namespace], { key: key, fallbackValue: fallbackValue || '', callback: callback });

        this.debouncedWrite(lng, namespace);
      }
    }]);
    return Backend;
  }();

  Backend.type = 'backend';

  return Backend;

}));