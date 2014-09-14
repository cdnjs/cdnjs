/*!
* Qoopido.js library v3.5.3, 2014-8-14
* https://github.com/dlueth/qoopido.js
* (c) 2014 Dirk Lueth
* Dual licensed under MIT and GPL
*/
!function(e){window.qoopido.register("polyfill/window/customevent",e)}(function(e,t,n,o,r,u,b){"use strict";if(!r.CustomEvent){var c=u.createEvent?function(e,t,n){var o=u.createEvent("Event"),r=t&&t.bubbles!==b?t.bubbles:!1,c=t&&t.cancelable!==b?t.cancelable:!0;return o.initEvent(e,r,c),o.detail=n,o}:function(e,t,n){var o=u.createEventObject();return o.type=e,o.bubbles=t&&t.bubbles!==b?t.bubbles:!1,o.cancelable=t&&t.cancelable!==b?t.cancelable:!0,o.detail=n,o};r.CustomEvent=Window.prototype.CustomEvent=function(e,t,n){if(!e)throw new Error("Not enough arguments");return c(e,t,n)}}return r.CustomEvent});