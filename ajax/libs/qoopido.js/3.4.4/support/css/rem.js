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
!function(e){window.qoopido.register("support/css/rem",e,["../../support"])}(function(e,t,o,s,r,i){"use strict";var n=e.support;return n.addTest("/css/rem",function(e){var t=n.pool?n.pool.obtain("div"):i.createElement("div");try{t.style.fontSize="3rem"}catch(o){}/rem/.test(t.style.fontSize)?e.resolve():e.reject(),t.dispose&&t.dispose()})});