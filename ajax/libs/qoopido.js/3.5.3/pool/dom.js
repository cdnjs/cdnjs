/*!
* Qoopido.js library v3.5.3, 2014-8-14
* https://github.com/dlueth/qoopido.js
* (c) 2014 Dirk Lueth
* Dual licensed under MIT and GPL
*/
!function(o){window.qoopido.register("pool/dom",o,["../pool"])}(function(o,t,e,r,n,i){"use strict";var p=o.pool.extend({_initPool:function(){return{}},_getPool:function(o){var t=this;return"string"!=typeof o&&(o=o.tagName.toLowerCase()),t._pool[o]=t._pool[o]||[]},_dispose:function(o){var t;o.parentNode&&o.parentNode.removeChild(o);for(t in o)if(Object.prototype.hasOwnProperty.call(o,t))try{o.removeAttribute(t)}catch(e){o.property=null}return o},_obtain:function(o){return i.createElement(o)}});return t.pool=t.pool||{},t.pool.dom=p.create(),p});