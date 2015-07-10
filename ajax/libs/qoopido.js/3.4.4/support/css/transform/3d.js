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
!function(t){window.qoopido.register("support/css/transform/3d",t,["../../../support","../transform"])}(function(t,s,r,o,e,n){"use strict";var p=t.support;return p.addTest("/css/transform/3d",function(s){t["support/css/transform"]().then(function(){var r=p.pool?p.pool.obtain("div"):n.createElement("div"),o=t.support.getCssProperty("transform");try{r.style[o]="translate3d(0,0,0)"}catch(e){}/translate3d/.test(r.style[o])?s.resolve():s.reject(),r.dispose&&r.dispose()},function(){s.reject()})})});