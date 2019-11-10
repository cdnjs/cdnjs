(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("textile", [], factory);
	else if(typeof exports === 'object')
		exports["textile"] = factory();
	else
		root["textile"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/*
	** Textile parser for JavaScript
	**
	** Copyright (c) 2012 Borgar Þorsteinsson (MIT License).
	**
	*/
	
	var merge = __webpack_require__(1);
	
	var _require = __webpack_require__(2);
	
	var toHTML = _require.toHTML;
	
	var _require2 = __webpack_require__(6);
	
	var parseFlow = _require2.parseFlow;
	
	var _require3 = __webpack_require__(3);
	
	var parseHtml = _require3.parseHtml;
	
	
	function textile(txt, opt) {
	  // get a throw-away copy of options
	  opt = merge(merge({}, textile.defaults), opt || {});
	  // run the converter
	  return parseFlow(txt, opt).map(toHTML).join('');
	};
	module.exports = textile;
	
	// options
	textile.defaults = {
	  // single-line linebreaks are converted to <br> by default
	  'breaks': true
	};
	textile.setOptions = textile.setoptions = function (opt) {
	  merge(textile.defaults, opt);
	  return this;
	};
	
	textile.parse = textile.convert = textile;
	textile.html_parser = parseHtml;
	
	textile.jsonml = function (txt, opt) {
	  // get a throw-away copy of options
	  opt = merge(merge({}, textile.defaults), opt || {});
	  // parse and return tree
	  return ['html'].concat(parseFlow(txt, opt));
	};
	textile.serialize = toHTML;

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	
	// merge object b properties into object a
	module.exports = function merge(a, b) {
	  if (b) {
	    for (var k in b) {
	      a[k] = b[k];
	    }
	  }
	  return a;
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/*
	** JSONML helper methods - http://www.jsonml.org/
	**
	** This provides the `JSONML` object, which contains helper
	** methods for rendering JSONML to HTML.
	**
	** Note that the tag ! is taken to mean comment, this is however
	** not specified in the JSONML spec.
	*/
	
	var singletons = __webpack_require__(3).singletons;
	
	// drop or add tab levels to JsonML tree
	function reIndent(ml, shiftBy) {
	  // a bit obsessive, but there we are...
	  if (!shiftBy) {
	    return ml;
	  }
	  return ml.map(function (s) {
	    if (/^\n\t+/.test(s)) {
	      if (shiftBy < 0) {
	        s = s.slice(0, shiftBy);
	      } else {
	        for (var i = 0; i < shiftBy; i++) {
	          s += '\t';
	        }
	      }
	    } else if (Array.isArray(s)) {
	      return reIndent(s, shiftBy);
	    }
	    return s;
	  });
	}
	
	function escape(text, escapeQuotes) {
	  return text.replace(/&(?!(#\d{2,}|#x[\da-fA-F]{2,}|[a-zA-Z][a-zA-Z1-4]{1,6});)/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, escapeQuotes ? '&quot;' : '"').replace(/'/g, escapeQuotes ? '&#39;' : "'");
	}
	
	function toHTML(jsonml) {
	  jsonml = jsonml.concat();
	
	  // basic case
	  if (typeof jsonml === 'string') {
	    return escape(jsonml);
	  }
	
	  var tag = jsonml.shift();
	  var attributes = {};
	  var tagAttrs = '';
	  var content = [];
	
	  if (jsonml.length && _typeof(jsonml[0]) === 'object' && !Array.isArray(jsonml[0])) {
	    attributes = jsonml.shift();
	  }
	
	  while (jsonml.length) {
	    content.push(toHTML(jsonml.shift()));
	  }
	
	  for (var a in attributes) {
	    tagAttrs += attributes[a] == null ? ' ' + a : ' ' + a + '="' + escape(String(attributes[a]), true) + '"';
	  }
	
	  // be careful about adding whitespace here for inline elements
	  if (tag === '!') {
	    return '<!--' + content.join('') + '-->';
	  } else if (tag in singletons) {
	    return '<' + tag + tagAttrs + ' />';
	  } else {
	    return '<' + tag + tagAttrs + '>' + content.join('') + '</' + tag + '>';
	  }
	}
	
	module.exports = {
	  reIndent: reIndent,
	  toHTML: toHTML,
	  escape: escape
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var re = __webpack_require__(4);
	var ribbon = __webpack_require__(5);
	
	re.pattern.html_id = '[a-zA-Z][a-zA-Z\\d:]*';
	re.pattern.html_attr = '(?:"[^"]+"|\'[^\']+\'|[^>\\s]+)';
	
	var reAttr = re.compile(/^\s*([^=\s]+)(?:\s*=\s*("[^"]+"|'[^']+'|[^>\s]+))?/);
	var reComment = re.compile(/^<!--(.+?)-->/, 's');
	var reEndTag = re.compile(/^<\/([:html_id:])([^>]*)>/);
	var reTag = re.compile(/^<([:html_id:])((?:\s[^=\s\/]+(?:\s*=\s*[:html_attr:])?)+)?\s*(\/?)>(\n*)/);
	var reHtmlTagBlock = re.compile(/^\s*<([:html_id:](?::[a-zA-Z\d]+)*)((?:\s[^=\s\/]+(?:\s*=\s*[:html_attr:])?)+)?\s*(\/?)>(\n*)/);
	
	// area, base, basefont, bgsound, br, col, command, embed, frame, hr,
	// img, input, keygen, link, meta, param, source, track or wbr
	var singletons = {
	  br: 1,
	  hr: 1,
	  img: 1,
	  link: 1,
	  meta: 1,
	  wbr: 1,
	  area: 1,
	  param: 1,
	  input: 1,
	  option: 1,
	  base: 1,
	  col: 1
	};
	
	function allowAll() {
	  return true;
	}
	
	function testComment(src) {
	  return reComment.exec(src);
	}
	
	function testOpenTagBlock(src) {
	  return reHtmlTagBlock.exec(src);
	}
	
	function testOpenTag(src) {
	  return reTag.exec(src);
	}
	
	function testCloseTag(src) {
	  return reEndTag.exec(src);
	}
	
	function parseHtmlAttr(attrSrc) {
	  // parse ATTR and add to element
	  var attr = {};
	  var m = void 0;
	  while (m = reAttr.exec(attrSrc)) {
	    attr[m[1]] = typeof m[2] === 'string' ? m[2].replace(/^(["'])(.*)\1$/, '$2') : null;
	    attrSrc = attrSrc.slice(m[0].length);
	  }
	  return attr;
	}
	
	// This "indesciminately" parses HTML text into a list of JSON-ML element
	// No steps are taken however to prevent things like <table><p><td> - user can still create nonsensical but "well-formed" markup
	function parseHtml(src, whitelistTags) {
	  var root = [];
	  var list = root;
	  var _stack = [];
	  var oktag = whitelistTags ? function (tag) {
	    return tag in whitelistTags;
	  } : allowAll;
	  var m = void 0;
	  var tag = void 0;
	
	  src = typeof src === 'string' ? ribbon(src) : src;
	  // loop
	  do {
	    // comment
	    if ((m = testComment(src)) && oktag('!')) {
	      src.advance(m[0]);
	      list.push(['!', m[1]]);
	    }
	
	    // end tag
	    else if ((m = testCloseTag(src)) && oktag(m[1])) {
	        tag = m[1];
	        if (_stack.length) {
	          for (var i = _stack.length - 1; i >= 0; i--) {
	            var head = _stack[i];
	            if (head[0] === tag) {
	              _stack.splice(i);
	              list = _stack[_stack.length - 1] || root;
	              break;
	            }
	          }
	        }
	        src.advance(m[0]);
	      }
	
	      // open/void tag
	      else if ((m = testOpenTag(src)) && oktag(m[1])) {
	          src.advance(m[0]);
	          tag = m[1];
	          var single = m[3] || m[1] in singletons;
	          var tail = m[4];
	          var element = [tag];
	
	          // attributes
	          if (m[2]) {
	            element.push(parseHtmlAttr(m[2]));
	          }
	
	          // single tag
	          if (single) {
	            // let us add the element and continue our quest...
	            list.push(element);
	            if (tail) {
	              list.push(tail);
	            }
	          }
	          // open tag
	          else {
	              if (tail) {
	                element.push(tail);
	              }
	
	              // TODO: some things auto close other things: <td>, <li>, <p>, <table>
	              // if ( tag === 'p' && _stack.length ) {
	              //   var seek = /^(p)$/;
	              //   for (var i=_stack.length-1; i>=0; i--) {
	              //     var head = _stack[i];
	              //     if ( seek.test( head[0] ) /* === tag */ ) {
	              //       //src.advance( m[0] );
	              //       _stack.splice( i );
	              //       list = _stack[i] || root;
	              //     }
	              //   }
	              // }
	
	              // TODO: some elements can move parser into "text" mode
	              // style, xmp, iframe, noembed, noframe, textarea, title, script, noscript, plaintext
	              // if ( /^(script)$/.test( tag ) ) { }
	
	              _stack.push(element);
	              list.push(element);
	              list = element;
	            }
	        }
	        // text content
	        else {
	            // no match, move by all "uninteresting" chars
	            m = /([^<]+|[^\0])/.exec(src);
	            if (m) {
	              list.push(m[0]);
	            }
	            src.advance(m ? m[0].length || 1 : 1);
	          }
	  } while (src.valueOf());
	
	  return root;
	}
	
	module.exports = {
	  singletons: singletons,
	  parseHtml: parseHtml,
	  parseHtmlAttr: parseHtmlAttr,
	  testCloseTag: testCloseTag,
	  testOpenTagBlock: testOpenTagBlock,
	  testOpenTag: testOpenTag,
	  testComment: testComment
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	/*
	** Regular Expression helper methods
	**
	** This provides the `re` object, which contains several helper
	** methods for working with big regular expressions (soup).
	**
	*/
	
	var _cache = {};
	
	var re = module.exports = {
	
	  pattern: {
	    'punct': '[!-/:-@\\[\\\\\\]-`{-~]',
	    'space': '\\s'
	  },
	
	  escape: function escape(src) {
	    return src.replace(/[\-\[\]\{\}\(\)\*\+\?\.,\\\^\$\|#\s]/g, '\\$&');
	  },
	
	  collapse: function collapse(src) {
	    return src.replace(/(?:#.*?(?:\n|$))/g, '').replace(/\s+/g, '');
	  },
	
	  expandPatterns: function expandPatterns(src) {
	    // TODO: provide escape for patterns: \[:pattern:] ?
	    return src.replace(/\[:\s*(\w+)\s*:\]/g, function (m, k) {
	      var ex = re.pattern[k];
	      if (ex) {
	        return re.expandPatterns(ex);
	      } else {
	        throw new Error('Pattern ' + m + ' not found in ' + src);
	      }
	    });
	  },
	
	  isRegExp: function isRegExp(r) {
	    return Object.prototype.toString.call(r) === '[object RegExp]';
	  },
	
	  compile: function compile(src, flags) {
	    if (re.isRegExp(src)) {
	      if (arguments.length === 1) {
	        // no flags arg provided, use the RegExp one
	        flags = (src.global ? 'g' : '') + (src.ignoreCase ? 'i' : '') + (src.multiline ? 'm' : '');
	      }
	      src = src.source;
	    }
	    // don't do the same thing twice
	    var ckey = src + (flags || '');
	    if (ckey in _cache) {
	      return _cache[ckey];
	    }
	    // allow classes
	    var rx = re.expandPatterns(src);
	    // allow verbose expressions
	    if (flags && /x/.test(flags)) {
	      rx = re.collapse(rx);
	    }
	    // allow dotall expressions
	    if (flags && /s/.test(flags)) {
	      rx = rx.replace(/([^\\])\./g, '$1[^\\0]');
	    }
	    // TODO: test if MSIE and add replace \s with [\s\u00a0] if it is?
	    // clean flags and output new regexp
	    flags = (flags || '').replace(/[^gim]/g, '');
	    return _cache[ckey] = new RegExp(rx, flags);
	  }
	
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function ribbon(feed) {
	  var org = String(feed);
	  var slot = null;
	  var pos = 0;
	
	  return {
	
	    save: function save() {
	      slot = pos;
	    },
	
	    load: function load() {
	      pos = slot;
	      feed = org.slice(pos);
	      this.$ = feed;
	    },
	
	    advance: function advance(n) {
	      pos += typeof n === 'string' ? n.length : n;
	      feed = org.slice(pos);
	      this.$ = feed;
	      return feed;
	    },
	
	    lookbehind: function lookbehind(nchars) {
	      nchars = nchars == null ? 1 : nchars;
	      return org.slice(pos - nchars, pos);
	    },
	
	    startsWith: function startsWith(s) {
	      return feed.substring(0, s.length) === s;
	    },
	
	    valueOf: function valueOf() {
	      this.$ = feed;
	      return feed;
	    },
	
	    toString: function toString() {
	      this.$ = feed;
	      return feed;
	    }
	
	  };
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/*
	** textile flow content parser
	*/
	var builder = __webpack_require__(7);
	var ribbon = __webpack_require__(5);
	var re = __webpack_require__(4);
	var fixLinks = __webpack_require__(8);
	
	var _require = __webpack_require__(3);
	
	var parseHtml = _require.parseHtml;
	var parseHtmlAttr = _require.parseHtmlAttr;
	var singletons = _require.singletons;
	var testComment = _require.testComment;
	var testOpenTagBlock = _require.testOpenTagBlock;
	
	var _require2 = __webpack_require__(9);
	
	var parsePhrase = _require2.parsePhrase;
	
	var _require3 = __webpack_require__(10);
	
	var copyAttr = _require3.copyAttr;
	var parseAttr = _require3.parseAttr;
	
	var _require4 = __webpack_require__(13);
	
	var testList = _require4.testList;
	var parseList = _require4.parseList;
	
	var _require5 = __webpack_require__(14);
	
	var testDefList = _require5.testDefList;
	var parseDefList = _require5.parseDefList;
	
	var _require6 = __webpack_require__(15);
	
	var testTable = _require6.testTable;
	var parseTable = _require6.parseTable;
	
	var _require7 = __webpack_require__(12);
	
	var txblocks = _require7.txblocks;
	var txlisthd = _require7.txlisthd;
	var txattr = _require7.txattr;
	
	re.pattern.txblocks = txblocks;
	re.pattern.txlisthd = txlisthd;
	re.pattern.txattr = txattr;
	
	// HTML tags allowed in the document (root) level that trigger HTML parsing
	var allowedBlocktags = {
	  'p': 0,
	  'hr': 0,
	  'ul': 1,
	  'ol': 0,
	  'li': 0,
	  'div': 1,
	  'pre': 0,
	  'object': 1,
	  'script': 0,
	  'noscript': 0,
	  'blockquote': 1,
	  'notextile': 1
	};
	
	var reBlock = re.compile(/^([:txblocks:])/);
	// const reBlockSE = re.compile( /^[:txblocks:]$/ );
	var reBlockNormal = re.compile(/^(.*?)($|\r?\n(?=[:txlisthd:])|\r?\n(?:\s*\n|$)+)/, 's');
	var reBlockExtended = re.compile(/^(.*?)($|\r?\n(?=[:txlisthd:])|\r?\n+(?=[:txblocks:][:txattr:]\.))/, 's');
	var reRuler = /^(\-\-\-+|\*\*\*+|___+)(\r?\n\s+|$)/;
	var reLinkRef = re.compile(/^\[([^\]]+)\]((?:https?:\/\/|\/)\S+)(?:\s*\n|$)/);
	var reFootnoteDef = /^fn\d+$/;
	
	function paragraph(s, tag, pba, linebreak, options) {
	  tag = tag || 'p';
	  var out = [];
	  s.split(/(?:\r?\n){2,}/).forEach(function (bit, i) {
	    if (tag === 'p' && /^\s/.test(bit)) {
	      // no-paragraphs
	      // WTF?: Why does Textile not allow linebreaks in spaced lines
	      bit = bit.replace(/\r?\n[\t ]/g, ' ').trim();
	      out = out.concat(parsePhrase(bit, options));
	    } else {
	      if (linebreak && i) {
	        out.push(linebreak);
	      }
	      out.push(pba ? [tag, pba].concat(parsePhrase(bit, options)) : [tag].concat(parsePhrase(bit, options)));
	    }
	  });
	  return out;
	};
	
	function parseFlow(src, options) {
	  var list = builder();
	
	  var linkRefs = void 0;
	  var m = void 0;
	
	  src = ribbon(src.replace(/^( *\r?\n)+/, ''));
	
	  // loop
	  while (src.valueOf()) {
	    src.save();
	
	    // link_ref -- this goes first because it shouldn't trigger a linebreak
	    if (m = reLinkRef.exec(src)) {
	      if (!linkRefs) {
	        linkRefs = {};
	      }
	      src.advance(m[0]);
	      linkRefs[m[1]] = m[2];
	      continue;
	    }
	
	    // add linebreak
	    list.linebreak();
	
	    // named block
	    if (m = reBlock.exec(src)) {
	      src.advance(m[0]);
	      var blockType = m[0];
	      var pba = parseAttr(src, blockType);
	
	      if (pba) {
	        src.advance(pba[0]);
	        pba = pba[1];
	      }
	      if (m = /^\.(\.?)(?:\s|(?=:))/.exec(src)) {
	        // FIXME: this whole copyAttr seems rather strange?
	        // slurp rest of block
	        var extended = !!m[1];
	        var reBlockGlob = extended ? reBlockExtended : reBlockNormal;
	        m = reBlockGlob.exec(src.advance(m[0]));
	        src.advance(m[0]);
	        // bq | bc | notextile | pre | h# | fn# | p | ###
	        if (blockType === 'bq') {
	          var inner = m[1];
	          if (m = /^:(\S+)\s+/.exec(inner)) {
	            if (!pba) {
	              pba = {};
	            }
	            pba.cite = m[1];
	            inner = inner.slice(m[0].length);
	          }
	          // RedCloth adds all attr to both: this is bad because it produces duplicate IDs
	          var par = paragraph(inner, 'p', copyAttr(pba, { 'cite': 1, 'id': 1 }), '\n', options);
	          list.add(['blockquote', pba, '\n'].concat(par).concat(['\n']));
	          // FIXME: looks like .linebreak can work here
	        } else if (blockType === 'bc') {
	          var subPba = pba ? copyAttr(pba, { 'id': 1 }) : null;
	          list.add(['pre', pba, subPba ? ['code', subPba, m[1]] : ['code', m[1]]]);
	        } else if (blockType === 'notextile') {
	          list.merge(parseHtml(m[1]));
	        } else if (blockType === '###') {
	          // ignore the insides
	        } else if (blockType === 'pre') {
	          // I disagree with RedCloth, but agree with PHP here:
	          // "pre(foo#bar).. line1\n\nline2" prevents multiline preformat blocks
	          // ...which seems like the whole point of having an extended pre block?
	          list.add(['pre', pba, m[1]]);
	        } else if (reFootnoteDef.test(blockType)) {
	          // footnote
	          // Need to be careful: RedCloth fails "fn1(foo#m). footnote" -- it confuses the ID
	          var fnid = blockType.replace(/\D+/g, '');
	          if (!pba) {
	            pba = {};
	          }
	          pba.class = (pba['class'] ? pba['class'] + ' ' : '') + 'footnote';
	          pba.id = 'fn' + fnid;
	          list.add(['p', pba, ['a', { 'href': '#fnr' + fnid }, ['sup', fnid]], ' '].concat(parsePhrase(m[1], options)));
	        } else {
	          // heading | paragraph
	          list.merge(paragraph(m[1], blockType, pba, '\n', options));
	        }
	        continue;
	      } else {
	        src.load();
	      }
	    }
	
	    // HTML comment
	    if (m = testComment(src)) {
	      src.advance(m[0] + (/(?:\s*\n+)+/.exec(src) || [])[0]);
	      list.add(['!', m[1]]);
	      continue;
	    }
	
	    // block HTML
	    if (m = testOpenTagBlock(src)) {
	      var tag = m[1];
	      var single = m[3] || tag in singletons;
	      var tail = m[4];
	
	      // Unsurprisingly, all Textile implementations I have tested have trouble parsing simple HTML:
	      //
	      //    "<div>a\n<div>b\n</div>c\n</div>d"
	      //
	      // I simply match them here as there is no way anyone is using nested HTML today, or if they
	      // are, then this will at least output less broken HTML as redundant tags will get quoted.
	
	      // Is block tag? ...
	      if (tag in allowedBlocktags) {
	        src.advance(m[0]);
	
	        var element = [tag];
	
	        if (m[2]) {
	          element.push(parseHtmlAttr(m[2]));
	        }
	
	        // single tag
	        if (single) {
	          // let us add the element and continue our quest...
	          list.add(element);
	          continue;
	        }
	        // block
	        else {
	            // gulp up the rest of this block...
	            var reEndTag = re.compile('^(.*?)(\\s*)(</' + tag + '\\s*>)(\\s*)', 's');
	            if (m = reEndTag.exec(src)) {
	              src.advance(m[0]);
	              if (tag === 'pre') {
	                element.push(tail);
	                element = element.concat(parseHtml(m[1].replace(/(\r?\n)+$/, ''), { 'code': 1 }));
	                if (m[2]) {
	                  element.push(m[2]);
	                }
	                list.add(element);
	              } else if (tag === 'notextile') {
	                element = parseHtml(m[1].trim());
	                list.merge(element);
	              } else if (tag === 'script' || tag === 'noscript') {
	                element.push(tail + m[1]);
	                list.add(element);
	              } else {
	                // These strange (and unnecessary) linebreak tests are here to get the
	                // tests working perfectly. In reality, this doesn't matter one bit.
	                if (/\n/.test(tail)) {
	                  element.push('\n');
	                }
	                if (/\n/.test(m[1])) {
	                  element = element.concat(parseFlow(m[1], options));
	                } else {
	                  element = element.concat(parsePhrase(m[1].replace(/^ +/, ''), options));
	                }
	                if (/\n/.test(m[2])) {
	                  element.push('\n');
	                }
	
	                list.add(element);
	              }
	              continue;
	            }
	          }
	      }
	      src.load();
	    }
	
	    // ruler
	    if (m = reRuler.exec(src)) {
	      src.advance(m[0]);
	      list.add(['hr']);
	      continue;
	    }
	
	    // list
	    if (m = testList(src)) {
	      src.advance(m[0]);
	      list.add(parseList(m[0], options));
	      continue;
	    }
	
	    // definition list
	    if (m = testDefList(src)) {
	      src.advance(m[0]);
	      list.add(parseDefList(m[0], options));
	      continue;
	    }
	
	    // table
	    if (m = testTable(src)) {
	      src.advance(m[0]);
	      list.add(parseTable(m[1], options));
	      continue;
	    }
	
	    // paragraph
	    m = reBlockNormal.exec(src);
	    list.merge(paragraph(m[1], 'p', undefined, '\n', options));
	    src.advance(m[0]);
	  }
	
	  return linkRefs ? fixLinks(list.get(), linkRefs) : list.get();
	}
	
	exports.parseFlow = parseFlow;

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function builder(initArr) {
	  var arr = Array.isArray(initArr) ? initArr : [];
	
	  return {
	    add: function add(node) {
	      if (typeof node === 'string' && typeof arr[arr.length - 1] === 'string') {
	        // join if possible
	        arr[arr.length - 1] += node;
	      } else if (Array.isArray(node)) {
	        arr.push(node.filter(function (s) {
	          return s !== undefined;
	        }));
	      } else if (node) {
	        arr.push(node);
	      }
	      return this;
	    },
	
	    merge: function merge(arr) {
	      for (var i = 0, l = arr.length; i < l; i++) {
	        this.add(arr[i]);
	      }
	      return this;
	    },
	
	    linebreak: function linebreak() {
	      if (arr.length) {
	        this.add('\n');
	      }
	    },
	
	    get: function get() {
	      return arr;
	    }
	  };
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	// recurse the tree and swap out any "href" attributes
	// this uses the context as the replace dictionary so it can be fed to Array#map
	module.exports = function fixLinks(ml, dict) {
	  if (Array.isArray(ml)) {
	    if (ml[0] === 'a') {
	      // found a link
	      var attr = ml[1];
	      if ((typeof attr === 'undefined' ? 'undefined' : _typeof(attr)) === 'object' && 'href' in attr && attr.href in dict) {
	        attr.href = dict[attr.href];
	      }
	    }
	    for (var i = 0, l = ml.length; i < l; i++) {
	      if (Array.isArray(ml[i])) {
	        fixLinks(ml[i], dict);
	      }
	    }
	  }
	  return ml;
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/* textile inline parser */
	
	var ribbon = __webpack_require__(5);
	var builder = __webpack_require__(7);
	var re = __webpack_require__(4);
	
	var _require = __webpack_require__(10);
	
	var parseAttr = _require.parseAttr;
	
	var _require2 = __webpack_require__(11);
	
	var parseGlyph = _require2.parseGlyph;
	
	var _require3 = __webpack_require__(3);
	
	var parseHtmlAttr = _require3.parseHtmlAttr;
	var singletons = _require3.singletons;
	var testComment = _require3.testComment;
	var testOpenTag = _require3.testOpenTag;
	
	var _require4 = __webpack_require__(12);
	
	var ucaps = _require4.ucaps;
	var txattr = _require4.txattr;
	var txcite = _require4.txcite;
	
	re.pattern.txattr = txattr;
	re.pattern.txcite = txcite;
	re.pattern.ucaps = ucaps;
	
	var phraseConvert = {
	  '*': 'strong',
	  '**': 'b',
	  '??': 'cite',
	  '_': 'em',
	  '__': 'i',
	  '-': 'del',
	  '%': 'span',
	  '+': 'ins',
	  '~': 'sub',
	  '^': 'sup',
	  '@': 'code'
	};
	
	var rePhrase = /^([\[\{]?)(__?|\*\*?|\?\?|[\-\+\^~@%])/;
	var reImage = re.compile(/^!(?!\s)([:txattr:](?:\.[^\n\S]|\.(?:[^\.\/]))?)([^!\s]+?) ?(?:\(((?:[^\(\)]|\([^\(\)]+\))+)\))?!(?::([^\s]+?(?=[!-\.:-@\[\\\]-`{-~](?:$|\s)|\s|$)))?/);
	var reImageFenced = re.compile(/^\[!(?!\s)([:txattr:](?:\.[^\n\S]|\.(?:[^\.\/]))?)([^!\s]+?) ?(?:\(((?:[^\(\)]|\([^\(\)]+\))+)\))?!(?::([^\s]+?(?=[!-\.:-@\[\\\]-`{-~](?:$|\s)|\s|$)))?\]/);
	// NB: there is an exception in here to prevent matching "TM)"
	var reCaps = re.compile(/^((?!TM\)|tm\))[[:ucaps:]](?:[[:ucaps:]\d]{1,}(?=\()|[[:ucaps:]\d]{2,}))(?:\((.*?)\))?(?=\W|$)/);
	var reLink = re.compile(/^"(?!\s)((?:[^\n"]|"(?![\s:])[^\n"]+"(?!:))+)"[:txcite:]/);
	var reLinkFenced = /^\["([^\n]+?)":((?:\[[a-z0-9]*\]|[^\]])+)\]/;
	var reLinkTitle = /\s*\(((?:\([^\(\)]*\)|[^\(\)])+)\)$/;
	var reFootnote = /^\[(\d+)(!?)\]/;
	
	function parsePhrase(src, options) {
	  src = ribbon(src);
	
	  var list = builder();
	  var m = void 0;
	  var pba = void 0;
	
	  // loop
	  do {
	    src.save();
	
	    // linebreak -- having this first keeps it from messing to much with other phrases
	    if (src.startsWith('\r\n')) {
	      src.advance(1); // skip cartridge returns
	    }
	    if (src.startsWith('\n')) {
	      src.advance(1);
	      if (options.breaks) {
	        list.add(['br']);
	      }
	      list.add('\n');
	      continue;
	    }
	
	    // inline notextile
	    if (m = /^==(.*?)==/.exec(src)) {
	      src.advance(m[0]);
	      list.add(m[1]);
	      continue;
	    }
	
	    // lookbehind => /([\s>.,"'?!;:])$/
	    var behind = src.lookbehind(1);
	    var boundary = !behind || /^[\s>.,"'?!;:()]$/.test(behind);
	    // FIXME: need to test right boundary for phrases as well
	    if ((m = rePhrase.exec(src)) && (boundary || m[1])) {
	      src.advance(m[0]);
	      var tok = m[2];
	      var fence = m[1];
	      var phraseType = phraseConvert[tok];
	      var code = phraseType === 'code';
	
	      if (pba = !code && parseAttr(src, phraseType, tok)) {
	        src.advance(pba[0]);
	        pba = pba[1];
	      }
	      // FIXME: if we can't match the fence on the end, we should output fence-prefix as normal text
	      // seek end
	      var mMid = void 0;
	      var mEnd = void 0;
	      if (fence === '[') {
	        mMid = '^(.*?)';
	        mEnd = '(?:])';
	      } else if (fence === '{') {
	        mMid = '^(.*?)';
	        mEnd = '(?:})';
	      } else {
	        var t1 = re.escape(tok.charAt(0));
	        mMid = code ? '^(\\S+|\\S+.*?\\S)' : '^([^\\s' + t1 + ']+|[^\\s' + t1 + '].*?\\S(' + t1 + '*))';
	        mEnd = '(?=$|[\\s.,"\'!?;:()«»„“”‚‘’])';
	      }
	      var rx = re.compile(mMid + '(' + re.escape(tok) + ')' + mEnd);
	      if ((m = rx.exec(src)) && m[1]) {
	        src.advance(m[0]);
	        if (code) {
	          list.add([phraseType, m[1]]);
	        } else {
	          list.add([phraseType, pba].concat(parsePhrase(m[1], options)));
	        }
	        continue;
	      }
	      // else
	      src.load();
	    }
	
	    // image
	    if ((m = reImage.exec(src)) || (m = reImageFenced.exec(src))) {
	      src.advance(m[0]);
	
	      pba = m[1] && parseAttr(m[1], 'img');
	      var attr = pba ? pba[1] : { 'src': '' };
	      var img = ['img', attr];
	      attr.src = m[2];
	      attr.alt = m[3] ? attr.title = m[3] : '';
	
	      if (m[4]) {
	        // +cite causes image to be wraped with a link (or link_ref)?
	        // TODO: support link_ref for image cite
	        img = ['a', { 'href': m[4] }, img];
	      }
	      list.add(img);
	      continue;
	    }
	
	    // html comment
	    if (m = testComment(src)) {
	      src.advance(m[0]);
	      list.add(['!', m[1]]);
	      continue;
	    }
	    // html tag
	    // TODO: this seems to have a lot of overlap with block tags... DRY?
	    if (m = testOpenTag(src)) {
	      src.advance(m[0]);
	      var tag = m[1];
	      var single = m[3] || m[1] in singletons;
	      var element = [tag];
	      var tail = m[4];
	      if (m[2]) {
	        element.push(parseHtmlAttr(m[2]));
	      }
	      if (single) {
	        // single tag
	        list.add(element).add(tail);
	        continue;
	      } else {
	        // need terminator
	        // gulp up the rest of this block...
	        var reEndTag = re.compile('^(.*?)(</' + tag + '\\s*>)', 's');
	        if (m = reEndTag.exec(src)) {
	          src.advance(m[0]);
	          if (tag === 'code') {
	            element.push(tail, m[1]);
	          } else if (tag === 'notextile') {
	            list.merge(parsePhrase(m[1], options));
	            continue;
	          } else {
	            element = element.concat(parsePhrase(m[1], options));
	          }
	          list.add(element);
	          continue;
	        }
	        // end tag is missing, treat tag as normal text...
	      }
	      src.load();
	    }
	
	    // footnote
	    if ((m = reFootnote.exec(src)) && /\S/.test(behind)) {
	      src.advance(m[0]);
	      list.add(['sup', { 'class': 'footnote', 'id': 'fnr' + m[1] }, m[2] === '!' ? m[1] // "!" suppresses the link
	      : ['a', { href: '#fn' + m[1] }, m[1]]]);
	      continue;
	    }
	
	    // caps / abbr
	    if (m = reCaps.exec(src)) {
	      src.advance(m[0]);
	      var caps = ['span', { 'class': 'caps' }, m[1]];
	      if (m[2]) {
	        // FIXME: use <abbr>, not acronym!
	        caps = ['acronym', { 'title': m[2] }, caps];
	      }
	      list.add(caps);
	      continue;
	    }
	
	    // links
	    if (boundary && (m = reLink.exec(src)) || (m = reLinkFenced.exec(src))) {
	      src.advance(m[0]);
	      var title = m[1].match(reLinkTitle);
	      var inner = title ? m[1].slice(0, m[1].length - title[0].length) : m[1];
	      if (pba = parseAttr(inner, 'a')) {
	        inner = inner.slice(pba[0]);
	        pba = pba[1];
	      } else {
	        pba = {};
	      }
	      if (title && !inner) {
	        inner = title[0];
	        title = '';
	      }
	      pba.href = m[2];
	      if (title) {
	        pba.title = title[1];
	      }
	      list.add(['a', pba].concat(parsePhrase(inner.replace(/^(\.?\s*)/, ''), options)));
	      continue;
	    }
	
	    // no match, move by all "uninteresting" chars
	    m = /([a-zA-Z0-9,.':]+|[ \f\r\t\v\xA0\u2028\u2029]+|[^\0])/.exec(src);
	    if (m) {
	      list.add(m[0]);
	    }
	    src.advance(m ? m[0].length || 1 : 1);
	  } while (src.valueOf());
	
	  return list.get().map(parseGlyph);
	}
	
	exports.parsePhrase = parsePhrase;

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';
	
	var reClassid = /^\(([^\(\)\n]+)\)/;
	var rePaddingL = /^(\(+)/;
	var rePaddingR = /^(\)+)/;
	var reAlignBlock = /^(<>|<|>|=)/;
	var reAlignImg = /^(<|>|=)/;
	var reVAlign = /^(~|\^|\-)/;
	var reColSpan = /^\\(\d+)/;
	var reRowSpan = /^\/(\d+)/;
	var reStyles = /^\{([^\}]*)\}/;
	var reCSS = /^\s*([^:\s]+)\s*:\s*(.+)\s*$/;
	var reLang = /^\[([^\[\]\n]+)\]/;
	
	var pbaAlignLookup = {
	  '<': 'left',
	  '=': 'center',
	  '>': 'right',
	  '<>': 'justify'
	};
	
	var pbaVAlignLookup = {
	  '~': 'bottom',
	  '^': 'top',
	  '-': 'middle'
	};
	
	function copyAttr(s, blacklist) {
	  if (!s) {
	    return undefined;
	  }
	  var d = {};
	  for (var k in s) {
	    if (k in s && (!blacklist || !(k in blacklist))) {
	      d[k] = s[k];
	    }
	  }
	  return d;
	}
	
	function testBlock(name) {
	  // "in" test would be better but what about fn#.?
	  return (/^(?:table|t[dh]|t(?:foot|head|body)|b[qc]|div|notextile|pre|h[1-6]|fn\\d+|p|###)$/.test(name)
	  );
	}
	
	/*
	  The attr bit causes massive problems for span elements when parentheses are used.
	  Parentheses are a total mess and, unsurprisingly, cause trip-ups:
	
	   RC: `_{display:block}(span) span (span)_` -> `<em style="display:block;" class="span">(span) span (span)</em>`
	   PHP: `_{display:block}(span) span (span)_` -> `<em style="display:block;">(span) span (span)</em>`
	
	  PHP and RC seem to mostly solve this by not parsing a final attr parens on spans if the
	  following character is a non-space. I've duplicated that: Class/ID is not matched on spans
	  if it is followed by `endToken` or <space>.
	
	  Lang is not matched here if it is followed by the end token. Theoretically I could limit the lang
	  attribute to /^\[[a-z]{2+}(\-[a-zA-Z0-9]+)*\]/ because Textile is layered on top of HTML which
	  only accepts valid BCP 47 language tags, but who knows what atrocities are being preformed
	  out there in the real world. So this attempts to emulate the other libraries.
	*/
	function parseAttr(input, element, endToken) {
	  input = String(input);
	  if (!input || element === 'notextile') {
	    return undefined;
	  }
	
	  var m = void 0;
	  var st = {};
	  var o = { 'style': st };
	  var remaining = input;
	
	  var isBlock = testBlock(element);
	  var isImg = element === 'img';
	  var isList = element === 'li';
	  var isPhrase = !isBlock && !isImg && element !== 'a';
	  var reAlign = isImg ? reAlignImg : reAlignBlock;
	
	  do {
	    if (m = reStyles.exec(remaining)) {
	      m[1].split(';').forEach(function (p) {
	        var d = p.match(reCSS);
	        if (d) {
	          st[d[1]] = d[2];
	        }
	      });
	      remaining = remaining.slice(m[0].length);
	      continue;
	    }
	
	    if (m = reLang.exec(remaining)) {
	      var rm = remaining.slice(m[0].length);
	      if (!rm && isPhrase || endToken && endToken === rm.slice(0, endToken.length)) {
	        m = null;
	      } else {
	        o['lang'] = m[1];
	        remaining = remaining.slice(m[0].length);
	      }
	      continue;
	    }
	
	    if (m = reClassid.exec(remaining)) {
	      var _rm = remaining.slice(m[0].length);
	      if (!_rm && isPhrase || endToken && (_rm[0] === ' ' || endToken === _rm.slice(0, endToken.length))) {
	        m = null;
	      } else {
	        var bits = m[1].split('#');
	        if (bits[0]) {
	          o.class = bits[0];
	        }
	        if (bits[1]) {
	          o.id = bits[1];
	        }
	        remaining = _rm;
	      }
	      continue;
	    }
	
	    if (isBlock || isList) {
	      if (m = rePaddingL.exec(remaining)) {
	        st['padding-left'] = m[1].length + 'em';
	        remaining = remaining.slice(m[0].length);
	        continue;
	      }
	      if (m = rePaddingR.exec(remaining)) {
	        st['padding-right'] = m[1].length + 'em';
	        remaining = remaining.slice(m[0].length);
	        continue;
	      }
	    }
	
	    // only for blocks:
	    if (isImg || isBlock || isList) {
	      if (m = reAlign.exec(remaining)) {
	        var align = pbaAlignLookup[m[1]];
	        if (isImg) {
	          o['align'] = align;
	        } else {
	          st['text-align'] = align;
	        }
	        remaining = remaining.slice(m[0].length);
	        continue;
	      }
	    }
	
	    // only for table cells
	    if (element === 'td' || element === 'tr') {
	      if (m = reVAlign.exec(remaining)) {
	        st['vertical-align'] = pbaVAlignLookup[m[1]];
	        remaining = remaining.slice(m[0].length);
	        continue;
	      }
	    }
	    if (element === 'td') {
	      if (m = reColSpan.exec(remaining)) {
	        o['colspan'] = m[1];
	        remaining = remaining.slice(m[0].length);
	        continue;
	      }
	      if (m = reRowSpan.exec(remaining)) {
	        o['rowspan'] = m[1];
	        remaining = remaining.slice(m[0].length);
	        continue;
	      }
	    }
	  } while (m);
	
	  // collapse styles
	  var s = [];
	  for (var v in st) {
	    s.push(v + ':' + st[v]);
	  }
	  if (s.length) {
	    o.style = s.join(';');
	  } else {
	    delete o.style;
	  }
	
	  return remaining === input ? undefined : [input.length - remaining.length, o];
	}
	
	module.exports = {
	  copyAttr: copyAttr,
	  parseAttr: parseAttr
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/* textile glyph parser */
	
	var re = __webpack_require__(4);
	
	var reApostrophe = /(\w)'(\w)/g;
	var reArrow = /([^\-]|^)->/;
	var reClosingDQuote = re.compile(/([^\s\[\(])"(?=$|\s|[:punct:])/g);
	var reClosingSQuote = re.compile(/([^\s\[\(])'(?=$|\s|[:punct:])/g);
	var reCopyright = /(\b ?|\s|^)(?:\(C\)|\[C\])/gi;
	var reDimsign = /([\d\.,]+['"]? ?)x( ?)(?=[\d\.,]['"]?)/g;
	var reDoublePrime = re.compile(/(\d*[\.,]?\d+)"(?=\s|$|[:punct:])/g);
	var reEllipsis = /([^.]?)\.{3}/g;
	var reEmdash = /(^|[\s\w])--([\s\w]|$)/g;
	var reEndash = / - /g;
	var reOpenDQuote = /"/g;
	var reOpenSQuote = /'/g;
	var reRegistered = /(\b ?|\s|^)(?:\(R\)|\[R\])/gi;
	var reSinglePrime = re.compile(/(\d*[\.,]?\d+)'(?=\s|$|[:punct:])/g);
	var reTrademark = /(\b ?|\s|^)(?:\((?:TM|tm)\)|\[(?:TM|tm)\])/g;
	
	exports.parseGlyph = function parseGlyph(src) {
	  if (typeof src !== 'string') {
	    return src;
	  }
	  // NB: order is important here ...
	  return src.replace(reArrow, '$1&#8594;').replace(reDimsign, '$1&#215;$2').replace(reEllipsis, '$1&#8230;').replace(reEmdash, '$1&#8212;$2').replace(reEndash, ' &#8211; ').replace(reTrademark, '$1&#8482;').replace(reRegistered, '$1&#174;').replace(reCopyright, '$1&#169;')
	  // double quotes
	  .replace(reDoublePrime, '$1&#8243;').replace(reClosingDQuote, '$1&#8221;').replace(reOpenDQuote, '&#8220;')
	  // single quotes
	  .replace(reSinglePrime, '$1&#8242;').replace(reApostrophe, '$1&#8217;$2').replace(reClosingSQuote, '$1&#8217;').replace(reOpenSQuote, '&#8216;')
	  // fractions and degrees
	  .replace(/[\(\[]1\/4[\]\)]/, '&#188;').replace(/[\(\[]1\/2[\]\)]/, '&#189;').replace(/[\(\[]3\/4[\]\)]/, '&#190;').replace(/[\(\[]o[\]\)]/, '&#176;').replace(/[\(\[]\+\/\-[\]\)]/, '&#177;');
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';
	
	/* eslint camelcase: 0 */
	
	exports.txblocks = '(?:b[qc]|div|notextile|pre|h[1-6]|fn\\d+|p|###)';
	
	exports.ucaps = 'A-Z' +
	// Latin extended À-Þ
	'À-ÖØ-Þ' +
	// Latin caps with embelishments and ligatures...
	'ĀĂĄĆĈĊČĎĐĒĔĖĘĚĜĞĠĢĤĦĨĪĬĮİĲĴĶĹĻĽĿ' + 'ŁŃŅŇŊŌŎŐŒŔŖŘŚŜŞŠŢŤŦŨŪŬŮŰŲŴŶŸŹŻŽ' + 'ƁƂƄƆƇƉ-ƋƎ-ƑƓƔƖ-ƘƜƝƟƠƢƤƦƧƩƬƮƯƱ-ƳƵƷƸƼ' + 'ǄǇǊǍǏǑǓǕǗǙǛǞǠǢǤǦǨǪǬǮǱǴǶ-ǸǺǼǾ' + 'ȀȂȄȆȈȊȌȎȐȒȔȖȘȚȜȞȠȢȤȦȨȪȬȮȰȲȺȻȽȾ' + 'ɁɃ-ɆɈɊɌɎ' + 'ḀḂḄḆḈḊḌḎḐḒḔḖḘḚḜḞḠḢḤḦḨḪḬḮḰḲḴḶḸḺḼḾṀ' + 'ṂṄṆṈṊṌṎṐṒṔṖṘṚṜṞṠṢṤṦṨṪṬṮṰṲṴṶṸṺṼṾ' + 'ẀẂẄẆẈẊẌẎẐẒẔẞẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼẾ' + 'ỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴỶỸỺỼỾ' + 'ⱠⱢ-ⱤⱧⱩⱫⱭ-ⱰⱲⱵⱾⱿ' + 'ꜢꜤꜦꜨꜪꜬꜮꜲꜴꜶꜸꜺꜼꜾ' + 'ꝀꝂꝄꝆꝈꝊꝌꝎꝐꝒꝔꝖꝘꝚꝜꝞꝠꝢꝤꝦꝨꝪꝬꝮꝹꝻꝽꝾ' + 'ꞀꞂꞄꞆꞋꞍꞐꞒꞠꞢꞤꞦꞨꞪ';
	
	exports.txcite = ':((?:[^\\s()]|\\([^\\s()]+\\)|[()])+?)(?=[!-\\.:-@\\[\\\\\\]-`{-~]+(?:$|\\s)|$|\\s)';
	
	var attr_class = exports.attr_class = '\\([^\\)]+\\)';
	var attr_style = exports.attr_style = '\\{[^\\}]+\\}';
	var attr_lang = exports.attr_lang = '\\[[^\\[\\]]+\\]';
	var attr_align = exports.attr_align = '(?:<>|<|>|=)';
	var attr_pad = exports.attr_pad = '[\\(\\)]+';
	
	var txattr = exports.txattr = '(?:' + attr_class + '|' + attr_style + '|' + attr_lang + '|' + attr_align + '|' + attr_pad + ')*';
	
	exports.txlisthd = '[\\t ]*[\\#\\*]*(\\*|\\#(?:_|\\d+)?)' + txattr + '(?: \\S|\\.\\s*(?=\\S|\\n))';

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/* textile list parser */
	var ribbon = __webpack_require__(5);
	var re = __webpack_require__(4);
	var merge = __webpack_require__(1);
	
	var _require = __webpack_require__(10);
	
	var parseAttr = _require.parseAttr;
	
	var _require2 = __webpack_require__(9);
	
	var parsePhrase = _require2.parsePhrase;
	
	var _require3 = __webpack_require__(12);
	
	var txlisthd = _require3.txlisthd;
	
	re.pattern.txlisthd = txlisthd;
	var reList = re.compile(/^((?:[:txlisthd:][^\0]*?(?:\r?\n|$))+)(\s*\n|$)/, 's');
	var reItem = re.compile(/^([#\*]+)([^\0]+?)(\n(?=[:txlisthd:])|$)/, 's');
	
	function listPad(n) {
	  var s = '\n';
	  while (n--) {
	    s += '\t';
	  }
	  return s;
	}
	
	function testList(src) {
	  return reList.exec(src);
	}
	
	function parseList(src, options) {
	  src = ribbon(src.replace(/(^|\r?\n)[\t ]+/, '$1'));
	
	  var stack = [];
	  var currIndex = {};
	  var lastIndex = options._lst || {};
	  var itemIndex = 0;
	  var listAttr = void 0;
	  var m = void 0;
	  var n = void 0;
	  var s = void 0;
	
	  while (m = reItem.exec(src)) {
	    var item = ['li'];
	    var destLevel = m[1].length;
	    var type = m[1].substr(-1) === '#' ? 'ol' : 'ul';
	    var newLi = null;
	    var lst = void 0;
	    var par = void 0;
	    var pba = void 0;
	    var r = void 0;
	
	    // list starts and continuations
	    if (n = /^(_|\d+)/.exec(m[2])) {
	      itemIndex = isFinite(n[1]) ? parseInt(n[1], 10) : lastIndex[destLevel] || currIndex[destLevel] || 1;
	      m[2] = m[2].slice(n[1].length);
	    }
	
	    if (pba = parseAttr(m[2], 'li')) {
	      m[2] = m[2].slice(pba[0]);
	      pba = pba[1];
	    }
	
	    // list control
	    if (/^\.\s*$/.test(m[2])) {
	      listAttr = pba || {};
	      src.advance(m[0]);
	      continue;
	    }
	
	    // create nesting until we have correct level
	    while (stack.length < destLevel) {
	      // list always has an attribute object, this simplifies first-pba resolution
	      lst = [type, {}, listPad(stack.length + 1), newLi = ['li']];
	      par = stack[stack.length - 1];
	      if (par) {
	        par.li.push(listPad(stack.length));
	        par.li.push(lst);
	      }
	      stack.push({
	        ul: lst,
	        li: newLi,
	        // count attributes's found per list
	        att: 0
	      });
	      currIndex[stack.length] = 1;
	    }
	
	    // remove nesting until we have correct level
	    while (stack.length > destLevel) {
	      r = stack.pop();
	      r.ul.push(listPad(stack.length));
	      // lists have a predictable structure - move pba from listitem to list
	      if (r.att === 1 && !r.ul[3][1].substr) {
	        merge(r.ul[1], r.ul[3].splice(1, 1)[0]);
	      }
	    }
	
	    // parent list
	    par = stack[stack.length - 1];
	
	    if (itemIndex) {
	      par.ul[1].start = itemIndex;
	      currIndex[destLevel] = itemIndex;
	      // falsy prevents this from fireing until it is set again
	      itemIndex = 0;
	    }
	    if (listAttr) {
	      // "more than 1" prevent attribute transfers on list close
	      par.att = 9;
	      merge(par.ul[1], listAttr);
	      listAttr = null;
	    }
	
	    if (!newLi) {
	      par.ul.push(listPad(stack.length), item);
	      par.li = item;
	    }
	    if (pba) {
	      par.li.push(pba);
	      par.att++;
	    }
	    Array.prototype.push.apply(par.li, parsePhrase(m[2].trim(), options));
	
	    src.advance(m[0]);
	    currIndex[destLevel] = (currIndex[destLevel] || 0) + 1;
	  }
	
	  // remember indexes for continuations next time
	  options._lst = currIndex;
	
	  while (stack.length) {
	    s = stack.pop();
	    s.ul.push(listPad(stack.length));
	    // lists have a predictable structure - move pba from listitem to list
	    if (s.att === 1 && !s.ul[3][1].substr) {
	      merge(s.ul[1], s.ul[3].splice(1, 1)[0]);
	    }
	  }
	
	  return s.ul;
	}
	
	module.exports = {
	  testList: testList,
	  parseList: parseList
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/* definitions list parser */
	
	var ribbon = __webpack_require__(5);
	
	var reDeflist = /^((?:- (?:[^\n]\n?)+?)+:=(?: *\n[^\0]+?=:(?:\n|$)|(?:[^\0]+?(?:$|\n(?=\n|- )))))+/;
	var reItem = /^((?:- (?:[^\n]\n?)+?)+):=( *\n[^\0]+?=:\s*(?:\n|$)|(?:[^\0]+?(?:$|\n(?=\n|- ))))/;
	
	function testDefList(src) {
	  return reDeflist.exec(src);
	}
	
	function parseDefList(src, options) {
	  src = ribbon(src.trim());
	
	  // late loading to get around the lack of non-circular-dependency support in RequireJS
	  var parsePhrase = __webpack_require__(9).parsePhrase;
	  var parseFlow = __webpack_require__(6).parseFlow;
	
	  var deflist = ['dl', '\n'];
	  var terms = void 0;
	  var def = void 0;
	  var m = void 0;
	
	  while (m = reItem.exec(src)) {
	    // add terms
	    terms = m[1].split(/(?:^|\n)\- /).slice(1);
	    while (terms.length) {
	      deflist.push('\t', ['dt'].concat(parsePhrase(terms.shift().trim(), options)), '\n');
	    }
	    // add definitions
	    def = m[2].trim();
	    deflist.push('\t', ['dd'].concat(/=:$/.test(def) ? parseFlow(def.slice(0, -2).trim(), options) : parsePhrase(def, options)), '\n');
	    src.advance(m[0]);
	  }
	  return deflist;
	}
	
	exports.testDefList = testDefList;
	exports.parseDefList = parseDefList;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/* textile table parser */
	
	var re = __webpack_require__(4);
	var merge = __webpack_require__(1);
	var ribbon = __webpack_require__(5);
	
	var _require = __webpack_require__(10);
	
	var parseAttr = _require.parseAttr;
	
	var _require2 = __webpack_require__(9);
	
	var parsePhrase = _require2.parsePhrase;
	
	var _require3 = __webpack_require__(2);
	
	var reIndent = _require3.reIndent;
	
	var _require4 = __webpack_require__(12);
	
	var txattr = _require4.txattr;
	
	re.pattern.txattr = txattr;
	
	var reTable = re.compile(/^((?:table[:txattr:]\.(?:\s(.+?))\s*\n)?(?:(?:[:txattr:]\.[^\n\S]*)?\|.*?\|[^\n\S]*(?:\n|$))+)([^\n\S]*\n)?/, 's');
	var reHead = /^table(_?)([^\n]*?)\.(?:[ \t](.+?))?\s*\n/;
	var reRow = re.compile(/^(?:\|([~\^\-][:txattr:])\.\s*\n)?([:txattr:]\.[^\n\S]*)?\|(.*?)\|[^\n\S]*(\n|$)/, 's');
	var reCaption = /^\|=([^\n+]*)\n/;
	var reColgroup = /^\|:([^\n+]*)\|[\r\t ]*\n/;
	var reRowgroup = /^\|([\^\-~])([^\n+]*)\.[ \t\r]*\n/;
	
	var charToTag = {
	  '^': 'thead',
	  '~': 'tfoot',
	  '-': 'tbody'
	};
	
	function parseColgroup(src) {
	  var colgroup = ['colgroup', {}];
	  src.split('|').forEach(function (s, isCol) {
	    var col = isCol ? {} : colgroup[1];
	    var d = s.trim();
	    var m = void 0;
	    if (d) {
	      if (m = /^\\(\d+)/.exec(d)) {
	        col.span = +m[1];
	        d = d.slice(m[0].length);
	      }
	      if (m = parseAttr(d, 'col')) {
	        merge(col, m[1]);
	        d = d.slice(m[0]);
	      }
	      if (m = /\b\d+\b/.exec(d)) {
	        col.width = +m[0];
	      }
	    }
	    if (isCol) {
	      colgroup.push('\n\t\t', ['col', col]);
	    }
	  });
	  return colgroup.concat(['\n\t']);
	}
	
	function testTable(src) {
	  return reTable.exec(src);
	}
	
	function parseTable(src, options) {
	  src = ribbon(src.trim());
	
	  var rowgroups = [];
	  var colgroup = void 0;
	  var caption = void 0;
	  var tAttr = {};
	  var tCurr = void 0;
	  var row = void 0;
	  var inner = void 0;
	  var pba = void 0;
	  var more = void 0;
	  var m = void 0;
	  var extended = 0;
	
	  var setRowGroup = function setRowGroup(type, pba) {
	    tCurr = [type, pba || {}];
	    rowgroups.push(tCurr);
	  };
	
	  if (m = reHead.exec(src)) {
	    // parse and apply table attr
	    src.advance(m[0]);
	    pba = parseAttr(m[2], 'table');
	    if (pba) {
	      merge(tAttr, pba[1]);
	    }
	    if (m[3]) {
	      tAttr.summary = m[3];
	    }
	  }
	
	  // caption
	  if (m = reCaption.exec(src)) {
	    caption = ['caption'];
	    if (pba = parseAttr(m[1], 'caption')) {
	      caption.push(pba[1]);
	      m[1] = m[1].slice(pba[0]);
	    }
	    if (/\./.test(m[1])) {
	      // mandatory "."
	      caption.push(m[1].slice(1).replace(/\|\s*$/, '').trim());
	      extended++;
	      src.advance(m[0]);
	    } else {
	      caption = null;
	    }
	  }
	
	  do {
	    // colgroup
	    if (m = reColgroup.exec(src)) {
	      colgroup = parseColgroup(m[1]);
	      extended++;
	    }
	    // "rowgroup" (tbody, thead, tfoot)
	    else if (m = reRowgroup.exec(src)) {
	        // PHP allows any amount of these in any order
	        // and simply translates them straight through
	        // the same is done here.
	        var tag = charToTag[m[1]] || 'tbody';
	        pba = parseAttr(m[2] + ' ', tag);
	        setRowGroup(tag, pba && pba[1]);
	        extended++;
	      }
	      // row
	      else if (m = reRow.exec(src)) {
	          if (!tCurr) {
	            setRowGroup('tbody');
	          }
	
	          row = ['tr'];
	
	          if (m[2] && (pba = parseAttr(m[2], 'tr'))) {
	            // FIXME: requires "\.\s?" -- else what ?
	            row.push(pba[1]);
	          }
	
	          tCurr.push('\n\t\t', row);
	          inner = ribbon(m[3]);
	
	          do {
	            inner.save();
	
	            // cell loop
	            var th = inner.startsWith('_');
	            var cell = [th ? 'th' : 'td'];
	            if (th) {
	              inner.advance(1);
	            }
	
	            pba = parseAttr(inner, 'td');
	            if (pba) {
	              inner.advance(pba[0]);
	              cell.push(pba[1]); // FIXME: don't do this if next text fails
	            }
	
	            if (pba || th) {
	              var p = /^\.\s*/.exec(inner);
	              if (p) {
	                inner.advance(p[0]);
	              } else {
	                cell = ['td'];
	                inner.load();
	              }
	            }
	
	            var mx = /^(==.*?==|[^\|])*/.exec(inner);
	            cell = cell.concat(parsePhrase(mx[0], options));
	            row.push('\n\t\t\t', cell);
	            more = inner.valueOf().charAt(mx[0].length) === '|';
	            inner.advance(mx[0].length + 1);
	          } while (more);
	
	          row.push('\n\t\t');
	        }
	    //
	    if (m) {
	      src.advance(m[0]);
	    }
	  } while (m);
	
	  // assemble table
	  var table = ['table', tAttr];
	  if (extended) {
	    if (caption) {
	      table.push('\n\t', caption);
	    }
	    if (colgroup) {
	      table.push('\n\t', colgroup);
	    }
	    rowgroups.forEach(function (tbody) {
	      table.push('\n\t', tbody.concat(['\n\t']));
	    });
	  } else {
	    table = table.concat(reIndent(rowgroups[0].slice(2), -1));
	  }
	
	  table.push('\n');
	  return table;
	}
	
	module.exports = {
	  parseColgroup: parseColgroup,
	  parseTable: parseTable,
	  testTable: testTable
	};

/***/ }
/******/ ])
});
;
//# sourceMappingURL=textile.js.map