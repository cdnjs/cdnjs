!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.angularStripe=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

module.exports = (typeof window !== "undefined" ? window.angular : typeof global !== "undefined" ? global.angular : null)
  .module('angular-stripe', [])
  .provider('stripe', require('./provider'))
  .name;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./provider":2}],2:[function(require,module,exports){
(function (global){
'use strict';

var Stripe = (typeof window !== "undefined" ? window.Stripe : typeof global !== "undefined" ? global.Stripe : null);

module.exports = function () {
  this.setPublishableKey = Stripe.setPublishableKey;
  this.$get = require('./service');
};
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./service":3}],3:[function(require,module,exports){
(function (global){
'use strict';

var angular = (typeof window !== "undefined" ? window.angular : typeof global !== "undefined" ? global.angular : null);
var Stripe  = (typeof window !== "undefined" ? window.Stripe : typeof global !== "undefined" ? global.Stripe : null);

module.exports = function ($q) {

  function promisify (receiver, method) {
    return function (data, params) {
      if (typeof params === 'function') {
        throw new Error('"params" cannot be a function');
      }
      return $q(function (resolve, reject) {
        receiver[method](data, params, function (status, response) {
          if (response.error) {
            return reject(angular.extend(new Error(), response.error));
          }
          else {
            return resolve(response);
          }
        });
      });
    };
  }

  function wrap (source, options) {
    var angularStripe = {
      setPublishableKey: Stripe.setPublishableKey
    };
    angular.forEach(options, function (methods, receiver) {
      var destination = angularStripe[receiver] = {};
      receiver = Stripe[receiver];
      angular.forEach(methods.promisify, function (method) {
        destination[method] = promisify(receiver, method);
      });
      angular.forEach(methods.reference, function (method) {
        destination[method] = receiver[method];
      });
    });
    return angularStripe;
  }

  return wrap(Stripe, {
    card: {
      reference: ['validateCardNumber', 'validateExpiry', 'validateCVC', 'cardType'],
      promisify: ['createToken']
    },
    bankAccount: {
      reference: ['validateRoutingNumber', 'validateAccountNumber'],
      promisify: ['createToken']
    }
  });
};

module.exports.$inject = ['$q'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1])(1)
});