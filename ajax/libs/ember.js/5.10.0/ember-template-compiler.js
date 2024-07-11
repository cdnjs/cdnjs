/*!
 * @overview  Ember - JavaScript Application Framework
 * @copyright Copyright 2011 Tilde Inc. and contributors
 *            Portions Copyright 2006-2011 Strobe Inc.
 *            Portions Copyright 2008-2011 Apple Inc. All rights reserved.
 * @license   Licensed under MIT license
 *            See https://raw.github.com/emberjs/ember.js/master/LICENSE
 * @version   5.10.0
 */
/* eslint-disable no-var */
/* globals global globalThis self */
/* eslint-disable-next-line no-unused-vars */
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

    var result = callback.apply(this, reified);
    if (!deps.includes('exports') || result !== undefined) {
      exports = seen[name] = result;
    }

    return exports;
  }

  require = function (name) {
    return internalRequire(name, null);
  };

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
(function (ember, emberGlimmer, templateCompilation, emberApp) {
          'use strict';

          function _interopNamespaceDefault(e) {
                    const n = Object.create(null, { [Symbol.toStringTag]: { value: 'Module' } });
                    if (e) {
                              for (const k in e) {
                                        if (k !== 'default') {
                                                  const d = Object.getOwnPropertyDescriptor(e, k);
                                                  Object.defineProperty(n, k, d.get ? d : {
                                                            enumerable: true,
                                                            get: () => e[k]
                                                  });
                                        }
                              }
                    }
                    n.default = e;
                    return n;
          }

          const emberGlimmer__namespace = /*#__PURE__*/_interopNamespaceDefault(emberGlimmer);
          const emberApp__namespace = /*#__PURE__*/_interopNamespaceDefault(emberApp);

          function d(name, mod) {
                        Object.defineProperty(mod, '__esModule', { value: true });
                        define(name, [], () => mod);
                      }

          // check if window exists and actually is the global
          const hasDom = typeof self === 'object' && self !== null && self.Object === Object && typeof Window !== 'undefined' && self.constructor === Window && typeof document === 'object' && document !== null && self.document === document && typeof location === 'object' && location !== null && self.location === location && typeof history === 'object' && history !== null && self.history === history && typeof navigator === 'object' && navigator !== null && self.navigator === navigator && typeof navigator.userAgent === 'string';

          const window$1 = hasDom ? self : null;
          const location$1 = hasDom ? self.location : null;
          const history$1 = hasDom ? self.history : null;
          const userAgent = hasDom ? self.navigator.userAgent : 'Lynx (textmode)';
          const isChrome = hasDom ? typeof chrome === 'object' && !(typeof opera === 'object') : false;
          const isFirefox = hasDom ? /Firefox|FxiOS/.test(userAgent) : false;

          const emberinternalsBrowserEnvironmentIndex = /*#__PURE__*/Object.defineProperty({
                    __proto__: null,
                    hasDOM: hasDom,
                    history: history$1,
                    isChrome,
                    isFirefox,
                    location: location$1,
                    userAgent,
                    window: window$1
          }, Symbol.toStringTag, { value: 'Module' });

          /* globals window, self */

          // from lodash to catch fake globals
          function checkGlobal(value) {
            return value && value.Object === Object ? value : undefined;
          }

          // element ids can ruin global miss checks
          function checkElementIdShadowing(value) {
            return value && value.nodeType === undefined ? value : undefined;
          }
          // export real global
          const global$1 = checkGlobal(checkElementIdShadowing(typeof global === 'object' && global)) || checkGlobal(typeof self === 'object' && self) || checkGlobal(typeof window === 'object' && window) || typeof mainContext !== 'undefined' && mainContext ||
          // set before strict mode in Ember loader/wrapper
          new Function('return this')(); // eval outside of strict mode

          // legacy imports/exports/lookup stuff (should we keep this??)
          const context = function (global, Ember) {
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
          const ENV = {
            ENABLE_OPTIONAL_FEATURES: false,
            /**
              Determines whether Ember should add to `Array`
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
              Array: true
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
            _DEBUG_RENDER_TREE: true /* DEBUG */,
            /**
             Whether to force all deprecations to be enabled. This is used internally by
             Ember to enable deprecations in tests. It is not intended to be set in
             projects.
              @property _ALL_DEPRECATIONS_ENABLED
             @for EmberENV
             @type Boolean
             @default false
             @private
             */
            _ALL_DEPRECATIONS_ENABLED: false,
            /**
             Override the version of ember-source used to determine when deprecations "break".
             This is used internally by Ember to test with deprecated features "removed".
             This is never intended to be set by projects.
             @property _OVERRIDE_DEPRECATION_VERSION
             @for EmberENV
             @type string | null
             @default null
             @private
             */
            _OVERRIDE_DEPRECATION_VERSION: null,
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
             Whether the app still has default record-loading behavior in the model
             hook from RFC https://rfcs.emberjs.com/id/0774-implicit-record-route-loading
             This will also remove the default store property from the route.
              This is not intended to be set directly, as the implementation may change in
             the future. Use `@ember/optional-features` instead.
              @property _NO_IMPLICIT_ROUTE_MODEL
             @for EmberENV
             @type Boolean
             @default false
             @private
             */
            _NO_IMPLICIT_ROUTE_MODEL: false,
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
            EMBER_LOAD_HOOKS: {},
            FEATURES: {}
          };
          (EmberENV => {
            if (typeof EmberENV !== 'object' || EmberENV === null) return;
            for (let flag in EmberENV) {
              if (!Object.prototype.hasOwnProperty.call(EmberENV, flag) || flag === 'EXTEND_PROTOTYPES' || flag === 'EMBER_LOAD_HOOKS') continue;
              let defaultValue = ENV[flag];
              if (defaultValue === true) {
                ENV[flag] = EmberENV[flag] !== false;
              } else if (defaultValue === false) {
                ENV[flag] = EmberENV[flag] === true;
              } else {
                ENV[flag] = EmberENV[flag];
              }
            }
            let {
              EXTEND_PROTOTYPES
            } = EmberENV;
            if (EXTEND_PROTOTYPES !== undefined) {
              if (typeof EXTEND_PROTOTYPES === 'object' && EXTEND_PROTOTYPES !== null) {
                ENV.EXTEND_PROTOTYPES.Array = EXTEND_PROTOTYPES.Array !== false;
              } else {
                ENV.EXTEND_PROTOTYPES.Array = EXTEND_PROTOTYPES !== false;
              }
            }

            // TODO this does not seem to be used by anything,
            //      can we remove it? do we need to deprecate it?
            let {
              EMBER_LOAD_HOOKS
            } = EmberENV;
            if (typeof EMBER_LOAD_HOOKS === 'object' && EMBER_LOAD_HOOKS !== null) {
              for (let hookName in EMBER_LOAD_HOOKS) {
                if (!Object.prototype.hasOwnProperty.call(EMBER_LOAD_HOOKS, hookName)) continue;
                let hooks = EMBER_LOAD_HOOKS[hookName];
                if (Array.isArray(hooks)) {
                  ENV.EMBER_LOAD_HOOKS[hookName] = hooks.filter(hook => typeof hook === 'function');
                }
              }
            }
            let {
              FEATURES
            } = EmberENV;
            if (typeof FEATURES === 'object' && FEATURES !== null) {
              for (let feature in FEATURES) {
                if (!Object.prototype.hasOwnProperty.call(FEATURES, feature)) continue;
                ENV.FEATURES[feature] = FEATURES[feature] === true;
              }
            }
            {
              ENV._DEBUG_RENDER_TREE = true;
            }
          })(global$1.EmberENV);
          function getENV() {
            return ENV;
          }

          const emberinternalsEnvironmentIndex = /*#__PURE__*/Object.defineProperty({
                    __proto__: null,
                    ENV,
                    context,
                    getENV,
                    getLookup,
                    global: global$1,
                    setLookup
          }, Symbol.toStringTag, { value: 'Module' });

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
          function intern$1(str) {
            let obj = Object.create(null);
            obj[str] = 1;
            for (let key in obj) {
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
          function isObject$1(value) {
            return value !== null && (typeof value === 'object' || typeof value === 'function');
          }

          /**
           @module @ember/object
          */

          /**
           @private
           @return {Number} the uuid
           */
          let _uuid = 0;

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
          const GUID_PREFIX = 'ember';

          // Used for guid generation...
          const OBJECT_GUIDS = new WeakMap();
          const NON_OBJECT_GUIDS = new Map();
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
          const GUID_KEY = intern$1(`__ember${Date.now()}`);

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
          function generateGuid(obj, prefix = GUID_PREFIX) {
            let guid = prefix + uuid().toString();
            if (isObject$1(obj)) {
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
            let guid;
            if (isObject$1(value)) {
              guid = OBJECT_GUIDS.get(value);
              if (guid === undefined) {
                guid = `${GUID_PREFIX}${uuid()}`;
                OBJECT_GUIDS.set(value, guid);
              }
            } else {
              guid = NON_OBJECT_GUIDS.get(value);
              if (guid === undefined) {
                let type = typeof value;
                if (type === 'string') {
                  guid = `st${uuid()}`;
                } else if (type === 'number') {
                  guid = `nu${uuid()}`;
                } else if (type === 'symbol') {
                  guid = `sy${uuid()}`;
                } else {
                  guid = `(${value})`;
                }
                NON_OBJECT_GUIDS.set(value, guid);
              }
            }
            return guid;
          }

          const GENERATED_SYMBOLS = [];
          function isInternalSymbol(possibleSymbol) {
            return GENERATED_SYMBOLS.indexOf(possibleSymbol) !== -1;
          }

          // Some legacy symbols still need to be enumerable for a variety of reasons.
          // This code exists for that, and as a fallback in IE11. In general, prefer
          // `symbol` below when creating a new symbol.
          function enumerableSymbol(debugName) {
            // TODO: Investigate using platform symbols, but we do not
            // want to require non-enumerability for this API, which
            // would introduce a large cost.
            let id = GUID_KEY + Math.floor(Math.random() * Date.now()).toString();
            let symbol = intern$1(`__${debugName}${id}__`);
            {
              GENERATED_SYMBOLS.push(symbol);
            }
            return symbol;
          }
          const symbol = Symbol;

          // the delete is meant to hint at runtimes that this object should remain in
          // dictionary mode. This is clearly a runtime specific hack, but currently it
          // appears worthwhile in some usecases. Please note, these deletes do increase
          // the cost of creation dramatically over a plain Object.create. And as this
          // only makes sense for long-lived dictionaries that aren't instantiated often.
          function makeDictionary(parent) {
            let dict = Object.create(parent);
            dict['_dict'] = null;
            delete dict['_dict'];
            return dict;
          }

          let getDebugName;
          {
            let getFunctionName = fn => {
              let functionName = fn.name;
              if (functionName === undefined) {
                let match = Function.prototype.toString.call(fn).match(/function (\w+)\s*\(/);
                functionName = match && match[1] || '';
              }
              return functionName.replace(/^bound /, '');
            };
            let getObjectName = obj => {
              let name;
              let className;
              if (obj.constructor && obj.constructor !== Object) {
                className = getFunctionName(obj.constructor);
              }
              if ('toString' in obj && obj.toString !== Object.prototype.toString && obj.toString !== Function.prototype.toString) {
                name = obj.toString();
              }

              // If the class has a decent looking name, and the `toString` is one of the
              // default Ember toStrings, replace the constructor portion of the toString
              // with the class name. We check the length of the class name to prevent doing
              // this when the value is minified.
              if (name && name.match(/<.*:ember\d+>/) && className && className[0] !== '_' && className.length > 2 && className !== 'Class') {
                return name.replace(/<.*:/, `<${className}:`);
              }
              return name || className;
            };
            let getPrimitiveName = value => {
              return String(value);
            };
            getDebugName = value => {
              if (typeof value === 'function') {
                return getFunctionName(value) || `(unknown function)`;
              } else if (typeof value === 'object' && value !== null) {
                return getObjectName(value) || `(unknown object)`;
              } else {
                return getPrimitiveName(value);
              }
            };
          }
          const getDebugName$1 = getDebugName;

          const HAS_SUPER_PATTERN = /\.(_super|call\(this|apply\(this)/;
          const fnToString = Function.prototype.toString;
          const checkHasSuper = (() => {
            let sourceAvailable = fnToString.call(function () {
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
          })();
          const HAS_SUPER_MAP = new WeakMap();
          const ROOT = Object.freeze(function () {});
          HAS_SUPER_MAP.set(ROOT, false);
          function hasSuper(func) {
            let hasSuper = HAS_SUPER_MAP.get(func);
            if (hasSuper === undefined) {
              hasSuper = checkHasSuper(func);
              HAS_SUPER_MAP.set(func, hasSuper);
            }
            return hasSuper;
          }
          class ObserverListenerMeta {
            listeners = undefined;
            observers = undefined;
          }
          const OBSERVERS_LISTENERS_MAP = new WeakMap();
          function createObserverListenerMetaFor(fn) {
            let meta = OBSERVERS_LISTENERS_MAP.get(fn);
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
            let meta = createObserverListenerMetaFor(func);
            meta.observers = observers;
          }
          function setListeners(func, listeners) {
            let meta = createObserverListenerMetaFor(func);
            meta.listeners = listeners;
          }
          const IS_WRAPPED_FUNCTION_SET = new WeakSet();

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
            }
            // ensure an unwrapped super that calls _super is wrapped with a terminal _super
            if (!IS_WRAPPED_FUNCTION_SET.has(superFunc) && hasSuper(superFunc)) {
              return _wrap(func, _wrap(superFunc, ROOT));
            }
            return _wrap(func, superFunc);
          }
          function _wrap(func, superFunc) {
            function superWrapper() {
              let orig = this._super;
              this._super = superFunc;
              let ret = func.apply(this, arguments);
              this._super = orig;
              return ret;
            }
            IS_WRAPPED_FUNCTION_SET.add(superWrapper);
            let meta = OBSERVERS_LISTENERS_MAP.get(func);
            if (meta !== undefined) {
              OBSERVERS_LISTENERS_MAP.set(superWrapper, meta);
            }
            return superWrapper;
          }

          function lookupDescriptor(obj, keyName) {
            let current = obj;
            do {
              let descriptor = Object.getOwnPropertyDescriptor(current, keyName);
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
            return obj != null && typeof obj[methodName] === 'function';
          }

          /**
            @module @ember/utils
          */

          const NAMES = new WeakMap();
          function setName(obj, name) {
            if (isObject$1(obj)) NAMES.set(obj, name);
          }
          function getName(obj) {
            return NAMES.get(obj);
          }

          const objectToString$1 = Object.prototype.toString;
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
              let r = '';
              for (let k = 0; k < obj.length; k++) {
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

          const PROXIES = new WeakSet();
          function isProxy(value) {
            if (isObject$1(value)) {
              return PROXIES.has(value);
            }
            return false;
          }
          function setProxy(object) {
            if (isObject$1(object)) {
              PROXIES.add(object);
            }
          }

          class Cache {
            size = 0;
            misses = 0;
            hits = 0;
            constructor(limit, func, store = new Map()) {
              this.limit = limit;
              this.func = func;
              this.store = store;
            }
            get(key) {
              if (this.store.has(key)) {
                this.hits++;
                // SAFETY: we know the value is present because `.has(key)` was `true`.
                return this.store.get(key);
              } else {
                this.misses++;
                return this.set(key, this.func(key));
              }
            }
            set(key, value) {
              if (this.limit > this.size) {
                this.size++;
                this.store.set(key, value);
              }
              return value;
            }
            purge() {
              this.store.clear();
              this.size = 0;
              this.hits = 0;
              this.misses = 0;
            }
          }

          let HANDLERS = {};
          let registerHandler$2 = function registerHandler(_type, _callback) {};
          let invoke = () => {};
          {
            registerHandler$2 = function registerHandler(type, callback) {
              let nextHandler = HANDLERS[type] || (() => {});
              HANDLERS[type] = (message, options) => {
                callback(message, options, nextHandler);
              };
            };
            invoke = function invoke(type, message, test, options) {
              if (test) {
                return;
              }
              let handlerForType = HANDLERS[type];
              if (handlerForType) {
                handlerForType(message, options);
              }
            };
          }

          const emberDebugLibHandlers = /*#__PURE__*/Object.defineProperty({
                    __proto__: null,
                    HANDLERS,
                    get invoke () { return invoke; },
                    get registerHandler () { return registerHandler$2; }
          }, Symbol.toStringTag, { value: 'Module' });

          // This is a "global", but instead of declaring it as `declare global`, which
          // will expose it to all other modules, declare it *locally* (and don't export
          // it) so that it has the desired "private global" semantics -- however odd that
          // particular notion is.

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
          let registerHandler$1 = () => {};
          let missingOptionsDeprecation$1;
          let missingOptionsIdDeprecation$1;
          let missingOptionDeprecation = () => '';
          let deprecate$2 = () => {};
          {
            registerHandler$1 = function registerHandler(handler) {
              registerHandler$2('deprecate', handler);
            };
            let formatMessage = function formatMessage(_message, options) {
              let message = _message;
              if (options?.id) {
                message = message + ` [deprecation id: ${options.id}]`;
              }
              if (options?.until) {
                message = message + ` This will be removed in ${options.for} ${options.until}.`;
              }
              if (options?.url) {
                message += ` See ${options.url} for more details.`;
              }
              return message;
            };
            registerHandler$1(function logDeprecationToConsole(message, options) {
              let updatedMessage = formatMessage(message, options);
              console.warn(`DEPRECATION: ${updatedMessage}`); // eslint-disable-line no-console
            });
            let captureErrorForStack;
            if (new Error().stack) {
              captureErrorForStack = () => new Error();
            } else {
              captureErrorForStack = () => {
                try {
                  __fail__.fail();
                  return;
                } catch (e) {
                  return e;
                }
              };
            }
            registerHandler$1(function logDeprecationStackTrace(message, options, next) {
              if (ENV.LOG_STACKTRACE_ON_DEPRECATION) {
                let stackStr = '';
                let error = captureErrorForStack();
                let stack;
                if (error instanceof Error) {
                  if (error.stack) {
                    if (error['arguments']) {
                      // Chrome
                      stack = error.stack.replace(/^\s+at\s+/gm, '').replace(/^([^(]+?)([\n$])/gm, '{anonymous}($1)$2').replace(/^Object.<anonymous>\s*\(([^)]+)\)/gm, '{anonymous}($1)').split('\n');
                      stack.shift();
                    } else {
                      // Firefox
                      stack = error.stack.replace(/(?:\n@:0)?\s+$/m, '').replace(/^\(/gm, '{anonymous}(').split('\n');
                    }
                    stackStr = `\n    ${stack.slice(2).join('\n    ')}`;
                  }
                }
                let updatedMessage = formatMessage(message, options);
                console.warn(`DEPRECATION: ${updatedMessage}${stackStr}`); // eslint-disable-line no-console
              } else {
                next(message, options);
              }
            });
            registerHandler$1(function raiseOnDeprecation(message, options, next) {
              if (ENV.RAISE_ON_DEPRECATION) {
                let updatedMessage = formatMessage(message);
                throw new Error(updatedMessage);
              } else {
                next(message, options);
              }
            });
            missingOptionsDeprecation$1 = 'When calling `deprecate` you ' + 'must provide an `options` hash as the third parameter.  ' + '`options` should include `id` and `until` properties.';
            missingOptionsIdDeprecation$1 = 'When calling `deprecate` you must provide `id` in options.';
            missingOptionDeprecation = (id, missingOption) => {
              return `When calling \`deprecate\` you must provide \`${missingOption}\` in options. Missing options.${missingOption} in "${id}" deprecation`;
            };
            /**
             @module @ember/debug
             @public
             */
            /**
              Display a deprecation warning with the provided message and a stack trace
              (Chrome and Firefox only).
               Ember itself leverages [Semantic Versioning](https://semver.org) to aid
              projects in keeping up with changes to the framework. Before any
              functionality or API is removed, it first flows linearly through a
              deprecation staging process. The staging process currently contains two
              stages: available and enabled.
               Deprecations are initially released into the 'available' stage.
              Deprecations will stay in this stage until the replacement API has been
              marked as a recommended practice via the RFC process and the addon
              ecosystem has generally adopted the change.
               Once a deprecation meets the above criteria, it will move into the
              'enabled' stage where it will remain until the functionality or API is
              eventually removed.
               For application and addon developers, "available" deprecations are not
              urgent and "enabled" deprecations require action.
               * In a production build, this method is defined as an empty function (NOP).
              Uses of this method in Ember itself are stripped from the ember.prod.js build.
               ```javascript
              import { deprecate } from '@ember/debug';
               deprecate(
                'Use of `assign` has been deprecated. Please use `Object.assign` or the spread operator instead.',
                false,
                {
                  id: 'ember-polyfills.deprecate-assign',
                  until: '5.0.0',
                  url: 'https://deprecations.emberjs.com/v4.x/#toc_ember-polyfills-deprecate-assign',
                  for: 'ember-source',
                  since: {
                    available: '4.0.0',
                    enabled: '4.0.0',
                  },
                }
              );
              ```
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
            deprecate$2 = function deprecate(message, test, options) {
              assert(missingOptionsDeprecation$1, Boolean(options && (options.id || options.until)));
              assert(missingOptionsIdDeprecation$1, Boolean(options.id));
              assert(missingOptionDeprecation(options.id, 'until'), Boolean(options.until));
              assert(missingOptionDeprecation(options.id, 'for'), Boolean(options.for));
              assert(missingOptionDeprecation(options.id, 'since'), Boolean(options.since));
              invoke('deprecate', message, test, options);
            };
          }
          const _deprecate = deprecate$2;

          const emberDebugLibDeprecate = /*#__PURE__*/Object.defineProperty({
                    __proto__: null,
                    default: _deprecate,
                    get missingOptionDeprecation () { return missingOptionDeprecation; },
                    get missingOptionsDeprecation () { return missingOptionsDeprecation$1; },
                    get missingOptionsIdDeprecation () { return missingOptionsIdDeprecation$1; },
                    get registerHandler () { return registerHandler$1; }
          }, Symbol.toStringTag, { value: 'Module' });

          let testing = false;
          function isTesting() {
            return testing;
          }
          function setTesting(value) {
            testing = Boolean(value);
          }

          const emberDebugLibTesting = /*#__PURE__*/Object.defineProperty({
                    __proto__: null,
                    isTesting,
                    setTesting
          }, Symbol.toStringTag, { value: 'Module' });

          let registerHandler = () => {};
          let warn$1 = () => {};
          let missingOptionsDeprecation;
          let missingOptionsIdDeprecation;

          /**
          @module @ember/debug
          */

          {
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
            registerHandler = function registerHandler(handler) {
              registerHandler$2('warn', handler);
            };
            registerHandler(function logWarning(message) {
              /* eslint-disable no-console */
              console.warn(`WARNING: ${message}`);
              /* eslint-enable no-console */
            });
            missingOptionsDeprecation = 'When calling `warn` you ' + 'must provide an `options` hash as the third parameter.  ' + '`options` should include an `id` property.';
            missingOptionsIdDeprecation = 'When calling `warn` you must provide `id` in options.';

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
              @param {Boolean|Object} test An optional boolean. If falsy, the warning
                will be displayed. If `test` is an object, the `test` parameter can
                be used as the `options` parameter and the warning is displayed.
              @param {Object} options
              @param {String} options.id The `id` can be used by Ember debugging tools
                to change the behavior (raise, log, or silence) for that specific warning.
                The `id` should be namespaced by dots, e.g. "ember-debug.feature-flag-with-features-stripped"
              @public
              @since 1.0.0
            */
            warn$1 = function warn(message, test, options) {
              if (arguments.length === 2 && typeof test === 'object') {
                options = test;
                test = false;
              }
              assert(missingOptionsDeprecation, Boolean(options));
              assert(missingOptionsIdDeprecation, Boolean(options && options.id));

              // SAFETY: we have explicitly assigned `false` if the user invoked the
              // arity-2 version of the overload, so we know `test` is always either
              // `undefined` or a `boolean` for type-safe callers.
              invoke('warn', message, test, options);
            };
          }
          const _warn = warn$1;

          const emberDebugLibWarn = /*#__PURE__*/Object.defineProperty({
                    __proto__: null,
                    default: _warn,
                    get missingOptionsDeprecation () { return missingOptionsDeprecation; },
                    get missingOptionsIdDeprecation () { return missingOptionsIdDeprecation; },
                    get registerHandler () { return registerHandler; }
          }, Symbol.toStringTag, { value: 'Module' });

          const {
            toString: objectToString
          } = Object.prototype;
          const {
            toString: functionToString
          } = Function.prototype;
          const {
            isArray
          } = Array;
          const {
            keys: objectKeys
          } = Object;
          const {
            stringify
          } = JSON;
          const LIST_LIMIT = 100;
          const DEPTH_LIMIT = 4;
          const SAFE_KEY = /^[\w$]+$/;

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
            let valueIsArray = false;
            switch (typeof value) {
              case 'undefined':
                return 'undefined';
              case 'object':
                if (value === null) return 'null';
                if (isArray(value)) {
                  valueIsArray = true;
                  break;
                }
                // is toString Object.prototype.toString or undefined then traverse
                if (value.toString === objectToString || value.toString === undefined) {
                  break;
                }
                // custom toString
                return value.toString();
              case 'function':
                return value.toString === functionToString ? value.name ? `[Function:${value.name}]` : `[Function]` : value.toString();
              case 'string':
                return stringify(value);
              case 'symbol':
              case 'boolean':
              case 'number':
              default:
                return value.toString();
            }
            if (seen === undefined) {
              seen = new WeakSet();
            } else {
              if (seen.has(value)) return `[Circular]`;
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
            let s = '{';
            let keys = objectKeys(obj);
            for (let i = 0; i < keys.length; i++) {
              s += i === 0 ? ' ' : ', ';
              if (i >= LIST_LIMIT) {
                s += `... ${keys.length - LIST_LIMIT} more keys`;
                break;
              }
              let key = keys[i];
              (!(key) && assert('has key', key)); // Looping over array
              s += `${inspectKey(String(key))}: ${inspectValue(obj[key], depth, seen)}`;
            }
            s += ' }';
            return s;
          }
          function inspectArray(arr, depth, seen) {
            if (depth > DEPTH_LIMIT) {
              return '[Array]';
            }
            let s = '[';
            for (let i = 0; i < arr.length; i++) {
              s += i === 0 ? ' ' : ', ';
              if (i >= LIST_LIMIT) {
                s += `... ${arr.length - LIST_LIMIT} more items`;
                break;
              }
              s += inspectValue(arr[i], depth, seen);
            }
            s += ' ]';
            return s;
          }

          const emberDebugLibInspect = /*#__PURE__*/Object.defineProperty({
                    __proto__: null,
                    default: inspect
          }, Symbol.toStringTag, { value: 'Module' });

          const EMPTY_ARRAY = Object.freeze([]);
          function emptyArray() {
            return EMPTY_ARRAY;
          }
          const EMPTY_STRING_ARRAY = emptyArray();
          const EMPTY_NUMBER_ARRAY = emptyArray();

          /**
           * This function returns `true` if the input array is the special empty array sentinel,
           * which is sometimes used for optimizations.
           */
          function isEmptyArray(input) {
            return input === EMPTY_ARRAY;
          }
          function* reverse(input) {
            for (let i = input.length - 1; i >= 0; i--) {
              yield input[i];
            }
          }
          function* enumerate(input) {
            let i = 0;
            for (const item of input) {
              yield [i++, item];
            }
          }

          // import Logger from './logger';

          // let alreadyWarned = false;

          function debugAssert(test, msg) {
            // if (!alreadyWarned) {
            //   alreadyWarned = true;
            //   Logger.warn("Don't leave debug assertions on in public builds");
            // }

            if (!test) {
              throw new Error(msg || 'assertion failure');
            }
          }
          function deprecate$1(desc) {
            LOCAL_LOGGER.warn(`DEPRECATION: ${desc}`);
          }
          function keys(obj) {
            return Object.keys(obj);
          }
          function unwrap(val) {
            if (val === null || val === undefined) throw new Error(`Expected value to be present`);
            return val;
          }
          function expect(val, message) {
            if (val === null || val === undefined) throw new Error(message);
            return val;
          }
          function unreachable(message = 'unreachable') {
            return new Error(message);
          }
          function exhausted(value) {
            throw new Error(`Exhausted ${String(value)}`);
          }
          const tuple = (...args) => args;
          function isPresent(value) {
            return value !== null && value !== undefined;
          }
          function assertPresent(value, message) {
            if (!isPresent(value)) {
              throw new Error(`Expected present, got ${typeof value === 'string' ? value : message}`);
            }
          }
          function isPresentArray(list) {
            return list.length > 0;
          }
          function ifPresent(list, ifPresent, otherwise) {
            if (isPresentArray(list)) {
              return ifPresent(list);
            } else {
              return otherwise();
            }
          }
          function arrayToOption(list) {
            if (isPresentArray(list)) {
              return list;
            } else {
              return null;
            }
          }
          function assertPresentArray(list, message = `unexpected empty list`) {
            if (!isPresentArray(list)) {
              throw new Error(message);
            }
          }
          function asPresentArray(list, message = `unexpected empty list`) {
            assertPresentArray(list, message);
            return list;
          }
          function getLast(list) {
            return list.length === 0 ? undefined : list[list.length - 1];
          }
          function getFirst(list) {
            return list.length === 0 ? undefined : list[0];
          }
          function mapPresentArray(list, mapper) {
            if (list === null) {
              return null;
            }
            let out = [];
            for (let item of list) {
              out.push(mapper(item));
            }
            return out;
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
          class StackImpl {
            stack;
            current = null;
            constructor(values = []) {
              this.stack = values;
            }
            get size() {
              return this.stack.length;
            }
            push(item) {
              this.current = item;
              this.stack.push(item);
            }
            pop() {
              let item = this.stack.pop();
              this.current = getLast(this.stack) ?? null;
              return item === undefined ? null : item;
            }
            nth(from) {
              let len = this.stack.length;
              return len < from ? null : unwrap(this.stack[len - from]);
            }
            isEmpty() {
              return this.stack.length === 0;
            }
            toArray() {
              return this.stack;
            }
          }

          /// <reference types="qunit" />

          let beginTestSteps;
          let endTestSteps;
          let verifySteps;
          let logStep;
          let debugToString;
          {
            let getFunctionName = fn => {
              let functionName = fn.name;
              if (functionName === undefined) {
                let match = /function (\w+)\s*\(/u.exec(String(fn));
                functionName = match && match[1] || '';
              }
              return functionName.replace(/^bound /u, '');
            };
            let getObjectName = obj => {
              let name;
              let className;
              if (obj.constructor && typeof obj.constructor === 'function') {
                className = getFunctionName(obj.constructor);
              }
              if ('toString' in obj && obj.toString !== Object.prototype.toString && obj.toString !== Function.prototype.toString) {
                name = obj.toString();
              }

              // If the class has a decent looking name, and the `toString` is one of the
              // default Ember toStrings, replace the constructor portion of the toString
              // with the class name. We check the length of the class name to prevent doing
              // this when the value is minified.
              if (name && /<.*:ember\d+>/u.test(name) && className && className[0] !== '_' && className.length > 2 && className !== 'Class') {
                return name.replace(/<.*:/u, `<${className}:`);
              }
              return name || className;
            };
            let getPrimitiveName = value => {
              return String(value);
            };
            debugToString = value => {
              if (typeof value === 'function') {
                return getFunctionName(value) || `(unknown function)`;
              } else if (typeof value === 'object' && value !== null) {
                return getObjectName(value) || `(unknown object)`;
              } else {
                return getPrimitiveName(value);
              }
            };
          }
          var debugToString$1 = debugToString;
          function clearElement(parent) {
            let current = parent.firstChild;
            while (current) {
              let next = current.nextSibling;
              parent.removeChild(current);
              current = next;
            }
          }
          const RAW_NODE = -1;
          const ELEMENT_NODE = 1;
          const TEXT_NODE = 3;
          const COMMENT_NODE = 8;
          const DOCUMENT_NODE = 9;
          const DOCUMENT_TYPE_NODE = 10;
          const DOCUMENT_FRAGMENT_NODE = 11;
          const NS_HTML = 'http://www.w3.org/1999/xhtml';
          const NS_MATHML = 'http://www.w3.org/1998/Math/MathML';
          const NS_SVG = 'http://www.w3.org/2000/svg';
          const NS_XLINK = 'http://www.w3.org/1999/xlink';
          const NS_XML = 'http://www.w3.org/XML/1998/namespace';
          const NS_XMLNS = 'http://www.w3.org/2000/xmlns/';
          const INSERT_BEFORE_BEGIN = 'beforebegin';
          const INSERT_AFTER_BEGIN = 'afterbegin';
          const INSERT_BEFORE_END = 'beforeend';
          const INSERT_AFTER_END = 'afterend';

          /*
            Encoding notes

            We use 30 bit integers for encoding, so that we don't ever encode a non-SMI
            integer to push on the stack.

            Handles are >= 0
            Immediates are < 0

            True, False, Undefined and Null are pushed as handles into the symbol table,
            with well known handles (0, 1, 2, 3)

            The negative space is divided into positives and negatives. Positives are
            higher numbers (-1, -2, -3, etc), negatives are lower.

            We only encode immediates for two reasons:

            1. To transfer over the wire, so they're smaller in general
            2. When pushing values onto the stack from the low level/inner VM, which may
               be converted into WASM one day.

            This allows the low-level VM to always use SMIs, and to minimize using JS
            values via handles for things like the stack pointer and frame pointer.
            Externally, most code pushes values as JS values, except when being pulled
            from the append byte code where it was already encoded.

            Logically, this is because the low level VM doesn't really care about these
            higher level values. For instance, the result of a userland helper may be a
            number, or a boolean, or undefined/null, but it's extra work to figure that
            out and push it correctly, vs. just pushing the value as a JS value with a
            handle.

            Note: The details could change here in the future, this is just the current
            strategy.
          */

          let ImmediateConstants = /*#__PURE__*/function (ImmediateConstants) {
            ImmediateConstants[ImmediateConstants["MAX_SMI"] = 1073741823] = "MAX_SMI";
            ImmediateConstants[ImmediateConstants["MIN_SMI"] = -1073741824] = "MIN_SMI";
            ImmediateConstants[ImmediateConstants["SIGN_BIT"] = -536870913] = "SIGN_BIT";
            ImmediateConstants[ImmediateConstants["MAX_INT"] = 536870911] = "MAX_INT";
            ImmediateConstants[ImmediateConstants["MIN_INT"] = -536870912] = "MIN_INT";
            ImmediateConstants[ImmediateConstants["FALSE_HANDLE"] = 0] = "FALSE_HANDLE";
            ImmediateConstants[ImmediateConstants["TRUE_HANDLE"] = 1] = "TRUE_HANDLE";
            ImmediateConstants[ImmediateConstants["NULL_HANDLE"] = 2] = "NULL_HANDLE";
            ImmediateConstants[ImmediateConstants["UNDEFINED_HANDLE"] = 3] = "UNDEFINED_HANDLE";
            ImmediateConstants[ImmediateConstants["ENCODED_FALSE_HANDLE"] = 0] = "ENCODED_FALSE_HANDLE";
            ImmediateConstants[ImmediateConstants["ENCODED_TRUE_HANDLE"] = 1] = "ENCODED_TRUE_HANDLE";
            ImmediateConstants[ImmediateConstants["ENCODED_NULL_HANDLE"] = 2] = "ENCODED_NULL_HANDLE";
            ImmediateConstants[ImmediateConstants["ENCODED_UNDEFINED_HANDLE"] = 3] = "ENCODED_UNDEFINED_HANDLE";
            return ImmediateConstants;
          }({});
          function isHandle(value) {
            return value >= 0;
          }
          function isNonPrimitiveHandle(value) {
            return value > ImmediateConstants.ENCODED_UNDEFINED_HANDLE;
          }
          function constants(...values) {
            return [false, true, null, undefined, ...values];
          }
          function isSmallInt(value) {
            return value % 1 === 0 && value <= ImmediateConstants.MAX_INT && value >= ImmediateConstants.MIN_INT;
          }
          function encodeNegative(num) {
            return num & ImmediateConstants.SIGN_BIT;
          }
          function decodeNegative(num) {
            return num | ~ImmediateConstants.SIGN_BIT;
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
            return num > ImmediateConstants.SIGN_BIT ? decodePositive(num) : decodeNegative(num);
          }
          [1, -1].forEach(x => decodeImmediate(encodeImmediate(x)));

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
            let obj = {};
            obj[str] = 1;
            for (let key in obj) {
              if (key === str) {
                return key;
              }
            }
            return str;
          }
          const SERIALIZATION_FIRST_NODE_STRING = '%+b:0%';
          function isSerializationFirstNode(node) {
            return node.nodeValue === SERIALIZATION_FIRST_NODE_STRING;
          }
          let assign = Object.assign;
          function values(obj) {
            return Object.values(obj);
          }
          function entries$1(dict) {
            return Object.entries(dict);
          }
          function castToSimple(node) {
            if (isDocument(node)) {
              return node;
            } else if (isSimpleElement(node)) {
              return node;
            } else {
              return node;
            }
          }

          // If passed a document, verify we're in the browser and return it as a Document

          // If we don't know what this is, but the check requires it to be an element,
          // the cast will mandate that it's a browser element

          // Finally, if it's a more generic check, the cast will mandate that it's a
          // browser node and return a BrowserNodeUtils corresponding to the check

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
            return checkBrowserNode(node, sugaryCheck);
          }
          function checkError(from, check) {
            return new Error(`cannot cast a ${from} into ${String(check)}`);
          }
          function isDocument(node) {
            return node.nodeType === DOCUMENT_NODE;
          }
          function isSimpleElement(node) {
            return node?.nodeType === ELEMENT_NODE;
          }
          function isElement(node) {
            return node?.nodeType === ELEMENT_NODE && node instanceof Element;
          }
          function checkBrowserNode(node, check) {
            let isMatch = false;
            if (node !== null) {
              if (typeof check === 'string') {
                isMatch = stringCheckNode(node, check);
              } else if (Array.isArray(check)) {
                isMatch = check.some(c => stringCheckNode(node, c));
              } else {
                throw unreachable();
              }
            }
            if (isMatch && node instanceof Node) {
              return node;
            } else {
              throw checkError(`SimpleElement(${node?.constructor?.name ?? 'null'})`, check);
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
                  throw new Error(`BUG: this code is missing handling for a generic node type`);
                }
                return node instanceof Element && node.tagName.toLowerCase() === check;
            }
          }
          function strip(strings, ...args) {
            let out = '';
            for (const [i, string] of enumerate(strings)) {
              let dynamic = args[i] !== undefined ? String(args[i]) : '';
              out += `${string}${dynamic}`;
            }
            let lines = out.split('\n');
            while (isPresentArray(lines) && /^\s*$/u.test(getFirst(lines))) {
              lines.shift();
            }
            while (isPresentArray(lines) && /^\s*$/u.test(getLast(lines))) {
              lines.pop();
            }
            let min = Infinity;
            for (let line of lines) {
              let leading = /^\s*/u.exec(line)[0].length;
              min = Math.min(min, leading);
            }
            let stripped = [];
            for (let line of lines) {
              stripped.push(line.slice(min));
            }
            return stripped.join('\n');
          }
          function unwrapHandle(handle) {
            if (typeof handle === 'number') {
              return handle;
            } else {
              let error = handle.errors[0];
              throw new Error(`Compile Error: ${error.problem} @ ${error.span.start}..${error.span.end}`);
            }
          }
          function unwrapTemplate(template) {
            if (template.result === 'error') {
              throw new Error(`Compile Error: ${template.problem} @ ${template.span.start}..${template.span.end}`);
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
          function buildUntouchableThis(source) {
            let context = null;
            {
              let assertOnProperty = property => {
                let access = typeof property === 'symbol' || typeof property === 'number' ? `[${String(property)}]` : `.${property}`;
                throw new Error(`You accessed \`this${access}\` from a function passed to the ${source}, but the function itself was not bound to a valid \`this\` context. Consider updating to use a bound function (for instance, use an arrow function, \`() => {}\`).`);
              };
              context = new Proxy({}, {
                get(_target, property) {
                  assertOnProperty(property);
                },
                set(_target, property) {
                  assertOnProperty(property);
                  return false;
                },
                has(_target, property) {
                  assertOnProperty(property);
                  return false;
                }
              });
            }
            return context;
          }

          /**
           * This constant exists to make it easier to differentiate normal logs from
           * errant console.logs. LOCAL_LOGGER should only be used inside a
           * LOCAL_SHOULD_LOG check.
           *
           * It does not alleviate the need to check LOCAL_SHOULD_LOG, which is used
           * for stripping.
           */
          const LOCAL_LOGGER = console;

          /**
           * This constant exists to make it easier to differentiate normal logs from
           * errant console.logs. LOGGER can be used outside of LOCAL_SHOULD_LOG checks,
           * and is meant to be used in the rare situation where a console.* call is
           * actually appropriate.
           */
          const LOGGER = console;
          function assertNever(value, desc = 'unexpected unreachable branch') {
            LOGGER.log('unreachable', value);
            LOGGER.log(`${desc} :: ${JSON.stringify(value)} (${value})`);
            throw new Error(`code reached unreachable`);
          }

          const glimmerUtil = /*#__PURE__*/Object.defineProperty({
                    __proto__: null,
                    COMMENT_NODE,
                    DOCUMENT_FRAGMENT_NODE,
                    DOCUMENT_NODE,
                    DOCUMENT_TYPE_NODE,
                    ELEMENT_NODE,
                    EMPTY_ARRAY,
                    EMPTY_NUMBER_ARRAY,
                    EMPTY_STRING_ARRAY,
                    INSERT_AFTER_BEGIN,
                    INSERT_AFTER_END,
                    INSERT_BEFORE_BEGIN,
                    INSERT_BEFORE_END,
                    ImmediateConstants,
                    LOCAL_LOGGER,
                    LOGGER,
                    NS_HTML,
                    NS_MATHML,
                    NS_SVG,
                    NS_XLINK,
                    NS_XML,
                    NS_XMLNS,
                    RAW_NODE,
                    SERIALIZATION_FIRST_NODE_STRING,
                    Stack: StackImpl,
                    TEXT_NODE,
                    arrayToOption,
                    asPresentArray,
                    assert: debugAssert,
                    assertNever,
                    assertPresent,
                    assertPresentArray,
                    assign,
                    beginTestSteps,
                    buildUntouchableThis,
                    castToBrowser,
                    castToSimple,
                    checkNode: checkBrowserNode,
                    clearElement,
                    constants,
                    debugToString: debugToString$1,
                    decodeHandle,
                    decodeImmediate,
                    decodeNegative,
                    decodePositive,
                    deprecate: deprecate$1,
                    dict,
                    emptyArray,
                    encodeHandle,
                    encodeImmediate,
                    encodeNegative,
                    encodePositive,
                    endTestSteps,
                    entries: entries$1,
                    enumerate,
                    exhausted,
                    expect,
                    extractHandle,
                    getFirst,
                    getLast,
                    ifPresent,
                    intern,
                    isDict,
                    isElement,
                    isEmptyArray,
                    isErrHandle,
                    isHandle,
                    isNonPrimitiveHandle,
                    isObject,
                    isOkHandle,
                    isPresent,
                    isPresentArray,
                    isSerializationFirstNode,
                    isSimpleElement,
                    isSmallInt,
                    keys,
                    logStep,
                    mapPresentArray,
                    reverse,
                    strip,
                    tuple,
                    unreachable,
                    unwrap,
                    unwrapHandle,
                    unwrapTemplate,
                    values,
                    verifySteps
          }, Symbol.toStringTag, { value: 'Module' });

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
            // SAFETY: Ideally we'd assert here but that causes awkward circular requires since this is also in @ember/debug.
            // This is only for debug stuff so not very risky.
            let renderer = expect(app.lookup('renderer:-dom'), `BUG: owner is missing renderer`);
            return renderer.debugRenderTree.capture();
          }

          const emberDebugLibCaptureRenderTree = /*#__PURE__*/Object.defineProperty({
                    __proto__: null,
                    default: captureRenderTree
          }, Symbol.toStringTag, { value: 'Module' });

          // These are the default production build versions:
          const noop = () => {};

          // SAFETY: these casts are just straight-up lies, but the point is that they do
          // not do anything in production builds.
          let assert = noop;
          let info = noop;
          let warn = noop;
          let debug = noop;
          let deprecate = noop;
          let debugSeal = noop;
          let debugFreeze = noop;
          let runInDebug = noop;
          let setDebugFunction = noop;
          let getDebugFunction = noop;
          let deprecateFunc = function () {
            return arguments[arguments.length - 1];
          };
          {
            setDebugFunction = function (type, callback) {
              switch (type) {
                case 'assert':
                  return assert = callback;
                case 'info':
                  return info = callback;
                case 'warn':
                  return warn = callback;
                case 'debug':
                  return debug = callback;
                case 'deprecate':
                  return deprecate = callback;
                case 'debugSeal':
                  return debugSeal = callback;
                case 'debugFreeze':
                  return debugFreeze = callback;
                case 'runInDebug':
                  return runInDebug = callback;
                case 'deprecateFunc':
                  return deprecateFunc = callback;
              }
            };
            getDebugFunction = function (type) {
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

          {
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

            // eslint-disable-next-line no-inner-declarations
            function assert(desc, test) {
              if (!test) {
                throw new Error(`Assertion Failed: ${desc}`);
              }
            }
            setDebugFunction('assert', assert);

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
              console.debug(`DEBUG: ${message}`); /* eslint-disable-line no-console */
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
              console.info(...arguments); /* eslint-disable-line no-console */
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
            setDebugFunction('deprecateFunc', function deprecateFunc(...args) {
              if (args.length === 3) {
                let [message, options, func] = args;
                return function (...args) {
                  deprecate(message, false, options);
                  return func.apply(this, args);
                };
              } else {
                let [message, func] = args;
                return function () {
                  deprecate(message);
                  return func.apply(this, arguments);
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
            setDebugFunction('deprecate', _deprecate);
            setDebugFunction('warn', _warn);
          }
          let _warnIfUsingStrippedFeatureFlags;
          if (!isTesting()) {
            if (typeof window !== 'undefined' && (isFirefox || isChrome) && window.addEventListener) {
              window.addEventListener('load', () => {
                if (document.documentElement && document.documentElement.dataset && !document.documentElement.dataset['emberExtension']) {
                  let downloadURL;
                  if (isChrome) {
                    downloadURL = 'https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi';
                  } else if (isFirefox) {
                    downloadURL = 'https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/';
                  }
                  debug(`For more advanced debugging, install the Ember Inspector from ${downloadURL}`);
                }
              }, false);
            }
          }

          const emberDebugIndex = /*#__PURE__*/Object.defineProperty({
                    __proto__: null,
                    _warnIfUsingStrippedFeatureFlags,
                    get assert () { return assert; },
                    captureRenderTree,
                    get debug () { return debug; },
                    get debugFreeze () { return debugFreeze; },
                    get debugSeal () { return debugSeal; },
                    get deprecate () { return deprecate; },
                    get deprecateFunc () { return deprecateFunc; },
                    get getDebugFunction () { return getDebugFunction; },
                    get info () { return info; },
                    inspect,
                    isTesting,
                    get registerDeprecationHandler () { return registerHandler$1; },
                    get registerWarnHandler () { return registerHandler; },
                    get runInDebug () { return runInDebug; },
                    get setDebugFunction () { return setDebugFunction; },
                    setTesting,
                    get warn () { return warn; }
          }, Symbol.toStringTag, { value: 'Module' });

          let setupMandatorySetter;
          let teardownMandatorySetter;
          let setWithMandatorySetter;
          function isElementKey(key) {
            return typeof key === 'number' ? isPositiveInt(key) : isStringInt(key);
          }
          function isStringInt(str) {
            let num = parseInt(str, 10);
            return isPositiveInt(num) && str === String(num);
          }
          function isPositiveInt(num) {
            return num >= 0 && num % 1 === 0;
          }
          {
            let SEEN_TAGS = new WeakSet();
            let MANDATORY_SETTERS = new WeakMap();
            let propertyIsEnumerable = function (obj, key) {
              return Object.prototype.propertyIsEnumerable.call(obj, key);
            };
            setupMandatorySetter = function (tag, obj, keyName) {
              if (SEEN_TAGS.has(tag)) {
                return;
              }
              SEEN_TAGS.add(tag);
              if (Array.isArray(obj) && isElementKey(keyName)) {
                return;
              }
              let desc = lookupDescriptor(obj, keyName) || {};
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
              let setters = MANDATORY_SETTERS.get(obj);
              if (setters === undefined) {
                setters = {};
                MANDATORY_SETTERS.set(obj, setters);
              }
              desc.hadOwnProperty = Object.hasOwnProperty.call(obj, keyName);
              setters[keyName] = desc;
              Object.defineProperty(obj, keyName, {
                configurable: true,
                enumerable: propertyIsEnumerable(obj, keyName),
                get() {
                  if (desc.get) {
                    return desc.get.call(this);
                  } else {
                    return desc.value;
                  }
                },
                set(value) {
                  (assert(`You attempted to update ${this}.${String(keyName)} to "${String(value)}", but it is being tracked by a tracking context, such as a template, computed property, or observer. In order to make sure the context updates properly, you must invalidate the property when updating it. You can mark the property as \`@tracked\`, or use \`@ember/object#set\` to do this.`));
                }
              });
            };
            teardownMandatorySetter = function (obj, keyName) {
              let setters = MANDATORY_SETTERS.get(obj);
              if (setters !== undefined && setters[keyName] !== undefined) {
                Object.defineProperty(obj, keyName, setters[keyName]);
                delete setters[keyName];
              }
            };
            setWithMandatorySetter = function (obj, keyName, value) {
              let setters = MANDATORY_SETTERS.get(obj);
              if (setters !== undefined && setters[keyName] !== undefined) {
                let setter = setters[keyName];
                if (setter.set) {
                  setter.set.call(obj, value);
                } else {
                  setter.value = value;

                  // If the object didn't have own property before, it would have changed
                  // the enumerability after setting the value the first time.
                  if (!setter.hadOwnProperty) {
                    let desc = lookupDescriptor(obj, keyName);
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

          const emberinternalsUtilsIndex = /*#__PURE__*/Object.defineProperty({
                    __proto__: null,
                    Cache,
                    GUID_KEY,
                    ROOT,
                    canInvoke,
                    checkHasSuper,
                    dictionary: makeDictionary,
                    enumerableSymbol,
                    generateGuid,
                    getDebugName: getDebugName$1,
                    getName,
                    guidFor,
                    intern: intern$1,
                    isInternalSymbol,
                    isObject: isObject$1,
                    isProxy,
                    lookupDescriptor,
                    observerListenerMetaFor,
                    setListeners,
                    setName,
                    setObservers,
                    setProxy,
                    get setWithMandatorySetter () { return setWithMandatorySetter; },
                    get setupMandatorySetter () { return setupMandatorySetter; },
                    symbol,
                    get teardownMandatorySetter () { return teardownMandatorySetter; },
                    toString,
                    uuid,
                    wrap
          }, Symbol.toStringTag, { value: 'Module' });

          /**
            Set `EmberENV.FEATURES` in your application's `config/environment.js` file
            to enable canary features in your application.

            See the [feature flag guide](https://guides.emberjs.com/release/configuring-ember/feature-flags/)
            for more details.

            @module @ember/canary-features
            @public
          */

          const DEFAULT_FEATURES = {
            // FLAG_NAME: true/false
          };

          /**
            The hash of enabled Canary features. Add to this, any canary features
            before creating your application.

            @class FEATURES
            @static
            @since 1.1.0
            @public
          */
          const FEATURES = Object.assign(DEFAULT_FEATURES, ENV.FEATURES);

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
          function isEnabled(feature) {
            let value = FEATURES[feature];
            if (value === true || value === false) {
              return value;
            } else if (ENV.ENABLE_OPTIONAL_FEATURES) {
              return true;
            } else {
              return false;
            }
          }

          // Uncomment the below when features are present:

          // function featureValue(value: null | boolean) {
          //   if (ENV.ENABLE_OPTIONAL_FEATURES && value === null) {
          //     return true;
          //   }

          //   return value;
          // }
          //
          // export const FLAG_NAME = featureValue(FEATURES.FLAG_NAME);

          const emberCanaryFeaturesIndex = /*#__PURE__*/Object.defineProperty({
                    __proto__: null,
                    DEFAULT_FEATURES,
                    FEATURES,
                    isEnabled
          }, Symbol.toStringTag, { value: 'Module' });

          /* eslint-disable no-implicit-coercion */

          // These versions should be the version that the deprecation was _introduced_,
          // not the version that the feature will be removed.

          const ASSIGN = !!'4.0.0-beta.1';

          const emberDeprecatedFeaturesIndex = /*#__PURE__*/Object.defineProperty({
                    __proto__: null,
                    ASSIGN
          }, Symbol.toStringTag, { value: 'Module' });

          const opcodes = {
            Append: 1,
            TrustingAppend: 2,
            Comment: 3,
            Modifier: 4,
            StrictModifier: 5,
            Block: 6,
            StrictBlock: 7,
            Component: 8,
            OpenElement: 10,
            OpenElementWithSplat: 11,
            FlushElement: 12,
            CloseElement: 13,
            StaticAttr: 14,
            DynamicAttr: 15,
            ComponentAttr: 16,
            AttrSplat: 17,
            Yield: 18,
            DynamicArg: 20,
            StaticArg: 21,
            TrustingDynamicAttr: 22,
            TrustingComponentAttr: 23,
            StaticComponentAttr: 24,
            Debugger: 26,
            Undefined: 27,
            Call: 28,
            Concat: 29,
            GetSymbol: 30,
            GetLexicalSymbol: 32,
            GetStrictKeyword: 31,
            GetFreeAsComponentOrHelperHead: 35,
            GetFreeAsHelperHead: 37,
            GetFreeAsModifierHead: 38,
            GetFreeAsComponentHead: 39,
            InElement: 40,
            If: 41,
            Each: 42,
            Let: 44,
            WithDynamicVars: 45,
            InvokeComponent: 46,
            HasBlock: 48,
            HasBlockParams: 49,
            Curry: 50,
            Not: 51,
            IfInline: 52,
            GetDynamicVar: 53,
            Log: 54
          };

          // eslint-disable-next-line @typescript-eslint/naming-convention

          const resolution = {
            Strict: 0,
            ResolveAsComponentOrHelperHead: 1,
            ResolveAsHelperHead: 5,
            ResolveAsModifierHead: 6,
            ResolveAsComponentHead: 7
          };
          const WellKnownAttrNames = {
            class: 0,
            id: 1,
            value: 2,
            name: 3,
            type: 4,
            style: 5,
            href: 6
          };
          const WellKnownTagNames = {
            div: 0,
            span: 1,
            p: 2,
            a: 3
          };
          function is(variant) {
            return function (value) {
              return Array.isArray(value) && value[0] === variant;
            };
          }

          // Statements
          const isFlushElement = is(opcodes.FlushElement);
          function isAttribute(val) {
            return val[0] === opcodes.StaticAttr || val[0] === opcodes.DynamicAttr || val[0] === opcodes.TrustingDynamicAttr || val[0] === opcodes.ComponentAttr || val[0] === opcodes.StaticComponentAttr || val[0] === opcodes.TrustingComponentAttr || val[0] === opcodes.AttrSplat || val[0] === opcodes.Modifier;
          }
          function isStringLiteral$1(expr) {
            return typeof expr === 'string';
          }
          function getStringFromValue(expr) {
            return expr;
          }
          function isArgument(val) {
            return val[0] === opcodes.StaticArg || val[0] === opcodes.DynamicArg;
          }
          function isHelper(expr) {
            return Array.isArray(expr) && expr[0] === opcodes.Call;
          }

          // Expressions
          const isGet = is(opcodes.GetSymbol);

          const glimmerWireFormat = /*#__PURE__*/Object.defineProperty({
                    __proto__: null,
                    SexpOpcodes: opcodes,
                    VariableResolutionContext: resolution,
                    WellKnownAttrNames,
                    WellKnownTagNames,
                    getStringFromValue,
                    is,
                    isArgument,
                    isAttribute,
                    isFlushElement,
                    isGet,
                    isHelper,
                    isStringLiteral: isStringLiteral$1
          }, Symbol.toStringTag, { value: 'Module' });

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
            var tmp = Error.prototype.constructor.call(this, message);
            // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
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
                this.endLineNumber = endLineNumber;
                // Work around issue under safari where we can't directly set the column value
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
            acceptKey: function (node, name) {
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
            acceptRequired: function (node, name) {
              this.acceptKey(node, name);
              if (!node[name]) {
                throw new Exception(node.type + ' requires ' + name);
              }
            },
            // Traverses a given array. If mutating, empty respnses will be removed
            // for child elements.
            acceptArray: function (array) {
              for (var i = 0, l = array.length; i < l; i++) {
                this.acceptKey(array, i);
                if (!array[i]) {
                  array.splice(i, 1);
                  i--;
                  l--;
                }
              }
            },
            accept: function (object) {
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
            Program: function (program) {
              this.acceptArray(program.body);
            },
            MustacheStatement: visitSubExpression,
            Decorator: visitSubExpression,
            BlockStatement: visitBlock,
            DecoratorBlock: visitBlock,
            PartialStatement: visitPartial,
            PartialBlockStatement: function (partial) {
              visitPartial.call(this, partial);
              this.acceptKey(partial, 'program');
            },
            ContentStatement: function /* content */ () {},
            CommentStatement: function /* comment */ () {},
            SubExpression: visitSubExpression,
            PathExpression: function /* path */ () {},
            StringLiteral: function /* string */ () {},
            NumberLiteral: function /* number */ () {},
            BooleanLiteral: function /* bool */ () {},
            UndefinedLiteral: function /* literal */ () {},
            NullLiteral: function /* literal */ () {},
            Hash: function (hash) {
              this.acceptArray(hash.pairs);
            },
            HashPair: function (pair) {
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
                omitRight((current.program || current.inverse).body);
                // Strip out the previous content node if it's whitespace only
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
            this.accept(block.inverse);
            // Find the inverse program that is involed with whitespace stripping.
            var program = block.program || block.inverse,
              inverse = block.program && block.inverse,
              firstInverse = inverse,
              lastInverse = inverse;
            if (inverse && inverse.chained) {
              firstInverse = inverse.body[0].program;
              // Walk the inverse chain to find the last inverse that is actually in the chain.
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
              }
              // Find standalone else statments
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
            }
            // Nodes that end with newlines are considered whitespace (but are special
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
          }
          // Marks the node to the right of the position as omitted.
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
          }
          // Marks the node to the left of the position as omitted.
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
            }
            // We omit the last node if it's whitespace only and not preceded by a non-content node.
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
            var o = function (k, v, o, l) {
                for (o = o || {}, l = k.length; l--; o[k[l]] = v);
                return o;
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
              performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
                /* this == yyval */
                var $0 = $$.length - 1;
                switch (yystate) {
                  case 1:
                    return $$[$0 - 1];
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
                var lex = function () {
                  var token;
                  token = lexer.lex() || EOF;
                  if (typeof token !== 'number') {
                    token = self.symbols_[token] || token;
                  }
                  return token;
                };
                var symbol,
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
                      {
                        yyleng = lexer.yyleng;
                        yytext = lexer.yytext;
                        yylineno = lexer.yylineno;
                        yyloc = lexer.yylloc;
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
                setInput: function (input, yy) {
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
                input: function () {
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
                unput: function (ch) {
                  var len = ch.length;
                  var lines = ch.split(/(?:\r\n?|\n)/g);
                  this._input = ch + this._input;
                  this.yytext = this.yytext.substr(0, this.yytext.length - len);
                  //this.yyleng -= len;
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
                more: function () {
                  this._more = true;
                  return this;
                },
                // When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
                reject: function () {
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
                less: function (n) {
                  this.unput(this.match.slice(n));
                },
                // displays already matched input, i.e. for error messages
                pastInput: function () {
                  var past = this.matched.substr(0, this.matched.length - this.match.length);
                  return (past.length > 20 ? '...' : '') + past.substr(-20).replace(/\n/g, "");
                },
                // displays upcoming input, i.e. for error messages
                upcomingInput: function () {
                  var next = this.match;
                  if (next.length < 20) {
                    next += this._input.substr(0, 20 - next.length);
                  }
                  return (next.substr(0, 20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
                },
                // displays the character position where the lexing error occurred, i.e. for error messages
                showPosition: function () {
                  var pre = this.pastInput();
                  var c = new Array(pre.length + 1).join("-");
                  return pre + this.upcomingInput() + "\n" + c + "^";
                },
                // test the lexed token: return FALSE when not a match, otherwise return token
                test_match: function (match, indexed_rule) {
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
                next: function () {
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
                    }
                    // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
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
                    case 2:
                      this.popState();
                      return 15;
                    case 3:
                      this.begin('raw');
                      return 15;
                    case 4:
                      this.popState();
                      // Should be using `this.topState()` below, but it currently
                      // returns the second top instead of the first top. Opened an
                      // issue about it at https://github.com/zaach/jison/issues/291
                      if (this.conditionStack[this.conditionStack.length - 1] === 'raw') {
                        return 15;
                      } else {
                        strip(5, 9);
                        return 18;
                      }
                    case 5:
                      return 15;
                    case 6:
                      this.popState();
                      return 14;
                    case 7:
                      return 64;
                    case 8:
                      return 67;
                    case 9:
                      return 19;
                    case 10:
                      this.popState();
                      this.begin('raw');
                      return 23;
                    case 11:
                      return 56;
                    case 12:
                      return 60;
                    case 13:
                      return 29;
                    case 14:
                      return 47;
                    case 15:
                      this.popState();
                      return 44;
                    case 16:
                      this.popState();
                      return 44;
                    case 17:
                      return 34;
                    case 18:
                      return 39;
                    case 19:
                      return 52;
                    case 20:
                      return 48;
                    case 21:
                      this.unput(yy_.yytext);
                      this.popState();
                      this.begin('com');
                      break;
                    case 22:
                      this.popState();
                      return 14;
                    case 23:
                      return 48;
                    case 24:
                      return 72;
                    case 25:
                      return 71;
                    case 26:
                      return 71;
                    case 27:
                      return 86;
                    case 28:
                      // ignore whitespace
                      break;
                    case 29:
                      this.popState();
                      return 55;
                    case 30:
                      this.popState();
                      return 33;
                    case 31:
                      yy_.yytext = strip(1, 2).replace(/\\"/g, '"');
                      return 79;
                    case 32:
                      yy_.yytext = strip(1, 2).replace(/\\'/g, "'");
                      return 79;
                    case 33:
                      return 84;
                    case 34:
                      return 81;
                    case 35:
                      return 81;
                    case 36:
                      return 82;
                    case 37:
                      return 83;
                    case 38:
                      return 80;
                    case 39:
                      return 74;
                    case 40:
                      return 76;
                    case 41:
                      return 71;
                    case 42:
                      yy_.yytext = yy_.yytext.replace(/\\([\\\]])/g, '$1');
                      return 71;
                    case 43:
                      return 'INVALID';
                    case 44:
                      return 5;
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

          const Helpers = /*#__PURE__*/Object.defineProperty({
                    __proto__: null,
                    SourceLocation,
                    id,
                    prepareBlock,
                    prepareMustache,
                    preparePartialBlock,
                    preparePath,
                    prepareProgram,
                    prepareRawBlock,
                    stripComment,
                    stripFlags
          }, Symbol.toStringTag, { value: 'Module' });

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
            parser.yy = baseHelpers;
            // Altering the shared object here, but this is ok as parser is a sync operation
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

          const handlebarsParserIndex = /*#__PURE__*/Object.defineProperty({
                    __proto__: null,
                    Exception,
                    PrintVisitor,
                    Visitor,
                    WhitespaceControl,
                    parse,
                    parseWithoutProcessing,
                    parser,
                    print
          }, Symbol.toStringTag, { value: 'Module' });

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
            lrm: "\u200e",
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
            NewLine: "\u000a",
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
            rlm: "\u200f",
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
            shy: "\u00ad",
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
            Tab: "\u0009",
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
            zwj: "\u200d",
            zwnj: "\u200c"
          };
          var HEXCHARCODE = /^#[xX]([A-Fa-f0-9]+)$/;
          var CHARCODE = /^#([0-9]+)$/;
          var NAMED = /^([A-Za-z0-9]+)$/;
          var EntityParser = /** @class */function () {
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
          var WSP = /[\t\n\f ]/;
          var ALPHA$1 = /[A-Za-z]/;
          var CRLF = /\r\n?/g;
          function isSpace$1(char) {
            return WSP.test(char);
          }
          function isAlpha(char) {
            return ALPHA$1.test(char);
          }
          function preprocessInput(input) {
            return input.replace(CRLF, '\n');
          }
          var EventedTokenizer = /** @class */function () {
            function EventedTokenizer(delegate, entityParser, mode) {
              if (mode === void 0) {
                mode = 'precompile';
              }
              this.delegate = delegate;
              this.entityParser = entityParser;
              this.mode = mode;
              this.state = "beforeData" /* beforeData */;
              this.line = -1;
              this.column = -1;
              this.input = '';
              this.index = -1;
              this.tagNameBuffer = '';
              this.states = {
                beforeData: function () {
                  var char = this.peek();
                  if (char === '<' && !this.isIgnoredEndTag()) {
                    this.transitionTo("tagOpen" /* tagOpen */);
                    this.markTagStart();
                    this.consume();
                  } else {
                    if (this.mode === 'precompile' && char === '\n') {
                      var tag = this.tagNameBuffer.toLowerCase();
                      if (tag === 'pre' || tag === 'textarea') {
                        this.consume();
                      }
                    }
                    this.transitionTo("data" /* data */);
                    this.delegate.beginData();
                  }
                },
                data: function () {
                  var char = this.peek();
                  var tag = this.tagNameBuffer;
                  if (char === '<' && !this.isIgnoredEndTag()) {
                    this.delegate.finishData();
                    this.transitionTo("tagOpen" /* tagOpen */);
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
                tagOpen: function () {
                  var char = this.consume();
                  if (char === '!') {
                    this.transitionTo("markupDeclarationOpen" /* markupDeclarationOpen */);
                  } else if (char === '/') {
                    this.transitionTo("endTagOpen" /* endTagOpen */);
                  } else if (char === '@' || char === ':' || isAlpha(char)) {
                    this.transitionTo("tagName" /* tagName */);
                    this.tagNameBuffer = '';
                    this.delegate.beginStartTag();
                    this.appendToTagName(char);
                  }
                },
                markupDeclarationOpen: function () {
                  var char = this.consume();
                  if (char === '-' && this.peek() === '-') {
                    this.consume();
                    this.transitionTo("commentStart" /* commentStart */);
                    this.delegate.beginComment();
                  } else {
                    var maybeDoctype = char.toUpperCase() + this.input.substring(this.index, this.index + 6).toUpperCase();
                    if (maybeDoctype === 'DOCTYPE') {
                      this.consume();
                      this.consume();
                      this.consume();
                      this.consume();
                      this.consume();
                      this.consume();
                      this.transitionTo("doctype" /* doctype */);
                      if (this.delegate.beginDoctype) this.delegate.beginDoctype();
                    }
                  }
                },
                doctype: function () {
                  var char = this.consume();
                  if (isSpace$1(char)) {
                    this.transitionTo("beforeDoctypeName" /* beforeDoctypeName */);
                  }
                },
                beforeDoctypeName: function () {
                  var char = this.consume();
                  if (isSpace$1(char)) {
                    return;
                  } else {
                    this.transitionTo("doctypeName" /* doctypeName */);
                    if (this.delegate.appendToDoctypeName) this.delegate.appendToDoctypeName(char.toLowerCase());
                  }
                },
                doctypeName: function () {
                  var char = this.consume();
                  if (isSpace$1(char)) {
                    this.transitionTo("afterDoctypeName" /* afterDoctypeName */);
                  } else if (char === '>') {
                    if (this.delegate.endDoctype) this.delegate.endDoctype();
                    this.transitionTo("beforeData" /* beforeData */);
                  } else {
                    if (this.delegate.appendToDoctypeName) this.delegate.appendToDoctypeName(char.toLowerCase());
                  }
                },
                afterDoctypeName: function () {
                  var char = this.consume();
                  if (isSpace$1(char)) {
                    return;
                  } else if (char === '>') {
                    if (this.delegate.endDoctype) this.delegate.endDoctype();
                    this.transitionTo("beforeData" /* beforeData */);
                  } else {
                    var nextSixChars = char.toUpperCase() + this.input.substring(this.index, this.index + 5).toUpperCase();
                    var isPublic = nextSixChars.toUpperCase() === 'PUBLIC';
                    var isSystem = nextSixChars.toUpperCase() === 'SYSTEM';
                    if (isPublic || isSystem) {
                      this.consume();
                      this.consume();
                      this.consume();
                      this.consume();
                      this.consume();
                      this.consume();
                    }
                    if (isPublic) {
                      this.transitionTo("afterDoctypePublicKeyword" /* afterDoctypePublicKeyword */);
                    } else if (isSystem) {
                      this.transitionTo("afterDoctypeSystemKeyword" /* afterDoctypeSystemKeyword */);
                    }
                  }
                },
                afterDoctypePublicKeyword: function () {
                  var char = this.peek();
                  if (isSpace$1(char)) {
                    this.transitionTo("beforeDoctypePublicIdentifier" /* beforeDoctypePublicIdentifier */);
                    this.consume();
                  } else if (char === '"') {
                    this.transitionTo("doctypePublicIdentifierDoubleQuoted" /* doctypePublicIdentifierDoubleQuoted */);
                    this.consume();
                  } else if (char === "'") {
                    this.transitionTo("doctypePublicIdentifierSingleQuoted" /* doctypePublicIdentifierSingleQuoted */);
                    this.consume();
                  } else if (char === '>') {
                    this.consume();
                    if (this.delegate.endDoctype) this.delegate.endDoctype();
                    this.transitionTo("beforeData" /* beforeData */);
                  }
                },
                doctypePublicIdentifierDoubleQuoted: function () {
                  var char = this.consume();
                  if (char === '"') {
                    this.transitionTo("afterDoctypePublicIdentifier" /* afterDoctypePublicIdentifier */);
                  } else if (char === '>') {
                    if (this.delegate.endDoctype) this.delegate.endDoctype();
                    this.transitionTo("beforeData" /* beforeData */);
                  } else {
                    if (this.delegate.appendToDoctypePublicIdentifier) this.delegate.appendToDoctypePublicIdentifier(char);
                  }
                },
                doctypePublicIdentifierSingleQuoted: function () {
                  var char = this.consume();
                  if (char === "'") {
                    this.transitionTo("afterDoctypePublicIdentifier" /* afterDoctypePublicIdentifier */);
                  } else if (char === '>') {
                    if (this.delegate.endDoctype) this.delegate.endDoctype();
                    this.transitionTo("beforeData" /* beforeData */);
                  } else {
                    if (this.delegate.appendToDoctypePublicIdentifier) this.delegate.appendToDoctypePublicIdentifier(char);
                  }
                },
                afterDoctypePublicIdentifier: function () {
                  var char = this.consume();
                  if (isSpace$1(char)) {
                    this.transitionTo("betweenDoctypePublicAndSystemIdentifiers" /* betweenDoctypePublicAndSystemIdentifiers */);
                  } else if (char === '>') {
                    if (this.delegate.endDoctype) this.delegate.endDoctype();
                    this.transitionTo("beforeData" /* beforeData */);
                  } else if (char === '"') {
                    this.transitionTo("doctypeSystemIdentifierDoubleQuoted" /* doctypeSystemIdentifierDoubleQuoted */);
                  } else if (char === "'") {
                    this.transitionTo("doctypeSystemIdentifierSingleQuoted" /* doctypeSystemIdentifierSingleQuoted */);
                  }
                },
                betweenDoctypePublicAndSystemIdentifiers: function () {
                  var char = this.consume();
                  if (isSpace$1(char)) {
                    return;
                  } else if (char === '>') {
                    if (this.delegate.endDoctype) this.delegate.endDoctype();
                    this.transitionTo("beforeData" /* beforeData */);
                  } else if (char === '"') {
                    this.transitionTo("doctypeSystemIdentifierDoubleQuoted" /* doctypeSystemIdentifierDoubleQuoted */);
                  } else if (char === "'") {
                    this.transitionTo("doctypeSystemIdentifierSingleQuoted" /* doctypeSystemIdentifierSingleQuoted */);
                  }
                },
                doctypeSystemIdentifierDoubleQuoted: function () {
                  var char = this.consume();
                  if (char === '"') {
                    this.transitionTo("afterDoctypeSystemIdentifier" /* afterDoctypeSystemIdentifier */);
                  } else if (char === '>') {
                    if (this.delegate.endDoctype) this.delegate.endDoctype();
                    this.transitionTo("beforeData" /* beforeData */);
                  } else {
                    if (this.delegate.appendToDoctypeSystemIdentifier) this.delegate.appendToDoctypeSystemIdentifier(char);
                  }
                },
                doctypeSystemIdentifierSingleQuoted: function () {
                  var char = this.consume();
                  if (char === "'") {
                    this.transitionTo("afterDoctypeSystemIdentifier" /* afterDoctypeSystemIdentifier */);
                  } else if (char === '>') {
                    if (this.delegate.endDoctype) this.delegate.endDoctype();
                    this.transitionTo("beforeData" /* beforeData */);
                  } else {
                    if (this.delegate.appendToDoctypeSystemIdentifier) this.delegate.appendToDoctypeSystemIdentifier(char);
                  }
                },
                afterDoctypeSystemIdentifier: function () {
                  var char = this.consume();
                  if (isSpace$1(char)) {
                    return;
                  } else if (char === '>') {
                    if (this.delegate.endDoctype) this.delegate.endDoctype();
                    this.transitionTo("beforeData" /* beforeData */);
                  }
                },
                commentStart: function () {
                  var char = this.consume();
                  if (char === '-') {
                    this.transitionTo("commentStartDash" /* commentStartDash */);
                  } else if (char === '>') {
                    this.delegate.finishComment();
                    this.transitionTo("beforeData" /* beforeData */);
                  } else {
                    this.delegate.appendToCommentData(char);
                    this.transitionTo("comment" /* comment */);
                  }
                },
                commentStartDash: function () {
                  var char = this.consume();
                  if (char === '-') {
                    this.transitionTo("commentEnd" /* commentEnd */);
                  } else if (char === '>') {
                    this.delegate.finishComment();
                    this.transitionTo("beforeData" /* beforeData */);
                  } else {
                    this.delegate.appendToCommentData('-');
                    this.transitionTo("comment" /* comment */);
                  }
                },
                comment: function () {
                  var char = this.consume();
                  if (char === '-') {
                    this.transitionTo("commentEndDash" /* commentEndDash */);
                  } else {
                    this.delegate.appendToCommentData(char);
                  }
                },
                commentEndDash: function () {
                  var char = this.consume();
                  if (char === '-') {
                    this.transitionTo("commentEnd" /* commentEnd */);
                  } else {
                    this.delegate.appendToCommentData('-' + char);
                    this.transitionTo("comment" /* comment */);
                  }
                },
                commentEnd: function () {
                  var char = this.consume();
                  if (char === '>') {
                    this.delegate.finishComment();
                    this.transitionTo("beforeData" /* beforeData */);
                  } else {
                    this.delegate.appendToCommentData('--' + char);
                    this.transitionTo("comment" /* comment */);
                  }
                },
                tagName: function () {
                  var char = this.consume();
                  if (isSpace$1(char)) {
                    this.transitionTo("beforeAttributeName" /* beforeAttributeName */);
                  } else if (char === '/') {
                    this.transitionTo("selfClosingStartTag" /* selfClosingStartTag */);
                  } else if (char === '>') {
                    this.delegate.finishTag();
                    this.transitionTo("beforeData" /* beforeData */);
                  } else {
                    this.appendToTagName(char);
                  }
                },
                endTagName: function () {
                  var char = this.consume();
                  if (isSpace$1(char)) {
                    this.transitionTo("beforeAttributeName" /* beforeAttributeName */);
                    this.tagNameBuffer = '';
                  } else if (char === '/') {
                    this.transitionTo("selfClosingStartTag" /* selfClosingStartTag */);
                    this.tagNameBuffer = '';
                  } else if (char === '>') {
                    this.delegate.finishTag();
                    this.transitionTo("beforeData" /* beforeData */);
                    this.tagNameBuffer = '';
                  } else {
                    this.appendToTagName(char);
                  }
                },
                beforeAttributeName: function () {
                  var char = this.peek();
                  if (isSpace$1(char)) {
                    this.consume();
                    return;
                  } else if (char === '/') {
                    this.transitionTo("selfClosingStartTag" /* selfClosingStartTag */);
                    this.consume();
                  } else if (char === '>') {
                    this.consume();
                    this.delegate.finishTag();
                    this.transitionTo("beforeData" /* beforeData */);
                  } else if (char === '=') {
                    this.delegate.reportSyntaxError('attribute name cannot start with equals sign');
                    this.transitionTo("attributeName" /* attributeName */);
                    this.delegate.beginAttribute();
                    this.consume();
                    this.delegate.appendToAttributeName(char);
                  } else {
                    this.transitionTo("attributeName" /* attributeName */);
                    this.delegate.beginAttribute();
                  }
                },
                attributeName: function () {
                  var char = this.peek();
                  if (isSpace$1(char)) {
                    this.transitionTo("afterAttributeName" /* afterAttributeName */);
                    this.consume();
                  } else if (char === '/') {
                    this.delegate.beginAttributeValue(false);
                    this.delegate.finishAttributeValue();
                    this.consume();
                    this.transitionTo("selfClosingStartTag" /* selfClosingStartTag */);
                  } else if (char === '=') {
                    this.transitionTo("beforeAttributeValue" /* beforeAttributeValue */);
                    this.consume();
                  } else if (char === '>') {
                    this.delegate.beginAttributeValue(false);
                    this.delegate.finishAttributeValue();
                    this.consume();
                    this.delegate.finishTag();
                    this.transitionTo("beforeData" /* beforeData */);
                  } else if (char === '"' || char === "'" || char === '<') {
                    this.delegate.reportSyntaxError(char + ' is not a valid character within attribute names');
                    this.consume();
                    this.delegate.appendToAttributeName(char);
                  } else {
                    this.consume();
                    this.delegate.appendToAttributeName(char);
                  }
                },
                afterAttributeName: function () {
                  var char = this.peek();
                  if (isSpace$1(char)) {
                    this.consume();
                    return;
                  } else if (char === '/') {
                    this.delegate.beginAttributeValue(false);
                    this.delegate.finishAttributeValue();
                    this.consume();
                    this.transitionTo("selfClosingStartTag" /* selfClosingStartTag */);
                  } else if (char === '=') {
                    this.consume();
                    this.transitionTo("beforeAttributeValue" /* beforeAttributeValue */);
                  } else if (char === '>') {
                    this.delegate.beginAttributeValue(false);
                    this.delegate.finishAttributeValue();
                    this.consume();
                    this.delegate.finishTag();
                    this.transitionTo("beforeData" /* beforeData */);
                  } else {
                    this.delegate.beginAttributeValue(false);
                    this.delegate.finishAttributeValue();
                    this.transitionTo("attributeName" /* attributeName */);
                    this.delegate.beginAttribute();
                    this.consume();
                    this.delegate.appendToAttributeName(char);
                  }
                },
                beforeAttributeValue: function () {
                  var char = this.peek();
                  if (isSpace$1(char)) {
                    this.consume();
                  } else if (char === '"') {
                    this.transitionTo("attributeValueDoubleQuoted" /* attributeValueDoubleQuoted */);
                    this.delegate.beginAttributeValue(true);
                    this.consume();
                  } else if (char === "'") {
                    this.transitionTo("attributeValueSingleQuoted" /* attributeValueSingleQuoted */);
                    this.delegate.beginAttributeValue(true);
                    this.consume();
                  } else if (char === '>') {
                    this.delegate.beginAttributeValue(false);
                    this.delegate.finishAttributeValue();
                    this.consume();
                    this.delegate.finishTag();
                    this.transitionTo("beforeData" /* beforeData */);
                  } else {
                    this.transitionTo("attributeValueUnquoted" /* attributeValueUnquoted */);
                    this.delegate.beginAttributeValue(false);
                    this.consume();
                    this.delegate.appendToAttributeValue(char);
                  }
                },
                attributeValueDoubleQuoted: function () {
                  var char = this.consume();
                  if (char === '"') {
                    this.delegate.finishAttributeValue();
                    this.transitionTo("afterAttributeValueQuoted" /* afterAttributeValueQuoted */);
                  } else if (char === '&') {
                    this.delegate.appendToAttributeValue(this.consumeCharRef() || '&');
                  } else {
                    this.delegate.appendToAttributeValue(char);
                  }
                },
                attributeValueSingleQuoted: function () {
                  var char = this.consume();
                  if (char === "'") {
                    this.delegate.finishAttributeValue();
                    this.transitionTo("afterAttributeValueQuoted" /* afterAttributeValueQuoted */);
                  } else if (char === '&') {
                    this.delegate.appendToAttributeValue(this.consumeCharRef() || '&');
                  } else {
                    this.delegate.appendToAttributeValue(char);
                  }
                },
                attributeValueUnquoted: function () {
                  var char = this.peek();
                  if (isSpace$1(char)) {
                    this.delegate.finishAttributeValue();
                    this.consume();
                    this.transitionTo("beforeAttributeName" /* beforeAttributeName */);
                  } else if (char === '/') {
                    this.delegate.finishAttributeValue();
                    this.consume();
                    this.transitionTo("selfClosingStartTag" /* selfClosingStartTag */);
                  } else if (char === '&') {
                    this.consume();
                    this.delegate.appendToAttributeValue(this.consumeCharRef() || '&');
                  } else if (char === '>') {
                    this.delegate.finishAttributeValue();
                    this.consume();
                    this.delegate.finishTag();
                    this.transitionTo("beforeData" /* beforeData */);
                  } else {
                    this.consume();
                    this.delegate.appendToAttributeValue(char);
                  }
                },
                afterAttributeValueQuoted: function () {
                  var char = this.peek();
                  if (isSpace$1(char)) {
                    this.consume();
                    this.transitionTo("beforeAttributeName" /* beforeAttributeName */);
                  } else if (char === '/') {
                    this.consume();
                    this.transitionTo("selfClosingStartTag" /* selfClosingStartTag */);
                  } else if (char === '>') {
                    this.consume();
                    this.delegate.finishTag();
                    this.transitionTo("beforeData" /* beforeData */);
                  } else {
                    this.transitionTo("beforeAttributeName" /* beforeAttributeName */);
                  }
                },
                selfClosingStartTag: function () {
                  var char = this.peek();
                  if (char === '>') {
                    this.consume();
                    this.delegate.markTagAsSelfClosing();
                    this.delegate.finishTag();
                    this.transitionTo("beforeData" /* beforeData */);
                  } else {
                    this.transitionTo("beforeAttributeName" /* beforeAttributeName */);
                  }
                },
                endTagOpen: function () {
                  var char = this.consume();
                  if (char === '@' || char === ':' || isAlpha(char)) {
                    this.transitionTo("endTagName" /* endTagName */);
                    this.tagNameBuffer = '';
                    this.delegate.beginEndTag();
                    this.appendToTagName(char);
                  }
                }
              };
              this.reset();
            }
            EventedTokenizer.prototype.reset = function () {
              this.transitionTo("beforeData" /* beforeData */);
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
                this.transitionTo("beforeData" /* beforeData */);
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
                var count = entity.length;
                // consume the entity chars
                while (count) {
                  this.consume();
                  count--;
                }
                // consume the `;`
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
          var Tokenizer = /** @class */function () {
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
            };
            // Data
            Tokenizer.prototype.beginDoctype = function () {
              this.push({
                type: "Doctype" /* Doctype */,
                name: ''
              });
            };
            Tokenizer.prototype.appendToDoctypeName = function (char) {
              this.current("Doctype" /* Doctype */).name += char;
            };
            Tokenizer.prototype.appendToDoctypePublicIdentifier = function (char) {
              var doctype = this.current("Doctype" /* Doctype */);
              if (doctype.publicIdentifier === undefined) {
                doctype.publicIdentifier = char;
              } else {
                doctype.publicIdentifier += char;
              }
            };
            Tokenizer.prototype.appendToDoctypeSystemIdentifier = function (char) {
              var doctype = this.current("Doctype" /* Doctype */);
              if (doctype.systemIdentifier === undefined) {
                doctype.systemIdentifier = char;
              } else {
                doctype.systemIdentifier += char;
              }
            };
            Tokenizer.prototype.endDoctype = function () {
              this.addLocInfo();
            };
            Tokenizer.prototype.beginData = function () {
              this.push({
                type: "Chars" /* Chars */,
                chars: ''
              });
            };
            Tokenizer.prototype.appendToData = function (char) {
              this.current("Chars" /* Chars */).chars += char;
            };
            Tokenizer.prototype.finishData = function () {
              this.addLocInfo();
            };
            // Comment
            Tokenizer.prototype.beginComment = function () {
              this.push({
                type: "Comment" /* Comment */,
                chars: ''
              });
            };
            Tokenizer.prototype.appendToCommentData = function (char) {
              this.current("Comment" /* Comment */).chars += char;
            };
            Tokenizer.prototype.finishComment = function () {
              this.addLocInfo();
            };
            // Tags - basic
            Tokenizer.prototype.tagOpen = function () {};
            Tokenizer.prototype.beginStartTag = function () {
              this.push({
                type: "StartTag" /* StartTag */,
                tagName: '',
                attributes: [],
                selfClosing: false
              });
            };
            Tokenizer.prototype.beginEndTag = function () {
              this.push({
                type: "EndTag" /* EndTag */,
                tagName: ''
              });
            };
            Tokenizer.prototype.finishTag = function () {
              this.addLocInfo();
            };
            Tokenizer.prototype.markTagAsSelfClosing = function () {
              this.current("StartTag" /* StartTag */).selfClosing = true;
            };
            // Tags - name
            Tokenizer.prototype.appendToTagName = function (char) {
              this.current("StartTag" /* StartTag */, "EndTag" /* EndTag */).tagName += char;
            };
            // Tags - attributes
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
              this.current("StartTag" /* StartTag */).attributes.push(this._currentAttribute);
            };
            Tokenizer.prototype.reportSyntaxError = function (message) {
              this.current().syntaxError = message;
            };
            return Tokenizer;
          }();
          function tokenize(input, options) {
            var tokenizer = new Tokenizer(new EntityParser(namedCharRefs), options);
            return tokenizer.tokenize(input);
          }

          const simpleHtmlTokenizer = /*#__PURE__*/Object.defineProperty({
                    __proto__: null,
                    EntityParser,
                    EventedTokenizer,
                    HTML5NamedCharRefs: namedCharRefs,
                    Tokenizer,
                    tokenize
          }, Symbol.toStringTag, { value: 'Module' });

          var Char = /*#__PURE__*/function (Char) {
            Char[Char["NBSP"] = 160] = "NBSP";
            Char[Char["QUOT"] = 34] = "QUOT";
            Char[Char["LT"] = 60] = "LT";
            Char[Char["GT"] = 62] = "GT";
            Char[Char["AMP"] = 38] = "AMP";
            return Char;
          }(Char || {});
          const ATTR_VALUE_REGEX_TEST = /["&\xA0]/u;
          const ATTR_VALUE_REGEX_REPLACE = new RegExp(ATTR_VALUE_REGEX_TEST.source, 'gu');
          const TEXT_REGEX_TEST = /[&<>\xA0]/u;
          const TEXT_REGEX_REPLACE = new RegExp(TEXT_REGEX_TEST.source, 'gu');
          function attrValueReplacer(char) {
            switch (char.charCodeAt(0)) {
              case Char.NBSP:
                return '&nbsp;';
              case Char.QUOT:
                return '&quot;';
              case Char.AMP:
                return '&amp;';
              default:
                return char;
            }
          }
          function textReplacer(char) {
            switch (char.charCodeAt(0)) {
              case Char.NBSP:
                return '&nbsp;';
              case Char.AMP:
                return '&amp;';
              case Char.LT:
                return '&lt;';
              case Char.GT:
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
          const voidMap = new Set(['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr']);
          function getVoidTags() {
            return [...voidMap];
          }
          const NON_WHITESPACE = /^\S/u;
          /**
           * Examples when true:
           *  - link
           *  - liNK
           *
           * Examples when false:
           *  - Link (component)
           */
          function isVoidTag(tag) {
            return voidMap.has(tag.toLowerCase()) && tag[0]?.toLowerCase() === tag[0];
          }
          class Printer {
            buffer = '';
            options;
            constructor(options) {
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
            handledByOverride(node, ensureLeadingWhitespace = false) {
              if (this.options.override !== undefined) {
                let result = this.options.override(node, this.options);
                if (typeof result === 'string') {
                  if (ensureLeadingWhitespace && NON_WHITESPACE.test(result)) {
                    result = ` ${result}`;
                  }
                  this.buffer += result;
                  return true;
                }
              }
              return false;
            }
            Node(node) {
              switch (node.type) {
                case 'MustacheStatement':
                case 'BlockStatement':
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
            }
            Expression(expression) {
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
            }
            Literal(literal) {
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
            }
            TopLevelStatement(statement) {
              switch (statement.type) {
                case 'MustacheStatement':
                  return this.MustacheStatement(statement);
                case 'BlockStatement':
                  return this.BlockStatement(statement);
                case 'MustacheCommentStatement':
                  return this.MustacheCommentStatement(statement);
                case 'CommentStatement':
                  return this.CommentStatement(statement);
                case 'TextNode':
                  return this.TextNode(statement);
                case 'ElementNode':
                  return this.ElementNode(statement);
                case 'Block':
                  return this.Block(statement);
                case 'Template':
                  return this.Template(statement);
                case 'AttrNode':
                  // should have element
                  return this.AttrNode(statement);
              }
            }
            Template(template) {
              this.TopLevelStatements(template.body);
            }
            Block(block) {
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
                let firstChild = block.body[0];
                firstChild.chained = true;
              }
              if (this.handledByOverride(block)) {
                return;
              }
              this.TopLevelStatements(block.body);
            }
            TopLevelStatements(statements) {
              statements.forEach(statement => this.TopLevelStatement(statement));
            }
            ElementNode(el) {
              if (this.handledByOverride(el)) {
                return;
              }
              this.OpenElementNode(el);
              this.TopLevelStatements(el.children);
              this.CloseElementNode(el);
            }
            OpenElementNode(el) {
              this.buffer += `<${el.tag}`;
              const parts = [...el.attributes, ...el.modifiers, ...el.comments].sort(sortByLoc);
              for (const part of parts) {
                this.buffer += ' ';
                switch (part.type) {
                  case 'AttrNode':
                    this.AttrNode(part);
                    break;
                  case 'ElementModifierStatement':
                    this.ElementModifierStatement(part);
                    break;
                  case 'MustacheCommentStatement':
                    this.MustacheCommentStatement(part);
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
            }
            CloseElementNode(el) {
              if (el.selfClosing || isVoidTag(el.tag)) {
                return;
              }
              this.buffer += `</${el.tag}>`;
            }
            AttrNode(attr) {
              if (this.handledByOverride(attr)) {
                return;
              }
              let {
                name,
                value
              } = attr;
              this.buffer += name;
              if (value.type !== 'TextNode' || value.chars.length > 0) {
                this.buffer += '=';
                this.AttrNodeValue(value);
              }
            }
            AttrNodeValue(value) {
              if (value.type === 'TextNode') {
                this.buffer += '"';
                this.TextNode(value, true);
                this.buffer += '"';
              } else {
                this.Node(value);
              }
            }
            TextNode(text, isAttr) {
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
            }
            MustacheStatement(mustache) {
              if (this.handledByOverride(mustache)) {
                return;
              }
              this.buffer += mustache.trusting ? '{{{' : '{{';
              if (mustache.strip.open) {
                this.buffer += '~';
              }
              this.Expression(mustache.path);
              this.Params(mustache.params);
              this.Hash(mustache.hash);
              if (mustache.strip.close) {
                this.buffer += '~';
              }
              this.buffer += mustache.trusting ? '}}}' : '}}';
            }
            BlockStatement(block) {
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
            }
            BlockParams(blockParams) {
              this.buffer += ` as |${blockParams.join(' ')}|`;
            }
            ConcatStatement(concat) {
              if (this.handledByOverride(concat)) {
                return;
              }
              this.buffer += '"';
              concat.parts.forEach(part => {
                if (part.type === 'TextNode') {
                  this.TextNode(part, true);
                } else {
                  this.Node(part);
                }
              });
              this.buffer += '"';
            }
            MustacheCommentStatement(comment) {
              if (this.handledByOverride(comment)) {
                return;
              }
              this.buffer += `{{!--${comment.value}--}}`;
            }
            ElementModifierStatement(mod) {
              if (this.handledByOverride(mod)) {
                return;
              }
              this.buffer += '{{';
              this.Expression(mod.path);
              this.Params(mod.params);
              this.Hash(mod.hash);
              this.buffer += '}}';
            }
            CommentStatement(comment) {
              if (this.handledByOverride(comment)) {
                return;
              }
              this.buffer += `<!--${comment.value}-->`;
            }
            PathExpression(path) {
              if (this.handledByOverride(path)) {
                return;
              }
              this.buffer += path.original;
            }
            SubExpression(sexp) {
              if (this.handledByOverride(sexp)) {
                return;
              }
              this.buffer += '(';
              this.Expression(sexp.path);
              this.Params(sexp.params);
              this.Hash(sexp.hash);
              this.buffer += ')';
            }
            Params(params) {
              // TODO: implement a top level Params AST node (just like the Hash object)
              // so that this can also be overridden
              if (params.length) {
                params.forEach(param => {
                  this.buffer += ' ';
                  this.Expression(param);
                });
              }
            }
            Hash(hash) {
              if (this.handledByOverride(hash, true)) {
                return;
              }
              hash.pairs.forEach(pair => {
                this.buffer += ' ';
                this.HashPair(pair);
              });
            }
            HashPair(pair) {
              if (this.handledByOverride(pair)) {
                return;
              }
              this.buffer += pair.key;
              this.buffer += '=';
              this.Node(pair.value);
            }
            StringLiteral(str) {
              if (this.handledByOverride(str)) {
                return;
              }
              this.buffer += JSON.stringify(str.value);
            }
            BooleanLiteral(bool) {
              if (this.handledByOverride(bool)) {
                return;
              }
              this.buffer += bool.value;
            }
            NumberLiteral(number) {
              if (this.handledByOverride(number)) {
                return;
              }
              this.buffer += number.value;
            }
            UndefinedLiteral(node) {
              if (this.handledByOverride(node)) {
                return;
              }
              this.buffer += 'undefined';
            }
            NullLiteral(node) {
              if (this.handledByOverride(node)) {
                return;
              }
              this.buffer += 'null';
            }
            print(node) {
              let {
                options
              } = this;
              if (options.override) {
                let result = options.override(node, options);
                if (result !== undefined) {
                  return result;
                }
              }
              this.buffer = '';
              this.Node(node);
              return this.buffer;
            }
          }
          function build(ast, options = {
            entityEncoding: 'transformed'
          }) {
            if (!ast) {
              return '';
            }
            let printer = new Printer(options);
            return printer.print(ast);
          }
          function isKeyword(word, type) {
            if (word in KEYWORDS_TYPES) {
              if (type === undefined) {
                return true;
              } else {
                let types = KEYWORDS_TYPES[word];
                // This seems like a TypeScript bug – it inferred types as never[]?
                return types.includes(type);
              }
            } else {
              return false;
            }
          }

          /**
           * This includes the full list of keywords currently in use in the template
           * language, and where their valid usages are.
           */
          const KEYWORDS_TYPES = {
            action: ['Call', 'Modifier'],
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
            log: ['Call', 'Append'],
            modifier: ['Call', 'Modifier'],
            mount: ['Append'],
            mut: ['Call', 'Append'],
            outlet: ['Append'],
            readonly: ['Call', 'Append'],
            unbound: ['Call', 'Append'],
            unless: ['Call', 'Append', 'Block'],
            yield: ['Append']
          };
          const UNKNOWN_POSITION = Object.freeze({
            line: 1,
            column: 0
          });
          const SYNTHETIC_LOCATION = Object.freeze({
            source: '(synthetic)',
            start: UNKNOWN_POSITION,
            end: UNKNOWN_POSITION
          });
          const NON_EXISTENT_LOCATION = Object.freeze({
            source: '(nonexistent)',
            start: UNKNOWN_POSITION,
            end: UNKNOWN_POSITION
          });
          const BROKEN_LOCATION = Object.freeze({
            source: '(broken)',
            start: UNKNOWN_POSITION,
            end: UNKNOWN_POSITION
          });
          let OffsetKind = /*#__PURE__*/function (OffsetKind) {
            OffsetKind["CharPosition"] = "CharPosition";
            OffsetKind["HbsPosition"] = "HbsPosition";
            OffsetKind["InternalsSynthetic"] = "InternalsSynthetic";
            OffsetKind["NonExistent"] = "NonExistent";
            OffsetKind["Broken"] = "Broken";
            return OffsetKind;
          }({});

          /**
           * This file implements the DSL used by span and offset in places where they need to exhaustively
           * consider all combinations of states (Handlebars offsets, character offsets and invisible/broken
           * offsets).
           *
           * It's probably overkill, but it makes the code that uses it clear. It could be refactored or
           * removed.
           */

          const MatchAny = 'MATCH_ANY';
          const IsInvisible = 'IS_INVISIBLE';
          class WhenList {
            _whens;
            constructor(whens) {
              this._whens = whens;
            }
            first(kind) {
              for (const when of this._whens) {
                const value = when.match(kind);
                if (isPresentArray(value)) {
                  return value[0];
                }
              }
              return null;
            }
          }
          class When {
            _map = new Map();
            get(pattern, or) {
              let value = this._map.get(pattern);
              if (value) {
                return value;
              }
              value = or();
              this._map.set(pattern, value);
              return value;
            }
            add(pattern, out) {
              this._map.set(pattern, out);
            }
            match(kind) {
              const pattern = patternFor(kind);
              const out = [];
              const exact = this._map.get(pattern);
              const fallback = this._map.get(MatchAny);
              if (exact) {
                out.push(exact);
              }
              if (fallback) {
                out.push(fallback);
              }
              return out;
            }
          }
          function match(callback) {
            return callback(new Matcher()).check();
          }
          class Matcher {
            _whens = new When();

            /**
             * You didn't exhaustively match all possibilities.
             */
            check() {
              return (left, right) => this.matchFor(left.kind, right.kind)(left, right);
            }
            matchFor(left, right) {
              const nesteds = this._whens.match(left);
              debugAssert(isPresentArray(nesteds), `no match defined for (${left}, ${right}) and no AnyMatch defined either`);
              const callback = new WhenList(nesteds).first(right);
              debugAssert(callback !== null, `no match defined for (${left}, ${right}) and no AnyMatch defined either`);
              return callback;
            }

            // This big block is the bulk of the heavy lifting in this file. It facilitates exhaustiveness
            // checking so that matchers can ensure they've actually covered all the cases (and TypeScript
            // will treat it as an exhaustive match).

            when(left, right, callback) {
              this._whens.get(left, () => new When()).add(right, callback);
              return this;
            }
          }
          function patternFor(kind) {
            switch (kind) {
              case OffsetKind.Broken:
              case OffsetKind.InternalsSynthetic:
              case OffsetKind.NonExistent:
                return IsInvisible;
              default:
                return kind;
            }
          }
          class SourceSlice {
            static synthetic(chars) {
              let offsets = SourceSpan.synthetic(chars);
              return new SourceSlice({
                loc: offsets,
                chars: chars
              });
            }
            static load(source, slice) {
              return new SourceSlice({
                loc: SourceSpan.load(source, slice[1]),
                chars: slice[0]
              });
            }
            chars;
            loc;
            constructor(options) {
              this.loc = options.loc;
              this.chars = options.chars;
            }
            getString() {
              return this.chars;
            }
            serialize() {
              return [this.chars, this.loc.serialize()];
            }
          }

          /**
           * All spans have these details in common.
           */

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
          class SourceSpan {
            static get NON_EXISTENT() {
              return new InvisibleSpan(OffsetKind.NonExistent, NON_EXISTENT_LOCATION).wrap();
            }
            static load(source, serialized) {
              if (typeof serialized === 'number') {
                return SourceSpan.forCharPositions(source, serialized, serialized);
              } else if (typeof serialized === 'string') {
                return SourceSpan.synthetic(serialized);
              } else if (Array.isArray(serialized)) {
                return SourceSpan.forCharPositions(source, serialized[0], serialized[1]);
              } else if (serialized === OffsetKind.NonExistent) {
                return SourceSpan.NON_EXISTENT;
              } else if (serialized === OffsetKind.Broken) {
                return SourceSpan.broken(BROKEN_LOCATION);
              }
              assertNever(serialized);
            }
            static forHbsLoc(source, loc) {
              const start = new HbsPosition(source, loc.start);
              const end = new HbsPosition(source, loc.end);
              return new HbsSpan(source, {
                start,
                end
              }, loc).wrap();
            }
            static forCharPositions(source, startPos, endPos) {
              const start = new CharPosition(source, startPos);
              const end = new CharPosition(source, endPos);
              return new CharPositionSpan(source, {
                start,
                end
              }).wrap();
            }
            static synthetic(chars) {
              return new InvisibleSpan(OffsetKind.InternalsSynthetic, NON_EXISTENT_LOCATION, chars).wrap();
            }
            static broken(pos = BROKEN_LOCATION) {
              return new InvisibleSpan(OffsetKind.Broken, pos).wrap();
            }
            isInvisible;
            constructor(data) {
              this.data = data;
              this.isInvisible = data.kind !== OffsetKind.CharPosition && data.kind !== OffsetKind.HbsPosition;
            }
            getStart() {
              return this.data.getStart().wrap();
            }
            getEnd() {
              return this.data.getEnd().wrap();
            }
            get loc() {
              const span = this.data.toHbsSpan();
              return span === null ? BROKEN_LOCATION : span.toHbsLoc();
            }
            get module() {
              return this.data.getModule();
            }

            /**
             * Get the starting `SourcePosition` for this `SourceSpan`, lazily computing it if needed.
             */
            get startPosition() {
              return this.loc.start;
            }

            /**
             * Get the ending `SourcePosition` for this `SourceSpan`, lazily computing it if needed.
             */
            get endPosition() {
              return this.loc.end;
            }

            /**
             * Support converting ASTv1 nodes into a serialized format using JSON.stringify.
             */
            toJSON() {
              return this.loc;
            }

            /**
             * Create a new span with the current span's end and a new beginning.
             */
            withStart(other) {
              return span(other.data, this.data.getEnd());
            }

            /**
             * Create a new span with the current span's beginning and a new ending.
             */
            withEnd(other) {
              return span(this.data.getStart(), other.data);
            }
            asString() {
              return this.data.asString();
            }

            /**
             * Convert this `SourceSpan` into a `SourceSlice`. In debug mode, this method optionally checks
             * that the byte offsets represented by this `SourceSpan` actually correspond to the expected
             * string.
             */
            toSlice(expected) {
              const chars = this.data.asString();
              {
                if (expected !== undefined && chars !== expected) {
                  // eslint-disable-next-line no-console
                  console.warn(`unexpectedly found ${JSON.stringify(chars)} when slicing source, but expected ${JSON.stringify(expected)}`);
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
            get start() {
              return this.loc.start;
            }

            /**
             * For compatibility with SourceLocation in AST plugins
             *
             * @deprecated use withStart instead
             */
            set start(position) {
              this.data.locDidUpdate({
                start: position
              });
            }

            /**
             * For compatibility with SourceLocation in AST plugins
             *
             * @deprecated use endPosition instead
             */
            get end() {
              return this.loc.end;
            }

            /**
             * For compatibility with SourceLocation in AST plugins
             *
             * @deprecated use withEnd instead
             */
            set end(position) {
              this.data.locDidUpdate({
                end: position
              });
            }

            /**
             * For compatibility with SourceLocation in AST plugins
             *
             * @deprecated use module instead
             */
            get source() {
              return this.module;
            }
            collapse(where) {
              switch (where) {
                case 'start':
                  return this.getStart().collapsed();
                case 'end':
                  return this.getEnd().collapsed();
              }
            }
            extend(other) {
              return span(this.data.getStart(), other.data.getEnd());
            }
            serialize() {
              return this.data.serialize();
            }
            slice({
              skipStart = 0,
              skipEnd = 0
            }) {
              return span(this.getStart().move(skipStart).data, this.getEnd().move(-skipEnd).data);
            }
            sliceStartChars({
              skipStart = 0,
              chars
            }) {
              return span(this.getStart().move(skipStart).data, this.getStart().move(skipStart + chars).data);
            }
            sliceEndChars({
              skipEnd = 0,
              chars
            }) {
              return span(this.getEnd().move(skipEnd - chars).data, this.getStart().move(-skipEnd).data);
            }
          }
          class CharPositionSpan {
            kind = OffsetKind.CharPosition;
            _locPosSpan = null;
            constructor(source, charPositions) {
              this.source = source;
              this.charPositions = charPositions;
            }
            wrap() {
              return new SourceSpan(this);
            }
            asString() {
              return this.source.slice(this.charPositions.start.charPos, this.charPositions.end.charPos);
            }
            getModule() {
              return this.source.module;
            }
            getStart() {
              return this.charPositions.start;
            }
            getEnd() {
              return this.charPositions.end;
            }
            locDidUpdate() {}
            toHbsSpan() {
              let locPosSpan = this._locPosSpan;
              if (locPosSpan === null) {
                const start = this.charPositions.start.toHbsPos();
                const end = this.charPositions.end.toHbsPos();
                if (start === null || end === null) {
                  locPosSpan = this._locPosSpan = BROKEN;
                } else {
                  locPosSpan = this._locPosSpan = new HbsSpan(this.source, {
                    start,
                    end
                  });
                }
              }
              return locPosSpan === BROKEN ? null : locPosSpan;
            }
            serialize() {
              const {
                start: {
                  charPos: start
                },
                end: {
                  charPos: end
                }
              } = this.charPositions;
              if (start === end) {
                return start;
              } else {
                return [start, end];
              }
            }
            toCharPosSpan() {
              return this;
            }
          }
          class HbsSpan {
            kind = OffsetKind.HbsPosition;
            _charPosSpan = null;

            // the source location from Handlebars + AST Plugins -- could be wrong
            _providedHbsLoc;
            constructor(source, hbsPositions, providedHbsLoc = null) {
              this.source = source;
              this.hbsPositions = hbsPositions;
              this._providedHbsLoc = providedHbsLoc;
            }
            serialize() {
              const charPos = this.toCharPosSpan();
              return charPos === null ? OffsetKind.Broken : charPos.wrap().serialize();
            }
            wrap() {
              return new SourceSpan(this);
            }
            updateProvided(pos, edge) {
              if (this._providedHbsLoc) {
                this._providedHbsLoc[edge] = pos;
              }

              // invalidate computed character offsets
              this._charPosSpan = null;
              this._providedHbsLoc = {
                start: pos,
                end: pos
              };
            }
            locDidUpdate({
              start,
              end
            }) {
              if (start !== undefined) {
                this.updateProvided(start, 'start');
                this.hbsPositions.start = new HbsPosition(this.source, start, null);
              }
              if (end !== undefined) {
                this.updateProvided(end, 'end');
                this.hbsPositions.end = new HbsPosition(this.source, end, null);
              }
            }
            asString() {
              const span = this.toCharPosSpan();
              return span === null ? '' : span.asString();
            }
            getModule() {
              return this.source.module;
            }
            getStart() {
              return this.hbsPositions.start;
            }
            getEnd() {
              return this.hbsPositions.end;
            }
            toHbsLoc() {
              return {
                start: this.hbsPositions.start.hbsPos,
                end: this.hbsPositions.end.hbsPos
              };
            }
            toHbsSpan() {
              return this;
            }
            toCharPosSpan() {
              let charPosSpan = this._charPosSpan;
              if (charPosSpan === null) {
                const start = this.hbsPositions.start.toCharPos();
                const end = this.hbsPositions.end.toCharPos();
                if (start && end) {
                  charPosSpan = this._charPosSpan = new CharPositionSpan(this.source, {
                    start,
                    end
                  });
                } else {
                  charPosSpan = this._charPosSpan = BROKEN;
                  return null;
                }
              }
              return charPosSpan === BROKEN ? null : charPosSpan;
            }
          }
          class InvisibleSpan {
            constructor(kind,
            // whatever was provided, possibly broken
            loc,
            // if the span represents a synthetic string
            string = null) {
              this.kind = kind;
              this.loc = loc;
              this.string = string;
            }
            serialize() {
              switch (this.kind) {
                case OffsetKind.Broken:
                case OffsetKind.NonExistent:
                  return this.kind;
                case OffsetKind.InternalsSynthetic:
                  return this.string || '';
              }
            }
            wrap() {
              return new SourceSpan(this);
            }
            asString() {
              return this.string || '';
            }
            locDidUpdate({
              start,
              end
            }) {
              if (start !== undefined) {
                this.loc.start = start;
              }
              if (end !== undefined) {
                this.loc.end = end;
              }
            }
            getModule() {
              // TODO: Make this reflect the actual module this span originated from
              return 'an unknown module';
            }
            getStart() {
              return new InvisiblePosition(this.kind, this.loc.start);
            }
            getEnd() {
              return new InvisiblePosition(this.kind, this.loc.end);
            }
            toCharPosSpan() {
              return this;
            }
            toHbsSpan() {
              return null;
            }
            toHbsLoc() {
              return BROKEN_LOCATION;
            }
          }
          const span = match(m => m.when(OffsetKind.HbsPosition, OffsetKind.HbsPosition, (left, right) => new HbsSpan(left.source, {
            start: left,
            end: right
          }).wrap()).when(OffsetKind.CharPosition, OffsetKind.CharPosition, (left, right) => new CharPositionSpan(left.source, {
            start: left,
            end: right
          }).wrap()).when(OffsetKind.CharPosition, OffsetKind.HbsPosition, (left, right) => {
            const rightCharPos = right.toCharPos();
            if (rightCharPos === null) {
              return new InvisibleSpan(OffsetKind.Broken, BROKEN_LOCATION).wrap();
            } else {
              return span(left, rightCharPos);
            }
          }).when(OffsetKind.HbsPosition, OffsetKind.CharPosition, (left, right) => {
            const leftCharPos = left.toCharPos();
            if (leftCharPos === null) {
              return new InvisibleSpan(OffsetKind.Broken, BROKEN_LOCATION).wrap();
            } else {
              return span(leftCharPos, right);
            }
          }).when(IsInvisible, MatchAny, left => new InvisibleSpan(left.kind, BROKEN_LOCATION).wrap()).when(MatchAny, IsInvisible, (_, right) => new InvisibleSpan(right.kind, BROKEN_LOCATION).wrap()));

          /**
           * All positions have these details in common. Most notably, all three kinds of positions can
           * must be able to attempt to convert themselves into {@see CharPosition}.
           */

          /**
           * Used to indicate that an attempt to convert a `SourcePosition` to a character offset failed. It
           * is separate from `null` so that `null` can be used to indicate that the computation wasn't yet
           * attempted (and therefore to cache the failure)
           */
          const BROKEN = 'BROKEN';
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
          class SourceOffset {
            /**
             * Create a `SourceOffset` from a Handlebars `SourcePosition`. It's stored as-is, and converted
             * into a character offset on demand, which avoids unnecessarily computing the offset of every
             * `SourceLocation`, but also means that broken `SourcePosition`s are not always detected.
             */
            static forHbsPos(source, pos) {
              return new HbsPosition(source, pos, null).wrap();
            }

            /**
             * Create a `SourceOffset` that corresponds to a broken `SourcePosition`. This means that the
             * calling code determined (or knows) that the `SourceLocation` doesn't correspond correctly to
             * any part of the source.
             */
            static broken(pos = UNKNOWN_POSITION) {
              return new InvisiblePosition(OffsetKind.Broken, pos).wrap();
            }
            constructor(data) {
              this.data = data;
            }

            /**
             * Get the character offset for this `SourceOffset`, if possible.
             */
            get offset() {
              const charPos = this.data.toCharPos();
              return charPos === null ? null : charPos.offset;
            }

            /**
             * Compare this offset with another one.
             *
             * If both offsets are `HbsPosition`s, they're equivalent as long as their lines and columns are
             * the same. This avoids computing offsets unnecessarily.
             *
             * Otherwise, two `SourceOffset`s are equivalent if their successfully computed character offsets
             * are the same.
             */
            eql(right) {
              return eql(this.data, right.data);
            }

            /**
             * Create a span that starts from this source offset and ends with another source offset. Avoid
             * computing character offsets if both `SourceOffset`s are still lazy.
             */
            until(other) {
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
            move(by) {
              const charPos = this.data.toCharPos();
              if (charPos === null) {
                return SourceOffset.broken();
              } else {
                const result = charPos.offset + by;
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
            collapsed() {
              return span(this.data, this.data);
            }

            /**
             * Convert this `SourceOffset` into a Handlebars {@see SourcePosition} for compatibility with
             * existing plugins.
             */
            toJSON() {
              return this.data.toJSON();
            }
          }
          class CharPosition {
            kind = OffsetKind.CharPosition;

            /** Computed from char offset */
            _locPos = null;
            constructor(source, charPos) {
              this.source = source;
              this.charPos = charPos;
            }

            /**
             * This is already a `CharPosition`.
             *
             * {@see HbsPosition} for the alternative.
             */
            toCharPos() {
              return this;
            }

            /**
             * Produce a Handlebars {@see SourcePosition} for this `CharPosition`. If this `CharPosition` was
             * computed using {@see SourceOffset#move}, this will compute the `SourcePosition` for the offset.
             */
            toJSON() {
              const hbs = this.toHbsPos();
              return hbs === null ? UNKNOWN_POSITION : hbs.toJSON();
            }
            wrap() {
              return new SourceOffset(this);
            }

            /**
             * A `CharPosition` always has an offset it can produce without any additional computation.
             */
            get offset() {
              return this.charPos;
            }

            /**
             * Convert the current character offset to an `HbsPosition`, if it was not already computed. Once
             * a `CharPosition` has computed its `HbsPosition`, it will not need to do compute it again, and
             * the same `CharPosition` is retained when used as one of the ends of a `SourceSpan`, so
             * computing the `HbsPosition` should be a one-time operation.
             */
            toHbsPos() {
              let locPos = this._locPos;
              if (locPos === null) {
                const hbsPos = this.source.hbsPosFor(this.charPos);
                if (hbsPos === null) {
                  this._locPos = locPos = BROKEN;
                } else {
                  this._locPos = locPos = new HbsPosition(this.source, hbsPos, this.charPos);
                }
              }
              return locPos === BROKEN ? null : locPos;
            }
          }
          class HbsPosition {
            kind = OffsetKind.HbsPosition;
            _charPos;
            constructor(source, hbsPos, charPos = null) {
              this.source = source;
              this.hbsPos = hbsPos;
              this._charPos = charPos === null ? null : new CharPosition(source, charPos);
            }

            /**
             * Lazily compute the character offset from the {@see SourcePosition}. Once an `HbsPosition` has
             * computed its `CharPosition`, it will not need to do compute it again, and the same
             * `HbsPosition` is retained when used as one of the ends of a `SourceSpan`, so computing the
             * `CharPosition` should be a one-time operation.
             */
            toCharPos() {
              let charPos = this._charPos;
              if (charPos === null) {
                const charPosNumber = this.source.charPosFor(this.hbsPos);
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
             */
            toJSON() {
              return this.hbsPos;
            }
            wrap() {
              return new SourceOffset(this);
            }

            /**
             * This is already an `HbsPosition`.
             *
             * {@see CharPosition} for the alternative.
             */
            toHbsPos() {
              return this;
            }
          }
          class InvisiblePosition {
            constructor(kind,
            // whatever was provided, possibly broken
            pos) {
              this.kind = kind;
              this.pos = pos;
            }

            /**
             * A broken position cannot be turned into a {@see CharacterPosition}.
             */
            toCharPos() {
              return null;
            }

            /**
             * The serialization of an `InvisiblePosition is whatever Handlebars {@see SourcePosition} was
             * originally identified as broken, non-existent or synthetic.
             *
             * If an `InvisiblePosition` never had an source offset at all, this method returns
             * {@see UNKNOWN_POSITION} for compatibility.
             */
            toJSON() {
              return this.pos;
            }
            wrap() {
              return new SourceOffset(this);
            }
            get offset() {
              return null;
            }
          }

          /**
           * Compare two {@see AnyPosition} and determine whether they are equal.
           *
           * @see {SourceOffset#eql}
           */
          const eql = match(m => m.when(OffsetKind.HbsPosition, OffsetKind.HbsPosition, ({
            hbsPos: left
          }, {
            hbsPos: right
          }) => left.column === right.column && left.line === right.line).when(OffsetKind.CharPosition, OffsetKind.CharPosition, ({
            charPos: left
          }, {
            charPos: right
          }) => left === right).when(OffsetKind.CharPosition, OffsetKind.HbsPosition, ({
            offset: left
          }, right) => left === right.toCharPos()?.offset).when(OffsetKind.HbsPosition, OffsetKind.CharPosition, (left, {
            offset: right
          }) => left.toCharPos()?.offset === right).when(MatchAny, MatchAny, () => false));
          class Source {
            static from(source, options = {}) {
              return new Source(source, options.meta?.moduleName);
            }
            constructor(source, module = 'an unknown module') {
              this.source = source;
              this.module = module;
            }

            /**
             * Validate that the character offset represents a position in the source string.
             */
            check(offset) {
              return offset >= 0 && offset <= this.source.length;
            }
            slice(start, end) {
              return this.source.slice(start, end);
            }
            offsetFor(line, column) {
              return SourceOffset.forHbsPos(this, {
                line,
                column
              });
            }
            spanFor({
              start,
              end
            }) {
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
            }
            hbsPosFor(offset) {
              let seenLines = 0;
              let seenChars = 0;
              if (offset > this.source.length) {
                return null;
              }

              // eslint-disable-next-line no-constant-condition
              while (true) {
                let nextLine = this.source.indexOf('\n', seenChars);
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
            }
            charPosFor(position) {
              let {
                line,
                column
              } = position;
              let sourceString = this.source;
              let sourceLength = sourceString.length;
              let seenLines = 0;
              let seenChars = 0;
              while (seenChars < sourceLength) {
                let nextLine = this.source.indexOf('\n', seenChars);
                if (nextLine === -1) nextLine = this.source.length;
                if (seenLines === line - 1) {
                  if (seenChars + column > nextLine) return nextLine;
                  {
                    let roundTrip = this.hbsPosFor(seenChars + column);
                    debugAssert(roundTrip !== null, `the returned offset failed to round-trip`);
                    debugAssert(roundTrip.line === line, `the round-tripped line didn't match the original line`);
                    debugAssert(roundTrip.column === column, `the round-tripped column didn't match the original column`);
                  }
                  return seenChars + column;
                } else if (nextLine === -1) {
                  return 0;
                } else {
                  seenLines += 1;
                  seenChars = nextLine + 1;
                }
              }
              return sourceLength;
            }
          }
          class SpanList {
            static range(span, fallback = SourceSpan.NON_EXISTENT) {
              return new SpanList(span.map(loc)).getRangeOffset(fallback);
            }
            _span;
            constructor(span = []) {
              this._span = span;
            }
            add(offset) {
              this._span.push(offset);
            }
            getRangeOffset(fallback) {
              if (isPresentArray(this._span)) {
                let first = getFirst(this._span);
                let last = getLast(this._span);
                return first.extend(last);
              } else {
                return fallback;
              }
            }
          }
          function loc(span) {
            if (Array.isArray(span)) {
              let first = getFirst(span);
              let last = getLast(span);
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
          var api$2 = /*#__PURE__*/Object.freeze({
            __proto__: null,
            NON_EXISTENT_LOCATION: NON_EXISTENT_LOCATION,
            SYNTHETIC_LOCATION: SYNTHETIC_LOCATION,
            Source: Source,
            SourceOffset: SourceOffset,
            SourceSlice: SourceSlice,
            SourceSpan: SourceSpan,
            SpanList: SpanList,
            UNKNOWN_POSITION: UNKNOWN_POSITION,
            hasSpan: hasSpan,
            loc: loc,
            maybeLoc: maybeLoc
          });
          function generateSyntaxError(message, location) {
            let {
              module,
              loc
            } = location;
            let {
              line,
              column
            } = loc.start;
            let code = location.asString();
            let quotedCode = code ? `\n\n|\n|  ${code.split('\n').join('\n|  ')}\n|\n\n` : '';
            let error = new Error(`${message}: ${quotedCode}(error occurred in '${module}' @ line ${line} : column ${column})`);
            error.name = 'SyntaxError';
            error.location = location;
            error.code = code;
            return error;
          }

          // ensure stays in sync with typing
          // ParentNode and ChildKey types are derived from VisitorKeysMap
          const visitorKeys = {
            Template: ['body'],
            Block: ['body'],
            MustacheStatement: ['path', 'params', 'hash'],
            BlockStatement: ['path', 'params', 'hash', 'program', 'inverse'],
            ElementModifierStatement: ['path', 'params', 'hash'],
            CommentStatement: [],
            MustacheCommentStatement: [],
            ElementNode: ['attributes', 'modifiers', 'children', 'comments'],
            AttrNode: ['value'],
            TextNode: [],
            ConcatStatement: ['parts'],
            SubExpression: ['path', 'params', 'hash'],
            PathExpression: [],
            StringLiteral: [],
            BooleanLiteral: [],
            NumberLiteral: [],
            NullLiteral: [],
            UndefinedLiteral: [],
            Hash: ['pairs'],
            HashPair: ['value']
          };
          const TraversalError = function () {
            TraversalError.prototype = Object.create(Error.prototype);
            TraversalError.prototype.constructor = TraversalError;
            function TraversalError(message, node, parent, key) {
              let error = Error.call(this, message);
              this.key = key;
              this.message = message;
              this.node = node;
              this.parent = parent;
              if (error.stack) {
                this.stack = error.stack;
              }
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
          class WalkerPath {
            node;
            parent;
            parentKey;
            constructor(node, parent = null, parentKey = null) {
              this.node = node;
              this.parent = parent;
              this.parentKey = parentKey;
            }
            get parentNode() {
              return this.parent ? this.parent.node : null;
            }
            parents() {
              return {
                [Symbol.iterator]: () => {
                  return new PathParentsIterator(this);
                }
              };
            }
          }
          class PathParentsIterator {
            path;
            constructor(path) {
              this.path = path;
            }
            next() {
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
            }
          }
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
            let keyVisitor = typeof handler !== 'function' ? handler.keys : undefined;
            if (keyVisitor === undefined) return;
            let keyHandler = keyVisitor[key];
            if (keyHandler !== undefined) {
              return keyHandler;
            }
            return keyVisitor.All;
          }
          function getNodeHandler(visitor, nodeType) {
            if (visitor.Program) {
              if (nodeType === 'Template' && !visitor.Template || nodeType === 'Block' && !visitor.Block) {
                deprecate$1(`The 'Program' visitor node is deprecated. Use 'Template' or 'Block' instead (node was '${nodeType}') `);
                return visitor.Program;
              }
            }
            let handler = visitor[nodeType];
            if (handler !== undefined) {
              return handler;
            }
            return visitor.All;
          }
          function visitNode(visitor, path) {
            let {
              node,
              parent,
              parentKey
            } = path;
            let handler = getNodeHandler(visitor, node.type);
            let enter;
            let exit;
            if (handler !== undefined) {
              enter = getEnterFunction(handler);
              exit = getExitFunction(handler);
            }
            let result;
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
                let path = new WalkerPath(result, parent, parentKey);
                return visitNode(visitor, path) || result;
              }
            }
            if (result === undefined) {
              let keys = visitorKeys[node.type];
              for (let i = 0; i < keys.length; i++) {
                let key = keys[i];
                // we know if it has child keys we can widen to a ParentNode
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
            let {
              node
            } = path;
            let value = get(node, key);
            if (!value) {
              return;
            }
            let keyEnter;
            let keyExit;
            if (handler !== undefined) {
              let keyHandler = getKeyHandler(handler, key);
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
              let keyPath = new WalkerPath(value, path, key);
              let result = visitNode(visitor, keyPath);
              if (result !== undefined) {
                // TODO: dynamically check the results by having a table of
                // expected node types in value space, not just type space

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
            for (let i = 0; i < array.length; i++) {
              let node = unwrap(array[i]);
              let path = new WalkerPath(node, parent, parentKey);
              let result = visitNode(visitor, path);
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
              array.splice(index, 1, ...result);
              return result.length;
            } else {
              array.splice(index, 1, result);
              return 1;
            }
          }
          function traverse(node, visitor) {
            let path = new WalkerPath(node);
            visitNode(visitor, path);
          }
          class Walker {
            stack = [];
            constructor(order) {
              this.order = order;
            }
            visit(node, visitor) {
              if (!node) {
                return;
              }
              this.stack.push(node);
              if (this.order === 'post') {
                this.children(node, visitor);
                visitor(node, this);
              } else {
                visitor(node, this);
                this.children(node, visitor);
              }
              this.stack.pop();
            }
            children(node, callback) {
              switch (node.type) {
                case 'Block':
                case 'Template':
                  walkBody(this, node.body, callback);
                  return;
                case 'ElementNode':
                  walkBody(this, node.children, callback);
                  return;
                case 'BlockStatement':
                  this.visit(node.program, callback);
                  this.visit(node.inverse || null, callback);
                  return;
                default:
                  return;
              }
            }
          }
          function walkBody(walker, body, callback) {
            for (const child of body) {
              walker.visit(child, callback);
            }
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
            return tag[0] === tag[0]?.toUpperCase() && tag[0] !== tag[0]?.toLowerCase();
          }
          function isLowerCase(tag) {
            return tag[0] === tag[0]?.toLowerCase() && tag[0] !== tag[0]?.toUpperCase();
          }
          let _SOURCE;
          function SOURCE() {
            if (!_SOURCE) {
              _SOURCE = new Source('', '(synthetic)');
            }
            return _SOURCE;
          }

          // const SOURCE = new Source('', '(tests)');

          // Statements

          function buildMustache(path, params = [], hash = buildHash$1([]), trusting = false, loc, strip) {
            return b.mustache({
              path: buildPath(path),
              params,
              hash,
              trusting,
              strip,
              loc: buildLoc(loc || null)
            });
          }
          function buildBlock$1(path, params, hash, _defaultBlock, _elseBlock = null, loc, openStrip, inverseStrip, closeStrip) {
            let defaultBlock;
            let elseBlock = null;
            if (_defaultBlock.type === 'Template') {
              deprecate$1(`b.program is deprecated. Use b.blockItself instead.`);
              defaultBlock = b.blockItself({
                params: buildBlockParams(_defaultBlock.blockParams),
                body: _defaultBlock.body,
                loc: _defaultBlock.loc
              });
            } else {
              defaultBlock = _defaultBlock;
            }
            if (_elseBlock?.type === 'Template') {
              deprecate$1(`b.program is deprecated. Use b.blockItself instead.`);
              debugAssert(_elseBlock.blockParams.length === 0, '{{else}} block cannot have block params');
              elseBlock = b.blockItself({
                params: [],
                body: _elseBlock.body,
                loc: _elseBlock.loc
              });
            } else {
              elseBlock = _elseBlock;
            }
            return b.block({
              path: buildPath(path),
              params: params || [],
              hash: hash || buildHash$1([]),
              defaultBlock,
              elseBlock,
              loc: buildLoc(loc || null),
              openStrip,
              inverseStrip,
              closeStrip
            });
          }
          function buildElementModifier(path, params, hash, loc) {
            return b.elementModifier({
              path: buildPath(path),
              params: params || [],
              hash: hash || buildHash$1([]),
              loc: buildLoc(loc || null)
            });
          }
          function buildComment(value, loc) {
            return b.comment({
              value: value,
              loc: buildLoc(loc || null)
            });
          }
          function buildMustacheComment(value, loc) {
            return b.mustacheComment({
              value: value,
              loc: buildLoc(loc || null)
            });
          }
          function buildConcat$1(parts, loc) {
            if (!isPresentArray(parts)) {
              throw new Error(`b.concat requires at least one part`);
            }
            return b.concat({
              parts,
              loc: buildLoc(loc || null)
            });
          }

          // Nodes

          function buildElement$1(tag, options = {}) {
            let {
              attrs,
              blockParams,
              modifiers,
              comments,
              children,
              openTag,
              closeTag: _closeTag,
              loc
            } = options;

            // this is used for backwards compat, prior to `selfClosing` being part of the ElementNode AST
            let path;
            let selfClosing;
            if (typeof tag === 'string') {
              if (tag.endsWith('/')) {
                path = buildPath(tag.slice(0, -1));
                selfClosing = true;
              } else {
                path = buildPath(tag);
              }
            } else if ('type' in tag) {
              debugAssert(tag.type === 'PathExpression', `Invalid tag type ${tag.type}`);
              path = tag;
            } else if ('path' in tag) {
              debugAssert(tag.path.type === 'PathExpression', `Invalid tag type ${tag.path.type}`);
              path = tag.path;
              selfClosing = tag.selfClosing;
            } else {
              path = buildPath(tag.name);
              selfClosing = tag.selfClosing;
            }
            if (selfClosing) {
              debugAssert(_closeTag === null || _closeTag === undefined, 'Cannot build a self-closing tag with a closeTag source location');
            }
            let params = blockParams?.map(param => {
              if (typeof param === 'string') {
                return buildVar$1(param);
              } else {
                return param;
              }
            });
            let closeTag = null;
            if (_closeTag) {
              closeTag = buildLoc(_closeTag || null);
            } else if (_closeTag === undefined) {
              closeTag = selfClosing || isVoidTag(path.original) ? null : buildLoc(null);
            }
            return b.element({
              path,
              selfClosing: selfClosing || false,
              attributes: attrs || [],
              params: params || [],
              modifiers: modifiers || [],
              comments: comments || [],
              children: children || [],
              openTag: buildLoc(openTag || null),
              closeTag,
              loc: buildLoc(loc || null)
            });
          }
          function buildAttr(name, value, loc) {
            return b.attr({
              name: name,
              value: value,
              loc: buildLoc(loc || null)
            });
          }
          function buildText(chars = '', loc) {
            return b.text({
              chars,
              loc: buildLoc(loc || null)
            });
          }

          // Expressions

          function buildSexpr(path, params = [], hash = buildHash$1([]), loc) {
            return b.sexpr({
              path: buildPath(path),
              params,
              hash,
              loc: buildLoc(loc || null)
            });
          }
          function buildHead(original, loc) {
            let [head, ...tail] = asPresentArray(original.split('.'));
            let headNode = b.head({
              original: head,
              loc: buildLoc(loc || null)
            });
            return b.path({
              head: headNode,
              tail,
              loc: buildLoc(loc || null)
            });
          }
          function buildThis(loc) {
            return b.this({
              loc: buildLoc(loc || null)
            });
          }
          function buildAtName(name, loc) {
            return b.atName({
              name,
              loc: buildLoc(loc || null)
            });
          }
          function buildVar$1(name, loc) {
            return b.var({
              name,
              loc: buildLoc(loc || null)
            });
          }
          function buildHeadFromString(original, loc) {
            return b.head({
              original,
              loc: buildLoc(loc || null)
            });
          }
          function buildCleanPath(head, tail = [], loc) {
            return b.path({
              head,
              tail,
              loc: buildLoc(loc || null)
            });
          }
          function buildPath(path, loc) {
            let span = buildLoc(loc || null);
            if (typeof path !== 'string') {
              if ('type' in path) {
                return path;
              } else {
                debugAssert(path.head.indexOf('.') === -1, `builder.path({ head, tail }) should not be called with a head with dots in it`);
                let {
                  head,
                  tail
                } = path;
                return b.path({
                  head: b.head({
                    original: head,
                    loc: span.sliceStartChars({
                      chars: head.length
                    })
                  }),
                  tail,
                  loc: buildLoc(loc || null)
                });
              }
            }
            let {
              head,
              tail
            } = buildHead(path, span);
            return b.path({
              head,
              tail,
              loc: span
            });
          }
          function buildLiteral(type, value, loc) {
            return b.literal({
              type,
              value,
              loc: buildLoc(loc || null)
            });
          }

          // Miscellaneous

          function buildHash$1(pairs = [], loc) {
            return b.hash({
              pairs,
              loc: buildLoc(loc || null)
            });
          }
          function buildPair(key, value, loc) {
            return b.pair({
              key,
              value,
              loc: buildLoc(loc || null)
            });
          }
          function buildProgram(body, blockParams, loc) {
            deprecate$1(`b.program is deprecated. Use b.template or b.blockItself instead.`);
            if (blockParams && blockParams.length) {
              return buildBlockItself(body, blockParams, false, loc);
            } else {
              return buildTemplate(body, [], loc);
            }
          }
          function buildBlockParams(params) {
            return params.map(p => typeof p === 'string' ? b.var({
              name: p,
              loc: SourceSpan.synthetic(p)
            }) : p);
          }
          function buildBlockItself(body = [], params = [], chained = false, loc) {
            return b.blockItself({
              body,
              params: buildBlockParams(params),
              chained,
              loc: buildLoc(loc || null)
            });
          }
          function buildTemplate(body = [], blockParams = [], loc) {
            return b.template({
              body,
              blockParams,
              loc: buildLoc(loc || null)
            });
          }
          function buildPosition(line, column) {
            return b.pos({
              line,
              column
            });
          }
          function buildLoc(...args) {
            if (args.length === 1) {
              let loc = args[0];
              if (loc && typeof loc === 'object') {
                return SourceSpan.forHbsLoc(SOURCE(), loc);
              } else {
                return SourceSpan.forHbsLoc(SOURCE(), SYNTHETIC_LOCATION);
              }
            } else {
              let [startLine, startColumn, endLine, endColumn, _source] = args;
              let source = _source ? new Source('', _source) : SOURCE();
              return SourceSpan.forHbsLoc(source, {
                start: {
                  line: startLine,
                  column: startColumn
                },
                end: {
                  line: endLine || startLine,
                  column: endColumn || startColumn
                }
              });
            }
          }
          var publicBuilder = {
            mustache: buildMustache,
            block: buildBlock$1,
            comment: buildComment,
            mustacheComment: buildMustacheComment,
            element: buildElement$1,
            elementModifier: buildElementModifier,
            attr: buildAttr,
            text: buildText,
            sexpr: buildSexpr,
            concat: buildConcat$1,
            hash: buildHash$1,
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
            var: buildVar$1,
            this: buildThis,
            string: literal('StringLiteral'),
            boolean: literal('BooleanLiteral'),
            number: literal('NumberLiteral'),
            undefined() {
              return buildLiteral('UndefinedLiteral', undefined);
            },
            null() {
              return buildLiteral('NullLiteral', null);
            }
          };
          function literal(type) {
            return function (value, loc) {
              return buildLiteral(type, value, loc);
            };
          }
          function buildLegacyMustache({
            path,
            params,
            hash,
            trusting,
            strip,
            loc
          }) {
            const node = {
              type: 'MustacheStatement',
              path,
              params,
              hash,
              trusting,
              strip,
              loc
            };
            Object.defineProperty(node, 'escaped', {
              enumerable: false,
              get() {
                deprecate$1(`The escaped property on mustache nodes is deprecated, use trusting instead`);
                return !this.trusting;
              },
              set(value) {
                deprecate$1(`The escaped property on mustache nodes is deprecated, use trusting instead`);
                this.trusting = !value;
              }
            });
            return node;
          }
          function buildLegacyPath({
            head,
            tail,
            loc
          }) {
            const node = {
              type: 'PathExpression',
              head,
              tail,
              get original() {
                return [this.head.original, ...this.tail].join('.');
              },
              set original(value) {
                let [head, ...tail] = asPresentArray(value.split('.'));
                this.head = publicBuilder.head(head, this.head.loc);
                this.tail = tail;
              },
              loc
            };
            Object.defineProperty(node, 'parts', {
              enumerable: false,
              get() {
                deprecate$1(`The parts property on path nodes is deprecated, use head and tail instead`);
                let parts = asPresentArray(this.original.split('.'));
                if (parts[0] === 'this') {
                  // parts does not include `this`
                  parts.shift();
                } else if (parts[0].startsWith('@')) {
                  // parts does not include leading `@`
                  parts[0] = parts[0].slice(1);
                }
                return Object.freeze(parts);
              },
              set(values) {
                deprecate$1(`The parts property on mustache nodes is deprecated, use head and tail instead`);
                let parts = [...values];

                // you are not supposed to already have `this` or `@` in the parts, but since this is
                // deprecated anyway, we will infer what you meant and allow it
                if (parts[0] !== 'this' && !parts[0]?.startsWith('@')) {
                  if (this.head.type === 'ThisHead') {
                    parts.unshift('this');
                  } else if (this.head.type === 'AtHead') {
                    parts[0] = `@${parts[0]}`;
                  }
                }
                this.original = parts.join('.');
              }
            });
            Object.defineProperty(node, 'this', {
              enumerable: false,
              get() {
                deprecate$1(`The this property on path nodes is deprecated, use head.type instead`);
                return this.head.type === 'ThisHead';
              }
            });
            Object.defineProperty(node, 'data', {
              enumerable: false,
              get() {
                deprecate$1(`The data property on path nodes is deprecated, use head.type instead`);
                return this.head.type === 'AtHead';
              }
            });
            return node;
          }
          function buildLegacyLiteral({
            type,
            value,
            loc
          }) {
            const node = {
              type,
              value,
              loc
            };
            Object.defineProperty(node, 'original', {
              enumerable: false,
              get() {
                deprecate$1(`The original property on literal nodes is deprecated, use value instead`);
                return this.value;
              },
              set(value) {
                deprecate$1(`The original property on literal nodes is deprecated, use value instead`);
                this.value = value;
              }
            });
            return node;
          }
          const DEFAULT_STRIP = {
            close: false,
            open: false
          };

          /**
           * The Parser Builder differentiates from the public builder API by:
           *
           * 1. Offering fewer different ways to instantiate nodes
           * 2. Mandating source locations
           */
          class Builders {
            pos({
              line,
              column
            }) {
              return {
                line,
                column
              };
            }
            blockItself({
              body,
              params,
              chained = false,
              loc
            }) {
              return {
                type: 'Block',
                body,
                params,
                get blockParams() {
                  return this.params.map(p => p.name);
                },
                set blockParams(params) {
                  this.params = params.map(name => {
                    return b.var({
                      name,
                      loc: SourceSpan.synthetic(name)
                    });
                  });
                },
                chained,
                loc
              };
            }
            template({
              body,
              blockParams,
              loc
            }) {
              return {
                type: 'Template',
                body,
                blockParams,
                loc
              };
            }
            mustache({
              path,
              params,
              hash,
              trusting,
              loc,
              strip = DEFAULT_STRIP
            }) {
              return buildLegacyMustache({
                path,
                params,
                hash,
                trusting,
                strip,
                loc
              });
            }
            block({
              path,
              params,
              hash,
              defaultBlock,
              elseBlock = null,
              loc,
              openStrip = DEFAULT_STRIP,
              inverseStrip = DEFAULT_STRIP,
              closeStrip = DEFAULT_STRIP
            }) {
              return {
                type: 'BlockStatement',
                path: path,
                params,
                hash,
                program: defaultBlock,
                inverse: elseBlock,
                loc,
                openStrip,
                inverseStrip,
                closeStrip
              };
            }
            comment({
              value,
              loc
            }) {
              return {
                type: 'CommentStatement',
                value,
                loc
              };
            }
            mustacheComment({
              value,
              loc
            }) {
              return {
                type: 'MustacheCommentStatement',
                value,
                loc
              };
            }
            concat({
              parts,
              loc
            }) {
              return {
                type: 'ConcatStatement',
                parts,
                loc
              };
            }
            element({
              path,
              selfClosing,
              attributes,
              modifiers,
              params,
              comments,
              children,
              openTag,
              closeTag,
              loc
            }) {
              let _selfClosing = selfClosing;
              return {
                type: 'ElementNode',
                path,
                attributes,
                modifiers,
                params,
                comments,
                children,
                openTag,
                closeTag,
                loc,
                get tag() {
                  return this.path.original;
                },
                set tag(name) {
                  this.path.original = name;
                },
                get blockParams() {
                  return this.params.map(p => p.name);
                },
                set blockParams(params) {
                  this.params = params.map(name => {
                    return b.var({
                      name,
                      loc: SourceSpan.synthetic(name)
                    });
                  });
                },
                get selfClosing() {
                  return _selfClosing;
                },
                set selfClosing(selfClosing) {
                  _selfClosing = selfClosing;
                  if (selfClosing) {
                    this.closeTag = null;
                  } else {
                    this.closeTag = SourceSpan.synthetic(`</${this.tag}>`);
                  }
                }
              };
            }
            elementModifier({
              path,
              params,
              hash,
              loc
            }) {
              return {
                type: 'ElementModifierStatement',
                path,
                params,
                hash,
                loc
              };
            }
            attr({
              name,
              value,
              loc
            }) {
              return {
                type: 'AttrNode',
                name: name,
                value: value,
                loc
              };
            }
            text({
              chars,
              loc
            }) {
              return {
                type: 'TextNode',
                chars,
                loc
              };
            }
            sexpr({
              path,
              params,
              hash,
              loc
            }) {
              return {
                type: 'SubExpression',
                path,
                params,
                hash,
                loc
              };
            }
            path({
              head,
              tail,
              loc
            }) {
              return buildLegacyPath({
                head,
                tail,
                loc
              });
            }
            head({
              original,
              loc
            }) {
              if (original === 'this') {
                return this.this({
                  loc
                });
              }
              if (original[0] === '@') {
                return this.atName({
                  name: original,
                  loc
                });
              } else {
                return this.var({
                  name: original,
                  loc
                });
              }
            }
            this({
              loc
            }) {
              return {
                type: 'ThisHead',
                get original() {
                  return 'this';
                },
                loc
              };
            }
            atName({
              name,
              loc
            }) {
              let _name = '';
              const node = {
                type: 'AtHead',
                get name() {
                  return _name;
                },
                set name(value) {
                  debugAssert(value[0] === '@', `call builders.at() with a string that starts with '@'`);
                  debugAssert(value.indexOf('.') === -1, `builder.at() should not be called with a name with dots in it`);
                  _name = value;
                },
                get original() {
                  return this.name;
                },
                set original(value) {
                  this.name = value;
                },
                loc
              };

              // trigger the assertions
              node.name = name;
              return node;
            }
            var({
              name,
              loc
            }) {
              let _name = '';
              const node = {
                type: 'VarHead',
                get name() {
                  return _name;
                },
                set name(value) {
                  debugAssert(value !== 'this', `You called builders.var() with 'this'. Call builders.this instead`);
                  debugAssert(value[0] !== '@', `You called builders.var() with '${name}'. Call builders.at('${name}') instead`);
                  debugAssert(value.indexOf('.') === -1, `builder.var() should not be called with a name with dots in it`);
                  _name = value;
                },
                get original() {
                  return this.name;
                },
                set original(value) {
                  this.name = value;
                },
                loc
              };

              // trigger the assertions
              node.name = name;
              return node;
            }
            hash({
              pairs,
              loc
            }) {
              return {
                type: 'Hash',
                pairs,
                loc
              };
            }
            pair({
              key,
              value,
              loc
            }) {
              return {
                type: 'HashPair',
                key,
                value,
                loc
              };
            }
            literal({
              type,
              value,
              loc
            }) {
              return buildLegacyLiteral({
                type,
                value,
                loc
              });
            }
          }
          const b = new Builders();
          class Parser {
            elementStack = [];
            lines;
            source;
            currentAttribute = null;
            currentNode = null;
            tokenizer;
            constructor(source, entityParser = new EntityParser(namedCharRefs), mode = 'precompile') {
              this.source = source;
              this.lines = source.source.split(/\r\n?|\n/u);
              this.tokenizer = new EventedTokenizer(this, entityParser, mode);
            }
            offset() {
              let {
                line,
                column
              } = this.tokenizer;
              return this.source.offsetFor(line, column);
            }
            pos({
              line,
              column
            }) {
              return this.source.offsetFor(line, column);
            }
            finish(node) {
              return assign({}, node, {
                loc: node.start.until(this.offset())
              });

              // node.loc = node.loc.withEnd(end);
            }
            get currentAttr() {
              return expect(this.currentAttribute, 'expected attribute');
            }
            get currentTag() {
              let node = this.currentNode;
              debugAssert(node && (node.type === 'StartTag' || node.type === 'EndTag'), 'expected tag');
              return node;
            }
            get currentStartTag() {
              let node = this.currentNode;
              debugAssert(node && node.type === 'StartTag', 'expected start tag');
              return node;
            }
            get currentEndTag() {
              let node = this.currentNode;
              debugAssert(node && node.type === 'EndTag', 'expected end tag');
              return node;
            }
            get currentComment() {
              let node = this.currentNode;
              debugAssert(node && node.type === 'CommentStatement', 'expected a comment');
              return node;
            }
            get currentData() {
              let node = this.currentNode;
              debugAssert(node && node.type === 'TextNode', 'expected a text node');
              return node;
            }
            acceptNode(node) {
              return this[node.type](node);
            }
            currentElement() {
              return getLast(asPresentArray(this.elementStack));
            }
            sourceForNode(node, endNode) {
              let firstLine = node.loc.start.line - 1;
              let currentLine = firstLine - 1;
              let firstColumn = node.loc.start.column;
              let string = [];
              let line;
              let lastLine;
              let lastColumn;
              if (endNode) {
                lastLine = endNode.loc.end.line - 1;
                lastColumn = endNode.loc.end.column;
              } else {
                lastLine = node.loc.end.line - 1;
                lastColumn = node.loc.end.column;
              }
              while (currentLine < lastLine) {
                currentLine++;
                line = unwrap(this.lines[currentLine]);
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
            }
          }
          const BEFORE_ATTRIBUTE_NAME = 'beforeAttributeName';
          const ATTRIBUTE_VALUE_UNQUOTED = 'attributeValueUnquoted';
          class HandlebarsNodeVisitors extends Parser {
            // Because we interleave the HTML and HBS parsing, sometimes the HTML
            // tokenizer can run out of tokens when we switch into {{...}} or reached
            // EOF. There are positions where neither of these are expected, and it would
            // like to generate an error, but there is no span to attach the error to.
            // This allows the HTML tokenization to stash an error message and the next
            // mustache visitor will attach the message to the appropriate span and throw
            // the error.
            pendingError = null;
            parse(program, blockParams) {
              let node = b.template({
                body: [],
                blockParams,
                loc: this.source.spanFor(program.loc)
              });
              let template = this.parseProgram(node, program);

              // TODO: we really need to verify that the tokenizer is in an acceptable
              // state when we are "done" parsing. For example, right now, `<foo` parses
              // into `Template { body: [] }` which is obviously incorrect

              this.pendingError?.eof(template.loc.getEnd());
              return template;
            }
            Program(program, blockParams) {
              // The abstract signature doesn't have the blockParams argument, but in
              // practice we can only come from this.BlockStatement() which adds the
              // extra argument for us
              debugAssert(Array.isArray(blockParams), '[BUG] Program in parser unexpectedly called without block params');
              let node = b.blockItself({
                body: [],
                params: blockParams,
                chained: program.chained,
                loc: this.source.spanFor(program.loc)
              });
              return this.parseProgram(node, program);
            }
            parseProgram(node, program) {
              if (program.body.length === 0) {
                return node;
              }
              let poppedNode;
              try {
                this.elementStack.push(node);
                for (let child of program.body) {
                  this.acceptNode(child);
                }
              } finally {
                poppedNode = this.elementStack.pop();
              }

              // Ensure that that the element stack is balanced properly.
              if (node !== poppedNode) {
                if (poppedNode?.type === 'ElementNode') {
                  throw generateSyntaxError(`Unclosed element \`${poppedNode.tag}\``, poppedNode.loc);
                } else {
                  // If the stack is not balanced, then it is likely our own bug, because
                  // any unclosed Handlebars blocks should already been caught by now
                  debugAssert(poppedNode !== undefined, '[BUG] empty parser elementStack');
                  debugAssert(false, `[BUG] mismatched parser elementStack node: ${node.type}`);
                }
              }
              return node;
            }
            BlockStatement(block) {
              if (this.tokenizer.state === 'comment') {
                this.appendToCommentData(this.sourceForNode(block));
                return;
              }
              if (this.tokenizer.state !== 'data' && this.tokenizer.state !== 'beforeData') {
                throw generateSyntaxError('A block may only be used inside an HTML element or another block.', this.source.spanFor(block.loc));
              }
              const {
                path,
                params,
                hash
              } = acceptCallNodes(this, block);
              const loc = this.source.spanFor(block.loc);

              // Backfill block params loc for the default block
              let blockParams = [];
              if (block.program.blockParams?.length) {
                // Start from right after the hash
                let span = hash.loc.collapse('end');

                // Extend till the beginning of the block
                if (block.program.loc) {
                  span = span.withEnd(this.source.spanFor(block.program.loc).getStart());
                } else if (block.program.body[0]) {
                  span = span.withEnd(this.source.spanFor(block.program.body[0].loc).getStart());
                } else {
                  // ...or if all else fail, use the end of the block statement
                  // this can only happen if the block statement is empty anyway
                  span = span.withEnd(loc.getEnd());
                }

                // Now we have a span for something like this:
                //
                //   {{#foo bar baz=bat as |wow wat|}}
                //                     ~~~~~~~~~~~~~~~
                //
                // Or, if we are unlucky:
                //
                // {{#foo bar baz=bat as |wow wat|}}{{/foo}}
                //                   ~~~~~~~~~~~~~~~~~~~~~~~
                //
                // Either way, within this span, there should be exactly two pipes
                // fencing our block params, neatly whitespace separated and with
                // legal identifiers only
                const content = span.asString();
                let skipStart = content.indexOf('|') + 1;
                const limit = content.indexOf('|', skipStart);
                for (const name of block.program.blockParams) {
                  let nameStart;
                  let loc;
                  if (skipStart >= limit) {
                    nameStart = -1;
                  } else {
                    nameStart = content.indexOf(name, skipStart);
                  }
                  if (nameStart === -1 || nameStart + name.length > limit) {
                    skipStart = limit;
                    loc = this.source.spanFor(NON_EXISTENT_LOCATION);
                  } else {
                    skipStart = nameStart;
                    loc = span.sliceStartChars({
                      skipStart,
                      chars: name.length
                    });
                    skipStart += name.length;
                  }
                  blockParams.push(b.var({
                    name,
                    loc
                  }));
                }
              }

              // These are bugs in Handlebars upstream
              if (!block.program.loc) {
                block.program.loc = NON_EXISTENT_LOCATION;
              }
              if (block.inverse && !block.inverse.loc) {
                block.inverse.loc = NON_EXISTENT_LOCATION;
              }
              const program = this.Program(block.program, blockParams);
              const inverse = block.inverse ? this.Program(block.inverse, []) : null;
              const node = b.block({
                path,
                params,
                hash,
                defaultBlock: program,
                elseBlock: inverse,
                loc: this.source.spanFor(block.loc),
                openStrip: block.openStrip,
                inverseStrip: block.inverseStrip,
                closeStrip: block.closeStrip
              });
              const parentProgram = this.currentElement();
              appendChild(parentProgram, node);
            }
            MustacheStatement(rawMustache) {
              this.pendingError?.mustache(this.source.spanFor(rawMustache.loc));
              const {
                tokenizer
              } = this;
              if (tokenizer.state === 'comment') {
                this.appendToCommentData(this.sourceForNode(rawMustache));
                return;
              }
              let mustache;
              const {
                escaped,
                loc,
                strip
              } = rawMustache;
              if ('original' in rawMustache.path && rawMustache.path.original === '...attributes') {
                throw generateSyntaxError('Illegal use of ...attributes', this.source.spanFor(rawMustache.loc));
              }
              if (isHBSLiteral(rawMustache.path)) {
                mustache = b.mustache({
                  path: this.acceptNode(rawMustache.path),
                  params: [],
                  hash: b.hash({
                    pairs: [],
                    loc: this.source.spanFor(rawMustache.path.loc).collapse('end')
                  }),
                  trusting: !escaped,
                  loc: this.source.spanFor(loc),
                  strip
                });
              } else {
                const {
                  path,
                  params,
                  hash
                } = acceptCallNodes(this, rawMustache);
                mustache = b.mustache({
                  path,
                  params,
                  hash,
                  trusting: !escaped,
                  loc: this.source.spanFor(loc),
                  strip
                });
              }
              switch (tokenizer.state) {
                // Tag helpers
                case 'tagOpen':
                case 'tagName':
                  throw generateSyntaxError(`Cannot use mustaches in an elements tagname`, mustache.loc);
                case 'beforeAttributeName':
                  addElementModifier(this.currentStartTag, mustache);
                  break;
                case 'attributeName':
                case 'afterAttributeName':
                  this.beginAttributeValue(false);
                  this.finishAttributeValue();
                  addElementModifier(this.currentStartTag, mustache);
                  tokenizer.transitionTo(BEFORE_ATTRIBUTE_NAME);
                  break;
                case 'afterAttributeValueQuoted':
                  addElementModifier(this.currentStartTag, mustache);
                  tokenizer.transitionTo(BEFORE_ATTRIBUTE_NAME);
                  break;

                // Attribute values
                case 'beforeAttributeValue':
                  this.beginAttributeValue(false);
                  this.appendDynamicAttributeValuePart(mustache);
                  tokenizer.transitionTo(ATTRIBUTE_VALUE_UNQUOTED);
                  break;
                case 'attributeValueDoubleQuoted':
                case 'attributeValueSingleQuoted':
                case 'attributeValueUnquoted':
                  this.appendDynamicAttributeValuePart(mustache);
                  break;

                // TODO: Only append child when the tokenizer state makes
                // sense to do so, otherwise throw an error.
                default:
                  appendChild(this.currentElement(), mustache);
              }
              return mustache;
            }
            appendDynamicAttributeValuePart(part) {
              this.finalizeTextPart();
              const attr = this.currentAttr;
              attr.isDynamic = true;
              attr.parts.push(part);
            }
            finalizeTextPart() {
              const attr = this.currentAttr;
              const text = attr.currentPart;
              if (text !== null) {
                this.currentAttr.parts.push(text);
                this.startTextPart();
              }
            }
            startTextPart() {
              this.currentAttr.currentPart = null;
            }
            ContentStatement(content) {
              updateTokenizerLocation(this.tokenizer, content);
              this.tokenizer.tokenizePart(content.value);
              this.tokenizer.flushData();
            }
            CommentStatement(rawComment) {
              const {
                tokenizer
              } = this;
              if (tokenizer.state === 'comment') {
                this.appendToCommentData(this.sourceForNode(rawComment));
                return null;
              }
              const {
                value,
                loc
              } = rawComment;
              const comment = b.mustacheComment({
                value,
                loc: this.source.spanFor(loc)
              });
              switch (tokenizer.state) {
                case 'beforeAttributeName':
                case 'afterAttributeName':
                  this.currentStartTag.comments.push(comment);
                  break;
                case 'beforeData':
                case 'data':
                  appendChild(this.currentElement(), comment);
                  break;
                default:
                  throw generateSyntaxError(`Using a Handlebars comment when in the \`${tokenizer['state']}\` state is not supported`, this.source.spanFor(rawComment.loc));
              }
              return comment;
            }
            PartialStatement(partial) {
              throw generateSyntaxError(`Handlebars partials are not supported`, this.source.spanFor(partial.loc));
            }
            PartialBlockStatement(partialBlock) {
              throw generateSyntaxError(`Handlebars partial blocks are not supported`, this.source.spanFor(partialBlock.loc));
            }
            Decorator(decorator) {
              throw generateSyntaxError(`Handlebars decorators are not supported`, this.source.spanFor(decorator.loc));
            }
            DecoratorBlock(decoratorBlock) {
              throw generateSyntaxError(`Handlebars decorator blocks are not supported`, this.source.spanFor(decoratorBlock.loc));
            }
            SubExpression(sexpr) {
              const {
                path,
                params,
                hash
              } = acceptCallNodes(this, sexpr);
              return b.sexpr({
                path,
                params,
                hash,
                loc: this.source.spanFor(sexpr.loc)
              });
            }
            PathExpression(path) {
              const {
                original
              } = path;
              let parts;
              if (original.indexOf('/') !== -1) {
                if (original.slice(0, 2) === './') {
                  throw generateSyntaxError(`Using "./" is not supported in Glimmer and unnecessary`, this.source.spanFor(path.loc));
                }
                if (original.slice(0, 3) === '../') {
                  throw generateSyntaxError(`Changing context using "../" is not supported in Glimmer`, this.source.spanFor(path.loc));
                }
                if (original.indexOf('.') !== -1) {
                  throw generateSyntaxError(`Mixing '.' and '/' in paths is not supported in Glimmer; use only '.' to separate property paths`, this.source.spanFor(path.loc));
                }
                parts = [path.parts.join('/')];
              } else if (original === '.') {
                throw generateSyntaxError(`'.' is not a supported path in Glimmer; check for a path with a trailing '.'`, this.source.spanFor(path.loc));
              } else {
                parts = path.parts;
              }
              let thisHead = false;

              // This is to fix a bug in the Handlebars AST where the path expressions in
              // `{{this.foo}}` (and similarly `{{foo-bar this.foo named=this.foo}}` etc)
              // are simply turned into `{{foo}}`. The fix is to push it back onto the
              // parts array and let the runtime see the difference. However, we cannot
              // simply use the string `this` as it means literally the property called
              // "this" in the current context (it can be expressed in the syntax as
              // `{{[this]}}`, where the square bracket are generally for this kind of
              // escaping – such as `{{foo.["bar.baz"]}}` would mean lookup a property
              // named literally "bar.baz" on `this.foo`). By convention, we use `null`
              // for this purpose.
              if (/^this(?:\..+)?$/u.test(original)) {
                thisHead = true;
              }
              let pathHead;
              if (thisHead) {
                pathHead = b.this({
                  loc: this.source.spanFor({
                    start: path.loc.start,
                    end: {
                      line: path.loc.start.line,
                      column: path.loc.start.column + 4
                    }
                  })
                });
              } else if (path.data) {
                const head = parts.shift();
                if (head === undefined) {
                  throw generateSyntaxError(`Attempted to parse a path expression, but it was not valid. Paths beginning with @ must start with a-z.`, this.source.spanFor(path.loc));
                }
                pathHead = b.atName({
                  name: `@${head}`,
                  loc: this.source.spanFor({
                    start: path.loc.start,
                    end: {
                      line: path.loc.start.line,
                      column: path.loc.start.column + head.length + 1
                    }
                  })
                });
              } else {
                const head = parts.shift();
                if (head === undefined) {
                  throw generateSyntaxError(`Attempted to parse a path expression, but it was not valid. Paths must start with a-z or A-Z.`, this.source.spanFor(path.loc));
                }
                pathHead = b.var({
                  name: head,
                  loc: this.source.spanFor({
                    start: path.loc.start,
                    end: {
                      line: path.loc.start.line,
                      column: path.loc.start.column + head.length
                    }
                  })
                });
              }
              return b.path({
                head: pathHead,
                tail: parts,
                loc: this.source.spanFor(path.loc)
              });
            }
            Hash(hash) {
              const pairs = hash.pairs.map(pair => b.pair({
                key: pair.key,
                value: this.acceptNode(pair.value),
                loc: this.source.spanFor(pair.loc)
              }));
              return b.hash({
                pairs,
                loc: this.source.spanFor(hash.loc)
              });
            }
            StringLiteral(string) {
              return b.literal({
                type: 'StringLiteral',
                value: string.value,
                loc: this.source.spanFor(string.loc)
              });
            }
            BooleanLiteral(boolean) {
              return b.literal({
                type: 'BooleanLiteral',
                value: boolean.value,
                loc: this.source.spanFor(boolean.loc)
              });
            }
            NumberLiteral(number) {
              return b.literal({
                type: 'NumberLiteral',
                value: number.value,
                loc: this.source.spanFor(number.loc)
              });
            }
            UndefinedLiteral(undef) {
              return b.literal({
                type: 'UndefinedLiteral',
                value: undefined,
                loc: this.source.spanFor(undef.loc)
              });
            }
            NullLiteral(nul) {
              return b.literal({
                type: 'NullLiteral',
                value: null,
                loc: this.source.spanFor(nul.loc)
              });
            }
          }
          function calculateRightStrippedOffsets(original, value) {
            if (value === '') {
              // if it is empty, just return the count of newlines
              // in original
              return {
                lines: original.split('\n').length - 1,
                columns: 0
              };
            }

            // otherwise, return the number of newlines prior to
            // `value`
            const [difference] = original.split(value);
            const lines = difference.split(/\n/u);
            const lineCount = lines.length - 1;
            return {
              lines: lineCount,
              columns: unwrap(lines[lineCount]).length
            };
          }
          function updateTokenizerLocation(tokenizer, content) {
            let line = content.loc.start.line;
            let column = content.loc.start.column;
            const offsets = calculateRightStrippedOffsets(content.original, content.value);
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
            let path;
            switch (node.path.type) {
              case 'PathExpression':
                path = compiler.PathExpression(node.path);
                break;
              case 'SubExpression':
                path = compiler.SubExpression(node.path);
                break;
              case 'StringLiteral':
              case 'UndefinedLiteral':
              case 'NullLiteral':
              case 'NumberLiteral':
              case 'BooleanLiteral':
                {
                  let value;
                  if (node.path.type === 'BooleanLiteral') {
                    value = node.path.original.toString();
                  } else if (node.path.type === 'StringLiteral') {
                    value = `"${node.path.original}"`;
                  } else if (node.path.type === 'NullLiteral') {
                    value = 'null';
                  } else if (node.path.type === 'NumberLiteral') {
                    value = node.path.value.toString();
                  } else {
                    value = 'undefined';
                  }
                  throw generateSyntaxError(`${node.path.type} "${node.path.type === 'StringLiteral' ? node.path.original : value}" cannot be called as a sub-expression, replace (${value}) with ${value}`, compiler.source.spanFor(node.path.loc));
                }
            }
            const params = node.params ? node.params.map(e => compiler.acceptNode(e)) : [];

            // if there is no hash, position it as a collapsed node immediately after the last param (or the
            // path, if there are also no params)
            const end = isPresentArray(params) ? getLast(params).loc : path.loc;
            const hash = node.hash ? compiler.Hash(node.hash) : b.hash({
              pairs: [],
              loc: compiler.source.spanFor(end).collapse('end')
            });
            return {
              path,
              params,
              hash
            };
          }
          function addElementModifier(element, mustache) {
            const {
              path,
              params,
              hash,
              loc
            } = mustache;
            if (isHBSLiteral(path)) {
              const modifier = `{{${printLiteral(path)}}}`;
              const tag = `<${element.name} ... ${modifier} ...`;
              throw generateSyntaxError(`In ${tag}, ${modifier} is not a valid modifier`, mustache.loc);
            }
            const modifier = b.elementModifier({
              path,
              params,
              hash,
              loc
            });
            element.modifiers.push(modifier);
          }

          // vendored from simple-html-tokenizer because it's unexported
          function isSpace(char) {
            return /[\t\n\f ]/u.test(char);
          }
          class TokenizerEventHandlers extends HandlebarsNodeVisitors {
            tagOpenLine = 0;
            tagOpenColumn = 0;
            reset() {
              this.currentNode = null;
            }

            // Comment

            beginComment() {
              this.currentNode = {
                type: 'CommentStatement',
                value: '',
                start: this.source.offsetFor(this.tagOpenLine, this.tagOpenColumn)
              };
            }
            appendToCommentData(char) {
              this.currentComment.value += char;
            }
            finishComment() {
              appendChild(this.currentElement(), b.comment(this.finish(this.currentComment)));
            }

            // Data

            beginData() {
              this.currentNode = {
                type: 'TextNode',
                chars: '',
                start: this.offset()
              };
            }
            appendToData(char) {
              this.currentData.chars += char;
            }
            finishData() {
              appendChild(this.currentElement(), b.text(this.finish(this.currentData)));
            }

            // Tags - basic

            tagOpen() {
              this.tagOpenLine = this.tokenizer.line;
              this.tagOpenColumn = this.tokenizer.column;
            }
            beginStartTag() {
              this.currentNode = {
                type: 'StartTag',
                name: '',
                nameStart: null,
                nameEnd: null,
                attributes: [],
                modifiers: [],
                comments: [],
                params: [],
                selfClosing: false,
                start: this.source.offsetFor(this.tagOpenLine, this.tagOpenColumn)
              };
            }
            beginEndTag() {
              this.currentNode = {
                type: 'EndTag',
                name: '',
                start: this.source.offsetFor(this.tagOpenLine, this.tagOpenColumn)
              };
            }
            finishTag() {
              let tag = this.finish(this.currentTag);
              if (tag.type === 'StartTag') {
                this.finishStartTag();
                if (tag.name === ':') {
                  throw generateSyntaxError('Invalid named block named detected, you may have created a named block without a name, or you may have began your name with a number. Named blocks must have names that are at least one character long, and begin with a lower case letter', this.source.spanFor({
                    start: this.currentTag.start.toJSON(),
                    end: this.offset().toJSON()
                  }));
                }
                if (voidMap.has(tag.name) || tag.selfClosing) {
                  this.finishEndTag(true);
                }
              } else if (tag.type === 'EndTag') {
                this.finishEndTag(false);
              }
            }
            finishStartTag() {
              let {
                name,
                nameStart,
                nameEnd
              } = this.currentStartTag;

              // <> should probably be a syntax error, but s-h-t is currently broken for that case
              debugAssert(name !== '', 'tag name cannot be empty');
              debugAssert(nameStart !== null, 'nameStart unexpectedly null');
              debugAssert(nameEnd !== null, 'nameEnd unexpectedly null');
              let nameLoc = nameStart.until(nameEnd);
              let [head, ...tail] = asPresentArray(name.split('.'));
              let path = b.path({
                head: b.head({
                  original: head,
                  loc: nameLoc.sliceStartChars({
                    chars: head.length
                  })
                }),
                tail,
                loc: nameLoc
              });
              let {
                attributes,
                modifiers,
                comments,
                params,
                selfClosing,
                loc
              } = this.finish(this.currentStartTag);
              let element = b.element({
                path,
                selfClosing,
                attributes,
                modifiers,
                comments,
                params,
                children: [],
                openTag: loc,
                closeTag: selfClosing ? null : SourceSpan.broken(),
                loc
              });
              this.elementStack.push(element);
            }
            finishEndTag(isVoid) {
              let {
                start: closeTagStart
              } = this.currentTag;
              let tag = this.finish(this.currentTag);
              let element = this.elementStack.pop();
              this.validateEndTag(tag, element, isVoid);
              let parent = this.currentElement();
              if (isVoid) {
                element.closeTag = null;
              } else if (element.selfClosing) {
                debugAssert(element.closeTag === null, 'element.closeTag unexpectedly present');
              } else {
                element.closeTag = closeTagStart.until(this.offset());
              }
              element.loc = element.loc.withEnd(this.offset());
              appendChild(parent, b.element(element));
            }
            markTagAsSelfClosing() {
              let tag = this.currentTag;
              if (tag.type === 'StartTag') {
                tag.selfClosing = true;
              } else {
                throw generateSyntaxError(`Invalid end tag: closing tag must not be self-closing`, this.source.spanFor({
                  start: tag.start.toJSON(),
                  end: this.offset().toJSON()
                }));
              }
            }

            // Tags - name

            appendToTagName(char) {
              let tag = this.currentTag;
              tag.name += char;
              if (tag.type === 'StartTag') {
                let offset = this.offset();
                if (tag.nameStart === null) {
                  debugAssert(tag.nameEnd === null, 'nameStart and nameEnd must both be null');

                  // Note that the tokenizer already consumed the token here
                  tag.nameStart = offset.move(-1);
                }
                tag.nameEnd = offset;
              }
            }

            // Tags - attributes

            beginAttribute() {
              let offset = this.offset();
              this.currentAttribute = {
                name: '',
                parts: [],
                currentPart: null,
                isQuoted: false,
                isDynamic: false,
                start: offset,
                valueSpan: offset.collapsed()
              };
            }
            appendToAttributeName(char) {
              this.currentAttr.name += char;

              // The block params parsing code can actually handle peek=non-space just
              // fine, but this check was added as an optimization, as there is a little
              // bit of setup overhead for the parsing logic just to immediately bail
              if (this.currentAttr.name === 'as') {
                this.parsePossibleBlockParams();
              }
            }
            beginAttributeValue(isQuoted) {
              this.currentAttr.isQuoted = isQuoted;
              this.startTextPart();
              this.currentAttr.valueSpan = this.offset().collapsed();
            }
            appendToAttributeValue(char) {
              let parts = this.currentAttr.parts;
              let lastPart = parts[parts.length - 1];
              let current = this.currentAttr.currentPart;
              if (current) {
                current.chars += char;

                // update end location for each added char
                current.loc = current.loc.withEnd(this.offset());
              } else {
                // initially assume the text node is a single char
                let loc = this.offset();

                // the tokenizer line/column have already been advanced, correct location info
                if (char === '\n') {
                  loc = lastPart ? lastPart.loc.getEnd() : this.currentAttr.valueSpan.getStart();
                } else {
                  loc = loc.move(-1);
                }
                this.currentAttr.currentPart = b.text({
                  chars: char,
                  loc: loc.collapsed()
                });
              }
            }
            finishAttributeValue() {
              this.finalizeTextPart();
              let tag = this.currentTag;
              let tokenizerPos = this.offset();
              if (tag.type === 'EndTag') {
                throw generateSyntaxError(`Invalid end tag: closing tag must not have attributes`, this.source.spanFor({
                  start: tag.start.toJSON(),
                  end: tokenizerPos.toJSON()
                }));
              }
              let {
                name,
                parts,
                start,
                isQuoted,
                isDynamic,
                valueSpan
              } = this.currentAttr;

              // Just trying to be helpful with `<Hello |foo|>` rather than letting it through as an attribute
              if (name.startsWith('|') && parts.length === 0 && !isQuoted && !isDynamic) {
                throw generateSyntaxError('Invalid block parameters syntax: block parameters must be preceded by the `as` keyword', start.until(start.move(name.length)));
              }
              let value = this.assembleAttributeValue(parts, isQuoted, isDynamic, start.until(tokenizerPos));
              value.loc = valueSpan.withEnd(tokenizerPos);
              let attribute = b.attr({
                name,
                value,
                loc: start.until(tokenizerPos)
              });
              this.currentStartTag.attributes.push(attribute);
            }
            parsePossibleBlockParams() {
              // const enums that we can't use directly
              const BEFORE_ATTRIBUTE_NAME = 'beforeAttributeName';
              const ATTRIBUTE_NAME = 'attributeName';
              const AFTER_ATTRIBUTE_NAME = 'afterAttributeName';

              // Regex to validate the identifier for block parameters.
              // Based on the ID validation regex in Handlebars.
              const ID_INVERSE_PATTERN = /[!"#%&'()*+./;<=>@[\\\]^`{|}~]/u;
              debugAssert(this.tokenizer.state === ATTRIBUTE_NAME, 'must be in TokenizerState.attributeName');
              const element = this.currentStartTag;
              const as = this.currentAttr;
              let state = {
                state: 'PossibleAs'
              };
              const handlers = {
                PossibleAs: next => {
                  debugAssert(state.state === 'PossibleAs', 'bug in block params parser');
                  if (isSpace(next)) {
                    // " as ..."
                    state = {
                      state: 'BeforeStartPipe'
                    };
                    this.tokenizer.transitionTo(AFTER_ATTRIBUTE_NAME);
                    this.tokenizer.consume();
                  } else if (next === '|') {
                    // " as|..."
                    // Following Handlebars and require a space between "as" and the pipe
                    throw generateSyntaxError(`Invalid block parameters syntax: expecting at least one space character between "as" and "|"`, as.start.until(this.offset().move(1)));
                  } else {
                    // " as{{...", " async...", " as=...", " as>...", " as/>..."
                    // Don't consume, let the normal tokenizer code handle the next steps
                    state = {
                      state: 'Done'
                    };
                  }
                },
                BeforeStartPipe: next => {
                  debugAssert(state.state === 'BeforeStartPipe', 'bug in block params parser');
                  if (isSpace(next)) {
                    this.tokenizer.consume();
                  } else if (next === '|') {
                    state = {
                      state: 'BeforeBlockParamName'
                    };
                    this.tokenizer.transitionTo(BEFORE_ATTRIBUTE_NAME);
                    this.tokenizer.consume();
                  } else {
                    // " as {{...", " as bs...", " as =...", " as ...", " as/>..."
                    // Don't consume, let the normal tokenizer code handle the next steps
                    state = {
                      state: 'Done'
                    };
                  }
                },
                BeforeBlockParamName: next => {
                  debugAssert(state.state === 'BeforeBlockParamName', 'bug in block params parser');
                  if (isSpace(next)) {
                    this.tokenizer.consume();
                  } else if (next === '') {
                    // The HTML tokenizer ran out of characters, so we are either
                    // encountering mustache or <EOF>
                    state = {
                      state: 'Done'
                    };
                    this.pendingError = {
                      mustache(loc) {
                        throw generateSyntaxError(`Invalid block parameters syntax: mustaches cannot be used inside parameters list`, loc);
                      },
                      eof(loc) {
                        throw generateSyntaxError(`Invalid block parameters syntax: expecting the tag to be closed with ">" or "/>" after parameters list`, as.start.until(loc));
                      }
                    };
                  } else if (next === '|') {
                    if (element.params.length === 0) {
                      // Following Handlebars and treat empty block params a syntax error
                      throw generateSyntaxError(`Invalid block parameters syntax: empty parameters list, expecting at least one identifier`, as.start.until(this.offset().move(1)));
                    } else {
                      state = {
                        state: 'AfterEndPipe'
                      };
                      this.tokenizer.consume();
                    }
                  } else if (next === '>' || next === '/') {
                    throw generateSyntaxError(`Invalid block parameters syntax: incomplete parameters list, expecting "|" but the tag was closed prematurely`, as.start.until(this.offset().move(1)));
                  } else {
                    // slurp up anything else into the name, validate later
                    state = {
                      state: 'BlockParamName',
                      name: next,
                      start: this.offset()
                    };
                    this.tokenizer.consume();
                  }
                },
                BlockParamName: next => {
                  debugAssert(state.state === 'BlockParamName', 'bug in block params parser');
                  if (next === '') {
                    // The HTML tokenizer ran out of characters, so we are either
                    // encountering mustache or <EOF>, HBS side will attach the error
                    // to the next span
                    state = {
                      state: 'Done'
                    };
                    this.pendingError = {
                      mustache(loc) {
                        throw generateSyntaxError(`Invalid block parameters syntax: mustaches cannot be used inside parameters list`, loc);
                      },
                      eof(loc) {
                        throw generateSyntaxError(`Invalid block parameters syntax: expecting the tag to be closed with ">" or "/>" after parameters list`, as.start.until(loc));
                      }
                    };
                  } else if (next === '|' || isSpace(next)) {
                    let loc = state.start.until(this.offset());
                    if (state.name === 'this' || ID_INVERSE_PATTERN.test(state.name)) {
                      throw generateSyntaxError(`Invalid block parameters syntax: invalid identifier name \`${state.name}\``, loc);
                    }
                    element.params.push(b.var({
                      name: state.name,
                      loc
                    }));
                    state = next === '|' ? {
                      state: 'AfterEndPipe'
                    } : {
                      state: 'BeforeBlockParamName'
                    };
                    this.tokenizer.consume();
                  } else if (next === '>' || next === '/') {
                    throw generateSyntaxError(`Invalid block parameters syntax: expecting "|" but the tag was closed prematurely`, as.start.until(this.offset().move(1)));
                  } else {
                    // slurp up anything else into the name, validate later
                    state.name += next;
                    this.tokenizer.consume();
                  }
                },
                AfterEndPipe: next => {
                  debugAssert(state.state === 'AfterEndPipe', 'bug in block params parser');
                  if (isSpace(next)) {
                    this.tokenizer.consume();
                  } else if (next === '') {
                    // The HTML tokenizer ran out of characters, so we are either
                    // encountering mustache or <EOF>, HBS side will attach the error
                    // to the next span
                    state = {
                      state: 'Done'
                    };
                    this.pendingError = {
                      mustache(loc) {
                        throw generateSyntaxError(`Invalid block parameters syntax: modifiers cannot follow parameters list`, loc);
                      },
                      eof(loc) {
                        throw generateSyntaxError(`Invalid block parameters syntax: expecting the tag to be closed with ">" or "/>" after parameters list`, as.start.until(loc));
                      }
                    };
                  } else if (next === '>' || next === '/') {
                    // Don't consume, let the normal tokenizer code handle the next steps
                    state = {
                      state: 'Done'
                    };
                  } else {
                    // Slurp up the next "token" for the error span
                    state = {
                      state: 'Error',
                      message: 'Invalid block parameters syntax: expecting the tag to be closed with ">" or "/>" after parameters list',
                      start: this.offset()
                    };
                    this.tokenizer.consume();
                  }
                },
                Error: next => {
                  debugAssert(state.state === 'Error', 'bug in block params parser');
                  if (next === '' || next === '/' || next === '>' || isSpace(next)) {
                    throw generateSyntaxError(state.message, state.start.until(this.offset()));
                  } else {
                    // Slurp up the next "token" for the error span
                    this.tokenizer.consume();
                  }
                },
                Done: () => {
                  debugAssert(false, 'This should never be called');
                }
              };
              let next;
              do {
                next = this.tokenizer.peek();
                handlers[state.state](next);
              } while (state.state !== 'Done' && next !== '');
              debugAssert(state.state === 'Done', 'bug in block params parser');
            }
            reportSyntaxError(message) {
              throw generateSyntaxError(message, this.offset().collapsed());
            }
            assembleConcatenatedValue(parts) {
              for (const part of parts) {
                if (part.type !== 'MustacheStatement' && part.type !== 'TextNode') {
                  throw generateSyntaxError(`Unsupported node in quoted attribute value: ${part['type']}`, part.loc);
                }
              }
              assertPresentArray(parts, `the concatenation parts of an element should not be empty`);
              let first = getFirst(parts);
              let last = getLast(parts);
              return b.concat({
                parts,
                loc: this.source.spanFor(first.loc).extend(this.source.spanFor(last.loc))
              });
            }
            validateEndTag(tag, element, selfClosing) {
              if (voidMap.has(tag.name) && !selfClosing) {
                // EngTag is also called by StartTag for void and self-closing tags (i.e.
                // <input> or <br />, so we need to check for that here. Otherwise, we would
                // throw an error for those cases.
                throw generateSyntaxError(`<${tag.name}> elements do not need end tags. You should remove it`, tag.loc);
              } else if (element.tag === undefined) {
                throw generateSyntaxError(`Closing tag </${tag.name}> without an open tag`, tag.loc);
              } else if (element.tag !== tag.name) {
                throw generateSyntaxError(`Closing tag </${tag.name}> did not match last open tag <${element.tag}> (on line ${element.loc.startPosition.line})`, tag.loc);
              }
            }
            assembleAttributeValue(parts, isQuoted, isDynamic, span) {
              if (isDynamic) {
                if (isQuoted) {
                  return this.assembleConcatenatedValue(parts);
                } else {
                  assertPresentArray(parts);
                  const [head, a] = parts;
                  if (a === undefined || a.type === 'TextNode' && a.chars === '/') {
                    return head;
                  } else {
                    throw generateSyntaxError(`An unquoted attribute value must be a string or a mustache, ` + `preceded by whitespace or a '=' character, and ` + `followed by whitespace, a '>' character, or '/>'`, span);
                  }
                }
              } else if (isPresentArray(parts)) {
                return parts[0];
              } else {
                return b.text({
                  chars: '',
                  loc: span
                });
              }
            }
          }

          /**
            ASTPlugins can make changes to the Glimmer template AST before
            compilation begins.
          */

          const syntax = {
            parse: preprocess,
            builders: publicBuilder,
            print: build,
            traverse,
            Walker
          };
          class CodemodEntityParser extends EntityParser {
            // match upstream types, but never match an entity
            constructor() {
              super({});
            }
            parse() {
              return undefined;
            }
          }
          function preprocess(input, options = {}) {
            let mode = options.mode || 'precompile';
            let source;
            let ast;
            if (typeof input === 'string') {
              source = new Source(input, options.meta?.moduleName);
              if (mode === 'codemod') {
                ast = parseWithoutProcessing(input, options.parseOptions);
              } else {
                ast = parse(input, options.parseOptions);
              }
            } else if (input instanceof Source) {
              source = input;
              if (mode === 'codemod') {
                ast = parseWithoutProcessing(input.source, options.parseOptions);
              } else {
                ast = parse(input.source, options.parseOptions);
              }
            } else {
              source = new Source('', options.meta?.moduleName);
              ast = input;
            }
            let entityParser = undefined;
            if (mode === 'codemod') {
              entityParser = new CodemodEntityParser();
            }
            let offsets = SourceSpan.forCharPositions(source, 0, source.source.length);
            ast.loc = {
              source: '(program)',
              start: offsets.startPosition,
              end: offsets.endPosition
            };
            let template = new TokenizerEventHandlers(source, entityParser, mode).parse(ast, options.locals ?? []);
            if (options?.plugins?.ast) {
              for (const transform of options.plugins.ast) {
                let env = assign({}, options, {
                  syntax
                }, {
                  plugins: undefined
                });
                let pluginResult = transform(env);
                traverse(template, pluginResult.visitor);
              }
            }
            return template;
          }

          /**
           * Gets the correct Token from the Node based on it's type
           */
          function tokensFromType(node, scopedTokens, options) {
            if (node.type === 'PathExpression') {
              if (node.head.type === 'AtHead' || node.head.type === 'ThisHead') {
                return;
              }
              const possbleToken = node.head.name;
              if (scopedTokens.indexOf(possbleToken) === -1) {
                return possbleToken;
              }
            } else if (node.type === 'ElementNode') {
              const {
                tag
              } = node;
              const char = tag.charAt(0);
              if (char === ':' || char === '@') {
                return;
              }
              if (!options.includeHtmlElements && tag.indexOf('.') === -1 && tag.toLowerCase() === tag) {
                return;
              }
              if (tag.substr(0, 5) === 'this.') {
                return;
              }

              // the tag may be from a yielded object
              // example:
              //   <x.button>
              // An ElementNode does not parse the "tag" in to a PathExpression
              // so we have to split on `.`, just like how `this` presence is checked.
              if (tag.includes('.')) {
                let [potentialLocal] = tag.split('.');
                if (scopedTokens.includes(potentialLocal)) return;
              }
              if (scopedTokens.includes(tag)) return;
              return tag;
            }
          }

          /**
           * Adds tokens to the tokensSet based on their node.type
           */
          function addTokens(tokensSet, node, scopedTokens, options) {
            const maybeTokens = tokensFromType(node, scopedTokens, options);
            (Array.isArray(maybeTokens) ? maybeTokens : [maybeTokens]).forEach(maybeToken => {
              if (maybeToken !== undefined && maybeToken[0] !== '@') {
                const maybeTokenFirstSegment = maybeToken.split('.')[0];
                if (!scopedTokens.includes(maybeTokenFirstSegment)) {
                  tokensSet.add(maybeToken.split('.')[0]);
                }
              }
            });
          }

          /**
           * Parses and traverses a given handlebars html template to extract all template locals
           * referenced that could possible come from the parent scope. Can exclude known keywords
           * optionally.
           */
          function getTemplateLocals(html, options = {
            includeHtmlElements: false,
            includeKeywords: false
          }) {
            const ast = preprocess(html);
            const tokensSet = new Set();
            const scopedTokens = [];
            traverse(ast, {
              Block: {
                enter({
                  blockParams
                }) {
                  blockParams.forEach(param => {
                    scopedTokens.push(param);
                  });
                },
                exit({
                  blockParams
                }) {
                  blockParams.forEach(() => {
                    scopedTokens.pop();
                  });
                }
              },
              ElementNode: {
                enter(node) {
                  node.blockParams.forEach(param => {
                    scopedTokens.push(param);
                  });
                  addTokens(tokensSet, node, scopedTokens, options);
                },
                exit({
                  blockParams
                }) {
                  blockParams.forEach(() => {
                    scopedTokens.pop();
                  });
                }
              },
              PathExpression(node) {
                addTokens(tokensSet, node, scopedTokens, options);
              }
            });
            let tokens = [];
            tokensSet.forEach(s => tokens.push(s));
            if (!options?.includeKeywords) {
              tokens = tokens.filter(token => !isKeyword(token));
            }
            return tokens;
          }

          /**
           * This is a convenience function for creating ASTv2 nodes, with an optional name and the node's
           * options.
           *
           * ```ts
           * export class HtmlText extends node('HtmlText').fields<{ chars: string }>() {}
           * ```
           *
           * This creates a new ASTv2 node with the name `'HtmlText'` and one field `chars: string` (in
           * addition to a `loc: SourceOffsets` field, which all nodes have).
           *
           * ```ts
           * export class Args extends node().fields<{
           *  positional: PositionalArguments;
           *  named: NamedArguments
           * }>() {}
           * ```
           *
           * This creates a new un-named ASTv2 node with two fields (`positional: Positional` and `named:
           * Named`, in addition to the generic `loc: SourceOffsets` field).
           *
           * Once you create a node using `node`, it is instantiated with all of its fields (including `loc`):
           *
           * ```ts
           * new HtmlText({ loc: offsets, chars: someString });
           * ```
           */

          function node(name) {
            if (name !== undefined) {
              const type = name;
              return {
                fields() {
                  return class {
                    // SAFETY: initialized via `assign` in the constructor.

                    type;
                    constructor(fields) {
                      this.type = type;
                      assign(this, fields);
                    }
                  };
                }
              };
            } else {
              return {
                fields() {
                  return class {
                    // SAFETY: initialized via `assign` in the constructor.

                    constructor(fields) {
                      assign(this, fields);
                    }
                  };
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
          let Args$1 = class Args extends node().fields() {
            static empty(loc) {
              return new Args({
                loc,
                positional: PositionalArguments.empty(loc),
                named: NamedArguments$1.empty(loc)
              });
            }
            static named(named) {
              return new Args({
                loc: named.loc,
                positional: PositionalArguments.empty(named.loc.collapse('end')),
                named
              });
            }
            nth(offset) {
              return this.positional.nth(offset);
            }
            get(name) {
              return this.named.get(name);
            }
            isEmpty() {
              return this.positional.isEmpty() && this.named.isEmpty();
            }
          };

          /**
           * Corresponds to positional arguments.
           *
           * If `PositionalArguments` is empty, the `SourceOffsets` for this node should be the collapsed
           * position immediately after the parent call node's `callee`.
           */
          class PositionalArguments extends node().fields() {
            static empty(loc) {
              return new PositionalArguments({
                loc,
                exprs: []
              });
            }
            get size() {
              return this.exprs.length;
            }
            nth(offset) {
              return this.exprs[offset] || null;
            }
            isEmpty() {
              return this.exprs.length === 0;
            }
          }

          /**
           * Corresponds to named arguments.
           *
           * If `PositionalArguments` and `NamedArguments` are empty, the `SourceOffsets` for this node should
           * be the same as the `Args` node that contains this node.
           *
           * If `PositionalArguments` is not empty but `NamedArguments` is empty, the `SourceOffsets` for this
           * node should be the collapsed position immediately after the last positional argument.
           */
          let NamedArguments$1 = class NamedArguments extends node().fields() {
            static empty(loc) {
              return new NamedArguments({
                loc,
                entries: []
              });
            }
            get size() {
              return this.entries.length;
            }
            get(name) {
              let entry = this.entries.filter(e => e.name.chars === name)[0];
              return entry ? entry.value : null;
            }
            isEmpty() {
              return this.entries.length === 0;
            }
          };

          /**
           * Corresponds to a single named argument.
           *
           * ```hbs
           * x=<expr>
           * ```
           */
          let NamedArgument$1 = class NamedArgument {
            loc;
            name;
            value;
            constructor(options) {
              this.loc = options.name.loc.extend(options.value.loc);
              this.name = options.name;
              this.value = options.value;
            }
          };

          /**
           * Attr nodes look like HTML attributes, but are classified as:
           *
           * 1. `HtmlAttr`, which means a regular HTML attribute in Glimmer
           * 2. `SplatAttr`, which means `...attributes`
           * 3. `ComponentArg`, which means an attribute whose name begins with `@`, and it is therefore a
           *    component argument.
           */

          /**
           * `HtmlAttr` and `SplatAttr` are grouped together because the order of the `SplatAttr` node,
           * relative to other attributes, matters.
           */

          /**
           * "Attr Block" nodes are allowed inside an open element tag in templates. They interact with the
           * element (or component).
           */

          /**
           * `HtmlAttr` nodes are valid HTML attributes, with or without a value.
           *
           * Exceptions:
           *
           * - `...attributes` is `SplatAttr`
           * - `@x=<value>` is `ComponentArg`
           */
          class HtmlAttr extends node('HtmlAttr').fields() {}
          let SplatAttr$1 = class SplatAttr extends node('SplatAttr').fields() {};

          /**
           * Corresponds to an argument passed by a component (`@x=<value>`)
           */
          class ComponentArg extends node().fields() {
            /**
             * Convert the component argument into a named argument node
             */
            toNamedArgument() {
              return new NamedArgument$1({
                name: this.name,
                value: this.value
              });
            }
          }

          /**
           * An `ElementModifier` is just a normal call node in modifier position.
           */
          class ElementModifier extends node('ElementModifier').fields() {}

          /**
           * Content Nodes are allowed in content positions in templates. They correspond to behavior in the
           * [Data][data] tokenization state in HTML.
           *
           * [data]: https://html.spec.whatwg.org/multipage/parsing.html#data-state
           */

          class GlimmerComment extends node('GlimmerComment').fields() {}
          class HtmlText extends node('HtmlText').fields() {}
          class HtmlComment extends node('HtmlComment').fields() {}
          class AppendContent extends node('AppendContent').fields() {
            get callee() {
              if (this.value.type === 'Call') {
                return this.value.callee;
              } else {
                return this.value;
              }
            }
            get args() {
              if (this.value.type === 'Call') {
                return this.value.args;
              } else {
                return Args$1.empty(this.value.loc.collapse('end'));
              }
            }
          }
          let InvokeBlock$1 = class InvokeBlock extends node('InvokeBlock').fields() {};
          /**
           * Corresponds to a component invocation. When the content of a component invocation contains no
           * named blocks, `blocks` contains a single named block named `"default"`. When a component
           * invocation is self-closing, `blocks` is empty.
           */
          let InvokeComponent$1 = class InvokeComponent extends node('InvokeComponent').fields() {
            get args() {
              let entries = this.componentArgs.map(a => a.toNamedArgument());
              return Args$1.named(new NamedArguments$1({
                loc: SpanList.range(entries, this.callee.loc.collapse('end')),
                entries
              }));
            }
          };
          /**
           * Corresponds to a simple HTML element. The AST allows component arguments and modifiers to support
           * future extensions.
           */
          let SimpleElement$1 = class SimpleElement extends node('SimpleElement').fields() {
            get args() {
              let entries = this.componentArgs.map(a => a.toNamedArgument());
              return Args$1.named(new NamedArguments$1({
                loc: SpanList.range(entries, this.tag.loc.collapse('end')),
                entries
              }));
            }
          };

          /**
           * A Handlebars literal.
           *
           * {@link https://handlebarsjs.com/guide/expressions.html#literal-segments}
           */

          /**
           * Corresponds to a Handlebars literal.
           *
           * @see {LiteralValue}
           */
          class LiteralExpression extends node('Literal').fields() {
            toSlice() {
              return new SourceSlice({
                loc: this.loc,
                chars: this.value
              });
            }
          }
          /**
           * Returns true if an input {@see ExpressionNode} is a literal.
           */
          function isLiteral$1(node, kind) {
            if (node.type === 'Literal') {
              if (kind === undefined) {
                return true;
              } else if (kind === 'null') {
                return node.value === null;
              } else {
                return typeof node.value === kind;
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
          let PathExpression$1 = class PathExpression extends node('Path').fields() {};

          /**
           * Corresponds to a known strict-mode keyword. It behaves similarly to a
           * PathExpression with a FreeVarReference, but implies StrictResolution and
           * is guaranteed to not have a tail, since `{{outlet.foo}}` would have been
           * illegal.
           */
          class KeywordExpression extends node('Keyword').fields() {}

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
          let CallExpression$1 = class CallExpression extends node('Call').fields() {};

          /**
           * Corresponds to an interpolation in attribute value position.
           *
           * ```hbs
           * <a href="{{url}}.html"
           * ```
           */
          let InterpolateExpression$1 = class InterpolateExpression extends node('Interpolate').fields() {};

          /**
           * Corresponds to an entire template.
           */
          let Template$1 = class Template extends node().fields() {};

          /**
           * Represents a block. In principle this could be merged with `NamedBlock`, because all cases
           * involving blocks have at least a notional name.
           */
          class Block extends node().fields() {}

          /**
           * Corresponds to a collection of named blocks.
           */
          let NamedBlocks$1 = class NamedBlocks extends node().fields() {
            /**
             * Get the `NamedBlock` for a given name.
             */

            get(name) {
              return this.blocks.filter(block => block.name.chars === name)[0] || null;
            }
          };
          /**
           * Corresponds to a single named block. This is used for anonymous named blocks (`default` and
           * `else`).
           */
          let NamedBlock$1 = class NamedBlock extends node().fields() {
            get args() {
              let entries = this.componentArgs.map(a => a.toNamedArgument());
              return Args$1.named(new NamedArguments$1({
                loc: SpanList.range(entries, this.name.loc.collapse('end')),
                entries
              }));
            }
          };

          /**
           * Corresponds to `this` at the head of an expression.
           */
          class ThisReference extends node('This').fields() {}

          /**
           * Corresponds to `@<ident>` at the beginning of an expression.
           */
          class ArgReference extends node('Arg').fields() {}

          /**
           * Corresponds to `<ident>` at the beginning of an expression, when `<ident>` is in the current
           * block's scope.
           */
          class LocalVarReference extends node('Local').fields() {}

          /**
           * Corresponds to `<ident>` at the beginning of an expression, when `<ident>` is *not* in the
           * current block's scope.
           *
           * The `resolution: FreeVarResolution` field describes how to resolve the free variable.
           *
           * Note: In strict mode, it must always be a variable that is in a concrete JavaScript scope that
           * the template will be installed into.
           */
          class FreeVarReference extends node('Free').fields() {}

          /**
           * A free variable is resolved according to a resolution rule:
           *
           * 1. Strict resolution
           * 2. Namespaced resolution
           */

          /**
           * Strict resolution is used:
           *
           * 1. in a strict mode template
           * 2. in an local variable invocation with dot paths
           */
          const STRICT_RESOLUTION = {
            resolution: () => opcodes.GetStrictKeyword,
            serialize: () => 'Strict',
            isAngleBracket: false
          };
          const HTML_RESOLUTION = {
            ...STRICT_RESOLUTION,
            isAngleBracket: true
          };
          function isStrictResolution(value) {
            return value === STRICT_RESOLUTION;
          }

          /**
           * A `LooseModeResolution` includes one or more namespaces to resolve the variable in
           *
           * In practice, there are a limited number of possible combinations of these degrees of freedom,
           * and they are captured by the `Namespaces` union below.
           */
          class LooseModeResolution {
            /**
             * Namespaced resolution is used in an unambiguous syntax position:
             *
             * 1. `(sexp)` (namespace: `Helper`)
             * 2. `{{#block}}` (namespace: `Component`)
             * 3. `<a {{modifier}}>` (namespace: `Modifier`)
             * 4. `<Component />` (namespace: `Component`)
             */
            static namespaced(namespace, isAngleBracket = false) {
              return new LooseModeResolution([namespace], isAngleBracket);
            }

            /**
             * Append resolution is used when the variable should be resolved in both the `component` and
             * `helper` namespaces.
             *
             * ```hbs
             * {{x}}
             * ```
             *
             * ```hbs
             * {{x y}}
             * ```
             *
             * ^ In either case, `x` should be resolved in the `component` and `helper` namespaces.
             */
            static append() {
              return new LooseModeResolution([FreeVarNamespace.Component, FreeVarNamespace.Helper]);
            }

            /**
             * Trusting append resolution is used when the variable should be resolved only in the
             * `helper` namespaces.
             *
             * ```hbs
             * {{{x}}}
             * ```
             *
             * ```hbs
             * {{{x y}}}
             * ```
             *
             * ^ In either case, `x` should be resolved in the `helper` namespace.
             */
            static trustingAppend() {
              return this.namespaced(FreeVarNamespace.Helper);
            }
            constructor(namespaces, isAngleBracket = false) {
              this.namespaces = namespaces;
              this.isAngleBracket = isAngleBracket;
            }
            resolution() {
              if (this.namespaces.length === 1) {
                switch (this.namespaces[0]) {
                  case FreeVarNamespace.Helper:
                    return opcodes.GetFreeAsHelperHead;
                  case FreeVarNamespace.Modifier:
                    return opcodes.GetFreeAsModifierHead;
                  case FreeVarNamespace.Component:
                    return opcodes.GetFreeAsComponentHead;
                }
              } else {
                return opcodes.GetFreeAsComponentOrHelperHead;
              }
            }
            serialize() {
              if (this.namespaces.length === 1) {
                return this.namespaces[0];
              } else {
                return 'ComponentOrHelper';
              }
            }
          }
          let FreeVarNamespace = /*#__PURE__*/function (FreeVarNamespace) {
            FreeVarNamespace["Helper"] = "Helper";
            FreeVarNamespace["Modifier"] = "Modifier";
            FreeVarNamespace["Component"] = "Component";
            return FreeVarNamespace;
          }({});
          const HELPER_NAMESPACE = FreeVarNamespace.Helper;
          const MODIFIER_NAMESPACE = FreeVarNamespace.Modifier;
          const COMPONENT_NAMESPACE = FreeVarNamespace.Component;

          /**
           * A `Namespaced` must be resolved in one or more namespaces.
           *
           * ```hbs
           * <X />
           * ```
           *
           * ^ `X` is resolved in the `component` namespace
           *
           * ```hbs
           * (x)
           * ```
           *
           * ^ `x` is resolved in the `helper` namespace
           *
           * ```hbs
           * <a {{x}} />
           * ```
           *
           * ^ `x` is resolved in the `modifier` namespace
           */

          // Serialization

          function loadResolution(resolution) {
            if (resolution === 'Strict') {
              return STRICT_RESOLUTION;
            } else if (resolution === 'ComponentOrHelper') {
              return LooseModeResolution.append();
            } else {
              return LooseModeResolution.namespaced(resolution);
            }
          }
          var api$1 = /*#__PURE__*/Object.freeze({
            __proto__: null,
            AppendContent: AppendContent,
            ArgReference: ArgReference,
            Args: Args$1,
            Block: Block,
            COMPONENT_NAMESPACE: COMPONENT_NAMESPACE,
            CallExpression: CallExpression$1,
            ComponentArg: ComponentArg,
            ElementModifier: ElementModifier,
            FreeVarNamespace: FreeVarNamespace,
            FreeVarReference: FreeVarReference,
            GlimmerComment: GlimmerComment,
            HELPER_NAMESPACE: HELPER_NAMESPACE,
            HTML_RESOLUTION: HTML_RESOLUTION,
            HtmlAttr: HtmlAttr,
            HtmlComment: HtmlComment,
            HtmlText: HtmlText,
            InterpolateExpression: InterpolateExpression$1,
            InvokeBlock: InvokeBlock$1,
            InvokeComponent: InvokeComponent$1,
            KeywordExpression: KeywordExpression,
            LiteralExpression: LiteralExpression,
            LocalVarReference: LocalVarReference,
            LooseModeResolution: LooseModeResolution,
            MODIFIER_NAMESPACE: MODIFIER_NAMESPACE,
            NamedArgument: NamedArgument$1,
            NamedArguments: NamedArguments$1,
            NamedBlock: NamedBlock$1,
            NamedBlocks: NamedBlocks$1,
            PathExpression: PathExpression$1,
            PositionalArguments: PositionalArguments,
            STRICT_RESOLUTION: STRICT_RESOLUTION,
            SimpleElement: SimpleElement$1,
            SplatAttr: SplatAttr$1,
            Template: Template$1,
            ThisReference: ThisReference,
            isLiteral: isLiteral$1,
            isStrictResolution: isStrictResolution,
            loadResolution: loadResolution,
            node: node
          });
          class SymbolTable {
            static top(locals, keywords, options) {
              return new ProgramSymbolTable(locals, keywords, options);
            }
            child(locals) {
              let symbols = locals.map(name => this.allocate(name));
              return new BlockSymbolTable(this, locals, symbols);
            }
          }
          class ProgramSymbolTable extends SymbolTable {
            constructor(templateLocals, keywords, options) {
              super();
              this.templateLocals = templateLocals;
              this.keywords = keywords;
              this.options = options;
            }
            symbols = [];
            upvars = [];
            size = 1;
            named = dict();
            blocks = dict();
            usedTemplateLocals = [];
            #hasDebugger = false;
            hasLexical(name) {
              return this.options.lexicalScope(name);
            }
            hasKeyword(name) {
              return this.keywords.includes(name);
            }
            getKeyword(name) {
              return this.allocateFree(name, STRICT_RESOLUTION);
            }
            getUsedTemplateLocals() {
              return this.usedTemplateLocals;
            }
            setHasDebugger() {
              this.#hasDebugger = true;
            }
            get hasEval() {
              return this.#hasDebugger;
            }
            has(name) {
              return this.templateLocals.includes(name);
            }
            get(name) {
              let index = this.usedTemplateLocals.indexOf(name);
              if (index !== -1) {
                return [index, true];
              }
              index = this.usedTemplateLocals.length;
              this.usedTemplateLocals.push(name);
              return [index, true];
            }
            getLocalsMap() {
              return dict();
            }
            getDebugInfo() {
              return Object.values(this.getLocalsMap());
            }
            allocateFree(name, resolution) {
              // If the name in question is an uppercase (i.e. angle-bracket) component invocation, run
              // the optional `customizeComponentName` function provided to the precompiler.
              if (resolution.resolution() === opcodes.GetFreeAsComponentHead && resolution.isAngleBracket) {
                name = this.options.customizeComponentName(name);
              }
              let index = this.upvars.indexOf(name);
              if (index !== -1) {
                return index;
              }
              index = this.upvars.length;
              this.upvars.push(name);
              return index;
            }
            allocateNamed(name) {
              let named = this.named[name];
              if (!named) {
                named = this.named[name] = this.allocate(name);
              }
              return named;
            }
            allocateBlock(name) {
              if (name === 'inverse') {
                name = 'else';
              }
              let block = this.blocks[name];
              if (!block) {
                block = this.blocks[name] = this.allocate(`&${name}`);
              }
              return block;
            }
            allocate(identifier) {
              this.symbols.push(identifier);
              return this.size++;
            }
          }
          class BlockSymbolTable extends SymbolTable {
            constructor(parent, symbols, slots) {
              super();
              this.parent = parent;
              this.symbols = symbols;
              this.slots = slots;
            }
            get locals() {
              return this.symbols;
            }
            hasLexical(name) {
              return this.parent.hasLexical(name);
            }
            getKeyword(name) {
              return this.parent.getKeyword(name);
            }
            hasKeyword(name) {
              return this.parent.hasKeyword(name);
            }
            has(name) {
              return this.symbols.indexOf(name) !== -1 || this.parent.has(name);
            }
            get(name) {
              let local = this.#get(name);
              return local ? [local, false] : this.parent.get(name);
            }
            #get(name) {
              let slot = this.symbols.indexOf(name);
              return slot === -1 ? null : unwrap(this.slots[slot]);
            }
            getLocalsMap() {
              let dict = this.parent.getLocalsMap();
              this.symbols.forEach(symbol => dict[symbol] = this.get(symbol)[0]);
              return dict;
            }
            getDebugInfo() {
              return Object.values(this.getLocalsMap());
            }
            setHasDebugger() {
              this.parent.setHasDebugger();
            }
            allocateFree(name, resolution) {
              return this.parent.allocateFree(name, resolution);
            }
            allocateNamed(name) {
              return this.parent.allocateNamed(name);
            }
            allocateBlock(name) {
              return this.parent.allocateBlock(name);
            }
            allocate(identifier) {
              return this.parent.allocate(identifier);
            }
          }
          var api = /*#__PURE__*/Object.freeze({
            __proto__: null
          });
          let Builder$1 = class Builder {
            // TEMPLATE //

            template(symbols, body, loc) {
              return new Template$1({
                table: symbols,
                body,
                loc
              });
            }

            // INTERNAL (these nodes cannot be reached when doing general-purpose visiting) //

            block(symbols, body, loc) {
              return new Block({
                scope: symbols,
                body,
                loc
              });
            }
            namedBlock(name, block, loc) {
              return new NamedBlock$1({
                name,
                block,
                attrs: [],
                componentArgs: [],
                modifiers: [],
                loc
              });
            }
            simpleNamedBlock(name, block, loc) {
              return new BuildElement({
                selfClosing: false,
                attrs: [],
                componentArgs: [],
                modifiers: [],
                comments: []
              }).named(name, block, loc);
            }
            slice(chars, loc) {
              return new SourceSlice({
                loc,
                chars
              });
            }
            args(positional, named, loc) {
              return new Args$1({
                loc,
                positional,
                named
              });
            }
            positional(exprs, loc) {
              return new PositionalArguments({
                loc,
                exprs
              });
            }
            namedArgument(key, value) {
              return new NamedArgument$1({
                name: key,
                value
              });
            }
            named(entries, loc) {
              return new NamedArguments$1({
                loc,
                entries
              });
            }
            attr({
              name,
              value,
              trusting
            }, loc) {
              return new HtmlAttr({
                loc,
                name,
                value,
                trusting
              });
            }
            splatAttr(symbol, loc) {
              return new SplatAttr$1({
                symbol,
                loc
              });
            }
            arg({
              name,
              value,
              trusting
            }, loc) {
              return new ComponentArg({
                name,
                value,
                trusting,
                loc
              });
            }

            // EXPRESSIONS //

            path(head, tail, loc) {
              return new PathExpression$1({
                loc,
                ref: head,
                tail
              });
            }
            keyword(name, symbol, loc) {
              return new KeywordExpression({
                loc,
                name,
                symbol
              });
            }
            self(loc) {
              return new ThisReference({
                loc
              });
            }
            at(name, symbol, loc) {
              // the `@` should be included so we have a complete source range
              debugAssert(name[0] === '@', `call builders.at() with a string that starts with '@'`);
              return new ArgReference({
                loc,
                name: new SourceSlice({
                  loc,
                  chars: name
                }),
                symbol
              });
            }
            freeVar({
              name,
              context,
              symbol,
              loc
            }) {
              debugAssert(name !== 'this', `You called builders.freeVar() with 'this'. Call builders.this instead`);
              debugAssert(name[0] !== '@', `You called builders.freeVar() with '${name}'. Call builders.at('${name}') instead`);
              return new FreeVarReference({
                name,
                resolution: context,
                symbol,
                loc
              });
            }
            localVar(name, symbol, isTemplateLocal, loc) {
              debugAssert(name !== 'this', `You called builders.var() with 'this'. Call builders.this instead`);
              debugAssert(name[0] !== '@', `You called builders.var() with '${name}'. Call builders.at('${name}') instead`);
              return new LocalVarReference({
                loc,
                name,
                isTemplateLocal,
                symbol
              });
            }
            sexp(parts, loc) {
              return new CallExpression$1({
                loc,
                callee: parts.callee,
                args: parts.args
              });
            }
            interpolate(parts, loc) {
              assertPresentArray(parts);
              return new InterpolateExpression$1({
                loc,
                parts
              });
            }
            literal(value, loc) {
              return new LiteralExpression({
                loc,
                value
              });
            }

            // STATEMENTS //

            append({
              table,
              trusting,
              value
            }, loc) {
              return new AppendContent({
                table,
                trusting,
                value,
                loc
              });
            }
            modifier({
              callee,
              args
            }, loc) {
              return new ElementModifier({
                loc,
                callee,
                args
              });
            }
            namedBlocks(blocks, loc) {
              return new NamedBlocks$1({
                loc,
                blocks
              });
            }
            blockStatement({
              program,
              inverse = null,
              ...call
            }, loc) {
              let blocksLoc = program.loc;
              let blocks = [this.namedBlock(SourceSlice.synthetic('default'), program, program.loc)];
              if (inverse) {
                blocksLoc = blocksLoc.extend(inverse.loc);
                blocks.push(this.namedBlock(SourceSlice.synthetic('else'), inverse, inverse.loc));
              }
              return new InvokeBlock$1({
                loc,
                blocks: this.namedBlocks(blocks, blocksLoc),
                callee: call.callee,
                args: call.args
              });
            }
            element(options) {
              return new BuildElement(options);
            }
          };
          class BuildElement {
            builder;
            constructor(base) {
              this.base = base;
              this.builder = new Builder$1();
            }
            simple(tag, body, loc) {
              return new SimpleElement$1(assign({
                tag,
                body,
                componentArgs: [],
                loc
              }, this.base));
            }
            named(name, block, loc) {
              return new NamedBlock$1(assign({
                name,
                block,
                componentArgs: [],
                loc
              }, this.base));
            }
            selfClosingComponent(callee, loc) {
              return new InvokeComponent$1(assign({
                loc,
                callee,
                // point the empty named blocks at the `/` self-closing tag
                blocks: new NamedBlocks$1({
                  blocks: [],
                  loc: loc.sliceEndChars({
                    skipEnd: 1,
                    chars: 1
                  })
                })
              }, this.base));
            }
            componentWithDefaultBlock(callee, children, symbols, loc) {
              let block = this.builder.block(symbols, children, loc);
              let namedBlock = this.builder.namedBlock(SourceSlice.synthetic('default'), block, loc); // BUILDER.simpleNamedBlock('default', children, symbols, loc);

              return new InvokeComponent$1(assign({
                loc,
                callee,
                blocks: this.builder.namedBlocks([namedBlock], namedBlock.loc)
              }, this.base));
            }
            componentWithNamedBlocks(callee, blocks, loc) {
              return new InvokeComponent$1(assign({
                loc,
                callee,
                blocks: this.builder.namedBlocks(blocks, SpanList.range(blocks))
              }, this.base));
            }
          }
          function SexpSyntaxContext(node) {
            if (isSimpleCallee(node)) {
              return LooseModeResolution.namespaced(HELPER_NAMESPACE);
            } else {
              return null;
            }
          }
          function ModifierSyntaxContext(node) {
            if (isSimpleCallee(node)) {
              return LooseModeResolution.namespaced(MODIFIER_NAMESPACE);
            } else {
              return null;
            }
          }
          function BlockSyntaxContext(node) {
            if (isSimpleCallee(node)) {
              return LooseModeResolution.namespaced(COMPONENT_NAMESPACE);
            } else {
              return null;
            }
          }
          function ComponentSyntaxContext(node) {
            if (isSimplePath(node)) {
              return LooseModeResolution.namespaced(COMPONENT_NAMESPACE, true);
            } else {
              return null;
            }
          }

          /**
           * This corresponds to attribute curlies (<Foo bar={{...}}>).
           * In strict mode, this also corresponds to arg curlies.
           */
          function AttrValueSyntaxContext(node) {
            if (isSimpleCallee(node)) {
              return LooseModeResolution.namespaced(HELPER_NAMESPACE);
            } else {
              return null;
            }
          }

          /**
           * This corresponds to append positions text curlies.
           */
          function AppendSyntaxContext(node) {
            let isSimple = isSimpleCallee(node);
            let trusting = node.trusting;
            if (isSimple) {
              return trusting ? LooseModeResolution.trustingAppend() : LooseModeResolution.append();
            } else {
              return null;
            }
          }
          // UTILITIES

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
          function isSimpleCallee(node) {
            return isSimplePath(node.path);
          }
          function isSimplePath(node) {
            if (node.type === 'PathExpression' && node.head.type === 'VarHead') {
              return node.tail.length === 0;
            } else {
              return false;
            }
          }
          function normalize$1(source, options = {
            lexicalScope: () => false
          }) {
            let ast = preprocess(source, options);
            let normalizeOptions = {
              strictMode: false,
              ...options,
              locals: ast.blockParams,
              keywords: options.keywords ?? []
            };
            let top = SymbolTable.top(normalizeOptions.locals, normalizeOptions.keywords, {
              customizeComponentName: options.customizeComponentName ?? (name => name),
              lexicalScope: options.lexicalScope
            });
            let block = new BlockContext(source, normalizeOptions, top);
            let normalizer = new StatementNormalizer(block);
            let astV2 = new TemplateChildren(block.loc(ast.loc), ast.body.map(b => normalizer.normalize(b)), block).assertTemplate(top);
            let locals = top.getUsedTemplateLocals();
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
          class BlockContext {
            builder;
            constructor(source, options, table) {
              this.source = source;
              this.options = options;
              this.table = table;
              this.builder = new Builder$1();
            }
            get strict() {
              return this.options.strictMode || false;
            }
            loc(loc) {
              return this.source.spanFor(loc);
            }
            resolutionFor(node, resolution) {
              if (this.strict) {
                return {
                  result: STRICT_RESOLUTION
                };
              }
              if (this.isFreeVar(node)) {
                let r = resolution(node);
                if (r === null) {
                  return {
                    result: 'error',
                    path: printPath(node),
                    head: printHead(node)
                  };
                }
                return {
                  result: r
                };
              } else {
                return {
                  result: STRICT_RESOLUTION
                };
              }
            }
            isLexicalVar(variable) {
              return this.table.hasLexical(variable);
            }
            isKeyword(name) {
              return this.strict && !this.table.hasLexical(name) && this.table.hasKeyword(name);
            }
            isFreeVar(callee) {
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
            }
            hasBinding(name) {
              return this.table.has(name) || this.table.hasLexical(name);
            }
            child(blockParams) {
              return new BlockContext(this.source, this.options, this.table.child(blockParams));
            }
            customizeComponentName(input) {
              if (this.options.customizeComponentName) {
                return this.options.customizeComponentName(input);
              } else {
                return input;
              }
            }
          }

          /**
           * An `ExpressionNormalizer` normalizes expressions within a block.
           *
           * `ExpressionNormalizer` is stateless.
           */
          class ExpressionNormalizer {
            constructor(block) {
              this.block = block;
            }

            /**
             * The `normalize` method takes an arbitrary expression and its original syntax context and
             * normalizes it to an ASTv2 expression.
             *
             * @see {SyntaxContext}
             */

            normalize(expr, resolution) {
              switch (expr.type) {
                case 'NullLiteral':
                case 'BooleanLiteral':
                case 'NumberLiteral':
                case 'StringLiteral':
                case 'UndefinedLiteral':
                  return this.block.builder.literal(expr.value, this.block.loc(expr.loc));
                case 'PathExpression':
                  debugAssert(resolution, '[BUG] resolution is required');
                  return this.path(expr, resolution);
                case 'SubExpression':
                  {
                    // expr.path used to incorrectly have the type ASTv1.Expression
                    if (isLiteral(expr.path)) {
                      assertIllegalLiteral(expr.path, expr.loc);
                    }
                    let resolution = this.block.resolutionFor(expr, SexpSyntaxContext);
                    if (resolution.result === 'error') {
                      throw generateSyntaxError(`You attempted to invoke a path (\`${resolution.path}\`) but ${resolution.head} was not in scope`, expr.loc);
                    }
                    return this.block.builder.sexp(this.callParts(expr, resolution.result), this.block.loc(expr.loc));
                  }
              }
            }
            path(expr, resolution) {
              let loc = this.block.loc(expr.loc);
              if (expr.head.type === 'VarHead' && expr.tail.length === 0 && this.block.isKeyword(expr.head.name)) {
                return this.block.builder.keyword(expr.head.name, this.block.table.getKeyword(expr.head.name), loc);
              }
              let headOffsets = this.block.loc(expr.head.loc);
              let tail = [];

              // start with the head
              let offset = headOffsets;
              for (let part of expr.tail) {
                offset = offset.sliceStartChars({
                  chars: part.length,
                  skipStart: 1
                });
                tail.push(new SourceSlice({
                  loc: offset,
                  chars: part
                }));
              }
              return this.block.builder.path(this.ref(expr.head, resolution), tail, loc);
            }

            /**
             * The `callParts` method takes ASTv1.CallParts as well as a syntax context and normalizes
             * it to an ASTv2 CallParts.
             */
            callParts(parts, context) {
              let {
                path,
                params,
                hash,
                loc
              } = parts;
              let callee = this.normalize(path, context);
              let paramList = params.map(p => this.normalize(p, STRICT_RESOLUTION));
              let paramLoc = SpanList.range(paramList, callee.loc.collapse('end'));
              let namedLoc = this.block.loc(hash.loc);
              let argsLoc = SpanList.range([paramLoc, namedLoc]);
              let positional = this.block.builder.positional(params.map(p => this.normalize(p, STRICT_RESOLUTION)), paramLoc);
              let named = this.block.builder.named(hash.pairs.map(p => this.namedArgument(p)), this.block.loc(hash.loc));
              switch (callee.type) {
                case 'Literal':
                  throw generateSyntaxError(`Invalid invocation of a literal value (\`${callee.value}\`)`, loc);

                // This really shouldn't be possible, something has gone pretty wrong
                case 'Interpolate':
                  throw generateSyntaxError(`Invalid invocation of a interpolated string`, loc);
              }
              return {
                callee,
                args: this.block.builder.args(positional, named, argsLoc)
              };
            }
            namedArgument(pair) {
              let offsets = this.block.loc(pair.loc);
              let keyOffsets = offsets.sliceStartChars({
                chars: pair.key.length
              });
              return this.block.builder.namedArgument(new SourceSlice({
                chars: pair.key,
                loc: keyOffsets
              }), this.normalize(pair.value, STRICT_RESOLUTION));
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
            ref(head, resolution) {
              let {
                block
              } = this;
              let {
                builder,
                table
              } = block;
              let offsets = block.loc(head.loc);
              switch (head.type) {
                case 'ThisHead':
                  return builder.self(offsets);
                case 'AtHead':
                  {
                    let symbol = table.allocateNamed(head.name);
                    return builder.at(head.name, symbol, offsets);
                  }
                case 'VarHead':
                  {
                    if (block.hasBinding(head.name)) {
                      let [symbol, isRoot] = table.get(head.name);
                      return block.builder.localVar(head.name, symbol, isRoot, offsets);
                    } else {
                      let context = block.strict ? STRICT_RESOLUTION : resolution;
                      let symbol = block.table.allocateFree(head.name, context);
                      return block.builder.freeVar({
                        name: head.name,
                        context,
                        symbol,
                        loc: offsets
                      });
                    }
                  }
              }
            }
          }

          /**
           * `TemplateNormalizer` normalizes top-level ASTv1 statements to ASTv2.
           */
          class StatementNormalizer {
            constructor(block) {
              this.block = block;
            }
            normalize(node) {
              switch (node.type) {
                case 'BlockStatement':
                  return this.BlockStatement(node);
                case 'ElementNode':
                  return new ElementNormalizer(this.block).ElementNode(node);
                case 'MustacheStatement':
                  return this.MustacheStatement(node);

                // These are the same in ASTv2
                case 'MustacheCommentStatement':
                  return this.MustacheCommentStatement(node);
                case 'CommentStatement':
                  {
                    let loc = this.block.loc(node.loc);
                    return new HtmlComment({
                      loc,
                      text: loc.slice({
                        skipStart: 4,
                        skipEnd: 3
                      }).toSlice(node.value)
                    });
                  }
                case 'TextNode':
                  return new HtmlText({
                    loc: this.block.loc(node.loc),
                    chars: node.chars
                  });
              }
            }
            MustacheCommentStatement(node) {
              let loc = this.block.loc(node.loc);
              let textLoc;
              if (loc.asString().slice(0, 5) === '{{!--') {
                textLoc = loc.slice({
                  skipStart: 5,
                  skipEnd: 4
                });
              } else {
                textLoc = loc.slice({
                  skipStart: 3,
                  skipEnd: 2
                });
              }
              return new GlimmerComment({
                loc,
                text: textLoc.toSlice(node.value)
              });
            }

            /**
             * Normalizes an ASTv1.MustacheStatement to an ASTv2.AppendStatement
             */
            MustacheStatement(mustache) {
              let {
                path,
                params,
                hash,
                trusting
              } = mustache;
              let loc = this.block.loc(mustache.loc);
              let value;
              if (isLiteral(path)) {
                if (params.length === 0 && hash.pairs.length === 0) {
                  value = this.expr.normalize(path);
                } else {
                  assertIllegalLiteral(path, loc);
                }
              } else {
                let resolution = this.block.resolutionFor(mustache, AppendSyntaxContext);
                if (resolution.result === 'error') {
                  throw generateSyntaxError(`You attempted to render a path (\`{{${resolution.path}}}\`), but ${resolution.head} was not in scope`, loc);
                }

                // Normalize the call parts in AppendSyntaxContext
                let callParts = this.expr.callParts({
                  path,
                  params,
                  hash,
                  loc
                }, resolution.result);
                value = callParts.args.isEmpty() ? callParts.callee : this.block.builder.sexp(callParts, loc);
              }
              return this.block.builder.append({
                table: this.block.table,
                trusting,
                value
              }, loc);
            }

            /**
             * Normalizes a ASTv1.BlockStatement to an ASTv2.BlockStatement
             */
            BlockStatement(block) {
              let {
                program,
                inverse
              } = block;
              let loc = this.block.loc(block.loc);

              // block.path used to incorrectly have the type ASTv1.Expression
              if (isLiteral(block.path)) {
                assertIllegalLiteral(block.path, loc);
              }
              let resolution = this.block.resolutionFor(block, BlockSyntaxContext);
              if (resolution.result === 'error') {
                throw generateSyntaxError(`You attempted to invoke a path (\`{{#${resolution.path}}}\`) but ${resolution.head} was not in scope`, loc);
              }
              let callParts = this.expr.callParts(block, resolution.result);
              return this.block.builder.blockStatement(assign({
                symbols: this.block.table,
                program: this.Block(program),
                inverse: inverse ? this.Block(inverse) : null
              }, callParts), loc);
            }
            Block({
              body,
              loc,
              blockParams
            }) {
              let child = this.block.child(blockParams);
              let normalizer = new StatementNormalizer(child);
              return new BlockChildren(this.block.loc(loc), body.map(b => normalizer.normalize(b)), this.block).assertBlock(child.table);
            }
            get expr() {
              return new ExpressionNormalizer(this.block);
            }
          }
          class ElementNormalizer {
            constructor(ctx) {
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
            ElementNode(element) {
              let {
                tag,
                selfClosing,
                comments
              } = element;
              let loc = this.ctx.loc(element.loc);
              let [tagHead, ...rest] = asPresentArray(tag.split('.'));

              // the head, attributes and modifiers are in the current scope
              let path = this.classifyTag(tagHead, rest, element.loc);
              let attrs = element.attributes.filter(a => a.name[0] !== '@').map(a => this.attr(a));
              let args = element.attributes.filter(a => a.name[0] === '@').map(a => this.arg(a));
              let modifiers = element.modifiers.map(m => this.modifier(m));

              // the element's block params are in scope for the children
              let child = this.ctx.child(element.blockParams);
              let normalizer = new StatementNormalizer(child);
              let childNodes = element.children.map(s => normalizer.normalize(s));
              let el = this.ctx.builder.element({
                selfClosing,
                attrs,
                componentArgs: args,
                modifiers,
                comments: comments.map(c => new StatementNormalizer(this.ctx).MustacheCommentStatement(c))
              });
              let children = new ElementChildren(el, loc, childNodes, this.ctx);
              let offsets = this.ctx.loc(element.loc);
              let tagOffsets = offsets.sliceStartChars({
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
                return el.selfClosingComponent(path, loc);
              } else {
                let blocks = children.assertComponent(tag, child.table, element.blockParams.length > 0);
                return el.componentWithNamedBlocks(path, blocks, loc);
              }
            }
            modifier(m) {
              // modifier.path used to incorrectly have the type ASTv1.Expression
              if (isLiteral(m.path)) {
                assertIllegalLiteral(m.path, m.loc);
              }
              let resolution = this.ctx.resolutionFor(m, ModifierSyntaxContext);
              if (resolution.result === 'error') {
                throw generateSyntaxError(`You attempted to invoke a path (\`{{${resolution.path}}}\`) as a modifier, but ${resolution.head} was not in scope`, m.loc);
              }
              let callParts = this.expr.callParts(m, resolution.result);
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
            mustacheAttr(mustache) {
              let {
                path,
                params,
                hash,
                loc
              } = mustache;
              if (isLiteral(path)) {
                if (params.length === 0 && hash.pairs.length === 0) {
                  return this.expr.normalize(path);
                } else {
                  assertIllegalLiteral(path, loc);
                }
              }

              // Normalize the call parts in AttrValueSyntaxContext
              let resolution = this.ctx.resolutionFor(mustache, AttrValueSyntaxContext);
              if (resolution.result === 'error') {
                throw generateSyntaxError(`You attempted to render a path (\`{{${resolution.path}}}\`), but ${resolution.head} was not in scope`, mustache.loc);
              }
              let sexp = this.ctx.builder.sexp(this.expr.callParts(mustache, resolution.result), this.ctx.loc(mustache.loc));

              // If there are no params or hash, just return the function part as its own expression
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
            attrPart(part) {
              switch (part.type) {
                case 'MustacheStatement':
                  return {
                    expr: this.mustacheAttr(part),
                    trusting: part.trusting
                  };
                case 'TextNode':
                  return {
                    expr: this.ctx.builder.literal(part.chars, this.ctx.loc(part.loc)),
                    trusting: true
                  };
              }
            }
            attrValue(part) {
              switch (part.type) {
                case 'ConcatStatement':
                  {
                    let parts = part.parts.map(p => this.attrPart(p).expr);
                    return {
                      expr: this.ctx.builder.interpolate(parts, this.ctx.loc(part.loc)),
                      trusting: false
                    };
                  }
                default:
                  return this.attrPart(part);
              }
            }
            attr(m) {
              debugAssert(m.name[0] !== '@', 'An attr name must not start with `@`');
              if (m.name === '...attributes') {
                return this.ctx.builder.splatAttr(this.ctx.table.allocateBlock('attrs'), this.ctx.loc(m.loc));
              }
              let offsets = this.ctx.loc(m.loc);
              let nameSlice = offsets.sliceStartChars({
                chars: m.name.length
              }).toSlice(m.name);
              let value = this.attrValue(m.value);
              return this.ctx.builder.attr({
                name: nameSlice,
                value: value.expr,
                trusting: value.trusting
              }, offsets);
            }

            // An arg curly <Foo @bar={{...}} /> is the same as an attribute curly for
            // our purposes, except that in loose mode <Foo @bar={{baz}} /> is an error:
            checkArgCall(arg) {
              let {
                value
              } = arg;
              if (value.type !== 'MustacheStatement') {
                return;
              }
              if (value.params.length !== 0 || value.hash.pairs.length !== 0) {
                return;
              }
              let {
                path
              } = value;
              if (path.type !== 'PathExpression') {
                return;
              }
              if (path.tail.length > 0) {
                return;
              }
              let resolution = this.ctx.resolutionFor(path, () => {
                // We deliberately don't want this to resolve anything. The purpose of
                // calling `resolutionFor` here is to check for strict mode, in-scope
                // local variables, etc.
                return null;
              });
              if (resolution.result === 'error' && resolution.path !== 'has-block') {
                throw generateSyntaxError(`You attempted to pass a path as argument (\`${arg.name}={{${resolution.path}}}\`) but ${resolution.head} was not in scope. Try:\n` + `* \`${arg.name}={{this.${resolution.path}}}\` if this is meant to be a property lookup, or\n` + `* \`${arg.name}={{(${resolution.path})}}\` if this is meant to invoke the resolved helper, or\n` + `* \`${arg.name}={{helper "${resolution.path}"}}\` if this is meant to pass the resolved helper by value`, arg.loc);
              }
            }
            arg(arg) {
              debugAssert(arg.name[0] === '@', 'An arg name must start with `@`');
              this.checkArgCall(arg);
              let offsets = this.ctx.loc(arg.loc);
              let nameSlice = offsets.sliceStartChars({
                chars: arg.name.length
              }).toSlice(arg.name);
              let value = this.attrValue(arg.value);
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
            classifyTag(variable, tail, loc) {
              let uppercase = isUpperCase(variable);
              let inScope = variable[0] === '@' || variable === 'this' || this.ctx.hasBinding(variable);
              if (this.ctx.strict && !inScope) {
                if (uppercase) {
                  throw generateSyntaxError(`Attempted to invoke a component that was not in scope in a strict mode template, \`<${variable}>\`. If you wanted to create an element with that name, convert it to lowercase - \`<${variable.toLowerCase()}>\``, loc);
                }

                // In strict mode, values are always elements unless they are in scope
                return 'ElementHead';
              }

              // Since the parser handed us the HTML element name as a string, we need
              // to convert it into an ASTv1 path so it can be processed using the
              // expression normalizer.
              let isComponent = inScope || uppercase;
              let variableLoc = loc.sliceStartChars({
                skipStart: 1,
                chars: variable.length
              });
              let tailLength = tail.reduce((accum, part) => accum + 1 + part.length, 0);
              let pathEnd = variableLoc.getEnd().move(tailLength);
              let pathLoc = variableLoc.withEnd(pathEnd);
              if (isComponent) {
                let path = b.path({
                  head: b.head({
                    original: variable,
                    loc: variableLoc
                  }),
                  tail,
                  loc: pathLoc
                });
                let resolution = this.ctx.isLexicalVar(variable) ? {
                  result: STRICT_RESOLUTION
                } : this.ctx.resolutionFor(path, ComponentSyntaxContext);
                if (resolution.result === 'error') {
                  throw generateSyntaxError(`You attempted to invoke a path (\`<${resolution.path}>\`) but ${resolution.head} was not in scope`, loc);
                }
                return new ExpressionNormalizer(this.ctx).normalize(path, resolution.result);
              } else {
                this.ctx.table.allocateFree(variable, STRICT_RESOLUTION);
              }

              // If the tag name wasn't a valid component but contained a `.`, it's
              // a syntax error.
              if (tail.length > 0) {
                throw generateSyntaxError(`You used ${variable}.${tail.join('.')} as a tag name, but ${variable} is not in scope`, loc);
              }
              return 'ElementHead';
            }
            get expr() {
              return new ExpressionNormalizer(this.ctx);
            }
          }
          class Children {
            namedBlocks;
            hasSemanticContent;
            nonBlockChildren;
            constructor(loc, children, block) {
              this.loc = loc;
              this.children = children;
              this.block = block;
              this.namedBlocks = children.filter(c => c instanceof NamedBlock$1);
              this.hasSemanticContent = Boolean(children.filter(c => {
                if (c instanceof NamedBlock$1) {
                  return false;
                }
                switch (c.type) {
                  case 'GlimmerComment':
                  case 'HtmlComment':
                    return false;
                  case 'HtmlText':
                    return !/^\s*$/u.test(c.chars);
                  default:
                    return true;
                }
              }).length);
              this.nonBlockChildren = children.filter(c => !(c instanceof NamedBlock$1));
            }
          }
          class TemplateChildren extends Children {
            assertTemplate(table) {
              if (isPresentArray(this.namedBlocks)) {
                throw generateSyntaxError(`Unexpected named block at the top-level of a template`, this.loc);
              }
              return this.block.builder.template(table, this.nonBlockChildren, this.block.loc(this.loc));
            }
          }
          class BlockChildren extends Children {
            assertBlock(table) {
              if (isPresentArray(this.namedBlocks)) {
                throw generateSyntaxError(`Unexpected named block nested in a normal block`, this.loc);
              }
              return this.block.builder.block(table, this.nonBlockChildren, this.loc);
            }
          }
          class ElementChildren extends Children {
            constructor(el, loc, children, block) {
              super(loc, children, block);
              this.el = el;
            }
            assertNamedBlock(name, table) {
              if (this.el.base.selfClosing) {
                throw generateSyntaxError(`<:${name.chars}/> is not a valid named block: named blocks cannot be self-closing`, this.loc);
              }
              if (isPresentArray(this.namedBlocks)) {
                throw generateSyntaxError(`Unexpected named block inside <:${name.chars}> named block: named blocks cannot contain nested named blocks`, this.loc);
              }
              if (!isLowerCase(name.chars)) {
                throw generateSyntaxError(`<:${name.chars}> is not a valid named block, and named blocks must begin with a lowercase letter`, this.loc);
              }
              if (this.el.base.attrs.length > 0 || this.el.base.componentArgs.length > 0 || this.el.base.modifiers.length > 0) {
                throw generateSyntaxError(`named block <:${name.chars}> cannot have attributes, arguments, or modifiers`, this.loc);
              }
              let offsets = SpanList.range(this.nonBlockChildren, this.loc);
              return this.block.builder.namedBlock(name, this.block.builder.block(table, this.nonBlockChildren, offsets), this.loc);
            }
            assertElement(name, hasBlockParams) {
              if (hasBlockParams) {
                throw generateSyntaxError(`Unexpected block params in <${name.chars}>: simple elements cannot have block params`, this.loc);
              }
              if (isPresentArray(this.namedBlocks)) {
                let names = this.namedBlocks.map(b => b.name);
                if (names.length === 1) {
                  throw generateSyntaxError(`Unexpected named block <:foo> inside <${name.chars}> HTML element`, this.loc);
                } else {
                  let printedNames = names.map(n => `<:${n.chars}>`).join(', ');
                  throw generateSyntaxError(`Unexpected named blocks inside <${name.chars}> HTML element (${printedNames})`, this.loc);
                }
              }
              return this.el.simple(name, this.nonBlockChildren, this.loc);
            }
            assertComponent(name, table, hasBlockParams) {
              if (isPresentArray(this.namedBlocks) && this.hasSemanticContent) {
                throw generateSyntaxError(`Unexpected content inside <${name}> component invocation: when using named blocks, the tag cannot contain other content`, this.loc);
              }
              if (isPresentArray(this.namedBlocks)) {
                if (hasBlockParams) {
                  throw generateSyntaxError(`Unexpected block params list on <${name}> component invocation: when passing named blocks, the invocation tag cannot take block params`, this.loc);
                }
                let seenNames = new Set();
                for (let block of this.namedBlocks) {
                  let name = block.name.chars;
                  if (seenNames.has(name)) {
                    throw generateSyntaxError(`Component had two named blocks with the same name, \`<:${name}>\`. Only one block with a given name may be passed`, this.loc);
                  }
                  if (name === 'inverse' && seenNames.has('else') || name === 'else' && seenNames.has('inverse')) {
                    throw generateSyntaxError(`Component has both <:else> and <:inverse> block. <:inverse> is an alias for <:else>`, this.loc);
                  }
                  seenNames.add(name);
                }
                return this.namedBlocks;
              } else {
                return [this.block.builder.namedBlock(SourceSlice.synthetic('default'), this.block.builder.block(table, this.nonBlockChildren, this.loc), this.loc)];
              }
            }
          }
          function isLiteral(node) {
            switch (node.type) {
              case 'StringLiteral':
              case 'BooleanLiteral':
              case 'NumberLiteral':
              case 'UndefinedLiteral':
              case 'NullLiteral':
                return true;
              default:
                return false;
            }
          }
          function assertIllegalLiteral(node, loc) {
            let value = node.type === 'StringLiteral' ? JSON.stringify(node.value) : String(node.value);
            throw generateSyntaxError(`Unexpected literal \`${value}\``, loc);
          }
          function printPath(node) {
            if (node.type !== 'PathExpression' && node.path.type === 'PathExpression') {
              return printPath(node.path);
            } else {
              return new Printer({
                entityEncoding: 'raw'
              }).print(node);
            }
          }
          function printHead(node) {
            if (node.type === 'PathExpression') {
              return node.head.original;
            } else if (node.path.type === 'PathExpression') {
              return printHead(node.path);
            } else {
              return new Printer({
                entityEncoding: 'raw'
              }).print(node);
            }
          }

          const glimmerSyntax = /*#__PURE__*/Object.defineProperty({
                    __proto__: null,
                    AST: api,
                    ASTv1: api,
                    ASTv2: api$1,
                    BlockSymbolTable,
                    KEYWORDS_TYPES,
                    Path: Walker,
                    ProgramSymbolTable,
                    SourceSlice,
                    SpanList,
                    SymbolTable,
                    Walker,
                    WalkerPath,
                    builders: publicBuilder,
                    cannotRemoveNode,
                    cannotReplaceNode,
                    generateSyntaxError,
                    getTemplateLocals,
                    getVoidTags,
                    hasSpan,
                    isKeyword,
                    isVoidTag,
                    loc,
                    maybeLoc,
                    node,
                    normalize: normalize$1,
                    preprocess,
                    print: build,
                    sortByLoc,
                    src: api$2,
                    traverse,
                    visitorKeys
          }, Symbol.toStringTag, { value: 'Module' });

          const ContentType = {
            Component: 0,
            Helper: 1,
            String: 2,
            Empty: 3,
            SafeString: 4,
            Fragment: 5,
            Node: 6,
            Other: 8
          };
          const CurriedTypes = {
            Component: 0,
            Helper: 1,
            Modifier: 2
          };
          const InternalComponentCapabilities = {
            Empty: 0,
            dynamicLayout: 0b0000000000001,
            dynamicTag: 0b0000000000010,
            prepareArgs: 0b0000000000100,
            createArgs: 0b0000000001000,
            attributeHook: 0b0000000010000,
            elementHook: 0b0000000100000,
            dynamicScope: 0b0000001000000,
            createCaller: 0b0000010000000,
            updateHook: 0b0000100000000,
            createInstance: 0b0001000000000,
            wrapped: 0b0010000000000,
            willDestroy: 0b0100000000000,
            hasSubOwner: 0b1000000000000
          };
          const ARG_SHIFT = 8;
          const MAX_SIZE = 0x7fffffff;
          const TYPE_SIZE = 0b11111111;
          const TYPE_MASK = 0b00000000000000000000000011111111;
          const OPERAND_LEN_MASK = 0b00000000000000000000001100000000;
          const MACHINE_MASK = 0b00000000000000000000010000000000;
          const MachineOp = {
            PushFrame: 0,
            PopFrame: 1,
            InvokeVirtual: 2,
            InvokeStatic: 3,
            Jump: 4,
            Return: 5,
            ReturnTo: 6,
            Size: 7
          };
          const Op = {
            Helper: 16,
            SetNamedVariables: 17,
            SetBlocks: 18,
            SetVariable: 19,
            SetBlock: 20,
            GetVariable: 21,
            GetProperty: 22,
            GetBlock: 23,
            SpreadBlock: 24,
            HasBlock: 25,
            HasBlockParams: 26,
            Concat: 27,
            Constant: 28,
            ConstantReference: 29,
            Primitive: 30,
            PrimitiveReference: 31,
            ReifyU32: 32,
            Dup: 33,
            Pop: 34,
            Load: 35,
            Fetch: 36,
            RootScope: 37,
            VirtualRootScope: 38,
            ChildScope: 39,
            PopScope: 40,
            Text: 41,
            Comment: 42,
            AppendHTML: 43,
            AppendSafeHTML: 44,
            AppendDocumentFragment: 45,
            AppendNode: 46,
            AppendText: 47,
            OpenElement: 48,
            OpenDynamicElement: 49,
            PushRemoteElement: 50,
            StaticAttr: 51,
            DynamicAttr: 52,
            ComponentAttr: 53,
            FlushElement: 54,
            CloseElement: 55,
            PopRemoteElement: 56,
            Modifier: 57,
            BindDynamicScope: 58,
            PushDynamicScope: 59,
            PopDynamicScope: 60,
            CompileBlock: 61,
            PushBlockScope: 62,
            PushSymbolTable: 63,
            InvokeYield: 64,
            JumpIf: 65,
            JumpUnless: 66,
            JumpEq: 67,
            AssertSame: 68,
            Enter: 69,
            Exit: 70,
            ToBoolean: 71,
            EnterList: 72,
            ExitList: 73,
            Iterate: 74,
            Main: 75,
            ContentType: 76,
            Curry: 77,
            PushComponentDefinition: 78,
            PushDynamicComponentInstance: 79,
            ResolveDynamicComponent: 80,
            ResolveCurriedComponent: 81,
            PushArgs: 82,
            PushEmptyArgs: 83,
            PopArgs: 84,
            PrepareArgs: 85,
            CaptureArgs: 86,
            CreateComponent: 87,
            RegisterComponentDestructor: 88,
            PutComponentOperations: 89,
            GetComponentSelf: 90,
            GetComponentTagName: 91,
            GetComponentLayout: 92,
            BindEvalScope: 93,
            SetupForEval: 94,
            PopulateLayout: 95,
            InvokeComponentLayout: 96,
            BeginComponentTransaction: 97,
            CommitComponentTransaction: 98,
            DidCreateElement: 99,
            DidRenderLayout: 100,
            ResolveMaybeLocal: 102,
            Debugger: 103,
            Size: 104,
            StaticComponentAttr: 105,
            DynamicContentType: 106,
            DynamicHelper: 107,
            DynamicModifier: 108,
            IfInline: 109,
            Not: 110,
            GetDynamicVar: 111,
            Log: 112
          };
          function isMachineOp(value) {
            return value >= 0 && value <= 15;
          }
          function isOp(value) {
            return value >= 16;
          }

          /**
           * Registers
           *
           * For the most part, these follows MIPS naming conventions, however the
           * register numbers are different.
           */

          // $0 or $pc (program counter): pointer into `program` for the next insturction; -1 means exit
          const $pc = 0;
          // $1 or $ra (return address): pointer into `program` for the return
          const $ra = 1;
          // $2 or $fp (frame pointer): pointer into the `evalStack` for the base of the stack
          const $fp = 2;
          // $3 or $sp (stack pointer): pointer into the `evalStack` for the top of the stack
          const $sp = 3;
          // $4-$5 or $s0-$s1 (saved): callee saved general-purpose registers
          const $s0 = 4;
          const $s1 = 5;
          // $6-$7 or $t0-$t1 (temporaries): caller saved general-purpose registers
          const $t0 = 6;
          const $t1 = 7;
          // $8 or $v0 (return value)
          const $v0 = 8;
          let MachineRegister = /*#__PURE__*/function (MachineRegister) {
            MachineRegister[MachineRegister["pc"] = 0] = "pc";
            MachineRegister[MachineRegister["ra"] = 1] = "ra";
            MachineRegister[MachineRegister["fp"] = 2] = "fp";
            MachineRegister[MachineRegister["sp"] = 3] = "sp";
            return MachineRegister;
          }({});
          function isLowLevelRegister(register) {
            return register <= $sp;
          }
          let SavedRegister = /*#__PURE__*/function (SavedRegister) {
            SavedRegister[SavedRegister["s0"] = 4] = "s0";
            SavedRegister[SavedRegister["s1"] = 5] = "s1";
            return SavedRegister;
          }({});
          let TemporaryRegister = /*#__PURE__*/function (TemporaryRegister) {
            TemporaryRegister[TemporaryRegister["t0"] = 6] = "t0";
            TemporaryRegister[TemporaryRegister["t1"] = 7] = "t1";
            return TemporaryRegister;
          }({});

          const glimmerVm = /*#__PURE__*/Object.defineProperty({
                    __proto__: null,
                    $fp,
                    $pc,
                    $ra,
                    $s0,
                    $s1,
                    $sp,
                    $t0,
                    $t1,
                    $v0,
                    ARG_SHIFT,
                    ContentType,
                    CurriedType: CurriedTypes,
                    CurriedTypes,
                    InternalComponentCapabilities,
                    InternalComponentCapability: InternalComponentCapabilities,
                    MACHINE_MASK,
                    MAX_SIZE,
                    MachineOp,
                    MachineRegister,
                    OPERAND_LEN_MASK,
                    Op,
                    SavedRegister,
                    TYPE_MASK,
                    TYPE_SIZE,
                    TemporaryRegister,
                    isLowLevelRegister,
                    isMachineOp,
                    isOp
          }, Symbol.toStringTag, { value: 'Module' });

          let HeadKind = /*#__PURE__*/function (HeadKind) {
            HeadKind["Block"] = "Block";
            HeadKind["Call"] = "Call";
            HeadKind["Element"] = "Element";
            HeadKind["AppendPath"] = "AppendPath";
            HeadKind["AppendExpr"] = "AppendExpr";
            HeadKind["Literal"] = "Literal";
            HeadKind["Modifier"] = "Modifier";
            HeadKind["DynamicComponent"] = "DynamicComponent";
            HeadKind["Comment"] = "Comment";
            HeadKind["Splat"] = "Splat";
            HeadKind["Keyword"] = "Keyword";
            return HeadKind;
          }({});
          let VariableKind = /*#__PURE__*/function (VariableKind) {
            VariableKind["Local"] = "Local";
            VariableKind["Free"] = "Free";
            VariableKind["Arg"] = "Arg";
            VariableKind["Block"] = "Block";
            VariableKind["This"] = "This";
            return VariableKind;
          }({});
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
              throw assertNever(statement);
            }
          }
          function normalizeAppendHead(head, trusted) {
            if (head.type === ExpressionKind.GetPath) {
              return {
                kind: HeadKind.AppendPath,
                path: head,
                trusted
              };
            } else {
              return {
                kind: HeadKind.AppendExpr,
                expr: head,
                trusted
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
            const name = statement[0];
            switch (name[0]) {
              case '(':
                {
                  let params = null;
                  let hash = null;
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
                    kind: HeadKind.Call,
                    head: normalizeCallHead(name),
                    params,
                    hash,
                    trusted: false
                  };
                }
              case '#':
                {
                  const {
                    head: path,
                    params,
                    hash,
                    blocks,
                    blockParams
                  } = normalizeBuilderBlockStatement(statement);
                  return {
                    kind: HeadKind.Block,
                    head: path,
                    params,
                    hash,
                    blocks,
                    blockParams
                  };
                }
              case '!':
                {
                  const name = statement[0].slice(1);
                  const {
                    params,
                    hash,
                    blocks,
                    blockParams
                  } = normalizeBuilderBlockStatement(statement);
                  return {
                    kind: HeadKind.Keyword,
                    name,
                    params,
                    hash,
                    blocks,
                    blockParams
                  };
                }
              case '<':
                {
                  let attrs = dict();
                  let block = [];
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
                    kind: HeadKind.Element,
                    name: expect(extractElement(name), `BUG: expected ${name} to look like a tag name`),
                    attrs,
                    block
                  };
                }
              default:
                throw new Error(`Unreachable ${JSON.stringify(statement)} in normalizeSugaryArrayStatement`);
            }
          }
          function normalizeVerboseStatement(statement) {
            switch (statement[0]) {
              case Builder.Literal:
                {
                  return {
                    kind: HeadKind.Literal,
                    value: statement[1]
                  };
                }
              case Builder.Append:
                {
                  return normalizeAppendExpression(statement[1], statement[2]);
                }
              case Builder.Modifier:
                {
                  return {
                    kind: HeadKind.Modifier,
                    params: normalizeParams(statement[1]),
                    hash: normalizeHash(statement[2])
                  };
                }
              case Builder.DynamicComponent:
                {
                  return {
                    kind: HeadKind.DynamicComponent,
                    expr: normalizeExpression(statement[1]),
                    hash: normalizeHash(statement[2]),
                    block: normalizeBlock(statement[3])
                  };
                }
              case Builder.Comment:
                {
                  return {
                    kind: HeadKind.Comment,
                    value: statement[1]
                  };
                }
            }
          }
          function extractBlockHead(name) {
            const result = /^(#|!)(.*)$/u.exec(name);
            if (result === null) {
              throw new Error(`Unexpected missing # in block head`);
            }
            return normalizeDottedPath(result[2]);
          }
          function normalizeCallHead(name) {
            const result = /^\((.*)\)$/u.exec(name);
            if (result === null) {
              throw new Error(`Unexpected missing () in call head`);
            }
            return normalizeDottedPath(result[1]);
          }
          function normalizePath(head, tail = []) {
            const pathHead = normalizePathHead(head);
            if (isPresentArray(tail)) {
              return {
                type: ExpressionKind.GetPath,
                path: {
                  head: pathHead,
                  tail
                }
              };
            } else {
              return {
                type: ExpressionKind.GetVar,
                variable: pathHead
              };
            }
          }
          function normalizeDottedPath(whole) {
            const {
              kind,
              name: rest
            } = normalizePathHead(whole);
            const [name, ...tail] = rest.split('.');
            const variable = {
              kind,
              name,
              mode: 'loose'
            };
            if (isPresentArray(tail)) {
              return {
                type: ExpressionKind.GetPath,
                path: {
                  head: variable,
                  tail
                }
              };
            } else {
              return {
                type: ExpressionKind.GetVar,
                variable
              };
            }
          }
          function normalizePathHead(whole) {
            let kind;
            let name;
            if (/^this(?:\.|$)/u.test(whole)) {
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
              kind,
              name,
              mode: 'loose'
            };
          }
          function normalizeBuilderBlockStatement(statement) {
            const head = statement[0];
            let blocks = dict();
            let params = null;
            let hash = null;
            let blockParams = null;
            if (statement.length === 2) {
              blocks = normalizeBlocks(statement[1]);
            } else if (statement.length === 3) {
              if (Array.isArray(statement[1])) {
                params = normalizeParams(statement[1]);
              } else {
                ({
                  hash,
                  blockParams
                } = normalizeBlockHash(statement[1]));
              }
              blocks = normalizeBlocks(statement[2]);
            } else if (statement.length === 4) {
              params = normalizeParams(statement[1]);
              ({
                hash,
                blockParams
              } = normalizeBlockHash(statement[2]));
              blocks = normalizeBlocks(statement[3]);
            }
            return {
              head: extractBlockHead(head),
              params,
              hash,
              blockParams,
              blocks
            };
          }
          function normalizeBlockHash(hash) {
            if (hash === null) {
              return {
                hash: null,
                blockParams: null
              };
            }
            let out = null;
            let blockParams = null;
            entries(hash, (key, value) => {
              if (key === 'as') {
                blockParams = Array.isArray(value) ? value : [value];
              } else {
                out = out || dict();
                out[key] = normalizeExpression(value);
              }
            });
            return {
              hash: out,
              blockParams
            };
          }
          function entries(dict, callback) {
            Object.keys(dict).forEach(key => {
              const value = dict[key];
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
            return block.map(s => normalizeStatement(s));
          }
          function normalizeAttrs(attrs) {
            return mapObject(attrs, a => normalizeAttr(a).expr);
          }
          function normalizeAttr(attr) {
            if (attr === 'splat') {
              return {
                expr: HeadKind.Splat,
                trusted: false
              };
            } else {
              const expr = normalizeExpression(attr);
              return {
                expr,
                trusted: false
              };
            }
          }
          function mapObject(object, mapper) {
            const out = dict();
            Object.keys(object).forEach(k => {
              out[k] = mapper(object[k], k);
            });
            return out;
          }
          function extractElement(input) {
            const match = /^<([\d\-a-z][\d\-A-Za-z]*)>$/u.exec(input);
            return match?.[1] ?? null;
          }
          let Builder = /*#__PURE__*/function (Builder) {
            Builder[Builder["Literal"] = 0] = "Literal";
            Builder[Builder["Comment"] = 1] = "Comment";
            Builder[Builder["Append"] = 2] = "Append";
            Builder[Builder["Modifier"] = 3] = "Modifier";
            Builder[Builder["DynamicComponent"] = 4] = "DynamicComponent";
            Builder[Builder["Get"] = 5] = "Get";
            Builder[Builder["Concat"] = 6] = "Concat";
            Builder[Builder["HasBlock"] = 7] = "HasBlock";
            Builder[Builder["HasBlockParams"] = 8] = "HasBlockParams";
            return Builder;
          }({});
          let ExpressionKind = /*#__PURE__*/function (ExpressionKind) {
            ExpressionKind["Literal"] = "Literal";
            ExpressionKind["Call"] = "Call";
            ExpressionKind["GetPath"] = "GetPath";
            ExpressionKind["GetVar"] = "GetVar";
            ExpressionKind["Concat"] = "Concat";
            ExpressionKind["HasBlock"] = "HasBlock";
            ExpressionKind["HasBlockParams"] = "HasBlockParams";
            return ExpressionKind;
          }({});
          function normalizeAppendExpression(expression, forceTrusted = false) {
            if (expression === null || expression === undefined) {
              return {
                expr: {
                  type: ExpressionKind.Literal,
                  value: expression
                },
                kind: HeadKind.AppendExpr,
                trusted: false
              };
            } else if (Array.isArray(expression)) {
              switch (expression[0]) {
                case Builder.Literal:
                  return {
                    expr: {
                      type: ExpressionKind.Literal,
                      value: expression[1]
                    },
                    kind: HeadKind.AppendExpr,
                    trusted: false
                  };
                case Builder.Get:
                  {
                    return normalizeAppendHead(normalizePath(expression[1], expression[2]), forceTrusted);
                  }
                case Builder.Concat:
                  {
                    const expr = {
                      type: ExpressionKind.Concat,
                      params: normalizeParams(expression.slice(1))
                    };
                    return {
                      expr,
                      kind: HeadKind.AppendExpr,
                      trusted: forceTrusted
                    };
                  }
                case Builder.HasBlock:
                  return {
                    expr: {
                      type: ExpressionKind.HasBlock,
                      name: expression[1]
                    },
                    kind: HeadKind.AppendExpr,
                    trusted: forceTrusted
                  };
                case Builder.HasBlockParams:
                  return {
                    expr: {
                      type: ExpressionKind.HasBlockParams,
                      name: expression[1]
                    },
                    kind: HeadKind.AppendExpr,
                    trusted: forceTrusted
                  };
                default:
                  {
                    if (isBuilderCallExpression(expression)) {
                      return {
                        expr: normalizeCallExpression(expression),
                        kind: HeadKind.AppendExpr,
                        trusted: forceTrusted
                      };
                    } else {
                      throw new Error(`Unexpected array in expression position (wasn't a tuple expression and ${expression[0]} isn't wrapped in parens, so it isn't a call): ${JSON.stringify(expression)}`);
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
                      type: ExpressionKind.Literal,
                      value: expression
                    },
                    kind: HeadKind.AppendExpr,
                    trusted: true
                  };
                default:
                  throw assertNever(expression);
              }
            } else {
              throw assertNever(expression);
            }
          }
          function normalizeExpression(expression) {
            if (expression === null || expression === undefined) {
              return {
                type: ExpressionKind.Literal,
                value: expression
              };
            } else if (Array.isArray(expression)) {
              switch (expression[0]) {
                case Builder.Literal:
                  return {
                    type: ExpressionKind.Literal,
                    value: expression[1]
                  };
                case Builder.Get:
                  {
                    return normalizePath(expression[1], expression[2]);
                  }
                case Builder.Concat:
                  {
                    const expr = {
                      type: ExpressionKind.Concat,
                      params: normalizeParams(expression.slice(1))
                    };
                    return expr;
                  }
                case Builder.HasBlock:
                  return {
                    type: ExpressionKind.HasBlock,
                    name: expression[1]
                  };
                case Builder.HasBlockParams:
                  return {
                    type: ExpressionKind.HasBlockParams,
                    name: expression[1]
                  };
                default:
                  {
                    if (isBuilderCallExpression(expression)) {
                      return normalizeCallExpression(expression);
                    } else {
                      throw new Error(`Unexpected array in expression position (wasn't a tuple expression and ${expression[0]} isn't wrapped in parens, so it isn't a call): ${JSON.stringify(expression)}`);
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
                    type: ExpressionKind.Literal,
                    value: expression
                  };
                default:
                  throw assertNever(expression);
              }
            } else {
              throw assertNever(expression);
            }
          }
          function statementIsExpression(statement) {
            if (!Array.isArray(statement)) {
              return false;
            }
            const name = statement[0];
            if (typeof name === 'number') {
              switch (name) {
                case Builder.Literal:
                case Builder.Get:
                case Builder.Concat:
                case Builder.HasBlock:
                case Builder.HasBlockParams:
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
                  type: ExpressionKind.Call,
                  head: normalizeCallHead(expr[0]),
                  params: null,
                  hash: null
                };
              case 2:
                {
                  if (Array.isArray(expr[1])) {
                    return {
                      type: ExpressionKind.Call,
                      head: normalizeCallHead(expr[0]),
                      params: normalizeParams(expr[1]),
                      hash: null
                    };
                  } else {
                    return {
                      type: ExpressionKind.Call,
                      head: normalizeCallHead(expr[0]),
                      params: null,
                      hash: normalizeHash(expr[1])
                    };
                  }
                }
              case 3:
                return {
                  type: ExpressionKind.Call,
                  head: normalizeCallHead(expr[0]),
                  params: normalizeParams(expr[1]),
                  hash: normalizeHash(expr[2])
                };
            }
          }
          class ProgramSymbols {
            _freeVariables = [];
            _symbols = ['this'];
            top = this;
            toSymbols() {
              return this._symbols.slice(1);
            }
            toUpvars() {
              return this._freeVariables;
            }
            freeVar(name) {
              return addString(this._freeVariables, name);
            }
            block(name) {
              return this.symbol(name);
            }
            arg(name) {
              return addString(this._symbols, name);
            }
            local(name) {
              throw new Error(`No local ${name} was found. Maybe you meant ^${name} for upvar, or !${name} for keyword?`);
            }
            this() {
              return 0;
            }
            hasLocal(_name) {
              return false;
            }

            // any symbol
            symbol(name) {
              return addString(this._symbols, name);
            }
            child(locals) {
              return new LocalSymbols(this, locals);
            }
          }
          class LocalSymbols {
            locals = dict();
            constructor(parent, locals) {
              this.parent = parent;
              for (let local of locals) {
                this.locals[local] = parent.top.symbol(local);
              }
            }
            get paramSymbols() {
              return values(this.locals);
            }
            get top() {
              return this.parent.top;
            }
            freeVar(name) {
              return this.parent.freeVar(name);
            }
            arg(name) {
              return this.parent.arg(name);
            }
            block(name) {
              return this.parent.block(name);
            }
            local(name) {
              if (name in this.locals) {
                return this.locals[name];
              } else {
                return this.parent.local(name);
              }
            }
            this() {
              return this.parent.this();
            }
            hasLocal(name) {
              if (name in this.locals) {
                return true;
              } else {
                return this.parent.hasLocal(name);
              }
            }
            child(locals) {
              return new LocalSymbols(this, locals);
            }
          }
          function addString(array, item) {
            let index = array.indexOf(item);
            if (index === -1) {
              index = array.length;
              array.push(item);
              return index;
            } else {
              return index;
            }
          }
          function unimpl(message) {
            return new Error(`unimplemented ${message}`);
          }
          function buildStatements(statements, symbols) {
            let out = [];
            statements.forEach(s => out.push(...buildStatement(normalizeStatement(s), symbols)));
            return out;
          }
          function buildNormalizedStatements(statements, symbols) {
            let out = [];
            statements.forEach(s => out.push(...buildStatement(s, symbols)));
            return out;
          }
          function buildStatement(normalized, symbols = new ProgramSymbols()) {
            switch (normalized.kind) {
              case HeadKind.AppendPath:
                {
                  return [[normalized.trusted ? opcodes.TrustingAppend : opcodes.Append, buildGetPath(normalized.path, symbols)]];
                }
              case HeadKind.AppendExpr:
                {
                  return [[normalized.trusted ? opcodes.TrustingAppend : opcodes.Append, buildExpression(normalized.expr, normalized.trusted ? 'TrustedAppend' : 'Append', symbols)]];
                }
              case HeadKind.Call:
                {
                  let {
                    head: path,
                    params,
                    hash,
                    trusted
                  } = normalized;
                  let builtParams = params ? buildParams(params, symbols) : null;
                  let builtHash = hash ? buildHash(hash, symbols) : null;
                  let builtExpr = buildCallHead(path, trusted ? resolution.ResolveAsHelperHead : resolution.ResolveAsComponentOrHelperHead, symbols);
                  return [[trusted ? opcodes.TrustingAppend : opcodes.Append, [opcodes.Call, builtExpr, builtParams, builtHash]]];
                }
              case HeadKind.Literal:
                {
                  return [[opcodes.Append, normalized.value]];
                }
              case HeadKind.Comment:
                {
                  return [[opcodes.Comment, normalized.value]];
                }
              case HeadKind.Block:
                {
                  let blocks = buildBlocks(normalized.blocks, normalized.blockParams, symbols);
                  let hash = buildHash(normalized.hash, symbols);
                  let params = buildParams(normalized.params, symbols);
                  let path = buildCallHead(normalized.head, resolution.ResolveAsComponentHead, symbols);
                  return [[opcodes.Block, path, params, hash, blocks]];
                }
              case HeadKind.Keyword:
                {
                  return [buildKeyword(normalized, symbols)];
                }
              case HeadKind.Element:
                return buildElement(normalized, symbols);
              case HeadKind.Modifier:
                throw unimpl('modifier');
              case HeadKind.DynamicComponent:
                throw unimpl('dynamic component');
              default:
                throw assertNever(normalized);
            }
          }
          function s(arr, ...interpolated) {
            let result = arr.reduce((result, string, i) => result + `${string}${interpolated[i] ? String(interpolated[i]) : ''}`, '');
            return [Builder.Literal, result];
          }
          function c(arr, ...interpolated) {
            let result = arr.reduce((result, string, i) => result + `${string}${interpolated[i] ? String(interpolated[i]) : ''}`, '');
            return [Builder.Comment, result];
          }
          function unicode(charCode) {
            return String.fromCharCode(parseInt(charCode, 16));
          }
          const NEWLINE = '\n';
          function buildKeyword(normalized, symbols) {
            let {
              name
            } = normalized;
            let params = buildParams(normalized.params, symbols);
            let childSymbols = symbols.child(normalized.blockParams || []);
            let block = buildBlock(normalized.blocks['default'], childSymbols, childSymbols.paramSymbols);
            let inverse = normalized.blocks['else'] ? buildBlock(normalized.blocks['else'], symbols, []) : null;
            switch (name) {
              case 'let':
                return [opcodes.Let, expect(params, 'let requires params'), block];
              case 'if':
                return [opcodes.If, expect(params, 'if requires params')[0], block, inverse];
              case 'each':
                {
                  let keyExpr = normalized.hash ? normalized.hash['key'] : null;
                  let key = keyExpr ? buildExpression(keyExpr, 'Strict', symbols) : null;
                  return [opcodes.Each, expect(params, 'if requires params')[0], key, block, inverse];
                }
              default:
                throw new Error('unimplemented keyword');
            }
          }
          function buildElement({
            name,
            attrs,
            block
          }, symbols) {
            let out = [hasSplat(attrs) ? [opcodes.OpenElementWithSplat, name] : [opcodes.OpenElement, name]];
            if (attrs) {
              let {
                params,
                args
              } = buildElementParams(attrs, symbols);
              out.push(...params);
              debugAssert(args === null, `Can't pass args to a simple element`);
            }
            out.push([opcodes.FlushElement]);
            if (Array.isArray(block)) {
              block.forEach(s => out.push(...buildStatement(s, symbols)));
            } else if (block === null) ;else {
              throw assertNever(block);
            }
            out.push([opcodes.CloseElement]);
            return out;
          }
          function hasSplat(attrs) {
            if (attrs === null) return false;
            return Object.keys(attrs).some(a => attrs[a] === HeadKind.Splat);
          }
          function buildElementParams(attrs, symbols) {
            let params = [];
            let keys = [];
            let values = [];
            for (const [key, value] of Object.entries(attrs)) {
              if (value === HeadKind.Splat) {
                params.push([opcodes.AttrSplat, symbols.block('&attrs')]);
              } else if (key[0] === '@') {
                keys.push(key);
                values.push(buildExpression(value, 'Strict', symbols));
              } else {
                params.push(...buildAttributeValue(key, value,
                // TODO: extract namespace from key
                extractNamespace(key), symbols));
              }
            }
            return {
              params,
              args: isPresentArray(keys) && isPresentArray(values) ? [keys, values] : null
            };
          }
          function extractNamespace(name) {
            if (name === 'xmlns') {
              return NS_XMLNS;
            }
            let match = /^([^:]*):([^:]*)$/u.exec(name);
            if (match === null) {
              return null;
            }
            let namespace = match[1];
            switch (namespace) {
              case 'xlink':
                return NS_XLINK;
              case 'xml':
                return NS_XML;
              case 'xmlns':
                return NS_XMLNS;
            }
            return null;
          }
          function buildAttributeValue(name, value, namespace, symbols) {
            switch (value.type) {
              case ExpressionKind.Literal:
                {
                  let val = value.value;
                  if (val === false) {
                    return [];
                  } else if (val === true) {
                    return [[opcodes.StaticAttr, name, '', namespace ?? undefined]];
                  } else if (typeof val === 'string') {
                    return [[opcodes.StaticAttr, name, val, namespace ?? undefined]];
                  } else {
                    throw new Error(`Unexpected/unimplemented literal attribute ${JSON.stringify(val)}`);
                  }
                }
              default:
                return [[opcodes.DynamicAttr, name, buildExpression(value, 'AttrValue', symbols), namespace ?? undefined]];
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
              case ExpressionKind.GetPath:
                {
                  return buildGetPath(expr, symbols);
                }
              case ExpressionKind.GetVar:
                {
                  return buildVar(expr.variable, varContext(context, true), symbols);
                }
              case ExpressionKind.Concat:
                {
                  return [opcodes.Concat, buildConcat(expr.params, symbols)];
                }
              case ExpressionKind.Call:
                {
                  let builtParams = buildParams(expr.params, symbols);
                  let builtHash = buildHash(expr.hash, symbols);
                  let builtExpr = buildCallHead(expr.head, context === 'Strict' ? 'SubExpression' : varContext(context, false), symbols);
                  return [opcodes.Call, builtExpr, builtParams, builtHash];
                }
              case ExpressionKind.HasBlock:
                {
                  return [opcodes.HasBlock, buildVar({
                    kind: VariableKind.Block,
                    name: expr.name,
                    mode: 'loose'
                  }, resolution.Strict, symbols)];
                }
              case ExpressionKind.HasBlockParams:
                {
                  return [opcodes.HasBlockParams, buildVar({
                    kind: VariableKind.Block,
                    name: expr.name,
                    mode: 'loose'
                  }, resolution.Strict, symbols)];
                }
              case ExpressionKind.Literal:
                {
                  if (expr.value === undefined) {
                    return [opcodes.Undefined];
                  } else {
                    return expr.value;
                  }
                }
              default:
                assertNever(expr);
            }
          }
          function buildCallHead(callHead, context, symbols) {
            if (callHead.type === ExpressionKind.GetVar) {
              return buildVar(callHead.variable, context, symbols);
            } else {
              return buildGetPath(callHead, symbols);
            }
          }
          function buildGetPath(head, symbols) {
            return buildVar(head.path.head, resolution.Strict, symbols, head.path.tail);
          }
          function buildVar(head, context, symbols, path) {
            let op = opcodes.GetSymbol;
            let sym;
            switch (head.kind) {
              case VariableKind.Free:
                if (context === 'Strict') {
                  op = opcodes.GetStrictKeyword;
                } else if (context === 'AppendBare') {
                  op = opcodes.GetFreeAsComponentOrHelperHead;
                } else if (context === 'AppendInvoke') {
                  op = opcodes.GetFreeAsComponentOrHelperHead;
                } else if (context === 'TrustedAppendBare') {
                  op = opcodes.GetFreeAsHelperHead;
                } else if (context === 'TrustedAppendInvoke') {
                  op = opcodes.GetFreeAsHelperHead;
                } else if (context === 'AttrValueBare') {
                  op = opcodes.GetFreeAsHelperHead;
                } else if (context === 'AttrValueInvoke') {
                  op = opcodes.GetFreeAsHelperHead;
                } else if (context === 'SubExpression') {
                  op = opcodes.GetFreeAsHelperHead;
                } else {
                  op = expressionContextOp(context);
                }
                sym = symbols.freeVar(head.name);
                break;
              default:
                op = opcodes.GetSymbol;
                sym = getSymbolForVar(head.kind, symbols, head.name);
            }
            if (path === undefined || path.length === 0) {
              return [op, sym];
            } else {
              debugAssert(op !== opcodes.GetStrictKeyword, '[BUG] keyword with a path');
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
                return exhausted(kind);
            }
          }
          function expressionContextOp(context) {
            switch (context) {
              case resolution.Strict:
                return opcodes.GetStrictKeyword;
              case resolution.ResolveAsComponentOrHelperHead:
                return opcodes.GetFreeAsComponentOrHelperHead;
              case resolution.ResolveAsHelperHead:
                return opcodes.GetFreeAsHelperHead;
              case resolution.ResolveAsModifierHead:
                return opcodes.GetFreeAsModifierHead;
              case resolution.ResolveAsComponentHead:
                return opcodes.GetFreeAsComponentHead;
              default:
                return exhausted(context);
            }
          }
          function buildParams(exprs, symbols) {
            if (exprs === null || !isPresentArray(exprs)) return null;
            return exprs.map(e => buildExpression(e, 'Strict', symbols));
          }
          function buildConcat(exprs, symbols) {
            return exprs.map(e => buildExpression(e, 'AttrValue', symbols));
          }
          function buildHash(exprs, symbols) {
            if (exprs === null) return null;
            let out = [[], []];
            for (const [key, value] of Object.entries(exprs)) {
              out[0].push(key);
              out[1].push(buildExpression(value, 'Strict', symbols));
            }
            return out;
          }
          function buildBlocks(blocks, blockParams, parent) {
            let keys = [];
            let values = [];
            for (const [name, block] of Object.entries(blocks)) {
              keys.push(name);
              if (name === 'default') {
                let symbols = parent.child(blockParams || []);
                values.push(buildBlock(block, symbols, symbols.paramSymbols));
              } else {
                values.push(buildBlock(block, parent, []));
              }
            }
            return [keys, values];
          }
          function buildBlock(block, symbols, locals = []) {
            return [buildNormalizedStatements(block, symbols), locals];
          }
          class Template extends node('Template').fields() {}
          class InElement extends node('InElement').fields() {}
          class Not extends node('Not').fields() {}
          class If extends node('If').fields() {}
          class IfInline extends node('IfInline').fields() {}
          class Each extends node('Each').fields() {}
          class Let extends node('Let').fields() {}
          class WithDynamicVars extends node('WithDynamicVars').fields() {}
          class GetDynamicVar extends node('GetDynamicVar').fields() {}
          class Log extends node('Log').fields() {}
          class InvokeComponent extends node('InvokeComponent').fields() {}
          class NamedBlocks extends node('NamedBlocks').fields() {}
          class NamedBlock extends node('NamedBlock').fields() {}
          class AppendTrustedHTML extends node('AppendTrustedHTML').fields() {}
          class AppendTextNode extends node('AppendTextNode').fields() {}
          class AppendComment extends node('AppendComment').fields() {}
          class Component extends node('Component').fields() {}
          class StaticAttr extends node('StaticAttr').fields() {}
          class DynamicAttr extends node('DynamicAttr').fields() {}
          class SimpleElement extends node('SimpleElement').fields() {}
          class ElementParameters extends node('ElementParameters').fields() {}
          class Yield extends node('Yield').fields() {}
          class Debugger extends node('Debugger').fields() {}
          class CallExpression extends node('CallExpression').fields() {}
          class Modifier extends node('Modifier').fields() {}
          class InvokeBlock extends node('InvokeBlock').fields() {}
          class SplatAttr extends node('SplatAttr').fields() {}
          class PathExpression extends node('PathExpression').fields() {}
          class Missing extends node('Missing').fields() {}
          class InterpolateExpression extends node('InterpolateExpression').fields() {}
          class HasBlock extends node('HasBlock').fields() {}
          class HasBlockParams extends node('HasBlockParams').fields() {}
          class Curry extends node('Curry').fields() {}
          class Positional extends node('Positional').fields() {}
          class NamedArguments extends node('NamedArguments').fields() {}
          class NamedArgument extends node('NamedArgument').fields() {}
          class Args extends node('Args').fields() {}
          class Tail extends node('Tail').fields() {}
          class PresentList {
            constructor(list) {
              this.list = list;
            }
            toArray() {
              return this.list;
            }
            map(callback) {
              let result = mapPresentArray(this.list, callback);
              return new PresentList(result);
            }
            filter(predicate) {
              let out = [];
              for (let item of this.list) {
                if (predicate(item)) {
                  out.push(item);
                }
              }
              return OptionalList(out);
            }
            toPresentArray() {
              return this.list;
            }
            into({
              ifPresent
            }) {
              return ifPresent(this);
            }
          }
          class EmptyList {
            list = [];
            map(_callback) {
              return new EmptyList();
            }
            filter(_predicate) {
              return new EmptyList();
            }
            toArray() {
              return this.list;
            }
            toPresentArray() {
              return null;
            }
            into({
              ifEmpty
            }) {
              return ifEmpty();
            }
          }

          // export type OptionalList<T> = PresentList<T> | EmptyList<T>;

          function OptionalList(value) {
            if (isPresentArray(value)) {
              return new PresentList(value);
            } else {
              return new EmptyList();
            }
          }
          class ResultImpl {
            static all(...results) {
              let out = [];
              for (let result of results) {
                if (result.isErr) {
                  return result.cast();
                } else {
                  out.push(result.value);
                }
              }
              return Ok(out);
            }
          }
          const Result = ResultImpl;
          class OkImpl extends ResultImpl {
            isOk = true;
            isErr = false;
            constructor(value) {
              super();
              this.value = value;
            }
            expect(_message) {
              return this.value;
            }
            ifOk(callback) {
              callback(this.value);
              return this;
            }
            andThen(callback) {
              return callback(this.value);
            }
            mapOk(callback) {
              return Ok(callback(this.value));
            }
            ifErr(_callback) {
              return this;
            }
            mapErr(_callback) {
              return this;
            }
          }
          class ErrImpl extends ResultImpl {
            isOk = false;
            isErr = true;
            constructor(reason) {
              super();
              this.reason = reason;
            }
            expect(message) {
              throw new Error(message || 'expected an Ok, got Err');
            }
            andThen(_callback) {
              return this.cast();
            }
            mapOk(_callback) {
              return this.cast();
            }
            ifOk(_callback) {
              return this;
            }
            mapErr(callback) {
              return Err(callback(this.reason));
            }
            ifErr(callback) {
              callback(this.reason);
              return this;
            }
            cast() {
              return this;
            }
          }
          function Ok(value) {
            return new OkImpl(value);
          }
          function Err(reason) {
            return new ErrImpl(reason);
          }
          class ResultArray {
            constructor(items = []) {
              this.items = items;
            }
            add(item) {
              this.items.push(item);
            }
            toArray() {
              let err = this.items.filter(item => item instanceof ErrImpl)[0];
              if (err !== undefined) {
                return err.cast();
              } else {
                return Ok(this.items.map(item => item.value));
              }
            }
            toOptionalList() {
              return this.toArray().mapOk(arr => OptionalList(arr));
            }
          }
          class NormalizeExpressions {
            visit(node, state) {
              switch (node.type) {
                case 'Literal':
                  return Ok(this.Literal(node));
                case 'Keyword':
                  return Ok(this.Keyword(node));
                case 'Interpolate':
                  return this.Interpolate(node, state);
                case 'Path':
                  return this.PathExpression(node);
                case 'Call':
                  {
                    let translated = CALL_KEYWORDS.translate(node, state);
                    if (translated !== null) {
                      return translated;
                    }
                    return this.CallExpression(node, state);
                  }
              }
            }
            visitList(nodes, state) {
              return new ResultArray(nodes.map(e => VISIT_EXPRS.visit(e, state))).toOptionalList();
            }

            /**
             * Normalize paths into `hir.Path` or a `hir.Expr` that corresponds to the ref.
             *
             * TODO since keywords don't support tails anyway, distinguish PathExpression from
             * VariableReference in ASTv2.
             */
            PathExpression(path) {
              let ref = this.VariableReference(path.ref);
              let {
                tail
              } = path;
              if (isPresentArray(tail)) {
                let tailLoc = tail[0].loc.extend(getLast(tail).loc);
                return Ok(new PathExpression({
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
            }
            VariableReference(ref) {
              return ref;
            }
            Literal(literal) {
              return literal;
            }
            Keyword(keyword) {
              return keyword;
            }
            Interpolate(expr, state) {
              let parts = expr.parts.map(convertPathToCallIfKeyword);
              return VISIT_EXPRS.visitList(parts, state).mapOk(parts => new InterpolateExpression({
                loc: expr.loc,
                parts: parts
              }));
            }
            CallExpression(expr, state) {
              if (expr.callee.type === 'Call') {
                throw new Error(`unimplemented: subexpression at the head of a subexpression`);
              } else {
                return Result.all(VISIT_EXPRS.visit(expr.callee, state), VISIT_EXPRS.Args(expr.args, state)).mapOk(([callee, args]) => new CallExpression({
                  loc: expr.loc,
                  callee,
                  args
                }));
              }
            }
            Args({
              positional,
              named,
              loc
            }, state) {
              return Result.all(this.Positional(positional, state), this.NamedArguments(named, state)).mapOk(([positional, named]) => new Args({
                loc,
                positional,
                named
              }));
            }
            Positional(positional, state) {
              return VISIT_EXPRS.visitList(positional.exprs, state).mapOk(list => new Positional({
                loc: positional.loc,
                list
              }));
            }
            NamedArguments(named, state) {
              let pairs = named.entries.map(arg => {
                let value = convertPathToCallIfKeyword(arg.value);
                return VISIT_EXPRS.visit(value, state).mapOk(value => new NamedArgument({
                  loc: arg.loc,
                  key: arg.name,
                  value
                }));
              });
              return new ResultArray(pairs).toOptionalList().mapOk(pairs => new NamedArguments({
                loc: named.loc,
                entries: pairs
              }));
            }
          }
          function convertPathToCallIfKeyword(path) {
            if (path.type === 'Path' && path.ref.type === 'Free' && path.ref.name in KEYWORDS_TYPES) {
              return new api$1.CallExpression({
                callee: path,
                args: api$1.Args.empty(path.loc),
                loc: path.loc
              });
            }
            return path;
          }
          const VISIT_EXPRS = new NormalizeExpressions();
          class KeywordImpl {
            types;
            constructor(keyword, type, delegate) {
              this.keyword = keyword;
              this.delegate = delegate;
              let nodes = new Set();
              for (let nodeType of KEYWORD_NODES[type]) {
                nodes.add(nodeType);
              }
              this.types = nodes;
            }
            match(node) {
              if (!this.types.has(node.type)) {
                return false;
              }
              let path = getCalleeExpression(node);
              if (path !== null && path.type === 'Path' && path.ref.type === 'Free') {
                return path.ref.name === this.keyword;
              } else {
                return false;
              }
            }
            translate(node, state) {
              if (this.match(node)) {
                let path = getCalleeExpression(node);
                if (path !== null && path.type === 'Path' && path.tail.length > 0) {
                  return Err(generateSyntaxError(`The \`${this.keyword}\` keyword was used incorrectly. It was used as \`${path.loc.asString()}\`, but it cannot be used with additional path segments. \n\nError caused by`, node.loc));
                }
                let param = this.delegate.assert(node, state);
                return param.andThen(param => this.delegate.translate({
                  node,
                  state
                }, param));
              } else {
                return null;
              }
            }
          }
          const KEYWORD_NODES = {
            Call: ['Call'],
            Block: ['InvokeBlock'],
            Append: ['AppendContent'],
            Modifier: ['ElementModifier']
          };

          /**
           * A "generic" keyword is something like `has-block`, which makes sense in the context
           * of sub-expression or append
           */

          function keyword(keyword, type, delegate) {
            return new KeywordImpl(keyword, type, delegate);
          }
          function getCalleeExpression(node) {
            switch (node.type) {
              // This covers the inside of attributes and expressions, as well as the callee
              // of call nodes
              case 'Path':
                return node;
              case 'AppendContent':
                return getCalleeExpression(node.value);
              case 'Call':
              case 'InvokeBlock':
              case 'ElementModifier':
                return node.callee;
              default:
                return null;
            }
          }
          class Keywords {
            _keywords = [];
            _type;
            constructor(type) {
              this._type = type;
            }
            kw(name, delegate) {
              this._keywords.push(keyword(name, this._type, delegate));
              return this;
            }
            translate(node, state) {
              for (let keyword of this._keywords) {
                let result = keyword.translate(node, state);
                if (result !== null) {
                  return result;
                }
              }
              let path = getCalleeExpression(node);
              if (path && path.type === 'Path' && path.ref.type === 'Free' && isKeyword(path.ref.name)) {
                let {
                  name
                } = path.ref;
                let usedType = this._type;
                let validTypes = KEYWORDS_TYPES[name];
                if (!validTypes.includes(usedType)) {
                  return Err(generateSyntaxError(`The \`${name}\` keyword was used incorrectly. It was used as ${typesToReadableName[usedType]}, but its valid usages are:\n\n${generateTypesMessage(name, validTypes)}\n\nError caused by`, node.loc));
                }
              }
              return null;
            }
          }
          const typesToReadableName = {
            Append: 'an append statement',
            Block: 'a block statement',
            Call: 'a call expression',
            Modifier: 'a modifier'
          };
          function generateTypesMessage(name, types) {
            return types.map(type => {
              switch (type) {
                case 'Append':
                  return `- As an append statement, as in: {{${name}}}`;
                case 'Block':
                  return `- As a block statement, as in: {{#${name}}}{{/${name}}}`;
                case 'Call':
                  return `- As an expression, as in: (${name})`;
                case 'Modifier':
                  return `- As a modifier, as in: <div {{${name}}}></div>`;
                default:
                  return exhausted(type);
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
          function toAppend({
            assert,
            translate
          }) {
            return {
              assert,
              translate({
                node,
                state
              }, value) {
                let result = translate({
                  node,
                  state
                }, value);
                return result.mapOk(text => new AppendTextNode({
                  text,
                  loc: node.loc
                }));
              }
            };
          }
          const CurriedTypeToReadableType = {
            [CurriedTypes.Component]: 'component',
            [CurriedTypes.Helper]: 'helper',
            [CurriedTypes.Modifier]: 'modifier'
          };
          function assertCurryKeyword(curriedType) {
            return (node, state) => {
              let readableType = CurriedTypeToReadableType[curriedType];
              let stringsAllowed = curriedType === CurriedTypes.Component;
              let {
                args
              } = node;
              let definition = args.nth(0);
              if (definition === null) {
                return Err(generateSyntaxError(`(${readableType}) requires a ${readableType} definition or identifier as its first positional parameter, did not receive any parameters.`, args.loc));
              }
              if (definition.type === 'Literal') {
                if (stringsAllowed && state.isStrict) {
                  return Err(generateSyntaxError(`(${readableType}) cannot resolve string values in strict mode templates`, node.loc));
                } else if (!stringsAllowed) {
                  return Err(generateSyntaxError(`(${readableType}) cannot resolve string values, you must pass a ${readableType} definition directly`, node.loc));
                }
              }
              args = new api$1.Args({
                positional: new api$1.PositionalArguments({
                  exprs: args.positional.exprs.slice(1),
                  loc: args.positional.loc
                }),
                named: args.named,
                loc: args.loc
              });
              return Ok({
                definition,
                args
              });
            };
          }
          function translateCurryKeyword(curriedType) {
            return ({
              node,
              state
            }, {
              definition,
              args
            }) => {
              let definitionResult = VISIT_EXPRS.visit(definition, state);
              let argsResult = VISIT_EXPRS.Args(args, state);
              return Result.all(definitionResult, argsResult).mapOk(([definition, args]) => new Curry({
                loc: node.loc,
                curriedType,
                definition,
                args
              }));
            };
          }
          function curryKeyword(curriedType) {
            return {
              assert: assertCurryKeyword(curriedType),
              translate: translateCurryKeyword(curriedType)
            };
          }
          function assertGetDynamicVarKeyword(node) {
            let call = node.type === 'AppendContent' ? node.value : node;
            let named = call.type === 'Call' ? call.args.named : null;
            let positionals = call.type === 'Call' ? call.args.positional : null;
            if (named && !named.isEmpty()) {
              return Err(generateSyntaxError(`(-get-dynamic-vars) does not take any named arguments`, node.loc));
            }
            let varName = positionals?.nth(0);
            if (!varName) {
              return Err(generateSyntaxError(`(-get-dynamic-vars) requires a var name to get`, node.loc));
            }
            if (positionals && positionals.size > 1) {
              return Err(generateSyntaxError(`(-get-dynamic-vars) only receives one positional arg`, node.loc));
            }
            return Ok(varName);
          }
          function translateGetDynamicVarKeyword({
            node,
            state
          }, name) {
            return VISIT_EXPRS.visit(name, state).mapOk(name => new GetDynamicVar({
              name,
              loc: node.loc
            }));
          }
          const getDynamicVarKeyword = {
            assert: assertGetDynamicVarKeyword,
            translate: translateGetDynamicVarKeyword
          };
          function assertHasBlockKeyword(type) {
            return node => {
              let call = node.type === 'AppendContent' ? node.value : node;
              let named = call.type === 'Call' ? call.args.named : null;
              let positionals = call.type === 'Call' ? call.args.positional : null;
              if (named && !named.isEmpty()) {
                return Err(generateSyntaxError(`(${type}) does not take any named arguments`, call.loc));
              }
              if (!positionals || positionals.isEmpty()) {
                return Ok(SourceSlice.synthetic('default'));
              } else if (positionals.exprs.length === 1) {
                let positional = positionals.exprs[0];
                if (api$1.isLiteral(positional, 'string')) {
                  return Ok(positional.toSlice());
                } else {
                  return Err(generateSyntaxError(`(${type}) can only receive a string literal as its first argument`, call.loc));
                }
              } else {
                return Err(generateSyntaxError(`(${type}) only takes a single positional argument`, call.loc));
              }
            };
          }
          function translateHasBlockKeyword(type) {
            return ({
              node,
              state: {
                scope
              }
            }, target) => {
              let block = type === 'has-block' ? new HasBlock({
                loc: node.loc,
                target,
                symbol: scope.allocateBlock(target.chars)
              }) : new HasBlockParams({
                loc: node.loc,
                target,
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
            return originalNode => {
              let inverted = type === 'unless';
              let node = originalNode.type === 'AppendContent' ? originalNode.value : originalNode;
              let named = node.type === 'Call' ? node.args.named : null;
              let positional = node.type === 'Call' ? node.args.positional : null;
              if (named && !named.isEmpty()) {
                return Err(generateSyntaxError(`(${type}) cannot receive named parameters, received ${named.entries.map(e => e.name.chars).join(', ')}`, originalNode.loc));
              }
              let condition = positional?.nth(0);
              if (!positional || !condition) {
                return Err(generateSyntaxError(`When used inline, (${type}) requires at least two parameters 1. the condition that determines the state of the (${type}), and 2. the value to return if the condition is ${inverted ? 'false' : 'true'}. Did not receive any parameters`, originalNode.loc));
              }
              let truthy = positional.nth(1);
              let falsy = positional.nth(2);
              if (truthy === null) {
                return Err(generateSyntaxError(`When used inline, (${type}) requires at least two parameters 1. the condition that determines the state of the (${type}), and 2. the value to return if the condition is ${inverted ? 'false' : 'true'}. Received only one parameter, the condition`, originalNode.loc));
              }
              if (positional.size > 3) {
                return Err(generateSyntaxError(`When used inline, (${type}) can receive a maximum of three positional parameters 1. the condition that determines the state of the (${type}), 2. the value to return if the condition is ${inverted ? 'false' : 'true'}, and 3. the value to return if the condition is ${inverted ? 'true' : 'false'}. Received ${positional?.size ?? 0} parameters`, originalNode.loc));
              }
              return Ok({
                condition,
                truthy,
                falsy
              });
            };
          }
          function translateIfUnlessInlineKeyword(type) {
            let inverted = type === 'unless';
            return ({
              node,
              state
            }, {
              condition,
              truthy,
              falsy
            }) => {
              let conditionResult = VISIT_EXPRS.visit(condition, state);
              let truthyResult = VISIT_EXPRS.visit(truthy, state);
              let falsyResult = falsy ? VISIT_EXPRS.visit(falsy, state) : Ok(null);
              return Result.all(conditionResult, truthyResult, falsyResult).mapOk(([condition, truthy, falsy]) => {
                if (inverted) {
                  condition = new Not({
                    value: condition,
                    loc: node.loc
                  });
                }
                return new IfInline({
                  loc: node.loc,
                  condition,
                  truthy,
                  falsy
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
          function assertLogKeyword(node) {
            let {
              args: {
                named,
                positional
              }
            } = node;
            if (named && !named.isEmpty()) {
              return Err(generateSyntaxError(`(log) does not take any named arguments`, node.loc));
            }
            return Ok(positional);
          }
          function translateLogKeyword({
            node,
            state
          }, positional) {
            return VISIT_EXPRS.Positional(positional, state).mapOk(positional => new Log({
              positional,
              loc: node.loc
            }));
          }
          const logKeyword = {
            assert: assertLogKeyword,
            translate: translateLogKeyword
          };
          const APPEND_KEYWORDS = keywords('Append').kw('has-block', toAppend(hasBlockKeyword('has-block'))).kw('has-block-params', toAppend(hasBlockKeyword('has-block-params'))).kw('-get-dynamic-var', toAppend(getDynamicVarKeyword)).kw('log', toAppend(logKeyword)).kw('if', toAppend(ifUnlessInlineKeyword('if'))).kw('unless', toAppend(ifUnlessInlineKeyword('unless'))).kw('yield', {
            assert(node) {
              let {
                args
              } = node;
              if (args.named.isEmpty()) {
                return Ok({
                  target: api$2.SourceSpan.synthetic('default').toSlice(),
                  positional: args.positional
                });
              } else {
                let target = args.named.get('to');
                if (args.named.size > 1 || target === null) {
                  return Err(generateSyntaxError(`yield only takes a single named argument: 'to'`, args.named.loc));
                }
                if (api$1.isLiteral(target, 'string')) {
                  return Ok({
                    target: target.toSlice(),
                    positional: args.positional
                  });
                } else {
                  return Err(generateSyntaxError(`you can only yield to a literal string value`, target.loc));
                }
              }
            },
            translate({
              node,
              state
            }, {
              target,
              positional
            }) {
              return VISIT_EXPRS.Positional(positional, state).mapOk(positional => new Yield({
                loc: node.loc,
                target,
                to: state.scope.allocateBlock(target.chars),
                positional
              }));
            }
          }).kw('debugger', {
            assert(node) {
              let {
                args
              } = node;
              let {
                positional
              } = args;
              if (args.isEmpty()) {
                return Ok(undefined);
              } else {
                if (positional.isEmpty()) {
                  return Err(generateSyntaxError(`debugger does not take any named arguments`, node.loc));
                } else {
                  return Err(generateSyntaxError(`debugger does not take any positional arguments`, node.loc));
                }
              }
            },
            translate({
              node,
              state: {
                scope
              }
            }) {
              scope.setHasDebugger();
              return Ok(new Debugger({
                loc: node.loc,
                scope
              }));
            }
          }).kw('component', {
            assert: assertCurryKeyword(CurriedTypes.Component),
            translate({
              node,
              state
            }, {
              definition,
              args
            }) {
              let definitionResult = VISIT_EXPRS.visit(definition, state);
              let argsResult = VISIT_EXPRS.Args(args, state);
              return Result.all(definitionResult, argsResult).mapOk(([definition, args]) => new InvokeComponent({
                loc: node.loc,
                definition,
                args,
                blocks: null
              }));
            }
          }).kw('helper', {
            assert: assertCurryKeyword(CurriedTypes.Helper),
            translate({
              node,
              state
            }, {
              definition,
              args
            }) {
              let definitionResult = VISIT_EXPRS.visit(definition, state);
              let argsResult = VISIT_EXPRS.Args(args, state);
              return Result.all(definitionResult, argsResult).mapOk(([definition, args]) => {
                let text = new CallExpression({
                  callee: definition,
                  args,
                  loc: node.loc
                });
                return new AppendTextNode({
                  loc: node.loc,
                  text
                });
              });
            }
          });
          const BLOCK_KEYWORDS = keywords('Block').kw('in-element', {
            assert(node) {
              let {
                args
              } = node;
              let guid = args.get('guid');
              if (guid) {
                return Err(generateSyntaxError(`Cannot pass \`guid\` to \`{{#in-element}}\``, guid.loc));
              }
              let insertBefore = args.get('insertBefore');
              let destination = args.nth(0);
              if (destination === null) {
                return Err(generateSyntaxError(`{{#in-element}} requires a target element as its first positional parameter`, args.loc));
              }

              // TODO Better syntax checks

              return Ok({
                insertBefore,
                destination
              });
            },
            translate({
              node,
              state
            }, {
              insertBefore,
              destination
            }) {
              let named = node.blocks.get('default');
              let body = VISIT_STMTS.NamedBlock(named, state);
              let destinationResult = VISIT_EXPRS.visit(destination, state);
              return Result.all(body, destinationResult).andThen(([body, destination]) => {
                if (insertBefore) {
                  return VISIT_EXPRS.visit(insertBefore, state).mapOk(insertBefore => ({
                    body,
                    destination,
                    insertBefore
                  }));
                } else {
                  return Ok({
                    body,
                    destination,
                    insertBefore: new Missing({
                      loc: node.callee.loc.collapse('end')
                    })
                  });
                }
              }).mapOk(({
                body,
                destination,
                insertBefore
              }) => new InElement({
                loc: node.loc,
                block: body,
                insertBefore,
                guid: state.generateUniqueCursor(),
                destination
              }));
            }
          }).kw('if', {
            assert(node) {
              let {
                args
              } = node;
              if (!args.named.isEmpty()) {
                return Err(generateSyntaxError(`{{#if}} cannot receive named parameters, received ${args.named.entries.map(e => e.name.chars).join(', ')}`, node.loc));
              }
              if (args.positional.size > 1) {
                return Err(generateSyntaxError(`{{#if}} can only receive one positional parameter in block form, the conditional value. Received ${args.positional.size} parameters`, node.loc));
              }
              let condition = args.nth(0);
              if (condition === null) {
                return Err(generateSyntaxError(`{{#if}} requires a condition as its first positional parameter, did not receive any parameters`, node.loc));
              }
              return Ok({
                condition
              });
            },
            translate({
              node,
              state
            }, {
              condition
            }) {
              let block = node.blocks.get('default');
              let inverse = node.blocks.get('else');
              let conditionResult = VISIT_EXPRS.visit(condition, state);
              let blockResult = VISIT_STMTS.NamedBlock(block, state);
              let inverseResult = inverse ? VISIT_STMTS.NamedBlock(inverse, state) : Ok(null);
              return Result.all(conditionResult, blockResult, inverseResult).mapOk(([condition, block, inverse]) => new If({
                loc: node.loc,
                condition,
                block,
                inverse
              }));
            }
          }).kw('unless', {
            assert(node) {
              let {
                args
              } = node;
              if (!args.named.isEmpty()) {
                return Err(generateSyntaxError(`{{#unless}} cannot receive named parameters, received ${args.named.entries.map(e => e.name.chars).join(', ')}`, node.loc));
              }
              if (args.positional.size > 1) {
                return Err(generateSyntaxError(`{{#unless}} can only receive one positional parameter in block form, the conditional value. Received ${args.positional.size} parameters`, node.loc));
              }
              let condition = args.nth(0);
              if (condition === null) {
                return Err(generateSyntaxError(`{{#unless}} requires a condition as its first positional parameter, did not receive any parameters`, node.loc));
              }
              return Ok({
                condition
              });
            },
            translate({
              node,
              state
            }, {
              condition
            }) {
              let block = node.blocks.get('default');
              let inverse = node.blocks.get('else');
              let conditionResult = VISIT_EXPRS.visit(condition, state);
              let blockResult = VISIT_STMTS.NamedBlock(block, state);
              let inverseResult = inverse ? VISIT_STMTS.NamedBlock(inverse, state) : Ok(null);
              return Result.all(conditionResult, blockResult, inverseResult).mapOk(([condition, block, inverse]) => new If({
                loc: node.loc,
                condition: new Not({
                  value: condition,
                  loc: node.loc
                }),
                block,
                inverse
              }));
            }
          }).kw('each', {
            assert(node) {
              let {
                args
              } = node;
              if (!args.named.entries.every(e => e.name.chars === 'key')) {
                return Err(generateSyntaxError(`{{#each}} can only receive the 'key' named parameter, received ${args.named.entries.filter(e => e.name.chars !== 'key').map(e => e.name.chars).join(', ')}`, args.named.loc));
              }
              if (args.positional.size > 1) {
                return Err(generateSyntaxError(`{{#each}} can only receive one positional parameter, the collection being iterated. Received ${args.positional.size} parameters`, args.positional.loc));
              }
              let value = args.nth(0);
              let key = args.get('key');
              if (value === null) {
                return Err(generateSyntaxError(`{{#each}} requires an iterable value to be passed as its first positional parameter, did not receive any parameters`, args.loc));
              }
              return Ok({
                value,
                key
              });
            },
            translate({
              node,
              state
            }, {
              value,
              key
            }) {
              let block = node.blocks.get('default');
              let inverse = node.blocks.get('else');
              let valueResult = VISIT_EXPRS.visit(value, state);
              let keyResult = key ? VISIT_EXPRS.visit(key, state) : Ok(null);
              let blockResult = VISIT_STMTS.NamedBlock(block, state);
              let inverseResult = inverse ? VISIT_STMTS.NamedBlock(inverse, state) : Ok(null);
              return Result.all(valueResult, keyResult, blockResult, inverseResult).mapOk(([value, key, block, inverse]) => new Each({
                loc: node.loc,
                value,
                key,
                block,
                inverse
              }));
            }
          }).kw('let', {
            assert(node) {
              let {
                args
              } = node;
              if (!args.named.isEmpty()) {
                return Err(generateSyntaxError(`{{#let}} cannot receive named parameters, received ${args.named.entries.map(e => e.name.chars).join(', ')}`, args.named.loc));
              }
              if (args.positional.size === 0) {
                return Err(generateSyntaxError(`{{#let}} requires at least one value as its first positional parameter, did not receive any parameters`, args.positional.loc));
              }
              if (node.blocks.get('else')) {
                return Err(generateSyntaxError(`{{#let}} cannot receive an {{else}} block`, args.positional.loc));
              }
              return Ok({
                positional: args.positional
              });
            },
            translate({
              node,
              state
            }, {
              positional
            }) {
              let block = node.blocks.get('default');
              let positionalResult = VISIT_EXPRS.Positional(positional, state);
              let blockResult = VISIT_STMTS.NamedBlock(block, state);
              return Result.all(positionalResult, blockResult).mapOk(([positional, block]) => new Let({
                loc: node.loc,
                positional,
                block
              }));
            }
          }).kw('-with-dynamic-vars', {
            assert(node) {
              return Ok({
                named: node.args.named
              });
            },
            translate({
              node,
              state
            }, {
              named
            }) {
              let block = node.blocks.get('default');
              let namedResult = VISIT_EXPRS.NamedArguments(named, state);
              let blockResult = VISIT_STMTS.NamedBlock(block, state);
              return Result.all(namedResult, blockResult).mapOk(([named, block]) => new WithDynamicVars({
                loc: node.loc,
                named,
                block
              }));
            }
          }).kw('component', {
            assert: assertCurryKeyword(CurriedTypes.Component),
            translate({
              node,
              state
            }, {
              definition,
              args
            }) {
              let definitionResult = VISIT_EXPRS.visit(definition, state);
              let argsResult = VISIT_EXPRS.Args(args, state);
              let blocksResult = VISIT_STMTS.NamedBlocks(node.blocks, state);
              return Result.all(definitionResult, argsResult, blocksResult).mapOk(([definition, args, blocks]) => new InvokeComponent({
                loc: node.loc,
                definition,
                args,
                blocks
              }));
            }
          });
          const CALL_KEYWORDS = keywords('Call').kw('has-block', hasBlockKeyword('has-block')).kw('has-block-params', hasBlockKeyword('has-block-params')).kw('-get-dynamic-var', getDynamicVarKeyword).kw('log', logKeyword).kw('if', ifUnlessInlineKeyword('if')).kw('unless', ifUnlessInlineKeyword('unless')).kw('component', curryKeyword(CurriedTypes.Component)).kw('helper', curryKeyword(CurriedTypes.Helper)).kw('modifier', curryKeyword(CurriedTypes.Modifier));
          const MODIFIER_KEYWORDS = keywords('Modifier');

          // There is a small whitelist of namespaced attributes specially
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

          const XLINK = 'http://www.w3.org/1999/xlink';
          const XML = 'http://www.w3.org/XML/1998/namespace';
          const XMLNS = 'http://www.w3.org/2000/xmlns/';
          const WHITELIST = {
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
          const DEFLATE_TAG_TABLE = {
            div: WellKnownTagNames.div,
            span: WellKnownTagNames.span,
            p: WellKnownTagNames.p,
            a: WellKnownTagNames.a
          };
          const INFLATE_TAG_TABLE = ['div', 'span', 'p', 'a'];
          function deflateTagName(tagName) {
            return DEFLATE_TAG_TABLE[tagName] ?? tagName;
          }
          function inflateTagName(tagName) {
            return typeof tagName === 'string' ? tagName : INFLATE_TAG_TABLE[tagName];
          }
          const DEFLATE_ATTR_TABLE = {
            class: WellKnownAttrNames.class,
            id: WellKnownAttrNames.id,
            value: WellKnownAttrNames.value,
            name: WellKnownAttrNames.name,
            type: WellKnownAttrNames.type,
            style: WellKnownAttrNames.style,
            href: WellKnownAttrNames.href
          };
          const INFLATE_ATTR_TABLE = ['class', 'id', 'value', 'name', 'type', 'style', 'href'];
          function deflateAttrName(attrName) {
            return DEFLATE_ATTR_TABLE[attrName] ?? attrName;
          }
          function inflateAttrName(attrName) {
            return typeof attrName === 'string' ? attrName : INFLATE_ATTR_TABLE[attrName];
          }
          class ClassifiedElement {
            delegate;
            constructor(element, delegate, state) {
              this.element = element;
              this.state = state;
              this.delegate = delegate;
            }
            toStatement() {
              return this.prepare().andThen(prepared => this.delegate.toStatement(this, prepared));
            }
            attr(attr) {
              let name = attr.name;
              let rawValue = attr.value;
              let namespace = getAttrNamespace(name.chars) || undefined;
              if (api$1.isLiteral(rawValue, 'string')) {
                return Ok(new StaticAttr({
                  loc: attr.loc,
                  name,
                  value: rawValue.toSlice(),
                  namespace,
                  kind: {
                    component: this.delegate.dynamicFeatures
                  }
                }));
              }
              return VISIT_EXPRS.visit(convertPathToCallIfKeyword(rawValue), this.state).mapOk(value => {
                let isTrusting = attr.trusting;
                return new DynamicAttr({
                  loc: attr.loc,
                  name,
                  value: value,
                  namespace,
                  kind: {
                    trusting: isTrusting,
                    component: this.delegate.dynamicFeatures
                  }
                });
              });
            }
            modifier(modifier) {
              let translated = MODIFIER_KEYWORDS.translate(modifier, this.state);
              if (translated !== null) {
                return translated;
              }
              let head = VISIT_EXPRS.visit(modifier.callee, this.state);
              let args = VISIT_EXPRS.Args(modifier.args, this.state);
              return Result.all(head, args).mapOk(([head, args]) => new Modifier({
                loc: modifier.loc,
                callee: head,
                args
              }));
            }
            attrs() {
              let attrs = new ResultArray();
              let args = new ResultArray();

              // Unlike most attributes, the `type` attribute can change how
              // subsequent attributes are interpreted by the browser. To address
              // this, in simple cases, we special case the `type` attribute to be set
              // last. For elements with splattributes, where attribute order affects
              // precedence, this re-ordering happens at runtime instead.
              // See https://github.com/glimmerjs/glimmer-vm/pull/726
              let typeAttr = null;
              let simple = this.element.attrs.filter(attr => attr.type === 'SplatAttr').length === 0;
              for (let attr of this.element.attrs) {
                if (attr.type === 'SplatAttr') {
                  attrs.add(Ok(new SplatAttr({
                    loc: attr.loc,
                    symbol: this.state.scope.allocateBlock('attrs')
                  })));
                } else if (attr.name.chars === 'type' && simple) {
                  typeAttr = attr;
                } else {
                  attrs.add(this.attr(attr));
                }
              }
              for (let arg of this.element.componentArgs) {
                args.add(this.delegate.arg(arg, this));
              }
              if (typeAttr) {
                attrs.add(this.attr(typeAttr));
              }
              return Result.all(args.toArray(), attrs.toArray()).mapOk(([args, attrs]) => ({
                attrs,
                args: new NamedArguments({
                  loc: maybeLoc(args, api$2.SourceSpan.NON_EXISTENT),
                  entries: OptionalList(args)
                })
              }));
            }
            prepare() {
              let attrs = this.attrs();
              let modifiers = new ResultArray(this.element.modifiers.map(m => this.modifier(m))).toArray();
              return Result.all(attrs, modifiers).mapOk(([result, modifiers]) => {
                let {
                  attrs,
                  args
                } = result;
                let elementParams = [...attrs, ...modifiers];
                let params = new ElementParameters({
                  loc: maybeLoc(elementParams, api$2.SourceSpan.NON_EXISTENT),
                  body: OptionalList(elementParams)
                });
                return {
                  args,
                  params
                };
              });
            }
          }
          function hasDynamicFeatures({
            attrs,
            modifiers
          }) {
            // ElementModifier needs the special ComponentOperations
            if (modifiers.length > 0) {
              return true;
            }

            // Splattributes need the special ComponentOperations to merge into
            return !!attrs.filter(attr => attr.type === 'SplatAttr')[0];
          }
          class ClassifiedComponent {
            dynamicFeatures = true;
            constructor(tag, element) {
              this.tag = tag;
              this.element = element;
            }
            arg(attr, {
              state
            }) {
              let name = attr.name;
              return VISIT_EXPRS.visit(convertPathToCallIfKeyword(attr.value), state).mapOk(value => new NamedArgument({
                loc: attr.loc,
                key: name,
                value
              }));
            }
            toStatement(component, {
              args,
              params
            }) {
              let {
                element,
                state
              } = component;
              return this.blocks(state).mapOk(blocks => new Component({
                loc: element.loc,
                tag: this.tag,
                params,
                args,
                blocks
              }));
            }
            blocks(state) {
              return VISIT_STMTS.NamedBlocks(this.element.blocks, state);
            }
          }
          class ClassifiedSimpleElement {
            constructor(tag, element, dynamicFeatures) {
              this.tag = tag;
              this.element = element;
              this.dynamicFeatures = dynamicFeatures;
            }
            isComponent = false;
            arg(attr) {
              return Err(generateSyntaxError(`${attr.name.chars} is not a valid attribute name. @arguments are only allowed on components, but the tag for this element (\`${this.tag.chars}\`) is a regular, non-component HTML element.`, attr.loc));
            }
            toStatement(classified, {
              params
            }) {
              let {
                state,
                element
              } = classified;
              let body = VISIT_STMTS.visitList(this.element.body, state);
              return body.mapOk(body => new SimpleElement({
                loc: element.loc,
                tag: this.tag,
                params,
                body: body.toArray(),
                dynamicFeatures: this.dynamicFeatures
              }));
            }
          }
          class NormalizationStatements {
            visitList(nodes, state) {
              return new ResultArray(nodes.map(e => VISIT_STMTS.visit(e, state))).toOptionalList().mapOk(list => list.filter(s => s !== null));
            }
            visit(node, state) {
              switch (node.type) {
                case 'GlimmerComment':
                  return Ok(null);
                case 'AppendContent':
                  return this.AppendContent(node, state);
                case 'HtmlText':
                  return Ok(this.TextNode(node));
                case 'HtmlComment':
                  return Ok(this.HtmlComment(node));
                case 'InvokeBlock':
                  return this.InvokeBlock(node, state);
                case 'InvokeComponent':
                  return this.Component(node, state);
                case 'SimpleElement':
                  return this.SimpleElement(node, state);
              }
            }
            InvokeBlock(node, state) {
              let translated = BLOCK_KEYWORDS.translate(node, state);
              if (translated !== null) {
                return translated;
              }
              let head = VISIT_EXPRS.visit(node.callee, state);
              let args = VISIT_EXPRS.Args(node.args, state);
              return Result.all(head, args).andThen(([head, args]) => this.NamedBlocks(node.blocks, state).mapOk(blocks => new InvokeBlock({
                loc: node.loc,
                head,
                args,
                blocks
              })));
            }
            NamedBlocks(blocks, state) {
              let list = new ResultArray(blocks.blocks.map(b => this.NamedBlock(b, state)));
              return list.toArray().mapOk(list => new NamedBlocks({
                loc: blocks.loc,
                blocks: OptionalList(list)
              }));
            }
            NamedBlock(named, state) {
              let body = state.visitBlock(named.block);
              return body.mapOk(body => {
                return new NamedBlock({
                  loc: named.loc,
                  name: named.name,
                  body: body.toArray(),
                  scope: named.block.scope
                });
              });
            }
            SimpleElement(element, state) {
              return new ClassifiedElement(element, new ClassifiedSimpleElement(element.tag, element, hasDynamicFeatures(element)), state).toStatement();
            }
            Component(component, state) {
              return VISIT_EXPRS.visit(component.callee, state).andThen(callee => new ClassifiedElement(component, new ClassifiedComponent(callee, component), state).toStatement());
            }
            AppendContent(append, state) {
              let translated = APPEND_KEYWORDS.translate(append, state);
              if (translated !== null) {
                return translated;
              }
              let value = VISIT_EXPRS.visit(append.value, state);
              return value.mapOk(value => {
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
            }
            TextNode(text) {
              return new AppendTextNode({
                loc: text.loc,
                text: new api$1.LiteralExpression({
                  loc: text.loc,
                  value: text.chars
                })
              });
            }
            HtmlComment(comment) {
              return new AppendComment({
                loc: comment.loc,
                value: comment.text
              });
            }
          }
          const VISIT_STMTS = new NormalizationStatements();

          /**
           * This is the mutable state for this compiler pass.
           */
          class NormalizationState {
            _currentScope;
            _cursorCount = 0;
            constructor(block, isStrict) {
              this.isStrict = isStrict;
              this._currentScope = block;
            }
            generateUniqueCursor() {
              return `%cursor:${this._cursorCount++}%`;
            }
            get scope() {
              return this._currentScope;
            }
            visitBlock(block) {
              let oldBlock = this._currentScope;
              this._currentScope = block.scope;
              try {
                return VISIT_STMTS.visitList(block.body, this);
              } finally {
                this._currentScope = oldBlock;
              }
            }
          }
          var ResolutionType = /*#__PURE__*/function (ResolutionType) {
            ResolutionType["Value"] = "value";
            ResolutionType["Component"] = "component";
            ResolutionType["Helper"] = "helper";
            ResolutionType["Modifier"] = "modifier";
            ResolutionType["ComponentOrHelper"] = "component or helper";
            return ResolutionType;
          }(ResolutionType || {});
          class StrictModeValidationPass {
            // This is done at the end of all the keyword normalizations
            // At this point any free variables that isn't a valid keyword
            // in its context should be considered a syntax error. We
            // probably had various opportunities to do this inline in the
            // earlier passes, but this aims to produce a better syntax
            // error as we don't always have the right loc-context to do
            // so in the other spots.
            static validate(template) {
              return new this(template).validate();
            }
            constructor(template) {
              this.template = template;
            }
            validate() {
              return this.Statements(this.template.body).mapOk(() => this.template);
            }
            Statements(statements) {
              let result = Ok(null);
              for (let statement of statements) {
                result = result.andThen(() => this.Statement(statement));
              }
              return result;
            }
            NamedBlocks({
              blocks
            }) {
              let result = Ok(null);
              for (let block of blocks.toArray()) {
                result = result.andThen(() => this.NamedBlock(block));
              }
              return result;
            }
            NamedBlock(block) {
              return this.Statements(block.body);
            }
            Statement(statement) {
              switch (statement.type) {
                case 'InElement':
                  return this.InElement(statement);
                case 'Debugger':
                  return Ok(null);
                case 'Yield':
                  return this.Yield(statement);
                case 'AppendTrustedHTML':
                  return this.AppendTrustedHTML(statement);
                case 'AppendTextNode':
                  return this.AppendTextNode(statement);
                case 'Component':
                  return this.Component(statement);
                case 'SimpleElement':
                  return this.SimpleElement(statement);
                case 'InvokeBlock':
                  return this.InvokeBlock(statement);
                case 'AppendComment':
                  return Ok(null);
                case 'If':
                  return this.If(statement);
                case 'Each':
                  return this.Each(statement);
                case 'Let':
                  return this.Let(statement);
                case 'WithDynamicVars':
                  return this.WithDynamicVars(statement);
                case 'InvokeComponent':
                  return this.InvokeComponent(statement);
              }
            }
            Expressions(expressions) {
              let result = Ok(null);
              for (let expression of expressions) {
                result = result.andThen(() => this.Expression(expression));
              }
              return result;
            }
            Expression(expression, span = expression, resolution) {
              switch (expression.type) {
                case 'Literal':
                case 'Keyword':
                case 'Missing':
                case 'This':
                case 'Arg':
                case 'Local':
                case 'HasBlock':
                case 'HasBlockParams':
                case 'GetDynamicVar':
                  return Ok(null);
                case 'PathExpression':
                  return this.Expression(expression.head, span, resolution);
                case 'Free':
                  return this.errorFor(expression.name, span, resolution);
                case 'InterpolateExpression':
                  return this.InterpolateExpression(expression, span, resolution);
                case 'CallExpression':
                  return this.CallExpression(expression, span, resolution ?? ResolutionType.Helper);
                case 'Not':
                  return this.Expression(expression.value, span, resolution);
                case 'IfInline':
                  return this.IfInline(expression);
                case 'Curry':
                  return this.Curry(expression);
                case 'Log':
                  return this.Log(expression);
              }
            }
            Args(args) {
              return this.Positional(args.positional).andThen(() => this.NamedArguments(args.named));
            }
            Positional(positional, span) {
              let result = Ok(null);
              let expressions = positional.list.toArray();

              // For cases like {{yield foo}}, when there is only a single argument, it
              // makes for a slightly better error to report that entire span. However,
              // when there are more than one, we need to be specific.
              if (expressions.length === 1) {
                result = this.Expression(expressions[0], span);
              } else {
                result = this.Expressions(expressions);
              }
              return result;
            }
            NamedArguments({
              entries
            }) {
              let result = Ok(null);
              for (let arg of entries.toArray()) {
                result = result.andThen(() => this.NamedArgument(arg));
              }
              return result;
            }
            NamedArgument(arg) {
              if (arg.value.type === 'CallExpression') {
                return this.Expression(arg.value, arg, ResolutionType.Helper);
              } else {
                return this.Expression(arg.value, arg);
              }
            }
            ElementParameters({
              body
            }) {
              let result = Ok(null);
              for (let param of body.toArray()) {
                result = result.andThen(() => this.ElementParameter(param));
              }
              return result;
            }
            ElementParameter(param) {
              switch (param.type) {
                case 'StaticAttr':
                  return Ok(null);
                case 'DynamicAttr':
                  return this.DynamicAttr(param);
                case 'Modifier':
                  return this.Modifier(param);
                case 'SplatAttr':
                  return Ok(null);
              }
            }
            DynamicAttr(attr) {
              if (attr.value.type === 'CallExpression') {
                return this.Expression(attr.value, attr, ResolutionType.Helper);
              } else {
                return this.Expression(attr.value, attr);
              }
            }
            Modifier(modifier) {
              return this.Expression(modifier.callee, modifier, ResolutionType.Modifier).andThen(() => this.Args(modifier.args));
            }
            InElement(inElement) {
              return this.Expression(inElement.destination)
              // Unfortunately we lost the `insertBefore=` part of the span
              .andThen(() => this.Expression(inElement.insertBefore)).andThen(() => this.NamedBlock(inElement.block));
            }
            Yield(statement) {
              return this.Positional(statement.positional, statement);
            }
            AppendTrustedHTML(statement) {
              return this.Expression(statement.html, statement);
            }
            AppendTextNode(statement) {
              if (statement.text.type === 'CallExpression') {
                return this.Expression(statement.text, statement, ResolutionType.ComponentOrHelper);
              } else {
                return this.Expression(statement.text, statement);
              }
            }
            Component(statement) {
              return this.Expression(statement.tag, statement, ResolutionType.Component).andThen(() => this.ElementParameters(statement.params)).andThen(() => this.NamedArguments(statement.args)).andThen(() => this.NamedBlocks(statement.blocks));
            }
            SimpleElement(statement) {
              return this.ElementParameters(statement.params).andThen(() => this.Statements(statement.body));
            }
            InvokeBlock(statement) {
              return this.Expression(statement.head, statement.head, ResolutionType.Component).andThen(() => this.Args(statement.args)).andThen(() => this.NamedBlocks(statement.blocks));
            }
            If(statement) {
              return this.Expression(statement.condition, statement).andThen(() => this.NamedBlock(statement.block)).andThen(() => {
                if (statement.inverse) {
                  return this.NamedBlock(statement.inverse);
                } else {
                  return Ok(null);
                }
              });
            }
            Each(statement) {
              return this.Expression(statement.value, statement).andThen(() => {
                if (statement.key) {
                  return this.Expression(statement.key, statement);
                } else {
                  return Ok(null);
                }
              }).andThen(() => this.NamedBlock(statement.block)).andThen(() => {
                if (statement.inverse) {
                  return this.NamedBlock(statement.inverse);
                } else {
                  return Ok(null);
                }
              });
            }
            Let(statement) {
              return this.Positional(statement.positional).andThen(() => this.NamedBlock(statement.block));
            }
            WithDynamicVars(statement) {
              return this.NamedArguments(statement.named).andThen(() => this.NamedBlock(statement.block));
            }
            InvokeComponent(statement) {
              return this.Expression(statement.definition, statement, ResolutionType.Component).andThen(() => this.Args(statement.args)).andThen(() => {
                if (statement.blocks) {
                  return this.NamedBlocks(statement.blocks);
                } else {
                  return Ok(null);
                }
              });
            }
            InterpolateExpression(expression, span, resolution) {
              let expressions = expression.parts.toArray();
              if (expressions.length === 1) {
                return this.Expression(expressions[0], span, resolution);
              } else {
                return this.Expressions(expressions);
              }
            }
            CallExpression(expression, span, resolution) {
              return this.Expression(expression.callee, span, resolution).andThen(() => this.Args(expression.args));
            }
            IfInline(expression) {
              return this.Expression(expression.condition).andThen(() => this.Expression(expression.truthy)).andThen(() => {
                if (expression.falsy) {
                  return this.Expression(expression.falsy);
                } else {
                  return Ok(null);
                }
              });
            }
            Curry(expression) {
              let resolution;
              if (expression.curriedType === CurriedTypes.Component) {
                resolution = ResolutionType.Component;
              } else if (expression.curriedType === CurriedTypes.Helper) {
                resolution = ResolutionType.Helper;
              } else {
                resolution = ResolutionType.Modifier;
              }
              return this.Expression(expression.definition, expression, resolution).andThen(() => this.Args(expression.args));
            }
            Log(expression) {
              return this.Positional(expression.positional, expression);
            }
            errorFor(name, span, type = ResolutionType.Value) {
              return Err(generateSyntaxError(`Attempted to resolve a ${type} in a strict mode template, but that value was not in scope: ${name}`, loc(span)));
            }
          }

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
          function normalize(source, root, isStrict) {
            // create a new context for the normalization pass
            let state = new NormalizationState(root.table, isStrict);
            let body = VISIT_STMTS.visitList(root.body, state);
            let template = body.mapOk(body => new Template({
              loc: root.loc,
              scope: root.table,
              body: body.toArray()
            }));
            if (isStrict) {
              template = template.andThen(template => StrictModeValidationPass.validate(template));
            }
            return template;
          }
          class WireFormatDebugger {
            upvars;
            symbols;
            constructor([_statements, symbols, _hasEval, upvars]) {
              this.upvars = upvars;
              this.symbols = symbols;
            }
            format(program) {
              let out = [];
              for (let statement of program[0]) {
                out.push(this.formatOpcode(statement));
              }
              return out;
            }
            formatOpcode(opcode) {
              if (Array.isArray(opcode)) {
                switch (opcode[0]) {
                  case opcodes.Append:
                    return ['append', this.formatOpcode(opcode[1])];
                  case opcodes.TrustingAppend:
                    return ['trusting-append', this.formatOpcode(opcode[1])];
                  case opcodes.Block:
                    return ['block', this.formatOpcode(opcode[1]), this.formatParams(opcode[2]), this.formatHash(opcode[3]), this.formatBlocks(opcode[4])];
                  case opcodes.InElement:
                    return ['in-element', opcode[1], this.formatOpcode(opcode[2]), opcode[3] ? this.formatOpcode(opcode[3]) : undefined];
                  case opcodes.OpenElement:
                    return ['open-element', inflateTagName(opcode[1])];
                  case opcodes.OpenElementWithSplat:
                    return ['open-element-with-splat', inflateTagName(opcode[1])];
                  case opcodes.CloseElement:
                    return ['close-element'];
                  case opcodes.FlushElement:
                    return ['flush-element'];
                  case opcodes.StaticAttr:
                    return ['static-attr', inflateAttrName(opcode[1]), opcode[2], opcode[3]];
                  case opcodes.StaticComponentAttr:
                    return ['static-component-attr', inflateAttrName(opcode[1]), opcode[2], opcode[3]];
                  case opcodes.DynamicAttr:
                    return ['dynamic-attr', inflateAttrName(opcode[1]), this.formatOpcode(opcode[2]), opcode[3]];
                  case opcodes.ComponentAttr:
                    return ['component-attr', inflateAttrName(opcode[1]), this.formatOpcode(opcode[2]), opcode[3]];
                  case opcodes.AttrSplat:
                    return ['attr-splat'];
                  case opcodes.Yield:
                    return ['yield', opcode[1], this.formatParams(opcode[2])];
                  case opcodes.DynamicArg:
                    return ['dynamic-arg', opcode[1], this.formatOpcode(opcode[2])];
                  case opcodes.StaticArg:
                    return ['static-arg', opcode[1], this.formatOpcode(opcode[2])];
                  case opcodes.TrustingDynamicAttr:
                    return ['trusting-dynamic-attr', inflateAttrName(opcode[1]), this.formatOpcode(opcode[2]), opcode[3]];
                  case opcodes.TrustingComponentAttr:
                    return ['trusting-component-attr', inflateAttrName(opcode[1]), this.formatOpcode(opcode[2]), opcode[3]];
                  case opcodes.Debugger:
                    return ['debugger', opcode[1]];
                  case opcodes.Comment:
                    return ['comment', opcode[1]];
                  case opcodes.Modifier:
                    return ['modifier', this.formatOpcode(opcode[1]), this.formatParams(opcode[2]), this.formatHash(opcode[3])];
                  case opcodes.Component:
                    return ['component', this.formatOpcode(opcode[1]), this.formatElementParams(opcode[2]), this.formatHash(opcode[3]), this.formatBlocks(opcode[4])];
                  case opcodes.HasBlock:
                    return ['has-block', this.formatOpcode(opcode[1])];
                  case opcodes.HasBlockParams:
                    return ['has-block-params', this.formatOpcode(opcode[1])];
                  case opcodes.Curry:
                    return ['curry', this.formatOpcode(opcode[1]), this.formatCurryType(opcode[2]), this.formatParams(opcode[3]), this.formatHash(opcode[4])];
                  case opcodes.Undefined:
                    return ['undefined'];
                  case opcodes.Call:
                    return ['call', this.formatOpcode(opcode[1]), this.formatParams(opcode[2]), this.formatHash(opcode[3])];
                  case opcodes.Concat:
                    return ['concat', this.formatParams(opcode[1])];
                  case opcodes.GetStrictKeyword:
                    return ['get-strict-free', this.upvars[opcode[1]]];
                  case opcodes.GetFreeAsComponentOrHelperHead:
                    return ['GetFreeAsComponentOrHelperHead', this.upvars[opcode[1]], opcode[2]];
                  case opcodes.GetFreeAsHelperHead:
                    return ['GetFreeAsHelperHead', this.upvars[opcode[1]], opcode[2]];
                  case opcodes.GetFreeAsComponentHead:
                    return ['GetFreeAsComponentHead', this.upvars[opcode[1]], opcode[2]];
                  case opcodes.GetFreeAsModifierHead:
                    return ['GetFreeAsModifierHead', this.upvars[opcode[1]], opcode[2]];
                  case opcodes.GetSymbol:
                    {
                      if (opcode[1] === 0) {
                        return ['get-symbol', 'this', opcode[2]];
                      } else {
                        return ['get-symbol', this.symbols[opcode[1] - 1], opcode[2]];
                      }
                    }
                  case opcodes.GetLexicalSymbol:
                    {
                      return ['get-template-symbol', opcode[1], opcode[2]];
                    }
                  case opcodes.If:
                    return ['if', this.formatOpcode(opcode[1]), this.formatBlock(opcode[2]), opcode[3] ? this.formatBlock(opcode[3]) : null];
                  case opcodes.IfInline:
                    return ['if-inline'];
                  case opcodes.Not:
                    return ['not'];
                  case opcodes.Each:
                    return ['each', this.formatOpcode(opcode[1]), opcode[2] ? this.formatOpcode(opcode[2]) : null, this.formatBlock(opcode[3]), opcode[4] ? this.formatBlock(opcode[4]) : null];
                  case opcodes.Let:
                    return ['let', this.formatParams(opcode[1]), this.formatBlock(opcode[2])];
                  case opcodes.Log:
                    return ['log', this.formatParams(opcode[1])];
                  case opcodes.WithDynamicVars:
                    return ['-with-dynamic-vars', this.formatHash(opcode[1]), this.formatBlock(opcode[2])];
                  case opcodes.GetDynamicVar:
                    return ['-get-dynamic-vars', this.formatOpcode(opcode[1])];
                  case opcodes.InvokeComponent:
                    return ['component', this.formatOpcode(opcode[1]), this.formatParams(opcode[2]), this.formatHash(opcode[3]), this.formatBlocks(opcode[4])];
                }
              } else {
                return opcode;
              }
            }
            formatCurryType(value) {
              switch (value) {
                case CurriedTypes.Component:
                  return 'component';
                case CurriedTypes.Helper:
                  return 'helper';
                case CurriedTypes.Modifier:
                  return 'modifier';
                default:
                  throw exhausted(value);
              }
            }
            formatElementParams(opcodes) {
              if (opcodes === null) return null;
              return opcodes.map(o => this.formatOpcode(o));
            }
            formatParams(opcodes) {
              if (opcodes === null) return null;
              return opcodes.map(o => this.formatOpcode(o));
            }
            formatHash(hash) {
              if (hash === null) return null;
              return hash[0].reduce((accum, key, index) => {
                accum[key] = this.formatOpcode(hash[1][index]);
                return accum;
              }, dict());
            }
            formatBlocks(blocks) {
              if (blocks === null) return null;
              return blocks[0].reduce((accum, key, index) => {
                accum[key] = this.formatBlock(blocks[1][index]);
                return accum;
              }, dict());
            }
            formatBlock(block) {
              return {
                statements: block[0].map(s => this.formatOpcode(s)),
                parameters: block[1]
              };
            }
          }
          class ExpressionEncoder {
            expr(expr) {
              switch (expr.type) {
                case 'Missing':
                  return undefined;
                case 'Literal':
                  return this.Literal(expr);
                case 'Keyword':
                  return this.Keyword(expr);
                case 'CallExpression':
                  return this.CallExpression(expr);
                case 'PathExpression':
                  return this.PathExpression(expr);
                case 'Arg':
                  return [opcodes.GetSymbol, expr.symbol];
                case 'Local':
                  return this.Local(expr);
                case 'This':
                  return [opcodes.GetSymbol, 0];
                case 'Free':
                  return [expr.resolution.resolution(), expr.symbol];
                case 'HasBlock':
                  return this.HasBlock(expr);
                case 'HasBlockParams':
                  return this.HasBlockParams(expr);
                case 'Curry':
                  return this.Curry(expr);
                case 'Not':
                  return this.Not(expr);
                case 'IfInline':
                  return this.IfInline(expr);
                case 'InterpolateExpression':
                  return this.InterpolateExpression(expr);
                case 'GetDynamicVar':
                  return this.GetDynamicVar(expr);
                case 'Log':
                  return this.Log(expr);
              }
            }
            Literal({
              value
            }) {
              if (value === undefined) {
                return [opcodes.Undefined];
              } else {
                return value;
              }
            }
            Missing() {
              return undefined;
            }
            HasBlock({
              symbol
            }) {
              return [opcodes.HasBlock, [opcodes.GetSymbol, symbol]];
            }
            HasBlockParams({
              symbol
            }) {
              return [opcodes.HasBlockParams, [opcodes.GetSymbol, symbol]];
            }
            Curry({
              definition,
              curriedType,
              args
            }) {
              return [opcodes.Curry, EXPR.expr(definition), curriedType, EXPR.Positional(args.positional), EXPR.NamedArguments(args.named)];
            }
            Local({
              isTemplateLocal,
              symbol
            }) {
              return [isTemplateLocal ? opcodes.GetLexicalSymbol : opcodes.GetSymbol, symbol];
            }
            Keyword({
              symbol
            }) {
              return [opcodes.GetStrictKeyword, symbol];
            }
            PathExpression({
              head,
              tail
            }) {
              let getOp = EXPR.expr(head);
              debugAssert(getOp[0] !== opcodes.GetStrictKeyword, '[BUG] keyword in a PathExpression');
              return [...getOp, EXPR.Tail(tail)];
            }
            InterpolateExpression({
              parts
            }) {
              return [opcodes.Concat, parts.map(e => EXPR.expr(e)).toArray()];
            }
            CallExpression({
              callee,
              args
            }) {
              return [opcodes.Call, EXPR.expr(callee), ...EXPR.Args(args)];
            }
            Tail({
              members
            }) {
              return mapPresentArray(members, member => member.chars);
            }
            Args({
              positional,
              named
            }) {
              return [this.Positional(positional), this.NamedArguments(named)];
            }
            Positional({
              list
            }) {
              return list.map(l => EXPR.expr(l)).toPresentArray();
            }
            NamedArgument({
              key,
              value
            }) {
              return [key.chars, EXPR.expr(value)];
            }
            NamedArguments({
              entries: pairs
            }) {
              let list = pairs.toArray();
              if (isPresentArray(list)) {
                let names = [];
                let values = [];
                for (let pair of list) {
                  let [name, value] = EXPR.NamedArgument(pair);
                  names.push(name);
                  values.push(value);
                }
                assertPresentArray(names);
                assertPresentArray(values);
                return [names, values];
              } else {
                return null;
              }
            }
            Not({
              value
            }) {
              return [opcodes.Not, EXPR.expr(value)];
            }
            IfInline({
              condition,
              truthy,
              falsy
            }) {
              let expr = [opcodes.IfInline, EXPR.expr(condition), EXPR.expr(truthy)];
              if (falsy) {
                expr.push(EXPR.expr(falsy));
              }
              return expr;
            }
            GetDynamicVar({
              name
            }) {
              return [opcodes.GetDynamicVar, EXPR.expr(name)];
            }
            Log({
              positional
            }) {
              return [opcodes.Log, this.Positional(positional)];
            }
          }
          const EXPR = new ExpressionEncoder();
          class WireStatements {
            constructor(statements) {
              this.statements = statements;
            }
            toArray() {
              return this.statements;
            }
          }
          class ContentEncoder {
            list(statements) {
              let out = [];
              for (let statement of statements) {
                let result = CONTENT.content(statement);
                if (result && result instanceof WireStatements) {
                  out.push(...result.toArray());
                } else {
                  out.push(result);
                }
              }
              return out;
            }
            content(stmt) {
              return this.visitContent(stmt);
            }
            visitContent(stmt) {
              switch (stmt.type) {
                case 'Debugger':
                  return [opcodes.Debugger, stmt.scope.getDebugInfo()];
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
                case 'Let':
                  return this.Let(stmt);
                case 'WithDynamicVars':
                  return this.WithDynamicVars(stmt);
                case 'InvokeComponent':
                  return this.InvokeComponent(stmt);
                default:
                  return exhausted(stmt);
              }
            }
            Yield({
              to,
              positional
            }) {
              return [opcodes.Yield, to, EXPR.Positional(positional)];
            }
            InElement({
              guid,
              insertBefore,
              destination,
              block
            }) {
              let wireBlock = CONTENT.NamedBlock(block)[1];
              // let guid = args.guid;
              let wireDestination = EXPR.expr(destination);
              let wireInsertBefore = EXPR.expr(insertBefore);
              if (wireInsertBefore === undefined) {
                return [opcodes.InElement, wireBlock, guid, wireDestination];
              } else {
                return [opcodes.InElement, wireBlock, guid, wireDestination, wireInsertBefore];
              }
            }
            InvokeBlock({
              head,
              args,
              blocks
            }) {
              return [opcodes.Block, EXPR.expr(head), ...EXPR.Args(args), CONTENT.NamedBlocks(blocks)];
            }
            AppendTrustedHTML({
              html
            }) {
              return [opcodes.TrustingAppend, EXPR.expr(html)];
            }
            AppendTextNode({
              text
            }) {
              return [opcodes.Append, EXPR.expr(text)];
            }
            AppendComment({
              value
            }) {
              return [opcodes.Comment, value.chars];
            }
            SimpleElement({
              tag,
              params,
              body,
              dynamicFeatures
            }) {
              let op = dynamicFeatures ? opcodes.OpenElementWithSplat : opcodes.OpenElement;
              return new WireStatements([[op, deflateTagName(tag.chars)], ...CONTENT.ElementParameters(params).toArray(), [opcodes.FlushElement], ...CONTENT.list(body), [opcodes.CloseElement]]);
            }
            Component({
              tag,
              params,
              args,
              blocks
            }) {
              let wireTag = EXPR.expr(tag);
              let wirePositional = CONTENT.ElementParameters(params);
              let wireNamed = EXPR.NamedArguments(args);
              let wireNamedBlocks = CONTENT.NamedBlocks(blocks);
              return [opcodes.Component, wireTag, wirePositional.toPresentArray(), wireNamed, wireNamedBlocks];
            }
            ElementParameters({
              body
            }) {
              return body.map(p => CONTENT.ElementParameter(p));
            }
            ElementParameter(param) {
              switch (param.type) {
                case 'SplatAttr':
                  return [opcodes.AttrSplat, param.symbol];
                case 'DynamicAttr':
                  return [dynamicAttrOp(param.kind), ...dynamicAttr(param)];
                case 'StaticAttr':
                  return [staticAttrOp(param.kind), ...staticAttr(param)];
                case 'Modifier':
                  return [opcodes.Modifier, EXPR.expr(param.callee), ...EXPR.Args(param.args)];
              }
            }
            NamedBlocks({
              blocks
            }) {
              let names = [];
              let serializedBlocks = [];
              for (let block of blocks.toArray()) {
                let [name, serializedBlock] = CONTENT.NamedBlock(block);
                names.push(name);
                serializedBlocks.push(serializedBlock);
              }
              return names.length > 0 ? [names, serializedBlocks] : null;
            }
            NamedBlock({
              name,
              body,
              scope
            }) {
              let nameChars = name.chars;
              if (nameChars === 'inverse') {
                nameChars = 'else';
              }
              return [nameChars, [CONTENT.list(body), scope.slots]];
            }
            If({
              condition,
              block,
              inverse
            }) {
              return [opcodes.If, EXPR.expr(condition), CONTENT.NamedBlock(block)[1], inverse ? CONTENT.NamedBlock(inverse)[1] : null];
            }
            Each({
              value,
              key,
              block,
              inverse
            }) {
              return [opcodes.Each, EXPR.expr(value), key ? EXPR.expr(key) : null, CONTENT.NamedBlock(block)[1], inverse ? CONTENT.NamedBlock(inverse)[1] : null];
            }
            Let({
              positional,
              block
            }) {
              return [opcodes.Let, EXPR.Positional(positional), CONTENT.NamedBlock(block)[1]];
            }
            WithDynamicVars({
              named,
              block
            }) {
              return [opcodes.WithDynamicVars, EXPR.NamedArguments(named), CONTENT.NamedBlock(block)[1]];
            }
            InvokeComponent({
              definition,
              args,
              blocks
            }) {
              return [opcodes.InvokeComponent, EXPR.expr(definition), EXPR.Positional(args.positional), EXPR.NamedArguments(args.named), blocks ? CONTENT.NamedBlocks(blocks) : null];
            }
          }
          const CONTENT = new ContentEncoder();
          function staticAttr({
            name,
            value,
            namespace
          }) {
            let out = [deflateAttrName(name.chars), value.chars];
            if (namespace) {
              out.push(namespace);
            }
            return out;
          }
          function dynamicAttr({
            name,
            value,
            namespace
          }) {
            let out = [deflateAttrName(name.chars), EXPR.expr(value)];
            if (namespace) {
              out.push(namespace);
            }
            return out;
          }
          function staticAttrOp(kind) {
            if (kind.component) {
              return opcodes.StaticComponentAttr;
            } else {
              return opcodes.StaticAttr;
            }
          }
          function dynamicAttrOp(kind) {
            if (kind.component) {
              return kind.trusting ? opcodes.TrustingComponentAttr : opcodes.ComponentAttr;
            } else {
              return kind.trusting ? opcodes.TrustingDynamicAttr : opcodes.DynamicAttr;
            }
          }
          function visit(template) {
            let statements = CONTENT.list(template.body);
            let scope = template.scope;
            let block = [statements, scope.symbols, scope.hasEval, scope.upvars];
            return block;
          }
          const defaultId = (() => {
            const req = typeof module === 'object' && typeof module.require === 'function' ? module.require : globalThis.require;
            if (req) {
              try {
                const crypto = req('crypto');
                const idFn = src => {
                  const hash = crypto.createHash('sha1');
                  hash.update(src, 'utf8');
                  // trim to 6 bytes of data (2^48 - 1)
                  return hash.digest('base64').substring(0, 8);
                };
                idFn('test');
                return idFn;
              } catch {
                // do nothing
              }
            }
            return function idFn() {
              return null;
            };
          })();
          const defaultOptions = {
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
          function precompileJSON(string, options = defaultOptions) {
            const source = new api$2.Source(string ?? '', options.meta?.moduleName);
            const [ast, locals] = normalize$1(source, {
              lexicalScope: () => false,
              ...options
            });
            const block = normalize(source, ast, options.strictMode ?? false).mapOk(pass2In => {
              return visit(pass2In);
            });
            if (block.isOk) {
              return [block.value, locals];
            } else {
              throw block.reason;
            }
          }

          // UUID used as a unique placeholder for placing a snippet of JS code into
          // the otherwise JSON stringified value below.
          const SCOPE_PLACEHOLDER = '796d24e6-2450-4fb0-8cdf-b65638b5ef70';

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
          function precompile$1(source, options = defaultOptions) {
            const [block, usedLocals] = precompileJSON(source, options);
            const moduleName = options.meta?.moduleName;
            const idFn = options.id || defaultId;
            const blockJSON = JSON.stringify(block);
            const templateJSONObject = {
              id: idFn(JSON.stringify(options.meta) + blockJSON),
              block: blockJSON,
              moduleName: moduleName ?? '(unknown template module)',
              // lying to the type checker here because we're going to
              // replace it just below, after stringification
              scope: SCOPE_PLACEHOLDER,
              isStrictMode: options.strictMode ?? false
            };
            if (usedLocals.length === 0) {
              delete templateJSONObject.scope;
            }

            // JSON is javascript
            let stringified = JSON.stringify(templateJSONObject);
            if (usedLocals.length > 0) {
              const scopeFn = `()=>[${usedLocals.join(',')}]`;
              stringified = stringified.replace(`"${SCOPE_PLACEHOLDER}"`, scopeFn);
            }
            return stringified;
          }

          const glimmerCompiler = /*#__PURE__*/Object.defineProperty({
                    __proto__: null,
                    Builder,
                    NEWLINE,
                    ProgramSymbols,
                    WireFormatDebugger,
                    buildStatement,
                    buildStatements,
                    c,
                    defaultId,
                    precompile: precompile$1,
                    precompileJSON,
                    s,
                    unicode
          }, Symbol.toStringTag, { value: 'Module' });

          const DEBUG = false;
          const CI = false;

          const glimmerEnv = /*#__PURE__*/Object.defineProperty({
                    __proto__: null,
                    CI,
                    DEBUG
          }, Symbol.toStringTag, { value: 'Module' });

          // this file gets replaced with the real value during the build
          const version = '5.10.0';

          const emberVersion = /*#__PURE__*/Object.defineProperty({
                    __proto__: null,
                    default: version
          }, Symbol.toStringTag, { value: 'Module' });

          function calculateLocationDisplay(moduleName, loc) {
            let moduleInfo = '';
            if (moduleName) {
              moduleInfo += `'${moduleName}' `;
            }
            if (loc) {
              let {
                column,
                line
              } = loc.start || {
                line: undefined,
                column: undefined
              };
              if (line !== undefined && column !== undefined) {
                if (moduleName) {
                  // only prepend @ if the moduleName was present
                  moduleInfo += '@ ';
                }
                moduleInfo += `L${line}:C${column}`;
              }
            }
            if (moduleInfo) {
              moduleInfo = `(${moduleInfo}) `;
            }
            return moduleInfo;
          }

          const emberTemplateCompilerLibSystemCalculateLocationDisplay = /*#__PURE__*/Object.defineProperty({
                    __proto__: null,
                    default: calculateLocationDisplay
          }, Symbol.toStringTag, { value: 'Module' });

          /**
           @module ember
          */

          /**
            A Glimmer2 AST transformation that asserts against

            ```handlebars
            {{attrs.foo.bar}}
            ```

            ...as well as `{{#if attrs.foo}}`, `{{deeply (nested attrs.foobar.baz)}}`.

            @private
            @class AssertAgainstAttrs
          */

          function assertAgainstAttrs(env) {
            let {
              builders: b
            } = env.syntax;
            let moduleName = env.meta?.moduleName;
            let stack = [[]];
            function updateBlockParamsStack(blockParams) {
              let parent = stack[stack.length - 1];
              (!(parent) && assert('has parent', parent));
              stack.push(parent.concat(blockParams));
            }
            return {
              name: 'assert-against-attrs',
              visitor: {
                Template: {
                  enter(node) {
                    updateBlockParamsStack(node.blockParams);
                  },
                  exit() {
                    stack.pop();
                  }
                },
                Block: {
                  enter(node) {
                    updateBlockParamsStack(node.blockParams);
                  },
                  exit() {
                    stack.pop();
                  }
                },
                ElementNode: {
                  enter(node) {
                    updateBlockParamsStack(node.blockParams);
                  },
                  exit() {
                    stack.pop();
                  }
                },
                PathExpression(node) {
                  if (isAttrs(node, stack[stack.length - 1])) {
                    (assert(`Using {{attrs}} to reference named arguments is not supported. {{${node.original}}} should be updated to {{@${node.original.slice(6)}}}. ${calculateLocationDisplay(moduleName, node.loc)}`));
                  } else if (isThisDotAttrs(node)) {
                    // When removing this, ensure `{{this.attrs.foo}}` is left as-is, without triggering
                    // any assertions/deprecations. It's perfectly legal to reference `{{this.attrs.foo}}`
                    // in the template since it is a real property on the backing class – it will give you
                    // a `MutableCell` wrapper object, but maybe that's what you want. And in any case,
                    // there is no compelling to special case that property access.
                    (deprecate(`Using {{this.attrs}} to reference named arguments has been deprecated. {{${node.original}}} should be updated to {{@${node.original.slice(11)}}}. ${calculateLocationDisplay(moduleName, node.loc)}`, false, {
                      id: 'attrs-arg-access',
                      url: 'https://deprecations.emberjs.com/v3.x/#toc_attrs-arg-access',
                      until: '6.0.0',
                      for: 'ember-source',
                      since: {
                        available: '3.26.0',
                        enabled: '3.26.0'
                      }
                    }));
                    return b.path(`@${node.original.slice(11)}`, node.loc);
                  }
                }
              }
            };
          }
          function isAttrs(node, symbols) {
            return node.head.type === 'VarHead' && node.head.name === 'attrs' && symbols.indexOf(node.head.name) === -1;
          }
          function isThisDotAttrs(node) {
            return node.head.type === 'ThisHead' && node.tail[0] === 'attrs';
          }

          const emberTemplateCompilerLibPluginsAssertAgainstAttrs = /*#__PURE__*/Object.defineProperty({
                    __proto__: null,
                    default: assertAgainstAttrs
          }, Symbol.toStringTag, { value: 'Module' });

          /**
           @module ember
          */

          /**
            Prevents usage of named outlets, a legacy concept in Ember removed in 4.0.

            @private
            @class AssertAgainstNamedOutlets
          */
          function assertAgainstNamedOutlets(env) {
            let moduleName = env.meta?.moduleName;
            return {
              name: 'assert-against-named-outlets',
              visitor: {
                MustacheStatement(node) {
                  if (node.path.type === 'PathExpression' && node.path.original === 'outlet' && node.params[0]) {
                    let sourceInformation = calculateLocationDisplay(moduleName, node.loc);
                    (assert(`Named outlets were removed in Ember 4.0. See https://deprecations.emberjs.com/v3.x#toc_route-render-template for guidance on alternative APIs for named outlet use cases. ${sourceInformation}`));
                  }
                }
              }
            };
          }

          const emberTemplateCompilerLibPluginsAssertAgainstNamedOutlets = /*#__PURE__*/Object.defineProperty({
                    __proto__: null,
                    default: assertAgainstNamedOutlets
          }, Symbol.toStringTag, { value: 'Module' });

          function isPath(node) {
            return node.type === 'PathExpression';
          }
          function isSubExpression(node) {
            return node.type === 'SubExpression';
          }
          function isStringLiteral(node) {
            return node.type === 'StringLiteral';
          }
          function getLocalName(node) {
            if (typeof node === 'string') {
              return node;
            } else {
              return node.original;
            }
          }
          function trackLocals() {
            let locals = new Map();
            let node = {
              enter(node) {
                let params = 'params' in node ? node.params : node.blockParams;
                for (let param of params) {
                  let name = getLocalName(param);
                  let value = locals.get(param) || 0;
                  locals.set(name, value + 1);
                }
              },
              exit(node) {
                let params = 'params' in node ? node.params : node.blockParams;
                for (let param of params) {
                  let name = getLocalName(param);
                  let value = locals.get(name) - 1;
                  if (value === 0) {
                    locals.delete(name);
                  } else {
                    locals.set(name, value);
                  }
                }
              }
            };
            return {
              hasLocal: key => locals.has(key),
              node
            };
          }

          const emberTemplateCompilerLibPluginsUtils = /*#__PURE__*/Object.defineProperty({
                    __proto__: null,
                    isPath,
                    isStringLiteral,
                    isSubExpression,
                    trackLocals
          }, Symbol.toStringTag, { value: 'Module' });

          function errorOnInputWithContent(env) {
            let moduleName = env.meta?.moduleName;
            return {
              name: 'assert-input-helper-without-block',
              visitor: {
                BlockStatement(node) {
                  if (isPath(node.path) && node.path.original === 'input') {
                    (assert(assertMessage$1(moduleName, node)));
                  }
                }
              }
            };
          }
          function assertMessage$1(moduleName, node) {
            let sourceInformation = calculateLocationDisplay(moduleName, node.loc);
            return `The {{input}} helper cannot be used in block form. ${sourceInformation}`;
          }

          const emberTemplateCompilerLibPluginsAssertInputHelperWithoutBlock = /*#__PURE__*/Object.defineProperty({
                    __proto__: null,
                    default: errorOnInputWithContent
          }, Symbol.toStringTag, { value: 'Module' });

          function assertReservedNamedArguments(env) {
            let moduleName = env.meta?.moduleName;
            return {
              name: 'assert-reserved-named-arguments',
              visitor: {
                // In general, we don't assert on the invocation side to avoid creating migration
                // hazards (e.g. using angle bracket to invoke a classic component that uses
                // `this.someReservedName`. However, we want to avoid leaking special internal
                // things, such as `__ARGS__`, so those would need to be asserted on both sides.

                AttrNode({
                  name,
                  loc
                }) {
                  if (name === '@__ARGS__') {
                    (assert(`${assertMessage(name)} ${calculateLocationDisplay(moduleName, loc)}`));
                  }
                },
                HashPair({
                  key,
                  loc
                }) {
                  if (key === '__ARGS__') {
                    (assert(`${assertMessage(key)} ${calculateLocationDisplay(moduleName, loc)}`));
                  }
                },
                PathExpression({
                  original,
                  loc
                }) {
                  if (isReserved(original)) {
                    (assert(`${assertMessage(original)} ${calculateLocationDisplay(moduleName, loc)}`));
                  }
                }
              }
            };
          }
          const RESERVED = ['@arguments', '@args', '@block', '@else'];
          function isReserved(name) {
            return RESERVED.indexOf(name) !== -1 || Boolean(name.match(/^@[^a-z]/));
          }
          function assertMessage(name) {
            return `'${name}' is reserved.`;
          }

          const emberTemplateCompilerLibPluginsAssertReservedNamedArguments = /*#__PURE__*/Object.defineProperty({
                    __proto__: null,
                    default: assertReservedNamedArguments
          }, Symbol.toStringTag, { value: 'Module' });

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

          function transformActionSyntax({
            syntax
          }) {
            let {
              builders: b
            } = syntax;
            return {
              name: 'transform-action-syntax',
              visitor: {
                ElementModifierStatement(node) {
                  if (isAction(node)) {
                    insertThisAsFirstParam(node, b);
                  }
                },
                MustacheStatement(node) {
                  if (isAction(node)) {
                    insertThisAsFirstParam(node, b);
                  }
                },
                SubExpression(node) {
                  if (isAction(node)) {
                    insertThisAsFirstParam(node, b);
                  }
                }
              }
            };
          }
          function isAction(node) {
            return isPath(node.path) && node.path.original === 'action';
          }
          function insertThisAsFirstParam(node, builders) {
            node.params.unshift(builders.path('this'));
          }

          const emberTemplateCompilerLibPluginsTransformActionSyntax = /*#__PURE__*/Object.defineProperty({
                    __proto__: null,
                    default: transformActionSyntax
          }, Symbol.toStringTag, { value: 'Module' });

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
            let {
              builders: b
            } = env.syntax;
            return {
              name: 'transform-each-in-into-each',
              visitor: {
                BlockStatement(node) {
                  if (isPath(node.path) && node.path.original === 'each-in') {
                    node.params[0] = b.sexpr(b.path('-each-in'), [node.params[0]]);
                    let blockParams = node.program.blockParams;
                    if (!blockParams || blockParams.length === 0) ; else if (blockParams.length === 1) {
                      // insert a dummy variable for the first slot
                      // pick a name that won't parse so it won't shadow any real variables
                      blockParams = ['( unused value )', blockParams[0]];
                    } else {
                      let key = blockParams.shift();
                      let value = blockParams.shift();
                      blockParams = [value, key, ...blockParams];
                    }
                    node.program.blockParams = blockParams;
                    return b.block(b.path('each'), node.params, node.hash, node.program, node.inverse, node.loc);
                  }
                }
              }
            };
          }

          const emberTemplateCompilerLibPluginsTransformEachInIntoEach = /*#__PURE__*/Object.defineProperty({
                    __proto__: null,
                    default: transformEachInIntoEach
          }, Symbol.toStringTag, { value: 'Module' });

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
            let {
              builders: b
            } = env.syntax;
            return {
              name: 'transform-each-track-array',
              visitor: {
                BlockStatement(node) {
                  if (isPath(node.path) && node.path.original === 'each') {
                    let firstParam = node.params[0];
                    (!(firstParam) && assert('has firstParam', firstParam));
                    if (firstParam.type === 'SubExpression' && firstParam.path.type === 'PathExpression' && firstParam.path.original === '-each-in') {
                      return;
                    }
                    node.params[0] = b.sexpr(b.path('-track-array'), [firstParam]);
                    return b.block(b.path('each'), node.params, node.hash, node.program, node.inverse, node.loc);
                  }
                }
              }
            };
          }

          const emberTemplateCompilerLibPluginsTransformEachTrackArray = /*#__PURE__*/Object.defineProperty({
                    __proto__: null,
                    default: transformEachTrackArray
          }, Symbol.toStringTag, { value: 'Module' });

          /**
           @module ember
          */

          /**
            A Glimmer2 AST transformation that handles the public `{{in-element}}` as per RFC287.

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
            let {
              builders: b
            } = env.syntax;
            return {
              name: 'transform-in-element',
              visitor: {
                BlockStatement(node) {
                  if (!isPath(node.path)) return;
                  if (node.path.original === 'in-element') {
                    let originalValue = node.params[0];
                    if (originalValue && !env.isProduction) {
                      let subExpr = b.sexpr('-in-el-null', [originalValue]);
                      node.params.shift();
                      node.params.unshift(subExpr);
                    }
                    node.hash.pairs.forEach(pair => {
                      if (pair.key === 'insertBefore') {
                        (!(pair.value.type === 'NullLiteral' || pair.value.type === 'UndefinedLiteral') && assert(`Can only pass null to insertBefore in in-element, received: ${JSON.stringify(pair.value)}`, pair.value.type === 'NullLiteral' || pair.value.type === 'UndefinedLiteral'));
                      }
                    });
                  }
                }
              }
            };
          }

          const emberTemplateCompilerLibPluginsTransformInElement = /*#__PURE__*/Object.defineProperty({
                    __proto__: null,
                    default: transformInElement
          }, Symbol.toStringTag, { value: 'Module' });

          function transformQuotedBindingsIntoJustBindings( /* env */
          ) {
            return {
              name: 'transform-quoted-bindings-into-just-bindings',
              visitor: {
                ElementNode(node) {
                  let styleAttr = getStyleAttr(node);
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
            let value = attr.value;
            if (!value || value.type !== 'ConcatStatement' || value.parts.length !== 1) {
              return false;
            }
            let onlyPart = value.parts[0];
            return onlyPart.type === 'MustacheStatement';
          }
          function getStyleAttr(node) {
            let attributes = node.attributes;
            for (let attribute of attributes) {
              if (attribute.name === 'style') {
                return attribute;
              }
            }
            return undefined;
          }

          const emberTemplateCompilerLibPluginsTransformQuotedBindingsIntoJustBindings = /*#__PURE__*/Object.defineProperty({
                    __proto__: null,
                    default: transformQuotedBindingsIntoJustBindings
          }, Symbol.toStringTag, { value: 'Module' });

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

          const TARGETS = Object.freeze(['helper', 'modifier']);
          function transformResolutions(env) {
            let {
              builders: b
            } = env.syntax;
            let moduleName = env.meta?.moduleName;
            let {
              hasLocal,
              node: tracker
            } = trackLocals();
            let seen;
            return {
              name: 'transform-resolutions',
              visitor: {
                Template: {
                  enter() {
                    seen = new Set();
                  },
                  exit() {
                    seen = undefined;
                  }
                },
                Block: tracker,
                ElementNode: {
                  keys: {
                    children: tracker
                  }
                },
                MustacheStatement(node) {
                  (!(seen) && assert('[BUG] seen set should be available', seen));
                  if (seen.has(node)) {
                    return;
                  }
                  if (isPath(node.path) && !isLocalVariable(node.path, hasLocal) && TARGETS.indexOf(node.path.original) !== -1) {
                    let result = b.mustache(node.path, transformParams(b, node.params, node.path.original, moduleName, node.loc), node.hash, node.trusting, node.loc, node.strip);

                    // Avoid double/infinite-processing
                    seen.add(result);
                    return result;
                  }
                },
                SubExpression(node) {
                  (!(seen) && assert('[BUG] seen set should be available', seen));
                  if (seen.has(node)) {
                    return;
                  }
                  if (isPath(node.path) && !isLocalVariable(node.path, hasLocal) && TARGETS.indexOf(node.path.original) !== -1) {
                    let result = b.sexpr(node.path, transformParams(b, node.params, node.path.original, moduleName, node.loc), node.hash, node.loc);

                    // Avoid double/infinite-processing
                    seen.add(result);
                    return result;
                  }
                }
              }
            };
          }
          function isLocalVariable(node, hasLocal) {
            return !(node.head.type === 'ThisHead') && node.tail.length === 1 && hasLocal(node.head.original);
          }
          function transformParams(b, params, type, moduleName, loc) {
            let [first, ...rest] = params;
            (!(first) && assert(`The ${type} keyword requires at least one positional arguments ${calculateLocationDisplay(moduleName, loc)}`, first));
            if (isStringLiteral(first)) {
              return [b.sexpr(b.path('-resolve', first.loc), [b.string(`${type}:${first.value}`)], undefined, first.loc), ...rest];
            } else {
              return [b.sexpr(b.path('-disallow-dynamic-resolution', first.loc), [first], b.hash([b.pair('type', b.string(type), first.loc), b.pair('loc', b.string(calculateLocationDisplay(moduleName, loc)), first.loc), b.pair('original', b.string(build(first)))]), first.loc), ...rest];
            }
          }

          const emberTemplateCompilerLibPluginsTransformResolutions = /*#__PURE__*/Object.defineProperty({
                    __proto__: null,
                    default: transformResolutions
          }, Symbol.toStringTag, { value: 'Module' });

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
            let {
              builders: b
            } = env.syntax;
            let {
              hasLocal,
              node
            } = trackLocals();
            return {
              name: 'transform-wrap-mount-and-outlet',
              visitor: {
                Template: node,
                ElementNode: node,
                Block: node,
                MustacheStatement(node) {
                  if (isPath(node.path) && (node.path.original === 'mount' || node.path.original === 'outlet') && !hasLocal(node.path.original)) {
                    let subexpression = b.sexpr(b.path(`-${node.path.original}`), node.params, node.hash, node.loc);
                    return b.mustache(b.path('component'), [subexpression], b.hash(), undefined, node.loc);
                  }
                }
              }
            };
          }

          const emberTemplateCompilerLibPluginsTransformWrapMountAndOutlet = /*#__PURE__*/Object.defineProperty({
                    __proto__: null,
                    default: transformWrapMountAndOutlet
          }, Symbol.toStringTag, { value: 'Module' });

          // order of plugins is important
          const RESOLUTION_MODE_TRANSFORMS = Object.freeze([transformQuotedBindingsIntoJustBindings, assertReservedNamedArguments, transformActionSyntax, assertAgainstAttrs, transformEachInIntoEach, errorOnInputWithContent, transformInElement, transformEachTrackArray, assertAgainstNamedOutlets, transformWrapMountAndOutlet, transformResolutions]);
          const STRICT_MODE_TRANSFORMS = Object.freeze([transformQuotedBindingsIntoJustBindings, assertReservedNamedArguments, transformActionSyntax, transformEachInIntoEach, transformInElement, transformEachTrackArray, assertAgainstNamedOutlets, transformWrapMountAndOutlet]);
          const STRICT_MODE_KEYWORDS = Object.freeze(['action', 'mut', 'readonly', 'unbound',
          // TransformEachInIntoEach
          '-each-in',
          // TransformInElement
          '-in-el-null',
          // TransformEachTrackArray
          '-track-array',
          // TransformWrapMountAndOutlet
          '-mount', '-outlet']);

          const emberTemplateCompilerLibPluginsIndex = /*#__PURE__*/Object.defineProperty({
                    __proto__: null,
                    RESOLUTION_MODE_TRANSFORMS,
                    STRICT_MODE_KEYWORDS,
                    STRICT_MODE_TRANSFORMS
          }, Symbol.toStringTag, { value: 'Module' });

          /*
            This diverges from `Ember.String.dasherize` so that`<XFoo />` can resolve to `x-foo`.
            `Ember.String.dasherize` would resolve it to `xfoo`..
          */
          const SIMPLE_DASHERIZE_REGEXP = /[A-Z]|::/g;
          const ALPHA = /[A-Za-z0-9]/;
          const COMPONENT_NAME_SIMPLE_DASHERIZE_CACHE = new Cache(1000, key => key.replace(SIMPLE_DASHERIZE_REGEXP, (char, index) => {
            if (char === '::') {
              return '/';
            }
            if (index === 0 || !ALPHA.test(key[index - 1])) {
              return char.toLowerCase();
            }
            return `-${char.toLowerCase()}`;
          }));

          const emberTemplateCompilerLibSystemDasherizeComponentName = /*#__PURE__*/Object.defineProperty({
                    __proto__: null,
                    default: COMPONENT_NAME_SIMPLE_DASHERIZE_CACHE
          }, Symbol.toStringTag, { value: 'Module' });

          let USER_PLUGINS = [];
          function malformedComponentLookup(string) {
            return string.indexOf('::') === -1 && string.indexOf(':') > -1;
          }
          function buildCompileOptions(_options) {
            let moduleName = _options.moduleName;
            let options = Object.assign({
              meta: {},
              isProduction: false,
              plugins: {
                ast: []
              }
            }, _options, {
              moduleName,
              customizeComponentName(tagname) {
                (!(!malformedComponentLookup(tagname)) && assert(`You tried to invoke a component named <${tagname} /> in "${moduleName ?? '[NO MODULE]'}", but that is not a valid name for a component. Did you mean to use the "::" syntax for nested components?`, !malformedComponentLookup(tagname)));
                return COMPONENT_NAME_SIMPLE_DASHERIZE_CACHE.get(tagname);
              }
            });
            if ('locals' in options && !options.locals) {
              // Glimmer's precompile options declare `locals` like:
              //    locals?: string[]
              // but many in-use versions of babel-plugin-htmlbars-inline-precompile will
              // set locals to `null`. This used to work but only because glimmer was
              // ignoring locals for non-strict templates, and now it supports that case.
              delete options.locals;
            }

            // move `moduleName` into `meta` property
            if (options.moduleName) {
              let meta = options.meta;
              (!(meta) && assert('has meta', meta)); // We just set it
              meta.moduleName = options.moduleName;
            }
            if (options.strictMode) {
              options.keywords = STRICT_MODE_KEYWORDS;
            }
            return options;
          }
          function transformsFor(options) {
            return options.strictMode ? STRICT_MODE_TRANSFORMS : RESOLUTION_MODE_TRANSFORMS;
          }
          function compileOptions(_options = {}) {
            let options = buildCompileOptions(_options);
            let builtInPlugins = transformsFor(options);
            if (!_options.plugins) {
              options.plugins = {
                ast: [...USER_PLUGINS, ...builtInPlugins]
              };
            } else {
              let potententialPugins = [...USER_PLUGINS, ...builtInPlugins];
              (!(options.plugins) && assert('expected plugins', options.plugins));
              let pluginsToAdd = potententialPugins.filter(plugin => {
                (!(options.plugins) && assert('expected plugins', options.plugins));
                return options.plugins.ast.indexOf(plugin) === -1;
              });
              options.plugins.ast = options.plugins.ast.concat(pluginsToAdd);
            }
            return options;
          }

          const emberTemplateCompilerLibSystemCompileOptions = /*#__PURE__*/Object.defineProperty({
                    __proto__: null,
                    buildCompileOptions,
                    default: compileOptions,
                    transformsFor
          }, Symbol.toStringTag, { value: 'Module' });

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
          function precompile(templateString, options = {}) {
            return precompile$1(templateString, compileOptions(options));
          }

          const emberTemplateCompilerLibSystemPrecompile = /*#__PURE__*/Object.defineProperty({
                    __proto__: null,
                    default: precompile
          }, Symbol.toStringTag, { value: 'Module' });

          /**
          @module ember
          */


          /**
            Uses HTMLBars `compile` function to process a string into a compiled template.
            This is not present in production builds.
            @private
            @method compile
            @param {String} templateString This is the string to be compiled by HTMLBars.
            @param {Object} options This is an options hash to augment the compiler options.
          */
          function compile(templateString, options = {}) {
            if (!emberGlimmer.template) {
              throw new Error('Cannot call `compile` with only the template compiler loaded. Please load `ember.debug.js` or `ember.prod.js` prior to calling `compile`.');
            }
            return emberGlimmer.template(evaluate(precompile(templateString, options)));
          }
          function evaluate(precompiled) {
            return new Function(`return ${precompiled}`)();
          }

          const emberTemplateCompilerLibSystemCompile = /*#__PURE__*/Object.defineProperty({
                    __proto__: null,
                    default: compile
          }, Symbol.toStringTag, { value: 'Module' });

          const emberTemplateCompilerLibPublicApi = /*#__PURE__*/Object.defineProperty({
                    __proto__: null,
                    RESOLUTION_MODE_TRANSFORMS,
                    STRICT_MODE_TRANSFORMS,
                    VERSION: version,
                    _Ember: ember,
                    _GlimmerSyntax: glimmerSyntax,
                    _buildCompileOptions: buildCompileOptions,
                    _precompile: precompile$1,
                    _preprocess: preprocess,
                    _print: build,
                    _transformsFor: transformsFor,
                    compile,
                    compileOptions,
                    precompile
          }, Symbol.toStringTag, { value: 'Module' });

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
          function bootstrap({
            context,
            hasTemplate,
            setTemplate
          }) {
            if (!context) {
              context = document;
            }
            let selector = 'script[type="text/x-handlebars"]';
            let elements = context.querySelectorAll(selector);
            for (let script of elements) {
              // Get the name of the script
              // First look for data-template-name attribute, then fall back to its
              // id if no name is found.
              let templateName = script.getAttribute('data-template-name') || script.getAttribute('id') || 'application';
              let template;
              template = compile(script.innerHTML, {
                moduleName: templateName
              });

              // Check if template of same name already exists.
              if (hasTemplate(templateName)) {
                throw new Error(`Template named "${templateName}" already exists.`);
              }

              // For templates which have a name, we save them and then remove them from the DOM.
              setTemplate(templateName, template);

              // Remove script tag from DOM.
              script.parentNode.removeChild(script);
            }
          }

          const emberTemplateCompilerLibSystemBootstrap = /*#__PURE__*/Object.defineProperty({
                    __proto__: null,
                    default: bootstrap
          }, Symbol.toStringTag, { value: 'Module' });

          // Globals mode template compiler
          if (emberApp__namespace.default) {
            let Application = emberApp__namespace.default;
            let {
              hasTemplate,
              setTemplate
            } = emberGlimmer__namespace;
            let {
              hasDOM
            } = emberinternalsBrowserEnvironmentIndex;
            Application.initializer({
              name: 'domTemplates',
              initialize() {
                if (hasDOM) {
                  bootstrap({
                    context: document,
                    hasTemplate,
                    setTemplate
                  });
                }
              }
            });
          }

          const emberTemplateCompilerLibSystemInitializer = /*#__PURE__*/Object.defineProperty({
                    __proto__: null
          }, Symbol.toStringTag, { value: 'Module' });

          templateCompilation.__registerTemplateCompiler(emberTemplateCompilerLibPublicApi);

          const emberTemplateCompilerIndex = /*#__PURE__*/Object.defineProperty({
                    __proto__: null,
                    RESOLUTION_MODE_TRANSFORMS,
                    STRICT_MODE_TRANSFORMS,
                    VERSION: version,
                    _Ember: ember,
                    _GlimmerSyntax: glimmerSyntax,
                    _buildCompileOptions: buildCompileOptions,
                    _precompile: precompile$1,
                    _preprocess: preprocess,
                    _print: build,
                    _transformsFor: transformsFor,
                    compile,
                    compileOptions,
                    precompile
          }, Symbol.toStringTag, { value: 'Module' });

          const emberTemplateCompilerLibTypes = /*#__PURE__*/Object.defineProperty({
                    __proto__: null
          }, Symbol.toStringTag, { value: 'Module' });

          // The main entrypoint of ember-template-compiler is the fairly-crufty
          // backward-compatible API. In contrast, this is the subset of that that's
          // actually used by babel-plugin-ember-template-compilation.
          //
          // This module exists so that ember-source can build itself -- the
          // ember-template-compiler.js bundle it an output of the build, but the build
          // needs to compile templates. Unlike the full ./index.ts, this module can be
          // directly evaluted in node because it doesn't try to pull in the whole kitchen
          // sink.

          const emberTemplateCompilerMinimal = /*#__PURE__*/Object.defineProperty({
                    __proto__: null,
                    _buildCompileOptions: buildCompileOptions,
                    _preprocess: preprocess,
                    _print: build,
                    precompile
          }, Symbol.toStringTag, { value: 'Module' });

          /* eslint-disable */

          d('@ember/-internals/browser-environment/index', emberinternalsBrowserEnvironmentIndex);
          d('@ember/-internals/environment/index', emberinternalsEnvironmentIndex);
          d('@ember/-internals/utils/index', emberinternalsUtilsIndex);
          d('@ember/canary-features/index', emberCanaryFeaturesIndex);
          d('@ember/debug/index', emberDebugIndex);
          d('@ember/debug/lib/capture-render-tree', emberDebugLibCaptureRenderTree);
          d('@ember/debug/lib/deprecate', emberDebugLibDeprecate);
          d('@ember/debug/lib/handlers', emberDebugLibHandlers);
          d('@ember/debug/lib/inspect', emberDebugLibInspect);
          d('@ember/debug/lib/testing', emberDebugLibTesting);
          d('@ember/debug/lib/warn', emberDebugLibWarn);
          d('@ember/deprecated-features/index', emberDeprecatedFeaturesIndex);
          d('@glimmer/compiler', glimmerCompiler);
          d('@glimmer/env', glimmerEnv);
          d('@glimmer/syntax', glimmerSyntax);
          d('@glimmer/util', glimmerUtil);
          d('@glimmer/vm', glimmerVm);
          d('@glimmer/wire-format', glimmerWireFormat);
          d('@handlebars/parser/index', handlebarsParserIndex);
          d('ember-template-compiler/index', emberTemplateCompilerIndex);
          d('ember-template-compiler/lib/plugins/assert-against-attrs', emberTemplateCompilerLibPluginsAssertAgainstAttrs);
          d('ember-template-compiler/lib/plugins/assert-against-named-outlets', emberTemplateCompilerLibPluginsAssertAgainstNamedOutlets);
          d('ember-template-compiler/lib/plugins/assert-input-helper-without-block', emberTemplateCompilerLibPluginsAssertInputHelperWithoutBlock);
          d('ember-template-compiler/lib/plugins/assert-reserved-named-arguments', emberTemplateCompilerLibPluginsAssertReservedNamedArguments);
          d('ember-template-compiler/lib/plugins/index', emberTemplateCompilerLibPluginsIndex);
          d('ember-template-compiler/lib/plugins/transform-action-syntax', emberTemplateCompilerLibPluginsTransformActionSyntax);
          d('ember-template-compiler/lib/plugins/transform-each-in-into-each', emberTemplateCompilerLibPluginsTransformEachInIntoEach);
          d('ember-template-compiler/lib/plugins/transform-each-track-array', emberTemplateCompilerLibPluginsTransformEachTrackArray);
          d('ember-template-compiler/lib/plugins/transform-in-element', emberTemplateCompilerLibPluginsTransformInElement);
          d('ember-template-compiler/lib/plugins/transform-quoted-bindings-into-just-bindings', emberTemplateCompilerLibPluginsTransformQuotedBindingsIntoJustBindings);
          d('ember-template-compiler/lib/plugins/transform-resolutions', emberTemplateCompilerLibPluginsTransformResolutions);
          d('ember-template-compiler/lib/plugins/transform-wrap-mount-and-outlet', emberTemplateCompilerLibPluginsTransformWrapMountAndOutlet);
          d('ember-template-compiler/lib/plugins/utils', emberTemplateCompilerLibPluginsUtils);
          d('ember-template-compiler/lib/public-api', emberTemplateCompilerLibPublicApi);
          d('ember-template-compiler/lib/system/bootstrap', emberTemplateCompilerLibSystemBootstrap);
          d('ember-template-compiler/lib/system/calculate-location-display', emberTemplateCompilerLibSystemCalculateLocationDisplay);
          d('ember-template-compiler/lib/system/compile-options', emberTemplateCompilerLibSystemCompileOptions);
          d('ember-template-compiler/lib/system/compile', emberTemplateCompilerLibSystemCompile);
          d('ember-template-compiler/lib/system/dasherize-component-name', emberTemplateCompilerLibSystemDasherizeComponentName);
          d('ember-template-compiler/lib/system/initializer', emberTemplateCompilerLibSystemInitializer);
          d('ember-template-compiler/lib/system/precompile', emberTemplateCompilerLibSystemPrecompile);
          d('ember-template-compiler/lib/types', emberTemplateCompilerLibTypes);
          d('ember-template-compiler/minimal', emberTemplateCompilerMinimal);
          d('ember/version', emberVersion);
          d('simple-html-tokenizer', simpleHtmlTokenizer);
          if (typeof module === 'object' && module.exports) {
            module.exports = emberTemplateCompilerIndex;
          }

})((() => {
      try { 
        return require('ember');
      } catch (err) {
        return {
      get ENV() { return require('@ember/-internals/environment').ENV },
      get FEATURES() { return require('@ember/canary-features').FEATURES },
      get VERSION() { return require('ember/version').default },
    }
      }
    })(), (() => {
      try { 
        return require('@ember/-internals/glimmer');
      } catch (err) {
        return { template: undefined }
      }
    })(), (() => {
      try { 
        return require('@ember/template-compilation');
      } catch (err) {
        return { __registerTemplateCompiler(){} }
      }
    })(), (() => {
      try { 
        return require('@ember/application');
      } catch (err) {
        return undefined
      }
    })());
//# sourceMappingURL=ember-template-compiler.js.map
