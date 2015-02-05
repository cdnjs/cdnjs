/*!
* Qoopido.js library v3.5.3, 2014-8-14
* https://github.com/dlueth/qoopido.js
* (c) 2014 Dirk Lueth
* Dual licensed under MIT and GPL
*/
!function(t){var e=["../emitter"];window.matchMedia||e.push("../polyfill/window/matchmedia"),window.qoopido.register("component/sense",t,e)}(function(t,e,n,i,c){"use strict";function o(){var t=this,e=t.mql;t.emit(e.matches===!0?"matched":"dematched")}var a,r={};return a=t.emitter.extend({mql:null,_constructor:function(t){var e=this,n=e.mql=r[t]||(r[t]=c.matchMedia(t)),i=function(){o.call(e)};a._parent._constructor.call(e),n.addListener(i),c.setTimeout(i,0)},matches:function(){return this.mql.matches}})});