(function() {
  var Batman,
    __slice = [].slice;

  Batman = function() {
    var mixins;
    mixins = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return (function(func, args, ctor) {
      ctor.prototype = func.prototype;
      var child = new ctor, result = func.apply(child, args);
      return Object(result) === result ? result : child;
    })(Batman.Object, mixins, function(){});
  };

  Batman.version = '0.14.1';

  Batman.config = {
    pathToApp: '/',
    usePushState: true,
    pathToHTML: 'html',
    fetchRemoteHTML: true,
    cacheViews: false,
    minificationErrors: true,
    protectFromCSRF: false
  };

  (Batman.container = (function() {
    return this;
  })()).Batman = Batman;

  if (typeof define === 'function') {
    define('batman', [], function() {
      return Batman;
    });
  }

  Batman.exportHelpers = function(onto) {
    var k, _i, _len, _ref;
    _ref = ['mixin', 'extend', 'unmixin', 'redirect', 'typeOf', 'redirect', 'setImmediate', 'clearImmediate'];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      k = _ref[_i];
      onto["$" + k] = Batman[k];
    }
    return onto;
  };

  Batman.exportGlobals = function() {
    return Batman.exportHelpers(Batman.container);
  };

}).call(this);

(function() {
  var _Batman;

  Batman._Batman = _Batman = (function() {
    function _Batman(object) {
      this.object = object;
    }

    _Batman.prototype.check = function(object) {
      if (object !== this.object) {
        object._batman = new Batman._Batman(object);
        return false;
      }
      return true;
    };

    _Batman.prototype.get = function(key) {
      var reduction, results;
      results = this.getAll(key);
      switch (results.length) {
        case 0:
          return void 0;
        case 1:
          return results[0];
        default:
          reduction = results[0].concat != null ? function(a, b) {
            return a.concat(b);
          } : results[0].merge != null ? function(a, b) {
            return a.merge(b);
          } : results.every(function(x) {
            return typeof x === 'object';
          }) ? (results.unshift({}), function(a, b) {
            return Batman.extend(a, b);
          }) : void 0;
          if (reduction) {
            return results.reduceRight(reduction);
          } else {
            return results;
          }
      }
    };

    _Batman.prototype.getFirst = function(key) {
      var results;
      results = this.getAll(key);
      return results[0];
    };

    _Batman.prototype.getAll = function(keyOrGetter) {
      var getter, results, val;
      if (typeof keyOrGetter === 'function') {
        getter = keyOrGetter;
      } else {
        getter = function(ancestor) {
          var _ref;
          return (_ref = ancestor._batman) != null ? _ref[keyOrGetter] : void 0;
        };
      }
      results = this.ancestors(getter);
      if (val = getter(this.object)) {
        results.unshift(val);
      }
      return results;
    };

    _Batman.prototype.ancestors = function(getter) {
      var ancestor, results, val, _i, _len, _ref;
      this._allAncestors || (this._allAncestors = this.allAncestors());
      if (getter) {
        results = [];
        _ref = this._allAncestors;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          ancestor = _ref[_i];
          val = getter(ancestor);
          if (val != null) {
            results.push(val);
          }
        }
        return results;
      } else {
        return this._allAncestors;
      }
    };

    _Batman.prototype.allAncestors = function() {
      var isClass, parent, proto, results, _ref, _ref1;
      results = [];
      isClass = !!this.object.prototype;
      parent = isClass ? (_ref = this.object.__super__) != null ? _ref.constructor : void 0 : (proto = Object.getPrototypeOf(this.object)) === this.object ? this.object.constructor.__super__ : proto;
      if (parent != null) {
        if ((_ref1 = parent._batman) != null) {
          _ref1.check(parent);
        }
        results.push(parent);
        if (parent._batman != null) {
          results = results.concat(parent._batman.allAncestors());
        }
      }
      return results;
    };

    _Batman.prototype.set = function(key, value) {
      return this[key] = value;
    };

    return _Batman;

  })();

}).call(this);

(function() {
  var chr, _encodedChars, _encodedCharsPattern, _entityMap, _implementImmediates, _objectToString, _unsafeChars, _unsafeCharsPattern,
    __slice = [].slice,
    __hasProp = {}.hasOwnProperty,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Batman.typeOf = function(object) {
    if (typeof object === 'undefined') {
      return "Undefined";
    }
    return _objectToString.call(object).slice(8, -1);
  };

  _objectToString = Object.prototype.toString;

  Batman.extend = function() {
    var key, object, objects, to, value, _i, _len;
    to = arguments[0], objects = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    for (_i = 0, _len = objects.length; _i < _len; _i++) {
      object = objects[_i];
      for (key in object) {
        value = object[key];
        to[key] = value;
      }
    }
    return to;
  };

  Batman.mixin = function() {
    var hasSet, key, mixin, mixins, to, value, _i, _len;
    to = arguments[0], mixins = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    hasSet = typeof to.set === 'function';
    for (_i = 0, _len = mixins.length; _i < _len; _i++) {
      mixin = mixins[_i];
      if (Batman.typeOf(mixin) !== 'Object') {
        continue;
      }
      for (key in mixin) {
        if (!__hasProp.call(mixin, key)) continue;
        value = mixin[key];
        if (key === 'initialize' || key === 'uninitialize' || key === 'prototype') {
          continue;
        }
        if (hasSet) {
          to.set(key, value);
        } else if (to.nodeName != null) {
          Batman.data(to, key, value);
        } else {
          to[key] = value;
        }
      }
      if (typeof mixin.initialize === 'function') {
        mixin.initialize.call(to);
      }
    }
    return to;
  };

  Batman.unmixin = function() {
    var from, key, mixin, mixins, _i, _len;
    from = arguments[0], mixins = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    for (_i = 0, _len = mixins.length; _i < _len; _i++) {
      mixin = mixins[_i];
      for (key in mixin) {
        if (key === 'initialize' || key === 'uninitialize') {
          continue;
        }
        delete from[key];
      }
      if (typeof mixin.uninitialize === 'function') {
        mixin.uninitialize.call(from);
      }
    }
    return from;
  };

  Batman._functionName = Batman.functionName = function(f) {
    var _ref;
    if (f.__name__) {
      return f.__name__;
    }
    if (f.name) {
      return f.name;
    }
    return (_ref = f.toString().match(/\W*function\s+([\w\$]+)\(/)) != null ? _ref[1] : void 0;
  };

  Batman._isChildOf = Batman.isChildOf = function(parentNode, childNode) {
    var node;
    node = childNode.parentNode;
    while (node) {
      if (node === parentNode) {
        return true;
      }
      node = node.parentNode;
    }
    return false;
  };

  _implementImmediates = function(container) {
    var canUsePostMessage, count, functions, getHandle, handler, prefix, tasks;
    canUsePostMessage = function() {
      var async, oldMessage;
      if (!container.postMessage) {
        return false;
      }
      async = true;
      oldMessage = container.onmessage;
      container.onmessage = function() {
        return async = false;
      };
      container.postMessage("", "*");
      container.onmessage = oldMessage;
      return async;
    };
    tasks = new Batman.SimpleHash;
    count = 0;
    getHandle = function() {
      return "go" + (++count);
    };
    if (container.setImmediate && container.clearImmediate) {
      Batman.setImmediate = function() {
        return container.setImmediate.apply(container, arguments);
      };
      return Batman.clearImmediate = function() {
        return container.clearImmediate.apply(container, arguments);
      };
    } else if (canUsePostMessage()) {
      prefix = 'com.batman.';
      handler = function(e) {
        var handle, _base;
        if (typeof e.data !== 'string' || !~e.data.search(prefix)) {
          return;
        }
        handle = e.data.substring(prefix.length);
        return typeof (_base = tasks.unset(handle)) === "function" ? _base() : void 0;
      };
      if (container.addEventListener) {
        container.addEventListener('message', handler, false);
      } else {
        container.attachEvent('onmessage', handler);
      }
      Batman.setImmediate = function(f) {
        var handle;
        tasks.set(handle = getHandle(), f);
        container.postMessage(prefix + handle, "*");
        return handle;
      };
      return Batman.clearImmediate = function(handle) {
        return tasks.unset(handle);
      };
    } else if (typeof document !== 'undefined' && __indexOf.call(document.createElement("script"), "onreadystatechange") >= 0) {
      Batman.setImmediate = function(f) {
        var handle, script;
        handle = getHandle();
        script = document.createElement("script");
        script.onreadystatechange = function() {
          var _base;
          if (typeof (_base = tasks.get(handle)) === "function") {
            _base();
          }
          script.onreadystatechange = null;
          script.parentNode.removeChild(script);
          return script = null;
        };
        document.documentElement.appendChild(script);
        return handle;
      };
      return Batman.clearImmediate = function(handle) {
        return tasks.unset(handle);
      };
    } else if (typeof process !== "undefined" && process !== null ? process.nextTick : void 0) {
      functions = {};
      Batman.setImmediate = function(f) {
        var handle;
        handle = getHandle();
        functions[handle] = f;
        process.nextTick(function() {
          if (typeof functions[handle] === "function") {
            functions[handle]();
          }
          return delete functions[handle];
        });
        return handle;
      };
      return Batman.clearImmediate = function(handle) {
        return delete functions[handle];
      };
    } else {
      Batman.setImmediate = function(f) {
        return setTimeout(f, 0);
      };
      return Batman.clearImmediate = function(handle) {
        return clearTimeout(handle);
      };
    }
  };

  Batman.setImmediate = function() {
    _implementImmediates(Batman.container);
    return Batman.setImmediate.apply(this, arguments);
  };

  Batman.clearImmediate = function() {
    _implementImmediates(Batman.container);
    return Batman.clearImmediate.apply(this, arguments);
  };

  Batman.forEach = function(container, iterator, ctx) {
    var e, i, k, v, _i, _len;
    if (container.forEach) {
      container.forEach(iterator, ctx);
    } else if (container.indexOf) {
      for (i = _i = 0, _len = container.length; _i < _len; i = ++_i) {
        e = container[i];
        iterator.call(ctx, e, i, container);
      }
    } else {
      for (k in container) {
        v = container[k];
        iterator.call(ctx, k, v, container);
      }
    }
  };

  Batman.objectHasKey = function(object, key) {
    if (typeof object.hasKey === 'function') {
      return object.hasKey(key);
    } else {
      return key in object;
    }
  };

  Batman.contains = function(container, item) {
    if (container.indexOf) {
      return __indexOf.call(container, item) >= 0;
    } else if (typeof container.has === 'function') {
      return container.has(item);
    } else {
      return Batman.objectHasKey(container, item);
    }
  };

  Batman.get = function(base, key) {
    if (typeof base.get === 'function') {
      return base.get(key);
    } else {
      return Batman.Property.forBaseAndKey(base, key).getValue();
    }
  };

  Batman.getPath = function(base, segments) {
    var segment, _i, _len;
    for (_i = 0, _len = segments.length; _i < _len; _i++) {
      segment = segments[_i];
      if (base != null) {
        base = Batman.get(base, segment);
        if (base == null) {
          return base;
        }
      } else {
        return;
      }
    }
    return base;
  };

  _entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&#34;",
    "'": "&#39;"
  };

  _unsafeChars = [];

  _encodedChars = [];

  for (chr in _entityMap) {
    _unsafeChars.push(chr);
    _encodedChars.push(_entityMap[chr]);
  }

  _unsafeCharsPattern = new RegExp("[" + (_unsafeChars.join('')) + "]", "g");

  _encodedCharsPattern = new RegExp("(" + (_encodedChars.join('|')) + ")", "g");

  Batman.escapeHTML = (function() {
    return function(s) {
      return ("" + s).replace(_unsafeCharsPattern, function(c) {
        return _entityMap[c];
      });
    };
  })();

  Batman.unescapeHTML = (function() {
    return function(s) {
      var node;
      if (s == null) {
        return;
      }
      node = Batman._unescapeHTMLNode || (Batman._unescapeHTMLNode = document.createElement('DIV'));
      node.innerHTML = s;
      return Batman.DOM.textContent(node);
    };
  })();

  Batman.translate = function(x, values) {
    if (values == null) {
      values = {};
    }
    return Batman.helpers.interpolate(Batman.get(Batman.translate.messages, x), values);
  };

  Batman.translate.messages = {};

  Batman.t = function() {
    return Batman.translate.apply(Batman, arguments);
  };

  Batman.redirect = function(url, replaceState) {
    var _ref;
    if (replaceState == null) {
      replaceState = false;
    }
    return (_ref = Batman.navigator) != null ? _ref.redirect(url, replaceState) : void 0;
  };

  Batman.initializeObject = function(object) {
    if (object._batman != null) {
      return object._batman.check(object);
    } else {
      return object._batman = new Batman._Batman(object);
    }
  };

}).call(this);

(function() {
  var __slice = [].slice,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Batman.Inflector = (function() {
    Inflector.prototype.plural = function(regex, replacement) {
      return this._plural.unshift([regex, replacement]);
    };

    Inflector.prototype.singular = function(regex, replacement) {
      return this._singular.unshift([regex, replacement]);
    };

    Inflector.prototype.human = function(regex, replacement) {
      return this._human.unshift([regex, replacement]);
    };

    Inflector.prototype.uncountable = function() {
      var strings;
      strings = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return this._uncountable = this._uncountable.concat(strings.map(function(x) {
        return new RegExp("" + x + "$", 'i');
      }));
    };

    Inflector.prototype.irregular = function(singular, plural) {
      if (singular.charAt(0) === plural.charAt(0)) {
        this.plural(new RegExp("(" + (singular.charAt(0)) + ")" + (singular.slice(1)) + "$", "i"), "$1" + plural.slice(1));
        this.plural(new RegExp("(" + (singular.charAt(0)) + ")" + (plural.slice(1)) + "$", "i"), "$1" + plural.slice(1));
        return this.singular(new RegExp("(" + (plural.charAt(0)) + ")" + (plural.slice(1)) + "$", "i"), "$1" + singular.slice(1));
      } else {
        this.plural(new RegExp("" + singular + "$", 'i'), plural);
        this.plural(new RegExp("" + plural + "$", 'i'), plural);
        return this.singular(new RegExp("" + plural + "$", 'i'), singular);
      }
    };

    function Inflector() {
      this._plural = [];
      this._singular = [];
      this._uncountable = [];
      this._human = [];
    }

    Inflector.prototype.ordinalize = function(number, radix) {
      var absNumber, _ref;
      if (radix == null) {
        radix = 10;
      }
      number = parseInt(number, radix);
      absNumber = Math.abs(number);
      if (_ref = absNumber % 100, __indexOf.call([11, 12, 13], _ref) >= 0) {
        return number + "th";
      } else {
        switch (absNumber % 10) {
          case 1:
            return number + "st";
          case 2:
            return number + "nd";
          case 3:
            return number + "rd";
          default:
            return number + "th";
        }
      }
    };

    Inflector.prototype.pluralize = function(word) {
      var regex, replace_string, uncountableRegex, _i, _j, _len, _len1, _ref, _ref1, _ref2;
      _ref = this._uncountable;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        uncountableRegex = _ref[_i];
        if (uncountableRegex.test(word)) {
          return word;
        }
      }
      _ref1 = this._plural;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        _ref2 = _ref1[_j], regex = _ref2[0], replace_string = _ref2[1];
        if (regex.test(word)) {
          return word.replace(regex, replace_string);
        }
      }
      return word;
    };

    Inflector.prototype.singularize = function(word) {
      var regex, replace_string, uncountableRegex, _i, _j, _len, _len1, _ref, _ref1, _ref2;
      _ref = this._uncountable;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        uncountableRegex = _ref[_i];
        if (uncountableRegex.test(word)) {
          return word;
        }
      }
      _ref1 = this._singular;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        _ref2 = _ref1[_j], regex = _ref2[0], replace_string = _ref2[1];
        if (regex.test(word)) {
          return word.replace(regex, replace_string);
        }
      }
      return word;
    };

    Inflector.prototype.humanize = function(word) {
      var regex, replace_string, _i, _len, _ref, _ref1;
      _ref = this._human;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        _ref1 = _ref[_i], regex = _ref1[0], replace_string = _ref1[1];
        if (regex.test(word)) {
          return word.replace(regex, replace_string);
        }
      }
      return word;
    };

    return Inflector;

  })();

}).call(this);

(function() {
  var Inflector, camelize_rx, capitalize_rx, humanize_rx1, humanize_rx2, humanize_rx3, underscore_rx1, underscore_rx2;

  camelize_rx = /(?:^|_|\-)(.)/g;

  capitalize_rx = /(^|\s)([a-z])/g;

  underscore_rx1 = /([A-Z]+)([A-Z][a-z])/g;

  underscore_rx2 = /([a-z\d])([A-Z])/g;

  humanize_rx1 = /_id$/;

  humanize_rx2 = /_|-/g;

  humanize_rx3 = /^\w/g;

  Batman.helpers = {
    ordinalize: function() {
      return Batman.helpers.inflector.ordinalize.apply(Batman.helpers.inflector, arguments);
    },
    singularize: function() {
      return Batman.helpers.inflector.singularize.apply(Batman.helpers.inflector, arguments);
    },
    pluralize: function(count, singular, plural, includeCount) {
      var result;
      if (includeCount == null) {
        includeCount = true;
      }
      if (arguments.length < 2) {
        return Batman.helpers.inflector.pluralize(count);
      } else {
        result = +count === 1 ? singular : plural || Batman.helpers.inflector.pluralize(singular);
        if (includeCount) {
          result = ("" + (count || 0) + " ") + result;
        }
        return result;
      }
    },
    camelize: function(string, firstLetterLower) {
      string = string.replace(camelize_rx, function(str, p1) {
        return p1.toUpperCase();
      });
      if (firstLetterLower) {
        return string.substr(0, 1).toLowerCase() + string.substr(1);
      } else {
        return string;
      }
    },
    underscore: function(string) {
      return string.replace(underscore_rx1, '$1_$2').replace(underscore_rx2, '$1_$2').replace('-', '_').toLowerCase();
    },
    capitalize: function(string) {
      return string.replace(capitalize_rx, function(m, p1, p2) {
        return p1 + p2.toUpperCase();
      });
    },
    trim: function(string) {
      if (string) {
        return string.trim();
      } else {
        return "";
      }
    },
    interpolate: function(stringOrObject, keys) {
      var key, string, value;
      if (typeof stringOrObject === 'object') {
        string = stringOrObject[keys.count];
        if (!string) {
          string = stringOrObject['other'];
        }
      } else {
        string = stringOrObject;
      }
      for (key in keys) {
        value = keys[key];
        string = string.replace(new RegExp("%\\{" + key + "\\}", "g"), value);
      }
      return string;
    },
    humanize: function(string) {
      string = Batman.helpers.underscore(string);
      string = Batman.helpers.inflector.humanize(string);
      return string.replace(humanize_rx1, '').replace(humanize_rx2, ' ').replace(humanize_rx3, function(match) {
        return match.toUpperCase();
      });
    }
  };

  Inflector = new Batman.Inflector;

  Batman.helpers.inflector = Inflector;

  Inflector.plural(/$/, 's');

  Inflector.plural(/s$/i, 's');

  Inflector.plural(/(ax|test)is$/i, '$1es');

  Inflector.plural(/(octop|vir)us$/i, '$1i');

  Inflector.plural(/(octop|vir)i$/i, '$1i');

  Inflector.plural(/(alias|status)$/i, '$1es');

  Inflector.plural(/(bu)s$/i, '$1ses');

  Inflector.plural(/(buffal|tomat)o$/i, '$1oes');

  Inflector.plural(/([ti])um$/i, '$1a');

  Inflector.plural(/([ti])a$/i, '$1a');

  Inflector.plural(/sis$/i, 'ses');

  Inflector.plural(/(?:([^f])fe|([lr])f)$/i, '$1$2ves');

  Inflector.plural(/(hive)$/i, '$1s');

  Inflector.plural(/([^aeiouy]|qu)y$/i, '$1ies');

  Inflector.plural(/(x|ch|ss|sh)$/i, '$1es');

  Inflector.plural(/(matr|vert|ind)(?:ix|ex)$/i, '$1ices');

  Inflector.plural(/([m|l])ouse$/i, '$1ice');

  Inflector.plural(/([m|l])ice$/i, '$1ice');

  Inflector.plural(/^(ox)$/i, '$1en');

  Inflector.plural(/^(oxen)$/i, '$1');

  Inflector.plural(/(quiz)$/i, '$1zes');

  Inflector.singular(/s$/i, '');

  Inflector.singular(/(n)ews$/i, '$1ews');

  Inflector.singular(/([ti])a$/i, '$1um');

  Inflector.singular(/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$/i, '$1$2sis');

  Inflector.singular(/(^analy)ses$/i, '$1sis');

  Inflector.singular(/([^f])ves$/i, '$1fe');

  Inflector.singular(/(hive)s$/i, '$1');

  Inflector.singular(/(tive)s$/i, '$1');

  Inflector.singular(/([lr])ves$/i, '$1f');

  Inflector.singular(/([^aeiouy]|qu)ies$/i, '$1y');

  Inflector.singular(/(s)eries$/i, '$1eries');

  Inflector.singular(/(m)ovies$/i, '$1ovie');

  Inflector.singular(/(x|ch|ss|sh)es$/i, '$1');

  Inflector.singular(/([m|l])ice$/i, '$1ouse');

  Inflector.singular(/(bus)es$/i, '$1');

  Inflector.singular(/(o)es$/i, '$1');

  Inflector.singular(/(shoe)s$/i, '$1');

  Inflector.singular(/(cris|ax|test)es$/i, '$1is');

  Inflector.singular(/(octop|vir)i$/i, '$1us');

  Inflector.singular(/(alias|status)es$/i, '$1');

  Inflector.singular(/^(ox)en/i, '$1');

  Inflector.singular(/(vert|ind)ices$/i, '$1ex');

  Inflector.singular(/(matr)ices$/i, '$1ix');

  Inflector.singular(/(quiz)zes$/i, '$1');

  Inflector.singular(/(database)s$/i, '$1');

  Inflector.irregular('person', 'people');

  Inflector.irregular('man', 'men');

  Inflector.irregular('child', 'children');

  Inflector.irregular('sex', 'sexes');

  Inflector.irregular('move', 'moves');

  Inflector.irregular('cow', 'kine');

  Inflector.irregular('zombie', 'zombies');

  Inflector.uncountable('equipment', 'information', 'rice', 'money', 'species', 'series', 'fish', 'sheep', 'jeans');

}).call(this);

(function() {
  var developer;

  Batman.developer = {
    suppressed: false,
    DevelopmentError: (function() {
      var DevelopmentError;
      DevelopmentError = function(message) {
        this.message = message;
        return this.name = "DevelopmentError";
      };
      DevelopmentError.prototype = Error.prototype;
      return DevelopmentError;
    })(),
    _ie_console: function(f, args) {
      var arg, _i, _len, _results;
      if (args.length !== 1) {
        if (typeof console !== "undefined" && console !== null) {
          console[f]("..." + f + " of " + args.length + " items...");
        }
      }
      _results = [];
      for (_i = 0, _len = args.length; _i < _len; _i++) {
        arg = args[_i];
        _results.push(typeof console !== "undefined" && console !== null ? console[f](arg) : void 0);
      }
      return _results;
    },
    suppress: function(f) {
      developer.suppressed = true;
      if (f) {
        f();
        return developer.suppressed = false;
      }
    },
    unsuppress: function() {
      return developer.suppressed = false;
    },
    log: function() {
      if (developer.suppressed || !((typeof console !== "undefined" && console !== null ? console.log : void 0) != null)) {
        return;
      }
      if (console.log.apply) {
        return console.log.apply(console, arguments);
      } else {
        return developer._ie_console("log", arguments);
      }
    },
    warn: function() {
      if (developer.suppressed || !((typeof console !== "undefined" && console !== null ? console.warn : void 0) != null)) {
        return;
      }
      if (console.warn.apply) {
        return console.warn.apply(console, arguments);
      } else {
        return developer._ie_console("warn", arguments);
      }
    },
    error: function(message) {
      throw new developer.DevelopmentError(message);
    },
    assert: function(result, message) {
      if (!result) {
        return developer.error(message);
      }
    },
    "do": function(f) {
      if (!developer.suppressed) {
        return f();
      }
    },
    addFilters: function() {
      return Batman.extend(Batman.Filters, {
        log: function(value, key) {
          if (typeof console !== "undefined" && console !== null) {
            if (typeof console.log === "function") {
              console.log(arguments);
            }
          }
          return value;
        },
        logStack: function(value) {
          if (typeof console !== "undefined" && console !== null) {
            if (typeof console.log === "function") {
              console.log(developer.currentFilterStack);
            }
          }
          return value;
        }
      });
    },
    deprecated: function(deprecatedName, upgradeString) {
      return Batman.developer.warn("" + deprecatedName + " has been deprecated.", upgradeString || '');
    }
  };

  developer = Batman.developer;

  Batman.developer.assert((function() {}).bind, "Error! Batman needs Function.bind to work! Please shim it using something like es5-shim or augmentjs!");

}).call(this);

(function() {
  Batman.Event = (function() {
    Event.forBaseAndKey = function(base, key) {
      if (base.isEventEmitter) {
        return base.event(key);
      } else {
        return new Batman.Event(base, key);
      }
    };

    function Event(base, key) {
      this.base = base;
      this.key = key;
      this._preventCount = 0;
    }

    Event.prototype.isEvent = true;

    Event.prototype.isEqual = function(other) {
      return this.constructor === other.constructor && this.base === other.base && this.key === other.key;
    };

    Event.prototype.hashKey = function() {
      var key;
      this.hashKey = function() {
        return key;
      };
      return key = "<Batman.Event base: " + (Batman.Hash.prototype.hashKeyFor(this.base)) + ", key: \"" + (Batman.Hash.prototype.hashKeyFor(this.key)) + "\">";
    };

    Event.prototype.addHandler = function(handler) {
      this.handlers || (this.handlers = []);
      if (this.handlers.indexOf(handler) === -1) {
        this.handlers.push(handler);
      }
      if (this.oneShot) {
        this.autofireHandler(handler);
      }
      return this;
    };

    Event.prototype.removeHandler = function(handler) {
      var index;
      if (this.handlers && (index = this.handlers.indexOf(handler)) !== -1) {
        this.handlers.splice(index, 1);
      }
      return this;
    };

    Event.prototype.eachHandler = function(iterator) {
      var ancestor, key, _i, _len, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7;
      if ((_ref = this.handlers) != null) {
        _ref.slice().forEach(iterator);
      }
      if ((_ref1 = this.base) != null ? _ref1.isEventEmitter : void 0) {
        key = this.key;
        _ref3 = (_ref2 = this.base._batman) != null ? _ref2.ancestors() : void 0;
        for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
          ancestor = _ref3[_i];
          if (ancestor.isEventEmitter && ((_ref4 = ancestor._batman) != null ? (_ref5 = _ref4.events) != null ? _ref5.hasOwnProperty(key) : void 0 : void 0)) {
            if ((_ref6 = ancestor.event(key, false)) != null) {
              if ((_ref7 = _ref6.handlers) != null) {
                _ref7.slice().forEach(iterator);
              }
            }
          }
        }
      }
    };

    Event.prototype.clearHandlers = function() {
      return this.handlers = void 0;
    };

    Event.prototype.handlerContext = function() {
      return this.base;
    };

    Event.prototype.prevent = function() {
      return ++this._preventCount;
    };

    Event.prototype.allow = function() {
      if (this._preventCount) {
        --this._preventCount;
      }
      return this._preventCount;
    };

    Event.prototype.isPrevented = function() {
      return this._preventCount > 0;
    };

    Event.prototype.autofireHandler = function(handler) {
      if (this._oneShotFired && (this._oneShotArgs != null)) {
        return handler.apply(this.handlerContext(), this._oneShotArgs);
      }
    };

    Event.prototype.resetOneShot = function() {
      this._oneShotFired = false;
      return this._oneShotArgs = null;
    };

    Event.prototype.fire = function() {
      return this.fireWithContext(this.handlerContext(), arguments);
    };

    Event.prototype.fireWithContext = function(context, args) {
      if (this.isPrevented() || this._oneShotFired) {
        return false;
      }
      if (this.oneShot) {
        this._oneShotFired = true;
        this._oneShotArgs = args;
      }
      return this.eachHandler(function(handler) {
        return handler.apply(context, args);
      });
    };

    Event.prototype.allowAndFire = function() {
      return this.allowAndFireWithContext(this.handlerContext, arguments);
    };

    Event.prototype.allowAndFireWithContext = function(context, args) {
      this.allow();
      return this.fireWithContext(context, args);
    };

    return Event;

  })();

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.PropertyEvent = (function(_super) {
    __extends(PropertyEvent, _super);

    function PropertyEvent() {
      _ref = PropertyEvent.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    PropertyEvent.prototype.eachHandler = function(iterator) {
      return this.eachObserver(iterator);
    };

    PropertyEvent.prototype.handlerContext = function() {
      return this.base;
    };

    return PropertyEvent;

  })(Batman.Event);

}).call(this);

(function() {
  var __slice = [].slice;

  Batman.EventEmitter = {
    isEventEmitter: true,
    hasEvent: function(key) {
      var _ref, _ref1;
      return (_ref = this._batman) != null ? typeof _ref.get === "function" ? (_ref1 = _ref.get('events')) != null ? _ref1.hasOwnProperty(key) : void 0 : void 0 : void 0;
    },
    event: function(key, createEvent) {
      var ancestor, eventClass, events, existingEvent, newEvent, _base, _i, _len, _ref, _ref1, _ref2, _ref3;
      if (createEvent == null) {
        createEvent = true;
      }
      Batman.initializeObject(this);
      eventClass = this.eventClass || Batman.Event;
      if ((_ref = this._batman.events) != null ? _ref.hasOwnProperty(key) : void 0) {
        return existingEvent = this._batman.events[key];
      } else {
        _ref1 = this._batman.ancestors();
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          ancestor = _ref1[_i];
          existingEvent = (_ref2 = ancestor._batman) != null ? (_ref3 = _ref2.events) != null ? _ref3[key] : void 0 : void 0;
          if (existingEvent) {
            break;
          }
        }
        if (createEvent || (existingEvent != null ? existingEvent.oneShot : void 0)) {
          events = (_base = this._batman).events || (_base.events = {});
          newEvent = events[key] = new eventClass(this, key);
          newEvent.oneShot = existingEvent != null ? existingEvent.oneShot : void 0;
          return newEvent;
        } else {
          return existingEvent;
        }
      }
    },
    on: function() {
      var handler, key, keys, _i, _j, _len;
      keys = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), handler = arguments[_i++];
      for (_j = 0, _len = keys.length; _j < _len; _j++) {
        key = keys[_j];
        this.event(key).addHandler(handler);
      }
      return true;
    },
    off: function() {
      var handler, key, keys, _i, _j, _len;
      keys = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), handler = arguments[_i++];
      if (!keys.length) {
        key = handler;
        this.event(key).clearHandlers();
      }
      for (_j = 0, _len = keys.length; _j < _len; _j++) {
        key = keys[_j];
        this.event(key).removeHandler(handler);
      }
      return true;
    },
    once: function(key, handler) {
      var event, handlerWrapper;
      event = this.event(key);
      handlerWrapper = function() {
        handler.apply(this, arguments);
        return event.removeHandler(handlerWrapper);
      };
      return event.addHandler(handlerWrapper);
    },
    registerAsMutableSource: function() {
      return Batman.Property.registerSource(this);
    },
    mutate: function(wrappedFunction) {
      var result;
      this.prevent('change');
      result = wrappedFunction.call(this);
      this.allowAndFire('change', this, this);
      return result;
    },
    mutation: function(wrappedFunction) {
      return function() {
        var result, _ref;
        result = wrappedFunction.apply(this, arguments);
        if ((_ref = this.event('change', false)) != null) {
          _ref.fire(this, this);
        }
        return result;
      };
    },
    prevent: function(key) {
      this.event(key).prevent();
      return this;
    },
    allow: function(key) {
      this.event(key).allow();
      return this;
    },
    fire: function() {
      var args, key, _ref;
      key = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      return (_ref = this.event(key, false)) != null ? _ref.fireWithContext(this, args) : void 0;
    },
    allowAndFire: function() {
      var args, key, _ref;
      key = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      return (_ref = this.event(key, false)) != null ? _ref.allowAndFireWithContext(this, args) : void 0;
    },
    isPrevented: function(key) {
      var _ref;
      return (_ref = this.event(key, false)) != null ? _ref.isPrevented() : void 0;
    }
  };

}).call(this);

(function() {
  var fire,
    __slice = [].slice;

  Batman.LifecycleEvents = {
    initialize: function() {
      return this.prototype.fireLifecycleEvent = fire;
    },
    lifecycleEvent: function(eventName, normalizeFunction) {
      var addCallback, afterName, beforeName;
      beforeName = "before" + (Batman.helpers.camelize(eventName));
      afterName = "after" + (Batman.helpers.camelize(eventName));
      addCallback = function(lifecycleEventName) {
        return function(callbackName, options) {
          var callback, handlers, target, _base, _ref;
          if (Batman.typeOf(callbackName) === 'Object') {
            _ref = [options, callbackName], callbackName = _ref[0], options = _ref[1];
          }
          if (Batman.typeOf(callbackName) === 'String') {
            callback = function() {
              return this[callbackName].apply(this, arguments);
            };
          } else {
            callback = callbackName;
          }
          options = (typeof normalizeFunction === "function" ? normalizeFunction(options) : void 0) || options;
          target = this.prototype || this;
          Batman.initializeObject(target);
          handlers = (_base = target._batman)[lifecycleEventName] || (_base[lifecycleEventName] = []);
          return handlers.push({
            options: options,
            callback: callback
          });
        };
      };
      this[beforeName] = addCallback(beforeName);
      this.prototype[beforeName] = addCallback(beforeName);
      this[afterName] = addCallback(afterName);
      return this.prototype[afterName] = addCallback(afterName);
    }
  };

  fire = function() {
    var args, callback, handlers, lifecycleEventName, options, _i, _len, _ref;
    lifecycleEventName = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    if (!(handlers = this._batman.get(lifecycleEventName))) {
      return;
    }
    for (_i = 0, _len = handlers.length; _i < _len; _i++) {
      _ref = handlers[_i], options = _ref.options, callback = _ref.callback;
      if ((options != null ? options["if"] : void 0) && !options["if"].apply(this, args)) {
        continue;
      }
      if ((options != null ? options.unless : void 0) && options.unless.apply(this, args)) {
        continue;
      }
      if (callback.apply(this, args) === false) {
        return false;
      }
    }
  };

}).call(this);

(function() {
  Batman.Enumerable = {
    isEnumerable: true,
    map: function(f, ctx) {
      var result;
      if (ctx == null) {
        ctx = Batman.container;
      }
      result = [];
      this.forEach(function() {
        return result.push(f.apply(ctx, arguments));
      });
      return result;
    },
    mapToProperty: function(key) {
      var result;
      result = [];
      this.forEach(function(item) {
        return result.push(Batman.get(item, key));
      });
      return result;
    },
    every: function(f, ctx) {
      var result;
      if (ctx == null) {
        ctx = Batman.container;
      }
      result = true;
      this.forEach(function() {
        return result = result && f.apply(ctx, arguments);
      });
      return result;
    },
    some: function(f, ctx) {
      var result;
      if (ctx == null) {
        ctx = Batman.container;
      }
      result = false;
      this.forEach(function() {
        return result = result || f.apply(ctx, arguments);
      });
      return result;
    },
    reduce: function(f, accumulator) {
      var index, initialValuePassed,
        _this = this;
      index = 0;
      initialValuePassed = accumulator != null;
      this.forEach(function(element, value) {
        if (!initialValuePassed) {
          accumulator = element;
          initialValuePassed = true;
          return;
        }
        accumulator = f(accumulator, element, value, index, self);
        return index++;
      });
      return accumulator;
    },
    filter: function(f) {
      var result, wrap,
        _this = this;
      result = new this.constructor;
      if (result.add) {
        wrap = function(result, element, value) {
          if (f(element, value, _this)) {
            result.add(element);
          }
          return result;
        };
      } else if (result.set) {
        wrap = function(result, element, value) {
          if (f(element, value, _this)) {
            result.set(element, value);
          }
          return result;
        };
      } else {
        if (!result.push) {
          result = [];
        }
        wrap = function(result, element, value) {
          if (f(element, value, _this)) {
            result.push(element);
          }
          return result;
        };
      }
      return this.reduce(wrap, result);
    },
    count: function(f, ctx) {
      var count,
        _this = this;
      if (ctx == null) {
        ctx = Batman.container;
      }
      if (!f) {
        return this.length;
      }
      count = 0;
      this.forEach(function(element, value) {
        if (f.call(ctx, element, value, _this)) {
          return count++;
        }
      });
      return count;
    },
    inGroupsOf: function(groupSize) {
      var current, i, result;
      result = [];
      current = false;
      i = 0;
      this.forEach(function(element) {
        if (i++ % groupSize === 0) {
          current = [];
          result.push(current);
        }
        return current.push(element);
      });
      return result;
    }
  };

}).call(this);

(function() {
  var _objectToString,
    __slice = [].slice;

  _objectToString = Object.prototype.toString;

  Batman.SimpleHash = (function() {
    function SimpleHash(obj) {
      this._storage = {};
      this.length = 0;
      if (obj != null) {
        this.update(obj);
      }
    }

    Batman.extend(SimpleHash.prototype, Batman.Enumerable);

    SimpleHash.prototype.hasKey = function(key) {
      var pair, pairs, _i, _len;
      if (this.objectKey(key)) {
        if (!this._objectStorage) {
          return false;
        }
        if (pairs = this._objectStorage[this.hashKeyFor(key)]) {
          for (_i = 0, _len = pairs.length; _i < _len; _i++) {
            pair = pairs[_i];
            if (this.equality(pair[0], key)) {
              return true;
            }
          }
        }
        return false;
      } else {
        key = this.prefixedKey(key);
        return this._storage.hasOwnProperty(key);
      }
    };

    SimpleHash.prototype.getObject = function(key) {
      var pair, pairs, _i, _len;
      if (!this._objectStorage) {
        return;
      }
      if (pairs = this._objectStorage[this.hashKeyFor(key)]) {
        for (_i = 0, _len = pairs.length; _i < _len; _i++) {
          pair = pairs[_i];
          if (this.equality(pair[0], key)) {
            return pair[1];
          }
        }
      }
    };

    SimpleHash.prototype.getString = function(key) {
      return this._storage["_" + key];
    };

    SimpleHash.prototype.setObject = function(key, val) {
      var pair, pairs, _base, _i, _len, _name;
      this._objectStorage || (this._objectStorage = {});
      pairs = (_base = this._objectStorage)[_name = this.hashKeyFor(key)] || (_base[_name] = []);
      for (_i = 0, _len = pairs.length; _i < _len; _i++) {
        pair = pairs[_i];
        if (this.equality(pair[0], key)) {
          return pair[1] = val;
        }
      }
      this.length++;
      pairs.push([key, val]);
      return val;
    };

    SimpleHash.prototype.setString = function(key, val) {
      key = "_" + key;
      if (this._storage[key] == null) {
        this.length++;
      }
      return this._storage[key] = val;
    };

    SimpleHash.prototype.get = function(key) {
      var pair, pairs, _i, _len;
      if (this.objectKey(key)) {
        if (!this._objectStorage) {
          return;
        }
        if (pairs = this._objectStorage[this.hashKeyFor(key)]) {
          for (_i = 0, _len = pairs.length; _i < _len; _i++) {
            pair = pairs[_i];
            if (this.equality(pair[0], key)) {
              return pair[1];
            }
          }
        }
      } else {
        return this._storage[this.prefixedKey(key)];
      }
    };

    SimpleHash.prototype.set = function(key, val) {
      var pair, pairs, _base, _i, _len, _name;
      if (this.objectKey(key)) {
        this._objectStorage || (this._objectStorage = {});
        pairs = (_base = this._objectStorage)[_name = this.hashKeyFor(key)] || (_base[_name] = []);
        for (_i = 0, _len = pairs.length; _i < _len; _i++) {
          pair = pairs[_i];
          if (this.equality(pair[0], key)) {
            return pair[1] = val;
          }
        }
        this.length++;
        pairs.push([key, val]);
        return val;
      } else {
        key = this.prefixedKey(key);
        if (this._storage[key] == null) {
          this.length++;
        }
        return this._storage[key] = val;
      }
    };

    SimpleHash.prototype.unset = function(key) {
      var hashKey, index, obj, pair, pairs, val, value, _i, _len, _ref;
      if (this.objectKey(key)) {
        if (!this._objectStorage) {
          return;
        }
        hashKey = this.hashKeyFor(key);
        if (pairs = this._objectStorage[hashKey]) {
          for (index = _i = 0, _len = pairs.length; _i < _len; index = ++_i) {
            _ref = pairs[index], obj = _ref[0], value = _ref[1];
            if (this.equality(obj, key)) {
              pair = pairs.splice(index, 1);
              if (!pairs.length) {
                delete this._objectStorage[hashKey];
              }
              this.length--;
              return pair[0][1];
            }
          }
        }
      } else {
        key = this.prefixedKey(key);
        val = this._storage[key];
        if (this._storage[key] != null) {
          this.length--;
          delete this._storage[key];
        }
        return val;
      }
    };

    SimpleHash.prototype.getOrSet = function(key, valueFunction) {
      var currentValue;
      currentValue = this.get(key);
      if (!currentValue) {
        currentValue = valueFunction();
        this.set(key, currentValue);
      }
      return currentValue;
    };

    SimpleHash.prototype.prefixedKey = function(key) {
      return "_" + key;
    };

    SimpleHash.prototype.unprefixedKey = function(key) {
      return key.slice(1);
    };

    SimpleHash.prototype.hashKeyFor = function(obj) {
      var hashKey, typeString;
      if (hashKey = obj != null ? typeof obj.hashKey === "function" ? obj.hashKey() : void 0 : void 0) {
        return hashKey;
      } else {
        typeString = _objectToString.call(obj);
        if (typeString === "[object Array]") {
          return typeString;
        } else {
          return obj;
        }
      }
    };

    SimpleHash.prototype.equality = function(lhs, rhs) {
      if (lhs === rhs) {
        return true;
      }
      if (lhs !== lhs && rhs !== rhs) {
        return true;
      }
      if ((lhs != null ? typeof lhs.isEqual === "function" ? lhs.isEqual(rhs) : void 0 : void 0) && (rhs != null ? typeof rhs.isEqual === "function" ? rhs.isEqual(lhs) : void 0 : void 0)) {
        return true;
      }
      return false;
    };

    SimpleHash.prototype.objectKey = function(key) {
      return typeof key !== 'string';
    };

    SimpleHash.prototype.forEach = function(iterator, ctx) {
      var key, obj, results, value, values, _i, _len, _ref, _ref1, _ref2, _ref3;
      results = [];
      if (this._objectStorage) {
        _ref = this._objectStorage;
        for (key in _ref) {
          values = _ref[key];
          _ref1 = values.slice();
          for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            _ref2 = _ref1[_i], obj = _ref2[0], value = _ref2[1];
            results.push(iterator.call(ctx, obj, value, this));
          }
        }
      }
      _ref3 = this._storage;
      for (key in _ref3) {
        value = _ref3[key];
        results.push(iterator.call(ctx, this.unprefixedKey(key), value, this));
      }
      return results;
    };

    SimpleHash.prototype.keys = function() {
      var result;
      result = [];
      Batman.SimpleHash.prototype.forEach.call(this, function(key) {
        return result.push(key);
      });
      return result;
    };

    SimpleHash.prototype.toArray = SimpleHash.prototype.keys;

    SimpleHash.prototype.clear = function() {
      this._storage = {};
      delete this._objectStorage;
      return this.length = 0;
    };

    SimpleHash.prototype.isEmpty = function() {
      return this.length === 0;
    };

    SimpleHash.prototype.merge = function() {
      var hash, merged, others, _i, _len;
      others = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      merged = new this.constructor;
      others.unshift(this);
      for (_i = 0, _len = others.length; _i < _len; _i++) {
        hash = others[_i];
        hash.forEach(function(obj, value) {
          return merged.set(obj, value);
        });
      }
      return merged;
    };

    SimpleHash.prototype.update = function(object) {
      var k, v;
      for (k in object) {
        v = object[k];
        this.set(k, v);
      }
    };

    SimpleHash.prototype.replace = function(object) {
      var _this = this;
      this.forEach(function(key, value) {
        if (!(key in object)) {
          return _this.unset(key);
        }
      });
      return this.update(object);
    };

    SimpleHash.prototype.toObject = function() {
      var key, obj, pair, value, _ref, _ref1;
      obj = {};
      _ref = this._storage;
      for (key in _ref) {
        value = _ref[key];
        obj[this.unprefixedKey(key)] = value;
      }
      if (this._objectStorage) {
        _ref1 = this._objectStorage;
        for (key in _ref1) {
          pair = _ref1[key];
          obj[key] = pair[0][1];
        }
      }
      return obj;
    };

    SimpleHash.prototype.toJSON = SimpleHash.prototype.toObject;

    return SimpleHash;

  })();

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  Batman.AssociationCurator = (function(_super) {
    __extends(AssociationCurator, _super);

    AssociationCurator.availableAssociations = ['belongsTo', 'hasOne', 'hasMany'];

    function AssociationCurator(model) {
      this.model = model;
      AssociationCurator.__super__.constructor.call(this);
      this._byTypeStorage = new Batman.SimpleHash;
    }

    AssociationCurator.prototype.add = function(association) {
      var associationTypeSet;
      this.set(association.label, association);
      if (!(associationTypeSet = this._byTypeStorage.get(association.associationType))) {
        associationTypeSet = new Batman.SimpleSet;
        this._byTypeStorage.set(association.associationType, associationTypeSet);
      }
      return associationTypeSet.add(association);
    };

    AssociationCurator.prototype.getByType = function(type) {
      return this._byTypeStorage.get(type);
    };

    AssociationCurator.prototype.getByLabel = function(label) {
      return this.get(label);
    };

    AssociationCurator.prototype.reset = function() {
      this.forEach(function(label, association) {
        return association.reset();
      });
      return true;
    };

    AssociationCurator.prototype.merge = function() {
      var others, result;
      others = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      result = AssociationCurator.__super__.merge.apply(this, arguments);
      result._byTypeStorage = this._byTypeStorage.merge(others.map(function(other) {
        return other._byTypeStorage;
      }));
      return result;
    };

    AssociationCurator.prototype._markDirtyAttribute = function(key, oldValue) {
      var _ref;
      if ((_ref = this.lifecycle.get('state')) !== 'loading' && _ref !== 'creating' && _ref !== 'saving' && _ref !== 'saved') {
        if (this.lifecycle.startTransition('set')) {
          return this.dirtyKeys.set(key, oldValue);
        } else {
          throw new Batman.StateMachine.InvalidTransitionError("Can't set while in state " + (this.lifecycle.get('state')));
        }
      }
    };

    return AssociationCurator;

  })(Batman.SimpleHash);

}).call(this);

(function() {
  var __slice = [].slice;

  Batman.SimpleSet = (function() {
    function SimpleSet() {
      var item, itemsToAdd;
      this._storage = [];
      this.length = 0;
      itemsToAdd = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = arguments.length; _i < _len; _i++) {
          item = arguments[_i];
          if (item != null) {
            _results.push(item);
          }
        }
        return _results;
      }).apply(this, arguments);
      if (itemsToAdd.length > 0) {
        this.add.apply(this, itemsToAdd);
      }
    }

    Batman.extend(SimpleSet.prototype, Batman.Enumerable);

    SimpleSet.prototype.at = function(index) {
      return this._storage[index];
    };

    SimpleSet.prototype.add = function() {
      var addedItems, item, items, _i, _len;
      items = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      addedItems = [];
      for (_i = 0, _len = items.length; _i < _len; _i++) {
        item = items[_i];
        if (!(this._indexOfItem(item) === -1)) {
          continue;
        }
        this._storage.push(item);
        addedItems.push(item);
      }
      this.length = this._storage.length;
      return addedItems;
    };

    SimpleSet.prototype.insert = function() {
      return this.insertWithIndexes.apply(this, arguments).addedItems;
    };

    SimpleSet.prototype.insertWithIndexes = function(items, indexes) {
      var addedIndexes, addedItems, i, index, item, _i, _len;
      addedIndexes = [];
      addedItems = [];
      for (i = _i = 0, _len = items.length; _i < _len; i = ++_i) {
        item = items[i];
        if (!(this._indexOfItem(item) === -1)) {
          continue;
        }
        index = indexes[i];
        this._storage.splice(index, 0, item);
        addedItems.push(item);
        addedIndexes.push(index);
      }
      this.length = this._storage.length;
      return {
        addedItems: addedItems,
        addedIndexes: addedIndexes
      };
    };

    SimpleSet.prototype.remove = function() {
      return this.removeWithIndexes.apply(this, arguments).removedItems;
    };

    SimpleSet.prototype.removeWithIndexes = function() {
      var index, item, items, removedIndexes, removedItems, _i, _len;
      items = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      removedIndexes = [];
      removedItems = [];
      for (_i = 0, _len = items.length; _i < _len; _i++) {
        item = items[_i];
        if (!((index = this._indexOfItem(item)) !== -1)) {
          continue;
        }
        this._storage.splice(index, 1);
        removedItems.push(item);
        removedIndexes.push(index);
      }
      this.length = this._storage.length;
      return {
        removedItems: removedItems,
        removedIndexes: removedIndexes
      };
    };

    SimpleSet.prototype.clear = function() {
      var items;
      items = this._storage;
      this._storage = [];
      this.length = 0;
      return items;
    };

    SimpleSet.prototype.replace = function(other) {
      this.clear();
      return this.add.apply(this, other.toArray());
    };

    SimpleSet.prototype.has = function(item) {
      return this._indexOfItem(item) !== -1;
    };

    SimpleSet.prototype.find = function(fn) {
      var item, _i, _len, _ref;
      _ref = this._storage;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        if (fn(item)) {
          return item;
        }
      }
    };

    SimpleSet.prototype.forEach = function(iterator, ctx) {
      var key, _i, _len, _ref;
      _ref = this._storage;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        key = _ref[_i];
        iterator.call(ctx, key, null, this);
      }
    };

    SimpleSet.prototype.isEmpty = function() {
      return this.length === 0;
    };

    SimpleSet.prototype.toArray = function() {
      return this._storage.slice();
    };

    SimpleSet.prototype.merge = function() {
      var merged, others, set, _i, _len;
      others = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      merged = new this.constructor;
      others.unshift(this);
      for (_i = 0, _len = others.length; _i < _len; _i++) {
        set = others[_i];
        set.forEach(function(v) {
          return merged.add(v);
        });
      }
      return merged;
    };

    SimpleSet.prototype.indexedBy = function(key) {
      this._indexes || (this._indexes = new Batman.SimpleHash);
      return this._indexes.get(key) || this._indexes.set(key, new Batman.SetIndex(this, key));
    };

    SimpleSet.prototype.indexedByUnique = function(key) {
      this._uniqueIndexes || (this._uniqueIndexes = new Batman.SimpleHash);
      return this._uniqueIndexes.get(key) || this._uniqueIndexes.set(key, new Batman.UniqueSetIndex(this, key));
    };

    SimpleSet.prototype.sortedBy = function(key, order) {
      var sortsForKey;
      if (order == null) {
        order = "asc";
      }
      order = order.toLowerCase() === "desc" ? "desc" : "asc";
      this._sorts || (this._sorts = new Batman.SimpleHash);
      sortsForKey = this._sorts.get(key) || this._sorts.set(key, new Batman.Object);
      return sortsForKey.get(order) || sortsForKey.set(order, new Batman.SetSort(this, key, order));
    };

    SimpleSet.prototype.equality = Batman.SimpleHash.prototype.equality;

    SimpleSet.prototype._indexOfItem = function(givenItem) {
      var index, item, _i, _len, _ref;
      _ref = this._storage;
      for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
        item = _ref[index];
        if (this.equality(givenItem, item)) {
          return index;
        }
      }
      return -1;
    };

    return SimpleSet;

  })();

}).call(this);

(function() {
  var SOURCE_TRACKER_STACK, SOURCE_TRACKER_STACK_VALID,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  SOURCE_TRACKER_STACK = [];

  SOURCE_TRACKER_STACK_VALID = true;

  Batman.Property = (function(_super) {
    __extends(Property, _super);

    Property._sourceTrackerStack = SOURCE_TRACKER_STACK;

    Property._sourceTrackerStackValid = SOURCE_TRACKER_STACK_VALID;

    Property.defaultAccessor = {
      get: function(key) {
        return this[key];
      },
      set: function(key, val) {
        return this[key] = val;
      },
      unset: function(key) {
        var x;
        x = this[key];
        delete this[key];
        return x;
      },
      cache: false
    };

    Property.defaultAccessorForBase = function(base) {
      var _ref;
      return ((_ref = base._batman) != null ? _ref.getFirst('defaultAccessor') : void 0) || Batman.Property.defaultAccessor;
    };

    Property.accessorForBaseAndKey = function(base, key) {
      var accessor, ancestor, _bm, _i, _len, _ref, _ref1, _ref2, _ref3;
      if ((_bm = base._batman) != null) {
        accessor = (_ref = _bm.keyAccessors) != null ? _ref.get(key) : void 0;
        if (!accessor) {
          _ref1 = _bm.ancestors();
          for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            ancestor = _ref1[_i];
            accessor = (_ref2 = ancestor._batman) != null ? (_ref3 = _ref2.keyAccessors) != null ? _ref3.get(key) : void 0 : void 0;
            if (accessor) {
              break;
            }
          }
        }
      }
      return accessor || this.defaultAccessorForBase(base);
    };

    Property.forBaseAndKey = function(base, key) {
      if (base.isObservable) {
        return base.property(key);
      } else {
        return new Batman.Keypath(base, key);
      }
    };

    Property.withoutTracking = function(block) {
      return this.wrapTrackingPrevention(block)();
    };

    Property.wrapTrackingPrevention = function(block) {
      return function() {
        Batman.Property.pushDummySourceTracker();
        try {
          return block.apply(this, arguments);
        } finally {
          Batman.Property.popSourceTracker();
        }
      };
    };

    Property.registerSource = function(obj) {
      var set;
      if (!(obj.isEventEmitter || obj instanceof Batman.Property)) {
        return;
      }
      if (SOURCE_TRACKER_STACK_VALID) {
        set = SOURCE_TRACKER_STACK[SOURCE_TRACKER_STACK.length - 1];
      } else {
        set = [];
        SOURCE_TRACKER_STACK.push(set);
        SOURCE_TRACKER_STACK_VALID = true;
      }
      if (set != null) {
        set.push(obj);
      }
      return void 0;
    };

    Property.pushSourceTracker = function() {
      if (SOURCE_TRACKER_STACK_VALID) {
        return SOURCE_TRACKER_STACK_VALID = false;
      } else {
        return SOURCE_TRACKER_STACK.push([]);
      }
    };

    Property.popSourceTracker = function() {
      if (SOURCE_TRACKER_STACK_VALID) {
        return SOURCE_TRACKER_STACK.pop();
      } else {
        SOURCE_TRACKER_STACK_VALID = true;
        return void 0;
      }
    };

    Property.pushDummySourceTracker = function() {
      if (!SOURCE_TRACKER_STACK_VALID) {
        SOURCE_TRACKER_STACK.push([]);
        SOURCE_TRACKER_STACK_VALID = true;
      }
      return SOURCE_TRACKER_STACK.push(null);
    };

    function Property(base, key) {
      this.base = base;
      this.key = key;
    }

    Property.prototype._isolationCount = 0;

    Property.prototype.cached = false;

    Property.prototype.value = null;

    Property.prototype.sources = null;

    Property.prototype.isProperty = true;

    Property.prototype.isDead = false;

    Property.prototype.registerAsMutableSource = function() {
      return Batman.Property.registerSource(this);
    };

    Property.prototype.isEqual = function(other) {
      return this.constructor === other.constructor && this.base === other.base && this.key === other.key;
    };

    Property.prototype.hashKey = function() {
      return this._hashKey || (this._hashKey = "<Batman.Property base: " + (Batman.Hash.prototype.hashKeyFor(this.base)) + ", key: \"" + (Batman.Hash.prototype.hashKeyFor(this.key)) + "\">");
    };

    Property.prototype.accessor = function() {
      return this._accessor || (this._accessor = this.constructor.accessorForBaseAndKey(this.base, this.key));
    };

    Property.prototype.eachObserver = function(iterator) {
      var ancestor, handlers, key, object, property, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
      key = this.key;
      handlers = (_ref = this.handlers) != null ? _ref.slice() : void 0;
      if (handlers) {
        for (_i = 0, _len = handlers.length; _i < _len; _i++) {
          object = handlers[_i];
          iterator(object);
        }
      }
      if (this.base.isObservable) {
        _ref1 = this.base._batman.ancestors();
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          ancestor = _ref1[_j];
          if (ancestor.isObservable && ancestor.hasProperty(key)) {
            property = ancestor.property(key);
            handlers = (_ref2 = property.handlers) != null ? _ref2.slice() : void 0;
            if (handlers) {
              for (_k = 0, _len2 = handlers.length; _k < _len2; _k++) {
                object = handlers[_k];
                iterator(object);
              }
            }
          }
        }
      }
    };

    Property.prototype.observers = function() {
      var results;
      results = [];
      this.eachObserver(function(observer) {
        return results.push(observer);
      });
      return results;
    };

    Property.prototype.hasObservers = function() {
      return this.observers().length > 0;
    };

    Property.prototype.updateSourcesFromTracker = function() {
      var handler, newSources, source, _i, _j, _len, _len1, _ref, _ref1;
      newSources = this.constructor.popSourceTracker();
      handler = this.sourceChangeHandler();
      if (this.sources) {
        _ref = this.sources;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          source = _ref[_i];
          if (source != null) {
            if (source.on) {
              source.off('change', handler);
            } else {
              source.removeHandler(handler);
            }
          }
        }
      }
      this.sources = newSources;
      if (this.sources) {
        _ref1 = this.sources;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          source = _ref1[_j];
          if (source != null) {
            if (source.on) {
              source.on('change', handler);
            } else {
              source.addHandler(handler);
            }
          }
        }
      }
      return null;
    };

    Property.prototype.getValue = function() {
      this.registerAsMutableSource();
      if (!this.isCached()) {
        this.constructor.pushSourceTracker();
        try {
          this.value = this.valueFromAccessor();
          this.cached = true;
        } finally {
          this.updateSourcesFromTracker();
        }
      }
      return this.value;
    };

    Property.prototype.isCachable = function() {
      var cacheable;
      if (this.isFinal()) {
        return true;
      }
      cacheable = this.accessor().cache;
      if (cacheable != null) {
        return !!cacheable;
      } else {
        return true;
      }
    };

    Property.prototype.isCached = function() {
      return this.isCachable() && this.cached;
    };

    Property.prototype.isFinal = function() {
      return this.final || (this.final = !!this.accessor()['final']);
    };

    Property.prototype.refresh = function() {
      var previousValue, value;
      this.cached = false;
      previousValue = this.value;
      value = this.getValue();
      if (value !== previousValue && !this.isIsolated()) {
        this.fire(value, previousValue, this.key);
      }
      if (this.value !== void 0 && this.isFinal()) {
        return this.lockValue();
      }
    };

    Property.prototype.sourceChangeHandler = function() {
      var _this = this;
      this._sourceChangeHandler || (this._sourceChangeHandler = this._handleSourceChange.bind(this));
      Batman.developer["do"](function() {
        return _this._sourceChangeHandler.property = _this;
      });
      return this._sourceChangeHandler;
    };

    Property.prototype._handleSourceChange = function() {
      if (this.isIsolated()) {
        return this._needsRefresh = true;
      } else if (this.isDead) {
        return this._removeHandlers();
      } else if (!this.isFinal() && !this.hasObservers()) {
        this.cached = false;
        return this._removeHandlers();
      } else {
        return this.refresh();
      }
    };

    Property.prototype.valueFromAccessor = function() {
      var _ref;
      return (_ref = this.accessor().get) != null ? _ref.call(this.base, this.key) : void 0;
    };

    Property.prototype.setValue = function(val) {
      var set;
      if (!(set = this.accessor().set)) {
        return;
      }
      return this._changeValue(function() {
        return set.call(this.base, this.key, val);
      });
    };

    Property.prototype.unsetValue = function() {
      var unset;
      if (!(unset = this.accessor().unset)) {
        return;
      }
      return this._changeValue(function() {
        return unset.call(this.base, this.key);
      });
    };

    Property.prototype._changeValue = function(block) {
      var result;
      this.cached = false;
      this.constructor.pushDummySourceTracker();
      try {
        result = block.apply(this);
        this.refresh();
      } finally {
        this.constructor.popSourceTracker();
      }
      if (!(this.isCached() || this.hasObservers())) {
        this.die();
      }
      return result;
    };

    Property.prototype.forget = function(handler) {
      if (handler != null) {
        return this.removeHandler(handler);
      } else {
        return this.clearHandlers();
      }
    };

    Property.prototype.observeAndFire = function(handler) {
      this.observe(handler);
      return handler.call(this.base, this.value, this.value, this.key);
    };

    Property.prototype.observe = function(handler) {
      this.addHandler(handler);
      if (this.sources == null) {
        this.getValue();
      }
      return this;
    };

    Property.prototype.observeOnce = function(originalHandler) {
      var handler, self;
      self = this;
      handler = function() {
        originalHandler.apply(this, arguments);
        return self.removeHandler(handler);
      };
      this.addHandler(handler);
      if (this.sources == null) {
        this.getValue();
      }
      return this;
    };

    Property.prototype._removeHandlers = function() {
      var handler, source, _i, _len, _ref;
      handler = this.sourceChangeHandler();
      if (this.sources) {
        _ref = this.sources;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          source = _ref[_i];
          if (source.on) {
            source.off('change', handler);
          } else {
            source.removeHandler(handler);
          }
        }
      }
      delete this.sources;
      return this.clearHandlers();
    };

    Property.prototype.lockValue = function() {
      this._removeHandlers();
      this.getValue = function() {
        return this.value;
      };
      return this.setValue = this.unsetValue = this.refresh = this.observe = function() {};
    };

    Property.prototype.die = function() {
      var _ref, _ref1;
      this._removeHandlers();
      if ((_ref = this.base._batman) != null) {
        if ((_ref1 = _ref.properties) != null) {
          _ref1.unset(this.key);
        }
      }
      this.base = null;
      return this.isDead = true;
    };

    Property.prototype.isolate = function() {
      if (this._isolationCount === 0) {
        this._preIsolationValue = this.getValue();
      }
      return this._isolationCount++;
    };

    Property.prototype.expose = function() {
      if (this._isolationCount === 1) {
        this._isolationCount--;
        if (this._needsRefresh) {
          this.value = this._preIsolationValue;
          this.refresh();
        } else if (this.value !== this._preIsolationValue) {
          this.fire(this.value, this._preIsolationValue, this.key);
        }
        return this._preIsolationValue = null;
      } else if (this._isolationCount > 0) {
        return this._isolationCount--;
      }
    };

    Property.prototype.isIsolated = function() {
      return this._isolationCount > 0;
    };

    return Property;

  })(Batman.PropertyEvent);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.Keypath = (function(_super) {
    __extends(Keypath, _super);

    function Keypath(base, key) {
      if (typeof key === 'string') {
        this.segments = key.split('.');
        this.depth = this.segments.length;
      } else {
        this.segments = [key];
        this.depth = 1;
      }
      Keypath.__super__.constructor.apply(this, arguments);
    }

    Keypath.prototype.isCachable = function() {
      if (this.depth === 1) {
        return Keypath.__super__.isCachable.apply(this, arguments);
      } else {
        return true;
      }
    };

    Keypath.prototype.terminalProperty = function() {
      var base;
      base = Batman.getPath(this.base, this.segments.slice(0, -1));
      if (base == null) {
        return;
      }
      return Batman.Keypath.forBaseAndKey(base, this.segments[this.depth - 1]);
    };

    Keypath.prototype.valueFromAccessor = function() {
      if (this.depth === 1) {
        return Keypath.__super__.valueFromAccessor.apply(this, arguments);
      } else {
        return Batman.getPath(this.base, this.segments);
      }
    };

    Keypath.prototype.setValue = function(val) {
      var _ref;
      if (this.depth === 1) {
        return Keypath.__super__.setValue.apply(this, arguments);
      } else {
        return (_ref = this.terminalProperty()) != null ? _ref.setValue(val) : void 0;
      }
    };

    Keypath.prototype.unsetValue = function() {
      var _ref;
      if (this.depth === 1) {
        return Keypath.__super__.unsetValue.apply(this, arguments);
      } else {
        return (_ref = this.terminalProperty()) != null ? _ref.unsetValue() : void 0;
      }
    };

    return Keypath;

  })(Batman.Property);

}).call(this);

(function() {
  var __slice = [].slice;

  Batman.Observable = {
    isObservable: true,
    hasProperty: function(key) {
      var _ref, _ref1;
      return (_ref = this._batman) != null ? (_ref1 = _ref.properties) != null ? typeof _ref1.hasKey === "function" ? _ref1.hasKey(key) : void 0 : void 0 : void 0;
    },
    property: function(key) {
      var properties, propertyClass, _base;
      Batman.initializeObject(this);
      propertyClass = this.propertyClass || Batman.Keypath;
      properties = (_base = this._batman).properties || (_base.properties = new Batman.SimpleHash);
      if (properties.objectKey(key)) {
        return properties.getObject(key) || properties.setObject(key, new propertyClass(this, key));
      } else {
        return properties.getString(key) || properties.setString(key, new propertyClass(this, key));
      }
    },
    get: function(key) {
      return this.property(key).getValue();
    },
    set: function(key, val) {
      return this.property(key).setValue(val);
    },
    unset: function(key) {
      return this.property(key).unsetValue();
    },
    getOrSet: Batman.SimpleHash.prototype.getOrSet,
    forget: function(key, observer) {
      var _ref;
      if (key) {
        this.property(key).forget(observer);
      } else {
        if ((_ref = this._batman.properties) != null) {
          _ref.forEach(function(key, property) {
            return property.forget();
          });
        }
      }
      return this;
    },
    observe: function() {
      var args, key, _ref;
      key = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      (_ref = this.property(key)).observe.apply(_ref, args);
      return this;
    },
    observeAndFire: function() {
      var args, key, _ref;
      key = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      (_ref = this.property(key)).observeAndFire.apply(_ref, args);
      return this;
    },
    observeOnce: function() {
      var args, key, _ref;
      key = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      (_ref = this.property(key)).observeOnce.apply(_ref, args);
      return this;
    }
  };

}).call(this);

(function() {
  var methodName, platformMethods, _i, _len;

  Batman.DOM = {
    textInputTypes: ['text', 'search', 'tel', 'url', 'email', 'password'],
    scrollIntoView: function(elementID) {
      var _ref;
      return (_ref = document.getElementById(elementID)) != null ? typeof _ref.scrollIntoView === "function" ? _ref.scrollIntoView() : void 0 : void 0;
    },
    setStyleProperty: function(node, property, value, importance) {
      if (node.style.setProperty) {
        return node.style.setProperty(property, value, importance);
      } else {
        return node.style.setAttribute(property, value, importance);
      }
    },
    valueForNode: function(node, value, escapeValue) {
      var child, isSetting, nodeName, _i, _len, _ref, _results;
      if (value == null) {
        value = '';
      }
      if (escapeValue == null) {
        escapeValue = true;
      }
      isSetting = arguments.length > 1;
      nodeName = node.nodeName.toUpperCase();
      switch (nodeName) {
        case 'INPUT':
        case 'TEXTAREA':
          if (isSetting) {
            return node.value = value;
          } else {
            return node.value;
          }
          break;
        case 'SELECT':
          if (isSetting) {
            return node.value = value;
          } else if (node.multiple) {
            _ref = node.children;
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              child = _ref[_i];
              if (child.selected) {
                _results.push(child.value);
              }
            }
            return _results;
          } else {
            return node.value;
          }
          break;
        default:
          if (isSetting) {
            if (nodeName === 'OPTION') {
              node.text = value;
            }
            return Batman.DOM.setInnerHTML(node, escapeValue ? Batman.escapeHTML(value) : value);
          } else {
            return node.innerHTML;
          }
      }
    },
    nodeIsEditable: function(node) {
      var _ref;
      return (_ref = node.nodeName.toUpperCase()) === 'INPUT' || _ref === 'TEXTAREA' || _ref === 'SELECT';
    },
    addEventListener: function(node, eventName, callback) {
      var listeners;
      if (!(listeners = Batman._data(node, 'listeners'))) {
        listeners = Batman._data(node, 'listeners', {});
      }
      if (!listeners[eventName]) {
        listeners[eventName] = [];
      }
      listeners[eventName].push(callback);
      if (Batman.DOM.hasAddEventListener) {
        return node.addEventListener(eventName, callback, false);
      } else {
        return node.attachEvent("on" + eventName, callback);
      }
    },
    removeEventListener: function(node, eventName, callback) {
      var eventListeners, index, listeners;
      if (listeners = Batman._data(node, 'listeners')) {
        if (eventListeners = listeners[eventName]) {
          index = eventListeners.indexOf(callback);
          if (index !== -1) {
            eventListeners.splice(index, 1);
          }
        }
      }
      if (Batman.DOM.hasAddEventListener) {
        return node.removeEventListener(eventName, callback, false);
      } else {
        return node.detachEvent('on' + eventName, callback);
      }
    },
    cleanupNode: function(node) {
      var child, eventListeners, eventName, listeners, _i, _len, _ref;
      if (listeners = Batman._data(node, 'listeners')) {
        for (eventName in listeners) {
          eventListeners = listeners[eventName];
          eventListeners.forEach(function(listener) {
            return Batman.DOM.removeEventListener(node, eventName, listener);
          });
        }
      }
      Batman.removeData(node, null, null, true);
      _ref = node.childNodes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        child = _ref[_i];
        Batman.DOM.cleanupNode(child);
      }
    },
    hasAddEventListener: !!(typeof window !== "undefined" && window !== null ? window.addEventListener : void 0),
    preventDefault: function(e) {
      if (typeof e.preventDefault === "function") {
        return e.preventDefault();
      } else {
        return e.returnValue = false;
      }
    },
    stopPropagation: function(e) {
      if (e.stopPropagation) {
        return e.stopPropagation();
      } else {
        return e.cancelBubble = true;
      }
    }
  };

  platformMethods = ['querySelector', 'querySelectorAll', 'setInnerHTML', 'containsNode', 'destroyNode', 'textContent'];

  for (_i = 0, _len = platformMethods.length; _i < _len; _i++) {
    methodName = platformMethods[_i];
    Batman.DOM[methodName] = function() {
      return Batman.developer.error("Please include a platform adapter to define " + methodName + ".");
    };
  }

}).call(this);

(function() {
  Batman.DOM.ReaderBindingDefinition = (function() {
    function ReaderBindingDefinition(node, keyPath, view) {
      this.node = node;
      this.keyPath = keyPath;
      this.view = view;
    }

    return ReaderBindingDefinition;

  })();

  Batman.BindingDefinitionOnlyObserve = {
    Data: 'data',
    Node: 'node',
    All: 'all',
    None: 'none'
  };

  Batman.DOM.readers = {
    target: function(definition) {
      definition.onlyObserve = Batman.BindingDefinitionOnlyObserve.Node;
      return Batman.DOM.readers.bind(definition);
    },
    source: function(definition) {
      definition.onlyObserve = Batman.BindingDefinitionOnlyObserve.Data;
      return Batman.DOM.readers.bind(definition);
    },
    bind: function(definition) {
      var bindingClass, node;
      node = definition.node;
      switch (node.nodeName.toLowerCase()) {
        case 'input':
          switch (node.getAttribute('type')) {
            case 'checkbox':
              definition.attr = 'checked';
              Batman.DOM.attrReaders.bind(definition);
              return true;
            case 'radio':
              bindingClass = Batman.DOM.RadioBinding;
              break;
            case 'file':
              bindingClass = Batman.DOM.FileBinding;
          }
          break;
        case 'select':
          bindingClass = Batman.DOM.SelectBinding;
      }
      bindingClass || (bindingClass = Batman.DOM.ValueBinding);
      return new bindingClass(definition);
    },
    context: function(definition) {
      return new Batman.DOM.ContextBinding(definition);
    },
    showif: function(definition) {
      return new Batman.DOM.ShowHideBinding(definition);
    },
    hideif: function(definition) {
      definition.invert = true;
      return new Batman.DOM.ShowHideBinding(definition);
    },
    insertif: function(definition) {
      return new Batman.DOM.InsertionBinding(definition);
    },
    removeif: function(definition) {
      definition.invert = true;
      return new Batman.DOM.InsertionBinding(definition);
    },
    renderif: function(definition) {
      return new Batman.DOM.DeferredRenderBinding(definition);
    },
    route: function(definition) {
      return new Batman.DOM.RouteBinding(definition);
    },
    view: function(definition) {
      return new Batman.DOM.ViewBinding(definition);
    },
    partial: function(definition) {
      var keyPath, node, partialView, view;
      node = definition.node, keyPath = definition.keyPath, view = definition.view;
      node.removeAttribute('data-partial');
      partialView = new Batman.View({
        source: keyPath,
        parentNode: node,
        node: node
      });
      return {
        skipChildren: true,
        initialized: function() {
          partialView.loadView(node);
          return view.subviews.add(partialView);
        }
      };
    },
    defineview: function(definition) {
      var keyPath, node, view;
      node = definition.node, view = definition.view, keyPath = definition.keyPath;
      Batman.View.store.set(Batman.Navigator.normalizePath(keyPath), node.innerHTML);
      return {
        skipChildren: true,
        initialized: function() {
          if (node.parentNode) {
            return node.parentNode.removeChild(node);
          }
        }
      };
    },
    contentfor: function(definition) {
      var contentView, keyPath, node, view;
      node = definition.node, keyPath = definition.keyPath, view = definition.view;
      contentView = new Batman.View({
        html: node.innerHTML,
        contentFor: keyPath
      });
      contentView.addToParentNode = function(parentNode) {
        parentNode.innerHTML = '';
        return parentNode.appendChild(this.get('node'));
      };
      view.subviews.add(contentView);
      return {
        skipChildren: true,
        initialized: function() {
          if (node.parentNode) {
            return node.parentNode.removeChild(node);
          }
        }
      };
    },
    "yield": function(definition) {
      var yieldObject;
      yieldObject = Batman.DOM.Yield.withName(definition.keyPath);
      yieldObject.set('containerNode', definition.node);
      return {
        skipChildren: true
      };
    }
  };

}).call(this);

(function() {
  var __slice = [].slice,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Batman.DOM.events = {
    click: function(node, callback, view, eventName, preventDefault) {
      if (eventName == null) {
        eventName = 'click';
      }
      if (preventDefault == null) {
        preventDefault = true;
      }
      Batman.DOM.addEventListener(node, eventName, function() {
        var args, event;
        event = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        if (event.metaKey || event.ctrlKey || event.button === 1) {
          return;
        }
        if (preventDefault) {
          Batman.DOM.preventDefault(event);
        }
        if (!Batman.DOM.eventIsAllowed(eventName, event)) {
          return;
        }
        return callback.apply(null, [node, event].concat(__slice.call(args), [view]));
      });
      if (node.nodeName.toUpperCase() === 'A' && !node.href) {
        node.href = '#';
      }
      return node;
    },
    doubleclick: function(node, callback, view) {
      return Batman.DOM.events.click(node, callback, view, 'dblclick');
    },
    change: function(node, callback, view) {
      var eventName, eventNames, oldCallback, _i, _len;
      eventNames = (function() {
        var _ref;
        switch (node.nodeName.toUpperCase()) {
          case 'TEXTAREA':
            return ['input', 'keyup', 'change'];
          case 'INPUT':
            if (_ref = node.type.toLowerCase(), __indexOf.call(Batman.DOM.textInputTypes, _ref) >= 0) {
              oldCallback = callback;
              callback = function(node, event, view) {
                if (event.type === 'keyup' && Batman.DOM.events.isEnter(event)) {
                  return;
                }
                return oldCallback(node, event, view);
              };
              return ['input', 'keyup', 'change'];
            } else {
              return ['input', 'change'];
            }
            break;
          default:
            return ['change'];
        }
      })();
      for (_i = 0, _len = eventNames.length; _i < _len; _i++) {
        eventName = eventNames[_i];
        Batman.DOM.addEventListener(node, eventName, function() {
          var args;
          args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          return callback.apply(null, [node].concat(__slice.call(args), [view]));
        });
      }
    },
    isEnter: function(ev) {
      var _ref, _ref1;
      return ((13 <= (_ref = ev.keyCode) && _ref <= 14)) || ((13 <= (_ref1 = ev.which) && _ref1 <= 14)) || ev.keyIdentifier === 'Enter' || ev.key === 'Enter';
    },
    submit: function(node, callback, view) {
      if (Batman.DOM.nodeIsEditable(node)) {
        Batman.DOM.addEventListener(node, 'keydown', function() {
          var args;
          args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          if (Batman.DOM.events.isEnter(args[0])) {
            return Batman.DOM._keyCapturingNode = node;
          }
        });
        Batman.DOM.addEventListener(node, 'keyup', function() {
          var args;
          args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          if (Batman.DOM.events.isEnter(args[0])) {
            if (Batman.DOM._keyCapturingNode === node) {
              Batman.DOM.preventDefault(args[0]);
              callback.apply(null, [node].concat(__slice.call(args), [view]));
            }
            return Batman.DOM._keyCapturingNode = null;
          }
        });
      } else {
        Batman.DOM.addEventListener(node, 'submit', function() {
          var args;
          args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          Batman.DOM.preventDefault(args[0]);
          return callback.apply(null, [node].concat(__slice.call(args), [view]));
        });
      }
      return node;
    },
    other: function(node, eventName, callback, view) {
      return Batman.DOM.addEventListener(node, eventName, function() {
        var args;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        return callback.apply(null, [node].concat(__slice.call(args), [view]));
      });
    }
  };

  Batman.DOM.eventIsAllowed = function(eventName, event) {
    var delegate, _ref, _ref1;
    if (delegate = (_ref = Batman.currentApp) != null ? (_ref1 = _ref.shouldAllowEvent) != null ? _ref1[eventName] : void 0 : void 0) {
      if (delegate(event) === false) {
        return false;
      }
    }
    return true;
  };

}).call(this);

(function() {
  Batman.DOM.AttrReaderBindingDefinition = (function() {
    function AttrReaderBindingDefinition(node, attr, keyPath, view) {
      this.node = node;
      this.attr = attr;
      this.keyPath = keyPath;
      this.view = view;
    }

    return AttrReaderBindingDefinition;

  })();

  Batman.DOM.attrReaders = {
    _parseAttribute: function(value) {
      if (value === 'false') {
        value = false;
      }
      if (value === 'true') {
        value = true;
      }
      return value;
    },
    source: function(definition) {
      definition.onlyObserve = Batman.BindingDefinitionOnlyObserve.Data;
      return Batman.DOM.attrReaders.bind(definition);
    },
    bind: function(definition) {
      var bindingClass;
      bindingClass = (function() {
        switch (definition.attr) {
          case 'checked':
          case 'disabled':
          case 'selected':
            return Batman.DOM.CheckedBinding;
          case 'value':
          case 'href':
          case 'src':
          case 'size':
            return Batman.DOM.NodeAttributeBinding;
          case 'class':
            return Batman.DOM.ClassBinding;
          case 'style':
            return Batman.DOM.StyleBinding;
          default:
            return Batman.DOM.AttributeBinding;
        }
      })();
      return new bindingClass(definition);
    },
    context: function(definition) {
      return new Batman.DOM.ContextBinding(definition);
    },
    event: function(definition) {
      return new Batman.DOM.EventBinding(definition);
    },
    addclass: function(definition) {
      return new Batman.DOM.AddClassBinding(definition);
    },
    removeclass: function(definition) {
      definition.invert = true;
      return new Batman.DOM.AddClassBinding(definition);
    },
    foreach: function(definition) {
      return new Batman.DOM.IteratorBinding(definition);
    },
    formfor: function(definition) {
      return new Batman.DOM.FormBinding(definition);
    },
    style: function(definition) {
      return new Batman.DOM.StyleAttributeBinding(definition);
    }
  };

}).call(this);

(function() {
  var BatmanObject, ObjectFunctions, getAccessorObject, promiseWrapper, wrapSingleAccessor,
    __slice = [].slice,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  getAccessorObject = function(base, accessor) {
    var deprecated, _i, _len, _ref;
    if (typeof accessor === 'function') {
      accessor = {
        get: accessor
      };
    }
    _ref = ['cachable', 'cacheable'];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      deprecated = _ref[_i];
      if (deprecated in accessor) {
        Batman.developer.warn("Property accessor option \"" + deprecated + "\" is deprecated. Use \"cache\" instead.");
        if (!('cache' in accessor)) {
          accessor.cache = accessor[deprecated];
        }
      }
    }
    return accessor;
  };

  promiseWrapper = function(fetcher) {
    return function(defaultAccessor) {
      return {
        get: function(key) {
          var asyncDeliver, existingValue, newValue, _base, _base1,
            _this = this;
          if ((existingValue = defaultAccessor.get.apply(this, arguments)) != null) {
            return existingValue;
          }
          asyncDeliver = false;
          newValue = void 0;
          if ((_base = this._batman).promises == null) {
            _base.promises = {};
          }
          if ((_base1 = this._batman.promises)[key] == null) {
            _base1[key] = (function() {
              var deliver, returnValue;
              deliver = function(err, result) {
                if (asyncDeliver) {
                  _this.set(key, result);
                }
                return newValue = result;
              };
              returnValue = fetcher.call(_this, deliver, key);
              if (newValue == null) {
                newValue = returnValue;
              }
              return true;
            })();
          }
          asyncDeliver = true;
          return newValue;
        },
        cache: true
      };
    };
  };

  wrapSingleAccessor = function(core, wrapper) {
    var k, v;
    wrapper = (typeof wrapper === "function" ? wrapper(core) : void 0) || wrapper;
    for (k in core) {
      v = core[k];
      if (!(k in wrapper)) {
        wrapper[k] = v;
      }
    }
    return wrapper;
  };

  ObjectFunctions = {
    _defineAccessor: function() {
      var accessor, key, keys, _base, _i, _j, _len, _ref;
      keys = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), accessor = arguments[_i++];
      if (accessor == null) {
        return Batman.Property.defaultAccessorForBase(this);
      } else if (keys.length === 0 && ((_ref = Batman.typeOf(accessor)) !== 'Object' && _ref !== 'Function')) {
        return Batman.Property.accessorForBaseAndKey(this, accessor);
      } else if (typeof accessor.promise === 'function') {
        return this._defineWrapAccessor.apply(this, __slice.call(keys).concat([promiseWrapper(accessor.promise)]));
      }
      Batman.initializeObject(this);
      if (keys.length === 0) {
        this._batman.defaultAccessor = getAccessorObject(this, accessor);
      } else {
        (_base = this._batman).keyAccessors || (_base.keyAccessors = new Batman.SimpleHash);
        for (_j = 0, _len = keys.length; _j < _len; _j++) {
          key = keys[_j];
          this._batman.keyAccessors.set(key, getAccessorObject(this, accessor));
        }
      }
      return true;
    },
    _defineWrapAccessor: function() {
      var key, keys, wrapper, _i, _j, _len;
      keys = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), wrapper = arguments[_i++];
      Batman.initializeObject(this);
      if (keys.length === 0) {
        this._defineAccessor(wrapSingleAccessor(this._defineAccessor(), wrapper));
      } else {
        for (_j = 0, _len = keys.length; _j < _len; _j++) {
          key = keys[_j];
          this._defineAccessor(key, wrapSingleAccessor(this._defineAccessor(key), wrapper));
        }
      }
      return true;
    },
    _resetPromises: function() {
      var key;
      if (this._batman.promises == null) {
        return;
      }
      for (key in this._batman.promises) {
        this._resetPromise(key);
      }
    },
    _resetPromise: function(key) {
      this.unset(key);
      this.property(key).cached = false;
      delete this._batman.promises[key];
    }
  };

  BatmanObject = (function(_super) {
    var counter;

    __extends(BatmanObject, _super);

    Batman.initializeObject(BatmanObject);

    Batman.initializeObject(BatmanObject.prototype);

    Batman.mixin(BatmanObject.prototype, ObjectFunctions, Batman.EventEmitter, Batman.Observable);

    Batman.mixin(BatmanObject, ObjectFunctions, Batman.EventEmitter, Batman.Observable);

    BatmanObject.classMixin = function() {
      return Batman.mixin.apply(Batman, [this].concat(__slice.call(arguments)));
    };

    BatmanObject.mixin = function() {
      return this.classMixin.apply(this.prototype, arguments);
    };

    BatmanObject.prototype.mixin = BatmanObject.classMixin;

    BatmanObject.classAccessor = BatmanObject._defineAccessor;

    BatmanObject.accessor = function() {
      var _ref;
      return (_ref = this.prototype)._defineAccessor.apply(_ref, arguments);
    };

    BatmanObject.prototype.accessor = BatmanObject._defineAccessor;

    BatmanObject.wrapClassAccessor = BatmanObject._defineWrapAccessor;

    BatmanObject.wrapAccessor = function() {
      var _ref;
      return (_ref = this.prototype)._defineWrapAccessor.apply(_ref, arguments);
    };

    BatmanObject.prototype.wrapAccessor = BatmanObject._defineWrapAccessor;

    BatmanObject.observeAll = function() {
      return this.prototype.observe.apply(this.prototype, arguments);
    };

    BatmanObject.singleton = function(singletonMethodName) {
      if (singletonMethodName == null) {
        singletonMethodName = "sharedInstance";
      }
      return this.classAccessor(singletonMethodName, {
        get: function() {
          var _name;
          return this[_name = "_" + singletonMethodName] || (this[_name] = new this);
        }
      });
    };

    BatmanObject.accessor('_batmanID', function() {
      return this._batmanID();
    });

    function BatmanObject() {
      var mixins;
      mixins = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      this._batman = new Batman._Batman(this);
      this.mixin.apply(this, mixins);
    }

    counter = 0;

    BatmanObject.prototype._batmanID = function() {
      var _base;
      this._batman.check(this);
      if ((_base = this._batman).id == null) {
        _base.id = counter++;
      }
      return this._batman.id;
    };

    BatmanObject.prototype.hashKey = function() {
      var _base;
      if (typeof this.isEqual === 'function') {
        return;
      }
      return (_base = this._batman).hashKey || (_base.hashKey = "<Batman.Object " + (this._batmanID()) + ">");
    };

    BatmanObject.prototype.toJSON = function() {
      var key, obj, value;
      obj = {};
      for (key in this) {
        if (!__hasProp.call(this, key)) continue;
        value = this[key];
        if (key !== "_batman" && key !== "hashKey" && key !== "_batmanID") {
          obj[key] = (value != null ? value.toJSON : void 0) ? value.toJSON() : value;
        }
      }
      return obj;
    };

    return BatmanObject;

  })(Object);

  Batman.Object = BatmanObject;

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.BindingParser = (function(_super) {
    var bindingSortOrder, bindingSortPositions, name, pos, viewBackedBindings, _i, _len;

    __extends(BindingParser, _super);

    function BindingParser(view) {
      this.view = view;
      BindingParser.__super__.constructor.call(this);
      this.node = this.view.node;
      this.parseTree(this.node);
    }

    bindingSortOrder = ["defineview", "foreach", "renderif", "view", "formfor", "context", "bind", "source", "target"];

    viewBackedBindings = ["foreach", "renderif", "formfor", "context"];

    bindingSortPositions = {};

    for (pos = _i = 0, _len = bindingSortOrder.length; _i < _len; pos = ++_i) {
      name = bindingSortOrder[pos];
      bindingSortPositions[name] = pos;
    }

    BindingParser.prototype._sortBindings = function(a, b) {
      var aindex, bindex;
      aindex = bindingSortPositions[a[0]];
      bindex = bindingSortPositions[b[0]];
      if (aindex == null) {
        aindex = bindingSortOrder.length;
      }
      if (bindex == null) {
        bindex = bindingSortOrder.length;
      }
      if (aindex > bindex) {
        return 1;
      } else if (bindex > aindex) {
        return -1;
      } else if (a[0] > b[0]) {
        return 1;
      } else if (b[0] > a[0]) {
        return -1;
      } else {
        return 0;
      }
    };

    BindingParser.prototype.parseTree = function(root) {
      var skipChildren;
      while (root) {
        skipChildren = this.parseNode(root);
        root = this.nextNode(root, skipChildren);
      }
      this.fire('bindingsInitialized');
    };

    BindingParser.prototype.parseNode = function(node) {
      var attr, attrIndex, attribute, backingView, binding, bindingDefinition, bindings, isViewBacked, reader, value, _j, _k, _len1, _len2, _ref, _ref1, _ref2, _ref3;
      isViewBacked = false;
      if (node.getAttribute && node.attributes) {
        bindings = [];
        _ref = node.attributes;
        for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
          attribute = _ref[_j];
          if (((_ref1 = attribute.nodeName) != null ? _ref1.substr(0, 5) : void 0) !== "data-") {
            continue;
          }
          name = attribute.nodeName.substr(5);
          attrIndex = name.indexOf('-');
          bindings.push(attrIndex !== -1 ? [name.substr(0, attrIndex), name.substr(attrIndex + 1), attribute.value] : [name, void 0, attribute.value]);
        }
        _ref2 = bindings.sort(this._sortBindings);
        for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
          _ref3 = _ref2[_k], name = _ref3[0], attr = _ref3[1], value = _ref3[2];
          if (isViewBacked && viewBackedBindings.indexOf(name) === -1) {
            continue;
          }
          binding = attr ? (reader = Batman.DOM.attrReaders[name]) ? (bindingDefinition = new Batman.DOM.AttrReaderBindingDefinition(node, attr, value, this.view), reader(bindingDefinition)) : void 0 : (reader = Batman.DOM.readers[name]) ? (bindingDefinition = new Batman.DOM.ReaderBindingDefinition(node, value, this.view), reader(bindingDefinition)) : void 0;
          if (binding != null ? binding.initialized : void 0) {
            this.once('bindingsInitialized', (function(binding) {
              return function() {
                return binding.initialized.call(binding);
              };
            })(binding));
          }
          if (binding != null ? binding.skipChildren : void 0) {
            return true;
          }
          if (binding != null ? binding.backWithView : void 0) {
            isViewBacked = true;
          }
        }
      }
      if (isViewBacked && (backingView = Batman._data(node, 'view'))) {
        backingView.initializeBindings();
      }
      return isViewBacked;
    };

    BindingParser.prototype.nextNode = function(node, skipChildren) {
      var children, nextParent, parentSibling, sibling;
      if (!skipChildren) {
        children = node.childNodes;
        if (children != null ? children.length : void 0) {
          return children[0];
        }
      }
      sibling = node.nextSibling;
      if (this.node === node) {
        return;
      }
      if (sibling) {
        return sibling;
      }
      nextParent = node;
      while (nextParent = nextParent.parentNode) {
        parentSibling = nextParent.nextSibling;
        if (this.node === nextParent) {
          return;
        }
        if (parentSibling) {
          return parentSibling;
        }
      }
    };

    return BindingParser;

  })(Batman.Object);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.ValidationError = (function(_super) {
    __extends(ValidationError, _super);

    ValidationError.accessor('fullMessage', function() {
      if (this.attribute === 'base') {
        return Batman.t('errors.base.format', {
          message: this.message
        });
      } else {
        return Batman.t('errors.format', {
          attribute: Batman.helpers.humanize(this.attribute),
          message: this.message
        });
      }
    });

    function ValidationError(attribute, message) {
      ValidationError.__super__.constructor.call(this, {
        attribute: attribute,
        message: message
      });
    }

    return ValidationError;

  })(Batman.Object);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  Batman.StorageAdapter = (function(_super) {
    __extends(StorageAdapter, _super);

    StorageAdapter.StorageError = (function(_super1) {
      __extends(StorageError, _super1);

      StorageError.prototype.name = "StorageError";

      function StorageError(message) {
        StorageError.__super__.constructor.apply(this, arguments);
        this.message = message;
      }

      return StorageError;

    })(Error);

    StorageAdapter.RecordExistsError = (function(_super1) {
      __extends(RecordExistsError, _super1);

      RecordExistsError.prototype.name = 'RecordExistsError';

      function RecordExistsError(message) {
        RecordExistsError.__super__.constructor.call(this, message || "Can't create this record because it already exists in the store!");
      }

      return RecordExistsError;

    })(StorageAdapter.StorageError);

    StorageAdapter.NotFoundError = (function(_super1) {
      __extends(NotFoundError, _super1);

      NotFoundError.prototype.name = 'NotFoundError';

      function NotFoundError(message) {
        NotFoundError.__super__.constructor.call(this, message || "Record couldn't be found in storage!");
      }

      return NotFoundError;

    })(StorageAdapter.StorageError);

    StorageAdapter.NotAllowedError = (function(_super1) {
      __extends(NotAllowedError, _super1);

      NotAllowedError.prototype.name = "NotAllowedError";

      function NotAllowedError(message) {
        NotAllowedError.__super__.constructor.call(this, message || "Storage operation denied access to the operation!");
      }

      return NotAllowedError;

    })(StorageAdapter.StorageError);

    StorageAdapter.NotAcceptableError = (function(_super1) {
      __extends(NotAcceptableError, _super1);

      NotAcceptableError.prototype.name = "NotAcceptableError";

      function NotAcceptableError(message) {
        NotAcceptableError.__super__.constructor.call(this, message || "Storage operation permitted but the request was malformed!");
      }

      return NotAcceptableError;

    })(StorageAdapter.StorageError);

    StorageAdapter.UnprocessableRecordError = (function(_super1) {
      __extends(UnprocessableRecordError, _super1);

      UnprocessableRecordError.prototype.name = "UnprocessableRecordError";

      function UnprocessableRecordError(message) {
        UnprocessableRecordError.__super__.constructor.call(this, message || "Storage adapter could not process the record!");
      }

      return UnprocessableRecordError;

    })(StorageAdapter.StorageError);

    StorageAdapter.InternalStorageError = (function(_super1) {
      __extends(InternalStorageError, _super1);

      InternalStorageError.prototype.name = "InternalStorageError";

      function InternalStorageError(message) {
        InternalStorageError.__super__.constructor.call(this, message || "An error occurred during the storage operation!");
      }

      return InternalStorageError;

    })(StorageAdapter.StorageError);

    StorageAdapter.NotImplementedError = (function(_super1) {
      __extends(NotImplementedError, _super1);

      NotImplementedError.prototype.name = "NotImplementedError";

      function NotImplementedError(message) {
        NotImplementedError.__super__.constructor.call(this, message || "This operation is not implemented by the storage adapter!");
      }

      return NotImplementedError;

    })(StorageAdapter.StorageError);

    function StorageAdapter(model) {
      var constructor;
      StorageAdapter.__super__.constructor.call(this, {
        model: model
      });
      constructor = this.constructor;
      if (constructor.ModelMixin) {
        Batman.extend(model, constructor.ModelMixin);
      }
      if (constructor.RecordMixin) {
        Batman.extend(model.prototype, constructor.RecordMixin);
      }
    }

    StorageAdapter.prototype.isStorageAdapter = true;

    StorageAdapter.prototype.storageKey = function(record) {
      var model;
      model = (record != null ? record.constructor : void 0) || this.model;
      return model.get('storageKey') || Batman.helpers.pluralize(Batman.helpers.underscore(model.get('resourceName')));
    };

    StorageAdapter.prototype.getRecordFromData = function(attributes, constructor) {
      if (constructor == null) {
        constructor = this.model;
      }
      return constructor._makeOrFindRecordFromData(attributes);
    };

    StorageAdapter.prototype.getRecordsFromData = function(attributeSet, constructor) {
      if (constructor == null) {
        constructor = this.model;
      }
      return constructor._makeOrFindRecordsFromData(attributeSet);
    };

    StorageAdapter.skipIfError = function(f) {
      return function(env, next) {
        if (env.error != null) {
          return next();
        } else {
          return f.call(this, env, next);
        }
      };
    };

    StorageAdapter.prototype.before = function() {
      return this._addFilter.apply(this, ['before'].concat(__slice.call(arguments)));
    };

    StorageAdapter.prototype.after = function() {
      return this._addFilter.apply(this, ['after'].concat(__slice.call(arguments)));
    };

    StorageAdapter.prototype._inheritFilters = function() {
      var filtersByKey, filtersList, key, oldFilters, position;
      if (!this._batman.check(this) || !this._batman.filters) {
        oldFilters = this._batman.getFirst('filters');
        this._batman.filters = {
          before: {},
          after: {}
        };
        if (oldFilters != null) {
          for (position in oldFilters) {
            filtersByKey = oldFilters[position];
            for (key in filtersByKey) {
              filtersList = filtersByKey[key];
              this._batman.filters[position][key] = filtersList.slice(0);
            }
          }
        }
      }
      return true;
    };

    StorageAdapter.prototype._addFilter = function() {
      var filter, key, keys, position, _base, _i, _j, _len;
      position = arguments[0], keys = 3 <= arguments.length ? __slice.call(arguments, 1, _i = arguments.length - 1) : (_i = 1, []), filter = arguments[_i++];
      this._inheritFilters();
      for (_j = 0, _len = keys.length; _j < _len; _j++) {
        key = keys[_j];
        (_base = this._batman.filters[position])[key] || (_base[key] = []);
        this._batman.filters[position][key].push(filter);
      }
      return true;
    };

    StorageAdapter.prototype.runFilter = function(position, action, env, callback) {
      var actionFilters, allFilters, filters, next,
        _this = this;
      this._inheritFilters();
      allFilters = this._batman.filters[position].all || [];
      actionFilters = this._batman.filters[position][action] || [];
      env.action = action;
      filters = position === 'before' ? actionFilters.concat(allFilters) : allFilters.concat(actionFilters);
      next = function(newEnv) {
        var nextFilter;
        if (newEnv != null) {
          env = newEnv;
        }
        if ((nextFilter = filters.shift()) != null) {
          return nextFilter.call(_this, env, next);
        } else {
          return callback.call(_this, env);
        }
      };
      return next();
    };

    StorageAdapter.prototype.runBeforeFilter = function() {
      return this.runFilter.apply(this, ['before'].concat(__slice.call(arguments)));
    };

    StorageAdapter.prototype.runAfterFilter = function(action, env, callback) {
      return this.runFilter('after', action, env, this.exportResult(callback));
    };

    StorageAdapter.prototype.exportResult = function(callback) {
      return function(env) {
        return callback(env.error, env.result, env);
      };
    };

    StorageAdapter.prototype._jsonToAttributes = function(json) {
      return JSON.parse(json);
    };

    StorageAdapter.prototype.perform = function(key, subject, options, callback) {
      var env, next,
        _this = this;
      options || (options = {});
      env = {
        options: options,
        subject: subject
      };
      next = function(newEnv) {
        if (newEnv != null) {
          env = newEnv;
        }
        return _this.runAfterFilter(key, env, callback);
      };
      this.runBeforeFilter(key, env, function(env) {
        return this[key](env, next);
      });
      return void 0;
    };

    return StorageAdapter;

  })(Batman.Object);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Batman.RestStorage = (function(_super) {
    var key, _fn, _i, _len, _ref,
      _this = this;

    __extends(RestStorage, _super);

    RestStorage.CommunicationError = (function(_super1) {
      __extends(CommunicationError, _super1);

      CommunicationError.prototype.name = 'CommunicationError';

      function CommunicationError(message) {
        CommunicationError.__super__.constructor.call(this, message || "A communication error has occurred!");
      }

      return CommunicationError;

    })(RestStorage.StorageError);

    RestStorage.JSONContentType = 'application/json';

    RestStorage.PostBodyContentType = 'application/x-www-form-urlencoded';

    RestStorage.BaseMixin = {
      request: function(action, options, callback) {
        if (!callback) {
          callback = options;
          options = {};
        }
        options.method || (options.method = 'GET');
        options.action = action;
        return this._doStorageOperation(options.method.toLowerCase(), options, callback);
      }
    };

    RestStorage.ModelMixin = Batman.extend({}, RestStorage.BaseMixin, {
      urlNestsUnder: function() {
        var key, keys, parents, _i, _len;
        keys = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        parents = {};
        for (_i = 0, _len = keys.length; _i < _len; _i++) {
          key = keys[_i];
          parents[key + '_id'] = Batman.helpers.pluralize(key);
        }
        this.url = function(options) {
          var childSegment, parentID, plural;
          childSegment = Batman.helpers.pluralize(this.get('resourceName').toLowerCase());
          for (key in parents) {
            plural = parents[key];
            parentID = options.data[key];
            if (parentID) {
              delete options.data[key];
              return "" + plural + "/" + parentID + "/" + childSegment;
            }
          }
          return childSegment;
        };
        return this.prototype.url = function() {
          var childSegment, id, parentID, plural, url;
          childSegment = Batman.helpers.pluralize(this.constructor.get('resourceName').toLowerCase());
          for (key in parents) {
            plural = parents[key];
            parentID = this.get('dirtyKeys').get(key);
            if (parentID === void 0) {
              parentID = this.get(key);
            }
            if (parentID) {
              url = "" + plural + "/" + parentID + "/" + childSegment;
              break;
            }
          }
          url || (url = childSegment);
          if (id = this.get('id')) {
            url += '/' + id;
          }
          return url;
        };
      }
    });

    RestStorage.RecordMixin = Batman.extend({}, RestStorage.BaseMixin);

    RestStorage.prototype.defaultRequestOptions = {
      type: 'json'
    };

    RestStorage.prototype._implicitActionNames = ['create', 'read', 'update', 'destroy', 'readAll'];

    RestStorage.prototype.serializeAsForm = true;

    function RestStorage() {
      RestStorage.__super__.constructor.apply(this, arguments);
      this.defaultRequestOptions = Batman.extend({}, this.defaultRequestOptions);
    }

    RestStorage.prototype.recordJsonNamespace = function(record) {
      return Batman.helpers.singularize(this.storageKey(record));
    };

    RestStorage.prototype.collectionJsonNamespace = function(constructor) {
      return Batman.helpers.pluralize(this.storageKey(constructor.prototype));
    };

    RestStorage.prototype._execWithOptions = function(object, key, options, context) {
      if (context == null) {
        context = object;
      }
      if (typeof object[key] === 'function') {
        return object[key].call(context, options);
      } else {
        return object[key];
      }
    };

    RestStorage.prototype._defaultCollectionUrl = function(model) {
      return "" + (this.storageKey(model.prototype));
    };

    RestStorage.prototype._addParams = function(url, options) {
      var _ref;
      if (options && options.action && !(_ref = options.action, __indexOf.call(this._implicitActionNames, _ref) >= 0)) {
        url += '/' + options.action.toLowerCase();
      }
      return url;
    };

    RestStorage.prototype._addUrlAffixes = function(url, subject, env) {
      var prefix, segments;
      segments = [url, this.urlSuffix(subject, env)];
      if (url.charAt(0) !== '/') {
        prefix = this.urlPrefix(subject, env);
        if (prefix.charAt(prefix.length - 1) !== '/') {
          segments.unshift('/');
        }
        segments.unshift(prefix);
      }
      return segments.join('');
    };

    RestStorage.prototype.urlPrefix = function(object, env) {
      return this._execWithOptions(object, 'urlPrefix', env.options) || '';
    };

    RestStorage.prototype.urlSuffix = function(object, env) {
      return this._execWithOptions(object, 'urlSuffix', env.options) || '';
    };

    RestStorage.prototype.urlForRecord = function(record, env) {
      var id, url, _ref;
      if ((_ref = env.options) != null ? _ref.recordUrl : void 0) {
        url = this._execWithOptions(env.options, 'recordUrl', env.options, record);
      } else if (record.url) {
        url = this._execWithOptions(record, 'url', env.options);
      } else {
        url = record.constructor.url ? this._execWithOptions(record.constructor, 'url', env.options) : this._defaultCollectionUrl(record.constructor);
        if (env.action !== 'create') {
          if ((id = record.get('id')) != null) {
            url = url + "/" + id;
          } else {
            throw new this.constructor.StorageError("Couldn't get/set record primary key on " + env.action + "!");
          }
        }
      }
      return this._addUrlAffixes(this._addParams(url, env.options), record, env);
    };

    RestStorage.prototype.urlForCollection = function(model, env) {
      var url, _ref;
      url = ((_ref = env.options) != null ? _ref.collectionUrl : void 0) ? this._execWithOptions(env.options, 'collectionUrl', env.options, env.options.urlContext) : model.url ? this._execWithOptions(model, 'url', env.options) : this._defaultCollectionUrl(model, env.options);
      return this._addUrlAffixes(this._addParams(url, env.options), model, env);
    };

    RestStorage.prototype.request = function(env, next) {
      var options;
      options = Batman.extend(env.options, {
        autosend: false,
        success: function(data) {
          return env.data = data;
        },
        error: function(error) {
          return env.error = error;
        },
        loaded: function() {
          env.response = env.request.get('response');
          return next();
        }
      });
      env.request = new Batman.Request(options);
      return env.request.send();
    };

    RestStorage.prototype.perform = function(key, record, options, callback) {
      options || (options = {});
      Batman.extend(options, this.defaultRequestOptions);
      return RestStorage.__super__.perform.call(this, key, record, options, callback);
    };

    RestStorage.prototype.before('all', RestStorage.skipIfError(function(env, next) {
      var error;
      if (!env.options.url) {
        try {
          env.options.url = env.subject.prototype ? this.urlForCollection(env.subject, env) : this.urlForRecord(env.subject, env);
        } catch (_error) {
          error = _error;
          env.error = error;
        }
      }
      return next();
    }));

    RestStorage.prototype.before('get', 'put', 'post', 'delete', RestStorage.skipIfError(function(env, next) {
      env.options.method = env.action.toUpperCase();
      return next();
    }));

    RestStorage.prototype.before('create', 'update', RestStorage.skipIfError(function(env, next) {
      var data, json, namespace;
      json = env.subject.toJSON();
      if (namespace = this.recordJsonNamespace(env.subject)) {
        data = {};
        data[namespace] = json;
      } else {
        data = json;
      }
      env.options.data = data;
      return next();
    }));

    RestStorage.prototype.before('create', 'update', 'put', 'post', RestStorage.skipIfError(function(env, next) {
      if (this.serializeAsForm) {
        env.options.contentType = this.constructor.PostBodyContentType;
      } else {
        if (env.options.data != null) {
          env.options.data = JSON.stringify(env.options.data);
          env.options.contentType = this.constructor.JSONContentType;
        }
      }
      return next();
    }));

    RestStorage.prototype.after('all', RestStorage.skipIfError(function(env, next) {
      var error, json;
      if (env.data == null) {
        return next();
      }
      if (typeof env.data === 'string') {
        if (env.data.length > 0) {
          try {
            json = this._jsonToAttributes(env.data);
          } catch (_error) {
            error = _error;
            env.error = error;
            return next();
          }
        }
      } else if (typeof env.data === 'object') {
        json = env.data;
      }
      if (json != null) {
        env.json = json;
      }
      return next();
    }));

    RestStorage.prototype.extractFromNamespace = function(data, namespace) {
      if (namespace && (data[namespace] != null)) {
        return data[namespace];
      } else {
        return data;
      }
    };

    RestStorage.prototype.after('create', 'read', 'update', RestStorage.skipIfError(function(env, next) {
      var json;
      if (env.json != null) {
        json = this.extractFromNamespace(env.json, this.recordJsonNamespace(env.subject));
        env.subject._withoutDirtyTracking(function() {
          return this.fromJSON(json);
        });
      }
      env.result = env.subject;
      return next();
    }));

    RestStorage.prototype.after('readAll', RestStorage.skipIfError(function(env, next) {
      var namespace;
      namespace = this.collectionJsonNamespace(env.subject);
      env.recordsAttributes = this.extractFromNamespace(env.json, namespace);
      if (Batman.typeOf(env.recordsAttributes) !== 'Array') {
        namespace = this.recordJsonNamespace(env.subject.prototype);
        env.recordsAttributes = [this.extractFromNamespace(env.json, namespace)];
      }
      env.result = env.records = this.getRecordsFromData(env.recordsAttributes, env.subject);
      return next();
    }));

    RestStorage.prototype.after('get', 'put', 'post', 'delete', RestStorage.skipIfError(function(env, next) {
      var namespace;
      if (env.json != null) {
        namespace = env.subject.prototype ? this.collectionJsonNamespace(env.subject) : this.recordJsonNamespace(env.subject);
        env.result = this.extractFromNamespace(env.json, namespace);
      }
      return next();
    }));

    RestStorage.HTTPMethods = {
      create: 'POST',
      update: 'PUT',
      read: 'GET',
      readAll: 'GET',
      destroy: 'DELETE'
    };

    _ref = ['create', 'read', 'update', 'destroy', 'readAll', 'get', 'post', 'put', 'delete'];
    _fn = function(key) {
      return RestStorage.prototype[key] = RestStorage.skipIfError(function(env, next) {
        var _base;
        (_base = env.options).method || (_base.method = this.constructor.HTTPMethods[key]);
        return this.request(env, next);
      });
    };
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      key = _ref[_i];
      _fn(key);
    }

    RestStorage.prototype.after('all', function(env, next) {
      if (env.error) {
        env.error = this._errorFor(env.error, env);
      }
      return next();
    });

    RestStorage._statusCodeErrors = {
      '0': RestStorage.CommunicationError,
      '403': RestStorage.NotAllowedError,
      '404': RestStorage.NotFoundError,
      '406': RestStorage.NotAcceptableError,
      '409': RestStorage.RecordExistsError,
      '422': RestStorage.UnprocessableRecordError,
      '500': RestStorage.InternalStorageError,
      '501': RestStorage.NotImplementedError
    };

    RestStorage.prototype._errorFor = function(error, env) {
      var errorClass, request;
      if (error instanceof Error || (error.request == null)) {
        return error;
      }
      if (errorClass = this.constructor._statusCodeErrors[error.request.status]) {
        request = error.request;
        error = new errorClass;
        error.request = request;
        error.env = env;
      }
      return error;
    };

    return RestStorage;

  }).call(this, Batman.StorageAdapter);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.LocalStorage = (function(_super) {
    __extends(LocalStorage, _super);

    function LocalStorage() {
      if (typeof window.localStorage === 'undefined') {
        return null;
      }
      LocalStorage.__super__.constructor.apply(this, arguments);
      this.storage = localStorage;
    }

    LocalStorage.prototype.storageRegExpForRecord = function(record) {
      return new RegExp("^" + (this.storageKey(record)) + "(\\d+)$");
    };

    LocalStorage.prototype.nextIdForRecord = function(record) {
      var nextId, re;
      re = this.storageRegExpForRecord(record);
      nextId = 1;
      this._forAllStorageEntries(function(k, v) {
        var matches;
        if (matches = re.exec(k)) {
          return nextId = Math.max(nextId, parseInt(matches[1], 10) + 1);
        }
      });
      return nextId;
    };

    LocalStorage.prototype._forAllStorageEntries = function(iterator) {
      var i, key, _i, _ref;
      for (i = _i = 0, _ref = this.storage.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        key = this.storage.key(i);
        iterator.call(this, key, this.storage.getItem(key));
      }
      return true;
    };

    LocalStorage.prototype._storageEntriesMatching = function(constructor, options) {
      var re, records;
      re = this.storageRegExpForRecord(constructor.prototype);
      records = [];
      this._forAllStorageEntries(function(storageKey, storageString) {
        var data, keyMatches;
        if (keyMatches = re.exec(storageKey)) {
          data = this._jsonToAttributes(storageString);
          data[constructor.primaryKey] = keyMatches[1];
          if (this._dataMatches(options, data)) {
            return records.push(data);
          }
        }
      });
      return records;
    };

    LocalStorage.prototype._dataMatches = function(conditions, data) {
      var k, match, v;
      match = true;
      for (k in conditions) {
        v = conditions[k];
        if (data[k] !== v) {
          match = false;
          break;
        }
      }
      return match;
    };

    LocalStorage.prototype.before('read', 'create', 'update', 'destroy', LocalStorage.skipIfError(function(env, next) {
      var _this = this;
      if (env.action === 'create') {
        env.id = env.subject.get('id') || env.subject._withoutDirtyTracking(function() {
          return env.subject.set('id', _this.nextIdForRecord(env.subject));
        });
      } else {
        env.id = env.subject.get('id');
      }
      if (env.id == null) {
        env.error = new this.constructor.StorageError("Couldn't get/set record primary key on " + env.action + "!");
      } else {
        env.key = this.storageKey(env.subject) + env.id;
      }
      return next();
    }));

    LocalStorage.prototype.before('create', 'update', LocalStorage.skipIfError(function(env, next) {
      env.recordAttributes = JSON.stringify(env.subject);
      return next();
    }));

    LocalStorage.prototype.after('read', LocalStorage.skipIfError(function(env, next) {
      var error;
      if (typeof env.recordAttributes === 'string') {
        try {
          env.recordAttributes = this._jsonToAttributes(env.recordAttributes);
        } catch (_error) {
          error = _error;
          env.error = error;
          return next();
        }
      }
      env.subject._withoutDirtyTracking(function() {
        return this.fromJSON(env.recordAttributes);
      });
      return next();
    }));

    LocalStorage.prototype.after('read', 'create', 'update', 'destroy', LocalStorage.skipIfError(function(env, next) {
      env.result = env.subject;
      return next();
    }));

    LocalStorage.prototype.after('readAll', LocalStorage.skipIfError(function(env, next) {
      env.result = env.records = this.getRecordsFromData(env.recordsAttributes, env.subject);
      return next();
    }));

    LocalStorage.prototype.read = LocalStorage.skipIfError(function(env, next) {
      env.recordAttributes = this.storage.getItem(env.key);
      if (!env.recordAttributes) {
        env.error = new this.constructor.NotFoundError();
      }
      return next();
    });

    LocalStorage.prototype.create = LocalStorage.skipIfError(function(_arg, next) {
      var key, recordAttributes;
      key = _arg.key, recordAttributes = _arg.recordAttributes;
      if (this.storage.getItem(key)) {
        arguments[0].error = new this.constructor.RecordExistsError;
      } else {
        this.storage.setItem(key, recordAttributes);
      }
      return next();
    });

    LocalStorage.prototype.update = LocalStorage.skipIfError(function(_arg, next) {
      var key, recordAttributes;
      key = _arg.key, recordAttributes = _arg.recordAttributes;
      this.storage.setItem(key, recordAttributes);
      return next();
    });

    LocalStorage.prototype.destroy = LocalStorage.skipIfError(function(_arg, next) {
      var key;
      key = _arg.key;
      this.storage.removeItem(key);
      return next();
    });

    LocalStorage.prototype.readAll = LocalStorage.skipIfError(function(env, next) {
      var error;
      try {
        arguments[0].recordsAttributes = this._storageEntriesMatching(env.subject, env.options.data);
      } catch (_error) {
        error = _error;
        arguments[0].error = error;
      }
      return next();
    });

    return LocalStorage;

  })(Batman.StorageAdapter);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.SessionStorage = (function(_super) {
    __extends(SessionStorage, _super);

    function SessionStorage() {
      if (typeof window.sessionStorage === 'undefined') {
        return null;
      }
      SessionStorage.__super__.constructor.apply(this, arguments);
      this.storage = sessionStorage;
    }

    return SessionStorage;

  })(Batman.LocalStorage);

}).call(this);

(function() {
  Batman.Encoders = new Batman.Object;

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.ParamsReplacer = (function(_super) {
    __extends(ParamsReplacer, _super);

    function ParamsReplacer(navigator, params) {
      this.navigator = navigator;
      this.params = params;
    }

    ParamsReplacer.prototype.redirect = function() {
      return this.navigator.redirect(this.toObject(), true);
    };

    ParamsReplacer.prototype.replace = function(params) {
      this.params.replace(params);
      return this.redirect();
    };

    ParamsReplacer.prototype.update = function(params) {
      this.params.update(params);
      return this.redirect();
    };

    ParamsReplacer.prototype.clear = function() {
      this.params.clear();
      return this.redirect();
    };

    ParamsReplacer.prototype.toObject = function() {
      return this.params.toObject();
    };

    ParamsReplacer.accessor({
      get: function(k) {
        return this.params.get(k);
      },
      set: function(k, v) {
        var oldValue, result;
        oldValue = this.params.get(k);
        result = this.params.set(k, v);
        if (oldValue !== v) {
          this.redirect();
        }
        return result;
      },
      unset: function(k) {
        var hadKey, result;
        hadKey = this.params.hasKey(k);
        result = this.params.unset(k);
        if (hadKey) {
          this.redirect();
        }
        return result;
      }
    });

    return ParamsReplacer;

  })(Batman.Object);

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.ParamsPusher = (function(_super) {
    __extends(ParamsPusher, _super);

    function ParamsPusher() {
      _ref = ParamsPusher.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ParamsPusher.prototype.redirect = function() {
      return this.navigator.redirect(this.toObject());
    };

    return ParamsPusher;

  })(Batman.ParamsReplacer);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.NamedRouteQuery = (function(_super) {
    __extends(NamedRouteQuery, _super);

    NamedRouteQuery.prototype.isNamedRouteQuery = true;

    function NamedRouteQuery(routeMap, args) {
      var key;
      if (args == null) {
        args = [];
      }
      NamedRouteQuery.__super__.constructor.call(this, {
        routeMap: routeMap,
        args: args
      });
      for (key in this.get('routeMap').childrenByName) {
        this[key] = this._queryAccess.bind(this, key);
      }
    }

    NamedRouteQuery.accessor('route', function() {
      var collectionRoute, memberRoute, route, _i, _len, _ref, _ref1;
      _ref = this.get('routeMap'), memberRoute = _ref.memberRoute, collectionRoute = _ref.collectionRoute;
      _ref1 = [memberRoute, collectionRoute];
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        route = _ref1[_i];
        if (route != null) {
          if (route.namedArguments.length === this.get('args').length) {
            return route;
          }
        }
      }
      return collectionRoute || memberRoute;
    });

    NamedRouteQuery.accessor('path', function() {
      return this.path();
    });

    NamedRouteQuery.accessor('routeMap', 'args', 'cardinality', 'hashValue', Batman.Property.defaultAccessor);

    NamedRouteQuery.accessor({
      get: function(key) {
        if (key == null) {
          return;
        }
        if (typeof key === 'string') {
          return this.nextQueryForName(key);
        } else {
          return this.nextQueryWithArgument(key);
        }
      },
      cache: false
    });

    NamedRouteQuery.accessor('withHash', function() {
      var _this = this;
      return new Batman.Accessible(function(hashValue) {
        return _this.withHash(hashValue);
      });
    });

    NamedRouteQuery.prototype.withHash = function(hashValue) {
      var clone;
      clone = this.clone();
      clone.set('hashValue', hashValue);
      return clone;
    };

    NamedRouteQuery.prototype.nextQueryForName = function(key) {
      var map;
      if (map = this.get('routeMap').childrenByName[key]) {
        return new Batman.NamedRouteQuery(map, this.args);
      } else {
        return Batman.developer.error("Couldn't find a route for the name " + key + "!");
      }
    };

    NamedRouteQuery.prototype.nextQueryWithArgument = function(arg) {
      var args;
      args = this.args.slice(0);
      args.push(arg);
      return this.clone(args);
    };

    NamedRouteQuery.prototype.path = function() {
      var argumentName, argumentValue, index, namedArguments, params, _i, _len;
      params = {};
      namedArguments = this.get('route.namedArguments');
      for (index = _i = 0, _len = namedArguments.length; _i < _len; index = ++_i) {
        argumentName = namedArguments[index];
        if ((argumentValue = this.get('args')[index]) != null) {
          params[argumentName] = this._toParam(argumentValue);
        }
      }
      if (this.get('hashValue') != null) {
        params['#'] = this.get('hashValue');
      }
      return this.get('route').pathFromParams(params);
    };

    NamedRouteQuery.prototype.toString = function() {
      return this.path();
    };

    NamedRouteQuery.prototype.clone = function(args) {
      if (args == null) {
        args = this.args;
      }
      return new Batman.NamedRouteQuery(this.routeMap, args);
    };

    NamedRouteQuery.prototype._toParam = function(arg) {
      if (arg instanceof Batman.AssociationProxy) {
        arg = arg.get('target');
      }
      if ((arg != null ? arg.toParam : void 0) != null) {
        return arg.toParam();
      } else {
        return arg;
      }
    };

    NamedRouteQuery.prototype._queryAccess = function(key, arg) {
      var query;
      query = this.nextQueryForName(key);
      if (arg != null) {
        query = query.nextQueryWithArgument(arg);
      }
      return query;
    };

    return NamedRouteQuery;

  })(Batman.Object);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.Dispatcher = (function(_super) {
    var ControllerDirectory, _ref;

    __extends(Dispatcher, _super);

    Dispatcher.canInferRoute = function(argument) {
      return argument instanceof Batman.Model || argument instanceof Batman.AssociationProxy || argument.prototype instanceof Batman.Model;
    };

    Dispatcher.paramsFromArgument = function(argument) {
      var resourceNameFromModel;
      resourceNameFromModel = function(model) {
        return Batman.helpers.camelize(Batman.helpers.pluralize(model.get('resourceName')), true);
      };
      if (!this.canInferRoute(argument)) {
        return argument;
      }
      if (argument instanceof Batman.Model || argument instanceof Batman.AssociationProxy) {
        if (argument.isProxy) {
          argument = argument.get('target');
        }
        if (argument != null) {
          return {
            controller: resourceNameFromModel(argument.constructor),
            action: 'show',
            id: argument.get('id')
          };
        } else {
          return {};
        }
      } else if (argument.prototype instanceof Batman.Model) {
        return {
          controller: resourceNameFromModel(argument),
          action: 'index'
        };
      } else {
        return argument;
      }
    };

    ControllerDirectory = (function(_super1) {
      __extends(ControllerDirectory, _super1);

      function ControllerDirectory() {
        _ref = ControllerDirectory.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      ControllerDirectory.accessor('__app', Batman.Property.defaultAccessor);

      ControllerDirectory.accessor(function(key) {
        return this.get("__app." + (Batman.helpers.capitalize(key)) + "Controller.sharedController");
      });

      return ControllerDirectory;

    })(Batman.Object);

    Dispatcher.accessor('controllers', function() {
      return new ControllerDirectory({
        __app: this.get('app')
      });
    });

    function Dispatcher(app, routeMap) {
      Dispatcher.__super__.constructor.call(this, {
        app: app,
        routeMap: routeMap
      });
    }

    Dispatcher.prototype.routeForParams = function(params) {
      params = this.constructor.paramsFromArgument(params);
      return this.get('routeMap').routeForParams(params);
    };

    Dispatcher.prototype.pathFromParams = function(params) {
      var _ref1;
      if (typeof params === 'string') {
        return params;
      }
      params = this.constructor.paramsFromArgument(params);
      return (_ref1 = this.routeForParams(params)) != null ? _ref1.pathFromParams(params) : void 0;
    };

    Dispatcher.prototype.dispatch = function(params, paramsMixin) {
      var error, inferredParams, path, route, _ref1, _ref2;
      inferredParams = this.constructor.paramsFromArgument(params);
      route = this.routeForParams(inferredParams);
      if (route) {
        _ref1 = route.pathAndParamsFromArgument(inferredParams), path = _ref1[0], params = _ref1[1];
        if (paramsMixin) {
          Batman.mixin(params, paramsMixin);
        }
        this.set('app.currentRoute', route);
        this.set('app.currentURL', path);
        this.get('app.currentParams').replace(params || {});
        route.dispatch(params);
      } else {
        if (Batman.typeOf(params) === 'Object' && !this.constructor.canInferRoute(params)) {
          return this.get('app.currentParams').replace(params);
        } else {
          this.get('app.currentParams').clear();
        }
        error = {
          type: '404',
          isPrevented: false,
          preventDefault: function() {
            return this.isPrevented = true;
          }
        };
        if ((_ref2 = Batman.currentApp) != null) {
          _ref2.fire('error', error);
        }
        if (error.isPrevented) {
          return params;
        }
        if (params !== '/404') {
          return Batman.redirect('/404');
        }
      }
      return path;
    };

    return Dispatcher;

  }).call(this, Batman.Object);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.Route = (function(_super) {
    __extends(Route, _super);

    Route.regexps = {
      namedParam: /:([\w\d]+)/g,
      splatParam: /\*([\w\d]+)/g,
      queryParam: '(?:\\?.+)?',
      namedOrSplat: /[:|\*]([\w\d]+)/g,
      namePrefix: '[:|\*]',
      escapeRegExp: /[-[\]{}+?.,\\^$|#\s]/g,
      openOptParam: /\(/g,
      closeOptParam: /\)/g
    };

    Route.prototype.optionKeys = ['member', 'collection'];

    Route.prototype.testKeys = ['controller', 'action'];

    Route.prototype.isRoute = true;

    function Route(templatePath, baseParams) {
      var k, matches, namedArguments, pattern, properties, regexp, regexps, _i, _len, _ref;
      regexps = this.constructor.regexps;
      if (templatePath.indexOf('/') !== 0) {
        templatePath = "/" + templatePath;
      }
      pattern = templatePath.replace(regexps.escapeRegExp, '\\$&');
      regexp = RegExp("^" + (pattern.replace(regexps.openOptParam, '(?:').replace(regexps.closeOptParam, ')?').replace(regexps.namedParam, '([^\/]+)').replace(regexps.splatParam, '(.*?)')) + regexps.queryParam + "$");
      regexps.namedOrSplat.lastIndex = 0;
      namedArguments = ((function() {
        var _results;
        _results = [];
        while (matches = regexps.namedOrSplat.exec(pattern)) {
          _results.push(matches[1]);
        }
        return _results;
      })());
      properties = {
        templatePath: templatePath,
        pattern: pattern,
        regexp: regexp,
        namedArguments: namedArguments,
        baseParams: baseParams
      };
      _ref = this.optionKeys;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        k = _ref[_i];
        properties[k] = baseParams[k];
        delete baseParams[k];
      }
      Route.__super__.constructor.call(this, properties);
    }

    Route.prototype.paramsFromPath = function(pathAndQuery) {
      var index, match, matches, name, namedArguments, params, uri, _i, _len;
      uri = new Batman.URI(pathAndQuery);
      namedArguments = this.get('namedArguments');
      params = Batman.extend({
        path: uri.path
      }, this.get('baseParams'));
      matches = this.get('regexp').exec(uri.path).slice(1);
      for (index = _i = 0, _len = matches.length; _i < _len; index = ++_i) {
        match = matches[index];
        name = namedArguments[index];
        params[name] = match;
      }
      return Batman.extend(params, uri.queryParams);
    };

    Route.prototype.pathFromParams = function(argumentParams) {
      var hash, key, name, newPath, params, path, query, regexp, regexps, _i, _j, _len, _len1, _ref, _ref1;
      params = Batman.extend({}, argumentParams);
      path = this.get('templatePath');
      regexps = this.constructor.regexps;
      _ref = this.get('namedArguments');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        name = _ref[_i];
        regexp = RegExp("" + regexps.namePrefix + name);
        newPath = path.replace(regexp, (params[name] != null ? params[name] : ''));
        if (newPath !== path) {
          delete params[name];
          path = newPath;
        }
      }
      path = path.replace(regexps.openOptParam, '').replace(regexps.closeOptParam, '').replace(/([^\/])\/+$/, '$1');
      _ref1 = this.testKeys;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        key = _ref1[_j];
        delete params[key];
      }
      if (params['#']) {
        hash = params['#'];
        delete params['#'];
      }
      query = Batman.URI.queryFromParams(params);
      if (query) {
        path += "?" + query;
      }
      if (hash) {
        path += "#" + hash;
      }
      return path;
    };

    Route.prototype.test = function(pathOrParams) {
      var key, path, value, _i, _len, _ref;
      if (typeof pathOrParams === 'string') {
        path = pathOrParams;
      } else if (pathOrParams.path != null) {
        path = pathOrParams.path;
      } else {
        path = this.pathFromParams(pathOrParams);
        _ref = this.testKeys;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          key = _ref[_i];
          if ((value = this.get(key)) != null) {
            if (pathOrParams[key] !== value) {
              return false;
            }
          }
        }
      }
      return this.get('regexp').test(path);
    };

    Route.prototype.pathAndParamsFromArgument = function(pathOrParams) {
      var params, path;
      if (typeof pathOrParams === 'string') {
        params = this.paramsFromPath(pathOrParams);
        path = pathOrParams;
      } else {
        params = pathOrParams;
        path = this.pathFromParams(pathOrParams);
      }
      return [path, params];
    };

    Route.prototype.dispatch = function(params) {
      if (!this.test(params)) {
        return false;
      }
      return this.get('callback')(params);
    };

    Route.prototype.callback = function() {
      throw new Batman.DevelopmentError("Override callback in a Route subclass");
    };

    return Route;

  })(Batman.Object);

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.ControllerActionRoute = (function(_super) {
    __extends(ControllerActionRoute, _super);

    ControllerActionRoute.prototype.optionKeys = ['member', 'collection', 'app', 'controller', 'action'];

    function ControllerActionRoute(templatePath, options) {
      this.callback = __bind(this.callback, this);
      var action, controller, _ref;
      if (options.signature) {
        _ref = options.signature.split('#'), controller = _ref[0], action = _ref[1];
        action || (action = 'index');
        options.controller = controller;
        options.action = action;
        delete options.signature;
      }
      ControllerActionRoute.__super__.constructor.call(this, templatePath, options);
    }

    ControllerActionRoute.prototype.callback = function(params) {
      var controller;
      controller = this.get("app.dispatcher.controllers." + (this.get('controller')));
      return controller.dispatch(this.get('action'), params);
    };

    return ControllerActionRoute;

  })(Batman.Route);

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.CallbackActionRoute = (function(_super) {
    __extends(CallbackActionRoute, _super);

    function CallbackActionRoute() {
      _ref = CallbackActionRoute.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    CallbackActionRoute.prototype.optionKeys = ['member', 'collection', 'callback', 'app'];

    CallbackActionRoute.prototype.controller = false;

    CallbackActionRoute.prototype.action = false;

    return CallbackActionRoute;

  })(Batman.Route);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.Hash = (function(_super) {
    var k, _fn, _i, _j, _len, _len1, _ref, _ref1,
      _this = this;

    __extends(Hash, _super);

    Hash.Metadata = (function(_super1) {
      __extends(Metadata, _super1);

      Batman.extend(Metadata.prototype, Batman.Enumerable);

      function Metadata(hash) {
        this.hash = hash;
      }

      Metadata.accessor('length', function() {
        this.hash.registerAsMutableSource();
        return this.hash.length;
      });

      Metadata.accessor('isEmpty', 'keys', 'toArray', function(key) {
        this.hash.registerAsMutableSource();
        return this.hash[key]();
      });

      Metadata.prototype.forEach = function() {
        var _ref;
        return (_ref = this.hash).forEach.apply(_ref, arguments);
      };

      return Metadata;

    })(Batman.Object);

    function Hash() {
      this.meta = new this.constructor.Metadata(this);
      Batman.SimpleHash.apply(this, arguments);
      Hash.__super__.constructor.apply(this, arguments);
    }

    Batman.extend(Hash.prototype, Batman.Enumerable);

    Hash.prototype.propertyClass = Batman.Property;

    Hash.defaultAccessor = {
      cache: false,
      get: Batman.SimpleHash.prototype.get,
      set: Hash.mutation(function(key, value) {
        var oldResult, result;
        oldResult = Batman.SimpleHash.prototype.get.call(this, key);
        result = Batman.SimpleHash.prototype.set.call(this, key, value);
        if ((oldResult != null) && oldResult !== result) {
          this.fire('itemsWereChanged', [key], [result], [oldResult]);
        } else {
          this.fire('itemsWereAdded', [key], [result]);
        }
        return result;
      }),
      unset: Hash.mutation(function(key) {
        var result;
        result = Batman.SimpleHash.prototype.unset.call(this, key);
        if (result != null) {
          this.fire('itemsWereRemoved', [key], [result]);
        }
        return result;
      })
    };

    Hash.accessor(Hash.defaultAccessor);

    Hash.prototype._preventMutationEvents = function(block) {
      this.prevent('change');
      this.prevent('itemsWereAdded');
      this.prevent('itemsWereChanged');
      this.prevent('itemsWereRemoved');
      try {
        return block.call(this);
      } finally {
        this.allow('change');
        this.allow('itemsWereAdded');
        this.allow('itemsWereChanged');
        this.allow('itemsWereRemoved');
      }
    };

    Hash.prototype.clear = Hash.mutation(function() {
      var key, keys, values;
      keys = this.keys();
      values = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = keys.length; _i < _len; _i++) {
          key = keys[_i];
          _results.push(this.get(key));
        }
        return _results;
      }).call(this);
      this._preventMutationEvents(function() {
        var _this = this;
        return this.forEach(function(k) {
          return _this.unset(k);
        });
      });
      Batman.SimpleHash.prototype.clear.call(this);
      this.fire('itemsWereRemoved', keys, values);
      return values;
    });

    Hash.prototype.update = Hash.mutation(function(object) {
      var addedKeys, addedValues, changedKeys, changedNewValues, changedOldValues;
      addedKeys = [];
      addedValues = [];
      changedKeys = [];
      changedNewValues = [];
      changedOldValues = [];
      this._preventMutationEvents(function() {
        var _this = this;
        return Batman.forEach(object, function(k, v) {
          if (_this.hasKey(k)) {
            changedKeys.push(k);
            changedOldValues.push(_this.get(k));
            return changedNewValues.push(_this.set(k, v));
          } else {
            addedKeys.push(k);
            return addedValues.push(_this.set(k, v));
          }
        });
      });
      if (addedKeys.length > 0) {
        this.fire('itemsWereAdded', addedKeys, addedValues);
      }
      if (changedKeys.length > 0) {
        return this.fire('itemsWereChanged', changedKeys, changedNewValues, changedOldValues);
      }
    });

    Hash.prototype.replace = Hash.mutation(function(object) {
      var addedKeys, addedValues, changedKeys, changedNewValues, changedOldValues, removedKeys, removedValues;
      addedKeys = [];
      addedValues = [];
      removedKeys = [];
      removedValues = [];
      changedKeys = [];
      changedOldValues = [];
      changedNewValues = [];
      this._preventMutationEvents(function() {
        var _this = this;
        this.forEach(function(k) {
          if (!Batman.objectHasKey(object, k)) {
            removedKeys.push(k);
            return removedValues.push(_this.unset(k));
          }
        });
        return Batman.forEach(object, function(k, v) {
          if (_this.hasKey(k)) {
            changedKeys.push(k);
            changedOldValues.push(_this.get(k));
            return changedNewValues.push(_this.set(k, v));
          } else {
            addedKeys.push(k);
            return addedValues.push(_this.set(k, v));
          }
        });
      });
      if (addedKeys.length > 0) {
        this.fire('itemsWereAdded', addedKeys, addedValues);
      }
      if (changedKeys.length > 0) {
        this.fire('itemsWereChanged', changedKeys, changedNewValues, changedOldValues);
      }
      if (removedKeys.length > 0) {
        return this.fire('itemsWereRemoved', removedKeys, removedValues);
      }
    });

    _ref = ['equality', 'hashKeyFor', 'objectKey', 'prefixedKey', 'unprefixedKey'];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      k = _ref[_i];
      Hash.prototype[k] = Batman.SimpleHash.prototype[k];
    }

    _ref1 = ['hasKey', 'forEach', 'isEmpty', 'keys', 'toArray', 'merge', 'toJSON', 'toObject'];
    _fn = function(k) {
      return Hash.prototype[k] = function() {
        this.registerAsMutableSource();
        return Batman.SimpleHash.prototype[k].apply(this, arguments);
      };
    };
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      k = _ref1[_j];
      _fn(k);
    }

    return Hash;

  }).call(this, Batman.Object);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.RenderCache = (function(_super) {
    __extends(RenderCache, _super);

    RenderCache.prototype.maximumLength = 4;

    function RenderCache() {
      RenderCache.__super__.constructor.apply(this, arguments);
      this.keyQueue = [];
    }

    RenderCache.prototype.viewForOptions = function(options) {
      var _this = this;
      if (Batman.config.cacheViews || options.cache || options.viewClass.prototype.cache) {
        return this.getOrSet(options, function() {
          return _this._newViewFromOptions(Batman.extend({}, options));
        });
      } else {
        return this._newViewFromOptions(options);
      }
    };

    RenderCache.prototype._newViewFromOptions = function(options) {
      return new options.viewClass(options);
    };

    RenderCache.wrapAccessor(function(core) {
      return {
        cache: false,
        get: function(key) {
          var result;
          result = core.get.call(this, key);
          if (result) {
            this._addOrBubbleKey(key);
          }
          return result;
        },
        set: function(key, value) {
          var result;
          result = core.set.apply(this, arguments);
          result.set('cached', true);
          this._addOrBubbleKey(key);
          this._evictExpiredKeys();
          return result;
        },
        unset: function(key) {
          var result;
          result = core.unset.apply(this, arguments);
          result.set('cached', false);
          this._removeKeyFromQueue(key);
          return result;
        }
      };
    });

    RenderCache.prototype.equality = function(incomingOptions, storageOptions) {
      var key;
      if (Object.keys(incomingOptions).length !== Object.keys(storageOptions).length) {
        return false;
      }
      for (key in incomingOptions) {
        if (!(key === 'view')) {
          if (incomingOptions[key] !== storageOptions[key]) {
            return false;
          }
        }
      }
      return true;
    };

    RenderCache.prototype.reset = function() {
      var key, _i, _len, _ref;
      _ref = this.keyQueue.slice(0);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        key = _ref[_i];
        this.unset(key);
      }
    };

    RenderCache.prototype._addOrBubbleKey = function(key) {
      this._removeKeyFromQueue(key);
      return this.keyQueue.unshift(key);
    };

    RenderCache.prototype._removeKeyFromQueue = function(key) {
      var index, queuedKey, _i, _len, _ref;
      _ref = this.keyQueue;
      for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
        queuedKey = _ref[index];
        if (this.equality(queuedKey, key)) {
          this.keyQueue.splice(index, 1);
          break;
        }
      }
      return key;
    };

    RenderCache.prototype._evictExpiredKeys = function() {
      var currentKeys, i, key, _i, _ref, _ref1;
      if (this.length > this.maximumLength) {
        currentKeys = this.keyQueue.slice(0);
        for (i = _i = _ref = this.maximumLength, _ref1 = currentKeys.length; _ref <= _ref1 ? _i < _ref1 : _i > _ref1; i = _ref <= _ref1 ? ++_i : --_i) {
          key = currentKeys[i];
          if (!this.get(key).isInDOM()) {
            this.unset(key);
          }
        }
      }
    };

    return RenderCache;

  })(Batman.Hash);

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    __slice = [].slice;

  Batman.Controller = (function(_super) {
    __extends(Controller, _super);

    Controller.singleton('sharedController');

    Controller.wrapAccessor('routingKey', function(core) {
      return {
        get: function() {
          if (this.routingKey != null) {
            return this.routingKey;
          } else {
            if (Batman.config.minificationErrors) {
              Batman.developer.error("Please define `routingKey` on the prototype of " + (Batman.functionName(this.constructor)) + " in order for your controller to be minification safe.");
            }
            return Batman.functionName(this.constructor).replace(/Controller$/, '');
          }
        }
      };
    });

    Controller.classMixin(Batman.LifecycleEvents);

    Controller.lifecycleEvent('action', function(options) {
      var except, normalized, only;
      if (options == null) {
        options = {};
      }
      normalized = {};
      only = Batman.typeOf(options.only) === 'String' ? [options.only] : options.only;
      except = Batman.typeOf(options.except) === 'String' ? [options.except] : options.except;
      normalized["if"] = function(params, frame) {
        var _ref, _ref1;
        if (this._afterFilterRedirect) {
          return false;
        }
        if (only && (_ref = frame.action, __indexOf.call(only, _ref) < 0)) {
          return false;
        }
        if (except && (_ref1 = frame.action, __indexOf.call(except, _ref1) >= 0)) {
          return false;
        }
        return true;
      };
      return normalized;
    });

    Controller.beforeFilter = function() {
      Batman.developer.deprecated("Batman.Controller::beforeFilter", "Please use beforeAction instead.");
      return this.beforeAction.apply(this, arguments);
    };

    Controller.afterFilter = function() {
      Batman.developer.deprecated("Batman.Controller::afterFilter", "Please use afterAction instead.");
      return this.afterAction.apply(this, arguments);
    };

    Controller.afterAction(function(params) {
      if (this.autoScrollToHash && (params['#'] != null)) {
        return this.scrollToHash(params['#']);
      }
    });

    Controller.catchError = function() {
      var currentHandlers, error, errors, handlers, options, _base, _i, _j, _len, _results;
      errors = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), options = arguments[_i++];
      Batman.initializeObject(this);
      (_base = this._batman).errorHandlers || (_base.errorHandlers = new Batman.SimpleHash);
      handlers = Batman.typeOf(options["with"]) === 'Array' ? options["with"] : [options["with"]];
      _results = [];
      for (_j = 0, _len = errors.length; _j < _len; _j++) {
        error = errors[_j];
        currentHandlers = this._batman.errorHandlers.get(error) || [];
        _results.push(this._batman.errorHandlers.set(error, currentHandlers.concat(handlers)));
      }
      return _results;
    };

    Controller.prototype.errorHandler = function(callback) {
      var errorFrame, _ref,
        _this = this;
      errorFrame = (_ref = this._actionFrames) != null ? _ref[this._actionFrames.length - 1] : void 0;
      return function(err, result, env) {
        if (err) {
          if (errorFrame != null ? errorFrame.error : void 0) {
            return;
          }
          if (errorFrame != null) {
            errorFrame.error = err;
          }
          if (!_this.handleError(err)) {
            throw err;
          }
        } else {
          return typeof callback === "function" ? callback(result, env) : void 0;
        }
      };
    };

    Controller.prototype.handleError = function(error) {
      var handled, _ref,
        _this = this;
      handled = false;
      if ((_ref = this.constructor._batman.getAll('errorHandlers')) != null) {
        _ref.forEach(function(hash) {
          return hash.forEach(function(key, value) {
            var handler, _i, _len, _results;
            if (error instanceof key) {
              handled = true;
              _results = [];
              for (_i = 0, _len = value.length; _i < _len; _i++) {
                handler = value[_i];
                _results.push(handler.call(_this, error));
              }
              return _results;
            }
          });
        });
      }
      return handled;
    };

    function Controller() {
      this.redirect = __bind(this.redirect, this);
      this.handleError = __bind(this.handleError, this);
      this.errorHandler = __bind(this.errorHandler, this);
      Controller.__super__.constructor.apply(this, arguments);
      this._resetActionFrames();
    }

    Controller.prototype.renderCache = new Batman.RenderCache;

    Controller.prototype.defaultRenderYield = 'main';

    Controller.prototype.autoScrollToHash = true;

    Controller.prototype.dispatch = function(action, params) {
      var redirectTo;
      if (params == null) {
        params = {};
      }
      params.controller || (params.controller = this.get('routingKey'));
      params.action || (params.action = action);
      params.target || (params.target = this);
      this._resetActionFrames();
      this.set('action', action);
      this.set('params', params);
      this.executeAction(action, params);
      redirectTo = this._afterFilterRedirect;
      this._afterFilterRedirect = null;
      delete this._afterFilterRedirect;
      if (redirectTo) {
        return Batman.redirect(redirectTo);
      }
    };

    Controller.prototype.executeAction = function(action, params) {
      var frame, oldRedirect, parentFrame, result, _ref, _ref1,
        _this = this;
      if (params == null) {
        params = this.get('params');
      }
      Batman.developer.assert(this[action], "Error! Controller action " + (this.get('routingKey')) + "." + action + " couldn't be found!");
      parentFrame = this._actionFrames[this._actionFrames.length - 1];
      frame = new Batman.ControllerActionFrame({
        parentFrame: parentFrame,
        action: action,
        params: params
      }, function() {
        var _ref;
        if (!_this._afterFilterRedirect) {
          _this.fireLifecycleEvent('afterAction', frame.params, frame);
        }
        _this._resetActionFrames();
        return (_ref = Batman.navigator) != null ? _ref.redirect = oldRedirect : void 0;
      });
      this._actionFrames.push(frame);
      frame.startOperation({
        internal: true
      });
      oldRedirect = (_ref = Batman.navigator) != null ? _ref.redirect : void 0;
      if ((_ref1 = Batman.navigator) != null) {
        _ref1.redirect = this.redirect;
      }
      if (this.fireLifecycleEvent('beforeAction', frame.params, frame) !== false) {
        if (!this._afterFilterRedirect) {
          result = this[action](params);
        }
        if (!frame.operationOccurred) {
          this.render();
        }
      }
      frame.finishOperation();
      return result;
    };

    Controller.prototype.redirect = function(url) {
      var frame;
      frame = this._actionFrames[this._actionFrames.length - 1];
      if (frame) {
        if (frame.operationOccurred) {
          Batman.developer.warn("Warning! Trying to redirect but an action has already been taken during " + (this.get('routingKey')) + "." + (frame.action || this.get('action')));
          return;
        }
        frame.startAndFinishOperation();
        if (this._afterFilterRedirect != null) {
          return Batman.developer.warn("Warning! Multiple actions trying to redirect!");
        } else {
          return this._afterFilterRedirect = url;
        }
      } else {
        if (Batman.typeOf(url) === 'Object') {
          if (!url.controller) {
            url.controller = this;
          }
        }
        return Batman.redirect(url);
      }
    };

    Controller.prototype.render = function(options) {
      var action, frame, view, yieldContentView, yieldName, _ref, _ref1, _ref2, _ref3;
      if (options == null) {
        options = {};
      }
      if (frame = (_ref = this._actionFrames) != null ? _ref[this._actionFrames.length - 1] : void 0) {
        frame.startOperation();
      }
      if (options === false) {
        frame.finishOperation();
        return;
      }
      action = (frame != null ? frame.action : void 0) || this.get('action');
      if (view = options.view) {
        options.view = null;
      } else {
        options.viewClass || (options.viewClass = this._viewClassForAction(action));
        options.source || (options.source = Batman.helpers.underscore(this.get('routingKey') + '/' + action));
        view = this.renderCache.viewForOptions(options);
      }
      if (view) {
        view.once('viewDidAppear', function() {
          return frame != null ? frame.finishOperation() : void 0;
        });
        yieldName = options.into || this.defaultRenderYield;
        if (yieldContentView = Batman.DOM.Yield.withName(yieldName).contentView) {
          if (yieldContentView !== view && !yieldContentView.isDead) {
            yieldContentView.die();
          }
        }
        if (!view.contentFor && !view.parentNode) {
          view.set('contentFor', yieldName);
        }
        view.set('controller', this);
        if ((_ref1 = Batman.currentApp) != null) {
          if ((_ref2 = _ref1.layout) != null) {
            if ((_ref3 = _ref2.subviews) != null) {
              _ref3.add(view);
            }
          }
        }
        this.set('currentView', view);
      }
      return view;
    };

    Controller.prototype.scrollToHash = function(hash) {
      if (hash == null) {
        hash = this.get('params')['#'];
      }
      return Batman.DOM.scrollIntoView(hash);
    };

    Controller.prototype._resetActionFrames = function() {
      return this._actionFrames = [];
    };

    Controller.prototype._viewClassForAction = function(action) {
      var classPrefix, _ref;
      classPrefix = this.get('routingKey').replace('/', '_');
      return ((_ref = Batman.currentApp) != null ? _ref[Batman.helpers.camelize("" + classPrefix + "_" + action + "_view")] : void 0) || Batman.View;
    };

    return Controller;

  })(Batman.Object);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.Set = (function(_super) {
    var k, _fn, _i, _j, _len, _len1, _ref, _ref1,
      _this = this;

    __extends(Set, _super);

    Set.prototype.isCollectionEventEmitter = true;

    function Set() {
      Batman.SimpleSet.apply(this, arguments);
    }

    Batman.extend(Set.prototype, Batman.Enumerable);

    Set._applySetAccessors = function(klass) {
      var accessor, accessors, key;
      accessors = {
        first: function() {
          return this.toArray()[0];
        },
        last: function() {
          return this.toArray()[this.length - 1];
        },
        isEmpty: function() {
          return this.isEmpty();
        },
        toArray: function() {
          return this.toArray();
        },
        length: function() {
          this.registerAsMutableSource();
          return this.length;
        },
        indexedBy: function() {
          var _this = this;
          return new Batman.TerminalAccessible(function(key) {
            return _this.indexedBy(key);
          });
        },
        indexedByUnique: function() {
          var _this = this;
          return new Batman.TerminalAccessible(function(key) {
            return _this.indexedByUnique(key);
          });
        },
        sortedBy: function() {
          var _this = this;
          return new Batman.TerminalAccessible(function(key) {
            return _this.sortedBy(key);
          });
        },
        sortedByDescending: function() {
          var _this = this;
          return new Batman.TerminalAccessible(function(key) {
            return _this.sortedBy(key, 'desc');
          });
        }
      };
      for (key in accessors) {
        accessor = accessors[key];
        klass.accessor(key, accessor);
      }
    };

    Set._applySetAccessors(Set);

    _ref = ['indexedBy', 'indexedByUnique', 'sortedBy', 'equality', '_indexOfItem'];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      k = _ref[_i];
      Set.prototype[k] = Batman.SimpleSet.prototype[k];
    }

    _ref1 = ['at', 'find', 'merge', 'forEach', 'toArray', 'isEmpty', 'has'];
    _fn = function(k) {
      return Set.prototype[k] = function() {
        this.registerAsMutableSource();
        return Batman.SimpleSet.prototype[k].apply(this, arguments);
      };
    };
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      k = _ref1[_j];
      _fn(k);
    }

    Set.prototype.toJSON = Set.prototype.toArray;

    Set.prototype.add = Set.mutation(function() {
      var addedItems;
      addedItems = Batman.SimpleSet.prototype.add.apply(this, arguments);
      if (addedItems.length) {
        this.fire('itemsWereAdded', addedItems);
      }
      return addedItems;
    });

    Set.prototype.insert = function() {
      return this.insertWithIndexes.apply(this, arguments).addedItems;
    };

    Set.prototype.insertWithIndexes = Set.mutation(function() {
      var addedIndexes, addedItems, _ref2;
      _ref2 = Batman.SimpleSet.prototype.insertWithIndexes.apply(this, arguments), addedItems = _ref2.addedItems, addedIndexes = _ref2.addedIndexes;
      if (addedItems.length) {
        this.fire('itemsWereAdded', addedItems, addedIndexes);
      }
      return {
        addedItems: addedItems,
        addedIndexes: addedIndexes
      };
    });

    Set.prototype.remove = function() {
      return this.removeWithIndexes.apply(this, arguments).removedItems;
    };

    Set.prototype.removeWithIndexes = Set.mutation(function() {
      var removedIndexes, removedItems, _ref2;
      _ref2 = Batman.SimpleSet.prototype.removeWithIndexes.apply(this, arguments), removedItems = _ref2.removedItems, removedIndexes = _ref2.removedIndexes;
      if (removedItems.length) {
        this.fire('itemsWereRemoved', removedItems, removedIndexes);
      }
      return {
        removedItems: removedItems,
        removedIndexes: removedIndexes
      };
    });

    Set.prototype.clear = Set.mutation(function() {
      var removedItems;
      removedItems = Batman.SimpleSet.prototype.clear.call(this);
      if (removedItems.length) {
        this.fire('itemsWereRemoved', removedItems);
      }
      return removedItems;
    });

    Set.prototype.replace = Set.mutation(function(other) {
      var addedItems, removedItems;
      removedItems = Batman.SimpleSet.prototype.clear.call(this);
      addedItems = Batman.SimpleSet.prototype.add.apply(this, other.toArray());
      if (removedItems.length) {
        this.fire('itemsWereRemoved', removedItems);
      }
      if (addedItems.length) {
        return this.fire('itemsWereAdded', addedItems);
      }
    });

    return Set;

  }).call(this, Batman.Object);

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.ErrorsSet = (function(_super) {
    __extends(ErrorsSet, _super);

    function ErrorsSet() {
      _ref = ErrorsSet.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ErrorsSet.accessor(function(key) {
      return this.indexedBy('attribute').get(key);
    });

    ErrorsSet.prototype.add = function(key, error) {
      return ErrorsSet.__super__.add.call(this, new Batman.ValidationError(key, error));
    };

    return ErrorsSet;

  })(Batman.Set);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.SetProxy = (function(_super) {
    var k, _fn, _i, _len, _ref,
      _this = this;

    __extends(SetProxy, _super);

    function SetProxy(base) {
      this.base = base;
      SetProxy.__super__.constructor.call(this);
      this.length = this.base.length;
      if (this.base.isCollectionEventEmitter) {
        this.isCollectionEventEmitter = true;
        this._setObserver = new Batman.SetObserver(this.base);
        this._setObserver.on('itemsWereAdded', this._handleItemsAdded.bind(this));
        this._setObserver.on('itemsWereRemoved', this._handleItemsRemoved.bind(this));
        this.startObserving();
      }
    }

    Batman.extend(SetProxy.prototype, Batman.Enumerable);

    SetProxy.prototype.startObserving = function() {
      var _ref;
      return (_ref = this._setObserver) != null ? _ref.startObserving() : void 0;
    };

    SetProxy.prototype.stopObserving = function() {
      var _ref;
      return (_ref = this._setObserver) != null ? _ref.stopObserving() : void 0;
    };

    SetProxy.prototype._handleItemsAdded = function(items, indexes) {
      this.set('length', this.base.length);
      return this.fire('itemsWereAdded', items, indexes);
    };

    SetProxy.prototype._handleItemsRemoved = function(items, indexes) {
      this.set('length', this.base.length);
      return this.fire('itemsWereRemoved', items, indexes);
    };

    SetProxy.prototype.filter = function(f) {
      return this.reduce(function(accumulator, element) {
        if (f(element)) {
          accumulator.add(element);
        }
        return accumulator;
      }, new Batman.Set());
    };

    SetProxy.prototype.replace = function() {
      var length, result;
      length = this.property('length');
      length.isolate();
      result = this.base.replace.apply(this.base, arguments);
      length.expose();
      return result;
    };

    Batman.Set._applySetAccessors(SetProxy);

    _ref = ['add', 'insert', 'insertWithIndexes', 'remove', 'removeWithIndexes', 'at', 'find', 'clear', 'has', 'merge', 'toArray', 'isEmpty', 'indexedBy', 'indexedByUnique', 'sortedBy'];
    _fn = function(k) {
      return SetProxy.prototype[k] = function() {
        return this.base[k].apply(this.base, arguments);
      };
    };
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      k = _ref[_i];
      _fn(k);
    }

    SetProxy.accessor('length', {
      get: function() {
        this.registerAsMutableSource();
        return this.length;
      },
      set: function(_, v) {
        return this.length = v;
      }
    });

    return SetProxy;

  }).call(this, Batman.Object);

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  Batman.BinarySetOperation = (function(_super) {
    __extends(BinarySetOperation, _super);

    function BinarySetOperation(left, right) {
      this.left = left;
      this.right = right;
      this._setup = __bind(this._setup, this);
      BinarySetOperation.__super__.constructor.call(this);
      this._setup(this.left, this.right);
      this._setup(this.right, this.left);
    }

    BinarySetOperation.prototype._setup = function(set, opposite) {
      var _this = this;
      set.on('itemsWereAdded', function(items) {
        return _this._itemsWereAddedToSource.apply(_this, [set, opposite].concat(__slice.call(items)));
      });
      set.on('itemsWereRemoved', function(items) {
        return _this._itemsWereRemovedFromSource.apply(_this, [set, opposite].concat(__slice.call(items)));
      });
      return this._itemsWereAddedToSource.apply(this, [set, opposite].concat(__slice.call(set.toArray())));
    };

    BinarySetOperation.prototype.merge = function() {
      var merged, others, set, _i, _len;
      others = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      merged = new Batman.Set;
      others.unshift(this);
      for (_i = 0, _len = others.length; _i < _len; _i++) {
        set = others[_i];
        set.forEach(function(v) {
          return merged.add(v);
        });
      }
      return merged;
    };

    BinarySetOperation.prototype.filter = Batman.SetProxy.prototype.filter;

    return BinarySetOperation;

  })(Batman.Set);

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  Batman.SetUnion = (function(_super) {
    __extends(SetUnion, _super);

    function SetUnion() {
      _ref = SetUnion.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    SetUnion.prototype._itemsWereAddedToSource = function() {
      var items, opposite, source;
      source = arguments[0], opposite = arguments[1], items = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
      return this.add.apply(this, items);
    };

    SetUnion.prototype._itemsWereRemovedFromSource = function() {
      var item, items, itemsToRemove, opposite, source;
      source = arguments[0], opposite = arguments[1], items = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
      itemsToRemove = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = items.length; _i < _len; _i++) {
          item = items[_i];
          if (!opposite.has(item)) {
            _results.push(item);
          }
        }
        return _results;
      })();
      return this.remove.apply(this, itemsToRemove);
    };

    return SetUnion;

  })(Batman.BinarySetOperation);

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  Batman.SetIntersection = (function(_super) {
    __extends(SetIntersection, _super);

    function SetIntersection() {
      _ref = SetIntersection.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    SetIntersection.prototype._itemsWereAddedToSource = function() {
      var item, items, itemsToAdd, opposite, source;
      source = arguments[0], opposite = arguments[1], items = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
      itemsToAdd = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = items.length; _i < _len; _i++) {
          item = items[_i];
          if (opposite.has(item)) {
            _results.push(item);
          }
        }
        return _results;
      })();
      if (itemsToAdd.length > 0) {
        return this.add.apply(this, itemsToAdd);
      }
    };

    SetIntersection.prototype._itemsWereRemovedFromSource = function() {
      var items, opposite, source;
      source = arguments[0], opposite = arguments[1], items = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
      return this.remove.apply(this, items);
    };

    return SetIntersection;

  })(Batman.BinarySetOperation);

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  Batman.SetComplement = (function(_super) {
    __extends(SetComplement, _super);

    function SetComplement() {
      _ref = SetComplement.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    SetComplement.prototype._itemsWereAddedToSource = function() {
      var item, items, itemsToAdd, itemsToRemove, opposite, source;
      source = arguments[0], opposite = arguments[1], items = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
      if (source === this.left) {
        itemsToAdd = (function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = items.length; _i < _len; _i++) {
            item = items[_i];
            if (!opposite.has(item)) {
              _results.push(item);
            }
          }
          return _results;
        })();
        if (itemsToAdd.length > 0) {
          return this.add.apply(this, itemsToAdd);
        }
      } else {
        itemsToRemove = (function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = items.length; _i < _len; _i++) {
            item = items[_i];
            if (opposite.has(item)) {
              _results.push(item);
            }
          }
          return _results;
        })();
        if (itemsToRemove.length > 0) {
          return this.remove.apply(this, itemsToRemove);
        }
      }
    };

    SetComplement.prototype._itemsWereRemovedFromSource = function() {
      var item, items, itemsToAdd, opposite, source;
      source = arguments[0], opposite = arguments[1], items = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
      if (source === this.left) {
        return this.remove.apply(this, items);
      } else {
        itemsToAdd = (function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = items.length; _i < _len; _i++) {
            item = items[_i];
            if (opposite.has(item)) {
              _results.push(item);
            }
          }
          return _results;
        })();
        if (itemsToAdd.length > 0) {
          return this.add.apply(this, itemsToAdd);
        }
      }
    };

    SetComplement.prototype._addComplement = function(items, opposite) {
      var item, itemsToAdd;
      itemsToAdd = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = items.length; _i < _len; _i++) {
          item = items[_i];
          if (opposite.has(item)) {
            _results.push(item);
          }
        }
        return _results;
      })();
      if (itemsToAdd.length > 0) {
        return this.add.apply(this, itemsToAdd);
      }
    };

    return SetComplement;

  })(Batman.BinarySetOperation);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  Batman.StateMachine = (function(_super) {
    __extends(StateMachine, _super);

    StateMachine.InvalidTransitionError = function(message) {
      this.message = message != null ? message : "";
    };

    StateMachine.InvalidTransitionError.prototype = new Error;

    StateMachine.transitions = function(table) {
      var definePredicate, fromState, k, object, predicateKeys, toState, transitions, v, _fn, _ref,
        _this = this;
      for (k in table) {
        v = table[k];
        if (!(v.from && v.to)) {
          continue;
        }
        object = {};
        if (v.from.forEach) {
          v.from.forEach(function(fromKey) {
            return object[fromKey] = v.to;
          });
        } else {
          object[v.from] = v.to;
        }
        table[k] = object;
      }
      this.prototype.transitionTable = Batman.extend({}, this.prototype.transitionTable, table);
      predicateKeys = [];
      definePredicate = function(state) {
        var key;
        key = "is" + (Batman.helpers.capitalize(state));
        if (_this.prototype[key] != null) {
          return;
        }
        predicateKeys.push(key);
        return _this.prototype[key] = function() {
          return this.get('state') === state;
        };
      };
      _ref = this.prototype.transitionTable;
      _fn = function(k) {
        return _this.prototype[k] = function() {
          return this.startTransition(k);
        };
      };
      for (k in _ref) {
        transitions = _ref[k];
        if (!(!this.prototype[k])) {
          continue;
        }
        _fn(k);
        for (fromState in transitions) {
          toState = transitions[fromState];
          definePredicate(fromState);
          definePredicate(toState);
        }
      }
      if (predicateKeys.length) {
        this.accessor.apply(this, __slice.call(predicateKeys).concat([function(key) {
          return this[key]();
        }]));
      }
      return this;
    };

    function StateMachine(startState) {
      this.nextEvents = [];
      this.set('_state', startState);
    }

    StateMachine.accessor('state', function() {
      return this.get('_state');
    });

    StateMachine.prototype.isTransitioning = false;

    StateMachine.prototype.transitionTable = {};

    StateMachine.prototype._transitionEvent = function(from, into) {
      return "" + from + "->" + into;
    };

    StateMachine.prototype._enterEvent = function(into) {
      return "enter " + into;
    };

    StateMachine.prototype._exitEvent = function(from) {
      return "exit " + from;
    };

    StateMachine.prototype._beforeEvent = function(into) {
      return "before " + into;
    };

    StateMachine.prototype.onTransition = function(from, into, callback) {
      return this.on(this._transitionEvent(from, into), callback);
    };

    StateMachine.prototype.onEnter = function(into, callback) {
      return this.on(this._enterEvent(into), callback);
    };

    StateMachine.prototype.onExit = function(from, callback) {
      return this.on(this._exitEvent(from), callback);
    };

    StateMachine.prototype.onBefore = function(into, callback) {
      return this.on(this._beforeEvent(into), callback);
    };

    StateMachine.prototype.offTransition = function(from, into, callback) {
      return this.off(this._transitionEvent(from, into), callback);
    };

    StateMachine.prototype.offEnter = function(into, callback) {
      return this.off(this._enterEvent(into), callback);
    };

    StateMachine.prototype.offExit = function(from, callback) {
      return this.off(this._exitEvent(from), callback);
    };

    StateMachine.prototype.offBefore = function(into, callback) {
      return this.off(this._beforeEvent(into), callback);
    };

    StateMachine.prototype.startTransition = Batman.Property.wrapTrackingPrevention(function(event) {
      var nextState, previousState;
      if (this.isTransitioning) {
        this.nextEvents.push(event);
        return;
      }
      previousState = this.get('state');
      nextState = this.nextStateForEvent(event);
      if (!nextState) {
        return false;
      }
      this.fire(this._beforeEvent(nextState));
      this.isTransitioning = true;
      this.fire(this._exitEvent(previousState));
      this.set('_state', nextState);
      this.fire(this._transitionEvent(previousState, nextState));
      this.fire(this._enterEvent(nextState));
      this.fire(event);
      this.isTransitioning = false;
      if (this.nextEvents.length > 0) {
        this.startTransition(this.nextEvents.shift());
      }
      return true;
    });

    StateMachine.prototype.canStartTransition = function(event, fromState) {
      if (fromState == null) {
        fromState = this.get('state');
      }
      return !!this.nextStateForEvent(event, fromState);
    };

    StateMachine.prototype.nextStateForEvent = function(event, fromState) {
      var _ref;
      if (fromState == null) {
        fromState = this.get('state');
      }
      return (_ref = this.transitionTable[event]) != null ? _ref[fromState] : void 0;
    };

    return StateMachine;

  })(Batman.Object);

  Batman.DelegatingStateMachine = (function(_super) {
    __extends(DelegatingStateMachine, _super);

    function DelegatingStateMachine(startState, base) {
      this.base = base;
      DelegatingStateMachine.__super__.constructor.call(this, startState);
    }

    DelegatingStateMachine.prototype.fire = function() {
      var result, _ref;
      result = DelegatingStateMachine.__super__.fire.apply(this, arguments);
      (_ref = this.base).fire.apply(_ref, arguments);
      return result;
    };

    return DelegatingStateMachine;

  })(Batman.StateMachine);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  Batman.Model = (function(_super) {
    var functionName, _i, _j, _len, _len1, _ref, _ref1, _ref2;

    __extends(Model, _super);

    Model.storageKey = null;

    Model.primaryKey = 'id';

    Model.persist = function() {
      var mechanism, options;
      mechanism = arguments[0], options = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      Batman.initializeObject(this.prototype);
      mechanism = mechanism.isStorageAdapter ? mechanism : new mechanism(this);
      if (options.length > 0) {
        Batman.mixin.apply(Batman, [mechanism].concat(__slice.call(options)));
      }
      this.prototype._batman.storage = mechanism;
      return mechanism;
    };

    Model.storageAdapter = function() {
      Batman.initializeObject(this.prototype);
      return this.prototype._batman.storage;
    };

    Model.encode = function() {
      var encoder, encoderForKey, encoderOrLastKey, key, keys, _base, _i, _j, _len;
      keys = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), encoderOrLastKey = arguments[_i++];
      Batman.initializeObject(this.prototype);
      (_base = this.prototype._batman).encoders || (_base.encoders = new Batman.SimpleHash);
      encoder = {};
      switch (Batman.typeOf(encoderOrLastKey)) {
        case 'String':
          keys.push(encoderOrLastKey);
          break;
        case 'Function':
          encoder.encode = encoderOrLastKey;
          break;
        default:
          encoder = encoderOrLastKey;
      }
      for (_j = 0, _len = keys.length; _j < _len; _j++) {
        key = keys[_j];
        encoderForKey = Batman.extend({
          as: key
        }, this.defaultEncoder, encoder);
        this.prototype._batman.encoders.set(key, encoderForKey);
      }
    };

    Model.defaultEncoder = {
      encode: function(x) {
        return x;
      },
      decode: function(x) {
        return x;
      }
    };

    Model.observeAndFire('primaryKey', function(newPrimaryKey, oldPrimaryKey) {
      this.encode(oldPrimaryKey, {
        encode: false,
        decode: false
      });
      return this.encode(newPrimaryKey, {
        encode: false,
        decode: this.defaultEncoder.decode
      });
    });

    Model.validate = function() {
      var keys, matches, optionsOrFunction, validatorClass, validators, _base, _i, _j, _len, _ref;
      keys = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), optionsOrFunction = arguments[_i++];
      Batman.initializeObject(this.prototype);
      validators = (_base = this.prototype._batman).validators || (_base.validators = []);
      if (typeof optionsOrFunction === 'function') {
        validators.push({
          keys: keys,
          callback: optionsOrFunction
        });
      } else {
        _ref = Batman.Validators;
        for (_j = 0, _len = _ref.length; _j < _len; _j++) {
          validatorClass = _ref[_j];
          if ((matches = validatorClass.matches(optionsOrFunction))) {
            validators.push({
              keys: keys,
              validator: new validatorClass(matches)
            });
          }
        }
      }
    };

    Model.classAccessor('resourceName', {
      get: function() {
        if (this.resourceName != null) {
          return this.resourceName;
        } else if (this.prototype.resourceName != null) {
          if (Batman.config.minificationErrors) {
            Batman.developer.error("Please define the resourceName property of the " + (Batman.functionName(this)) + " on the constructor and not the prototype.");
          }
          return this.prototype.resourceName;
        } else {
          if (Batman.config.minificationErrors) {
            Batman.developer.error("Please define " + (Batman.functionName(this)) + ".resourceName in order for your model to be minification safe.");
          }
          return Batman.helpers.underscore(Batman.functionName(this));
        }
      }
    });

    Model.classAccessor('all', {
      get: function() {
        this._batman.check(this);
        if (this.prototype.hasStorage() && !this._batman.allLoadTriggered) {
          this.load();
          this._batman.allLoadTriggered = true;
        }
        return this.get('loaded');
      },
      set: function(k, v) {
        return this.set('loaded', v);
      }
    });

    Model.classAccessor('loaded', {
      get: function() {
        return this._loaded || (this._loaded = new Batman.Set);
      },
      set: function(k, v) {
        return this._loaded = v;
      }
    });

    Model.classAccessor('first', function() {
      return this.get('all').toArray()[0];
    });

    Model.classAccessor('last', function() {
      var x;
      x = this.get('all').toArray();
      return x[x.length - 1];
    });

    Model.clear = function() {
      var result, _ref;
      Batman.initializeObject(this);
      result = this.get('loaded').clear();
      if ((_ref = this._batman.get('associations')) != null) {
        _ref.reset();
      }
      this._resetPromises();
      return result;
    };

    Model.find = function(id, callback) {
      return this.findWithOptions(id, void 0, callback);
    };

    Model.findWithOptions = function(id, options, callback) {
      var record;
      if (options == null) {
        options = {};
      }
      Batman.developer.assert(callback, "Must call find with a callback!");
      record = new this;
      record._withoutDirtyTracking(function() {
        return this.set('id', id);
      });
      record.loadWithOptions(options, callback);
      return record;
    };

    Model.load = function(options, callback) {
      var _ref;
      if ((_ref = typeof options) === 'function' || _ref === 'undefined') {
        callback = options;
        options = {};
      } else {
        options = {
          data: options
        };
      }
      return this.loadWithOptions(options, callback);
    };

    Model.loadWithOptions = function(options, callback) {
      var _this = this;
      this.fire('loading', options);
      return this._doStorageOperation('readAll', options, function(err, records, env) {
        if (err != null) {
          _this.fire('error', err);
          return typeof callback === "function" ? callback(err, []) : void 0;
        } else {
          _this.fire('loaded', records, env);
          return typeof callback === "function" ? callback(err, records, env) : void 0;
        }
      });
    };

    Model.create = function(attrs, callback) {
      var record, _ref;
      if (!callback) {
        _ref = [{}, attrs], attrs = _ref[0], callback = _ref[1];
      }
      record = new this(attrs);
      record.save(callback);
      return record;
    };

    Model.findOrCreate = function(attrs, callback) {
      var record;
      record = this._loadIdentity(attrs[this.primaryKey]);
      if (record) {
        record.mixin(attrs);
        callback(void 0, record);
      } else {
        record = new this(attrs);
        record.save(callback);
      }
      return record;
    };

    Model.createFromJSON = function(json) {
      return this._makeOrFindRecordFromData(json);
    };

    Model._loadIdentity = function(id) {
      return this.get('loaded.indexedByUnique.id').get(id);
    };

    Model._loadRecord = function(attributes) {
      var id, record;
      if (id = attributes[this.primaryKey]) {
        record = this._loadIdentity(id);
      }
      record || (record = new this);
      record._withoutDirtyTracking(function() {
        return this.fromJSON(attributes);
      });
      return record;
    };

    Model._makeOrFindRecordFromData = function(attributes) {
      var record;
      record = this._loadRecord(attributes);
      return this._mapIdentity(record);
    };

    Model._makeOrFindRecordsFromData = function(attributeSet) {
      var attributes, newRecords;
      newRecords = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = attributeSet.length; _i < _len; _i++) {
          attributes = attributeSet[_i];
          _results.push(this._loadRecord(attributes));
        }
        return _results;
      }).call(this);
      this._mapIdentities(newRecords);
      return newRecords;
    };

    Model._mapIdentity = function(record) {
      var existing, id, lifecycle;
      if ((id = record.get('id')) != null) {
        if (existing = this._loadIdentity(id)) {
          lifecycle = existing.get('lifecycle');
          lifecycle.load();
          existing._withoutDirtyTracking(function() {
            var attributes, _ref;
            attributes = (_ref = record.get('attributes')) != null ? _ref.toObject() : void 0;
            if (attributes) {
              return this.mixin(attributes);
            }
          });
          lifecycle.loaded();
          record = existing;
        } else {
          this.get('loaded').add(record);
        }
      }
      return record;
    };

    Model._mapIdentities = function(records) {
      var existing, id, index, lifecycle, newRecords, record, _i, _len, _ref;
      newRecords = [];
      for (index = _i = 0, _len = records.length; _i < _len; index = ++_i) {
        record = records[index];
        if ((id = record.get('id')) == null) {
          continue;
        } else if (existing = this._loadIdentity(id)) {
          lifecycle = existing.get('lifecycle');
          lifecycle.load();
          existing._withoutDirtyTracking(function() {
            var attributes, _ref;
            attributes = (_ref = record.get('attributes')) != null ? _ref.toObject() : void 0;
            if (attributes) {
              return this.mixin(attributes);
            }
          });
          lifecycle.loaded();
          records[index] = existing;
        } else {
          newRecords.push(record);
        }
      }
      if (newRecords.length) {
        (_ref = this.get('loaded')).add.apply(_ref, newRecords);
      }
      return records;
    };

    Model._doStorageOperation = function(operation, options, callback) {
      var adapter;
      Batman.developer.assert(this.prototype.hasStorage(), "Can't " + operation + " model " + (Batman.functionName(this.constructor)) + " without any storage adapters!");
      adapter = this.prototype._batman.get('storage');
      return adapter.perform(operation, this, options, callback);
    };

    _ref = ['find', 'load', 'create'];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      functionName = _ref[_i];
      Model[functionName] = Batman.Property.wrapTrackingPrevention(Model[functionName]);
    }

    Model.InstanceLifecycleStateMachine = (function(_super1) {
      __extends(InstanceLifecycleStateMachine, _super1);

      function InstanceLifecycleStateMachine() {
        _ref1 = InstanceLifecycleStateMachine.__super__.constructor.apply(this, arguments);
        return _ref1;
      }

      InstanceLifecycleStateMachine.transitions({
        load: {
          from: ['dirty', 'clean'],
          to: 'loading'
        },
        create: {
          from: ['dirty', 'clean'],
          to: 'creating'
        },
        save: {
          from: ['dirty', 'clean'],
          to: 'saving'
        },
        destroy: {
          from: ['dirty', 'clean'],
          to: 'destroying'
        },
        failedValidation: {
          from: ['saving', 'creating'],
          to: 'dirty'
        },
        loaded: {
          loading: 'clean'
        },
        created: {
          creating: 'clean'
        },
        saved: {
          saving: 'clean'
        },
        destroyed: {
          destroying: 'destroyed'
        },
        set: {
          from: ['dirty', 'clean'],
          to: 'dirty'
        },
        error: {
          from: ['saving', 'creating', 'loading', 'destroying'],
          to: 'error'
        }
      });

      return InstanceLifecycleStateMachine;

    })(Batman.DelegatingStateMachine);

    function Model(idOrAttributes) {
      if (idOrAttributes == null) {
        idOrAttributes = {};
      }
      Batman.developer.assert(this instanceof Batman.Object, "constructors must be called with new");
      if (Batman.typeOf(idOrAttributes) === 'Object') {
        Model.__super__.constructor.call(this, idOrAttributes);
      } else {
        Model.__super__.constructor.call(this);
        this.set('id', idOrAttributes);
      }
    }

    Model.accessor('lifecycle', function() {
      return this.lifecycle || (this.lifecycle = new Batman.Model.InstanceLifecycleStateMachine('clean', this));
    });

    Model.accessor('attributes', function() {
      return this.attributes || (this.attributes = new Batman.Hash);
    });

    Model.accessor('dirtyKeys', function() {
      return this.dirtyKeys || (this.dirtyKeys = new Batman.Hash);
    });

    Model.accessor('_dirtiedKeys', function() {
      return this._dirtiedKeys || (this._dirtiedKeys = new Batman.SimpleSet);
    });

    Model.accessor('errors', function() {
      return this.errors || (this.errors = new Batman.ErrorsSet);
    });

    Model.accessor('isNew', function() {
      return this.isNew();
    });

    Model.accessor('isDirty', function() {
      return this.isDirty();
    });

    Model.accessor(Model.defaultAccessor = {
      get: function(k) {
        return Batman.getPath(this, ['attributes', k]);
      },
      set: function(k, v) {
        if (this._willSet(k)) {
          return this.get('attributes').set(k, v);
        } else {
          return this.get(k);
        }
      },
      unset: function(k) {
        return this.get('attributes').unset(k);
      }
    });

    Model.wrapAccessor('id', function(core) {
      return {
        get: function() {
          var primaryKey;
          primaryKey = this.constructor.primaryKey;
          if (primaryKey === 'id') {
            return core.get.apply(this, arguments);
          } else {
            return this.get(primaryKey);
          }
        },
        set: function(key, value) {
          var parsedValue, primaryKey;
          if ((typeof value === "string") && (value.match(/[^0-9]/) === null) && (("" + (parsedValue = parseInt(value, 10))) === value)) {
            value = parsedValue;
          }
          primaryKey = this.constructor.primaryKey;
          if (primaryKey === 'id') {
            this._willSet(key);
            return core.set.apply(this, arguments);
          } else {
            return this.set(primaryKey, value);
          }
        }
      };
    });

    Model.prototype.isNew = function() {
      return typeof this.get('id') === 'undefined';
    };

    Model.prototype.isDirty = function() {
      return this.get('lifecycle.state') === 'dirty';
    };

    Model.prototype.updateAttributes = function(attrs) {
      this.mixin(attrs);
      return this;
    };

    Model.prototype.toString = function() {
      return "" + (this.constructor.get('resourceName')) + ": " + (this.get('id'));
    };

    Model.prototype.toParam = function() {
      return this.get('id');
    };

    Model.prototype.toJSON = function() {
      var encoders, obj,
        _this = this;
      obj = {};
      encoders = this._batman.get('encoders');
      if (!(!encoders || encoders.isEmpty())) {
        encoders.forEach(function(key, encoder) {
          var encodedVal, val;
          if (encoder.encode) {
            val = _this.get(key);
            if (typeof val !== 'undefined') {
              encodedVal = encoder.encode(val, key, obj, _this);
              if (typeof encodedVal !== 'undefined') {
                return obj[encoder.as] = encodedVal;
              }
            }
          }
        });
      }
      return obj;
    };

    Model.prototype.fromJSON = function(data) {
      var encoders, key, obj, value,
        _this = this;
      obj = {};
      encoders = this._batman.get('encoders');
      if (!encoders || encoders.isEmpty() || !encoders.some(function(key, encoder) {
        return encoder.decode != null;
      })) {
        for (key in data) {
          value = data[key];
          obj[key] = value;
        }
      } else {
        encoders.forEach(function(key, encoder) {
          if (encoder.decode && typeof data[encoder.as] !== 'undefined') {
            return obj[key] = encoder.decode(data[encoder.as], encoder.as, data, obj, _this);
          }
        });
      }
      if (this.constructor.primaryKey !== 'id') {
        obj.id = data[this.constructor.primaryKey];
      }
      Batman.developer["do"](function() {
        if ((!encoders) || encoders.length <= 1) {
          return Batman.developer.warn("Warning: Model " + (Batman.functionName(_this.constructor)) + " has suspiciously few decoders!");
        }
      });
      return this.mixin(obj);
    };

    Model.prototype.hasStorage = function() {
      return this._batman.get('storage') != null;
    };

    Model.prototype.load = function(options, callback) {
      var _ref2;
      if (!callback) {
        _ref2 = [{}, options], options = _ref2[0], callback = _ref2[1];
      } else {
        options = {
          data: options
        };
      }
      return this.loadWithOptions(options, callback);
    };

    Model.prototype.loadWithOptions = function(options, callback) {
      var callbackQueue, hasOptions, _ref2,
        _this = this;
      hasOptions = Object.keys(options).length !== 0;
      if ((_ref2 = this.get('lifecycle.state')) === 'destroying' || _ref2 === 'destroyed') {
        if (typeof callback === "function") {
          callback(new Error("Can't load a destroyed record!"));
        }
        return;
      }
      if (this.get('lifecycle').load()) {
        callbackQueue = [];
        if (callback != null) {
          callbackQueue.push(callback);
        }
        if (!hasOptions) {
          this._currentLoad = callbackQueue;
        }
        return this._doStorageOperation('read', options, function(err, record, env) {
          var _j, _len1;
          if (!err) {
            _this.get('lifecycle').loaded();
            record = _this.constructor._mapIdentity(record);
            record.get('errors').clear();
          } else {
            _this.get('lifecycle').error();
          }
          if (!hasOptions) {
            _this._currentLoad = null;
          }
          for (_j = 0, _len1 = callbackQueue.length; _j < _len1; _j++) {
            callback = callbackQueue[_j];
            callback(err, record, env);
          }
        });
      } else {
        if (this.get('lifecycle.state') === 'loading' && !hasOptions) {
          if (callback != null) {
            return this._currentLoad.push(callback);
          }
        } else {
          return typeof callback === "function" ? callback(new Batman.StateMachine.InvalidTransitionError("Can't load while in state " + (this.get('lifecycle.state')))) : void 0;
        }
      }
    };

    Model.prototype.save = function(options, callback) {
      var endState, isNew, startState, storageOperation, _ref2, _ref3,
        _this = this;
      if (!callback) {
        _ref2 = [{}, options], options = _ref2[0], callback = _ref2[1];
      }
      isNew = this.isNew();
      _ref3 = isNew ? ['create', 'create', 'created'] : ['save', 'update', 'saved'], startState = _ref3[0], storageOperation = _ref3[1], endState = _ref3[2];
      if (this.get('lifecycle').startTransition(startState)) {
        return this.validate(function(error, errors) {
          var associations;
          if (error || errors.length) {
            _this.get('lifecycle').failedValidation();
            return typeof callback === "function" ? callback(error || errors, _this) : void 0;
          }
          associations = _this.constructor._batman.get('associations');
          _this._withoutDirtyTracking(function() {
            var _ref4,
              _this = this;
            return associations != null ? (_ref4 = associations.getByType('belongsTo')) != null ? _ref4.forEach(function(association, label) {
              return association.apply(_this);
            }) : void 0 : void 0;
          });
          return _this._doStorageOperation(storageOperation, {
            data: options
          }, function(err, record, env) {
            if (!err) {
              _this.get('dirtyKeys').clear();
              _this.get('_dirtiedKeys').clear();
              if (associations) {
                record._withoutDirtyTracking(function() {
                  var _ref4, _ref5;
                  if ((_ref4 = associations.getByType('hasOne')) != null) {
                    _ref4.forEach(function(association, label) {
                      return association.apply(err, record);
                    });
                  }
                  return (_ref5 = associations.getByType('hasMany')) != null ? _ref5.forEach(function(association, label) {
                    return association.apply(err, record);
                  }) : void 0;
                });
              }
              record = _this.constructor._mapIdentity(record);
              _this.get('lifecycle').startTransition(endState);
            } else {
              if (err instanceof Batman.ErrorsSet) {
                _this.get('lifecycle').failedValidation();
              } else {
                _this.get('lifecycle').error();
              }
            }
            return typeof callback === "function" ? callback(err, record || _this, env) : void 0;
          });
        });
      } else {
        return typeof callback === "function" ? callback(new Batman.StateMachine.InvalidTransitionError("Can't save while in state " + (this.get('lifecycle.state')))) : void 0;
      }
    };

    Model.prototype.destroy = function(options, callback) {
      var _ref2,
        _this = this;
      if (!callback) {
        _ref2 = [{}, options], options = _ref2[0], callback = _ref2[1];
      }
      if (this.get('lifecycle').destroy()) {
        return this._doStorageOperation('destroy', {
          data: options
        }, function(err, record, env) {
          if (!err) {
            _this.constructor.get('loaded').remove(_this);
            _this.get('lifecycle').destroyed();
          } else {
            _this.get('lifecycle').error();
          }
          return typeof callback === "function" ? callback(err, record, env) : void 0;
        });
      } else {
        return typeof callback === "function" ? callback(new Batman.StateMachine.InvalidTransitionError("Can't destroy while in state " + (this.get('lifecycle.state')))) : void 0;
      }
    };

    Model.prototype.validate = function(callback) {
      var args, count, e, errors, finishedValidation, key, validator, validators, _j, _k, _len1, _len2, _ref2;
      errors = this.get('errors');
      errors.clear();
      validators = this._batman.get('validators') || [];
      if (!validators || validators.length === 0) {
        if (typeof callback === "function") {
          callback(void 0, errors);
        }
        return true;
      }
      count = validators.reduce((function(acc, validator) {
        return acc + validator.keys.length;
      }), 0);
      finishedValidation = function() {
        if (--count === 0) {
          return typeof callback === "function" ? callback(void 0, errors) : void 0;
        }
      };
      for (_j = 0, _len1 = validators.length; _j < _len1; _j++) {
        validator = validators[_j];
        _ref2 = validator.keys;
        for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
          key = _ref2[_k];
          args = [errors, this, key, finishedValidation];
          try {
            if (validator.validator) {
              validator.validator.validateEach.apply(validator.validator, args);
            } else {
              validator.callback.apply(validator, args);
            }
          } catch (_error) {
            e = _error;
            if (typeof callback === "function") {
              callback(e, errors);
            }
          }
        }
      }
    };

    Model.prototype.associationProxy = function(association) {
      var proxies, _base, _name;
      Batman.initializeObject(this);
      proxies = (_base = this._batman).associationProxies || (_base.associationProxies = {});
      proxies[_name = association.label] || (proxies[_name] = new association.proxyClass(association, this));
      return proxies[association.label];
    };

    Model.prototype._willSet = function(key) {
      if (this._pauseDirtyTracking) {
        return true;
      }
      if (this.get('lifecycle').startTransition('set')) {
        if (!this.get('_dirtiedKeys').has(key)) {
          this.set("dirtyKeys." + key, this.get(key));
          this.get('_dirtiedKeys').add(key);
        }
        return true;
      } else {
        return false;
      }
    };

    Model.prototype._doStorageOperation = function(operation, options, callback) {
      var adapter,
        _this = this;
      Batman.developer.assert(this.hasStorage(), "Can't " + operation + " model " + (Batman.functionName(this.constructor)) + " without any storage adapters!");
      adapter = this._batman.get('storage');
      return adapter.perform(operation, this, options, function() {
        return callback.apply(null, arguments);
      });
    };

    Model.prototype._withoutDirtyTracking = function(block) {
      var result;
      if (this._pauseDirtyTracking) {
        return block.call(this);
      }
      this._pauseDirtyTracking = true;
      result = block.call(this);
      this._pauseDirtyTracking = false;
      return result;
    };

    _ref2 = ['load', 'save', 'validate', 'destroy'];
    for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
      functionName = _ref2[_j];
      Model.prototype[functionName] = Batman.Property.wrapTrackingPrevention(Model.prototype[functionName]);
    }

    return Model;

  }).call(this, Batman.Object);

}).call(this);

(function() {
  var k, _fn, _i, _len, _ref,
    _this = this;

  _ref = Batman.AssociationCurator.availableAssociations;
  _fn = function(k) {
    return Batman.Model[k] = function(label, scope) {
      var collection, _base;
      Batman.initializeObject(this);
      collection = (_base = this._batman).associations || (_base.associations = new Batman.AssociationCurator(this));
      return collection.add(new Batman["" + (Batman.helpers.capitalize(k)) + "Association"](this, label, scope));
    };
  };
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    k = _ref[_i];
    _fn(k);
  }

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.Proxy = (function(_super) {
    __extends(Proxy, _super);

    Proxy.prototype.isProxy = true;

    function Proxy(target) {
      Proxy.__super__.constructor.call(this);
      if (target != null) {
        this.set('target', target);
      }
    }

    Proxy.accessor('target', Batman.Property.defaultAccessor);

    Proxy.accessor({
      get: function(key) {
        var _ref;
        return (_ref = this.get('target')) != null ? _ref.get(key) : void 0;
      },
      set: function(key, value) {
        var _ref;
        return (_ref = this.get('target')) != null ? _ref.set(key, value) : void 0;
      },
      unset: function(key) {
        var _ref;
        return (_ref = this.get('target')) != null ? _ref.unset(key) : void 0;
      }
    });

    return Proxy;

  })(Batman.Object);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.AssociationProxy = (function(_super) {
    __extends(AssociationProxy, _super);

    AssociationProxy.prototype.loaded = false;

    function AssociationProxy(association, model) {
      this.association = association;
      this.model = model;
      AssociationProxy.__super__.constructor.call(this);
    }

    AssociationProxy.prototype.toJSON = function() {
      var target;
      target = this.get('target');
      if (target != null) {
        return this.get('target').toJSON();
      }
    };

    AssociationProxy.prototype.load = function(callback) {
      var _this = this;
      this.fetch(function(err, proxiedRecord) {
        if (!err) {
          _this._setTarget(proxiedRecord);
        }
        return typeof callback === "function" ? callback(err, proxiedRecord) : void 0;
      });
      return this.get('target');
    };

    AssociationProxy.prototype.loadFromLocal = function() {
      var target;
      if (!this._canLoad()) {
        return;
      }
      if (target = this.fetchFromLocal()) {
        this._setTarget(target);
      }
      return target;
    };

    AssociationProxy.prototype.fetch = function(callback) {
      var record;
      if (!this._canLoad()) {
        return callback(void 0, void 0);
      }
      record = this.fetchFromLocal();
      if (record) {
        return callback(void 0, record);
      } else {
        return this.fetchFromRemote(callback);
      }
    };

    AssociationProxy.accessor('loaded', Batman.Property.defaultAccessor);

    AssociationProxy.accessor('target', {
      get: function() {
        return this.fetchFromLocal();
      },
      set: function(_, v) {
        return v;
      }
    });

    AssociationProxy.prototype._canLoad = function() {
      return (this.get('foreignValue') || this.get('primaryValue')) != null;
    };

    AssociationProxy.prototype._setTarget = function(target) {
      this.set('target', target);
      this.set('loaded', true);
      return this.fire('loaded', target);
    };

    return AssociationProxy;

  })(Batman.Proxy);

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.HasOneProxy = (function(_super) {
    __extends(HasOneProxy, _super);

    function HasOneProxy() {
      _ref = HasOneProxy.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    HasOneProxy.accessor('primaryValue', function() {
      return this.model.get(this.association.primaryKey);
    });

    HasOneProxy.prototype.fetchFromLocal = function() {
      return this.association.setIndex().get(this.get('primaryValue'));
    };

    HasOneProxy.prototype.fetchFromRemote = function(callback) {
      var loadOptions,
        _this = this;
      loadOptions = {
        data: {}
      };
      loadOptions.data[this.association.foreignKey] = this.get('primaryValue');
      if (this.association.options.url) {
        loadOptions.collectionUrl = this.association.options.url;
        loadOptions.urlContext = this.model;
      }
      return this.association.getRelatedModel().loadWithOptions(loadOptions, function(error, loadedRecords) {
        if (error) {
          throw error;
        }
        if (!loadedRecords || loadedRecords.length <= 0) {
          return callback(new Error("Couldn't find related record!"), void 0);
        } else {
          return callback(void 0, loadedRecords[0]);
        }
      });
    };

    return HasOneProxy;

  })(Batman.AssociationProxy);

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.BelongsToProxy = (function(_super) {
    __extends(BelongsToProxy, _super);

    function BelongsToProxy() {
      _ref = BelongsToProxy.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    BelongsToProxy.accessor('foreignValue', function() {
      return this.model.get(this.association.foreignKey);
    });

    BelongsToProxy.prototype.fetchFromLocal = function() {
      return this.association.setIndex().get(this.get('foreignValue'));
    };

    BelongsToProxy.prototype.fetchFromRemote = function(callback) {
      var loadOptions,
        _this = this;
      loadOptions = {};
      if (this.association.options.url) {
        loadOptions.recordUrl = this.association.options.url;
      }
      return this.association.getRelatedModel().findWithOptions(this.get('foreignValue'), loadOptions, function(error, loadedRecord) {
        if (error) {
          throw error;
        }
        return callback(void 0, loadedRecord);
      });
    };

    return BelongsToProxy;

  })(Batman.AssociationProxy);

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.PolymorphicBelongsToProxy = (function(_super) {
    __extends(PolymorphicBelongsToProxy, _super);

    function PolymorphicBelongsToProxy() {
      _ref = PolymorphicBelongsToProxy.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    PolymorphicBelongsToProxy.accessor('foreignTypeValue', function() {
      return this.model.get(this.association.foreignTypeKey);
    });

    PolymorphicBelongsToProxy.prototype.fetchFromLocal = function() {
      return this.association.setIndexForType(this.get('foreignTypeValue')).get(this.get('foreignValue'));
    };

    PolymorphicBelongsToProxy.prototype.fetchFromRemote = function(callback) {
      var loadOptions,
        _this = this;
      loadOptions = {};
      if (this.association.options.url) {
        loadOptions.recordUrl = this.association.options.url;
      }
      return this.association.getRelatedModelForType(this.get('foreignTypeValue')).findWithOptions(this.get('foreignValue'), loadOptions, function(error, loadedRecord) {
        if (error) {
          throw error;
        }
        return callback(void 0, loadedRecord);
      });
    };

    return PolymorphicBelongsToProxy;

  })(Batman.BelongsToProxy);

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.Accessible = (function(_super) {
    __extends(Accessible, _super);

    function Accessible() {
      this.accessor.apply(this, arguments);
    }

    return Accessible;

  })(Batman.Object);

  Batman.TerminalAccessible = (function(_super) {
    __extends(TerminalAccessible, _super);

    function TerminalAccessible() {
      _ref = TerminalAccessible.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    TerminalAccessible.prototype.propertyClass = Batman.Property;

    return TerminalAccessible;

  })(Batman.Accessible);

}).call(this);

(function() {
  Batman.URI = (function() {
    /*
    # URI parsing
    */

    var attributes, childKeyMatchers, decodeQueryComponent, encodeComponent, encodeQueryComponent, keyVal, nameParser, normalizeParams, plus, queryFromParams, r20, strictParser;

    strictParser = /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/;

    attributes = ["source", "protocol", "authority", "userInfo", "user", "password", "hostname", "port", "relative", "path", "directory", "file", "query", "hash"];

    function URI(str) {
      var i, matches;
      matches = strictParser.exec(str);
      i = 14;
      while (i--) {
        this[attributes[i]] = matches[i] || '';
      }
      this.queryParams = this.constructor.paramsFromQuery(this.query);
      delete this.authority;
      delete this.userInfo;
      delete this.relative;
      delete this.directory;
      delete this.file;
      delete this.query;
    }

    URI.prototype.queryString = function() {
      return this.constructor.queryFromParams(this.queryParams);
    };

    URI.prototype.toString = function() {
      return [this.protocol ? "" + this.protocol + ":" : void 0, this.authority() ? "//" : void 0, this.authority(), this.relative()].join("");
    };

    URI.prototype.userInfo = function() {
      return [this.user, this.password ? ":" + this.password : void 0].join("");
    };

    URI.prototype.authority = function() {
      return [this.userInfo(), this.user || this.password ? "@" : void 0, this.hostname, this.port ? ":" + this.port : void 0].join("");
    };

    URI.prototype.relative = function() {
      var query;
      query = this.queryString();
      return [this.path, query ? "?" + query : void 0, this.hash ? "#" + this.hash : void 0].join("");
    };

    URI.prototype.directory = function() {
      var splitPath;
      splitPath = this.path.split('/');
      if (splitPath.length > 1) {
        return splitPath.slice(0, splitPath.length - 1).join('/') + "/";
      } else {
        return "";
      }
    };

    URI.prototype.file = function() {
      var splitPath;
      splitPath = this.path.split("/");
      return splitPath[splitPath.length - 1];
    };

    /*
    # query parsing
    */


    URI.paramsFromQuery = function(query) {
      var matches, params, segment, _i, _len, _ref;
      params = {};
      _ref = query.split('&');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        segment = _ref[_i];
        if (matches = segment.match(keyVal)) {
          normalizeParams(params, decodeQueryComponent(matches[1]), decodeQueryComponent(matches[2]));
        } else {
          normalizeParams(params, decodeQueryComponent(segment), null);
        }
      }
      return params;
    };

    URI.decodeQueryComponent = decodeQueryComponent = function(str) {
      return decodeURIComponent(str.replace(plus, '%20'));
    };

    nameParser = /^[\[\]]*([^\[\]]+)\]*(.*)/;

    childKeyMatchers = [/^\[\]\[([^\[\]]+)\]$/, /^\[\](.+)$/];

    plus = /\+/g;

    r20 = /%20/g;

    keyVal = /^([^=]*)=(.*)/;

    normalizeParams = function(params, name, v) {
      var after, childKey, k, last, matches;
      if (matches = name.match(nameParser)) {
        k = matches[1];
        after = matches[2];
      } else {
        return;
      }
      if (after === '') {
        params[k] = v;
      } else if (after === '[]') {
        if (params[k] == null) {
          params[k] = [];
        }
        if (Batman.typeOf(params[k]) !== 'Array') {
          throw new Error("expected Array (got " + (Batman.typeOf(params[k])) + ") for param \"" + k + "\"");
        }
        params[k].push(v);
      } else if (matches = after.match(childKeyMatchers[0]) || after.match(childKeyMatchers[1])) {
        childKey = matches[1];
        if (params[k] == null) {
          params[k] = [];
        }
        if (Batman.typeOf(params[k]) !== 'Array') {
          throw new Error("expected Array (got " + (Batman.typeOf(params[k])) + ") for param \"" + k + "\"");
        }
        last = params[k][params[k].length - 1];
        if (Batman.typeOf(last) === 'Object' && !(childKey in last)) {
          normalizeParams(last, childKey, v);
        } else {
          params[k].push(normalizeParams({}, childKey, v));
        }
      } else {
        if (params[k] == null) {
          params[k] = {};
        }
        if (Batman.typeOf(params[k]) !== 'Object') {
          throw new Error("expected Object (got " + (Batman.typeOf(params[k])) + ") for param \"" + k + "\"");
        }
        params[k] = normalizeParams(params[k], after, v);
      }
      return params;
    };

    /*
    # query building
    */


    URI.queryFromParams = queryFromParams = function(value, prefix) {
      var arrayResults, k, v, valueType;
      if (value == null) {
        return prefix;
      }
      valueType = Batman.typeOf(value);
      if (!((prefix != null) || valueType === 'Object')) {
        throw new Error("value must be an Object");
      }
      switch (valueType) {
        case 'Array':
          return ((function() {
            var _i, _len;
            arrayResults = [];
            if (value.length === 0) {
              arrayResults.push(queryFromParams(null, "" + prefix + "[]"));
            } else {
              for (_i = 0, _len = value.length; _i < _len; _i++) {
                v = value[_i];
                arrayResults.push(queryFromParams(v, "" + prefix + "[]"));
              }
            }
            return arrayResults;
          })()).join("&");
        case 'Object':
          return ((function() {
            var _results;
            _results = [];
            for (k in value) {
              v = value[k];
              _results.push(queryFromParams(v, prefix ? "" + prefix + "[" + (encodeQueryComponent(k)) + "]" : encodeQueryComponent(k)));
            }
            return _results;
          })()).join("&");
        default:
          if (prefix != null) {
            return "" + prefix + "=" + (encodeQueryComponent(value));
          } else {
            return encodeQueryComponent(value);
          }
      }
    };

    URI.encodeComponent = encodeComponent = function(str) {
      if (str != null) {
        return encodeURIComponent(str);
      } else {
        return '';
      }
    };

    URI.encodeQueryComponent = encodeQueryComponent = function(str) {
      return encodeComponent(str).replace(r20, '+');
    };

    return URI;

  })();

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.Request = (function(_super) {
    var dataHasFileUploads;

    __extends(Request, _super);

    Request.objectToFormData = function(data) {
      var formData, key, pairForList, val, _i, _len, _ref, _ref1;
      pairForList = function(key, object, first) {
        var k, list, v;
        if (first == null) {
          first = false;
        }
        if (object instanceof Batman.container.File) {
          return [[key, object]];
        }
        return list = (function() {
          switch (Batman.typeOf(object)) {
            case 'Object':
              list = (function() {
                var _results;
                _results = [];
                for (k in object) {
                  v = object[k];
                  _results.push(pairForList((first ? k : "" + key + "[" + k + "]"), v));
                }
                return _results;
              })();
              return list.reduce(function(acc, list) {
                return acc.concat(list);
              }, []);
            case 'Array':
              return object.reduce(function(acc, element) {
                return acc.concat(pairForList("" + key + "[]", element));
              }, []);
            default:
              return [[key, object != null ? object : ""]];
          }
        })();
      };
      formData = new Batman.container.FormData();
      _ref = pairForList("", data, true);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        _ref1 = _ref[_i], key = _ref1[0], val = _ref1[1];
        formData.append(key, val);
      }
      return formData;
    };

    Request.dataHasFileUploads = dataHasFileUploads = function(data) {
      var k, type, v, _i, _len;
      if ((typeof File !== "undefined" && File !== null) && data instanceof File) {
        return true;
      }
      type = Batman.typeOf(data);
      switch (type) {
        case 'Object':
          for (k in data) {
            v = data[k];
            if (dataHasFileUploads(v)) {
              return true;
            }
          }
          break;
        case 'Array':
          for (_i = 0, _len = data.length; _i < _len; _i++) {
            v = data[_i];
            if (dataHasFileUploads(v)) {
              return true;
            }
          }
      }
      return false;
    };

    Request.wrapAccessor('method', function(core) {
      return {
        set: function(k, val) {
          return core.set.call(this, k, val != null ? typeof val.toUpperCase === "function" ? val.toUpperCase() : void 0 : void 0);
        }
      };
    });

    Request.prototype.method = 'GET';

    Request.prototype.hasFileUploads = function() {
      return dataHasFileUploads(this.data);
    };

    Request.prototype.contentType = 'application/x-www-form-urlencoded';

    Request.prototype.autosend = true;

    function Request(options) {
      var handler, handlers, k, _ref;
      handlers = {};
      for (k in options) {
        handler = options[k];
        if (!(k === 'success' || k === 'error' || k === 'loading' || k === 'loaded')) {
          continue;
        }
        handlers[k] = handler;
        delete options[k];
      }
      Request.__super__.constructor.call(this, options);
      for (k in handlers) {
        handler = handlers[k];
        this.on(k, handler);
      }
      if (((_ref = this.get('url')) != null ? _ref.length : void 0) > 0) {
        if (this.autosend) {
          this.send();
        }
      } else {
        this.observe('url', function(url) {
          if (url != null) {
            return this.send();
          }
        });
      }
    }

    Request.prototype.send = function() {
      return Batman.developer.error("Please source a dependency file for a request implementation");
    };

    return Request;

  })(Batman.Object);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  Batman.SetObserver = (function(_super) {
    __extends(SetObserver, _super);

    function SetObserver(base) {
      var _this = this;
      this.base = base;
      this._itemObservers = new Batman.SimpleHash;
      this._setObservers = new Batman.SimpleHash;
      this._setObservers.set("itemsWereAdded", function() {
        return _this.fire.apply(_this, ['itemsWereAdded'].concat(__slice.call(arguments)));
      });
      this._setObservers.set("itemsWereRemoved", function() {
        return _this.fire.apply(_this, ['itemsWereRemoved'].concat(__slice.call(arguments)));
      });
      this.on('itemsWereAdded', this.startObservingItems.bind(this));
      this.on('itemsWereRemoved', this.stopObservingItems.bind(this));
    }

    SetObserver.prototype.observedItemKeys = [];

    SetObserver.prototype.observerForItemAndKey = function(item, key) {};

    SetObserver.prototype._getOrSetObserverForItemAndKey = function(item, key) {
      var _this = this;
      return this._itemObservers.getOrSet(item, function() {
        var observersByKey;
        observersByKey = new Batman.SimpleHash;
        return observersByKey.getOrSet(key, function() {
          return _this.observerForItemAndKey(item, key);
        });
      });
    };

    SetObserver.prototype.startObserving = function() {
      this._manageItemObservers("observe");
      return this._manageSetObservers("addHandler");
    };

    SetObserver.prototype.stopObserving = function() {
      this._manageItemObservers("forget");
      return this._manageSetObservers("removeHandler");
    };

    SetObserver.prototype.startObservingItems = function(items) {
      var item, _i, _len;
      for (_i = 0, _len = items.length; _i < _len; _i++) {
        item = items[_i];
        this._manageObserversForItem(item, "observe");
      }
    };

    SetObserver.prototype.stopObservingItems = function(items) {
      var item, _i, _len;
      for (_i = 0, _len = items.length; _i < _len; _i++) {
        item = items[_i];
        this._manageObserversForItem(item, "forget");
      }
    };

    SetObserver.prototype._manageObserversForItem = function(item, method) {
      var key, _i, _len, _ref;
      if (item.isObservable) {
        _ref = this.observedItemKeys;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          key = _ref[_i];
          item[method](key, this._getOrSetObserverForItemAndKey(item, key));
        }
        if (method === "forget") {
          return this._itemObservers.unset(item);
        }
      }
    };

    SetObserver.prototype._manageItemObservers = function(method) {
      var _this = this;
      return this.base.forEach(function(item) {
        return _this._manageObserversForItem(item, method);
      });
    };

    SetObserver.prototype._manageSetObservers = function(method) {
      var _this = this;
      if (this.base.isObservable) {
        return this._setObservers.forEach(function(key, observer) {
          return _this.base.event(key)[method](observer);
        });
      }
    };

    return SetObserver;

  })(Batman.Object);

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.SetSort = (function(_super) {
    __extends(SetSort, _super);

    function SetSort(base, key, order) {
      var _this = this;
      this.key = key;
      if (order == null) {
        order = "asc";
      }
      this.compareElements = __bind(this.compareElements, this);
      SetSort.__super__.constructor.call(this, base);
      this.descending = order.toLowerCase() === "desc";
      this.isSorted = true;
      if (this.isCollectionEventEmitter) {
        this._setObserver.observedItemKeys = [this.key];
        this._setObserver.observerForItemAndKey = function(item) {
          return function(newValue, oldValue) {
            return _this._handleItemsModified(item, newValue, oldValue);
          };
        };
      }
      this._reIndex();
    }

    SetSort.prototype._handleItemsModified = function(item, newValue, oldValue) {
      var match, newIndex, newStorage, oldIndex, proxyItem, wrappedCompare, _ref, _ref1,
        _this = this;
      proxyItem = {};
      proxyItem[this.key] = oldValue;
      wrappedCompare = function(a, b) {
        if (a === item) {
          a = proxyItem;
        }
        if (b === item) {
          b = proxyItem;
        }
        return _this.compareElements(a, b);
      };
      newStorage = this._storage.slice();
      _ref = this.constructor._binarySearch(newStorage, item, wrappedCompare), match = _ref.match, oldIndex = _ref.index;
      if (!match) {
        return;
      }
      newStorage.splice(oldIndex, 1);
      _ref1 = this.constructor._binarySearch(newStorage, item, this.compareElements), match = _ref1.match, newIndex = _ref1.index;
      if (oldIndex === newIndex) {
        return;
      }
      newStorage.splice(newIndex, 0, item);
      this.set('_storage', newStorage);
      return this.fire('itemWasMoved', item, newIndex, oldIndex);
    };

    SetSort.prototype._handleItemsAdded = function(items) {
      var addedIndexes, addedItems, index, item, match, newStorage, _i, _len, _ref;
      newStorage = this._storage.slice();
      addedItems = [];
      addedIndexes = [];
      for (_i = 0, _len = items.length; _i < _len; _i++) {
        item = items[_i];
        _ref = this.constructor._binarySearch(newStorage, item, this.compareElements), match = _ref.match, index = _ref.index;
        if (!match) {
          newStorage.splice(index, 0, item);
          addedItems.push(item);
          addedIndexes.push(index);
        }
      }
      this.set('_storage', newStorage);
      this.set('length', this._storage.length);
      return this.fire('itemsWereAdded', addedItems, addedIndexes);
    };

    SetSort.prototype._handleItemsRemoved = function(items) {
      var index, item, match, newStorage, removedIndexes, removedItems, _i, _len, _ref;
      newStorage = this._storage.slice();
      removedItems = [];
      removedIndexes = [];
      for (_i = 0, _len = items.length; _i < _len; _i++) {
        item = items[_i];
        _ref = this.constructor._binarySearch(newStorage, item, this.compareElements), match = _ref.match, index = _ref.index;
        if (match) {
          newStorage.splice(index, 1);
          removedItems.push(item);
          removedIndexes.push(index);
        }
      }
      this.set('_storage', newStorage);
      this.set('length', this._storage.length);
      return this.fire('itemsWereRemoved', removedItems, removedIndexes);
    };

    SetSort.prototype.toArray = function() {
      var _base;
      if (typeof (_base = this.base).registerAsMutableSource === "function") {
        _base.registerAsMutableSource();
      }
      return this._storage.slice();
    };

    SetSort.prototype.forEach = function(iterator, ctx) {
      var e, i, _base, _i, _len, _ref;
      if (typeof (_base = this.base).registerAsMutableSource === "function") {
        _base.registerAsMutableSource();
      }
      _ref = this._storage;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        e = _ref[i];
        iterator.call(ctx, e, i, this);
      }
    };

    SetSort.prototype.find = function(block) {
      var item, _i, _len, _ref;
      this.base.registerAsMutableSource();
      _ref = this._storage;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        if (block(item)) {
          return item;
        }
      }
    };

    SetSort.prototype.merge = function(other) {
      this.base.registerAsMutableSource();
      return (function(func, args, ctor) {
        ctor.prototype = func.prototype;
        var child = new ctor, result = func.apply(child, args);
        return Object(result) === result ? result : child;
      })(Batman.Set, this._storage, function(){}).merge(other).sortedBy(this.key, this.order);
    };

    SetSort.prototype.compare = function(a, b) {
      if (a === b) {
        return 0;
      }
      if (a === void 0) {
        return 1;
      }
      if (b === void 0) {
        return -1;
      }
      if (a === null) {
        return 1;
      }
      if (b === null) {
        return -1;
      }
      if (a === false) {
        return 1;
      }
      if (b === false) {
        return -1;
      }
      if (a === true) {
        return 1;
      }
      if (b === true) {
        return -1;
      }
      if (a !== a) {
        if (b !== b) {
          return 0;
        } else {
          return 1;
        }
      }
      if (b !== b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      if (a < b) {
        return -1;
      }
      return 0;
    };

    SetSort.prototype.compareElements = function(a, b) {
      var multiple, valueA, valueB;
      valueA = this.key && (a != null) ? Batman.get(a, this.key) : a;
      if (typeof valueA === 'function') {
        valueA = valueA.call(a);
      }
      if (valueA != null) {
        valueA = valueA.valueOf();
      }
      valueB = this.key && (b != null) ? Batman.get(b, this.key) : b;
      if (typeof valueB === 'function') {
        valueB = valueB.call(b);
      }
      if (valueB != null) {
        valueB = valueB.valueOf();
      }
      multiple = this.descending ? -1 : 1;
      return this.compare(valueA, valueB) * multiple;
    };

    SetSort.prototype._reIndex = function() {
      var newOrder, _ref;
      newOrder = this.base.toArray().sort(this.compareElements);
      if ((_ref = this._setObserver) != null) {
        _ref.startObservingItems(newOrder);
      }
      return this.set('_storage', newOrder);
    };

    SetSort.prototype._indexOfItem = function(target) {
      var index, match, _ref;
      _ref = this.constructor._binarySearch(this._storage, target, this.compareElements), match = _ref.match, index = _ref.index;
      if (match) {
        return index;
      } else {
        return -1;
      }
    };

    SetSort._binarySearch = function(arr, target, compare) {
      var direction, end, i, index, matched, result, start;
      start = 0;
      end = arr.length - 1;
      result = {};
      while (end >= start) {
        index = ((end - start) >> 1) + start;
        direction = compare(target, arr[index]);
        if (direction > 0) {
          start = index + 1;
        } else if (direction < 0) {
          end = index - 1;
        } else {
          matched = false;
          i = index;
          while (i >= 0 && compare(target, arr[i]) === 0) {
            if (target === arr[i]) {
              index = i;
              matched = true;
              break;
            }
            i--;
          }
          if (!matched) {
            i = index + 1;
            while (i < arr.length && compare(target, arr[i]) === 0) {
              if (target === arr[i]) {
                index = i;
                matched = true;
                break;
              }
              i++;
            }
          }
          return {
            match: matched,
            index: index
          };
        }
      }
      return {
        match: false,
        index: start
      };
    };

    return SetSort;

  })(Batman.SetProxy);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.AssociationSet = (function(_super) {
    __extends(AssociationSet, _super);

    function AssociationSet(foreignKeyValue, association) {
      var base;
      this.foreignKeyValue = foreignKeyValue;
      this.association = association;
      base = new Batman.Set;
      AssociationSet.__super__.constructor.call(this, base, '_batmanID');
    }

    AssociationSet.prototype.loaded = false;

    AssociationSet.accessor('loaded', Batman.Property.defaultAccessor);

    AssociationSet.prototype.load = function(callback) {
      var _this = this;
      if (this.foreignKeyValue == null) {
        return callback(void 0, this);
      }
      return this.association.getRelatedModel().loadWithOptions(this._getLoadOptions(), function(err, records) {
        if (!err) {
          _this.markAsLoaded();
        }
        return callback(err, _this);
      });
    };

    AssociationSet.prototype._getLoadOptions = function() {
      var loadOptions;
      loadOptions = {
        data: {}
      };
      loadOptions.data[this.association.foreignKey] = this.foreignKeyValue;
      if (this.association.options.url) {
        loadOptions.collectionUrl = this.association.options.url;
        loadOptions.urlContext = this.association.parentSetIndex().get(this.foreignKeyValue);
      }
      return loadOptions;
    };

    AssociationSet.prototype.markAsLoaded = function() {
      this.set('loaded', true);
      return this.fire('loaded');
    };

    return AssociationSet;

  })(Batman.SetSort);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.PolymorphicAssociationSet = (function(_super) {
    __extends(PolymorphicAssociationSet, _super);

    function PolymorphicAssociationSet(foreignKeyValue, foreignTypeKeyValue, association) {
      this.foreignKeyValue = foreignKeyValue;
      this.foreignTypeKeyValue = foreignTypeKeyValue;
      this.association = association;
      PolymorphicAssociationSet.__super__.constructor.call(this, this.foreignKeyValue, this.association);
    }

    PolymorphicAssociationSet.prototype._getLoadOptions = function() {
      var loadOptions;
      loadOptions = {
        data: {}
      };
      loadOptions.data[this.association.foreignKey] = this.foreignKeyValue;
      loadOptions.data[this.association.foreignTypeKey] = this.foreignTypeKeyValue;
      if (this.association.options.url) {
        loadOptions.collectionUrl = this.association.options.url;
        loadOptions.urlContext = this.association.parentSetIndex().get(this.foreignKeyValue);
      }
      return loadOptions;
    };

    return PolymorphicAssociationSet;

  })(Batman.AssociationSet);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.SetIndex = (function(_super) {
    __extends(SetIndex, _super);

    SetIndex.accessor('toArray', function() {
      return this.toArray();
    });

    Batman.extend(SetIndex.prototype, Batman.Enumerable);

    SetIndex.prototype.propertyClass = Batman.Property;

    function SetIndex(base, key) {
      var _this = this;
      this.base = base;
      this.key = key;
      SetIndex.__super__.constructor.call(this);
      this._storage = new Batman.Hash;
      if (this.base.isEventEmitter) {
        this._setObserver = new Batman.SetObserver(this.base);
        this._setObserver.observedItemKeys = [this.key];
        this._setObserver.observerForItemAndKey = this.observerForItemAndKey.bind(this);
        this._setObserver.on('itemsWereAdded', function(items) {
          return _this._addItems(items);
        });
        this._setObserver.on('itemsWereRemoved', function(items) {
          return _this._removeItems(items);
        });
      }
      this._addItems(this.base._storage);
      this.startObserving();
    }

    SetIndex.accessor(function(key) {
      return this._resultSetForKey(key);
    });

    SetIndex.prototype.startObserving = function() {
      var _ref;
      return (_ref = this._setObserver) != null ? _ref.startObserving() : void 0;
    };

    SetIndex.prototype.stopObserving = function() {
      var _ref;
      return (_ref = this._setObserver) != null ? _ref.stopObserving() : void 0;
    };

    SetIndex.prototype.observerForItemAndKey = function(item, key) {
      var _this = this;
      return function(newKey, oldKey) {
        _this._removeItemsFromKey(oldKey, [item]);
        return _this._addItemsToKey(newKey, [item]);
      };
    };

    SetIndex.prototype.forEach = function(iterator, ctx) {
      var _this = this;
      return this._storage.forEach(function(key, set) {
        if (set.get('length') > 0) {
          return iterator.call(ctx, key, set, _this);
        }
      });
    };

    SetIndex.prototype.toArray = function() {
      var results;
      results = [];
      this._storage.forEach(function(key, set) {
        if (set.get('length') > 0) {
          return results.push(key);
        }
      });
      return results;
    };

    SetIndex.prototype._addItems = function(items) {
      var index, item, itemsForKey, key, lastKey, _i, _len;
      if (!(items != null ? items.length : void 0)) {
        return;
      }
      lastKey = this._keyForItem(items[0]);
      itemsForKey = [];
      for (index = _i = 0, _len = items.length; _i < _len; index = ++_i) {
        item = items[index];
        if (Batman.SimpleHash.prototype.equality(lastKey, (key = this._keyForItem(item)))) {
          itemsForKey.push(item);
        } else {
          this._addItemsToKey(lastKey, itemsForKey);
          itemsForKey = [item];
          lastKey = key;
        }
      }
      if (itemsForKey.length) {
        return this._addItemsToKey(lastKey, itemsForKey);
      }
    };

    SetIndex.prototype._removeItems = function(items) {
      var index, item, itemsForKey, key, lastKey, _i, _len;
      if (!(items != null ? items.length : void 0)) {
        return;
      }
      lastKey = this._keyForItem(items[0]);
      itemsForKey = [];
      for (index = _i = 0, _len = items.length; _i < _len; index = ++_i) {
        item = items[index];
        if (Batman.SimpleHash.prototype.equality(lastKey, (key = this._keyForItem(item)))) {
          itemsForKey.push(item);
        } else {
          this._removeItemsFromKey(lastKey, itemsForKey);
          itemsForKey = [item];
          lastKey = key;
        }
      }
      if (itemsForKey.length) {
        return this._removeItemsFromKey(lastKey, itemsForKey);
      }
    };

    SetIndex.prototype._addItemsToKey = function(key, items) {
      var resultSet;
      resultSet = this._resultSetForKey(key);
      resultSet.add.apply(resultSet, items);
      return resultSet;
    };

    SetIndex.prototype._removeItemsFromKey = function(key, items) {
      var resultSet;
      resultSet = this._resultSetForKey(key);
      resultSet.remove.apply(resultSet, items);
      return resultSet;
    };

    SetIndex.prototype._resultSetForKey = function(key) {
      return this._storage.getOrSet(key, function() {
        return new Batman.Set;
      });
    };

    SetIndex.prototype._keyForItem = function(item) {
      return Batman.Keypath.forBaseAndKey(item, this.key).getValue();
    };

    return SetIndex;

  })(Batman.Object);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.PolymorphicAssociationSetIndex = (function(_super) {
    __extends(PolymorphicAssociationSetIndex, _super);

    function PolymorphicAssociationSetIndex(association, type, key) {
      this.association = association;
      this.type = type;
      PolymorphicAssociationSetIndex.__super__.constructor.call(this, this.association.getRelatedModel().get('loaded'), key);
    }

    PolymorphicAssociationSetIndex.prototype._resultSetForKey = function(key) {
      return this.association.setForKey(key);
    };

    PolymorphicAssociationSetIndex.prototype._addItemsToKey = function(key, items) {
      var filteredItems, item;
      filteredItems = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = items.length; _i < _len; _i++) {
          item = items[_i];
          if (this.association.modelType() === item.get(this.association.foreignTypeKey)) {
            _results.push(item);
          }
        }
        return _results;
      }).call(this);
      return PolymorphicAssociationSetIndex.__super__._addItemsToKey.call(this, key, filteredItems);
    };

    PolymorphicAssociationSetIndex.prototype._removeItemsFromKey = function(key, items) {
      var filteredItems, item;
      filteredItems = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = items.length; _i < _len; _i++) {
          item = items[_i];
          if (this.association.modelType() === item.get(this.association.foreignTypeKey)) {
            _results.push(item);
          }
        }
        return _results;
      }).call(this);
      return PolymorphicAssociationSetIndex.__super__._removeItemsFromKey.call(this, key, filteredItems);
    };

    return PolymorphicAssociationSetIndex;

  })(Batman.SetIndex);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.AssociationSetIndex = (function(_super) {
    __extends(AssociationSetIndex, _super);

    function AssociationSetIndex(association, key) {
      this.association = association;
      AssociationSetIndex.__super__.constructor.call(this, this.association.getRelatedModel().get('loaded'), key);
    }

    AssociationSetIndex.prototype._resultSetForKey = function(key) {
      return this.association.setForKey(key);
    };

    AssociationSetIndex.prototype.forEach = function(iterator, ctx) {
      var _this = this;
      return this.association.proxies.forEach(function(record, set) {
        var key;
        key = _this.association.indexValueForRecord(record);
        if (set.get('length') > 0) {
          return iterator.call(ctx, key, set, _this);
        }
      });
    };

    AssociationSetIndex.prototype.toArray = function() {
      var results;
      results = [];
      this.forEach(function(key) {
        return results.push(key);
      });
      return results;
    };

    return AssociationSetIndex;

  })(Batman.SetIndex);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.UniqueSetIndex = (function(_super) {
    __extends(UniqueSetIndex, _super);

    function UniqueSetIndex() {
      this._uniqueIndex = new Batman.Hash;
      UniqueSetIndex.__super__.constructor.apply(this, arguments);
    }

    UniqueSetIndex.accessor(function(key) {
      return this._uniqueIndex.get(key);
    });

    UniqueSetIndex.prototype._addItemsToKey = function(key, items) {
      UniqueSetIndex.__super__._addItemsToKey.apply(this, arguments);
      if (!this._uniqueIndex.hasKey(key)) {
        return this._uniqueIndex.set(key, items[0]);
      }
    };

    UniqueSetIndex.prototype._removeItemsFromKey = function(key, items) {
      var resultSet;
      resultSet = UniqueSetIndex.__super__._removeItemsFromKey.apply(this, arguments);
      if (resultSet.isEmpty()) {
        return this._uniqueIndex.unset(key);
      } else {
        return this._uniqueIndex.set(key, resultSet._storage[0]);
      }
    };

    return UniqueSetIndex;

  })(Batman.SetIndex);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.UniqueAssociationSetIndex = (function(_super) {
    __extends(UniqueAssociationSetIndex, _super);

    function UniqueAssociationSetIndex(association, key) {
      this.association = association;
      UniqueAssociationSetIndex.__super__.constructor.call(this, this.association.getRelatedModel().get('loaded'), key);
    }

    return UniqueAssociationSetIndex;

  })(Batman.UniqueSetIndex);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.PolymorphicUniqueAssociationSetIndex = (function(_super) {
    __extends(PolymorphicUniqueAssociationSetIndex, _super);

    function PolymorphicUniqueAssociationSetIndex(association, type, key) {
      this.association = association;
      this.type = type;
      PolymorphicUniqueAssociationSetIndex.__super__.constructor.call(this, this.association.getRelatedModelForType(type).get('loaded'), key);
    }

    return PolymorphicUniqueAssociationSetIndex;

  })(Batman.UniqueSetIndex);

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __slice = [].slice;

  Batman.Navigator = (function() {
    Navigator.forApp = function(app) {
      return new (this.defaultClass())(app);
    };

    Navigator.defaultClass = function() {
      if (Batman.config.usePushState && Batman.PushStateNavigator.isSupported()) {
        return Batman.PushStateNavigator;
      } else {
        return Batman.HashbangNavigator;
      }
    };

    function Navigator(app) {
      this.app = app;
      this.handleCurrentLocation = __bind(this.handleCurrentLocation, this);
    }

    Navigator.prototype.start = function() {
      var _this = this;
      if (typeof window === 'undefined') {
        return;
      }
      if (this.started) {
        return;
      }
      this.started = true;
      this.startWatching();
      Batman.currentApp.prevent('ready');
      return Batman.setImmediate(function() {
        if (_this.started && Batman.currentApp) {
          _this.checkInitialHash();
          _this.handleCurrentLocation();
          return Batman.currentApp.allowAndFire('ready');
        }
      });
    };

    Navigator.prototype.stop = function() {
      this.stopWatching();
      return this.started = false;
    };

    Navigator.prototype.checkInitialHash = function(location) {
      var hash, index, prefix;
      if (location == null) {
        location = window.location;
      }
      prefix = Batman.HashbangNavigator.prototype.hashPrefix;
      hash = location.hash;
      if (hash.length > prefix.length && hash.substr(0, prefix.length) !== prefix) {
        return this.initialHash = hash.substr(prefix.length - 1);
      } else if ((index = hash.indexOf("##BATMAN##")) !== -1) {
        this.initialHash = hash.substr(index + 10);
        return this.replaceState(null, '', hash.substr(prefix.length, index - prefix.length), location);
      }
    };

    Navigator.prototype.handleCurrentLocation = function() {
      return this.handleLocation(window.location);
    };

    Navigator.prototype.handleLocation = function(location) {
      var path;
      path = this.pathFromLocation(location);
      if (path === this.cachedPath) {
        return;
      }
      return this.dispatch(path);
    };

    Navigator.prototype.dispatch = function(params) {
      var dispatcher, paramsMixin;
      dispatcher = this.app.get('dispatcher');
      this.cachedPath = this.initialHash ? (paramsMixin = {
        initialHash: this.initialHash
      }, delete this.initialHash, dispatcher.dispatch(params, paramsMixin)) : dispatcher.dispatch(params);
      return this.cachedPath;
    };

    Navigator.prototype.redirect = function(params, replaceState) {
      var path, pathFromParams, _base;
      if (replaceState == null) {
        replaceState = false;
      }
      pathFromParams = typeof (_base = this.app.get('dispatcher')).pathFromParams === "function" ? _base.pathFromParams(params) : void 0;
      if (pathFromParams) {
        this._lastRedirect = pathFromParams;
      }
      path = this.dispatch(params);
      if (this._lastRedirect) {
        this.cachedPath = this._lastRedirect;
      }
      if (!this._lastRedirect || this._lastRedirect === path) {
        this[replaceState ? 'replaceState' : 'pushState'](null, '', path);
      }
      return path;
    };

    Navigator.prototype.push = function(params) {
      Batman.developer.deprecated("Navigator::push", "Please use Batman.redirect({}) instead.");
      return this.redirect(params);
    };

    Navigator.prototype.replace = function(params) {
      Batman.developer.deprecated("Navigator::replace", "Please use Batman.redirect({}, true) instead.");
      return this.redirect(params, true);
    };

    Navigator.prototype.normalizePath = function() {
      var i, seg, segments;
      segments = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      segments = (function() {
        var _i, _len, _results;
        _results = [];
        for (i = _i = 0, _len = segments.length; _i < _len; i = ++_i) {
          seg = segments[i];
          _results.push(("" + seg).replace(/^(?!\/)/, '/').replace(/\/+$/, ''));
        }
        return _results;
      })();
      return segments.join('') || '/';
    };

    Navigator.normalizePath = Navigator.prototype.normalizePath;

    return Navigator;

  })();

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.PushStateNavigator = (function(_super) {
    __extends(PushStateNavigator, _super);

    function PushStateNavigator() {
      _ref = PushStateNavigator.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    PushStateNavigator.isSupported = function() {
      var _ref1;
      return (typeof window !== "undefined" && window !== null ? (_ref1 = window.history) != null ? _ref1.pushState : void 0 : void 0) != null;
    };

    PushStateNavigator.prototype.startWatching = function() {
      return Batman.DOM.addEventListener(window, 'popstate', this.handleCurrentLocation);
    };

    PushStateNavigator.prototype.stopWatching = function() {
      return Batman.DOM.removeEventListener(window, 'popstate', this.handleCurrentLocation);
    };

    PushStateNavigator.prototype.pushState = function(stateObject, title, path) {
      if (path !== this.pathFromLocation(window.location)) {
        return window.history.pushState(stateObject, title, this.linkTo(path));
      }
    };

    PushStateNavigator.prototype.replaceState = function(stateObject, title, path) {
      if (path !== this.pathFromLocation(window.location)) {
        return window.history.replaceState(stateObject, title, this.linkTo(path));
      }
    };

    PushStateNavigator.prototype.linkTo = function(url) {
      return this.normalizePath(Batman.config.pathToApp, url);
    };

    PushStateNavigator.prototype.pathFromLocation = function(location) {
      var fullPath, prefixPattern;
      fullPath = "" + (location.pathname || '') + (location.search || '');
      prefixPattern = new RegExp("^" + (this.normalizePath(Batman.config.pathToApp)));
      return this.normalizePath(fullPath.replace(prefixPattern, ''));
    };

    PushStateNavigator.prototype.handleLocation = function(location) {
      var hashbangPath, pushStatePath;
      pushStatePath = this.pathFromLocation(location);
      hashbangPath = Batman.HashbangNavigator.prototype.pathFromLocation(location);
      if (pushStatePath === '/' && hashbangPath !== '/') {
        return this.redirect(hashbangPath, true);
      } else {
        return PushStateNavigator.__super__.handleLocation.apply(this, arguments);
      }
    };

    return PushStateNavigator;

  })(Batman.Navigator);

}).call(this);

(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.HashbangNavigator = (function(_super) {
    __extends(HashbangNavigator, _super);

    function HashbangNavigator() {
      this.detectHashChange = __bind(this.detectHashChange, this);
      this.handleHashChange = __bind(this.handleHashChange, this);
      _ref = HashbangNavigator.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    HashbangNavigator.prototype.hashPrefix = '#!';

    if ((typeof window !== "undefined" && window !== null) && 'onhashchange' in window) {
      HashbangNavigator.prototype.startWatching = function() {
        return Batman.DOM.addEventListener(window, 'hashchange', this.handleHashChange);
      };
      HashbangNavigator.prototype.stopWatching = function() {
        return Batman.DOM.removeEventListener(window, 'hashchange', this.handleHashChange);
      };
    } else {
      HashbangNavigator.prototype.startWatching = function() {
        return this.interval = setInterval(this.detectHashChange, 100);
      };
      HashbangNavigator.prototype.stopWatching = function() {
        return this.interval = clearInterval(this.interval);
      };
    }

    HashbangNavigator.prototype.handleHashChange = function() {
      if (this.ignoreHashChange) {
        return this.ignoreHashChange = false;
      }
      return this.handleCurrentLocation();
    };

    HashbangNavigator.prototype.detectHashChange = function() {
      if (this.previousHash === window.location.hash) {
        return;
      }
      this.previousHash = window.location.hash;
      return this.handleHashChange();
    };

    HashbangNavigator.prototype.pushState = function(stateObject, title, path) {
      var link;
      link = this.linkTo(path);
      if (link === window.location.hash) {
        return;
      }
      this.ignoreHashChange = true;
      return window.location.hash = link;
    };

    HashbangNavigator.prototype.replaceState = function(stateObject, title, path, loc) {
      var link;
      if (loc == null) {
        loc = window.location;
      }
      link = this.linkTo(path);
      if (link === loc.hash) {
        return;
      }
      this.ignoreHashChange = true;
      return loc.replace("" + (loc.pathname || '') + (loc.search || '') + (link || ''));
    };

    HashbangNavigator.prototype.linkTo = function(url) {
      return this.hashPrefix + url;
    };

    HashbangNavigator.prototype.pathFromLocation = function(location) {
      var hash, length;
      hash = location.hash;
      length = this.hashPrefix.length;
      if ((hash != null ? hash.substr(0, length) : void 0) === this.hashPrefix) {
        return this.normalizePath(hash.substr(length));
      } else {
        return '/';
      }
    };

    HashbangNavigator.prototype.handleLocation = function(location) {
      var pushStatePath;
      if (!Batman.config.usePushState) {
        return HashbangNavigator.__super__.handleLocation.apply(this, arguments);
      }
      pushStatePath = Batman.PushStateNavigator.prototype.pathFromLocation(location);
      if (pushStatePath !== '/') {
        return location.replace(this.normalizePath("" + Batman.config.pathToApp + (this.linkTo(pushStatePath)) + (this.initialHash ? '##BATMAN##' + this.initialHash : '')));
      } else {
        return HashbangNavigator.__super__.handleLocation.apply(this, arguments);
      }
    };

    return HashbangNavigator;

  })(Batman.Navigator);

}).call(this);

(function() {
  Batman.RouteMap = (function() {
    RouteMap.prototype.memberRoute = null;

    RouteMap.prototype.collectionRoute = null;

    function RouteMap() {
      this.childrenByOrder = [];
      this.childrenByName = {};
    }

    RouteMap.prototype.routeForParams = function(params) {
      var key, route, _i, _len, _ref;
      this._cachedRoutes || (this._cachedRoutes = {});
      key = this.cacheKey(params);
      if (this._cachedRoutes[key]) {
        return this._cachedRoutes[key];
      } else {
        _ref = this.childrenByOrder;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          route = _ref[_i];
          if (route.test(params)) {
            return (this._cachedRoutes[key] = route);
          }
        }
      }
    };

    RouteMap.prototype.addRoute = function(name, route) {
      var base, names,
        _this = this;
      this.childrenByOrder.push(route);
      if (name.length > 0 && (names = name.split('.')).length > 0) {
        base = names.shift();
        if (!this.childrenByName[base]) {
          this.childrenByName[base] = new Batman.RouteMap;
        }
        this.childrenByName[base].addRoute(names.join('.'), route);
      } else {
        if (route.get('member')) {
          Batman.developer["do"](function() {
            if (_this.memberRoute) {
              return Batman.developer.error("Member route with name " + name + " already exists!");
            }
          });
          this.memberRoute = route;
        } else {
          Batman.developer["do"](function() {
            if (_this.collectionRoute) {
              return Batman.developer.error("Collection route with name " + name + " already exists!");
            }
          });
          this.collectionRoute = route;
        }
      }
      return true;
    };

    RouteMap.prototype.cacheKey = function(params) {
      if (typeof params === 'string') {
        return params;
      } else if (params.path != null) {
        return params.path;
      } else {
        return "" + params.controller + "#" + params.action;
      }
    };

    return RouteMap;

  })();

}).call(this);

(function() {
  var __slice = [].slice;

  Batman.RouteMapBuilder = (function() {
    RouteMapBuilder.BUILDER_FUNCTIONS = ['resources', 'member', 'collection', 'route', 'root'];

    RouteMapBuilder.ROUTES = {
      index: {
        cardinality: 'collection',
        path: function(resource) {
          return resource;
        },
        name: function(resource) {
          return resource;
        }
      },
      "new": {
        cardinality: 'collection',
        path: function(resource) {
          return "" + resource + "/new";
        },
        name: function(resource) {
          return "" + resource + ".new";
        }
      },
      show: {
        cardinality: 'member',
        path: function(resource) {
          return "" + resource + "/:id";
        },
        name: function(resource) {
          return resource;
        }
      },
      edit: {
        cardinality: 'member',
        path: function(resource) {
          return "" + resource + "/:id/edit";
        },
        name: function(resource) {
          return "" + resource + ".edit";
        }
      },
      collection: {
        cardinality: 'collection',
        path: function(resource, name) {
          return "" + resource + "/" + name;
        },
        name: function(resource, name) {
          return "" + resource + "." + name;
        }
      },
      member: {
        cardinality: 'member',
        path: function(resource, name) {
          return "" + resource + "/:id/" + name;
        },
        name: function(resource, name) {
          return "" + resource + "." + name;
        }
      }
    };

    function RouteMapBuilder(app, routeMap, parent, baseOptions) {
      this.app = app;
      this.routeMap = routeMap;
      this.parent = parent;
      this.baseOptions = baseOptions != null ? baseOptions : {};
      if (this.parent) {
        this.rootPath = this.parent._nestingPath();
        this.rootName = this.parent._nestingName();
      } else {
        this.rootPath = '';
        this.rootName = '';
      }
    }

    RouteMapBuilder.prototype.resources = function() {
      var action, actions, arg, args, as, callback, childBuilder, controller, included, k, options, path, resourceName, resourceNames, resourceRoot, routeOptions, routeTemplate, v, _i, _j, _k, _len, _len1, _len2, _ref, _ref1;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      resourceNames = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = args.length; _i < _len; _i++) {
          arg = args[_i];
          if (typeof arg === 'string') {
            _results.push(arg);
          }
        }
        return _results;
      })();
      if (typeof args[args.length - 1] === 'function') {
        callback = args.pop();
      }
      if (typeof args[args.length - 1] === 'object') {
        options = args.pop();
      } else {
        options = {};
      }
      actions = {
        index: true,
        "new": true,
        show: true,
        edit: true
      };
      if (options.except) {
        _ref = options.except;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          k = _ref[_i];
          actions[k] = false;
        }
        delete options.except;
      } else if (options.only) {
        for (k in actions) {
          v = actions[k];
          actions[k] = false;
        }
        _ref1 = options.only;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          k = _ref1[_j];
          actions[k] = true;
        }
        delete options.only;
      }
      for (_k = 0, _len2 = resourceNames.length; _k < _len2; _k++) {
        resourceName = resourceNames[_k];
        resourceRoot = Batman.helpers.pluralize(resourceName);
        controller = Batman.helpers.camelize(resourceRoot, true);
        childBuilder = this._childBuilder({
          controller: controller
        });
        if (callback != null) {
          callback.call(childBuilder);
        }
        for (action in actions) {
          included = actions[action];
          if (!(included)) {
            continue;
          }
          routeTemplate = this.constructor.ROUTES[action];
          as = routeTemplate.name(resourceRoot);
          path = routeTemplate.path(resourceRoot);
          routeOptions = Batman.extend({
            controller: controller,
            action: action,
            path: path,
            as: as
          }, options);
          childBuilder[routeTemplate.cardinality](action, routeOptions);
        }
      }
      return true;
    };

    RouteMapBuilder.prototype.member = function() {
      return this._addRoutesWithCardinality.apply(this, ['member'].concat(__slice.call(arguments)));
    };

    RouteMapBuilder.prototype.collection = function() {
      return this._addRoutesWithCardinality.apply(this, ['collection'].concat(__slice.call(arguments)));
    };

    RouteMapBuilder.prototype.root = function(signature, options) {
      return this.route('/', signature, options);
    };

    RouteMapBuilder.prototype.route = function(path, signature, options, callback) {
      if (!callback) {
        if (typeof options === 'function') {
          callback = options;
          options = void 0;
        } else if (typeof signature === 'function') {
          callback = signature;
          signature = void 0;
        }
      }
      if (!options) {
        if (typeof signature === 'string') {
          options = {
            signature: signature
          };
        } else {
          options = signature;
        }
        options || (options = {});
      } else {
        if (signature) {
          options.signature = signature;
        }
      }
      if (callback) {
        options.callback = callback;
      }
      options.as || (options.as = this._nameFromPath(path));
      options.path = path;
      return this._addRoute(options);
    };

    RouteMapBuilder.prototype._addRoutesWithCardinality = function() {
      var cardinality, name, names, options, resourceRoot, routeOptions, routeTemplate, _i, _j, _len;
      cardinality = arguments[0], names = 3 <= arguments.length ? __slice.call(arguments, 1, _i = arguments.length - 1) : (_i = 1, []), options = arguments[_i++];
      if (typeof options === 'string') {
        names.push(options);
        options = {};
      }
      options = Batman.extend({}, this.baseOptions, options);
      options[cardinality] = true;
      routeTemplate = this.constructor.ROUTES[cardinality];
      resourceRoot = Batman.helpers.underscore(options.controller);
      for (_j = 0, _len = names.length; _j < _len; _j++) {
        name = names[_j];
        routeOptions = Batman.extend({
          action: name
        }, options);
        if (routeOptions.path == null) {
          routeOptions.path = routeTemplate.path(resourceRoot, name);
        }
        if (routeOptions.as == null) {
          routeOptions.as = routeTemplate.name(resourceRoot, name);
        }
        this._addRoute(routeOptions);
      }
      return true;
    };

    RouteMapBuilder.prototype._addRoute = function(options) {
      var klass, name, path, route;
      if (options == null) {
        options = {};
      }
      path = this.rootPath + options.path;
      name = this.rootName + Batman.helpers.camelize(options.as, true);
      delete options.as;
      delete options.path;
      klass = options.callback ? Batman.CallbackActionRoute : Batman.ControllerActionRoute;
      options.app = this.app;
      route = new klass(path, options);
      return this.routeMap.addRoute(name, route);
    };

    RouteMapBuilder.prototype._nameFromPath = function(path) {
      path = path.replace(Batman.Route.regexps.namedOrSplat, '').replace(/\/+/g, '.').replace(/(^\.)|(\.$)/g, '');
      return path;
    };

    RouteMapBuilder.prototype._nestingPath = function() {
      var nestingParam, nestingSegment;
      if (!this.parent) {
        return "";
      } else {
        nestingParam = ":" + Batman.helpers.singularize(this.baseOptions.controller) + "Id";
        nestingSegment = Batman.helpers.underscore(this.baseOptions.controller);
        return "" + (this.parent._nestingPath()) + nestingSegment + "/" + nestingParam + "/";
      }
    };

    RouteMapBuilder.prototype._nestingName = function() {
      if (!this.parent) {
        return "";
      } else {
        return this.parent._nestingName() + this.baseOptions.controller + ".";
      }
    };

    RouteMapBuilder.prototype._childBuilder = function(baseOptions) {
      if (baseOptions == null) {
        baseOptions = {};
      }
      return new Batman.RouteMapBuilder(this.app, this.routeMap, this, baseOptions);
    };

    return RouteMapBuilder;

  })();

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.App = (function(_super) {
    var name, _fn, _i, _len, _ref1,
      _this = this;

    __extends(App, _super);

    function App() {
      _ref = App.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    App.classAccessor('currentParams', {
      get: function() {
        return new Batman.Hash;
      },
      'final': true
    });

    App.classAccessor('paramsManager', {
      get: function() {
        var nav, params;
        if (!(nav = this.get('navigator'))) {
          return;
        }
        params = this.get('currentParams');
        return params.replacer = new Batman.ParamsReplacer(nav, params);
      },
      'final': true
    });

    App.classAccessor('paramsPusher', {
      get: function() {
        var nav, params;
        if (!(nav = this.get('navigator'))) {
          return;
        }
        params = this.get('currentParams');
        return params.pusher = new Batman.ParamsPusher(nav, params);
      },
      'final': true
    });

    App.classAccessor('routes', function() {
      return new Batman.NamedRouteQuery(this.get('routeMap'));
    });

    App.classAccessor('routeMap', function() {
      return new Batman.RouteMap;
    });

    App.classAccessor('routeMapBuilder', function() {
      return new Batman.RouteMapBuilder(this, this.get('routeMap'));
    });

    App.classAccessor('dispatcher', function() {
      return new Batman.Dispatcher(this, this.get('routeMap'));
    });

    App.classAccessor('controllers', function() {
      return this.get('dispatcher.controllers');
    });

    App.layout = void 0;

    App.shouldAllowEvent = {};

    _ref1 = Batman.RouteMapBuilder.BUILDER_FUNCTIONS;
    _fn = function(name) {
      return App[name] = function() {
        var _ref2;
        return (_ref2 = this.get('routeMapBuilder'))[name].apply(_ref2, arguments);
      };
    };
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      name = _ref1[_i];
      _fn(name);
    }

    App.event('ready').oneShot = true;

    App.event('run').oneShot = true;

    App.run = function() {
      var LayoutView, layout, layoutClass, _ref2,
        _this = this;
      if (Batman.currentApp) {
        if (Batman.currentApp === this) {
          return;
        }
        Batman.currentApp.stop();
      }
      if (this.hasRun) {
        return false;
      }
      if (this.isPrevented('run')) {
        this.wantsToRun = true;
        return false;
      } else {
        delete this.wantsToRun;
      }
      Batman.currentApp = this;
      Batman.App.set('current', this);
      if (this.get('dispatcher') == null) {
        this.set('dispatcher', new Batman.Dispatcher(this, this.get('routeMap')));
        this.set('controllers', this.get('dispatcher.controllers'));
      }
      if (this.get('navigator') == null) {
        this.set('navigator', Batman.Navigator.forApp(this));
        Batman.navigator = this.get('navigator');
        this.on('run', function() {
          if (Object.keys(_this.get('dispatcher').routeMap).length > 0) {
            return Batman.navigator.start();
          }
        });
      }
      this.observe('layout', function(layout) {
        return layout != null ? layout.on('ready', function() {
          return _this.fire('ready');
        }) : void 0;
      });
      layout = this.get('layout');
      if (layout) {
        if (typeof layout === 'string') {
          layoutClass = this[Batman.helpers.camelize(layout) + 'View'];
        }
      } else {
        if (layout !== null) {
          layoutClass = (LayoutView = (function(_super1) {
            __extends(LayoutView, _super1);

            function LayoutView() {
              _ref2 = LayoutView.__super__.constructor.apply(this, arguments);
              return _ref2;
            }

            return LayoutView;

          })(Batman.View));
        }
      }
      if (layoutClass) {
        layout = this.set('layout', new layoutClass({
          node: document.documentElement
        }));
        layout.propagateToSubviews('viewWillAppear');
        layout.initializeBindings();
        layout.propagateToSubviews('isInDOM', true);
        layout.propagateToSubviews('viewDidAppear');
      }
      if (Batman.config.translations) {
        this.set('t', Batman.I18N.get('translations'));
      }
      this.hasRun = true;
      this.fire('run');
      return this;
    };

    App.event('ready').oneShot = true;

    App.event('stop').oneShot = true;

    App.stop = function() {
      var _ref2;
      if ((_ref2 = this.navigator) != null) {
        _ref2.stop();
      }
      Batman.navigator = null;
      this.hasRun = false;
      this.fire('stop');
      return this;
    };

    return App;

  }).call(this, Batman.Object);

}).call(this);

(function() {
  Batman.Association = (function() {
    Association.prototype.associationType = '';

    Association.prototype.isPolymorphic = false;

    Association.prototype.defaultOptions = {
      saveInline: true,
      autoload: true,
      nestUrl: false
    };

    function Association(model, label, options) {
      var association, defaultOptions, encoder, encoderKey, getAccessor;
      this.model = model;
      this.label = label;
      if (options == null) {
        options = {};
      }
      defaultOptions = {
        namespace: Batman.currentApp,
        name: Batman.helpers.camelize(Batman.helpers.singularize(this.label))
      };
      this.options = Batman.extend(defaultOptions, this.defaultOptions, options);
      if (this.options.nestUrl) {
        if (this.model.urlNestsUnder == null) {
          Batman.developer.error("You must persist the the model " + this.model.constructor.name + " to use the url helpers on an association");
        }
        this.model.urlNestsUnder(Batman.helpers.underscore(this.getRelatedModel().get('resourceName')));
      }
      if (this.options.extend != null) {
        Batman.extend(this, this.options.extend);
      }
      encoder = {
        encode: this.options.saveInline ? this.encoder() : false,
        decode: this.decoder()
      };
      encoderKey = options.encoderKey || this.label;
      this.model.encode(encoderKey, encoder);
      association = this;
      getAccessor = function() {
        return association.getAccessor.call(this, association, this.model, this.label);
      };
      this.model.accessor(this.label, {
        get: getAccessor,
        set: model.defaultAccessor.set,
        unset: model.defaultAccessor.unset
      });
    }

    Association.prototype.getRelatedModel = function() {
      var className, relatedModel, scope;
      scope = this.options.namespace || Batman.currentApp;
      className = this.options.name;
      relatedModel = scope != null ? scope[className] : void 0;
      Batman.developer["do"](function() {
        if ((Batman.currentApp != null) && !relatedModel) {
          return Batman.developer.warn("Related model " + className + " hasn't loaded yet.");
        }
      });
      return relatedModel;
    };

    Association.prototype.getFromAttributes = function(record) {
      return record.get("attributes." + this.label);
    };

    Association.prototype.setIntoAttributes = function(record, value) {
      return record.get('attributes').set(this.label, value);
    };

    Association.prototype.inverse = function() {
      var inverse, relatedAssocs,
        _this = this;
      if (relatedAssocs = this.getRelatedModel()._batman.get('associations')) {
        if (this.options.inverseOf) {
          return relatedAssocs.getByLabel(this.options.inverseOf);
        }
        inverse = null;
        relatedAssocs.forEach(function(label, assoc) {
          if (assoc.getRelatedModel() === _this.model) {
            return inverse = assoc;
          }
        });
        return inverse;
      }
    };

    Association.prototype.reset = function() {
      delete this.index;
      return true;
    };

    return Association;

  })();

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.PluralAssociation = (function(_super) {
    __extends(PluralAssociation, _super);

    PluralAssociation.prototype.proxyClass = Batman.AssociationSet;

    PluralAssociation.prototype.isSingular = false;

    function PluralAssociation() {
      PluralAssociation.__super__.constructor.apply(this, arguments);
      this._resetSetHashes();
    }

    PluralAssociation.prototype.setForRecord = function(record) {
      var childModelSetIndex, indexValue,
        _this = this;
      indexValue = this.indexValueForRecord(record);
      childModelSetIndex = this.setIndex();
      Batman.Property.withoutTracking(function() {
        return _this._setsByRecord.getOrSet(record, function() {
          var existingValueSet, newSet;
          if (indexValue != null) {
            existingValueSet = _this._setsByValue.get(indexValue);
            if (existingValueSet != null) {
              return existingValueSet;
            }
          }
          newSet = _this.proxyClassInstanceForKey(indexValue);
          if (indexValue != null) {
            _this._setsByValue.set(indexValue, newSet);
          }
          return newSet;
        });
      });
      if (indexValue != null) {
        return childModelSetIndex.get(indexValue);
      } else {
        return this._setsByRecord.get(record);
      }
    };

    PluralAssociation.prototype.setForKey = Batman.Property.wrapTrackingPrevention(function(indexValue) {
      var foundSet,
        _this = this;
      foundSet = void 0;
      this._setsByRecord.forEach(function(record, set) {
        if (foundSet != null) {
          return;
        }
        if (_this.indexValueForRecord(record) === indexValue) {
          return foundSet = set;
        }
      });
      if (foundSet != null) {
        foundSet.foreignKeyValue = indexValue;
        return foundSet;
      }
      return this._setsByValue.getOrSet(indexValue, function() {
        return _this.proxyClassInstanceForKey(indexValue);
      });
    });

    PluralAssociation.prototype.proxyClassInstanceForKey = function(indexValue) {
      return new this.proxyClass(indexValue, this);
    };

    PluralAssociation.prototype.getAccessor = function(self, model, label) {
      var relatedRecords, setInAttributes,
        _this = this;
      if (!self.getRelatedModel()) {
        return;
      }
      if (setInAttributes = self.getFromAttributes(this)) {
        return setInAttributes;
      } else {
        relatedRecords = self.setForRecord(this);
        self.setIntoAttributes(this, relatedRecords);
        Batman.Property.withoutTracking(function() {
          if (self.options.autoload && !_this.isNew() && !relatedRecords.loaded) {
            return relatedRecords.load(function(error, records) {
              if (error) {
                throw error;
              }
            });
          }
        });
        return relatedRecords;
      }
    };

    PluralAssociation.prototype.parentSetIndex = function() {
      this.parentIndex || (this.parentIndex = this.model.get('loaded').indexedByUnique(this.primaryKey));
      return this.parentIndex;
    };

    PluralAssociation.prototype.setIndex = function() {
      this.index || (this.index = new Batman.AssociationSetIndex(this, this[this.indexRelatedModelOn]));
      return this.index;
    };

    PluralAssociation.prototype.indexValueForRecord = function(record) {
      return record.get(this.primaryKey);
    };

    PluralAssociation.prototype.reset = function() {
      PluralAssociation.__super__.reset.apply(this, arguments);
      return this._resetSetHashes();
    };

    PluralAssociation.prototype._resetSetHashes = function() {
      this._setsByRecord = new Batman.SimpleHash;
      return this._setsByValue = new Batman.SimpleHash;
    };

    return PluralAssociation;

  })(Batman.Association);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.HasManyAssociation = (function(_super) {
    __extends(HasManyAssociation, _super);

    HasManyAssociation.prototype.associationType = 'hasMany';

    HasManyAssociation.prototype.indexRelatedModelOn = 'foreignKey';

    function HasManyAssociation(model, label, options) {
      if (options != null ? options.as : void 0) {
        return (function(func, args, ctor) {
          ctor.prototype = func.prototype;
          var child = new ctor, result = func.apply(child, args);
          return Object(result) === result ? result : child;
        })(Batman.PolymorphicHasManyAssociation, arguments, function(){});
      }
      HasManyAssociation.__super__.constructor.apply(this, arguments);
      this.primaryKey = this.options.primaryKey || "id";
      this.foreignKey = this.options.foreignKey || ("" + (Batman.helpers.underscore(model.get('resourceName'))) + "_id");
    }

    HasManyAssociation.prototype.apply = function(baseSaveError, base) {
      var relations, set,
        _this = this;
      if (!baseSaveError) {
        if (relations = this.getFromAttributes(base)) {
          relations.forEach(function(model) {
            return model.set(_this.foreignKey, base.get(_this.primaryKey));
          });
        }
        base.set(this.label, set = this.setForRecord(base));
        if (base.lifecycle.get('state') === 'creating') {
          return set.markAsLoaded();
        }
      }
    };

    HasManyAssociation.prototype.encoder = function() {
      var association;
      association = this;
      return function(relationSet, _, __, record) {
        var jsonArray;
        if (relationSet != null) {
          jsonArray = [];
          relationSet.forEach(function(relation) {
            var relationJSON;
            relationJSON = relation.toJSON();
            if (!association.inverse() || association.inverse().options.encodeForeignKey) {
              relationJSON[association.foreignKey] = record.get(association.primaryKey);
            }
            return jsonArray.push(relationJSON);
          });
        }
        return jsonArray;
      };
    };

    HasManyAssociation.prototype.decoder = function() {
      var association;
      association = this;
      return function(data, key, _, __, parentRecord) {
        var children, id, jsonObject, newChildren, record, recordsToAdd, recordsToMap, relatedModel, _i, _len, _ref;
        if (!(relatedModel = association.getRelatedModel())) {
          Batman.developer.error("Can't decode model " + association.options.name + " because it hasn't been loaded yet!");
          return;
        }
        children = association.setForRecord(parentRecord);
        newChildren = children.filter(function(relation) {
          return relation.isNew();
        }).toArray();
        recordsToMap = [];
        recordsToAdd = [];
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          jsonObject = data[_i];
          id = jsonObject[relatedModel.primaryKey];
          record = relatedModel._loadIdentity(id);
          if (record != null) {
            recordsToAdd.push(record);
          } else {
            if (newChildren.length > 0) {
              record = newChildren.shift();
              if (id != null) {
                recordsToMap.push(record);
              }
            } else {
              record = new relatedModel;
              if (id != null) {
                recordsToMap.push(record);
              }
              recordsToAdd.push(record);
            }
          }
          record._withoutDirtyTracking(function() {
            this.fromJSON(jsonObject);
            if (association.options.inverseOf) {
              return record.set(association.options.inverseOf, parentRecord);
            }
          });
        }
        (_ref = relatedModel.get('loaded')).add.apply(_ref, recordsToMap);
        children.add.apply(children, recordsToAdd);
        children.markAsLoaded();
        return children;
      };
    };

    return HasManyAssociation;

  })(Batman.PluralAssociation);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.PolymorphicHasManyAssociation = (function(_super) {
    __extends(PolymorphicHasManyAssociation, _super);

    PolymorphicHasManyAssociation.prototype.proxyClass = Batman.PolymorphicAssociationSet;

    PolymorphicHasManyAssociation.prototype.isPolymorphic = true;

    function PolymorphicHasManyAssociation(model, label, options) {
      options.inverseOf = this.foreignLabel = options.as;
      delete options.as;
      options.foreignKey || (options.foreignKey = "" + this.foreignLabel + "_id");
      PolymorphicHasManyAssociation.__super__.constructor.call(this, model, label, options);
      this.foreignTypeKey = options.foreignTypeKey || ("" + this.foreignLabel + "_type");
      this.model.encode(this.foreignTypeKey);
    }

    PolymorphicHasManyAssociation.prototype.apply = function(baseSaveError, base) {
      var relations,
        _this = this;
      if (!baseSaveError) {
        if (relations = this.getFromAttributes(base)) {
          PolymorphicHasManyAssociation.__super__.apply.apply(this, arguments);
          relations.forEach(function(model) {
            return model.set(_this.foreignTypeKey, _this.modelType());
          });
        }
      }
    };

    PolymorphicHasManyAssociation.prototype.proxyClassInstanceForKey = function(indexValue) {
      return new this.proxyClass(indexValue, this.modelType(), this);
    };

    PolymorphicHasManyAssociation.prototype.getRelatedModelForType = function(type) {
      var relatedModel, scope;
      scope = this.options.namespace || Batman.currentApp;
      if (type) {
        relatedModel = scope != null ? scope[type] : void 0;
        relatedModel || (relatedModel = scope != null ? scope[Batman.helpers.camelize(type)] : void 0);
      } else {
        relatedModel = this.getRelatedModel();
      }
      Batman.developer["do"](function() {
        if ((Batman.currentApp != null) && !relatedModel) {
          return Batman.developer.warn("Related model " + type + " for polymorphic association not found.");
        }
      });
      return relatedModel;
    };

    PolymorphicHasManyAssociation.prototype.modelType = function() {
      return this.model.get('resourceName');
    };

    PolymorphicHasManyAssociation.prototype.setIndex = function() {
      return this.typeIndex || (this.typeIndex = new Batman.PolymorphicAssociationSetIndex(this, this.modelType(), this[this.indexRelatedModelOn]));
    };

    PolymorphicHasManyAssociation.prototype.encoder = function() {
      var association;
      association = this;
      return function(relationSet, _, __, record) {
        var jsonArray;
        if (relationSet != null) {
          jsonArray = [];
          relationSet.forEach(function(relation) {
            var relationJSON;
            relationJSON = relation.toJSON();
            relationJSON[association.foreignKey] = record.get(association.primaryKey);
            relationJSON[association.foreignTypeKey] = association.modelType();
            return jsonArray.push(relationJSON);
          });
        }
        return jsonArray;
      };
    };

    PolymorphicHasManyAssociation.prototype.decoder = function() {
      var association;
      association = this;
      return function(data, key, _, __, parentRecord) {
        var children, id, jsonObject, newChildren, record, recordsToAdd, relatedModel, type, _i, _len;
        children = association.getFromAttributes(parentRecord) || association.setForRecord(parentRecord);
        newChildren = children.filter(function(relation) {
          return relation.isNew();
        }).toArray();
        recordsToAdd = [];
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          jsonObject = data[_i];
          type = jsonObject[association.options.foreignTypeKey];
          if (!(relatedModel = association.getRelatedModelForType(type))) {
            Batman.developer.error("Can't decode model " + association.options.name + " because it hasn't been loaded yet!");
            return;
          }
          id = jsonObject[relatedModel.primaryKey];
          record = relatedModel._loadIdentity(id);
          if (record != null) {
            record._withoutDirtyTracking(function() {
              return this.fromJSON(jsonObject);
            });
            recordsToAdd.push(record);
          } else {
            if (newChildren.length > 0) {
              record = newChildren.shift();
              record._withoutDirtyTracking(function() {
                return this.fromJSON(jsonObject);
              });
              record = relatedModel._mapIdentity(record);
            } else {
              record = relatedModel._makeOrFindRecordFromData(jsonObject);
              recordsToAdd.push(record);
            }
          }
          if (association.options.inverseOf) {
            record._withoutDirtyTracking(function() {
              return record.set(association.options.inverseOf, parentRecord);
            });
          }
        }
        children.add.apply(children, recordsToAdd);
        children.markAsLoaded();
        return children;
      };
    };

    return PolymorphicHasManyAssociation;

  })(Batman.HasManyAssociation);

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.SingularAssociation = (function(_super) {
    __extends(SingularAssociation, _super);

    function SingularAssociation() {
      _ref = SingularAssociation.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    SingularAssociation.prototype.isSingular = true;

    SingularAssociation.prototype.getAccessor = function(association, model, label) {
      var proxy, record, recordInAttributes,
        _this = this;
      if (recordInAttributes = association.getFromAttributes(this)) {
        return recordInAttributes;
      }
      if (association.getRelatedModel()) {
        proxy = this.associationProxy(association);
        record = false;
        if (proxy._loadSetter == null) {
          proxy._loadSetter = proxy.once('loaded', function(child) {
            return _this._withoutDirtyTracking(function() {
              return this.set(association.label, child);
            });
          });
        }
        if (!Batman.Property.withoutTracking(function() {
          return proxy.get('loaded');
        })) {
          if (association.options.autoload) {
            Batman.Property.withoutTracking(function() {
              return proxy.load();
            });
          } else {
            record = proxy.loadFromLocal();
          }
        }
        return record || proxy;
      }
    };

    SingularAssociation.prototype.setIndex = function() {
      return this.index || (this.index = new Batman.UniqueAssociationSetIndex(this, this[this.indexRelatedModelOn]));
    };

    return SingularAssociation;

  })(Batman.Association);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.HasOneAssociation = (function(_super) {
    __extends(HasOneAssociation, _super);

    HasOneAssociation.prototype.associationType = 'hasOne';

    HasOneAssociation.prototype.proxyClass = Batman.HasOneProxy;

    HasOneAssociation.prototype.indexRelatedModelOn = 'foreignKey';

    function HasOneAssociation() {
      HasOneAssociation.__super__.constructor.apply(this, arguments);
      this.primaryKey = this.options.primaryKey || "id";
      this.foreignKey = this.options.foreignKey || ("" + (Batman.helpers.underscore(this.model.get('resourceName'))) + "_id");
    }

    HasOneAssociation.prototype.apply = function(baseSaveError, base) {
      var relation;
      if (!baseSaveError) {
        if (relation = this.getFromAttributes(base)) {
          return relation.set(this.foreignKey, base.get(this.primaryKey));
        }
      }
    };

    HasOneAssociation.prototype.encoder = function() {
      var association;
      association = this;
      return function(val, key, object, record) {
        var json;
        if (!association.options.saveInline) {
          return;
        }
        if (json = val.toJSON()) {
          json[association.foreignKey] = record.get(association.primaryKey);
        }
        return json;
      };
    };

    HasOneAssociation.prototype.decoder = function() {
      var association;
      association = this;
      return function(data, _, __, ___, parentRecord) {
        var record, relatedModel;
        if (!data) {
          return;
        }
        relatedModel = association.getRelatedModel();
        record = relatedModel.createFromJSON(data);
        if (association.options.inverseOf) {
          record.set(association.options.inverseOf, parentRecord);
        }
        return record;
      };
    };

    return HasOneAssociation;

  })(Batman.SingularAssociation);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.BelongsToAssociation = (function(_super) {
    __extends(BelongsToAssociation, _super);

    BelongsToAssociation.prototype.associationType = 'belongsTo';

    BelongsToAssociation.prototype.proxyClass = Batman.BelongsToProxy;

    BelongsToAssociation.prototype.indexRelatedModelOn = 'primaryKey';

    BelongsToAssociation.prototype.defaultOptions = {
      saveInline: false,
      autoload: true,
      encodeForeignKey: true
    };

    function BelongsToAssociation(model, label, options) {
      if (options != null ? options.polymorphic : void 0) {
        delete options.polymorphic;
        return (function(func, args, ctor) {
          ctor.prototype = func.prototype;
          var child = new ctor, result = func.apply(child, args);
          return Object(result) === result ? result : child;
        })(Batman.PolymorphicBelongsToAssociation, arguments, function(){});
      }
      BelongsToAssociation.__super__.constructor.apply(this, arguments);
      this.foreignKey = this.options.foreignKey || ("" + this.label + "_id");
      this.primaryKey = this.options.primaryKey || "id";
      if (this.options.encodeForeignKey) {
        this.model.encode(this.foreignKey);
      }
    }

    BelongsToAssociation.prototype.encoder = function() {
      return function(val) {
        return val.toJSON();
      };
    };

    BelongsToAssociation.prototype.decoder = function() {
      var association;
      association = this;
      return function(data, _, __, ___, childRecord) {
        var inverse, record, relatedModel;
        relatedModel = association.getRelatedModel();
        record = relatedModel.createFromJSON(data);
        if (association.options.inverseOf) {
          if (inverse = association.inverse()) {
            if (inverse instanceof Batman.HasManyAssociation) {
              childRecord.set(association.foreignKey, record.get(association.primaryKey));
            } else {
              record.set(inverse.label, childRecord);
            }
          }
        }
        childRecord.set(association.label, record);
        return record;
      };
    };

    BelongsToAssociation.prototype.apply = function(base) {
      var foreignValue, model;
      if (model = base.get(this.label)) {
        foreignValue = model.get(this.primaryKey);
        if (foreignValue !== void 0) {
          return base.set(this.foreignKey, foreignValue);
        }
      }
    };

    return BelongsToAssociation;

  })(Batman.SingularAssociation);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.PolymorphicBelongsToAssociation = (function(_super) {
    __extends(PolymorphicBelongsToAssociation, _super);

    PolymorphicBelongsToAssociation.prototype.isPolymorphic = true;

    PolymorphicBelongsToAssociation.prototype.proxyClass = Batman.PolymorphicBelongsToProxy;

    PolymorphicBelongsToAssociation.prototype.defaultOptions = Batman.mixin({}, Batman.BelongsToAssociation.prototype.defaultOptions, {
      encodeForeignTypeKey: true
    });

    function PolymorphicBelongsToAssociation() {
      PolymorphicBelongsToAssociation.__super__.constructor.apply(this, arguments);
      this.foreignTypeKey = this.options.foreignTypeKey || ("" + this.label + "_type");
      if (this.options.encodeForeignTypeKey) {
        this.model.encode(this.foreignTypeKey);
      }
      this.typeIndicies = {};
    }

    PolymorphicBelongsToAssociation.prototype.getRelatedModel = false;

    PolymorphicBelongsToAssociation.prototype.setIndex = false;

    PolymorphicBelongsToAssociation.prototype.inverse = false;

    PolymorphicBelongsToAssociation.prototype.apply = function(base) {
      var foreignTypeValue, instanceOrProxy;
      PolymorphicBelongsToAssociation.__super__.apply.apply(this, arguments);
      if (instanceOrProxy = base.get(this.label)) {
        foreignTypeValue = instanceOrProxy instanceof Batman.PolymorphicBelongsToProxy ? instanceOrProxy.get('foreignTypeValue') : instanceOrProxy.constructor.get('resourceName');
        return base.set(this.foreignTypeKey, foreignTypeValue);
      }
    };

    PolymorphicBelongsToAssociation.prototype.getAccessor = function(self, model, label) {
      var proxy, recordInAttributes;
      if (recordInAttributes = self.getFromAttributes(this)) {
        return recordInAttributes;
      }
      if (self.getRelatedModelForType(this.get(self.foreignTypeKey))) {
        proxy = this.associationProxy(self);
        Batman.Property.withoutTracking(function() {
          if (!proxy.get('loaded') && self.options.autoload) {
            return proxy.load();
          }
        });
        return proxy;
      }
    };

    PolymorphicBelongsToAssociation.prototype.url = function(recordOptions) {
      var ending, helper, id, inverse, root, type, _ref, _ref1;
      type = (_ref = recordOptions.data) != null ? _ref[this.foreignTypeKey] : void 0;
      if (type && (inverse = this.inverseForType(type))) {
        root = Batman.helpers.pluralize(type).toLowerCase();
        id = (_ref1 = recordOptions.data) != null ? _ref1[this.foreignKey] : void 0;
        helper = inverse.isSingular ? "singularize" : "pluralize";
        ending = Batman.helpers[helper](inverse.label);
        return "/" + root + "/" + id + "/" + ending;
      }
    };

    PolymorphicBelongsToAssociation.prototype.getRelatedModelForType = function(type) {
      var relatedModel, scope;
      scope = this.options.namespace || Batman.currentApp;
      if (type) {
        relatedModel = scope != null ? scope[type] : void 0;
        relatedModel || (relatedModel = scope != null ? scope[Batman.helpers.camelize(type)] : void 0);
      }
      Batman.developer["do"](function() {
        if ((Batman.currentApp != null) && !relatedModel) {
          return Batman.developer.warn("Related model " + type + " for polymorphic association not found.");
        }
      });
      return relatedModel;
    };

    PolymorphicBelongsToAssociation.prototype.setIndexForType = function(type) {
      var _base;
      (_base = this.typeIndicies)[type] || (_base[type] = new Batman.PolymorphicUniqueAssociationSetIndex(this, type, this.primaryKey));
      return this.typeIndicies[type];
    };

    PolymorphicBelongsToAssociation.prototype.inverseForType = function(type) {
      var inverse, relatedAssocs, _ref,
        _this = this;
      if (relatedAssocs = (_ref = this.getRelatedModelForType(type)) != null ? _ref._batman.get('associations') : void 0) {
        if (this.options.inverseOf) {
          return relatedAssocs.getByLabel(this.options.inverseOf);
        }
        inverse = null;
        relatedAssocs.forEach(function(label, assoc) {
          if (assoc.getRelatedModel() === _this.model) {
            return inverse = assoc;
          }
        });
        return inverse;
      }
    };

    PolymorphicBelongsToAssociation.prototype.decoder = function() {
      var association;
      association = this;
      return function(data, key, response, ___, childRecord) {
        var foreignTypeValue, inverse, record, relatedModel;
        foreignTypeValue = response[association.foreignTypeKey] || childRecord.get(association.foreignTypeKey);
        relatedModel = association.getRelatedModelForType(foreignTypeValue);
        record = relatedModel.createFromJSON(data);
        if (association.options.inverseOf) {
          if (inverse = association.inverseForType(foreignTypeValue)) {
            if (inverse instanceof Batman.PolymorphicHasManyAssociation) {
              childRecord.set(association.foreignKey, record.get(association.primaryKey));
              childRecord.set(association.foreignTypeKey, foreignTypeValue);
            } else {
              record.set(inverse.label, childRecord);
            }
          }
        }
        childRecord.set(association.label, record);
        return record;
      };
    };

    return PolymorphicBelongsToAssociation;

  })(Batman.BelongsToAssociation);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  Batman.Validator = (function(_super) {
    __extends(Validator, _super);

    Validator.triggers = function() {
      var triggers;
      triggers = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      if (this._triggers != null) {
        return this._triggers.concat(triggers);
      } else {
        return this._triggers = triggers;
      }
    };

    Validator.options = function() {
      var options;
      options = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      if (this._options != null) {
        return this._options.concat(options);
      } else {
        return this._options = options;
      }
    };

    Validator.matches = function(options) {
      var key, results, shouldReturn, value, _ref, _ref1;
      results = {};
      shouldReturn = false;
      for (key in options) {
        value = options[key];
        if (~((_ref = this._options) != null ? _ref.indexOf(key) : void 0)) {
          results[key] = value;
        }
        if (~((_ref1 = this._triggers) != null ? _ref1.indexOf(key) : void 0)) {
          results[key] = value;
          shouldReturn = true;
        }
      }
      if (shouldReturn) {
        return results;
      }
    };

    function Validator() {
      var mixins, options;
      options = arguments[0], mixins = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      this.options = options;
      Validator.__super__.constructor.apply(this, mixins);
    }

    Validator.prototype.validate = function(record) {
      return Batman.developer.error("You must override validate in Batman.Validator subclasses.");
    };

    Validator.prototype.format = function(key, messageKey, interpolations) {
      return Batman.t("errors.messages." + messageKey, interpolations);
    };

    Validator.prototype.handleBlank = function(value) {
      if (this.options.allowBlank && !Batman.PresenceValidator.prototype.isPresent(value)) {
        return true;
      }
    };

    return Validator;

  })(Batman.Object);

}).call(this);

(function() {
  Batman.Validators = [];

  Batman.extend(Batman.translate.messages, {
    errors: {
      base: {
        format: "%{message}"
      },
      format: "%{attribute} %{message}",
      messages: {
        too_short: "must be at least %{count} characters",
        too_long: "must be less than %{count} characters",
        wrong_length: "must be %{count} characters",
        blank: "can't be blank",
        not_numeric: "must be a number",
        greater_than: "must be greater than %{count}",
        greater_than_or_equal_to: "must be greater than or equal to %{count}",
        equal_to: "must be equal to %{count}",
        less_than: "must be less than %{count}",
        less_than_or_equal_to: "must be less than or equal to %{count}",
        not_matching: "is not valid",
        invalid_association: "is not valid",
        not_included_in_list: "is not included in the list",
        included_in_list: "is included in the list"
      }
    }
  });

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.RegExpValidator = (function(_super) {
    __extends(RegExpValidator, _super);

    RegExpValidator.triggers('regexp', 'pattern');

    RegExpValidator.options('allowBlank');

    function RegExpValidator(options) {
      var _ref;
      this.regexp = (_ref = options.regexp) != null ? _ref : options.pattern;
      RegExpValidator.__super__.constructor.apply(this, arguments);
    }

    RegExpValidator.prototype.validateEach = function(errors, record, key, callback) {
      var value;
      value = record.get(key);
      if (this.handleBlank(value)) {
        return callback();
      }
      if ((value == null) || value === '' || !this.regexp.test(value)) {
        errors.add(key, this.format(key, 'not_matching'));
      }
      return callback();
    };

    return RegExpValidator;

  })(Batman.Validator);

  Batman.Validators.push(Batman.RegExpValidator);

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.PresenceValidator = (function(_super) {
    __extends(PresenceValidator, _super);

    function PresenceValidator() {
      _ref = PresenceValidator.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    PresenceValidator.triggers('presence');

    PresenceValidator.prototype.validateEach = function(errors, record, key, callback) {
      var value;
      value = record.get(key);
      if (!this.isPresent(value)) {
        errors.add(key, this.format(key, 'blank'));
      }
      return callback();
    };

    PresenceValidator.prototype.isPresent = function(value) {
      return (value != null) && value !== '';
    };

    return PresenceValidator;

  })(Batman.Validator);

  Batman.Validators.push(Batman.PresenceValidator);

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.NumericValidator = (function(_super) {
    __extends(NumericValidator, _super);

    function NumericValidator() {
      _ref = NumericValidator.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    NumericValidator.triggers('numeric', 'greaterThan', 'greaterThanOrEqualTo', 'equalTo', 'lessThan', 'lessThanOrEqualTo');

    NumericValidator.options('allowBlank');

    NumericValidator.prototype.validateEach = function(errors, record, key, callback) {
      var options, value;
      options = this.options;
      value = record.get(key);
      if (this.handleBlank(value)) {
        return callback();
      }
      if ((value == null) || !(this.isNumeric(value) || this.canCoerceToNumeric(value))) {
        errors.add(key, this.format(key, 'not_numeric'));
      } else {
        if ((options.greaterThan != null) && value <= options.greaterThan) {
          errors.add(key, this.format(key, 'greater_than', {
            count: options.greaterThan
          }));
        }
        if ((options.greaterThanOrEqualTo != null) && value < options.greaterThanOrEqualTo) {
          errors.add(key, this.format(key, 'greater_than_or_equal_to', {
            count: options.greaterThanOrEqualTo
          }));
        }
        if ((options.equalTo != null) && value !== options.equalTo) {
          errors.add(key, this.format(key, 'equal_to', {
            count: options.equalTo
          }));
        }
        if ((options.lessThan != null) && value >= options.lessThan) {
          errors.add(key, this.format(key, 'less_than', {
            count: options.lessThan
          }));
        }
        if ((options.lessThanOrEqualTo != null) && value > options.lessThanOrEqualTo) {
          errors.add(key, this.format(key, 'less_than_or_equal_to', {
            count: options.lessThanOrEqualTo
          }));
        }
      }
      return callback();
    };

    NumericValidator.prototype.isNumeric = function(value) {
      return !isNaN(parseFloat(value)) && isFinite(value);
    };

    NumericValidator.prototype.canCoerceToNumeric = function(value) {
      return (value - 0) == value && value.length > 0;
    };

    return NumericValidator;

  })(Batman.Validator);

  Batman.Validators.push(Batman.NumericValidator);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.LengthValidator = (function(_super) {
    __extends(LengthValidator, _super);

    LengthValidator.triggers('minLength', 'maxLength', 'length', 'lengthWithin', 'lengthIn');

    LengthValidator.options('allowBlank');

    function LengthValidator(options) {
      var range;
      if (range = options.lengthIn || options.lengthWithin) {
        options.minLength = range[0];
        options.maxLength = range[1] || -1;
        delete options.lengthWithin;
        delete options.lengthIn;
      }
      LengthValidator.__super__.constructor.apply(this, arguments);
    }

    LengthValidator.prototype.validateEach = function(errors, record, key, callback) {
      var options, value;
      options = this.options;
      value = record.get(key);
      if (value !== '' && this.handleBlank(value)) {
        return callback();
      }
      if (value == null) {
        value = [];
      }
      if (options.minLength && value.length < options.minLength) {
        errors.add(key, this.format(key, 'too_short', {
          count: options.minLength
        }));
      }
      if (options.maxLength && value.length > options.maxLength) {
        errors.add(key, this.format(key, 'too_long', {
          count: options.maxLength
        }));
      }
      if (options.length && value.length !== options.length) {
        errors.add(key, this.format(key, 'wrong_length', {
          count: options.length
        }));
      }
      return callback();
    };

    return LengthValidator;

  })(Batman.Validator);

  Batman.Validators.push(Batman.LengthValidator);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.InclusionValidator = (function(_super) {
    __extends(InclusionValidator, _super);

    InclusionValidator.triggers('inclusion');

    function InclusionValidator(options) {
      this.acceptableValues = options.inclusion["in"];
      InclusionValidator.__super__.constructor.apply(this, arguments);
    }

    InclusionValidator.prototype.validateEach = function(errors, record, key, callback) {
      if (this.acceptableValues.indexOf(record.get(key)) === -1) {
        errors.add(key, this.format(key, 'not_included_in_list'));
      }
      return callback();
    };

    return InclusionValidator;

  })(Batman.Validator);

  Batman.Validators.push(Batman.InclusionValidator);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.ExclusionValidator = (function(_super) {
    __extends(ExclusionValidator, _super);

    ExclusionValidator.triggers('exclusion');

    function ExclusionValidator(options) {
      this.unacceptableValues = options.exclusion["in"];
      ExclusionValidator.__super__.constructor.apply(this, arguments);
    }

    ExclusionValidator.prototype.validateEach = function(errors, record, key, callback) {
      if (this.unacceptableValues.indexOf(record.get(key)) >= 0) {
        errors.add(key, this.format(key, 'included_in_list'));
      }
      return callback();
    };

    return ExclusionValidator;

  })(Batman.Validator);

  Batman.Validators.push(Batman.ExclusionValidator);

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.AssociatedValidator = (function(_super) {
    __extends(AssociatedValidator, _super);

    function AssociatedValidator() {
      _ref = AssociatedValidator.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    AssociatedValidator.triggers('associated');

    AssociatedValidator.prototype.validateEach = function(errors, record, key, callback) {
      var childFinished, count, value,
        _this = this;
      value = record.get(key);
      if (value != null) {
        if (value instanceof Batman.AssociationProxy) {
          value = typeof value.get === "function" ? value.get('target') : void 0;
        }
        count = 1;
        childFinished = function(err, childErrors) {
          if (childErrors.length > 0) {
            errors.add(key, _this.format(key, 'invalid_association'));
          }
          if (--count === 0) {
            return callback();
          }
        };
        if ((value != null ? value.forEach : void 0) != null) {
          value.forEach(function(record) {
            count += 1;
            return record.validate(childFinished);
          });
        } else if ((value != null ? value.validate : void 0) != null) {
          count += 1;
          value.validate(childFinished);
        }
        return childFinished(null, []);
      } else {
        return callback();
      }
    };

    return AssociatedValidator;

  })(Batman.Validator);

  Batman.Validators.push(Batman.AssociatedValidator);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.ControllerActionFrame = (function(_super) {
    __extends(ControllerActionFrame, _super);

    ControllerActionFrame.prototype.operationOccurred = false;

    ControllerActionFrame.prototype.remainingOperations = 0;

    ControllerActionFrame.prototype.event('complete').oneShot = true;

    function ControllerActionFrame(options, onComplete) {
      ControllerActionFrame.__super__.constructor.call(this, options);
      this.once('complete', onComplete);
    }

    ControllerActionFrame.prototype.startOperation = function(options) {
      if (options == null) {
        options = {};
      }
      if (!options.internal) {
        this.operationOccurred = true;
      }
      this._changeOperationsCounter(1);
      return true;
    };

    ControllerActionFrame.prototype.finishOperation = function() {
      this._changeOperationsCounter(-1);
      return true;
    };

    ControllerActionFrame.prototype.startAndFinishOperation = function(options) {
      this.startOperation(options);
      this.finishOperation(options);
      return true;
    };

    ControllerActionFrame.prototype._changeOperationsCounter = function(delta) {
      var _ref;
      this.remainingOperations += delta;
      if (this.remainingOperations === 0) {
        this.fire('complete');
      }
      if ((_ref = this.parentFrame) != null) {
        _ref._changeOperationsCounter(delta);
      }
    };

    return ControllerActionFrame;

  })(Batman.Object);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.HTMLStore = (function(_super) {
    __extends(HTMLStore, _super);

    function HTMLStore() {
      HTMLStore.__super__.constructor.apply(this, arguments);
      this._htmlContents = {};
      this._requestedPaths = new Batman.SimpleSet;
    }

    HTMLStore.prototype.propertyClass = Batman.Property;

    HTMLStore.prototype.fetchHTML = function(path) {
      var _this = this;
      return new Batman.Request({
        url: Batman.Navigator.normalizePath(Batman.config.pathToHTML, "" + path + ".html"),
        type: 'html',
        success: function(response) {
          return _this.set(path, response);
        },
        error: function(response) {
          throw new Error("Could not load html from " + path);
        }
      });
    };

    HTMLStore.accessor({
      'final': true,
      get: function(path) {
        var contents;
        if (path.charAt(0) !== '/') {
          return this.get("/" + path);
        }
        if (this._htmlContents[path]) {
          return this._htmlContents[path];
        }
        if (this._requestedPaths.has(path)) {
          return;
        }
        if (contents = this._sourceFromDOM(path)) {
          return contents;
        }
        if (Batman.config.fetchRemoteHTML) {
          this.fetchHTML(path);
        } else {
          throw new Error("Couldn't find html source for \'" + path + "\'!");
        }
      },
      set: function(path, content) {
        if (path.charAt(0) !== '/') {
          return this.set("/" + path, content);
        }
        this._requestedPaths.add(path);
        return this._htmlContents[path] = content;
      }
    });

    HTMLStore.prototype.prefetch = function(path) {
      this.get(path);
      return true;
    };

    HTMLStore.prototype._sourceFromDOM = function(path) {
      var node, relativePath;
      relativePath = path.slice(1);
      if (node = Batman.DOM.querySelector(document, "[data-defineview*='" + relativePath + "']")) {
        Batman.setImmediate(function() {
          var _ref;
          return (_ref = node.parentNode) != null ? _ref.removeChild(node) : void 0;
        });
        return Batman.View.store.set(Batman.Navigator.normalizePath(path), node.innerHTML);
      }
    };

    return HTMLStore;

  })(Batman.Object);

}).call(this);

(function() {
  var _base, _base1,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  Batman.View = (function(_super) {
    __extends(View, _super);

    View.store = new Batman.HTMLStore;

    View.option = function() {
      var keys, options;
      keys = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      Batman.initializeObject(this);
      if (options = this._batman.options) {
        keys = options.concat(keys);
      }
      return this._batman.set('options', keys);
    };

    View.viewForNode = function(node, climbTree) {
      var view;
      if (climbTree == null) {
        climbTree = true;
      }
      while (node) {
        if (view = Batman._data(node, 'view')) {
          return view;
        }
        if (!climbTree) {
          return;
        }
        node = node.parentNode;
      }
    };

    View.prototype.bindings = [];

    View.prototype.subviews = [];

    View.prototype.superview = null;

    View.prototype.controller = null;

    View.prototype.source = null;

    View.prototype.html = null;

    View.prototype.node = null;

    View.prototype.bindImmediately = true;

    View.prototype.isBound = false;

    View.prototype.isInDOM = false;

    View.prototype.isView = true;

    View.prototype.isDead = false;

    View.prototype.isBackingView = false;

    function View() {
      var superview,
        _this = this;
      this.bindings = [];
      this.subviews = new Batman.Set;
      this.subviews.on('itemsWereAdded', function(newSubviews) {
        var subview, _i, _len;
        for (_i = 0, _len = newSubviews.length; _i < _len; _i++) {
          subview = newSubviews[_i];
          _this._addSubview(subview);
        }
      });
      this.subviews.on('itemsWereRemoved', function(oldSubviews) {
        var subview, _i, _len;
        for (_i = 0, _len = oldSubviews.length; _i < _len; _i++) {
          subview = oldSubviews[_i];
          subview._removeFromSuperview();
        }
      });
      View.__super__.constructor.apply(this, arguments);
      if (superview = this.superview) {
        this.superview = null;
        superview.subviews.add(this);
      }
    }

    View.prototype._addChildBinding = function(binding) {
      return this.bindings.push(binding);
    };

    View.prototype._addSubview = function(subview) {
      var subviewController, yieldName, yieldObject;
      subviewController = subview.controller;
      subview.removeFromSuperview();
      subview.set('controller', subviewController || this.controller);
      subview.set('superview', this);
      subview.fire('viewDidMoveToSuperview');
      if ((yieldName = subview.contentFor) && !subview.parentNode) {
        yieldObject = Batman.DOM.Yield.withName(yieldName);
        yieldObject.set('contentView', subview);
      }
      this.get('node');
      subview.get('node');
      this.observe('node', subview._nodesChanged);
      subview.observe('node', subview._nodesChanged);
      subview.observe('parentNode', subview._nodesChanged);
      return subview._nodesChanged();
    };

    View.prototype._removeFromSuperview = function() {
      var superview;
      if (!this.superview) {
        return;
      }
      this.fire('viewWillRemoveFromSuperview');
      this.forget('node', this._nodesChanged);
      this.forget('parentNode', this._nodesChanged);
      this.superview.forget('node', this._nodesChanged);
      superview = this.get('superview');
      this.removeFromParentNode();
      this.set('superview', null);
      return this.set('controller', null);
    };

    View.prototype.removeFromSuperview = function() {
      var _ref;
      return (_ref = this.superview) != null ? _ref.subviews.remove(this) : void 0;
    };

    View.prototype._nodesChanged = function() {
      var parentNode, superviewNode;
      if (!this.node) {
        return;
      }
      if (this.bindImmediately) {
        this.initializeBindings();
      }
      superviewNode = this.superview.get('node');
      parentNode = this.parentNode;
      if (typeof parentNode === 'string') {
        parentNode = Batman.DOM.querySelector(superviewNode, parentNode);
      }
      if (!parentNode) {
        parentNode = superviewNode;
      }
      if (parentNode) {
        return this.addToParentNode(parentNode);
      }
    };

    View.prototype.addToParentNode = function(parentNode) {
      var isInDOM;
      if (!this.get('node')) {
        return;
      }
      isInDOM = Batman.DOM.containsNode(parentNode);
      if (isInDOM) {
        this.propagateToSubviews('viewWillAppear');
      }
      this.insertIntoDOM(parentNode);
      this.propagateToSubviews('isInDOM', isInDOM);
      if (isInDOM) {
        return this.propagateToSubviews('viewDidAppear');
      }
    };

    View.prototype.insertIntoDOM = function(parentNode) {
      if (parentNode !== this.node) {
        return parentNode.appendChild(this.node);
      }
    };

    View.prototype.removeFromParentNode = function() {
      var isInDOM, node, _ref, _ref1, _ref2;
      node = this.get('node');
      isInDOM = (_ref = this.wasInDOM) != null ? _ref : Batman.DOM.containsNode(node);
      if (isInDOM) {
        this.propagateToSubviews('viewWillDisappear');
      }
      if ((_ref1 = this.node) != null) {
        if ((_ref2 = _ref1.parentNode) != null) {
          _ref2.removeChild(this.node);
        }
      }
      this.propagateToSubviews('isInDOM', false);
      if (isInDOM) {
        return this.propagateToSubviews('viewDidDisappear');
      }
    };

    View.prototype.propagateToSubviews = function(eventName, value) {
      var subview, _i, _len, _ref, _results;
      if (value != null) {
        this.set(eventName, value);
      } else {
        this.fire(eventName);
        if (typeof this[eventName] === "function") {
          this[eventName]();
        }
      }
      _ref = this.subviews._storage;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        subview = _ref[_i];
        _results.push(subview.propagateToSubviews(eventName, value));
      }
      return _results;
    };

    View.prototype.loadView = function(_node) {
      var html, node;
      if ((html = this.get('html')) != null) {
        node = _node || document.createElement('div');
        Batman.DOM.setInnerHTML(node, html);
        return node;
      }
    };

    View.accessor('html', {
      get: function() {
        var handler, property, source,
          _this = this;
        if (this.html != null) {
          return this.html;
        }
        if (!(source = this.get('source'))) {
          return;
        }
        source = Batman.Navigator.normalizePath(source);
        this.html = this.constructor.store.get(source);
        if (this.html == null) {
          property = this.property('html');
          handler = function(html) {
            if (html != null) {
              _this.set('html', html);
            }
            return property.removeHandler(handler);
          };
          property.addHandler(handler);
        }
        return this.html;
      },
      set: function(key, html) {
        this.destroyBindings();
        this.destroySubviews();
        this.html = html;
        if (this.node && (html != null)) {
          this.loadView(this.node);
        }
        if (this.bindImmediately) {
          return this.initializeBindings();
        }
      }
    });

    View.accessor('node', {
      get: function() {
        var node;
        if ((this.node == null) && !this.isDead) {
          node = this.loadView();
          if (node) {
            this.set('node', node);
          }
          this.fire('viewDidLoad');
        }
        return this.node;
      },
      set: function(key, node, oldNode) {
        var _this = this;
        if (oldNode) {
          Batman.removeData(oldNode, 'view', true);
        }
        if (node === this.node) {
          return;
        }
        this.destroyBindings();
        this.destroySubviews();
        this.node = node;
        if (!node) {
          return;
        }
        Batman._data(node, 'view', this);
        Batman.developer["do"](function() {
          var extraInfo, _base;
          extraInfo = _this.get('displayName') || _this.get('source');
          return typeof (_base = (node === document ? document.body : node)).setAttribute === "function" ? _base.setAttribute('batman-view', _this.constructor.name + (extraInfo ? ": " + extraInfo : '')) : void 0;
        });
        return node;
      }
    });

    View.prototype.event('ready').oneShot = true;

    View.prototype.initializeBindings = function() {
      if (this.isBound || !this.node) {
        return;
      }
      new Batman.BindingParser(this);
      this.set('isBound', true);
      this.fire('ready');
      return typeof this.ready === "function" ? this.ready() : void 0;
    };

    View.prototype.destroyBindings = function() {
      var binding, _i, _len, _ref;
      _ref = this.bindings;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        binding = _ref[_i];
        binding.die();
      }
      this.bindings = [];
      return this.isBound = false;
    };

    View.prototype.destroySubviews = function() {
      var subview, _i, _len, _ref;
      if (this.isDead) {
        Batman.developer.warn("Tried to destroy the subviews of a dead view.");
        return;
      }
      _ref = this.subviews.toArray();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        subview = _ref[_i];
        subview.die();
      }
      return this.subviews.clear();
    };

    View.prototype.die = function() {
      var event, _, _ref, _ref1;
      if (this.isDead) {
        Batman.developer.warn("Tried to die() a view more than once.");
        return;
      }
      this.fire('destroy');
      if (this.node) {
        this.wasInDOM = Batman.DOM.containsNode(this.node);
        Batman.DOM.destroyNode(this.node);
      }
      this.forget();
      if ((_ref = this._batman.properties) != null) {
        _ref.forEach(function(key, property) {
          return property.die();
        });
      }
      if (this._batman.events) {
        _ref1 = this._batman.events;
        for (_ in _ref1) {
          event = _ref1[_];
          event.clearHandlers();
        }
      }
      this.destroyBindings();
      this.destroySubviews();
      this.removeFromSuperview();
      this.node = null;
      this.parentNode = null;
      this.subviews = null;
      return this.isDead = true;
    };

    View.prototype.baseForKeypath = function(keypath) {
      return keypath.split('.')[0].split('|')[0].trim();
    };

    View.prototype.prefixForKeypath = function(keypath) {
      var index;
      index = keypath.lastIndexOf('.');
      if (index !== -1) {
        return keypath.substr(0, index);
      } else {
        return keypath;
      }
    };

    View.prototype.targetForKeypath = function(keypath, forceTarget) {
      var controller, lookupNode, nearestNonBackingView, proxiedObject;
      proxiedObject = this.get('proxiedObject');
      lookupNode = proxiedObject || this;
      while (lookupNode) {
        if (typeof Batman.get(lookupNode, keypath) !== 'undefined') {
          return lookupNode;
        }
        if (forceTarget && !nearestNonBackingView && !lookupNode.isBackingView) {
          nearestNonBackingView = lookupNode;
        }
        if (!controller && lookupNode.isView && lookupNode.controller) {
          controller = lookupNode.controller;
        }
        if (proxiedObject && lookupNode === proxiedObject) {
          lookupNode = this;
        } else if (lookupNode.isView && lookupNode.superview) {
          lookupNode = lookupNode.superview;
        } else if (controller) {
          lookupNode = controller;
          controller = null;
        } else if (!lookupNode.window) {
          if (Batman.currentApp && lookupNode !== Batman.currentApp) {
            lookupNode = Batman.currentApp;
          } else {
            lookupNode = {
              window: Batman.container
            };
          }
        } else {
          break;
        }
      }
      return nearestNonBackingView;
    };

    View.prototype.lookupKeypath = function(keypath) {
      var base, target;
      base = this.baseForKeypath(keypath);
      target = this.targetForKeypath(base);
      if (target) {
        return Batman.get(target, keypath);
      }
    };

    View.prototype.setKeypath = function(keypath, value) {
      var prefix, target, _ref;
      prefix = this.prefixForKeypath(keypath);
      target = this.targetForKeypath(prefix, true);
      if (!target || target === Batman.container) {
        return;
      }
      return (_ref = Batman.Property.forBaseAndKey(target, keypath)) != null ? _ref.setValue(value) : void 0;
    };

    return View;

  })(Batman.Object);

  if ((_base = Batman.container).$context == null) {
    _base.$context = function(node) {
      var view;
      while (node) {
        if (view = Batman._data(node, 'backingView') || Batman._data(node, 'view')) {
          return view;
        }
        node = node.parentNode;
      }
    };
  }

  if ((_base1 = Batman.container).$subviews == null) {
    _base1.$subviews = function(view) {
      var subviews;
      if (view == null) {
        view = Batman.currentApp.layout;
      }
      subviews = [];
      view.subviews.forEach(function(subview) {
        var obj, _ref;
        obj = Batman.mixin({}, subview);
        obj.constructor = subview.constructor;
        obj.subviews = ((_ref = subview.subviews) != null ? _ref.length : void 0) ? $subviews(subview) : null;
        Batman.unmixin(obj, {
          '_batman': true
        });
        return subviews.push(obj);
      });
      return subviews;
    };
  }

}).call(this);

(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.DOM.AbstractBinding = (function(_super) {
    var get_dot_rx, get_rx, keypath_rx, onlyAll, onlyData, onlyNode;

    __extends(AbstractBinding, _super);

    keypath_rx = /(^|,)\s*(?:(true|false)|("[^"]*")|(\{[^\}]*\})|(([0-9\_\-]+[a-zA-Z\_\-]|[a-zA-Z])[\w\-\.\?\!\+]*))\s*(?=$|,)/g;

    get_dot_rx = /(?:\]\.)(.+?)(?=[\[\.]|\s*\||$)/;

    get_rx = /(?!^\s*)\[(.*?)\]/g;

    AbstractBinding.accessor('filteredValue', {
      get: function() {
        var result, self, unfilteredValue;
        unfilteredValue = this.get('unfilteredValue');
        self = this;
        if (this.filterFunctions.length > 0) {
          result = this.filterFunctions.reduce(function(value, fn, i) {
            var args;
            args = self.filterArguments[i].map(function(argument) {
              if (argument._keypath) {
                return self.view.lookupKeypath(argument._keypath);
              } else {
                return argument;
              }
            });
            args.unshift(value);
            while (args.length < (fn.length - 1)) {
              args.push(void 0);
            }
            args.push(self);
            return fn.apply(self.view, args);
          }, unfilteredValue);
          return result;
        } else {
          return unfilteredValue;
        }
      },
      set: function(_, newValue) {
        return this.set('unfilteredValue', newValue);
      }
    });

    AbstractBinding.accessor('unfilteredValue', {
      get: function() {
        return this._unfilteredValue(this.get('key'));
      },
      set: function(_, value) {
        var k;
        if (k = this.get('key')) {
          return this.view.setKeypath(k, value);
        } else {
          return this.set('value', value);
        }
      }
    });

    AbstractBinding.prototype._unfilteredValue = function(key) {
      if (key) {
        return this.view.lookupKeypath(key);
      } else {
        return this.get('value');
      }
    };

    onlyAll = Batman.BindingDefinitionOnlyObserve.All;

    onlyData = Batman.BindingDefinitionOnlyObserve.Data;

    onlyNode = Batman.BindingDefinitionOnlyObserve.Node;

    AbstractBinding.prototype.bindImmediately = true;

    AbstractBinding.prototype.shouldSet = true;

    AbstractBinding.prototype.isInputBinding = false;

    AbstractBinding.prototype.escapeValue = true;

    AbstractBinding.prototype.onlyObserve = onlyAll;

    AbstractBinding.prototype.skipParseFilter = false;

    function AbstractBinding(definition) {
      this._fireDataChange = __bind(this._fireDataChange, this);
      var viewClass;
      this.node = definition.node, this.keyPath = definition.keyPath, this.view = definition.view;
      if (definition.onlyObserve) {
        this.onlyObserve = definition.onlyObserve;
      }
      if (definition.skipParseFilter != null) {
        this.skipParseFilter = definition.skipParseFilter;
      }
      if (!this.skipParseFilter) {
        this.parseFilter();
      }
      if (typeof this.backWithView === 'function') {
        viewClass = this.backWithView;
      }
      if (this.backWithView) {
        this.setupBackingView(viewClass, definition.viewOptions);
      }
      if (this.bindImmediately) {
        this.bind();
      }
    }

    AbstractBinding.prototype.isTwoWay = function() {
      return (this.key != null) && this.filterFunctions.length === 0;
    };

    AbstractBinding.prototype.bind = function() {
      var _ref, _ref1;
      if (this.node && ((_ref = this.onlyObserve) === onlyAll || _ref === onlyNode) && Batman.DOM.nodeIsEditable(this.node)) {
        Batman.DOM.events.change(this.node, this._fireNodeChange.bind(this));
        if (this.onlyObserve === onlyNode) {
          this._fireNodeChange();
        }
      }
      if ((_ref1 = this.onlyObserve) === onlyAll || _ref1 === onlyData) {
        this.observeAndFire('filteredValue', this._fireDataChange);
      }
      return this.view._addChildBinding(this);
    };

    AbstractBinding.prototype._fireNodeChange = function(event) {
      var val;
      this.shouldSet = false;
      val = this.value || this.get('keyContext');
      if (typeof this.nodeChange === "function") {
        this.nodeChange(this.node, val, event);
      }
      this.fire('nodeChange', this.node, val);
      return this.shouldSet = true;
    };

    AbstractBinding.prototype._fireDataChange = function(value) {
      if (this.shouldSet) {
        if (typeof this.dataChange === "function") {
          this.dataChange(value, this.node);
        }
        return this.fire('dataChange', value, this.node);
      }
    };

    AbstractBinding.prototype.die = function() {
      var _ref;
      this.forget();
      if ((_ref = this._batman.properties) != null) {
        _ref.forEach(function(key, property) {
          return property.die();
        });
      }
      this.node = null;
      this.keyPath = null;
      this.view = null;
      this.backingView = null;
      return this.superview = null;
    };

    AbstractBinding.prototype.parseFilter = function() {
      var args, e, filter, filterName, filterString, filters, key, keyPath, orig, split;
      this.filterFunctions = [];
      this.filterArguments = [];
      keyPath = this.keyPath;
      while (get_dot_rx.test(keyPath)) {
        keyPath = keyPath.replace(get_dot_rx, "]['$1']");
      }
      filters = keyPath.replace(get_rx, " | get $1 ").replace(/'/g, '"').split(/(?!")\s+\|\s+(?!")/);
      try {
        key = this.parseSegment(orig = filters.shift())[0];
      } catch (_error) {
        e = _error;
        Batman.developer.warn(e);
        Batman.developer.error("Error! Couldn't parse keypath in \"" + orig + "\". Parsing error above.");
      }
      if (key && key._keypath) {
        this.key = key._keypath;
      } else {
        this.value = key;
      }
      if (filters.length) {
        while (filterString = filters.shift()) {
          split = filterString.indexOf(' ');
          if (split === -1) {
            split = filterString.length;
          }
          filterName = filterString.substr(0, split);
          args = filterString.substr(split);
          if (!(filter = Batman.Filters[filterName])) {
            return Batman.developer.error("Unrecognized filter '" + filterName + "' in key \"" + this.keyPath + "\"!");
          }
          this.filterFunctions.push(filter);
          try {
            this.filterArguments.push(this.parseSegment(args));
          } catch (_error) {
            e = _error;
            Batman.developer.error("Bad filter arguments \"" + args + "\"!");
          }
        }
        return true;
      }
    };

    AbstractBinding.prototype.parseSegment = function(segment) {
      segment = segment.replace(keypath_rx, function(match, start, bool, string, object, keypath, offset) {
        var replacement;
        if (start == null) {
          start = '';
        }
        replacement = keypath ? '{"_keypath": "' + keypath + '"}' : bool || string || object;
        return start + replacement;
      });
      return JSON.parse("[" + segment + "]");
    };

    AbstractBinding.prototype.setupBackingView = function(viewClass, viewOptions) {
      if (this.backingView) {
        return this.backingView;
      }
      if (this.node && (this.backingView = Batman._data(this.node, 'view'))) {
        return this.backingView;
      }
      this.superview = this.view;
      viewOptions || (viewOptions = {});
      if (viewOptions.node == null) {
        viewOptions.node = this.node;
      }
      if (viewOptions.parentNode == null) {
        viewOptions.parentNode = this.node;
      }
      viewOptions.isBackingView = true;
      this.backingView = new (viewClass || Batman.BackingView)(viewOptions);
      this.superview.subviews.add(this.backingView);
      if (this.node) {
        Batman._data(this.node, 'view', this.backingView);
      }
      return this.backingView;
    };

    return AbstractBinding;

  })(Batman.Object);

  Batman.BackingView = (function(_super) {
    __extends(BackingView, _super);

    function BackingView() {
      _ref = BackingView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    BackingView.prototype.isBackingView = true;

    BackingView.prototype.bindImmediately = false;

    return BackingView;

  })(Batman.View);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.DOM.ViewBinding = (function(_super) {
    __extends(ViewBinding, _super);

    ViewBinding.prototype.onlyObserve = Batman.BindingDefinitionOnlyObserve.Data;

    ViewBinding.prototype.skipChildren = true;

    ViewBinding.prototype.bindImmediately = false;

    function ViewBinding(definition) {
      this.superview = definition.view;
      ViewBinding.__super__.constructor.apply(this, arguments);
    }

    ViewBinding.prototype.initialized = function() {
      return this.bind();
    };

    ViewBinding.prototype.dataChange = function(viewClassOrInstance) {
      var attributeName, definition, keyPath, option, options, _i, _len, _ref;
      if ((_ref = this.viewInstance) != null) {
        _ref.removeFromSuperview();
      }
      if (!viewClassOrInstance) {
        return;
      }
      if (viewClassOrInstance.isView) {
        this.fromViewClass = false;
        this.viewInstance = viewClassOrInstance;
        this.viewInstance.removeFromSuperview();
      } else {
        this.fromViewClass = true;
        this.viewInstance = new viewClassOrInstance;
      }
      this.node.removeAttribute('data-view');
      if (options = this.viewInstance.constructor._batman.get('options')) {
        for (_i = 0, _len = options.length; _i < _len; _i++) {
          option = options[_i];
          attributeName = "data-view-" + (option.toLowerCase());
          if (keyPath = this.node.getAttribute(attributeName)) {
            this.node.removeAttribute(attributeName);
            definition = new Batman.DOM.ReaderBindingDefinition(this.node, keyPath, this.superview);
            new Batman.DOM.ViewArgumentBinding(definition, option, this.viewInstance);
          }
        }
      }
      this.viewInstance.set('parentNode', this.node);
      this.viewInstance.set('node', this.node);
      this.viewInstance.loadView(this.node);
      return this.superview.subviews.add(this.viewInstance);
    };

    ViewBinding.prototype.die = function() {
      if (this.fromViewClass) {
        this.viewInstance.die();
      } else {
        this.viewInstance.removeFromSuperview();
      }
      this.superview = null;
      this.viewInstance = null;
      return ViewBinding.__super__.die.apply(this, arguments);
    };

    return ViewBinding;

  })(Batman.DOM.AbstractBinding);

  Batman.DOM.ViewArgumentBinding = (function(_super) {
    __extends(ViewArgumentBinding, _super);

    ViewArgumentBinding.prototype.onlyObserve = Batman.BindingDefinitionOnlyObserve.Data;

    function ViewArgumentBinding(definition, option, targetView) {
      var _this = this;
      this.option = option;
      this.targetView = targetView;
      ViewArgumentBinding.__super__.constructor.call(this, definition);
      this.targetView.observe(this.option, this._updateValue = function(value) {
        if (_this.isDataChanging) {
          return;
        }
        return _this.view.set(_this.keyPath, value);
      });
    }

    ViewArgumentBinding.prototype.dataChange = function(value) {
      this.isDataChanging = true;
      this.targetView.set(this.option, value);
      return this.isDataChanging = false;
    };

    ViewArgumentBinding.prototype.die = function() {
      this.targetView.forget(this.option, this._updateValue);
      this.targetView = null;
      return ViewArgumentBinding.__super__.die.apply(this, arguments);
    };

    return ViewArgumentBinding;

  })(Batman.DOM.AbstractBinding);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.DOM.ValueBinding = (function(_super) {
    __extends(ValueBinding, _super);

    function ValueBinding(definition) {
      var _ref;
      this.isInputBinding = (_ref = definition.node.nodeName.toLowerCase()) === 'input' || _ref === 'textarea';
      ValueBinding.__super__.constructor.apply(this, arguments);
    }

    ValueBinding.prototype.nodeChange = function(node, context) {
      if (this.isTwoWay()) {
        return this.set('filteredValue', this.node.value);
      }
    };

    ValueBinding.prototype.dataChange = function(value, node) {
      return Batman.DOM.valueForNode(this.node, value, this.escapeValue);
    };

    return ValueBinding;

  })(Batman.DOM.AbstractBinding);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.DOM.ShowHideBinding = (function(_super) {
    __extends(ShowHideBinding, _super);

    ShowHideBinding.prototype.onlyObserve = Batman.BindingDefinitionOnlyObserve.Data;

    function ShowHideBinding(definition) {
      var display;
      display = definition.node.style.display;
      if (!display || display === 'none') {
        display = '';
      }
      this.originalDisplay = display;
      this.invert = definition.invert;
      ShowHideBinding.__super__.constructor.apply(this, arguments);
    }

    ShowHideBinding.prototype.dataChange = function(value) {
      var view;
      view = Batman.View.viewForNode(this.node, false);
      if (!!value === !this.invert) {
        if (view != null) {
          view.fire('viewWillShow');
        }
        this.node.style.display = this.originalDisplay;
        return view != null ? view.fire('viewDidShow') : void 0;
      } else {
        if (view != null) {
          view.fire('viewWillHide');
        }
        Batman.DOM.setStyleProperty(this.node, 'display', 'none', 'important');
        return view != null ? view.fire('viewDidHide') : void 0;
      }
    };

    return ShowHideBinding;

  })(Batman.DOM.AbstractBinding);

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Batman.SelectView = (function(_super) {
    __extends(SelectView, _super);

    function SelectView() {
      _ref = SelectView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    SelectView.prototype._addChildBinding = function(binding) {
      SelectView.__super__._addChildBinding.apply(this, arguments);
      return this.fire('childBindingAdded', binding);
    };

    return SelectView;

  })(Batman.BackingView);

  Batman.DOM.SelectBinding = (function(_super) {
    __extends(SelectBinding, _super);

    SelectBinding.prototype.backWithView = Batman.SelectView;

    SelectBinding.prototype.isInputBinding = true;

    SelectBinding.prototype.canSetImplicitly = true;

    SelectBinding.prototype.skipChildren = true;

    function SelectBinding(definition) {
      this.updateOptionBindings = __bind(this.updateOptionBindings, this);
      this.nodeChange = __bind(this.nodeChange, this);
      this.dataChange = __bind(this.dataChange, this);
      this.childBindingAdded = __bind(this.childBindingAdded, this);
      SelectBinding.__super__.constructor.apply(this, arguments);
      this.node.removeAttribute('data-bind');
      this.node.removeAttribute('data-source');
      this.node.removeAttribute('data-target');
      this.backingView.on('childBindingAdded', this.childBindingAdded);
      this.backingView.initializeBindings();
    }

    SelectBinding.prototype.die = function() {
      this.backingView.off('childBindingAdded', this.childBindingAdded);
      return SelectBinding.__super__.die.apply(this, arguments);
    };

    SelectBinding.prototype.childBindingAdded = function(binding) {
      var _this = this;
      if (binding instanceof Batman.DOM.CheckedBinding) {
        binding.on('dataChange', this.nodeChange);
      } else if (binding instanceof Batman.DOM.IteratorBinding) {
        binding.backingView.on('itemsWereRendered', function() {
          return _this._fireDataChange(_this.get('filteredValue'));
        });
      } else {
        return;
      }
      return this._fireDataChange(this.get('filteredValue'));
    };

    SelectBinding.prototype.lastKeyContext = null;

    SelectBinding.prototype.dataChange = function(newValue) {
      var child, matches, valueToChild, _i, _len, _name, _ref1,
        _this = this;
      this.lastKeyContext || (this.lastKeyContext = this.get('keyContext'));
      if (this.lastKeyContext !== this.get('keyContext')) {
        this.canSetImplicitly = true;
        this.lastKeyContext = this.get('keyContext');
      }
      if (newValue != null ? newValue.forEach : void 0) {
        valueToChild = {};
        _ref1 = this.node.children;
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          child = _ref1[_i];
          child.selected = false;
          matches = valueToChild[_name = child.value] || (valueToChild[_name] = []);
          matches.push(child);
        }
        newValue.forEach(function(value) {
          var children, node, _j, _len1;
          if (children = valueToChild[value]) {
            for (_j = 0, _len1 = children.length; _j < _len1; _j++) {
              node = children[_j];
              node.selected = true;
            }
          }
        });
      } else {
        if ((newValue == null) && this.canSetImplicitly) {
          if (this.node.value) {
            this.canSetImplicitly = false;
            this.set('unfilteredValue', this.node.value);
          }
        } else {
          this.canSetImplicitly = false;
          Batman.DOM.valueForNode(this.node, newValue, this.escapeValue);
        }
      }
      this.updateOptionBindings();
      this.fixSelectElementWidth();
    };

    SelectBinding.prototype.nodeChange = function() {
      var selections;
      if (this.isTwoWay()) {
        selections = Batman.DOM.valueForNode(this.node);
        if (typeof selections === Array && selections.length === 1) {
          selections = selections[0];
        }
        this.set('unfilteredValue', selections);
        this.updateOptionBindings();
      }
    };

    SelectBinding.prototype.updateOptionBindings = function() {
      var binding, _i, _len, _ref1;
      _ref1 = this.backingView.bindings;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        binding = _ref1[_i];
        if (binding instanceof Batman.DOM.CheckedBinding) {
          binding._fireNodeChange();
        }
      }
    };

    SelectBinding.prototype.fixSelectElementWidth = function() {
      var _this = this;
      if (window.navigator.userAgent.toLowerCase().indexOf('msie') === -1) {
        return;
      }
      if (this._fixWidthTimeout) {
        clearTimeout(this._fixWidthTimeout);
      }
      return this._fixWidthTimeout = setTimeout(function() {
        _this._fixWidthTimeout = null;
        return _this._fixSelectElementWidth();
      }, 100);
    };

    SelectBinding.prototype._fixSelectElementWidth = function() {
      var previousWidth, style, _ref1;
      style = (_ref1 = this.get('node')) != null ? _ref1.style : void 0;
      if (!style) {
        return;
      }
      previousWidth = this.get('node').currentStyle.width;
      style.width = '100%';
      return style.width = previousWidth != null ? previousWidth : '';
    };

    return SelectBinding;

  })(Batman.DOM.AbstractBinding);

}).call(this);

(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.DOM.RouteBinding = (function(_super) {
    __extends(RouteBinding, _super);

    function RouteBinding() {
      this.routeClick = __bind(this.routeClick, this);
      _ref = RouteBinding.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    RouteBinding.prototype.onAnchorTag = false;

    RouteBinding.prototype.onlyObserve = Batman.BindingDefinitionOnlyObserve.Data;

    RouteBinding.accessor('dispatcher', function() {
      return this.view.lookupKeypath('dispatcher') || Batman.App.get('current.dispatcher');
    });

    RouteBinding.prototype.bind = function() {
      var _ref1;
      if ((_ref1 = this.node.nodeName) === 'a' || _ref1 === 'A') {
        this.onAnchorTag = true;
      }
      RouteBinding.__super__.bind.apply(this, arguments);
      if (this.onAnchorTag && this.node.getAttribute('target')) {
        return;
      }
      return Batman.DOM.events.click(this.node, this.routeClick);
    };

    RouteBinding.prototype.routeClick = function(node, event) {
      var params;
      if (event.__batmanActionTaken) {
        return;
      }
      event.__batmanActionTaken = true;
      params = this.pathFromValue(this.get('filteredValue'));
      if (params != null) {
        return Batman.redirect(params);
      }
    };

    RouteBinding.prototype.dataChange = function(value) {
      var path;
      if (value) {
        path = this.pathFromValue(value);
      }
      if (this.onAnchorTag) {
        if (path && Batman.navigator) {
          path = Batman.navigator.linkTo(path);
        } else {
          path = "#";
        }
        return this.node.href = path;
      }
    };

    RouteBinding.prototype.pathFromValue = function(value) {
      var _ref1;
      if (value) {
        if (value.isNamedRouteQuery) {
          return value.get('path');
        } else {
          return (_ref1 = this.get('dispatcher')) != null ? _ref1.pathFromParams(value) : void 0;
        }
      }
    };

    return RouteBinding;

  })(Batman.DOM.AbstractBinding);

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.DOM.RadioBinding = (function(_super) {
    __extends(RadioBinding, _super);

    function RadioBinding() {
      _ref = RadioBinding.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    RadioBinding.accessor('parsedNodeValue', function() {
      return Batman.DOM.attrReaders._parseAttribute(this.node.value);
    });

    RadioBinding.prototype.firstBind = true;

    RadioBinding.prototype.dataChange = function(value) {
      var boundValue;
      boundValue = this.get('filteredValue');
      if (boundValue != null) {
        this.node.checked = boundValue === Batman.DOM.attrReaders._parseAttribute(this.node.value);
      } else {
        if (this.firstBind && this.node.checked) {
          this.set('filteredValue', this.get('parsedNodeValue'));
        }
      }
      return this.firstBind = false;
    };

    RadioBinding.prototype.nodeChange = function(node) {
      if (this.isTwoWay()) {
        return this.set('filteredValue', this.get('parsedNodeValue'));
      }
    };

    return RadioBinding;

  })(Batman.DOM.AbstractBinding);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.DOM.FileBinding = (function(_super) {
    __extends(FileBinding, _super);

    FileBinding.prototype.isInputBinding = true;

    function FileBinding() {
      FileBinding.__super__.constructor.apply(this, arguments);
      this.view.set('fileAttributes', null);
    }

    FileBinding.prototype.nodeChange = function(node, subContext) {
      if (!this.isTwoWay()) {
        return;
      }
      if (node.hasAttribute('multiple')) {
        return this.set('filteredValue', Array.prototype.slice.call(node.files));
      } else {
        return this.set('filteredValue', node.files[0] || null);
      }
    };

    return FileBinding;

  })(Batman.DOM.AbstractBinding);

}).call(this);

(function() {
  var _ref, _ref1,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.DeferredRenderView = (function(_super) {
    __extends(DeferredRenderView, _super);

    function DeferredRenderView() {
      _ref = DeferredRenderView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    DeferredRenderView.prototype.bindImmediately = false;

    return DeferredRenderView;

  })(Batman.View);

  Batman.DOM.DeferredRenderBinding = (function(_super) {
    __extends(DeferredRenderBinding, _super);

    function DeferredRenderBinding() {
      _ref1 = DeferredRenderBinding.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    DeferredRenderBinding.prototype.onlyObserve = Batman.BindingDefinitionOnlyObserve.Data;

    DeferredRenderBinding.prototype.backWithView = Batman.DeferredRenderView;

    DeferredRenderBinding.prototype.skipChildren = true;

    DeferredRenderBinding.prototype.dataChange = function(value) {
      if (value && !this.backingView.isBound) {
        this.node.removeAttribute('data-renderif');
        return this.backingView.initializeBindings();
      }
    };

    return DeferredRenderBinding;

  })(Batman.DOM.AbstractBinding);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.developer["do"](function() {
    var DebuggerBinding;
    DebuggerBinding = (function(_super) {
      __extends(DebuggerBinding, _super);

      function DebuggerBinding() {
        DebuggerBinding.__super__.constructor.apply(this, arguments);
        debugger;
      }

      return DebuggerBinding;

    })(Batman.DOM.AbstractBinding);
    return Batman.DOM.readers.debug = function(definition) {
      return new DebuggerBinding(definition);
    };
  });

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.DOM.AbstractAttributeBinding = (function(_super) {
    __extends(AbstractAttributeBinding, _super);

    function AbstractAttributeBinding(definition) {
      this.attributeName = definition.attr;
      AbstractAttributeBinding.__super__.constructor.apply(this, arguments);
    }

    return AbstractAttributeBinding;

  })(Batman.DOM.AbstractBinding);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.DOM.EventBinding = (function(_super) {
    __extends(EventBinding, _super);

    EventBinding.prototype.onlyObserve = Batman.BindingDefinitionOnlyObserve.Data;

    EventBinding.prototype.bindImmediately = false;

    function EventBinding() {
      var attacher, callback,
        _this = this;
      EventBinding.__super__.constructor.apply(this, arguments);
      callback = function() {
        var func, target;
        func = _this.get('filteredValue');
        target = _this.view.targetForKeypath(_this.functionPath || _this.unfilteredKey);
        if (target && _this.functionPath) {
          target = Batman.get(target, _this.functionPath);
        }
        return func != null ? func.apply(target, arguments) : void 0;
      };
      if (attacher = Batman.DOM.events[this.attributeName]) {
        attacher(this.node, callback, this.view);
      } else {
        Batman.DOM.events.other(this.node, this.attributeName, callback, this.view);
      }
      this.view.bindings.push(this);
    }

    EventBinding.prototype._unfilteredValue = function(key) {
      var index, value;
      this.unfilteredKey = key;
      if (!this.functionName && (index = key.lastIndexOf('.')) !== -1) {
        this.functionPath = key.substr(0, index);
        this.functionName = key.substr(index + 1);
      }
      value = EventBinding.__super__._unfilteredValue.call(this, this.functionPath || key);
      if (this.functionName) {
        return value != null ? value[this.functionName] : void 0;
      } else {
        return value;
      }
    };

    return EventBinding;

  })(Batman.DOM.AbstractAttributeBinding);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.DOM.ContextBinding = (function(_super) {
    __extends(ContextBinding, _super);

    ContextBinding.prototype.onlyObserve = Batman.BindingDefinitionOnlyObserve.Data;

    ContextBinding.prototype.backWithView = true;

    ContextBinding.prototype.bindingName = 'context';

    function ContextBinding() {
      var contextAttribute;
      ContextBinding.__super__.constructor.apply(this, arguments);
      contextAttribute = this.attributeName ? "data-" + this.bindingName + "-" + this.attributeName : "data-" + this.bindingName;
      this.node.removeAttribute(contextAttribute);
      this.node.insertBefore(document.createComment("batman-" + contextAttribute + "=\"" + this.keyPath + "\""), this.node.firstChild);
    }

    ContextBinding.prototype.dataChange = function(proxiedObject) {
      return this.backingView.set(this.attributeName || 'proxiedObject', proxiedObject);
    };

    ContextBinding.prototype.die = function() {
      this.backingView.unset(this.attributeName || 'proxiedObject');
      return ContextBinding.__super__.die.apply(this, arguments);
    };

    return ContextBinding;

  })(Batman.DOM.AbstractAttributeBinding);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.DOM.FormBinding = (function(_super) {
    __extends(FormBinding, _super);

    FormBinding.prototype.bindingName = 'formfor';

    FormBinding.prototype.errorClass = 'error';

    FormBinding.prototype.defaultErrorsListSelector = 'div.errors';

    function FormBinding(definition) {
      FormBinding.__super__.constructor.apply(this, arguments);
      this.initializeErrorsList();
      this.initializeChildBindings();
      Batman.DOM.events.submit(this.node, function(node, e) {
        return Batman.DOM.preventDefault(e);
      });
    }

    FormBinding.prototype.initializeChildBindings = function() {
      var attribute, attributeName, binding, errorsNode, field, index, keyPath, selectedNode, selectedNodes, selectors, _i, _len;
      keyPath = this.keyPath;
      attribute = this.attributeName;
      selectors = ['input', 'textarea', 'select'].map(function(nodeName) {
        return "" + nodeName + "[data-bind^=\"" + attribute + "\"]";
      });
      selectedNodes = Batman.DOM.querySelectorAll(this.node, selectors.join(', '));
      attributeName = "data-addclass-" + this.errorClass;
      for (_i = 0, _len = selectedNodes.length; _i < _len; _i++) {
        selectedNode = selectedNodes[_i];
        if (!(!selectedNode.getAttribute(attributeName))) {
          continue;
        }
        binding = selectedNode.getAttribute('data-bind');
        field = binding.substr(binding.indexOf(attribute) + attribute.length + 1);
        index = field.indexOf('|');
        if (index !== -1) {
          field = field.substr(0, index);
        }
        field = field.trim();
        selectedNode.setAttribute(attributeName, "" + attribute + ".errors." + field + ".length");
      }
      errorsNode = Batman.DOM.querySelector(this.node, '.errors');
      if (errorsNode && !errorsNode.getAttribute('data-showif')) {
        errorsNode.setAttribute('data-showif', "" + attribute + ".errors.length");
      }
    };

    FormBinding.prototype.initializeErrorsList = function() {
      var errorsNode, selector;
      selector = this.node.getAttribute('data-errors-list') || this.defaultErrorsListSelector;
      if (errorsNode = Batman.DOM.querySelector(this.node, selector)) {
        return Batman.DOM.setInnerHTML(errorsNode, this.errorsListHTML());
      }
    };

    FormBinding.prototype.errorsListHTML = function() {
      return "<ul>\n  <li data-foreach-error=\"" + this.attributeName + ".errors\" data-bind=\"error.fullMessage\"></li>\n</ul>";
    };

    return FormBinding;

  })(Batman.DOM.ContextBinding);

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.DOM.NodeAttributeBinding = (function(_super) {
    __extends(NodeAttributeBinding, _super);

    function NodeAttributeBinding() {
      _ref = NodeAttributeBinding.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    NodeAttributeBinding.prototype.dataChange = function(value) {
      if (value == null) {
        value = "";
      }
      return this.node[this.attributeName] = value;
    };

    NodeAttributeBinding.prototype.nodeChange = function(node) {
      if (this.isTwoWay()) {
        return this.set('filteredValue', Batman.DOM.attrReaders._parseAttribute(node[this.attributeName]));
      }
    };

    return NodeAttributeBinding;

  })(Batman.DOM.AbstractAttributeBinding);

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.DOM.CheckedBinding = (function(_super) {
    __extends(CheckedBinding, _super);

    function CheckedBinding() {
      _ref = CheckedBinding.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    CheckedBinding.prototype.isInputBinding = true;

    CheckedBinding.prototype.dataChange = function(value) {
      return this.node[this.attributeName] = !!value;
    };

    return CheckedBinding;

  })(Batman.DOM.NodeAttributeBinding);

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.DOM.AttributeBinding = (function(_super) {
    __extends(AttributeBinding, _super);

    function AttributeBinding() {
      _ref = AttributeBinding.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    AttributeBinding.prototype.onlyObserve = Batman.BindingDefinitionOnlyObserve.Data;

    AttributeBinding.prototype.dataChange = function(value) {
      return this.node.setAttribute(this.attributeName, value);
    };

    AttributeBinding.prototype.nodeChange = function(node) {
      if (this.isTwoWay()) {
        return this.set('filteredValue', Batman.DOM.attrReaders._parseAttribute(node.getAttribute(this.attributeName)));
      }
    };

    return AttributeBinding;

  })(Batman.DOM.AbstractAttributeBinding);

}).call(this);

(function() {
  var redundantWhitespaceRegex,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  redundantWhitespaceRegex = /[ \t]{2,}/g;

  Batman.DOM.AddClassBinding = (function(_super) {
    __extends(AddClassBinding, _super);

    AddClassBinding.prototype.onlyObserve = Batman.BindingDefinitionOnlyObserve.Data;

    function AddClassBinding(definition) {
      var name;
      this.invert = definition.invert;
      this.classes = (function() {
        var _i, _len, _ref, _results;
        _ref = definition.attr.split('|');
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          name = _ref[_i];
          _results.push({
            name: name,
            pattern: new RegExp("(?:^|\\s)" + name + "(?:$|\\s)", 'i')
          });
        }
        return _results;
      })();
      AddClassBinding.__super__.constructor.apply(this, arguments);
    }

    AddClassBinding.prototype.dataChange = function(value) {
      var currentName, includesClassName, name, pattern, _i, _len, _ref, _ref1;
      currentName = this.node.className;
      _ref = this.classes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        _ref1 = _ref[_i], name = _ref1.name, pattern = _ref1.pattern;
        includesClassName = pattern.test(currentName);
        if (!!value === !this.invert) {
          if (!includesClassName) {
            currentName = "" + currentName + " " + name;
          }
        } else {
          if (includesClassName) {
            currentName = currentName.replace(pattern, ' ');
          }
        }
      }
      this.node.className = currentName.trim().replace(redundantWhitespaceRegex, ' ');
      return true;
    };

    return AddClassBinding;

  })(Batman.DOM.AbstractAttributeBinding);

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.DOM.AbstractCollectionBinding = (function(_super) {
    __extends(AbstractCollectionBinding, _super);

    function AbstractCollectionBinding() {
      _ref = AbstractCollectionBinding.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    AbstractCollectionBinding.prototype.bindCollection = function(newCollection) {
      var _ref1;
      if (newCollection instanceof Batman.Hash) {
        newCollection = newCollection.meta;
      }
      if (newCollection === this.collection) {
        return true;
      } else {
        this.unbindCollection();
        this.collection = newCollection;
        if (!((_ref1 = this.collection) != null ? _ref1.isObservable : void 0)) {
          return false;
        }
        if (this.collection.isCollectionEventEmitter && this.handleItemsAdded && this.handleItemsRemoved && this.handleItemMoved) {
          this.collection.on('itemsWereAdded', this.handleItemsAdded);
          this.collection.on('itemsWereRemoved', this.handleItemsRemoved);
          this.collection.on('itemWasMoved', this.handleItemMoved);
          this.handleArrayChanged(this.collection.toArray());
        } else {
          this.collection.observeAndFire('toArray', this.handleArrayChanged);
        }
        return true;
      }
    };

    AbstractCollectionBinding.prototype.unbindCollection = function() {
      var _ref1;
      if (!((_ref1 = this.collection) != null ? _ref1.isObservable : void 0)) {
        return;
      }
      if (this.collection.isCollectionEventEmitter && this.handleItemsAdded && this.handleItemsRemoved && this.handleItemMoved) {
        this.collection.off('itemsWereAdded', this.handleItemsAdded);
        this.collection.off('itemsWereRemoved', this.handleItemsRemoved);
        return this.collection.off('itemWasMoved', this.handleItemMoved);
      } else {
        return this.collection.forget('toArray', this.handleArrayChanged);
      }
    };

    AbstractCollectionBinding.prototype.handleArrayChanged = function() {};

    AbstractCollectionBinding.prototype.die = function() {
      this.unbindCollection();
      this.collection = null;
      return AbstractCollectionBinding.__super__.die.apply(this, arguments);
    };

    return AbstractCollectionBinding;

  })(Batman.DOM.AbstractAttributeBinding);

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  Batman.DOM.StyleBinding = (function(_super) {
    __extends(StyleBinding, _super);

    StyleBinding.prototype.onlyObserve = Batman.BindingDefinitionOnlyObserve.Data;

    function StyleBinding() {
      this.setStyle = __bind(this.setStyle, this);
      this.handleArrayChanged = __bind(this.handleArrayChanged, this);
      this.oldStyles = {};
      this.styleBindings = {};
      StyleBinding.__super__.constructor.apply(this, arguments);
    }

    StyleBinding.prototype.dataChange = function(value) {
      var colonSplitCSSValues, cssName, key, style, _i, _len, _ref, _ref1;
      if (!value) {
        this.resetStyles();
        return;
      }
      this.unbindCollection();
      if (typeof value === 'string') {
        this.resetStyles();
        _ref = value.split(';');
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          style = _ref[_i];
          _ref1 = style.split(":"), cssName = _ref1[0], colonSplitCSSValues = 2 <= _ref1.length ? __slice.call(_ref1, 1) : [];
          this.setStyle(cssName, colonSplitCSSValues.join(":"));
        }
        return;
      }
      if (value instanceof Batman.Hash) {
        this.bindCollection(value);
      } else {
        if (value instanceof Batman.Object) {
          value = value.toJSON();
        }
        this.resetStyles();
        for (key in value) {
          if (!__hasProp.call(value, key)) continue;
          this.bindSingleAttribute(key, "" + this.keyPath + "." + key);
        }
      }
    };

    StyleBinding.prototype.handleArrayChanged = function(array) {
      var _this = this;
      return this.collection.forEach(function(key, value) {
        return _this.bindSingleAttribute(key, "" + _this.keyPath + "." + key);
      });
    };

    StyleBinding.prototype.bindSingleAttribute = function(attr, keyPath) {
      var definition;
      definition = new Batman.DOM.AttrReaderBindingDefinition(this.node, attr, keyPath, this.view);
      return this.styleBindings[attr] = new Batman.DOM.StyleBinding.SingleStyleBinding(definition, this);
    };

    StyleBinding.prototype.setStyle = function(key, value) {
      key = Batman.helpers.camelize(key.trim(), true);
      if (this.oldStyles[key] == null) {
        this.oldStyles[key] = this.node.style[key] || "";
      }
      if (value != null ? value.trim : void 0) {
        value = value.trim();
      }
      if (value == null) {
        value = "";
      }
      return this.node.style[key] = value;
    };

    StyleBinding.prototype.resetStyles = function() {
      var cssName, cssValue, _ref;
      _ref = this.oldStyles;
      for (cssName in _ref) {
        if (!__hasProp.call(_ref, cssName)) continue;
        cssValue = _ref[cssName];
        this.setStyle(cssName, cssValue);
      }
    };

    StyleBinding.prototype.resetBindings = function() {
      var attribute, binding, _ref;
      _ref = this.styleBindings;
      for (attribute in _ref) {
        binding = _ref[attribute];
        binding._fireDataChange('');
        binding.die();
      }
      return this.styleBindings = {};
    };

    StyleBinding.prototype.unbindCollection = function() {
      this.resetBindings();
      return StyleBinding.__super__.unbindCollection.apply(this, arguments);
    };

    StyleBinding.SingleStyleBinding = (function(_super1) {
      __extends(SingleStyleBinding, _super1);

      SingleStyleBinding.prototype.onlyObserve = Batman.BindingDefinitionOnlyObserve.Data;

      SingleStyleBinding.prototype.isTwoWay = function() {
        return false;
      };

      function SingleStyleBinding(definition, parent) {
        this.parent = parent;
        SingleStyleBinding.__super__.constructor.call(this, definition);
      }

      SingleStyleBinding.prototype.dataChange = function(value) {
        return this.parent.setStyle(this.attributeName, value);
      };

      return SingleStyleBinding;

    })(Batman.DOM.AbstractAttributeBinding);

    return StyleBinding;

  })(Batman.DOM.AbstractCollectionBinding);

}).call(this);

(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.DOM.ClassBinding = (function(_super) {
    __extends(ClassBinding, _super);

    function ClassBinding() {
      this.handleArrayChanged = __bind(this.handleArrayChanged, this);
      _ref = ClassBinding.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ClassBinding.prototype.onlyObserve = Batman.BindingDefinitionOnlyObserve.Data;

    ClassBinding.prototype.dataChange = function(value) {
      if (value != null) {
        this.unbindCollection();
        if (typeof value === 'string') {
          return this.node.className = value;
        } else {
          this.bindCollection(value);
          return this.updateFromCollection();
        }
      }
    };

    ClassBinding.prototype.updateFromCollection = function() {
      var array, k, v;
      if (this.collection) {
        array = this.collection.map ? this.collection.map(function(x) {
          return x;
        }) : (function() {
          var _ref1, _results;
          _ref1 = this.collection;
          _results = [];
          for (k in _ref1) {
            if (!__hasProp.call(_ref1, k)) continue;
            v = _ref1[k];
            _results.push(k);
          }
          return _results;
        }).call(this);
        if (array.toArray != null) {
          array = array.toArray();
        }
        return this.node.className = array.join(' ');
      }
    };

    ClassBinding.prototype.handleArrayChanged = function() {
      return this.updateFromCollection();
    };

    return ClassBinding;

  })(Batman.DOM.AbstractCollectionBinding);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.DOM.InsertionBinding = (function(_super) {
    __extends(InsertionBinding, _super);

    InsertionBinding.prototype.onlyObserve = Batman.BindingDefinitionOnlyObserve.Data;

    InsertionBinding.prototype.bindImmediately = false;

    function InsertionBinding(definition) {
      this.invert = definition.invert;
      InsertionBinding.__super__.constructor.apply(this, arguments);
      this.placeholderNode = document.createComment("batman-insertif=\"" + this.keyPath + "\"");
    }

    InsertionBinding.prototype.initialized = function() {
      return this.bind();
    };

    InsertionBinding.prototype.dataChange = function(value) {
      var parentNode, view;
      view = Batman.View.viewForNode(this.node, false);
      parentNode = this.placeholderNode.parentNode || this.node.parentNode;
      if (!!value === !this.invert) {
        if (view != null) {
          view.fire('viewWillShow');
        }
        if (this.node.parentNode == null) {
          parentNode.insertBefore(this.node, this.placeholderNode);
          parentNode.removeChild(this.placeholderNode);
        }
        return view != null ? view.fire('viewDidShow') : void 0;
      } else {
        if (view != null) {
          view.fire('viewWillHide');
        }
        if (this.node.parentNode != null) {
          parentNode.insertBefore(this.placeholderNode, this.node);
          parentNode.removeChild(this.node);
        }
        return view != null ? view.fire('viewDidHide') : void 0;
      }
    };

    InsertionBinding.prototype.die = function() {
      this.placeholderNode = null;
      return InsertionBinding.__super__.die.apply(this, arguments);
    };

    return InsertionBinding;

  })(Batman.DOM.AbstractBinding);

}).call(this);

(function() {
  var _ref, _ref1,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.IteratorView = (function(_super) {
    __extends(IteratorView, _super);

    function IteratorView() {
      _ref = IteratorView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    IteratorView.prototype.loadView = function() {
      return document.createComment("batman-iterator-" + this.iteratorName + "=\"" + this.iteratorPath + "\"");
    };

    IteratorView.prototype.addItems = function(items, indexes) {
      var i, item, _i, _j, _len, _len1;
      this._beginAppendItems();
      if (indexes) {
        for (i = _i = 0, _len = items.length; _i < _len; i = ++_i) {
          item = items[i];
          this._insertItem(item, indexes[i]);
        }
      } else {
        for (_j = 0, _len1 = items.length; _j < _len1; _j++) {
          item = items[_j];
          this._insertItem(item);
        }
      }
      return this._finishAppendItems();
    };

    IteratorView.prototype.removeItems = function(items, indexes) {
      var i, item, subview, _i, _j, _len, _len1, _results, _results1;
      if (indexes) {
        _results = [];
        for (i = _i = 0, _len = items.length; _i < _len; i = ++_i) {
          item = items[i];
          _results.push(this.subviews.at(indexes[i]).die());
        }
        return _results;
      } else {
        _results1 = [];
        for (_j = 0, _len1 = items.length; _j < _len1; _j++) {
          item = items[_j];
          _results1.push((function() {
            var _k, _len2, _ref1, _results2;
            _ref1 = this.subviews._storage;
            _results2 = [];
            for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
              subview = _ref1[_k];
              if (!(subview.get(this.attributeName) === item)) {
                continue;
              }
              subview.unset(this.attributeName);
              subview.die();
              break;
            }
            return _results2;
          }).call(this));
        }
        return _results1;
      }
    };

    IteratorView.prototype.moveItem = function(oldIndex, newIndex) {
      var source, target;
      source = this.subviews.at(oldIndex);
      this.subviews._storage.splice(oldIndex, 1);
      target = this.subviews.at(newIndex);
      this.subviews._storage.splice(newIndex, 0, source);
      return this.node.parentNode.insertBefore(source.node, (target != null ? target.node : void 0) || this.node);
    };

    IteratorView.prototype._beginAppendItems = function() {
      var viewClassName;
      if (!this.iterationViewClass && (viewClassName = this.prototypeNode.getAttribute('data-view'))) {
        this.iterationViewClass = this.lookupKeypath(viewClassName);
        this.prototypeNode.removeAttribute('data-view');
      }
      this.iterationViewClass || (this.iterationViewClass = Batman.IterationView);
      this.fragment = document.createDocumentFragment();
      this.appendedViews = [];
      return this.get('node');
    };

    IteratorView.prototype._insertItem = function(item, targetIndex) {
      var iterationView;
      iterationView = new this.iterationViewClass({
        node: this.prototypeNode.cloneNode(true),
        parentNode: this.fragment
      });
      iterationView.set(this.iteratorName, item);
      if (targetIndex != null) {
        iterationView._targeted = true;
        this.subviews.insert([iterationView], [targetIndex]);
      } else {
        this.subviews.add(iterationView);
      }
      iterationView.parentNode = null;
      return this.appendedViews.push(iterationView);
    };

    IteratorView.prototype._finishAppendItems = function() {
      var index, isInDOM, sibling, subview, _i, _j, _k, _len, _len1, _ref1, _ref2, _ref3, _ref4;
      isInDOM = Batman.DOM.containsNode(this.node);
      if (isInDOM) {
        _ref1 = this.appendedViews;
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          subview = _ref1[_i];
          subview.propagateToSubviews('viewWillAppear');
        }
      }
      _ref2 = this.subviews.toArray();
      for (index = _j = _ref2.length - 1; _j >= 0; index = _j += -1) {
        subview = _ref2[index];
        if (!subview._targeted) {
          continue;
        }
        if (sibling = (_ref3 = this.subviews.at(index + 1)) != null ? _ref3.get('node') : void 0) {
          sibling.parentNode.insertBefore(subview.get('node'), sibling);
        } else {
          this.fragment.appendChild(subview.get('node'));
        }
        delete subview._targeted;
      }
      this.node.parentNode.insertBefore(this.fragment, this.node);
      this.fire('itemsWereRendered');
      if (isInDOM) {
        _ref4 = this.appendedViews;
        for (_k = 0, _len1 = _ref4.length; _k < _len1; _k++) {
          subview = _ref4[_k];
          subview.propagateToSubviews('isInDOM', isInDOM);
          subview.propagateToSubviews('viewDidAppear');
        }
      }
      this.appendedViews = null;
      return this.fragment = null;
    };

    return IteratorView;

  })(Batman.View);

  Batman.IterationView = (function(_super) {
    __extends(IterationView, _super);

    function IterationView() {
      _ref1 = IterationView.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    return IterationView;

  })(Batman.View);

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.DOM.IteratorBinding = (function(_super) {
    __extends(IteratorBinding, _super);

    IteratorBinding.prototype.onlyObserve = Batman.BindingDefinitionOnlyObserve.Data;

    IteratorBinding.prototype.backWithView = Batman.IteratorView;

    IteratorBinding.prototype.skipChildren = true;

    IteratorBinding.prototype.bindImmediately = false;

    function IteratorBinding(definition) {
      this.handleItemMoved = __bind(this.handleItemMoved, this);
      this.handleItemsRemoved = __bind(this.handleItemsRemoved, this);
      this.handleItemsAdded = __bind(this.handleItemsAdded, this);
      this.handleArrayChanged = __bind(this.handleArrayChanged, this);
      var _this = this;
      this.iteratorName = definition.attr;
      this.prototypeNode = definition.node;
      this.prototypeNode.removeAttribute("data-foreach-" + this.iteratorName);
      definition.viewOptions = {
        prototypeNode: this.prototypeNode,
        iteratorName: this.iteratorName,
        iteratorPath: definition.keyPath
      };
      definition.node = null;
      IteratorBinding.__super__.constructor.apply(this, arguments);
      this.backingView.set('attributeName', this.attributeName);
      this.view.prevent('ready');
      Batman.setImmediate(function() {
        var parentNode;
        parentNode = _this.prototypeNode.parentNode;
        parentNode.insertBefore(_this.backingView.get('node'), _this.prototypeNode);
        parentNode.removeChild(_this.prototypeNode);
        _this.bind();
        return _this.view.allowAndFire('ready');
      });
    }

    IteratorBinding.prototype.dataChange = function(collection) {
      var items, _items;
      if (collection != null) {
        if (!this.bindCollection(collection)) {
          items = (collection != null ? collection.forEach : void 0) ? (_items = [], collection.forEach(function(item) {
            return _items.push(item);
          }), _items) : Object.keys(collection);
          this.handleArrayChanged(items);
        }
      } else {
        this.unbindCollection();
        this.collection = [];
        this.handleArrayChanged([]);
      }
    };

    IteratorBinding.prototype.handleArrayChanged = function(newItems) {
      if (!this.backingView.isDead) {
        this.backingView.destroySubviews();
        if (newItems != null ? newItems.length : void 0) {
          return this.handleItemsAdded(newItems);
        }
      }
    };

    IteratorBinding.prototype.handleItemsAdded = function(addedItems, addedIndexes) {
      if (!this.backingView.isDead) {
        return this.backingView.addItems(addedItems, addedIndexes);
      }
    };

    IteratorBinding.prototype.handleItemsRemoved = function(removedItems, removedIndexes) {
      if (this.backingView.isDead) {
        return;
      }
      if (this.collection.length) {
        return this.backingView.removeItems(removedItems, removedIndexes);
      } else {
        return this.backingView.destroySubviews();
      }
    };

    IteratorBinding.prototype.handleItemMoved = function(item, newIndex, oldIndex) {
      if (!this.backingView.isDead) {
        return this.backingView.moveItem(oldIndex, newIndex);
      }
    };

    IteratorBinding.prototype.die = function() {
      this.prototypeNode = null;
      return IteratorBinding.__super__.die.apply(this, arguments);
    };

    return IteratorBinding;

  })(Batman.DOM.AbstractCollectionBinding);

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.DOM.StyleAttributeBinding = (function(_super) {
    __extends(StyleAttributeBinding, _super);

    function StyleAttributeBinding() {
      _ref = StyleAttributeBinding.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    StyleAttributeBinding.prototype.dataChange = function(value) {
      return this.node.style[Batman.Filters.camelize(this.attributeName, true)] = value;
    };

    return StyleAttributeBinding;

  })(Batman.DOM.NodeAttributeBinding);

}).call(this);

(function() {
  var isEmptyDataObject;

  isEmptyDataObject = function(obj) {
    var name;
    for (name in obj) {
      return false;
    }
    return true;
  };

  Batman.extend(Batman, {
    cache: {},
    uuid: 0,
    expando: "batman" + Math.random().toString().replace(/\D/g, ''),
    canDeleteExpando: (function() {
      var div, e;
      try {
        div = document.createElement('div');
        return delete div.test;
      } catch (_error) {
        e = _error;
        return Batman.canDeleteExpando = false;
      }
    })(),
    noData: {
      "embed": true,
      "EMBED": true,
      "object": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
      "OBJECT": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
      "applet": true,
      "APPLET": true
    },
    hasData: function(elem) {
      elem = (elem.nodeType ? Batman.cache[elem[Batman.expando]] : elem[Batman.expando]);
      return !!elem && !isEmptyDataObject(elem);
    },
    data: function(elem, name, data, pvt) {
      var cache, getByName, id, internalKey, ret, thisCache;
      if (!Batman.acceptData(elem)) {
        return;
      }
      internalKey = Batman.expando;
      getByName = typeof name === "string";
      cache = Batman.cache;
      id = elem[Batman.expando];
      if ((!id || (pvt && id && (cache[id] && !cache[id][internalKey]))) && getByName && data === void 0) {
        return;
      }
      if (!id) {
        if (elem.nodeType !== 3) {
          elem[Batman.expando] = id = ++Batman.uuid;
        } else {
          id = Batman.expando;
        }
      }
      if (!cache[id]) {
        cache[id] = {};
      }
      if (typeof name === "object" || typeof name === "function") {
        if (pvt) {
          cache[id][internalKey] = Batman.extend(cache[id][internalKey], name);
        } else {
          cache[id] = Batman.extend(cache[id], name);
        }
      }
      thisCache = cache[id];
      if (pvt) {
        thisCache[internalKey] || (thisCache[internalKey] = {});
        thisCache = thisCache[internalKey];
      }
      if (data !== void 0) {
        thisCache[name] = data;
      }
      if (getByName) {
        ret = thisCache[name];
      } else {
        ret = thisCache;
      }
      return ret;
    },
    removeData: function(elem, name, pvt, all) {
      var cache, id, internalCache, internalKey, isNode, thisCache;
      if (!Batman.acceptData(elem)) {
        return;
      }
      internalKey = Batman.expando;
      isNode = elem.nodeType;
      cache = Batman.cache;
      id = elem[Batman.expando];
      if (!cache[id]) {
        return;
      }
      if (name) {
        thisCache = pvt ? cache[id][internalKey] : cache[id];
        if (thisCache) {
          delete thisCache[name];
          if (!isEmptyDataObject(thisCache)) {
            return;
          }
        }
      }
      if (pvt) {
        delete cache[id][internalKey];
        if (!isEmptyDataObject(cache[id])) {
          return;
        }
      }
      internalCache = cache[id][internalKey];
      if (Batman.canDeleteExpando || !cache.setInterval) {
        delete cache[id];
      } else {
        cache[id] = null;
      }
      if (internalCache && !all) {
        cache[id] = {};
        return cache[id][internalKey] = internalCache;
      } else {
        if (Batman.canDeleteExpando) {
          return delete elem[Batman.expando];
        } else if (elem.removeAttribute) {
          return elem.removeAttribute(Batman.expando);
        } else {
          return elem[Batman.expando] = null;
        }
      }
    },
    _data: function(elem, name, data) {
      return Batman.data(elem, name, data, true);
    },
    acceptData: function(elem) {
      var match;
      if (!elem) {
        return;
      }
      return elem.___acceptData || (elem.___acceptData = elem.nodeName ? (match = Batman.noData[elem.nodeName], match ? !(match === true || elem.getAttribute("classid") !== match) : true) : true);
    }
  });

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Batman.DOM.Yield = (function(_super) {
    __extends(Yield, _super);

    Yield.yields = {};

    Yield.reset = function() {
      return this.yields = {};
    };

    Yield.withName = function(name) {
      var _base;
      return (_base = this.yields)[name] || (_base[name] = new this(name));
    };

    function Yield(name) {
      this.name = name;
    }

    Yield.accessor('contentView', {
      get: function() {
        return this.contentView;
      },
      set: function(key, view) {
        if (this.contentView === view) {
          return;
        }
        if (this.contentView) {
          this.contentView.removeFromSuperview();
        }
        this.contentView = view;
        if (this.containerNode && view) {
          return view.set('parentNode', this.containerNode);
        }
      }
    });

    Yield.accessor('containerNode', {
      get: function() {
        return this.containerNode;
      },
      set: function(key, node) {
        if (this.containerNode === node) {
          return;
        }
        this.containerNode = node;
        if (this.contentView) {
          return this.contentView.set('parentNode', node);
        }
      }
    });

    return Yield;

  })(Batman.Object);

}).call(this);

(function() {
  var buntUndefined, defaultAndOr,
    __slice = [].slice;

  buntUndefined = function(f) {
    return function(value) {
      if (value == null) {
        return void 0;
      } else {
        return f.apply(this, arguments);
      }
    };
  };

  defaultAndOr = function(lhs, rhs) {
    return lhs || rhs;
  };

  Batman.Filters = {
    raw: buntUndefined(function(value, binding) {
      binding.escapeValue = false;
      return value;
    }),
    get: buntUndefined(function(value, key) {
      if (value.get != null) {
        return value.get(key);
      } else {
        return value[key];
      }
    }),
    equals: buntUndefined(function(lhs, rhs, binding) {
      return lhs === rhs;
    }),
    and: function(lhs, rhs) {
      return lhs && rhs;
    },
    or: function(lhs, rhs, binding) {
      return lhs || rhs;
    },
    not: function(value, binding) {
      return !value;
    },
    trim: buntUndefined(function(value, binding) {
      return value.trim();
    }),
    matches: buntUndefined(function(value, searchFor) {
      return value.indexOf(searchFor) !== -1;
    }),
    truncate: buntUndefined(function(value, length, end, binding) {
      if (end == null) {
        end = "...";
      }
      if (!binding) {
        binding = end;
        end = "...";
      }
      if (value.length > length) {
        value = value.substr(0, length - end.length) + end;
      }
      return value;
    }),
    "default": function(value, defaultValue, binding) {
      if ((value != null) && value !== '') {
        return value;
      } else {
        return defaultValue;
      }
    },
    prepend: function(value, string, binding) {
      return (string != null ? string : '') + (value != null ? value : '');
    },
    append: function(value, string, binding) {
      return (value != null ? value : '') + (string != null ? string : '');
    },
    replace: buntUndefined(function(value, searchFor, replaceWith, flags, binding) {
      if (!binding) {
        binding = flags;
        flags = void 0;
      }
      if (flags === void 0) {
        return value.replace(searchFor, replaceWith);
      } else {
        return value.replace(searchFor, replaceWith, flags);
      }
    }),
    downcase: buntUndefined(function(value) {
      return value.toLowerCase();
    }),
    upcase: buntUndefined(function(value) {
      return value.toUpperCase();
    }),
    pluralize: buntUndefined(function(string, count, includeCount, binding) {
      if (!binding) {
        binding = includeCount;
        includeCount = true;
        if (!binding) {
          binding = count;
          count = void 0;
        }
      }
      if (count != null) {
        return Batman.helpers.pluralize(count, string, void 0, includeCount);
      } else {
        return Batman.helpers.pluralize(string);
      }
    }),
    humanize: buntUndefined(function(string, binding) {
      return Batman.helpers.humanize(string);
    }),
    join: buntUndefined(function(value, withWhat, binding) {
      if (withWhat == null) {
        withWhat = '';
      }
      if (!binding) {
        binding = withWhat;
        withWhat = '';
      }
      return value.join(withWhat);
    }),
    sort: buntUndefined(function(value) {
      return value.sort();
    }),
    map: buntUndefined(function(value, key) {
      return value.map(function(x) {
        return Batman.get(x, key);
      });
    }),
    has: function(set, item) {
      if (set == null) {
        return false;
      }
      return Batman.contains(set, item);
    },
    first: buntUndefined(function(value) {
      return value[0];
    }),
    meta: buntUndefined(function(value, keypath) {
      Batman.developer.assert(value.meta, "Error, value doesn't have a meta to filter on!");
      return value.meta.get(keypath);
    }),
    interpolate: function(string, interpolationKeypaths, binding) {
      var k, v, values;
      if (!binding) {
        binding = interpolationKeypaths;
        interpolationKeypaths = void 0;
      }
      if (!string) {
        return;
      }
      values = {};
      for (k in interpolationKeypaths) {
        v = interpolationKeypaths[k];
        values[k] = this.get(v);
        if (values[k] == null) {
          Batman.developer.warn("Warning! Undefined interpolation key " + k + " for interpolation", string);
          values[k] = '';
        }
      }
      return Batman.helpers.interpolate(string, values);
    },
    withArguments: function() {
      var binding, block, curryArgs, _i;
      block = arguments[0], curryArgs = 3 <= arguments.length ? __slice.call(arguments, 1, _i = arguments.length - 1) : (_i = 1, []), binding = arguments[_i++];
      if (!block) {
        return;
      }
      return function() {
        var regularArgs;
        regularArgs = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        return block.call.apply(block, [this].concat(__slice.call(curryArgs), __slice.call(regularArgs)));
      };
    },
    routeToAction: buntUndefined(function(model, action) {
      var params;
      params = Batman.Dispatcher.paramsFromArgument(model);
      params.action = action;
      return params;
    }),
    escape: buntUndefined(Batman.escapeHTML)
  };

  (function() {
    var k, _i, _len, _ref, _results;
    _ref = ['capitalize', 'singularize', 'underscore', 'camelize'];
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      k = _ref[_i];
      _results.push(Batman.Filters[k] = buntUndefined(Batman.helpers[k]));
    }
    return _results;
  })();

  Batman.developer.addFilters();

}).call(this);

(function() {


}).call(this);

/**
 * Zest (https://github.com/chjj/zest)
 * A css selector engine.
 * Copyright (c) 2011-2012, Christopher Jeffrey. (MIT Licensed)
 */

// TODO
// - Recognize the TR subject selector when parsing.
// - Pass context to scope.
// - Add :column pseudo-classes.

;(function() {

/**
 * Shared
 */

var window = this
  , document = this.document
  , old = this.zest;

/**
 * Helpers
 */

var compareDocumentPosition = (function() {
  if (document.compareDocumentPosition) {
    return function(a, b) {
      return a.compareDocumentPosition(b);
    };
  }
  return function(a, b) {
    var el = a.ownerDocument.getElementsByTagName('*')
      , i = el.length;

    while (i--) {
      if (el[i] === a) return 2;
      if (el[i] === b) return 4;
    }

    return 1;
  };
})();

var order = function(a, b) {
  return compareDocumentPosition(a, b) & 2 ? 1 : -1;
};

var next = function(el) {
  while ((el = el.nextSibling)
         && el.nodeType !== 1);
  return el;
};

var prev = function(el) {
  while ((el = el.previousSibling)
         && el.nodeType !== 1);
  return el;
};

var child = function(el) {
  if (el = el.firstChild) {
    while (el.nodeType !== 1
           && (el = el.nextSibling));
  }
  return el;
};

var lastChild = function(el) {
  if (el = el.lastChild) {
    while (el.nodeType !== 1
           && (el = el.previousSibling));
  }
  return el;
};

var unquote = function(str) {
  if (!str) return str;
  var ch = str[0];
  return ch === '"' || ch === '\''
    ? str.slice(1, -1)
    : str;
};

var indexOf = (function() {
  if (Array.prototype.indexOf) {
    return Array.prototype.indexOf;
  }
  return function(obj, item) {
    var i = this.length;
    while (i--) {
      if (this[i] === item) return i;
    }
    return -1;
  };
})();

var makeInside = function(start, end) {
  var regex = rules.inside.source
    .replace(/</g, start)
    .replace(/>/g, end);

  return new RegExp(regex);
};

var replace = function(regex, name, val) {
  regex = regex.source;
  regex = regex.replace(name, val.source || val);
  return new RegExp(regex);
};

var truncateUrl = function(url, num) {
  return url
    .replace(/^(?:\w+:\/\/|\/+)/, '')
    .replace(/(?:\/+|\/*#.*?)$/, '')
    .split('/', num)
    .join('/');
};

/**
 * Handle `nth` Selectors
 */

var parseNth = function(param, test) {
  var param = param.replace(/\s+/g, '')
    , cap;

  if (param === 'even') {
    param = '2n+0';
  } else if (param === 'odd') {
    param = '2n+1';
  } else if (!~param.indexOf('n')) {
    param = '0n' + param;
  }

  cap = /^([+-])?(\d+)?n([+-])?(\d+)?$/.exec(param);

  return {
    group: cap[1] === '-'
      ? -(cap[2] || 1)
      : +(cap[2] || 1),
    offset: cap[4]
      ? (cap[3] === '-' ? -cap[4] : +cap[4])
      : 0
  };
};

var nth = function(param, test, last) {
  var param = parseNth(param)
    , group = param.group
    , offset = param.offset
    , find = !last ? child : lastChild
    , advance = !last ? next : prev;

  return function(el) {
    if (el.parentNode.nodeType !== 1) return;

    var rel = find(el.parentNode)
      , pos = 0;

    while (rel) {
      if (test(rel, el)) pos++;
      if (rel === el) {
        pos -= offset;
        return group && pos
          ? !(pos % group) && (pos < 0 === group < 0)
          : !pos;
      }
      rel = advance(rel);
    }
  };
};

/**
 * Simple Selectors
 */

var selectors = {
  '*': (function() {
    if (function() {
      var el = document.createElement('div');
      el.appendChild(document.createComment(''));
      return !!el.getElementsByTagName('*')[0];
    }()) {
      return function(el) {
        if (el.nodeType === 1) return true;
      };
    }
    return function() {
      return true;
    };
  })(),
  'type': function(type) {
    type = type.toLowerCase();
    return function(el) {
      return el.nodeName.toLowerCase() === type;
    };
  },
  'attr': function(key, op, val, i) {
    op = operators[op];
    return function(el) {
      var attr;
      switch (key) {
        case 'for':
          attr = el.htmlFor;
          break;
        case 'class':
          // className is '' when non-existent
          // getAttribute('class') is null
          attr = el.className;
          if (attr === '' && el.getAttribute('class') == null) {
            attr = null;
          }
          break;
        case 'href':
          attr = el.getAttribute('href', 2);
          break;
        case 'title':
          // getAttribute('title') can be '' when non-existent sometimes?
          attr = el.getAttribute('title') || null;
          break;
        case 'id':
          if (el.getAttribute) {
            attr = el.getAttribute('id');
            break;
          }
        default:
          attr = el[key] != null
            ? el[key]
            : el.getAttribute && el.getAttribute(key);
          break;
      }
      if (attr == null) return;
      attr = attr + '';
      if (i) {
        attr = attr.toLowerCase();
        val = val.toLowerCase();
      }
      return op(attr, val);
    };
  },
  ':first-child': function(el) {
    return !prev(el) && el.parentNode.nodeType === 1;
  },
  ':last-child': function(el) {
    return !next(el) && el.parentNode.nodeType === 1;
  },
  ':only-child': function(el) {
    return !prev(el) && !next(el)
      && el.parentNode.nodeType === 1;
  },
  ':nth-child': function(param, last) {
    return nth(param, function() {
      return true;
    }, last);
  },
  ':nth-last-child': function(param) {
    return selectors[':nth-child'](param, true);
  },
  ':root': function(el) {
    return el.ownerDocument.documentElement === el;
  },
  ':empty': function(el) {
    return !el.firstChild;
  },
  ':not': function(sel) {
    var test = compileGroup(sel);
    return function(el) {
      return !test(el);
    };
  },
  ':first-of-type': function(el) {
    if (el.parentNode.nodeType !== 1) return;
    var type = el.nodeName;
    while (el = prev(el)) {
      if (el.nodeName === type) return;
    }
    return true;
  },
  ':last-of-type': function(el) {
    if (el.parentNode.nodeType !== 1) return;
    var type = el.nodeName;
    while (el = next(el)) {
      if (el.nodeName === type) return;
    }
    return true;
  },
  ':only-of-type': function(el) {
    return selectors[':first-of-type'](el)
        && selectors[':last-of-type'](el);
  },
  ':nth-of-type': function(param, last) {
    return nth(param, function(rel, el) {
      return rel.nodeName === el.nodeName;
    }, last);
  },
  ':nth-last-of-type': function(param) {
    return selectors[':nth-of-type'](param, true);
  },
  ':checked': function(el) {
    return !!(el.checked || el.selected);
  },
  ':indeterminate': function(el) {
    return !selectors[':checked'](el);
  },
  ':enabled': function(el) {
    return !el.disabled && el.type !== 'hidden';
  },
  ':disabled': function(el) {
    return !!el.disabled;
  },
  ':target': function(el) {
    return el.id === window.location.hash.substring(1);
  },
  ':focus': function(el) {
    return el === el.ownerDocument.activeElement;
  },
  ':matches': function(sel) {
    return compileGroup(sel);
  },
  ':nth-match': function(param, last) {
    var args = param.split(/\s*,\s*/)
      , arg = args.shift()
      , test = compileGroup(args.join(','));

    return nth(arg, test, last);
  },
  ':nth-last-match': function(param) {
    return selectors[':nth-match'](param, true);
  },
  ':links-here': function(el) {
    return el + '' === window.location + '';
  },
  ':lang': function(param) {
    return function(el) {
      while (el) {
        if (el.lang) return el.lang.indexOf(param) === 0;
        el = el.parentNode;
      }
    };
  },
  ':dir': function(param) {
    return function(el) {
      while (el) {
        if (el.dir) return el.dir === param;
        el = el.parentNode;
      }
    };
  },
  ':scope': function(el, con) {
    var context = con || el.ownerDocument;
    if (context.nodeType === 9) {
      return el === context.documentElement;
    }
    return el === context;
  },
  ':any-link': function(el) {
    return typeof el.href === 'string';
  },
  ':local-link': function(el) {
    if (el.nodeName) {
      return el.href && el.host === window.location.host;
    }
    var param = +el + 1;
    return function(el) {
      if (!el.href) return;

      var url = window.location + ''
        , href = el + '';

      return truncateUrl(url, param) === truncateUrl(href, param);
    };
  },
  ':default': function(el) {
    return !!el.defaultSelected;
  },
  ':valid': function(el) {
    return el.willValidate || (el.validity && el.validity.valid);
  },
  ':invalid': function(el) {
    return !selectors[':valid'](el);
  },
  ':in-range': function(el) {
    return el.value > el.min && el.value <= el.max;
  },
  ':out-of-range': function(el) {
    return !selectors[':in-range'](el);
  },
  ':required': function(el) {
    return !!el.required;
  },
  ':optional': function(el) {
    return !el.required;
  },
  ':read-only': function(el) {
    if (el.readOnly) return true;

    var attr = el.getAttribute('contenteditable')
      , prop = el.contentEditable
      , name = el.nodeName.toLowerCase();

    name = name !== 'input' && name !== 'textarea';

    return (name || el.disabled) && attr == null && prop !== 'true';
  },
  ':read-write': function(el) {
    return !selectors[':read-only'](el);
  },
  ':hover': function() {
    throw new Error(':hover is not supported.');
  },
  ':active': function() {
    throw new Error(':active is not supported.');
  },
  ':link': function() {
    throw new Error(':link is not supported.');
  },
  ':visited': function() {
    throw new Error(':visited is not supported.');
  },
  ':column': function() {
    throw new Error(':column is not supported.');
  },
  ':nth-column': function() {
    throw new Error(':nth-column is not supported.');
  },
  ':nth-last-column': function() {
    throw new Error(':nth-last-column is not supported.');
  },
  ':current': function() {
    throw new Error(':current is not supported.');
  },
  ':past': function() {
    throw new Error(':past is not supported.');
  },
  ':future': function() {
    throw new Error(':future is not supported.');
  },
  // Non-standard, for compatibility purposes.
  ':contains': function(param) {
    return function(el) {
      var text = el.innerText || el.textContent || el.value || '';
      return !!~text.indexOf(param);
    };
  },
  ':has': function(param) {
    return function(el) {
      return zest(param, el).length > 0;
    };
  }
  // Potentially add more pseudo selectors for
  // compatibility with sizzle and most other
  // selector engines (?).
};

/**
 * Attribute Operators
 */

var operators = {
  '-': function() {
    return true;
  },
  '=': function(attr, val) {
    return attr === val;
  },
  '*=': function(attr, val) {
    return attr.indexOf(val) !== -1;
  },
  '~=': function(attr, val) {
    var i = attr.indexOf(val)
      , f
      , l;

    if (i === -1) return;
    f = attr[i - 1];
    l = attr[i + val.length];

    return (!f || f === ' ') && (!l || l === ' ');
  },
  '|=': function(attr, val) {
    var i = attr.indexOf(val)
      , l;

    if (i !== 0) return;
    l = attr[i + val.length];

    return l === '-' || !l;
  },
  '^=': function(attr, val) {
    return attr.indexOf(val) === 0;
  },
  '$=': function(attr, val) {
    return attr.indexOf(val) + val.length === attr.length;
  },
  // non-standard
  '!=': function(attr, val) {
    return attr !== val;
  }
};

/**
 * Combinator Logic
 */

var combinators = {
  ' ': function(test) {
    return function(el) {
      while (el = el.parentNode) {
        if (test(el)) return el;
      }
    };
  },
  '>': function(test) {
    return function(el) {
      return test(el = el.parentNode) && el;
    };
  },
  '+': function(test) {
    return function(el) {
      return test(el = prev(el)) && el;
    };
  },
  '~': function(test) {
    return function(el) {
      while (el = prev(el)) {
        if (test(el)) return el;
      }
    };
  },
  'noop': function(test) {
    return function(el) {
      return test(el) && el;
    };
  },
  'ref': function(test, name) {
    var node;

    function ref(el) {
      var doc = el.ownerDocument
        , nodes = doc.getElementsByTagName('*')
        , i = nodes.length;

      while (i--) {
        node = nodes[i];
        if (ref.test(el)) {
          node = null;
          return true;
        }
      }

      node = null;
    }

    ref.combinator = function(el) {
      if (!node || !node.getAttribute) return;

      var attr = node.getAttribute(name) || '';
      if (attr[0] === '#') attr = attr.substring(1);

      if (attr === el.id && test(node)) {
        return node;
      }
    };

    return ref;
  }
};

/**
 * Grammar
 */

var rules = {
  qname: /^ *([\w\-]+|\*)/,
  simple: /^(?:([.#][\w\-]+)|pseudo|attr)/,
  ref: /^ *\/([\w\-]+)\/ */,
  combinator: /^(?: +([^ \w*]) +|( )+|([^ \w*]))(?! *$)/,
  attr: /^\[([\w\-]+)(?:([^\w]?=)(inside))?\]/,
  pseudo: /^(:[\w\-]+)(?:\((inside)\))?/,
  inside: /(?:"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|<[^"'>]*>|\\["'>]|[^"'>])*/
};

rules.inside = replace(rules.inside, '[^"\'>]*', rules.inside);
rules.attr = replace(rules.attr, 'inside', makeInside('\\[', '\\]'));
rules.pseudo = replace(rules.pseudo, 'inside', makeInside('\\(', '\\)'));
rules.simple = replace(rules.simple, 'pseudo', rules.pseudo);
rules.simple = replace(rules.simple, 'attr', rules.attr);

/**
 * Compiling
 */

var compile = function(sel) {
  var sel = sel.replace(/^\s+|\s+$/g, '')
    , test
    , filter = []
    , buff = []
    , subject
    , qname
    , cap
    , op
    , ref;

  while (sel) {
    if (cap = rules.qname.exec(sel)) {
      sel = sel.substring(cap[0].length);
      qname = cap[1];
      buff.push(tok(qname, true));
    } else if (cap = rules.simple.exec(sel)) {
      sel = sel.substring(cap[0].length);
      qname = '*';
      buff.push(tok(qname, true));
      buff.push(tok(cap));
    } else {
      throw new Error('Invalid selector.');
    }

    while (cap = rules.simple.exec(sel)) {
      sel = sel.substring(cap[0].length);
      buff.push(tok(cap));
    }

    if (sel[0] === '!') {
      sel = sel.substring(1);
      subject = makeSubject();
      subject.qname = qname;
      buff.push(subject.simple);
    }

    if (cap = rules.ref.exec(sel)) {
      sel = sel.substring(cap[0].length);
      ref = combinators.ref(makeSimple(buff), cap[1]);
      filter.push(ref.combinator);
      buff = [];
      continue;
    }

    if (cap = rules.combinator.exec(sel)) {
      sel = sel.substring(cap[0].length);
      op = cap[1] || cap[2] || cap[3];
      if (op === ',') {
        filter.push(combinators.noop(makeSimple(buff)));
        break;
      }
    } else {
      op = 'noop';
    }

    filter.push(combinators[op](makeSimple(buff)));
    buff = [];
  }

  test = makeTest(filter);
  test.qname = qname;
  test.sel = sel;

  if (subject) {
    subject.lname = test.qname;

    subject.test = test;
    subject.qname = subject.qname;
    subject.sel = test.sel;
    test = subject;
  }

  if (ref) {
    ref.test = test;
    ref.qname = test.qname;
    ref.sel = test.sel;
    test = ref;
  }

  return test;
};

var tok = function(cap, qname) {
  // qname
  if (qname) {
    return cap === '*'
      ? selectors['*']
      : selectors.type(cap);
  }

  // class/id
  if (cap[1]) {
    return cap[1][0] === '.'
      ? selectors.attr('class', '~=', cap[1].substring(1))
      : selectors.attr('id', '=', cap[1].substring(1));
  }

  // pseudo-name
  // inside-pseudo
  if (cap[2]) {
    return cap[3]
      ? selectors[cap[2]](unquote(cap[3]))
      : selectors[cap[2]];
  }

  // attr name
  // attr op
  // attr value
  if (cap[4]) {
    var i;
    if (cap[6]) {
      i = cap[6].length;
      cap[6] = cap[6].replace(/ +i$/, '');
      i = i > cap[6].length;
    }
    return selectors.attr(cap[4], cap[5] || '-', unquote(cap[6]), i);
  }

  throw new Error('Unknown Selector.');
};

var makeSimple = function(func) {
  var l = func.length
    , i;

  // Potentially make sure
  // `el` is truthy.
  if (l < 2) return func[0];

  return function(el) {
    if (!el) return;
    for (i = 0; i < l; i++) {
      if (!func[i](el)) return;
    }
    return true;
  };
};

var makeTest = function(func) {
  if (func.length < 2) {
    return function(el) {
      return !!func[0](el);
    };
  }
  return function(el) {
    var i = func.length;
    while (i--) {
      if (!(el = func[i](el))) return;
    }
    return true;
  };
};

var makeSubject = function() {
  var target;

  function subject(el) {
    var node = el.ownerDocument
      , scope = node.getElementsByTagName(subject.lname)
      , i = scope.length;

    while (i--) {
      if (subject.test(scope[i]) && target === el) {
        target = null;
        return true;
      }
    }

    target = null;
  }

  subject.simple = function(el) {
    target = el;
    return true;
  };

  return subject;
};

var compileGroup = function(sel) {
  var test = compile(sel)
    , tests = [ test ];

  while (test.sel) {
    test = compile(test.sel);
    tests.push(test);
  }

  if (tests.length < 2) return test;

  return function(el) {
    var l = tests.length
      , i = 0;

    for (; i < l; i++) {
      if (tests[i](el)) return true;
    }
  };
};

/**
 * Selection
 */

var find = function(sel, node) {
  var results = []
    , test = compile(sel)
    , scope = node.getElementsByTagName(test.qname)
    , i = 0
    , el;

  while (el = scope[i++]) {
    if (test(el)) results.push(el);
  }

  if (test.sel) {
    while (test.sel) {
      test = compile(test.sel);
      scope = node.getElementsByTagName(test.qname);
      i = 0;
      while (el = scope[i++]) {
        if (test(el) && !~indexOf.call(results, el)) {
          results.push(el);
        }
      }
    }
    results.sort(order);
  }

  return results;
};

/**
 * Native
 */

var select = (function() {
  var slice = (function() {
    try {
      Array.prototype.slice.call(document.getElementsByTagName('zest'));
      return Array.prototype.slice;
    } catch(e) {
      e = null;
      return function() {
        var a = [], i = 0, l = this.length;
        for (; i < l; i++) a.push(this[i]);
        return a;
      };
    }
  })();

  if (document.querySelectorAll) {
    return function(sel, node) {
      try {
        return slice.call(node.querySelectorAll(sel));
      } catch(e) {
        return find(sel, node);
      }
    };
  }

  return function(sel, node) {
    try {
      if (sel[0] === '#' && /^#[\w\-]+$/.test(sel)) {
        return [node.getElementById(sel.substring(1))];
      }
      if (sel[0] === '.' && /^\.[\w\-]+$/.test(sel)) {
        sel = node.getElementsByClassName(sel.substring(1));
        return slice.call(sel);
      }
      if (/^[\w\-]+$/.test(sel)) {
        return slice.call(node.getElementsByTagName(sel));
      }
    } catch(e) {
      ;
    }
    return find(sel, node);
  };
})();

/**
 * Zest
 */

var zest = function(sel, node) {
  try {
    sel = select(sel, node || document);
  } catch(e) {
    if (window.ZEST_DEBUG) {
      console.log(e.stack || e + '');
    }
    sel = [];
  }
  return sel;
};

/**
 * Expose
 */

zest.selectors = selectors;
zest.operators = operators;
zest.combinators = combinators;
zest.compile = compileGroup;

zest.matches = function(el, sel) {
  return !!compileGroup(sel)(el);
};

zest.cache = function() {
  if (compile.raw) return;

  var raw = compile
    , cache = {};

  compile = function(sel) {
    return cache[sel]
      || (cache[sel] = raw(sel));
  };

  compile.raw = raw;
  zest._cache = cache;
};

zest.noCache = function() {
  if (!compile.raw) return;
  compile = compile.raw;
  delete zest._cache;
};

zest.noConflict = function() {
  window.zest = old;
  return zest;
};

zest.noNative = function() {
  select = find;
};

if (typeof module !== 'undefined') {
  module.exports = zest;
} else {
  this.zest = zest;
}

if (window.ZEST_DEBUG) {
  zest.noNative();
} else {
  zest.cache();
}

}).call(function() {
  return this || (typeof window !== 'undefined' ? window : global);
}());

/*!
  * Reqwest! A general purpose XHR connection manager
  * (c) Dustin Diaz 2011
  * https://github.com/ded/reqwest
  * license MIT
  */
!function (name, definition) {
  if (typeof module != 'undefined') module.exports = definition()
  else if (typeof define == 'function' && define.amd) define(name, definition)
  else this[name] = definition()
}('reqwest', function () {

  var context = this
    , win = window
    , doc = document
    , old = context.reqwest
    , twoHundo = /^20\d$/
    , byTag = 'getElementsByTagName'
    , readyState = 'readyState'
    , contentType = 'Content-Type'
    , requestedWith = 'X-Requested-With'
    , head = doc[byTag]('head')[0]
    , uniqid = 0
    , lastValue // data stored by the most recent JSONP callback
    , xmlHttpRequest = 'XMLHttpRequest'
    , isArray = typeof Array.isArray == 'function' ? Array.isArray : function (a) {
        return a instanceof Array
      }
    , defaultHeaders = {
          contentType: 'application/x-www-form-urlencoded'
        , accept: {
              '*':  'text/javascript, text/html, application/xml, text/xml, */*'
            , xml:  'application/xml, text/xml'
            , html: 'text/html'
            , text: 'text/plain'
            , json: 'application/json, text/javascript'
            , js:   'application/javascript, text/javascript'
          }
        , requestedWith: xmlHttpRequest
      }
    , xhr = win[xmlHttpRequest] ?
        function () {
          return new XMLHttpRequest()
        } :
        function () {
          return new ActiveXObject('Microsoft.XMLHTTP')
        }

  function handleReadyState(o, success, error) {
    return function () {
      if (o && o[readyState] == 4) {
        if (twoHundo.test(o.status)) {
          success(o)
        } else {
          error(o)
        }
      }
    }
  }

  function setHeaders(http, o) {
    var headers = o.headers || {}, h
    headers.Accept = headers.Accept || defaultHeaders.accept[o.type] || defaultHeaders.accept['*']
    // breaks cross-origin requests with legacy browsers
    if (!o.crossOrigin && !headers[requestedWith]) headers[requestedWith] = defaultHeaders.requestedWith
    if (!headers[contentType]) headers[contentType] = o.contentType || defaultHeaders.contentType
    for (h in headers) {
      headers.hasOwnProperty(h) && http.setRequestHeader(h, headers[h])
    }
  }

  function generalCallback(data) {
    lastValue = data
  }

  function urlappend(url, s) {
    return url + (/\?/.test(url) ? '&' : '?') + s
  }

  function handleJsonp(o, fn, err, url) {
    var reqId = uniqid++
      , cbkey = o.jsonpCallback || 'callback' // the 'callback' key
      , cbval = o.jsonpCallbackName || ('reqwest_' + reqId) // the 'callback' value
      , cbreg = new RegExp('((^|\\?|&)' + cbkey + ')=([^&]+)')
      , match = url.match(cbreg)
      , script = doc.createElement('script')
      , loaded = 0

    if (match) {
      if (match[3] === '?') {
        url = url.replace(cbreg, '$1=' + cbval) // wildcard callback func name
      } else {
        cbval = match[3] // provided callback func name
      }
    } else {
      url = urlappend(url, cbkey + '=' + cbval) // no callback details, add 'em
    }

    win[cbval] = generalCallback

    script.type = 'text/javascript'
    script.src = url
    script.async = true
    if (typeof script.onreadystatechange !== 'undefined') {
        // need this for IE due to out-of-order onreadystatechange(), binding script
        // execution to an event listener gives us control over when the script
        // is executed. See http://jaubourg.net/2010/07/loading-script-as-onclick-handler-of.html
        script.event = 'onclick'
        script.htmlFor = script.id = '_reqwest_' + reqId
    }

    script.onload = script.onreadystatechange = function () {
      if ((script[readyState] && script[readyState] !== 'complete' && script[readyState] !== 'loaded') || loaded) {
        return false
      }
      script.onload = script.onreadystatechange = null
      script.onclick && script.onclick()
      // Call the user callback with the last value stored and clean up values and scripts.
      o.success && o.success(lastValue)
      lastValue = undefined
      head.removeChild(script)
      loaded = 1
    }

    // Add the script to the DOM head
    head.appendChild(script)
  }

  function getRequest(o, fn, err) {
    var method = (o.method || 'GET').toUpperCase()
      , url = typeof o === 'string' ? o : o.url
      // convert non-string objects to query-string form unless o.processData is false
      , data = (o.processData !== false && o.data && typeof o.data !== 'string')
        ? reqwest.toQueryString(o.data)
        : (o.data || null)
      , http

    // if we're working on a GET request and we have data then we should append
    // query string to end of URL and not post data
    if ((o.type == 'jsonp' || method == 'GET') && data) {
      url = urlappend(url, data)
      data = null
    }

    if (o.type == 'jsonp') return handleJsonp(o, fn, err, url)

    http = xhr()
    http.open(method, url, true)
    setHeaders(http, o)
    http.onreadystatechange = handleReadyState(http, fn, err)
    o.before && o.before(http)
    http.send(data)
    return http
  }

  function Reqwest(o, fn) {
    this.o = o
    this.fn = fn
    init.apply(this, arguments)
  }

  function setType(url) {
    var m = url.match(/\.(json|jsonp|html|xml)(\?|$)/)
    return m ? m[1] : 'js'
  }

  function init(o, fn) {
    this.url = typeof o == 'string' ? o : o.url
    this.timeout = null
    var type = o.type || setType(this.url)
      , self = this
    fn = fn || function () {}

    if (o.timeout) {
      this.timeout = setTimeout(function () {
        self.abort()
      }, o.timeout)
    }

    function complete(resp) {
      o.timeout && clearTimeout(self.timeout)
      self.timeout = null
      o.complete && o.complete(resp)
    }

    function success(resp) {
      var r = resp.responseText
      if (r) {
        switch (type) {
        case 'json':
          try {
            resp = win.JSON ? win.JSON.parse(r) : eval('(' + r + ')')
          } catch (err) {
            return error(resp, 'Could not parse JSON in response', err)
          }
          break;
        case 'js':
          resp = eval(r)
          break;
        case 'html':
          resp = r
          break;
        }
      }

      fn(resp)
      o.success && o.success(resp)

      complete(resp)
    }

    function error(resp, msg, t) {
      o.error && o.error(resp, msg, t)
      complete(resp)
    }

    this.request = getRequest(o, success, error)
  }

  Reqwest.prototype = {
    abort: function () {
      this.request.abort()
    }

  , retry: function () {
      init.call(this, this.o, this.fn)
    }
  }

  function reqwest(o, fn) {
    return new Reqwest(o, fn)
  }

  // normalize newline variants according to spec -> CRLF
  function normalize(s) {
    return s ? s.replace(/\r?\n/g, '\r\n') : ''
  }

  function serial(el, cb) {
    var n = el.name
      , t = el.tagName.toLowerCase()
      , optCb = function(o) {
          // IE gives value="" even where there is no value attribute
          // 'specified' ref: http://www.w3.org/TR/DOM-Level-3-Core/core.html#ID-862529273
          if (o && !o.disabled)
            cb(n, normalize(o.attributes.value && o.attributes.value.specified ? o.value : o.text))
        }

    // don't serialize elements that are disabled or without a name
    if (el.disabled || !n) return;

    switch (t) {
    case 'input':
      if (!/reset|button|image|file/i.test(el.type)) {
        var ch = /checkbox/i.test(el.type)
          , ra = /radio/i.test(el.type)
          , val = el.value;
        // WebKit gives us "" instead of "on" if a checkbox has no value, so correct it here
        (!(ch || ra) || el.checked) && cb(n, normalize(ch && val === '' ? 'on' : val))
      }
      break;
    case 'textarea':
      cb(n, normalize(el.value))
      break;
    case 'select':
      if (el.type.toLowerCase() === 'select-one') {
        optCb(el.selectedIndex >= 0 ? el.options[el.selectedIndex] : null)
      } else {
        for (var i = 0; el.length && i < el.length; i++) {
          el.options[i].selected && optCb(el.options[i])
        }
      }
      break;
    }
  }

  // collect up all form elements found from the passed argument elements all
  // the way down to child elements; pass a '<form>' or form fields.
  // called with 'this'=callback to use for serial() on each element
  function eachFormElement() {
    var cb = this
      , e, i, j
      , serializeSubtags = function(e, tags) {
        for (var i = 0; i < tags.length; i++) {
          var fa = e[byTag](tags[i])
          for (j = 0; j < fa.length; j++) serial(fa[j], cb)
        }
      }

    for (i = 0; i < arguments.length; i++) {
      e = arguments[i]
      if (/input|select|textarea/i.test(e.tagName)) serial(e, cb)
      serializeSubtags(e, [ 'input', 'select', 'textarea' ])
    }
  }

  // standard query string style serialization
  function serializeQueryString() {
    return reqwest.toQueryString(reqwest.serializeArray.apply(null, arguments))
  }

  // { 'name': 'value', ... } style serialization
  function serializeHash() {
    var hash = {}
    eachFormElement.apply(function (name, value) {
      if (name in hash) {
        hash[name] && !isArray(hash[name]) && (hash[name] = [hash[name]])
        hash[name].push(value)
      } else hash[name] = value
    }, arguments)
    return hash
  }

  // [ { name: 'name', value: 'value' }, ... ] style serialization
  reqwest.serializeArray = function () {
    var arr = []
    eachFormElement.apply(function(name, value) {
      arr.push({name: name, value: value})
    }, arguments)
    return arr
  }

  reqwest.serialize = function () {
    if (arguments.length === 0) return ''
    var opt, fn
      , args = Array.prototype.slice.call(arguments, 0)

    opt = args.pop()
    opt && opt.nodeType && args.push(opt) && (opt = null)
    opt && (opt = opt.type)

    if (opt == 'map') fn = serializeHash
    else if (opt == 'array') fn = reqwest.serializeArray
    else fn = serializeQueryString

    return fn.apply(null, args)
  }

  reqwest.toQueryString = function (o) {
    var qs = '', i
      , enc = encodeURIComponent
      , push = function (k, v) {
          qs += enc(k) + '=' + enc(v) + '&'
        }

    if (isArray(o)) {
      for (i = 0; o && i < o.length; i++) push(o[i].name, o[i].value)
    } else {
      for (var k in o) {
        if (!Object.hasOwnProperty.call(o, k)) continue;
        var v = o[k]
        if (isArray(v)) {
          for (i = 0; i < v.length; i++) push(k, v[i])
        } else push(k, o[k])
      }
    }

    // spaces should be + according to spec
    return qs.replace(/&$/, '').replace(/%20/g,'+')
  }

  // jQuery and Zepto compatibility, differences can be remapped here so you can call
  // .ajax.compat(options, callback)
  reqwest.compat = function (o, fn) {
    if (o) {
      o.type && (o.method = o.type) && delete o.type
      o.dataType && (o.type = o.dataType)
      o.jsonpCallback && (o.jsonpCallbackName = o.jsonpCallback) && delete o.jsonpCallback
      o.jsonp && (o.jsonpCallback = o.jsonp)
    }
    return new Reqwest(o, fn)
  }

  return reqwest
});

(function() {
  var SAFARI_CONTAINS_IS_BROKEN, version;

  if (/Safari/.test(navigator.userAgent)) {
    version = /WebKit\/(\S+)/.exec(navigator.userAgent);
    if (version && parseFloat(version) < 540) {
      SAFARI_CONTAINS_IS_BROKEN = true;
    }
  }

  (typeof window !== "undefined" && window !== null ? window : global).containsNode = function(parent, child) {
    if (parent === child) {
      return true;
    }
    if (parent.contains && !SAFARI_CONTAINS_IS_BROKEN) {
      return parent.contains(child);
    }
    if (parent.compareDocumentPosition) {
      return !!(parent.compareDocumentPosition(child) & 16);
    }
    while (child && parent !== child) {
      child = child.parentNode;
    }
    return child === parent;
  };

}).call(this);

(function() {
  Batman.extend(Batman.DOM, {
    querySelectorAll: function(node, selector) {
      return zest(selector, node);
    },
    querySelector: function(node, selector) {
      return zest(selector, node)[0];
    },
    setInnerHTML: function(node, html) {
      return node != null ? node.innerHTML = html : void 0;
    },
    containsNode: function(parent, child) {
      if (!child) {
        child = parent;
        parent = document.body;
      }
      return window.containsNode(parent, child);
    },
    textContent: function(node) {
      var _ref;
      return (_ref = node.textContent) != null ? _ref : node.innerText;
    },
    destroyNode: function(node) {
      var _ref;
      Batman.DOM.cleanupNode(node);
      return node != null ? (_ref = node.parentNode) != null ? _ref.removeChild(node) : void 0 : void 0;
    }
  });

  Batman.extend(Batman.Request.prototype, {
    _parseResponseHeaders: function(xhr) {
      var headers;
      return headers = xhr.getAllResponseHeaders().split('\n').reduce(function(acc, header) {
        var key, matches, value;
        if (matches = header.match(/([^:]*):\s*(.*)/)) {
          key = matches[1];
          value = matches[2];
          acc[key] = value;
        }
        return acc;
      }, {});
    },
    send: function(data) {
      var options, xhr, _ref,
        _this = this;
      if (data == null) {
        data = this.get('data');
      }
      this.fire('loading');
      options = {
        url: this.get('url'),
        method: this.get('method'),
        type: this.get('type'),
        headers: this.get('headers'),
        success: function(response) {
          _this.mixin({
            xhr: xhr,
            response: response,
            status: typeof xhr !== "undefined" && xhr !== null ? xhr.status : void 0,
            responseHeaders: _this._parseResponseHeaders(xhr)
          });
          return _this.fire('success', response);
        },
        error: function(xhr) {
          _this.mixin({
            xhr: xhr,
            response: xhr.responseText || xhr.content,
            status: xhr.status,
            responseHeaders: _this._parseResponseHeaders(xhr)
          });
          xhr.request = _this;
          return _this.fire('error', xhr);
        },
        complete: function() {
          return _this.fire('loaded');
        }
      };
      if ((_ref = options.method) === 'PUT' || _ref === 'POST') {
        if (this.hasFileUploads()) {
          options.data = this.constructor.objectToFormData(data);
        } else {
          options.contentType = this.get('contentType');
          options.data = Batman.URI.queryFromParams(data);
        }
      } else {
        options.data = data;
      }
      return xhr = (reqwest(options)).request;
    }
  });

}).call(this);

(function() {


}).call(this);
