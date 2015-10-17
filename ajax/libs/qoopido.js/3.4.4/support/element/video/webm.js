/*!
* Qoopido.js library v3.4.4, 2014-6-15
* https://github.com/dlueth/qoopido.js
* (c) 2014 Dirk Lueth
* Dual licensed under MIT and GPL
*//*!
* Qoopido.js library
*
* version: 3.4.4
* date:    2014-6-15
* author:  Dirk Lueth <info@qoopido.com>
* website: https://github.com/dlueth/qoopido.js
*
* Copyright (c) 2014 Dirk Lueth
*
* Dual licensed under the MIT and GPL licenses.
* - http://www.opensource.org/licenses/mit-license.php
* - http://www.gnu.org/copyleft/gpl.html
*/
!function(e){window.qoopido.register("support/element/video/webm",e,["../../../support","../video"])}(function(e,o,t,i,n,r){"use strict";var p=e.support;return p.addTest("/element/video/webm",function(o){e["support/element/video"]().then(function(){var e=p.pool?p.pool.obtain("video"):r.createElement("video");e.canPlayType('video/webm; codecs="vp8, vorbis"')?o.resolve():o.reject(),e.dispose&&e.dispose()},function(){o.reject()})})});