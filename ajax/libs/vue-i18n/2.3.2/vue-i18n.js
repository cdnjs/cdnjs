/*!
 * vue-i18n v2.3.2
 * (c) 2015 kazuya kawaguchi
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  global.VueI18n = factory();
}(this, function () { 'use strict';

  var babelHelpers = {};

  babelHelpers.typeof = function (obj) {
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
  };

  babelHelpers;
  /**
   *  String format template
   *  - Inspired:  
   *    https://github.com/Matt-Esch/string-template/index.js
   */

  var RE_NARGS = /\{([0-9a-zA-Z]+)\}/g;

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

    return string.replace(RE_NARGS, function (match, i, index) {
      var result = undefined;

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

  /**
   * extend
   * 
   * @param {Vue} Vue
   * @param {Object} locales
   * @return {Vue}
   */

  function extend (Vue, locales) {
    var getPath = Vue.version && compare('1.0.8', Vue.version) === -1 ? Vue.parsers.path.getPath : Vue.parsers.path.get;
    var util = Vue.util;

    function getVal(key, lang, args) {
      var value = key;
      try {
        var val = getPath(locales[lang], key) || locales[lang][key];
        value = (args ? format(val, args) : val) || key;
      } catch (e) {
        value = key;
      }
      return value;
    }

    /**
     * $t
     *
     * @param {String} key
     * @param {Array} ...args
     * @return {String}
     */

    Vue.prototype.$t = function (key) {
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

    return Vue;
  }

  /**
   * plugin
   *
   * @param {Object} Vue
   * @param {Object} opts
   */

  function plugin(Vue) {
    var opts = arguments.length <= 1 || arguments[1] === undefined ? { lang: 'en', locales: {} } : arguments[1];

    defineConfig(Vue.config, opts.lang);
    extend(Vue, opts.locales);
  }

  /**
   * defineConfig
   *
   * This function define `lang` property to `Vue.config`.
   *
   * @param {Object} config
   * @param {String} lang
   * @private
   */

  function defineConfig(config, lang) {
    Object.defineProperty(config, 'lang', {
      get: function get() {
        return lang;
      },
      set: function set(val) {
        lang = val;
      }
    });
  }

  plugin.version = '2.3.2';

  return plugin;

}));