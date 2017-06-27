!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.angularStripe=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var angular = _interopRequire((typeof window !== "undefined" ? window.angular : typeof global !== "undefined" ? global.angular : null));

var provider = _interopRequire(require("./provider"));

var Stripe = _interopRequire((typeof window !== "undefined" ? window.Stripe : typeof global !== "undefined" ? global.Stripe : null));

module.exports = angular.module("angular-stripe", []).constant("Stripe", Stripe).provider("stripe", provider).name;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./provider":5}],2:[function(require,module,exports){

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

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _deep = require('deep-property');

var _deep2 = _interopRequireWildcard(_deep);

var _extend = require('xtend/mutable');

var _extend2 = _interopRequireWildcard(_extend);

'use strict';

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

    _deep2['default'].set(stripe, method, promisify(Promise, methodName, Stripe[receiver], stripeResponseHandler));
  });
  helperMethods.forEach(function (method) {
    _deep2['default'].set(stripe, method, _deep2['default'].get(Stripe, method));
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
    this.reject(_extend2['default'](new Error(), response.error));
  } else {
    this.resolve(response);
  }
}
module.exports = exports['default'];

},{"deep-property":2,"xtend/mutable":3}],5:[function(require,module,exports){
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

},{"./service":6}],6:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var stripeAsPromised = _interopRequire(require("stripe-as-promised"));

module.exports = factory;

factory.$inject = ["Stripe", "$q"];
function factory(Stripe, $q) {
  return stripeAsPromised(Stripe, $q);
}

},{"stripe-as-promised":4}]},{},[1])(1)
});