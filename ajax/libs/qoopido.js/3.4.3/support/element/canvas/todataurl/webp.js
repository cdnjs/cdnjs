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
!function(e){window.qoopido.register("support/element/canvas/todataurl/webp",e,["../../../../support","../todataurl"])}(function(e,t,a,o,n,r){"use strict";var s=e.support;return s.addTest("/element/canvas/todataurl/webp",function(t){e["support/element/canvas/todataurl"]().then(function(){var e=s.pool?s.pool.obtain("canvas"):r.createElement("canvas");0===e.toDataURL("image/webp").indexOf("data:image/webp")?t.resolve():t.reject(),e.dispose&&e.dispose()},function(){t.reject()}).done()})});