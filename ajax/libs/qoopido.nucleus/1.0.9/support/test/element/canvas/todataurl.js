/*! /support/test/element/canvas/todataurl 1.0.9 | http://nucleus.qoopido.com | (c) 2016 Dirk Lueth */
!function(e){"use strict";function n(n,t){var r=n.defer();return t.then(function(){var n=e.createElement("canvas");"toDataURL"in n?r.resolve():r.reject()},r.reject),r.pledge}provide(["/demand/pledge","../canvas"],n)}(document);
//# sourceMappingURL=todataurl.js.map
