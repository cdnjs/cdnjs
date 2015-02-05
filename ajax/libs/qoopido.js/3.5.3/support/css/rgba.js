/*!
* Qoopido.js library v3.5.3, 2014-8-14
* https://github.com/dlueth/qoopido.js
* (c) 2014 Dirk Lueth
* Dual licensed under MIT and GPL
*/
!function(o){window.qoopido.register("support/css/rgba",o,["../../support"])}(function(o,r,t,s,e,a){"use strict";var c=o.support;return c.addTest("/css/rgba",function(o){var r=c.pool?c.pool.obtain("div"):a.createElement("div");try{r.style.backgroundColor="rgba(0,0,0,.5)"}catch(t){}/rgba/.test(r.style.backgroundColor)?o.resolve():o.reject(),r.dispose&&r.dispose()})});