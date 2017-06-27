/*!
* Qoopido.js library v3.5.3, 2014-8-14
* https://github.com/dlueth/qoopido.js
* (c) 2014 Dirk Lueth
* Dual licensed under MIT and GPL
*/
!function(e){window.qoopido.register("support/element/canvas/todataurl/jpeg",e,["../../../../support","../todataurl"])}(function(e,t,a,o,n,r){"use strict";var s=e.support;return s.addTest("/element/canvas/todataurl/jpeg",function(t){e["support/element/canvas/todataurl"]().then(function(){var e=s.pool?s.pool.obtain("canvas"):r.createElement("canvas");0===e.toDataURL("image/jpeg").indexOf("data:image/jpeg")?t.resolve():t.reject(),e.dispose&&e.dispose()},function(){t.reject()})})});