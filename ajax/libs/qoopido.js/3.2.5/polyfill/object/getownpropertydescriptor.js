/*!
* Qoopido.js library v3.2.5, 2014-5-18
* https://github.com/dlueth/qoopido.js
* (c) 2014 Dirk Lueth
* Dual licensed under MIT and GPL
*/
!function(r,e){e.register?e.register("polyfill/object/getownpropertydescriptor",r):(e.modules=e.modules||{})["polyfill/object/getownpropertydescriptor"]=r()}(function(){"use strict";if(!Object.getOwnPropertyDescriptor||!function(){try{return Object.getOwnPropertyDescriptor({x:0},"x"),!0}catch(r){return!1}}()){var r=Object.getOwnPropertyDescriptor;Object.getOwnPropertyDescriptor=function(e,t){if(e!==Object(e))throw new TypeError;try{return r.call(Object,e,t)}catch(o){}return Object.prototype.hasOwnProperty.call(e,t)?{value:e[t],enumerable:!0,writable:!0,configurable:!0}:void 0}}return!0},window.qoopido=window.qoopido||{});