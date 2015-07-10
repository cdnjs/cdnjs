/*!
* Qoopido.js library v3.4.4, 2014-6-15
* https://github.com/dlueth/qoopido.js
* (c) 2014 Dirk Lueth
* Dual licensed under MIT and GPL
*//*!
* Qoopido.js library
*
* version: 3.4.4
* date:    2014-6-15
* author:  Dirk Lueth <info@qoopido.com>
* website: https://github.com/dlueth/qoopido.js
*
* Copyright (c) 2014 Dirk Lueth
*
* Dual licensed under the MIT and GPL licenses.
* - http://www.opensource.org/licenses/mit-license.php
* - http://www.gnu.org/copyleft/gpl.html
*/
!function(o){window.qoopido.register("pool/module",o,["../pool"])}(function(o){"use strict";var t=o.pool.extend({_module:null,_destroy:null,_constructor:function(o,n){var e=this;e._module=o,"function"==typeof o._destroy&&(e._destroy=function(o){o._destroy()}),t._parent._constructor.call(e,n)},_dispose:function(o){return o},_obtain:function(){return this._module.create.apply(this._module,arguments)}});return t});