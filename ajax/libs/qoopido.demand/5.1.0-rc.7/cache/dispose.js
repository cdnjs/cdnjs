/**! Qoopido.demand 5.1.0-rc.7 | https://github.com/dlueth/qoopido.demand | (c) 2018 Dirk Lueth */
!function(){"use strict";provide(["/demand/function/iterate","./states"],function(e,n){function s(e,c){return e.accessed<c.accessed?-1:e.accessed>c.accessed?1:0}return function(e){var c,t=n();for(t.sort(s);0<e&&t.length;)e-=(c=t.shift()).size,demand.cache.clear(c.id)}})}();
//# sourceMappingURL=dispose.js.map
