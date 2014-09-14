/*!
* Qoopido.js library v3.5.3, 2014-8-14
* https://github.com/dlueth/qoopido.js
* (c) 2014 Dirk Lueth
* Dual licensed under MIT and GPL
*/
!function(n){window.qoopido.register("proxy",n,["./base","./function/unique/uuid"])}(function(n){"use strict";return n.base.extend({_constructor:function(t,u){var r=Array.prototype.splice.call(arguments,2),e=function(){return u.apply(t,Array.prototype.slice.call(arguments).concat(r))};return e._quid=n["function/unique/uuid"](),e}})});