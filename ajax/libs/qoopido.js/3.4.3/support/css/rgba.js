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
!function(o){window.qoopido.register("support/css/rgba",o,["../../support"])}(function(o,r,t,s,e,a){"use strict";var c=o.support;return c.addTest("/css/rgba",function(o){var r=c.pool?c.pool.obtain("div"):a.createElement("div");try{r.style.backgroundColor="rgba(0,0,0,.5)"}catch(t){}/rgba/.test(r.style.backgroundColor)?o.resolve():o.reject(),r.dispose&&r.dispose()})});