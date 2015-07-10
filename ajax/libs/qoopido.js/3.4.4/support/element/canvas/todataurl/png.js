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
!function(t){window.qoopido.register("support/element/canvas/todataurl/png",t,["../../../../support","../todataurl"])}(function(t,e,a,n,o,r){"use strict";var s=t.support;return s.addTest("/element/canvas/todataurl/png",function(e){t["support/element/canvas/todataurl"]().then(function(){var t=s.pool?s.pool.obtain("canvas"):r.createElement("canvas");0===t.toDataURL("image/png").indexOf("data:image/png")?e.resolve():e.reject(),t.dispose&&t.dispose()},function(){e.reject()})})});