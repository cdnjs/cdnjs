/*!
* Qoopido.js library v3.6.5, 2015-7-1
* https://github.com/dlueth/qoopido.js
* (c) 2015 Dirk Lueth
* Dual licensed under MIT and GPL
*/
!function(t){window.qoopido.register("support/css/transform/3d",t,["../../../support","../transform"])}(function(t,s,r,o,e,n){"use strict";var p=t.support;return p.addTest("/css/transform/3d",function(s){t["support/css/transform"]().then(function(){var r=p.pool?p.pool.obtain("div"):n.createElement("div"),o=t.support.getCssProperty("transform");try{r.style[o]="translate3d(0,0,0)"}catch(e){}/translate3d/.test(r.style[o])?s.resolve():s.reject(),r.dispose&&r.dispose()},function(){s.reject()})})});