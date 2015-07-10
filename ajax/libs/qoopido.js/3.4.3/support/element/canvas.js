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
!function(e){window.qoopido.register("support/element/canvas",e,["../../support"])}(function(e,t,o,n,s,a){"use strict";var r=e.support;return r.addTest("/element/canvas",function(e){var t=r.pool?r.pool.obtain("canvas"):a.createElement("canvas");t.getContext&&t.getContext("2d")?e.resolve():e.reject(),t.dispose&&t.dispose()})});