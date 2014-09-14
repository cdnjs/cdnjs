/*!
* Qoopido.js library v3.5.3, 2014-8-14
* https://github.com/dlueth/qoopido.js
* (c) 2014 Dirk Lueth
* Dual licensed under MIT and GPL
*/
!function(o){var r=[];window.Promise||r.push("../polyfill/window/promise"),window.qoopido.register("promise/race",o,r)}(function(o,r,t,n,e,i,s){"use strict";return function(o){if("[object Array]"!==Object.prototype.toString.call(o))throw new TypeError("You must pass an array to all.");return new e.Promise(function(r,t){for(var n,e=0;(n=o[e])!==s;e++)n&&"function"==typeof n.then?n.then(r,t):r(n)})}});