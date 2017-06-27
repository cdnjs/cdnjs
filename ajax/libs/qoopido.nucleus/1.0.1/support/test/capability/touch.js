/*! /support/test/capability/touch 1.0.1 | http://nucleus.qoopido.com | (c) 2015 Dirk Lueth */
!function(e,n){"use strict";function o(o){var t=o.defer();return"ontouchstart"in e||"DocumentTouch"in e&&document instanceof DocumentTouch||n.maxTouchPoints>0||n.msMaxTouchPoints>0?t.resolve():t.reject(),t.pledge}provide(["/demand/pledge"],o)}(this,navigator);
//# sourceMappingURL=touch.js.map
