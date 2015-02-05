/*!
* Qoopido.js library v3.5.3, 2014-8-14
* https://github.com/dlueth/qoopido.js
* (c) 2014 Dirk Lueth
* Dual licensed under MIT and GPL
*/
!function(e){window.qoopido.register("support/element/video/ogg",e,["../../../support","../video"])}(function(e,o,t,i,n,r){"use strict";var s=e.support;return s.addTest("/element/video/ogg",function(o){e["support/element/video"]().then(function(){var e=s.pool?s.pool.obtain("video"):r.createElement("video");e.canPlayType('video/ogg; codecs="theora, vorbis"')?o.resolve():o.reject(),e.dispose&&e.dispose()},function(){o.reject()})})});