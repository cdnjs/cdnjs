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
!function(n){window.qoopido.register("proxy",n,["./base","./function/unique/uuid"])}(function(n){"use strict";return n.base.extend({_constructor:function(t,u){var r=Array.prototype.splice.call(arguments,2),e=function(){return u.apply(t,Array.prototype.slice.call(arguments,0).concat(r))};return e._quid=n["function/unique/uuid"](),e}})});