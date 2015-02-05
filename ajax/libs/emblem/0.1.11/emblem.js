  (function(root) {

    
(function(root) {
  var StringScanner;
  StringScanner = (function() {
    function StringScanner(str) {
      this.str = str != null ? str : '';
      this.str = '' + this.str;
      this.pos = 0;
      this.lastMatch = {
        reset: function() {
          this.str = null;
          this.captures = [];
          return this;
        }
      }.reset();
      this;
    }
    StringScanner.prototype.bol = function() {
      return this.pos <= 0 || (this.str[this.pos - 1] === "\n");
    };
    StringScanner.prototype.captures = function() {
      return this.lastMatch.captures;
    };
    StringScanner.prototype.check = function(pattern) {
      var matches;
      if (this.str.substr(this.pos).search(pattern) !== 0) {
        this.lastMatch.reset();
        return null;
      }
      matches = this.str.substr(this.pos).match(pattern);
      this.lastMatch.str = matches[0];
      this.lastMatch.captures = matches.slice(1);
      return this.lastMatch.str;
    };
    StringScanner.prototype.checkUntil = function(pattern) {
      var matches, patternPos;
      patternPos = this.str.substr(this.pos).search(pattern);
      if (patternPos < 0) {
        this.lastMatch.reset();
        return null;
      }
      matches = this.str.substr(this.pos + patternPos).match(pattern);
      this.lastMatch.captures = matches.slice(1);
      return this.lastMatch.str = this.str.substr(this.pos, patternPos) + matches[0];
    };
    StringScanner.prototype.clone = function() {
      var clone, prop, value, _ref;
      clone = new this.constructor(this.str);
      clone.pos = this.pos;
      clone.lastMatch = {};
      _ref = this.lastMatch;
      for (prop in _ref) {
        value = _ref[prop];
        clone.lastMatch[prop] = value;
      }
      return clone;
    };
    StringScanner.prototype.concat = function(str) {
      this.str += str;
      return this;
    };
    StringScanner.prototype.eos = function() {
      return this.pos === this.str.length;
    };
    StringScanner.prototype.exists = function(pattern) {
      var matches, patternPos;
      patternPos = this.str.substr(this.pos).search(pattern);
      if (patternPos < 0) {
        this.lastMatch.reset();
        return null;
      }
      matches = this.str.substr(this.pos + patternPos).match(pattern);
      this.lastMatch.str = matches[0];
      this.lastMatch.captures = matches.slice(1);
      return patternPos;
    };
    StringScanner.prototype.getch = function() {
      return this.scan(/./);
    };
    StringScanner.prototype.match = function() {
      return this.lastMatch.str;
    };
    StringScanner.prototype.matches = function(pattern) {
      this.check(pattern);
      return this.matchSize();
    };
    StringScanner.prototype.matched = function() {
      return this.lastMatch.str != null;
    };
    StringScanner.prototype.matchSize = function() {
      if (this.matched()) {
        return this.match().length;
      } else {
        return null;
      }
    };
    StringScanner.prototype.peek = function(len) {
      return this.str.substr(this.pos, len);
    };
    StringScanner.prototype.pointer = function() {
      return this.pos;
    };
    StringScanner.prototype.setPointer = function(pos) {
      pos = +pos;
      if (pos < 0) {
        pos = 0;
      }
      if (pos > this.str.length) {
        pos = this.str.length;
      }
      return this.pos = pos;
    };
    StringScanner.prototype.reset = function() {
      this.lastMatch.reset();
      this.pos = 0;
      return this;
    };
    StringScanner.prototype.rest = function() {
      return this.str.substr(this.pos);
    };
    StringScanner.prototype.scan = function(pattern) {
      var chk;
      chk = this.check(pattern);
      if (chk != null) {
        this.pos += chk.length;
      }
      return chk;
    };
    StringScanner.prototype.scanUntil = function(pattern) {
      var chk;
      chk = this.checkUntil(pattern);
      if (chk != null) {
        this.pos += chk.length;
      }
      return chk;
    };
    StringScanner.prototype.skip = function(pattern) {
      this.scan(pattern);
      return this.matchSize();
    };
    StringScanner.prototype.skipUntil = function(pattern) {
      this.scanUntil(pattern);
      return this.matchSize();
    };
    StringScanner.prototype.string = function() {
      return this.str;
    };
    StringScanner.prototype.terminate = function() {
      this.pos = this.str.length;
      this.lastMatch.reset();
      return this;
    };
    StringScanner.prototype.toString = function() {
      return "#<StringScanner " + (this.eos() ? 'fin' : "" + this.pos + "/" + this.str.length + " @ " + (this.str.length > 8 ? "" + (this.str.substr(0, 5)) + "..." : this.str)) + ">";
    };
    return StringScanner;
  })();
  StringScanner.prototype.beginningOfLine = StringScanner.prototype.bol;
  StringScanner.prototype.clear = StringScanner.prototype.terminate;
  StringScanner.prototype.dup = StringScanner.prototype.clone;
  StringScanner.prototype.endOfString = StringScanner.prototype.eos;
  StringScanner.prototype.exist = StringScanner.prototype.exists;
  StringScanner.prototype.getChar = StringScanner.prototype.getch;
  StringScanner.prototype.position = StringScanner.prototype.pointer;
  StringScanner.StringScanner = StringScanner;
  this.StringScanner = StringScanner;
})(this);

var StringScanner = this.StringScanner;


// lib/emblem.js
var Emblem;

this.Emblem = {};

Emblem = this.Emblem;

Emblem.VERSION = "0.1.9";










;
// lib/parser.js


Emblem.Parser = (function() {
  /*
   * Generated by PEG.js 0.7.0.
   *
   * http://pegjs.majda.cz/
   */

  function peg$subclass(child, parent) {
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
  }

  function SyntaxError(expected, found, offset, line, column) {
    function buildMessage(expected, found) {
      function stringEscape(s) {
        function hex(ch) { return ch.charCodeAt(0).toString(16).toUpperCase(); }

        return s
          .replace(/\\/g,   '\\\\')
          .replace(/"/g,    '\\"')
          .replace(/\x08/g, '\\b')
          .replace(/\t/g,   '\\t')
          .replace(/\n/g,   '\\n')
          .replace(/\f/g,   '\\f')
          .replace(/\r/g,   '\\r')
          .replace(/[\x00-\x07\x0B\x0E\x0F]/g, function(ch) { return '\\x0' + hex(ch); })
          .replace(/[\x10-\x1F\x80-\xFF]/g,    function(ch) { return '\\x'  + hex(ch); })
          .replace(/[\u0180-\u0FFF]/g,         function(ch) { return '\\u0' + hex(ch); })
          .replace(/[\u1080-\uFFFF]/g,         function(ch) { return '\\u'  + hex(ch); });
      }

      var expectedDesc, foundDesc;

      switch (expected.length) {
        case 0:
          expectedDesc = "end of input";
          break;

        case 1:
          expectedDesc = expected[0];
          break;

        default:
          expectedDesc = expected.slice(0, -1).join(", ")
            + " or "
            + expected[expected.length - 1];
      }

      foundDesc = found ? "\"" + stringEscape(found) + "\"" : "end of input";

      return "Expected " + expectedDesc + " but " + foundDesc + " found.";
    }

    this.expected = expected;
    this.found    = found;
    this.offset   = offset;
    this.line     = line;
    this.column   = column;

    this.name     = "SyntaxError";
    this.message  = buildMessage(expected, found);
  }

  peg$subclass(SyntaxError, Error);

  function parse(input) {
    var options = arguments.length > 1 ? arguments[1] : {},

        peg$startRuleFunctions = { start: peg$parsestart },
        peg$startRuleFunction  = peg$parsestart,

        peg$c0 = null,
        peg$c1 = "",
        peg$c2 = "else",
        peg$c3 = "\"else\"",
        peg$c4 = function(c) {return c;},
        peg$c5 = function(c, i) { 
          return new AST.ProgramNode(c, i || []);
        },
        peg$c6 = [],
        peg$c7 = function(statements) {
          // Coalesce all adjacent ContentNodes into one.

          var compressedStatements = [];
          var buffer = [];

          for(var i = 0; i < statements.length; ++i) {
            var nodes = statements[i];

            for(var j = 0; j < nodes.length; ++j) {
              var node = nodes[j]
              if(node.type === "content") {
                if(node.string) {
                  // Ignore empty strings (comments).
                  buffer.push(node.string);
                }
                continue;
              } 

              // Flush content if present.
              if(buffer.length) {
                compressedStatements.push(new AST.ContentNode(buffer.join('')));
                buffer = [];
              }
              compressedStatements.push(node);
            }
          }

          if(buffer.length) { 
            compressedStatements.push(new AST.ContentNode(buffer.join(''))); 
          }

          return compressedStatements;
        },
        peg$c8 = "BeginStatement",
        peg$c9 = function() { return []; },
        peg$c10 = ">",
        peg$c11 = "\">\"",
        peg$c12 = function(n, params) { 
          return [new AST.PartialNode(n, params[0])]; 
        },
        peg$c13 = /^[a-zA-Z0-9_$-\/]/,
        peg$c14 = "[a-zA-Z0-9_$-\\/]",
        peg$c15 = function(s) { return new AST.PartialNameNode(s); },
        peg$c16 = function(m) { 
          return [m]; 
        },
        peg$c17 = "/",
        peg$c18 = "\"/\"",
        peg$c19 = /^[A-Z]/,
        peg$c20 = "[A-Z]",
        peg$c21 = function(ret) {
          // TODO make this configurable
          var defaultCapitalizedHelper = 'view';

          if(ret.mustache) {
            // Block. Modify inner MustacheNode and return.

            // Make sure a suffix modifier hasn't already been applied.
            var ch = ret.mustache.id.string.charAt(0);
            if(!IS_EMBER || !ch.match(/[A-Z]/)) return ret;

            ret.mustache = unshiftParam(ret.mustache, defaultCapitalizedHelper);
            return ret;
          } else {

            // Make sure a suffix modifier hasn't already been applied.
            var ch = ret.id.string.charAt(0);
            if(!IS_EMBER || !ch.match(/[A-Z]/)) return ret;

            return unshiftParam(ret, defaultCapitalizedHelper);
          }
        },
        peg$c22 = function(h, c) { 
          var ret = h[0];
          if(c) {
            ret = ret.concat(c[2]);
          }

          // Push the closing tag ContentNode if it exists (self-closing if not)
          if(h[1]) {
            ret.push(h[1]);
          }

          return ret;
        },
        peg$c23 = " ",
        peg$c24 = "\" \"",
        peg$c25 = "=",
        peg$c26 = "\"=\"",
        peg$c27 = function(h, c, multilineContent) { 
          // h is [[open tag content], closing tag ContentNode]
          var ret = h[0];
          if(c) {
            ret = ret.concat(c);
          }

          if(multilineContent) {
            // Handle multi-line content, e.g.
            // span Hello, 
            //      This is valid markup.

            multilineContent = multilineContent[1];
            for(var i = 0; i < multilineContent.length; ++i) {
              ret.push(new AST.ContentNode(' '));
              ret = ret.concat(multilineContent[i]);
            }
          }

          // Push the closing tag ContentNode if it exists (self-closing if not)
          if(h[1]) {
            ret.push(h[1]);
          }

          return ret;
        },
        peg$c28 = function(mustacheNode, block) { 
          if(!block) return mustacheNode;
          var programNode = block[2];
          return new AST.BlockNode(mustacheNode, programNode, programNode.inverse, mustacheNode.id);
        },
        peg$c29 = function(mustacheNode, t) {
          var programNode = new AST.ProgramNode(t, []);
          return new AST.BlockNode(mustacheNode, programNode, programNode.inverse, mustacheNode.id);
        },
        peg$c30 = function(e, ret) {
          var mustache = ret.mustache || ret;
          mustache.escaped = e;
          return ret;
        },
        peg$c31 = function(isPartial, path, params, hash) { 
          if(isPartial) {
            var n = new AST.PartialNameNode(path.string);
            return new AST.PartialNode(n, params[0]);
          }

          var actualParams = [];
          var attrs = {};
          var hasAttrs = false;

          // Convert shorthand html attributes (e.g. % = tagName, . = class, etc)
          for(var i = 0; i < params.length; ++i) {
            var p = params[i];
            var attrKey = p[0];
            if(attrKey == 'tagName' || attrKey == 'elementId' || attrKey == 'class') {
              hasAttrs = true;
              attrs[attrKey] = attrs[attrKey] || [];
              attrs[attrKey].push(p[1]);
            } else {
              actualParams.push(p);
            }
          }

          if(hasAttrs) {
            hash = hash || new AST.HashNode([]);
            for(var k in attrs) {
              if(!attrs.hasOwnProperty(k)) continue;
              hash.pairs.push([k, new AST.StringNode(attrs[k].join(' '))]);
            }
          }

          actualParams.unshift(path);

          var mustacheNode = new AST.MustacheNode(actualParams, hash); 

          var tm = path._emblemSuffixModifier;
          if(tm === '!') {
            return unshiftParam(mustacheNode, 'unbound');
          } else if(tm === '?') {
            return unshiftParam(mustacheNode, 'if');
          } else if(tm === '^') {
            return unshiftParam(mustacheNode, 'unless');
          }

          return mustacheNode;
        },
        peg$c32 = function(t) { return ['tagName', t]; },
        peg$c33 = function(i) { return ['elementId', i]; },
        peg$c34 = function(c) { return ['class', c]; },
        peg$c35 = function(id, classes) { return [id, classes]; },
        peg$c36 = function(classes) { return [null, classes]; },
        peg$c37 = function(h) { return h; },
        peg$c38 = function(h) { return new AST.HashNode(h); },
        peg$c39 = "PathIdent",
        peg$c40 = "..",
        peg$c41 = "\"..\"",
        peg$c42 = ".",
        peg$c43 = "\".\"",
        peg$c44 = /^[a-zA-Z0-9_$\-!?\^]/,
        peg$c45 = "[a-zA-Z0-9_$\\-!?\\^]",
        peg$c46 = function(s) { return s; },
        peg$c47 = "Key",
        peg$c48 = function(h) { return [h[0], h[2]]; },
        peg$c49 = function(p) { return p; },
        peg$c50 = function(first, tail) {
          var ret = [first];
          for(var i = 0; i < tail.length; ++i) {
            //ret = ret.concat(tail[i]);
            ret.push(tail[i]);
          }
          return ret;
        },
        peg$c51 = "PathSeparator",
        peg$c52 = /^[\/.]/,
        peg$c53 = "[\\/.]",
        peg$c54 = function(v) { 
          var last = v[v.length - 1];
          var match;
          var suffixModifier;
          if(match = last.match(/[!\?\^]$/)) {
            suffixModifier = match[0];
            v[v.length - 1] = last.slice(0, -1);
          }

          var idNode = new AST.IdNode(v); 
          idNode._emblemSuffixModifier = suffixModifier;

          return idNode;
        },
        peg$c55 = function(v) { return new AST.StringNode(v); },
        peg$c56 = function(v) { return new AST.IntegerNode(v); },
        peg$c57 = function(v) { return new AST.BooleanNode(v); },
        peg$c58 = "Boolean",
        peg$c59 = "true",
        peg$c60 = "\"true\"",
        peg$c61 = "false",
        peg$c62 = "\"false\"",
        peg$c63 = "Integer",
        peg$c64 = /^[0-9]/,
        peg$c65 = "[0-9]",
        peg$c66 = function(s) { return parseInt(s); },
        peg$c67 = "\"",
        peg$c68 = "\"\\\"\"",
        peg$c69 = "'",
        peg$c70 = "\"'\"",
        peg$c71 = function(p) { return p[1]; },
        peg$c72 = /^[^"}]/,
        peg$c73 = "[^\"}]",
        peg$c74 = /^[^'}]/,
        peg$c75 = "[^'}]",
        peg$c76 = /^[A-Za-z]/,
        peg$c77 = "[A-Za-z]",
        peg$c78 = function(m) { return [m]; },
        peg$c79 = function(ind, nodes, w) {
          nodes.unshift(new AST.ContentNode(ind));

          for(var i = 0; i < w.length; ++i) {
            nodes.push(new AST.ContentNode(ind));
            nodes = nodes.concat(w[i]);
            nodes.push("\n");
          }
          return nodes; 
        },
        peg$c80 = /^[|`]/,
        peg$c81 = "[|`]",
        peg$c82 = "<",
        peg$c83 = "\"<\"",
        peg$c84 = function() { return '<'; },
        peg$c85 = function(s, nodes, indentedNodes) { 
          if(nodes.length || !indentedNodes) {
            nodes.push("\n");
          }

          if(indentedNodes) {
            indentedNodes = indentedNodes[1];
            for(var i = 0; i < indentedNodes.length; ++i) {
              /*nodes.push(new AST.ContentNode("#"));*/
              nodes = nodes.concat(indentedNodes[i]);
              nodes.push("\n");
            }
          }

          var ret = [];
          var strip = s !== '`';
          for(var i = 0; i < nodes.length; ++i) {
            var node = nodes[i];
            if(node == "\n") {
              if(!strip) {
                ret.push(new AST.ContentNode("\n"));
              }
            } else {
              ret.push(node);
            }
          }

          return ret;
        },
        peg$c86 = function(first, tail) {
          return textNodesResult(first, tail);
        },
        peg$c87 = function(a) { return a; },
        peg$c88 = function(m) { m.escaped = true; return m; },
        peg$c89 = function(m) { m.escaped = false; return m; },
        peg$c90 = function(a) { return new AST.ContentNode(a); },
        peg$c91 = "any character",
        peg$c92 = function(c) { return c; },
        peg$c93 = "SingleMustacheOpen",
        peg$c94 = "{",
        peg$c95 = "\"{\"",
        peg$c96 = "DoubleMustacheOpen",
        peg$c97 = "{{",
        peg$c98 = "\"{{\"",
        peg$c99 = "TripleMustacheOpen",
        peg$c100 = "{{{",
        peg$c101 = "\"{{{\"",
        peg$c102 = "SingleMustacheClose",
        peg$c103 = "}",
        peg$c104 = "\"}\"",
        peg$c105 = "DoubleMustacheClose",
        peg$c106 = "}}",
        peg$c107 = "\"}}\"",
        peg$c108 = "TripleMustacheClose",
        peg$c109 = "}}}",
        peg$c110 = "\"}}}\"",
        peg$c111 = "InterpolationOpen",
        peg$c112 = "#{",
        peg$c113 = "\"#{\"",
        peg$c114 = "InterpolationClose",
        peg$c115 = "==",
        peg$c116 = "\"==\"",
        peg$c117 = function() { return false; },
        peg$c118 = function() { return true; },
        peg$c119 = function(h, s, m, f) { return [h, s, m, f]; },
        peg$c120 = function(s, m, f) { return [null, s, m, f] },
        peg$c121 = function(h) {
          var tagName = h[0] || 'div',
              shorthandAttributes = h[1] || [],
              inTagMustaches = h[2],
              fullAttributes = h[3],
              id = shorthandAttributes[0],
              classes = shorthandAttributes[1];

          var tagOpenContent = [];
          tagOpenContent.push(new AST.ContentNode('<' + tagName));

          if(id) {
            tagOpenContent.push(new AST.ContentNode(' id="' + id + '"'));
          }

          if(classes && classes.length) {
            tagOpenContent.push(new AST.ContentNode(' class="' + classes.join(' ') + '"'));
          }

          // Pad in tag mustaches with spaces.
          for(var i = 0; i < inTagMustaches.length; ++i) {
            tagOpenContent.push(new AST.ContentNode(' '));
            tagOpenContent.push(inTagMustaches[i]);
          }

          for(var i = 0; i < fullAttributes.length; ++i) {
            tagOpenContent = tagOpenContent.concat(fullAttributes[i]);
          }

          if(SELF_CLOSING_TAG[tagName]) {
            tagOpenContent.push(new AST.ContentNode(' />'));
            return [tagOpenContent];
          } else {
            tagOpenContent.push(new AST.ContentNode('>'));
            return [tagOpenContent, new AST.ContentNode('</' + tagName + '>')];
          }
        },
        peg$c122 = function(a) {
          return [new AST.ContentNode(' ')].concat(a); 
        },
        peg$c123 = /^[A-Za-z.:0-9_\-]/,
        peg$c124 = "[A-Za-z.:0-9_\\-]",
        peg$c125 = function(id) { return new AST.MustacheNode([id]); },
        peg$c126 = function(event, mustacheNode) {
          // Unshift the action helper and augment the hash
          return [unshiftParam(mustacheNode, 'action', [['on', new AST.StringNode(event)]])];
        },
        peg$c127 = function(value) { return value.replace(/ *$/, ''); },
        peg$c128 = "!",
        peg$c129 = "\"!\"",
        peg$c130 = function(key, value) { return IS_EMBER; },
        peg$c131 = function(key, value) { 
          var hashNode = new AST.HashNode([[key, new AST.StringNode(value)]]);
          var params = [new AST.IdNode(['bindAttr'])];
          var mustacheNode = new AST.MustacheNode(params, hashNode);

          /* 
          if(whatever) {
            mustacheNode = return unshiftParam(mustacheNode, 'unbound');
          }
          */

          return [mustacheNode];
        },
        peg$c132 = function(key, id) { 
          var mustacheNode = new AST.MustacheNode([id]);

          if(IS_EMBER && id._emblemSuffixModifier === '!') {
            mustacheNode = unshiftParam(mustacheNode, 'unbound');
          }

          return [
            new AST.ContentNode(key + '=' + '"'),
            mustacheNode,
            new AST.ContentNode('"'),
          ];
        },
        peg$c133 = function(key, nodes) { 
          var result = [ new AST.ContentNode(key + '=' + '"') ].concat(nodes);
          return result.concat([new AST.ContentNode('"')]);
        },
        peg$c134 = "_",
        peg$c135 = "\"_\"",
        peg$c136 = "-",
        peg$c137 = "\"-\"",
        peg$c138 = "%",
        peg$c139 = "\"%\"",
        peg$c140 = "#",
        peg$c141 = "\"#\"",
        peg$c142 = function(c) { return c;},
        peg$c143 = "CSSIdentifier",
        peg$c144 = function(nmstart, nmchars) { return nmstart + nmchars; },
        peg$c145 = /^[_a-zA-Z0-9\-]/,
        peg$c146 = "[_a-zA-Z0-9\\-]",
        peg$c147 = /^[_a-zA-Z]/,
        peg$c148 = "[_a-zA-Z]",
        peg$c149 = /^[\x80-\xFF]/,
        peg$c150 = "[\\x80-\\xFF]",
        peg$c151 = "KnownHTMLTagName",
        peg$c152 = function(t) { return !!KNOWN_TAGS[t]; },
        peg$c153 = function(t) { return t; },
        peg$c154 = /^[:_a-zA-Z0-9\-]/,
        peg$c155 = "[:_a-zA-Z0-9\\-]",
        peg$c156 = "a JS event",
        peg$c157 = function(t) { return !!KNOWN_EVENTS[t]; },
        peg$c158 = "INDENT",
        peg$c159 = "\uEFEF",
        peg$c160 = "\"\\uEFEF\"",
        peg$c161 = function() { return ''; },
        peg$c162 = "DEDENT",
        peg$c163 = "\uEFFE",
        peg$c164 = "\"\\uEFFE\"",
        peg$c165 = "Unmatched DEDENT",
        peg$c166 = "\uEFEE",
        peg$c167 = "\"\\uEFEE\"",
        peg$c168 = "LineEnd",
        peg$c169 = "\uEFFF",
        peg$c170 = "\"\\uEFFF\"",
        peg$c171 = "\n",
        peg$c172 = "\"\\n\"",
        peg$c173 = "ANYDEDENT",
        peg$c174 = "RequiredWhitespace",
        peg$c175 = "OptionalWhitespace",
        peg$c176 = "InlineWhitespace",
        peg$c177 = /^[ \t]/,
        peg$c178 = "[ \\t]",

        peg$currPos          = 0,
        peg$reportedPos      = 0,
        peg$cachedPos        = 0,
        peg$cachedPosDetails = { line: 1, column: 1, seenCR: false },
        peg$maxFailPos       = 0,
        peg$maxFailExpected  = [],
        peg$silentFails      = 0,

        peg$result;

    if ("startRule" in options) {
      if (!(options.startRule in peg$startRuleFunctions)) {
        throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
      }

      peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
    }

    function text() {
      return input.substring(peg$reportedPos, peg$currPos);
    }

    function offset() {
      return peg$reportedPos;
    }

    function line() {
      return peg$computePosDetails(peg$reportedPos).line;
    }

    function column() {
      return peg$computePosDetails(peg$reportedPos).column;
    }

    function peg$computePosDetails(pos) {
      function advance(details, pos) {
        var p, ch;

        for (p = 0; p < pos; p++) {
          ch = input.charAt(p);
          if (ch === "\n") {
            if (!details.seenCR) { details.line++; }
            details.column = 1;
            details.seenCR = false;
          } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
            details.line++;
            details.column = 1;
            details.seenCR = true;
          } else {
            details.column++;
            details.seenCR = false;
          }
        }
      }

      if (peg$cachedPos !== pos) {
        if (peg$cachedPos > pos) {
          peg$cachedPos = 0;
          peg$cachedPosDetails = { line: 1, column: 1, seenCR: false };
        }
        peg$cachedPos = pos;
        advance(peg$cachedPosDetails, peg$cachedPos);
      }

      return peg$cachedPosDetails;
    }

    function peg$fail(expected) {
      if (peg$currPos < peg$maxFailPos) { return; }

      if (peg$currPos > peg$maxFailPos) {
        peg$maxFailPos = peg$currPos;
        peg$maxFailExpected = [];
      }

      peg$maxFailExpected.push(expected);
    }

    function peg$cleanupExpected(expected) {
      var i = 0;

      expected.sort();

      while (i < expected.length) {
        if (expected[i - 1] === expected[i]) {
          expected.splice(i, 1);
        } else {
          i++;
        }
      }
    }

    function peg$parsestart() {
      var s0;

      s0 = peg$parseinvertibleContent();

      return s0;
    }

    function peg$parseinvertibleContent() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8;

      s0 = peg$currPos;
      s1 = peg$parsecontent();
      if (s1 !== null) {
        s2 = peg$currPos;
        s3 = peg$parseDEDENT();
        if (s3 !== null) {
          if (input.substr(peg$currPos, 4) === peg$c2) {
            s4 = peg$c2;
            peg$currPos += 4;
          } else {
            s4 = null;
            if (peg$silentFails === 0) { peg$fail(peg$c3); }
          }
          if (s4 !== null) {
            s5 = peg$parse_();
            if (s5 !== null) {
              s6 = peg$parseTERM();
              if (s6 !== null) {
                s7 = peg$parseindentation();
                if (s7 !== null) {
                  s8 = peg$parsecontent();
                  if (s8 !== null) {
                    peg$reportedPos = s2;
                    s3 = peg$c4(s8);
                    if (s3 === null) {
                      peg$currPos = s2;
                      s2 = s3;
                    } else {
                      s2 = s3;
                    }
                  } else {
                    peg$currPos = s2;
                    s2 = peg$c0;
                  }
                } else {
                  peg$currPos = s2;
                  s2 = peg$c0;
                }
              } else {
                peg$currPos = s2;
                s2 = peg$c0;
              }
            } else {
              peg$currPos = s2;
              s2 = peg$c0;
            }
          } else {
            peg$currPos = s2;
            s2 = peg$c0;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$c0;
        }
        if (s2 === null) {
          s2 = peg$c1;
        }
        if (s2 !== null) {
          peg$reportedPos = s0;
          s1 = peg$c5(s1,s2);
          if (s1 === null) {
            peg$currPos = s0;
            s0 = s1;
          } else {
            s0 = s1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parsecontent() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parsestatement();
      while (s2 !== null) {
        s1.push(s2);
        s2 = peg$parsestatement();
      }
      if (s1 !== null) {
        peg$reportedPos = s0;
        s1 = peg$c7(s1);
      }
      if (s1 === null) {
        peg$currPos = s0;
        s0 = s1;
      } else {
        s0 = s1;
      }

      return s0;
    }

    function peg$parsestatement() {
      var s0, s1;

      peg$silentFails++;
      s0 = peg$parseblankLine();
      if (s0 === null) {
        s0 = peg$parsecomment();
        if (s0 === null) {
          s0 = peg$parselegacyPartialInvocation();
          if (s0 === null) {
            s0 = peg$parsehtmlElement();
            if (s0 === null) {
              s0 = peg$parsetextLine();
              if (s0 === null) {
                s0 = peg$parsemustache();
              }
            }
          }
        }
      }
      peg$silentFails--;
      if (s0 === null) {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c8); }
      }

      return s0;
    }

    function peg$parseblankLine() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = peg$parse_();
      if (s1 !== null) {
        s2 = peg$parseTERM();
        if (s2 !== null) {
          peg$reportedPos = s0;
          s1 = peg$c9();
          if (s1 === null) {
            peg$currPos = s0;
            s0 = s1;
          } else {
            s0 = s1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parselegacyPartialInvocation() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 62) {
        s1 = peg$c10;
        peg$currPos++;
      } else {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c11); }
      }
      if (s1 !== null) {
        s2 = peg$parse_();
        if (s2 !== null) {
          s3 = peg$parselegacyPartialName();
          if (s3 !== null) {
            s4 = peg$parse_();
            if (s4 !== null) {
              s5 = [];
              s6 = peg$parseinMustacheParam();
              while (s6 !== null) {
                s5.push(s6);
                s6 = peg$parseinMustacheParam();
              }
              if (s5 !== null) {
                s6 = peg$parse_();
                if (s6 !== null) {
                  s7 = peg$parseTERM();
                  if (s7 !== null) {
                    peg$reportedPos = s0;
                    s1 = peg$c12(s3,s5);
                    if (s1 === null) {
                      peg$currPos = s0;
                      s0 = s1;
                    } else {
                      s0 = s1;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c0;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parselegacyPartialName() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$currPos;
      s2 = [];
      if (peg$c13.test(input.charAt(peg$currPos))) {
        s3 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s3 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c14); }
      }
      if (s3 !== null) {
        while (s3 !== null) {
          s2.push(s3);
          if (peg$c13.test(input.charAt(peg$currPos))) {
            s3 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s3 = null;
            if (peg$silentFails === 0) { peg$fail(peg$c14); }
          }
        }
      } else {
        s2 = peg$c0;
      }
      if (s2 !== null) {
        s2 = input.substring(s1, peg$currPos);
      }
      s1 = s2;
      if (s1 !== null) {
        peg$reportedPos = s0;
        s1 = peg$c15(s1);
      }
      if (s1 === null) {
        peg$currPos = s0;
        s0 = s1;
      } else {
        s0 = s1;
      }

      return s0;
    }

    function peg$parsehtmlElement() {
      var s0;

      s0 = peg$parsehtmlElementMaybeBlock();
      if (s0 === null) {
        s0 = peg$parsehtmlElementWithInlineContent();
      }

      return s0;
    }

    function peg$parsemustache() {
      var s0, s1;

      s0 = peg$currPos;
      s1 = peg$parseexplicitMustache();
      if (s1 === null) {
        s1 = peg$parselineStartingMustache();
      }
      if (s1 !== null) {
        peg$reportedPos = s0;
        s1 = peg$c16(s1);
      }
      if (s1 === null) {
        peg$currPos = s0;
        s0 = s1;
      } else {
        s0 = s1;
      }

      return s0;
    }

    function peg$parsecommentContent() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      s0 = peg$currPos;
      s1 = peg$parselineContent();
      if (s1 !== null) {
        s2 = peg$parseTERM();
        if (s2 !== null) {
          s3 = [];
          s4 = peg$currPos;
          s5 = peg$parseindentation();
          if (s5 !== null) {
            s6 = [];
            s7 = peg$parsecommentContent();
            if (s7 !== null) {
              while (s7 !== null) {
                s6.push(s7);
                s7 = peg$parsecommentContent();
              }
            } else {
              s6 = peg$c0;
            }
            if (s6 !== null) {
              s7 = peg$parseanyDedent();
              if (s7 !== null) {
                s5 = [s5, s6, s7];
                s4 = s5;
              } else {
                peg$currPos = s4;
                s4 = peg$c0;
              }
            } else {
              peg$currPos = s4;
              s4 = peg$c0;
            }
          } else {
            peg$currPos = s4;
            s4 = peg$c0;
          }
          while (s4 !== null) {
            s3.push(s4);
            s4 = peg$currPos;
            s5 = peg$parseindentation();
            if (s5 !== null) {
              s6 = [];
              s7 = peg$parsecommentContent();
              if (s7 !== null) {
                while (s7 !== null) {
                  s6.push(s7);
                  s7 = peg$parsecommentContent();
                }
              } else {
                s6 = peg$c0;
              }
              if (s6 !== null) {
                s7 = peg$parseanyDedent();
                if (s7 !== null) {
                  s5 = [s5, s6, s7];
                  s4 = s5;
                } else {
                  peg$currPos = s4;
                  s4 = peg$c0;
                }
              } else {
                peg$currPos = s4;
                s4 = peg$c0;
              }
            } else {
              peg$currPos = s4;
              s4 = peg$c0;
            }
          }
          if (s3 !== null) {
            peg$reportedPos = s0;
            s1 = peg$c9();
            if (s1 === null) {
              peg$currPos = s0;
              s0 = s1;
            } else {
              s0 = s1;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parsecomment() {
      var s0, s1, s2;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 47) {
        s1 = peg$c17;
        peg$currPos++;
      } else {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c18); }
      }
      if (s1 !== null) {
        s2 = peg$parsecommentContent();
        if (s2 !== null) {
          peg$reportedPos = s0;
          s1 = peg$c9();
          if (s1 === null) {
            peg$currPos = s0;
            s0 = s1;
          } else {
            s0 = s1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parselineStartingMustache() {
      var s0;

      s0 = peg$parsecapitalizedLineStarterMustache();
      if (s0 === null) {
        s0 = peg$parsemustacheMaybeBlock();
      }

      return s0;
    }

    function peg$parsecapitalizedLineStarterMustache() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = peg$currPos;
      peg$silentFails++;
      if (peg$c19.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c20); }
      }
      peg$silentFails--;
      if (s2 !== null) {
        peg$currPos = s1;
        s1 = peg$c1;
      } else {
        s1 = peg$c0;
      }
      if (s1 !== null) {
        s2 = peg$parsemustacheMaybeBlock();
        if (s2 !== null) {
          peg$reportedPos = s0;
          s1 = peg$c21(s2);
          if (s1 === null) {
            peg$currPos = s0;
            s0 = s1;
          } else {
            s0 = s1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parsehtmlElementMaybeBlock() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8;

      s0 = peg$currPos;
      s1 = peg$parsehtmlTagAndOptionalAttributes();
      if (s1 !== null) {
        s2 = peg$parse_();
        if (s2 !== null) {
          s3 = peg$parseTERM();
          if (s3 !== null) {
            s4 = peg$currPos;
            s5 = [];
            s6 = peg$parseblankLine();
            while (s6 !== null) {
              s5.push(s6);
              s6 = peg$parseblankLine();
            }
            if (s5 !== null) {
              s6 = peg$parseindentation();
              if (s6 !== null) {
                s7 = peg$parsecontent();
                if (s7 !== null) {
                  s8 = peg$parseDEDENT();
                  if (s8 !== null) {
                    s5 = [s5, s6, s7, s8];
                    s4 = s5;
                  } else {
                    peg$currPos = s4;
                    s4 = peg$c0;
                  }
                } else {
                  peg$currPos = s4;
                  s4 = peg$c0;
                }
              } else {
                peg$currPos = s4;
                s4 = peg$c0;
              }
            } else {
              peg$currPos = s4;
              s4 = peg$c0;
            }
            if (s4 === null) {
              s4 = peg$c1;
            }
            if (s4 !== null) {
              peg$reportedPos = s0;
              s1 = peg$c22(s1,s4);
              if (s1 === null) {
                peg$currPos = s0;
                s0 = s1;
              } else {
                s0 = s1;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parsehtmlElementWithInlineContent() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      s0 = peg$currPos;
      s1 = peg$parsehtmlTagAndOptionalAttributes();
      if (s1 !== null) {
        if (input.charCodeAt(peg$currPos) === 32) {
          s2 = peg$c23;
          peg$currPos++;
        } else {
          s2 = null;
          if (peg$silentFails === 0) { peg$fail(peg$c24); }
        }
        if (s2 === null) {
          s2 = peg$currPos;
          peg$silentFails++;
          if (input.charCodeAt(peg$currPos) === 61) {
            s3 = peg$c25;
            peg$currPos++;
          } else {
            s3 = null;
            if (peg$silentFails === 0) { peg$fail(peg$c26); }
          }
          peg$silentFails--;
          if (s3 !== null) {
            peg$currPos = s2;
            s2 = peg$c1;
          } else {
            s2 = peg$c0;
          }
        }
        if (s2 !== null) {
          s3 = peg$parsehtmlInlineContent();
          if (s3 !== null) {
            s4 = peg$currPos;
            s5 = peg$parseindentation();
            if (s5 !== null) {
              s6 = [];
              s7 = peg$parsewhitespaceableTextNodes();
              if (s7 !== null) {
                while (s7 !== null) {
                  s6.push(s7);
                  s7 = peg$parsewhitespaceableTextNodes();
                }
              } else {
                s6 = peg$c0;
              }
              if (s6 !== null) {
                s7 = peg$parseDEDENT();
                if (s7 !== null) {
                  s5 = [s5, s6, s7];
                  s4 = s5;
                } else {
                  peg$currPos = s4;
                  s4 = peg$c0;
                }
              } else {
                peg$currPos = s4;
                s4 = peg$c0;
              }
            } else {
              peg$currPos = s4;
              s4 = peg$c0;
            }
            if (s4 === null) {
              s4 = peg$c1;
            }
            if (s4 !== null) {
              peg$reportedPos = s0;
              s1 = peg$c27(s1,s3,s4);
              if (s1 === null) {
                peg$currPos = s0;
                s0 = s1;
              } else {
                s0 = s1;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parsemustacheMaybeBlock() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8;

      s0 = peg$parsemustacheInlineBlock();
      if (s0 === null) {
        s0 = peg$currPos;
        s1 = peg$parseinMustache();
        if (s1 !== null) {
          s2 = peg$parse_();
          if (s2 !== null) {
            s3 = peg$parseTERM();
            if (s3 !== null) {
              s4 = peg$currPos;
              s5 = [];
              s6 = peg$parseblankLine();
              while (s6 !== null) {
                s5.push(s6);
                s6 = peg$parseblankLine();
              }
              if (s5 !== null) {
                s6 = peg$parseindentation();
                if (s6 !== null) {
                  s7 = peg$parseinvertibleContent();
                  if (s7 !== null) {
                    s8 = peg$parseDEDENT();
                    if (s8 !== null) {
                      s5 = [s5, s6, s7, s8];
                      s4 = s5;
                    } else {
                      peg$currPos = s4;
                      s4 = peg$c0;
                    }
                  } else {
                    peg$currPos = s4;
                    s4 = peg$c0;
                  }
                } else {
                  peg$currPos = s4;
                  s4 = peg$c0;
                }
              } else {
                peg$currPos = s4;
                s4 = peg$c0;
              }
              if (s4 === null) {
                s4 = peg$c1;
              }
              if (s4 !== null) {
                peg$reportedPos = s0;
                s1 = peg$c28(s1,s4);
                if (s1 === null) {
                  peg$currPos = s0;
                  s0 = s1;
                } else {
                  s0 = s1;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      }

      return s0;
    }

    function peg$parsemustacheInlineBlock() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$parseinMustache();
      if (s1 !== null) {
        s2 = peg$parse_();
        if (s2 !== null) {
          s3 = peg$parsetextLine();
          if (s3 !== null) {
            peg$reportedPos = s0;
            s1 = peg$c29(s1,s3);
            if (s1 === null) {
              peg$currPos = s0;
              s0 = s1;
            } else {
              s0 = s1;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseexplicitMustache() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = peg$parseequalSign();
      if (s1 !== null) {
        s2 = peg$parsemustacheMaybeBlock();
        if (s2 !== null) {
          peg$reportedPos = s0;
          s1 = peg$c30(s1,s2);
          if (s1 === null) {
            peg$currPos = s0;
            s0 = s1;
          } else {
            s0 = s1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseinMustache() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 62) {
        s1 = peg$c10;
        peg$currPos++;
      } else {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c11); }
      }
      if (s1 === null) {
        s1 = peg$c1;
      }
      if (s1 !== null) {
        s2 = peg$parse_();
        if (s2 !== null) {
          s3 = peg$parsepathIdNode();
          if (s3 !== null) {
            s4 = [];
            s5 = peg$parseinMustacheParam();
            while (s5 !== null) {
              s4.push(s5);
              s5 = peg$parseinMustacheParam();
            }
            if (s4 !== null) {
              s5 = peg$parsehash();
              if (s5 === null) {
                s5 = peg$c1;
              }
              if (s5 !== null) {
                peg$reportedPos = s0;
                s1 = peg$c31(s1,s3,s4,s5);
                if (s1 === null) {
                  peg$currPos = s0;
                  s0 = s1;
                } else {
                  s0 = s1;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parsehtmlMustacheAttribute() {
      var s0, s1;

      s0 = peg$currPos;
      s1 = peg$parsetagNameShorthand();
      if (s1 !== null) {
        peg$reportedPos = s0;
        s1 = peg$c32(s1);
      }
      if (s1 === null) {
        peg$currPos = s0;
        s0 = s1;
      } else {
        s0 = s1;
      }
      if (s0 === null) {
        s0 = peg$currPos;
        s1 = peg$parseidShorthand();
        if (s1 !== null) {
          peg$reportedPos = s0;
          s1 = peg$c33(s1);
        }
        if (s1 === null) {
          peg$currPos = s0;
          s0 = s1;
        } else {
          s0 = s1;
        }
        if (s0 === null) {
          s0 = peg$currPos;
          s1 = peg$parseclassShorthand();
          if (s1 !== null) {
            peg$reportedPos = s0;
            s1 = peg$c34(s1);
          }
          if (s1 === null) {
            peg$currPos = s0;
            s0 = s1;
          } else {
            s0 = s1;
          }
        }
      }

      return s0;
    }

    function peg$parseshorthandAttributes() {
      var s0;

      s0 = peg$parseattributesAtLeastID();
      if (s0 === null) {
        s0 = peg$parseattributesAtLeastClass();
      }

      return s0;
    }

    function peg$parseattributesAtLeastID() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$parseidShorthand();
      if (s1 !== null) {
        s2 = [];
        s3 = peg$parseclassShorthand();
        while (s3 !== null) {
          s2.push(s3);
          s3 = peg$parseclassShorthand();
        }
        if (s2 !== null) {
          peg$reportedPos = s0;
          s1 = peg$c35(s1,s2);
          if (s1 === null) {
            peg$currPos = s0;
            s0 = s1;
          } else {
            s0 = s1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseattributesAtLeastClass() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parseclassShorthand();
      if (s2 !== null) {
        while (s2 !== null) {
          s1.push(s2);
          s2 = peg$parseclassShorthand();
        }
      } else {
        s1 = peg$c0;
      }
      if (s1 !== null) {
        peg$reportedPos = s0;
        s1 = peg$c36(s1);
      }
      if (s1 === null) {
        peg$currPos = s0;
        s0 = s1;
      } else {
        s0 = s1;
      }

      return s0;
    }

    function peg$parseinMustacheParam() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = peg$parse_();
      if (s1 !== null) {
        s2 = peg$parsehtmlMustacheAttribute();
        if (s2 === null) {
          s2 = peg$parseparam();
        }
        if (s2 !== null) {
          peg$reportedPos = s0;
          s1 = peg$c37(s2);
          if (s1 === null) {
            peg$currPos = s0;
            s0 = s1;
          } else {
            s0 = s1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parsehash() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parsehashSegment();
      if (s2 !== null) {
        while (s2 !== null) {
          s1.push(s2);
          s2 = peg$parsehashSegment();
        }
      } else {
        s1 = peg$c0;
      }
      if (s1 !== null) {
        peg$reportedPos = s0;
        s1 = peg$c38(s1);
      }
      if (s1 === null) {
        peg$currPos = s0;
        s0 = s1;
      } else {
        s0 = s1;
      }

      return s0;
    }

    function peg$parsepathIdent() {
      var s0, s1, s2, s3;

      peg$silentFails++;
      if (input.substr(peg$currPos, 2) === peg$c40) {
        s0 = peg$c40;
        peg$currPos += 2;
      } else {
        s0 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c41); }
      }
      if (s0 === null) {
        if (input.charCodeAt(peg$currPos) === 46) {
          s0 = peg$c42;
          peg$currPos++;
        } else {
          s0 = null;
          if (peg$silentFails === 0) { peg$fail(peg$c43); }
        }
        if (s0 === null) {
          s0 = peg$currPos;
          s1 = peg$currPos;
          s2 = [];
          if (peg$c44.test(input.charAt(peg$currPos))) {
            s3 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s3 = null;
            if (peg$silentFails === 0) { peg$fail(peg$c45); }
          }
          if (s3 !== null) {
            while (s3 !== null) {
              s2.push(s3);
              if (peg$c44.test(input.charAt(peg$currPos))) {
                s3 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s3 = null;
                if (peg$silentFails === 0) { peg$fail(peg$c45); }
              }
            }
          } else {
            s2 = peg$c0;
          }
          if (s2 !== null) {
            s2 = input.substring(s1, peg$currPos);
          }
          s1 = s2;
          if (s1 !== null) {
            s2 = peg$currPos;
            peg$silentFails++;
            if (input.charCodeAt(peg$currPos) === 61) {
              s3 = peg$c25;
              peg$currPos++;
            } else {
              s3 = null;
              if (peg$silentFails === 0) { peg$fail(peg$c26); }
            }
            peg$silentFails--;
            if (s3 === null) {
              s2 = peg$c1;
            } else {
              peg$currPos = s2;
              s2 = peg$c0;
            }
            if (s2 !== null) {
              peg$reportedPos = s0;
              s1 = peg$c46(s1);
              if (s1 === null) {
                peg$currPos = s0;
                s0 = s1;
              } else {
                s0 = s1;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        }
      }
      peg$silentFails--;
      if (s0 === null) {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c39); }
      }

      return s0;
    }

    function peg$parsekey() {
      var s0, s1;

      peg$silentFails++;
      s0 = peg$parseident();
      peg$silentFails--;
      if (s0 === null) {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c47); }
      }

      return s0;
    }

    function peg$parsehashSegment() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      s1 = peg$parse_();
      if (s1 !== null) {
        s2 = peg$currPos;
        s3 = peg$parsekey();
        if (s3 !== null) {
          if (input.charCodeAt(peg$currPos) === 61) {
            s4 = peg$c25;
            peg$currPos++;
          } else {
            s4 = null;
            if (peg$silentFails === 0) { peg$fail(peg$c26); }
          }
          if (s4 !== null) {
            s5 = peg$parsepathIdNode();
            if (s5 !== null) {
              s3 = [s3, s4, s5];
              s2 = s3;
            } else {
              peg$currPos = s2;
              s2 = peg$c0;
            }
          } else {
            peg$currPos = s2;
            s2 = peg$c0;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$c0;
        }
        if (s2 === null) {
          s2 = peg$currPos;
          s3 = peg$parsekey();
          if (s3 !== null) {
            if (input.charCodeAt(peg$currPos) === 61) {
              s4 = peg$c25;
              peg$currPos++;
            } else {
              s4 = null;
              if (peg$silentFails === 0) { peg$fail(peg$c26); }
            }
            if (s4 !== null) {
              s5 = peg$parsestringNode();
              if (s5 !== null) {
                s3 = [s3, s4, s5];
                s2 = s3;
              } else {
                peg$currPos = s2;
                s2 = peg$c0;
              }
            } else {
              peg$currPos = s2;
              s2 = peg$c0;
            }
          } else {
            peg$currPos = s2;
            s2 = peg$c0;
          }
          if (s2 === null) {
            s2 = peg$currPos;
            s3 = peg$parsekey();
            if (s3 !== null) {
              if (input.charCodeAt(peg$currPos) === 61) {
                s4 = peg$c25;
                peg$currPos++;
              } else {
                s4 = null;
                if (peg$silentFails === 0) { peg$fail(peg$c26); }
              }
              if (s4 !== null) {
                s5 = peg$parseintegerNode();
                if (s5 !== null) {
                  s3 = [s3, s4, s5];
                  s2 = s3;
                } else {
                  peg$currPos = s2;
                  s2 = peg$c0;
                }
              } else {
                peg$currPos = s2;
                s2 = peg$c0;
              }
            } else {
              peg$currPos = s2;
              s2 = peg$c0;
            }
            if (s2 === null) {
              s2 = peg$currPos;
              s3 = peg$parsekey();
              if (s3 !== null) {
                if (input.charCodeAt(peg$currPos) === 61) {
                  s4 = peg$c25;
                  peg$currPos++;
                } else {
                  s4 = null;
                  if (peg$silentFails === 0) { peg$fail(peg$c26); }
                }
                if (s4 !== null) {
                  s5 = peg$parsebooleanNode();
                  if (s5 !== null) {
                    s3 = [s3, s4, s5];
                    s2 = s3;
                  } else {
                    peg$currPos = s2;
                    s2 = peg$c0;
                  }
                } else {
                  peg$currPos = s2;
                  s2 = peg$c0;
                }
              } else {
                peg$currPos = s2;
                s2 = peg$c0;
              }
            }
          }
        }
        if (s2 !== null) {
          peg$reportedPos = s0;
          s1 = peg$c48(s2);
          if (s1 === null) {
            peg$currPos = s0;
            s0 = s1;
          } else {
            s0 = s1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseparam() {
      var s0;

      s0 = peg$parsepathIdNode();
      if (s0 === null) {
        s0 = peg$parsestringNode();
        if (s0 === null) {
          s0 = peg$parseintegerNode();
          if (s0 === null) {
            s0 = peg$parsebooleanNode();
          }
        }
      }

      return s0;
    }

    function peg$parsepath() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      s1 = peg$parsepathIdent();
      if (s1 !== null) {
        s2 = [];
        s3 = peg$currPos;
        s4 = peg$parseseperator();
        if (s4 !== null) {
          s5 = peg$parsepathIdent();
          if (s5 !== null) {
            peg$reportedPos = s3;
            s4 = peg$c49(s5);
            if (s4 === null) {
              peg$currPos = s3;
              s3 = s4;
            } else {
              s3 = s4;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$c0;
        }
        while (s3 !== null) {
          s2.push(s3);
          s3 = peg$currPos;
          s4 = peg$parseseperator();
          if (s4 !== null) {
            s5 = peg$parsepathIdent();
            if (s5 !== null) {
              peg$reportedPos = s3;
              s4 = peg$c49(s5);
              if (s4 === null) {
                peg$currPos = s3;
                s3 = s4;
              } else {
                s3 = s4;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
        }
        if (s2 !== null) {
          peg$reportedPos = s0;
          s1 = peg$c50(s1,s2);
          if (s1 === null) {
            peg$currPos = s0;
            s0 = s1;
          } else {
            s0 = s1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseseperator() {
      var s0, s1;

      peg$silentFails++;
      if (peg$c52.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c53); }
      }
      peg$silentFails--;
      if (s0 === null) {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c51); }
      }

      return s0;
    }

    function peg$parsepathIdNode() {
      var s0, s1;

      s0 = peg$currPos;
      s1 = peg$parsepath();
      if (s1 !== null) {
        peg$reportedPos = s0;
        s1 = peg$c54(s1);
      }
      if (s1 === null) {
        peg$currPos = s0;
        s0 = s1;
      } else {
        s0 = s1;
      }

      return s0;
    }

    function peg$parsestringNode() {
      var s0, s1;

      s0 = peg$currPos;
      s1 = peg$parsestring();
      if (s1 !== null) {
        peg$reportedPos = s0;
        s1 = peg$c55(s1);
      }
      if (s1 === null) {
        peg$currPos = s0;
        s0 = s1;
      } else {
        s0 = s1;
      }

      return s0;
    }

    function peg$parseintegerNode() {
      var s0, s1;

      s0 = peg$currPos;
      s1 = peg$parseinteger();
      if (s1 !== null) {
        peg$reportedPos = s0;
        s1 = peg$c56(s1);
      }
      if (s1 === null) {
        peg$currPos = s0;
        s0 = s1;
      } else {
        s0 = s1;
      }

      return s0;
    }

    function peg$parsebooleanNode() {
      var s0, s1;

      s0 = peg$currPos;
      s1 = peg$parseboolean();
      if (s1 !== null) {
        peg$reportedPos = s0;
        s1 = peg$c57(s1);
      }
      if (s1 === null) {
        peg$currPos = s0;
        s0 = s1;
      } else {
        s0 = s1;
      }

      return s0;
    }

    function peg$parseboolean() {
      var s0, s1;

      peg$silentFails++;
      if (input.substr(peg$currPos, 4) === peg$c59) {
        s0 = peg$c59;
        peg$currPos += 4;
      } else {
        s0 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c60); }
      }
      if (s0 === null) {
        if (input.substr(peg$currPos, 5) === peg$c61) {
          s0 = peg$c61;
          peg$currPos += 5;
        } else {
          s0 = null;
          if (peg$silentFails === 0) { peg$fail(peg$c62); }
        }
      }
      peg$silentFails--;
      if (s0 === null) {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c58); }
      }

      return s0;
    }

    function peg$parseinteger() {
      var s0, s1, s2, s3;

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$currPos;
      s2 = [];
      if (peg$c64.test(input.charAt(peg$currPos))) {
        s3 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s3 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c65); }
      }
      if (s3 !== null) {
        while (s3 !== null) {
          s2.push(s3);
          if (peg$c64.test(input.charAt(peg$currPos))) {
            s3 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s3 = null;
            if (peg$silentFails === 0) { peg$fail(peg$c65); }
          }
        }
      } else {
        s2 = peg$c0;
      }
      if (s2 !== null) {
        s2 = input.substring(s1, peg$currPos);
      }
      s1 = s2;
      if (s1 !== null) {
        peg$reportedPos = s0;
        s1 = peg$c66(s1);
      }
      if (s1 === null) {
        peg$currPos = s0;
        s0 = s1;
      } else {
        s0 = s1;
      }
      peg$silentFails--;
      if (s0 === null) {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c63); }
      }

      return s0;
    }

    function peg$parsestring() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 34) {
        s2 = peg$c67;
        peg$currPos++;
      } else {
        s2 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c68); }
      }
      if (s2 !== null) {
        s3 = peg$parsehashDoubleQuoteStringValue();
        if (s3 !== null) {
          if (input.charCodeAt(peg$currPos) === 34) {
            s4 = peg$c67;
            peg$currPos++;
          } else {
            s4 = null;
            if (peg$silentFails === 0) { peg$fail(peg$c68); }
          }
          if (s4 !== null) {
            s2 = [s2, s3, s4];
            s1 = s2;
          } else {
            peg$currPos = s1;
            s1 = peg$c0;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$c0;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$c0;
      }
      if (s1 === null) {
        s1 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 39) {
          s2 = peg$c69;
          peg$currPos++;
        } else {
          s2 = null;
          if (peg$silentFails === 0) { peg$fail(peg$c70); }
        }
        if (s2 !== null) {
          s3 = peg$parsehashSingleQuoteStringValue();
          if (s3 !== null) {
            if (input.charCodeAt(peg$currPos) === 39) {
              s4 = peg$c69;
              peg$currPos++;
            } else {
              s4 = null;
              if (peg$silentFails === 0) { peg$fail(peg$c70); }
            }
            if (s4 !== null) {
              s2 = [s2, s3, s4];
              s1 = s2;
            } else {
              peg$currPos = s1;
              s1 = peg$c0;
            }
          } else {
            peg$currPos = s1;
            s1 = peg$c0;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$c0;
        }
      }
      if (s1 !== null) {
        peg$reportedPos = s0;
        s1 = peg$c71(s1);
      }
      if (s1 === null) {
        peg$currPos = s0;
        s0 = s1;
      } else {
        s0 = s1;
      }

      return s0;
    }

    function peg$parsehashDoubleQuoteStringValue() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$currPos;
      s3 = peg$currPos;
      peg$silentFails++;
      s4 = peg$parseTERM();
      peg$silentFails--;
      if (s4 === null) {
        s3 = peg$c1;
      } else {
        peg$currPos = s3;
        s3 = peg$c0;
      }
      if (s3 !== null) {
        if (peg$c72.test(input.charAt(peg$currPos))) {
          s4 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s4 = null;
          if (peg$silentFails === 0) { peg$fail(peg$c73); }
        }
        if (s4 !== null) {
          s3 = [s3, s4];
          s2 = s3;
        } else {
          peg$currPos = s2;
          s2 = peg$c0;
        }
      } else {
        peg$currPos = s2;
        s2 = peg$c0;
      }
      while (s2 !== null) {
        s1.push(s2);
        s2 = peg$currPos;
        s3 = peg$currPos;
        peg$silentFails++;
        s4 = peg$parseTERM();
        peg$silentFails--;
        if (s4 === null) {
          s3 = peg$c1;
        } else {
          peg$currPos = s3;
          s3 = peg$c0;
        }
        if (s3 !== null) {
          if (peg$c72.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = null;
            if (peg$silentFails === 0) { peg$fail(peg$c73); }
          }
          if (s4 !== null) {
            s3 = [s3, s4];
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$c0;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$c0;
        }
      }
      if (s1 !== null) {
        s1 = input.substring(s0, peg$currPos);
      }
      s0 = s1;

      return s0;
    }

    function peg$parsehashSingleQuoteStringValue() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$currPos;
      s3 = peg$currPos;
      peg$silentFails++;
      s4 = peg$parseTERM();
      peg$silentFails--;
      if (s4 === null) {
        s3 = peg$c1;
      } else {
        peg$currPos = s3;
        s3 = peg$c0;
      }
      if (s3 !== null) {
        if (peg$c74.test(input.charAt(peg$currPos))) {
          s4 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s4 = null;
          if (peg$silentFails === 0) { peg$fail(peg$c75); }
        }
        if (s4 !== null) {
          s3 = [s3, s4];
          s2 = s3;
        } else {
          peg$currPos = s2;
          s2 = peg$c0;
        }
      } else {
        peg$currPos = s2;
        s2 = peg$c0;
      }
      while (s2 !== null) {
        s1.push(s2);
        s2 = peg$currPos;
        s3 = peg$currPos;
        peg$silentFails++;
        s4 = peg$parseTERM();
        peg$silentFails--;
        if (s4 === null) {
          s3 = peg$c1;
        } else {
          peg$currPos = s3;
          s3 = peg$c0;
        }
        if (s3 !== null) {
          if (peg$c74.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = null;
            if (peg$silentFails === 0) { peg$fail(peg$c75); }
          }
          if (s4 !== null) {
            s3 = [s3, s4];
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$c0;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$c0;
        }
      }
      if (s1 !== null) {
        s1 = input.substring(s0, peg$currPos);
      }
      s0 = s1;

      return s0;
    }

    function peg$parsealpha() {
      var s0;

      if (peg$c76.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c77); }
      }

      return s0;
    }

    function peg$parsehtmlInlineContent() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = peg$parse_();
      if (s1 !== null) {
        s2 = peg$parseexplicitMustache();
        if (s2 !== null) {
          peg$reportedPos = s0;
          s1 = peg$c78(s2);
          if (s1 === null) {
            peg$currPos = s0;
            s0 = s1;
          } else {
            s0 = s1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      if (s0 === null) {
        s0 = peg$parsetextNodes();
      }

      return s0;
    }

    function peg$parsewhitespaceableTextNodes() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$parseindentation();
      if (s1 !== null) {
        s2 = peg$parsetextNodes();
        if (s2 !== null) {
          s3 = [];
          s4 = peg$parsewhitespaceableTextNodes();
          while (s4 !== null) {
            s3.push(s4);
            s4 = peg$parsewhitespaceableTextNodes();
          }
          if (s3 !== null) {
            s4 = peg$parseanyDedent();
            if (s4 !== null) {
              peg$reportedPos = s0;
              s1 = peg$c79(s1,s2,s3);
              if (s1 === null) {
                peg$currPos = s0;
                s0 = s1;
              } else {
                s0 = s1;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      if (s0 === null) {
        s0 = peg$parsetextNodes();
      }

      return s0;
    }

    function peg$parsetextLineStart() {
      var s0, s1, s2;

      s0 = peg$currPos;
      if (peg$c80.test(input.charAt(peg$currPos))) {
        s1 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c81); }
      }
      if (s1 !== null) {
        if (input.charCodeAt(peg$currPos) === 32) {
          s2 = peg$c23;
          peg$currPos++;
        } else {
          s2 = null;
          if (peg$silentFails === 0) { peg$fail(peg$c24); }
        }
        if (s2 === null) {
          s2 = peg$c1;
        }
        if (s2 !== null) {
          peg$reportedPos = s0;
          s1 = peg$c46(s1);
          if (s1 === null) {
            peg$currPos = s0;
            s0 = s1;
          } else {
            s0 = s1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      if (s0 === null) {
        s0 = peg$currPos;
        s1 = peg$currPos;
        peg$silentFails++;
        if (input.charCodeAt(peg$currPos) === 60) {
          s2 = peg$c82;
          peg$currPos++;
        } else {
          s2 = null;
          if (peg$silentFails === 0) { peg$fail(peg$c83); }
        }
        peg$silentFails--;
        if (s2 !== null) {
          peg$currPos = s1;
          s1 = peg$c1;
        } else {
          s1 = peg$c0;
        }
        if (s1 !== null) {
          peg$reportedPos = s0;
          s1 = peg$c84();
        }
        if (s1 === null) {
          peg$currPos = s0;
          s0 = s1;
        } else {
          s0 = s1;
        }
      }

      return s0;
    }

    function peg$parsetextLine() {
      var s0, s1, s2, s3, s4, s5, s6;

      s0 = peg$currPos;
      s1 = peg$parsetextLineStart();
      if (s1 !== null) {
        s2 = peg$parsetextNodes();
        if (s2 !== null) {
          s3 = peg$currPos;
          s4 = peg$parseindentation();
          if (s4 !== null) {
            s5 = [];
            s6 = peg$parsewhitespaceableTextNodes();
            while (s6 !== null) {
              s5.push(s6);
              s6 = peg$parsewhitespaceableTextNodes();
            }
            if (s5 !== null) {
              s6 = peg$parseDEDENT();
              if (s6 !== null) {
                s4 = [s4, s5, s6];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$c0;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
          if (s3 === null) {
            s3 = peg$c1;
          }
          if (s3 !== null) {
            peg$reportedPos = s0;
            s1 = peg$c85(s1,s2,s3);
            if (s1 === null) {
              peg$currPos = s0;
              s0 = s1;
            } else {
              s0 = s1;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parsetextNodes() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      s1 = peg$parsepreMustacheText();
      if (s1 === null) {
        s1 = peg$c1;
      }
      if (s1 !== null) {
        s2 = [];
        s3 = peg$currPos;
        s4 = peg$parserawMustache();
        if (s4 !== null) {
          s5 = peg$parsepreMustacheText();
          if (s5 === null) {
            s5 = peg$c1;
          }
          if (s5 !== null) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$c0;
        }
        while (s3 !== null) {
          s2.push(s3);
          s3 = peg$currPos;
          s4 = peg$parserawMustache();
          if (s4 !== null) {
            s5 = peg$parsepreMustacheText();
            if (s5 === null) {
              s5 = peg$c1;
            }
            if (s5 !== null) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
        }
        if (s2 !== null) {
          s3 = peg$parseTERM();
          if (s3 !== null) {
            peg$reportedPos = s0;
            s1 = peg$c86(s1,s2);
            if (s1 === null) {
              peg$currPos = s0;
              s0 = s1;
            } else {
              s0 = s1;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseattributeTextNodes() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 34) {
        s1 = peg$c67;
        peg$currPos++;
      } else {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c68); }
      }
      if (s1 !== null) {
        s2 = peg$parseattributeTextNodesInner();
        if (s2 !== null) {
          if (input.charCodeAt(peg$currPos) === 34) {
            s3 = peg$c67;
            peg$currPos++;
          } else {
            s3 = null;
            if (peg$silentFails === 0) { peg$fail(peg$c68); }
          }
          if (s3 !== null) {
            peg$reportedPos = s0;
            s1 = peg$c87(s2);
            if (s1 === null) {
              peg$currPos = s0;
              s0 = s1;
            } else {
              s0 = s1;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseattributeTextNodesInner() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      s1 = peg$parsepreAttrMustacheText();
      if (s1 === null) {
        s1 = peg$c1;
      }
      if (s1 !== null) {
        s2 = [];
        s3 = peg$currPos;
        s4 = peg$parserawMustache();
        if (s4 !== null) {
          s5 = peg$parsepreAttrMustacheText();
          if (s5 === null) {
            s5 = peg$c1;
          }
          if (s5 !== null) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$c0;
        }
        while (s3 !== null) {
          s2.push(s3);
          s3 = peg$currPos;
          s4 = peg$parserawMustache();
          if (s4 !== null) {
            s5 = peg$parsepreAttrMustacheText();
            if (s5 === null) {
              s5 = peg$c1;
            }
            if (s5 !== null) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
        }
        if (s2 !== null) {
          peg$reportedPos = s0;
          s1 = peg$c86(s1,s2);
          if (s1 === null) {
            peg$currPos = s0;
            s0 = s1;
          } else {
            s0 = s1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parserawMustache() {
      var s0;

      s0 = peg$parserawMustacheUnescaped();
      if (s0 === null) {
        s0 = peg$parserawMustacheEscaped();
      }

      return s0;
    }

    function peg$parserawMustacheEscaped() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      s1 = peg$parsedoubleOpen();
      if (s1 !== null) {
        s2 = peg$parse_();
        if (s2 !== null) {
          s3 = peg$parseinMustache();
          if (s3 !== null) {
            s4 = peg$parse_();
            if (s4 !== null) {
              s5 = peg$parsedoubleClose();
              if (s5 !== null) {
                peg$reportedPos = s0;
                s1 = peg$c88(s3);
                if (s1 === null) {
                  peg$currPos = s0;
                  s0 = s1;
                } else {
                  s0 = s1;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      if (s0 === null) {
        s0 = peg$currPos;
        s1 = peg$parsehashStacheOpen();
        if (s1 !== null) {
          s2 = peg$parse_();
          if (s2 !== null) {
            s3 = peg$parseinMustache();
            if (s3 !== null) {
              s4 = peg$parse_();
              if (s4 !== null) {
                s5 = peg$parsehashStacheClose();
                if (s5 !== null) {
                  peg$reportedPos = s0;
                  s1 = peg$c88(s3);
                  if (s1 === null) {
                    peg$currPos = s0;
                    s0 = s1;
                  } else {
                    s0 = s1;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      }

      return s0;
    }

    function peg$parserawMustacheUnescaped() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      s1 = peg$parsetripleOpen();
      if (s1 !== null) {
        s2 = peg$parse_();
        if (s2 !== null) {
          s3 = peg$parseinMustache();
          if (s3 !== null) {
            s4 = peg$parse_();
            if (s4 !== null) {
              s5 = peg$parsetripleClose();
              if (s5 !== null) {
                peg$reportedPos = s0;
                s1 = peg$c89(s3);
                if (s1 === null) {
                  peg$currPos = s0;
                  s0 = s1;
                } else {
                  s0 = s1;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parsepreAttrMustacheText() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$currPos;
      s2 = [];
      s3 = peg$parsepreAttrMustacheUnit();
      if (s3 !== null) {
        while (s3 !== null) {
          s2.push(s3);
          s3 = peg$parsepreAttrMustacheUnit();
        }
      } else {
        s2 = peg$c0;
      }
      if (s2 !== null) {
        s2 = input.substring(s1, peg$currPos);
      }
      s1 = s2;
      if (s1 !== null) {
        peg$reportedPos = s0;
        s1 = peg$c90(s1);
      }
      if (s1 === null) {
        peg$currPos = s0;
        s0 = s1;
      } else {
        s0 = s1;
      }

      return s0;
    }

    function peg$parsepreAttrMustacheUnit() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = peg$currPos;
      peg$silentFails++;
      s2 = peg$parsenonMustacheUnit();
      if (s2 === null) {
        if (input.charCodeAt(peg$currPos) === 34) {
          s2 = peg$c67;
          peg$currPos++;
        } else {
          s2 = null;
          if (peg$silentFails === 0) { peg$fail(peg$c68); }
        }
      }
      peg$silentFails--;
      if (s2 === null) {
        s1 = peg$c1;
      } else {
        peg$currPos = s1;
        s1 = peg$c0;
      }
      if (s1 !== null) {
        if (input.length > peg$currPos) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = null;
          if (peg$silentFails === 0) { peg$fail(peg$c91); }
        }
        if (s2 !== null) {
          peg$reportedPos = s0;
          s1 = peg$c92(s2);
          if (s1 === null) {
            peg$currPos = s0;
            s0 = s1;
          } else {
            s0 = s1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parsepreMustacheText() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$currPos;
      s2 = [];
      s3 = peg$parsepreMustacheUnit();
      if (s3 !== null) {
        while (s3 !== null) {
          s2.push(s3);
          s3 = peg$parsepreMustacheUnit();
        }
      } else {
        s2 = peg$c0;
      }
      if (s2 !== null) {
        s2 = input.substring(s1, peg$currPos);
      }
      s1 = s2;
      if (s1 !== null) {
        peg$reportedPos = s0;
        s1 = peg$c90(s1);
      }
      if (s1 === null) {
        peg$currPos = s0;
        s0 = s1;
      } else {
        s0 = s1;
      }

      return s0;
    }

    function peg$parsepreMustacheUnit() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = peg$currPos;
      peg$silentFails++;
      s2 = peg$parsenonMustacheUnit();
      peg$silentFails--;
      if (s2 === null) {
        s1 = peg$c1;
      } else {
        peg$currPos = s1;
        s1 = peg$c0;
      }
      if (s1 !== null) {
        if (input.length > peg$currPos) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = null;
          if (peg$silentFails === 0) { peg$fail(peg$c91); }
        }
        if (s2 !== null) {
          peg$reportedPos = s0;
          s1 = peg$c92(s2);
          if (s1 === null) {
            peg$currPos = s0;
            s0 = s1;
          } else {
            s0 = s1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parsenonMustacheUnit() {
      var s0;

      s0 = peg$parsetripleOpen();
      if (s0 === null) {
        s0 = peg$parsedoubleOpen();
        if (s0 === null) {
          s0 = peg$parsehashStacheOpen();
          if (s0 === null) {
            s0 = peg$parseanyDedent();
            if (s0 === null) {
              s0 = peg$parseTERM();
            }
          }
        }
      }

      return s0;
    }

    function peg$parserawMustacheSingle() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      s1 = peg$parsesingleOpen();
      if (s1 !== null) {
        s2 = peg$parse_();
        if (s2 !== null) {
          s3 = peg$parseinMustache();
          if (s3 !== null) {
            s4 = peg$parse_();
            if (s4 !== null) {
              s5 = peg$parsesingleClose();
              if (s5 !== null) {
                peg$reportedPos = s0;
                s1 = peg$c88(s3);
                if (s1 === null) {
                  peg$currPos = s0;
                  s0 = s1;
                } else {
                  s0 = s1;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseinTagMustache() {
      var s0;

      s0 = peg$parserawMustacheSingle();
      if (s0 === null) {
        s0 = peg$parserawMustacheUnescaped();
        if (s0 === null) {
          s0 = peg$parserawMustacheEscaped();
        }
      }

      return s0;
    }

    function peg$parsesingleOpen() {
      var s0, s1;

      peg$silentFails++;
      if (input.charCodeAt(peg$currPos) === 123) {
        s0 = peg$c94;
        peg$currPos++;
      } else {
        s0 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c95); }
      }
      peg$silentFails--;
      if (s0 === null) {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c93); }
      }

      return s0;
    }

    function peg$parsedoubleOpen() {
      var s0, s1;

      peg$silentFails++;
      if (input.substr(peg$currPos, 2) === peg$c97) {
        s0 = peg$c97;
        peg$currPos += 2;
      } else {
        s0 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c98); }
      }
      peg$silentFails--;
      if (s0 === null) {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c96); }
      }

      return s0;
    }

    function peg$parsetripleOpen() {
      var s0, s1;

      peg$silentFails++;
      if (input.substr(peg$currPos, 3) === peg$c100) {
        s0 = peg$c100;
        peg$currPos += 3;
      } else {
        s0 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c101); }
      }
      peg$silentFails--;
      if (s0 === null) {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c99); }
      }

      return s0;
    }

    function peg$parsesingleClose() {
      var s0, s1;

      peg$silentFails++;
      if (input.charCodeAt(peg$currPos) === 125) {
        s0 = peg$c103;
        peg$currPos++;
      } else {
        s0 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c104); }
      }
      peg$silentFails--;
      if (s0 === null) {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c102); }
      }

      return s0;
    }

    function peg$parsedoubleClose() {
      var s0, s1;

      peg$silentFails++;
      if (input.substr(peg$currPos, 2) === peg$c106) {
        s0 = peg$c106;
        peg$currPos += 2;
      } else {
        s0 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c107); }
      }
      peg$silentFails--;
      if (s0 === null) {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c105); }
      }

      return s0;
    }

    function peg$parsetripleClose() {
      var s0, s1;

      peg$silentFails++;
      if (input.substr(peg$currPos, 3) === peg$c109) {
        s0 = peg$c109;
        peg$currPos += 3;
      } else {
        s0 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c110); }
      }
      peg$silentFails--;
      if (s0 === null) {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c108); }
      }

      return s0;
    }

    function peg$parsehashStacheOpen() {
      var s0, s1;

      peg$silentFails++;
      if (input.substr(peg$currPos, 2) === peg$c112) {
        s0 = peg$c112;
        peg$currPos += 2;
      } else {
        s0 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c113); }
      }
      peg$silentFails--;
      if (s0 === null) {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c111); }
      }

      return s0;
    }

    function peg$parsehashStacheClose() {
      var s0, s1;

      peg$silentFails++;
      if (input.charCodeAt(peg$currPos) === 125) {
        s0 = peg$c103;
        peg$currPos++;
      } else {
        s0 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c104); }
      }
      peg$silentFails--;
      if (s0 === null) {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c114); }
      }

      return s0;
    }

    function peg$parseequalSign() {
      var s0, s1, s2;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 2) === peg$c115) {
        s1 = peg$c115;
        peg$currPos += 2;
      } else {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c116); }
      }
      if (s1 !== null) {
        if (input.charCodeAt(peg$currPos) === 32) {
          s2 = peg$c23;
          peg$currPos++;
        } else {
          s2 = null;
          if (peg$silentFails === 0) { peg$fail(peg$c24); }
        }
        if (s2 === null) {
          s2 = peg$c1;
        }
        if (s2 !== null) {
          peg$reportedPos = s0;
          s1 = peg$c117();
          if (s1 === null) {
            peg$currPos = s0;
            s0 = s1;
          } else {
            s0 = s1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      if (s0 === null) {
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 61) {
          s1 = peg$c25;
          peg$currPos++;
        } else {
          s1 = null;
          if (peg$silentFails === 0) { peg$fail(peg$c26); }
        }
        if (s1 !== null) {
          if (input.charCodeAt(peg$currPos) === 32) {
            s2 = peg$c23;
            peg$currPos++;
          } else {
            s2 = null;
            if (peg$silentFails === 0) { peg$fail(peg$c24); }
          }
          if (s2 === null) {
            s2 = peg$c1;
          }
          if (s2 !== null) {
            peg$reportedPos = s0;
            s1 = peg$c118();
            if (s1 === null) {
              peg$currPos = s0;
              s0 = s1;
            } else {
              s0 = s1;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      }

      return s0;
    }

    function peg$parsehtmlTagAndOptionalAttributes() {
      var s0, s1, s2, s3, s4, s5, s6;

      s0 = peg$currPos;
      s1 = peg$currPos;
      s2 = peg$parsehtmlTagName();
      if (s2 !== null) {
        s3 = peg$parseshorthandAttributes();
        if (s3 === null) {
          s3 = peg$c1;
        }
        if (s3 !== null) {
          s4 = [];
          s5 = peg$parseinTagMustache();
          while (s5 !== null) {
            s4.push(s5);
            s5 = peg$parseinTagMustache();
          }
          if (s4 !== null) {
            s5 = [];
            s6 = peg$parsefullAttribute();
            while (s6 !== null) {
              s5.push(s6);
              s6 = peg$parsefullAttribute();
            }
            if (s5 !== null) {
              peg$reportedPos = s1;
              s2 = peg$c119(s2,s3,s4,s5);
              if (s2 === null) {
                peg$currPos = s1;
                s1 = s2;
              } else {
                s1 = s2;
              }
            } else {
              peg$currPos = s1;
              s1 = peg$c0;
            }
          } else {
            peg$currPos = s1;
            s1 = peg$c0;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$c0;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$c0;
      }
      if (s1 === null) {
        s1 = peg$currPos;
        s2 = peg$parseshorthandAttributes();
        if (s2 !== null) {
          s3 = [];
          s4 = peg$parseinTagMustache();
          while (s4 !== null) {
            s3.push(s4);
            s4 = peg$parseinTagMustache();
          }
          if (s3 !== null) {
            s4 = [];
            s5 = peg$parsefullAttribute();
            while (s5 !== null) {
              s4.push(s5);
              s5 = peg$parsefullAttribute();
            }
            if (s4 !== null) {
              peg$reportedPos = s1;
              s2 = peg$c120(s2,s3,s4);
              if (s2 === null) {
                peg$currPos = s1;
                s1 = s2;
              } else {
                s1 = s2;
              }
            } else {
              peg$currPos = s1;
              s1 = peg$c0;
            }
          } else {
            peg$currPos = s1;
            s1 = peg$c0;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$c0;
        }
      }
      if (s1 !== null) {
        peg$reportedPos = s0;
        s1 = peg$c121(s1);
      }
      if (s1 === null) {
        peg$currPos = s0;
        s0 = s1;
      } else {
        s0 = s1;
      }

      return s0;
    }

    function peg$parseshorthandAttributes() {
      var s0;

      s0 = peg$parseattributesAtLeastID();
      if (s0 === null) {
        s0 = peg$parseattributesAtLeastClass();
      }

      return s0;
    }

    function peg$parseattributesAtLeastID() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$parseidShorthand();
      if (s1 !== null) {
        s2 = [];
        s3 = peg$parseclassShorthand();
        while (s3 !== null) {
          s2.push(s3);
          s3 = peg$parseclassShorthand();
        }
        if (s2 !== null) {
          peg$reportedPos = s0;
          s1 = peg$c35(s1,s2);
          if (s1 === null) {
            peg$currPos = s0;
            s0 = s1;
          } else {
            s0 = s1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseattributesAtLeastClass() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parseclassShorthand();
      if (s2 !== null) {
        while (s2 !== null) {
          s1.push(s2);
          s2 = peg$parseclassShorthand();
        }
      } else {
        s1 = peg$c0;
      }
      if (s1 !== null) {
        peg$reportedPos = s0;
        s1 = peg$c36(s1);
      }
      if (s1 === null) {
        peg$currPos = s0;
        s0 = s1;
      } else {
        s0 = s1;
      }

      return s0;
    }

    function peg$parsefullAttribute() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      if (input.charCodeAt(peg$currPos) === 32) {
        s2 = peg$c23;
        peg$currPos++;
      } else {
        s2 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c24); }
      }
      if (s2 !== null) {
        while (s2 !== null) {
          s1.push(s2);
          if (input.charCodeAt(peg$currPos) === 32) {
            s2 = peg$c23;
            peg$currPos++;
          } else {
            s2 = null;
            if (peg$silentFails === 0) { peg$fail(peg$c24); }
          }
        }
      } else {
        s1 = peg$c0;
      }
      if (s1 !== null) {
        s2 = peg$parseactionAttribute();
        if (s2 === null) {
          s2 = peg$parseboundAttribute();
          if (s2 === null) {
            s2 = peg$parserawMustacheAttribute();
            if (s2 === null) {
              s2 = peg$parsenormalAttribute();
            }
          }
        }
        if (s2 !== null) {
          peg$reportedPos = s0;
          s1 = peg$c122(s2);
          if (s1 === null) {
            peg$currPos = s0;
            s0 = s1;
          } else {
            s0 = s1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseboundAttributeValueChar() {
      var s0;

      if (peg$c123.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c124); }
      }

      return s0;
    }

    function peg$parseactionValue() {
      var s0, s1;

      s0 = peg$parsequotedActionValue();
      if (s0 === null) {
        s0 = peg$currPos;
        s1 = peg$parsepathIdNode();
        if (s1 !== null) {
          peg$reportedPos = s0;
          s1 = peg$c125(s1);
        }
        if (s1 === null) {
          peg$currPos = s0;
          s0 = s1;
        } else {
          s0 = s1;
        }
      }

      return s0;
    }

    function peg$parsequotedActionValue() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 34) {
        s2 = peg$c67;
        peg$currPos++;
      } else {
        s2 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c68); }
      }
      if (s2 !== null) {
        s3 = peg$parseinMustache();
        if (s3 !== null) {
          if (input.charCodeAt(peg$currPos) === 34) {
            s4 = peg$c67;
            peg$currPos++;
          } else {
            s4 = null;
            if (peg$silentFails === 0) { peg$fail(peg$c68); }
          }
          if (s4 !== null) {
            s2 = [s2, s3, s4];
            s1 = s2;
          } else {
            peg$currPos = s1;
            s1 = peg$c0;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$c0;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$c0;
      }
      if (s1 === null) {
        s1 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 39) {
          s2 = peg$c69;
          peg$currPos++;
        } else {
          s2 = null;
          if (peg$silentFails === 0) { peg$fail(peg$c70); }
        }
        if (s2 !== null) {
          s3 = peg$parseinMustache();
          if (s3 !== null) {
            if (input.charCodeAt(peg$currPos) === 39) {
              s4 = peg$c69;
              peg$currPos++;
            } else {
              s4 = null;
              if (peg$silentFails === 0) { peg$fail(peg$c70); }
            }
            if (s4 !== null) {
              s2 = [s2, s3, s4];
              s1 = s2;
            } else {
              peg$currPos = s1;
              s1 = peg$c0;
            }
          } else {
            peg$currPos = s1;
            s1 = peg$c0;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$c0;
        }
      }
      if (s1 !== null) {
        peg$reportedPos = s0;
        s1 = peg$c71(s1);
      }
      if (s1 === null) {
        peg$currPos = s0;
        s0 = s1;
      } else {
        s0 = s1;
      }

      return s0;
    }

    function peg$parseactionAttribute() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$parseknownEvent();
      if (s1 !== null) {
        if (input.charCodeAt(peg$currPos) === 61) {
          s2 = peg$c25;
          peg$currPos++;
        } else {
          s2 = null;
          if (peg$silentFails === 0) { peg$fail(peg$c26); }
        }
        if (s2 !== null) {
          s3 = peg$parseactionValue();
          if (s3 !== null) {
            peg$reportedPos = s0;
            s1 = peg$c126(s1,s3);
            if (s1 === null) {
              peg$currPos = s0;
              s0 = s1;
            } else {
              s0 = s1;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseboundAttributeValue() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 123) {
        s1 = peg$c94;
        peg$currPos++;
      } else {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c95); }
      }
      if (s1 !== null) {
        s2 = peg$parse_();
        if (s2 !== null) {
          s3 = peg$currPos;
          s4 = [];
          s5 = peg$parseboundAttributeValueChar();
          if (s5 === null) {
            if (input.charCodeAt(peg$currPos) === 32) {
              s5 = peg$c23;
              peg$currPos++;
            } else {
              s5 = null;
              if (peg$silentFails === 0) { peg$fail(peg$c24); }
            }
          }
          if (s5 !== null) {
            while (s5 !== null) {
              s4.push(s5);
              s5 = peg$parseboundAttributeValueChar();
              if (s5 === null) {
                if (input.charCodeAt(peg$currPos) === 32) {
                  s5 = peg$c23;
                  peg$currPos++;
                } else {
                  s5 = null;
                  if (peg$silentFails === 0) { peg$fail(peg$c24); }
                }
              }
            }
          } else {
            s4 = peg$c0;
          }
          if (s4 !== null) {
            s4 = input.substring(s3, peg$currPos);
          }
          s3 = s4;
          if (s3 !== null) {
            s4 = peg$parse_();
            if (s4 !== null) {
              if (input.charCodeAt(peg$currPos) === 125) {
                s5 = peg$c103;
                peg$currPos++;
              } else {
                s5 = null;
                if (peg$silentFails === 0) { peg$fail(peg$c104); }
              }
              if (s5 !== null) {
                peg$reportedPos = s0;
                s1 = peg$c127(s3);
                if (s1 === null) {
                  peg$currPos = s0;
                  s0 = s1;
                } else {
                  s0 = s1;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      if (s0 === null) {
        s0 = peg$currPos;
        s1 = [];
        s2 = peg$parseboundAttributeValueChar();
        if (s2 !== null) {
          while (s2 !== null) {
            s1.push(s2);
            s2 = peg$parseboundAttributeValueChar();
          }
        } else {
          s1 = peg$c0;
        }
        if (s1 !== null) {
          s1 = input.substring(s0, peg$currPos);
        }
        s0 = s1;
      }

      return s0;
    }

    function peg$parseboundAttribute() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      s1 = peg$parsekey();
      if (s1 !== null) {
        if (input.charCodeAt(peg$currPos) === 61) {
          s2 = peg$c25;
          peg$currPos++;
        } else {
          s2 = null;
          if (peg$silentFails === 0) { peg$fail(peg$c26); }
        }
        if (s2 !== null) {
          s3 = peg$parseboundAttributeValue();
          if (s3 !== null) {
            s4 = peg$currPos;
            peg$silentFails++;
            if (input.charCodeAt(peg$currPos) === 33) {
              s5 = peg$c128;
              peg$currPos++;
            } else {
              s5 = null;
              if (peg$silentFails === 0) { peg$fail(peg$c129); }
            }
            peg$silentFails--;
            if (s5 === null) {
              s4 = peg$c1;
            } else {
              peg$currPos = s4;
              s4 = peg$c0;
            }
            if (s4 !== null) {
              peg$reportedPos = peg$currPos;
              s5 = peg$c130(s1,s3);
              if (s5) {
                s5 = peg$c1;
              } else {
                s5 = peg$c0;
              }
              if (s5 !== null) {
                peg$reportedPos = s0;
                s1 = peg$c131(s1,s3);
                if (s1 === null) {
                  peg$currPos = s0;
                  s0 = s1;
                } else {
                  s0 = s1;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parserawMustacheAttribute() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$parsekey();
      if (s1 !== null) {
        if (input.charCodeAt(peg$currPos) === 61) {
          s2 = peg$c25;
          peg$currPos++;
        } else {
          s2 = null;
          if (peg$silentFails === 0) { peg$fail(peg$c26); }
        }
        if (s2 !== null) {
          s3 = peg$parsepathIdNode();
          if (s3 !== null) {
            peg$reportedPos = s0;
            s1 = peg$c132(s1,s3);
            if (s1 === null) {
              peg$currPos = s0;
              s0 = s1;
            } else {
              s0 = s1;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parsenormalAttribute() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$parsekey();
      if (s1 !== null) {
        if (input.charCodeAt(peg$currPos) === 61) {
          s2 = peg$c25;
          peg$currPos++;
        } else {
          s2 = null;
          if (peg$silentFails === 0) { peg$fail(peg$c26); }
        }
        if (s2 !== null) {
          s3 = peg$parseattributeTextNodes();
          if (s3 !== null) {
            peg$reportedPos = s0;
            s1 = peg$c133(s1,s3);
            if (s1 === null) {
              peg$currPos = s0;
              s0 = s1;
            } else {
              s0 = s1;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseattributeName() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parseattributeChar();
      while (s2 !== null) {
        s1.push(s2);
        s2 = peg$parseattributeChar();
      }
      if (s1 !== null) {
        s1 = input.substring(s0, peg$currPos);
      }
      s0 = s1;

      return s0;
    }

    function peg$parseattributeValue() {
      var s0;

      s0 = peg$parsestring();
      if (s0 === null) {
        s0 = peg$parseparam();
      }

      return s0;
    }

    function peg$parseattributeChar() {
      var s0;

      s0 = peg$parsealpha();
      if (s0 === null) {
        if (peg$c64.test(input.charAt(peg$currPos))) {
          s0 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s0 = null;
          if (peg$silentFails === 0) { peg$fail(peg$c65); }
        }
        if (s0 === null) {
          if (input.charCodeAt(peg$currPos) === 95) {
            s0 = peg$c134;
            peg$currPos++;
          } else {
            s0 = null;
            if (peg$silentFails === 0) { peg$fail(peg$c135); }
          }
          if (s0 === null) {
            if (input.charCodeAt(peg$currPos) === 45) {
              s0 = peg$c136;
              peg$currPos++;
            } else {
              s0 = null;
              if (peg$silentFails === 0) { peg$fail(peg$c137); }
            }
          }
        }
      }

      return s0;
    }

    function peg$parsetagNameShorthand() {
      var s0, s1, s2;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 37) {
        s1 = peg$c138;
        peg$currPos++;
      } else {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c139); }
      }
      if (s1 !== null) {
        s2 = peg$parsecssIdentifier();
        if (s2 !== null) {
          peg$reportedPos = s0;
          s1 = peg$c92(s2);
          if (s1 === null) {
            peg$currPos = s0;
            s0 = s1;
          } else {
            s0 = s1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseidShorthand() {
      var s0, s1, s2;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 35) {
        s1 = peg$c140;
        peg$currPos++;
      } else {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c141); }
      }
      if (s1 !== null) {
        s2 = peg$parsecssIdentifier();
        if (s2 !== null) {
          peg$reportedPos = s0;
          s1 = peg$c142(s2);
          if (s1 === null) {
            peg$currPos = s0;
            s0 = s1;
          } else {
            s0 = s1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseclassShorthand() {
      var s0, s1, s2;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 46) {
        s1 = peg$c42;
        peg$currPos++;
      } else {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c43); }
      }
      if (s1 !== null) {
        s2 = peg$parsecssIdentifier();
        if (s2 !== null) {
          peg$reportedPos = s0;
          s1 = peg$c92(s2);
          if (s1 === null) {
            peg$currPos = s0;
            s0 = s1;
          } else {
            s0 = s1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parsecssIdentifier() {
      var s0, s1;

      peg$silentFails++;
      s0 = peg$parseident();
      peg$silentFails--;
      if (s0 === null) {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c143); }
      }

      return s0;
    }

    function peg$parseident() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$parsenmstart();
      if (s1 !== null) {
        s2 = peg$currPos;
        s3 = [];
        s4 = peg$parsenmchar();
        while (s4 !== null) {
          s3.push(s4);
          s4 = peg$parsenmchar();
        }
        if (s3 !== null) {
          s3 = input.substring(s2, peg$currPos);
        }
        s2 = s3;
        if (s2 !== null) {
          peg$reportedPos = s0;
          s1 = peg$c144(s1,s2);
          if (s1 === null) {
            peg$currPos = s0;
            s0 = s1;
          } else {
            s0 = s1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parsenmchar() {
      var s0;

      if (peg$c145.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c146); }
      }
      if (s0 === null) {
        s0 = peg$parsenonascii();
      }

      return s0;
    }

    function peg$parsenmstart() {
      var s0;

      if (peg$c147.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c148); }
      }
      if (s0 === null) {
        s0 = peg$parsenonascii();
      }

      return s0;
    }

    function peg$parsenonascii() {
      var s0;

      if (peg$c149.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c150); }
      }

      return s0;
    }

    function peg$parsetagString() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parsetagChar();
      if (s2 !== null) {
        while (s2 !== null) {
          s1.push(s2);
          s2 = peg$parsetagChar();
        }
      } else {
        s1 = peg$c0;
      }
      if (s1 !== null) {
        s1 = input.substring(s0, peg$currPos);
      }
      s0 = s1;

      return s0;
    }

    function peg$parsehtmlTagName() {
      var s0, s1, s2;

      peg$silentFails++;
      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 37) {
        s1 = peg$c138;
        peg$currPos++;
      } else {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c139); }
      }
      if (s1 !== null) {
        s2 = peg$parsetagString();
        if (s2 !== null) {
          peg$reportedPos = s0;
          s1 = peg$c46(s2);
          if (s1 === null) {
            peg$currPos = s0;
            s0 = s1;
          } else {
            s0 = s1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      if (s0 === null) {
        s0 = peg$parseknownTagName();
      }
      peg$silentFails--;
      if (s0 === null) {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c151); }
      }

      return s0;
    }

    function peg$parseknownTagName() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = peg$parsetagString();
      if (s1 !== null) {
        peg$reportedPos = peg$currPos;
        s2 = peg$c152(s1);
        if (s2) {
          s2 = peg$c1;
        } else {
          s2 = peg$c0;
        }
        if (s2 !== null) {
          peg$reportedPos = s0;
          s1 = peg$c153(s1);
          if (s1 === null) {
            peg$currPos = s0;
            s0 = s1;
          } else {
            s0 = s1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parsetagChar() {
      var s0;

      if (peg$c154.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c155); }
      }

      return s0;
    }

    function peg$parseknownEvent() {
      var s0, s1, s2;

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$parsetagString();
      if (s1 !== null) {
        peg$reportedPos = peg$currPos;
        s2 = peg$c157(s1);
        if (s2) {
          s2 = peg$c1;
        } else {
          s2 = peg$c0;
        }
        if (s2 !== null) {
          peg$reportedPos = s0;
          s1 = peg$c153(s1);
          if (s1 === null) {
            peg$currPos = s0;
            s0 = s1;
          } else {
            s0 = s1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      peg$silentFails--;
      if (s0 === null) {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c156); }
      }

      return s0;
    }

    function peg$parseindentation() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = peg$parseINDENT();
      if (s1 !== null) {
        s2 = peg$parse__();
        if (s2 !== null) {
          peg$reportedPos = s0;
          s1 = peg$c46(s2);
          if (s1 === null) {
            peg$currPos = s0;
            s0 = s1;
          } else {
            s0 = s1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseINDENT() {
      var s0, s1;

      peg$silentFails++;
      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 61423) {
        s1 = peg$c159;
        peg$currPos++;
      } else {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c160); }
      }
      if (s1 !== null) {
        peg$reportedPos = s0;
        s1 = peg$c161();
      }
      if (s1 === null) {
        peg$currPos = s0;
        s0 = s1;
      } else {
        s0 = s1;
      }
      peg$silentFails--;
      if (s0 === null) {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c158); }
      }

      return s0;
    }

    function peg$parseDEDENT() {
      var s0, s1;

      peg$silentFails++;
      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 61438) {
        s1 = peg$c163;
        peg$currPos++;
      } else {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c164); }
      }
      if (s1 !== null) {
        peg$reportedPos = s0;
        s1 = peg$c161();
      }
      if (s1 === null) {
        peg$currPos = s0;
        s0 = s1;
      } else {
        s0 = s1;
      }
      peg$silentFails--;
      if (s0 === null) {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c162); }
      }

      return s0;
    }

    function peg$parseUNMATCHED_DEDENT() {
      var s0, s1;

      peg$silentFails++;
      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 61422) {
        s1 = peg$c166;
        peg$currPos++;
      } else {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c167); }
      }
      if (s1 !== null) {
        peg$reportedPos = s0;
        s1 = peg$c161();
      }
      if (s1 === null) {
        peg$currPos = s0;
        s0 = s1;
      } else {
        s0 = s1;
      }
      peg$silentFails--;
      if (s0 === null) {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c165); }
      }

      return s0;
    }

    function peg$parseTERM() {
      var s0, s1, s2;

      peg$silentFails++;
      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 61439) {
        s1 = peg$c169;
        peg$currPos++;
      } else {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c170); }
      }
      if (s1 !== null) {
        if (input.charCodeAt(peg$currPos) === 10) {
          s2 = peg$c171;
          peg$currPos++;
        } else {
          s2 = null;
          if (peg$silentFails === 0) { peg$fail(peg$c172); }
        }
        if (s2 !== null) {
          s1 = [s1, s2];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      peg$silentFails--;
      if (s0 === null) {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c168); }
      }

      return s0;
    }

    function peg$parseanyDedent() {
      var s0, s1;

      peg$silentFails++;
      s0 = peg$parseDEDENT();
      if (s0 === null) {
        s0 = peg$parseUNMATCHED_DEDENT();
      }
      peg$silentFails--;
      if (s0 === null) {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c173); }
      }

      return s0;
    }

    function peg$parse__() {
      var s0, s1, s2;

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parsewhitespace();
      if (s2 !== null) {
        while (s2 !== null) {
          s1.push(s2);
          s2 = peg$parsewhitespace();
        }
      } else {
        s1 = peg$c0;
      }
      if (s1 !== null) {
        s1 = input.substring(s0, peg$currPos);
      }
      s0 = s1;
      peg$silentFails--;
      if (s0 === null) {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c174); }
      }

      return s0;
    }

    function peg$parse_() {
      var s0, s1;

      peg$silentFails++;
      s0 = [];
      s1 = peg$parsewhitespace();
      while (s1 !== null) {
        s0.push(s1);
        s1 = peg$parsewhitespace();
      }
      peg$silentFails--;
      if (s0 === null) {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c175); }
      }

      return s0;
    }

    function peg$parsewhitespace() {
      var s0, s1;

      peg$silentFails++;
      if (peg$c177.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c178); }
      }
      peg$silentFails--;
      if (s0 === null) {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c176); }
      }

      return s0;
    }

    function peg$parselineChar() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = peg$currPos;
      peg$silentFails++;
      s2 = peg$parseINDENT();
      if (s2 === null) {
        s2 = peg$parseDEDENT();
        if (s2 === null) {
          s2 = peg$parseTERM();
        }
      }
      peg$silentFails--;
      if (s2 === null) {
        s1 = peg$c1;
      } else {
        peg$currPos = s1;
        s1 = peg$c0;
      }
      if (s1 !== null) {
        if (input.length > peg$currPos) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = null;
          if (peg$silentFails === 0) { peg$fail(peg$c91); }
        }
        if (s2 !== null) {
          peg$reportedPos = s0;
          s1 = peg$c92(s2);
          if (s1 === null) {
            peg$currPos = s0;
            s0 = s1;
          } else {
            s0 = s1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parselineContent() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parselineChar();
      while (s2 !== null) {
        s1.push(s2);
        s2 = peg$parselineChar();
      }
      if (s1 !== null) {
        s1 = input.substring(s0, peg$currPos);
      }
      s0 = s1;

      return s0;
    }


      var handlebarsVariant = Emblem.handlebarsVariant;
      var IS_EMBER = handlebarsVariant.JavaScriptCompiler.prototype.namespace === "Ember.Handlebars";
      var AST = handlebarsVariant.AST;

      var SELF_CLOSING_TAG = {
        area: true,
        base: true,
        br: true,
        col: true,
        command: true,
        embed: true,
        hr: true,
        img: true,
        input: true,
        keygen: true,
        link: true,
        meta: true,
        param: true,
        source: true,
        track: true,
        wbr: true
      };

      var KNOWN_TAGS = { 
        figcaption: true, blockquote: true, plaintext: true, textarea: true, progress: true, 
        optgroup: true, noscript: true, noframes: true, frameset: true, fieldset: true, 
        datalist: true, colgroup: true, basefont: true, summary: true, section: true, 
        marquee: true, listing: true, isindex: true, details: true, command: true, 
        caption: true, bgsound: true, article: true, address: true, acronym: true, 
        strong: true, strike: true, spacer: true, source: true, select: true, 
        script: true, output: true, option: true, object: true, legend: true, 
        keygen: true, iframe: true, hgroup: true, header: true, footer: true, 
        figure: true, center: true, canvas: true, button: true, applet: true, video: true, 
        track: true, title: true, thead: true, tfoot: true, tbody: true, table: true, 
        style: true, small: true, param: true, meter: true, label: true, input: true, 
        frame: true, embed: true, blink: true, audio: true, aside: true, time: true, 
        span: true, samp: true, ruby: true, nobr: true, meta: true, menu: true, 
        mark: true, main: true, link: true, html: true, head: true, form: true, 
        font: true, data: true, code: true, cite: true, body: true, base: true, 
        area: true, abbr: true, xmp: true, wbr: true, var: true, sup: true, 
        sub: true, pre: true, nav: true, map: true, kbd: true, ins: true, 
        img: true, div: true, dir: true, dfn: true, del: true, col: true, 
        big: true, bdo: true, bdi: true, ul: true, tt: true, tr: true, th: true, td: true, 
        rt: true, rp: true, ol: true, li: true, hr: true, h6: true, h5: true, h4: true, 
        h3: true, h2: true, h1: true, em: true, dt: true, dl: true, dd: true, br: true, 
        u: true, s: true, q: true, p: true, i: true, b: true, a: true
      };

      var KNOWN_EVENTS = {
        "touchStart": true, "touchMove": true, "touchEnd": true, "touchCancel": true, 
        "keyDown": true, "keyUp": true, "keyPress": true, "mouseDown": true, "mouseUp": true, 
        "contextMenu": true, "click": true, "doubleClick": true, "mouseMove": true, 
        "focusIn": true, "focusOut": true, "mouseEnter": true, "mouseLeave": true, 
        "submit": true, "input": true, "change": true, "dragStart": true, 
        "drag": true, "dragEnter": true, "dragLeave": true, 
        "dragOver": true, "drop": true, "dragEnd": true
      };

      // Returns a new MustacheNode with a new preceding param (id).
      function unshiftParam(mustacheNode, helperName, newHashPairs) {

        var hash = mustacheNode.hash;

        // Merge hash.
        if(newHashPairs) {
          hash = hash || new AST.HashNode([]);

          for(var i = 0; i < newHashPairs.length; ++i) {
            hash.pairs.push(newHashPairs[i]);
          }
        }

        var params = [mustacheNode.id].concat(mustacheNode.params);
        params.unshift(new AST.IdNode([helperName]));
        return new AST.MustacheNode(params, hash, !mustacheNode.escaped);
      }

      function textNodesResult(first, tail) {
        var ret = [];
        if(first) { ret.push(first); } 
        for(var i = 0; i < tail.length; ++i) {
          var t = tail[i];
          ret.push(t[0]);
          if(t[1]) { ret.push(t[1]); }
        }
        return ret;
      }

      // Only for debugging use.
      function log(msg) {
        handlebarsVariant.log(9, msg);
      }


    peg$result = peg$startRuleFunction();

    if (peg$result !== null && peg$currPos === input.length) {
      return peg$result;
    } else {
      peg$cleanupExpected(peg$maxFailExpected);
      peg$reportedPos = Math.max(peg$currPos, peg$maxFailPos);

      throw new SyntaxError(
        peg$maxFailExpected,
        peg$reportedPos < input.length ? input.charAt(peg$reportedPos) : null,
        peg$reportedPos,
        peg$computePosDetails(peg$reportedPos).line,
        peg$computePosDetails(peg$reportedPos).column
      );
    }
  }

  return {
    SyntaxError: SyntaxError,
    parse      : parse
  };
})();


;
// lib/compiler.js
var Emblem;



Emblem.throwCompileError = function(line, msg) {
  throw new Error("Emblem syntax error, line " + line + ": " + msg);
};

Emblem.registerPartial = function(handlebarsVariant, partialName, text) {
  if (!text) {
    text = partialName;
    partialName = handlebarsVariant;
    handlebarsVariant = Handlebars;
  }
  return handlebarsVariant.registerPartial(partialName, Emblem.compile(handlebarsVariant, text));
};

Emblem.parse = function(string) {
  var line, lines, msg, processed;
  try {
    processed = Emblem.Preprocessor.processSync(string);
    return Emblem.Parser.parse(processed);
  } catch (e) {
    if (e instanceof Emblem.Parser.SyntaxError) {
      lines = string.split("\n");
      line = lines[e.line - 1];
      msg = "" + e.message + "\n" + line + "\n";
      msg += new Array(e.column).join("-");
      msg += "^";
      return Emblem.throwCompileError(e.line, msg);
    } else {
      throw e;
    }
  }
};

Emblem.precompile = function(handlebarsVariant, string, options) {
  var ast;
  if (options == null) {
    options = {};
  }
  Emblem.handlebarsVariant = handlebarsVariant;
  ast = Emblem.parse(string);
  return handlebarsVariant.precompile(ast, options);
};

Emblem.compile = function(handlebarsVariant, string, options) {
  var ast;
  if (options == null) {
    options = {};
  }
  Emblem.handlebarsVariant = handlebarsVariant;
  ast = Emblem.parse(string);
  return handlebarsVariant.compile(ast, options);
};
;
// lib/preprocessor.js
var Emblem, Preprocessor, StringScanner;





Emblem.Preprocessor = Preprocessor = (function() {
  var DEDENT, INDENT, TERM, UNMATCHED_DEDENT, anyWhitespaceAndNewlinesTouchingEOF, any_whitespaceFollowedByNewlines_, processInput, ws;

  ws = '\\t\\x0B\\f \\xA0\\u1680\\u180E\\u2000-\\u200A\\u202F\\u205F\\u3000\\uFEFF';

  INDENT = '\uEFEF';

  DEDENT = '\uEFFE';

  UNMATCHED_DEDENT = '\uEFEE';

  TERM = '\uEFFF';

  anyWhitespaceAndNewlinesTouchingEOF = RegExp("[" + ws + "\\n]*$");

  any_whitespaceFollowedByNewlines_ = RegExp("(?:[" + ws + "]*\\n)+");

  function Preprocessor() {
    this.base = null;
    this.indents = [];
    this.context = [];
    this.context.peek = function() {
      if (this.length) {
        return this[this.length - 1];
      } else {
        return null;
      }
    };
    this.context.err = function(c) {
      throw new Error("Unexpected " + c);
    };
    this.output = '';
    this.context.observe = function(c) {
      var top;
      top = this.peek();
      switch (c) {
        case INDENT:
          this.push(c);
          break;
        case DEDENT:
          if (top !== INDENT) {
            this.err(c);
          }
          this.pop();
          break;
        case '\n':
          if (top !== '/') {
            this.err(c);
          }
          this.pop();
          break;
        case '/':
          this.push(c);
          break;
        case 'end-\\':
          if (top !== '\\') {
            this.err(c);
          }
          this.pop();
          break;
        default:
          throw new Error("undefined token observed: " + c);
      }
      return this;
    };
    if (this.StringScanner) {
      this.ss = new this.StringScanner('');
    } else if (Emblem.StringScanner) {
      this.ss = new Emblem.StringScanner('');
    } else {
      this.ss = new StringScanner('');
    }
  }

  Preprocessor.prototype.p = function(s) {
    if (s) {
      this.output += s;
    }
    return s;
  };

  Preprocessor.prototype.scan = function(r) {
    return this.p(this.ss.scan(r));
  };

  Preprocessor.prototype.discard = function(r) {
    return this.ss.scan(r);
  };

  processInput = function(isEnd) {
    return function(data) {
      var b, d, indent, s;
      if (!isEnd) {
        this.ss.concat(data);
        this.discard(any_whitespaceFollowedByNewlines_);
      }
      while (!this.ss.eos()) {
        switch (this.context.peek()) {
          case null:
          case INDENT:
            if (this.ss.bol() || this.discard(any_whitespaceFollowedByNewlines_)) {
              if (this.discard(RegExp("[" + ws + "]*\\n"))) {
                this.p("" + TERM + "\n");
                continue;
              }
              if (this.base != null) {
                if ((this.discard(this.base)) == null) {
                  throw new Error("inconsistent base indentation");
                }
              } else {
                b = this.discard(RegExp("[" + ws + "]*"));
                this.base = RegExp("" + b);
              }
              if (this.indents.length === 0) {
                if (this.ss.check(RegExp("[" + ws + "]+"))) {
                  this.p(INDENT);
                  this.context.observe(INDENT);
                  this.indents.push(this.scan(RegExp("([" + ws + "]+)")));
                }
              } else {
                indent = this.indents[this.indents.length - 1];
                if (d = this.ss.check(RegExp("(" + indent + ")"))) {
                  this.discard(d);
                  if (this.ss.check(RegExp("([" + ws + "]+)"))) {
                    this.p(INDENT);
                    this.context.observe(INDENT);
                    this.indents.push(d + this.scan(RegExp("([" + ws + "]+)")));
                  }
                } else {
                  while (this.indents.length) {
                    indent = this.indents[this.indents.length - 1];
                    if (this.discard(RegExp("(?:" + indent + ")"))) {
                      break;
                    }
                    this.context.observe(DEDENT);
                    this.p(DEDENT);
                    this.indents.pop();
                  }
                  if (s = this.discard(RegExp("[" + ws + "]+"))) {
                    this.output = this.output.slice(0, -1);
                    this.output += UNMATCHED_DEDENT;
                    this.p(INDENT);
                    this.context.observe(INDENT);
                    this.indents.push(s);
                  }
                }
              }
            }
            this.scan(/[^\n\\]+/);
            if (this.discard(/\n/)) {
              this.p("" + TERM + "\n");
            }
        }
      }
      if (isEnd) {
        this.scan(anyWhitespaceAndNewlinesTouchingEOF);
        while (this.context.length && INDENT === this.context.peek()) {
          this.context.observe(DEDENT);
          this.p(DEDENT);
        }
        if (this.context.length) {
          throw new Error('Unclosed ' + (this.context.peek()) + ' at EOF');
        }
      }
    };
  };

  Preprocessor.prototype.processData = processInput(false);

  Preprocessor.prototype.processEnd = processInput(true);

  Preprocessor.processSync = function(input) {
    var pre;
    input += "\n";
    pre = new Preprocessor;
    pre.processData(input);
    pre.processEnd();
    return pre.output;
  };

  return Preprocessor;

})();
;
// lib/emberties.js
var ENV, Emblem, _base;



Emblem.compileScriptTags = function() {
  if (typeof Ember === "undefined" || Ember === null) {
    throw new Error("Can't run Emblem.enableEmber before Ember has been defined");
  }
  if (typeof document !== "undefined" && document !== null) {
    return Ember.$('script[type="text/x-emblem"], script[type="text/x-raw-emblem"]', Ember.$(document)).each(function() {
      var handlebarsVariant, script, templateName;
      script = Ember.$(this);
      handlebarsVariant = script.attr('type') === 'text/x-raw-handlebars' ? Handlebars : Ember.Handlebars;
      templateName = script.attr('data-template-name') || script.attr('id') || 'application';
      Ember.TEMPLATES[templateName] = Emblem.compile(handlebarsVariant, script.html());
      return script.remove();
    });
  }
};

this.ENV || (this.ENV = {});

ENV = this.ENV;

ENV.EMBER_LOAD_HOOKS || (ENV.EMBER_LOAD_HOOKS = {});

(_base = ENV.EMBER_LOAD_HOOKS).application || (_base.application = []);

ENV.EMBER_LOAD_HOOKS.application.push(function() {
  return Emblem.compileScriptTags();
});
;

    root.Emblem = Emblem;

  }(this));
