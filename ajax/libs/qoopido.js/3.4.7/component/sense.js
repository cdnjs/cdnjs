/*!
* Qoopido.js library v3.4.7, 2014-7-21
* https://github.com/dlueth/qoopido.js
* (c) 2014 Dirk Lueth
* Dual licensed under MIT and GPL
*/
!function(t){var e=["../emitter"];window.matchMedia||e.push("../polyfill/window/matchmedia"),window.qoopido.register("component/sense",t,e)}(function(t,e,n,i,c){"use strict";function o(t){var e=this;e.emit(t.matches===!0?"matched":"dematched")}var a,r={};return a=t.emitter.extend({_constructor:function(t){var e=this;a._parent._constructor.call(e),(r[t]||(r[t]=c.matchMedia(t))).addListener(function(t){o.call(e,t)}),c.setTimeout(function(){o.call(e,r[t])},0)}})});