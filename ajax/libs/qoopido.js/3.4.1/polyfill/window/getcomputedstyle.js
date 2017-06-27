/*!
* Qoopido.js library v3.4.1, 2014-6-10
* https://github.com/dlueth/qoopido.js
* (c) 2014 Dirk Lueth
* Dual licensed under MIT and GPL
*/
!function(t){window.qoopido.register("polyfill/window/getcomputedstyle",t)}(function(t,e,r,n,u){"use strict";if(u.getComputedStyle)return u.getComputedStyle;var o=new RegExp("(\\-([a-z]){1})","g"),l=function(){return arguments[2].toUpperCase()};return function(t){var e=this;return e.element=t,e.getPropertyValue=function(e){return"float"===e&&(e="styleFloat"),o.test(e)&&(e=e.replace(o,l)),t.currentStyle[e]?t.currentStyle[e]:null},e}});