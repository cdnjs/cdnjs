/**
 * AngularJS filter for Numeral.js: number formatting as a filter
 * @version v1.0.2 - 2014-09-16
 * @link https://github.com/baumandm/angular-numeraljs
 * @author Dave Bauman <baumandm@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
/*global numeral */
'use strict';
angular.module('ngNumeraljs', [])
    .filter('numeraljs', function () {
        return function (input, format, language) {
            if (input == null || format == null) 
                return input;
            if (format === '') 
                return '';
            if (language != null)
                numeral.language(language);

            
            return numeral(input).format(format);
        };
    });
