/**
 * AngularJS filter for Numeral.js: number formatting as a filter
 * @version v1.3.2 - 2016-12-27
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

        this.setFormat = function (name, format) {
            formats[name] = format;
        };

        this.setDefaultFormat = function (format) {
            numeral.defaultFormat(format);
        };

        this.setLanguage = function (lang, def) {
            numeral.language(lang, def);
        };

        this.setCurrentLanguage = function (lang) {
            numeral.language(lang);
        };

        this.$get = function () {
            return {
                customFormat: function (name) {
                    return formats[name] || name;
                },

                setCurrentLanguage: this.setCurrentLanguage,

                setDefaultFormat: this.setDefaultFormat,

                setFormat: this.setFormat,

                setLanguage: this.setLanguage,
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
