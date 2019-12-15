/**! Qoopido.demand 4.2.5 | https://github.com/dlueth/qoopido.demand | (c) 2018 Dirk Lueth */
!function(){"use strict";function n(n){function t(){}var e=".json",r=/^application\/json/;return t.prototype={validate:function(n){return r.test(n)},onPreRequest:function(n){var t=n.url.pathname;n.url.pathname=t.slice(-e.length)!==e?t+e:t},process:function(n){var t=JSON.parse(n.source);provide(function(){return t})}},new(t.extends(n))}provide(["/demand/abstract/handler"],n)}();
//# sourceMappingURL=json.js.map
