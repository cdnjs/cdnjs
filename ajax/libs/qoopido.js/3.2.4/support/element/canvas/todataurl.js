/*!
* Qoopido.js library v3.2.4, 2014-5-12
* https://github.com/dlueth/qoopido.js
* (c) 2014 Dirk Lueth
* Dual licensed under MIT and GPL
*/
!function(t){window.qoopido.register("support/element/canvas/todataurl",t,["../../../support","../canvas"])}(function(t,e,n,o,a,s,r){"use strict";var c=t.support;return c.addTest("/element/canvas/todataurl",function(e){t["support/element/canvas"]().then(function(){var t=c.pool?c.pool.obtain("canvas"):s.createElement("canvas");t.toDataURL!==r?e.resolve():e.reject(),t.dispose&&t.dispose()},function(){e.reject()}).done()})});