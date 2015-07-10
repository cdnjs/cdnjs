/*!
* Qoopido.js library v3.4.4, 2014-6-15
* https://github.com/dlueth/qoopido.js
* (c) 2014 Dirk Lueth
* Dual licensed under MIT and GPL
*//*!
* Qoopido.js library
*
* version: 3.4.4
* date:    2014-6-15
* author:  Dirk Lueth <info@qoopido.com>
* website: https://github.com/dlueth/qoopido.js
*
* Copyright (c) 2014 Dirk Lueth
*
* Dual licensed under the MIT and GPL licenses.
* - http://www.opensource.org/licenses/mit-license.php
* - http://www.gnu.org/copyleft/gpl.html
*/
!function(o){var r=[];window.Promise||r.push("../polyfill/window/promise"),window.qoopido.register("promise/race",o,r)}(function(o,r,t,n,e,i,s){"use strict";return function(o){if("[object Array]"!==Object.prototype.toString.call(o))throw new TypeError("You must pass an array to all.");return new e.Promise(function(r,t){for(var n,e=0;(n=o[e])!==s;e++)n&&"function"==typeof n.then?n.then(r,t):r(n)})}});