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
  var Observable, base,
    slice = [].slice,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

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
          var k, results, v;
          results = [];
          for (k in two) {
            v = two[k];
            if (typeof v === 'object' && typeof one[k] === 'object') {
              results.push(this.merge(one[k], v));
            } else {
              results.push(one[k] = v);
            }
          }
          return results;
        },
        filter: function(arr, fn) {
          var i, len, results, v;
          results = [];
          for (i = 0, len = arr.length; i < len; i++) {
            v = arr[i];
            if (fn(v)) {
              results.push(v);
            }
          }
          return results;
        },
        unique: function(arr) {
          var i, k, len, results, ret, v;
          ret = {};
          for (i = 0, len = arr.length; i < len; i++) {
            v = arr[i];
            ret[v] = v;
          }
          results = [];
          for (k in ret) {
            v = ret[k];
            results.push(v);
          }
          return results;
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
        var _locales, i, len, local, locales;
        _locales = [this.chosenLocal].concat(slice.call(this.similiarLocales(this.chosenLocal)), [this.detectLocal()], slice.call(this.similiarLocales(this.detectLocal)), [this.defaultlocal], [this.similiarLocales(this.defaultlocal)], ['en'], slice.call(this.similiarLocales('en')));
        locales = [];
        for (i = 0, len = _locales.length; i < len; i++) {
          local = _locales[i];
          if (indexOf.call(this.availableLocales, local) >= 0) {
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
        str = arguments[0], interpolation = 2 <= arguments.length ? slice.call(arguments, 1) : [];
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
        return ((typeof window !== "undefined" && window !== null ? window.execScript : void 0) || function(src) {
          return eval.call(typeof window !== "undefined" && window !== null, src);
        })(src);
      };

      oldT = typeof window !== "undefined" && window !== null ? window.t : void 0;

      x18n.t = function() {
        var i, interpolation, key, len, local, ref, tr;
        key = arguments[0], interpolation = 2 <= arguments.length ? slice.call(arguments, 1) : [];
        tr = void 0;
        ref = x18n.locales;
        for (i = 0, len = ref.length; i < len; i++) {
          local = ref[i];
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
          tr = x18n.interpolate.apply(x18n, [x18n.resolveBindings(tr)].concat(slice.call(interpolation)));
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
        if (typeof window !== "undefined" && window !== null) {
          window.t = oldT;
        }
        return x18n.t;
      };

      if (typeof window !== "undefined" && window !== null) {
        window.t = x18n.t;
      }

      x18n.on('dict:change', function() {
        return x18n.sortLocales();
      });

      return x18n;

    })();
  };

  if ((typeof module !== "undefined" && module !== null) && (module.exports != null)) {
    Observable = require('observable_js');
    module.exports = base(Observable);
  } else if (typeof define === 'function' && define.amd) {
    define('x18n', ['observable'], function(Observable) {
      return base(Observable);
    });
  } else {
    window.x18n = base(window.Observable);
  }

}).call(this);
