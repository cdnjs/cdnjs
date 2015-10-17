/*!
* Qoopido.js library v3.6.6, 2015-7-7
* https://github.com/dlueth/qoopido.js
* (c) 2015 Dirk Lueth
* Dual licensed under MIT and GPL
*/
!function(e){window.qoopido.register("support/element/canvas",e,["../../support"])}(function(e,t,o,n,s,a){"use strict";var r=e.support;return r.addTest("/element/canvas",function(e){var t=r.pool?r.pool.obtain("canvas"):a.createElement("canvas");t.getContext&&t.getContext("2d")?e.resolve():e.reject(),t.dispose&&t.dispose()})});