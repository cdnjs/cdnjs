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
!function(t){window.qoopido.register("polyfill/window/getcomputedstyle",t)}(function(t,e,r,n,o){"use strict";if(o.getComputedStyle)return o.getComputedStyle;var u=new RegExp("(\\-([a-z]){1})","g"),l=function(){return arguments[2].toUpperCase()};return function(t){var e=this;return e.getPropertyValue=function(e){return"float"===e&&(e="styleFloat"),u.test(e)&&(e=e.replace(u,l)),t.currentStyle[e]||null},e}});