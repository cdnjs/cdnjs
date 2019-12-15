(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["jsonld"] = factory();
	else
		root["jsonld"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 73);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(37)('wks');
var uid = __webpack_require__(19);
var Symbol = __webpack_require__(1).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var graphTypes = __webpack_require__(5);
var types = __webpack_require__(3);
// TODO: move `IdentifierIssuer` to its own package
var IdentifierIssuer = __webpack_require__(44).IdentifierIssuer;
var JsonLdError = __webpack_require__(6);

// constants
var REGEX_LINK_HEADERS = /(?:<[^>]*?>|"[^"]*?"|[^,])+/g;
var REGEX_LINK_HEADER = /\s*<([^>]*?)>\s*(?:;\s*(.*))?/;
var REGEX_LINK_HEADER_PARAMS = /(.*?)=(?:(?:"([^"]*?)")|([^"]*?))\s*(?:(?:;\s*)|$)/g;

var DEFAULTS = {
  headers: {
    accept: 'application/ld+json, application/json'
  }
};

var api = {};
module.exports = api;
api.IdentifierIssuer = IdentifierIssuer;

// define setImmediate and nextTick
//// nextTick implementation with browser-compatible fallback ////
// from https://github.com/caolan/async/blob/master/lib/async.js

// capture the global reference to guard against fakeTimer mocks
var _setImmediate = typeof setImmediate === 'function' && setImmediate;

var _delay = _setImmediate ?
// not a direct alias (for IE10 compatibility)
function (fn) {
  return _setImmediate(fn);
} : function (fn) {
  return setTimeout(fn, 0);
};

if ((typeof process === 'undefined' ? 'undefined' : _typeof(process)) === 'object' && typeof process.nextTick === 'function') {
  api.nextTick = process.nextTick;
} else {
  api.nextTick = _delay;
}
api.setImmediate = _setImmediate ? _delay : api.nextTick;

/**
 * Clones an object, array, or string/number. If a typed JavaScript object
 * is given, such as a Date, it will be converted to a string.
 *
 * @param value the value to clone.
 *
 * @return the cloned value.
 */
api.clone = function (value) {
  if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
    var rval = void 0;
    if (types.isArray(value)) {
      rval = [];
      for (var i = 0; i < value.length; ++i) {
        rval[i] = api.clone(value[i]);
      }
    } else if (types.isObject(value)) {
      rval = {};
      for (var key in value) {
        rval[key] = api.clone(value[key]);
      }
    } else {
      rval = value.toString();
    }
    return rval;
  }
  return value;
};

/**
 * Builds an HTTP headers object for making a JSON-LD request from custom
 * headers and asserts the `accept` header isn't overridden.
 *
 * @param headers an object of headers with keys as header names and values
 *          as header values.
 *
 * @return an object of headers with a valid `accept` header.
 */
api.buildHeaders = function () {
  var headers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var hasAccept = Object.keys(headers).some(function (h) {
    return h.toLowerCase() === 'accept';
  });

  if (hasAccept) {
    throw new RangeError('Accept header may not be specified; only "' + DEFAULTS.headers.accept + '" is supported.');
  }

  return Object.assign({ 'Accept': DEFAULTS.headers.accept }, headers);
};

/**
 * Parses a link header. The results will be key'd by the value of "rel".
 *
 * Link: <http://json-ld.org/contexts/person.jsonld>;
 * rel="http://www.w3.org/ns/json-ld#context"; type="application/ld+json"
 *
 * Parses as: {
 *   'http://www.w3.org/ns/json-ld#context': {
 *     target: http://json-ld.org/contexts/person.jsonld,
 *     type: 'application/ld+json'
 *   }
 * }
 *
 * If there is more than one "rel" with the same IRI, then entries in the
 * resulting map for that "rel" will be arrays.
 *
 * @param header the link header to parse.
 */
api.parseLinkHeader = function (header) {
  var rval = {};
  // split on unbracketed/unquoted commas
  var entries = header.match(REGEX_LINK_HEADERS);
  for (var i = 0; i < entries.length; ++i) {
    var match = entries[i].match(REGEX_LINK_HEADER);
    if (!match) {
      continue;
    }
    var result = { target: match[1] };
    var params = match[2];
    while (match = REGEX_LINK_HEADER_PARAMS.exec(params)) {
      result[match[1]] = match[2] === undefined ? match[3] : match[2];
    }
    var rel = result['rel'] || '';
    if (Array.isArray(rval[rel])) {
      rval[rel].push(result);
    } else if (rel in rval) {
      rval[rel] = [rval[rel], result];
    } else {
      rval[rel] = result;
    }
  }
  return rval;
};

/**
 * Throws an exception if the given value is not a valid @type value.
 *
 * @param v the value to check.
 */
api.validateTypeValue = function (v) {
  // can be a string or an empty object
  if (types.isString(v) || types.isEmptyObject(v)) {
    return;
  }

  // must be an array
  var isValid = false;
  if (types.isArray(v)) {
    // must contain only strings
    isValid = true;
    for (var i = 0; i < v.length; ++i) {
      if (!types.isString(v[i])) {
        isValid = false;
        break;
      }
    }
  }

  if (!isValid) {
    throw new JsonLdError('Invalid JSON-LD syntax; "@type" value must a string, an array of ' + 'strings, or an empty object.', 'jsonld.SyntaxError', { code: 'invalid type value', value: v });
  }
};

/**
 * Returns true if the given subject has the given property.
 *
 * @param subject the subject to check.
 * @param property the property to look for.
 *
 * @return true if the subject has the given property, false if not.
 */
api.hasProperty = function (subject, property) {
  if (property in subject) {
    var value = subject[property];
    return !types.isArray(value) || value.length > 0;
  }
  return false;
};

/**
 * Determines if the given value is a property of the given subject.
 *
 * @param subject the subject to check.
 * @param property the property to check.
 * @param value the value to check.
 *
 * @return true if the value exists, false if not.
 */
api.hasValue = function (subject, property, value) {
  if (api.hasProperty(subject, property)) {
    var val = subject[property];
    var isList = graphTypes.isList(val);
    if (types.isArray(val) || isList) {
      if (isList) {
        val = val['@list'];
      }
      for (var i = 0; i < val.length; ++i) {
        if (api.compareValues(value, val[i])) {
          return true;
        }
      }
    } else if (!types.isArray(value)) {
      // avoid matching the set of values with an array value parameter
      return api.compareValues(value, val);
    }
  }
  return false;
};

/**
 * Adds a value to a subject. If the value is an array, all values in the
 * array will be added.
 *
 * @param subject the subject to add the value to.
 * @param property the property that relates the value to the subject.
 * @param value the value to add.
 * @param [options] the options to use:
 *        [propertyIsArray] true if the property is always an array, false
 *          if not (default: false).
 *        [allowDuplicate] true to allow duplicates, false not to (uses a
 *          simple shallow comparison of subject ID or value) (default: true).
 */
api.addValue = function (subject, property, value, options) {
  options = options || {};
  if (!('propertyIsArray' in options)) {
    options.propertyIsArray = false;
  }
  if (!('allowDuplicate' in options)) {
    options.allowDuplicate = true;
  }

  if (types.isArray(value)) {
    if (value.length === 0 && options.propertyIsArray && !(property in subject)) {
      subject[property] = [];
    }
    for (var i = 0; i < value.length; ++i) {
      api.addValue(subject, property, value[i], options);
    }
  } else if (property in subject) {
    // check if subject already has value if duplicates not allowed
    var hasValue = !options.allowDuplicate && api.hasValue(subject, property, value);

    // make property an array if value not present or always an array
    if (!types.isArray(subject[property]) && (!hasValue || options.propertyIsArray)) {
      subject[property] = [subject[property]];
    }

    // add new value
    if (!hasValue) {
      subject[property].push(value);
    }
  } else {
    // add new value as set or single value
    subject[property] = options.propertyIsArray ? [value] : value;
  }
};

/**
 * Gets all of the values for a subject's property as an array.
 *
 * @param subject the subject.
 * @param property the property.
 *
 * @return all of the values for a subject's property as an array.
 */
api.getValues = function (subject, property) {
  return [].concat(subject[property] || []);
};

/**
 * Removes a property from a subject.
 *
 * @param subject the subject.
 * @param property the property.
 */
api.removeProperty = function (subject, property) {
  delete subject[property];
};

/**
 * Removes a value from a subject.
 *
 * @param subject the subject.
 * @param property the property that relates the value to the subject.
 * @param value the value to remove.
 * @param [options] the options to use:
 *          [propertyIsArray] true if the property is always an array, false
 *            if not (default: false).
 */
api.removeValue = function (subject, property, value, options) {
  options = options || {};
  if (!('propertyIsArray' in options)) {
    options.propertyIsArray = false;
  }

  // filter out value
  var values = api.getValues(subject, property).filter(function (e) {
    return !api.compareValues(e, value);
  });

  if (values.length === 0) {
    api.removeProperty(subject, property);
  } else if (values.length === 1 && !options.propertyIsArray) {
    subject[property] = values[0];
  } else {
    subject[property] = values;
  }
};

/**
 * Relabels all blank nodes in the given JSON-LD input.
 *
 * @param input the JSON-LD input.
 * @param [options] the options to use:
 *          [issuer] an IdentifierIssuer to use to label blank nodes.
 */
api.relabelBlankNodes = function (input, options) {
  options = options || {};
  var issuer = options.issuer || new IdentifierIssuer('_:b');
  return _labelBlankNodes(issuer, input);
};

/**
 * Compares two JSON-LD values for equality. Two JSON-LD values will be
 * considered equal if:
 *
 * 1. They are both primitives of the same type and value.
 * 2. They are both @values with the same @value, @type, @language,
 *   and @index, OR
 * 3. They both have @ids they are the same.
 *
 * @param v1 the first value.
 * @param v2 the second value.
 *
 * @return true if v1 and v2 are considered equal, false if not.
 */
api.compareValues = function (v1, v2) {
  // 1. equal primitives
  if (v1 === v2) {
    return true;
  }

  // 2. equal @values
  if (graphTypes.isValue(v1) && graphTypes.isValue(v2) && v1['@value'] === v2['@value'] && v1['@type'] === v2['@type'] && v1['@language'] === v2['@language'] && v1['@index'] === v2['@index']) {
    return true;
  }

  // 3. equal @ids
  if (types.isObject(v1) && '@id' in v1 && types.isObject(v2) && '@id' in v2) {
    return v1['@id'] === v2['@id'];
  }

  return false;
};

/**
 * Compares two strings first based on length and then lexicographically.
 *
 * @param a the first string.
 * @param b the second string.
 *
 * @return -1 if a < b, 1 if a > b, 0 if a == b.
 */
api.compareShortestLeast = function (a, b) {
  if (a.length < b.length) {
    return -1;
  }
  if (b.length < a.length) {
    return 1;
  }
  if (a === b) {
    return 0;
  }
  return a < b ? -1 : 1;
};

api.normalizeDocumentLoader = function (fn) {
  if (fn.length < 2) {
    return api.callbackify(fn);
  }

  return function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
      var callback,
          _args = arguments;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              callback = _args[1];
              return _context.abrupt('return', new Promise(function (resolve, reject) {
                try {
                  fn(url, function (err, remoteDoc) {
                    if (typeof callback === 'function') {
                      return _invokeCallback(callback, err, remoteDoc);
                    } else if (err) {
                      reject(err);
                    } else {
                      resolve(remoteDoc);
                    }
                  });
                } catch (e) {
                  if (typeof callback === 'function') {
                    return _invokeCallback(callback, e);
                  }
                  reject(e);
                }
              }));

            case 2:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function (_x2) {
      return _ref.apply(this, arguments);
    };
  }();
};

api.callbackify = function (fn) {
  return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var callback, result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            callback = args[args.length - 1];

            if (typeof callback === 'function') {
              args.pop();
            }

            result = void 0;
            _context2.prev = 3;
            _context2.next = 6;
            return fn.apply(null, args);

          case 6:
            result = _context2.sent;
            _context2.next = 14;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2['catch'](3);

            if (!(typeof callback === 'function')) {
              _context2.next = 13;
              break;
            }

            return _context2.abrupt('return', _invokeCallback(callback, _context2.t0));

          case 13:
            throw _context2.t0;

          case 14:
            if (!(typeof callback === 'function')) {
              _context2.next = 16;
              break;
            }

            return _context2.abrupt('return', _invokeCallback(callback, null, result));

          case 16:
            return _context2.abrupt('return', result);

          case 17:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[3, 9]]);
  }));
};

function _invokeCallback(callback, err, result) {
  // execute on next tick to prevent "unhandled rejected promise"
  // and simulate what would have happened in a promiseless API
  api.nextTick(function () {
    return callback(err, result);
  });
}

/**
 * Labels the blank nodes in the given value using the given IdentifierIssuer.
 *
 * @param issuer the IdentifierIssuer to use.
 * @param element the element with blank nodes to rename.
 *
 * @return the element.
 */
function _labelBlankNodes(issuer, element) {
  if (types.isArray(element)) {
    for (var i = 0; i < element.length; ++i) {
      element[i] = _labelBlankNodes(issuer, element[i]);
    }
  } else if (graphTypes.isList(element)) {
    element['@list'] = _labelBlankNodes(issuer, element['@list']);
  } else if (types.isObject(element)) {
    // relabel blank node
    if (graphTypes.isBlankNode(element)) {
      element['@id'] = issuer.getId(element['@id']);
    }

    // recursively apply to all keys
    var keys = Object.keys(element).sort();
    for (var ki = 0; ki < keys.length; ++ki) {
      var key = keys[ki];
      if (key !== '@id') {
        element[key] = _labelBlankNodes(issuer, element[key]);
      }
    }
  }

  return element;
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */


var api = {};
module.exports = api;

/**
 * Returns true if the given value is an Array.
 *
 * @param v the value to check.
 *
 * @return true if the value is an Array, false if not.
 */
api.isArray = Array.isArray;

/**
 * Returns true if the given value is a Boolean.
 *
 * @param v the value to check.
 *
 * @return true if the value is a Boolean, false if not.
 */
api.isBoolean = function (v) {
  return typeof v === 'boolean' || Object.prototype.toString.call(v) === '[object Boolean]';
};

/**
 * Returns true if the given value is a double.
 *
 * @param v the value to check.
 *
 * @return true if the value is a double, false if not.
 */
api.isDouble = function (v) {
  return api.isNumber(v) && String(v).indexOf('.') !== -1;
};

/**
 * Returns true if the given value is an empty Object.
 *
 * @param v the value to check.
 *
 * @return true if the value is an empty Object, false if not.
 */
api.isEmptyObject = function (v) {
  return api.isObject(v) && Object.keys(v).length === 0;
};

/**
 * Returns true if the given value is a Number.
 *
 * @param v the value to check.
 *
 * @return true if the value is a Number, false if not.
 */
api.isNumber = function (v) {
  return typeof v === 'number' || Object.prototype.toString.call(v) === '[object Number]';
};

/**
 * Returns true if the given value is numeric.
 *
 * @param v the value to check.
 *
 * @return true if the value is numeric, false if not.
 */
api.isNumeric = function (v) {
  return !isNaN(parseFloat(v)) && isFinite(v);
};

/**
 * Returns true if the given value is an Object.
 *
 * @param v the value to check.
 *
 * @return true if the value is an Object, false if not.
 */
api.isObject = function (v) {
  return Object.prototype.toString.call(v) === '[object Object]';
};

/**
 * Returns true if the given value is a String.
 *
 * @param v the value to check.
 *
 * @return true if the value is a String, false if not.
 */
api.isString = function (v) {
  return typeof v === 'string' || Object.prototype.toString.call(v) === '[object String]';
};

/**
 * Returns true if the given value is undefined.
 *
 * @param v the value to check.
 *
 * @return true if the value is undefined, false if not.
 */
api.isUndefined = function (v) {
  return typeof v === 'undefined';
};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.3' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */


var types = __webpack_require__(3);

var api = {};
module.exports = api;

/**
 * Returns true if the given value is a subject with properties.
 *
 * @param v the value to check.
 *
 * @return true if the value is a subject with properties, false if not.
 */
api.isSubject = function (v) {
  // Note: A value is a subject if all of these hold true:
  // 1. It is an Object.
  // 2. It is not a @value, @set, or @list.
  // 3. It has more than 1 key OR any existing key is not @id.
  if (types.isObject(v) && !('@value' in v || '@set' in v || '@list' in v)) {
    var keyCount = Object.keys(v).length;
    return keyCount > 1 || !('@id' in v);
  }
  return false;
};

/**
 * Returns true if the given value is a subject reference.
 *
 * @param v the value to check.
 *
 * @return true if the value is a subject reference, false if not.
 */
api.isSubjectReference = function (v) {
  return (
    // Note: A value is a subject reference if all of these hold true:
    // 1. It is an Object.
    // 2. It has a single key: @id.
    types.isObject(v) && Object.keys(v).length === 1 && '@id' in v
  );
};

/**
 * Returns true if the given value is a @value.
 *
 * @param v the value to check.
 *
 * @return true if the value is a @value, false if not.
 */
api.isValue = function (v) {
  return (
    // Note: A value is a @value if all of these hold true:
    // 1. It is an Object.
    // 2. It has the @value property.
    types.isObject(v) && '@value' in v
  );
};

/**
 * Returns true if the given value is a @list.
 *
 * @param v the value to check.
 *
 * @return true if the value is a @list, false if not.
 */
api.isList = function (v) {
  return (
    // Note: A value is a @list if all of these hold true:
    // 1. It is an Object.
    // 2. It has the @list property.
    types.isObject(v) && '@list' in v
  );
};

/**
 * Returns true if the given value is a simple @graph.
 *
 * @return true if the value is a simple @graph, false if not.
 */
api.isSimpleGraph = function (v) {
  // Note: A value is a simple graph if all of these hold true:
  // 1. It is an object.
  // 2. It has an `@graph` key.
  // 3. It has only 1 key or 2 keys where one of them is `@index`.
  if (!types.isObject(v)) {
    return false;
  }
  var keyLength = Object.keys(v).length;
  return '@graph' in v && (keyLength === 1 || keyLength === 2 && '@index' in v);
};

/**
 * Returns true if the given value is a blank node.
 *
 * @param v the value to check.
 *
 * @return true if the value is a blank node, false if not.
 */
api.isBlankNode = function (v) {
  // Note: A value is a blank node if all of these hold true:
  // 1. It is an Object.
  // 2. If it has an @id key its value begins with '_:'.
  // 3. It has no keys OR is not a @value, @set, or @list.
  if (types.isObject(v)) {
    if ('@id' in v) {
      return v['@id'].indexOf('_:') === 0;
    }
    return Object.keys(v).length === 0 || !('@value' in v || '@set' in v || '@list' in v);
  }
  return false;
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

module.exports = function (_Error) {
  _inherits(JsonLdError, _Error);

  /**
   * Creates a JSON-LD Error.
   *
   * @param msg the error message.
   * @param type the error type.
   * @param details the error details.
   */
  function JsonLdError() {
    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'An unspecified JSON-LD error occurred.';
    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'jsonld.Error';
    var details = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, JsonLdError);

    var _this = _possibleConstructorReturn(this, (JsonLdError.__proto__ || Object.getPrototypeOf(JsonLdError)).call(this, message));

    _this.name = name;
    _this.message = message;
    _this.details = details;
    return _this;
  }

  return JsonLdError;
}(Error);

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(12);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 8 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1);
var core = __webpack_require__(4);
var hide = __webpack_require__(10);
var redefine = __webpack_require__(16);
var ctx = __webpack_require__(27);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(11);
var createDesc = __webpack_require__(26);
module.exports = __webpack_require__(13) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(7);
var IE8_DOM_DEFINE = __webpack_require__(50);
var toPrimitive = __webpack_require__(34);
var dP = Object.defineProperty;

exports.f = __webpack_require__(13) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(18)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright (c) 2016-2017 Digital Bazaar, Inc. All rights reserved.
 */


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var api = {};
module.exports = api;

// define setImmediate and nextTick
//// nextTick implementation with browser-compatible fallback ////
// from https://github.com/caolan/async/blob/master/lib/async.js

// capture the global reference to guard against fakeTimer mocks
var _setImmediate = typeof setImmediate === 'function' && setImmediate;

var _delay = _setImmediate ?
// not a direct alias (for IE10 compatibility)
function (fn) {
  return _setImmediate(fn);
} : function (fn) {
  return setTimeout(fn, 0);
};

if ((typeof process === 'undefined' ? 'undefined' : _typeof(process)) === 'object' && typeof process.nextTick === 'function') {
  api.nextTick = process.nextTick;
} else {
  api.nextTick = _delay;
}
api.setImmediate = _setImmediate ? _delay : api.nextTick;

/**
 * Clones an object, array, or string/number. If a typed JavaScript object
 * is given, such as a Date, it will be converted to a string.
 *
 * @param value the value to clone.
 *
 * @return the cloned value.
 */
api.clone = function (value) {
  if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
    var rval = void 0;
    if (Array.isArray(value)) {
      rval = [];
      for (var i = 0; i < value.length; ++i) {
        rval[i] = api.clone(value[i]);
      }
    } else if (api.isObject(value)) {
      rval = {};
      for (var key in value) {
        rval[key] = api.clone(value[key]);
      }
    } else {
      rval = value.toString();
    }
    return rval;
  }
  return value;
};

/**
 * Returns true if the given value is an Object.
 *
 * @param v the value to check.
 *
 * @return true if the value is an Object, false if not.
 */
api.isObject = function (v) {
  return Object.prototype.toString.call(v) === '[object Object]';
};

/**
 * Returns true if the given value is undefined.
 *
 * @param v the value to check.
 *
 * @return true if the value is undefined, false if not.
 */
api.isUndefined = function (v) {
  return typeof v === 'undefined';
};

api.callbackify = function (fn) {
  return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var callback, result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            callback = args[args.length - 1];

            if (typeof callback === 'function') {
              args.pop();
            }

            result = void 0;
            _context.prev = 3;
            _context.next = 6;
            return fn.apply(null, args);

          case 6:
            result = _context.sent;
            _context.next = 14;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context['catch'](3);

            if (!(typeof callback === 'function')) {
              _context.next = 13;
              break;
            }

            return _context.abrupt('return', _invokeCallback(callback, _context.t0));

          case 13:
            throw _context.t0;

          case 14:
            if (!(typeof callback === 'function')) {
              _context.next = 16;
              break;
            }

            return _context.abrupt('return', _invokeCallback(callback, null, result));

          case 16:
            return _context.abrupt('return', result);

          case 17:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[3, 9]]);
  }));
};

function _invokeCallback(callback, err, result) {
  try {
    return callback(err, result);
  } catch (unhandledError) {
    // throw unhandled errors to prevent "unhandled rejected promise"
    // and simulate what would have happened in a promiseless API
    process.nextTick(function () {
      throw unhandledError;
    });
  }
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */


var _retrieveContextUrls = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(input, options) {

    // recursive function that will retrieve all @context URLs in documents
    var retrieve = function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(doc, cycles, documentLoader) {
        var _this = this;

        var urls, queue;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(Object.keys(cycles).length > MAX_CONTEXT_URLS)) {
                  _context3.next = 2;
                  break;
                }

                throw new JsonLdError('Maximum number of @context URLs exceeded.', 'jsonld.ContextUrlError', { code: 'loading remote context failed', max: MAX_CONTEXT_URLS });

              case 2:

                // find all URLs in the given document, reusing already retrieved URLs
                urls = {};

                Object.keys(_urls).forEach(function (url) {
                  if (_urls[url] !== false) {
                    urls[url] = _urls[url];
                  }
                });
                _findContextUrls(doc, urls, false, options.base);

                // queue all unretrieved URLs
                queue = Object.keys(urls).filter(function (u) {
                  return urls[u] === false;
                });

                // retrieve URLs in queue

                return _context3.abrupt('return', Promise.all(queue.map(function () {
                  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(url) {
                    var _cycles, remoteDoc, ctx;

                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            if (!(url in cycles)) {
                              _context2.next = 2;
                              break;
                            }

                            throw new JsonLdError('Cyclical @context URLs detected.', 'jsonld.ContextUrlError', { code: 'recursive context inclusion', url: url });

                          case 2:
                            _cycles = util.clone(cycles);

                            _cycles[url] = true;
                            remoteDoc = void 0;
                            ctx = void 0;
                            _context2.prev = 6;
                            _context2.next = 9;
                            return documentLoader(url);

                          case 9:
                            remoteDoc = _context2.sent;

                            ctx = remoteDoc.document || null;
                            // parse string context as JSON
                            if (_isString(ctx)) {
                              ctx = JSON.parse(ctx);
                            }
                            _context2.next = 17;
                            break;

                          case 14:
                            _context2.prev = 14;
                            _context2.t0 = _context2['catch'](6);
                            throw new JsonLdError('Dereferencing a URL did not result in a valid JSON-LD object. ' + 'Possible causes are an inaccessible URL perhaps due to ' + 'a same-origin policy (ensure the server uses CORS if you are ' + 'using client-side JavaScript), too many redirects, a ' + 'non-JSON response, or more than one HTTP Link Header was ' + 'provided for a remote context.', 'jsonld.InvalidUrl', { code: 'loading remote context failed', url: url, cause: _context2.t0 });

                          case 17:
                            if (_isObject(ctx)) {
                              _context2.next = 19;
                              break;
                            }

                            throw new JsonLdError('Dereferencing a URL did not result in a JSON object. The ' + 'response was valid JSON, but it was not a JSON object.', 'jsonld.InvalidUrl', { code: 'invalid remote context', url: url });

                          case 19:

                            // use empty context if no @context key is present
                            if (!('@context' in ctx)) {
                              ctx = { '@context': {} };
                            } else {
                              ctx = { '@context': ctx['@context'] };
                            }

                            // append @context URL to context if given
                            if (remoteDoc.contextUrl) {
                              if (!_isArray(ctx['@context'])) {
                                ctx['@context'] = [ctx['@context']];
                              }
                              ctx['@context'].push(remoteDoc.contextUrl);
                            }

                            // recurse
                            _context2.next = 23;
                            return retrieve(ctx, _cycles, documentLoader);

                          case 23:

                            // store retrieved context w/replaced @context URLs
                            urls[url] = ctx['@context'];

                            // replace all @context URLs in the document
                            _findContextUrls(doc, urls, true, options.base);

                          case 25:
                          case 'end':
                            return _context2.stop();
                        }
                      }
                    }, _callee2, _this, [[6, 14]]);
                  }));

                  return function (_x8) {
                    return _ref5.apply(this, arguments);
                  };
                }())));

              case 7:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function retrieve(_x5, _x6, _x7) {
        return _ref4.apply(this, arguments);
      };
    }();

    var documentLoader, _urls;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            documentLoader = util.normalizeDocumentLoader(options.documentLoader);

            // retrieve all @context URLs in input

            _urls = {};
            _context4.next = 4;
            return retrieve(input, {}, documentLoader);

          case 4:
            return _context4.abrupt('return', input);

          case 5:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function _retrieveContextUrls(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * Finds all @context URLs in the given JSON-LD input.
 *
 * @param input the JSON-LD input.
 * @param urls a map of URLs (url => false/@contexts).
 * @param replace true to replace the URLs in the given input with the
 *           @contexts from the urls map, false not to.
 * @param base the base IRI to use to resolve relative IRIs.
 *
 * @return true if new URLs to retrieve were found, false if not.
 */


function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var util = __webpack_require__(2);
var ActiveContextCache = __webpack_require__(125);
var JsonLdError = __webpack_require__(6);

var _require = __webpack_require__(3),
    _isArray = _require.isArray,
    _isObject = _require.isObject,
    _isString = _require.isString,
    _isUndefined = _require.isUndefined;

var _require2 = __webpack_require__(25),
    _isAbsoluteIri = _require2.isAbsolute,
    _isRelativeIri = _require2.isRelative,
    prependBase = _require2.prependBase,
    parseUrl = _require2.parse;

var MAX_CONTEXT_URLS = 10;

var api = {};
module.exports = api;

api.cache = new ActiveContextCache();

/**
 * Processes a local context and returns a new active context.
 *
 * @param activeCtx the current active context.
 * @param localCtx the local context to process.
 * @param options the context processing options.
 *
 * @return the new active context.
 */
api.process = function (_ref) {
  var activeCtx = _ref.activeCtx,
      localCtx = _ref.localCtx,
      options = _ref.options;

  // normalize local context to an array of @context objects
  if (_isObject(localCtx) && '@context' in localCtx && _isArray(localCtx['@context'])) {
    localCtx = localCtx['@context'];
  }
  var ctxs = _isArray(localCtx) ? localCtx : [localCtx];

  // no contexts in array, clone existing context
  if (ctxs.length === 0) {
    return activeCtx.clone();
  }

  // process each context in order, update active context
  // on each iteration to ensure proper caching
  var rval = activeCtx;
  for (var i = 0; i < ctxs.length; ++i) {
    var ctx = ctxs[i];

    // reset to initial context
    if (ctx === null) {
      rval = activeCtx = api.getInitialContext(options);
      continue;
    }

    // dereference @context key if present
    if (_isObject(ctx) && '@context' in ctx) {
      ctx = ctx['@context'];
    }

    // context must be an object by now, all URLs retrieved before this call
    if (!_isObject(ctx)) {
      throw new JsonLdError('Invalid JSON-LD syntax; @context must be an object.', 'jsonld.SyntaxError', { code: 'invalid local context', context: ctx });
    }

    // get context from cache if available
    if (api.cache) {
      var cached = api.cache.get(activeCtx, ctx);
      if (cached) {
        rval = activeCtx = cached;
        continue;
      }
    }

    // update active context and clone new one before updating
    activeCtx = rval;
    rval = rval.clone();

    // define context mappings for keys in local context
    var defined = {};

    // handle @version
    if ('@version' in ctx) {
      if (ctx['@version'] !== 1.1) {
        throw new JsonLdError('Unsupported JSON-LD version: ' + ctx['@version'], 'jsonld.UnsupportedVersion', { code: 'invalid @version value', context: ctx });
      }
      if (activeCtx.processingMode && activeCtx.processingMode.indexOf('json-ld-1.1') !== 0) {
        throw new JsonLdError('@version: ' + ctx['@version'] + ' not compatible with ' + activeCtx.processingMode, 'jsonld.ProcessingModeConflict', { code: 'processing mode conflict', context: ctx });
      }
      rval.processingMode = 'json-ld-1.1';
      rval['@version'] = ctx['@version'];
      defined['@version'] = true;
    }

    // if not set explicitly, set processingMode to "json-ld-1.0"
    rval.processingMode = rval.processingMode || activeCtx.processingMode || 'json-ld-1.0';

    // handle @base
    if ('@base' in ctx) {
      var base = ctx['@base'];

      if (base === null) {
        // no action
      } else if (_isAbsoluteIri(base)) {
        base = parseUrl(base);
      } else if (_isRelativeIri(base)) {
        base = parseUrl(prependBase(activeCtx['@base'].href, base));
      } else {
        throw new JsonLdError('Invalid JSON-LD syntax; the value of "@base" in a ' + '@context must be an absolute IRI, a relative IRI, or null.', 'jsonld.SyntaxError', { code: 'invalid base IRI', context: ctx });
      }

      rval['@base'] = base;
      defined['@base'] = true;
    }

    // handle @vocab
    if ('@vocab' in ctx) {
      var value = ctx['@vocab'];
      if (value === null) {
        delete rval['@vocab'];
      } else if (!_isString(value)) {
        throw new JsonLdError('Invalid JSON-LD syntax; the value of "@vocab" in a ' + '@context must be a string or null.', 'jsonld.SyntaxError', { code: 'invalid vocab mapping', context: ctx });
      } else if (!_isAbsoluteIri(value)) {
        throw new JsonLdError('Invalid JSON-LD syntax; the value of "@vocab" in a ' + '@context must be an absolute IRI.', 'jsonld.SyntaxError', { code: 'invalid vocab mapping', context: ctx });
      } else {
        rval['@vocab'] = value;
      }
      defined['@vocab'] = true;
    }

    // handle @language
    if ('@language' in ctx) {
      var _value = ctx['@language'];
      if (_value === null) {
        delete rval['@language'];
      } else if (!_isString(_value)) {
        throw new JsonLdError('Invalid JSON-LD syntax; the value of "@language" in a ' + '@context must be a string or null.', 'jsonld.SyntaxError', { code: 'invalid default language', context: ctx });
      } else {
        rval['@language'] = _value.toLowerCase();
      }
      defined['@language'] = true;
    }

    // process all other keys
    for (var key in ctx) {
      api.createTermDefinition(rval, ctx, key, defined);
    }

    // cache result
    if (api.cache) {
      api.cache.set(activeCtx, ctx, rval);
    }
  }

  return rval;
};

/**
 * Creates a term definition during context processing.
 *
 * @param activeCtx the current active context.
 * @param localCtx the local context being processed.
 * @param term the term in the local context to define the mapping for.
 * @param defined a map of defining/defined keys to detect cycles and prevent
 *          double definitions.
 */
api.createTermDefinition = function (activeCtx, localCtx, term, defined) {
  if (term in defined) {
    // term already defined
    if (defined[term]) {
      return;
    }
    // cycle detected
    throw new JsonLdError('Cyclical context definition detected.', 'jsonld.CyclicalContext', { code: 'cyclic IRI mapping', context: localCtx, term: term });
  }

  // now defining term
  defined[term] = false;

  if (api.isKeyword(term)) {
    throw new JsonLdError('Invalid JSON-LD syntax; keywords cannot be overridden.', 'jsonld.SyntaxError', { code: 'keyword redefinition', context: localCtx, term: term });
  }

  if (term === '') {
    throw new JsonLdError('Invalid JSON-LD syntax; a term cannot be an empty string.', 'jsonld.SyntaxError', { code: 'invalid term definition', context: localCtx });
  }

  // remove old mapping
  if (activeCtx.mappings[term]) {
    delete activeCtx.mappings[term];
  }

  // get context term value
  var value = localCtx[term];

  // clear context entry
  if (value === null || _isObject(value) && value['@id'] === null) {
    activeCtx.mappings[term] = null;
    defined[term] = true;
    return;
  }

  // convert short-hand value to object w/@id
  if (_isString(value)) {
    value = { '@id': value };
  }

  if (!_isObject(value)) {
    throw new JsonLdError('Invalid JSON-LD syntax; @context term values must be ' + 'strings or objects.', 'jsonld.SyntaxError', { code: 'invalid term definition', context: localCtx });
  }

  // create new mapping
  var mapping = activeCtx.mappings[term] = {};
  mapping.reverse = false;

  // make sure term definition only has expected keywords
  var validKeys = ['@container', '@id', '@language', '@reverse', '@type'];

  for (var kw in value) {
    if (!validKeys.includes(kw)) {
      throw new JsonLdError('Invalid JSON-LD syntax; a term definition must not contain ' + kw, 'jsonld.SyntaxError', { code: 'invalid term definition', context: localCtx });
    }
  }

  if ('@reverse' in value) {
    if ('@id' in value) {
      throw new JsonLdError('Invalid JSON-LD syntax; a @reverse term definition must not ' + 'contain @id.', 'jsonld.SyntaxError', { code: 'invalid reverse property', context: localCtx });
    }
    var reverse = value['@reverse'];
    if (!_isString(reverse)) {
      throw new JsonLdError('Invalid JSON-LD syntax; a @context @reverse value must be a string.', 'jsonld.SyntaxError', { code: 'invalid IRI mapping', context: localCtx });
    }

    // expand and add @id mapping
    var _id = api.expandIri(activeCtx, reverse, { vocab: true, base: false }, localCtx, defined);
    if (!_isAbsoluteIri(_id)) {
      throw new JsonLdError('Invalid JSON-LD syntax; a @context @reverse value must be an ' + 'absolute IRI or a blank node identifier.', 'jsonld.SyntaxError', { code: 'invalid IRI mapping', context: localCtx });
    }
    mapping['@id'] = _id;
    mapping.reverse = true;
  } else if ('@id' in value) {
    var _id2 = value['@id'];
    if (!_isString(_id2)) {
      throw new JsonLdError('Invalid JSON-LD syntax; a @context @id value must be an array ' + 'of strings or a string.', 'jsonld.SyntaxError', { code: 'invalid IRI mapping', context: localCtx });
    }
    if (_id2 !== term) {
      // expand and add @id mapping
      _id2 = api.expandIri(activeCtx, _id2, { vocab: true, base: false }, localCtx, defined);
      if (!_isAbsoluteIri(_id2) && !api.isKeyword(_id2)) {
        throw new JsonLdError('Invalid JSON-LD syntax; a @context @id value must be an ' + 'absolute IRI, a blank node identifier, or a keyword.', 'jsonld.SyntaxError', { code: 'invalid IRI mapping', context: localCtx });
      }
      mapping['@id'] = _id2;
    }
  }

  // always compute whether term has a colon as an optimization for
  // _compactIri
  var colon = term.indexOf(':');
  mapping._termHasColon = colon !== -1;

  if (!('@id' in mapping)) {
    // see if the term has a prefix
    if (mapping._termHasColon) {
      var prefix = term.substr(0, colon);
      if (prefix in localCtx) {
        // define parent prefix
        api.createTermDefinition(activeCtx, localCtx, prefix, defined);
      }

      if (activeCtx.mappings[prefix]) {
        // set @id based on prefix parent
        var suffix = term.substr(colon + 1);
        mapping['@id'] = activeCtx.mappings[prefix]['@id'] + suffix;
      } else {
        // term is an absolute IRI
        mapping['@id'] = term;
      }
    } else {
      // non-IRIs *must* define @ids if @vocab is not available
      if (!('@vocab' in activeCtx)) {
        throw new JsonLdError('Invalid JSON-LD syntax; @context terms must define an @id.', 'jsonld.SyntaxError', { code: 'invalid IRI mapping', context: localCtx, term: term });
      }
      // prepend vocab to term
      mapping['@id'] = activeCtx['@vocab'] + term;
    }
  }

  // IRI mapping now defined
  defined[term] = true;

  if ('@type' in value) {
    var type = value['@type'];
    if (!_isString(type)) {
      throw new JsonLdError('Invalid JSON-LD syntax; an @context @type values must be a string.', 'jsonld.SyntaxError', { code: 'invalid type mapping', context: localCtx });
    }

    if (type !== '@id' && type !== '@vocab') {
      // expand @type to full IRI
      type = api.expandIri(activeCtx, type, { vocab: true, base: false }, localCtx, defined);
      if (!_isAbsoluteIri(type)) {
        throw new JsonLdError('Invalid JSON-LD syntax; an @context @type value must be an ' + 'absolute IRI.', 'jsonld.SyntaxError', { code: 'invalid type mapping', context: localCtx });
      }
      if (type.indexOf('_:') === 0) {
        throw new JsonLdError('Invalid JSON-LD syntax; an @context @type values must be an IRI, ' + 'not a blank node identifier.', 'jsonld.SyntaxError', { code: 'invalid type mapping', context: localCtx });
      }
    }

    // add @type to mapping
    mapping['@type'] = type;
  }

  if ('@container' in value) {
    // normalize container to an array form
    var container = _isString(value['@container']) ? [value['@container']] : value['@container'] || [];
    var validContainers = ['@list', '@set', '@index', '@language'];
    var isValid = true;
    var hasSet = container.includes('@set');

    // JSON-LD 1.1 support
    if (activeCtx.processingMode && activeCtx.processingMode.indexOf('json-ld-1.1') === 0) {
      // TODO: @id and @type
      validContainers.push('@graph');

      // check container length
      isValid &= container.length <= (hasSet ? 2 : 1);
    } else {
      // in JSON-LD 1.0, container must not be an array (it must be a string, which is one of the validContainers)
      isValid &= !_isArray(value['@container']);

      // check container length
      isValid &= container.length <= 1;
    }

    // check against valid containers
    isValid &= container.every(function (c) {
      return validContainers.includes(c);
    });

    // @set not allowed with @list
    isValid &= !(hasSet && container.includes('@list'));

    if (!isValid) {
      throw new JsonLdError('Invalid JSON-LD syntax; @context @container value must be ' + 'one of the following: ' + validContainers.join(', '), 'jsonld.SyntaxError', { code: 'invalid container mapping', context: localCtx });
    }

    if (mapping.reverse && !container.every(function (c) {
      return ['@index', '@set'].includes(c);
    })) {
      throw new JsonLdError('Invalid JSON-LD syntax; @context @container value for a @reverse ' + 'type definition must be @index or @set.', 'jsonld.SyntaxError', { code: 'invalid reverse property', context: localCtx });
    }

    // add @container to mapping
    mapping['@container'] = container;
  }

  if ('@language' in value && !('@type' in value)) {
    var language = value['@language'];
    if (language !== null && !_isString(language)) {
      throw new JsonLdError('Invalid JSON-LD syntax; @context @language value must be ' + 'a string or null.', 'jsonld.SyntaxError', { code: 'invalid language mapping', context: localCtx });
    }

    // add @language to mapping
    if (language !== null) {
      language = language.toLowerCase();
    }
    mapping['@language'] = language;
  }

  // disallow aliasing @context and @preserve
  var id = mapping['@id'];
  if (id === '@context' || id === '@preserve') {
    throw new JsonLdError('Invalid JSON-LD syntax; @context and @preserve cannot be aliased.', 'jsonld.SyntaxError', { code: 'invalid keyword alias', context: localCtx });
  }
};

/**
 * Expands a string to a full IRI. The string may be a term, a prefix, a
 * relative IRI, or an absolute IRI. The associated absolute IRI will be
 * returned.
 *
 * @param activeCtx the current active context.
 * @param value the string to expand.
 * @param relativeTo options for how to resolve relative IRIs:
 *          base: true to resolve against the base IRI, false not to.
 *          vocab: true to concatenate after @vocab, false not to.
 * @param localCtx the local context being processed (only given if called
 *          during context processing).
 * @param defined a map for tracking cycles in context definitions (only given
 *          if called during context processing).
 *
 * @return the expanded value.
 */
api.expandIri = function (activeCtx, value, relativeTo, localCtx, defined) {
  // already expanded
  if (value === null || api.isKeyword(value)) {
    return value;
  }

  // ensure value is interpreted as a string
  value = String(value);

  // define term dependency if not defined
  if (localCtx && value in localCtx && defined[value] !== true) {
    api.createTermDefinition(activeCtx, localCtx, value, defined);
  }

  relativeTo = relativeTo || {};
  if (relativeTo.vocab) {
    var mapping = activeCtx.mappings[value];

    // value is explicitly ignored with a null mapping
    if (mapping === null) {
      return null;
    }

    if (mapping) {
      // value is a term
      return mapping['@id'];
    }
  }

  // split value into prefix:suffix
  var colon = value.indexOf(':');
  if (colon !== -1) {
    var prefix = value.substr(0, colon);
    var suffix = value.substr(colon + 1);

    // do not expand blank nodes (prefix of '_') or already-absolute
    // IRIs (suffix of '//')
    if (prefix === '_' || suffix.indexOf('//') === 0) {
      return value;
    }

    // prefix dependency not defined, define it
    if (localCtx && prefix in localCtx) {
      api.createTermDefinition(activeCtx, localCtx, prefix, defined);
    }

    // use mapping if prefix is defined
    var _mapping = activeCtx.mappings[prefix];
    if (_mapping) {
      return _mapping['@id'] + suffix;
    }

    // already absolute IRI
    return value;
  }

  // prepend vocab
  if (relativeTo.vocab && '@vocab' in activeCtx) {
    return activeCtx['@vocab'] + value;
  }

  // prepend base
  if (relativeTo.base) {
    return prependBase(activeCtx['@base'], value);
  }

  return value;
};

/**
 * Gets the initial context.
 *
 * @param options the options to use:
 *          [base] the document base IRI.
 *
 * @return the initial context.
 */
api.getInitialContext = function (options) {
  var base = parseUrl(options.base || '');
  return {
    '@base': base,
    processingMode: options.processingMode,
    mappings: {},
    inverse: null,
    getInverse: _createInverseContext,
    clone: _cloneActiveContext
  };

  /**
   * Generates an inverse context for use in the compaction algorithm, if
   * not already generated for the given active context.
   *
   * @return the inverse context.
   */
  function _createInverseContext() {
    var activeCtx = this;

    // lazily create inverse
    if (activeCtx.inverse) {
      return activeCtx.inverse;
    }
    var inverse = activeCtx.inverse = {};

    // variables for building fast CURIE map
    var fastCurieMap = activeCtx.fastCurieMap = {};
    var irisToTerms = {};

    // handle default language
    var defaultLanguage = activeCtx['@language'] || '@none';

    // create term selections for each mapping in the context, ordered by
    // shortest and then lexicographically least
    var mappings = activeCtx.mappings;
    var terms = Object.keys(mappings).sort(util.compareShortestLeast);
    for (var i = 0; i < terms.length; ++i) {
      var term = terms[i];
      var mapping = mappings[term];
      if (mapping === null) {
        continue;
      }

      var container = mapping['@container'] || '@none';
      container = [].concat(container).sort().join('');

      // iterate over every IRI in the mapping
      var ids = [].concat(mapping['@id']);
      for (var ii = 0; ii < ids.length; ++ii) {
        var iri = ids[ii];
        var entry = inverse[iri];
        var isKeyword = api.isKeyword(iri);

        if (!entry) {
          // initialize entry
          inverse[iri] = entry = {};

          if (!isKeyword && !mapping._termHasColon) {
            // init IRI to term map and fast CURIE prefixes
            irisToTerms[iri] = [term];
            var fastCurieEntry = { iri: iri, terms: irisToTerms[iri] };
            if (iri[0] in fastCurieMap) {
              fastCurieMap[iri[0]].push(fastCurieEntry);
            } else {
              fastCurieMap[iri[0]] = [fastCurieEntry];
            }
          }
        } else if (!isKeyword && !mapping._termHasColon) {
          // add IRI to term match
          irisToTerms[iri].push(term);
        }

        // add new entry
        if (!entry[container]) {
          entry[container] = {
            '@language': {},
            '@type': {},
            '@any': {}
          };
        }
        entry = entry[container];
        _addPreferredTerm(term, entry['@any'], '@none');

        if (mapping.reverse) {
          // term is preferred for values using @reverse
          _addPreferredTerm(term, entry['@type'], '@reverse');
        } else if ('@type' in mapping) {
          // term is preferred for values using specific type
          _addPreferredTerm(term, entry['@type'], mapping['@type']);
        } else if ('@language' in mapping) {
          // term is preferred for values using specific language
          var language = mapping['@language'] || '@null';
          _addPreferredTerm(term, entry['@language'], language);
        } else {
          // term is preferred for values w/default language or no type and
          // no language
          // add an entry for the default language
          _addPreferredTerm(term, entry['@language'], defaultLanguage);

          // add entries for no type and no language
          _addPreferredTerm(term, entry['@type'], '@none');
          _addPreferredTerm(term, entry['@language'], '@none');
        }
      }
    }

    // build fast CURIE map
    for (var key in fastCurieMap) {
      _buildIriMap(fastCurieMap, key, 1);
    }

    return inverse;
  }

  /**
   * Runs a recursive algorithm to build a lookup map for quickly finding
   * potential CURIEs.
   *
   * @param iriMap the map to build.
   * @param key the current key in the map to work on.
   * @param idx the index into the IRI to compare.
   */
  function _buildIriMap(iriMap, key, idx) {
    var entries = iriMap[key];
    var next = iriMap[key] = {};

    var iri = void 0;
    var letter = void 0;
    for (var i = 0; i < entries.length; ++i) {
      iri = entries[i].iri;
      if (idx >= iri.length) {
        letter = '';
      } else {
        letter = iri[idx];
      }
      if (letter in next) {
        next[letter].push(entries[i]);
      } else {
        next[letter] = [entries[i]];
      }
    }

    for (var _key in next) {
      if (_key === '') {
        continue;
      }
      _buildIriMap(next, _key, idx + 1);
    }
  }

  /**
   * Adds the term for the given entry if not already added.
   *
   * @param term the term to add.
   * @param entry the inverse context typeOrLanguage entry to add to.
   * @param typeOrLanguageValue the key in the entry to add to.
   */
  function _addPreferredTerm(term, entry, typeOrLanguageValue) {
    if (!(typeOrLanguageValue in entry)) {
      entry[typeOrLanguageValue] = term;
    }
  }

  /**
   * Clones an active context, creating a child active context.
   *
   * @return a clone (child) of the active context.
   */
  function _cloneActiveContext() {
    var child = {};
    child['@base'] = this['@base'];
    child.mappings = util.clone(this.mappings);
    child.clone = this.clone;
    child.inverse = null;
    child.getInverse = this.getInverse;
    if ('@language' in this) {
      child['@language'] = this['@language'];
    }
    if ('@vocab' in this) {
      child['@vocab'] = this['@vocab'];
    }
    return child;
  }
};

/**
 * Gets the value for the given active context key and type, null if none is
 * set.
 *
 * @param ctx the active context.
 * @param key the context key.
 * @param [type] the type of value to get (eg: '@id', '@type'), if not
 *          specified gets the entire entry for a key, null if not found.
 *
 * @return the value.
 */
api.getContextValue = function (ctx, key, type) {
  // return null for invalid key
  if (key === null) {
    return null;
  }

  // get specific entry information
  if (ctx.mappings[key]) {
    var entry = ctx.mappings[key];

    if (_isUndefined(type)) {
      // return whole entry
      return entry;
    }
    if (type in entry) {
      // return entry value for type
      return entry[type];
    }
  }

  // get default language
  if (type === '@language' && type in ctx) {
    return ctx[type];
  }

  return null;
};

/**
 * Retrieves external @context URLs using the given document loader. Every
 * instance of @context in the input that refers to a URL will be replaced
 * with the JSON @context found at that URL.
 *
 * @param input the JSON-LD input with possible contexts.
 * @param options the options to use:
 *          documentLoader(url, [callback(err, remoteDoc)]) the document loader.
 * @param callback(err, input) called once the operation completes.
 */
api.getAllContexts = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(input, options) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', _retrieveContextUrls(input, options));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * Returns whether or not the given value is a keyword.
 *
 * @param v the value to check.
 *
 * @return true if the value is a keyword, false if not.
 */
api.isKeyword = function (v) {
  if (!_isString(v)) {
    return false;
  }
  switch (v) {
    case '@base':
    case '@container':
    case '@context':
    case '@default':
    case '@embed':
    case '@explicit':
    case '@graph':
    case '@id':
    case '@index':
    case '@language':
    case '@list':
    case '@omitDefault':
    case '@preserve':
    case '@requireAll':
    case '@reverse':
    case '@set':
    case '@type':
    case '@value':
    case '@version':
    case '@vocab':
      return true;
  }
  return false;
};

function _findContextUrls(input, urls, replace, base) {
  if (_isArray(input)) {
    for (var i = 0; i < input.length; ++i) {
      _findContextUrls(input[i], urls, replace, base);
    }
    return;
  }

  if (!_isObject(input)) {
    // no @context URLs can be found in non-object input
    return;
  }

  // input is an object
  for (var key in input) {
    if (key !== '@context') {
      _findContextUrls(input[key], urls, replace, base);
      continue;
    }

    // get @context
    var ctx = input[key];

    if (_isArray(ctx)) {
      // array @context
      var length = ctx.length;
      for (var _i = 0; _i < length; ++_i) {
        var _ctx = ctx[_i];
        if (_isString(_ctx)) {
          _ctx = prependBase(base, _ctx);
          // replace w/@context if requested
          if (replace) {
            if (urls[_ctx] !== false) {
              _ctx = urls[_ctx];
              if (_isArray(_ctx)) {
                // add flattened context
                Array.prototype.splice.apply(ctx, [_i, 1].concat(_ctx));
                _i += _ctx.length - 1;
                length = ctx.length;
              } else {
                ctx[_i] = _ctx;
              }
            }
          } else if (!(_ctx in urls)) {
            // @context URL found
            urls[_ctx] = false;
          }
        }
      }
    } else if (_isString(ctx)) {
      // string @context
      ctx = prependBase(base, ctx);
      // replace w/@context if requested
      if (replace) {
        if (urls[ctx] !== false) {
          input[key] = urls[ctx];
        }
      } else if (!(ctx in urls)) {
        // @context URL found
        urls[ctx] = false;
      }
    }
  }
}

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1);
var hide = __webpack_require__(10);
var has = __webpack_require__(8);
var SRC = __webpack_require__(19)('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__(4).inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(52);
var defined = __webpack_require__(35);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 19 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 20 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(55);
var enumBugKeys = __webpack_require__(39);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 23 */
/***/ (function(module, exports) {

/**
 * Node.js module for Forge.
 *
 * @author Dave Longley
 *
 * Copyright 2011-2016 Digital Bazaar, Inc.
 */
module.exports = {
  // default options
  options: {
    usePureJavaScript: false
  }
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */


var RDF = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#';
var XSD = 'http://www.w3.org/2001/XMLSchema#';

module.exports = {
  LINK_HEADER_REL: 'http://www.w3.org/ns/json-ld#context',

  RDF: RDF,
  RDF_LIST: RDF + 'List',
  RDF_FIRST: RDF + 'first',
  RDF_REST: RDF + 'rest',
  RDF_NIL: RDF + 'nil',
  RDF_TYPE: RDF + 'type',
  RDF_PLAIN_LITERAL: RDF + 'PlainLiteral',
  RDF_XML_LITERAL: RDF + 'XMLLiteral',
  RDF_OBJECT: RDF + 'object',
  RDF_LANGSTRING: RDF + 'langString',

  XSD: XSD,
  XSD_BOOLEAN: XSD + 'boolean',
  XSD_DOUBLE: XSD + 'double',
  XSD_INTEGER: XSD + 'integer',
  XSD_STRING: XSD + 'string'
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */


var types = __webpack_require__(3);

var api = {};
module.exports = api;

// define URL parser
// parseUri 1.2.2
// (c) Steven Levithan <stevenlevithan.com>
// MIT License
// with local jsonld.js modifications
api.parsers = {
  simple: {
    // RFC 3986 basic parts
    keys: ['href', 'scheme', 'authority', 'path', 'query', 'fragment'],
    regex: /^(?:([^:\/?#]+):)?(?:\/\/([^\/?#]*))?([^?#]*)(?:\?([^#]*))?(?:#(.*))?/
  },
  full: {
    keys: ['href', 'protocol', 'scheme', 'authority', 'auth', 'user', 'password', 'hostname', 'port', 'path', 'directory', 'file', 'query', 'fragment'],
    regex: /^(([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?(?:(((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/
  }
};
api.parse = function (str, parser) {
  var parsed = {};
  var o = api.parsers[parser || 'full'];
  var m = o.regex.exec(str);
  var i = o.keys.length;
  while (i--) {
    parsed[o.keys[i]] = m[i] === undefined ? null : m[i];
  }

  // remove default ports in found in URLs
  if (parsed.scheme === 'https' && parsed.port === '443' || parsed.scheme === 'http' && parsed.port === '80') {
    parsed.href = parsed.href.replace(':' + parsed.port, '');
    parsed.authority = parsed.authority.replace(':' + parsed.port, '');
    parsed.port = null;
  }

  parsed.normalizedPath = api.removeDotSegments(parsed.path);
  return parsed;
};

/**
 * Prepends a base IRI to the given relative IRI.
 *
 * @param base the base IRI.
 * @param iri the relative IRI.
 *
 * @return the absolute IRI.
 */
api.prependBase = function (base, iri) {
  // skip IRI processing
  if (base === null) {
    return iri;
  }
  // already an absolute IRI
  if (iri.indexOf(':') !== -1) {
    return iri;
  }

  // parse base if it is a string
  if (types.isString(base)) {
    base = api.parse(base || '');
  }

  // parse given IRI
  var rel = api.parse(iri);

  // per RFC3986 5.2.2
  var transform = {
    protocol: base.protocol || ''
  };

  if (rel.authority !== null) {
    transform.authority = rel.authority;
    transform.path = rel.path;
    transform.query = rel.query;
  } else {
    transform.authority = base.authority;

    if (rel.path === '') {
      transform.path = base.path;
      if (rel.query !== null) {
        transform.query = rel.query;
      } else {
        transform.query = base.query;
      }
    } else {
      if (rel.path.indexOf('/') === 0) {
        // IRI represents an absolute path
        transform.path = rel.path;
      } else {
        // merge paths
        var path = base.path;

        // append relative path to the end of the last directory from base
        path = path.substr(0, path.lastIndexOf('/') + 1);
        if (path.length > 0 && path.substr(-1) !== '/') {
          path += '/';
        }
        path += rel.path;

        transform.path = path;
      }
      transform.query = rel.query;
    }
  }

  if (rel.path !== '') {
    // remove slashes and dots in path
    transform.path = api.removeDotSegments(transform.path);
  }

  // construct URL
  var rval = transform.protocol;
  if (transform.authority !== null) {
    rval += '//' + transform.authority;
  }
  rval += transform.path;
  if (transform.query !== null) {
    rval += '?' + transform.query;
  }
  if (rel.fragment !== null) {
    rval += '#' + rel.fragment;
  }

  // handle empty base
  if (rval === '') {
    rval = './';
  }

  return rval;
};

/**
 * Removes a base IRI from the given absolute IRI.
 *
 * @param base the base IRI.
 * @param iri the absolute IRI.
 *
 * @return the relative IRI if relative to base, otherwise the absolute IRI.
 */
api.removeBase = function (base, iri) {
  // skip IRI processing
  if (base === null) {
    return iri;
  }

  if (types.isString(base)) {
    base = api.parse(base || '');
  }

  // establish base root
  var root = '';
  if (base.href !== '') {
    root += (base.protocol || '') + '//' + (base.authority || '');
  } else if (iri.indexOf('//')) {
    // support network-path reference with empty base
    root += '//';
  }

  // IRI not relative to base
  if (iri.indexOf(root) !== 0) {
    return iri;
  }

  // remove root from IRI and parse remainder
  var rel = api.parse(iri.substr(root.length));

  // remove path segments that match (do not remove last segment unless there
  // is a hash or query)
  var baseSegments = base.normalizedPath.split('/');
  var iriSegments = rel.normalizedPath.split('/');
  var last = rel.fragment || rel.query ? 0 : 1;
  while (baseSegments.length > 0 && iriSegments.length > last) {
    if (baseSegments[0] !== iriSegments[0]) {
      break;
    }
    baseSegments.shift();
    iriSegments.shift();
  }

  // use '../' for each non-matching base segment
  var rval = '';
  if (baseSegments.length > 0) {
    // don't count the last segment (if it ends with '/' last path doesn't
    // count and if it doesn't end with '/' it isn't a path)
    baseSegments.pop();
    for (var i = 0; i < baseSegments.length; ++i) {
      rval += '../';
    }
  }

  // prepend remaining segments
  rval += iriSegments.join('/');

  // add query and hash
  if (rel.query !== null) {
    rval += '?' + rel.query;
  }
  if (rel.fragment !== null) {
    rval += '#' + rel.fragment;
  }

  // handle empty base
  if (rval === '') {
    rval = './';
  }

  return rval;
};

/**
 * Removes dot segments from a URL path.
 *
 * @param path the path to remove dot segments from.
 */
api.removeDotSegments = function (path) {
  // RFC 3986 5.2.4 (reworked)

  // empty path shortcut
  if (path.length === 0) {
    return '';
  }

  var input = path.split('/');
  var output = [];

  while (input.length > 0) {
    var next = input.shift();
    var done = input.length === 0;

    if (next === '.') {
      if (done) {
        // ensure output has trailing /
        output.push('');
      }
      continue;
    }

    if (next === '..') {
      output.pop();
      if (done) {
        // ensure output has trailing /
        output.push('');
      }
      continue;
    }

    output.push(next);
  }

  // ensure output has leading /
  if (output.length > 0 && output[0] !== '') {
    output.unshift('');
  }
  if (output.length === 1 && output[0] === '') {
    return '/';
  }

  return output.join('/');
};

// TODO: time better isAbsolute/isRelative checks using full regexes:
// http://jmrware.com/articles/2009/uri_regexp/URI_regex.html

// regex to check for absolute IRI (starting scheme and ':') or blank node IRI
var isAbsoluteRegex = /^([A-Za-z][A-Za-z0-9+-.]*|_):/;

/**
 * Returns true if the given value is an absolute IRI or blank node IRI, false
 * if not.
 * Note: This weak check only checks for a correct starting scheme.
 *
 * @param v the value to check.
 *
 * @return true if the value is an absolute IRI, false if not.
 */
api.isAbsolute = function (v) {
  return types.isString(v) && isAbsoluteRegex.test(v);
};

/**
 * Returns true if the given value is a relative IRI, false if not.
 * Note: this is a weak check.
 *
 * @param v the value to check.
 *
 * @return true if the value is a relative IRI, false if not.
 */
api.isRelative = function (v) {
  return types.isString(v);
};

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(28);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 29 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = false;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(11).f;
var has = __webpack_require__(8);
var TAG = __webpack_require__(0)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */


var _require = __webpack_require__(15),
    isKeyword = _require.isKeyword;

var graphTypes = __webpack_require__(5);
var types = __webpack_require__(3);
var util = __webpack_require__(2);
var JsonLdError = __webpack_require__(6);

var api = {};
module.exports = api;

/**
 * Creates a merged JSON-LD node map (node ID => node).
 *
 * @param input the expanded JSON-LD to create a node map of.
 * @param [options] the options to use:
 *          [issuer] a jsonld.IdentifierIssuer to use to label blank nodes.
 *
 * @return the node map.
 */
api.createMergedNodeMap = function (input, options) {
  options = options || {};

  // produce a map of all subjects and name each bnode
  var issuer = options.issuer || new util.IdentifierIssuer('_:b');
  var graphs = { '@default': {} };
  api.createNodeMap(input, graphs, '@default', issuer);

  // add all non-default graphs to default graph
  return api.mergeNodeMaps(graphs);
};

/**
 * Recursively flattens the subjects in the given JSON-LD expanded input
 * into a node map.
 *
 * @param input the JSON-LD expanded input.
 * @param graphs a map of graph name to subject map.
 * @param graph the name of the current graph.
 * @param issuer the blank node identifier issuer.
 * @param name the name assigned to the current input if it is a bnode.
 * @param list the list to append to, null for none.
 */
api.createNodeMap = function (input, graphs, graph, issuer, name, list) {
  // recurse through array
  if (types.isArray(input)) {
    for (var i = 0; i < input.length; ++i) {
      api.createNodeMap(input[i], graphs, graph, issuer, undefined, list);
    }
    return;
  }

  // add non-object to list
  if (!types.isObject(input)) {
    if (list) {
      list.push(input);
    }
    return;
  }

  // add values to list
  if (graphTypes.isValue(input)) {
    if ('@type' in input) {
      var type = input['@type'];
      // rename @type blank node
      if (type.indexOf('_:') === 0) {
        input['@type'] = type = issuer.getId(type);
      }
    }
    if (list) {
      list.push(input);
    }
    return;
  }

  // Note: At this point, input must be a subject.

  // spec requires @type to be named first, so assign names early
  if ('@type' in input) {
    var _types = input['@type'];
    for (var _i = 0; _i < _types.length; ++_i) {
      var _type = _types[_i];
      if (_type.indexOf('_:') === 0) {
        issuer.getId(_type);
      }
    }
  }

  // get name for subject
  if (types.isUndefined(name)) {
    name = graphTypes.isBlankNode(input) ? issuer.getId(input['@id']) : input['@id'];
  }

  // add subject reference to list
  if (list) {
    list.push({ '@id': name });
  }

  // create new subject or merge into existing one
  var subjects = graphs[graph];
  var subject = subjects[name] = subjects[name] || {};
  subject['@id'] = name;
  var properties = Object.keys(input).sort();
  for (var pi = 0; pi < properties.length; ++pi) {
    var property = properties[pi];

    // skip @id
    if (property === '@id') {
      continue;
    }

    // handle reverse properties
    if (property === '@reverse') {
      var referencedNode = { '@id': name };
      var reverseMap = input['@reverse'];
      for (var reverseProperty in reverseMap) {
        var items = reverseMap[reverseProperty];
        for (var ii = 0; ii < items.length; ++ii) {
          var item = items[ii];
          var itemName = item['@id'];
          if (graphTypes.isBlankNode(item)) {
            itemName = issuer.getId(itemName);
          }
          api.createNodeMap(item, graphs, graph, issuer, itemName);
          util.addValue(subjects[itemName], reverseProperty, referencedNode, { propertyIsArray: true, allowDuplicate: false });
        }
      }
      continue;
    }

    // recurse into graph
    if (property === '@graph') {
      // add graph subjects map entry
      if (!(name in graphs)) {
        graphs[name] = {};
      }
      var g = graph === '@merged' ? graph : name;
      api.createNodeMap(input[property], graphs, g, issuer);
      continue;
    }

    // copy non-@type keywords
    if (property !== '@type' && isKeyword(property)) {
      if (property === '@index' && property in subject && (input[property] !== subject[property] || input[property]['@id'] !== subject[property]['@id'])) {
        throw new JsonLdError('Invalid JSON-LD syntax; conflicting @index property detected.', 'jsonld.SyntaxError', { code: 'conflicting indexes', subject: subject });
      }
      subject[property] = input[property];
      continue;
    }

    // iterate over objects
    var objects = input[property];

    // if property is a bnode, assign it a new id
    if (property.indexOf('_:') === 0) {
      property = issuer.getId(property);
    }

    // ensure property is added for empty arrays
    if (objects.length === 0) {
      util.addValue(subject, property, [], { propertyIsArray: true });
      continue;
    }
    for (var oi = 0; oi < objects.length; ++oi) {
      var o = objects[oi];

      if (property === '@type') {
        // rename @type blank nodes
        o = o.indexOf('_:') === 0 ? issuer.getId(o) : o;
      }

      // handle embedded subject or subject reference
      if (graphTypes.isSubject(o) || graphTypes.isSubjectReference(o)) {
        // relabel blank node @id
        var id = graphTypes.isBlankNode(o) ? issuer.getId(o['@id']) : o['@id'];

        // add reference and recurse
        util.addValue(subject, property, { '@id': id }, { propertyIsArray: true, allowDuplicate: false });
        api.createNodeMap(o, graphs, graph, issuer, id);
      } else if (graphTypes.isList(o)) {
        // handle @list
        var _list = [];
        api.createNodeMap(o['@list'], graphs, graph, issuer, name, _list);
        o = { '@list': _list };
        util.addValue(subject, property, o, { propertyIsArray: true, allowDuplicate: false });
      } else {
        // handle @value
        api.createNodeMap(o, graphs, graph, issuer, name);
        util.addValue(subject, property, o, { propertyIsArray: true, allowDuplicate: false });
      }
    }
  }
};

api.mergeNodeMaps = function (graphs) {
  // add all non-default graphs to default graph
  var defaultGraph = graphs['@default'];
  var graphNames = Object.keys(graphs).sort();
  for (var i = 0; i < graphNames.length; ++i) {
    var graphName = graphNames[i];
    if (graphName === '@default') {
      continue;
    }
    var nodeMap = graphs[graphName];
    var subject = defaultGraph[graphName];
    if (!subject) {
      defaultGraph[graphName] = subject = {
        '@id': graphName,
        '@graph': []
      };
    } else if (!('@graph' in subject)) {
      subject['@graph'] = [];
    }
    var graph = subject['@graph'];
    var ids = Object.keys(nodeMap).sort();
    for (var ii = 0; ii < ids.length; ++ii) {
      var node = nodeMap[ids[ii]];
      // only add full subjects
      if (!graphTypes.isSubjectReference(node)) {
        graph.push(node);
      }
    }
  }
  return defaultGraph;
};

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(12);
var document = __webpack_require__(1).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(12);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 35 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 36 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(37)('keys');
var uid = __webpack_require__(19);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 39 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 40 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(20);
var TAG = __webpack_require__(0)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(28);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1);
var core = __webpack_require__(4);
var LIBRARY = __webpack_require__(30);
var wksExt = __webpack_require__(65);
var defineProperty = __webpack_require__(11).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * An implementation of the RDF Dataset Normalization specification.
 * This library works in the browser and node.js.
 *
 * BSD 3-Clause License
 * Copyright (c) 2016-2017 Digital Bazaar, Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 *
 * Redistributions in binary form must reproduce the above copyright
 * notice, this list of conditions and the following disclaimer in the
 * documentation and/or other materials provided with the distribution.
 *.now
 * Neither the name of the Digital Bazaar, Inc. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
 * IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED
 * TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
 * PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */


function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var util = __webpack_require__(14);
var URDNA2015 = __webpack_require__(68);
var URGNA2012 = __webpack_require__(119);
var URDNA2015Sync = __webpack_require__(72);
var URGNA2012Sync = __webpack_require__(120);

var URDNA2015Native = void 0;
try {
  URDNA2015Native = __webpack_require__(121)('urdna2015');
} catch (e) {}

var api = {};
module.exports = api;

// expose helpers
api.NQuads = __webpack_require__(47);
api.IdentifierIssuer = __webpack_require__(45);

/**
 * Asynchronously canonizes an RDF dataset.
 *
 * @param dataset the dataset to canonize.
 * @param [options] the options to use:
 *          [algorithm] the canonicalization algorithm to use, `URDNA2015` or
 *            `URGNA2012` (default: `URGNA2012`).
 *          [usePureJavaScript] only use JavaScript implementation
 *            (default: false).
 * @param callback(err, canonical) called once the operation completes.
 *
 * @return a Promise that resolves to the canonicalized RDF Dataset.
 */
api.canonize = util.callbackify(function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dataset, options) {
    var callback, promise;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            callback = void 0;
            promise = new Promise(function (resolve, reject) {
              callback = function callback(err, canonical) {
                if (err) {
                  return reject(err);
                }

                /*if(options.format === 'application/nquads') {
                  canonical = canonical.join('');
                }
                canonical = _parseNQuads(canonical.join(''));*/

                resolve(canonical);
              };
            });

            // back-compat with legacy dataset

            if (!Array.isArray(dataset)) {
              dataset = api.NQuads.legacyDatasetToQuads(dataset);
            }

            // TODO: convert algorithms to Promise-based async

            if (!(options.algorithm === 'URDNA2015')) {
              _context.next = 7;
              break;
            }

            if (URDNA2015Native && !options.usePureJavaScript) {
              URDNA2015Native.main({ dataset: dataset }, callback);
            } else {
              new URDNA2015(options).main(dataset, callback);
            }
            _context.next = 12;
            break;

          case 7:
            if (!(options.algorithm === 'URGNA2012')) {
              _context.next = 11;
              break;
            }

            new URGNA2012(options).main(dataset, callback);
            _context.next = 12;
            break;

          case 11:
            throw new Error('Invalid RDF Dataset Canonicalization algorithm: ' + options.algorithm);

          case 12:
            return _context.abrupt('return', promise);

          case 13:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

/**
 * Synchronously canonizes an RDF dataset.
 *
 * @param dataset the dataset to canonize.
 * @param [options] the options to use:
 *          [algorithm] the canonicalization algorithm to use, `URDNA2015` or
 *            `URGNA2012` (default: `URGNA2012`).
 *
 * @return the RDF dataset in canonical form.
 */
api.canonizeSync = function (dataset, options) {
  // back-compat with legacy dataset
  if (!Array.isArray(dataset)) {
    dataset = api.NQuads.legacyDatasetToQuads(dataset);
  }

  if (options.algorithm === 'URDNA2015') {
    if (URDNA2015Native && !options.usePureJavaScript) {
      return URDNA2015Native.mainSync({ dataset: dataset });
    }
    return new URDNA2015Sync(options).main(dataset);
  }
  if (options.algorithm === 'URGNA2012') {
    return new URGNA2012Sync(options).main(dataset);
  }
  throw new Error('Invalid RDF Dataset Canonicalization algorithm: ' + options.algorithm);
};

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright (c) 2016-2017 Digital Bazaar, Inc. All rights reserved.
 */


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var util = __webpack_require__(14);

module.exports = function () {
  /**
   * Creates a new IdentifierIssuer. A IdentifierIssuer issues unique
   * identifiers, keeping track of any previously issued identifiers.
   *
   * @param prefix the prefix to use ('<prefix><counter>').
   */
  function IdentifierIssuer(prefix) {
    _classCallCheck(this, IdentifierIssuer);

    this.prefix = prefix;
    this.counter = 0;
    this.existing = {};
  }

  /**
   * Copies this IdentifierIssuer.
   *
   * @return a copy of this IdentifierIssuer.
   */


  _createClass(IdentifierIssuer, [{
    key: 'clone',
    value: function clone() {
      var copy = new IdentifierIssuer(this.prefix);
      copy.counter = this.counter;
      copy.existing = util.clone(this.existing);
      return copy;
    }

    /**
     * Gets the new identifier for the given old identifier, where if no old
     * identifier is given a new identifier will be generated.
     *
     * @param [old] the old identifier to get the new identifier for.
     *
     * @return the new identifier.
     */

  }, {
    key: 'getId',
    value: function getId(old) {
      // return existing old identifier
      if (old && old in this.existing) {
        return this.existing[old];
      }

      // get next identifier
      var identifier = this.prefix + this.counter;
      this.counter += 1;

      // save mapping
      if (old) {
        this.existing[old] = identifier;
      }

      return identifier;
    }

    /**
     * Returns true if the given old identifer has already been assigned a new
     * identifier.
     *
     * @param old the old identifier to check.
     *
     * @return true if the old identifier has been assigned a new identifier, false
     *   if not.
     */

  }, {
    key: 'hasId',
    value: function hasId(old) {
      return old in this.existing;
    }
  }]);

  return IdentifierIssuer;
}();

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Node.js module for Forge message digests.
 *
 * @author Dave Longley
 *
 * Copyright 2011-2017 Digital Bazaar, Inc.
 */
var forge = __webpack_require__(23);

module.exports = forge.md = forge.md || {};
forge.md.algorithms = forge.md.algorithms || {};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright (c) 2016-2017 Digital Bazaar, Inc. All rights reserved.
 */


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var util = __webpack_require__(116);

var TERMS = ['subject', 'predicate', 'object', 'graph'];
var RDF = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#';
var RDF_LANGSTRING = RDF + 'langString';
var XSD_STRING = 'http://www.w3.org/2001/XMLSchema#string';

// build regexes
var REGEX = {};
(function () {
  var iri = '(?:<([^:]+:[^>]*)>)';
  var bnode = '(_:(?:[A-Za-z0-9]+))';
  var plain = '"([^"\\\\]*(?:\\\\.[^"\\\\]*)*)"';
  var datatype = '(?:\\^\\^' + iri + ')';
  var language = '(?:@([a-z]+(?:-[a-z0-9]+)*))';
  var literal = '(?:' + plain + '(?:' + datatype + '|' + language + ')?)';
  var ws = '[ \\t]+';
  var wso = '[ \\t]*';

  // define quad part regexes
  var subject = '(?:' + iri + '|' + bnode + ')' + ws;
  var property = iri + ws;
  var object = '(?:' + iri + '|' + bnode + '|' + literal + ')' + wso;
  var graphName = '(?:\\.|(?:(?:' + iri + '|' + bnode + ')' + wso + '\\.))';

  // end of line and empty regexes
  REGEX.eoln = /(?:\r\n)|(?:\n)|(?:\r)/g;
  REGEX.empty = new RegExp('^' + wso + '$');

  // full quad regex
  REGEX.quad = new RegExp('^' + wso + subject + property + object + graphName + wso + '$');
})();

module.exports = function () {
  function NQuads() {
    _classCallCheck(this, NQuads);
  }

  _createClass(NQuads, null, [{
    key: 'parse',

    /**
     * Parses RDF in the form of N-Quads.
     *
     * @param input the N-Quads input to parse.
     *
     * @return an RDF dataset (an array of quads per http://rdf.js.org/).
     */
    value: function parse(input) {
      // build RDF dataset
      var dataset = [];

      var graphs = {};

      // split N-Quad input into lines
      var lines = input.split(REGEX.eoln);
      var lineNumber = 0;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = lines[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var line = _step.value;

          lineNumber++;

          // skip empty lines
          if (REGEX.empty.test(line)) {
            continue;
          }

          // parse quad
          var match = line.match(REGEX.quad);
          if (match === null) {
            throw new Error('N-Quads parse error on line ' + lineNumber + '.');
          }

          // create RDF quad
          var quad = {};

          // get subject
          if (!util.isUndefined(match[1])) {
            quad.subject = { termType: 'NamedNode', value: match[1] };
          } else {
            quad.subject = { termType: 'BlankNode', value: match[2] };
          }

          // get predicate
          quad.predicate = { termType: 'NamedNode', value: match[3] };

          // get object
          if (!util.isUndefined(match[4])) {
            quad.object = { termType: 'NamedNode', value: match[4] };
          } else if (!util.isUndefined(match[5])) {
            quad.object = { termType: 'BlankNode', value: match[5] };
          } else {
            quad.object = {
              termType: 'Literal',
              value: undefined,
              datatype: {
                termType: 'NamedNode'
              }
            };
            if (!util.isUndefined(match[7])) {
              quad.object.datatype.value = match[7];
            } else if (!util.isUndefined(match[8])) {
              quad.object.datatype.value = RDF_LANGSTRING;
              quad.object.language = match[8];
            } else {
              quad.object.datatype.value = XSD_STRING;
            }
            var unescaped = match[6].replace(/\\"/g, '"').replace(/\\t/g, '\t').replace(/\\n/g, '\n').replace(/\\r/g, '\r').replace(/\\\\/g, '\\');
            quad.object.value = unescaped;
          }

          // get graph
          if (!util.isUndefined(match[9])) {
            quad.graph = {
              termType: 'NamedNode',
              value: match[9]
            };
          } else if (!util.isUndefined(match[10])) {
            quad.graph = {
              termType: 'BlankNode',
              value: match[10]
            };
          } else {
            quad.graph = {
              termType: 'DefaultGraph',
              value: ''
            };
          }

          // only add quad if it is unique in its graph
          if (!(quad.graph.value in graphs)) {
            graphs[quad.graph.value] = [quad];
            dataset.push(quad);
          } else {
            var unique = true;
            var quads = graphs[quad.graph.value];
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (var _iterator2 = quads[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var q = _step2.value;

                if (_compareTriples(q, quad)) {
                  unique = false;
                  break;
                }
              }
            } catch (err) {
              _didIteratorError2 = true;
              _iteratorError2 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
                }
              } finally {
                if (_didIteratorError2) {
                  throw _iteratorError2;
                }
              }
            }

            if (unique) {
              quads.push(quad);
              dataset.push(quad);
            }
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return dataset;
    }

    /**
     * Converts an RDF dataset to N-Quads.
     *
     * @param dataset (array of quads) the RDF dataset to convert.
     *
     * @return the N-Quads string.
     */

  }, {
    key: 'serialize',
    value: function serialize(dataset) {
      if (!Array.isArray(dataset)) {
        dataset = NQuads.legacyDatasetToQuads(dataset);
      }
      var quads = [];
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = dataset[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var quad = _step3.value;

          quads.push(NQuads.serializeQuad(quad));
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      return quads.sort().join('');
    }

    /**
     * Converts an RDF quad to an N-Quad string (a single quad).
     *
     * @param quad the RDF quad convert.
     *
     * @return the N-Quad string.
     */

  }, {
    key: 'serializeQuad',
    value: function serializeQuad(quad) {
      var s = quad.subject;
      var p = quad.predicate;
      var o = quad.object;
      var g = quad.graph;

      var nquad = '';

      // subject and predicate can only be NamedNode or BlankNode
      [s, p].forEach(function (term) {
        if (term.termType === 'NamedNode') {
          nquad += '<' + term.value + '>';
        } else {
          nquad += term.value;
        }
        nquad += ' ';
      });

      // object is NamedNode, BlankNode, or Literal
      if (o.termType === 'NamedNode') {
        nquad += '<' + o.value + '>';
      } else if (o.termType === 'BlankNode') {
        nquad += o.value;
      } else {
        var escaped = o.value.replace(/\\/g, '\\\\').replace(/\t/g, '\\t').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\"/g, '\\"');
        nquad += '"' + escaped + '"';
        if (o.datatype.value === RDF_LANGSTRING) {
          if (o.language) {
            nquad += '@' + o.language;
          }
        } else if (o.datatype.value !== XSD_STRING) {
          nquad += '^^<' + o.datatype.value + '>';
        }
      }

      // graph can only be NamedNode or BlankNode (or DefaultGraph, but that
      // does not add to `nquad`)
      if (g.termType === 'NamedNode') {
        nquad += ' <' + g.value + '>';
      } else if (g.termType === 'BlankNode') {
        nquad += ' ' + g.value;
      }

      nquad += ' .\n';
      return nquad;
    }

    /**
     * Converts a legacy-formatted dataset to an array of quads dataset per
     * http://rdf.js.org/.
     *
     * @param dataset the legacy dataset to convert.
     *
     * @return the array of quads dataset.
     */

  }, {
    key: 'legacyDatasetToQuads',
    value: function legacyDatasetToQuads(dataset) {
      var quads = [];

      var termTypeMap = {
        'blank node': 'BlankNode',
        'IRI': 'NamedNode',
        'literal': 'Literal'
      };

      var _loop = function _loop(graphName) {
        var triples = dataset[graphName];
        triples.forEach(function (triple) {
          var quad = {};
          for (var componentName in triple) {
            var oldComponent = triple[componentName];
            var newComponent = {
              termType: termTypeMap[oldComponent.type],
              value: oldComponent.value
            };
            if (newComponent.termType === 'Literal') {
              newComponent.datatype = {
                termType: 'NamedNode'
              };
              if ('datatype' in oldComponent) {
                newComponent.datatype.value = oldComponent.datatype;
              }
              if ('language' in oldComponent) {
                if (!('datatype' in oldComponent)) {
                  newComponent.datatype.value = RDF_LANGSTRING;
                }
                newComponent.language = oldComponent.language;
              } else if (!('datatype' in oldComponent)) {
                newComponent.datatype.value = XSD_STRING;
              }
            }
            quad[componentName] = newComponent;
          }
          if (graphName === '@default') {
            quad.graph = {
              termType: 'DefaultGraph',
              value: ''
            };
          } else {
            quad.graph = {
              termType: graphName.startsWith('_:') ? 'BlankNode' : 'NamedNode',
              value: graphName
            };
          }
          quads.push(quad);
        });
      };

      for (var graphName in dataset) {
        _loop(graphName);
      }

      return quads;
    }
  }]);

  return NQuads;
}();

/**
 * Compares two RDF triples for equality.
 *
 * @param t1 the first triple.
 * @param t2 the second triple.
 *
 * @return true if the triples are the same, false if not.
 */
function _compareTriples(t1, t2) {
  for (var k in t1) {
    if (t1[k].termType !== t2[k].termType || t1[k].value !== t2[k].value) {
      return false;
    }
  }
  if (t1.termType !== 'Literal') {
    return true;
  }
  return t1.object.datatype.termType === t2.object.datatype.termType && t1.object.datatype.value === t2.object.datatype.value && t1.object.language === t2.object.language;
}

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Ignore module for browserify (see package.json)


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = __webpack_require__(2),
    callbackify = _require.callbackify,
    normalizeDocumentLoader = _require.normalizeDocumentLoader;

module.exports = function () {
  /**
   * Creates a simple queue for requesting documents.
   */
  function RequestQueue() {
    _classCallCheck(this, RequestQueue);

    this._requests = {};
    this.add = callbackify(this.add.bind(this));
  }

  _createClass(RequestQueue, [{
    key: 'wrapLoader',
    value: function wrapLoader(loader) {
      var self = this;
      self._loader = normalizeDocumentLoader(loader);
      return function (url) {
        return self.add.apply(self, arguments);
      };
    }
  }, {
    key: 'add',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
        var self, promise;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                self = this;
                promise = self._requests[url];

                if (!promise) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt('return', Promise.resolve(promise));

              case 4:

                // queue URL and load it
                promise = self._requests[url] = self._loader(url);

                _context.prev = 5;
                _context.next = 8;
                return promise;

              case 8:
                return _context.abrupt('return', _context.sent);

              case 9:
                _context.prev = 9;

                delete self._requests[url];
                return _context.finish(9);

              case 12:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[5,, 9, 12]]);
      }));

      function add(_x) {
        return _ref.apply(this, arguments);
      }

      return add;
    }()
  }]);

  return RequestQueue;
}();

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(13) && !__webpack_require__(18)(function () {
  return Object.defineProperty(__webpack_require__(33)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(17);
var toLength = __webpack_require__(53);
var toAbsoluteIndex = __webpack_require__(77);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(20);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(36);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__(0)('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__(10)(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(8);
var toIObject = __webpack_require__(17);
var arrayIndexOf = __webpack_require__(51)(false);
var IE_PROTO = __webpack_require__(38)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(35);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.3.6 Object.prototype.toString()
var classof = __webpack_require__(41);
var test = {};
test[__webpack_require__(0)('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  __webpack_require__(16)(Object.prototype, 'toString', function toString() {
    return '[object ' + classof(this) + ']';
  }, true);
}


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(30);
var $export = __webpack_require__(9);
var redefine = __webpack_require__(16);
var hide = __webpack_require__(10);
var has = __webpack_require__(8);
var Iterators = __webpack_require__(22);
var $iterCreate = __webpack_require__(84);
var setToStringTag = __webpack_require__(31);
var getPrototypeOf = __webpack_require__(86);
var ITERATOR = __webpack_require__(0)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = (!BUGGY && $native) || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(7);
var dPs = __webpack_require__(85);
var enumBugKeys = __webpack_require__(39);
var IE_PROTO = __webpack_require__(38)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(33)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(60).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(1).document;
module.exports = document && document.documentElement;


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(7);
var aFunction = __webpack_require__(28);
var SPECIES = __webpack_require__(0)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(27);
var invoke = __webpack_require__(96);
var html = __webpack_require__(60);
var cel = __webpack_require__(33);
var global = __webpack_require__(1);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(20)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 63 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(7);
var isObject = __webpack_require__(12);
var newPromiseCapability = __webpack_require__(42);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(0);


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(55);
var hiddenKeys = __webpack_require__(39).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 67 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright (c) 2016-2017 Digital Bazaar, Inc. All rights reserved.
 */


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AsyncAlgorithm = __webpack_require__(113);
var IdentifierIssuer = __webpack_require__(45);
var MessageDigest = __webpack_require__(69);
var Permutator = __webpack_require__(71);
var NQuads = __webpack_require__(47);
var util = __webpack_require__(14);

var POSITIONS = { 'subject': 's', 'object': 'o', 'graph': 'g' };

module.exports = function (_AsyncAlgorithm) {
  _inherits(URDNA2015, _AsyncAlgorithm);

  function URDNA2015(options) {
    _classCallCheck(this, URDNA2015);

    options = options || {};

    var _this = _possibleConstructorReturn(this, (URDNA2015.__proto__ || Object.getPrototypeOf(URDNA2015)).call(this, options));

    _this.name = 'URDNA2015';
    _this.options = Object.assign({}, options);
    _this.blankNodeInfo = {};
    _this.hashToBlankNodes = {};
    _this.canonicalIssuer = new IdentifierIssuer('_:c14n');
    _this.hashAlgorithm = 'sha256';
    _this.quads;
    return _this;
  }

  // 4.4) Normalization Algorithm


  _createClass(URDNA2015, [{
    key: 'main',
    value: function main(dataset, callback) {
      var self = this;
      self.schedule.start = Date.now();
      var result = void 0;
      self.quads = dataset;

      // 1) Create the normalization state.

      // Note: Optimize by generating non-normalized blank node map concurrently.
      var nonNormalized = {};

      self.waterfall([function (callback) {
        // 2) For every quad in input dataset:
        self.forEach(dataset, function (quad, idx, callback) {
          // 2.1) For each blank node that occurs in the quad, add a reference
          // to the quad using the blank node identifier in the blank node to
          // quads map, creating a new entry if necessary.
          self.forEachComponent(quad, function (component) {
            if (component.termType !== 'BlankNode') {
              return;
            }
            var id = component.value;
            if (id in self.blankNodeInfo) {
              self.blankNodeInfo[id].quads.push(quad);
            } else {
              nonNormalized[id] = true;
              self.blankNodeInfo[id] = { quads: [quad] };
            }
          });

          callback();
        }, callback);
      }, function (callback) {
        // 3) Create a list of non-normalized blank node identifiers
        // non-normalized identifiers and populate it using the keys from the
        // blank node to quads map.
        // Note: We use a map here and it was generated during step 2.

        // 4) Initialize simple, a boolean flag, to true.
        var simple = true;

        // 5) While simple is true, issue canonical identifiers for blank nodes:
        self.whilst(function () {
          return simple;
        }, function (callback) {
          // 5.1) Set simple to false.
          simple = false;

          // 5.2) Clear hash to blank nodes map.
          self.hashToBlankNodes = {};

          self.waterfall([function (callback) {
            // 5.3) For each blank node identifier identifier in
            // non-normalized identifiers:
            self.forEach(nonNormalized, function (value, id, callback) {
              // 5.3.1) Create a hash, hash, according to the Hash First
              // Degree Quads algorithm.
              self.hashFirstDegreeQuads(id, function (err, hash) {
                if (err) {
                  return callback(err);
                }
                // 5.3.2) Add hash and identifier to hash to blank nodes map,
                // creating a new entry if necessary.
                if (hash in self.hashToBlankNodes) {
                  self.hashToBlankNodes[hash].push(id);
                } else {
                  self.hashToBlankNodes[hash] = [id];
                }
                callback();
              });
            }, callback);
          }, function (callback) {
            // 5.4) For each hash to identifier list mapping in hash to blank
            // nodes map, lexicographically-sorted by hash:
            var hashes = Object.keys(self.hashToBlankNodes).sort();
            self.forEach(hashes, function (hash, i, callback) {
              // 5.4.1) If the length of identifier list is greater than 1,
              // continue to the next mapping.
              var idList = self.hashToBlankNodes[hash];
              if (idList.length > 1) {
                return callback();
              }

              // 5.4.2) Use the Issue Identifier algorithm, passing canonical
              // issuer and the single blank node identifier in identifier
              // list, identifier, to issue a canonical replacement identifier
              // for identifier.
              // TODO: consider changing `getId` to `issue`
              var id = idList[0];
              self.canonicalIssuer.getId(id);

              // 5.4.3) Remove identifier from non-normalized identifiers.
              delete nonNormalized[id];

              // 5.4.4) Remove hash from the hash to blank nodes map.
              delete self.hashToBlankNodes[hash];

              // 5.4.5) Set simple to true.
              simple = true;
              callback();
            }, callback);
          }], callback);
        }, callback);
      }, function (callback) {
        // 6) For each hash to identifier list mapping in hash to blank nodes
        // map, lexicographically-sorted by hash:
        var hashes = Object.keys(self.hashToBlankNodes).sort();
        self.forEach(hashes, function (hash, idx, callback) {
          // 6.1) Create hash path list where each item will be a result of
          // running the Hash N-Degree Quads algorithm.
          var hashPathList = [];

          // 6.2) For each blank node identifier identifier in identifier list:
          var idList = self.hashToBlankNodes[hash];
          self.waterfall([function (callback) {
            self.forEach(idList, function (id, idx, callback) {
              // 6.2.1) If a canonical identifier has already been issued for
              // identifier, continue to the next identifier.
              if (self.canonicalIssuer.hasId(id)) {
                return callback();
              }

              // 6.2.2) Create temporary issuer, an identifier issuer
              // initialized with the prefix _:b.
              var issuer = new IdentifierIssuer('_:b');

              // 6.2.3) Use the Issue Identifier algorithm, passing temporary
              // issuer and identifier, to issue a new temporary blank node
              // identifier for identifier.
              issuer.getId(id);

              // 6.2.4) Run the Hash N-Degree Quads algorithm, passing
              // temporary issuer, and append the result to the hash path
              // list.
              self.hashNDegreeQuads(id, issuer, function (err, result) {
                if (err) {
                  return callback(err);
                }
                hashPathList.push(result);
                callback();
              });
            }, callback);
          }, function (callback) {
            // 6.3) For each result in the hash path list,
            // lexicographically-sorted by the hash in result:
            // TODO: use `String.localeCompare`?
            hashPathList.sort(function (a, b) {
              return a.hash < b.hash ? -1 : a.hash > b.hash ? 1 : 0;
            });
            self.forEach(hashPathList, function (result, idx, callback) {
              // 6.3.1) For each blank node identifier, existing identifier,
              // that was issued a temporary identifier by identifier issuer
              // in result, issue a canonical identifier, in the same order,
              // using the Issue Identifier algorithm, passing canonical
              // issuer and existing identifier.
              for (var existing in result.issuer.existing) {
                self.canonicalIssuer.getId(existing);
              }
              callback();
            }, callback);
          }], callback);
        }, callback);
      }, function (callback) {
        /* Note: At this point all blank nodes in the set of RDF quads have been
        assigned canonical identifiers, which have been stored in the canonical
        issuer. Here each quad is updated by assigning each of its blank nodes
        its new identifier. */

        // 7) For each quad, quad, in input dataset:
        var normalized = [];
        self.waterfall([function (callback) {
          self.forEach(self.quads, function (quad, idx, callback) {
            // 7.1) Create a copy, quad copy, of quad and replace any existing
            // blank node identifiers using the canonical identifiers
            // previously issued by canonical issuer.
            // Note: We optimize away the copy here.
            self.forEachComponent(quad, function (component) {
              if (component.termType === 'BlankNode' && !component.value.startsWith(self.canonicalIssuer.prefix)) {
                component.value = self.canonicalIssuer.getId(component.value);
              }
            });
            // 7.2) Add quad copy to the normalized dataset.
            normalized.push(NQuads.serializeQuad(quad));
            callback();
          }, callback);
        }, function (callback) {
          // sort normalized output
          normalized.sort();

          // 8) Return the normalized dataset.
          result = normalized.join('');
          return callback();
        }], callback);
      }], function (err) {
        return callback(err, result);
      });
    }

    // 4.6) Hash First Degree Quads

  }, {
    key: 'hashFirstDegreeQuads',
    value: function hashFirstDegreeQuads(id, callback) {
      var self = this;

      // return cached hash
      var info = self.blankNodeInfo[id];
      if ('hash' in info) {
        return callback(null, info.hash);
      }

      // 1) Initialize nquads to an empty list. It will be used to store quads in
      // N-Quads format.
      var nquads = [];

      // 2) Get the list of quads quads associated with the reference blank node
      // identifier in the blank node to quads map.
      var quads = info.quads;

      // 3) For each quad quad in quads:
      self.forEach(quads, function (quad, idx, callback) {
        // 3.1) Serialize the quad in N-Quads format with the following special
        // rule:

        // 3.1.1) If any component in quad is an blank node, then serialize it
        // using a special identifier as follows:
        var copy = { predicate: quad.predicate };
        self.forEachComponent(quad, function (component, key) {
          // 3.1.2) If the blank node's existing blank node identifier matches the
          // reference blank node identifier then use the blank node identifier
          // _:a, otherwise, use the blank node identifier _:z.
          copy[key] = self.modifyFirstDegreeComponent(id, component, key);
        });
        nquads.push(NQuads.serializeQuad(copy));
        callback();
      }, function (err) {
        if (err) {
          return callback(err);
        }
        // 4) Sort nquads in lexicographical order.
        nquads.sort();

        // 5) Return the hash that results from passing the sorted, joined nquads
        // through the hash algorithm.
        var md = new MessageDigest(self.hashAlgorithm);
        for (var i = 0; i < nquads.length; ++i) {
          md.update(nquads[i]);
        }
        // TODO: represent as byte buffer instead to cut memory usage in half
        info.hash = md.digest();
        callback(null, info.hash);
      });
    }

    // 4.7) Hash Related Blank Node

  }, {
    key: 'hashRelatedBlankNode',
    value: function hashRelatedBlankNode(related, quad, issuer, position, callback) {
      var self = this;

      // 1) Set the identifier to use for related, preferring first the canonical
      // identifier for related if issued, second the identifier issued by issuer
      // if issued, and last, if necessary, the result of the Hash First Degree
      // Quads algorithm, passing related.
      var id = void 0;
      self.waterfall([function (callback) {
        if (self.canonicalIssuer.hasId(related)) {
          id = self.canonicalIssuer.getId(related);
          return callback();
        }
        if (issuer.hasId(related)) {
          id = issuer.getId(related);
          return callback();
        }
        self.hashFirstDegreeQuads(related, function (err, hash) {
          if (err) {
            return callback(err);
          }
          id = hash;
          callback();
        });
      }], function (err) {
        if (err) {
          return callback(err);
        }

        // 2) Initialize a string input to the value of position.
        // Note: We use a hash object instead.
        var md = new MessageDigest(self.hashAlgorithm);
        md.update(position);

        // 3) If position is not g, append <, the value of the predicate in quad,
        // and > to input.
        if (position !== 'g') {
          md.update(self.getRelatedPredicate(quad));
        }

        // 4) Append identifier to input.
        md.update(id);

        // 5) Return the hash that results from passing input through the hash
        // algorithm.
        // TODO: represent as byte buffer instead to cut memory usage in half
        return callback(null, md.digest());
      });
    }

    // 4.8) Hash N-Degree Quads

  }, {
    key: 'hashNDegreeQuads',
    value: function hashNDegreeQuads(id, issuer, callback) {
      var self = this;

      // 1) Create a hash to related blank nodes map for storing hashes that
      // identify related blank nodes.
      // Note: 2) and 3) handled within `createHashToRelated`
      var hashToRelated = void 0;
      var md = new MessageDigest(self.hashAlgorithm);
      self.waterfall([function (callback) {
        return self.createHashToRelated(id, issuer, function (err, result) {
          if (err) {
            return callback(err);
          }
          hashToRelated = result;
          callback();
        });
      }, function (callback) {
        // 4) Create an empty string, data to hash.
        // Note: We created a hash object `md` above instead.

        // 5) For each related hash to blank node list mapping in hash to
        // related blank nodes map, sorted lexicographically by related hash:
        var hashes = Object.keys(hashToRelated).sort();
        self.forEach(hashes, function (hash, idx, callback) {
          // 5.1) Append the related hash to the data to hash.
          md.update(hash);

          // 5.2) Create a string chosen path.
          var chosenPath = '';

          // 5.3) Create an unset chosen issuer variable.
          var chosenIssuer = void 0;

          // 5.4) For each permutation of blank node list:
          var permutator = new Permutator(hashToRelated[hash]);
          self.whilst(function () {
            return permutator.hasNext();
          }, function (nextPermutation) {
            var permutation = permutator.next();

            // 5.4.1) Create a copy of issuer, issuer copy.
            var issuerCopy = issuer.clone();

            // 5.4.2) Create a string path.
            var path = '';

            // 5.4.3) Create a recursion list, to store blank node identifiers
            // that must be recursively processed by this algorithm.
            var recursionList = [];

            self.waterfall([function (callback) {
              // 5.4.4) For each related in permutation:
              self.forEach(permutation, function (related, idx, callback) {
                // 5.4.4.1) If a canonical identifier has been issued for
                // related, append it to path.
                if (self.canonicalIssuer.hasId(related)) {
                  path += self.canonicalIssuer.getId(related);
                } else {
                  // 5.4.4.2) Otherwise:
                  // 5.4.4.2.1) If issuer copy has not issued an identifier
                  // for related, append related to recursion list.
                  if (!issuerCopy.hasId(related)) {
                    recursionList.push(related);
                  }
                  // 5.4.4.2.2) Use the Issue Identifier algorithm, passing
                  // issuer copy and related and append the result to path.
                  path += issuerCopy.getId(related);
                }

                // 5.4.4.3) If chosen path is not empty and the length of path
                // is greater than or equal to the length of chosen path and
                // path is lexicographically greater than chosen path, then
                // skip to the next permutation.
                if (chosenPath.length !== 0 && path.length >= chosenPath.length && path > chosenPath) {
                  // FIXME: may cause inaccurate total depth calculation
                  return nextPermutation();
                }
                callback();
              }, callback);
            }, function (callback) {
              // 5.4.5) For each related in recursion list:
              self.forEach(recursionList, function (related, idx, callback) {
                // 5.4.5.1) Set result to the result of recursively executing
                // the Hash N-Degree Quads algorithm, passing related for
                // identifier and issuer copy for path identifier issuer.
                self.hashNDegreeQuads(related, issuerCopy, function (err, result) {
                  if (err) {
                    return callback(err);
                  }

                  // 5.4.5.2) Use the Issue Identifier algorithm, passing
                  // issuer copy and related and append the result to path.
                  path += issuerCopy.getId(related);

                  // 5.4.5.3) Append <, the hash in result, and > to path.
                  path += '<' + result.hash + '>';

                  // 5.4.5.4) Set issuer copy to the identifier issuer in
                  // result.
                  issuerCopy = result.issuer;

                  // 5.4.5.5) If chosen path is not empty and the length of
                  // path is greater than or equal to the length of chosen
                  // path and path is lexicographically greater than chosen
                  // path, then skip to the next permutation.
                  if (chosenPath.length !== 0 && path.length >= chosenPath.length && path > chosenPath) {
                    // FIXME: may cause inaccurate total depth calculation
                    return nextPermutation();
                  }
                  callback();
                });
              }, callback);
            }, function (callback) {
              // 5.4.6) If chosen path is empty or path is lexicographically
              // less than chosen path, set chosen path to path and chosen
              // issuer to issuer copy.
              if (chosenPath.length === 0 || path < chosenPath) {
                chosenPath = path;
                chosenIssuer = issuerCopy;
              }
              callback();
            }], nextPermutation);
          }, function (err) {
            if (err) {
              return callback(err);
            }

            // 5.5) Append chosen path to data to hash.
            md.update(chosenPath);

            // 5.6) Replace issuer, by reference, with chosen issuer.
            issuer = chosenIssuer;
            callback();
          });
        }, callback);
      }], function (err) {
        // 6) Return issuer and the hash that results from passing data to hash
        // through the hash algorithm.
        callback(err, { hash: md.digest(), issuer: issuer });
      });
    }

    // helper for modifying component during Hash First Degree Quads

  }, {
    key: 'modifyFirstDegreeComponent',
    value: function modifyFirstDegreeComponent(id, component) {
      if (component.termType !== 'BlankNode') {
        return component;
      }
      component = util.clone(component);
      component.value = component.value === id ? '_:a' : '_:z';
      return component;
    }

    // helper for getting a related predicate

  }, {
    key: 'getRelatedPredicate',
    value: function getRelatedPredicate(quad) {
      return '<' + quad.predicate.value + '>';
    }

    // helper for creating hash to related blank nodes map

  }, {
    key: 'createHashToRelated',
    value: function createHashToRelated(id, issuer, callback) {
      var self = this;

      // 1) Create a hash to related blank nodes map for storing hashes that
      // identify related blank nodes.
      var hashToRelated = {};

      // 2) Get a reference, quads, to the list of quads in the blank node to
      // quads map for the key identifier.
      var quads = self.blankNodeInfo[id].quads;

      // 3) For each quad in quads:
      self.forEach(quads, function (quad, idx, callback) {
        // 3.1) For each component in quad, if component is the subject, object,
        // and graph name and it is a blank node that is not identified by
        // identifier:
        self.forEach(quad, function (component, key, callback) {
          if (key === 'predicate' || !(component.termType === 'BlankNode' && component.value !== id)) {
            return callback();
          }
          // 3.1.1) Set hash to the result of the Hash Related Blank Node
          // algorithm, passing the blank node identifier for component as
          // related, quad, path identifier issuer as issuer, and position as
          // either s, o, or g based on whether component is a subject, object,
          // graph name, respectively.
          var related = component.value;
          var position = POSITIONS[key];
          self.hashRelatedBlankNode(related, quad, issuer, position, function (err, hash) {
            if (err) {
              return callback(err);
            }
            // 3.1.2) Add a mapping of hash to the blank node identifier for
            // component to hash to related blank nodes map, adding an entry as
            // necessary.
            if (hash in hashToRelated) {
              hashToRelated[hash].push(related);
            } else {
              hashToRelated[hash] = [related];
            }
            callback();
          });
        }, callback);
      }, function (err) {
        return callback(err, hashToRelated);
      });
    }

    // helper that iterates over quad components (skips predicate)

  }, {
    key: 'forEachComponent',
    value: function forEachComponent(quad, op) {
      for (var key in quad) {
        // skip `predicate`
        if (key === 'predicate') {
          continue;
        }
        op(quad[key], key, quad);
      }
    }
  }]);

  return URDNA2015;
}(AsyncAlgorithm);

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright (c) 2016-2017 Digital Bazaar, Inc. All rights reserved.
 */


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var forge = __webpack_require__(23);
__webpack_require__(46);
__webpack_require__(114);
__webpack_require__(115);

module.exports = function () {
  /**
   * Creates a new MessageDigest.
   *
   * @param algorithm the algorithm to use.
   */
  function MessageDigest(algorithm) {
    _classCallCheck(this, MessageDigest);

    this.md = forge.md[algorithm].create();
  }

  _createClass(MessageDigest, [{
    key: 'update',
    value: function update(msg) {
      this.md.update(msg, 'utf8');
    }
  }, {
    key: 'digest',
    value: function digest() {
      return this.md.digest().toHex();
    }
  }]);

  return MessageDigest;
}();

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Utility functions for web applications.
 *
 * @author Dave Longley
 *
 * Copyright (c) 2010-2014 Digital Bazaar, Inc.
 */
var forge = __webpack_require__(23);

/* Utilities API */
var util = module.exports = forge.util = forge.util || {};

// define setImmediate and nextTick
(function() {
  // use native nextTick
  if(typeof process !== 'undefined' && process.nextTick) {
    util.nextTick = process.nextTick;
    if(typeof setImmediate === 'function') {
      util.setImmediate = setImmediate;
    } else {
      // polyfill setImmediate with nextTick, older versions of node
      // (those w/o setImmediate) won't totally starve IO
      util.setImmediate = util.nextTick;
    }
    return;
  }

  // polyfill nextTick with native setImmediate
  if(typeof setImmediate === 'function') {
    util.setImmediate = function() { return setImmediate.apply(undefined, arguments); };
    util.nextTick = function(callback) {
      return setImmediate(callback);
    };
    return;
  }

  /* Note: A polyfill upgrade pattern is used here to allow combining
  polyfills. For example, MutationObserver is fast, but blocks UI updates,
  so it needs to allow UI updates periodically, so it falls back on
  postMessage or setTimeout. */

  // polyfill with setTimeout
  util.setImmediate = function(callback) {
    setTimeout(callback, 0);
  };

  // upgrade polyfill to use postMessage
  if(typeof window !== 'undefined' &&
    typeof window.postMessage === 'function') {
    var msg = 'forge.setImmediate';
    var callbacks = [];
    util.setImmediate = function(callback) {
      callbacks.push(callback);
      // only send message when one hasn't been sent in
      // the current turn of the event loop
      if(callbacks.length === 1) {
        window.postMessage(msg, '*');
      }
    };
    function handler(event) {
      if(event.source === window && event.data === msg) {
        event.stopPropagation();
        var copy = callbacks.slice();
        callbacks.length = 0;
        copy.forEach(function(callback) {
          callback();
        });
      }
    }
    window.addEventListener('message', handler, true);
  }

  // upgrade polyfill to use MutationObserver
  if(typeof MutationObserver !== 'undefined') {
    // polyfill with MutationObserver
    var now = Date.now();
    var attr = true;
    var div = document.createElement('div');
    var callbacks = [];
    new MutationObserver(function() {
      var copy = callbacks.slice();
      callbacks.length = 0;
      copy.forEach(function(callback) {
        callback();
      });
    }).observe(div, {attributes: true});
    var oldSetImmediate = util.setImmediate;
    util.setImmediate = function(callback) {
      if(Date.now() - now > 15) {
        now = Date.now();
        oldSetImmediate(callback);
      } else {
        callbacks.push(callback);
        // only trigger observer when it hasn't been triggered in
        // the current turn of the event loop
        if(callbacks.length === 1) {
          div.setAttribute('a', attr = !attr);
        }
      }
    };
  }

  util.nextTick = util.setImmediate;
})();

// check if running under Node.js
util.isNodejs =
  typeof process !== 'undefined' && process.versions && process.versions.node;

// define isArray
util.isArray = Array.isArray || function(x) {
  return Object.prototype.toString.call(x) === '[object Array]';
};

// define isArrayBuffer
util.isArrayBuffer = function(x) {
  return typeof ArrayBuffer !== 'undefined' && x instanceof ArrayBuffer;
};

// define isArrayBufferView
util.isArrayBufferView = function(x) {
  return x && util.isArrayBuffer(x.buffer) && x.byteLength !== undefined;
};

/**
 * Ensure a bits param is 8, 16, 24, or 32. Used to validate input for
 * algorithms where bit manipulation, JavaScript limitations, and/or algorithm
 * design only allow for byte operations of a limited size.
 *
 * @param n number of bits.
 *
 * Throw Error if n invalid.
 */
function _checkBitsParam(n) {
  if(!(n === 8 || n === 16 || n === 24 || n === 32)) {
    throw new Error('Only 8, 16, 24, or 32 bits supported: ' + n);
  }
}

// TODO: set ByteBuffer to best available backing
util.ByteBuffer = ByteStringBuffer;

/** Buffer w/BinaryString backing */

/**
 * Constructor for a binary string backed byte buffer.
 *
 * @param [b] the bytes to wrap (either encoded as string, one byte per
 *          character, or as an ArrayBuffer or Typed Array).
 */
function ByteStringBuffer(b) {
  // TODO: update to match DataBuffer API

  // the data in this buffer
  this.data = '';
  // the pointer for reading from this buffer
  this.read = 0;

  if(typeof b === 'string') {
    this.data = b;
  } else if(util.isArrayBuffer(b) || util.isArrayBufferView(b)) {
    // convert native buffer to forge buffer
    // FIXME: support native buffers internally instead
    var arr = new Uint8Array(b);
    try {
      this.data = String.fromCharCode.apply(null, arr);
    } catch(e) {
      for(var i = 0; i < arr.length; ++i) {
        this.putByte(arr[i]);
      }
    }
  } else if(b instanceof ByteStringBuffer ||
    (typeof b === 'object' && typeof b.data === 'string' &&
    typeof b.read === 'number')) {
    // copy existing buffer
    this.data = b.data;
    this.read = b.read;
  }

  // used for v8 optimization
  this._constructedStringLength = 0;
}
util.ByteStringBuffer = ByteStringBuffer;

/* Note: This is an optimization for V8-based browsers. When V8 concatenates
  a string, the strings are only joined logically using a "cons string" or
  "constructed/concatenated string". These containers keep references to one
  another and can result in very large memory usage. For example, if a 2MB
  string is constructed by concatenating 4 bytes together at a time, the
  memory usage will be ~44MB; so ~22x increase. The strings are only joined
  together when an operation requiring their joining takes place, such as
  substr(). This function is called when adding data to this buffer to ensure
  these types of strings are periodically joined to reduce the memory
  footprint. */
var _MAX_CONSTRUCTED_STRING_LENGTH = 4096;
util.ByteStringBuffer.prototype._optimizeConstructedString = function(x) {
  this._constructedStringLength += x;
  if(this._constructedStringLength > _MAX_CONSTRUCTED_STRING_LENGTH) {
    // this substr() should cause the constructed string to join
    this.data.substr(0, 1);
    this._constructedStringLength = 0;
  }
};

/**
 * Gets the number of bytes in this buffer.
 *
 * @return the number of bytes in this buffer.
 */
util.ByteStringBuffer.prototype.length = function() {
  return this.data.length - this.read;
};

/**
 * Gets whether or not this buffer is empty.
 *
 * @return true if this buffer is empty, false if not.
 */
util.ByteStringBuffer.prototype.isEmpty = function() {
  return this.length() <= 0;
};

/**
 * Puts a byte in this buffer.
 *
 * @param b the byte to put.
 *
 * @return this buffer.
 */
util.ByteStringBuffer.prototype.putByte = function(b) {
  return this.putBytes(String.fromCharCode(b));
};

/**
 * Puts a byte in this buffer N times.
 *
 * @param b the byte to put.
 * @param n the number of bytes of value b to put.
 *
 * @return this buffer.
 */
util.ByteStringBuffer.prototype.fillWithByte = function(b, n) {
  b = String.fromCharCode(b);
  var d = this.data;
  while(n > 0) {
    if(n & 1) {
      d += b;
    }
    n >>>= 1;
    if(n > 0) {
      b += b;
    }
  }
  this.data = d;
  this._optimizeConstructedString(n);
  return this;
};

/**
 * Puts bytes in this buffer.
 *
 * @param bytes the bytes (as a UTF-8 encoded string) to put.
 *
 * @return this buffer.
 */
util.ByteStringBuffer.prototype.putBytes = function(bytes) {
  this.data += bytes;
  this._optimizeConstructedString(bytes.length);
  return this;
};

/**
 * Puts a UTF-16 encoded string into this buffer.
 *
 * @param str the string to put.
 *
 * @return this buffer.
 */
util.ByteStringBuffer.prototype.putString = function(str) {
  return this.putBytes(util.encodeUtf8(str));
};

/**
 * Puts a 16-bit integer in this buffer in big-endian order.
 *
 * @param i the 16-bit integer.
 *
 * @return this buffer.
 */
util.ByteStringBuffer.prototype.putInt16 = function(i) {
  return this.putBytes(
    String.fromCharCode(i >> 8 & 0xFF) +
    String.fromCharCode(i & 0xFF));
};

/**
 * Puts a 24-bit integer in this buffer in big-endian order.
 *
 * @param i the 24-bit integer.
 *
 * @return this buffer.
 */
util.ByteStringBuffer.prototype.putInt24 = function(i) {
  return this.putBytes(
    String.fromCharCode(i >> 16 & 0xFF) +
    String.fromCharCode(i >> 8 & 0xFF) +
    String.fromCharCode(i & 0xFF));
};

/**
 * Puts a 32-bit integer in this buffer in big-endian order.
 *
 * @param i the 32-bit integer.
 *
 * @return this buffer.
 */
util.ByteStringBuffer.prototype.putInt32 = function(i) {
  return this.putBytes(
    String.fromCharCode(i >> 24 & 0xFF) +
    String.fromCharCode(i >> 16 & 0xFF) +
    String.fromCharCode(i >> 8 & 0xFF) +
    String.fromCharCode(i & 0xFF));
};

/**
 * Puts a 16-bit integer in this buffer in little-endian order.
 *
 * @param i the 16-bit integer.
 *
 * @return this buffer.
 */
util.ByteStringBuffer.prototype.putInt16Le = function(i) {
  return this.putBytes(
    String.fromCharCode(i & 0xFF) +
    String.fromCharCode(i >> 8 & 0xFF));
};

/**
 * Puts a 24-bit integer in this buffer in little-endian order.
 *
 * @param i the 24-bit integer.
 *
 * @return this buffer.
 */
util.ByteStringBuffer.prototype.putInt24Le = function(i) {
  return this.putBytes(
    String.fromCharCode(i & 0xFF) +
    String.fromCharCode(i >> 8 & 0xFF) +
    String.fromCharCode(i >> 16 & 0xFF));
};

/**
 * Puts a 32-bit integer in this buffer in little-endian order.
 *
 * @param i the 32-bit integer.
 *
 * @return this buffer.
 */
util.ByteStringBuffer.prototype.putInt32Le = function(i) {
  return this.putBytes(
    String.fromCharCode(i & 0xFF) +
    String.fromCharCode(i >> 8 & 0xFF) +
    String.fromCharCode(i >> 16 & 0xFF) +
    String.fromCharCode(i >> 24 & 0xFF));
};

/**
 * Puts an n-bit integer in this buffer in big-endian order.
 *
 * @param i the n-bit integer.
 * @param n the number of bits in the integer (8, 16, 24, or 32).
 *
 * @return this buffer.
 */
util.ByteStringBuffer.prototype.putInt = function(i, n) {
  _checkBitsParam(n);
  var bytes = '';
  do {
    n -= 8;
    bytes += String.fromCharCode((i >> n) & 0xFF);
  } while(n > 0);
  return this.putBytes(bytes);
};

/**
 * Puts a signed n-bit integer in this buffer in big-endian order. Two's
 * complement representation is used.
 *
 * @param i the n-bit integer.
 * @param n the number of bits in the integer (8, 16, 24, or 32).
 *
 * @return this buffer.
 */
util.ByteStringBuffer.prototype.putSignedInt = function(i, n) {
  // putInt checks n
  if(i < 0) {
    i += 2 << (n - 1);
  }
  return this.putInt(i, n);
};

/**
 * Puts the given buffer into this buffer.
 *
 * @param buffer the buffer to put into this one.
 *
 * @return this buffer.
 */
util.ByteStringBuffer.prototype.putBuffer = function(buffer) {
  return this.putBytes(buffer.getBytes());
};

/**
 * Gets a byte from this buffer and advances the read pointer by 1.
 *
 * @return the byte.
 */
util.ByteStringBuffer.prototype.getByte = function() {
  return this.data.charCodeAt(this.read++);
};

/**
 * Gets a uint16 from this buffer in big-endian order and advances the read
 * pointer by 2.
 *
 * @return the uint16.
 */
util.ByteStringBuffer.prototype.getInt16 = function() {
  var rval = (
    this.data.charCodeAt(this.read) << 8 ^
    this.data.charCodeAt(this.read + 1));
  this.read += 2;
  return rval;
};

/**
 * Gets a uint24 from this buffer in big-endian order and advances the read
 * pointer by 3.
 *
 * @return the uint24.
 */
util.ByteStringBuffer.prototype.getInt24 = function() {
  var rval = (
    this.data.charCodeAt(this.read) << 16 ^
    this.data.charCodeAt(this.read + 1) << 8 ^
    this.data.charCodeAt(this.read + 2));
  this.read += 3;
  return rval;
};

/**
 * Gets a uint32 from this buffer in big-endian order and advances the read
 * pointer by 4.
 *
 * @return the word.
 */
util.ByteStringBuffer.prototype.getInt32 = function() {
  var rval = (
    this.data.charCodeAt(this.read) << 24 ^
    this.data.charCodeAt(this.read + 1) << 16 ^
    this.data.charCodeAt(this.read + 2) << 8 ^
    this.data.charCodeAt(this.read + 3));
  this.read += 4;
  return rval;
};

/**
 * Gets a uint16 from this buffer in little-endian order and advances the read
 * pointer by 2.
 *
 * @return the uint16.
 */
util.ByteStringBuffer.prototype.getInt16Le = function() {
  var rval = (
    this.data.charCodeAt(this.read) ^
    this.data.charCodeAt(this.read + 1) << 8);
  this.read += 2;
  return rval;
};

/**
 * Gets a uint24 from this buffer in little-endian order and advances the read
 * pointer by 3.
 *
 * @return the uint24.
 */
util.ByteStringBuffer.prototype.getInt24Le = function() {
  var rval = (
    this.data.charCodeAt(this.read) ^
    this.data.charCodeAt(this.read + 1) << 8 ^
    this.data.charCodeAt(this.read + 2) << 16);
  this.read += 3;
  return rval;
};

/**
 * Gets a uint32 from this buffer in little-endian order and advances the read
 * pointer by 4.
 *
 * @return the word.
 */
util.ByteStringBuffer.prototype.getInt32Le = function() {
  var rval = (
    this.data.charCodeAt(this.read) ^
    this.data.charCodeAt(this.read + 1) << 8 ^
    this.data.charCodeAt(this.read + 2) << 16 ^
    this.data.charCodeAt(this.read + 3) << 24);
  this.read += 4;
  return rval;
};

/**
 * Gets an n-bit integer from this buffer in big-endian order and advances the
 * read pointer by ceil(n/8).
 *
 * @param n the number of bits in the integer (8, 16, 24, or 32).
 *
 * @return the integer.
 */
util.ByteStringBuffer.prototype.getInt = function(n) {
  _checkBitsParam(n);
  var rval = 0;
  do {
    // TODO: Use (rval * 0x100) if adding support for 33 to 53 bits.
    rval = (rval << 8) + this.data.charCodeAt(this.read++);
    n -= 8;
  } while(n > 0);
  return rval;
};

/**
 * Gets a signed n-bit integer from this buffer in big-endian order, using
 * two's complement, and advances the read pointer by n/8.
 *
 * @param n the number of bits in the integer (8, 16, 24, or 32).
 *
 * @return the integer.
 */
util.ByteStringBuffer.prototype.getSignedInt = function(n) {
  // getInt checks n
  var x = this.getInt(n);
  var max = 2 << (n - 2);
  if(x >= max) {
    x -= max << 1;
  }
  return x;
};

/**
 * Reads bytes out into a UTF-8 string and clears them from the buffer.
 *
 * @param count the number of bytes to read, undefined or null for all.
 *
 * @return a UTF-8 string of bytes.
 */
util.ByteStringBuffer.prototype.getBytes = function(count) {
  var rval;
  if(count) {
    // read count bytes
    count = Math.min(this.length(), count);
    rval = this.data.slice(this.read, this.read + count);
    this.read += count;
  } else if(count === 0) {
    rval = '';
  } else {
    // read all bytes, optimize to only copy when needed
    rval = (this.read === 0) ? this.data : this.data.slice(this.read);
    this.clear();
  }
  return rval;
};

/**
 * Gets a UTF-8 encoded string of the bytes from this buffer without modifying
 * the read pointer.
 *
 * @param count the number of bytes to get, omit to get all.
 *
 * @return a string full of UTF-8 encoded characters.
 */
util.ByteStringBuffer.prototype.bytes = function(count) {
  return (typeof(count) === 'undefined' ?
    this.data.slice(this.read) :
    this.data.slice(this.read, this.read + count));
};

/**
 * Gets a byte at the given index without modifying the read pointer.
 *
 * @param i the byte index.
 *
 * @return the byte.
 */
util.ByteStringBuffer.prototype.at = function(i) {
  return this.data.charCodeAt(this.read + i);
};

/**
 * Puts a byte at the given index without modifying the read pointer.
 *
 * @param i the byte index.
 * @param b the byte to put.
 *
 * @return this buffer.
 */
util.ByteStringBuffer.prototype.setAt = function(i, b) {
  this.data = this.data.substr(0, this.read + i) +
    String.fromCharCode(b) +
    this.data.substr(this.read + i + 1);
  return this;
};

/**
 * Gets the last byte without modifying the read pointer.
 *
 * @return the last byte.
 */
util.ByteStringBuffer.prototype.last = function() {
  return this.data.charCodeAt(this.data.length - 1);
};

/**
 * Creates a copy of this buffer.
 *
 * @return the copy.
 */
util.ByteStringBuffer.prototype.copy = function() {
  var c = util.createBuffer(this.data);
  c.read = this.read;
  return c;
};

/**
 * Compacts this buffer.
 *
 * @return this buffer.
 */
util.ByteStringBuffer.prototype.compact = function() {
  if(this.read > 0) {
    this.data = this.data.slice(this.read);
    this.read = 0;
  }
  return this;
};

/**
 * Clears this buffer.
 *
 * @return this buffer.
 */
util.ByteStringBuffer.prototype.clear = function() {
  this.data = '';
  this.read = 0;
  return this;
};

/**
 * Shortens this buffer by triming bytes off of the end of this buffer.
 *
 * @param count the number of bytes to trim off.
 *
 * @return this buffer.
 */
util.ByteStringBuffer.prototype.truncate = function(count) {
  var len = Math.max(0, this.length() - count);
  this.data = this.data.substr(this.read, len);
  this.read = 0;
  return this;
};

/**
 * Converts this buffer to a hexadecimal string.
 *
 * @return a hexadecimal string.
 */
util.ByteStringBuffer.prototype.toHex = function() {
  var rval = '';
  for(var i = this.read; i < this.data.length; ++i) {
    var b = this.data.charCodeAt(i);
    if(b < 16) {
      rval += '0';
    }
    rval += b.toString(16);
  }
  return rval;
};

/**
 * Converts this buffer to a UTF-16 string (standard JavaScript string).
 *
 * @return a UTF-16 string.
 */
util.ByteStringBuffer.prototype.toString = function() {
  return util.decodeUtf8(this.bytes());
};

/** End Buffer w/BinaryString backing */

/** Buffer w/UInt8Array backing */

/**
 * FIXME: Experimental. Do not use yet.
 *
 * Constructor for an ArrayBuffer-backed byte buffer.
 *
 * The buffer may be constructed from a string, an ArrayBuffer, DataView, or a
 * TypedArray.
 *
 * If a string is given, its encoding should be provided as an option,
 * otherwise it will default to 'binary'. A 'binary' string is encoded such
 * that each character is one byte in length and size.
 *
 * If an ArrayBuffer, DataView, or TypedArray is given, it will be used
 * *directly* without any copying. Note that, if a write to the buffer requires
 * more space, the buffer will allocate a new backing ArrayBuffer to
 * accommodate. The starting read and write offsets for the buffer may be
 * given as options.
 *
 * @param [b] the initial bytes for this buffer.
 * @param options the options to use:
 *          [readOffset] the starting read offset to use (default: 0).
 *          [writeOffset] the starting write offset to use (default: the
 *            length of the first parameter).
 *          [growSize] the minimum amount, in bytes, to grow the buffer by to
 *            accommodate writes (default: 1024).
 *          [encoding] the encoding ('binary', 'utf8', 'utf16', 'hex') for the
 *            first parameter, if it is a string (default: 'binary').
 */
function DataBuffer(b, options) {
  // default options
  options = options || {};

  // pointers for read from/write to buffer
  this.read = options.readOffset || 0;
  this.growSize = options.growSize || 1024;

  var isArrayBuffer = util.isArrayBuffer(b);
  var isArrayBufferView = util.isArrayBufferView(b);
  if(isArrayBuffer || isArrayBufferView) {
    // use ArrayBuffer directly
    if(isArrayBuffer) {
      this.data = new DataView(b);
    } else {
      // TODO: adjust read/write offset based on the type of view
      // or specify that this must be done in the options ... that the
      // offsets are byte-based
      this.data = new DataView(b.buffer, b.byteOffset, b.byteLength);
    }
    this.write = ('writeOffset' in options ?
      options.writeOffset : this.data.byteLength);
    return;
  }

  // initialize to empty array buffer and add any given bytes using putBytes
  this.data = new DataView(new ArrayBuffer(0));
  this.write = 0;

  if(b !== null && b !== undefined) {
    this.putBytes(b);
  }

  if('writeOffset' in options) {
    this.write = options.writeOffset;
  }
}
util.DataBuffer = DataBuffer;

/**
 * Gets the number of bytes in this buffer.
 *
 * @return the number of bytes in this buffer.
 */
util.DataBuffer.prototype.length = function() {
  return this.write - this.read;
};

/**
 * Gets whether or not this buffer is empty.
 *
 * @return true if this buffer is empty, false if not.
 */
util.DataBuffer.prototype.isEmpty = function() {
  return this.length() <= 0;
};

/**
 * Ensures this buffer has enough empty space to accommodate the given number
 * of bytes. An optional parameter may be given that indicates a minimum
 * amount to grow the buffer if necessary. If the parameter is not given,
 * the buffer will be grown by some previously-specified default amount
 * or heuristic.
 *
 * @param amount the number of bytes to accommodate.
 * @param [growSize] the minimum amount, in bytes, to grow the buffer by if
 *          necessary.
 */
util.DataBuffer.prototype.accommodate = function(amount, growSize) {
  if(this.length() >= amount) {
    return this;
  }
  growSize = Math.max(growSize || this.growSize, amount);

  // grow buffer
  var src = new Uint8Array(
    this.data.buffer, this.data.byteOffset, this.data.byteLength);
  var dst = new Uint8Array(this.length() + growSize);
  dst.set(src);
  this.data = new DataView(dst.buffer);

  return this;
};

/**
 * Puts a byte in this buffer.
 *
 * @param b the byte to put.
 *
 * @return this buffer.
 */
util.DataBuffer.prototype.putByte = function(b) {
  this.accommodate(1);
  this.data.setUint8(this.write++, b);
  return this;
};

/**
 * Puts a byte in this buffer N times.
 *
 * @param b the byte to put.
 * @param n the number of bytes of value b to put.
 *
 * @return this buffer.
 */
util.DataBuffer.prototype.fillWithByte = function(b, n) {
  this.accommodate(n);
  for(var i = 0; i < n; ++i) {
    this.data.setUint8(b);
  }
  return this;
};

/**
 * Puts bytes in this buffer. The bytes may be given as a string, an
 * ArrayBuffer, a DataView, or a TypedArray.
 *
 * @param bytes the bytes to put.
 * @param [encoding] the encoding for the first parameter ('binary', 'utf8',
 *          'utf16', 'hex'), if it is a string (default: 'binary').
 *
 * @return this buffer.
 */
util.DataBuffer.prototype.putBytes = function(bytes, encoding) {
  if(util.isArrayBufferView(bytes)) {
    var src = new Uint8Array(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    var len = src.byteLength - src.byteOffset;
    this.accommodate(len);
    var dst = new Uint8Array(this.data.buffer, this.write);
    dst.set(src);
    this.write += len;
    return this;
  }

  if(util.isArrayBuffer(bytes)) {
    var src = new Uint8Array(bytes);
    this.accommodate(src.byteLength);
    var dst = new Uint8Array(this.data.buffer);
    dst.set(src, this.write);
    this.write += src.byteLength;
    return this;
  }

  // bytes is a util.DataBuffer or equivalent
  if(bytes instanceof util.DataBuffer ||
    (typeof bytes === 'object' &&
    typeof bytes.read === 'number' && typeof bytes.write === 'number' &&
    util.isArrayBufferView(bytes.data))) {
    var src = new Uint8Array(bytes.data.byteLength, bytes.read, bytes.length());
    this.accommodate(src.byteLength);
    var dst = new Uint8Array(bytes.data.byteLength, this.write);
    dst.set(src);
    this.write += src.byteLength;
    return this;
  }

  if(bytes instanceof util.ByteStringBuffer) {
    // copy binary string and process as the same as a string parameter below
    bytes = bytes.data;
    encoding = 'binary';
  }

  // string conversion
  encoding = encoding || 'binary';
  if(typeof bytes === 'string') {
    var view;

    // decode from string
    if(encoding === 'hex') {
      this.accommodate(Math.ceil(bytes.length / 2));
      view = new Uint8Array(this.data.buffer, this.write);
      this.write += util.binary.hex.decode(bytes, view, this.write);
      return this;
    }
    if(encoding === 'base64') {
      this.accommodate(Math.ceil(bytes.length / 4) * 3);
      view = new Uint8Array(this.data.buffer, this.write);
      this.write += util.binary.base64.decode(bytes, view, this.write);
      return this;
    }

    // encode text as UTF-8 bytes
    if(encoding === 'utf8') {
      // encode as UTF-8 then decode string as raw binary
      bytes = util.encodeUtf8(bytes);
      encoding = 'binary';
    }

    // decode string as raw binary
    if(encoding === 'binary' || encoding === 'raw') {
      // one byte per character
      this.accommodate(bytes.length);
      view = new Uint8Array(this.data.buffer, this.write);
      this.write += util.binary.raw.decode(view);
      return this;
    }

    // encode text as UTF-16 bytes
    if(encoding === 'utf16') {
      // two bytes per character
      this.accommodate(bytes.length * 2);
      view = new Uint16Array(this.data.buffer, this.write);
      this.write += util.text.utf16.encode(view);
      return this;
    }

    throw new Error('Invalid encoding: ' + encoding);
  }

  throw Error('Invalid parameter: ' + bytes);
};

/**
 * Puts the given buffer into this buffer.
 *
 * @param buffer the buffer to put into this one.
 *
 * @return this buffer.
 */
util.DataBuffer.prototype.putBuffer = function(buffer) {
  this.putBytes(buffer);
  buffer.clear();
  return this;
};

/**
 * Puts a string into this buffer.
 *
 * @param str the string to put.
 * @param [encoding] the encoding for the string (default: 'utf16').
 *
 * @return this buffer.
 */
util.DataBuffer.prototype.putString = function(str) {
  return this.putBytes(str, 'utf16');
};

/**
 * Puts a 16-bit integer in this buffer in big-endian order.
 *
 * @param i the 16-bit integer.
 *
 * @return this buffer.
 */
util.DataBuffer.prototype.putInt16 = function(i) {
  this.accommodate(2);
  this.data.setInt16(this.write, i);
  this.write += 2;
  return this;
};

/**
 * Puts a 24-bit integer in this buffer in big-endian order.
 *
 * @param i the 24-bit integer.
 *
 * @return this buffer.
 */
util.DataBuffer.prototype.putInt24 = function(i) {
  this.accommodate(3);
  this.data.setInt16(this.write, i >> 8 & 0xFFFF);
  this.data.setInt8(this.write, i >> 16 & 0xFF);
  this.write += 3;
  return this;
};

/**
 * Puts a 32-bit integer in this buffer in big-endian order.
 *
 * @param i the 32-bit integer.
 *
 * @return this buffer.
 */
util.DataBuffer.prototype.putInt32 = function(i) {
  this.accommodate(4);
  this.data.setInt32(this.write, i);
  this.write += 4;
  return this;
};

/**
 * Puts a 16-bit integer in this buffer in little-endian order.
 *
 * @param i the 16-bit integer.
 *
 * @return this buffer.
 */
util.DataBuffer.prototype.putInt16Le = function(i) {
  this.accommodate(2);
  this.data.setInt16(this.write, i, true);
  this.write += 2;
  return this;
};

/**
 * Puts a 24-bit integer in this buffer in little-endian order.
 *
 * @param i the 24-bit integer.
 *
 * @return this buffer.
 */
util.DataBuffer.prototype.putInt24Le = function(i) {
  this.accommodate(3);
  this.data.setInt8(this.write, i >> 16 & 0xFF);
  this.data.setInt16(this.write, i >> 8 & 0xFFFF, true);
  this.write += 3;
  return this;
};

/**
 * Puts a 32-bit integer in this buffer in little-endian order.
 *
 * @param i the 32-bit integer.
 *
 * @return this buffer.
 */
util.DataBuffer.prototype.putInt32Le = function(i) {
  this.accommodate(4);
  this.data.setInt32(this.write, i, true);
  this.write += 4;
  return this;
};

/**
 * Puts an n-bit integer in this buffer in big-endian order.
 *
 * @param i the n-bit integer.
 * @param n the number of bits in the integer (8, 16, 24, or 32).
 *
 * @return this buffer.
 */
util.DataBuffer.prototype.putInt = function(i, n) {
  _checkBitsParam(n);
  this.accommodate(n / 8);
  do {
    n -= 8;
    this.data.setInt8(this.write++, (i >> n) & 0xFF);
  } while(n > 0);
  return this;
};

/**
 * Puts a signed n-bit integer in this buffer in big-endian order. Two's
 * complement representation is used.
 *
 * @param i the n-bit integer.
 * @param n the number of bits in the integer.
 *
 * @return this buffer.
 */
util.DataBuffer.prototype.putSignedInt = function(i, n) {
  _checkBitsParam(n);
  this.accommodate(n / 8);
  if(i < 0) {
    i += 2 << (n - 1);
  }
  return this.putInt(i, n);
};

/**
 * Gets a byte from this buffer and advances the read pointer by 1.
 *
 * @return the byte.
 */
util.DataBuffer.prototype.getByte = function() {
  return this.data.getInt8(this.read++);
};

/**
 * Gets a uint16 from this buffer in big-endian order and advances the read
 * pointer by 2.
 *
 * @return the uint16.
 */
util.DataBuffer.prototype.getInt16 = function() {
  var rval = this.data.getInt16(this.read);
  this.read += 2;
  return rval;
};

/**
 * Gets a uint24 from this buffer in big-endian order and advances the read
 * pointer by 3.
 *
 * @return the uint24.
 */
util.DataBuffer.prototype.getInt24 = function() {
  var rval = (
    this.data.getInt16(this.read) << 8 ^
    this.data.getInt8(this.read + 2));
  this.read += 3;
  return rval;
};

/**
 * Gets a uint32 from this buffer in big-endian order and advances the read
 * pointer by 4.
 *
 * @return the word.
 */
util.DataBuffer.prototype.getInt32 = function() {
  var rval = this.data.getInt32(this.read);
  this.read += 4;
  return rval;
};

/**
 * Gets a uint16 from this buffer in little-endian order and advances the read
 * pointer by 2.
 *
 * @return the uint16.
 */
util.DataBuffer.prototype.getInt16Le = function() {
  var rval = this.data.getInt16(this.read, true);
  this.read += 2;
  return rval;
};

/**
 * Gets a uint24 from this buffer in little-endian order and advances the read
 * pointer by 3.
 *
 * @return the uint24.
 */
util.DataBuffer.prototype.getInt24Le = function() {
  var rval = (
    this.data.getInt8(this.read) ^
    this.data.getInt16(this.read + 1, true) << 8);
  this.read += 3;
  return rval;
};

/**
 * Gets a uint32 from this buffer in little-endian order and advances the read
 * pointer by 4.
 *
 * @return the word.
 */
util.DataBuffer.prototype.getInt32Le = function() {
  var rval = this.data.getInt32(this.read, true);
  this.read += 4;
  return rval;
};

/**
 * Gets an n-bit integer from this buffer in big-endian order and advances the
 * read pointer by n/8.
 *
 * @param n the number of bits in the integer (8, 16, 24, or 32).
 *
 * @return the integer.
 */
util.DataBuffer.prototype.getInt = function(n) {
  _checkBitsParam(n);
  var rval = 0;
  do {
    // TODO: Use (rval * 0x100) if adding support for 33 to 53 bits.
    rval = (rval << 8) + this.data.getInt8(this.read++);
    n -= 8;
  } while(n > 0);
  return rval;
};

/**
 * Gets a signed n-bit integer from this buffer in big-endian order, using
 * two's complement, and advances the read pointer by n/8.
 *
 * @param n the number of bits in the integer (8, 16, 24, or 32).
 *
 * @return the integer.
 */
util.DataBuffer.prototype.getSignedInt = function(n) {
  // getInt checks n
  var x = this.getInt(n);
  var max = 2 << (n - 2);
  if(x >= max) {
    x -= max << 1;
  }
  return x;
};

/**
 * Reads bytes out into a UTF-8 string and clears them from the buffer.
 *
 * @param count the number of bytes to read, undefined or null for all.
 *
 * @return a UTF-8 string of bytes.
 */
util.DataBuffer.prototype.getBytes = function(count) {
  // TODO: deprecate this method, it is poorly named and
  // this.toString('binary') replaces it
  // add a toTypedArray()/toArrayBuffer() function
  var rval;
  if(count) {
    // read count bytes
    count = Math.min(this.length(), count);
    rval = this.data.slice(this.read, this.read + count);
    this.read += count;
  } else if(count === 0) {
    rval = '';
  } else {
    // read all bytes, optimize to only copy when needed
    rval = (this.read === 0) ? this.data : this.data.slice(this.read);
    this.clear();
  }
  return rval;
};

/**
 * Gets a UTF-8 encoded string of the bytes from this buffer without modifying
 * the read pointer.
 *
 * @param count the number of bytes to get, omit to get all.
 *
 * @return a string full of UTF-8 encoded characters.
 */
util.DataBuffer.prototype.bytes = function(count) {
  // TODO: deprecate this method, it is poorly named, add "getString()"
  return (typeof(count) === 'undefined' ?
    this.data.slice(this.read) :
    this.data.slice(this.read, this.read + count));
};

/**
 * Gets a byte at the given index without modifying the read pointer.
 *
 * @param i the byte index.
 *
 * @return the byte.
 */
util.DataBuffer.prototype.at = function(i) {
  return this.data.getUint8(this.read + i);
};

/**
 * Puts a byte at the given index without modifying the read pointer.
 *
 * @param i the byte index.
 * @param b the byte to put.
 *
 * @return this buffer.
 */
util.DataBuffer.prototype.setAt = function(i, b) {
  this.data.setUint8(i, b);
  return this;
};

/**
 * Gets the last byte without modifying the read pointer.
 *
 * @return the last byte.
 */
util.DataBuffer.prototype.last = function() {
  return this.data.getUint8(this.write - 1);
};

/**
 * Creates a copy of this buffer.
 *
 * @return the copy.
 */
util.DataBuffer.prototype.copy = function() {
  return new util.DataBuffer(this);
};

/**
 * Compacts this buffer.
 *
 * @return this buffer.
 */
util.DataBuffer.prototype.compact = function() {
  if(this.read > 0) {
    var src = new Uint8Array(this.data.buffer, this.read);
    var dst = new Uint8Array(src.byteLength);
    dst.set(src);
    this.data = new DataView(dst);
    this.write -= this.read;
    this.read = 0;
  }
  return this;
};

/**
 * Clears this buffer.
 *
 * @return this buffer.
 */
util.DataBuffer.prototype.clear = function() {
  this.data = new DataView(new ArrayBuffer(0));
  this.read = this.write = 0;
  return this;
};

/**
 * Shortens this buffer by triming bytes off of the end of this buffer.
 *
 * @param count the number of bytes to trim off.
 *
 * @return this buffer.
 */
util.DataBuffer.prototype.truncate = function(count) {
  this.write = Math.max(0, this.length() - count);
  this.read = Math.min(this.read, this.write);
  return this;
};

/**
 * Converts this buffer to a hexadecimal string.
 *
 * @return a hexadecimal string.
 */
util.DataBuffer.prototype.toHex = function() {
  var rval = '';
  for(var i = this.read; i < this.data.byteLength; ++i) {
    var b = this.data.getUint8(i);
    if(b < 16) {
      rval += '0';
    }
    rval += b.toString(16);
  }
  return rval;
};

/**
 * Converts this buffer to a string, using the given encoding. If no
 * encoding is given, 'utf8' (UTF-8) is used.
 *
 * @param [encoding] the encoding to use: 'binary', 'utf8', 'utf16', 'hex',
 *          'base64' (default: 'utf8').
 *
 * @return a string representation of the bytes in this buffer.
 */
util.DataBuffer.prototype.toString = function(encoding) {
  var view = new Uint8Array(this.data, this.read, this.length());
  encoding = encoding || 'utf8';

  // encode to string
  if(encoding === 'binary' || encoding === 'raw') {
    return util.binary.raw.encode(view);
  }
  if(encoding === 'hex') {
    return util.binary.hex.encode(view);
  }
  if(encoding === 'base64') {
    return util.binary.base64.encode(view);
  }

  // decode to text
  if(encoding === 'utf8') {
    return util.text.utf8.decode(view);
  }
  if(encoding === 'utf16') {
    return util.text.utf16.decode(view);
  }

  throw new Error('Invalid encoding: ' + encoding);
};

/** End Buffer w/UInt8Array backing */

/**
 * Creates a buffer that stores bytes. A value may be given to put into the
 * buffer that is either a string of bytes or a UTF-16 string that will
 * be encoded using UTF-8 (to do the latter, specify 'utf8' as the encoding).
 *
 * @param [input] the bytes to wrap (as a string) or a UTF-16 string to encode
 *          as UTF-8.
 * @param [encoding] (default: 'raw', other: 'utf8').
 */
util.createBuffer = function(input, encoding) {
  // TODO: deprecate, use new ByteBuffer() instead
  encoding = encoding || 'raw';
  if(input !== undefined && encoding === 'utf8') {
    input = util.encodeUtf8(input);
  }
  return new util.ByteBuffer(input);
};

/**
 * Fills a string with a particular value. If you want the string to be a byte
 * string, pass in String.fromCharCode(theByte).
 *
 * @param c the character to fill the string with, use String.fromCharCode
 *          to fill the string with a byte value.
 * @param n the number of characters of value c to fill with.
 *
 * @return the filled string.
 */
util.fillString = function(c, n) {
  var s = '';
  while(n > 0) {
    if(n & 1) {
      s += c;
    }
    n >>>= 1;
    if(n > 0) {
      c += c;
    }
  }
  return s;
};

/**
 * Performs a per byte XOR between two byte strings and returns the result as a
 * string of bytes.
 *
 * @param s1 first string of bytes.
 * @param s2 second string of bytes.
 * @param n the number of bytes to XOR.
 *
 * @return the XOR'd result.
 */
util.xorBytes = function(s1, s2, n) {
  var s3 = '';
  var b = '';
  var t = '';
  var i = 0;
  var c = 0;
  for(; n > 0; --n, ++i) {
    b = s1.charCodeAt(i) ^ s2.charCodeAt(i);
    if(c >= 10) {
      s3 += t;
      t = '';
      c = 0;
    }
    t += String.fromCharCode(b);
    ++c;
  }
  s3 += t;
  return s3;
};

/**
 * Converts a hex string into a 'binary' encoded string of bytes.
 *
 * @param hex the hexadecimal string to convert.
 *
 * @return the binary-encoded string of bytes.
 */
util.hexToBytes = function(hex) {
  // TODO: deprecate: "Deprecated. Use util.binary.hex.decode instead."
  var rval = '';
  var i = 0;
  if(hex.length & 1 == 1) {
    // odd number of characters, convert first character alone
    i = 1;
    rval += String.fromCharCode(parseInt(hex[0], 16));
  }
  // convert 2 characters (1 byte) at a time
  for(; i < hex.length; i += 2) {
    rval += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  }
  return rval;
};

/**
 * Converts a 'binary' encoded string of bytes to hex.
 *
 * @param bytes the byte string to convert.
 *
 * @return the string of hexadecimal characters.
 */
util.bytesToHex = function(bytes) {
  // TODO: deprecate: "Deprecated. Use util.binary.hex.encode instead."
  return util.createBuffer(bytes).toHex();
};

/**
 * Converts an 32-bit integer to 4-big-endian byte string.
 *
 * @param i the integer.
 *
 * @return the byte string.
 */
util.int32ToBytes = function(i) {
  return (
    String.fromCharCode(i >> 24 & 0xFF) +
    String.fromCharCode(i >> 16 & 0xFF) +
    String.fromCharCode(i >> 8 & 0xFF) +
    String.fromCharCode(i & 0xFF));
};

// base64 characters, reverse mapping
var _base64 =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
var _base64Idx = [
/*43 -43 = 0*/
/*'+',  1,  2,  3,'/' */
   62, -1, -1, -1, 63,

/*'0','1','2','3','4','5','6','7','8','9' */
   52, 53, 54, 55, 56, 57, 58, 59, 60, 61,

/*15, 16, 17,'=', 19, 20, 21 */
  -1, -1, -1, 64, -1, -1, -1,

/*65 - 43 = 22*/
/*'A','B','C','D','E','F','G','H','I','J','K','L','M', */
   0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12,

/*'N','O','P','Q','R','S','T','U','V','W','X','Y','Z' */
   13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,

/*91 - 43 = 48 */
/*48, 49, 50, 51, 52, 53 */
  -1, -1, -1, -1, -1, -1,

/*97 - 43 = 54*/
/*'a','b','c','d','e','f','g','h','i','j','k','l','m' */
   26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38,

/*'n','o','p','q','r','s','t','u','v','w','x','y','z' */
   39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51
];

/**
 * Base64 encodes a 'binary' encoded string of bytes.
 *
 * @param input the binary encoded string of bytes to base64-encode.
 * @param maxline the maximum number of encoded characters per line to use,
 *          defaults to none.
 *
 * @return the base64-encoded output.
 */
util.encode64 = function(input, maxline) {
  // TODO: deprecate: "Deprecated. Use util.binary.base64.encode instead."
  var line = '';
  var output = '';
  var chr1, chr2, chr3;
  var i = 0;
  while(i < input.length) {
    chr1 = input.charCodeAt(i++);
    chr2 = input.charCodeAt(i++);
    chr3 = input.charCodeAt(i++);

    // encode 4 character group
    line += _base64.charAt(chr1 >> 2);
    line += _base64.charAt(((chr1 & 3) << 4) | (chr2 >> 4));
    if(isNaN(chr2)) {
      line += '==';
    } else {
      line += _base64.charAt(((chr2 & 15) << 2) | (chr3 >> 6));
      line += isNaN(chr3) ? '=' : _base64.charAt(chr3 & 63);
    }

    if(maxline && line.length > maxline) {
      output += line.substr(0, maxline) + '\r\n';
      line = line.substr(maxline);
    }
  }
  output += line;
  return output;
};

/**
 * Base64 decodes a string into a 'binary' encoded string of bytes.
 *
 * @param input the base64-encoded input.
 *
 * @return the binary encoded string.
 */
util.decode64 = function(input) {
  // TODO: deprecate: "Deprecated. Use util.binary.base64.decode instead."

  // remove all non-base64 characters
  input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');

  var output = '';
  var enc1, enc2, enc3, enc4;
  var i = 0;

  while(i < input.length) {
    enc1 = _base64Idx[input.charCodeAt(i++) - 43];
    enc2 = _base64Idx[input.charCodeAt(i++) - 43];
    enc3 = _base64Idx[input.charCodeAt(i++) - 43];
    enc4 = _base64Idx[input.charCodeAt(i++) - 43];

    output += String.fromCharCode((enc1 << 2) | (enc2 >> 4));
    if(enc3 !== 64) {
      // decoded at least 2 bytes
      output += String.fromCharCode(((enc2 & 15) << 4) | (enc3 >> 2));
      if(enc4 !== 64) {
        // decoded 3 bytes
        output += String.fromCharCode(((enc3 & 3) << 6) | enc4);
      }
    }
  }

  return output;
};

/**
 * UTF-8 encodes the given UTF-16 encoded string (a standard JavaScript
 * string). Non-ASCII characters will be encoded as multiple bytes according
 * to UTF-8.
 *
 * @param str the string to encode.
 *
 * @return the UTF-8 encoded string.
 */
util.encodeUtf8 = function(str) {
  return unescape(encodeURIComponent(str));
};

/**
 * Decodes a UTF-8 encoded string into a UTF-16 string.
 *
 * @param str the string to decode.
 *
 * @return the UTF-16 encoded string (standard JavaScript string).
 */
util.decodeUtf8 = function(str) {
  return decodeURIComponent(escape(str));
};

// binary encoding/decoding tools
// FIXME: Experimental. Do not use yet.
util.binary = {
  raw: {},
  hex: {},
  base64: {}
};

/**
 * Encodes a Uint8Array as a binary-encoded string. This encoding uses
 * a value between 0 and 255 for each character.
 *
 * @param bytes the Uint8Array to encode.
 *
 * @return the binary-encoded string.
 */
util.binary.raw.encode = function(bytes) {
  return String.fromCharCode.apply(null, bytes);
};

/**
 * Decodes a binary-encoded string to a Uint8Array. This encoding uses
 * a value between 0 and 255 for each character.
 *
 * @param str the binary-encoded string to decode.
 * @param [output] an optional Uint8Array to write the output to; if it
 *          is too small, an exception will be thrown.
 * @param [offset] the start offset for writing to the output (default: 0).
 *
 * @return the Uint8Array or the number of bytes written if output was given.
 */
util.binary.raw.decode = function(str, output, offset) {
  var out = output;
  if(!out) {
    out = new Uint8Array(str.length);
  }
  offset = offset || 0;
  var j = offset;
  for(var i = 0; i < str.length; ++i) {
    out[j++] = str.charCodeAt(i);
  }
  return output ? (j - offset) : out;
};

/**
 * Encodes a 'binary' string, ArrayBuffer, DataView, TypedArray, or
 * ByteBuffer as a string of hexadecimal characters.
 *
 * @param bytes the bytes to convert.
 *
 * @return the string of hexadecimal characters.
 */
util.binary.hex.encode = util.bytesToHex;

/**
 * Decodes a hex-encoded string to a Uint8Array.
 *
 * @param hex the hexadecimal string to convert.
 * @param [output] an optional Uint8Array to write the output to; if it
 *          is too small, an exception will be thrown.
 * @param [offset] the start offset for writing to the output (default: 0).
 *
 * @return the Uint8Array or the number of bytes written if output was given.
 */
util.binary.hex.decode = function(hex, output, offset) {
  var out = output;
  if(!out) {
    out = new Uint8Array(Math.ceil(hex.length / 2));
  }
  offset = offset || 0;
  var i = 0, j = offset;
  if(hex.length & 1) {
    // odd number of characters, convert first character alone
    i = 1;
    out[j++] = parseInt(hex[0], 16);
  }
  // convert 2 characters (1 byte) at a time
  for(; i < hex.length; i += 2) {
    out[j++] = parseInt(hex.substr(i, 2), 16);
  }
  return output ? (j - offset) : out;
};

/**
 * Base64-encodes a Uint8Array.
 *
 * @param input the Uint8Array to encode.
 * @param maxline the maximum number of encoded characters per line to use,
 *          defaults to none.
 *
 * @return the base64-encoded output string.
 */
util.binary.base64.encode = function(input, maxline) {
  var line = '';
  var output = '';
  var chr1, chr2, chr3;
  var i = 0;
  while(i < input.byteLength) {
    chr1 = input[i++];
    chr2 = input[i++];
    chr3 = input[i++];

    // encode 4 character group
    line += _base64.charAt(chr1 >> 2);
    line += _base64.charAt(((chr1 & 3) << 4) | (chr2 >> 4));
    if(isNaN(chr2)) {
      line += '==';
    } else {
      line += _base64.charAt(((chr2 & 15) << 2) | (chr3 >> 6));
      line += isNaN(chr3) ? '=' : _base64.charAt(chr3 & 63);
    }

    if(maxline && line.length > maxline) {
      output += line.substr(0, maxline) + '\r\n';
      line = line.substr(maxline);
    }
  }
  output += line;
  return output;
};

/**
 * Decodes a base64-encoded string to a Uint8Array.
 *
 * @param input the base64-encoded input string.
 * @param [output] an optional Uint8Array to write the output to; if it
 *          is too small, an exception will be thrown.
 * @param [offset] the start offset for writing to the output (default: 0).
 *
 * @return the Uint8Array or the number of bytes written if output was given.
 */
util.binary.base64.decode = function(input, output, offset) {
  var out = output;
  if(!out) {
    out = new Uint8Array(Math.ceil(input.length / 4) * 3);
  }

  // remove all non-base64 characters
  input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');

  offset = offset || 0;
  var enc1, enc2, enc3, enc4;
  var i = 0, j = offset;

  while(i < input.length) {
    enc1 = _base64Idx[input.charCodeAt(i++) - 43];
    enc2 = _base64Idx[input.charCodeAt(i++) - 43];
    enc3 = _base64Idx[input.charCodeAt(i++) - 43];
    enc4 = _base64Idx[input.charCodeAt(i++) - 43];

    out[j++] = (enc1 << 2) | (enc2 >> 4);
    if(enc3 !== 64) {
      // decoded at least 2 bytes
      out[j++] = ((enc2 & 15) << 4) | (enc3 >> 2);
      if(enc4 !== 64) {
        // decoded 3 bytes
        out[j++] = ((enc3 & 3) << 6) | enc4;
      }
    }
  }

  // make sure result is the exact decoded length
  return output ?
         (j - offset) :
         out.subarray(0, j);
};

// text encoding/decoding tools
// FIXME: Experimental. Do not use yet.
util.text = {
  utf8: {},
  utf16: {}
};

/**
 * Encodes the given string as UTF-8 in a Uint8Array.
 *
 * @param str the string to encode.
 * @param [output] an optional Uint8Array to write the output to; if it
 *          is too small, an exception will be thrown.
 * @param [offset] the start offset for writing to the output (default: 0).
 *
 * @return the Uint8Array or the number of bytes written if output was given.
 */
util.text.utf8.encode = function(str, output, offset) {
  str = util.encodeUtf8(str);
  var out = output;
  if(!out) {
    out = new Uint8Array(str.length);
  }
  offset = offset || 0;
  var j = offset;
  for(var i = 0; i < str.length; ++i) {
    out[j++] = str.charCodeAt(i);
  }
  return output ? (j - offset) : out;
};

/**
 * Decodes the UTF-8 contents from a Uint8Array.
 *
 * @param bytes the Uint8Array to decode.
 *
 * @return the resulting string.
 */
util.text.utf8.decode = function(bytes) {
  return util.decodeUtf8(String.fromCharCode.apply(null, bytes));
};

/**
 * Encodes the given string as UTF-16 in a Uint8Array.
 *
 * @param str the string to encode.
 * @param [output] an optional Uint8Array to write the output to; if it
 *          is too small, an exception will be thrown.
 * @param [offset] the start offset for writing to the output (default: 0).
 *
 * @return the Uint8Array or the number of bytes written if output was given.
 */
util.text.utf16.encode = function(str, output, offset) {
  var out = output;
  if(!out) {
    out = new Uint8Array(str.length * 2);
  }
  var view = new Uint16Array(out.buffer);
  offset = offset || 0;
  var j = offset;
  var k = offset;
  for(var i = 0; i < str.length; ++i) {
    view[k++] = str.charCodeAt(i);
    j += 2;
  }
  return output ? (j - offset) : out;
};

/**
 * Decodes the UTF-16 contents from a Uint8Array.
 *
 * @param bytes the Uint8Array to decode.
 *
 * @return the resulting string.
 */
util.text.utf16.decode = function(bytes) {
  return String.fromCharCode.apply(null, new Uint16Array(bytes.buffer));
};

/**
 * Deflates the given data using a flash interface.
 *
 * @param api the flash interface.
 * @param bytes the data.
 * @param raw true to return only raw deflate data, false to include zlib
 *          header and trailer.
 *
 * @return the deflated data as a string.
 */
util.deflate = function(api, bytes, raw) {
  bytes = util.decode64(api.deflate(util.encode64(bytes)).rval);

  // strip zlib header and trailer if necessary
  if(raw) {
    // zlib header is 2 bytes (CMF,FLG) where FLG indicates that
    // there is a 4-byte DICT (alder-32) block before the data if
    // its 5th bit is set
    var start = 2;
    var flg = bytes.charCodeAt(1);
    if(flg & 0x20) {
      start = 6;
    }
    // zlib trailer is 4 bytes of adler-32
    bytes = bytes.substring(start, bytes.length - 4);
  }

  return bytes;
};

/**
 * Inflates the given data using a flash interface.
 *
 * @param api the flash interface.
 * @param bytes the data.
 * @param raw true if the incoming data has no zlib header or trailer and is
 *          raw DEFLATE data.
 *
 * @return the inflated data as a string, null on error.
 */
util.inflate = function(api, bytes, raw) {
  // TODO: add zlib header and trailer if necessary/possible
  var rval = api.inflate(util.encode64(bytes)).rval;
  return (rval === null) ? null : util.decode64(rval);
};

/**
 * Sets a storage object.
 *
 * @param api the storage interface.
 * @param id the storage ID to use.
 * @param obj the storage object, null to remove.
 */
var _setStorageObject = function(api, id, obj) {
  if(!api) {
    throw new Error('WebStorage not available.');
  }

  var rval;
  if(obj === null) {
    rval = api.removeItem(id);
  } else {
    // json-encode and base64-encode object
    obj = util.encode64(JSON.stringify(obj));
    rval = api.setItem(id, obj);
  }

  // handle potential flash error
  if(typeof(rval) !== 'undefined' && rval.rval !== true) {
    var error = new Error(rval.error.message);
    error.id = rval.error.id;
    error.name = rval.error.name;
    throw error;
  }
};

/**
 * Gets a storage object.
 *
 * @param api the storage interface.
 * @param id the storage ID to use.
 *
 * @return the storage object entry or null if none exists.
 */
var _getStorageObject = function(api, id) {
  if(!api) {
    throw new Error('WebStorage not available.');
  }

  // get the existing entry
  var rval = api.getItem(id);

  /* Note: We check api.init because we can't do (api == localStorage)
    on IE because of "Class doesn't support Automation" exception. Only
    the flash api has an init method so this works too, but we need a
    better solution in the future. */

  // flash returns item wrapped in an object, handle special case
  if(api.init) {
    if(rval.rval === null) {
      if(rval.error) {
        var error = new Error(rval.error.message);
        error.id = rval.error.id;
        error.name = rval.error.name;
        throw error;
      }
      // no error, but also no item
      rval = null;
    } else {
      rval = rval.rval;
    }
  }

  // handle decoding
  if(rval !== null) {
    // base64-decode and json-decode data
    rval = JSON.parse(util.decode64(rval));
  }

  return rval;
};

/**
 * Stores an item in local storage.
 *
 * @param api the storage interface.
 * @param id the storage ID to use.
 * @param key the key for the item.
 * @param data the data for the item (any javascript object/primitive).
 */
var _setItem = function(api, id, key, data) {
  // get storage object
  var obj = _getStorageObject(api, id);
  if(obj === null) {
    // create a new storage object
    obj = {};
  }
  // update key
  obj[key] = data;

  // set storage object
  _setStorageObject(api, id, obj);
};

/**
 * Gets an item from local storage.
 *
 * @param api the storage interface.
 * @param id the storage ID to use.
 * @param key the key for the item.
 *
 * @return the item.
 */
var _getItem = function(api, id, key) {
  // get storage object
  var rval = _getStorageObject(api, id);
  if(rval !== null) {
    // return data at key
    rval = (key in rval) ? rval[key] : null;
  }

  return rval;
};

/**
 * Removes an item from local storage.
 *
 * @param api the storage interface.
 * @param id the storage ID to use.
 * @param key the key for the item.
 */
var _removeItem = function(api, id, key) {
  // get storage object
  var obj = _getStorageObject(api, id);
  if(obj !== null && key in obj) {
    // remove key
    delete obj[key];

    // see if entry has no keys remaining
    var empty = true;
    for(var prop in obj) {
      empty = false;
      break;
    }
    if(empty) {
      // remove entry entirely if no keys are left
      obj = null;
    }

    // set storage object
    _setStorageObject(api, id, obj);
  }
};

/**
 * Clears the local disk storage identified by the given ID.
 *
 * @param api the storage interface.
 * @param id the storage ID to use.
 */
var _clearItems = function(api, id) {
  _setStorageObject(api, id, null);
};

/**
 * Calls a storage function.
 *
 * @param func the function to call.
 * @param args the arguments for the function.
 * @param location the location argument.
 *
 * @return the return value from the function.
 */
var _callStorageFunction = function(func, args, location) {
  var rval = null;

  // default storage types
  if(typeof(location) === 'undefined') {
    location = ['web', 'flash'];
  }

  // apply storage types in order of preference
  var type;
  var done = false;
  var exception = null;
  for(var idx in location) {
    type = location[idx];
    try {
      if(type === 'flash' || type === 'both') {
        if(args[0] === null) {
          throw new Error('Flash local storage not available.');
        }
        rval = func.apply(this, args);
        done = (type === 'flash');
      }
      if(type === 'web' || type === 'both') {
        args[0] = localStorage;
        rval = func.apply(this, args);
        done = true;
      }
    } catch(ex) {
      exception = ex;
    }
    if(done) {
      break;
    }
  }

  if(!done) {
    throw exception;
  }

  return rval;
};

/**
 * Stores an item on local disk.
 *
 * The available types of local storage include 'flash', 'web', and 'both'.
 *
 * The type 'flash' refers to flash local storage (SharedObject). In order
 * to use flash local storage, the 'api' parameter must be valid. The type
 * 'web' refers to WebStorage, if supported by the browser. The type 'both'
 * refers to storing using both 'flash' and 'web', not just one or the
 * other.
 *
 * The location array should list the storage types to use in order of
 * preference:
 *
 * ['flash']: flash only storage
 * ['web']: web only storage
 * ['both']: try to store in both
 * ['flash','web']: store in flash first, but if not available, 'web'
 * ['web','flash']: store in web first, but if not available, 'flash'
 *
 * The location array defaults to: ['web', 'flash']
 *
 * @param api the flash interface, null to use only WebStorage.
 * @param id the storage ID to use.
 * @param key the key for the item.
 * @param data the data for the item (any javascript object/primitive).
 * @param location an array with the preferred types of storage to use.
 */
util.setItem = function(api, id, key, data, location) {
  _callStorageFunction(_setItem, arguments, location);
};

/**
 * Gets an item on local disk.
 *
 * Set setItem() for details on storage types.
 *
 * @param api the flash interface, null to use only WebStorage.
 * @param id the storage ID to use.
 * @param key the key for the item.
 * @param location an array with the preferred types of storage to use.
 *
 * @return the item.
 */
util.getItem = function(api, id, key, location) {
  return _callStorageFunction(_getItem, arguments, location);
};

/**
 * Removes an item on local disk.
 *
 * Set setItem() for details on storage types.
 *
 * @param api the flash interface.
 * @param id the storage ID to use.
 * @param key the key for the item.
 * @param location an array with the preferred types of storage to use.
 */
util.removeItem = function(api, id, key, location) {
  _callStorageFunction(_removeItem, arguments, location);
};

/**
 * Clears the local disk storage identified by the given ID.
 *
 * Set setItem() for details on storage types.
 *
 * @param api the flash interface if flash is available.
 * @param id the storage ID to use.
 * @param location an array with the preferred types of storage to use.
 */
util.clearItems = function(api, id, location) {
  _callStorageFunction(_clearItems, arguments, location);
};

/**
 * Parses the scheme, host, and port from an http(s) url.
 *
 * @param str the url string.
 *
 * @return the parsed url object or null if the url is invalid.
 */
util.parseUrl = function(str) {
  // FIXME: this regex looks a bit broken
  var regex = /^(https?):\/\/([^:&^\/]*):?(\d*)(.*)$/g;
  regex.lastIndex = 0;
  var m = regex.exec(str);
  var url = (m === null) ? null : {
    full: str,
    scheme: m[1],
    host: m[2],
    port: m[3],
    path: m[4]
  };
  if(url) {
    url.fullHost = url.host;
    if(url.port) {
      if(url.port !== 80 && url.scheme === 'http') {
        url.fullHost += ':' + url.port;
      } else if(url.port !== 443 && url.scheme === 'https') {
        url.fullHost += ':' + url.port;
      }
    } else if(url.scheme === 'http') {
      url.port = 80;
    } else if(url.scheme === 'https') {
      url.port = 443;
    }
    url.full = url.scheme + '://' + url.fullHost;
  }
  return url;
};

/* Storage for query variables */
var _queryVariables = null;

/**
 * Returns the window location query variables. Query is parsed on the first
 * call and the same object is returned on subsequent calls. The mapping
 * is from keys to an array of values. Parameters without values will have
 * an object key set but no value added to the value array. Values are
 * unescaped.
 *
 * ...?k1=v1&k2=v2:
 * {
 *   "k1": ["v1"],
 *   "k2": ["v2"]
 * }
 *
 * ...?k1=v1&k1=v2:
 * {
 *   "k1": ["v1", "v2"]
 * }
 *
 * ...?k1=v1&k2:
 * {
 *   "k1": ["v1"],
 *   "k2": []
 * }
 *
 * ...?k1=v1&k1:
 * {
 *   "k1": ["v1"]
 * }
 *
 * ...?k1&k1:
 * {
 *   "k1": []
 * }
 *
 * @param query the query string to parse (optional, default to cached
 *          results from parsing window location search query).
 *
 * @return object mapping keys to variables.
 */
util.getQueryVariables = function(query) {
  var parse = function(q) {
    var rval = {};
    var kvpairs = q.split('&');
    for(var i = 0; i < kvpairs.length; i++) {
      var pos = kvpairs[i].indexOf('=');
      var key;
      var val;
      if(pos > 0) {
        key = kvpairs[i].substring(0, pos);
        val = kvpairs[i].substring(pos + 1);
      } else {
        key = kvpairs[i];
        val = null;
      }
      if(!(key in rval)) {
        rval[key] = [];
      }
      // disallow overriding object prototype keys
      if(!(key in Object.prototype) && val !== null) {
        rval[key].push(unescape(val));
      }
    }
    return rval;
  };

   var rval;
   if(typeof(query) === 'undefined') {
     // set cached variables if needed
     if(_queryVariables === null) {
       if(typeof(window) !== 'undefined' && window.location && window.location.search) {
          // parse window search query
          _queryVariables = parse(window.location.search.substring(1));
       } else {
          // no query variables available
          _queryVariables = {};
       }
     }
     rval = _queryVariables;
   } else {
     // parse given query
     rval = parse(query);
   }
   return rval;
};

/**
 * Parses a fragment into a path and query. This method will take a URI
 * fragment and break it up as if it were the main URI. For example:
 *    /bar/baz?a=1&b=2
 * results in:
 *    {
 *       path: ["bar", "baz"],
 *       query: {"k1": ["v1"], "k2": ["v2"]}
 *    }
 *
 * @return object with a path array and query object.
 */
util.parseFragment = function(fragment) {
  // default to whole fragment
  var fp = fragment;
  var fq = '';
  // split into path and query if possible at the first '?'
  var pos = fragment.indexOf('?');
  if(pos > 0) {
    fp = fragment.substring(0, pos);
    fq = fragment.substring(pos + 1);
  }
  // split path based on '/' and ignore first element if empty
  var path = fp.split('/');
  if(path.length > 0 && path[0] === '') {
    path.shift();
  }
  // convert query into object
  var query = (fq === '') ? {} : util.getQueryVariables(fq);

  return {
    pathString: fp,
    queryString: fq,
    path: path,
    query: query
  };
};

/**
 * Makes a request out of a URI-like request string. This is intended to
 * be used where a fragment id (after a URI '#') is parsed as a URI with
 * path and query parts. The string should have a path beginning and
 * delimited by '/' and optional query parameters following a '?'. The
 * query should be a standard URL set of key value pairs delimited by
 * '&'. For backwards compatibility the initial '/' on the path is not
 * required. The request object has the following API, (fully described
 * in the method code):
 *    {
 *       path: <the path string part>.
 *       query: <the query string part>,
 *       getPath(i): get part or all of the split path array,
 *       getQuery(k, i): get part or all of a query key array,
 *       getQueryLast(k, _default): get last element of a query key array.
 *    }
 *
 * @return object with request parameters.
 */
util.makeRequest = function(reqString) {
  var frag = util.parseFragment(reqString);
  var req = {
    // full path string
    path: frag.pathString,
    // full query string
    query: frag.queryString,
    /**
     * Get path or element in path.
     *
     * @param i optional path index.
     *
     * @return path or part of path if i provided.
     */
    getPath: function(i) {
      return (typeof(i) === 'undefined') ? frag.path : frag.path[i];
    },
    /**
     * Get query, values for a key, or value for a key index.
     *
     * @param k optional query key.
     * @param i optional query key index.
     *
     * @return query, values for a key, or value for a key index.
     */
    getQuery: function(k, i) {
      var rval;
      if(typeof(k) === 'undefined') {
        rval = frag.query;
      } else {
        rval = frag.query[k];
        if(rval && typeof(i) !== 'undefined') {
           rval = rval[i];
        }
      }
      return rval;
    },
    getQueryLast: function(k, _default) {
      var rval;
      var vals = req.getQuery(k);
      if(vals) {
        rval = vals[vals.length - 1];
      } else {
        rval = _default;
      }
      return rval;
    }
  };
  return req;
};

/**
 * Makes a URI out of a path, an object with query parameters, and a
 * fragment. Uses jQuery.param() internally for query string creation.
 * If the path is an array, it will be joined with '/'.
 *
 * @param path string path or array of strings.
 * @param query object with query parameters. (optional)
 * @param fragment fragment string. (optional)
 *
 * @return string object with request parameters.
 */
util.makeLink = function(path, query, fragment) {
  // join path parts if needed
  path = jQuery.isArray(path) ? path.join('/') : path;

  var qstr = jQuery.param(query || {});
  fragment = fragment || '';
  return path +
    ((qstr.length > 0) ? ('?' + qstr) : '') +
    ((fragment.length > 0) ? ('#' + fragment) : '');
};

/**
 * Follows a path of keys deep into an object hierarchy and set a value.
 * If a key does not exist or it's value is not an object, create an
 * object in it's place. This can be destructive to a object tree if
 * leaf nodes are given as non-final path keys.
 * Used to avoid exceptions from missing parts of the path.
 *
 * @param object the starting object.
 * @param keys an array of string keys.
 * @param value the value to set.
 */
util.setPath = function(object, keys, value) {
  // need to start at an object
  if(typeof(object) === 'object' && object !== null) {
    var i = 0;
    var len = keys.length;
    while(i < len) {
      var next = keys[i++];
      if(i == len) {
        // last
        object[next] = value;
      } else {
        // more
        var hasNext = (next in object);
        if(!hasNext ||
          (hasNext && typeof(object[next]) !== 'object') ||
          (hasNext && object[next] === null)) {
          object[next] = {};
        }
        object = object[next];
      }
    }
  }
};

/**
 * Follows a path of keys deep into an object hierarchy and return a value.
 * If a key does not exist, create an object in it's place.
 * Used to avoid exceptions from missing parts of the path.
 *
 * @param object the starting object.
 * @param keys an array of string keys.
 * @param _default value to return if path not found.
 *
 * @return the value at the path if found, else default if given, else
 *         undefined.
 */
util.getPath = function(object, keys, _default) {
  var i = 0;
  var len = keys.length;
  var hasNext = true;
  while(hasNext && i < len &&
    typeof(object) === 'object' && object !== null) {
    var next = keys[i++];
    hasNext = next in object;
    if(hasNext) {
      object = object[next];
    }
  }
  return (hasNext ? object : _default);
};

/**
 * Follow a path of keys deep into an object hierarchy and delete the
 * last one. If a key does not exist, do nothing.
 * Used to avoid exceptions from missing parts of the path.
 *
 * @param object the starting object.
 * @param keys an array of string keys.
 */
util.deletePath = function(object, keys) {
  // need to start at an object
  if(typeof(object) === 'object' && object !== null) {
    var i = 0;
    var len = keys.length;
    while(i < len) {
      var next = keys[i++];
      if(i == len) {
        // last
        delete object[next];
      } else {
        // more
        if(!(next in object) ||
          (typeof(object[next]) !== 'object') ||
          (object[next] === null)) {
           break;
        }
        object = object[next];
      }
    }
  }
};

/**
 * Check if an object is empty.
 *
 * Taken from:
 * http://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object-from-json/679937#679937
 *
 * @param object the object to check.
 */
util.isEmpty = function(obj) {
  for(var prop in obj) {
    if(obj.hasOwnProperty(prop)) {
      return false;
    }
  }
  return true;
};

/**
 * Format with simple printf-style interpolation.
 *
 * %%: literal '%'
 * %s,%o: convert next argument into a string.
 *
 * @param format the string to format.
 * @param ... arguments to interpolate into the format string.
 */
util.format = function(format) {
  var re = /%./g;
  // current match
  var match;
  // current part
  var part;
  // current arg index
  var argi = 0;
  // collected parts to recombine later
  var parts = [];
  // last index found
  var last = 0;
  // loop while matches remain
  while((match = re.exec(format))) {
    part = format.substring(last, re.lastIndex - 2);
    // don't add empty strings (ie, parts between %s%s)
    if(part.length > 0) {
      parts.push(part);
    }
    last = re.lastIndex;
    // switch on % code
    var code = match[0][1];
    switch(code) {
    case 's':
    case 'o':
      // check if enough arguments were given
      if(argi < arguments.length) {
        parts.push(arguments[argi++ + 1]);
      } else {
        parts.push('<?>');
      }
      break;
    // FIXME: do proper formating for numbers, etc
    //case 'f':
    //case 'd':
    case '%':
      parts.push('%');
      break;
    default:
      parts.push('<%' + code + '?>');
    }
  }
  // add trailing part of format string
  parts.push(format.substring(last));
  return parts.join('');
};

/**
 * Formats a number.
 *
 * http://snipplr.com/view/5945/javascript-numberformat--ported-from-php/
 */
util.formatNumber = function(number, decimals, dec_point, thousands_sep) {
  // http://kevin.vanzonneveld.net
  // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +     bugfix by: Michael White (http://crestidg.com)
  // +     bugfix by: Benjamin Lupton
  // +     bugfix by: Allan Jensen (http://www.winternet.no)
  // +    revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
  // *     example 1: number_format(1234.5678, 2, '.', '');
  // *     returns 1: 1234.57

  var n = number, c = isNaN(decimals = Math.abs(decimals)) ? 2 : decimals;
  var d = dec_point === undefined ? ',' : dec_point;
  var t = thousands_sep === undefined ?
   '.' : thousands_sep, s = n < 0 ? '-' : '';
  var i = parseInt((n = Math.abs(+n || 0).toFixed(c)), 10) + '';
  var j = (i.length > 3) ? i.length % 3 : 0;
  return s + (j ? i.substr(0, j) + t : '') +
    i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + t) +
    (c ? d + Math.abs(n - i).toFixed(c).slice(2) : '');
};

/**
 * Formats a byte size.
 *
 * http://snipplr.com/view/5949/format-humanize-file-byte-size-presentation-in-javascript/
 */
util.formatSize = function(size) {
  if(size >= 1073741824) {
    size = util.formatNumber(size / 1073741824, 2, '.', '') + ' GiB';
  } else if(size >= 1048576) {
    size = util.formatNumber(size / 1048576, 2, '.', '') + ' MiB';
  } else if(size >= 1024) {
    size = util.formatNumber(size / 1024, 0) + ' KiB';
  } else {
    size = util.formatNumber(size, 0) + ' bytes';
  }
  return size;
};

/**
 * Converts an IPv4 or IPv6 string representation into bytes (in network order).
 *
 * @param ip the IPv4 or IPv6 address to convert.
 *
 * @return the 4-byte IPv6 or 16-byte IPv6 address or null if the address can't
 *         be parsed.
 */
util.bytesFromIP = function(ip) {
  if(ip.indexOf('.') !== -1) {
    return util.bytesFromIPv4(ip);
  }
  if(ip.indexOf(':') !== -1) {
    return util.bytesFromIPv6(ip);
  }
  return null;
};

/**
 * Converts an IPv4 string representation into bytes (in network order).
 *
 * @param ip the IPv4 address to convert.
 *
 * @return the 4-byte address or null if the address can't be parsed.
 */
util.bytesFromIPv4 = function(ip) {
  ip = ip.split('.');
  if(ip.length !== 4) {
    return null;
  }
  var b = util.createBuffer();
  for(var i = 0; i < ip.length; ++i) {
    var num = parseInt(ip[i], 10);
    if(isNaN(num)) {
      return null;
    }
    b.putByte(num);
  }
  return b.getBytes();
};

/**
 * Converts an IPv6 string representation into bytes (in network order).
 *
 * @param ip the IPv6 address to convert.
 *
 * @return the 16-byte address or null if the address can't be parsed.
 */
util.bytesFromIPv6 = function(ip) {
  var blanks = 0;
  ip = ip.split(':').filter(function(e) {
    if(e.length === 0) ++blanks;
    return true;
  });
  var zeros = (8 - ip.length + blanks) * 2;
  var b = util.createBuffer();
  for(var i = 0; i < 8; ++i) {
    if(!ip[i] || ip[i].length === 0) {
      b.fillWithByte(0, zeros);
      zeros = 0;
      continue;
    }
    var bytes = util.hexToBytes(ip[i]);
    if(bytes.length < 2) {
      b.putByte(0);
    }
    b.putBytes(bytes);
  }
  return b.getBytes();
};

/**
 * Converts 4-bytes into an IPv4 string representation or 16-bytes into
 * an IPv6 string representation. The bytes must be in network order.
 *
 * @param bytes the bytes to convert.
 *
 * @return the IPv4 or IPv6 string representation if 4 or 16 bytes,
 *         respectively, are given, otherwise null.
 */
util.bytesToIP = function(bytes) {
  if(bytes.length === 4) {
    return util.bytesToIPv4(bytes);
  }
  if(bytes.length === 16) {
    return util.bytesToIPv6(bytes);
  }
  return null;
};

/**
 * Converts 4-bytes into an IPv4 string representation. The bytes must be
 * in network order.
 *
 * @param bytes the bytes to convert.
 *
 * @return the IPv4 string representation or null for an invalid # of bytes.
 */
util.bytesToIPv4 = function(bytes) {
  if(bytes.length !== 4) {
    return null;
  }
  var ip = [];
  for(var i = 0; i < bytes.length; ++i) {
    ip.push(bytes.charCodeAt(i));
  }
  return ip.join('.');
};

/**
 * Converts 16-bytes into an IPv16 string representation. The bytes must be
 * in network order.
 *
 * @param bytes the bytes to convert.
 *
 * @return the IPv16 string representation or null for an invalid # of bytes.
 */
util.bytesToIPv6 = function(bytes) {
  if(bytes.length !== 16) {
    return null;
  }
  var ip = [];
  var zeroGroups = [];
  var zeroMaxGroup = 0;
  for(var i = 0; i < bytes.length; i += 2) {
    var hex = util.bytesToHex(bytes[i] + bytes[i + 1]);
    // canonicalize zero representation
    while(hex[0] === '0' && hex !== '0') {
      hex = hex.substr(1);
    }
    if(hex === '0') {
      var last = zeroGroups[zeroGroups.length - 1];
      var idx = ip.length;
      if(!last || idx !== last.end + 1) {
        zeroGroups.push({start: idx, end: idx});
      } else {
        last.end = idx;
        if((last.end - last.start) >
          (zeroGroups[zeroMaxGroup].end - zeroGroups[zeroMaxGroup].start)) {
          zeroMaxGroup = zeroGroups.length - 1;
        }
      }
    }
    ip.push(hex);
  }
  if(zeroGroups.length > 0) {
    var group = zeroGroups[zeroMaxGroup];
    // only shorten group of length > 0
    if(group.end - group.start > 0) {
      ip.splice(group.start, group.end - group.start + 1, '');
      if(group.start === 0) {
        ip.unshift('');
      }
      if(group.end === 7) {
        ip.push('');
      }
    }
  }
  return ip.join(':');
};

/**
 * Estimates the number of processes that can be run concurrently. If
 * creating Web Workers, keep in mind that the main JavaScript process needs
 * its own core.
 *
 * @param options the options to use:
 *          update true to force an update (not use the cached value).
 * @param callback(err, max) called once the operation completes.
 */
util.estimateCores = function(options, callback) {
  if(typeof options === 'function') {
    callback = options;
    options = {};
  }
  options = options || {};
  if('cores' in util && !options.update) {
    return callback(null, util.cores);
  }
  if(typeof navigator !== 'undefined' &&
    'hardwareConcurrency' in navigator &&
    navigator.hardwareConcurrency > 0) {
    util.cores = navigator.hardwareConcurrency;
    return callback(null, util.cores);
  }
  if(typeof Worker === 'undefined') {
    // workers not available
    util.cores = 1;
    return callback(null, util.cores);
  }
  if(typeof Blob === 'undefined') {
    // can't estimate, default to 2
    util.cores = 2;
    return callback(null, util.cores);
  }

  // create worker concurrency estimation code as blob
  var blobUrl = URL.createObjectURL(new Blob(['(',
    function() {
      self.addEventListener('message', function(e) {
        // run worker for 4 ms
        var st = Date.now();
        var et = st + 4;
        while(Date.now() < et);
        self.postMessage({st: st, et: et});
      });
    }.toString(),
  ')()'], {type: 'application/javascript'}));

  // take 5 samples using 16 workers
  sample([], 5, 16);

  function sample(max, samples, numWorkers) {
    if(samples === 0) {
      // get overlap average
      var avg = Math.floor(max.reduce(function(avg, x) {
        return avg + x;
      }, 0) / max.length);
      util.cores = Math.max(1, avg);
      URL.revokeObjectURL(blobUrl);
      return callback(null, util.cores);
    }
    map(numWorkers, function(err, results) {
      max.push(reduce(numWorkers, results));
      sample(max, samples - 1, numWorkers);
    });
  }

  function map(numWorkers, callback) {
    var workers = [];
    var results = [];
    for(var i = 0; i < numWorkers; ++i) {
      var worker = new Worker(blobUrl);
      worker.addEventListener('message', function(e) {
        results.push(e.data);
        if(results.length === numWorkers) {
          for(var i = 0; i < numWorkers; ++i) {
            workers[i].terminate();
          }
          callback(null, results);
        }
      });
      workers.push(worker);
    }
    for(var i = 0; i < numWorkers; ++i) {
      workers[i].postMessage(i);
    }
  }

  function reduce(numWorkers, results) {
    // find overlapping time windows
    var overlaps = [];
    for(var n = 0; n < numWorkers; ++n) {
      var r1 = results[n];
      var overlap = overlaps[n] = [];
      for(var i = 0; i < numWorkers; ++i) {
        if(n === i) {
          continue;
        }
        var r2 = results[i];
        if((r1.st > r2.st && r1.st < r2.et) ||
          (r2.st > r1.st && r2.st < r1.et)) {
          overlap.push(i);
        }
      }
    }
    // get maximum overlaps ... don't include overlapping worker itself
    // as the main JS process was also being scheduled during the work and
    // would have to be subtracted from the estimate anyway
    return overlaps.reduce(function(max, overlap) {
      return Math.max(max, overlap.length);
    }, 0);
  }
};


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright (c) 2016-2017 Digital Bazaar, Inc. All rights reserved.
 */


// TODO: convert to ES6 iterable

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
  /**
   * A Permutator iterates over all possible permutations of the given array
   * of elements.
   *
   * @param list the array of elements to iterate over.
   */
  function Permutator(list) {
    _classCallCheck(this, Permutator);

    // original array
    this.list = list.sort();
    // indicates whether there are more permutations
    this.done = false;
    // directional info for permutation algorithm
    this.left = {};
    for (var i = 0; i < list.length; ++i) {
      this.left[list[i]] = true;
    }
  }

  /**
   * Returns true if there is another permutation.
   *
   * @return true if there is another permutation, false if not.
   */


  _createClass(Permutator, [{
    key: 'hasNext',
    value: function hasNext() {
      return !this.done;
    }

    /**
     * Gets the next permutation. Call hasNext() to ensure there is another one
     * first.
     *
     * @return the next permutation.
     */

  }, {
    key: 'next',
    value: function next() {
      // copy current permutation
      var rval = this.list.slice();

      /* Calculate the next permutation using the Steinhaus-Johnson-Trotter
       permutation algorithm. */

      // get largest mobile element k
      // (mobile: element is greater than the one it is looking at)
      var k = null;
      var pos = 0;
      var length = this.list.length;
      for (var i = 0; i < length; ++i) {
        var element = this.list[i];
        var left = this.left[element];
        if ((k === null || element > k) && (left && i > 0 && element > this.list[i - 1] || !left && i < length - 1 && element > this.list[i + 1])) {
          k = element;
          pos = i;
        }
      }

      // no more permutations
      if (k === null) {
        this.done = true;
      } else {
        // swap k and the element it is looking at
        var swap = this.left[k] ? pos - 1 : pos + 1;
        this.list[pos] = this.list[swap];
        this.list[swap] = k;

        // reverse the direction of all elements larger than k
        for (var _i = 0; _i < length; ++_i) {
          if (this.list[_i] > k) {
            this.left[this.list[_i]] = !this.left[this.list[_i]];
          }
        }
      }

      return rval;
    }
  }]);

  return Permutator;
}();

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright (c) 2016 Digital Bazaar, Inc. All rights reserved.
 */


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var IdentifierIssuer = __webpack_require__(45);
var MessageDigest = __webpack_require__(69);
var Permutator = __webpack_require__(71);
var NQuads = __webpack_require__(47);
var util = __webpack_require__(14);

var POSITIONS = { 'subject': 's', 'object': 'o', 'graph': 'g' };

module.exports = function () {
  function URDNA2015Sync() {
    _classCallCheck(this, URDNA2015Sync);

    this.name = 'URDNA2015';
    this.blankNodeInfo = {};
    this.hashToBlankNodes = {};
    this.canonicalIssuer = new IdentifierIssuer('_:c14n');
    this.hashAlgorithm = 'sha256';
    this.quads;
  }

  // 4.4) Normalization Algorithm


  _createClass(URDNA2015Sync, [{
    key: 'main',
    value: function main(dataset) {
      var self = this;
      self.quads = dataset;

      // 1) Create the normalization state.

      // Note: Optimize by generating non-normalized blank node map concurrently.
      var nonNormalized = {};

      // 2) For every quad in input dataset:

      var _loop = function _loop(quad) {
        // 2.1) For each blank node that occurs in the quad, add a reference
        // to the quad using the blank node identifier in the blank node to
        // quads map, creating a new entry if necessary.
        self.forEachComponent(quad, function (component) {
          if (component.termType !== 'BlankNode') {
            return;
          }
          var id = component.value;
          if (id in self.blankNodeInfo) {
            self.blankNodeInfo[id].quads.push(quad);
          } else {
            nonNormalized[id] = true;
            self.blankNodeInfo[id] = { quads: [quad] };
          }
        });
      };

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = dataset[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var quad = _step.value;

          _loop(quad);
        }

        // 3) Create a list of non-normalized blank node identifiers
        // non-normalized identifiers and populate it using the keys from the
        // blank node to quads map.
        // Note: We use a map here and it was generated during step 2.

        // 4) Initialize simple, a boolean flag, to true.
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      var simple = true;

      // 5) While simple is true, issue canonical identifiers for blank nodes:
      while (simple) {
        // 5.1) Set simple to false.
        simple = false;

        // 5.2) Clear hash to blank nodes map.
        self.hashToBlankNodes = {};

        // 5.3) For each blank node identifier identifier in non-normalized
        // identifiers:
        for (var id in nonNormalized) {
          // 5.3.1) Create a hash, hash, according to the Hash First Degree
          // Quads algorithm.
          var hash = self.hashFirstDegreeQuads(id);

          // 5.3.2) Add hash and identifier to hash to blank nodes map,
          // creating a new entry if necessary.
          if (hash in self.hashToBlankNodes) {
            self.hashToBlankNodes[hash].push(id);
          } else {
            self.hashToBlankNodes[hash] = [id];
          }
        }

        // 5.4) For each hash to identifier list mapping in hash to blank
        // nodes map, lexicographically-sorted by hash:
        var _hashes = Object.keys(self.hashToBlankNodes).sort();
        for (var i = 0; i < _hashes.length; ++i) {
          // 5.4.1) If the length of identifier list is greater than 1,
          // continue to the next mapping.
          var _hash = _hashes[i];
          var idList = self.hashToBlankNodes[_hash];
          if (idList.length > 1) {
            continue;
          }

          // 5.4.2) Use the Issue Identifier algorithm, passing canonical
          // issuer and the single blank node identifier in identifier
          // list, identifier, to issue a canonical replacement identifier
          // for identifier.
          // TODO: consider changing `getId` to `issue`
          var _id = idList[0];
          self.canonicalIssuer.getId(_id);

          // 5.4.3) Remove identifier from non-normalized identifiers.
          delete nonNormalized[_id];

          // 5.4.4) Remove hash from the hash to blank nodes map.
          delete self.hashToBlankNodes[_hash];

          // 5.4.5) Set simple to true.
          simple = true;
        }
      }

      // 6) For each hash to identifier list mapping in hash to blank nodes map,
      // lexicographically-sorted by hash:
      var hashes = Object.keys(self.hashToBlankNodes).sort();
      for (var _i = 0; _i < hashes.length; ++_i) {
        // 6.1) Create hash path list where each item will be a result of
        // running the Hash N-Degree Quads algorithm.
        var hashPathList = [];

        // 6.2) For each blank node identifier identifier in identifier list:
        var _hash2 = hashes[_i];
        var _idList = self.hashToBlankNodes[_hash2];
        for (var j = 0; j < _idList.length; ++j) {
          // 6.2.1) If a canonical identifier has already been issued for
          // identifier, continue to the next identifier.
          var _id2 = _idList[j];
          if (self.canonicalIssuer.hasId(_id2)) {
            continue;
          }

          // 6.2.2) Create temporary issuer, an identifier issuer
          // initialized with the prefix _:b.
          var issuer = new IdentifierIssuer('_:b');

          // 6.2.3) Use the Issue Identifier algorithm, passing temporary
          // issuer and identifier, to issue a new temporary blank node
          // identifier for identifier.
          issuer.getId(_id2);

          // 6.2.4) Run the Hash N-Degree Quads algorithm, passing
          // temporary issuer, and append the result to the hash path list.
          var result = self.hashNDegreeQuads(_id2, issuer);
          hashPathList.push(result);
        }

        // 6.3) For each result in the hash path list,
        // lexicographically-sorted by the hash in result:
        // TODO: use `String.localeCompare`?
        hashPathList.sort(function (a, b) {
          return a.hash < b.hash ? -1 : a.hash > b.hash ? 1 : 0;
        });
        for (var _j = 0; _j < hashPathList.length; ++_j) {
          // 6.3.1) For each blank node identifier, existing identifier,
          // that was issued a temporary identifier by identifier issuer
          // in result, issue a canonical identifier, in the same order,
          // using the Issue Identifier algorithm, passing canonical
          // issuer and existing identifier.
          var _result = hashPathList[_j];
          for (var existing in _result.issuer.existing) {
            self.canonicalIssuer.getId(existing);
          }
        }
      }

      /* Note: At this point all blank nodes in the set of RDF quads have been
      assigned canonical identifiers, which have been stored in the canonical
      issuer. Here each quad is updated by assigning each of its blank nodes
      its new identifier. */

      // 7) For each quad, quad, in input dataset:
      var normalized = [];
      for (var _i2 = 0; _i2 < self.quads.length; ++_i2) {
        // 7.1) Create a copy, quad copy, of quad and replace any existing
        // blank node identifiers using the canonical identifiers
        // previously issued by canonical issuer.
        // Note: We optimize away the copy here.
        var quad = self.quads[_i2];
        self.forEachComponent(quad, function (component) {
          if (component.termType === 'BlankNode' && !component.value.startsWith(self.canonicalIssuer.prefix)) {
            component.value = self.canonicalIssuer.getId(component.value);
          }
        });
        // 7.2) Add quad copy to the normalized dataset.
        normalized.push(NQuads.serializeQuad(quad));
      }

      // sort normalized output
      normalized.sort();

      // 8) Return the normalized dataset.
      return normalized.join('');
    }

    // 4.6) Hash First Degree Quads

  }, {
    key: 'hashFirstDegreeQuads',
    value: function hashFirstDegreeQuads(id) {
      var self = this;

      // return cached hash
      var info = self.blankNodeInfo[id];
      if ('hash' in info) {
        return info.hash;
      }

      // 1) Initialize nquads to an empty list. It will be used to store quads in
      // N-Quads format.
      var nquads = [];

      // 2) Get the list of quads `quads` associated with the reference blank node
      // identifier in the blank node to quads map.
      var quads = info.quads;

      // 3) For each quad `quad` in `quads`:

      var _loop2 = function _loop2(i) {
        var quad = quads[i];

        // 3.1) Serialize the quad in N-Quads format with the following special
        // rule:

        // 3.1.1) If any component in quad is an blank node, then serialize it
        // using a special identifier as follows:
        var copy = { predicate: quad.predicate };
        self.forEachComponent(quad, function (component, key) {
          // 3.1.2) If the blank node's existing blank node identifier matches
          // the reference blank node identifier then use the blank node
          // identifier _:a, otherwise, use the blank node identifier _:z.
          copy[key] = self.modifyFirstDegreeComponent(id, component, key);
        });
        nquads.push(NQuads.serializeQuad(copy));
      };

      for (var i = 0; i < quads.length; ++i) {
        _loop2(i);
      }

      // 4) Sort nquads in lexicographical order.
      nquads.sort();

      // 5) Return the hash that results from passing the sorted, joined nquads
      // through the hash algorithm.
      var md = new MessageDigest(self.hashAlgorithm);
      for (var i = 0; i < nquads.length; ++i) {
        md.update(nquads[i]);
      }
      // TODO: represent as byte buffer instead to cut memory usage in half
      info.hash = md.digest();
      return info.hash;
    }

    // 4.7) Hash Related Blank Node

  }, {
    key: 'hashRelatedBlankNode',
    value: function hashRelatedBlankNode(related, quad, issuer, position) {
      var self = this;

      // 1) Set the identifier to use for related, preferring first the canonical
      // identifier for related if issued, second the identifier issued by issuer
      // if issued, and last, if necessary, the result of the Hash First Degree
      // Quads algorithm, passing related.
      var id = void 0;
      if (self.canonicalIssuer.hasId(related)) {
        id = self.canonicalIssuer.getId(related);
      } else if (issuer.hasId(related)) {
        id = issuer.getId(related);
      } else {
        id = self.hashFirstDegreeQuads(related);
      }

      // 2) Initialize a string input to the value of position.
      // Note: We use a hash object instead.
      var md = new MessageDigest(self.hashAlgorithm);
      md.update(position);

      // 3) If position is not g, append <, the value of the predicate in quad,
      // and > to input.
      if (position !== 'g') {
        md.update(self.getRelatedPredicate(quad));
      }

      // 4) Append identifier to input.
      md.update(id);

      // 5) Return the hash that results from passing input through the hash
      // algorithm.
      // TODO: represent as byte buffer instead to cut memory usage in half
      return md.digest();
    }

    // 4.8) Hash N-Degree Quads

  }, {
    key: 'hashNDegreeQuads',
    value: function hashNDegreeQuads(id, issuer) {
      var self = this;

      // 1) Create a hash to related blank nodes map for storing hashes that
      // identify related blank nodes.
      // Note: 2) and 3) handled within `createHashToRelated`
      var md = new MessageDigest(self.hashAlgorithm);
      var hashToRelated = self.createHashToRelated(id, issuer);

      // 4) Create an empty string, data to hash.
      // Note: We created a hash object `md` above instead.

      // 5) For each related hash to blank node list mapping in hash to related
      // blank nodes map, sorted lexicographically by related hash:
      var hashes = Object.keys(hashToRelated).sort();
      for (var i = 0; i < hashes.length; ++i) {
        // 5.1) Append the related hash to the data to hash.
        var hash = hashes[i];
        md.update(hash);

        // 5.2) Create a string chosen path.
        var chosenPath = '';

        // 5.3) Create an unset chosen issuer variable.
        var chosenIssuer = void 0;

        // 5.4) For each permutation of blank node list:
        var permutator = new Permutator(hashToRelated[hash]);
        while (permutator.hasNext()) {
          var permutation = permutator.next();

          // 5.4.1) Create a copy of issuer, issuer copy.
          var issuerCopy = issuer.clone();

          // 5.4.2) Create a string path.
          var path = '';

          // 5.4.3) Create a recursion list, to store blank node identifiers
          // that must be recursively processed by this algorithm.
          var recursionList = [];

          // 5.4.4) For each related in permutation:
          var nextPermutation = false;
          for (var j = 0; j < permutation.length; ++j) {
            // 5.4.4.1) If a canonical identifier has been issued for
            // related, append it to path.
            var related = permutation[j];
            if (self.canonicalIssuer.hasId(related)) {
              path += self.canonicalIssuer.getId(related);
            } else {
              // 5.4.4.2) Otherwise:
              // 5.4.4.2.1) If issuer copy has not issued an identifier for
              // related, append related to recursion list.
              if (!issuerCopy.hasId(related)) {
                recursionList.push(related);
              }
              // 5.4.4.2.2) Use the Issue Identifier algorithm, passing
              // issuer copy and related and append the result to path.
              path += issuerCopy.getId(related);
            }

            // 5.4.4.3) If chosen path is not empty and the length of path
            // is greater than or equal to the length of chosen path and
            // path is lexicographically greater than chosen path, then
            // skip to the next permutation.
            if (chosenPath.length !== 0 && path.length >= chosenPath.length && path > chosenPath) {
              nextPermutation = true;
              break;
            }
          }

          if (nextPermutation) {
            continue;
          }

          // 5.4.5) For each related in recursion list:
          for (var _j2 = 0; _j2 < recursionList.length; ++_j2) {
            // 5.4.5.1) Set result to the result of recursively executing
            // the Hash N-Degree Quads algorithm, passing related for
            // identifier and issuer copy for path identifier issuer.
            var _related = recursionList[_j2];
            var result = self.hashNDegreeQuads(_related, issuerCopy);

            // 5.4.5.2) Use the Issue Identifier algorithm, passing issuer
            // copy and related and append the result to path.
            path += issuerCopy.getId(_related);

            // 5.4.5.3) Append <, the hash in result, and > to path.
            path += '<' + result.hash + '>';

            // 5.4.5.4) Set issuer copy to the identifier issuer in
            // result.
            issuerCopy = result.issuer;

            // 5.4.5.5) If chosen path is not empty and the length of path
            // is greater than or equal to the length of chosen path and
            // path is lexicographically greater than chosen path, then
            // skip to the next permutation.
            if (chosenPath.length !== 0 && path.length >= chosenPath.length && path > chosenPath) {
              nextPermutation = true;
              break;
            }
          }

          if (nextPermutation) {
            continue;
          }

          // 5.4.6) If chosen path is empty or path is lexicographically
          // less than chosen path, set chosen path to path and chosen
          // issuer to issuer copy.
          if (chosenPath.length === 0 || path < chosenPath) {
            chosenPath = path;
            chosenIssuer = issuerCopy;
          }
        }

        // 5.5) Append chosen path to data to hash.
        md.update(chosenPath);

        // 5.6) Replace issuer, by reference, with chosen issuer.
        issuer = chosenIssuer;
      }

      // 6) Return issuer and the hash that results from passing data to hash
      // through the hash algorithm.
      return { hash: md.digest(), issuer: issuer };
    }

    // helper for modifying component during Hash First Degree Quads

  }, {
    key: 'modifyFirstDegreeComponent',
    value: function modifyFirstDegreeComponent(id, component) {
      if (component.termType !== 'BlankNode') {
        return component;
      }
      component = util.clone(component);
      component.value = component.value === id ? '_:a' : '_:z';
      return component;
    }

    // helper for getting a related predicate

  }, {
    key: 'getRelatedPredicate',
    value: function getRelatedPredicate(quad) {
      return '<' + quad.predicate.value + '>';
    }

    // helper for creating hash to related blank nodes map

  }, {
    key: 'createHashToRelated',
    value: function createHashToRelated(id, issuer) {
      var self = this;

      // 1) Create a hash to related blank nodes map for storing hashes that
      // identify related blank nodes.
      var hashToRelated = {};

      // 2) Get a reference, quads, to the list of quads in the blank node to
      // quads map for the key identifier.
      var quads = self.blankNodeInfo[id].quads;

      // 3) For each quad in quads:
      for (var i = 0; i < quads.length; ++i) {
        // 3.1) For each component in quad, if component is the subject, object,
        // and graph name and it is a blank node that is not identified by
        // identifier:
        var quad = quads[i];
        for (var key in quad) {
          var component = quad[key];
          if (key === 'predicate' || !(component.termType === 'BlankNode' && component.value !== id)) {
            continue;
          }
          // 3.1.1) Set hash to the result of the Hash Related Blank Node
          // algorithm, passing the blank node identifier for component as
          // related, quad, path identifier issuer as issuer, and position as
          // either s, o, or g based on whether component is a subject, object,
          // graph name, respectively.
          var related = component.value;
          var position = POSITIONS[key];
          var hash = self.hashRelatedBlankNode(related, quad, issuer, position);

          // 3.1.2) Add a mapping of hash to the blank node identifier for
          // component to hash to related blank nodes map, adding an entry as
          // necessary.
          if (hash in hashToRelated) {
            hashToRelated[hash].push(related);
          } else {
            hashToRelated[hash] = [related];
          }
        }
      }

      return hashToRelated;
    }

    // helper that iterates over quad components (skips predicate)

  }, {
    key: 'forEachComponent',
    value: function forEachComponent(quad, op) {
      for (var key in quad) {
        // skip `predicate`
        if (key === 'predicate') {
          continue;
        }
        op(quad[key], key, quad);
      }
    }
  }]);

  return URDNA2015Sync;
}();

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(74);
__webpack_require__(75);
__webpack_require__(78);
__webpack_require__(81);
__webpack_require__(103);
module.exports = __webpack_require__(112);


/***/ }),
/* 74 */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() { return this })() || Function("return this")()
);


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(76);
module.exports = __webpack_require__(4).Array.includes;


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/Array.prototype.includes
var $export = __webpack_require__(9);
var $includes = __webpack_require__(51)(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__(54)('includes');


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(36);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(79);
module.exports = __webpack_require__(4).Object.assign;


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(9);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(80) });


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(21);
var gOPS = __webpack_require__(40);
var pIE = __webpack_require__(29);
var toObject = __webpack_require__(56);
var IObject = __webpack_require__(52);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(18)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(57);
__webpack_require__(82);
__webpack_require__(87);
__webpack_require__(90);
__webpack_require__(101);
__webpack_require__(102);
module.exports = __webpack_require__(4).Promise;


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(83)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(58)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(36);
var defined = __webpack_require__(35);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(59);
var descriptor = __webpack_require__(26);
var setToStringTag = __webpack_require__(31);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(10)(IteratorPrototype, __webpack_require__(0)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(11);
var anObject = __webpack_require__(7);
var getKeys = __webpack_require__(21);

module.exports = __webpack_require__(13) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(8);
var toObject = __webpack_require__(56);
var IE_PROTO = __webpack_require__(38)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__(88);
var getKeys = __webpack_require__(21);
var redefine = __webpack_require__(16);
var global = __webpack_require__(1);
var hide = __webpack_require__(10);
var Iterators = __webpack_require__(22);
var wks = __webpack_require__(0);
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(54);
var step = __webpack_require__(89);
var Iterators = __webpack_require__(22);
var toIObject = __webpack_require__(17);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(58)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 89 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(30);
var global = __webpack_require__(1);
var ctx = __webpack_require__(27);
var classof = __webpack_require__(41);
var $export = __webpack_require__(9);
var isObject = __webpack_require__(12);
var aFunction = __webpack_require__(28);
var anInstance = __webpack_require__(91);
var forOf = __webpack_require__(92);
var speciesConstructor = __webpack_require__(61);
var task = __webpack_require__(62).set;
var microtask = __webpack_require__(97)();
var newPromiseCapabilityModule = __webpack_require__(42);
var perform = __webpack_require__(63);
var promiseResolve = __webpack_require__(64);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(0)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value);
            if (domain) domain.exit();
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(98)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(31)($Promise, PROMISE);
__webpack_require__(99)(PROMISE);
Wrapper = __webpack_require__(4)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(100)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 91 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(27);
var call = __webpack_require__(93);
var isArrayIter = __webpack_require__(94);
var anObject = __webpack_require__(7);
var toLength = __webpack_require__(53);
var getIterFn = __webpack_require__(95);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(7);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(22);
var ITERATOR = __webpack_require__(0)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(41);
var ITERATOR = __webpack_require__(0)('iterator');
var Iterators = __webpack_require__(22);
module.exports = __webpack_require__(4).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 96 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(1);
var macrotask = __webpack_require__(62).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(20)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    var promise = Promise.resolve();
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(16);
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(1);
var dP = __webpack_require__(11);
var DESCRIPTORS = __webpack_require__(13);
var SPECIES = __webpack_require__(0)('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(0)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(9);
var core = __webpack_require__(4);
var global = __webpack_require__(1);
var speciesConstructor = __webpack_require__(61);
var promiseResolve = __webpack_require__(64);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(9);
var newPromiseCapability = __webpack_require__(42);
var perform = __webpack_require__(63);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(104);
__webpack_require__(57);
__webpack_require__(110);
__webpack_require__(111);
module.exports = __webpack_require__(4).Symbol;


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(1);
var has = __webpack_require__(8);
var DESCRIPTORS = __webpack_require__(13);
var $export = __webpack_require__(9);
var redefine = __webpack_require__(16);
var META = __webpack_require__(105).KEY;
var $fails = __webpack_require__(18);
var shared = __webpack_require__(37);
var setToStringTag = __webpack_require__(31);
var uid = __webpack_require__(19);
var wks = __webpack_require__(0);
var wksExt = __webpack_require__(65);
var wksDefine = __webpack_require__(43);
var enumKeys = __webpack_require__(106);
var isArray = __webpack_require__(107);
var anObject = __webpack_require__(7);
var isObject = __webpack_require__(12);
var toIObject = __webpack_require__(17);
var toPrimitive = __webpack_require__(34);
var createDesc = __webpack_require__(26);
var _create = __webpack_require__(59);
var gOPNExt = __webpack_require__(108);
var $GOPD = __webpack_require__(109);
var $DP = __webpack_require__(11);
var $keys = __webpack_require__(21);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(66).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(29).f = $propertyIsEnumerable;
  __webpack_require__(40).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(30)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(10)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(19)('meta');
var isObject = __webpack_require__(12);
var has = __webpack_require__(8);
var setDesc = __webpack_require__(11).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(18)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(21);
var gOPS = __webpack_require__(40);
var pIE = __webpack_require__(29);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(20);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(17);
var gOPN = __webpack_require__(66).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(29);
var createDesc = __webpack_require__(26);
var toIObject = __webpack_require__(17);
var toPrimitive = __webpack_require__(34);
var has = __webpack_require__(8);
var IE8_DOM_DEFINE = __webpack_require__(50);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(13) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(43)('asyncIterator');


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(43)('observable');


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * A JavaScript implementation of the JSON-LD API.
 *
 * @author Dave Longley
 *
 * @license BSD 3-Clause License
 * Copyright (c) 2011-2017 Digital Bazaar, Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 *
 * Redistributions in binary form must reproduce the above copyright
 * notice, this list of conditions and the following disclaimer in the
 * documentation and/or other materials provided with the distribution.
 *
 * Neither the name of the Digital Bazaar, Inc. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
 * IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED
 * TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
 * PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
(function () {

  var canonize = __webpack_require__(44);
  var util = __webpack_require__(2);
  var IdentifierIssuer = util.IdentifierIssuer;
  var JsonLdError = __webpack_require__(6);
  var NQuads = __webpack_require__(122);
  var Rdfa = __webpack_require__(123);

  var _require = __webpack_require__(124),
      _expand = _require.expand;

  var _require2 = __webpack_require__(126),
      _flatten = _require2.flatten;

  var _require3 = __webpack_require__(127),
      _frameMerged = _require3.frameMerged;

  var _require4 = __webpack_require__(128),
      _fromRDF = _require4.fromRDF;

  var _require5 = __webpack_require__(129),
      _toRDF = _require5.toRDF;

  var _require6 = __webpack_require__(3),
      _isArray = _require6.isArray,
      _isObject = _require6.isObject,
      _isString = _require6.isString;

  var _require7 = __webpack_require__(5),
      _isSubjectReference = _require7.isSubjectReference;

  var _require8 = __webpack_require__(15),
      _getInitialContext = _require8.getInitialContext,
      _processContext = _require8.process,
      _getAllContexts = _require8.getAllContexts;

  var _require9 = __webpack_require__(130),
      _compact = _require9.compact,
      _compactIri = _require9.compactIri,
      _removePreserve = _require9.removePreserve;

  var _require10 = __webpack_require__(32),
      _createNodeMap = _require10.createNodeMap,
      _createMergedNodeMap = _require10.createMergedNodeMap,
      _mergeNodeMaps = _require10.mergeNodeMaps;

  // determine if in-browser or using node.js


  var _nodejs = typeof process !== 'undefined' && process.versions && process.versions.node;
  var _browser = !_nodejs && (typeof window !== 'undefined' || typeof self !== 'undefined');

  // attaches jsonld API to the given object
  var wrapper = function wrapper(jsonld) {
    var _this = this;

    /* Core API */

    /**
     * Performs JSON-LD compaction.
     *
     * @param input the JSON-LD input to compact.
     * @param ctx the context to compact with.
     * @param [options] options to use:
     *          [base] the base IRI to use.
     *          [compactArrays] true to compact arrays to single values when
     *            appropriate, false not to (default: true).
     *          [graph] true to always output a top-level graph (default: false).
     *          [expandContext] a context to expand with.
     *          [skipExpansion] true to assume the input is expanded and skip
     *            expansion, false not to, defaults to false.
     *          [documentLoader(url, callback(err, remoteDoc))] the document loader.
     *          [expansionMap(info)] a function that can be used to custom map
     *            unmappable values (or to throw an error when they are detected);
     *            if this function returns `undefined` then the default behavior
     *            will be used.
     *          [framing] true if compaction is occuring during a framing operation.
     *          [compactionMap(info)] a function that can be used to custom map
     *            unmappable values (or to throw an error when they are detected);
     *            if this function returns `undefined` then the default behavior
     *            will be used.
     * @param [callback(err, compacted)] called once the operation completes.
     *
     * @return a Promise that resolves to the compacted output.
     */
    jsonld.compact = util.callbackify(function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(input, ctx, options) {
        var expanded,
            activeCtx,
            compacted,
            tmp,
            i,
            hasContext,
            graphAlias,
            graph,
            _graph,
            key,
            _graph2,
            _args = arguments;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(_args.length < 2)) {
                  _context.next = 2;
                  break;
                }

                throw new TypeError('Could not compact, too few arguments.');

              case 2:
                if (!(ctx === null)) {
                  _context.next = 4;
                  break;
                }

                throw new JsonLdError('The compaction context must not be null.', 'jsonld.CompactError', { code: 'invalid local context' });

              case 4:
                if (!(input === null)) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt('return', null);

              case 6:

                // set default options
                options = _setDefaults(options, {
                  base: _isString(input) ? input : '',
                  compactArrays: true,
                  graph: false,
                  skipExpansion: false,
                  link: false
                });
                if (options.link) {
                  // force skip expansion when linking, "link" is not part of the public
                  // API, it should only be called from framing
                  options.skipExpansion = true;
                }

                // expand input
                expanded = void 0;

                if (!options.skipExpansion) {
                  _context.next = 13;
                  break;
                }

                expanded = input;
                _context.next = 16;
                break;

              case 13:
                _context.next = 15;
                return jsonld.expand(input, options);

              case 15:
                expanded = _context.sent;

              case 16:
                _context.next = 18;
                return jsonld.processContext(_getInitialContext(options), ctx, options);

              case 18:
                activeCtx = _context.sent;


                // do compaction
                compacted = _compact({
                  activeCtx: activeCtx,
                  element: expanded,
                  options: options,
                  compactionMap: options.compactionMap
                });

                // perform clean up

                if (options.compactArrays && !options.graph && _isArray(compacted)) {
                  if (compacted.length === 1) {
                    // simplify to a single item
                    compacted = compacted[0];
                  } else if (compacted.length === 0) {
                    // simplify to an empty object
                    compacted = {};
                  }
                } else if (options.graph && _isObject(compacted)) {
                  // always use array if graph option is on
                  compacted = [compacted];
                }

                // follow @context key
                if (_isObject(ctx) && '@context' in ctx) {
                  ctx = ctx['@context'];
                }

                // build output context
                ctx = util.clone(ctx);
                if (!_isArray(ctx)) {
                  ctx = [ctx];
                }
                // remove empty contexts
                tmp = ctx;

                ctx = [];
                for (i = 0; i < tmp.length; ++i) {
                  if (!_isObject(tmp[i]) || Object.keys(tmp[i]).length > 0) {
                    ctx.push(tmp[i]);
                  }
                }

                // remove array if only one context
                hasContext = ctx.length > 0;

                if (ctx.length === 1) {
                  ctx = ctx[0];
                }

                // add context and/or @graph
                if (_isArray(compacted)) {
                  // use '@graph' keyword
                  graphAlias = _compactIri({ activeCtx: activeCtx, iri: '@graph', relativeTo: { vocab: true } });
                  graph = compacted;

                  compacted = {};
                  if (hasContext) {
                    compacted['@context'] = ctx;
                  }
                  compacted[graphAlias] = graph;
                } else if (_isObject(compacted) && hasContext) {
                  // reorder keys so @context is first
                  _graph = compacted;

                  compacted = { '@context': ctx };
                  for (key in _graph) {
                    compacted[key] = _graph[key];
                  }
                }

                if (options.framing) {
                  // get graph alias
                  _graph2 = _compactIri({ activeCtx: activeCtx, iri: '@graph', relativeTo: { vocab: true } });
                  // remove @preserve from results

                  options.link = {};
                  compacted[_graph2] = _removePreserve(activeCtx, compacted[_graph2], options);
                }

                return _context.abrupt('return', compacted);

              case 32:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function (_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      };
    }());

    /**
     * Performs JSON-LD expansion.
     *
     * @param input the JSON-LD input to expand.
     * @param [options] the options to use:
     *          [base] the base IRI to use.
     *          [expandContext] a context to expand with.
     *          [keepFreeFloatingNodes] true to keep free-floating nodes,
     *            false not to, defaults to false.
     *          [documentLoader(url, callback(err, remoteDoc))] the document loader.
     *          [expansionMap(info)] a function that can be used to custom map
     *            unmappable values (or to throw an error when they are detected);
     *            if this function returns `undefined` then the default behavior
     *            will be used.
     * @param [callback(err, expanded)] called once the operation completes.
     *
     * @return a Promise that resolves to the expanded output.
     */
    jsonld.expand = util.callbackify(function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(input, options) {
        var toResolve,
            contextsToProcess,
            expandContext,
            defaultBase,
            remoteDoc,
            activeCtx,
            expanded,
            _args2 = arguments;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(_args2.length < 1)) {
                  _context2.next = 2;
                  break;
                }

                throw new TypeError('Could not expand, too few arguments.');

              case 2:

                // set default options
                options = _setDefaults(options, {
                  keepFreeFloatingNodes: false
                });
                if (options.expansionMap === false) {
                  options.expansionMap = undefined;
                }

                // build set of objects that may have @contexts to resolve
                toResolve = {};

                // build set of contexts to process prior to expansion

                contextsToProcess = [];

                // if an `expandContext` has been given ensure it gets resolved

                if ('expandContext' in options) {
                  expandContext = util.clone(options.expandContext);

                  if (_isObject(expandContext) && '@context' in expandContext) {
                    toResolve.expandContext = expandContext;
                  } else {
                    toResolve.expandContext = { '@context': expandContext };
                  }
                  contextsToProcess.push(toResolve.expandContext);
                }

                // if input is a string, attempt to dereference remote document
                defaultBase = void 0;

                if (_isString(input)) {
                  _context2.next = 12;
                  break;
                }

                // input is not a URL, do not need to retrieve it first
                toResolve.input = util.clone(input);
                _context2.next = 18;
                break;

              case 12:
                _context2.next = 14;
                return jsonld.get(input, options);

              case 14:
                remoteDoc = _context2.sent;

                defaultBase = remoteDoc.documentUrl;
                toResolve.input = remoteDoc.document;
                if (remoteDoc.contextUrl) {
                  // context included in HTTP link header and must be resolved
                  toResolve.remoteContext = { '@context': remoteDoc.contextUrl };
                  contextsToProcess.push(toResolve.remoteContext);
                }

              case 18:

                // set default base
                if (!('base' in options)) {
                  options.base = defaultBase || '';
                }

                // get all contexts in `toResolve`
                _context2.next = 21;
                return _getAllContexts(toResolve, options);

              case 21:

                // process any additional contexts
                activeCtx = _getInitialContext(options);

                contextsToProcess.forEach(function (localCtx) {
                  activeCtx = _processContext({ activeCtx: activeCtx, localCtx: localCtx, options: options });
                });

                // expand resolved input
                expanded = _expand({
                  activeCtx: activeCtx,
                  element: toResolve.input,
                  options: options,
                  expansionMap: options.expansionMap
                });

                // optimize away @graph with no other properties

                if (_isObject(expanded) && '@graph' in expanded && Object.keys(expanded).length === 1) {
                  expanded = expanded['@graph'];
                } else if (expanded === null) {
                  expanded = [];
                }

                // normalize to an array
                if (!_isArray(expanded)) {
                  expanded = [expanded];
                }

                return _context2.abrupt('return', expanded);

              case 27:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function (_x4, _x5) {
        return _ref2.apply(this, arguments);
      };
    }());

    /**
     * Performs JSON-LD flattening.
     *
     * @param input the JSON-LD to flatten.
     * @param ctx the context to use to compact the flattened output, or null.
     * @param [options] the options to use:
     *          [base] the base IRI to use.
     *          [expandContext] a context to expand with.
     *          [documentLoader(url, callback(err, remoteDoc))] the document loader.
     * @param [callback(err, flattened)] called once the operation completes.
     *
     * @return a Promise that resolves to the flattened output.
     */
    jsonld.flatten = util.callbackify(function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(input, ctx, options) {
        var expanded,
            flattened,
            compacted,
            _args3 = arguments;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(_args3.length < 1)) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt('return', new TypeError('Could not flatten, too few arguments.'));

              case 2:

                if (typeof ctx === 'function') {
                  ctx = null;
                } else {
                  ctx = ctx || null;
                }

                // set default options
                options = _setDefaults(options, {
                  base: _isString(input) ? input : ''
                });

                // expand input
                _context3.next = 6;
                return jsonld.expand(input, options);

              case 6:
                expanded = _context3.sent;


                // do flattening
                flattened = _flatten(expanded);

                if (!(ctx === null)) {
                  _context3.next = 10;
                  break;
                }

                return _context3.abrupt('return', flattened);

              case 10:

                // compact result (force @graph option to true, skip expansion)
                options.graph = true;
                options.skipExpansion = true;
                _context3.next = 14;
                return jsonld.compact(flattened, ctx, options);

              case 14:
                compacted = _context3.sent;
                return _context3.abrupt('return', compacted);

              case 16:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function (_x6, _x7, _x8) {
        return _ref3.apply(this, arguments);
      };
    }());

    /**
     * Performs JSON-LD framing.
     *
     * @param input the JSON-LD input to frame.
     * @param frame the JSON-LD frame to use.
     * @param [options] the framing options.
     *          [base] the base IRI to use.
     *          [expandContext] a context to expand with.
     *          [embed] default @embed flag: '@last', '@always', '@never', '@link'
     *            (default: '@last').
     *          [explicit] default @explicit flag (default: false).
     *          [requireAll] default @requireAll flag (default: true).
     *          [omitDefault] default @omitDefault flag (default: false).
     *          [documentLoader(url, callback(err, remoteDoc))] the document loader.
     * @param [callback(err, framed)] called once the operation completes.
     *
     * @return a Promise that resolves to the framed output.
     */
    jsonld.frame = util.callbackify(function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(input, frame, options) {
        var remoteDoc,
            ctx,
            frameContext,
            expanded,
            opts,
            expandedFrame,
            framed,
            compacted,
            _args4 = arguments;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(_args4.length < 2)) {
                  _context4.next = 2;
                  break;
                }

                throw new TypeError('Could not frame, too few arguments.');

              case 2:

                // set default options
                options = _setDefaults(options, {
                  base: _isString(input) ? input : '',
                  embed: '@last',
                  explicit: false,
                  requireAll: true,
                  omitDefault: false
                });

                // if frame is a string, attempt to dereference remote document

                if (!_isString(frame)) {
                  _context4.next = 9;
                  break;
                }

                _context4.next = 6;
                return jsonld.get(frame, options);

              case 6:
                remoteDoc = _context4.sent;

                frame = remoteDoc.document;

                if (remoteDoc.contextUrl) {
                  // inject link header @context into frame
                  ctx = frame['@context'];

                  if (!ctx) {
                    ctx = remoteDoc.contextUrl;
                  } else if (_isArray(ctx)) {
                    ctx.push(remoteDoc.contextUrl);
                  } else {
                    ctx = [ctx, remoteDoc.contextUrl];
                  }
                  frame['@context'] = ctx;
                }

              case 9:
                frameContext = frame ? frame['@context'] || {} : {};

                // expand input

                _context4.next = 12;
                return jsonld.expand(input, options);

              case 12:
                expanded = _context4.sent;


                // expand frame
                opts = util.clone(options);

                opts.isFrame = true;
                opts.keepFreeFloatingNodes = true;
                _context4.next = 18;
                return jsonld.expand(frame, opts);

              case 18:
                expandedFrame = _context4.sent;


                // do merged framing
                framed = _frameMerged(expanded, expandedFrame, opts);

                // compact result (force @graph option to true, skip expansion,
                // check for linked embeds)

                opts.graph = true;
                opts.skipExpansion = true;
                opts.link = {};
                opts.framing = true;
                _context4.next = 26;
                return jsonld.compact(framed, frameContext, opts);

              case 26:
                compacted = _context4.sent;
                return _context4.abrupt('return', compacted);

              case 28:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function (_x9, _x10, _x11) {
        return _ref4.apply(this, arguments);
      };
    }());

    /**
     * **Experimental**
     *
     * Links a JSON-LD document's nodes in memory.
     *
     * @param input the JSON-LD document to link.
     * @param [ctx] the JSON-LD context to apply.
     * @param [options] the options to use:
     *          [base] the base IRI to use.
     *          [expandContext] a context to expand with.
     *          [documentLoader(url, callback(err, remoteDoc))] the document loader.
     * @param [callback(err, linked)] called once the operation completes.
     *
     * @return a Promise that resolves to the linked output.
     */
    jsonld.link = util.callbackify(function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(input, ctx, options) {
        var frame;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                // API matches running frame with a wildcard frame and embed: '@link'
                // get arguments
                frame = {};

                if (ctx) {
                  frame['@context'] = ctx;
                }
                frame['@embed'] = '@link';
                return _context5.abrupt('return', jsonld.frame(input, frame, options));

              case 4:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      return function (_x12, _x13, _x14) {
        return _ref5.apply(this, arguments);
      };
    }());

    /**
     * Performs RDF dataset normalization on the given input. The input is JSON-LD
     * unless the 'inputFormat' option is used. The output is an RDF dataset
     * unless the 'format' option is used.
     *
     * @param input the input to normalize as JSON-LD or as a format specified by
     *          the 'inputFormat' option.
     * @param [options] the options to use:
     *          [algorithm] the normalization algorithm to use, `URDNA2015` or
     *            `URGNA2012` (default: `URGNA2012`).
     *          [base] the base IRI to use.
     *          [expandContext] a context to expand with.
     *          [inputFormat] the format if input is not JSON-LD:
     *            'application/n-quads' for N-Quads.
     *          [format] the format if output is a string:
     *            'application/n-quads' for N-Quads.
     *          [documentLoader(url, callback(err, remoteDoc))] the document loader.
     * @param [callback(err, normalized)] called once the operation completes.
     *
     * @return a Promise that resolves to the normalized output.
     */
    jsonld.normalize = jsonld.canonize = util.callbackify(function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(input, options) {
        var parsedInput,
            opts,
            dataset,
            _args6 = arguments;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!(_args6.length < 1)) {
                  _context6.next = 2;
                  break;
                }

                throw new TypeError('Could not canonize, too few arguments.');

              case 2:

                // set default options
                options = _setDefaults(options, {
                  base: _isString(input) ? input : '',
                  algorithm: 'URDNA2015'
                });

                if (!('inputFormat' in options)) {
                  _context6.next = 8;
                  break;
                }

                if (!(options.inputFormat !== 'application/n-quads' && options.inputFormat !== 'application/nquads')) {
                  _context6.next = 6;
                  break;
                }

                throw new JsonLdError('Unknown canonicalization input format.', 'jsonld.CanonizeError');

              case 6:
                // TODO: `await` for async parsers
                parsedInput = NQuads.parse(input);

                // do canonicalization

                return _context6.abrupt('return', canonize.canonize(parsedInput, options));

              case 8:

                // convert to RDF dataset then do normalization
                opts = util.clone(options);

                delete opts.format;
                opts.produceGeneralizedRdf = false;
                _context6.next = 13;
                return jsonld.toRDF(input, opts);

              case 13:
                dataset = _context6.sent;
                return _context6.abrupt('return', canonize.canonize(dataset, options));

              case 15:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      return function (_x15, _x16) {
        return _ref6.apply(this, arguments);
      };
    }());

    /**
     * Converts an RDF dataset to JSON-LD.
     *
     * @param dataset a serialized string of RDF in a format specified by the
     *          format option or an RDF dataset to convert.
     * @param [options] the options to use:
     *          [format] the format if dataset param must first be parsed:
     *            'application/n-quads' for N-Quads (default).
     *          [rdfParser] a custom RDF-parser to use to parse the dataset.
     *          [useRdfType] true to use rdf:type, false to use @type
     *            (default: false).
     *          [useNativeTypes] true to convert XSD types into native types
     *            (boolean, integer, double), false not to (default: false).
     * @param [callback(err, output)] called once the operation completes.
     *
     * @return a Promise that resolves to the JSON-LD document.
     */
    jsonld.fromRDF = util.callbackify(function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(dataset, options) {
        var _options,
            format,
            rdfParser,
            parsedDataset,
            _args7 = arguments;

        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (!(_args7.length < 1)) {
                  _context7.next = 2;
                  break;
                }

                throw new TypeError('Could not convert from RDF, too few arguments.');

              case 2:

                // set default options
                options = _setDefaults(options, {
                  format: _isString(dataset) ? 'application/n-quads' : undefined
                });

                _options = options, format = _options.format, rdfParser = _options.rdfParser;

                // handle special format

                if (!format) {
                  _context7.next = 10;
                  break;
                }

                // check supported formats
                rdfParser = rdfParser || _rdfParsers[format];

                if (rdfParser) {
                  _context7.next = 8;
                  break;
                }

                throw new JsonLdError('Unknown input format.', 'jsonld.UnknownFormat', { format: format });

              case 8:
                _context7.next = 11;
                break;

              case 10:
                // no-op parser, assume dataset already parsed
                rdfParser = function rdfParser() {
                  return dataset;
                };

              case 11:

                // TODO: call `normalizeAsyncFn` on parser fn

                // rdfParser can be callback, promise-based, or synchronous
                parsedDataset = void 0;

                if (rdfParser.length > 1) {
                  // convert callback-based rdf parser to promise-based
                  parsedDataset = new Promise(function (resolve, reject) {
                    rdfParser(dataset, function (err, dataset) {
                      if (err) {
                        reject(err);
                      } else {
                        resolve(dataset);
                      }
                    });
                  });
                } else {
                  parsedDataset = Promise.resolve(rdfParser(dataset));
                }

                _context7.next = 15;
                return parsedDataset;

              case 15:
                parsedDataset = _context7.sent;


                // back-compat with old parsers that produced legacy dataset format
                if (!Array.isArray(parsedDataset)) {
                  parsedDataset = NQuads.legacyDatasetToQuads(dataset);
                }

                return _context7.abrupt('return', _fromRDF(parsedDataset, options));

              case 18:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      return function (_x17, _x18) {
        return _ref7.apply(this, arguments);
      };
    }());

    /**
     * Outputs the RDF dataset found in the given JSON-LD object.
     *
     * @param input the JSON-LD input.
     * @param [options] the options to use:
     *          [base] the base IRI to use.
     *          [expandContext] a context to expand with.
     *          [format] the format to use to output a string:
     *            'application/n-quads' for N-Quads.
     *          [produceGeneralizedRdf] true to output generalized RDF, false
     *            to produce only standard RDF (default: false).
     *          [documentLoader(url, callback(err, remoteDoc))] the document loader.
     * @param [callback(err, dataset)] called once the operation completes.
     *
     * @return a Promise that resolves to the RDF dataset.
     */
    jsonld.toRDF = util.callbackify(function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(input, options) {
        var expanded,
            dataset,
            _args8 = arguments;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                if (!(_args8.length < 1)) {
                  _context8.next = 2;
                  break;
                }

                throw new TypeError('Could not convert to RDF, too few arguments.');

              case 2:

                // set default options
                options = _setDefaults(options, {
                  base: _isString(input) ? input : ''
                });

                // TODO: support toRDF custom map?

                // expand input
                _context8.next = 5;
                return jsonld.expand(input, options);

              case 5:
                expanded = _context8.sent;


                // output RDF dataset
                dataset = _toRDF(expanded, options);

                if (!options.format) {
                  _context8.next = 13;
                  break;
                }

                if (!(options.format === 'application/n-quads' || options.format === 'application/nquads')) {
                  _context8.next = 12;
                  break;
                }

                _context8.next = 11;
                return NQuads.serialize(dataset);

              case 11:
                return _context8.abrupt('return', _context8.sent);

              case 12:
                throw new JsonLdError('Unknown output format.', 'jsonld.UnknownFormat', { format: options.format });

              case 13:
                return _context8.abrupt('return', dataset);

              case 14:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      return function (_x19, _x20) {
        return _ref8.apply(this, arguments);
      };
    }());

    /**
     * **Experimental**
     *
     * Recursively flattens the nodes in the given JSON-LD input into a merged
     * map of node ID => node. All graphs will be merged into the default graph.
     *
     * @param input the JSON-LD input.
     * @param [options] the options to use:
     *          [base] the base IRI to use.
     *          [expandContext] a context to expand with.
     *          [issuer] a jsonld.IdentifierIssuer to use to label blank nodes.
     *          [documentLoader(url, callback(err, remoteDoc))] the document loader.
     * @param [callback(err, nodeMap)] called once the operation completes.
     *
     * @return a Promise that resolves to the merged node map.
     */
    jsonld.createNodeMap = util.callbackify(function () {
      var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(input, options) {
        var expanded,
            _args9 = arguments;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                if (!(_args9.length < 1)) {
                  _context9.next = 2;
                  break;
                }

                throw new TypeError('Could not create node map, too few arguments.');

              case 2:

                // set default options
                options = _setDefaults(options, {
                  base: _isString(input) ? input : ''
                });

                // expand input
                expanded = jsonld.expand(input, options);
                return _context9.abrupt('return', _createMergedNodeMap(expanded, options));

              case 5:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      return function (_x21, _x22) {
        return _ref9.apply(this, arguments);
      };
    }());

    /**
     * **Experimental**
     *
     * Merges two or more JSON-LD documents into a single flattened document.
     *
     * @param docs the JSON-LD documents to merge together.
     * @param ctx the context to use to compact the merged result, or null.
     * @param [options] the options to use:
     *          [base] the base IRI to use.
     *          [expandContext] a context to expand with.
     *          [issuer] a jsonld.IdentifierIssuer to use to label blank nodes.
     *          [mergeNodes] true to merge properties for nodes with the same ID,
     *            false to ignore new properties for nodes with the same ID once
     *            the ID has been defined; note that this may not prevent merging
     *            new properties where a node is in the `object` position
     *            (default: true).
     *          [documentLoader(url, callback(err, remoteDoc))] the document loader.
     * @param [callback(err, merged)] called once the operation completes.
     *
     * @return a Promise that resolves to the merged output.
     */
    jsonld.merge = util.callbackify(function () {
      var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(docs, ctx, options) {
        var expanded,
            mergeNodes,
            issuer,
            graphs,
            i,
            doc,
            _graphs,
            graphName,
            _nodeMap,
            nodeMap,
            key,
            defaultGraph,
            flattened,
            keys,
            ki,
            node,
            compacted,
            _args10 = arguments;

        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                if (!(_args10.length < 1)) {
                  _context10.next = 2;
                  break;
                }

                throw new TypeError('Could not merge, too few arguments.');

              case 2:
                if (_isArray(docs)) {
                  _context10.next = 4;
                  break;
                }

                throw new TypeError('Could not merge, "docs" must be an array.');

              case 4:

                if (typeof ctx === 'function') {
                  ctx = null;
                } else {
                  ctx = ctx || null;
                }

                // set default options
                options = _setDefaults(options, {});

                // expand all documents
                _context10.next = 8;
                return Promise.all(docs.map(function (doc) {
                  var opts = Object.assign({}, options);
                  return jsonld.expand(doc, opts);
                }));

              case 8:
                expanded = _context10.sent;
                mergeNodes = true;

                if ('mergeNodes' in options) {
                  mergeNodes = options.mergeNodes;
                }

                issuer = options.issuer || new IdentifierIssuer('_:b');
                graphs = { '@default': {} };
                i = 0;

              case 14:
                if (!(i < expanded.length)) {
                  _context10.next = 33;
                  break;
                }

                // uniquely relabel blank nodes
                doc = util.relabelBlankNodes(expanded[i], {
                  issuer: new IdentifierIssuer('_:b' + i + '-')
                });

                // add nodes to the shared node map graphs if merging nodes, to a
                // separate graph set if not

                _graphs = mergeNodes || i === 0 ? graphs : { '@default': {} };

                _createNodeMap(doc, _graphs, '@default', issuer);

                if (!(_graphs !== graphs)) {
                  _context10.next = 30;
                  break;
                }

                _context10.t0 = regeneratorRuntime.keys(_graphs);

              case 20:
                if ((_context10.t1 = _context10.t0()).done) {
                  _context10.next = 30;
                  break;
                }

                graphName = _context10.t1.value;
                _nodeMap = _graphs[graphName];

                if (graphName in graphs) {
                  _context10.next = 26;
                  break;
                }

                graphs[graphName] = _nodeMap;
                return _context10.abrupt('continue', 20);

              case 26:
                nodeMap = graphs[graphName];

                for (key in _nodeMap) {
                  if (!(key in nodeMap)) {
                    nodeMap[key] = _nodeMap[key];
                  }
                }
                _context10.next = 20;
                break;

              case 30:
                ++i;
                _context10.next = 14;
                break;

              case 33:

                // add all non-default graphs to default graph
                defaultGraph = _mergeNodeMaps(graphs);

                // produce flattened output

                flattened = [];
                keys = Object.keys(defaultGraph).sort();

                for (ki = 0; ki < keys.length; ++ki) {
                  node = defaultGraph[keys[ki]];
                  // only add full subjects to top-level

                  if (!_isSubjectReference(node)) {
                    flattened.push(node);
                  }
                }

                if (!(ctx === null)) {
                  _context10.next = 39;
                  break;
                }

                return _context10.abrupt('return', flattened);

              case 39:

                // compact result (force @graph option to true, skip expansion)
                options.graph = true;
                options.skipExpansion = true;
                compacted = jsonld.compact(flattened, ctx, options);
                return _context10.abrupt('return', compacted);

              case 43:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      return function (_x23, _x24, _x25) {
        return _ref10.apply(this, arguments);
      };
    }());

    /**
     * The default document loader for external documents. If the environment
     * is node.js, a callback-continuation-style document loader is used; otherwise,
     * a promises-style document loader is used.
     *
     * @param url the URL to load.
     * @param callback(err, remoteDoc) called once the operation completes,
     *          if using a non-promises API.
     *
     * @return a promise, if using a promises API.
     */
    Object.defineProperty(jsonld, 'documentLoader', {
      get: function get() {
        return jsonld._documentLoader;
      },
      set: function set(v) {
        return jsonld._documentLoader = util.normalizeDocumentLoader(v);
      }
    });
    // default document loader not implemented
    jsonld.documentLoader = function () {
      var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(url) {
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                throw new JsonLdError('Could not retrieve a JSON-LD document from the URL. URL ' + 'dereferencing not implemented.', 'jsonld.LoadDocumentError', { code: 'loading document failed', url: url });

              case 1:
              case 'end':
                return _context11.stop();
            }
          }
        }, _callee11, _this);
      }));

      return function (_x26) {
        return _ref11.apply(this, arguments);
      };
    }();

    /**
     * Deprecated default document loader. Do not use or override.
     */
    jsonld.loadDocument = util.callbackify(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
      var _args12 = arguments;
      return regeneratorRuntime.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              return _context12.abrupt('return', jsonld.documentLoader.apply(null, _args12));

            case 1:
            case 'end':
              return _context12.stop();
          }
        }
      }, _callee12, this);
    })));

    /**
     * Gets a remote JSON-LD document using the default document loader or
     * one given in the passed options.
     *
     * @param url the URL to fetch.
     * @param [options] the options to use:
     *          [documentLoader] the document loader to use.
     * @param [callback(err, remoteDoc)] called once the operation completes.
     *
     * @return a Promise that resolves to the retrieved remote document.
     */
    jsonld.get = util.callbackify(function () {
      var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(url, options) {
        var load, remoteDoc;
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                load = void 0;

                if (typeof options.documentLoader === 'function') {
                  load = util.normalizeDocumentLoader(options.documentLoader);
                } else {
                  load = jsonld.documentLoader;
                }

                _context13.next = 4;
                return load(url);

              case 4:
                remoteDoc = _context13.sent;
                _context13.prev = 5;

                if (remoteDoc.document) {
                  _context13.next = 8;
                  break;
                }

                throw new JsonLdError('No remote document found at the given URL.', 'jsonld.NullRemoteDocument');

              case 8:
                if (_isString(remoteDoc.document)) {
                  remoteDoc.document = JSON.parse(remoteDoc.document);
                }
                _context13.next = 14;
                break;

              case 11:
                _context13.prev = 11;
                _context13.t0 = _context13['catch'](5);
                throw new JsonLdError('Could not retrieve a JSON-LD document from the URL.', 'jsonld.LoadDocumentError', {
                  code: 'loading document failed',
                  cause: _context13.t0,
                  remoteDoc: remoteDoc
                });

              case 14:
                return _context13.abrupt('return', remoteDoc);

              case 15:
              case 'end':
                return _context13.stop();
            }
          }
        }, _callee13, this, [[5, 11]]);
      }));

      return function (_x27, _x28) {
        return _ref13.apply(this, arguments);
      };
    }());

    /**
     * Processes a local context, resolving any URLs as necessary, and returns a
     * new active context in its callback.
     *
     * @param activeCtx the current active context.
     * @param localCtx the local context to process.
     * @param [options] the options to use:
     *          [documentLoader(url, callback(err, remoteDoc))] the document loader.
     * @param [callback(err, activeCtx)] called once the operation completes.
     *
     * @return a Promise that resolves to the new active context.
     */
    jsonld.processContext = util.callbackify(function () {
      var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(activeCtx, localCtx, options) {
        var ctx;
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                // set default options
                options = _setDefaults(options, {
                  base: ''
                });

                // return initial context early for null context

                if (!(localCtx === null)) {
                  _context14.next = 3;
                  break;
                }

                return _context14.abrupt('return', _getInitialContext(options));

              case 3:

                // get URLs in localCtx
                localCtx = util.clone(localCtx);
                if (!(_isObject(localCtx) && '@context' in localCtx)) {
                  localCtx = { '@context': localCtx };
                }
                _context14.next = 7;
                return _getAllContexts(localCtx, options);

              case 7:
                ctx = _context14.sent;
                return _context14.abrupt('return', _processContext({ activeCtx: activeCtx, localCtx: ctx, options: options }));

              case 9:
              case 'end':
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      return function (_x29, _x30, _x31) {
        return _ref14.apply(this, arguments);
      };
    }());

    // backwards compatibility
    jsonld.getContextValue = __webpack_require__(15).getContextValue;

    /**
     * Document loaders.
     */
    jsonld.documentLoaders = {};
    jsonld.documentLoaders.node = __webpack_require__(131);
    jsonld.documentLoaders.xhr = __webpack_require__(132);

    /**
     * Assigns the default document loader for external document URLs to a built-in
     * default. Supported types currently include: 'xhr' and 'node'.
     *
     * @param type the type to set.
     * @param [params] the parameters required to use the document loader.
     */
    jsonld.useDocumentLoader = function (type) {
      if (!(type in jsonld.documentLoaders)) {
        throw new JsonLdError('Unknown document loader type: "' + type + '"', 'jsonld.UnknownDocumentLoader', { type: type });
      }

      // set document loader
      jsonld.documentLoader = jsonld.documentLoaders[type].apply(jsonld, Array.prototype.slice.call(arguments, 1));
    };

    /** Registered RDF dataset parsers hashed by content-type. */
    var _rdfParsers = {};

    /**
     * Registers an RDF dataset parser by content-type, for use with
     * jsonld.fromRDF. An RDF dataset parser will always be given two parameters,
     * a string of input and a callback. An RDF dataset parser can be synchronous
     * or asynchronous.
     *
     * If the parser function returns undefined or null then it will be assumed to
     * be asynchronous w/a continuation-passing style and the callback parameter
     * given to the parser MUST be invoked.
     *
     * If it returns a Promise, then it will be assumed to be asynchronous, but the
     * callback parameter MUST NOT be invoked. It should instead be ignored.
     *
     * If it returns an RDF dataset, it will be assumed to be synchronous and the
     * callback parameter MUST NOT be invoked. It should instead be ignored.
     *
     * @param contentType the content-type for the parser.
     * @param parser(input, callback(err, dataset)) the parser function (takes a
     *          string as a parameter and either returns null/undefined and uses
     *          the given callback, returns a Promise, or returns an RDF dataset).
     */
    jsonld.registerRDFParser = function (contentType, parser) {
      _rdfParsers[contentType] = parser;
    };

    /**
     * Unregisters an RDF dataset parser by content-type.
     *
     * @param contentType the content-type for the parser.
     */
    jsonld.unregisterRDFParser = function (contentType) {
      delete _rdfParsers[contentType];
    };

    // register the N-Quads RDF parser
    jsonld.registerRDFParser('application/n-quads', NQuads.parse);
    jsonld.registerRDFParser('application/nquads', NQuads.parse);

    // register the RDFa API RDF parser
    jsonld.registerRDFParser('rdfa-api', Rdfa.parse);

    /* URL API */
    jsonld.url = __webpack_require__(25);

    /* Utility API */
    jsonld.util = util;
    // backwards compatibility
    Object.assign(jsonld, util);

    // reexpose API as jsonld.promises for backwards compatability
    jsonld.promises = jsonld;

    // backwards compatibility
    jsonld.RequestQueue = __webpack_require__(49);

    /* WebIDL API */
    jsonld.JsonLdProcessor = __webpack_require__(133)(jsonld);

    // setup browser global JsonLdProcessor
    if (_browser && typeof global.JsonLdProcessor === 'undefined') {
      Object.defineProperty(global, 'JsonLdProcessor', {
        writable: true,
        enumerable: false,
        configurable: true,
        value: jsonld.JsonLdProcessor
      });
    }

    // set platform-specific defaults/APIs
    if (_nodejs) {
      // use node document loader by default
      jsonld.useDocumentLoader('node');
    } else if (typeof XMLHttpRequest !== 'undefined') {
      // use xhr document loader by default
      jsonld.useDocumentLoader('xhr');
    }

    function _setDefaults(options, _ref15) {
      var _ref15$documentLoader = _ref15.documentLoader,
          documentLoader = _ref15$documentLoader === undefined ? jsonld.documentLoader : _ref15$documentLoader,
          defaults = _objectWithoutProperties(_ref15, ['documentLoader']);

      if (typeof options === 'function') {
        options = {};
      }
      options = options || {};
      return Object.assign({}, { documentLoader: documentLoader }, defaults, options);
    }

    // end of jsonld API `wrapper` factory
    return jsonld;
  };

  // external APIs:

  // used to generate a new jsonld API instance
  var factory = function factory() {
    return wrapper(function () {
      return factory();
    });
  };

  if (!_nodejs && "function" === 'function' && __webpack_require__(134)) {
    // export AMD API
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      // now that module is defined, wrap main jsonld API instance
      wrapper(factory);
      return factory;
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {
    // wrap the main jsonld API instance
    wrapper(factory);

    if ("function" === 'function' && typeof module !== 'undefined' && module.exports) {
      // export CommonJS/nodejs API
      module.exports = factory;
    }

    if (_browser) {
      // export simple browser API
      if (typeof jsonld === 'undefined') {
        jsonld = jsonldjs = factory;
      } else {
        jsonldjs = factory;
      }
    }
  }

  return factory;
})();
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(67)))

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2016-2017 Digital Bazaar, Inc. All rights reserved.
 */


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var util = __webpack_require__(14);

module.exports = function () {
  function AsyncAlgorithm() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$maxCallStackDept = _ref.maxCallStackDepth,
        maxCallStackDepth = _ref$maxCallStackDept === undefined ? 500 : _ref$maxCallStackDept,
        _ref$maxTotalCallStac = _ref.maxTotalCallStackDepth,
        maxTotalCallStackDepth = _ref$maxTotalCallStac === undefined ? 0xFFFFFFFF : _ref$maxTotalCallStac,
        _ref$timeSlice = _ref.timeSlice,
        timeSlice = _ref$timeSlice === undefined ? 10 : _ref$timeSlice;

    _classCallCheck(this, AsyncAlgorithm);

    this.schedule = {};
    this.schedule.MAX_DEPTH = maxCallStackDepth;
    this.schedule.MAX_TOTAL_DEPTH = maxTotalCallStackDepth;
    this.schedule.depth = 0;
    this.schedule.totalDepth = 0;
    this.schedule.timeSlice = timeSlice;
  }

  // do some work in a time slice, but in serial


  _createClass(AsyncAlgorithm, [{
    key: 'doWork',
    value: function doWork(fn, callback) {
      var schedule = this.schedule;

      if (schedule.totalDepth >= schedule.MAX_TOTAL_DEPTH) {
        return callback(new Error('Maximum total call stack depth exceeded; canonicalization aborting.'));
      }

      (function work() {
        if (schedule.depth === schedule.MAX_DEPTH) {
          // stack too deep, run on next tick
          schedule.depth = 0;
          schedule.running = false;
          return util.nextTick(work);
        }

        // if not yet running, force run
        var now = Date.now();
        if (!schedule.running) {
          schedule.start = Date.now();
          schedule.deadline = schedule.start + schedule.timeSlice;
        }

        // TODO: should also include an estimate of expectedWorkTime
        if (now < schedule.deadline) {
          schedule.running = true;
          schedule.depth++;
          schedule.totalDepth++;
          return fn(function (err, result) {
            schedule.depth--;
            schedule.totalDepth--;
            callback(err, result);
          });
        }

        // not enough time left in this slice, run after letting browser
        // do some other things
        schedule.depth = 0;
        schedule.running = false;
        util.setImmediate(work);
      })();
    }

    // asynchronously loop

  }, {
    key: 'forEach',
    value: function forEach(iterable, fn, callback) {
      var self = this;
      var _iterator2 = void 0;
      var idx = 0;
      var length = void 0;
      if (Array.isArray(iterable)) {
        length = iterable.length;
        _iterator2 = function iterator() {
          if (idx === length) {
            return false;
          }
          _iterator2.value = iterable[idx++];
          _iterator2.key = idx;
          return true;
        };
      } else {
        var keys = Object.keys(iterable);
        length = keys.length;
        _iterator2 = function _iterator() {
          if (idx === length) {
            return false;
          }
          _iterator2.key = keys[idx++];
          _iterator2.value = iterable[_iterator2.key];
          return true;
        };
      }

      (function iterate(err) {
        if (err) {
          return callback(err);
        }
        if (_iterator2()) {
          return self.doWork(function () {
            return fn(_iterator2.value, _iterator2.key, iterate);
          });
        }
        callback();
      })();
    }

    // asynchronous waterfall

  }, {
    key: 'waterfall',
    value: function waterfall(fns, callback) {
      var self = this;
      self.forEach(fns, function (fn, idx, callback) {
        return self.doWork(fn, callback);
      }, callback);
    }

    // asynchronous while

  }, {
    key: 'whilst',
    value: function whilst(condition, fn, callback) {
      var self = this;
      (function loop(err) {
        if (err) {
          return callback(err);
        }
        if (!condition()) {
          return callback();
        }
        self.doWork(fn, loop);
      })();
    }
  }]);

  return AsyncAlgorithm;
}();

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Secure Hash Algorithm with 160-bit digest (SHA-1) implementation.
 *
 * @author Dave Longley
 *
 * Copyright (c) 2010-2015 Digital Bazaar, Inc.
 */
var forge = __webpack_require__(23);
__webpack_require__(46);
__webpack_require__(70);

var sha1 = module.exports = forge.sha1 = forge.sha1 || {};
forge.md.sha1 = forge.md.algorithms.sha1 = sha1;

/**
 * Creates a SHA-1 message digest object.
 *
 * @return a message digest object.
 */
sha1.create = function() {
  // do initialization as necessary
  if(!_initialized) {
    _init();
  }

  // SHA-1 state contains five 32-bit integers
  var _state = null;

  // input buffer
  var _input = forge.util.createBuffer();

  // used for word storage
  var _w = new Array(80);

  // message digest object
  var md = {
    algorithm: 'sha1',
    blockLength: 64,
    digestLength: 20,
    // 56-bit length of message so far (does not including padding)
    messageLength: 0,
    // true message length
    fullMessageLength: null,
    // size of message length in bytes
    messageLengthSize: 8
  };

  /**
   * Starts the digest.
   *
   * @return this digest object.
   */
  md.start = function() {
    // up to 56-bit message length for convenience
    md.messageLength = 0;

    // full message length (set md.messageLength64 for backwards-compatibility)
    md.fullMessageLength = md.messageLength64 = [];
    var int32s = md.messageLengthSize / 4;
    for(var i = 0; i < int32s; ++i) {
      md.fullMessageLength.push(0);
    }
    _input = forge.util.createBuffer();
    _state = {
      h0: 0x67452301,
      h1: 0xEFCDAB89,
      h2: 0x98BADCFE,
      h3: 0x10325476,
      h4: 0xC3D2E1F0
    };
    return md;
  };
  // start digest automatically for first time
  md.start();

  /**
   * Updates the digest with the given message input. The given input can
   * treated as raw input (no encoding will be applied) or an encoding of
   * 'utf8' maybe given to encode the input using UTF-8.
   *
   * @param msg the message input to update with.
   * @param encoding the encoding to use (default: 'raw', other: 'utf8').
   *
   * @return this digest object.
   */
  md.update = function(msg, encoding) {
    if(encoding === 'utf8') {
      msg = forge.util.encodeUtf8(msg);
    }

    // update message length
    var len = msg.length;
    md.messageLength += len;
    len = [(len / 0x100000000) >>> 0, len >>> 0];
    for(var i = md.fullMessageLength.length - 1; i >= 0; --i) {
      md.fullMessageLength[i] += len[1];
      len[1] = len[0] + ((md.fullMessageLength[i] / 0x100000000) >>> 0);
      md.fullMessageLength[i] = md.fullMessageLength[i] >>> 0;
      len[0] = ((len[1] / 0x100000000) >>> 0);
    }

    // add bytes to input buffer
    _input.putBytes(msg);

    // process bytes
    _update(_state, _w, _input);

    // compact input buffer every 2K or if empty
    if(_input.read > 2048 || _input.length() === 0) {
      _input.compact();
    }

    return md;
  };

   /**
    * Produces the digest.
    *
    * @return a byte buffer containing the digest value.
    */
   md.digest = function() {
    /* Note: Here we copy the remaining bytes in the input buffer and
    add the appropriate SHA-1 padding. Then we do the final update
    on a copy of the state so that if the user wants to get
    intermediate digests they can do so. */

    /* Determine the number of bytes that must be added to the message
    to ensure its length is congruent to 448 mod 512. In other words,
    the data to be digested must be a multiple of 512 bits (or 128 bytes).
    This data includes the message, some padding, and the length of the
    message. Since the length of the message will be encoded as 8 bytes (64
    bits), that means that the last segment of the data must have 56 bytes
    (448 bits) of message and padding. Therefore, the length of the message
    plus the padding must be congruent to 448 mod 512 because
    512 - 128 = 448.

    In order to fill up the message length it must be filled with
    padding that begins with 1 bit followed by all 0 bits. Padding
    must *always* be present, so if the message length is already
    congruent to 448 mod 512, then 512 padding bits must be added. */

    var finalBlock = forge.util.createBuffer();
    finalBlock.putBytes(_input.bytes());

    // compute remaining size to be digested (include message length size)
    var remaining = (
      md.fullMessageLength[md.fullMessageLength.length - 1] +
      md.messageLengthSize);

    // add padding for overflow blockSize - overflow
    // _padding starts with 1 byte with first bit is set (byte value 128), then
    // there may be up to (blockSize - 1) other pad bytes
    var overflow = remaining & (md.blockLength - 1);
    finalBlock.putBytes(_padding.substr(0, md.blockLength - overflow));

    // serialize message length in bits in big-endian order; since length
    // is stored in bytes we multiply by 8 and add carry from next int
    var next, carry;
    var bits = md.fullMessageLength[0] * 8;
    for(var i = 0; i < md.fullMessageLength.length - 1; ++i) {
      next = md.fullMessageLength[i + 1] * 8;
      carry = (next / 0x100000000) >>> 0;
      bits += carry;
      finalBlock.putInt32(bits >>> 0);
      bits = next >>> 0;
    }
    finalBlock.putInt32(bits);

    var s2 = {
      h0: _state.h0,
      h1: _state.h1,
      h2: _state.h2,
      h3: _state.h3,
      h4: _state.h4
    };
    _update(s2, _w, finalBlock);
    var rval = forge.util.createBuffer();
    rval.putInt32(s2.h0);
    rval.putInt32(s2.h1);
    rval.putInt32(s2.h2);
    rval.putInt32(s2.h3);
    rval.putInt32(s2.h4);
    return rval;
  };

  return md;
};

// sha-1 padding bytes not initialized yet
var _padding = null;
var _initialized = false;

/**
 * Initializes the constant tables.
 */
function _init() {
  // create padding
  _padding = String.fromCharCode(128);
  _padding += forge.util.fillString(String.fromCharCode(0x00), 64);

  // now initialized
  _initialized = true;
}

/**
 * Updates a SHA-1 state with the given byte buffer.
 *
 * @param s the SHA-1 state to update.
 * @param w the array to use to store words.
 * @param bytes the byte buffer to update with.
 */
function _update(s, w, bytes) {
  // consume 512 bit (64 byte) chunks
  var t, a, b, c, d, e, f, i;
  var len = bytes.length();
  while(len >= 64) {
    // the w array will be populated with sixteen 32-bit big-endian words
    // and then extended into 80 32-bit words according to SHA-1 algorithm
    // and for 32-79 using Max Locktyukhin's optimization

    // initialize hash value for this chunk
    a = s.h0;
    b = s.h1;
    c = s.h2;
    d = s.h3;
    e = s.h4;

    // round 1
    for(i = 0; i < 16; ++i) {
      t = bytes.getInt32();
      w[i] = t;
      f = d ^ (b & (c ^ d));
      t = ((a << 5) | (a >>> 27)) + f + e + 0x5A827999 + t;
      e = d;
      d = c;
      // `>>> 0` necessary to avoid iOS/Safari 10 optimization bug
      c = ((b << 30) | (b >>> 2)) >>> 0;
      b = a;
      a = t;
    }
    for(; i < 20; ++i) {
      t = (w[i - 3] ^ w[i - 8] ^ w[i - 14] ^ w[i - 16]);
      t = (t << 1) | (t >>> 31);
      w[i] = t;
      f = d ^ (b & (c ^ d));
      t = ((a << 5) | (a >>> 27)) + f + e + 0x5A827999 + t;
      e = d;
      d = c;
      // `>>> 0` necessary to avoid iOS/Safari 10 optimization bug
      c = ((b << 30) | (b >>> 2)) >>> 0;
      b = a;
      a = t;
    }
    // round 2
    for(; i < 32; ++i) {
      t = (w[i - 3] ^ w[i - 8] ^ w[i - 14] ^ w[i - 16]);
      t = (t << 1) | (t >>> 31);
      w[i] = t;
      f = b ^ c ^ d;
      t = ((a << 5) | (a >>> 27)) + f + e + 0x6ED9EBA1 + t;
      e = d;
      d = c;
      // `>>> 0` necessary to avoid iOS/Safari 10 optimization bug
      c = ((b << 30) | (b >>> 2)) >>> 0;
      b = a;
      a = t;
    }
    for(; i < 40; ++i) {
      t = (w[i - 6] ^ w[i - 16] ^ w[i - 28] ^ w[i - 32]);
      t = (t << 2) | (t >>> 30);
      w[i] = t;
      f = b ^ c ^ d;
      t = ((a << 5) | (a >>> 27)) + f + e + 0x6ED9EBA1 + t;
      e = d;
      d = c;
      // `>>> 0` necessary to avoid iOS/Safari 10 optimization bug
      c = ((b << 30) | (b >>> 2)) >>> 0;
      b = a;
      a = t;
    }
    // round 3
    for(; i < 60; ++i) {
      t = (w[i - 6] ^ w[i - 16] ^ w[i - 28] ^ w[i - 32]);
      t = (t << 2) | (t >>> 30);
      w[i] = t;
      f = (b & c) | (d & (b ^ c));
      t = ((a << 5) | (a >>> 27)) + f + e + 0x8F1BBCDC + t;
      e = d;
      d = c;
      // `>>> 0` necessary to avoid iOS/Safari 10 optimization bug
      c = ((b << 30) | (b >>> 2)) >>> 0;
      b = a;
      a = t;
    }
    // round 4
    for(; i < 80; ++i) {
      t = (w[i - 6] ^ w[i - 16] ^ w[i - 28] ^ w[i - 32]);
      t = (t << 2) | (t >>> 30);
      w[i] = t;
      f = b ^ c ^ d;
      t = ((a << 5) | (a >>> 27)) + f + e + 0xCA62C1D6 + t;
      e = d;
      d = c;
      // `>>> 0` necessary to avoid iOS/Safari 10 optimization bug
      c = ((b << 30) | (b >>> 2)) >>> 0;
      b = a;
      a = t;
    }

    // update hash state
    s.h0 = (s.h0 + a) | 0;
    s.h1 = (s.h1 + b) | 0;
    s.h2 = (s.h2 + c) | 0;
    s.h3 = (s.h3 + d) | 0;
    s.h4 = (s.h4 + e) | 0;

    len -= 64;
  }
}


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Secure Hash Algorithm with 256-bit digest (SHA-256) implementation.
 *
 * See FIPS 180-2 for details.
 *
 * @author Dave Longley
 *
 * Copyright (c) 2010-2015 Digital Bazaar, Inc.
 */
var forge = __webpack_require__(23);
__webpack_require__(46);
__webpack_require__(70);

var sha256 = module.exports = forge.sha256 = forge.sha256 || {};
forge.md.sha256 = forge.md.algorithms.sha256 = sha256;

/**
 * Creates a SHA-256 message digest object.
 *
 * @return a message digest object.
 */
sha256.create = function() {
  // do initialization as necessary
  if(!_initialized) {
    _init();
  }

  // SHA-256 state contains eight 32-bit integers
  var _state = null;

  // input buffer
  var _input = forge.util.createBuffer();

  // used for word storage
  var _w = new Array(64);

  // message digest object
  var md = {
    algorithm: 'sha256',
    blockLength: 64,
    digestLength: 32,
    // 56-bit length of message so far (does not including padding)
    messageLength: 0,
    // true message length
    fullMessageLength: null,
    // size of message length in bytes
    messageLengthSize: 8
  };

  /**
   * Starts the digest.
   *
   * @return this digest object.
   */
  md.start = function() {
    // up to 56-bit message length for convenience
    md.messageLength = 0;

    // full message length (set md.messageLength64 for backwards-compatibility)
    md.fullMessageLength = md.messageLength64 = [];
    var int32s = md.messageLengthSize / 4;
    for(var i = 0; i < int32s; ++i) {
      md.fullMessageLength.push(0);
    }
    _input = forge.util.createBuffer();
    _state = {
      h0: 0x6A09E667,
      h1: 0xBB67AE85,
      h2: 0x3C6EF372,
      h3: 0xA54FF53A,
      h4: 0x510E527F,
      h5: 0x9B05688C,
      h6: 0x1F83D9AB,
      h7: 0x5BE0CD19
    };
    return md;
  };
  // start digest automatically for first time
  md.start();

  /**
   * Updates the digest with the given message input. The given input can
   * treated as raw input (no encoding will be applied) or an encoding of
   * 'utf8' maybe given to encode the input using UTF-8.
   *
   * @param msg the message input to update with.
   * @param encoding the encoding to use (default: 'raw', other: 'utf8').
   *
   * @return this digest object.
   */
  md.update = function(msg, encoding) {
    if(encoding === 'utf8') {
      msg = forge.util.encodeUtf8(msg);
    }

    // update message length
    var len = msg.length;
    md.messageLength += len;
    len = [(len / 0x100000000) >>> 0, len >>> 0];
    for(var i = md.fullMessageLength.length - 1; i >= 0; --i) {
      md.fullMessageLength[i] += len[1];
      len[1] = len[0] + ((md.fullMessageLength[i] / 0x100000000) >>> 0);
      md.fullMessageLength[i] = md.fullMessageLength[i] >>> 0;
      len[0] = ((len[1] / 0x100000000) >>> 0);
    }

    // add bytes to input buffer
    _input.putBytes(msg);

    // process bytes
    _update(_state, _w, _input);

    // compact input buffer every 2K or if empty
    if(_input.read > 2048 || _input.length() === 0) {
      _input.compact();
    }

    return md;
  };

  /**
   * Produces the digest.
   *
   * @return a byte buffer containing the digest value.
   */
  md.digest = function() {
    /* Note: Here we copy the remaining bytes in the input buffer and
    add the appropriate SHA-256 padding. Then we do the final update
    on a copy of the state so that if the user wants to get
    intermediate digests they can do so. */

    /* Determine the number of bytes that must be added to the message
    to ensure its length is congruent to 448 mod 512. In other words,
    the data to be digested must be a multiple of 512 bits (or 128 bytes).
    This data includes the message, some padding, and the length of the
    message. Since the length of the message will be encoded as 8 bytes (64
    bits), that means that the last segment of the data must have 56 bytes
    (448 bits) of message and padding. Therefore, the length of the message
    plus the padding must be congruent to 448 mod 512 because
    512 - 128 = 448.

    In order to fill up the message length it must be filled with
    padding that begins with 1 bit followed by all 0 bits. Padding
    must *always* be present, so if the message length is already
    congruent to 448 mod 512, then 512 padding bits must be added. */

    var finalBlock = forge.util.createBuffer();
    finalBlock.putBytes(_input.bytes());

    // compute remaining size to be digested (include message length size)
    var remaining = (
      md.fullMessageLength[md.fullMessageLength.length - 1] +
      md.messageLengthSize);

    // add padding for overflow blockSize - overflow
    // _padding starts with 1 byte with first bit is set (byte value 128), then
    // there may be up to (blockSize - 1) other pad bytes
    var overflow = remaining & (md.blockLength - 1);
    finalBlock.putBytes(_padding.substr(0, md.blockLength - overflow));

    // serialize message length in bits in big-endian order; since length
    // is stored in bytes we multiply by 8 and add carry from next int
    var next, carry;
    var bits = md.fullMessageLength[0] * 8;
    for(var i = 0; i < md.fullMessageLength.length - 1; ++i) {
      next = md.fullMessageLength[i + 1] * 8;
      carry = (next / 0x100000000) >>> 0;
      bits += carry;
      finalBlock.putInt32(bits >>> 0);
      bits = next >>> 0;
    }
    finalBlock.putInt32(bits);

    var s2 = {
      h0: _state.h0,
      h1: _state.h1,
      h2: _state.h2,
      h3: _state.h3,
      h4: _state.h4,
      h5: _state.h5,
      h6: _state.h6,
      h7: _state.h7
    };
    _update(s2, _w, finalBlock);
    var rval = forge.util.createBuffer();
    rval.putInt32(s2.h0);
    rval.putInt32(s2.h1);
    rval.putInt32(s2.h2);
    rval.putInt32(s2.h3);
    rval.putInt32(s2.h4);
    rval.putInt32(s2.h5);
    rval.putInt32(s2.h6);
    rval.putInt32(s2.h7);
    return rval;
  };

  return md;
};

// sha-256 padding bytes not initialized yet
var _padding = null;
var _initialized = false;

// table of constants
var _k = null;

/**
 * Initializes the constant tables.
 */
function _init() {
  // create padding
  _padding = String.fromCharCode(128);
  _padding += forge.util.fillString(String.fromCharCode(0x00), 64);

  // create K table for SHA-256
  _k = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5,
    0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
    0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
    0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7,
    0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
    0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3,
    0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5,
    0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
    0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2];

  // now initialized
  _initialized = true;
}

/**
 * Updates a SHA-256 state with the given byte buffer.
 *
 * @param s the SHA-256 state to update.
 * @param w the array to use to store words.
 * @param bytes the byte buffer to update with.
 */
function _update(s, w, bytes) {
  // consume 512 bit (64 byte) chunks
  var t1, t2, s0, s1, ch, maj, i, a, b, c, d, e, f, g, h;
  var len = bytes.length();
  while(len >= 64) {
    // the w array will be populated with sixteen 32-bit big-endian words
    // and then extended into 64 32-bit words according to SHA-256
    for(i = 0; i < 16; ++i) {
      w[i] = bytes.getInt32();
    }
    for(; i < 64; ++i) {
      // XOR word 2 words ago rot right 17, rot right 19, shft right 10
      t1 = w[i - 2];
      t1 =
        ((t1 >>> 17) | (t1 << 15)) ^
        ((t1 >>> 19) | (t1 << 13)) ^
        (t1 >>> 10);
      // XOR word 15 words ago rot right 7, rot right 18, shft right 3
      t2 = w[i - 15];
      t2 =
        ((t2 >>> 7) | (t2 << 25)) ^
        ((t2 >>> 18) | (t2 << 14)) ^
        (t2 >>> 3);
      // sum(t1, word 7 ago, t2, word 16 ago) modulo 2^32
      w[i] = (t1 + w[i - 7] + t2 + w[i - 16]) | 0;
    }

    // initialize hash value for this chunk
    a = s.h0;
    b = s.h1;
    c = s.h2;
    d = s.h3;
    e = s.h4;
    f = s.h5;
    g = s.h6;
    h = s.h7;

    // round function
    for(i = 0; i < 64; ++i) {
      // Sum1(e)
      s1 =
        ((e >>> 6) | (e << 26)) ^
        ((e >>> 11) | (e << 21)) ^
        ((e >>> 25) | (e << 7));
      // Ch(e, f, g) (optimized the same way as SHA-1)
      ch = g ^ (e & (f ^ g));
      // Sum0(a)
      s0 =
        ((a >>> 2) | (a << 30)) ^
        ((a >>> 13) | (a << 19)) ^
        ((a >>> 22) | (a << 10));
      // Maj(a, b, c) (optimized the same way as SHA-1)
      maj = (a & b) | (c & (a ^ b));

      // main algorithm
      t1 = h + s1 + ch + _k[i] + w[i];
      t2 = s0 + maj;
      h = g;
      g = f;
      f = e;
      // `>>> 0` necessary to avoid iOS/Safari 10 optimization bug
      // can't truncate with `| 0`
      e = (d + t1) >>> 0;
      d = c;
      c = b;
      b = a;
      // `>>> 0` necessary to avoid iOS/Safari 10 optimization bug
      // can't truncate with `| 0`
      a = (t1 + t2) >>> 0;
    }

    // update hash state
    s.h0 = (s.h0 + a) | 0;
    s.h1 = (s.h1 + b) | 0;
    s.h2 = (s.h2 + c) | 0;
    s.h3 = (s.h3 + d) | 0;
    s.h4 = (s.h4 + e) | 0;
    s.h5 = (s.h5 + f) | 0;
    s.h6 = (s.h6 + g) | 0;
    s.h7 = (s.h7 + h) | 0;
    len -= 64;
  }
}


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = __webpack_require__(117);

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = __webpack_require__(118);

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(67)))

/***/ }),
/* 117 */
/***/ (function(module, exports) {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

/***/ }),
/* 118 */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright (c) 2016-2017 Digital Bazaar, Inc. All rights reserved.
 */


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var URDNA2015 = __webpack_require__(68);
var util = __webpack_require__(14);

module.exports = function (_URDNA) {
  _inherits(URDNA2012, _URDNA);

  function URDNA2012(options) {
    _classCallCheck(this, URDNA2012);

    var _this = _possibleConstructorReturn(this, (URDNA2012.__proto__ || Object.getPrototypeOf(URDNA2012)).call(this, options));

    _this.name = 'URGNA2012';
    _this.hashAlgorithm = 'sha1';
    return _this;
  }

  // helper for modifying component during Hash First Degree Quads


  _createClass(URDNA2012, [{
    key: 'modifyFirstDegreeComponent',
    value: function modifyFirstDegreeComponent(id, component, key) {
      if (component.termType !== 'BlankNode') {
        return component;
      }
      component = util.clone(component);
      if (key === 'name') {
        component.value = '_:g';
      } else {
        component.value = component.value === id ? '_:a' : '_:z';
      }
      return component;
    }

    // helper for getting a related predicate

  }, {
    key: 'getRelatedPredicate',
    value: function getRelatedPredicate(quad) {
      return quad.predicate.value;
    }

    // helper for creating hash to related blank nodes map

  }, {
    key: 'createHashToRelated',
    value: function createHashToRelated(id, issuer, callback) {
      var self = this;

      // 1) Create a hash to related blank nodes map for storing hashes that
      // identify related blank nodes.
      var hashToRelated = {};

      // 2) Get a reference, quads, to the list of quads in the blank node to
      // quads map for the key identifier.
      var quads = self.blankNodeInfo[id].quads;

      // 3) For each quad in quads:
      self.forEach(quads, function (quad, idx, callback) {
        // 3.1) If the quad's subject is a blank node that does not match
        // identifier, set hash to the result of the Hash Related Blank Node
        // algorithm, passing the blank node identifier for subject as related,
        // quad, path identifier issuer as issuer, and p as position.
        var position = void 0;
        var related = void 0;
        if (quad.subject.termType === 'BlankNode' && quad.subject.value !== id) {
          related = quad.subject.value;
          position = 'p';
        } else if (quad.object.termType === 'BlankNode' && quad.object.value !== id) {
          // 3.2) Otherwise, if quad's object is a blank node that does not match
          // identifier, to the result of the Hash Related Blank Node algorithm,
          // passing the blank node identifier for object as related, quad, path
          // identifier issuer as issuer, and r as position.
          related = quad.object.value;
          position = 'r';
        } else {
          // 3.3) Otherwise, continue to the next quad.
          return callback();
        }
        // 3.4) Add a mapping of hash to the blank node identifier for the
        // component that matched (subject or object) to hash to related blank
        // nodes map, adding an entry as necessary.
        self.hashRelatedBlankNode(related, quad, issuer, position, function (err, hash) {
          if (err) {
            return callback(err);
          }
          if (hash in hashToRelated) {
            hashToRelated[hash].push(related);
          } else {
            hashToRelated[hash] = [related];
          }
          callback();
        });
      }, function (err) {
        return callback(err, hashToRelated);
      });
    }
  }]);

  return URDNA2012;
}(URDNA2015);

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright (c) 2016 Digital Bazaar, Inc. All rights reserved.
 */


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var URDNA2015Sync = __webpack_require__(72);
var util = __webpack_require__(14);

module.exports = function (_URDNA2015Sync) {
  _inherits(URDNA2012Sync, _URDNA2015Sync);

  function URDNA2012Sync() {
    _classCallCheck(this, URDNA2012Sync);

    var _this = _possibleConstructorReturn(this, (URDNA2012Sync.__proto__ || Object.getPrototypeOf(URDNA2012Sync)).call(this));

    _this.name = 'URGNA2012';
    _this.hashAlgorithm = 'sha1';
    return _this;
  }

  // helper for modifying component during Hash First Degree Quads


  _createClass(URDNA2012Sync, [{
    key: 'modifyFirstDegreeComponent',
    value: function modifyFirstDegreeComponent(id, component, key) {
      if (component.termType !== 'BlankNode') {
        return component;
      }
      component = util.clone(component);
      if (key === 'name') {
        component.value = '_:g';
      } else {
        component.value = component.value === id ? '_:a' : '_:z';
      }
      return component;
    }

    // helper for getting a related predicate

  }, {
    key: 'getRelatedPredicate',
    value: function getRelatedPredicate(quad) {
      return quad.predicate.value;
    }

    // helper for creating hash to related blank nodes map

  }, {
    key: 'createHashToRelated',
    value: function createHashToRelated(id, issuer) {
      var self = this;

      // 1) Create a hash to related blank nodes map for storing hashes that
      // identify related blank nodes.
      var hashToRelated = {};

      // 2) Get a reference, quads, to the list of quads in the blank node to
      // quads map for the key identifier.
      var quads = self.blankNodeInfo[id].quads;

      // 3) For each quad in quads:
      for (var i = 0; i < quads.length; ++i) {
        // 3.1) If the quad's subject is a blank node that does not match
        // identifier, set hash to the result of the Hash Related Blank Node
        // algorithm, passing the blank node identifier for subject as related,
        // quad, path identifier issuer as issuer, and p as position.
        var quad = quads[i];
        var position = void 0;
        var related = void 0;
        if (quad.subject.termType === 'BlankNode' && quad.subject.value !== id) {
          related = quad.subject.value;
          position = 'p';
        } else if (quad.object.termType === 'BlankNode' && quad.object.value !== id) {
          // 3.2) Otherwise, if quad's object is a blank node that does not match
          // identifier, to the result of the Hash Related Blank Node algorithm,
          // passing the blank node identifier for object as related, quad, path
          // identifier issuer as issuer, and r as position.
          related = quad.object.value;
          position = 'r';
        } else {
          // 3.3) Otherwise, continue to the next quad.
          continue;
        }
        // 3.4) Add a mapping of hash to the blank node identifier for the
        // component that matched (subject or object) to hash to related blank
        // nodes map, adding an entry as necessary.
        var hash = self.hashRelatedBlankNode(related, quad, issuer, position);
        if (hash in hashToRelated) {
          hashToRelated[hash].push(related);
        } else {
          hashToRelated[hash] = [related];
        }
      }

      return hashToRelated;
    }
  }]);

  return URDNA2012Sync;
}(URDNA2015Sync);

/***/ }),
/* 121 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */


// TODO: move `NQuads` to its own package

module.exports = __webpack_require__(44).NQuads;

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */
/* global Node, XMLSerializer */


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = __webpack_require__(24),
    RDF_LANGSTRING = _require.RDF_LANGSTRING,
    RDF_PLAIN_LITERAL = _require.RDF_PLAIN_LITERAL,
    RDF_OBJECT = _require.RDF_OBJECT,
    RDF_XML_LITERAL = _require.RDF_XML_LITERAL,
    XSD_STRING = _require.XSD_STRING;

var _Node = void 0;
if (typeof Node !== 'undefined') {
  _Node = Node;
} else {
  _Node = {
    ELEMENT_NODE: 1,
    ATTRIBUTE_NODE: 2,
    TEXT_NODE: 3,
    CDATA_SECTION_NODE: 4,
    ENTITY_REFERENCE_NODE: 5,
    ENTITY_NODE: 6,
    PROCESSING_INSTRUCTION_NODE: 7,
    COMMENT_NODE: 8,
    DOCUMENT_NODE: 9,
    DOCUMENT_TYPE_NODE: 10,
    DOCUMENT_FRAGMENT_NODE: 11,
    NOTATION_NODE: 12
  };
}

module.exports = function () {
  function Rdfa() {
    _classCallCheck(this, Rdfa);
  }

  _createClass(Rdfa, [{
    key: 'parse',

    /**
     * Parses the RDF dataset found via the data object from the RDFa API.
     *
     * @param data the RDFa API data object.
     *
     * @return the RDF dataset.
     */
    value: function parse(data) {
      var dataset = {};
      dataset['@default'] = [];

      var subjects = data.getSubjects();
      for (var si = 0; si < subjects.length; ++si) {
        var subject = subjects[si];
        if (subject === null) {
          continue;
        }

        // get all related triples
        var triples = data.getSubjectTriples(subject);
        if (triples === null) {
          continue;
        }
        var predicates = triples.predicates;
        for (var predicate in predicates) {
          // iterate over objects
          var objects = predicates[predicate].objects;
          for (var oi = 0; oi < objects.length; ++oi) {
            var object = objects[oi];

            // create RDF triple
            var triple = {};

            // add subject
            if (subject.indexOf('_:') === 0) {
              triple.subject = { type: 'blank node', value: subject };
            } else {
              triple.subject = { type: 'IRI', value: subject };
            }

            // add predicate
            if (predicate.indexOf('_:') === 0) {
              triple.predicate = { type: 'blank node', value: predicate };
            } else {
              triple.predicate = { type: 'IRI', value: predicate };
            }

            // serialize XML literal
            var value = object.value;
            if (object.type === RDF_XML_LITERAL) {
              // initialize XMLSerializer
              var _XMLSerializer = getXMLSerializerClass();
              var serializer = new _XMLSerializer();
              value = '';
              for (var x = 0; x < object.value.length; x++) {
                if (object.value[x].nodeType === _Node.ELEMENT_NODE) {
                  value += serializer.serializeToString(object.value[x]);
                } else if (object.value[x].nodeType === _Node.TEXT_NODE) {
                  value += object.value[x].nodeValue;
                }
              }
            }

            // add object
            triple.object = {};

            // object is an IRI
            if (object.type === RDF_OBJECT) {
              if (object.value.indexOf('_:') === 0) {
                triple.object.type = 'blank node';
              } else {
                triple.object.type = 'IRI';
              }
            } else {
              // object is a literal
              triple.object.type = 'literal';
              if (object.type === RDF_PLAIN_LITERAL) {
                if (object.language) {
                  triple.object.datatype = RDF_LANGSTRING;
                  triple.object.language = object.language;
                } else {
                  triple.object.datatype = XSD_STRING;
                }
              } else {
                triple.object.datatype = object.type;
              }
            }
            triple.object.value = value;

            // add triple to dataset in default graph
            dataset['@default'].push(triple);
          }
        }
      }

      return dataset;
    }
  }]);

  return Rdfa;
}();

function getXMLSerializerClass() {
  if (typeof XMLSerializer === 'undefined') {
    return __webpack_require__(48).XMLSerializer;
  }
  return XMLSerializer;
}

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var JsonLdError = __webpack_require__(6);

var _require = __webpack_require__(3),
    _isArray = _require.isArray,
    _isObject = _require.isObject,
    _isString = _require.isString;

var _require2 = __webpack_require__(5),
    _isList = _require2.isList,
    _isValue = _require2.isValue;

var _require3 = __webpack_require__(15),
    _expandIri = _require3.expandIri,
    _getContextValue = _require3.getContextValue,
    _isKeyword = _require3.isKeyword,
    _processContext = _require3.process;

var _require4 = __webpack_require__(25),
    _isAbsoluteIri = _require4.isAbsolute;

var _require5 = __webpack_require__(2),
    _addValue = _require5.addValue,
    _validateTypeValue = _require5.validateTypeValue;

var api = {};
module.exports = api;

/**
 * Recursively expands an element using the given context. Any context in
 * the element will be removed. All context URLs must have been retrieved
 * before calling this method.
 *
 * @param activeCtx the context to use.
 * @param activeProperty the property for the element, null for none.
 * @param element the element to expand.
 * @param options the expansion options.
 * @param insideList true if the element is a list, false if not.
 * @param expansionMap(info) a function that can be used to custom map
 *          unmappable values (or to throw an error when they are detected);
 *          if this function returns `undefined` then the default behavior
 *          will be used.
 *
 * @return a Promise that resolves to the expanded value.
 */
api.expand = function (_ref) {
  var activeCtx = _ref.activeCtx,
      _ref$activeProperty = _ref.activeProperty,
      activeProperty = _ref$activeProperty === undefined ? null : _ref$activeProperty,
      element = _ref.element,
      _ref$options = _ref.options,
      options = _ref$options === undefined ? {} : _ref$options,
      _ref$insideList = _ref.insideList,
      insideList = _ref$insideList === undefined ? false : _ref$insideList,
      _ref$expansionMap = _ref.expansionMap,
      expansionMap = _ref$expansionMap === undefined ? function () {
    return undefined;
  } : _ref$expansionMap;

  // nothing to expand
  if (element === null || element === undefined) {
    return null;
  }

  if (!_isArray(element) && !_isObject(element)) {
    // drop free-floating scalars that are not in lists unless custom mapped
    if (!insideList && (activeProperty === null || _expandIri(activeCtx, activeProperty, { vocab: true }) === '@graph')) {
      // TODO: use `await` to support async
      var mapped = expansionMap({
        unmappedValue: element,
        activeCtx: activeCtx,
        activeProperty: activeProperty,
        options: options,
        insideList: insideList
      });
      if (mapped === undefined) {
        return null;
      }
      return mapped;
    }

    // expand element according to value expansion rules
    return _expandValue({ activeCtx: activeCtx, activeProperty: activeProperty, value: element });
  }

  // recursively expand array
  if (_isArray(element)) {
    var _rval = [];
    var container = _getContextValue(activeCtx, activeProperty, '@container') || [];
    insideList = insideList || container.includes('@list');
    for (var i = 0; i < element.length; ++i) {
      // expand element
      var e = api.expand({
        activeCtx: activeCtx,
        activeProperty: activeProperty,
        element: element[i],
        options: options,
        expansionMap: expansionMap
      });
      if (insideList && (_isArray(e) || _isList(e))) {
        // lists of lists are illegal
        throw new JsonLdError('Invalid JSON-LD syntax; lists of lists are not permitted.', 'jsonld.SyntaxError', { code: 'list of lists' });
      }

      if (e === null) {
        // TODO: add `await` for async support
        e = expansionMap({
          unmappedValue: element[i],
          activeCtx: activeCtx,
          activeProperty: activeProperty,
          parent: element,
          index: i,
          options: options,
          expandedParent: _rval,
          insideList: insideList
        });
        if (e === undefined) {
          continue;
        }
      }

      if (_isArray(e)) {
        _rval = _rval.concat(e);
      } else {
        _rval.push(e);
      }
    }
    return _rval;
  }

  // recursively expand object:

  // if element has a context, process it
  if ('@context' in element) {
    activeCtx = _processContext({ activeCtx: activeCtx, localCtx: element['@context'], options: options });
  }

  // expand the active property
  var expandedActiveProperty = _expandIri(activeCtx, activeProperty, { vocab: true });

  var rval = {};
  var keys = Object.keys(element).sort();
  for (var ki = 0; ki < keys.length; ++ki) {
    var key = keys[ki];
    var value = element[key];
    var expandedValue = void 0;

    // skip @context
    if (key === '@context') {
      continue;
    }

    // expand property
    var expandedProperty = _expandIri(activeCtx, key, { vocab: true });

    // drop non-absolute IRI keys that aren't keywords unless custom mapped
    if (expandedProperty === null || !(_isAbsoluteIri(expandedProperty) || _isKeyword(expandedProperty))) {
      // TODO: use `await` to support async
      expandedProperty = expansionMap({
        unmappedProperty: key,
        activeCtx: activeCtx,
        activeProperty: activeProperty,
        parent: element,
        options: options,
        insideList: insideList,
        value: value,
        expandedParent: rval
      });
      if (expandedProperty === undefined) {
        continue;
      }
    }

    if (_isKeyword(expandedProperty)) {
      if (expandedActiveProperty === '@reverse') {
        throw new JsonLdError('Invalid JSON-LD syntax; a keyword cannot be used as a @reverse ' + 'property.', 'jsonld.SyntaxError', { code: 'invalid reverse property map', value: value });
      }
      if (expandedProperty in rval) {
        throw new JsonLdError('Invalid JSON-LD syntax; colliding keywords detected.', 'jsonld.SyntaxError', { code: 'colliding keywords', keyword: expandedProperty });
      }
    }

    // syntax error if @id is not a string
    if (expandedProperty === '@id' && !_isString(value)) {
      if (!options.isFrame) {
        throw new JsonLdError('Invalid JSON-LD syntax; "@id" value must a string.', 'jsonld.SyntaxError', { code: 'invalid @id value', value: value });
      }
      if (!_isObject(value)) {
        throw new JsonLdError('Invalid JSON-LD syntax; "@id" value must be a string or an ' + 'object.', 'jsonld.SyntaxError', { code: 'invalid @id value', value: value });
      }
    }

    if (expandedProperty === '@type') {
      _validateTypeValue(value);
    }

    // @graph must be an array or an object
    if (expandedProperty === '@graph' && !(_isObject(value) || _isArray(value))) {
      throw new JsonLdError('Invalid JSON-LD syntax; "@graph" value must not be an ' + 'object or an array.', 'jsonld.SyntaxError', { code: 'invalid @graph value', value: value });
    }

    // @value must not be an object or an array
    if (expandedProperty === '@value' && (_isObject(value) || _isArray(value))) {
      throw new JsonLdError('Invalid JSON-LD syntax; "@value" value must not be an ' + 'object or an array.', 'jsonld.SyntaxError', { code: 'invalid value object value', value: value });
    }

    // @language must be a string
    if (expandedProperty === '@language') {
      if (value === null) {
        // drop null @language values, they expand as if they didn't exist
        continue;
      }
      if (!_isString(value)) {
        throw new JsonLdError('Invalid JSON-LD syntax; "@language" value must be a string.', 'jsonld.SyntaxError', { code: 'invalid language-tagged string', value: value });
      }
      // ensure language value is lowercase
      value = value.toLowerCase();
    }

    // @index must be a string
    if (expandedProperty === '@index') {
      if (!_isString(value)) {
        throw new JsonLdError('Invalid JSON-LD syntax; "@index" value must be a string.', 'jsonld.SyntaxError', { code: 'invalid @index value', value: value });
      }
    }

    // @reverse must be an object
    if (expandedProperty === '@reverse') {
      if (!_isObject(value)) {
        throw new JsonLdError('Invalid JSON-LD syntax; "@reverse" value must be an object.', 'jsonld.SyntaxError', { code: 'invalid @reverse value', value: value });
      }

      expandedValue = api.expand({
        activeCtx: activeCtx,
        activeProperty: '@reverse',
        element: value,
        options: options,
        expansionMap: expansionMap
      });

      // properties double-reversed
      if ('@reverse' in expandedValue) {
        for (var property in expandedValue['@reverse']) {
          _addValue(rval, property, expandedValue['@reverse'][property], { propertyIsArray: true });
        }
      }

      // FIXME: can this be merged with code below to simplify?
      // merge in all reversed properties
      var reverseMap = rval['@reverse'] || null;
      for (var _property in expandedValue) {
        if (_property === '@reverse') {
          continue;
        }
        if (reverseMap === null) {
          reverseMap = rval['@reverse'] = {};
        }
        _addValue(reverseMap, _property, [], { propertyIsArray: true });
        var items = expandedValue[_property];
        for (var ii = 0; ii < items.length; ++ii) {
          var item = items[ii];
          if (_isValue(item) || _isList(item)) {
            throw new JsonLdError('Invalid JSON-LD syntax; "@reverse" value must not be a ' + '@value or an @list.', 'jsonld.SyntaxError', { code: 'invalid reverse property value', value: expandedValue });
          }
          _addValue(reverseMap, _property, item, { propertyIsArray: true });
        }
      }

      continue;
    }

    var _container = _getContextValue(activeCtx, key, '@container') || [];

    if (_container.includes('@language') && _isObject(value)) {
      // handle language map container (skip if value is not an object)
      expandedValue = _expandLanguageMap(value);
    } else if (_container.includes('@index') && _isObject(value)) {
      // handle index container (skip if value is not an object)
      expandedValue = _expandIndexMap({
        activeCtx: activeCtx,
        options: options,
        activeProperty: key,
        value: value,
        expansionMap: expansionMap
      });
    } else {
      // recurse into @list or @set
      var isList = expandedProperty === '@list';
      if (isList || expandedProperty === '@set') {
        var nextActiveProperty = activeProperty;
        if (isList && expandedActiveProperty === '@graph') {
          nextActiveProperty = null;
        }
        expandedValue = api.expand({
          activeCtx: activeCtx,
          activeProperty: nextActiveProperty,
          element: value,
          options: options,
          insideList: isList,
          expansionMap: expansionMap
        });
        if (isList && _isList(expandedValue)) {
          throw new JsonLdError('Invalid JSON-LD syntax; lists of lists are not permitted.', 'jsonld.SyntaxError', { code: 'list of lists' });
        }
      } else {
        // recursively expand value with key as new active property
        expandedValue = api.expand({
          activeCtx: activeCtx,
          activeProperty: key,
          element: value,
          options: options,
          insideList: false,
          expansionMap: expansionMap
        });
      }
    }

    // drop null values if property is not @value
    if (expandedValue === null && expandedProperty !== '@value') {
      // TODO: use `await` to support async
      expandedValue = expansionMap({
        unmappedValue: value,
        expandedProperty: expandedProperty,
        activeCtx: activeCtx,
        activeProperty: activeProperty,
        parent: element,
        options: options,
        insideList: insideList,
        key: key,
        expandedParent: rval
      });
      if (expandedValue === undefined) {
        continue;
      }
    }

    // convert expanded value to @list if container specifies it
    if (expandedProperty !== '@list' && !_isList(expandedValue) && _container.includes('@list')) {
      // ensure expanded value is an array
      expandedValue = _isArray(expandedValue) ? expandedValue : [expandedValue];
      expandedValue = { '@list': expandedValue };
    }

    // convert expanded value to @graph if container specifies it
    if (_container.includes('@graph')) {
      // ensure expanded value is an array
      expandedValue = [].concat(expandedValue);
      expandedValue = { '@graph': expandedValue };
    }

    // FIXME: can this be merged with code above to simplify?
    // merge in reverse properties
    if (activeCtx.mappings[key] && activeCtx.mappings[key].reverse) {
      var _reverseMap = rval['@reverse'] = rval['@reverse'] || {};
      if (!_isArray(expandedValue)) {
        expandedValue = [expandedValue];
      }
      for (var _ii = 0; _ii < expandedValue.length; ++_ii) {
        var _item = expandedValue[_ii];
        if (_isValue(_item) || _isList(_item)) {
          throw new JsonLdError('Invalid JSON-LD syntax; "@reverse" value must not be a ' + '@value or an @list.', 'jsonld.SyntaxError', { code: 'invalid reverse property value', value: expandedValue });
        }
        _addValue(_reverseMap, expandedProperty, _item, { propertyIsArray: true });
      }
      continue;
    }

    // add value for property
    // use an array except for certain keywords
    var useArray = !['@index', '@id', '@type', '@value', '@language'].includes(expandedProperty);
    _addValue(rval, expandedProperty, expandedValue, { propertyIsArray: useArray });
  }

  // get property count on expanded output
  keys = Object.keys(rval);
  var count = keys.length;

  if ('@value' in rval) {
    // @value must only have @language or @type
    if ('@type' in rval && '@language' in rval) {
      throw new JsonLdError('Invalid JSON-LD syntax; an element containing "@value" may not ' + 'contain both "@type" and "@language".', 'jsonld.SyntaxError', { code: 'invalid value object', element: rval });
    }
    var validCount = count - 1;
    if ('@type' in rval) {
      validCount -= 1;
    }
    if ('@index' in rval) {
      validCount -= 1;
    }
    if ('@language' in rval) {
      validCount -= 1;
    }
    if (validCount !== 0) {
      throw new JsonLdError('Invalid JSON-LD syntax; an element containing "@value" may only ' + 'have an "@index" property and at most one other property ' + 'which can be "@type" or "@language".', 'jsonld.SyntaxError', { code: 'invalid value object', element: rval });
    }
    // drop null @values unless custom mapped
    if (rval['@value'] === null) {
      // TODO: use `await` to support async
      var _mapped = expansionMap({
        unmappedValue: rval,
        activeCtx: activeCtx,
        activeProperty: activeProperty,
        element: element,
        options: options,
        insideList: insideList
      });
      if (_mapped !== undefined) {
        rval = _mapped;
      } else {
        rval = null;
      }
    } else if ('@language' in rval && !_isString(rval['@value'])) {
      // if @language is present, @value must be a string
      throw new JsonLdError('Invalid JSON-LD syntax; only strings may be language-tagged.', 'jsonld.SyntaxError', { code: 'invalid language-tagged value', element: rval });
    } else if ('@type' in rval && (!_isAbsoluteIri(rval['@type']) || rval['@type'].indexOf('_:') === 0)) {
      throw new JsonLdError('Invalid JSON-LD syntax; an element containing "@value" and "@type" ' + 'must have an absolute IRI for the value of "@type".', 'jsonld.SyntaxError', { code: 'invalid typed value', element: rval });
    }
  } else if ('@type' in rval && !_isArray(rval['@type'])) {
    // convert @type to an array
    rval['@type'] = [rval['@type']];
  } else if ('@set' in rval || '@list' in rval) {
    // handle @set and @list
    if (count > 1 && !(count === 2 && '@index' in rval)) {
      throw new JsonLdError('Invalid JSON-LD syntax; if an element has the property "@set" ' + 'or "@list", then it can have at most one other property that is ' + '"@index".', 'jsonld.SyntaxError', { code: 'invalid set or list object', element: rval });
    }
    // optimize away @set
    if ('@set' in rval) {
      rval = rval['@set'];
      keys = Object.keys(rval);
      count = keys.length;
    }
  } else if (count === 1 && '@language' in rval) {
    // drop objects with only @language unless custom mapped
    // TODO: use `await` to support async
    var _mapped2 = expansionMap(rval, {
      unmappedValue: rval,
      activeCtx: activeCtx,
      activeProperty: activeProperty,
      element: element,
      options: options,
      insideList: insideList
    });
    if (_mapped2 !== undefined) {
      rval = _mapped2;
    } else {
      rval = null;
    }
  }

  // drop certain top-level objects that do not occur in lists, unless custom
  // mapped
  if (_isObject(rval) && !options.keepFreeFloatingNodes && !insideList && (activeProperty === null || expandedActiveProperty === '@graph')) {
    // drop empty object, top-level @value/@list, or object with only @id
    if (count === 0 || '@value' in rval || '@list' in rval || count === 1 && '@id' in rval) {
      // TODO: use `await` to support async
      var _mapped3 = expansionMap({
        unmappedValue: rval,
        activeCtx: activeCtx,
        activeProperty: activeProperty,
        element: element,
        options: options,
        insideList: insideList
      });
      if (_mapped3 !== undefined) {
        rval = _mapped3;
      } else {
        rval = null;
      }
    }
  }

  return rval;
};

/**
 * Expands the given value by using the coercion and keyword rules in the
 * given context.
 *
 * @param activeCtx the active context to use.
 * @param activeProperty the active property the value is associated with.
 * @param value the value to expand.
 *
 * @return the expanded value.
 */
function _expandValue(_ref2) {
  var activeCtx = _ref2.activeCtx,
      activeProperty = _ref2.activeProperty,
      value = _ref2.value;

  // nothing to expand
  if (value === null || value === undefined) {
    return null;
  }

  // special-case expand @id and @type (skips '@id' expansion)
  var expandedProperty = _expandIri(activeCtx, activeProperty, { vocab: true });
  if (expandedProperty === '@id') {
    return _expandIri(activeCtx, value, { base: true });
  } else if (expandedProperty === '@type') {
    return _expandIri(activeCtx, value, { vocab: true, base: true });
  }

  // get type definition from context
  var type = _getContextValue(activeCtx, activeProperty, '@type');

  // do @id expansion (automatic for @graph)
  if ((type === '@id' || expandedProperty === '@graph') && _isString(value)) {
    return { '@id': _expandIri(activeCtx, value, { base: true }) };
  }
  // do @id expansion w/vocab
  if (type === '@vocab' && _isString(value)) {
    return { '@id': _expandIri(activeCtx, value, { vocab: true, base: true }) };
  }

  // do not expand keyword values
  if (_isKeyword(expandedProperty)) {
    return value;
  }

  var rval = {};

  if (type && !['@id', '@vocab'].includes(type)) {
    // other type
    rval['@type'] = type;
  } else if (_isString(value)) {
    // check for language tagging for strings
    var language = _getContextValue(activeCtx, activeProperty, '@language');
    if (language !== null) {
      rval['@language'] = language;
    }
  }
  // do conversion of values that aren't basic JSON types to strings
  if (!['boolean', 'number', 'string'].includes(typeof value === 'undefined' ? 'undefined' : _typeof(value))) {
    value = value.toString();
  }
  rval['@value'] = value;

  return rval;
}

/**
 * Expands a language map.
 *
 * @param languageMap the language map to expand.
 *
 * @return the expanded language map.
 */
function _expandLanguageMap(languageMap) {
  var rval = [];
  var keys = Object.keys(languageMap).sort();
  for (var ki = 0; ki < keys.length; ++ki) {
    var key = keys[ki];
    var val = languageMap[key];
    if (!_isArray(val)) {
      val = [val];
    }
    for (var vi = 0; vi < val.length; ++vi) {
      var item = val[vi];
      if (item === null) {
        // null values are allowed (8.5) but ignored (3.1)
        continue;
      }
      if (!_isString(item)) {
        throw new JsonLdError('Invalid JSON-LD syntax; language map values must be strings.', 'jsonld.SyntaxError', { code: 'invalid language map value', languageMap: languageMap });
      }
      rval.push({
        '@value': item,
        '@language': key.toLowerCase()
      });
    }
  }
  return rval;
}

function _expandIndexMap(_ref3) {
  var activeCtx = _ref3.activeCtx,
      options = _ref3.options,
      activeProperty = _ref3.activeProperty,
      value = _ref3.value,
      expansionMap = _ref3.expansionMap;

  var rval = [];
  var keys = Object.keys(value).sort();
  for (var ki = 0; ki < keys.length; ++ki) {
    var key = keys[ki];
    var val = value[key];
    if (!_isArray(val)) {
      val = [val];
    }
    val = api.expand({
      activeCtx: activeCtx,
      activeProperty: activeProperty,
      element: val,
      options: options,
      insideList: false,
      expansionMap: expansionMap
    });
    for (var vi = 0; vi < val.length; ++vi) {
      var item = val[vi];
      if (!('@index' in item)) {
        item['@index'] = key;
      }
      rval.push(item);
    }
  }
  return rval;
}

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = __webpack_require__(2),
    clone = _require.clone;

module.exports = function () {
  /**
   * Creates an active context cache.
   *
   * @param size the maximum size of the cache.
   */
  function ActiveContextCache() {
    var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;

    _classCallCheck(this, ActiveContextCache);

    this.order = [];
    this.cache = {};
    this.size = size;
  }

  _createClass(ActiveContextCache, [{
    key: 'get',
    value: function get(activeCtx, localCtx) {
      var key1 = JSON.stringify(activeCtx);
      var key2 = JSON.stringify(localCtx);
      var level1 = this.cache[key1];
      if (level1 && key2 in level1) {
        return level1[key2];
      }
      return null;
    }
  }, {
    key: 'set',
    value: function set(activeCtx, localCtx, result) {
      if (this.order.length === this.size) {
        var entry = this.order.shift();
        delete this.cache[entry.activeCtx][entry.localCtx];
      }
      var key1 = JSON.stringify(activeCtx);
      var key2 = JSON.stringify(localCtx);
      this.order.push({ activeCtx: key1, localCtx: key2 });
      if (!(key1 in this.cache)) {
        this.cache[key1] = {};
      }
      this.cache[key1][key2] = clone(result);
    }
  }]);

  return ActiveContextCache;
}();

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */


var _require = __webpack_require__(5),
    _isSubjectReference = _require.isSubjectReference;

var _require2 = __webpack_require__(32),
    _createMergedNodeMap = _require2.createMergedNodeMap;

var api = {};
module.exports = api;

/**
 * Performs JSON-LD flattening.
 *
 * @param input the expanded JSON-LD to flatten.
 *
 * @return the flattened output.
 */
api.flatten = function (input) {
  var defaultGraph = _createMergedNodeMap(input);

  // produce flattened output
  var flattened = [];
  var keys = Object.keys(defaultGraph).sort();
  for (var ki = 0; ki < keys.length; ++ki) {
    var node = defaultGraph[keys[ki]];
    // only add full subjects to top-level
    if (!_isSubjectReference(node)) {
      flattened.push(node);
    }
  }
  return flattened;
};

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */


var _require = __webpack_require__(15),
    isKeyword = _require.isKeyword;

var graphTypes = __webpack_require__(5);
var types = __webpack_require__(3);
var util = __webpack_require__(2);
var JsonLdError = __webpack_require__(6);

var _require2 = __webpack_require__(32),
    _createNodeMap = _require2.createNodeMap;

var api = {};
module.exports = api;

/**
 * Performs JSON-LD `merged` framing.
 *
 * @param input the expanded JSON-LD to frame.
 * @param frame the expanded JSON-LD frame to use.
 * @param options the framing options.
 *
 * @return the framed output.
 */
api.frameMerged = function (input, frame, options) {
  // create framing state
  var state = {
    options: options,
    graphs: { '@default': {}, '@merged': {} },
    subjectStack: [],
    link: {}
  };

  // produce a map of all graphs and name each bnode
  // FIXME: currently uses subjects from @merged graph only
  var issuer = new util.IdentifierIssuer('_:b');
  _createNodeMap(input, state.graphs, '@merged', issuer);
  state.subjects = state.graphs['@merged'];

  // frame the subjects
  var framed = [];
  api.frame(state, Object.keys(state.subjects).sort(), frame, framed);
  return framed;
};

/**
 * Frames subjects according to the given frame.
 *
 * @param state the current framing state.
 * @param subjects the subjects to filter.
 * @param frame the frame.
 * @param parent the parent subject or top-level array.
 * @param property the parent property, initialized to null.
 */
api.frame = function (state, subjects, frame, parent) {
  var property = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

  // validate the frame
  _validateFrame(frame);
  frame = frame[0];

  // get flags for current frame
  var options = state.options;
  var flags = {
    embed: _getFrameFlag(frame, options, 'embed'),
    explicit: _getFrameFlag(frame, options, 'explicit'),
    requireAll: _getFrameFlag(frame, options, 'requireAll')
  };

  // filter out subjects that match the frame
  var matches = _filterSubjects(state, subjects, frame, flags);

  // add matches to output
  var ids = Object.keys(matches).sort();
  for (var idx = 0; idx < ids.length; ++idx) {
    var id = ids[idx];
    var subject = matches[id];

    if (flags.embed === '@link' && id in state.link) {
      // TODO: may want to also match an existing linked subject against
      // the current frame ... so different frames could produce different
      // subjects that are only shared in-memory when the frames are the same

      // add existing linked subject
      _addFrameOutput(parent, property, state.link[id]);
      continue;
    }

    /* Note: In order to treat each top-level match as a compartmentalized
    result, clear the unique embedded subjects map when the property is null,
    which only occurs at the top-level. */
    if (property === null) {
      state.uniqueEmbeds = {};
    }

    // start output for subject
    var output = {};
    output['@id'] = id;
    state.link[id] = output;

    // if embed is @never or if a circular reference would be created by an
    // embed, the subject cannot be embedded, just add the reference;
    // note that a circular reference won't occur when the embed flag is
    // `@link` as the above check will short-circuit before reaching this point
    if (flags.embed === '@never' || _createsCircularReference(subject, state.subjectStack)) {
      _addFrameOutput(parent, property, output);
      continue;
    }

    // if only the last match should be embedded
    if (flags.embed === '@last') {
      // remove any existing embed
      if (id in state.uniqueEmbeds) {
        _removeEmbed(state, id);
      }
      state.uniqueEmbeds[id] = { parent: parent, property: property };
    }

    // push matching subject onto stack to enable circular embed checks
    state.subjectStack.push(subject);

    // iterate over subject properties
    var props = Object.keys(subject).sort();
    for (var i = 0; i < props.length; i++) {
      var prop = props[i];

      // copy keywords to output
      if (isKeyword(prop)) {
        output[prop] = util.clone(subject[prop]);
        continue;
      }

      // explicit is on and property isn't in the frame, skip processing
      if (flags.explicit && !(prop in frame)) {
        continue;
      }

      // add objects
      var objects = subject[prop];
      for (var oi = 0; oi < objects.length; ++oi) {
        var o = objects[oi];

        // recurse into list
        if (graphTypes.isList(o)) {
          // add empty list
          var list = { '@list': [] };
          _addFrameOutput(output, prop, list);

          // add list objects
          var src = o['@list'];
          for (var n in src) {
            o = src[n];
            if (graphTypes.isSubjectReference(o)) {
              var subframe = prop in frame ? frame[prop][0]['@list'] : _createImplicitFrame(flags);
              // recurse into subject reference
              api.frame(state, [o['@id']], subframe, list, '@list');
            } else {
              // include other values automatically
              _addFrameOutput(list, '@list', util.clone(o));
            }
          }
          continue;
        }

        if (graphTypes.isSubjectReference(o)) {
          // recurse into subject reference
          var _subframe = prop in frame ? frame[prop] : _createImplicitFrame(flags);
          api.frame(state, [o['@id']], _subframe, output, prop);
        } else {
          // include other values automatically
          _addFrameOutput(output, prop, util.clone(o));
        }
      }
    }

    // handle defaults
    props = Object.keys(frame).sort();
    for (var _i = 0; _i < props.length; ++_i) {
      var _prop = props[_i];

      // skip keywords
      if (isKeyword(_prop)) {
        continue;
      }

      // if omit default is off, then include default values for properties
      // that appear in the next frame but are not in the matching subject
      var next = frame[_prop][0];
      var omitDefaultOn = _getFrameFlag(next, options, 'omitDefault');
      if (!omitDefaultOn && !(_prop in output)) {
        var preserve = '@null';
        if ('@default' in next) {
          preserve = util.clone(next['@default']);
        }
        if (!types.isArray(preserve)) {
          preserve = [preserve];
        }
        output[_prop] = [{ '@preserve': preserve }];
      }
    }

    // add output to parent
    _addFrameOutput(parent, property, output);

    // pop matching subject from circular ref-checking stack
    state.subjectStack.pop();
  }
};

/**
 * Creates an implicit frame when recursing through subject matches. If
 * a frame doesn't have an explicit frame for a particular property, then
 * a wildcard child frame will be created that uses the same flags that the
 * parent frame used.
 *
 * @param flags the current framing flags.
 *
 * @return the implicit frame.
 */
function _createImplicitFrame(flags) {
  var frame = {};
  for (var key in flags) {
    if (flags[key] !== undefined) {
      frame['@' + key] = [flags[key]];
    }
  }
  return [frame];
}

/**
 * Checks the current subject stack to see if embedding the given subject
 * would cause a circular reference.
 *
 * @param subjectToEmbed the subject to embed.
 * @param subjectStack the current stack of subjects.
 *
 * @return true if a circular reference would be created, false if not.
 */
function _createsCircularReference(subjectToEmbed, subjectStack) {
  for (var i = subjectStack.length - 1; i >= 0; --i) {
    if (subjectStack[i]['@id'] === subjectToEmbed['@id']) {
      return true;
    }
  }
  return false;
}

/**
 * Gets the frame flag value for the given flag name.
 *
 * @param frame the frame.
 * @param options the framing options.
 * @param name the flag name.
 *
 * @return the flag value.
 */
function _getFrameFlag(frame, options, name) {
  var flag = '@' + name;
  var rval = flag in frame ? frame[flag][0] : options[name];
  if (name === 'embed') {
    // default is "@last"
    // backwards-compatibility support for "embed" maps:
    // true => "@last"
    // false => "@never"
    if (rval === true) {
      rval = '@last';
    } else if (rval === false) {
      rval = '@never';
    } else if (rval !== '@always' && rval !== '@never' && rval !== '@link') {
      rval = '@last';
    }
  }
  return rval;
}

/**
 * Validates a JSON-LD frame, throwing an exception if the frame is invalid.
 *
 * @param frame the frame to validate.
 */
function _validateFrame(frame) {
  if (!types.isArray(frame) || frame.length !== 1 || !types.isObject(frame[0])) {
    throw new JsonLdError('Invalid JSON-LD syntax; a JSON-LD frame must be a single object.', 'jsonld.SyntaxError', { frame: frame });
  }
}

/**
 * Returns a map of all of the subjects that match a parsed frame.
 *
 * @param state the current framing state.
 * @param subjects the set of subjects to filter.
 * @param frame the parsed frame.
 * @param flags the frame flags.
 *
 * @return all of the matched subjects.
 */
function _filterSubjects(state, subjects, frame, flags) {
  // filter subjects in @id order
  var rval = {};
  for (var i = 0; i < subjects.length; ++i) {
    var id = subjects[i];
    var subject = state.subjects[id];
    if (_filterSubject(subject, frame, flags)) {
      rval[id] = subject;
    }
  }
  return rval;
}

/**
 * Returns true if the given subject matches the given frame.
 *
 * @param subject the subject to check.
 * @param frame the frame to check.
 * @param flags the frame flags.
 *
 * @return true if the subject matches, false if not.
 */
function _filterSubject(subject, frame, flags) {
  // check @type (object value means 'any' type, fall through to ducktyping)
  if ('@type' in frame && !(frame['@type'].length === 1 && types.isObject(frame['@type'][0]))) {
    var nodeTypes = frame['@type'];
    for (var i = 0; i < nodeTypes.length; ++i) {
      // any matching @type is a match
      if (util.hasValue(subject, '@type', nodeTypes[i])) {
        return true;
      }
    }
    return false;
  }

  // check ducktype
  var wildcard = true;
  var matchesSome = false;
  for (var key in frame) {
    if (isKeyword(key)) {
      // skip non-@id and non-@type
      if (key !== '@id' && key !== '@type') {
        continue;
      }
      wildcard = false;

      // check @id for a specific @id value
      if (key === '@id' && types.isString(frame[key])) {
        if (subject[key] !== frame[key]) {
          return false;
        }
        matchesSome = true;
        continue;
      }
    }

    wildcard = false;

    if (key in subject) {
      // frame[key] === [] means do not match if property is present
      if (types.isArray(frame[key]) && frame[key].length === 0 && subject[key] !== undefined) {
        return false;
      }
      matchesSome = true;
      continue;
    }

    // all properties must match to be a duck unless a @default is specified
    var hasDefault = types.isArray(frame[key]) && types.isObject(frame[key][0]) && '@default' in frame[key][0];
    if (flags.requireAll && !hasDefault) {
      return false;
    }
  }

  // return true if wildcard or subject matches some properties
  return wildcard || matchesSome;
}

/**
 * Removes an existing embed.
 *
 * @param state the current framing state.
 * @param id the @id of the embed to remove.
 */
function _removeEmbed(state, id) {
  // get existing embed
  var embeds = state.uniqueEmbeds;
  var embed = embeds[id];
  var parent = embed.parent;
  var property = embed.property;

  // create reference to replace embed
  var subject = { '@id': id };

  // remove existing embed
  if (types.isArray(parent)) {
    // replace subject with reference
    for (var i = 0; i < parent.length; ++i) {
      if (util.compareValues(parent[i], subject)) {
        parent[i] = subject;
        break;
      }
    }
  } else {
    // replace subject with reference
    var useArray = types.isArray(parent[property]);
    util.removeValue(parent, property, subject, { propertyIsArray: useArray });
    util.addValue(parent, property, subject, { propertyIsArray: useArray });
  }

  // recursively remove dependent dangling embeds
  var removeDependents = function removeDependents(id) {
    // get embed keys as a separate array to enable deleting keys in map
    var ids = Object.keys(embeds);
    for (var _i2 = 0; _i2 < ids.length; ++_i2) {
      var next = ids[_i2];
      if (next in embeds && types.isObject(embeds[next].parent) && embeds[next].parent['@id'] === id) {
        delete embeds[next];
        removeDependents(next);
      }
    }
  };
  removeDependents(id);
}

/**
 * Adds framing output to the given parent.
 *
 * @param parent the parent to add to.
 * @param property the parent property.
 * @param output the output to add.
 */
function _addFrameOutput(parent, property, output) {
  if (types.isObject(parent)) {
    util.addValue(parent, property, output, { propertyIsArray: true });
  } else {
    parent.push(output);
  }
}

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */


function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var graphTypes = __webpack_require__(5);
var types = __webpack_require__(3);
var util = __webpack_require__(2);

// constants

var _require = __webpack_require__(24),
    RDF = _require.RDF,
    RDF_LIST = _require.RDF_LIST,
    RDF_FIRST = _require.RDF_FIRST,
    RDF_REST = _require.RDF_REST,
    RDF_NIL = _require.RDF_NIL,
    RDF_TYPE = _require.RDF_TYPE,
    RDF_PLAIN_LITERAL = _require.RDF_PLAIN_LITERAL,
    RDF_XML_LITERAL = _require.RDF_XML_LITERAL,
    RDF_OBJECT = _require.RDF_OBJECT,
    RDF_LANGSTRING = _require.RDF_LANGSTRING,
    XSD = _require.XSD,
    XSD_BOOLEAN = _require.XSD_BOOLEAN,
    XSD_DOUBLE = _require.XSD_DOUBLE,
    XSD_INTEGER = _require.XSD_INTEGER,
    XSD_STRING = _require.XSD_STRING;

var api = {};
module.exports = api;

/**
 * Converts an RDF dataset to JSON-LD.
 *
 * @param dataset the RDF dataset.
 * @param options the RDF serialization options.
 *
 * @return a Promise that resolves to the JSON-LD output.
 */
api.fromRDF = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dataset, _ref) {
    var _ref$useRdfType = _ref.useRdfType,
        useRdfType = _ref$useRdfType === undefined ? false : _ref$useRdfType,
        _ref$useNativeTypes = _ref.useNativeTypes,
        useNativeTypes = _ref$useNativeTypes === undefined ? false : _ref$useNativeTypes;

    var defaultGraph, graphMap, referencedOnce, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, quad, name, nodeMap, s, p, o, node, objectIsNode, value, object, graphObject, nil, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, usage, property, head, list, listNodes, nodeKeyCount, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, listNode, result, subjects, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, subject, _node, graph, _graphObject, graphSubjects, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, graphSubject, _node2;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            defaultGraph = {};
            graphMap = { '@default': defaultGraph };
            referencedOnce = {};
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 6;
            _iterator = dataset[Symbol.iterator]();

          case 8:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 30;
              break;
            }

            quad = _step.value;

            // TODO: change 'name' to 'graph'
            name = quad.graph.termType === 'DefaultGraph' ? '@default' : quad.graph.value;

            if (!(name in graphMap)) {
              graphMap[name] = {};
            }
            if (name !== '@default' && !(name in defaultGraph)) {
              defaultGraph[name] = { '@id': name };
            }

            nodeMap = graphMap[name];

            // get subject, predicate, object

            s = quad.subject.value;
            p = quad.predicate.value;
            o = quad.object;


            if (!(s in nodeMap)) {
              nodeMap[s] = { '@id': s };
            }
            node = nodeMap[s];
            objectIsNode = o.termType.endsWith('Node');

            if (objectIsNode && !(o.value in nodeMap)) {
              nodeMap[o.value] = { '@id': o.value };
            }

            if (!(p === RDF_TYPE && !useRdfType && objectIsNode)) {
              _context.next = 24;
              break;
            }

            util.addValue(node, '@type', o.value, { propertyIsArray: true });
            return _context.abrupt('continue', 27);

          case 24:
            value = _RDFToObject(o, useNativeTypes);

            util.addValue(node, p, value, { propertyIsArray: true });

            // object may be an RDF list/partial list node but we can't know easily
            // until all triples are read
            if (objectIsNode) {
              if (o.value === RDF_NIL) {
                // track rdf:nil uniquely per graph
                object = nodeMap[o.value];

                if (!('usages' in object)) {
                  object.usages = [];
                }
                object.usages.push({
                  node: node,
                  property: p,
                  value: value
                });
              } else if (o.value in referencedOnce) {
                // object referenced more than once
                referencedOnce[o.value] = false;
              } else {
                // keep track of single reference
                referencedOnce[o.value] = {
                  node: node,
                  property: p,
                  value: value
                };
              }
            }

          case 27:
            _iteratorNormalCompletion = true;
            _context.next = 8;
            break;

          case 30:
            _context.next = 36;
            break;

          case 32:
            _context.prev = 32;
            _context.t0 = _context['catch'](6);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 36:
            _context.prev = 36;
            _context.prev = 37;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 39:
            _context.prev = 39;

            if (!_didIteratorError) {
              _context.next = 42;
              break;
            }

            throw _iteratorError;

          case 42:
            return _context.finish(39);

          case 43:
            return _context.finish(36);

          case 44:
            _context.t1 = regeneratorRuntime.keys(graphMap);

          case 45:
            if ((_context.t2 = _context.t1()).done) {
              _context.next = 125;
              break;
            }

            name = _context.t2.value;
            graphObject = graphMap[name];

            // no @lists to be converted, continue

            if (RDF_NIL in graphObject) {
              _context.next = 50;
              break;
            }

            return _context.abrupt('continue', 45);

          case 50:

            // iterate backwards through each RDF list
            nil = graphObject[RDF_NIL];

            if (nil.usages) {
              _context.next = 53;
              break;
            }

            return _context.abrupt('continue', 45);

          case 53:
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context.prev = 56;
            _iterator2 = nil.usages[Symbol.iterator]();

          case 58:
            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
              _context.next = 108;
              break;
            }

            usage = _step2.value;
            node = usage.node;
            property = usage.property;
            head = usage.value;
            list = [];
            listNodes = [];

            // ensure node is a well-formed list node; it must:
            // 1. Be referenced only once.
            // 2. Have an array for rdf:first that has 1 item.
            // 3. Have an array for rdf:rest that has 1 item.
            // 4. Have no keys other than: @id, rdf:first, rdf:rest, and,
            //   optionally, @type where the value is rdf:List.

            nodeKeyCount = Object.keys(node).length;

          case 66:
            if (!(property === RDF_REST && types.isObject(referencedOnce[node['@id']]) && types.isArray(node[RDF_FIRST]) && node[RDF_FIRST].length === 1 && types.isArray(node[RDF_REST]) && node[RDF_REST].length === 1 && (nodeKeyCount === 3 || nodeKeyCount === 4 && types.isArray(node['@type']) && node['@type'].length === 1 && node['@type'][0] === RDF_LIST))) {
              _context.next = 78;
              break;
            }

            list.push(node[RDF_FIRST][0]);
            listNodes.push(node['@id']);

            // get next node, moving backwards through list
            usage = referencedOnce[node['@id']];
            node = usage.node;
            property = usage.property;
            head = usage.value;
            nodeKeyCount = Object.keys(node).length;

            // if node is not a blank node, then list head found

            if (graphTypes.isBlankNode(node)) {
              _context.next = 76;
              break;
            }

            return _context.abrupt('break', 78);

          case 76:
            _context.next = 66;
            break;

          case 78:
            if (!(property === RDF_FIRST)) {
              _context.next = 84;
              break;
            }

            if (!(node['@id'] === RDF_NIL)) {
              _context.next = 81;
              break;
            }

            return _context.abrupt('continue', 105);

          case 81:

            // preserve list head
            head = graphObject[head['@id']][RDF_REST][0];
            list.pop();
            listNodes.pop();

          case 84:

            // transform list into @list object
            delete head['@id'];
            head['@list'] = list.reverse();
            _iteratorNormalCompletion3 = true;
            _didIteratorError3 = false;
            _iteratorError3 = undefined;
            _context.prev = 89;
            for (_iterator3 = listNodes[Symbol.iterator](); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              listNode = _step3.value;

              delete graphObject[listNode];
            }
            _context.next = 97;
            break;

          case 93:
            _context.prev = 93;
            _context.t3 = _context['catch'](89);
            _didIteratorError3 = true;
            _iteratorError3 = _context.t3;

          case 97:
            _context.prev = 97;
            _context.prev = 98;

            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }

          case 100:
            _context.prev = 100;

            if (!_didIteratorError3) {
              _context.next = 103;
              break;
            }

            throw _iteratorError3;

          case 103:
            return _context.finish(100);

          case 104:
            return _context.finish(97);

          case 105:
            _iteratorNormalCompletion2 = true;
            _context.next = 58;
            break;

          case 108:
            _context.next = 114;
            break;

          case 110:
            _context.prev = 110;
            _context.t4 = _context['catch'](56);
            _didIteratorError2 = true;
            _iteratorError2 = _context.t4;

          case 114:
            _context.prev = 114;
            _context.prev = 115;

            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }

          case 117:
            _context.prev = 117;

            if (!_didIteratorError2) {
              _context.next = 120;
              break;
            }

            throw _iteratorError2;

          case 120:
            return _context.finish(117);

          case 121:
            return _context.finish(114);

          case 122:

            delete nil.usages;
            _context.next = 45;
            break;

          case 125:
            result = [];
            subjects = Object.keys(defaultGraph).sort();
            _iteratorNormalCompletion4 = true;
            _didIteratorError4 = false;
            _iteratorError4 = undefined;
            _context.prev = 130;
            _iterator4 = subjects[Symbol.iterator]();

          case 132:
            if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
              _context.next = 162;
              break;
            }

            subject = _step4.value;
            _node = defaultGraph[subject];

            if (!(subject in graphMap)) {
              _context.next = 158;
              break;
            }

            graph = _node['@graph'] = [];
            _graphObject = graphMap[subject];
            graphSubjects = Object.keys(_graphObject).sort();
            _iteratorNormalCompletion5 = true;
            _didIteratorError5 = false;
            _iteratorError5 = undefined;
            _context.prev = 142;

            for (_iterator5 = graphSubjects[Symbol.iterator](); !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
              graphSubject = _step5.value;
              _node2 = _graphObject[graphSubject];
              // only add full subjects to top-level

              if (!graphTypes.isSubjectReference(_node2)) {
                graph.push(_node2);
              }
            }
            _context.next = 150;
            break;

          case 146:
            _context.prev = 146;
            _context.t5 = _context['catch'](142);
            _didIteratorError5 = true;
            _iteratorError5 = _context.t5;

          case 150:
            _context.prev = 150;
            _context.prev = 151;

            if (!_iteratorNormalCompletion5 && _iterator5.return) {
              _iterator5.return();
            }

          case 153:
            _context.prev = 153;

            if (!_didIteratorError5) {
              _context.next = 156;
              break;
            }

            throw _iteratorError5;

          case 156:
            return _context.finish(153);

          case 157:
            return _context.finish(150);

          case 158:
            // only add full subjects to top-level
            if (!graphTypes.isSubjectReference(_node)) {
              result.push(_node);
            }

          case 159:
            _iteratorNormalCompletion4 = true;
            _context.next = 132;
            break;

          case 162:
            _context.next = 168;
            break;

          case 164:
            _context.prev = 164;
            _context.t6 = _context['catch'](130);
            _didIteratorError4 = true;
            _iteratorError4 = _context.t6;

          case 168:
            _context.prev = 168;
            _context.prev = 169;

            if (!_iteratorNormalCompletion4 && _iterator4.return) {
              _iterator4.return();
            }

          case 171:
            _context.prev = 171;

            if (!_didIteratorError4) {
              _context.next = 174;
              break;
            }

            throw _iteratorError4;

          case 174:
            return _context.finish(171);

          case 175:
            return _context.finish(168);

          case 176:
            return _context.abrupt('return', result);

          case 177:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[6, 32, 36, 44], [37,, 39, 43], [56, 110, 114, 122], [89, 93, 97, 105], [98,, 100, 104], [115,, 117, 121], [130, 164, 168, 176], [142, 146, 150, 158], [151,, 153, 157], [169,, 171, 175]]);
  }));

  return function (_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * Converts an RDF triple object to a JSON-LD object.
 *
 * @param o the RDF triple object to convert.
 * @param useNativeTypes true to output native types, false not to.
 *
 * @return the JSON-LD object.
 */
function _RDFToObject(o, useNativeTypes) {
  // convert NamedNode/BlankNode object to JSON-LD
  if (o.termType.endsWith('Node')) {
    return { '@id': o.value };
  }

  // convert literal to JSON-LD
  var rval = { '@value': o.value };

  // add language
  if (o.language) {
    rval['@language'] = o.language;
  } else {
    var type = o.datatype.value;
    if (!type) {
      type = XSD_STRING;
    }
    // use native types for certain xsd types
    if (useNativeTypes) {
      if (type === XSD_BOOLEAN) {
        if (rval['@value'] === 'true') {
          rval['@value'] = true;
        } else if (rval['@value'] === 'false') {
          rval['@value'] = false;
        }
      } else if (types.isNumeric(rval['@value'])) {
        if (type === XSD_INTEGER) {
          var i = parseInt(rval['@value'], 10);
          if (i.toFixed(0) === rval['@value']) {
            rval['@value'] = i;
          }
        } else if (type === XSD_DOUBLE) {
          rval['@value'] = parseFloat(rval['@value']);
        }
      }
      // do not add native type
      if (![XSD_BOOLEAN, XSD_INTEGER, XSD_DOUBLE, XSD_STRING].includes(type)) {
        rval['@type'] = type;
      }
    } else if (type !== XSD_STRING) {
      rval['@type'] = type;
    }
  }

  return rval;
}

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */


var _require = __webpack_require__(32),
    createNodeMap = _require.createNodeMap;

var _require2 = __webpack_require__(15),
    isKeyword = _require2.isKeyword;

var graphTypes = __webpack_require__(5);
var types = __webpack_require__(3);
var util = __webpack_require__(2);

var _require3 = __webpack_require__(24),
    RDF = _require3.RDF,
    RDF_LIST = _require3.RDF_LIST,
    RDF_FIRST = _require3.RDF_FIRST,
    RDF_REST = _require3.RDF_REST,
    RDF_NIL = _require3.RDF_NIL,
    RDF_TYPE = _require3.RDF_TYPE,
    RDF_PLAIN_LITERAL = _require3.RDF_PLAIN_LITERAL,
    RDF_XML_LITERAL = _require3.RDF_XML_LITERAL,
    RDF_OBJECT = _require3.RDF_OBJECT,
    RDF_LANGSTRING = _require3.RDF_LANGSTRING,
    XSD = _require3.XSD,
    XSD_BOOLEAN = _require3.XSD_BOOLEAN,
    XSD_DOUBLE = _require3.XSD_DOUBLE,
    XSD_INTEGER = _require3.XSD_INTEGER,
    XSD_STRING = _require3.XSD_STRING;

var _require4 = __webpack_require__(25),
    _isAbsoluteIri = _require4.isAbsolute;

var api = {};
module.exports = api;

/**
 * Outputs an RDF dataset for the expanded JSON-LD input.
 *
 * @param input the expanded JSON-LD input.
 * @param options the RDF serialization options.
 *
 * @return the RDF dataset.
 */
api.toRDF = function (input, options) {
  // create node map for default graph (and any named graphs)
  var issuer = new util.IdentifierIssuer('_:b');
  var nodeMap = { '@default': {} };
  createNodeMap(input, nodeMap, '@default', issuer);

  var dataset = [];
  var graphNames = Object.keys(nodeMap).sort();
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = graphNames[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var graphName = _step.value;

      var graphTerm = void 0;
      if (graphName === '@default') {
        graphTerm = { termType: 'DefaultGraph', value: '' };
      } else if (_isAbsoluteIri(graphName)) {
        if (graphName.startsWith('_:')) {
          graphTerm = { termType: 'BlankNode' };
        } else {
          graphTerm = { termType: 'NamedNode' };
        }
        graphTerm.value = graphName;
      } else {
        // skip relative IRIs (not valid RDF)
        continue;
      }
      _graphToRDF(dataset, nodeMap[graphName], graphTerm, issuer, options);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return dataset;
};

/**
 * Adds RDF quads for a particular graph to the given dataset.
 *
 * @param dataset the dataset to append RDF quads to.
 * @param graph the graph to create RDF quads for.
 * @param graphTerm the graph term for each quad.
 * @param issuer a IdentifierIssuer for assigning blank node names.
 * @param options the RDF serialization options.
 *
 * @return the array of RDF triples for the given graph.
 */
function _graphToRDF(dataset, graph, graphTerm, issuer, options) {
  var ids = Object.keys(graph).sort();
  for (var i = 0; i < ids.length; ++i) {
    var id = ids[i];
    var node = graph[id];
    var properties = Object.keys(node).sort();
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = properties[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var property = _step2.value;

        var items = node[property];
        if (property === '@type') {
          property = RDF_TYPE;
        } else if (isKeyword(property)) {
          continue;
        }

        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = items[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var item = _step3.value;

            // RDF subject
            var subject = {
              termType: id.startsWith('_:') ? 'BlankNode' : 'NamedNode',
              value: id
            };

            // skip relative IRI subjects (not valid RDF)
            if (!_isAbsoluteIri(id)) {
              continue;
            }

            // RDF predicate
            var predicate = {
              termType: property.startsWith('_:') ? 'BlankNode' : 'NamedNode',
              value: property
            };

            // skip relative IRI predicates (not valid RDF)
            if (!_isAbsoluteIri(property)) {
              continue;
            }

            // skip blank node predicates unless producing generalized RDF
            if (predicate.termType === 'BlankNode' && !options.produceGeneralizedRdf) {
              continue;
            }

            // convert @list to triples
            if (graphTypes.isList(item)) {
              _listToRDF(item['@list'], issuer, subject, predicate, dataset, graphTerm);
            } else {
              // convert value or node object to triple
              var object = _objectToRDF(item);
              // skip null objects (they are relative IRIs)
              if (object) {
                dataset.push({
                  subject: subject,
                  predicate: predicate,
                  object: object,
                  graph: graphTerm
                });
              }
            }
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  }
}

/**
 * Converts a @list value into linked list of blank node RDF quads
 * (an RDF collection).
 *
 * @param list the @list value.
 * @param issuer a IdentifierIssuer for assigning blank node names.
 * @param subject the subject for the head of the list.
 * @param predicate the predicate for the head of the list.
 * @param dataset the array of quads to append to.
 * @param graphTerm the graph term for each quad.
 */
function _listToRDF(list, issuer, subject, predicate, dataset, graphTerm) {
  var first = { termType: 'NamedNode', value: RDF_FIRST };
  var rest = { termType: 'NamedNode', value: RDF_REST };
  var nil = { termType: 'NamedNode', value: RDF_NIL };

  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = list[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var item = _step4.value;

      var blankNode = { termType: 'BlankNode', value: issuer.getId() };
      dataset.push({
        subject: subject,
        predicate: predicate,
        object: blankNode,
        graph: graphTerm
      });

      subject = blankNode;
      predicate = first;
      var object = _objectToRDF(item);

      // skip null objects (they are relative IRIs)
      if (object) {
        dataset.push({
          subject: subject,
          predicate: predicate,
          object: object,
          graph: graphTerm
        });
      }

      predicate = rest;
    }
  } catch (err) {
    _didIteratorError4 = true;
    _iteratorError4 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion4 && _iterator4.return) {
        _iterator4.return();
      }
    } finally {
      if (_didIteratorError4) {
        throw _iteratorError4;
      }
    }
  }

  dataset.push({
    subject: subject,
    predicate: predicate,
    object: nil,
    graph: graphTerm
  });
}

/**
 * Converts a JSON-LD value object to an RDF literal or a JSON-LD string or
 * node object to an RDF resource.
 *
 * @param item the JSON-LD value or node object.
 *
 * @return the RDF literal or RDF resource.
 */
function _objectToRDF(item) {
  var object = {};

  // convert value object to RDF
  if (graphTypes.isValue(item)) {
    object.termType = 'Literal';
    object.value = undefined;
    object.datatype = {
      termType: 'NamedNode'
    };
    var value = item['@value'];
    var datatype = item['@type'] || null;

    // convert to XSD datatypes as appropriate
    if (types.isBoolean(value)) {
      object.value = value.toString();
      object.datatype.value = datatype || XSD_BOOLEAN;
    } else if (types.isDouble(value) || datatype === XSD_DOUBLE) {
      if (!types.isDouble(value)) {
        value = parseFloat(value);
      }
      // canonical double representation
      object.value = value.toExponential(15).replace(/(\d)0*e\+?/, '$1E');
      object.datatype.value = datatype || XSD_DOUBLE;
    } else if (types.isNumber(value)) {
      object.value = value.toFixed(0);
      object.datatype.value = datatype || XSD_INTEGER;
    } else if ('@language' in item) {
      object.value = value;
      object.datatype.value = datatype || RDF_LANGSTRING;
      object.language = item['@language'];
    } else {
      object.value = value;
      object.datatype.value = datatype || XSD_STRING;
    }
  } else {
    // convert string/node object to RDF
    var id = types.isObject(item) ? item['@id'] : item;
    object.termType = id.startsWith('_:') ? 'BlankNode' : 'NamedNode';
    object.value = id;
  }

  // skip relative IRIs, not valid RDF
  if (object.termType === 'NamedNode' && !_isAbsoluteIri(object.value)) {
    return null;
  }

  return object;
}

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */


function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var JsonLdError = __webpack_require__(6);

var _require = __webpack_require__(3),
    _isArray = _require.isArray,
    _isObject = _require.isObject,
    _isString = _require.isString;

var _require2 = __webpack_require__(5),
    _isList = _require2.isList,
    _isValue = _require2.isValue,
    _isSimpleGraph = _require2.isSimpleGraph,
    _isSubjectReference = _require2.isSubjectReference;

var _require3 = __webpack_require__(15),
    _expandIri = _require3.expandIri,
    _getContextValue = _require3.getContextValue,
    _isKeyword = _require3.isKeyword;

var _require4 = __webpack_require__(25),
    _removeBase = _require4.removeBase;

var _require5 = __webpack_require__(2),
    _addValue = _require5.addValue,
    _compareShortestLeast = _require5.compareShortestLeast;

var api = {};
module.exports = api;

/**
 * Recursively compacts an element using the given active context. All values
 * must be in expanded form before this method is called.
 *
 * @param activeCtx the active context to use.
 * @param activeProperty the compacted property associated with the element
 *          to compact, null for none.
 * @param element the element to compact.
 * @param options the compaction options.
 * @param compactionMap the compaction map to use.
 *
 * @return the compacted value.
 */
api.compact = function (_ref) {
  var activeCtx = _ref.activeCtx,
      _ref$activeProperty = _ref.activeProperty,
      activeProperty = _ref$activeProperty === undefined ? null : _ref$activeProperty,
      element = _ref.element,
      _ref$options = _ref.options,
      options = _ref$options === undefined ? {} : _ref$options,
      _ref$compactionMap = _ref.compactionMap,
      compactionMap = _ref$compactionMap === undefined ? function () {
    return undefined;
  } : _ref$compactionMap;

  // recursively compact array
  if (_isArray(element)) {
    var rval = [];
    for (var i = 0; i < element.length; ++i) {
      // compact, dropping any null values unless custom mapped
      var compacted = api.compact({
        activeCtx: activeCtx,
        activeProperty: activeProperty,
        element: element[i],
        options: options,
        compactionMap: compactionMap
      });
      if (compacted === null) {
        // TODO: use `await` to support async
        compacted = compactionMap({
          unmappedValue: element[i],
          activeCtx: activeCtx,
          activeProperty: activeProperty,
          parent: element,
          index: i,
          options: options
        });
        if (compacted === undefined) {
          continue;
        }
      }
      rval.push(compacted);
    }
    if (options.compactArrays && rval.length === 1) {
      // use single element if no container is specified
      var container = _getContextValue(activeCtx, activeProperty, '@container') || [];
      if (container.length === 0) {
        rval = rval[0];
      }
    }
    return rval;
  }

  // recursively compact object
  if (_isObject(element)) {
    if (options.link && '@id' in element && element['@id'] in options.link) {
      // check for a linked element to reuse
      var linked = options.link[element['@id']];
      for (var _i = 0; _i < linked.length; ++_i) {
        if (linked[_i].expanded === element) {
          return linked[_i].compacted;
        }
      }
    }

    // do value compaction on @values and subject references
    if (_isValue(element) || _isSubjectReference(element)) {
      var _rval2 = api.compactValue({ activeCtx: activeCtx, activeProperty: activeProperty, value: element });
      if (options.link && _isSubjectReference(element)) {
        // store linked element
        if (!(element['@id'] in options.link)) {
          options.link[element['@id']] = [];
        }
        options.link[element['@id']].push({ expanded: element, compacted: _rval2 });
      }
      return _rval2;
    }

    // FIXME: avoid misuse of active property as an expanded property?
    var insideReverse = activeProperty === '@reverse';

    var _rval = {};

    if (options.link && '@id' in element) {
      // store linked element
      if (!(element['@id'] in options.link)) {
        options.link[element['@id']] = [];
      }
      options.link[element['@id']].push({ expanded: element, compacted: _rval });
    }

    // process element keys in order
    var keys = Object.keys(element).sort();
    for (var ki = 0; ki < keys.length; ++ki) {
      var expandedProperty = keys[ki];
      var expandedValue = element[expandedProperty];

      // compact @id and @type(s)
      if (expandedProperty === '@id' || expandedProperty === '@type') {
        var compactedValue = void 0;

        // compact single @id
        if (_isString(expandedValue)) {
          compactedValue = api.compactIri({
            activeCtx: activeCtx,
            iri: expandedValue,
            relativeTo: { vocab: expandedProperty === '@type' }
          });
        } else {
          // expanded value must be a @type array
          compactedValue = [];
          for (var vi = 0; vi < expandedValue.length; ++vi) {
            compactedValue.push(api.compactIri({ activeCtx: activeCtx, iri: expandedValue[vi], relativeTo: { vocab: true } }));
          }
        }

        // use keyword alias and add value
        var alias = api.compactIri({ activeCtx: activeCtx, iri: expandedProperty, relativeTo: { vocab: true } });
        var isArray = _isArray(compactedValue) && expandedValue.length === 0;
        _addValue(_rval, alias, compactedValue, { propertyIsArray: isArray });
        continue;
      }

      // handle @reverse
      if (expandedProperty === '@reverse') {
        // recursively compact expanded value
        var _compactedValue = api.compact({
          activeCtx: activeCtx,
          activeProperty: '@reverse',
          element: expandedValue,
          options: options,
          compactionMap: compactionMap
        });

        // handle double-reversed properties
        for (var compactedProperty in _compactedValue) {
          if (activeCtx.mappings[compactedProperty] && activeCtx.mappings[compactedProperty].reverse) {
            var value = _compactedValue[compactedProperty];
            var _container = _getContextValue(activeCtx, compactedProperty, '@container') || [];
            var useArray = _container.includes('@set') || !options.compactArrays;
            _addValue(_rval, compactedProperty, value, { propertyIsArray: useArray });
            delete _compactedValue[compactedProperty];
          }
        }

        if (Object.keys(_compactedValue).length > 0) {
          // use keyword alias and add value
          var _alias = api.compactIri({ activeCtx: activeCtx, iri: expandedProperty, relativeTo: { vocab: true } });
          _addValue(_rval, _alias, _compactedValue);
        }

        continue;
      }

      // handle @index property
      if (expandedProperty === '@index') {
        // drop @index if inside an @index container
        var _container2 = _getContextValue(activeCtx, activeProperty, '@container') || [];
        if (_container2.includes('@index')) {
          continue;
        }

        // use keyword alias and add value
        var _alias2 = api.compactIri({ activeCtx: activeCtx, iri: expandedProperty, relativeTo: { vocab: true } });
        _addValue(_rval, _alias2, expandedValue);
        continue;
      }

      // skip array processing for keywords that aren't @graph or @list
      if (expandedProperty !== '@graph' && expandedProperty !== '@list' && _isKeyword(expandedProperty)) {
        // use keyword alias and add value as is
        var _alias3 = api.compactIri({ activeCtx: activeCtx, iri: expandedProperty, relativeTo: { vocab: true } });
        _addValue(_rval, _alias3, expandedValue);
        continue;
      }

      // Note: expanded value must be an array due to expansion algorithm.
      if (!_isArray(expandedValue)) {
        throw new JsonLdError('JSON-LD expansion error; expanded value must be an array.', 'jsonld.SyntaxError');
      }

      // preserve empty arrays
      if (expandedValue.length === 0) {
        var itemActiveProperty = api.compactIri({
          activeCtx: activeCtx,
          iri: expandedProperty,
          value: expandedValue,
          relativeTo: { vocab: true },
          reverse: insideReverse
        });
        _addValue(_rval, itemActiveProperty, expandedValue, { propertyIsArray: true });
      }

      // recusively process array values
      for (var _vi = 0; _vi < expandedValue.length; ++_vi) {
        var expandedItem = expandedValue[_vi];

        // compact property and get container type
        var _itemActiveProperty = api.compactIri({
          activeCtx: activeCtx,
          iri: expandedProperty,
          value: expandedItem,
          relativeTo: { vocab: true },
          reverse: insideReverse
        });
        var _container3 = _getContextValue(activeCtx, _itemActiveProperty, '@container') || [];

        // get simple @graph or @list value if appropriate
        var isSimpleGraph = _isSimpleGraph(expandedItem);
        var isList = _isList(expandedItem);
        var inner = void 0;
        if (isList) {
          inner = expandedItem['@list'];
        } else if (isSimpleGraph) {
          inner = expandedItem['@graph'];
        }

        // recursively compact expanded item
        var compactedItem = api.compact({
          activeCtx: activeCtx,
          activeProperty: _itemActiveProperty,
          element: isList || isSimpleGraph ? inner : expandedItem,
          options: options,
          compactionMap: compactionMap
        });

        // handle @list
        if (isList) {
          // ensure @list value is an array
          if (!_isArray(compactedItem)) {
            compactedItem = [compactedItem];
          }

          if (!_container3.includes('@list')) {
            // wrap using @list alias
            compactedItem = _defineProperty({}, api.compactIri({ activeCtx: activeCtx, iri: '@list', relativeTo: { vocab: true } }), compactedItem);

            // include @index from expanded @list, if any
            if ('@index' in expandedItem) {
              compactedItem[api.compactIri({ activeCtx: activeCtx, iri: '@index', relativeTo: { vocab: true } })] = expandedItem['@index'];
            }
          } else if (_itemActiveProperty in _rval) {
            // can't use @list container for more than 1 list
            throw new JsonLdError('JSON-LD compact error; property has a "@list" @container ' + 'rule but there is more than a single @list that matches ' + 'the compacted term in the document. Compaction might mix ' + 'unwanted items into the list.', 'jsonld.SyntaxError', { code: 'compaction to list of lists' });
          }
        }

        // handle simple @graph
        if (isSimpleGraph && !_container3.includes('@graph')) {
          // wrap using @graph alias
          compactedItem = _defineProperty({}, api.compactIri({ activeCtx: activeCtx, iri: '@graph', relativeTo: { vocab: true } }), compactedItem);

          // include @index from expanded @graph, if any
          if ('@index' in expandedItem) {
            compactedItem[api.compactIri({ activeCtx: activeCtx, iri: '@index', relativeTo: { vocab: true } })] = expandedItem['@index'];
          }
        }

        // handle language and index maps
        if (_container3.includes('@language') || _container3.includes('@index')) {
          // get or create the map object
          var mapObject = void 0;
          if (_itemActiveProperty in _rval) {
            mapObject = _rval[_itemActiveProperty];
          } else {
            _rval[_itemActiveProperty] = mapObject = {};
          }

          // if container is a language map, simplify compacted value to
          // a simple string
          if (_container3.includes('@language') && _isValue(compactedItem)) {
            compactedItem = compactedItem['@value'];
          }

          // add compact value to map object using key from expanded value
          // based on the container type
          var c = _container3.includes('@language') ? '@language' : '@index';
          _addValue(mapObject, expandedItem[c], compactedItem);
        } else {
          // use an array if: compactArrays flag is false,
          // @container is @set or @list , value is an empty
          // array, or key is @graph
          var _isArray2 = !options.compactArrays || _container3.includes('@set') || _container3.includes('@list') || _isArray(compactedItem) && compactedItem.length === 0 || expandedProperty === '@list' || expandedProperty === '@graph';

          // add compact value
          _addValue(_rval, _itemActiveProperty, compactedItem, { propertyIsArray: _isArray2 });
        }
      }
    }

    return _rval;
  }

  // only primitives remain which are already compact
  return element;
};

/**
 * Compacts an IRI or keyword into a term or prefix if it can be. If the
 * IRI has an associated value it may be passed.
 *
 * @param activeCtx the active context to use.
 * @param iri the IRI to compact.
 * @param value the value to check or null.
 * @param relativeTo options for how to compact IRIs:
 *          vocab: true to split after @vocab, false not to.
 * @param reverse true if a reverse property is being compacted, false if not.
 *
 * @return the compacted term, prefix, keyword alias, or the original IRI.
 */
api.compactIri = function (_ref2) {
  var activeCtx = _ref2.activeCtx,
      iri = _ref2.iri,
      _ref2$value = _ref2.value,
      value = _ref2$value === undefined ? null : _ref2$value,
      _ref2$relativeTo = _ref2.relativeTo,
      relativeTo = _ref2$relativeTo === undefined ? { vocab: false } : _ref2$relativeTo,
      _ref2$reverse = _ref2.reverse,
      reverse = _ref2$reverse === undefined ? false : _ref2$reverse;

  // can't compact null
  if (iri === null) {
    return iri;
  }

  var inverseCtx = activeCtx.getInverse();

  // if term is a keyword, it may be compacted to a simple alias
  if (_isKeyword(iri) && iri in inverseCtx && '@none' in inverseCtx[iri] && '@type' in inverseCtx[iri]['@none'] && '@none' in inverseCtx[iri]['@none']['@type']) {
    return inverseCtx[iri]['@none']['@type']['@none'];
  }

  // use inverse context to pick a term if iri is relative to vocab
  if (relativeTo.vocab && iri in inverseCtx) {
    var defaultLanguage = activeCtx['@language'] || '@none';

    // prefer @index if available in value
    var containers = [];
    if (_isObject(value) && '@index' in value) {
      containers.push('@index');
    }

    // prefer `['@graph', '@set']` and then `@graph` if value is a simple graph
    // TODO: support `@graphId`?
    if (_isSimpleGraph(value)) {
      containers.push('@graph@set');
      containers.push('@graph');
    }

    // defaults for term selection based on type/language
    var typeOrLanguage = '@language';
    var typeOrLanguageValue = '@null';

    if (reverse) {
      typeOrLanguage = '@type';
      typeOrLanguageValue = '@reverse';
      containers.push('@set');
    } else if (_isList(value)) {
      // choose the most specific term that works for all elements in @list
      // only select @list containers if @index is NOT in value
      if (!('@index' in value)) {
        containers.push('@list');
      }
      var list = value['@list'];
      if (list.length === 0) {
        // any empty list can be matched against any term that uses the
        // @list container regardless of @type or @language
        typeOrLanguage = '@any';
        typeOrLanguageValue = '@none';
      } else {
        var commonLanguage = list.length === 0 ? defaultLanguage : null;
        var commonType = null;
        for (var i = 0; i < list.length; ++i) {
          var item = list[i];
          var itemLanguage = '@none';
          var itemType = '@none';
          if (_isValue(item)) {
            if ('@language' in item) {
              itemLanguage = item['@language'];
            } else if ('@type' in item) {
              itemType = item['@type'];
            } else {
              // plain literal
              itemLanguage = '@null';
            }
          } else {
            itemType = '@id';
          }
          if (commonLanguage === null) {
            commonLanguage = itemLanguage;
          } else if (itemLanguage !== commonLanguage && _isValue(item)) {
            commonLanguage = '@none';
          }
          if (commonType === null) {
            commonType = itemType;
          } else if (itemType !== commonType) {
            commonType = '@none';
          }
          // there are different languages and types in the list, so choose
          // the most generic term, no need to keep iterating the list
          if (commonLanguage === '@none' && commonType === '@none') {
            break;
          }
        }
        commonLanguage = commonLanguage || '@none';
        commonType = commonType || '@none';
        if (commonType !== '@none') {
          typeOrLanguage = '@type';
          typeOrLanguageValue = commonType;
        } else {
          typeOrLanguageValue = commonLanguage;
        }
      }
    } else {
      if (_isValue(value)) {
        if ('@language' in value && !('@index' in value)) {
          containers.push('@language');
          typeOrLanguageValue = value['@language'];
        } else if ('@type' in value) {
          typeOrLanguage = '@type';
          typeOrLanguageValue = value['@type'];
        }
      } else {
        typeOrLanguage = '@type';
        typeOrLanguageValue = '@id';
      }
      containers.push('@set');
    }

    // do term selection
    containers.push('@none');
    var term = _selectTerm(activeCtx, iri, value, containers, typeOrLanguage, typeOrLanguageValue);
    if (term !== null) {
      return term;
    }
  }

  // no term match, use @vocab if available
  if (relativeTo.vocab) {
    if ('@vocab' in activeCtx) {
      // determine if vocab is a prefix of the iri
      var vocab = activeCtx['@vocab'];
      if (iri.indexOf(vocab) === 0 && iri !== vocab) {
        // use suffix as relative iri if it is not a term in the active context
        var suffix = iri.substr(vocab.length);
        if (!(suffix in activeCtx.mappings)) {
          return suffix;
        }
      }
    }
  }

  // no term or @vocab match, check for possible CURIEs
  var choice = null;
  // TODO: make FastCurieMap a class with a method to do this lookup
  var partialMatches = [];
  var iriMap = activeCtx.fastCurieMap;
  // check for partial matches of against `iri`, which means look until
  // iri.length - 1, not full length
  var maxPartialLength = iri.length - 1;
  for (var _i2 = 0; _i2 < maxPartialLength && iri[_i2] in iriMap; ++_i2) {
    iriMap = iriMap[iri[_i2]];
    if ('' in iriMap) {
      partialMatches.push(iriMap[''][0]);
    }
  }
  // check partial matches in reverse order to prefer longest ones first
  for (var _i3 = partialMatches.length - 1; _i3 >= 0; --_i3) {
    var entry = partialMatches[_i3];
    var terms = entry.terms;
    for (var ti = 0; ti < terms.length; ++ti) {
      // a CURIE is usable if:
      // 1. it has no mapping, OR
      // 2. value is null, which means we're not compacting an @value, AND
      //   the mapping matches the IRI
      var curie = terms[ti] + ':' + iri.substr(entry.iri.length);
      var isUsableCurie = !(curie in activeCtx.mappings) || value === null && activeCtx.mappings[curie]['@id'] === iri;

      // select curie if it is shorter or the same length but lexicographically
      // less than the current choice
      if (isUsableCurie && (choice === null || _compareShortestLeast(curie, choice) < 0)) {
        choice = curie;
      }
    }
  }

  // return chosen curie
  if (choice !== null) {
    return choice;
  }

  // compact IRI relative to base
  if (!relativeTo.vocab) {
    return _removeBase(activeCtx['@base'], iri);
  }

  // return IRI as is
  return iri;
};

/**
 * Performs value compaction on an object with '@value' or '@id' as the only
 * property.
 *
 * @param activeCtx the active context.
 * @param activeProperty the active property that points to the value.
 * @param value the value to compact.
 *
 * @return the compaction result.
 */
api.compactValue = function (_ref3) {
  var activeCtx = _ref3.activeCtx,
      activeProperty = _ref3.activeProperty,
      value = _ref3.value;

  // value is a @value
  if (_isValue(value)) {
    // get context rules
    var _type = _getContextValue(activeCtx, activeProperty, '@type');
    var language = _getContextValue(activeCtx, activeProperty, '@language');
    var container = _getContextValue(activeCtx, activeProperty, '@container') || [];

    // whether or not the value has an @index that must be preserved
    var preserveIndex = '@index' in value && !container.includes('@index');

    // if there's no @index to preserve ...
    if (!preserveIndex) {
      // matching @type or @language specified in context, compact value
      if (value['@type'] === _type || value['@language'] === language) {
        return value['@value'];
      }
    }

    // return just the value of @value if all are true:
    // 1. @value is the only key or @index isn't being preserved
    // 2. there is no default language or @value is not a string or
    //   the key has a mapping with a null @language
    var keyCount = Object.keys(value).length;
    var isValueOnlyKey = keyCount === 1 || keyCount === 2 && '@index' in value && !preserveIndex;
    var hasDefaultLanguage = '@language' in activeCtx;
    var isValueString = _isString(value['@value']);
    var hasNullMapping = activeCtx.mappings[activeProperty] && activeCtx.mappings[activeProperty]['@language'] === null;
    if (isValueOnlyKey && (!hasDefaultLanguage || !isValueString || hasNullMapping)) {
      return value['@value'];
    }

    var rval = {};

    // preserve @index
    if (preserveIndex) {
      rval[api.compactIri({ activeCtx: activeCtx, iri: '@index', relativeTo: { vocab: true } })] = value['@index'];
    }

    if ('@type' in value) {
      // compact @type IRI
      rval[api.compactIri({ activeCtx: activeCtx, iri: '@type', relativeTo: { vocab: true } })] = api.compactIri({ activeCtx: activeCtx, iri: value['@type'], relativeTo: { vocab: true } });
    } else if ('@language' in value) {
      // alias @language
      rval[api.compactIri({ activeCtx: activeCtx, iri: '@language', relativeTo: { vocab: true } })] = value['@language'];
    }

    // alias @value
    rval[api.compactIri({ activeCtx: activeCtx, iri: '@value', relativeTo: { vocab: true } })] = value['@value'];

    return rval;
  }

  // value is a subject reference
  var expandedProperty = _expandIri(activeCtx, activeProperty, { vocab: true });
  var type = _getContextValue(activeCtx, activeProperty, '@type');
  var compacted = api.compactIri({ activeCtx: activeCtx, iri: value['@id'], relativeTo: { vocab: type === '@vocab' } });

  // compact to scalar
  if (type === '@id' || type === '@vocab' || expandedProperty === '@graph') {
    return compacted;
  }

  return _defineProperty({}, api.compactIri({ activeCtx: activeCtx, iri: '@id', relativeTo: { vocab: true } }), compacted);
};

/**
 * Removes the @preserve keywords as the last step of the compaction
 * algorithm when it is running on framed output.
 *
 * @param ctx the active context used to compact the input.
 * @param input the framed, compacted output.
 * @param options the compaction options used.
 *
 * @return the resulting output.
 */
api.removePreserve = function (ctx, input, options) {
  // recurse through arrays
  if (_isArray(input)) {
    var output = [];
    for (var i = 0; i < input.length; ++i) {
      var result = api.removePreserve(ctx, input[i], options);
      // drop nulls from arrays
      if (result !== null) {
        output.push(result);
      }
    }
    input = output;
  } else if (_isObject(input)) {
    // remove @preserve
    if ('@preserve' in input) {
      if (input['@preserve'] === '@null') {
        return null;
      }
      return input['@preserve'];
    }

    // skip @values
    if (_isValue(input)) {
      return input;
    }

    // recurse through @lists
    if (_isList(input)) {
      input['@list'] = api.removePreserve(ctx, input['@list'], options);
      return input;
    }

    // handle in-memory linked nodes
    var idAlias = api.compactIri({ activeCtx: ctx, iri: '@id', relativeTo: { vocab: true } });
    if (idAlias in input) {
      var id = input[idAlias];
      if (id in options.link) {
        var idx = options.link[id].indexOf(input);
        if (idx !== -1) {
          // already visited
          return options.link[id][idx];
        }
        // prevent circular visitation
        options.link[id].push(input);
      } else {
        // prevent circular visitation
        options.link[id] = [input];
      }
    }

    // recurse through properties
    for (var prop in input) {
      var _result = api.removePreserve(ctx, input[prop], options);
      var container = _getContextValue(ctx, prop, '@container') || [];
      if (options.compactArrays && _isArray(_result) && _result.length === 1 && container.length === 0) {
        _result = _result[0];
      }
      input[prop] = _result;
    }
  }
  return input;
};

/**
 * Picks the preferred compaction term from the given inverse context entry.
 *
 * @param activeCtx the active context.
 * @param iri the IRI to pick the term for.
 * @param value the value to pick the term for.
 * @param containers the preferred containers.
 * @param typeOrLanguage either '@type' or '@language'.
 * @param typeOrLanguageValue the preferred value for '@type' or '@language'.
 *
 * @return the preferred term.
 */
function _selectTerm(activeCtx, iri, value, containers, typeOrLanguage, typeOrLanguageValue) {
  if (typeOrLanguageValue === null) {
    typeOrLanguageValue = '@null';
  }

  // preferences for the value of @type or @language
  var prefs = [];

  // determine prefs for @id based on whether or not value compacts to a term
  if ((typeOrLanguageValue === '@id' || typeOrLanguageValue === '@reverse') && _isSubjectReference(value)) {
    // prefer @reverse first
    if (typeOrLanguageValue === '@reverse') {
      prefs.push('@reverse');
    }
    // try to compact value to a term
    var term = api.compactIri({ activeCtx: activeCtx, iri: value['@id'], relativeTo: { vocab: true } });
    if (term in activeCtx.mappings && activeCtx.mappings[term] && activeCtx.mappings[term]['@id'] === value['@id']) {
      // prefer @vocab
      prefs.push.apply(prefs, ['@vocab', '@id']);
    } else {
      // prefer @id
      prefs.push.apply(prefs, ['@id', '@vocab']);
    }
  } else {
    prefs.push(typeOrLanguageValue);
  }
  prefs.push('@none');

  var containerMap = activeCtx.inverse[iri];
  for (var ci = 0; ci < containers.length; ++ci) {
    // if container not available in the map, continue
    var container = containers[ci];
    if (!(container in containerMap)) {
      continue;
    }

    var typeOrLanguageValueMap = containerMap[container][typeOrLanguage];
    for (var pi = 0; pi < prefs.length; ++pi) {
      // if type/language option not available in the map, continue
      var pref = prefs[pi];
      if (!(pref in typeOrLanguageValueMap)) {
        continue;
      }

      // select term
      return typeOrLanguageValueMap[pref];
    }
  }

  return null;
}

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */


function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var _require = __webpack_require__(2),
    parseLinkHeader = _require.parseLinkHeader,
    buildHeaders = _require.buildHeaders;

var _require2 = __webpack_require__(24),
    LINK_HEADER_REL = _require2.LINK_HEADER_REL;

var JsonLdError = __webpack_require__(6);
var RequestQueue = __webpack_require__(49);

/**
 * Creates a built-in node document loader.
 *
 * @param options the options to use:
 *          secure: require all URLs to use HTTPS.
 *          strictSSL: true to require SSL certificates to be valid,
 *            false not to (default: true).
 *          maxRedirects: the maximum number of redirects to permit, none by
 *            default.
 *          request: the object which will make the request, default is
 *            provided by `https://www.npmjs.com/package/request`.
 *          headers: an object (map) of headers which will be passed as request
 *            headers for the requested document. Accept is not allowed.
 *
 * @return the node document loader.
 */
module.exports = function () {
  var loadDocument = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url, redirects) {
      var doc, result, _result, res, body, statusText, linkHeader;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(url.indexOf('http:') !== 0 && url.indexOf('https:') !== 0)) {
                _context.next = 2;
                break;
              }

              throw new JsonLdError('URL could not be dereferenced; only "http" and "https" URLs are ' + 'supported.', 'jsonld.InvalidUrl', { code: 'loading document failed', url: url });

            case 2:
              if (!(secure && url.indexOf('https') !== 0)) {
                _context.next = 4;
                break;
              }

              throw new JsonLdError('URL could not be dereferenced; secure mode is enabled and ' + 'the URL\'s scheme is not "https".', 'jsonld.InvalidUrl', { code: 'loading document failed', url: url });

            case 4:
              // TODO: disable cache until HTTP caching implemented
              doc = null; //cache.get(url);

              if (!(doc !== null)) {
                _context.next = 7;
                break;
              }

              return _context.abrupt('return', doc);

            case 7:
              result = void 0;
              _context.prev = 8;
              _context.next = 11;
              return _request(request, {
                url: url,
                headers: headers,
                strictSSL: strictSSL,
                followRedirect: false
              });

            case 11:
              result = _context.sent;
              _context.next = 17;
              break;

            case 14:
              _context.prev = 14;
              _context.t0 = _context['catch'](8);
              throw new JsonLdError('URL could not be dereferenced, an error occurred.', 'jsonld.LoadDocumentError', { code: 'loading document failed', url: url, cause: _context.t0 });

            case 17:
              _result = result, res = _result.res, body = _result.body;


              doc = { contextUrl: null, documentUrl: url, document: body || null };

              // handle error
              statusText = http.STATUS_CODES[res.statusCode];

              if (!(res.statusCode >= 400)) {
                _context.next = 22;
                break;
              }

              throw new JsonLdError('URL could not be dereferenced: ' + statusText, 'jsonld.InvalidUrl', {
                code: 'loading document failed',
                url: url,
                httpStatusCode: res.statusCode
              });

            case 22:
              if (!(res.headers.link && res.headers['content-type'] !== 'application/ld+json')) {
                _context.next = 27;
                break;
              }

              // only 1 related link header permitted
              linkHeader = parseLinkHeader(res.headers.link)[LINK_HEADER_REL];

              if (!Array.isArray(linkHeader)) {
                _context.next = 26;
                break;
              }

              throw new JsonLdError('URL could not be dereferenced, it has more than one associated ' + 'HTTP Link Header.', 'jsonld.InvalidUrl', { code: 'multiple context link headers', url: url });

            case 26:
              if (linkHeader) {
                doc.contextUrl = linkHeader.target;
              }

            case 27:
              if (!(res.statusCode >= 300 && res.statusCode < 400 && res.headers.location)) {
                _context.next = 34;
                break;
              }

              if (!(redirects.length === maxRedirects)) {
                _context.next = 30;
                break;
              }

              throw new JsonLdError('URL could not be dereferenced; there were too many redirects.', 'jsonld.TooManyRedirects', {
                code: 'loading document failed',
                url: url,
                httpStatusCode: res.statusCode,
                redirects: redirects
              });

            case 30:
              if (!(redirects.indexOf(url) !== -1)) {
                _context.next = 32;
                break;
              }

              throw new JsonLdError('URL could not be dereferenced; infinite redirection was detected.', 'jsonld.InfiniteRedirectDetected', {
                code: 'recursive context inclusion',
                url: url,
                httpStatusCode: res.statusCode,
                redirects: redirects
              });

            case 32:
              redirects.push(url);
              return _context.abrupt('return', loadDocument(res.headers.location, redirects));

            case 34:

              // cache for each redirected URL
              redirects.push(url);
              // TODO: disable cache until HTTP caching implemented
              /*for(let i = 0; i < redirects.length; ++i) {
                cache.set(
                  redirects[i],
                  {contextUrl: null, documentUrl: redirects[i], document: body});
              }*/

              return _context.abrupt('return', doc);

            case 36:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[8, 14]]);
    }));

    return function loadDocument(_x2, _x3) {
      return _ref2.apply(this, arguments);
    };
  }();

  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { strictSSL: true, maxRedirects: -1, headers: {} },
      secure = _ref.secure,
      _ref$strictSSL = _ref.strictSSL,
      strictSSL = _ref$strictSSL === undefined ? true : _ref$strictSSL,
      _ref$maxRedirects = _ref.maxRedirects,
      maxRedirects = _ref$maxRedirects === undefined ? -1 : _ref$maxRedirects,
      request = _ref.request,
      _ref$headers = _ref.headers,
      headers = _ref$headers === undefined ? {} : _ref$headers;

  headers = buildHeaders(headers);
  // TODO: use `r2`
  request = request || __webpack_require__(48);
  var http = __webpack_require__(48);
  // TODO: disable cache until HTTP caching implemented
  //const cache = new DocumentCache();

  var queue = new RequestQueue();
  return queue.wrapLoader(function (url) {
    return loadDocument(url, []);
  });
};

function _request(request, options) {
  return new Promise(function (resolve, reject) {
    request(options, function (err, res, body) {
      if (err) {
        reject(err);
      } else {
        resolve({ res: res, body: body });
      }
    });
  });
}

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */


function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var _require = __webpack_require__(2),
    parseLinkHeader = _require.parseLinkHeader,
    buildHeaders = _require.buildHeaders;

var _require2 = __webpack_require__(24),
    LINK_HEADER_REL = _require2.LINK_HEADER_REL;

var JsonLdError = __webpack_require__(6);
var RequestQueue = __webpack_require__(49);

var REGEX_LINK_HEADER = /(^|(\r\n))link:/i;

/**
 * Creates a built-in XMLHttpRequest document loader.
 *
 * @param options the options to use:
 *          secure: require all URLs to use HTTPS.
 *          headers: an object (map) of headers which will be passed as request
 *            headers for the requested document. Accept is not allowed.
 *          [xhr]: the XMLHttpRequest API to use.
 *
 * @return the XMLHttpRequest document loader.
 */
module.exports = function () {
  var loader = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
      var req, doc, contentType, linkHeader;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(url.indexOf('http:') !== 0 && url.indexOf('https:') !== 0)) {
                _context.next = 2;
                break;
              }

              throw new JsonLdError('URL could not be dereferenced; only "http" and "https" URLs are ' + 'supported.', 'jsonld.InvalidUrl', { code: 'loading document failed', url: url });

            case 2:
              if (!(secure && url.indexOf('https') !== 0)) {
                _context.next = 4;
                break;
              }

              throw new JsonLdError('URL could not be dereferenced; secure mode is enabled and ' + 'the URL\'s scheme is not "https".', 'jsonld.InvalidUrl', { code: 'loading document failed', url: url });

            case 4:
              req = void 0;
              _context.prev = 5;
              _context.next = 8;
              return _get(xhr, url, headers);

            case 8:
              req = _context.sent;
              _context.next = 14;
              break;

            case 11:
              _context.prev = 11;
              _context.t0 = _context['catch'](5);
              throw new JsonLdError('URL could not be dereferenced, an error occurred.', 'jsonld.LoadDocumentError', { code: 'loading document failed', url: url, cause: _context.t0 });

            case 14:
              if (!(req.status >= 400)) {
                _context.next = 16;
                break;
              }

              throw new JsonLdError('URL could not be dereferenced: ' + req.statusText, 'jsonld.LoadDocumentError', {
                code: 'loading document failed',
                url: url,
                httpStatusCode: req.status
              });

            case 16:
              doc = { contextUrl: null, documentUrl: url, document: req.response };

              // handle Link Header (avoid unsafe header warning by existence testing)

              contentType = req.getResponseHeader('Content-Type');
              linkHeader = void 0;

              if (REGEX_LINK_HEADER.test(req.getAllResponseHeaders())) {
                linkHeader = req.getResponseHeader('Link');
              }

              if (!(linkHeader && contentType !== 'application/ld+json')) {
                _context.next = 25;
                break;
              }

              // only 1 related link header permitted
              linkHeader = parseLinkHeader(linkHeader)[LINK_HEADER_REL];

              if (!Array.isArray(linkHeader)) {
                _context.next = 24;
                break;
              }

              throw new JsonLdError('URL could not be dereferenced, it has more than one ' + 'associated HTTP Link Header.', 'jsonld.InvalidUrl', { code: 'multiple context link headers', url: url });

            case 24:
              if (linkHeader) {
                doc.contextUrl = linkHeader.target;
              }

            case 25:
              return _context.abrupt('return', doc);

            case 26:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[5, 11]]);
    }));

    return function loader(_x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { headers: {} },
      secure = _ref.secure,
      _ref$headers = _ref.headers,
      headers = _ref$headers === undefined ? {} : _ref$headers,
      xhr = _ref.xhr;

  headers = buildHeaders(headers);
  var queue = new RequestQueue();
  return queue.wrapLoader(loader);
};

function _get(xhr, url, headers) {
  xhr = xhr || XMLHttpRequest;
  var req = new xhr();
  return new Promise(function (resolve, reject) {
    req.onload = function () {
      return resolve(req);
    };
    req.onerror = function (err) {
      return reject(err);
    };
    req.open('GET', url, true);
    for (var k in headers) {
      req.setRequestHeader(k, headers[k]);
    }
    req.send();
  });
}

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function (jsonld) {
  var JsonLdProcessor = function () {
    function JsonLdProcessor() {
      _classCallCheck(this, JsonLdProcessor);
    }

    _createClass(JsonLdProcessor, [{
      key: 'toString',
      value: function toString() {
        return '[object JsonLdProcessor]';
      }
    }]);

    return JsonLdProcessor;
  }();

  Object.defineProperty(JsonLdProcessor, 'prototype', {
    writable: false,
    enumerable: false
  });
  Object.defineProperty(JsonLdProcessor.prototype, 'constructor', {
    writable: true,
    enumerable: false,
    configurable: true,
    value: JsonLdProcessor
  });

  // The Web IDL test harness will check the number of parameters defined in
  // the functions below. The number of parameters must exactly match the
  // required (non-optional) parameters of the JsonLdProcessor interface as
  // defined here:
  // https://www.w3.org/TR/json-ld-api/#the-jsonldprocessor-interface

  JsonLdProcessor.compact = function (input, ctx) {
    if (arguments.length < 2) {
      return Promise.reject(new TypeError('Could not compact, too few arguments.'));
    }
    return jsonld.compact(input, ctx);
  };
  JsonLdProcessor.expand = function (input) {
    if (arguments.length < 1) {
      return Promise.reject(new TypeError('Could not expand, too few arguments.'));
    }
    return jsonld.expand(input);
  };
  JsonLdProcessor.flatten = function (input) {
    if (arguments.length < 1) {
      return Promise.reject(new TypeError('Could not flatten, too few arguments.'));
    }
    return jsonld.flatten(input);
  };

  return JsonLdProcessor;
};

/***/ }),
/* 134 */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ })
/******/ ]);
});