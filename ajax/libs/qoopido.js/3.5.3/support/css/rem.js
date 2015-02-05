/*!
* Qoopido.js library v3.5.3, 2014-8-14
* https://github.com/dlueth/qoopido.js
* (c) 2014 Dirk Lueth
* Dual licensed under MIT and GPL
*/
!function(e){window.qoopido.register("support/css/rem",e,["../../support"])}(function(e,t,o,s,r,i){"use strict";var n=e.support;return n.addTest("/css/rem",function(e){var t=n.pool?n.pool.obtain("div"):i.createElement("div");try{t.style.fontSize="3rem"}catch(o){}/rem/.test(t.style.fontSize)?e.resolve():e.reject(),t.dispose&&t.dispose()})});