/**! Qoopido.demand 4.0.4 (MIT OR GPL-3.0+) | https://github.com/dlueth/qoopido.demand | (c) 2017 Dirk Lueth */
!function(){"use strict";function n(n){function t(){}var e=/^application\/json/;return t.prototype={validate:function(n){return e.test(n)},onPreRequest:function(){var n=this.url;this.url=".json"!==n.slice(-5)?n+".json":n},process:function(){var n=JSON.parse(this.source);provide(function(){return n})}},new(t.extends(n))}provide(["/demand/abstract/handler"],n)}();
//# sourceMappingURL=json.js.map
