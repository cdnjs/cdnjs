/*! indexeddbshim - v16.0.0 - 6/14/2025 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.IDBKeyUtils = {}));
})(this, (function (exports) { 'use strict';

  function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }
  function _arrayWithHoles(r) {
    if (Array.isArray(r)) return r;
  }
  function _arrayWithoutHoles(r) {
    if (Array.isArray(r)) return _arrayLikeToArray(r);
  }
  function _createForOfIteratorHelper(r, e) {
    var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (!t) {
      if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e) {
        t && (r = t);
        var n = 0,
          F = function () {};
        return {
          s: F,
          n: function () {
            return n >= r.length ? {
              done: true
            } : {
              done: false,
              value: r[n++]
            };
          },
          e: function (r) {
            throw r;
          },
          f: F
        };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var o,
      a = true,
      u = false;
    return {
      s: function () {
        t = t.call(r);
      },
      n: function () {
        var r = t.next();
        return a = r.done, r;
      },
      e: function (r) {
        u = true, o = r;
      },
      f: function () {
        try {
          a || null == t.return || t.return();
        } finally {
          if (u) throw o;
        }
      }
    };
  }
  function _iterableToArray(r) {
    if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
  }
  function _iterableToArrayLimit(r, l) {
    var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (null != t) {
      var e,
        n,
        i,
        u,
        a = [],
        f = true,
        o = false;
      try {
        if (i = (t = t.call(r)).next, 0 === l) ; else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
      } catch (r) {
        o = true, n = r;
      } finally {
        try {
          if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
        } finally {
          if (o) throw n;
        }
      }
      return a;
    }
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _slicedToArray(r, e) {
    return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
  }
  function _toConsumableArray(r) {
    return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
  }
  function _typeof(o) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
  }
  function _unsupportedIterableToArray(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
  }

  /* eslint-disable jsdoc/valid-types -- https://github.com/jsdoc-type-pratt-parser/jsdoc-type-pratt-parser/issues/147 */
  /**
   * @typedef {T[keyof T]} ValueOf<T>
   * @template T
   */
  /* eslint-enable jsdoc/valid-types -- https://github.com/jsdoc-type-pratt-parser/jsdoc-type-pratt-parser/issues/147 */

  /**
   * @typedef {{unlink: (path: string, cb: import('fs').NoParamCallback) => void}} FSApi
   */

  /**
   * @typedef {{
   *   DEBUG: boolean,
   *   cacheDatabaseInstances: boolean,
   *   autoName: boolean,
   *   fullIDLSupport: boolean,
   *   checkOrigin: boolean,
   *   cursorPreloadPackSize: number,
   *   UnicodeIDStart: string,
   *   UnicodeIDContinue: string,
   *   registerSCA: (
   *     preset: import('typeson').Preset
   *   ) => import('typeson').Preset,
   *   avoidAutoShim: boolean,
   *   win: {
   *     openDatabase: (name: string, version: string, displayName: string, estimatedSize: number) => import('websql-configurable').default
   *   },
   *   DEFAULT_DB_SIZE: number,
   *   useSQLiteIndexes: boolean,
   *   fs: FSApi,
   *   addNonIDBGlobals: boolean,
   *   replaceNonIDBGlobals: boolean,
   *   escapeDatabaseName: (name: string) => string,
   *   unescapeDatabaseName: (name: string) => string,
   *   databaseCharacterEscapeList: string|false,
   *   databaseNameLengthLimit: number|false,
   *   escapeNFDForDatabaseNames: boolean,
   *   addSQLiteExtension: boolean,
   *   memoryDatabase: string,
   *   deleteDatabaseFiles: boolean,
   *   databaseBasePath: string,
   *   sysDatabaseBasePath: string,
   *   sqlBusyTimeout: number,
   *   sqlTrace: () => void,
   *   sqlProfile: () => void,
   *   createIndexes: boolean
   * }} ConfigValues
   */

  /**
   * @typedef {ValueOf<ConfigValues>} ConfigValue
   */

  /** @type {{[key: string]: ConfigValue}} */
  var map = {};
  var CFG = /** @type {ConfigValues} */{};

  /**
   * @typedef {keyof ConfigValues} KeyofConfigValues
   */

  /**
   * @typedef {KeyofConfigValues[]} Config
   */

  /** @type {Config} */
  [
  // Boolean for verbose reporting
  'DEBUG',
  // Effectively defaults to false (ignored unless `true`)

  // Boolean (effectively defaults to true) on whether to cache WebSQL
  //  `openDatabase` instances
  'cacheDatabaseInstances',
  // Boolean on whether to auto-name databases (based on an
  //   auto-increment) when the empty string is supplied; useful with
  //   `memoryDatabase`; defaults to `false` which means the empty string
  //   will be used as the (valid) database name
  'autoName',
  // Determines whether the slow-performing `Object.setPrototypeOf`
  //    calls required for full WebIDL compliance will be used. Probably
  //    only needed for testing or environments where full introspection
  //    on class relationships is required; see
  //    http://stackoverflow.com/questions/41927589/rationales-consequences-of-webidl-class-inheritance-requirements
  'fullIDLSupport',
  // Effectively defaults to false (ignored unless `true`)

  // Boolean on whether to perform origin checks in `IDBFactory` methods
  // Effectively defaults to `true` (must be set to `false` to cancel checks)
  'checkOrigin',
  // Used by `IDBCursor` continue methods for number of records to cache;
  //  Defaults to 100
  'cursorPreloadPackSize',
  // See optional API (`shimIndexedDB.__setUnicodeIdentifiers`);
  //    or just use the Unicode builds which invoke this method
  //    automatically using the large, fully spec-compliant, regular
  //    expression strings of `src/UnicodeIdentifiers.js`)
  // In the non-Unicode builds, defaults to /[$A-Z_a-z]/
  'UnicodeIDStart',
  // In the non-Unicode builds, defaults to /[$0-9A-Z_a-z]/
  'UnicodeIDContinue',
  // Used by SCA.js for optional restructuring of typeson-registry
  //   Structured Cloning Algorithm; should only be needed for ensuring data
  //   created in 3.* versions of IndexedDBShim continue to work; see the
  //   library `typeson-registry-sca-reverter` to get a function to do this
  'registerSCA',
  // BROWSER-SPECIFIC CONFIG
  'avoidAutoShim',
  // Where WebSQL is detected but where `indexedDB` is
  //    missing or poor support is known (non-Chrome Android or
  //    non-Safari iOS9), the shim will be auto-applied without
  //   `shimIndexedDB.__useShim()`. Set this to `true` to avoid forcing
  //    the shim for such cases.

  // -----------SQL CONFIG----------
  // Object (`window` in the browser) on which there may be an
  //  `openDatabase` method (if any) for WebSQL. (The browser
  //  throws if attempting to call `openDatabase` without the window
  //  so this is why the config doesn't just allow the function.)
  // Defaults to `window` or `self` in browser builds or
  //  a singleton object with the `openDatabase` method set to
  //  the "websql" package in Node.
  'win',
  // For internal `openDatabase` calls made by `IDBFactory` methods;
  //  per the WebSQL spec, "User agents are expected to use the display name
  //  and the estimated database size to optimize the user experience.
  //  For example, a user agent could use the estimated size to suggest an
  //  initial quota to the user. This allows a site that is aware that it
  //  will try to use hundreds of megabytes to declare this upfront, instead
  //  of the user agent prompting the user for permission to increase the
  //  quota every five megabytes."
  // Defaults to (4 * 1024 * 1024) or (25 * 1024 * 1024) in Safari
  'DEFAULT_DB_SIZE',
  // Whether to create indexes on SQLite tables (and also whether to try
  //   dropping)
  // Effectively defaults to `false` (ignored unless `true`)
  'useSQLiteIndexes',
  // NODE-IMPINGING SETTINGS (created for sake of limitations in Node
  //    or desktop file system implementation but applied by default in
  //    browser for parity)

  // File system module with `unlink` to remove deleted database files
  'fs',
  // Used when setting global shims to determine whether to try to add
  //   other globals shimmed by the library (`ShimDOMException`,
  //   `ShimDOMStringList`, `ShimEvent`, `ShimCustomEvent`, `ShimEventTarget`)
  // Effectively defaults to `false` (ignored unless `true`)
  'addNonIDBGlobals',
  // Used when setting global shims to determine whether to try to overwrite
  //   other globals shimmed by the library (`DOMException`, `DOMStringList`,
  //   `Event`, `CustomEvent`, `EventTarget`)
  // Effectively defaults to `false` (ignored unless `true`)
  'replaceNonIDBGlobals',
  // Overcoming limitations with node-sqlite3/storing database name on
  //   file systems
  // https://en.wikipedia.org/wiki/Filename#Reserved_characters_and_words
  // Defaults to prefixing database with `D_`, escaping
  //   `databaseCharacterEscapeList`, escaping NUL, and
  //   escaping upper case letters, as well as enforcing
  //   `databaseNameLengthLimit`
  'escapeDatabaseName',
  // Not used internally; usable as a convenience method
  'unescapeDatabaseName',
  // Defaults to global regex representing the following
  //   (characters nevertheless commonly reserved in modern,
  //   Unicode-supporting systems): 0x00-0x1F 0x7F " * / : < > ? \ |
  'databaseCharacterEscapeList',
  // Defaults to 254 (shortest typical modern file length limit)
  'databaseNameLengthLimit',
  // Boolean defaulting to true on whether to escape NFD-escaping
  //   characters to avoid clashes on MacOS which performs NFD on files
  'escapeNFDForDatabaseNames',
  // Boolean on whether to add the `.sqlite` extension to file names;
  //   defaults to `true`
  'addSQLiteExtension',
  // Various types of in-memory databases that can auto-delete
  ['memoryDatabase',
  /**
   * @param {string} val
   * @throws {TypeError}
   * @returns {void}
   */
  function (val) {
    if (!/^(?::memory:|file::memory:(\?(?:[\0-"\$-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*)?(#(?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*)?)?$/.test(/** @type {string} */val)) {
      throw new TypeError('`memoryDatabase` must be the empty string, ":memory:", or a ' + '"file::memory:[?queryString][#hash] URL".');
    }
  }],
  // NODE-SPECIFIC CONFIG
  // Boolean on whether to delete the database file itself after
  //   `deleteDatabase`; defaults to `true` as the database will be empty
  'deleteDatabaseFiles', 'databaseBasePath', 'sysDatabaseBasePath',
  // NODE-SPECIFIC WEBSQL CONFIG
  'sqlBusyTimeout',
  // Defaults to 1000
  'sqlTrace',
  // Callback not used by default
  'sqlProfile',
  // Callback not used by default

  'createIndexes'].forEach(function (prop) {
    /** @type {(val: any) => void} */
    var validator;
    if (Array.isArray(prop)) {
      var _prop = prop;
      var _prop2 = _slicedToArray(_prop, 2);
      prop = _prop2[0];
      validator = _prop2[1];
    }
    Object.defineProperty(CFG, prop, {
      get: function get() {
        return map[prop];
      },
      set: function set(val) {
        if (validator) {
          validator(val);
        }
        map[prop] = val;
      }
    });
  });

  /**
   * Creates a native DOMException, for browsers that support it.
   * @param {string} name
   * @param {string} message
   * @returns {DOMException}
   */
  function createNativeDOMException(name, message) {
    // @ts-expect-error It's ok
    return new DOMException.prototype.constructor(message, name || 'DOMException');
  }

  // From web-platform-tests testharness.js name_code_map (though not in new spec)

  /**
   * @typedef {"IndexSizeError"|"HierarchyRequestError"|"WrongDocumentError"|
   * "InvalidCharacterError"|"NoModificationAllowedError"|"NotFoundError"|
   * "NotSupportedError"|"InUseAttributeError"|"InvalidStateError"|
   * "SyntaxError"|"InvalidModificationError"|"NamespaceError"|
   * "InvalidAccessError"|"TypeMismatchError"|"SecurityError"|
   * "NetworkError"|"AbortError"|"URLMismatchError"|"QuotaExceededError"|
   * "TimeoutError"|"InvalidNodeTypeError"|"DataCloneError"|"EncodingError"|
   * "NotReadableError"|"UnknownError"|"ConstraintError"|"DataError"|
   * "TransactionInactiveError"|"ReadOnlyError"|"VersionError"|
   * "OperationError"|"NotAllowedError"} Code
   */

  var codes = {
    IndexSizeError: 1,
    HierarchyRequestError: 3,
    WrongDocumentError: 4,
    InvalidCharacterError: 5,
    NoModificationAllowedError: 7,
    NotFoundError: 8,
    NotSupportedError: 9,
    InUseAttributeError: 10,
    InvalidStateError: 11,
    SyntaxError: 12,
    InvalidModificationError: 13,
    NamespaceError: 14,
    InvalidAccessError: 15,
    TypeMismatchError: 17,
    SecurityError: 18,
    NetworkError: 19,
    AbortError: 20,
    URLMismatchError: 21,
    QuotaExceededError: 22,
    TimeoutError: 23,
    InvalidNodeTypeError: 24,
    DataCloneError: 25,
    EncodingError: 0,
    NotReadableError: 0,
    UnknownError: 0,
    ConstraintError: 0,
    DataError: 0,
    TransactionInactiveError: 0,
    ReadOnlyError: 0,
    VersionError: 0,
    OperationError: 0,
    NotAllowedError: 0
  };

  /**
   * @typedef {"INDEX_SIZE_ERR"|"DOMSTRING_SIZE_ERR"|"HIERARCHY_REQUEST_ERR"|
   * "WRONG_DOCUMENT_ERR"|"INVALID_CHARACTER_ERR"|"NO_DATA_ALLOWED_ERR"|
   * "NO_MODIFICATION_ALLOWED_ERR"|"NOT_FOUND_ERR"|"NOT_SUPPORTED_ERR"|
   * "INUSE_ATTRIBUTE_ERR"|"INVALID_STATE_ERR"|"SYNTAX_ERR"|
   * "INVALID_MODIFICATION_ERR"|"NAMESPACE_ERR"|"INVALID_ACCESS_ERR"|
   * "VALIDATION_ERR"|"TYPE_MISMATCH_ERR"|"SECURITY_ERR"|"NETWORK_ERR"|
   * "ABORT_ERR"|"URL_MISMATCH_ERR"|"QUOTA_EXCEEDED_ERR"|"TIMEOUT_ERR"|
   * "INVALID_NODE_TYPE_ERR"|"DATA_CLONE_ERR"} LegacyCode
   */

  var legacyCodes = {
    INDEX_SIZE_ERR: 1,
    DOMSTRING_SIZE_ERR: 2,
    HIERARCHY_REQUEST_ERR: 3,
    WRONG_DOCUMENT_ERR: 4,
    INVALID_CHARACTER_ERR: 5,
    NO_DATA_ALLOWED_ERR: 6,
    NO_MODIFICATION_ALLOWED_ERR: 7,
    NOT_FOUND_ERR: 8,
    NOT_SUPPORTED_ERR: 9,
    INUSE_ATTRIBUTE_ERR: 10,
    INVALID_STATE_ERR: 11,
    SYNTAX_ERR: 12,
    INVALID_MODIFICATION_ERR: 13,
    NAMESPACE_ERR: 14,
    INVALID_ACCESS_ERR: 15,
    VALIDATION_ERR: 16,
    TYPE_MISMATCH_ERR: 17,
    SECURITY_ERR: 18,
    NETWORK_ERR: 19,
    ABORT_ERR: 20,
    URL_MISMATCH_ERR: 21,
    QUOTA_EXCEEDED_ERR: 22,
    TIMEOUT_ERR: 23,
    INVALID_NODE_TYPE_ERR: 24,
    DATA_CLONE_ERR: 25
  };

  /**
   *
   * @returns {typeof DOMException}
   */
  function createNonNativeDOMExceptionClass() {
    /**
     * @param {string|undefined} message
     * @param {Code|LegacyCode} name
     * @returns {void}
     */
    function DOMException(message, name) {
      // const err = Error.prototype.constructor.call(this, message); // Any use to this? Won't set this.message
      this[Symbol.toStringTag] = 'DOMException';
      this._code = name in codes ? codes[(/** @type {Code} */name)] : legacyCodes[(/** @type {LegacyCode} */name)] || 0;
      this._name = name || 'Error';
      // We avoid `String()` in this next line as it converts Symbols
      this._message = message === undefined ? '' : '' + message; // eslint-disable-line no-implicit-coercion -- Don't convert symbols
      Object.defineProperty(this, 'code', {
        configurable: true,
        enumerable: true,
        writable: true,
        value: this._code
      });
      if (name !== undefined) {
        Object.defineProperty(this, 'name', {
          configurable: true,
          enumerable: true,
          writable: true,
          value: this._name
        });
      }
      if (message !== undefined) {
        Object.defineProperty(this, 'message', {
          configurable: true,
          enumerable: false,
          writable: true,
          value: this._message
        });
      }
    }

    // Necessary for W3C tests which complains if `DOMException` has properties on its "own" prototype

    // class DummyDOMException extends Error {}; // Sometimes causing problems in Node
    /* eslint-disable func-name-matching -- See above */
    /**
     * @class
     */
    var DummyDOMException = function DOMException() {/* */};
    /* eslint-enable func-name-matching -- See above */
    DummyDOMException.prototype = Object.create(Error.prototype); // Intended for subclassing
    /** @type {const} */
    ['name', 'message'].forEach(function (prop) {
      Object.defineProperty(DummyDOMException.prototype, prop, {
        enumerable: true,
        /**
         * @this {DOMException}
         * @returns {string}
         */
        get: function get() {
          if (!(this instanceof DOMException ||
          // @ts-expect-error Just checking
          this instanceof DummyDOMException ||
          // @ts-expect-error Just checking
          this instanceof Error)) {
            throw new TypeError('Illegal invocation');
          }
          return this[prop === 'name' ? '_name' : '_message'];
        }
      });
    });
    // DOMException uses the same `toString` as `Error`
    Object.defineProperty(DummyDOMException.prototype, 'code', {
      configurable: true,
      enumerable: true,
      get: function get() {
        throw new TypeError('Illegal invocation');
      }
    });
    // @ts-expect-error It's ok
    DOMException.prototype = new DummyDOMException();
    DOMException.prototype[Symbol.toStringTag] = 'DOMExceptionPrototype';
    Object.defineProperty(DOMException, 'prototype', {
      writable: false
    });
    var keys = Object.keys(codes);

    /** @type {(keyof codes)[]} */
    keys.forEach(function (codeName) {
      Object.defineProperty(DOMException.prototype, codeName, {
        enumerable: true,
        configurable: false,
        value: codes[codeName]
      });
      Object.defineProperty(DOMException, codeName, {
        enumerable: true,
        configurable: false,
        value: codes[codeName]
      });
    });
    /** @type {(keyof legacyCodes)[]} */
    Object.keys(legacyCodes).forEach(function (codeName) {
      Object.defineProperty(DOMException.prototype, codeName, {
        enumerable: true,
        configurable: false,
        value: legacyCodes[codeName]
      });
      Object.defineProperty(DOMException, codeName, {
        enumerable: true,
        configurable: false,
        value: legacyCodes[codeName]
      });
    });
    Object.defineProperty(DOMException.prototype, 'constructor', {
      writable: true,
      configurable: true,
      enumerable: false,
      value: DOMException
    });

    // @ts-expect-error We don't need all its properties
    return DOMException;
  }
  var ShimNonNativeDOMException = createNonNativeDOMExceptionClass();

  /**
   * Creates a generic Error object.
   * @param {string} name
   * @param {string} message
   * @returns {Error}
   */
  function createNonNativeDOMException(name, message) {
    return new ShimNonNativeDOMException(message, name);
  }

  /**
   * @typedef {{
   *   message: string|DOMString
   * }} ErrorLike
   */

  /**
   * Logs detailed error information to the console.
   * @param {string} name
   * @param {string} message
   * @param {string|ErrorLike|boolean|null} [error]
   * @returns {void}
   */
  function logError(name, message, error) {
    if (CFG.DEBUG) {
      var msg = error && _typeof(error) === 'object' && error.message ? error.message : (/** @type {string} */error);
      var method = typeof console.error === 'function' ? 'error' : 'log';
      console[method](name + ': ' + message + '. ' + (msg || ''));
      if (console.trace) {
        console.trace();
      }
    }
  }

  /**
   * @typedef {any} ArbitraryValue
   */

  /**
   * @param {ArbitraryValue} obj
   * @returns {boolean}
   */
  function isErrorOrDOMErrorOrDOMException(obj) {
    return obj && _typeof(obj) === 'object' &&
    // We don't use util.isObj here as mutual dependency causing problems in Babel with browser
    typeof obj.name === 'string';
  }
  var test,
    useNativeDOMException = false;

  // Test whether we can use the browser's native DOMException class
  try {
    test = createNativeDOMException('test name', 'test message');
    if (isErrorOrDOMErrorOrDOMException(test) && test.name === 'test name' && test.message === 'test message') {
      // Native DOMException works as expected
      useNativeDOMException = true;
    }
  } catch (err) {}
  var createDOMException = useNativeDOMException
  // eslint-disable-next-line @stylistic/operator-linebreak -- Need JSDoc
  ?
  /**
  * @param {string} name
  * @param {string} message
  * @param {ErrorLike} [error]
  * @returns {DOMException}
  */
  function (name, message, error) {
    logError(name, message, error);
    return createNativeDOMException(name, message);
  }
  // eslint-disable-next-line @stylistic/operator-linebreak -- Need JSDoc
  :
  /**
  * @param {string} name
  * @param {string} message
  * @param {ErrorLike} [error]
  * @returns {Error}
  */
  function (name, message, error) {
    logError(name, message, error);
    return createNonNativeDOMException(name, message);
  };

  /**
   * @typedef {number} Integer
   */

  /**
   * @param {string} arg
   * @returns {string}
   */
  function escapeUnmatchedSurrogates(arg) {
    // http://stackoverflow.com/a/6701665/271577
    return arg.replaceAll(/((?:[\uD800-\uDBFF](?![\uDC00-\uDFFF])))(?!(?:(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]))|(^|(?:[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]))((?:(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]))/g, function (_, unmatchedHighSurrogate, precedingLow, unmatchedLowSurrogate) {
      // Could add a corresponding surrogate for compatibility with `node-sqlite3`: http://bugs.python.org/issue12569 and http://stackoverflow.com/a/6701665/271577
      //   but Chrome having problems
      if (unmatchedHighSurrogate) {
        return '^2' + unmatchedHighSurrogate.codePointAt().toString(16).padStart(4, '0');
      }
      return (precedingLow || '') + '^3' + unmatchedLowSurrogate.codePointAt().toString(16).padStart(4, '0');
    });
  }

  /**
   * The escaping of unmatched surrogates was needed by Chrome but not Node.
   * @param {string} arg
   * @returns {string}
   */
  function escapeSQLiteStatement(arg) {
    return escapeUnmatchedSurrogates(arg.replaceAll('^', '^^').replaceAll('\0', '^0'));
  }

  /**
   *
   * @param {AnyValue} obj
   * @returns {obj is object}
   */
  function isObj(obj) {
    return obj !== null && _typeof(obj) === 'object';
  }

  /**
   *
   * @param {object} obj
   * @returns {boolean}
   */
  function isDate(obj) {
    return isObj(obj) && 'getDate' in obj && typeof obj.getDate === 'function';
  }

  /**
   *
   * @param {object} obj
   * @returns {boolean}
   */
  function isBlob(obj) {
    return isObj(obj) && 'size' in obj && typeof obj.size === 'number' && 'slice' in obj && typeof obj.slice === 'function' && !('lastModified' in obj);
  }

  /**
   *
   * @param {object} obj
   * @returns {boolean}
   */
  function isFile(obj) {
    return isObj(obj) && 'name' in obj && typeof obj.name === 'string' && 'slice' in obj && typeof obj.slice === 'function' && 'lastModified' in obj;
  }

  /**
   *
   * @param {AnyValue} obj
   * @returns {boolean}
   */
  function isBinary(obj) {
    return isObj(obj) && 'byteLength' in obj && typeof obj.byteLength === 'number' && ('slice' in obj && typeof obj.slice === 'function' ||
    // `TypedArray` (view on buffer) or `ArrayBuffer`
    'getFloat64' in obj && typeof obj.getFloat64 === 'function' // `DataView` (view on buffer)
    );
  }

  /**
   * @param {AnyValue} v
   * @returns {v is null|undefined}
   */
  function isNullish(v) {
    return v === null || v === undefined;
  }

  /**
   * Compares two keys.
   * @param {import('./Key.js').Key} first
   * @param {import('./Key.js').Key} second
   * @returns {0|1|-1}
   */
  function cmp(first, second) {
    var encodedKey1 = /** @type {string} */_encode(first);
    var encodedKey2 = /** @type {string} */_encode(second);
    var result = encodedKey1 > encodedKey2 ? 1 : encodedKey1 === encodedKey2 ? 0 : -1;
    if (CFG.DEBUG) {
      // verify that the keys encoded correctly
      var decodedKey1 = _decode(encodedKey1);
      var decodedKey2 = _decode(encodedKey2);
      if (_typeof(first) === 'object') {
        first = JSON.stringify(first);
        decodedKey1 = JSON.stringify(decodedKey1);
      }
      if (_typeof(second) === 'object') {
        second = JSON.stringify(second);
        decodedKey2 = JSON.stringify(decodedKey2);
      }

      // Encoding/decoding mismatches are usually due to a loss of
      //   floating-point precision
      if (decodedKey1 !== first) {
        console.warn(first + ' was incorrectly encoded as ' + decodedKey1);
      }
      if (decodedKey2 !== second) {
        console.warn(second + ' was incorrectly encoded as ' + decodedKey2);
      }
    }
    return result;
  }

  /**
   * @typedef {NodeJS.TypedArray|DataView} ArrayBufferView
   */

  /**
   * @typedef {ArrayBufferView|ArrayBuffer} BufferSource
   */

  /**
   * @typedef {"number"|"date"|"string"|"binary"|"array"} KeyType
   */

  /**
   * @typedef {any} Value
   */

  /**
   * @typedef {any} Key
   * @todo Specify possible value more precisely
   */

  /**
   * @typedef {KeyPath[]} KeyPathArray
   */
  /**
   * @typedef {string|KeyPathArray} KeyPath
   */

  /**
  * @typedef {object} KeyValueObject
  * @property {KeyType|"NaN"|"null"|"undefined"|"boolean"|"object"|"symbol"|
  *   "function"|"bigint"} type If not `KeyType`, indicates invalid value
  * @property {Value} [value]
  * @property {boolean} [invalid]
  * @property {string} [message]
  * @todo Specify acceptable `value` more precisely
  */

  /**
   * @typedef {number|string|Date|ArrayBuffer} ValueTypePrimitive
   */
  /**
   * @typedef {ValueType[]} ValueTypeArray
   */
  /**
   * @typedef {ValueTypePrimitive|ValueTypeArray} ValueType
   */

  /**
   * Encodes the keys based on their types. This is required to maintain collations
   * We leave space for future keys.
   * @type {{[key: string]: Integer|string}}
   */
  var keyTypeToEncodedChar = {
    invalid: 100,
    number: 200,
    date: 300,
    string: 400,
    binary: 500,
    array: 600
  };
  var keyTypes = /** @type {(KeyType|"invalid")[]} */Object.keys(keyTypeToEncodedChar);
  keyTypes.forEach(function (k) {
    keyTypeToEncodedChar[k] = String.fromCodePoint(/** @type {number} */keyTypeToEncodedChar[k]);
  });
  var encodedCharToKeyType = keyTypes.reduce(function (o, k) {
    o[keyTypeToEncodedChar[k]] = k;
    return o;
  }, /** @type {{[key: string]: KeyType|"invalid"}} */{});

  /**
   * The sign values for numbers, ordered from least to greatest.
   *  - "negativeInfinity": Sorts below all other values.
   *  - "bigNegative": Negative values less than or equal to negative one.
   *  - "smallNegative": Negative values between negative one and zero, noninclusive.
   *  - "smallPositive": Positive values between zero and one, including zero but not one.
   *  - "largePositive": Positive values greater than or equal to one.
   *  - "positiveInfinity": Sorts above all other values.
   */
  var signValues = ['negativeInfinity', 'bigNegative', 'smallNegative', 'smallPositive', 'bigPositive', 'positiveInfinity'];

  /**
   * @typedef {any} AnyValue
   */

  /**
   * @type {{
   *   [key: string]: {
   *     encode: (param: any, inArray?: boolean) => string,
   *     decode: (param: string, inArray?: boolean) => any
   *   }
   * }}
   */
  var types = {
    invalid: {
      /**
       * @returns {string}
       */
      encode: function encode() {
        return keyTypeToEncodedChar.invalid + '-';
      },
      /**
       * @returns {undefined}
       */
      decode: function decode() {
        return undefined;
      }
    },
    // Numbers are represented in a lexically sortable base-32 sign-exponent-mantissa
    // notation.
    //
    // sign: takes a value between zero and five, inclusive. Represents infinite cases
    //     and the signs of both the exponent and the fractional part of the number.
    // exponent: padded to two base-32 digits, represented by the 32's compliment in the
    //     "smallPositive" and "bigNegative" cases to ensure proper lexical sorting.
    // mantissa: also called the fractional part. Normed 11-digit base-32 representation.
    //     Represented by the 32's compliment in the "smallNegative" and "bigNegative"
    //     cases to ensure proper lexical sorting.
    number: {
      // The encode step checks for six numeric cases and generates 14-digit encoded
      // sign-exponent-mantissa strings.
      /**
       * @param {number} key
       * @returns {string}
       */
      encode: function encode(key) {
        var key32 = key === Number.MIN_VALUE
        // Mocha test `IDBFactory/cmp-spec.js` exposed problem for some
        //   Node (and Chrome) versions with `Number.MIN_VALUE` being treated
        //   as 0
        // https://stackoverflow.com/questions/43305403/number-min-value-and-tostring
        ? '0.' + '0'.repeat(214) + '2' : Math.abs(key).toString(32);
        // Get the index of the decimal.
        var decimalIndex = key32.indexOf('.');
        // Remove the decimal.
        key32 = decimalIndex !== -1 ? key32.replace('.', '') : key32;
        // Get the index of the first significant digit.
        var significantDigitIndex = key32.search(/(?:[\0-\/1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/);
        // Truncate leading zeros.
        key32 = key32.slice(significantDigitIndex);
        var sign, exponent, mantissa;

        // Finite cases:
        if (Number.isFinite(Number(key))) {
          // Negative cases:
          if (key < 0) {
            // Negative exponent case:
            if (key > -1) {
              sign = signValues.indexOf('smallNegative');
              exponent = padBase32Exponent(significantDigitIndex);
              mantissa = flipBase32(padBase32Mantissa(key32));
              // Non-negative exponent case:
            } else {
              sign = signValues.indexOf('bigNegative');
              exponent = flipBase32(padBase32Exponent(decimalIndex !== -1 ? decimalIndex : key32.length));
              mantissa = flipBase32(padBase32Mantissa(key32));
            }
            // Non-negative cases:
            // Negative exponent case:
          } else if (key < 1) {
            sign = signValues.indexOf('smallPositive');
            exponent = flipBase32(padBase32Exponent(significantDigitIndex));
            mantissa = padBase32Mantissa(key32);
            // Non-negative exponent case:
          } else {
            sign = signValues.indexOf('bigPositive');
            exponent = padBase32Exponent(decimalIndex !== -1 ? decimalIndex : key32.length);
            mantissa = padBase32Mantissa(key32);
          }
          // Infinite cases:
        } else {
          exponent = zeros(2);
          mantissa = zeros(11);
          sign = signValues.indexOf(key > 0 ? 'positiveInfinity' : 'negativeInfinity');
        }
        return keyTypeToEncodedChar.number + '-' + sign + exponent + mantissa;
      },
      // The decode step must interpret the sign, reflip values encoded as the 32's complements,
      // apply signs to the exponent and mantissa, do the base-32 power operation, and return
      // the original JavaScript number values.
      /**
       * @param {string} key
       * @returns {number}
       */
      decode: function decode(key) {
        var sign = Number(key.slice(2, 3));
        var exponent = key.slice(3, 5);
        var mantissa = key.slice(5, 16);
        switch (signValues[sign]) {
          case 'negativeInfinity':
            return Number.NEGATIVE_INFINITY;
          case 'positiveInfinity':
            return Number.POSITIVE_INFINITY;
          case 'bigPositive':
            return pow32(mantissa, exponent);
          case 'smallPositive':
            exponent = negate(flipBase32(exponent));
            return pow32(mantissa, exponent);
          case 'smallNegative':
            exponent = negate(exponent);
            mantissa = flipBase32(mantissa);
            return -pow32(mantissa, exponent);
          case 'bigNegative':
            exponent = flipBase32(exponent);
            mantissa = flipBase32(mantissa);
            return -pow32(mantissa, exponent);
          default:
            throw new Error('Invalid number.');
        }
      }
    },
    // Strings are encoded as JSON strings (with quotes and unicode characters escaped).
    //
    // If the strings are in an array, then some extra encoding is done to make sorting work correctly:
    // Since we can't force all strings to be the same length, we need to ensure that characters line-up properly
    // for sorting, while also accounting for the extra characters that are added when the array itself is encoded as JSON.
    // To do this, each character of the string is prepended with a dash ("-"), and a space is added to the end of the string.
    // This effectively doubles the size of every string, but it ensures that when two arrays of strings are compared,
    // the indexes of each string's characters line up with each other.
    string: {
      /**
       * @param {string} key
       * @param {boolean} [inArray]
       * @returns {string}
       */
      encode: function encode(key, inArray) {
        if (inArray) {
          // prepend each character with a dash, and append a space to the end
          key = key.replaceAll(/((?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]))/g, '-$1') + ' ';
        }
        return keyTypeToEncodedChar.string + '-' + key;
      },
      /**
       * @param {string} key
       * @param {boolean} [inArray]
       * @returns {string}
       */
      decode: function decode(key, inArray) {
        key = key.slice(2);
        if (inArray) {
          // remove the space at the end, and the dash before each character
          key = key.slice(0, -1).replaceAll(/-((?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]))/g, '$1');
        }
        return key;
      }
    },
    // Arrays are encoded as JSON strings.
    // An extra, value is added to each array during encoding to make
    //  empty arrays sort correctly.
    array: {
      /**
       * @param {ValueTypeArray} key
       * @returns {string}
       */
      encode: function encode(key) {
        var encoded = [];
        var _iterator = _createForOfIteratorHelper(key.entries()),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var _step$value = _slicedToArray(_step.value, 2),
              i = _step$value[0],
              item = _step$value[1];
            var encodedItem = _encode(item, true); // encode the array item
            encoded[i] = encodedItem;
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        encoded.push(keyTypeToEncodedChar.invalid + '-'); // append an extra item, so empty arrays sort correctly
        return keyTypeToEncodedChar.array + '-' + JSON.stringify(encoded);
      },
      /**
       * @param {string} key
       * @returns {ValueTypeArray}
       */
      decode: function decode(key) {
        var decoded = JSON.parse(key.slice(2));
        decoded.pop(); // remove the extra item
        for (var i = 0; i < decoded.length; i++) {
          var item = decoded[i];
          var decodedItem = _decode(item, true); // decode the item
          decoded[i] = decodedItem;
        }
        return decoded;
      }
    },
    // Dates are encoded as ISO 8601 strings, in UTC time zone.
    date: {
      /**
       * @param {Date} key
       * @returns {string}
       */
      encode: function encode(key) {
        return keyTypeToEncodedChar.date + '-' + key.toJSON();
      },
      /**
       * @param {string} key
       * @returns {Date}
       */
      decode: function decode(key) {
        return new Date(key.slice(2));
      }
    },
    binary: {
      // `ArrayBuffer`/Views on buffers (`TypedArray` or `DataView`)
      /**
       * @param {BufferSource} key
       * @returns {string}
       */
      encode: function encode(key) {
        return keyTypeToEncodedChar.binary + '-' + (key.byteLength ? _toConsumableArray(getCopyBytesHeldByBufferSource(key)).map(function (b) {
          return String(b).padStart(3, '0');
        }) // e.g., '255,005,254,000,001,033'
        : '');
      },
      /**
       * @param {string} key
       * @returns {ArrayBuffer}
       */
      decode: function decode(key) {
        // Set the entries in buffer's [[ArrayBufferData]] to those in `value`
        var k = key.slice(2);
        var arr = k.length ? k.split(',').map(function (s) {
          return Number.parseInt(s);
        }) : [];
        var buffer = new ArrayBuffer(arr.length);
        var uint8 = new Uint8Array(buffer);
        uint8.set(arr);
        return buffer;
      }
    }
  };

  /**
   * Return a padded base-32 exponent value.
   * @param {number} n
   * @returns {string}
   */
  function padBase32Exponent(n) {
    var exp = n.toString(32);
    return exp.length === 1 ? '0' + exp : exp;
  }

  /**
   * Return a padded base-32 mantissa.
   * @param {string} s
   * @returns {string}
   */
  function padBase32Mantissa(s) {
    return (s + zeros(11)).slice(0, 11);
  }

  /**
   * Flips each digit of a base-32 encoded string.
   * @param {string} encoded
   * @returns {string}
   */
  function flipBase32(encoded) {
    var flipped = '';
    var _iterator2 = _createForOfIteratorHelper(encoded),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var ch = _step2.value;
        flipped += (31 - Number.parseInt(ch, 32)).toString(32);
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    return flipped;
  }

  /**
   * Base-32 power function.
   * RESEARCH: This function does not precisely decode floats because it performs
   * floating point arithmetic to recover values. But can the original values be
   * recovered exactly?
   * Someone may have already figured out a good way to store JavaScript floats as
   * binary strings and convert back. Barring a better method, however, one route
   * may be to generate decimal strings that `parseFloat` decodes predictably.
   * @param {string} mantissa
   * @param {string} exponent
   * @returns {number}
   */
  function pow32(mantissa, exponent) {
    var exp = Number.parseInt(exponent, 32);
    if (exp < 0) {
      return roundToPrecision(Number.parseInt(mantissa, 32) * Math.pow(32, exp - 10));
    }
    if (exp < 11) {
      var whole = mantissa.slice(0, exp);
      var wholeNum = Number.parseInt(whole, 32);
      var fraction = mantissa.slice(exp);
      var fractionNum = Number.parseInt(fraction, 32) * Math.pow(32, exp - 11);
      return roundToPrecision(wholeNum + fractionNum);
    }
    var expansion = mantissa + zeros(exp - 11);
    return Number.parseInt(expansion, 32);
  }

  /**
   * @typedef {number} Float
   */

  /**
   * @param {Float} num
   * @param {Float} [precision]
   * @returns {Float}
   */
  function roundToPrecision(num) {
    var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 16;
    return Number.parseFloat(num.toPrecision(precision));
  }

  /**
   * Returns a string of n zeros.
   * @param {number} n
   * @returns {string}
   */
  function zeros(n) {
    return '0'.repeat(n);
  }

  /**
   * Negates numeric strings.
   * @param {string} s
   * @returns {string}
   */
  function negate(s) {
    return '-' + s;
  }

  /**
   * @param {Key} key
   * @returns {KeyType|"invalid"}
   */
  function getKeyType(key) {
    if (Array.isArray(key)) {
      return 'array';
    }
    if (isDate(key)) {
      return 'date';
    }
    if (isBinary(key)) {
      return 'binary';
    }
    var keyType = _typeof(key);
    return ['string', 'number'].includes(keyType) ? (/** @type {"string"|"number"} */keyType) : 'invalid';
  }

  /**
   * Keys must be strings, numbers (besides `NaN`), Dates (if value is not
   *   `NaN`), binary objects or Arrays.
   * @param {Value} input The key input
   * @param {Value[]|null|undefined} [seen] An array of already seen keys
   * @returns {KeyValueObject}
   */
  function convertValueToKey(input, seen) {
    return convertValueToKeyValueDecoded(input, seen, false, true);
  }

  /**
  * Currently not in use.
  * @param {Value} input
  * @returns {KeyValueObject}
  */
  function convertValueToMultiEntryKey(input) {
    return convertValueToKeyValueDecoded(input, null, true, true);
  }

  /**
   *
   * @param {BufferSource} O
   * @throws {TypeError}
   * @see https://heycam.github.io/webidl/#ref-for-dfn-get-buffer-source-copy-2
   * @returns {Uint8Array}
   */
  function getCopyBytesHeldByBufferSource(O) {
    var offset = 0;
    var length = 0;
    if (ArrayBuffer.isView(O)) {
      // Has [[ViewedArrayBuffer]] internal slot
      var arrayBuffer = O.buffer;
      if (arrayBuffer === undefined) {
        throw new TypeError('Could not copy the bytes held by a buffer source as the buffer was undefined.');
      }
      offset = O.byteOffset; // [[ByteOffset]] (will also throw as desired if detached)
      length = O.byteLength; // [[ByteLength]] (will also throw as desired if detached)
    } else {
      length = O.byteLength; // [[ArrayBufferByteLength]] on ArrayBuffer (will also throw as desired if detached)
    }
    // const octets = new Uint8Array(input);
    // const octets = types.binary.decode(types.binary.encode(input));
    return new Uint8Array(
    // Should allow DataView
    /** @type {ArrayBuffer} */
    'buffer' in O && O.buffer || O, offset, length);
  }

  /**
  * Shortcut utility to avoid returning full keys from `convertValueToKey`
  *   and subsequent need to process in calling code unless `fullKeys` is
  *   set; may throw.
  * @param {Value} input
  * @param {Value[]|null} [seen]
  * @param {boolean} [multiEntry]
  * @param {boolean} [fullKeys]
  * @throws {TypeError} See `getCopyBytesHeldByBufferSource`
  * @todo Document other allowable `input`
  * @returns {KeyValueObject}
  */
  function convertValueToKeyValueDecoded(input, seen, multiEntry, fullKeys) {
    seen = seen || [];
    if (seen.includes(input)) {
      return {
        type: 'array',
        invalid: true,
        message: 'An array key cannot be circular'
      };
    }
    var type = getKeyType(input);
    var ret = {
      type: type,
      value: input
    };
    switch (type) {
      case 'number':
        {
          if (Number.isNaN(input)) {
            // List as 'NaN' type for convenience of consumers in reporting errors
            return {
              type: 'NaN',
              invalid: true
            };
          }

          // https://github.com/w3c/IndexedDB/issues/375
          // https://github.com/w3c/IndexedDB/pull/386
          if (Object.is(input, -0)) {
            return {
              type: type,
              value: 0
            };
          }
          return /** @type {{type: KeyType; value: Value}} */ret;
        }
      case 'string':
        {
          return /** @type {{type: KeyType; value: Value}} */ret;
        }
      case 'binary':
        {
          // May throw (if detached)
          // Get a copy of the bytes held by the buffer source
          // https://heycam.github.io/webidl/#ref-for-dfn-get-buffer-source-copy-2
          var octets = getCopyBytesHeldByBufferSource(/** @type {BufferSource} */input);
          return {
            type: 'binary',
            value: octets
          };
        }
      case 'array':
        {
          // May throw (from binary)
          var arr = /** @type {Array<any>} */input;
          var len = arr.length;
          seen.push(input);

          /** @type {(KeyValueObject|Value)[]} */
          var keys = [];
          var _loop = function _loop() {
              // We cannot iterate here with array extras as we must ensure sparse arrays are invalidated
              if (!multiEntry && !Object.hasOwn(arr, i)) {
                return {
                  v: {
                    type: type,
                    invalid: true,
                    message: 'Does not have own index property'
                  }
                };
              }
              try {
                var entry = arr[i];
                var key = convertValueToKeyValueDecoded(entry, seen, false, fullKeys); // Though steps do not list rethrowing, the next is returnifabrupt when not multiEntry
                if (key.invalid) {
                  if (multiEntry) {
                    return 0; // continue
                  }
                  return {
                    v: {
                      type: type,
                      invalid: true,
                      message: 'Bad array entry value-to-key conversion'
                    }
                  };
                }
                if (!multiEntry || !fullKeys && keys.every(function (k) {
                  return cmp(k, key.value) !== 0;
                }) || fullKeys && keys.every(function (k) {
                  return cmp(k, key) !== 0;
                })) {
                  keys.push(fullKeys ? key : key.value);
                }
              } catch (err) {
                if (!multiEntry) {
                  throw err;
                }
              }
            },
            _ret;
          for (var i = 0; i < len; i++) {
            _ret = _loop();
            if (_ret === 0) continue;
            if (_ret) return _ret.v;
          }
          return {
            type: type,
            value: keys
          };
        }
      case 'date':
        {
          var date = /** @type {Date} */input;
          if (!Number.isNaN(date.getTime())) {
            return fullKeys ? {
              type: type,
              value: date.getTime()
            } : {
              type: type,
              value: new Date(date)
            };
          }
          return {
            type: type,
            invalid: true,
            message: 'Not a valid date'
          };
          // Falls through
        }
      case 'invalid':
      default:
        {
          // Other `typeof` types which are not valid keys:
          //    'undefined', 'boolean', 'object' (including `null`), 'symbol', 'function'
          var _type = input === null ? 'null' : _typeof(input); // Convert `null` for convenience of consumers in reporting errors
          return {
            type: _type,
            invalid: true,
            message: 'Not a valid key; type ' + _type
          };
        }
    }
  }

  /**
   *
   * @param {Key} key
   * @param {boolean} [fullKeys]
   * @returns {KeyValueObject}
   * @todo Document other allowable `key`?
   */
  function convertValueToMultiEntryKeyDecoded(key, fullKeys) {
    return convertValueToKeyValueDecoded(key, null, true, fullKeys);
  }

  /**
  * An internal utility.
  * @param {Value} input
  * @param {Value[]|null|undefined} [seen]
  * @throws {DOMException} `DataError`
  * @returns {KeyValueObject}
  */
  function convertValueToKeyRethrowingAndIfInvalid(input, seen) {
    var key = convertValueToKey(input, seen);
    if (key.invalid) {
      throw createDOMException('DataError', key.message || 'Not a valid key; type: ' + key.type);
    }
    return key;
  }

  /**
   *
   * @param {Value} value
   * @param {KeyPath} keyPath
   * @param {boolean} multiEntry
   * @returns {KeyValueObject|KeyPathEvaluateValue}
   * @todo Document other possible return?
   */
  function extractKeyFromValueUsingKeyPath(value, keyPath, multiEntry) {
    return extractKeyValueDecodedFromValueUsingKeyPath(value, keyPath, multiEntry, true);
  }
  /**
  * Not currently in use.
  * @param {Value} value
  * @param {KeyPath} keyPath
  * @param {boolean} multiEntry
  * @returns {KeyPathEvaluateValue}
  */
  function evaluateKeyPathOnValue(value, keyPath, multiEntry) {
    return evaluateKeyPathOnValueToDecodedValue(value, keyPath);
  }

  /**
  * May throw, return `{failure: true}` (e.g., non-object on keyPath resolution)
  *    or `{invalid: true}` (e.g., `NaN`).
  * @param {Value} value
  * @param {KeyPath} keyPath
  * @param {boolean} [multiEntry]
  * @param {boolean} [fullKeys]
  * @returns {KeyValueObject|KeyPathEvaluateValue}
  * @todo Document other possible return?
  */
  function extractKeyValueDecodedFromValueUsingKeyPath(value, keyPath, multiEntry, fullKeys) {
    var r = evaluateKeyPathOnValueToDecodedValue(value, keyPath);
    if (r.failure) {
      return r;
    }
    if (!multiEntry) {
      return convertValueToKeyValueDecoded(r.value, null, false, fullKeys);
    }
    return convertValueToMultiEntryKeyDecoded(r.value, fullKeys);
  }

  /**
   * Unused?
   * @typedef {object} KeyPathEvaluateFailure
   * @property {boolean} failure
   */

  /**
   * @typedef {KeyPathEvaluateValueValue[]} KeyPathEvaluateValueValueArray
   */

  /**
   * @typedef {undefined|number|string|Date|object|KeyPathEvaluateValueValueArray} KeyPathEvaluateValueValue
   */

  /**
   * @typedef {object} KeyPathEvaluateValue
   * @property {KeyPathEvaluateValueValue} [value]
   * @property {boolean} [failure]
   */

  /**
   * Returns the value of an inline key based on a key path (wrapped in an
   *   object with key `value`) or `{failure: true}`
   * @param {Value} value
   * @param {KeyPath} keyPath
   * @param {boolean} [multiEntry]
   * @param {boolean} [fullKeys]
   * @returns {KeyPathEvaluateValue}
   */
  function evaluateKeyPathOnValueToDecodedValue(value, keyPath, multiEntry, fullKeys) {
    if (Array.isArray(keyPath)) {
      /** @type {KeyPathEvaluateValueValueArray} */
      var result = [];
      return keyPath.some(function (item) {
        var key = evaluateKeyPathOnValueToDecodedValue(value, item);
        if (key.failure) {
          return true;
        }
        result.push(key.value);
        return false;
      }) ? {
        failure: true
      } : {
        value: result
      };
    }
    if (keyPath === '') {
      return {
        value: value
      };
    }
    var identifiers = keyPath.split('.');
    return identifiers.some(function (idntfr) {
      if (idntfr === 'length' && (typeof value === 'string' || Array.isArray(value))) {
        value = value.length;
      } else if (isBlob(value)) {
        switch (idntfr) {
          case 'size':
          case 'type':
            value = /** @type {Blob} */value[idntfr];
            break;
        }
      } else if (isFile(value)) {
        switch (idntfr) {
          case 'name':
          case 'lastModified':
            value = /** @type {File} */value[idntfr];
            break;
          case 'lastModifiedDate':
            value = new Date(/** @type {File} */value.lastModified);
            break;
        }
      } else if (!isObj(value) || !Object.hasOwn(value, idntfr)) {
        return true;
      } else {
        value = /** @type {{[key: string]: KeyPathEvaluateValueValue}} */value[idntfr];
        return value === undefined;
      }
      return false;
    }) ? {
      failure: true
    } : {
      value: value
    };
  }

  /**
   * Sets the inline key value.
   * @param {{[key: string]: AnyValue}} value
   * @param {Key} key
   * @param {string} keyPath
   * @returns {void}
   */
  function injectKeyIntoValueUsingKeyPath(value, key, keyPath) {
    var identifiers = keyPath.split('.');
    var last = identifiers.pop();
    identifiers.forEach(function (identifier) {
      var hop = Object.hasOwn(value, identifier);
      if (!hop) {
        value[identifier] = {};
      }
      value = value[identifier];
    });
    value[(/** @type {string} */last)] = key; // key is already a `keyValue` in our processing so no need to convert
  }

  /**
   *
   * @param {Value} value
   * @param {string} keyPath
   * @see https://github.com/w3c/IndexedDB/pull/146
   * @returns {boolean}
   */
  function checkKeyCouldBeInjectedIntoValue(value, keyPath) {
    var identifiers = keyPath.split('.');
    identifiers.pop();
    var _iterator3 = _createForOfIteratorHelper(identifiers),
      _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var identifier = _step3.value;
        if (!isObj(value)) {
          return false;
        }
        var hop = Object.hasOwn(value, identifier);
        if (!hop) {
          return true;
        }
        value = /** @type {{[key: string]: Value}} */value[identifier];
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
    return isObj(value);
  }

  /**
   *
   * @param {Key} key
   * @param {import('./IDBKeyRange.js').IDBKeyRangeFull} range
   * @param {boolean} [checkCached]
   * @returns {boolean}
   */
  function isKeyInRange(key, range, checkCached) {
    var lowerMatch = range.lower === undefined;
    var upperMatch = range.upper === undefined;
    var encodedKey = _encode(key, true);
    var lower = checkCached ? range.__lowerCached : _encode(range.lower, true);
    var upper = checkCached ? range.__upperCached : _encode(range.upper, true);
    if (!lowerMatch && (range.lowerOpen && encodedKey !== null && lower !== null && encodedKey > lower || !range.lowerOpen && (!encodedKey && !lower || encodedKey !== null && lower !== null && encodedKey >= lower))) {
      lowerMatch = true;
    }
    if (!upperMatch && (range.upperOpen && encodedKey !== null && upper !== null && encodedKey < upper || !range.upperOpen && (!encodedKey && !upper || encodedKey !== null && upper !== null && encodedKey <= upper))) {
      upperMatch = true;
    }
    return lowerMatch && upperMatch;
  }

  /**
   * Determines whether an index entry matches a multi-entry key value.
   * @param {string} encodedEntry     The entry value (already encoded)
   * @param {string} encodedKey       The full index key (already encoded)
   * @returns {boolean}
   */
  function isMultiEntryMatch(encodedEntry, encodedKey) {
    var keyType = encodedCharToKeyType[encodedKey.slice(0, 1)];
    if (keyType === 'array') {
      return encodedKey.indexOf(encodedEntry) > 1;
    }
    return encodedKey === encodedEntry;
  }

  /**
   *
   * @param {Key} keyEntry
   * @param {import('./IDBKeyRange.js').IDBKeyRangeFull|undefined} range
   * @returns {Key[]}
   */
  function findMultiEntryMatches(keyEntry, range) {
    var matches = [];
    if (Array.isArray(keyEntry)) {
      var _iterator4 = _createForOfIteratorHelper(keyEntry),
        _step4;
      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var key = _step4.value;
          if (Array.isArray(key)) {
            if (range && range.lower === range.upper) {
              continue;
            }
            if (key.length === 1) {
              // eslint-disable-next-line sonarjs/updated-loop-counter -- Convenient
              key = key[0];
            } else {
              var nested = findMultiEntryMatches(key, range);
              if (nested.length > 0) {
                matches.push(key);
              }
              continue;
            }
          }
          if (isNullish(range) || isKeyInRange(key, range, true)) {
            matches.push(key);
          }
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
    } else if (isNullish(range) || isKeyInRange(keyEntry, range, true)) {
      matches.push(keyEntry);
    }
    return matches;
  }

  /**
  * Not currently in use but keeping for spec parity.
  * @param {Key} key
  * @throws {Error} Upon a "bad key"
  * @returns {ValueType}
  */
  function convertKeyToValue(key) {
    var type = key.type,
      value = key.value;
    switch (type) {
      case 'number':
      case 'string':
        {
          return value;
        }
      case 'array':
        {
          var array = [];
          var len = value.length;
          var index = 0;
          while (index < len) {
            var entry = convertKeyToValue(value[index]);
            array[index] = entry;
            index++;
          }
          return array;
        }
      case 'date':
        {
          return new Date(value);
        }
      case 'binary':
        {
          var _len = value.length;
          var buffer = new ArrayBuffer(_len);
          // Set the entries in buffer's [[ArrayBufferData]] to those in `value`
          var uint8 = new Uint8Array(buffer, value.byteOffset || 0, value.byteLength);
          uint8.set(value);
          return buffer;
        }
      case 'invalid':
      default:
        throw new Error('Bad key');
    }
  }

  /**
   *
   * @param {Key} key
   * @param {boolean} [inArray]
   * @returns {string|null}
   */
  function _encode(key, inArray) {
    // Bad keys like `null`, `object`, `boolean`, 'function', 'symbol' should not be passed here due to prior validation
    if (key === undefined) {
      return null;
    }
    // array, date, number, string, binary (should already have detected "invalid")
    return types[getKeyType(key)].encode(key, inArray);
  }

  /**
   *
   * @param {Key} key
   * @param {boolean} [inArray]
   * @throws {Error} Invalid number
   * @returns {undefined|ValueType}
   */
  function _decode(key, inArray) {
    if (typeof key !== 'string') {
      return undefined;
    }
    return types[encodedCharToKeyType[key.slice(0, 1)]].decode(key, inArray);
  }

  /**
   *
   * @param {Key} key
   * @param {boolean} [inArray]
   * @returns {undefined|ValueType}
   */
  function roundTrip(key, inArray) {
    return _decode(_encode(key, inArray), inArray);
  }
  var MAX_ALLOWED_CURRENT_NUMBER = 9007199254740992; // 2 ^ 53 (Also equal to `Number.MAX_SAFE_INTEGER + 1`)

  /**
   * @typedef {number} Integer
   */

  /**
   * @callback CurrentNumberCallback
   * @param {Integer} cn The current number
   * @returns {void}
   */

  /**
  * @callback SQLFailureCallback
  * @param {DOMException|Error} exception
  * @returns {void}
  */

  /**
   *
   * @param {SQLTransaction} tx
   * @param {import('./IDBObjectStore.js').IDBObjectStoreFull} store
   * @param {CurrentNumberCallback} func
   * @param {SQLFailureCallback} sqlFailCb
   * @returns {void}
   */
  function getCurrentNumber(tx, store, func, sqlFailCb) {
    tx.executeSql('SELECT "currNum" FROM __sys__ WHERE "name" = ?', [escapeSQLiteStatement(store.__currentName)], function (tx, data) {
      if (data.rows.length !== 1) {
        func(1);
      } else {
        func(data.rows.item(0).currNum);
      }
    }, function (tx, error) {
      sqlFailCb(createDOMException('DataError', 'Could not get the auto increment value for key', error));
      return false;
    });
  }

  /**
   *
   * @param {SQLTransaction} tx
   * @param {import('./IDBObjectStore.js').IDBObjectStoreFull} store
   * @param {Integer} num
   * @param {CurrentNumberCallback} successCb
   * @param {SQLFailureCallback} failCb
   * @returns {void}
   */
  function assignCurrentNumber(tx, store, num, successCb, failCb) {
    var sql = 'UPDATE __sys__ SET "currNum" = ? WHERE "name" = ?';
    var sqlValues = [num, escapeSQLiteStatement(store.__currentName)];
    if (CFG.DEBUG) {
      console.log(sql, sqlValues);
    }
    tx.executeSql(sql, sqlValues, function () {
      successCb(num);
    }, function (tx, err) {
      failCb(createDOMException('UnknownError', 'Could not set the auto increment value for key', err));
      return false;
    });
  }

  /**
   * Bump up the auto-inc counter if the key path-resolved value is valid
   *   (greater than old value and >=1) OR if a manually passed in key is
   *   valid (numeric and >= 1) and >= any primaryKey.
   * @param {SQLTransaction} tx
   * @param {import('./IDBObjectStore.js').IDBObjectStoreFull} store
   * @param {Integer} num
   * @param {CurrentNumberCallback} successCb
   * @param {SQLFailureCallback} failCb
   * @returns {void}
   */
  function setCurrentNumber(tx, store, num, successCb, failCb) {
    num = num === MAX_ALLOWED_CURRENT_NUMBER ? num + 2 // Since incrementing by one will have no effect in JavaScript on this unsafe max, we represent the max as a number incremented by two. The getting of the current number is never returned to the user and is only used in safe comparisons, so it is safe for us to represent it in this manner
    : num + 1;
    return assignCurrentNumber(tx, store, num, successCb, failCb);
  }

  /**
   * @callback KeyForStoreCallback
   * @param {"failure"|null} arg1
   * @param {Integer} [arg2]
   * @param {Integer} [arg3]
   * @returns {void}
   */

  /**
   *
   * @param {SQLTransaction} tx
   * @param {import('./IDBObjectStore.js').IDBObjectStoreFull} store
   * @param {KeyForStoreCallback} cb
   * @param {SQLFailureCallback} sqlFailCb
   * @returns {void}
   */
  function generateKeyForStore(tx, store, cb, sqlFailCb) {
    getCurrentNumber(tx, store, function (key) {
      if (key > MAX_ALLOWED_CURRENT_NUMBER) {
        // 2 ^ 53 (See <https://github.com/w3c/IndexedDB/issues/147>)
        cb('failure');
        return;
      }
      // Increment current number by 1 (we cannot leverage SQLite's
      //  autoincrement (and decrement when not needed), as decrementing
      //  will be overwritten/ignored upon the next insert)
      setCurrentNumber(tx, store, key, function () {
        cb(null, key, key);
      }, sqlFailCb);
    }, sqlFailCb);
  }

  // Fractional or numbers exceeding the max do not get changed in the result
  //     per https://github.com/w3c/IndexedDB/issues/147
  //     so we do not return a key
  /**
   *
   * @param {SQLTransaction} tx
   * @param {import('./IDBObjectStore.js').IDBObjectStoreFull} store
   * @param {Key} key
   * @param {(num?: Integer) => void} successCb
   * @param {SQLFailureCallback} sqlFailCb
   * @returns {void}
   */
  function possiblyUpdateKeyGenerator(tx, store, key, successCb, sqlFailCb) {
    // Per https://github.com/w3c/IndexedDB/issues/147 , non-finite numbers
    //   (or numbers larger than the max) are now to have the explicit effect of
    //   setting the current number (up to the max), so we do not optimize them
    //   out here
    if (typeof key !== 'number' || key < 1) {
      // Optimize with no need to get the current number
      // Auto-increment attempted with a bad key;
      //   we are not to change the current number, but the steps don't call for failure
      // Numbers < 1 are optimized out as they will never be greater than the current number which must be at least 1
      successCb();
    } else {
      // If auto-increment and the keyPath item is a valid numeric key, get the old auto-increment to compare if the new is higher
      //  to determine which to use and whether to update the current number
      getCurrentNumber(tx, store, function (cn) {
        var value = Math.floor(Math.min(key, MAX_ALLOWED_CURRENT_NUMBER));
        var useNewKeyForAutoInc = value >= cn;
        if (useNewKeyForAutoInc) {
          setCurrentNumber(tx, store, value, function () {
            successCb(cn); // Supply old current number in case needs to be reverted
          }, sqlFailCb);
        } else {
          // Not updated
          successCb();
        }
      }, sqlFailCb);
    }
  }

  exports.assignCurrentNumber = assignCurrentNumber;
  exports.checkKeyCouldBeInjectedIntoValue = checkKeyCouldBeInjectedIntoValue;
  exports.convertKeyToValue = convertKeyToValue;
  exports.convertValueToKey = convertValueToKey;
  exports.convertValueToKeyRethrowingAndIfInvalid = convertValueToKeyRethrowingAndIfInvalid;
  exports.convertValueToKeyValueDecoded = convertValueToKeyValueDecoded;
  exports.convertValueToMultiEntryKey = convertValueToMultiEntryKey;
  exports.convertValueToMultiEntryKeyDecoded = convertValueToMultiEntryKeyDecoded;
  exports.decode = _decode;
  exports.encode = _encode;
  exports.evaluateKeyPathOnValue = evaluateKeyPathOnValue;
  exports.extractKeyFromValueUsingKeyPath = extractKeyFromValueUsingKeyPath;
  exports.extractKeyValueDecodedFromValueUsingKeyPath = extractKeyValueDecodedFromValueUsingKeyPath;
  exports.findMultiEntryMatches = findMultiEntryMatches;
  exports.generateKeyForStore = generateKeyForStore;
  exports.injectKeyIntoValueUsingKeyPath = injectKeyIntoValueUsingKeyPath;
  exports.isKeyInRange = isKeyInRange;
  exports.isMultiEntryMatch = isMultiEntryMatch;
  exports.possiblyUpdateKeyGenerator = possiblyUpdateKeyGenerator;
  exports.roundTrip = roundTrip;

}));
//# sourceMappingURL=indexeddbshim-Key.js.map
