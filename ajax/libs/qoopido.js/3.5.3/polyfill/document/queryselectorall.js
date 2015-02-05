/*!
* Qoopido.js library v3.5.3, 2014-8-14
* https://github.com/dlueth/qoopido.js
* (c) 2014 Dirk Lueth
* Dual licensed under MIT and GPL
*/
!function(e){window.qoopido.register("polyfill/document/queryselectorall",e)}(function(e,t,r,s,l,o){"use strict";return o.querySelectorAll||(o.querySelectorAll=function(e){var t,r=l.document.getElementsByTagName("script")[0],s=o.createElement("style"),n=[];for(r.parentNode.insertBefore(s,r),o._qsa=[],s.styleSheet.cssText=e+"{x-qsa:expression(document._qsa && document._qsa.push(this))}",l.scrollBy(0,0),s.parentNode.removeChild(s);o._qsa.length;)t=o._qsa.shift(),t.style.removeAttribute("x-qsa"),n.push(t);try{delete o._qsa}catch(c){o._qsa=null}return n}),o.querySelectorAll});