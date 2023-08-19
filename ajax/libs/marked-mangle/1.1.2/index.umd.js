(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.markedMangle = {}));
})(this, (function (exports) { 'use strict';

  function mangle() {
    return {
      mangle: false, // remove this once mangle option is removed
      walkTokens(token) {
        if (token.type !== 'link') {
          return;
        }

        if (!token.href.startsWith('mailto:')) {
          return;
        }

        const email = token.href.substring(7);
        const mangledEmail = mangleEmail(email);

        token.href = `mailto:${mangledEmail}`;

        if (token.tokens.length !== 1 || token.tokens[0].type !== 'text' || token.tokens[0].text !== email) {
          return;
        }

        token.text = mangledEmail;
        token.tokens[0].text = mangledEmail;
      }
    };
  }

  function mangleEmail(text) {
    let out = '',
      i,
      ch;

    const l = text.length;
    for (i = 0; i < l; i++) {
      ch = text.charCodeAt(i);
      if (Math.random() > 0.5) {
        ch = 'x' + ch.toString(16);
      }
      out += '&#' + ch + ';';
    }

    return out;
  }

  exports.mangle = mangle;

}));
