/*!
* Qoopido.js library v3.5.3, 2014-8-14
* https://github.com/dlueth/qoopido.js
* (c) 2014 Dirk Lueth
* Dual licensed under MIT and GPL
*/
!function(e){window.qoopido.register("support/element/canvas",e,["../../support"])}(function(e,t,o,n,s,a){"use strict";var r=e.support;return r.addTest("/element/canvas",function(e){var t=r.pool?r.pool.obtain("canvas"):a.createElement("canvas");t.getContext&&t.getContext("2d")?e.resolve():e.reject(),t.dispose&&t.dispose()})});