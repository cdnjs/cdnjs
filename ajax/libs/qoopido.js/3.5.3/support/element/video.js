/*!
* Qoopido.js library v3.5.3, 2014-8-14
* https://github.com/dlueth/qoopido.js
* (c) 2014 Dirk Lueth
* Dual licensed under MIT and GPL
*/
!function(e){window.qoopido.register("support/element/video",e,["../../support"])}(function(e,o,t,i,n,r){"use strict";var p=e.support;return p.addTest("/element/video",function(e){var o=p.pool?p.pool.obtain("video"):r.createElement("video");o.canPlayType?e.resolve():e.reject(),o.dispose&&o.dispose()})});