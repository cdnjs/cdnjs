/*
 * @license
 * angular-socket-io v0.7.0
 * (c) 2014 Brian Ford http://briantford.com
 * License: MIT
 */
angular.module("btford.socket-io",[]).provider("socketFactory",function(){"use strict";var n="socket:";this.$get=["$rootScope","$timeout",function(t,e){var r=function(n,t){return t?function(){var r=arguments;e(function(){t.apply(n,r)},0)}:angular.noop};return function(e){e=e||{};var o=e.ioSocket||io.connect(),c=void 0===e.prefix?n:e.prefix,u=e.scope||t,i=function(n,t){o.on(n,t.__ng=r(o,t))},a=function(n,t){o.once(n,t.__ng=r(o,t))},s={on:i,addListener:i,once:a,emit:function(n,t,e){var c=arguments.length-1,e=arguments[c];return"function"==typeof e&&(e=r(o,e),arguments[c]=e),o.emit.apply(o,arguments)},removeListener:function(n,t){return t&&t.__ng&&(arguments[1]=t.__ng),o.removeListener.apply(o,arguments)},removeAllListeners:function(){return o.removeAllListeners.apply(o,arguments)},disconnect:function(n){return o.disconnect(n)},connect:function(){return o.connect()},forward:function(n,t){n instanceof Array==!1&&(n=[n]),t||(t=u),n.forEach(function(n){var e=c+n,u=r(o,function(){Array.prototype.unshift.call(arguments,e),t.$broadcast.apply(t,arguments)});t.$on("$destroy",function(){o.removeListener(n,u)}),o.on(n,u)})}};return s}}]});
//# sourceMappingURL=socket.min.js.map