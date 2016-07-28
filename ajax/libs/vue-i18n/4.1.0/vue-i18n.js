/*!
 * vue-i18n v4.1.0
 * (c) 2016 kazuya kawaguchi
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.VueI18n = factory());
}(this, function () { 'use strict';

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
      /* eslint-disable prefer-const */
      for (var key in target) {
        if (hasOwn(target, key)) {
          return false;
        }
      }
      /* eslint-enable prefer-const */
    }

    return true;
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

  // export default for holding the Vue reference
  var exports$2 = {};
  // cache
  var pathCache = Object.create(null);

  // actions
  var APPEND = 0;
  var PUSH = 1;
  var INC_SUB_PATH_DEPTH = 2;
  var PUSH_SUB_PATH = 3;

  // states
  var BEFORE_PATH = 0;
  var IN_PATH = 1;
  var BEFORE_IDENT = 2;
  var IN_IDENT = 3;
  var IN_SUB_PATH = 4;
  var IN_SINGLE_QUOTE = 5;
  var IN_DOUBLE_QUOTE = 6;
  var AFTER_PATH = 7;
  var ERROR = 8;

  var pathStateMachine = [];

  pathStateMachine[BEFORE_PATH] = {
    'ws': [BEFORE_PATH],
    'ident': [IN_IDENT, APPEND],
    '[': [IN_SUB_PATH],
    'eof': [AFTER_PATH]
  };

  pathStateMachine[IN_PATH] = {
    'ws': [IN_PATH],
    '.': [BEFORE_IDENT],
    '[': [IN_SUB_PATH],
    'eof': [AFTER_PATH]
  };

  pathStateMachine[BEFORE_IDENT] = {
    'ws': [BEFORE_IDENT],
    'ident': [IN_IDENT, APPEND]
  };

  pathStateMachine[IN_IDENT] = {
    'ident': [IN_IDENT, APPEND],
    '0': [IN_IDENT, APPEND],
    'number': [IN_IDENT, APPEND],
    'ws': [IN_PATH, PUSH],
    '.': [BEFORE_IDENT, PUSH],
    '[': [IN_SUB_PATH, PUSH],
    'eof': [AFTER_PATH, PUSH]
  };

  pathStateMachine[IN_SUB_PATH] = {
    "'": [IN_SINGLE_QUOTE, APPEND],
    '"': [IN_DOUBLE_QUOTE, APPEND],
    '[': [IN_SUB_PATH, INC_SUB_PATH_DEPTH],
    ']': [IN_PATH, PUSH_SUB_PATH],
    'eof': ERROR,
    'else': [IN_SUB_PATH, APPEND]
  };

  pathStateMachine[IN_SINGLE_QUOTE] = {
    "'": [IN_SUB_PATH, APPEND],
    'eof': ERROR,
    'else': [IN_SINGLE_QUOTE, APPEND]
  };

  pathStateMachine[IN_DOUBLE_QUOTE] = {
    '"': [IN_SUB_PATH, APPEND],
    'eof': ERROR,
    'else': [IN_DOUBLE_QUOTE, APPEND]
  };

  /**
   * Determine the type of a character in a keypath.
   *
   * @param {Char} ch
   * @return {String} type
   */

  function getPathCharType(ch) {
    if (ch === undefined) {
      return 'eof';
    }

    var code = ch.charCodeAt(0);

    switch (code) {
      case 0x5B: // [
      case 0x5D: // ]
      case 0x2E: // .
      case 0x22: // "
      case 0x27: // '
      case 0x30:
        // 0
        return ch;

      case 0x5F: // _
      case 0x24:
        // $
        return 'ident';

      case 0x20: // Space
      case 0x09: // Tab
      case 0x0A: // Newline
      case 0x0D: // Return
      case 0xA0: // No-break space
      case 0xFEFF: // Byte Order Mark
      case 0x2028: // Line Separator
      case 0x2029:
        // Paragraph Separator
        return 'ws';
    }

    // a-z, A-Z
    if (code >= 0x61 && code <= 0x7A || code >= 0x41 && code <= 0x5A) {
      return 'ident';
    }

    // 1-9
    if (code >= 0x31 && code <= 0x39) {
      return 'number';
    }

    return 'else';
  }

  /**
   * Format a subPath, return its plain form if it is
   * a literal string or number. Otherwise prepend the
   * dynamic indicator (*).
   *
   * @param {String} path
   * @return {String}
   */

  function formatSubPath(path) {
    var _exports$Vue$util = exports$2.Vue.util;
    var isLiteral = _exports$Vue$util.isLiteral;
    var stripQuotes = _exports$Vue$util.stripQuotes;


    var trimmed = path.trim();
    // invalid leading 0
    if (path.charAt(0) === '0' && isNaN(path)) {
      return false;
    }

    return isLiteral(trimmed) ? stripQuotes(trimmed) : '*' + trimmed;
  }

  /**
   * Parse a string path into an array of segments
   *
   * @param {String} path
   * @return {Array|undefined}
   */

  function parse(path) {
    var keys = [];
    var index = -1;
    var mode = BEFORE_PATH;
    var subPathDepth = 0;
    var c = void 0,
        newChar = void 0,
        key = void 0,
        type = void 0,
        transition = void 0,
        action = void 0,
        typeMap = void 0;

    var actions = [];

    actions[PUSH] = function () {
      if (key !== undefined) {
        keys.push(key);
        key = undefined;
      }
    };

    actions[APPEND] = function () {
      if (key === undefined) {
        key = newChar;
      } else {
        key += newChar;
      }
    };

    actions[INC_SUB_PATH_DEPTH] = function () {
      actions[APPEND]();
      subPathDepth++;
    };

    actions[PUSH_SUB_PATH] = function () {
      if (subPathDepth > 0) {
        subPathDepth--;
        mode = IN_SUB_PATH;
        actions[APPEND]();
      } else {
        subPathDepth = 0;
        key = formatSubPath(key);
        if (key === false) {
          return false;
        } else {
          actions[PUSH]();
        }
      }
    };

    function maybeUnescapeQuote() {
      var nextChar = path[index + 1];
      if (mode === IN_SINGLE_QUOTE && nextChar === "'" || mode === IN_DOUBLE_QUOTE && nextChar === '"') {
        index++;
        newChar = '\\' + nextChar;
        actions[APPEND]();
        return true;
      }
    }

    while (mode != null) {
      index++;
      c = path[index];

      if (c === '\\' && maybeUnescapeQuote()) {
        continue;
      }

      type = getPathCharType(c);
      typeMap = pathStateMachine[mode];
      transition = typeMap[type] || typeMap['else'] || ERROR;

      if (transition === ERROR) {
        return; // parse error
      }

      mode = transition[0];
      action = actions[transition[1]];
      if (action) {
        newChar = transition[2];
        newChar = newChar === undefined ? c : newChar;
        if (action() === false) {
          return;
        }
      }

      if (mode === AFTER_PATH) {
        keys.raw = path;
        return keys;
      }
    }
  }

  /**
   * External parse that check for a cache hit first
   *
   * @param {String} path
   * @return {Array|undefined}
   */

  function parsePath(path) {
    var hit = pathCache[path];
    if (!hit) {
      hit = parse(path);
      if (hit) {
        pathCache[path] = hit;
      }
    }
    return hit;
  }

  /**
   * Get value from path string
   *
   * @param {Object} obj
   * @param {String} path
   * @return value
   */

  function getValue(obj, path) {
    var isObject = exports$2.Vue.util.isObject;


    if (!isObject(obj)) {
      return null;
    }

    var paths = parsePath(path);
    if (empty(paths)) {
      return null;
    }

    var length = paths.length;
    var ret = null;
    var last = obj;
    var i = 0;
    while (i < length) {
      var value = last[paths[i]];
      if (value === undefined) {
        last = null;
        break;
      }
      last = value;
      i++;
    }

    ret = last;
    return ret;
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

  var RE_NARGS = /(%|)\{([0-9a-zA-Z_]+)\}/g;

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
    var isObject = Vue.util.isObject;


    function parseArgs() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var lang = Vue.config.lang;
      if (args.length === 1) {
        if (isObject(args[0]) || Array.isArray(args[0])) {
          args = args[0];
        } else if (typeof args[0] === 'string') {
          lang = args[0];
        }
      } else if (args.length === 2) {
        if (typeof args[0] === 'string') {
          lang = args[0];
        }
        if (isObject(args[1]) || Array.isArray(args[1])) {
          args = args[1];
        }
      }

      return { lang: lang, params: args };
    }

    function translate(locale, key, args) {
      if (!locale) {
        return null;
      }

      var val = getValue(locale, key) || locale[key];
      if (!val) {
        return null;
      }

      return args ? format(val, args) : val;
    }

    function warnDefault(key) {
      if ('development' !== 'production') {
        warn('Cannot translate the value of keypath "' + key + '". ' + 'Use the value of keypath as default');
      }
      return key;
    }

    /**
     * Vue.t
     *
     * @param {String} key
     * @param {Array} ...args
     * @return {String}
     */

    Vue.t = function (key) {
      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      if (!key) {
        return '';
      }

      var _parseArgs = parseArgs.apply(undefined, args);

      var lang = _parseArgs.lang;
      var params = _parseArgs.params;

      return translate(Vue.locale(lang), key, params) || warnDefault(key);
    };

    /**
     * $t
     *
     * @param {String} key
     * @param {Array} ...args
     * @return {String}
     */

    Vue.prototype.$t = function (key) {
      if (!key) {
        return '';
      }

      for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }

      var _parseArgs2 = parseArgs.apply(undefined, args);

      var lang = _parseArgs2.lang;
      var params = _parseArgs2.params;

      return translate(this.$options.locales && this.$options.locales[lang], key, params) || translate(Vue.locale(lang), key, params) || warnDefault(key);
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

    var version = Vue.version && Number(Vue.version.split('.')[0]) || -1;

    if ('development' !== 'production' && plugin.installed) {
      warn('already installed.');
      return;
    }

    if ('development' !== 'production' && version < 1) {
      warn('vue-i18n (' + plugin.version + ') need to use vue version 1.0 or later (vue version: ' + Vue.version + ').');
      return;
    }

    var lang = 'en';

    exports$2.Vue = exports$1.Vue = Vue;
    setupLangVM(Vue, lang);

    Asset(Vue);

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

  plugin.version = '4.1.0';

  if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin);
  }

  return plugin;

}));