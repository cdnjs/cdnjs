/**! Qoopido.demand 4.0.0 (MIT OR GPL-3.0+) | https://github.com/dlueth/qoopido.demand | (c) 2017 Dirk Lueth */
!function(){"use strict";function n(){var n=/^application\/json/;return{validate:function(t){return n.test(t)},onPreRequest:function(){var n=this.url;this.url=".json"!==n.slice(-5)?n+".json":n},process:function(){var n=JSON.parse(this.source);provide(function(){return n})}}}provide(n)}();
//# sourceMappingURL=json.js.map
