/*!
* Qoopido.js library v3.3.5, 2014-5-25
* https://github.com/dlueth/qoopido.js
* (c) 2014 Dirk Lueth
* Dual licensed under MIT and GPL
*/
!function(e){window.qoopido.register("support/element/video/mp4",e,["../../../support","../video"])}(function(e,o,t,n,i,p){"use strict";var d=e.support;return d.addTest("/element/video/mp4",function(o){e["support/element/video"]().then(function(){var e=d.pool?d.pool.obtain("video"):p.createElement("video");e.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"')?o.resolve():o.reject(),e.dispose&&e.dispose()},function(){o.reject()}).done()})});