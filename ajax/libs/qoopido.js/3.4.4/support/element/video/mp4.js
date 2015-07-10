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
!function(e){window.qoopido.register("support/element/video/mp4",e,["../../../support","../video"])}(function(e,o,t,i,n,p){"use strict";var r=e.support;return r.addTest("/element/video/mp4",function(o){e["support/element/video"]().then(function(){var e=r.pool?r.pool.obtain("video"):p.createElement("video");e.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"')?o.resolve():o.reject(),e.dispose&&e.dispose()},function(){o.reject()})})});