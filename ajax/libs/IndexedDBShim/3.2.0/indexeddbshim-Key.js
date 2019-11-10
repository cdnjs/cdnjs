(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.IDBKeyUtils = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports=/[\xC0-\xC5\xC7-\xCF\xD1-\xD6\xD9-\xDD\xE0-\xE5\xE7-\xEF\xF1-\xF6\xF9-\xFD\xFF-\u010F\u0112-\u0125\u0128-\u0130\u0134-\u0137\u0139-\u013E\u0143-\u0148\u014C-\u0151\u0154-\u0165\u0168-\u017E\u01A0\u01A1\u01AF\u01B0\u01CD-\u01DC\u01DE-\u01E3\u01E6-\u01F0\u01F4\u01F5\u01F8-\u021B\u021E\u021F\u0226-\u0233\u0344\u0385\u0386\u0388-\u038A\u038C\u038E-\u0390\u03AA-\u03B0\u03CA-\u03CE\u03D3\u03D4\u0400\u0401\u0403\u0407\u040C-\u040E\u0419\u0439\u0450\u0451\u0453\u0457\u045C-\u045E\u0476\u0477\u04C1\u04C2\u04D0-\u04D3\u04D6\u04D7\u04DA-\u04DF\u04E2-\u04E7\u04EA-\u04F5\u04F8\u04F9\u0622-\u0626\u06C0\u06C2\u06D3\u0929\u0931\u0934\u0958-\u095F\u09CB\u09CC\u09DC\u09DD\u09DF\u0A33\u0A36\u0A59-\u0A5B\u0A5E\u0B48\u0B4B\u0B4C\u0B5C\u0B5D\u0B94\u0BCA-\u0BCC\u0C48\u0CC0\u0CC7\u0CC8\u0CCA\u0CCB\u0D4A-\u0D4C\u0DDA\u0DDC-\u0DDE\u0F43\u0F4D\u0F52\u0F57\u0F5C\u0F69\u0F73\u0F75\u0F76\u0F78\u0F81\u0F93\u0F9D\u0FA2\u0FA7\u0FAC\u0FB9\u1026\u1B06\u1B08\u1B0A\u1B0C\u1B0E\u1B12\u1B3B\u1B3D\u1B40\u1B41\u1B43\u1E00-\u1E99\u1E9B\u1EA0-\u1EF9\u1F00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FC1-\u1FC4\u1FC6-\u1FD3\u1FD6-\u1FDB\u1FDD-\u1FEE\u1FF2-\u1FF4\u1FF6-\u1FFC\u212B\u219A\u219B\u21AE\u21CD-\u21CF\u2204\u2209\u220C\u2224\u2226\u2241\u2244\u2247\u2249\u2260\u2262\u226D-\u2271\u2274\u2275\u2278\u2279\u2280\u2281\u2284\u2285\u2288\u2289\u22AC-\u22AF\u22E0-\u22E3\u22EA-\u22ED\u2ADC\u304C\u304E\u3050\u3052\u3054\u3056\u3058\u305A\u305C\u305E\u3060\u3062\u3065\u3067\u3069\u3070\u3071\u3073\u3074\u3076\u3077\u3079\u307A\u307C\u307D\u3094\u309E\u30AC\u30AE\u30B0\u30B2\u30B4\u30B6\u30B8\u30BA\u30BC\u30BE\u30C0\u30C2\u30C5\u30C7\u30C9\u30D0\u30D1\u30D3\u30D4\u30D6\u30D7\u30D9\u30DA\u30DC\u30DD\u30F4\u30F7-\u30FA\u30FE\uAC00-\uD7A3\uFB1D\uFB1F\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFB4E]|\uD804[\uDC9A\uDC9C\uDCAB\uDD2E\uDD2F\uDF4B\uDF4C]|\uD805[\uDCBB\uDCBC\uDCBE\uDDBA\uDDBB]|\uD834[\uDD5E-\uDD64\uDDBB-\uDDC0]/
},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
const map = {};
const CFG = {};

[
// Boolean for verbose reporting
'DEBUG', // Effectively defaults to false (ignored unless `true`)

'cacheDatabaseInstances', // Boolean (effectively defaults to true) on whether to cache WebSQL `openDatabase` instances

// Boolean on whether to auto-name databases (based on an auto-increment) when
//   the empty string is supplied; useful with `memoryDatabase`; defaults to `false`
//   which means the empty string will be used as the (valid) database name
'autoName',

// Determines whether the slow-performing `Object.setPrototypeOf` calls required
//    for full WebIDL compliance will be used. Probably only needed for testing
//    or environments where full introspection on class relationships is required;
//    see http://stackoverflow.com/questions/41927589/rationales-consequences-of-webidl-class-inheritance-requirements
'fullIDLSupport', // Effectively defaults to false (ignored unless `true`)

// Boolean on whether to perform origin checks in `IDBFactory` methods
'checkOrigin', // Effectively defaults to `true` (must be set to `false` to cancel checks)

// Used by `IDBCursor` continue methods for number of records to cache;
'cursorPreloadPackSize', //  Defaults to 100

// See optional API (`shimIndexedDB.__setUnicodeIdentifiers`);
//    or just use the Unicode builds which invoke this method
//    automatically using the large, fully spec-compliant, regular
//    expression strings of `src/UnicodeIdentifiers.js`)
'UnicodeIDStart', // In the non-Unicode builds, defaults to /[$A-Z_a-z]/
'UnicodeIDContinue', // In the non-Unicode builds, defaults to /[$0-9A-Z_a-z]/

// BROWSER-SPECIFIC CONFIG
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
'win',

// For internal `openDatabase` calls made by `IDBFactory` methods;
//  per the WebSQL spec, "User agents are expected to use the display name
//  and the estimated database size to optimize the user experience.
//  For example, a user agent could use the estimated size to suggest an
//  initial quota to the user. This allows a site that is aware that it
//  will try to use hundreds of megabytes to declare this upfront, instead
//  of the user agent prompting the user for permission to increase the
//  quota every five megabytes."
'DEFAULT_DB_SIZE', // Defaults to (4 * 1024 * 1024) or (25 * 1024 * 1024) in Safari
// Whether to create indexes on SQLite tables (and also whether to try dropping)
'useSQLiteIndexes', // Effectively defaults to `false` (ignored unless `true`)

// NODE-IMPINGING SETTINGS (created for sake of limitations in Node or desktop file
//    system implementation but applied by default in browser for parity)

// Used when setting global shims to determine whether to try to add
//   other globals shimmed by the library (`ShimDOMException`, `ShimDOMStringList`,
//   `ShimEvent`, `ShimCustomEvent`, `ShimEventTarget`)
'addNonIDBGlobals', // Effectively defaults to `false` (ignored unless `true`)
// Used when setting global shims to determine whether to try to overwrite
//   other globals shimmed by the library (`DOMException`, `DOMStringList`,
//   `Event`, `CustomEvent`, `EventTarget`)
'replaceNonIDBGlobals', // Effectively defaults to `false` (ignored unless `true`)

// Overcoming limitations with node-sqlite3/storing database name on file systems
// https://en.wikipedia.org/wiki/Filename#Reserved_characters_and_words
// Defaults to prefixing database with `D_`, escaping
//   `databaseCharacterEscapeList`, escaping NUL, and
//   escaping upper case letters, as well as enforcing
//   `databaseNameLengthLimit`
'escapeDatabaseName', 'unescapeDatabaseName', // Not used internally; usable as a convenience method

// Defaults to global regex representing the following
//   (characters nevertheless commonly reserved in modern, Unicode-supporting
//   systems): 0x00-0x1F 0x7F " * / : < > ? \ |
'databaseCharacterEscapeList', 'databaseNameLengthLimit', // Defaults to 254 (shortest typical modern file length limit)

// Boolean defaulting to true on whether to escape NFD-escaping
//   characters to avoid clashes on MacOS which performs NFD on files
'escapeNFDForDatabaseNames',

// Boolean on whether to add the `.sqlite` extension to file names;
//   defaults to `true`
'addSQLiteExtension', ['memoryDatabase', val => {
    // Various types of in-memory databases that can auto-delete
    if (!/^(?::memory:|file::memory:(\?[^#]*)?(#.*)?)?$/.test(val)) {
        throw new TypeError('`memoryDatabase` must be the empty string, ":memory:", or a "file::memory:[?queryString][#hash] URL".');
    }
}],

// NODE-SPECIFIC CONFIG
// Boolean on whether to delete the database file itself after `deleteDatabase`;
//   defaults to `true` as the database will be empty
'deleteDatabaseFiles', 'databaseBasePath', 'sysDatabaseBasePath',

// NODE-SPECIFIC WEBSQL CONFIG
'sqlBusyTimeout', // Defaults to 1000
'sqlTrace', // Callback not used by default
'sqlProfile' // Callback not used by default
].forEach(prop => {
    let validator;
    if (Array.isArray(prop)) {
        validator = prop[1];
        prop = prop[0];
    }
    Object.defineProperty(CFG, prop, {
        get: function () {
            return map[prop];
        },
        set: function (val) {
            if (validator) {
                validator(val);
            }
            map[prop] = val;
        }
    });
});

exports.default = CFG;
module.exports = exports['default'];

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.webSQLErrback = exports.createDOMException = exports.ShimDOMException = exports.findError = exports.logError = undefined;

var _CFG = require('./CFG');

var _CFG2 = _interopRequireDefault(_CFG);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates a native DOMException, for browsers that support it
 * @returns {DOMException}
 */
function createNativeDOMException(name, message) {
    return new DOMException.prototype.constructor(message, name || 'DOMException');
} /* globals DOMException */


const codes = { // From web-platform-tests testharness.js name_code_map (though not in new spec)
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

const legacyCodes = {
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

function createNonNativeDOMExceptionClass() {
    function DOMException(message, name) {
        // const err = Error.prototype.constructor.call(this, message); // Any use to this? Won't set this.message
        this[Symbol.toStringTag] = 'DOMException';
        this._code = name in codes ? codes[name] : legacyCodes[name] || 0;
        this._name = name || 'Error';
        this._message = message === undefined ? '' : '' + message; // Not String() which converts Symbols
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
    const DummyDOMException = function DOMException() {};
    DummyDOMException.prototype = Object.create(Error.prototype); // Intended for subclassing
    ['name', 'message'].forEach(prop => {
        Object.defineProperty(DummyDOMException.prototype, prop, {
            enumerable: true,
            get: function () {
                if (!(this instanceof DOMException || this instanceof DummyDOMException || this instanceof Error)) {
                    throw new TypeError('Illegal invocation');
                }
                return this['_' + prop];
            }
        });
    });
    // DOMException uses the same `toString` as `Error`
    Object.defineProperty(DummyDOMException.prototype, 'code', {
        configurable: true,
        enumerable: true,
        get: function () {
            throw new TypeError('Illegal invocation');
        }
    });
    DOMException.prototype = new DummyDOMException();

    DOMException.prototype[Symbol.toStringTag] = 'DOMExceptionPrototype';
    Object.defineProperty(DOMException, 'prototype', {
        writable: false
    });

    Object.keys(codes).forEach(codeName => {
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
    Object.keys(legacyCodes).forEach(codeName => {
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

const ShimNonNativeDOMException = createNonNativeDOMExceptionClass();

/**
 * Creates a generic Error object
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
 */
function logError(name, message, error) {
    if (_CFG2.default.DEBUG) {
        if (error && error.message) {
            error = error.message;
        }

        const method = typeof console.error === 'function' ? 'error' : 'log';
        console[method](name + ': ' + message + '. ' + (error || ''));
        console.trace && console.trace();
    }
}

function isErrorOrDOMErrorOrDOMException(obj) {
    return obj && typeof obj === 'object' && // We don't use util.isObj here as mutual dependency causing problems in Babel with browser
    typeof obj.name === 'string';
}

/**
 * Finds the error argument.  This is useful because some WebSQL callbacks
 * pass the error as the first argument, and some pass it as the second argument.
 * @param {array} args
 * @returns {Error|DOMException|undefined}
 */
function findError(args) {
    let err;
    if (args) {
        if (args.length === 1) {
            return args[0];
        }
        for (let i = 0; i < args.length; i++) {
            const arg = args[i];
            if (isErrorOrDOMErrorOrDOMException(arg)) {
                return arg;
            }
            if (arg && typeof arg.message === 'string') {
                err = arg;
            }
        }
    }
    return err;
}

function webSQLErrback(webSQLErr) {
    let name, message;
    switch (webSQLErr.code) {
        case 4:
            {
                // SQLError.QUOTA_ERR
                name = 'QuotaExceededError';
                message = 'The operation failed because there was not enough remaining storage space, or the storage quota was reached and the user declined to give more space to the database.';
                break;
            }
        /*
        // Should a WebSQL timeout treat as IndexedDB `TransactionInactiveError` or `UnknownError`?
        case 7: { // SQLError.TIMEOUT_ERR
            // All transaction errors abort later, so no need to mark inactive
            name = 'TransactionInactiveError';
            message = 'A request was placed against a transaction which is currently not active, or which is finished (Internal SQL Timeout).';
            break;
        }
        */
        default:
            {
                name = 'UnknownError';
                message = 'The operation failed for reasons unrelated to the database itself and not covered by any other errors.';
                break;
            }
    }
    message += ' (' + webSQLErr.message + ')--(' + webSQLErr.code + ')';
    const err = createDOMException(name, message);
    err.sqlError = webSQLErr;
    return err;
}

let test,
    useNativeDOMException = false;

// Test whether we can use the browser's native DOMException class
try {
    test = createNativeDOMException('test name', 'test message');
    if (isErrorOrDOMErrorOrDOMException(test) && test.name === 'test name' && test.message === 'test message') {
        // Native DOMException works as expected
        useNativeDOMException = true;
    }
} catch (e) {}

let createDOMException, ShimDOMException;
if (useNativeDOMException) {
    exports.ShimDOMException = ShimDOMException = DOMException;
    exports.createDOMException = createDOMException = function (name, message, error) {
        logError(name, message, error);
        return createNativeDOMException(name, message);
    };
} else {
    exports.ShimDOMException = ShimDOMException = ShimNonNativeDOMException;
    exports.createDOMException = createDOMException = function (name, message, error) {
        logError(name, message, error);
        return createNonNativeDOMException(name, message);
    };
}

exports.logError = logError;
exports.findError = findError;
exports.ShimDOMException = ShimDOMException;
exports.createDOMException = createDOMException;
exports.webSQLErrback = webSQLErrback;

},{"./CFG":2}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.possiblyUpdateKeyGenerator = exports.generateKeyForStore = exports.assignCurrentNumber = exports.findMultiEntryMatches = exports.isKeyInRange = exports.isMultiEntryMatch = exports.checkKeyCouldBeInjectedIntoValue = exports.injectKeyIntoValueUsingKeyPath = exports.extractKeyValueDecodedFromValueUsingKeyPath = exports.evaluateKeyPathOnValue = exports.extractKeyFromValueUsingKeyPath = exports.convertValueToKeyRethrowingAndIfInvalid = exports.convertValueToMultiEntryKey = exports.convertValueToKey = exports.convertValueToMultiEntryKeyDecoded = exports.convertValueToKeyValueDecoded = exports.convertKeyToValue = exports.roundTrip = exports.decode = exports.encode = undefined;

var _DOMException = require('./DOMException');

var _util = require('./util');

var util = _interopRequireWildcard(_util);

var _cmp = require('./cmp');

var _cmp2 = _interopRequireDefault(_cmp);

var _CFG = require('./CFG');

var _CFG2 = _interopRequireDefault(_CFG);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * Encodes the keys based on their types. This is required to maintain collations
 * We leave space for future keys
 */
const keyTypeToEncodedChar = {
    invalid: 100,
    number: 200,
    date: 300,
    string: 400,
    binary: 500,
    array: 600
};
const keyTypes = Object.keys(keyTypeToEncodedChar);
keyTypes.forEach(k => {
    keyTypeToEncodedChar[k] = String.fromCharCode(keyTypeToEncodedChar[k]);
});

const encodedCharToKeyType = keyTypes.reduce((o, k) => {
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
const signValues = ['negativeInfinity', 'bigNegative', 'smallNegative', 'smallPositive', 'bigPositive', 'positiveInfinity'];

const types = {
    invalid: {
        encode: function (key) {
            return keyTypeToEncodedChar.invalid + '-';
        },
        decode: function (key) {
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
        encode: function (key) {
            let key32 = key === Number.MIN_VALUE
            // Mocha test `IDBFactory/cmp-spec.js` exposed problem for some
            //   Node (and Chrome) versions with `Number.MIN_VALUE` being treated
            //   as 0
            // https://stackoverflow.com/questions/43305403/number-min-value-and-tostring
            ? '0.' + '0'.repeat(214) + '2' : Math.abs(key).toString(32);
            // Get the index of the decimal.
            const decimalIndex = key32.indexOf('.');
            // Remove the decimal.
            key32 = decimalIndex !== -1 ? key32.replace('.', '') : key32;
            // Get the index of the first significant digit.
            const significantDigitIndex = key32.search(/[^0]/);
            // Truncate leading zeros.
            key32 = key32.slice(significantDigitIndex);
            let sign, exponent, mantissa;

            // Finite cases:
            if (isFinite(key)) {
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
                } else {
                    // Negative exponent case:
                    if (key < 1) {
                        sign = signValues.indexOf('smallPositive');
                        exponent = flipBase32(padBase32Exponent(significantDigitIndex));
                        mantissa = padBase32Mantissa(key32);
                        // Non-negative exponent case:
                    } else {
                        sign = signValues.indexOf('bigPositive');
                        exponent = padBase32Exponent(decimalIndex !== -1 ? decimalIndex : key32.length);
                        mantissa = padBase32Mantissa(key32);
                    }
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
        decode: function (key) {
            const sign = +key.substr(2, 1);
            let exponent = key.substr(3, 2);
            let mantissa = key.substr(5, 11);

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
        encode: function (key, inArray) {
            if (inArray) {
                // prepend each character with a dash, and append a space to the end
                key = key.replace(/(.)/g, '-$1') + ' ';
            }
            return keyTypeToEncodedChar.string + '-' + key;
        },
        decode: function (key, inArray) {
            key = key.slice(2);
            if (inArray) {
                // remove the space at the end, and the dash before each character
                key = key.substr(0, key.length - 1).replace(/-(.)/g, '$1');
            }
            return key;
        }
    },

    // Arrays are encoded as JSON strings.
    // An extra, value is added to each array during encoding to make empty arrays sort correctly.
    array: {
        encode: function (key) {
            const encoded = [];
            for (let i = 0; i < key.length; i++) {
                const item = key[i];
                const encodedItem = encode(item, true); // encode the array item
                encoded[i] = encodedItem;
            }
            encoded.push(keyTypeToEncodedChar.invalid + '-'); // append an extra item, so empty arrays sort correctly
            return keyTypeToEncodedChar.array + '-' + JSON.stringify(encoded);
        },
        decode: function (key) {
            const decoded = JSON.parse(key.slice(2));
            decoded.pop(); // remove the extra item
            for (let i = 0; i < decoded.length; i++) {
                const item = decoded[i];
                const decodedItem = decode(item, true); // decode the item
                decoded[i] = decodedItem;
            }
            return decoded;
        }
    },

    // Dates are encoded as ISO 8601 strings, in UTC time zone.
    date: {
        encode: function (key) {
            return keyTypeToEncodedChar.date + '-' + key.toJSON();
        },
        decode: function (key) {
            return new Date(key.slice(2));
        }
    },
    binary: { // `ArrayBuffer`/Views on buffers (`TypedArray` or `DataView`)
        encode: function (key) {
            return keyTypeToEncodedChar.binary + '-' + (key.byteLength ? [...getCopyBytesHeldByBufferSource(key)].map(b => util.padStart(b, 3, '0')) // e.g., '255,005,254,000,001,033'
            : '');
        },
        decode: function (key) {
            // Set the entries in buffer's [[ArrayBufferData]] to those in `value`
            const k = key.slice(2);
            const arr = k.length ? k.split(',').map(s => parseInt(s, 10)) : [];
            const buffer = new ArrayBuffer(arr.length);
            const uint8 = new Uint8Array(buffer);
            uint8.set(arr);
            return buffer;
        }
    }
};

/**
 * Return a padded base-32 exponent value.
 * @param {number}
 * @return {string}
 */
function padBase32Exponent(n) {
    n = n.toString(32);
    return n.length === 1 ? '0' + n : n;
}

/**
 * Return a padded base-32 mantissa.
 * @param {string}
 * @return {string}
 */
function padBase32Mantissa(s) {
    return (s + zeros(11)).slice(0, 11);
}

/**
 * Flips each digit of a base-32 encoded string.
 * @param {string} encoded
 */
function flipBase32(encoded) {
    let flipped = '';
    for (let i = 0; i < encoded.length; i++) {
        flipped += (31 - parseInt(encoded[i], 32)).toString(32);
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
 * @param {string}
 * @param {string}
 * @return {number}
 */
function pow32(mantissa, exponent) {
    exponent = parseInt(exponent, 32);
    if (exponent < 0) {
        return roundToPrecision(parseInt(mantissa, 32) * Math.pow(32, exponent - 10));
    } else {
        if (exponent < 11) {
            let whole = mantissa.slice(0, exponent);
            whole = parseInt(whole, 32);
            let fraction = mantissa.slice(exponent);
            fraction = parseInt(fraction, 32) * Math.pow(32, exponent - 11);
            return roundToPrecision(whole + fraction);
        } else {
            const expansion = mantissa + zeros(exponent - 11);
            return parseInt(expansion, 32);
        }
    }
}

/**
 *
 */
function roundToPrecision(num, precision) {
    precision = precision || 16;
    return parseFloat(num.toPrecision(precision));
}

/**
 * Returns a string of n zeros.
 * @param {number}
 * @return {string}
 */
function zeros(n) {
    return '0'.repeat(n);
}

/**
 * Negates numeric strings.
 * @param {string}
 * @return {string}
 */
function negate(s) {
    return '-' + s;
}

/**
 * Returns the string "number", "date", "string", "binary", or "array"
 */
function getKeyType(key) {
    if (Array.isArray(key)) return 'array';
    if (util.isDate(key)) return 'date';
    if (util.isBinary(key)) return 'binary';
    const keyType = typeof key;
    return ['string', 'number'].includes(keyType) ? keyType : 'invalid';
}

/**
 * Keys must be strings, numbers (besides NaN), Dates (if value is not NaN),
 *   binary objects or Arrays
 * @param input The key input
 * @param seen An array of already seen keys
 */
function convertValueToKey(input, seen) {
    return convertValueToKeyValueDecoded(input, seen, false, true);
}

/**
* Currently not in use
*/
function convertValueToMultiEntryKey(input) {
    return convertValueToKeyValueDecoded(input, null, true, true);
}

// https://heycam.github.io/webidl/#ref-for-dfn-get-buffer-source-copy-2
function getCopyBytesHeldByBufferSource(O) {
    let offset = 0;
    let length = 0;
    if (ArrayBuffer.isView(O)) {
        // Has [[ViewedArrayBuffer]] internal slot
        const arrayBuffer = O.buffer;
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
    return new Uint8Array(O.buffer || O, offset, length);
}

/**
* Shortcut utility to avoid returning full keys from `convertValueToKey`
*   and subsequent need to process in calling code unless `fullKeys` is
*   set; may throw
*/
function convertValueToKeyValueDecoded(input, seen, multiEntry, fullKeys) {
    seen = seen || [];
    if (seen.includes(input)) return { type: 'array', invalid: true, message: 'An array key cannot be circular' };
    const type = getKeyType(input);
    const ret = { type, value: input };
    switch (type) {
        case 'number':
            {
                if (Number.isNaN(input)) {
                    return { type: 'NaN', invalid: true }; // List as 'NaN' type for convenience of consumers in reporting errors
                }
                return ret;
            }case 'string':
            {
                return ret;
            }case 'binary':
            {
                // May throw (if detached)
                // Get a copy of the bytes held by the buffer source
                // https://heycam.github.io/webidl/#ref-for-dfn-get-buffer-source-copy-2
                const octets = getCopyBytesHeldByBufferSource(input);
                return { type: 'binary', value: octets };
            }case 'array':
            {
                // May throw (from binary)
                const len = input.length;
                seen.push(input);
                const keys = [];
                for (let i = 0; i < len; i++) {
                    // We cannot iterate here with array extras as we must ensure sparse arrays are invalidated
                    if (!multiEntry && !Object.prototype.hasOwnProperty.call(input, i)) {
                        return { type, invalid: true, message: 'Does not have own index property' };
                    }
                    try {
                        const entry = input[i];
                        const key = convertValueToKeyValueDecoded(entry, seen, false, fullKeys); // Though steps do not list rethrowing, the next is returnifabrupt when not multiEntry
                        if (key.invalid) {
                            if (multiEntry) {
                                continue;
                            }
                            return { type, invalid: true, message: 'Bad array entry value-to-key conversion' };
                        }
                        if (!multiEntry || !fullKeys && keys.every(k => (0, _cmp2.default)(k, key.value) !== 0) || fullKeys && keys.every(k => (0, _cmp2.default)(k, key) !== 0)) {
                            keys.push(fullKeys ? key : key.value);
                        }
                    } catch (err) {
                        if (!multiEntry) {
                            throw err;
                        }
                    }
                }
                return { type, value: keys };
            }case 'date':
            {
                if (!Number.isNaN(input.getTime())) {
                    return fullKeys ? { type, value: input.getTime() } : { type, value: new Date(input.getTime()) };
                }
                return { type, invalid: true, message: 'Not a valid date' };
                // Falls through
            }case 'invalid':default:
            {
                // Other `typeof` types which are not valid keys:
                //    'undefined', 'boolean', 'object' (including `null`), 'symbol', 'function
                const type = input === null ? 'null' : typeof input; // Convert `null` for convenience of consumers in reporting errors
                return { type, invalid: true, message: 'Not a valid key; type ' + type };
            }
    }
}
function convertValueToMultiEntryKeyDecoded(key, fullKeys) {
    return convertValueToKeyValueDecoded(key, null, true, fullKeys);
}

/**
* An internal utility
*/
function convertValueToKeyRethrowingAndIfInvalid(input, seen) {
    const key = convertValueToKey(input, seen);
    if (key.invalid) {
        throw (0, _DOMException.createDOMException)('DataError', key.message || 'Not a valid key; type: ' + key.type);
    }
    return key;
}

function extractKeyFromValueUsingKeyPath(value, keyPath, multiEntry) {
    return extractKeyValueDecodedFromValueUsingKeyPath(value, keyPath, multiEntry, true);
}
/**
* Not currently in use
*/
function evaluateKeyPathOnValue(value, keyPath, multiEntry) {
    return evaluateKeyPathOnValueToDecodedValue(value, keyPath, multiEntry, true);
}

/**
* May throw, return `{failure: true}` (e.g., non-object on keyPath resolution)
*    or `{invalid: true}` (e.g., `NaN`)
*/
function extractKeyValueDecodedFromValueUsingKeyPath(value, keyPath, multiEntry, fullKeys) {
    const r = evaluateKeyPathOnValueToDecodedValue(value, keyPath, multiEntry, fullKeys);
    if (r.failure) {
        return r;
    }
    if (!multiEntry) {
        return convertValueToKeyValueDecoded(r.value, null, false, fullKeys);
    }
    return convertValueToMultiEntryKeyDecoded(r.value, fullKeys);
}

/**
 * Returns the value of an inline key based on a key path (wrapped in an object with key `value`)
 *   or `{failure: true}`
 * @param {object} value
 * @param {string|array} keyPath
 * @param {boolean} multiEntry
 * @returns {undefined|array|string}
 */
function evaluateKeyPathOnValueToDecodedValue(value, keyPath, multiEntry, fullKeys) {
    if (Array.isArray(keyPath)) {
        const result = [];
        return keyPath.some(item => {
            const key = evaluateKeyPathOnValueToDecodedValue(value, item, multiEntry, fullKeys);
            if (key.failure) {
                return true;
            }
            result.push(key.value);
        }, []) ? { failure: true } : { value: result };
    }
    if (keyPath === '') {
        return { value };
    }
    const identifiers = keyPath.split('.');
    return identifiers.some((idntfr, i) => {
        if (idntfr === 'length' && (typeof value === 'string' || Array.isArray(value))) {
            value = value.length;
        } else if (util.isBlob(value)) {
            switch (idntfr) {
                case 'size':case 'type':
                    value = value[idntfr];
                    break;
            }
        } else if (util.isFile(value)) {
            switch (idntfr) {
                case 'name':case 'lastModified':
                    value = value[idntfr];
                    break;
                case 'lastModifiedDate':
                    value = new Date(value.lastModified);
                    break;
            }
        } else if (!util.isObj(value) || !Object.prototype.hasOwnProperty.call(value, idntfr)) {
            return true;
        } else {
            value = value[idntfr];
            return value === undefined;
        }
    }) ? { failure: true } : { value };
}

/**
 * Sets the inline key value
 * @param {object} value
 * @param {*} key
 * @param {string} keyPath
 */
function injectKeyIntoValueUsingKeyPath(value, key, keyPath) {
    const identifiers = keyPath.split('.');
    const last = identifiers.pop();
    for (let i = 0; i < identifiers.length; i++) {
        const identifier = identifiers[i];
        const hop = Object.prototype.hasOwnProperty.call(value, identifier);
        if (!hop) {
            value[identifier] = {};
        }
        value = value[identifier];
    }
    value[last] = key; // key is already a `keyValue` in our processing so no need to convert
}

// See https://github.com/w3c/IndexedDB/pull/146
function checkKeyCouldBeInjectedIntoValue(value, keyPath) {
    const identifiers = keyPath.split('.');
    identifiers.pop();
    for (let i = 0; i < identifiers.length; i++) {
        if (!util.isObj(value)) {
            return false;
        }
        const identifier = identifiers[i];
        const hop = Object.prototype.hasOwnProperty.call(value, identifier);
        if (!hop) {
            return true;
        }
        value = value[identifier];
    }
    return util.isObj(value);
}

function isKeyInRange(key, range, checkCached) {
    let lowerMatch = range.lower === undefined;
    let upperMatch = range.upper === undefined;
    const encodedKey = encode(key, true);
    const lower = checkCached ? range.__lowerCached : encode(range.lower, true);
    const upper = checkCached ? range.__upperCached : encode(range.upper, true);

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
    const keyType = encodedCharToKeyType[encodedKey.slice(0, 1)];

    if (keyType === 'array') {
        return encodedKey.indexOf(encodedEntry) > 1;
    } else {
        return encodedKey === encodedEntry;
    }
}

function findMultiEntryMatches(keyEntry, range) {
    const matches = [];

    if (Array.isArray(keyEntry)) {
        for (let i = 0; i < keyEntry.length; i++) {
            let key = keyEntry[i];

            if (Array.isArray(key)) {
                if (range && range.lower === range.upper) {
                    continue;
                }
                if (key.length === 1) {
                    key = key[0];
                } else {
                    const nested = findMultiEntryMatches(key, range);
                    if (nested.length > 0) {
                        matches.push(key);
                    }
                    continue;
                }
            }

            if (range == null || isKeyInRange(key, range, true)) {
                matches.push(key);
            }
        }
    } else {
        if (range == null || isKeyInRange(keyEntry, range, true)) {
            matches.push(keyEntry);
        }
    }
    return matches;
}

/**
* Not currently in use but keeping for spec parity
*/
function convertKeyToValue(key) {
    const type = key.type;
    const value = key.value;
    switch (type) {
        case 'number':case 'string':
            {
                return value;
            }case 'array':
            {
                const array = [];
                const len = value.length;
                let index = 0;
                while (index < len) {
                    const entry = convertKeyToValue(value[index]);
                    array[index] = entry;
                    index++;
                }
                return array;
            }case 'date':
            {
                return new Date(value);
            }case 'binary':
            {
                const len = value.length;
                const buffer = new ArrayBuffer(len);
                // Set the entries in buffer's [[ArrayBufferData]] to those in `value`
                const uint8 = new Uint8Array(buffer, value.byteOffset || 0, value.byteLength);
                uint8.set(value);
                return buffer;
            }case 'invalid':default:
            throw new Error('Bad key');
    }
}

function encode(key, inArray) {
    // Bad keys like `null`, `object`, `boolean`, 'function', 'symbol' should not be passed here due to prior validation
    if (key === undefined) {
        return null;
    }
    // array, date, number, string, binary (should already have detected "invalid")
    return types[getKeyType(key)].encode(key, inArray);
}
function decode(key, inArray) {
    if (typeof key !== 'string') {
        return undefined;
    }
    return types[encodedCharToKeyType[key.slice(0, 1)]].decode(key, inArray);
}

function roundTrip(key, inArray) {
    return decode(encode(key, inArray), inArray);
}

const MAX_ALLOWED_CURRENT_NUMBER = 9007199254740992; // 2 ^ 53 (Also equal to `Number.MAX_SAFE_INTEGER + 1`)

function getCurrentNumber(tx, store, callback, sqlFailCb) {
    tx.executeSql('SELECT "currNum" FROM __sys__ WHERE "name" = ?', [util.escapeSQLiteStatement(store.__currentName)], function (tx, data) {
        if (data.rows.length !== 1) {
            callback(1); // eslint-disable-line standard/no-callback-literal
        } else {
            callback(data.rows.item(0).currNum);
        }
    }, function (tx, error) {
        sqlFailCb((0, _DOMException.createDOMException)('DataError', 'Could not get the auto increment value for key', error));
    });
}

function assignCurrentNumber(tx, store, num, successCb, failCb) {
    const sql = 'UPDATE __sys__ SET "currNum" = ? WHERE "name" = ?';
    const sqlValues = [num, util.escapeSQLiteStatement(store.__currentName)];
    _CFG2.default.DEBUG && console.log(sql, sqlValues);
    tx.executeSql(sql, sqlValues, function (tx, data) {
        successCb(num);
    }, function (tx, err) {
        failCb((0, _DOMException.createDOMException)('UnknownError', 'Could not set the auto increment value for key', err));
    });
}

// Bump up the auto-inc counter if the key path-resolved value is valid (greater than old value and >=1) OR
//  if a manually passed in key is valid (numeric and >= 1) and >= any primaryKey
function setCurrentNumber(tx, store, num, successCb, failCb) {
    num = num === MAX_ALLOWED_CURRENT_NUMBER ? num + 2 // Since incrementing by one will have no effect in JavaScript on this unsafe max, we represent the max as a number incremented by two. The getting of the current number is never returned to the user and is only used in safe comparisons, so it is safe for us to represent it in this manner
    : num + 1;
    return assignCurrentNumber(tx, store, num, successCb, failCb);
}

function generateKeyForStore(tx, store, cb, sqlFailCb) {
    getCurrentNumber(tx, store, function (key) {
        if (key > MAX_ALLOWED_CURRENT_NUMBER) {
            // 2 ^ 53 (See <https://github.com/w3c/IndexedDB/issues/147>)
            return cb('failure'); // eslint-disable-line standard/no-callback-literal
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
            const value = Math.floor(Math.min(key, MAX_ALLOWED_CURRENT_NUMBER));
            const useNewKeyForAutoInc = value >= cn;
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

/* eslint-disable object-property-newline */
exports.encode = encode;
exports.decode = decode;
exports.roundTrip = roundTrip;
exports.convertKeyToValue = convertKeyToValue;
exports.convertValueToKeyValueDecoded = convertValueToKeyValueDecoded;
exports.convertValueToMultiEntryKeyDecoded = convertValueToMultiEntryKeyDecoded;
exports.convertValueToKey = convertValueToKey;
exports.convertValueToMultiEntryKey = convertValueToMultiEntryKey;
exports.convertValueToKeyRethrowingAndIfInvalid = convertValueToKeyRethrowingAndIfInvalid;
exports.extractKeyFromValueUsingKeyPath = extractKeyFromValueUsingKeyPath;
exports.evaluateKeyPathOnValue = evaluateKeyPathOnValue;
exports.extractKeyValueDecodedFromValueUsingKeyPath = extractKeyValueDecodedFromValueUsingKeyPath;
exports.injectKeyIntoValueUsingKeyPath = injectKeyIntoValueUsingKeyPath;
exports.checkKeyCouldBeInjectedIntoValue = checkKeyCouldBeInjectedIntoValue;
exports.isMultiEntryMatch = isMultiEntryMatch;
exports.isKeyInRange = isKeyInRange;
exports.findMultiEntryMatches = findMultiEntryMatches;
exports.assignCurrentNumber = assignCurrentNumber;
exports.generateKeyForStore = generateKeyForStore;
exports.possiblyUpdateKeyGenerator = possiblyUpdateKeyGenerator;

},{"./CFG":2,"./DOMException":3,"./cmp":5,"./util":6}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _CFG = require('./CFG');

var _CFG2 = _interopRequireDefault(_CFG);

var _Key = require('./Key');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Compares two keys
 * @param key1
 * @param key2
 * @returns {number}
 */
function cmp(first, second) {
    const encodedKey1 = (0, _Key.encode)(first);
    const encodedKey2 = (0, _Key.encode)(second);
    const result = encodedKey1 > encodedKey2 ? 1 : encodedKey1 === encodedKey2 ? 0 : -1;

    if (_CFG2.default.DEBUG) {
        // verify that the keys encoded correctly
        let decodedKey1 = (0, _Key.decode)(encodedKey1);
        let decodedKey2 = (0, _Key.decode)(encodedKey2);
        if (typeof first === 'object') {
            first = JSON.stringify(first);
            decodedKey1 = JSON.stringify(decodedKey1);
        }
        if (typeof second === 'object') {
            second = JSON.stringify(second);
            decodedKey2 = JSON.stringify(decodedKey2);
        }

        // encoding/decoding mismatches are usually due to a loss of floating-point precision
        if (decodedKey1 !== first) {
            console.warn(first + ' was incorrectly encoded as ' + decodedKey1);
        }
        if (decodedKey2 !== second) {
            console.warn(second + ' was incorrectly encoded as ' + decodedKey2);
        }
    }

    return result;
}

exports.default = cmp;
module.exports = exports['default'];

},{"./CFG":2,"./Key":4}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.padStart = exports.convertToSequenceDOMString = exports.convertToDOMString = exports.enforceRange = exports.isValidKeyPath = exports.defineReadonlyProperties = exports.isIterable = exports.isBinary = exports.isFile = exports.isRegExp = exports.isBlob = exports.isDate = exports.isObj = exports.instanceOf = exports.sqlQuote = exports.sqlLIKEEscape = exports.escapeIndexNameForSQLKeyColumn = exports.escapeIndexNameForSQL = exports.escapeStoreNameForSQL = exports.unescapeDatabaseNameForSQLAndFiles = exports.escapeDatabaseNameForSQLAndFiles = exports.unescapeSQLiteResponse = exports.escapeSQLiteStatement = undefined;

var _CFG = require('./CFG');

var _CFG2 = _interopRequireDefault(_CFG);

var _regex = require('unicode-9.0.0/Binary_Property/Expands_On_NFD/regex');

var _regex2 = _interopRequireDefault(_regex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function escapeUnmatchedSurrogates(arg) {
    // http://stackoverflow.com/a/6701665/271577
    return arg.replace(/([\uD800-\uDBFF])(?![\uDC00-\uDFFF])|(^|[^\uD800-\uDBFF])([\uDC00-\uDFFF])/g, function (_, unmatchedHighSurrogate, precedingLow, unmatchedLowSurrogate) {
        // Could add a corresponding surrogate for compatibility with `node-sqlite3`: http://bugs.python.org/issue12569 and http://stackoverflow.com/a/6701665/271577
        //   but Chrome having problems
        if (unmatchedHighSurrogate) {
            return '^2' + padStart(unmatchedHighSurrogate.charCodeAt().toString(16), 4, '0');
        }
        return (precedingLow || '') + '^3' + padStart(unmatchedLowSurrogate.charCodeAt().toString(16), 4, '0');
    });
}

function escapeNameForSQLiteIdentifier(arg) {
    // http://stackoverflow.com/a/6701665/271577
    return '_' + // Prevent empty string
    escapeUnmatchedSurrogates(arg.replace(/\^/g, '^^') // Escape our escape
    // http://www.sqlite.org/src/tktview?name=57c971fc74
    .replace(/\0/g, '^0')
    // We need to avoid identifiers being treated as duplicates based on SQLite's ASCII-only case-insensitive table and column names
    // (For SQL in general, however, see http://stackoverflow.com/a/17215009/271577
    // See also https://www.sqlite.org/faq.html#q18 re: Unicode (non-ASCII) case-insensitive not working
    .replace(/([A-Z])/g, '^$1'));
}

// The escaping of unmatched surrogates was needed by Chrome but not Node
function escapeSQLiteStatement(arg) {
    return escapeUnmatchedSurrogates(arg.replace(/\^/g, '^^').replace(/\0/g, '^0'));
}
function unescapeSQLiteResponse(arg) {
    return unescapeUnmatchedSurrogates(arg).replace(/\^0/g, '\0').replace(/\^\^/g, '^');
}

function sqlEscape(arg) {
    // https://www.sqlite.org/lang_keywords.html
    // http://stackoverflow.com/a/6701665/271577
    // There is no need to escape ', `, or [], as
    //   we should always be within double quotes
    // NUL should have already been stripped
    return arg.replace(/"/g, '""');
}

function sqlQuote(arg) {
    return '"' + sqlEscape(arg) + '"';
}

function escapeDatabaseNameForSQLAndFiles(db) {
    if (_CFG2.default.escapeDatabaseName) {
        // We at least ensure NUL is escaped by default, but we need to still
        //   handle empty string and possibly also length (potentially
        //   throwing if too long), escaping casing (including Unicode?),
        //   and escaping special characters depending on file system
        return _CFG2.default.escapeDatabaseName(escapeSQLiteStatement(db));
    }
    db = 'D' + escapeNameForSQLiteIdentifier(db);
    if (_CFG2.default.escapeNFDForDatabaseNames !== false) {
        // ES6 copying of regex with different flags
        db = db.replace(new RegExp(_regex2.default, 'g'), function (expandable) {
            return '^4' + padStart(expandable.codePointAt().toString(16), 6, '0');
        });
    }
    if (_CFG2.default.databaseCharacterEscapeList !== false) {
        db = db.replace(_CFG2.default.databaseCharacterEscapeList ? new RegExp(_CFG2.default.databaseCharacterEscapeList, 'g') : /[\u0000-\u001F\u007F"*/:<>?\\|]/g, function (n0) {
            return '^1' + padStart(n0.charCodeAt().toString(16), 2, '0');
        });
    }
    if (_CFG2.default.databaseNameLengthLimit !== false && db.length >= (_CFG2.default.databaseNameLengthLimit || 254) - (_CFG2.default.addSQLiteExtension !== false ? 7 /* '.sqlite'.length */ : 0)) {
        throw new Error('Unexpectedly long database name supplied; length limit required for Node compatibility; passed length: ' + db.length + '; length limit setting: ' + (_CFG2.default.databaseNameLengthLimit || 254) + '.');
    }
    return db + (_CFG2.default.addSQLiteExtension !== false ? '.sqlite' : ''); // Shouldn't have quoting (do we even need NUL/case escaping here?)
}

function unescapeUnmatchedSurrogates(arg) {
    return arg.replace(/(\^+)3(d[0-9a-f]{3})/g, (_, esc, lowSurr) => esc.length % 2 ? String.fromCharCode(parseInt(lowSurr, 16)) : _).replace(/(\^+)2(d[0-9a-f]{3})/g, (_, esc, highSurr) => esc.length % 2 ? String.fromCharCode(parseInt(highSurr, 16)) : _);
}

// Not in use internally but supplied for convenience
function unescapeDatabaseNameForSQLAndFiles(db) {
    if (_CFG2.default.unescapeDatabaseName) {
        // We at least ensure NUL is unescaped by default, but we need to still
        //   handle empty string and possibly also length (potentially
        //   throwing if too long), unescaping casing (including Unicode?),
        //   and unescaping special characters depending on file system
        return _CFG2.default.unescapeDatabaseName(unescapeSQLiteResponse(db));
    }

    return unescapeUnmatchedSurrogates(db.slice(2) // D_
    // CFG.databaseCharacterEscapeList
    .replace(/(\^+)1([0-9a-f]{2})/g, (_, esc, hex) => esc.length % 2 ? String.fromCharCode(parseInt(hex, 16)) : _)
    // CFG.escapeNFDForDatabaseNames
    .replace(/(\^+)4([0-9a-f]{6})/g, (_, esc, hex) => esc.length % 2 ? String.fromCodePoint(parseInt(hex, 16)) : _))
    // escapeNameForSQLiteIdentifier (including unescapeUnmatchedSurrogates() above)
    .replace(/(\^+)([A-Z])/g, (_, esc, upperCase) => esc.length % 2 ? upperCase : _).replace(/(\^+)0/g, (_, esc) => esc.length % 2 ? '\0' : _).replace(/\^\^/g, '^');
}

function escapeStoreNameForSQL(store) {
    return sqlQuote('S' + escapeNameForSQLiteIdentifier(store));
}

function escapeIndexNameForSQL(index) {
    return sqlQuote('I' + escapeNameForSQLiteIdentifier(index));
}

function escapeIndexNameForSQLKeyColumn(index) {
    return 'I' + escapeNameForSQLiteIdentifier(index);
}

function sqlLIKEEscape(str) {
    // https://www.sqlite.org/lang_expr.html#like
    return sqlEscape(str).replace(/\^/g, '^^');
}

// Babel doesn't seem to provide a means of using the `instanceof` operator with Symbol.hasInstance (yet?)
function instanceOf(obj, Clss) {
    return Clss[Symbol.hasInstance](obj);
}

function isObj(obj) {
    return obj && typeof obj === 'object';
}

function isDate(obj) {
    return isObj(obj) && typeof obj.getDate === 'function';
}

function isBlob(obj) {
    return isObj(obj) && typeof obj.size === 'number' && typeof obj.slice === 'function' && !('lastModified' in obj);
}

function isRegExp(obj) {
    return isObj(obj) && typeof obj.flags === 'string' && typeof obj.exec === 'function';
}

function isFile(obj) {
    return isObj(obj) && typeof obj.name === 'string' && typeof obj.slice === 'function' && 'lastModified' in obj;
}

function isBinary(obj) {
    return isObj(obj) && typeof obj.byteLength === 'number' && (typeof obj.slice === 'function' || // `TypedArray` (view on buffer) or `ArrayBuffer`
    typeof obj.getFloat64 === 'function' // `DataView` (view on buffer)
    );
}

function isIterable(obj) {
    return isObj(obj) && typeof obj[Symbol.iterator] === 'function';
}

function defineReadonlyProperties(obj, props) {
    props = typeof props === 'string' ? [props] : props;
    props.forEach(function (prop) {
        Object.defineProperty(obj, '__' + prop, {
            enumerable: false,
            configurable: false,
            writable: true
        });
        Object.defineProperty(obj, prop, {
            enumerable: true,
            configurable: true,
            get: function () {
                return this['__' + prop];
            }
        });
    });
}

function isIdentifier(item) {
    // For load-time and run-time performance, we don't provide the complete regular
    //   expression for identifiers, but these can be passed in, using the expressions
    //   found at https://gist.github.com/brettz9/b4cd6821d990daa023b2e604de371407
    // ID_Start (includes Other_ID_Start)
    const UnicodeIDStart = _CFG2.default.UnicodeIDStart || '[$A-Z_a-z]';
    // ID_Continue (includes Other_ID_Continue)
    const UnicodeIDContinue = _CFG2.default.UnicodeIDContinue || '[$0-9A-Z_a-z]';
    const IdentifierStart = '(?:' + UnicodeIDStart + '|[$_])';
    const IdentifierPart = '(?:' + UnicodeIDContinue + '|[$_\u200C\u200D])';
    return new RegExp('^' + IdentifierStart + IdentifierPart + '*$').test(item);
}

function isValidKeyPathString(keyPathString) {
    return typeof keyPathString === 'string' && (keyPathString === '' || isIdentifier(keyPathString) || keyPathString.split('.').every(isIdentifier));
}

function isValidKeyPath(keyPath) {
    return isValidKeyPathString(keyPath) || Array.isArray(keyPath) && keyPath.length &&
    // Convert array from sparse to dense http://www.2ality.com/2012/06/dense-arrays.html
    Array.apply(null, keyPath).every(function (kpp) {
        // See also https://heycam.github.io/webidl/#idl-DOMString
        return isValidKeyPathString(kpp); // Should already be converted to string by here
    });
}

function enforceRange(number, type) {
    number = Math.floor(Number(number));
    let max, min;
    switch (type) {
        case 'unsigned long long':
            {
                max = 0x1FFFFFFFFFFFFF; // 2^53 - 1
                min = 0;
                break;
            }
        case 'unsigned long':
            {
                max = 0xFFFFFFFF; // 2^32 - 1
                min = 0;
                break;
            }
        default:
            throw new Error('Unrecognized type supplied to enforceRange');
    }
    if (isNaN(number) || !isFinite(number) || number > max || number < min) {
        throw new TypeError('Invalid range: ' + number);
    }
    return number;
}

function convertToDOMString(v, treatNullAs) {
    return v === null && treatNullAs ? '' : ToString(v);
}

function ToString(o) {
    // Todo: See `es-abstract/es7`
    return '' + o; // `String()` will not throw with Symbols
}

function convertToSequenceDOMString(val) {
    // Per <https://heycam.github.io/webidl/#idl-sequence>, converting to a sequence works with iterables
    if (isIterable(val)) {
        // We don't want conversion to array to convert primitives
        // Per <https://heycam.github.io/webidl/#es-DOMString>, converting to a `DOMString` to be via `ToString`: https://tc39.github.io/ecma262/#sec-tostring
        return [...val].map(ToString);
    }
    return ToString(val);
}

// Todo: Replace with `String.prototype.padStart` when targeting supporting Node version
function padStart(str, ct, fill) {
    return new Array(ct - String(str).length + 1).join(fill) + str;
}

exports.escapeSQLiteStatement = escapeSQLiteStatement;
exports.unescapeSQLiteResponse = unescapeSQLiteResponse;
exports.escapeDatabaseNameForSQLAndFiles = escapeDatabaseNameForSQLAndFiles;
exports.unescapeDatabaseNameForSQLAndFiles = unescapeDatabaseNameForSQLAndFiles;
exports.escapeStoreNameForSQL = escapeStoreNameForSQL;
exports.escapeIndexNameForSQL = escapeIndexNameForSQL;
exports.escapeIndexNameForSQLKeyColumn = escapeIndexNameForSQLKeyColumn;
exports.sqlLIKEEscape = sqlLIKEEscape;
exports.sqlQuote = sqlQuote;
exports.instanceOf = instanceOf;
exports.isObj = isObj;
exports.isDate = isDate;
exports.isBlob = isBlob;
exports.isRegExp = isRegExp;
exports.isFile = isFile;
exports.isBinary = isBinary;
exports.isIterable = isIterable;
exports.defineReadonlyProperties = defineReadonlyProperties;
exports.isValidKeyPath = isValidKeyPath;
exports.enforceRange = enforceRange;
exports.convertToDOMString = convertToDOMString;
exports.convertToSequenceDOMString = convertToSequenceDOMString;
exports.padStart = padStart;

},{"./CFG":2,"unicode-9.0.0/Binary_Property/Expands_On_NFD/regex":1}]},{},[4])(4)
});
//# sourceMappingURL=indexeddbshim-Key.js.map