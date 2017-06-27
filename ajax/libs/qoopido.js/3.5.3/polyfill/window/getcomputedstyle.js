/*!
* Qoopido.js library v3.5.3, 2014-8-14
* https://github.com/dlueth/qoopido.js
* (c) 2014 Dirk Lueth
* Dual licensed under MIT and GPL
*/
!function(t){window.qoopido.register("polyfill/window/getcomputedstyle",t)}(function(t,e,r,n,o){"use strict";if(o.getComputedStyle)return o.getComputedStyle;var u=new RegExp("(\\-([a-z]){1})","g"),l=function(){return arguments[2].toUpperCase()};return function(t){var e=this;return e.getPropertyValue=function(e){return"float"===e&&(e="styleFloat"),u.test(e)&&(e=e.replace(u,l)),t.currentStyle[e]||null},e}});