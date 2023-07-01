(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.markedBaseUrl = {}));
})(this, (function (exports) { 'use strict';

  function baseUrl(base) {
    // extension code here

    return {
      walkTokens(token) {
        if (!['link', 'image'].includes(token.type)) {
          return;
        }

        token.href = new URL(token.href, base).href;
      }
    };
  }

  exports.baseUrl = baseUrl;

}));
