/*
 AngularJS v1.3.16
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(p,g,n){'use strict';g.module("ngCookies",["ng"]).factory("$cookies",["$rootScope","$browser",function(e,b){var c={},f={},h,k=!1,l=g.copy,m=g.isUndefined;b.addPollFn(function(){var a=b.cookies();h!=a&&(h=a,l(a,f),l(a,c),k&&e.$apply())})();k=!0;e.$watch(function(){var a,d,e;for(a in f)m(c[a])&&(b.cookies(a,n),delete f[a]);for(a in c)d=c[a],g.isString(d)||(d=""+d,c[a]=d),d!==f[a]&&(b.cookies(a,d),f[a]=d,e=!0);if(e)for(a in d=b.cookies(),c)c[a]!==d[a]&&(m(d[a])?(delete c[a],delete f[a]):c[a]=
f[a]=d[a])});return c}]).factory("$cookieStore",["$cookies",function(e){return{get:function(b){return(b=e[b])?g.fromJson(b):b},put:function(b,c){e[b]=g.toJson(c)},remove:function(b){delete e[b]}}}])})(window,window.angular);
//# sourceMappingURL=angular-cookies.min.js.map
