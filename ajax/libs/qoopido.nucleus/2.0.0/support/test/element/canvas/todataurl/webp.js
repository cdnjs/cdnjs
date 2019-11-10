/*! /support/test/element/canvas/todataurl/webp 2.0.0 | http://nucleus.qoopido.com | (c) 2016 Dirk Lueth */
!function(e){"use strict";function t(t,a){var n=t.defer();return a.then(function(){var t=e.createElement("canvas");0===t.toDataURL("image/webp").indexOf("data:image/webp")?n.resolve():n.reject()},n.reject),n.pledge}provide(["/demand/pledge","../todataurl"],t)}(document);
//# sourceMappingURL=webp.js.map
