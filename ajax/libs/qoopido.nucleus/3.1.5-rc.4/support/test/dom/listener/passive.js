!function(c){"use strict";provide(["/demand/pledge"],function(e){var t=e.defer(),n=""+ +new Date,r=function(){};try{var i=Object.defineProperty({},"passive",{get:function(){t.resolve()}});c.addEventListener(n,r,i),c.removeEventListener(n,r,i)}catch(e){}return t.reject(),t.pledge})}(this);
//# sourceMappingURL=passive.js.map
