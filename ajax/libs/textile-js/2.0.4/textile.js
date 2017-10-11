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
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	/*
	** Textile parser for JavaScript
	**
	** Copyright (c) 2012 Borgar Þorsteinsson (MIT License).
	**
	*/
	
	var merge = __webpack_require__(1);
	
	var _require = __webpack_require__(2),
	    toHTML = _require.toHTML;
	
	var _require2 = __webpack_require__(6),
	    parseFlow = _require2.parseFlow;
	
	var _require3 = __webpack_require__(3),
	    parseHtml = _require3.parseHtml;
	
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

/***/ }),
/* 1 */
/***/ (function(module, exports) {

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

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
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
	  } else if (tag in singletons || tag.indexOf(':') > -1 && !content.length) {
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

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var re = __webpack_require__(4);
	var ribbon = __webpack_require__(5);
	
	re.pattern.html_id = '[a-zA-Z][a-zA-Z\\d:]*';
	re.pattern.html_attr = '(?:"[^"]+"|\'[^\']+\'|[^>\\s]+)';
	
	var reAttr = re.compile(/^\s*([^=\s]+)(?:\s*=\s*("[^"]+"|'[^']+'|[^>\s]+))?/);
	var reComment = re.compile(/^<!--(.+?)-->/, 's');
	var reEndTag = re.compile(/^<\/([:html_id:])([^>]*)>/);
	var reTag = re.compile(/^<([:html_id:])((?:\s[^=\s\/]+(?:\s*=\s*[:html_attr:])?)+)?\s*(\/?)>/);
	var reHtmlTagBlock = re.compile(/^\s*<([:html_id:](?::[a-zA-Z\d]+)*)((?:\s[^=\s\/]+(?:\s*=\s*[:html_attr:])?)+)?\s*(\/?)>/);
	
	var singletons = {
	  area: 1,
	  base: 1,
	  br: 1,
	  col: 1,
	  embed: 1,
	  hr: 1,
	  img: 1,
	  input: 1,
	  link: 1,
	  meta: 1,
	  option: 1,
	  param: 1,
	  wbr: 1
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
	
	var OPEN = 'OPEN';
	var CLOSE = 'CLOSE';
	var SINGLE = 'SINGLE';
	var TEXT = 'TEXT';
	var COMMENT = 'COMMENT';
	var WS = 'WS';
	
	function tokenize(src, whitelistTags, lazy) {
	  var tokens = [];
	  var textMode = false;
	  var oktag = whitelistTags ? function (tag) {
	    return tag in whitelistTags;
	  } : allowAll;
	  var oktag_ = oktag;
	  var nesting = {};
	  var nestCount = 0;
	  var m = void 0;
	
	  src = ribbon(String(src));
	
	  do {
	    // comment
	    if ((m = testComment(src)) && oktag('!')) {
	      tokens.push({
	        type: COMMENT,
	        data: m[1],
	        pos: src.index(),
	        src: m[0]
	      });
	      src.advance(m[0]);
	    }
	
	    // end tag
	    else if ((m = testCloseTag(src)) && oktag(m[1])) {
	        var token = {
	          type: CLOSE,
	          tag: m[1],
	          pos: src.index(),
	          src: m[0]
	        };
	        src.advance(m[0]);
	        tokens.push(token);
	        nesting[token.tag]--;
	        nestCount--;
	        // console.log( '/' + token.tag, nestCount, nesting );
	        if (lazy && (!nestCount || !nesting[token.tag] < 0 || isNaN(nesting[token.tag]))) {
	          return tokens;
	        }
	        // if parse is in text mode then that ends here
	        if (textMode) {
	          textMode = null;
	          oktag = oktag_;
	        }
	      }
	
	      // open/void tag
	      else if ((m = testOpenTag(src)) && oktag(m[1])) {
	          var _token = {
	            type: m[3] || m[1] in singletons ? SINGLE : OPEN,
	            tag: m[1],
	            pos: src.index(),
	            src: m[0]
	          };
	          if (m[2]) {
	            _token.attr = parseHtmlAttr(m[2]);
	          }
	          // some elements can move parser into "text" mode
	          if (m[1] === 'script' || m[1] === 'code' || m[1] === 'style') {
	            textMode = _token.tag;
	            oktag = function oktag(tag) {
	              return tag === textMode;
	            };
	          }
	          if (_token.type === OPEN) {
	            nestCount++;
	            nesting[_token.tag] = (nesting[_token.tag] || 0) + 1;
	            // console.log( token.tag, nestCount, nesting );
	          }
	          tokens.push(_token);
	          src.advance(m[0]);
	        }
	
	        // text content
	        else {
	            // no match, move by all "uninteresting" chars
	            m = /([^<]+|[^\0])/.exec(src);
	            if (m) {
	              tokens.push({
	                type: TEXT,
	                data: m[0],
	                pos: src.index(),
	                src: m[0]
	              });
	            }
	            src.advance(m ? m[0].length || 1 : 1);
	          }
	  } while (src.valueOf());
	
	  return tokens;
	}
	
	// This "indesciminately" parses HTML text into a list of JSON-ML element
	// No steps are taken however to prevent things like <table><p><td> - user can still create nonsensical but "well-formed" markup
	function parse(tokens, lazy) {
	  var root = [];
	  var stack = [];
	  var curr = root;
	  var token = void 0;
	  for (var i = 0; i < tokens.length; i++) {
	    token = tokens[i];
	    if (token.type === COMMENT) {
	      curr.push(['!', token.data]);
	    } else if (token.type === TEXT || token.type === WS) {
	      curr.push(token.data);
	    } else if (token.type === SINGLE) {
	      curr.push(token.attr ? [token.tag, token.attr] : [token.tag]);
	    } else if (token.type === OPEN) {
	      // TODO: some things auto close other things: <td>, <li>, <p>, <table>
	      // https://html.spec.whatwg.org/multipage/syntax.html#syntax-tag-omission
	      var elm = token.attr ? [token.tag, token.attr] : [token.tag];
	      curr.push(elm);
	      stack.push(elm);
	      curr = elm;
	    } else if (token.type === CLOSE) {
	      if (stack.length) {
	        for (var _i = stack.length - 1; _i >= 0; _i--) {
	          var head = stack[_i];
	          if (head[0] === token.tag) {
	            stack.splice(_i);
	            curr = stack[stack.length - 1] || root;
	            break;
	          }
	        }
	      }
	      if (!stack.length && lazy) {
	        root.sourceLength = token.pos + token.src.length;
	        return root;
	      }
	    }
	  }
	  root.sourceLength = token ? token.pos + token.src.length : 0;
	  return root;
	}
	
	module.exports = {
	  singletons: singletons,
	  tokenize: tokenize,
	  parseHtml: parse,
	  parseHtmlAttr: parseHtmlAttr,
	  testCloseTag: testCloseTag,
	  testOpenTagBlock: testOpenTagBlock,
	  testOpenTag: testOpenTag,
	  testComment: testComment
	};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

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

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	'use strict';
	
	module.exports = function ribbon(feed) {
	  var org = String(feed);
	  var slot = void 0;
	  var pos = 0;
	  var self = {
	
	    index: function index() {
	      return pos;
	    },
	
	    save: function save() {
	      slot = pos;
	      return self;
	    },
	
	    load: function load() {
	      pos = slot;
	      feed = org.slice(pos);
	      return self;
	    },
	
	    advance: function advance(n) {
	      pos += typeof n === 'string' ? n.length : n;
	      feed = org.slice(pos);
	      return feed;
	    },
	
	    skipWS: function skipWS() {
	      var ws = /^\s+/.exec(feed);
	      if (ws) {
	        pos += ws[0].length;
	        feed = org.slice(pos);
	        return ws[0];
	      }
	      return '';
	    },
	
	    lookbehind: function lookbehind(nchars) {
	      nchars = nchars == null ? 1 : nchars;
	      return org.slice(pos - nchars, pos);
	    },
	
	    startsWith: function startsWith(s) {
	      return feed.substring(0, s.length) === s;
	    },
	
	    slice: function slice(a, b) {
	      return b != null ? feed.slice(a, b) : feed.slice(a);
	    },
	
	    valueOf: function valueOf() {
	      return feed;
	    },
	
	    toString: function toString() {
	      return feed;
	    }
	
	  };
	
	  return self;
	};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	/*
	** textile flow content parser
	*/
	var builder = __webpack_require__(7);
	var ribbon = __webpack_require__(5);
	var re = __webpack_require__(4);
	var fixLinks = __webpack_require__(8);
	
	var _require = __webpack_require__(3),
	    parseHtml = _require.parseHtml,
	    tokenize = _require.tokenize,
	    parseHtmlAttr = _require.parseHtmlAttr,
	    singletons = _require.singletons,
	    testComment = _require.testComment,
	    testOpenTagBlock = _require.testOpenTagBlock;
	
	var _require2 = __webpack_require__(9),
	    parsePhrase = _require2.parsePhrase;
	
	var _require3 = __webpack_require__(10),
	    copyAttr = _require3.copyAttr,
	    parseAttr = _require3.parseAttr;
	
	var _require4 = __webpack_require__(13),
	    testList = _require4.testList,
	    parseList = _require4.parseList;
	
	var _require5 = __webpack_require__(14),
	    testDefList = _require5.testDefList,
	    parseDefList = _require5.parseDefList;
	
	var _require6 = __webpack_require__(15),
	    testTable = _require6.testTable,
	    parseTable = _require6.parseTable;
	
	var _require7 = __webpack_require__(12),
	    txblocks = _require7.txblocks,
	    txlisthd = _require7.txlisthd,
	    txattr = _require7.txattr;
	
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
	var reBlockNormal = re.compile(/^(.*?)($|\r?\n(?=[:txlisthd:])|\r?\n(?:\s*\n|$)+)/, 's');
	var reBlockExtended = re.compile(/^(.*?)($|\r?\n(?=[:txlisthd:])|\r?\n+(?=[:txblocks:][:txattr:]\.))/, 's');
	var reBlockNormalPre = re.compile(/^(.*?)($|\r?\n(?:\s*\n|$)+)/, 's');
	var reBlockExtendedPre = re.compile(/^(.*?)($|\r?\n+(?=[:txblocks:][:txattr:]\.))/, 's');
	
	var reRuler = /^(\-\-\-+|\*\*\*+|___+)(\r?\n\s+|$)/;
	var reLinkRef = re.compile(/^\[([^\]]+)\]((?:https?:\/\/|\/)\S+)(?:\s*\n|$)/);
	var reFootnoteDef = /^fn\d+$/;
	
	var hasOwn = Object.prototype.hasOwnProperty;
	function extend(target) {
	  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    args[_key - 1] = arguments[_key];
	  }
	
	  for (var i = 1; i < args.length; i++) {
	    var src = args[i];
	    if (src != null) {
	      for (var nextKey in src) {
	        if (hasOwn.call(src, nextKey)) {
	          target[nextKey] = src[nextKey];
	        }
	      }
	    }
	  }
	  return target;
	}
	
	function paragraph(s, tag, pba, linebreak, options) {
	  tag = tag || 'p';
	  var out = [];
	  s.split(/(?:\r?\n){2,}/).forEach(function (bit, i) {
	    if (tag === 'p' && /^\s/.test(bit)) {
	      // no-paragraphs
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
	        if (blockType === 'bc' || blockType === 'pre') {
	          reBlockGlob = extended ? reBlockExtendedPre : reBlockNormalPre;
	        }
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
	        } else if (blockType === 'bc') {
	          var subPba = pba ? copyAttr(pba, { 'id': 1 }) : null;
	          list.add(['pre', pba, subPba ? ['code', subPba, m[1]] : ['code', m[1]]]);
	        } else if (blockType === 'notextile') {
	          list.merge(parseHtml(tokenize(m[1])));
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
	
	      // Is block tag? ...
	      if (tag in allowedBlocktags) {
	        if (m[3] || tag in singletons) {
	          // single?
	          src.advance(m[0]);
	          if (/^\s*(\n|$)/.test(src)) {
	            var elm = [tag];
	            if (m[2]) {
	              elm.push(parseHtmlAttr(m[2]));
	            }
	            list.add(elm);
	            src.skipWS();
	            continue;
	          }
	        } else if (tag === 'pre') {
	          var t = tokenize(src, { 'pre': 1, 'code': 1 }, tag);
	          var p = parseHtml(t, true);
	          src.load().advance(p.sourceLength);
	          if (/^\s*(\n|$)/.test(src)) {
	            list.merge(p);
	            src.skipWS(); // skip tailing whitespace
	            continue;
	          }
	        } else if (tag === 'notextile') {
	          // merge all child elements
	          var _t = tokenize(src, null, tag);
	          var s = 1; // start after open tag
	          while (/^\s+$/.test(_t[s].src)) {
	            s++; // skip whitespace
	          }
	          var _p = parseHtml(_t.slice(s, -1), true);
	          var x = _t.pop();
	          src.load().advance(x.pos + x.src.length);
	          if (/^\s*(\n|$)/.test(src)) {
	            list.merge(_p);
	            src.skipWS(); // skip tailing whitespace
	            continue;
	          }
	        } else {
	          src.skipWS();
	          var _t2 = tokenize(src, null, tag);
	          var _x = _t2.pop(); // this should be the end tag
	          var _s = 1; // start after open tag
	          while (_t2[_s] && /^[\n\r]+$/.test(_t2[_s].src)) {
	            _s++; // skip whitespace
	          }
	          if (_x.tag === tag) {
	            // inner can be empty
	            var _inner = _t2.length > 1 ? src.slice(_t2[_s].pos, _x.pos) : '';
	            src.advance(_x.pos + _x.src.length);
	            if (/^\s*(\n|$)/.test(src)) {
	              var _elm = [tag];
	              if (m[2]) {
	                _elm.push(parseHtmlAttr(m[2]));
	              }
	              if (tag === 'script' || tag === 'style') {
	                _elm.push(_inner);
	              } else {
	                var innerHTML = _inner.replace(/^\n+/, '').replace(/\s*$/, '');
	                var isBlock = /\n\r?\n/.test(innerHTML) || tag === 'ol' || tag === 'ul';
	                var innerElm = isBlock ? parseFlow(innerHTML, options) : parsePhrase(innerHTML, extend({}, options, { breaks: false }));
	                if (isBlock || /^\n/.test(_inner)) {
	                  _elm.push('\n');
	                }
	                if (isBlock || /\s$/.test(_inner)) {
	                  innerElm.push('\n');
	                }
	                _elm = _elm.concat(innerElm);
	              }
	
	              list.add(_elm);
	              src.skipWS(); // skip tailing whitespace
	              continue;
	            }
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

/***/ }),
/* 7 */
/***/ (function(module, exports) {

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

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
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

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	/* textile inline parser */
	
	var ribbon = __webpack_require__(5);
	var builder = __webpack_require__(7);
	var re = __webpack_require__(4);
	
	var _require = __webpack_require__(10),
	    parseAttr = _require.parseAttr;
	
	var _require2 = __webpack_require__(11),
	    parseGlyph = _require2.parseGlyph;
	
	var _require3 = __webpack_require__(3),
	    parseHtml = _require3.parseHtml,
	    parseHtmlAttr = _require3.parseHtmlAttr,
	    tokenize = _require3.tokenize,
	    singletons = _require3.singletons,
	    testComment = _require3.testComment,
	    testOpenTag = _require3.testOpenTag;
	
	var _require4 = __webpack_require__(12),
	    ucaps = _require4.ucaps,
	    txattr = _require4.txattr,
	    txcite = _require4.txcite;
	
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
	var reLink = re.compile(/^"(?!\s)((?:[^"]|"(?![\s:])[^\n"]+"(?!:))+)"[:txcite:]/);
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
	      if (src.startsWith(' ')) {
	        src.advance(1);
	      } else if (options.breaks) {
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
	      if (m[2]) {
	        element.push(parseHtmlAttr(m[2]));
	      }
	      if (single) {
	        // single tag
	        list.add(element).add(src.skipWS());
	        continue;
	      } else {
	        // need terminator
	        // gulp up the rest of this block...
	        var reEndTag = re.compile('^(.*?)(</' + tag + '\\s*>)', 's');
	        if (m = reEndTag.exec(src)) {
	          src.advance(m[0]);
	          if (tag === 'code') {
	            element.push(m[1]);
	          } else if (tag === 'notextile') {
	            // HTML is still parsed, even though textile is not
	            list.merge(parseHtml(tokenize(m[1])));
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

/***/ }),
/* 10 */
/***/ (function(module, exports) {

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

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 12 */
/***/ (function(module, exports) {

	'use strict';
	
	/* eslint camelcase: 0 */
	
	exports.txblocks = '(?:b[qc]|div|notextile|pre|h[1-6]|fn\\d+|p|###)';
	
	exports.ucaps = 'A-Z' +
	// Latin extended À-Þ
	'\xC0-\xD6\xD8-\xDE' +
	// Latin caps with embelishments and ligatures...
	'\u0100\u0102\u0104\u0106\u0108\u010A\u010C\u010E\u0110\u0112\u0114\u0116\u0118\u011A\u011C\u011E\u0120\u0122\u0124\u0126\u0128\u012A\u012C\u012E\u0130\u0132\u0134\u0136\u0139\u013B\u013D\u013F' + '\u0141\u0143\u0145\u0147\u014A\u014C\u014E\u0150\u0152\u0154\u0156\u0158\u015A\u015C\u015E\u0160\u0162\u0164\u0166\u0168\u016A\u016C\u016E\u0170\u0172\u0174\u0176\u0178\u0179\u017B\u017D' + '\u0181\u0182\u0184\u0186\u0187\u0189-\u018B\u018E-\u0191\u0193\u0194\u0196-\u0198\u019C\u019D\u019F\u01A0\u01A2\u01A4\u01A6\u01A7\u01A9\u01AC\u01AE\u01AF\u01B1-\u01B3\u01B5\u01B7\u01B8\u01BC' + '\u01C4\u01C7\u01CA\u01CD\u01CF\u01D1\u01D3\u01D5\u01D7\u01D9\u01DB\u01DE\u01E0\u01E2\u01E4\u01E6\u01E8\u01EA\u01EC\u01EE\u01F1\u01F4\u01F6-\u01F8\u01FA\u01FC\u01FE' + '\u0200\u0202\u0204\u0206\u0208\u020A\u020C\u020E\u0210\u0212\u0214\u0216\u0218\u021A\u021C\u021E\u0220\u0222\u0224\u0226\u0228\u022A\u022C\u022E\u0230\u0232\u023A\u023B\u023D\u023E' + '\u0241\u0243-\u0246\u0248\u024A\u024C\u024E' + '\u1E00\u1E02\u1E04\u1E06\u1E08\u1E0A\u1E0C\u1E0E\u1E10\u1E12\u1E14\u1E16\u1E18\u1E1A\u1E1C\u1E1E\u1E20\u1E22\u1E24\u1E26\u1E28\u1E2A\u1E2C\u1E2E\u1E30\u1E32\u1E34\u1E36\u1E38\u1E3A\u1E3C\u1E3E\u1E40' + '\u1E42\u1E44\u1E46\u1E48\u1E4A\u1E4C\u1E4E\u1E50\u1E52\u1E54\u1E56\u1E58\u1E5A\u1E5C\u1E5E\u1E60\u1E62\u1E64\u1E66\u1E68\u1E6A\u1E6C\u1E6E\u1E70\u1E72\u1E74\u1E76\u1E78\u1E7A\u1E7C\u1E7E' + '\u1E80\u1E82\u1E84\u1E86\u1E88\u1E8A\u1E8C\u1E8E\u1E90\u1E92\u1E94\u1E9E\u1EA0\u1EA2\u1EA4\u1EA6\u1EA8\u1EAA\u1EAC\u1EAE\u1EB0\u1EB2\u1EB4\u1EB6\u1EB8\u1EBA\u1EBC\u1EBE' + '\u1EC0\u1EC2\u1EC4\u1EC6\u1EC8\u1ECA\u1ECC\u1ECE\u1ED0\u1ED2\u1ED4\u1ED6\u1ED8\u1EDA\u1EDC\u1EDE\u1EE0\u1EE2\u1EE4\u1EE6\u1EE8\u1EEA\u1EEC\u1EEE\u1EF0\u1EF2\u1EF4\u1EF6\u1EF8\u1EFA\u1EFC\u1EFE' + '\u2C60\u2C62-\u2C64\u2C67\u2C69\u2C6B\u2C6D-\u2C70\u2C72\u2C75\u2C7E\u2C7F' + '\uA722\uA724\uA726\uA728\uA72A\uA72C\uA72E\uA732\uA734\uA736\uA738\uA73A\uA73C\uA73E' + '\uA740\uA742\uA744\uA746\uA748\uA74A\uA74C\uA74E\uA750\uA752\uA754\uA756\uA758\uA75A\uA75C\uA75E\uA760\uA762\uA764\uA766\uA768\uA76A\uA76C\uA76E\uA779\uA77B\uA77D\uA77E' + '\uA780\uA782\uA784\uA786\uA78B\uA78D\uA790\uA792\uA7A0\uA7A2\uA7A4\uA7A6\uA7A8\uA7AA';
	
	exports.txcite = ':((?:[^\\s()]|\\([^\\s()]+\\)|[()])+?)(?=[!-\\.:-@\\[\\\\\\]-`{-~]+(?:$|\\s)|$|\\s)';
	
	var attr_class = exports.attr_class = '\\([^\\)]+\\)';
	var attr_style = exports.attr_style = '\\{[^\\}]+\\}';
	var attr_lang = exports.attr_lang = '\\[[^\\[\\]]+\\]';
	var attr_align = exports.attr_align = '(?:<>|<|>|=)';
	var attr_pad = exports.attr_pad = '[\\(\\)]+';
	
	var txattr = exports.txattr = '(?:' + attr_class + '|' + attr_style + '|' + attr_lang + '|' + attr_align + '|' + attr_pad + ')*';
	
	exports.txlisthd = '[\\t ]*[\\#\\*]*(\\*|\\#(?:_|\\d+)?)' + txattr + '(?: +\\S|\\.\\s*(?=\\S|\\n))';

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	/* textile list parser */
	var ribbon = __webpack_require__(5);
	var re = __webpack_require__(4);
	var merge = __webpack_require__(1);
	
	var _require = __webpack_require__(10),
	    parseAttr = _require.parseAttr;
	
	var _require2 = __webpack_require__(9),
	    parsePhrase = _require2.parsePhrase;
	
	var _require3 = __webpack_require__(12),
	    txlisthd = _require3.txlisthd;
	
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

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	/* textile table parser */
	
	var re = __webpack_require__(4);
	var merge = __webpack_require__(1);
	var ribbon = __webpack_require__(5);
	
	var _require = __webpack_require__(10),
	    parseAttr = _require.parseAttr;
	
	var _require2 = __webpack_require__(9),
	    parsePhrase = _require2.parsePhrase;
	
	var _require3 = __webpack_require__(2),
	    reIndent = _require3.reIndent;
	
	var _require4 = __webpack_require__(12),
	    txattr = _require4.txattr;
	
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

/***/ })
/******/ ])
});
;
//# sourceMappingURL=textile.js.map