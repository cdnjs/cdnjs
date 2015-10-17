/*!
* Qoopido.js library v3.2.8, 2014-5-23
* https://github.com/dlueth/qoopido.js
* (c) 2014 Dirk Lueth
* Dual licensed under MIT and GPL
*/
!function(e){window.qoopido.register("polyfill/document/queryselectorall",e)}(function(e,t,l,s,r,o){"use strict";return o.querySelectorAll||(o.querySelectorAll=function(e){var t,l=o.createElement("style"),s=[];for(o.documentElement.firstChild.appendChild(l),o._qsa=[],l.styleSheet.cssText=e+"{x-qsa:expression(document._qsa && document._qsa.push(this))}",r.scrollBy(0,0),l.parentNode.removeChild(l);o._qsa.length;)t=o._qsa.shift(),t.style.removeAttribute("x-qsa"),s.push(t);try{delete o._qsa}catch(n){o._qsa=null}return s}),!0});