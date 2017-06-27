/**
 * highcharts-ng
 * @version v0.0.13 - 2016-10-04
 * @link https://github.com/pablojim/highcharts-ng
 * @author Barry Fitzgerald <>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
!function(){"use strict";function a(){var a=[],c=!1,d=!1;return{HIGHCHART:"highcharts.js",HIGHSTOCK:"stock/highstock.js",basePath:function(a){c=a},lazyLoad:function(b){a=void 0===b?[this.HIGHCHART]:b,d=!0},$get:["$q","$window",function(d,e){return c||(c=("https:"===window.location.protocol?"https":"http")+"://code.highcharts.com/"),b(d,e,c,a)}]}}function b(a,b,c,d){function e(b){return a(function(a){var c=document.createElement("script");c.type="text/javascript",c.src=b,c.onload=a,document.getElementsByTagName("body")[0].appendChild(c)})}function f(){if("undefined"!=typeof b.Highcharts)return a.when(b.Highcharts);var f=a.when();return angular.forEach(d,function(a){f=f.then(function(){return e(c+a)})}),f.then(function(){return b.Highcharts})}function g(){return h||(h=f()),h}var h;return{getHighcharts:g,ready:function(a,b){g().then(function(){a.call(b)})}}}var c="highcharts-ng-lazyload";"undefined"!=typeof module&&"undefined"!=typeof exports&&module.exports===exports&&(module.exports=c),angular.module(c,["highcharts-ng"]).provider("highchartsNG",a)}();