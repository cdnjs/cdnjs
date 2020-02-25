(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.IDBKeyUtils = {}));
}(this, (function (exports) { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _iterableToArrayLimit(arr, i) {
    if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
      return;
    }

    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  var map = {};
  var CFG = {};
  [// Boolean for verbose reporting
  'DEBUG', // Effectively defaults to false (ignored unless `true`)
  // Boolean (effectively defaults to true) on whether to cache WebSQL
  //  `openDatabase` instances
  'cacheDatabaseInstances', // Boolean on whether to auto-name databases (based on an
  //   auto-increment) when the empty string is supplied; useful with
  //   `memoryDatabase`; defaults to `false` which means the empty string
  //   will be used as the (valid) database name
  'autoName', // Determines whether the slow-performing `Object.setPrototypeOf`
  //    calls required for full WebIDL compliance will be used. Probably
  //    only needed for testing or environments where full introspection
  //    on class relationships is required; see
  //    http://stackoverflow.com/questions/41927589/rationales-consequences-of-webidl-class-inheritance-requirements
  'fullIDLSupport', // Effectively defaults to false (ignored unless `true`)
  // Boolean on whether to perform origin checks in `IDBFactory` methods
  // Effectively defaults to `true` (must be set to `false` to cancel checks)
  'checkOrigin', // Used by `IDBCursor` continue methods for number of records to cache;
  //  Defaults to 100
  'cursorPreloadPackSize', // See optional API (`shimIndexedDB.__setUnicodeIdentifiers`);
  //    or just use the Unicode builds which invoke this method
  //    automatically using the large, fully spec-compliant, regular
  //    expression strings of `src/UnicodeIdentifiers.js`)
  // In the non-Unicode builds, defaults to /[$A-Z_a-z]/
  'UnicodeIDStart', // In the non-Unicode builds, defaults to /[$0-9A-Z_a-z]/
  'UnicodeIDContinue', // Used by SCA.js for optional restructuring of typeson-registry
  //   Structured Cloning Algorithm; should only be needed for ensuring data
  //   created in 3.* versions of IndexedDBShim continue to work; see the
  //   library `typeson-registry-sca-reverter` to get a function to do this
  'registerSCA', // BROWSER-SPECIFIC CONFIG
  'avoidAutoShim', // Where WebSQL is detected but where `indexedDB` is
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
  'win', // For internal `openDatabase` calls made by `IDBFactory` methods;
  //  per the WebSQL spec, "User agents are expected to use the display name
  //  and the estimated database size to optimize the user experience.
  //  For example, a user agent could use the estimated size to suggest an
  //  initial quota to the user. This allows a site that is aware that it
  //  will try to use hundreds of megabytes to declare this upfront, instead
  //  of the user agent prompting the user for permission to increase the
  //  quota every five megabytes."
  // Defaults to (4 * 1024 * 1024) or (25 * 1024 * 1024) in Safari
  'DEFAULT_DB_SIZE', // Whether to create indexes on SQLite tables (and also whether to try
  //   dropping)
  // Effectively defaults to `false` (ignored unless `true`)
  'useSQLiteIndexes', // NODE-IMPINGING SETTINGS (created for sake of limitations in Node
  //    or desktop file system implementation but applied by default in
  //    browser for parity)
  // Used when setting global shims to determine whether to try to add
  //   other globals shimmed by the library (`ShimDOMException`,
  //   `ShimDOMStringList`, `ShimEvent`, `ShimCustomEvent`, `ShimEventTarget`)
  // Effectively defaults to `false` (ignored unless `true`)
  'addNonIDBGlobals', // Used when setting global shims to determine whether to try to overwrite
  //   other globals shimmed by the library (`DOMException`, `DOMStringList`,
  //   `Event`, `CustomEvent`, `EventTarget`)
  // Effectively defaults to `false` (ignored unless `true`)
  'replaceNonIDBGlobals', // Overcoming limitations with node-sqlite3/storing database name on
  //   file systems
  // https://en.wikipedia.org/wiki/Filename#Reserved_characters_and_words
  // Defaults to prefixing database with `D_`, escaping
  //   `databaseCharacterEscapeList`, escaping NUL, and
  //   escaping upper case letters, as well as enforcing
  //   `databaseNameLengthLimit`
  'escapeDatabaseName', // Not used internally; usable as a convenience method
  'unescapeDatabaseName', // Defaults to global regex representing the following
  //   (characters nevertheless commonly reserved in modern,
  //   Unicode-supporting systems): 0x00-0x1F 0x7F " * / : < > ? \ |
  'databaseCharacterEscapeList', // Defaults to 254 (shortest typical modern file length limit)
  'databaseNameLengthLimit', // Boolean defaulting to true on whether to escape NFD-escaping
  //   characters to avoid clashes on MacOS which performs NFD on files
  'escapeNFDForDatabaseNames', // Boolean on whether to add the `.sqlite` extension to file names;
  //   defaults to `true`
  'addSQLiteExtension', // Various types of in-memory databases that can auto-delete
  ['memoryDatabase', function (val) {
    if (!/^(?::memory:|file::memory:(\?(?:[\0-"\$-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*)?(#(?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*)?)?$/.test(val)) {
      throw new TypeError('`memoryDatabase` must be the empty string, ":memory:", or a ' + '"file::memory:[?queryString][#hash] URL".');
    }
  }], // NODE-SPECIFIC CONFIG
  // Boolean on whether to delete the database file itself after
  //   `deleteDatabase`; defaults to `true` as the database will be empty
  'deleteDatabaseFiles', 'databaseBasePath', 'sysDatabaseBasePath', // NODE-SPECIFIC WEBSQL CONFIG
  'sqlBusyTimeout', // Defaults to 1000
  'sqlTrace', // Callback not used by default
  'sqlProfile' // Callback not used by default
  ].forEach(function (prop) {
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
    return new DOMException.prototype.constructor(message, name || 'DOMException');
  } // From web-platform-tests testharness.js name_code_map (though not in new spec)


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
   * @returns {DOMException}
   */

  function createNonNativeDOMExceptionClass() {
    function DOMException(message, name) {
      // const err = Error.prototype.constructor.call(this, message); // Any use to this? Won't set this.message
      this[Symbol.toStringTag] = 'DOMException';
      this._code = name in codes ? codes[name] : legacyCodes[name] || 0;
      this._name = name || 'Error'; // We avoid `String()` in this next line as it converts Symbols

      this._message = message === undefined ? '' : '' + message; // eslint-disable-line no-implicit-coercion

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
    } // Necessary for W3C tests which complains if `DOMException` has properties on its "own" prototype
    // class DummyDOMException extends Error {}; // Sometimes causing problems in Node
    // eslint-disable-next-line func-name-matching


    var DummyDOMException = function DOMException() {
      /* */
    };

    DummyDOMException.prototype = Object.create(Error.prototype); // Intended for subclassing

    ['name', 'message'].forEach(function (prop) {
      Object.defineProperty(DummyDOMException.prototype, prop, {
        enumerable: true,
        get: function get() {
          if (!(this instanceof DOMException || this instanceof DummyDOMException || this instanceof Error)) {
            throw new TypeError('Illegal invocation');
          }

          return this['_' + prop];
        }
      });
    }); // DOMException uses the same `toString` as `Error`

    Object.defineProperty(DummyDOMException.prototype, 'code', {
      configurable: true,
      enumerable: true,
      get: function get() {
        throw new TypeError('Illegal invocation');
      }
    });
    DOMException.prototype = new DummyDOMException();
    DOMException.prototype[Symbol.toStringTag] = 'DOMExceptionPrototype';
    Object.defineProperty(DOMException, 'prototype', {
      writable: false
    });
    Object.keys(codes).forEach(function (codeName) {
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
   * Logs detailed error information to the console.
   * @param {string} name
   * @param {string} message
   * @param {string|Error|null} error
   * @returns {void}
   */


  function logError(name, message, error) {
    if (CFG.DEBUG) {
      if (error && error.message) {
        error = error.message;
      }

      var method = typeof console.error === 'function' ? 'error' : 'log';
      console[method](name + ': ' + message + '. ' + (error || ''));
      console.trace && console.trace();
    }
  }

  function isErrorOrDOMErrorOrDOMException(obj) {
    return obj && _typeof(obj) === 'object' && // We don't use util.isObj here as mutual dependency causing problems in Babel with browser
    typeof obj.name === 'string';
  }

  var test,
      useNativeDOMException = false; // Test whether we can use the browser's native DOMException class

  try {
    test = createNativeDOMException('test name', 'test message');

    if (isErrorOrDOMErrorOrDOMException(test) && test.name === 'test name' && test.message === 'test message') {
      // Native DOMException works as expected
      useNativeDOMException = true;
    }
  } catch (e) {}

  var createDOMException = useNativeDOMException ? function (name, message, error) {
    logError(name, message, error);
    return createNativeDOMException(name, message);
  } : function (name, message, error) {
    logError(name, message, error);
    return createNonNativeDOMException(name, message);
  };

  function escapeUnmatchedSurrogates(arg) {
    // http://stackoverflow.com/a/6701665/271577
    return arg.replace(/((?:[\uD800-\uDBFF](?![\uDC00-\uDFFF])))(?!(?:(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]))|(^|(?:[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]))((?:(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]))/g, function (_, unmatchedHighSurrogate, precedingLow, unmatchedLowSurrogate) {
      // Could add a corresponding surrogate for compatibility with `node-sqlite3`: http://bugs.python.org/issue12569 and http://stackoverflow.com/a/6701665/271577
      //   but Chrome having problems
      if (unmatchedHighSurrogate) {
        return '^2' + padStart(unmatchedHighSurrogate.charCodeAt().toString(16), 4, '0');
      }

      return (precedingLow || '') + '^3' + padStart(unmatchedLowSurrogate.charCodeAt().toString(16), 4, '0');
    });
  }


  function escapeSQLiteStatement(arg) {
    return escapeUnmatchedSurrogates(arg.replace(/\^/g, '^^').replace(/\0/g, '^0'));
  }

  function isObj(obj) {
    return obj && _typeof(obj) === 'object';
  }

  function isDate(obj) {
    return isObj(obj) && typeof obj.getDate === 'function';
  }

  function isBlob(obj) {
    return isObj(obj) && typeof obj.size === 'number' && typeof obj.slice === 'function' && !('lastModified' in obj);
  }

  function isFile(obj) {
    return isObj(obj) && typeof obj.name === 'string' && typeof obj.slice === 'function' && 'lastModified' in obj;
  }

  function isBinary(obj) {
    return isObj(obj) && typeof obj.byteLength === 'number' && (typeof obj.slice === 'function' || // `TypedArray` (view on buffer) or `ArrayBuffer`
    typeof obj.getFloat64 === 'function' // `DataView` (view on buffer)
    );
  }

  function isNullish(v) {
    return v === null || v === undefined;
  }


  function padStart(str, ct, fill) {
    return new Array(ct - String(str).length + 1).join(fill) + str;
  }

  /**
   * Compares two keys.
   * @param first
   * @param second
   * @returns {number}
   */

  function cmp(first, second) {
    var encodedKey1 = _encode(first);
    var encodedKey2 = _encode(second);
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
      } // Encoding/decoding mismatches are usually due to a loss of
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
   * @module Key
   */

  /**
   * Encodes the keys based on their types. This is required to maintain collations
   * We leave space for future keys.
   */

  var keyTypeToEncodedChar = {
    invalid: 100,
    number: 200,
    date: 300,
    string: 400,
    binary: 500,
    array: 600
  };
  var keyTypes = Object.keys(keyTypeToEncodedChar);
  keyTypes.forEach(function (k) {
    keyTypeToEncodedChar[k] = String.fromCharCode(keyTypeToEncodedChar[k]);
  });
  var encodedCharToKeyType = keyTypes.reduce(function (o, k) {
    o[keyTypeToEncodedChar[k]] = k;
    return o;
  }, {});
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
  var types = {
    invalid: {
      encode: function encode(key) {
        return keyTypeToEncodedChar.invalid + '-';
      },
      decode: function decode(key) {
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
      encode: function encode(key) {
        var key32 = key === Number.MIN_VALUE // Mocha test `IDBFactory/cmp-spec.js` exposed problem for some
        //   Node (and Chrome) versions with `Number.MIN_VALUE` being treated
        //   as 0
        // https://stackoverflow.com/questions/43305403/number-min-value-and-tostring
        ? '0.' + '0'.repeat(214) + '2' : Math.abs(key).toString(32); // Get the index of the decimal.

        var decimalIndex = key32.indexOf('.'); // Remove the decimal.

        key32 = decimalIndex !== -1 ? key32.replace('.', '') : key32; // Get the index of the first significant digit.

        var significantDigitIndex = key32.search(/(?:[\0-\/1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/); // Truncate leading zeros.

        key32 = key32.slice(significantDigitIndex);
        var sign, exponent, mantissa; // Finite cases:

        if (isFinite(key)) {
          // Negative cases:
          if (key < 0) {
            // Negative exponent case:
            if (key > -1) {
              sign = signValues.indexOf('smallNegative');
              exponent = padBase32Exponent(significantDigitIndex);
              mantissa = flipBase32(padBase32Mantissa(key32)); // Non-negative exponent case:
            } else {
              sign = signValues.indexOf('bigNegative');
              exponent = flipBase32(padBase32Exponent(decimalIndex !== -1 ? decimalIndex : key32.length));
              mantissa = flipBase32(padBase32Mantissa(key32));
            } // Non-negative cases:
            // Negative exponent case:

          } else if (key < 1) {
            sign = signValues.indexOf('smallPositive');
            exponent = flipBase32(padBase32Exponent(significantDigitIndex));
            mantissa = padBase32Mantissa(key32); // Non-negative exponent case:
          } else {
            sign = signValues.indexOf('bigPositive');
            exponent = padBase32Exponent(decimalIndex !== -1 ? decimalIndex : key32.length);
            mantissa = padBase32Mantissa(key32);
          } // Infinite cases:

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
      decode: function decode(key) {
        var sign = Number(key.slice(2, 3));
        var exponent = key.slice(3, 5);
        var mantissa = key.slice(5, 16);

        switch (signValues[sign]) {
          case 'negativeInfinity':
            return -Infinity;

          case 'positiveInfinity':
            return Infinity;

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
      encode: function encode(key, inArray) {
        if (inArray) {
          // prepend each character with a dash, and append a space to the end
          key = key.replace(/((?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]))/g, '-$1') + ' ';
        }

        return keyTypeToEncodedChar.string + '-' + key;
      },
      decode: function decode(key, inArray) {
        key = key.slice(2);

        if (inArray) {
          // remove the space at the end, and the dash before each character
          key = key.slice(0, -1).replace(/\x2D((?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]))/g, '$1');
        }

        return key;
      }
    },
    // Arrays are encoded as JSON strings.
    // An extra, value is added to each array during encoding to make
    //  empty arrays sort correctly.
    array: {
      encode: function encode(key) {
        var encoded = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = key.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _step$value = _slicedToArray(_step.value, 2),
                i = _step$value[0],
                item = _step$value[1];

            var encodedItem = _encode(item, true); // encode the array item


            encoded[i] = encodedItem;
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        encoded.push(keyTypeToEncodedChar.invalid + '-'); // append an extra item, so empty arrays sort correctly

        return keyTypeToEncodedChar.array + '-' + JSON.stringify(encoded);
      },
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
      encode: function encode(key) {
        return keyTypeToEncodedChar.date + '-' + key.toJSON();
      },
      decode: function decode(key) {
        return new Date(key.slice(2));
      }
    },
    binary: {
      // `ArrayBuffer`/Views on buffers (`TypedArray` or `DataView`)
      encode: function encode(key) {
        return keyTypeToEncodedChar.binary + '-' + (key.byteLength ? _toConsumableArray(getCopyBytesHeldByBufferSource(key)).map(function (b) {
          return padStart(b, 3, '0');
        }) // e.g., '255,005,254,000,001,033'
        : '');
      },
      decode: function decode(key) {
        // Set the entries in buffer's [[ArrayBufferData]] to those in `value`
        var k = key.slice(2);
        var arr = k.length ? k.split(',').map(function (s) {
          return parseInt(s);
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
    n = n.toString(32);
    return n.length === 1 ? '0' + n : n;
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
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = encoded[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var ch = _step2.value;
        flipped += (31 - parseInt(ch, 32)).toString(32);
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
          _iterator2["return"]();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
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
    exponent = parseInt(exponent, 32);

    if (exponent < 0) {
      return roundToPrecision(parseInt(mantissa, 32) * Math.pow(32, exponent - 10));
    }

    if (exponent < 11) {
      var whole = mantissa.slice(0, exponent);
      whole = parseInt(whole, 32);
      var fraction = mantissa.slice(exponent);
      fraction = parseInt(fraction, 32) * Math.pow(32, exponent - 11);
      return roundToPrecision(whole + fraction);
    }

    var expansion = mantissa + zeros(exponent - 11);
    return parseInt(expansion, 32);
  }
  /**
   * @param {Float} num
   * @param {Float} precision
   * @returns {Float}
   */


  function roundToPrecision(num, precision) {
    precision = precision || 16;
    return parseFloat(num.toPrecision(precision));
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
  * @typedef {"number"|"date"|"string"|"binary"|"array"} module:Key.KeyType
  */

  /**
   * @param key
   * @returns {module:Key.KeyType}
   */


  function getKeyType(key) {
    if (Array.isArray(key)) return 'array';
    if (isDate(key)) return 'date';
    if (isBinary(key)) return 'binary';

    var keyType = _typeof(key);

    return ['string', 'number'].includes(keyType) ? keyType : 'invalid';
  }
  /**
   * Keys must be strings, numbers (besides `NaN`), Dates (if value is not
   *   `NaN`), binary objects or Arrays.
   * @param input The key input
   * @param {?(Array)} [seen] An array of already seen keys
   * @returns {module:Key.keyValueObject}
   */


  function convertValueToKey(input, seen) {
    return convertValueToKeyValueDecoded(input, seen, false, true);
  }
  /**
  * Currently not in use.
  * @param input
  * @returns {module:Key.keyValueObject}
  */


  function convertValueToMultiEntryKey(input) {
    return convertValueToKeyValueDecoded(input, null, true, true);
  }
  /**
   *
   * @param O
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
    } // const octets = new Uint8Array(input);
    // const octets = types.binary.decode(types.binary.encode(input));


    return new Uint8Array(O.buffer || O, offset, length);
  }
  /**
  * @typedef {PlainObject} module:Key.keyValueObject
  * @property {module:Key.KeyType|"NaN"} type
  * @property {*} [value]
  * @property {boolean} [invalid]
  * @property {string} [message]
  * @todo Specify acceptable `value` more precisely
  */

  /**
  * Shortcut utility to avoid returning full keys from `convertValueToKey`
  *   and subsequent need to process in calling code unless `fullKeys` is
  *   set; may throw.
  * @param {module:Key.Key} input
  * @param {?(Array)} [seen]
  * @param {boolean} [multiEntry]
  * @param {boolean} [fullKeys]
  * @todo Document other allowable `input`
  * @returns {module:Key.keyValueObject}
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

          return ret;
        }

      case 'string':
        {
          return ret;
        }

      case 'binary':
        {
          // May throw (if detached)
          // Get a copy of the bytes held by the buffer source
          // https://heycam.github.io/webidl/#ref-for-dfn-get-buffer-source-copy-2
          var octets = getCopyBytesHeldByBufferSource(input);
          return {
            type: 'binary',
            value: octets
          };
        }

      case 'array':
        {
          // May throw (from binary)
          var len = input.length;
          seen.push(input);
          var keys = [];

          for (var i = 0; i < len; i++) {
            // We cannot iterate here with array extras as we must ensure sparse arrays are invalidated
            if (!multiEntry && !Object.prototype.hasOwnProperty.call(input, i)) {
              return {
                type: type,
                invalid: true,
                message: 'Does not have own index property'
              };
            }

            try {
              var _ret = function () {
                var entry = input[i];
                var key = convertValueToKeyValueDecoded(entry, seen, false, fullKeys); // Though steps do not list rethrowing, the next is returnifabrupt when not multiEntry

                if (key.invalid) {
                  if (multiEntry) {
                    return "continue";
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
              }();

              switch (_ret) {
                case "continue":
                  continue;

                default:
                  if (_typeof(_ret) === "object") return _ret.v;
              }
            } catch (err) {
              if (!multiEntry) {
                throw err;
              }
            }
          }

          return {
            type: type,
            value: keys
          };
        }

      case 'date':
        {
          if (!Number.isNaN(input.getTime())) {
            return fullKeys ? {
              type: type,
              value: input.getTime()
            } : {
              type: type,
              value: new Date(input.getTime())
            };
          }

          return {
            type: type,
            invalid: true,
            message: 'Not a valid date'
          }; // Falls through
        }

      case 'invalid':
      default:
        {
          // Other `typeof` types which are not valid keys:
          //    'undefined', 'boolean', 'object' (including `null`), 'symbol', 'function
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
  * @typedef {*} module:Key.Key
  * @todo Specify possible value more precisely
  */

  /**
   *
   * @param {module:Key.Key} key
   * @param {boolean} fullKeys
   * @returns {module:Key.keyValueObject}
   * @todo Document other allowable `key`?
   */


  function convertValueToMultiEntryKeyDecoded(key, fullKeys) {
    return convertValueToKeyValueDecoded(key, null, true, fullKeys);
  }
  /**
  * An internal utility.
  * @param input
  * @param {boolean} seen
  * @throws {DOMException} `DataError`
  * @returns {module:Key.keyValueObject}
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
   * @param value
   * @param keyPath
   * @param {boolean} multiEntry
   * @returns {module:Key.keyValueObject|module:Key.KeyPathEvaluateValue}
   * @todo Document other possible return?
   */


  function extractKeyFromValueUsingKeyPath(value, keyPath, multiEntry) {
    return extractKeyValueDecodedFromValueUsingKeyPath(value, keyPath, multiEntry, true);
  }
  /**
  * Not currently in use.
  * @param value
  * @param keyPath
  * @param {boolean} multiEntry
  * @returns {module:Key.KeyPathEvaluateValue}
  */


  function evaluateKeyPathOnValue(value, keyPath, multiEntry) {
    return evaluateKeyPathOnValueToDecodedValue(value, keyPath);
  }
  /**
  * May throw, return `{failure: true}` (e.g., non-object on keyPath resolution)
  *    or `{invalid: true}` (e.g., `NaN`).
  * @param value
  * @param keyPath
  * @param {boolean} multiEntry
  * @param {boolean} fullKeys
  * @returns {module:Key.keyValueObject|module:Key.KeyPathEvaluateValue}
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
  * @typedef {PlainObject} module:Key.KeyPathEvaluateFailure
  * @property {boolean} failure
  */

  /**
  * @typedef {PlainObject} module:Key.KeyPathEvaluateValue
  * @property {undefined|array|string} value
  */

  /**
   * Returns the value of an inline key based on a key path (wrapped in an
   *   object with key `value`) or `{failure: true}`
   * @param {object} value
   * @param {string|array} keyPath
   * @param {boolean} multiEntry
   * @param {boolean} [fullKeys]
   * @returns {module:Key.KeyPathEvaluateValue}
   */


  function evaluateKeyPathOnValueToDecodedValue(value, keyPath, multiEntry, fullKeys) {
    if (Array.isArray(keyPath)) {
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
    return identifiers.some(function (idntfr, i) {
      if (idntfr === 'length' && (typeof value === 'string' || Array.isArray(value))) {
        value = value.length;
      } else if (isBlob(value)) {
        switch (idntfr) {
          case 'size':
          case 'type':
            value = value[idntfr];
            break;
        }
      } else if (isFile(value)) {
        switch (idntfr) {
          case 'name':
          case 'lastModified':
            value = value[idntfr];
            break;

          case 'lastModifiedDate':
            value = new Date(value.lastModified);
            break;
        }
      } else if (!isObj(value) || !Object.prototype.hasOwnProperty.call(value, idntfr)) {
        return true;
      } else {
        value = value[idntfr];
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
   * @param {object} value
   * @param {*} key
   * @param {string} keyPath
   * @returns {void}
   */


  function injectKeyIntoValueUsingKeyPath(value, key, keyPath) {
    var identifiers = keyPath.split('.');
    var last = identifiers.pop();
    identifiers.forEach(function (identifier) {
      var hop = Object.prototype.hasOwnProperty.call(value, identifier);

      if (!hop) {
        value[identifier] = {};
      }

      value = value[identifier];
    });
    value[last] = key; // key is already a `keyValue` in our processing so no need to convert
  }
  /**
   *
   * @param value
   * @param keyPath
   * @see https://github.com/w3c/IndexedDB/pull/146
   * @returns {boolean}
   */


  function checkKeyCouldBeInjectedIntoValue(value, keyPath) {
    var identifiers = keyPath.split('.');
    identifiers.pop();
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = identifiers[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var identifier = _step3.value;

        if (!isObj(value)) {
          return false;
        }

        var hop = Object.prototype.hasOwnProperty.call(value, identifier);

        if (!hop) {
          return true;
        }

        value = value[identifier];
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
          _iterator3["return"]();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }

    return isObj(value);
  }
  /**
   *
   * @param {module:Key.Key} key
   * @param {IDBKeyRange} range
   * @param {boolean} checkCached
   * @returns {boolean}
   */


  function isKeyInRange(key, range, checkCached) {
    var lowerMatch = range.lower === undefined;
    var upperMatch = range.upper === undefined;

    var encodedKey = _encode(key, true);

    var lower = checkCached ? range.__lowerCached : _encode(range.lower, true);
    var upper = checkCached ? range.__upperCached : _encode(range.upper, true);

    if (range.lower !== undefined) {
      if (range.lowerOpen && encodedKey > lower) {
        lowerMatch = true;
      }

      if (!range.lowerOpen && encodedKey >= lower) {
        lowerMatch = true;
      }
    }

    if (range.upper !== undefined) {
      if (range.upperOpen && encodedKey < upper) {
        upperMatch = true;
      }

      if (!range.upperOpen && encodedKey <= upper) {
        upperMatch = true;
      }
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
   * @param {module:Key.Key} keyEntry
   * @param {IDBKeyRange} range
   * @returns {module:Key.Key[]}
   */


  function findMultiEntryMatches(keyEntry, range) {
    var matches = [];

    if (Array.isArray(keyEntry)) {
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = keyEntry[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var key = _step4.value;

          if (Array.isArray(key)) {
            if (range && range.lower === range.upper) {
              continue;
            }

            if (key.length === 1) {
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
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
            _iterator4["return"]();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }
    } else if (isNullish(range) || isKeyInRange(keyEntry, range, true)) {
      matches.push(keyEntry);
    }

    return matches;
  }
  /**
  * @typedef {number|string|Date|ArrayBuffer|module:Key.ValueTypes[]} module:Key.ValueTypes
  */

  /**
  * Not currently in use but keeping for spec parity.
  * @param {module:Key.Key} key
  * @throws {Error} Upon a "bad key"
  * @returns {module:Key.ValueTypes}
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
          var buffer = new ArrayBuffer(_len); // Set the entries in buffer's [[ArrayBufferData]] to those in `value`

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
   * @param {module:Key.Key} key
   * @param {boolean} inArray
   * @returns {string|null}
   */


  function _encode(key, inArray) {
    // Bad keys like `null`, `object`, `boolean`, 'function', 'symbol' should not be passed here due to prior validation
    if (key === undefined) {
      return null;
    } // array, date, number, string, binary (should already have detected "invalid")


    return types[getKeyType(key)].encode(key, inArray);
  }
  /**
   *
   * @param {module:Key.Key} key
   * @param {boolean} inArray
   * @throws {Error} Invalid number
   * @returns {undefined|module:Key.ValueTypes}
   */


  function _decode(key, inArray) {
    if (typeof key !== 'string') {
      return undefined;
    }

    return types[encodedCharToKeyType[key.slice(0, 1)]].decode(key, inArray);
  }
  /**
   *
   * @param {module:Key.Key} key
   * @param {boolean} inArray
   * @returns {undefined|module:Key.ValueTypes}
   */


  function roundTrip(key, inArray) {
    return _decode(_encode(key, inArray), inArray);
  }

  var MAX_ALLOWED_CURRENT_NUMBER = 9007199254740992; // 2 ^ 53 (Also equal to `Number.MAX_SAFE_INTEGER + 1`)

  /**
   * @external WebSQLTransaction
   */

  /**
  * @typedef {IDBObjectStore} IDBObjectStoreWithCurrentName
  * @property {string} __currentName
  */

  /**
   * @callback CurrentNumberCallback
   * @param {Integer} The current number
   * @returns {void}
   */

  /**
  * @callback SQLFailureCallback
  * @param {DOMException} exception
  * @returns {void}
  */

  /**
   *
   * @param {external:WebSQLTransaction} tx
   * @param {IDBObjectStoreWithCurrentName} store
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
    });
  }
  /**
   *
   * @param {external:WebSQLTransaction} tx
   * @param {IDBObjectStoreWithCurrentName} store
   * @param {Integer} num
   * @param {CurrentNumberCallback} successCb
   * @param {SQLFailureCallback} failCb
   * @returns {void}
   */


  function assignCurrentNumber(tx, store, num, successCb, failCb) {
    var sql = 'UPDATE __sys__ SET "currNum" = ? WHERE "name" = ?';
    var sqlValues = [num, escapeSQLiteStatement(store.__currentName)];
    CFG.DEBUG && console.log(sql, sqlValues);
    tx.executeSql(sql, sqlValues, function (tx, data) {
      successCb(num);
    }, function (tx, err) {
      failCb(createDOMException('UnknownError', 'Could not set the auto increment value for key', err));
    });
  }
  /**
   * Bump up the auto-inc counter if the key path-resolved value is valid
   *   (greater than old value and >=1) OR if a manually passed in key is
   *   valid (numeric and >= 1) and >= any primaryKey.
   * @param {external:WebSQLTransaction} tx
   * @param {IDBObjectStoreWithCurrentName} store
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
   * @param {external:WebSQLTransaction} tx
   * @param {IDBObjectStoreWithCurrentName} store
   * @param {KeyForStoreCallback} cb
   * @param {SQLFailureCallback} sqlFailCb
   * @returns {void}
   */


  function generateKeyForStore(tx, store, cb, sqlFailCb) {
    getCurrentNumber(tx, store, function (key) {
      if (key > MAX_ALLOWED_CURRENT_NUMBER) {
        // 2 ^ 53 (See <https://github.com/w3c/IndexedDB/issues/147>)
        cb('failure'); // eslint-disable-line standard/no-callback-literal

        return;
      } // Increment current number by 1 (we cannot leverage SQLite's
      //  autoincrement (and decrement when not needed), as decrementing
      //  will be overwritten/ignored upon the next insert)


      setCurrentNumber(tx, store, key, function () {
        cb(null, key, key);
      }, sqlFailCb);
    }, sqlFailCb);
  } // Fractional or numbers exceeding the max do not get changed in the result
  //     per https://github.com/w3c/IndexedDB/issues/147
  //     so we do not return a key

  /**
   *
   * @param {external:WebSQLTransaction} tx
   * @param {IDBObjectStoreWithCurrentName} store
   * @param {*|Integer} key
   * @param {CurrentNumberCallback|void} successCb
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

  Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=indexeddbshim-Key.js.map