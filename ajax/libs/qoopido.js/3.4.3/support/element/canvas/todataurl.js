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
!function(t){window.qoopido.register("support/element/canvas/todataurl",t,["../../../support","../canvas"])}(function(t,e,n,o,a,s,r){"use strict";var c=t.support;return c.addTest("/element/canvas/todataurl",function(e){t["support/element/canvas"]().then(function(){var t=c.pool?c.pool.obtain("canvas"):s.createElement("canvas");t.toDataURL!==r?e.resolve():e.reject(),t.dispose&&t.dispose()},function(){e.reject()}).done()})});