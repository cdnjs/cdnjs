/*!
* Qoopido.js library v3.4.3, 2014-6-11
* https://github.com/dlueth/qoopido.js
* (c) 2014 Dirk Lueth
* Dual licensed under MIT and GPL
*//*!
* Qoopido.js library
*
* version: 3.4.3
* date:    2014-6-11
* author:  Dirk Lueth <info@qoopido.com>
* website: https://github.com/dlueth/qoopido.js
*
* Copyright (c) 2014 Dirk Lueth
*
* Dual licensed under the MIT and GPL licenses.
* - http://www.opensource.org/licenses/mit-license.php
* - http://www.gnu.org/copyleft/gpl.html
*/
!function(e,o){o.register?o.register("polyfill/object/getownpropertynames",e):(o.modules=o.modules||{})["polyfill/object/getownpropertynames"]=e()}(function(){"use strict";return Object.getOwnPropertyNames||(Object.getOwnPropertyNames=function(e){if(e!==Object(e))throw new TypeError("Object.getOwnPropertyNames called on non-object");var o,t=[];for(o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.push(o);return t}),Object.getOwnPropertyNames},window.qoopido=window.qoopido||{});