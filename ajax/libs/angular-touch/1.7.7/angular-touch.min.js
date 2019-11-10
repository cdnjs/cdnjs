/*
 AngularJS v1.7.7
 (c) 2010-2018 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(t,p){'use strict';function q(g,h,s){n.directive(g,["$parse","$swipe",function(a,b){return function(c,e,f){function k(a){if(!d)return!1;var b=Math.abs(a.y-d.y);a=(a.x-d.x)*h;return l&&75>b&&0<a&&30<a&&.3>b/a}var m=a(f[g]),d,l,r=["touch"];p.isDefined(f.ngSwipeDisableMouse)||r.push("mouse");b.bind(e,{start:function(a,b){d=a;l=!0},cancel:function(a){l=!1},end:function(a,b){k(a)&&c.$apply(function(){e.triggerHandler(s);m(c,{$event:b})})}},r)}}])}var n=p.module("ngTouch",[]);n.info({angularVersion:"1.7.7"});
n.factory("$swipe",[function(){function g(a){a=a.originalEvent||a;var b=a.touches&&a.touches.length?a.touches:[a];a=a.changedTouches&&a.changedTouches[0]||b[0];return{x:a.clientX,y:a.clientY}}function h(a,b){var c=[];p.forEach(a,function(a){(a=n[a][b])&&c.push(a)});return c.join(" ")}var n={mouse:{start:"mousedown",move:"mousemove",end:"mouseup"},touch:{start:"touchstart",move:"touchmove",end:"touchend",cancel:"touchcancel"},pointer:{start:"pointerdown",move:"pointermove",end:"pointerup",cancel:"pointercancel"}};
return{bind:function(a,b,c){var e,f,k,m,d=!1;c=c||["mouse","touch","pointer"];a.on(h(c,"start"),function(a){k=g(a);d=!0;f=e=0;m=k;b.start&&b.start(k,a)});var l=h(c,"cancel");if(l)a.on(l,function(a){d=!1;b.cancel&&b.cancel(a)});a.on(h(c,"move"),function(a){if(d&&k){var c=g(a);e+=Math.abs(c.x-m.x);f+=Math.abs(c.y-m.y);m=c;10>e&&10>f||(f>e?(d=!1,b.cancel&&b.cancel(a)):(a.preventDefault(),b.move&&b.move(c,a)))}});a.on(h(c,"end"),function(a){d&&(d=!1,b.end&&b.end(g(a),a))})}}}]);q("ngSwipeLeft",-1,"swipeleft");
q("ngSwipeRight",1,"swiperight")})(window,window.angular);
//# sourceMappingURL=angular-touch.min.js.map
