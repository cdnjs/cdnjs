/*!
* Qoopido.js library v3.2.1, 2014-0-10
* https://github.com/dlueth/qoopido.js
* (c) 2014 Dirk Lueth
* Dual licensed under MIT and GPL
*/
!function(n){window.qoopido.register("proxy",n,["./function/unique/uuid"])}(function(n){"use strict";return n.base.extend({_constructor:function(t,u){var r=Array.prototype.splice.call(arguments,2),o=function(){return u.apply(t,Array.prototype.slice.call(arguments,0).concat(r))};return o._quid=n["function/unique/uuid"](),o}})});