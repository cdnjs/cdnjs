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
var Emblem, Handlebars;

this.Emblem = {};

Emblem = this.Emblem;

Handlebars = this.Handlebars;

Emblem.VERSION = "0.0.3";

exports = Emblem;








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

        peg$c0 = [],
        peg$c1 = function(statements) {
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
                compressedStatements.push(new Handlebars.AST.ContentNode(buffer.join('')));
                buffer = [];
              }
              compressedStatements.push(node);
            }
          }

          if(buffer.length) { 
            compressedStatements.push(new Handlebars.AST.ContentNode(buffer.join(''))); 
          }

          return compressedStatements;
        },
        peg$c2 = null,
        peg$c3 = "",
        peg$c4 = "else",
        peg$c5 = "\"else\"",
        peg$c6 = function(c) {return c;},
        peg$c7 = function(c, i) { 
          return new Handlebars.AST.ProgramNode(c, i || []);
        },
        peg$c8 = function(m) { 
          return [m]; 
        },
        peg$c9 = "/",
        peg$c10 = "\"/\"",
        peg$c11 = function() { return []; },
        peg$c12 = /^[A-Z]/,
        peg$c13 = "[A-Z]",
        peg$c14 = function(ret) {
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
        peg$c15 = function(h, c) { 
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
        peg$c16 = " ",
        peg$c17 = "\" \"",
        peg$c18 = function(h, c, multilineContent) { 
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
        peg$c19 = function(mustacheNode, block) { 
          if(!block) return mustacheNode;
          var programNode = block[1];
          return new Handlebars.AST.BlockNode(mustacheNode, programNode, programNode.inverse, mustacheNode.id);
        },
        peg$c20 = function(e, ret) {
          var mustache = ret.mustache || ret;
          mustache.escaped = e;
          return ret;
        },
        peg$c21 = function(path, tm, params, hash) { 
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
            hash = hash || new Handlebars.AST.HashNode([]);
            for(var k in attrs) {
              if(!attrs.hasOwnProperty(k)) continue;
              hash.pairs.push([k, new Handlebars.AST.StringNode(attrs[k].join(' '))]);
            }
          }

          actualParams.unshift(path);

          var mustacheNode = new Handlebars.AST.MustacheNode(actualParams, hash); 

          if(tm == '!') {
            return unshiftParam(mustacheNode, 'unbound');
          } else if(tm == '?') {
            return unshiftParam(mustacheNode, 'if');
          } else if(tm == '^') {
            return unshiftParam(mustacheNode, 'unless');
          }

          return mustacheNode;
        },
        peg$c22 = function(p, m) { 
          var ret = new String(p);
          ret.trailingModifier = m;
          return ret;
        },
        peg$c23 = function(t) { return ['tagName', t]; },
        peg$c24 = function(i) { return ['elementId', i]; },
        peg$c25 = function(c) { return ['class', c]; },
        peg$c26 = function(id, classes) { return [id, classes]; },
        peg$c27 = function(classes) { return [null, classes]; },
        peg$c28 = function(h) { return h; },
        peg$c29 = "TrailingModifier",
        peg$c30 = /^[!?*\^]/,
        peg$c31 = "[!?*\\^]",
        peg$c32 = function(h) { return new Handlebars.AST.HashNode(h); },
        peg$c33 = "PathIdent",
        peg$c34 = "..",
        peg$c35 = "\"..\"",
        peg$c36 = ".",
        peg$c37 = "\".\"",
        peg$c38 = /^[a-zA-Z0-9_$\-]/,
        peg$c39 = "[a-zA-Z0-9_$\\-]",
        peg$c40 = "=",
        peg$c41 = "\"=\"",
        peg$c42 = function(s) { return s; },
        peg$c43 = "Key",
        peg$c44 = function(h) { return [h[0], h[2]]; },
        peg$c45 = function(p) { return p; },
        peg$c46 = function(first, tail) {
          var ret = [first];
          for(var i = 0; i < tail.length; ++i) {
            //ret = ret.concat(tail[i]);
            ret.push(tail[i]);
          }
          return ret;
        },
        peg$c47 = "PathSeparator",
        peg$c48 = /^[\/.]/,
        peg$c49 = "[\\/.]",
        peg$c50 = function(v) { return new Handlebars.AST.IdNode(v); },
        peg$c51 = function(v) { return new Handlebars.AST.StringNode(v); },
        peg$c52 = function(v) { return new Handlebars.AST.IntegerNode(v); },
        peg$c53 = function(v) { return new Handlebars.AST.BooleanNode(v); },
        peg$c54 = "Boolean",
        peg$c55 = "true",
        peg$c56 = "\"true\"",
        peg$c57 = "false",
        peg$c58 = "\"false\"",
        peg$c59 = "Integer",
        peg$c60 = /^[0-9]/,
        peg$c61 = "[0-9]",
        peg$c62 = function(s) { return parseInt(s); },
        peg$c63 = "\"",
        peg$c64 = "\"\\\"\"",
        peg$c65 = "'",
        peg$c66 = "\"'\"",
        peg$c67 = function(p) { return p[1]; },
        peg$c68 = /^[^"}]/,
        peg$c69 = "[^\"}]",
        peg$c70 = /^[^'}]/,
        peg$c71 = "[^'}]",
        peg$c72 = /^[A-Za-z]/,
        peg$c73 = "[A-Za-z]",
        peg$c74 = function(m) { return [m]; },
        peg$c75 = "|",
        peg$c76 = "\"|\"",
        peg$c77 = "<",
        peg$c78 = "\"<\"",
        peg$c79 = function(nodes, indentedNodes) { 
          if(indentedNodes) {
            indentedNodes = indentedNodes[1];
            for(var i = 0; i < indentedNodes.length; ++i) {
              nodes = nodes.concat(indentedNodes[i]);
            }
          }
          return nodes; 
        },
        peg$c80 = function(first, tail) {
          var ret = [];
          if(first) { ret.push(first); } 
          for(var i = 0; i < tail.length; ++i) {
            var t = tail[i];
            ret.push(t[0]);
            if(t[1]) { ret.push(t[1]); }
          }
          return ret;
        },
        peg$c81 = function(m) { m.escaped = true; return m; },
        peg$c82 = function(m) { m.escaped = false; return m; },
        peg$c83 = function(a) { return new Handlebars.AST.ContentNode(a.join('')); },
        peg$c84 = "any character",
        peg$c85 = function(c) { return c; },
        peg$c86 = "SingleMustacheOpen",
        peg$c87 = "{",
        peg$c88 = "\"{\"",
        peg$c89 = "DoubleMustacheOpen",
        peg$c90 = "{{",
        peg$c91 = "\"{{\"",
        peg$c92 = "TripleMustacheOpen",
        peg$c93 = "{{{",
        peg$c94 = "\"{{{\"",
        peg$c95 = "SingleMustacheClose",
        peg$c96 = "}",
        peg$c97 = "\"}\"",
        peg$c98 = "DoubleMustacheClose",
        peg$c99 = "}}",
        peg$c100 = "\"}}\"",
        peg$c101 = "TripleMustacheClose",
        peg$c102 = "}}}",
        peg$c103 = "\"}}}\"",
        peg$c104 = "InterpolationOpen",
        peg$c105 = "#{",
        peg$c106 = "\"#{\"",
        peg$c107 = "InterpolationClose",
        peg$c108 = "==",
        peg$c109 = "\"==\"",
        peg$c110 = function() { return false; },
        peg$c111 = function() { return true; },
        peg$c112 = function(h, s, m, f) { return [h, s, m, f]; },
        peg$c113 = function(s, m, f) { return [null, s, m, f] },
        peg$c114 = function(h) {
          var tagName = h[0] || 'div',
              shorthandAttributes = h[1] || [],
              inTagMustaches = h[2],
              fullAttributes = h[3],
              id = shorthandAttributes[0],
              classes = shorthandAttributes[1];

          var tagOpenContent = [];
          tagOpenContent.push(new Handlebars.AST.ContentNode('<' + tagName));

          if(id) {
            tagOpenContent.push(new Handlebars.AST.ContentNode(' id="' + id + '"'));
          }

          if(classes && classes.length) {
            tagOpenContent.push(new Handlebars.AST.ContentNode(' class="' + classes.join(' ') + '"'));
          }

          // Pad in tag mustaches with spaces.
          for(var i = 0; i < inTagMustaches.length; ++i) {
            tagOpenContent.push(new Handlebars.AST.ContentNode(' '));
            tagOpenContent.push(inTagMustaches[i]);
          }

          for(var i = 0; i < fullAttributes.length; ++i) {
            tagOpenContent = tagOpenContent.concat(fullAttributes[i]);
          }

          if(SELF_CLOSING_TAG[tagName]) {
            tagOpenContent.push(new Handlebars.AST.ContentNode(' />'));
            return [tagOpenContent];
          } else {
            tagOpenContent.push(new Handlebars.AST.ContentNode('>'));
            return [tagOpenContent, new Handlebars.AST.ContentNode('</' + tagName + '>')];
          }
        },
        peg$c115 = function(a) {
          return [new Handlebars.AST.ContentNode(' '), a]; 
        },
        peg$c116 = /^[A-Za-z.:0-9]/,
        peg$c117 = "[A-Za-z.:0-9]",
        peg$c118 = function(id) { return new Handlebars.AST.MustacheNode([id]); },
        peg$c119 = function(event, mustacheNode) {
          // Unshift the action helper and augment the hash
          return unshiftParam(mustacheNode, 'action', [['on', new Handlebars.AST.StringNode(event)]]);
        },
        peg$c120 = function(key, value) { 
          var hashNode = new Handlebars.AST.HashNode([[key, new Handlebars.AST.StringNode(value)]]);
          var params = [new Handlebars.AST.IdNode(['bindAttr'])];

          return new Handlebars.AST.MustacheNode(params, hashNode);
        },
        peg$c121 = function(key, value) { 
          var s = key + '=' + '"' + value + '"';
          return new Handlebars.AST.ContentNode(s);
        },
        peg$c122 = "_",
        peg$c123 = "\"_\"",
        peg$c124 = "-",
        peg$c125 = "\"-\"",
        peg$c126 = "%",
        peg$c127 = "\"%\"",
        peg$c128 = "#",
        peg$c129 = "\"#\"",
        peg$c130 = function(c) { return c;},
        peg$c131 = "CSSIdentifier",
        peg$c132 = function(nmstart, nmchars) { return nmstart + nmchars; },
        peg$c133 = /^[_a-zA-Z0-9\-]/,
        peg$c134 = "[_a-zA-Z0-9\\-]",
        peg$c135 = /^[_a-zA-Z]/,
        peg$c136 = "[_a-zA-Z]",
        peg$c137 = /^[\x80-\xFF]/,
        peg$c138 = "[\\x80-\\xFF]",
        peg$c139 = "KnownHTMLTagName",
        peg$c140 = /^[:_a-zA-Z0-9\-]/,
        peg$c141 = "[:_a-zA-Z0-9\\-]",
        peg$c142 = "figcaption",
        peg$c143 = "\"figcaption\"",
        peg$c144 = "blockquote",
        peg$c145 = "\"blockquote\"",
        peg$c146 = "plaintext",
        peg$c147 = "\"plaintext\"",
        peg$c148 = "textarea",
        peg$c149 = "\"textarea\"",
        peg$c150 = "progress",
        peg$c151 = "\"progress\"",
        peg$c152 = "optgroup",
        peg$c153 = "\"optgroup\"",
        peg$c154 = "noscript",
        peg$c155 = "\"noscript\"",
        peg$c156 = "noframes",
        peg$c157 = "\"noframes\"",
        peg$c158 = "frameset",
        peg$c159 = "\"frameset\"",
        peg$c160 = "fieldset",
        peg$c161 = "\"fieldset\"",
        peg$c162 = "datalist",
        peg$c163 = "\"datalist\"",
        peg$c164 = "colgroup",
        peg$c165 = "\"colgroup\"",
        peg$c166 = "basefont",
        peg$c167 = "\"basefont\"",
        peg$c168 = "summary",
        peg$c169 = "\"summary\"",
        peg$c170 = "section",
        peg$c171 = "\"section\"",
        peg$c172 = "marquee",
        peg$c173 = "\"marquee\"",
        peg$c174 = "listing",
        peg$c175 = "\"listing\"",
        peg$c176 = "isindex",
        peg$c177 = "\"isindex\"",
        peg$c178 = "details",
        peg$c179 = "\"details\"",
        peg$c180 = "command",
        peg$c181 = "\"command\"",
        peg$c182 = "caption",
        peg$c183 = "\"caption\"",
        peg$c184 = "bgsound",
        peg$c185 = "\"bgsound\"",
        peg$c186 = "article",
        peg$c187 = "\"article\"",
        peg$c188 = "address",
        peg$c189 = "\"address\"",
        peg$c190 = "acronym",
        peg$c191 = "\"acronym\"",
        peg$c192 = "strong",
        peg$c193 = "\"strong\"",
        peg$c194 = "strike",
        peg$c195 = "\"strike\"",
        peg$c196 = "spacer",
        peg$c197 = "\"spacer\"",
        peg$c198 = "source",
        peg$c199 = "\"source\"",
        peg$c200 = "select",
        peg$c201 = "\"select\"",
        peg$c202 = "script",
        peg$c203 = "\"script\"",
        peg$c204 = "output",
        peg$c205 = "\"output\"",
        peg$c206 = "option",
        peg$c207 = "\"option\"",
        peg$c208 = "object",
        peg$c209 = "\"object\"",
        peg$c210 = "legend",
        peg$c211 = "\"legend\"",
        peg$c212 = "keygen",
        peg$c213 = "\"keygen\"",
        peg$c214 = "iframe",
        peg$c215 = "\"iframe\"",
        peg$c216 = "hgroup",
        peg$c217 = "\"hgroup\"",
        peg$c218 = "header",
        peg$c219 = "\"header\"",
        peg$c220 = "footer",
        peg$c221 = "\"footer\"",
        peg$c222 = "figure",
        peg$c223 = "\"figure\"",
        peg$c224 = "center",
        peg$c225 = "\"center\"",
        peg$c226 = "canvas",
        peg$c227 = "\"canvas\"",
        peg$c228 = "button",
        peg$c229 = "\"button\"",
        peg$c230 = "applet",
        peg$c231 = "\"applet\"",
        peg$c232 = "video",
        peg$c233 = "\"video\"",
        peg$c234 = "track",
        peg$c235 = "\"track\"",
        peg$c236 = "title",
        peg$c237 = "\"title\"",
        peg$c238 = "thead",
        peg$c239 = "\"thead\"",
        peg$c240 = "tfoot",
        peg$c241 = "\"tfoot\"",
        peg$c242 = "tbody",
        peg$c243 = "\"tbody\"",
        peg$c244 = "table",
        peg$c245 = "\"table\"",
        peg$c246 = "style",
        peg$c247 = "\"style\"",
        peg$c248 = "small",
        peg$c249 = "\"small\"",
        peg$c250 = "param",
        peg$c251 = "\"param\"",
        peg$c252 = "meter",
        peg$c253 = "\"meter\"",
        peg$c254 = "label",
        peg$c255 = "\"label\"",
        peg$c256 = "input",
        peg$c257 = "\"input\"",
        peg$c258 = "frame",
        peg$c259 = "\"frame\"",
        peg$c260 = "embed",
        peg$c261 = "\"embed\"",
        peg$c262 = "blink",
        peg$c263 = "\"blink\"",
        peg$c264 = "audio",
        peg$c265 = "\"audio\"",
        peg$c266 = "aside",
        peg$c267 = "\"aside\"",
        peg$c268 = "time",
        peg$c269 = "\"time\"",
        peg$c270 = "span",
        peg$c271 = "\"span\"",
        peg$c272 = "samp",
        peg$c273 = "\"samp\"",
        peg$c274 = "ruby",
        peg$c275 = "\"ruby\"",
        peg$c276 = "nobr",
        peg$c277 = "\"nobr\"",
        peg$c278 = "meta",
        peg$c279 = "\"meta\"",
        peg$c280 = "menu",
        peg$c281 = "\"menu\"",
        peg$c282 = "mark",
        peg$c283 = "\"mark\"",
        peg$c284 = "main",
        peg$c285 = "\"main\"",
        peg$c286 = "link",
        peg$c287 = "\"link\"",
        peg$c288 = "html",
        peg$c289 = "\"html\"",
        peg$c290 = "head",
        peg$c291 = "\"head\"",
        peg$c292 = "form",
        peg$c293 = "\"form\"",
        peg$c294 = "font",
        peg$c295 = "\"font\"",
        peg$c296 = "data",
        peg$c297 = "\"data\"",
        peg$c298 = "code",
        peg$c299 = "\"code\"",
        peg$c300 = "cite",
        peg$c301 = "\"cite\"",
        peg$c302 = "body",
        peg$c303 = "\"body\"",
        peg$c304 = "base",
        peg$c305 = "\"base\"",
        peg$c306 = "area",
        peg$c307 = "\"area\"",
        peg$c308 = "abbr",
        peg$c309 = "\"abbr\"",
        peg$c310 = "xmp",
        peg$c311 = "\"xmp\"",
        peg$c312 = "wbr",
        peg$c313 = "\"wbr\"",
        peg$c314 = "var",
        peg$c315 = "\"var\"",
        peg$c316 = "sup",
        peg$c317 = "\"sup\"",
        peg$c318 = "sub",
        peg$c319 = "\"sub\"",
        peg$c320 = "pre",
        peg$c321 = "\"pre\"",
        peg$c322 = "nav",
        peg$c323 = "\"nav\"",
        peg$c324 = "map",
        peg$c325 = "\"map\"",
        peg$c326 = "kbd",
        peg$c327 = "\"kbd\"",
        peg$c328 = "ins",
        peg$c329 = "\"ins\"",
        peg$c330 = "img",
        peg$c331 = "\"img\"",
        peg$c332 = "div",
        peg$c333 = "\"div\"",
        peg$c334 = "dir",
        peg$c335 = "\"dir\"",
        peg$c336 = "dfn",
        peg$c337 = "\"dfn\"",
        peg$c338 = "del",
        peg$c339 = "\"del\"",
        peg$c340 = "col",
        peg$c341 = "\"col\"",
        peg$c342 = "big",
        peg$c343 = "\"big\"",
        peg$c344 = "bdo",
        peg$c345 = "\"bdo\"",
        peg$c346 = "bdi",
        peg$c347 = "\"bdi\"",
        peg$c348 = "ul",
        peg$c349 = "\"ul\"",
        peg$c350 = "tt",
        peg$c351 = "\"tt\"",
        peg$c352 = "tr",
        peg$c353 = "\"tr\"",
        peg$c354 = "th",
        peg$c355 = "\"th\"",
        peg$c356 = "td",
        peg$c357 = "\"td\"",
        peg$c358 = "rt",
        peg$c359 = "\"rt\"",
        peg$c360 = "rp",
        peg$c361 = "\"rp\"",
        peg$c362 = "ol",
        peg$c363 = "\"ol\"",
        peg$c364 = "li",
        peg$c365 = "\"li\"",
        peg$c366 = "hr",
        peg$c367 = "\"hr\"",
        peg$c368 = "h6",
        peg$c369 = "\"h6\"",
        peg$c370 = "h5",
        peg$c371 = "\"h5\"",
        peg$c372 = "h4",
        peg$c373 = "\"h4\"",
        peg$c374 = "h3",
        peg$c375 = "\"h3\"",
        peg$c376 = "h2",
        peg$c377 = "\"h2\"",
        peg$c378 = "h1",
        peg$c379 = "\"h1\"",
        peg$c380 = "em",
        peg$c381 = "\"em\"",
        peg$c382 = "dt",
        peg$c383 = "\"dt\"",
        peg$c384 = "dl",
        peg$c385 = "\"dl\"",
        peg$c386 = "dd",
        peg$c387 = "\"dd\"",
        peg$c388 = "br",
        peg$c389 = "\"br\"",
        peg$c390 = "u",
        peg$c391 = "\"u\"",
        peg$c392 = "s",
        peg$c393 = "\"s\"",
        peg$c394 = "q",
        peg$c395 = "\"q\"",
        peg$c396 = "p",
        peg$c397 = "\"p\"",
        peg$c398 = "i",
        peg$c399 = "\"i\"",
        peg$c400 = "b",
        peg$c401 = "\"b\"",
        peg$c402 = "a",
        peg$c403 = "\"a\"",
        peg$c404 = "a JS event",
        peg$c405 = "touchStart",
        peg$c406 = "\"touchStart\"",
        peg$c407 = "touchMove",
        peg$c408 = "\"touchMove\"",
        peg$c409 = "touchEnd",
        peg$c410 = "\"touchEnd\"",
        peg$c411 = "touchCancel",
        peg$c412 = "\"touchCancel\"",
        peg$c413 = "keyDown",
        peg$c414 = "\"keyDown\"",
        peg$c415 = "keyUp",
        peg$c416 = "\"keyUp\"",
        peg$c417 = "keyPress",
        peg$c418 = "\"keyPress\"",
        peg$c419 = "mouseDown",
        peg$c420 = "\"mouseDown\"",
        peg$c421 = "mouseUp",
        peg$c422 = "\"mouseUp\"",
        peg$c423 = "contextMenu",
        peg$c424 = "\"contextMenu\"",
        peg$c425 = "click",
        peg$c426 = "\"click\"",
        peg$c427 = "doubleClick",
        peg$c428 = "\"doubleClick\"",
        peg$c429 = "mouseMove",
        peg$c430 = "\"mouseMove\"",
        peg$c431 = "focusIn",
        peg$c432 = "\"focusIn\"",
        peg$c433 = "focusOut",
        peg$c434 = "\"focusOut\"",
        peg$c435 = "mouseEnter",
        peg$c436 = "\"mouseEnter\"",
        peg$c437 = "mouseLeave",
        peg$c438 = "\"mouseLeave\"",
        peg$c439 = "submit",
        peg$c440 = "\"submit\"",
        peg$c441 = "change",
        peg$c442 = "\"change\"",
        peg$c443 = "dragStart",
        peg$c444 = "\"dragStart\"",
        peg$c445 = "drag",
        peg$c446 = "\"drag\"",
        peg$c447 = "dragEnter",
        peg$c448 = "\"dragEnter\"",
        peg$c449 = "dragLeave",
        peg$c450 = "\"dragLeave\"",
        peg$c451 = "dragOver",
        peg$c452 = "\"dragOver\"",
        peg$c453 = "drop",
        peg$c454 = "\"drop\"",
        peg$c455 = "dragEnd",
        peg$c456 = "\"dragEnd\"",
        peg$c457 = "INDENT",
        peg$c458 = "\uEFEF",
        peg$c459 = "\"\\uEFEF\"",
        peg$c460 = function() { return ''; },
        peg$c461 = "DEDENT",
        peg$c462 = "\uEFFE",
        peg$c463 = "\"\\uEFFE\"",
        peg$c464 = "LineEnd",
        peg$c465 = "\n",
        peg$c466 = "\"\\n\"",
        peg$c467 = "\uEFFF",
        peg$c468 = "\"\\uEFFF\"",
        peg$c469 = "RequiredWhitespace",
        peg$c470 = "OptionalWhitespace",
        peg$c471 = "InlineWhitespace",
        peg$c472 = /^[ \t]/,
        peg$c473 = "[ \\t]",

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

      s0 = peg$parsecontent();

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
        s1 = peg$c1(s1);
      }
      if (s1 === null) {
        peg$currPos = s0;
        s0 = s1;
      } else {
        s0 = s1;
      }

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
          if (input.substr(peg$currPos, 4) === peg$c4) {
            s4 = peg$c4;
            peg$currPos += 4;
          } else {
            s4 = null;
            if (peg$silentFails === 0) { peg$fail(peg$c5); }
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
                    s3 = peg$c6(s8);
                    if (s3 === null) {
                      peg$currPos = s2;
                      s2 = s3;
                    } else {
                      s2 = s3;
                    }
                  } else {
                    peg$currPos = s2;
                    s2 = peg$c2;
                  }
                } else {
                  peg$currPos = s2;
                  s2 = peg$c2;
                }
              } else {
                peg$currPos = s2;
                s2 = peg$c2;
              }
            } else {
              peg$currPos = s2;
              s2 = peg$c2;
            }
          } else {
            peg$currPos = s2;
            s2 = peg$c2;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$c2;
        }
        if (s2 === null) {
          s2 = peg$c3;
        }
        if (s2 !== null) {
          peg$reportedPos = s0;
          s1 = peg$c7(s1,s2);
          if (s1 === null) {
            peg$currPos = s0;
            s0 = s1;
          } else {
            s0 = s1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
      }

      return s0;
    }

    function peg$parsestatement() {
      var s0;

      s0 = peg$parsecomment();
      if (s0 === null) {
        s0 = peg$parsehtmlElement();
        if (s0 === null) {
          s0 = peg$parsetextLine();
          if (s0 === null) {
            s0 = peg$parsemustache();
          }
        }
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
        s1 = peg$c8(s1);
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
        s1 = peg$c9;
        peg$currPos++;
      } else {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c10); }
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
                  s7 = peg$c2;
                }
              } else {
                peg$currPos = s7;
                s7 = peg$c2;
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
                      s7 = peg$c2;
                    }
                  } else {
                    peg$currPos = s7;
                    s7 = peg$c2;
                  }
                }
              } else {
                s6 = peg$c2;
              }
              if (s6 !== null) {
                s7 = peg$parseDEDENT();
                if (s7 !== null) {
                  s5 = [s5, s6, s7];
                  s4 = s5;
                } else {
                  peg$currPos = s4;
                  s4 = peg$c2;
                }
              } else {
                peg$currPos = s4;
                s4 = peg$c2;
              }
            } else {
              peg$currPos = s4;
              s4 = peg$c2;
            }
            if (s4 === null) {
              s4 = peg$c3;
            }
            if (s4 !== null) {
              peg$reportedPos = s0;
              s1 = peg$c11();
              if (s1 === null) {
                peg$currPos = s0;
                s0 = s1;
              } else {
                s0 = s1;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
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
      if (peg$c12.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c13); }
      }
      peg$silentFails--;
      if (s2 !== null) {
        peg$currPos = s1;
        s1 = peg$c3;
      } else {
        s1 = peg$c2;
      }
      if (s1 !== null) {
        s2 = peg$parsemustacheMaybeBlock();
        if (s2 !== null) {
          peg$reportedPos = s0;
          s1 = peg$c14(s2);
          if (s1 === null) {
            peg$currPos = s0;
            s0 = s1;
          } else {
            s0 = s1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
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
                  s4 = peg$c2;
                }
              } else {
                peg$currPos = s4;
                s4 = peg$c2;
              }
            } else {
              peg$currPos = s4;
              s4 = peg$c2;
            }
            if (s4 === null) {
              s4 = peg$c3;
            }
            if (s4 !== null) {
              peg$reportedPos = s0;
              s1 = peg$c15(s1,s4);
              if (s1 === null) {
                peg$currPos = s0;
                s0 = s1;
              } else {
                s0 = s1;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
      }

      return s0;
    }

    function peg$parsehtmlElementWithInlineContent() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      s0 = peg$currPos;
      s1 = peg$parsehtmlTagAndOptionalAttributes();
      if (s1 !== null) {
        if (input.charCodeAt(peg$currPos) === 32) {
          s2 = peg$c16;
          peg$currPos++;
        } else {
          s2 = null;
          if (peg$silentFails === 0) { peg$fail(peg$c17); }
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
                s6 = peg$c2;
              }
              if (s6 !== null) {
                s7 = peg$parseDEDENT();
                if (s7 !== null) {
                  s5 = [s5, s6, s7];
                  s4 = s5;
                } else {
                  peg$currPos = s4;
                  s4 = peg$c2;
                }
              } else {
                peg$currPos = s4;
                s4 = peg$c2;
              }
            } else {
              peg$currPos = s4;
              s4 = peg$c2;
            }
            if (s4 === null) {
              s4 = peg$c3;
            }
            if (s4 !== null) {
              peg$reportedPos = s0;
              s1 = peg$c18(s1,s3,s4);
              if (s1 === null) {
                peg$currPos = s0;
                s0 = s1;
              } else {
                s0 = s1;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
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
                  s4 = peg$c2;
                }
              } else {
                peg$currPos = s4;
                s4 = peg$c2;
              }
            } else {
              peg$currPos = s4;
              s4 = peg$c2;
            }
            if (s4 === null) {
              s4 = peg$c3;
            }
            if (s4 !== null) {
              peg$reportedPos = s0;
              s1 = peg$c19(s1,s4);
              if (s1 === null) {
                peg$currPos = s0;
                s0 = s1;
              } else {
                s0 = s1;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
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
          s1 = peg$c20(s1,s2);
          if (s1 === null) {
            peg$currPos = s0;
            s0 = s1;
          } else {
            s0 = s1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
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
          s2 = peg$c3;
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
              s4 = peg$c3;
            }
            if (s4 !== null) {
              peg$reportedPos = s0;
              s1 = peg$c21(s1,s2,s3,s4);
              if (s1 === null) {
                peg$currPos = s0;
                s0 = s1;
              } else {
                s0 = s1;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
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
          s1 = peg$c22(s1,s2);
          if (s1 === null) {
            peg$currPos = s0;
            s0 = s1;
          } else {
            s0 = s1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
      }

      return s0;
    }

    function peg$parsehtmlMustacheAttribute() {
      var s0, s1;

      s0 = peg$currPos;
      s1 = peg$parsetagNameShorthand();
      if (s1 !== null) {
        peg$reportedPos = s0;
        s1 = peg$c23(s1);
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
          s1 = peg$c24(s1);
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
            s1 = peg$c25(s1);
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
          s1 = peg$c26(s1,s2);
          if (s1 === null) {
            peg$currPos = s0;
            s0 = s1;
          } else {
            s0 = s1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
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
        s1 = peg$c2;
      }
      if (s1 !== null) {
        peg$reportedPos = s0;
        s1 = peg$c27(s1);
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
          s1 = peg$c28(s2);
          if (s1 === null) {
            peg$currPos = s0;
            s0 = s1;
          } else {
            s0 = s1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
      }

      return s0;
    }

    function peg$parsetrailingModifier() {
      var s0, s1;

      peg$silentFails++;
      if (peg$c30.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c31); }
      }
      peg$silentFails--;
      if (s0 === null) {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c29); }
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
        s1 = peg$c2;
      }
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

      return s0;
    }

    function peg$parsepathIdent() {
      var s0, s1, s2, s3;

      peg$silentFails++;
      if (input.substr(peg$currPos, 2) === peg$c34) {
        s0 = peg$c34;
        peg$currPos += 2;
      } else {
        s0 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c35); }
      }
      if (s0 === null) {
        if (input.charCodeAt(peg$currPos) === 46) {
          s0 = peg$c36;
          peg$currPos++;
        } else {
          s0 = null;
          if (peg$silentFails === 0) { peg$fail(peg$c37); }
        }
        if (s0 === null) {
          s0 = peg$currPos;
          s1 = peg$currPos;
          s2 = [];
          if (peg$c38.test(input.charAt(peg$currPos))) {
            s3 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s3 = null;
            if (peg$silentFails === 0) { peg$fail(peg$c39); }
          }
          if (s3 !== null) {
            while (s3 !== null) {
              s2.push(s3);
              if (peg$c38.test(input.charAt(peg$currPos))) {
                s3 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s3 = null;
                if (peg$silentFails === 0) { peg$fail(peg$c39); }
              }
            }
          } else {
            s2 = peg$c2;
          }
          if (s2 !== null) {
            s2 = input.substring(s1, peg$currPos);
          }
          s1 = s2;
          if (s1 !== null) {
            s2 = peg$currPos;
            peg$silentFails++;
            if (input.charCodeAt(peg$currPos) === 61) {
              s3 = peg$c40;
              peg$currPos++;
            } else {
              s3 = null;
              if (peg$silentFails === 0) { peg$fail(peg$c41); }
            }
            peg$silentFails--;
            if (s3 === null) {
              s2 = peg$c3;
            } else {
              peg$currPos = s2;
              s2 = peg$c2;
            }
            if (s2 !== null) {
              peg$reportedPos = s0;
              s1 = peg$c42(s1);
              if (s1 === null) {
                peg$currPos = s0;
                s0 = s1;
              } else {
                s0 = s1;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
        }
      }
      peg$silentFails--;
      if (s0 === null) {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c33); }
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
        if (peg$silentFails === 0) { peg$fail(peg$c43); }
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
            s4 = peg$c40;
            peg$currPos++;
          } else {
            s4 = null;
            if (peg$silentFails === 0) { peg$fail(peg$c41); }
          }
          if (s4 !== null) {
            s5 = peg$parsepathIdNode();
            if (s5 !== null) {
              s3 = [s3, s4, s5];
              s2 = s3;
            } else {
              peg$currPos = s2;
              s2 = peg$c2;
            }
          } else {
            peg$currPos = s2;
            s2 = peg$c2;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$c2;
        }
        if (s2 === null) {
          s2 = peg$currPos;
          s3 = peg$parsekey();
          if (s3 !== null) {
            if (input.charCodeAt(peg$currPos) === 61) {
              s4 = peg$c40;
              peg$currPos++;
            } else {
              s4 = null;
              if (peg$silentFails === 0) { peg$fail(peg$c41); }
            }
            if (s4 !== null) {
              s5 = peg$parsestringNode();
              if (s5 !== null) {
                s3 = [s3, s4, s5];
                s2 = s3;
              } else {
                peg$currPos = s2;
                s2 = peg$c2;
              }
            } else {
              peg$currPos = s2;
              s2 = peg$c2;
            }
          } else {
            peg$currPos = s2;
            s2 = peg$c2;
          }
          if (s2 === null) {
            s2 = peg$currPos;
            s3 = peg$parsekey();
            if (s3 !== null) {
              if (input.charCodeAt(peg$currPos) === 61) {
                s4 = peg$c40;
                peg$currPos++;
              } else {
                s4 = null;
                if (peg$silentFails === 0) { peg$fail(peg$c41); }
              }
              if (s4 !== null) {
                s5 = peg$parseintegerNode();
                if (s5 !== null) {
                  s3 = [s3, s4, s5];
                  s2 = s3;
                } else {
                  peg$currPos = s2;
                  s2 = peg$c2;
                }
              } else {
                peg$currPos = s2;
                s2 = peg$c2;
              }
            } else {
              peg$currPos = s2;
              s2 = peg$c2;
            }
            if (s2 === null) {
              s2 = peg$currPos;
              s3 = peg$parsekey();
              if (s3 !== null) {
                if (input.charCodeAt(peg$currPos) === 61) {
                  s4 = peg$c40;
                  peg$currPos++;
                } else {
                  s4 = null;
                  if (peg$silentFails === 0) { peg$fail(peg$c41); }
                }
                if (s4 !== null) {
                  s5 = peg$parsebooleanNode();
                  if (s5 !== null) {
                    s3 = [s3, s4, s5];
                    s2 = s3;
                  } else {
                    peg$currPos = s2;
                    s2 = peg$c2;
                  }
                } else {
                  peg$currPos = s2;
                  s2 = peg$c2;
                }
              } else {
                peg$currPos = s2;
                s2 = peg$c2;
              }
            }
          }
        }
        if (s2 !== null) {
          peg$reportedPos = s0;
          s1 = peg$c44(s2);
          if (s1 === null) {
            peg$currPos = s0;
            s0 = s1;
          } else {
            s0 = s1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
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
            s4 = peg$c45(s5);
            if (s4 === null) {
              peg$currPos = s3;
              s3 = s4;
            } else {
              s3 = s4;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c2;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$c2;
        }
        while (s3 !== null) {
          s2.push(s3);
          s3 = peg$currPos;
          s4 = peg$parseseperator();
          if (s4 !== null) {
            s5 = peg$parsepathIdent();
            if (s5 !== null) {
              peg$reportedPos = s3;
              s4 = peg$c45(s5);
              if (s4 === null) {
                peg$currPos = s3;
                s3 = s4;
              } else {
                s3 = s4;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$c2;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c2;
          }
        }
        if (s2 !== null) {
          peg$reportedPos = s0;
          s1 = peg$c46(s1,s2);
          if (s1 === null) {
            peg$currPos = s0;
            s0 = s1;
          } else {
            s0 = s1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
      }

      return s0;
    }

    function peg$parseseperator() {
      var s0, s1;

      peg$silentFails++;
      if (peg$c48.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c49); }
      }
      peg$silentFails--;
      if (s0 === null) {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c47); }
      }

      return s0;
    }

    function peg$parsepathIdNode() {
      var s0, s1;

      s0 = peg$currPos;
      s1 = peg$parsepath();
      if (s1 !== null) {
        peg$reportedPos = s0;
        s1 = peg$c50(s1);
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
        s1 = peg$c51(s1);
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
        s1 = peg$c52(s1);
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
        s1 = peg$c53(s1);
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
      if (input.substr(peg$currPos, 4) === peg$c55) {
        s0 = peg$c55;
        peg$currPos += 4;
      } else {
        s0 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c56); }
      }
      if (s0 === null) {
        if (input.substr(peg$currPos, 5) === peg$c57) {
          s0 = peg$c57;
          peg$currPos += 5;
        } else {
          s0 = null;
          if (peg$silentFails === 0) { peg$fail(peg$c58); }
        }
      }
      peg$silentFails--;
      if (s0 === null) {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c54); }
      }

      return s0;
    }

    function peg$parseinteger() {
      var s0, s1, s2, s3;

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = peg$currPos;
      s2 = [];
      if (peg$c60.test(input.charAt(peg$currPos))) {
        s3 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s3 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c61); }
      }
      if (s3 !== null) {
        while (s3 !== null) {
          s2.push(s3);
          if (peg$c60.test(input.charAt(peg$currPos))) {
            s3 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s3 = null;
            if (peg$silentFails === 0) { peg$fail(peg$c61); }
          }
        }
      } else {
        s2 = peg$c2;
      }
      if (s2 !== null) {
        s2 = input.substring(s1, peg$currPos);
      }
      s1 = s2;
      if (s1 !== null) {
        peg$reportedPos = s0;
        s1 = peg$c62(s1);
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
        if (peg$silentFails === 0) { peg$fail(peg$c59); }
      }

      return s0;
    }

    function peg$parsestring() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 34) {
        s2 = peg$c63;
        peg$currPos++;
      } else {
        s2 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c64); }
      }
      if (s2 !== null) {
        s3 = peg$parsehashDoubleQuoteStringValue();
        if (s3 !== null) {
          if (input.charCodeAt(peg$currPos) === 34) {
            s4 = peg$c63;
            peg$currPos++;
          } else {
            s4 = null;
            if (peg$silentFails === 0) { peg$fail(peg$c64); }
          }
          if (s4 !== null) {
            s2 = [s2, s3, s4];
            s1 = s2;
          } else {
            peg$currPos = s1;
            s1 = peg$c2;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$c2;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$c2;
      }
      if (s1 === null) {
        s1 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 39) {
          s2 = peg$c65;
          peg$currPos++;
        } else {
          s2 = null;
          if (peg$silentFails === 0) { peg$fail(peg$c66); }
        }
        if (s2 !== null) {
          s3 = peg$parsehashSingleQuoteStringValue();
          if (s3 !== null) {
            if (input.charCodeAt(peg$currPos) === 39) {
              s4 = peg$c65;
              peg$currPos++;
            } else {
              s4 = null;
              if (peg$silentFails === 0) { peg$fail(peg$c66); }
            }
            if (s4 !== null) {
              s2 = [s2, s3, s4];
              s1 = s2;
            } else {
              peg$currPos = s1;
              s1 = peg$c2;
            }
          } else {
            peg$currPos = s1;
            s1 = peg$c2;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$c2;
        }
      }
      if (s1 !== null) {
        peg$reportedPos = s0;
        s1 = peg$c67(s1);
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
        s3 = peg$c3;
      } else {
        peg$currPos = s3;
        s3 = peg$c2;
      }
      if (s3 !== null) {
        if (peg$c68.test(input.charAt(peg$currPos))) {
          s4 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s4 = null;
          if (peg$silentFails === 0) { peg$fail(peg$c69); }
        }
        if (s4 !== null) {
          s3 = [s3, s4];
          s2 = s3;
        } else {
          peg$currPos = s2;
          s2 = peg$c2;
        }
      } else {
        peg$currPos = s2;
        s2 = peg$c2;
      }
      while (s2 !== null) {
        s1.push(s2);
        s2 = peg$currPos;
        s3 = peg$currPos;
        peg$silentFails++;
        s4 = peg$parseTERM();
        peg$silentFails--;
        if (s4 === null) {
          s3 = peg$c3;
        } else {
          peg$currPos = s3;
          s3 = peg$c2;
        }
        if (s3 !== null) {
          if (peg$c68.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = null;
            if (peg$silentFails === 0) { peg$fail(peg$c69); }
          }
          if (s4 !== null) {
            s3 = [s3, s4];
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$c2;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$c2;
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
        s3 = peg$c3;
      } else {
        peg$currPos = s3;
        s3 = peg$c2;
      }
      if (s3 !== null) {
        if (peg$c70.test(input.charAt(peg$currPos))) {
          s4 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s4 = null;
          if (peg$silentFails === 0) { peg$fail(peg$c71); }
        }
        if (s4 !== null) {
          s3 = [s3, s4];
          s2 = s3;
        } else {
          peg$currPos = s2;
          s2 = peg$c2;
        }
      } else {
        peg$currPos = s2;
        s2 = peg$c2;
      }
      while (s2 !== null) {
        s1.push(s2);
        s2 = peg$currPos;
        s3 = peg$currPos;
        peg$silentFails++;
        s4 = peg$parseTERM();
        peg$silentFails--;
        if (s4 === null) {
          s3 = peg$c3;
        } else {
          peg$currPos = s3;
          s3 = peg$c2;
        }
        if (s3 !== null) {
          if (peg$c70.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = null;
            if (peg$silentFails === 0) { peg$fail(peg$c71); }
          }
          if (s4 !== null) {
            s3 = [s3, s4];
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$c2;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$c2;
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

      if (peg$c72.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c73); }
      }

      return s0;
    }

    function peg$parsehtmlInlineContent() {
      var s0, s1;

      s0 = peg$currPos;
      s1 = peg$parseexplicitMustache();
      if (s1 !== null) {
        peg$reportedPos = s0;
        s1 = peg$c74(s1);
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
        s2 = peg$c75;
        peg$currPos++;
      } else {
        s2 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c76); }
      }
      if (s2 !== null) {
        if (input.charCodeAt(peg$currPos) === 32) {
          s3 = peg$c16;
          peg$currPos++;
        } else {
          s3 = null;
          if (peg$silentFails === 0) { peg$fail(peg$c17); }
        }
        if (s3 === null) {
          s3 = peg$c3;
        }
        if (s3 !== null) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$c2;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$c2;
      }
      if (s1 === null) {
        s1 = peg$currPos;
        peg$silentFails++;
        if (input.charCodeAt(peg$currPos) === 60) {
          s2 = peg$c77;
          peg$currPos++;
        } else {
          s2 = null;
          if (peg$silentFails === 0) { peg$fail(peg$c78); }
        }
        peg$silentFails--;
        if (s2 !== null) {
          peg$currPos = s1;
          s1 = peg$c3;
        } else {
          s1 = peg$c2;
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
                s3 = peg$c2;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$c2;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c2;
          }
          if (s3 === null) {
            s3 = peg$c3;
          }
          if (s3 !== null) {
            peg$reportedPos = s0;
            s1 = peg$c79(s2,s3);
            if (s1 === null) {
              peg$currPos = s0;
              s0 = s1;
            } else {
              s0 = s1;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
      }

      return s0;
    }

    function peg$parsetextNodes() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      s1 = peg$parsepreMustacheText();
      if (s1 === null) {
        s1 = peg$c3;
      }
      if (s1 !== null) {
        s2 = [];
        s3 = peg$currPos;
        s4 = peg$parserawMustache();
        if (s4 !== null) {
          s5 = peg$parsepreMustacheText();
          if (s5 === null) {
            s5 = peg$c3;
          }
          if (s5 !== null) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$c2;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$c2;
        }
        while (s3 !== null) {
          s2.push(s3);
          s3 = peg$currPos;
          s4 = peg$parserawMustache();
          if (s4 !== null) {
            s5 = peg$parsepreMustacheText();
            if (s5 === null) {
              s5 = peg$c3;
            }
            if (s5 !== null) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$c2;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c2;
          }
        }
        if (s2 !== null) {
          s3 = peg$parseTERM();
          if (s3 !== null) {
            peg$reportedPos = s0;
            s1 = peg$c80(s1,s2);
            if (s1 === null) {
              peg$currPos = s0;
              s0 = s1;
            } else {
              s0 = s1;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
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
                s1 = peg$c81(s3);
                if (s1 === null) {
                  peg$currPos = s0;
                  s0 = s1;
                } else {
                  s0 = s1;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
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
                s1 = peg$c81(s3);
                if (s1 === null) {
                  peg$currPos = s0;
                  s0 = s1;
                } else {
                  s0 = s1;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
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
                  s1 = peg$c81(s3);
                  if (s1 === null) {
                    peg$currPos = s0;
                    s0 = s1;
                  } else {
                    s0 = s1;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c2;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
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
                s1 = peg$c82(s3);
                if (s1 === null) {
                  peg$currPos = s0;
                  s0 = s1;
                } else {
                  s0 = s1;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c2;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c2;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
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
        s1 = peg$c2;
      }
      if (s1 !== null) {
        peg$reportedPos = s0;
        s1 = peg$c83(s1);
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
        s1 = peg$c3;
      } else {
        peg$currPos = s1;
        s1 = peg$c2;
      }
      if (s1 !== null) {
        if (input.length > peg$currPos) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = null;
          if (peg$silentFails === 0) { peg$fail(peg$c84); }
        }
        if (s2 !== null) {
          peg$reportedPos = s0;
          s1 = peg$c85(s2);
          if (s1 === null) {
            peg$currPos = s0;
            s0 = s1;
          } else {
            s0 = s1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
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
        s0 = peg$c87;
        peg$currPos++;
      } else {
        s0 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c88); }
      }
      peg$silentFails--;
      if (s0 === null) {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c86); }
      }

      return s0;
    }

    function peg$parsedoubleOpen() {
      var s0, s1;

      peg$silentFails++;
      if (input.substr(peg$currPos, 2) === peg$c90) {
        s0 = peg$c90;
        peg$currPos += 2;
      } else {
        s0 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c91); }
      }
      peg$silentFails--;
      if (s0 === null) {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c89); }
      }

      return s0;
    }

    function peg$parsetripleOpen() {
      var s0, s1;

      peg$silentFails++;
      if (input.substr(peg$currPos, 3) === peg$c93) {
        s0 = peg$c93;
        peg$currPos += 3;
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

    function peg$parsesingleClose() {
      var s0, s1;

      peg$silentFails++;
      if (input.charCodeAt(peg$currPos) === 125) {
        s0 = peg$c96;
        peg$currPos++;
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

    function peg$parsedoubleClose() {
      var s0, s1;

      peg$silentFails++;
      if (input.substr(peg$currPos, 2) === peg$c99) {
        s0 = peg$c99;
        peg$currPos += 2;
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

    function peg$parsetripleClose() {
      var s0, s1;

      peg$silentFails++;
      if (input.substr(peg$currPos, 3) === peg$c102) {
        s0 = peg$c102;
        peg$currPos += 3;
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

    function peg$parsehashStacheOpen() {
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

    function peg$parsehashStacheClose() {
      var s0, s1;

      peg$silentFails++;
      if (input.charCodeAt(peg$currPos) === 125) {
        s0 = peg$c96;
        peg$currPos++;
      } else {
        s0 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c97); }
      }
      peg$silentFails--;
      if (s0 === null) {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c107); }
      }

      return s0;
    }

    function peg$parseequalSign() {
      var s0, s1, s2;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 2) === peg$c108) {
        s1 = peg$c108;
        peg$currPos += 2;
      } else {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c109); }
      }
      if (s1 !== null) {
        if (input.charCodeAt(peg$currPos) === 32) {
          s2 = peg$c16;
          peg$currPos++;
        } else {
          s2 = null;
          if (peg$silentFails === 0) { peg$fail(peg$c17); }
        }
        if (s2 === null) {
          s2 = peg$c3;
        }
        if (s2 !== null) {
          peg$reportedPos = s0;
          s1 = peg$c110();
          if (s1 === null) {
            peg$currPos = s0;
            s0 = s1;
          } else {
            s0 = s1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
      }
      if (s0 === null) {
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 61) {
          s1 = peg$c40;
          peg$currPos++;
        } else {
          s1 = null;
          if (peg$silentFails === 0) { peg$fail(peg$c41); }
        }
        if (s1 !== null) {
          if (input.charCodeAt(peg$currPos) === 32) {
            s2 = peg$c16;
            peg$currPos++;
          } else {
            s2 = null;
            if (peg$silentFails === 0) { peg$fail(peg$c17); }
          }
          if (s2 === null) {
            s2 = peg$c3;
          }
          if (s2 !== null) {
            peg$reportedPos = s0;
            s1 = peg$c111();
            if (s1 === null) {
              peg$currPos = s0;
              s0 = s1;
            } else {
              s0 = s1;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
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
          s3 = peg$c3;
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
              s2 = peg$c112(s2,s3,s4,s5);
              if (s2 === null) {
                peg$currPos = s1;
                s1 = s2;
              } else {
                s1 = s2;
              }
            } else {
              peg$currPos = s1;
              s1 = peg$c2;
            }
          } else {
            peg$currPos = s1;
            s1 = peg$c2;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$c2;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$c2;
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
              s2 = peg$c113(s2,s3,s4);
              if (s2 === null) {
                peg$currPos = s1;
                s1 = s2;
              } else {
                s1 = s2;
              }
            } else {
              peg$currPos = s1;
              s1 = peg$c2;
            }
          } else {
            peg$currPos = s1;
            s1 = peg$c2;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$c2;
        }
      }
      if (s1 !== null) {
        peg$reportedPos = s0;
        s1 = peg$c114(s1);
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
          s1 = peg$c26(s1,s2);
          if (s1 === null) {
            peg$currPos = s0;
            s0 = s1;
          } else {
            s0 = s1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
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
        s1 = peg$c2;
      }
      if (s1 !== null) {
        peg$reportedPos = s0;
        s1 = peg$c27(s1);
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
        s2 = peg$c16;
        peg$currPos++;
      } else {
        s2 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c17); }
      }
      if (s2 !== null) {
        while (s2 !== null) {
          s1.push(s2);
          if (input.charCodeAt(peg$currPos) === 32) {
            s2 = peg$c16;
            peg$currPos++;
          } else {
            s2 = null;
            if (peg$silentFails === 0) { peg$fail(peg$c17); }
          }
        }
      } else {
        s1 = peg$c2;
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
          s1 = peg$c115(s2);
          if (s1 === null) {
            peg$currPos = s0;
            s0 = s1;
          } else {
            s0 = s1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
      }

      return s0;
    }

    function peg$parseboundAttributeValueText() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      if (peg$c116.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c117); }
      }
      if (s2 !== null) {
        while (s2 !== null) {
          s1.push(s2);
          if (peg$c116.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = null;
            if (peg$silentFails === 0) { peg$fail(peg$c117); }
          }
        }
      } else {
        s1 = peg$c2;
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
          s1 = peg$c118(s1);
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
        s2 = peg$c63;
        peg$currPos++;
      } else {
        s2 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c64); }
      }
      if (s2 !== null) {
        s3 = peg$parseinMustache();
        if (s3 !== null) {
          if (input.charCodeAt(peg$currPos) === 34) {
            s4 = peg$c63;
            peg$currPos++;
          } else {
            s4 = null;
            if (peg$silentFails === 0) { peg$fail(peg$c64); }
          }
          if (s4 !== null) {
            s2 = [s2, s3, s4];
            s1 = s2;
          } else {
            peg$currPos = s1;
            s1 = peg$c2;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$c2;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$c2;
      }
      if (s1 === null) {
        s1 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 39) {
          s2 = peg$c65;
          peg$currPos++;
        } else {
          s2 = null;
          if (peg$silentFails === 0) { peg$fail(peg$c66); }
        }
        if (s2 !== null) {
          s3 = peg$parseinMustache();
          if (s3 !== null) {
            if (input.charCodeAt(peg$currPos) === 39) {
              s4 = peg$c65;
              peg$currPos++;
            } else {
              s4 = null;
              if (peg$silentFails === 0) { peg$fail(peg$c66); }
            }
            if (s4 !== null) {
              s2 = [s2, s3, s4];
              s1 = s2;
            } else {
              peg$currPos = s1;
              s1 = peg$c2;
            }
          } else {
            peg$currPos = s1;
            s1 = peg$c2;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$c2;
        }
      }
      if (s1 !== null) {
        peg$reportedPos = s0;
        s1 = peg$c67(s1);
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
          s2 = peg$c40;
          peg$currPos++;
        } else {
          s2 = null;
          if (peg$silentFails === 0) { peg$fail(peg$c41); }
        }
        if (s2 !== null) {
          s3 = peg$parseactionValue();
          if (s3 !== null) {
            peg$reportedPos = s0;
            s1 = peg$c119(s1,s3);
            if (s1 === null) {
              peg$currPos = s0;
              s0 = s1;
            } else {
              s0 = s1;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
      }

      return s0;
    }

    function peg$parseboundAttribute() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$parsekey();
      if (s1 !== null) {
        if (input.charCodeAt(peg$currPos) === 61) {
          s2 = peg$c40;
          peg$currPos++;
        } else {
          s2 = null;
          if (peg$silentFails === 0) { peg$fail(peg$c41); }
        }
        if (s2 !== null) {
          s3 = peg$parseboundAttributeValueText();
          if (s3 !== null) {
            peg$reportedPos = s0;
            s1 = peg$c120(s1,s3);
            if (s1 === null) {
              peg$currPos = s0;
              s0 = s1;
            } else {
              s0 = s1;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
      }

      return s0;
    }

    function peg$parsenormalAttribute() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$parsekey();
      if (s1 !== null) {
        if (input.charCodeAt(peg$currPos) === 61) {
          s2 = peg$c40;
          peg$currPos++;
        } else {
          s2 = null;
          if (peg$silentFails === 0) { peg$fail(peg$c41); }
        }
        if (s2 !== null) {
          s3 = peg$parsestring();
          if (s3 !== null) {
            peg$reportedPos = s0;
            s1 = peg$c121(s1,s3);
            if (s1 === null) {
              peg$currPos = s0;
              s0 = s1;
            } else {
              s0 = s1;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c2;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
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
        if (peg$c60.test(input.charAt(peg$currPos))) {
          s0 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s0 = null;
          if (peg$silentFails === 0) { peg$fail(peg$c61); }
        }
        if (s0 === null) {
          if (input.charCodeAt(peg$currPos) === 95) {
            s0 = peg$c122;
            peg$currPos++;
          } else {
            s0 = null;
            if (peg$silentFails === 0) { peg$fail(peg$c123); }
          }
          if (s0 === null) {
            if (input.charCodeAt(peg$currPos) === 45) {
              s0 = peg$c124;
              peg$currPos++;
            } else {
              s0 = null;
              if (peg$silentFails === 0) { peg$fail(peg$c125); }
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
        s1 = peg$c126;
        peg$currPos++;
      } else {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c127); }
      }
      if (s1 !== null) {
        s2 = peg$parsecssIdentifier();
        if (s2 !== null) {
          peg$reportedPos = s0;
          s1 = peg$c85(s2);
          if (s1 === null) {
            peg$currPos = s0;
            s0 = s1;
          } else {
            s0 = s1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
      }

      return s0;
    }

    function peg$parseidShorthand() {
      var s0, s1, s2;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 35) {
        s1 = peg$c128;
        peg$currPos++;
      } else {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c129); }
      }
      if (s1 !== null) {
        s2 = peg$parsecssIdentifier();
        if (s2 !== null) {
          peg$reportedPos = s0;
          s1 = peg$c130(s2);
          if (s1 === null) {
            peg$currPos = s0;
            s0 = s1;
          } else {
            s0 = s1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
      }

      return s0;
    }

    function peg$parseclassShorthand() {
      var s0, s1, s2;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 46) {
        s1 = peg$c36;
        peg$currPos++;
      } else {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c37); }
      }
      if (s1 !== null) {
        s2 = peg$parsecssIdentifier();
        if (s2 !== null) {
          peg$reportedPos = s0;
          s1 = peg$c85(s2);
          if (s1 === null) {
            peg$currPos = s0;
            s0 = s1;
          } else {
            s0 = s1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
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
        if (peg$silentFails === 0) { peg$fail(peg$c131); }
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
          s1 = peg$c132(s1,s2);
          if (s1 === null) {
            peg$currPos = s0;
            s0 = s1;
          } else {
            s0 = s1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
      }

      return s0;
    }

    function peg$parsenmchar() {
      var s0;

      if (peg$c133.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c134); }
      }
      if (s0 === null) {
        s0 = peg$parsenonascii();
      }

      return s0;
    }

    function peg$parsenmstart() {
      var s0;

      if (peg$c135.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c136); }
      }
      if (s0 === null) {
        s0 = peg$parsenonascii();
      }

      return s0;
    }

    function peg$parsenonascii() {
      var s0;

      if (peg$c137.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c138); }
      }

      return s0;
    }

    function peg$parsehtmlTagName() {
      var s0, s1, s2, s3, s4;

      peg$silentFails++;
      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 37) {
        s1 = peg$c126;
        peg$currPos++;
      } else {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c127); }
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
          s3 = peg$c2;
        }
        if (s3 !== null) {
          s3 = input.substring(s2, peg$currPos);
        }
        s2 = s3;
        if (s2 !== null) {
          peg$reportedPos = s0;
          s1 = peg$c85(s2);
          if (s1 === null) {
            peg$currPos = s0;
            s0 = s1;
          } else {
            s0 = s1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
      }
      if (s0 === null) {
        s0 = peg$parseknownTagName();
      }
      peg$silentFails--;
      if (s0 === null) {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c139); }
      }

      return s0;
    }

    function peg$parsetagChar() {
      var s0;

      if (peg$c140.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c141); }
      }

      return s0;
    }

    function peg$parseknownTagName() {
      var s0, s1;

      peg$silentFails++;
      if (input.substr(peg$currPos, 10) === peg$c142) {
        s0 = peg$c142;
        peg$currPos += 10;
      } else {
        s0 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c143); }
      }
      if (s0 === null) {
        if (input.substr(peg$currPos, 10) === peg$c144) {
          s0 = peg$c144;
          peg$currPos += 10;
        } else {
          s0 = null;
          if (peg$silentFails === 0) { peg$fail(peg$c145); }
        }
        if (s0 === null) {
          if (input.substr(peg$currPos, 9) === peg$c146) {
            s0 = peg$c146;
            peg$currPos += 9;
          } else {
            s0 = null;
            if (peg$silentFails === 0) { peg$fail(peg$c147); }
          }
          if (s0 === null) {
            if (input.substr(peg$currPos, 8) === peg$c148) {
              s0 = peg$c148;
              peg$currPos += 8;
            } else {
              s0 = null;
              if (peg$silentFails === 0) { peg$fail(peg$c149); }
            }
            if (s0 === null) {
              if (input.substr(peg$currPos, 8) === peg$c150) {
                s0 = peg$c150;
                peg$currPos += 8;
              } else {
                s0 = null;
                if (peg$silentFails === 0) { peg$fail(peg$c151); }
              }
              if (s0 === null) {
                if (input.substr(peg$currPos, 8) === peg$c152) {
                  s0 = peg$c152;
                  peg$currPos += 8;
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
                                if (input.substr(peg$currPos, 7) === peg$c168) {
                                  s0 = peg$c168;
                                  peg$currPos += 7;
                                } else {
                                  s0 = null;
                                  if (peg$silentFails === 0) { peg$fail(peg$c169); }
                                }
                                if (s0 === null) {
                                  if (input.substr(peg$currPos, 7) === peg$c170) {
                                    s0 = peg$c170;
                                    peg$currPos += 7;
                                  } else {
                                    s0 = null;
                                    if (peg$silentFails === 0) { peg$fail(peg$c171); }
                                  }
                                  if (s0 === null) {
                                    if (input.substr(peg$currPos, 7) === peg$c172) {
                                      s0 = peg$c172;
                                      peg$currPos += 7;
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
                                                        if (input.substr(peg$currPos, 6) === peg$c192) {
                                                          s0 = peg$c192;
                                                          peg$currPos += 6;
                                                        } else {
                                                          s0 = null;
                                                          if (peg$silentFails === 0) { peg$fail(peg$c193); }
                                                        }
                                                        if (s0 === null) {
                                                          if (input.substr(peg$currPos, 6) === peg$c194) {
                                                            s0 = peg$c194;
                                                            peg$currPos += 6;
                                                          } else {
                                                            s0 = null;
                                                            if (peg$silentFails === 0) { peg$fail(peg$c195); }
                                                          }
                                                          if (s0 === null) {
                                                            if (input.substr(peg$currPos, 6) === peg$c196) {
                                                              s0 = peg$c196;
                                                              peg$currPos += 6;
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
                                                                                                if (input.substr(peg$currPos, 5) === peg$c232) {
                                                                                                  s0 = peg$c232;
                                                                                                  peg$currPos += 5;
                                                                                                } else {
                                                                                                  s0 = null;
                                                                                                  if (peg$silentFails === 0) { peg$fail(peg$c233); }
                                                                                                }
                                                                                                if (s0 === null) {
                                                                                                  if (input.substr(peg$currPos, 5) === peg$c234) {
                                                                                                    s0 = peg$c234;
                                                                                                    peg$currPos += 5;
                                                                                                  } else {
                                                                                                    s0 = null;
                                                                                                    if (peg$silentFails === 0) { peg$fail(peg$c235); }
                                                                                                  }
                                                                                                  if (s0 === null) {
                                                                                                    if (input.substr(peg$currPos, 5) === peg$c236) {
                                                                                                      s0 = peg$c236;
                                                                                                      peg$currPos += 5;
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
                                                                                                                                    if (input.substr(peg$currPos, 4) === peg$c268) {
                                                                                                                                      s0 = peg$c268;
                                                                                                                                      peg$currPos += 4;
                                                                                                                                    } else {
                                                                                                                                      s0 = null;
                                                                                                                                      if (peg$silentFails === 0) { peg$fail(peg$c269); }
                                                                                                                                    }
                                                                                                                                    if (s0 === null) {
                                                                                                                                      if (input.substr(peg$currPos, 4) === peg$c270) {
                                                                                                                                        s0 = peg$c270;
                                                                                                                                        peg$currPos += 4;
                                                                                                                                      } else {
                                                                                                                                        s0 = null;
                                                                                                                                        if (peg$silentFails === 0) { peg$fail(peg$c271); }
                                                                                                                                      }
                                                                                                                                      if (s0 === null) {
                                                                                                                                        if (input.substr(peg$currPos, 4) === peg$c272) {
                                                                                                                                          s0 = peg$c272;
                                                                                                                                          peg$currPos += 4;
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
                                                                                                                                                                              if (input.substr(peg$currPos, 3) === peg$c310) {
                                                                                                                                                                                s0 = peg$c310;
                                                                                                                                                                                peg$currPos += 3;
                                                                                                                                                                              } else {
                                                                                                                                                                                s0 = null;
                                                                                                                                                                                if (peg$silentFails === 0) { peg$fail(peg$c311); }
                                                                                                                                                                              }
                                                                                                                                                                              if (s0 === null) {
                                                                                                                                                                                if (input.substr(peg$currPos, 3) === peg$c312) {
                                                                                                                                                                                  s0 = peg$c312;
                                                                                                                                                                                  peg$currPos += 3;
                                                                                                                                                                                } else {
                                                                                                                                                                                  s0 = null;
                                                                                                                                                                                  if (peg$silentFails === 0) { peg$fail(peg$c313); }
                                                                                                                                                                                }
                                                                                                                                                                                if (s0 === null) {
                                                                                                                                                                                  if (input.substr(peg$currPos, 3) === peg$c314) {
                                                                                                                                                                                    s0 = peg$c314;
                                                                                                                                                                                    peg$currPos += 3;
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
                                                                                                                                                                                                                    if (input.substr(peg$currPos, 2) === peg$c348) {
                                                                                                                                                                                                                      s0 = peg$c348;
                                                                                                                                                                                                                      peg$currPos += 2;
                                                                                                                                                                                                                    } else {
                                                                                                                                                                                                                      s0 = null;
                                                                                                                                                                                                                      if (peg$silentFails === 0) { peg$fail(peg$c349); }
                                                                                                                                                                                                                    }
                                                                                                                                                                                                                    if (s0 === null) {
                                                                                                                                                                                                                      if (input.substr(peg$currPos, 2) === peg$c350) {
                                                                                                                                                                                                                        s0 = peg$c350;
                                                                                                                                                                                                                        peg$currPos += 2;
                                                                                                                                                                                                                      } else {
                                                                                                                                                                                                                        s0 = null;
                                                                                                                                                                                                                        if (peg$silentFails === 0) { peg$fail(peg$c351); }
                                                                                                                                                                                                                      }
                                                                                                                                                                                                                      if (s0 === null) {
                                                                                                                                                                                                                        if (input.substr(peg$currPos, 2) === peg$c352) {
                                                                                                                                                                                                                          s0 = peg$c352;
                                                                                                                                                                                                                          peg$currPos += 2;
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
                                                                                                                                                                                                                                                              if (input.charCodeAt(peg$currPos) === 117) {
                                                                                                                                                                                                                                                                s0 = peg$c390;
                                                                                                                                                                                                                                                                peg$currPos++;
                                                                                                                                                                                                                                                              } else {
                                                                                                                                                                                                                                                                s0 = null;
                                                                                                                                                                                                                                                                if (peg$silentFails === 0) { peg$fail(peg$c391); }
                                                                                                                                                                                                                                                              }
                                                                                                                                                                                                                                                              if (s0 === null) {
                                                                                                                                                                                                                                                                if (input.charCodeAt(peg$currPos) === 115) {
                                                                                                                                                                                                                                                                  s0 = peg$c392;
                                                                                                                                                                                                                                                                  peg$currPos++;
                                                                                                                                                                                                                                                                } else {
                                                                                                                                                                                                                                                                  s0 = null;
                                                                                                                                                                                                                                                                  if (peg$silentFails === 0) { peg$fail(peg$c393); }
                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                if (s0 === null) {
                                                                                                                                                                                                                                                                  if (input.charCodeAt(peg$currPos) === 113) {
                                                                                                                                                                                                                                                                    s0 = peg$c394;
                                                                                                                                                                                                                                                                    peg$currPos++;
                                                                                                                                                                                                                                                                  } else {
                                                                                                                                                                                                                                                                    s0 = null;
                                                                                                                                                                                                                                                                    if (peg$silentFails === 0) { peg$fail(peg$c395); }
                                                                                                                                                                                                                                                                  }
                                                                                                                                                                                                                                                                  if (s0 === null) {
                                                                                                                                                                                                                                                                    if (input.charCodeAt(peg$currPos) === 112) {
                                                                                                                                                                                                                                                                      s0 = peg$c396;
                                                                                                                                                                                                                                                                      peg$currPos++;
                                                                                                                                                                                                                                                                    } else {
                                                                                                                                                                                                                                                                      s0 = null;
                                                                                                                                                                                                                                                                      if (peg$silentFails === 0) { peg$fail(peg$c397); }
                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                    if (s0 === null) {
                                                                                                                                                                                                                                                                      if (input.charCodeAt(peg$currPos) === 105) {
                                                                                                                                                                                                                                                                        s0 = peg$c398;
                                                                                                                                                                                                                                                                        peg$currPos++;
                                                                                                                                                                                                                                                                      } else {
                                                                                                                                                                                                                                                                        s0 = null;
                                                                                                                                                                                                                                                                        if (peg$silentFails === 0) { peg$fail(peg$c399); }
                                                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                                                      if (s0 === null) {
                                                                                                                                                                                                                                                                        if (input.charCodeAt(peg$currPos) === 98) {
                                                                                                                                                                                                                                                                          s0 = peg$c400;
                                                                                                                                                                                                                                                                          peg$currPos++;
                                                                                                                                                                                                                                                                        } else {
                                                                                                                                                                                                                                                                          s0 = null;
                                                                                                                                                                                                                                                                          if (peg$silentFails === 0) { peg$fail(peg$c401); }
                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                        if (s0 === null) {
                                                                                                                                                                                                                                                                          if (input.charCodeAt(peg$currPos) === 97) {
                                                                                                                                                                                                                                                                            s0 = peg$c402;
                                                                                                                                                                                                                                                                            peg$currPos++;
                                                                                                                                                                                                                                                                          } else {
                                                                                                                                                                                                                                                                            s0 = null;
                                                                                                                                                                                                                                                                            if (peg$silentFails === 0) { peg$fail(peg$c403); }
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
        if (peg$silentFails === 0) { peg$fail(peg$c139); }
      }

      return s0;
    }

    function peg$parseknownEvent() {
      var s0, s1;

      peg$silentFails++;
      if (input.substr(peg$currPos, 10) === peg$c405) {
        s0 = peg$c405;
        peg$currPos += 10;
      } else {
        s0 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c406); }
      }
      if (s0 === null) {
        if (input.substr(peg$currPos, 9) === peg$c407) {
          s0 = peg$c407;
          peg$currPos += 9;
        } else {
          s0 = null;
          if (peg$silentFails === 0) { peg$fail(peg$c408); }
        }
        if (s0 === null) {
          if (input.substr(peg$currPos, 8) === peg$c409) {
            s0 = peg$c409;
            peg$currPos += 8;
          } else {
            s0 = null;
            if (peg$silentFails === 0) { peg$fail(peg$c410); }
          }
          if (s0 === null) {
            if (input.substr(peg$currPos, 11) === peg$c411) {
              s0 = peg$c411;
              peg$currPos += 11;
            } else {
              s0 = null;
              if (peg$silentFails === 0) { peg$fail(peg$c412); }
            }
            if (s0 === null) {
              if (input.substr(peg$currPos, 7) === peg$c413) {
                s0 = peg$c413;
                peg$currPos += 7;
              } else {
                s0 = null;
                if (peg$silentFails === 0) { peg$fail(peg$c414); }
              }
              if (s0 === null) {
                if (input.substr(peg$currPos, 5) === peg$c415) {
                  s0 = peg$c415;
                  peg$currPos += 5;
                } else {
                  s0 = null;
                  if (peg$silentFails === 0) { peg$fail(peg$c416); }
                }
                if (s0 === null) {
                  if (input.substr(peg$currPos, 8) === peg$c417) {
                    s0 = peg$c417;
                    peg$currPos += 8;
                  } else {
                    s0 = null;
                    if (peg$silentFails === 0) { peg$fail(peg$c418); }
                  }
                  if (s0 === null) {
                    if (input.substr(peg$currPos, 9) === peg$c419) {
                      s0 = peg$c419;
                      peg$currPos += 9;
                    } else {
                      s0 = null;
                      if (peg$silentFails === 0) { peg$fail(peg$c420); }
                    }
                    if (s0 === null) {
                      if (input.substr(peg$currPos, 7) === peg$c421) {
                        s0 = peg$c421;
                        peg$currPos += 7;
                      } else {
                        s0 = null;
                        if (peg$silentFails === 0) { peg$fail(peg$c422); }
                      }
                      if (s0 === null) {
                        if (input.substr(peg$currPos, 11) === peg$c423) {
                          s0 = peg$c423;
                          peg$currPos += 11;
                        } else {
                          s0 = null;
                          if (peg$silentFails === 0) { peg$fail(peg$c424); }
                        }
                        if (s0 === null) {
                          if (input.substr(peg$currPos, 5) === peg$c425) {
                            s0 = peg$c425;
                            peg$currPos += 5;
                          } else {
                            s0 = null;
                            if (peg$silentFails === 0) { peg$fail(peg$c426); }
                          }
                          if (s0 === null) {
                            if (input.substr(peg$currPos, 11) === peg$c427) {
                              s0 = peg$c427;
                              peg$currPos += 11;
                            } else {
                              s0 = null;
                              if (peg$silentFails === 0) { peg$fail(peg$c428); }
                            }
                            if (s0 === null) {
                              if (input.substr(peg$currPos, 9) === peg$c429) {
                                s0 = peg$c429;
                                peg$currPos += 9;
                              } else {
                                s0 = null;
                                if (peg$silentFails === 0) { peg$fail(peg$c430); }
                              }
                              if (s0 === null) {
                                if (input.substr(peg$currPos, 7) === peg$c431) {
                                  s0 = peg$c431;
                                  peg$currPos += 7;
                                } else {
                                  s0 = null;
                                  if (peg$silentFails === 0) { peg$fail(peg$c432); }
                                }
                                if (s0 === null) {
                                  if (input.substr(peg$currPos, 8) === peg$c433) {
                                    s0 = peg$c433;
                                    peg$currPos += 8;
                                  } else {
                                    s0 = null;
                                    if (peg$silentFails === 0) { peg$fail(peg$c434); }
                                  }
                                  if (s0 === null) {
                                    if (input.substr(peg$currPos, 10) === peg$c435) {
                                      s0 = peg$c435;
                                      peg$currPos += 10;
                                    } else {
                                      s0 = null;
                                      if (peg$silentFails === 0) { peg$fail(peg$c436); }
                                    }
                                    if (s0 === null) {
                                      if (input.substr(peg$currPos, 10) === peg$c437) {
                                        s0 = peg$c437;
                                        peg$currPos += 10;
                                      } else {
                                        s0 = null;
                                        if (peg$silentFails === 0) { peg$fail(peg$c438); }
                                      }
                                      if (s0 === null) {
                                        if (input.substr(peg$currPos, 6) === peg$c439) {
                                          s0 = peg$c439;
                                          peg$currPos += 6;
                                        } else {
                                          s0 = null;
                                          if (peg$silentFails === 0) { peg$fail(peg$c440); }
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
                                            if (input.substr(peg$currPos, 6) === peg$c441) {
                                              s0 = peg$c441;
                                              peg$currPos += 6;
                                            } else {
                                              s0 = null;
                                              if (peg$silentFails === 0) { peg$fail(peg$c442); }
                                            }
                                            if (s0 === null) {
                                              if (input.substr(peg$currPos, 9) === peg$c443) {
                                                s0 = peg$c443;
                                                peg$currPos += 9;
                                              } else {
                                                s0 = null;
                                                if (peg$silentFails === 0) { peg$fail(peg$c444); }
                                              }
                                              if (s0 === null) {
                                                if (input.substr(peg$currPos, 4) === peg$c445) {
                                                  s0 = peg$c445;
                                                  peg$currPos += 4;
                                                } else {
                                                  s0 = null;
                                                  if (peg$silentFails === 0) { peg$fail(peg$c446); }
                                                }
                                                if (s0 === null) {
                                                  if (input.substr(peg$currPos, 9) === peg$c447) {
                                                    s0 = peg$c447;
                                                    peg$currPos += 9;
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
                                                      if (input.substr(peg$currPos, 8) === peg$c451) {
                                                        s0 = peg$c451;
                                                        peg$currPos += 8;
                                                      } else {
                                                        s0 = null;
                                                        if (peg$silentFails === 0) { peg$fail(peg$c452); }
                                                      }
                                                      if (s0 === null) {
                                                        if (input.substr(peg$currPos, 4) === peg$c453) {
                                                          s0 = peg$c453;
                                                          peg$currPos += 4;
                                                        } else {
                                                          s0 = null;
                                                          if (peg$silentFails === 0) { peg$fail(peg$c454); }
                                                        }
                                                        if (s0 === null) {
                                                          if (input.substr(peg$currPos, 7) === peg$c455) {
                                                            s0 = peg$c455;
                                                            peg$currPos += 7;
                                                          } else {
                                                            s0 = null;
                                                            if (peg$silentFails === 0) { peg$fail(peg$c456); }
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
        if (peg$silentFails === 0) { peg$fail(peg$c404); }
      }

      return s0;
    }

    function peg$parseINDENT() {
      var s0, s1;

      peg$silentFails++;
      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 61423) {
        s1 = peg$c458;
        peg$currPos++;
      } else {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c459); }
      }
      if (s1 !== null) {
        peg$reportedPos = s0;
        s1 = peg$c460();
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
        if (peg$silentFails === 0) { peg$fail(peg$c457); }
      }

      return s0;
    }

    function peg$parseDEDENT() {
      var s0, s1;

      peg$silentFails++;
      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 61438) {
        s1 = peg$c462;
        peg$currPos++;
      } else {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c463); }
      }
      if (s1 !== null) {
        peg$reportedPos = s0;
        s1 = peg$c460();
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
        if (peg$silentFails === 0) { peg$fail(peg$c461); }
      }

      return s0;
    }

    function peg$parseTERM() {
      var s0, s1, s2;

      peg$silentFails++;
      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 10) {
        s1 = peg$c465;
        peg$currPos++;
      } else {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c466); }
      }
      if (s1 !== null) {
        if (input.charCodeAt(peg$currPos) === 61439) {
          s2 = peg$c467;
          peg$currPos++;
        } else {
          s2 = null;
          if (peg$silentFails === 0) { peg$fail(peg$c468); }
        }
        if (s2 !== null) {
          s1 = [s1, s2];
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
      }
      peg$silentFails--;
      if (s0 === null) {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c464); }
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
        s0 = peg$c2;
      }
      peg$silentFails--;
      if (s0 === null) {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c469); }
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
        if (peg$silentFails === 0) { peg$fail(peg$c470); }
      }

      return s0;
    }

    function peg$parsewhitespace() {
      var s0, s1;

      peg$silentFails++;
      if (peg$c472.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c473); }
      }
      peg$silentFails--;
      if (s0 === null) {
        s1 = null;
        if (peg$silentFails === 0) { peg$fail(peg$c471); }
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
        s1 = peg$c3;
      } else {
        peg$currPos = s1;
        s1 = peg$c2;
      }
      if (s1 !== null) {
        if (input.length > peg$currPos) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = null;
          if (peg$silentFails === 0) { peg$fail(peg$c84); }
        }
        if (s2 !== null) {
          peg$reportedPos = s0;
          s1 = peg$c85(s2);
          if (s1 === null) {
            peg$currPos = s0;
            s0 = s1;
          } else {
            s0 = s1;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c2;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c2;
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
          hash = hash || new Handlebars.AST.HashNode([]);

          for(var i = 0; i < newHashPairs.length; ++i) {
            hash.pairs.push(newHashPairs[i]);
          }
        }

        var params = [mustacheNode.id].concat(mustacheNode.params);
        params.unshift(new Handlebars.AST.IdNode([helperName]));
        return new Handlebars.AST.MustacheNode(params, hash, !mustacheNode.escaped);
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

exports = Emblem.Parser;
;
// lib/compiler.js
var Emblem, Handlebars,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };





Emblem.throwCompileError = function(line, msg) {
  throw new Error("Emblem syntax error, line " + line + ": " + msg);
};

Emblem.parse = function(string) {
  var line, lines, msg, processed;
  try {
    processed = Emblem.Preprocessor.processSync(string);
    return new Handlebars.AST.ProgramNode(Emblem.Parser.parse(processed), []);
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

Emblem.precompileRaw = function(string, options) {
  var ast, environment;
  if (options == null) {
    options = {};
  }
  if (typeof string !== 'string') {
    throw new Handlebars.Exception("You must pass a string to Emblem.precompile. You passed " + string);
  }
  if (__indexOf.call(options, 'data') < 0) {
    options.data = true;
  }
  ast = Emblem.parse(string);
  environment = new Handlebars.Compiler().compile(ast, options);
  return new Handlebars.JavaScriptCompiler().compile(environment, options);
};

Emblem.compileRaw = function(string, options) {
  var compile, compiled;
  if (options == null) {
    options = {};
  }
  if (typeof string !== 'string') {
    throw new Handlebars.Exception("You must pass a string to Emblem.compile. You passed " + string);
  }
  if (__indexOf.call(options, 'data') < 0) {
    options.data = true;
  }
  compiled = null;
  compile = function() {
    var ast, environment, templateSpec;
    ast = Emblem.parse(string);
    environment = new Handlebars.Compiler().compile(ast, options);
    templateSpec = new Handlebars.JavaScriptCompiler().compile(environment, options, void 0, true);
    return Handlebars.template(templateSpec);
  };
  return function(context, options) {
    if (!compiled) {
      compiled = compile();
    }
    return compiled.call(this, context, options);
  };
};

Emblem.precompile = Emblem.precompileRaw;

Emblem.compile = Emblem.compileRaw;

Emblem.precompileEmber = function(string) {
  var ast, environment, options;
  ast = Emblem.parse(string);
  options = {
    knownHelpers: {
      action: true,
      unbound: true,
      bindAttr: true,
      template: true,
      view: true,
      _triageMustache: true
    },
    data: true,
    stringParams: true
  };
  environment = new Ember.Handlebars.Compiler().compile(ast, options);
  return new Ember.Handlebars.JavaScriptCompiler().compile(environment, options, void 0, true);
};

Emblem.compileEmber = function(string) {
  var ast, environment, options, templateSpec;
  ast = Emblem.parse(string);
  options = {
    data: true,
    stringParams: true
  };
  environment = new Ember.Handlebars.Compiler().compile(ast, options);
  templateSpec = new Ember.Handlebars.JavaScriptCompiler().compile(environment, options, void 0, true);
  return Ember.Handlebars.template(templateSpec);
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



Emblem.enableEmber = function() {
  if (typeof Ember === "undefined" || Ember === null) {
    throw new Error("Can't run Emblem.enableEmber before Ember has been defined");
  }
  Emblem.precompile = Emblem.precompileEmber;
  Emblem.compile = Emblem.compileEmber;
  if (typeof document !== "undefined" && document !== null) {
    return Ember.$('script[type="text/x-emblem"]', Ember.$(document)).each(function() {
      var script, templateName;
      script = Ember.$(this);
      templateName = script.attr('data-template-name') || script.attr('id') || 'application';
      Ember.TEMPLATES[templateName] = Emblem.compile(script.html());
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
