/**
 * AngularJS filter for Numeral.js: number formatting as a filter
 * @version v2.0.0 - 2017-02-13
 * @link https://github.com/baumandm/angular-numeraljs
 * @author Dave Bauman <baumandm@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
'use strict';

(function (root, factory) {
  if (typeof exports === 'object') {
    // CommonJS
    module.exports = factory(require('numeral'));
  } else if (typeof define === 'function' && define.amd) {
    // AMD
    define(['numeral'], function (numeral) {
      return (root.ngNumeraljs = factory(numeral));
    });
  } else {
    // Global Variables
    root.ngNumeraljs = factory(root.numeral);
  }
}(this, function (numeral) {
  return angular.module('ngNumeraljs', [])
    .provider('$numeraljsConfig', function () {
      var formats = {};

      this.defaultFormat = function (format) {
        numeral.defaultFormat(format);
      };

      this.locale = function (locale) {
        numeral.locale(locale);
      };

      this.namedFormat = function (name, format) {
        formats[name] = format;
      };

      this.register = function (type, name, def) {
        numeral.register(type, name, def);
      };

      this.$get = function () {
        return {
          customFormat: function (name) {
            return formats[name] || name;
          },
          defaultFormat: this.defaultFormat,
          locale: this.locale,
          register: this.register,
          namedFormat: this.namedFormat
        };
      };
    })
    .filter('numeraljs', ['$numeraljsConfig', function ($numeraljsConfig) {
      return function (input, format) {
        if (input == null) {
          return input;
        }

        format = $numeraljsConfig.customFormat(format);

        return numeral(input).format(format);
      };
    }]);
}));
