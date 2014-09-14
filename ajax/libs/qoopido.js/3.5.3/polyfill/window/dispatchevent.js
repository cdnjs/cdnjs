/*!
* Qoopido.js library v3.5.3, 2014-8-14
* https://github.com/dlueth/qoopido.js
* (c) 2014 Dirk Lueth
* Dual licensed under MIT and GPL
*/
!function(t){window.qoopido.register("polyfill/window/dispatchevent",t)}(function(t,e,n,o,r){"use strict";return r.dispatchEvent||(r.dispatchEvent=Window.prototype.dispatchEvent=HTMLDocument.prototype.dispatchEvent=Element.prototype.dispatchEvent=function(t){if(!arguments.length)throw new Error("Not enough arguments");if(!t||"string"!=typeof t.type)throw new Error("DOM Events Exception 0");var e=this,n=t.type;try{if(!t.bubbles){t.cancelBubble=!0;var o=function(t){t.cancelBubble=!0,(e||r).detachEvent("on"+n,o)};this.attachEvent("on"+n,o)}this.fireEvent("on"+n,t)}catch(i){t.target=e;do t.currentTarget=e,e._events&&e._events[n]&&e._events[n].call(e,t),e["on"+n]&&e["on"+n].call(e,t),e=9===e.nodeType?e.parentWindow:e.parentNode;while(e&&!t.cancelBubble)}return!0}),r.dispatchEvent});