/*!
* Qoopido.js library v3.5.7, 2014-10-14
* https://github.com/dlueth/qoopido.js
* (c) 2014 Dirk Lueth
* Dual licensed under MIT and GPL
*/
!function(t){window.qoopido.register("polyfill/string/trim",t)}(function(){"use strict";if(!String.prototype.trim){var t=new RegExp("^\\s+|\\s+$","g");String.prototype.trim=function(){return this.replace(t,"")}}return String.prototype.trim});