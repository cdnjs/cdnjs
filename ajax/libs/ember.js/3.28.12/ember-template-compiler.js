(function() {
/*!
 * @overview  Ember - JavaScript Application Framework
 * @copyright Copyright 2011-2021 Tilde Inc. and contributors
 *            Portions Copyright 2006-2011 Strobe Inc.
 *            Portions Copyright 2008-2011 Apple Inc. All rights reserved.
 * @license   Licensed under MIT license
 *            See https://raw.github.com/emberjs/ember.js/master/LICENSE
 * @version   3.28.12
 */

/* eslint-disable no-var */
/* globals global globalThis self */
var define, require;

(function () {
  var globalObj =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : null;

  if (globalObj === null) {
    throw new Error('unable to locate global object');
  }

  if (typeof globalObj.define === 'function' && typeof globalObj.require === 'function') {
    define = globalObj.define;
    require = globalObj.require;

    return;
  }

  var registry = Object.create(null);
  var seen = Object.create(null);

  function missingModule(name, referrerName) {
    if (referrerName) {
      throw new Error('Could not find module ' + name + ' required by: ' + referrerName);
    } else {
      throw new Error('Could not find module ' + name);
    }
  }

  function internalRequire(_name, referrerName) {
    var name = _name;
    var mod = registry[name];

    if (!mod) {
      name = name + '/index';
      mod = registry[name];
    }

    var exports = seen[name];

    if (exports !== undefined) {
      return exports;
    }

    exports = seen[name] = {};

    if (!mod) {
      missingModule(_name, referrerName);
    }

    var deps = mod.deps;
    var callback = mod.callback;
    var reified = new Array(deps.length);

    for (var i = 0; i < deps.length; i++) {
      if (deps[i] === 'exports') {
        reified[i] = exports;
      } else if (deps[i] === 'require') {
        reified[i] = require;
      } else {
        reified[i] = require(deps[i], name);
      }
    }

    callback.apply(this, reified);

    return exports;
  }

  require = function (name) {
    return internalRequire(name, null);
  };

  // eslint-disable-next-line no-unused-vars
  define = function (name, deps, callback) {
    registry[name] = { deps: deps, callback: callback };
  };

  // setup `require` module
  require['default'] = require;

  require.has = function registryHas(moduleName) {
    return Boolean(registry[moduleName]) || Boolean(registry[moduleName + '/index']);
  };

  require._eak_seen = require.entries = registry;
})();

define("@ember/-internals/browser-environment/index", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.hasDOM = _exports.isIE = _exports.isFirefox = _exports.isChrome = _exports.userAgent = _exports.history = _exports.location = _exports.window = void 0;
  // check if window exists and actually is the global
  var hasDom = typeof self === 'object' && self !== null && self.Object === Object && typeof Window !== 'undefined' && self.constructor === Window && typeof document === 'object' && document !== null && self.document === document && typeof location === 'object' && location !== null && self.location === location && typeof history === 'object' && history !== null && self.history === history && typeof navigator === 'object' && navigator !== null && self.navigator === navigator && typeof navigator.userAgent === 'string';
  _exports.hasDOM = hasDom;
  var window = hasDom ? self : null;
  _exports.window = window;
  var location$1 = hasDom ? self.location : null;
  _exports.location = location$1;
  var history$1 = hasDom ? self.history : null;
  _exports.history = history$1;
  var userAgent = hasDom ? self.navigator.userAgent : 'Lynx (textmode)';
  _exports.userAgent = userAgent;
  var isChrome = hasDom ? typeof chrome === 'object' && !(typeof opera === 'object') : false;
  _exports.isChrome = isChrome;
  var isFirefox = hasDom ? typeof InstallTrigger !== 'undefined' : false;
  _exports.isFirefox = isFirefox;
  var isIE = hasDom ? typeof MSInputMethodContext !== 'undefined' && typeof documentMode !== 'undefined' : false;
  _exports.isIE = isIE;
});
define("@ember/-internals/environment/index", ["exports", "@ember/deprecated-features"], function (_exports, _deprecatedFeatures) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.getLookup = getLookup;
  _exports.setLookup = setLookup;
  _exports.getENV = getENV;
  _exports.ENV = _exports.context = _exports.global = void 0;

  // from lodash to catch fake globals
  function checkGlobal(value) {
    return value && value.Object === Object ? value : undefined;
  } // element ids can ruin global miss checks


  function checkElementIdShadowing(value) {
    return value && value.nodeType === undefined ? value : undefined;
  } // export real global


  var global$1 = checkGlobal(checkElementIdShadowing(typeof global === 'object' && global)) || checkGlobal(typeof self === 'object' && self) || checkGlobal(typeof window === 'object' && window) || typeof mainContext !== 'undefined' && mainContext || // set before strict mode in Ember loader/wrapper
  new Function('return this')(); // eval outside of strict mode

  _exports.global = global$1;

  var context = function (global, Ember) {
    return Ember === undefined ? {
      imports: global,
      exports: global,
      lookup: global
    } : {
      // import jQuery
      imports: Ember.imports || global,
      // export Ember
      exports: Ember.exports || global,
      // search for Namespaces
      lookup: Ember.lookup || global
    };
  }(global$1, global$1.Ember);

  _exports.context = context;

  function getLookup() {
    return context.lookup;
  }

  function setLookup(value) {
    context.lookup = value;
  }
  /**
    The hash of environment variables used to control various configuration
    settings. To specify your own or override default settings, add the
    desired properties to a global hash named `EmberENV` (or `ENV` for
    backwards compatibility with earlier versions of Ember). The `EmberENV`
    hash must be created before loading Ember.
  
    @class EmberENV
    @type Object
    @public
  */


  var ENV = {
    ENABLE_OPTIONAL_FEATURES: false,

    /**
      Determines whether Ember should add to `Array`, `Function`, and `String`
      native object prototypes, a few extra methods in order to provide a more
      friendly API.
         We generally recommend leaving this option set to true however, if you need
      to turn it off, you can add the configuration property
      `EXTEND_PROTOTYPES` to `EmberENV` and set it to `false`.
         Note, when disabled (the default configuration for Ember Addons), you will
      instead have to access all methods and functions from the Ember
      namespace.
         @property EXTEND_PROTOTYPES
      @type Boolean
      @default true
      @for EmberENV
      @public
    */
    EXTEND_PROTOTYPES: {
      Array: true,
      Function: true,
      String: true
    },

    /**
      The `LOG_STACKTRACE_ON_DEPRECATION` property, when true, tells Ember to log
      a full stack trace during deprecation warnings.
         @property LOG_STACKTRACE_ON_DEPRECATION
      @type Boolean
      @default true
      @for EmberENV
      @public
    */
    LOG_STACKTRACE_ON_DEPRECATION: true,

    /**
      The `LOG_VERSION` property, when true, tells Ember to log versions of all
      dependent libraries in use.
         @property LOG_VERSION
      @type Boolean
      @default true
      @for EmberENV
      @public
    */
    LOG_VERSION: true,
    RAISE_ON_DEPRECATION: false,
    STRUCTURED_PROFILE: false,

    /**
      Whether to insert a `<div class="ember-view" />` wrapper around the
      application template. See RFC #280.
         This is not intended to be set directly, as the implementation may change in
      the future. Use `@ember/optional-features` instead.
         @property _APPLICATION_TEMPLATE_WRAPPER
      @for EmberENV
      @type Boolean
      @default true
      @private
    */
    _APPLICATION_TEMPLATE_WRAPPER: true,

    /**
      Whether to use Glimmer Component semantics (as opposed to the classic "Curly"
      components semantics) for template-only components. See RFC #278.
         This is not intended to be set directly, as the implementation may change in
      the future. Use `@ember/optional-features` instead.
         @property _TEMPLATE_ONLY_GLIMMER_COMPONENTS
      @for EmberENV
      @type Boolean
      @default false
      @private
    */
    _TEMPLATE_ONLY_GLIMMER_COMPONENTS: false,

    /**
      Whether to perform extra bookkeeping needed to make the `captureRenderTree`
      API work.
         This has to be set before the ember JavaScript code is evaluated. This is
      usually done by setting `window.EmberENV = { _DEBUG_RENDER_TREE: true };`
      before the "vendor" `<script>` tag in `index.html`.
         Setting the flag after Ember is already loaded will not work correctly. It
      may appear to work somewhat, but fundamentally broken.
         This is not intended to be set directly. Ember Inspector will enable the
      flag on behalf of the user as needed.
         This flag is always on in development mode.
         The flag is off by default in production mode, due to the cost associated
      with the the bookkeeping work.
         The expected flow is that Ember Inspector will ask the user to refresh the
      page after enabling the feature. It could also offer a feature where the
      user add some domains to the "always on" list. In either case, Ember
      Inspector will inject the code on the page to set the flag if needed.
         @property _DEBUG_RENDER_TREE
      @for EmberENV
      @type Boolean
      @default false
      @private
    */
    _DEBUG_RENDER_TREE: true
    /* DEBUG */
    ,

    /**
      Whether the app is using jQuery. See RFC #294.
         This is not intended to be set directly, as the implementation may change in
      the future. Use `@ember/optional-features` instead.
         @property _JQUERY_INTEGRATION
      @for EmberENV
      @type Boolean
      @default true
      @private
    */
    _JQUERY_INTEGRATION: true,

    /**
      Whether the app defaults to using async observers.
         This is not intended to be set directly, as the implementation may change in
      the future. Use `@ember/optional-features` instead.
         @property _DEFAULT_ASYNC_OBSERVERS
      @for EmberENV
      @type Boolean
      @default false
      @private
    */
    _DEFAULT_ASYNC_OBSERVERS: false,

    /**
      Controls the maximum number of scheduled rerenders without "settling". In general,
      applications should not need to modify this environment variable, but please
      open an issue so that we can determine if a better default value is needed.
         @property _RERENDER_LOOP_LIMIT
      @for EmberENV
      @type number
      @default 1000
      @private
     */
    _RERENDER_LOOP_LIMIT: 1000,

    /**
      Allows disabling the implicit this property fallback deprecation. This could be useful
      as a way to control the volume of deprecations that are issued by temporarily disabling
      the implicit this fallback deprecations, which would allow the other deprecations to be more easily
      identified in the console).
         NOTE: The fallback behavior **will be removed** in Ember 4.0.0, disabling **_IS NOT_**
      a viable strategy for handling this deprecation.
         @property _DISABLE_PROPERTY_FALLBACK_DEPRECATION
      @for EmberENV
      @type boolean
      @default false
      @private
     */
    _DISABLE_PROPERTY_FALLBACK_DEPRECATION: false,
    EMBER_LOAD_HOOKS: {},
    FEATURES: {}
  };
  _exports.ENV = ENV;

  (function (EmberENV) {
    if (typeof EmberENV !== 'object' || EmberENV === null) return;

    for (var flag in EmberENV) {
      if (!Object.prototype.hasOwnProperty.call(EmberENV, flag) || flag === 'EXTEND_PROTOTYPES' || flag === 'EMBER_LOAD_HOOKS') continue;
      var defaultValue = ENV[flag];

      if (defaultValue === true) {
        ENV[flag] = EmberENV[flag] !== false;
      } else if (defaultValue === false) {
        ENV[flag] = EmberENV[flag] === true;
      }
    }

    var EXTEND_PROTOTYPES = EmberENV.EXTEND_PROTOTYPES;

    if (EXTEND_PROTOTYPES !== undefined) {
      if (typeof EXTEND_PROTOTYPES === 'object' && EXTEND_PROTOTYPES !== null) {
        ENV.EXTEND_PROTOTYPES.String = EXTEND_PROTOTYPES.String !== false;

        if (_deprecatedFeatures.FUNCTION_PROTOTYPE_EXTENSIONS) {
          ENV.EXTEND_PROTOTYPES.Function = EXTEND_PROTOTYPES.Function !== false;
        }

        ENV.EXTEND_PROTOTYPES.Array = EXTEND_PROTOTYPES.Array !== false;
      } else {
        var isEnabled = EXTEND_PROTOTYPES !== false;
        ENV.EXTEND_PROTOTYPES.String = isEnabled;

        if (_deprecatedFeatures.FUNCTION_PROTOTYPE_EXTENSIONS) {
          ENV.EXTEND_PROTOTYPES.Function = isEnabled;
        }

        ENV.EXTEND_PROTOTYPES.Array = isEnabled;
      }
    } // TODO this does not seem to be used by anything,
    //      can we remove it? do we need to deprecate it?


    var EMBER_LOAD_HOOKS = EmberENV.EMBER_LOAD_HOOKS;

    if (typeof EMBER_LOAD_HOOKS === 'object' && EMBER_LOAD_HOOKS !== null) {
      for (var hookName in EMBER_LOAD_HOOKS) {
        if (!Object.prototype.hasOwnProperty.call(EMBER_LOAD_HOOKS, hookName)) continue;
        var hooks = EMBER_LOAD_HOOKS[hookName];

        if (Array.isArray(hooks)) {
          ENV.EMBER_LOAD_HOOKS[hookName] = hooks.filter(function (hook) {
            return typeof hook === 'function';
          });
        }
      }
    }

    var FEATURES = EmberENV.FEATURES;

    if (typeof FEATURES === 'object' && FEATURES !== null) {
      for (var feature in FEATURES) {
        if (!Object.prototype.hasOwnProperty.call(FEATURES, feature)) continue;
        ENV.FEATURES[feature] = FEATURES[feature] === true;
      }
    }

    if (true
    /* DEBUG */
    ) {
      ENV._DEBUG_RENDER_TREE = true;
    }
  })(global$1.EmberENV);

  function getENV() {
    return ENV;
  }
});
define("@ember/-internals/utils/index", ["exports", "@glimmer/util", "@ember/debug"], function (_exports, _util, _debug) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.enumerableSymbol = enumerableSymbol;
  _exports.isInternalSymbol = isInternalSymbol;
  _exports.dictionary = makeDictionary;
  _exports.uuid = uuid;
  _exports.generateGuid = generateGuid;
  _exports.guidFor = guidFor;
  _exports.intern = intern;
  _exports.wrap = wrap;
  _exports.observerListenerMetaFor = observerListenerMetaFor;
  _exports.setObservers = setObservers;
  _exports.setListeners = setListeners;
  _exports.inspect = inspect;
  _exports.lookupDescriptor = lookupDescriptor;
  _exports.canInvoke = canInvoke;
  _exports.tryInvoke = tryInvoke;
  _exports.makeArray = makeArray;
  _exports.getName = getName;
  _exports.setName = setName;
  _exports.toString = toString;
  _exports.isObject = isObject;
  _exports.isProxy = isProxy;
  _exports.setProxy = setProxy;
  _exports.setEmberArray = setEmberArray;
  _exports.isEmberArray = isEmberArray;
  _exports.setWithMandatorySetter = _exports.teardownMandatorySetter = _exports.setupMandatorySetter = _exports.Cache = _exports.HAS_NATIVE_PROXY = _exports.HAS_NATIVE_SYMBOL = _exports.ROOT = _exports.checkHasSuper = _exports.GUID_KEY = _exports.getDebugName = _exports.symbol = void 0;

  /**
    Strongly hint runtimes to intern the provided string.
  
    When do I need to use this function?
  
    For the most part, never. Pre-mature optimization is bad, and often the
    runtime does exactly what you need it to, and more often the trade-off isn't
    worth it.
  
    Why?
  
    Runtimes store strings in at least 2 different representations:
    Ropes and Symbols (interned strings). The Rope provides a memory efficient
    data-structure for strings created from concatenation or some other string
    manipulation like splitting.
  
    Unfortunately checking equality of different ropes can be quite costly as
    runtimes must resort to clever string comparison algorithms. These
    algorithms typically cost in proportion to the length of the string.
    Luckily, this is where the Symbols (interned strings) shine. As Symbols are
    unique by their string content, equality checks can be done by pointer
    comparison.
  
    How do I know if my string is a rope or symbol?
  
    Typically (warning general sweeping statement, but truthy in runtimes at
    present) static strings created as part of the JS source are interned.
    Strings often used for comparisons can be interned at runtime if some
    criteria are met.  One of these criteria can be the size of the entire rope.
    For example, in chrome 38 a rope longer then 12 characters will not
    intern, nor will segments of that rope.
  
    Some numbers: http://jsperf.com/eval-vs-keys/8
  
    Known Trick™
  
    @private
    @return {String} interned version of the provided string
  */
  function intern(str) {
    var obj = {};
    obj[str] = 1;

    for (var key in obj) {
      if (key === str) {
        return key;
      }
    }

    return str;
  }
  /**
    Returns whether Type(value) is Object.
  
    Useful for checking whether a value is a valid WeakMap key.
  
    Refs: https://tc39.github.io/ecma262/#sec-typeof-operator-runtime-semantics-evaluation
          https://tc39.github.io/ecma262/#sec-weakmap.prototype.set
  
    @private
    @function isObject
  */


  function isObject(value) {
    return value !== null && (typeof value === 'object' || typeof value === 'function');
  }
  /**
   @module @ember/object
  */

  /**
   Previously we used `Ember.$.uuid`, however `$.uuid` has been removed from
   jQuery master. We'll just bootstrap our own uuid now.
  
   @private
   @return {Number} the uuid
   */


  var _uuid = 0;
  /**
   Generates a universally unique identifier. This method
   is used internally by Ember for assisting with
   the generation of GUID's and other unique identifiers.
  
   @public
   @return {Number} [description]
   */

  function uuid() {
    return ++_uuid;
  }
  /**
   Prefix used for guids through out Ember.
   @private
   @property GUID_PREFIX
   @for Ember
   @type String
   @final
   */


  var GUID_PREFIX = 'ember'; // Used for guid generation...

  var OBJECT_GUIDS = new WeakMap();
  var NON_OBJECT_GUIDS = new Map();
  /**
    A unique key used to assign guids and other private metadata to objects.
    If you inspect an object in your browser debugger you will often see these.
    They can be safely ignored.
  
    On browsers that support it, these properties are added with enumeration
    disabled so they won't show up when you iterate over your properties.
  
    @private
    @property GUID_KEY
    @for Ember
    @type String
    @final
  */

  var GUID_KEY = intern("__ember" + Date.now());
  /**
    Generates a new guid, optionally saving the guid to the object that you
    pass in. You will rarely need to use this method. Instead you should
    call `guidFor(obj)`, which return an existing guid if available.
  
    @private
    @method generateGuid
    @static
    @for @ember/object/internals
    @param {Object} [obj] Object the guid will be used for. If passed in, the guid will
      be saved on the object and reused whenever you pass the same object
      again.
  
      If no object is passed, just generate a new guid.
    @param {String} [prefix] Prefix to place in front of the guid. Useful when you want to
      separate the guid into separate namespaces.
    @return {String} the guid
  */

  _exports.GUID_KEY = GUID_KEY;

  function generateGuid(obj, prefix) {
    if (prefix === void 0) {
      prefix = GUID_PREFIX;
    }

    var guid = prefix + uuid();

    if (isObject(obj)) {
      OBJECT_GUIDS.set(obj, guid);
    }

    return guid;
  }
  /**
    Returns a unique id for the object. If the object does not yet have a guid,
    one will be assigned to it. You can call this on any object,
    `EmberObject`-based or not.
  
    You can also use this method on DOM Element objects.
  
    @public
    @static
    @method guidFor
    @for @ember/object/internals
    @param {Object} obj any object, string, number, Element, or primitive
    @return {String} the unique guid for this instance.
  */


  function guidFor(value) {
    var guid;

    if (isObject(value)) {
      guid = OBJECT_GUIDS.get(value);

      if (guid === undefined) {
        guid = GUID_PREFIX + uuid();
        OBJECT_GUIDS.set(value, guid);
      }
    } else {
      guid = NON_OBJECT_GUIDS.get(value);

      if (guid === undefined) {
        var type = typeof value;

        if (type === 'string') {
          guid = 'st' + uuid();
        } else if (type === 'number') {
          guid = 'nu' + uuid();
        } else if (type === 'symbol') {
          guid = 'sy' + uuid();
        } else {
          guid = '(' + value + ')';
        }

        NON_OBJECT_GUIDS.set(value, guid);
      }
    }

    return guid;
  }

  var HAS_NATIVE_SYMBOL = function () {
    if (typeof Symbol !== 'function') {
      return false;
    }

    return typeof Symbol() === 'symbol';
  }();

  _exports.HAS_NATIVE_SYMBOL = HAS_NATIVE_SYMBOL;
  var GENERATED_SYMBOLS = [];

  function isInternalSymbol(possibleSymbol) {
    return GENERATED_SYMBOLS.indexOf(possibleSymbol) !== -1;
  } // Some legacy symbols still need to be enumerable for a variety of reasons.
  // This code exists for that, and as a fallback in IE11. In general, prefer
  // `symbol` below when creating a new symbol.


  function enumerableSymbol(debugName) {
    // TODO: Investigate using platform symbols, but we do not
    // want to require non-enumerability for this API, which
    // would introduce a large cost.
    var id = GUID_KEY + Math.floor(Math.random() * Date.now());
    var symbol = intern("__" + debugName + id + "__");

    if (true
    /* DEBUG */
    ) {
      GENERATED_SYMBOLS.push(symbol);
    }

    return symbol;
  }

  var symbol = HAS_NATIVE_SYMBOL ? Symbol : enumerableSymbol; // the delete is meant to hint at runtimes that this object should remain in
  // dictionary mode. This is clearly a runtime specific hack, but currently it
  // appears worthwhile in some usecases. Please note, these deletes do increase
  // the cost of creation dramatically over a plain Object.create. And as this
  // only makes sense for long-lived dictionaries that aren't instantiated often.

  _exports.symbol = symbol;

  function makeDictionary(parent) {
    var dict = Object.create(parent);
    dict['_dict'] = null;
    delete dict['_dict'];
    return dict;
  }

  var getDebugName;

  if (true
  /* DEBUG */
  ) {
    var getFunctionName = function getFunctionName(fn) {
      var functionName = fn.name;

      if (functionName === undefined) {
        var match = Function.prototype.toString.call(fn).match(/function (\w+)\s*\(/);
        functionName = match && match[1] || '';
      }

      return functionName.replace(/^bound /, '');
    };

    var getObjectName = function getObjectName(obj) {
      var name;
      var className;

      if (obj.constructor && obj.constructor !== Object) {
        className = getFunctionName(obj.constructor);
      }

      if ('toString' in obj && obj.toString !== Object.prototype.toString && obj.toString !== Function.prototype.toString) {
        name = obj.toString();
      } // If the class has a decent looking name, and the `toString` is one of the
      // default Ember toStrings, replace the constructor portion of the toString
      // with the class name. We check the length of the class name to prevent doing
      // this when the value is minified.


      if (name && name.match(/<.*:ember\d+>/) && className && className[0] !== '_' && className.length > 2 && className !== 'Class') {
        return name.replace(/<.*:/, "<" + className + ":");
      }

      return name || className;
    };

    var getPrimitiveName = function getPrimitiveName(value) {
      return String(value);
    };

    getDebugName = function getDebugName(value) {
      if (typeof value === 'function') {
        return getFunctionName(value) || "(unknown function)";
      } else if (typeof value === 'object' && value !== null) {
        return getObjectName(value) || "(unknown object)";
      } else {
        return getPrimitiveName(value);
      }
    };
  }

  var getDebugName$1 = getDebugName;
  _exports.getDebugName = getDebugName$1;
  var HAS_SUPER_PATTERN = /\.(_super|call\(this|apply\(this)/;
  var fnToString = Function.prototype.toString;

  var checkHasSuper = function () {
    var sourceAvailable = fnToString.call(function () {
      return this;
    }).indexOf('return this') > -1;

    if (sourceAvailable) {
      return function checkHasSuper(func) {
        return HAS_SUPER_PATTERN.test(fnToString.call(func));
      };
    }

    return function checkHasSuper() {
      return true;
    };
  }();

  _exports.checkHasSuper = checkHasSuper;
  var HAS_SUPER_MAP = new WeakMap();
  var ROOT = Object.freeze(function () {});
  _exports.ROOT = ROOT;
  HAS_SUPER_MAP.set(ROOT, false);

  function hasSuper(func) {
    var hasSuper = HAS_SUPER_MAP.get(func);

    if (hasSuper === undefined) {
      hasSuper = checkHasSuper(func);
      HAS_SUPER_MAP.set(func, hasSuper);
    }

    return hasSuper;
  }

  var ObserverListenerMeta = function ObserverListenerMeta() {
    this.listeners = undefined;
    this.observers = undefined;
  };

  var OBSERVERS_LISTENERS_MAP = new WeakMap();

  function createObserverListenerMetaFor(fn) {
    var meta = OBSERVERS_LISTENERS_MAP.get(fn);

    if (meta === undefined) {
      meta = new ObserverListenerMeta();
      OBSERVERS_LISTENERS_MAP.set(fn, meta);
    }

    return meta;
  }

  function observerListenerMetaFor(fn) {
    return OBSERVERS_LISTENERS_MAP.get(fn);
  }

  function setObservers(func, observers) {
    var meta = createObserverListenerMetaFor(func);
    meta.observers = observers;
  }

  function setListeners(func, listeners) {
    var meta = createObserverListenerMetaFor(func);
    meta.listeners = listeners;
  }

  var IS_WRAPPED_FUNCTION_SET = new _util._WeakSet();
  /**
    Wraps the passed function so that `this._super` will point to the superFunc
    when the function is invoked. This is the primitive we use to implement
    calls to super.
  
    @private
    @method wrap
    @for Ember
    @param {Function} func The function to call
    @param {Function} superFunc The super function.
    @return {Function} wrapped function.
  */

  function wrap(func, superFunc) {
    if (!hasSuper(func)) {
      return func;
    } // ensure an unwrapped super that calls _super is wrapped with a terminal _super


    if (!IS_WRAPPED_FUNCTION_SET.has(superFunc) && hasSuper(superFunc)) {
      return _wrap(func, _wrap(superFunc, ROOT));
    }

    return _wrap(func, superFunc);
  }

  function _wrap(func, superFunc) {
    function superWrapper() {
      var orig = this._super;
      this._super = superFunc;
      var ret = func.apply(this, arguments);
      this._super = orig;
      return ret;
    }

    IS_WRAPPED_FUNCTION_SET.add(superWrapper);
    var meta = OBSERVERS_LISTENERS_MAP.get(func);

    if (meta !== undefined) {
      OBSERVERS_LISTENERS_MAP.set(superWrapper, meta);
    }

    return superWrapper;
  }

  var objectToString = Object.prototype.toString;
  var functionToString = Function.prototype.toString;
  var isArray = Array.isArray;
  var objectKeys = Object.keys;
  var stringify = JSON.stringify;
  var LIST_LIMIT = 100;
  var DEPTH_LIMIT = 4;
  var SAFE_KEY = /^[\w$]+$/;
  /**
   @module @ember/debug
  */

  /**
    Convenience method to inspect an object. This method will attempt to
    convert the object into a useful string description.
  
    It is a pretty simple implementation. If you want something more robust,
    use something like JSDump: https://github.com/NV/jsDump
  
    @method inspect
    @static
    @param {Object} obj The object you want to inspect.
    @return {String} A description of the object
    @since 1.4.0
    @private
  */

  function inspect(obj) {
    // detect Node util.inspect call inspect(depth: number, opts: object)
    if (typeof obj === 'number' && arguments.length === 2) {
      return this;
    }

    return inspectValue(obj, 0);
  }

  function inspectValue(value, depth, seen) {
    var valueIsArray = false;

    switch (typeof value) {
      case 'undefined':
        return 'undefined';

      case 'object':
        if (value === null) return 'null';

        if (isArray(value)) {
          valueIsArray = true;
          break;
        } // is toString Object.prototype.toString or undefined then traverse


        if (value.toString === objectToString || value.toString === undefined) {
          break;
        } // custom toString


        return value.toString();

      case 'function':
        return value.toString === functionToString ? value.name ? "[Function:" + value.name + "]" : "[Function]" : value.toString();

      case 'string':
        return stringify(value);

      case 'symbol':
      case 'boolean':
      case 'number':
      default:
        return value.toString();
    }

    if (seen === undefined) {
      seen = new _util._WeakSet();
    } else {
      if (seen.has(value)) return "[Circular]";
    }

    seen.add(value);
    return valueIsArray ? inspectArray(value, depth + 1, seen) : inspectObject(value, depth + 1, seen);
  }

  function inspectKey(key) {
    return SAFE_KEY.test(key) ? key : stringify(key);
  }

  function inspectObject(obj, depth, seen) {
    if (depth > DEPTH_LIMIT) {
      return '[Object]';
    }

    var s = '{';
    var keys = objectKeys(obj);

    for (var i = 0; i < keys.length; i++) {
      s += i === 0 ? ' ' : ', ';

      if (i >= LIST_LIMIT) {
        s += "... " + (keys.length - LIST_LIMIT) + " more keys";
        break;
      }

      var key = keys[i];
      s += inspectKey(key) + ': ' + inspectValue(obj[key], depth, seen);
    }

    s += ' }';
    return s;
  }

  function inspectArray(arr, depth, seen) {
    if (depth > DEPTH_LIMIT) {
      return '[Array]';
    }

    var s = '[';

    for (var i = 0; i < arr.length; i++) {
      s += i === 0 ? ' ' : ', ';

      if (i >= LIST_LIMIT) {
        s += "... " + (arr.length - LIST_LIMIT) + " more items";
        break;
      }

      s += inspectValue(arr[i], depth, seen);
    }

    s += ' ]';
    return s;
  }

  function lookupDescriptor(obj, keyName) {
    var current = obj;

    do {
      var descriptor = Object.getOwnPropertyDescriptor(current, keyName);

      if (descriptor !== undefined) {
        return descriptor;
      }

      current = Object.getPrototypeOf(current);
    } while (current !== null);

    return null;
  }
  /**
    Checks to see if the `methodName` exists on the `obj`.
  
    ```javascript
    let foo = { bar: function() { return 'bar'; }, baz: null };
  
    Ember.canInvoke(foo, 'bar'); // true
    Ember.canInvoke(foo, 'baz'); // false
    Ember.canInvoke(foo, 'bat'); // false
    ```
  
    @method canInvoke
    @for Ember
    @param {Object} obj The object to check for the method
    @param {String} methodName The method name to check for
    @return {Boolean}
    @private
  */


  function canInvoke(obj, methodName) {
    return obj !== null && obj !== undefined && typeof obj[methodName] === 'function';
  }
  /**
    @module @ember/utils
  */

  /**
    Checks to see if the `methodName` exists on the `obj`,
    and if it does, invokes it with the arguments passed.
  
    ```javascript
    import { tryInvoke } from '@ember/utils';
  
    let d = new Date('03/15/2013');
  
    tryInvoke(d, 'getTime');              // 1363320000000
    tryInvoke(d, 'setFullYear', [2014]);  // 1394856000000
    tryInvoke(d, 'noSuchMethod', [2014]); // undefined
    ```
  
    @method tryInvoke
    @for @ember/utils
    @static
    @param {Object} obj The object to check for the method
    @param {String} methodName The method name to check for
    @param {Array} [args] The arguments to pass to the method
    @return {*} the return value of the invoked method or undefined if it cannot be invoked
    @public
    @deprecated Use Javascript's optional chaining instead.
  */


  function tryInvoke(obj, methodName, args) {
    (true && !(false) && (0, _debug.deprecate)("Use of tryInvoke is deprecated. Instead, consider using JavaScript's optional chaining.", false, {
      id: 'ember-utils.try-invoke',
      until: '4.0.0',
      for: 'ember-source',
      since: {
        enabled: '3.24.0'
      },
      url: 'https://deprecations.emberjs.com/v3.x#toc_ember-utils-try-invoke'
    }));

    if (canInvoke(obj, methodName)) {
      var method = obj[methodName];
      return method.apply(obj, args);
    }
  }

  var isArray$1 = Array.isArray;

  function makeArray(obj) {
    if (obj === null || obj === undefined) {
      return [];
    }

    return isArray$1(obj) ? obj : [obj];
  }

  var NAMES = new WeakMap();

  function setName(obj, name) {
    if (isObject(obj)) NAMES.set(obj, name);
  }

  function getName(obj) {
    return NAMES.get(obj);
  }

  var objectToString$1 = Object.prototype.toString;

  function isNone(obj) {
    return obj === null || obj === undefined;
  }
  /*
   A `toString` util function that supports objects without a `toString`
   method, e.g. an object created with `Object.create(null)`.
  */


  function toString(obj) {
    if (typeof obj === 'string') {
      return obj;
    }

    if (null === obj) return 'null';
    if (undefined === obj) return 'undefined';

    if (Array.isArray(obj)) {
      // Reimplement Array.prototype.join according to spec (22.1.3.13)
      // Changing ToString(element) with this safe version of ToString.
      var r = '';

      for (var k = 0; k < obj.length; k++) {
        if (k > 0) {
          r += ',';
        }

        if (!isNone(obj[k])) {
          r += toString(obj[k]);
        }
      }

      return r;
    }

    if (typeof obj.toString === 'function') {
      return obj.toString();
    }

    return objectToString$1.call(obj);
  }

  var HAS_NATIVE_PROXY = typeof Proxy === 'function';
  _exports.HAS_NATIVE_PROXY = HAS_NATIVE_PROXY;
  var PROXIES = new _util._WeakSet();

  function isProxy(value) {
    if (isObject(value)) {
      return PROXIES.has(value);
    }

    return false;
  }

  function setProxy(object) {
    if (isObject(object)) {
      PROXIES.add(object);
    }
  }

  var Cache = /*#__PURE__*/function () {
    function Cache(limit, func, store) {
      this.limit = limit;
      this.func = func;
      this.store = store;
      this.size = 0;
      this.misses = 0;
      this.hits = 0;
      this.store = store || new Map();
    }

    var _proto = Cache.prototype;

    _proto.get = function get(key) {
      if (this.store.has(key)) {
        this.hits++;
        return this.store.get(key);
      } else {
        this.misses++;
        return this.set(key, this.func(key));
      }
    };

    _proto.set = function set(key, value) {
      if (this.limit > this.size) {
        this.size++;
        this.store.set(key, value);
      }

      return value;
    };

    _proto.purge = function purge() {
      this.store.clear();
      this.size = 0;
      this.hits = 0;
      this.misses = 0;
    };

    return Cache;
  }();

  _exports.Cache = Cache;
  var EMBER_ARRAYS = new _util._WeakSet();

  function setEmberArray(obj) {
    EMBER_ARRAYS.add(obj);
  }

  function isEmberArray(obj) {
    return EMBER_ARRAYS.has(obj);
  }

  var setupMandatorySetter;
  _exports.setupMandatorySetter = setupMandatorySetter;
  var teardownMandatorySetter;
  _exports.teardownMandatorySetter = teardownMandatorySetter;
  var setWithMandatorySetter;
  _exports.setWithMandatorySetter = setWithMandatorySetter;

  function isElementKey(key) {
    return typeof key === 'number' ? isPositiveInt(key) : isStringInt(key);
  }

  function isStringInt(str) {
    var num = parseInt(str, 10);
    return isPositiveInt(num) && str === String(num);
  }

  function isPositiveInt(num) {
    return num >= 0 && num % 1 === 0;
  }

  if (true
  /* DEBUG */
  ) {
    var SEEN_TAGS = new _util._WeakSet();
    var MANDATORY_SETTERS = new WeakMap();

    var _propertyIsEnumerable = function _propertyIsEnumerable(obj, key) {
      return Object.prototype.propertyIsEnumerable.call(obj, key);
    };

    _exports.setupMandatorySetter = setupMandatorySetter = function setupMandatorySetter(tag, obj, keyName) {
      if (SEEN_TAGS.has(tag)) {
        return;
      }

      SEEN_TAGS.add(tag);

      if (Array.isArray(obj) && isElementKey(keyName)) {
        return;
      }

      var desc = lookupDescriptor(obj, keyName) || {};

      if (desc.get || desc.set) {
        // if it has a getter or setter, we can't install the mandatory setter.
        // native setters are allowed, we have to assume that they will resolve
        // to tracked properties.
        return;
      }

      if (desc && (!desc.configurable || !desc.writable)) {
        // if it isn't writable anyways, so we shouldn't provide the setter.
        // if it isn't configurable, we can't overwrite it anyways.
        return;
      }

      var setters = MANDATORY_SETTERS.get(obj);

      if (setters === undefined) {
        setters = {};
        MANDATORY_SETTERS.set(obj, setters);
      }

      desc.hadOwnProperty = Object.hasOwnProperty.call(obj, keyName);
      setters[keyName] = desc;
      Object.defineProperty(obj, keyName, {
        configurable: true,
        enumerable: _propertyIsEnumerable(obj, keyName),
        get: function get() {
          if (desc.get) {
            return desc.get.call(this);
          } else {
            return desc.value;
          }
        },
        set: function set(value) {
          (true && !(false) && (0, _debug.assert)("You attempted to update " + this + "." + String(keyName) + " to \"" + String(value) + "\", but it is being tracked by a tracking context, such as a template, computed property, or observer. In order to make sure the context updates properly, you must invalidate the property when updating it. You can mark the property as `@tracked`, or use `@ember/object#set` to do this."));
        }
      });
    };

    _exports.teardownMandatorySetter = teardownMandatorySetter = function teardownMandatorySetter(obj, keyName) {
      var setters = MANDATORY_SETTERS.get(obj);

      if (setters !== undefined && setters[keyName] !== undefined) {
        Object.defineProperty(obj, keyName, setters[keyName]);
        setters[keyName] = undefined;
      }
    };

    _exports.setWithMandatorySetter = setWithMandatorySetter = function setWithMandatorySetter(obj, keyName, value) {
      var setters = MANDATORY_SETTERS.get(obj);

      if (setters !== undefined && setters[keyName] !== undefined) {
        var setter = setters[keyName];

        if (setter.set) {
          setter.set.call(obj, value);
        } else {
          setter.value = value; // If the object didn't have own property before, it would have changed
          // the enumerability after setting the value the first time.

          if (!setter.hadOwnProperty) {
            var desc = lookupDescriptor(obj, keyName);
            desc.enumerable = true;
            Object.defineProperty(obj, keyName, desc);
          }
        }
      } else {
        obj[keyName] = value;
      }
    };
  }
  /*
   This package will be eagerly parsed and should have no dependencies on external
   packages.
  
   It is intended to be used to share utility methods that will be needed
   by every Ember application (and is **not** a dumping ground of useful utilities).
  
   Utility methods that are needed in < 80% of cases should be placed
   elsewhere (so they can be lazily evaluated / parsed).
  */

});
define("@ember/canary-features/index", ["exports", "@ember/-internals/environment", "@ember/polyfills"], function (_exports, _environment, _polyfills) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.isEnabled = isEnabled;
  _exports.EMBER_DYNAMIC_HELPERS_AND_MODIFIERS = _exports.EMBER_STRICT_MODE = _exports.EMBER_MODERNIZED_BUILT_IN_COMPONENTS = _exports.EMBER_GLIMMER_INVOKE_HELPER = _exports.EMBER_GLIMMER_HELPER_MANAGER = _exports.EMBER_NAMED_BLOCKS = _exports.EMBER_IMPROVED_INSTRUMENTATION = _exports.EMBER_LIBRARIES_ISREGISTERED = _exports.FEATURES = _exports.DEFAULT_FEATURES = void 0;

  /**
    Set `EmberENV.FEATURES` in your application's `config/environment.js` file
    to enable canary features in your application.
  
    See the [feature flag guide](https://guides.emberjs.com/release/configuring-ember/feature-flags/)
    for more details.
  
    @module @ember/canary-features
    @public
  */
  var DEFAULT_FEATURES = {
    EMBER_LIBRARIES_ISREGISTERED: false,
    EMBER_IMPROVED_INSTRUMENTATION: false,
    EMBER_NAMED_BLOCKS: true,
    EMBER_GLIMMER_HELPER_MANAGER: true,
    EMBER_GLIMMER_INVOKE_HELPER: true,
    EMBER_MODERNIZED_BUILT_IN_COMPONENTS: true,
    EMBER_STRICT_MODE: true,
    EMBER_DYNAMIC_HELPERS_AND_MODIFIERS: true
  };
  /**
    The hash of enabled Canary features. Add to this, any canary features
    before creating your application.
  
    @class FEATURES
    @static
    @since 1.1.0
    @public
  */

  _exports.DEFAULT_FEATURES = DEFAULT_FEATURES;
  var FEATURES = (0, _polyfills.assign)(DEFAULT_FEATURES, _environment.ENV.FEATURES);
  /**
    Determine whether the specified `feature` is enabled. Used by Ember's
    build tools to exclude experimental features from beta/stable builds.
  
    You can define the following configuration options:
  
    * `EmberENV.ENABLE_OPTIONAL_FEATURES` - enable any features that have not been explicitly
      enabled/disabled.
  
    @method isEnabled
    @param {String} feature The feature to check
    @return {Boolean}
    @since 1.1.0
    @public
  */

  _exports.FEATURES = FEATURES;

  function isEnabled(feature) {
    var value = FEATURES[feature];

    if (value === true || value === false) {
      return value;
    } else if (_environment.ENV.ENABLE_OPTIONAL_FEATURES) {
      return true;
    } else {
      return false;
    }
  }

  function featureValue(value) {
    if (_environment.ENV.ENABLE_OPTIONAL_FEATURES && value === null) {
      return true;
    }

    return value;
  }

  var EMBER_LIBRARIES_ISREGISTERED = featureValue(FEATURES.EMBER_LIBRARIES_ISREGISTERED);
  _exports.EMBER_LIBRARIES_ISREGISTERED = EMBER_LIBRARIES_ISREGISTERED;
  var EMBER_IMPROVED_INSTRUMENTATION = featureValue(FEATURES.EMBER_IMPROVED_INSTRUMENTATION);
  _exports.EMBER_IMPROVED_INSTRUMENTATION = EMBER_IMPROVED_INSTRUMENTATION;
  var EMBER_NAMED_BLOCKS = featureValue(FEATURES.EMBER_NAMED_BLOCKS);
  _exports.EMBER_NAMED_BLOCKS = EMBER_NAMED_BLOCKS;
  var EMBER_GLIMMER_HELPER_MANAGER = featureValue(FEATURES.EMBER_GLIMMER_HELPER_MANAGER);
  _exports.EMBER_GLIMMER_HELPER_MANAGER = EMBER_GLIMMER_HELPER_MANAGER;
  var EMBER_GLIMMER_INVOKE_HELPER = featureValue(FEATURES.EMBER_GLIMMER_INVOKE_HELPER);
  _exports.EMBER_GLIMMER_INVOKE_HELPER = EMBER_GLIMMER_INVOKE_HELPER;
  var EMBER_MODERNIZED_BUILT_IN_COMPONENTS = featureValue(FEATURES.EMBER_MODERNIZED_BUILT_IN_COMPONENTS);
  _exports.EMBER_MODERNIZED_BUILT_IN_COMPONENTS = EMBER_MODERNIZED_BUILT_IN_COMPONENTS;
  var EMBER_STRICT_MODE = featureValue(FEATURES.EMBER_STRICT_MODE);
  _exports.EMBER_STRICT_MODE = EMBER_STRICT_MODE;
  var EMBER_DYNAMIC_HELPERS_AND_MODIFIERS = featureValue(FEATURES.EMBER_DYNAMIC_HELPERS_AND_MODIFIERS);
  _exports.EMBER_DYNAMIC_HELPERS_AND_MODIFIERS = EMBER_DYNAMIC_HELPERS_AND_MODIFIERS;
});
define("@ember/debug/container-debug-adapter", ["exports", "@ember/-internals/extension-support"], function (_exports, _extensionSupport) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function get() {
      return _extensionSupport.ContainerDebugAdapter;
    }
  });
});
define("@ember/debug/data-adapter", ["exports", "@ember/-internals/extension-support"], function (_exports, _extensionSupport) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function get() {
      return _extensionSupport.DataAdapter;
    }
  });
});
define("@ember/debug/index", ["exports", "@ember/-internals/browser-environment", "@ember/error", "@ember/debug/lib/deprecate", "@ember/debug/lib/testing", "@ember/debug/lib/warn", "@ember/-internals/utils", "@ember/debug/lib/capture-render-tree"], function (_exports, _browserEnvironment, _error, _deprecate2, _testing, _warn2, _utils, _captureRenderTree) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "registerDeprecationHandler", {
    enumerable: true,
    get: function get() {
      return _deprecate2.registerHandler;
    }
  });
  Object.defineProperty(_exports, "isTesting", {
    enumerable: true,
    get: function get() {
      return _testing.isTesting;
    }
  });
  Object.defineProperty(_exports, "setTesting", {
    enumerable: true,
    get: function get() {
      return _testing.setTesting;
    }
  });
  Object.defineProperty(_exports, "registerWarnHandler", {
    enumerable: true,
    get: function get() {
      return _warn2.registerHandler;
    }
  });
  Object.defineProperty(_exports, "inspect", {
    enumerable: true,
    get: function get() {
      return _utils.inspect;
    }
  });
  Object.defineProperty(_exports, "captureRenderTree", {
    enumerable: true,
    get: function get() {
      return _captureRenderTree.default;
    }
  });
  _exports._warnIfUsingStrippedFeatureFlags = _exports.getDebugFunction = _exports.setDebugFunction = _exports.deprecateFunc = _exports.runInDebug = _exports.debugFreeze = _exports.debugSeal = _exports.deprecate = _exports.debug = _exports.warn = _exports.info = _exports.assert = void 0;

  // These are the default production build versions:
  var noop = function noop() {};

  var assert = noop;
  _exports.assert = assert;
  var info = noop;
  _exports.info = info;
  var warn = noop;
  _exports.warn = warn;
  var debug = noop;
  _exports.debug = debug;
  var deprecate = noop;
  _exports.deprecate = deprecate;
  var debugSeal = noop;
  _exports.debugSeal = debugSeal;
  var debugFreeze = noop;
  _exports.debugFreeze = debugFreeze;
  var runInDebug = noop;
  _exports.runInDebug = runInDebug;
  var setDebugFunction = noop;
  _exports.setDebugFunction = setDebugFunction;
  var getDebugFunction = noop;
  _exports.getDebugFunction = getDebugFunction;

  var deprecateFunc = function deprecateFunc() {
    return arguments[arguments.length - 1];
  };

  _exports.deprecateFunc = deprecateFunc;

  if (true
  /* DEBUG */
  ) {
    _exports.setDebugFunction = setDebugFunction = function setDebugFunction(type, callback) {
      switch (type) {
        case 'assert':
          return _exports.assert = assert = callback;

        case 'info':
          return _exports.info = info = callback;

        case 'warn':
          return _exports.warn = warn = callback;

        case 'debug':
          return _exports.debug = debug = callback;

        case 'deprecate':
          return _exports.deprecate = deprecate = callback;

        case 'debugSeal':
          return _exports.debugSeal = debugSeal = callback;

        case 'debugFreeze':
          return _exports.debugFreeze = debugFreeze = callback;

        case 'runInDebug':
          return _exports.runInDebug = runInDebug = callback;

        case 'deprecateFunc':
          return _exports.deprecateFunc = deprecateFunc = callback;
      }
    };

    _exports.getDebugFunction = getDebugFunction = function getDebugFunction(type) {
      switch (type) {
        case 'assert':
          return assert;

        case 'info':
          return info;

        case 'warn':
          return warn;

        case 'debug':
          return debug;

        case 'deprecate':
          return deprecate;

        case 'debugSeal':
          return debugSeal;

        case 'debugFreeze':
          return debugFreeze;

        case 'runInDebug':
          return runInDebug;

        case 'deprecateFunc':
          return deprecateFunc;
      }
    };
  }
  /**
  @module @ember/debug
  */


  if (true
  /* DEBUG */
  ) {
    /**
      Verify that a certain expectation is met, or throw a exception otherwise.
         This is useful for communicating assumptions in the code to other human
      readers as well as catching bugs that accidentally violates these
      expectations.
         Assertions are removed from production builds, so they can be freely added
      for documentation and debugging purposes without worries of incuring any
      performance penalty. However, because of that, they should not be used for
      checks that could reasonably fail during normal usage. Furthermore, care
      should be taken to avoid accidentally relying on side-effects produced from
      evaluating the condition itself, since the code will not run in production.
         ```javascript
      import { assert } from '@ember/debug';
         // Test for truthiness
      assert('Must pass a string', typeof str === 'string');
         // Fail unconditionally
      assert('This code path should never be run');
      ```
         @method assert
      @static
      @for @ember/debug
      @param {String} description Describes the expectation. This will become the
        text of the Error thrown if the assertion fails.
      @param {any} condition Must be truthy for the assertion to pass. If
        falsy, an exception will be thrown.
      @public
      @since 1.0.0
    */
    setDebugFunction('assert', function assert(desc, test) {
      if (!test) {
        throw new _error.default("Assertion Failed: " + desc);
      }
    });
    /**
      Display a debug notice.
         Calls to this function are not invoked in production builds.
         ```javascript
      import { debug } from '@ember/debug';
         debug('I\'m a debug notice!');
      ```
         @method debug
      @for @ember/debug
      @static
      @param {String} message A debug message to display.
      @public
    */

    setDebugFunction('debug', function debug(message) {
      /* eslint-disable no-console */
      if (console.debug) {
        console.debug("DEBUG: " + message);
      } else {
        console.log("DEBUG: " + message);
      }
      /* eslint-ensable no-console */

    });
    /**
      Display an info notice.
         Calls to this function are removed from production builds, so they can be
      freely added for documentation and debugging purposes without worries of
      incuring any performance penalty.
         @method info
      @private
    */

    setDebugFunction('info', function info() {
      var _console;

      (_console = console).info.apply(_console, arguments);
      /* eslint-disable-line no-console */

    });
    /**
     @module @ember/debug
     @public
    */

    /**
      Alias an old, deprecated method with its new counterpart.
         Display a deprecation warning with the provided message and a stack trace
      (Chrome and Firefox only) when the assigned method is called.
         Calls to this function are removed from production builds, so they can be
      freely added for documentation and debugging purposes without worries of
      incuring any performance penalty.
         ```javascript
      import { deprecateFunc } from '@ember/debug';
         Ember.oldMethod = deprecateFunc('Please use the new, updated method', options, Ember.newMethod);
      ```
         @method deprecateFunc
      @static
      @for @ember/debug
      @param {String} message A description of the deprecation.
      @param {Object} [options] The options object for `deprecate`.
      @param {Function} func The new function called to replace its deprecated counterpart.
      @return {Function} A new function that wraps the original function with a deprecation warning
      @private
    */

    setDebugFunction('deprecateFunc', function deprecateFunc() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (args.length === 3) {
        var message = args[0],
            options = args[1],
            func = args[2];
        return function () {
          deprecate(message, false, options);

          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          return func.apply(this, args);
        };
      } else {
        var _message = args[0],
            _func = args[1];
        return function () {
          deprecate(_message);
          return _func.apply(this, arguments);
        };
      }
    });
    /**
     @module @ember/debug
     @public
    */

    /**
      Run a function meant for debugging.
         Calls to this function are removed from production builds, so they can be
      freely added for documentation and debugging purposes without worries of
      incuring any performance penalty.
         ```javascript
      import Component from '@ember/component';
      import { runInDebug } from '@ember/debug';
         runInDebug(() => {
        Component.reopen({
          didInsertElement() {
            console.log("I'm happy");
          }
        });
      });
      ```
         @method runInDebug
      @for @ember/debug
      @static
      @param {Function} func The function to be executed.
      @since 1.5.0
      @public
    */

    setDebugFunction('runInDebug', function runInDebug(func) {
      func();
    });
    setDebugFunction('debugSeal', function debugSeal(obj) {
      Object.seal(obj);
    });
    setDebugFunction('debugFreeze', function debugFreeze(obj) {
      // re-freezing an already frozen object introduces a significant
      // performance penalty on Chrome (tested through 59).
      //
      // See: https://bugs.chromium.org/p/v8/issues/detail?id=6450
      if (!Object.isFrozen(obj)) {
        Object.freeze(obj);
      }
    });
    setDebugFunction('deprecate', _deprecate2.default);
    setDebugFunction('warn', _warn2.default);
  }

  var _warnIfUsingStrippedFeatureFlags;

  _exports._warnIfUsingStrippedFeatureFlags = _warnIfUsingStrippedFeatureFlags;

  if (true
  /* DEBUG */
  && !(0, _testing.isTesting)()) {
    if (typeof window !== 'undefined' && (_browserEnvironment.isFirefox || _browserEnvironment.isChrome) && window.addEventListener) {
      window.addEventListener('load', function () {
        if (document.documentElement && document.documentElement.dataset && !document.documentElement.dataset.emberExtension) {
          var downloadURL;

          if (_browserEnvironment.isChrome) {
            downloadURL = 'https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi';
          } else if (_browserEnvironment.isFirefox) {
            downloadURL = 'https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/';
          }

          debug("For more advanced debugging, install the Ember Inspector from " + downloadURL);
        }
      }, false);
    }
  }
});
define("@ember/debug/lib/capture-render-tree", ["exports", "@glimmer/util"], function (_exports, _util) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = captureRenderTree;

  /**
    @module @ember/debug
  */

  /**
    Ember Inspector calls this function to capture the current render tree.
  
    In production mode, this requires turning on `ENV._DEBUG_RENDER_TREE`
    before loading Ember.
  
    @private
    @static
    @method captureRenderTree
    @for @ember/debug
    @param app {ApplicationInstance} An `ApplicationInstance`.
    @since 3.14.0
  */
  function captureRenderTree(app) {
    var renderer = (0, _util.expect)(app.lookup('renderer:-dom'), "BUG: owner is missing renderer");
    return renderer.debugRenderTree.capture();
  }
});
define("@ember/debug/lib/deprecate", ["exports", "@ember/-internals/environment", "@ember/debug/index", "@ember/debug/lib/handlers"], function (_exports, _environment, _index, _handlers) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.SINCE_MISSING_DEPRECATIONS = _exports.FOR_MISSING_DEPRECATIONS = _exports.missingOptionsSinceDeprecation = _exports.missingOptionsForDeprecation = _exports.missingOptionsUntilDeprecation = _exports.missingOptionsIdDeprecation = _exports.missingOptionsDeprecation = _exports.registerHandler = _exports.default = void 0;

  /**
   @module @ember/debug
   @public
  */

  /**
    Allows for runtime registration of handler functions that override the default deprecation behavior.
    Deprecations are invoked by calls to [@ember/debug/deprecate](/ember/release/classes/@ember%2Fdebug/methods/deprecate?anchor=deprecate).
    The following example demonstrates its usage by registering a handler that throws an error if the
    message contains the word "should", otherwise defers to the default handler.
  
    ```javascript
    import { registerDeprecationHandler } from '@ember/debug';
  
    registerDeprecationHandler((message, options, next) => {
      if (message.indexOf('should') !== -1) {
        throw new Error(`Deprecation message with should: ${message}`);
      } else {
        // defer to whatever handler was registered before this one
        next(message, options);
      }
    });
    ```
  
    The handler function takes the following arguments:
  
    <ul>
      <li> <code>message</code> - The message received from the deprecation call.</li>
      <li> <code>options</code> - An object passed in with the deprecation call containing additional information including:</li>
        <ul>
          <li> <code>id</code> - An id of the deprecation in the form of <code>package-name.specific-deprecation</code>.</li>
          <li> <code>until</code> - The Ember version number the feature and deprecation will be removed in.</li>
        </ul>
      <li> <code>next</code> - A function that calls into the previously registered handler.</li>
    </ul>
  
    @public
    @static
    @method registerDeprecationHandler
    @for @ember/debug
    @param handler {Function} A function to handle deprecation calls.
    @since 2.1.0
  */
  var registerHandler = function registerHandler() {};

  _exports.registerHandler = registerHandler;
  var missingOptionsDeprecation;
  _exports.missingOptionsDeprecation = missingOptionsDeprecation;
  var missingOptionsIdDeprecation;
  _exports.missingOptionsIdDeprecation = missingOptionsIdDeprecation;
  var missingOptionsUntilDeprecation;
  _exports.missingOptionsUntilDeprecation = missingOptionsUntilDeprecation;

  var missingOptionsForDeprecation = function missingOptionsForDeprecation() {
    return '';
  };

  _exports.missingOptionsForDeprecation = missingOptionsForDeprecation;

  var missingOptionsSinceDeprecation = function missingOptionsSinceDeprecation() {
    return '';
  };

  _exports.missingOptionsSinceDeprecation = missingOptionsSinceDeprecation;

  var deprecate = function deprecate() {};

  var FOR_MISSING_DEPRECATIONS = new Set();
  _exports.FOR_MISSING_DEPRECATIONS = FOR_MISSING_DEPRECATIONS;
  var SINCE_MISSING_DEPRECATIONS = new Set();
  _exports.SINCE_MISSING_DEPRECATIONS = SINCE_MISSING_DEPRECATIONS;

  if (true
  /* DEBUG */
  ) {
    _exports.registerHandler = registerHandler = function registerHandler(handler) {
      (0, _handlers.registerHandler)('deprecate', handler);
    };

    var formatMessage = function formatMessage(_message, options) {
      var message = _message;

      if (options && options.id) {
        message = message + (" [deprecation id: " + options.id + "]");
      }

      if (options && options.url) {
        message += " See " + options.url + " for more details.";
      }

      return message;
    };

    registerHandler(function logDeprecationToConsole(message, options) {
      var updatedMessage = formatMessage(message, options);
      console.warn("DEPRECATION: " + updatedMessage); // eslint-disable-line no-console
    });
    var captureErrorForStack;

    if (new Error().stack) {
      captureErrorForStack = function captureErrorForStack() {
        return new Error();
      };
    } else {
      captureErrorForStack = function captureErrorForStack() {
        try {
          __fail__.fail();
        } catch (e) {
          return e;
        }
      };
    }

    registerHandler(function logDeprecationStackTrace(message, options, next) {
      if (_environment.ENV.LOG_STACKTRACE_ON_DEPRECATION) {
        var stackStr = '';
        var error = captureErrorForStack();
        var stack;

        if (error.stack) {
          if (error['arguments']) {
            // Chrome
            stack = error.stack.replace(/^\s+at\s+/gm, '').replace(/^([^(]+?)([\n$])/gm, '{anonymous}($1)$2').replace(/^Object.<anonymous>\s*\(([^)]+)\)/gm, '{anonymous}($1)').split('\n');
            stack.shift();
          } else {
            // Firefox
            stack = error.stack.replace(/(?:\n@:0)?\s+$/m, '').replace(/^\(/gm, '{anonymous}(').split('\n');
          }

          stackStr = "\n    " + stack.slice(2).join('\n    ');
        }

        var updatedMessage = formatMessage(message, options);
        console.warn("DEPRECATION: " + updatedMessage + stackStr); // eslint-disable-line no-console
      } else {
        next(message, options);
      }
    });
    registerHandler(function raiseOnDeprecation(message, options, next) {
      if (_environment.ENV.RAISE_ON_DEPRECATION) {
        var updatedMessage = formatMessage(message);
        throw new Error(updatedMessage);
      } else {
        next(message, options);
      }
    });
    _exports.missingOptionsDeprecation = missingOptionsDeprecation = 'When calling `deprecate` you ' + 'must provide an `options` hash as the third parameter.  ' + '`options` should include `id` and `until` properties.';
    _exports.missingOptionsIdDeprecation = missingOptionsIdDeprecation = 'When calling `deprecate` you must provide `id` in options.';
    _exports.missingOptionsUntilDeprecation = missingOptionsUntilDeprecation = 'When calling `deprecate` you must provide `until` in options.';

    _exports.missingOptionsForDeprecation = missingOptionsForDeprecation = function missingOptionsForDeprecation(id) {
      return "When calling `deprecate` you must provide `for` in options. Missing options.for in \"" + id + "\" deprecation";
    };

    _exports.missingOptionsSinceDeprecation = missingOptionsSinceDeprecation = function missingOptionsSinceDeprecation(id) {
      return "When calling `deprecate` you must provide `since` in options. Missing options.since in \"" + id + "\" deprecation";
    };
    /**
     @module @ember/debug
     @public
     */

    /**
      Display a deprecation warning with the provided message and a stack trace
      (Chrome and Firefox only).
         * In a production build, this method is defined as an empty function (NOP).
      Uses of this method in Ember itself are stripped from the ember.prod.js build.
         @method deprecate
      @for @ember/debug
      @param {String} message A description of the deprecation.
      @param {Boolean} test A boolean. If falsy, the deprecation will be displayed.
      @param {Object} options
      @param {String} options.id A unique id for this deprecation. The id can be
        used by Ember debugging tools to change the behavior (raise, log or silence)
        for that specific deprecation. The id should be namespaced by dots, e.g.
        "view.helper.select".
      @param {string} options.until The version of Ember when this deprecation
        warning will be removed.
      @param {String} options.for A namespace for the deprecation, usually the package name
      @param {Object} options.since Describes when the deprecation became available and enabled.
      @param {String} [options.url] An optional url to the transition guide on the
            emberjs.com website.
      @static
      @public
      @since 1.0.0
    */


    deprecate = function deprecate(message, test, options) {
      (0, _index.assert)(missingOptionsDeprecation, Boolean(options && (options.id || options.until)));
      (0, _index.assert)(missingOptionsIdDeprecation, Boolean(options.id));
      (0, _index.assert)(missingOptionsUntilDeprecation, Boolean(options.until));

      if (!options.for && !FOR_MISSING_DEPRECATIONS.has(options.id)) {
        FOR_MISSING_DEPRECATIONS.add(options.id);
        deprecate(missingOptionsForDeprecation(options.id), Boolean(options.for), {
          id: 'ember-source.deprecation-without-for',
          until: '4.0.0',
          for: 'ember-source',
          since: {
            enabled: '3.24.0'
          }
        });
      }

      if (!options.since && !SINCE_MISSING_DEPRECATIONS.has(options.id)) {
        SINCE_MISSING_DEPRECATIONS.add(options.id);
        deprecate(missingOptionsSinceDeprecation(options.id), Boolean(options.since), {
          id: 'ember-source.deprecation-without-since',
          until: '4.0.0',
          for: 'ember-source',
          since: {
            enabled: '3.24.0'
          }
        });
      }

      (0, _handlers.invoke)('deprecate', message, test, options);
    };
  }

  var _default = deprecate;
  _exports.default = _default;
});
define("@ember/debug/lib/handlers", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.invoke = _exports.registerHandler = _exports.HANDLERS = void 0;
  var HANDLERS = {};
  _exports.HANDLERS = HANDLERS;

  var registerHandler = function registerHandler() {};

  _exports.registerHandler = registerHandler;

  var invoke = function invoke() {};

  _exports.invoke = invoke;

  if (true
  /* DEBUG */
  ) {
    _exports.registerHandler = registerHandler = function registerHandler(type, callback) {
      var nextHandler = HANDLERS[type] || function () {};

      HANDLERS[type] = function (message, options) {
        callback(message, options, nextHandler);
      };
    };

    _exports.invoke = invoke = function invoke(type, message, test, options) {
      if (test) {
        return;
      }

      var handlerForType = HANDLERS[type];

      if (handlerForType) {
        handlerForType(message, options);
      }
    };
  }
});
define("@ember/debug/lib/testing", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.isTesting = isTesting;
  _exports.setTesting = setTesting;
  var testing = false;

  function isTesting() {
    return testing;
  }

  function setTesting(value) {
    testing = Boolean(value);
  }
});
define("@ember/debug/lib/warn", ["exports", "@ember/debug/index", "@ember/debug/lib/handlers"], function (_exports, _index, _handlers) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.missingOptionsDeprecation = _exports.missingOptionsIdDeprecation = _exports.registerHandler = _exports.default = void 0;

  var registerHandler = function registerHandler() {};

  _exports.registerHandler = registerHandler;

  var warn = function warn() {};

  var missingOptionsDeprecation;
  _exports.missingOptionsDeprecation = missingOptionsDeprecation;
  var missingOptionsIdDeprecation;
  /**
  @module @ember/debug
  */

  _exports.missingOptionsIdDeprecation = missingOptionsIdDeprecation;

  if (true
  /* DEBUG */
  ) {
    /**
      Allows for runtime registration of handler functions that override the default warning behavior.
      Warnings are invoked by calls made to [@ember/debug/warn](/ember/release/classes/@ember%2Fdebug/methods/warn?anchor=warn).
      The following example demonstrates its usage by registering a handler that does nothing overriding Ember's
      default warning behavior.
         ```javascript
      import { registerWarnHandler } from '@ember/debug';
         // next is not called, so no warnings get the default behavior
      registerWarnHandler(() => {});
      ```
         The handler function takes the following arguments:
         <ul>
        <li> <code>message</code> - The message received from the warn call. </li>
        <li> <code>options</code> - An object passed in with the warn call containing additional information including:</li>
          <ul>
            <li> <code>id</code> - An id of the warning in the form of <code>package-name.specific-warning</code>.</li>
          </ul>
        <li> <code>next</code> - A function that calls into the previously registered handler.</li>
      </ul>
         @public
      @static
      @method registerWarnHandler
      @for @ember/debug
      @param handler {Function} A function to handle warnings.
      @since 2.1.0
    */
    _exports.registerHandler = registerHandler = function registerHandler(handler) {
      (0, _handlers.registerHandler)('warn', handler);
    };

    registerHandler(function logWarning(message) {
      /* eslint-disable no-console */
      console.warn("WARNING: " + message);
      /* eslint-enable no-console */
    });
    _exports.missingOptionsDeprecation = missingOptionsDeprecation = 'When calling `warn` you ' + 'must provide an `options` hash as the third parameter.  ' + '`options` should include an `id` property.';
    _exports.missingOptionsIdDeprecation = missingOptionsIdDeprecation = 'When calling `warn` you must provide `id` in options.';
    /**
      Display a warning with the provided message.
         * In a production build, this method is defined as an empty function (NOP).
      Uses of this method in Ember itself are stripped from the ember.prod.js build.
         ```javascript
      import { warn } from '@ember/debug';
      import tomsterCount from './tomster-counter'; // a module in my project
         // Log a warning if we have more than 3 tomsters
      warn('Too many tomsters!', tomsterCount <= 3, {
        id: 'ember-debug.too-many-tomsters'
      });
      ```
         @method warn
      @for @ember/debug
      @static
      @param {String} message A warning to display.
      @param {Boolean} test An optional boolean. If falsy, the warning
        will be displayed.
      @param {Object} options An object that can be used to pass a unique
        `id` for this warning.  The `id` can be used by Ember debugging tools
        to change the behavior (raise, log, or silence) for that specific warning.
        The `id` should be namespaced by dots, e.g. "ember-debug.feature-flag-with-features-stripped"
      @public
      @since 1.0.0
    */

    warn = function warn(message, test, options) {
      if (arguments.length === 2 && typeof test === 'object') {
        options = test;
        test = false;
      }

      (0, _index.assert)(missingOptionsDeprecation, Boolean(options));
      (0, _index.assert)(missingOptionsIdDeprecation, Boolean(options && options.id));
      (0, _handlers.invoke)('warn', message, test, options);
    };
  }

  var _default = warn;
  _exports.default = _default;
});
define("@ember/deprecated-features/index", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.GLOBALS_RESOLVER = _exports.PARTIALS = _exports.EMBER_COMPONENT_IS_VISIBLE = _exports.MOUSE_ENTER_LEAVE_MOVE_EVENTS = _exports.FUNCTION_PROTOTYPE_EXTENSIONS = _exports.APP_CTRL_ROUTER_PROPS = _exports.ALIAS_METHOD = _exports.JQUERY_INTEGRATION = _exports.COMPONENT_MANAGER_STRING_LOOKUP = _exports.ROUTER_EVENTS = _exports.MERGE = _exports.LOGGER = _exports.EMBER_EXTEND_PROTOTYPES = _exports.SEND_ACTION = void 0;

  /* eslint-disable no-implicit-coercion */
  // These versions should be the version that the deprecation was _introduced_,
  // not the version that the feature will be removed.
  var SEND_ACTION = !!'3.4.0';
  _exports.SEND_ACTION = SEND_ACTION;
  var EMBER_EXTEND_PROTOTYPES = !!'3.2.0-beta.5';
  _exports.EMBER_EXTEND_PROTOTYPES = EMBER_EXTEND_PROTOTYPES;
  var LOGGER = !!'3.2.0-beta.1';
  _exports.LOGGER = LOGGER;
  var MERGE = !!'3.6.0-beta.1';
  _exports.MERGE = MERGE;
  var ROUTER_EVENTS = !!'4.0.0';
  _exports.ROUTER_EVENTS = ROUTER_EVENTS;
  var COMPONENT_MANAGER_STRING_LOOKUP = !!'3.8.0';
  _exports.COMPONENT_MANAGER_STRING_LOOKUP = COMPONENT_MANAGER_STRING_LOOKUP;
  var JQUERY_INTEGRATION = !!'3.9.0';
  _exports.JQUERY_INTEGRATION = JQUERY_INTEGRATION;
  var ALIAS_METHOD = !!'3.9.0';
  _exports.ALIAS_METHOD = ALIAS_METHOD;
  var APP_CTRL_ROUTER_PROPS = !!'3.10.0-beta.1';
  _exports.APP_CTRL_ROUTER_PROPS = APP_CTRL_ROUTER_PROPS;
  var FUNCTION_PROTOTYPE_EXTENSIONS = !!'3.11.0-beta.1';
  _exports.FUNCTION_PROTOTYPE_EXTENSIONS = FUNCTION_PROTOTYPE_EXTENSIONS;
  var MOUSE_ENTER_LEAVE_MOVE_EVENTS = !!'3.13.0-beta.1';
  _exports.MOUSE_ENTER_LEAVE_MOVE_EVENTS = MOUSE_ENTER_LEAVE_MOVE_EVENTS;
  var EMBER_COMPONENT_IS_VISIBLE = !!'3.15.0-beta.1';
  _exports.EMBER_COMPONENT_IS_VISIBLE = EMBER_COMPONENT_IS_VISIBLE;
  var PARTIALS = !!'3.15.0-beta.1';
  _exports.PARTIALS = PARTIALS;
  var GLOBALS_RESOLVER = !!'3.16.0-beta.1';
  _exports.GLOBALS_RESOLVER = GLOBALS_RESOLVER;
});
define("@ember/error/index", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  /**
   @module @ember/error
  */

  /**
    The JavaScript Error object used by Ember.assert.
  
    @class Error
    @namespace Ember
    @extends Error
    @constructor
    @public
  */
  var _default = Error;
  _exports.default = _default;
});
define("@ember/polyfills/index", ["exports", "@ember/deprecated-features", "@ember/polyfills/lib/merge", "@ember/polyfills/lib/assign"], function (_exports, _deprecatedFeatures, _merge, _assign) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "assign", {
    enumerable: true,
    get: function get() {
      return _assign.default;
    }
  });
  Object.defineProperty(_exports, "assignPolyfill", {
    enumerable: true,
    get: function get() {
      return _assign.assign;
    }
  });
  _exports.hasPropertyAccessors = _exports.merge = void 0;
  var merge = _deprecatedFeatures.MERGE ? _merge.default : undefined; // Export `assignPolyfill` for testing

  _exports.merge = merge;
  var hasPropertyAccessors = true;
  _exports.hasPropertyAccessors = hasPropertyAccessors;
});
define("@ember/polyfills/lib/assign", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.assign = assign;
  _exports.default = void 0;

  /**
   @module @ember/polyfills
  */

  /**
    Copy properties from a source object to a target object. Source arguments remain unchanged.
  
    ```javascript
    import { assign } from '@ember/polyfills';
  
    var a = { first: 'Yehuda' };
    var b = { last: 'Katz' };
    var c = { company: 'Other Company' };
    var d = { company: 'Tilde Inc.' };
    assign(a, b, c, d); // a === { first: 'Yehuda', last: 'Katz', company: 'Tilde Inc.' };
    ```
  
    @method assign
    @for @ember/polyfills
    @param {Object} target The object to assign into
    @param {Object} ...args The objects to copy properties from
    @return {Object}
    @public
    @static
  */
  function assign(target) {
    for (var i = 1; i < arguments.length; i++) {
      var arg = arguments[i];

      if (!arg) {
        continue;
      }

      var updates = Object.keys(arg);

      for (var _i = 0; _i < updates.length; _i++) {
        var prop = updates[_i];
        target[prop] = arg[prop];
      }
    }

    return target;
  } // Note: We use the bracket notation so
  //       that the babel plugin does not
  //       transform it.
  // https://www.npmjs.com/package/babel-plugin-transform-object-assign


  var _assign = Object.assign;

  var _default = _assign || assign;

  _exports.default = _default;
});
define("@ember/polyfills/lib/merge", ["exports", "@ember/debug"], function (_exports, _debug) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  /**
    Merge the contents of two objects together into the first object.
  
    ```javascript
    import { merge } from '@ember/polyfills';
  
    merge({ first: 'Tom' }, { last: 'Dale' }); // { first: 'Tom', last: 'Dale' }
    var a = { first: 'Yehuda' };
    var b = { last: 'Katz' };
    merge(a, b); // a == { first: 'Yehuda', last: 'Katz' }, b == { last: 'Katz' }
    ```
  
    @method merge
    @static
    @for @ember/polyfills
    @param {Object} original The object to merge into
    @param {Object} updates The object to copy properties from
    @return {Object}
    @deprecated
    @public
  */
  function merge(original, updates) {
    (true && !(false) && (0, _debug.deprecate)('Use of `merge` has been deprecated. Please use `assign` instead.', false, {
      id: 'ember-polyfills.deprecate-merge',
      until: '4.0.0',
      url: 'https://deprecations.emberjs.com/v3.x/#toc_ember-polyfills-deprecate-merge',
      for: 'ember-source',
      since: {
        enabled: '3.6.0-beta.1'
      }
    }));

    if (updates === null || typeof updates !== 'object') {
      return original;
    }

    var props = Object.keys(updates);
    var prop;

    for (var i = 0; i < props.length; i++) {
      prop = props[i];
      original[prop] = updates[prop];
    }

    return original;
  }

  var _default = merge;
  _exports.default = _default;
});
define("@glimmer/compiler", ["exports", "ember-babel", "@glimmer/syntax", "@glimmer/util"], function (_exports, _emberBabel, _syntax, _util) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.precompile = precompile;
  _exports.precompileJSON = precompileJSON;
  _exports.buildStatement = buildStatement;
  _exports.buildStatements = buildStatements;
  _exports.s = s;
  _exports.c = c;
  _exports.unicode = unicode;
  _exports.WireFormatDebugger = _exports.NEWLINE = _exports.ProgramSymbols = _exports.defaultId = void 0;

  var _CurriedTypeToReadabl;

  var Template = /*#__PURE__*/function (_node$fields) {
    (0, _emberBabel.inheritsLoose)(Template, _node$fields);

    function Template() {
      return _node$fields.apply(this, arguments) || this;
    }

    return Template;
  }((0, _syntax.node)('Template').fields());

  var InElement = /*#__PURE__*/function (_node$fields2) {
    (0, _emberBabel.inheritsLoose)(InElement, _node$fields2);

    function InElement() {
      return _node$fields2.apply(this, arguments) || this;
    }

    return InElement;
  }((0, _syntax.node)('InElement').fields());

  var Not = /*#__PURE__*/function (_node$fields3) {
    (0, _emberBabel.inheritsLoose)(Not, _node$fields3);

    function Not() {
      return _node$fields3.apply(this, arguments) || this;
    }

    return Not;
  }((0, _syntax.node)('Not').fields());

  var If = /*#__PURE__*/function (_node$fields4) {
    (0, _emberBabel.inheritsLoose)(If, _node$fields4);

    function If() {
      return _node$fields4.apply(this, arguments) || this;
    }

    return If;
  }((0, _syntax.node)('If').fields());

  var IfInline = /*#__PURE__*/function (_node$fields5) {
    (0, _emberBabel.inheritsLoose)(IfInline, _node$fields5);

    function IfInline() {
      return _node$fields5.apply(this, arguments) || this;
    }

    return IfInline;
  }((0, _syntax.node)('IfInline').fields());

  var Each = /*#__PURE__*/function (_node$fields6) {
    (0, _emberBabel.inheritsLoose)(Each, _node$fields6);

    function Each() {
      return _node$fields6.apply(this, arguments) || this;
    }

    return Each;
  }((0, _syntax.node)('Each').fields());

  var With = /*#__PURE__*/function (_node$fields7) {
    (0, _emberBabel.inheritsLoose)(With, _node$fields7);

    function With() {
      return _node$fields7.apply(this, arguments) || this;
    }

    return With;
  }((0, _syntax.node)('With').fields());

  var Let = /*#__PURE__*/function (_node$fields8) {
    (0, _emberBabel.inheritsLoose)(Let, _node$fields8);

    function Let() {
      return _node$fields8.apply(this, arguments) || this;
    }

    return Let;
  }((0, _syntax.node)('Let').fields());

  var WithDynamicVars = /*#__PURE__*/function (_node$fields9) {
    (0, _emberBabel.inheritsLoose)(WithDynamicVars, _node$fields9);

    function WithDynamicVars() {
      return _node$fields9.apply(this, arguments) || this;
    }

    return WithDynamicVars;
  }((0, _syntax.node)('WithDynamicVars').fields());

  var GetDynamicVar = /*#__PURE__*/function (_node$fields10) {
    (0, _emberBabel.inheritsLoose)(GetDynamicVar, _node$fields10);

    function GetDynamicVar() {
      return _node$fields10.apply(this, arguments) || this;
    }

    return GetDynamicVar;
  }((0, _syntax.node)('GetDynamicVar').fields());

  var Log = /*#__PURE__*/function (_node$fields11) {
    (0, _emberBabel.inheritsLoose)(Log, _node$fields11);

    function Log() {
      return _node$fields11.apply(this, arguments) || this;
    }

    return Log;
  }((0, _syntax.node)('Log').fields());

  var InvokeComponent = /*#__PURE__*/function (_node$fields12) {
    (0, _emberBabel.inheritsLoose)(InvokeComponent, _node$fields12);

    function InvokeComponent() {
      return _node$fields12.apply(this, arguments) || this;
    }

    return InvokeComponent;
  }((0, _syntax.node)('InvokeComponent').fields());

  var _NamedBlocks = /*#__PURE__*/function (_node$fields13) {
    (0, _emberBabel.inheritsLoose)(NamedBlocks, _node$fields13);

    function NamedBlocks() {
      return _node$fields13.apply(this, arguments) || this;
    }

    return NamedBlocks;
  }((0, _syntax.node)('NamedBlocks').fields());

  var _NamedBlock = /*#__PURE__*/function (_node$fields14) {
    (0, _emberBabel.inheritsLoose)(NamedBlock, _node$fields14);

    function NamedBlock() {
      return _node$fields14.apply(this, arguments) || this;
    }

    return NamedBlock;
  }((0, _syntax.node)('NamedBlock').fields());

  var EndBlock = /*#__PURE__*/function (_node$fields15) {
    (0, _emberBabel.inheritsLoose)(EndBlock, _node$fields15);

    function EndBlock() {
      return _node$fields15.apply(this, arguments) || this;
    }

    return EndBlock;
  }((0, _syntax.node)('EndBlock').fields());

  var AppendTrustedHTML = /*#__PURE__*/function (_node$fields16) {
    (0, _emberBabel.inheritsLoose)(AppendTrustedHTML, _node$fields16);

    function AppendTrustedHTML() {
      return _node$fields16.apply(this, arguments) || this;
    }

    return AppendTrustedHTML;
  }((0, _syntax.node)('AppendTrustedHTML').fields());

  var AppendTextNode = /*#__PURE__*/function (_node$fields17) {
    (0, _emberBabel.inheritsLoose)(AppendTextNode, _node$fields17);

    function AppendTextNode() {
      return _node$fields17.apply(this, arguments) || this;
    }

    return AppendTextNode;
  }((0, _syntax.node)('AppendTextNode').fields());

  var AppendComment = /*#__PURE__*/function (_node$fields18) {
    (0, _emberBabel.inheritsLoose)(AppendComment, _node$fields18);

    function AppendComment() {
      return _node$fields18.apply(this, arguments) || this;
    }

    return AppendComment;
  }((0, _syntax.node)('AppendComment').fields());

  var Component = /*#__PURE__*/function (_node$fields19) {
    (0, _emberBabel.inheritsLoose)(Component, _node$fields19);

    function Component() {
      return _node$fields19.apply(this, arguments) || this;
    }

    return Component;
  }((0, _syntax.node)('Component').fields());

  var StaticAttr = /*#__PURE__*/function (_node$fields20) {
    (0, _emberBabel.inheritsLoose)(StaticAttr, _node$fields20);

    function StaticAttr() {
      return _node$fields20.apply(this, arguments) || this;
    }

    return StaticAttr;
  }((0, _syntax.node)('StaticAttr').fields());

  var DynamicAttr = /*#__PURE__*/function (_node$fields21) {
    (0, _emberBabel.inheritsLoose)(DynamicAttr, _node$fields21);

    function DynamicAttr() {
      return _node$fields21.apply(this, arguments) || this;
    }

    return DynamicAttr;
  }((0, _syntax.node)('DynamicAttr').fields());

  var SimpleElement = /*#__PURE__*/function (_node$fields22) {
    (0, _emberBabel.inheritsLoose)(SimpleElement, _node$fields22);

    function SimpleElement() {
      return _node$fields22.apply(this, arguments) || this;
    }

    return SimpleElement;
  }((0, _syntax.node)('SimpleElement').fields());

  var ElementParameters = /*#__PURE__*/function (_node$fields23) {
    (0, _emberBabel.inheritsLoose)(ElementParameters, _node$fields23);

    function ElementParameters() {
      return _node$fields23.apply(this, arguments) || this;
    }

    return ElementParameters;
  }((0, _syntax.node)('ElementParameters').fields());

  var Yield = /*#__PURE__*/function (_node$fields24) {
    (0, _emberBabel.inheritsLoose)(Yield, _node$fields24);

    function Yield() {
      return _node$fields24.apply(this, arguments) || this;
    }

    return Yield;
  }((0, _syntax.node)('Yield').fields());

  var Partial = /*#__PURE__*/function (_node$fields25) {
    (0, _emberBabel.inheritsLoose)(Partial, _node$fields25);

    function Partial() {
      return _node$fields25.apply(this, arguments) || this;
    }

    return Partial;
  }((0, _syntax.node)('Partial').fields());

  var Debugger = /*#__PURE__*/function (_node$fields26) {
    (0, _emberBabel.inheritsLoose)(Debugger, _node$fields26);

    function Debugger() {
      return _node$fields26.apply(this, arguments) || this;
    }

    return Debugger;
  }((0, _syntax.node)('Debugger').fields());

  var _CallExpression = /*#__PURE__*/function (_node$fields27) {
    (0, _emberBabel.inheritsLoose)(CallExpression, _node$fields27);

    function CallExpression() {
      return _node$fields27.apply(this, arguments) || this;
    }

    return CallExpression;
  }((0, _syntax.node)('CallExpression').fields());

  var DeprecatedCallExpression = /*#__PURE__*/function (_node$fields28) {
    (0, _emberBabel.inheritsLoose)(DeprecatedCallExpression, _node$fields28);

    function DeprecatedCallExpression() {
      return _node$fields28.apply(this, arguments) || this;
    }

    return DeprecatedCallExpression;
  }((0, _syntax.node)('DeprecatedCallExpression').fields());

  var Modifier = /*#__PURE__*/function (_node$fields29) {
    (0, _emberBabel.inheritsLoose)(Modifier, _node$fields29);

    function Modifier() {
      return _node$fields29.apply(this, arguments) || this;
    }

    return Modifier;
  }((0, _syntax.node)('Modifier').fields());

  var _InvokeBlock = /*#__PURE__*/function (_node$fields30) {
    (0, _emberBabel.inheritsLoose)(InvokeBlock, _node$fields30);

    function InvokeBlock() {
      return _node$fields30.apply(this, arguments) || this;
    }

    return InvokeBlock;
  }((0, _syntax.node)('InvokeBlock').fields());

  var SplatAttr = /*#__PURE__*/function (_node$fields31) {
    (0, _emberBabel.inheritsLoose)(SplatAttr, _node$fields31);

    function SplatAttr() {
      return _node$fields31.apply(this, arguments) || this;
    }

    return SplatAttr;
  }((0, _syntax.node)('SplatAttr').fields());

  var _PathExpression = /*#__PURE__*/function (_node$fields32) {
    (0, _emberBabel.inheritsLoose)(PathExpression, _node$fields32);

    function PathExpression() {
      return _node$fields32.apply(this, arguments) || this;
    }

    return PathExpression;
  }((0, _syntax.node)('PathExpression').fields());

  var GetWithResolver = /*#__PURE__*/function (_node$fields33) {
    (0, _emberBabel.inheritsLoose)(GetWithResolver, _node$fields33);

    function GetWithResolver() {
      return _node$fields33.apply(this, arguments) || this;
    }

    return GetWithResolver;
  }((0, _syntax.node)('GetWithResolver').fields());

  var GetSymbol = /*#__PURE__*/function (_node$fields34) {
    (0, _emberBabel.inheritsLoose)(GetSymbol, _node$fields34);

    function GetSymbol() {
      return _node$fields34.apply(this, arguments) || this;
    }

    return GetSymbol;
  }((0, _syntax.node)('GetSymbol').fields());

  var GetFreeWithContext = /*#__PURE__*/function (_node$fields35) {
    (0, _emberBabel.inheritsLoose)(GetFreeWithContext, _node$fields35);

    function GetFreeWithContext() {
      return _node$fields35.apply(this, arguments) || this;
    }

    return GetFreeWithContext;
  }((0, _syntax.node)('GetFreeWithContext').fields());
  /** strict mode */


  var GetFree = /*#__PURE__*/function (_node$fields36) {
    (0, _emberBabel.inheritsLoose)(GetFree, _node$fields36);

    function GetFree() {
      return _node$fields36.apply(this, arguments) || this;
    }

    return GetFree;
  }((0, _syntax.node)('GetFree').fields());

  var Missing = /*#__PURE__*/function (_node$fields37) {
    (0, _emberBabel.inheritsLoose)(Missing, _node$fields37);

    function Missing() {
      return _node$fields37.apply(this, arguments) || this;
    }

    return Missing;
  }((0, _syntax.node)('Missing').fields());

  var InterpolateExpression = /*#__PURE__*/function (_node$fields38) {
    (0, _emberBabel.inheritsLoose)(InterpolateExpression, _node$fields38);

    function InterpolateExpression() {
      return _node$fields38.apply(this, arguments) || this;
    }

    return InterpolateExpression;
  }((0, _syntax.node)('InterpolateExpression').fields());

  var HasBlock = /*#__PURE__*/function (_node$fields39) {
    (0, _emberBabel.inheritsLoose)(HasBlock, _node$fields39);

    function HasBlock() {
      return _node$fields39.apply(this, arguments) || this;
    }

    return HasBlock;
  }((0, _syntax.node)('HasBlock').fields());

  var HasBlockParams = /*#__PURE__*/function (_node$fields40) {
    (0, _emberBabel.inheritsLoose)(HasBlockParams, _node$fields40);

    function HasBlockParams() {
      return _node$fields40.apply(this, arguments) || this;
    }

    return HasBlockParams;
  }((0, _syntax.node)('HasBlockParams').fields());

  var Curry = /*#__PURE__*/function (_node$fields41) {
    (0, _emberBabel.inheritsLoose)(Curry, _node$fields41);

    function Curry() {
      return _node$fields41.apply(this, arguments) || this;
    }

    return Curry;
  }((0, _syntax.node)('Curry').fields());

  var _Positional = /*#__PURE__*/function (_node$fields42) {
    (0, _emberBabel.inheritsLoose)(Positional, _node$fields42);

    function Positional() {
      return _node$fields42.apply(this, arguments) || this;
    }

    return Positional;
  }((0, _syntax.node)('Positional').fields());

  var _NamedArguments = /*#__PURE__*/function (_node$fields43) {
    (0, _emberBabel.inheritsLoose)(NamedArguments, _node$fields43);

    function NamedArguments() {
      return _node$fields43.apply(this, arguments) || this;
    }

    return NamedArguments;
  }((0, _syntax.node)('NamedArguments').fields());

  var NamedArgument = /*#__PURE__*/function (_node$fields44) {
    (0, _emberBabel.inheritsLoose)(NamedArgument, _node$fields44);

    function NamedArgument() {
      return _node$fields44.apply(this, arguments) || this;
    }

    return NamedArgument;
  }((0, _syntax.node)('NamedArgument').fields());

  var _Args = /*#__PURE__*/function (_node$fields45) {
    (0, _emberBabel.inheritsLoose)(Args, _node$fields45);

    function Args() {
      return _node$fields45.apply(this, arguments) || this;
    }

    return Args;
  }((0, _syntax.node)('Args').fields());

  var Tail = /*#__PURE__*/function (_node$fields46) {
    (0, _emberBabel.inheritsLoose)(Tail, _node$fields46);

    function Tail() {
      return _node$fields46.apply(this, arguments) || this;
    }

    return Tail;
  }((0, _syntax.node)('Tail').fields());

  var PresentList = /*#__PURE__*/function () {
    function PresentList(list) {
      this.list = list;
    }

    var _proto = PresentList.prototype;

    _proto.toArray = function toArray() {
      return this.list;
    };

    _proto.map = function map(callback) {
      var result = (0, _util.mapPresent)(this.list, callback);
      return new PresentList(result);
    };

    _proto.filter = function filter(predicate) {
      var out = [];

      for (var _iterator = (0, _emberBabel.createForOfIteratorHelperLoose)(this.list), _step; !(_step = _iterator()).done;) {
        var _item = _step.value;

        if (predicate(_item)) {
          out.push(_item);
        }
      }

      return OptionalList(out);
    };

    _proto.toPresentArray = function toPresentArray() {
      return this.list;
    };

    _proto.into = function into(_ref) {
      var ifPresent = _ref.ifPresent;
      return ifPresent(this);
    };

    return PresentList;
  }();

  var EmptyList = /*#__PURE__*/function () {
    function EmptyList() {
      this.list = [];
    }

    var _proto2 = EmptyList.prototype;

    _proto2.map = function map(_callback) {
      return new EmptyList();
    };

    _proto2.filter = function filter(_predicate) {
      return new EmptyList();
    };

    _proto2.toArray = function toArray() {
      return this.list;
    };

    _proto2.toPresentArray = function toPresentArray() {
      return null;
    };

    _proto2.into = function into(_ref2) {
      var ifEmpty = _ref2.ifEmpty;
      return ifEmpty();
    };

    return EmptyList;
  }(); // export type OptionalList<T> = PresentList<T> | EmptyList<T>;


  function OptionalList(value) {
    if ((0, _util.isPresent)(value)) {
      return new PresentList(value);
    } else {
      return new EmptyList();
    }
  }

  var ResultImpl = /*#__PURE__*/function () {
    function ResultImpl() {}

    ResultImpl.all = function all() {
      var out = [];

      for (var _len = arguments.length, results = new Array(_len), _key = 0; _key < _len; _key++) {
        results[_key] = arguments[_key];
      }

      for (var _i = 0, _results = results; _i < _results.length; _i++) {
        var _result = _results[_i];

        if (_result.isErr) {
          return _result.cast();
        } else {
          out.push(_result.value);
        }
      }

      return Ok(out);
    };

    return ResultImpl;
  }();

  var Result = ResultImpl;

  var OkImpl = /*#__PURE__*/function (_ResultImpl) {
    (0, _emberBabel.inheritsLoose)(OkImpl, _ResultImpl);

    function OkImpl(value) {
      var _this;

      _this = _ResultImpl.call(this) || this;
      _this.value = value;
      _this.isOk = true;
      _this.isErr = false;
      return _this;
    }

    var _proto3 = OkImpl.prototype;

    _proto3.expect = function expect(_message) {
      return this.value;
    };

    _proto3.ifOk = function ifOk(callback) {
      callback(this.value);
      return this;
    };

    _proto3.andThen = function andThen(callback) {
      return callback(this.value);
    };

    _proto3.mapOk = function mapOk(callback) {
      return Ok(callback(this.value));
    };

    _proto3.ifErr = function ifErr(_callback) {
      return this;
    };

    _proto3.mapErr = function mapErr(_callback) {
      return this;
    };

    return OkImpl;
  }(ResultImpl);

  var ErrImpl = /*#__PURE__*/function (_ResultImpl2) {
    (0, _emberBabel.inheritsLoose)(ErrImpl, _ResultImpl2);

    function ErrImpl(reason) {
      var _this2;

      _this2 = _ResultImpl2.call(this) || this;
      _this2.reason = reason;
      _this2.isOk = false;
      _this2.isErr = true;
      return _this2;
    }

    var _proto4 = ErrImpl.prototype;

    _proto4.expect = function expect(message) {
      throw new Error(message || 'expected an Ok, got Err');
    };

    _proto4.andThen = function andThen(_callback) {
      return this.cast();
    };

    _proto4.mapOk = function mapOk(_callback) {
      return this.cast();
    };

    _proto4.ifOk = function ifOk(_callback) {
      return this;
    };

    _proto4.mapErr = function mapErr(callback) {
      return Err(callback(this.reason));
    };

    _proto4.ifErr = function ifErr(callback) {
      callback(this.reason);
      return this;
    };

    _proto4.cast = function cast() {
      return this;
    };

    return ErrImpl;
  }(ResultImpl);

  function Ok(value) {
    return new OkImpl(value);
  }

  function Err(reason) {
    return new ErrImpl(reason);
  }

  var ResultArray = /*#__PURE__*/function () {
    function ResultArray(items) {
      if (items === void 0) {
        items = [];
      }

      this.items = items;
    }

    var _proto5 = ResultArray.prototype;

    _proto5.add = function add(item) {
      this.items.push(item);
    };

    _proto5.toArray = function toArray() {
      var err = this.items.filter(function (item) {
        return item instanceof ErrImpl;
      })[0];

      if (err !== undefined) {
        return err.cast();
      } else {
        return Ok(this.items.map(function (item) {
          return item.value;
        }));
      }
    };

    _proto5.toOptionalList = function toOptionalList() {
      return this.toArray().mapOk(function (arr) {
        return OptionalList(arr);
      });
    };

    return ResultArray;
  }();

  var KeywordImpl = /*#__PURE__*/function () {
    function KeywordImpl(keyword, type, delegate) {
      this.keyword = keyword;
      this.delegate = delegate;
      var nodes = new Set();

      for (var _iterator2 = (0, _emberBabel.createForOfIteratorHelperLoose)(KEYWORD_NODES[type]), _step2; !(_step2 = _iterator2()).done;) {
        var _nodeType = _step2.value;
        nodes.add(_nodeType);
      }

      this.types = nodes;
    }

    var _proto6 = KeywordImpl.prototype;

    _proto6.match = function match(node$$1) {
      if (!this.types.has(node$$1.type)) {
        return false;
      }

      var path = getCalleeExpression(node$$1);

      if (path !== null && path.type === 'Path' && path.ref.type === 'Free') {
        if (path.tail.length > 0) {
          if (path.ref.resolution.serialize() === 'Loose') {
            // cannot be a keyword reference, keywords do not allow paths (must be
            // relying on implicit this fallback)
            return false;
          }
        }

        return path.ref.name === this.keyword;
      } else {
        return false;
      }
    };

    _proto6.translate = function translate(node$$1, state) {
      var _this3 = this;

      if (this.match(node$$1)) {
        var path = getCalleeExpression(node$$1);

        if (path !== null && path.type === 'Path' && path.tail.length > 0) {
          return Err((0, _syntax.generateSyntaxError)("The `" + this.keyword + "` keyword was used incorrectly. It was used as `" + path.loc.asString() + "`, but it cannot be used with additional path segments. \n\nError caused by", node$$1.loc));
        }

        var param = this.delegate.assert(node$$1, state);
        return param.andThen(function (param) {
          return _this3.delegate.translate({
            node: node$$1,
            state: state
          }, param);
        });
      } else {
        return null;
      }
    };

    return KeywordImpl;
  }();

  var KEYWORD_NODES = {
    Call: ['Call'],
    Block: ['InvokeBlock'],
    Append: ['AppendContent'],
    Modifier: ['ElementModifier']
  };

  function keyword(keyword, type, delegate) {
    return new KeywordImpl(keyword, type, delegate);
  }

  function getCalleeExpression(node$$1) {
    switch (node$$1.type) {
      // This covers the inside of attributes and expressions, as well as the callee
      // of call nodes
      case 'Path':
        return node$$1;

      case 'AppendContent':
        return getCalleeExpression(node$$1.value);

      case 'Call':
      case 'InvokeBlock':
      case 'ElementModifier':
        return node$$1.callee;

      default:
        return null;
    }
  }

  var Keywords = /*#__PURE__*/function () {
    function Keywords(type) {
      this._keywords = [];
      this._type = type;
    }

    var _proto7 = Keywords.prototype;

    _proto7.kw = function kw(name, delegate) {
      this._keywords.push(keyword(name, this._type, delegate));

      return this;
    };

    _proto7.translate = function translate(node$$1, state) {
      for (var _iterator3 = (0, _emberBabel.createForOfIteratorHelperLoose)(this._keywords), _step3; !(_step3 = _iterator3()).done;) {
        var _keyword2 = _step3.value;

        var _result2 = _keyword2.translate(node$$1, state);

        if (_result2 !== null) {
          return _result2;
        }
      }

      var path = getCalleeExpression(node$$1);

      if (path && path.type === 'Path' && path.ref.type === 'Free' && (0, _syntax.isKeyword)(path.ref.name)) {
        var name = path.ref.name;
        var usedType = this._type;
        var validTypes = _syntax.KEYWORDS_TYPES[name];

        if (validTypes.indexOf(usedType) === -1) {
          return Err((0, _syntax.generateSyntaxError)("The `" + name + "` keyword was used incorrectly. It was used as " + typesToReadableName[usedType] + ", but its valid usages are:\n\n" + generateTypesMessage(name, validTypes) + "\n\nError caused by", node$$1.loc));
        }
      }

      return null;
    };

    return Keywords;
  }();

  var typesToReadableName = {
    Append: 'an append statement',
    Block: 'a block statement',
    Call: 'a call expression',
    Modifier: 'a modifier'
  };

  function generateTypesMessage(name, types) {
    return types.map(function (type) {
      switch (type) {
        case 'Append':
          return "- As an append statement, as in: {{" + name + "}}";

        case 'Block':
          return "- As a block statement, as in: {{#" + name + "}}{{/" + name + "}}";

        case 'Call':
          return "- As an expression, as in: (" + name + ")";

        case 'Modifier':
          return "- As a modifier, as in: <div {{" + name + "}}></div>";

        default:
          return (0, _util.exhausted)(type);
      }
    }).join('\n\n');
  }
  /**
   * This function builds keyword definitions for a particular type of AST node (`KeywordType`).
   *
   * You can build keyword definitions for:
   *
   * - `Expr`: A `SubExpression` or `PathExpression`
   * - `Block`: A `BlockStatement`
   *   - A `BlockStatement` is a keyword candidate if its head is a
   *     `PathExpression`
   * - `Append`: An `AppendStatement`
   *
   * A node is a keyword candidate if:
   *
   * - A `PathExpression` is a keyword candidate if it has no tail, and its
   *   head expression is a `LocalVarHead` or `FreeVarHead` whose name is
   *   the keyword's name.
   * - A `SubExpression`, `AppendStatement`, or `BlockStatement` is a keyword
   *   candidate if its head is a keyword candidate.
   *
   * The keyword infrastructure guarantees that:
   *
   * - If a node is not a keyword candidate, it is never passed to any keyword's
   *   `assert` method.
   * - If a node is not the `KeywordType` for a particular keyword, it will not
   *   be passed to the keyword's `assert` method.
   *
   * `Expr` keywords are used in expression positions and should return HIR
   * expressions. `Block` and `Append` keywords are used in statement
   * positions and should return HIR statements.
   *
   * A keyword definition has two parts:
   *
   * - `match`, which determines whether an AST node matches the keyword, and can
   *   optionally return some information extracted from the AST node.
   * - `translate`, which takes a matching AST node as well as the extracted
   *   information and returns an appropriate HIR instruction.
   *
   * # Example
   *
   * This keyword:
   *
   * - turns `(hello)` into `"hello"`
   *   - as long as `hello` is not in scope
   * - makes it an error to pass any arguments (such as `(hello world)`)
   *
   * ```ts
   * keywords('SubExpr').kw('hello', {
   *   assert(node: ExprKeywordNode): Result<void> | false {
   *     // we don't want to transform `hello` as a `PathExpression`
   *     if (node.type !== 'SubExpression') {
   *       return false;
   *     }
   *
   *     // node.head would be `LocalVarHead` if `hello` was in scope
   *     if (node.head.type !== 'FreeVarHead') {
   *       return false;
   *     }
   *
   *     if (node.params.length || node.hash) {
   *       return Err(generateSyntaxError(`(hello) does not take any arguments`), node.loc);
   *     } else {
   *       return Ok();
   *     }
   *   },
   *
   *   translate(node: ASTv2.SubExpression): hir.Expression {
   *     return ASTv2.builders.literal("hello", node.loc)
   *   }
   * })
   * ```
   *
   * The keyword infrastructure checks to make sure that the node is the right
   * type before calling `assert`, so you only need to consider `SubExpression`
   * and `PathExpression` here. It also checks to make sure that the node passed
   * to `assert` has the keyword name in the right place.
   *
   * Note the important difference between returning `false` from `assert`,
   * which just means that the node didn't match, and returning `Err`, which
   * means that the node matched, but there was a keyword-specific syntax
   * error.
   */


  function keywords(type) {
    return new Keywords(type);
  }

  function hasPath(node$$1) {
    return node$$1.callee.type === 'Path';
  }

  function isHelperInvocation(node$$1) {
    if (!hasPath(node$$1)) {
      return false;
    }

    return !node$$1.args.isEmpty();
  }

  function isSimplePath(path) {
    if (path.type === 'Path') {
      var head = path.ref,
          parts = path.tail;
      return head.type === 'Free' && head.resolution !== _syntax.ASTv2.STRICT_RESOLUTION && parts.length === 0;
    } else {
      return false;
    }
  }

  function isStrictHelper(expr) {
    if (expr.callee.type !== 'Path') {
      return true;
    }

    if (expr.callee.ref.type !== 'Free') {
      return true;
    }

    return expr.callee.ref.resolution === _syntax.ASTv2.STRICT_RESOLUTION;
  }

  function assertIsValidModifier(helper) {
    if (isStrictHelper(helper) || isSimplePath(helper.callee)) {
      return;
    }

    throw (0, _syntax.generateSyntaxError)("`" + printPath(helper.callee) + "` is not a valid name for a modifier", helper.loc);
  }

  function printPath(path) {
    switch (path.type) {
      case 'Literal':
        return JSON.stringify(path.value);

      case 'Path':
        {
          var printedPath = [printPathHead(path.ref)];
          printedPath.push.apply(printedPath, path.tail.map(function (t) {
            return t.chars;
          }));
          return printedPath.join('.');
        }

      case 'Call':
        return "(" + printPath(path.callee) + " ...)";

      case 'DeprecatedCall':
        return "" + path.callee.name;

      case 'Interpolate':
        throw (0, _util.unreachable)('a concat statement cannot appear as the head of an expression');
    }
  }

  function printPathHead(head) {
    switch (head.type) {
      case 'Arg':
        return head.name.chars;

      case 'Free':
      case 'Local':
        return head.name;

      case 'This':
        return 'this';
    }
  }

  var NormalizeExpressions = /*#__PURE__*/function () {
    function NormalizeExpressions() {}

    var _proto8 = NormalizeExpressions.prototype;

    _proto8.visit = function visit(node$$1, state) {
      switch (node$$1.type) {
        case 'Literal':
          return Ok(this.Literal(node$$1));

        case 'Interpolate':
          return this.Interpolate(node$$1, state);

        case 'Path':
          return this.PathExpression(node$$1);

        case 'Call':
          var translated = CALL_KEYWORDS.translate(node$$1, state);

          if (translated !== null) {
            return translated;
          }

          return this.CallExpression(node$$1, state);

        case 'DeprecatedCall':
          return this.DeprecaedCallExpression(node$$1, state);
      }
    };

    _proto8.visitList = function visitList(nodes, state) {
      return new ResultArray(nodes.map(function (e) {
        return VISIT_EXPRS.visit(e, state);
      })).toOptionalList();
    }
    /**
     * Normalize paths into `hir.Path` or a `hir.Expr` that corresponds to the ref.
     *
     * TODO since keywords don't support tails anyway, distinguish PathExpression from
     * VariableReference in ASTv2.
     */
    ;

    _proto8.PathExpression = function PathExpression(path) {
      var ref = this.VariableReference(path.ref);
      var tail = path.tail;

      if ((0, _util.isPresent)(tail)) {
        var tailLoc = tail[0].loc.extend(tail[tail.length - 1].loc);
        return Ok(new _PathExpression({
          loc: path.loc,
          head: ref,
          tail: new Tail({
            loc: tailLoc,
            members: tail
          })
        }));
      } else {
        return Ok(ref);
      }
    };

    _proto8.VariableReference = function VariableReference(ref) {
      return ref;
    };

    _proto8.Literal = function Literal(literal) {
      return literal;
    };

    _proto8.Interpolate = function Interpolate(expr, state) {
      var parts = expr.parts.map(convertPathToCallIfKeyword);
      return VISIT_EXPRS.visitList(parts, state).mapOk(function (parts) {
        return new InterpolateExpression({
          loc: expr.loc,
          parts: parts
        });
      });
    };

    _proto8.CallExpression = function CallExpression(expr, state) {
      if (!hasPath(expr)) {
        throw new Error("unimplemented subexpression at the head of a subexpression");
      } else {
        return Result.all(VISIT_EXPRS.visit(expr.callee, state), VISIT_EXPRS.Args(expr.args, state)).mapOk(function (_ref3) {
          var callee = _ref3[0],
              args = _ref3[1];
          return new _CallExpression({
            loc: expr.loc,
            callee: callee,
            args: args
          });
        });
      }
    };

    _proto8.DeprecaedCallExpression = function DeprecaedCallExpression(_ref4, _state) {
      var arg = _ref4.arg,
          callee = _ref4.callee,
          loc = _ref4.loc;
      return Ok(new DeprecatedCallExpression({
        loc: loc,
        arg: arg,
        callee: callee
      }));
    };

    _proto8.Args = function Args(_ref5, state) {
      var positional = _ref5.positional,
          named = _ref5.named,
          loc = _ref5.loc;
      return Result.all(this.Positional(positional, state), this.NamedArguments(named, state)).mapOk(function (_ref6) {
        var positional = _ref6[0],
            named = _ref6[1];
        return new _Args({
          loc: loc,
          positional: positional,
          named: named
        });
      });
    };

    _proto8.Positional = function Positional(positional, state) {
      return VISIT_EXPRS.visitList(positional.exprs, state).mapOk(function (list) {
        return new _Positional({
          loc: positional.loc,
          list: list
        });
      });
    };

    _proto8.NamedArguments = function NamedArguments(named, state) {
      var pairs = named.entries.map(function (arg) {
        var value = convertPathToCallIfKeyword(arg.value);
        return VISIT_EXPRS.visit(value, state).mapOk(function (value) {
          return new NamedArgument({
            loc: arg.loc,
            key: arg.name,
            value: value
          });
        });
      });
      return new ResultArray(pairs).toOptionalList().mapOk(function (pairs) {
        return new _NamedArguments({
          loc: named.loc,
          entries: pairs
        });
      });
    };

    return NormalizeExpressions;
  }();

  function convertPathToCallIfKeyword(path) {
    if (path.type === 'Path' && path.ref.type === 'Free' && path.ref.name in _syntax.KEYWORDS_TYPES) {
      return new _syntax.ASTv2.CallExpression({
        callee: path,
        args: _syntax.ASTv2.Args.empty(path.loc),
        loc: path.loc
      });
    }

    return path;
  }

  var VISIT_EXPRS = new NormalizeExpressions();
  var CurriedTypeToReadableType = (_CurriedTypeToReadabl = {}, _CurriedTypeToReadabl[0
  /* Component */
  ] = 'component', _CurriedTypeToReadabl[1
  /* Helper */
  ] = 'helper', _CurriedTypeToReadabl[2
  /* Modifier */
  ] = 'modifier', _CurriedTypeToReadabl);

  function assertCurryKeyword(curriedType) {
    return function (node$$1, state) {
      var readableType = CurriedTypeToReadableType[curriedType];
      var stringsAllowed = curriedType === 0
      /* Component */
      ;
      var args = node$$1.args;
      var definition = args.nth(0);

      if (definition === null) {
        return Err((0, _syntax.generateSyntaxError)("(" + readableType + ") requires a " + readableType + " definition or identifier as its first positional parameter, did not receive any parameters.", args.loc));
      }

      if (definition.type === 'Literal') {
        if (stringsAllowed && state.isStrict) {
          return Err((0, _syntax.generateSyntaxError)("(" + readableType + ") cannot resolve string values in strict mode templates", node$$1.loc));
        } else if (!stringsAllowed) {
          return Err((0, _syntax.generateSyntaxError)("(" + readableType + ") cannot resolve string values, you must pass a " + readableType + " definition directly", node$$1.loc));
        }
      }

      args = new _syntax.ASTv2.Args({
        positional: new _syntax.ASTv2.PositionalArguments({
          exprs: args.positional.exprs.slice(1),
          loc: args.positional.loc
        }),
        named: args.named,
        loc: args.loc
      });
      return Ok({
        definition: definition,
        args: args
      });
    };
  }

  function translateCurryKeyword(curriedType) {
    return function (_ref7, _ref8) {
      var node$$1 = _ref7.node,
          state = _ref7.state;
      var definition = _ref8.definition,
          args = _ref8.args;
      var definitionResult = VISIT_EXPRS.visit(definition, state);
      var argsResult = VISIT_EXPRS.Args(args, state);
      return Result.all(definitionResult, argsResult).mapOk(function (_ref9) {
        var definition = _ref9[0],
            args = _ref9[1];
        return new Curry({
          loc: node$$1.loc,
          curriedType: curriedType,
          definition: definition,
          args: args
        });
      });
    };
  }

  function curryKeyword(curriedType) {
    return {
      assert: assertCurryKeyword(curriedType),
      translate: translateCurryKeyword(curriedType)
    };
  }

  function assertGetDynamicVarKeyword(node$$1) {
    var call = node$$1.type === 'AppendContent' ? node$$1.value : node$$1;
    var named = call.type === 'Call' ? call.args.named : null;
    var positionals = call.type === 'Call' ? call.args.positional : null;

    if (named && !named.isEmpty()) {
      return Err((0, _syntax.generateSyntaxError)("(-get-dynamic-vars) does not take any named arguments", node$$1.loc));
    }

    var varName = positionals === null || positionals === void 0 ? void 0 : positionals.nth(0);

    if (!varName) {
      return Err((0, _syntax.generateSyntaxError)("(-get-dynamic-vars) requires a var name to get", node$$1.loc));
    }

    if (positionals && positionals.size > 1) {
      return Err((0, _syntax.generateSyntaxError)("(-get-dynamic-vars) only receives one positional arg", node$$1.loc));
    }

    return Ok(varName);
  }

  function translateGetDynamicVarKeyword(_ref10, name) {
    var node$$1 = _ref10.node,
        state = _ref10.state;
    return VISIT_EXPRS.visit(name, state).mapOk(function (name) {
      return new GetDynamicVar({
        name: name,
        loc: node$$1.loc
      });
    });
  }

  var getDynamicVarKeyword = {
    assert: assertGetDynamicVarKeyword,
    translate: translateGetDynamicVarKeyword
  };

  function assertHasBlockKeyword(type) {
    return function (node$$1) {
      var call = node$$1.type === 'AppendContent' ? node$$1.value : node$$1;
      var named = call.type === 'Call' ? call.args.named : null;
      var positionals = call.type === 'Call' ? call.args.positional : null;

      if (named && !named.isEmpty()) {
        return Err((0, _syntax.generateSyntaxError)("(" + type + ") does not take any named arguments", call.loc));
      }

      if (!positionals || positionals.isEmpty()) {
        return Ok(_syntax.SourceSlice.synthetic('default'));
      } else if (positionals.exprs.length === 1) {
        var positional = positionals.exprs[0];

        if (_syntax.ASTv2.isLiteral(positional, 'string')) {
          return Ok(positional.toSlice());
        } else {
          return Err((0, _syntax.generateSyntaxError)("(" + type + ") can only receive a string literal as its first argument", call.loc));
        }
      } else {
        return Err((0, _syntax.generateSyntaxError)("(" + type + ") only takes a single positional argument", call.loc));
      }
    };
  }

  function translateHasBlockKeyword(type) {
    return function (_ref11, target) {
      var node$$1 = _ref11.node,
          scope = _ref11.state.scope;
      var block = type === 'has-block' ? new HasBlock({
        loc: node$$1.loc,
        target: target,
        symbol: scope.allocateBlock(target.chars)
      }) : new HasBlockParams({
        loc: node$$1.loc,
        target: target,
        symbol: scope.allocateBlock(target.chars)
      });
      return Ok(block);
    };
  }

  function hasBlockKeyword(type) {
    return {
      assert: assertHasBlockKeyword(type),
      translate: translateHasBlockKeyword(type)
    };
  }

  function assertIfUnlessInlineKeyword(type) {
    return function (originalNode) {
      var _a;

      var inverted = type === 'unless';
      var node$$1 = originalNode.type === 'AppendContent' ? originalNode.value : originalNode;
      var named = node$$1.type === 'Call' ? node$$1.args.named : null;
      var positional = node$$1.type === 'Call' ? node$$1.args.positional : null;

      if (named && !named.isEmpty()) {
        return Err((0, _syntax.generateSyntaxError)("(" + type + ") cannot receive named parameters, received " + named.entries.map(function (e) {
          return e.name.chars;
        }).join(', '), originalNode.loc));
      }

      var condition = positional === null || positional === void 0 ? void 0 : positional.nth(0);

      if (!positional || !condition) {
        return Err((0, _syntax.generateSyntaxError)("When used inline, (" + type + ") requires at least two parameters 1. the condition that determines the state of the (" + type + "), and 2. the value to return if the condition is " + (inverted ? 'false' : 'true') + ". Did not receive any parameters", originalNode.loc));
      }

      var truthy = positional.nth(1);
      var falsy = positional.nth(2);

      if (truthy === null) {
        return Err((0, _syntax.generateSyntaxError)("When used inline, (" + type + ") requires at least two parameters 1. the condition that determines the state of the (" + type + "), and 2. the value to return if the condition is " + (inverted ? 'false' : 'true') + ". Received only one parameter, the condition", originalNode.loc));
      }

      if (positional.size > 3) {
        return Err((0, _syntax.generateSyntaxError)("When used inline, (" + type + ") can receive a maximum of three positional parameters 1. the condition that determines the state of the (" + type + "), 2. the value to return if the condition is " + (inverted ? 'false' : 'true') + ", and 3. the value to return if the condition is " + (inverted ? 'true' : 'false') + ". Received " + ((_a = positional === null || positional === void 0 ? void 0 : positional.size) !== null && _a !== void 0 ? _a : 0) + " parameters", originalNode.loc));
      }

      return Ok({
        condition: condition,
        truthy: truthy,
        falsy: falsy
      });
    };
  }

  function translateIfUnlessInlineKeyword(type) {
    var inverted = type === 'unless';
    return function (_ref12, _ref13) {
      var node$$1 = _ref12.node,
          state = _ref12.state;
      var condition = _ref13.condition,
          truthy = _ref13.truthy,
          falsy = _ref13.falsy;
      var conditionResult = VISIT_EXPRS.visit(condition, state);
      var truthyResult = VISIT_EXPRS.visit(truthy, state);
      var falsyResult = falsy ? VISIT_EXPRS.visit(falsy, state) : Ok(null);
      return Result.all(conditionResult, truthyResult, falsyResult).mapOk(function (_ref14) {
        var condition = _ref14[0],
            truthy = _ref14[1],
            falsy = _ref14[2];

        if (inverted) {
          condition = new Not({
            value: condition,
            loc: node$$1.loc
          });
        }

        return new IfInline({
          loc: node$$1.loc,
          condition: condition,
          truthy: truthy,
          falsy: falsy
        });
      });
    };
  }

  function ifUnlessInlineKeyword(type) {
    return {
      assert: assertIfUnlessInlineKeyword(type),
      translate: translateIfUnlessInlineKeyword(type)
    };
  }

  function assertLogKeyword(node$$1) {
    var _node$$1$args = node$$1.args,
        named = _node$$1$args.named,
        positional = _node$$1$args.positional;

    if (named && !named.isEmpty()) {
      return Err((0, _syntax.generateSyntaxError)("(log) does not take any named arguments", node$$1.loc));
    }

    return Ok(positional);
  }

  function translateLogKeyword(_ref15, positional) {
    var node$$1 = _ref15.node,
        state = _ref15.state;
    return VISIT_EXPRS.Positional(positional, state).mapOk(function (positional) {
      return new Log({
        positional: positional,
        loc: node$$1.loc
      });
    });
  }

  var logKeyword = {
    assert: assertLogKeyword,
    translate: translateLogKeyword
  };
  var CALL_KEYWORDS = keywords('Call').kw('has-block', hasBlockKeyword('has-block')).kw('has-block-params', hasBlockKeyword('has-block-params')).kw('-get-dynamic-var', getDynamicVarKeyword).kw('log', logKeyword).kw('if', ifUnlessInlineKeyword('if')).kw('unless', ifUnlessInlineKeyword('unless')).kw('component', curryKeyword(0
  /* Component */
  )).kw('helper', curryKeyword(1
  /* Helper */
  )).kw('modifier', curryKeyword(2
  /* Modifier */
  ));

  function toAppend(_ref16) {
    var assert = _ref16.assert,
        _translate = _ref16.translate;
    return {
      assert: assert,
      translate: function translate(_ref17, value) {
        var node$$1 = _ref17.node,
            state = _ref17.state;

        var result = _translate({
          node: node$$1,
          state: state
        }, value);

        return result.mapOk(function (text) {
          return new AppendTextNode({
            text: text,
            loc: node$$1.loc
          });
        });
      }
    };
  }

  var APPEND_KEYWORDS = keywords('Append').kw('has-block', toAppend(hasBlockKeyword('has-block'))).kw('has-block-params', toAppend(hasBlockKeyword('has-block-params'))).kw('-get-dynamic-var', toAppend(getDynamicVarKeyword)).kw('log', toAppend(logKeyword)).kw('if', toAppend(ifUnlessInlineKeyword('if'))).kw('unless', toAppend(ifUnlessInlineKeyword('unless'))).kw('yield', {
    assert: function assert(node$$1) {
      var args = node$$1.args;

      if (args.named.isEmpty()) {
        return Ok({
          target: _syntax.SourceSpan.synthetic('default').toSlice(),
          positional: args.positional
        });
      } else {
        var target = args.named.get('to');

        if (args.named.size > 1 || target === null) {
          return Err((0, _syntax.generateSyntaxError)("yield only takes a single named argument: 'to'", args.named.loc));
        }

        if (_syntax.ASTv2.isLiteral(target, 'string')) {
          return Ok({
            target: target.toSlice(),
            positional: args.positional
          });
        } else {
          return Err((0, _syntax.generateSyntaxError)("you can only yield to a literal string value", target.loc));
        }
      }
    },
    translate: function translate(_ref18, _ref19) {
      var node$$1 = _ref18.node,
          state = _ref18.state;
      var target = _ref19.target,
          positional = _ref19.positional;
      return VISIT_EXPRS.Positional(positional, state).mapOk(function (positional) {
        return new Yield({
          loc: node$$1.loc,
          target: target,
          to: state.scope.allocateBlock(target.chars),
          positional: positional
        });
      });
    }
  }).kw('partial', {
    assert: function assert(node$$1, state) {
      if (state.isStrict) {
        return Err((0, _syntax.generateSyntaxError)('{{partial}} is not allowed in strict mode templates', node$$1.loc));
      }

      var _node$$1$args2 = node$$1.args,
          positional = _node$$1$args2.positional,
          named = _node$$1$args2.named;
      var trusting = node$$1.trusting;

      if (positional.isEmpty()) {
        return Err((0, _syntax.generateSyntaxError)("Partial found with no arguments. You must specify a template name", node$$1.loc));
      } else if (positional.size !== 1) {
        return Err((0, _syntax.generateSyntaxError)("Partial found with " + positional.exprs.length + " arguments. You must specify a template name", node$$1.loc));
      }

      if (named.isEmpty()) {
        if (trusting) {
          return Err((0, _syntax.generateSyntaxError)("{{{partial ...}}} is not supported, please use {{partial ...}} instead", node$$1.loc));
        }

        return Ok(positional.nth(0));
      } else {
        return Err((0, _syntax.generateSyntaxError)("Partial does not take any named argument", node$$1.loc));
      }
    },
    translate: function translate(_ref20, expr) {
      var node$$1 = _ref20.node,
          state = _ref20.state;
      state.scope.setHasEval();
      var visited = expr === undefined ? Ok(new _syntax.ASTv2.LiteralExpression({
        loc: _syntax.SourceSpan.synthetic('undefined'),
        value: undefined
      })) : VISIT_EXPRS.visit(expr, state);
      return visited.mapOk(function (target) {
        return new Partial({
          loc: node$$1.loc,
          scope: state.scope,
          target: target
        });
      });
    }
  }).kw('debugger', {
    assert: function assert(node$$1) {
      var args = node$$1.args;
      var positional = args.positional;

      if (args.isEmpty()) {
        return Ok(undefined);
      } else {
        if (positional.isEmpty()) {
          return Err((0, _syntax.generateSyntaxError)("debugger does not take any named arguments", node$$1.loc));
        } else {
          return Err((0, _syntax.generateSyntaxError)("debugger does not take any positional arguments", node$$1.loc));
        }
      }
    },
    translate: function translate(_ref21) {
      var node$$1 = _ref21.node,
          scope = _ref21.state.scope;
      scope.setHasEval();
      return Ok(new Debugger({
        loc: node$$1.loc,
        scope: scope
      }));
    }
  }).kw('component', {
    assert: assertCurryKeyword(0
    /* Component */
    ),
    translate: function translate(_ref22, _ref23) {
      var node$$1 = _ref22.node,
          state = _ref22.state;
      var definition = _ref23.definition,
          args = _ref23.args;
      var definitionResult = VISIT_EXPRS.visit(definition, state);
      var argsResult = VISIT_EXPRS.Args(args, state);
      return Result.all(definitionResult, argsResult).mapOk(function (_ref24) {
        var definition = _ref24[0],
            args = _ref24[1];
        return new InvokeComponent({
          loc: node$$1.loc,
          definition: definition,
          args: args,
          blocks: null
        });
      });
    }
  }).kw('helper', {
    assert: assertCurryKeyword(1
    /* Helper */
    ),
    translate: function translate(_ref25, _ref26) {
      var node$$1 = _ref25.node,
          state = _ref25.state;
      var definition = _ref26.definition,
          args = _ref26.args;
      var definitionResult = VISIT_EXPRS.visit(definition, state);
      var argsResult = VISIT_EXPRS.Args(args, state);
      return Result.all(definitionResult, argsResult).mapOk(function (_ref27) {
        var definition = _ref27[0],
            args = _ref27[1];
        var text = new _CallExpression({
          callee: definition,
          args: args,
          loc: node$$1.loc
        });
        return new AppendTextNode({
          loc: node$$1.loc,
          text: text
        });
      });
    }
  });
  var BLOCK_KEYWORDS = keywords('Block').kw('in-element', {
    assert: function assert(node$$1) {
      var args = node$$1.args;
      var guid = args.get('guid');

      if (guid) {
        return Err((0, _syntax.generateSyntaxError)("Cannot pass `guid` to `{{#in-element}}`", guid.loc));
      }

      var insertBefore = args.get('insertBefore');
      var destination = args.nth(0);

      if (destination === null) {
        return Err((0, _syntax.generateSyntaxError)("{{#in-element}} requires a target element as its first positional parameter", args.loc));
      } // TODO Better syntax checks


      return Ok({
        insertBefore: insertBefore,
        destination: destination
      });
    },
    translate: function translate(_ref28, _ref29) {
      var node$$1 = _ref28.node,
          state = _ref28.state;
      var insertBefore = _ref29.insertBefore,
          destination = _ref29.destination;
      var named = node$$1.blocks.get('default');
      var body = VISIT_STMTS.NamedBlock(named, state);
      var destinationResult = VISIT_EXPRS.visit(destination, state);
      return Result.all(body, destinationResult).andThen(function (_ref30) {
        var body = _ref30[0],
            destination = _ref30[1];

        if (insertBefore) {
          return VISIT_EXPRS.visit(insertBefore, state).mapOk(function (insertBefore) {
            return {
              body: body,
              destination: destination,
              insertBefore: insertBefore
            };
          });
        } else {
          return Ok({
            body: body,
            destination: destination,
            insertBefore: new Missing({
              loc: node$$1.callee.loc.collapse('end')
            })
          });
        }
      }).mapOk(function (_ref31) {
        var body = _ref31.body,
            destination = _ref31.destination,
            insertBefore = _ref31.insertBefore;
        return new InElement({
          loc: node$$1.loc,
          block: body,
          insertBefore: insertBefore,
          guid: state.generateUniqueCursor(),
          destination: destination
        });
      });
    }
  }).kw('if', {
    assert: function assert(node$$1) {
      var args = node$$1.args;

      if (!args.named.isEmpty()) {
        return Err((0, _syntax.generateSyntaxError)("{{#if}} cannot receive named parameters, received " + args.named.entries.map(function (e) {
          return e.name.chars;
        }).join(', '), node$$1.loc));
      }

      if (args.positional.size > 1) {
        return Err((0, _syntax.generateSyntaxError)("{{#if}} can only receive one positional parameter in block form, the conditional value. Received " + args.positional.size + " parameters", node$$1.loc));
      }

      var condition = args.nth(0);

      if (condition === null) {
        return Err((0, _syntax.generateSyntaxError)("{{#if}} requires a condition as its first positional parameter, did not receive any parameters", node$$1.loc));
      }

      return Ok({
        condition: condition
      });
    },
    translate: function translate(_ref32, _ref33) {
      var node$$1 = _ref32.node,
          state = _ref32.state;
      var condition = _ref33.condition;
      var block = node$$1.blocks.get('default');
      var inverse = node$$1.blocks.get('else');
      var conditionResult = VISIT_EXPRS.visit(condition, state);
      var blockResult = VISIT_STMTS.NamedBlock(block, state);
      var inverseResult = inverse ? VISIT_STMTS.NamedBlock(inverse, state) : Ok(null);
      return Result.all(conditionResult, blockResult, inverseResult).mapOk(function (_ref34) {
        var condition = _ref34[0],
            block = _ref34[1],
            inverse = _ref34[2];
        return new If({
          loc: node$$1.loc,
          condition: condition,
          block: block,
          inverse: inverse
        });
      });
    }
  }).kw('unless', {
    assert: function assert(node$$1) {
      var args = node$$1.args;

      if (!args.named.isEmpty()) {
        return Err((0, _syntax.generateSyntaxError)("{{#unless}} cannot receive named parameters, received " + args.named.entries.map(function (e) {
          return e.name.chars;
        }).join(', '), node$$1.loc));
      }

      if (args.positional.size > 1) {
        return Err((0, _syntax.generateSyntaxError)("{{#unless}} can only receive one positional parameter in block form, the conditional value. Received " + args.positional.size + " parameters", node$$1.loc));
      }

      var condition = args.nth(0);

      if (condition === null) {
        return Err((0, _syntax.generateSyntaxError)("{{#unless}} requires a condition as its first positional parameter, did not receive any parameters", node$$1.loc));
      }

      return Ok({
        condition: condition
      });
    },
    translate: function translate(_ref35, _ref36) {
      var node$$1 = _ref35.node,
          state = _ref35.state;
      var condition = _ref36.condition;
      var block = node$$1.blocks.get('default');
      var inverse = node$$1.blocks.get('else');
      var conditionResult = VISIT_EXPRS.visit(condition, state);
      var blockResult = VISIT_STMTS.NamedBlock(block, state);
      var inverseResult = inverse ? VISIT_STMTS.NamedBlock(inverse, state) : Ok(null);
      return Result.all(conditionResult, blockResult, inverseResult).mapOk(function (_ref37) {
        var condition = _ref37[0],
            block = _ref37[1],
            inverse = _ref37[2];
        return new If({
          loc: node$$1.loc,
          condition: new Not({
            value: condition,
            loc: node$$1.loc
          }),
          block: block,
          inverse: inverse
        });
      });
    }
  }).kw('each', {
    assert: function assert(node$$1) {
      var args = node$$1.args;

      if (!args.named.entries.every(function (e) {
        return e.name.chars === 'key';
      })) {
        return Err((0, _syntax.generateSyntaxError)("{{#each}} can only receive the 'key' named parameter, received " + args.named.entries.filter(function (e) {
          return e.name.chars !== 'key';
        }).map(function (e) {
          return e.name.chars;
        }).join(', '), args.named.loc));
      }

      if (args.positional.size > 1) {
        return Err((0, _syntax.generateSyntaxError)("{{#each}} can only receive one positional parameter, the collection being iterated. Received " + args.positional.size + " parameters", args.positional.loc));
      }

      var value = args.nth(0);
      var key = args.get('key');

      if (value === null) {
        return Err((0, _syntax.generateSyntaxError)("{{#each}} requires an iterable value to be passed as its first positional parameter, did not receive any parameters", args.loc));
      }

      return Ok({
        value: value,
        key: key
      });
    },
    translate: function translate(_ref38, _ref39) {
      var node$$1 = _ref38.node,
          state = _ref38.state;
      var value = _ref39.value,
          key = _ref39.key;
      var block = node$$1.blocks.get('default');
      var inverse = node$$1.blocks.get('else');
      var valueResult = VISIT_EXPRS.visit(value, state);
      var keyResult = key ? VISIT_EXPRS.visit(key, state) : Ok(null);
      var blockResult = VISIT_STMTS.NamedBlock(block, state);
      var inverseResult = inverse ? VISIT_STMTS.NamedBlock(inverse, state) : Ok(null);
      return Result.all(valueResult, keyResult, blockResult, inverseResult).mapOk(function (_ref40) {
        var value = _ref40[0],
            key = _ref40[1],
            block = _ref40[2],
            inverse = _ref40[3];
        return new Each({
          loc: node$$1.loc,
          value: value,
          key: key,
          block: block,
          inverse: inverse
        });
      });
    }
  }).kw('with', {
    assert: function assert(node$$1) {
      var args = node$$1.args;

      if (!args.named.isEmpty()) {
        return Err((0, _syntax.generateSyntaxError)("{{#with}} cannot receive named parameters, received " + args.named.entries.map(function (e) {
          return e.name.chars;
        }).join(', '), args.named.loc));
      }

      if (args.positional.size > 1) {
        return Err((0, _syntax.generateSyntaxError)("{{#with}} can only receive one positional parameter. Received " + args.positional.size + " parameters", args.positional.loc));
      }

      var value = args.nth(0);

      if (value === null) {
        return Err((0, _syntax.generateSyntaxError)("{{#with}} requires a value as its first positional parameter, did not receive any parameters", args.loc));
      }

      return Ok({
        value: value
      });
    },
    translate: function translate(_ref41, _ref42) {
      var node$$1 = _ref41.node,
          state = _ref41.state;
      var value = _ref42.value;
      var block = node$$1.blocks.get('default');
      var inverse = node$$1.blocks.get('else');
      var valueResult = VISIT_EXPRS.visit(value, state);
      var blockResult = VISIT_STMTS.NamedBlock(block, state);
      var inverseResult = inverse ? VISIT_STMTS.NamedBlock(inverse, state) : Ok(null);
      return Result.all(valueResult, blockResult, inverseResult).mapOk(function (_ref43) {
        var value = _ref43[0],
            block = _ref43[1],
            inverse = _ref43[2];
        return new With({
          loc: node$$1.loc,
          value: value,
          block: block,
          inverse: inverse
        });
      });
    }
  }).kw('let', {
    assert: function assert(node$$1) {
      var args = node$$1.args;

      if (!args.named.isEmpty()) {
        return Err((0, _syntax.generateSyntaxError)("{{#let}} cannot receive named parameters, received " + args.named.entries.map(function (e) {
          return e.name.chars;
        }).join(', '), args.named.loc));
      }

      if (args.positional.size === 0) {
        return Err((0, _syntax.generateSyntaxError)("{{#let}} requires at least one value as its first positional parameter, did not receive any parameters", args.positional.loc));
      }

      if (node$$1.blocks.get('else')) {
        return Err((0, _syntax.generateSyntaxError)("{{#let}} cannot receive an {{else}} block", args.positional.loc));
      }

      return Ok({
        positional: args.positional
      });
    },
    translate: function translate(_ref44, _ref45) {
      var node$$1 = _ref44.node,
          state = _ref44.state;
      var positional = _ref45.positional;
      var block = node$$1.blocks.get('default');
      var positionalResult = VISIT_EXPRS.Positional(positional, state);
      var blockResult = VISIT_STMTS.NamedBlock(block, state);
      return Result.all(positionalResult, blockResult).mapOk(function (_ref46) {
        var positional = _ref46[0],
            block = _ref46[1];
        return new Let({
          loc: node$$1.loc,
          positional: positional,
          block: block
        });
      });
    }
  }).kw('-with-dynamic-vars', {
    assert: function assert(node$$1) {
      return Ok({
        named: node$$1.args.named
      });
    },
    translate: function translate(_ref47, _ref48) {
      var node$$1 = _ref47.node,
          state = _ref47.state;
      var named = _ref48.named;
      var block = node$$1.blocks.get('default');
      var namedResult = VISIT_EXPRS.NamedArguments(named, state);
      var blockResult = VISIT_STMTS.NamedBlock(block, state);
      return Result.all(namedResult, blockResult).mapOk(function (_ref49) {
        var named = _ref49[0],
            block = _ref49[1];
        return new WithDynamicVars({
          loc: node$$1.loc,
          named: named,
          block: block
        });
      });
    }
  }).kw('component', {
    assert: assertCurryKeyword(0
    /* Component */
    ),
    translate: function translate(_ref50, _ref51) {
      var node$$1 = _ref50.node,
          state = _ref50.state;
      var definition = _ref51.definition,
          args = _ref51.args;
      var definitionResult = VISIT_EXPRS.visit(definition, state);
      var argsResult = VISIT_EXPRS.Args(args, state);
      var blocksResult = VISIT_STMTS.NamedBlocks(node$$1.blocks, state);
      return Result.all(definitionResult, argsResult, blocksResult).mapOk(function (_ref52) {
        var definition = _ref52[0],
            args = _ref52[1],
            blocks = _ref52[2];
        return new InvokeComponent({
          loc: node$$1.loc,
          definition: definition,
          args: args,
          blocks: blocks
        });
      });
    }
  });
  var MODIFIER_KEYWORDS = keywords('Modifier'); // There is a small whitelist of namespaced attributes specially
  // enumerated in
  // https://www.w3.org/TR/html/syntax.html#attributes-0
  //
  // > When a foreign element has one of the namespaced attributes given by
  // > the local name and namespace of the first and second cells of a row
  // > from the following table, it must be written using the name given by
  // > the third cell from the same row.
  //
  // In all other cases, colons are interpreted as a regular character
  // with no special meaning:
  //
  // > No other namespaced attribute can be expressed in the HTML syntax.

  var XLINK = 'http://www.w3.org/1999/xlink';
  var XML = 'http://www.w3.org/XML/1998/namespace';
  var XMLNS = 'http://www.w3.org/2000/xmlns/';
  var WHITELIST = {
    'xlink:actuate': XLINK,
    'xlink:arcrole': XLINK,
    'xlink:href': XLINK,
    'xlink:role': XLINK,
    'xlink:show': XLINK,
    'xlink:title': XLINK,
    'xlink:type': XLINK,
    'xml:base': XML,
    'xml:lang': XML,
    'xml:space': XML,
    xmlns: XMLNS,
    'xmlns:xlink': XMLNS
  };

  function getAttrNamespace(attrName) {
    return WHITELIST[attrName];
  }

  var DEFLATE_TAG_TABLE = {
    div: 0
    /* div */
    ,
    span: 1
    /* span */
    ,
    p: 2
    /* p */
    ,
    a: 3
    /* a */

  };
  var INFLATE_TAG_TABLE = ['div', 'span', 'p', 'a'];

  function deflateTagName(tagName) {
    var _a;

    return (_a = DEFLATE_TAG_TABLE[tagName]) !== null && _a !== void 0 ? _a : tagName;
  }

  function inflateTagName(tagName) {
    return typeof tagName === 'string' ? tagName : INFLATE_TAG_TABLE[tagName];
  }

  var DEFLATE_ATTR_TABLE = {
    class: 0
    /* class */
    ,
    id: 1
    /* id */
    ,
    value: 2
    /* value */
    ,
    name: 3
    /* name */
    ,
    type: 4
    /* type */
    ,
    style: 5
    /* style */
    ,
    href: 6
    /* href */

  };
  var INFLATE_ATTR_TABLE = ['class', 'id', 'value', 'name', 'type', 'style', 'href'];

  function deflateAttrName(attrName) {
    var _a;

    return (_a = DEFLATE_ATTR_TABLE[attrName]) !== null && _a !== void 0 ? _a : attrName;
  }

  function inflateAttrName(attrName) {
    return typeof attrName === 'string' ? attrName : INFLATE_ATTR_TABLE[attrName];
  }

  var ClassifiedElement = /*#__PURE__*/function () {
    function ClassifiedElement(element, delegate, state) {
      this.element = element;
      this.state = state;
      this.delegate = delegate;
    }

    var _proto9 = ClassifiedElement.prototype;

    _proto9.toStatement = function toStatement() {
      var _this4 = this;

      return this.prepare().andThen(function (prepared) {
        return _this4.delegate.toStatement(_this4, prepared);
      });
    };

    _proto9.attr = function attr(_attr) {
      var _this5 = this;

      var name = _attr.name;
      var rawValue = _attr.value;
      var namespace = getAttrNamespace(name.chars) || undefined;

      if (_syntax.ASTv2.isLiteral(rawValue, 'string')) {
        return Ok(new StaticAttr({
          loc: _attr.loc,
          name: name,
          value: rawValue.toSlice(),
          namespace: namespace,
          kind: {
            component: this.delegate.dynamicFeatures
          }
        }));
      }

      return VISIT_EXPRS.visit(convertPathToCallIfKeyword(rawValue), this.state).mapOk(function (value) {
        var isTrusting = _attr.trusting;
        return new DynamicAttr({
          loc: _attr.loc,
          name: name,
          value: value,
          namespace: namespace,
          kind: {
            trusting: isTrusting,
            component: _this5.delegate.dynamicFeatures
          }
        });
      });
    };

    _proto9.modifier = function modifier(_modifier) {
      if (isHelperInvocation(_modifier)) {
        assertIsValidModifier(_modifier);
      }

      var translated = MODIFIER_KEYWORDS.translate(_modifier, this.state);

      if (translated !== null) {
        return translated;
      }

      var head = VISIT_EXPRS.visit(_modifier.callee, this.state);
      var args = VISIT_EXPRS.Args(_modifier.args, this.state);
      return Result.all(head, args).mapOk(function (_ref53) {
        var head = _ref53[0],
            args = _ref53[1];
        return new Modifier({
          loc: _modifier.loc,
          callee: head,
          args: args
        });
      });
    };

    _proto9.attrs = function attrs() {
      var attrs = new ResultArray();
      var args = new ResultArray(); // Unlike most attributes, the `type` attribute can change how
      // subsequent attributes are interpreted by the browser. To address
      // this, in simple cases, we special case the `type` attribute to be set
      // last. For elements with splattributes, where attribute order affects
      // precedence, this re-ordering happens at runtime instead.
      // See https://github.com/glimmerjs/glimmer-vm/pull/726

      var typeAttr = null;
      var simple = this.element.attrs.filter(function (attr) {
        return attr.type === 'SplatAttr';
      }).length === 0;

      for (var _iterator4 = (0, _emberBabel.createForOfIteratorHelperLoose)(this.element.attrs), _step4; !(_step4 = _iterator4()).done;) {
        var _attr2 = _step4.value;

        if (_attr2.type === 'SplatAttr') {
          attrs.add(Ok(new SplatAttr({
            loc: _attr2.loc,
            symbol: this.state.scope.allocateBlock('attrs')
          })));
        } else if (_attr2.name.chars === 'type' && simple) {
          typeAttr = _attr2;
        } else {
          attrs.add(this.attr(_attr2));
        }
      }

      for (var _iterator5 = (0, _emberBabel.createForOfIteratorHelperLoose)(this.element.componentArgs), _step5; !(_step5 = _iterator5()).done;) {
        var _arg = _step5.value;
        args.add(this.delegate.arg(_arg, this));
      }

      if (typeAttr) {
        attrs.add(this.attr(typeAttr));
      }

      return Result.all(args.toArray(), attrs.toArray()).mapOk(function (_ref54) {
        var args = _ref54[0],
            attrs = _ref54[1];
        return {
          attrs: attrs,
          args: new _NamedArguments({
            loc: (0, _syntax.maybeLoc)(args, _syntax.SourceSpan.NON_EXISTENT),
            entries: OptionalList(args)
          })
        };
      });
    };

    _proto9.prepare = function prepare() {
      var _this6 = this;

      var attrs = this.attrs();
      var modifiers = new ResultArray(this.element.modifiers.map(function (m) {
        return _this6.modifier(m);
      })).toArray();
      return Result.all(attrs, modifiers).mapOk(function (_ref55) {
        var result = _ref55[0],
            modifiers = _ref55[1];
        var attrs = result.attrs,
            args = result.args;
        var elementParams = [].concat(attrs, modifiers);
        var params = new ElementParameters({
          loc: (0, _syntax.maybeLoc)(elementParams, _syntax.SourceSpan.NON_EXISTENT),
          body: OptionalList(elementParams)
        });
        return {
          args: args,
          params: params
        };
      });
    };

    return ClassifiedElement;
  }();

  function hasDynamicFeatures(_ref56) {
    var attrs = _ref56.attrs,
        modifiers = _ref56.modifiers;

    // ElementModifier needs the special ComponentOperations
    if (modifiers.length > 0) {
      return true;
    } // Splattributes need the special ComponentOperations to merge into


    return !!attrs.filter(function (attr) {
      return attr.type === 'SplatAttr';
    })[0];
  }

  var ClassifiedComponent = /*#__PURE__*/function () {
    function ClassifiedComponent(tag, element) {
      this.tag = tag;
      this.element = element;
      this.dynamicFeatures = true;
    }

    var _proto10 = ClassifiedComponent.prototype;

    _proto10.arg = function arg(attr, _ref57) {
      var state = _ref57.state;
      var name = attr.name;
      return VISIT_EXPRS.visit(convertPathToCallIfKeyword(attr.value), state).mapOk(function (value) {
        return new NamedArgument({
          loc: attr.loc,
          key: name,
          value: value
        });
      });
    };

    _proto10.toStatement = function toStatement(component, _ref58) {
      var _this7 = this;

      var args = _ref58.args,
          params = _ref58.params;
      var element = component.element,
          state = component.state;
      return this.blocks(state).mapOk(function (blocks) {
        return new Component({
          loc: element.loc,
          tag: _this7.tag,
          params: params,
          args: args,
          blocks: blocks
        });
      });
    };

    _proto10.blocks = function blocks(state) {
      return VISIT_STMTS.NamedBlocks(this.element.blocks, state);
    };

    return ClassifiedComponent;
  }();

  var ClassifiedSimpleElement = /*#__PURE__*/function () {
    function ClassifiedSimpleElement(tag, element, dynamicFeatures) {
      this.tag = tag;
      this.element = element;
      this.dynamicFeatures = dynamicFeatures;
      this.isComponent = false;
    }

    var _proto11 = ClassifiedSimpleElement.prototype;

    _proto11.arg = function arg(attr) {
      return Err((0, _syntax.generateSyntaxError)(attr.name.chars + " is not a valid attribute name. @arguments are only allowed on components, but the tag for this element (`" + this.tag.chars + "`) is a regular, non-component HTML element.", attr.loc));
    };

    _proto11.toStatement = function toStatement(classified, _ref59) {
      var _this8 = this;

      var params = _ref59.params;
      var state = classified.state,
          element = classified.element;
      var body = VISIT_STMTS.visitList(this.element.body, state);
      return body.mapOk(function (body) {
        return new SimpleElement({
          loc: element.loc,
          tag: _this8.tag,
          params: params,
          body: body.toArray(),
          dynamicFeatures: _this8.dynamicFeatures
        });
      });
    };

    return ClassifiedSimpleElement;
  }();

  var NormalizationStatements = /*#__PURE__*/function () {
    function NormalizationStatements() {}

    var _proto12 = NormalizationStatements.prototype;

    _proto12.visitList = function visitList(nodes, state) {
      return new ResultArray(nodes.map(function (e) {
        return VISIT_STMTS.visit(e, state);
      })).toOptionalList().mapOk(function (list) {
        return list.filter(function (s) {
          return s !== null;
        });
      });
    };

    _proto12.visit = function visit(node$$1, state) {
      switch (node$$1.type) {
        case 'GlimmerComment':
          return Ok(null);

        case 'AppendContent':
          return this.AppendContent(node$$1, state);

        case 'HtmlText':
          return Ok(this.TextNode(node$$1));

        case 'HtmlComment':
          return Ok(this.HtmlComment(node$$1));

        case 'InvokeBlock':
          return this.InvokeBlock(node$$1, state);

        case 'InvokeComponent':
          return this.Component(node$$1, state);

        case 'SimpleElement':
          return this.SimpleElement(node$$1, state);
      }
    };

    _proto12.InvokeBlock = function InvokeBlock(node$$1, state) {
      var _this9 = this;

      var translated = BLOCK_KEYWORDS.translate(node$$1, state);

      if (translated !== null) {
        return translated;
      }

      var head = VISIT_EXPRS.visit(node$$1.callee, state);
      var args = VISIT_EXPRS.Args(node$$1.args, state);
      return Result.all(head, args).andThen(function (_ref60) {
        var head = _ref60[0],
            args = _ref60[1];
        return _this9.NamedBlocks(node$$1.blocks, state).mapOk(function (blocks) {
          return new _InvokeBlock({
            loc: node$$1.loc,
            head: head,
            args: args,
            blocks: blocks
          });
        });
      });
    };

    _proto12.NamedBlocks = function NamedBlocks(blocks, state) {
      var _this10 = this;

      var list = new ResultArray(blocks.blocks.map(function (b) {
        return _this10.NamedBlock(b, state);
      }));
      return list.toArray().mapOk(function (list) {
        return new _NamedBlocks({
          loc: blocks.loc,
          blocks: OptionalList(list)
        });
      });
    };

    _proto12.NamedBlock = function NamedBlock(named, state) {
      var body = state.visitBlock(named.block);
      return body.mapOk(function (body) {
        return new _NamedBlock({
          loc: named.loc,
          name: named.name,
          body: body.toArray(),
          scope: named.block.scope
        });
      });
    };

    _proto12.SimpleElement = function SimpleElement(element, state) {
      return new ClassifiedElement(element, new ClassifiedSimpleElement(element.tag, element, hasDynamicFeatures(element)), state).toStatement();
    };

    _proto12.Component = function Component(component, state) {
      return VISIT_EXPRS.visit(component.callee, state).andThen(function (callee) {
        return new ClassifiedElement(component, new ClassifiedComponent(callee, component), state).toStatement();
      });
    };

    _proto12.AppendContent = function AppendContent(append, state) {
      var translated = APPEND_KEYWORDS.translate(append, state);

      if (translated !== null) {
        return translated;
      }

      var value = VISIT_EXPRS.visit(append.value, state);
      return value.mapOk(function (value) {
        if (append.trusting) {
          return new AppendTrustedHTML({
            loc: append.loc,
            html: value
          });
        } else {
          return new AppendTextNode({
            loc: append.loc,
            text: value
          });
        }
      });
    };

    _proto12.TextNode = function TextNode(text) {
      return new AppendTextNode({
        loc: text.loc,
        text: new _syntax.ASTv2.LiteralExpression({
          loc: text.loc,
          value: text.chars
        })
      });
    };

    _proto12.HtmlComment = function HtmlComment(comment) {
      return new AppendComment({
        loc: comment.loc,
        value: comment.text
      });
    };

    return NormalizationStatements;
  }();

  var VISIT_STMTS = new NormalizationStatements();
  /**
   * This is the mutable state for this compiler pass.
   */

  var NormalizationState = /*#__PURE__*/function () {
    function NormalizationState(block, isStrict) {
      this.isStrict = isStrict;
      this._cursorCount = 0;
      this._currentScope = block;
    }

    var _proto13 = NormalizationState.prototype;

    _proto13.generateUniqueCursor = function generateUniqueCursor() {
      return "%cursor:" + this._cursorCount++ + "%";
    };

    _proto13.visitBlock = function visitBlock(block) {
      var oldBlock = this._currentScope;
      this._currentScope = block.scope;

      try {
        return VISIT_STMTS.visitList(block.body, this);
      } finally {
        this._currentScope = oldBlock;
      }
    };

    (0, _emberBabel.createClass)(NormalizationState, [{
      key: "scope",
      get: function get() {
        return this._currentScope;
      }
    }]);
    return NormalizationState;
  }();
  /**
   * Normalize the AST from @glimmer/syntax into the HIR. The HIR has special
   * instructions for keywords like `{{yield}}`, `(has-block)` and
   * `{{#in-element}}`.
   *
   * Most importantly, it also classifies HTML element syntax into:
   *
   * 1. simple HTML element (with optional splattributes)
   * 2. component invocation
   *
   * Because the @glimmer/syntax AST gives us a string for an element's tag,
   * this pass also normalizes that string into an expression.
   *
   * ```
   * // normalized into a path expression whose head is `this` and tail is
   * // `["x"]`
   * <this.x />
   *
   * {{#let expr as |t|}}
   *   // `"t"` is normalized into a variable lookup.
   *   <t />
   *
   *   // normalized into a path expression whose head is the variable lookup
   *   // `t` and tail is `["input"]`.
   *   <t.input />
   * {{/let}}
   *
   * // normalized into a free variable lookup for `SomeComponent` (with the
   * // context `ComponentHead`).
   * <SomeComponent />
   *
   * // normalized into a path expression whose head is the free variable
   * // `notInScope` (with the context `Expression`), and whose tail is
   * // `["SomeComponent"]`. In resolver mode, this path will be rejected later,
   * // since it cannot serve as an input to the resolver.
   * <notInScope.SomeComponent />
   * ```
   */


  function normalize$1(source, root, isStrict) {
    // create a new context for the normalization pass
    var state = new NormalizationState(root.table, isStrict);
    var body = VISIT_STMTS.visitList(root.body, state);
    return body.mapOk(function (body) {
      return new Template({
        loc: root.loc,
        scope: root.table,
        body: body.toArray()
      });
    });
  }

  var WireFormatDebugger = /*#__PURE__*/function () {
    function WireFormatDebugger(_ref61) {
      var _statements = _ref61[0],
          symbols = _ref61[1],
          _hasEval = _ref61[2],
          upvars = _ref61[3];
      this.upvars = upvars;
      this.symbols = symbols;
    }

    var _proto14 = WireFormatDebugger.prototype;

    _proto14.format = function format(program) {
      var out = [];

      for (var _iterator6 = (0, _emberBabel.createForOfIteratorHelperLoose)(program[0]), _step6; !(_step6 = _iterator6()).done;) {
        var _statement = _step6.value;
        out.push(this.formatOpcode(_statement));
      }

      return out;
    };

    _proto14.formatOpcode = function formatOpcode(opcode) {
      if (Array.isArray(opcode)) {
        switch (opcode[0]) {
          case 1
          /* Append */
          :
            return ['append', this.formatOpcode(opcode[1])];

          case 2
          /* TrustingAppend */
          :
            return ['trusting-append', this.formatOpcode(opcode[1])];

          case 6
          /* Block */
          :
            return ['block', this.formatOpcode(opcode[1]), this.formatParams(opcode[2]), this.formatHash(opcode[3]), this.formatBlocks(opcode[4])];

          case 40
          /* InElement */
          :
            return ['in-element', opcode[1], this.formatOpcode(opcode[2]), opcode[3] ? this.formatOpcode(opcode[3]) : undefined];

          case 10
          /* OpenElement */
          :
            return ['open-element', inflateTagName(opcode[1])];

          case 11
          /* OpenElementWithSplat */
          :
            return ['open-element-with-splat', inflateTagName(opcode[1])];

          case 13
          /* CloseElement */
          :
            return ['close-element'];

          case 12
          /* FlushElement */
          :
            return ['flush-element'];

          case 14
          /* StaticAttr */
          :
            return ['static-attr', inflateAttrName(opcode[1]), opcode[2], opcode[3]];

          case 24
          /* StaticComponentAttr */
          :
            return ['static-component-attr', inflateAttrName(opcode[1]), opcode[2], opcode[3]];

          case 15
          /* DynamicAttr */
          :
            return ['dynamic-attr', inflateAttrName(opcode[1]), this.formatOpcode(opcode[2]), opcode[3]];

          case 16
          /* ComponentAttr */
          :
            return ['component-attr', inflateAttrName(opcode[1]), this.formatOpcode(opcode[2]), opcode[3]];

          case 17
          /* AttrSplat */
          :
            return ['attr-splat'];

          case 18
          /* Yield */
          :
            return ['yield', opcode[1], this.formatParams(opcode[2])];

          case 19
          /* Partial */
          :
            return ['partial', this.formatOpcode(opcode[1]), opcode[2]];

          case 20
          /* DynamicArg */
          :
            return ['dynamic-arg', opcode[1], this.formatOpcode(opcode[2])];

          case 21
          /* StaticArg */
          :
            return ['static-arg', opcode[1], this.formatOpcode(opcode[2])];

          case 22
          /* TrustingDynamicAttr */
          :
            return ['trusting-dynamic-attr', inflateAttrName(opcode[1]), this.formatOpcode(opcode[2]), opcode[3]];

          case 23
          /* TrustingComponentAttr */
          :
            return ['trusting-component-attr', inflateAttrName(opcode[1]), this.formatOpcode(opcode[2]), opcode[3]];

          case 26
          /* Debugger */
          :
            return ['debugger', opcode[1]];

          case 3
          /* Comment */
          :
            return ['comment', opcode[1]];

          case 4
          /* Modifier */
          :
            return ['modifier', this.formatOpcode(opcode[1]), this.formatParams(opcode[2]), this.formatHash(opcode[3])];

          case 8
          /* Component */
          :
            return ['component', this.formatOpcode(opcode[1]), this.formatElementParams(opcode[2]), this.formatHash(opcode[3]), this.formatBlocks(opcode[4])];

          case 48
          /* HasBlock */
          :
            return ['has-block', this.formatOpcode(opcode[1])];

          case 49
          /* HasBlockParams */
          :
            return ['has-block-params', this.formatOpcode(opcode[1])];

          case 50
          /* Curry */
          :
            return ['curry', this.formatOpcode(opcode[1]), this.formatCurryType(opcode[2]), this.formatParams(opcode[3]), this.formatHash(opcode[4])];

          case 27
          /* Undefined */
          :
            return ['undefined'];

          case 28
          /* Call */
          :
            return ['call', this.formatOpcode(opcode[1]), this.formatParams(opcode[2]), this.formatHash(opcode[3])];

          case 29
          /* Concat */
          :
            return ['concat', this.formatParams(opcode[1])];

          case 31
          /* GetStrictFree */
          :
            return ['get-strict-free', this.upvars[opcode[1]], opcode[2]];

          case 33
          /* GetFreeAsFallback */
          :
            return ['GetFreeAsFallback', this.upvars[opcode[1]], opcode[2]];

          case 34
          /* GetFreeAsComponentOrHelperHeadOrThisFallback */
          :
            return ['GetFreeAsComponentOrHelperHeadOrThisFallback', this.upvars[opcode[1]], opcode[2]];

          case 35
          /* GetFreeAsComponentOrHelperHead */
          :
            return ['GetFreeAsComponentOrHelperHead', this.upvars[opcode[1]], opcode[2]];

          case 36
          /* GetFreeAsHelperHeadOrThisFallback */
          :
            return ['GetFreeAsHelperHeadOrThisFallback', this.upvars[opcode[1]], opcode[2]];

          case 99
          /* GetFreeAsDeprecatedHelperHeadOrThisFallback */
          :
            return ['GetFreeAsDeprecatedHelperHeadOrThisFallback', this.upvars[opcode[1]]];

          case 37
          /* GetFreeAsHelperHead */
          :
            return ['GetFreeAsHelperHead', this.upvars[opcode[1]], opcode[2]];

          case 39
          /* GetFreeAsComponentHead */
          :
            return ['GetFreeAsComponentHead', this.upvars[opcode[1]], opcode[2]];

          case 38
          /* GetFreeAsModifierHead */
          :
            return ['GetFreeAsModifierHead', this.upvars[opcode[1]], opcode[2]];

          case 30
          /* GetSymbol */
          :
            {
              if (opcode[1] === 0) {
                return ['get-symbol', 'this', opcode[2]];
              } else {
                return ['get-symbol', this.symbols[opcode[1] - 1], opcode[2]];
              }
            }

          case 32
          /* GetTemplateSymbol */
          :
            {
              return ['get-template-symbol', opcode[1], opcode[2]];
            }

          case 41
          /* If */
          :
            return ['if', this.formatOpcode(opcode[1]), this.formatBlock(opcode[2]), opcode[3] ? this.formatBlock(opcode[3]) : null];

          case 52
          /* IfInline */
          :
            return ['if-inline'];

          case 51
          /* Not */
          :
            return ['not'];

          case 42
          /* Each */
          :
            return ['each', this.formatOpcode(opcode[1]), opcode[2] ? this.formatOpcode(opcode[2]) : null, this.formatBlock(opcode[3]), opcode[4] ? this.formatBlock(opcode[4]) : null];

          case 43
          /* With */
          :
            return ['with', this.formatOpcode(opcode[1]), this.formatBlock(opcode[2]), opcode[3] ? this.formatBlock(opcode[3]) : null];

          case 44
          /* Let */
          :
            return ['let', this.formatParams(opcode[1]), this.formatBlock(opcode[2])];

          case 54
          /* Log */
          :
            return ['log', this.formatParams(opcode[1])];

          case 45
          /* WithDynamicVars */
          :
            return ['-with-dynamic-vars', this.formatHash(opcode[1]), this.formatBlock(opcode[2])];

          case 53
          /* GetDynamicVar */
          :
            return ['-get-dynamic-vars', this.formatOpcode(opcode[1])];

          case 46
          /* InvokeComponent */
          :
            return ['component', this.formatOpcode(opcode[1]), this.formatParams(opcode[2]), this.formatHash(opcode[3]), this.formatBlocks(opcode[4])];
        }
      } else {
        return opcode;
      }
    };

    _proto14.formatCurryType = function formatCurryType(value) {
      switch (value) {
        case 0
        /* Component */
        :
          return 'component';

        case 1
        /* Helper */
        :
          return 'helper';

        case 2
        /* Modifier */
        :
          return 'modifier';

        default:
          throw (0, _util.exhausted)(value);
      }
    };

    _proto14.formatElementParams = function formatElementParams(opcodes) {
      var _this11 = this;

      if (opcodes === null) return null;
      return opcodes.map(function (o) {
        return _this11.formatOpcode(o);
      });
    };

    _proto14.formatParams = function formatParams(opcodes) {
      var _this12 = this;

      if (opcodes === null) return null;
      return opcodes.map(function (o) {
        return _this12.formatOpcode(o);
      });
    };

    _proto14.formatHash = function formatHash(hash) {
      var _this13 = this;

      if (hash === null) return null;
      return hash[0].reduce(function (accum, key, index) {
        accum[key] = _this13.formatOpcode(hash[1][index]);
        return accum;
      }, (0, _util.dict)());
    };

    _proto14.formatBlocks = function formatBlocks(blocks) {
      var _this14 = this;

      if (blocks === null) return null;
      return blocks[0].reduce(function (accum, key, index) {
        accum[key] = _this14.formatBlock(blocks[1][index]);
        return accum;
      }, (0, _util.dict)());
    };

    _proto14.formatBlock = function formatBlock(block) {
      var _this15 = this;

      return {
        statements: block[0].map(function (s) {
          return _this15.formatOpcode(s);
        }),
        parameters: block[1]
      };
    };

    return WireFormatDebugger;
  }();

  _exports.WireFormatDebugger = WireFormatDebugger;

  var ExpressionEncoder = /*#__PURE__*/function () {
    function ExpressionEncoder() {}

    var _proto15 = ExpressionEncoder.prototype;

    _proto15.expr = function expr(_expr) {
      switch (_expr.type) {
        case 'Missing':
          return undefined;

        case 'Literal':
          return this.Literal(_expr);

        case 'CallExpression':
          return this.CallExpression(_expr);

        case 'DeprecatedCallExpression':
          return this.DeprecatedCallExpression(_expr);

        case 'PathExpression':
          return this.PathExpression(_expr);

        case 'Arg':
          return [30
          /* GetSymbol */
          , _expr.symbol];

        case 'Local':
          return this.Local(_expr);

        case 'This':
          return [30
          /* GetSymbol */
          , 0];

        case 'Free':
          return [_expr.resolution.resolution(), _expr.symbol];

        case 'HasBlock':
          return this.HasBlock(_expr);

        case 'HasBlockParams':
          return this.HasBlockParams(_expr);

        case 'Curry':
          return this.Curry(_expr);

        case 'Not':
          return this.Not(_expr);

        case 'IfInline':
          return this.IfInline(_expr);

        case 'InterpolateExpression':
          return this.InterpolateExpression(_expr);

        case 'GetDynamicVar':
          return this.GetDynamicVar(_expr);

        case 'Log':
          return this.Log(_expr);
      }
    };

    _proto15.Literal = function Literal(_ref62) {
      var value = _ref62.value;

      if (value === undefined) {
        return [27
        /* Undefined */
        ];
      } else {
        return value;
      }
    };

    _proto15.Missing = function Missing() {
      return undefined;
    };

    _proto15.HasBlock = function HasBlock(_ref63) {
      var symbol = _ref63.symbol;
      return [48
      /* HasBlock */
      , [30
      /* GetSymbol */
      , symbol]];
    };

    _proto15.HasBlockParams = function HasBlockParams(_ref64) {
      var symbol = _ref64.symbol;
      return [49
      /* HasBlockParams */
      , [30
      /* GetSymbol */
      , symbol]];
    };

    _proto15.Curry = function Curry(_ref65) {
      var definition = _ref65.definition,
          curriedType = _ref65.curriedType,
          args = _ref65.args;
      return [50
      /* Curry */
      , EXPR.expr(definition), curriedType, EXPR.Positional(args.positional), EXPR.NamedArguments(args.named)];
    };

    _proto15.Local = function Local(_ref66) {
      var isTemplateLocal = _ref66.isTemplateLocal,
          symbol = _ref66.symbol;
      return [isTemplateLocal ? 32
      /* GetTemplateSymbol */
      : 30
      /* GetSymbol */
      , symbol];
    };

    _proto15.GetWithResolver = function GetWithResolver(_ref67) {
      var symbol = _ref67.symbol;
      return [34
      /* GetFreeAsComponentOrHelperHeadOrThisFallback */
      , symbol];
    };

    _proto15.PathExpression = function PathExpression(_ref68) {
      var head = _ref68.head,
          tail = _ref68.tail;
      var getOp = EXPR.expr(head);
      return [].concat(getOp, [EXPR.Tail(tail)]);
    };

    _proto15.InterpolateExpression = function InterpolateExpression(_ref69) {
      var parts = _ref69.parts;
      return [29
      /* Concat */
      , parts.map(function (e) {
        return EXPR.expr(e);
      }).toArray()];
    };

    _proto15.CallExpression = function CallExpression(_ref70) {
      var callee = _ref70.callee,
          args = _ref70.args;
      return [28
      /* Call */
      , EXPR.expr(callee)].concat(EXPR.Args(args));
    };

    _proto15.DeprecatedCallExpression = function DeprecatedCallExpression(_ref71) {
      var arg = _ref71.arg,
          callee = _ref71.callee;
      return [99
      /* GetFreeAsDeprecatedHelperHeadOrThisFallback */
      , callee.symbol, [arg.chars]];
    };

    _proto15.Tail = function Tail(_ref72) {
      var members = _ref72.members;
      return (0, _util.mapPresent)(members, function (member) {
        return member.chars;
      });
    };

    _proto15.Args = function Args(_ref73) {
      var positional = _ref73.positional,
          named = _ref73.named;
      return [this.Positional(positional), this.NamedArguments(named)];
    };

    _proto15.Positional = function Positional(_ref74) {
      var list = _ref74.list;
      return list.map(function (l) {
        return EXPR.expr(l);
      }).toPresentArray();
    };

    _proto15.NamedArgument = function NamedArgument(_ref75) {
      var key = _ref75.key,
          value = _ref75.value;
      return [key.chars, EXPR.expr(value)];
    };

    _proto15.NamedArguments = function NamedArguments(_ref76) {
      var pairs = _ref76.entries;
      var list = pairs.toArray();

      if ((0, _util.isPresent)(list)) {
        var names = [];
        var values$$1 = [];

        for (var _iterator7 = (0, _emberBabel.createForOfIteratorHelperLoose)(list), _step7; !(_step7 = _iterator7()).done;) {
          var _pair = _step7.value;

          var _EXPR$NamedArgument = EXPR.NamedArgument(_pair),
              _name2 = _EXPR$NamedArgument[0],
              _value = _EXPR$NamedArgument[1];

          names.push(_name2);
          values$$1.push(_value);
        }

        (0, _util.assertPresent)(names);
        (0, _util.assertPresent)(values$$1);
        return [names, values$$1];
      } else {
        return null;
      }
    };

    _proto15.Not = function Not(_ref77) {
      var value = _ref77.value;
      return [51
      /* Not */
      , EXPR.expr(value)];
    };

    _proto15.IfInline = function IfInline(_ref78) {
      var condition = _ref78.condition,
          truthy = _ref78.truthy,
          falsy = _ref78.falsy;
      var expr = [52
      /* IfInline */
      , EXPR.expr(condition), EXPR.expr(truthy)];

      if (falsy) {
        expr.push(EXPR.expr(falsy));
      }

      return expr;
    };

    _proto15.GetDynamicVar = function GetDynamicVar(_ref79) {
      var name = _ref79.name;
      return [53
      /* GetDynamicVar */
      , EXPR.expr(name)];
    };

    _proto15.Log = function Log(_ref80) {
      var positional = _ref80.positional;
      return [54
      /* Log */
      , this.Positional(positional)];
    };

    return ExpressionEncoder;
  }();

  var EXPR = new ExpressionEncoder();

  var WireStatements = /*#__PURE__*/function () {
    function WireStatements(statements) {
      this.statements = statements;
    }

    var _proto16 = WireStatements.prototype;

    _proto16.toArray = function toArray() {
      return this.statements;
    };

    return WireStatements;
  }();

  var ContentEncoder = /*#__PURE__*/function () {
    function ContentEncoder() {}

    var _proto17 = ContentEncoder.prototype;

    _proto17.list = function list(statements) {
      var out = [];

      for (var _iterator8 = (0, _emberBabel.createForOfIteratorHelperLoose)(statements), _step8; !(_step8 = _iterator8()).done;) {
        var _statement2 = _step8.value;

        var _result3 = CONTENT.content(_statement2);

        if (_result3 && _result3 instanceof WireStatements) {
          out.push.apply(out, _result3.toArray());
        } else {
          out.push(_result3);
        }
      }

      return out;
    };

    _proto17.content = function content(stmt) {
      return this.visitContent(stmt);
    };

    _proto17.visitContent = function visitContent(stmt) {
      switch (stmt.type) {
        case 'Debugger':
          return [26
          /* Debugger */
          , stmt.scope.getEvalInfo()];

        case 'Partial':
          return this.Partial(stmt);

        case 'AppendComment':
          return this.AppendComment(stmt);

        case 'AppendTextNode':
          return this.AppendTextNode(stmt);

        case 'AppendTrustedHTML':
          return this.AppendTrustedHTML(stmt);

        case 'Yield':
          return this.Yield(stmt);

        case 'Component':
          return this.Component(stmt);

        case 'SimpleElement':
          return this.SimpleElement(stmt);

        case 'InElement':
          return this.InElement(stmt);

        case 'InvokeBlock':
          return this.InvokeBlock(stmt);

        case 'If':
          return this.If(stmt);

        case 'Each':
          return this.Each(stmt);

        case 'With':
          return this.With(stmt);

        case 'Let':
          return this.Let(stmt);

        case 'WithDynamicVars':
          return this.WithDynamicVars(stmt);

        case 'InvokeComponent':
          return this.InvokeComponent(stmt);

        default:
          return (0, _util.exhausted)(stmt);
      }
    };

    _proto17.Partial = function Partial(_ref81) {
      var target = _ref81.target,
          scope = _ref81.scope;
      return [19
      /* Partial */
      , EXPR.expr(target), scope.getEvalInfo()];
    };

    _proto17.Yield = function Yield(_ref82) {
      var to = _ref82.to,
          positional = _ref82.positional;
      return [18
      /* Yield */
      , to, EXPR.Positional(positional)];
    };

    _proto17.InElement = function InElement(_ref83) {
      var guid = _ref83.guid,
          insertBefore = _ref83.insertBefore,
          destination = _ref83.destination,
          block = _ref83.block;
      var wireBlock = CONTENT.NamedBlock(block)[1]; // let guid = args.guid;

      var wireDestination = EXPR.expr(destination);
      var wireInsertBefore = EXPR.expr(insertBefore);

      if (wireInsertBefore === undefined) {
        return [40
        /* InElement */
        , wireBlock, guid, wireDestination];
      } else {
        return [40
        /* InElement */
        , wireBlock, guid, wireDestination, wireInsertBefore];
      }
    };

    _proto17.InvokeBlock = function InvokeBlock(_ref84) {
      var head = _ref84.head,
          args = _ref84.args,
          blocks = _ref84.blocks;
      return [6
      /* Block */
      , EXPR.expr(head)].concat(EXPR.Args(args), [CONTENT.NamedBlocks(blocks)]);
    };

    _proto17.AppendTrustedHTML = function AppendTrustedHTML(_ref85) {
      var html = _ref85.html;
      return [2
      /* TrustingAppend */
      , EXPR.expr(html)];
    };

    _proto17.AppendTextNode = function AppendTextNode(_ref86) {
      var text = _ref86.text;
      return [1
      /* Append */
      , EXPR.expr(text)];
    };

    _proto17.AppendComment = function AppendComment(_ref87) {
      var value = _ref87.value;
      return [3
      /* Comment */
      , value.chars];
    };

    _proto17.SimpleElement = function SimpleElement(_ref88) {
      var tag = _ref88.tag,
          params = _ref88.params,
          body = _ref88.body,
          dynamicFeatures = _ref88.dynamicFeatures;
      var op = dynamicFeatures ? 11
      /* OpenElementWithSplat */
      : 10
      /* OpenElement */
      ;
      return new WireStatements([[op, deflateTagName(tag.chars)]].concat(CONTENT.ElementParameters(params).toArray(), [[12
      /* FlushElement */
      ]], CONTENT.list(body), [[13
      /* CloseElement */
      ]]));
    };

    _proto17.Component = function Component(_ref89) {
      var tag = _ref89.tag,
          params = _ref89.params,
          args = _ref89.args,
          blocks = _ref89.blocks;
      var wireTag = EXPR.expr(tag);
      var wirePositional = CONTENT.ElementParameters(params);
      var wireNamed = EXPR.NamedArguments(args);
      var wireNamedBlocks = CONTENT.NamedBlocks(blocks);
      return [8
      /* Component */
      , wireTag, wirePositional.toPresentArray(), wireNamed, wireNamedBlocks];
    };

    _proto17.ElementParameters = function ElementParameters(_ref90) {
      var body = _ref90.body;
      return body.map(function (p) {
        return CONTENT.ElementParameter(p);
      });
    };

    _proto17.ElementParameter = function ElementParameter(param) {
      switch (param.type) {
        case 'SplatAttr':
          return [17
          /* AttrSplat */
          , param.symbol];

        case 'DynamicAttr':
          return [dynamicAttrOp(param.kind)].concat(dynamicAttr(param));

        case 'StaticAttr':
          return [staticAttrOp(param.kind)].concat(staticAttr(param));

        case 'Modifier':
          return [4
          /* Modifier */
          , EXPR.expr(param.callee)].concat(EXPR.Args(param.args));
      }
    };

    _proto17.NamedBlocks = function NamedBlocks(_ref91) {
      var blocks = _ref91.blocks;
      var names = [];
      var serializedBlocks = [];

      for (var _iterator9 = (0, _emberBabel.createForOfIteratorHelperLoose)(blocks.toArray()), _step9; !(_step9 = _iterator9()).done;) {
        var _block = _step9.value;

        var _CONTENT$NamedBlock = CONTENT.NamedBlock(_block),
            _name3 = _CONTENT$NamedBlock[0],
            _serializedBlock = _CONTENT$NamedBlock[1];

        names.push(_name3);
        serializedBlocks.push(_serializedBlock);
      }

      return names.length > 0 ? [names, serializedBlocks] : null;
    };

    _proto17.NamedBlock = function NamedBlock(_ref92) {
      var name = _ref92.name,
          body = _ref92.body,
          scope = _ref92.scope;
      var nameChars = name.chars;

      if (nameChars === 'inverse') {
        nameChars = 'else';
      }

      return [nameChars, [CONTENT.list(body), scope.slots]];
    };

    _proto17.If = function If(_ref93) {
      var condition = _ref93.condition,
          block = _ref93.block,
          inverse = _ref93.inverse;
      return [41
      /* If */
      , EXPR.expr(condition), CONTENT.NamedBlock(block)[1], inverse ? CONTENT.NamedBlock(inverse)[1] : null];
    };

    _proto17.Each = function Each(_ref94) {
      var value = _ref94.value,
          key = _ref94.key,
          block = _ref94.block,
          inverse = _ref94.inverse;
      return [42
      /* Each */
      , EXPR.expr(value), key ? EXPR.expr(key) : null, CONTENT.NamedBlock(block)[1], inverse ? CONTENT.NamedBlock(inverse)[1] : null];
    };

    _proto17.With = function With(_ref95) {
      var value = _ref95.value,
          block = _ref95.block,
          inverse = _ref95.inverse;
      return [43
      /* With */
      , EXPR.expr(value), CONTENT.NamedBlock(block)[1], inverse ? CONTENT.NamedBlock(inverse)[1] : null];
    };

    _proto17.Let = function Let(_ref96) {
      var positional = _ref96.positional,
          block = _ref96.block;
      return [44
      /* Let */
      , EXPR.Positional(positional), CONTENT.NamedBlock(block)[1]];
    };

    _proto17.WithDynamicVars = function WithDynamicVars(_ref97) {
      var named = _ref97.named,
          block = _ref97.block;
      return [45
      /* WithDynamicVars */
      , EXPR.NamedArguments(named), CONTENT.NamedBlock(block)[1]];
    };

    _proto17.InvokeComponent = function InvokeComponent(_ref98) {
      var definition = _ref98.definition,
          args = _ref98.args,
          blocks = _ref98.blocks;
      return [46
      /* InvokeComponent */
      , EXPR.expr(definition), EXPR.Positional(args.positional), EXPR.NamedArguments(args.named), blocks ? CONTENT.NamedBlocks(blocks) : null];
    };

    return ContentEncoder;
  }();

  var CONTENT = new ContentEncoder();

  function staticAttr(_ref99) {
    var name = _ref99.name,
        value = _ref99.value,
        namespace = _ref99.namespace;
    var out = [deflateAttrName(name.chars), value.chars];

    if (namespace) {
      out.push(namespace);
    }

    return out;
  }

  function dynamicAttr(_ref100) {
    var name = _ref100.name,
        value = _ref100.value,
        namespace = _ref100.namespace;
    var out = [deflateAttrName(name.chars), EXPR.expr(value)];

    if (namespace) {
      out.push(namespace);
    }

    return out;
  }

  function staticAttrOp(kind) {
    if (kind.component) {
      return 24
      /* StaticComponentAttr */
      ;
    } else {
        return 14
        /* StaticAttr */
        ;
      }
  }

  function dynamicAttrOp(kind) {
    if (kind.component) {
      return kind.trusting ? 23
      /* TrustingComponentAttr */
      : 16
      /* ComponentAttr */
      ;
    } else {
      return kind.trusting ? 22
      /* TrustingDynamicAttr */
      : 15
      /* DynamicAttr */
      ;
    }
  }

  function visit(template) {
    var statements = CONTENT.list(template.body);
    var scope = template.scope;
    var block = [statements, scope.symbols, scope.hasEval, scope.upvars];
    return block;
  }

  var defaultId = function () {
    var req = typeof module === 'object' && typeof module.require === 'function' ? module.require : require;

    if (req) {
      try {
        var crypto = req('crypto');

        var idFn = function idFn(src) {
          var hash = crypto.createHash('sha1');
          hash.update(src, 'utf8'); // trim to 6 bytes of data (2^48 - 1)

          return hash.digest('base64').substring(0, 8);
        };

        idFn('test');
        return idFn;
      } catch (e) {}
    }

    return function idFn() {
      return null;
    };
  }();

  _exports.defaultId = defaultId;
  var defaultOptions = {
    id: defaultId
  };
  /*
   * Compile a string into a template javascript string.
   *
   * Example usage:
   *     import { precompile } from '@glimmer/compiler';
   *     import { templateFactory } from 'glimmer-runtime';
   *     let templateJs = precompile("Howdy {{name}}");
   *     let factory = templateFactory(new Function("return " + templateJs)());
   *     let template = factory.create(env);
   *
   * @method precompile
   * @param {string} string a Glimmer template string
   * @return {string} a template javascript string
   */

  function precompileJSON(string, options) {
    if (options === void 0) {
      options = defaultOptions;
    }

    var _a, _b;

    var source = new _syntax.Source(string, (_a = options.meta) === null || _a === void 0 ? void 0 : _a.moduleName);

    var _normalize = (0, _syntax.normalize)(source, options),
        ast = _normalize[0],
        locals = _normalize[1];

    var block = normalize$1(source, ast, (_b = options.strictMode) !== null && _b !== void 0 ? _b : false).mapOk(function (pass2In) {
      return visit(pass2In);
    });

    if (block.isOk) {
      return [block.value, locals];
    } else {
      throw block.reason;
    }
  } // UUID used as a unique placeholder for placing a snippet of JS code into
  // the otherwise JSON stringified value below.


  var SCOPE_PLACEHOLDER = '796d24e6-2450-4fb0-8cdf-b65638b5ef70';
  /*
   * Compile a string into a template javascript string.
   *
   * Example usage:
   *     import { precompile } from '@glimmer/compiler';
   *     import { templateFactory } from 'glimmer-runtime';
   *     let templateJs = precompile("Howdy {{name}}");
   *     let factory = templateFactory(new Function("return " + templateJs)());
   *     let template = factory.create(env);
   *
   * @method precompile
   * @param {string} string a Glimmer template string
   * @return {string} a template javascript string
   */

  function precompile(source, options) {
    if (options === void 0) {
      options = defaultOptions;
    }

    var _a, _b;

    var _precompileJSON = precompileJSON(source, options),
        block = _precompileJSON[0],
        usedLocals = _precompileJSON[1];

    var moduleName = (_a = options.meta) === null || _a === void 0 ? void 0 : _a.moduleName;
    var idFn = options.id || defaultId;
    var blockJSON = JSON.stringify(block);
    var templateJSONObject = {
      id: idFn(JSON.stringify(options.meta) + blockJSON),
      block: blockJSON,
      moduleName: moduleName !== null && moduleName !== void 0 ? moduleName : '(unknown template module)',
      // lying to the type checker here because we're going to
      // replace it just below, after stringification
      scope: SCOPE_PLACEHOLDER,
      isStrictMode: (_b = options.strictMode) !== null && _b !== void 0 ? _b : false
    };

    if (usedLocals.length === 0) {
      delete templateJSONObject.scope;
    } // JSON is javascript


    var stringified = JSON.stringify(templateJSONObject);

    if (usedLocals.length > 0) {
      var scopeFn = "()=>[" + usedLocals.join(',') + "]";
      stringified = stringified.replace("\"" + SCOPE_PLACEHOLDER + "\"", scopeFn);
    }

    return stringified;
  }

  var VariableKind;

  (function (VariableKind) {
    VariableKind["Local"] = "Local";
    VariableKind["Free"] = "Free";
    VariableKind["Arg"] = "Arg";
    VariableKind["Block"] = "Block";
    VariableKind["This"] = "This";
  })(VariableKind || (VariableKind = {}));

  function normalizeStatement(statement) {
    if (Array.isArray(statement)) {
      if (statementIsExpression(statement)) {
        return normalizeAppendExpression(statement);
      } else if (isSugaryArrayStatement(statement)) {
        return normalizeSugaryArrayStatement(statement);
      } else {
        return normalizeVerboseStatement(statement);
      }
    } else if (typeof statement === 'string') {
      return normalizeAppendHead(normalizeDottedPath(statement), false);
    } else {
      throw (0, _util.assertNever)(statement);
    }
  }

  function normalizeAppendHead(head, trusted) {
    if (head.type === "GetPath"
    /* GetPath */
    ) {
        return {
          kind: "AppendPath"
          /* AppendPath */
          ,
          path: head,
          trusted: trusted
        };
      } else {
      return {
        kind: "AppendExpr"
        /* AppendExpr */
        ,
        expr: head,
        trusted: trusted
      };
    }
  }

  function isSugaryArrayStatement(statement) {
    if (Array.isArray(statement) && typeof statement[0] === 'string') {
      switch (statement[0][0]) {
        case '(':
        case '#':
        case '<':
        case '!':
          return true;

        default:
          return false;
      }
    }

    return false;
  }

  function normalizeSugaryArrayStatement(statement) {
    var name = statement[0];

    switch (name[0]) {
      case '(':
        {
          var params = null;
          var hash = null;

          if (statement.length === 3) {
            params = normalizeParams(statement[1]);
            hash = normalizeHash(statement[2]);
          } else if (statement.length === 2) {
            if (Array.isArray(statement[1])) {
              params = normalizeParams(statement[1]);
            } else {
              hash = normalizeHash(statement[1]);
            }
          }

          return {
            kind: "Call"
            /* Call */
            ,
            head: normalizeCallHead(name),
            params: params,
            hash: hash,
            trusted: false
          };
        }

      case '#':
        {
          var _normalizeBuilderBloc = normalizeBuilderBlockStatement(statement),
              path = _normalizeBuilderBloc.head,
              _params = _normalizeBuilderBloc.params,
              _hash = _normalizeBuilderBloc.hash,
              blocks = _normalizeBuilderBloc.blocks,
              blockParams = _normalizeBuilderBloc.blockParams;

          return {
            kind: "Block"
            /* Block */
            ,
            head: path,
            params: _params,
            hash: _hash,
            blocks: blocks,
            blockParams: blockParams
          };
        }

      case '!':
        {
          var _name4 = statement[0].slice(1);

          var _normalizeBuilderBloc2 = normalizeBuilderBlockStatement(statement),
              _params2 = _normalizeBuilderBloc2.params,
              _hash2 = _normalizeBuilderBloc2.hash,
              _blocks = _normalizeBuilderBloc2.blocks,
              _blockParams = _normalizeBuilderBloc2.blockParams;

          return {
            kind: "Keyword"
            /* Keyword */
            ,
            name: _name4,
            params: _params2,
            hash: _hash2,
            blocks: _blocks,
            blockParams: _blockParams
          };
        }

      case '<':
        {
          var attrs = (0, _util.dict)();
          var block = [];

          if (statement.length === 3) {
            attrs = normalizeAttrs(statement[1]);
            block = normalizeBlock(statement[2]);
          } else if (statement.length === 2) {
            if (Array.isArray(statement[1])) {
              block = normalizeBlock(statement[1]);
            } else {
              attrs = normalizeAttrs(statement[1]);
            }
          }

          return {
            kind: "Element"
            /* Element */
            ,
            name: extractElement(name),
            attrs: attrs,
            block: block
          };
        }

      default:
        throw new Error("Unreachable " + JSON.stringify(statement) + " in normalizeSugaryArrayStatement");
    }
  }

  function normalizeVerboseStatement(statement) {
    switch (statement[0]) {
      case 0
      /* Literal */
      :
        {
          return {
            kind: "Literal"
            /* Literal */
            ,
            value: statement[1]
          };
        }

      case 2
      /* Append */
      :
        {
          return normalizeAppendExpression(statement[1], statement[2]);
        }

      case 3
      /* Modifier */
      :
        {
          return {
            kind: "Modifier"
            /* Modifier */
            ,
            params: normalizeParams(statement[1]),
            hash: normalizeHash(statement[2])
          };
        }

      case 4
      /* DynamicComponent */
      :
        {
          return {
            kind: "DynamicComponent"
            /* DynamicComponent */
            ,
            expr: normalizeExpression(statement[1]),
            hash: normalizeHash(statement[2]),
            block: normalizeBlock(statement[3])
          };
        }

      case 1
      /* Comment */
      :
        {
          return {
            kind: "Comment"
            /* Comment */
            ,
            value: statement[1]
          };
        }
    }
  }

  function extractBlockHead(name) {
    var result = /^(#|!)(.*)$/.exec(name);

    if (result === null) {
      throw new Error("Unexpected missing # in block head");
    }

    return normalizeDottedPath(result[2]);
  }

  function normalizeCallHead(name) {
    var result = /^\((.*)\)$/.exec(name);

    if (result === null) {
      throw new Error("Unexpected missing () in call head");
    }

    return normalizeDottedPath(result[1]);
  }

  function normalizePath(head, tail) {
    if (tail === void 0) {
      tail = [];
    }

    var pathHead = normalizePathHead(head);

    if ((0, _util.isPresent)(tail)) {
      return {
        type: "GetPath"
        /* GetPath */
        ,
        path: {
          head: pathHead,
          tail: tail
        }
      };
    } else {
      return {
        type: "GetVar"
        /* GetVar */
        ,
        variable: pathHead
      };
    }
  }

  function normalizeDottedPath(whole) {
    var _normalizePathHead = normalizePathHead(whole),
        kind = _normalizePathHead.kind,
        rest = _normalizePathHead.name;

    var _rest$split = rest.split('.'),
        name = _rest$split[0],
        tail = _rest$split.slice(1);

    var variable = {
      kind: kind,
      name: name,
      mode: 'loose'
    };

    if ((0, _util.isPresent)(tail)) {
      return {
        type: "GetPath"
        /* GetPath */
        ,
        path: {
          head: variable,
          tail: tail
        }
      };
    } else {
      return {
        type: "GetVar"
        /* GetVar */
        ,
        variable: variable
      };
    }
  }

  function normalizePathHead(whole) {
    var kind;
    var name;

    if (/^this(\.|$)/.exec(whole)) {
      return {
        kind: VariableKind.This,
        name: whole,
        mode: 'loose'
      };
    }

    switch (whole[0]) {
      case '^':
        kind = VariableKind.Free;
        name = whole.slice(1);
        break;

      case '@':
        kind = VariableKind.Arg;
        name = whole.slice(1);
        break;

      case '&':
        kind = VariableKind.Block;
        name = whole.slice(1);
        break;

      default:
        kind = VariableKind.Local;
        name = whole;
    }

    return {
      kind: kind,
      name: name,
      mode: 'loose'
    };
  }

  function normalizeBuilderBlockStatement(statement) {
    var head = statement[0];
    var blocks = (0, _util.dict)();
    var params = null;
    var hash = null;
    var blockParams = null;

    if (statement.length === 2) {
      blocks = normalizeBlocks(statement[1]);
    } else if (statement.length === 3) {
      if (Array.isArray(statement[1])) {
        params = normalizeParams(statement[1]);
      } else {
        var _normalizeBlockHash = normalizeBlockHash(statement[1]);

        hash = _normalizeBlockHash.hash;
        blockParams = _normalizeBlockHash.blockParams;
      }

      blocks = normalizeBlocks(statement[2]);
    } else if (statement.length === 4) {
      params = normalizeParams(statement[1]);

      var _normalizeBlockHash2 = normalizeBlockHash(statement[2]);

      hash = _normalizeBlockHash2.hash;
      blockParams = _normalizeBlockHash2.blockParams;
      blocks = normalizeBlocks(statement[3]);
    }

    return {
      head: extractBlockHead(head),
      params: params,
      hash: hash,
      blockParams: blockParams,
      blocks: blocks
    };
  }

  function normalizeBlockHash(hash) {
    if (hash === null) {
      return {
        hash: null,
        blockParams: null
      };
    }

    var out = null;
    var blockParams = null;
    entries(hash, function (key, value) {
      if (key === 'as') {
        blockParams = Array.isArray(value) ? value : [value];
      } else {
        out = out || (0, _util.dict)();
        out[key] = normalizeExpression(value);
      }
    });
    return {
      hash: out,
      blockParams: blockParams
    };
  }

  function entries(dict$$1, callback) {
    Object.keys(dict$$1).forEach(function (key) {
      var value = dict$$1[key];
      callback(key, value);
    });
  }

  function normalizeBlocks(value) {
    if (Array.isArray(value)) {
      return {
        default: normalizeBlock(value)
      };
    } else {
      return mapObject(value, normalizeBlock);
    }
  }

  function normalizeBlock(block) {
    return block.map(function (s) {
      return normalizeStatement(s);
    });
  }

  function normalizeAttrs(attrs) {
    return mapObject(attrs, function (a) {
      return normalizeAttr(a).expr;
    });
  }

  function normalizeAttr(attr) {
    if (attr === 'splat') {
      return {
        expr: "Splat"
        /* Splat */
        ,
        trusted: false
      };
    } else {
      var expr = normalizeExpression(attr);
      return {
        expr: expr,
        trusted: false
      };
    }
  }

  function mapObject(object, callback) {
    var out = (0, _util.dict)();
    Object.keys(object).forEach(function (k) {
      out[k] = callback(object[k], k);
    });
    return out;
  }

  function extractElement(input) {
    var match = /^<([a-z0-9\-][a-zA-Z0-9\-]*)>$/.exec(input);
    return match ? match[1] : null;
  }

  function normalizeAppendExpression(expression, forceTrusted) {
    if (forceTrusted === void 0) {
      forceTrusted = false;
    }

    if (expression === null || expression === undefined) {
      return {
        expr: {
          type: "Literal"
          /* Literal */
          ,
          value: expression
        },
        kind: "AppendExpr"
        /* AppendExpr */
        ,
        trusted: false
      };
    } else if (Array.isArray(expression)) {
      switch (expression[0]) {
        case 0
        /* Literal */
        :
          return {
            expr: {
              type: "Literal"
              /* Literal */
              ,
              value: expression[1]
            },
            kind: "AppendExpr"
            /* AppendExpr */
            ,
            trusted: false
          };

        case 5
        /* Get */
        :
          {
            return normalizeAppendHead(normalizePath(expression[1], expression[2]), forceTrusted);
          }

        case 6
        /* Concat */
        :
          {
            var expr = {
              type: "Concat"
              /* Concat */
              ,
              params: normalizeParams(expression.slice(1))
            };
            return {
              expr: expr,
              kind: "AppendExpr"
              /* AppendExpr */
              ,
              trusted: forceTrusted
            };
          }

        case 7
        /* HasBlock */
        :
          return {
            expr: {
              type: "HasBlock"
              /* HasBlock */
              ,
              name: expression[1]
            },
            kind: "AppendExpr"
            /* AppendExpr */
            ,
            trusted: forceTrusted
          };

        case 8
        /* HasBlockParams */
        :
          return {
            expr: {
              type: "HasBlockParams"
              /* HasBlockParams */
              ,
              name: expression[1]
            },
            kind: "AppendExpr"
            /* AppendExpr */
            ,
            trusted: forceTrusted
          };

        default:
          {
            if (isBuilderCallExpression(expression)) {
              return {
                expr: normalizeCallExpression(expression),
                kind: "AppendExpr"
                /* AppendExpr */
                ,
                trusted: forceTrusted
              };
            } else {
              throw new Error("Unexpected array in expression position (wasn't a tuple expression and " + expression[0] + " isn't wrapped in parens, so it isn't a call): " + JSON.stringify(expression));
            }
          }
        // BuilderCallExpression
      }
    } else if (typeof expression !== 'object') {
      switch (typeof expression) {
        case 'string':
          {
            return normalizeAppendHead(normalizeDottedPath(expression), forceTrusted);
          }

        case 'boolean':
        case 'number':
          return {
            expr: {
              type: "Literal"
              /* Literal */
              ,
              value: expression
            },
            kind: "AppendExpr"
            /* AppendExpr */
            ,
            trusted: true
          };

        default:
          throw (0, _util.assertNever)(expression);
      }
    } else {
      throw (0, _util.assertNever)(expression);
    }
  }

  function normalizeExpression(expression) {
    if (expression === null || expression === undefined) {
      return {
        type: "Literal"
        /* Literal */
        ,
        value: expression
      };
    } else if (Array.isArray(expression)) {
      switch (expression[0]) {
        case 0
        /* Literal */
        :
          return {
            type: "Literal"
            /* Literal */
            ,
            value: expression[1]
          };

        case 5
        /* Get */
        :
          {
            return normalizePath(expression[1], expression[2]);
          }

        case 6
        /* Concat */
        :
          {
            var expr = {
              type: "Concat"
              /* Concat */
              ,
              params: normalizeParams(expression.slice(1))
            };
            return expr;
          }

        case 7
        /* HasBlock */
        :
          return {
            type: "HasBlock"
            /* HasBlock */
            ,
            name: expression[1]
          };

        case 8
        /* HasBlockParams */
        :
          return {
            type: "HasBlockParams"
            /* HasBlockParams */
            ,
            name: expression[1]
          };

        default:
          {
            if (isBuilderCallExpression(expression)) {
              return normalizeCallExpression(expression);
            } else {
              throw new Error("Unexpected array in expression position (wasn't a tuple expression and " + expression[0] + " isn't wrapped in parens, so it isn't a call): " + JSON.stringify(expression));
            }
          }
        // BuilderCallExpression
      }
    } else if (typeof expression !== 'object') {
      switch (typeof expression) {
        case 'string':
          {
            return normalizeDottedPath(expression);
          }

        case 'boolean':
        case 'number':
          return {
            type: "Literal"
            /* Literal */
            ,
            value: expression
          };

        default:
          throw (0, _util.assertNever)(expression);
      }
    } else {
      throw (0, _util.assertNever)(expression);
    }
  }

  function statementIsExpression(statement) {
    if (!Array.isArray(statement)) {
      return false;
    }

    var name = statement[0];

    if (typeof name === 'number') {
      switch (name) {
        case 0
        /* Literal */
        :
        case 5
        /* Get */
        :
        case 6
        /* Concat */
        :
        case 7
        /* HasBlock */
        :
        case 8
        /* HasBlockParams */
        :
          return true;

        default:
          return false;
      }
    }

    if (name[0] === '(') {
      return true;
    }

    return false;
  }

  function isBuilderCallExpression(value) {
    return typeof value[0] === 'string' && value[0][0] === '(';
  }

  function normalizeParams(input) {
    return input.map(normalizeExpression);
  }

  function normalizeHash(input) {
    if (input === null) return null;
    return mapObject(input, normalizeExpression);
  }

  function normalizeCallExpression(expr) {
    switch (expr.length) {
      case 1:
        return {
          type: "Call"
          /* Call */
          ,
          head: normalizeCallHead(expr[0]),
          params: null,
          hash: null
        };

      case 2:
        {
          if (Array.isArray(expr[1])) {
            return {
              type: "Call"
              /* Call */
              ,
              head: normalizeCallHead(expr[0]),
              params: normalizeParams(expr[1]),
              hash: null
            };
          } else {
            return {
              type: "Call"
              /* Call */
              ,
              head: normalizeCallHead(expr[0]),
              params: null,
              hash: normalizeHash(expr[1])
            };
          }
        }

      case 3:
        return {
          type: "Call"
          /* Call */
          ,
          head: normalizeCallHead(expr[0]),
          params: normalizeParams(expr[1]),
          hash: normalizeHash(expr[2])
        };
    }
  }

  var ProgramSymbols = /*#__PURE__*/function () {
    function ProgramSymbols() {
      this._freeVariables = [];
      this._symbols = ['this'];
      this.top = this;
    }

    var _proto18 = ProgramSymbols.prototype;

    _proto18.toSymbols = function toSymbols() {
      return this._symbols.slice(1);
    };

    _proto18.toUpvars = function toUpvars() {
      return this._freeVariables;
    };

    _proto18.freeVar = function freeVar(name) {
      return addString(this._freeVariables, name);
    };

    _proto18.block = function block(name) {
      return this.symbol(name);
    };

    _proto18.arg = function arg(name) {
      return addString(this._symbols, name);
    };

    _proto18.local = function local(name) {
      throw new Error("No local " + name + " was found. Maybe you meant ^" + name + " for upvar, or !" + name + " for keyword?");
    };

    _proto18.this = function _this() {
      return 0;
    };

    _proto18.hasLocal = function hasLocal(_name) {
      return false;
    } // any symbol
    ;

    _proto18.symbol = function symbol(name) {
      return addString(this._symbols, name);
    };

    _proto18.child = function child(locals) {
      return new LocalSymbols(this, locals);
    };

    return ProgramSymbols;
  }();

  _exports.ProgramSymbols = ProgramSymbols;

  var LocalSymbols = /*#__PURE__*/function () {
    function LocalSymbols(parent, locals) {
      this.parent = parent;
      this.locals = (0, _util.dict)();

      for (var _iterator10 = (0, _emberBabel.createForOfIteratorHelperLoose)(locals), _step10; !(_step10 = _iterator10()).done;) {
        var _local = _step10.value;
        this.locals[_local] = parent.top.symbol(_local);
      }
    }

    var _proto19 = LocalSymbols.prototype;

    _proto19.freeVar = function freeVar(name) {
      return this.parent.freeVar(name);
    };

    _proto19.arg = function arg(name) {
      return this.parent.arg(name);
    };

    _proto19.block = function block(name) {
      return this.parent.block(name);
    };

    _proto19.local = function local(name) {
      if (name in this.locals) {
        return this.locals[name];
      } else {
        return this.parent.local(name);
      }
    };

    _proto19.this = function _this() {
      return this.parent.this();
    };

    _proto19.hasLocal = function hasLocal(name) {
      if (name in this.locals) {
        return true;
      } else {
        return this.parent.hasLocal(name);
      }
    };

    _proto19.child = function child(locals) {
      return new LocalSymbols(this, locals);
    };

    (0, _emberBabel.createClass)(LocalSymbols, [{
      key: "paramSymbols",
      get: function get() {
        return (0, _util.values)(this.locals);
      }
    }, {
      key: "top",
      get: function get() {
        return this.parent.top;
      }
    }]);
    return LocalSymbols;
  }();

  function addString(array, item) {
    var index = array.indexOf(item);

    if (index === -1) {
      index = array.length;
      array.push(item);
      return index;
    } else {
      return index;
    }
  }

  function unimpl(message) {
    return new Error("unimplemented " + message);
  }

  function buildStatements(statements, symbols) {
    var out = [];
    statements.forEach(function (s) {
      return out.push.apply(out, buildStatement(normalizeStatement(s), symbols));
    });
    return out;
  }

  function buildNormalizedStatements(statements, symbols) {
    var out = [];
    statements.forEach(function (s) {
      return out.push.apply(out, buildStatement(s, symbols));
    });
    return out;
  }

  function buildStatement(normalized, symbols) {
    if (symbols === void 0) {
      symbols = new ProgramSymbols();
    }

    switch (normalized.kind) {
      case "AppendPath"
      /* AppendPath */
      :
        {
          return [[normalized.trusted ? 2
          /* TrustingAppend */
          : 1
          /* Append */
          , buildGetPath(normalized.path, symbols)]];
        }

      case "AppendExpr"
      /* AppendExpr */
      :
        {
          return [[normalized.trusted ? 2
          /* TrustingAppend */
          : 1
          /* Append */
          , buildExpression(normalized.expr, normalized.trusted ? 'TrustedAppend' : 'Append', symbols)]];
        }

      case "Call"
      /* Call */
      :
        {
          var path = normalized.head,
              params = normalized.params,
              hash = normalized.hash,
              trusted = normalized.trusted;
          var builtParams = params ? buildParams(params, symbols) : null;
          var builtHash = hash ? buildHash(hash, symbols) : null;
          var builtExpr = buildCallHead(path, trusted ? 3
          /* AmbiguousInvoke */
          : 2
          /* AmbiguousAppendInvoke */
          , symbols);
          return [[trusted ? 2
          /* TrustingAppend */
          : 1
          /* Append */
          , [28
          /* Call */
          , builtExpr, builtParams, builtHash]]];
        }

      case "Literal"
      /* Literal */
      :
        {
          return [[1
          /* Append */
          , normalized.value]];
        }

      case "Comment"
      /* Comment */
      :
        {
          return [[3
          /* Comment */
          , normalized.value]];
        }

      case "Block"
      /* Block */
      :
        {
          var blocks = buildBlocks(normalized.blocks, normalized.blockParams, symbols);

          var _hash3 = buildHash(normalized.hash, symbols);

          var _params3 = buildParams(normalized.params, symbols);

          var _path = buildCallHead(normalized.head, 7
          /* ResolveAsComponentHead */
          , symbols);

          return [[6
          /* Block */
          , _path, _params3, _hash3, blocks]];
        }

      case "Keyword"
      /* Keyword */
      :
        {
          return [buildKeyword(normalized, symbols)];
        }

      case "Element"
      /* Element */
      :
        return buildElement(normalized, symbols);

      case "Modifier"
      /* Modifier */
      :
        throw unimpl('modifier');

      case "DynamicComponent"
      /* DynamicComponent */
      :
        throw unimpl('dynamic component');

      default:
        throw (0, _util.assertNever)(normalized);
    }
  }

  function s(arr) {
    for (var _len2 = arguments.length, interpolated = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      interpolated[_key2 - 1] = arguments[_key2];
    }

    var result = arr.reduce(function (result, string, i) {
      return result + ("" + string + (interpolated[i] ? String(interpolated[i]) : ''));
    }, '');
    return [0
    /* Literal */
    , result];
  }

  function c(arr) {
    for (var _len3 = arguments.length, interpolated = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      interpolated[_key3 - 1] = arguments[_key3];
    }

    var result = arr.reduce(function (result, string, i) {
      return result + ("" + string + (interpolated[i] ? String(interpolated[i]) : ''));
    }, '');
    return [1
    /* Comment */
    , result];
  }

  function unicode(charCode) {
    return String.fromCharCode(parseInt(charCode, 16));
  }

  var NEWLINE = '\n';
  _exports.NEWLINE = NEWLINE;

  function buildKeyword(normalized, symbols) {
    var name = normalized.name;
    var params = buildParams(normalized.params, symbols);
    var childSymbols = symbols.child(normalized.blockParams || []);
    var block = buildBlock(normalized.blocks.default, childSymbols, childSymbols.paramSymbols);
    var inverse = normalized.blocks.else ? buildBlock(normalized.blocks.else, symbols, []) : null;

    switch (name) {
      case 'with':
        return [43
        /* With */
        , params[0], block, inverse];

      case 'if':
        return [41
        /* If */
        , params[0], block, inverse];

      case 'each':
        var keyExpr = normalized.hash ? normalized.hash['key'] : null;
        var key = keyExpr ? buildExpression(keyExpr, 'Generic', symbols) : null;
        return [42
        /* Each */
        , params[0], key, block, inverse];

      default:
        throw new Error('unimplemented keyword');
    }
  }

  function buildElement(_ref101, symbols) {
    var name = _ref101.name,
        attrs = _ref101.attrs,
        block = _ref101.block;
    var out = [hasSplat(attrs) ? [11
    /* OpenElementWithSplat */
    , name] : [10
    /* OpenElement */
    , name]];

    if (attrs) {
      var _buildElementParams = buildElementParams(attrs, symbols),
          params = _buildElementParams.params,
          args = _buildElementParams.args;

      out.push.apply(out, params);
    }

    out.push([12
    /* FlushElement */
    ]);

    if (Array.isArray(block)) {
      block.forEach(function (s) {
        return out.push.apply(out, buildStatement(s, symbols));
      });
    } else if (block === null) {// do nothing
    } else {
      throw (0, _util.assertNever)(block);
    }

    out.push([13
    /* CloseElement */
    ]);
    return out;
  }

  function hasSplat(attrs) {
    if (attrs === null) return false;
    return Object.keys(attrs).some(function (a) {
      return attrs[a] === "Splat";
    }
    /* Splat */
    );
  }

  function buildElementParams(attrs, symbols) {
    var params = [];
    var keys = [];
    var values$$1 = [];
    Object.keys(attrs).forEach(function (key) {
      var value = attrs[key];

      if (value === "Splat"
      /* Splat */
      ) {
          params.push([17
          /* AttrSplat */
          , symbols.block('&attrs')]);
        } else if (key[0] === '@') {
        keys.push(key);
        values$$1.push(buildExpression(value, 'Strict', symbols));
      } else {
        params.push.apply(params, buildAttributeValue(key, value, // TODO: extract namespace from key
        extractNamespace(key), symbols));
      }
    });
    return {
      params: params,
      args: (0, _util.isPresent)(keys) && (0, _util.isPresent)(values$$1) ? [keys, values$$1] : null
    };
  }

  function extractNamespace(name) {
    if (name === 'xmlns') {
      return "http://www.w3.org/2000/xmlns/"
      /* XMLNS */
      ;
    }

    var match = /^([^:]*):([^:]*)$/.exec(name);

    if (match === null) {
      return null;
    }

    var namespace = match[1];

    switch (namespace) {
      case 'xlink':
        return "http://www.w3.org/1999/xlink"
        /* XLink */
        ;

      case 'xml':
        return "http://www.w3.org/XML/1998/namespace"
        /* XML */
        ;

      case 'xmlns':
        return "http://www.w3.org/2000/xmlns/"
        /* XMLNS */
        ;
    }

    return null;
  }

  function buildAttributeValue(name, value, namespace, symbols) {
    switch (value.type) {
      case "Literal"
      /* Literal */
      :
        {
          var val = value.value;

          if (val === false) {
            return [];
          } else if (val === true) {
            return [[14
            /* StaticAttr */
            , name, '', namespace !== null && namespace !== void 0 ? namespace : undefined]];
          } else if (typeof val === 'string') {
            return [[14
            /* StaticAttr */
            , name, val, namespace !== null && namespace !== void 0 ? namespace : undefined]];
          } else {
            throw new Error("Unexpected/unimplemented literal attribute " + JSON.stringify(val));
          }
        }

      default:
        return [[15
        /* DynamicAttr */
        , name, buildExpression(value, 'AttrValue', symbols), namespace !== null && namespace !== void 0 ? namespace : undefined]];
    }
  }

  function varContext(context, bare) {
    switch (context) {
      case 'Append':
        return bare ? 'AppendBare' : 'AppendInvoke';

      case 'TrustedAppend':
        return bare ? 'TrustedAppendBare' : 'TrustedAppendInvoke';

      case 'AttrValue':
        return bare ? 'AttrValueBare' : 'AttrValueInvoke';

      default:
        return context;
    }
  }

  function buildExpression(expr, context, symbols) {
    switch (expr.type) {
      case "GetPath"
      /* GetPath */
      :
        {
          return buildGetPath(expr, symbols);
        }

      case "GetVar"
      /* GetVar */
      :
        {
          return buildVar(expr.variable, varContext(context, true), symbols);
        }

      case "Concat"
      /* Concat */
      :
        {
          return [29
          /* Concat */
          , buildConcat(expr.params, symbols)];
        }

      case "Call"
      /* Call */
      :
        {
          var builtParams = buildParams(expr.params, symbols);
          var builtHash = buildHash(expr.hash, symbols);
          var builtExpr = buildCallHead(expr.head, context === 'Generic' ? 'SubExpression' : varContext(context, false), symbols);
          return [28
          /* Call */
          , builtExpr, builtParams, builtHash];
        }

      case "HasBlock"
      /* HasBlock */
      :
        {
          return [48
          /* HasBlock */
          , buildVar({
            kind: VariableKind.Block,
            name: expr.name,
            mode: 'loose'
          }, 4
          /* LooseFreeVariable */
          , symbols)];
        }

      case "HasBlockParams"
      /* HasBlockParams */
      :
        {
          return [49
          /* HasBlockParams */
          , buildVar({
            kind: VariableKind.Block,
            name: expr.name,
            mode: 'loose'
          }, 4
          /* LooseFreeVariable */
          , symbols)];
        }

      case "Literal"
      /* Literal */
      :
        {
          if (expr.value === undefined) {
            return [27
            /* Undefined */
            ];
          } else {
            return expr.value;
          }
        }

      default:
        (0, _util.assertNever)(expr);
    }
  }

  function buildCallHead(callHead, context, symbols) {
    if (callHead.type === "GetVar"
    /* GetVar */
    ) {
        return buildVar(callHead.variable, context, symbols);
      } else {
      return buildGetPath(callHead, symbols);
    }
  }

  function buildGetPath(head, symbols) {
    return buildVar(head.path.head, 4
    /* LooseFreeVariable */
    , symbols, head.path.tail);
  }

  function buildVar(head, context, symbols, path) {
    var op = 30
    /* GetSymbol */
    ;
    var sym;

    switch (head.kind) {
      case VariableKind.Free:
        if (context === 'Strict') {
          op = 31
          /* GetStrictFree */
          ;
        } else if (context === 'AppendBare') {
          op = 34
          /* GetFreeAsComponentOrHelperHeadOrThisFallback */
          ;
        } else if (context === 'AppendInvoke') {
          op = 35
          /* GetFreeAsComponentOrHelperHead */
          ;
        } else if (context === 'TrustedAppendBare') {
          op = 36
          /* GetFreeAsHelperHeadOrThisFallback */
          ;
        } else if (context === 'TrustedAppendInvoke') {
          op = 37
          /* GetFreeAsHelperHead */
          ;
        } else if (context === 'AttrValueBare') {
          op = 36
          /* GetFreeAsHelperHeadOrThisFallback */
          ;
        } else if (context === 'AttrValueInvoke') {
          op = 37
          /* GetFreeAsHelperHead */
          ;
        } else if (context === 'SubExpression') {
          op = 37
          /* GetFreeAsHelperHead */
          ;
        } else if (context === 'Generic') {
          op = 33
          /* GetFreeAsFallback */
          ;
        } else {
          op = expressionContextOp(context);
        }

        sym = symbols.freeVar(head.name);
        break;

      default:
        op = 30
        /* GetSymbol */
        ;
        sym = getSymbolForVar(head.kind, symbols, head.name);
    }

    if (path === undefined || path.length === 0) {
      return [op, sym];
    } else {
      return [op, sym, path];
    }
  }

  function getSymbolForVar(kind, symbols, name) {
    switch (kind) {
      case VariableKind.Arg:
        return symbols.arg(name);

      case VariableKind.Block:
        return symbols.block(name);

      case VariableKind.Local:
        return symbols.local(name);

      case VariableKind.This:
        return symbols.this();

      default:
        return (0, _util.exhausted)(kind);
    }
  }

  function expressionContextOp(context) {
    switch (context) {
      case 0
      /* Strict */
      :
        return 31
        /* GetStrictFree */
        ;

      case 1
      /* AmbiguousAppend */
      :
        return 34
        /* GetFreeAsComponentOrHelperHeadOrThisFallback */
        ;

      case 2
      /* AmbiguousAppendInvoke */
      :
        return 35
        /* GetFreeAsComponentOrHelperHead */
        ;

      case 3
      /* AmbiguousInvoke */
      :
        return 36
        /* GetFreeAsHelperHeadOrThisFallback */
        ;

      case 4
      /* LooseFreeVariable */
      :
        return 33
        /* GetFreeAsFallback */
        ;

      case 5
      /* ResolveAsCallHead */
      :
        return 37
        /* GetFreeAsHelperHead */
        ;

      case 6
      /* ResolveAsModifierHead */
      :
        return 38
        /* GetFreeAsModifierHead */
        ;

      case 7
      /* ResolveAsComponentHead */
      :
        return 39
        /* GetFreeAsComponentHead */
        ;

      default:
        return (0, _util.exhausted)(context);
    }
  }

  function buildParams(exprs, symbols) {
    if (exprs === null || !(0, _util.isPresent)(exprs)) return null;
    return exprs.map(function (e) {
      return buildExpression(e, 'Generic', symbols);
    });
  }

  function buildConcat(exprs, symbols) {
    return exprs.map(function (e) {
      return buildExpression(e, 'AttrValue', symbols);
    });
  }

  function buildHash(exprs, symbols) {
    if (exprs === null) return null;
    var out = [[], []];
    Object.keys(exprs).forEach(function (key) {
      out[0].push(key);
      out[1].push(buildExpression(exprs[key], 'Generic', symbols));
    });
    return out;
  }

  function buildBlocks(blocks, blockParams, parent) {
    var keys = [];
    var values$$1 = [];
    Object.keys(blocks).forEach(function (name) {
      keys.push(name);

      if (name === 'default') {
        var symbols = parent.child(blockParams || []);
        values$$1.push(buildBlock(blocks[name], symbols, symbols.paramSymbols));
      } else {
        values$$1.push(buildBlock(blocks[name], parent, []));
      }
    });
    return [keys, values$$1];
  }

  function buildBlock(block, symbols, locals) {
    if (locals === void 0) {
      locals = [];
    }

    return [buildNormalizedStatements(block, symbols), locals];
  }
});
define("@glimmer/env", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.CI = _exports.DEBUG = void 0;
  var DEBUG = false;
  _exports.DEBUG = DEBUG;
  var CI = false;
  _exports.CI = CI;
});
define("@glimmer/syntax", ["exports", "ember-babel", "@glimmer/util", "simple-html-tokenizer", "@handlebars/parser"], function (_exports, _emberBabel, _util, _simpleHtmlTokenizer, _parser) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.normalize = normalize;
  _exports.generateSyntaxError = generateSyntaxError;
  _exports.preprocess = preprocess;
  _exports.print = build;
  _exports.sortByLoc = sortByLoc;
  _exports.traverse = traverse;
  _exports.cannotRemoveNode = cannotRemoveNode;
  _exports.cannotReplaceNode = cannotReplaceNode;
  _exports.isKeyword = isKeyword;
  _exports.getTemplateLocals = getTemplateLocals;
  _exports.maybeLoc = maybeLoc;
  _exports.loc = loc;
  _exports.hasSpan = hasSpan;
  _exports.node = node;
  _exports.SpanList = _exports.SourceSpan = _exports.SourceSlice = _exports.KEYWORDS_TYPES = _exports.WalkerPath = _exports.Path = _exports.Walker = _exports.ProgramSymbolTable = _exports.BlockSymbolTable = _exports.SymbolTable = _exports.builders = _exports.Source = _exports.ASTv2 = _exports.AST = _exports.ASTv1 = void 0;
  var UNKNOWN_POSITION = Object.freeze({
    line: 1,
    column: 0
  });
  var SYNTHETIC_LOCATION = Object.freeze({
    source: '(synthetic)',
    start: UNKNOWN_POSITION,
    end: UNKNOWN_POSITION
  });
  var TEMPORARY_LOCATION = Object.freeze({
    source: '(temporary)',
    start: UNKNOWN_POSITION,
    end: UNKNOWN_POSITION
  });
  var NON_EXISTENT_LOCATION = Object.freeze({
    source: '(nonexistent)',
    start: UNKNOWN_POSITION,
    end: UNKNOWN_POSITION
  });
  var BROKEN_LOCATION = Object.freeze({
    source: '(broken)',
    start: UNKNOWN_POSITION,
    end: UNKNOWN_POSITION
  });

  var SourceSlice = /*#__PURE__*/function () {
    function SourceSlice(options) {
      this.loc = options.loc;
      this.chars = options.chars;
    }

    SourceSlice.synthetic = function synthetic(chars) {
      var offsets = SourceSpan.synthetic(chars);
      return new SourceSlice({
        loc: offsets,
        chars: chars
      });
    };

    SourceSlice.load = function load(source, slice) {
      return new SourceSlice({
        loc: SourceSpan.load(source, slice[1]),
        chars: slice[0]
      });
    };

    var _proto = SourceSlice.prototype;

    _proto.getString = function getString() {
      return this.chars;
    };

    _proto.serialize = function serialize() {
      return [this.chars, this.loc.serialize()];
    };

    return SourceSlice;
  }();
  /**
   * This file implements the DSL used by span and offset in places where they need to exhaustively
   * consider all combinations of states (Handlebars offsets, character offsets and invisible/broken
   * offsets).
   *
   * It's probably overkill, but it makes the code that uses it clear. It could be refactored or
   * removed.
   */


  _exports.SourceSlice = SourceSlice;
  var MatchAny = 'MATCH_ANY';
  var IsInvisible = 'IS_INVISIBLE';

  var WhenList = /*#__PURE__*/function () {
    function WhenList(whens) {
      this._whens = whens;
    }

    var _proto2 = WhenList.prototype;

    _proto2.first = function first(kind) {
      for (var _iterator = (0, _emberBabel.createForOfIteratorHelperLoose)(this._whens), _step; !(_step = _iterator()).done;) {
        var _when = _step.value;

        var _value = _when.match(kind);

        if ((0, _util.isPresent)(_value)) {
          return _value[0];
        }
      }

      return null;
    };

    return WhenList;
  }();

  var When = /*#__PURE__*/function () {
    function When() {
      this._map = new Map();
    }

    var _proto3 = When.prototype;

    _proto3.get = function get(pattern, or) {
      var value = this._map.get(pattern);

      if (value) {
        return value;
      }

      value = or();

      this._map.set(pattern, value);

      return value;
    };

    _proto3.add = function add(pattern, out) {
      this._map.set(pattern, out);
    };

    _proto3.match = function match(kind) {
      var pattern = patternFor(kind);
      var out = [];

      var exact = this._map.get(pattern);

      var fallback = this._map.get(MatchAny);

      if (exact) {
        out.push(exact);
      }

      if (fallback) {
        out.push(fallback);
      }

      return out;
    };

    return When;
  }();

  function match(callback) {
    return callback(new Matcher()).check();
  }

  var Matcher = /*#__PURE__*/function () {
    function Matcher() {
      this._whens = new When();
    }
    /**
     * You didn't exhaustively match all possibilities.
     */


    var _proto4 = Matcher.prototype;

    _proto4.check = function check() {
      var _this = this;

      return function (left, right) {
        return _this.matchFor(left.kind, right.kind)(left, right);
      };
    };

    _proto4.matchFor = function matchFor(left, right) {
      var nesteds = this._whens.match(left);

      var callback = new WhenList(nesteds).first(right);
      return callback;
    };

    _proto4.when = function when(left, right, // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callback) {
      this._whens.get(left, function () {
        return new When();
      }).add(right, callback);

      return this;
    };

    return Matcher;
  }();

  function patternFor(kind) {
    switch (kind) {
      case "Broken"
      /* Broken */
      :
      case "InternalsSynthetic"
      /* InternalsSynthetic */
      :
      case "NonExistent"
      /* NonExistent */
      :
        return IsInvisible;

      default:
        return kind;
    }
  } // eslint-disable-next-line import/no-extraneous-dependencies

  /**
   * Used to indicate that an attempt to convert a `SourcePosition` to a character offset failed. It
   * is separate from `null` so that `null` can be used to indicate that the computation wasn't yet
   * attempted (and therefore to cache the failure)
   */


  var BROKEN = 'BROKEN';
  /**
   * A `SourceOffset` represents a single position in the source.
   *
   * There are three kinds of backing data for `SourceOffset` objects:
   *
   * - `CharPosition`, which contains a character offset into the raw source string
   * - `HbsPosition`, which contains a `SourcePosition` from the Handlebars AST, which can be
   *   converted to a `CharPosition` on demand.
   * - `InvisiblePosition`, which represents a position not in source (@see {InvisiblePosition})
   */

  var SourceOffset = /*#__PURE__*/function () {
    function SourceOffset(data) {
      this.data = data;
    }
    /**
     * Create a `SourceOffset` from a Handlebars `SourcePosition`. It's stored as-is, and converted
     * into a character offset on demand, which avoids unnecessarily computing the offset of every
     * `SourceLocation`, but also means that broken `SourcePosition`s are not always detected.
     */


    SourceOffset.forHbsPos = function forHbsPos(source, pos) {
      return new HbsPosition(source, pos, null).wrap();
    }
    /**
     * Create a `SourceOffset` that corresponds to a broken `SourcePosition`. This means that the
     * calling code determined (or knows) that the `SourceLocation` doesn't correspond correctly to
     * any part of the source.
     */
    ;

    SourceOffset.broken = function broken(pos) {
      if (pos === void 0) {
        pos = UNKNOWN_POSITION;
      }

      return new InvisiblePosition("Broken"
      /* Broken */
      , pos).wrap();
    }
    /**
     * Get the character offset for this `SourceOffset`, if possible.
     */
    ;

    var _proto5 = SourceOffset.prototype;

    /**
     * Compare this offset with another one.
     *
     * If both offsets are `HbsPosition`s, they're equivalent as long as their lines and columns are
     * the same. This avoids computing offsets unnecessarily.
     *
     * Otherwise, two `SourceOffset`s are equivalent if their successfully computed character offsets
     * are the same.
     */
    _proto5.eql = function eql(right) {
      return _eql(this.data, right.data);
    }
    /**
     * Create a span that starts from this source offset and ends with another source offset. Avoid
     * computing character offsets if both `SourceOffset`s are still lazy.
     */
    ;

    _proto5.until = function until(other) {
      return span(this.data, other.data);
    }
    /**
     * Create a `SourceOffset` by moving the character position represented by this source offset
     * forward or backward (if `by` is negative), if possible.
     *
     * If this `SourceOffset` can't compute a valid character offset, `move` returns a broken offset.
     *
     * If the resulting character offset is less than 0 or greater than the size of the source, `move`
     * returns a broken offset.
     */
    ;

    _proto5.move = function move(by) {
      var charPos = this.data.toCharPos();

      if (charPos === null) {
        return SourceOffset.broken();
      } else {
        var result = charPos.offset + by;

        if (charPos.source.check(result)) {
          return new CharPosition(charPos.source, result).wrap();
        } else {
          return SourceOffset.broken();
        }
      }
    }
    /**
     * Create a new `SourceSpan` that represents a collapsed range at this source offset. Avoid
     * computing the character offset if it has not already been computed.
     */
    ;

    _proto5.collapsed = function collapsed() {
      return span(this.data, this.data);
    }
    /**
     * Convert this `SourceOffset` into a Handlebars {@see SourcePosition} for compatibility with
     * existing plugins.
     */
    ;

    _proto5.toJSON = function toJSON() {
      return this.data.toJSON();
    };

    (0, _emberBabel.createClass)(SourceOffset, [{
      key: "offset",
      get: function get() {
        var charPos = this.data.toCharPos();
        return charPos === null ? null : charPos.offset;
      }
    }]);
    return SourceOffset;
  }();

  var CharPosition = /*#__PURE__*/function () {
    function CharPosition(source, charPos) {
      this.source = source;
      this.charPos = charPos;
      this.kind = "CharPosition"
      /* CharPosition */
      ;
      /** Computed from char offset */

      this._locPos = null;
    }
    /**
     * This is already a `CharPosition`.
     *
     * {@see HbsPosition} for the alternative.
     *
     * @implements {PositionData}
     */


    var _proto6 = CharPosition.prototype;

    _proto6.toCharPos = function toCharPos() {
      return this;
    }
    /**
     * Produce a Handlebars {@see SourcePosition} for this `CharPosition`. If this `CharPosition` was
     * computed using {@see SourceOffset#move}, this will compute the `SourcePosition` for the offset.
     *
     * @implements {PositionData}
     */
    ;

    _proto6.toJSON = function toJSON() {
      var hbs = this.toHbsPos();
      return hbs === null ? UNKNOWN_POSITION : hbs.toJSON();
    };

    _proto6.wrap = function wrap() {
      return new SourceOffset(this);
    }
    /**
     * A `CharPosition` always has an offset it can produce without any additional computation.
     */
    ;

    /**
     * Convert the current character offset to an `HbsPosition`, if it was not already computed. Once
     * a `CharPosition` has computed its `HbsPosition`, it will not need to do compute it again, and
     * the same `CharPosition` is retained when used as one of the ends of a `SourceSpan`, so
     * computing the `HbsPosition` should be a one-time operation.
     */
    _proto6.toHbsPos = function toHbsPos() {
      var locPos = this._locPos;

      if (locPos === null) {
        var hbsPos = this.source.hbsPosFor(this.charPos);

        if (hbsPos === null) {
          this._locPos = locPos = BROKEN;
        } else {
          this._locPos = locPos = new HbsPosition(this.source, hbsPos, this.charPos);
        }
      }

      return locPos === BROKEN ? null : locPos;
    };

    (0, _emberBabel.createClass)(CharPosition, [{
      key: "offset",
      get: function get() {
        return this.charPos;
      }
    }]);
    return CharPosition;
  }();

  var HbsPosition = /*#__PURE__*/function () {
    function HbsPosition(source, hbsPos, charPos) {
      if (charPos === void 0) {
        charPos = null;
      }

      this.source = source;
      this.hbsPos = hbsPos;
      this.kind = "HbsPosition"
      /* HbsPosition */
      ;
      this._charPos = charPos === null ? null : new CharPosition(source, charPos);
    }
    /**
     * Lazily compute the character offset from the {@see SourcePosition}. Once an `HbsPosition` has
     * computed its `CharPosition`, it will not need to do compute it again, and the same
     * `HbsPosition` is retained when used as one of the ends of a `SourceSpan`, so computing the
     * `CharPosition` should be a one-time operation.
     *
     * @implements {PositionData}
     */


    var _proto7 = HbsPosition.prototype;

    _proto7.toCharPos = function toCharPos() {
      var charPos = this._charPos;

      if (charPos === null) {
        var charPosNumber = this.source.charPosFor(this.hbsPos);

        if (charPosNumber === null) {
          this._charPos = charPos = BROKEN;
        } else {
          this._charPos = charPos = new CharPosition(this.source, charPosNumber);
        }
      }

      return charPos === BROKEN ? null : charPos;
    }
    /**
     * Return the {@see SourcePosition} that this `HbsPosition` was instantiated with. This operation
     * does not need to compute anything.
     *
     * @implements {PositionData}
     */
    ;

    _proto7.toJSON = function toJSON() {
      return this.hbsPos;
    };

    _proto7.wrap = function wrap() {
      return new SourceOffset(this);
    }
    /**
     * This is already an `HbsPosition`.
     *
     * {@see CharPosition} for the alternative.
     */
    ;

    _proto7.toHbsPos = function toHbsPos() {
      return this;
    };

    return HbsPosition;
  }();

  var InvisiblePosition = /*#__PURE__*/function () {
    function InvisiblePosition(kind, // whatever was provided, possibly broken
    pos) {
      this.kind = kind;
      this.pos = pos;
    }
    /**
     * A broken position cannot be turned into a {@see CharacterPosition}.
     */


    var _proto8 = InvisiblePosition.prototype;

    _proto8.toCharPos = function toCharPos() {
      return null;
    }
    /**
     * The serialization of an `InvisiblePosition is whatever Handlebars {@see SourcePosition} was
     * originally identified as broken, non-existent or synthetic.
     *
     * If an `InvisiblePosition` never had an source offset at all, this method returns
     * {@see UNKNOWN_POSITION} for compatibility.
     */
    ;

    _proto8.toJSON = function toJSON() {
      return this.pos;
    };

    _proto8.wrap = function wrap() {
      return new SourceOffset(this);
    };

    (0, _emberBabel.createClass)(InvisiblePosition, [{
      key: "offset",
      get: function get() {
        return null;
      }
    }]);
    return InvisiblePosition;
  }();
  /**
   * Compare two {@see AnyPosition} and determine whether they are equal.
   *
   * @see {SourceOffset#eql}
   */


  var _eql = match(function (m) {
    return m.when("HbsPosition"
    /* HbsPosition */
    , "HbsPosition"
    /* HbsPosition */
    , function (_ref, _ref2) {
      var left = _ref.hbsPos;
      var right = _ref2.hbsPos;
      return left.column === right.column && left.line === right.line;
    }).when("CharPosition"
    /* CharPosition */
    , "CharPosition"
    /* CharPosition */
    , function (_ref3, _ref4) {
      var left = _ref3.charPos;
      var right = _ref4.charPos;
      return left === right;
    }).when("CharPosition"
    /* CharPosition */
    , "HbsPosition"
    /* HbsPosition */
    , function (_ref5, right) {
      var left = _ref5.offset;

      var _a;

      return left === ((_a = right.toCharPos()) === null || _a === void 0 ? void 0 : _a.offset);
    }).when("HbsPosition"
    /* HbsPosition */
    , "CharPosition"
    /* CharPosition */
    , function (left, _ref6) {
      var right = _ref6.offset;

      var _a;

      return ((_a = left.toCharPos()) === null || _a === void 0 ? void 0 : _a.offset) === right;
    }).when(MatchAny, MatchAny, function () {
      return false;
    });
  }); // eslint-disable-next-line import/no-extraneous-dependencies

  /**
   * A `SourceSpan` object represents a span of characters inside of a template source.
   *
   * There are three kinds of `SourceSpan` objects:
   *
   * - `ConcreteSourceSpan`, which contains byte offsets
   * - `LazySourceSpan`, which contains `SourceLocation`s from the Handlebars AST, which can be
   *   converted to byte offsets on demand.
   * - `InvisibleSourceSpan`, which represent source strings that aren't present in the source,
   *   because:
   *     - they were created synthetically
   *     - their location is nonsensical (the span is broken)
   *     - they represent nothing in the source (this currently happens only when a bug in the
   *       upstream Handlebars parser fails to assign a location to empty blocks)
   *
   * At a high level, all `SourceSpan` objects provide:
   *
   * - byte offsets
   * - source in column and line format
   *
   * And you can do these operations on `SourceSpan`s:
   *
   * - collapse it to a `SourceSpan` representing its starting or ending position
   * - slice out some characters, optionally skipping some characters at the beginning or end
   * - create a new `SourceSpan` with a different starting or ending offset
   *
   * All SourceSpan objects implement `SourceLocation`, for compatibility. All SourceSpan
   * objects have a `toJSON` that emits `SourceLocation`, also for compatibility.
   *
   * For compatibility, subclasses of `AbstractSourceSpan` must implement `locDidUpdate`, which
   * happens when an AST plugin attempts to modify the `start` or `end` of a span directly.
   *
   * The goal is to avoid creating any problems for use-cases like AST Explorer.
   */


  var SourceSpan = /*#__PURE__*/function () {
    function SourceSpan(data) {
      this.data = data;
      this.isInvisible = data.kind !== "CharPosition"
      /* CharPosition */
      && data.kind !== "HbsPosition"
      /* HbsPosition */
      ;
    }

    SourceSpan.load = function load(source, serialized) {
      if (typeof serialized === 'number') {
        return SourceSpan.forCharPositions(source, serialized, serialized);
      } else if (typeof serialized === 'string') {
        return SourceSpan.synthetic(serialized);
      } else if (Array.isArray(serialized)) {
        return SourceSpan.forCharPositions(source, serialized[0], serialized[1]);
      } else if (serialized === "NonExistent"
      /* NonExistent */
      ) {
          return SourceSpan.NON_EXISTENT;
        } else if (serialized === "Broken"
      /* Broken */
      ) {
          return SourceSpan.broken(BROKEN_LOCATION);
        }

      (0, _util.assertNever)(serialized);
    };

    SourceSpan.forHbsLoc = function forHbsLoc(source, loc) {
      var start = new HbsPosition(source, loc.start);
      var end = new HbsPosition(source, loc.end);
      return new HbsSpan(source, {
        start: start,
        end: end
      }, loc).wrap();
    };

    SourceSpan.forCharPositions = function forCharPositions(source, startPos, endPos) {
      var start = new CharPosition(source, startPos);
      var end = new CharPosition(source, endPos);
      return new CharPositionSpan(source, {
        start: start,
        end: end
      }).wrap();
    };

    SourceSpan.synthetic = function synthetic(chars) {
      return new InvisibleSpan("InternalsSynthetic"
      /* InternalsSynthetic */
      , NON_EXISTENT_LOCATION, chars).wrap();
    };

    SourceSpan.broken = function broken(pos) {
      if (pos === void 0) {
        pos = BROKEN_LOCATION;
      }

      return new InvisibleSpan("Broken"
      /* Broken */
      , pos).wrap();
    };

    var _proto9 = SourceSpan.prototype;

    _proto9.getStart = function getStart() {
      return this.data.getStart().wrap();
    };

    _proto9.getEnd = function getEnd() {
      return this.data.getEnd().wrap();
    };

    /**
     * Support converting ASTv1 nodes into a serialized format using JSON.stringify.
     */
    _proto9.toJSON = function toJSON() {
      return this.loc;
    }
    /**
     * Create a new span with the current span's end and a new beginning.
     */
    ;

    _proto9.withStart = function withStart(other) {
      return span(other.data, this.data.getEnd());
    }
    /**
     * Create a new span with the current span's beginning and a new ending.
     */
    ;

    _proto9.withEnd = function withEnd(other) {
      return span(this.data.getStart(), other.data);
    };

    _proto9.asString = function asString() {
      return this.data.asString();
    }
    /**
     * Convert this `SourceSpan` into a `SourceSlice`. In debug mode, this method optionally checks
     * that the byte offsets represented by this `SourceSpan` actually correspond to the expected
     * string.
     */
    ;

    _proto9.toSlice = function toSlice(expected) {
      var chars = this.data.asString();

      if (true
      /* DEBUG */
      ) {
        if (expected !== undefined && chars !== expected) {
          // eslint-disable-next-line no-console
          console.warn("unexpectedly found " + JSON.stringify(chars) + " when slicing source, but expected " + JSON.stringify(expected));
        }
      }

      return new SourceSlice({
        loc: this,
        chars: expected || chars
      });
    }
    /**
     * For compatibility with SourceLocation in AST plugins
     *
     * @deprecated use startPosition instead
     */
    ;

    _proto9.collapse = function collapse(where) {
      switch (where) {
        case 'start':
          return this.getStart().collapsed();

        case 'end':
          return this.getEnd().collapsed();
      }
    };

    _proto9.extend = function extend(other) {
      return span(this.data.getStart(), other.data.getEnd());
    };

    _proto9.serialize = function serialize() {
      return this.data.serialize();
    };

    _proto9.slice = function slice(_ref7) {
      var _ref7$skipStart = _ref7.skipStart,
          skipStart = _ref7$skipStart === void 0 ? 0 : _ref7$skipStart,
          _ref7$skipEnd = _ref7.skipEnd,
          skipEnd = _ref7$skipEnd === void 0 ? 0 : _ref7$skipEnd;
      return span(this.getStart().move(skipStart).data, this.getEnd().move(-skipEnd).data);
    };

    _proto9.sliceStartChars = function sliceStartChars(_ref8) {
      var _ref8$skipStart = _ref8.skipStart,
          skipStart = _ref8$skipStart === void 0 ? 0 : _ref8$skipStart,
          chars = _ref8.chars;
      return span(this.getStart().move(skipStart).data, this.getStart().move(skipStart + chars).data);
    };

    _proto9.sliceEndChars = function sliceEndChars(_ref9) {
      var _ref9$skipEnd = _ref9.skipEnd,
          skipEnd = _ref9$skipEnd === void 0 ? 0 : _ref9$skipEnd,
          chars = _ref9.chars;
      return span(this.getEnd().move(skipEnd - chars).data, this.getStart().move(-skipEnd).data);
    };

    (0, _emberBabel.createClass)(SourceSpan, [{
      key: "loc",
      get: function get() {
        var span = this.data.toHbsSpan();
        return span === null ? BROKEN_LOCATION : span.toHbsLoc();
      }
    }, {
      key: "module",
      get: function get() {
        return this.data.getModule();
      }
      /**
       * Get the starting `SourcePosition` for this `SourceSpan`, lazily computing it if needed.
       */

    }, {
      key: "startPosition",
      get: function get() {
        return this.loc.start;
      }
      /**
       * Get the ending `SourcePosition` for this `SourceSpan`, lazily computing it if needed.
       */

    }, {
      key: "endPosition",
      get: function get() {
        return this.loc.end;
      }
    }, {
      key: "start",
      get: function get() {
        return this.loc.start;
      }
      /**
       * For compatibility with SourceLocation in AST plugins
       *
       * @deprecated use withStart instead
       */
      ,
      set: function set(position) {
        this.data.locDidUpdate({
          start: position
        });
      }
      /**
       * For compatibility with SourceLocation in AST plugins
       *
       * @deprecated use endPosition instead
       */

    }, {
      key: "end",
      get: function get() {
        return this.loc.end;
      }
      /**
       * For compatibility with SourceLocation in AST plugins
       *
       * @deprecated use withEnd instead
       */
      ,
      set: function set(position) {
        this.data.locDidUpdate({
          end: position
        });
      }
      /**
       * For compatibility with SourceLocation in AST plugins
       *
       * @deprecated use module instead
       */

    }, {
      key: "source",
      get: function get() {
        return this.module;
      }
    }], [{
      key: "NON_EXISTENT",
      get: function get() {
        return new InvisibleSpan("NonExistent"
        /* NonExistent */
        , NON_EXISTENT_LOCATION).wrap();
      }
    }]);
    return SourceSpan;
  }();

  _exports.SourceSpan = SourceSpan;

  var CharPositionSpan = /*#__PURE__*/function () {
    function CharPositionSpan(source, charPositions) {
      this.source = source;
      this.charPositions = charPositions;
      this.kind = "CharPosition"
      /* CharPosition */
      ;
      this._locPosSpan = null;
    }

    var _proto10 = CharPositionSpan.prototype;

    _proto10.wrap = function wrap() {
      return new SourceSpan(this);
    };

    _proto10.asString = function asString() {
      return this.source.slice(this.charPositions.start.charPos, this.charPositions.end.charPos);
    };

    _proto10.getModule = function getModule() {
      return this.source.module;
    };

    _proto10.getStart = function getStart() {
      return this.charPositions.start;
    };

    _proto10.getEnd = function getEnd() {
      return this.charPositions.end;
    };

    _proto10.locDidUpdate = function locDidUpdate() {};

    _proto10.toHbsSpan = function toHbsSpan() {
      var locPosSpan = this._locPosSpan;

      if (locPosSpan === null) {
        var start = this.charPositions.start.toHbsPos();
        var end = this.charPositions.end.toHbsPos();

        if (start === null || end === null) {
          locPosSpan = this._locPosSpan = BROKEN;
        } else {
          locPosSpan = this._locPosSpan = new HbsSpan(this.source, {
            start: start,
            end: end
          });
        }
      }

      return locPosSpan === BROKEN ? null : locPosSpan;
    };

    _proto10.serialize = function serialize() {
      var _this$charPositions = this.charPositions,
          start = _this$charPositions.start.charPos,
          end = _this$charPositions.end.charPos;

      if (start === end) {
        return start;
      } else {
        return [start, end];
      }
    };

    _proto10.toCharPosSpan = function toCharPosSpan() {
      return this;
    };

    return CharPositionSpan;
  }();

  var HbsSpan = /*#__PURE__*/function () {
    function HbsSpan(source, hbsPositions, providedHbsLoc) {
      if (providedHbsLoc === void 0) {
        providedHbsLoc = null;
      }

      this.source = source;
      this.hbsPositions = hbsPositions;
      this.kind = "HbsPosition"
      /* HbsPosition */
      ;
      this._charPosSpan = null;
      this._providedHbsLoc = providedHbsLoc;
    }

    var _proto11 = HbsSpan.prototype;

    _proto11.serialize = function serialize() {
      var charPos = this.toCharPosSpan();
      return charPos === null ? "Broken"
      /* Broken */
      : charPos.wrap().serialize();
    };

    _proto11.wrap = function wrap() {
      return new SourceSpan(this);
    };

    _proto11.updateProvided = function updateProvided(pos, edge) {
      if (this._providedHbsLoc) {
        this._providedHbsLoc[edge] = pos;
      } // invalidate computed character offsets


      this._charPosSpan = null;
      this._providedHbsLoc = {
        start: pos,
        end: pos
      };
    };

    _proto11.locDidUpdate = function locDidUpdate(_ref10) {
      var start = _ref10.start,
          end = _ref10.end;

      if (start !== undefined) {
        this.updateProvided(start, 'start');
        this.hbsPositions.start = new HbsPosition(this.source, start, null);
      }

      if (end !== undefined) {
        this.updateProvided(end, 'end');
        this.hbsPositions.end = new HbsPosition(this.source, end, null);
      }
    };

    _proto11.asString = function asString() {
      var span = this.toCharPosSpan();
      return span === null ? '' : span.asString();
    };

    _proto11.getModule = function getModule() {
      return this.source.module;
    };

    _proto11.getStart = function getStart() {
      return this.hbsPositions.start;
    };

    _proto11.getEnd = function getEnd() {
      return this.hbsPositions.end;
    };

    _proto11.toHbsLoc = function toHbsLoc() {
      return {
        start: this.hbsPositions.start.hbsPos,
        end: this.hbsPositions.end.hbsPos
      };
    };

    _proto11.toHbsSpan = function toHbsSpan() {
      return this;
    };

    _proto11.toCharPosSpan = function toCharPosSpan() {
      var charPosSpan = this._charPosSpan;

      if (charPosSpan === null) {
        var start = this.hbsPositions.start.toCharPos();
        var end = this.hbsPositions.end.toCharPos();

        if (start && end) {
          charPosSpan = this._charPosSpan = new CharPositionSpan(this.source, {
            start: start,
            end: end
          });
        } else {
          charPosSpan = this._charPosSpan = BROKEN;
          return null;
        }
      }

      return charPosSpan === BROKEN ? null : charPosSpan;
    };

    return HbsSpan;
  }();

  var InvisibleSpan = /*#__PURE__*/function () {
    function InvisibleSpan(kind, // whatever was provided, possibly broken
    loc, // if the span represents a synthetic string
    string) {
      if (string === void 0) {
        string = null;
      }

      this.kind = kind;
      this.loc = loc;
      this.string = string;
    }

    var _proto12 = InvisibleSpan.prototype;

    _proto12.serialize = function serialize() {
      switch (this.kind) {
        case "Broken"
        /* Broken */
        :
        case "NonExistent"
        /* NonExistent */
        :
          return this.kind;

        case "InternalsSynthetic"
        /* InternalsSynthetic */
        :
          return this.string || '';
      }
    };

    _proto12.wrap = function wrap() {
      return new SourceSpan(this);
    };

    _proto12.asString = function asString() {
      return this.string || '';
    };

    _proto12.locDidUpdate = function locDidUpdate(_ref11) {
      var start = _ref11.start,
          end = _ref11.end;

      if (start !== undefined) {
        this.loc.start = start;
      }

      if (end !== undefined) {
        this.loc.end = end;
      }
    };

    _proto12.getModule = function getModule() {
      // TODO: Make this reflect the actual module this span originated from
      return 'an unknown module';
    };

    _proto12.getStart = function getStart() {
      return new InvisiblePosition(this.kind, this.loc.start);
    };

    _proto12.getEnd = function getEnd() {
      return new InvisiblePosition(this.kind, this.loc.end);
    };

    _proto12.toCharPosSpan = function toCharPosSpan() {
      return this;
    };

    _proto12.toHbsSpan = function toHbsSpan() {
      return null;
    };

    _proto12.toHbsLoc = function toHbsLoc() {
      return BROKEN_LOCATION;
    };

    return InvisibleSpan;
  }();

  var span = match(function (m) {
    return m.when("HbsPosition"
    /* HbsPosition */
    , "HbsPosition"
    /* HbsPosition */
    , function (left, right) {
      return new HbsSpan(left.source, {
        start: left,
        end: right
      }).wrap();
    }).when("CharPosition"
    /* CharPosition */
    , "CharPosition"
    /* CharPosition */
    , function (left, right) {
      return new CharPositionSpan(left.source, {
        start: left,
        end: right
      }).wrap();
    }).when("CharPosition"
    /* CharPosition */
    , "HbsPosition"
    /* HbsPosition */
    , function (left, right) {
      var rightCharPos = right.toCharPos();

      if (rightCharPos === null) {
        return new InvisibleSpan("Broken"
        /* Broken */
        , BROKEN_LOCATION).wrap();
      } else {
        return span(left, rightCharPos);
      }
    }).when("HbsPosition"
    /* HbsPosition */
    , "CharPosition"
    /* CharPosition */
    , function (left, right) {
      var leftCharPos = left.toCharPos();

      if (leftCharPos === null) {
        return new InvisibleSpan("Broken"
        /* Broken */
        , BROKEN_LOCATION).wrap();
      } else {
        return span(leftCharPos, right);
      }
    }).when(IsInvisible, MatchAny, function (left) {
      return new InvisibleSpan(left.kind, BROKEN_LOCATION).wrap();
    }).when(MatchAny, IsInvisible, function (_, right) {
      return new InvisibleSpan(right.kind, BROKEN_LOCATION).wrap();
    });
  }); // eslint-disable-next-line import/no-extraneous-dependencies

  var Source = /*#__PURE__*/function () {
    function Source(source, module) {
      if (module === void 0) {
        module = 'an unknown module';
      }

      this.source = source;
      this.module = module;
    }
    /**
     * Validate that the character offset represents a position in the source string.
     */


    var _proto13 = Source.prototype;

    _proto13.check = function check(offset) {
      return offset >= 0 && offset <= this.source.length;
    };

    _proto13.slice = function slice(start, end) {
      return this.source.slice(start, end);
    };

    _proto13.offsetFor = function offsetFor(line, column) {
      return SourceOffset.forHbsPos(this, {
        line: line,
        column: column
      });
    };

    _proto13.spanFor = function spanFor(_ref12) {
      var start = _ref12.start,
          end = _ref12.end;
      return SourceSpan.forHbsLoc(this, {
        start: {
          line: start.line,
          column: start.column
        },
        end: {
          line: end.line,
          column: end.column
        }
      });
    };

    _proto13.hbsPosFor = function hbsPosFor(offset) {
      var seenLines = 0;
      var seenChars = 0;

      if (offset > this.source.length) {
        return null;
      }

      while (true) {
        var nextLine = this.source.indexOf('\n', seenChars);

        if (offset <= nextLine || nextLine === -1) {
          return {
            line: seenLines + 1,
            column: offset - seenChars
          };
        } else {
          seenLines += 1;
          seenChars = nextLine + 1;
        }
      }
    };

    _proto13.charPosFor = function charPosFor(position) {
      var line = position.line,
          column = position.column;
      var sourceString = this.source;
      var sourceLength = sourceString.length;
      var seenLines = 0;
      var seenChars = 0;

      while (true) {
        if (seenChars >= sourceLength) return sourceLength;
        var nextLine = this.source.indexOf('\n', seenChars);
        if (nextLine === -1) nextLine = this.source.length;

        if (seenLines === line - 1) {
          if (seenChars + column > nextLine) return nextLine;

          if (true
          /* DEBUG */
          ) {
            var roundTrip = this.hbsPosFor(seenChars + column);
          }

          return seenChars + column;
        } else if (nextLine === -1) {
          return 0;
        } else {
          seenLines += 1;
          seenChars = nextLine + 1;
        }
      }
    };

    return Source;
  }();

  _exports.Source = Source;

  var PathExpressionImplV1 = /*#__PURE__*/function () {
    function PathExpressionImplV1(original, head, tail, loc) {
      this.original = original;
      this.loc = loc;
      this.type = 'PathExpression';
      this.this = false;
      this.data = false; // Cache for the head value.

      this._head = undefined;
      var parts = tail.slice();

      if (head.type === 'ThisHead') {
        this.this = true;
      } else if (head.type === 'AtHead') {
        this.data = true;
        parts.unshift(head.name.slice(1));
      } else {
        parts.unshift(head.name);
      }

      this.parts = parts;
    }

    (0, _emberBabel.createClass)(PathExpressionImplV1, [{
      key: "head",
      get: function get() {
        if (this._head) {
          return this._head;
        }

        var firstPart;

        if (this.this) {
          firstPart = 'this';
        } else if (this.data) {
          firstPart = "@" + this.parts[0];
        } else {
          firstPart = this.parts[0];
        }

        var firstPartLoc = this.loc.collapse('start').sliceStartChars({
          chars: firstPart.length
        }).loc;
        return this._head = publicBuilder.head(firstPart, firstPartLoc);
      }
    }, {
      key: "tail",
      get: function get() {
        return this.this ? this.parts : this.parts.slice(1);
      }
    }]);
    return PathExpressionImplV1;
  }();

  var _SOURCE;

  function SOURCE() {
    if (!_SOURCE) {
      _SOURCE = new Source('', '(synthetic)');
    }

    return _SOURCE;
  }

  function buildMustache(path, params, hash, raw, loc, strip) {
    if (typeof path === 'string') {
      path = buildPath(path);
    }

    return {
      type: 'MustacheStatement',
      path: path,
      params: params || [],
      hash: hash || buildHash([]),
      escaped: !raw,
      trusting: !!raw,
      loc: buildLoc(loc || null),
      strip: strip || {
        open: false,
        close: false
      }
    };
  }

  function buildBlock(path, params, hash, _defaultBlock, _elseBlock, loc, openStrip, inverseStrip, closeStrip) {
    var defaultBlock;
    var elseBlock;

    if (_defaultBlock.type === 'Template') {
      defaultBlock = (0, _util.assign)({}, _defaultBlock, {
        type: 'Block'
      });
    } else {
      defaultBlock = _defaultBlock;
    }

    if (_elseBlock !== undefined && _elseBlock !== null && _elseBlock.type === 'Template') {
      elseBlock = (0, _util.assign)({}, _elseBlock, {
        type: 'Block'
      });
    } else {
      elseBlock = _elseBlock;
    }

    return {
      type: 'BlockStatement',
      path: buildPath(path),
      params: params || [],
      hash: hash || buildHash([]),
      program: defaultBlock || null,
      inverse: elseBlock || null,
      loc: buildLoc(loc || null),
      openStrip: openStrip || {
        open: false,
        close: false
      },
      inverseStrip: inverseStrip || {
        open: false,
        close: false
      },
      closeStrip: closeStrip || {
        open: false,
        close: false
      }
    };
  }

  function buildElementModifier(path, params, hash, loc) {
    return {
      type: 'ElementModifierStatement',
      path: buildPath(path),
      params: params || [],
      hash: hash || buildHash([]),
      loc: buildLoc(loc || null)
    };
  }

  function buildPartial(name, params, hash, indent, loc) {
    return {
      type: 'PartialStatement',
      name: name,
      params: params || [],
      hash: hash || buildHash([]),
      indent: indent || '',
      strip: {
        open: false,
        close: false
      },
      loc: buildLoc(loc || null)
    };
  }

  function buildComment(value, loc) {
    return {
      type: 'CommentStatement',
      value: value,
      loc: buildLoc(loc || null)
    };
  }

  function buildMustacheComment(value, loc) {
    return {
      type: 'MustacheCommentStatement',
      value: value,
      loc: buildLoc(loc || null)
    };
  }

  function buildConcat(parts, loc) {
    if (!(0, _util.isPresent)(parts)) {
      throw new Error("b.concat requires at least one part");
    }

    return {
      type: 'ConcatStatement',
      parts: parts || [],
      loc: buildLoc(loc || null)
    };
  }

  function buildElement(tag, options) {
    var attrs = options.attrs,
        blockParams = options.blockParams,
        modifiers = options.modifiers,
        comments = options.comments,
        children = options.children,
        loc = options.loc;
    var tagName; // this is used for backwards compat, prior to `selfClosing` being part of the ElementNode AST

    var selfClosing = false;

    if (typeof tag === 'object') {
      selfClosing = tag.selfClosing;
      tagName = tag.name;
    } else if (tag.slice(-1) === '/') {
      tagName = tag.slice(0, -1);
      selfClosing = true;
    } else {
      tagName = tag;
    }

    return {
      type: 'ElementNode',
      tag: tagName,
      selfClosing: selfClosing,
      attributes: attrs || [],
      blockParams: blockParams || [],
      modifiers: modifiers || [],
      comments: comments || [],
      children: children || [],
      loc: buildLoc(loc || null)
    };
  }

  function buildAttr(name, value, loc) {
    return {
      type: 'AttrNode',
      name: name,
      value: value,
      loc: buildLoc(loc || null)
    };
  }

  function buildText(chars, loc) {
    return {
      type: 'TextNode',
      chars: chars || '',
      loc: buildLoc(loc || null)
    };
  } // Expressions


  function buildSexpr(path, params, hash, loc) {
    return {
      type: 'SubExpression',
      path: buildPath(path),
      params: params || [],
      hash: hash || buildHash([]),
      loc: buildLoc(loc || null)
    };
  }

  function headToString(head) {
    switch (head.type) {
      case 'AtHead':
        return {
          original: head.name,
          parts: [head.name]
        };

      case 'ThisHead':
        return {
          original: "this",
          parts: []
        };

      case 'VarHead':
        return {
          original: head.name,
          parts: [head.name]
        };
    }
  }

  function buildHead(original, loc) {
    var _original$split = original.split('.'),
        head = _original$split[0],
        tail = _original$split.slice(1);

    var headNode;

    if (head === 'this') {
      headNode = {
        type: 'ThisHead',
        loc: buildLoc(loc || null)
      };
    } else if (head[0] === '@') {
      headNode = {
        type: 'AtHead',
        name: head,
        loc: buildLoc(loc || null)
      };
    } else {
      headNode = {
        type: 'VarHead',
        name: head,
        loc: buildLoc(loc || null)
      };
    }

    return {
      head: headNode,
      tail: tail
    };
  }

  function buildThis(loc) {
    return {
      type: 'ThisHead',
      loc: buildLoc(loc || null)
    };
  }

  function buildAtName(name, loc) {
    return {
      type: 'AtHead',
      name: name,
      loc: buildLoc(loc || null)
    };
  }

  function buildVar(name, loc) {
    return {
      type: 'VarHead',
      name: name,
      loc: buildLoc(loc || null)
    };
  }

  function buildHeadFromString(head, loc) {
    if (head[0] === '@') {
      return buildAtName(head, loc);
    } else if (head === 'this') {
      return buildThis(loc);
    } else {
      return buildVar(head, loc);
    }
  }

  function buildNamedBlockName(name, loc) {
    return {
      type: 'NamedBlockName',
      name: name,
      loc: buildLoc(loc || null)
    };
  }

  function buildCleanPath(head, tail, loc) {
    var _headToString = headToString(head),
        originalHead = _headToString.original,
        headParts = _headToString.parts;

    var parts = [].concat(headParts, tail);
    var original = [].concat(originalHead, parts).join('.');
    return new PathExpressionImplV1(original, head, tail, buildLoc(loc || null));
  }

  function buildPath(path, loc) {
    if (typeof path !== 'string') {
      if ('type' in path) {
        return path;
      } else {
        var _buildHead = buildHead(path.head, SourceSpan.broken()),
            _head = _buildHead.head,
            _tail = _buildHead.tail;

        var _headToString2 = headToString(_head),
            originalHead = _headToString2.original;

        return new PathExpressionImplV1([originalHead].concat(_tail).join('.'), _head, _tail, buildLoc(loc || null));
      }
    }

    var _buildHead2 = buildHead(path, SourceSpan.broken()),
        head = _buildHead2.head,
        tail = _buildHead2.tail;

    return new PathExpressionImplV1(path, head, tail, buildLoc(loc || null));
  }

  function buildLiteral(type, value, loc) {
    return {
      type: type,
      value: value,
      original: value,
      loc: buildLoc(loc || null)
    };
  } // Miscellaneous


  function buildHash(pairs, loc) {
    return {
      type: 'Hash',
      pairs: pairs || [],
      loc: buildLoc(loc || null)
    };
  }

  function buildPair(key, value, loc) {
    return {
      type: 'HashPair',
      key: key,
      value: value,
      loc: buildLoc(loc || null)
    };
  }

  function buildProgram(body, blockParams, loc) {
    return {
      type: 'Template',
      body: body || [],
      blockParams: blockParams || [],
      loc: buildLoc(loc || null)
    };
  }

  function buildBlockItself(body, blockParams, chained, loc) {
    if (chained === void 0) {
      chained = false;
    }

    return {
      type: 'Block',
      body: body || [],
      blockParams: blockParams || [],
      chained: chained,
      loc: buildLoc(loc || null)
    };
  }

  function buildTemplate(body, blockParams, loc) {
    return {
      type: 'Template',
      body: body || [],
      blockParams: blockParams || [],
      loc: buildLoc(loc || null)
    };
  }

  function buildPosition(line, column) {
    return {
      line: line,
      column: column
    };
  }

  function buildLoc() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (args.length === 1) {
      var _loc = args[0];

      if (_loc && typeof _loc === 'object') {
        return SourceSpan.forHbsLoc(SOURCE(), _loc);
      } else {
        return SourceSpan.forHbsLoc(SOURCE(), SYNTHETIC_LOCATION);
      }
    } else {
      var startLine = args[0],
          startColumn = args[1],
          endLine = args[2],
          endColumn = args[3],
          _source = args[4];
      var source = _source ? new Source('', _source) : SOURCE();
      return SourceSpan.forHbsLoc(source, {
        start: {
          line: startLine,
          column: startColumn
        },
        end: {
          line: endLine,
          column: endColumn
        }
      });
    }
  }

  var publicBuilder = {
    mustache: buildMustache,
    block: buildBlock,
    partial: buildPartial,
    comment: buildComment,
    mustacheComment: buildMustacheComment,
    element: buildElement,
    elementModifier: buildElementModifier,
    attr: buildAttr,
    text: buildText,
    sexpr: buildSexpr,
    concat: buildConcat,
    hash: buildHash,
    pair: buildPair,
    literal: buildLiteral,
    program: buildProgram,
    blockItself: buildBlockItself,
    template: buildTemplate,
    loc: buildLoc,
    pos: buildPosition,
    path: buildPath,
    fullPath: buildCleanPath,
    head: buildHeadFromString,
    at: buildAtName,
    var: buildVar,
    this: buildThis,
    blockName: buildNamedBlockName,
    string: literal('StringLiteral'),
    boolean: literal('BooleanLiteral'),
    number: literal('NumberLiteral'),
    undefined: function (_undefined) {
      function undefined() {
        return _undefined.apply(this, arguments);
      }

      undefined.toString = function () {
        return _undefined.toString();
      };

      return undefined;
    }(function () {
      return buildLiteral('UndefinedLiteral', undefined);
    }),
    null: function _null() {
      return buildLiteral('NullLiteral', null);
    }
  };
  _exports.builders = publicBuilder;

  function literal(type) {
    return function (value, loc) {
      return buildLiteral(type, value, loc);
    };
  }

  var api = /*#__PURE__*/Object.freeze({});
  /**
   * A free variable is resolved according to a resolution rule:
   *
   * 1. Strict resolution
   * 2. Namespaced resolution
   * 3. Fallback resolution
   */

  /**
   * Strict resolution is used:
   *
   * 1. in a strict mode template
   * 2. in an unambiguous invocation with dot paths
   */

  _exports.AST = _exports.ASTv1 = api;

  var StrictResolution = /*#__PURE__*/function () {
    function StrictResolution() {
      this.isAngleBracket = false;
    }

    var _proto14 = StrictResolution.prototype;

    _proto14.resolution = function resolution() {
      return 31
      /* GetStrictFree */
      ;
    };

    _proto14.serialize = function serialize() {
      return 'Strict';
    };

    return StrictResolution;
  }();

  var STRICT_RESOLUTION = new StrictResolution();
  /**
   * A `LooseModeResolution` includes:
   *
   * - 0 or more namespaces to resolve the variable in
   * - optional fallback behavior
   *
   * In practice, there are a limited number of possible combinations of these degrees of freedom,
   * and they are captured by the `Ambiguity` union below.
   */

  var LooseModeResolution = /*#__PURE__*/function () {
    function LooseModeResolution(ambiguity, isAngleBracket) {
      if (isAngleBracket === void 0) {
        isAngleBracket = false;
      }

      this.ambiguity = ambiguity;
      this.isAngleBracket = isAngleBracket;
    }
    /**
     * Namespaced resolution is used in an unambiguous syntax position:
     *
     * 1. `(sexp)` (namespace: `Helper`)
     * 2. `{{#block}}` (namespace: `Component`)
     * 3. `<a {{modifier}}>` (namespace: `Modifier`)
     * 4. `<Component />` (namespace: `Component`)
     *
     * @see {NamespacedAmbiguity}
     */


    LooseModeResolution.namespaced = function namespaced(namespace, isAngleBracket) {
      if (isAngleBracket === void 0) {
        isAngleBracket = false;
      }

      return new LooseModeResolution({
        namespaces: [namespace],
        fallback: false
      }, isAngleBracket);
    }
    /**
     * Fallback resolution is used when no namespaced resolutions are possible, but fallback
     * resolution is still allowed.
     *
     * ```hbs
     * {{x.y}}
     * ```
     *
     * @see {FallbackAmbiguity}
     */
    ;

    LooseModeResolution.fallback = function fallback() {
      return new LooseModeResolution({
        namespaces: [],
        fallback: true
      });
    }
    /**
     * Append resolution is used when the variable should be resolved in both the `component` and
     * `helper` namespaces. Fallback resolution is optional.
     *
     * ```hbs
     * {{x}}
     * ```
     *
     * ^ `x` should be resolved in the `component` and `helper` namespaces with fallback resolution.
     *
     * ```hbs
     * {{x y}}
     * ```
     *
     * ^ `x` should be resolved in the `component` and `helper` namespaces without fallback
     * resolution.
     *
     * @see {ComponentOrHelperAmbiguity}
     */
    ;

    LooseModeResolution.append = function append(_ref13) {
      var invoke = _ref13.invoke;
      return new LooseModeResolution({
        namespaces: ["Component"
        /* Component */
        , "Helper"
        /* Helper */
        ],
        fallback: !invoke
      });
    }
    /**
     * Trusting append resolution is used when the variable should be resolved in both the `component` and
     * `helper` namespaces. Fallback resolution is optional.
     *
     * ```hbs
     * {{{x}}}
     * ```
     *
     * ^ `x` should be resolved in the `component` and `helper` namespaces with fallback resolution.
     *
     * ```hbs
     * {{{x y}}}
     * ```
     *
     * ^ `x` should be resolved in the `component` and `helper` namespaces without fallback
     * resolution.
     *
     * @see {HelperAmbiguity}
     */
    ;

    LooseModeResolution.trustingAppend = function trustingAppend(_ref14) {
      var invoke = _ref14.invoke;
      return new LooseModeResolution({
        namespaces: ["Helper"
        /* Helper */
        ],
        fallback: !invoke
      });
    }
    /**
     * Attribute resolution is used when the variable should be resolved as a `helper` with fallback
     * resolution.
     *
     * ```hbs
     * <a href={{x}} />
     * <a href="{{x}}.html" />
     * ```
     *
     * ^ resolved in the `helper` namespace with fallback
     *
     * @see {HelperAmbiguity}
     */
    ;

    LooseModeResolution.attr = function attr() {
      return new LooseModeResolution({
        namespaces: ["Helper"
        /* Helper */
        ],
        fallback: true
      });
    };

    var _proto15 = LooseModeResolution.prototype;

    _proto15.resolution = function resolution() {
      if (this.ambiguity.namespaces.length === 0) {
        return 33
        /* GetFreeAsFallback */
        ;
      } else if (this.ambiguity.namespaces.length === 1) {
        if (this.ambiguity.fallback) {
          // simple namespaced resolution with fallback must be attr={{x}}
          return 36
          /* GetFreeAsHelperHeadOrThisFallback */
          ;
        } else {
          // simple namespaced resolution without fallback
          switch (this.ambiguity.namespaces[0]) {
            case "Helper"
            /* Helper */
            :
              return 37
              /* GetFreeAsHelperHead */
              ;

            case "Modifier"
            /* Modifier */
            :
              return 38
              /* GetFreeAsModifierHead */
              ;

            case "Component"
            /* Component */
            :
              return 39
              /* GetFreeAsComponentHead */
              ;
          }
        }
      } else if (this.ambiguity.fallback) {
        // component or helper + fallback ({{something}})
        return 34
        /* GetFreeAsComponentOrHelperHeadOrThisFallback */
        ;
      } else {
          // component or helper without fallback ({{something something}})
          return 35
          /* GetFreeAsComponentOrHelperHead */
          ;
        }
    };

    _proto15.serialize = function serialize() {
      if (this.ambiguity.namespaces.length === 0) {
        return 'Loose';
      } else if (this.ambiguity.namespaces.length === 1) {
        if (this.ambiguity.fallback) {
          // simple namespaced resolution with fallback must be attr={{x}}
          return ['ambiguous', "Attr"
          /* Attr */
          ];
        } else {
          return ['ns', this.ambiguity.namespaces[0]];
        }
      } else if (this.ambiguity.fallback) {
        // component or helper + fallback ({{something}})
        return ['ambiguous', "Append"
        /* Append */
        ];
      } else {
        // component or helper without fallback ({{something something}})
        return ['ambiguous', "Invoke"
        /* Invoke */
        ];
      }
    };

    return LooseModeResolution;
  }();

  var ARGUMENT_RESOLUTION = LooseModeResolution.fallback();

  function loadResolution(resolution) {
    if (typeof resolution === 'string') {
      switch (resolution) {
        case 'Loose':
          return LooseModeResolution.fallback();

        case 'Strict':
          return STRICT_RESOLUTION;
      }
    }

    switch (resolution[0]) {
      case 'ambiguous':
        switch (resolution[1]) {
          case "Append"
          /* Append */
          :
            return LooseModeResolution.append({
              invoke: false
            });

          case "Attr"
          /* Attr */
          :
            return LooseModeResolution.attr();

          case "Invoke"
          /* Invoke */
          :
            return LooseModeResolution.append({
              invoke: true
            });
        }

      case 'ns':
        return LooseModeResolution.namespaced(resolution[1]);
    }
  }

  function node(name) {
    if (name !== undefined) {
      var type = name;
      return {
        fields: function fields() {
          return /*#__PURE__*/function () {
            function _class(fields) {
              this.type = type;
              (0, _util.assign)(this, fields);
            }

            return _class;
          }();
        }
      };
    } else {
      return {
        fields: function fields() {
          return /*#__PURE__*/function () {
            function _class2(fields) {
              (0, _util.assign)(this, fields);
            }

            return _class2;
          }();
        }
      };
    }
  }
  /**
   * Corresponds to syntaxes with positional and named arguments:
   *
   * - SubExpression
   * - Invoking Append
   * - Invoking attributes
   * - InvokeBlock
   *
   * If `Args` is empty, the `SourceOffsets` for this node should be the collapsed position
   * immediately after the parent call node's `callee`.
   */


  var Args = /*#__PURE__*/function (_node$fields) {
    (0, _emberBabel.inheritsLoose)(Args, _node$fields);

    function Args() {
      return _node$fields.apply(this, arguments) || this;
    }

    Args.empty = function empty(loc) {
      return new Args({
        loc: loc,
        positional: PositionalArguments.empty(loc),
        named: NamedArguments.empty(loc)
      });
    };

    Args.named = function named(_named) {
      return new Args({
        loc: _named.loc,
        positional: PositionalArguments.empty(_named.loc.collapse('end')),
        named: _named
      });
    };

    var _proto16 = Args.prototype;

    _proto16.nth = function nth(offset) {
      return this.positional.nth(offset);
    };

    _proto16.get = function get(name) {
      return this.named.get(name);
    };

    _proto16.isEmpty = function isEmpty() {
      return this.positional.isEmpty() && this.named.isEmpty();
    };

    return Args;
  }(node().fields());
  /**
   * Corresponds to positional arguments.
   *
   * If `PositionalArguments` is empty, the `SourceOffsets` for this node should be the collapsed
   * position immediately after the parent call node's `callee`.
   */


  var PositionalArguments = /*#__PURE__*/function (_node$fields2) {
    (0, _emberBabel.inheritsLoose)(PositionalArguments, _node$fields2);

    function PositionalArguments() {
      return _node$fields2.apply(this, arguments) || this;
    }

    PositionalArguments.empty = function empty(loc) {
      return new PositionalArguments({
        loc: loc,
        exprs: []
      });
    };

    var _proto17 = PositionalArguments.prototype;

    _proto17.nth = function nth(offset) {
      return this.exprs[offset] || null;
    };

    _proto17.isEmpty = function isEmpty() {
      return this.exprs.length === 0;
    };

    (0, _emberBabel.createClass)(PositionalArguments, [{
      key: "size",
      get: function get() {
        return this.exprs.length;
      }
    }]);
    return PositionalArguments;
  }(node().fields());
  /**
   * Corresponds to named arguments.
   *
   * If `PositionalArguments` and `NamedArguments` are empty, the `SourceOffsets` for this node should
   * be the same as the `Args` node that contains this node.
   *
   * If `PositionalArguments` is not empty but `NamedArguments` is empty, the `SourceOffsets` for this
   * node should be the collapsed position immediately after the last positional argument.
   */


  var NamedArguments = /*#__PURE__*/function (_node$fields3) {
    (0, _emberBabel.inheritsLoose)(NamedArguments, _node$fields3);

    function NamedArguments() {
      return _node$fields3.apply(this, arguments) || this;
    }

    NamedArguments.empty = function empty(loc) {
      return new NamedArguments({
        loc: loc,
        entries: []
      });
    };

    var _proto18 = NamedArguments.prototype;

    _proto18.get = function get(name) {
      var entry = this.entries.filter(function (e) {
        return e.name.chars === name;
      })[0];
      return entry ? entry.value : null;
    };

    _proto18.isEmpty = function isEmpty() {
      return this.entries.length === 0;
    };

    (0, _emberBabel.createClass)(NamedArguments, [{
      key: "size",
      get: function get() {
        return this.entries.length;
      }
    }]);
    return NamedArguments;
  }(node().fields());
  /**
   * Corresponds to a single named argument.
   *
   * ```hbs
   * x=<expr>
   * ```
   */


  var NamedArgument = function NamedArgument(options) {
    this.loc = options.name.loc.extend(options.value.loc);
    this.name = options.name;
    this.value = options.value;
  };
  /**
   * `HtmlAttr` nodes are valid HTML attributes, with or without a value.
   *
   * Exceptions:
   *
   * - `...attributes` is `SplatAttr`
   * - `@x=<value>` is `ComponentArg`
   */


  var HtmlAttr = /*#__PURE__*/function (_node$fields4) {
    (0, _emberBabel.inheritsLoose)(HtmlAttr, _node$fields4);

    function HtmlAttr() {
      return _node$fields4.apply(this, arguments) || this;
    }

    return HtmlAttr;
  }(node('HtmlAttr').fields());

  var SplatAttr = /*#__PURE__*/function (_node$fields5) {
    (0, _emberBabel.inheritsLoose)(SplatAttr, _node$fields5);

    function SplatAttr() {
      return _node$fields5.apply(this, arguments) || this;
    }

    return SplatAttr;
  }(node('SplatAttr').fields());
  /**
   * Corresponds to an argument passed by a component (`@x=<value>`)
   */


  var ComponentArg = /*#__PURE__*/function (_node$fields6) {
    (0, _emberBabel.inheritsLoose)(ComponentArg, _node$fields6);

    function ComponentArg() {
      return _node$fields6.apply(this, arguments) || this;
    }

    var _proto19 = ComponentArg.prototype;

    /**
     * Convert the component argument into a named argument node
     */
    _proto19.toNamedArgument = function toNamedArgument() {
      return new NamedArgument({
        name: this.name,
        value: this.value
      });
    };

    return ComponentArg;
  }(node().fields());
  /**
   * An `ElementModifier` is just a normal call node in modifier position.
   */


  var ElementModifier = /*#__PURE__*/function (_node$fields7) {
    (0, _emberBabel.inheritsLoose)(ElementModifier, _node$fields7);

    function ElementModifier() {
      return _node$fields7.apply(this, arguments) || this;
    }

    return ElementModifier;
  }(node('ElementModifier').fields());

  var SpanList = /*#__PURE__*/function () {
    function SpanList(span) {
      if (span === void 0) {
        span = [];
      }

      this._span = span;
    }

    SpanList.range = function range(span, fallback) {
      if (fallback === void 0) {
        fallback = SourceSpan.NON_EXISTENT;
      }

      return new SpanList(span.map(loc)).getRangeOffset(fallback);
    };

    var _proto20 = SpanList.prototype;

    _proto20.add = function add(offset) {
      this._span.push(offset);
    };

    _proto20.getRangeOffset = function getRangeOffset(fallback) {
      if (this._span.length === 0) {
        return fallback;
      } else {
        var first = this._span[0];
        var last = this._span[this._span.length - 1];
        return first.extend(last);
      }
    };

    return SpanList;
  }();

  _exports.SpanList = SpanList;

  function loc(span) {
    if (Array.isArray(span)) {
      var first = span[0];
      var last = span[span.length - 1];
      return loc(first).extend(loc(last));
    } else if (span instanceof SourceSpan) {
      return span;
    } else {
      return span.loc;
    }
  }

  function hasSpan(span) {
    if (Array.isArray(span) && span.length === 0) {
      return false;
    }

    return true;
  }

  function maybeLoc(location, fallback) {
    if (hasSpan(location)) {
      return loc(location);
    } else {
      return fallback;
    }
  }

  var GlimmerComment = /*#__PURE__*/function (_node$fields8) {
    (0, _emberBabel.inheritsLoose)(GlimmerComment, _node$fields8);

    function GlimmerComment() {
      return _node$fields8.apply(this, arguments) || this;
    }

    return GlimmerComment;
  }(node('GlimmerComment').fields());

  var HtmlText = /*#__PURE__*/function (_node$fields9) {
    (0, _emberBabel.inheritsLoose)(HtmlText, _node$fields9);

    function HtmlText() {
      return _node$fields9.apply(this, arguments) || this;
    }

    return HtmlText;
  }(node('HtmlText').fields());

  var HtmlComment = /*#__PURE__*/function (_node$fields10) {
    (0, _emberBabel.inheritsLoose)(HtmlComment, _node$fields10);

    function HtmlComment() {
      return _node$fields10.apply(this, arguments) || this;
    }

    return HtmlComment;
  }(node('HtmlComment').fields());

  var AppendContent = /*#__PURE__*/function (_node$fields11) {
    (0, _emberBabel.inheritsLoose)(AppendContent, _node$fields11);

    function AppendContent() {
      return _node$fields11.apply(this, arguments) || this;
    }

    (0, _emberBabel.createClass)(AppendContent, [{
      key: "callee",
      get: function get() {
        if (this.value.type === 'Call') {
          return this.value.callee;
        } else {
          return this.value;
        }
      }
    }, {
      key: "args",
      get: function get() {
        if (this.value.type === 'Call') {
          return this.value.args;
        } else {
          return Args.empty(this.value.loc.collapse('end'));
        }
      }
    }]);
    return AppendContent;
  }(node('AppendContent').fields());

  var InvokeBlock = /*#__PURE__*/function (_node$fields12) {
    (0, _emberBabel.inheritsLoose)(InvokeBlock, _node$fields12);

    function InvokeBlock() {
      return _node$fields12.apply(this, arguments) || this;
    }

    return InvokeBlock;
  }(node('InvokeBlock').fields());
  /**
   * Corresponds to a component invocation. When the content of a component invocation contains no
   * named blocks, `blocks` contains a single named block named `"default"`. When a component
   * invocation is self-closing, `blocks` is empty.
   */


  var InvokeComponent = /*#__PURE__*/function (_node$fields13) {
    (0, _emberBabel.inheritsLoose)(InvokeComponent, _node$fields13);

    function InvokeComponent() {
      return _node$fields13.apply(this, arguments) || this;
    }

    (0, _emberBabel.createClass)(InvokeComponent, [{
      key: "args",
      get: function get() {
        var entries = this.componentArgs.map(function (a) {
          return a.toNamedArgument();
        });
        return Args.named(new NamedArguments({
          loc: SpanList.range(entries, this.callee.loc.collapse('end')),
          entries: entries
        }));
      }
    }]);
    return InvokeComponent;
  }(node('InvokeComponent').fields());
  /**
   * Corresponds to a simple HTML element. The AST allows component arguments and modifiers to support
   * future extensions.
   */


  var SimpleElement = /*#__PURE__*/function (_node$fields14) {
    (0, _emberBabel.inheritsLoose)(SimpleElement, _node$fields14);

    function SimpleElement() {
      return _node$fields14.apply(this, arguments) || this;
    }

    (0, _emberBabel.createClass)(SimpleElement, [{
      key: "args",
      get: function get() {
        var entries = this.componentArgs.map(function (a) {
          return a.toNamedArgument();
        });
        return Args.named(new NamedArguments({
          loc: SpanList.range(entries, this.tag.loc.collapse('end')),
          entries: entries
        }));
      }
    }]);
    return SimpleElement;
  }(node('SimpleElement').fields());
  /**
   * Corresponds to a Handlebars literal.
   *
   * @see {LiteralValue}
   */


  var LiteralExpression = /*#__PURE__*/function (_node$fields15) {
    (0, _emberBabel.inheritsLoose)(LiteralExpression, _node$fields15);

    function LiteralExpression() {
      return _node$fields15.apply(this, arguments) || this;
    }

    var _proto21 = LiteralExpression.prototype;

    _proto21.toSlice = function toSlice() {
      return new SourceSlice({
        loc: this.loc,
        chars: this.value
      });
    };

    return LiteralExpression;
  }(node('Literal').fields());
  /**
   * Returns true if an input {@see ExpressionNode} is a literal.
   */


  function isLiteral(node$$1, kind) {
    if (node$$1.type === 'Literal') {
      if (kind === undefined) {
        return true;
      } else if (kind === 'null') {
        return node$$1.value === null;
      } else {
        return typeof node$$1.value === kind;
      }
    } else {
      return false;
    }
  }
  /**
   * Corresponds to a path in expression position.
   *
   * ```hbs
   * this
   * this.x
   * @x
   * @x.y
   * x
   * x.y
   * ```
   */


  var PathExpression = /*#__PURE__*/function (_node$fields16) {
    (0, _emberBabel.inheritsLoose)(PathExpression, _node$fields16);

    function PathExpression() {
      return _node$fields16.apply(this, arguments) || this;
    }

    return PathExpression;
  }(node('Path').fields());
  /**
   * Corresponds to a parenthesized call expression.
   *
   * ```hbs
   * (x)
   * (x.y)
   * (x y)
   * (x.y z)
   * ```
   */


  var CallExpression = /*#__PURE__*/function (_node$fields17) {
    (0, _emberBabel.inheritsLoose)(CallExpression, _node$fields17);

    function CallExpression() {
      return _node$fields17.apply(this, arguments) || this;
    }

    return CallExpression;
  }(node('Call').fields());
  /**
   * Corresponds to a possible deprecated helper call. Must be:
   *
   * 1. A free variable (not this.foo, not @foo, not local).
   * 2. Argument-less.
   * 3. In a component invocation's named argument position.
   * 4. Not parenthesized (not @bar={{(helper)}}).
   * 5. Not interpolated (not @bar="{{helper}}").
   *
   * ```hbs
   * <Foo @bar={{helper}} />
   * ```
   */


  var DeprecatedCallExpression = /*#__PURE__*/function (_node$fields18) {
    (0, _emberBabel.inheritsLoose)(DeprecatedCallExpression, _node$fields18);

    function DeprecatedCallExpression() {
      return _node$fields18.apply(this, arguments) || this;
    }

    return DeprecatedCallExpression;
  }(node('DeprecatedCall').fields());
  /**
   * Corresponds to an interpolation in attribute value position.
   *
   * ```hbs
   * <a href="{{url}}.html"
   * ```
   */


  var InterpolateExpression = /*#__PURE__*/function (_node$fields19) {
    (0, _emberBabel.inheritsLoose)(InterpolateExpression, _node$fields19);

    function InterpolateExpression() {
      return _node$fields19.apply(this, arguments) || this;
    }

    return InterpolateExpression;
  }(node('Interpolate').fields());
  /**
   * Corresponds to `this` at the head of an expression.
   */


  var ThisReference = /*#__PURE__*/function (_node$fields20) {
    (0, _emberBabel.inheritsLoose)(ThisReference, _node$fields20);

    function ThisReference() {
      return _node$fields20.apply(this, arguments) || this;
    }

    return ThisReference;
  }(node('This').fields());
  /**
   * Corresponds to `@<ident>` at the beginning of an expression.
   */


  var ArgReference = /*#__PURE__*/function (_node$fields21) {
    (0, _emberBabel.inheritsLoose)(ArgReference, _node$fields21);

    function ArgReference() {
      return _node$fields21.apply(this, arguments) || this;
    }

    return ArgReference;
  }(node('Arg').fields());
  /**
   * Corresponds to `<ident>` at the beginning of an expression, when `<ident>` is in the current
   * block's scope.
   */


  var LocalVarReference = /*#__PURE__*/function (_node$fields22) {
    (0, _emberBabel.inheritsLoose)(LocalVarReference, _node$fields22);

    function LocalVarReference() {
      return _node$fields22.apply(this, arguments) || this;
    }

    return LocalVarReference;
  }(node('Local').fields());
  /**
   * Corresponds to `<ident>` at the beginning of an expression, when `<ident>` is *not* in the
   * current block's scope.
   *
   * The `resolution: FreeVarResolution` field describes how to resolve the free variable.
   *
   * Note: In strict mode, it must always be a variable that is in a concrete JavaScript scope that
   * the template will be installed into.
   */


  var FreeVarReference = /*#__PURE__*/function (_node$fields23) {
    (0, _emberBabel.inheritsLoose)(FreeVarReference, _node$fields23);

    function FreeVarReference() {
      return _node$fields23.apply(this, arguments) || this;
    }

    return FreeVarReference;
  }(node('Free').fields());
  /**
   * Corresponds to an entire template.
   */


  var Template = /*#__PURE__*/function (_node$fields24) {
    (0, _emberBabel.inheritsLoose)(Template, _node$fields24);

    function Template() {
      return _node$fields24.apply(this, arguments) || this;
    }

    return Template;
  }(node().fields());
  /**
   * Represents a block. In principle this could be merged with `NamedBlock`, because all cases
   * involving blocks have at least a notional name.
   */


  var Block = /*#__PURE__*/function (_node$fields25) {
    (0, _emberBabel.inheritsLoose)(Block, _node$fields25);

    function Block() {
      return _node$fields25.apply(this, arguments) || this;
    }

    return Block;
  }(node().fields());
  /**
   * Corresponds to a collection of named blocks.
   */


  var NamedBlocks = /*#__PURE__*/function (_node$fields26) {
    (0, _emberBabel.inheritsLoose)(NamedBlocks, _node$fields26);

    function NamedBlocks() {
      return _node$fields26.apply(this, arguments) || this;
    }

    var _proto22 = NamedBlocks.prototype;

    _proto22.get = function get(name) {
      return this.blocks.filter(function (block) {
        return block.name.chars === name;
      })[0] || null;
    };

    return NamedBlocks;
  }(node().fields());
  /**
   * Corresponds to a single named block. This is used for anonymous named blocks (`default` and
   * `else`).
   */


  var NamedBlock = /*#__PURE__*/function (_node$fields27) {
    (0, _emberBabel.inheritsLoose)(NamedBlock, _node$fields27);

    function NamedBlock() {
      return _node$fields27.apply(this, arguments) || this;
    }

    (0, _emberBabel.createClass)(NamedBlock, [{
      key: "args",
      get: function get() {
        var entries = this.componentArgs.map(function (a) {
          return a.toNamedArgument();
        });
        return Args.named(new NamedArguments({
          loc: SpanList.range(entries, this.name.loc.collapse('end')),
          entries: entries
        }));
      }
    }]);
    return NamedBlock;
  }(node().fields());

  var api$1 = /*#__PURE__*/Object.freeze({
    StrictResolution: StrictResolution,
    STRICT_RESOLUTION: STRICT_RESOLUTION,
    LooseModeResolution: LooseModeResolution,
    ARGUMENT_RESOLUTION: ARGUMENT_RESOLUTION,
    loadResolution: loadResolution,
    node: node,
    Args: Args,
    PositionalArguments: PositionalArguments,
    NamedArguments: NamedArguments,
    NamedArgument: NamedArgument,
    HtmlAttr: HtmlAttr,
    SplatAttr: SplatAttr,
    ComponentArg: ComponentArg,
    ElementModifier: ElementModifier,
    GlimmerComment: GlimmerComment,
    HtmlText: HtmlText,
    HtmlComment: HtmlComment,
    AppendContent: AppendContent,
    InvokeBlock: InvokeBlock,
    InvokeComponent: InvokeComponent,
    SimpleElement: SimpleElement,
    LiteralExpression: LiteralExpression,
    isLiteral: isLiteral,
    PathExpression: PathExpression,
    CallExpression: CallExpression,
    DeprecatedCallExpression: DeprecatedCallExpression,
    InterpolateExpression: InterpolateExpression,
    ThisReference: ThisReference,
    ArgReference: ArgReference,
    LocalVarReference: LocalVarReference,
    FreeVarReference: FreeVarReference,
    Template: Template,
    Block: Block,
    NamedBlocks: NamedBlocks,
    NamedBlock: NamedBlock
  });
  _exports.ASTv2 = api$1;
  var ATTR_VALUE_REGEX_TEST = /[\xA0"&]/;
  var ATTR_VALUE_REGEX_REPLACE = new RegExp(ATTR_VALUE_REGEX_TEST.source, 'g');
  var TEXT_REGEX_TEST = /[\xA0&<>]/;
  var TEXT_REGEX_REPLACE = new RegExp(TEXT_REGEX_TEST.source, 'g');

  function attrValueReplacer(char) {
    switch (char.charCodeAt(0)) {
      case 160
      /* NBSP */
      :
        return '&nbsp;';

      case 34
      /* QUOT */
      :
        return '&quot;';

      case 38
      /* AMP */
      :
        return '&amp;';

      default:
        return char;
    }
  }

  function textReplacer(char) {
    switch (char.charCodeAt(0)) {
      case 160
      /* NBSP */
      :
        return '&nbsp;';

      case 38
      /* AMP */
      :
        return '&amp;';

      case 60
      /* LT */
      :
        return '&lt;';

      case 62
      /* GT */
      :
        return '&gt;';

      default:
        return char;
    }
  }

  function escapeAttrValue(attrValue) {
    if (ATTR_VALUE_REGEX_TEST.test(attrValue)) {
      return attrValue.replace(ATTR_VALUE_REGEX_REPLACE, attrValueReplacer);
    }

    return attrValue;
  }

  function escapeText(text) {
    if (TEXT_REGEX_TEST.test(text)) {
      return text.replace(TEXT_REGEX_REPLACE, textReplacer);
    }

    return text;
  }

  function sortByLoc(a, b) {
    // If either is invisible, don't try to order them
    if (a.loc.isInvisible || b.loc.isInvisible) {
      return 0;
    }

    if (a.loc.startPosition.line < b.loc.startPosition.line) {
      return -1;
    }

    if (a.loc.startPosition.line === b.loc.startPosition.line && a.loc.startPosition.column < b.loc.startPosition.column) {
      return -1;
    }

    if (a.loc.startPosition.line === b.loc.startPosition.line && a.loc.startPosition.column === b.loc.startPosition.column) {
      return 0;
    }

    return 1;
  }

  var voidMap = Object.create(null);
  var voidTagNames = 'area base br col command embed hr img input keygen link meta param source track wbr';
  voidTagNames.split(' ').forEach(function (tagName) {
    voidMap[tagName] = true;
  });
  var NON_WHITESPACE = /\S/;

  var Printer = /*#__PURE__*/function () {
    function Printer(options) {
      this.buffer = '';
      this.options = options;
    }
    /*
      This is used by _all_ methods on this Printer class that add to `this.buffer`,
      it allows consumers of the printer to use alternate string representations for
      a given node.
         The primary use case for this are things like source -> source codemod utilities.
      For example, ember-template-recast attempts to always preserve the original string
      formatting in each AST node if no modifications are made to it.
    */


    var _proto23 = Printer.prototype;

    _proto23.handledByOverride = function handledByOverride(node, ensureLeadingWhitespace) {
      if (ensureLeadingWhitespace === void 0) {
        ensureLeadingWhitespace = false;
      }

      if (this.options.override !== undefined) {
        var result = this.options.override(node, this.options);

        if (typeof result === 'string') {
          if (ensureLeadingWhitespace && result !== '' && NON_WHITESPACE.test(result[0])) {
            result = " " + result;
          }

          this.buffer += result;
          return true;
        }
      }

      return false;
    };

    _proto23.Node = function Node(node) {
      switch (node.type) {
        case 'MustacheStatement':
        case 'BlockStatement':
        case 'PartialStatement':
        case 'MustacheCommentStatement':
        case 'CommentStatement':
        case 'TextNode':
        case 'ElementNode':
        case 'AttrNode':
        case 'Block':
        case 'Template':
          return this.TopLevelStatement(node);

        case 'StringLiteral':
        case 'BooleanLiteral':
        case 'NumberLiteral':
        case 'UndefinedLiteral':
        case 'NullLiteral':
        case 'PathExpression':
        case 'SubExpression':
          return this.Expression(node);

        case 'Program':
          return this.Block(node);

        case 'ConcatStatement':
          // should have an AttrNode parent
          return this.ConcatStatement(node);

        case 'Hash':
          return this.Hash(node);

        case 'HashPair':
          return this.HashPair(node);

        case 'ElementModifierStatement':
          return this.ElementModifierStatement(node);
      }
    };

    _proto23.Expression = function Expression(expression) {
      switch (expression.type) {
        case 'StringLiteral':
        case 'BooleanLiteral':
        case 'NumberLiteral':
        case 'UndefinedLiteral':
        case 'NullLiteral':
          return this.Literal(expression);

        case 'PathExpression':
          return this.PathExpression(expression);

        case 'SubExpression':
          return this.SubExpression(expression);
      }
    };

    _proto23.Literal = function Literal(literal) {
      switch (literal.type) {
        case 'StringLiteral':
          return this.StringLiteral(literal);

        case 'BooleanLiteral':
          return this.BooleanLiteral(literal);

        case 'NumberLiteral':
          return this.NumberLiteral(literal);

        case 'UndefinedLiteral':
          return this.UndefinedLiteral(literal);

        case 'NullLiteral':
          return this.NullLiteral(literal);
      }
    };

    _proto23.TopLevelStatement = function TopLevelStatement(statement) {
      switch (statement.type) {
        case 'MustacheStatement':
          return this.MustacheStatement(statement);

        case 'BlockStatement':
          return this.BlockStatement(statement);

        case 'PartialStatement':
          return this.PartialStatement(statement);

        case 'MustacheCommentStatement':
          return this.MustacheCommentStatement(statement);

        case 'CommentStatement':
          return this.CommentStatement(statement);

        case 'TextNode':
          return this.TextNode(statement);

        case 'ElementNode':
          return this.ElementNode(statement);

        case 'Block':
        case 'Template':
          return this.Block(statement);

        case 'AttrNode':
          // should have element
          return this.AttrNode(statement);
      }
    };

    _proto23.Block = function Block(block) {
      /*
        When processing a template like:
             ```hbs
        {{#if whatever}}
          whatever
        {{else if somethingElse}}
          something else
        {{else}}
          fallback
        {{/if}}
        ```
             The AST still _effectively_ looks like:
             ```hbs
        {{#if whatever}}
          whatever
        {{else}}{{#if somethingElse}}
          something else
        {{else}}
          fallback
        {{/if}}{{/if}}
        ```
             The only way we can tell if that is the case is by checking for
        `block.chained`, but unfortunately when the actual statements are
        processed the `block.body[0]` node (which will always be a
        `BlockStatement`) has no clue that its ancestor `Block` node was
        chained.
             This "forwards" the `chained` setting so that we can check
        it later when processing the `BlockStatement`.
      */
      if (block.chained) {
        var firstChild = block.body[0];
        firstChild.chained = true;
      }

      if (this.handledByOverride(block)) {
        return;
      }

      this.TopLevelStatements(block.body);
    };

    _proto23.TopLevelStatements = function TopLevelStatements(statements) {
      var _this2 = this;

      statements.forEach(function (statement) {
        return _this2.TopLevelStatement(statement);
      });
    };

    _proto23.ElementNode = function ElementNode(el) {
      if (this.handledByOverride(el)) {
        return;
      }

      this.OpenElementNode(el);
      this.TopLevelStatements(el.children);
      this.CloseElementNode(el);
    };

    _proto23.OpenElementNode = function OpenElementNode(el) {
      this.buffer += "<" + el.tag;
      var parts = [].concat(el.attributes, el.modifiers, el.comments).sort(sortByLoc);

      for (var _iterator2 = (0, _emberBabel.createForOfIteratorHelperLoose)(parts), _step2; !(_step2 = _iterator2()).done;) {
        var _part = _step2.value;
        this.buffer += ' ';

        switch (_part.type) {
          case 'AttrNode':
            this.AttrNode(_part);
            break;

          case 'ElementModifierStatement':
            this.ElementModifierStatement(_part);
            break;

          case 'MustacheCommentStatement':
            this.MustacheCommentStatement(_part);
            break;
        }
      }

      if (el.blockParams.length) {
        this.BlockParams(el.blockParams);
      }

      if (el.selfClosing) {
        this.buffer += ' /';
      }

      this.buffer += '>';
    };

    _proto23.CloseElementNode = function CloseElementNode(el) {
      if (el.selfClosing || voidMap[el.tag.toLowerCase()]) {
        return;
      }

      this.buffer += "</" + el.tag + ">";
    };

    _proto23.AttrNode = function AttrNode(attr) {
      if (this.handledByOverride(attr)) {
        return;
      }

      var name = attr.name,
          value = attr.value;
      this.buffer += name;

      if (value.type !== 'TextNode' || value.chars.length > 0) {
        this.buffer += '=';
        this.AttrNodeValue(value);
      }
    };

    _proto23.AttrNodeValue = function AttrNodeValue(value) {
      if (value.type === 'TextNode') {
        this.buffer += '"';
        this.TextNode(value, true);
        this.buffer += '"';
      } else {
        this.Node(value);
      }
    };

    _proto23.TextNode = function TextNode(text, isAttr) {
      if (this.handledByOverride(text)) {
        return;
      }

      if (this.options.entityEncoding === 'raw') {
        this.buffer += text.chars;
      } else if (isAttr) {
        this.buffer += escapeAttrValue(text.chars);
      } else {
        this.buffer += escapeText(text.chars);
      }
    };

    _proto23.MustacheStatement = function MustacheStatement(mustache) {
      if (this.handledByOverride(mustache)) {
        return;
      }

      this.buffer += mustache.escaped ? '{{' : '{{{';

      if (mustache.strip.open) {
        this.buffer += '~';
      }

      this.Expression(mustache.path);
      this.Params(mustache.params);
      this.Hash(mustache.hash);

      if (mustache.strip.close) {
        this.buffer += '~';
      }

      this.buffer += mustache.escaped ? '}}' : '}}}';
    };

    _proto23.BlockStatement = function BlockStatement(block) {
      if (this.handledByOverride(block)) {
        return;
      }

      if (block.chained) {
        this.buffer += block.inverseStrip.open ? '{{~' : '{{';
        this.buffer += 'else ';
      } else {
        this.buffer += block.openStrip.open ? '{{~#' : '{{#';
      }

      this.Expression(block.path);
      this.Params(block.params);
      this.Hash(block.hash);

      if (block.program.blockParams.length) {
        this.BlockParams(block.program.blockParams);
      }

      if (block.chained) {
        this.buffer += block.inverseStrip.close ? '~}}' : '}}';
      } else {
        this.buffer += block.openStrip.close ? '~}}' : '}}';
      }

      this.Block(block.program);

      if (block.inverse) {
        if (!block.inverse.chained) {
          this.buffer += block.inverseStrip.open ? '{{~' : '{{';
          this.buffer += 'else';
          this.buffer += block.inverseStrip.close ? '~}}' : '}}';
        }

        this.Block(block.inverse);
      }

      if (!block.chained) {
        this.buffer += block.closeStrip.open ? '{{~/' : '{{/';
        this.Expression(block.path);
        this.buffer += block.closeStrip.close ? '~}}' : '}}';
      }
    };

    _proto23.BlockParams = function BlockParams(blockParams) {
      this.buffer += " as |" + blockParams.join(' ') + "|";
    };

    _proto23.PartialStatement = function PartialStatement(partial) {
      if (this.handledByOverride(partial)) {
        return;
      }

      this.buffer += '{{>';
      this.Expression(partial.name);
      this.Params(partial.params);
      this.Hash(partial.hash);
      this.buffer += '}}';
    };

    _proto23.ConcatStatement = function ConcatStatement(concat) {
      var _this3 = this;

      if (this.handledByOverride(concat)) {
        return;
      }

      this.buffer += '"';
      concat.parts.forEach(function (part) {
        if (part.type === 'TextNode') {
          _this3.TextNode(part, true);
        } else {
          _this3.Node(part);
        }
      });
      this.buffer += '"';
    };

    _proto23.MustacheCommentStatement = function MustacheCommentStatement(comment) {
      if (this.handledByOverride(comment)) {
        return;
      }

      this.buffer += "{{!--" + comment.value + "--}}";
    };

    _proto23.ElementModifierStatement = function ElementModifierStatement(mod) {
      if (this.handledByOverride(mod)) {
        return;
      }

      this.buffer += '{{';
      this.Expression(mod.path);
      this.Params(mod.params);
      this.Hash(mod.hash);
      this.buffer += '}}';
    };

    _proto23.CommentStatement = function CommentStatement(comment) {
      if (this.handledByOverride(comment)) {
        return;
      }

      this.buffer += "<!--" + comment.value + "-->";
    };

    _proto23.PathExpression = function PathExpression(path) {
      if (this.handledByOverride(path)) {
        return;
      }

      this.buffer += path.original;
    };

    _proto23.SubExpression = function SubExpression(sexp) {
      if (this.handledByOverride(sexp)) {
        return;
      }

      this.buffer += '(';
      this.Expression(sexp.path);
      this.Params(sexp.params);
      this.Hash(sexp.hash);
      this.buffer += ')';
    };

    _proto23.Params = function Params(params) {
      var _this4 = this;

      // TODO: implement a top level Params AST node (just like the Hash object)
      // so that this can also be overridden
      if (params.length) {
        params.forEach(function (param) {
          _this4.buffer += ' ';

          _this4.Expression(param);
        });
      }
    };

    _proto23.Hash = function Hash(hash) {
      var _this5 = this;

      if (this.handledByOverride(hash, true)) {
        return;
      }

      hash.pairs.forEach(function (pair) {
        _this5.buffer += ' ';

        _this5.HashPair(pair);
      });
    };

    _proto23.HashPair = function HashPair(pair) {
      if (this.handledByOverride(pair)) {
        return;
      }

      this.buffer += pair.key;
      this.buffer += '=';
      this.Node(pair.value);
    };

    _proto23.StringLiteral = function StringLiteral(str) {
      if (this.handledByOverride(str)) {
        return;
      }

      this.buffer += JSON.stringify(str.value);
    };

    _proto23.BooleanLiteral = function BooleanLiteral(bool) {
      if (this.handledByOverride(bool)) {
        return;
      }

      this.buffer += bool.value;
    };

    _proto23.NumberLiteral = function NumberLiteral(number) {
      if (this.handledByOverride(number)) {
        return;
      }

      this.buffer += number.value;
    };

    _proto23.UndefinedLiteral = function UndefinedLiteral(node) {
      if (this.handledByOverride(node)) {
        return;
      }

      this.buffer += 'undefined';
    };

    _proto23.NullLiteral = function NullLiteral(node) {
      if (this.handledByOverride(node)) {
        return;
      }

      this.buffer += 'null';
    };

    _proto23.print = function print(node) {
      var options = this.options;

      if (options.override) {
        var result = options.override(node, options);

        if (result !== undefined) {
          return result;
        }
      }

      this.buffer = '';
      this.Node(node);
      return this.buffer;
    };

    return Printer;
  }();

  function build(ast, options) {
    if (options === void 0) {
      options = {
        entityEncoding: 'transformed'
      };
    }

    if (!ast) {
      return '';
    }

    var printer = new Printer(options);
    return printer.print(ast);
  }

  function generateSyntaxError(message, location) {
    var module = location.module,
        loc = location.loc;
    var _loc$start = loc.start,
        line = _loc$start.line,
        column = _loc$start.column;
    var code = location.asString();
    var quotedCode = code ? "\n\n|\n|  " + code.split('\n').join('\n|  ') + "\n|\n\n" : '';
    var error = new Error(message + ": " + quotedCode + "(error occurred in '" + module + "' @ line " + line + " : column " + column + ")");
    error.name = 'SyntaxError';
    error.location = location;
    error.code = code;
    return error;
  } // ParentNode and ChildKey types are derived from VisitorKeysMap


  var visitorKeys = {
    Program: (0, _util.tuple)('body'),
    Template: (0, _util.tuple)('body'),
    Block: (0, _util.tuple)('body'),
    MustacheStatement: (0, _util.tuple)('path', 'params', 'hash'),
    BlockStatement: (0, _util.tuple)('path', 'params', 'hash', 'program', 'inverse'),
    ElementModifierStatement: (0, _util.tuple)('path', 'params', 'hash'),
    PartialStatement: (0, _util.tuple)('name', 'params', 'hash'),
    CommentStatement: (0, _util.tuple)(),
    MustacheCommentStatement: (0, _util.tuple)(),
    ElementNode: (0, _util.tuple)('attributes', 'modifiers', 'children', 'comments'),
    AttrNode: (0, _util.tuple)('value'),
    TextNode: (0, _util.tuple)(),
    ConcatStatement: (0, _util.tuple)('parts'),
    SubExpression: (0, _util.tuple)('path', 'params', 'hash'),
    PathExpression: (0, _util.tuple)(),
    PathHead: (0, _util.tuple)(),
    StringLiteral: (0, _util.tuple)(),
    BooleanLiteral: (0, _util.tuple)(),
    NumberLiteral: (0, _util.tuple)(),
    NullLiteral: (0, _util.tuple)(),
    UndefinedLiteral: (0, _util.tuple)(),
    Hash: (0, _util.tuple)('pairs'),
    HashPair: (0, _util.tuple)('value'),
    // v2 new nodes
    NamedBlock: (0, _util.tuple)('attributes', 'modifiers', 'children', 'comments'),
    SimpleElement: (0, _util.tuple)('attributes', 'modifiers', 'children', 'comments'),
    Component: (0, _util.tuple)('head', 'attributes', 'modifiers', 'children', 'comments')
  };

  var TraversalError = function () {
    TraversalError.prototype = Object.create(Error.prototype);
    TraversalError.prototype.constructor = TraversalError;

    function TraversalError(message, node, parent, key) {
      var error = Error.call(this, message);
      this.key = key;
      this.message = message;
      this.node = node;
      this.parent = parent;
      this.stack = error.stack;
    }

    return TraversalError;
  }();

  function cannotRemoveNode(node, parent, key) {
    return new TraversalError('Cannot remove a node unless it is part of an array', node, parent, key);
  }

  function cannotReplaceNode(node, parent, key) {
    return new TraversalError('Cannot replace a node with multiple nodes unless it is part of an array', node, parent, key);
  }

  function cannotReplaceOrRemoveInKeyHandlerYet(node, key) {
    return new TraversalError('Replacing and removing in key handlers is not yet supported.', node, null, key);
  }

  var WalkerPath = /*#__PURE__*/function () {
    function WalkerPath(node, parent, parentKey) {
      if (parent === void 0) {
        parent = null;
      }

      if (parentKey === void 0) {
        parentKey = null;
      }

      this.node = node;
      this.parent = parent;
      this.parentKey = parentKey;
    }

    var _proto24 = WalkerPath.prototype;

    _proto24.parents = function parents() {
      var _this6 = this,
          _ref15;

      return _ref15 = {}, _ref15[Symbol.iterator] = function () {
        return new PathParentsIterator(_this6);
      }, _ref15;
    };

    (0, _emberBabel.createClass)(WalkerPath, [{
      key: "parentNode",
      get: function get() {
        return this.parent ? this.parent.node : null;
      }
    }]);
    return WalkerPath;
  }();

  _exports.WalkerPath = WalkerPath;

  var PathParentsIterator = /*#__PURE__*/function () {
    function PathParentsIterator(path) {
      this.path = path;
    }

    var _proto25 = PathParentsIterator.prototype;

    _proto25.next = function next() {
      if (this.path.parent) {
        this.path = this.path.parent;
        return {
          done: false,
          value: this.path
        };
      } else {
        return {
          done: true,
          value: null
        };
      }
    };

    return PathParentsIterator;
  }();

  function getEnterFunction(handler) {
    if (typeof handler === 'function') {
      return handler;
    } else {
      return handler.enter;
    }
  }

  function getExitFunction(handler) {
    if (typeof handler === 'function') {
      return undefined;
    } else {
      return handler.exit;
    }
  }

  function getKeyHandler(handler, key) {
    var keyVisitor = typeof handler !== 'function' ? handler.keys : undefined;
    if (keyVisitor === undefined) return;
    var keyHandler = keyVisitor[key];

    if (keyHandler !== undefined) {
      return keyHandler;
    }

    return keyVisitor.All;
  }

  function getNodeHandler(visitor, nodeType) {
    if (nodeType === 'Template' || nodeType === 'Block') {
      if (visitor.Program) {
        return visitor.Program;
      }
    }

    var handler = visitor[nodeType];

    if (handler !== undefined) {
      return handler;
    }

    return visitor.All;
  }

  function visitNode(visitor, path) {
    var node = path.node,
        parent = path.parent,
        parentKey = path.parentKey;
    var handler = getNodeHandler(visitor, node.type);
    var enter;
    var exit;

    if (handler !== undefined) {
      enter = getEnterFunction(handler);
      exit = getExitFunction(handler);
    }

    var result;

    if (enter !== undefined) {
      result = enter(node, path);
    }

    if (result !== undefined && result !== null) {
      if (JSON.stringify(node) === JSON.stringify(result)) {
        result = undefined;
      } else if (Array.isArray(result)) {
        visitArray(visitor, result, parent, parentKey);
        return result;
      } else {
        var _path = new WalkerPath(result, parent, parentKey);

        return visitNode(visitor, _path) || result;
      }
    }

    if (result === undefined) {
      var keys = visitorKeys[node.type];

      for (var i = 0; i < keys.length; i++) {
        var key = keys[i]; // we know if it has child keys we can widen to a ParentNode

        visitKey(visitor, handler, path, key);
      }

      if (exit !== undefined) {
        result = exit(node, path);
      }
    }

    return result;
  }

  function get(node, key) {
    return node[key];
  }

  function set(node, key, value) {
    node[key] = value;
  }

  function visitKey(visitor, handler, path, key) {
    var node = path.node;
    var value = get(node, key);

    if (!value) {
      return;
    }

    var keyEnter;
    var keyExit;

    if (handler !== undefined) {
      var keyHandler = getKeyHandler(handler, key);

      if (keyHandler !== undefined) {
        keyEnter = getEnterFunction(keyHandler);
        keyExit = getExitFunction(keyHandler);
      }
    }

    if (keyEnter !== undefined) {
      if (keyEnter(node, key) !== undefined) {
        throw cannotReplaceOrRemoveInKeyHandlerYet(node, key);
      }
    }

    if (Array.isArray(value)) {
      visitArray(visitor, value, path, key);
    } else {
      var keyPath = new WalkerPath(value, path, key);
      var result = visitNode(visitor, keyPath);

      if (result !== undefined) {
        // TODO: dynamically check the results by having a table of
        // expected node types in value space, not just type space
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        assignKey(node, key, value, result);
      }
    }

    if (keyExit !== undefined) {
      if (keyExit(node, key) !== undefined) {
        throw cannotReplaceOrRemoveInKeyHandlerYet(node, key);
      }
    }
  }

  function visitArray(visitor, array, parent, parentKey) {
    for (var i = 0; i < array.length; i++) {
      var _node = array[i];
      var path = new WalkerPath(_node, parent, parentKey);
      var result = visitNode(visitor, path);

      if (result !== undefined) {
        i += spliceArray(array, i, result) - 1;
      }
    }
  }

  function assignKey(node, key, value, result) {
    if (result === null) {
      throw cannotRemoveNode(value, node, key);
    } else if (Array.isArray(result)) {
      if (result.length === 1) {
        set(node, key, result[0]);
      } else {
        if (result.length === 0) {
          throw cannotRemoveNode(value, node, key);
        } else {
          throw cannotReplaceNode(value, node, key);
        }
      }
    } else {
      set(node, key, result);
    }
  }

  function spliceArray(array, index, result) {
    if (result === null) {
      array.splice(index, 1);
      return 0;
    } else if (Array.isArray(result)) {
      array.splice.apply(array, [index, 1].concat(result));
      return result.length;
    } else {
      array.splice(index, 1, result);
      return 1;
    }
  }

  function traverse(node, visitor) {
    var path = new WalkerPath(node);
    visitNode(visitor, path);
  }

  var Walker = /*#__PURE__*/function () {
    function Walker(order) {
      this.order = order;
      this.stack = [];
    }

    var _proto26 = Walker.prototype;

    _proto26.visit = function visit(node, callback) {
      if (!node) {
        return;
      }

      this.stack.push(node);

      if (this.order === 'post') {
        this.children(node, callback);
        callback(node, this);
      } else {
        callback(node, this);
        this.children(node, callback);
      }

      this.stack.pop();
    };

    _proto26.children = function children(node, callback) {
      switch (node.type) {
        case 'Block':
        case 'Template':
          return visitors.Program(this, node, callback);

        case 'ElementNode':
          return visitors.ElementNode(this, node, callback);

        case 'BlockStatement':
          return visitors.BlockStatement(this, node, callback);

        default:
          return;
      }
    };

    return Walker;
  }();

  _exports.Path = _exports.Walker = Walker;
  var visitors = {
    Program: function Program(walker, node, callback) {
      for (var i = 0; i < node.body.length; i++) {
        walker.visit(node.body[i], callback);
      }
    },
    Template: function Template(walker, node, callback) {
      for (var i = 0; i < node.body.length; i++) {
        walker.visit(node.body[i], callback);
      }
    },
    Block: function Block(walker, node, callback) {
      for (var i = 0; i < node.body.length; i++) {
        walker.visit(node.body[i], callback);
      }
    },
    ElementNode: function ElementNode(walker, node, callback) {
      for (var i = 0; i < node.children.length; i++) {
        walker.visit(node.children[i], callback);
      }
    },
    BlockStatement: function BlockStatement(walker, node, callback) {
      walker.visit(node.program, callback);
      walker.visit(node.inverse || null, callback);
    }
  }; // Based on the ID validation regex in Handlebars.

  var ID_INVERSE_PATTERN = /[!"#%-,\.\/;->@\[-\^`\{-~]/; // Checks the element's attributes to see if it uses block params.
  // If it does, registers the block params with the program and
  // removes the corresponding attributes from the element.

  function parseElementBlockParams(element) {
    var params = parseBlockParams(element);
    if (params) element.blockParams = params;
  }

  function parseBlockParams(element) {
    var l = element.attributes.length;
    var attrNames = [];

    for (var i = 0; i < l; i++) {
      attrNames.push(element.attributes[i].name);
    }

    var asIndex = attrNames.indexOf('as');

    if (asIndex === -1 && attrNames.length > 0 && attrNames[attrNames.length - 1].charAt(0) === '|') {
      throw generateSyntaxError('Block parameters must be preceded by the `as` keyword, detected block parameters without `as`', element.loc);
    }

    if (asIndex !== -1 && l > asIndex && attrNames[asIndex + 1].charAt(0) === '|') {
      // Some basic validation, since we're doing the parsing ourselves
      var paramsString = attrNames.slice(asIndex).join(' ');

      if (paramsString.charAt(paramsString.length - 1) !== '|' || paramsString.match(/\|/g).length !== 2) {
        throw generateSyntaxError("Invalid block parameters syntax, '" + paramsString + "'", element.loc);
      }

      var params = [];

      for (var _i = asIndex + 1; _i < l; _i++) {
        var param = attrNames[_i].replace(/\|/g, '');

        if (param !== '') {
          if (ID_INVERSE_PATTERN.test(param)) {
            throw generateSyntaxError("Invalid identifier for block parameters, '" + param + "'", element.loc);
          }

          params.push(param);
        }
      }

      if (params.length === 0) {
        throw generateSyntaxError('Cannot use zero block parameters', element.loc);
      }

      element.attributes = element.attributes.slice(0, asIndex);
      return params;
    }

    return null;
  }

  function childrenFor(node) {
    switch (node.type) {
      case 'Block':
      case 'Template':
        return node.body;

      case 'ElementNode':
        return node.children;
    }
  }

  function appendChild(parent, node) {
    childrenFor(parent).push(node);
  }

  function isHBSLiteral(path) {
    return path.type === 'StringLiteral' || path.type === 'BooleanLiteral' || path.type === 'NumberLiteral' || path.type === 'NullLiteral' || path.type === 'UndefinedLiteral';
  }

  function printLiteral(literal) {
    if (literal.type === 'UndefinedLiteral') {
      return 'undefined';
    } else {
      return JSON.stringify(literal.value);
    }
  }

  function isUpperCase(tag) {
    return tag[0] === tag[0].toUpperCase() && tag[0] !== tag[0].toLowerCase();
  }

  function isLowerCase(tag) {
    return tag[0] === tag[0].toLowerCase() && tag[0] !== tag[0].toUpperCase();
  }

  var DEFAULT_STRIP = {
    close: false,
    open: false
  };
  /**
   * The Parser Builder differentiates from the public builder API by:
   *
   * 1. Offering fewer different ways to instantiate nodes
   * 2. Mandating source locations
   */

  var Builders = /*#__PURE__*/function () {
    function Builders() {}

    var _proto27 = Builders.prototype;

    _proto27.pos = function pos(line, column) {
      return {
        line: line,
        column: column
      };
    };

    _proto27.blockItself = function blockItself(_ref16) {
      var body = _ref16.body,
          blockParams = _ref16.blockParams,
          _ref16$chained = _ref16.chained,
          chained = _ref16$chained === void 0 ? false : _ref16$chained,
          loc = _ref16.loc;
      return {
        type: 'Block',
        body: body || [],
        blockParams: blockParams || [],
        chained: chained,
        loc: loc
      };
    };

    _proto27.template = function template(_ref17) {
      var body = _ref17.body,
          blockParams = _ref17.blockParams,
          loc = _ref17.loc;
      return {
        type: 'Template',
        body: body || [],
        blockParams: blockParams || [],
        loc: loc
      };
    };

    _proto27.mustache = function mustache(_ref18) {
      var path = _ref18.path,
          params = _ref18.params,
          hash = _ref18.hash,
          trusting = _ref18.trusting,
          loc = _ref18.loc,
          _ref18$strip = _ref18.strip,
          strip = _ref18$strip === void 0 ? DEFAULT_STRIP : _ref18$strip;
      return {
        type: 'MustacheStatement',
        path: path,
        params: params,
        hash: hash,
        escaped: !trusting,
        trusting: trusting,
        loc: loc,
        strip: strip || {
          open: false,
          close: false
        }
      };
    };

    _proto27.block = function block(_ref19) {
      var path = _ref19.path,
          params = _ref19.params,
          hash = _ref19.hash,
          defaultBlock = _ref19.defaultBlock,
          _ref19$elseBlock = _ref19.elseBlock,
          elseBlock = _ref19$elseBlock === void 0 ? null : _ref19$elseBlock,
          loc = _ref19.loc,
          _ref19$openStrip = _ref19.openStrip,
          openStrip = _ref19$openStrip === void 0 ? DEFAULT_STRIP : _ref19$openStrip,
          _ref19$inverseStrip = _ref19.inverseStrip,
          inverseStrip = _ref19$inverseStrip === void 0 ? DEFAULT_STRIP : _ref19$inverseStrip,
          _ref19$closeStrip = _ref19.closeStrip,
          closeStrip = _ref19$closeStrip === void 0 ? DEFAULT_STRIP : _ref19$closeStrip;
      return {
        type: 'BlockStatement',
        path: path,
        params: params,
        hash: hash,
        program: defaultBlock,
        inverse: elseBlock,
        loc: loc,
        openStrip: openStrip,
        inverseStrip: inverseStrip,
        closeStrip: closeStrip
      };
    };

    _proto27.comment = function comment(value, loc) {
      return {
        type: 'CommentStatement',
        value: value,
        loc: loc
      };
    };

    _proto27.mustacheComment = function mustacheComment(value, loc) {
      return {
        type: 'MustacheCommentStatement',
        value: value,
        loc: loc
      };
    };

    _proto27.concat = function concat(parts, loc) {
      return {
        type: 'ConcatStatement',
        parts: parts,
        loc: loc
      };
    };

    _proto27.element = function element(_ref20) {
      var tag = _ref20.tag,
          selfClosing = _ref20.selfClosing,
          attrs = _ref20.attrs,
          blockParams = _ref20.blockParams,
          modifiers = _ref20.modifiers,
          comments = _ref20.comments,
          children = _ref20.children,
          loc = _ref20.loc;
      return {
        type: 'ElementNode',
        tag: tag,
        selfClosing: selfClosing,
        attributes: attrs || [],
        blockParams: blockParams || [],
        modifiers: modifiers || [],
        comments: comments || [],
        children: children || [],
        loc: loc
      };
    };

    _proto27.elementModifier = function elementModifier(_ref21) {
      var path = _ref21.path,
          params = _ref21.params,
          hash = _ref21.hash,
          loc = _ref21.loc;
      return {
        type: 'ElementModifierStatement',
        path: path,
        params: params,
        hash: hash,
        loc: loc
      };
    };

    _proto27.attr = function attr(_ref22) {
      var name = _ref22.name,
          value = _ref22.value,
          loc = _ref22.loc;
      return {
        type: 'AttrNode',
        name: name,
        value: value,
        loc: loc
      };
    };

    _proto27.text = function text(_ref23) {
      var chars = _ref23.chars,
          loc = _ref23.loc;
      return {
        type: 'TextNode',
        chars: chars,
        loc: loc
      };
    };

    _proto27.sexpr = function sexpr(_ref24) {
      var path = _ref24.path,
          params = _ref24.params,
          hash = _ref24.hash,
          loc = _ref24.loc;
      return {
        type: 'SubExpression',
        path: path,
        params: params,
        hash: hash,
        loc: loc
      };
    };

    _proto27.path = function path(_ref25) {
      var head = _ref25.head,
          tail = _ref25.tail,
          loc = _ref25.loc;

      var _headToString$ = headToString$1(head),
          originalHead = _headToString$.original;

      var original = [].concat(originalHead, tail).join('.');
      return new PathExpressionImplV1(original, head, tail, loc);
    };

    _proto27.head = function head(_head2, loc) {
      if (_head2[0] === '@') {
        return this.atName(_head2, loc);
      } else if (_head2 === 'this') {
        return this.this(loc);
      } else {
        return this.var(_head2, loc);
      }
    };

    _proto27.this = function _this(loc) {
      return {
        type: 'ThisHead',
        loc: loc
      };
    };

    _proto27.atName = function atName(name, loc) {
      return {
        type: 'AtHead',
        name: name,
        loc: loc
      };
    };

    _proto27.var = function _var(name, loc) {
      return {
        type: 'VarHead',
        name: name,
        loc: loc
      };
    };

    _proto27.hash = function hash(pairs, loc) {
      return {
        type: 'Hash',
        pairs: pairs || [],
        loc: loc
      };
    };

    _proto27.pair = function pair(_ref26) {
      var key = _ref26.key,
          value = _ref26.value,
          loc = _ref26.loc;
      return {
        type: 'HashPair',
        key: key,
        value: value,
        loc: loc
      };
    };

    _proto27.literal = function literal(_ref27) {
      var type = _ref27.type,
          value = _ref27.value,
          loc = _ref27.loc;
      return {
        type: type,
        value: value,
        original: value,
        loc: loc
      };
    };

    _proto27.undefined = function (_undefined2) {
      function undefined() {
        return _undefined2.apply(this, arguments);
      }

      undefined.toString = function () {
        return _undefined2.toString();
      };

      return undefined;
    }(function () {
      return this.literal({
        type: 'UndefinedLiteral',
        value: undefined
      });
    });

    _proto27.null = function _null() {
      return this.literal({
        type: 'NullLiteral',
        value: null
      });
    };

    _proto27.string = function string(value, loc) {
      return this.literal({
        type: 'StringLiteral',
        value: value,
        loc: loc
      });
    };

    _proto27.boolean = function boolean(value, loc) {
      return this.literal({
        type: 'BooleanLiteral',
        value: value,
        loc: loc
      });
    };

    _proto27.number = function number(value, loc) {
      return this.literal({
        type: 'NumberLiteral',
        value: value,
        loc: loc
      });
    };

    return Builders;
  }(); // Expressions


  function headToString$1(head) {
    switch (head.type) {
      case 'AtHead':
        return {
          original: head.name,
          parts: [head.name]
        };

      case 'ThisHead':
        return {
          original: "this",
          parts: []
        };

      case 'VarHead':
        return {
          original: head.name,
          parts: [head.name]
        };
    }
  }

  var b = new Builders();

  var Parser = /*#__PURE__*/function () {
    function Parser(source, entityParser, mode) {
      if (entityParser === void 0) {
        entityParser = new _simpleHtmlTokenizer.EntityParser(_simpleHtmlTokenizer.HTML5NamedCharRefs);
      }

      if (mode === void 0) {
        mode = 'precompile';
      }

      this.elementStack = [];
      this.currentAttribute = null;
      this.currentNode = null;
      this.source = source;
      this.lines = source.source.split(/(?:\r\n?|\n)/g);
      this.tokenizer = new _simpleHtmlTokenizer.EventedTokenizer(this, entityParser, mode);
    }

    var _proto28 = Parser.prototype;

    _proto28.offset = function offset() {
      var _this$tokenizer = this.tokenizer,
          line = _this$tokenizer.line,
          column = _this$tokenizer.column;
      return this.source.offsetFor(line, column);
    };

    _proto28.pos = function pos(_ref28) {
      var line = _ref28.line,
          column = _ref28.column;
      return this.source.offsetFor(line, column);
    };

    _proto28.finish = function finish(node) {
      return (0, _util.assign)({}, node, {
        loc: node.loc.until(this.offset())
      }); // node.loc = node.loc.withEnd(end);
    };

    _proto28.acceptTemplate = function acceptTemplate(node) {
      return this[node.type](node);
    };

    _proto28.acceptNode = function acceptNode(node) {
      return this[node.type](node);
    };

    _proto28.currentElement = function currentElement() {
      return this.elementStack[this.elementStack.length - 1];
    };

    _proto28.sourceForNode = function sourceForNode(node, endNode) {
      var firstLine = node.loc.start.line - 1;
      var currentLine = firstLine - 1;
      var firstColumn = node.loc.start.column;
      var string = [];
      var line;
      var lastLine;
      var lastColumn;

      if (endNode) {
        lastLine = endNode.loc.end.line - 1;
        lastColumn = endNode.loc.end.column;
      } else {
        lastLine = node.loc.end.line - 1;
        lastColumn = node.loc.end.column;
      }

      while (currentLine < lastLine) {
        currentLine++;
        line = this.lines[currentLine];

        if (currentLine === firstLine) {
          if (firstLine === lastLine) {
            string.push(line.slice(firstColumn, lastColumn));
          } else {
            string.push(line.slice(firstColumn));
          }
        } else if (currentLine === lastLine) {
          string.push(line.slice(0, lastColumn));
        } else {
          string.push(line);
        }
      }

      return string.join('\n');
    };

    (0, _emberBabel.createClass)(Parser, [{
      key: "currentAttr",
      get: function get() {
        return this.currentAttribute;
      }
    }, {
      key: "currentTag",
      get: function get() {
        var node = this.currentNode;
        return node;
      }
    }, {
      key: "currentStartTag",
      get: function get() {
        var node = this.currentNode;
        return node;
      }
    }, {
      key: "currentEndTag",
      get: function get() {
        var node = this.currentNode;
        return node;
      }
    }, {
      key: "currentComment",
      get: function get() {
        var node = this.currentNode;
        return node;
      }
    }, {
      key: "currentData",
      get: function get() {
        var node = this.currentNode;
        return node;
      }
    }]);
    return Parser;
  }();

  var HandlebarsNodeVisitors = /*#__PURE__*/function (_Parser) {
    (0, _emberBabel.inheritsLoose)(HandlebarsNodeVisitors, _Parser);

    function HandlebarsNodeVisitors() {
      return _Parser.apply(this, arguments) || this;
    }

    var _proto29 = HandlebarsNodeVisitors.prototype;

    _proto29.Program = function Program(program) {
      var body = [];
      var node;

      if (this.isTopLevel) {
        node = b.template({
          body: body,
          blockParams: program.blockParams,
          loc: this.source.spanFor(program.loc)
        });
      } else {
        node = b.blockItself({
          body: body,
          blockParams: program.blockParams,
          chained: program.chained,
          loc: this.source.spanFor(program.loc)
        });
      }

      var i,
          l = program.body.length;
      this.elementStack.push(node);

      if (l === 0) {
        return this.elementStack.pop();
      }

      for (i = 0; i < l; i++) {
        this.acceptNode(program.body[i]);
      } // Ensure that that the element stack is balanced properly.


      var poppedNode = this.elementStack.pop();

      if (poppedNode !== node) {
        var elementNode = poppedNode;
        throw generateSyntaxError("Unclosed element `" + elementNode.tag + "`", elementNode.loc);
      }

      return node;
    };

    _proto29.BlockStatement = function BlockStatement(block) {
      if (this.tokenizer.state === "comment"
      /* comment */
      ) {
          this.appendToCommentData(this.sourceForNode(block));
          return;
        }

      if (this.tokenizer.state !== "data"
      /* data */
      && this.tokenizer.state !== "beforeData"
      /* beforeData */
      ) {
          throw generateSyntaxError('A block may only be used inside an HTML element or another block.', this.source.spanFor(block.loc));
        }

      var _acceptCallNodes = acceptCallNodes(this, block),
          path = _acceptCallNodes.path,
          params = _acceptCallNodes.params,
          hash = _acceptCallNodes.hash; // These are bugs in Handlebars upstream


      if (!block.program.loc) {
        block.program.loc = NON_EXISTENT_LOCATION;
      }

      if (block.inverse && !block.inverse.loc) {
        block.inverse.loc = NON_EXISTENT_LOCATION;
      }

      var program = this.Program(block.program);
      var inverse = block.inverse ? this.Program(block.inverse) : null;
      var node = b.block({
        path: path,
        params: params,
        hash: hash,
        defaultBlock: program,
        elseBlock: inverse,
        loc: this.source.spanFor(block.loc),
        openStrip: block.openStrip,
        inverseStrip: block.inverseStrip,
        closeStrip: block.closeStrip
      });
      var parentProgram = this.currentElement();
      appendChild(parentProgram, node);
    };

    _proto29.MustacheStatement = function MustacheStatement(rawMustache) {
      var tokenizer = this.tokenizer;

      if (tokenizer.state === 'comment') {
        this.appendToCommentData(this.sourceForNode(rawMustache));
        return;
      }

      var mustache;
      var escaped = rawMustache.escaped,
          loc = rawMustache.loc,
          strip = rawMustache.strip;

      if (isHBSLiteral(rawMustache.path)) {
        mustache = b.mustache({
          path: this.acceptNode(rawMustache.path),
          params: [],
          hash: b.hash([], this.source.spanFor(rawMustache.path.loc).collapse('end')),
          trusting: !escaped,
          loc: this.source.spanFor(loc),
          strip: strip
        });
      } else {
        var _acceptCallNodes2 = acceptCallNodes(this, rawMustache),
            path = _acceptCallNodes2.path,
            params = _acceptCallNodes2.params,
            hash = _acceptCallNodes2.hash;

        mustache = b.mustache({
          path: path,
          params: params,
          hash: hash,
          trusting: !escaped,
          loc: this.source.spanFor(loc),
          strip: strip
        });
      }

      switch (tokenizer.state) {
        // Tag helpers
        case "tagOpen"
        /* tagOpen */
        :
        case "tagName"
        /* tagName */
        :
          throw generateSyntaxError("Cannot use mustaches in an elements tagname", mustache.loc);

        case "beforeAttributeName"
        /* beforeAttributeName */
        :
          addElementModifier(this.currentStartTag, mustache);
          break;

        case "attributeName"
        /* attributeName */
        :
        case "afterAttributeName"
        /* afterAttributeName */
        :
          this.beginAttributeValue(false);
          this.finishAttributeValue();
          addElementModifier(this.currentStartTag, mustache);
          tokenizer.transitionTo("beforeAttributeName"
          /* beforeAttributeName */
          );
          break;

        case "afterAttributeValueQuoted"
        /* afterAttributeValueQuoted */
        :
          addElementModifier(this.currentStartTag, mustache);
          tokenizer.transitionTo("beforeAttributeName"
          /* beforeAttributeName */
          );
          break;
        // Attribute values

        case "beforeAttributeValue"
        /* beforeAttributeValue */
        :
          this.beginAttributeValue(false);
          this.appendDynamicAttributeValuePart(mustache);
          tokenizer.transitionTo("attributeValueUnquoted"
          /* attributeValueUnquoted */
          );
          break;

        case "attributeValueDoubleQuoted"
        /* attributeValueDoubleQuoted */
        :
        case "attributeValueSingleQuoted"
        /* attributeValueSingleQuoted */
        :
        case "attributeValueUnquoted"
        /* attributeValueUnquoted */
        :
          this.appendDynamicAttributeValuePart(mustache);
          break;
        // TODO: Only append child when the tokenizer state makes
        // sense to do so, otherwise throw an error.

        default:
          appendChild(this.currentElement(), mustache);
      }

      return mustache;
    };

    _proto29.appendDynamicAttributeValuePart = function appendDynamicAttributeValuePart(part) {
      this.finalizeTextPart();
      var attr = this.currentAttr;
      attr.isDynamic = true;
      attr.parts.push(part);
    };

    _proto29.finalizeTextPart = function finalizeTextPart() {
      var attr = this.currentAttr;
      var text = attr.currentPart;

      if (text !== null) {
        this.currentAttr.parts.push(text);
        this.startTextPart();
      }
    };

    _proto29.startTextPart = function startTextPart() {
      this.currentAttr.currentPart = null;
    };

    _proto29.ContentStatement = function ContentStatement(content) {
      updateTokenizerLocation(this.tokenizer, content);
      this.tokenizer.tokenizePart(content.value);
      this.tokenizer.flushData();
    };

    _proto29.CommentStatement = function CommentStatement(rawComment) {
      var tokenizer = this.tokenizer;

      if (tokenizer.state === "comment"
      /* comment */
      ) {
          this.appendToCommentData(this.sourceForNode(rawComment));
          return null;
        }

      var value = rawComment.value,
          loc = rawComment.loc;
      var comment = b.mustacheComment(value, this.source.spanFor(loc));

      switch (tokenizer.state) {
        case "beforeAttributeName"
        /* beforeAttributeName */
        :
        case "afterAttributeName"
        /* afterAttributeName */
        :
          this.currentStartTag.comments.push(comment);
          break;

        case "beforeData"
        /* beforeData */
        :
        case "data"
        /* data */
        :
          appendChild(this.currentElement(), comment);
          break;

        default:
          throw generateSyntaxError("Using a Handlebars comment when in the `" + tokenizer['state'] + "` state is not supported", this.source.spanFor(rawComment.loc));
      }

      return comment;
    };

    _proto29.PartialStatement = function PartialStatement(partial) {
      throw generateSyntaxError("Handlebars partials are not supported", this.source.spanFor(partial.loc));
    };

    _proto29.PartialBlockStatement = function PartialBlockStatement(partialBlock) {
      throw generateSyntaxError("Handlebars partial blocks are not supported", this.source.spanFor(partialBlock.loc));
    };

    _proto29.Decorator = function Decorator(decorator) {
      throw generateSyntaxError("Handlebars decorators are not supported", this.source.spanFor(decorator.loc));
    };

    _proto29.DecoratorBlock = function DecoratorBlock(decoratorBlock) {
      throw generateSyntaxError("Handlebars decorator blocks are not supported", this.source.spanFor(decoratorBlock.loc));
    };

    _proto29.SubExpression = function SubExpression(sexpr) {
      var _acceptCallNodes3 = acceptCallNodes(this, sexpr),
          path = _acceptCallNodes3.path,
          params = _acceptCallNodes3.params,
          hash = _acceptCallNodes3.hash;

      return b.sexpr({
        path: path,
        params: params,
        hash: hash,
        loc: this.source.spanFor(sexpr.loc)
      });
    };

    _proto29.PathExpression = function PathExpression(path) {
      var original = path.original;
      var parts;

      if (original.indexOf('/') !== -1) {
        if (original.slice(0, 2) === './') {
          throw generateSyntaxError("Using \"./\" is not supported in Glimmer and unnecessary", this.source.spanFor(path.loc));
        }

        if (original.slice(0, 3) === '../') {
          throw generateSyntaxError("Changing context using \"../\" is not supported in Glimmer", this.source.spanFor(path.loc));
        }

        if (original.indexOf('.') !== -1) {
          throw generateSyntaxError("Mixing '.' and '/' in paths is not supported in Glimmer; use only '.' to separate property paths", this.source.spanFor(path.loc));
        }

        parts = [path.parts.join('/')];
      } else if (original === '.') {
        throw generateSyntaxError("'.' is not a supported path in Glimmer; check for a path with a trailing '.'", this.source.spanFor(path.loc));
      } else {
        parts = path.parts;
      }

      var thisHead = false; // This is to fix a bug in the Handlebars AST where the path expressions in
      // `{{this.foo}}` (and similarly `{{foo-bar this.foo named=this.foo}}` etc)
      // are simply turned into `{{foo}}`. The fix is to push it back onto the
      // parts array and let the runtime see the difference. However, we cannot
      // simply use the string `this` as it means literally the property called
      // "this" in the current context (it can be expressed in the syntax as
      // `{{[this]}}`, where the square bracket are generally for this kind of
      // escaping – such as `{{foo.["bar.baz"]}}` would mean lookup a property
      // named literally "bar.baz" on `this.foo`). By convention, we use `null`
      // for this purpose.

      if (original.match(/^this(\..+)?$/)) {
        thisHead = true;
      }

      var pathHead;

      if (thisHead) {
        pathHead = {
          type: 'ThisHead',
          loc: {
            start: path.loc.start,
            end: {
              line: path.loc.start.line,
              column: path.loc.start.column + 4
            }
          }
        };
      } else if (path.data) {
        var head = parts.shift();

        if (head === undefined) {
          throw generateSyntaxError("Attempted to parse a path expression, but it was not valid. Paths beginning with @ must start with a-z.", this.source.spanFor(path.loc));
        }

        pathHead = {
          type: 'AtHead',
          name: "@" + head,
          loc: {
            start: path.loc.start,
            end: {
              line: path.loc.start.line,
              column: path.loc.start.column + head.length + 1
            }
          }
        };
      } else {
        var _head3 = parts.shift();

        if (_head3 === undefined) {
          throw generateSyntaxError("Attempted to parse a path expression, but it was not valid. Paths must start with a-z or A-Z.", this.source.spanFor(path.loc));
        }

        pathHead = {
          type: 'VarHead',
          name: _head3,
          loc: {
            start: path.loc.start,
            end: {
              line: path.loc.start.line,
              column: path.loc.start.column + _head3.length
            }
          }
        };
      }

      return new PathExpressionImplV1(path.original, pathHead, parts, this.source.spanFor(path.loc));
    };

    _proto29.Hash = function Hash(hash) {
      var pairs = [];

      for (var i = 0; i < hash.pairs.length; i++) {
        var pair = hash.pairs[i];
        pairs.push(b.pair({
          key: pair.key,
          value: this.acceptNode(pair.value),
          loc: this.source.spanFor(pair.loc)
        }));
      }

      return b.hash(pairs, this.source.spanFor(hash.loc));
    };

    _proto29.StringLiteral = function StringLiteral(string) {
      return b.literal({
        type: 'StringLiteral',
        value: string.value,
        loc: string.loc
      });
    };

    _proto29.BooleanLiteral = function BooleanLiteral(boolean) {
      return b.literal({
        type: 'BooleanLiteral',
        value: boolean.value,
        loc: boolean.loc
      });
    };

    _proto29.NumberLiteral = function NumberLiteral(number) {
      return b.literal({
        type: 'NumberLiteral',
        value: number.value,
        loc: number.loc
      });
    };

    _proto29.UndefinedLiteral = function UndefinedLiteral(undef) {
      return b.literal({
        type: 'UndefinedLiteral',
        value: undefined,
        loc: undef.loc
      });
    };

    _proto29.NullLiteral = function NullLiteral(nul) {
      return b.literal({
        type: 'NullLiteral',
        value: null,
        loc: nul.loc
      });
    };

    (0, _emberBabel.createClass)(HandlebarsNodeVisitors, [{
      key: "isTopLevel",
      get: function get() {
        return this.elementStack.length === 0;
      }
    }]);
    return HandlebarsNodeVisitors;
  }(Parser);

  function calculateRightStrippedOffsets(original, value) {
    if (value === '') {
      // if it is empty, just return the count of newlines
      // in original
      return {
        lines: original.split('\n').length - 1,
        columns: 0
      };
    } // otherwise, return the number of newlines prior to
    // `value`


    var difference = original.split(value)[0];
    var lines = difference.split(/\n/);
    var lineCount = lines.length - 1;
    return {
      lines: lineCount,
      columns: lines[lineCount].length
    };
  }

  function updateTokenizerLocation(tokenizer, content) {
    var line = content.loc.start.line;
    var column = content.loc.start.column;
    var offsets = calculateRightStrippedOffsets(content.original, content.value);
    line = line + offsets.lines;

    if (offsets.lines) {
      column = offsets.columns;
    } else {
      column = column + offsets.columns;
    }

    tokenizer.line = line;
    tokenizer.column = column;
  }

  function acceptCallNodes(compiler, node) {
    var path = node.path.type === 'PathExpression' ? compiler.PathExpression(node.path) : compiler.SubExpression(node.path);
    var params = node.params ? node.params.map(function (e) {
      return compiler.acceptNode(e);
    }) : []; // if there is no hash, position it as a collapsed node immediately after the last param (or the
    // path, if there are also no params)

    var end = params.length > 0 ? params[params.length - 1].loc : path.loc;
    var hash = node.hash ? compiler.Hash(node.hash) : {
      type: 'Hash',
      pairs: [],
      loc: compiler.source.spanFor(end).collapse('end')
    };
    return {
      path: path,
      params: params,
      hash: hash
    };
  }

  function addElementModifier(element, mustache) {
    var path = mustache.path,
        params = mustache.params,
        hash = mustache.hash,
        loc = mustache.loc;

    if (isHBSLiteral(path)) {
      var _modifier = "{{" + printLiteral(path) + "}}";

      var tag = "<" + element.name + " ... " + _modifier + " ...";
      throw generateSyntaxError("In " + tag + ", " + _modifier + " is not a valid modifier", mustache.loc);
    }

    var modifier = b.elementModifier({
      path: path,
      params: params,
      hash: hash,
      loc: loc
    });
    element.modifiers.push(modifier);
  }

  var TokenizerEventHandlers = /*#__PURE__*/function (_HandlebarsNodeVisito) {
    (0, _emberBabel.inheritsLoose)(TokenizerEventHandlers, _HandlebarsNodeVisito);

    function TokenizerEventHandlers() {
      var _this7;

      _this7 = _HandlebarsNodeVisito.apply(this, arguments) || this;
      _this7.tagOpenLine = 0;
      _this7.tagOpenColumn = 0;
      return _this7;
    }

    var _proto30 = TokenizerEventHandlers.prototype;

    _proto30.reset = function reset() {
      this.currentNode = null;
    } // Comment
    ;

    _proto30.beginComment = function beginComment() {
      this.currentNode = b.comment('', this.source.offsetFor(this.tagOpenLine, this.tagOpenColumn));
    };

    _proto30.appendToCommentData = function appendToCommentData(char) {
      this.currentComment.value += char;
    };

    _proto30.finishComment = function finishComment() {
      appendChild(this.currentElement(), this.finish(this.currentComment));
    } // Data
    ;

    _proto30.beginData = function beginData() {
      this.currentNode = b.text({
        chars: '',
        loc: this.offset().collapsed()
      });
    };

    _proto30.appendToData = function appendToData(char) {
      this.currentData.chars += char;
    };

    _proto30.finishData = function finishData() {
      this.currentData.loc = this.currentData.loc.withEnd(this.offset());
      appendChild(this.currentElement(), this.currentData);
    } // Tags - basic
    ;

    _proto30.tagOpen = function tagOpen() {
      this.tagOpenLine = this.tokenizer.line;
      this.tagOpenColumn = this.tokenizer.column;
    };

    _proto30.beginStartTag = function beginStartTag() {
      this.currentNode = {
        type: 'StartTag',
        name: '',
        attributes: [],
        modifiers: [],
        comments: [],
        selfClosing: false,
        loc: this.source.offsetFor(this.tagOpenLine, this.tagOpenColumn)
      };
    };

    _proto30.beginEndTag = function beginEndTag() {
      this.currentNode = {
        type: 'EndTag',
        name: '',
        attributes: [],
        modifiers: [],
        comments: [],
        selfClosing: false,
        loc: this.source.offsetFor(this.tagOpenLine, this.tagOpenColumn)
      };
    };

    _proto30.finishTag = function finishTag() {
      var tag = this.finish(this.currentTag);

      if (tag.type === 'StartTag') {
        this.finishStartTag();

        if (tag.name === ':') {
          throw generateSyntaxError('Invalid named block named detected, you may have created a named block without a name, or you may have began your name with a number. Named blocks must have names that are at least one character long, and begin with a lower case letter', this.source.spanFor({
            start: this.currentTag.loc.toJSON(),
            end: this.offset().toJSON()
          }));
        }

        if (voidMap[tag.name] || tag.selfClosing) {
          this.finishEndTag(true);
        }
      } else if (tag.type === 'EndTag') {
        this.finishEndTag(false);
      }
    };

    _proto30.finishStartTag = function finishStartTag() {
      var _this$finish = this.finish(this.currentStartTag),
          name = _this$finish.name,
          attrs = _this$finish.attributes,
          modifiers = _this$finish.modifiers,
          comments = _this$finish.comments,
          selfClosing = _this$finish.selfClosing,
          loc = _this$finish.loc;

      var element = b.element({
        tag: name,
        selfClosing: selfClosing,
        attrs: attrs,
        modifiers: modifiers,
        comments: comments,
        children: [],
        blockParams: [],
        loc: loc
      });
      this.elementStack.push(element);
    };

    _proto30.finishEndTag = function finishEndTag(isVoid) {
      var tag = this.finish(this.currentTag);
      var element = this.elementStack.pop();
      var parent = this.currentElement();
      this.validateEndTag(tag, element, isVoid);
      element.loc = element.loc.withEnd(this.offset());
      parseElementBlockParams(element);
      appendChild(parent, element);
    };

    _proto30.markTagAsSelfClosing = function markTagAsSelfClosing() {
      this.currentTag.selfClosing = true;
    } // Tags - name
    ;

    _proto30.appendToTagName = function appendToTagName(char) {
      this.currentTag.name += char;
    } // Tags - attributes
    ;

    _proto30.beginAttribute = function beginAttribute() {
      var offset = this.offset();
      this.currentAttribute = {
        name: '',
        parts: [],
        currentPart: null,
        isQuoted: false,
        isDynamic: false,
        start: offset,
        valueSpan: offset.collapsed()
      };
    };

    _proto30.appendToAttributeName = function appendToAttributeName(char) {
      this.currentAttr.name += char;
    };

    _proto30.beginAttributeValue = function beginAttributeValue(isQuoted) {
      this.currentAttr.isQuoted = isQuoted;
      this.startTextPart();
      this.currentAttr.valueSpan = this.offset().collapsed();
    };

    _proto30.appendToAttributeValue = function appendToAttributeValue(char) {
      var parts = this.currentAttr.parts;
      var lastPart = parts[parts.length - 1];
      var current = this.currentAttr.currentPart;

      if (current) {
        current.chars += char; // update end location for each added char

        current.loc = current.loc.withEnd(this.offset());
      } else {
        // initially assume the text node is a single char
        var _loc2 = this.offset(); // the tokenizer line/column have already been advanced, correct location info


        if (char === '\n') {
          _loc2 = lastPart ? lastPart.loc.getEnd() : this.currentAttr.valueSpan.getStart();
        } else {
          _loc2 = _loc2.move(-1);
        }

        this.currentAttr.currentPart = b.text({
          chars: char,
          loc: _loc2.collapsed()
        });
      }
    };

    _proto30.finishAttributeValue = function finishAttributeValue() {
      this.finalizeTextPart();
      var tag = this.currentTag;
      var tokenizerPos = this.offset();

      if (tag.type === 'EndTag') {
        throw generateSyntaxError("Invalid end tag: closing tag must not have attributes", this.source.spanFor({
          start: tag.loc.toJSON(),
          end: tokenizerPos.toJSON()
        }));
      }

      var _this$currentAttr = this.currentAttr,
          name = _this$currentAttr.name,
          parts = _this$currentAttr.parts,
          start = _this$currentAttr.start,
          isQuoted = _this$currentAttr.isQuoted,
          isDynamic = _this$currentAttr.isDynamic,
          valueSpan = _this$currentAttr.valueSpan;
      var value = this.assembleAttributeValue(parts, isQuoted, isDynamic, start.until(tokenizerPos));
      value.loc = valueSpan.withEnd(tokenizerPos);
      var attribute = b.attr({
        name: name,
        value: value,
        loc: start.until(tokenizerPos)
      });
      this.currentStartTag.attributes.push(attribute);
    };

    _proto30.reportSyntaxError = function reportSyntaxError(message) {
      throw generateSyntaxError(message, this.offset().collapsed());
    };

    _proto30.assembleConcatenatedValue = function assembleConcatenatedValue(parts) {
      for (var i = 0; i < parts.length; i++) {
        var part = parts[i];

        if (part.type !== 'MustacheStatement' && part.type !== 'TextNode') {
          throw generateSyntaxError('Unsupported node in quoted attribute value: ' + part['type'], part.loc);
        }
      }

      (0, _util.assertPresent)(parts, "the concatenation parts of an element should not be empty");
      var first = parts[0];
      var last = parts[parts.length - 1];
      return b.concat(parts, this.source.spanFor(first.loc).extend(this.source.spanFor(last.loc)));
    };

    _proto30.validateEndTag = function validateEndTag(tag, element, selfClosing) {
      var error;

      if (voidMap[tag.name] && !selfClosing) {
        // EngTag is also called by StartTag for void and self-closing tags (i.e.
        // <input> or <br />, so we need to check for that here. Otherwise, we would
        // throw an error for those cases.
        error = "<" + tag.name + "> elements do not need end tags. You should remove it";
      } else if (element.tag === undefined) {
        error = "Closing tag </" + tag.name + "> without an open tag";
      } else if (element.tag !== tag.name) {
        error = "Closing tag </" + tag.name + "> did not match last open tag <" + element.tag + "> (on line " + element.loc.startPosition.line + ")";
      }

      if (error) {
        throw generateSyntaxError(error, tag.loc);
      }
    };

    _proto30.assembleAttributeValue = function assembleAttributeValue(parts, isQuoted, isDynamic, span) {
      if (isDynamic) {
        if (isQuoted) {
          return this.assembleConcatenatedValue(parts);
        } else {
          if (parts.length === 1 || parts.length === 2 && parts[1].type === 'TextNode' && parts[1].chars === '/') {
            return parts[0];
          } else {
            throw generateSyntaxError("An unquoted attribute value must be a string or a mustache, " + "preceded by whitespace or a '=' character, and " + "followed by whitespace, a '>' character, or '/>'", span);
          }
        }
      } else {
        return parts.length > 0 ? parts[0] : b.text({
          chars: '',
          loc: span
        });
      }
    };

    return TokenizerEventHandlers;
  }(HandlebarsNodeVisitors);

  var syntax = {
    parse: preprocess,
    builders: publicBuilder,
    print: build,
    traverse: traverse,
    Walker: Walker
  };

  var CodemodEntityParser = /*#__PURE__*/function (_EntityParser) {
    (0, _emberBabel.inheritsLoose)(CodemodEntityParser, _EntityParser);

    // match upstream types, but never match an entity
    function CodemodEntityParser() {
      return _EntityParser.call(this, {}) || this;
    }

    var _proto31 = CodemodEntityParser.prototype;

    _proto31.parse = function parse() {
      return undefined;
    };

    return CodemodEntityParser;
  }(_simpleHtmlTokenizer.EntityParser);

  function preprocess(input, options) {
    if (options === void 0) {
      options = {};
    }

    var _a, _b, _c;

    var mode = options.mode || 'precompile';
    var source;
    var ast;

    if (typeof input === 'string') {
      source = new Source(input, (_a = options.meta) === null || _a === void 0 ? void 0 : _a.moduleName);

      if (mode === 'codemod') {
        ast = (0, _parser.parseWithoutProcessing)(input, options.parseOptions);
      } else {
        ast = (0, _parser.parse)(input, options.parseOptions);
      }
    } else if (input instanceof Source) {
      source = input;

      if (mode === 'codemod') {
        ast = (0, _parser.parseWithoutProcessing)(input.source, options.parseOptions);
      } else {
        ast = (0, _parser.parse)(input.source, options.parseOptions);
      }
    } else {
      source = new Source('', (_b = options.meta) === null || _b === void 0 ? void 0 : _b.moduleName);
      ast = input;
    }

    var entityParser = undefined;

    if (mode === 'codemod') {
      entityParser = new CodemodEntityParser();
    }

    var offsets = SourceSpan.forCharPositions(source, 0, source.source.length);
    ast.loc = {
      source: '(program)',
      start: offsets.startPosition,
      end: offsets.endPosition
    };
    var program = new TokenizerEventHandlers(source, entityParser, mode).acceptTemplate(ast);

    if (options.strictMode) {
      program.blockParams = (_c = options.locals) !== null && _c !== void 0 ? _c : [];
    }

    if (options && options.plugins && options.plugins.ast) {
      for (var i = 0, l = options.plugins.ast.length; i < l; i++) {
        var transform = options.plugins.ast[i];
        var env = (0, _util.assign)({}, options, {
          syntax: syntax
        }, {
          plugins: undefined
        });
        var pluginResult = transform(env);
        traverse(program, pluginResult.visitor);
      }
    }

    return program;
  }

  var SymbolTable = /*#__PURE__*/function () {
    function SymbolTable() {}

    SymbolTable.top = function top(locals, customizeComponentName) {
      return new ProgramSymbolTable(locals, customizeComponentName);
    };

    var _proto32 = SymbolTable.prototype;

    _proto32.child = function child(locals) {
      var _this8 = this;

      var symbols = locals.map(function (name) {
        return _this8.allocate(name);
      });
      return new BlockSymbolTable(this, locals, symbols);
    };

    return SymbolTable;
  }();

  _exports.SymbolTable = SymbolTable;

  var ProgramSymbolTable = /*#__PURE__*/function (_SymbolTable) {
    (0, _emberBabel.inheritsLoose)(ProgramSymbolTable, _SymbolTable);

    function ProgramSymbolTable(templateLocals, customizeComponentName) {
      var _this9;

      _this9 = _SymbolTable.call(this) || this;
      _this9.templateLocals = templateLocals;
      _this9.customizeComponentName = customizeComponentName;
      _this9.symbols = [];
      _this9.upvars = [];
      _this9.size = 1;
      _this9.named = (0, _util.dict)();
      _this9.blocks = (0, _util.dict)();
      _this9.usedTemplateLocals = [];
      _this9._hasEval = false;
      return _this9;
    }

    var _proto33 = ProgramSymbolTable.prototype;

    _proto33.getUsedTemplateLocals = function getUsedTemplateLocals() {
      return this.usedTemplateLocals;
    };

    _proto33.setHasEval = function setHasEval() {
      this._hasEval = true;
    };

    _proto33.has = function has(name) {
      return this.templateLocals.indexOf(name) !== -1;
    };

    _proto33.get = function get(name) {
      var index = this.usedTemplateLocals.indexOf(name);

      if (index !== -1) {
        return [index, true];
      }

      index = this.usedTemplateLocals.length;
      this.usedTemplateLocals.push(name);
      return [index, true];
    };

    _proto33.getLocalsMap = function getLocalsMap() {
      return (0, _util.dict)();
    };

    _proto33.getEvalInfo = function getEvalInfo() {
      var locals = this.getLocalsMap();
      return Object.keys(locals).map(function (symbol) {
        return locals[symbol];
      });
    };

    _proto33.allocateFree = function allocateFree(name, resolution) {
      // If the name in question is an uppercase (i.e. angle-bracket) component invocation, run
      // the optional `customizeComponentName` function provided to the precompiler.
      if (resolution.resolution() === 39
      /* GetFreeAsComponentHead */
      && resolution.isAngleBracket && isUpperCase(name)) {
        name = this.customizeComponentName(name);
      }

      var index = this.upvars.indexOf(name);

      if (index !== -1) {
        return index;
      }

      index = this.upvars.length;
      this.upvars.push(name);
      return index;
    };

    _proto33.allocateNamed = function allocateNamed(name) {
      var named = this.named[name];

      if (!named) {
        named = this.named[name] = this.allocate(name);
      }

      return named;
    };

    _proto33.allocateBlock = function allocateBlock(name) {
      if (name === 'inverse') {
        name = 'else';
      }

      var block = this.blocks[name];

      if (!block) {
        block = this.blocks[name] = this.allocate("&" + name);
      }

      return block;
    };

    _proto33.allocate = function allocate(identifier) {
      this.symbols.push(identifier);
      return this.size++;
    };

    (0, _emberBabel.createClass)(ProgramSymbolTable, [{
      key: "hasEval",
      get: function get() {
        return this._hasEval;
      }
    }]);
    return ProgramSymbolTable;
  }(SymbolTable);

  _exports.ProgramSymbolTable = ProgramSymbolTable;

  var BlockSymbolTable = /*#__PURE__*/function (_SymbolTable2) {
    (0, _emberBabel.inheritsLoose)(BlockSymbolTable, _SymbolTable2);

    function BlockSymbolTable(parent, symbols, slots) {
      var _this10;

      _this10 = _SymbolTable2.call(this) || this;
      _this10.parent = parent;
      _this10.symbols = symbols;
      _this10.slots = slots;
      return _this10;
    }

    var _proto34 = BlockSymbolTable.prototype;

    _proto34.has = function has(name) {
      return this.symbols.indexOf(name) !== -1 || this.parent.has(name);
    };

    _proto34.get = function get(name) {
      var slot = this.symbols.indexOf(name);
      return slot === -1 ? this.parent.get(name) : [this.slots[slot], false];
    };

    _proto34.getLocalsMap = function getLocalsMap() {
      var _this11 = this;

      var dict$$1 = this.parent.getLocalsMap();
      this.symbols.forEach(function (symbol) {
        return dict$$1[symbol] = _this11.get(symbol)[0];
      });
      return dict$$1;
    };

    _proto34.getEvalInfo = function getEvalInfo() {
      var locals = this.getLocalsMap();
      return Object.keys(locals).map(function (symbol) {
        return locals[symbol];
      });
    };

    _proto34.setHasEval = function setHasEval() {
      this.parent.setHasEval();
    };

    _proto34.allocateFree = function allocateFree(name, resolution) {
      return this.parent.allocateFree(name, resolution);
    };

    _proto34.allocateNamed = function allocateNamed(name) {
      return this.parent.allocateNamed(name);
    };

    _proto34.allocateBlock = function allocateBlock(name) {
      return this.parent.allocateBlock(name);
    };

    _proto34.allocate = function allocate(identifier) {
      return this.parent.allocate(identifier);
    };

    (0, _emberBabel.createClass)(BlockSymbolTable, [{
      key: "locals",
      get: function get() {
        return this.symbols;
      }
    }]);
    return BlockSymbolTable;
  }(SymbolTable);

  _exports.BlockSymbolTable = BlockSymbolTable;

  var __rest = undefined && undefined.__rest || function (s, e) {
    var t = {};

    for (var p in s) {
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    }

    if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
    }
    return t;
  };

  var Builder = /*#__PURE__*/function () {
    function Builder() {}

    var _proto35 = Builder.prototype;

    // TEMPLATE //
    _proto35.template = function template(symbols, body, loc$$1) {
      return new Template({
        table: symbols,
        body: body,
        loc: loc$$1
      });
    } // INTERNAL (these nodes cannot be reached when doing general-purpose visiting) //
    ;

    _proto35.block = function block(symbols, body, loc$$1) {
      return new Block({
        scope: symbols,
        body: body,
        loc: loc$$1
      });
    };

    _proto35.namedBlock = function namedBlock(name, block, loc$$1) {
      return new NamedBlock({
        name: name,
        block: block,
        attrs: [],
        componentArgs: [],
        modifiers: [],
        loc: loc$$1
      });
    };

    _proto35.simpleNamedBlock = function simpleNamedBlock(name, block, loc$$1) {
      return new BuildElement({
        selfClosing: false,
        attrs: [],
        componentArgs: [],
        modifiers: [],
        comments: []
      }).named(name, block, loc$$1);
    };

    _proto35.slice = function slice(chars, loc$$1) {
      return new SourceSlice({
        loc: loc$$1,
        chars: chars
      });
    };

    _proto35.args = function args(positional, named, loc$$1) {
      return new Args({
        loc: loc$$1,
        positional: positional,
        named: named
      });
    };

    _proto35.positional = function positional(exprs, loc$$1) {
      return new PositionalArguments({
        loc: loc$$1,
        exprs: exprs
      });
    };

    _proto35.namedArgument = function namedArgument(key, value) {
      return new NamedArgument({
        name: key,
        value: value
      });
    };

    _proto35.named = function named(entries, loc$$1) {
      return new NamedArguments({
        loc: loc$$1,
        entries: entries
      });
    };

    _proto35.attr = function attr(_ref29, loc$$1) {
      var name = _ref29.name,
          value = _ref29.value,
          trusting = _ref29.trusting;
      return new HtmlAttr({
        loc: loc$$1,
        name: name,
        value: value,
        trusting: trusting
      });
    };

    _proto35.splatAttr = function splatAttr(symbol, loc$$1) {
      return new SplatAttr({
        symbol: symbol,
        loc: loc$$1
      });
    };

    _proto35.arg = function arg(_ref30, loc$$1) {
      var name = _ref30.name,
          value = _ref30.value,
          trusting = _ref30.trusting;
      return new ComponentArg({
        name: name,
        value: value,
        trusting: trusting,
        loc: loc$$1
      });
    } // EXPRESSIONS //
    ;

    _proto35.path = function path(head, tail, loc$$1) {
      return new PathExpression({
        loc: loc$$1,
        ref: head,
        tail: tail
      });
    };

    _proto35.self = function self(loc$$1) {
      return new ThisReference({
        loc: loc$$1
      });
    };

    _proto35.at = function at(name, symbol, loc$$1) {
      return new ArgReference({
        loc: loc$$1,
        name: new SourceSlice({
          loc: loc$$1,
          chars: name
        }),
        symbol: symbol
      });
    };

    _proto35.freeVar = function freeVar(_ref31) {
      var name = _ref31.name,
          context = _ref31.context,
          symbol = _ref31.symbol,
          loc$$1 = _ref31.loc;
      return new FreeVarReference({
        name: name,
        resolution: context,
        symbol: symbol,
        loc: loc$$1
      });
    };

    _proto35.localVar = function localVar(name, symbol, isTemplateLocal, loc$$1) {
      return new LocalVarReference({
        loc: loc$$1,
        name: name,
        isTemplateLocal: isTemplateLocal,
        symbol: symbol
      });
    };

    _proto35.sexp = function sexp(parts, loc$$1) {
      return new CallExpression({
        loc: loc$$1,
        callee: parts.callee,
        args: parts.args
      });
    };

    _proto35.deprecatedCall = function deprecatedCall(arg, callee, loc$$1) {
      return new DeprecatedCallExpression({
        loc: loc$$1,
        arg: arg,
        callee: callee
      });
    };

    _proto35.interpolate = function interpolate(parts, loc$$1) {
      (0, _util.assertPresent)(parts);
      return new InterpolateExpression({
        loc: loc$$1,
        parts: parts
      });
    };

    _proto35.literal = function literal(value, loc$$1) {
      return new LiteralExpression({
        loc: loc$$1,
        value: value
      });
    } // STATEMENTS //
    ;

    _proto35.append = function append(_ref32, loc$$1) {
      var table = _ref32.table,
          trusting = _ref32.trusting,
          value = _ref32.value;
      return new AppendContent({
        table: table,
        trusting: trusting,
        value: value,
        loc: loc$$1
      });
    };

    _proto35.modifier = function modifier(_ref33, loc$$1) {
      var callee = _ref33.callee,
          args = _ref33.args;
      return new ElementModifier({
        loc: loc$$1,
        callee: callee,
        args: args
      });
    };

    _proto35.namedBlocks = function namedBlocks(blocks, loc$$1) {
      return new NamedBlocks({
        loc: loc$$1,
        blocks: blocks
      });
    };

    _proto35.blockStatement = function blockStatement(_a, loc$$1) {
      var symbols = _a.symbols,
          program = _a.program,
          _a$inverse = _a.inverse,
          inverse = _a$inverse === void 0 ? null : _a$inverse,
          call = __rest(_a, ["symbols", "program", "inverse"]);

      var blocksLoc = program.loc;
      var blocks = [this.namedBlock(SourceSlice.synthetic('default'), program, program.loc)];

      if (inverse) {
        blocksLoc = blocksLoc.extend(inverse.loc);
        blocks.push(this.namedBlock(SourceSlice.synthetic('else'), inverse, inverse.loc));
      }

      return new InvokeBlock({
        loc: loc$$1,
        blocks: this.namedBlocks(blocks, blocksLoc),
        callee: call.callee,
        args: call.args
      });
    };

    _proto35.element = function element(options) {
      return new BuildElement(options);
    };

    return Builder;
  }();

  var BuildElement = /*#__PURE__*/function () {
    function BuildElement(base) {
      this.base = base;
      this.builder = new Builder();
    }

    var _proto36 = BuildElement.prototype;

    _proto36.simple = function simple(tag, body, loc$$1) {
      return new SimpleElement((0, _util.assign)({
        tag: tag,
        body: body,
        componentArgs: [],
        loc: loc$$1
      }, this.base));
    };

    _proto36.named = function named(name, block, loc$$1) {
      return new NamedBlock((0, _util.assign)({
        name: name,
        block: block,
        componentArgs: [],
        loc: loc$$1
      }, this.base));
    };

    _proto36.selfClosingComponent = function selfClosingComponent(callee, loc$$1) {
      return new InvokeComponent((0, _util.assign)({
        loc: loc$$1,
        callee: callee,
        // point the empty named blocks at the `/` self-closing tag
        blocks: new NamedBlocks({
          blocks: [],
          loc: loc$$1.sliceEndChars({
            skipEnd: 1,
            chars: 1
          })
        })
      }, this.base));
    };

    _proto36.componentWithDefaultBlock = function componentWithDefaultBlock(callee, children, symbols, loc$$1) {
      var block = this.builder.block(symbols, children, loc$$1);
      var namedBlock = this.builder.namedBlock(SourceSlice.synthetic('default'), block, loc$$1); // BUILDER.simpleNamedBlock('default', children, symbols, loc);

      return new InvokeComponent((0, _util.assign)({
        loc: loc$$1,
        callee: callee,
        blocks: this.builder.namedBlocks([namedBlock], namedBlock.loc)
      }, this.base));
    };

    _proto36.componentWithNamedBlocks = function componentWithNamedBlocks(callee, blocks, loc$$1) {
      return new InvokeComponent((0, _util.assign)({
        loc: loc$$1,
        callee: callee,
        blocks: this.builder.namedBlocks(blocks, SpanList.range(blocks))
      }, this.base));
    };

    return BuildElement;
  }();

  function SexpSyntaxContext(node$$1) {
    if (isSimpleCallee(node$$1)) {
      return LooseModeResolution.namespaced("Helper"
      /* Helper */
      );
    } else {
      return null;
    }
  }

  function ModifierSyntaxContext(node$$1) {
    if (isSimpleCallee(node$$1)) {
      return LooseModeResolution.namespaced("Modifier"
      /* Modifier */
      );
    } else {
      return null;
    }
  }

  function BlockSyntaxContext(node$$1) {
    if (isSimpleCallee(node$$1)) {
      return LooseModeResolution.namespaced("Component"
      /* Component */
      );
    } else {
      return LooseModeResolution.fallback();
    }
  }

  function ComponentSyntaxContext(node$$1) {
    if (isSimplePath(node$$1)) {
      return LooseModeResolution.namespaced("Component"
      /* Component */
      , true);
    } else {
      return null;
    }
  }
  /**
   * This corresponds to append positions (text curlies or attribute
   * curlies). In strict mode, this also corresponds to arg curlies.
   */


  function AttrValueSyntaxContext(node$$1) {
    var isSimple = isSimpleCallee(node$$1);
    var isInvoke = isInvokeNode(node$$1);

    if (isSimple) {
      return isInvoke ? LooseModeResolution.namespaced("Helper"
      /* Helper */
      ) : LooseModeResolution.attr();
    } else {
      return isInvoke ? STRICT_RESOLUTION : LooseModeResolution.fallback();
    }
  }
  /**
   * This corresponds to append positions (text curlies or attribute
   * curlies). In strict mode, this also corresponds to arg curlies.
   */


  function AppendSyntaxContext(node$$1) {
    var isSimple = isSimpleCallee(node$$1);
    var isInvoke = isInvokeNode(node$$1);
    var trusting = node$$1.trusting;

    if (isSimple) {
      return trusting ? LooseModeResolution.trustingAppend({
        invoke: isInvoke
      }) : LooseModeResolution.append({
        invoke: isInvoke
      });
    } else {
      return LooseModeResolution.fallback();
    }
  } // UTILITIES

  /**
   * A call node has a simple callee if its head is:
   *
   * - a `PathExpression`
   * - the `PathExpression`'s head is a `VarHead`
   * - it has no tail
   *
   * Simple heads:
   *
   * ```
   * {{x}}
   * {{x y}}
   * ```
   *
   * Not simple heads:
   *
   * ```
   * {{x.y}}
   * {{x.y z}}
   * {{@x}}
   * {{@x a}}
   * {{this}}
   * {{this a}}
   * ```
   */


  function isSimpleCallee(node$$1) {
    var path = node$$1.path;
    return isSimplePath(path);
  }

  function isSimplePath(node$$1) {
    if (node$$1.type === 'PathExpression' && node$$1.head.type === 'VarHead') {
      return node$$1.tail.length === 0;
    } else {
      return false;
    }
  }
  /**
   * The call expression has at least one argument.
   */


  function isInvokeNode(node$$1) {
    return node$$1.params.length > 0 || node$$1.hash.pairs.length > 0;
  }

  function normalize(source, options) {
    if (options === void 0) {
      options = {};
    }

    var _a;

    var ast = preprocess(source, options);
    var normalizeOptions = (0, _util.assign)({
      strictMode: false,
      locals: []
    }, options);
    var top = SymbolTable.top(normalizeOptions.locals, (_a = // eslint-disable-next-line @typescript-eslint/unbound-method
    options.customizeComponentName) !== null && _a !== void 0 ? _a : function (name) {
      return name;
    });
    var block = new BlockContext(source, normalizeOptions, top);
    var normalizer = new StatementNormalizer(block);
    var astV2 = new TemplateChildren(block.loc(ast.loc), ast.body.map(function (b$$1) {
      return normalizer.normalize(b$$1);
    }), block).assertTemplate(top);
    var locals = top.getUsedTemplateLocals();
    return [astV2, locals];
  }
  /**
   * A `BlockContext` represents the block that a particular AST node is contained inside of.
   *
   * `BlockContext` is aware of template-wide options (such as strict mode), as well as the bindings
   * that are in-scope within that block.
   *
   * Concretely, it has the `PrecompileOptions` and current `SymbolTable`, and provides
   * facilities for working with those options.
   *
   * `BlockContext` is stateless.
   */


  var BlockContext = /*#__PURE__*/function () {
    function BlockContext(source, options, table) {
      this.source = source;
      this.options = options;
      this.table = table;
      this.builder = new Builder();
    }

    var _proto37 = BlockContext.prototype;

    _proto37.loc = function loc(loc$$1) {
      return this.source.spanFor(loc$$1);
    };

    _proto37.resolutionFor = function resolutionFor(node$$1, resolution) {
      if (this.strict) {
        return {
          resolution: STRICT_RESOLUTION
        };
      }

      if (this.isFreeVar(node$$1)) {
        var r = resolution(node$$1);

        if (r === null) {
          return {
            resolution: 'error',
            path: printPath(node$$1),
            head: printHead(node$$1)
          };
        }

        return {
          resolution: r
        };
      } else {
        return {
          resolution: STRICT_RESOLUTION
        };
      }
    };

    _proto37.isFreeVar = function isFreeVar(callee) {
      if (callee.type === 'PathExpression') {
        if (callee.head.type !== 'VarHead') {
          return false;
        }

        return !this.table.has(callee.head.name);
      } else if (callee.path.type === 'PathExpression') {
        return this.isFreeVar(callee.path);
      } else {
        return false;
      }
    };

    _proto37.hasBinding = function hasBinding(name) {
      return this.table.has(name);
    };

    _proto37.child = function child(blockParams) {
      return new BlockContext(this.source, this.options, this.table.child(blockParams));
    };

    _proto37.customizeComponentName = function customizeComponentName(input) {
      if (this.options.customizeComponentName) {
        return this.options.customizeComponentName(input);
      } else {
        return input;
      }
    };

    (0, _emberBabel.createClass)(BlockContext, [{
      key: "strict",
      get: function get() {
        return this.options.strictMode || false;
      }
    }]);
    return BlockContext;
  }();
  /**
   * An `ExpressionNormalizer` normalizes expressions within a block.
   *
   * `ExpressionNormalizer` is stateless.
   */


  var ExpressionNormalizer = /*#__PURE__*/function () {
    function ExpressionNormalizer(block) {
      this.block = block;
    }

    var _proto38 = ExpressionNormalizer.prototype;

    _proto38.normalize = function normalize(expr, resolution) {
      switch (expr.type) {
        case 'NullLiteral':
        case 'BooleanLiteral':
        case 'NumberLiteral':
        case 'StringLiteral':
        case 'UndefinedLiteral':
          return this.block.builder.literal(expr.value, this.block.loc(expr.loc));

        case 'PathExpression':
          return this.path(expr, resolution);

        case 'SubExpression':
          {
            var _resolution = this.block.resolutionFor(expr, SexpSyntaxContext);

            if (_resolution.resolution === 'error') {
              throw generateSyntaxError("You attempted to invoke a path (`" + _resolution.path + "`) but " + _resolution.head + " was not in scope", expr.loc);
            }

            return this.block.builder.sexp(this.callParts(expr, _resolution.resolution), this.block.loc(expr.loc));
          }
      }
    };

    _proto38.path = function path(expr, resolution) {
      var headOffsets = this.block.loc(expr.head.loc);
      var tail = []; // start with the head

      var offset = headOffsets;

      for (var _iterator3 = (0, _emberBabel.createForOfIteratorHelperLoose)(expr.tail), _step3; !(_step3 = _iterator3()).done;) {
        var _part2 = _step3.value;
        offset = offset.sliceStartChars({
          chars: _part2.length,
          skipStart: 1
        });
        tail.push(new SourceSlice({
          loc: offset,
          chars: _part2
        }));
      }

      return this.block.builder.path(this.ref(expr.head, resolution), tail, this.block.loc(expr.loc));
    }
    /**
     * The `callParts` method takes ASTv1.CallParts as well as a syntax context and normalizes
     * it to an ASTv2 CallParts.
     */
    ;

    _proto38.callParts = function callParts(parts, context) {
      var _this12 = this;

      var path = parts.path,
          params = parts.params,
          hash = parts.hash;
      var callee = this.normalize(path, context);
      var paramList = params.map(function (p) {
        return _this12.normalize(p, ARGUMENT_RESOLUTION);
      });
      var paramLoc = SpanList.range(paramList, callee.loc.collapse('end'));
      var namedLoc = this.block.loc(hash.loc);
      var argsLoc = SpanList.range([paramLoc, namedLoc]);
      var positional = this.block.builder.positional(params.map(function (p) {
        return _this12.normalize(p, ARGUMENT_RESOLUTION);
      }), paramLoc);
      var named = this.block.builder.named(hash.pairs.map(function (p) {
        return _this12.namedArgument(p);
      }), this.block.loc(hash.loc));
      return {
        callee: callee,
        args: this.block.builder.args(positional, named, argsLoc)
      };
    };

    _proto38.namedArgument = function namedArgument(pair) {
      var offsets = this.block.loc(pair.loc);
      var keyOffsets = offsets.sliceStartChars({
        chars: pair.key.length
      });
      return this.block.builder.namedArgument(new SourceSlice({
        chars: pair.key,
        loc: keyOffsets
      }), this.normalize(pair.value, ARGUMENT_RESOLUTION));
    }
    /**
     * The `ref` method normalizes an `ASTv1.PathHead` into an `ASTv2.VariableReference`.
     * This method is extremely important, because it is responsible for normalizing free
     * variables into an an ASTv2.PathHead *with appropriate context*.
     *
     * The syntax context is originally determined by the syntactic position that this `PathHead`
     * came from, and is ultimately attached to the `ASTv2.VariableReference` here. In ASTv2,
     * the `VariableReference` node bears full responsibility for loose mode rules that control
     * the behavior of free variables.
     */
    ;

    _proto38.ref = function ref(head, resolution) {
      var block = this.block;
      var builder = block.builder,
          table = block.table;
      var offsets = block.loc(head.loc);

      switch (head.type) {
        case 'ThisHead':
          return builder.self(offsets);

        case 'AtHead':
          {
            var symbol = table.allocateNamed(head.name);
            return builder.at(head.name, symbol, offsets);
          }

        case 'VarHead':
          {
            if (block.hasBinding(head.name)) {
              var _table$get = table.get(head.name),
                  _symbol = _table$get[0],
                  isRoot = _table$get[1];

              return block.builder.localVar(head.name, _symbol, isRoot, offsets);
            } else {
              var context = block.strict ? STRICT_RESOLUTION : resolution;

              var _symbol2 = block.table.allocateFree(head.name, context);

              return block.builder.freeVar({
                name: head.name,
                context: context,
                symbol: _symbol2,
                loc: offsets
              });
            }
          }
      }
    };

    return ExpressionNormalizer;
  }();
  /**
   * `TemplateNormalizer` normalizes top-level ASTv1 statements to ASTv2.
   */


  var StatementNormalizer = /*#__PURE__*/function () {
    function StatementNormalizer(block) {
      this.block = block;
    }

    var _proto39 = StatementNormalizer.prototype;

    _proto39.normalize = function normalize(node$$1) {
      switch (node$$1.type) {
        case 'PartialStatement':
          throw new Error("Handlebars partial syntax ({{> ...}}) is not allowed in Glimmer");

        case 'BlockStatement':
          return this.BlockStatement(node$$1);

        case 'ElementNode':
          return new ElementNormalizer(this.block).ElementNode(node$$1);

        case 'MustacheStatement':
          return this.MustacheStatement(node$$1);
        // These are the same in ASTv2

        case 'MustacheCommentStatement':
          return this.MustacheCommentStatement(node$$1);

        case 'CommentStatement':
          {
            var loc$$1 = this.block.loc(node$$1.loc);
            return new HtmlComment({
              loc: loc$$1,
              text: loc$$1.slice({
                skipStart: 4,
                skipEnd: 3
              }).toSlice(node$$1.value)
            });
          }

        case 'TextNode':
          return new HtmlText({
            loc: this.block.loc(node$$1.loc),
            chars: node$$1.chars
          });
      }
    };

    _proto39.MustacheCommentStatement = function MustacheCommentStatement(node$$1) {
      var loc$$1 = this.block.loc(node$$1.loc);
      var textLoc;

      if (loc$$1.asString().slice(0, 5) === '{{!--') {
        textLoc = loc$$1.slice({
          skipStart: 5,
          skipEnd: 4
        });
      } else {
        textLoc = loc$$1.slice({
          skipStart: 3,
          skipEnd: 2
        });
      }

      return new GlimmerComment({
        loc: loc$$1,
        text: textLoc.toSlice(node$$1.value)
      });
    }
    /**
     * Normalizes an ASTv1.MustacheStatement to an ASTv2.AppendStatement
     */
    ;

    _proto39.MustacheStatement = function MustacheStatement(mustache) {
      var escaped = mustache.escaped;
      var loc$$1 = this.block.loc(mustache.loc); // Normalize the call parts in AppendSyntaxContext

      var callParts = this.expr.callParts({
        path: mustache.path,
        params: mustache.params,
        hash: mustache.hash
      }, AppendSyntaxContext(mustache));
      var value = callParts.args.isEmpty() ? callParts.callee : this.block.builder.sexp(callParts, loc$$1);
      return this.block.builder.append({
        table: this.block.table,
        trusting: !escaped,
        value: value
      }, loc$$1);
    }
    /**
     * Normalizes a ASTv1.BlockStatement to an ASTv2.BlockStatement
     */
    ;

    _proto39.BlockStatement = function BlockStatement(block) {
      var program = block.program,
          inverse = block.inverse;
      var loc$$1 = this.block.loc(block.loc);
      var resolution = this.block.resolutionFor(block, BlockSyntaxContext);

      if (resolution.resolution === 'error') {
        throw generateSyntaxError("You attempted to invoke a path (`{{#" + resolution.path + "}}`) but " + resolution.head + " was not in scope", loc$$1);
      }

      var callParts = this.expr.callParts(block, resolution.resolution);
      return this.block.builder.blockStatement((0, _util.assign)({
        symbols: this.block.table,
        program: this.Block(program),
        inverse: inverse ? this.Block(inverse) : null
      }, callParts), loc$$1);
    };

    _proto39.Block = function Block(_ref34) {
      var body = _ref34.body,
          loc$$1 = _ref34.loc,
          blockParams = _ref34.blockParams;
      var child = this.block.child(blockParams);
      var normalizer = new StatementNormalizer(child);
      return new BlockChildren(this.block.loc(loc$$1), body.map(function (b$$1) {
        return normalizer.normalize(b$$1);
      }), this.block).assertBlock(child.table);
    };

    (0, _emberBabel.createClass)(StatementNormalizer, [{
      key: "expr",
      get: function get() {
        return new ExpressionNormalizer(this.block);
      }
    }]);
    return StatementNormalizer;
  }();

  var ElementNormalizer = /*#__PURE__*/function () {
    function ElementNormalizer(ctx) {
      this.ctx = ctx;
    }
    /**
     * Normalizes an ASTv1.ElementNode to:
     *
     * - ASTv2.NamedBlock if the tag name begins with `:`
     * - ASTv2.Component if the tag name matches the component heuristics
     * - ASTv2.SimpleElement if the tag name doesn't match the component heuristics
     *
     * A tag name represents a component if:
     *
     * - it begins with `@`
     * - it is exactly `this` or begins with `this.`
     * - the part before the first `.` is a reference to an in-scope variable binding
     * - it begins with an uppercase character
     */


    var _proto40 = ElementNormalizer.prototype;

    _proto40.ElementNode = function ElementNode(element) {
      var _this13 = this;

      var tag = element.tag,
          selfClosing = element.selfClosing,
          comments = element.comments;
      var loc$$1 = this.ctx.loc(element.loc);

      var _tag$split = tag.split('.'),
          tagHead = _tag$split[0],
          rest = _tag$split.slice(1); // the head, attributes and modifiers are in the current scope


      var path = this.classifyTag(tagHead, rest, element.loc);
      var attrs = element.attributes.filter(function (a) {
        return a.name[0] !== '@';
      }).map(function (a) {
        return _this13.attr(a);
      });
      var args = element.attributes.filter(function (a) {
        return a.name[0] === '@';
      }).map(function (a) {
        return _this13.arg(a);
      });
      var modifiers = element.modifiers.map(function (m) {
        return _this13.modifier(m);
      }); // the element's block params are in scope for the children

      var child = this.ctx.child(element.blockParams);
      var normalizer = new StatementNormalizer(child);
      var childNodes = element.children.map(function (s) {
        return normalizer.normalize(s);
      });
      var el = this.ctx.builder.element({
        selfClosing: selfClosing,
        attrs: attrs,
        componentArgs: args,
        modifiers: modifiers,
        comments: comments.map(function (c) {
          return new StatementNormalizer(_this13.ctx).MustacheCommentStatement(c);
        })
      });
      var children = new ElementChildren(el, loc$$1, childNodes, this.ctx);
      var offsets = this.ctx.loc(element.loc);
      var tagOffsets = offsets.sliceStartChars({
        chars: tag.length,
        skipStart: 1
      });

      if (path === 'ElementHead') {
        if (tag[0] === ':') {
          return children.assertNamedBlock(tagOffsets.slice({
            skipStart: 1
          }).toSlice(tag.slice(1)), child.table);
        } else {
          return children.assertElement(tagOffsets.toSlice(tag), element.blockParams.length > 0);
        }
      }

      if (element.selfClosing) {
        return el.selfClosingComponent(path, loc$$1);
      } else {
        var blocks = children.assertComponent(tag, child.table, element.blockParams.length > 0);
        return el.componentWithNamedBlocks(path, blocks, loc$$1);
      }
    };

    _proto40.modifier = function modifier(m) {
      var resolution = this.ctx.resolutionFor(m, ModifierSyntaxContext);

      if (resolution.resolution === 'error') {
        throw generateSyntaxError("You attempted to invoke a path (`{{#" + resolution.path + "}}`) as a modifier, but " + resolution.head + " was not in scope. Try adding `this` to the beginning of the path", m.loc);
      }

      var callParts = this.expr.callParts(m, resolution.resolution);
      return this.ctx.builder.modifier(callParts, this.ctx.loc(m.loc));
    }
    /**
     * This method handles attribute values that are curlies, as well as curlies nested inside of
     * interpolations:
     *
     * ```hbs
     * <a href={{url}} />
     * <a href="{{url}}.html" />
     * ```
     */
    ;

    _proto40.mustacheAttr = function mustacheAttr(mustache) {
      // Normalize the call parts in AttrValueSyntaxContext
      var sexp = this.ctx.builder.sexp(this.expr.callParts(mustache, AttrValueSyntaxContext(mustache)), this.ctx.loc(mustache.loc)); // If there are no params or hash, just return the function part as its own expression

      if (sexp.args.isEmpty()) {
        return sexp.callee;
      } else {
        return sexp;
      }
    }
    /**
     * attrPart is the narrowed down list of valid attribute values that are also
     * allowed as a concat part (you can't nest concats).
     */
    ;

    _proto40.attrPart = function attrPart(part) {
      switch (part.type) {
        case 'MustacheStatement':
          return {
            expr: this.mustacheAttr(part),
            trusting: !part.escaped
          };

        case 'TextNode':
          return {
            expr: this.ctx.builder.literal(part.chars, this.ctx.loc(part.loc)),
            trusting: true
          };
      }
    };

    _proto40.attrValue = function attrValue(part) {
      var _this14 = this;

      switch (part.type) {
        case 'ConcatStatement':
          {
            var parts = part.parts.map(function (p) {
              return _this14.attrPart(p).expr;
            });
            return {
              expr: this.ctx.builder.interpolate(parts, this.ctx.loc(part.loc)),
              trusting: false
            };
          }

        default:
          return this.attrPart(part);
      }
    };

    _proto40.attr = function attr(m) {
      if (m.name === '...attributes') {
        return this.ctx.builder.splatAttr(this.ctx.table.allocateBlock('attrs'), this.ctx.loc(m.loc));
      }

      var offsets = this.ctx.loc(m.loc);
      var nameSlice = offsets.sliceStartChars({
        chars: m.name.length
      }).toSlice(m.name);
      var value = this.attrValue(m.value);
      return this.ctx.builder.attr({
        name: nameSlice,
        value: value.expr,
        trusting: value.trusting
      }, offsets);
    };

    _proto40.maybeDeprecatedCall = function maybeDeprecatedCall(arg, part) {
      if (this.ctx.strict) {
        return null;
      }

      if (part.type !== 'MustacheStatement') {
        return null;
      }

      var path = part.path;

      if (path.type !== 'PathExpression') {
        return null;
      }

      if (path.head.type !== 'VarHead') {
        return null;
      }

      var name = path.head.name;

      if (name === 'has-block' || name === 'has-block-params') {
        return null;
      }

      if (this.ctx.hasBinding(name)) {
        return null;
      }

      if (path.tail.length !== 0) {
        return null;
      }

      if (part.params.length !== 0 || part.hash.pairs.length !== 0) {
        return null;
      }

      var context = LooseModeResolution.attr();
      var callee = this.ctx.builder.freeVar({
        name: name,
        context: context,
        symbol: this.ctx.table.allocateFree(name, context),
        loc: path.loc
      });
      return {
        expr: this.ctx.builder.deprecatedCall(arg, callee, part.loc),
        trusting: false
      };
    };

    _proto40.arg = function arg(_arg) {
      var offsets = this.ctx.loc(_arg.loc);
      var nameSlice = offsets.sliceStartChars({
        chars: _arg.name.length
      }).toSlice(_arg.name);
      var value = this.maybeDeprecatedCall(nameSlice, _arg.value) || this.attrValue(_arg.value);
      return this.ctx.builder.arg({
        name: nameSlice,
        value: value.expr,
        trusting: value.trusting
      }, offsets);
    }
    /**
     * This function classifies the head of an ASTv1.Element into an ASTv2.PathHead (if the
     * element is a component) or `'ElementHead'` (if the element is a simple element).
     *
     * Rules:
     *
     * 1. If the variable is an `@arg`, return an `AtHead`
     * 2. If the variable is `this`, return a `ThisHead`
     * 3. If the variable is in the current scope:
     *   a. If the scope is the root scope, then return a Free `LocalVarHead`
     *   b. Else, return a standard `LocalVarHead`
     * 4. If the tag name is a path and the variable is not in the current scope, Syntax Error
     * 5. If the variable is uppercase return a FreeVar(ResolveAsComponentHead)
     * 6. Otherwise, return `'ElementHead'`
     */
    ;

    _proto40.classifyTag = function classifyTag(variable, tail, loc$$1) {
      var uppercase = isUpperCase(variable);
      var inScope = variable[0] === '@' || variable === 'this' || this.ctx.hasBinding(variable);

      if (this.ctx.strict && !inScope) {
        if (uppercase) {
          throw generateSyntaxError("Attempted to invoke a component that was not in scope in a strict mode template, `<" + variable + ">`. If you wanted to create an element with that name, convert it to lowercase - `<" + variable.toLowerCase() + ">`", loc$$1);
        } // In strict mode, values are always elements unless they are in scope


        return 'ElementHead';
      } // Since the parser handed us the HTML element name as a string, we need
      // to convert it into an ASTv1 path so it can be processed using the
      // expression normalizer.


      var isComponent = inScope || uppercase;
      var variableLoc = loc$$1.sliceStartChars({
        skipStart: 1,
        chars: variable.length
      });
      var tailLength = tail.reduce(function (accum, part) {
        return accum + 1 + part.length;
      }, 0);
      var pathEnd = variableLoc.getEnd().move(tailLength);
      var pathLoc = variableLoc.withEnd(pathEnd);

      if (isComponent) {
        var path = b.path({
          head: b.head(variable, variableLoc),
          tail: tail,
          loc: pathLoc
        });
        var resolution = this.ctx.resolutionFor(path, ComponentSyntaxContext);

        if (resolution.resolution === 'error') {
          throw generateSyntaxError("You attempted to invoke a path (`<" + resolution.path + ">`) but " + resolution.head + " was not in scope", loc$$1);
        }

        return new ExpressionNormalizer(this.ctx).normalize(path, resolution.resolution);
      } // If the tag name wasn't a valid component but contained a `.`, it's
      // a syntax error.


      if (tail.length > 0) {
        throw generateSyntaxError("You used " + variable + "." + tail.join('.') + " as a tag name, but " + variable + " is not in scope", loc$$1);
      }

      return 'ElementHead';
    };

    (0, _emberBabel.createClass)(ElementNormalizer, [{
      key: "expr",
      get: function get() {
        return new ExpressionNormalizer(this.ctx);
      }
    }]);
    return ElementNormalizer;
  }();

  var Children = function Children(loc$$1, children, block) {
    this.loc = loc$$1;
    this.children = children;
    this.block = block;
    this.namedBlocks = children.filter(function (c) {
      return c instanceof NamedBlock;
    });
    this.hasSemanticContent = Boolean(children.filter(function (c) {
      if (c instanceof NamedBlock) {
        return false;
      }

      switch (c.type) {
        case 'GlimmerComment':
        case 'HtmlComment':
          return false;

        case 'HtmlText':
          return !/^\s*$/.exec(c.chars);

        default:
          return true;
      }
    }).length);
    this.nonBlockChildren = children.filter(function (c) {
      return !(c instanceof NamedBlock);
    });
  };

  var TemplateChildren = /*#__PURE__*/function (_Children) {
    (0, _emberBabel.inheritsLoose)(TemplateChildren, _Children);

    function TemplateChildren() {
      return _Children.apply(this, arguments) || this;
    }

    var _proto41 = TemplateChildren.prototype;

    _proto41.assertTemplate = function assertTemplate(table) {
      if ((0, _util.isPresent)(this.namedBlocks)) {
        throw generateSyntaxError("Unexpected named block at the top-level of a template", this.loc);
      }

      return this.block.builder.template(table, this.nonBlockChildren, this.block.loc(this.loc));
    };

    return TemplateChildren;
  }(Children);

  var BlockChildren = /*#__PURE__*/function (_Children2) {
    (0, _emberBabel.inheritsLoose)(BlockChildren, _Children2);

    function BlockChildren() {
      return _Children2.apply(this, arguments) || this;
    }

    var _proto42 = BlockChildren.prototype;

    _proto42.assertBlock = function assertBlock(table) {
      if ((0, _util.isPresent)(this.namedBlocks)) {
        throw generateSyntaxError("Unexpected named block nested in a normal block", this.loc);
      }

      return this.block.builder.block(table, this.nonBlockChildren, this.loc);
    };

    return BlockChildren;
  }(Children);

  var ElementChildren = /*#__PURE__*/function (_Children3) {
    (0, _emberBabel.inheritsLoose)(ElementChildren, _Children3);

    function ElementChildren(el, loc$$1, children, block) {
      var _this15;

      _this15 = _Children3.call(this, loc$$1, children, block) || this;
      _this15.el = el;
      return _this15;
    }

    var _proto43 = ElementChildren.prototype;

    _proto43.assertNamedBlock = function assertNamedBlock(name, table) {
      if (this.el.base.selfClosing) {
        throw generateSyntaxError("<:" + name.chars + "/> is not a valid named block: named blocks cannot be self-closing", this.loc);
      }

      if ((0, _util.isPresent)(this.namedBlocks)) {
        throw generateSyntaxError("Unexpected named block inside <:" + name.chars + "> named block: named blocks cannot contain nested named blocks", this.loc);
      }

      if (!isLowerCase(name.chars)) {
        throw generateSyntaxError("<:" + name.chars + "> is not a valid named block, and named blocks must begin with a lowercase letter", this.loc);
      }

      if (this.el.base.attrs.length > 0 || this.el.base.componentArgs.length > 0 || this.el.base.modifiers.length > 0) {
        throw generateSyntaxError("named block <:" + name.chars + "> cannot have attributes, arguments, or modifiers", this.loc);
      }

      var offsets = SpanList.range(this.nonBlockChildren, this.loc);
      return this.block.builder.namedBlock(name, this.block.builder.block(table, this.nonBlockChildren, offsets), this.loc);
    };

    _proto43.assertElement = function assertElement(name, hasBlockParams) {
      if (hasBlockParams) {
        throw generateSyntaxError("Unexpected block params in <" + name + ">: simple elements cannot have block params", this.loc);
      }

      if ((0, _util.isPresent)(this.namedBlocks)) {
        var names = this.namedBlocks.map(function (b$$1) {
          return b$$1.name;
        });

        if (names.length === 1) {
          throw generateSyntaxError("Unexpected named block <:foo> inside <" + name.chars + "> HTML element", this.loc);
        } else {
          var printedNames = names.map(function (n) {
            return "<:" + n.chars + ">";
          }).join(', ');
          throw generateSyntaxError("Unexpected named blocks inside <" + name.chars + "> HTML element (" + printedNames + ")", this.loc);
        }
      }

      return this.el.simple(name, this.nonBlockChildren, this.loc);
    };

    _proto43.assertComponent = function assertComponent(name, table, hasBlockParams) {
      if ((0, _util.isPresent)(this.namedBlocks) && this.hasSemanticContent) {
        throw generateSyntaxError("Unexpected content inside <" + name + "> component invocation: when using named blocks, the tag cannot contain other content", this.loc);
      }

      if ((0, _util.isPresent)(this.namedBlocks)) {
        if (hasBlockParams) {
          throw generateSyntaxError("Unexpected block params list on <" + name + "> component invocation: when passing named blocks, the invocation tag cannot take block params", this.loc);
        }

        var seenNames = new Set();

        for (var _iterator4 = (0, _emberBabel.createForOfIteratorHelperLoose)(this.namedBlocks), _step4; !(_step4 = _iterator4()).done;) {
          var _block = _step4.value;
          var _name2 = _block.name.chars;

          if (seenNames.has(_name2)) {
            throw generateSyntaxError("Component had two named blocks with the same name, `<:" + _name2 + ">`. Only one block with a given name may be passed", this.loc);
          }

          if (_name2 === 'inverse' && seenNames.has('else') || _name2 === 'else' && seenNames.has('inverse')) {
            throw generateSyntaxError("Component has both <:else> and <:inverse> block. <:inverse> is an alias for <:else>", this.loc);
          }

          seenNames.add(_name2);
        }

        return this.namedBlocks;
      } else {
        return [this.block.builder.namedBlock(SourceSlice.synthetic('default'), this.block.builder.block(table, this.nonBlockChildren, this.loc), this.loc)];
      }
    };

    return ElementChildren;
  }(Children);

  function printPath(node$$1) {
    if (node$$1.type !== 'PathExpression' && node$$1.path.type === 'PathExpression') {
      return printPath(node$$1.path);
    } else {
      return new Printer({
        entityEncoding: 'raw'
      }).print(node$$1);
    }
  }

  function printHead(node$$1) {
    if (node$$1.type === 'PathExpression') {
      switch (node$$1.head.type) {
        case 'AtHead':
        case 'VarHead':
          return node$$1.head.name;

        case 'ThisHead':
          return 'this';
      }
    } else if (node$$1.path.type === 'PathExpression') {
      return printHead(node$$1.path);
    } else {
      return new Printer({
        entityEncoding: 'raw'
      }).print(node$$1);
    }
  }

  function isKeyword(word) {
    return word in KEYWORDS_TYPES;
  }
  /**
   * This includes the full list of keywords currently in use in the template
   * language, and where their valid usages are.
   */


  var KEYWORDS_TYPES = {
    component: ['Call', 'Append', 'Block'],
    debugger: ['Append'],
    'each-in': ['Block'],
    each: ['Block'],
    'has-block-params': ['Call', 'Append'],
    'has-block': ['Call', 'Append'],
    helper: ['Call', 'Append'],
    if: ['Call', 'Append', 'Block'],
    'in-element': ['Block'],
    let: ['Block'],
    'link-to': ['Append', 'Block'],
    log: ['Call', 'Append'],
    modifier: ['Call'],
    mount: ['Append'],
    mut: ['Call', 'Append'],
    outlet: ['Append'],
    'query-params': ['Call'],
    readonly: ['Call', 'Append'],
    unbound: ['Call', 'Append'],
    unless: ['Call', 'Append', 'Block'],
    with: ['Block'],
    yield: ['Append']
  };
  /**
   * Gets the correct Token from the Node based on it's type
   */

  _exports.KEYWORDS_TYPES = KEYWORDS_TYPES;

  function tokensFromType(node, scopedTokens, options) {
    if (node.type === 'PathExpression') {
      if (node.head.type === 'AtHead' || node.head.type === 'ThisHead') {
        return;
      }

      var possbleToken = node.head.name;

      if (scopedTokens.indexOf(possbleToken) === -1) {
        return possbleToken;
      }
    } else if (node.type === 'ElementNode') {
      var tag = node.tag;
      var char = tag.charAt(0);

      if (char === ':' || char === '@') {
        return;
      }

      if (!options.includeHtmlElements && tag.indexOf('.') === -1 && tag.toLowerCase() === tag) {
        return;
      }

      if (tag.substr(0, 5) === 'this.') {
        return;
      }

      if (scopedTokens.indexOf(tag) !== -1) {
        return;
      }

      return tag;
    }
  }
  /**
   * Adds tokens to the tokensSet based on their node.type
   */


  function addTokens(tokensSet, node, scopedTokens, options) {
    var maybeTokens = tokensFromType(node, scopedTokens, options);
    (Array.isArray(maybeTokens) ? maybeTokens : [maybeTokens]).forEach(function (maybeToken) {
      if (maybeToken !== undefined && maybeToken[0] !== '@') {
        tokensSet.add(maybeToken.split('.')[0]);
      }
    });
  }
  /**
   * Parses and traverses a given handlebars html template to extract all template locals
   * referenced that could possible come from the praent scope. Can exclude known keywords
   * optionally.
   */


  function getTemplateLocals(html, options) {
    if (options === void 0) {
      options = {
        includeHtmlElements: false,
        includeKeywords: false
      };
    }

    var ast = preprocess(html);
    var tokensSet = new Set();
    var scopedTokens = [];
    traverse(ast, {
      Block: {
        enter: function enter(_ref35) {
          var blockParams = _ref35.blockParams;
          blockParams.forEach(function (param) {
            scopedTokens.push(param);
          });
        },
        exit: function exit(_ref36) {
          var blockParams = _ref36.blockParams;
          blockParams.forEach(function () {
            scopedTokens.pop();
          });
        }
      },
      ElementNode: {
        enter: function enter(node) {
          node.blockParams.forEach(function (param) {
            scopedTokens.push(param);
          });
          addTokens(tokensSet, node, scopedTokens, options);
        },
        exit: function exit(_ref37) {
          var blockParams = _ref37.blockParams;
          blockParams.forEach(function () {
            scopedTokens.pop();
          });
        }
      },
      PathExpression: function PathExpression(node) {
        addTokens(tokensSet, node, scopedTokens, options);
      }
    });
    var tokens = [];
    tokensSet.forEach(function (s) {
      return tokens.push(s);
    });

    if (!(options === null || options === void 0 ? void 0 : options.includeKeywords)) {
      tokens = tokens.filter(function (token) {
        return !isKeyword(token);
      });
    }

    return tokens;
  }
});
define("@glimmer/util", ["exports", "ember-babel"], function (_exports, _emberBabel) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.assertNever = assertNever;
  _exports.assert = debugAssert$$1;
  _exports.deprecate = deprecate$$1;
  _exports.dict = dict;
  _exports.isDict = isDict;
  _exports.isObject = isObject;
  _exports.isSerializationFirstNode = isSerializationFirstNode;
  _exports.fillNulls = fillNulls;
  _exports.values = values;
  _exports.castToSimple = castToSimple;
  _exports.castToBrowser = castToBrowser;
  _exports.checkNode = checkNode;
  _exports.intern = intern;
  _exports.buildUntouchableThis = buildUntouchableThis;
  _exports.emptyArray = emptyArray;
  _exports.isEmptyArray = isEmptyArray;
  _exports.clearElement = clearElement;
  _exports.keys = keys;
  _exports.unwrap = unwrap;
  _exports.expect = expect;
  _exports.unreachable = unreachable;
  _exports.exhausted = exhausted;
  _exports.enumerableSymbol = enumerableSymbol;
  _exports.strip = strip;
  _exports.isHandle = isHandle;
  _exports.isNonPrimitiveHandle = isNonPrimitiveHandle;
  _exports.constants = constants;
  _exports.isSmallInt = isSmallInt;
  _exports.encodeNegative = encodeNegative;
  _exports.decodeNegative = decodeNegative;
  _exports.encodePositive = encodePositive;
  _exports.decodePositive = decodePositive;
  _exports.encodeHandle = encodeHandle;
  _exports.decodeHandle = decodeHandle;
  _exports.encodeImmediate = encodeImmediate;
  _exports.decodeImmediate = decodeImmediate;
  _exports.unwrapHandle = unwrapHandle;
  _exports.unwrapTemplate = unwrapTemplate;
  _exports.extractHandle = extractHandle;
  _exports.isOkHandle = isOkHandle;
  _exports.isErrHandle = isErrHandle;
  _exports.isPresent = isPresent;
  _exports.ifPresent = ifPresent;
  _exports.toPresentOption = toPresentOption;
  _exports.assertPresent = assertPresent;
  _exports.mapPresent = mapPresent;
  _exports.symbol = _exports.tuple = _exports.HAS_NATIVE_SYMBOL = _exports.HAS_NATIVE_PROXY = _exports.EMPTY_NUMBER_ARRAY = _exports.EMPTY_STRING_ARRAY = _exports.EMPTY_ARRAY = _exports.verifySteps = _exports.logStep = _exports.endTestSteps = _exports.beginTestSteps = _exports.debugToString = _exports._WeakSet = _exports.assign = _exports.SERIALIZATION_FIRST_NODE_STRING = _exports.Stack = _exports.LOGGER = _exports.LOCAL_LOGGER = void 0;
  var EMPTY_ARRAY = Object.freeze([]);
  _exports.EMPTY_ARRAY = EMPTY_ARRAY;

  function emptyArray() {
    return EMPTY_ARRAY;
  }

  var EMPTY_STRING_ARRAY = emptyArray();
  _exports.EMPTY_STRING_ARRAY = EMPTY_STRING_ARRAY;
  var EMPTY_NUMBER_ARRAY = emptyArray();
  /**
   * This function returns `true` if the input array is the special empty array sentinel,
   * which is sometimes used for optimizations.
   */

  _exports.EMPTY_NUMBER_ARRAY = EMPTY_NUMBER_ARRAY;

  function isEmptyArray(input) {
    return input === EMPTY_ARRAY;
  } // import Logger from './logger';


  function debugAssert$$1(test, msg) {
    // if (!alreadyWarned) {
    //   alreadyWarned = true;
    //   Logger.warn("Don't leave debug assertions on in public builds");
    // }
    if (!test) {
      throw new Error(msg || 'assertion failure');
    }
  }

  function deprecate$$1(desc) {
    LOCAL_LOGGER.warn("DEPRECATION: " + desc);
  }

  function dict() {
    return Object.create(null);
  }

  function isDict(u) {
    return u !== null && u !== undefined;
  }

  function isObject(u) {
    return typeof u === 'function' || typeof u === 'object' && u !== null;
  }

  var StackImpl = /*#__PURE__*/function () {
    function StackImpl(values) {
      if (values === void 0) {
        values = [];
      }

      this.current = null;
      this.stack = values;
    }

    var _proto = StackImpl.prototype;

    _proto.push = function push(item) {
      this.current = item;
      this.stack.push(item);
    };

    _proto.pop = function pop() {
      var item = this.stack.pop();
      var len = this.stack.length;
      this.current = len === 0 ? null : this.stack[len - 1];
      return item === undefined ? null : item;
    };

    _proto.nth = function nth(from) {
      var len = this.stack.length;
      return len < from ? null : this.stack[len - from];
    };

    _proto.isEmpty = function isEmpty() {
      return this.stack.length === 0;
    };

    _proto.toArray = function toArray() {
      return this.stack;
    };

    (0, _emberBabel.createClass)(StackImpl, [{
      key: "size",
      get: function get() {
        return this.stack.length;
      }
    }]);
    return StackImpl;
  }();

  _exports.Stack = StackImpl;

  function clearElement(parent) {
    var current = parent.firstChild;

    while (current) {
      var next = current.nextSibling;
      parent.removeChild(current);
      current = next;
    }
  }

  var SERIALIZATION_FIRST_NODE_STRING = '%+b:0%';
  _exports.SERIALIZATION_FIRST_NODE_STRING = SERIALIZATION_FIRST_NODE_STRING;

  function isSerializationFirstNode(node) {
    return node.nodeValue === SERIALIZATION_FIRST_NODE_STRING;
  }

  var _a;

  var objKeys = Object.keys;

  function assignFn(obj) {
    for (var i = 1; i < arguments.length; i++) {
      var assignment = arguments[i];
      if (assignment === null || typeof assignment !== 'object') continue;

      var _keys = objKeys(assignment);

      for (var j = 0; j < _keys.length; j++) {
        var key = _keys[j];
        obj[key] = assignment[key];
      }
    }

    return obj;
  }

  var assign = (_a = Object.assign) !== null && _a !== void 0 ? _a : assignFn;
  _exports.assign = assign;

  function fillNulls(count) {
    var arr = new Array(count);

    for (var i = 0; i < count; i++) {
      arr[i] = null;
    }

    return arr;
  }

  function values(obj) {
    var vals = [];

    for (var key in obj) {
      vals.push(obj[key]);
    }

    return vals;
  }
  /**
    Strongly hint runtimes to intern the provided string.
  
    When do I need to use this function?
  
    For the most part, never. Pre-mature optimization is bad, and often the
    runtime does exactly what you need it to, and more often the trade-off isn't
    worth it.
  
    Why?
  
    Runtimes store strings in at least 2 different representations:
    Ropes and Symbols (interned strings). The Rope provides a memory efficient
    data-structure for strings created from concatenation or some other string
    manipulation like splitting.
  
    Unfortunately checking equality of different ropes can be quite costly as
    runtimes must resort to clever string comparison algorithms. These
    algorithms typically cost in proportion to the length of the string.
    Luckily, this is where the Symbols (interned strings) shine. As Symbols are
    unique by their string content, equality checks can be done by pointer
    comparison.
  
    How do I know if my string is a rope or symbol?
  
    Typically (warning general sweeping statement, but truthy in runtimes at
    present) static strings created as part of the JS source are interned.
    Strings often used for comparisons can be interned at runtime if some
    criteria are met.  One of these criteria can be the size of the entire rope.
    For example, in chrome 38 a rope longer then 12 characters will not
    intern, nor will segments of that rope.
  
    Some numbers: http://jsperf.com/eval-vs-keys/8
  
    Known Trick™
  
    @private
    @return {String} interned version of the provided string
  */


  function intern(str) {
    var obj = {};
    obj[str] = 1;

    for (var key in obj) {
      if (key === str) {
        return key;
      }
    }

    return str;
  }

  var HAS_NATIVE_PROXY = typeof Proxy === 'function';
  _exports.HAS_NATIVE_PROXY = HAS_NATIVE_PROXY;

  var HAS_NATIVE_SYMBOL = function () {
    if (typeof Symbol !== 'function') {
      return false;
    } // eslint-disable-next-line symbol-description


    return typeof Symbol() === 'symbol';
  }();

  _exports.HAS_NATIVE_SYMBOL = HAS_NATIVE_SYMBOL;

  function keys(obj) {
    return Object.keys(obj);
  }

  function unwrap(val) {
    if (val === null || val === undefined) throw new Error("Expected value to be present");
    return val;
  }

  function expect(val, message) {
    if (val === null || val === undefined) throw new Error(message);
    return val;
  }

  function unreachable(message) {
    if (message === void 0) {
      message = 'unreachable';
    }

    return new Error(message);
  }

  function exhausted(value) {
    throw new Error("Exhausted " + value);
  }

  var tuple = function tuple() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return args;
  };

  _exports.tuple = tuple;

  function enumerableSymbol(key) {
    return intern("__" + key + Math.floor(Math.random() * Date.now()) + "__");
  }

  var symbol = HAS_NATIVE_SYMBOL ? Symbol : enumerableSymbol;
  _exports.symbol = symbol;

  function strip(strings) {
    var out = '';

    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    for (var i = 0; i < strings.length; i++) {
      var string = strings[i];
      var dynamic = args[i] !== undefined ? String(args[i]) : '';
      out += "" + string + dynamic;
    }

    var lines = out.split('\n');

    while (lines.length && lines[0].match(/^\s*$/)) {
      lines.shift();
    }

    while (lines.length && lines[lines.length - 1].match(/^\s*$/)) {
      lines.pop();
    }

    var min = Infinity;

    for (var _iterator = (0, _emberBabel.createForOfIteratorHelperLoose)(lines), _step; !(_step = _iterator()).done;) {
      var _line2 = _step.value;

      var _leading = _line2.match(/^\s*/)[0].length;

      min = Math.min(min, _leading);
    }

    var stripped = [];

    for (var _iterator2 = (0, _emberBabel.createForOfIteratorHelperLoose)(lines), _step2; !(_step2 = _iterator2()).done;) {
      var _line3 = _step2.value;
      stripped.push(_line3.slice(min));
    }

    return stripped.join('\n');
  }

  function isHandle(value) {
    return value >= 0;
  }

  function isNonPrimitiveHandle(value) {
    return value > 3
    /* ENCODED_UNDEFINED_HANDLE */
    ;
  }

  function constants() {
    for (var _len3 = arguments.length, values = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      values[_key3] = arguments[_key3];
    }

    return [false, true, null, undefined].concat(values);
  }

  function isSmallInt(value) {
    return value % 1 === 0 && value <= 536870911
    /* MAX_INT */
    && value >= -536870912
    /* MIN_INT */
    ;
  }

  function encodeNegative(num) {
    return num & -536870913
    /* SIGN_BIT */
    ;
  }

  function decodeNegative(num) {
    return num | ~-536870913
    /* SIGN_BIT */
    ;
  }

  function encodePositive(num) {
    return ~num;
  }

  function decodePositive(num) {
    return ~num;
  }

  function encodeHandle(num) {
    return num;
  }

  function decodeHandle(num) {
    return num;
  }

  function encodeImmediate(num) {
    num |= 0;
    return num < 0 ? encodeNegative(num) : encodePositive(num);
  }

  function decodeImmediate(num) {
    num |= 0;
    return num > -536870913
    /* SIGN_BIT */
    ? decodePositive(num) : decodeNegative(num);
  } // Warm


  [1, -1].forEach(function (x) {
    return decodeImmediate(encodeImmediate(x));
  });

  function unwrapHandle(handle) {
    if (typeof handle === 'number') {
      return handle;
    } else {
      var error = handle.errors[0];
      throw new Error("Compile Error: " + error.problem + " @ " + error.span.start + ".." + error.span.end);
    }
  }

  function unwrapTemplate(template) {
    if (template.result === 'error') {
      throw new Error("Compile Error: " + template.problem + " @ " + template.span.start + ".." + template.span.end);
    }

    return template;
  }

  function extractHandle(handle) {
    if (typeof handle === 'number') {
      return handle;
    } else {
      return handle.handle;
    }
  }

  function isOkHandle(handle) {
    return typeof handle === 'number';
  }

  function isErrHandle(handle) {
    return typeof handle === 'number';
  }

  var weakSet = typeof WeakSet === 'function' ? WeakSet : /*#__PURE__*/function () {
    function WeakSetPolyFill() {
      this._map = new WeakMap();
    }

    var _proto2 = WeakSetPolyFill.prototype;

    _proto2.add = function add(val) {
      this._map.set(val, true);

      return this;
    };

    _proto2.delete = function _delete(val) {
      return this._map.delete(val);
    };

    _proto2.has = function has(val) {
      return this._map.has(val);
    };

    return WeakSetPolyFill;
  }();
  _exports._WeakSet = weakSet;

  function castToSimple(node) {
    if (isDocument(node)) {
      return node;
    } else if (isElement(node)) {
      return node;
    } else {
      return node;
    }
  }

  function castToBrowser(node, sugaryCheck) {
    if (node === null || node === undefined) {
      return null;
    }

    if (typeof document === undefined) {
      throw new Error('Attempted to cast to a browser node in a non-browser context');
    }

    if (isDocument(node)) {
      return node;
    }

    if (node.ownerDocument !== document) {
      throw new Error('Attempted to cast to a browser node with a node that was not created from this document');
    }

    return checkNode(node, sugaryCheck);
  }

  function checkError(from, check) {
    return new Error("cannot cast a " + from + " into " + check);
  }

  function isDocument(node) {
    return node.nodeType === 9
    /* DOCUMENT_NODE */
    ;
  }

  function isElement(node) {
    return node.nodeType === 1
    /* ELEMENT_NODE */
    ;
  }

  function checkNode(node, check) {
    var isMatch = false;

    if (node !== null) {
      if (typeof check === 'string') {
        isMatch = stringCheckNode(node, check);
      } else if (Array.isArray(check)) {
        isMatch = check.some(function (c) {
          return stringCheckNode(node, c);
        });
      } else {
        throw unreachable();
      }
    }

    if (isMatch) {
      return node;
    } else {
      throw checkError("SimpleElement(" + node + ")", check);
    }
  }

  function stringCheckNode(node, check) {
    switch (check) {
      case 'NODE':
        return true;

      case 'HTML':
        return node instanceof HTMLElement;

      case 'SVG':
        return node instanceof SVGElement;

      case 'ELEMENT':
        return node instanceof Element;

      default:
        if (check.toUpperCase() === check) {
          throw new Error("BUG: this code is missing handling for a generic node type");
        }

        return node instanceof Element && node.tagName.toLowerCase() === check;
    }
  }

  function isPresent(list) {
    return list.length > 0;
  }

  function ifPresent(list, ifPresent, otherwise) {
    if (isPresent(list)) {
      return ifPresent(list);
    } else {
      return otherwise();
    }
  }

  function toPresentOption(list) {
    if (isPresent(list)) {
      return list;
    } else {
      return null;
    }
  }

  function assertPresent(list, message) {
    if (message === void 0) {
      message = "unexpected empty list";
    }

    if (!isPresent(list)) {
      throw new Error(message);
    }
  }

  function mapPresent(list, callback) {
    if (list === null) {
      return null;
    }

    var out = [];

    for (var _iterator3 = (0, _emberBabel.createForOfIteratorHelperLoose)(list), _step3; !(_step3 = _iterator3()).done;) {
      var _item = _step3.value;
      out.push(callback(_item));
    }

    return out;
  }

  function buildUntouchableThis(source) {
    var context = null;

    if (true
    /* DEBUG */
    && HAS_NATIVE_PROXY) {
      var assertOnProperty = function assertOnProperty(property) {
        throw new Error("You accessed `this." + String(property) + "` from a function passed to the " + source + ", but the function itself was not bound to a valid `this` context. Consider updating to use a bound function (for instance, use an arrow function, `() => {}`).");
      };

      context = new Proxy({}, {
        get: function get(_target, property) {
          assertOnProperty(property);
        },
        set: function set(_target, property) {
          assertOnProperty(property);
          return false;
        },
        has: function has(_target, property) {
          assertOnProperty(property);
          return false;
        }
      });
    }

    return context;
  }

  var debugToString;

  if (true
  /* DEBUG */
  ) {
    var getFunctionName = function getFunctionName(fn) {
      var functionName = fn.name;

      if (functionName === undefined) {
        var match = Function.prototype.toString.call(fn).match(/function (\w+)\s*\(/);
        functionName = match && match[1] || '';
      }

      return functionName.replace(/^bound /, '');
    };

    var getObjectName = function getObjectName(obj) {
      var name;
      var className;

      if (obj.constructor && typeof obj.constructor === 'function') {
        className = getFunctionName(obj.constructor);
      }

      if ('toString' in obj && obj.toString !== Object.prototype.toString && obj.toString !== Function.prototype.toString) {
        name = obj.toString();
      } // If the class has a decent looking name, and the `toString` is one of the
      // default Ember toStrings, replace the constructor portion of the toString
      // with the class name. We check the length of the class name to prevent doing
      // this when the value is minified.


      if (name && name.match(/<.*:ember\d+>/) && className && className[0] !== '_' && className.length > 2 && className !== 'Class') {
        return name.replace(/<.*:/, "<" + className + ":");
      }

      return name || className;
    };

    var getPrimitiveName = function getPrimitiveName(value) {
      return String(value);
    };

    debugToString = function debugToString(value) {
      if (typeof value === 'function') {
        return getFunctionName(value) || "(unknown function)";
      } else if (typeof value === 'object' && value !== null) {
        return getObjectName(value) || "(unknown object)";
      } else {
        return getPrimitiveName(value);
      }
    };
  }

  var debugToString$1 = debugToString;
  _exports.debugToString = debugToString$1;
  var beginTestSteps;
  _exports.beginTestSteps = beginTestSteps;
  var endTestSteps;
  _exports.endTestSteps = endTestSteps;
  var verifySteps;
  _exports.verifySteps = verifySteps;
  var logStep;
  /**
   * This constant exists to make it easier to differentiate normal logs from
   * errant console.logs. LOCAL_LOGGER should only be used inside a
   * LOCAL_SHOULD_LOG check.
   *
   * It does not alleviate the need to check LOCAL_SHOULD_LOG, which is used
   * for stripping.
   */

  _exports.logStep = logStep;
  var LOCAL_LOGGER = console;
  /**
   * This constant exists to make it easier to differentiate normal logs from
   * errant console.logs. LOGGER can be used outside of LOCAL_SHOULD_LOG checks,
   * and is meant to be used in the rare situation where a console.* call is
   * actually appropriate.
   */

  _exports.LOCAL_LOGGER = LOCAL_LOGGER;
  var LOGGER = console;
  _exports.LOGGER = LOGGER;

  function assertNever(value, desc) {
    if (desc === void 0) {
      desc = 'unexpected unreachable branch';
    }

    LOGGER.log('unreachable', value);
    LOGGER.log(desc + " :: " + JSON.stringify(value) + " (" + value + ")");
    throw new Error("code reached unreachable");
  }
});
define("@glimmer/wire-format", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.is = is;
  _exports.isAttribute = isAttribute;
  _exports.isStringLiteral = isStringLiteral;
  _exports.getStringFromValue = getStringFromValue;
  _exports.isArgument = isArgument;
  _exports.isHelper = isHelper;
  _exports.isGet = _exports.isFlushElement = void 0;

  function is(variant) {
    return function (value) {
      return Array.isArray(value) && value[0] === variant;
    };
  } // Statements


  var isFlushElement = is(12
  /* FlushElement */
  );
  _exports.isFlushElement = isFlushElement;

  function isAttribute(val) {
    return val[0] === 14
    /* StaticAttr */
    || val[0] === 15
    /* DynamicAttr */
    || val[0] === 22
    /* TrustingDynamicAttr */
    || val[0] === 16
    /* ComponentAttr */
    || val[0] === 24
    /* StaticComponentAttr */
    || val[0] === 23
    /* TrustingComponentAttr */
    || val[0] === 17
    /* AttrSplat */
    || val[0] === 4
    /* Modifier */
    ;
  }

  function isStringLiteral(expr) {
    return typeof expr === 'string';
  }

  function getStringFromValue(expr) {
    return expr;
  }

  function isArgument(val) {
    return val[0] === 21
    /* StaticArg */
    || val[0] === 20
    /* DynamicArg */
    ;
  }

  function isHelper(expr) {
    return Array.isArray(expr) && expr[0] === 28
    /* Call */
    ;
  } // Expressions


  var isGet = is(30
  /* GetSymbol */
  );
  _exports.isGet = isGet;
});
define("@handlebars/parser/index", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.Visitor = Visitor;
  _exports.WhitespaceControl = WhitespaceControl;
  _exports.Exception = Exception;
  _exports.print = print;
  _exports.PrintVisitor = PrintVisitor;
  _exports.parse = parse;
  _exports.parseWithoutProcessing = parseWithoutProcessing;
  _exports.parser = void 0;
  var errorProps = ['description', 'fileName', 'lineNumber', 'endLineNumber', 'message', 'name', 'number', 'stack'];

  function Exception(message, node) {
    var loc = node && node.loc,
        line,
        endLineNumber,
        column,
        endColumn;

    if (loc) {
      line = loc.start.line;
      endLineNumber = loc.end.line;
      column = loc.start.column;
      endColumn = loc.end.column;
      message += ' - ' + line + ':' + column;
    }

    var tmp = Error.prototype.constructor.call(this, message); // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.

    for (var idx = 0; idx < errorProps.length; idx++) {
      this[errorProps[idx]] = tmp[errorProps[idx]];
    }
    /* istanbul ignore else */


    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, Exception);
    }

    try {
      if (loc) {
        this.lineNumber = line;
        this.endLineNumber = endLineNumber; // Work around issue under safari where we can't directly set the column value

        /* istanbul ignore next */

        if (Object.defineProperty) {
          Object.defineProperty(this, 'column', {
            value: column,
            enumerable: true
          });
          Object.defineProperty(this, 'endColumn', {
            value: endColumn,
            enumerable: true
          });
        } else {
          this.column = column;
          this.endColumn = endColumn;
        }
      }
    } catch (nop) {
      /* Ignore if the browser is very particular */
    }
  }

  Exception.prototype = new Error();

  function Visitor() {
    this.parents = [];
  }

  Visitor.prototype = {
    constructor: Visitor,
    mutating: false,
    // Visits a given value. If mutating, will replace the value if necessary.
    acceptKey: function acceptKey(node, name) {
      var value = this.accept(node[name]);

      if (this.mutating) {
        // Hacky sanity check: This may have a few false positives for type for the helper
        // methods but will generally do the right thing without a lot of overhead.
        if (value && !Visitor.prototype[value.type]) {
          throw new Exception('Unexpected node type "' + value.type + '" found when accepting ' + name + ' on ' + node.type);
        }

        node[name] = value;
      }
    },
    // Performs an accept operation with added sanity check to ensure
    // required keys are not removed.
    acceptRequired: function acceptRequired(node, name) {
      this.acceptKey(node, name);

      if (!node[name]) {
        throw new Exception(node.type + ' requires ' + name);
      }
    },
    // Traverses a given array. If mutating, empty respnses will be removed
    // for child elements.
    acceptArray: function acceptArray(array) {
      for (var i = 0, l = array.length; i < l; i++) {
        this.acceptKey(array, i);

        if (!array[i]) {
          array.splice(i, 1);
          i--;
          l--;
        }
      }
    },
    accept: function accept(object) {
      if (!object) {
        return;
      }
      /* istanbul ignore next: Sanity code */


      if (!this[object.type]) {
        throw new Exception('Unknown type: ' + object.type, object);
      }

      if (this.current) {
        this.parents.unshift(this.current);
      }

      this.current = object;
      var ret = this[object.type](object);
      this.current = this.parents.shift();

      if (!this.mutating || ret) {
        return ret;
      } else if (ret !== false) {
        return object;
      }
    },
    Program: function Program(program) {
      this.acceptArray(program.body);
    },
    MustacheStatement: visitSubExpression,
    Decorator: visitSubExpression,
    BlockStatement: visitBlock,
    DecoratorBlock: visitBlock,
    PartialStatement: visitPartial,
    PartialBlockStatement: function PartialBlockStatement(partial) {
      visitPartial.call(this, partial);
      this.acceptKey(partial, 'program');
    },
    ContentStatement: function ContentStatement()
    /* content */
    {},
    CommentStatement: function CommentStatement()
    /* comment */
    {},
    SubExpression: visitSubExpression,
    PathExpression: function PathExpression()
    /* path */
    {},
    StringLiteral: function StringLiteral()
    /* string */
    {},
    NumberLiteral: function NumberLiteral()
    /* number */
    {},
    BooleanLiteral: function BooleanLiteral()
    /* bool */
    {},
    UndefinedLiteral: function UndefinedLiteral()
    /* literal */
    {},
    NullLiteral: function NullLiteral()
    /* literal */
    {},
    Hash: function Hash(hash) {
      this.acceptArray(hash.pairs);
    },
    HashPair: function HashPair(pair) {
      this.acceptRequired(pair, 'value');
    }
  };

  function visitSubExpression(mustache) {
    this.acceptRequired(mustache, 'path');
    this.acceptArray(mustache.params);
    this.acceptKey(mustache, 'hash');
  }

  function visitBlock(block) {
    visitSubExpression.call(this, block);
    this.acceptKey(block, 'program');
    this.acceptKey(block, 'inverse');
  }

  function visitPartial(partial) {
    this.acceptRequired(partial, 'name');
    this.acceptArray(partial.params);
    this.acceptKey(partial, 'hash');
  }

  function WhitespaceControl(options) {
    if (options === void 0) {
      options = {};
    }

    this.options = options;
  }

  WhitespaceControl.prototype = new Visitor();

  WhitespaceControl.prototype.Program = function (program) {
    var doStandalone = !this.options.ignoreStandalone;
    var isRoot = !this.isRootSeen;
    this.isRootSeen = true;
    var body = program.body;

    for (var i = 0, l = body.length; i < l; i++) {
      var current = body[i],
          strip = this.accept(current);

      if (!strip) {
        continue;
      }

      var _isPrevWhitespace = isPrevWhitespace(body, i, isRoot),
          _isNextWhitespace = isNextWhitespace(body, i, isRoot),
          openStandalone = strip.openStandalone && _isPrevWhitespace,
          closeStandalone = strip.closeStandalone && _isNextWhitespace,
          inlineStandalone = strip.inlineStandalone && _isPrevWhitespace && _isNextWhitespace;

      if (strip.close) {
        omitRight(body, i, true);
      }

      if (strip.open) {
        omitLeft(body, i, true);
      }

      if (doStandalone && inlineStandalone) {
        omitRight(body, i);

        if (omitLeft(body, i)) {
          // If we are on a standalone node, save the indent info for partials
          if (current.type === 'PartialStatement') {
            // Pull out the whitespace from the final line
            current.indent = /([ \t]+$)/.exec(body[i - 1].original)[1];
          }
        }
      }

      if (doStandalone && openStandalone) {
        omitRight((current.program || current.inverse).body); // Strip out the previous content node if it's whitespace only

        omitLeft(body, i);
      }

      if (doStandalone && closeStandalone) {
        // Always strip the next node
        omitRight(body, i);
        omitLeft((current.inverse || current.program).body);
      }
    }

    return program;
  };

  WhitespaceControl.prototype.BlockStatement = WhitespaceControl.prototype.DecoratorBlock = WhitespaceControl.prototype.PartialBlockStatement = function (block) {
    this.accept(block.program);
    this.accept(block.inverse); // Find the inverse program that is involed with whitespace stripping.

    var program = block.program || block.inverse,
        inverse = block.program && block.inverse,
        firstInverse = inverse,
        lastInverse = inverse;

    if (inverse && inverse.chained) {
      firstInverse = inverse.body[0].program; // Walk the inverse chain to find the last inverse that is actually in the chain.

      while (lastInverse.chained) {
        lastInverse = lastInverse.body[lastInverse.body.length - 1].program;
      }
    }

    var strip = {
      open: block.openStrip.open,
      close: block.closeStrip.close,
      // Determine the standalone candiacy. Basically flag our content as being possibly standalone
      // so our parent can determine if we actually are standalone
      openStandalone: isNextWhitespace(program.body),
      closeStandalone: isPrevWhitespace((firstInverse || program).body)
    };

    if (block.openStrip.close) {
      omitRight(program.body, null, true);
    }

    if (inverse) {
      var inverseStrip = block.inverseStrip;

      if (inverseStrip.open) {
        omitLeft(program.body, null, true);
      }

      if (inverseStrip.close) {
        omitRight(firstInverse.body, null, true);
      }

      if (block.closeStrip.open) {
        omitLeft(lastInverse.body, null, true);
      } // Find standalone else statments


      if (!this.options.ignoreStandalone && isPrevWhitespace(program.body) && isNextWhitespace(firstInverse.body)) {
        omitLeft(program.body);
        omitRight(firstInverse.body);
      }
    } else if (block.closeStrip.open) {
      omitLeft(program.body, null, true);
    }

    return strip;
  };

  WhitespaceControl.prototype.Decorator = WhitespaceControl.prototype.MustacheStatement = function (mustache) {
    return mustache.strip;
  };

  WhitespaceControl.prototype.PartialStatement = WhitespaceControl.prototype.CommentStatement = function (node) {
    /* istanbul ignore next */
    var strip = node.strip || {};
    return {
      inlineStandalone: true,
      open: strip.open,
      close: strip.close
    };
  };

  function isPrevWhitespace(body, i, isRoot) {
    if (i === undefined) {
      i = body.length;
    } // Nodes that end with newlines are considered whitespace (but are special
    // cased for strip operations)


    var prev = body[i - 1],
        sibling = body[i - 2];

    if (!prev) {
      return isRoot;
    }

    if (prev.type === 'ContentStatement') {
      return (sibling || !isRoot ? /\r?\n\s*?$/ : /(^|\r?\n)\s*?$/).test(prev.original);
    }
  }

  function isNextWhitespace(body, i, isRoot) {
    if (i === undefined) {
      i = -1;
    }

    var next = body[i + 1],
        sibling = body[i + 2];

    if (!next) {
      return isRoot;
    }

    if (next.type === 'ContentStatement') {
      return (sibling || !isRoot ? /^\s*?\r?\n/ : /^\s*?(\r?\n|$)/).test(next.original);
    }
  } // Marks the node to the right of the position as omitted.
  // I.e. {{foo}}' ' will mark the ' ' node as omitted.
  //
  // If i is undefined, then the first child will be marked as such.
  //
  // If multiple is truthy then all whitespace will be stripped out until non-whitespace
  // content is met.


  function omitRight(body, i, multiple) {
    var current = body[i == null ? 0 : i + 1];

    if (!current || current.type !== 'ContentStatement' || !multiple && current.rightStripped) {
      return;
    }

    var original = current.value;
    current.value = current.value.replace(multiple ? /^\s+/ : /^[ \t]*\r?\n?/, '');
    current.rightStripped = current.value !== original;
  } // Marks the node to the left of the position as omitted.
  // I.e. ' '{{foo}} will mark the ' ' node as omitted.
  //
  // If i is undefined then the last child will be marked as such.
  //
  // If multiple is truthy then all whitespace will be stripped out until non-whitespace
  // content is met.


  function omitLeft(body, i, multiple) {
    var current = body[i == null ? body.length - 1 : i - 1];

    if (!current || current.type !== 'ContentStatement' || !multiple && current.leftStripped) {
      return;
    } // We omit the last node if it's whitespace only and not preceded by a non-content node.


    var original = current.value;
    current.value = current.value.replace(multiple ? /\s+$/ : /[ \t]+$/, '');
    current.leftStripped = current.value !== original;
    return current.leftStripped;
  }
  /* parser generated by jison 0.4.18 */

  /*
    Returns a Parser object of the following structure:
  
    Parser: {
      yy: {}
    }
  
    Parser.prototype: {
      yy: {},
      trace: function(),
      symbols_: {associative list: name ==> number},
      terminals_: {associative list: number ==> name},
      productions_: [...],
      performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
      table: [...],
      defaultActions: {...},
      parseError: function(str, hash),
      parse: function(input),
  
      lexer: {
          EOF: 1,
          parseError: function(str, hash),
          setInput: function(input),
          input: function(),
          unput: function(str),
          more: function(),
          less: function(n),
          pastInput: function(),
          upcomingInput: function(),
          showPosition: function(),
          test_match: function(regex_match_array, rule_index),
          next: function(),
          lex: function(),
          begin: function(condition),
          popState: function(),
          _currentRules: function(),
          topState: function(),
          pushState: function(condition),
  
          options: {
              ranges: boolean           (optional: true ==> token location info will include a .range[] member)
              flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
              backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
          },
  
          performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
          rules: [...],
          conditions: {associative list: name ==> set},
      }
    }
  
  
    token location info (@$, _$, etc.): {
      first_line: n,
      last_line: n,
      first_column: n,
      last_column: n,
      range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
    }
  
  
    the parseError function receives a 'hash' object with these members for lexer and parser errors: {
      text:        (matched text)
      token:       (the produced terminal token, if any)
      line:        (yylineno)
    }
    while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
      loc:         (yylloc)
      expected:    (string describing the set of expected tokens)
      recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
    }
  */


  var parser = function () {
    var o = function o(k, v, _o, l) {
      for (_o = _o || {}, l = k.length; l--; _o[k[l]] = v) {
        ;
      }

      return _o;
    },
        $V0 = [2, 44],
        $V1 = [1, 20],
        $V2 = [5, 14, 15, 19, 29, 34, 39, 44, 47, 48, 52, 56, 60],
        $V3 = [1, 35],
        $V4 = [1, 38],
        $V5 = [1, 30],
        $V6 = [1, 31],
        $V7 = [1, 32],
        $V8 = [1, 33],
        $V9 = [1, 34],
        $Va = [1, 37],
        $Vb = [14, 15, 19, 29, 34, 39, 44, 47, 48, 52, 56, 60],
        $Vc = [14, 15, 19, 29, 34, 44, 47, 48, 52, 56, 60],
        $Vd = [15, 18],
        $Ve = [14, 15, 19, 29, 34, 47, 48, 52, 56, 60],
        $Vf = [33, 64, 71, 79, 80, 81, 82, 83, 84],
        $Vg = [23, 33, 55, 64, 67, 71, 74, 79, 80, 81, 82, 83, 84],
        $Vh = [1, 51],
        $Vi = [23, 33, 55, 64, 67, 71, 74, 79, 80, 81, 82, 83, 84, 86],
        $Vj = [2, 43],
        $Vk = [55, 64, 71, 79, 80, 81, 82, 83, 84],
        $Vl = [1, 58],
        $Vm = [1, 59],
        $Vn = [1, 66],
        $Vo = [33, 64, 71, 74, 79, 80, 81, 82, 83, 84],
        $Vp = [23, 64, 71, 79, 80, 81, 82, 83, 84],
        $Vq = [1, 76],
        $Vr = [64, 67, 71, 79, 80, 81, 82, 83, 84],
        $Vs = [33, 74],
        $Vt = [23, 33, 55, 67, 71, 74],
        $Vu = [1, 106],
        $Vv = [1, 118],
        $Vw = [71, 76];

    var parser = {
      trace: function trace() {},
      yy: {},
      symbols_: {
        "error": 2,
        "root": 3,
        "program": 4,
        "EOF": 5,
        "program_repetition0": 6,
        "statement": 7,
        "mustache": 8,
        "block": 9,
        "rawBlock": 10,
        "partial": 11,
        "partialBlock": 12,
        "content": 13,
        "COMMENT": 14,
        "CONTENT": 15,
        "openRawBlock": 16,
        "rawBlock_repetition0": 17,
        "END_RAW_BLOCK": 18,
        "OPEN_RAW_BLOCK": 19,
        "helperName": 20,
        "openRawBlock_repetition0": 21,
        "openRawBlock_option0": 22,
        "CLOSE_RAW_BLOCK": 23,
        "openBlock": 24,
        "block_option0": 25,
        "closeBlock": 26,
        "openInverse": 27,
        "block_option1": 28,
        "OPEN_BLOCK": 29,
        "openBlock_repetition0": 30,
        "openBlock_option0": 31,
        "openBlock_option1": 32,
        "CLOSE": 33,
        "OPEN_INVERSE": 34,
        "openInverse_repetition0": 35,
        "openInverse_option0": 36,
        "openInverse_option1": 37,
        "openInverseChain": 38,
        "OPEN_INVERSE_CHAIN": 39,
        "openInverseChain_repetition0": 40,
        "openInverseChain_option0": 41,
        "openInverseChain_option1": 42,
        "inverseAndProgram": 43,
        "INVERSE": 44,
        "inverseChain": 45,
        "inverseChain_option0": 46,
        "OPEN_ENDBLOCK": 47,
        "OPEN": 48,
        "expr": 49,
        "mustache_repetition0": 50,
        "mustache_option0": 51,
        "OPEN_UNESCAPED": 52,
        "mustache_repetition1": 53,
        "mustache_option1": 54,
        "CLOSE_UNESCAPED": 55,
        "OPEN_PARTIAL": 56,
        "partial_repetition0": 57,
        "partial_option0": 58,
        "openPartialBlock": 59,
        "OPEN_PARTIAL_BLOCK": 60,
        "openPartialBlock_repetition0": 61,
        "openPartialBlock_option0": 62,
        "sexpr": 63,
        "OPEN_SEXPR": 64,
        "sexpr_repetition0": 65,
        "sexpr_option0": 66,
        "CLOSE_SEXPR": 67,
        "hash": 68,
        "hash_repetition_plus0": 69,
        "hashSegment": 70,
        "ID": 71,
        "EQUALS": 72,
        "blockParams": 73,
        "OPEN_BLOCK_PARAMS": 74,
        "blockParams_repetition_plus0": 75,
        "CLOSE_BLOCK_PARAMS": 76,
        "path": 77,
        "dataName": 78,
        "STRING": 79,
        "NUMBER": 80,
        "BOOLEAN": 81,
        "UNDEFINED": 82,
        "NULL": 83,
        "DATA": 84,
        "pathSegments": 85,
        "SEP": 86,
        "$accept": 0,
        "$end": 1
      },
      terminals_: {
        2: "error",
        5: "EOF",
        14: "COMMENT",
        15: "CONTENT",
        18: "END_RAW_BLOCK",
        19: "OPEN_RAW_BLOCK",
        23: "CLOSE_RAW_BLOCK",
        29: "OPEN_BLOCK",
        33: "CLOSE",
        34: "OPEN_INVERSE",
        39: "OPEN_INVERSE_CHAIN",
        44: "INVERSE",
        47: "OPEN_ENDBLOCK",
        48: "OPEN",
        52: "OPEN_UNESCAPED",
        55: "CLOSE_UNESCAPED",
        56: "OPEN_PARTIAL",
        60: "OPEN_PARTIAL_BLOCK",
        64: "OPEN_SEXPR",
        67: "CLOSE_SEXPR",
        71: "ID",
        72: "EQUALS",
        74: "OPEN_BLOCK_PARAMS",
        76: "CLOSE_BLOCK_PARAMS",
        79: "STRING",
        80: "NUMBER",
        81: "BOOLEAN",
        82: "UNDEFINED",
        83: "NULL",
        84: "DATA",
        86: "SEP"
      },
      productions_: [0, [3, 2], [4, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [13, 1], [10, 3], [16, 5], [9, 4], [9, 4], [24, 6], [27, 6], [38, 6], [43, 2], [45, 3], [45, 1], [26, 3], [8, 5], [8, 5], [11, 5], [12, 3], [59, 5], [49, 1], [49, 1], [63, 5], [68, 1], [70, 3], [73, 3], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [78, 2], [77, 1], [85, 3], [85, 1], [6, 0], [6, 2], [17, 0], [17, 2], [21, 0], [21, 2], [22, 0], [22, 1], [25, 0], [25, 1], [28, 0], [28, 1], [30, 0], [30, 2], [31, 0], [31, 1], [32, 0], [32, 1], [35, 0], [35, 2], [36, 0], [36, 1], [37, 0], [37, 1], [40, 0], [40, 2], [41, 0], [41, 1], [42, 0], [42, 1], [46, 0], [46, 1], [50, 0], [50, 2], [51, 0], [51, 1], [53, 0], [53, 2], [54, 0], [54, 1], [57, 0], [57, 2], [58, 0], [58, 1], [61, 0], [61, 2], [62, 0], [62, 1], [65, 0], [65, 2], [66, 0], [66, 1], [69, 1], [69, 2], [75, 1], [75, 2]],
      performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate
      /* action[1] */
      , $$
      /* vstack */
      , _$
      /* lstack */
      ) {
        /* this == yyval */
        var $0 = $$.length - 1;

        switch (yystate) {
          case 1:
            return $$[$0 - 1];
            break;

          case 2:
            this.$ = yy.prepareProgram($$[$0]);
            break;

          case 3:
          case 4:
          case 5:
          case 6:
          case 7:
          case 8:
          case 20:
          case 27:
          case 28:
          case 33:
          case 34:
            this.$ = $$[$0];
            break;

          case 9:
            this.$ = {
              type: 'CommentStatement',
              value: yy.stripComment($$[$0]),
              strip: yy.stripFlags($$[$0], $$[$0]),
              loc: yy.locInfo(this._$)
            };
            break;

          case 10:
            this.$ = {
              type: 'ContentStatement',
              original: $$[$0],
              value: $$[$0],
              loc: yy.locInfo(this._$)
            };
            break;

          case 11:
            this.$ = yy.prepareRawBlock($$[$0 - 2], $$[$0 - 1], $$[$0], this._$);
            break;

          case 12:
            this.$ = {
              path: $$[$0 - 3],
              params: $$[$0 - 2],
              hash: $$[$0 - 1]
            };
            break;

          case 13:
            this.$ = yy.prepareBlock($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0], false, this._$);
            break;

          case 14:
            this.$ = yy.prepareBlock($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0], true, this._$);
            break;

          case 15:
            this.$ = {
              open: $$[$0 - 5],
              path: $$[$0 - 4],
              params: $$[$0 - 3],
              hash: $$[$0 - 2],
              blockParams: $$[$0 - 1],
              strip: yy.stripFlags($$[$0 - 5], $$[$0])
            };
            break;

          case 16:
          case 17:
            this.$ = {
              path: $$[$0 - 4],
              params: $$[$0 - 3],
              hash: $$[$0 - 2],
              blockParams: $$[$0 - 1],
              strip: yy.stripFlags($$[$0 - 5], $$[$0])
            };
            break;

          case 18:
            this.$ = {
              strip: yy.stripFlags($$[$0 - 1], $$[$0 - 1]),
              program: $$[$0]
            };
            break;

          case 19:
            var inverse = yy.prepareBlock($$[$0 - 2], $$[$0 - 1], $$[$0], $$[$0], false, this._$),
                program = yy.prepareProgram([inverse], $$[$0 - 1].loc);
            program.chained = true;
            this.$ = {
              strip: $$[$0 - 2].strip,
              program: program,
              chain: true
            };
            break;

          case 21:
            this.$ = {
              path: $$[$0 - 1],
              strip: yy.stripFlags($$[$0 - 2], $$[$0])
            };
            break;

          case 22:
          case 23:
            this.$ = yy.prepareMustache($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0 - 4], yy.stripFlags($$[$0 - 4], $$[$0]), this._$);
            break;

          case 24:
            this.$ = {
              type: 'PartialStatement',
              name: $$[$0 - 3],
              params: $$[$0 - 2],
              hash: $$[$0 - 1],
              indent: '',
              strip: yy.stripFlags($$[$0 - 4], $$[$0]),
              loc: yy.locInfo(this._$)
            };
            break;

          case 25:
            this.$ = yy.preparePartialBlock($$[$0 - 2], $$[$0 - 1], $$[$0], this._$);
            break;

          case 26:
            this.$ = {
              path: $$[$0 - 3],
              params: $$[$0 - 2],
              hash: $$[$0 - 1],
              strip: yy.stripFlags($$[$0 - 4], $$[$0])
            };
            break;

          case 29:
            this.$ = {
              type: 'SubExpression',
              path: $$[$0 - 3],
              params: $$[$0 - 2],
              hash: $$[$0 - 1],
              loc: yy.locInfo(this._$)
            };
            break;

          case 30:
            this.$ = {
              type: 'Hash',
              pairs: $$[$0],
              loc: yy.locInfo(this._$)
            };
            break;

          case 31:
            this.$ = {
              type: 'HashPair',
              key: yy.id($$[$0 - 2]),
              value: $$[$0],
              loc: yy.locInfo(this._$)
            };
            break;

          case 32:
            this.$ = yy.id($$[$0 - 1]);
            break;

          case 35:
            this.$ = {
              type: 'StringLiteral',
              value: $$[$0],
              original: $$[$0],
              loc: yy.locInfo(this._$)
            };
            break;

          case 36:
            this.$ = {
              type: 'NumberLiteral',
              value: Number($$[$0]),
              original: Number($$[$0]),
              loc: yy.locInfo(this._$)
            };
            break;

          case 37:
            this.$ = {
              type: 'BooleanLiteral',
              value: $$[$0] === 'true',
              original: $$[$0] === 'true',
              loc: yy.locInfo(this._$)
            };
            break;

          case 38:
            this.$ = {
              type: 'UndefinedLiteral',
              original: undefined,
              value: undefined,
              loc: yy.locInfo(this._$)
            };
            break;

          case 39:
            this.$ = {
              type: 'NullLiteral',
              original: null,
              value: null,
              loc: yy.locInfo(this._$)
            };
            break;

          case 40:
            this.$ = yy.preparePath(true, $$[$0], this._$);
            break;

          case 41:
            this.$ = yy.preparePath(false, $$[$0], this._$);
            break;

          case 42:
            $$[$0 - 2].push({
              part: yy.id($$[$0]),
              original: $$[$0],
              separator: $$[$0 - 1]
            });
            this.$ = $$[$0 - 2];
            break;

          case 43:
            this.$ = [{
              part: yy.id($$[$0]),
              original: $$[$0]
            }];
            break;

          case 44:
          case 46:
          case 48:
          case 56:
          case 62:
          case 68:
          case 76:
          case 80:
          case 84:
          case 88:
          case 92:
            this.$ = [];
            break;

          case 45:
          case 47:
          case 49:
          case 57:
          case 63:
          case 69:
          case 77:
          case 81:
          case 85:
          case 89:
          case 93:
          case 97:
          case 99:
            $$[$0 - 1].push($$[$0]);
            break;

          case 96:
          case 98:
            this.$ = [$$[$0]];
            break;
        }
      },
      table: [o([5, 14, 15, 19, 29, 34, 48, 52, 56, 60], $V0, {
        3: 1,
        4: 2,
        6: 3
      }), {
        1: [3]
      }, {
        5: [1, 4]
      }, o([5, 39, 44, 47], [2, 2], {
        7: 5,
        8: 6,
        9: 7,
        10: 8,
        11: 9,
        12: 10,
        13: 11,
        24: 15,
        27: 16,
        16: 17,
        59: 19,
        14: [1, 12],
        15: $V1,
        19: [1, 23],
        29: [1, 21],
        34: [1, 22],
        48: [1, 13],
        52: [1, 14],
        56: [1, 18],
        60: [1, 24]
      }), {
        1: [2, 1]
      }, o($V2, [2, 45]), o($V2, [2, 3]), o($V2, [2, 4]), o($V2, [2, 5]), o($V2, [2, 6]), o($V2, [2, 7]), o($V2, [2, 8]), o($V2, [2, 9]), {
        20: 26,
        49: 25,
        63: 27,
        64: $V3,
        71: $V4,
        77: 28,
        78: 29,
        79: $V5,
        80: $V6,
        81: $V7,
        82: $V8,
        83: $V9,
        84: $Va,
        85: 36
      }, {
        20: 26,
        49: 39,
        63: 27,
        64: $V3,
        71: $V4,
        77: 28,
        78: 29,
        79: $V5,
        80: $V6,
        81: $V7,
        82: $V8,
        83: $V9,
        84: $Va,
        85: 36
      }, o($Vb, $V0, {
        6: 3,
        4: 40
      }), o($Vc, $V0, {
        6: 3,
        4: 41
      }), o($Vd, [2, 46], {
        17: 42
      }), {
        20: 26,
        49: 43,
        63: 27,
        64: $V3,
        71: $V4,
        77: 28,
        78: 29,
        79: $V5,
        80: $V6,
        81: $V7,
        82: $V8,
        83: $V9,
        84: $Va,
        85: 36
      }, o($Ve, $V0, {
        6: 3,
        4: 44
      }), o([5, 14, 15, 18, 19, 29, 34, 39, 44, 47, 48, 52, 56, 60], [2, 10]), {
        20: 45,
        71: $V4,
        77: 28,
        78: 29,
        79: $V5,
        80: $V6,
        81: $V7,
        82: $V8,
        83: $V9,
        84: $Va,
        85: 36
      }, {
        20: 46,
        71: $V4,
        77: 28,
        78: 29,
        79: $V5,
        80: $V6,
        81: $V7,
        82: $V8,
        83: $V9,
        84: $Va,
        85: 36
      }, {
        20: 47,
        71: $V4,
        77: 28,
        78: 29,
        79: $V5,
        80: $V6,
        81: $V7,
        82: $V8,
        83: $V9,
        84: $Va,
        85: 36
      }, {
        20: 26,
        49: 48,
        63: 27,
        64: $V3,
        71: $V4,
        77: 28,
        78: 29,
        79: $V5,
        80: $V6,
        81: $V7,
        82: $V8,
        83: $V9,
        84: $Va,
        85: 36
      }, o($Vf, [2, 76], {
        50: 49
      }), o($Vg, [2, 27]), o($Vg, [2, 28]), o($Vg, [2, 33]), o($Vg, [2, 34]), o($Vg, [2, 35]), o($Vg, [2, 36]), o($Vg, [2, 37]), o($Vg, [2, 38]), o($Vg, [2, 39]), {
        20: 26,
        49: 50,
        63: 27,
        64: $V3,
        71: $V4,
        77: 28,
        78: 29,
        79: $V5,
        80: $V6,
        81: $V7,
        82: $V8,
        83: $V9,
        84: $Va,
        85: 36
      }, o($Vg, [2, 41], {
        86: $Vh
      }), {
        71: $V4,
        85: 52
      }, o($Vi, $Vj), o($Vk, [2, 80], {
        53: 53
      }), {
        25: 54,
        38: 56,
        39: $Vl,
        43: 57,
        44: $Vm,
        45: 55,
        47: [2, 52]
      }, {
        28: 60,
        43: 61,
        44: $Vm,
        47: [2, 54]
      }, {
        13: 63,
        15: $V1,
        18: [1, 62]
      }, o($Vf, [2, 84], {
        57: 64
      }), {
        26: 65,
        47: $Vn
      }, o($Vo, [2, 56], {
        30: 67
      }), o($Vo, [2, 62], {
        35: 68
      }), o($Vp, [2, 48], {
        21: 69
      }), o($Vf, [2, 88], {
        61: 70
      }), {
        20: 26,
        33: [2, 78],
        49: 72,
        51: 71,
        63: 27,
        64: $V3,
        68: 73,
        69: 74,
        70: 75,
        71: $Vq,
        77: 28,
        78: 29,
        79: $V5,
        80: $V6,
        81: $V7,
        82: $V8,
        83: $V9,
        84: $Va,
        85: 36
      }, o($Vr, [2, 92], {
        65: 77
      }), {
        71: [1, 78]
      }, o($Vg, [2, 40], {
        86: $Vh
      }), {
        20: 26,
        49: 80,
        54: 79,
        55: [2, 82],
        63: 27,
        64: $V3,
        68: 81,
        69: 74,
        70: 75,
        71: $Vq,
        77: 28,
        78: 29,
        79: $V5,
        80: $V6,
        81: $V7,
        82: $V8,
        83: $V9,
        84: $Va,
        85: 36
      }, {
        26: 82,
        47: $Vn
      }, {
        47: [2, 53]
      }, o($Vb, $V0, {
        6: 3,
        4: 83
      }), {
        47: [2, 20]
      }, {
        20: 84,
        71: $V4,
        77: 28,
        78: 29,
        79: $V5,
        80: $V6,
        81: $V7,
        82: $V8,
        83: $V9,
        84: $Va,
        85: 36
      }, o($Ve, $V0, {
        6: 3,
        4: 85
      }), {
        26: 86,
        47: $Vn
      }, {
        47: [2, 55]
      }, o($V2, [2, 11]), o($Vd, [2, 47]), {
        20: 26,
        33: [2, 86],
        49: 88,
        58: 87,
        63: 27,
        64: $V3,
        68: 89,
        69: 74,
        70: 75,
        71: $Vq,
        77: 28,
        78: 29,
        79: $V5,
        80: $V6,
        81: $V7,
        82: $V8,
        83: $V9,
        84: $Va,
        85: 36
      }, o($V2, [2, 25]), {
        20: 90,
        71: $V4,
        77: 28,
        78: 29,
        79: $V5,
        80: $V6,
        81: $V7,
        82: $V8,
        83: $V9,
        84: $Va,
        85: 36
      }, o($Vs, [2, 58], {
        20: 26,
        63: 27,
        77: 28,
        78: 29,
        85: 36,
        69: 74,
        70: 75,
        31: 91,
        49: 92,
        68: 93,
        64: $V3,
        71: $Vq,
        79: $V5,
        80: $V6,
        81: $V7,
        82: $V8,
        83: $V9,
        84: $Va
      }), o($Vs, [2, 64], {
        20: 26,
        63: 27,
        77: 28,
        78: 29,
        85: 36,
        69: 74,
        70: 75,
        36: 94,
        49: 95,
        68: 96,
        64: $V3,
        71: $Vq,
        79: $V5,
        80: $V6,
        81: $V7,
        82: $V8,
        83: $V9,
        84: $Va
      }), {
        20: 26,
        22: 97,
        23: [2, 50],
        49: 98,
        63: 27,
        64: $V3,
        68: 99,
        69: 74,
        70: 75,
        71: $Vq,
        77: 28,
        78: 29,
        79: $V5,
        80: $V6,
        81: $V7,
        82: $V8,
        83: $V9,
        84: $Va,
        85: 36
      }, {
        20: 26,
        33: [2, 90],
        49: 101,
        62: 100,
        63: 27,
        64: $V3,
        68: 102,
        69: 74,
        70: 75,
        71: $Vq,
        77: 28,
        78: 29,
        79: $V5,
        80: $V6,
        81: $V7,
        82: $V8,
        83: $V9,
        84: $Va,
        85: 36
      }, {
        33: [1, 103]
      }, o($Vf, [2, 77]), {
        33: [2, 79]
      }, o([23, 33, 55, 67, 74], [2, 30], {
        70: 104,
        71: [1, 105]
      }), o($Vt, [2, 96]), o($Vi, $Vj, {
        72: $Vu
      }), {
        20: 26,
        49: 108,
        63: 27,
        64: $V3,
        66: 107,
        67: [2, 94],
        68: 109,
        69: 74,
        70: 75,
        71: $Vq,
        77: 28,
        78: 29,
        79: $V5,
        80: $V6,
        81: $V7,
        82: $V8,
        83: $V9,
        84: $Va,
        85: 36
      }, o($Vi, [2, 42]), {
        55: [1, 110]
      }, o($Vk, [2, 81]), {
        55: [2, 83]
      }, o($V2, [2, 13]), {
        38: 56,
        39: $Vl,
        43: 57,
        44: $Vm,
        45: 112,
        46: 111,
        47: [2, 74]
      }, o($Vo, [2, 68], {
        40: 113
      }), {
        47: [2, 18]
      }, o($V2, [2, 14]), {
        33: [1, 114]
      }, o($Vf, [2, 85]), {
        33: [2, 87]
      }, {
        33: [1, 115]
      }, {
        32: 116,
        33: [2, 60],
        73: 117,
        74: $Vv
      }, o($Vo, [2, 57]), o($Vs, [2, 59]), {
        33: [2, 66],
        37: 119,
        73: 120,
        74: $Vv
      }, o($Vo, [2, 63]), o($Vs, [2, 65]), {
        23: [1, 121]
      }, o($Vp, [2, 49]), {
        23: [2, 51]
      }, {
        33: [1, 122]
      }, o($Vf, [2, 89]), {
        33: [2, 91]
      }, o($V2, [2, 22]), o($Vt, [2, 97]), {
        72: $Vu
      }, {
        20: 26,
        49: 123,
        63: 27,
        64: $V3,
        71: $V4,
        77: 28,
        78: 29,
        79: $V5,
        80: $V6,
        81: $V7,
        82: $V8,
        83: $V9,
        84: $Va,
        85: 36
      }, {
        67: [1, 124]
      }, o($Vr, [2, 93]), {
        67: [2, 95]
      }, o($V2, [2, 23]), {
        47: [2, 19]
      }, {
        47: [2, 75]
      }, o($Vs, [2, 70], {
        20: 26,
        63: 27,
        77: 28,
        78: 29,
        85: 36,
        69: 74,
        70: 75,
        41: 125,
        49: 126,
        68: 127,
        64: $V3,
        71: $Vq,
        79: $V5,
        80: $V6,
        81: $V7,
        82: $V8,
        83: $V9,
        84: $Va
      }), o($V2, [2, 24]), o($V2, [2, 21]), {
        33: [1, 128]
      }, {
        33: [2, 61]
      }, {
        71: [1, 130],
        75: 129
      }, {
        33: [1, 131]
      }, {
        33: [2, 67]
      }, o($Vd, [2, 12]), o($Ve, [2, 26]), o($Vt, [2, 31]), o($Vg, [2, 29]), {
        33: [2, 72],
        42: 132,
        73: 133,
        74: $Vv
      }, o($Vo, [2, 69]), o($Vs, [2, 71]), o($Vb, [2, 15]), {
        71: [1, 135],
        76: [1, 134]
      }, o($Vw, [2, 98]), o($Vc, [2, 16]), {
        33: [1, 136]
      }, {
        33: [2, 73]
      }, {
        33: [2, 32]
      }, o($Vw, [2, 99]), o($Vb, [2, 17])],
      defaultActions: {
        4: [2, 1],
        55: [2, 53],
        57: [2, 20],
        61: [2, 55],
        73: [2, 79],
        81: [2, 83],
        85: [2, 18],
        89: [2, 87],
        99: [2, 51],
        102: [2, 91],
        109: [2, 95],
        111: [2, 19],
        112: [2, 75],
        117: [2, 61],
        120: [2, 67],
        133: [2, 73],
        134: [2, 32]
      },
      parseError: function parseError(str, hash) {
        if (hash.recoverable) {
          this.trace(str);
        } else {
          var error = new Error(str);
          error.hash = hash;
          throw error;
        }
      },
      parse: function parse(input) {
        var self = this,
            stack = [0],
            vstack = [null],
            lstack = [],
            table = this.table,
            yytext = '',
            yylineno = 0,
            yyleng = 0,
            TERROR = 2,
            EOF = 1;
        var args = lstack.slice.call(arguments, 1);
        var lexer = Object.create(this.lexer);
        var sharedState = {
          yy: {}
        };

        for (var k in this.yy) {
          if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
          }
        }

        lexer.setInput(input, sharedState.yy);
        sharedState.yy.lexer = lexer;
        sharedState.yy.parser = this;

        if (typeof lexer.yylloc == 'undefined') {
          lexer.yylloc = {};
        }

        var yyloc = lexer.yylloc;
        lstack.push(yyloc);
        var ranges = lexer.options && lexer.options.ranges;

        if (typeof sharedState.yy.parseError === 'function') {
          this.parseError = sharedState.yy.parseError;
        } else {
          this.parseError = Object.getPrototypeOf(this).parseError;
        }

        _token_stack: var lex = function lex() {
          var token;
          token = lexer.lex() || EOF;

          if (typeof token !== 'number') {
            token = self.symbols_[token] || token;
          }

          return token;
        };

        var symbol,
            preErrorSymbol,
            state,
            action,
            r,
            yyval = {},
            p,
            len,
            newState,
            expected;

        while (true) {
          state = stack[stack.length - 1];

          if (this.defaultActions[state]) {
            action = this.defaultActions[state];
          } else {
            if (symbol === null || typeof symbol == 'undefined') {
              symbol = lex();
            }

            action = table[state] && table[state][symbol];
          }

          if (typeof action === 'undefined' || !action.length || !action[0]) {
            var errStr = '';
            expected = [];

            for (p in table[state]) {
              if (this.terminals_[p] && p > TERROR) {
                expected.push('\'' + this.terminals_[p] + '\'');
              }
            }

            if (lexer.showPosition) {
              errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
            } else {
              errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
            }

            this.parseError(errStr, {
              text: lexer.match,
              token: this.terminals_[symbol] || symbol,
              line: lexer.yylineno,
              loc: yyloc,
              expected: expected
            });
          }

          if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
          }

          switch (action[0]) {
            case 1:
              stack.push(symbol);
              vstack.push(lexer.yytext);
              lstack.push(lexer.yylloc);
              stack.push(action[1]);
              symbol = null;

              if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
              } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
              }

              break;

            case 2:
              len = this.productions_[action[1]][1];
              yyval.$ = vstack[vstack.length - len];
              yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
              };

              if (ranges) {
                yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
              }

              r = this.performAction.apply(yyval, [yytext, yyleng, yylineno, sharedState.yy, action[1], vstack, lstack].concat(args));

              if (typeof r !== 'undefined') {
                return r;
              }

              if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
              }

              stack.push(this.productions_[action[1]][0]);
              vstack.push(yyval.$);
              lstack.push(yyval._$);
              newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
              stack.push(newState);
              break;

            case 3:
              return true;
          }
        }

        return true;
      }
    };
    /* generated by jison-lex 0.3.4 */

    var lexer = function () {
      var lexer = {
        EOF: 1,
        parseError: function parseError(str, hash) {
          if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
          } else {
            throw new Error(str);
          }
        },
        // resets the lexer, sets new input
        setInput: function setInput(input, yy) {
          this.yy = yy || this.yy || {};
          this._input = input;
          this._more = this._backtrack = this.done = false;
          this.yylineno = this.yyleng = 0;
          this.yytext = this.matched = this.match = '';
          this.conditionStack = ['INITIAL'];
          this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
          };

          if (this.options.ranges) {
            this.yylloc.range = [0, 0];
          }

          this.offset = 0;
          return this;
        },
        // consumes and returns one char from the input
        input: function input() {
          var ch = this._input[0];
          this.yytext += ch;
          this.yyleng++;
          this.offset++;
          this.match += ch;
          this.matched += ch;
          var lines = ch.match(/(?:\r\n?|\n).*/g);

          if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
          } else {
            this.yylloc.last_column++;
          }

          if (this.options.ranges) {
            this.yylloc.range[1]++;
          }

          this._input = this._input.slice(1);
          return ch;
        },
        // unshifts one char (or a string) into the input
        unput: function unput(ch) {
          var len = ch.length;
          var lines = ch.split(/(?:\r\n?|\n)/g);
          this._input = ch + this._input;
          this.yytext = this.yytext.substr(0, this.yytext.length - len); //this.yyleng -= len;

          this.offset -= len;
          var oldLines = this.match.split(/(?:\r\n?|\n)/g);
          this.match = this.match.substr(0, this.match.length - 1);
          this.matched = this.matched.substr(0, this.matched.length - 1);

          if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
          }

          var r = this.yylloc.range;
          this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ? (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length : this.yylloc.first_column - len
          };

          if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
          }

          this.yyleng = this.yytext.length;
          return this;
        },
        // When called from action, caches matched text and appends it on next action
        more: function more() {
          this._more = true;
          return this;
        },
        // When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
        reject: function reject() {
          if (this.options.backtrack_lexer) {
            this._backtrack = true;
          } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
              text: "",
              token: null,
              line: this.yylineno
            });
          }

          return this;
        },
        // retain first n characters of the match
        less: function less(n) {
          this.unput(this.match.slice(n));
        },
        // displays already matched input, i.e. for error messages
        pastInput: function pastInput() {
          var past = this.matched.substr(0, this.matched.length - this.match.length);
          return (past.length > 20 ? '...' : '') + past.substr(-20).replace(/\n/g, "");
        },
        // displays upcoming input, i.e. for error messages
        upcomingInput: function upcomingInput() {
          var next = this.match;

          if (next.length < 20) {
            next += this._input.substr(0, 20 - next.length);
          }

          return (next.substr(0, 20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
        },
        // displays the character position where the lexing error occurred, i.e. for error messages
        showPosition: function showPosition() {
          var pre = this.pastInput();
          var c = new Array(pre.length + 1).join("-");
          return pre + this.upcomingInput() + "\n" + c + "^";
        },
        // test the lexed token: return FALSE when not a match, otherwise return token
        test_match: function test_match(match, indexed_rule) {
          var token, lines, backup;

          if (this.options.backtrack_lexer) {
            // save context
            backup = {
              yylineno: this.yylineno,
              yylloc: {
                first_line: this.yylloc.first_line,
                last_line: this.last_line,
                first_column: this.yylloc.first_column,
                last_column: this.yylloc.last_column
              },
              yytext: this.yytext,
              match: this.match,
              matches: this.matches,
              matched: this.matched,
              yyleng: this.yyleng,
              offset: this.offset,
              _more: this._more,
              _input: this._input,
              yy: this.yy,
              conditionStack: this.conditionStack.slice(0),
              done: this.done
            };

            if (this.options.ranges) {
              backup.yylloc.range = this.yylloc.range.slice(0);
            }
          }

          lines = match[0].match(/(?:\r\n?|\n).*/g);

          if (lines) {
            this.yylineno += lines.length;
          }

          this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ? lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length
          };
          this.yytext += match[0];
          this.match += match[0];
          this.matches = match;
          this.yyleng = this.yytext.length;

          if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
          }

          this._more = false;
          this._backtrack = false;
          this._input = this._input.slice(match[0].length);
          this.matched += match[0];
          token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);

          if (this.done && this._input) {
            this.done = false;
          }

          if (token) {
            return token;
          } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
              this[k] = backup[k];
            }

            return false; // rule action called reject() implying the next rule should be tested instead.
          }

          return false;
        },
        // return next match in input
        next: function next() {
          if (this.done) {
            return this.EOF;
          }

          if (!this._input) {
            this.done = true;
          }

          var token, match, tempMatch, index;

          if (!this._more) {
            this.yytext = '';
            this.match = '';
          }

          var rules = this._currentRules();

          for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);

            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
              match = tempMatch;
              index = i;

              if (this.options.backtrack_lexer) {
                token = this.test_match(tempMatch, rules[i]);

                if (token !== false) {
                  return token;
                } else if (this._backtrack) {
                  match = false;
                  continue; // rule action called reject() implying a rule MISmatch.
                } else {
                  // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                  return false;
                }
              } else if (!this.options.flex) {
                break;
              }
            }
          }

          if (match) {
            token = this.test_match(match, rules[index]);

            if (token !== false) {
              return token;
            } // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)


            return false;
          }

          if (this._input === "") {
            return this.EOF;
          } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
              text: "",
              token: null,
              line: this.yylineno
            });
          }
        },
        // return next match that has a token
        lex: function lex() {
          var r = this.next();

          if (r) {
            return r;
          } else {
            return this.lex();
          }
        },
        // activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
        begin: function begin(condition) {
          this.conditionStack.push(condition);
        },
        // pop the previously active lexer condition state off the condition stack
        popState: function popState() {
          var n = this.conditionStack.length - 1;

          if (n > 0) {
            return this.conditionStack.pop();
          } else {
            return this.conditionStack[0];
          }
        },
        // produce the lexer rule set which is active for the currently active lexer condition state
        _currentRules: function _currentRules() {
          if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
          } else {
            return this.conditions["INITIAL"].rules;
          }
        },
        // return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
        topState: function topState(n) {
          n = this.conditionStack.length - 1 - Math.abs(n || 0);

          if (n >= 0) {
            return this.conditionStack[n];
          } else {
            return "INITIAL";
          }
        },
        // alias for begin(condition)
        pushState: function pushState(condition) {
          this.begin(condition);
        },
        // return the number of states currently on the stack
        stateStackSize: function stateStackSize() {
          return this.conditionStack.length;
        },
        options: {},
        performAction: function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {
          function strip(start, end) {
            return yy_.yytext = yy_.yytext.substring(start, yy_.yyleng - end + start);
          }

          switch ($avoiding_name_collisions) {
            case 0:
              if (yy_.yytext.slice(-2) === "\\\\") {
                strip(0, 1);
                this.begin("mu");
              } else if (yy_.yytext.slice(-1) === "\\") {
                strip(0, 1);
                this.begin("emu");
              } else {
                this.begin("mu");
              }

              if (yy_.yytext) return 15;
              break;

            case 1:
              return 15;
              break;

            case 2:
              this.popState();
              return 15;
              break;

            case 3:
              this.begin('raw');
              return 15;
              break;

            case 4:
              this.popState(); // Should be using `this.topState()` below, but it currently
              // returns the second top instead of the first top. Opened an
              // issue about it at https://github.com/zaach/jison/issues/291

              if (this.conditionStack[this.conditionStack.length - 1] === 'raw') {
                return 15;
              } else {
                strip(5, 9);
                return 18;
              }

              break;

            case 5:
              return 15;
              break;

            case 6:
              this.popState();
              return 14;
              break;

            case 7:
              return 64;
              break;

            case 8:
              return 67;
              break;

            case 9:
              return 19;
              break;

            case 10:
              this.popState();
              this.begin('raw');
              return 23;
              break;

            case 11:
              return 56;
              break;

            case 12:
              return 60;
              break;

            case 13:
              return 29;
              break;

            case 14:
              return 47;
              break;

            case 15:
              this.popState();
              return 44;
              break;

            case 16:
              this.popState();
              return 44;
              break;

            case 17:
              return 34;
              break;

            case 18:
              return 39;
              break;

            case 19:
              return 52;
              break;

            case 20:
              return 48;
              break;

            case 21:
              this.unput(yy_.yytext);
              this.popState();
              this.begin('com');
              break;

            case 22:
              this.popState();
              return 14;
              break;

            case 23:
              return 48;
              break;

            case 24:
              return 72;
              break;

            case 25:
              return 71;
              break;

            case 26:
              return 71;
              break;

            case 27:
              return 86;
              break;

            case 28:
              // ignore whitespace
              break;

            case 29:
              this.popState();
              return 55;
              break;

            case 30:
              this.popState();
              return 33;
              break;

            case 31:
              yy_.yytext = strip(1, 2).replace(/\\"/g, '"');
              return 79;
              break;

            case 32:
              yy_.yytext = strip(1, 2).replace(/\\'/g, "'");
              return 79;
              break;

            case 33:
              return 84;
              break;

            case 34:
              return 81;
              break;

            case 35:
              return 81;
              break;

            case 36:
              return 82;
              break;

            case 37:
              return 83;
              break;

            case 38:
              return 80;
              break;

            case 39:
              return 74;
              break;

            case 40:
              return 76;
              break;

            case 41:
              return 71;
              break;

            case 42:
              yy_.yytext = yy_.yytext.replace(/\\([\\\]])/g, '$1');
              return 71;
              break;

            case 43:
              return 'INVALID';
              break;

            case 44:
              return 5;
              break;
          }
        },
        rules: [/^(?:[^\x00]*?(?=(\{\{)))/, /^(?:[^\x00]+)/, /^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/, /^(?:\{\{\{\{(?=[^/]))/, /^(?:\{\{\{\{\/[^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=[=}\s\/.])\}\}\}\})/, /^(?:[^\x00]+?(?=(\{\{\{\{)))/, /^(?:[\s\S]*?--(~)?\}\})/, /^(?:\()/, /^(?:\))/, /^(?:\{\{\{\{)/, /^(?:\}\}\}\})/, /^(?:\{\{(~)?>)/, /^(?:\{\{(~)?#>)/, /^(?:\{\{(~)?#\*?)/, /^(?:\{\{(~)?\/)/, /^(?:\{\{(~)?\^\s*(~)?\}\})/, /^(?:\{\{(~)?\s*else\s*(~)?\}\})/, /^(?:\{\{(~)?\^)/, /^(?:\{\{(~)?\s*else\b)/, /^(?:\{\{(~)?\{)/, /^(?:\{\{(~)?&)/, /^(?:\{\{(~)?!--)/, /^(?:\{\{(~)?![\s\S]*?\}\})/, /^(?:\{\{(~)?\*?)/, /^(?:=)/, /^(?:\.\.)/, /^(?:\.(?=([=~}\s\/.)|])))/, /^(?:[\/.])/, /^(?:\s+)/, /^(?:\}(~)?\}\})/, /^(?:(~)?\}\})/, /^(?:"(\\["]|[^"])*")/, /^(?:'(\\[']|[^'])*')/, /^(?:@)/, /^(?:true(?=([~}\s)])))/, /^(?:false(?=([~}\s)])))/, /^(?:undefined(?=([~}\s)])))/, /^(?:null(?=([~}\s)])))/, /^(?:-?[0-9]+(?:\.[0-9]+)?(?=([~}\s)])))/, /^(?:as\s+\|)/, /^(?:\|)/, /^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)|]))))/, /^(?:\[(\\\]|[^\]])*\])/, /^(?:.)/, /^(?:$)/],
        conditions: {
          "mu": {
            "rules": [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44],
            "inclusive": false
          },
          "emu": {
            "rules": [2],
            "inclusive": false
          },
          "com": {
            "rules": [6],
            "inclusive": false
          },
          "raw": {
            "rules": [3, 4, 5],
            "inclusive": false
          },
          "INITIAL": {
            "rules": [0, 1, 44],
            "inclusive": true
          }
        }
      };
      return lexer;
    }();

    parser.lexer = lexer;

    function Parser() {
      this.yy = {};
    }

    Parser.prototype = parser;
    parser.Parser = Parser;
    return new Parser();
  }();
  /* eslint-disable new-cap */


  _exports.parser = parser;

  function print(ast) {
    return new PrintVisitor().accept(ast);
  }

  function PrintVisitor() {
    this.padding = 0;
  }

  PrintVisitor.prototype = new Visitor();

  PrintVisitor.prototype.pad = function (string) {
    var out = '';

    for (var i = 0, l = this.padding; i < l; i++) {
      out += '  ';
    }

    out += string + '\n';
    return out;
  };

  PrintVisitor.prototype.Program = function (program) {
    var out = '',
        body = program.body,
        i,
        l;

    if (program.blockParams) {
      var blockParams = 'BLOCK PARAMS: [';

      for (i = 0, l = program.blockParams.length; i < l; i++) {
        blockParams += ' ' + program.blockParams[i];
      }

      blockParams += ' ]';
      out += this.pad(blockParams);
    }

    for (i = 0, l = body.length; i < l; i++) {
      out += this.accept(body[i]);
    }

    this.padding--;
    return out;
  };

  PrintVisitor.prototype.MustacheStatement = function (mustache) {
    return this.pad('{{ ' + this.SubExpression(mustache) + ' }}');
  };

  PrintVisitor.prototype.Decorator = function (mustache) {
    return this.pad('{{ DIRECTIVE ' + this.SubExpression(mustache) + ' }}');
  };

  PrintVisitor.prototype.BlockStatement = PrintVisitor.prototype.DecoratorBlock = function (block) {
    var out = '';
    out += this.pad((block.type === 'DecoratorBlock' ? 'DIRECTIVE ' : '') + 'BLOCK:');
    this.padding++;
    out += this.pad(this.SubExpression(block));

    if (block.program) {
      out += this.pad('PROGRAM:');
      this.padding++;
      out += this.accept(block.program);
      this.padding--;
    }

    if (block.inverse) {
      if (block.program) {
        this.padding++;
      }

      out += this.pad('{{^}}');
      this.padding++;
      out += this.accept(block.inverse);
      this.padding--;

      if (block.program) {
        this.padding--;
      }
    }

    this.padding--;
    return out;
  };

  PrintVisitor.prototype.PartialStatement = function (partial) {
    var content = 'PARTIAL:' + partial.name.original;

    if (partial.params[0]) {
      content += ' ' + this.accept(partial.params[0]);
    }

    if (partial.hash) {
      content += ' ' + this.accept(partial.hash);
    }

    return this.pad('{{> ' + content + ' }}');
  };

  PrintVisitor.prototype.PartialBlockStatement = function (partial) {
    var content = 'PARTIAL BLOCK:' + partial.name.original;

    if (partial.params[0]) {
      content += ' ' + this.accept(partial.params[0]);
    }

    if (partial.hash) {
      content += ' ' + this.accept(partial.hash);
    }

    content += ' ' + this.pad('PROGRAM:');
    this.padding++;
    content += this.accept(partial.program);
    this.padding--;
    return this.pad('{{> ' + content + ' }}');
  };

  PrintVisitor.prototype.ContentStatement = function (content) {
    return this.pad("CONTENT[ '" + content.value + "' ]");
  };

  PrintVisitor.prototype.CommentStatement = function (comment) {
    return this.pad("{{! '" + comment.value + "' }}");
  };

  PrintVisitor.prototype.SubExpression = function (sexpr) {
    var params = sexpr.params,
        paramStrings = [],
        hash;

    for (var i = 0, l = params.length; i < l; i++) {
      paramStrings.push(this.accept(params[i]));
    }

    params = '[' + paramStrings.join(', ') + ']';
    hash = sexpr.hash ? ' ' + this.accept(sexpr.hash) : '';
    return this.accept(sexpr.path) + ' ' + params + hash;
  };

  PrintVisitor.prototype.PathExpression = function (id) {
    var path = id.parts.join('/');
    return (id.data ? '@' : '') + 'PATH:' + path;
  };

  PrintVisitor.prototype.StringLiteral = function (string) {
    return '"' + string.value + '"';
  };

  PrintVisitor.prototype.NumberLiteral = function (number) {
    return 'NUMBER{' + number.value + '}';
  };

  PrintVisitor.prototype.BooleanLiteral = function (bool) {
    return 'BOOLEAN{' + bool.value + '}';
  };

  PrintVisitor.prototype.UndefinedLiteral = function () {
    return 'UNDEFINED';
  };

  PrintVisitor.prototype.NullLiteral = function () {
    return 'NULL';
  };

  PrintVisitor.prototype.Hash = function (hash) {
    var pairs = hash.pairs,
        joinedPairs = [];

    for (var i = 0, l = pairs.length; i < l; i++) {
      joinedPairs.push(this.accept(pairs[i]));
    }

    return 'HASH{' + joinedPairs.join(', ') + '}';
  };

  PrintVisitor.prototype.HashPair = function (pair) {
    return pair.key + '=' + this.accept(pair.value);
  };
  /* eslint-enable new-cap */


  function validateClose(open, close) {
    close = close.path ? close.path.original : close;

    if (open.path.original !== close) {
      var errorNode = {
        loc: open.path.loc
      };
      throw new Exception(open.path.original + " doesn't match " + close, errorNode);
    }
  }

  function SourceLocation(source, locInfo) {
    this.source = source;
    this.start = {
      line: locInfo.first_line,
      column: locInfo.first_column
    };
    this.end = {
      line: locInfo.last_line,
      column: locInfo.last_column
    };
  }

  function id(token) {
    if (/^\[.*\]$/.test(token)) {
      return token.substring(1, token.length - 1);
    } else {
      return token;
    }
  }

  function stripFlags(open, close) {
    return {
      open: open.charAt(2) === '~',
      close: close.charAt(close.length - 3) === '~'
    };
  }

  function stripComment(comment) {
    return comment.replace(/^\{\{~?!-?-?/, '').replace(/-?-?~?\}\}$/, '');
  }

  function preparePath(data, parts, loc) {
    loc = this.locInfo(loc);
    var original = data ? '@' : '',
        dig = [],
        depth = 0;

    for (var i = 0, l = parts.length; i < l; i++) {
      var part = parts[i].part,
          // If we have [] syntax then we do not treat path references as operators,
      // i.e. foo.[this] resolves to approximately context.foo['this']
      isLiteral = parts[i].original !== part;
      original += (parts[i].separator || '') + part;

      if (!isLiteral && (part === '..' || part === '.' || part === 'this')) {
        if (dig.length > 0) {
          throw new Exception('Invalid path: ' + original, {
            loc: loc
          });
        } else if (part === '..') {
          depth++;
        }
      } else {
        dig.push(part);
      }
    }

    return {
      type: 'PathExpression',
      data: data,
      depth: depth,
      parts: dig,
      original: original,
      loc: loc
    };
  }

  function prepareMustache(path, params, hash, open, strip, locInfo) {
    // Must use charAt to support IE pre-10
    var escapeFlag = open.charAt(3) || open.charAt(2),
        escaped = escapeFlag !== '{' && escapeFlag !== '&';
    var decorator = /\*/.test(open);
    return {
      type: decorator ? 'Decorator' : 'MustacheStatement',
      path: path,
      params: params,
      hash: hash,
      escaped: escaped,
      strip: strip,
      loc: this.locInfo(locInfo)
    };
  }

  function prepareRawBlock(openRawBlock, contents, close, locInfo) {
    validateClose(openRawBlock, close);
    locInfo = this.locInfo(locInfo);
    var program = {
      type: 'Program',
      body: contents,
      strip: {},
      loc: locInfo
    };
    return {
      type: 'BlockStatement',
      path: openRawBlock.path,
      params: openRawBlock.params,
      hash: openRawBlock.hash,
      program: program,
      openStrip: {},
      inverseStrip: {},
      closeStrip: {},
      loc: locInfo
    };
  }

  function prepareBlock(openBlock, program, inverseAndProgram, close, inverted, locInfo) {
    if (close && close.path) {
      validateClose(openBlock, close);
    }

    var decorator = /\*/.test(openBlock.open);
    program.blockParams = openBlock.blockParams;
    var inverse, inverseStrip;

    if (inverseAndProgram) {
      if (decorator) {
        throw new Exception('Unexpected inverse block on decorator', inverseAndProgram);
      }

      if (inverseAndProgram.chain) {
        inverseAndProgram.program.body[0].closeStrip = close.strip;
      }

      inverseStrip = inverseAndProgram.strip;
      inverse = inverseAndProgram.program;
    }

    if (inverted) {
      inverted = inverse;
      inverse = program;
      program = inverted;
    }

    return {
      type: decorator ? 'DecoratorBlock' : 'BlockStatement',
      path: openBlock.path,
      params: openBlock.params,
      hash: openBlock.hash,
      program: program,
      inverse: inverse,
      openStrip: openBlock.strip,
      inverseStrip: inverseStrip,
      closeStrip: close && close.strip,
      loc: this.locInfo(locInfo)
    };
  }

  function prepareProgram(statements, loc) {
    if (!loc && statements.length) {
      var firstLoc = statements[0].loc,
          lastLoc = statements[statements.length - 1].loc;
      /* istanbul ignore else */

      if (firstLoc && lastLoc) {
        loc = {
          source: firstLoc.source,
          start: {
            line: firstLoc.start.line,
            column: firstLoc.start.column
          },
          end: {
            line: lastLoc.end.line,
            column: lastLoc.end.column
          }
        };
      }
    }

    return {
      type: 'Program',
      body: statements,
      strip: {},
      loc: loc
    };
  }

  function preparePartialBlock(open, program, close, locInfo) {
    validateClose(open, close);
    return {
      type: 'PartialBlockStatement',
      name: open.path,
      params: open.params,
      hash: open.hash,
      program: program,
      openStrip: open.strip,
      closeStrip: close && close.strip,
      loc: this.locInfo(locInfo)
    };
  }

  var Helpers = /*#__PURE__*/Object.freeze({
    SourceLocation: SourceLocation,
    id: id,
    stripFlags: stripFlags,
    stripComment: stripComment,
    preparePath: preparePath,
    prepareMustache: prepareMustache,
    prepareRawBlock: prepareRawBlock,
    prepareBlock: prepareBlock,
    prepareProgram: prepareProgram,
    preparePartialBlock: preparePartialBlock
  });
  var baseHelpers = {};

  for (var helper in Helpers) {
    if (Object.prototype.hasOwnProperty.call(Helpers, helper)) {
      baseHelpers[helper] = Helpers[helper];
    }
  }

  function parseWithoutProcessing(input, options) {
    // Just return if an already-compiled AST was passed in.
    if (input.type === 'Program') {
      return input;
    }

    parser.yy = baseHelpers; // Altering the shared object here, but this is ok as parser is a sync operation

    parser.yy.locInfo = function (locInfo) {
      return new SourceLocation(options && options.srcName, locInfo);
    };

    var ast = parser.parse(input);
    return ast;
  }

  function parse(input, options) {
    var ast = parseWithoutProcessing(input, options);
    var strip = new WhitespaceControl(options);
    return strip.accept(ast);
  }
});
define("ember-babel", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.wrapNativeSuper = wrapNativeSuper;
  _exports.classCallCheck = classCallCheck;
  _exports.inheritsLoose = inheritsLoose;
  _exports.taggedTemplateLiteralLoose = taggedTemplateLiteralLoose;
  _exports.createClass = createClass;
  _exports.assertThisInitialized = assertThisInitialized;
  _exports.possibleConstructorReturn = possibleConstructorReturn;
  _exports.objectDestructuringEmpty = objectDestructuringEmpty;
  _exports.createSuper = createSuper;
  _exports.createForOfIteratorHelperLoose = createForOfIteratorHelperLoose;

  /* globals Reflect */
  var setPrototypeOf = Object.setPrototypeOf;
  var getPrototypeOf = Object.getPrototypeOf;
  var hasReflectConstruct = typeof Reflect === 'object' && typeof Reflect.construct === 'function';
  var nativeWrapperCache = new Map(); // Super minimal version of Babel's wrapNativeSuper. We only use this for
  // extending Function, for ComputedDecoratorImpl and AliasDecoratorImpl. We know
  // we will never directly create an instance of these classes so no need to
  // include `construct` code or other helpers.

  function wrapNativeSuper(Class) {
    if (nativeWrapperCache.has(Class)) {
      return nativeWrapperCache.get(Class);
    }

    function Wrapper() {}

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    nativeWrapperCache.set(Class, Wrapper);
    return setPrototypeOf(Wrapper, Class);
  }

  function classCallCheck(instance, Constructor) {
    if (true
    /* DEBUG */
    ) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }
  }
  /*
    Overrides default `inheritsLoose` to _also_ call `Object.setPrototypeOf`.
    This is needed so that we can use `loose` option with the
    `@babel/plugin-transform-classes` (because we want simple assignment to the
    prototype wherever possible) but also keep our constructor based prototypal
    inheritance working properly
  */


  function inheritsLoose(subClass, superClass) {
    if (true
    /* DEBUG */
    ) {
      if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function');
      }
    }

    subClass.prototype = Object.create(superClass === null ? null : superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });

    if (superClass !== null) {
      setPrototypeOf(subClass, superClass);
    }
  }

  function taggedTemplateLiteralLoose(strings, raw) {
    if (!raw) {
      raw = strings.slice(0);
    }

    strings.raw = raw;
    return strings;
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ('value' in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  /*
    Differs from default implementation by avoiding boolean coercion of
    `protoProps` and `staticProps`.
  */


  function createClass(Constructor, protoProps, staticProps) {
    if (protoProps !== null && protoProps !== undefined) {
      _defineProperties(Constructor.prototype, protoProps);
    }

    if (staticProps !== null && staticProps !== undefined) {
      _defineProperties(Constructor, staticProps);
    }

    return Constructor;
  }

  function assertThisInitialized(self) {
    if (true
    /* DEBUG */
    && self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }
  /*
    Adds `DEBUG` guard to error being thrown, and avoids boolean coercion of `call`.
  */


  function possibleConstructorReturn(self, call) {
    if (typeof call === 'object' && call !== null || typeof call === 'function') {
      return call;
    }

    return assertThisInitialized(self);
  }

  function objectDestructuringEmpty(obj) {
    if (true
    /* DEBUG */
    && (obj === null || obj === undefined)) {
      throw new TypeError('Cannot destructure undefined');
    }
  }
  /*
    Differs from default implementation by checking for _any_ `Reflect.construct`
    (the default implementation tries to ensure that `Reflect.construct` is truly
    the native one).
  
    Original source: https://github.com/babel/babel/blob/v7.9.2/packages/babel-helpers/src/helpers.js#L738-L757
  */


  function createSuper(Derived) {
    return function () {
      var Super = getPrototypeOf(Derived);
      var result;

      if (hasReflectConstruct) {
        // NOTE: This doesn't work if this.__proto__.constructor has been modified.
        var NewTarget = getPrototypeOf(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return possibleConstructorReturn(this, result);
    };
  }
  /*
    Does not differ from default implementation.
  */


  function arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    var arr2 = new Array(len);

    for (var i = 0; i < len; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
  /*
    Does not differ from default implementation.
  */


  function unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === 'string') return arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === 'Object' && o.constructor) n = o.constructor.name;
    if (n === 'Map' || n === 'Set') return Array.from(n);
    if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
  }
  /*
    Does not differ from default implementation.
  */


  function createForOfIteratorHelperLoose(o) {
    var i = 0;

    if (typeof Symbol === 'undefined' || o[Symbol.iterator] == null) {
      // Fallback for engines without symbol support
      if (Array.isArray(o) || (o = unsupportedIterableToArray(o))) return function () {
        if (i >= o.length) return {
          done: true
        };
        return {
          done: false,
          value: o[i++]
        };
      };
      throw new TypeError('Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.');
    }

    i = o[Symbol.iterator]();
    return i.next.bind(i);
  }
});
define("ember-template-compiler/index", ["exports", "@ember/-internals/environment", "@ember/canary-features", "@glimmer/syntax", "ember/version", "require", "ember-template-compiler/lib/system/precompile", "ember-template-compiler/lib/system/compile", "ember-template-compiler/lib/system/compile-options", "ember-template-compiler/lib/plugins/index", "@glimmer/compiler", "ember-template-compiler/lib/system/bootstrap", "ember-template-compiler/lib/system/initializer"], function (_exports, _environment, _canaryFeatures, _GlimmerSyntax, _version, _require, _precompile, _compile, _compileOptions, _index, _compiler, _bootstrap, _initializer) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "_preprocess", {
    enumerable: true,
    get: function get() {
      return _GlimmerSyntax.preprocess;
    }
  });
  Object.defineProperty(_exports, "_print", {
    enumerable: true,
    get: function get() {
      return _GlimmerSyntax.print;
    }
  });
  Object.defineProperty(_exports, "VERSION", {
    enumerable: true,
    get: function get() {
      return _version.default;
    }
  });
  Object.defineProperty(_exports, "precompile", {
    enumerable: true,
    get: function get() {
      return _precompile.default;
    }
  });
  Object.defineProperty(_exports, "compile", {
    enumerable: true,
    get: function get() {
      return _compile.default;
    }
  });
  Object.defineProperty(_exports, "compileOptions", {
    enumerable: true,
    get: function get() {
      return _compileOptions.default;
    }
  });
  Object.defineProperty(_exports, "_buildCompileOptions", {
    enumerable: true,
    get: function get() {
      return _compileOptions.buildCompileOptions;
    }
  });
  Object.defineProperty(_exports, "_transformsFor", {
    enumerable: true,
    get: function get() {
      return _compileOptions.transformsFor;
    }
  });
  Object.defineProperty(_exports, "registerPlugin", {
    enumerable: true,
    get: function get() {
      return _compileOptions.registerPlugin;
    }
  });
  Object.defineProperty(_exports, "unregisterPlugin", {
    enumerable: true,
    get: function get() {
      return _compileOptions.unregisterPlugin;
    }
  });
  Object.defineProperty(_exports, "RESOLUTION_MODE_TRANSFORMS", {
    enumerable: true,
    get: function get() {
      return _index.RESOLUTION_MODE_TRANSFORMS;
    }
  });
  Object.defineProperty(_exports, "STRICT_MODE_TRANSFORMS", {
    enumerable: true,
    get: function get() {
      return _index.STRICT_MODE_TRANSFORMS;
    }
  });
  Object.defineProperty(_exports, "_precompile", {
    enumerable: true,
    get: function get() {
      return _compiler.precompile;
    }
  });
  _exports._GlimmerSyntax = _exports._Ember = void 0;
  _exports._GlimmerSyntax = _GlimmerSyntax;

  var _Ember;

  _exports._Ember = _Ember;

  try {
    // tslint:disable-next-line: no-require-imports
    _exports._Ember = _Ember = (0, _require.default)("ember");
  } catch (e) {
    _exports._Ember = _Ember = {
      ENV: _environment.ENV,
      FEATURES: _canaryFeatures.FEATURES,
      VERSION: _version.default
    };
  }
});
define("ember-template-compiler/lib/plugins/assert-against-dynamic-helpers-modifiers", ["exports", "@ember/debug", "ember-template-compiler/lib/system/calculate-location-display", "ember-template-compiler/lib/plugins/utils"], function (_exports, _debug, _calculateLocationDisplay, _utils) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = assertAgainstDynamicHelpersModifiers;

  function assertAgainstDynamicHelpersModifiers(env) {
    var _a;

    var moduleName = (_a = env.meta) === null || _a === void 0 ? void 0 : _a.moduleName;

    var _trackLocals = (0, _utils.trackLocals)(),
        hasLocal = _trackLocals.hasLocal,
        node = _trackLocals.node;

    return {
      name: 'assert-against-dynamic-helpers-modifiers',
      visitor: {
        Program: node,
        ElementNode: {
          keys: {
            children: node
          }
        },
        MustacheStatement: function MustacheStatement(node) {
          if ((0, _utils.isPath)(node.path)) {
            var name = node.path.parts[0];
            (true && !(name !== 'helper' && name !== 'modifier' || isLocalVariable(node.path, hasLocal)) && (0, _debug.assert)(messageFor(name) + " " + (0, _calculateLocationDisplay.default)(moduleName, node.loc), name !== 'helper' && name !== 'modifier' || isLocalVariable(node.path, hasLocal)));
          }
        },
        SubExpression: function SubExpression(node) {
          if ((0, _utils.isPath)(node.path)) {
            var name = node.path.parts[0];
            (true && !(name !== 'helper' && name !== 'modifier' || isLocalVariable(node.path, hasLocal)) && (0, _debug.assert)(messageFor(name) + " " + (0, _calculateLocationDisplay.default)(moduleName, node.loc), name !== 'helper' && name !== 'modifier' || isLocalVariable(node.path, hasLocal)));
          }
        }
      }
    };
  }

  function isLocalVariable(node, hasLocal) {
    return !node.this && node.parts.length === 1 && hasLocal(node.parts[0]);
  }

  function messageFor(name) {
    return "Cannot use the (" + name + ") keyword yet, as it has not been implemented.";
  }
});
define("ember-template-compiler/lib/plugins/assert-against-named-blocks", ["exports", "@ember/debug", "ember-template-compiler/lib/system/calculate-location-display"], function (_exports, _debug, _calculateLocationDisplay) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = assertAgainstNamedBlocks;

  /**
   @module ember
  */

  /**
    Prevents usage of named blocks
  
    @private
    @class AssertAgainstNamedBlocks
  */
  function assertAgainstNamedBlocks(env) {
    var _a;

    var moduleName = (_a = env.meta) === null || _a === void 0 ? void 0 : _a.moduleName;
    return {
      name: 'assert-against-named-blocks',
      visitor: {
        ElementNode: function ElementNode(node) {
          if (node.tag[0] === ':') {
            var sourceInformation = (0, _calculateLocationDisplay.default)(moduleName, node.loc);
            (true && !(false) && (0, _debug.assert)("Named blocks are not currently available, attempted to use the <" + node.tag + "> named block. " + sourceInformation));
          }
        },
        MustacheStatement: function MustacheStatement(node) {
          if (node.path.type === 'PathExpression' && node.path.original === 'yield') {
            var to = node.hash.pairs.filter(function (pair) {
              return pair.key === 'to';
            })[0]; // Glimmer template compiler ensures yield must receive a string literal,
            // so we only need to check if it is not "default" or "inverse"

            if (to && to.value.type === 'StringLiteral' && to.value.original !== 'default' && to.value.original !== 'inverse') {
              var sourceInformation = (0, _calculateLocationDisplay.default)(moduleName, node.loc);
              (true && !(false) && (0, _debug.assert)("Named blocks are not currently available, attempted to yield to a named block other than \"default\" or \"inverse\": {{yield to=\"" + to.value.original + "\"}}. " + sourceInformation));
            }
          }
        }
      }
    };
  }
});
define("ember-template-compiler/lib/plugins/assert-input-helper-without-block", ["exports", "@ember/debug", "ember-template-compiler/lib/system/calculate-location-display", "ember-template-compiler/lib/plugins/utils"], function (_exports, _debug, _calculateLocationDisplay, _utils) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = errorOnInputWithContent;

  function errorOnInputWithContent(env) {
    var _a;

    var moduleName = (_a = env.meta) === null || _a === void 0 ? void 0 : _a.moduleName;
    return {
      name: 'assert-input-helper-without-block',
      visitor: {
        BlockStatement: function BlockStatement(node) {
          if ((0, _utils.isPath)(node.path) && node.path.original === 'input') {
            (true && !(false) && (0, _debug.assert)(assertMessage(moduleName, node)));
          }
        }
      }
    };
  }

  function assertMessage(moduleName, node) {
    var sourceInformation = (0, _calculateLocationDisplay.default)(moduleName, node.loc);
    return "The {{input}} helper cannot be used in block form. " + sourceInformation;
  }
});
define("ember-template-compiler/lib/plugins/assert-reserved-named-arguments", ["exports", "@ember/debug", "ember-template-compiler/lib/system/calculate-location-display"], function (_exports, _debug, _calculateLocationDisplay) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = assertReservedNamedArguments;

  function assertReservedNamedArguments(env) {
    var _a;

    var moduleName = (_a = env.meta) === null || _a === void 0 ? void 0 : _a.moduleName;
    return {
      name: 'assert-reserved-named-arguments',
      visitor: {
        // In general, we don't assert on the invocation side to avoid creating migration
        // hazards (e.g. using angle bracket to invoke a classic component that uses
        // `this.someReservedName`. However, we want to avoid leaking special internal
        // things, such as `__ARGS__`, so those would need to be asserted on both sides.
        AttrNode: function AttrNode(_ref) {
          var name = _ref.name,
              loc = _ref.loc;

          if (name === '@__ARGS__') {
            (true && !(false) && (0, _debug.assert)(assertMessage(name) + " " + (0, _calculateLocationDisplay.default)(moduleName, loc)));
          }
        },
        HashPair: function HashPair(_ref2) {
          var key = _ref2.key,
              loc = _ref2.loc;

          if (key === '__ARGS__') {
            (true && !(false) && (0, _debug.assert)(assertMessage(key) + " " + (0, _calculateLocationDisplay.default)(moduleName, loc)));
          }
        },
        PathExpression: function PathExpression(_ref3) {
          var original = _ref3.original,
              loc = _ref3.loc;

          if (isReserved(original)) {
            (true && !(false) && (0, _debug.assert)(assertMessage(original) + " " + (0, _calculateLocationDisplay.default)(moduleName, loc)));
          }
        }
      }
    };
  }

  var RESERVED = ['@arguments', '@args', '@block', '@else'];

  function isReserved(name) {
    return RESERVED.indexOf(name) !== -1 || Boolean(name.match(/^@[^a-z]/));
  }

  function assertMessage(name) {
    return "'" + name + "' is reserved.";
  }
});
define("ember-template-compiler/lib/plugins/assert-splattribute-expression", ["exports", "@ember/debug", "ember-template-compiler/lib/system/calculate-location-display"], function (_exports, _debug, _calculateLocationDisplay) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = assertSplattributeExpressions;

  function assertSplattributeExpressions(env) {
    var _a;

    var moduleName = (_a = env.meta) === null || _a === void 0 ? void 0 : _a.moduleName;
    return {
      name: 'assert-splattribute-expressions',
      visitor: {
        PathExpression: function PathExpression(_ref) {
          var original = _ref.original,
              loc = _ref.loc;

          if (original === '...attributes') {
            (true && !(false) && (0, _debug.assert)(errorMessage() + " " + (0, _calculateLocationDisplay.default)(moduleName, loc)));
          }
        }
      }
    };
  }

  function errorMessage() {
    return '`...attributes` can only be used in the element position e.g. `<div ...attributes />`. It cannot be used as a path.';
  }
});
define("ember-template-compiler/lib/plugins/deprecate-send-action", ["exports", "@ember/debug", "@ember/deprecated-features", "ember-template-compiler/lib/system/calculate-location-display", "ember-template-compiler/lib/plugins/utils"], function (_exports, _debug, _deprecatedFeatures, _calculateLocationDisplay, _utils) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = deprecateSendAction;
  var EVENTS = ['insert-newline', 'enter', 'escape-press', 'focus-in', 'focus-out', 'key-press', 'key-up', 'key-down'];

  function deprecateSendAction(env) {
    var _a;

    if (_deprecatedFeatures.SEND_ACTION) {
      var moduleName = (_a = env.meta) === null || _a === void 0 ? void 0 : _a.moduleName;

      var deprecationMessage = function deprecationMessage(node, eventName, actionName) {
        var sourceInformation = (0, _calculateLocationDisplay.default)(moduleName, node.loc);

        if (node.type === 'ElementNode') {
          return "Passing actions to components as strings (like `<Input @" + eventName + "=\"" + actionName + "\" />`) is deprecated. Please use closure actions instead (`<Input @" + eventName + "={{action \"" + actionName + "\"}} />`). " + sourceInformation;
        } else {
          return "Passing actions to components as strings (like `{{input " + eventName + "=\"" + actionName + "\"}}`) is deprecated. Please use closure actions instead (`{{input " + eventName + "=(action \"" + actionName + "\")}}`). " + sourceInformation;
        }
      };

      return {
        name: 'deprecate-send-action',
        visitor: {
          ElementNode: function ElementNode(node) {
            if (node.tag !== 'Input') {
              return;
            }

            node.attributes.forEach(function (_ref) {
              var name = _ref.name,
                  value = _ref.value;

              if (name.charAt(0) === '@') {
                var eventName = name.substring(1);

                if (EVENTS.indexOf(eventName) > -1) {
                  if (value.type === 'TextNode') {
                    (true && !(false) && (0, _debug.deprecate)(deprecationMessage(node, eventName, value.chars), false, {
                      id: 'ember-component.send-action',
                      until: '4.0.0',
                      url: 'https://deprecations.emberjs.com/v3.x#toc_ember-component-send-action',
                      for: 'ember-source',
                      since: {
                        enabled: '3.4.0'
                      }
                    }));
                  } else if (value.type === 'MustacheStatement' && value.path.type === 'StringLiteral') {
                    (true && !(false) && (0, _debug.deprecate)(deprecationMessage(node, eventName, value.path.original), false, {
                      id: 'ember-component.send-action',
                      until: '4.0.0',
                      url: 'https://deprecations.emberjs.com/v3.x#toc_ember-component-send-action',
                      for: 'ember-source',
                      since: {
                        enabled: '3.4.0'
                      }
                    }));
                  }
                }
              }
            });
          },
          MustacheStatement: function MustacheStatement(node) {
            if (!(0, _utils.isPath)(node.path) || node.path.original !== 'input') {
              return;
            }

            node.hash.pairs.forEach(function (pair) {
              if (EVENTS.indexOf(pair.key) > -1 && pair.value.type === 'StringLiteral') {
                (true && !(false) && (0, _debug.deprecate)(deprecationMessage(node, pair.key, pair.value.original), false, {
                  id: 'ember-component.send-action',
                  until: '4.0.0',
                  url: 'https://deprecations.emberjs.com/v3.x#toc_ember-component-send-action',
                  for: 'ember-source',
                  since: {
                    enabled: '3.4.0'
                  }
                }));
              }
            });
          }
        }
      };
    }

    return {
      name: 'deprecate-send-action',
      visitor: {}
    };
  }
});
define("ember-template-compiler/lib/plugins/deprecate-with", ["exports", "@ember/debug", "ember-template-compiler/lib/system/calculate-location-display", "ember-template-compiler/lib/plugins/utils"], function (_exports, _debug, _calculateLocationDisplay, _utils) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = deprecateWith;

  /**
   @module ember
  */

  /**
    A Glimmer2 AST transformation that deprecates `{{#with}}` and replace it
    with `{{#let}}` and `{{#if}}` as per RFC 445.
  
    Transforms:
  
    ```handlebars
    {{#with this.foo as |bar|}}
      ...
    {{/with}}
    ```
  
    Into:
  
    ```handlebars
    {{#let this.foo as |bar|}}
      {{#if bar}}
        ...
      {{/if}}
    {{/let}}
    ```
  
    And:
  
    ```handlebars
    {{#with this.foo as |bar|}}
      ...
    {{else}}
      ...
    {{/with}}
    ```
  
    Into:
  
    ```handlebars
    {{#let this.foo as |bar|}}
      {{#if bar}}
        ...
      {{else}}
        ...
      {{/if}}
    {{/let}}
    ```
  
    And issues a deprecation message.
  
    @private
    @class DeprecateWith
  */
  function deprecateWith(env) {
    var _a;

    var moduleName = (_a = env.meta) === null || _a === void 0 ? void 0 : _a.moduleName;
    var b = env.syntax.builders;
    return {
      name: 'deprecate-with',
      visitor: {
        BlockStatement: function BlockStatement(node) {
          if (!(0, _utils.isPath)(node.path) || node.path.original !== 'with') return;
          var params = node.params,
              hash = node.hash,
              program = node.program,
              inverse = node.inverse,
              loc = node.loc,
              openStrip = node.openStrip,
              inverseStrip = node.inverseStrip,
              closeStrip = node.closeStrip;
          var sourceInformation = (0, _calculateLocationDisplay.default)(moduleName, node.loc);
          (true && !(params.length === 1) && (0, _debug.assert)("`{{#with}}` takes a single positional argument (the path to alias), received " + displayParams(params) + ". " + sourceInformation, params.length === 1));
          (true && !(hash.pairs.length === 0) && (0, _debug.assert)("`{{#with}}` does not take any named arguments, received " + displayHash(hash) + ". " + sourceInformation, hash.pairs.length === 0));
          (true && !(program.blockParams.length <= 1) && (0, _debug.assert)("`{{#with}}` yields a single block param, received " + displayBlockParams(program.blockParams) + ". " + sourceInformation, program.blockParams.length <= 1));
          var recommendation;

          if (program.blockParams.length === 0) {
            recommendation = 'Use `{{#if}}` instead.';
          } else if (inverse) {
            recommendation = 'Use `{{#let}}` together with `{{#if}} instead.';
          } else {
            recommendation = 'If you always want the block to render, replace `{{#with}}` with `{{#let}}`. ' + 'If you want to conditionally render the block, use `{{#let}}` together with `{{#if}} instead.';
          }

          (true && !(false) && (0, _debug.deprecate)("`{{#with}}` is deprecated. " + recommendation + " " + sourceInformation, false, {
            id: 'ember-glimmer.with-syntax',
            until: '4.0.0',
            for: 'ember-source',
            url: 'https://deprecations.emberjs.com/v3.x/#toc_ember-glimmer-with-syntax',
            since: {
              enabled: '3.26.0-beta.1'
            }
          }));

          if (program.blockParams.length === 0) {
            return b.block('if', params, null, program, inverse, loc, openStrip, inverseStrip, closeStrip);
          } else {
            return b.block('let', params, null, b.blockItself([b.block('if', [b.path(program.blockParams[0])], null, b.blockItself(program.body, [], program.chained, program.loc), inverse, loc, openStrip, inverseStrip, closeStrip)], program.blockParams, false, loc), null, loc, openStrip, inverseStrip, closeStrip);
          }
        }
      }
    };
  }

  function displayParams(params) {
    if (params.length === 0) {
      return 'no positional arguments';
    } else {
      var display = params.map(function (param) {
        return "`" + JSON.stringify(param) + "`";
      }).join(', ');
      return params.length + " positional arguments: " + display;
    }
  }

  function displayHash(_ref) {
    var pairs = _ref.pairs;

    if (pairs.length === 0) {
      return 'no named arguments';
    } else {
      var display = pairs.map(function (pair) {
        return "`" + pair.key + "`";
      }).join(', ');
      return pairs.length + " named arguments: " + display;
    }
  }

  function displayBlockParams(blockParams) {
    if (blockParams.length === 0) {
      return 'no block params';
    } else {
      var display = blockParams.map(function (param) {
        return "`" + param + "`";
      }).join(', ');
      return blockParams.length + " block params: " + display;
    }
  }
});
define("ember-template-compiler/lib/plugins/index", ["exports", "ember-template-compiler/lib/plugins/assert-against-dynamic-helpers-modifiers", "ember-template-compiler/lib/plugins/assert-against-named-blocks", "ember-template-compiler/lib/plugins/assert-input-helper-without-block", "ember-template-compiler/lib/plugins/assert-reserved-named-arguments", "ember-template-compiler/lib/plugins/assert-splattribute-expression", "ember-template-compiler/lib/plugins/deprecate-send-action", "ember-template-compiler/lib/plugins/deprecate-with", "ember-template-compiler/lib/plugins/transform-action-syntax", "ember-template-compiler/lib/plugins/transform-attrs-into-args", "ember-template-compiler/lib/plugins/transform-each-in-into-each", "ember-template-compiler/lib/plugins/transform-each-track-array", "ember-template-compiler/lib/plugins/transform-has-block-syntax", "ember-template-compiler/lib/plugins/transform-in-element", "ember-template-compiler/lib/plugins/transform-link-to", "ember-template-compiler/lib/plugins/transform-old-class-binding-syntax", "ember-template-compiler/lib/plugins/transform-quoted-bindings-into-just-bindings", "ember-template-compiler/lib/plugins/transform-resolutions", "ember-template-compiler/lib/plugins/transform-wrap-mount-and-outlet", "@ember/deprecated-features"], function (_exports, _assertAgainstDynamicHelpersModifiers, _assertAgainstNamedBlocks, _assertInputHelperWithoutBlock, _assertReservedNamedArguments, _assertSplattributeExpression, _deprecateSendAction, _deprecateWith, _transformActionSyntax, _transformAttrsIntoArgs, _transformEachInIntoEach, _transformEachTrackArray, _transformHasBlockSyntax, _transformInElement, _transformLinkTo, _transformOldClassBindingSyntax, _transformQuotedBindingsIntoJustBindings, _transformResolutions, _transformWrapMountAndOutlet, _deprecatedFeatures) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.STRICT_MODE_TRANSFORMS = _exports.RESOLUTION_MODE_TRANSFORMS = void 0;
  // order of plugins is important
  var RESOLUTION_MODE_TRANSFORMS = Object.freeze([_transformOldClassBindingSyntax.default, _transformQuotedBindingsIntoJustBindings.default, _assertReservedNamedArguments.default, _transformActionSyntax.default, _transformAttrsIntoArgs.default, _transformEachInIntoEach.default, _transformHasBlockSyntax.default, _transformLinkTo.default, _assertInputHelperWithoutBlock.default, _transformInElement.default, _assertSplattributeExpression.default, _transformEachTrackArray.default, _transformWrapMountAndOutlet.default, _deprecateWith.default, _deprecatedFeatures.SEND_ACTION ? _deprecateSendAction.default : null, !true
  /* EMBER_NAMED_BLOCKS */
  ? _assertAgainstNamedBlocks.default : null, true
  /* EMBER_DYNAMIC_HELPERS_AND_MODIFIERS */
  ? _transformResolutions.default : _assertAgainstDynamicHelpersModifiers.default].filter(notNull));
  _exports.RESOLUTION_MODE_TRANSFORMS = RESOLUTION_MODE_TRANSFORMS;
  var STRICT_MODE_TRANSFORMS = Object.freeze([_transformQuotedBindingsIntoJustBindings.default, _assertReservedNamedArguments.default, _transformActionSyntax.default, _transformEachInIntoEach.default, _transformInElement.default, _assertSplattributeExpression.default, _transformEachTrackArray.default, _transformWrapMountAndOutlet.default, _deprecateWith.default, _deprecatedFeatures.SEND_ACTION ? _deprecateSendAction.default : null, !true
  /* EMBER_NAMED_BLOCKS */
  ? _assertAgainstNamedBlocks.default : null, !true
  /* EMBER_DYNAMIC_HELPERS_AND_MODIFIERS */
  ? _assertAgainstDynamicHelpersModifiers.default : null].filter(notNull));
  _exports.STRICT_MODE_TRANSFORMS = STRICT_MODE_TRANSFORMS;

  function notNull(value) {
    return value !== null;
  }
});
define("ember-template-compiler/lib/plugins/transform-action-syntax", ["exports", "ember-template-compiler/lib/plugins/utils"], function (_exports, _utils) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = transformActionSyntax;

  /**
   @module ember
  */

  /**
    A Glimmer2 AST transformation that replaces all instances of
  
    ```handlebars
   <button {{action 'foo'}}>
   <button onblur={{action 'foo'}}>
   <button onblur={{action (action 'foo') 'bar'}}>
    ```
  
    with
  
    ```handlebars
   <button {{action this 'foo'}}>
   <button onblur={{action this 'foo'}}>
   <button onblur={{action this (action this 'foo') 'bar'}}>
    ```
  
    @private
    @class TransformActionSyntax
  */
  function transformActionSyntax(_ref) {
    var syntax = _ref.syntax;
    var b = syntax.builders;
    return {
      name: 'transform-action-syntax',
      visitor: {
        ElementModifierStatement: function ElementModifierStatement(node) {
          if (isAction(node)) {
            insertThisAsFirstParam(node, b);
          }
        },
        MustacheStatement: function MustacheStatement(node) {
          if (isAction(node)) {
            insertThisAsFirstParam(node, b);
          }
        },
        SubExpression: function SubExpression(node) {
          if (isAction(node)) {
            insertThisAsFirstParam(node, b);
          }
        }
      }
    };
  }

  function isAction(node) {
    return (0, _utils.isPath)(node.path) && node.path.original === 'action';
  }

  function insertThisAsFirstParam(node, builders) {
    node.params.unshift(builders.path('this'));
  }
});
define("ember-template-compiler/lib/plugins/transform-attrs-into-args", ["exports", "@ember/debug", "ember-template-compiler/lib/system/calculate-location-display"], function (_exports, _debug, _calculateLocationDisplay) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = transformAttrsIntoArgs;

  /**
   @module ember
  */

  /**
    A Glimmer2 AST transformation that replaces all instances of
  
    ```handlebars
   {{attrs.foo.bar}}
    ```
  
    to
  
    ```handlebars
   {{@foo.bar}}
    ```
  
    as well as `{{#if attrs.foo}}`, `{{deeply (nested attrs.foobar.baz)}}`,
    `{{this.attrs.foo}}` etc
  
    @private
    @class TransformAttrsToProps
  */
  function transformAttrsIntoArgs(env) {
    var _a;

    var b = env.syntax.builders;
    var moduleName = (_a = env.meta) === null || _a === void 0 ? void 0 : _a.moduleName;
    var stack = [[]];

    function updateBlockParamsStack(blockParams) {
      var parent = stack[stack.length - 1];
      stack.push(parent.concat(blockParams));
    }

    return {
      name: 'transform-attrs-into-args',
      visitor: {
        Program: {
          enter: function enter(node) {
            updateBlockParamsStack(node.blockParams);
          },
          exit: function exit() {
            stack.pop();
          }
        },
        ElementNode: {
          enter: function enter(node) {
            updateBlockParamsStack(node.blockParams);
          },
          exit: function exit() {
            stack.pop();
          }
        },
        PathExpression: function PathExpression(node) {
          if (isAttrs(node, stack[stack.length - 1])) {
            var path = b.path(node.original.substr(6));
            (true && !(false) && (0, _debug.deprecate)("Using {{attrs}} to reference named arguments has been deprecated. {{attrs." + path.original + "}} should be updated to {{@" + path.original + "}}. " + (0, _calculateLocationDisplay.default)(moduleName, node.loc), false, {
              id: 'attrs-arg-access',
              url: 'https://deprecations.emberjs.com/v3.x/#toc_attrs-arg-access',
              until: '4.0.0',
              for: 'ember-source',
              since: {
                enabled: '3.26.0'
              }
            }));
            path.original = "@" + path.original;
            path.data = true;
            return path;
          }
        }
      }
    };
  }

  function isAttrs(node, symbols) {
    var name = node.parts[0];

    if (symbols.indexOf(name) !== -1) {
      return false;
    }

    if (name === 'attrs') {
      if (node.this === true) {
        node.parts.shift();
        node.original = node.original.slice(5);
      }

      return true;
    }

    return false;
  }
});
define("ember-template-compiler/lib/plugins/transform-each-in-into-each", ["exports", "ember-template-compiler/lib/plugins/utils"], function (_exports, _utils) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = transformEachInIntoEach;

  /**
   @module ember
  */

  /**
    A Glimmer2 AST transformation that replaces all instances of
  
    ```handlebars
    {{#each-in iterableThing as |key value|}}
    ```
  
    with
  
    ```handlebars
    {{#each (-each-in iterableThing) as |value key|}}
    ```
  
    @private
    @class TransformHasBlockSyntax
  */
  function transformEachInIntoEach(env) {
    var b = env.syntax.builders;
    return {
      name: 'transform-each-in-into-each',
      visitor: {
        BlockStatement: function BlockStatement(node) {
          if ((0, _utils.isPath)(node.path) && node.path.original === 'each-in') {
            node.params[0] = b.sexpr(b.path('-each-in'), [node.params[0]]);
            var blockParams = node.program.blockParams;

            if (!blockParams || blockParams.length === 0) {// who uses {{#each-in}} without block params?!
            } else if (blockParams.length === 1) {
              // insert a dummy variable for the first slot
              // pick a name that won't parse so it won't shadow any real variables
              blockParams = ['( unused value )', blockParams[0]];
            } else {
              var key = blockParams.shift();
              var value = blockParams.shift();
              blockParams = [value, key].concat(blockParams);
            }

            node.program.blockParams = blockParams;
            return b.block(b.path('each'), node.params, node.hash, node.program, node.inverse, node.loc);
          }
        }
      }
    };
  }
});
define("ember-template-compiler/lib/plugins/transform-each-track-array", ["exports", "ember-template-compiler/lib/plugins/utils"], function (_exports, _utils) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = transformEachTrackArray;

  /**
   @module ember
  */

  /**
    A Glimmer2 AST transformation that replaces all instances of
  
    ```handlebars
    {{#each iterableThing as |key value|}}
    ```
  
    with
  
    ```handlebars
    {{#each (-track-array iterableThing) as |key value|}}
    ```
  
    @private
    @class TransformHasBlockSyntax
  */
  function transformEachTrackArray(env) {
    var b = env.syntax.builders;
    return {
      name: 'transform-each-track-array',
      visitor: {
        BlockStatement: function BlockStatement(node) {
          if ((0, _utils.isPath)(node.path) && node.path.original === 'each') {
            var firstParam = node.params[0];

            if (firstParam.type === 'SubExpression' && firstParam.path.type === 'PathExpression' && firstParam.path.original === '-each-in') {
              return;
            }

            node.params[0] = b.sexpr(b.path('-track-array'), [node.params[0]]);
            return b.block(b.path('each'), node.params, node.hash, node.program, node.inverse, node.loc);
          }
        }
      }
    };
  }
});
define("ember-template-compiler/lib/plugins/transform-has-block-syntax", ["exports", "@ember/debug", "ember-template-compiler/lib/system/calculate-location-display", "ember-template-compiler/lib/plugins/utils"], function (_exports, _debug, _calculateLocationDisplay, _utils) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = transformHasBlockSyntax;

  /**
   @module ember
  */

  /**
    A Glimmer2 AST transformation that replaces all instances of
  
    ```handlebars
   {{hasBlock}}
    ```
  
    with
  
    ```handlebars
   {{has-block}}
    ```
  
    @private
    @class TransformHasBlockSyntax
  */
  var TRANSFORMATIONS = {
    hasBlock: 'has-block',
    hasBlockParams: 'has-block-params'
  };

  function transformHasBlockSyntax(env) {
    var _a;

    var b = env.syntax.builders;
    var moduleName = (_a = env.meta) === null || _a === void 0 ? void 0 : _a.moduleName;

    function emitDeprecationMessage(node, name) {
      var sourceInformation = (0, _calculateLocationDisplay.default)(moduleName, node.loc);
      (true && !(false) && (0, _debug.deprecate)("`" + name + "` is deprecated. Use `" + TRANSFORMATIONS[name] + "` instead. " + sourceInformation, false, {
        id: 'has-block-and-has-block-params',
        until: '4.0.0',
        url: 'https://deprecations.emberjs.com/v3.x#toc_has-block-and-has-block-params',
        for: 'ember-source',
        since: {
          enabled: '3.25.0'
        }
      }));
    }

    return {
      name: 'transform-has-block-syntax',
      visitor: {
        PathExpression: function PathExpression(node) {
          if (TRANSFORMATIONS[node.original]) {
            emitDeprecationMessage(node, node.original);
            return b.sexpr(b.path(TRANSFORMATIONS[node.original]));
          }
        },
        MustacheStatement: function MustacheStatement(node) {
          if ((0, _utils.isPath)(node.path) && TRANSFORMATIONS[node.path.original]) {
            emitDeprecationMessage(node, node.path.original);
            return b.mustache(b.path(TRANSFORMATIONS[node.path.original]), node.params, node.hash, undefined, node.loc);
          }
        },
        SubExpression: function SubExpression(node) {
          if ((0, _utils.isPath)(node.path) && TRANSFORMATIONS[node.path.original]) {
            emitDeprecationMessage(node, node.path.original);
            return b.sexpr(b.path(TRANSFORMATIONS[node.path.original]), node.params, node.hash);
          }
        }
      }
    };
  }
});
define("ember-template-compiler/lib/plugins/transform-in-element", ["exports", "@ember/debug", "ember-template-compiler/lib/system/calculate-location-display", "ember-template-compiler/lib/plugins/utils"], function (_exports, _debug, _calculateLocationDisplay, _utils) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = transformInElement;

  /**
   @module ember
  */

  /**
    A Glimmer2 AST transformation that handles the public `{{in-element}}` as per RFC287, and deprecates but still
    continues support for the private `{{-in-element}}`.
  
    Transforms:
  
    ```handlebars
    {{#-in-element someElement}}
      {{modal-display text=text}}
    {{/-in-element}}
    ```
  
    into:
  
    ```handlebars
    {{#in-element someElement}}
      {{modal-display text=text}}
    {{/in-element}}
    ```
  
    And issues a deprecation message.
  
    Issues a build time assertion for:
  
    ```handlebars
    {{#in-element someElement insertBefore="some-none-null-value"}}
      {{modal-display text=text}}
    {{/in-element}}
    ```
  
    @private
    @class TransformInElement
  */
  function transformInElement(env) {
    var _a;

    var moduleName = (_a = env.meta) === null || _a === void 0 ? void 0 : _a.moduleName;
    var b = env.syntax.builders;
    return {
      name: 'transform-in-element',
      visitor: {
        BlockStatement: function BlockStatement(node) {
          if (!(0, _utils.isPath)(node.path)) return;

          if (node.path.original === 'in-element') {
            var originalValue = node.params[0];

            if (originalValue && !env.isProduction) {
              var subExpr = b.sexpr('-in-el-null', [originalValue]);
              node.params.shift();
              node.params.unshift(subExpr);
            }

            node.hash.pairs.forEach(function (pair) {
              if (pair.key === 'insertBefore') {
                (true && !(pair.value.type === 'NullLiteral' || pair.value.type === 'UndefinedLiteral') && (0, _debug.assert)("Can only pass null to insertBefore in in-element, received: " + JSON.stringify(pair.value), pair.value.type === 'NullLiteral' || pair.value.type === 'UndefinedLiteral'));
              }
            });
          } else if (node.path.original === '-in-element') {
            var sourceInformation = (0, _calculateLocationDisplay.default)(moduleName, node.loc);
            (true && !(false) && (0, _debug.deprecate)("The use of the private `{{-in-element}}` is deprecated, please refactor to the public `{{in-element}}`. " + sourceInformation, false, {
              id: 'glimmer.private-in-element',
              until: '3.25.0',
              for: 'ember-source',
              since: {
                enabled: '3.20.0'
              }
            }));
            node.path.original = 'in-element';
            node.path.parts = ['in-element']; // replicate special hash arguments added here:
            // https://github.com/glimmerjs/glimmer-vm/blob/ba9b37d44b85fa1385eeeea71910ff5798198c8e/packages/%40glimmer/syntax/lib/parser/handlebars-node-visitors.ts#L340-L363

            var needsInsertBefore = true;
            var hash = node.hash;
            hash.pairs.forEach(function (pair) {
              if (pair.key === 'insertBefore') {
                (true && !(pair.value.type === 'NullLiteral' || pair.value.type === 'UndefinedLiteral') && (0, _debug.assert)("Can only pass a null or undefined literals to insertBefore in -in-element, received: " + JSON.stringify(pair.value), pair.value.type === 'NullLiteral' || pair.value.type === 'UndefinedLiteral'));
                needsInsertBefore = false;
              }
            }); // Maintain compatibility with previous -in-element behavior (defaults to append, not clear)

            if (needsInsertBefore) {
              var nullLiteral = b.literal('NullLiteral', null);
              var nextSibling = b.pair('insertBefore', nullLiteral);
              hash.pairs.push(nextSibling);
            }
          }
        }
      }
    };
  }
});
define("ember-template-compiler/lib/plugins/transform-link-to", ["exports", "@ember/debug", "ember-template-compiler/lib/system/calculate-location-display", "ember-template-compiler/lib/plugins/utils"], function (_exports, _debug, _calculateLocationDisplay, _utils) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = transformLinkTo;

  function isInlineLinkTo(node) {
    return (0, _utils.isPath)(node.path) && node.path.original === 'link-to';
  }

  function isBlockLinkTo(node) {
    return (0, _utils.isPath)(node.path) && node.path.original === 'link-to';
  }

  function isQueryParams(node) {
    return (0, _utils.isSubExpression)(node) && (0, _utils.isPath)(node.path) && node.path.original === 'query-params';
  }

  function transformInlineLinkToIntoBlockForm(env, node) {
    var b = env.syntax.builders;
    return b.block('link-to', node.params.slice(1), node.hash, b.blockItself([buildStatement(b, node.params[0], node.escaped, node.loc)], undefined, false, node.loc), null, node.loc);
  }

  function transformPositionalLinkToIntoNamedArguments(env, node, hasBlock) {
    if (hasBlock === void 0) {
      hasBlock = true;
    }

    var _a, _b;

    var b = env.syntax.builders;
    var moduleName = (_a = env.meta) === null || _a === void 0 ? void 0 : _a.moduleName;
    var params = node.params,
        pairs = node.hash.pairs;
    var keys = pairs.map(function (pair) {
      return pair.key;
    });

    if (params.length === 0) {
      (true && !(keys.indexOf('params') !== -1 || keys.indexOf('route') !== -1 || keys.indexOf('model') !== -1 || keys.indexOf('models') !== -1 || keys.indexOf('query') !== -1) && (0, _debug.assert)("You must provide one or more parameters to the `{{link-to}}` component. " + (0, _calculateLocationDisplay.default)(moduleName, node.loc), keys.indexOf('params') !== -1 || keys.indexOf('route') !== -1 || keys.indexOf('model') !== -1 || keys.indexOf('models') !== -1 || keys.indexOf('query') !== -1));
      return node;
    } else {
      (true && !(keys.indexOf('params') === -1) && (0, _debug.assert)("You cannot pass positional parameters and the `params` argument to the `{{link-to}}` component at the same time. " + (0, _calculateLocationDisplay.default)(moduleName, node.loc), keys.indexOf('params') === -1));
      (true && !(keys.indexOf('route') === -1) && (0, _debug.assert)("You cannot pass positional parameters and the `route` argument to the `{{link-to}}` component at the same time. " + (0, _calculateLocationDisplay.default)(moduleName, node.loc), keys.indexOf('route') === -1));
      (true && !(keys.indexOf('model') === -1) && (0, _debug.assert)("You cannot pass positional parameters and the `model` argument to the `{{link-to}}` component at the same time. " + (0, _calculateLocationDisplay.default)(moduleName, node.loc), keys.indexOf('model') === -1));
      (true && !(keys.indexOf('models') === -1) && (0, _debug.assert)("You cannot pass positional parameters and the `models` argument to the `{{link-to}}` component at the same time. " + (0, _calculateLocationDisplay.default)(moduleName, node.loc), keys.indexOf('models') === -1));
      (true && !(keys.indexOf('query') === -1) && (0, _debug.assert)("You cannot pass positional parameters and the `query` argument to the `{{link-to}}` component at the same time. " + (0, _calculateLocationDisplay.default)(moduleName, node.loc), keys.indexOf('query') === -1));
    }

    (true && !(params.length > 0) && (0, _debug.assert)("You must provide one or more parameters to the `{{link-to}}` component. " + (0, _calculateLocationDisplay.default)(moduleName, node.loc), params.length > 0));
    var equivalentNamedArgs = [];
    var hasQueryParams = false; // 1. The last argument is possibly the `query` object.

    var query = params[params.length - 1];

    if (query && isQueryParams(query)) {
      params.pop();
      (true && !(query.params.length === 0) && (0, _debug.assert)("The `(query-params ...)` helper does not take positional arguments. " + (0, _calculateLocationDisplay.default)(moduleName, query.loc), query.params.length === 0));
      pairs.push(b.pair('query', b.sexpr(b.path('-hash', query.path.loc), [], query.hash, query.loc), query.loc));
      hasQueryParams = true;
    } // 2. If there is a `route`, it is now at index 0.


    var route = params.shift();

    if (route) {
      pairs.push(b.pair('route', route, route.loc));
      equivalentNamedArgs.push('`@route`');
    } // 3. Any remaining indices (if any) are `models`.


    if (params.length === 1) {
      pairs.push(b.pair('model', params[0], params[0].loc));
      equivalentNamedArgs.push('`@model`');
    } else if (params.length > 1) {
      pairs.push(b.pair('models', b.sexpr(b.path('array', node.loc), params, undefined, node.loc), node.loc));
      equivalentNamedArgs.push('`@models`');
    }

    if (hasQueryParams) {
      equivalentNamedArgs.push('`@query`');
    }

    if (equivalentNamedArgs.length > 0) {
      var message = 'Invoking the `<LinkTo>` component with positional arguments is deprecated.';
      message += "Please use the equivalent named arguments (" + equivalentNamedArgs.join(', ') + ")";

      if (hasQueryParams) {
        message += ' along with the `hash` helper';
      }

      if (!hasBlock) {
        message += " and pass a block for the link's content.";
      }

      message += '.';

      if ((_b = node.loc) === null || _b === void 0 ? void 0 : _b.source) {
        message += " " + (0, _calculateLocationDisplay.default)(moduleName, node.loc);
      }

      (true && !(false) && (0, _debug.deprecate)(message, false, {
        id: 'ember-glimmer.link-to.positional-arguments',
        until: '4.0.0',
        for: 'ember-source',
        url: 'https://deprecations.emberjs.com/v3.x#toc_ember-glimmer-link-to-positional-arguments',
        since: {
          enabled: '3.26.0-beta.1'
        }
      }));
    }

    return b.block(node.path, null, b.hash(pairs, node.hash.loc), node.program, node.inverse, node.loc);
  }

  function buildStatement(b, content, escaped, loc) {
    switch (content.type) {
      case 'PathExpression':
        return b.mustache(content, undefined, undefined, !escaped, loc);

      case 'SubExpression':
        return b.mustache(content.path, content.params, content.hash, !escaped, loc);
      // The default case handles literals.

      default:
        return b.text("" + content.value, loc);
    }
  }

  function transformLinkTo(env) {
    return {
      name: 'transform-link-to',
      visitor: {
        MustacheStatement: function MustacheStatement(node) {
          if (isInlineLinkTo(node)) {
            var block = transformInlineLinkToIntoBlockForm(env, node);
            return transformPositionalLinkToIntoNamedArguments(env, block, false);
          }
        },
        BlockStatement: function BlockStatement(node) {
          if (isBlockLinkTo(node)) {
            return transformPositionalLinkToIntoNamedArguments(env, node);
          }
        }
      }
    };
  }
});
define("ember-template-compiler/lib/plugins/transform-old-class-binding-syntax", ["exports", "@ember/debug", "ember-template-compiler/lib/system/calculate-location-display"], function (_exports, _debug, _calculateLocationDisplay) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = transformOldClassBindingSyntax;

  function transformOldClassBindingSyntax(env) {
    var _a;

    var b = env.syntax.builders;
    var moduleName = (_a = env.meta) === null || _a === void 0 ? void 0 : _a.moduleName;
    return {
      name: 'transform-old-class-binding-syntax',
      visitor: {
        MustacheStatement: function MustacheStatement(node) {
          process(b, node, moduleName);
        },
        BlockStatement: function BlockStatement(node) {
          process(b, node, moduleName);
        }
      }
    };
  }

  function process(b, node, moduleName) {
    var allOfTheMicrosyntaxes = [];
    var allOfTheMicrosyntaxIndexes = [];
    var classPair;
    each(node.hash.pairs, function (pair, index) {
      var key = pair.key;

      if (key === 'classBinding' || key === 'classNameBindings') {
        (true && !(false) && (0, _debug.deprecate)("Passing the `" + key + "` property as an argument within templates has been deprecated. Instead, you can pass the class argument and use concatenation to produce the class value dynamically. " + (0, _calculateLocationDisplay.default)(moduleName, node.loc), false, {
          id: 'class-binding-and-class-name-bindings-in-templates',
          url: 'https://deprecations.emberjs.com/v3.x/#toc_class-binding-and-class-name-bindings-in-templates',
          until: '4.0.0',
          for: 'ember-source',
          since: {
            enabled: '3.26.0'
          }
        }));
        allOfTheMicrosyntaxIndexes.push(index);
        allOfTheMicrosyntaxes.push(pair);
      } else if (key === 'class') {
        classPair = pair;
      }
    });

    if (allOfTheMicrosyntaxes.length === 0) {
      return;
    }

    var classValue = [];

    if (classPair) {
      classValue.push(classPair.value);
      classValue.push(b.string(' '));
    } else {
      classPair = b.pair('class', null);
      node.hash.pairs.push(classPair);
    }

    each(allOfTheMicrosyntaxIndexes, function (index) {
      node.hash.pairs.splice(index, 1);
    });
    each(allOfTheMicrosyntaxes, function (_ref) {
      var value = _ref.value;
      var sexprs = []; // TODO: add helpful deprecation when both `classNames` and `classNameBindings` can
      // be removed.

      if (value.type === 'StringLiteral') {
        var microsyntax = parseMicrosyntax(value.original);
        buildSexprs(microsyntax, sexprs, b);
        classValue.push.apply(classValue, sexprs);
      }
    });
    var hash = b.hash();
    classPair.value = b.sexpr(b.path('concat'), classValue, hash);
  }

  function buildSexprs(microsyntax, sexprs, b) {
    for (var i = 0; i < microsyntax.length; i++) {
      var _microsyntax$i = microsyntax[i],
          propName = _microsyntax$i[0],
          activeClass = _microsyntax$i[1],
          inactiveClass = _microsyntax$i[2];
      var sexpr = void 0; // :my-class-name microsyntax for static values

      if (propName === '') {
        sexpr = b.string(activeClass);
      } else {
        var params = [b.path(propName)];

        if (activeClass || activeClass === '') {
          params.push(b.string(activeClass));
        } else {
          var sexprParams = [b.string(propName), b.path(propName)];
          var hash = b.hash();

          if (activeClass !== undefined) {
            hash.pairs.push(b.pair('activeClass', b.string(activeClass)));
          }

          if (inactiveClass !== undefined) {
            hash.pairs.push(b.pair('inactiveClass', b.string(inactiveClass)));
          }

          params.push(b.sexpr(b.path('-normalize-class'), sexprParams, hash));
        }

        if (inactiveClass || inactiveClass === '') {
          params.push(b.string(inactiveClass));
        }

        sexpr = b.sexpr(b.path('if'), params);
      }

      sexprs.push(sexpr);
      sexprs.push(b.string(' '));
    }
  }

  function each(list, callback) {
    for (var i = 0; i < list.length; i++) {
      callback(list[i], i);
    }
  }

  function parseMicrosyntax(string) {
    var segments = string.split(' ');
    var ret = [];

    for (var i = 0; i < segments.length; i++) {
      ret[i] = segments[i].split(':');
    }

    return ret;
  }
});
define("ember-template-compiler/lib/plugins/transform-quoted-bindings-into-just-bindings", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = transformQuotedBindingsIntoJustBindings;

  function transformQuotedBindingsIntoJustBindings()
  /* env */
  {
    return {
      name: 'transform-quoted-bindings-into-just-bindings',
      visitor: {
        ElementNode: function ElementNode(node) {
          var styleAttr = getStyleAttr(node);

          if (!validStyleAttr(styleAttr)) {
            return;
          }

          styleAttr.value = styleAttr.value.parts[0];
        }
      }
    };
  }

  function validStyleAttr(attr) {
    if (!attr) {
      return false;
    }

    var value = attr.value;

    if (!value || value.type !== 'ConcatStatement' || value.parts.length !== 1) {
      return false;
    }

    var onlyPart = value.parts[0];
    return onlyPart.type === 'MustacheStatement';
  }

  function getStyleAttr(node) {
    var attributes = node.attributes;

    for (var i = 0; i < attributes.length; i++) {
      if (attributes[i].name === 'style') {
        return attributes[i];
      }
    }

    return undefined;
  }
});
define("ember-template-compiler/lib/plugins/transform-resolutions", ["exports", "@ember/debug", "@glimmer/syntax", "ember-template-compiler/lib/system/calculate-location-display", "ember-template-compiler/lib/plugins/utils"], function (_exports, _debug, _syntax, _calculateLocationDisplay, _utils) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = transformResolutions;

  /**
   @module ember
  */

  /**
    A Glimmer2 AST transformation that replaces all instances of
  
    ```handlebars
    {{helper "..." ...}}
    ```
  
    with
  
    ```handlebars
    {{helper (-resolve "helper:...") ...}}
    ```
  
    and
  
    ```handlebars
    {{helper ... ...}}
    ```
  
    with
  
    ```handlebars
    {{helper (-disallow-dynamic-resolution ...) ...}}
    ```
  
    and
  
    ```handlebars
    {{modifier "..." ...}}
    ```
  
    with
  
    ```handlebars
    {{modifier (-resolve "modifier:...") ...}}
    ```
    and
  
    ```handlebars
    {{modifier ... ...}}
    ```
  
    with
  
    ```handlebars
    {{modifier (-disallow-dynamic-resolution ...) ...}}
    ```
  
    @private
    @class TransformResolutions
  */
  var TARGETS = Object.freeze(['helper', 'modifier']);

  function transformResolutions(env) {
    var _a;

    var b = env.syntax.builders;
    var moduleName = (_a = env.meta) === null || _a === void 0 ? void 0 : _a.moduleName;

    var _trackLocals = (0, _utils.trackLocals)(),
        hasLocal = _trackLocals.hasLocal,
        tracker = _trackLocals.node;

    var seen;
    return {
      name: 'transform-resolutions',
      visitor: {
        Template: {
          enter: function enter() {
            seen = new Set();
          },
          exit: function exit() {
            seen = undefined;
          }
        },
        Block: tracker,
        ElementNode: {
          keys: {
            children: tracker
          }
        },
        MustacheStatement: function MustacheStatement(node) {
          (true && !(seen) && (0, _debug.assert)('[BUG] seen set should be available', seen));

          if (seen.has(node)) {
            return;
          }

          if ((0, _utils.isPath)(node.path) && !isLocalVariable(node.path, hasLocal) && TARGETS.indexOf(node.path.original) !== -1) {
            var result = b.mustache(node.path, transformParams(b, node.params, node.path.original, moduleName, node.loc), node.hash, node.trusting, node.loc, node.strip); // Avoid double/infinite-processing

            seen.add(result);
            return result;
          }
        },
        SubExpression: function SubExpression(node) {
          (true && !(seen) && (0, _debug.assert)('[BUG] seen set should be available', seen));

          if (seen.has(node)) {
            return;
          }

          if ((0, _utils.isPath)(node.path) && !isLocalVariable(node.path, hasLocal) && TARGETS.indexOf(node.path.original) !== -1) {
            var result = b.sexpr(node.path, transformParams(b, node.params, node.path.original, moduleName, node.loc), node.hash, node.loc); // Avoid double/infinite-processing

            seen.add(result);
            return result;
          }
        }
      }
    };
  }

  function isLocalVariable(node, hasLocal) {
    return !node.this && node.parts.length === 1 && hasLocal(node.parts[0]);
  }

  function transformParams(b, params, type, moduleName, loc) {
    var first = params[0],
        rest = params.slice(1);
    (true && !(first) && (0, _debug.assert)("The " + type + " keyword requires at least one positional arguments " + (0, _calculateLocationDisplay.default)(moduleName, loc), first));

    if ((0, _utils.isStringLiteral)(first)) {
      return [b.sexpr(b.path('-resolve', first.loc), [b.string(type + ":" + first.value)], undefined, first.loc)].concat(rest);
    } else if (true
    /* DEBUG */
    ) {
      return [b.sexpr(b.path('-disallow-dynamic-resolution', first.loc), [first], b.hash([b.pair('type', b.string(type), first.loc), b.pair('loc', b.string((0, _calculateLocationDisplay.default)(moduleName, loc)), first.loc), b.pair('original', b.string((0, _syntax.print)(first)))]), first.loc)].concat(rest);
    } else {
      return params;
    }
  }
});
define("ember-template-compiler/lib/plugins/transform-wrap-mount-and-outlet", ["exports", "ember-template-compiler/lib/plugins/utils"], function (_exports, _utils) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = transformWrapMountAndOutlet;

  /**
   @module ember
  */

  /**
    A Glimmer2 AST transformation that replaces all instances of
  
    ```handlebars
    {{mount "engine" model=this.model}}
    ```
  
    with
  
    ```handlebars
    {{component (-mount "engine" model=this.model)}}
    ```
  
    and
  
    ```handlebars
    {{outlet}}
    ```
  
    with
  
    ```handlebars
    {{component (-outlet)}}
    ```
  
    @private
    @class TransformHasBlockSyntax
  */
  function transformWrapMountAndOutlet(env) {
    var b = env.syntax.builders;

    var _trackLocals = (0, _utils.trackLocals)(),
        hasLocal = _trackLocals.hasLocal,
        node = _trackLocals.node;

    return {
      name: 'transform-wrap-mount-and-outlet',
      visitor: {
        Program: node,
        ElementNode: node,
        MustacheStatement: function MustacheStatement(node) {
          if ((0, _utils.isPath)(node.path) && (node.path.original === 'mount' || node.path.original === 'outlet') && !hasLocal(node.path.original)) {
            var subexpression = b.sexpr(b.path("-" + node.path.original), node.params, node.hash, node.loc);
            return b.mustache(b.path('component'), [subexpression], b.hash(), undefined, node.loc);
          }
        }
      }
    };
  }
});
define("ember-template-compiler/lib/plugins/utils", ["exports", "ember-babel"], function (_exports, _emberBabel) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.isPath = isPath;
  _exports.isSubExpression = isSubExpression;
  _exports.isStringLiteral = isStringLiteral;
  _exports.trackLocals = trackLocals;

  function isPath(node) {
    return node.type === 'PathExpression';
  }

  function isSubExpression(node) {
    return node.type === 'SubExpression';
  }

  function isStringLiteral(node) {
    return node.type === 'StringLiteral';
  }

  function trackLocals() {
    var locals = new Map();
    var node = {
      enter: function enter(node) {
        for (var _iterator = (0, _emberBabel.createForOfIteratorHelperLoose)(node.blockParams), _step; !(_step = _iterator()).done;) {
          var _param = _step.value;

          var _value = locals.get(_param) || 0;

          locals.set(_param, _value + 1);
        }
      },
      exit: function exit(node) {
        for (var _iterator2 = (0, _emberBabel.createForOfIteratorHelperLoose)(node.blockParams), _step2; !(_step2 = _iterator2()).done;) {
          var _param2 = _step2.value;

          var _value2 = locals.get(_param2) - 1;

          if (_value2 === 0) {
            locals.delete(_param2);
          } else {
            locals.set(_param2, _value2);
          }
        }
      }
    };
    return {
      hasLocal: function hasLocal(key) {
        return locals.has(key);
      },
      node: node
    };
  }
});
define("ember-template-compiler/lib/system/bootstrap", ["exports", "ember-template-compiler/lib/system/compile"], function (_exports, _compile) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  /**
  @module ember
  */

  /**
    Find templates stored in the head tag as script tags and make them available
    to `Ember.CoreView` in the global `Ember.TEMPLATES` object.
  
    Script tags with `text/x-handlebars` will be compiled
    with Ember's template compiler and are suitable for use as a view's template.
  
    @private
    @method bootstrap
    @for Ember.HTMLBars
    @static
    @param ctx
  */
  function bootstrap(_ref) {
    var context = _ref.context,
        hasTemplate = _ref.hasTemplate,
        setTemplate = _ref.setTemplate;

    if (!context) {
      context = document;
    }

    var selector = 'script[type="text/x-handlebars"]';
    var elements = context.querySelectorAll(selector);

    for (var i = 0; i < elements.length; i++) {
      var script = elements[i]; // Get the name of the script
      // First look for data-template-name attribute, then fall back to its
      // id if no name is found.

      var templateName = script.getAttribute('data-template-name') || script.getAttribute('id') || 'application';
      var template = void 0;
      template = (0, _compile.default)(script.innerHTML, {
        moduleName: templateName
      }); // Check if template of same name already exists.

      if (hasTemplate(templateName)) {
        throw new Error("Template named \"" + templateName + "\" already exists.");
      } // For templates which have a name, we save them and then remove them from the DOM.


      setTemplate(templateName, template); // Remove script tag from DOM.

      script.parentNode.removeChild(script);
    }
  }

  var _default = bootstrap;
  _exports.default = _default;
});
define("ember-template-compiler/lib/system/calculate-location-display", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = calculateLocationDisplay;

  function calculateLocationDisplay(moduleName, loc) {
    var moduleInfo = '';

    if (moduleName) {
      moduleInfo += "'" + moduleName + "' ";
    }

    if (loc) {
      var _ref = loc.start || {
        line: undefined,
        column: undefined
      },
          column = _ref.column,
          line = _ref.line;

      if (line !== undefined && column !== undefined) {
        if (moduleName) {
          // only prepend @ if the moduleName was present
          moduleInfo += '@ ';
        }

        moduleInfo += "L" + line + ":C" + column;
      }
    }

    if (moduleInfo) {
      moduleInfo = "(" + moduleInfo + ") ";
    }

    return moduleInfo;
  }
});
define("ember-template-compiler/lib/system/compile-options", ["exports", "@ember/debug", "@ember/polyfills", "ember-template-compiler/lib/plugins/index", "ember-template-compiler/lib/system/dasherize-component-name"], function (_exports, _debug, _polyfills, _index, _dasherizeComponentName) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.buildCompileOptions = buildCompileOptions;
  _exports.transformsFor = transformsFor;
  _exports.default = compileOptions;
  _exports.registerPlugin = registerPlugin;
  _exports.unregisterPlugin = unregisterPlugin;
  var USER_PLUGINS = [];

  function malformedComponentLookup(string) {
    return string.indexOf('::') === -1 && string.indexOf(':') > -1;
  }

  function buildCompileOptions(_options) {
    var moduleName = _options.moduleName;
    var options = (0, _polyfills.assign)({
      meta: {},
      isProduction: false,
      plugins: {
        ast: []
      }
    }, _options, {
      moduleName: moduleName,
      customizeComponentName: function customizeComponentName(tagname) {
        (true && !(!malformedComponentLookup(tagname)) && (0, _debug.assert)("You tried to invoke a component named <" + tagname + " /> in \"" + (moduleName !== null && moduleName !== void 0 ? moduleName : '[NO MODULE]') + "\", but that is not a valid name for a component. Did you mean to use the \"::\" syntax for nested components?", !malformedComponentLookup(tagname)));
        return _dasherizeComponentName.default.get(tagname);
      }
    });

    if (!true
    /* EMBER_STRICT_MODE */
    ) {
        options.strictMode = false;
        options.locals = undefined;
      }

    if ('locals' in options && !options.locals) {
      // Glimmer's precompile options declare `locals` like:
      //    locals?: string[]
      // but many in-use versions of babel-plugin-htmlbars-inline-precompile will
      // set locals to `null`. This used to work but only because glimmer was
      // ignoring locals for non-strict templates, and now it supports that case.
      delete options.locals;
    } // move `moduleName` into `meta` property


    if (options.moduleName) {
      var meta = options.meta;
      (true && !(meta) && (0, _debug.assert)('has meta', meta)); // We just set it

      meta.moduleName = options.moduleName;
    }

    return options;
  }

  function transformsFor(options) {
    return true
    /* EMBER_STRICT_MODE */
    && options.strictMode ? _index.STRICT_MODE_TRANSFORMS : _index.RESOLUTION_MODE_TRANSFORMS;
  }

  function compileOptions(_options) {
    if (_options === void 0) {
      _options = {};
    }

    var options = buildCompileOptions(_options);
    var builtInPlugins = transformsFor(options);

    if (!_options.plugins) {
      options.plugins = {
        ast: [].concat(USER_PLUGINS, builtInPlugins)
      };
    } else {
      var potententialPugins = [].concat(USER_PLUGINS, builtInPlugins);
      (true && !(options.plugins) && (0, _debug.assert)('expected plugins', options.plugins));
      var providedPlugins = options.plugins.ast.map(function (plugin) {
        return wrapLegacyPluginIfNeeded(plugin);
      });
      var pluginsToAdd = potententialPugins.filter(function (plugin) {
        (true && !(options.plugins) && (0, _debug.assert)('expected plugins', options.plugins));
        return options.plugins.ast.indexOf(plugin) === -1;
      });
      options.plugins.ast = providedPlugins.concat(pluginsToAdd);
    }

    return options;
  }

  function isLegacyPluginClass(plugin) {
    return plugin.prototype && typeof plugin.prototype.transform === 'function';
  }

  function wrapLegacyPluginIfNeeded(plugin) {
    if (isLegacyPluginClass(plugin)) {
      var Plugin = plugin;
      (true && !(false) && (0, _debug.deprecate)("Using class based template compilation plugins is deprecated, please update to the functional style: " + Plugin.name, false, {
        id: 'template-compiler.registerPlugin',
        until: '4.0.0',
        for: 'ember-source',
        since: {
          enabled: '3.27.0'
        }
      }));

      var pluginFunc = function pluginFunc(env) {
        var pluginInstantiated = false;
        return {
          name: plugin.name,
          visitor: {
            Program: function Program(node) {
              if (!pluginInstantiated) {
                pluginInstantiated = true;
                var instance = new Plugin(env);
                instance.syntax = env.syntax;
                return instance.transform(node);
              }
            }
          }
        };
      };

      pluginFunc.__raw = Plugin;
      return pluginFunc;
    } else {
      return plugin;
    }
  }

  function registerPlugin(type, _plugin) {
    (true && !(false) && (0, _debug.deprecate)('registerPlugin is deprecated, please pass plugins directly via `compile` and/or `precompile`.', false, {
      id: 'template-compiler.registerPlugin',
      until: '4.0.0',
      for: 'ember-source',
      since: {
        enabled: '3.27.0'
      }
    }));

    if (type !== 'ast') {
      throw new Error("Attempting to register " + _plugin + " as \"" + type + "\" which is not a valid Glimmer plugin type.");
    }

    for (var i = 0; i < USER_PLUGINS.length; i++) {
      var PLUGIN = USER_PLUGINS[i];

      if (PLUGIN === _plugin || PLUGIN.__raw === _plugin) {
        return;
      }
    }

    var plugin = wrapLegacyPluginIfNeeded(_plugin);
    USER_PLUGINS = [plugin].concat(USER_PLUGINS);
  }

  function unregisterPlugin(type, PluginClass) {
    (true && !(false) && (0, _debug.deprecate)('unregisterPlugin is deprecated, please pass plugins directly via `compile` and/or `precompile`.', false, {
      id: 'template-compiler.registerPlugin',
      until: '4.0.0',
      for: 'ember-source',
      since: {
        enabled: '3.27.0'
      }
    }));

    if (type !== 'ast') {
      throw new Error("Attempting to unregister " + PluginClass + " as \"" + type + "\" which is not a valid Glimmer plugin type.");
    }

    USER_PLUGINS = USER_PLUGINS.filter(function (plugin) {
      return plugin !== PluginClass && plugin.__raw !== PluginClass;
    });
  }
});
define("ember-template-compiler/lib/system/compile", ["exports", "require", "ember-template-compiler/lib/system/precompile"], function (_exports, _require, _precompile) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = compile;

  /**
  @module ember
  */
  var template;
  /**
    Uses HTMLBars `compile` function to process a string into a compiled template.
    This is not present in production builds.
    @private
    @method compile
    @param {String} templateString This is the string to be compiled by HTMLBars.
    @param {Object} options This is an options hash to augment the compiler options.
  */

  function compile(templateString, options) {
    if (options === void 0) {
      options = {};
    }

    if (!template && (0, _require.has)('@ember/-internals/glimmer')) {
      // tslint:disable-next-line:no-require-imports
      template = (0, _require.default)("@ember/-internals/glimmer").template;
    }

    if (!template) {
      throw new Error('Cannot call `compile` with only the template compiler loaded. Please load `ember.debug.js` or `ember.prod.js` prior to calling `compile`.');
    }

    return template(evaluate((0, _precompile.default)(templateString, options)));
  }

  function evaluate(precompiled) {
    return new Function("return " + precompiled)();
  }
});
define("ember-template-compiler/lib/system/dasherize-component-name", ["exports", "@ember/-internals/utils"], function (_exports, _utils) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  /*
    This diverges from `Ember.String.dasherize` so that`<XFoo />` can resolve to `x-foo`.
    `Ember.String.dasherize` would resolve it to `xfoo`..
  */
  var SIMPLE_DASHERIZE_REGEXP = /[A-Z]|::/g;
  var ALPHA = /[A-Za-z0-9]/;

  var _default = new _utils.Cache(1000, function (key) {
    return key.replace(SIMPLE_DASHERIZE_REGEXP, function (char, index) {
      if (char === '::') {
        return '/';
      }

      if (index === 0 || !ALPHA.test(key[index - 1])) {
        return char.toLowerCase();
      }

      return "-" + char.toLowerCase();
    });
  });

  _exports.default = _default;
});
define("ember-template-compiler/lib/system/initializer", ["require", "ember-template-compiler/lib/system/bootstrap"], function (_require, _bootstrap) {
  "use strict";

  // Globals mode template compiler
  if ((0, _require.has)('@ember/application') && (0, _require.has)('@ember/-internals/browser-environment') && (0, _require.has)('@ember/-internals/glimmer')) {
    // tslint:disable:no-require-imports
    var emberEnv = (0, _require.default)("@ember/-internals/browser-environment");
    var emberGlimmer = (0, _require.default)("@ember/-internals/glimmer");
    var emberApp = (0, _require.default)("@ember/application");
    var Application = emberApp.default;
    var hasTemplate = emberGlimmer.hasTemplate,
        setTemplate = emberGlimmer.setTemplate;
    var hasDOM = emberEnv.hasDOM;
    Application.initializer({
      name: 'domTemplates',
      initialize: function initialize() {
        if (hasDOM) {
          (0, _bootstrap.default)({
            context: document,
            hasTemplate: hasTemplate,
            setTemplate: setTemplate
          });
        }
      }
    });
  }
});
define("ember-template-compiler/lib/system/precompile", ["exports", "@glimmer/compiler", "ember-template-compiler/lib/system/compile-options"], function (_exports, _compiler, _compileOptions) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = precompile;

  /**
  @module ember
  */

  /**
    Uses HTMLBars `compile` function to process a string into a compiled template string.
    The returned string must be passed through `Ember.HTMLBars.template`.
  
    This is not present in production builds.
  
    @private
    @method precompile
    @param {String} templateString This is the string to be compiled by HTMLBars.
  */
  function precompile(templateString, options) {
    if (options === void 0) {
      options = {};
    }

    return (0, _compiler.precompile)(templateString, (0, _compileOptions.default)(options));
  }
});
define("ember/version", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = "3.28.12";
  _exports.default = _default;
});
define("simple-html-tokenizer", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.tokenize = tokenize;
  _exports.Tokenizer = _exports.EventedTokenizer = _exports.EntityParser = _exports.HTML5NamedCharRefs = void 0;

  /**
   * generated from https://raw.githubusercontent.com/w3c/html/26b5126f96f736f796b9e29718138919dd513744/entities.json
   * do not edit
   */
  var namedCharRefs = {
    Aacute: "Á",
    aacute: "á",
    Abreve: "Ă",
    abreve: "ă",
    ac: "∾",
    acd: "∿",
    acE: "∾̳",
    Acirc: "Â",
    acirc: "â",
    acute: "´",
    Acy: "А",
    acy: "а",
    AElig: "Æ",
    aelig: "æ",
    af: "\u2061",
    Afr: "𝔄",
    afr: "𝔞",
    Agrave: "À",
    agrave: "à",
    alefsym: "ℵ",
    aleph: "ℵ",
    Alpha: "Α",
    alpha: "α",
    Amacr: "Ā",
    amacr: "ā",
    amalg: "⨿",
    amp: "&",
    AMP: "&",
    andand: "⩕",
    And: "⩓",
    and: "∧",
    andd: "⩜",
    andslope: "⩘",
    andv: "⩚",
    ang: "∠",
    ange: "⦤",
    angle: "∠",
    angmsdaa: "⦨",
    angmsdab: "⦩",
    angmsdac: "⦪",
    angmsdad: "⦫",
    angmsdae: "⦬",
    angmsdaf: "⦭",
    angmsdag: "⦮",
    angmsdah: "⦯",
    angmsd: "∡",
    angrt: "∟",
    angrtvb: "⊾",
    angrtvbd: "⦝",
    angsph: "∢",
    angst: "Å",
    angzarr: "⍼",
    Aogon: "Ą",
    aogon: "ą",
    Aopf: "𝔸",
    aopf: "𝕒",
    apacir: "⩯",
    ap: "≈",
    apE: "⩰",
    ape: "≊",
    apid: "≋",
    apos: "'",
    ApplyFunction: "\u2061",
    approx: "≈",
    approxeq: "≊",
    Aring: "Å",
    aring: "å",
    Ascr: "𝒜",
    ascr: "𝒶",
    Assign: "≔",
    ast: "*",
    asymp: "≈",
    asympeq: "≍",
    Atilde: "Ã",
    atilde: "ã",
    Auml: "Ä",
    auml: "ä",
    awconint: "∳",
    awint: "⨑",
    backcong: "≌",
    backepsilon: "϶",
    backprime: "‵",
    backsim: "∽",
    backsimeq: "⋍",
    Backslash: "∖",
    Barv: "⫧",
    barvee: "⊽",
    barwed: "⌅",
    Barwed: "⌆",
    barwedge: "⌅",
    bbrk: "⎵",
    bbrktbrk: "⎶",
    bcong: "≌",
    Bcy: "Б",
    bcy: "б",
    bdquo: "„",
    becaus: "∵",
    because: "∵",
    Because: "∵",
    bemptyv: "⦰",
    bepsi: "϶",
    bernou: "ℬ",
    Bernoullis: "ℬ",
    Beta: "Β",
    beta: "β",
    beth: "ℶ",
    between: "≬",
    Bfr: "𝔅",
    bfr: "𝔟",
    bigcap: "⋂",
    bigcirc: "◯",
    bigcup: "⋃",
    bigodot: "⨀",
    bigoplus: "⨁",
    bigotimes: "⨂",
    bigsqcup: "⨆",
    bigstar: "★",
    bigtriangledown: "▽",
    bigtriangleup: "△",
    biguplus: "⨄",
    bigvee: "⋁",
    bigwedge: "⋀",
    bkarow: "⤍",
    blacklozenge: "⧫",
    blacksquare: "▪",
    blacktriangle: "▴",
    blacktriangledown: "▾",
    blacktriangleleft: "◂",
    blacktriangleright: "▸",
    blank: "␣",
    blk12: "▒",
    blk14: "░",
    blk34: "▓",
    block: "█",
    bne: "=⃥",
    bnequiv: "≡⃥",
    bNot: "⫭",
    bnot: "⌐",
    Bopf: "𝔹",
    bopf: "𝕓",
    bot: "⊥",
    bottom: "⊥",
    bowtie: "⋈",
    boxbox: "⧉",
    boxdl: "┐",
    boxdL: "╕",
    boxDl: "╖",
    boxDL: "╗",
    boxdr: "┌",
    boxdR: "╒",
    boxDr: "╓",
    boxDR: "╔",
    boxh: "─",
    boxH: "═",
    boxhd: "┬",
    boxHd: "╤",
    boxhD: "╥",
    boxHD: "╦",
    boxhu: "┴",
    boxHu: "╧",
    boxhU: "╨",
    boxHU: "╩",
    boxminus: "⊟",
    boxplus: "⊞",
    boxtimes: "⊠",
    boxul: "┘",
    boxuL: "╛",
    boxUl: "╜",
    boxUL: "╝",
    boxur: "└",
    boxuR: "╘",
    boxUr: "╙",
    boxUR: "╚",
    boxv: "│",
    boxV: "║",
    boxvh: "┼",
    boxvH: "╪",
    boxVh: "╫",
    boxVH: "╬",
    boxvl: "┤",
    boxvL: "╡",
    boxVl: "╢",
    boxVL: "╣",
    boxvr: "├",
    boxvR: "╞",
    boxVr: "╟",
    boxVR: "╠",
    bprime: "‵",
    breve: "˘",
    Breve: "˘",
    brvbar: "¦",
    bscr: "𝒷",
    Bscr: "ℬ",
    bsemi: "⁏",
    bsim: "∽",
    bsime: "⋍",
    bsolb: "⧅",
    bsol: "\\",
    bsolhsub: "⟈",
    bull: "•",
    bullet: "•",
    bump: "≎",
    bumpE: "⪮",
    bumpe: "≏",
    Bumpeq: "≎",
    bumpeq: "≏",
    Cacute: "Ć",
    cacute: "ć",
    capand: "⩄",
    capbrcup: "⩉",
    capcap: "⩋",
    cap: "∩",
    Cap: "⋒",
    capcup: "⩇",
    capdot: "⩀",
    CapitalDifferentialD: "ⅅ",
    caps: "∩︀",
    caret: "⁁",
    caron: "ˇ",
    Cayleys: "ℭ",
    ccaps: "⩍",
    Ccaron: "Č",
    ccaron: "č",
    Ccedil: "Ç",
    ccedil: "ç",
    Ccirc: "Ĉ",
    ccirc: "ĉ",
    Cconint: "∰",
    ccups: "⩌",
    ccupssm: "⩐",
    Cdot: "Ċ",
    cdot: "ċ",
    cedil: "¸",
    Cedilla: "¸",
    cemptyv: "⦲",
    cent: "¢",
    centerdot: "·",
    CenterDot: "·",
    cfr: "𝔠",
    Cfr: "ℭ",
    CHcy: "Ч",
    chcy: "ч",
    check: "✓",
    checkmark: "✓",
    Chi: "Χ",
    chi: "χ",
    circ: "ˆ",
    circeq: "≗",
    circlearrowleft: "↺",
    circlearrowright: "↻",
    circledast: "⊛",
    circledcirc: "⊚",
    circleddash: "⊝",
    CircleDot: "⊙",
    circledR: "®",
    circledS: "Ⓢ",
    CircleMinus: "⊖",
    CirclePlus: "⊕",
    CircleTimes: "⊗",
    cir: "○",
    cirE: "⧃",
    cire: "≗",
    cirfnint: "⨐",
    cirmid: "⫯",
    cirscir: "⧂",
    ClockwiseContourIntegral: "∲",
    CloseCurlyDoubleQuote: "”",
    CloseCurlyQuote: "’",
    clubs: "♣",
    clubsuit: "♣",
    colon: ":",
    Colon: "∷",
    Colone: "⩴",
    colone: "≔",
    coloneq: "≔",
    comma: ",",
    commat: "@",
    comp: "∁",
    compfn: "∘",
    complement: "∁",
    complexes: "ℂ",
    cong: "≅",
    congdot: "⩭",
    Congruent: "≡",
    conint: "∮",
    Conint: "∯",
    ContourIntegral: "∮",
    copf: "𝕔",
    Copf: "ℂ",
    coprod: "∐",
    Coproduct: "∐",
    copy: "©",
    COPY: "©",
    copysr: "℗",
    CounterClockwiseContourIntegral: "∳",
    crarr: "↵",
    cross: "✗",
    Cross: "⨯",
    Cscr: "𝒞",
    cscr: "𝒸",
    csub: "⫏",
    csube: "⫑",
    csup: "⫐",
    csupe: "⫒",
    ctdot: "⋯",
    cudarrl: "⤸",
    cudarrr: "⤵",
    cuepr: "⋞",
    cuesc: "⋟",
    cularr: "↶",
    cularrp: "⤽",
    cupbrcap: "⩈",
    cupcap: "⩆",
    CupCap: "≍",
    cup: "∪",
    Cup: "⋓",
    cupcup: "⩊",
    cupdot: "⊍",
    cupor: "⩅",
    cups: "∪︀",
    curarr: "↷",
    curarrm: "⤼",
    curlyeqprec: "⋞",
    curlyeqsucc: "⋟",
    curlyvee: "⋎",
    curlywedge: "⋏",
    curren: "¤",
    curvearrowleft: "↶",
    curvearrowright: "↷",
    cuvee: "⋎",
    cuwed: "⋏",
    cwconint: "∲",
    cwint: "∱",
    cylcty: "⌭",
    dagger: "†",
    Dagger: "‡",
    daleth: "ℸ",
    darr: "↓",
    Darr: "↡",
    dArr: "⇓",
    dash: "‐",
    Dashv: "⫤",
    dashv: "⊣",
    dbkarow: "⤏",
    dblac: "˝",
    Dcaron: "Ď",
    dcaron: "ď",
    Dcy: "Д",
    dcy: "д",
    ddagger: "‡",
    ddarr: "⇊",
    DD: "ⅅ",
    dd: "ⅆ",
    DDotrahd: "⤑",
    ddotseq: "⩷",
    deg: "°",
    Del: "∇",
    Delta: "Δ",
    delta: "δ",
    demptyv: "⦱",
    dfisht: "⥿",
    Dfr: "𝔇",
    dfr: "𝔡",
    dHar: "⥥",
    dharl: "⇃",
    dharr: "⇂",
    DiacriticalAcute: "´",
    DiacriticalDot: "˙",
    DiacriticalDoubleAcute: "˝",
    DiacriticalGrave: "`",
    DiacriticalTilde: "˜",
    diam: "⋄",
    diamond: "⋄",
    Diamond: "⋄",
    diamondsuit: "♦",
    diams: "♦",
    die: "¨",
    DifferentialD: "ⅆ",
    digamma: "ϝ",
    disin: "⋲",
    div: "÷",
    divide: "÷",
    divideontimes: "⋇",
    divonx: "⋇",
    DJcy: "Ђ",
    djcy: "ђ",
    dlcorn: "⌞",
    dlcrop: "⌍",
    dollar: "$",
    Dopf: "𝔻",
    dopf: "𝕕",
    Dot: "¨",
    dot: "˙",
    DotDot: "⃜",
    doteq: "≐",
    doteqdot: "≑",
    DotEqual: "≐",
    dotminus: "∸",
    dotplus: "∔",
    dotsquare: "⊡",
    doublebarwedge: "⌆",
    DoubleContourIntegral: "∯",
    DoubleDot: "¨",
    DoubleDownArrow: "⇓",
    DoubleLeftArrow: "⇐",
    DoubleLeftRightArrow: "⇔",
    DoubleLeftTee: "⫤",
    DoubleLongLeftArrow: "⟸",
    DoubleLongLeftRightArrow: "⟺",
    DoubleLongRightArrow: "⟹",
    DoubleRightArrow: "⇒",
    DoubleRightTee: "⊨",
    DoubleUpArrow: "⇑",
    DoubleUpDownArrow: "⇕",
    DoubleVerticalBar: "∥",
    DownArrowBar: "⤓",
    downarrow: "↓",
    DownArrow: "↓",
    Downarrow: "⇓",
    DownArrowUpArrow: "⇵",
    DownBreve: "̑",
    downdownarrows: "⇊",
    downharpoonleft: "⇃",
    downharpoonright: "⇂",
    DownLeftRightVector: "⥐",
    DownLeftTeeVector: "⥞",
    DownLeftVectorBar: "⥖",
    DownLeftVector: "↽",
    DownRightTeeVector: "⥟",
    DownRightVectorBar: "⥗",
    DownRightVector: "⇁",
    DownTeeArrow: "↧",
    DownTee: "⊤",
    drbkarow: "⤐",
    drcorn: "⌟",
    drcrop: "⌌",
    Dscr: "𝒟",
    dscr: "𝒹",
    DScy: "Ѕ",
    dscy: "ѕ",
    dsol: "⧶",
    Dstrok: "Đ",
    dstrok: "đ",
    dtdot: "⋱",
    dtri: "▿",
    dtrif: "▾",
    duarr: "⇵",
    duhar: "⥯",
    dwangle: "⦦",
    DZcy: "Џ",
    dzcy: "џ",
    dzigrarr: "⟿",
    Eacute: "É",
    eacute: "é",
    easter: "⩮",
    Ecaron: "Ě",
    ecaron: "ě",
    Ecirc: "Ê",
    ecirc: "ê",
    ecir: "≖",
    ecolon: "≕",
    Ecy: "Э",
    ecy: "э",
    eDDot: "⩷",
    Edot: "Ė",
    edot: "ė",
    eDot: "≑",
    ee: "ⅇ",
    efDot: "≒",
    Efr: "𝔈",
    efr: "𝔢",
    eg: "⪚",
    Egrave: "È",
    egrave: "è",
    egs: "⪖",
    egsdot: "⪘",
    el: "⪙",
    Element: "∈",
    elinters: "⏧",
    ell: "ℓ",
    els: "⪕",
    elsdot: "⪗",
    Emacr: "Ē",
    emacr: "ē",
    empty: "∅",
    emptyset: "∅",
    EmptySmallSquare: "◻",
    emptyv: "∅",
    EmptyVerySmallSquare: "▫",
    emsp13: " ",
    emsp14: " ",
    emsp: " ",
    ENG: "Ŋ",
    eng: "ŋ",
    ensp: " ",
    Eogon: "Ę",
    eogon: "ę",
    Eopf: "𝔼",
    eopf: "𝕖",
    epar: "⋕",
    eparsl: "⧣",
    eplus: "⩱",
    epsi: "ε",
    Epsilon: "Ε",
    epsilon: "ε",
    epsiv: "ϵ",
    eqcirc: "≖",
    eqcolon: "≕",
    eqsim: "≂",
    eqslantgtr: "⪖",
    eqslantless: "⪕",
    Equal: "⩵",
    equals: "=",
    EqualTilde: "≂",
    equest: "≟",
    Equilibrium: "⇌",
    equiv: "≡",
    equivDD: "⩸",
    eqvparsl: "⧥",
    erarr: "⥱",
    erDot: "≓",
    escr: "ℯ",
    Escr: "ℰ",
    esdot: "≐",
    Esim: "⩳",
    esim: "≂",
    Eta: "Η",
    eta: "η",
    ETH: "Ð",
    eth: "ð",
    Euml: "Ë",
    euml: "ë",
    euro: "€",
    excl: "!",
    exist: "∃",
    Exists: "∃",
    expectation: "ℰ",
    exponentiale: "ⅇ",
    ExponentialE: "ⅇ",
    fallingdotseq: "≒",
    Fcy: "Ф",
    fcy: "ф",
    female: "♀",
    ffilig: "ﬃ",
    fflig: "ﬀ",
    ffllig: "ﬄ",
    Ffr: "𝔉",
    ffr: "𝔣",
    filig: "ﬁ",
    FilledSmallSquare: "◼",
    FilledVerySmallSquare: "▪",
    fjlig: "fj",
    flat: "♭",
    fllig: "ﬂ",
    fltns: "▱",
    fnof: "ƒ",
    Fopf: "𝔽",
    fopf: "𝕗",
    forall: "∀",
    ForAll: "∀",
    fork: "⋔",
    forkv: "⫙",
    Fouriertrf: "ℱ",
    fpartint: "⨍",
    frac12: "½",
    frac13: "⅓",
    frac14: "¼",
    frac15: "⅕",
    frac16: "⅙",
    frac18: "⅛",
    frac23: "⅔",
    frac25: "⅖",
    frac34: "¾",
    frac35: "⅗",
    frac38: "⅜",
    frac45: "⅘",
    frac56: "⅚",
    frac58: "⅝",
    frac78: "⅞",
    frasl: "⁄",
    frown: "⌢",
    fscr: "𝒻",
    Fscr: "ℱ",
    gacute: "ǵ",
    Gamma: "Γ",
    gamma: "γ",
    Gammad: "Ϝ",
    gammad: "ϝ",
    gap: "⪆",
    Gbreve: "Ğ",
    gbreve: "ğ",
    Gcedil: "Ģ",
    Gcirc: "Ĝ",
    gcirc: "ĝ",
    Gcy: "Г",
    gcy: "г",
    Gdot: "Ġ",
    gdot: "ġ",
    ge: "≥",
    gE: "≧",
    gEl: "⪌",
    gel: "⋛",
    geq: "≥",
    geqq: "≧",
    geqslant: "⩾",
    gescc: "⪩",
    ges: "⩾",
    gesdot: "⪀",
    gesdoto: "⪂",
    gesdotol: "⪄",
    gesl: "⋛︀",
    gesles: "⪔",
    Gfr: "𝔊",
    gfr: "𝔤",
    gg: "≫",
    Gg: "⋙",
    ggg: "⋙",
    gimel: "ℷ",
    GJcy: "Ѓ",
    gjcy: "ѓ",
    gla: "⪥",
    gl: "≷",
    glE: "⪒",
    glj: "⪤",
    gnap: "⪊",
    gnapprox: "⪊",
    gne: "⪈",
    gnE: "≩",
    gneq: "⪈",
    gneqq: "≩",
    gnsim: "⋧",
    Gopf: "𝔾",
    gopf: "𝕘",
    grave: "`",
    GreaterEqual: "≥",
    GreaterEqualLess: "⋛",
    GreaterFullEqual: "≧",
    GreaterGreater: "⪢",
    GreaterLess: "≷",
    GreaterSlantEqual: "⩾",
    GreaterTilde: "≳",
    Gscr: "𝒢",
    gscr: "ℊ",
    gsim: "≳",
    gsime: "⪎",
    gsiml: "⪐",
    gtcc: "⪧",
    gtcir: "⩺",
    gt: ">",
    GT: ">",
    Gt: "≫",
    gtdot: "⋗",
    gtlPar: "⦕",
    gtquest: "⩼",
    gtrapprox: "⪆",
    gtrarr: "⥸",
    gtrdot: "⋗",
    gtreqless: "⋛",
    gtreqqless: "⪌",
    gtrless: "≷",
    gtrsim: "≳",
    gvertneqq: "≩︀",
    gvnE: "≩︀",
    Hacek: "ˇ",
    hairsp: " ",
    half: "½",
    hamilt: "ℋ",
    HARDcy: "Ъ",
    hardcy: "ъ",
    harrcir: "⥈",
    harr: "↔",
    hArr: "⇔",
    harrw: "↭",
    Hat: "^",
    hbar: "ℏ",
    Hcirc: "Ĥ",
    hcirc: "ĥ",
    hearts: "♥",
    heartsuit: "♥",
    hellip: "…",
    hercon: "⊹",
    hfr: "𝔥",
    Hfr: "ℌ",
    HilbertSpace: "ℋ",
    hksearow: "⤥",
    hkswarow: "⤦",
    hoarr: "⇿",
    homtht: "∻",
    hookleftarrow: "↩",
    hookrightarrow: "↪",
    hopf: "𝕙",
    Hopf: "ℍ",
    horbar: "―",
    HorizontalLine: "─",
    hscr: "𝒽",
    Hscr: "ℋ",
    hslash: "ℏ",
    Hstrok: "Ħ",
    hstrok: "ħ",
    HumpDownHump: "≎",
    HumpEqual: "≏",
    hybull: "⁃",
    hyphen: "‐",
    Iacute: "Í",
    iacute: "í",
    ic: "\u2063",
    Icirc: "Î",
    icirc: "î",
    Icy: "И",
    icy: "и",
    Idot: "İ",
    IEcy: "Е",
    iecy: "е",
    iexcl: "¡",
    iff: "⇔",
    ifr: "𝔦",
    Ifr: "ℑ",
    Igrave: "Ì",
    igrave: "ì",
    ii: "ⅈ",
    iiiint: "⨌",
    iiint: "∭",
    iinfin: "⧜",
    iiota: "℩",
    IJlig: "Ĳ",
    ijlig: "ĳ",
    Imacr: "Ī",
    imacr: "ī",
    image: "ℑ",
    ImaginaryI: "ⅈ",
    imagline: "ℐ",
    imagpart: "ℑ",
    imath: "ı",
    Im: "ℑ",
    imof: "⊷",
    imped: "Ƶ",
    Implies: "⇒",
    incare: "℅",
    in: "∈",
    infin: "∞",
    infintie: "⧝",
    inodot: "ı",
    intcal: "⊺",
    int: "∫",
    Int: "∬",
    integers: "ℤ",
    Integral: "∫",
    intercal: "⊺",
    Intersection: "⋂",
    intlarhk: "⨗",
    intprod: "⨼",
    InvisibleComma: "\u2063",
    InvisibleTimes: "\u2062",
    IOcy: "Ё",
    iocy: "ё",
    Iogon: "Į",
    iogon: "į",
    Iopf: "𝕀",
    iopf: "𝕚",
    Iota: "Ι",
    iota: "ι",
    iprod: "⨼",
    iquest: "¿",
    iscr: "𝒾",
    Iscr: "ℐ",
    isin: "∈",
    isindot: "⋵",
    isinE: "⋹",
    isins: "⋴",
    isinsv: "⋳",
    isinv: "∈",
    it: "\u2062",
    Itilde: "Ĩ",
    itilde: "ĩ",
    Iukcy: "І",
    iukcy: "і",
    Iuml: "Ï",
    iuml: "ï",
    Jcirc: "Ĵ",
    jcirc: "ĵ",
    Jcy: "Й",
    jcy: "й",
    Jfr: "𝔍",
    jfr: "𝔧",
    jmath: "ȷ",
    Jopf: "𝕁",
    jopf: "𝕛",
    Jscr: "𝒥",
    jscr: "𝒿",
    Jsercy: "Ј",
    jsercy: "ј",
    Jukcy: "Є",
    jukcy: "є",
    Kappa: "Κ",
    kappa: "κ",
    kappav: "ϰ",
    Kcedil: "Ķ",
    kcedil: "ķ",
    Kcy: "К",
    kcy: "к",
    Kfr: "𝔎",
    kfr: "𝔨",
    kgreen: "ĸ",
    KHcy: "Х",
    khcy: "х",
    KJcy: "Ќ",
    kjcy: "ќ",
    Kopf: "𝕂",
    kopf: "𝕜",
    Kscr: "𝒦",
    kscr: "𝓀",
    lAarr: "⇚",
    Lacute: "Ĺ",
    lacute: "ĺ",
    laemptyv: "⦴",
    lagran: "ℒ",
    Lambda: "Λ",
    lambda: "λ",
    lang: "⟨",
    Lang: "⟪",
    langd: "⦑",
    langle: "⟨",
    lap: "⪅",
    Laplacetrf: "ℒ",
    laquo: "«",
    larrb: "⇤",
    larrbfs: "⤟",
    larr: "←",
    Larr: "↞",
    lArr: "⇐",
    larrfs: "⤝",
    larrhk: "↩",
    larrlp: "↫",
    larrpl: "⤹",
    larrsim: "⥳",
    larrtl: "↢",
    latail: "⤙",
    lAtail: "⤛",
    lat: "⪫",
    late: "⪭",
    lates: "⪭︀",
    lbarr: "⤌",
    lBarr: "⤎",
    lbbrk: "❲",
    lbrace: "{",
    lbrack: "[",
    lbrke: "⦋",
    lbrksld: "⦏",
    lbrkslu: "⦍",
    Lcaron: "Ľ",
    lcaron: "ľ",
    Lcedil: "Ļ",
    lcedil: "ļ",
    lceil: "⌈",
    lcub: "{",
    Lcy: "Л",
    lcy: "л",
    ldca: "⤶",
    ldquo: "“",
    ldquor: "„",
    ldrdhar: "⥧",
    ldrushar: "⥋",
    ldsh: "↲",
    le: "≤",
    lE: "≦",
    LeftAngleBracket: "⟨",
    LeftArrowBar: "⇤",
    leftarrow: "←",
    LeftArrow: "←",
    Leftarrow: "⇐",
    LeftArrowRightArrow: "⇆",
    leftarrowtail: "↢",
    LeftCeiling: "⌈",
    LeftDoubleBracket: "⟦",
    LeftDownTeeVector: "⥡",
    LeftDownVectorBar: "⥙",
    LeftDownVector: "⇃",
    LeftFloor: "⌊",
    leftharpoondown: "↽",
    leftharpoonup: "↼",
    leftleftarrows: "⇇",
    leftrightarrow: "↔",
    LeftRightArrow: "↔",
    Leftrightarrow: "⇔",
    leftrightarrows: "⇆",
    leftrightharpoons: "⇋",
    leftrightsquigarrow: "↭",
    LeftRightVector: "⥎",
    LeftTeeArrow: "↤",
    LeftTee: "⊣",
    LeftTeeVector: "⥚",
    leftthreetimes: "⋋",
    LeftTriangleBar: "⧏",
    LeftTriangle: "⊲",
    LeftTriangleEqual: "⊴",
    LeftUpDownVector: "⥑",
    LeftUpTeeVector: "⥠",
    LeftUpVectorBar: "⥘",
    LeftUpVector: "↿",
    LeftVectorBar: "⥒",
    LeftVector: "↼",
    lEg: "⪋",
    leg: "⋚",
    leq: "≤",
    leqq: "≦",
    leqslant: "⩽",
    lescc: "⪨",
    les: "⩽",
    lesdot: "⩿",
    lesdoto: "⪁",
    lesdotor: "⪃",
    lesg: "⋚︀",
    lesges: "⪓",
    lessapprox: "⪅",
    lessdot: "⋖",
    lesseqgtr: "⋚",
    lesseqqgtr: "⪋",
    LessEqualGreater: "⋚",
    LessFullEqual: "≦",
    LessGreater: "≶",
    lessgtr: "≶",
    LessLess: "⪡",
    lesssim: "≲",
    LessSlantEqual: "⩽",
    LessTilde: "≲",
    lfisht: "⥼",
    lfloor: "⌊",
    Lfr: "𝔏",
    lfr: "𝔩",
    lg: "≶",
    lgE: "⪑",
    lHar: "⥢",
    lhard: "↽",
    lharu: "↼",
    lharul: "⥪",
    lhblk: "▄",
    LJcy: "Љ",
    ljcy: "љ",
    llarr: "⇇",
    ll: "≪",
    Ll: "⋘",
    llcorner: "⌞",
    Lleftarrow: "⇚",
    llhard: "⥫",
    lltri: "◺",
    Lmidot: "Ŀ",
    lmidot: "ŀ",
    lmoustache: "⎰",
    lmoust: "⎰",
    lnap: "⪉",
    lnapprox: "⪉",
    lne: "⪇",
    lnE: "≨",
    lneq: "⪇",
    lneqq: "≨",
    lnsim: "⋦",
    loang: "⟬",
    loarr: "⇽",
    lobrk: "⟦",
    longleftarrow: "⟵",
    LongLeftArrow: "⟵",
    Longleftarrow: "⟸",
    longleftrightarrow: "⟷",
    LongLeftRightArrow: "⟷",
    Longleftrightarrow: "⟺",
    longmapsto: "⟼",
    longrightarrow: "⟶",
    LongRightArrow: "⟶",
    Longrightarrow: "⟹",
    looparrowleft: "↫",
    looparrowright: "↬",
    lopar: "⦅",
    Lopf: "𝕃",
    lopf: "𝕝",
    loplus: "⨭",
    lotimes: "⨴",
    lowast: "∗",
    lowbar: "_",
    LowerLeftArrow: "↙",
    LowerRightArrow: "↘",
    loz: "◊",
    lozenge: "◊",
    lozf: "⧫",
    lpar: "(",
    lparlt: "⦓",
    lrarr: "⇆",
    lrcorner: "⌟",
    lrhar: "⇋",
    lrhard: "⥭",
    lrm: "\u200E",
    lrtri: "⊿",
    lsaquo: "‹",
    lscr: "𝓁",
    Lscr: "ℒ",
    lsh: "↰",
    Lsh: "↰",
    lsim: "≲",
    lsime: "⪍",
    lsimg: "⪏",
    lsqb: "[",
    lsquo: "‘",
    lsquor: "‚",
    Lstrok: "Ł",
    lstrok: "ł",
    ltcc: "⪦",
    ltcir: "⩹",
    lt: "<",
    LT: "<",
    Lt: "≪",
    ltdot: "⋖",
    lthree: "⋋",
    ltimes: "⋉",
    ltlarr: "⥶",
    ltquest: "⩻",
    ltri: "◃",
    ltrie: "⊴",
    ltrif: "◂",
    ltrPar: "⦖",
    lurdshar: "⥊",
    luruhar: "⥦",
    lvertneqq: "≨︀",
    lvnE: "≨︀",
    macr: "¯",
    male: "♂",
    malt: "✠",
    maltese: "✠",
    Map: "⤅",
    map: "↦",
    mapsto: "↦",
    mapstodown: "↧",
    mapstoleft: "↤",
    mapstoup: "↥",
    marker: "▮",
    mcomma: "⨩",
    Mcy: "М",
    mcy: "м",
    mdash: "—",
    mDDot: "∺",
    measuredangle: "∡",
    MediumSpace: " ",
    Mellintrf: "ℳ",
    Mfr: "𝔐",
    mfr: "𝔪",
    mho: "℧",
    micro: "µ",
    midast: "*",
    midcir: "⫰",
    mid: "∣",
    middot: "·",
    minusb: "⊟",
    minus: "−",
    minusd: "∸",
    minusdu: "⨪",
    MinusPlus: "∓",
    mlcp: "⫛",
    mldr: "…",
    mnplus: "∓",
    models: "⊧",
    Mopf: "𝕄",
    mopf: "𝕞",
    mp: "∓",
    mscr: "𝓂",
    Mscr: "ℳ",
    mstpos: "∾",
    Mu: "Μ",
    mu: "μ",
    multimap: "⊸",
    mumap: "⊸",
    nabla: "∇",
    Nacute: "Ń",
    nacute: "ń",
    nang: "∠⃒",
    nap: "≉",
    napE: "⩰̸",
    napid: "≋̸",
    napos: "ŉ",
    napprox: "≉",
    natural: "♮",
    naturals: "ℕ",
    natur: "♮",
    nbsp: " ",
    nbump: "≎̸",
    nbumpe: "≏̸",
    ncap: "⩃",
    Ncaron: "Ň",
    ncaron: "ň",
    Ncedil: "Ņ",
    ncedil: "ņ",
    ncong: "≇",
    ncongdot: "⩭̸",
    ncup: "⩂",
    Ncy: "Н",
    ncy: "н",
    ndash: "–",
    nearhk: "⤤",
    nearr: "↗",
    neArr: "⇗",
    nearrow: "↗",
    ne: "≠",
    nedot: "≐̸",
    NegativeMediumSpace: "​",
    NegativeThickSpace: "​",
    NegativeThinSpace: "​",
    NegativeVeryThinSpace: "​",
    nequiv: "≢",
    nesear: "⤨",
    nesim: "≂̸",
    NestedGreaterGreater: "≫",
    NestedLessLess: "≪",
    NewLine: "\n",
    nexist: "∄",
    nexists: "∄",
    Nfr: "𝔑",
    nfr: "𝔫",
    ngE: "≧̸",
    nge: "≱",
    ngeq: "≱",
    ngeqq: "≧̸",
    ngeqslant: "⩾̸",
    nges: "⩾̸",
    nGg: "⋙̸",
    ngsim: "≵",
    nGt: "≫⃒",
    ngt: "≯",
    ngtr: "≯",
    nGtv: "≫̸",
    nharr: "↮",
    nhArr: "⇎",
    nhpar: "⫲",
    ni: "∋",
    nis: "⋼",
    nisd: "⋺",
    niv: "∋",
    NJcy: "Њ",
    njcy: "њ",
    nlarr: "↚",
    nlArr: "⇍",
    nldr: "‥",
    nlE: "≦̸",
    nle: "≰",
    nleftarrow: "↚",
    nLeftarrow: "⇍",
    nleftrightarrow: "↮",
    nLeftrightarrow: "⇎",
    nleq: "≰",
    nleqq: "≦̸",
    nleqslant: "⩽̸",
    nles: "⩽̸",
    nless: "≮",
    nLl: "⋘̸",
    nlsim: "≴",
    nLt: "≪⃒",
    nlt: "≮",
    nltri: "⋪",
    nltrie: "⋬",
    nLtv: "≪̸",
    nmid: "∤",
    NoBreak: "\u2060",
    NonBreakingSpace: " ",
    nopf: "𝕟",
    Nopf: "ℕ",
    Not: "⫬",
    not: "¬",
    NotCongruent: "≢",
    NotCupCap: "≭",
    NotDoubleVerticalBar: "∦",
    NotElement: "∉",
    NotEqual: "≠",
    NotEqualTilde: "≂̸",
    NotExists: "∄",
    NotGreater: "≯",
    NotGreaterEqual: "≱",
    NotGreaterFullEqual: "≧̸",
    NotGreaterGreater: "≫̸",
    NotGreaterLess: "≹",
    NotGreaterSlantEqual: "⩾̸",
    NotGreaterTilde: "≵",
    NotHumpDownHump: "≎̸",
    NotHumpEqual: "≏̸",
    notin: "∉",
    notindot: "⋵̸",
    notinE: "⋹̸",
    notinva: "∉",
    notinvb: "⋷",
    notinvc: "⋶",
    NotLeftTriangleBar: "⧏̸",
    NotLeftTriangle: "⋪",
    NotLeftTriangleEqual: "⋬",
    NotLess: "≮",
    NotLessEqual: "≰",
    NotLessGreater: "≸",
    NotLessLess: "≪̸",
    NotLessSlantEqual: "⩽̸",
    NotLessTilde: "≴",
    NotNestedGreaterGreater: "⪢̸",
    NotNestedLessLess: "⪡̸",
    notni: "∌",
    notniva: "∌",
    notnivb: "⋾",
    notnivc: "⋽",
    NotPrecedes: "⊀",
    NotPrecedesEqual: "⪯̸",
    NotPrecedesSlantEqual: "⋠",
    NotReverseElement: "∌",
    NotRightTriangleBar: "⧐̸",
    NotRightTriangle: "⋫",
    NotRightTriangleEqual: "⋭",
    NotSquareSubset: "⊏̸",
    NotSquareSubsetEqual: "⋢",
    NotSquareSuperset: "⊐̸",
    NotSquareSupersetEqual: "⋣",
    NotSubset: "⊂⃒",
    NotSubsetEqual: "⊈",
    NotSucceeds: "⊁",
    NotSucceedsEqual: "⪰̸",
    NotSucceedsSlantEqual: "⋡",
    NotSucceedsTilde: "≿̸",
    NotSuperset: "⊃⃒",
    NotSupersetEqual: "⊉",
    NotTilde: "≁",
    NotTildeEqual: "≄",
    NotTildeFullEqual: "≇",
    NotTildeTilde: "≉",
    NotVerticalBar: "∤",
    nparallel: "∦",
    npar: "∦",
    nparsl: "⫽⃥",
    npart: "∂̸",
    npolint: "⨔",
    npr: "⊀",
    nprcue: "⋠",
    nprec: "⊀",
    npreceq: "⪯̸",
    npre: "⪯̸",
    nrarrc: "⤳̸",
    nrarr: "↛",
    nrArr: "⇏",
    nrarrw: "↝̸",
    nrightarrow: "↛",
    nRightarrow: "⇏",
    nrtri: "⋫",
    nrtrie: "⋭",
    nsc: "⊁",
    nsccue: "⋡",
    nsce: "⪰̸",
    Nscr: "𝒩",
    nscr: "𝓃",
    nshortmid: "∤",
    nshortparallel: "∦",
    nsim: "≁",
    nsime: "≄",
    nsimeq: "≄",
    nsmid: "∤",
    nspar: "∦",
    nsqsube: "⋢",
    nsqsupe: "⋣",
    nsub: "⊄",
    nsubE: "⫅̸",
    nsube: "⊈",
    nsubset: "⊂⃒",
    nsubseteq: "⊈",
    nsubseteqq: "⫅̸",
    nsucc: "⊁",
    nsucceq: "⪰̸",
    nsup: "⊅",
    nsupE: "⫆̸",
    nsupe: "⊉",
    nsupset: "⊃⃒",
    nsupseteq: "⊉",
    nsupseteqq: "⫆̸",
    ntgl: "≹",
    Ntilde: "Ñ",
    ntilde: "ñ",
    ntlg: "≸",
    ntriangleleft: "⋪",
    ntrianglelefteq: "⋬",
    ntriangleright: "⋫",
    ntrianglerighteq: "⋭",
    Nu: "Ν",
    nu: "ν",
    num: "#",
    numero: "№",
    numsp: " ",
    nvap: "≍⃒",
    nvdash: "⊬",
    nvDash: "⊭",
    nVdash: "⊮",
    nVDash: "⊯",
    nvge: "≥⃒",
    nvgt: ">⃒",
    nvHarr: "⤄",
    nvinfin: "⧞",
    nvlArr: "⤂",
    nvle: "≤⃒",
    nvlt: "<⃒",
    nvltrie: "⊴⃒",
    nvrArr: "⤃",
    nvrtrie: "⊵⃒",
    nvsim: "∼⃒",
    nwarhk: "⤣",
    nwarr: "↖",
    nwArr: "⇖",
    nwarrow: "↖",
    nwnear: "⤧",
    Oacute: "Ó",
    oacute: "ó",
    oast: "⊛",
    Ocirc: "Ô",
    ocirc: "ô",
    ocir: "⊚",
    Ocy: "О",
    ocy: "о",
    odash: "⊝",
    Odblac: "Ő",
    odblac: "ő",
    odiv: "⨸",
    odot: "⊙",
    odsold: "⦼",
    OElig: "Œ",
    oelig: "œ",
    ofcir: "⦿",
    Ofr: "𝔒",
    ofr: "𝔬",
    ogon: "˛",
    Ograve: "Ò",
    ograve: "ò",
    ogt: "⧁",
    ohbar: "⦵",
    ohm: "Ω",
    oint: "∮",
    olarr: "↺",
    olcir: "⦾",
    olcross: "⦻",
    oline: "‾",
    olt: "⧀",
    Omacr: "Ō",
    omacr: "ō",
    Omega: "Ω",
    omega: "ω",
    Omicron: "Ο",
    omicron: "ο",
    omid: "⦶",
    ominus: "⊖",
    Oopf: "𝕆",
    oopf: "𝕠",
    opar: "⦷",
    OpenCurlyDoubleQuote: "“",
    OpenCurlyQuote: "‘",
    operp: "⦹",
    oplus: "⊕",
    orarr: "↻",
    Or: "⩔",
    or: "∨",
    ord: "⩝",
    order: "ℴ",
    orderof: "ℴ",
    ordf: "ª",
    ordm: "º",
    origof: "⊶",
    oror: "⩖",
    orslope: "⩗",
    orv: "⩛",
    oS: "Ⓢ",
    Oscr: "𝒪",
    oscr: "ℴ",
    Oslash: "Ø",
    oslash: "ø",
    osol: "⊘",
    Otilde: "Õ",
    otilde: "õ",
    otimesas: "⨶",
    Otimes: "⨷",
    otimes: "⊗",
    Ouml: "Ö",
    ouml: "ö",
    ovbar: "⌽",
    OverBar: "‾",
    OverBrace: "⏞",
    OverBracket: "⎴",
    OverParenthesis: "⏜",
    para: "¶",
    parallel: "∥",
    par: "∥",
    parsim: "⫳",
    parsl: "⫽",
    part: "∂",
    PartialD: "∂",
    Pcy: "П",
    pcy: "п",
    percnt: "%",
    period: ".",
    permil: "‰",
    perp: "⊥",
    pertenk: "‱",
    Pfr: "𝔓",
    pfr: "𝔭",
    Phi: "Φ",
    phi: "φ",
    phiv: "ϕ",
    phmmat: "ℳ",
    phone: "☎",
    Pi: "Π",
    pi: "π",
    pitchfork: "⋔",
    piv: "ϖ",
    planck: "ℏ",
    planckh: "ℎ",
    plankv: "ℏ",
    plusacir: "⨣",
    plusb: "⊞",
    pluscir: "⨢",
    plus: "+",
    plusdo: "∔",
    plusdu: "⨥",
    pluse: "⩲",
    PlusMinus: "±",
    plusmn: "±",
    plussim: "⨦",
    plustwo: "⨧",
    pm: "±",
    Poincareplane: "ℌ",
    pointint: "⨕",
    popf: "𝕡",
    Popf: "ℙ",
    pound: "£",
    prap: "⪷",
    Pr: "⪻",
    pr: "≺",
    prcue: "≼",
    precapprox: "⪷",
    prec: "≺",
    preccurlyeq: "≼",
    Precedes: "≺",
    PrecedesEqual: "⪯",
    PrecedesSlantEqual: "≼",
    PrecedesTilde: "≾",
    preceq: "⪯",
    precnapprox: "⪹",
    precneqq: "⪵",
    precnsim: "⋨",
    pre: "⪯",
    prE: "⪳",
    precsim: "≾",
    prime: "′",
    Prime: "″",
    primes: "ℙ",
    prnap: "⪹",
    prnE: "⪵",
    prnsim: "⋨",
    prod: "∏",
    Product: "∏",
    profalar: "⌮",
    profline: "⌒",
    profsurf: "⌓",
    prop: "∝",
    Proportional: "∝",
    Proportion: "∷",
    propto: "∝",
    prsim: "≾",
    prurel: "⊰",
    Pscr: "𝒫",
    pscr: "𝓅",
    Psi: "Ψ",
    psi: "ψ",
    puncsp: " ",
    Qfr: "𝔔",
    qfr: "𝔮",
    qint: "⨌",
    qopf: "𝕢",
    Qopf: "ℚ",
    qprime: "⁗",
    Qscr: "𝒬",
    qscr: "𝓆",
    quaternions: "ℍ",
    quatint: "⨖",
    quest: "?",
    questeq: "≟",
    quot: "\"",
    QUOT: "\"",
    rAarr: "⇛",
    race: "∽̱",
    Racute: "Ŕ",
    racute: "ŕ",
    radic: "√",
    raemptyv: "⦳",
    rang: "⟩",
    Rang: "⟫",
    rangd: "⦒",
    range: "⦥",
    rangle: "⟩",
    raquo: "»",
    rarrap: "⥵",
    rarrb: "⇥",
    rarrbfs: "⤠",
    rarrc: "⤳",
    rarr: "→",
    Rarr: "↠",
    rArr: "⇒",
    rarrfs: "⤞",
    rarrhk: "↪",
    rarrlp: "↬",
    rarrpl: "⥅",
    rarrsim: "⥴",
    Rarrtl: "⤖",
    rarrtl: "↣",
    rarrw: "↝",
    ratail: "⤚",
    rAtail: "⤜",
    ratio: "∶",
    rationals: "ℚ",
    rbarr: "⤍",
    rBarr: "⤏",
    RBarr: "⤐",
    rbbrk: "❳",
    rbrace: "}",
    rbrack: "]",
    rbrke: "⦌",
    rbrksld: "⦎",
    rbrkslu: "⦐",
    Rcaron: "Ř",
    rcaron: "ř",
    Rcedil: "Ŗ",
    rcedil: "ŗ",
    rceil: "⌉",
    rcub: "}",
    Rcy: "Р",
    rcy: "р",
    rdca: "⤷",
    rdldhar: "⥩",
    rdquo: "”",
    rdquor: "”",
    rdsh: "↳",
    real: "ℜ",
    realine: "ℛ",
    realpart: "ℜ",
    reals: "ℝ",
    Re: "ℜ",
    rect: "▭",
    reg: "®",
    REG: "®",
    ReverseElement: "∋",
    ReverseEquilibrium: "⇋",
    ReverseUpEquilibrium: "⥯",
    rfisht: "⥽",
    rfloor: "⌋",
    rfr: "𝔯",
    Rfr: "ℜ",
    rHar: "⥤",
    rhard: "⇁",
    rharu: "⇀",
    rharul: "⥬",
    Rho: "Ρ",
    rho: "ρ",
    rhov: "ϱ",
    RightAngleBracket: "⟩",
    RightArrowBar: "⇥",
    rightarrow: "→",
    RightArrow: "→",
    Rightarrow: "⇒",
    RightArrowLeftArrow: "⇄",
    rightarrowtail: "↣",
    RightCeiling: "⌉",
    RightDoubleBracket: "⟧",
    RightDownTeeVector: "⥝",
    RightDownVectorBar: "⥕",
    RightDownVector: "⇂",
    RightFloor: "⌋",
    rightharpoondown: "⇁",
    rightharpoonup: "⇀",
    rightleftarrows: "⇄",
    rightleftharpoons: "⇌",
    rightrightarrows: "⇉",
    rightsquigarrow: "↝",
    RightTeeArrow: "↦",
    RightTee: "⊢",
    RightTeeVector: "⥛",
    rightthreetimes: "⋌",
    RightTriangleBar: "⧐",
    RightTriangle: "⊳",
    RightTriangleEqual: "⊵",
    RightUpDownVector: "⥏",
    RightUpTeeVector: "⥜",
    RightUpVectorBar: "⥔",
    RightUpVector: "↾",
    RightVectorBar: "⥓",
    RightVector: "⇀",
    ring: "˚",
    risingdotseq: "≓",
    rlarr: "⇄",
    rlhar: "⇌",
    rlm: "\u200F",
    rmoustache: "⎱",
    rmoust: "⎱",
    rnmid: "⫮",
    roang: "⟭",
    roarr: "⇾",
    robrk: "⟧",
    ropar: "⦆",
    ropf: "𝕣",
    Ropf: "ℝ",
    roplus: "⨮",
    rotimes: "⨵",
    RoundImplies: "⥰",
    rpar: ")",
    rpargt: "⦔",
    rppolint: "⨒",
    rrarr: "⇉",
    Rrightarrow: "⇛",
    rsaquo: "›",
    rscr: "𝓇",
    Rscr: "ℛ",
    rsh: "↱",
    Rsh: "↱",
    rsqb: "]",
    rsquo: "’",
    rsquor: "’",
    rthree: "⋌",
    rtimes: "⋊",
    rtri: "▹",
    rtrie: "⊵",
    rtrif: "▸",
    rtriltri: "⧎",
    RuleDelayed: "⧴",
    ruluhar: "⥨",
    rx: "℞",
    Sacute: "Ś",
    sacute: "ś",
    sbquo: "‚",
    scap: "⪸",
    Scaron: "Š",
    scaron: "š",
    Sc: "⪼",
    sc: "≻",
    sccue: "≽",
    sce: "⪰",
    scE: "⪴",
    Scedil: "Ş",
    scedil: "ş",
    Scirc: "Ŝ",
    scirc: "ŝ",
    scnap: "⪺",
    scnE: "⪶",
    scnsim: "⋩",
    scpolint: "⨓",
    scsim: "≿",
    Scy: "С",
    scy: "с",
    sdotb: "⊡",
    sdot: "⋅",
    sdote: "⩦",
    searhk: "⤥",
    searr: "↘",
    seArr: "⇘",
    searrow: "↘",
    sect: "§",
    semi: ";",
    seswar: "⤩",
    setminus: "∖",
    setmn: "∖",
    sext: "✶",
    Sfr: "𝔖",
    sfr: "𝔰",
    sfrown: "⌢",
    sharp: "♯",
    SHCHcy: "Щ",
    shchcy: "щ",
    SHcy: "Ш",
    shcy: "ш",
    ShortDownArrow: "↓",
    ShortLeftArrow: "←",
    shortmid: "∣",
    shortparallel: "∥",
    ShortRightArrow: "→",
    ShortUpArrow: "↑",
    shy: "\xAD",
    Sigma: "Σ",
    sigma: "σ",
    sigmaf: "ς",
    sigmav: "ς",
    sim: "∼",
    simdot: "⩪",
    sime: "≃",
    simeq: "≃",
    simg: "⪞",
    simgE: "⪠",
    siml: "⪝",
    simlE: "⪟",
    simne: "≆",
    simplus: "⨤",
    simrarr: "⥲",
    slarr: "←",
    SmallCircle: "∘",
    smallsetminus: "∖",
    smashp: "⨳",
    smeparsl: "⧤",
    smid: "∣",
    smile: "⌣",
    smt: "⪪",
    smte: "⪬",
    smtes: "⪬︀",
    SOFTcy: "Ь",
    softcy: "ь",
    solbar: "⌿",
    solb: "⧄",
    sol: "/",
    Sopf: "𝕊",
    sopf: "𝕤",
    spades: "♠",
    spadesuit: "♠",
    spar: "∥",
    sqcap: "⊓",
    sqcaps: "⊓︀",
    sqcup: "⊔",
    sqcups: "⊔︀",
    Sqrt: "√",
    sqsub: "⊏",
    sqsube: "⊑",
    sqsubset: "⊏",
    sqsubseteq: "⊑",
    sqsup: "⊐",
    sqsupe: "⊒",
    sqsupset: "⊐",
    sqsupseteq: "⊒",
    square: "□",
    Square: "□",
    SquareIntersection: "⊓",
    SquareSubset: "⊏",
    SquareSubsetEqual: "⊑",
    SquareSuperset: "⊐",
    SquareSupersetEqual: "⊒",
    SquareUnion: "⊔",
    squarf: "▪",
    squ: "□",
    squf: "▪",
    srarr: "→",
    Sscr: "𝒮",
    sscr: "𝓈",
    ssetmn: "∖",
    ssmile: "⌣",
    sstarf: "⋆",
    Star: "⋆",
    star: "☆",
    starf: "★",
    straightepsilon: "ϵ",
    straightphi: "ϕ",
    strns: "¯",
    sub: "⊂",
    Sub: "⋐",
    subdot: "⪽",
    subE: "⫅",
    sube: "⊆",
    subedot: "⫃",
    submult: "⫁",
    subnE: "⫋",
    subne: "⊊",
    subplus: "⪿",
    subrarr: "⥹",
    subset: "⊂",
    Subset: "⋐",
    subseteq: "⊆",
    subseteqq: "⫅",
    SubsetEqual: "⊆",
    subsetneq: "⊊",
    subsetneqq: "⫋",
    subsim: "⫇",
    subsub: "⫕",
    subsup: "⫓",
    succapprox: "⪸",
    succ: "≻",
    succcurlyeq: "≽",
    Succeeds: "≻",
    SucceedsEqual: "⪰",
    SucceedsSlantEqual: "≽",
    SucceedsTilde: "≿",
    succeq: "⪰",
    succnapprox: "⪺",
    succneqq: "⪶",
    succnsim: "⋩",
    succsim: "≿",
    SuchThat: "∋",
    sum: "∑",
    Sum: "∑",
    sung: "♪",
    sup1: "¹",
    sup2: "²",
    sup3: "³",
    sup: "⊃",
    Sup: "⋑",
    supdot: "⪾",
    supdsub: "⫘",
    supE: "⫆",
    supe: "⊇",
    supedot: "⫄",
    Superset: "⊃",
    SupersetEqual: "⊇",
    suphsol: "⟉",
    suphsub: "⫗",
    suplarr: "⥻",
    supmult: "⫂",
    supnE: "⫌",
    supne: "⊋",
    supplus: "⫀",
    supset: "⊃",
    Supset: "⋑",
    supseteq: "⊇",
    supseteqq: "⫆",
    supsetneq: "⊋",
    supsetneqq: "⫌",
    supsim: "⫈",
    supsub: "⫔",
    supsup: "⫖",
    swarhk: "⤦",
    swarr: "↙",
    swArr: "⇙",
    swarrow: "↙",
    swnwar: "⤪",
    szlig: "ß",
    Tab: "\t",
    target: "⌖",
    Tau: "Τ",
    tau: "τ",
    tbrk: "⎴",
    Tcaron: "Ť",
    tcaron: "ť",
    Tcedil: "Ţ",
    tcedil: "ţ",
    Tcy: "Т",
    tcy: "т",
    tdot: "⃛",
    telrec: "⌕",
    Tfr: "𝔗",
    tfr: "𝔱",
    there4: "∴",
    therefore: "∴",
    Therefore: "∴",
    Theta: "Θ",
    theta: "θ",
    thetasym: "ϑ",
    thetav: "ϑ",
    thickapprox: "≈",
    thicksim: "∼",
    ThickSpace: "  ",
    ThinSpace: " ",
    thinsp: " ",
    thkap: "≈",
    thksim: "∼",
    THORN: "Þ",
    thorn: "þ",
    tilde: "˜",
    Tilde: "∼",
    TildeEqual: "≃",
    TildeFullEqual: "≅",
    TildeTilde: "≈",
    timesbar: "⨱",
    timesb: "⊠",
    times: "×",
    timesd: "⨰",
    tint: "∭",
    toea: "⤨",
    topbot: "⌶",
    topcir: "⫱",
    top: "⊤",
    Topf: "𝕋",
    topf: "𝕥",
    topfork: "⫚",
    tosa: "⤩",
    tprime: "‴",
    trade: "™",
    TRADE: "™",
    triangle: "▵",
    triangledown: "▿",
    triangleleft: "◃",
    trianglelefteq: "⊴",
    triangleq: "≜",
    triangleright: "▹",
    trianglerighteq: "⊵",
    tridot: "◬",
    trie: "≜",
    triminus: "⨺",
    TripleDot: "⃛",
    triplus: "⨹",
    trisb: "⧍",
    tritime: "⨻",
    trpezium: "⏢",
    Tscr: "𝒯",
    tscr: "𝓉",
    TScy: "Ц",
    tscy: "ц",
    TSHcy: "Ћ",
    tshcy: "ћ",
    Tstrok: "Ŧ",
    tstrok: "ŧ",
    twixt: "≬",
    twoheadleftarrow: "↞",
    twoheadrightarrow: "↠",
    Uacute: "Ú",
    uacute: "ú",
    uarr: "↑",
    Uarr: "↟",
    uArr: "⇑",
    Uarrocir: "⥉",
    Ubrcy: "Ў",
    ubrcy: "ў",
    Ubreve: "Ŭ",
    ubreve: "ŭ",
    Ucirc: "Û",
    ucirc: "û",
    Ucy: "У",
    ucy: "у",
    udarr: "⇅",
    Udblac: "Ű",
    udblac: "ű",
    udhar: "⥮",
    ufisht: "⥾",
    Ufr: "𝔘",
    ufr: "𝔲",
    Ugrave: "Ù",
    ugrave: "ù",
    uHar: "⥣",
    uharl: "↿",
    uharr: "↾",
    uhblk: "▀",
    ulcorn: "⌜",
    ulcorner: "⌜",
    ulcrop: "⌏",
    ultri: "◸",
    Umacr: "Ū",
    umacr: "ū",
    uml: "¨",
    UnderBar: "_",
    UnderBrace: "⏟",
    UnderBracket: "⎵",
    UnderParenthesis: "⏝",
    Union: "⋃",
    UnionPlus: "⊎",
    Uogon: "Ų",
    uogon: "ų",
    Uopf: "𝕌",
    uopf: "𝕦",
    UpArrowBar: "⤒",
    uparrow: "↑",
    UpArrow: "↑",
    Uparrow: "⇑",
    UpArrowDownArrow: "⇅",
    updownarrow: "↕",
    UpDownArrow: "↕",
    Updownarrow: "⇕",
    UpEquilibrium: "⥮",
    upharpoonleft: "↿",
    upharpoonright: "↾",
    uplus: "⊎",
    UpperLeftArrow: "↖",
    UpperRightArrow: "↗",
    upsi: "υ",
    Upsi: "ϒ",
    upsih: "ϒ",
    Upsilon: "Υ",
    upsilon: "υ",
    UpTeeArrow: "↥",
    UpTee: "⊥",
    upuparrows: "⇈",
    urcorn: "⌝",
    urcorner: "⌝",
    urcrop: "⌎",
    Uring: "Ů",
    uring: "ů",
    urtri: "◹",
    Uscr: "𝒰",
    uscr: "𝓊",
    utdot: "⋰",
    Utilde: "Ũ",
    utilde: "ũ",
    utri: "▵",
    utrif: "▴",
    uuarr: "⇈",
    Uuml: "Ü",
    uuml: "ü",
    uwangle: "⦧",
    vangrt: "⦜",
    varepsilon: "ϵ",
    varkappa: "ϰ",
    varnothing: "∅",
    varphi: "ϕ",
    varpi: "ϖ",
    varpropto: "∝",
    varr: "↕",
    vArr: "⇕",
    varrho: "ϱ",
    varsigma: "ς",
    varsubsetneq: "⊊︀",
    varsubsetneqq: "⫋︀",
    varsupsetneq: "⊋︀",
    varsupsetneqq: "⫌︀",
    vartheta: "ϑ",
    vartriangleleft: "⊲",
    vartriangleright: "⊳",
    vBar: "⫨",
    Vbar: "⫫",
    vBarv: "⫩",
    Vcy: "В",
    vcy: "в",
    vdash: "⊢",
    vDash: "⊨",
    Vdash: "⊩",
    VDash: "⊫",
    Vdashl: "⫦",
    veebar: "⊻",
    vee: "∨",
    Vee: "⋁",
    veeeq: "≚",
    vellip: "⋮",
    verbar: "|",
    Verbar: "‖",
    vert: "|",
    Vert: "‖",
    VerticalBar: "∣",
    VerticalLine: "|",
    VerticalSeparator: "❘",
    VerticalTilde: "≀",
    VeryThinSpace: " ",
    Vfr: "𝔙",
    vfr: "𝔳",
    vltri: "⊲",
    vnsub: "⊂⃒",
    vnsup: "⊃⃒",
    Vopf: "𝕍",
    vopf: "𝕧",
    vprop: "∝",
    vrtri: "⊳",
    Vscr: "𝒱",
    vscr: "𝓋",
    vsubnE: "⫋︀",
    vsubne: "⊊︀",
    vsupnE: "⫌︀",
    vsupne: "⊋︀",
    Vvdash: "⊪",
    vzigzag: "⦚",
    Wcirc: "Ŵ",
    wcirc: "ŵ",
    wedbar: "⩟",
    wedge: "∧",
    Wedge: "⋀",
    wedgeq: "≙",
    weierp: "℘",
    Wfr: "𝔚",
    wfr: "𝔴",
    Wopf: "𝕎",
    wopf: "𝕨",
    wp: "℘",
    wr: "≀",
    wreath: "≀",
    Wscr: "𝒲",
    wscr: "𝓌",
    xcap: "⋂",
    xcirc: "◯",
    xcup: "⋃",
    xdtri: "▽",
    Xfr: "𝔛",
    xfr: "𝔵",
    xharr: "⟷",
    xhArr: "⟺",
    Xi: "Ξ",
    xi: "ξ",
    xlarr: "⟵",
    xlArr: "⟸",
    xmap: "⟼",
    xnis: "⋻",
    xodot: "⨀",
    Xopf: "𝕏",
    xopf: "𝕩",
    xoplus: "⨁",
    xotime: "⨂",
    xrarr: "⟶",
    xrArr: "⟹",
    Xscr: "𝒳",
    xscr: "𝓍",
    xsqcup: "⨆",
    xuplus: "⨄",
    xutri: "△",
    xvee: "⋁",
    xwedge: "⋀",
    Yacute: "Ý",
    yacute: "ý",
    YAcy: "Я",
    yacy: "я",
    Ycirc: "Ŷ",
    ycirc: "ŷ",
    Ycy: "Ы",
    ycy: "ы",
    yen: "¥",
    Yfr: "𝔜",
    yfr: "𝔶",
    YIcy: "Ї",
    yicy: "ї",
    Yopf: "𝕐",
    yopf: "𝕪",
    Yscr: "𝒴",
    yscr: "𝓎",
    YUcy: "Ю",
    yucy: "ю",
    yuml: "ÿ",
    Yuml: "Ÿ",
    Zacute: "Ź",
    zacute: "ź",
    Zcaron: "Ž",
    zcaron: "ž",
    Zcy: "З",
    zcy: "з",
    Zdot: "Ż",
    zdot: "ż",
    zeetrf: "ℨ",
    ZeroWidthSpace: "​",
    Zeta: "Ζ",
    zeta: "ζ",
    zfr: "𝔷",
    Zfr: "ℨ",
    ZHcy: "Ж",
    zhcy: "ж",
    zigrarr: "⇝",
    zopf: "𝕫",
    Zopf: "ℤ",
    Zscr: "𝒵",
    zscr: "𝓏",
    zwj: "\u200D",
    zwnj: "\u200C"
  };
  _exports.HTML5NamedCharRefs = namedCharRefs;
  var HEXCHARCODE = /^#[xX]([A-Fa-f0-9]+)$/;
  var CHARCODE = /^#([0-9]+)$/;
  var NAMED = /^([A-Za-z0-9]+)$/;

  var EntityParser =
  /** @class */
  function () {
    function EntityParser(named) {
      this.named = named;
    }

    EntityParser.prototype.parse = function (entity) {
      if (!entity) {
        return;
      }

      var matches = entity.match(HEXCHARCODE);

      if (matches) {
        return String.fromCharCode(parseInt(matches[1], 16));
      }

      matches = entity.match(CHARCODE);

      if (matches) {
        return String.fromCharCode(parseInt(matches[1], 10));
      }

      matches = entity.match(NAMED);

      if (matches) {
        return this.named[matches[1]];
      }
    };

    return EntityParser;
  }();

  _exports.EntityParser = EntityParser;
  var WSP = /[\t\n\f ]/;
  var ALPHA = /[A-Za-z]/;
  var CRLF = /\r\n?/g;

  function isSpace(char) {
    return WSP.test(char);
  }

  function isAlpha(char) {
    return ALPHA.test(char);
  }

  function preprocessInput(input) {
    return input.replace(CRLF, '\n');
  }

  var EventedTokenizer =
  /** @class */
  function () {
    function EventedTokenizer(delegate, entityParser, mode) {
      if (mode === void 0) {
        mode = 'precompile';
      }

      this.delegate = delegate;
      this.entityParser = entityParser;
      this.mode = mode;
      this.state = "beforeData"
      /* beforeData */
      ;
      this.line = -1;
      this.column = -1;
      this.input = '';
      this.index = -1;
      this.tagNameBuffer = '';
      this.states = {
        beforeData: function beforeData() {
          var char = this.peek();

          if (char === '<' && !this.isIgnoredEndTag()) {
            this.transitionTo("tagOpen"
            /* tagOpen */
            );
            this.markTagStart();
            this.consume();
          } else {
            if (this.mode === 'precompile' && char === '\n') {
              var tag = this.tagNameBuffer.toLowerCase();

              if (tag === 'pre' || tag === 'textarea') {
                this.consume();
              }
            }

            this.transitionTo("data"
            /* data */
            );
            this.delegate.beginData();
          }
        },
        data: function data() {
          var char = this.peek();
          var tag = this.tagNameBuffer;

          if (char === '<' && !this.isIgnoredEndTag()) {
            this.delegate.finishData();
            this.transitionTo("tagOpen"
            /* tagOpen */
            );
            this.markTagStart();
            this.consume();
          } else if (char === '&' && tag !== 'script' && tag !== 'style') {
            this.consume();
            this.delegate.appendToData(this.consumeCharRef() || '&');
          } else {
            this.consume();
            this.delegate.appendToData(char);
          }
        },
        tagOpen: function tagOpen() {
          var char = this.consume();

          if (char === '!') {
            this.transitionTo("markupDeclarationOpen"
            /* markupDeclarationOpen */
            );
          } else if (char === '/') {
            this.transitionTo("endTagOpen"
            /* endTagOpen */
            );
          } else if (char === '@' || char === ':' || isAlpha(char)) {
            this.transitionTo("tagName"
            /* tagName */
            );
            this.tagNameBuffer = '';
            this.delegate.beginStartTag();
            this.appendToTagName(char);
          }
        },
        markupDeclarationOpen: function markupDeclarationOpen() {
          var char = this.consume();

          if (char === '-' && this.peek() === '-') {
            this.consume();
            this.transitionTo("commentStart"
            /* commentStart */
            );
            this.delegate.beginComment();
          }
        },
        commentStart: function commentStart() {
          var char = this.consume();

          if (char === '-') {
            this.transitionTo("commentStartDash"
            /* commentStartDash */
            );
          } else if (char === '>') {
            this.delegate.finishComment();
            this.transitionTo("beforeData"
            /* beforeData */
            );
          } else {
            this.delegate.appendToCommentData(char);
            this.transitionTo("comment"
            /* comment */
            );
          }
        },
        commentStartDash: function commentStartDash() {
          var char = this.consume();

          if (char === '-') {
            this.transitionTo("commentEnd"
            /* commentEnd */
            );
          } else if (char === '>') {
            this.delegate.finishComment();
            this.transitionTo("beforeData"
            /* beforeData */
            );
          } else {
            this.delegate.appendToCommentData('-');
            this.transitionTo("comment"
            /* comment */
            );
          }
        },
        comment: function comment() {
          var char = this.consume();

          if (char === '-') {
            this.transitionTo("commentEndDash"
            /* commentEndDash */
            );
          } else {
            this.delegate.appendToCommentData(char);
          }
        },
        commentEndDash: function commentEndDash() {
          var char = this.consume();

          if (char === '-') {
            this.transitionTo("commentEnd"
            /* commentEnd */
            );
          } else {
            this.delegate.appendToCommentData('-' + char);
            this.transitionTo("comment"
            /* comment */
            );
          }
        },
        commentEnd: function commentEnd() {
          var char = this.consume();

          if (char === '>') {
            this.delegate.finishComment();
            this.transitionTo("beforeData"
            /* beforeData */
            );
          } else {
            this.delegate.appendToCommentData('--' + char);
            this.transitionTo("comment"
            /* comment */
            );
          }
        },
        tagName: function tagName() {
          var char = this.consume();

          if (isSpace(char)) {
            this.transitionTo("beforeAttributeName"
            /* beforeAttributeName */
            );
          } else if (char === '/') {
            this.transitionTo("selfClosingStartTag"
            /* selfClosingStartTag */
            );
          } else if (char === '>') {
            this.delegate.finishTag();
            this.transitionTo("beforeData"
            /* beforeData */
            );
          } else {
            this.appendToTagName(char);
          }
        },
        endTagName: function endTagName() {
          var char = this.consume();

          if (isSpace(char)) {
            this.transitionTo("beforeAttributeName"
            /* beforeAttributeName */
            );
            this.tagNameBuffer = '';
          } else if (char === '/') {
            this.transitionTo("selfClosingStartTag"
            /* selfClosingStartTag */
            );
            this.tagNameBuffer = '';
          } else if (char === '>') {
            this.delegate.finishTag();
            this.transitionTo("beforeData"
            /* beforeData */
            );
            this.tagNameBuffer = '';
          } else {
            this.appendToTagName(char);
          }
        },
        beforeAttributeName: function beforeAttributeName() {
          var char = this.peek();

          if (isSpace(char)) {
            this.consume();
            return;
          } else if (char === '/') {
            this.transitionTo("selfClosingStartTag"
            /* selfClosingStartTag */
            );
            this.consume();
          } else if (char === '>') {
            this.consume();
            this.delegate.finishTag();
            this.transitionTo("beforeData"
            /* beforeData */
            );
          } else if (char === '=') {
            this.delegate.reportSyntaxError('attribute name cannot start with equals sign');
            this.transitionTo("attributeName"
            /* attributeName */
            );
            this.delegate.beginAttribute();
            this.consume();
            this.delegate.appendToAttributeName(char);
          } else {
            this.transitionTo("attributeName"
            /* attributeName */
            );
            this.delegate.beginAttribute();
          }
        },
        attributeName: function attributeName() {
          var char = this.peek();

          if (isSpace(char)) {
            this.transitionTo("afterAttributeName"
            /* afterAttributeName */
            );
            this.consume();
          } else if (char === '/') {
            this.delegate.beginAttributeValue(false);
            this.delegate.finishAttributeValue();
            this.consume();
            this.transitionTo("selfClosingStartTag"
            /* selfClosingStartTag */
            );
          } else if (char === '=') {
            this.transitionTo("beforeAttributeValue"
            /* beforeAttributeValue */
            );
            this.consume();
          } else if (char === '>') {
            this.delegate.beginAttributeValue(false);
            this.delegate.finishAttributeValue();
            this.consume();
            this.delegate.finishTag();
            this.transitionTo("beforeData"
            /* beforeData */
            );
          } else if (char === '"' || char === "'" || char === '<') {
            this.delegate.reportSyntaxError(char + ' is not a valid character within attribute names');
            this.consume();
            this.delegate.appendToAttributeName(char);
          } else {
            this.consume();
            this.delegate.appendToAttributeName(char);
          }
        },
        afterAttributeName: function afterAttributeName() {
          var char = this.peek();

          if (isSpace(char)) {
            this.consume();
            return;
          } else if (char === '/') {
            this.delegate.beginAttributeValue(false);
            this.delegate.finishAttributeValue();
            this.consume();
            this.transitionTo("selfClosingStartTag"
            /* selfClosingStartTag */
            );
          } else if (char === '=') {
            this.consume();
            this.transitionTo("beforeAttributeValue"
            /* beforeAttributeValue */
            );
          } else if (char === '>') {
            this.delegate.beginAttributeValue(false);
            this.delegate.finishAttributeValue();
            this.consume();
            this.delegate.finishTag();
            this.transitionTo("beforeData"
            /* beforeData */
            );
          } else {
            this.delegate.beginAttributeValue(false);
            this.delegate.finishAttributeValue();
            this.transitionTo("attributeName"
            /* attributeName */
            );
            this.delegate.beginAttribute();
            this.consume();
            this.delegate.appendToAttributeName(char);
          }
        },
        beforeAttributeValue: function beforeAttributeValue() {
          var char = this.peek();

          if (isSpace(char)) {
            this.consume();
          } else if (char === '"') {
            this.transitionTo("attributeValueDoubleQuoted"
            /* attributeValueDoubleQuoted */
            );
            this.delegate.beginAttributeValue(true);
            this.consume();
          } else if (char === "'") {
            this.transitionTo("attributeValueSingleQuoted"
            /* attributeValueSingleQuoted */
            );
            this.delegate.beginAttributeValue(true);
            this.consume();
          } else if (char === '>') {
            this.delegate.beginAttributeValue(false);
            this.delegate.finishAttributeValue();
            this.consume();
            this.delegate.finishTag();
            this.transitionTo("beforeData"
            /* beforeData */
            );
          } else {
            this.transitionTo("attributeValueUnquoted"
            /* attributeValueUnquoted */
            );
            this.delegate.beginAttributeValue(false);
            this.consume();
            this.delegate.appendToAttributeValue(char);
          }
        },
        attributeValueDoubleQuoted: function attributeValueDoubleQuoted() {
          var char = this.consume();

          if (char === '"') {
            this.delegate.finishAttributeValue();
            this.transitionTo("afterAttributeValueQuoted"
            /* afterAttributeValueQuoted */
            );
          } else if (char === '&') {
            this.delegate.appendToAttributeValue(this.consumeCharRef() || '&');
          } else {
            this.delegate.appendToAttributeValue(char);
          }
        },
        attributeValueSingleQuoted: function attributeValueSingleQuoted() {
          var char = this.consume();

          if (char === "'") {
            this.delegate.finishAttributeValue();
            this.transitionTo("afterAttributeValueQuoted"
            /* afterAttributeValueQuoted */
            );
          } else if (char === '&') {
            this.delegate.appendToAttributeValue(this.consumeCharRef() || '&');
          } else {
            this.delegate.appendToAttributeValue(char);
          }
        },
        attributeValueUnquoted: function attributeValueUnquoted() {
          var char = this.peek();

          if (isSpace(char)) {
            this.delegate.finishAttributeValue();
            this.consume();
            this.transitionTo("beforeAttributeName"
            /* beforeAttributeName */
            );
          } else if (char === '/') {
            this.delegate.finishAttributeValue();
            this.consume();
            this.transitionTo("selfClosingStartTag"
            /* selfClosingStartTag */
            );
          } else if (char === '&') {
            this.consume();
            this.delegate.appendToAttributeValue(this.consumeCharRef() || '&');
          } else if (char === '>') {
            this.delegate.finishAttributeValue();
            this.consume();
            this.delegate.finishTag();
            this.transitionTo("beforeData"
            /* beforeData */
            );
          } else {
            this.consume();
            this.delegate.appendToAttributeValue(char);
          }
        },
        afterAttributeValueQuoted: function afterAttributeValueQuoted() {
          var char = this.peek();

          if (isSpace(char)) {
            this.consume();
            this.transitionTo("beforeAttributeName"
            /* beforeAttributeName */
            );
          } else if (char === '/') {
            this.consume();
            this.transitionTo("selfClosingStartTag"
            /* selfClosingStartTag */
            );
          } else if (char === '>') {
            this.consume();
            this.delegate.finishTag();
            this.transitionTo("beforeData"
            /* beforeData */
            );
          } else {
            this.transitionTo("beforeAttributeName"
            /* beforeAttributeName */
            );
          }
        },
        selfClosingStartTag: function selfClosingStartTag() {
          var char = this.peek();

          if (char === '>') {
            this.consume();
            this.delegate.markTagAsSelfClosing();
            this.delegate.finishTag();
            this.transitionTo("beforeData"
            /* beforeData */
            );
          } else {
            this.transitionTo("beforeAttributeName"
            /* beforeAttributeName */
            );
          }
        },
        endTagOpen: function endTagOpen() {
          var char = this.consume();

          if (char === '@' || char === ':' || isAlpha(char)) {
            this.transitionTo("endTagName"
            /* endTagName */
            );
            this.tagNameBuffer = '';
            this.delegate.beginEndTag();
            this.appendToTagName(char);
          }
        }
      };
      this.reset();
    }

    EventedTokenizer.prototype.reset = function () {
      this.transitionTo("beforeData"
      /* beforeData */
      );
      this.input = '';
      this.tagNameBuffer = '';
      this.index = 0;
      this.line = 1;
      this.column = 0;
      this.delegate.reset();
    };

    EventedTokenizer.prototype.transitionTo = function (state) {
      this.state = state;
    };

    EventedTokenizer.prototype.tokenize = function (input) {
      this.reset();
      this.tokenizePart(input);
      this.tokenizeEOF();
    };

    EventedTokenizer.prototype.tokenizePart = function (input) {
      this.input += preprocessInput(input);

      while (this.index < this.input.length) {
        var handler = this.states[this.state];

        if (handler !== undefined) {
          handler.call(this);
        } else {
          throw new Error("unhandled state " + this.state);
        }
      }
    };

    EventedTokenizer.prototype.tokenizeEOF = function () {
      this.flushData();
    };

    EventedTokenizer.prototype.flushData = function () {
      if (this.state === 'data') {
        this.delegate.finishData();
        this.transitionTo("beforeData"
        /* beforeData */
        );
      }
    };

    EventedTokenizer.prototype.peek = function () {
      return this.input.charAt(this.index);
    };

    EventedTokenizer.prototype.consume = function () {
      var char = this.peek();
      this.index++;

      if (char === '\n') {
        this.line++;
        this.column = 0;
      } else {
        this.column++;
      }

      return char;
    };

    EventedTokenizer.prototype.consumeCharRef = function () {
      var endIndex = this.input.indexOf(';', this.index);

      if (endIndex === -1) {
        return;
      }

      var entity = this.input.slice(this.index, endIndex);
      var chars = this.entityParser.parse(entity);

      if (chars) {
        var count = entity.length; // consume the entity chars

        while (count) {
          this.consume();
          count--;
        } // consume the `;`


        this.consume();
        return chars;
      }
    };

    EventedTokenizer.prototype.markTagStart = function () {
      this.delegate.tagOpen();
    };

    EventedTokenizer.prototype.appendToTagName = function (char) {
      this.tagNameBuffer += char;
      this.delegate.appendToTagName(char);
    };

    EventedTokenizer.prototype.isIgnoredEndTag = function () {
      var tag = this.tagNameBuffer;
      return tag === 'title' && this.input.substring(this.index, this.index + 8) !== '</title>' || tag === 'style' && this.input.substring(this.index, this.index + 8) !== '</style>' || tag === 'script' && this.input.substring(this.index, this.index + 9) !== '</script>';
    };

    return EventedTokenizer;
  }();

  _exports.EventedTokenizer = EventedTokenizer;

  var Tokenizer =
  /** @class */
  function () {
    function Tokenizer(entityParser, options) {
      if (options === void 0) {
        options = {};
      }

      this.options = options;
      this.token = null;
      this.startLine = 1;
      this.startColumn = 0;
      this.tokens = [];
      this.tokenizer = new EventedTokenizer(this, entityParser, options.mode);
      this._currentAttribute = undefined;
    }

    Tokenizer.prototype.tokenize = function (input) {
      this.tokens = [];
      this.tokenizer.tokenize(input);
      return this.tokens;
    };

    Tokenizer.prototype.tokenizePart = function (input) {
      this.tokens = [];
      this.tokenizer.tokenizePart(input);
      return this.tokens;
    };

    Tokenizer.prototype.tokenizeEOF = function () {
      this.tokens = [];
      this.tokenizer.tokenizeEOF();
      return this.tokens[0];
    };

    Tokenizer.prototype.reset = function () {
      this.token = null;
      this.startLine = 1;
      this.startColumn = 0;
    };

    Tokenizer.prototype.current = function () {
      var token = this.token;

      if (token === null) {
        throw new Error('token was unexpectedly null');
      }

      if (arguments.length === 0) {
        return token;
      }

      for (var i = 0; i < arguments.length; i++) {
        if (token.type === arguments[i]) {
          return token;
        }
      }

      throw new Error("token type was unexpectedly " + token.type);
    };

    Tokenizer.prototype.push = function (token) {
      this.token = token;
      this.tokens.push(token);
    };

    Tokenizer.prototype.currentAttribute = function () {
      return this._currentAttribute;
    };

    Tokenizer.prototype.addLocInfo = function () {
      if (this.options.loc) {
        this.current().loc = {
          start: {
            line: this.startLine,
            column: this.startColumn
          },
          end: {
            line: this.tokenizer.line,
            column: this.tokenizer.column
          }
        };
      }

      this.startLine = this.tokenizer.line;
      this.startColumn = this.tokenizer.column;
    }; // Data


    Tokenizer.prototype.beginData = function () {
      this.push({
        type: "Chars"
        /* Chars */
        ,
        chars: ''
      });
    };

    Tokenizer.prototype.appendToData = function (char) {
      this.current("Chars"
      /* Chars */
      ).chars += char;
    };

    Tokenizer.prototype.finishData = function () {
      this.addLocInfo();
    }; // Comment


    Tokenizer.prototype.beginComment = function () {
      this.push({
        type: "Comment"
        /* Comment */
        ,
        chars: ''
      });
    };

    Tokenizer.prototype.appendToCommentData = function (char) {
      this.current("Comment"
      /* Comment */
      ).chars += char;
    };

    Tokenizer.prototype.finishComment = function () {
      this.addLocInfo();
    }; // Tags - basic


    Tokenizer.prototype.tagOpen = function () {};

    Tokenizer.prototype.beginStartTag = function () {
      this.push({
        type: "StartTag"
        /* StartTag */
        ,
        tagName: '',
        attributes: [],
        selfClosing: false
      });
    };

    Tokenizer.prototype.beginEndTag = function () {
      this.push({
        type: "EndTag"
        /* EndTag */
        ,
        tagName: ''
      });
    };

    Tokenizer.prototype.finishTag = function () {
      this.addLocInfo();
    };

    Tokenizer.prototype.markTagAsSelfClosing = function () {
      this.current("StartTag"
      /* StartTag */
      ).selfClosing = true;
    }; // Tags - name


    Tokenizer.prototype.appendToTagName = function (char) {
      this.current("StartTag"
      /* StartTag */
      , "EndTag"
      /* EndTag */
      ).tagName += char;
    }; // Tags - attributes


    Tokenizer.prototype.beginAttribute = function () {
      this._currentAttribute = ['', '', false];
    };

    Tokenizer.prototype.appendToAttributeName = function (char) {
      this.currentAttribute()[0] += char;
    };

    Tokenizer.prototype.beginAttributeValue = function (isQuoted) {
      this.currentAttribute()[2] = isQuoted;
    };

    Tokenizer.prototype.appendToAttributeValue = function (char) {
      this.currentAttribute()[1] += char;
    };

    Tokenizer.prototype.finishAttributeValue = function () {
      this.current("StartTag"
      /* StartTag */
      ).attributes.push(this._currentAttribute);
    };

    Tokenizer.prototype.reportSyntaxError = function (message) {
      this.current().syntaxError = message;
    };

    return Tokenizer;
  }();

  _exports.Tokenizer = Tokenizer;

  function tokenize(input, options) {
    var tokenizer = new Tokenizer(new EntityParser(namedCharRefs), options);
    return tokenizer.tokenize(input);
  }
});
(function (m) { if (typeof module === "object" && module.exports) { module.exports = m } }(require("ember-template-compiler")));
}());
//# sourceMappingURL=ember-template-compiler.map
