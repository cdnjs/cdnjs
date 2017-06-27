/**
 * AngularJS filter for Numeral.js: number formatting as a filter
 * @version v2.0.1 - 2017-05-06
 * @link https://github.com/baumandm/angular-numeraljs
 * @author Dave Bauman <baumandm@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

"use strict";!function(a,b){"object"==typeof exports?module.exports=b(require("numeral")):"function"==typeof define&&define.amd?define(["numeral"],function(c){return a.ngNumeraljs=b(c)}):a.ngNumeraljs=b(a.numeral)}(this,function(a){return angular.module("ngNumeraljs",[]).provider("$numeraljsConfig",function(){var b={};this.defaultFormat=function(b){a.defaultFormat(b)},this.locale=function(b){a.locale(b)},this.namedFormat=function(a,c){b[a]=c},this.register=function(b,c,d){a.register(b,c,d)},this.$get=function(){return{customFormat:function(a){return b[a]||a},defaultFormat:this.defaultFormat,locale:this.locale,register:this.register,namedFormat:this.namedFormat}}}).filter("numeraljs",["$numeraljsConfig",function(b){return function(c,d){return null==c?c:(d=b.customFormat(d),a(c).format(d))}}])});