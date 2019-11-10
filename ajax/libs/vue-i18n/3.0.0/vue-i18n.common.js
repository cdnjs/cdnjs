/*!
 * vue-i18n v3.0.0
 * (c) 2016 kazuya kawaguchi
 * Released under the MIT License.
 */
'use strict';

var babelHelpers = {};
babelHelpers.typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
};
babelHelpers;

/**
 * Utilties
 */

// export default for holding the Vue reference
var exports$1 = {};
/**
 * warn
 *
 * @param {String} msg
 * @param {Error} [err]
 *
 */

function warn(msg, err) {
  if (window.console) {
    console.warn('[vue-i18n] ' + msg);
    if (err) {
      console.warn(err.stack);
    }
  }
}

var hasOwnProperty = Object.prototype.hasOwnProperty;
/**
 * Check whether the object has the property.
 *
 * @param {Object} obj
 * @param {String} key
 * @return {Boolean}
 */

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

/**
 * empty
 *
 * @param {Array|Object} target
 * @return {Boolean}
 */

function empty(target) {
  if (target === null || target === undefined) {
    return true;
  }

  if (Array.isArray(target)) {
    if (target.length > 0) {
      return false;
    }
    if (target.length === 0) {
      return true;
    }
  } else if (exports$1.Vue.util.isPlainObject(target)) {
    for (var key in target) {
      if (hasOwn(target, key)) {
        return false;
      }
    }
  }

  return true;
}

/**
 * each
 *
 * @param {Array|Object} target
 * @param {Function} iterator
 * @param {Object} [context]
 */

function each(target, iterator, context) {
  if (Array.isArray(target)) {
    for (var i = 0; i < target.length; i++) {
      iterator.call(context || target[i], target[i], i);
    }
  } else if (exports$1.Vue.util.isPlainObject(target)) {
    for (var key in target) {
      if (hasOwn(target, key)) {
        iterator.call(context || target[key], target[key], key);
      }
    }
  }
}

var Watcher = void 0;
/**
 * getWatcher
 *
 * @param {Vue} vm
 * @return {Watcher}
 */

function getWatcher(vm) {
  if (!Watcher) {
    var unwatch = vm.$watch('__watcher__', function (a) {});
    Watcher = vm._watchers[0].constructor;
    unwatch();
  }
  return Watcher;
}

var Dep = void 0;
/**
 * getDep
 *
 * @param {Vue} vm
 * @return {Dep}
 */

function getDep(vm) {
  if (!Dep) {
    Dep = vm._data.__ob__.dep.constructor;
  }
  return Dep;
}

/**
 * Forgiving check for a promise
 *
 * @param {Object} p
 * @return {Boolean}
 */

function isPromise(p) {
  return p && typeof p.then === 'function';
}

/**
 * Version compare
 * - Inspired:
 *   https://github.com/omichelsen/compare-versions
 */

var PATCH_PATTERN = /-([\w-.]+)/;

function split(v) {
  var temp = v.split('.');
  var arr = temp.splice(0, 2);
  arr.push(temp.join('.'));
  return arr;
}

/**
 * compare
 *
 * @param {String} v1
 * @param {String} v2
 * @return {Number}
 */

function compare (v1, v2) {
  var s1 = split(v1);
  var s2 = split(v2);

  for (var i = 0; i < 3; i++) {
    var n1 = parseInt(s1[i] || 0, 10);
    var n2 = parseInt(s2[i] || 0, 10);

    if (n1 > n2) {
      return 1;
    }
    if (n2 > n1) {
      return -1;
    }
  }

  if ((s1[2] + s2[2] + '').indexOf('-') > -1) {
    var p1 = (PATCH_PATTERN.exec(s1[2]) || [''])[0];
    var p2 = (PATCH_PATTERN.exec(s2[2]) || [''])[0];

    if (p1 === '') {
      return 1;
    }
    if (p2 === '') {
      return -1;
    }
    if (p1 > p2) {
      return 1;
    }
    if (p2 > p1) {
      return -1;
    }
  }

  return 0;
}

var locales = Object.create(null); // locales store

function Asset (Vue) {
  /**
   * Register or retrieve a global locale definition.
   *
   * @param {String} id
   * @param {Object | Function | Promise} definition
   * @param {Function} cb
   */

  Vue.locale = function (id, definition, cb) {
    if (definition === undefined) {
      // gettter
      return locales[id];
    } else {
      // setter
      if (definition === null) {
        locales[id] = undefined;
        delete locales[id];
      } else {
        setLocale(id, definition, function (locale) {
          if (locale) {
            locales[id] = locale;
            cb && cb();
          } else {
            warn('failed set `' + id + '` locale');
          }
        });
      }
    }
  };
}

function setLocale(id, definition, cb) {
  var _this = this;

  if ((typeof definition === 'undefined' ? 'undefined' : babelHelpers.typeof(definition)) === 'object') {
    // sync
    cb(definition);
  } else {
    (function () {
      var future = definition.call(_this);
      if (typeof future === 'function') {
        if (future.resolved) {
          // cached
          cb(future.resolved);
        } else if (future.requested) {
          // pool callbacks
          future.pendingCallbacks.push(cb);
        } else {
          (function () {
            future.requested = true;
            var cbs = future.pendingCallbacks = [cb];
            future(function (locale) {
              // resolve
              future.resolved = locale;
              for (var i = 0, l = cbs.length; i < l; i++) {
                cbs[i](locale);
              }
            }, function () {
              // reject
              cb();
            });
          })();
        }
      } else if (isPromise(future)) {
        // promise
        future.then(function (locale) {
          // resolve
          cb(locale);
        }, function () {
          // reject
          cb();
        }).catch(function (err) {
          console.error(err);
          cb();
        });
      }
    })();
  }
}

function Override (Vue, langVM) {
  // override _init
  var init = Vue.prototype._init;
  Vue.prototype._init = function (options) {
    var _this = this;

    options = options || {};
    var root = options._parent || options.parent || this;
    var lang = root.$lang;

    if (lang) {
      this.$lang = lang;
    } else {
      this.$lang = langVM;
    }

    this._langUnwatch = this.$lang.$watch('lang', function (a, b) {
      update(_this);
    });

    init.call(this, options);
  };

  // override _destroy
  var destroy = Vue.prototype._destroy;
  Vue.prototype._destroy = function () {
    if (this._langUnwatch) {
      this._langUnwatch();
      this._langUnwatch = null;
    }

    this.$lang = null;
    destroy.apply(this, arguments);
  };
}

function update(vm) {
  var i = vm._watchers.length;
  while (i--) {
    vm._watchers[i].update(true); // shallow updates
  }
}

function Config (Vue, langVM) {
  var Watcher = getWatcher(langVM);
  var Dep = getDep(langVM);

  function makeComputedGetter(getter, owner) {
    var watcher = new Watcher(owner, getter, null, {
      lazy: true
    });

    return function computedGetter() {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value;
    };
  }

  // define Vue.config.lang configration
  Object.defineProperty(Vue.config, 'lang', {
    enumerable: true,
    configurable: true,
    get: makeComputedGetter(function () {
      return langVM.lang;
    }, langVM),
    set: Vue.util.bind(function (val) {
      langVM.lang = val;
    }, langVM)
  });
}

/**
 *  String format template
 *  - Inspired:  
 *    https://github.com/Matt-Esch/string-template/index.js
 */

var RE_NARGS = /(%|)\{([0-9a-zA-Z]+)\}/g;

/**
 * template
 *  
 * @param {String} string
 * @param {Array} ...args
 * @return {String}
 */

function format (string) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  if (args.length === 1 && babelHelpers.typeof(args[0]) === 'object') {
    args = args[0];
  }

  if (!args || !args.hasOwnProperty) {
    args = {};
  }

  return string.replace(RE_NARGS, function (match, prefix, i, index) {
    var result = void 0;

    if (string[index - 1] === '{' && string[index + match.length] === '}') {
      return i;
    } else {
      result = args.hasOwnProperty(i) ? args[i] : null;
      if (result === null || result === undefined) {
        return '';
      }

      return result;
    }
  });
}

/**
 * extend
 * 
 * @param {Vue} Vue
 * @return {Vue}
 */

function Extend (Vue) {
  var getPath = compare('1.0.8', Vue.version) === -1 ? Vue.parsers.path.getPath : Vue.parsers.path.get;
  var util = Vue.util;

  function getVal(key, lang, args) {
    var value = key;
    try {
      var locale = Vue.locale(lang);
      var val = getPath(locale, key) || locale[key];
      value = (args ? format(val, args) : val) || key;
    } catch (e) {
      value = key;
    }
    return value;
  }

  /**
   * Vue.t
   *
   * @param {String} key
   * @param {Array} ...args
   * @return {String}
   */

  Vue.t = function (key) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    if (!key) {
      return '';
    }

    var language = Vue.config.lang;
    if (args.length === 1) {
      if (util.isObject(args[0]) || util.isArray(args[0])) {
        args = args[0];
      } else if (typeof args[0] === 'string') {
        language = args[0];
      }
    } else if (args.length === 2) {
      if (typeof args[0] === 'string') {
        language = args[0];
      }
      if (util.isObject(args[1]) || util.isArray(args[1])) {
        args = args[1];
      }
    }

    return getVal(key, language, args);
  };

  /**
   * $t
   *
   * @param {String} key
   * @param {Array} ...args
   * @return {String}
   */

  Vue.prototype.$t = function (key) {
    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    return Vue.t.apply(Vue, [key].concat(args));
  };

  return Vue;
}

var langVM = void 0; // singleton

/**
 * plugin
 *
 * @param {Object} Vue
 * @param {Object} opts
 */

function plugin(Vue) {
  var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  if (process.env.NODE_ENV !== 'production' && plugin.installed) {
    warn('already installed.');
    return;
  }

  if (process.env.NODE_ENV !== 'production' && (!Vue.version || compare(Vue.version, '1.0') < 0)) {
    warn('vue-i18n (' + plugin.version + ') need to use vue version 1.0 or later (vue version: ' + Vue.version + ').');
    return;
  }

  if (process.env.NODE_ENV !== 'production' && opts.lang) {
    warn('`options.lang` will be deprecated in vue-i18n 3.1 later.');
  }
  var lang = opts.lang || 'en';

  if (process.env.NODE_ENV !== 'production' && opts.locales) {
    warn('`options.locales` will be deprecated in vue-i18n 3.1 later.');
  }
  var locales = opts.locales || {};

  exports$1.Vue = Vue;
  setupLangVM(Vue, lang);

  Asset(Vue);
  setupLocale(Vue, locales);

  Override(Vue, langVM);
  Config(Vue, langVM);
  Extend(Vue);
}

function setupLangVM(Vue, lang) {
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  if (!langVM) {
    langVM = new Vue({ data: { lang: lang } });
  }
  Vue.config.silent = silent;
}

function setupLocale(Vue, locales) {
  if (!empty(locales)) {
    each(locales, function (locale, lang) {
      Vue.locale(lang, locale);
    });
  }
}

plugin.version = '3.0.0';

module.exports = plugin;