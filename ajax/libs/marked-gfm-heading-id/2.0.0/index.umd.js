(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('github-slugger')) :
  typeof define === 'function' && define.amd ? define(['exports', 'github-slugger'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.markedBidi = {}, global.GithubSlugger));
})(this, (function (exports, GithubSlugger) { 'use strict';

  let slugger;

  function reset() {
    slugger = new GithubSlugger();
  }

  function gfmHeadingId({ prefix = '' } = {}) {
    reset();

    return {
      renderer: {
        heading(text, level, raw) {
          return `<h${level} id="${prefix}${slugger.slug(raw)}">${text}</h${level}>\n`;
        }
      }
    };
  }

  exports.gfmHeadingId = gfmHeadingId;
  exports.reset = reset;

}));
