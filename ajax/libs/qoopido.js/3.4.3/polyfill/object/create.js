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
!function(e,t){if(t.register){var r=[];Object.defineProperties||r.push("./defineproperties"),t.register("polyfill/object/create",e,r)}else(t.modules=t.modules||{})["polyfill/object/create"]=e()}(function(){"use strict";return Object.create||(Object.create=function(e,t){function r(){}if("object"!=typeof e)throw new TypeError;r.prototype=e;var o=new r;if(e&&(o.constructor=r),arguments.length>1){if(t!==Object(t))throw new TypeError;Object.defineProperties(o,t)}return o}),Object.create},window.qoopido=window.qoopido||{});