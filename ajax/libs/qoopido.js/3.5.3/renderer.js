/*!
* Qoopido.js library v3.5.3, 2014-8-14
* https://github.com/dlueth/qoopido.js
* (c) 2014 Dirk Lueth
* Dual licensed under MIT and GPL
*/
!function(e){window.qoopido.registerSingleton("renderer",e,["./emitter","./support","./dom/element"])}(function(e,t,i,n,r,a){"use strict";function o(e){return r.setTimeout(e,D)}function c(){var e=this;a[k]?l&&(m=(new Date).getTime(),e.paused=!0,T(l),l=null,e.emit("suspend")):l||(e.paused=!1,m&&(s=(new Date).getTime()-m,p+=s,d+=s,e.emit("resume",s)),e._tick())}var u,m,s,l,d,g,p,f,h=e.support,_=e["dom/element"].create(a),w=r[h.getMethod("requestAnimationFrame")]||o,T=r[h.getMethod("cancelAnimationFrame")]||clearTimeout,k=h.getProperty("hidden",a),v=60,D=1e3/v,y=0;return u=e.emitter.extend({framerate:0,ratio:1,paused:!1,_tick:null,_constructor:function(){var e=this;u._parent._constructor.call(e),d=p=(new Date).getTime(),e._tick=function(){e.paused===!1&&(g=(new Date).getTime(),f=g-d,e.ratio=(g-p)/D,e.framerate=v/e.ratio,f>=1e3&&(d=g,y=0),p=g,y+=1,e.emit("tick",e.framerate,e.ratio),l=w(e._tick))},_.on("".concat("visibilitychange ",h.getPrefix()[0],"visibilitychange"),function(){c.call(e)}),c.call(e)}})});