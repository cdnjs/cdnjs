/*
* memoize.js
* by @philogb and @addyosmani
* further optimizations by @mathias, @DmitryBaranovsk & @GotNoSugarBaby
* fixes by @AutoSponge
* perf tests: http://bit.ly/q3zpG3
* Released under an MIT license.
*/
(function (global) {
    "use strict";

    var memoize = function (func) {
      var stringifyJson = JSON.stringify,
          cache = {};

      var cachedfun = function () {
          var hash = stringifyJson(arguments);
          return (hash in cache) ? cache[hash] : cache[hash] = func.apply(this, arguments);
      };
      cachedfun.__cache = (function(){
          cache.remove || (cache.remove = function(){
              var hash = stringifyJson(arguments);
              return (delete cache[hash]);
          });
          return cache;
      }).call(this);
      return cachedfun;
    };

    if (typeof exports !== 'undefined') {
      module.exports = memoize;
    } else {
      global.memoize || (global.memoize = (typeof JSON === 'object' && typeof JSON.stringify === 'function' ?
          memoize : function (func) {
              return func;
          }));
    }
}(this));
