(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.angularStripe = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var angular = _interopRequire((typeof window !== "undefined" ? window.angular : typeof global !== "undefined" ? global.angular : null));

var assertQCtor = _interopRequire(require("angular-assert-q-constructor"));

var provider = _interopRequire(require("./provider"));

var Stripe = typeof window !== "undefined" ? window.Stripe : typeof global !== "undefined" ? global.Stripe : null;

module.exports = angular.module("angular-stripe", [assertQCtor]).constant("Stripe", Stripe).provider("stripe", provider).run(verifyQ).name;

verifyQ.$inject = ["assertQConstructor"];
function verifyQ(assertQConstructor) {
  assertQConstructor("angular-stripe: For Angular <= 1.2 support, first load https://github.com/bendrucker/angular-q-constructor");
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./provider":11,"angular-assert-q-constructor":7}],2:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/define-property"), __esModule: true };
},{"core-js/library/fn/object/define-property":4}],3:[function(require,module,exports){
"use strict";

exports["default"] = function (obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
};

exports.__esModule = true;
},{}],4:[function(require,module,exports){
var $ = require('../../modules/$');
module.exports = function defineProperty(it, key, desc){
  return $.setDesc(it, key, desc);
};
},{"../../modules/$":6}],5:[function(require,module,exports){
module.exports = function($){
  $.FW   = false;
  $.path = $.core;
  return $;
};
},{}],6:[function(require,module,exports){
'use strict';
var global = typeof self != 'undefined' ? self : Function('return this')()
  , core   = {}
  , defineProperty = Object.defineProperty
  , hasOwnProperty = {}.hasOwnProperty
  , ceil  = Math.ceil
  , floor = Math.floor
  , max   = Math.max
  , min   = Math.min;
// The engine works fine with descriptors? Thank's IE8 for his funny defineProperty.
var DESC = !!function(){
  try {
    return defineProperty({}, 'a', {get: function(){ return 2; }}).a == 2;
  } catch(e){ /* empty */ }
}();
var hide = createDefiner(1);
// 7.1.4 ToInteger
function toInteger(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
}
function desc(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
}
function simpleSet(object, key, value){
  object[key] = value;
  return object;
}
function createDefiner(bitmap){
  return DESC ? function(object, key, value){
    return $.setDesc(object, key, desc(bitmap, value));
  } : simpleSet;
}

function isObject(it){
  return it !== null && (typeof it == 'object' || typeof it == 'function');
}
function isFunction(it){
  return typeof it == 'function';
}
function assertDefined(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
}

var $ = module.exports = require('./$.fw')({
  g: global,
  core: core,
  html: global.document && document.documentElement,
  // http://jsperf.com/core-js-isobject
  isObject:   isObject,
  isFunction: isFunction,
  it: function(it){
    return it;
  },
  that: function(){
    return this;
  },
  // 7.1.4 ToInteger
  toInteger: toInteger,
  // 7.1.15 ToLength
  toLength: function(it){
    return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
  },
  toIndex: function(index, length){
    index = toInteger(index);
    return index < 0 ? max(index + length, 0) : min(index, length);
  },
  has: function(it, key){
    return hasOwnProperty.call(it, key);
  },
  create:     Object.create,
  getProto:   Object.getPrototypeOf,
  DESC:       DESC,
  desc:       desc,
  getDesc:    Object.getOwnPropertyDescriptor,
  setDesc:    defineProperty,
  setDescs:   Object.defineProperties,
  getKeys:    Object.keys,
  getNames:   Object.getOwnPropertyNames,
  getSymbols: Object.getOwnPropertySymbols,
  assertDefined: assertDefined,
  // Dummy, fix for not array-like ES3 string in es5 module
  ES5Object: Object,
  toObject: function(it){
    return $.ES5Object(assertDefined(it));
  },
  hide: hide,
  def: createDefiner(0),
  set: global.Symbol ? simpleSet : hide,
  each: [].forEach
});
/* eslint-disable no-undef */
if(typeof __e != 'undefined')__e = core;
if(typeof __g != 'undefined')__g = global;
},{"./$.fw":5}],7:[function(require,module,exports){
(function (global){
'use strict';

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

_Object$defineProperty(exports, '__esModule', {
  value: true
});

var _angular = (typeof window !== "undefined" ? window.angular : typeof global !== "undefined" ? global.angular : null);

var _angular2 = _interopRequireDefault(_angular);

exports['default'] = _angular2['default'].module('assert-q-constructor', []).factory('assertQConstructor', main).name;

main.$inject = ['$q'];
function main($q) {
  return function assertQConstructor(message) {
    if (typeof $q !== 'function') {
      throw new Error(message || '$q is not a function');
    }
  };
}
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"babel-runtime/core-js/object/define-property":2,"babel-runtime/helpers/interop-require-default":3}],8:[function(require,module,exports){

/* 
 * Fetches the value of a deeply nested property.
 * 
 * Arguments:
 * 
 *     obj     Object to fetch property from.
 * 
 *     path    [string] Dot-separated path specifier to nested
 *             property to fetch.  Array indexes are not supported.
 *             Example: "contact.name.first".
 * 
 * Returns:    [mixed] Value of nested property if it exists,
 *             `undefined` otherwise.
 */
module.exports.get = function (obj, path) {
  var tokens = parse(path);
  if (tokens.length == 0) {
    return undefined;
  }
  for (var i = 0, len = tokens.length; i < len; i++) {
    if (! obj || ! obj.hasOwnProperty(tokens[i])) {
      return undefined;
    } else {
      obj = obj[tokens[i]];
    }
  }
  return obj;
};


/* 
 * Sets the value of a deeply nested property.
 * 
 * If an intermediate property of the specified path doesn't exist,
 * it will be created as an object.
 * 
 * Arguments:
 * 
 *     obj     Object to set property on.
 * 
 *     path    [string] Dot-separated path specifier to nested
 *             property to set.  Array indexes are not supported.
 *             Example: "contact.name.first".
 * 
 *     value   [mixed] Value to set on the object's nested property.
 * 
 * Returns:    undefined
 */
module.exports.set = function (obj, path, value) {
  if (typeof obj === 'undefined' || typeof path === 'undefined') {
    return;
  }
  var tokens = parse(path);
  for (var i = 0, len = tokens.length; i < len; i++) {
    if (! obj || ! obj.hasOwnProperty(tokens[i])) {
      obj[tokens[i]] = { };
    }
    if (i == (len - 1)) {
      obj[tokens[i]] = value;
    } else {
      obj = obj[tokens[i]];
    }
  }
};


/* 
 * Removes a deeply nested property.
 * 
 * If an intermediate property of the specified path doesn't exist,
 * we bail early.
 * 
 * Arguments:
 * 
 *     obj     Object to remove property from.
 * 
 *     path    [string] Dot-separated path specifier to nested
 *             property to remove.  Array indexes are not supported.
 *             Example: "contact.name.first".
 *
 * Returns:    [boolean] TRUE if property was removed, otherwise FALSE.
 */
module.exports.remove = function (obj, path) {
  if (typeof obj === 'undefined' || typeof path === 'undefined') {
    return false;
  }
  var tokens = parse(path);
  for (var i = 0, len = tokens.length; i < len; i++) {
    if (! obj || ! obj.hasOwnProperty(tokens[i])) {
      return false;
    }
    if (i == (len - 1)) {
      delete obj[tokens[i]];
      return true;
    } else {
      obj = obj[tokens[i]];
    }
  }

  return false
};


/* 
 * Detects whether a given object has a specified nested property.
 * 
 * Normal checks for deeply nested properties will throw an
 * exception if an intermediate property doesn't exist.  This
 * function will do the same without but without the exception.
 * 
 * Arguments:
 * 
 *     obj      Object to check properties for.
 * 
 *     path     [string] Dot-separated path specifier to nested
 *              property.  Array indexes are not supported.
 *              Example: "contact.name.first"
 * 
 * Returns:     [boolean] TRUE if property is defined at the
 *              given path, otherwise FALSE.  If a non-string
 *              is passed as `path`, FALSE is returned.
 */
module.exports.has = function (obj, path) {
  return (typeof module.exports.get(obj, path) !== 'undefined');
};


function parse (path) {
  if (typeof path !== 'string') {
    path = '';
  }
  var tokens = path.split('.');
  for (var i = 0, len = tokens.length; i < len; i++) {
    if (tokens[i] === '') {
      return [ ];
    }
  }
  return tokens;
}

},{}],9:[function(require,module,exports){
module.exports = extend

function extend(target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (source.hasOwnProperty(key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}

},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }

var _deepProperty = require('deep-property');

var _deepProperty2 = _interopRequireDefault(_deepProperty);

var _xtendMutable = require('xtend/mutable');

var _xtendMutable2 = _interopRequireDefault(_xtendMutable);

var asyncMethods = ['card.createToken', 'bankAccount.createToken', 'bitcoinReceiver.createReceiver', 'bitcoinReceiver.pollReceiver', 'bitcoinReceiver.getReceiver'];

var helperMethods = ['setPublishableKey', 'card.validateCardNumber', 'card.validateExpiry', 'card.validateCVC', 'card.cardType', 'bankAccount.validateRoutingNumber', 'bankAccount.validateAccountNumber', 'bitcoinReceiver.cancelReceiverPoll'];

exports['default'] = function (Stripe, Promise) {
  if (!Promise) throw new Error('Promise constructor must be provided');
  var stripe = {};
  asyncMethods.forEach(function (method) {
    var _method$split = method.split('.');

    var _method$split2 = _slicedToArray(_method$split, 2);

    var receiver = _method$split2[0];
    var methodName = _method$split2[1];

    _deepProperty2['default'].set(stripe, method, promisify(Promise, methodName, Stripe[receiver], stripeResponseHandler));
  });
  helperMethods.forEach(function (method) {
    _deepProperty2['default'].set(stripe, method, _deepProperty2['default'].get(Stripe, method));
  });
  return stripe;
};

function promisify(Promise, method, receiver, resolver) {
  return function promisified() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return new Promise(function (resolve, reject) {
      receiver[method].apply(receiver, args.concat(function () {
        resolver.apply({ resolve: resolve, reject: reject }, arguments);
      }));
    });
  };
}

function stripeResponseHandler(status, response) {
  if (response.error) {
    this.reject((0, _xtendMutable2['default'])(new Error(), response.error));
  } else {
    this.resolve(response);
  }
}
module.exports = exports['default'];

},{"deep-property":8,"xtend/mutable":9}],11:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var service = _interopRequire(require("./service"));

module.exports = stripeProvider;

stripeProvider.$inject = ["Stripe"];
function stripeProvider(Stripe) {
  if (!Stripe) throw new Error("Stripe must be available as window.Stripe");
  this.setPublishableKey = Stripe.setPublishableKey;
  this.$get = service;
}

},{"./service":12}],12:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var stripeAsPromised = _interopRequire(require("stripe-as-promised"));

module.exports = factory;

factory.$inject = ["Stripe", "$q"];
function factory(Stripe, $q) {
  return stripeAsPromised(Stripe, $q);
}

},{"stripe-as-promised":10}]},{},[1])(1)
});