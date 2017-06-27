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

Emblem.VERSION = "0.0.3";










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
        peg$c8 = ">",
        peg$c9 = "\">\"",
        peg$c10 = function(n, p) { return new AST.PartialNode(n, p); },
        peg$c11 = /^[a-zA-Z0-9_$-\/]/,
        peg$c12 = "[a-zA-Z0-9_$-\\/]",
        peg$c13 = function(s) { return new AST.PartialNameNode(s); },
        peg$c14 = function(m) { 
          return [m]; 
        },
        peg$c15 = "/",
        peg$c16 = "\"/\"",
        peg$c17 = function() { return []; },
        peg$c18 = /^[A-Z]/,
        peg$c19 = "[A-Z]",
        peg$c20 = function(ret) {
          // TODO make this configurable
          var defaultCapitalizedHelper = 'view';

          if(ret.mustache) {
            // Block. Modify inner MustacheNode and return.

            // Make sure a suffix modifier hasn't already been applied.
            var ch = ret.mustache.id.string.charAt(0);
            if(!ch.match(/[A-Z]/)) return ret;

            ret.mustache = unshiftParam(ret.mustache, defaultCapitalizedHelper);
            return ret;
          } else {

            // Make sure a suffix modifier hasn't already been applied.
            var ch = ret.id.string.charAt(0);
            if(!ch.match(/[A-Z]/)) return ret;

            return unshiftParam(ret, defaultCapitalizedHelper);
          }
        },
        peg$c21 = function(h, c) { 
          var ret = h[0];
          if(c) {
            ret = ret.concat(c[1]);
          }

          // Push the closing tag ContentNode if it exists (self-closing if not)
          if(h[1]) {
            ret.push(h[1]);
          }

          return ret;
        },
        peg$c22 = " ",
        peg$c23 = "\" \"",
        peg$c24 = function(h, c, multilineContent) { 
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
              ret = ret.concat(multilineContent[i]);
            }
          }

          // Push the closing tag ContentNode if it exists (self-closing if not)
          if(h[1]) {
            ret.push(h[1]);
          }

          return ret;
        },
        peg$c25 = function(mustacheNode, block) { 
          if(!block) return mustacheNode;
          var programNode = block[1];
          return new AST.BlockNode(mustacheNode, programNode, programNode.inverse, mustacheNode.id);
        },
        peg$c26 = function(e, ret) {
          var mustache = ret.mustache || ret;
          mustache.escaped = e;
          return ret;
        },
        peg$c27 = function(path, tm, params, hash) { 
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

          if(tm == '!') {
            return unshiftParam(mustacheNode, 'unbound');
          } else if(tm == '?') {
            return unshiftParam(mustacheNode, 'if');
          } else if(tm == '^') {
            return unshiftParam(mustacheNode, 'unless');
          }

          return mustacheNode;
        },
        peg$c28 = function(p, m) { 
          var ret = new String(p);
          ret.trailingModifier = m;
          return ret;
        },
        peg$c29 = function(t) { return ['tagName', t]; },
        peg$c30 = function(i) { return ['elementId', i]; },
        peg$c31 = function(c) { return ['class', c]; },
        peg$c32 = function(id, classes) { return [id, classes]; },
        peg$c33 = function(classes) { return [null, classes]; },
        peg$c34 = function(h) { return h; },
        peg$c35 = "TrailingModifier",
        peg$c36 = /^[!?*\^]/,
        peg$c37 = "[!?*\\^]",
        peg$c38 = function(h) { return new AST.HashNode(h); },
        peg$c39 = "PathIdent",
        peg$c40 = "..",
        peg$c41 = "\"..\"",
        peg$c42 = ".",
        peg$c43 = "\".\"",
        peg$c44 = /^[a-zA-Z0-9_$\-]/,
        peg$c45 = "[a-zA-Z0-9_$\\-]",
        peg$c46 = "=",
        peg$c47 = "\"=\"",
        peg$c48 = function(s) { return s; },
        peg$c49 = "Key",
        peg$c50 = function(h) { return [h[0], h[2]]; },
        peg$c51 = function(p) { return p; },
        peg$c52 = function(first, tail) {
          var ret = [first];
          for(var i = 0; i < tail.length; ++i) {
            //ret = ret.concat(tail[i]);
            ret.push(tail[i]);
          }
          return ret;
        },
        peg$c53 = "PathSeparator",
        peg$c54 = /^[\/.]/,
        peg$c55 = "[\\/.]",
        peg$c56 = function(v) { return new AST.IdNode(v); },
        peg$c57 = function(v) { return new AST.StringNode(v); },
        peg$c58 = function(v) { return new AST.IntegerNode(v); },
        peg$c59 = function(v) { return new AST.BooleanNode(v); },
        peg$c60 = "Boolean",
        peg$c61 = "true",
        peg$c62 = "\"true\"",
        peg$c63 = "false",
        peg$c64 = "\"false\"",
        peg$c65 = "Integer",
        peg$c66 = /^[0-9]/,
        peg$c67 = "[0-9]",
        peg$c68 = function(s) { return parseInt(s); },
        peg$c69 = "\"",
        peg$c70 = "\"\\\"\"",
        peg$c71 = "'",
        peg$c72 = "\"'\"",
        peg$c73 = function(p) { return p[1]; },
        peg$c74 = /^[^"}]/,
        peg$c75 = "[^\"}]",
        peg$c76 = /^[^'}]/,
        peg$c77 = "[^'}]",
        peg$c78 = /^[A-Za-z]/,
        peg$c79 = "[A-Za-z]",
        peg$c80 = function(m) { return [m]; },
        peg$c81 = "|",
        peg$c82 = "\"|\"",
        peg$c83 = "<",
        peg$c84 = "\"<\"",
        peg$c85 = function(nodes, indentedNodes) { 
          if(indentedNodes) {
            indentedNodes = indentedNodes[1];
            for(var i = 0; i < indentedNodes.length; ++i) {
              nodes = nodes.concat(indentedNodes[i]);
            }
          }
          return nodes; 
        },
        peg$c86 = function(first, tail) {
          var ret = [];
          if(first) { ret.push(first); } 
          for(var i = 0; i < tail.length; ++i) {
            var t = tail[i];
            ret.push(t[0]);
            if(t[1]) { ret.push(t[1]); }
          }
          return ret;
        },
        peg$c87 = function(m) { m.escaped = true; return m; },
        peg$c88 = function(m) { m.escaped = false; return m; },
        peg$c89 = function(a) { return new AST.ContentNode(a.join('')); },
        peg$c90 = "any character",
        peg$c91 = function(c) { return c; },
        peg$c92 = "SingleMustacheOpen",
        peg$c93 = "{",
        peg$c94 = "\"{\"",
        peg$c95 = "DoubleMustacheOpen",
        peg$c96 = "{{",
        peg$c97 = "\"{{\"",
        peg$c98 = "TripleMustacheOpen",
        peg$c99 = "{{{",
        peg$c100 = "\"{{{\"",
        peg$c101 = "SingleMustacheClose",
        peg$c102 = "}",
        peg$c103 = "\"}\"",
        peg$c104 = "DoubleMustacheClose",
        peg$c105 = "}}",
        peg$c106 = "\"}}\"",
        peg$c107 = "TripleMustacheClose",
        peg$c108 = "}}}",
        peg$c109 = "\"}}}\"",
        peg$c110 = "InterpolationOpen",
        peg$c111 = "#{",
        peg$c112 = "\"#{\"",
        peg$c113 = "InterpolationClose",
        peg$c114 = "==",
        peg$c115 = "\"==\"",
        peg$c116 = function() { return false; },
        peg$c117 = function() { return true; },
        peg$c118 = function(h, s, m, f) { return [h, s, m, f]; },
        peg$c119 = function(s, m, f) { return [null, s, m, f] },
        peg$c120 = function(h) {
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
        peg$c121 = function(a) {
          return [new AST.ContentNode(' '), a]; 
        },
        peg$c122 = /^[A-Za-z.:0-9]/,
        peg$c123 = "[A-Za-z.:0-9]",
        peg$c124 = function(id) { return new AST.MustacheNode([id]); },
        peg$c125 = function(event, mustacheNode) {
          // Unshift the action helper and augment the hash
          return unshiftParam(mustacheNode, 'action', [['on', new AST.StringNode(event)]]);
        },
        peg$c126 = function(key, value) { 
          var hashNode = new AST.HashNode([[key, new AST.StringNode(value)]]);
          var params = [new AST.IdNode(['bindAttr'])];

          return new AST.MustacheNode(params, hashNode);
        },
        peg$c127 = function(key, value) { 
          var s = key + '=' + '"' + value + '"';
          return new AST.ContentNode(s);
        },
        peg$c128 = "_",
        peg$c129 = "\"_\"",
        peg$c130 = "-",
        peg$c131 = "\"-\"",
        peg$c132 = "%",
        peg$c133 = "\"%\"",
        peg$c134 = "#",
        peg$c135 = "\"#\"",
        peg$c136 = function(c) { return c;},
        peg$c137 = "CSSIdentifier",
        peg$c138 = function(nmstart, nmchars) { return nmstart + nmchars; },
        peg$c139 = /^[_a-zA-Z0-9\-]/,
        peg$c140 = "[_a-zA-Z0-9\\-]",
        peg$c141 = /^[_a-zA-Z]/,
        peg$c142 = "[_a-zA-Z]",
        peg$c143 = /^[\x80-\xFF]/,
        peg$c144 = "[\\x80-\\xFF]",
        peg$c145 = "KnownHTMLTagName",
        peg$c146 = /^[:_a-zA-Z0-9\-]/,
        peg$c147 = "[:_a-zA-Z0-9\\-]",
        peg$c148 = "figcaption",
        peg$c149 = "\"figcaption\"",
        peg$c150 = "blockquote",
        peg$c151 = "\"blockquote\"",
        peg$c152 = "plaintext",
        peg$c153 = "\"plaintext\"",
        peg$c154 = "textarea",
        peg$c155 = "\"textarea\"",
        peg$c156 = "progress",
        peg$c157 = "\"progress\"",
        peg$c158 = "optgroup",
        peg$c159 = "\"optgroup\"",
        peg$c160 = "noscript",
        peg$c161 = "\"noscript\"",
        peg$c162 = "noframes",
        peg$c163 = "\"noframes\"",
        peg$c164 = "frameset",
        peg$c165 = "\"frameset\"",
        peg$c166 = "fieldset",
        peg$c167 = "\"fieldset\"",
        peg$c168 = "datalist",
        peg$c169 = "\"datalist\"",
        peg$c170 = "colgroup",
        peg$c171 = "\"colgroup\"",
        peg$c172 = "basefont",
        peg$c173 = "\"basefont\"",
        peg$c174 = "summary",
        peg$c175 = "\"summary\"",
        peg$c176 = "section",
        peg$c177 = "\"section\"",
        peg$c178 = "marquee",
        peg$c179 = "\"marquee\"",
        peg$c180 = "listing",
        peg$c181 = "\"listing\"",
        peg$c182 = "isindex",
        peg$c183 = "\"isindex\"",
        peg$c184 = "details",
        peg$c185 = "\"details\"",
        peg$c186 = "command",
        peg$c187 = "\"command\"",
        peg$c188 = "caption",
        peg$c189 = "\"caption\"",
        peg$c190 = "bgsound",
        peg$c191 = "\"bgsound\"",
        peg$c192 = "article",
        peg$c193 = "\"article\"",
        peg$c194 = "address",
        peg$c195 = "\"address\"",
        peg$c196 = "acronym",
        peg$c197 = "\"acronym\"",
        peg$c198 = "strong",
        peg$c199 = "\"strong\"",
        peg$c200 = "strike",
        peg$c201 = "\"strike\"",
        peg$c202 = "spacer",
        peg$c203 = "\"spacer\"",
        peg$c204 = "source",
        peg$c205 = "\"source\"",
        peg$c206 = "select",
        peg$c207 = "\"select\"",
        peg$c208 = "script",
        peg$c209 = "\"script\"",
        peg$c210 = "output",
        peg$c211 = "\"output\"",
        peg$c212 = "option",
        peg$c213 = "\"option\"",
        peg$c214 = "object",
        peg$c215 = "\"object\"",
        peg$c216 = "legend",
        peg$c217 = "\"legend\"",
        peg$c218 = "keygen",
        peg$c219 = "\"keygen\"",
        peg$c220 = "iframe",
        peg$c221 = "\"iframe\"",
        peg$c222 = "hgroup",
        peg$c223 = "\"hgroup\"",
        peg$c224 = "header",
        peg$c225 = "\"header\"",
        peg$c226 = "footer",
        peg$c227 = "\"footer\"",
        peg$c228 = "figure",
        peg$c229 = "\"figure\"",
        peg$c230 = "center",
        peg$c231 = "\"center\"",
        peg$c232 = "canvas",
        peg$c233 = "\"canvas\"",
        peg$c234 = "button",
        peg$c235 = "\"button\"",
        peg$c236 = "applet",
        peg$c237 = "\"applet\"",
        peg$c238 = "video",
        peg$c239 = "\"video\"",
        peg$c240 = "track",
        peg$c241 = "\"track\"",
        peg$c242 = "title",
        peg$c243 = "\"title\"",
        peg$c244 = "thead",
        peg$c245 = "\"thead\"",
        peg$c246 = "tfoot",
        peg$c247 = "\"tfoot\"",
        peg$c248 = "tbody",
        peg$c249 = "\"tbody\"",
        peg$c250 = "table",
        peg$c251 = "\"table\"",
        peg$c252 = "style",
        peg$c253 = "\"style\"",
        peg$c254 = "small",
        peg$c255 = "\"small\"",
        peg$c256 = "param",
        peg$c257 = "\"param\"",
        peg$c258 = "meter",
        peg$c259 = "\"meter\"",
        peg$c260 = "label",
        peg$c261 = "\"label\"",
        peg$c262 = "input",
        peg$c263 = "\"input\"",
        peg$c264 = "frame",
        peg$c265 = "\"frame\"",
        peg$c266 = "embed",
        peg$c267 = "\"embed\"",
        peg$c268 = "blink",
        peg$c269 = "\"blink\"",
        peg$c270 = "audio",
        peg$c271 = "\"audio\"",
        peg$c272 = "aside",
        peg$c273 = "\"aside\"",
        peg$c274 = "time",
        peg$c275 = "\"time\"",
        peg$c276 = "span",
        peg$c277 = "\"span\"",
        peg$c278 = "samp",
        peg$c279 = "\"samp\"",
        peg$c280 = "ruby",
        peg$c281 = "\"ruby\"",
        peg$c282 = "nobr",
        peg$c283 = "\"nobr\"",
        peg$c284 = "meta",
        peg$c285 = "\"meta\"",
        peg$c286 = "menu",
        peg$c287 = "\"menu\"",
        peg$c288 = "mark",
        peg$c289 = "\"mark\"",
        peg$c290 = "main",
        peg$c291 = "\"main\"",
        peg$c292 = "link",
        peg$c293 = "\"link\"",
        peg$c294 = "html",
        peg$c295 = "\"html\"",
        peg$c296 = "head",
        peg$c297 = "\"head\"",
        peg$c298 = "form",
        peg$c299 = "\"form\"",
        peg$c300 = "font",
        peg$c301 = "\"font\"",
        peg$c302 = "data",
        peg$c303 = "\"data\"",
        peg$c304 = "code",
        peg$c305 = "\"code\"",
        peg$c306 = "cite",
        peg$c307 = "\"cite\"",
        peg$c308 = "body",
        peg$c309 = "\"body\"",
        peg$c310 = "base",
        peg$c311 = "\"base\"",
        peg$c312 = "area",
        peg$c313 = "\"area\"",
        peg$c314 = "abbr",
        peg$c315 = "\"abbr\"",
        peg$c316 = "xmp",
        peg$c317 = "\"xmp\"",
        peg$c318 = "wbr",
        peg$c319 = "\"wbr\"",
        peg$c320 = "var",
        peg$c321 = "\"var\"",
        peg$c322 = "sup",
        peg$c323 = "\"sup\"",
        peg$c324 = "sub",
        peg$c325 = "\"sub\"",
        peg$c326 = "pre",
        peg$c327 = "\"pre\"",
        peg$c328 = "nav",
        peg$c329 = "\"nav\"",
        peg$c330 = "map",
        peg$c331 = "\"map\"",
        peg$c332 = "kbd",
        peg$c333 = "\"kbd\"",
        peg$c334 = "ins",
        peg$c335 = "\"ins\"",
        peg$c336 = "img",
        peg$c337 = "\"img\"",
        peg$c338 = "div",
        peg$c339 = "\"div\"",
        peg$c340 = "dir",
        peg$c341 = "\"dir\"",
        peg$c342 = "dfn",
        peg$c343 = "\"dfn\"",
        peg$c344 = "del",
        peg$c345 = "\"del\"",
        peg$c346 = "col",
        peg$c347 = "\"col\"",
        peg$c348 = "big",
        peg$c349 = "\"big\"",
        peg$c350 = "bdo",
        peg$c351 = "\"bdo\"",
        peg$c352 = "bdi",
        peg$c353 = "\"bdi\"",
        peg$c354 = "ul",
        peg$c355 = "\"ul\"",
        peg$c356 = "tt",
        peg$c357 = "\"tt\"",
        peg$c358 = "tr",
        peg$c359 = "\"tr\"",
        peg$c360 = "th",
        peg$c361 = "\"th\"",
        peg$c362 = "td",
        peg$c363 = "\"td\"",
        peg$c364 = "rt",
        peg$c365 = "\"rt\"",
        peg$c366 = "rp",
        peg$c367 = "\"rp\"",
        peg$c368 = "ol",
        peg$c369 = "\"ol\"",
        peg$c370 = "li",
        peg$c371 = "\"li\"",
        peg$c372 = "hr",
        peg$c373 = "\"hr\"",
        peg$c374 = "h6",
        peg$c375 = "\"h6\"",
        peg$c376 = "h5",
        peg$c377 = "\"h5\"",
        peg$c378 = "h4",
        peg$c379 = "\"h4\"",
        peg$c380 = "h3",
        peg$c381 = "\"h3\"",
        peg$c382 = "h2",
        peg$c383 = "\"h2\"",
        peg$c384 = "h1",
        peg$c385 = "\"h1\"",
        peg$c386 = "em",
        peg$c387 = "\"em\"",
        peg$c388 = "dt",
        peg$c389 = "\"dt\"",
        peg$c390 = "dl",
        peg$c391 = "\"dl\"",
        peg$c392 = "dd",
        peg$c393 = "\"dd\"",
        peg$c394 = "br",
        peg$c395 = "\"br\"",
        peg$c396 = "u",
        peg$c397 = "\"u\"",
        peg$c398 = "s",
        peg$c399 = "\"s\"",
        peg$c400 = "q",
        peg$c401 = "\"q\"",
        peg$c402 = "p",
        peg$c403 = "\"p\"",
        peg$c404 = "i",
        peg$c405 = "\"i\"",
        peg$c406 = "b",
        peg$c407 = "\"b\"",
        peg$c408 = "a",
        peg$c409 = "\"a\"",
        peg$c410 = "a JS event",
        peg$c411 = "touchStart",
        peg$c412 = "\"touchStart\"",
        peg$c413 = "touchMove",
        peg$c414 = "\"touchMove\"",
        peg$c415 = "touchEnd",
        peg$c416 = "\"touchEnd\"",
        peg$c417 = "touchCancel",
        peg$c418 = "\"touchCancel\"",
        peg$c419 = "keyDown",
        peg$c420 = "\"keyDown\"",
        peg$c421 = "keyUp",
        peg$c422 = "\"keyUp\"",
        peg$c423 = "keyPress",
        peg$c424 = "\"keyPress\"",
        peg$c425 = "mouseDown",
        peg$c426 = "\"mouseDown\"",
        peg$c427 = "mouseUp",
        peg$c428 = "\"mouseUp\"",
        peg$c429 = "contextMenu",
        peg$c430 = "\"contextMenu\"",
        peg$c431 = "click",
        peg$c432 = "\"click\"",
        peg$c433 = "doubleClick",
        peg$c434 = "\"doubleClick\"",
        peg$c435 = "mouseMove",
        peg$c436 = "\"mouseMove\"",
        peg$c437 = "focusIn",
        peg$c438 = "\"focusIn\"",
        peg$c439 = "focusOut",
        peg$c440 = "\"focusOut\"",
        peg$c441 = "mouseEnter",
        peg$c442 = "\"mouseEnter\"",
        peg$c443 = "mouseLeave",
        peg$c444 = "\"mouseLeave\"",
        peg$c445 = "submit",
        peg$c446 = "\"submit\"",
        peg$c447 = "change",
        peg$c448 = "\"change\"",
        peg$c449 = "dragStart",
        peg$c450 = "\"dragStart\"",
        peg$c451 = "drag",
        peg$c452 = "\"drag\"",
        peg$c453 = "dragEnter",
        peg$c454 = "\"dragEnter\"",
        peg$c455 = "dragLeave",
        peg$c456 = "\"dragLeave\"",
        peg$c457 = "dragOver",
        peg$c458 = "\"dragOver\"",
        peg$c459 = "drop",
        peg$c460 = "\"drop\"",
        peg$c461 = "dragEnd",
        peg$c462 = "\"dragEnd\"",
        peg$c463 = "INDENT",
        peg$c464 = "\uEFEF",
        peg$c465 = "\"\\uEFEF\"",
        peg$c466 = function() { return ''; },
        peg$c467 = "DEDENT",
        peg$c468 = "\uEFFE",
        peg$c469 = "\"\\uEFFE\"",
        peg$c470 = "LineEnd",
        peg$c471 = "\n",
        peg$c472 = "\"\\n\"",
        peg$c473 = "\uEFFF",
        peg$c474 = "\"\\uEFFF\"",
        peg$c475 = "RequiredWhitespace",
        peg$c476 = "OptionalWhitespace",
        peg$c477 = "InlineWhitespace",
        peg$c478 = /^[ \t]/,
        peg$c479 = "[ \\t]",

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
                s7 = peg$parseINDENT();
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
      var s0;

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

      return s0;
    }

    function peg$parselegacyPartialInvocation() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 62) {
        s1 = peg$c8;
        peg$currPos++;
      } else {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c9); }
      }
      if (s1 !== null) {
        s2 = peg$parse_();
        if (s2 !== null) {
          s3 = peg$parselegacyPartialName();
          if (s3 !== null) {
            s4 = peg$parse_();
            if (s4 !== null) {
              s5 = peg$parsepath();
              if (s5 === null) {
                s5 = peg$c1;
              }
              if (s5 !== null) {
                s6 = peg$parse_();
                if (s6 !== null) {
                  s7 = peg$parseTERM();
                  if (s7 !== null) {
                    peg$reportedPos = s0;
                    s1 = peg$c10(s3,s5);
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
      if (peg$c11.test(input.charAt(peg$currPos))) {
        s3 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s3 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c12); }
      }
      if (s3 !== null) {
        while (s3 !== null) {
          s2.push(s3);
          if (peg$c11.test(input.charAt(peg$currPos))) {
            s3 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s3 = null;
            if (peg$silentFails === 0) { peg$fail(peg$c12); }
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
        s1 = peg$c13(s1);
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
        s1 = peg$c14(s1);
      }
      if (s1 === null) {
        peg$currPos = s0;
        s0 = s1;
      } else {
        s0 = s1;
      }

      return s0;
    }

    function peg$parsecomment() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 47) {
        s1 = peg$c15;
        peg$currPos++;
      } else {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c16); }
      }
      if (s1 !== null) {
        s2 = peg$parselineContent();
        if (s2 !== null) {
          s3 = peg$parseTERM();
          if (s3 !== null) {
            s4 = peg$currPos;
            s5 = peg$parseINDENT();
            if (s5 !== null) {
              s6 = [];
              s7 = peg$currPos;
              s8 = peg$parselineContent();
              if (s8 !== null) {
                s9 = peg$parseTERM();
                if (s9 !== null) {
                  s8 = [s8, s9];
                  s7 = s8;
                } else {
                  peg$currPos = s7;
                  s7 = peg$c0;
                }
              } else {
                peg$currPos = s7;
                s7 = peg$c0;
              }
              if (s7 !== null) {
                while (s7 !== null) {
                  s6.push(s7);
                  s7 = peg$currPos;
                  s8 = peg$parselineContent();
                  if (s8 !== null) {
                    s9 = peg$parseTERM();
                    if (s9 !== null) {
                      s8 = [s8, s9];
                      s7 = s8;
                    } else {
                      peg$currPos = s7;
                      s7 = peg$c0;
                    }
                  } else {
                    peg$currPos = s7;
                    s7 = peg$c0;
                  }
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
              s1 = peg$c17();
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
      if (peg$c18.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c19); }
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
          s1 = peg$c20(s2);
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
      var s0, s1, s2, s3, s4, s5, s6, s7;

      s0 = peg$currPos;
      s1 = peg$parsehtmlTagAndOptionalAttributes();
      if (s1 !== null) {
        s2 = peg$parse_();
        if (s2 !== null) {
          s3 = peg$parseTERM();
          if (s3 !== null) {
            s4 = peg$currPos;
            s5 = peg$parseINDENT();
            if (s5 !== null) {
              s6 = peg$parsecontent();
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
              s1 = peg$c21(s1,s4);
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
          s2 = peg$c22;
          peg$currPos++;
        } else {
          s2 = null;
          if (peg$silentFails === 0) { peg$fail(peg$c23); }
        }
        if (s2 !== null) {
          s3 = peg$parsehtmlInlineContent();
          if (s3 !== null) {
            s4 = peg$currPos;
            s5 = peg$parseINDENT();
            if (s5 !== null) {
              s6 = [];
              s7 = peg$parsetextNodes();
              if (s7 !== null) {
                while (s7 !== null) {
                  s6.push(s7);
                  s7 = peg$parsetextNodes();
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
              s1 = peg$c24(s1,s3,s4);
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
      var s0, s1, s2, s3, s4, s5, s6, s7;

      s0 = peg$currPos;
      s1 = peg$parseinMustache();
      if (s1 !== null) {
        s2 = peg$parse_();
        if (s2 !== null) {
          s3 = peg$parseTERM();
          if (s3 !== null) {
            s4 = peg$currPos;
            s5 = peg$parseINDENT();
            if (s5 !== null) {
              s6 = peg$parseinvertibleContent();
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
              s1 = peg$c25(s1,s4);
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

    function peg$parseexplicitMustache() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = peg$parseequalSign();
      if (s1 !== null) {
        s2 = peg$parsemustacheMaybeBlock();
        if (s2 !== null) {
          peg$reportedPos = s0;
          s1 = peg$c26(s1,s2);
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
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$parsepathIdNode();
      if (s1 !== null) {
        s2 = peg$parsetrailingModifier();
        if (s2 === null) {
          s2 = peg$c1;
        }
        if (s2 !== null) {
          s3 = [];
          s4 = peg$parseinMustacheParam();
          while (s4 !== null) {
            s3.push(s4);
            s4 = peg$parseinMustacheParam();
          }
          if (s3 !== null) {
            s4 = peg$parsehash();
            if (s4 === null) {
              s4 = peg$c1;
            }
            if (s4 !== null) {
              peg$reportedPos = s0;
              s1 = peg$c27(s1,s2,s3,s4);
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

    function peg$parsemodifiedParam() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = peg$parseparam();
      if (s1 !== null) {
        s2 = peg$parsetrailingModifier();
        if (s2 !== null) {
          peg$reportedPos = s0;
          s1 = peg$c28(s1,s2);
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

    function peg$parsehtmlMustacheAttribute() {
      var s0, s1;

      s0 = peg$currPos;
      s1 = peg$parsetagNameShorthand();
      if (s1 !== null) {
        peg$reportedPos = s0;
        s1 = peg$c29(s1);
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
          s1 = peg$c30(s1);
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
            s1 = peg$c31(s1);
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
          s1 = peg$c32(s1,s2);
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
        s1 = peg$c33(s1);
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
          s1 = peg$c34(s2);
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

    function peg$parsetrailingModifier() {
      var s0, s1;

      peg$silentFails++;
      if (peg$c36.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c37); }
      }
      peg$silentFails--;
      if (s0 === null) {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c35); }
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
              s3 = peg$c46;
              peg$currPos++;
            } else {
              s3 = null;
              if (peg$silentFails === 0) { peg$fail(peg$c47); }
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
              s1 = peg$c48(s1);
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
        if (peg$silentFails === 0) { peg$fail(peg$c49); }
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
            s4 = peg$c46;
            peg$currPos++;
          } else {
            s4 = null;
            if (peg$silentFails === 0) { peg$fail(peg$c47); }
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
              s4 = peg$c46;
              peg$currPos++;
            } else {
              s4 = null;
              if (peg$silentFails === 0) { peg$fail(peg$c47); }
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
                s4 = peg$c46;
                peg$currPos++;
              } else {
                s4 = null;
                if (peg$silentFails === 0) { peg$fail(peg$c47); }
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
                  s4 = peg$c46;
                  peg$currPos++;
                } else {
                  s4 = null;
                  if (peg$silentFails === 0) { peg$fail(peg$c47); }
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
          s1 = peg$c50(s2);
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
            s4 = peg$c51(s5);
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
              s4 = peg$c51(s5);
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
          s1 = peg$c52(s1,s2);
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
      if (peg$c54.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c55); }
      }
      peg$silentFails--;
      if (s0 === null) {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c53); }
      }

      return s0;
    }

    function peg$parsepathIdNode() {
      var s0, s1;

      s0 = peg$currPos;
      s1 = peg$parsepath();
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

    function peg$parsestringNode() {
      var s0, s1;

      s0 = peg$currPos;
      s1 = peg$parsestring();
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

    function peg$parseintegerNode() {
      var s0, s1;

      s0 = peg$currPos;
      s1 = peg$parseinteger();
      if (s1 !== null) {
        peg$reportedPos = s0;
        s1 = peg$c58(s1);
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
        s1 = peg$c59(s1);
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
      if (input.substr(peg$currPos, 4) === peg$c61) {
        s0 = peg$c61;
        peg$currPos += 4;
      } else {
        s0 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c62); }
      }
      if (s0 === null) {
        if (input.substr(peg$currPos, 5) === peg$c63) {
          s0 = peg$c63;
          peg$currPos += 5;
        } else {
          s0 = null;
          if (peg$silentFails === 0) { peg$fail(peg$c64); }
        }
      }
      peg$silentFails--;
      if (s0 === null) {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c60); }
      }

      return s0;
    }

    function peg$parseinteger() {
      var s0, s1, s2, s3;

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$currPos;
      s2 = [];
      if (peg$c66.test(input.charAt(peg$currPos))) {
        s3 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s3 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c67); }
      }
      if (s3 !== null) {
        while (s3 !== null) {
          s2.push(s3);
          if (peg$c66.test(input.charAt(peg$currPos))) {
            s3 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s3 = null;
            if (peg$silentFails === 0) { peg$fail(peg$c67); }
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
        s1 = peg$c68(s1);
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
        if (peg$silentFails === 0) { peg$fail(peg$c65); }
      }

      return s0;
    }

    function peg$parsestring() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 34) {
        s2 = peg$c69;
        peg$currPos++;
      } else {
        s2 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c70); }
      }
      if (s2 !== null) {
        s3 = peg$parsehashDoubleQuoteStringValue();
        if (s3 !== null) {
          if (input.charCodeAt(peg$currPos) === 34) {
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
      if (s1 === null) {
        s1 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 39) {
          s2 = peg$c71;
          peg$currPos++;
        } else {
          s2 = null;
          if (peg$silentFails === 0) { peg$fail(peg$c72); }
        }
        if (s2 !== null) {
          s3 = peg$parsehashSingleQuoteStringValue();
          if (s3 !== null) {
            if (input.charCodeAt(peg$currPos) === 39) {
              s4 = peg$c71;
              peg$currPos++;
            } else {
              s4 = null;
              if (peg$silentFails === 0) { peg$fail(peg$c72); }
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
        s1 = peg$c73(s1);
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
        if (peg$c76.test(input.charAt(peg$currPos))) {
          s4 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s4 = null;
          if (peg$silentFails === 0) { peg$fail(peg$c77); }
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
          if (peg$c76.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = null;
            if (peg$silentFails === 0) { peg$fail(peg$c77); }
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

      if (peg$c78.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c79); }
      }

      return s0;
    }

    function peg$parsehtmlInlineContent() {
      var s0, s1;

      s0 = peg$currPos;
      s1 = peg$parseexplicitMustache();
      if (s1 !== null) {
        peg$reportedPos = s0;
        s1 = peg$c80(s1);
      }
      if (s1 === null) {
        peg$currPos = s0;
        s0 = s1;
      } else {
        s0 = s1;
      }
      if (s0 === null) {
        s0 = peg$parsetextNodes();
      }

      return s0;
    }

    function peg$parsetextLine() {
      var s0, s1, s2, s3, s4, s5, s6;

      s0 = peg$currPos;
      s1 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 124) {
        s2 = peg$c81;
        peg$currPos++;
      } else {
        s2 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c82); }
      }
      if (s2 !== null) {
        if (input.charCodeAt(peg$currPos) === 32) {
          s3 = peg$c22;
          peg$currPos++;
        } else {
          s3 = null;
          if (peg$silentFails === 0) { peg$fail(peg$c23); }
        }
        if (s3 === null) {
          s3 = peg$c1;
        }
        if (s3 !== null) {
          s2 = [s2, s3];
          s1 = s2;
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
        peg$silentFails++;
        if (input.charCodeAt(peg$currPos) === 60) {
          s2 = peg$c83;
          peg$currPos++;
        } else {
          s2 = null;
          if (peg$silentFails === 0) { peg$fail(peg$c84); }
        }
        peg$silentFails--;
        if (s2 !== null) {
          peg$currPos = s1;
          s1 = peg$c1;
        } else {
          s1 = peg$c0;
        }
      }
      if (s1 !== null) {
        s2 = peg$parsetextNodes();
        if (s2 !== null) {
          s3 = peg$currPos;
          s4 = peg$parseINDENT();
          if (s4 !== null) {
            s5 = [];
            s6 = peg$parsetextNodes();
            while (s6 !== null) {
              s5.push(s6);
              s6 = peg$parsetextNodes();
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
            s1 = peg$c85(s2,s3);
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

    function peg$parserawMustache() {
      var s0;

      s0 = peg$parserawMustacheUnescaped();
      if (s0 === null) {
        s0 = peg$parserawMustacheEscaped();
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
                s1 = peg$c87(s3);
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
                s1 = peg$c87(s3);
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
                  s1 = peg$c87(s3);
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

    function peg$parsepreMustacheText() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parsepreMustacheUnit();
      if (s2 !== null) {
        while (s2 !== null) {
          s1.push(s2);
          s2 = peg$parsepreMustacheUnit();
        }
      } else {
        s1 = peg$c0;
      }
      if (s1 !== null) {
        peg$reportedPos = s0;
        s1 = peg$c89(s1);
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
      s2 = peg$parsetripleOpen();
      if (s2 === null) {
        s2 = peg$parsedoubleOpen();
        if (s2 === null) {
          s2 = peg$parsehashStacheOpen();
          if (s2 === null) {
            s2 = peg$parseDEDENT();
            if (s2 === null) {
              s2 = peg$parseTERM();
            }
          }
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
          if (peg$silentFails === 0) { peg$fail(peg$c90); }
        }
        if (s2 !== null) {
          peg$reportedPos = s0;
          s1 = peg$c91(s2);
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
        s0 = peg$c93;
        peg$currPos++;
      } else {
        s0 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c94); }
      }
      peg$silentFails--;
      if (s0 === null) {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c92); }
      }

      return s0;
    }

    function peg$parsedoubleOpen() {
      var s0, s1;

      peg$silentFails++;
      if (input.substr(peg$currPos, 2) === peg$c96) {
        s0 = peg$c96;
        peg$currPos += 2;
      } else {
        s0 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c97); }
      }
      peg$silentFails--;
      if (s0 === null) {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c95); }
      }

      return s0;
    }

    function peg$parsetripleOpen() {
      var s0, s1;

      peg$silentFails++;
      if (input.substr(peg$currPos, 3) === peg$c99) {
        s0 = peg$c99;
        peg$currPos += 3;
      } else {
        s0 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c100); }
      }
      peg$silentFails--;
      if (s0 === null) {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c98); }
      }

      return s0;
    }

    function peg$parsesingleClose() {
      var s0, s1;

      peg$silentFails++;
      if (input.charCodeAt(peg$currPos) === 125) {
        s0 = peg$c102;
        peg$currPos++;
      } else {
        s0 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c103); }
      }
      peg$silentFails--;
      if (s0 === null) {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c101); }
      }

      return s0;
    }

    function peg$parsedoubleClose() {
      var s0, s1;

      peg$silentFails++;
      if (input.substr(peg$currPos, 2) === peg$c105) {
        s0 = peg$c105;
        peg$currPos += 2;
      } else {
        s0 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c106); }
      }
      peg$silentFails--;
      if (s0 === null) {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c104); }
      }

      return s0;
    }

    function peg$parsetripleClose() {
      var s0, s1;

      peg$silentFails++;
      if (input.substr(peg$currPos, 3) === peg$c108) {
        s0 = peg$c108;
        peg$currPos += 3;
      } else {
        s0 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c109); }
      }
      peg$silentFails--;
      if (s0 === null) {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c107); }
      }

      return s0;
    }

    function peg$parsehashStacheOpen() {
      var s0, s1;

      peg$silentFails++;
      if (input.substr(peg$currPos, 2) === peg$c111) {
        s0 = peg$c111;
        peg$currPos += 2;
      } else {
        s0 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c112); }
      }
      peg$silentFails--;
      if (s0 === null) {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c110); }
      }

      return s0;
    }

    function peg$parsehashStacheClose() {
      var s0, s1;

      peg$silentFails++;
      if (input.charCodeAt(peg$currPos) === 125) {
        s0 = peg$c102;
        peg$currPos++;
      } else {
        s0 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c103); }
      }
      peg$silentFails--;
      if (s0 === null) {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c113); }
      }

      return s0;
    }

    function peg$parseequalSign() {
      var s0, s1, s2;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 2) === peg$c114) {
        s1 = peg$c114;
        peg$currPos += 2;
      } else {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c115); }
      }
      if (s1 !== null) {
        if (input.charCodeAt(peg$currPos) === 32) {
          s2 = peg$c22;
          peg$currPos++;
        } else {
          s2 = null;
          if (peg$silentFails === 0) { peg$fail(peg$c23); }
        }
        if (s2 === null) {
          s2 = peg$c1;
        }
        if (s2 !== null) {
          peg$reportedPos = s0;
          s1 = peg$c116();
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
          s1 = peg$c46;
          peg$currPos++;
        } else {
          s1 = null;
          if (peg$silentFails === 0) { peg$fail(peg$c47); }
        }
        if (s1 !== null) {
          if (input.charCodeAt(peg$currPos) === 32) {
            s2 = peg$c22;
            peg$currPos++;
          } else {
            s2 = null;
            if (peg$silentFails === 0) { peg$fail(peg$c23); }
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
              s2 = peg$c118(s2,s3,s4,s5);
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
              s2 = peg$c119(s2,s3,s4);
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
        s1 = peg$c120(s1);
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
          s1 = peg$c32(s1,s2);
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
        s1 = peg$c33(s1);
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
        s2 = peg$c22;
        peg$currPos++;
      } else {
        s2 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c23); }
      }
      if (s2 !== null) {
        while (s2 !== null) {
          s1.push(s2);
          if (input.charCodeAt(peg$currPos) === 32) {
            s2 = peg$c22;
            peg$currPos++;
          } else {
            s2 = null;
            if (peg$silentFails === 0) { peg$fail(peg$c23); }
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
            s2 = peg$parsenormalAttribute();
          }
        }
        if (s2 !== null) {
          peg$reportedPos = s0;
          s1 = peg$c121(s2);
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

    function peg$parseboundAttributeValueText() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      if (peg$c122.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c123); }
      }
      if (s2 !== null) {
        while (s2 !== null) {
          s1.push(s2);
          if (peg$c122.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = null;
            if (peg$silentFails === 0) { peg$fail(peg$c123); }
          }
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

    function peg$parseactionValue() {
      var s0, s1;

      s0 = peg$parsequotedActionValue();
      if (s0 === null) {
        s0 = peg$currPos;
        s1 = peg$parsepathIdNode();
        if (s1 !== null) {
          peg$reportedPos = s0;
          s1 = peg$c124(s1);
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
        s2 = peg$c69;
        peg$currPos++;
      } else {
        s2 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c70); }
      }
      if (s2 !== null) {
        s3 = peg$parseinMustache();
        if (s3 !== null) {
          if (input.charCodeAt(peg$currPos) === 34) {
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
      if (s1 === null) {
        s1 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 39) {
          s2 = peg$c71;
          peg$currPos++;
        } else {
          s2 = null;
          if (peg$silentFails === 0) { peg$fail(peg$c72); }
        }
        if (s2 !== null) {
          s3 = peg$parseinMustache();
          if (s3 !== null) {
            if (input.charCodeAt(peg$currPos) === 39) {
              s4 = peg$c71;
              peg$currPos++;
            } else {
              s4 = null;
              if (peg$silentFails === 0) { peg$fail(peg$c72); }
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
        s1 = peg$c73(s1);
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
          s2 = peg$c46;
          peg$currPos++;
        } else {
          s2 = null;
          if (peg$silentFails === 0) { peg$fail(peg$c47); }
        }
        if (s2 !== null) {
          s3 = peg$parseactionValue();
          if (s3 !== null) {
            peg$reportedPos = s0;
            s1 = peg$c125(s1,s3);
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

    function peg$parseboundAttribute() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$parsekey();
      if (s1 !== null) {
        if (input.charCodeAt(peg$currPos) === 61) {
          s2 = peg$c46;
          peg$currPos++;
        } else {
          s2 = null;
          if (peg$silentFails === 0) { peg$fail(peg$c47); }
        }
        if (s2 !== null) {
          s3 = peg$parseboundAttributeValueText();
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

    function peg$parsenormalAttribute() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$parsekey();
      if (s1 !== null) {
        if (input.charCodeAt(peg$currPos) === 61) {
          s2 = peg$c46;
          peg$currPos++;
        } else {
          s2 = null;
          if (peg$silentFails === 0) { peg$fail(peg$c47); }
        }
        if (s2 !== null) {
          s3 = peg$parsestring();
          if (s3 !== null) {
            peg$reportedPos = s0;
            s1 = peg$c127(s1,s3);
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
        if (peg$c66.test(input.charAt(peg$currPos))) {
          s0 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s0 = null;
          if (peg$silentFails === 0) { peg$fail(peg$c67); }
        }
        if (s0 === null) {
          if (input.charCodeAt(peg$currPos) === 95) {
            s0 = peg$c128;
            peg$currPos++;
          } else {
            s0 = null;
            if (peg$silentFails === 0) { peg$fail(peg$c129); }
          }
          if (s0 === null) {
            if (input.charCodeAt(peg$currPos) === 45) {
              s0 = peg$c130;
              peg$currPos++;
            } else {
              s0 = null;
              if (peg$silentFails === 0) { peg$fail(peg$c131); }
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
        s1 = peg$c132;
        peg$currPos++;
      } else {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c133); }
      }
      if (s1 !== null) {
        s2 = peg$parsecssIdentifier();
        if (s2 !== null) {
          peg$reportedPos = s0;
          s1 = peg$c91(s2);
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
        s1 = peg$c134;
        peg$currPos++;
      } else {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c135); }
      }
      if (s1 !== null) {
        s2 = peg$parsecssIdentifier();
        if (s2 !== null) {
          peg$reportedPos = s0;
          s1 = peg$c136(s2);
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
          s1 = peg$c91(s2);
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
        if (peg$silentFails === 0) { peg$fail(peg$c137); }
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
          s1 = peg$c138(s1,s2);
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

      if (peg$c139.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c140); }
      }
      if (s0 === null) {
        s0 = peg$parsenonascii();
      }

      return s0;
    }

    function peg$parsenmstart() {
      var s0;

      if (peg$c141.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c142); }
      }
      if (s0 === null) {
        s0 = peg$parsenonascii();
      }

      return s0;
    }

    function peg$parsenonascii() {
      var s0;

      if (peg$c143.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c144); }
      }

      return s0;
    }

    function peg$parsehtmlTagName() {
      var s0, s1, s2, s3, s4;

      peg$silentFails++;
      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 37) {
        s1 = peg$c132;
        peg$currPos++;
      } else {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c133); }
      }
      if (s1 !== null) {
        s2 = peg$currPos;
        s3 = [];
        s4 = peg$parsetagChar();
        if (s4 !== null) {
          while (s4 !== null) {
            s3.push(s4);
            s4 = peg$parsetagChar();
          }
        } else {
          s3 = peg$c0;
        }
        if (s3 !== null) {
          s3 = input.substring(s2, peg$currPos);
        }
        s2 = s3;
        if (s2 !== null) {
          peg$reportedPos = s0;
          s1 = peg$c91(s2);
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
        if (peg$silentFails === 0) { peg$fail(peg$c145); }
      }

      return s0;
    }

    function peg$parsetagChar() {
      var s0;

      if (peg$c146.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c147); }
      }

      return s0;
    }

    function peg$parseknownTagName() {
      var s0, s1;

      peg$silentFails++;
      if (input.substr(peg$currPos, 10) === peg$c148) {
        s0 = peg$c148;
        peg$currPos += 10;
      } else {
        s0 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c149); }
      }
      if (s0 === null) {
        if (input.substr(peg$currPos, 10) === peg$c150) {
          s0 = peg$c150;
          peg$currPos += 10;
        } else {
          s0 = null;
          if (peg$silentFails === 0) { peg$fail(peg$c151); }
        }
        if (s0 === null) {
          if (input.substr(peg$currPos, 9) === peg$c152) {
            s0 = peg$c152;
            peg$currPos += 9;
          } else {
            s0 = null;
            if (peg$silentFails === 0) { peg$fail(peg$c153); }
          }
          if (s0 === null) {
            if (input.substr(peg$currPos, 8) === peg$c154) {
              s0 = peg$c154;
              peg$currPos += 8;
            } else {
              s0 = null;
              if (peg$silentFails === 0) { peg$fail(peg$c155); }
            }
            if (s0 === null) {
              if (input.substr(peg$currPos, 8) === peg$c156) {
                s0 = peg$c156;
                peg$currPos += 8;
              } else {
                s0 = null;
                if (peg$silentFails === 0) { peg$fail(peg$c157); }
              }
              if (s0 === null) {
                if (input.substr(peg$currPos, 8) === peg$c158) {
                  s0 = peg$c158;
                  peg$currPos += 8;
                } else {
                  s0 = null;
                  if (peg$silentFails === 0) { peg$fail(peg$c159); }
                }
                if (s0 === null) {
                  if (input.substr(peg$currPos, 8) === peg$c160) {
                    s0 = peg$c160;
                    peg$currPos += 8;
                  } else {
                    s0 = null;
                    if (peg$silentFails === 0) { peg$fail(peg$c161); }
                  }
                  if (s0 === null) {
                    if (input.substr(peg$currPos, 8) === peg$c162) {
                      s0 = peg$c162;
                      peg$currPos += 8;
                    } else {
                      s0 = null;
                      if (peg$silentFails === 0) { peg$fail(peg$c163); }
                    }
                    if (s0 === null) {
                      if (input.substr(peg$currPos, 8) === peg$c164) {
                        s0 = peg$c164;
                        peg$currPos += 8;
                      } else {
                        s0 = null;
                        if (peg$silentFails === 0) { peg$fail(peg$c165); }
                      }
                      if (s0 === null) {
                        if (input.substr(peg$currPos, 8) === peg$c166) {
                          s0 = peg$c166;
                          peg$currPos += 8;
                        } else {
                          s0 = null;
                          if (peg$silentFails === 0) { peg$fail(peg$c167); }
                        }
                        if (s0 === null) {
                          if (input.substr(peg$currPos, 8) === peg$c168) {
                            s0 = peg$c168;
                            peg$currPos += 8;
                          } else {
                            s0 = null;
                            if (peg$silentFails === 0) { peg$fail(peg$c169); }
                          }
                          if (s0 === null) {
                            if (input.substr(peg$currPos, 8) === peg$c170) {
                              s0 = peg$c170;
                              peg$currPos += 8;
                            } else {
                              s0 = null;
                              if (peg$silentFails === 0) { peg$fail(peg$c171); }
                            }
                            if (s0 === null) {
                              if (input.substr(peg$currPos, 8) === peg$c172) {
                                s0 = peg$c172;
                                peg$currPos += 8;
                              } else {
                                s0 = null;
                                if (peg$silentFails === 0) { peg$fail(peg$c173); }
                              }
                              if (s0 === null) {
                                if (input.substr(peg$currPos, 7) === peg$c174) {
                                  s0 = peg$c174;
                                  peg$currPos += 7;
                                } else {
                                  s0 = null;
                                  if (peg$silentFails === 0) { peg$fail(peg$c175); }
                                }
                                if (s0 === null) {
                                  if (input.substr(peg$currPos, 7) === peg$c176) {
                                    s0 = peg$c176;
                                    peg$currPos += 7;
                                  } else {
                                    s0 = null;
                                    if (peg$silentFails === 0) { peg$fail(peg$c177); }
                                  }
                                  if (s0 === null) {
                                    if (input.substr(peg$currPos, 7) === peg$c178) {
                                      s0 = peg$c178;
                                      peg$currPos += 7;
                                    } else {
                                      s0 = null;
                                      if (peg$silentFails === 0) { peg$fail(peg$c179); }
                                    }
                                    if (s0 === null) {
                                      if (input.substr(peg$currPos, 7) === peg$c180) {
                                        s0 = peg$c180;
                                        peg$currPos += 7;
                                      } else {
                                        s0 = null;
                                        if (peg$silentFails === 0) { peg$fail(peg$c181); }
                                      }
                                      if (s0 === null) {
                                        if (input.substr(peg$currPos, 7) === peg$c182) {
                                          s0 = peg$c182;
                                          peg$currPos += 7;
                                        } else {
                                          s0 = null;
                                          if (peg$silentFails === 0) { peg$fail(peg$c183); }
                                        }
                                        if (s0 === null) {
                                          if (input.substr(peg$currPos, 7) === peg$c184) {
                                            s0 = peg$c184;
                                            peg$currPos += 7;
                                          } else {
                                            s0 = null;
                                            if (peg$silentFails === 0) { peg$fail(peg$c185); }
                                          }
                                          if (s0 === null) {
                                            if (input.substr(peg$currPos, 7) === peg$c186) {
                                              s0 = peg$c186;
                                              peg$currPos += 7;
                                            } else {
                                              s0 = null;
                                              if (peg$silentFails === 0) { peg$fail(peg$c187); }
                                            }
                                            if (s0 === null) {
                                              if (input.substr(peg$currPos, 7) === peg$c188) {
                                                s0 = peg$c188;
                                                peg$currPos += 7;
                                              } else {
                                                s0 = null;
                                                if (peg$silentFails === 0) { peg$fail(peg$c189); }
                                              }
                                              if (s0 === null) {
                                                if (input.substr(peg$currPos, 7) === peg$c190) {
                                                  s0 = peg$c190;
                                                  peg$currPos += 7;
                                                } else {
                                                  s0 = null;
                                                  if (peg$silentFails === 0) { peg$fail(peg$c191); }
                                                }
                                                if (s0 === null) {
                                                  if (input.substr(peg$currPos, 7) === peg$c192) {
                                                    s0 = peg$c192;
                                                    peg$currPos += 7;
                                                  } else {
                                                    s0 = null;
                                                    if (peg$silentFails === 0) { peg$fail(peg$c193); }
                                                  }
                                                  if (s0 === null) {
                                                    if (input.substr(peg$currPos, 7) === peg$c194) {
                                                      s0 = peg$c194;
                                                      peg$currPos += 7;
                                                    } else {
                                                      s0 = null;
                                                      if (peg$silentFails === 0) { peg$fail(peg$c195); }
                                                    }
                                                    if (s0 === null) {
                                                      if (input.substr(peg$currPos, 7) === peg$c196) {
                                                        s0 = peg$c196;
                                                        peg$currPos += 7;
                                                      } else {
                                                        s0 = null;
                                                        if (peg$silentFails === 0) { peg$fail(peg$c197); }
                                                      }
                                                      if (s0 === null) {
                                                        if (input.substr(peg$currPos, 6) === peg$c198) {
                                                          s0 = peg$c198;
                                                          peg$currPos += 6;
                                                        } else {
                                                          s0 = null;
                                                          if (peg$silentFails === 0) { peg$fail(peg$c199); }
                                                        }
                                                        if (s0 === null) {
                                                          if (input.substr(peg$currPos, 6) === peg$c200) {
                                                            s0 = peg$c200;
                                                            peg$currPos += 6;
                                                          } else {
                                                            s0 = null;
                                                            if (peg$silentFails === 0) { peg$fail(peg$c201); }
                                                          }
                                                          if (s0 === null) {
                                                            if (input.substr(peg$currPos, 6) === peg$c202) {
                                                              s0 = peg$c202;
                                                              peg$currPos += 6;
                                                            } else {
                                                              s0 = null;
                                                              if (peg$silentFails === 0) { peg$fail(peg$c203); }
                                                            }
                                                            if (s0 === null) {
                                                              if (input.substr(peg$currPos, 6) === peg$c204) {
                                                                s0 = peg$c204;
                                                                peg$currPos += 6;
                                                              } else {
                                                                s0 = null;
                                                                if (peg$silentFails === 0) { peg$fail(peg$c205); }
                                                              }
                                                              if (s0 === null) {
                                                                if (input.substr(peg$currPos, 6) === peg$c206) {
                                                                  s0 = peg$c206;
                                                                  peg$currPos += 6;
                                                                } else {
                                                                  s0 = null;
                                                                  if (peg$silentFails === 0) { peg$fail(peg$c207); }
                                                                }
                                                                if (s0 === null) {
                                                                  if (input.substr(peg$currPos, 6) === peg$c208) {
                                                                    s0 = peg$c208;
                                                                    peg$currPos += 6;
                                                                  } else {
                                                                    s0 = null;
                                                                    if (peg$silentFails === 0) { peg$fail(peg$c209); }
                                                                  }
                                                                  if (s0 === null) {
                                                                    if (input.substr(peg$currPos, 6) === peg$c210) {
                                                                      s0 = peg$c210;
                                                                      peg$currPos += 6;
                                                                    } else {
                                                                      s0 = null;
                                                                      if (peg$silentFails === 0) { peg$fail(peg$c211); }
                                                                    }
                                                                    if (s0 === null) {
                                                                      if (input.substr(peg$currPos, 6) === peg$c212) {
                                                                        s0 = peg$c212;
                                                                        peg$currPos += 6;
                                                                      } else {
                                                                        s0 = null;
                                                                        if (peg$silentFails === 0) { peg$fail(peg$c213); }
                                                                      }
                                                                      if (s0 === null) {
                                                                        if (input.substr(peg$currPos, 6) === peg$c214) {
                                                                          s0 = peg$c214;
                                                                          peg$currPos += 6;
                                                                        } else {
                                                                          s0 = null;
                                                                          if (peg$silentFails === 0) { peg$fail(peg$c215); }
                                                                        }
                                                                        if (s0 === null) {
                                                                          if (input.substr(peg$currPos, 6) === peg$c216) {
                                                                            s0 = peg$c216;
                                                                            peg$currPos += 6;
                                                                          } else {
                                                                            s0 = null;
                                                                            if (peg$silentFails === 0) { peg$fail(peg$c217); }
                                                                          }
                                                                          if (s0 === null) {
                                                                            if (input.substr(peg$currPos, 6) === peg$c218) {
                                                                              s0 = peg$c218;
                                                                              peg$currPos += 6;
                                                                            } else {
                                                                              s0 = null;
                                                                              if (peg$silentFails === 0) { peg$fail(peg$c219); }
                                                                            }
                                                                            if (s0 === null) {
                                                                              if (input.substr(peg$currPos, 6) === peg$c220) {
                                                                                s0 = peg$c220;
                                                                                peg$currPos += 6;
                                                                              } else {
                                                                                s0 = null;
                                                                                if (peg$silentFails === 0) { peg$fail(peg$c221); }
                                                                              }
                                                                              if (s0 === null) {
                                                                                if (input.substr(peg$currPos, 6) === peg$c222) {
                                                                                  s0 = peg$c222;
                                                                                  peg$currPos += 6;
                                                                                } else {
                                                                                  s0 = null;
                                                                                  if (peg$silentFails === 0) { peg$fail(peg$c223); }
                                                                                }
                                                                                if (s0 === null) {
                                                                                  if (input.substr(peg$currPos, 6) === peg$c224) {
                                                                                    s0 = peg$c224;
                                                                                    peg$currPos += 6;
                                                                                  } else {
                                                                                    s0 = null;
                                                                                    if (peg$silentFails === 0) { peg$fail(peg$c225); }
                                                                                  }
                                                                                  if (s0 === null) {
                                                                                    if (input.substr(peg$currPos, 6) === peg$c226) {
                                                                                      s0 = peg$c226;
                                                                                      peg$currPos += 6;
                                                                                    } else {
                                                                                      s0 = null;
                                                                                      if (peg$silentFails === 0) { peg$fail(peg$c227); }
                                                                                    }
                                                                                    if (s0 === null) {
                                                                                      if (input.substr(peg$currPos, 6) === peg$c228) {
                                                                                        s0 = peg$c228;
                                                                                        peg$currPos += 6;
                                                                                      } else {
                                                                                        s0 = null;
                                                                                        if (peg$silentFails === 0) { peg$fail(peg$c229); }
                                                                                      }
                                                                                      if (s0 === null) {
                                                                                        if (input.substr(peg$currPos, 6) === peg$c230) {
                                                                                          s0 = peg$c230;
                                                                                          peg$currPos += 6;
                                                                                        } else {
                                                                                          s0 = null;
                                                                                          if (peg$silentFails === 0) { peg$fail(peg$c231); }
                                                                                        }
                                                                                        if (s0 === null) {
                                                                                          if (input.substr(peg$currPos, 6) === peg$c232) {
                                                                                            s0 = peg$c232;
                                                                                            peg$currPos += 6;
                                                                                          } else {
                                                                                            s0 = null;
                                                                                            if (peg$silentFails === 0) { peg$fail(peg$c233); }
                                                                                          }
                                                                                          if (s0 === null) {
                                                                                            if (input.substr(peg$currPos, 6) === peg$c234) {
                                                                                              s0 = peg$c234;
                                                                                              peg$currPos += 6;
                                                                                            } else {
                                                                                              s0 = null;
                                                                                              if (peg$silentFails === 0) { peg$fail(peg$c235); }
                                                                                            }
                                                                                            if (s0 === null) {
                                                                                              if (input.substr(peg$currPos, 6) === peg$c236) {
                                                                                                s0 = peg$c236;
                                                                                                peg$currPos += 6;
                                                                                              } else {
                                                                                                s0 = null;
                                                                                                if (peg$silentFails === 0) { peg$fail(peg$c237); }
                                                                                              }
                                                                                              if (s0 === null) {
                                                                                                if (input.substr(peg$currPos, 5) === peg$c238) {
                                                                                                  s0 = peg$c238;
                                                                                                  peg$currPos += 5;
                                                                                                } else {
                                                                                                  s0 = null;
                                                                                                  if (peg$silentFails === 0) { peg$fail(peg$c239); }
                                                                                                }
                                                                                                if (s0 === null) {
                                                                                                  if (input.substr(peg$currPos, 5) === peg$c240) {
                                                                                                    s0 = peg$c240;
                                                                                                    peg$currPos += 5;
                                                                                                  } else {
                                                                                                    s0 = null;
                                                                                                    if (peg$silentFails === 0) { peg$fail(peg$c241); }
                                                                                                  }
                                                                                                  if (s0 === null) {
                                                                                                    if (input.substr(peg$currPos, 5) === peg$c242) {
                                                                                                      s0 = peg$c242;
                                                                                                      peg$currPos += 5;
                                                                                                    } else {
                                                                                                      s0 = null;
                                                                                                      if (peg$silentFails === 0) { peg$fail(peg$c243); }
                                                                                                    }
                                                                                                    if (s0 === null) {
                                                                                                      if (input.substr(peg$currPos, 5) === peg$c244) {
                                                                                                        s0 = peg$c244;
                                                                                                        peg$currPos += 5;
                                                                                                      } else {
                                                                                                        s0 = null;
                                                                                                        if (peg$silentFails === 0) { peg$fail(peg$c245); }
                                                                                                      }
                                                                                                      if (s0 === null) {
                                                                                                        if (input.substr(peg$currPos, 5) === peg$c246) {
                                                                                                          s0 = peg$c246;
                                                                                                          peg$currPos += 5;
                                                                                                        } else {
                                                                                                          s0 = null;
                                                                                                          if (peg$silentFails === 0) { peg$fail(peg$c247); }
                                                                                                        }
                                                                                                        if (s0 === null) {
                                                                                                          if (input.substr(peg$currPos, 5) === peg$c248) {
                                                                                                            s0 = peg$c248;
                                                                                                            peg$currPos += 5;
                                                                                                          } else {
                                                                                                            s0 = null;
                                                                                                            if (peg$silentFails === 0) { peg$fail(peg$c249); }
                                                                                                          }
                                                                                                          if (s0 === null) {
                                                                                                            if (input.substr(peg$currPos, 5) === peg$c250) {
                                                                                                              s0 = peg$c250;
                                                                                                              peg$currPos += 5;
                                                                                                            } else {
                                                                                                              s0 = null;
                                                                                                              if (peg$silentFails === 0) { peg$fail(peg$c251); }
                                                                                                            }
                                                                                                            if (s0 === null) {
                                                                                                              if (input.substr(peg$currPos, 5) === peg$c252) {
                                                                                                                s0 = peg$c252;
                                                                                                                peg$currPos += 5;
                                                                                                              } else {
                                                                                                                s0 = null;
                                                                                                                if (peg$silentFails === 0) { peg$fail(peg$c253); }
                                                                                                              }
                                                                                                              if (s0 === null) {
                                                                                                                if (input.substr(peg$currPos, 5) === peg$c254) {
                                                                                                                  s0 = peg$c254;
                                                                                                                  peg$currPos += 5;
                                                                                                                } else {
                                                                                                                  s0 = null;
                                                                                                                  if (peg$silentFails === 0) { peg$fail(peg$c255); }
                                                                                                                }
                                                                                                                if (s0 === null) {
                                                                                                                  if (input.substr(peg$currPos, 5) === peg$c256) {
                                                                                                                    s0 = peg$c256;
                                                                                                                    peg$currPos += 5;
                                                                                                                  } else {
                                                                                                                    s0 = null;
                                                                                                                    if (peg$silentFails === 0) { peg$fail(peg$c257); }
                                                                                                                  }
                                                                                                                  if (s0 === null) {
                                                                                                                    if (input.substr(peg$currPos, 5) === peg$c258) {
                                                                                                                      s0 = peg$c258;
                                                                                                                      peg$currPos += 5;
                                                                                                                    } else {
                                                                                                                      s0 = null;
                                                                                                                      if (peg$silentFails === 0) { peg$fail(peg$c259); }
                                                                                                                    }
                                                                                                                    if (s0 === null) {
                                                                                                                      if (input.substr(peg$currPos, 5) === peg$c260) {
                                                                                                                        s0 = peg$c260;
                                                                                                                        peg$currPos += 5;
                                                                                                                      } else {
                                                                                                                        s0 = null;
                                                                                                                        if (peg$silentFails === 0) { peg$fail(peg$c261); }
                                                                                                                      }
                                                                                                                      if (s0 === null) {
                                                                                                                        if (input.substr(peg$currPos, 5) === peg$c262) {
                                                                                                                          s0 = peg$c262;
                                                                                                                          peg$currPos += 5;
                                                                                                                        } else {
                                                                                                                          s0 = null;
                                                                                                                          if (peg$silentFails === 0) { peg$fail(peg$c263); }
                                                                                                                        }
                                                                                                                        if (s0 === null) {
                                                                                                                          if (input.substr(peg$currPos, 5) === peg$c264) {
                                                                                                                            s0 = peg$c264;
                                                                                                                            peg$currPos += 5;
                                                                                                                          } else {
                                                                                                                            s0 = null;
                                                                                                                            if (peg$silentFails === 0) { peg$fail(peg$c265); }
                                                                                                                          }
                                                                                                                          if (s0 === null) {
                                                                                                                            if (input.substr(peg$currPos, 5) === peg$c266) {
                                                                                                                              s0 = peg$c266;
                                                                                                                              peg$currPos += 5;
                                                                                                                            } else {
                                                                                                                              s0 = null;
                                                                                                                              if (peg$silentFails === 0) { peg$fail(peg$c267); }
                                                                                                                            }
                                                                                                                            if (s0 === null) {
                                                                                                                              if (input.substr(peg$currPos, 5) === peg$c268) {
                                                                                                                                s0 = peg$c268;
                                                                                                                                peg$currPos += 5;
                                                                                                                              } else {
                                                                                                                                s0 = null;
                                                                                                                                if (peg$silentFails === 0) { peg$fail(peg$c269); }
                                                                                                                              }
                                                                                                                              if (s0 === null) {
                                                                                                                                if (input.substr(peg$currPos, 5) === peg$c270) {
                                                                                                                                  s0 = peg$c270;
                                                                                                                                  peg$currPos += 5;
                                                                                                                                } else {
                                                                                                                                  s0 = null;
                                                                                                                                  if (peg$silentFails === 0) { peg$fail(peg$c271); }
                                                                                                                                }
                                                                                                                                if (s0 === null) {
                                                                                                                                  if (input.substr(peg$currPos, 5) === peg$c272) {
                                                                                                                                    s0 = peg$c272;
                                                                                                                                    peg$currPos += 5;
                                                                                                                                  } else {
                                                                                                                                    s0 = null;
                                                                                                                                    if (peg$silentFails === 0) { peg$fail(peg$c273); }
                                                                                                                                  }
                                                                                                                                  if (s0 === null) {
                                                                                                                                    if (input.substr(peg$currPos, 4) === peg$c274) {
                                                                                                                                      s0 = peg$c274;
                                                                                                                                      peg$currPos += 4;
                                                                                                                                    } else {
                                                                                                                                      s0 = null;
                                                                                                                                      if (peg$silentFails === 0) { peg$fail(peg$c275); }
                                                                                                                                    }
                                                                                                                                    if (s0 === null) {
                                                                                                                                      if (input.substr(peg$currPos, 4) === peg$c276) {
                                                                                                                                        s0 = peg$c276;
                                                                                                                                        peg$currPos += 4;
                                                                                                                                      } else {
                                                                                                                                        s0 = null;
                                                                                                                                        if (peg$silentFails === 0) { peg$fail(peg$c277); }
                                                                                                                                      }
                                                                                                                                      if (s0 === null) {
                                                                                                                                        if (input.substr(peg$currPos, 4) === peg$c278) {
                                                                                                                                          s0 = peg$c278;
                                                                                                                                          peg$currPos += 4;
                                                                                                                                        } else {
                                                                                                                                          s0 = null;
                                                                                                                                          if (peg$silentFails === 0) { peg$fail(peg$c279); }
                                                                                                                                        }
                                                                                                                                        if (s0 === null) {
                                                                                                                                          if (input.substr(peg$currPos, 4) === peg$c280) {
                                                                                                                                            s0 = peg$c280;
                                                                                                                                            peg$currPos += 4;
                                                                                                                                          } else {
                                                                                                                                            s0 = null;
                                                                                                                                            if (peg$silentFails === 0) { peg$fail(peg$c281); }
                                                                                                                                          }
                                                                                                                                          if (s0 === null) {
                                                                                                                                            if (input.substr(peg$currPos, 4) === peg$c282) {
                                                                                                                                              s0 = peg$c282;
                                                                                                                                              peg$currPos += 4;
                                                                                                                                            } else {
                                                                                                                                              s0 = null;
                                                                                                                                              if (peg$silentFails === 0) { peg$fail(peg$c283); }
                                                                                                                                            }
                                                                                                                                            if (s0 === null) {
                                                                                                                                              if (input.substr(peg$currPos, 4) === peg$c284) {
                                                                                                                                                s0 = peg$c284;
                                                                                                                                                peg$currPos += 4;
                                                                                                                                              } else {
                                                                                                                                                s0 = null;
                                                                                                                                                if (peg$silentFails === 0) { peg$fail(peg$c285); }
                                                                                                                                              }
                                                                                                                                              if (s0 === null) {
                                                                                                                                                if (input.substr(peg$currPos, 4) === peg$c286) {
                                                                                                                                                  s0 = peg$c286;
                                                                                                                                                  peg$currPos += 4;
                                                                                                                                                } else {
                                                                                                                                                  s0 = null;
                                                                                                                                                  if (peg$silentFails === 0) { peg$fail(peg$c287); }
                                                                                                                                                }
                                                                                                                                                if (s0 === null) {
                                                                                                                                                  if (input.substr(peg$currPos, 4) === peg$c288) {
                                                                                                                                                    s0 = peg$c288;
                                                                                                                                                    peg$currPos += 4;
                                                                                                                                                  } else {
                                                                                                                                                    s0 = null;
                                                                                                                                                    if (peg$silentFails === 0) { peg$fail(peg$c289); }
                                                                                                                                                  }
                                                                                                                                                  if (s0 === null) {
                                                                                                                                                    if (input.substr(peg$currPos, 4) === peg$c290) {
                                                                                                                                                      s0 = peg$c290;
                                                                                                                                                      peg$currPos += 4;
                                                                                                                                                    } else {
                                                                                                                                                      s0 = null;
                                                                                                                                                      if (peg$silentFails === 0) { peg$fail(peg$c291); }
                                                                                                                                                    }
                                                                                                                                                    if (s0 === null) {
                                                                                                                                                      if (input.substr(peg$currPos, 4) === peg$c292) {
                                                                                                                                                        s0 = peg$c292;
                                                                                                                                                        peg$currPos += 4;
                                                                                                                                                      } else {
                                                                                                                                                        s0 = null;
                                                                                                                                                        if (peg$silentFails === 0) { peg$fail(peg$c293); }
                                                                                                                                                      }
                                                                                                                                                      if (s0 === null) {
                                                                                                                                                        if (input.substr(peg$currPos, 4) === peg$c294) {
                                                                                                                                                          s0 = peg$c294;
                                                                                                                                                          peg$currPos += 4;
                                                                                                                                                        } else {
                                                                                                                                                          s0 = null;
                                                                                                                                                          if (peg$silentFails === 0) { peg$fail(peg$c295); }
                                                                                                                                                        }
                                                                                                                                                        if (s0 === null) {
                                                                                                                                                          if (input.substr(peg$currPos, 4) === peg$c296) {
                                                                                                                                                            s0 = peg$c296;
                                                                                                                                                            peg$currPos += 4;
                                                                                                                                                          } else {
                                                                                                                                                            s0 = null;
                                                                                                                                                            if (peg$silentFails === 0) { peg$fail(peg$c297); }
                                                                                                                                                          }
                                                                                                                                                          if (s0 === null) {
                                                                                                                                                            if (input.substr(peg$currPos, 4) === peg$c298) {
                                                                                                                                                              s0 = peg$c298;
                                                                                                                                                              peg$currPos += 4;
                                                                                                                                                            } else {
                                                                                                                                                              s0 = null;
                                                                                                                                                              if (peg$silentFails === 0) { peg$fail(peg$c299); }
                                                                                                                                                            }
                                                                                                                                                            if (s0 === null) {
                                                                                                                                                              if (input.substr(peg$currPos, 4) === peg$c300) {
                                                                                                                                                                s0 = peg$c300;
                                                                                                                                                                peg$currPos += 4;
                                                                                                                                                              } else {
                                                                                                                                                                s0 = null;
                                                                                                                                                                if (peg$silentFails === 0) { peg$fail(peg$c301); }
                                                                                                                                                              }
                                                                                                                                                              if (s0 === null) {
                                                                                                                                                                if (input.substr(peg$currPos, 4) === peg$c302) {
                                                                                                                                                                  s0 = peg$c302;
                                                                                                                                                                  peg$currPos += 4;
                                                                                                                                                                } else {
                                                                                                                                                                  s0 = null;
                                                                                                                                                                  if (peg$silentFails === 0) { peg$fail(peg$c303); }
                                                                                                                                                                }
                                                                                                                                                                if (s0 === null) {
                                                                                                                                                                  if (input.substr(peg$currPos, 4) === peg$c304) {
                                                                                                                                                                    s0 = peg$c304;
                                                                                                                                                                    peg$currPos += 4;
                                                                                                                                                                  } else {
                                                                                                                                                                    s0 = null;
                                                                                                                                                                    if (peg$silentFails === 0) { peg$fail(peg$c305); }
                                                                                                                                                                  }
                                                                                                                                                                  if (s0 === null) {
                                                                                                                                                                    if (input.substr(peg$currPos, 4) === peg$c306) {
                                                                                                                                                                      s0 = peg$c306;
                                                                                                                                                                      peg$currPos += 4;
                                                                                                                                                                    } else {
                                                                                                                                                                      s0 = null;
                                                                                                                                                                      if (peg$silentFails === 0) { peg$fail(peg$c307); }
                                                                                                                                                                    }
                                                                                                                                                                    if (s0 === null) {
                                                                                                                                                                      if (input.substr(peg$currPos, 4) === peg$c308) {
                                                                                                                                                                        s0 = peg$c308;
                                                                                                                                                                        peg$currPos += 4;
                                                                                                                                                                      } else {
                                                                                                                                                                        s0 = null;
                                                                                                                                                                        if (peg$silentFails === 0) { peg$fail(peg$c309); }
                                                                                                                                                                      }
                                                                                                                                                                      if (s0 === null) {
                                                                                                                                                                        if (input.substr(peg$currPos, 4) === peg$c310) {
                                                                                                                                                                          s0 = peg$c310;
                                                                                                                                                                          peg$currPos += 4;
                                                                                                                                                                        } else {
                                                                                                                                                                          s0 = null;
                                                                                                                                                                          if (peg$silentFails === 0) { peg$fail(peg$c311); }
                                                                                                                                                                        }
                                                                                                                                                                        if (s0 === null) {
                                                                                                                                                                          if (input.substr(peg$currPos, 4) === peg$c312) {
                                                                                                                                                                            s0 = peg$c312;
                                                                                                                                                                            peg$currPos += 4;
                                                                                                                                                                          } else {
                                                                                                                                                                            s0 = null;
                                                                                                                                                                            if (peg$silentFails === 0) { peg$fail(peg$c313); }
                                                                                                                                                                          }
                                                                                                                                                                          if (s0 === null) {
                                                                                                                                                                            if (input.substr(peg$currPos, 4) === peg$c314) {
                                                                                                                                                                              s0 = peg$c314;
                                                                                                                                                                              peg$currPos += 4;
                                                                                                                                                                            } else {
                                                                                                                                                                              s0 = null;
                                                                                                                                                                              if (peg$silentFails === 0) { peg$fail(peg$c315); }
                                                                                                                                                                            }
                                                                                                                                                                            if (s0 === null) {
                                                                                                                                                                              if (input.substr(peg$currPos, 3) === peg$c316) {
                                                                                                                                                                                s0 = peg$c316;
                                                                                                                                                                                peg$currPos += 3;
                                                                                                                                                                              } else {
                                                                                                                                                                                s0 = null;
                                                                                                                                                                                if (peg$silentFails === 0) { peg$fail(peg$c317); }
                                                                                                                                                                              }
                                                                                                                                                                              if (s0 === null) {
                                                                                                                                                                                if (input.substr(peg$currPos, 3) === peg$c318) {
                                                                                                                                                                                  s0 = peg$c318;
                                                                                                                                                                                  peg$currPos += 3;
                                                                                                                                                                                } else {
                                                                                                                                                                                  s0 = null;
                                                                                                                                                                                  if (peg$silentFails === 0) { peg$fail(peg$c319); }
                                                                                                                                                                                }
                                                                                                                                                                                if (s0 === null) {
                                                                                                                                                                                  if (input.substr(peg$currPos, 3) === peg$c320) {
                                                                                                                                                                                    s0 = peg$c320;
                                                                                                                                                                                    peg$currPos += 3;
                                                                                                                                                                                  } else {
                                                                                                                                                                                    s0 = null;
                                                                                                                                                                                    if (peg$silentFails === 0) { peg$fail(peg$c321); }
                                                                                                                                                                                  }
                                                                                                                                                                                  if (s0 === null) {
                                                                                                                                                                                    if (input.substr(peg$currPos, 3) === peg$c322) {
                                                                                                                                                                                      s0 = peg$c322;
                                                                                                                                                                                      peg$currPos += 3;
                                                                                                                                                                                    } else {
                                                                                                                                                                                      s0 = null;
                                                                                                                                                                                      if (peg$silentFails === 0) { peg$fail(peg$c323); }
                                                                                                                                                                                    }
                                                                                                                                                                                    if (s0 === null) {
                                                                                                                                                                                      if (input.substr(peg$currPos, 3) === peg$c324) {
                                                                                                                                                                                        s0 = peg$c324;
                                                                                                                                                                                        peg$currPos += 3;
                                                                                                                                                                                      } else {
                                                                                                                                                                                        s0 = null;
                                                                                                                                                                                        if (peg$silentFails === 0) { peg$fail(peg$c325); }
                                                                                                                                                                                      }
                                                                                                                                                                                      if (s0 === null) {
                                                                                                                                                                                        if (input.substr(peg$currPos, 3) === peg$c326) {
                                                                                                                                                                                          s0 = peg$c326;
                                                                                                                                                                                          peg$currPos += 3;
                                                                                                                                                                                        } else {
                                                                                                                                                                                          s0 = null;
                                                                                                                                                                                          if (peg$silentFails === 0) { peg$fail(peg$c327); }
                                                                                                                                                                                        }
                                                                                                                                                                                        if (s0 === null) {
                                                                                                                                                                                          if (input.substr(peg$currPos, 3) === peg$c328) {
                                                                                                                                                                                            s0 = peg$c328;
                                                                                                                                                                                            peg$currPos += 3;
                                                                                                                                                                                          } else {
                                                                                                                                                                                            s0 = null;
                                                                                                                                                                                            if (peg$silentFails === 0) { peg$fail(peg$c329); }
                                                                                                                                                                                          }
                                                                                                                                                                                          if (s0 === null) {
                                                                                                                                                                                            if (input.substr(peg$currPos, 3) === peg$c330) {
                                                                                                                                                                                              s0 = peg$c330;
                                                                                                                                                                                              peg$currPos += 3;
                                                                                                                                                                                            } else {
                                                                                                                                                                                              s0 = null;
                                                                                                                                                                                              if (peg$silentFails === 0) { peg$fail(peg$c331); }
                                                                                                                                                                                            }
                                                                                                                                                                                            if (s0 === null) {
                                                                                                                                                                                              if (input.substr(peg$currPos, 3) === peg$c332) {
                                                                                                                                                                                                s0 = peg$c332;
                                                                                                                                                                                                peg$currPos += 3;
                                                                                                                                                                                              } else {
                                                                                                                                                                                                s0 = null;
                                                                                                                                                                                                if (peg$silentFails === 0) { peg$fail(peg$c333); }
                                                                                                                                                                                              }
                                                                                                                                                                                              if (s0 === null) {
                                                                                                                                                                                                if (input.substr(peg$currPos, 3) === peg$c334) {
                                                                                                                                                                                                  s0 = peg$c334;
                                                                                                                                                                                                  peg$currPos += 3;
                                                                                                                                                                                                } else {
                                                                                                                                                                                                  s0 = null;
                                                                                                                                                                                                  if (peg$silentFails === 0) { peg$fail(peg$c335); }
                                                                                                                                                                                                }
                                                                                                                                                                                                if (s0 === null) {
                                                                                                                                                                                                  if (input.substr(peg$currPos, 3) === peg$c336) {
                                                                                                                                                                                                    s0 = peg$c336;
                                                                                                                                                                                                    peg$currPos += 3;
                                                                                                                                                                                                  } else {
                                                                                                                                                                                                    s0 = null;
                                                                                                                                                                                                    if (peg$silentFails === 0) { peg$fail(peg$c337); }
                                                                                                                                                                                                  }
                                                                                                                                                                                                  if (s0 === null) {
                                                                                                                                                                                                    if (input.substr(peg$currPos, 3) === peg$c338) {
                                                                                                                                                                                                      s0 = peg$c338;
                                                                                                                                                                                                      peg$currPos += 3;
                                                                                                                                                                                                    } else {
                                                                                                                                                                                                      s0 = null;
                                                                                                                                                                                                      if (peg$silentFails === 0) { peg$fail(peg$c339); }
                                                                                                                                                                                                    }
                                                                                                                                                                                                    if (s0 === null) {
                                                                                                                                                                                                      if (input.substr(peg$currPos, 3) === peg$c340) {
                                                                                                                                                                                                        s0 = peg$c340;
                                                                                                                                                                                                        peg$currPos += 3;
                                                                                                                                                                                                      } else {
                                                                                                                                                                                                        s0 = null;
                                                                                                                                                                                                        if (peg$silentFails === 0) { peg$fail(peg$c341); }
                                                                                                                                                                                                      }
                                                                                                                                                                                                      if (s0 === null) {
                                                                                                                                                                                                        if (input.substr(peg$currPos, 3) === peg$c342) {
                                                                                                                                                                                                          s0 = peg$c342;
                                                                                                                                                                                                          peg$currPos += 3;
                                                                                                                                                                                                        } else {
                                                                                                                                                                                                          s0 = null;
                                                                                                                                                                                                          if (peg$silentFails === 0) { peg$fail(peg$c343); }
                                                                                                                                                                                                        }
                                                                                                                                                                                                        if (s0 === null) {
                                                                                                                                                                                                          if (input.substr(peg$currPos, 3) === peg$c344) {
                                                                                                                                                                                                            s0 = peg$c344;
                                                                                                                                                                                                            peg$currPos += 3;
                                                                                                                                                                                                          } else {
                                                                                                                                                                                                            s0 = null;
                                                                                                                                                                                                            if (peg$silentFails === 0) { peg$fail(peg$c345); }
                                                                                                                                                                                                          }
                                                                                                                                                                                                          if (s0 === null) {
                                                                                                                                                                                                            if (input.substr(peg$currPos, 3) === peg$c346) {
                                                                                                                                                                                                              s0 = peg$c346;
                                                                                                                                                                                                              peg$currPos += 3;
                                                                                                                                                                                                            } else {
                                                                                                                                                                                                              s0 = null;
                                                                                                                                                                                                              if (peg$silentFails === 0) { peg$fail(peg$c347); }
                                                                                                                                                                                                            }
                                                                                                                                                                                                            if (s0 === null) {
                                                                                                                                                                                                              if (input.substr(peg$currPos, 3) === peg$c348) {
                                                                                                                                                                                                                s0 = peg$c348;
                                                                                                                                                                                                                peg$currPos += 3;
                                                                                                                                                                                                              } else {
                                                                                                                                                                                                                s0 = null;
                                                                                                                                                                                                                if (peg$silentFails === 0) { peg$fail(peg$c349); }
                                                                                                                                                                                                              }
                                                                                                                                                                                                              if (s0 === null) {
                                                                                                                                                                                                                if (input.substr(peg$currPos, 3) === peg$c350) {
                                                                                                                                                                                                                  s0 = peg$c350;
                                                                                                                                                                                                                  peg$currPos += 3;
                                                                                                                                                                                                                } else {
                                                                                                                                                                                                                  s0 = null;
                                                                                                                                                                                                                  if (peg$silentFails === 0) { peg$fail(peg$c351); }
                                                                                                                                                                                                                }
                                                                                                                                                                                                                if (s0 === null) {
                                                                                                                                                                                                                  if (input.substr(peg$currPos, 3) === peg$c352) {
                                                                                                                                                                                                                    s0 = peg$c352;
                                                                                                                                                                                                                    peg$currPos += 3;
                                                                                                                                                                                                                  } else {
                                                                                                                                                                                                                    s0 = null;
                                                                                                                                                                                                                    if (peg$silentFails === 0) { peg$fail(peg$c353); }
                                                                                                                                                                                                                  }
                                                                                                                                                                                                                  if (s0 === null) {
                                                                                                                                                                                                                    if (input.substr(peg$currPos, 2) === peg$c354) {
                                                                                                                                                                                                                      s0 = peg$c354;
                                                                                                                                                                                                                      peg$currPos += 2;
                                                                                                                                                                                                                    } else {
                                                                                                                                                                                                                      s0 = null;
                                                                                                                                                                                                                      if (peg$silentFails === 0) { peg$fail(peg$c355); }
                                                                                                                                                                                                                    }
                                                                                                                                                                                                                    if (s0 === null) {
                                                                                                                                                                                                                      if (input.substr(peg$currPos, 2) === peg$c356) {
                                                                                                                                                                                                                        s0 = peg$c356;
                                                                                                                                                                                                                        peg$currPos += 2;
                                                                                                                                                                                                                      } else {
                                                                                                                                                                                                                        s0 = null;
                                                                                                                                                                                                                        if (peg$silentFails === 0) { peg$fail(peg$c357); }
                                                                                                                                                                                                                      }
                                                                                                                                                                                                                      if (s0 === null) {
                                                                                                                                                                                                                        if (input.substr(peg$currPos, 2) === peg$c358) {
                                                                                                                                                                                                                          s0 = peg$c358;
                                                                                                                                                                                                                          peg$currPos += 2;
                                                                                                                                                                                                                        } else {
                                                                                                                                                                                                                          s0 = null;
                                                                                                                                                                                                                          if (peg$silentFails === 0) { peg$fail(peg$c359); }
                                                                                                                                                                                                                        }
                                                                                                                                                                                                                        if (s0 === null) {
                                                                                                                                                                                                                          if (input.substr(peg$currPos, 2) === peg$c360) {
                                                                                                                                                                                                                            s0 = peg$c360;
                                                                                                                                                                                                                            peg$currPos += 2;
                                                                                                                                                                                                                          } else {
                                                                                                                                                                                                                            s0 = null;
                                                                                                                                                                                                                            if (peg$silentFails === 0) { peg$fail(peg$c361); }
                                                                                                                                                                                                                          }
                                                                                                                                                                                                                          if (s0 === null) {
                                                                                                                                                                                                                            if (input.substr(peg$currPos, 2) === peg$c362) {
                                                                                                                                                                                                                              s0 = peg$c362;
                                                                                                                                                                                                                              peg$currPos += 2;
                                                                                                                                                                                                                            } else {
                                                                                                                                                                                                                              s0 = null;
                                                                                                                                                                                                                              if (peg$silentFails === 0) { peg$fail(peg$c363); }
                                                                                                                                                                                                                            }
                                                                                                                                                                                                                            if (s0 === null) {
                                                                                                                                                                                                                              if (input.substr(peg$currPos, 2) === peg$c364) {
                                                                                                                                                                                                                                s0 = peg$c364;
                                                                                                                                                                                                                                peg$currPos += 2;
                                                                                                                                                                                                                              } else {
                                                                                                                                                                                                                                s0 = null;
                                                                                                                                                                                                                                if (peg$silentFails === 0) { peg$fail(peg$c365); }
                                                                                                                                                                                                                              }
                                                                                                                                                                                                                              if (s0 === null) {
                                                                                                                                                                                                                                if (input.substr(peg$currPos, 2) === peg$c366) {
                                                                                                                                                                                                                                  s0 = peg$c366;
                                                                                                                                                                                                                                  peg$currPos += 2;
                                                                                                                                                                                                                                } else {
                                                                                                                                                                                                                                  s0 = null;
                                                                                                                                                                                                                                  if (peg$silentFails === 0) { peg$fail(peg$c367); }
                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                if (s0 === null) {
                                                                                                                                                                                                                                  if (input.substr(peg$currPos, 2) === peg$c368) {
                                                                                                                                                                                                                                    s0 = peg$c368;
                                                                                                                                                                                                                                    peg$currPos += 2;
                                                                                                                                                                                                                                  } else {
                                                                                                                                                                                                                                    s0 = null;
                                                                                                                                                                                                                                    if (peg$silentFails === 0) { peg$fail(peg$c369); }
                                                                                                                                                                                                                                  }
                                                                                                                                                                                                                                  if (s0 === null) {
                                                                                                                                                                                                                                    if (input.substr(peg$currPos, 2) === peg$c370) {
                                                                                                                                                                                                                                      s0 = peg$c370;
                                                                                                                                                                                                                                      peg$currPos += 2;
                                                                                                                                                                                                                                    } else {
                                                                                                                                                                                                                                      s0 = null;
                                                                                                                                                                                                                                      if (peg$silentFails === 0) { peg$fail(peg$c371); }
                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                    if (s0 === null) {
                                                                                                                                                                                                                                      if (input.substr(peg$currPos, 2) === peg$c372) {
                                                                                                                                                                                                                                        s0 = peg$c372;
                                                                                                                                                                                                                                        peg$currPos += 2;
                                                                                                                                                                                                                                      } else {
                                                                                                                                                                                                                                        s0 = null;
                                                                                                                                                                                                                                        if (peg$silentFails === 0) { peg$fail(peg$c373); }
                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                      if (s0 === null) {
                                                                                                                                                                                                                                        if (input.substr(peg$currPos, 2) === peg$c374) {
                                                                                                                                                                                                                                          s0 = peg$c374;
                                                                                                                                                                                                                                          peg$currPos += 2;
                                                                                                                                                                                                                                        } else {
                                                                                                                                                                                                                                          s0 = null;
                                                                                                                                                                                                                                          if (peg$silentFails === 0) { peg$fail(peg$c375); }
                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                        if (s0 === null) {
                                                                                                                                                                                                                                          if (input.substr(peg$currPos, 2) === peg$c376) {
                                                                                                                                                                                                                                            s0 = peg$c376;
                                                                                                                                                                                                                                            peg$currPos += 2;
                                                                                                                                                                                                                                          } else {
                                                                                                                                                                                                                                            s0 = null;
                                                                                                                                                                                                                                            if (peg$silentFails === 0) { peg$fail(peg$c377); }
                                                                                                                                                                                                                                          }
                                                                                                                                                                                                                                          if (s0 === null) {
                                                                                                                                                                                                                                            if (input.substr(peg$currPos, 2) === peg$c378) {
                                                                                                                                                                                                                                              s0 = peg$c378;
                                                                                                                                                                                                                                              peg$currPos += 2;
                                                                                                                                                                                                                                            } else {
                                                                                                                                                                                                                                              s0 = null;
                                                                                                                                                                                                                                              if (peg$silentFails === 0) { peg$fail(peg$c379); }
                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                            if (s0 === null) {
                                                                                                                                                                                                                                              if (input.substr(peg$currPos, 2) === peg$c380) {
                                                                                                                                                                                                                                                s0 = peg$c380;
                                                                                                                                                                                                                                                peg$currPos += 2;
                                                                                                                                                                                                                                              } else {
                                                                                                                                                                                                                                                s0 = null;
                                                                                                                                                                                                                                                if (peg$silentFails === 0) { peg$fail(peg$c381); }
                                                                                                                                                                                                                                              }
                                                                                                                                                                                                                                              if (s0 === null) {
                                                                                                                                                                                                                                                if (input.substr(peg$currPos, 2) === peg$c382) {
                                                                                                                                                                                                                                                  s0 = peg$c382;
                                                                                                                                                                                                                                                  peg$currPos += 2;
                                                                                                                                                                                                                                                } else {
                                                                                                                                                                                                                                                  s0 = null;
                                                                                                                                                                                                                                                  if (peg$silentFails === 0) { peg$fail(peg$c383); }
                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                if (s0 === null) {
                                                                                                                                                                                                                                                  if (input.substr(peg$currPos, 2) === peg$c384) {
                                                                                                                                                                                                                                                    s0 = peg$c384;
                                                                                                                                                                                                                                                    peg$currPos += 2;
                                                                                                                                                                                                                                                  } else {
                                                                                                                                                                                                                                                    s0 = null;
                                                                                                                                                                                                                                                    if (peg$silentFails === 0) { peg$fail(peg$c385); }
                                                                                                                                                                                                                                                  }
                                                                                                                                                                                                                                                  if (s0 === null) {
                                                                                                                                                                                                                                                    if (input.substr(peg$currPos, 2) === peg$c386) {
                                                                                                                                                                                                                                                      s0 = peg$c386;
                                                                                                                                                                                                                                                      peg$currPos += 2;
                                                                                                                                                                                                                                                    } else {
                                                                                                                                                                                                                                                      s0 = null;
                                                                                                                                                                                                                                                      if (peg$silentFails === 0) { peg$fail(peg$c387); }
                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                    if (s0 === null) {
                                                                                                                                                                                                                                                      if (input.substr(peg$currPos, 2) === peg$c388) {
                                                                                                                                                                                                                                                        s0 = peg$c388;
                                                                                                                                                                                                                                                        peg$currPos += 2;
                                                                                                                                                                                                                                                      } else {
                                                                                                                                                                                                                                                        s0 = null;
                                                                                                                                                                                                                                                        if (peg$silentFails === 0) { peg$fail(peg$c389); }
                                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                                      if (s0 === null) {
                                                                                                                                                                                                                                                        if (input.substr(peg$currPos, 2) === peg$c390) {
                                                                                                                                                                                                                                                          s0 = peg$c390;
                                                                                                                                                                                                                                                          peg$currPos += 2;
                                                                                                                                                                                                                                                        } else {
                                                                                                                                                                                                                                                          s0 = null;
                                                                                                                                                                                                                                                          if (peg$silentFails === 0) { peg$fail(peg$c391); }
                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                        if (s0 === null) {
                                                                                                                                                                                                                                                          if (input.substr(peg$currPos, 2) === peg$c392) {
                                                                                                                                                                                                                                                            s0 = peg$c392;
                                                                                                                                                                                                                                                            peg$currPos += 2;
                                                                                                                                                                                                                                                          } else {
                                                                                                                                                                                                                                                            s0 = null;
                                                                                                                                                                                                                                                            if (peg$silentFails === 0) { peg$fail(peg$c393); }
                                                                                                                                                                                                                                                          }
                                                                                                                                                                                                                                                          if (s0 === null) {
                                                                                                                                                                                                                                                            if (input.substr(peg$currPos, 2) === peg$c394) {
                                                                                                                                                                                                                                                              s0 = peg$c394;
                                                                                                                                                                                                                                                              peg$currPos += 2;
                                                                                                                                                                                                                                                            } else {
                                                                                                                                                                                                                                                              s0 = null;
                                                                                                                                                                                                                                                              if (peg$silentFails === 0) { peg$fail(peg$c395); }
                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                            if (s0 === null) {
                                                                                                                                                                                                                                                              if (input.charCodeAt(peg$currPos) === 117) {
                                                                                                                                                                                                                                                                s0 = peg$c396;
                                                                                                                                                                                                                                                                peg$currPos++;
                                                                                                                                                                                                                                                              } else {
                                                                                                                                                                                                                                                                s0 = null;
                                                                                                                                                                                                                                                                if (peg$silentFails === 0) { peg$fail(peg$c397); }
                                                                                                                                                                                                                                                              }
                                                                                                                                                                                                                                                              if (s0 === null) {
                                                                                                                                                                                                                                                                if (input.charCodeAt(peg$currPos) === 115) {
                                                                                                                                                                                                                                                                  s0 = peg$c398;
                                                                                                                                                                                                                                                                  peg$currPos++;
                                                                                                                                                                                                                                                                } else {
                                                                                                                                                                                                                                                                  s0 = null;
                                                                                                                                                                                                                                                                  if (peg$silentFails === 0) { peg$fail(peg$c399); }
                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                if (s0 === null) {
                                                                                                                                                                                                                                                                  if (input.charCodeAt(peg$currPos) === 113) {
                                                                                                                                                                                                                                                                    s0 = peg$c400;
                                                                                                                                                                                                                                                                    peg$currPos++;
                                                                                                                                                                                                                                                                  } else {
                                                                                                                                                                                                                                                                    s0 = null;
                                                                                                                                                                                                                                                                    if (peg$silentFails === 0) { peg$fail(peg$c401); }
                                                                                                                                                                                                                                                                  }
                                                                                                                                                                                                                                                                  if (s0 === null) {
                                                                                                                                                                                                                                                                    if (input.charCodeAt(peg$currPos) === 112) {
                                                                                                                                                                                                                                                                      s0 = peg$c402;
                                                                                                                                                                                                                                                                      peg$currPos++;
                                                                                                                                                                                                                                                                    } else {
                                                                                                                                                                                                                                                                      s0 = null;
                                                                                                                                                                                                                                                                      if (peg$silentFails === 0) { peg$fail(peg$c403); }
                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                    if (s0 === null) {
                                                                                                                                                                                                                                                                      if (input.charCodeAt(peg$currPos) === 105) {
                                                                                                                                                                                                                                                                        s0 = peg$c404;
                                                                                                                                                                                                                                                                        peg$currPos++;
                                                                                                                                                                                                                                                                      } else {
                                                                                                                                                                                                                                                                        s0 = null;
                                                                                                                                                                                                                                                                        if (peg$silentFails === 0) { peg$fail(peg$c405); }
                                                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                                                      if (s0 === null) {
                                                                                                                                                                                                                                                                        if (input.charCodeAt(peg$currPos) === 98) {
                                                                                                                                                                                                                                                                          s0 = peg$c406;
                                                                                                                                                                                                                                                                          peg$currPos++;
                                                                                                                                                                                                                                                                        } else {
                                                                                                                                                                                                                                                                          s0 = null;
                                                                                                                                                                                                                                                                          if (peg$silentFails === 0) { peg$fail(peg$c407); }
                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                        if (s0 === null) {
                                                                                                                                                                                                                                                                          if (input.charCodeAt(peg$currPos) === 97) {
                                                                                                                                                                                                                                                                            s0 = peg$c408;
                                                                                                                                                                                                                                                                            peg$currPos++;
                                                                                                                                                                                                                                                                          } else {
                                                                                                                                                                                                                                                                            s0 = null;
                                                                                                                                                                                                                                                                            if (peg$silentFails === 0) { peg$fail(peg$c409); }
                                                                                                                                                                                                                                                                          }
                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                  }
                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                              }
                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                          }
                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                  }
                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                              }
                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                          }
                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                  }
                                                                                                                                                                                                                                }
                                                                                                                                                                                                                              }
                                                                                                                                                                                                                            }
                                                                                                                                                                                                                          }
                                                                                                                                                                                                                        }
                                                                                                                                                                                                                      }
                                                                                                                                                                                                                    }
                                                                                                                                                                                                                  }
                                                                                                                                                                                                                }
                                                                                                                                                                                                              }
                                                                                                                                                                                                            }
                                                                                                                                                                                                          }
                                                                                                                                                                                                        }
                                                                                                                                                                                                      }
                                                                                                                                                                                                    }
                                                                                                                                                                                                  }
                                                                                                                                                                                                }
                                                                                                                                                                                              }
                                                                                                                                                                                            }
                                                                                                                                                                                          }
                                                                                                                                                                                        }
                                                                                                                                                                                      }
                                                                                                                                                                                    }
                                                                                                                                                                                  }
                                                                                                                                                                                }
                                                                                                                                                                              }
                                                                                                                                                                            }
                                                                                                                                                                          }
                                                                                                                                                                        }
                                                                                                                                                                      }
                                                                                                                                                                    }
                                                                                                                                                                  }
                                                                                                                                                                }
                                                                                                                                                              }
                                                                                                                                                            }
                                                                                                                                                          }
                                                                                                                                                        }
                                                                                                                                                      }
                                                                                                                                                    }
                                                                                                                                                  }
                                                                                                                                                }
                                                                                                                                              }
                                                                                                                                            }
                                                                                                                                          }
                                                                                                                                        }
                                                                                                                                      }
                                                                                                                                    }
                                                                                                                                  }
                                                                                                                                }
                                                                                                                              }
                                                                                                                            }
                                                                                                                          }
                                                                                                                        }
                                                                                                                      }
                                                                                                                    }
                                                                                                                  }
                                                                                                                }
                                                                                                              }
                                                                                                            }
                                                                                                          }
                                                                                                        }
                                                                                                      }
                                                                                                    }
                                                                                                  }
                                                                                                }
                                                                                              }
                                                                                            }
                                                                                          }
                                                                                        }
                                                                                      }
                                                                                    }
                                                                                  }
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      peg$silentFails--;
      if (s0 === null) {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c145); }
      }

      return s0;
    }

    function peg$parseknownEvent() {
      var s0, s1;

      peg$silentFails++;
      if (input.substr(peg$currPos, 10) === peg$c411) {
        s0 = peg$c411;
        peg$currPos += 10;
      } else {
        s0 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c412); }
      }
      if (s0 === null) {
        if (input.substr(peg$currPos, 9) === peg$c413) {
          s0 = peg$c413;
          peg$currPos += 9;
        } else {
          s0 = null;
          if (peg$silentFails === 0) { peg$fail(peg$c414); }
        }
        if (s0 === null) {
          if (input.substr(peg$currPos, 8) === peg$c415) {
            s0 = peg$c415;
            peg$currPos += 8;
          } else {
            s0 = null;
            if (peg$silentFails === 0) { peg$fail(peg$c416); }
          }
          if (s0 === null) {
            if (input.substr(peg$currPos, 11) === peg$c417) {
              s0 = peg$c417;
              peg$currPos += 11;
            } else {
              s0 = null;
              if (peg$silentFails === 0) { peg$fail(peg$c418); }
            }
            if (s0 === null) {
              if (input.substr(peg$currPos, 7) === peg$c419) {
                s0 = peg$c419;
                peg$currPos += 7;
              } else {
                s0 = null;
                if (peg$silentFails === 0) { peg$fail(peg$c420); }
              }
              if (s0 === null) {
                if (input.substr(peg$currPos, 5) === peg$c421) {
                  s0 = peg$c421;
                  peg$currPos += 5;
                } else {
                  s0 = null;
                  if (peg$silentFails === 0) { peg$fail(peg$c422); }
                }
                if (s0 === null) {
                  if (input.substr(peg$currPos, 8) === peg$c423) {
                    s0 = peg$c423;
                    peg$currPos += 8;
                  } else {
                    s0 = null;
                    if (peg$silentFails === 0) { peg$fail(peg$c424); }
                  }
                  if (s0 === null) {
                    if (input.substr(peg$currPos, 9) === peg$c425) {
                      s0 = peg$c425;
                      peg$currPos += 9;
                    } else {
                      s0 = null;
                      if (peg$silentFails === 0) { peg$fail(peg$c426); }
                    }
                    if (s0 === null) {
                      if (input.substr(peg$currPos, 7) === peg$c427) {
                        s0 = peg$c427;
                        peg$currPos += 7;
                      } else {
                        s0 = null;
                        if (peg$silentFails === 0) { peg$fail(peg$c428); }
                      }
                      if (s0 === null) {
                        if (input.substr(peg$currPos, 11) === peg$c429) {
                          s0 = peg$c429;
                          peg$currPos += 11;
                        } else {
                          s0 = null;
                          if (peg$silentFails === 0) { peg$fail(peg$c430); }
                        }
                        if (s0 === null) {
                          if (input.substr(peg$currPos, 5) === peg$c431) {
                            s0 = peg$c431;
                            peg$currPos += 5;
                          } else {
                            s0 = null;
                            if (peg$silentFails === 0) { peg$fail(peg$c432); }
                          }
                          if (s0 === null) {
                            if (input.substr(peg$currPos, 11) === peg$c433) {
                              s0 = peg$c433;
                              peg$currPos += 11;
                            } else {
                              s0 = null;
                              if (peg$silentFails === 0) { peg$fail(peg$c434); }
                            }
                            if (s0 === null) {
                              if (input.substr(peg$currPos, 9) === peg$c435) {
                                s0 = peg$c435;
                                peg$currPos += 9;
                              } else {
                                s0 = null;
                                if (peg$silentFails === 0) { peg$fail(peg$c436); }
                              }
                              if (s0 === null) {
                                if (input.substr(peg$currPos, 7) === peg$c437) {
                                  s0 = peg$c437;
                                  peg$currPos += 7;
                                } else {
                                  s0 = null;
                                  if (peg$silentFails === 0) { peg$fail(peg$c438); }
                                }
                                if (s0 === null) {
                                  if (input.substr(peg$currPos, 8) === peg$c439) {
                                    s0 = peg$c439;
                                    peg$currPos += 8;
                                  } else {
                                    s0 = null;
                                    if (peg$silentFails === 0) { peg$fail(peg$c440); }
                                  }
                                  if (s0 === null) {
                                    if (input.substr(peg$currPos, 10) === peg$c441) {
                                      s0 = peg$c441;
                                      peg$currPos += 10;
                                    } else {
                                      s0 = null;
                                      if (peg$silentFails === 0) { peg$fail(peg$c442); }
                                    }
                                    if (s0 === null) {
                                      if (input.substr(peg$currPos, 10) === peg$c443) {
                                        s0 = peg$c443;
                                        peg$currPos += 10;
                                      } else {
                                        s0 = null;
                                        if (peg$silentFails === 0) { peg$fail(peg$c444); }
                                      }
                                      if (s0 === null) {
                                        if (input.substr(peg$currPos, 6) === peg$c445) {
                                          s0 = peg$c445;
                                          peg$currPos += 6;
                                        } else {
                                          s0 = null;
                                          if (peg$silentFails === 0) { peg$fail(peg$c446); }
                                        }
                                        if (s0 === null) {
                                          if (input.substr(peg$currPos, 5) === peg$c262) {
                                            s0 = peg$c262;
                                            peg$currPos += 5;
                                          } else {
                                            s0 = null;
                                            if (peg$silentFails === 0) { peg$fail(peg$c263); }
                                          }
                                          if (s0 === null) {
                                            if (input.substr(peg$currPos, 6) === peg$c447) {
                                              s0 = peg$c447;
                                              peg$currPos += 6;
                                            } else {
                                              s0 = null;
                                              if (peg$silentFails === 0) { peg$fail(peg$c448); }
                                            }
                                            if (s0 === null) {
                                              if (input.substr(peg$currPos, 9) === peg$c449) {
                                                s0 = peg$c449;
                                                peg$currPos += 9;
                                              } else {
                                                s0 = null;
                                                if (peg$silentFails === 0) { peg$fail(peg$c450); }
                                              }
                                              if (s0 === null) {
                                                if (input.substr(peg$currPos, 4) === peg$c451) {
                                                  s0 = peg$c451;
                                                  peg$currPos += 4;
                                                } else {
                                                  s0 = null;
                                                  if (peg$silentFails === 0) { peg$fail(peg$c452); }
                                                }
                                                if (s0 === null) {
                                                  if (input.substr(peg$currPos, 9) === peg$c453) {
                                                    s0 = peg$c453;
                                                    peg$currPos += 9;
                                                  } else {
                                                    s0 = null;
                                                    if (peg$silentFails === 0) { peg$fail(peg$c454); }
                                                  }
                                                  if (s0 === null) {
                                                    if (input.substr(peg$currPos, 9) === peg$c455) {
                                                      s0 = peg$c455;
                                                      peg$currPos += 9;
                                                    } else {
                                                      s0 = null;
                                                      if (peg$silentFails === 0) { peg$fail(peg$c456); }
                                                    }
                                                    if (s0 === null) {
                                                      if (input.substr(peg$currPos, 8) === peg$c457) {
                                                        s0 = peg$c457;
                                                        peg$currPos += 8;
                                                      } else {
                                                        s0 = null;
                                                        if (peg$silentFails === 0) { peg$fail(peg$c458); }
                                                      }
                                                      if (s0 === null) {
                                                        if (input.substr(peg$currPos, 4) === peg$c459) {
                                                          s0 = peg$c459;
                                                          peg$currPos += 4;
                                                        } else {
                                                          s0 = null;
                                                          if (peg$silentFails === 0) { peg$fail(peg$c460); }
                                                        }
                                                        if (s0 === null) {
                                                          if (input.substr(peg$currPos, 7) === peg$c461) {
                                                            s0 = peg$c461;
                                                            peg$currPos += 7;
                                                          } else {
                                                            s0 = null;
                                                            if (peg$silentFails === 0) { peg$fail(peg$c462); }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      peg$silentFails--;
      if (s0 === null) {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c410); }
      }

      return s0;
    }

    function peg$parseINDENT() {
      var s0, s1;

      peg$silentFails++;
      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 61423) {
        s1 = peg$c464;
        peg$currPos++;
      } else {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c465); }
      }
      if (s1 !== null) {
        peg$reportedPos = s0;
        s1 = peg$c466();
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
        if (peg$silentFails === 0) { peg$fail(peg$c463); }
      }

      return s0;
    }

    function peg$parseDEDENT() {
      var s0, s1;

      peg$silentFails++;
      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 61438) {
        s1 = peg$c468;
        peg$currPos++;
      } else {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c469); }
      }
      if (s1 !== null) {
        peg$reportedPos = s0;
        s1 = peg$c466();
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
        if (peg$silentFails === 0) { peg$fail(peg$c467); }
      }

      return s0;
    }

    function peg$parseTERM() {
      var s0, s1, s2;

      peg$silentFails++;
      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 10) {
        s1 = peg$c471;
        peg$currPos++;
      } else {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c472); }
      }
      if (s1 !== null) {
        if (input.charCodeAt(peg$currPos) === 61439) {
          s2 = peg$c473;
          peg$currPos++;
        } else {
          s2 = null;
          if (peg$silentFails === 0) { peg$fail(peg$c474); }
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
        if (peg$silentFails === 0) { peg$fail(peg$c470); }
      }

      return s0;
    }

    function peg$parse__() {
      var s0, s1;

      peg$silentFails++;
      s0 = [];
      s1 = peg$parsewhitespace();
      if (s1 !== null) {
        while (s1 !== null) {
          s0.push(s1);
          s1 = peg$parsewhitespace();
        }
      } else {
        s0 = peg$c0;
      }
      peg$silentFails--;
      if (s0 === null) {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c475); }
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
        if (peg$silentFails === 0) { peg$fail(peg$c476); }
      }

      return s0;
    }

    function peg$parsewhitespace() {
      var s0, s1;

      peg$silentFails++;
      if (peg$c478.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c479); }
      }
      peg$silentFails--;
      if (s0 === null) {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c477); }
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
          if (peg$silentFails === 0) { peg$fail(peg$c90); }
        }
        if (s2 !== null) {
          peg$reportedPos = s0;
          s1 = peg$c91(s2);
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
  var DEDENT, INDENT, TERM, anyWhitespaceAndNewlinesTouchingEOF, any_whitespaceFollowedByNewlines_, processInput, ws;

  ws = '\\t\\x0B\\f \\xA0\\u1680\\u180E\\u2000-\\u200A\\u202F\\u205F\\u3000\\uFEFF';

  INDENT = '\uEFEF';

  DEDENT = '\uEFFE';

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
      var b, indent, lines, message, newIndent, tok;
      if (!isEnd) {
        this.ss.concat(data);
        this.discard(any_whitespaceFollowedByNewlines_);
      }
      while (!this.ss.eos()) {
        switch (this.context.peek()) {
          case null:
          case INDENT:
            if (this.ss.bol() || this.discard(any_whitespaceFollowedByNewlines_)) {
              if (this.base != null) {
                if ((this.discard(this.base)) == null) {
                  throw new Error("inconsistent base indentation");
                }
              } else {
                b = this.discard(RegExp("[" + ws + "]*"));
                this.base = RegExp("" + b);
              }
              if (this.indents.length === 0) {
                if (newIndent = this.discard(RegExp("[" + ws + "]+"))) {
                  this.indents.push(newIndent);
                  this.context.observe(INDENT);
                  this.p(INDENT);
                }
              } else {
                indent = this.indents[this.indents.length - 1];
                if (newIndent = this.discard(RegExp("(" + indent + "[" + ws + "]+)"))) {
                  this.indents.push(newIndent);
                  this.context.observe(INDENT);
                  this.p(INDENT);
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
                  if (this.ss.check(RegExp("[" + ws + "]+"))) {
                    lines = this.ss.str.substr(0, this.ss.pos).split(/\n/) || [''];
                    message = "Invalid indentation";
                    Emblem.throwCompileError(lines.length, message);
                  }
                }
              }
            }
            this.scan(/[^\n\\]+/);
            if (tok = this.discard(/\//)) {
              this.context.observe(tok);
            } else if (this.scan(/\n/)) {
              this.p("" + TERM);
            }
            this.discard(any_whitespaceFollowedByNewlines_);
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
  return Emblem.enableEmber();
});
;

    root.Emblem = Emblem;

  }(this));
