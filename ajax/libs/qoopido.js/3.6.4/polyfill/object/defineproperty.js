/*!
* Qoopido.js library v3.6.4, 2015-4-29
* https://github.com/dlueth/qoopido.js
* (c) 2015 Dirk Lueth
* Dual licensed under MIT and GPL
*/
!function(e,t){t.register?t.register("polyfill/object/defineproperty",e):(t.modules=t.modules||{})["polyfill/object/defineproperty"]=e()}(function(){"use strict";if(!Object.defineProperty||!function(){try{return Object.defineProperty({},"x",{}),!0}catch(e){return!1}}()){var e=Object.defineProperty,t=Object.prototype.__defineGetter__,r=Object.prototype.__defineSetter__;Object.defineProperty=function(o,n,i){if(e)try{return e(o,n,i)}catch(c){}if(o!==Object(o))throw new TypeError("Object.defineProperty called on non-object");return t&&"get"in i&&t.call(o,n,i.get),r&&"set"in i&&r.call(o,n,i.set),"value"in i&&(o[n]=i.value),o}}return Object.defineProperty},window.qoopido=window.qoopido||{});