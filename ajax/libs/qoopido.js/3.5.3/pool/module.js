/*!
* Qoopido.js library v3.5.3, 2014-8-14
* https://github.com/dlueth/qoopido.js
* (c) 2014 Dirk Lueth
* Dual licensed under MIT and GPL
*/
!function(o){window.qoopido.register("pool/module",o,["../pool","../function/unique/uuid"])}(function(o,u){"use strict";var n=o["function/unique/uuid"],t=o.pool.extend({_module:null,_destroy:null,_constructor:function(o,e,i){var r=this,l=o._quid||(o._quid=n()),d=i&&(u.pool||(u.pool={}))&&(u.pool.module||(u.pool.module={}));return i===!0&&d[l]?d[l]:(t._parent._constructor.call(r,e),r._module=o,"function"==typeof o._destroy&&(r._destroy=function(o){o._destroy()}),i===!0&&(d[l]=r),void 0)},_dispose:function(o){return o},_obtain:function(){return this._module.create.apply(this._module,arguments)}});return t});