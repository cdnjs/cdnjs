/*
Copyright 2014, modulex@1.7.4
MIT Licensed
build time: Thu, 04 Dec 2014 20:34:09 GMT
*/
/**
 * A module registration and load library.
 *
 * you can use
 *
 *     modulex.use('overlay,node', function(Overlay, Node){
 *     });
 *
 * to load modules. and use
 *
 *     modulex.add(function(require, module, exports){
 *     });
 *
 * to register modules.
 */
/* exported modulex */
/* jshint -W079 */
var modulex = (function (undefined) {
  // Console-polyfill. MIT license.
// https://github.com/paulmillr/console-polyfill
// Make it safe to do console.log() always.
  (function (con) {
    'use strict';
    var prop, method;
    var empty = {};
    var dummy = function () {
    };
    var properties = 'memory'.split(',');
    var methods = ('assert,clear,count,debug,dir,dirxml,error,exception,group,' +
    'groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd,' +
    'show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn').split(',');
    while ((prop = properties.pop())) {
      con[prop] = con[prop] || empty;
    }
    while ((method = methods.pop())) {
      con[method] = con[method] || dummy;
    }
  })(this.console = this.console || {}); // Using `this` for web workers.

  var mx = {
    /**
     * The build time of the library.
     * NOTICE: 'Thu, 04 Dec 2014 20:34:10 GMT' will replace with current timestamp when compressing.
     * @private
     * @type {String}
     */
    __BUILD_TIME: 'Thu, 04 Dec 2014 20:34:10 GMT',

    /**
     * modulex Environment.
     * @type {Object}
     */
    Env: {
      host: this,
      mods: {}
    },

    /**
     * modulex Config.
     * If load modulex.js, Config.debug defaults to true.
     * Else If load modulex-min.js, Config.debug defaults to false.
     * @private
     * @property {Object} Config
     * @property {Boolean} Config.debug
     * @member modulex
     */
    Config: {
      debug: '@DEBUG@',
      packages: {},
      fns: {}
    },

    /**
     * The version of the library.
     * NOTICE: '1.7.4' will replace with current version when compressing.
     * @type {String}
     */
    version: '1.7.4',

    /**
     * set modulex configuration
     * @param {Object|String} configName Config object or config key.
     * @param {String} configName.base modulex 's base path. Default: get from loader(-min).js or seed(-min).js
     * @param {String} configName.tag modulex 's timestamp for native module. Default: modulex 's build time.
     * @param {Boolean} configName.debug whether to enable debug mod.
     * @param {Boolean} configName.combine whether to enable combo.
     * @param {Object} configName.packages Packages definition with package name as the key.
     * @param {String} configName.packages.base Package base path.
     * @param {String} configName.packages.tag  Timestamp for this package's module file.
     * @param {String} configName.packages.debug Whether force debug mode for current package.
     * @param {String} configName.packages.combine Whether allow combine for current package modules.
     * can only be used in production mode.
     * @param [configValue] config value.
     *
     * for example:
     *     @example
     *     modulex.config({
         *      combine: true,
         *      base: '.',
         *      packages: {
         *          'gallery': {
         *              base: 'http://a.tbcdn.cn/s/modulex/gallery/'
         *          }
         *      },
         *      modules: {
         *          'gallery/x/y': {
         *              requires: ['gallery/x/z']
         *          }
         *      }
         *     });
     */
    config: function (configName, configValue) {
      var cfg, r, fn;
      var Config = mx.Config;
      var configFns = Config.fns;
      var self = this;
      if (typeof configName === 'string') {
        cfg = configFns[configName];
        if (configValue === undefined) {
          if (cfg) {
            r = cfg.call(self);
          } else {
            r = Config[configName];
          }
        } else {
          if (cfg) {
            r = cfg.call(self, configValue);
          } else {
            Config[configName] = configValue;
          }
        }
      } else {
        for (var p in configName) {
          configValue = configName[p];
          fn = configFns[p];
          if (fn) {
            fn.call(self, configValue);
          } else {
            Config[p] = configValue;
          }
        }
      }
      return r;
    }
  };

  var Loader = mx.Loader = {};

  /**
   * Loader Status Enum
   * @enum {Number} modulex.Loader.Status
   */
  Loader.Status = {
    /** error */
    ERROR: -1,
    /** unloaded */
    UNLOADED: 0,
    /** loading */
    LOADING: 1,
    /** loaded */
    LOADED: 2,
    /** initializing */
    INITIALIZING: 3,
    /** initialized */
    INITIALIZED: 4
  };

  return mx;
})();
/**
 * Utils for modulex loader
 * @author yiminghe@gmail.com
 */
(function (mx) {
  var Loader = mx.Loader;
  var Env = mx.Env;
  var Status = Loader.Status;
  var mods = Env.mods;
  var map = Array.prototype.map;
  var host = Env.host;
  /**
   * @class modulex.Loader.Utils
   * Utils for modulex Loader
   * @singleton
   * @private
   */
  var Utils = Loader.Utils = {};
  var doc = host.document;

  var URI_SPLIT_REG = new RegExp(
    '^' +
      /*
       Scheme names consist of a sequence of characters beginning with a
       letter and followed by any combination of letters, digits, plus
       ('+'), period ('.'), or hyphen ('-').
       */
    '([\\w\\d+.-]+:)?' + // protocol

    '(?://' +
      /*
       The authority component is preceded by a double slash ('//') and is
       terminated by the next slash ('/'), question mark ('?'), or number
       sign ('#') character, or by the end of the URI.
       */
    '(?:([^/?#@]*)@)?' + // auth

    '(' +
    '[\\w\\d\\-\\u0100-\\uffff.+%]*' +
    '|' +
      // ipv6
    '\\[[^\\]]+\\]' +
    ')' + // hostname - restrict to letters,
      // digits, dashes, dots, percent
      // escapes, and unicode characters.
    '(?::([0-9]+))?' + // port
    ')?' +
      /*
       The path is terminated
       by the first question mark ('?') or number sign ('#') character, or
       by the end of the URI.
       */
    '([^?#]+)?' + // pathname. hierarchical part
      /*
       The query component is indicated by the first question
       mark ('?') character and terminated by a number sign ('#') character
       or by the end of the URI.
       */
    '(\\?[^#]*)?' + // search. non-hierarchical data
      /*
       The hash identifier component of a URI allows indirect
       identification of a secondary resource by reference to a primary
       resource and additional identifying information.
       A
       hash identifier component is indicated by the presence of a
       number sign ('#') character and terminated by the end of the URI.
       */
    '(#.*)?' + // hash
    '$');

  var REG_INFO = {
    protocol: 1,
    auth: 2,
    hostname: 3,
    port: 4,
    pathname: 5,
    search: 6,
    hash: 7
  };

  function parseUrl(str) {
    var m = str.match(URI_SPLIT_REG) || [];
    var ret = {};

    // old ie 7:  return "" for unmatched regexp ...
    for (var part in REG_INFO) {
      ret[part] = m[REG_INFO[part]];
    }

    if (ret.hostname) {
      ret.hostname = ret.hostname.toLowerCase();
    }

    // mailto: yiminghe@gmail.com
    // http://www.g.cn
    // pathname => /
    if (ret.hostname && !ret.pathname) {
      ret.pathname = '/';
    }

    ret.host = ret.hostname;
    if (ret.port) {
      ret.host = ret.hostname + ':' + ret.port;
    }

    return ret;
  }

  function numberify(s) {
    var c = 0;
    // convert '1.2.3.4' to 1.234
    return parseFloat(s.replace(/\./g, function () {
      return (c++ === 0) ? '.' : '';
    }));
  }

  function splitSlash(str) {
    var parts = str.split(/\//);
    if (str.charAt(0) === '/' && parts[0]) {
      parts.unshift('');
    }
    if (str.charAt(str.length - 1) === '/' && str.length > 1 && parts[parts.length - 1]) {
      parts.push('');
    }
    return parts;
  }

  var m, v;
  var ua = (host.navigator || {}).userAgent || '';

  // https://github.com/kissyteam/kissy/issues/545
  // AppleWebKit/535.19
  // AppleWebKit534.30
  // appleWebKit/534.30
  // ApplelWebkit/534.30 （SAMSUNG-GT-S6818）
  // AndroidWebkit/534.30
  if (((m = ua.match(/Web[Kk]it[\/]{0,1}([\d.]*)/)) || (m = ua.match(/Safari[\/]{0,1}([\d.]*)/))) && m[1]) {
    Utils.webkit = numberify(m[1]);
  }
  if ((m = ua.match(/Trident\/([\d.]*)/))) {
    Utils.trident = numberify(m[1]);
  }
  if ((m = ua.match(/Gecko/))) {
    Utils.gecko = 0.1; // Gecko detected, look for revision
    if ((m = ua.match(/rv:([\d.]*)/)) && m[1]) {
      Utils.gecko = numberify(m[1]);
    }
  }
  if ((m = ua.match(/MSIE ([^;]*)|Trident.*; rv(?:\s|:)?([0-9.]+)/)) &&
    (v = (m[1] || m[2]))) {
    Utils.ie = numberify(v);
    Utils.ieMode = doc.documentMode || Utils.ie;
    Utils.trident = Utils.trident || 1;
  }

  var uriReg = /http(s)?:\/\/([^/]+)(?::(\d+))?/;
  var commentRegExp = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg;
  var requireRegExp = /[^.'"]\s*require\s*\((['"])([^)]+)\1\)/g;

  function normalizeId(id) {
    if (id.charAt(0) === '/') {
      id = location.protocol + '//' + location.host + id;
    }
    // 'x/' 'x/y/z/'
    if (id.charAt(id.length - 1) === '/') {
      id += 'index';
    }
    // x.js === x
    if (Utils.endsWith(id, '.js')) {
      id = id.slice(0, -3);
    }
    return id;
  }

  function each(obj, fn) {
    var i = 0;
    var myKeys, l;
    if (isArray(obj)) {
      l = obj.length;
      for (; i < l; i++) {
        if (fn(obj[i], i, obj) === false) {
          break;
        }
      }
    } else {
      myKeys = keys(obj);
      l = myKeys.length;
      for (; i < l; i++) {
        if (fn(obj[myKeys[i]], myKeys[i], obj) === false) {
          break;
        }
      }
    }
  }

  function keys(obj) {
    var ret = [];
    for (var key in obj) {
      ret.push(key);
    }
    return ret;
  }

  var isArray = Array.isArray || function (obj) {
      return Object.prototype.toString.call(obj) === '[object Array]';
    };

  function mix(to, from) {
    for (var i in from) {
      to[i] = from[i];
    }
    return to;
  }

  mix(Utils, {
    mix: mix,

    getSuffix: function (str) {
      var m = str.match(/\.(\w+)$/);
      if (m) {
        return m[1];
      }
    },

    noop: function () {
    },

    map: map ?
      function (arr, fn, context) {
        return map.call(arr, fn, context || this);
      } :
      function (arr, fn, context) {
        var len = arr.length;
        var res = new Array(len);
        for (var i = 0; i < len; i++) {
          var el = typeof arr === 'string' ? arr.charAt(i) : arr[i];
          if (el ||
              //ie<9 in invalid when typeof arr == string
            i in arr) {
            res[i] = fn.call(context || this, el, i, arr);
          }
        }
        return res;
      },

    startsWith: function (str, prefix) {
      return str.lastIndexOf(prefix, 0) === 0;
    },

    isEmptyObject: function (o) {
      for (var p in o) {
        if (p !== undefined) {
          return false;
        }
      }
      return true;
    },

    endsWith: function (str, suffix) {
      var ind = str.length - suffix.length;
      return ind >= 0 && str.indexOf(suffix, ind) === ind;
    },

    now: Date.now || function () {
      return +new Date();
    },

    collectErrors: function (mods, errorList, cache) {
      var i, m, mod, modStatus;
      cache = cache || {};
      errorList = errorList || [];
      for (i = 0; i < mods.length; i++) {
        mod = mods[i];
        m = mod.id;
        if (cache[m]) {
          continue;
        }
        cache[m] = 1;
        modStatus = mod.status;
        if (modStatus === Status.ERROR) {
          errorList.push(mod);
          continue;
        }
        Utils.collectErrors(mod.getNormalizedRequiredModules(), errorList, cache);
      }
      return errorList;
    },

    each: each,

    keys: keys,

    isArray: isArray,

    indexOf: function (item, arr) {
      for (var i = 0, l = arr.length; i < l; i++) {
        if (arr[i] === item) {
          return i;
        }
      }
      return -1;
    },

    normalizeSlash: function (str) {
      return str.replace(/\\/g, '/');
    },

    startsWithProtocol: function (str) {
      return Utils.startsWith(str, 'http:') || Utils.startsWith(str, 'https:') || Utils.startsWith(str, 'file:');
    },

    normalizePath: function (parentPath, subPath) {
      var firstChar = subPath.charAt(0);
      if (firstChar !== '.') {
        return subPath;
      }
      var prefix = '';
      if (Utils.startsWithProtocol(parentPath)) {
        var url = parseUrl(parentPath);
        prefix = url.protocol + '//' + url.host;
        parentPath = url.pathname;
      }
      var parts = splitSlash(parentPath);
      var subParts = splitSlash(subPath);
      parts.pop();
      for (var i = 0, l = subParts.length; i < l; i++) {
        var subPart = subParts[i];
        if (subPart === '.') {
        } else if (subPart === '..') {
          parts.pop();
        } else {
          parts.push(subPart);
        }
      }
      return prefix + parts.join('/').replace(/\/+/, '/');
    },

    isSameOriginAs: function (uri1, uri2) {
      var uriParts1 = uri1.match(uriReg);
      var uriParts2 = uri2.match(uriReg);
      return uriParts1[0] === uriParts2[0];
    },

    // get document head
    docHead: function () {
      return doc.getElementsByTagName('head')[0] || doc.documentElement;
    },

    // Returns hash code of a string djb2 algorithm
    getHash: function (str) {
      var hash = 5381;
      var i;
      for (i = str.length; --i > -1;) {
        hash = ((hash << 5) + hash) + str.charCodeAt(i);
        /* hash * 33 + char */
      }
      return hash + '';
    },

    getRequiresFromFn: function (fn) {
      var requires = [];
      // Remove comments from the callback string,
      // look for require calls, and pull them into the dependencies,
      // but only if there are function args.
      fn.toString()
        .replace(commentRegExp, '')
        .replace(requireRegExp, function (match, _, dep) {
          requires.push(dep);
        });
      return requires;
    },

    // get a module from cache or create a module instance
    createModule: function (id, cfg) {
      id = normalizeId(id);
      var module = mods[id];
      if (!module) {
        module = mods[id];
      }
      if (module) {
        if (cfg) {
          module.reset(cfg);
        }
        return module;
      }
      mods[id] = module = new Loader.Module(mix({
        id: id
      }, cfg));

      return module;
    },

    createModules: function (ids) {
      return Utils.map(ids, function (id) {
        return Utils.createModule(id);
      });
    },

    initModules: function (modsToInit) {
      var l = modsToInit.length;
      var i;
      var success = 1;
      for (i = 0; i < l; i++) {
        success &= modsToInit[i].initRecursive();
      }
      return success;
    },

    getModulesExports: function (mods) {
      var l = mods.length;
      var ret = [];
      for (var i = 0; i < l; i++) {
        ret.push(mods[i].getExports());
      }
      return ret;
    },

    addModule: function (id, factory, config) {
      var module = mods[id];
      if (module && module.factory !== undefined) {
        console.warn(id + ' is defined more than once');
        return;
      }
      Utils.createModule(id, mix({
        id: id,
        status: Loader.Status.LOADED,
        factory: factory
      }, config));
    }
  });
})(modulex);
/**
 * @ignore
 * setup data structure for modulex loader
 * @author yiminghe@gmail.com
 */
(function (mx, undefined) {
  var Loader = mx.Loader;
  var Config = mx.Config;
  var Status = Loader.Status;
  var INITIALIZED = Status.INITIALIZED;
  var INITIALIZING = Status.INITIALIZING;
  var ERROR = Status.ERROR;
  var Utils = Loader.Utils;
  var startsWith = Utils.startsWith;
  var createModule = Utils.createModule;
  var mix = Utils.mix;

  function checkGlobalIfNotExist(self, property) {
    return self[property] !== undefined ? self[property] : Config[property];
  }

  /**
   * @class modulex.Loader.Package
   * @private
   */
  function Package(cfg) {
    var self = this;
    /**
     * name of package
     */
    self.name = undefined;
    /**
     * package base of package
     */
    self.base = undefined;
    /**
     * package entry module
     */
    self.main = undefined;
    /**
     * filter for package's modules
     */
    self.filter = undefined;
    /**
     * tag for package's modules
     */
    self.tag = undefined;
    /**
     * charset for package's modules
     */
    self.charset = undefined;
    /**
     * whether combine package's modules
     */
    self.combine = undefined;
    /**
     * combine modules in packages within the same group if combine is true
     */
    self.group = undefined;
    mix(self, cfg);
  }

  Package.prototype = {
    constructor: Package,

    reset: function (cfg) {
      mix(this, cfg);
    },

    getFilter: function () {
      return checkGlobalIfNotExist(this, 'filter');
    },

    /**
     * Tag for package.
     * tag can not contain ".", eg: Math.random() !
     * @return {String}
     */
    getTag: function () {
      return checkGlobalIfNotExist(this, 'tag');
    },

    /**
     * get package uri
     */
    getBase: function () {
      return this.base;
    },

    /**
     * Get charset for package.
     * @return {String}
     */
    getCharset: function () {
      return checkGlobalIfNotExist(this, 'charset');
    },

    /**
     * Whether modules are combined for this package.
     * @return {Boolean}
     */
    isCombine: function () {
      return checkGlobalIfNotExist(this, 'combine');
    },

    /**
     * Get package group (for combo).
     * @returns {String}
     */
    getGroup: function () {
      return checkGlobalIfNotExist(this, 'group');
    }
  };

  Loader.Package = Package;

  function async(self, mods, callback) {
    for (var i = 0; i < mods.length; i++) {
      mods[i] = self.resolve(mods[i]).id;
    }
    mx.use(mods, callback);
  }

  /**
   * @class modulex.Loader.Module
   */
  function Module(cfg) {
    var self = this;
    /**
     * exports of this module
     */
    self.exports = undefined;

    // es6 compatible
    self.module = self;

    /**
     * status of current modules
     */
    self.status = Status.UNLOADED;

    /**
     * name of this module
     */
    self.id = undefined;

    /**
     * factory of this module
     */
    self.factory = undefined;

    /**
     * user config
     *
     *  modulex.config('modules',{
         *      x: {
         *          y:1
         *      }
         *  })
     *
     *  x.js:
     *
     *  modulex.add(function(require, exports, module){
         *      console.log(module.config().y);
         *  });
     */
    self.config = undefined;

    // lazy initialize and commonjs module format
    self.cjs = 1;

    mix(self, cfg);

    self.waits = {};

    var require = self._require = function (id, callback) {
      if (typeof id === 'string') {
        var requiresModule = self.resolve(id);
        Utils.initModules(requiresModule.getNormalizedModules());
        return requiresModule.getExports();
      } else {
        async(self, id, callback);
      }
    };

    require.toUrl = function (relativeUrl) {
      var url = self.getUri();
      var prefix = '';
      var suffix = url;
      var index = url.indexOf('//');
      if (index !== -1) {
        prefix = url.slice(0, index + 2);
        suffix = url.slice(index + 2);
      }
      return prefix + Utils.normalizePath(suffix, relativeUrl);
    };

    require.load = mx.getScript;
  }

  Module.prototype = {
    modulex: 1,

    constructor: Module,

    config: function () {
      return this.config;
    },

    reset: function (cfg) {
      var self = this;
      mix(self, cfg);
      // module definition changes requires
      if (cfg.requires) {
        self.setRequiresModules(cfg.requires);
      }
    },

    require: function (id) {
      return this.resolve(id).getExports();
    },

    resolve: function (relativeId) {
      return createModule(Utils.normalizePath(this.id, relativeId));
    },

    add: function (loader) {
      this.waits[loader.id] = loader;
    },

    remove: function (loader) {
      delete this.waits[loader.id];
    },

    contains: function (loader) {
      return this.waits[loader.id];
    },

    flush: function () {
      Utils.each(this.waits, function (loader) {
        loader.flush();
      });
      this.waits = {};
    },

    /**
     * Get the type if current Module
     * @return {String} css or js
     */
    getType: function () {
      var self = this;
      var v = self.type;
      if (!v) {
        var id = self.id;
        if (Utils.endsWith(id, '.css')) {
          v = 'css';
        } else {
          v = 'js';
        }
        self.type = v;
      }
      return v;
    },

    getAlias: function () {
      var self = this;
      var id = self.id;
      if (self.normalizedAlias) {
        return self.normalizedAlias;
      }
      var alias = getShallowAlias(self);
      var ret = [];
      // implies no alias or else circular alias ...
      if (alias[0] === id) {
        ret = alias;
      } else {
        for (var i = 0, l = alias.length; i < l; i++) {
          var aliasItem = alias[i];
          if (aliasItem && aliasItem !== id) {
            var mod = createModule(aliasItem);
            var normalAlias = mod.getAlias();
            if (normalAlias) {
              ret.push.apply(ret, normalAlias);
            } else {
              ret.push(aliasItem);
            }
          }
        }
      }
      self.normalizedAlias = ret;
      return ret;
    },

    getNormalizedModules: function () {
      var self = this;
      if (self.normalizedModules) {
        return self.normalizedModules;
      }
      self.normalizedModules = Utils.map(self.getAlias(), function (alias) {
        return createModule(alias);
      });
      return self.normalizedModules;
    },

    /**
     * Get the path uri of current module if load dynamically
     * @return {String}
     */
    getUri: function () {
      var self = this;
      // es6: this.module.url
      if (!self.uri) {
        self.uri = Utils.normalizeSlash(mx.Config.resolveModFn(self));
      }
      return self.uri;
    },

    getUrl: function () {
      return this.getUri();
    },

    getExports: function () {
      var normalizedModules = this.getNormalizedModules();
      return normalizedModules[0] && normalizedModules[0].exports;
    },

    /**
     * Get the package which current module belongs to.
     * @return {modulex.Loader.Package}
     */
    getPackage: function () {
      var self = this;
      if (self.packageInfo === undefined) {
        var id = self.id;
        // absolute path does not belong to any package
        var packages = Config.packages;
        var modIdSlash = self.id + '/';
        var pName = '';
        var p;
        for (p in packages) {
          var pWithSlash = p;
          if (!Utils.endsWith(pWithSlash, '/')) {
            pWithSlash += '/';
          }
          if (startsWith(modIdSlash, pWithSlash) && p.length > pName.length) {
            pName = p;
          }
        }
        if (!packages[pName]) {
          if (startsWith(id, '/') ||
            startsWith(id, 'http://') ||
            startsWith(id, 'https://') ||
            startsWith(id, 'file://')) {
            self.packageInfo = null;
            return self.packageInfo;
          }
        }
        self.packageInfo = packages[pName] || packages.core;
      }
      return self.packageInfo;
    },

    /**
     * Get the tag of current module.
     * tag can not contain ".", eg: Math.random() !
     * @return {String}
     */
    getTag: function () {
      var self = this;
      return self.tag || self.getPackage() && self.getPackage().getTag();
    },

    /**
     * Get the charset of current module
     * @return {String}
     */
    getCharset: function () {
      var self = this;
      return self.charset || self.getPackage() && self.getPackage().getCharset();
    },

    setRequiresModules: function (requires) {
      var self = this;
      var requiredModules = self.requiredModules = Utils.map(normalizeRequires(requires, self), function (m) {
        return createModule(m);
      });
      var normalizedRequiredModules = [];
      Utils.each(requiredModules, function (mod) {
        normalizedRequiredModules.push.apply(normalizedRequiredModules, mod.getNormalizedModules());
      });
      self.normalizedRequiredModules = normalizedRequiredModules;
    },

    getNormalizedRequiredModules: function () {
      var self = this;
      if (self.normalizedRequiredModules) {
        return self.normalizedRequiredModules;
      }
      self.setRequiresModules(self.requires);
      return self.normalizedRequiredModules;
    },

    getRequiredModules: function () {
      var self = this;
      if (self.requiredModules) {
        return self.requiredModules;
      }
      self.setRequiresModules(self.requires);
      return self.requiredModules;
    },

    callFactory: function () {
      var self = this;
      return self.factory.apply(self,
        (
          self.cjs ?
            [self._require, self.exports, self] :
            Utils.map(self.getRequiredModules(), function (m) {
              return m.getExports();
            })
        )
      );
    },

    initSelf: function () {
      var self = this;
      var factory = self.factory;
      var exports;
      if (typeof factory === 'function') {
        self.exports = {};

        if (Config.debug) {
          exports = self.callFactory();
        } else {
          try {
            exports = self.callFactory();
          } catch (e) {
            self.status = ERROR;
            if (self.onError || Config.onModuleError) {
              var error = {
                type: 'init',
                exception: e,
                module: self
              };
              self.error = error;
              if (self.onError) {
                self.onError(error);
              }
              if (Config.onModuleError) {
                Config.onModuleError(error);
              }
            } else {
              setTimeout(function () {
                throw e;
              }, 0);
            }
            return 0;
          }
          var success = 1;
          Utils.each(self.getNormalizedRequiredModules(), function (m) {
            if (m.status === ERROR) {
              success = 0;
              return false;
            }
          });
          if (!success) {
            return 0;
          }
        }

        if (exports !== undefined) {
          self.exports = exports;
        }
      } else {
        self.exports = factory;
      }
      self.status = INITIALIZED;
      if (self.afterInit) {
        self.afterInit(self);
      }
      if (Config.afterModuleInit) {
        Config.afterModuleInit(self);
      }
      return 1;
    },

    initRecursive: function () {
      var self = this;
      var success = 1;
      var status = self.status;
      if (status === ERROR) {
        return 0;
      }
      // initialized or circular dependency
      if (status >= INITIALIZING) {
        return success;
      }
      self.status = INITIALIZING;
      if (self.cjs) {
        // commonjs format will call require in module code again
        success = self.initSelf();
      } else {
        Utils.each(self.getNormalizedRequiredModules(), function (m) {
          success = success && m.initRecursive();
        });
        if (success) {
          self.initSelf();
        }
      }
      return success;
    },

    undef: function () {
      this.status = Status.UNLOADED;
      this.error = null;
      this.factory = null;
      this.exports = null;
    }
  };

  function pluginAlias(id) {
    var index = id.indexOf('!');
    if (index !== -1) {
      var pluginId = id.substring(0, index);
      id = id.substring(index + 1);
      var pluginMod = createModule(pluginId);
      pluginMod.initRecursive();
      var Plugin = pluginMod.getExports() || {};
      if (Plugin.alias) {
        id = Plugin.alias(mx, id, pluginId);
      }
    }
    return id;
  }

  function normalizeRequires(requires, self) {
    requires = requires || [];
    var l = requires.length;
    for (var i = 0; i < l; i++) {
      requires[i] = self.resolve(requires[i]).id;
    }
    return requires;
  }

  function getShallowAlias(mod) {
    var id = mod.id;
    var packageInfo;
    var alias = mod.alias;
    if (typeof alias === 'string') {
      mod.alias = alias = [alias];
    }
    if (alias) {
      return alias;
    }
    packageInfo = mod.getPackage();

    if (packageInfo) {
      var main;
      // support main in package config
      if (packageInfo.name === id && (main = packageInfo.main)) {
        id += '/';
        if (main.charAt(0) !== '.') {
          main = './' + main;
        }
        alias = [Utils.normalizePath(id, main)];
      } else if (packageInfo.alias) {
        alias = packageInfo.alias(id);
      }
    }
    alias = mod.alias = alias || [
      pluginAlias(id)
    ];
    return alias;
  }

  Loader.Module = Module;
})(modulex);
/**
 * refer:
 * - es6 module: http://www.2ality.com/2014/09/es6-modules-final.html
 */

/**
 * @ignore
 * script/css load across browser
 * @author yiminghe@gmail.com
 */
(function (mx) {
  var CSS_POLL_INTERVAL = 30;
  var Utils = mx.Loader.Utils;
  // central poll for link node
  var timer = 0;
  // node.id:{callback:callback,node:node}
  var monitors = {};

  function startCssTimer() {
    if (!timer) {
      cssPoll();
    }
  }

  function isCssLoaded(node) {
    var loaded = 0;
    if (Utils.webkit) {
      // http://www.w3.org/TR/Dom-Level-2-Style/stylesheets.html
      if (node.sheet) {
        loaded = 1;
      }
    } else if (node.sheet) {
      try {
        var cssRules = node.sheet.cssRules;
        if (cssRules) {
          loaded = 1;
        }
      } catch (ex) {
        var exName = ex.name;
        // http://www.w3.org/TR/dom/#dom-domexception-code
        if (// exName == 'SecurityError' ||
        // for old firefox
        exName === 'NS_ERROR_DOM_SECURITY_ERR') {
          loaded = 1;
        }
      }
    }
    return loaded;
  }

  // single thread is ok
  function cssPoll() {
    for (var uri in monitors) {
      var callbackObj = monitors[uri];
      var node = callbackObj.node;
      if (isCssLoaded(node)) {
        if (callbackObj.callback) {
          callbackObj.callback.call(node);
        }
        delete monitors[uri];
      }
    }
    if (Utils.isEmptyObject(monitors)) {
      timer = 0;
    } else {
      timer = setTimeout(cssPoll, CSS_POLL_INTERVAL);
    }
  }

  // refer : http://lifesinger.org/lab/2011/load-js-css/css-preload.html
  // 暂时不考虑如何判断失败，如 404 等
  Utils.pollCss = function (node, callback) {
    var href = node.href;
    var arr = monitors[href] = {};
    arr.node = node;
    arr.callback = callback;
    startCssTimer();
  };

  Utils.isCssLoaded = isCssLoaded;
})(modulex);
/*
 References:
 - http://unixpapa.com/js/dyna.html
 - http://www.blaze.io/technical/ies-premature-execution-problem/

 `onload` event is supported in WebKit since 535.23
 - https://bugs.webkit.org/show_activity.cgi?id=38995
 `onload/onerror` event is supported since Firefox 9.0
 - https://bugzilla.mozilla.org/show_bug.cgi?id=185236
 - https://developer.mozilla.org/en/HTML/Element/link#Stylesheet_load_events

 monitor css onload across browsers.issue about 404 failure.
 - firefox not ok（4 is wrong）：
 - http://yearofmoo.com/2011/03/cross-browser-stylesheet-preloading/
 - all is ok
 - http://lifesinger.org/lab/2011/load-js-css/css-preload.html
 - others
 - http://www.zachleat.com/web/load-css-dynamically/
 */
/**
 * @ignore
 * getScript support for css and js callback after load
 * @author yiminghe@gmail.com
 */
(function (mx) {
  var MILLISECONDS_OF_SECOND = 1000;
  var win = mx.Env.host;
  var doc = win.document;
  var Utils = mx.Loader.Utils;
  // solve concurrent requesting same script file
  var jsCssCallbacks = {};
  var webkit = Utils.webkit;
  var headNode;

  /**
   * Load a javascript/css file from the server using a GET HTTP request,
   * then execute it.
   *
   * for example:
   *      @example
   *      modulex.getScript(uri, success, charset);
   *      // or
   *      modulex.getScript(uri, {
     *          charset: string
     *          success: fn,
     *          error: fn,
     *          timeout: number
     *      });
   *
   * Note 404/500 status in ie<9 will trigger success callback.
   *
   * @param {String} uri resource's uri
   * @param {Function|Object} [success] success callback or config
   * @param {Function} [success.success] success callback
   * @param {Function} [success.error] error callback
   * @param {Number} [success.timeout] timeout (s)
   * @param {String} [success.charset] charset of current resource
   * @param {String} [charset] charset of current resource
   * @return {HTMLElement} script/style node
   * @member modulex
   */
  mx.getScript = function (uri, success, charset) {
    // can not use modulex.Uri, uri can not be encoded for some uri
    // eg: /??dom.js,event.js , ? , should not be encoded
    var config = success;
    var css = Utils.endsWith(uri, '.css');
    var error, timeout, attrs, callbacks, timer;
    if (typeof config === 'object') {
      success = config.success;
      error = config.error;
      timeout = config.timeout;
      charset = config.charset;
      attrs = config.attrs;
    }
    if (css && Utils.ieMode < 10) {
      if (doc.getElementsByTagName('style').length + doc.getElementsByTagName('link').length >= 31) {
        setTimeout(function () {
          throw new Error('style and link\'s number is more than 31.' +
          'ie < 10 can not insert link: ' + uri);
        }, 0);
        if (error) {
          error();
        }
        return;
      }
    }
    callbacks = jsCssCallbacks[uri] = jsCssCallbacks[uri] || [];
    callbacks.push([success, error]);
    if (callbacks.length > 1) {
      return callbacks.node;
    }
    var node = doc.createElement(css ? 'link' : 'script');
    var clearTimer = function () {
      if (timer) {
        clearTimeout(timer);
        timer = undefined;
      }
    };
    if (attrs) {
      Utils.each(attrs, function (v, n) {
        node.setAttribute(n, v);
      });
    }
    if (charset) {
      node.charset = charset;
    }
    if (css) {
      node.href = uri;
      node.rel = 'stylesheet';
      // can not set, else test fail
      // node.media = 'async';
    } else {
      node.src = uri;
      node.async = true;
    }
    callbacks.node = node;
    var end = function (error) {
      var index = error;
      var fn;
      clearTimer();
      Utils.each(jsCssCallbacks[uri], function (callback) {
        if ((fn = callback[index])) {
          fn.call(node);
        }
      });
      delete jsCssCallbacks[uri];
    };
    var useNative = 'onload' in node;
    // onload for webkit 535.23  Firefox 9.0
    // https://bugs.webkit.org/show_activity.cgi?id=38995
    // https://bugzilla.mozilla.org/show_bug.cgi?id=185236
    // https://developer.mozilla.org/en/HTML/Element/link#Stylesheet_load_events
    // phantomjs 1.7 == webkit 534.34
    var forceCssPoll = mx.Config.forceCssPoll ||
      (webkit && webkit < 536) ||
        // unknown browser defaults to css poll
        // https://github.com/kissyteam/modulex/issues/607
      (!webkit && !Utils.trident && !Utils.gecko);
    if (css && forceCssPoll && useNative) {
      useNative = false;
    }
    function onload() {
      var readyState = node.readyState;
      if (!readyState ||
        readyState === 'loaded' ||
        readyState === 'complete') {
        node.onreadystatechange = node.onload = null;
        end(0);
      }
    }

    //标准浏览器 css and all script
    if (useNative) {
      node.onload = onload;
      node.onerror = function () {
        node.onerror = null;
        end(1);
      };
    } else if (css) {
      // old chrome/firefox for css
      Utils.pollCss(node, function () {
        end(0);
      });
    } else {
      node.onreadystatechange = onload;
    }
    if (timeout) {
      timer = setTimeout(function () {
        end(1);
      }, timeout * MILLISECONDS_OF_SECOND);
    }
    if (!headNode) {
      headNode = Utils.docHead();
    }
    if (css) {
      // css order matters
      // so can not use css in head
      headNode.appendChild(node);
    } else {
      // can use js in head
      headNode.insertBefore(node, headNode.firstChild);
    }
    return node;
  };
})(modulex);
/*
 yiminghe@gmail.com refactor@2012-03-29
 - 考虑连续重复请求单个 script 的情况，内部排队

 yiminghe@gmail.com 2012-03-13
 - getScript
 - 404 in ie<9 trigger success , others trigger error
 - syntax error in all trigger success
 */
/**
 * @ignore
 * Declare config info for modulex.
 * @author yiminghe@gmail.com
 */
(function (mx, undefined) {
  var Loader = mx.Loader;
  var Package = Loader.Package;
  var Utils = Loader.Utils;
  var host = mx.Env.host;
  var Config = mx.Config;
  var location = host.location;
  var configFns = Config.fns;

  // how to load mods by path
  Config.loadModsFn = function (rs, config) {
    mx.getScript(rs.uri, config);
  };

  // how to get mod uri
  Config.resolveModFn = function (mod) {
    var id = mod.id;
    var filter, t, uri;
    // deprecated! do not use path config
    var subPath = mod.path;
    var packageInfo = mod.getPackage();
    // absolute module url
    if (!packageInfo) {
      if (!Utils.endsWith(id, '.css') && !Utils.endsWith(id, '.js')) {
        id += '.js';
      }
      return id;
    }
    var packageBase = packageInfo.getBase();
    var packageName = packageInfo.name;
    var extname = mod.getType();
    var suffix = '.' + extname;
    if (!subPath) {
      if (Utils.endsWith(id, suffix)) {
        id = id.slice(0, -suffix.length);
      }
      filter = packageInfo.getFilter() || '';
      if (typeof filter === 'function') {
        subPath = filter(id, extname);
      } else if (typeof filter === 'string') {
        if (filter) {
          filter = '-' + filter;
        }
        subPath = id + filter + suffix;
      }
    }
    // core package
    if (packageName === 'core') {
      uri = packageBase + subPath;
    } else if (id === packageName) {
      // packageName: a/y use('a/y');
      // do not use this on production, can not be combo ed with other modules from same package
      uri = packageBase.substring(0, packageBase.length - 1) + filter + suffix;
    } else {
      subPath = subPath.substring(packageName.length + 1);
      uri = packageBase + subPath;
    }

    if ((t = mod.getTag())) {
      t += suffix;
      uri += '?t=' + t;
    }
    return uri;
  };

  configFns.requires = shortcut('requires');

  configFns.alias = shortcut('alias');

  configFns.packages = function (config) {
    var packages = Config.packages;
    if (config === undefined) {
      return packages;
    }
    if (config) {
      Utils.each(config, function (cfg, key) {
        // object type
        var name = cfg.name || key;
        if (Utils.startsWith(name, '/')) {
          name = location.protocol + '//' + location.host + name;
        } else if (Utils.startsWith(name, './') || Utils.startsWith(name, '../')) {
          name = Utils.normalizePath(location.href, name);
        }
        if (Utils.endsWith(name, '/')) {
          name = name.slice(0, -1);
        }
        cfg.name = name;
        var base = cfg.base || cfg.path;
        if (base) {
          cfg.base = normalizePath(base, true);
        }
        if (packages[name]) {
          packages[name].reset(cfg);
        } else {
          packages[name] = new Package(cfg);
        }
      });
      return undefined;
    } else {
      Config.packages = {
        core: packages.core
      };
      return undefined;
    }
  };

  configFns.modules = function (modules) {
    if (modules) {
      Utils.each(modules, function (modCfg, id) {
        var uri = modCfg.uri;
        if (uri) {
          modCfg.uri = normalizePath(uri);
        }
        Utils.createModule(id, modCfg);
      });
    }
  };

  configFns.base = function (base) {
    var self = this;
    var corePackage = Config.packages.core;
    if (!base) {
      return corePackage && corePackage.getBase();
    }
    self.config('packages', {
      core: {
        base: base
      }
    });
    return undefined;
  };

  function shortcut(attr) {
    return function (config) {
      var newCfg = {};
      for (var name in config) {
        newCfg[name] = {};
        newCfg[name][attr] = config[name];
      }
      mx.config('modules', newCfg);
    };
  }

  function normalizePath(base, isDirectory) {
    base = Utils.normalizeSlash(base);
    if (isDirectory && base.charAt(base.length - 1) !== '/') {
      base += '/';
    }
    if (location) {
      if (Utils.startsWith(base, 'http:') ||
        Utils.startsWith(base, '//') ||
        Utils.startsWith(base, 'https:') ||
        Utils.startsWith(base, 'file:')) {
        return base;
      }
      base = location.protocol + '//' + location.host + Utils.normalizePath(location.pathname, base);
    }
    return base;
  }
})(modulex);

/**
 * combo loader. using combo to load module files.
 * @ignore
 * @author yiminghe@gmail.com
 */
(function (mx, undefined) {
  var Loader = mx.Loader;
  var Config = mx.Config;
  var Status = Loader.Status;
  var Utils = Loader.Utils;
  var addModule = Utils.addModule;
  var each = Utils.each;
  var getHash = Utils.getHash;
  var LOADING = Status.LOADING;
  var LOADED = Status.LOADED;
  var ERROR = Status.ERROR;
  var oldIE = Utils.ieMode && Utils.ieMode < 10;

  function loadScripts(rss, callback, timeout) {
    var count = rss && rss.length;
    var errorList = [];
    var successList = [];

    function complete() {
      if (!(--count)) {
        callback(successList, errorList);
      }
    }

    each(rss, function (rs) {
      var mod;
      var config = {
        timeout: timeout,
        success: function () {
          successList.push(rs);
          if (mod && currentMod) {
            // standard browser(except ie9) fire load after modulex.add immediately
            addModule(mod.id, currentMod.factory, currentMod.config);
            currentMod = undefined;
          }
          complete();
        },
        error: function () {
          errorList.push(rs);
          complete();
        },
        charset: rs.charset
      };
      if (!rs.combine) {
        mod = rs.mods[0];
        if (mod.getType() === 'css') {
          mod = undefined;
        } else if (oldIE) {
          startLoadModId = mod.id;
          if ('@DEBUG@') {
            startLoadModTime = +new Date();
          }
          config.attrs = {
            'data-mod-id': mod.id
          };
        }
      }
      Config.loadModsFn(rs, config);
    });
  }

  var loaderId = 0;

  /**
   * @class modulex.Loader.ComboLoader
   * using combo to load module files
   * @param callback
   * @private
   */
  function ComboLoader(callback) {
    this.callback = callback;
    this.head = this.tail = undefined;
    this.id = 'loader' + (++loaderId);
  }

  var currentMod;
  var startLoadModId;
  var startLoadModTime;

  function checkRequire(config, factory) {
    // use require primitive statement
    // function(mx, require){ require('node') }
    if (!config && typeof factory === 'function') {
      var requires = Utils.getRequiresFromFn(factory);
      if (requires.length) {
        config = config || {};
        config.requires = requires;
      }
    } else {
      // modulex.add(function(){},{requires:[]})
      if (config && config.requires && !config.cjs) {
        config.cjs = 0;
      }
    }
    return config;
  }

  function adaptRequirejs(requires) {
    var ret = [];
    var i, r, len;
    for (i = 0, len = requires.length; i < len; i++) {
      r = requires[i];
      if (r === 'exports' || r === 'module' || r === 'require') {

      } else {
        ret.push(r);
      }
    }
    return ret;
  }

  ComboLoader.add = function (id, factory, config, argsLen) {
    // modulex.add('xx',[],function(){});
    if (argsLen === 3 && Utils.isArray(factory)) {
      var tmp = factory;
      factory = config;
      config = {
        requires: adaptRequirejs(tmp),
        cjs: 1
      };
    }
    // modulex.add(function(){}), modulex.add('a'), modulex.add(function(){},{requires:[]})
    if (typeof id === 'function' || argsLen === 1) {
      config = factory;
      factory = id;
      config = checkRequire(config, factory);
      if (oldIE) {
        // http://groups.google.com/group/commonjs/browse_thread/thread/5a3358ece35e688e/43145ceccfb1dc02#43145ceccfb1dc02
        id = findModuleIdByInteractive();
        addModule(id, factory, config);
        startLoadModId = null;
        startLoadModTime = 0;
      } else {
        // standard browser associates id with definition when onload
        currentMod = {
          factory: factory,
          config: config
        };
      }
    } else {
      // modulex.add('x',function(){},{requires:[]})
      if (oldIE) {
        startLoadModId = null;
        startLoadModTime = 0;
      } else {
        currentMod = undefined;
      }
      config = checkRequire(config, factory);
      addModule(id, factory, config);
    }
  };

  function findModuleIdByInteractive() {
    var scripts = document.getElementsByTagName('script');
    var re, i, id, script;

    for (i = scripts.length - 1; i >= 0; i--) {
      script = scripts[i];
      if (script.readyState === 'interactive') {
        re = script;
        break;
      }
    }

    if (re) {
      id = re.getAttribute('data-mod-id');
    } else {
      // sometimes when read module file from cache,
      // interactive status is not triggered
      // module code is executed right after inserting into dom
      // i has to preserve module name before insert module script into dom,
      // then get it back here
      id = startLoadModId;
    }
    return id;
  }

  var debugRemoteModules;

  if ('@DEBUG@') {
    debugRemoteModules = function (rss) {
      each(rss, function (rs) {
        var ms = [];
        each(rs.mods, function (m) {
          if (m.status === LOADED) {
            ms.push(m.id);
          }
        });
      });
    };
  }

  function getCommonPathPrefix(str1, str2) {
    // ie bug
    // 'a//b'.split(/\//) => [a,b]
    var protocolIndex = str1.indexOf('//');
    var prefix = '';
    if (protocolIndex !== -1) {
      prefix = str1.substring(0, str1.indexOf('//') + 2);
    }
    str1 = str1.substring(prefix.length).split(/\//);
    str2 = str2.substring(prefix.length).split(/\//);
    var l = Math.min(str1.length, str2.length);
    for (var i = 0; i < l; i++) {
      if (str1[i] !== str2[i]) {
        break;
      }
    }
    return prefix + str1.slice(0, i).join('/') + '/';
  }

  // ??editor/plugin/x,editor/plugin/b
  // =>
  // editor/plugin/??x,b
  function getUriConsiderCommonPrefix(commonPrefix, currentComboUris, basePrefix, comboPrefix, comboSep, suffix) {
    if (commonPrefix && currentComboUris.length > 1) {
      var commonPrefixLen = commonPrefix.length;
      var currentUris = [];
      for (var i = 0; i < currentComboUris.length; i++) {
        currentUris[i] = currentComboUris[i].substring(commonPrefixLen);
      }
      return basePrefix + commonPrefix + comboPrefix + currentUris.join(comboSep) + suffix;
    } else {
      return basePrefix + comboPrefix + currentComboUris.join(comboSep) + suffix;
    }
  }

  Utils.mix(ComboLoader.prototype, {
    /**
     * load modules asynchronously
     */
    use: function (allMods) {
      var self = this;
      var comboUris;
      var timeout = Config.timeout;

      comboUris = self.getComboUris(allMods);

      // load css first to avoid page blink
      if (comboUris.css) {
        loadScripts(comboUris.css, function (success, error) {
          if ('@DEBUG@') {
            debugRemoteModules(success);
          }

          each(success, function (one) {
            each(one.mods, function (mod) {
              addModule(mod.id, Utils.noop);
              // notify all loader instance
              mod.flush();
            });
          });

          each(error, function (one) {
            each(one.mods, function (mod) {
              var msg = mod.id + ' is not loaded! can not find module in uri: ' + one.uri;
              console.error(msg);
              mod.status = ERROR;
              var error = {
                type: 'load',
                exception: msg,
                module: mod
              };
              mod.error = error;
              if (mod.onError) {
                mod.onError(error);
              }
              if (Config.onModuleError) {
                Config.onModuleError(error);
              }
              // notify all loader instance
              mod.flush();
            });
          });
        }, timeout);
      }

      // jss css download in parallel
      if (comboUris.js) {
        loadScripts(comboUris.js, function (success) {
          if ('@DEBUG@') {
            debugRemoteModules(success);
          }

          each(comboUris.js, function (one) {
            each(one.mods, function (mod) {
              // fix #111
              // https://github.com/kissyteam/modulex/issues/111
              if (!mod.factory) {
                var msg = mod.id +
                  ' is not loaded! can not find module in uri: ' +
                  one.uri;
                console.error(msg);
                mod.status = ERROR;
                var error = {
                  type: 'load',
                  exception: msg,
                  module: mod
                };
                mod.error = error;
                if (mod.onError) {
                  mod.onError(error);
                }
                if (Config.onModuleError) {
                  Config.onModuleError(error);
                }
              }
              // notify all loader instance
              mod.flush();
            });
          });
        }, timeout);
      }
    },

    /**
     * calculate dependency
     */
    calculate: function (unloadedMods, errorList, stack, cache, ret) {
      var i, m, mod,
        modStatus, stackDepth;
      var self = this;

      if ('@DEBUG@') {
        stack = stack || [];
      }
      ret = ret || [];
      // 提高性能，不用每个模块都再次全部依赖计算
      // 做个缓存，每个模块对应的待动态加载模块
      cache = cache || {};

      for (i = 0; i < unloadedMods.length; i++) {
        mod = unloadedMods[i];
        m = mod.id;

        if (cache[m]) {
          continue;
        }

        if ('@DEBUG@') {
          stackDepth = stack.length;
        }

        modStatus = mod.status;
        if (modStatus === ERROR) {
          errorList.push(mod);
          cache[m] = 1;
          continue;
        }
        if (modStatus > LOADED) {
          cache[m] = 1;
          continue;
        } else if (modStatus !== LOADED && !mod.contains(self)) {
          if (modStatus !== LOADING) {
            mod.status = LOADING;
            ret.push(mod);
          }
          mod.add(self);
          self.wait(mod);
        }

        if ('@DEBUG@') {
          // do not use indexOf, poor performance in ie8
          if (stack[m]) {
            console.warn('find cyclic dependency between mods: ' + stack);
            cache[m] = 1;
            continue;
          } else {
            stack[m] = 1;
            stack.push(m);
          }
        }

        self.calculate(mod.getNormalizedRequiredModules(), errorList, stack, cache, ret);
        cache[m] = 1;
        if ('@DEBUG@') {
          for (var si = stackDepth; si < stack.length; si++) {
            stack[stack[si]] = 0;
          }
          stack.length = stackDepth;
        }
      }

      return ret;
    },

    /**
     * get combo mods for modNames
     */
    getComboMods: function (mods) {
      var i, tmpMods, mod, packageInfo, type,
        tag, charset, packageBase,
        packageName, group, modUri;
      var l = mods.length;
      var groups = {
        /*
         js: {
         'groupA-gbk':{
         'http://x.com':[m1,m2]
         }
         }
         */
      };
      var normals = {
        /*
         js:{
         'http://x.com':[m1,m2]
         }
         */
      };
      for (i = 0; i < l; ++i) {
        mod = mods[i];
        type = mod.getType();
        modUri = mod.getUri();
        packageInfo = mod.getPackage();

        if (packageInfo) {
          packageBase = packageInfo.getBase();
          packageName = packageInfo.name;
          charset = packageInfo.getCharset();
          tag = packageInfo.getTag();
          group = packageInfo.getGroup();
        } else {
          packageBase = mod.id;
        }

        // absolute url can not comboed
        if (packageInfo && packageInfo.isCombine() && group) {
          var typeGroups = groups[type] || (groups[type] = {});
          group = group + '-' + charset;
          var typeGroup = typeGroups[group] || (typeGroups[group] = {});
          var find = 0;
          /*jshint loopfunc:true*/
          Utils.each(typeGroup, function (tmpMods, prefix) {
            if (Utils.isSameOriginAs(prefix, packageBase)) {
              var newPrefix = getCommonPathPrefix(prefix, packageBase);
              tmpMods.push(mod);
              if (tag && tag !== tmpMods.tag) {
                tmpMods.tag = getHash(tmpMods.tag + tag);
              }
              delete typeGroup[prefix];
              typeGroup[newPrefix] = tmpMods;
              find = 1;
            }
          });
          if (!find) {
            tmpMods = typeGroup[packageBase] = [mod];
            tmpMods.charset = charset;
            tmpMods.tag = tag || '';
          }
        } else {
          var normalTypes = normals[type] || (normals[type] = {});
          if (!(tmpMods = normalTypes[packageBase])) {
            tmpMods = normalTypes[packageBase] = [];
            tmpMods.charset = charset;
            tmpMods.tag = tag || '';
          } else {
            if (tag && tag !== tmpMods.tag) {
              tmpMods.tag = getHash(tmpMods.tag + tag);
            }
          }
          tmpMods.push(mod);
        }
      }

      return {
        groups: groups,
        normals: normals
      };
    },

    /**
     * Get combo uris
     */
    getComboUris: function (mods) {
      var comboPrefix = Config.comboPrefix;
      var comboSep = Config.comboSep;
      var comboRes = {};
      var maxFileNum = Config.comboMaxFileNum;
      var maxUriLength = Config.comboMaxUriLength;
      var comboMods = this.getComboMods(mods);

      function processSamePrefixUriMods(type, basePrefix, sendMods) {
        var currentComboUris = [];
        var currentComboMods = [];
        var tag = sendMods.tag;
        var charset = sendMods.charset;
        var suffix = (tag ? '?t=' + encodeURIComponent(tag) + '.' + type : '');

        var baseLen = basePrefix.length;
        var commonPrefix;
        var res = [];

        /*jshint loopfunc:true*/
        function pushComboUri(sentUri) {
          //noinspection JSReferencingMutableVariableFromClosure
          res.push({
            combine: 1,
            uri: sentUri,
            charset: charset,
            mods: currentComboMods
          });
        }

        function getSentUri() {
          return getUriConsiderCommonPrefix(commonPrefix, currentComboUris,
            basePrefix, comboPrefix, comboSep, suffix);
        }

        for (var i = 0; i < sendMods.length; i++) {
          var currentMod = sendMods[i];
          var uri = currentMod.getUri();
          if (!currentMod.getPackage() || !currentMod.getPackage().isCombine() ||
              // use(x/y) packageName: x/y ...
            !Utils.startsWith(uri, basePrefix)) {
            res.push({
              combine: 0,
              uri: uri,
              charset: charset,
              mods: [currentMod]
            });
            continue;
          }

          // ignore query parameter
          var subPath = uri.slice(baseLen).replace(/\?.*$/, '');
          currentComboUris.push(subPath);
          currentComboMods.push(currentMod);

          if (commonPrefix === undefined) {
            commonPrefix = subPath.indexOf('/') !== -1 ? subPath : '';
          } else if (commonPrefix !== '') {
            commonPrefix = getCommonPathPrefix(commonPrefix, subPath);
            if (commonPrefix === '/') {
              commonPrefix = '';
            }
          }

          if (currentComboUris.length > maxFileNum || getSentUri().length > maxUriLength) {
            currentComboUris.pop();
            currentComboMods.pop();
            pushComboUri(getSentUri());
            currentComboUris = [];
            currentComboMods = [];
            commonPrefix = undefined;
            i--;
          }
        }
        if (currentComboUris.length) {
          pushComboUri(getSentUri());
        }

        comboRes[type].push.apply(comboRes[type], res);
      }

      var type, prefix, group;
      var normals = comboMods.normals;
      var groups = comboMods.groups;

      // generate combo uris
      for (type in normals) {
        comboRes[type] = comboRes[type] || [];
        for (prefix in normals[type]) {
          processSamePrefixUriMods(type, prefix, normals[type][prefix]);
        }
      }

      for (type in groups) {
        comboRes[type] = comboRes[type] || [];
        for (group in groups[type]) {
          for (prefix in groups[type][group]) {
            processSamePrefixUriMods(type, prefix, groups[type][group][prefix]);
          }
        }
      }

      return comboRes;
    },

    flush: function () {
      var self = this;
      if (!self.callback) {
        return;
      }
      var head = self.head;
      var callback = self.callback;
      while (head) {
        var node = head.node;
        var status = node.status;
        if (status >= LOADED || status === ERROR) {
          node.remove(self);
          head = self.head = head.next;
        } else {
          return;
        }
      }
      self.callback = null;
      callback();
    },

    isCompleteLoading: function () {
      return !this.head;
    },

    wait: function (mod) {
      var self = this;
      if (!self.head) {
        self.tail = self.head = {
          node: mod
        };
      } else {
        var newNode = {
          node: mod
        };
        self.tail.next = newNode;
        self.tail = newNode;
      }
    }
  });

  Loader.ComboLoader = ComboLoader;
})(modulex);
/*
 2014-03-24 yiminghe@gmail.com
 - refactor group combo logic

 2014-01-14 yiminghe@gmail.com
 - support System.ondemand from es6

 2013-09-11 yiminghe@gmail.com
 - unify simple loader and combo loader

 2013-07-25 阿古, yiminghe@gmail.com
 - support group combo for packages

 2013-06-04 yiminghe@gmail.com
 - refactor merge combo loader and simple loader
 - support error callback

 2012-02-20 yiminghe@gmail.com
 - three status
 UNLOADED
 LOADED: load into page
 INITIALIZED: factory executed
 */
/**
 * @ignore
 * init loader, set config
 * @author yiminghe@gmail.com
 */
(function (mx) {
  var doc = mx.Env.host && mx.Env.host.document;
  var defaultComboPrefix = '??';
  var defaultComboSep = ',';
  var Loader = mx.Loader;
  var Utils = Loader.Utils;
  var createModule = Utils.createModule;
  var ComboLoader = Loader.ComboLoader;

  Utils.mix(mx, {
    // internal usage
    getModule: function (id) {
      return createModule(id);
    },

    // internal usage
    getPackage: function (packageName) {
      return mx.Config.packages[packageName];
    },

    /**
     * Registers a module with the modulex global.
     * @param {String} id module id.
     * it must be set if combine is true in {@link modulex#config}
     * @param {Function} factory module definition function that is used to return
     * exports of this module
     * @param {modulex} factory.mx modulex global instance
     * @param {Object} [cfg] module optional config data
     * @param {String[]} cfg.requires this module's required module name list
     * @member modulex
     *
     *
     *      // dom module's definition
     *      modulex.add('dom', function(mx, xx){
         *          return {css: function(el, name, val){}};
         *      },{
         *          requires:['xx']
         *      });
     */
    add: function (id, factory, cfg) {
      ComboLoader.add(id, factory, cfg, arguments.length);
    },

    /**
     * initialize one or more modules
     * @param {String|String[]} modIds 1-n modules to bind(use comma to separate)
     * @param {Function} success callback function executed
     * when modulex has the required functionality.
     * @param {Function} error callback function executed
     * when modulex has the required functionality.
     * @param {modulex} success.mx modulex instance
     * @param success.x... modules exports
     * @member modulex
     *
     *
     *      // loads and initialize overlay dd and its dependencies
     *      modulex.use(['overlay','dd'], function(mx, Overlay){});
     */
    use: function (modIds, success, error) {
      var loader;
      var tryCount = 0;
      if (typeof modIds === 'string') {
        modIds = modIds.split(/\s*,\s*/);
      }
      if (typeof success === 'object') {
        //noinspection JSUnresolvedVariable
        error = success.error;
        //noinspection JSUnresolvedVariable
        success = success.success;
      }
      for (var i = 0; i < modIds.length; i++) {
        var modId = modIds[i];
        if (Utils.startsWith(modId, './') || Utils.startsWith(modId, '../')) {
          modIds[i] = Utils.normalizePath(location.href, modId);
        }
      }
      var mods = Utils.createModules(modIds);
      var unloadedMods = [];
      Utils.each(mods, function (mod) {
        unloadedMods.push.apply(unloadedMods, mod.getNormalizedModules());
      });

      function processError(errorList, action) {
        console.error('modulex: ' + action + ' the following modules error');
        console.error(Utils.map(errorList, function (e) {
          return e.id;
        }));
        if (error) {
          if ('@DEBUG@') {
            error.apply(mx, errorList);
          } else {
            try {
              error.apply(mx, errorList);
            } catch (e) {
              /*jshint loopfunc:true*/
              setTimeout(function () {
                throw e;
              }, 0);
            }
          }
          error = null;
        }
      }

      function loadReady() {
        ++tryCount;
        var errorList = [];
        // get error from last round of load
        // important! can not replace unloadedMods with nextToLoadMods
        var nextToLoadMods = loader.calculate(unloadedMods, errorList);
        if (errorList.length) {
          // note: at combo mode  a depends b if b error, then a error two, only return a
          processError(errorList, 'load');
        } else if (loader.isCompleteLoading()) {
          var isInitSuccess = Utils.initModules(unloadedMods);
          if (!isInitSuccess) {
            processError(Utils.collectErrors(unloadedMods), 'init');
          } else if (success) {
            if ('@DEBUG@') {
              success.apply(mx, Utils.getModulesExports(mods));
            } else {
              try {
                success.apply(mx, Utils.getModulesExports(mods));
              } catch (e) {
                /*jshint loopfunc:true*/
                setTimeout(function () {
                  throw e;
                }, 0);
              }
            }
            success = null;
          }
        } else {
          // in case all of its required mods is loading by other loaders
          loader.callback = loadReady;
          if (nextToLoadMods.length) {
            loader.use(nextToLoadMods);
          }
        }
      }

      loader = new ComboLoader(loadReady);
      // in case modules is loaded statically
      // synchronous check
      // but always async for loader
      loadReady();
      return mx;
    },

    /**
     * get module exports from modulex module cache
     * @param {String} id module id
     * @member modulex
     * @return {*} exports of specified module
     */
    require: function (id) {
      return createModule(id).getExports();
    },

    /**
     * undefine a module
     * @param {String} id module id
     * @member modulex
     */
    undef: function (id) {
      var requiresModule = createModule(id);
      var mods = requiresModule.getNormalizedModules();
      Utils.each(mods, function (m) {
        m.undef();
      });
    }
  });

  function returnJson(s) {
    /*jshint evil:true*/
    return (new Function('return ' + s))();
  }

  function getBaseInfoFromOneScript(script, name) {
    var baseReg = new RegExp('^(.*)(' + name + ')(?:-debug|)?\\.js[^/]*', 'i');
    var baseTestReg = new RegExp('(' + name + ')(?:-debug|)?\\.js', 'i');
    var src = script.src || '';
    if (!src.match(baseTestReg)) {
      return 0;
    }
    var baseInfo = script.getAttribute('data-config');
    if (baseInfo) {
      baseInfo = returnJson(baseInfo);
    } else {
      baseInfo = {};
    }
    var comboPrefix = baseInfo.comboPrefix || defaultComboPrefix;
    var comboSep = baseInfo.comboSep || defaultComboSep;
    var parts, base;
    var index = src.indexOf(comboPrefix);
    // no combo
    if (index === -1) {
      base = src.replace(baseReg, '$1');
    } else {
      base = src.substring(0, index);
      if (base.charAt(base.length - 1) !== '/') {
        base += '/';
      }
      parts = src.substring(index + comboPrefix.length).split(comboSep);
      for (var i = 0, l = parts.length; i < l; i++) {
        var part = parts[i];
        if (part.match(baseTestReg)) {
          base += part.replace(baseReg, '$1');
          break;
        }
      }
    }
    baseInfo.base = baseInfo.base || base;
    return baseInfo;
  }

  /**
   * get base from modulex
   * @ignore
   *
   * for example:
   *      @example
   *      http://x.com/modulex.js
   *      note about custom combo rules, such as yui3:
   *      combo-prefix='combo?' combo-sep='&'
   */
  function getBaseInfo(name) {
    // get base from current script file path
    // notice: timestamp
    var scripts = doc.getElementsByTagName('script');
    var i, info;

    for (i = scripts.length - 1; i >= 0; i--) {
      if ((info = getBaseInfoFromOneScript(scripts[i], name))) {
        return info;
      }
    }
    return null;
  }

  mx.config({
    comboPrefix: defaultComboPrefix,
    comboSep: defaultComboSep,
    charset: 'utf-8',
    filter: '',
    lang: 'zh-cn'
  });

  mx.init = function (cfg) {
    var name = cfg.name;
    mx.config(getBaseInfo(name));
  };

  mx.config('packages', {
    core: {
      filter: '@DEBUG@' ? 'debug' : '',
      base: '.'
    }
  });

  // ejecta
  if (doc && doc.getElementsByTagName) {
    // will transform base to absolute path
    mx.config(Utils.mix({
      // 2k(2048) uri length
      comboMaxUriLength: 2000,
      // file limit number for a single combo uri
      comboMaxFileNum: 40
    }, getBaseInfo('modulex')));
  }

  if (typeof global === 'undefined' && typeof window !== 'undefined') {
    var win = window;
    var require = win.require;
    win.require = modulex.use;
    win.require.config = modulex.config;
    var define = win.define;
    win.define = modulex.add;
    mx.noConflict = function () {
      win.require = require;
      win.define = define;
    };
  }
})(modulex);
/**
 * @ignore
 * i18n plugin for modulex loader
 * @author yiminghe@gmail.com
 */
modulex.add('i18n', {
  alias: function (mx, id) {
    return id + '/i18n/' + mx.Config.lang;
  }
});/**
 * @ignore
 * implement getScript for nodejs synchronously.
 * so loader need not to be changed.
 * @author yiminghe@gmail.com
 */
(function (mx) {
  /*global require*/
  var fs = require('fs');
  var Utils = mx.Loader.Utils;
  var vm = require('vm');
  mx.getScript = function (uri, success, charset) {
    var error;
    if (typeof success === 'object') {
      charset = success.charset;
      error = success.error;
      success = success.success;
    }
    if (Utils.endsWith(uri, '.css')) {
      console.warn('node js can not load css: ' + uri);
      if (success) {
        success();
      }
      return;
    }
    if (!fs.existsSync(uri)) {
      var e = 'can not find file ' + uri;
      console.error(e);
      if (error) {
        error(e);
      }
      return;
    }
    try {
      // async is controlled by async option in use
      // sync load in getScript, same as cached load in browser environment
      var mod = fs.readFileSync(uri, charset);
      // code in runInThisContext unlike eval can not access local scope
      // noinspection JSUnresolvedFunction
      // use path, or else use uri will error in nodejs debug mode
      var define = useDefine ? ', define' : '';
      var factory = vm.runInThisContext('(function(modulex' + define + '){' + mod + '})', uri);
      factory(mx, mx.add);
      if (success) {
        success();
      }
    } catch (e) {
      console.error('in file: ' + uri);
      console.error(e.stack);
      if (error) {
        error(e);
      }
    }
  };

  module.exports = mx;

  mx.config({
    charset: 'utf-8'
  });

  // require synchronously in node js
  mx.nodeRequire = function (id) {
    var ret = [];
    mx.use([id], function () {
      ret = arguments;
    });
    return ret[0];
  };

  mx.config('packages', {
    core: {
      filter: '',
      base: __dirname
    }
  });

  var useDefine = 1;
  mx.noConflict = function () {
    useDefine = 0;
  };
})(modulex);