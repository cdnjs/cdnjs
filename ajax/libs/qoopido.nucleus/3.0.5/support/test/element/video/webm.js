!function(e){"use strict";function n(n,t){var c=n.defer();return t.then(function(){e.createElement("video").canPlayType('video/webm; codecs="vp8, vorbis"')?c.resolve():c.reject()},c.reject),c.pledge}provide(["/demand/pledge","../video"],n)}(document);
//# sourceMappingURL=webm.js.map
