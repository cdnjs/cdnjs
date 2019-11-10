!function(e){"use strict";provide(["/demand/pledge","../video"],function(n,t){var c=n.defer();return t.then(function(){e.createElement("video").canPlayType('video/webm; codecs="vp8, vorbis"')?c.resolve():c.reject()},c.reject),c.pledge})}(document);
//# sourceMappingURL=webm.js.map
