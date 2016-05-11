(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.angularStripe = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
(function (global){
'use strict'

var angular = (typeof window !== "undefined" ? window['angular'] : typeof global !== "undefined" ? global['angular'] : null)

module.exports = angular.module('assert-q-constructor', [])
  .factory('assertQConstructor', main)
  .name

main.$inject = ['$q']
function main ($q) {
  return function assertQConstructor (message) {
    if (typeof $q !== 'function') {
      throw new Error(message || '$q is not a function')
    }
  }
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(_dereq_,module,exports){
'use strict';

function isObjOrFn(x) {
	return (typeof x === 'object' || typeof x === 'function') && x !== null;
}

module.exports.get = function (obj, path) {
	if (!isObjOrFn(obj) || typeof path !== 'string') {
		return obj;
	}

	var pathArr = path.split('.');
	pathArr.some(function (path, index) {
		obj = obj[path];

		if (obj === undefined) {
			return true;
		}
	});

	return obj;
};

module.exports.set = function (obj, path, value) {
	if (!isObjOrFn(obj) || typeof path !== 'string') {
		return;
	}

	var pathArr = path.split('.');
	pathArr.forEach(function (path, index) {
		if (!isObjOrFn(obj[path])) {
			obj[path] = {};
		}

		if (index === pathArr.length - 1) {
			obj[path] = value;
		}

		obj = obj[path];
	});
};

},{}],3:[function(_dereq_,module,exports){
'use strict'

var extend = _dereq_('xtend/mutable')
var dot = _dereq_('dot-prop')

var asyncMethods = [
  'card.createToken',
  'bankAccount.createToken',
  'bitcoinReceiver.createReceiver',
  'bitcoinReceiver.pollReceiver',
  'bitcoinReceiver.getReceiver',
]

var helperMethods = [
  'setPublishableKey',
  'card.validateCardNumber',
  'card.validateExpiry',
  'card.validateCVC',
  'card.cardType',
  'bankAccount.validateRoutingNumber',
  'bankAccount.validateAccountNumber',
  'bitcoinReceiver.cancelReceiverPoll'
]

module.exports = function promisifyStripe (Stripe, Promise) {
  if (typeof Stripe !== 'function') throw new Error('Stripe.js must be provided')
  if (typeof Promise !== 'function') throw new Error('Promise constructor must be provided')
  var stripe = {}
  asyncMethods.forEach(function (method) {
    var names = method.split('.')
    var receiverName = names[0]
    var methodName = names[1]
    dot.set(stripe, method, promisify(Promise, methodName, Stripe[receiverName], stripeResponseHandler))
  })
  helperMethods.forEach(function (method) {
    dot.set(stripe, method, dot.get(Stripe, method))
  })
  return stripe
}

function promisify (Promise, method, receiver, resolver) {
  return function promisified () {
    var args = Array.prototype.slice.call(arguments)
    return new Promise(function (resolve, reject) {
      receiver[method].apply(receiver, args.concat(function promisifiedResolve () {
        resolver.apply({resolve: resolve, reject: reject}, arguments)
      }))      
    })
  }
}

function stripeResponseHandler (status, response) {
  if (response.error) {
    this.reject(extend(new Error(), response.error))
  }
  else {
    this.resolve(response)
  }
}

},{"dot-prop":2,"xtend/mutable":4}],4:[function(_dereq_,module,exports){
module.exports = extend

var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend(target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}

},{}],5:[function(_dereq_,module,exports){
'use strict'

var service = _dereq_('./service')

module.exports = stripeProvider

stripeProvider.$inject = ['Stripe']
function stripeProvider (Stripe) {
  if (!Stripe) throw new Error('Stripe must be available as window.Stripe')
  this.setPublishableKey = Stripe.setPublishableKey
  this.$get = service
}

},{"./service":6}],6:[function(_dereq_,module,exports){
'use strict'

var stripeAsPromised = _dereq_('stripe-as-promised')

module.exports = factory

factory.$inject = ['Stripe', '$q']
function factory (Stripe, $q) {
  return stripeAsPromised(Stripe, $q)
}

},{"stripe-as-promised":3}],7:[function(_dereq_,module,exports){
(function (global){
'use strict'

var angular = (typeof window !== "undefined" ? window['angular'] : typeof global !== "undefined" ? global['angular'] : null)
var provider = _dereq_('./provider')
var Stripe = window.Stripe

module.exports = angular.module('angular-stripe', [
  _dereq_('angular-assert-q-constructor')
])
.constant('Stripe', Stripe)
.provider('stripe', provider)
.run(verifyQ)
.name

verifyQ.$inject = ['assertQConstructor']
function verifyQ (assertQConstructor) {
  assertQConstructor('angular-stripe: For Angular <= 1.2 support, first load https://github.com/bendrucker/angular-q-constructor')
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./provider":5,"angular-assert-q-constructor":1}]},{},[7])(7)
});