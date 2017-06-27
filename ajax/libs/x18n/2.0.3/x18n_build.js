// Copyright (c) 2012-2016 Florian Hartmann, https://github.com/florian/x18n
// Copyright (c) 2012-2016 Florian Hartmann, https://github.com/florian/observable
(function() {
  var Observable, isPlainObject, isType, toArray;

  isType = function(type, value) {
    return Object.prototype.toString.call(value).match(/\s(\w+)/)[1].toLowerCase() === type;
  };

  isPlainObject = function(value) {
    return !!value && isType('object', value);
  };

  toArray = function(value) {
    if (isType('array', value)) {
      return value;
    } else {
      return [value];
    }
  };

  Observable = (function() {
    function Observable() {
      this.__eventStore = {};
      this.__asyncEvents = true;
    }

    Observable.mixin = function(host) {
      var fn, key, ref, results;
      host.__eventStore = {};
      ref = Observable.prototype;
      results = [];
      for (key in ref) {
        fn = ref[key];
        results.push(host[key] = fn);
      }
      return results;
    };

    Observable.prototype.on = function(topics, fn, once) {
      var base, i, len, ref, topic;
      if (once == null) {
        once = false;
      }
      if (isPlainObject(topics)) {
        for (topic in topics) {
          fn = topics[topic];
          this.on(topic, fn);
        }
      } else {
        ref = toArray(topics);
        for (i = 0, len = ref.length; i < len; i++) {
          topic = ref[i];
          (base = this.__eventStore)[topic] || (base[topic] = []);
          this.__eventStore[topic].push({
            fn: fn,
            once: once
          });
        }
      }
      return this;
    };

    Observable.prototype.once = function(topics, fn) {
      if (fn) {
        return this.on(topics, fn, true);
      } else {
        return this.on(topics, true);
      }
    };

    Observable.prototype.off = function(topics, fn) {
      var i, j, len, len1, ref, ref1, topic;
      if (!fn) {
        ref = toArray(topics);
        for (i = 0, len = ref.length; i < len; i++) {
          topic = ref[i];
          this.__eventStore[topic] = [];
        }
      }
      if (isPlainObject(topics)) {
        for (topic in topics) {
          fn = topics[topic];
          this.off(topic, fn);
        }
      } else {
        ref1 = toArray(topics);
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          topic = ref1[j];
          this.__eventStore[topic] = (this.__eventStore[topic] || []).filter(function(subscriber) {
            return subscriber.fn !== fn;
          });
        }
      }
      return this;
    };

    Observable.prototype.trigger = function(topic, args) {
      var ref;
      args || (args = []);
      if ((ref = this.__eventStore[topic]) != null) {
        ref.forEach((function(_this) {
          return function(arg) {
            var fn, once;
            fn = arg.fn, once = arg.once;
            if (_this.__asyncEvents) {
              setTimeout((function() {
                return fn.apply(null, args);
              }), 1);
            } else {
              fn.apply(null, args);
            }
            if (once) {
              return _this.off(topic, fn);
            }
          };
        })(this));
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
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    slice = [].slice,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  base = function(Observable) {
    var X18n;
    X18n = (function(superClass) {
      extend(X18n, superClass);

      function X18n() {
        this.t = bind(this.t, this);
        X18n.__super__.constructor.call(this);
        this.dict = {};
        this.defaultlocal = 'en';
        this.chosenLocal = void 0;
        this.availableLocales = [];
        this.locales = [];
        this.missingTranslations = {};
        this.on('dict:change', (function(_this) {
          return function() {
            return _this.sortLocales();
          };
        })(this));
      }

      X18n.prototype.utils = {
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

      X18n.prototype.register = function(local, dict) {
        if (!(local in this.dict)) {
          this.dict[local] = {};
          this.availableLocales.push(local);
        }
        this.utils.merge(this.dict[local], dict);
        return this.trigger('dict:change', [local]);
      };

      X18n.prototype.set = function(local) {
        this.chosenLocal = local;
        return this.sortLocales();
      };

      X18n.prototype.setDefault = function(local) {
        this.defaultLocal = local;
        return this.sortLocales();
      };

      X18n.prototype.detectLocal = function() {
        return navigator.userLanguage || navigator.language;
      };

      X18n.prototype.similiarLocales = function(local) {
        local = String(local).slice(0, 2).toLowerCase();
        return this.utils.filter(this.availableLocales, function(l) {
          if (local === l) {
            return false;
          }
          return l.toLowerCase().indexOf(local) === 0;
        });
      };

      X18n.prototype.sortLocales = function() {
        var _locales, i, len, local, locales, oldLocales;
        oldLocales = this.locales.slice();
        _locales = [this.chosenLocal].concat(slice.call(this.similiarLocales(this.chosenLocal)), [this.detectLocal()], slice.call(this.similiarLocales(this.detectLocal())), [this.defaultLocal], slice.call(this.similiarLocales(this.defaultlocal)), ['en'], slice.call(this.similiarLocales('en')));
        locales = [];
        for (i = 0, len = _locales.length; i < len; i++) {
          local = _locales[i];
          if (indexOf.call(this.availableLocales, local) >= 0) {
            locales.push(local);
          }
        }
        locales.push.apply(locales, this.availableLocales);
        this.locales = this.utils.unique(locales);
        if (oldLocales.join(',') !== this.locales.join(',')) {
          return this.trigger('lang:change', [this.locales, oldLocales]);
        }
      };

      X18n.prototype.interpolate = function() {
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
        return str;
      };

      X18n.prototype.t = function() {
        var i, interpolation, key, len, local, ref, tr;
        key = arguments[0], interpolation = 2 <= arguments.length ? slice.call(arguments, 1) : [];
        tr = void 0;
        ref = this.locales;
        for (i = 0, len = ref.length; i < len; i++) {
          local = ref[i];
          tr = this.utils.getByDotNotation(this.dict[local], key);
          if (tr) {
            break;
          } else {
            if (!(local in this.missingTranslations)) {
              this.missingTranslations[local] = [];
            }
            this.missingTranslations[local].push(key);
            this.missingTranslations[local] = this.utils.unique(this.missingTranslations[local]);
            this.trigger('missing-translation', [local, key]);
          }
        }
        if (typeof tr === 'string') {
          tr = this.interpolate.apply(this, [tr].concat(slice.call(interpolation)));
        } else if (tr !== void 0) {
          tr.plural = (function(_this) {
            return function(n) {
              if (n in tr) {
                return tr[n];
              } else {
                return _this.interpolate(tr.n, n);
              }
            };
          })(this);
        }
        return tr;
      };

      return X18n;

    })(Observable);
    return new X18n();
  };

  if ((typeof module !== "undefined" && module !== null) && (module.exports != null)) {
    Observable = require('observable_js');
    module.exports = base(Observable);
  } else if (typeof define === 'function' && define.amd) {
    define('x18n', ['observable_js'], function(Observable) {
      return base(Observable);
    });
  } else {
    window.x18n = base(window.Observable);
  }

}).call(this);
