// Copyright (c) 2012 Florian H., https://github.com/js-coder/x18n

(function() {
  var Observable;

  Observable = (function() {
    var utils;

    utils = {
      is: function(type, value) {
        return Object.prototype.toString.call(value).match(/\s(\w+)/)[1].toLowerCase() === type;
      },
      isPlainObject: function(value) {
        return !!value && utils.is('object', value);
      },
      toArray: function(value) {
        if (utils.is('array', value)) {
          return value;
        } else {
          return [value];
        }
      }
    };

    function Observable(host) {
      var fn, key, _ref;
      if (host == null) {
        host = {};
      }
      host.__observable = {
        lastIds: {},
        events: {},
        ids: []
      };
      _ref = Observable.prototype;
      for (key in _ref) {
        fn = _ref[key];
        host[key] = fn;
      }
      return host;
    }

    Observable.prototype.on = function(topics, fn, once) {
      var id, topic, _base, _base1, _i, _len;
      if (utils.isPlainObject(topics)) {
        once = fn;
        for (topic in topics) {
          fn = topics[topic];
          this.on(topic, fn, once);
        }
      } else {
        topics = utils.toArray(topics);
        this.__observable.ids.length = 0;
        for (_i = 0, _len = topics.length; _i < _len; _i++) {
          topic = topics[_i];
          (_base = this.__observable.lastIds)[topic] || (_base[topic] = 0);
          id = "" + topic + ";" + (++this.__observable.lastIds[topic]);
          if (once) {
            id += ' once';
          }
          this.__observable.ids.push(id);
          (_base1 = this.__observable.events)[topic] || (_base1[topic] = {});
          this.__observable.events[topic][id] = fn;
        }
      }
      return this;
    };

    Observable.prototype.once = function(topics, fn) {
      return this.on(topics, fn, true);
    };

    Observable.prototype.off = function(obj) {
      var id, topic, _i, _len, _ref;
      if (obj === void 0) {
        this.__observable.events = {};
      } else {
        _ref = obj.__observable.ids;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          id = _ref[_i];
          topic = id.substr(0, id.lastIndexOf(';')).split(' ')[0];
          if (obj.__observable.events[topic]) {
            delete obj.__observable.events[topic][id];
          }
        }
      }
      return this;
    };

    Observable.prototype.trigger = function(topic, args) {
      var fn, id, _ref;
      if (args == null) {
        args = [];
      }
      _ref = this.__observable.events[topic];
      for (id in _ref) {
        fn = _ref[id];
        fn.apply(null, args);
        if (id.lastIndexOf(' once') === id.length - 1) {
          this.off(id);
        }
      }
      return this;
    };

    return Observable;

  })();

  if (typeof define === 'function' && define.amd) {
    define('observable', [], function() {
      return Observable;
    });
  } else if (typeof exports !== 'undefined') {
    module.exports = Observable;
  } else {
    window.Observable = Observable;
  }

}).call(this);

(function() {
  var base,
    __slice = [].slice,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  base = function(Observable) {
    var x18n;
    return x18n = (function() {
      var eventSystem, oldT;

      function x18n() {}

      x18n.dict = {};

      x18n.defaultlocal = 'en';

      x18n.chosenLocal = void 0;

      x18n.availableLocales = [];

      x18n.locales = [];

      x18n.dynamicBindings = true;

      x18n.missingTranslations = {};

      eventSystem = new Observable;

      x18n.__observable = eventSystem.__observable;

      x18n.on = eventSystem.on;

      x18n.once = eventSystem.once;

      x18n.off = eventSystem.off;

      x18n.trigger = eventSystem.trigger;

      x18n.utils = {
        merge: function(one, two) {
          var k, v, _results;
          _results = [];
          for (k in two) {
            v = two[k];
            if (typeof v === 'object' && typeof one[k] === 'object') {
              _results.push(this.merge(one[k], v));
            } else {
              _results.push(one[k] = v);
            }
          }
          return _results;
        },
        filter: function(arr, fn) {
          var v, _i, _len, _results;
          _results = [];
          for (_i = 0, _len = arr.length; _i < _len; _i++) {
            v = arr[_i];
            if (fn(v)) {
              _results.push(v);
            }
          }
          return _results;
        },
        unique: function(arr) {
          var k, ret, v, _i, _len, _results;
          ret = {};
          for (_i = 0, _len = arr.length; _i < _len; _i++) {
            v = arr[_i];
            ret[v] = v;
          }
          _results = [];
          for (k in ret) {
            v = ret[k];
            _results.push(v);
          }
          return _results;
        },
        getByDotNotation: function(obj, key) {
          var keys;
          keys = key.split('.');
          while (!(keys.length === 0 || obj === void 0)) {
            obj = obj[keys[0]];
            keys.shift();
          }
          return obj;
        },
        isPlainObject: function(value) {
          return !!value && Object.prototype.toString.call(value) === '[object Object]';
        }
      };

      x18n.register = function(local, dict) {
        if (!(local in this.dict)) {
          this.dict[local] = {};
          this.availableLocales.push(local);
        }
        this.utils.merge(this.dict[local], dict);
        return this.trigger('dict:change');
      };

      x18n.set = function(local) {
        this.chosenLocal = local;
        return this.sortLocales();
      };

      x18n.setDefault = function(local) {
        this.defaultLocal = local;
        return this.sortLocales();
      };

      x18n.detectLocal = function() {
        return navigator.userLanguage || navigator.language;
      };

      x18n.similiarLocales = function(local) {
        local = String(local).slice(0, 2).toLowerCase();
        return this.utils.filter(this.availableLocales, function(l) {
          if (local === l) {
            return false;
          }
          return l.toLowerCase().indexOf(local) === 0;
        });
      };

      x18n.sortLocales = function() {
        var local, locales, _i, _len, _locales;
        _locales = [this.chosenLocal].concat(__slice.call(this.similiarLocales(this.chosenLocal)), [this.detectLocal()], __slice.call(this.similiarLocales(this.detectLocal)), [this.defaultlocal], [this.similiarLocales(this.defaultlocal)], ['en'], __slice.call(this.similiarLocales('en')));
        locales = [];
        for (_i = 0, _len = _locales.length; _i < _len; _i++) {
          local = _locales[_i];
          if (__indexOf.call(this.availableLocales, local) >= 0) {
            locales.push(local);
          }
        }
        locales.push.apply(locales, this.availableLocales);
        this.locales = this.utils.unique(locales);
        return this.trigger('lang:change');
      };

      x18n.resolveBindings = function(str) {
        str = String(str);
        if (!this.dynamicBindings) {
          return str;
        }
        return str.replace(/\$\{([^}]+)\}/g, function(_, src) {
          return x18n.globalEval(src);
        });
      };

      x18n.interpolate = function() {
        var interpolation, str;
        str = arguments[0], interpolation = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        if (this.utils.isPlainObject(interpolation[0])) {
          str = str.replace(/%\{([^}]+)\}/g, function(_, key) {
            return interpolation[0][key];
          });
        } else {
          str = str.replace(/%(\d+)/g, function(_, n) {
            return interpolation[Number(n) - 1];
          });
        }
        return this.resolveBindings(str);
      };

      x18n.globalEval = function(src) {
        return (window.execScript || function(src) {
          return eval.call(window, src);
        })(src);
      };

      oldT = window.t;

      x18n.t = function() {
        var interpolation, key, local, tr, _i, _len, _ref;
        key = arguments[0], interpolation = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        tr = void 0;
        _ref = x18n.locales;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          local = _ref[_i];
          tr = x18n.utils.getByDotNotation(x18n.dict[local], key);
          if (tr) {
            break;
          } else {
            if (!(local in x18n.missingTranslations)) {
              x18n.missingTranslations[local] = [];
            }
            x18n.missingTranslations[local].push(key);
            x18n.missingTranslations[local] = x18n.utils.unique(x18n.missingTranslations[local]);
            x18n.trigger('missing-translation', [local, key]);
          }
        }
        if (typeof tr === 'string') {
          tr = x18n.interpolate.apply(x18n, [x18n.resolveBindings(tr)].concat(__slice.call(interpolation)));
        } else if (tr !== void 0) {
          tr.plural = function(n) {
            n = x18n.resolveBindings(n);
            if (n in tr) {
              return tr[n];
            } else {
              return x18n.interpolate(tr.n, n);
            }
          };
        }
        return tr;
      };

      x18n.t.noConflict = function() {
        window.t = oldT;
        return x18n.t;
      };

      window.t = x18n.t;

      x18n.on('dict:change', function() {
        return x18n.sortLocales();
      });

      return x18n;

    }).call(this);
  };

  if (typeof define === 'function' && define.amd) {
    define('x18n', ['observable'], function(Observable) {
      return base(Observable);
    });
  } else {
    window.x18n = base(Observable);
  }

}).call(this);

// Copyright (c) 2012 Florian H., https://github.com/js-coder/jQuery.x18n

(function() {
  var $, config, plural, setTranslation,
    __slice = [].slice;

  $ = jQuery;

  $.x18n = {
    config: {
      key: 't',
      interpolation: 'interpolation',
      plural: 'plural'
    }
  };

  config = $.x18n.config;

  setTranslation = function(el, tr) {
    if (el.is('input:submit, input:reset, input[type=button]')) {
      return el.val(tr);
    } else if (el.is('input')) {
      return el.attr('placeholder', tr);
    } else {
      return el.html(tr);
    }
  };

  plural = function(n) {
    var tr;
    tr = this.x18n.tr.plural(n);
    setTranslation(this, tr);
    return this.attr("data-" + config.plural, n);
  };

  $.fn.t = function() {
    var interpolation, key, tr;
    key = arguments[0], interpolation = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    tr = x18n.t.apply(x18n, [key].concat(__slice.call(interpolation)));
    this.attr("data-" + config.key, key);
    if ($.isPlainObject(tr)) {
      this.x18n.tr = tr;
      this.plural = plural;
    } else {
      setTranslation(this, tr);
      this.plural = function() {
        return this;
      };
      this.attr("data-" + config.interpolation, JSON.stringify(interpolation));
    }
    return this;
  };

  $.fn.x18n = function() {
    $("[data-" + config.key + "]").each(function() {
      var $this, interpolation, key, n, tr;
      $this = $(this);
      key = $this.attr("data-" + config.key);
      interpolation = JSON.parse($this.attr("data-" + config.interpolation) || '[]');
      n = $this.attr("data-" + config.plural);
      tr = x18n.t.apply(x18n, [key].concat(__slice.call(interpolation)));
      if ($.isPlainObject(tr)) {
        tr = tr.plural(n);
      }
      return setTranslation($this, tr);
    });
    return this;
  };

  x18n.on(['lang:change', 'dict:change'], function() {
    return $('body').x18n();
  });

}).call(this);
