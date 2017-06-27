/*!
* Qoopido.js library v3.5.3, 2014-8-14
* https://github.com/dlueth/qoopido.js
* (c) 2014 Dirk Lueth
* Dual licensed under MIT and GPL
*/
!function(e){window.qoopido.registerSingleton("url",e,["./base"])}(function(e,t,n,o,r,c){"use strict";function i(e){var t=c.createElement("a");return t.href=e||"",t}var a,s,u=new RegExp("[?&]?([^=]+)=([^&]*)","g");try{a=location}catch(f){a=i()}return s=new RegExp("".concat("^",a.protocol,"//",a.hostname),"i"),e.base.extend({resolve:function(e){return i(e).href},redirect:function(e,t){t=t||r,t.location.href=this.resolve(e)},getParameter:function(e){for(var t,n={},o=i(e).search.split("+").join(" ");t=u.exec(o);)n[decodeURIComponent(t[1])]=decodeURIComponent(t[2]);return n},isLocal:function(e){return s.test(this.resolve(e))}})});