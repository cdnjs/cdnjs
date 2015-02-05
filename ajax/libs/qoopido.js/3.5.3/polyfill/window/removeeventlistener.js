/*!
* Qoopido.js library v3.5.3, 2014-8-14
* https://github.com/dlueth/qoopido.js
* (c) 2014 Dirk Lueth
* Dual licensed under MIT and GPL
*/
!function(e){var t=[];Array.prototype.indexOf||t.push("../array/indexof"),window.qoopido.register("polyfill/window/removeeventlistener",e,t)}(function(e,t,n,r,o){"use strict";return o.removeEventListener||(o.removeEventListener=Window.prototype.removeEventListener=HTMLDocument.prototype.removeEventListener=Element.prototype.removeEventListener=function(e,t){var n=this;if(n._events&&n._events[e]&&n._events[e].list){var r=n._events[e].list.indexOf(t);r>-1&&(n._events[e].list.splice(r,1),n._events[e].list.length||n.detachEvent&&n.detachEvent("on"+e,n._events[e]))}}),o.removeEventListener});