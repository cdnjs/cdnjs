/*! /support/test/element/canvas/todataurl/png 1.0.9 | http://nucleus.qoopido.com | (c) 2016 Dirk Lueth */
!function(e){"use strict";function t(t,n){var a=t.defer();return n.then(function(){var t=e.createElement("canvas");0===t.toDataURL("image/png").indexOf("data:image/png")?a.resolve():a.reject()},a.reject),a.pledge}provide(["/demand/pledge","../todataurl"],t)}(document);
//# sourceMappingURL=png.js.map
