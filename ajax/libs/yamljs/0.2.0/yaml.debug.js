(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Dumper, Inline, Utils;

Utils = require('./Utils');

Inline = require('./Inline');

Dumper = (function() {
  function Dumper() {}

  Dumper.indentation = 4;

  Dumper.prototype.dump = function(input, inline, indent, exceptionOnInvalidType, objectEncoder) {
    var key, output, prefix, value, willBeInlined, _i, _len;
    if (inline == null) {
      inline = 0;
    }
    if (indent == null) {
      indent = 0;
    }
    if (exceptionOnInvalidType == null) {
      exceptionOnInvalidType = false;
    }
    if (objectEncoder == null) {
      objectEncoder = null;
    }
    output = '';
    prefix = (indent ? Utils.strRepeat(' ', indent) : '');
    if (inline <= 0 || typeof input !== 'object' || input instanceof Date || Utils.isEmpty(input)) {
      output += prefix + Inline.dump(input, exceptionOnInvalidType, objectEncoder);
    } else {
      if (input instanceof Array) {
        for (_i = 0, _len = input.length; _i < _len; _i++) {
          value = input[_i];
          willBeInlined = inline - 1 <= 0 || typeof value !== 'object' || Utils.isEmpty(value);
          output += prefix + '-' + (willBeInlined ? ' ' : "\n") + this.dump(value, inline - 1, (willBeInlined ? 0 : indent + this.indentation), exceptionOnInvalidType, objectEncoder) + (willBeInlined ? "\n" : '');
        }
      } else {
        for (key in input) {
          value = input[key];
          willBeInlined = inline - 1 <= 0 || typeof value !== 'object' || Utils.isEmpty(value);
          output += prefix + Inline.dump(key, exceptionOnInvalidType, objectEncoder) + ':' + (willBeInlined ? ' ' : "\n") + this.dump(value, inline - 1, (willBeInlined ? 0 : indent + this.indentation), exceptionOnInvalidType, objectEncoder) + (willBeInlined ? "\n" : '');
        }
      }
    }
    return output;
  };

  return Dumper;

})();

module.exports = Dumper;



},{"./Inline":5,"./Utils":9}],2:[function(require,module,exports){
var Escaper, Pattern;

Pattern = require('./Pattern');

Escaper = (function() {
  var ch;

  function Escaper() {}

  Escaper.LIST_ESCAPEES = ['\\\\', '\\"', '"', "\x00", "\x01", "\x02", "\x03", "\x04", "\x05", "\x06", "\x07", "\x08", "\x09", "\x0a", "\x0b", "\x0c", "\x0d", "\x0e", "\x0f", "\x10", "\x11", "\x12", "\x13", "\x14", "\x15", "\x16", "\x17", "\x18", "\x19", "\x1a", "\x1b", "\x1c", "\x1d", "\x1e", "\x1f", (ch = String.fromCharCode)(0x0085), ch(0x00A0), ch(0x2028), ch(0x2029)];

  Escaper.LIST_ESCAPED = ['\\"', '\\\\', '\\"', "\\0", "\\x01", "\\x02", "\\x03", "\\x04", "\\x05", "\\x06", "\\a", "\\b", "\\t", "\\n", "\\v", "\\f", "\\r", "\\x0e", "\\x0f", "\\x10", "\\x11", "\\x12", "\\x13", "\\x14", "\\x15", "\\x16", "\\x17", "\\x18", "\\x19", "\\x1a", "\\e", "\\x1c", "\\x1d", "\\x1e", "\\x1f", "\\N", "\\_", "\\L", "\\P"];

  Escaper.MAPPING_ESCAPEES_TO_ESCAPED = (function() {
    var i, mapping, _i, _ref;
    mapping = {};
    for (i = _i = 0, _ref = Escaper.LIST_ESCAPEES.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      mapping[Escaper.LIST_ESCAPEES[i]] = Escaper.LIST_ESCAPED[i];
    }
    return mapping;
  })();

  Escaper.PATTERN_CHARACTERS_TO_ESCAPE = new Pattern('[\\x00-\\x1f]|\xc2\x85|\xc2\xa0|\xe2\x80\xa8|\xe2\x80\xa9');

  Escaper.PATTERN_MAPPING_ESCAPEES = new Pattern(Escaper.LIST_ESCAPEES.join('|'));

  Escaper.PATTERN_SINGLE_QUOTING = new Pattern('[\\s\'":{}[\\],&*#?]|^[-?|<>=!%@`]');

  Escaper.requiresDoubleQuoting = function(value) {
    return this.PATTERN_CHARACTERS_TO_ESCAPE.test(value);
  };

  Escaper.escapeWithDoubleQuotes = function(value) {
    var result;
    result = this.PATTERN_MAPPING_ESCAPEES.replace(value, (function(_this) {
      return function(str) {
        return _this.MAPPING_ESCAPEES_TO_ESCAPED[str];
      };
    })(this));
    return '"' + result + '"';
  };

  Escaper.requiresSingleQuoting = function(value) {
    return this.PATTERN_SINGLE_QUOTING.test(value);
  };

  Escaper.escapeWithSingleQuotes = function(value) {
    return "'" + value.replace('\'', '\'\'') + "'";
  };

  return Escaper;

})();

module.exports = Escaper;



},{"./Pattern":7}],3:[function(require,module,exports){
var DumpException,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

DumpException = (function(_super) {
  __extends(DumpException, _super);

  function DumpException(message, parsedLine, snippet) {
    this.message = message;
    this.parsedLine = parsedLine;
    this.snippet = snippet;
  }

  DumpException.prototype.toString = function() {
    if ((this.parsedLine != null) && (this.snippet != null)) {
      return '<DumpException> ' + this.message + ' (line ' + this.parsedLine + ': \'' + this.snippet + '\')';
    } else {
      return '<DumpException> ' + this.message;
    }
  };

  return DumpException;

})(Error);

module.exports = DumpException;



},{}],4:[function(require,module,exports){
var ParseException,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

ParseException = (function(_super) {
  __extends(ParseException, _super);

  function ParseException(message, parsedLine, snippet) {
    this.message = message;
    this.parsedLine = parsedLine;
    this.snippet = snippet;
  }

  ParseException.prototype.toString = function() {
    if ((this.parsedLine != null) && (this.snippet != null)) {
      return '<ParseException> ' + this.message + ' (line ' + this.parsedLine + ': \'' + this.snippet + '\')';
    } else {
      return '<ParseException> ' + this.message;
    }
  };

  return ParseException;

})(Error);

module.exports = ParseException;



},{}],5:[function(require,module,exports){
var DumpException, Escaper, Inline, ParseException, Pattern, Unescaper, Utils,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

Pattern = require('./Pattern');

Unescaper = require('./Unescaper');

Escaper = require('./Escaper');

Utils = require('./Utils');

ParseException = require('./Exception/ParseException');

DumpException = require('./Exception/DumpException');

Inline = (function() {
  function Inline() {}

  Inline.REGEX_QUOTED_STRING = '(?:"(?:[^"\\\\]*(?:\\\\.[^"\\\\]*)*)"|\'(?:[^\']*(?:\'\'[^\']*)*)\')';

  Inline.PATTERN_TRAILING_COMMENTS = new Pattern('^\\s*#.*$');

  Inline.PATTERN_QUOTED_SCALAR = new Pattern('^' + Inline.REGEX_QUOTED_STRING);

  Inline.PATTERN_THOUSAND_NUMERIC_SCALAR = new Pattern('^(-|\\+)?[0-9,]+(\\.[0-9]+)?$');

  Inline.PATTERN_SCALAR_BY_DELIMITERS = {};

  Inline.settings = {};

  Inline.configure = function(exceptionOnInvalidType, objectDecoder) {
    if (exceptionOnInvalidType == null) {
      exceptionOnInvalidType = null;
    }
    if (objectDecoder == null) {
      objectDecoder = null;
    }
    this.settings.exceptionOnInvalidType = exceptionOnInvalidType;
    this.settings.objectDecoder = objectDecoder;
  };

  Inline.parse = function(value, exceptionOnInvalidType, objectDecoder) {
    var context, result;
    if (exceptionOnInvalidType == null) {
      exceptionOnInvalidType = false;
    }
    if (objectDecoder == null) {
      objectDecoder = null;
    }
    this.settings.exceptionOnInvalidType = exceptionOnInvalidType;
    this.settings.objectDecoder = objectDecoder;
    if (value == null) {
      return '';
    }
    value = Utils.trim(value);
    if (0 === value.length) {
      return '';
    }
    context = {
      exceptionOnInvalidType: exceptionOnInvalidType,
      objectDecoder: objectDecoder,
      i: 0
    };
    switch (value.charAt(0)) {
      case '[':
        result = this.parseSequence(value, context);
        ++context.i;
        break;
      case '{':
        result = this.parseMapping(value, context);
        ++context.i;
        break;
      default:
        result = this.parseScalar(value, null, ['"', "'"], context);
    }
    if (this.PATTERN_TRAILING_COMMENTS.replace(value.slice(context.i), '') !== '') {
      throw new ParseException('Unexpected characters near "' + value.slice(context.i) + '".');
    }
    return result;
  };

  Inline.dump = function(value, exceptionOnInvalidType, objectEncoder) {
    var result, type, _ref;
    if (exceptionOnInvalidType == null) {
      exceptionOnInvalidType = false;
    }
    if (objectEncoder == null) {
      objectEncoder = null;
    }
    if (value == null) {
      return 'null';
    }
    type = typeof value;
    if (type === 'object') {
      if (value instanceof Date) {
        return value.toISOString();
      } else if (objectEncoder != null) {
        result = objectEncoder(value);
        if (typeof result === 'string' || (result != null)) {
          return result;
        }
      }
      return this.dumpObject(value);
    }
    if (type === 'boolean') {
      return (value ? 'true' : 'false');
    }
    if (Utils.isDigits(value)) {
      return (type === 'string' ? "'" + value + "'" : String(parseInt(value)));
    }
    if (Utils.isNumeric(value)) {
      return (type === 'string' ? "'" + value + "'" : String(parseFloat(value)));
    }
    if (type === 'number') {
      return (value === Infinity ? '.Inf' : (value === -Infinity ? '-.Inf' : (isNaN(value) ? '.NaN' : value)));
    }
    if (Escaper.requiresDoubleQuoting(value)) {
      return Escaper.escapeWithDoubleQuotes(value);
    }
    if (Escaper.requiresSingleQuoting(value)) {
      return Escaper.escapeWithSingleQuotes(value);
    }
    if ('' === value) {
      return '""';
    }
    if (Utils.PATTERN_DATE.test(value)) {
      return "'" + value + "'";
    }
    if ((_ref = value.toLowerCase()) === 'null' || _ref === '~' || _ref === 'true' || _ref === 'false') {
      return "'" + value + "'";
    }
    return value;
  };

  Inline.dumpObject = function(value, exceptionOnInvalidType, objectSupport) {
    var key, output, val, _i, _len;
    if (objectSupport == null) {
      objectSupport = null;
    }
    if (value instanceof Array) {
      output = [];
      for (_i = 0, _len = value.length; _i < _len; _i++) {
        val = value[_i];
        output.push(this.dump(val));
      }
      return '[' + output.join(', ') + ']';
    } else {
      output = [];
      for (key in value) {
        val = value[key];
        output.push(this.dump(key) + ': ' + this.dump(val));
      }
      return '{' + output.join(', ') + '}';
    }
  };

  Inline.parseScalar = function(scalar, delimiters, stringDelimiters, context, evaluate) {
    var i, joinedDelimiters, match, output, pattern, strpos, tmp, _ref, _ref1;
    if (delimiters == null) {
      delimiters = null;
    }
    if (stringDelimiters == null) {
      stringDelimiters = ['"', "'"];
    }
    if (context == null) {
      context = null;
    }
    if (evaluate == null) {
      evaluate = true;
    }
    if (context == null) {
      context = {
        exceptionOnInvalidType: this.settings.exceptionOnInvalidType,
        objectDecoder: this.settings.objectDecoder,
        i: 0
      };
    }
    i = context.i;
    if (_ref = scalar.charAt(i), __indexOf.call(stringDelimiters, _ref) >= 0) {
      output = this.parseQuotedScalar(scalar, context);
      i = context.i;
      if (delimiters != null) {
        tmp = Utils.ltrim(scalar.slice(i), ' ');
        if (!(_ref1 = tmp.charAt(0), __indexOf.call(delimiters, _ref1) >= 0)) {
          throw new ParseException('Unexpected characters (' + scalar.slice(i) + ').');
        }
      }
    } else {
      if (!delimiters) {
        output = scalar.slice(i);
        i += output.length;
        strpos = output.indexOf(' #');
        if (strpos !== -1) {
          output = Utils.rtrim(output.slice(0, strpos));
        }
      } else {
        joinedDelimiters = delimiters.join('|');
        pattern = this.PATTERN_SCALAR_BY_DELIMITERS[joinedDelimiters];
        if (pattern == null) {
          pattern = new Pattern('^(.+?)(' + joinedDelimiters + ')');
          this.PATTERN_SCALAR_BY_DELIMITERS[joinedDelimiters] = pattern;
        }
        if (match = pattern.exec(scalar.slice(i))) {
          output = match[1];
          i += output.length;
        } else {
          throw new ParseException('Malformed inline YAML string (' + scalar + ').');
        }
      }
      if (evaluate) {
        output = this.evaluateScalar(output, context);
      }
    }
    context.i = i;
    return output;
  };

  Inline.parseQuotedScalar = function(scalar, context) {
    var i, match, output;
    i = context.i;
    if (!(match = this.PATTERN_QUOTED_SCALAR.exec(scalar.slice(i)))) {
      throw new ParseException('Malformed inline YAML string (' + scalar.slice(i) + ').');
    }
    output = match[0].substr(1, match[0].length - 2);
    if ('"' === scalar.charAt(i)) {
      output = Unescaper.unescapeDoubleQuotedString(output);
    } else {
      output = Unescaper.unescapeSingleQuotedString(output);
    }
    i += match[0].length;
    context.i = i;
    return output;
  };

  Inline.parseSequence = function(sequence, context) {
    var e, i, isQuoted, len, output, value, _ref;
    output = [];
    len = sequence.length;
    i = context.i;
    i += 1;
    while (i < len) {
      context.i = i;
      switch (sequence.charAt(i)) {
        case '[':
          output.push(this.parseSequence(sequence, context));
          i = context.i;
          break;
        case '{':
          output.push(this.parseMapping(sequence, context));
          i = context.i;
          break;
        case ']':
          return output;
        case ',':
        case ' ':
        case "\n":
          break;
        default:
          isQuoted = ((_ref = sequence.charAt(i)) === '"' || _ref === "'");
          value = this.parseScalar(sequence, [',', ']'], ['"', "'"], context);
          i = context.i;
          if (!isQuoted && typeof value === 'string' && (value.indexOf(': ') !== -1 || value.indexOf(":\n") !== -1)) {
            try {
              value = this.parseMapping('{' + value + '}');
            } catch (_error) {
              e = _error;
            }
          }
          output.push(value);
          --i;
      }
      ++i;
    }
    throw new ParseException('Malformed inline YAML string ' + sequence);
  };

  Inline.parseMapping = function(mapping, context) {
    var $value, done, i, key, len, output, shouldContinueWhileLoop, value;
    output = {};
    len = mapping.length;
    i = context.i;
    i += 1;
    shouldContinueWhileLoop = false;
    while (i < len) {
      context.i = i;
      switch (mapping.charAt(i)) {
        case ' ':
        case ',':
        case "\n":
          ++i;
          context.i = i;
          shouldContinueWhileLoop = true;
          break;
        case '}':
          return output;
      }
      if (shouldContinueWhileLoop) {
        shouldContinueWhileLoop = false;
        continue;
      }
      key = this.parseScalar(mapping, [':', ' ', "\n"], ['"', "'"], context, false);
      i = context.i;
      done = false;
      while (i < len) {
        context.i = i;
        switch (mapping.charAt(i)) {
          case '[':
            value = this.parseSequence(mapping, context);
            i = context.i;
            if (output[key] === void 0) {
              output[key] = value;
            }
            done = true;
            break;
          case '{':
            $value = this.parseMapping(mapping, context);
            i = context.i;
            if (output[key] === void 0) {
              output[key] = value;
            }
            done = true;
            break;
          case ':':
          case ' ':
          case "\n":
            break;
          default:
            value = this.parseScalar(mapping, [',', '}'], ['"', "'"], context);
            i = context.i;
            if (output[key] === void 0) {
              output[key] = value;
            }
            done = true;
            --i;
        }
        ++i;
        if (done) {
          break;
        }
      }
    }
    throw new ParseException('Malformed inline YAML string ' + mapping);
  };

  Inline.evaluateScalar = function(scalar, context) {
    var cast, date, exceptionOnInvalidType, firstChar, firstSpace, firstWord, objectDecoder, raw, scalarLower, subValue, trimmedScalar;
    scalar = Utils.trim(scalar);
    scalarLower = scalar.toLowerCase();
    switch (scalarLower) {
      case 'null':
      case '':
      case '~':
        return null;
      case 'true':
        return true;
      case 'false':
        return false;
      case '.inf':
        return Infinity;
      case '.nan':
        return NaN;
      case '-.inf':
        return Infinity;
      default:
        firstChar = scalarLower.charAt(0);
        switch (firstChar) {
          case '!':
            firstSpace = scalar.indexOf(' ');
            if (firstSpace === -1) {
              firstWord = scalarLower;
            } else {
              firstWord = scalarLower.slice(0, firstSpace);
            }
            switch (firstWord) {
              case '!':
                if (firstSpace !== -1) {
                  return parseInt(this.parseScalar(scalar.slice(2)));
                }
                return null;
              case '!str':
                return Utils.ltrim(scalar.slice(4));
              case '!!str':
                return Utils.ltrim(scalar.slice(5));
              case '!!int':
                return parseInt(this.parseScalar(scalar.slice(5)));
              case '!!bool':
                return Utils.parseBoolean(this.parseScalar(scalar.slice(6)), false);
              case '!!float':
                return parseFloat(this.parseScalar(scalar.slice(7)));
              case '!!timestamp':
                return Utils.stringToDate(Utils.ltrim(scalar.slice(11)));
              default:
                if (context == null) {
                  context = {
                    exceptionOnInvalidType: this.settings.exceptionOnInvalidType,
                    objectDecoder: this.settings.objectDecoder,
                    i: 0
                  };
                }
                objectDecoder = context.objectDecoder, exceptionOnInvalidType = context.exceptionOnInvalidType;
                if (objectDecoder) {
                  trimmedScalar = Utils.rtrim(scalar);
                  firstSpace = trimmedScalar.indexOf(' ');
                  if (firstSpace === -1) {
                    return objectDecoder(trimmedScalar, null);
                  } else {
                    subValue = Utils.ltrim(trimmedScalar.slice(firstSpace + 1));
                    if (!(subValue.length > 0)) {
                      subValue = null;
                    }
                    return objectDecoder(trimmedScalar.slice(0, firstSpace), subValue);
                  }
                }
                if (exceptionOnInvalidType) {
                  throw new ParseException('Custom object support when parsing a YAML file has been disabled.');
                }
                return null;
            }
            break;
          case '0':
            if ('0x' === scalar.slice(0, 2)) {
              return Utils.hexDec(scalar);
            } else if (Utils.isDigits(scalar)) {
              return Utils.octDec(scalar);
            } else if (Utils.isNumeric(scalar)) {
              return parseFloat(scalar);
            } else {
              return scalar;
            }
            break;
          case '+':
            if (Utils.isDigits(scalar)) {
              raw = scalar;
              cast = parseInt(raw);
              if (raw === String(cast)) {
                return cast;
              } else {
                return raw;
              }
            } else if (Utils.isNumeric(scalar)) {
              return parseFloat(scalar);
            } else if (this.PATTERN_THOUSAND_NUMERIC_SCALAR.test(scalar)) {
              return parseFloat(scalar.replace(',', ''));
            }
            return scalar;
          case '-':
            if (Utils.isDigits(scalar.slice(1))) {
              if ('0' === scalar.charAt(1)) {
                return -Utils.octDec(scalar.slice(1));
              } else {
                raw = scalar.slice(1);
                cast = parseInt(raw);
                if (raw === String(cast)) {
                  return -cast;
                } else {
                  return -raw;
                }
              }
            } else if (Utils.isNumeric(scalar)) {
              return parseFloat(scalar);
            } else if (this.PATTERN_THOUSAND_NUMERIC_SCALAR.test(scalar)) {
              return parseFloat(scalar.replace(',', ''));
            }
            return scalar;
          default:
            if (date = Utils.stringToDate(scalar)) {
              return date;
            } else if (Utils.isNumeric(scalar)) {
              return parseFloat(scalar);
            } else if (this.PATTERN_THOUSAND_NUMERIC_SCALAR.test(scalar)) {
              return parseFloat(scalar.replace(',', ''));
            }
            return scalar;
        }
    }
  };

  return Inline;

})();

module.exports = Inline;



},{"./Escaper":2,"./Exception/DumpException":3,"./Exception/ParseException":4,"./Pattern":7,"./Unescaper":8,"./Utils":9}],6:[function(require,module,exports){
var Inline, ParseException, Parser, Pattern, Utils;

Inline = require('./Inline');

Pattern = require('./Pattern');

Utils = require('./Utils');

ParseException = require('./Exception/ParseException');

Parser = (function() {
  Parser.prototype.PATTERN_FOLDED_SCALAR_ALL = new Pattern('^(?:(?<type>![^\\|>]*)\\s+)?(?<separator>\\||>)(?<modifiers>\\+|\\-|\\d+|\\+\\d+|\\-\\d+|\\d+\\+|\\d+\\-)?(?<comments> +#.*)?$');

  Parser.prototype.PATTERN_FOLDED_SCALAR_END = new Pattern('(?<separator>\\||>)(?<modifiers>\\+|\\-|\\d+|\\+\\d+|\\-\\d+|\\d+\\+|\\d+\\-)?(?<comments> +#.*)?$');

  Parser.prototype.PATTERN_SEQUENCE_ITEM = new Pattern('^\\-((?<leadspaces>\\s+)(?<value>.+?))?\\s*$');

  Parser.prototype.PATTERN_ANCHOR_VALUE = new Pattern('^&(?<ref>[^ ]+) *(?<value>.*)');

  Parser.prototype.PATTERN_COMPACT_NOTATION = new Pattern('^(?<key>' + Inline.REGEX_QUOTED_STRING + '|[^ \'"\\{\\[].*?) *\\:(\\s+(?<value>.+?))?\\s*$');

  Parser.prototype.PATTERN_MAPPING_ITEM = new Pattern('^(?<key>' + Inline.REGEX_QUOTED_STRING + '|[^ \'"\\[\\{].*?) *\\:(\\s+(?<value>.+?))?\\s*$');

  Parser.prototype.PATTERN_DECIMAL = new Pattern('\\d+');

  Parser.prototype.PATTERN_INDENT_SPACES = new Pattern('^ +');

  Parser.prototype.PATTERN_TRAILING_LINES = new Pattern('(\n*)$');

  Parser.prototype.PATTERN_YAML_HEADER = new Pattern('^\\%YAML[: ][\\d\\.]+.*\n');

  Parser.prototype.PATTERN_LEADING_COMMENTS = new Pattern('^(\\#.*?\n)+');

  Parser.prototype.PATTERN_DOCUMENT_MARKER_START = new Pattern('^\\-\\-\\-.*?\n');

  Parser.prototype.PATTERN_DOCUMENT_MARKER_END = new Pattern('^\\.\\.\\.\\s*$');

  Parser.prototype.PATTERN_FOLDED_SCALAR_BY_INDENTATION = {};

  Parser.prototype.CONTEXT_NONE = 0;

  Parser.prototype.CONTEXT_SEQUENCE = 1;

  Parser.prototype.CONTEXT_MAPPING = 2;

  function Parser(offset) {
    this.offset = offset != null ? offset : 0;
    this.lines = [];
    this.currentLineNb = -1;
    this.currentLine = '';
    this.refs = {};
  }

  Parser.prototype.parse = function(value, exceptionOnInvalidType, objectDecoder) {
    var alias, allowOverwrite, block, c, context, data, e, first, i, indent, isRef, k, key, lastKey, lineCount, matches, mergeNode, parsed, parsedItem, parser, refName, refValue, val, values, _i, _j, _k, _l, _len, _len1, _len2, _len3, _name, _ref, _ref1, _ref2;
    if (exceptionOnInvalidType == null) {
      exceptionOnInvalidType = false;
    }
    if (objectDecoder == null) {
      objectDecoder = null;
    }
    this.currentLineNb = -1;
    this.currentLine = '';
    this.lines = this.cleanup(value).split("\n");
    data = null;
    context = this.CONTEXT_NONE;
    allowOverwrite = false;
    while (this.moveToNextLine()) {
      if (this.isCurrentLineEmpty()) {
        continue;
      }
      if ("\t" === this.currentLine[0]) {
        throw new ParseException('A YAML file cannot contain tabs as indentation.', this.getRealCurrentLineNb() + 1, this.currentLine);
      }
      isRef = mergeNode = false;
      if (values = this.PATTERN_SEQUENCE_ITEM.exec(this.currentLine)) {
        if (this.CONTEXT_MAPPING === context) {
          throw new ParseException('You cannot define a sequence item when in a mapping');
        }
        context = this.CONTEXT_SEQUENCE;
        if (data == null) {
          data = [];
        }
        if ((values.value != null) && (matches = this.PATTERN_ANCHOR_VALUE.exec(values.value))) {
          isRef = matches.ref;
          values.value = matches.value;
        }
        if (!(values.value != null) || '' === Utils.trim(values.value, ' ') || Utils.ltrim(values.value, ' ').indexOf('#') === 0) {
          if (this.currentLineNb < this.lines.length - 1 && !this.isNextLineUnIndentedCollection()) {
            c = this.getRealCurrentLineNb() + 1;
            parser = new Parser(c);
            parser.refs = this.refs;
            data.push(parser.parse(this.getNextEmbedBlock(null, true), exceptionOnInvalidType, objectDecoder));
          } else {
            data.push(null);
          }
        } else {
          if (((_ref = values.leadspaces) != null ? _ref.length : void 0) && (matches = this.PATTERN_COMPACT_NOTATION.exec(values.value))) {
            c = this.getRealCurrentLineNb();
            parser = new Parser(c);
            parser.refs = this.refs;
            block = values.value;
            indent = this.getCurrentLineIndentation();
            if (this.isNextLineIndented(false)) {
              block += "\n" + this.getNextEmbedBlock(indent + values.leadspaces.length + 1, true);
            }
            data.push(parser.parse(block, exceptionOnInvalidType, objectDecoder));
          } else {
            data.push(this.parseValue(values.value, exceptionOnInvalidType, objectDecoder));
          }
        }
      } else if ((values = this.PATTERN_MAPPING_ITEM.exec(this.currentLine)) && values.key.indexOf(' #') === -1) {
        if (this.CONTEXT_SEQUENCE === context) {
          throw new ParseException('You cannot define a mapping item when in a sequence');
        }
        context = this.CONTEXT_MAPPING;
        if (data == null) {
          data = {};
        }
        Inline.configure(exceptionOnInvalidType, objectDecoder);
        try {
          key = Inline.parseScalar(values.key);
        } catch (_error) {
          e = _error;
          e.parsedLine = this.getRealCurrentLineNb() + 1;
          e.snippet = this.currentLine;
          throw e;
        }
        if ('<<' === key) {
          mergeNode = true;
          allowOverwrite = true;
          if (((_ref1 = values.value) != null ? _ref1.indexOf('*') : void 0) === 0) {
            refName = values.value.slice(1);
            if (this.refs[refName] == null) {
              throw new ParseException('Reference "' + refName + '" does not exist.', this.getRealCurrentLineNb() + 1, this.currentLine);
            }
            refValue = this.refs[refName];
            if (typeof refValue !== 'object') {
              throw new ParseException('YAML merge keys used with a scalar value instead of an object.', this.getRealCurrentLineNb() + 1, this.currentLine);
            }
            if (refValue instanceof Array) {
              for (i = _i = 0, _len = refValue.length; _i < _len; i = ++_i) {
                value = refValue[i];
                if (data[_name = String(i)] == null) {
                  data[_name] = value;
                }
              }
            } else {
              for (key in refValue) {
                value = refValue[key];
                if (data[key] == null) {
                  data[key] = value;
                }
              }
            }
          } else {
            if ((values.value != null) && values.value !== '') {
              value = values.value;
            } else {
              value = this.getNextEmbedBlock();
            }
            c = this.getRealCurrentLineNb() + 1;
            parser = new Parser(c);
            parser.refs = this.refs;
            parsed = parser.parse(value, exceptionOnInvalidType);
            if (typeof parsed !== 'object') {
              throw new ParseException('YAML merge keys used with a scalar value instead of an object.', this.getRealCurrentLineNb() + 1, this.currentLine);
            }
            if (parsed instanceof Array) {
              for (_j = 0, _len1 = parsed.length; _j < _len1; _j++) {
                parsedItem = parsed[_j];
                if (typeof parsedItem !== 'object') {
                  throw new ParseException('Merge items must be objects.', this.getRealCurrentLineNb() + 1, parsedItem);
                }
                if (parsedItem instanceof Array) {
                  for (i = _k = 0, _len2 = parsedItem.length; _k < _len2; i = ++_k) {
                    value = parsedItem[i];
                    k = String(i);
                    if (!data.hasOwnProperty(k)) {
                      data[k] = value;
                    }
                  }
                } else {
                  for (key in parsedItem) {
                    value = parsedItem[key];
                    if (!data.hasOwnProperty(key)) {
                      data[key] = value;
                    }
                  }
                }
              }
            } else {
              for (key in parsed) {
                value = parsed[key];
                if (!data.hasOwnProperty(key)) {
                  data[key] = value;
                }
              }
            }
          }
        } else if ((values.value != null) && (matches = this.PATTERN_ANCHOR_VALUE.exec(values.value))) {
          isRef = matches.ref;
          values.value = matches.value;
        }
        if (mergeNode) {

        } else if (!(values.value != null) || '' === Utils.trim(values.value, ' ') || Utils.ltrim(values.value, ' ').indexOf('#') === 0) {
          if (!(this.isNextLineIndented()) && !(this.isNextLineUnIndentedCollection())) {
            if (allowOverwrite || data[key] === void 0) {
              data[key] = null;
            }
          } else {
            c = this.getRealCurrentLineNb() + 1;
            parser = new Parser(c);
            parser.refs = this.refs;
            val = parser.parse(this.getNextEmbedBlock(), exceptionOnInvalidType, objectDecoder);
            if (allowOverwrite || data[key] === void 0) {
              data[key] = val;
            }
          }
        } else {
          val = this.parseValue(values.value, exceptionOnInvalidType, objectDecoder);
          if (allowOverwrite || data[key] === void 0) {
            data[key] = val;
          }
        }
      } else {
        lineCount = this.lines.length;
        if (1 === lineCount || (2 === lineCount && Utils.isEmpty(this.lines[1]))) {
          try {
            value = Inline.parse(this.lines[0], exceptionOnInvalidType, objectDecoder);
          } catch (_error) {
            e = _error;
            e.parsedLine = this.getRealCurrentLineNb() + 1;
            e.snippet = this.currentLine;
            throw e;
          }
          if (typeof value === 'object') {
            if (value instanceof Array) {
              first = value[0];
            } else {
              for (key in value) {
                first = value[key];
                break;
              }
            }
            if (typeof first === 'string' && first.indexOf('*') === 0) {
              data = [];
              for (_l = 0, _len3 = value.length; _l < _len3; _l++) {
                alias = value[_l];
                data.push(this.refs[alias.slice(1)]);
              }
              value = data;
            }
          }
          return value;
        } else if ((_ref2 = Utils.ltrim(value).charAt(0)) === '[' || _ref2 === '{') {
          try {
            return Inline.parse(value, exceptionOnInvalidType, objectDecoder);
          } catch (_error) {
            e = _error;
            e.parsedLine = this.getRealCurrentLineNb() + 1;
            e.snippet = this.currentLine;
            throw e;
          }
        }
        throw new ParseException('Unable to parse.', this.getRealCurrentLineNb() + 1, this.currentLine);
      }
      if (isRef) {
        if (data instanceof Array) {
          this.refs[isRef] = data[data.length - 1];
        } else {
          lastKey = null;
          for (key in data) {
            lastKey = key;
          }
          this.refs[isRef] = data[lastKey];
        }
      }
    }
    if (Utils.isEmpty(data)) {
      return null;
    } else {
      return data;
    }
  };

  Parser.prototype.getRealCurrentLineNb = function() {
    return this.currentLineNb + this.offset;
  };

  Parser.prototype.getCurrentLineIndentation = function() {
    return this.currentLine.length - Utils.ltrim(this.currentLine, ' ').length;
  };

  Parser.prototype.getNextEmbedBlock = function(indentation, includeUnindentedCollection) {
    var data, indent, isItUnindentedCollection, newIndent, removeComments, removeCommentsPattern, unindentedEmbedBlock;
    if (indentation == null) {
      indentation = null;
    }
    if (includeUnindentedCollection == null) {
      includeUnindentedCollection = false;
    }
    this.moveToNextLine();
    if (indentation == null) {
      newIndent = this.getCurrentLineIndentation();
      unindentedEmbedBlock = this.isStringUnIndentedCollectionItem(this.currentLine);
      if (!(this.isCurrentLineEmpty()) && 0 === newIndent && !unindentedEmbedBlock) {
        throw new ParseException('Indentation problem.', this.getRealCurrentLineNb() + 1, this.currentLine);
      }
    } else {
      newIndent = indentation;
    }
    data = [this.currentLine.slice(newIndent)];
    if (!includeUnindentedCollection) {
      isItUnindentedCollection = this.isStringUnIndentedCollectionItem(this.currentLine);
    }
    removeCommentsPattern = this.PATTERN_FOLDED_SCALAR_END;
    removeComments = !removeCommentsPattern.test(this.currentLine);
    while (this.moveToNextLine()) {
      indent = this.getCurrentLineIndentation();
      if (indent === newIndent) {
        removeComments = !removeCommentsPattern.test(this.currentLine);
      }
      if (isItUnindentedCollection && !this.isStringUnIndentedCollectionItem(this.currentLine) && indent === newIndent) {
        this.moveToPreviousLine();
        break;
      }
      if (this.isCurrentLineBlank()) {
        data.push(this.currentLine.slice(newIndent));
        continue;
      }
      if (removeComments && this.isCurrentLineComment()) {
        if (indent === newIndent) {
          continue;
        }
      }
      if (indent >= newIndent) {
        data.push(this.currentLine.slice(newIndent));
      } else if (0 === indent) {
        this.moveToPreviousLine();
        break;
      } else {
        throw new ParseException('Indentation problem.', this.getRealCurrentLineNb() + 1, this.currentLine);
      }
    }
    return data.join("\n");
  };

  Parser.prototype.moveToNextLine = function() {
    if (this.currentLineNb >= this.lines.length - 1) {
      return false;
    }
    this.currentLine = this.lines[++this.currentLineNb];
    return true;
  };

  Parser.prototype.moveToPreviousLine = function() {
    this.currentLine = this.lines[--this.currentLineNb];
  };

  Parser.prototype.parseValue = function(value, exceptionOnInvalidType, objectDecoder) {
    var e, foldedIndent, matches, modifiers, pos, val, _ref, _ref1;
    if (0 === value.indexOf('*')) {
      pos = value.indexOf('#');
      if (pos !== -1) {
        value = value.substr(1, pos - 2);
      } else {
        value = value.slice(1);
      }
      if (this.refs[value] === void 0) {
        throw new ParseException('Reference "' + value + '" does not exist.', this.currentLine);
      }
      return this.refs[value];
    }
    if (matches = this.PATTERN_FOLDED_SCALAR_ALL.exec(value)) {
      modifiers = (_ref = matches.modifiers) != null ? _ref : '';
      foldedIndent = Math.abs(parseInt(modifiers));
      if (isNaN(foldedIndent)) {
        foldedIndent = 0;
      }
      val = this.parseFoldedScalar(matches.separator, this.PATTERN_DECIMAL.replace(modifiers, ''), foldedIndent);
      if (matches.type != null) {
        Inline.configure(exceptionOnInvalidType, objectDecoder);
        return Inline.parseScalar(matches.type + ' ' + val);
      } else {
        return val;
      }
    }
    try {
      return Inline.parse(value, exceptionOnInvalidType, objectDecoder);
    } catch (_error) {
      e = _error;
      if (((_ref1 = value.charAt(0)) === '[' || _ref1 === '{') && e instanceof ParseException && this.isNextLineIndented()) {
        value += "\n" + this.getNextEmbedBlock();
        try {
          return Inline.parse(value, exceptionOnInvalidType, objectDecoder);
        } catch (_error) {
          e = _error;
          e.parsedLine = this.getRealCurrentLineNb() + 1;
          e.snippet = this.currentLine;
          throw e;
        }
      } else {
        e.parsedLine = this.getRealCurrentLineNb() + 1;
        e.snippet = this.currentLine;
        throw e;
      }
    }
  };

  Parser.prototype.parseFoldedScalar = function(separator, indicator, indentation) {
    var isCurrentLineBlank, line, matches, newText, notEOF, pattern, text, _i, _len, _ref;
    if (indicator == null) {
      indicator = '';
    }
    if (indentation == null) {
      indentation = 0;
    }
    notEOF = this.moveToNextLine();
    if (!notEOF) {
      return '';
    }
    isCurrentLineBlank = this.isCurrentLineBlank();
    text = '';
    while (notEOF && isCurrentLineBlank) {
      if (notEOF = this.moveToNextLine()) {
        text += "\n";
        isCurrentLineBlank = this.isCurrentLineBlank();
      }
    }
    if (0 === indentation) {
      if (matches = this.PATTERN_INDENT_SPACES.exec(this.currentLine)) {
        indentation = matches[0].length;
      }
    }
    if (indentation > 0) {
      pattern = this.PATTERN_FOLDED_SCALAR_BY_INDENTATION[indentation];
      if (pattern == null) {
        pattern = new Pattern('^ {' + indentation + '}(.*)$');
        Parser.prototype.PATTERN_FOLDED_SCALAR_BY_INDENTATION[indentation] = pattern;
      }
      while (notEOF && (isCurrentLineBlank || (matches = pattern.exec(this.currentLine)))) {
        if (isCurrentLineBlank) {
          text += this.currentLine.slice(indentation);
        } else {
          text += matches[1];
        }
        if (notEOF = this.moveToNextLine()) {
          text += "\n";
          isCurrentLineBlank = this.isCurrentLineBlank();
        }
      }
    } else if (notEOF) {
      text += "\n";
    }
    if (notEOF) {
      this.moveToPreviousLine();
    }
    if ('>' === separator) {
      newText = '';
      _ref = text.split("\n");
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        line = _ref[_i];
        if (line.length === 0 || line.charAt(0) === ' ') {
          newText = Utils.rtrim(newText, ' ') + line + "\n";
        } else {
          newText += line + ' ';
        }
      }
      text = newText;
    }
    if ('+' !== indicator) {
      text = Utils.rtrim(text);
    }
    if ('' === indicator) {
      text = this.PATTERN_TRAILING_LINES.replace(text, "\n");
    } else if ('-' === indicator) {
      text = this.PATTERN_TRAILING_LINES.replace(text, '');
    }
    return text;
  };

  Parser.prototype.isNextLineIndented = function(ignoreComments) {
    var EOF, currentIndentation, ret;
    if (ignoreComments == null) {
      ignoreComments = true;
    }
    currentIndentation = this.getCurrentLineIndentation();
    EOF = !this.moveToNextLine();
    if (ignoreComments) {
      while (!EOF && this.isCurrentLineEmpty()) {
        EOF = !this.moveToNextLine();
      }
    } else {
      while (!EOF && this.isCurrentLineBlank()) {
        EOF = !this.moveToNextLine();
      }
    }
    if (EOF) {
      return false;
    }
    ret = false;
    if (this.getCurrentLineIndentation() > currentIndentation) {
      ret = true;
    }
    this.moveToPreviousLine();
    return ret;
  };

  Parser.prototype.isCurrentLineEmpty = function() {
    var trimmedLine;
    trimmedLine = Utils.trim(this.currentLine, ' ');
    return trimmedLine.length === 0 || trimmedLine.charAt(0) === '#';
  };

  Parser.prototype.isCurrentLineBlank = function() {
    return '' === Utils.trim(this.currentLine, ' ');
  };

  Parser.prototype.isCurrentLineComment = function() {
    var ltrimmedLine;
    ltrimmedLine = Utils.ltrim(this.currentLine, ' ');
    return ltrimmedLine.charAt(0) === '#';
  };

  Parser.prototype.cleanup = function(value) {
    var count, trimmedValue, _ref, _ref1, _ref2;
    if (value.indexOf("\r") !== -1) {
      value = value.split("\r\n").join("\n").split("\r").join("\n");
    }
    count = 0;
    _ref = this.PATTERN_YAML_HEADER.replaceAll(value, ''), value = _ref[0], count = _ref[1];
    this.offset += count;
    _ref1 = this.PATTERN_LEADING_COMMENTS.replaceAll(value, '', 1), trimmedValue = _ref1[0], count = _ref1[1];
    if (count === 1) {
      this.offset += Utils.subStrCount(value, "\n") - Utils.subStrCount(trimmedValue, "\n");
      value = trimmedValue;
    }
    _ref2 = this.PATTERN_DOCUMENT_MARKER_START.replaceAll(value, '', 1), trimmedValue = _ref2[0], count = _ref2[1];
    if (count === 1) {
      this.offset += Utils.subStrCount(value, "\n") - Utils.subStrCount(trimmedValue, "\n");
      value = trimmedValue;
      value = this.PATTERN_DOCUMENT_MARKER_END.replace(value, '');
    }
    return value;
  };

  Parser.prototype.isNextLineUnIndentedCollection = function(currentIndentation) {
    var notEOF, ret;
    if (currentIndentation == null) {
      currentIndentation = null;
    }
    if (currentIndentation == null) {
      currentIndentation = this.getCurrentLineIndentation();
    }
    notEOF = this.moveToNextLine();
    while (notEOF && this.isCurrentLineEmpty()) {
      notEOF = this.moveToNextLine();
    }
    if (false === notEOF) {
      return false;
    }
    ret = false;
    if (this.getCurrentLineIndentation() === currentIndentation && this.isStringUnIndentedCollectionItem(this.currentLine)) {
      ret = true;
    }
    this.moveToPreviousLine();
    return ret;
  };

  Parser.prototype.isStringUnIndentedCollectionItem = function() {
    return this.currentLine === '-' || this.currentLine.slice(0, 2) === '- ';
  };

  return Parser;

})();

module.exports = Parser;



},{"./Exception/ParseException":4,"./Inline":5,"./Pattern":7,"./Utils":9}],7:[function(require,module,exports){
var Pattern;

Pattern = (function() {
  Pattern.prototype.regex = null;

  Pattern.prototype.rawRegex = null;

  Pattern.prototype.cleanedRegex = null;

  Pattern.prototype.mapping = null;

  function Pattern(rawRegex, modifiers) {
    var capturingBracketNumber, char, cleanedRegex, i, len, mapping, name, part, subChar;
    if (modifiers == null) {
      modifiers = '';
    }
    cleanedRegex = '';
    len = rawRegex.length;
    mapping = null;
    capturingBracketNumber = 0;
    i = 0;
    while (i < len) {
      char = rawRegex.charAt(i);
      if (char === '\\') {
        cleanedRegex += rawRegex.slice(i, +(i + 1) + 1 || 9e9);
        i++;
      } else if (char === '(') {
        if (i < len - 2) {
          part = rawRegex.slice(i, +(i + 2) + 1 || 9e9);
          if (part === '(?:') {
            i += 2;
            cleanedRegex += part;
          } else if (part === '(?<') {
            capturingBracketNumber++;
            i += 2;
            name = '';
            while (i + 1 < len) {
              subChar = rawRegex.charAt(i + 1);
              if (subChar === '>') {
                cleanedRegex += '(';
                i++;
                if (name.length > 0) {
                  if (mapping == null) {
                    mapping = {};
                  }
                  mapping[name] = capturingBracketNumber;
                }
                break;
              } else {
                name += subChar;
              }
              i++;
            }
          } else {
            cleanedRegex += char;
            capturingBracketNumber++;
          }
        } else {
          cleanedRegex += char;
        }
      } else {
        cleanedRegex += char;
      }
      i++;
    }
    this.rawRegex = rawRegex;
    this.cleanedRegex = cleanedRegex;
    this.regex = new RegExp(this.cleanedRegex, 'g' + modifiers.replace('g', ''));
    this.mapping = mapping;
  }

  Pattern.prototype.exec = function(str) {
    var index, matches, name, _ref;
    this.regex.lastIndex = 0;
    matches = this.regex.exec(str);
    if (matches == null) {
      return null;
    }
    if (this.mapping != null) {
      _ref = this.mapping;
      for (name in _ref) {
        index = _ref[name];
        matches[name] = matches[index];
      }
    }
    return matches;
  };

  Pattern.prototype.test = function(str) {
    this.regex.lastIndex = 0;
    return this.regex.test(str);
  };

  Pattern.prototype.replace = function(str, replacement) {
    this.regex.lastIndex = 0;
    return str.replace(this.regex, replacement);
  };

  Pattern.prototype.replaceAll = function(str, replacement, limit) {
    var count;
    if (limit == null) {
      limit = 0;
    }
    this.regex.lastIndex = 0;
    count = 0;
    while (this.regex.test(str) && (limit === 0 || count < limit)) {
      this.regex.lastIndex = 0;
      str = str.replace(this.regex, '');
      count++;
    }
    return [str, count];
  };

  return Pattern;

})();

module.exports = Pattern;



},{}],8:[function(require,module,exports){
var Pattern, Unescaper, Utils;

Utils = require('./Utils');

Pattern = require('./Pattern');

Unescaper = (function() {
  function Unescaper() {}

  Unescaper.PATTERN_ESCAPED_CHARACTER = new Pattern('\\\\([0abt\tnvfre "\\/\\\\N_LP]|x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|U[0-9a-fA-F]{8})');

  Unescaper.unescapeSingleQuotedString = function(value) {
    return value.replace('\'\'', '\'');
  };

  Unescaper.unescapeDoubleQuotedString = function(value) {
    if (this._unescapeCallback == null) {
      this._unescapeCallback = (function(_this) {
        return function(str) {
          return _this.unescapeCharacter(str);
        };
      })(this);
    }
    return this.PATTERN_ESCAPED_CHARACTER.replace(value, this._unescapeCallback);
  };

  Unescaper.unescapeCharacter = function(value) {
    var ch;
    ch = String.fromCharCode;
    switch (value.charAt(1)) {
      case '0':
        return ch(0);
      case 'a':
        return ch(7);
      case 'b':
        return ch(8);
      case 't':
        return "\t";
      case "\t":
        return "\t";
      case 'n':
        return "\n";
      case 'v':
        return ch(11);
      case 'f':
        return ch(12);
      case 'r':
        return ch(13);
      case 'e':
        return ch(27);
      case ' ':
        return ' ';
      case '"':
        return '"';
      case '/':
        return '/';
      case '\\':
        return '\\';
      case 'N':
        return ch(0x0085);
      case '_':
        return ch(0x00A0);
      case 'L':
        return ch(0x2028);
      case 'P':
        return ch(0x2029);
      case 'x':
        return Utils.utf8chr(Utils.hexDec(value.substr(2, 2)));
      case 'u':
        return Utils.utf8chr(Utils.hexDec(value.substr(2, 4)));
      case 'U':
        return Utils.utf8chr(Utils.hexDec(value.substr(2, 8)));
      default:
        return '';
    }
  };

  return Unescaper;

})();

module.exports = Unescaper;



},{"./Pattern":7,"./Utils":9}],9:[function(require,module,exports){
var Pattern, Utils;

Pattern = require('./Pattern');

Utils = (function() {
  function Utils() {}

  Utils.REGEX_LEFT_TRIM_BY_CHAR = {};

  Utils.REGEX_RIGHT_TRIM_BY_CHAR = {};

  Utils.REGEX_SPACES = /\s+/g;

  Utils.REGEX_DIGITS = /^\d+$/;

  Utils.REGEX_OCTAL = /[^0-7]/gi;

  Utils.REGEX_HEXADECIMAL = /[^a-f0-9]/gi;

  Utils.PATTERN_DATE = new Pattern('^' + '(?<year>[0-9][0-9][0-9][0-9])' + '-(?<month>[0-9][0-9]?)' + '-(?<day>[0-9][0-9]?)' + '(?:(?:[Tt]|[ \t]+)' + '(?<hour>[0-9][0-9]?)' + ':(?<minute>[0-9][0-9])' + ':(?<second>[0-9][0-9])' + '(?:\.(?<fraction>[0-9]*))?' + '(?:[ \t]*(?<tz>Z|(?<tz_sign>[-+])(?<tz_hour>[0-9][0-9]?)' + '(?::(?<tz_minute>[0-9][0-9]))?))?)?' + '$', 'i');

  Utils.LOCAL_TIMEZONE_OFFSET = new Date().getTimezoneOffset() * 60 * 1000;

  Utils.trim = function(str, char) {
    var regexLeft, regexRight;
    if (char == null) {
      char = '\\s';
    }
    return str.trim();
    regexLeft = this.REGEX_LEFT_TRIM_BY_CHAR[char];
    if (regexLeft == null) {
      this.REGEX_LEFT_TRIM_BY_CHAR[char] = regexLeft = new RegExp('^' + char + '' + char + '*');
    }
    regexLeft.lastIndex = 0;
    regexRight = this.REGEX_RIGHT_TRIM_BY_CHAR[char];
    if (regexRight == null) {
      this.REGEX_RIGHT_TRIM_BY_CHAR[char] = regexRight = new RegExp(char + '' + char + '*$');
    }
    regexRight.lastIndex = 0;
    return str.replace(regexLeft, '').replace(regexRight, '');
  };

  Utils.ltrim = function(str, char) {
    var regexLeft;
    if (char == null) {
      char = '\\s';
    }
    regexLeft = this.REGEX_LEFT_TRIM_BY_CHAR[char];
    if (regexLeft == null) {
      this.REGEX_LEFT_TRIM_BY_CHAR[char] = regexLeft = new RegExp('^' + char + '' + char + '*');
    }
    regexLeft.lastIndex = 0;
    return str.replace(regexLeft, '');
  };

  Utils.rtrim = function(str, char) {
    var regexRight;
    if (char == null) {
      char = '\\s';
    }
    regexRight = this.REGEX_RIGHT_TRIM_BY_CHAR[char];
    if (regexRight == null) {
      this.REGEX_RIGHT_TRIM_BY_CHAR[char] = regexRight = new RegExp(char + '' + char + '*$');
    }
    regexRight.lastIndex = 0;
    return str.replace(regexRight, '');
  };

  Utils.isEmpty = function(value) {
    return !value || value === '' || value === '0';
  };

  Utils.subStrCount = function(string, subString, start, length) {
    var c, i, len, sublen, _i;
    c = 0;
    string = '' + string;
    subString = '' + subString;
    if (start != null) {
      string = string.slice(start);
    }
    if (length != null) {
      string = string.slice(0, length);
    }
    len = string.length;
    sublen = subString.length;
    for (i = _i = 0; 0 <= len ? _i < len : _i > len; i = 0 <= len ? ++_i : --_i) {
      if (subString === string.slice(i, sublen)) {
        c++;
        i += sublen - 1;
      }
    }
    return c;
  };

  Utils.isDigits = function(input) {
    this.REGEX_DIGITS.lastIndex = 0;
    return this.REGEX_DIGITS.test(input);
  };

  Utils.octDec = function(input) {
    this.REGEX_OCTAL.lastIndex = 0;
    return parseInt((input + '').replace(this.REGEX_OCTAL, ''), 8);
  };

  Utils.hexDec = function(input) {
    this.REGEX_HEXADECIMAL.lastIndex = 0;
    input = this.trim(input);
    if ((input + '').slice(0, 2) === '0x') {
      input = (input + '').slice(2);
    }
    return parseInt((input + '').replace(this.REGEX_HEXADECIMAL, ''), 16);
  };

  Utils.utf8chr = function(c) {
    var ch;
    ch = String.fromCharCode;
    if (0x80 > (c %= 0x200000)) {
      return ch(c);
    }
    if (0x800 > c) {
      return ch(0xC0 | c >> 6) + ch(0x80 | c & 0x3F);
    }
    if (0x10000 > c) {
      return ch(0xE0 | c >> 12) + ch(0x80 | c >> 6 & 0x3F) + ch(0x80 | c & 0x3F);
    }
    return ch(0xF0 | c >> 18) + ch(0x80 | c >> 12 & 0x3F) + ch(0x80 | c >> 6 & 0x3F) + ch(0x80 | c & 0x3F);
  };

  Utils.parseBoolean = function(input, strict) {
    var lowerInput;
    if (strict == null) {
      strict = true;
    }
    if (typeof input === 'string') {
      lowerInput = input.toLowerCase();
      if (!strict) {
        if (lowerInput === 'no') {
          return false;
        }
      }
      if (lowerInput === '0') {
        return false;
      }
      if (lowerInput === 'false') {
        return false;
      }
      if (lowerInput === '') {
        return false;
      }
      return true;
    }
    return !!input;
  };

  Utils.isNumeric = function(input) {
    this.REGEX_SPACES.lastIndex = 0;
    return typeof input === 'number' || typeof input === 'string' && !isNaN(input) && input.replace(this.REGEX_SPACES, '') !== '';
  };

  Utils.stringToDate = function(str) {
    var date, day, fraction, hour, info, minute, month, second, tz_hour, tz_minute, tz_offset, year;
    if (!(str != null ? str.length : void 0)) {
      return null;
    }
    info = this.PATTERN_DATE.exec(str);
    if (!info) {
      return null;
    }
    year = parseInt(info.year, 10);
    month = parseInt(info.month, 10) - 1;
    day = parseInt(info.day, 10);
    if (info.hour == null) {
      date = new Date(Date.UTC(year, month, day));
      return date;
    }
    hour = parseInt(info.hour, 10);
    minute = parseInt(info.minute, 10);
    second = parseInt(info.second, 10);
    if (info.fraction != null) {
      fraction = info.fraction.slice(0, 3);
      while (fraction.length < 3) {
        fraction += '0';
      }
      fraction = parseInt(fraction, 10);
    } else {
      fraction = 0;
    }
    if (info.tz != null) {
      tz_hour = parseInt(info.tz_hour, 10);
      if (info.tz_minute != null) {
        tz_minute = parseInt(info.tz_minute, 10);
      } else {
        tz_minute = 0;
      }
      tz_offset = (tz_hour * 60 + tz_minute) * 60000;
      if ('-' === info.tz_sign) {
        tz_offset *= -1;
      }
    }
    date = new Date(Date.UTC(year, month, day, hour, minute, second, fraction));
    if (tz_offset) {
      date.setTime(date.getTime() + tz_offset);
    }
    return date;
  };

  Utils.strRepeat = function(str, number) {
    var i, res;
    res = '';
    i = 0;
    while (i < number) {
      res += str;
      i++;
    }
    return res;
  };

  Utils.getStringFromFile = function(path, callback) {
    var data, fs, name, req, xhr, _i, _len, _ref;
    if (callback == null) {
      callback = null;
    }
    xhr = null;
    if (typeof window !== "undefined" && window !== null) {
      if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
      } else if (window.ActiveXObject) {
        _ref = ["Msxml2.XMLHTTP.6.0", "Msxml2.XMLHTTP.3.0", "Msxml2.XMLHTTP", "Microsoft.XMLHTTP"];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          name = _ref[_i];
          try {
            xhr = new ActiveXObject(name);
          } catch (_error) {}
        }
      }
    }
    if (xhr != null) {
      if (callback != null) {
        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 0) {
              return callback(xhr.responseText);
            } else {
              return callback(null);
            }
          }
        };
        xhr.open('GET', path, true);
        return xhr.send(null);
      } else {
        xhr.open('GET', path, false);
        xhr.send(null);
        if (xhr.status === 200 || xhr.status === 0) {
          return xhr.responseText;
        }
        return null;
      }
    } else {
      req = require;
      fs = req('fs');
      if (callback != null) {
        return fs.readFile(path, function(err, data) {
          if (err) {
            return callback(null);
          } else {
            return callback(String(data));
          }
        });
      } else {
        data = fs.readFileSync(path);
        if (data != null) {
          return String(data);
        }
        return null;
      }
    }
  };

  return Utils;

})();

module.exports = Utils;



},{"./Pattern":7}],10:[function(require,module,exports){
var Dumper, Parser, Utils, Yaml;

Parser = require('./Parser');

Dumper = require('./Dumper');

Utils = require('./Utils');

Yaml = (function() {
  function Yaml() {}

  Yaml.parse = function(input, exceptionOnInvalidType, objectDecoder) {
    if (exceptionOnInvalidType == null) {
      exceptionOnInvalidType = false;
    }
    if (objectDecoder == null) {
      objectDecoder = null;
    }
    return new Parser().parse(input, exceptionOnInvalidType, objectDecoder);
  };

  Yaml.parseFile = function(path, callback, exceptionOnInvalidType, objectDecoder) {
    var input;
    if (callback == null) {
      callback = null;
    }
    if (exceptionOnInvalidType == null) {
      exceptionOnInvalidType = false;
    }
    if (objectDecoder == null) {
      objectDecoder = null;
    }
    if (callback != null) {
      return Utils.getStringFromFile(path, (function(_this) {
        return function(input) {
          var result;
          result = null;
          if (input != null) {
            result = _this.parse(input, exceptionOnInvalidType, objectDecoder);
          }
          callback(result);
        };
      })(this));
    } else {
      input = Utils.getStringFromFile(path);
      if (input != null) {
        return this.parse(input, exceptionOnInvalidType, objectDecoder);
      }
      return null;
    }
  };

  Yaml.dump = function(input, inline, indent, exceptionOnInvalidType, objectEncoder) {
    var yaml;
    if (inline == null) {
      inline = 2;
    }
    if (indent == null) {
      indent = 4;
    }
    if (exceptionOnInvalidType == null) {
      exceptionOnInvalidType = false;
    }
    if (objectEncoder == null) {
      objectEncoder = null;
    }
    yaml = new Dumper();
    yaml.indentation = indent;
    return yaml.dump(input, inline, 0, exceptionOnInvalidType, objectEncoder);
  };

  Yaml.register = function() {
    var require_handler;
    require_handler = function(module, filename) {
      return module.exports = YAML.parseFile(filename);
    };
    if ((typeof require !== "undefined" && require !== null ? require.extensions : void 0) != null) {
      require.extensions['.yml'] = require_handler;
      return require.extensions['.yaml'] = require_handler;
    }
  };

  Yaml.stringify = function(input, inline, indent, exceptionOnInvalidType, objectEncoder) {
    return this.dump(input, inline, indent, exceptionOnInvalidType, objectEncoder);
  };

  Yaml.load = function(path, callback, exceptionOnInvalidType, objectDecoder) {
    return this.parseFile(path, callback, exceptionOnInvalidType, objectDecoder);
  };

  return Yaml;

})();

if (typeof window !== "undefined" && window !== null) {
  window.YAML = Yaml;
}

module.exports = Yaml;



},{"./Dumper":1,"./Parser":6,"./Utils":9}]},{},[10])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi91c3IvbG9jYWwvbGliL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvamVyZW15ZmEvRG9jdW1lbnRzL1Byb2pldHMveWFtbGpzLTIvc3JjL0R1bXBlci5jb2ZmZWUiLCIvVXNlcnMvamVyZW15ZmEvRG9jdW1lbnRzL1Byb2pldHMveWFtbGpzLTIvc3JjL0VzY2FwZXIuY29mZmVlIiwiL1VzZXJzL2plcmVteWZhL0RvY3VtZW50cy9Qcm9qZXRzL3lhbWxqcy0yL3NyYy9FeGNlcHRpb24vRHVtcEV4Y2VwdGlvbi5jb2ZmZWUiLCIvVXNlcnMvamVyZW15ZmEvRG9jdW1lbnRzL1Byb2pldHMveWFtbGpzLTIvc3JjL0V4Y2VwdGlvbi9QYXJzZUV4Y2VwdGlvbi5jb2ZmZWUiLCIvVXNlcnMvamVyZW15ZmEvRG9jdW1lbnRzL1Byb2pldHMveWFtbGpzLTIvc3JjL0lubGluZS5jb2ZmZWUiLCIvVXNlcnMvamVyZW15ZmEvRG9jdW1lbnRzL1Byb2pldHMveWFtbGpzLTIvc3JjL1BhcnNlci5jb2ZmZWUiLCIvVXNlcnMvamVyZW15ZmEvRG9jdW1lbnRzL1Byb2pldHMveWFtbGpzLTIvc3JjL1BhdHRlcm4uY29mZmVlIiwiL1VzZXJzL2plcmVteWZhL0RvY3VtZW50cy9Qcm9qZXRzL3lhbWxqcy0yL3NyYy9VbmVzY2FwZXIuY29mZmVlIiwiL1VzZXJzL2plcmVteWZhL0RvY3VtZW50cy9Qcm9qZXRzL3lhbWxqcy0yL3NyYy9VdGlscy5jb2ZmZWUiLCIvVXNlcnMvamVyZW15ZmEvRG9jdW1lbnRzL1Byb2pldHMveWFtbGpzLTIvc3JjL1lhbWwuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQ0EsSUFBQSxxQkFBQTs7QUFBQSxLQUFBLEdBQVUsT0FBQSxDQUFRLFNBQVIsQ0FBVixDQUFBOztBQUFBLE1BQ0EsR0FBVSxPQUFBLENBQVEsVUFBUixDQURWLENBQUE7O0FB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Q0FEUTtFQUFBLENBMUVaLENBQUE7O0FBQUEsRUFnRkEsSUFBQyxDQUFBLElBQUQsR0FBTyxTQUFDLElBQUQsRUFBTyxRQUFQLEVBQWlCLHNCQUFqQixFQUF5QyxhQUF6QyxHQUFBO0FBQ0gsV0FBTyxJQUFDLENBQUEsU0FBRCxDQUFXLElBQVgsRUFBaUIsUUFBakIsRUFBMkIsc0JBQTNCLEVBQW1ELGFBQW5ELENBQVAsQ0FERztFQUFBLENBaEZQLENBQUE7O2NBQUE7O0lBekJKLENBQUE7OztFQThHQSxNQUFNLENBQUUsSUFBUixHQUFlO0NBOUdmOztBQUFBLE1BZ0hNLENBQUMsT0FBUCxHQUFpQixJQWhIakIsQ0FBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcblV0aWxzICAgPSByZXF1aXJlICcuL1V0aWxzJ1xuSW5saW5lICA9IHJlcXVpcmUgJy4vSW5saW5lJ1xuXG4jIER1bXBlciBkdW1wcyBKYXZhU2NyaXB0IHZhcmlhYmxlcyB0byBZQU1MIHN0cmluZ3MuXG4jXG5jbGFzcyBEdW1wZXJcblxuICAgICMgVGhlIGFtb3VudCBvZiBzcGFjZXMgdG8gdXNlIGZvciBpbmRlbnRhdGlvbiBvZiBuZXN0ZWQgbm9kZXMuXG4gICAgQGluZGVudGF0aW9uOiAgIDRcblxuXG4gICAgIyBEdW1wcyBhIEphdmFTY3JpcHQgdmFsdWUgdG8gWUFNTC5cbiAgICAjXG4gICAgIyBAcGFyYW0gW09iamVjdF0gICBpbnB1dCAgICAgICAgICAgICAgICAgICBUaGUgSmF2YVNjcmlwdCB2YWx1ZVxuICAgICMgQHBhcmFtIFtJbnRlZ2VyXSAgaW5saW5lICAgICAgICAgICAgICAgICAgVGhlIGxldmVsIHdoZXJlIHlvdSBzd2l0Y2ggdG8gaW5saW5lIFlBTUxcbiAgICAjIEBwYXJhbSBbSW50ZWdlcl0gIGluZGVudCAgICAgICAgICAgICAgICAgIFRoZSBsZXZlbCBvZiBpbmRlbnRhdGlvbiAodXNlZCBpbnRlcm5hbGx5KVxuICAgICMgQHBhcmFtIFtCb29sZWFuXSAgZXhjZXB0aW9uT25JbnZhbGlkVHlwZSAgdHJ1ZSBpZiBhbiBleGNlcHRpb24gbXVzdCBiZSB0aHJvd24gb24gaW52YWxpZCB0eXBlcyAoYSBKYXZhU2NyaXB0IHJlc291cmNlIG9yIG9iamVjdCksIGZhbHNlIG90aGVyd2lzZVxuICAgICMgQHBhcmFtIFtGdW5jdGlvbl0gb2JqZWN0RW5jb2RlciAgICAgICAgICAgQSBmdW5jdGlvbiB0byBzZXJpYWxpemUgY3VzdG9tIG9iamVjdHMsIG51bGwgb3RoZXJ3aXNlXG4gICAgI1xuICAgICMgQHJldHVybiBbU3RyaW5nXSAgVGhlIFlBTUwgcmVwcmVzZW50YXRpb24gb2YgdGhlIEphdmFTY3JpcHQgdmFsdWVcbiAgICAjXG4gICAgZHVtcDogKGlucHV0LCBpbmxpbmUgPSAwLCBpbmRlbnQgPSAwLCBleGNlcHRpb25PbkludmFsaWRUeXBlID0gZmFsc2UsIG9iamVjdEVuY29kZXIgPSBudWxsKSAtPlxuICAgICAgICBvdXRwdXQgPSAnJ1xuICAgICAgICBwcmVmaXggPSAoaWYgaW5kZW50IHRoZW4gVXRpbHMuc3RyUmVwZWF0KCcgJywgaW5kZW50KSBlbHNlICcnKVxuXG4gICAgICAgIGlmIGlubGluZSA8PSAwIG9yIHR5cGVvZihpbnB1dCkgaXNudCAnb2JqZWN0JyBvciBpbnB1dCBpbnN0YW5jZW9mIERhdGUgb3IgVXRpbHMuaXNFbXB0eShpbnB1dClcbiAgICAgICAgICAgIG91dHB1dCArPSBwcmVmaXggKyBJbmxpbmUuZHVtcChpbnB1dCwgZXhjZXB0aW9uT25JbnZhbGlkVHlwZSwgb2JqZWN0RW5jb2RlcilcbiAgICAgICAgXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGlmIGlucHV0IGluc3RhbmNlb2YgQXJyYXlcbiAgICAgICAgICAgICAgICBmb3IgdmFsdWUgaW4gaW5wdXRcbiAgICAgICAgICAgICAgICAgICAgd2lsbEJlSW5saW5lZCA9IChpbmxpbmUgLSAxIDw9IDAgb3IgdHlwZW9mKHZhbHVlKSBpc250ICdvYmplY3QnIG9yIFV0aWxzLmlzRW1wdHkodmFsdWUpKVxuXG4gICAgICAgICAgICAgICAgICAgIG91dHB1dCArPVxuICAgICAgICAgICAgICAgICAgICAgICAgcHJlZml4ICtcbiAgICAgICAgICAgICAgICAgICAgICAgICctJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAoaWYgd2lsbEJlSW5saW5lZCB0aGVuICcgJyBlbHNlIFwiXFxuXCIpICtcbiAgICAgICAgICAgICAgICAgICAgICAgIEBkdW1wKHZhbHVlLCBpbmxpbmUgLSAxLCAoaWYgd2lsbEJlSW5saW5lZCB0aGVuIDAgZWxzZSBpbmRlbnQgKyBAaW5kZW50YXRpb24pLCBleGNlcHRpb25PbkludmFsaWRUeXBlLCBvYmplY3RFbmNvZGVyKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAoaWYgd2lsbEJlSW5saW5lZCB0aGVuIFwiXFxuXCIgZWxzZSAnJylcblxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGZvciBrZXksIHZhbHVlIG9mIGlucHV0XG4gICAgICAgICAgICAgICAgICAgIHdpbGxCZUlubGluZWQgPSAoaW5saW5lIC0gMSA8PSAwIG9yIHR5cGVvZih2YWx1ZSkgaXNudCAnb2JqZWN0JyBvciBVdGlscy5pc0VtcHR5KHZhbHVlKSlcblxuICAgICAgICAgICAgICAgICAgICBvdXRwdXQgKz1cbiAgICAgICAgICAgICAgICAgICAgICAgIHByZWZpeCArXG4gICAgICAgICAgICAgICAgICAgICAgICBJbmxpbmUuZHVtcChrZXksIGV4Y2VwdGlvbk9uSW52YWxpZFR5cGUsIG9iamVjdEVuY29kZXIpICsgJzonICtcbiAgICAgICAgICAgICAgICAgICAgICAgIChpZiB3aWxsQmVJbmxpbmVkIHRoZW4gJyAnIGVsc2UgXCJcXG5cIikgK1xuICAgICAgICAgICAgICAgICAgICAgICAgQGR1bXAodmFsdWUsIGlubGluZSAtIDEsIChpZiB3aWxsQmVJbmxpbmVkIHRoZW4gMCBlbHNlIGluZGVudCArIEBpbmRlbnRhdGlvbiksIGV4Y2VwdGlvbk9uSW52YWxpZFR5cGUsIG9iamVjdEVuY29kZXIpICtcbiAgICAgICAgICAgICAgICAgICAgICAgIChpZiB3aWxsQmVJbmxpbmVkIHRoZW4gXCJcXG5cIiBlbHNlICcnKVxuXG4gICAgICAgIHJldHVybiBvdXRwdXRcblxuXG5tb2R1bGUuZXhwb3J0cyA9IER1bXBlclxuIiwiXG5QYXR0ZXJuID0gcmVxdWlyZSAnLi9QYXR0ZXJuJ1xuXG4jIEVzY2FwZXIgZW5jYXBzdWxhdGVzIGVzY2FwaW5nIHJ1bGVzIGZvciBzaW5nbGVcbiMgYW5kIGRvdWJsZS1xdW90ZWQgWUFNTCBzdHJpbmdzLlxuY2xhc3MgRXNjYXBlclxuXG4gICAgIyBNYXBwaW5nIGFycmF5cyBmb3IgZXNjYXBpbmcgYSBkb3VibGUgcXVvdGVkIHN0cmluZy4gVGhlIGJhY2tzbGFzaCBpc1xuICAgICMgZmlyc3QgdG8gZW5zdXJlIHByb3BlciBlc2NhcGluZy5cbiAgICBATElTVF9FU0NBUEVFUzogICAgICAgICAgICAgICAgIFsnXFxcXFxcXFwnLCAnXFxcXFwiJywgJ1wiJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxceDAwXCIsICBcIlxceDAxXCIsICBcIlxceDAyXCIsICBcIlxceDAzXCIsICBcIlxceDA0XCIsICBcIlxceDA1XCIsICBcIlxceDA2XCIsICBcIlxceDA3XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXHgwOFwiLCAgXCJcXHgwOVwiLCAgXCJcXHgwYVwiLCAgXCJcXHgwYlwiLCAgXCJcXHgwY1wiLCAgXCJcXHgwZFwiLCAgXCJcXHgwZVwiLCAgXCJcXHgwZlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFx4MTBcIiwgIFwiXFx4MTFcIiwgIFwiXFx4MTJcIiwgIFwiXFx4MTNcIiwgIFwiXFx4MTRcIiwgIFwiXFx4MTVcIiwgIFwiXFx4MTZcIiwgIFwiXFx4MTdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxceDE4XCIsICBcIlxceDE5XCIsICBcIlxceDFhXCIsICBcIlxceDFiXCIsICBcIlxceDFjXCIsICBcIlxceDFkXCIsICBcIlxceDFlXCIsICBcIlxceDFmXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNoID0gU3RyaW5nLmZyb21DaGFyQ29kZSkoMHgwMDg1KSwgY2goMHgwMEEwKSwgY2goMHgyMDI4KSwgY2goMHgyMDI5KV1cbiAgICBATElTVF9FU0NBUEVEOiAgICAgICAgICAgICAgICAgIFsnXFxcXFwiJywgJ1xcXFxcXFxcJywgJ1xcXFxcIicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXFxcMFwiLCAgIFwiXFxcXHgwMVwiLCBcIlxcXFx4MDJcIiwgXCJcXFxceDAzXCIsIFwiXFxcXHgwNFwiLCBcIlxcXFx4MDVcIiwgXCJcXFxceDA2XCIsIFwiXFxcXGFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcXFxiXCIsICAgXCJcXFxcdFwiLCAgIFwiXFxcXG5cIiwgICBcIlxcXFx2XCIsICAgXCJcXFxcZlwiLCAgIFwiXFxcXHJcIiwgICBcIlxcXFx4MGVcIiwgXCJcXFxceDBmXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXFxceDEwXCIsIFwiXFxcXHgxMVwiLCBcIlxcXFx4MTJcIiwgXCJcXFxceDEzXCIsIFwiXFxcXHgxNFwiLCBcIlxcXFx4MTVcIiwgXCJcXFxceDE2XCIsIFwiXFxcXHgxN1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxcXHgxOFwiLCBcIlxcXFx4MTlcIiwgXCJcXFxceDFhXCIsIFwiXFxcXGVcIiwgICBcIlxcXFx4MWNcIiwgXCJcXFxceDFkXCIsIFwiXFxcXHgxZVwiLCBcIlxcXFx4MWZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcXFxOXCIsIFwiXFxcXF9cIiwgXCJcXFxcTFwiLCBcIlxcXFxQXCJdXG5cbiAgICBATUFQUElOR19FU0NBUEVFU19UT19FU0NBUEVEOiAgIGRvID0+XG4gICAgICAgIG1hcHBpbmcgPSB7fVxuICAgICAgICBmb3IgaSBpbiBbMC4uLkBMSVNUX0VTQ0FQRUVTLmxlbmd0aF1cbiAgICAgICAgICAgIG1hcHBpbmdbQExJU1RfRVNDQVBFRVNbaV1dID0gQExJU1RfRVNDQVBFRFtpXVxuICAgICAgICByZXR1cm4gbWFwcGluZyBcblxuICAgICMgQ2hhcmFjdGVycyB0aGF0IHdvdWxkIGNhdXNlIGEgZHVtcGVkIHN0cmluZyB0byByZXF1aXJlIGRvdWJsZSBxdW90aW5nLlxuICAgIEBQQVRURVJOX0NIQVJBQ1RFUlNfVE9fRVNDQVBFOiAgbmV3IFBhdHRlcm4gJ1tcXFxceDAwLVxcXFx4MWZdfFxceGMyXFx4ODV8XFx4YzJcXHhhMHxcXHhlMlxceDgwXFx4YTh8XFx4ZTJcXHg4MFxceGE5J1xuXG4gICAgIyBPdGhlciBwcmVjb21waWxlZCBwYXR0ZXJuc1xuICAgIEBQQVRURVJOX01BUFBJTkdfRVNDQVBFRVM6ICAgICAgbmV3IFBhdHRlcm4gQExJU1RfRVNDQVBFRVMuam9pbignfCcpXG4gICAgQFBBVFRFUk5fU0lOR0xFX1FVT1RJTkc6ICAgICAgICBuZXcgUGF0dGVybiAnW1xcXFxzXFwnXCI6e31bXFxcXF0sJiojP118XlstP3w8Pj0hJUBgXSdcblxuXG5cbiAgICAjIERldGVybWluZXMgaWYgYSBKYXZhU2NyaXB0IHZhbHVlIHdvdWxkIHJlcXVpcmUgZG91YmxlIHF1b3RpbmcgaW4gWUFNTC5cbiAgICAjXG4gICAgIyBAcGFyYW0gW1N0cmluZ10gICB2YWx1ZSAgIEEgSmF2YVNjcmlwdCB2YWx1ZSB2YWx1ZVxuICAgICNcbiAgICAjIEByZXR1cm4gW0Jvb2xlYW5dIHRydWUgICAgaWYgdGhlIHZhbHVlIHdvdWxkIHJlcXVpcmUgZG91YmxlIHF1b3Rlcy5cbiAgICAjXG4gICAgQHJlcXVpcmVzRG91YmxlUXVvdGluZzogKHZhbHVlKSAtPlxuICAgICAgICByZXR1cm4gQFBBVFRFUk5fQ0hBUkFDVEVSU19UT19FU0NBUEUudGVzdCB2YWx1ZVxuXG5cbiAgICAjIEVzY2FwZXMgYW5kIHN1cnJvdW5kcyBhIEphdmFTY3JpcHQgdmFsdWUgd2l0aCBkb3VibGUgcXVvdGVzLlxuICAgICNcbiAgICAjIEBwYXJhbSBbU3RyaW5nXSAgIHZhbHVlICAgQSBKYXZhU2NyaXB0IHZhbHVlXG4gICAgI1xuICAgICMgQHJldHVybiBbU3RyaW5nXSAgVGhlIHF1b3RlZCwgZXNjYXBlZCBzdHJpbmdcbiAgICAjXG4gICAgQGVzY2FwZVdpdGhEb3VibGVRdW90ZXM6ICh2YWx1ZSkgLT5cbiAgICAgICAgcmVzdWx0ID0gQFBBVFRFUk5fTUFQUElOR19FU0NBUEVFUy5yZXBsYWNlIHZhbHVlLCAoc3RyKSA9PlxuICAgICAgICAgICAgcmV0dXJuIEBNQVBQSU5HX0VTQ0FQRUVTX1RPX0VTQ0FQRURbc3RyXVxuICAgICAgICByZXR1cm4gJ1wiJytyZXN1bHQrJ1wiJ1xuXG5cbiAgICAjIERldGVybWluZXMgaWYgYSBKYXZhU2NyaXB0IHZhbHVlIHdvdWxkIHJlcXVpcmUgc2luZ2xlIHF1b3RpbmcgaW4gWUFNTC5cbiAgICAjXG4gICAgIyBAcGFyYW0gW1N0cmluZ10gICB2YWx1ZSAgIEEgSmF2YVNjcmlwdCB2YWx1ZVxuICAgICNcbiAgICAjIEByZXR1cm4gW0Jvb2xlYW5dIHRydWUgaWYgdGhlIHZhbHVlIHdvdWxkIHJlcXVpcmUgc2luZ2xlIHF1b3Rlcy5cbiAgICAjXG4gICAgQHJlcXVpcmVzU2luZ2xlUXVvdGluZzogKHZhbHVlKSAtPlxuICAgICAgICByZXR1cm4gQFBBVFRFUk5fU0lOR0xFX1FVT1RJTkcudGVzdCB2YWx1ZVxuXG5cbiAgICAjIEVzY2FwZXMgYW5kIHN1cnJvdW5kcyBhIEphdmFTY3JpcHQgdmFsdWUgd2l0aCBzaW5nbGUgcXVvdGVzLlxuICAgICNcbiAgICAjIEBwYXJhbSBbU3RyaW5nXSAgIHZhbHVlICAgQSBKYXZhU2NyaXB0IHZhbHVlXG4gICAgI1xuICAgICMgQHJldHVybiBbU3RyaW5nXSAgVGhlIHF1b3RlZCwgZXNjYXBlZCBzdHJpbmdcbiAgICAjXG4gICAgQGVzY2FwZVdpdGhTaW5nbGVRdW90ZXM6ICh2YWx1ZSkgLT5cbiAgICAgICAgcmV0dXJuIFwiJ1wiK3ZhbHVlLnJlcGxhY2UoJ1xcJycsICdcXCdcXCcnKStcIidcIlxuXG5cbm1vZHVsZS5leHBvcnRzID0gRXNjYXBlclxuXG4iLCJcbmNsYXNzIER1bXBFeGNlcHRpb24gZXh0ZW5kcyBFcnJvclxuXG4gICAgY29uc3RydWN0b3I6IChAbWVzc2FnZSwgQHBhcnNlZExpbmUsIEBzbmlwcGV0KSAtPlxuXG4gICAgdG9TdHJpbmc6IC0+XG4gICAgICAgIGlmIEBwYXJzZWRMaW5lPyBhbmQgQHNuaXBwZXQ/XG4gICAgICAgICAgICByZXR1cm4gJzxEdW1wRXhjZXB0aW9uPiAnICsgQG1lc3NhZ2UgKyAnIChsaW5lICcgKyBAcGFyc2VkTGluZSArICc6IFxcJycgKyBAc25pcHBldCArICdcXCcpJ1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gJzxEdW1wRXhjZXB0aW9uPiAnICsgQG1lc3NhZ2VcblxubW9kdWxlLmV4cG9ydHMgPSBEdW1wRXhjZXB0aW9uXG4iLCJcbmNsYXNzIFBhcnNlRXhjZXB0aW9uIGV4dGVuZHMgRXJyb3JcblxuICAgIGNvbnN0cnVjdG9yOiAoQG1lc3NhZ2UsIEBwYXJzZWRMaW5lLCBAc25pcHBldCkgLT5cblxuICAgIHRvU3RyaW5nOiAtPlxuICAgICAgICBpZiBAcGFyc2VkTGluZT8gYW5kIEBzbmlwcGV0P1xuICAgICAgICAgICAgcmV0dXJuICc8UGFyc2VFeGNlcHRpb24+ICcgKyBAbWVzc2FnZSArICcgKGxpbmUgJyArIEBwYXJzZWRMaW5lICsgJzogXFwnJyArIEBzbmlwcGV0ICsgJ1xcJyknXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiAnPFBhcnNlRXhjZXB0aW9uPiAnICsgQG1lc3NhZ2VcblxubW9kdWxlLmV4cG9ydHMgPSBQYXJzZUV4Y2VwdGlvblxuIiwiXG5QYXR0ZXJuICAgICAgICAgPSByZXF1aXJlICcuL1BhdHRlcm4nXG5VbmVzY2FwZXIgICAgICAgPSByZXF1aXJlICcuL1VuZXNjYXBlcidcbkVzY2FwZXIgICAgICAgICA9IHJlcXVpcmUgJy4vRXNjYXBlcidcblV0aWxzICAgICAgICAgICA9IHJlcXVpcmUgJy4vVXRpbHMnXG5QYXJzZUV4Y2VwdGlvbiAgPSByZXF1aXJlICcuL0V4Y2VwdGlvbi9QYXJzZUV4Y2VwdGlvbidcbkR1bXBFeGNlcHRpb24gICA9IHJlcXVpcmUgJy4vRXhjZXB0aW9uL0R1bXBFeGNlcHRpb24nXG5cbiMgSW5saW5lIFlBTUwgcGFyc2luZyBhbmQgZHVtcGluZ1xuY2xhc3MgSW5saW5lXG5cbiAgICAjIFF1b3RlZCBzdHJpbmcgcmVndWxhciBleHByZXNzaW9uXG4gICAgQFJFR0VYX1FVT1RFRF9TVFJJTkc6ICAgICAgICAgICAgICAgJyg/OlwiKD86W15cIlxcXFxcXFxcXSooPzpcXFxcXFxcXC5bXlwiXFxcXFxcXFxdKikqKVwifFxcJyg/OlteXFwnXSooPzpcXCdcXCdbXlxcJ10qKSopXFwnKSdcblxuICAgICMgUHJlLWNvbXBpbGVkIHBhdHRlcm5zXG4gICAgI1xuICAgIEBQQVRURVJOX1RSQUlMSU5HX0NPTU1FTlRTOiAgICAgICAgIG5ldyBQYXR0ZXJuICdeXFxcXHMqIy4qJCdcbiAgICBAUEFUVEVSTl9RVU9URURfU0NBTEFSOiAgICAgICAgICAgICBuZXcgUGF0dGVybiAnXicrQFJFR0VYX1FVT1RFRF9TVFJJTkdcbiAgICBAUEFUVEVSTl9USE9VU0FORF9OVU1FUklDX1NDQUxBUjogICBuZXcgUGF0dGVybiAnXigtfFxcXFwrKT9bMC05LF0rKFxcXFwuWzAtOV0rKT8kJ1xuICAgIEBQQVRURVJOX1NDQUxBUl9CWV9ERUxJTUlURVJTOiAgICAgIHt9XG5cbiAgICAjIFNldHRpbmdzXG4gICAgQHNldHRpbmdzOiB7fVxuXG5cbiAgICAjIENvbmZpZ3VyZSBZQU1MIGlubGluZS5cbiAgICAjXG4gICAgIyBAcGFyYW0gW0Jvb2xlYW5dICBleGNlcHRpb25PbkludmFsaWRUeXBlICB0cnVlIGlmIGFuIGV4Y2VwdGlvbiBtdXN0IGJlIHRocm93biBvbiBpbnZhbGlkIHR5cGVzIChhIEphdmFTY3JpcHQgcmVzb3VyY2Ugb3Igb2JqZWN0KSwgZmFsc2Ugb3RoZXJ3aXNlXG4gICAgIyBAcGFyYW0gW0Z1bmN0aW9uXSBvYmplY3REZWNvZGVyICAgICAgICAgICBBIGZ1bmN0aW9uIHRvIGRlc2VyaWFsaXplIGN1c3RvbSBvYmplY3RzLCBudWxsIG90aGVyd2lzZVxuICAgICNcbiAgICBAY29uZmlndXJlOiAoZXhjZXB0aW9uT25JbnZhbGlkVHlwZSA9IG51bGwsIG9iamVjdERlY29kZXIgPSBudWxsKSAtPlxuICAgICAgICAjIFVwZGF0ZSBzZXR0aW5nc1xuICAgICAgICBAc2V0dGluZ3MuZXhjZXB0aW9uT25JbnZhbGlkVHlwZSA9IGV4Y2VwdGlvbk9uSW52YWxpZFR5cGVcbiAgICAgICAgQHNldHRpbmdzLm9iamVjdERlY29kZXIgPSBvYmplY3REZWNvZGVyXG4gICAgICAgIHJldHVyblxuXG5cbiAgICAjIENvbnZlcnRzIGEgWUFNTCBzdHJpbmcgdG8gYSBKYXZhU2NyaXB0IG9iamVjdC5cbiAgICAjXG4gICAgIyBAcGFyYW0gW1N0cmluZ10gICB2YWx1ZSAgICAgICAgICAgICAgICAgICBBIFlBTUwgc3RyaW5nXG4gICAgIyBAcGFyYW0gW0Jvb2xlYW5dICBleGNlcHRpb25PbkludmFsaWRUeXBlICB0cnVlIGlmIGFuIGV4Y2VwdGlvbiBtdXN0IGJlIHRocm93biBvbiBpbnZhbGlkIHR5cGVzIChhIEphdmFTY3JpcHQgcmVzb3VyY2Ugb3Igb2JqZWN0KSwgZmFsc2Ugb3RoZXJ3aXNlXG4gICAgIyBAcGFyYW0gW0Z1bmN0aW9uXSBvYmplY3REZWNvZGVyICAgICAgICAgICBBIGZ1bmN0aW9uIHRvIGRlc2VyaWFsaXplIGN1c3RvbSBvYmplY3RzLCBudWxsIG90aGVyd2lzZVxuICAgICNcbiAgICAjIEByZXR1cm4gW09iamVjdF0gIEEgSmF2YVNjcmlwdCBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBZQU1MIHN0cmluZ1xuICAgICNcbiAgICAjIEB0aHJvdyBbUGFyc2VFeGNlcHRpb25dXG4gICAgI1xuICAgIEBwYXJzZTogKHZhbHVlLCBleGNlcHRpb25PbkludmFsaWRUeXBlID0gZmFsc2UsIG9iamVjdERlY29kZXIgPSBudWxsKSAtPlxuICAgICAgICAjIFVwZGF0ZSBzZXR0aW5ncyBmcm9tIGxhc3QgY2FsbCBvZiBJbmxpbmUucGFyc2UoKVxuICAgICAgICBAc2V0dGluZ3MuZXhjZXB0aW9uT25JbnZhbGlkVHlwZSA9IGV4Y2VwdGlvbk9uSW52YWxpZFR5cGVcbiAgICAgICAgQHNldHRpbmdzLm9iamVjdERlY29kZXIgPSBvYmplY3REZWNvZGVyXG5cbiAgICAgICAgaWYgbm90IHZhbHVlP1xuICAgICAgICAgICAgcmV0dXJuICcnXG5cbiAgICAgICAgdmFsdWUgPSBVdGlscy50cmltIHZhbHVlXG5cbiAgICAgICAgaWYgMCBpcyB2YWx1ZS5sZW5ndGhcbiAgICAgICAgICAgIHJldHVybiAnJ1xuXG4gICAgICAgICMgS2VlcCBhIGNvbnRleHQgb2JqZWN0IHRvIHBhc3MgdGhyb3VnaCBzdGF0aWMgbWV0aG9kc1xuICAgICAgICBjb250ZXh0ID0ge2V4Y2VwdGlvbk9uSW52YWxpZFR5cGUsIG9iamVjdERlY29kZXIsIGk6IDB9XG5cbiAgICAgICAgc3dpdGNoIHZhbHVlLmNoYXJBdCgwKVxuICAgICAgICAgICAgd2hlbiAnWydcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBAcGFyc2VTZXF1ZW5jZSB2YWx1ZSwgY29udGV4dFxuICAgICAgICAgICAgICAgICsrY29udGV4dC5pXG4gICAgICAgICAgICB3aGVuICd7J1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IEBwYXJzZU1hcHBpbmcgdmFsdWUsIGNvbnRleHRcbiAgICAgICAgICAgICAgICArK2NvbnRleHQuaVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IEBwYXJzZVNjYWxhciB2YWx1ZSwgbnVsbCwgWydcIicsIFwiJ1wiXSwgY29udGV4dFxuXG4gICAgICAgICMgU29tZSBjb21tZW50cyBhcmUgYWxsb3dlZCBhdCB0aGUgZW5kXG4gICAgICAgIGlmIEBQQVRURVJOX1RSQUlMSU5HX0NPTU1FTlRTLnJlcGxhY2UodmFsdWVbY29udGV4dC5pLi5dLCAnJykgaXNudCAnJ1xuICAgICAgICAgICAgdGhyb3cgbmV3IFBhcnNlRXhjZXB0aW9uICdVbmV4cGVjdGVkIGNoYXJhY3RlcnMgbmVhciBcIicrdmFsdWVbY29udGV4dC5pLi5dKydcIi4nXG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdFxuXG5cbiAgICAjIER1bXBzIGEgZ2l2ZW4gSmF2YVNjcmlwdCB2YXJpYWJsZSB0byBhIFlBTUwgc3RyaW5nLlxuICAgICNcbiAgICAjIEBwYXJhbSBbT2JqZWN0XSAgIHZhbHVlICAgICAgICAgICAgICAgICAgIFRoZSBKYXZhU2NyaXB0IHZhcmlhYmxlIHRvIGNvbnZlcnRcbiAgICAjIEBwYXJhbSBbQm9vbGVhbl0gIGV4Y2VwdGlvbk9uSW52YWxpZFR5cGUgIHRydWUgaWYgYW4gZXhjZXB0aW9uIG11c3QgYmUgdGhyb3duIG9uIGludmFsaWQgdHlwZXMgKGEgSmF2YVNjcmlwdCByZXNvdXJjZSBvciBvYmplY3QpLCBmYWxzZSBvdGhlcndpc2VcbiAgICAjIEBwYXJhbSBbRnVuY3Rpb25dIG9iamVjdEVuY29kZXIgICAgICAgICAgIEEgZnVuY3Rpb24gdG8gc2VyaWFsaXplIGN1c3RvbSBvYmplY3RzLCBudWxsIG90aGVyd2lzZVxuICAgICNcbiAgICAjIEByZXR1cm4gW1N0cmluZ10gIFRoZSBZQU1MIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIEphdmFTY3JpcHQgb2JqZWN0XG4gICAgI1xuICAgICMgQHRocm93IFtEdW1wRXhjZXB0aW9uXVxuICAgICNcbiAgICBAZHVtcDogKHZhbHVlLCBleGNlcHRpb25PbkludmFsaWRUeXBlID0gZmFsc2UsIG9iamVjdEVuY29kZXIgPSBudWxsKSAtPlxuICAgICAgICBpZiBub3QgdmFsdWU/XG4gICAgICAgICAgICByZXR1cm4gJ251bGwnXG4gICAgICAgIHR5cGUgPSB0eXBlb2YgdmFsdWVcbiAgICAgICAgaWYgdHlwZSBpcyAnb2JqZWN0J1xuICAgICAgICAgICAgaWYgdmFsdWUgaW5zdGFuY2VvZiBEYXRlXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlLnRvSVNPU3RyaW5nKClcbiAgICAgICAgICAgIGVsc2UgaWYgb2JqZWN0RW5jb2Rlcj9cbiAgICAgICAgICAgICAgICByZXN1bHQgPSBvYmplY3RFbmNvZGVyIHZhbHVlXG4gICAgICAgICAgICAgICAgaWYgdHlwZW9mIHJlc3VsdCBpcyAnc3RyaW5nJyBvciByZXN1bHQ/XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHRcbiAgICAgICAgICAgIHJldHVybiBAZHVtcE9iamVjdCB2YWx1ZVxuICAgICAgICBpZiB0eXBlIGlzICdib29sZWFuJ1xuICAgICAgICAgICAgcmV0dXJuIChpZiB2YWx1ZSB0aGVuICd0cnVlJyBlbHNlICdmYWxzZScpXG4gICAgICAgIGlmIFV0aWxzLmlzRGlnaXRzKHZhbHVlKVxuICAgICAgICAgICAgcmV0dXJuIChpZiB0eXBlIGlzICdzdHJpbmcnIHRoZW4gXCInXCIrdmFsdWUrXCInXCIgZWxzZSBTdHJpbmcocGFyc2VJbnQodmFsdWUpKSlcbiAgICAgICAgaWYgVXRpbHMuaXNOdW1lcmljKHZhbHVlKVxuICAgICAgICAgICAgcmV0dXJuIChpZiB0eXBlIGlzICdzdHJpbmcnIHRoZW4gXCInXCIrdmFsdWUrXCInXCIgZWxzZSBTdHJpbmcocGFyc2VGbG9hdCh2YWx1ZSkpKVxuICAgICAgICBpZiB0eXBlIGlzICdudW1iZXInXG4gICAgICAgICAgICByZXR1cm4gKGlmIHZhbHVlIGlzIEluZmluaXR5IHRoZW4gJy5JbmYnIGVsc2UgKGlmIHZhbHVlIGlzIC1JbmZpbml0eSB0aGVuICctLkluZicgZWxzZSAoaWYgaXNOYU4odmFsdWUpIHRoZW4gJy5OYU4nIGVsc2UgdmFsdWUpKSlcbiAgICAgICAgaWYgRXNjYXBlci5yZXF1aXJlc0RvdWJsZVF1b3RpbmcgdmFsdWVcbiAgICAgICAgICAgIHJldHVybiBFc2NhcGVyLmVzY2FwZVdpdGhEb3VibGVRdW90ZXMgdmFsdWVcbiAgICAgICAgaWYgRXNjYXBlci5yZXF1aXJlc1NpbmdsZVF1b3RpbmcgdmFsdWVcbiAgICAgICAgICAgIHJldHVybiBFc2NhcGVyLmVzY2FwZVdpdGhTaW5nbGVRdW90ZXMgdmFsdWVcbiAgICAgICAgaWYgJycgaXMgdmFsdWVcbiAgICAgICAgICAgIHJldHVybiAnXCJcIidcbiAgICAgICAgaWYgVXRpbHMuUEFUVEVSTl9EQVRFLnRlc3QgdmFsdWVcbiAgICAgICAgICAgIHJldHVybiBcIidcIit2YWx1ZStcIidcIjtcbiAgICAgICAgaWYgdmFsdWUudG9Mb3dlckNhc2UoKSBpbiBbJ251bGwnLCd+JywndHJ1ZScsJ2ZhbHNlJ11cbiAgICAgICAgICAgIHJldHVybiBcIidcIit2YWx1ZStcIidcIlxuICAgICAgICAjIERlZmF1bHRcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuXG5cbiAgICAjIER1bXBzIGEgSmF2YVNjcmlwdCBvYmplY3QgdG8gYSBZQU1MIHN0cmluZy5cbiAgICAjXG4gICAgIyBAcGFyYW0gW09iamVjdF0gICB2YWx1ZSAgICAgICAgICAgICAgICAgICBUaGUgSmF2YVNjcmlwdCBvYmplY3QgdG8gZHVtcFxuICAgICMgQHBhcmFtIFtCb29sZWFuXSAgZXhjZXB0aW9uT25JbnZhbGlkVHlwZSAgdHJ1ZSBpZiBhbiBleGNlcHRpb24gbXVzdCBiZSB0aHJvd24gb24gaW52YWxpZCB0eXBlcyAoYSBKYXZhU2NyaXB0IHJlc291cmNlIG9yIG9iamVjdCksIGZhbHNlIG90aGVyd2lzZVxuICAgICMgQHBhcmFtIFtGdW5jdGlvbl0gb2JqZWN0RW5jb2RlciAgICAgICAgICAgQSBmdW5jdGlvbiBkbyBzZXJpYWxpemUgY3VzdG9tIG9iamVjdHMsIG51bGwgb3RoZXJ3aXNlXG4gICAgI1xuICAgICMgQHJldHVybiBzdHJpbmcgVGhlIFlBTUwgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgSmF2YVNjcmlwdCBvYmplY3RcbiAgICAjXG4gICAgQGR1bXBPYmplY3Q6ICh2YWx1ZSwgZXhjZXB0aW9uT25JbnZhbGlkVHlwZSwgb2JqZWN0U3VwcG9ydCA9IG51bGwpIC0+XG4gICAgICAgICMgQXJyYXlcbiAgICAgICAgaWYgdmFsdWUgaW5zdGFuY2VvZiBBcnJheVxuICAgICAgICAgICAgb3V0cHV0ID0gW11cbiAgICAgICAgICAgIGZvciB2YWwgaW4gdmFsdWVcbiAgICAgICAgICAgICAgICBvdXRwdXQucHVzaCBAZHVtcCB2YWxcbiAgICAgICAgICAgIHJldHVybiAnWycrb3V0cHV0LmpvaW4oJywgJykrJ10nXG5cbiAgICAgICAgIyBNYXBwaW5nXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIG91dHB1dCA9IFtdXG4gICAgICAgICAgICBmb3Iga2V5LCB2YWwgb2YgdmFsdWVcbiAgICAgICAgICAgICAgICBvdXRwdXQucHVzaCBAZHVtcChrZXkpKyc6ICcrQGR1bXAodmFsKVxuICAgICAgICAgICAgcmV0dXJuICd7JytvdXRwdXQuam9pbignLCAnKSsnfSdcblxuXG4gICAgIyBQYXJzZXMgYSBzY2FsYXIgdG8gYSBZQU1MIHN0cmluZy5cbiAgICAjXG4gICAgIyBAcGFyYW0gW09iamVjdF0gICBzY2FsYXJcbiAgICAjIEBwYXJhbSBbQXJyYXldICAgIGRlbGltaXRlcnNcbiAgICAjIEBwYXJhbSBbQXJyYXldICAgIHN0cmluZ0RlbGltaXRlcnNcbiAgICAjIEBwYXJhbSBbT2JqZWN0XSAgIGNvbnRleHRcbiAgICAjIEBwYXJhbSBbQm9vbGVhbl0gIGV2YWx1YXRlXG4gICAgI1xuICAgICMgQHJldHVybiBbU3RyaW5nXSAgQSBZQU1MIHN0cmluZ1xuICAgICNcbiAgICAjIEB0aHJvdyBbUGFyc2VFeGNlcHRpb25dIFdoZW4gbWFsZm9ybWVkIGlubGluZSBZQU1MIHN0cmluZyBpcyBwYXJzZWRcbiAgICAjXG4gICAgQHBhcnNlU2NhbGFyOiAoc2NhbGFyLCBkZWxpbWl0ZXJzID0gbnVsbCwgc3RyaW5nRGVsaW1pdGVycyA9IFsnXCInLCBcIidcIl0sIGNvbnRleHQgPSBudWxsLCBldmFsdWF0ZSA9IHRydWUpIC0+XG4gICAgICAgIHVubGVzcyBjb250ZXh0P1xuICAgICAgICAgICAgY29udGV4dCA9IGV4Y2VwdGlvbk9uSW52YWxpZFR5cGU6IEBzZXR0aW5ncy5leGNlcHRpb25PbkludmFsaWRUeXBlLCBvYmplY3REZWNvZGVyOiBAc2V0dGluZ3Mub2JqZWN0RGVjb2RlciwgaTogMFxuICAgICAgICB7aX0gPSBjb250ZXh0XG5cbiAgICAgICAgaWYgc2NhbGFyLmNoYXJBdChpKSBpbiBzdHJpbmdEZWxpbWl0ZXJzXG4gICAgICAgICAgICAjIFF1b3RlZCBzY2FsYXJcbiAgICAgICAgICAgIG91dHB1dCA9IEBwYXJzZVF1b3RlZFNjYWxhciBzY2FsYXIsIGNvbnRleHRcbiAgICAgICAgICAgIHtpfSA9IGNvbnRleHRcblxuICAgICAgICAgICAgaWYgZGVsaW1pdGVycz9cbiAgICAgICAgICAgICAgICB0bXAgPSBVdGlscy5sdHJpbSBzY2FsYXJbaS4uXSwgJyAnXG4gICAgICAgICAgICAgICAgaWYgbm90KHRtcC5jaGFyQXQoMCkgaW4gZGVsaW1pdGVycylcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFBhcnNlRXhjZXB0aW9uICdVbmV4cGVjdGVkIGNoYXJhY3RlcnMgKCcrc2NhbGFyW2kuLl0rJykuJ1xuXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgICMgXCJub3JtYWxcIiBzdHJpbmdcbiAgICAgICAgICAgIGlmIG5vdCBkZWxpbWl0ZXJzXG4gICAgICAgICAgICAgICAgb3V0cHV0ID0gc2NhbGFyW2kuLl1cbiAgICAgICAgICAgICAgICBpICs9IG91dHB1dC5sZW5ndGhcblxuICAgICAgICAgICAgICAgICMgUmVtb3ZlIGNvbW1lbnRzXG4gICAgICAgICAgICAgICAgc3RycG9zID0gb3V0cHV0LmluZGV4T2YgJyAjJ1xuICAgICAgICAgICAgICAgIGlmIHN0cnBvcyBpc250IC0xXG4gICAgICAgICAgICAgICAgICAgIG91dHB1dCA9IFV0aWxzLnJ0cmltIG91dHB1dFswLi4uc3RycG9zXVxuXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgam9pbmVkRGVsaW1pdGVycyA9IGRlbGltaXRlcnMuam9pbignfCcpXG4gICAgICAgICAgICAgICAgcGF0dGVybiA9IEBQQVRURVJOX1NDQUxBUl9CWV9ERUxJTUlURVJTW2pvaW5lZERlbGltaXRlcnNdXG4gICAgICAgICAgICAgICAgdW5sZXNzIHBhdHRlcm4/XG4gICAgICAgICAgICAgICAgICAgIHBhdHRlcm4gPSBuZXcgUGF0dGVybiAnXiguKz8pKCcram9pbmVkRGVsaW1pdGVycysnKSdcbiAgICAgICAgICAgICAgICAgICAgQFBBVFRFUk5fU0NBTEFSX0JZX0RFTElNSVRFUlNbam9pbmVkRGVsaW1pdGVyc10gPSBwYXR0ZXJuXG4gICAgICAgICAgICAgICAgaWYgbWF0Y2ggPSBwYXR0ZXJuLmV4ZWMgc2NhbGFyW2kuLl1cbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0ID0gbWF0Y2hbMV1cbiAgICAgICAgICAgICAgICAgICAgaSArPSBvdXRwdXQubGVuZ3RoXG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUGFyc2VFeGNlcHRpb24gJ01hbGZvcm1lZCBpbmxpbmUgWUFNTCBzdHJpbmcgKCcrc2NhbGFyKycpLidcblxuXG4gICAgICAgICAgICBpZiBldmFsdWF0ZVxuICAgICAgICAgICAgICAgIG91dHB1dCA9IEBldmFsdWF0ZVNjYWxhciBvdXRwdXQsIGNvbnRleHRcblxuICAgICAgICBjb250ZXh0LmkgPSBpXG4gICAgICAgIHJldHVybiBvdXRwdXRcblxuXG4gICAgIyBQYXJzZXMgYSBxdW90ZWQgc2NhbGFyIHRvIFlBTUwuXG4gICAgI1xuICAgICMgQHBhcmFtIFtTdHJpbmddICAgc2NhbGFyXG4gICAgIyBAcGFyYW0gW09iamVjdF0gICBjb250ZXh0XG4gICAgI1xuICAgICMgQHJldHVybiBbU3RyaW5nXSAgQSBZQU1MIHN0cmluZ1xuICAgICNcbiAgICAjIEB0aHJvdyBbUGFyc2VFeGNlcHRpb25dIFdoZW4gbWFsZm9ybWVkIGlubGluZSBZQU1MIHN0cmluZyBpcyBwYXJzZWRcbiAgICAjXG4gICAgQHBhcnNlUXVvdGVkU2NhbGFyOiAoc2NhbGFyLCBjb250ZXh0KSAtPlxuICAgICAgICB7aX0gPSBjb250ZXh0XG5cbiAgICAgICAgdW5sZXNzIG1hdGNoID0gQFBBVFRFUk5fUVVPVEVEX1NDQUxBUi5leGVjIHNjYWxhcltpLi5dXG4gICAgICAgICAgICB0aHJvdyBuZXcgUGFyc2VFeGNlcHRpb24gJ01hbGZvcm1lZCBpbmxpbmUgWUFNTCBzdHJpbmcgKCcrc2NhbGFyW2kuLl0rJykuJ1xuXG4gICAgICAgIG91dHB1dCA9IG1hdGNoWzBdLnN1YnN0cigxLCBtYXRjaFswXS5sZW5ndGggLSAyKVxuXG4gICAgICAgIGlmICdcIicgaXMgc2NhbGFyLmNoYXJBdChpKVxuICAgICAgICAgICAgb3V0cHV0ID0gVW5lc2NhcGVyLnVuZXNjYXBlRG91YmxlUXVvdGVkU3RyaW5nIG91dHB1dFxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBvdXRwdXQgPSBVbmVzY2FwZXIudW5lc2NhcGVTaW5nbGVRdW90ZWRTdHJpbmcgb3V0cHV0XG5cbiAgICAgICAgaSArPSBtYXRjaFswXS5sZW5ndGhcblxuICAgICAgICBjb250ZXh0LmkgPSBpXG4gICAgICAgIHJldHVybiBvdXRwdXRcblxuXG4gICAgIyBQYXJzZXMgYSBzZXF1ZW5jZSB0byBhIFlBTUwgc3RyaW5nLlxuICAgICNcbiAgICAjIEBwYXJhbSBbU3RyaW5nXSAgIHNlcXVlbmNlXG4gICAgIyBAcGFyYW0gW09iamVjdF0gICBjb250ZXh0XG4gICAgI1xuICAgICMgQHJldHVybiBbU3RyaW5nXSAgQSBZQU1MIHN0cmluZ1xuICAgICNcbiAgICAjIEB0aHJvdyBbUGFyc2VFeGNlcHRpb25dIFdoZW4gbWFsZm9ybWVkIGlubGluZSBZQU1MIHN0cmluZyBpcyBwYXJzZWRcbiAgICAjXG4gICAgQHBhcnNlU2VxdWVuY2U6IChzZXF1ZW5jZSwgY29udGV4dCkgLT5cbiAgICAgICAgb3V0cHV0ID0gW11cbiAgICAgICAgbGVuID0gc2VxdWVuY2UubGVuZ3RoXG4gICAgICAgIHtpfSA9IGNvbnRleHRcbiAgICAgICAgaSArPSAxXG5cbiAgICAgICAgIyBbZm9vLCBiYXIsIC4uLl1cbiAgICAgICAgd2hpbGUgaSA8IGxlblxuICAgICAgICAgICAgY29udGV4dC5pID0gaVxuICAgICAgICAgICAgc3dpdGNoIHNlcXVlbmNlLmNoYXJBdChpKVxuICAgICAgICAgICAgICAgIHdoZW4gJ1snXG4gICAgICAgICAgICAgICAgICAgICMgTmVzdGVkIHNlcXVlbmNlXG4gICAgICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoIEBwYXJzZVNlcXVlbmNlIHNlcXVlbmNlLCBjb250ZXh0XG4gICAgICAgICAgICAgICAgICAgIHtpfSA9IGNvbnRleHRcbiAgICAgICAgICAgICAgICB3aGVuICd7J1xuICAgICAgICAgICAgICAgICAgICAjIE5lc3RlZCBtYXBwaW5nXG4gICAgICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoIEBwYXJzZU1hcHBpbmcgc2VxdWVuY2UsIGNvbnRleHRcbiAgICAgICAgICAgICAgICAgICAge2l9ID0gY29udGV4dFxuICAgICAgICAgICAgICAgIHdoZW4gJ10nXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvdXRwdXRcbiAgICAgICAgICAgICAgICB3aGVuICcsJywgJyAnLCBcIlxcblwiXG4gICAgICAgICAgICAgICAgICAgICMgRG8gbm90aGluZ1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgaXNRdW90ZWQgPSAoc2VxdWVuY2UuY2hhckF0KGkpIGluIFsnXCInLCBcIidcIl0pXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gQHBhcnNlU2NhbGFyIHNlcXVlbmNlLCBbJywnLCAnXSddLCBbJ1wiJywgXCInXCJdLCBjb250ZXh0XG4gICAgICAgICAgICAgICAgICAgIHtpfSA9IGNvbnRleHRcblxuICAgICAgICAgICAgICAgICAgICBpZiBub3QoaXNRdW90ZWQpIGFuZCB0eXBlb2YodmFsdWUpIGlzICdzdHJpbmcnIGFuZCAodmFsdWUuaW5kZXhPZignOiAnKSBpc250IC0xIG9yIHZhbHVlLmluZGV4T2YoXCI6XFxuXCIpIGlzbnQgLTEpXG4gICAgICAgICAgICAgICAgICAgICAgICAjIEVtYmVkZGVkIG1hcHBpbmc/XG4gICAgICAgICAgICAgICAgICAgICAgICB0cnlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IEBwYXJzZU1hcHBpbmcgJ3snK3ZhbHVlKyd9J1xuICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2ggZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICMgTm8sIGl0J3Mgbm90XG5cblxuICAgICAgICAgICAgICAgICAgICBvdXRwdXQucHVzaCB2YWx1ZVxuXG4gICAgICAgICAgICAgICAgICAgIC0taVxuXG4gICAgICAgICAgICArK2lcblxuICAgICAgICB0aHJvdyBuZXcgUGFyc2VFeGNlcHRpb24gJ01hbGZvcm1lZCBpbmxpbmUgWUFNTCBzdHJpbmcgJytzZXF1ZW5jZVxuXG5cbiAgICAjIFBhcnNlcyBhIG1hcHBpbmcgdG8gYSBZQU1MIHN0cmluZy5cbiAgICAjXG4gICAgIyBAcGFyYW0gW1N0cmluZ10gICBtYXBwaW5nXG4gICAgIyBAcGFyYW0gW09iamVjdF0gICBjb250ZXh0XG4gICAgI1xuICAgICMgQHJldHVybiBbU3RyaW5nXSAgQSBZQU1MIHN0cmluZ1xuICAgICNcbiAgICAjIEB0aHJvdyBbUGFyc2VFeGNlcHRpb25dIFdoZW4gbWFsZm9ybWVkIGlubGluZSBZQU1MIHN0cmluZyBpcyBwYXJzZWRcbiAgICAjXG4gICAgQHBhcnNlTWFwcGluZzogKG1hcHBpbmcsIGNvbnRleHQpIC0+XG4gICAgICAgIG91dHB1dCA9IHt9XG4gICAgICAgIGxlbiA9IG1hcHBpbmcubGVuZ3RoXG4gICAgICAgIHtpfSA9IGNvbnRleHRcbiAgICAgICAgaSArPSAxXG5cbiAgICAgICAgIyB7Zm9vOiBiYXIsIGJhcjpmb28sIC4uLn1cbiAgICAgICAgc2hvdWxkQ29udGludWVXaGlsZUxvb3AgPSBmYWxzZVxuICAgICAgICB3aGlsZSBpIDwgbGVuXG4gICAgICAgICAgICBjb250ZXh0LmkgPSBpXG4gICAgICAgICAgICBzd2l0Y2ggbWFwcGluZy5jaGFyQXQoaSlcbiAgICAgICAgICAgICAgICB3aGVuICcgJywgJywnLCBcIlxcblwiXG4gICAgICAgICAgICAgICAgICAgICsraVxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmkgPSBpXG4gICAgICAgICAgICAgICAgICAgIHNob3VsZENvbnRpbnVlV2hpbGVMb29wID0gdHJ1ZVxuICAgICAgICAgICAgICAgIHdoZW4gJ30nXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvdXRwdXRcblxuICAgICAgICAgICAgaWYgc2hvdWxkQ29udGludWVXaGlsZUxvb3BcbiAgICAgICAgICAgICAgICBzaG91bGRDb250aW51ZVdoaWxlTG9vcCA9IGZhbHNlXG4gICAgICAgICAgICAgICAgY29udGludWVcblxuICAgICAgICAgICAgIyBLZXlcbiAgICAgICAgICAgIGtleSA9IEBwYXJzZVNjYWxhciBtYXBwaW5nLCBbJzonLCAnICcsIFwiXFxuXCJdLCBbJ1wiJywgXCInXCJdLCBjb250ZXh0LCBmYWxzZVxuICAgICAgICAgICAge2l9ID0gY29udGV4dFxuXG4gICAgICAgICAgICAjIFZhbHVlXG4gICAgICAgICAgICBkb25lID0gZmFsc2VcblxuICAgICAgICAgICAgd2hpbGUgaSA8IGxlblxuICAgICAgICAgICAgICAgIGNvbnRleHQuaSA9IGlcbiAgICAgICAgICAgICAgICBzd2l0Y2ggbWFwcGluZy5jaGFyQXQoaSlcbiAgICAgICAgICAgICAgICAgICAgd2hlbiAnWydcbiAgICAgICAgICAgICAgICAgICAgICAgICMgTmVzdGVkIHNlcXVlbmNlXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IEBwYXJzZVNlcXVlbmNlIG1hcHBpbmcsIGNvbnRleHRcbiAgICAgICAgICAgICAgICAgICAgICAgIHtpfSA9IGNvbnRleHRcbiAgICAgICAgICAgICAgICAgICAgICAgICMgU3BlYzogS2V5cyBNVVNUIGJlIHVuaXF1ZTsgZmlyc3Qgb25lIHdpbnMuXG4gICAgICAgICAgICAgICAgICAgICAgICAjIFBhcnNlciBjYW5ub3QgYWJvcnQgdGhpcyBtYXBwaW5nIGVhcmxpZXIsIHNpbmNlIGxpbmVzXG4gICAgICAgICAgICAgICAgICAgICAgICAjIGFyZSBwcm9jZXNzZWQgc2VxdWVudGlhbGx5LlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgb3V0cHV0W2tleV0gPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0W2tleV0gPSB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgZG9uZSA9IHRydWVcbiAgICAgICAgICAgICAgICAgICAgd2hlbiAneydcbiAgICAgICAgICAgICAgICAgICAgICAgICMgTmVzdGVkIG1hcHBpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgICR2YWx1ZSA9IEBwYXJzZU1hcHBpbmcgbWFwcGluZywgY29udGV4dFxuICAgICAgICAgICAgICAgICAgICAgICAge2l9ID0gY29udGV4dFxuICAgICAgICAgICAgICAgICAgICAgICAgIyBTcGVjOiBLZXlzIE1VU1QgYmUgdW5pcXVlOyBmaXJzdCBvbmUgd2lucy5cbiAgICAgICAgICAgICAgICAgICAgICAgICMgUGFyc2VyIGNhbm5vdCBhYm9ydCB0aGlzIG1hcHBpbmcgZWFybGllciwgc2luY2UgbGluZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICMgYXJlIHByb2Nlc3NlZCBzZXF1ZW50aWFsbHkuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiBvdXRwdXRba2V5XSA9PSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXRba2V5XSA9IHZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICBkb25lID0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB3aGVuICc6JywgJyAnLCBcIlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAjIERvIG5vdGhpbmdcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBAcGFyc2VTY2FsYXIgbWFwcGluZywgWycsJywgJ30nXSwgWydcIicsIFwiJ1wiXSwgY29udGV4dFxuICAgICAgICAgICAgICAgICAgICAgICAge2l9ID0gY29udGV4dFxuICAgICAgICAgICAgICAgICAgICAgICAgIyBTcGVjOiBLZXlzIE1VU1QgYmUgdW5pcXVlOyBmaXJzdCBvbmUgd2lucy5cbiAgICAgICAgICAgICAgICAgICAgICAgICMgUGFyc2VyIGNhbm5vdCBhYm9ydCB0aGlzIG1hcHBpbmcgZWFybGllciwgc2luY2UgbGluZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICMgYXJlIHByb2Nlc3NlZCBzZXF1ZW50aWFsbHkuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiBvdXRwdXRba2V5XSA9PSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXRba2V5XSA9IHZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICBkb25lID0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgLS1pXG5cbiAgICAgICAgICAgICAgICArK2lcblxuICAgICAgICAgICAgICAgIGlmIGRvbmVcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcblxuICAgICAgICB0aHJvdyBuZXcgUGFyc2VFeGNlcHRpb24gJ01hbGZvcm1lZCBpbmxpbmUgWUFNTCBzdHJpbmcgJyttYXBwaW5nXG5cblxuICAgICMgRXZhbHVhdGVzIHNjYWxhcnMgYW5kIHJlcGxhY2VzIG1hZ2ljIHZhbHVlcy5cbiAgICAjXG4gICAgIyBAcGFyYW0gW1N0cmluZ10gICBzY2FsYXJcbiAgICAjXG4gICAgIyBAcmV0dXJuIFtTdHJpbmddICBBIFlBTUwgc3RyaW5nXG4gICAgI1xuICAgIEBldmFsdWF0ZVNjYWxhcjogKHNjYWxhciwgY29udGV4dCkgLT5cbiAgICAgICAgc2NhbGFyID0gVXRpbHMudHJpbShzY2FsYXIpXG4gICAgICAgIHNjYWxhckxvd2VyID0gc2NhbGFyLnRvTG93ZXJDYXNlKClcblxuICAgICAgICBzd2l0Y2ggc2NhbGFyTG93ZXJcbiAgICAgICAgICAgIHdoZW4gJ251bGwnLCAnJywgJ34nXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgICAgIHdoZW4gJ3RydWUnXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgIHdoZW4gJ2ZhbHNlJ1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgd2hlbiAnLmluZidcbiAgICAgICAgICAgICAgICByZXR1cm4gSW5maW5pdHlcbiAgICAgICAgICAgIHdoZW4gJy5uYW4nXG4gICAgICAgICAgICAgICAgcmV0dXJuIE5hTlxuICAgICAgICAgICAgd2hlbiAnLS5pbmYnXG4gICAgICAgICAgICAgICAgcmV0dXJuIEluZmluaXR5XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgZmlyc3RDaGFyID0gc2NhbGFyTG93ZXIuY2hhckF0KDApXG4gICAgICAgICAgICAgICAgc3dpdGNoIGZpcnN0Q2hhclxuICAgICAgICAgICAgICAgICAgICB3aGVuICchJ1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3RTcGFjZSA9IHNjYWxhci5pbmRleE9mKCcgJylcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIGZpcnN0U3BhY2UgaXMgLTFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJzdFdvcmQgPSBzY2FsYXJMb3dlclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0V29yZCA9IHNjYWxhckxvd2VyWzAuLi5maXJzdFNwYWNlXVxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIGZpcnN0V29yZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoZW4gJyEnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIGZpcnN0U3BhY2UgaXNudCAtMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50IEBwYXJzZVNjYWxhcihzY2FsYXJbMi4uXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGVuICchc3RyJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gVXRpbHMubHRyaW0gc2NhbGFyWzQuLl1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGVuICchIXN0cidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFV0aWxzLmx0cmltIHNjYWxhcls1Li5dXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hlbiAnISFpbnQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZUludChAcGFyc2VTY2FsYXIoc2NhbGFyWzUuLl0pKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoZW4gJyEhYm9vbCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFV0aWxzLnBhcnNlQm9vbGVhbihAcGFyc2VTY2FsYXIoc2NhbGFyWzYuLl0pLCBmYWxzZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGVuICchIWZsb2F0J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VGbG9hdChAcGFyc2VTY2FsYXIoc2NhbGFyWzcuLl0pKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoZW4gJyEhdGltZXN0YW1wJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gVXRpbHMuc3RyaW5nVG9EYXRlKFV0aWxzLmx0cmltKHNjYWxhclsxMS4uXSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bmxlc3MgY29udGV4dD9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQgPSBleGNlcHRpb25PbkludmFsaWRUeXBlOiBAc2V0dGluZ3MuZXhjZXB0aW9uT25JbnZhbGlkVHlwZSwgb2JqZWN0RGVjb2RlcjogQHNldHRpbmdzLm9iamVjdERlY29kZXIsIGk6IDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge29iamVjdERlY29kZXIsIGV4Y2VwdGlvbk9uSW52YWxpZFR5cGV9ID0gY29udGV4dFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIG9iamVjdERlY29kZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICMgSWYgb2JqZWN0RGVjb2RlciBmdW5jdGlvbiBpcyBnaXZlbiwgd2UgY2FuIGRvIGN1c3RvbSBkZWNvZGluZyBvZiBjdXN0b20gdHlwZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyaW1tZWRTY2FsYXIgPSBVdGlscy5ydHJpbSBzY2FsYXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0U3BhY2UgPSB0cmltbWVkU2NhbGFyLmluZGV4T2YoJyAnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgZmlyc3RTcGFjZSBpcyAtMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvYmplY3REZWNvZGVyIHRyaW1tZWRTY2FsYXIsIG51bGxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJWYWx1ZSA9IFV0aWxzLmx0cmltIHRyaW1tZWRTY2FsYXJbZmlyc3RTcGFjZSsxLi5dXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5sZXNzIHN1YlZhbHVlLmxlbmd0aCA+IDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViVmFsdWUgPSBudWxsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9iamVjdERlY29kZXIgdHJpbW1lZFNjYWxhclswLi4uZmlyc3RTcGFjZV0sIHN1YlZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIGV4Y2VwdGlvbk9uSW52YWxpZFR5cGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBQYXJzZUV4Y2VwdGlvbiAnQ3VzdG9tIG9iamVjdCBzdXBwb3J0IHdoZW4gcGFyc2luZyBhIFlBTUwgZmlsZSBoYXMgYmVlbiBkaXNhYmxlZC4nXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgICAgICAgICAgICAgd2hlbiAnMCdcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICcweCcgaXMgc2NhbGFyWzAuLi4yXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBVdGlscy5oZXhEZWMgc2NhbGFyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIFV0aWxzLmlzRGlnaXRzIHNjYWxhclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBVdGlscy5vY3REZWMgc2NhbGFyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIFV0aWxzLmlzTnVtZXJpYyBzY2FsYXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VGbG9hdCBzY2FsYXJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2NhbGFyXG4gICAgICAgICAgICAgICAgICAgIHdoZW4gJysnXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiBVdGlscy5pc0RpZ2l0cyBzY2FsYXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByYXcgPSBzY2FsYXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXN0ID0gcGFyc2VJbnQocmF3KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIHJhdyBpcyBTdHJpbmcoY2FzdClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhc3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByYXdcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgVXRpbHMuaXNOdW1lcmljIHNjYWxhclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZUZsb2F0IHNjYWxhclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiBAUEFUVEVSTl9USE9VU0FORF9OVU1FUklDX1NDQUxBUi50ZXN0IHNjYWxhclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZUZsb2F0KHNjYWxhci5yZXBsYWNlKCcsJywgJycpKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNjYWxhclxuICAgICAgICAgICAgICAgICAgICB3aGVuICctJ1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgVXRpbHMuaXNEaWdpdHMoc2NhbGFyWzEuLl0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgJzAnIGlzIHNjYWxhci5jaGFyQXQoMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC1VdGlscy5vY3REZWMoc2NhbGFyWzEuLl0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYXcgPSBzY2FsYXJbMS4uXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXN0ID0gcGFyc2VJbnQocmF3KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiByYXcgaXMgU3RyaW5nKGNhc3QpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gLWNhc3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC1yYXdcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgVXRpbHMuaXNOdW1lcmljIHNjYWxhclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZUZsb2F0IHNjYWxhclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiBAUEFUVEVSTl9USE9VU0FORF9OVU1FUklDX1NDQUxBUi50ZXN0IHNjYWxhclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZUZsb2F0KHNjYWxhci5yZXBsYWNlKCcsJywgJycpKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNjYWxhclxuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiBkYXRlID0gVXRpbHMuc3RyaW5nVG9EYXRlKHNjYWxhcilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiBVdGlscy5pc051bWVyaWMoc2NhbGFyKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZUZsb2F0IHNjYWxhclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiBAUEFUVEVSTl9USE9VU0FORF9OVU1FUklDX1NDQUxBUi50ZXN0IHNjYWxhclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZUZsb2F0KHNjYWxhci5yZXBsYWNlKCcsJywgJycpKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNjYWxhclxuXG5tb2R1bGUuZXhwb3J0cyA9IElubGluZVxuIiwiXG5JbmxpbmUgICAgICAgICAgPSByZXF1aXJlICcuL0lubGluZSdcblBhdHRlcm4gICAgICAgICA9IHJlcXVpcmUgJy4vUGF0dGVybidcblV0aWxzICAgICAgICAgICA9IHJlcXVpcmUgJy4vVXRpbHMnXG5QYXJzZUV4Y2VwdGlvbiAgPSByZXF1aXJlICcuL0V4Y2VwdGlvbi9QYXJzZUV4Y2VwdGlvbidcblxuIyBQYXJzZXIgcGFyc2VzIFlBTUwgc3RyaW5ncyB0byBjb252ZXJ0IHRoZW0gdG8gSmF2YVNjcmlwdCBvYmplY3RzLlxuI1xuY2xhc3MgUGFyc2VyXG5cbiAgICAjIFByZS1jb21waWxlZCBwYXR0ZXJuc1xuICAgICNcbiAgICBQQVRURVJOX0ZPTERFRF9TQ0FMQVJfQUxMOiAgICAgICAgICAgICAgbmV3IFBhdHRlcm4gJ14oPzooPzx0eXBlPiFbXlxcXFx8Pl0qKVxcXFxzKyk/KD88c2VwYXJhdG9yPlxcXFx8fD4pKD88bW9kaWZpZXJzPlxcXFwrfFxcXFwtfFxcXFxkK3xcXFxcK1xcXFxkK3xcXFxcLVxcXFxkK3xcXFxcZCtcXFxcK3xcXFxcZCtcXFxcLSk/KD88Y29tbWVudHM+ICsjLiopPyQnXG4gICAgUEFUVEVSTl9GT0xERURfU0NBTEFSX0VORDogICAgICAgICAgICAgIG5ldyBQYXR0ZXJuICcoPzxzZXBhcmF0b3I+XFxcXHx8PikoPzxtb2RpZmllcnM+XFxcXCt8XFxcXC18XFxcXGQrfFxcXFwrXFxcXGQrfFxcXFwtXFxcXGQrfFxcXFxkK1xcXFwrfFxcXFxkK1xcXFwtKT8oPzxjb21tZW50cz4gKyMuKik/JCdcbiAgICBQQVRURVJOX1NFUVVFTkNFX0lURU06ICAgICAgICAgICAgICAgICAgbmV3IFBhdHRlcm4gJ15cXFxcLSgoPzxsZWFkc3BhY2VzPlxcXFxzKykoPzx2YWx1ZT4uKz8pKT9cXFxccyokJ1xuICAgIFBBVFRFUk5fQU5DSE9SX1ZBTFVFOiAgICAgICAgICAgICAgICAgICBuZXcgUGF0dGVybiAnXiYoPzxyZWY+W14gXSspICooPzx2YWx1ZT4uKiknXG4gICAgUEFUVEVSTl9DT01QQUNUX05PVEFUSU9OOiAgICAgICAgICAgICAgIG5ldyBQYXR0ZXJuICdeKD88a2V5PicrSW5saW5lLlJFR0VYX1FVT1RFRF9TVFJJTkcrJ3xbXiBcXCdcIlxcXFx7XFxcXFtdLio/KSAqXFxcXDooXFxcXHMrKD88dmFsdWU+Lis/KSk/XFxcXHMqJCdcbiAgICBQQVRURVJOX01BUFBJTkdfSVRFTTogICAgICAgICAgICAgICAgICAgbmV3IFBhdHRlcm4gJ14oPzxrZXk+JytJbmxpbmUuUkVHRVhfUVVPVEVEX1NUUklORysnfFteIFxcJ1wiXFxcXFtcXFxce10uKj8pICpcXFxcOihcXFxccysoPzx2YWx1ZT4uKz8pKT9cXFxccyokJ1xuICAgIFBBVFRFUk5fREVDSU1BTDogICAgICAgICAgICAgICAgICAgICAgICBuZXcgUGF0dGVybiAnXFxcXGQrJ1xuICAgIFBBVFRFUk5fSU5ERU5UX1NQQUNFUzogICAgICAgICAgICAgICAgICBuZXcgUGF0dGVybiAnXiArJ1xuICAgIFBBVFRFUk5fVFJBSUxJTkdfTElORVM6ICAgICAgICAgICAgICAgICBuZXcgUGF0dGVybiAnKFxcbiopJCdcbiAgICBQQVRURVJOX1lBTUxfSEVBREVSOiAgICAgICAgICAgICAgICAgICAgbmV3IFBhdHRlcm4gJ15cXFxcJVlBTUxbOiBdW1xcXFxkXFxcXC5dKy4qXFxuJ1xuICAgIFBBVFRFUk5fTEVBRElOR19DT01NRU5UUzogICAgICAgICAgICAgICBuZXcgUGF0dGVybiAnXihcXFxcIy4qP1xcbikrJ1xuICAgIFBBVFRFUk5fRE9DVU1FTlRfTUFSS0VSX1NUQVJUOiAgICAgICAgICBuZXcgUGF0dGVybiAnXlxcXFwtXFxcXC1cXFxcLS4qP1xcbidcbiAgICBQQVRURVJOX0RPQ1VNRU5UX01BUktFUl9FTkQ6ICAgICAgICAgICAgbmV3IFBhdHRlcm4gJ15cXFxcLlxcXFwuXFxcXC5cXFxccyokJ1xuICAgIFBBVFRFUk5fRk9MREVEX1NDQUxBUl9CWV9JTkRFTlRBVElPTjogICB7fVxuXG4gICAgIyBDb250ZXh0IHR5cGVzXG4gICAgI1xuICAgIENPTlRFWFRfTk9ORTogICAgICAgMFxuICAgIENPTlRFWFRfU0VRVUVOQ0U6ICAgMVxuICAgIENPTlRFWFRfTUFQUElORzogICAgMlxuXG5cbiAgICAjIENvbnN0cnVjdG9yXG4gICAgI1xuICAgICMgQHBhcmFtIFtJbnRlZ2VyXSAgb2Zmc2V0ICBUaGUgb2Zmc2V0IG9mIFlBTUwgZG9jdW1lbnQgKHVzZWQgZm9yIGxpbmUgbnVtYmVycyBpbiBlcnJvciBtZXNzYWdlcylcbiAgICAjXG4gICAgY29uc3RydWN0b3I6IChAb2Zmc2V0ID0gMCkgLT5cbiAgICAgICAgQGxpbmVzICAgICAgICAgID0gW11cbiAgICAgICAgQGN1cnJlbnRMaW5lTmIgID0gLTFcbiAgICAgICAgQGN1cnJlbnRMaW5lICAgID0gJydcbiAgICAgICAgQHJlZnMgICAgICAgICAgID0ge31cblxuXG4gICAgIyBQYXJzZXMgYSBZQU1MIHN0cmluZyB0byBhIEphdmFTY3JpcHQgdmFsdWUuXG4gICAgI1xuICAgICMgQHBhcmFtIFtTdHJpbmddICAgdmFsdWUgICAgICAgICAgICAgICAgICAgQSBZQU1MIHN0cmluZ1xuICAgICMgQHBhcmFtIFtCb29sZWFuXSAgZXhjZXB0aW9uT25JbnZhbGlkVHlwZSAgdHJ1ZSBpZiBhbiBleGNlcHRpb24gbXVzdCBiZSB0aHJvd24gb24gaW52YWxpZCB0eXBlcyAoYSBKYXZhU2NyaXB0IHJlc291cmNlIG9yIG9iamVjdCksIGZhbHNlIG90aGVyd2lzZVxuICAgICMgQHBhcmFtIFtGdW5jdGlvbl0gb2JqZWN0RGVjb2RlciAgICAgICAgICAgQSBmdW5jdGlvbiB0byBkZXNlcmlhbGl6ZSBjdXN0b20gb2JqZWN0cywgbnVsbCBvdGhlcndpc2VcbiAgICAjXG4gICAgIyBAcmV0dXJuIFtPYmplY3RdICBBIEphdmFTY3JpcHQgdmFsdWVcbiAgICAjXG4gICAgIyBAdGhyb3cgW1BhcnNlRXhjZXB0aW9uXSBJZiB0aGUgWUFNTCBpcyBub3QgdmFsaWRcbiAgICAjXG4gICAgcGFyc2U6ICh2YWx1ZSwgZXhjZXB0aW9uT25JbnZhbGlkVHlwZSA9IGZhbHNlLCBvYmplY3REZWNvZGVyID0gbnVsbCkgLT5cbiAgICAgICAgQGN1cnJlbnRMaW5lTmIgPSAtMVxuICAgICAgICBAY3VycmVudExpbmUgPSAnJ1xuICAgICAgICBAbGluZXMgPSBAY2xlYW51cCh2YWx1ZSkuc3BsaXQgXCJcXG5cIlxuXG4gICAgICAgIGRhdGEgPSBudWxsXG4gICAgICAgIGNvbnRleHQgPSBAQ09OVEVYVF9OT05FXG4gICAgICAgIGFsbG93T3ZlcndyaXRlID0gZmFsc2VcbiAgICAgICAgd2hpbGUgQG1vdmVUb05leHRMaW5lKClcbiAgICAgICAgICAgIGlmIEBpc0N1cnJlbnRMaW5lRW1wdHkoKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlXG5cbiAgICAgICAgICAgICMgVGFiP1xuICAgICAgICAgICAgaWYgXCJcXHRcIiBpcyBAY3VycmVudExpbmVbMF1cbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUGFyc2VFeGNlcHRpb24gJ0EgWUFNTCBmaWxlIGNhbm5vdCBjb250YWluIHRhYnMgYXMgaW5kZW50YXRpb24uJywgQGdldFJlYWxDdXJyZW50TGluZU5iKCkgKyAxLCBAY3VycmVudExpbmVcblxuICAgICAgICAgICAgaXNSZWYgPSBtZXJnZU5vZGUgPSBmYWxzZVxuICAgICAgICAgICAgaWYgdmFsdWVzID0gQFBBVFRFUk5fU0VRVUVOQ0VfSVRFTS5leGVjIEBjdXJyZW50TGluZVxuICAgICAgICAgICAgICAgIGlmIEBDT05URVhUX01BUFBJTkcgaXMgY29udGV4dFxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUGFyc2VFeGNlcHRpb24gJ1lvdSBjYW5ub3QgZGVmaW5lIGEgc2VxdWVuY2UgaXRlbSB3aGVuIGluIGEgbWFwcGluZydcbiAgICAgICAgICAgICAgICBjb250ZXh0ID0gQENPTlRFWFRfU0VRVUVOQ0VcbiAgICAgICAgICAgICAgICBkYXRhID89IFtdXG5cbiAgICAgICAgICAgICAgICBpZiB2YWx1ZXMudmFsdWU/IGFuZCBtYXRjaGVzID0gQFBBVFRFUk5fQU5DSE9SX1ZBTFVFLmV4ZWMgdmFsdWVzLnZhbHVlXG4gICAgICAgICAgICAgICAgICAgIGlzUmVmID0gbWF0Y2hlcy5yZWZcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzLnZhbHVlID0gbWF0Y2hlcy52YWx1ZVxuXG4gICAgICAgICAgICAgICAgIyBBcnJheVxuICAgICAgICAgICAgICAgIGlmIG5vdCh2YWx1ZXMudmFsdWU/KSBvciAnJyBpcyBVdGlscy50cmltKHZhbHVlcy52YWx1ZSwgJyAnKSBvciBVdGlscy5sdHJpbSh2YWx1ZXMudmFsdWUsICcgJykuaW5kZXhPZignIycpIGlzIDBcbiAgICAgICAgICAgICAgICAgICAgaWYgQGN1cnJlbnRMaW5lTmIgPCBAbGluZXMubGVuZ3RoIC0gMSBhbmQgbm90IEBpc05leHRMaW5lVW5JbmRlbnRlZENvbGxlY3Rpb24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgYyA9IEBnZXRSZWFsQ3VycmVudExpbmVOYigpICsgMVxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VyID0gbmV3IFBhcnNlciBjXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJzZXIucmVmcyA9IEByZWZzXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLnB1c2ggcGFyc2VyLnBhcnNlKEBnZXROZXh0RW1iZWRCbG9jayhudWxsLCB0cnVlKSwgZXhjZXB0aW9uT25JbnZhbGlkVHlwZSwgb2JqZWN0RGVjb2RlcilcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5wdXNoIG51bGxcblxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgaWYgdmFsdWVzLmxlYWRzcGFjZXM/Lmxlbmd0aCBhbmQgbWF0Y2hlcyA9IEBQQVRURVJOX0NPTVBBQ1RfTk9UQVRJT04uZXhlYyB2YWx1ZXMudmFsdWVcblxuICAgICAgICAgICAgICAgICAgICAgICAgIyBUaGlzIGlzIGEgY29tcGFjdCBub3RhdGlvbiBlbGVtZW50LCBhZGQgdG8gbmV4dCBibG9jayBhbmQgcGFyc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIGMgPSBAZ2V0UmVhbEN1cnJlbnRMaW5lTmIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VyID0gbmV3IFBhcnNlciBjXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJzZXIucmVmcyA9IEByZWZzXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGJsb2NrID0gdmFsdWVzLnZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRlbnQgPSBAZ2V0Q3VycmVudExpbmVJbmRlbnRhdGlvbigpXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiBAaXNOZXh0TGluZUluZGVudGVkKGZhbHNlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJsb2NrICs9IFwiXFxuXCIrQGdldE5leHRFbWJlZEJsb2NrKGluZGVudCArIHZhbHVlcy5sZWFkc3BhY2VzLmxlbmd0aCArIDEsIHRydWUpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEucHVzaCBwYXJzZXIucGFyc2UgYmxvY2ssIGV4Y2VwdGlvbk9uSW52YWxpZFR5cGUsIG9iamVjdERlY29kZXJcblxuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLnB1c2ggQHBhcnNlVmFsdWUgdmFsdWVzLnZhbHVlLCBleGNlcHRpb25PbkludmFsaWRUeXBlLCBvYmplY3REZWNvZGVyXG5cbiAgICAgICAgICAgIGVsc2UgaWYgKHZhbHVlcyA9IEBQQVRURVJOX01BUFBJTkdfSVRFTS5leGVjIEBjdXJyZW50TGluZSkgYW5kIHZhbHVlcy5rZXkuaW5kZXhPZignICMnKSBpcyAtMVxuICAgICAgICAgICAgICAgIGlmIEBDT05URVhUX1NFUVVFTkNFIGlzIGNvbnRleHRcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFBhcnNlRXhjZXB0aW9uICdZb3UgY2Fubm90IGRlZmluZSBhIG1hcHBpbmcgaXRlbSB3aGVuIGluIGEgc2VxdWVuY2UnXG4gICAgICAgICAgICAgICAgY29udGV4dCA9IEBDT05URVhUX01BUFBJTkdcbiAgICAgICAgICAgICAgICBkYXRhID89IHt9XG5cbiAgICAgICAgICAgICAgICAjIEZvcmNlIGNvcnJlY3Qgc2V0dGluZ3NcbiAgICAgICAgICAgICAgICBJbmxpbmUuY29uZmlndXJlIGV4Y2VwdGlvbk9uSW52YWxpZFR5cGUsIG9iamVjdERlY29kZXJcbiAgICAgICAgICAgICAgICB0cnlcbiAgICAgICAgICAgICAgICAgICAga2V5ID0gSW5saW5lLnBhcnNlU2NhbGFyIHZhbHVlcy5rZXlcbiAgICAgICAgICAgICAgICBjYXRjaCBlXG4gICAgICAgICAgICAgICAgICAgIGUucGFyc2VkTGluZSA9IEBnZXRSZWFsQ3VycmVudExpbmVOYigpICsgMVxuICAgICAgICAgICAgICAgICAgICBlLnNuaXBwZXQgPSBAY3VycmVudExpbmVcblxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlXG5cbiAgICAgICAgICAgICAgICBpZiAnPDwnIGlzIGtleVxuICAgICAgICAgICAgICAgICAgICBtZXJnZU5vZGUgPSB0cnVlXG4gICAgICAgICAgICAgICAgICAgIGFsbG93T3ZlcndyaXRlID0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICBpZiB2YWx1ZXMudmFsdWU/LmluZGV4T2YoJyonKSBpcyAwXG4gICAgICAgICAgICAgICAgICAgICAgICByZWZOYW1lID0gdmFsdWVzLnZhbHVlWzEuLl1cbiAgICAgICAgICAgICAgICAgICAgICAgIHVubGVzcyBAcmVmc1tyZWZOYW1lXT9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUGFyc2VFeGNlcHRpb24gJ1JlZmVyZW5jZSBcIicrcmVmTmFtZSsnXCIgZG9lcyBub3QgZXhpc3QuJywgQGdldFJlYWxDdXJyZW50TGluZU5iKCkgKyAxLCBAY3VycmVudExpbmVcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmVmFsdWUgPSBAcmVmc1tyZWZOYW1lXVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiB0eXBlb2YgcmVmVmFsdWUgaXNudCAnb2JqZWN0J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBQYXJzZUV4Y2VwdGlvbiAnWUFNTCBtZXJnZSBrZXlzIHVzZWQgd2l0aCBhIHNjYWxhciB2YWx1ZSBpbnN0ZWFkIG9mIGFuIG9iamVjdC4nLCBAZ2V0UmVhbEN1cnJlbnRMaW5lTmIoKSArIDEsIEBjdXJyZW50TGluZVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiByZWZWYWx1ZSBpbnN0YW5jZW9mIEFycmF5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBNZXJnZSBhcnJheSB3aXRoIG9iamVjdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciB2YWx1ZSwgaSBpbiByZWZWYWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhW1N0cmluZyhpKV0gPz0gdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAjIE1lcmdlIG9iamVjdHNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3Iga2V5LCB2YWx1ZSBvZiByZWZWYWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhW2tleV0gPz0gdmFsdWVcblxuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiB2YWx1ZXMudmFsdWU/IGFuZCB2YWx1ZXMudmFsdWUgaXNudCAnJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWVzLnZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBAZ2V0TmV4dEVtYmVkQmxvY2soKVxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBjID0gQGdldFJlYWxDdXJyZW50TGluZU5iKCkgKyAxXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJzZXIgPSBuZXcgUGFyc2VyIGNcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlci5yZWZzID0gQHJlZnNcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlZCA9IHBhcnNlci5wYXJzZSB2YWx1ZSwgZXhjZXB0aW9uT25JbnZhbGlkVHlwZVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB1bmxlc3MgdHlwZW9mIHBhcnNlZCBpcyAnb2JqZWN0J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBQYXJzZUV4Y2VwdGlvbiAnWUFNTCBtZXJnZSBrZXlzIHVzZWQgd2l0aCBhIHNjYWxhciB2YWx1ZSBpbnN0ZWFkIG9mIGFuIG9iamVjdC4nLCBAZ2V0UmVhbEN1cnJlbnRMaW5lTmIoKSArIDEsIEBjdXJyZW50TGluZVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiBwYXJzZWQgaW5zdGFuY2VvZiBBcnJheVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICMgSWYgdGhlIHZhbHVlIGFzc29jaWF0ZWQgd2l0aCB0aGUgbWVyZ2Uga2V5IGlzIGEgc2VxdWVuY2UsIHRoZW4gdGhpcyBzZXF1ZW5jZSBpcyBleHBlY3RlZCB0byBjb250YWluIG1hcHBpbmcgbm9kZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAjIGFuZCBlYWNoIG9mIHRoZXNlIG5vZGVzIGlzIG1lcmdlZCBpbiB0dXJuIGFjY29yZGluZyB0byBpdHMgb3JkZXIgaW4gdGhlIHNlcXVlbmNlLiBLZXlzIGluIG1hcHBpbmcgbm9kZXMgZWFybGllclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICMgaW4gdGhlIHNlcXVlbmNlIG92ZXJyaWRlIGtleXMgc3BlY2lmaWVkIGluIGxhdGVyIG1hcHBpbmcgbm9kZXMuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIHBhcnNlZEl0ZW0gaW4gcGFyc2VkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVubGVzcyB0eXBlb2YgcGFyc2VkSXRlbSBpcyAnb2JqZWN0J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFBhcnNlRXhjZXB0aW9uICdNZXJnZSBpdGVtcyBtdXN0IGJlIG9iamVjdHMuJywgQGdldFJlYWxDdXJyZW50TGluZU5iKCkgKyAxLCBwYXJzZWRJdGVtXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgcGFyc2VkSXRlbSBpbnN0YW5jZW9mIEFycmF5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAjIE1lcmdlIGFycmF5IHdpdGggb2JqZWN0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgdmFsdWUsIGkgaW4gcGFyc2VkSXRlbVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGsgPSBTdHJpbmcoaSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bmxlc3MgZGF0YS5oYXNPd25Qcm9wZXJ0eShrKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhW2tdID0gdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBNZXJnZSBvYmplY3RzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3Iga2V5LCB2YWx1ZSBvZiBwYXJzZWRJdGVtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5sZXNzIGRhdGEuaGFzT3duUHJvcGVydHkoa2V5KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhW2tleV0gPSB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICMgSWYgdGhlIHZhbHVlIGFzc29jaWF0ZWQgd2l0aCB0aGUga2V5IGlzIGEgc2luZ2xlIG1hcHBpbmcgbm9kZSwgZWFjaCBvZiBpdHMga2V5L3ZhbHVlIHBhaXJzIGlzIGluc2VydGVkIGludG8gdGhlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBjdXJyZW50IG1hcHBpbmcsIHVubGVzcyB0aGUga2V5IGFscmVhZHkgZXhpc3RzIGluIGl0LlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciBrZXksIHZhbHVlIG9mIHBhcnNlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bmxlc3MgZGF0YS5oYXNPd25Qcm9wZXJ0eShrZXkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhW2tleV0gPSB2YWx1ZVxuXG4gICAgICAgICAgICAgICAgZWxzZSBpZiB2YWx1ZXMudmFsdWU/IGFuZCBtYXRjaGVzID0gQFBBVFRFUk5fQU5DSE9SX1ZBTFVFLmV4ZWMgdmFsdWVzLnZhbHVlXG4gICAgICAgICAgICAgICAgICAgIGlzUmVmID0gbWF0Y2hlcy5yZWZcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzLnZhbHVlID0gbWF0Y2hlcy52YWx1ZVxuICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgaWYgbWVyZ2VOb2RlXG4gICAgICAgICAgICAgICAgICAgICMgTWVyZ2Uga2V5c1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgbm90KHZhbHVlcy52YWx1ZT8pIG9yICcnIGlzIFV0aWxzLnRyaW0odmFsdWVzLnZhbHVlLCAnICcpIG9yIFV0aWxzLmx0cmltKHZhbHVlcy52YWx1ZSwgJyAnKS5pbmRleE9mKCcjJykgaXMgMFxuICAgICAgICAgICAgICAgICAgICAjIEhhc2hcbiAgICAgICAgICAgICAgICAgICAgIyBpZiBuZXh0IGxpbmUgaXMgbGVzcyBpbmRlbnRlZCBvciBlcXVhbCwgdGhlbiBpdCBtZWFucyB0aGF0IHRoZSBjdXJyZW50IHZhbHVlIGlzIG51bGxcbiAgICAgICAgICAgICAgICAgICAgaWYgbm90KEBpc05leHRMaW5lSW5kZW50ZWQoKSkgYW5kIG5vdChAaXNOZXh0TGluZVVuSW5kZW50ZWRDb2xsZWN0aW9uKCkpXG4gICAgICAgICAgICAgICAgICAgICAgICAjIFNwZWM6IEtleXMgTVVTVCBiZSB1bmlxdWU7IGZpcnN0IG9uZSB3aW5zLlxuICAgICAgICAgICAgICAgICAgICAgICAgIyBCdXQgb3ZlcndyaXRpbmcgaXMgYWxsb3dlZCB3aGVuIGEgbWVyZ2Ugbm9kZSBpcyB1c2VkIGluIGN1cnJlbnQgYmxvY2suXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiBhbGxvd092ZXJ3cml0ZSBvciBkYXRhW2tleV0gaXMgdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVtrZXldID0gbnVsbFxuXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIGMgPSBAZ2V0UmVhbEN1cnJlbnRMaW5lTmIoKSArIDFcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlciA9IG5ldyBQYXJzZXIgY1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VyLnJlZnMgPSBAcmVmc1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsID0gcGFyc2VyLnBhcnNlIEBnZXROZXh0RW1iZWRCbG9jaygpLCBleGNlcHRpb25PbkludmFsaWRUeXBlLCBvYmplY3REZWNvZGVyXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICMgU3BlYzogS2V5cyBNVVNUIGJlIHVuaXF1ZTsgZmlyc3Qgb25lIHdpbnMuXG4gICAgICAgICAgICAgICAgICAgICAgICAjIEJ1dCBvdmVyd3JpdGluZyBpcyBhbGxvd2VkIHdoZW4gYSBtZXJnZSBub2RlIGlzIHVzZWQgaW4gY3VycmVudCBibG9jay5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIGFsbG93T3ZlcndyaXRlIG9yIGRhdGFba2V5XSBpcyB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhW2tleV0gPSB2YWxcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICB2YWwgPSBAcGFyc2VWYWx1ZSB2YWx1ZXMudmFsdWUsIGV4Y2VwdGlvbk9uSW52YWxpZFR5cGUsIG9iamVjdERlY29kZXJcblxuICAgICAgICAgICAgICAgICAgICAjIFNwZWM6IEtleXMgTVVTVCBiZSB1bmlxdWU7IGZpcnN0IG9uZSB3aW5zLlxuICAgICAgICAgICAgICAgICAgICAjIEJ1dCBvdmVyd3JpdGluZyBpcyBhbGxvd2VkIHdoZW4gYSBtZXJnZSBub2RlIGlzIHVzZWQgaW4gY3VycmVudCBibG9jay5cbiAgICAgICAgICAgICAgICAgICAgaWYgYWxsb3dPdmVyd3JpdGUgb3IgZGF0YVtrZXldIGlzIHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVtrZXldID0gdmFsXG5cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAjIDEtbGluZXIgb3B0aW9uYWxseSBmb2xsb3dlZCBieSBuZXdsaW5lXG4gICAgICAgICAgICAgICAgbGluZUNvdW50ID0gQGxpbmVzLmxlbmd0aFxuICAgICAgICAgICAgICAgIGlmIDEgaXMgbGluZUNvdW50IG9yICgyIGlzIGxpbmVDb3VudCBhbmQgVXRpbHMuaXNFbXB0eShAbGluZXNbMV0pKVxuICAgICAgICAgICAgICAgICAgICB0cnlcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gSW5saW5lLnBhcnNlIEBsaW5lc1swXSwgZXhjZXB0aW9uT25JbnZhbGlkVHlwZSwgb2JqZWN0RGVjb2RlclxuICAgICAgICAgICAgICAgICAgICBjYXRjaCBlXG4gICAgICAgICAgICAgICAgICAgICAgICBlLnBhcnNlZExpbmUgPSBAZ2V0UmVhbEN1cnJlbnRMaW5lTmIoKSArIDFcbiAgICAgICAgICAgICAgICAgICAgICAgIGUuc25pcHBldCA9IEBjdXJyZW50TGluZVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBlXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgdHlwZW9mIHZhbHVlIGlzICdvYmplY3QnXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiB2YWx1ZSBpbnN0YW5jZW9mIEFycmF5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3QgPSB2YWx1ZVswXVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciBrZXkgb2YgdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3QgPSB2YWx1ZVtrZXldXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIHR5cGVvZiBmaXJzdCBpcyAnc3RyaW5nJyBhbmQgZmlyc3QuaW5kZXhPZignKicpIGlzIDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhID0gW11cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgYWxpYXMgaW4gdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5wdXNoIEByZWZzW2FsaWFzWzEuLl1dXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBkYXRhXG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlXG5cbiAgICAgICAgICAgICAgICBlbHNlIGlmIFV0aWxzLmx0cmltKHZhbHVlKS5jaGFyQXQoMCkgaW4gWydbJywgJ3snXVxuICAgICAgICAgICAgICAgICAgICB0cnlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBJbmxpbmUucGFyc2UgdmFsdWUsIGV4Y2VwdGlvbk9uSW52YWxpZFR5cGUsIG9iamVjdERlY29kZXJcbiAgICAgICAgICAgICAgICAgICAgY2F0Y2ggZVxuICAgICAgICAgICAgICAgICAgICAgICAgZS5wYXJzZWRMaW5lID0gQGdldFJlYWxDdXJyZW50TGluZU5iKCkgKyAxXG4gICAgICAgICAgICAgICAgICAgICAgICBlLnNuaXBwZXQgPSBAY3VycmVudExpbmVcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgZVxuXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFBhcnNlRXhjZXB0aW9uICdVbmFibGUgdG8gcGFyc2UuJywgQGdldFJlYWxDdXJyZW50TGluZU5iKCkgKyAxLCBAY3VycmVudExpbmVcblxuICAgICAgICAgICAgaWYgaXNSZWZcbiAgICAgICAgICAgICAgICBpZiBkYXRhIGluc3RhbmNlb2YgQXJyYXlcbiAgICAgICAgICAgICAgICAgICAgQHJlZnNbaXNSZWZdID0gZGF0YVtkYXRhLmxlbmd0aC0xXVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgbGFzdEtleSA9IG51bGxcbiAgICAgICAgICAgICAgICAgICAgZm9yIGtleSBvZiBkYXRhXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0S2V5ID0ga2V5XG4gICAgICAgICAgICAgICAgICAgIEByZWZzW2lzUmVmXSA9IGRhdGFbbGFzdEtleV1cblxuXG4gICAgICAgIGlmIFV0aWxzLmlzRW1wdHkoZGF0YSlcbiAgICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiBkYXRhXG5cblxuICAgIFxuICAgICMgUmV0dXJucyB0aGUgY3VycmVudCBsaW5lIG51bWJlciAodGFrZXMgdGhlIG9mZnNldCBpbnRvIGFjY291bnQpLlxuICAgICNcbiAgICAjIEByZXR1cm4gW0ludGVnZXJdICAgICBUaGUgY3VycmVudCBsaW5lIG51bWJlclxuICAgICNcbiAgICBnZXRSZWFsQ3VycmVudExpbmVOYjogLT5cbiAgICAgICAgcmV0dXJuIEBjdXJyZW50TGluZU5iICsgQG9mZnNldFxuICAgIFxuXG4gICAgIyBSZXR1cm5zIHRoZSBjdXJyZW50IGxpbmUgaW5kZW50YXRpb24uXG4gICAgI1xuICAgICMgQHJldHVybiBbSW50ZWdlcl0gICAgIFRoZSBjdXJyZW50IGxpbmUgaW5kZW50YXRpb25cbiAgICAjXG4gICAgZ2V0Q3VycmVudExpbmVJbmRlbnRhdGlvbjogLT5cbiAgICAgICAgcmV0dXJuIEBjdXJyZW50TGluZS5sZW5ndGggLSBVdGlscy5sdHJpbShAY3VycmVudExpbmUsICcgJykubGVuZ3RoXG5cblxuICAgICMgUmV0dXJucyB0aGUgbmV4dCBlbWJlZCBibG9jayBvZiBZQU1MLlxuICAgICNcbiAgICAjIEBwYXJhbSBbSW50ZWdlcl0gICAgICAgICAgaW5kZW50YXRpb24gVGhlIGluZGVudCBsZXZlbCBhdCB3aGljaCB0aGUgYmxvY2sgaXMgdG8gYmUgcmVhZCwgb3IgbnVsbCBmb3IgZGVmYXVsdFxuICAgICNcbiAgICAjIEByZXR1cm4gW1N0cmluZ10gICAgICAgICAgQSBZQU1MIHN0cmluZ1xuICAgICNcbiAgICAjIEB0aHJvdyBbUGFyc2VFeGNlcHRpb25dICAgV2hlbiBpbmRlbnRhdGlvbiBwcm9ibGVtIGFyZSBkZXRlY3RlZFxuICAgICNcbiAgICBnZXROZXh0RW1iZWRCbG9jazogKGluZGVudGF0aW9uID0gbnVsbCwgaW5jbHVkZVVuaW5kZW50ZWRDb2xsZWN0aW9uID0gZmFsc2UpIC0+XG4gICAgICAgIEBtb3ZlVG9OZXh0TGluZSgpXG5cbiAgICAgICAgaWYgbm90IGluZGVudGF0aW9uP1xuICAgICAgICAgICAgbmV3SW5kZW50ID0gQGdldEN1cnJlbnRMaW5lSW5kZW50YXRpb24oKVxuXG4gICAgICAgICAgICB1bmluZGVudGVkRW1iZWRCbG9jayA9IEBpc1N0cmluZ1VuSW5kZW50ZWRDb2xsZWN0aW9uSXRlbSBAY3VycmVudExpbmVcblxuICAgICAgICAgICAgaWYgbm90KEBpc0N1cnJlbnRMaW5lRW1wdHkoKSkgYW5kIDAgaXMgbmV3SW5kZW50IGFuZCBub3QodW5pbmRlbnRlZEVtYmVkQmxvY2spXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFBhcnNlRXhjZXB0aW9uICdJbmRlbnRhdGlvbiBwcm9ibGVtLicsIEBnZXRSZWFsQ3VycmVudExpbmVOYigpICsgMSwgQGN1cnJlbnRMaW5lXG4gICAgICAgICAgICBcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgbmV3SW5kZW50ID0gaW5kZW50YXRpb25cblxuXG4gICAgICAgIGRhdGEgPSBbQGN1cnJlbnRMaW5lW25ld0luZGVudC4uXV1cblxuICAgICAgICB1bmxlc3MgaW5jbHVkZVVuaW5kZW50ZWRDb2xsZWN0aW9uXG4gICAgICAgICAgICBpc0l0VW5pbmRlbnRlZENvbGxlY3Rpb24gPSBAaXNTdHJpbmdVbkluZGVudGVkQ29sbGVjdGlvbkl0ZW0gQGN1cnJlbnRMaW5lXG5cbiAgICAgICAgIyBDb21tZW50cyBtdXN0IG5vdCBiZSByZW1vdmVkIGluc2lkZSBhIHN0cmluZyBibG9jayAoaWUuIGFmdGVyIGEgbGluZSBlbmRpbmcgd2l0aCBcInxcIilcbiAgICAgICAgIyBUaGV5IG11c3Qgbm90IGJlIHJlbW92ZWQgaW5zaWRlIGEgc3ViLWVtYmVkZGVkIGJsb2NrIGFzIHdlbGxcbiAgICAgICAgcmVtb3ZlQ29tbWVudHNQYXR0ZXJuID0gQFBBVFRFUk5fRk9MREVEX1NDQUxBUl9FTkRcbiAgICAgICAgcmVtb3ZlQ29tbWVudHMgPSBub3QgcmVtb3ZlQ29tbWVudHNQYXR0ZXJuLnRlc3QgQGN1cnJlbnRMaW5lXG5cbiAgICAgICAgd2hpbGUgQG1vdmVUb05leHRMaW5lKClcbiAgICAgICAgICAgIGluZGVudCA9IEBnZXRDdXJyZW50TGluZUluZGVudGF0aW9uKClcblxuICAgICAgICAgICAgaWYgaW5kZW50IGlzIG5ld0luZGVudFxuICAgICAgICAgICAgICAgIHJlbW92ZUNvbW1lbnRzID0gbm90IHJlbW92ZUNvbW1lbnRzUGF0dGVybi50ZXN0IEBjdXJyZW50TGluZVxuXG4gICAgICAgICAgICBpZiBpc0l0VW5pbmRlbnRlZENvbGxlY3Rpb24gYW5kIG5vdCBAaXNTdHJpbmdVbkluZGVudGVkQ29sbGVjdGlvbkl0ZW0oQGN1cnJlbnRMaW5lKSBhbmQgaW5kZW50IGlzIG5ld0luZGVudFxuICAgICAgICAgICAgICAgIEBtb3ZlVG9QcmV2aW91c0xpbmUoKVxuICAgICAgICAgICAgICAgIGJyZWFrXG5cbiAgICAgICAgICAgIGlmIEBpc0N1cnJlbnRMaW5lQmxhbmsoKVxuICAgICAgICAgICAgICAgIGRhdGEucHVzaCBAY3VycmVudExpbmVbbmV3SW5kZW50Li5dXG4gICAgICAgICAgICAgICAgY29udGludWVcblxuICAgICAgICAgICAgaWYgcmVtb3ZlQ29tbWVudHMgYW5kIEBpc0N1cnJlbnRMaW5lQ29tbWVudCgpXG4gICAgICAgICAgICAgICAgaWYgaW5kZW50IGlzIG5ld0luZGVudFxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZVxuXG4gICAgICAgICAgICBpZiBpbmRlbnQgPj0gbmV3SW5kZW50XG4gICAgICAgICAgICAgICAgZGF0YS5wdXNoIEBjdXJyZW50TGluZVtuZXdJbmRlbnQuLl1cbiAgICAgICAgICAgIGVsc2UgaWYgMCBpcyBpbmRlbnRcbiAgICAgICAgICAgICAgICBAbW92ZVRvUHJldmlvdXNMaW5lKClcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBQYXJzZUV4Y2VwdGlvbiAnSW5kZW50YXRpb24gcHJvYmxlbS4nLCBAZ2V0UmVhbEN1cnJlbnRMaW5lTmIoKSArIDEsIEBjdXJyZW50TGluZVxuICAgICAgICBcblxuICAgICAgICByZXR1cm4gZGF0YS5qb2luIFwiXFxuXCJcbiAgICBcblxuICAgICMgTW92ZXMgdGhlIHBhcnNlciB0byB0aGUgbmV4dCBsaW5lLlxuICAgICNcbiAgICAjIEByZXR1cm4gW0Jvb2xlYW5dXG4gICAgI1xuICAgIG1vdmVUb05leHRMaW5lOiAtPlxuICAgICAgICBpZiBAY3VycmVudExpbmVOYiA+PSBAbGluZXMubGVuZ3RoIC0gMVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG5cbiAgICAgICAgQGN1cnJlbnRMaW5lID0gQGxpbmVzWysrQGN1cnJlbnRMaW5lTmJdO1xuXG4gICAgICAgIHJldHVybiB0cnVlXG5cblxuICAgICMgTW92ZXMgdGhlIHBhcnNlciB0byB0aGUgcHJldmlvdXMgbGluZS5cbiAgICAjXG4gICAgbW92ZVRvUHJldmlvdXNMaW5lOiAtPlxuICAgICAgICBAY3VycmVudExpbmUgPSBAbGluZXNbLS1AY3VycmVudExpbmVOYl1cbiAgICAgICAgcmV0dXJuXG5cblxuICAgICMgUGFyc2VzIGEgWUFNTCB2YWx1ZS5cbiAgICAjXG4gICAgIyBAcGFyYW0gW1N0cmluZ10gICB2YWx1ZSAgICAgICAgICAgICAgICAgICBBIFlBTUwgdmFsdWVcbiAgICAjIEBwYXJhbSBbQm9vbGVhbl0gIGV4Y2VwdGlvbk9uSW52YWxpZFR5cGUgIHRydWUgaWYgYW4gZXhjZXB0aW9uIG11c3QgYmUgdGhyb3duIG9uIGludmFsaWQgdHlwZXMgZmFsc2Ugb3RoZXJ3aXNlXG4gICAgIyBAcGFyYW0gW0Z1bmN0aW9uXSBvYmplY3REZWNvZGVyICAgICAgICAgICBBIGZ1bmN0aW9uIHRvIGRlc2VyaWFsaXplIGN1c3RvbSBvYmplY3RzLCBudWxsIG90aGVyd2lzZVxuICAgICNcbiAgICAjIEByZXR1cm4gW09iamVjdF0gQSBKYXZhU2NyaXB0IHZhbHVlXG4gICAgI1xuICAgICMgQHRocm93IFtQYXJzZUV4Y2VwdGlvbl0gV2hlbiByZWZlcmVuY2UgZG9lcyBub3QgZXhpc3RcbiAgICAjXG4gICAgcGFyc2VWYWx1ZTogKHZhbHVlLCBleGNlcHRpb25PbkludmFsaWRUeXBlLCBvYmplY3REZWNvZGVyKSAtPlxuICAgICAgICBpZiAwIGlzIHZhbHVlLmluZGV4T2YoJyonKVxuICAgICAgICAgICAgcG9zID0gdmFsdWUuaW5kZXhPZiAnIydcbiAgICAgICAgICAgIGlmIHBvcyBpc250IC0xXG4gICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5zdWJzdHIoMSwgcG9zLTIpXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZVsxLi5dXG5cbiAgICAgICAgICAgIGlmIEByZWZzW3ZhbHVlXSBpcyB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUGFyc2VFeGNlcHRpb24gJ1JlZmVyZW5jZSBcIicrdmFsdWUrJ1wiIGRvZXMgbm90IGV4aXN0LicsIEBjdXJyZW50TGluZVxuXG4gICAgICAgICAgICByZXR1cm4gQHJlZnNbdmFsdWVdXG5cblxuICAgICAgICBpZiBtYXRjaGVzID0gQFBBVFRFUk5fRk9MREVEX1NDQUxBUl9BTEwuZXhlYyB2YWx1ZVxuICAgICAgICAgICAgbW9kaWZpZXJzID0gbWF0Y2hlcy5tb2RpZmllcnMgPyAnJ1xuXG4gICAgICAgICAgICBmb2xkZWRJbmRlbnQgPSBNYXRoLmFicyhwYXJzZUludChtb2RpZmllcnMpKVxuICAgICAgICAgICAgaWYgaXNOYU4oZm9sZGVkSW5kZW50KSB0aGVuIGZvbGRlZEluZGVudCA9IDBcbiAgICAgICAgICAgIHZhbCA9IEBwYXJzZUZvbGRlZFNjYWxhciBtYXRjaGVzLnNlcGFyYXRvciwgQFBBVFRFUk5fREVDSU1BTC5yZXBsYWNlKG1vZGlmaWVycywgJycpLCBmb2xkZWRJbmRlbnRcbiAgICAgICAgICAgIGlmIG1hdGNoZXMudHlwZT9cbiAgICAgICAgICAgICAgICAjIEZvcmNlIGNvcnJlY3Qgc2V0dGluZ3NcbiAgICAgICAgICAgICAgICBJbmxpbmUuY29uZmlndXJlIGV4Y2VwdGlvbk9uSW52YWxpZFR5cGUsIG9iamVjdERlY29kZXJcbiAgICAgICAgICAgICAgICByZXR1cm4gSW5saW5lLnBhcnNlU2NhbGFyIG1hdGNoZXMudHlwZSsnICcrdmFsXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbFxuXG4gICAgICAgIHRyeVxuICAgICAgICAgICAgcmV0dXJuIElubGluZS5wYXJzZSB2YWx1ZSwgZXhjZXB0aW9uT25JbnZhbGlkVHlwZSwgb2JqZWN0RGVjb2RlclxuICAgICAgICBjYXRjaCBlXG4gICAgICAgICAgICAjIFRyeSB0byBwYXJzZSBtdWx0aWxpbmUgY29tcGFjdCBzZXF1ZW5jZSBvciBtYXBwaW5nXG4gICAgICAgICAgICBpZiB2YWx1ZS5jaGFyQXQoMCkgaW4gWydbJywgJ3snXSBhbmQgZSBpbnN0YW5jZW9mIFBhcnNlRXhjZXB0aW9uIGFuZCBAaXNOZXh0TGluZUluZGVudGVkKClcbiAgICAgICAgICAgICAgICB2YWx1ZSArPSBcIlxcblwiICsgQGdldE5leHRFbWJlZEJsb2NrKClcbiAgICAgICAgICAgICAgICB0cnlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIElubGluZS5wYXJzZSB2YWx1ZSwgZXhjZXB0aW9uT25JbnZhbGlkVHlwZSwgb2JqZWN0RGVjb2RlclxuICAgICAgICAgICAgICAgIGNhdGNoIGVcbiAgICAgICAgICAgICAgICAgICAgZS5wYXJzZWRMaW5lID0gQGdldFJlYWxDdXJyZW50TGluZU5iKCkgKyAxXG4gICAgICAgICAgICAgICAgICAgIGUuc25pcHBldCA9IEBjdXJyZW50TGluZVxuXG4gICAgICAgICAgICAgICAgICAgIHRocm93IGVcblxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGUucGFyc2VkTGluZSA9IEBnZXRSZWFsQ3VycmVudExpbmVOYigpICsgMVxuICAgICAgICAgICAgICAgIGUuc25pcHBldCA9IEBjdXJyZW50TGluZVxuXG4gICAgICAgICAgICAgICAgdGhyb3cgZVxuXG4gICAgICAgIHJldHVyblxuXG5cbiAgICAjIFBhcnNlcyBhIGZvbGRlZCBzY2FsYXIuXG4gICAgI1xuICAgICMgQHBhcmFtIFtTdHJpbmddICAgICAgIHNlcGFyYXRvciAgIFRoZSBzZXBhcmF0b3IgdGhhdCB3YXMgdXNlZCB0byBiZWdpbiB0aGlzIGZvbGRlZCBzY2FsYXIgKHwgb3IgPilcbiAgICAjIEBwYXJhbSBbU3RyaW5nXSAgICAgICBpbmRpY2F0b3IgICBUaGUgaW5kaWNhdG9yIHRoYXQgd2FzIHVzZWQgdG8gYmVnaW4gdGhpcyBmb2xkZWQgc2NhbGFyICgrIG9yIC0pXG4gICAgIyBAcGFyYW0gW0ludGVnZXJdICAgICAgaW5kZW50YXRpb24gVGhlIGluZGVudGF0aW9uIHRoYXQgd2FzIHVzZWQgdG8gYmVnaW4gdGhpcyBmb2xkZWQgc2NhbGFyXG4gICAgI1xuICAgICMgQHJldHVybiBbU3RyaW5nXSAgICAgIFRoZSB0ZXh0IHZhbHVlXG4gICAgI1xuICAgIHBhcnNlRm9sZGVkU2NhbGFyOiAoc2VwYXJhdG9yLCBpbmRpY2F0b3IgPSAnJywgaW5kZW50YXRpb24gPSAwKSAtPlxuICAgICAgICBub3RFT0YgPSBAbW92ZVRvTmV4dExpbmUoKVxuICAgICAgICBpZiBub3Qgbm90RU9GXG4gICAgICAgICAgICByZXR1cm4gJydcblxuICAgICAgICBpc0N1cnJlbnRMaW5lQmxhbmsgPSBAaXNDdXJyZW50TGluZUJsYW5rKClcbiAgICAgICAgdGV4dCA9ICcnXG5cbiAgICAgICAgIyBMZWFkaW5nIGJsYW5rIGxpbmVzIGFyZSBjb25zdW1lZCBiZWZvcmUgZGV0ZXJtaW5pbmcgaW5kZW50YXRpb25cbiAgICAgICAgd2hpbGUgbm90RU9GIGFuZCBpc0N1cnJlbnRMaW5lQmxhbmtcbiAgICAgICAgICAgICMgbmV3bGluZSBvbmx5IGlmIG5vdCBFT0ZcbiAgICAgICAgICAgIGlmIG5vdEVPRiA9IEBtb3ZlVG9OZXh0TGluZSgpXG4gICAgICAgICAgICAgICAgdGV4dCArPSBcIlxcblwiXG4gICAgICAgICAgICAgICAgaXNDdXJyZW50TGluZUJsYW5rID0gQGlzQ3VycmVudExpbmVCbGFuaygpXG5cblxuICAgICAgICAjIERldGVybWluZSBpbmRlbnRhdGlvbiBpZiBub3Qgc3BlY2lmaWVkXG4gICAgICAgIGlmIDAgaXMgaW5kZW50YXRpb25cbiAgICAgICAgICAgIGlmIG1hdGNoZXMgPSBAUEFUVEVSTl9JTkRFTlRfU1BBQ0VTLmV4ZWMgQGN1cnJlbnRMaW5lXG4gICAgICAgICAgICAgICAgaW5kZW50YXRpb24gPSBtYXRjaGVzWzBdLmxlbmd0aFxuXG5cbiAgICAgICAgaWYgaW5kZW50YXRpb24gPiAwXG4gICAgICAgICAgICBwYXR0ZXJuID0gQFBBVFRFUk5fRk9MREVEX1NDQUxBUl9CWV9JTkRFTlRBVElPTltpbmRlbnRhdGlvbl1cbiAgICAgICAgICAgIHVubGVzcyBwYXR0ZXJuP1xuICAgICAgICAgICAgICAgIHBhdHRlcm4gPSBuZXcgUGF0dGVybiAnXiB7JytpbmRlbnRhdGlvbisnfSguKikkJ1xuICAgICAgICAgICAgICAgIFBhcnNlcjo6UEFUVEVSTl9GT0xERURfU0NBTEFSX0JZX0lOREVOVEFUSU9OW2luZGVudGF0aW9uXSA9IHBhdHRlcm5cblxuICAgICAgICAgICAgd2hpbGUgbm90RU9GIGFuZCAoaXNDdXJyZW50TGluZUJsYW5rIG9yIG1hdGNoZXMgPSBwYXR0ZXJuLmV4ZWMgQGN1cnJlbnRMaW5lKVxuICAgICAgICAgICAgICAgIGlmIGlzQ3VycmVudExpbmVCbGFua1xuICAgICAgICAgICAgICAgICAgICB0ZXh0ICs9IEBjdXJyZW50TGluZVtpbmRlbnRhdGlvbi4uXVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgdGV4dCArPSBtYXRjaGVzWzFdXG5cbiAgICAgICAgICAgICAgICAjIG5ld2xpbmUgb25seSBpZiBub3QgRU9GXG4gICAgICAgICAgICAgICAgaWYgbm90RU9GID0gQG1vdmVUb05leHRMaW5lKClcbiAgICAgICAgICAgICAgICAgICAgdGV4dCArPSBcIlxcblwiXG4gICAgICAgICAgICAgICAgICAgIGlzQ3VycmVudExpbmVCbGFuayA9IEBpc0N1cnJlbnRMaW5lQmxhbmsoKVxuXG4gICAgICAgIGVsc2UgaWYgbm90RU9GXG4gICAgICAgICAgICB0ZXh0ICs9IFwiXFxuXCJcblxuXG4gICAgICAgIGlmIG5vdEVPRlxuICAgICAgICAgICAgQG1vdmVUb1ByZXZpb3VzTGluZSgpXG5cblxuICAgICAgICAjIFJlbW92ZSBsaW5lIGJyZWFrcyBvZiBlYWNoIGxpbmVzIGV4Y2VwdCB0aGUgZW1wdHkgYW5kIG1vcmUgaW5kZW50ZWQgb25lc1xuICAgICAgICBpZiAnPicgaXMgc2VwYXJhdG9yXG4gICAgICAgICAgICBuZXdUZXh0ID0gJydcbiAgICAgICAgICAgIGZvciBsaW5lIGluIHRleHQuc3BsaXQgXCJcXG5cIlxuICAgICAgICAgICAgICAgIGlmIGxpbmUubGVuZ3RoIGlzIDAgb3IgbGluZS5jaGFyQXQoMCkgaXMgJyAnXG4gICAgICAgICAgICAgICAgICAgIG5ld1RleHQgPSBVdGlscy5ydHJpbShuZXdUZXh0LCAnICcpICsgbGluZSArIFwiXFxuXCJcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIG5ld1RleHQgKz0gbGluZSArICcgJ1xuICAgICAgICAgICAgdGV4dCA9IG5ld1RleHRcblxuICAgICAgICBpZiAnKycgaXNudCBpbmRpY2F0b3JcbiAgICAgICAgICAgICMgUmVtb3ZlIGFueSBleHRyYSBzcGFjZSBvciBuZXcgbGluZSBhcyB3ZSBhcmUgYWRkaW5nIHRoZW0gYWZ0ZXJcbiAgICAgICAgICAgIHRleHQgPSBVdGlscy5ydHJpbSh0ZXh0KVxuXG4gICAgICAgICMgRGVhbCB3aXRoIHRyYWlsaW5nIG5ld2xpbmVzIGFzIGluZGljYXRlZFxuICAgICAgICBpZiAnJyBpcyBpbmRpY2F0b3JcbiAgICAgICAgICAgIHRleHQgPSBAUEFUVEVSTl9UUkFJTElOR19MSU5FUy5yZXBsYWNlIHRleHQsIFwiXFxuXCJcbiAgICAgICAgZWxzZSBpZiAnLScgaXMgaW5kaWNhdG9yXG4gICAgICAgICAgICB0ZXh0ID0gQFBBVFRFUk5fVFJBSUxJTkdfTElORVMucmVwbGFjZSB0ZXh0LCAnJ1xuXG4gICAgICAgIHJldHVybiB0ZXh0XG5cblxuICAgICMgUmV0dXJucyB0cnVlIGlmIHRoZSBuZXh0IGxpbmUgaXMgaW5kZW50ZWQuXG4gICAgI1xuICAgICMgQHJldHVybiBbQm9vbGVhbl0gICAgIFJldHVybnMgdHJ1ZSBpZiB0aGUgbmV4dCBsaW5lIGlzIGluZGVudGVkLCBmYWxzZSBvdGhlcndpc2VcbiAgICAjXG4gICAgaXNOZXh0TGluZUluZGVudGVkOiAoaWdub3JlQ29tbWVudHMgPSB0cnVlKSAtPlxuICAgICAgICBjdXJyZW50SW5kZW50YXRpb24gPSBAZ2V0Q3VycmVudExpbmVJbmRlbnRhdGlvbigpXG4gICAgICAgIEVPRiA9IG5vdCBAbW92ZVRvTmV4dExpbmUoKVxuXG4gICAgICAgIGlmIGlnbm9yZUNvbW1lbnRzXG4gICAgICAgICAgICB3aGlsZSBub3QoRU9GKSBhbmQgQGlzQ3VycmVudExpbmVFbXB0eSgpXG4gICAgICAgICAgICAgICAgRU9GID0gbm90IEBtb3ZlVG9OZXh0TGluZSgpXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHdoaWxlIG5vdChFT0YpIGFuZCBAaXNDdXJyZW50TGluZUJsYW5rKClcbiAgICAgICAgICAgICAgICBFT0YgPSBub3QgQG1vdmVUb05leHRMaW5lKClcblxuICAgICAgICBpZiBFT0ZcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuXG4gICAgICAgIHJldCA9IGZhbHNlXG4gICAgICAgIGlmIEBnZXRDdXJyZW50TGluZUluZGVudGF0aW9uKCkgPiBjdXJyZW50SW5kZW50YXRpb25cbiAgICAgICAgICAgIHJldCA9IHRydWVcblxuICAgICAgICBAbW92ZVRvUHJldmlvdXNMaW5lKClcblxuICAgICAgICByZXR1cm4gcmV0XG5cblxuICAgICMgUmV0dXJucyB0cnVlIGlmIHRoZSBjdXJyZW50IGxpbmUgaXMgYmxhbmsgb3IgaWYgaXQgaXMgYSBjb21tZW50IGxpbmUuXG4gICAgI1xuICAgICMgQHJldHVybiBbQm9vbGVhbl0gICAgIFJldHVybnMgdHJ1ZSBpZiB0aGUgY3VycmVudCBsaW5lIGlzIGVtcHR5IG9yIGlmIGl0IGlzIGEgY29tbWVudCBsaW5lLCBmYWxzZSBvdGhlcndpc2VcbiAgICAjXG4gICAgaXNDdXJyZW50TGluZUVtcHR5OiAtPlxuICAgICAgICB0cmltbWVkTGluZSA9IFV0aWxzLnRyaW0oQGN1cnJlbnRMaW5lLCAnICcpXG4gICAgICAgIHJldHVybiB0cmltbWVkTGluZS5sZW5ndGggaXMgMCBvciB0cmltbWVkTGluZS5jaGFyQXQoMCkgaXMgJyMnXG5cblxuICAgICMgUmV0dXJucyB0cnVlIGlmIHRoZSBjdXJyZW50IGxpbmUgaXMgYmxhbmsuXG4gICAgI1xuICAgICMgQHJldHVybiBbQm9vbGVhbl0gICAgIFJldHVybnMgdHJ1ZSBpZiB0aGUgY3VycmVudCBsaW5lIGlzIGJsYW5rLCBmYWxzZSBvdGhlcndpc2VcbiAgICAjXG4gICAgaXNDdXJyZW50TGluZUJsYW5rOiAtPlxuICAgICAgICByZXR1cm4gJycgaXMgVXRpbHMudHJpbShAY3VycmVudExpbmUsICcgJylcblxuXG4gICAgIyBSZXR1cm5zIHRydWUgaWYgdGhlIGN1cnJlbnQgbGluZSBpcyBhIGNvbW1lbnQgbGluZS5cbiAgICAjXG4gICAgIyBAcmV0dXJuIFtCb29sZWFuXSAgICAgUmV0dXJucyB0cnVlIGlmIHRoZSBjdXJyZW50IGxpbmUgaXMgYSBjb21tZW50IGxpbmUsIGZhbHNlIG90aGVyd2lzZVxuICAgICNcbiAgICBpc0N1cnJlbnRMaW5lQ29tbWVudDogLT5cbiAgICAgICAgIyBDaGVja2luZyBleHBsaWNpdGx5IHRoZSBmaXJzdCBjaGFyIG9mIHRoZSB0cmltIGlzIGZhc3RlciB0aGFuIGxvb3BzIG9yIHN0cnBvc1xuICAgICAgICBsdHJpbW1lZExpbmUgPSBVdGlscy5sdHJpbShAY3VycmVudExpbmUsICcgJylcblxuICAgICAgICByZXR1cm4gbHRyaW1tZWRMaW5lLmNoYXJBdCgwKSBpcyAnIydcblxuXG4gICAgIyBDbGVhbnVwcyBhIFlBTUwgc3RyaW5nIHRvIGJlIHBhcnNlZC5cbiAgICAjXG4gICAgIyBAcGFyYW0gW1N0cmluZ10gICB2YWx1ZSBUaGUgaW5wdXQgWUFNTCBzdHJpbmdcbiAgICAjXG4gICAgIyBAcmV0dXJuIFtTdHJpbmddICBBIGNsZWFuZWQgdXAgWUFNTCBzdHJpbmdcbiAgICAjXG4gICAgY2xlYW51cDogKHZhbHVlKSAtPlxuICAgICAgICBpZiB2YWx1ZS5pbmRleE9mKFwiXFxyXCIpIGlzbnQgLTFcbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWUuc3BsaXQoXCJcXHJcXG5cIikuam9pbihcIlxcblwiKS5zcGxpdChcIlxcclwiKS5qb2luKFwiXFxuXCIpXG5cbiAgICAgICAgIyBTdHJpcCBZQU1MIGhlYWRlclxuICAgICAgICBjb3VudCA9IDBcbiAgICAgICAgW3ZhbHVlLCBjb3VudF0gPSBAUEFUVEVSTl9ZQU1MX0hFQURFUi5yZXBsYWNlQWxsIHZhbHVlLCAnJ1xuICAgICAgICBAb2Zmc2V0ICs9IGNvdW50XG5cbiAgICAgICAgIyBSZW1vdmUgbGVhZGluZyBjb21tZW50c1xuICAgICAgICBbdHJpbW1lZFZhbHVlLCBjb3VudF0gPSBAUEFUVEVSTl9MRUFESU5HX0NPTU1FTlRTLnJlcGxhY2VBbGwgdmFsdWUsICcnLCAxXG4gICAgICAgIGlmIGNvdW50IGlzIDFcbiAgICAgICAgICAgICMgSXRlbXMgaGF2ZSBiZWVuIHJlbW92ZWQsIHVwZGF0ZSB0aGUgb2Zmc2V0XG4gICAgICAgICAgICBAb2Zmc2V0ICs9IFV0aWxzLnN1YlN0ckNvdW50KHZhbHVlLCBcIlxcblwiKSAtIFV0aWxzLnN1YlN0ckNvdW50KHRyaW1tZWRWYWx1ZSwgXCJcXG5cIilcbiAgICAgICAgICAgIHZhbHVlID0gdHJpbW1lZFZhbHVlXG5cbiAgICAgICAgIyBSZW1vdmUgc3RhcnQgb2YgdGhlIGRvY3VtZW50IG1hcmtlciAoLS0tKVxuICAgICAgICBbdHJpbW1lZFZhbHVlLCBjb3VudF0gPSBAUEFUVEVSTl9ET0NVTUVOVF9NQVJLRVJfU1RBUlQucmVwbGFjZUFsbCB2YWx1ZSwgJycsIDFcbiAgICAgICAgaWYgY291bnQgaXMgMVxuICAgICAgICAgICAgIyBJdGVtcyBoYXZlIGJlZW4gcmVtb3ZlZCwgdXBkYXRlIHRoZSBvZmZzZXRcbiAgICAgICAgICAgIEBvZmZzZXQgKz0gVXRpbHMuc3ViU3RyQ291bnQodmFsdWUsIFwiXFxuXCIpIC0gVXRpbHMuc3ViU3RyQ291bnQodHJpbW1lZFZhbHVlLCBcIlxcblwiKVxuICAgICAgICAgICAgdmFsdWUgPSB0cmltbWVkVmFsdWVcblxuICAgICAgICAgICAgIyBSZW1vdmUgZW5kIG9mIHRoZSBkb2N1bWVudCBtYXJrZXIgKC4uLilcbiAgICAgICAgICAgIHZhbHVlID0gQFBBVFRFUk5fRE9DVU1FTlRfTUFSS0VSX0VORC5yZXBsYWNlIHZhbHVlLCAnJ1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHZhbHVlXG5cblxuICAgICMgUmV0dXJucyB0cnVlIGlmIHRoZSBuZXh0IGxpbmUgc3RhcnRzIHVuaW5kZW50ZWQgY29sbGVjdGlvblxuICAgICNcbiAgICAjIEByZXR1cm4gW0Jvb2xlYW5dICAgICBSZXR1cm5zIHRydWUgaWYgdGhlIG5leHQgbGluZSBzdGFydHMgdW5pbmRlbnRlZCBjb2xsZWN0aW9uLCBmYWxzZSBvdGhlcndpc2VcbiAgICAjXG4gICAgaXNOZXh0TGluZVVuSW5kZW50ZWRDb2xsZWN0aW9uOiAoY3VycmVudEluZGVudGF0aW9uID0gbnVsbCkgLT5cbiAgICAgICAgY3VycmVudEluZGVudGF0aW9uID89IEBnZXRDdXJyZW50TGluZUluZGVudGF0aW9uKClcbiAgICAgICAgbm90RU9GID0gQG1vdmVUb05leHRMaW5lKClcblxuICAgICAgICB3aGlsZSBub3RFT0YgYW5kIEBpc0N1cnJlbnRMaW5lRW1wdHkoKVxuICAgICAgICAgICAgbm90RU9GID0gQG1vdmVUb05leHRMaW5lKClcblxuICAgICAgICBpZiBmYWxzZSBpcyBub3RFT0ZcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuXG4gICAgICAgIHJldCA9IGZhbHNlXG4gICAgICAgIGlmIEBnZXRDdXJyZW50TGluZUluZGVudGF0aW9uKCkgaXMgY3VycmVudEluZGVudGF0aW9uIGFuZCBAaXNTdHJpbmdVbkluZGVudGVkQ29sbGVjdGlvbkl0ZW0oQGN1cnJlbnRMaW5lKVxuICAgICAgICAgICAgcmV0ID0gdHJ1ZVxuXG4gICAgICAgIEBtb3ZlVG9QcmV2aW91c0xpbmUoKVxuXG4gICAgICAgIHJldHVybiByZXRcblxuXG4gICAgIyBSZXR1cm5zIHRydWUgaWYgdGhlIHN0cmluZyBpcyB1bi1pbmRlbnRlZCBjb2xsZWN0aW9uIGl0ZW1cbiAgICAjXG4gICAgIyBAcmV0dXJuIFtCb29sZWFuXSAgICAgUmV0dXJucyB0cnVlIGlmIHRoZSBzdHJpbmcgaXMgdW4taW5kZW50ZWQgY29sbGVjdGlvbiBpdGVtLCBmYWxzZSBvdGhlcndpc2VcbiAgICAjXG4gICAgaXNTdHJpbmdVbkluZGVudGVkQ29sbGVjdGlvbkl0ZW06IC0+XG4gICAgICAgIHJldHVybiBAY3VycmVudExpbmUgaXMgJy0nIG9yIEBjdXJyZW50TGluZVswLi4uMl0gaXMgJy0gJ1xuXG5cbm1vZHVsZS5leHBvcnRzID0gUGFyc2VyXG4iLCJcbiMgUGF0dGVybiBpcyBhIHplcm8tY29uZmxpY3Qgd3JhcHBlciBleHRlbmRpbmcgUmVnRXhwIGZlYXR1cmVzXG4jIGluIG9yZGVyIHRvIG1ha2UgWUFNTCBwYXJzaW5nIHJlZ2V4IG1vcmUgZXhwcmVzc2l2ZS5cbiNcbmNsYXNzIFBhdHRlcm5cblxuICAgICMgQHByb3BlcnR5IFtSZWdFeHBdIFRoZSBSZWdFeHAgaW5zdGFuY2VcbiAgICByZWdleDogICAgICAgICAgbnVsbFxuXG4gICAgIyBAcHJvcGVydHkgW1N0cmluZ10gVGhlIHJhdyByZWdleCBzdHJpbmdcbiAgICByYXdSZWdleDogICAgICAgbnVsbFxuXG4gICAgIyBAcHJvcGVydHkgW1N0cmluZ10gVGhlIGNsZWFuZWQgcmVnZXggc3RyaW5nICh1c2VkIHRvIGNyZWF0ZSB0aGUgUmVnRXhwIGluc3RhbmNlKVxuICAgIGNsZWFuZWRSZWdleDogICBudWxsXG5cbiAgICAjIEBwcm9wZXJ0eSBbT2JqZWN0XSBUaGUgZGljdGlvbmFyeSBtYXBwaW5nIG5hbWVzIHRvIGNhcHR1cmluZyBicmFja2V0IG51bWJlcnNcbiAgICBtYXBwaW5nOiAgICAgICAgbnVsbFxuXG4gICAgIyBDb25zdHJ1Y3RvclxuICAgICNcbiAgICAjIEBwYXJhbSBbU3RyaW5nXSByYXdSZWdleCBUaGUgcmF3IHJlZ2V4IHN0cmluZyBkZWZpbmluZyB0aGUgcGF0dGVyblxuICAgICNcbiAgICBjb25zdHJ1Y3RvcjogKHJhd1JlZ2V4LCBtb2RpZmllcnMgPSAnJykgLT5cbiAgICAgICAgY2xlYW5lZFJlZ2V4ID0gJydcbiAgICAgICAgbGVuID0gcmF3UmVnZXgubGVuZ3RoXG4gICAgICAgIG1hcHBpbmcgPSBudWxsXG5cbiAgICAgICAgIyBDbGVhbnVwIHJhdyByZWdleCBhbmQgY29tcHV0ZSBtYXBwaW5nXG4gICAgICAgIGNhcHR1cmluZ0JyYWNrZXROdW1iZXIgPSAwXG4gICAgICAgIGkgPSAwXG4gICAgICAgIHdoaWxlIGkgPCBsZW5cbiAgICAgICAgICAgIGNoYXIgPSByYXdSZWdleC5jaGFyQXQoaSlcbiAgICAgICAgICAgIGlmIGNoYXIgaXMgJ1xcXFwnXG4gICAgICAgICAgICAgICAgIyBJZ25vcmUgbmV4dCBjaGFyYWN0ZXJcbiAgICAgICAgICAgICAgICBjbGVhbmVkUmVnZXggKz0gcmF3UmVnZXhbaS4uaSsxXVxuICAgICAgICAgICAgICAgIGkrK1xuICAgICAgICAgICAgZWxzZSBpZiBjaGFyIGlzICcoJ1xuICAgICAgICAgICAgICAgICMgSW5jcmVhc2UgYnJhY2tldCBudW1iZXIsIG9ubHkgaWYgaXQgaXMgY2FwdHVyaW5nXG4gICAgICAgICAgICAgICAgaWYgaSA8IGxlbiAtIDJcbiAgICAgICAgICAgICAgICAgICAgcGFydCA9IHJhd1JlZ2V4W2kuLmkrMl1cbiAgICAgICAgICAgICAgICAgICAgaWYgcGFydCBpcyAnKD86J1xuICAgICAgICAgICAgICAgICAgICAgICAgIyBOb24tY2FwdHVyaW5nIGJyYWNrZXRcbiAgICAgICAgICAgICAgICAgICAgICAgIGkgKz0gMlxuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYW5lZFJlZ2V4ICs9IHBhcnRcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiBwYXJ0IGlzICcoPzwnXG4gICAgICAgICAgICAgICAgICAgICAgICAjIENhcHR1cmluZyBicmFja2V0IHdpdGggcG9zc2libHkgYSBuYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0dXJpbmdCcmFja2V0TnVtYmVyKytcbiAgICAgICAgICAgICAgICAgICAgICAgIGkgKz0gMlxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZSA9ICcnXG4gICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSBpICsgMSA8IGxlblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YkNoYXIgPSByYXdSZWdleC5jaGFyQXQoaSArIDEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgc3ViQ2hhciBpcyAnPidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xlYW5lZFJlZ2V4ICs9ICcoJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpKytcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgbmFtZS5sZW5ndGggPiAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAjIEFzc29jaWF0ZSBhIG5hbWUgd2l0aCBhIGNhcHR1cmluZyBicmFja2V0IG51bWJlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwcGluZyA/PSB7fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwcGluZ1tuYW1lXSA9IGNhcHR1cmluZ0JyYWNrZXROdW1iZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWUgKz0gc3ViQ2hhclxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaSsrXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFuZWRSZWdleCArPSBjaGFyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0dXJpbmdCcmFja2V0TnVtYmVyKytcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIGNsZWFuZWRSZWdleCArPSBjaGFyXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgY2xlYW5lZFJlZ2V4ICs9IGNoYXJcblxuICAgICAgICAgICAgaSsrXG5cbiAgICAgICAgQHJhd1JlZ2V4ID0gcmF3UmVnZXhcbiAgICAgICAgQGNsZWFuZWRSZWdleCA9IGNsZWFuZWRSZWdleFxuICAgICAgICBAcmVnZXggPSBuZXcgUmVnRXhwIEBjbGVhbmVkUmVnZXgsICdnJyttb2RpZmllcnMucmVwbGFjZSgnZycsICcnKVxuICAgICAgICBAbWFwcGluZyA9IG1hcHBpbmdcblxuXG4gICAgIyBFeGVjdXRlcyB0aGUgcGF0dGVybidzIHJlZ2V4IGFuZCByZXR1cm5zIHRoZSBtYXRjaGluZyB2YWx1ZXNcbiAgICAjXG4gICAgIyBAcGFyYW0gW1N0cmluZ10gc3RyIFRoZSBzdHJpbmcgdG8gdXNlIHRvIGV4ZWN1dGUgdGhlIHBhdHRlcm5cbiAgICAjXG4gICAgIyBAcmV0dXJuIFtBcnJheV0gVGhlIG1hdGNoaW5nIHZhbHVlcyBleHRyYWN0ZWQgZnJvbSBjYXB0dXJpbmcgYnJhY2tldHMgb3IgbnVsbCBpZiBub3RoaW5nIG1hdGNoZWRcbiAgICAjXG4gICAgZXhlYzogKHN0cikgLT5cbiAgICAgICAgQHJlZ2V4Lmxhc3RJbmRleCA9IDBcbiAgICAgICAgbWF0Y2hlcyA9IEByZWdleC5leGVjIHN0clxuXG4gICAgICAgIGlmIG5vdCBtYXRjaGVzP1xuICAgICAgICAgICAgcmV0dXJuIG51bGxcblxuICAgICAgICBpZiBAbWFwcGluZz9cbiAgICAgICAgICAgIGZvciBuYW1lLCBpbmRleCBvZiBAbWFwcGluZ1xuICAgICAgICAgICAgICAgIG1hdGNoZXNbbmFtZV0gPSBtYXRjaGVzW2luZGV4XVxuXG4gICAgICAgIHJldHVybiBtYXRjaGVzXG5cblxuICAgICMgVGVzdHMgdGhlIHBhdHRlcm4ncyByZWdleFxuICAgICNcbiAgICAjIEBwYXJhbSBbU3RyaW5nXSBzdHIgVGhlIHN0cmluZyB0byB1c2UgdG8gdGVzdCB0aGUgcGF0dGVyblxuICAgICNcbiAgICAjIEByZXR1cm4gW0Jvb2xlYW5dIHRydWUgaWYgdGhlIHN0cmluZyBtYXRjaGVkXG4gICAgI1xuICAgIHRlc3Q6IChzdHIpIC0+XG4gICAgICAgIEByZWdleC5sYXN0SW5kZXggPSAwXG4gICAgICAgIHJldHVybiBAcmVnZXgudGVzdCBzdHJcblxuXG4gICAgIyBSZXBsYWNlcyBvY2N1cmVuY2VzIG1hdGNoaW5nIHdpdGggdGhlIHBhdHRlcm4ncyByZWdleCB3aXRoIHJlcGxhY2VtZW50XG4gICAgI1xuICAgICMgQHBhcmFtIFtTdHJpbmddIHN0ciBUaGUgc291cmNlIHN0cmluZyB0byBwZXJmb3JtIHJlcGxhY2VtZW50c1xuICAgICMgQHBhcmFtIFtTdHJpbmddIHJlcGxhY2VtZW50IFRoZSBzdHJpbmcgdG8gdXNlIGluIHBsYWNlIG9mIGVhY2ggcmVwbGFjZWQgb2NjdXJlbmNlLlxuICAgICNcbiAgICAjIEByZXR1cm4gW1N0cmluZ10gVGhlIHJlcGxhY2VkIHN0cmluZ1xuICAgICNcbiAgICByZXBsYWNlOiAoc3RyLCByZXBsYWNlbWVudCkgLT5cbiAgICAgICAgQHJlZ2V4Lmxhc3RJbmRleCA9IDBcbiAgICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlIEByZWdleCwgcmVwbGFjZW1lbnRcblxuXG4gICAgIyBSZXBsYWNlcyBvY2N1cmVuY2VzIG1hdGNoaW5nIHdpdGggdGhlIHBhdHRlcm4ncyByZWdleCB3aXRoIHJlcGxhY2VtZW50IGFuZFxuICAgICMgZ2V0IGJvdGggdGhlIHJlcGxhY2VkIHN0cmluZyBhbmQgdGhlIG51bWJlciBvZiByZXBsYWNlZCBvY2N1cmVuY2VzIGluIHRoZSBzdHJpbmcuXG4gICAgI1xuICAgICMgQHBhcmFtIFtTdHJpbmddIHN0ciBUaGUgc291cmNlIHN0cmluZyB0byBwZXJmb3JtIHJlcGxhY2VtZW50c1xuICAgICMgQHBhcmFtIFtTdHJpbmddIHJlcGxhY2VtZW50IFRoZSBzdHJpbmcgdG8gdXNlIGluIHBsYWNlIG9mIGVhY2ggcmVwbGFjZWQgb2NjdXJlbmNlLlxuICAgICMgQHBhcmFtIFtJbnRlZ2VyXSBsaW1pdCBUaGUgbWF4aW11bSBudW1iZXIgb2Ygb2NjdXJlbmNlcyB0byByZXBsYWNlICgwIG1lYW5zIGluZmluaXRlIG51bWJlciBvZiBvY2N1cmVuY2VzKVxuICAgICNcbiAgICAjIEByZXR1cm4gW0FycmF5XSBBIGRlc3RydWN0dXJhYmxlIGFycmF5IGNvbnRhaW5pbmcgdGhlIHJlcGxhY2VkIHN0cmluZyBhbmQgdGhlIG51bWJlciBvZiByZXBsYWNlZCBvY2N1cmVuY2VzLiBGb3IgaW5zdGFuY2U6IFtcIm15IHJlcGxhY2VkIHN0cmluZ1wiLCAyXVxuICAgICNcbiAgICByZXBsYWNlQWxsOiAoc3RyLCByZXBsYWNlbWVudCwgbGltaXQgPSAwKSAtPlxuICAgICAgICBAcmVnZXgubGFzdEluZGV4ID0gMFxuICAgICAgICBjb3VudCA9IDBcbiAgICAgICAgd2hpbGUgQHJlZ2V4LnRlc3Qoc3RyKSBhbmQgKGxpbWl0IGlzIDAgb3IgY291bnQgPCBsaW1pdClcbiAgICAgICAgICAgIEByZWdleC5sYXN0SW5kZXggPSAwXG4gICAgICAgICAgICBzdHIgPSBzdHIucmVwbGFjZSBAcmVnZXgsICcnXG4gICAgICAgICAgICBjb3VudCsrXG4gICAgICAgIFxuICAgICAgICByZXR1cm4gW3N0ciwgY291bnRdXG5cblxubW9kdWxlLmV4cG9ydHMgPSBQYXR0ZXJuXG5cbiIsIlxuVXRpbHMgICA9IHJlcXVpcmUgJy4vVXRpbHMnXG5QYXR0ZXJuID0gcmVxdWlyZSAnLi9QYXR0ZXJuJ1xuXG4jIFVuZXNjYXBlciBlbmNhcHN1bGF0ZXMgdW5lc2NhcGluZyBydWxlcyBmb3Igc2luZ2xlIGFuZCBkb3VibGUtcXVvdGVkIFlBTUwgc3RyaW5ncy5cbiNcbmNsYXNzIFVuZXNjYXBlclxuXG4gICAgIyBSZWdleCBmcmFnbWVudCB0aGF0IG1hdGNoZXMgYW4gZXNjYXBlZCBjaGFyYWN0ZXIgaW5cbiAgICAjIGEgZG91YmxlIHF1b3RlZCBzdHJpbmcuXG4gICAgQFBBVFRFUk5fRVNDQVBFRF9DSEFSQUNURVI6ICAgICBuZXcgUGF0dGVybiAnXFxcXFxcXFwoWzBhYnRcXHRudmZyZSBcIlxcXFwvXFxcXFxcXFxOX0xQXXx4WzAtOWEtZkEtRl17Mn18dVswLTlhLWZBLUZdezR9fFVbMC05YS1mQS1GXXs4fSknO1xuXG5cbiAgICAjIFVuZXNjYXBlcyBhIHNpbmdsZSBxdW90ZWQgc3RyaW5nLlxuICAgICNcbiAgICAjIEBwYXJhbSBbU3RyaW5nXSAgICAgICB2YWx1ZSBBIHNpbmdsZSBxdW90ZWQgc3RyaW5nLlxuICAgICNcbiAgICAjIEByZXR1cm4gW1N0cmluZ10gICAgICBUaGUgdW5lc2NhcGVkIHN0cmluZy5cbiAgICAjXG4gICAgQHVuZXNjYXBlU2luZ2xlUXVvdGVkU3RyaW5nOiAodmFsdWUpIC0+XG4gICAgICAgIHJldHVybiB2YWx1ZS5yZXBsYWNlKCdcXCdcXCcnLCAnXFwnJylcblxuXG4gICAgIyBVbmVzY2FwZXMgYSBkb3VibGUgcXVvdGVkIHN0cmluZy5cbiAgICAjXG4gICAgIyBAcGFyYW0gW1N0cmluZ10gICAgICAgdmFsdWUgQSBkb3VibGUgcXVvdGVkIHN0cmluZy5cbiAgICAjXG4gICAgIyBAcmV0dXJuIFtTdHJpbmddICAgICAgVGhlIHVuZXNjYXBlZCBzdHJpbmcuXG4gICAgI1xuICAgIEB1bmVzY2FwZURvdWJsZVF1b3RlZFN0cmluZzogKHZhbHVlKSAtPlxuICAgICAgICBAX3VuZXNjYXBlQ2FsbGJhY2sgPz0gKHN0cikgPT5cbiAgICAgICAgICAgIHJldHVybiBAdW5lc2NhcGVDaGFyYWN0ZXIoc3RyKVxuXG4gICAgICAgICMgRXZhbHVhdGUgdGhlIHN0cmluZ1xuICAgICAgICByZXR1cm4gQFBBVFRFUk5fRVNDQVBFRF9DSEFSQUNURVIucmVwbGFjZSB2YWx1ZSwgQF91bmVzY2FwZUNhbGxiYWNrXG5cblxuICAgICMgVW5lc2NhcGVzIGEgY2hhcmFjdGVyIHRoYXQgd2FzIGZvdW5kIGluIGEgZG91YmxlLXF1b3RlZCBzdHJpbmdcbiAgICAjXG4gICAgIyBAcGFyYW0gW1N0cmluZ10gICAgICAgdmFsdWUgQW4gZXNjYXBlZCBjaGFyYWN0ZXJcbiAgICAjXG4gICAgIyBAcmV0dXJuIFtTdHJpbmddICAgICAgVGhlIHVuZXNjYXBlZCBjaGFyYWN0ZXJcbiAgICAjXG4gICAgQHVuZXNjYXBlQ2hhcmFjdGVyOiAodmFsdWUpIC0+XG4gICAgICAgIGNoID0gU3RyaW5nLmZyb21DaGFyQ29kZVxuICAgICAgICBzd2l0Y2ggdmFsdWUuY2hhckF0KDEpXG4gICAgICAgICAgICB3aGVuICcwJ1xuICAgICAgICAgICAgICAgIHJldHVybiBjaCgwKVxuICAgICAgICAgICAgd2hlbiAnYSdcbiAgICAgICAgICAgICAgICByZXR1cm4gY2goNylcbiAgICAgICAgICAgIHdoZW4gJ2InXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNoKDgpXG4gICAgICAgICAgICB3aGVuICd0J1xuICAgICAgICAgICAgICAgIHJldHVybiBcIlxcdFwiXG4gICAgICAgICAgICB3aGVuIFwiXFx0XCJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJcXHRcIlxuICAgICAgICAgICAgd2hlbiAnbidcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJcXG5cIlxuICAgICAgICAgICAgd2hlbiAndidcbiAgICAgICAgICAgICAgICByZXR1cm4gY2goMTEpXG4gICAgICAgICAgICB3aGVuICdmJ1xuICAgICAgICAgICAgICAgIHJldHVybiBjaCgxMilcbiAgICAgICAgICAgIHdoZW4gJ3InXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNoKDEzKVxuICAgICAgICAgICAgd2hlbiAnZSdcbiAgICAgICAgICAgICAgICByZXR1cm4gY2goMjcpXG4gICAgICAgICAgICB3aGVuICcgJ1xuICAgICAgICAgICAgICAgIHJldHVybiAnICdcbiAgICAgICAgICAgIHdoZW4gJ1wiJ1xuICAgICAgICAgICAgICAgIHJldHVybiAnXCInXG4gICAgICAgICAgICB3aGVuICcvJ1xuICAgICAgICAgICAgICAgIHJldHVybiAnLydcbiAgICAgICAgICAgIHdoZW4gJ1xcXFwnXG4gICAgICAgICAgICAgICAgcmV0dXJuICdcXFxcJ1xuICAgICAgICAgICAgd2hlbiAnTidcbiAgICAgICAgICAgICAgICAjIFUrMDA4NSBORVhUIExJTkVcbiAgICAgICAgICAgICAgICByZXR1cm4gY2goMHgwMDg1KVxuICAgICAgICAgICAgd2hlbiAnXydcbiAgICAgICAgICAgICAgICAjIFUrMDBBMCBOTy1CUkVBSyBTUEFDRVxuICAgICAgICAgICAgICAgIHJldHVybiBjaCgweDAwQTApXG4gICAgICAgICAgICB3aGVuICdMJ1xuICAgICAgICAgICAgICAgICMgVSsyMDI4IExJTkUgU0VQQVJBVE9SXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNoKDB4MjAyOClcbiAgICAgICAgICAgIHdoZW4gJ1AnXG4gICAgICAgICAgICAgICAgIyBVKzIwMjkgUEFSQUdSQVBIIFNFUEFSQVRPUlxuICAgICAgICAgICAgICAgIHJldHVybiBjaCgweDIwMjkpXG4gICAgICAgICAgICB3aGVuICd4J1xuICAgICAgICAgICAgICAgIHJldHVybiBVdGlscy51dGY4Y2hyKFV0aWxzLmhleERlYyh2YWx1ZS5zdWJzdHIoMiwgMikpKVxuICAgICAgICAgICAgd2hlbiAndSdcbiAgICAgICAgICAgICAgICByZXR1cm4gVXRpbHMudXRmOGNocihVdGlscy5oZXhEZWModmFsdWUuc3Vic3RyKDIsIDQpKSlcbiAgICAgICAgICAgIHdoZW4gJ1UnXG4gICAgICAgICAgICAgICAgcmV0dXJuIFV0aWxzLnV0ZjhjaHIoVXRpbHMuaGV4RGVjKHZhbHVlLnN1YnN0cigyLCA4KSkpXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmV0dXJuICcnXG5cbm1vZHVsZS5leHBvcnRzID0gVW5lc2NhcGVyXG4iLCJcblBhdHRlcm4gPSByZXF1aXJlICcuL1BhdHRlcm4nXG5cbiMgQSBidW5jaCBvZiB1dGlsaXR5IG1ldGhvZHNcbiNcbmNsYXNzIFV0aWxzXG5cbiAgICBAUkVHRVhfTEVGVF9UUklNX0JZX0NIQVI6ICAge31cbiAgICBAUkVHRVhfUklHSFRfVFJJTV9CWV9DSEFSOiAge31cbiAgICBAUkVHRVhfU1BBQ0VTOiAgICAgICAgICAgICAgL1xccysvZ1xuICAgIEBSRUdFWF9ESUdJVFM6ICAgICAgICAgICAgICAvXlxcZCskL1xuICAgIEBSRUdFWF9PQ1RBTDogICAgICAgICAgICAgICAvW14wLTddL2dpXG4gICAgQFJFR0VYX0hFWEFERUNJTUFMOiAgICAgICAgIC9bXmEtZjAtOV0vZ2lcblxuICAgICMgUHJlY29tcGlsZWQgZGF0ZSBwYXR0ZXJuXG4gICAgQFBBVFRFUk5fREFURTogICAgICAgICAgICAgIG5ldyBQYXR0ZXJuICdeJytcbiAgICAgICAgICAgICcoPzx5ZWFyPlswLTldWzAtOV1bMC05XVswLTldKScrXG4gICAgICAgICAgICAnLSg/PG1vbnRoPlswLTldWzAtOV0/KScrXG4gICAgICAgICAgICAnLSg/PGRheT5bMC05XVswLTldPyknK1xuICAgICAgICAgICAgJyg/Oig/OltUdF18WyBcXHRdKyknK1xuICAgICAgICAgICAgJyg/PGhvdXI+WzAtOV1bMC05XT8pJytcbiAgICAgICAgICAgICc6KD88bWludXRlPlswLTldWzAtOV0pJytcbiAgICAgICAgICAgICc6KD88c2Vjb25kPlswLTldWzAtOV0pJytcbiAgICAgICAgICAgICcoPzpcXC4oPzxmcmFjdGlvbj5bMC05XSopKT8nK1xuICAgICAgICAgICAgJyg/OlsgXFx0XSooPzx0ej5afCg/PHR6X3NpZ24+Wy0rXSkoPzx0el9ob3VyPlswLTldWzAtOV0/KScrXG4gICAgICAgICAgICAnKD86Oig/PHR6X21pbnV0ZT5bMC05XVswLTldKSk/KSk/KT8nK1xuICAgICAgICAgICAgJyQnLCAnaSdcblxuICAgICMgTG9jYWwgdGltZXpvbmUgb2Zmc2V0IGluIG1zXG4gICAgQExPQ0FMX1RJTUVaT05FX09GRlNFVDogICAgIG5ldyBEYXRlKCkuZ2V0VGltZXpvbmVPZmZzZXQoKSAqIDYwICogMTAwMFxuXG4gICAgIyBUcmltcyB0aGUgZ2l2ZW4gc3RyaW5nIG9uIGJvdGggc2lkZXNcbiAgICAjXG4gICAgIyBAcGFyYW0gW1N0cmluZ10gc3RyIFRoZSBzdHJpbmcgdG8gdHJpbVxuICAgICMgQHBhcmFtIFtTdHJpbmddIGNoYXIgVGhlIGNoYXJhY3RlciB0byB1c2UgZm9yIHRyaW1taW5nIChkZWZhdWx0OiAnXFxcXHMnKVxuICAgICNcbiAgICAjIEByZXR1cm4gW1N0cmluZ10gQSB0cmltbWVkIHN0cmluZ1xuICAgICNcbiAgICBAdHJpbTogKHN0ciwgY2hhciA9ICdcXFxccycpIC0+XG4gICAgICAgIHJldHVybiBzdHIudHJpbSgpXG4gICAgICAgIHJlZ2V4TGVmdCA9IEBSRUdFWF9MRUZUX1RSSU1fQllfQ0hBUltjaGFyXVxuICAgICAgICB1bmxlc3MgcmVnZXhMZWZ0P1xuICAgICAgICAgICAgQFJFR0VYX0xFRlRfVFJJTV9CWV9DSEFSW2NoYXJdID0gcmVnZXhMZWZ0ID0gbmV3IFJlZ0V4cCAnXicrY2hhcisnJytjaGFyKycqJ1xuICAgICAgICByZWdleExlZnQubGFzdEluZGV4ID0gMFxuICAgICAgICByZWdleFJpZ2h0ID0gQFJFR0VYX1JJR0hUX1RSSU1fQllfQ0hBUltjaGFyXVxuICAgICAgICB1bmxlc3MgcmVnZXhSaWdodD9cbiAgICAgICAgICAgIEBSRUdFWF9SSUdIVF9UUklNX0JZX0NIQVJbY2hhcl0gPSByZWdleFJpZ2h0ID0gbmV3IFJlZ0V4cCBjaGFyKycnK2NoYXIrJyokJ1xuICAgICAgICByZWdleFJpZ2h0Lmxhc3RJbmRleCA9IDBcbiAgICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlKHJlZ2V4TGVmdCwgJycpLnJlcGxhY2UocmVnZXhSaWdodCwgJycpXG5cblxuICAgICMgVHJpbXMgdGhlIGdpdmVuIHN0cmluZyBvbiB0aGUgbGVmdCBzaWRlXG4gICAgI1xuICAgICMgQHBhcmFtIFtTdHJpbmddIHN0ciBUaGUgc3RyaW5nIHRvIHRyaW1cbiAgICAjIEBwYXJhbSBbU3RyaW5nXSBjaGFyIFRoZSBjaGFyYWN0ZXIgdG8gdXNlIGZvciB0cmltbWluZyAoZGVmYXVsdDogJ1xcXFxzJylcbiAgICAjXG4gICAgIyBAcmV0dXJuIFtTdHJpbmddIEEgdHJpbW1lZCBzdHJpbmdcbiAgICAjXG4gICAgQGx0cmltOiAoc3RyLCBjaGFyID0gJ1xcXFxzJykgLT5cbiAgICAgICAgcmVnZXhMZWZ0ID0gQFJFR0VYX0xFRlRfVFJJTV9CWV9DSEFSW2NoYXJdXG4gICAgICAgIHVubGVzcyByZWdleExlZnQ/XG4gICAgICAgICAgICBAUkVHRVhfTEVGVF9UUklNX0JZX0NIQVJbY2hhcl0gPSByZWdleExlZnQgPSBuZXcgUmVnRXhwICdeJytjaGFyKycnK2NoYXIrJyonXG4gICAgICAgIHJlZ2V4TGVmdC5sYXN0SW5kZXggPSAwXG4gICAgICAgIHJldHVybiBzdHIucmVwbGFjZShyZWdleExlZnQsICcnKVxuXG5cbiAgICAjIFRyaW1zIHRoZSBnaXZlbiBzdHJpbmcgb24gdGhlIHJpZ2h0IHNpZGVcbiAgICAjXG4gICAgIyBAcGFyYW0gW1N0cmluZ10gc3RyIFRoZSBzdHJpbmcgdG8gdHJpbVxuICAgICMgQHBhcmFtIFtTdHJpbmddIGNoYXIgVGhlIGNoYXJhY3RlciB0byB1c2UgZm9yIHRyaW1taW5nIChkZWZhdWx0OiAnXFxcXHMnKVxuICAgICNcbiAgICAjIEByZXR1cm4gW1N0cmluZ10gQSB0cmltbWVkIHN0cmluZ1xuICAgICNcbiAgICBAcnRyaW06IChzdHIsIGNoYXIgPSAnXFxcXHMnKSAtPlxuICAgICAgICByZWdleFJpZ2h0ID0gQFJFR0VYX1JJR0hUX1RSSU1fQllfQ0hBUltjaGFyXVxuICAgICAgICB1bmxlc3MgcmVnZXhSaWdodD9cbiAgICAgICAgICAgIEBSRUdFWF9SSUdIVF9UUklNX0JZX0NIQVJbY2hhcl0gPSByZWdleFJpZ2h0ID0gbmV3IFJlZ0V4cCBjaGFyKycnK2NoYXIrJyokJ1xuICAgICAgICByZWdleFJpZ2h0Lmxhc3RJbmRleCA9IDBcbiAgICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlKHJlZ2V4UmlnaHQsICcnKVxuXG5cbiAgICAjIENoZWNrcyBpZiB0aGUgZ2l2ZW4gdmFsdWUgaXMgZW1wdHkgKG51bGwsIHVuZGVmaW5lZCwgZW1wdHkgc3RyaW5nLCBzdHJpbmcgJzAnKVxuICAgICNcbiAgICAjIEBwYXJhbSBbT2JqZWN0XSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2tcbiAgICAjXG4gICAgIyBAcmV0dXJuIFtCb29sZWFuXSB0cnVlIGlmIHRoZSB2YWx1ZSBpcyBlbXB0eVxuICAgICNcbiAgICBAaXNFbXB0eTogKHZhbHVlKSAtPlxuICAgICAgICByZXR1cm4gbm90KHZhbHVlKSBvciB2YWx1ZSBpcyAnJyBvciB2YWx1ZSBpcyAnMCdcblxuXG4gICAgIyBDb3VudHMgdGhlIG51bWJlciBvZiBvY2N1cmVuY2VzIG9mIHN1YlN0cmluZyBpbnNpZGUgc3RyaW5nXG4gICAgI1xuICAgICMgQHBhcmFtIFtTdHJpbmddIHN0cmluZyBUaGUgc3RyaW5nIHdoZXJlIHRvIGNvdW50IG9jY3VyZW5jZXNcbiAgICAjIEBwYXJhbSBbU3RyaW5nXSBzdWJTdHJpbmcgVGhlIHN1YlN0cmluZyB0byBjb3VudFxuICAgICMgQHBhcmFtIFtJbnRlZ2VyXSBzdGFydCBUaGUgc3RhcnQgaW5kZXhcbiAgICAjIEBwYXJhbSBbSW50ZWdlcl0gbGVuZ3RoIFRoZSBzdHJpbmcgbGVuZ3RoIHVudGlsIHdoZXJlIHRvIGNvdW50XG4gICAgI1xuICAgICMgQHJldHVybiBbSW50ZWdlcl0gVGhlIG51bWJlciBvZiBvY2N1cmVuY2VzXG4gICAgI1xuICAgIEBzdWJTdHJDb3VudDogKHN0cmluZywgc3ViU3RyaW5nLCBzdGFydCwgbGVuZ3RoKSAtPlxuICAgICAgICBjID0gMFxuICAgICAgICBcbiAgICAgICAgc3RyaW5nID0gJycgKyBzdHJpbmdcbiAgICAgICAgc3ViU3RyaW5nID0gJycgKyBzdWJTdHJpbmdcbiAgICAgICAgXG4gICAgICAgIGlmIHN0YXJ0P1xuICAgICAgICAgICAgc3RyaW5nID0gc3RyaW5nW3N0YXJ0Li5dXG4gICAgICAgIGlmIGxlbmd0aD9cbiAgICAgICAgICAgIHN0cmluZyA9IHN0cmluZ1swLi4ubGVuZ3RoXVxuICAgICAgICBcbiAgICAgICAgbGVuID0gc3RyaW5nLmxlbmd0aFxuICAgICAgICBzdWJsZW4gPSBzdWJTdHJpbmcubGVuZ3RoXG4gICAgICAgIGZvciBpIGluIFswLi4ubGVuXVxuICAgICAgICAgICAgaWYgc3ViU3RyaW5nIGlzIHN0cmluZ1tpLi4uc3VibGVuXVxuICAgICAgICAgICAgICAgIGMrK1xuICAgICAgICAgICAgICAgIGkgKz0gc3VibGVuIC0gMVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGNcblxuXG4gICAgIyBSZXR1cm5zIHRydWUgaWYgaW5wdXQgaXMgb25seSBjb21wb3NlZCBvZiBkaWdpdHNcbiAgICAjXG4gICAgIyBAcGFyYW0gW09iamVjdF0gaW5wdXQgVGhlIHZhbHVlIHRvIHRlc3RcbiAgICAjXG4gICAgIyBAcmV0dXJuIFtCb29sZWFuXSB0cnVlIGlmIGlucHV0IGlzIG9ubHkgY29tcG9zZWQgb2YgZGlnaXRzXG4gICAgI1xuICAgIEBpc0RpZ2l0czogKGlucHV0KSAtPlxuICAgICAgICBAUkVHRVhfRElHSVRTLmxhc3RJbmRleCA9IDBcbiAgICAgICAgcmV0dXJuIEBSRUdFWF9ESUdJVFMudGVzdCBpbnB1dFxuXG5cbiAgICAjIERlY29kZSBvY3RhbCB2YWx1ZVxuICAgICNcbiAgICAjIEBwYXJhbSBbU3RyaW5nXSBpbnB1dCBUaGUgdmFsdWUgdG8gZGVjb2RlXG4gICAgI1xuICAgICMgQHJldHVybiBbSW50ZWdlcl0gVGhlIGRlY29kZWQgdmFsdWVcbiAgICAjXG4gICAgQG9jdERlYzogKGlucHV0KSAtPlxuICAgICAgICBAUkVHRVhfT0NUQUwubGFzdEluZGV4ID0gMFxuICAgICAgICByZXR1cm4gcGFyc2VJbnQoKGlucHV0KycnKS5yZXBsYWNlKEBSRUdFWF9PQ1RBTCwgJycpLCA4KVxuXG5cbiAgICAjIERlY29kZSBoZXhhZGVjaW1hbCB2YWx1ZVxuICAgICNcbiAgICAjIEBwYXJhbSBbU3RyaW5nXSBpbnB1dCBUaGUgdmFsdWUgdG8gZGVjb2RlXG4gICAgI1xuICAgICMgQHJldHVybiBbSW50ZWdlcl0gVGhlIGRlY29kZWQgdmFsdWVcbiAgICAjXG4gICAgQGhleERlYzogKGlucHV0KSAtPlxuICAgICAgICBAUkVHRVhfSEVYQURFQ0lNQUwubGFzdEluZGV4ID0gMFxuICAgICAgICBpbnB1dCA9IEB0cmltKGlucHV0KVxuICAgICAgICBpZiAoaW5wdXQrJycpWzAuLi4yXSBpcyAnMHgnIHRoZW4gaW5wdXQgPSAoaW5wdXQrJycpWzIuLl1cbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KChpbnB1dCsnJykucmVwbGFjZShAUkVHRVhfSEVYQURFQ0lNQUwsICcnKSwgMTYpXG5cblxuICAgICMgR2V0IHRoZSBVVEYtOCBjaGFyYWN0ZXIgZm9yIHRoZSBnaXZlbiBjb2RlIHBvaW50LlxuICAgICNcbiAgICAjIEBwYXJhbSBbSW50ZWdlcl0gYyBUaGUgdW5pY29kZSBjb2RlIHBvaW50XG4gICAgI1xuICAgICMgQHJldHVybiBbU3RyaW5nXSBUaGUgY29ycmVzcG9uZGluZyBVVEYtOCBjaGFyYWN0ZXJcbiAgICAjXG4gICAgQHV0ZjhjaHI6IChjKSAtPlxuICAgICAgICBjaCA9IFN0cmluZy5mcm9tQ2hhckNvZGVcbiAgICAgICAgaWYgMHg4MCA+IChjICU9IDB4MjAwMDAwKVxuICAgICAgICAgICAgcmV0dXJuIGNoKGMpXG4gICAgICAgIGlmIDB4ODAwID4gY1xuICAgICAgICAgICAgcmV0dXJuIGNoKDB4QzAgfCBjPj42KSArIGNoKDB4ODAgfCBjICYgMHgzRilcbiAgICAgICAgaWYgMHgxMDAwMCA+IGNcbiAgICAgICAgICAgIHJldHVybiBjaCgweEUwIHwgYz4+MTIpICsgY2goMHg4MCB8IGM+PjYgJiAweDNGKSArIGNoKDB4ODAgfCBjICYgMHgzRilcblxuICAgICAgICByZXR1cm4gY2goMHhGMCB8IGM+PjE4KSArIGNoKDB4ODAgfCBjPj4xMiAmIDB4M0YpICsgY2goMHg4MCB8IGM+PjYgJiAweDNGKSArIGNoKDB4ODAgfCBjICYgMHgzRilcblxuXG4gICAgIyBSZXR1cm5zIHRoZSBib29sZWFuIHZhbHVlIGVxdWl2YWxlbnQgdG8gdGhlIGdpdmVuIGlucHV0XG4gICAgI1xuICAgICMgQHBhcmFtIFtTdHJpbmd8T2JqZWN0XSAgICBpbnB1dCAgICAgICBUaGUgaW5wdXQgdmFsdWVcbiAgICAjIEBwYXJhbSBbQm9vbGVhbl0gICAgICAgICAgc3RyaWN0ICAgICAgSWYgc2V0IHRvIGZhbHNlLCBhY2NlcHQgJ3llcycgYW5kICdubycgYXMgYm9vbGVhbiB2YWx1ZXNcbiAgICAjXG4gICAgIyBAcmV0dXJuIFtCb29sZWFuXSAgICAgICAgIHRoZSBib29sZWFuIHZhbHVlXG4gICAgI1xuICAgIEBwYXJzZUJvb2xlYW46IChpbnB1dCwgc3RyaWN0ID0gdHJ1ZSkgLT5cbiAgICAgICAgaWYgdHlwZW9mKGlucHV0KSBpcyAnc3RyaW5nJ1xuICAgICAgICAgICAgbG93ZXJJbnB1dCA9IGlucHV0LnRvTG93ZXJDYXNlKClcbiAgICAgICAgICAgIGlmIG5vdCBzdHJpY3RcbiAgICAgICAgICAgICAgICBpZiBsb3dlcklucHV0IGlzICdubycgdGhlbiByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIGlmIGxvd2VySW5wdXQgaXMgJzAnIHRoZW4gcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICBpZiBsb3dlcklucHV0IGlzICdmYWxzZScgdGhlbiByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIGlmIGxvd2VySW5wdXQgaXMgJycgdGhlbiByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIHJldHVybiAhIWlucHV0XG5cblxuXG4gICAgIyBSZXR1cm5zIHRydWUgaWYgaW5wdXQgaXMgbnVtZXJpY1xuICAgICNcbiAgICAjIEBwYXJhbSBbT2JqZWN0XSBpbnB1dCBUaGUgdmFsdWUgdG8gdGVzdFxuICAgICNcbiAgICAjIEByZXR1cm4gW0Jvb2xlYW5dIHRydWUgaWYgaW5wdXQgaXMgbnVtZXJpY1xuICAgICNcbiAgICBAaXNOdW1lcmljOiAoaW5wdXQpIC0+XG4gICAgICAgIEBSRUdFWF9TUEFDRVMubGFzdEluZGV4ID0gMFxuICAgICAgICByZXR1cm4gdHlwZW9mKGlucHV0KSBpcyAnbnVtYmVyJyBvciB0eXBlb2YoaW5wdXQpIGlzICdzdHJpbmcnIGFuZCAhaXNOYU4oaW5wdXQpIGFuZCBpbnB1dC5yZXBsYWNlKEBSRUdFWF9TUEFDRVMsICcnKSBpc250ICcnXG5cblxuICAgICMgUmV0dXJucyBhIHBhcnNlZCBkYXRlIGZyb20gdGhlIGdpdmVuIHN0cmluZ1xuICAgICNcbiAgICAjIEBwYXJhbSBbU3RyaW5nXSBzdHIgVGhlIGRhdGUgc3RyaW5nIHRvIHBhcnNlXG4gICAgI1xuICAgICMgQHJldHVybiBbRGF0ZV0gVGhlIHBhcnNlZCBkYXRlIG9yIG51bGwgaWYgcGFyc2luZyBmYWlsZWRcbiAgICAjXG4gICAgQHN0cmluZ1RvRGF0ZTogKHN0cikgLT5cbiAgICAgICAgdW5sZXNzIHN0cj8ubGVuZ3RoXG4gICAgICAgICAgICByZXR1cm4gbnVsbFxuXG4gICAgICAgICMgUGVyZm9ybSByZWd1bGFyIGV4cHJlc3Npb24gcGF0dGVyblxuICAgICAgICBpbmZvID0gQFBBVFRFUk5fREFURS5leGVjIHN0clxuICAgICAgICB1bmxlc3MgaW5mb1xuICAgICAgICAgICAgcmV0dXJuIG51bGxcblxuICAgICAgICAjIEV4dHJhY3QgeWVhciwgbW9udGgsIGRheVxuICAgICAgICB5ZWFyID0gcGFyc2VJbnQgaW5mby55ZWFyLCAxMFxuICAgICAgICBtb250aCA9IHBhcnNlSW50KGluZm8ubW9udGgsIDEwKSAtIDEgIyBJbiBqYXZhc2NyaXB0LCBqYW51YXJ5IGlzIDAsIGZlYnJ1YXJ5IDEsIGV0Yy4uLlxuICAgICAgICBkYXkgPSBwYXJzZUludCBpbmZvLmRheSwgMTBcblxuICAgICAgICAjIElmIG5vIGhvdXIgaXMgZ2l2ZW4sIHJldHVybiBhIGRhdGUgd2l0aCBkYXkgcHJlY2lzaW9uXG4gICAgICAgIHVubGVzcyBpbmZvLmhvdXI/XG4gICAgICAgICAgICBkYXRlID0gbmV3IERhdGUgRGF0ZS5VVEMoeWVhciwgbW9udGgsIGRheSlcbiAgICAgICAgICAgIHJldHVybiBkYXRlXG5cbiAgICAgICAgIyBFeHRyYWN0IGhvdXIsIG1pbnV0ZSwgc2Vjb25kXG4gICAgICAgIGhvdXIgPSBwYXJzZUludCBpbmZvLmhvdXIsIDEwXG4gICAgICAgIG1pbnV0ZSA9IHBhcnNlSW50IGluZm8ubWludXRlLCAxMFxuICAgICAgICBzZWNvbmQgPSBwYXJzZUludCBpbmZvLnNlY29uZCwgMTBcblxuICAgICAgICAjIEV4dHJhY3QgZnJhY3Rpb24sIGlmIGdpdmVuXG4gICAgICAgIGlmIGluZm8uZnJhY3Rpb24/XG4gICAgICAgICAgICBmcmFjdGlvbiA9IGluZm8uZnJhY3Rpb25bMC4uLjNdXG4gICAgICAgICAgICB3aGlsZSBmcmFjdGlvbi5sZW5ndGggPCAzXG4gICAgICAgICAgICAgICAgZnJhY3Rpb24gKz0gJzAnXG4gICAgICAgICAgICBmcmFjdGlvbiA9IHBhcnNlSW50IGZyYWN0aW9uLCAxMFxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBmcmFjdGlvbiA9IDBcblxuICAgICAgICAjIENvbXB1dGUgdGltZXpvbmUgb2Zmc2V0IGlmIGdpdmVuXG4gICAgICAgIGlmIGluZm8udHo/XG4gICAgICAgICAgICB0el9ob3VyID0gcGFyc2VJbnQgaW5mby50el9ob3VyLCAxMFxuICAgICAgICAgICAgaWYgaW5mby50el9taW51dGU/XG4gICAgICAgICAgICAgICAgdHpfbWludXRlID0gcGFyc2VJbnQgaW5mby50el9taW51dGUsIDEwXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgdHpfbWludXRlID0gMFxuXG4gICAgICAgICAgICAjIENvbXB1dGUgdGltZXpvbmUgZGVsdGEgaW4gbXNcbiAgICAgICAgICAgIHR6X29mZnNldCA9ICh0el9ob3VyICogNjAgKyB0el9taW51dGUpICogNjAwMDBcbiAgICAgICAgICAgIGlmICctJyBpcyBpbmZvLnR6X3NpZ25cbiAgICAgICAgICAgICAgICB0el9vZmZzZXQgKj0gLTFcblxuICAgICAgICAjIENvbXB1dGUgZGF0ZVxuICAgICAgICBkYXRlID0gbmV3IERhdGUgRGF0ZS5VVEMoeWVhciwgbW9udGgsIGRheSwgaG91ciwgbWludXRlLCBzZWNvbmQsIGZyYWN0aW9uKVxuICAgICAgICBpZiB0el9vZmZzZXRcbiAgICAgICAgICAgIGRhdGUuc2V0VGltZSBkYXRlLmdldFRpbWUoKSArIHR6X29mZnNldFxuXG4gICAgICAgIHJldHVybiBkYXRlXG5cblxuICAgICMgUmVwZWF0cyB0aGUgZ2l2ZW4gc3RyaW5nIGEgbnVtYmVyIG9mIHRpbWVzXG4gICAgI1xuICAgICMgQHBhcmFtIFtTdHJpbmddICAgc3RyICAgICBUaGUgc3RyaW5nIHRvIHJlcGVhdFxuICAgICMgQHBhcmFtIFtJbnRlZ2VyXSAgbnVtYmVyICBUaGUgbnVtYmVyIG9mIHRpbWVzIHRvIHJlcGVhdCB0aGUgc3RyaW5nXG4gICAgI1xuICAgICMgQHJldHVybiBbU3RyaW5nXSAgVGhlIHJlcGVhdGVkIHN0cmluZ1xuICAgICNcbiAgICBAc3RyUmVwZWF0OiAoc3RyLCBudW1iZXIpIC0+XG4gICAgICAgIHJlcyA9ICcnXG4gICAgICAgIGkgPSAwXG4gICAgICAgIHdoaWxlIGkgPCBudW1iZXJcbiAgICAgICAgICAgIHJlcyArPSBzdHJcbiAgICAgICAgICAgIGkrK1xuICAgICAgICByZXR1cm4gcmVzXG5cblxuICAgICMgUmVhZHMgdGhlIGRhdGEgZnJvbSB0aGUgZ2l2ZW4gZmlsZSBwYXRoIGFuZCByZXR1cm5zIHRoZSByZXN1bHQgYXMgc3RyaW5nXG4gICAgI1xuICAgICMgQHBhcmFtIFtTdHJpbmddICAgcGF0aCAgICAgICAgVGhlIHBhdGggdG8gdGhlIGZpbGVcbiAgICAjIEBwYXJhbSBbRnVuY3Rpb25dIGNhbGxiYWNrICAgIEEgY2FsbGJhY2sgdG8gcmVhZCBmaWxlIGFzeW5jaHJvbm91c2x5IChvcHRpb25hbClcbiAgICAjXG4gICAgIyBAcmV0dXJuIFtTdHJpbmddICBUaGUgcmVzdWx0aW5nIGRhdGEgYXMgc3RyaW5nXG4gICAgI1xuICAgIEBnZXRTdHJpbmdGcm9tRmlsZTogKHBhdGgsIGNhbGxiYWNrID0gbnVsbCkgLT5cbiAgICAgICAgeGhyID0gbnVsbFxuICAgICAgICBpZiB3aW5kb3c/XG4gICAgICAgICAgICBpZiB3aW5kb3cuWE1MSHR0cFJlcXVlc3RcbiAgICAgICAgICAgICAgICB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKVxuICAgICAgICAgICAgZWxzZSBpZiB3aW5kb3cuQWN0aXZlWE9iamVjdFxuICAgICAgICAgICAgICAgIGZvciBuYW1lIGluIFtcIk1zeG1sMi5YTUxIVFRQLjYuMFwiLCBcIk1zeG1sMi5YTUxIVFRQLjMuMFwiLCBcIk1zeG1sMi5YTUxIVFRQXCIsIFwiTWljcm9zb2Z0LlhNTEhUVFBcIl1cbiAgICAgICAgICAgICAgICAgICAgdHJ5XG4gICAgICAgICAgICAgICAgICAgICAgICB4aHIgPSBuZXcgQWN0aXZlWE9iamVjdChuYW1lKVxuXG4gICAgICAgIGlmIHhocj9cbiAgICAgICAgICAgICMgQnJvd3NlclxuICAgICAgICAgICAgaWYgY2FsbGJhY2s/XG4gICAgICAgICAgICAgICAgIyBBc3luY1xuICAgICAgICAgICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSAtPlxuICAgICAgICAgICAgICAgICAgICBpZiB4aHIucmVhZHlTdGF0ZSBpcyA0XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiB4aHIuc3RhdHVzIGlzIDIwMCBvciB4aHIuc3RhdHVzIGlzIDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayh4aHIucmVzcG9uc2VUZXh0KVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwpXG4gICAgICAgICAgICAgICAgeGhyLm9wZW4gJ0dFVCcsIHBhdGgsIHRydWVcbiAgICAgICAgICAgICAgICB4aHIuc2VuZCBudWxsXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAjIFN5bmNcbiAgICAgICAgICAgICAgICB4aHIub3BlbiAnR0VUJywgcGF0aCwgZmFsc2VcbiAgICAgICAgICAgICAgICB4aHIuc2VuZCBudWxsXG5cbiAgICAgICAgICAgICAgICBpZiB4aHIuc3RhdHVzIGlzIDIwMCBvciB4aHIuc3RhdHVzID09IDBcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHhoci5yZXNwb25zZVRleHRcblxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgICMgTm9kZS5qcy1saWtlXG4gICAgICAgICAgICByZXEgPSByZXF1aXJlXG4gICAgICAgICAgICBmcyA9IHJlcSgnZnMnKSAjIFByZXZlbnQgYnJvd3NlcmlmeSBmcm9tIHRyeWluZyB0byBsb2FkICdmcycgbW9kdWxlXG4gICAgICAgICAgICBpZiBjYWxsYmFjaz9cbiAgICAgICAgICAgICAgICAjIEFzeW5jXG4gICAgICAgICAgICAgICAgZnMucmVhZEZpbGUgcGF0aCwgKGVyciwgZGF0YSkgLT5cbiAgICAgICAgICAgICAgICAgICAgaWYgZXJyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayBudWxsXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrIFN0cmluZyhkYXRhKVxuXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgIyBTeW5jXG4gICAgICAgICAgICAgICAgZGF0YSA9IGZzLnJlYWRGaWxlU3luYyBwYXRoXG4gICAgICAgICAgICAgICAgaWYgZGF0YT9cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFN0cmluZyhkYXRhKVxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsXG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IFV0aWxzXG4iLCJcblBhcnNlciA9IHJlcXVpcmUgJy4vUGFyc2VyJ1xuRHVtcGVyID0gcmVxdWlyZSAnLi9EdW1wZXInXG5VdGlscyAgPSByZXF1aXJlICcuL1V0aWxzJ1xuXG4jIFlhbWwgb2ZmZXJzIGNvbnZlbmllbmNlIG1ldGhvZHMgdG8gbG9hZCBhbmQgZHVtcCBZQU1MLlxuI1xuY2xhc3MgWWFtbFxuXG4gICAgIyBQYXJzZXMgWUFNTCBpbnRvIGEgSmF2YVNjcmlwdCBvYmplY3QuXG4gICAgI1xuICAgICMgVGhlIHBhcnNlIG1ldGhvZCwgd2hlbiBzdXBwbGllZCB3aXRoIGEgWUFNTCBzdHJpbmcsXG4gICAgIyB3aWxsIGRvIGl0cyBiZXN0IHRvIGNvbnZlcnQgWUFNTCBpbiBhIGZpbGUgaW50byBhIEphdmFTY3JpcHQgb2JqZWN0LlxuICAgICNcbiAgICAjICBVc2FnZTpcbiAgICAjICAgICBteU9iamVjdCA9IFlhbWwucGFyc2UoJ3NvbWU6IHlhbWwnKTtcbiAgICAjICAgICBjb25zb2xlLmxvZyhteU9iamVjdCk7XG4gICAgI1xuICAgICMgQHBhcmFtIFtTdHJpbmddICAgaW5wdXQgICAgICAgICAgICAgICAgICAgQSBzdHJpbmcgY29udGFpbmluZyBZQU1MXG4gICAgIyBAcGFyYW0gW0Jvb2xlYW5dICBleGNlcHRpb25PbkludmFsaWRUeXBlICB0cnVlIGlmIGFuIGV4Y2VwdGlvbiBtdXN0IGJlIHRocm93biBvbiBpbnZhbGlkIHR5cGVzLCBmYWxzZSBvdGhlcndpc2VcbiAgICAjIEBwYXJhbSBbRnVuY3Rpb25dIG9iamVjdERlY29kZXIgICAgICAgICAgIEEgZnVuY3Rpb24gdG8gZGVzZXJpYWxpemUgY3VzdG9tIG9iamVjdHMsIG51bGwgb3RoZXJ3aXNlXG4gICAgI1xuICAgICMgQHJldHVybiBbT2JqZWN0XSAgVGhlIFlBTUwgY29udmVydGVkIHRvIGEgSmF2YVNjcmlwdCBvYmplY3RcbiAgICAjXG4gICAgIyBAdGhyb3cgW1BhcnNlRXhjZXB0aW9uXSBJZiB0aGUgWUFNTCBpcyBub3QgdmFsaWRcbiAgICAjXG4gICAgQHBhcnNlOiAoaW5wdXQsIGV4Y2VwdGlvbk9uSW52YWxpZFR5cGUgPSBmYWxzZSwgb2JqZWN0RGVjb2RlciA9IG51bGwpIC0+XG4gICAgICAgIHJldHVybiBuZXcgUGFyc2VyKCkucGFyc2UoaW5wdXQsIGV4Y2VwdGlvbk9uSW52YWxpZFR5cGUsIG9iamVjdERlY29kZXIpXG5cblxuICAgICMgUGFyc2VzIFlBTUwgZnJvbSBmaWxlIHBhdGggaW50byBhIEphdmFTY3JpcHQgb2JqZWN0LlxuICAgICNcbiAgICAjIFRoZSBwYXJzZUZpbGUgbWV0aG9kLCB3aGVuIHN1cHBsaWVkIHdpdGggYSBZQU1MIGZpbGUsXG4gICAgIyB3aWxsIGRvIGl0cyBiZXN0IHRvIGNvbnZlcnQgWUFNTCBpbiBhIGZpbGUgaW50byBhIEphdmFTY3JpcHQgb2JqZWN0LlxuICAgICNcbiAgICAjICBVc2FnZTpcbiAgICAjICAgICBteU9iamVjdCA9IFlhbWwucGFyc2VGaWxlKCdjb25maWcueW1sJyk7XG4gICAgIyAgICAgY29uc29sZS5sb2cobXlPYmplY3QpO1xuICAgICNcbiAgICAjIEBwYXJhbSBbU3RyaW5nXSAgIHBhdGggICAgICAgICAgICAgICAgICAgIEEgZmlsZSBwYXRoIHBvaW50aW5nIHRvIGEgdmFsaWQgWUFNTCBmaWxlXG4gICAgIyBAcGFyYW0gW0Jvb2xlYW5dICBleGNlcHRpb25PbkludmFsaWRUeXBlICB0cnVlIGlmIGFuIGV4Y2VwdGlvbiBtdXN0IGJlIHRocm93biBvbiBpbnZhbGlkIHR5cGVzLCBmYWxzZSBvdGhlcndpc2VcbiAgICAjIEBwYXJhbSBbRnVuY3Rpb25dIG9iamVjdERlY29kZXIgICAgICAgICAgIEEgZnVuY3Rpb24gdG8gZGVzZXJpYWxpemUgY3VzdG9tIG9iamVjdHMsIG51bGwgb3RoZXJ3aXNlXG4gICAgI1xuICAgICMgQHJldHVybiBbT2JqZWN0XSAgVGhlIFlBTUwgY29udmVydGVkIHRvIGEgSmF2YVNjcmlwdCBvYmplY3Qgb3IgbnVsbCBpZiB0aGUgZmlsZSBkb2Vzbid0IGV4aXN0LlxuICAgICNcbiAgICAjIEB0aHJvdyBbUGFyc2VFeGNlcHRpb25dIElmIHRoZSBZQU1MIGlzIG5vdCB2YWxpZFxuICAgICNcbiAgICBAcGFyc2VGaWxlOiAocGF0aCwgY2FsbGJhY2sgPSBudWxsLCBleGNlcHRpb25PbkludmFsaWRUeXBlID0gZmFsc2UsIG9iamVjdERlY29kZXIgPSBudWxsKSAtPlxuICAgICAgICBpZiBjYWxsYmFjaz9cbiAgICAgICAgICAgICMgQXN5bmNcbiAgICAgICAgICAgIFV0aWxzLmdldFN0cmluZ0Zyb21GaWxlIHBhdGgsIChpbnB1dCkgPT5cbiAgICAgICAgICAgICAgICByZXN1bHQgPSBudWxsXG4gICAgICAgICAgICAgICAgaWYgaW5wdXQ/XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IEBwYXJzZSBpbnB1dCwgZXhjZXB0aW9uT25JbnZhbGlkVHlwZSwgb2JqZWN0RGVjb2RlclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrIHJlc3VsdFxuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICBlbHNlXG4gICAgICAgICAgICAjIFN5bmNcbiAgICAgICAgICAgIGlucHV0ID0gVXRpbHMuZ2V0U3RyaW5nRnJvbUZpbGUgcGF0aFxuICAgICAgICAgICAgaWYgaW5wdXQ/XG4gICAgICAgICAgICAgICAgcmV0dXJuIEBwYXJzZSBpbnB1dCwgZXhjZXB0aW9uT25JbnZhbGlkVHlwZSwgb2JqZWN0RGVjb2RlclxuICAgICAgICAgICAgcmV0dXJuIG51bGxcblxuXG4gICAgIyBEdW1wcyBhIEphdmFTY3JpcHQgb2JqZWN0IHRvIGEgWUFNTCBzdHJpbmcuXG4gICAgI1xuICAgICMgVGhlIGR1bXAgbWV0aG9kLCB3aGVuIHN1cHBsaWVkIHdpdGggYW4gb2JqZWN0LCB3aWxsIGRvIGl0cyBiZXN0XG4gICAgIyB0byBjb252ZXJ0IHRoZSBvYmplY3QgaW50byBmcmllbmRseSBZQU1MLlxuICAgICNcbiAgICAjIEBwYXJhbSBbT2JqZWN0XSAgIGlucHV0ICAgICAgICAgICAgICAgICAgIEphdmFTY3JpcHQgb2JqZWN0XG4gICAgIyBAcGFyYW0gW0ludGVnZXJdICBpbmxpbmUgICAgICAgICAgICAgICAgICBUaGUgbGV2ZWwgd2hlcmUgeW91IHN3aXRjaCB0byBpbmxpbmUgWUFNTFxuICAgICMgQHBhcmFtIFtJbnRlZ2VyXSAgaW5kZW50ICAgICAgICAgICAgICAgICAgVGhlIGFtb3VudCBvZiBzcGFjZXMgdG8gdXNlIGZvciBpbmRlbnRhdGlvbiBvZiBuZXN0ZWQgbm9kZXMuXG4gICAgIyBAcGFyYW0gW0Jvb2xlYW5dICBleGNlcHRpb25PbkludmFsaWRUeXBlICB0cnVlIGlmIGFuIGV4Y2VwdGlvbiBtdXN0IGJlIHRocm93biBvbiBpbnZhbGlkIHR5cGVzIChhIEphdmFTY3JpcHQgcmVzb3VyY2Ugb3Igb2JqZWN0KSwgZmFsc2Ugb3RoZXJ3aXNlXG4gICAgIyBAcGFyYW0gW0Z1bmN0aW9uXSBvYmplY3RFbmNvZGVyICAgICAgICAgICBBIGZ1bmN0aW9uIHRvIHNlcmlhbGl6ZSBjdXN0b20gb2JqZWN0cywgbnVsbCBvdGhlcndpc2VcbiAgICAjXG4gICAgIyBAcmV0dXJuIFtTdHJpbmddICBBIFlBTUwgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgb3JpZ2luYWwgSmF2YVNjcmlwdCBvYmplY3RcbiAgICAjXG4gICAgQGR1bXA6IChpbnB1dCwgaW5saW5lID0gMiwgaW5kZW50ID0gNCwgZXhjZXB0aW9uT25JbnZhbGlkVHlwZSA9IGZhbHNlLCBvYmplY3RFbmNvZGVyID0gbnVsbCkgLT5cbiAgICAgICAgeWFtbCA9IG5ldyBEdW1wZXIoKVxuICAgICAgICB5YW1sLmluZGVudGF0aW9uID0gaW5kZW50XG5cbiAgICAgICAgcmV0dXJuIHlhbWwuZHVtcChpbnB1dCwgaW5saW5lLCAwLCBleGNlcHRpb25PbkludmFsaWRUeXBlLCBvYmplY3RFbmNvZGVyKVxuXG5cbiAgICAjIFJlZ2lzdGVycyAueW1sIGV4dGVuc2lvbiB0byB3b3JrIHdpdGggbm9kZSdzIHJlcXVpcmUoKSBmdW5jdGlvbi5cbiAgICAjXG4gICAgQHJlZ2lzdGVyOiAtPlxuICAgICAgICByZXF1aXJlX2hhbmRsZXIgPSAobW9kdWxlLCBmaWxlbmFtZSkgLT5cbiAgICAgICAgICAgICMgRmlsbCBpbiByZXN1bHRcbiAgICAgICAgICAgIG1vZHVsZS5leHBvcnRzID0gWUFNTC5wYXJzZUZpbGUgZmlsZW5hbWVcblxuICAgICAgICAjIFJlZ2lzdGVyIHJlcXVpcmUgZXh0ZW5zaW9ucyBvbmx5IGlmIHdlJ3JlIG9uIG5vZGUuanNcbiAgICAgICAgIyBoYWNrIGZvciBicm93c2VyaWZ5XG4gICAgICAgIGlmIHJlcXVpcmU/LmV4dGVuc2lvbnM/XG4gICAgICAgICAgICByZXF1aXJlLmV4dGVuc2lvbnNbJy55bWwnXSA9IHJlcXVpcmVfaGFuZGxlclxuICAgICAgICAgICAgcmVxdWlyZS5leHRlbnNpb25zWycueWFtbCddID0gcmVxdWlyZV9oYW5kbGVyXG5cblxuICAgICMgQWxpYXMgb2YgZHVtcCgpIG1ldGhvZCBmb3IgY29tcGF0aWJpbGl0eSByZWFzb25zLlxuICAgICNcbiAgICBAc3RyaW5naWZ5OiAoaW5wdXQsIGlubGluZSwgaW5kZW50LCBleGNlcHRpb25PbkludmFsaWRUeXBlLCBvYmplY3RFbmNvZGVyKSAtPlxuICAgICAgICByZXR1cm4gQGR1bXAgaW5wdXQsIGlubGluZSwgaW5kZW50LCBleGNlcHRpb25PbkludmFsaWRUeXBlLCBvYmplY3RFbmNvZGVyXG5cblxuICAgICMgQWxpYXMgb2YgcGFyc2VGaWxlKCkgbWV0aG9kIGZvciBjb21wYXRpYmlsaXR5IHJlYXNvbnMuXG4gICAgI1xuICAgIEBsb2FkOiAocGF0aCwgY2FsbGJhY2ssIGV4Y2VwdGlvbk9uSW52YWxpZFR5cGUsIG9iamVjdERlY29kZXIpIC0+XG4gICAgICAgIHJldHVybiBAcGFyc2VGaWxlIHBhdGgsIGNhbGxiYWNrLCBleGNlcHRpb25PbkludmFsaWRUeXBlLCBvYmplY3REZWNvZGVyXG5cblxuIyBFeHBvc2UgWUFNTCBuYW1lc3BhY2UgdG8gYnJvd3Nlclxud2luZG93Py5ZQU1MID0gWWFtbFxuXG5tb2R1bGUuZXhwb3J0cyA9IFlhbWxcblxuIl19
