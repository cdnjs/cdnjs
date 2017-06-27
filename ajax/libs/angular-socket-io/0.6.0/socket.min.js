/*
 * @license
 * angular-socket-io v0.6.0
 * (c) 2014 Brian Ford http://briantford.com
 * License: MIT
 */
angular.module("btford.socket-io",[]).provider("socketFactory",function(){"use strict";var n="socket:";this.$get=["$rootScope","$timeout",function(t,e){var o=function(n,t){return t?function(){var o=arguments;e(function(){t.apply(n,o)},0)}:angular.noop};return function(e){e=e||{};var r=e.ioSocket||io.connect(),u=e.prefix||n,c=e.scope||t,i=function(n,t){r.on(n,t.__ng=o(r,t))},a=function(n,t){r.once(n,t.__ng=o(r,t))},s={on:i,addListener:i,once:a,emit:function(n,t,e){var u=arguments.length-1,e=arguments[u];return"function"==typeof e&&(e=o(r,e),arguments[u]=e),r.emit.apply(r,arguments)},removeListener:function(n,t){return t&&t.__ng&&(arguments[1]=t.__ng),r.removeListener.apply(r,arguments)},removeAllListeners:function(){return r.removeAllListeners.apply(r,arguments)},disconnect:function(n){return r.disconnect(n)},forward:function(n,t){n instanceof Array==!1&&(n=[n]),t||(t=c),n.forEach(function(n){var e=u+n,c=o(r,function(n){t.$broadcast(e,n)});t.$on("$destroy",function(){r.removeListener(n,c)}),r.on(n,c)})}};return s}}]});