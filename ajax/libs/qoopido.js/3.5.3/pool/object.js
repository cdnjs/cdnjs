/*!
* Qoopido.js library v3.5.3, 2014-8-14
* https://github.com/dlueth/qoopido.js
* (c) 2014 Dirk Lueth
* Dual licensed under MIT and GPL
*/
!function(e){window.qoopido.register("pool/object",e,["../pool"])}(function(e,t,o,r,n,l){"use strict";var p,i=null===Object.prototype.__proto__,c=i?"__proto__":"prototype",d=i?null:function(){var e=l.createElement("iframe"),t=l.body||l.documentElement;e.style.display="none",t.appendChild(e),e.src="javascript:";var o=e.contentWindow.Object.prototype;return t.removeChild(e),e=null,delete o.constructor,delete o.hasOwnProperty,delete o.propertyIsEnumerable,delete o.isPrototypeOf,delete o.toLocaleString,delete o.toString,delete o.valueOf,o.__proto__=null,o}();return p=e.pool.extend({getModel:function(){return d},_dispose:function(e){var t;e[c]=d;for(t in e)delete e[t];return e},_obtain:function(){return{}}}),t.pool=t.pool||{},t.pool.object=p.create(),p});