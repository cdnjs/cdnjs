/**! Qoopido.demand 5.0.1 | https://github.com/dlueth/qoopido.demand | (c) 2018 Dirk Lueth */
!function(){"use strict";provide(["/demand/abstract/handler"],function(n){function t(){}var e=".json",r=/^application\/json/;return t.prototype={validate:function(n){return r.test(n)},onPreRequest:function(n){var t=n.url.pathname;n.url.pathname=t.slice(-e.length)!==e?t+e:t},process:function(n){var t=JSON.parse(n.source);provide(function(){return t})}},new(t.extends(n))})}();
//# sourceMappingURL=json.js.map
