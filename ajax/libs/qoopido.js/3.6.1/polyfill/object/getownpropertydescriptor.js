/*!
* Qoopido.js library v3.6.1, 2015-2-5
* https://github.com/dlueth/qoopido.js
* (c) 2015 Dirk Lueth
* Dual licensed under MIT and GPL
*/
!function(r,e){e.register?e.register("polyfill/object/getownpropertydescriptor",r):(e.modules=e.modules||{})["polyfill/object/getownpropertydescriptor"]=r()}(function(){"use strict";if(!Object.getOwnPropertyDescriptor||!function(){try{return Object.getOwnPropertyDescriptor({x:0},"x"),!0}catch(r){return!1}}()){var r=Object.getOwnPropertyDescriptor;Object.getOwnPropertyDescriptor=function(e,t){if(e!==Object(e))throw new TypeError;try{return r.call(Object,e,t)}catch(o){}return Object.prototype.hasOwnProperty.call(e,t)?{value:e[t],enumerable:!0,writable:!0,configurable:!0}:void 0}}return Object.getOwnPropertyDescriptor},window.qoopido=window.qoopido||{});