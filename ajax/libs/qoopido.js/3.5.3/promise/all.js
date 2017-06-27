/*!
* Qoopido.js library v3.5.3, 2014-8-14
* https://github.com/dlueth/qoopido.js
* (c) 2014 Dirk Lueth
* Dual licensed under MIT and GPL
*/
!function(n){var o=[];window.Promise||o.push("../polyfill/window/promise"),window.qoopido.register("promise/all",n,o)}(function(n,o,t,r,i,e,u){"use strict";return function(n){if("[object Array]"!==Object.prototype.toString.call(n))throw new TypeError("You must pass an array to all.");return new i.Promise(function(o,t){function r(n){return function(o){i(n,o)}}function i(n,t){c[n]=t,0===--f&&o(c)}var e,c=[],f=n.length,s=0;for(0===f&&o([]);(e=n[s])!==u;s++)e&&"function"==typeof e.then?e.then(r(s),t):i(s,e)})}});