/*!
* Qoopido.js library v3.5.3, 2014-8-14
* https://github.com/dlueth/qoopido.js
* (c) 2014 Dirk Lueth
* Dual licensed under MIT and GPL
*/
!function(t){window.qoopido.register("support/css/transform/2d",t,["../../../support","../transform"])}(function(t,r,o,s,e,n){"use strict";var p=t.support;return p.addTest("/css/transform/2d",function(r){t["support/css/transform"]().then(function(){var o=p.pool?p.pool.obtain("div"):n.createElement("div"),s=t.support.getCssProperty("transform");try{o.style[s]="rotate(30deg)"}catch(e){}/rotate/.test(o.style[s])?r.resolve():r.reject(),o.dispose&&o.dispose()},function(){r.reject()})})});