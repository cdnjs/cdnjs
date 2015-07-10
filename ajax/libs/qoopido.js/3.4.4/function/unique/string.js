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
!function(n){window.qoopido.register("function/unique/string",n)}(function(){"use strict";function n(n){var t,e="";for(n=parseInt(n,10)||12,t=0;n>t;t++)e+=r[parseInt(Math.random()*(r.length-1),10)];return e}var t={},r="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");return function(r){var e;do e=n(r);while("undefined"!=typeof t[e]);return t[e]=!0,e}});