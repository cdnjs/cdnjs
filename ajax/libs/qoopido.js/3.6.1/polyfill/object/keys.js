/*!
* Qoopido.js library v3.6.1, 2015-2-5
* https://github.com/dlueth/qoopido.js
* (c) 2015 Dirk Lueth
* Dual licensed under MIT and GPL
*/
!function(e){window.qoopido.register("polyfill/object/keys",e)}(function(){"use strict";return Object.keys||(Object.keys=function(e){if(e!==Object(e))throw new TypeError("Object.keys called on non-object");var t,o=[];for(t in e)Object.prototype.hasOwnProperty.call(e,t)&&o.push(t);return o}),Object.keys});