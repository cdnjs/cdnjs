/*
 AngularJS v1.7.0
 (c) 2010-2018 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(n,e){'use strict';function m(b,k,l){var a=l.baseHref(),h=b[0];return function(f,c,d){var b,g;d=d||{};g=d.expires;b=e.isDefined(d.path)?d.path:a;e.isUndefined(c)&&(g="Thu, 01 Jan 1970 00:00:00 GMT",c="");e.isString(g)&&(g=new Date(g));c=encodeURIComponent(f)+"="+encodeURIComponent(c);c=c+(b?";path="+b:"")+(d.domain?";domain="+d.domain:"");c+=g?";expires="+g.toUTCString():"";c+=d.secure?";secure":"";d=c.length+1;4096<d&&k.warn("Cookie '"+f+"' possibly not set or overflowed because it was too large ("+
d+" > 4096 bytes)!");h.cookie=c}}e.module("ngCookies",["ng"]).info({angularVersion:"1.7.0"}).provider("$cookies",[function(){var b=this.defaults={};this.$get=["$$cookieReader","$$cookieWriter",function(k,l){return{get:function(a){return k()[a]},getObject:function(a){return(a=this.get(a))?e.fromJson(a):a},getAll:function(){return k()},put:function(a,h,f){l(a,h,f?e.extend({},b,f):b)},putObject:function(a,b,f){this.put(a,e.toJson(b),f)},remove:function(a,h){l(a,void 0,h?e.extend({},b,h):b)}}}]}]);m.$inject=
["$document","$log","$browser"];e.module("ngCookies").provider("$$cookieWriter",function(){this.$get=m})})(window,window.angular);
//# sourceMappingURL=angular-cookies.min.js.map
