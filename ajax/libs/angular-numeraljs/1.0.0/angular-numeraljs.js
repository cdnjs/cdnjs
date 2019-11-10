/**
 * AngularJS filter for Numeral.js: number formatting as a filter
 * @version v1.0.0 - 2014-08-21
 * @link https://github.com/baumandm/angular-numeraljs
 * @author Dave Bauman <baumandm@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
/*global numeral */
'use strict';
angular.module('ngNumeraljs', [])
    .filter('numeraljs', function () {
        return function (input, format) {
            if (input == null || format == null) 
                return input;
            if (format === '') 
                return '';
            
            return numeral(input).format(format);
        };
    });
