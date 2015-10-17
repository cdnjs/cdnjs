/*!
* Qoopido.js library v3.2.6, 2014-5-18
* https://github.com/dlueth/qoopido.js
* (c) 2014 Dirk Lueth
* Dual licensed under MIT and GPL
*/
!function(t){window.qoopido.register("polyfill/window/getcomputedstyle",t)}(function(t,e,n,r,o){"use strict";if(!o.getComputedStyle){var u=new RegExp("(\\-([a-z]){1})","g"),l=function(){return arguments[2].toUpperCase()};o.getComputedStyle=function(t){var e=this;return e.element=t,e.getPropertyValue=function(e){return"float"===e&&(e="styleFloat"),u.test(e)&&(e=e.replace(u,l)),t.currentStyle[e]?t.currentStyle[e]:null},e}}return!0});