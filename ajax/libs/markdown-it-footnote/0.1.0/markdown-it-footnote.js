/*! markdown-it-footnote 0.1.0 https://github.com//markdown-it/markdown-it-footnote @license MIT */!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var o;"undefined"!=typeof window?o=window:"undefined"!=typeof global?o=global:"undefined"!=typeof self&&(o=self),o.markdownitFootnote=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Process footnotes
//
'use strict';

////////////////////////////////////////////////////////////////////////////////
// Renderer partials

function _footnote_ref(tokens, idx) {
  var n = Number(tokens[idx].id + 1).toString();
  var id = 'fnref' + n;
  if (tokens[idx].subId > 0) {
    id += ':' + tokens[idx].subId;
  }
  return '<sup class="footnote-ref"><a href="#fn' + n + '" id="' + id + '">[' + n + ']</a></sup>';
}
function _footnote_block_open(tokens, idx, options) {
  return (options.xhtmlOut ? '<hr class="footnotes-sep" />\n' : '<hr class="footnotes-sep">\n') +
         '<section class="footnotes">\n' +
         '<ol class="footnotes-list">\n';
}
function _footnote_block_close() {
  return '</ol>\n</section>\n';
}
function _footnote_open(tokens, idx) {
  var id = Number(tokens[idx].id + 1).toString();
  return '<li id="fn' + id + '"  class="footnote-item">';
}
function _footnote_close() {
  return '</li>\n';
}
function _footnote_anchor(tokens, idx) {
  var n = Number(tokens[idx].id + 1).toString();
  var id = 'fnref' + n;
  if (tokens[idx].subId > 0) {
    id += ':' + tokens[idx].subId;
  }
  return ' <a href="#' + id + '" class="footnote-backref">\u21a9</a>'; /* ↩ */
}

////////////////////////////////////////////////////////////////////////////////


module.exports = function sub_plugin(md) {
  var parseLinkLabel = md.helpers.parseLinkLabel;

  md.renderer.rules.footnote_ref          = _footnote_ref;
  md.renderer.rules.footnote_block_open   = _footnote_block_open;
  md.renderer.rules.footnote_block_close  = _footnote_block_close;
  md.renderer.rules.footnote_open         = _footnote_open;
  md.renderer.rules.footnote_close        = _footnote_close;
  md.renderer.rules.footnote_anchor       = _footnote_anchor;

  // Process footnote block definition
  function footnote_def(state, startLine, endLine, silent) {
    var oldBMark, oldTShift, oldParentType, pos, label,
        start = state.bMarks[startLine] + state.tShift[startLine],
        max = state.eMarks[startLine];

    // line should be at least 5 chars - "[^x]:"
    if (start + 4 > max) { return false; }

    if (state.src.charCodeAt(start) !== 0x5B/* [ */) { return false; }
    if (state.src.charCodeAt(start + 1) !== 0x5E/* ^ */) { return false; }

    for (pos = start + 2; pos < max; pos++) {
      if (state.src.charCodeAt(pos) === 0x20) { return false; }
      if (state.src.charCodeAt(pos) === 0x5D /* ] */) {
        break;
      }
    }

    if (pos === start + 2) { return false; } // no empty footnote labels
    if (pos + 1 >= max || state.src.charCodeAt(++pos) !== 0x3A /* : */) { return false; }
    if (silent) { return true; }
    pos++;

    if (!state.env.footnotes) { state.env.footnotes = {}; }
    if (!state.env.footnotes.refs) { state.env.footnotes.refs = {}; }
    label = state.src.slice(start + 2, pos - 2);
    state.env.footnotes.refs[':' + label] = -1;

    state.tokens.push({
      type: 'footnote_reference_open',
      label: label,
      level: state.level++
    });

    oldBMark = state.bMarks[startLine];
    oldTShift = state.tShift[startLine];
    oldParentType = state.parentType;
    state.tShift[startLine] = state.skipSpaces(pos) - pos;
    state.bMarks[startLine] = pos;
    state.blkIndent += 4;
    state.parentType = 'footnote';

    if (state.tShift[startLine] < state.blkIndent) {
      state.tShift[startLine] += state.blkIndent;
      state.bMarks[startLine] -= state.blkIndent;
    }

    state.md.block.tokenize(state, startLine, endLine, true);

    state.parentType = oldParentType;
    state.blkIndent -= 4;
    state.tShift[startLine] = oldTShift;
    state.bMarks[startLine] = oldBMark;

    state.tokens.push({
      type: 'footnote_reference_close',
      level: --state.level
    });

    return true;
  }

  // Process inline footnotes (^[...])
  function footnote_inline(state, silent) {
    var labelStart,
        labelEnd,
        footnoteId,
        oldLength,
        max = state.posMax,
        start = state.pos;

    if (start + 2 >= max) { return false; }
    if (state.src.charCodeAt(start) !== 0x5E/* ^ */) { return false; }
    if (state.src.charCodeAt(start + 1) !== 0x5B/* [ */) { return false; }

    labelStart = start + 2;
    labelEnd = parseLinkLabel(state, start + 1);

    // parser failed to find ']', so it's not a valid note
    if (labelEnd < 0) { return false; }

    // We found the end of the link, and know for a fact it's a valid link;
    // so all that's left to do is to call tokenizer.
    //
    if (!silent) {
      if (!state.env.footnotes) { state.env.footnotes = {}; }
      if (!state.env.footnotes.list) { state.env.footnotes.list = []; }
      footnoteId = state.env.footnotes.list.length;

      state.pos = labelStart;
      state.posMax = labelEnd;

      state.push({
        type: 'footnote_ref',
        id: footnoteId,
        level: state.level
      });
      oldLength = state.tokens.length;
      state.md.inline.tokenize(state);
      state.env.footnotes.list[footnoteId] = { tokens: state.tokens.splice(oldLength) };
    }

    state.pos = labelEnd + 1;
    state.posMax = max;
    return true;
  }

  // Process footnote references ([^...])
  function footnote_ref(state, silent) {
    var label,
        pos,
        footnoteId,
        footnoteSubId,
        max = state.posMax,
        start = state.pos;

    // should be at least 4 chars - "[^x]"
    if (start + 3 > max) { return false; }

    if (!state.env.footnotes || !state.env.footnotes.refs) { return false; }
    if (state.src.charCodeAt(start) !== 0x5B/* [ */) { return false; }
    if (state.src.charCodeAt(start + 1) !== 0x5E/* ^ */) { return false; }

    for (pos = start + 2; pos < max; pos++) {
      if (state.src.charCodeAt(pos) === 0x20) { return false; }
      if (state.src.charCodeAt(pos) === 0x0A) { return false; }
      if (state.src.charCodeAt(pos) === 0x5D /* ] */) {
        break;
      }
    }

    if (pos === start + 2) { return false; } // no empty footnote labels
    if (pos >= max) { return false; }
    pos++;

    label = state.src.slice(start + 2, pos - 1);
    if (typeof state.env.footnotes.refs[':' + label] === 'undefined') { return false; }

    if (!silent) {
      if (!state.env.footnotes.list) { state.env.footnotes.list = []; }

      if (state.env.footnotes.refs[':' + label] < 0) {
        footnoteId = state.env.footnotes.list.length;
        state.env.footnotes.list[footnoteId] = { label: label, count: 0 };
        state.env.footnotes.refs[':' + label] = footnoteId;
      } else {
        footnoteId = state.env.footnotes.refs[':' + label];
      }

      footnoteSubId = state.env.footnotes.list[footnoteId].count;
      state.env.footnotes.list[footnoteId].count++;

      state.push({
        type: 'footnote_ref',
        id: footnoteId,
        subId: footnoteSubId,
        level: state.level
      });
    }

    state.pos = pos;
    state.posMax = max;
    return true;
  }

  // Glue footnote tokens to end of token stream
  function footnote_tail(state) {
    var i, l, j, t, lastParagraph, list, tokens, current, currentLabel,
        level = 0,
        insideRef = false,
        refTokens = {};

    if (!state.env.footnotes) { return; }

    state.tokens = state.tokens.filter(function(tok) {
      if (tok.type === 'footnote_reference_open') {
        insideRef = true;
        current = [];
        currentLabel = tok.label;
        return false;
      }
      if (tok.type === 'footnote_reference_close') {
        insideRef = false;
        // prepend ':' to avoid conflict with Object.prototype members
        refTokens[':' + currentLabel] = current;
        return false;
      }
      if (insideRef) { current.push(tok); }
      return !insideRef;
    });

    if (!state.env.footnotes.list) { return; }
    list = state.env.footnotes.list;

    state.tokens.push({
      type: 'footnote_block_open',
      level: level++
    });
    for (i = 0, l = list.length; i < l; i++) {
      state.tokens.push({
        type: 'footnote_open',
        id: i,
        level: level++
      });

      if (list[i].tokens) {
        tokens = [];
        tokens.push({
          type: 'paragraph_open',
          tight: false,
          level: level++
        });
        tokens.push({
          type: 'inline',
          content: '',
          level: level,
          children: list[i].tokens
        });
        tokens.push({
          type: 'paragraph_close',
          tight: false,
          level: --level
        });
      } else if (list[i].label) {
        tokens = refTokens[':' + list[i].label];
      }

      state.tokens = state.tokens.concat(tokens);
      if (state.tokens[state.tokens.length - 1].type === 'paragraph_close') {
        lastParagraph = state.tokens.pop();
      } else {
        lastParagraph = null;
      }

      t = list[i].count > 0 ? list[i].count : 1;
      for (j = 0; j < t; j++) {
        state.tokens.push({
          type: 'footnote_anchor',
          id: i,
          subId: j,
          level: level
        });
      }

      if (lastParagraph) {
        state.tokens.push(lastParagraph);
      }

      state.tokens.push({
        type: 'footnote_close',
        level: --level
      });
    }
    state.tokens.push({
      type: 'footnote_block_close',
      level: --level
    });
  }

  md.block.ruler.before('reference', 'footnote_def', footnote_def, { alt: [ 'paragraph', 'reference' ] });
  md.inline.ruler.after('image', 'footnote_inline', footnote_inline);
  md.inline.ruler.after('footnote_inline', 'footnote_ref', footnote_ref);
  md.core.ruler.after('inline', 'footnote_tail', footnote_tail);
};

},{}]},{},[1])(1)
});