/*! /support/test/element/canvas/todataurl/jpeg 1.0.9 | http://nucleus.qoopido.com | (c) 2016 Dirk Lueth */
!function(e){"use strict";function t(t,a){var n=t.defer();return a.then(function(){var t=e.createElement("canvas");0===t.toDataURL("image/jpeg").indexOf("data:image/jpeg")?n.resolve():n.reject()},n.reject),n.pledge}provide(["/demand/pledge","../todataurl"],t)}(document);
//# sourceMappingURL=jpeg.js.map
