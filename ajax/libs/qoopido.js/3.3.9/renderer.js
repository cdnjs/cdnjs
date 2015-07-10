/*!
* Qoopido.js library v3.3.9, 2014-6-3
* https://github.com/dlueth/qoopido.js
* (c) 2014 Dirk Lueth
* Dual licensed under MIT and GPL
*/
!function(e){window.qoopido.registerSingleton("renderer",e,["./emitter","./support","./dom/element"])}(function(e,t,i,n,r,a){"use strict";function o(e){return r.setTimeout(e,_)}function c(){var e=this;a[v]?d&&(u=(new Date).getTime(),e.paused=!0,k(d),d=null,e.emit("suspend")):d||(e.paused=!1,u&&(s=(new Date).getTime()-u,f+=s,l+=s,e.emit("resume",(new Date).getTime()-s)),e._tick())}var m,u,s,d,l,g,f,p,h=e.support,w=e["dom/element"].create(a),T=r[h.getMethod("requestAnimationFrame")]||o,k=r[h.getMethod("cancelAnimationFrame")]||clearTimeout,v=h.getProperty("hidden",a),D=60,_=1e3/D,y=0;return m=e.emitter.extend({framerate:0,ratio:1,paused:!1,_tick:null,_constructor:function(){var e=this;l=f=(new Date).getTime(),e._tick=function(){e.paused===!1&&(g=(new Date).getTime(),p=g-l,e.ratio=(g-f)/_,e.framerate=D/e.ratio,p>=1e3&&(l=g,y=0),f=g,y+=1,e.emit("tick",e.framerate,e.ratio),d=T(e._tick))},w.on("".concat("visibilitychange ",h.getPrefix()[0],"visibilitychange"),function(){c.call(e)}),c.call(e)}})});