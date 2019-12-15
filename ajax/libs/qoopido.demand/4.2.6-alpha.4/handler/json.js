/**! Qoopido.demand 4.2.6-alpha.3 | https://github.com/dlueth/qoopido.demand | (c) 2018 Dirk Lueth */
!function(){"use strict";provide(["/demand/abstract/handler"],function(n){var t=/^application\/json/;function e(){}return e.prototype={validate:function(n){return t.test(n)},onPreRequest:function(n){var t=n.url.pathname;n.url.pathname=".json"!==t.slice(-".json".length)?t+".json":t},process:function(n){var t=JSON.parse(n.source);provide(function(){return t})}},new(e.extends(n))})}();
//# sourceMappingURL=json.js.map
