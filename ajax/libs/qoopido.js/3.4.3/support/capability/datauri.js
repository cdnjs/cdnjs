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
!function(e){window.qoopido.register("support/capability/datauri",e,["../../support","../../dom/element"])}(function(e,t,o,i,A,r){"use strict";var a=e.support;return a.addTest("/capability/datauri",function(t){var o=e["dom/element"].create(a.pool?a.pool.obtain("img"):r.createElement("img"));o.one("error load",function(e){"load"===e.type&&1===o.element.width&&1===o.element.height?t.resolve():t.reject(),o.element.dispose&&o.element.dispose()},!1).setAttribute("src","data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==")})});