!function(e){"use strict";provide(["/demand/pledge","../video"],function(o,t){var n=o.defer();return t.then(function(){e.createElement("video").canPlayType('video/ogg; codecs="theora, vorbis"')?n.resolve():n.reject()},n.reject),n.pledge})}(document);
//# sourceMappingURL=ogg.js.map
