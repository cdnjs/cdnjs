/**! Qoopido.demand 5.2.7 | https://github.com/dlueth/qoopido.demand | (c) 2020 Dirk Lueth */
!function(){"use strict";provide(["/demand/function/iterate","./states"],(function(e,c){function t(e,c){return e.accessed<c.accessed?-1:e.accessed>c.accessed?1:0}return function(e){var n,s=c();for(s.sort(t);e>0&&s.length;)e-=(n=s.shift()).size,demand.cache.clear(n.id)}}))}();
//# sourceMappingURL=dispose.js.map
