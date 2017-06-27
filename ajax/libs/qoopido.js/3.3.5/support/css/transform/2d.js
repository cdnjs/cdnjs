/*!
* Qoopido.js library v3.3.5, 2014-5-25
* https://github.com/dlueth/qoopido.js
* (c) 2014 Dirk Lueth
* Dual licensed under MIT and GPL
*/
!function(t){window.qoopido.register("support/css/transform/2d",t,["../../../support","../transform"])}(function(t,o,r,s,e,n){"use strict";var p=t.support;return p.addTest("/css/transform/2d",function(o){t["support/css/transform"]().then(function(){var r=p.pool?p.pool.obtain("div"):n.createElement("div"),s=t.support.getCssProperty("transform");try{r.style[s]="rotate(30deg)"}catch(e){}/rotate/.test(r.style[s])?o.resolve():o.reject(),r.dispose&&r.dispose()},function(){o.reject()}).done()})});