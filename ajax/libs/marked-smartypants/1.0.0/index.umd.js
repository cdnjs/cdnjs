(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('smartypants')) :
  typeof define === 'function' && define.amd ? define(['exports', 'smartypants'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.markedSmartypants = {}, global.smartypants));
})(this, (function (exports, smartypants) { 'use strict';

  function markedSmartypants() {
    return {
      tokenizer: {
        inlineText(src) {
          // don't escape inlineText
          const cap = this.rules.inline.text.exec(src);

          /* istanbul ignore next */
          if (!cap) {
            // should never happen
            return;
          }

          return {
            type: 'text',
            raw: cap[0],
            text: cap[0]
          };
        }
      },
      hooks: {
        postprocess(html) {
          return smartypants(html, 2);
        }
      }
    };
  }

  exports.markedSmartypants = markedSmartypants;

}));
