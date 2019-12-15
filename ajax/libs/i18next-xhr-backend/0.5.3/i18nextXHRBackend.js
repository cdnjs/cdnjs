(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define('i18nextXHRBackend', factory) :
  (global.i18nextXHRBackend = factory());
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

  babelHelpers;

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
      allowMultiLoading: false,
      parse: JSON.parse,
      crossDomain: false,
      ajax: ajax
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
        this.options = defaults(options, this.options || {}, getDefaults());
      }
    }, {
      key: 'readMulti',
      value: function readMulti(languages, namespaces, callback) {
        var url = this.services.interpolator.interpolate(this.options.loadPath, { lng: languages.join('+'), ns: namespaces.join('+') });

        this.loadUrl(url, callback);
      }
    }, {
      key: 'read',
      value: function read(language, namespace, callback) {
        var url = this.services.interpolator.interpolate(this.options.loadPath, { lng: language, ns: namespace });

        this.loadUrl(url, callback);
      }
    }, {
      key: 'loadUrl',
      value: function loadUrl(url, callback) {
        var _this = this;

        this.options.ajax(url, this.options, function (data, xhr) {
          var statusCode = xhr.status.toString();
          if (statusCode.indexOf('5') === 0) return callback('failed loading ' + url, true /* retry */);
          if (statusCode.indexOf('4') === 0) return callback('failed loading ' + url, false /* no retry */);

          var ret = void 0,
              err = void 0;
          try {
            ret = _this.options.parse(data);
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