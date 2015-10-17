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
!function(t){window.qoopido.register("function/proximity",t)}(function(t,a,o,r,e,y,x){"use strict";return function(t,a){var o=!1;return t="object"==typeof t&&null!==t?t:{x:x,y:x},a="object"==typeof a&&null!==a?a:{x:x,y:x},t.x!==x&&t.y!==x&&a.x!==x&&a.y!==x&&(t.x=parseFloat(t.x),t.y=parseFloat(t.y),a.x=parseFloat(a.x),a.y=parseFloat(a.y),o={x:parseFloat(Math.abs(a.x-t.x)),y:parseFloat(Math.abs(a.y-t.y)),total:parseFloat(Math.sqrt(Math.pow(a.x-t.x,2)+Math.pow(a.y-t.y,2)))}),o}});