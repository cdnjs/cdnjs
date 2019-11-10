/*! Qoopido.demand 1.1.3 | https://github.com/dlueth/qoopido.demand | (c) 2015 Dirk Lueth */
!function(){"use strict";function n(){return{matchType:/^application\/json/,onPreRequest:function(){var n=this,o=n.url;n.url=".json"!==o.slice(-5)?o+".json":o},onPostProcess:function(){var n=JSON.parse(this.source);provide(function(){return n})}}}provide(n)}();
//# sourceMappingURL=../handler/json.js.map