/**! Qoopido.demand 4.1.0 | https://github.com/dlueth/qoopido.demand | (c) 2017 Dirk Lueth */
!function(){"use strict";function n(n){function t(){}var e=/^application\/json/;return t.prototype={validate:function(n){return e.test(n)},onPreRequest:function(n){var t=n.url;n.url=".json"!==t.slice(-5)?t+".json":t},process:function(n){var t=JSON.parse(n.source);provide(function(){return t})}},new(t.extends(n))}provide(["/demand/abstract/handler"],n)}();
//# sourceMappingURL=json.js.map
