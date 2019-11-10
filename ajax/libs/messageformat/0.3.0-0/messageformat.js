/**
 * @file messageformat.js - ICU PluralFormat + SelectFormat for JavaScript
 * @author Alex Sexton - @SlexAxton
 * @version 0.3.0-0
 * @copyright 2012-2015 Alex Sexton, Eemeli Aro, and Contributors
 * @license To use or fork, MIT. To contribute back, Dojo CLA
 */


(function ( root ) {

  /**
   * Create a new message formatter
   *
   * @class
   * @global
   * @param {string|string[]} [locale="en"] - The locale to use, with fallbacks
   * @param {function} [pluralFunc] - Optional custom pluralization function
   * @param {function[]} [formatters] - Optional custom formatting functions
   */
  function MessageFormat(locale, pluralFunc, formatters) {
    if (!locale) {
      this.lc = ['en'];
    } else if (typeof locale == 'string') {
      this.lc = [];
      for (var l = locale; l; l = l.replace(/[-_]?[^-_]*$/, '')) this.lc.push(l);
    } else {
      this.lc = locale;
    }
    if (!pluralFunc) {
      pluralFunc = MessageFormat.getPluralFunc(this.lc);
      if (!pluralFunc) throw 'Plural function for locale `' + this.lc.join(',') + '` could not be loaded';
    }
    this.runtime.pluralFuncs = {};
    this.runtime.pluralFuncs[this.lc[0]] = pluralFunc;
    this.runtime.fmt = {};
    if (formatters) for (var f in formatters) {
      this.runtime.fmt[f] = formatters[f];
    }
  }

  /**
   * Publicly-accessible cache of pluralization functions, this is normally
   * filled by the internal `getPluralFunc()` function, but may be set
   * externally if e.g. the external dependency {@link
   * http://github.com/eemeli/make-plural.js make-plural} is not available.
   *
   * @memberof MessageFormat
   * @type Object.<string,function>
   * @example
   * > var MessageFormat = require('messageformat');
   * > MessageFormat.plurals.en = function(n) {  // cardinal plurals only
   *     return (n == 1 && !String(n).split('.')[1]) ? 'one' : 'other';
   *   };
   * > var mf = new MessageFormat('en');
   * > var mfunc = mf.compile('You have {N, plural, one{1 item} other{# items}.');
   * > mfunc({N:'1.0'})
   * "You have 1.0 items."
   */
  MessageFormat.plurals = {};

  /**
   * Look up the plural formatting function for a given locale code.
   *
   * If the {@link http://github.com/eemeli/make-plural.js make-plural module}
   * is not available, the {@link MessageFormat.plurals} object will need to be
   * pre-populated for this to work.
   *
   * @private
   * @memberof MessageFormat
   * @requires module:eemeli/make-plural.js
   * @param {string[]} locale - A preferentially ordered array of locale codes
   * @returns {function} The first match found for the given locale(s)
   */
  MessageFormat.getPluralFunc = function(locale) {
    var MakePlural = (typeof require != 'undefined') && require('make-plural') || root.MakePlural || function() { return false; };
    for (var i = 0; i < locale.length; ++i) {
      var lc = locale[i];
      if (lc in MessageFormat.plurals) {
        return MessageFormat.plurals[lc];
      }
      var fn = MakePlural(lc, {ordinals:1, quiet:1});
      if (fn) {
        MessageFormat.plurals[lc] = fn;
        return fn;
      }
    }
    return null;
  }

  /**
   * Default number formatting functions in the style of ICU's
   * {@link http://icu-project.org/apiref/icu4j/com/ibm/icu/text/MessageFormat.html simpleArg syntax}
   * implemented using the
   * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl Intl}
   * object defined by ECMA-402.
   *
   * **Note**: Intl is not defined in default Node until 0.11.15 / 0.12.0, so
   * earlier versions require a {@link https://www.npmjs.com/package/intl polyfill}.
   * Therefore {@link MessageFormat.withIntlSupport} needs to be true for these
   * functions to be available for inclusion in the output.
   *
   * @see MessageFormat#setIntlSupport
   *
   * @namespace
   * @memberof MessageFormat
   * @property {function} number - Represent a number as an integer, percent or currency value
   * @property {function} date - Represent a date as a full/long/default/short string
   * @property {function} time - Represent a time as a full/long/default/short string
   * @example
   * > var MessageFormat = require('messageformat');
   * > var mf = (new MessageFormat('en')).setIntlSupport(true);
   * > mf.currency = 'EUR';
   * > var mfunc = mf.compile("The total is {V,number,currency}.");
   * > mfunc({V:5.5})
   * "The total is €5.50."
   * @example
   * > var MessageFormat = require('messageformat');
   * > var mf = new MessageFormat('en', null, {number: MessageFormat.number});
   * > mf.currency = 'EUR';
   * > var mfunc = mf.compile("The total is {V,number,currency}.");
   * > mfunc({V:5.5})
   * "The total is €5.50."
   */
  MessageFormat.formatters = {
    number: function(self) {
      return new Function("v,lc,p",
        "return Intl.NumberFormat(lc,\n" +
        "    p=='integer' ? {maximumFractionDigits:0}\n" +
        "  : p=='percent' ? {style:'percent'}\n" +
        "  : p=='currency' ? {style:'currency', currency:'" + (self.currency || 'USD') + "', minimumFractionDigits:2, maximumFractionDigits:2}\n" +
        "  : {}).format(v)"
      );
    },
    date: function(v,lc,p) {
      var o = {day:'numeric', month:'short', year:'numeric'};
      switch (p) {
        case 'full': o.weekday = 'long';
        case 'long': o.month = 'long'; break;
        case 'short': o.month = 'numeric';
      }
      return (new Date(v)).toLocaleDateString(lc, o)
    },
    time: function(v,lc,p) {
      var o = {second:'numeric', minute:'numeric', hour:'numeric'};
      switch (p) {
        case 'full': case 'long': o.timeZoneName = 'short'; break;
        case 'short': delete o.minute;
      }
      return (new Date(v)).toLocaleTimeString(lc, o)
    }
  };

  /**
   * Enable or disable support for the default formatters, which require the
   * `Intl` object. Note that this can't be autodetected, as the environment
   * in which the formatted text is compiled into Javascript functions is not
   * necessarily the same environment in which they will get executed.
   *
   * @see MessageFormat.formatters
   *
   * @memberof MessageFormat
   * @param {boolean} [enable=true]
   * @returns {Object} The MessageFormat instance, to allow for chaining
   * @example
   * > var Intl = require('intl');
   * > var MessageFormat = require('messageformat');
   * > var mf = (new MessageFormat('en')).setIntlSupport(true);
   * > mf.currency = 'EUR';
   * > mf.compile("The total is {V,number,currency}.")({V:5.5});
   * "The total is €5.50."
   */
  MessageFormat.prototype.setIntlSupport = function(enable) {
      this.withIntlSupport = !!enable || (typeof enable == 'undefined');
      return this;
  };

  /**
   * A set of utility functions that are called by the compiled Javascript
   * functions, these are included locally in the output of {@link
   * MessageFormat#compile compile()}.
   *
   * @namespace
   * @memberof MessageFormat
   */
  MessageFormat.prototype.runtime = {
    /**
     * Utility function for `#` in plural rules
     *
     * @param {number} value - The value to operate on
     * @param {number} [offset=0] - An optional offset, set by the surrounding context
     */
    number: function(value, offset) {
      if (isNaN(value)) throw new Error("'" + value + "' isn't a number.");
      return value - (offset || 0);
    },

    /**
     * Utility function for `{N, plural|selectordinal, ...}`
     *
     * @param {number} value - The key to use to find a pluralization rule
     * @param {number} offset - An offset to apply to `value`
     * @param {function} lcfunc - A locale function from `pluralFuncs`
     * @param {Object.<string,string>} data - The object from which results are looked up
     * @param {?boolean} isOrdinal - If true, use ordinal rather than cardinal rules
     * @returns {string} The result of the pluralization
     */
    plural: function(value, offset, lcfunc, data, isOrdinal) {
      if (value in data) return data[value];
      if (offset) value -= offset;
      var key = lcfunc(value, isOrdinal);
      if (key in data) return data[key];
      return data.other;
    },

    /**
     * Utility function for `{N, select, ...}`
     *
     * @param {number} value - The key to use to find a selection
     * @param {Object.<string,string>} data - The object from which results are looked up
     * @returns {string} The result of the select statement
     */
    select: function(value, data) {
      if (value in data) return data[value];
      return data.other
    },

    /** Pluralization functions
     *  @instance
     *  @type Object.<string,function>  */
    pluralFuncs: {},

    /** Custom formatting functions called by `{var, fn[, args]*}` syntax
     *  @instance
     *  @see MessageFormat.formatters
     *  @type Object.<string,function>  */
    fmt: {},

    /** Custom stringifier to clean up browser inconsistencies */
    toString: function () {
      var _stringify = function(o, level) {
        if (typeof o != 'object') {
          var funcStr = o.toString().replace(/^(function )\w*/, '$1');
          var indent = /([ \t]*)\S.*$/.exec(funcStr);
          return indent ? funcStr.replace(new RegExp('^' + indent[1], 'mg'), '') : funcStr;
        }
        var s = [];
        for (var i in o) if (i != 'toString') {
          if (level == 0) s.push('var ' + i + ' = ' + _stringify(o[i], level + 1) + ';\n');
          else s.push(propname(i) + ': ' + _stringify(o[i], level + 1));
        }
        if (level == 0) return s.join('');
        if (s.length == 0) return '{}';
        var indent = '  '; while (--level) indent += '  ';
        return '{\n' + s.join(',\n').replace(/^/gm, indent) + '\n}';
      };
      return _stringify(this, 0);
    }
  };

  /** Parse an input string to its AST
   *  @private */
  MessageFormat._parse = function () {
    // This is generated and pulled in for browsers.
    var mparser = (function() {
      /*
       * Generated by PEG.js 0.8.0.
       *
       * http://pegjs.majda.cz/
       */
    
      function peg$subclass(child, parent) {
        function ctor() { this.constructor = child; }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
      }
    
      function SyntaxError(message, expected, found, offset, line, column) {
        this.message  = message;
        this.expected = expected;
        this.found    = found;
        this.offset   = offset;
        this.line     = line;
        this.column   = column;
    
        this.name     = "SyntaxError";
      }
    
      peg$subclass(SyntaxError, Error);
    
      function parse(input) {
        var options = arguments.length > 1 ? arguments[1] : {},
    
            peg$FAILED = {},
    
            peg$startRuleFunctions = { start: peg$parsestart },
            peg$startRuleFunction  = peg$parsestart,
    
            peg$c0 = peg$FAILED,
            peg$c1 = [],
            peg$c2 = function(s1, inner) {
                  var st = [];
                  if (s1 && s1.val) st.push(s1);
                  for (var i = 0; i < inner.length; i++) {
                    st.push(inner[i][0]);
                    if (inner[i][1].val !== "") st.push(inner[i][1]);
                  }
                  return { type: 'messageFormatPattern', statements: st };
                },
            peg$c3 = "{",
            peg$c4 = { type: "literal", value: "{", description: "\"{\"" },
            peg$c5 = null,
            peg$c6 = ",",
            peg$c7 = { type: "literal", value: ",", description: "\",\"" },
            peg$c8 = "}",
            peg$c9 = { type: "literal", value: "}", description: "\"}\"" },
            peg$c10 = function(argIdx, efmt) {
                  var res = {
                    type: "messageFormatElement",
                    argumentIndex: argIdx
                  };
                  if (efmt && efmt.length) {
                    res.elementFormat = efmt[1];
                  } else {
                    res.output = true;
                  }
                  return res;
                },
            peg$c11 = "plural",
            peg$c12 = { type: "literal", value: "plural", description: "\"plural\"" },
            peg$c13 = function(t, s) {
                  return { type: "elementFormat", key: t, val: s };
                },
            peg$c14 = "selectordinal",
            peg$c15 = { type: "literal", value: "selectordinal", description: "\"selectordinal\"" },
            peg$c16 = "select",
            peg$c17 = { type: "literal", value: "select", description: "\"select\"" },
            peg$c18 = function(t, p) {
                  return { type: "elementFormat", key: t, val: p };
                },
            peg$c19 = function(op, pf) {
                  return { type: "pluralFormatPattern", pluralForms: pf, offset: op || 0 };
                },
            peg$c20 = "offset",
            peg$c21 = { type: "literal", value: "offset", description: "\"offset\"" },
            peg$c22 = ":",
            peg$c23 = { type: "literal", value: ":", description: "\":\"" },
            peg$c24 = function(d) { return d; },
            peg$c25 = function(pf) { return { type: "selectFormatPattern", pluralForms: pf }; },
            peg$c26 = function(k, mfp) {
                  return { type: "pluralForms", key: k, val: mfp };
                },
            peg$c27 = function(i) { return i; },
            peg$c28 = "=",
            peg$c29 = { type: "literal", value: "=", description: "\"=\"" },
            peg$c30 = function(p) { return p; },
            peg$c31 = function(s) { return { type: "string", val: s.join('') }; },
            peg$c32 = { type: "other", description: "identifier" },
            peg$c33 = /^[0-9a-zA-Z$_]/,
            peg$c34 = { type: "class", value: "[0-9a-zA-Z$_]", description: "[0-9a-zA-Z$_]" },
            peg$c35 = /^[^ \t\n\r,.+={}]/,
            peg$c36 = { type: "class", value: "[^ \\t\\n\\r,.+={}]", description: "[^ \\t\\n\\r,.+={}]" },
            peg$c37 = function(s) { return s; },
            peg$c38 = function(chars) { return chars.join(''); },
            peg$c39 = /^[^{}\\\0-\x1F \t\n\r]/,
            peg$c40 = { type: "class", value: "[^{}\\\\\\0-\\x1F \\t\\n\\r]", description: "[^{}\\\\\\0-\\x1F \\t\\n\\r]" },
            peg$c41 = function(x) { return x; },
            peg$c42 = "\\#",
            peg$c43 = { type: "literal", value: "\\#", description: "\"\\\\#\"" },
            peg$c44 = function() { return "\\#"; },
            peg$c45 = "\\{",
            peg$c46 = { type: "literal", value: "\\{", description: "\"\\\\{\"" },
            peg$c47 = function() { return "\u007B"; },
            peg$c48 = "\\}",
            peg$c49 = { type: "literal", value: "\\}", description: "\"\\\\}\"" },
            peg$c50 = function() { return "\u007D"; },
            peg$c51 = "\\u",
            peg$c52 = { type: "literal", value: "\\u", description: "\"\\\\u\"" },
            peg$c53 = function(h1, h2, h3, h4) {
                  return String.fromCharCode(parseInt("0x" + h1 + h2 + h3 + h4));
                },
            peg$c54 = /^[0-9]/,
            peg$c55 = { type: "class", value: "[0-9]", description: "[0-9]" },
            peg$c56 = function(ds) {
                //the number might start with 0 but must not be interpreted as an octal number
                //Hence, the base is passed to parseInt explicitely
                return parseInt((ds.join('')), 10);
              },
            peg$c57 = /^[0-9a-fA-F]/,
            peg$c58 = { type: "class", value: "[0-9a-fA-F]", description: "[0-9a-fA-F]" },
            peg$c59 = { type: "other", description: "whitespace" },
            peg$c60 = function(w) { return w.join(''); },
            peg$c61 = /^[ \t\n\r]/,
            peg$c62 = { type: "class", value: "[ \\t\\n\\r]", description: "[ \\t\\n\\r]" },
    
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
    
        function expected(description) {
          throw peg$buildException(
            null,
            [{ type: "other", description: description }],
            peg$reportedPos
          );
        }
    
        function error(message) {
          throw peg$buildException(message, null, peg$reportedPos);
        }
    
        function peg$computePosDetails(pos) {
          function advance(details, startPos, endPos) {
            var p, ch;
    
            for (p = startPos; p < endPos; p++) {
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
            advance(peg$cachedPosDetails, peg$cachedPos, pos);
            peg$cachedPos = pos;
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
    
        function peg$buildException(message, expected, pos) {
          function cleanupExpected(expected) {
            var i = 1;
    
            expected.sort(function(a, b) {
              if (a.description < b.description) {
                return -1;
              } else if (a.description > b.description) {
                return 1;
              } else {
                return 0;
              }
            });
    
            while (i < expected.length) {
              if (expected[i - 1] === expected[i]) {
                expected.splice(i, 1);
              } else {
                i++;
              }
            }
          }
    
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
    
            var expectedDescs = new Array(expected.length),
                expectedDesc, foundDesc, i;
    
            for (i = 0; i < expected.length; i++) {
              expectedDescs[i] = expected[i].description;
            }
    
            expectedDesc = expected.length > 1
              ? expectedDescs.slice(0, -1).join(", ")
                  + " or "
                  + expectedDescs[expected.length - 1]
              : expectedDescs[0];
    
            foundDesc = found ? "\"" + stringEscape(found) + "\"" : "end of input";
    
            return "Expected " + expectedDesc + " but " + foundDesc + " found.";
          }
    
          var posDetails = peg$computePosDetails(pos),
              found      = pos < input.length ? input.charAt(pos) : null;
    
          if (expected !== null) {
            cleanupExpected(expected);
          }
    
          return new SyntaxError(
            message !== null ? message : buildMessage(expected, found),
            expected,
            found,
            pos,
            posDetails.line,
            posDetails.column
          );
        }
    
        function peg$parsestart() {
          var s0;
    
          s0 = peg$parsemessageFormatPattern();
    
          return s0;
        }
    
        function peg$parsemessageFormatPattern() {
          var s0, s1, s2, s3, s4, s5;
    
          s0 = peg$currPos;
          s1 = peg$parsestring();
          if (s1 !== peg$FAILED) {
            s2 = [];
            s3 = peg$currPos;
            s4 = peg$parsemessageFormatElement();
            if (s4 !== peg$FAILED) {
              s5 = peg$parsestring();
              if (s5 !== peg$FAILED) {
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
            while (s3 !== peg$FAILED) {
              s2.push(s3);
              s3 = peg$currPos;
              s4 = peg$parsemessageFormatElement();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsestring();
                if (s5 !== peg$FAILED) {
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
            if (s2 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c2(s1, s2);
              s0 = s1;
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
    
        function peg$parsemessageFormatElement() {
          var s0, s1, s2, s3, s4, s5, s6;
    
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 123) {
            s1 = peg$c3;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c4); }
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$parse_();
            if (s2 !== peg$FAILED) {
              s3 = peg$parseid();
              if (s3 !== peg$FAILED) {
                s4 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 44) {
                  s5 = peg$c6;
                  peg$currPos++;
                } else {
                  s5 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c7); }
                }
                if (s5 !== peg$FAILED) {
                  s6 = peg$parseelementFormat();
                  if (s6 !== peg$FAILED) {
                    s5 = [s5, s6];
                    s4 = s5;
                  } else {
                    peg$currPos = s4;
                    s4 = peg$c0;
                  }
                } else {
                  peg$currPos = s4;
                  s4 = peg$c0;
                }
                if (s4 === peg$FAILED) {
                  s4 = peg$c5;
                }
                if (s4 !== peg$FAILED) {
                  s5 = peg$parse_();
                  if (s5 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 125) {
                      s6 = peg$c8;
                      peg$currPos++;
                    } else {
                      s6 = peg$FAILED;
                      if (peg$silentFails === 0) { peg$fail(peg$c9); }
                    }
                    if (s6 !== peg$FAILED) {
                      peg$reportedPos = s0;
                      s1 = peg$c10(s3, s4);
                      s0 = s1;
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
    
        function peg$parseelementFormat() {
          var s0, s1, s2, s3, s4, s5, s6, s7;
    
          s0 = peg$currPos;
          s1 = peg$parse_();
          if (s1 !== peg$FAILED) {
            if (input.substr(peg$currPos, 6) === peg$c11) {
              s2 = peg$c11;
              peg$currPos += 6;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c12); }
            }
            if (s2 !== peg$FAILED) {
              s3 = peg$parse_();
              if (s3 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 44) {
                  s4 = peg$c6;
                  peg$currPos++;
                } else {
                  s4 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c7); }
                }
                if (s4 !== peg$FAILED) {
                  s5 = peg$parse_();
                  if (s5 !== peg$FAILED) {
                    s6 = peg$parsepluralFormatPattern();
                    if (s6 !== peg$FAILED) {
                      s7 = peg$parse_();
                      if (s7 !== peg$FAILED) {
                        peg$reportedPos = s0;
                        s1 = peg$c13(s2, s6);
                        s0 = s1;
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
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            s1 = peg$parse_();
            if (s1 !== peg$FAILED) {
              if (input.substr(peg$currPos, 13) === peg$c14) {
                s2 = peg$c14;
                peg$currPos += 13;
              } else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c15); }
              }
              if (s2 !== peg$FAILED) {
                s3 = peg$parse_();
                if (s3 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 44) {
                    s4 = peg$c6;
                    peg$currPos++;
                  } else {
                    s4 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c7); }
                  }
                  if (s4 !== peg$FAILED) {
                    s5 = peg$parse_();
                    if (s5 !== peg$FAILED) {
                      s6 = peg$parseselectFormatPattern();
                      if (s6 !== peg$FAILED) {
                        s7 = peg$parse_();
                        if (s7 !== peg$FAILED) {
                          peg$reportedPos = s0;
                          s1 = peg$c13(s2, s6);
                          s0 = s1;
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
            if (s0 === peg$FAILED) {
              s0 = peg$currPos;
              s1 = peg$parse_();
              if (s1 !== peg$FAILED) {
                if (input.substr(peg$currPos, 6) === peg$c16) {
                  s2 = peg$c16;
                  peg$currPos += 6;
                } else {
                  s2 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c17); }
                }
                if (s2 !== peg$FAILED) {
                  s3 = peg$parse_();
                  if (s3 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 44) {
                      s4 = peg$c6;
                      peg$currPos++;
                    } else {
                      s4 = peg$FAILED;
                      if (peg$silentFails === 0) { peg$fail(peg$c7); }
                    }
                    if (s4 !== peg$FAILED) {
                      s5 = peg$parse_();
                      if (s5 !== peg$FAILED) {
                        s6 = peg$parseselectFormatPattern();
                        if (s6 !== peg$FAILED) {
                          s7 = peg$parse_();
                          if (s7 !== peg$FAILED) {
                            peg$reportedPos = s0;
                            s1 = peg$c13(s2, s6);
                            s0 = s1;
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
              if (s0 === peg$FAILED) {
                s0 = peg$currPos;
                s1 = peg$parse_();
                if (s1 !== peg$FAILED) {
                  s2 = peg$parseid();
                  if (s2 !== peg$FAILED) {
                    s3 = [];
                    s4 = peg$parseargStylePattern();
                    while (s4 !== peg$FAILED) {
                      s3.push(s4);
                      s4 = peg$parseargStylePattern();
                    }
                    if (s3 !== peg$FAILED) {
                      peg$reportedPos = s0;
                      s1 = peg$c18(s2, s3);
                      s0 = s1;
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
            }
          }
    
          return s0;
        }
    
        function peg$parsepluralFormatPattern() {
          var s0, s1, s2, s3;
    
          s0 = peg$currPos;
          s1 = peg$parseoffsetPattern();
          if (s1 === peg$FAILED) {
            s1 = peg$c5;
          }
          if (s1 !== peg$FAILED) {
            s2 = [];
            s3 = peg$parsepluralForms();
            while (s3 !== peg$FAILED) {
              s2.push(s3);
              s3 = peg$parsepluralForms();
            }
            if (s2 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c19(s1, s2);
              s0 = s1;
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
    
        function peg$parseoffsetPattern() {
          var s0, s1, s2, s3, s4, s5, s6, s7;
    
          s0 = peg$currPos;
          s1 = peg$parse_();
          if (s1 !== peg$FAILED) {
            if (input.substr(peg$currPos, 6) === peg$c20) {
              s2 = peg$c20;
              peg$currPos += 6;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c21); }
            }
            if (s2 !== peg$FAILED) {
              s3 = peg$parse_();
              if (s3 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 58) {
                  s4 = peg$c22;
                  peg$currPos++;
                } else {
                  s4 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c23); }
                }
                if (s4 !== peg$FAILED) {
                  s5 = peg$parse_();
                  if (s5 !== peg$FAILED) {
                    s6 = peg$parsedigits();
                    if (s6 !== peg$FAILED) {
                      s7 = peg$parse_();
                      if (s7 !== peg$FAILED) {
                        peg$reportedPos = s0;
                        s1 = peg$c24(s6);
                        s0 = s1;
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
    
        function peg$parseselectFormatPattern() {
          var s0, s1, s2;
    
          s0 = peg$currPos;
          s1 = [];
          s2 = peg$parsepluralForms();
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            s2 = peg$parsepluralForms();
          }
          if (s1 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c25(s1);
          }
          s0 = s1;
    
          return s0;
        }
    
        function peg$parsepluralForms() {
          var s0, s1, s2, s3, s4, s5, s6, s7, s8;
    
          s0 = peg$currPos;
          s1 = peg$parse_();
          if (s1 !== peg$FAILED) {
            s2 = peg$parsestringKey();
            if (s2 !== peg$FAILED) {
              s3 = peg$parse_();
              if (s3 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 123) {
                  s4 = peg$c3;
                  peg$currPos++;
                } else {
                  s4 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c4); }
                }
                if (s4 !== peg$FAILED) {
                  s5 = peg$parse_();
                  if (s5 !== peg$FAILED) {
                    s6 = peg$parsemessageFormatPattern();
                    if (s6 !== peg$FAILED) {
                      s7 = peg$parse_();
                      if (s7 !== peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 125) {
                          s8 = peg$c8;
                          peg$currPos++;
                        } else {
                          s8 = peg$FAILED;
                          if (peg$silentFails === 0) { peg$fail(peg$c9); }
                        }
                        if (s8 !== peg$FAILED) {
                          peg$reportedPos = s0;
                          s1 = peg$c26(s2, s6);
                          s0 = s1;
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
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
    
          return s0;
        }
    
        function peg$parsestringKey() {
          var s0, s1, s2;
    
          s0 = peg$currPos;
          s1 = peg$parseid();
          if (s1 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c27(s1);
          }
          s0 = s1;
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 61) {
              s1 = peg$c28;
              peg$currPos++;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c29); }
            }
            if (s1 !== peg$FAILED) {
              s2 = peg$parsedigits();
              if (s2 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c24(s2);
                s0 = s1;
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
    
        function peg$parseargStylePattern() {
          var s0, s1, s2, s3, s4, s5;
    
          s0 = peg$currPos;
          s1 = peg$parse_();
          if (s1 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 44) {
              s2 = peg$c6;
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c7); }
            }
            if (s2 !== peg$FAILED) {
              s3 = peg$parse_();
              if (s3 !== peg$FAILED) {
                s4 = peg$parseid();
                if (s4 !== peg$FAILED) {
                  s5 = peg$parse_();
                  if (s5 !== peg$FAILED) {
                    peg$reportedPos = s0;
                    s1 = peg$c30(s4);
                    s0 = s1;
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
    
        function peg$parsestring() {
          var s0, s1, s2;
    
          s0 = peg$currPos;
          s1 = [];
          s2 = peg$parsechars();
          if (s2 === peg$FAILED) {
            s2 = peg$parsewhitespace();
          }
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            s2 = peg$parsechars();
            if (s2 === peg$FAILED) {
              s2 = peg$parsewhitespace();
            }
          }
          if (s1 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c31(s1);
          }
          s0 = s1;
    
          return s0;
        }
    
        function peg$parseid() {
          var s0, s1, s2, s3, s4, s5, s6;
    
          peg$silentFails++;
          s0 = peg$currPos;
          s1 = peg$parse_();
          if (s1 !== peg$FAILED) {
            s2 = peg$currPos;
            s3 = peg$currPos;
            if (peg$c33.test(input.charAt(peg$currPos))) {
              s4 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c34); }
            }
            if (s4 !== peg$FAILED) {
              s5 = [];
              if (peg$c35.test(input.charAt(peg$currPos))) {
                s6 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s6 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c36); }
              }
              while (s6 !== peg$FAILED) {
                s5.push(s6);
                if (peg$c35.test(input.charAt(peg$currPos))) {
                  s6 = input.charAt(peg$currPos);
                  peg$currPos++;
                } else {
                  s6 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c36); }
                }
              }
              if (s5 !== peg$FAILED) {
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
            if (s3 !== peg$FAILED) {
              s3 = input.substring(s2, peg$currPos);
            }
            s2 = s3;
            if (s2 !== peg$FAILED) {
              s3 = peg$parse_();
              if (s3 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c37(s2);
                s0 = s1;
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
          peg$silentFails--;
          if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c32); }
          }
    
          return s0;
        }
    
        function peg$parsechars() {
          var s0, s1, s2;
    
          s0 = peg$currPos;
          s1 = [];
          s2 = peg$parsechar();
          if (s2 !== peg$FAILED) {
            while (s2 !== peg$FAILED) {
              s1.push(s2);
              s2 = peg$parsechar();
            }
          } else {
            s1 = peg$c0;
          }
          if (s1 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c38(s1);
          }
          s0 = s1;
    
          return s0;
        }
    
        function peg$parsechar() {
          var s0, s1, s2, s3, s4, s5;
    
          s0 = peg$currPos;
          if (peg$c39.test(input.charAt(peg$currPos))) {
            s1 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c40); }
          }
          if (s1 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c41(s1);
          }
          s0 = s1;
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (input.substr(peg$currPos, 2) === peg$c42) {
              s1 = peg$c42;
              peg$currPos += 2;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c43); }
            }
            if (s1 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c44();
            }
            s0 = s1;
            if (s0 === peg$FAILED) {
              s0 = peg$currPos;
              if (input.substr(peg$currPos, 2) === peg$c45) {
                s1 = peg$c45;
                peg$currPos += 2;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c46); }
              }
              if (s1 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c47();
              }
              s0 = s1;
              if (s0 === peg$FAILED) {
                s0 = peg$currPos;
                if (input.substr(peg$currPos, 2) === peg$c48) {
                  s1 = peg$c48;
                  peg$currPos += 2;
                } else {
                  s1 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c49); }
                }
                if (s1 !== peg$FAILED) {
                  peg$reportedPos = s0;
                  s1 = peg$c50();
                }
                s0 = s1;
                if (s0 === peg$FAILED) {
                  s0 = peg$currPos;
                  if (input.substr(peg$currPos, 2) === peg$c51) {
                    s1 = peg$c51;
                    peg$currPos += 2;
                  } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c52); }
                  }
                  if (s1 !== peg$FAILED) {
                    s2 = peg$parsehexDigit();
                    if (s2 !== peg$FAILED) {
                      s3 = peg$parsehexDigit();
                      if (s3 !== peg$FAILED) {
                        s4 = peg$parsehexDigit();
                        if (s4 !== peg$FAILED) {
                          s5 = peg$parsehexDigit();
                          if (s5 !== peg$FAILED) {
                            peg$reportedPos = s0;
                            s1 = peg$c53(s2, s3, s4, s5);
                            s0 = s1;
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
              }
            }
          }
    
          return s0;
        }
    
        function peg$parsedigits() {
          var s0, s1, s2;
    
          s0 = peg$currPos;
          s1 = [];
          if (peg$c54.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c55); }
          }
          if (s2 !== peg$FAILED) {
            while (s2 !== peg$FAILED) {
              s1.push(s2);
              if (peg$c54.test(input.charAt(peg$currPos))) {
                s2 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c55); }
              }
            }
          } else {
            s1 = peg$c0;
          }
          if (s1 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c56(s1);
          }
          s0 = s1;
    
          return s0;
        }
    
        function peg$parsehexDigit() {
          var s0;
    
          if (peg$c57.test(input.charAt(peg$currPos))) {
            s0 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c58); }
          }
    
          return s0;
        }
    
        function peg$parse_() {
          var s0, s1, s2;
    
          peg$silentFails++;
          s0 = peg$currPos;
          s1 = [];
          s2 = peg$parsewhitespace();
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            s2 = peg$parsewhitespace();
          }
          if (s1 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c60(s1);
          }
          s0 = s1;
          peg$silentFails--;
          if (s0 === peg$FAILED) {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c59); }
          }
    
          return s0;
        }
    
        function peg$parsewhitespace() {
          var s0;
    
          if (peg$c61.test(input.charAt(peg$currPos))) {
            s0 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c62); }
          }
    
          return s0;
        }
    
        peg$result = peg$startRuleFunction();
    
        if (peg$result !== peg$FAILED && peg$currPos === input.length) {
          return peg$result;
        } else {
          if (peg$result !== peg$FAILED && peg$currPos < input.length) {
            peg$fail({ type: "end", description: "end of input" });
          }
    
          throw peg$buildException(null, peg$maxFailExpected, peg$maxFailPos);
        }
      }
    
      return {
        SyntaxError: SyntaxError,
        parse:       parse
      };
    })();
    // Bind to itself so error handling works
    return mparser.parse.apply( mparser, arguments );
  };

  /** Utility function for quoting an Object's key value iff required
   *  @private */
  var propname = function(key, obj) {
    if (/^[A-Z_$][0-9A-Z_$]*$/i.test(key)) {
      return obj ? obj + '.' + key : key;
    } else {
      var jkey = JSON.stringify(key);
      return obj ? obj + '[' + jkey + ']' : jkey;
    }
  };

  /** Recursively map an AST to its resulting string
   *  @private */
  MessageFormat.prototype._precompile = function(ast, data) {
    data = data || { keys: {}, offset: {} };
    var r = [], i, tmp, args = [];

    switch ( ast.type ) {
      case 'messageFormatPattern':
        for ( i = 0; i < ast.statements.length; ++i ) {
          r.push(this._precompile( ast.statements[i], data ));
        }
        tmp = r.join(' + ') || '""';
        return data.pf_count ? tmp : 'function(d) { return ' + tmp + '; }';

      case 'messageFormatElement':
        data.pf_count = data.pf_count || 0;
        if ( ast.output ) {
          return propname(ast.argumentIndex, 'd');
        }
        else {
          data.keys[data.pf_count] = ast.argumentIndex;
          return this._precompile( ast.elementFormat, data );
        }
        return '';

      case 'elementFormat':
        var args = [ propname(data.keys[data.pf_count], 'd') ];
        switch (ast.key) {
          case 'select':
            args.push(this._precompile(ast.val, data));
            return 'select(' + args.join(', ') + ')';
          case 'selectordinal':
            args = args.concat([ 0, propname(this.lc[0], 'pluralFuncs'), this._precompile(ast.val, data), 1 ]);
            return 'plural(' + args.join(', ') + ')';
          case 'plural':
            data.offset[data.pf_count || 0] = ast.val.offset || 0;
            args = args.concat([ data.offset[data.pf_count] || 0, propname(this.lc[0], 'pluralFuncs'), this._precompile(ast.val, data) ]);
            return 'plural(' + args.join(', ') + ')';
          default:
            if (this.withIntlSupport && !(ast.key in this.runtime.fmt) && (ast.key in MessageFormat.formatters)) {
              tmp = MessageFormat.formatters[ast.key];
              this.runtime.fmt[ast.key] = (typeof tmp(this) == 'function') ? tmp(this) : tmp;
            }
            args.push(JSON.stringify(this.lc));
            if (ast.val && ast.val.length) args.push(JSON.stringify(ast.val.length == 1 ? ast.val[0] : ast.val));
            return 'fmt.' + ast.key + '(' + args.join(', ') + ')';
        }

      case 'pluralFormatPattern':
      case 'selectFormatPattern':
        data.pf_count = data.pf_count || 0;
        if (ast.type == 'selectFormatPattern') data.offset[data.pf_count] = 0;
        var needOther = true;
        for ( i = 0; i < ast.pluralForms.length; ++i ) {
          var key = ast.pluralForms[i].key;
          if ( key === 'other' ) {
            needOther = false;
          }
          var data_copy = JSON.parse(JSON.stringify(data));
          data_copy.pf_count++;
          r.push(propname(key) + ': ' + this._precompile(ast.pluralForms[i].val, data_copy));
        }
        if ( needOther ) {
          throw new Error("No 'other' form found in " + ast.type + " " + data.pf_count);
        }
        return '{ ' + r.join(', ') + ' }';

      case 'string':
        tmp = '"' + (ast.val || "").replace(/\n/g, '\\n').replace(/"/g, '\\"') + '"';
        if ( data.pf_count ) {
          args = [ propname(data.keys[data.pf_count-1], 'd') ];
          if (data.offset[data.pf_count-1]) args.push(data.offset[data.pf_count-1]);
          tmp = tmp.replace(/(^|[^\\])#/g, '$1"+' + 'number(' + args.join(', ') + ')+"');
          tmp = tmp.replace(/^""\+/, '').replace(/\+""$/, '');
        }
        return tmp;

      default:
        throw new Error( 'Bad AST type: ' + ast.type );
    }
  };

  /**
   * Compile messages into an executable function with clean string
   * representation.
   *
   * If `messages` is a single string including ICU MessageFormat declarations,
   * `opt` is ignored and the returned function takes a single Object parameter
   * `d` representing each of the input's defined variables. The returned
   * function will be defined in a local scope that includes all the required
   * runtime variables.
   *
   * If `messages` is a map of keys to strings, or a map of namespace keys to
   * such key/string maps, the returned function will fill the specified global
   * with javascript functions matching the structure of the input. In such use,
   * the output of `compile()` is expected to be serialized using `.toString()`,
   * and will include definitions of the runtime functions.
   *
   * Together, the input parameters should match the following patterns:
   * ```js
   * messages = "string" || { key0: "string0", key1: "string1", ... } || {
   *   ns0: { key0: "string0", key1: "string1", ...  },
   *   ns1: { key0: "string0", key1: "string1", ...  },
   *   ...
   * }
   *
   * opt = null || {
   *   locale: null || {
   *     ns0: "lc0" || [ "lc0", ... ],
   *     ns1: "lc1" || [ "lc1", ... ],
   *     ...
   *   },
   *   global: null || "module.exports" || "exports" || "i18n" || ...
   * }
   * ```
   *
   * @memberof MessageFormat
   * @param {string|Object}
   *     messages - The input message(s) to be compiled, in ICU MessageFormat
   * @param {Object} [opt={}] - Options controlling output for non-simple intput
   * @param {Object} [opt.locale] - The locales to use for the messages, with a
   *     structure matching that of `messages`
   * @param {string} [opt.global=""] - The global variable that the output
   *     function should use, or a null string for none. "exports" and
   *     "module.exports" are recognised as special cases.
   * @returns {function} The first match found for the given locale(s)
   */
  MessageFormat.prototype.compile = function ( messages, opt ) {
    var r = {}, lc0 = this.lc,
        compileMsg = function(self, msg) {
          try {
            var ast = MessageFormat._parse(msg);
            return self._precompile(ast);
          } catch (e) {
            throw new Error((ast ? 'Precompiler' : 'Parser') + ' error: ' + e.toString());
          }
        },
        stringify = function(r, level) {
          if (!level) level = 0;
          if (typeof r != 'object') return r;
          var o = [], indent = '';
          for (var i = 0; i < level; ++i) indent += '  ';
          for (var k in r) o.push('\n' + indent + '  ' + propname(k) + ': ' + stringify(r[k], level + 1));
          return '{' + o.join(',') + '\n' + indent + '}';
        };

    if (typeof messages == 'string') {
      var f = new Function(
          'number, plural, select, pluralFuncs, fmt',
          'return ' + compileMsg(this, messages));
      return f(this.runtime.number, this.runtime.plural, this.runtime.select,
          this.runtime.pluralFuncs, this.runtime.fmt);
    }

    opt = opt || {};

    for (var ns in messages) {
      if (opt.locale) this.lc = opt.locale[ns] && [].concat(opt.locale[ns]) || lc0;
      if (typeof messages[ns] == 'string') {
        try { r[ns] = compileMsg(this, messages[ns]); }
        catch (e) { e.message = e.message.replace(':', ' with `' + ns + '`:'); throw e; }
      } else {
        r[ns] = {};
        for (var key in messages[ns]) {
          try { r[ns][key] = compileMsg(this, messages[ns][key]); }
          catch (e) { e.message = e.message.replace(':', ' with `' + key + '` in `' + ns + '`:'); throw e; }
        }
      }
    }

    this.lc = lc0;
    var s = this.runtime.toString() + '\n';
    switch (opt.global || '') {
      case 'exports':
        var o = [];
        for (var k in r) o.push(propname(k, 'exports') + ' = ' + stringify(r[k]));
        return new Function(s + o.join(';\n'));
      case 'module.exports':
        return new Function(s + 'module.exports = ' + stringify(r));
      case '':
        return new Function(s + 'return ' + stringify(r));
      default:
        return new Function('G', s + propname(opt.global, 'G') + ' = ' + stringify(r));
    }
  };


  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = MessageFormat;
    }
    exports.MessageFormat = MessageFormat;
  }
  else if (typeof define === 'function' && define.amd) {
    define(['make-plural'], function() {
      return MessageFormat;
    });
  }
  else {
    root['MessageFormat'] = MessageFormat;
  }

})( this );
