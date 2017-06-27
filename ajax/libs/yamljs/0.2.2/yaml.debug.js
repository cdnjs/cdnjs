(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Dumper, Inline, Utils;

Utils = require('./Utils');

Inline = require('./Inline');

Dumper = (function() {
  function Dumper() {}

  Dumper.indentation = 4;

  Dumper.prototype.dump = function(input, inline, indent, exceptionOnInvalidType, objectEncoder) {
    var i, key, len, output, prefix, value, willBeInlined;
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
        for (i = 0, len = input.length; i < len; i++) {
          value = input[i];
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
    var i, j, mapping, ref;
    mapping = {};
    for (i = j = 0, ref = Escaper.LIST_ESCAPEES.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
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
    return "'" + value.replace(/'/g, "''") + "'";
  };

  return Escaper;

})();

module.exports = Escaper;



},{"./Pattern":7}],3:[function(require,module,exports){
var DumpException,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

DumpException = (function(superClass) {
  extend(DumpException, superClass);

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
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ParseException = (function(superClass) {
  extend(ParseException, superClass);

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
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

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
    var ref, result, type;
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
    if ((ref = value.toLowerCase()) === 'null' || ref === '~' || ref === 'true' || ref === 'false') {
      return "'" + value + "'";
    }
    return value;
  };

  Inline.dumpObject = function(value, exceptionOnInvalidType, objectSupport) {
    var j, key, len1, output, val;
    if (objectSupport == null) {
      objectSupport = null;
    }
    if (value instanceof Array) {
      output = [];
      for (j = 0, len1 = value.length; j < len1; j++) {
        val = value[j];
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
    var i, joinedDelimiters, match, output, pattern, ref, ref1, strpos, tmp;
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
    if (ref = scalar.charAt(i), indexOf.call(stringDelimiters, ref) >= 0) {
      output = this.parseQuotedScalar(scalar, context);
      i = context.i;
      if (delimiters != null) {
        tmp = Utils.ltrim(scalar.slice(i), ' ');
        if (!(ref1 = tmp.charAt(0), indexOf.call(delimiters, ref1) >= 0)) {
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
    var e, i, isQuoted, len, output, ref, value;
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
          isQuoted = ((ref = sequence.charAt(i)) === '"' || ref === "'");
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
    var done, i, key, len, output, shouldContinueWhileLoop, value;
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
            value = this.parseMapping(mapping, context);
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
    var alias, allowOverwrite, block, c, context, data, e, first, i, indent, isRef, j, k, key, l, lastKey, len, len1, len2, len3, lineCount, m, matches, mergeNode, n, name, parsed, parsedItem, parser, ref, ref1, ref2, refName, refValue, val, values;
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
          if (((ref = values.leadspaces) != null ? ref.length : void 0) && (matches = this.PATTERN_COMPACT_NOTATION.exec(values.value))) {
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
          if (((ref1 = values.value) != null ? ref1.indexOf('*') : void 0) === 0) {
            refName = values.value.slice(1);
            if (this.refs[refName] == null) {
              throw new ParseException('Reference "' + refName + '" does not exist.', this.getRealCurrentLineNb() + 1, this.currentLine);
            }
            refValue = this.refs[refName];
            if (typeof refValue !== 'object') {
              throw new ParseException('YAML merge keys used with a scalar value instead of an object.', this.getRealCurrentLineNb() + 1, this.currentLine);
            }
            if (refValue instanceof Array) {
              for (i = j = 0, len = refValue.length; j < len; i = ++j) {
                value = refValue[i];
                if (data[name = String(i)] == null) {
                  data[name] = value;
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
              for (l = 0, len1 = parsed.length; l < len1; l++) {
                parsedItem = parsed[l];
                if (typeof parsedItem !== 'object') {
                  throw new ParseException('Merge items must be objects.', this.getRealCurrentLineNb() + 1, parsedItem);
                }
                if (parsedItem instanceof Array) {
                  for (i = m = 0, len2 = parsedItem.length; m < len2; i = ++m) {
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
              for (n = 0, len3 = value.length; n < len3; n++) {
                alias = value[n];
                data.push(this.refs[alias.slice(1)]);
              }
              value = data;
            }
          }
          return value;
        } else if ((ref2 = Utils.ltrim(value).charAt(0)) === '[' || ref2 === '{') {
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
    var e, foldedIndent, matches, modifiers, pos, ref, ref1, val;
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
      modifiers = (ref = matches.modifiers) != null ? ref : '';
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
      if (((ref1 = value.charAt(0)) === '[' || ref1 === '{') && e instanceof ParseException && this.isNextLineIndented()) {
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
    var isCurrentLineBlank, j, len, line, matches, newText, notEOF, pattern, ref, text;
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
      ref = text.split("\n");
      for (j = 0, len = ref.length; j < len; j++) {
        line = ref[j];
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
    var count, ref, ref1, ref2, trimmedValue;
    if (value.indexOf("\r") !== -1) {
      value = value.split("\r\n").join("\n").split("\r").join("\n");
    }
    count = 0;
    ref = this.PATTERN_YAML_HEADER.replaceAll(value, ''), value = ref[0], count = ref[1];
    this.offset += count;
    ref1 = this.PATTERN_LEADING_COMMENTS.replaceAll(value, '', 1), trimmedValue = ref1[0], count = ref1[1];
    if (count === 1) {
      this.offset += Utils.subStrCount(value, "\n") - Utils.subStrCount(trimmedValue, "\n");
      value = trimmedValue;
    }
    ref2 = this.PATTERN_DOCUMENT_MARKER_START.replaceAll(value, '', 1), trimmedValue = ref2[0], count = ref2[1];
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
    var index, matches, name, ref;
    this.regex.lastIndex = 0;
    matches = this.regex.exec(str);
    if (matches == null) {
      return null;
    }
    if (this.mapping != null) {
      ref = this.mapping;
      for (name in ref) {
        index = ref[name];
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
    var c, i, j, len, ref, sublen;
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
    for (i = j = 0, ref = len; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
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
    var data, fs, j, len1, name, ref, req, xhr;
    if (callback == null) {
      callback = null;
    }
    xhr = null;
    if (typeof window !== "undefined" && window !== null) {
      if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
      } else if (window.ActiveXObject) {
        ref = ["Msxml2.XMLHTTP.6.0", "Msxml2.XMLHTTP.3.0", "Msxml2.XMLHTTP", "Microsoft.XMLHTTP"];
        for (j = 0, len1 = ref.length; j < len1; j++) {
          name = ref[j];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9Vc2Vycy9qZXJlbXlmYS9Eb2N1bWVudHMvUHJvamV0cy95YW1sLmpzL3NyYy9EdW1wZXIuY29mZmVlIiwiL1VzZXJzL2plcmVteWZhL0RvY3VtZW50cy9Qcm9qZXRzL3lhbWwuanMvc3JjL0VzY2FwZXIuY29mZmVlIiwiL1VzZXJzL2plcmVteWZhL0RvY3VtZW50cy9Qcm9qZXRzL3lhbWwuanMvc3JjL0V4Y2VwdGlvbi9EdW1wRXhjZXB0aW9uLmNvZmZlZSIsIi9Vc2Vycy9qZXJlbXlmYS9Eb2N1bWVudHMvUHJvamV0cy95YW1sLmpzL3NyYy9FeGNlcHRpb24vUGFyc2VFeGNlcHRpb24uY29mZmVlIiwiL1VzZXJzL2plcmVteWZhL0RvY3VtZW50cy9Qcm9qZXRzL3lhbWwuanMvc3JjL0lubGluZS5jb2ZmZWUiLCIvVXNlcnMvamVyZW15ZmEvRG9jdW1lbnRzL1Byb2pldHMveWFtbC5qcy9zcmMvUGFyc2VyLmNvZmZlZSIsIi9Vc2Vycy9qZXJlbXlmYS9Eb2N1bWVudHMvUHJvamV0cy95YW1sLmpzL3NyYy9QYXR0ZXJuLmNvZmZlZSIsIi9Vc2Vycy9qZXJlbXlmYS9Eb2N1bWVudHMvUHJvamV0cy95YW1sLmpzL3NyYy9VbmVzY2FwZXIuY29mZmVlIiwiL1VzZXJzL2plcmVteWZhL0RvY3VtZW50cy9Qcm9qZXRzL3lhbWwuanMvc3JjL1V0aWxzLmNvZmZlZSIsIi9Vc2Vycy9qZXJlbXlmYS9Eb2N1bWVudHMvUHJvamV0cy95YW1sLmpzL3NyYy9ZYW1sLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0NBLElBQUEscUJBQUE7O0FBQUEsS0FBQSxHQUFVLE9BQUEsQ0FBUSxTQUFSLENBQVYsQ0FBQTs7QUFBQSxNQUNBLEdBQVUsT0FBQSxDQUFRLFVBQVIsQ0FEVixDQUFB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UCxDQURRO0VBQUEsQ0ExRVosQ0FBQTs7QUFBQSxFQWdGQSxJQUFDLENBQUEsSUFBRCxHQUFPLFNBQUMsSUFBRCxFQUFPLFFBQVAsRUFBaUIsc0JBQWpCLEVBQXlDLGFBQXpDLEdBQUE7QUFDSCxXQUFPLElBQUMsQ0FBQSxTQUFELENBQVcsSUFBWCxFQUFpQixRQUFqQixFQUEyQixzQkFBM0IsRUFBbUQsYUFBbkQsQ0FBUCxDQURHO0VBQUEsQ0FoRlAsQ0FBQTs7Y0FBQTs7SUF6QkosQ0FBQTs7O0VBOEdBLE1BQU0sQ0FBRSxJQUFSLEdBQWU7Q0E5R2Y7O0FBQUEsTUFnSE0sQ0FBQyxPQUFQLEdBQWlCLElBaEhqQixDQUFBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlxuVXRpbHMgICA9IHJlcXVpcmUgJy4vVXRpbHMnXG5JbmxpbmUgID0gcmVxdWlyZSAnLi9JbmxpbmUnXG5cbiMgRHVtcGVyIGR1bXBzIEphdmFTY3JpcHQgdmFyaWFibGVzIHRvIFlBTUwgc3RyaW5ncy5cbiNcbmNsYXNzIER1bXBlclxuXG4gICAgIyBUaGUgYW1vdW50IG9mIHNwYWNlcyB0byB1c2UgZm9yIGluZGVudGF0aW9uIG9mIG5lc3RlZCBub2Rlcy5cbiAgICBAaW5kZW50YXRpb246ICAgNFxuXG5cbiAgICAjIER1bXBzIGEgSmF2YVNjcmlwdCB2YWx1ZSB0byBZQU1MLlxuICAgICNcbiAgICAjIEBwYXJhbSBbT2JqZWN0XSAgIGlucHV0ICAgICAgICAgICAgICAgICAgIFRoZSBKYXZhU2NyaXB0IHZhbHVlXG4gICAgIyBAcGFyYW0gW0ludGVnZXJdICBpbmxpbmUgICAgICAgICAgICAgICAgICBUaGUgbGV2ZWwgd2hlcmUgeW91IHN3aXRjaCB0byBpbmxpbmUgWUFNTFxuICAgICMgQHBhcmFtIFtJbnRlZ2VyXSAgaW5kZW50ICAgICAgICAgICAgICAgICAgVGhlIGxldmVsIG9mIGluZGVudGF0aW9uICh1c2VkIGludGVybmFsbHkpXG4gICAgIyBAcGFyYW0gW0Jvb2xlYW5dICBleGNlcHRpb25PbkludmFsaWRUeXBlICB0cnVlIGlmIGFuIGV4Y2VwdGlvbiBtdXN0IGJlIHRocm93biBvbiBpbnZhbGlkIHR5cGVzIChhIEphdmFTY3JpcHQgcmVzb3VyY2Ugb3Igb2JqZWN0KSwgZmFsc2Ugb3RoZXJ3aXNlXG4gICAgIyBAcGFyYW0gW0Z1bmN0aW9uXSBvYmplY3RFbmNvZGVyICAgICAgICAgICBBIGZ1bmN0aW9uIHRvIHNlcmlhbGl6ZSBjdXN0b20gb2JqZWN0cywgbnVsbCBvdGhlcndpc2VcbiAgICAjXG4gICAgIyBAcmV0dXJuIFtTdHJpbmddICBUaGUgWUFNTCByZXByZXNlbnRhdGlvbiBvZiB0aGUgSmF2YVNjcmlwdCB2YWx1ZVxuICAgICNcbiAgICBkdW1wOiAoaW5wdXQsIGlubGluZSA9IDAsIGluZGVudCA9IDAsIGV4Y2VwdGlvbk9uSW52YWxpZFR5cGUgPSBmYWxzZSwgb2JqZWN0RW5jb2RlciA9IG51bGwpIC0+XG4gICAgICAgIG91dHB1dCA9ICcnXG4gICAgICAgIHByZWZpeCA9IChpZiBpbmRlbnQgdGhlbiBVdGlscy5zdHJSZXBlYXQoJyAnLCBpbmRlbnQpIGVsc2UgJycpXG5cbiAgICAgICAgaWYgaW5saW5lIDw9IDAgb3IgdHlwZW9mKGlucHV0KSBpc250ICdvYmplY3QnIG9yIGlucHV0IGluc3RhbmNlb2YgRGF0ZSBvciBVdGlscy5pc0VtcHR5KGlucHV0KVxuICAgICAgICAgICAgb3V0cHV0ICs9IHByZWZpeCArIElubGluZS5kdW1wKGlucHV0LCBleGNlcHRpb25PbkludmFsaWRUeXBlLCBvYmplY3RFbmNvZGVyKVxuICAgICAgICBcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgaWYgaW5wdXQgaW5zdGFuY2VvZiBBcnJheVxuICAgICAgICAgICAgICAgIGZvciB2YWx1ZSBpbiBpbnB1dFxuICAgICAgICAgICAgICAgICAgICB3aWxsQmVJbmxpbmVkID0gKGlubGluZSAtIDEgPD0gMCBvciB0eXBlb2YodmFsdWUpIGlzbnQgJ29iamVjdCcgb3IgVXRpbHMuaXNFbXB0eSh2YWx1ZSkpXG5cbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0ICs9XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmVmaXggK1xuICAgICAgICAgICAgICAgICAgICAgICAgJy0nICtcbiAgICAgICAgICAgICAgICAgICAgICAgIChpZiB3aWxsQmVJbmxpbmVkIHRoZW4gJyAnIGVsc2UgXCJcXG5cIikgK1xuICAgICAgICAgICAgICAgICAgICAgICAgQGR1bXAodmFsdWUsIGlubGluZSAtIDEsIChpZiB3aWxsQmVJbmxpbmVkIHRoZW4gMCBlbHNlIGluZGVudCArIEBpbmRlbnRhdGlvbiksIGV4Y2VwdGlvbk9uSW52YWxpZFR5cGUsIG9iamVjdEVuY29kZXIpICtcbiAgICAgICAgICAgICAgICAgICAgICAgIChpZiB3aWxsQmVJbmxpbmVkIHRoZW4gXCJcXG5cIiBlbHNlICcnKVxuXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgZm9yIGtleSwgdmFsdWUgb2YgaW5wdXRcbiAgICAgICAgICAgICAgICAgICAgd2lsbEJlSW5saW5lZCA9IChpbmxpbmUgLSAxIDw9IDAgb3IgdHlwZW9mKHZhbHVlKSBpc250ICdvYmplY3QnIG9yIFV0aWxzLmlzRW1wdHkodmFsdWUpKVxuXG4gICAgICAgICAgICAgICAgICAgIG91dHB1dCArPVxuICAgICAgICAgICAgICAgICAgICAgICAgcHJlZml4ICtcbiAgICAgICAgICAgICAgICAgICAgICAgIElubGluZS5kdW1wKGtleSwgZXhjZXB0aW9uT25JbnZhbGlkVHlwZSwgb2JqZWN0RW5jb2RlcikgKyAnOicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgKGlmIHdpbGxCZUlubGluZWQgdGhlbiAnICcgZWxzZSBcIlxcblwiKSArXG4gICAgICAgICAgICAgICAgICAgICAgICBAZHVtcCh2YWx1ZSwgaW5saW5lIC0gMSwgKGlmIHdpbGxCZUlubGluZWQgdGhlbiAwIGVsc2UgaW5kZW50ICsgQGluZGVudGF0aW9uKSwgZXhjZXB0aW9uT25JbnZhbGlkVHlwZSwgb2JqZWN0RW5jb2RlcikgK1xuICAgICAgICAgICAgICAgICAgICAgICAgKGlmIHdpbGxCZUlubGluZWQgdGhlbiBcIlxcblwiIGVsc2UgJycpXG5cbiAgICAgICAgcmV0dXJuIG91dHB1dFxuXG5cbm1vZHVsZS5leHBvcnRzID0gRHVtcGVyXG4iLCJcblBhdHRlcm4gPSByZXF1aXJlICcuL1BhdHRlcm4nXG5cbiMgRXNjYXBlciBlbmNhcHN1bGF0ZXMgZXNjYXBpbmcgcnVsZXMgZm9yIHNpbmdsZVxuIyBhbmQgZG91YmxlLXF1b3RlZCBZQU1MIHN0cmluZ3MuXG5jbGFzcyBFc2NhcGVyXG5cbiAgICAjIE1hcHBpbmcgYXJyYXlzIGZvciBlc2NhcGluZyBhIGRvdWJsZSBxdW90ZWQgc3RyaW5nLiBUaGUgYmFja3NsYXNoIGlzXG4gICAgIyBmaXJzdCB0byBlbnN1cmUgcHJvcGVyIGVzY2FwaW5nLlxuICAgIEBMSVNUX0VTQ0FQRUVTOiAgICAgICAgICAgICAgICAgWydcXFxcXFxcXCcsICdcXFxcXCInLCAnXCInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFx4MDBcIiwgIFwiXFx4MDFcIiwgIFwiXFx4MDJcIiwgIFwiXFx4MDNcIiwgIFwiXFx4MDRcIiwgIFwiXFx4MDVcIiwgIFwiXFx4MDZcIiwgIFwiXFx4MDdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxceDA4XCIsICBcIlxceDA5XCIsICBcIlxceDBhXCIsICBcIlxceDBiXCIsICBcIlxceDBjXCIsICBcIlxceDBkXCIsICBcIlxceDBlXCIsICBcIlxceDBmXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXHgxMFwiLCAgXCJcXHgxMVwiLCAgXCJcXHgxMlwiLCAgXCJcXHgxM1wiLCAgXCJcXHgxNFwiLCAgXCJcXHgxNVwiLCAgXCJcXHgxNlwiLCAgXCJcXHgxN1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFx4MThcIiwgIFwiXFx4MTlcIiwgIFwiXFx4MWFcIiwgIFwiXFx4MWJcIiwgIFwiXFx4MWNcIiwgIFwiXFx4MWRcIiwgIFwiXFx4MWVcIiwgIFwiXFx4MWZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoY2ggPSBTdHJpbmcuZnJvbUNoYXJDb2RlKSgweDAwODUpLCBjaCgweDAwQTApLCBjaCgweDIwMjgpLCBjaCgweDIwMjkpXVxuICAgIEBMSVNUX0VTQ0FQRUQ6ICAgICAgICAgICAgICAgICAgWydcXFxcXCInLCAnXFxcXFxcXFwnLCAnXFxcXFwiJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcXFwwXCIsICAgXCJcXFxceDAxXCIsIFwiXFxcXHgwMlwiLCBcIlxcXFx4MDNcIiwgXCJcXFxceDA0XCIsIFwiXFxcXHgwNVwiLCBcIlxcXFx4MDZcIiwgXCJcXFxcYVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxcXGJcIiwgICBcIlxcXFx0XCIsICAgXCJcXFxcblwiLCAgIFwiXFxcXHZcIiwgICBcIlxcXFxmXCIsICAgXCJcXFxcclwiLCAgIFwiXFxcXHgwZVwiLCBcIlxcXFx4MGZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcXFx4MTBcIiwgXCJcXFxceDExXCIsIFwiXFxcXHgxMlwiLCBcIlxcXFx4MTNcIiwgXCJcXFxceDE0XCIsIFwiXFxcXHgxNVwiLCBcIlxcXFx4MTZcIiwgXCJcXFxceDE3XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXFxceDE4XCIsIFwiXFxcXHgxOVwiLCBcIlxcXFx4MWFcIiwgXCJcXFxcZVwiLCAgIFwiXFxcXHgxY1wiLCBcIlxcXFx4MWRcIiwgXCJcXFxceDFlXCIsIFwiXFxcXHgxZlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxcXE5cIiwgXCJcXFxcX1wiLCBcIlxcXFxMXCIsIFwiXFxcXFBcIl1cblxuICAgIEBNQVBQSU5HX0VTQ0FQRUVTX1RPX0VTQ0FQRUQ6ICAgZG8gPT5cbiAgICAgICAgbWFwcGluZyA9IHt9XG4gICAgICAgIGZvciBpIGluIFswLi4uQExJU1RfRVNDQVBFRVMubGVuZ3RoXVxuICAgICAgICAgICAgbWFwcGluZ1tATElTVF9FU0NBUEVFU1tpXV0gPSBATElTVF9FU0NBUEVEW2ldXG4gICAgICAgIHJldHVybiBtYXBwaW5nIFxuXG4gICAgIyBDaGFyYWN0ZXJzIHRoYXQgd291bGQgY2F1c2UgYSBkdW1wZWQgc3RyaW5nIHRvIHJlcXVpcmUgZG91YmxlIHF1b3RpbmcuXG4gICAgQFBBVFRFUk5fQ0hBUkFDVEVSU19UT19FU0NBUEU6ICBuZXcgUGF0dGVybiAnW1xcXFx4MDAtXFxcXHgxZl18XFx4YzJcXHg4NXxcXHhjMlxceGEwfFxceGUyXFx4ODBcXHhhOHxcXHhlMlxceDgwXFx4YTknXG5cbiAgICAjIE90aGVyIHByZWNvbXBpbGVkIHBhdHRlcm5zXG4gICAgQFBBVFRFUk5fTUFQUElOR19FU0NBUEVFUzogICAgICBuZXcgUGF0dGVybiBATElTVF9FU0NBUEVFUy5qb2luKCd8JylcbiAgICBAUEFUVEVSTl9TSU5HTEVfUVVPVElORzogICAgICAgIG5ldyBQYXR0ZXJuICdbXFxcXHNcXCdcIjp7fVtcXFxcXSwmKiM/XXxeWy0/fDw+PSElQGBdJ1xuXG5cblxuICAgICMgRGV0ZXJtaW5lcyBpZiBhIEphdmFTY3JpcHQgdmFsdWUgd291bGQgcmVxdWlyZSBkb3VibGUgcXVvdGluZyBpbiBZQU1MLlxuICAgICNcbiAgICAjIEBwYXJhbSBbU3RyaW5nXSAgIHZhbHVlICAgQSBKYXZhU2NyaXB0IHZhbHVlIHZhbHVlXG4gICAgI1xuICAgICMgQHJldHVybiBbQm9vbGVhbl0gdHJ1ZSAgICBpZiB0aGUgdmFsdWUgd291bGQgcmVxdWlyZSBkb3VibGUgcXVvdGVzLlxuICAgICNcbiAgICBAcmVxdWlyZXNEb3VibGVRdW90aW5nOiAodmFsdWUpIC0+XG4gICAgICAgIHJldHVybiBAUEFUVEVSTl9DSEFSQUNURVJTX1RPX0VTQ0FQRS50ZXN0IHZhbHVlXG5cblxuICAgICMgRXNjYXBlcyBhbmQgc3Vycm91bmRzIGEgSmF2YVNjcmlwdCB2YWx1ZSB3aXRoIGRvdWJsZSBxdW90ZXMuXG4gICAgI1xuICAgICMgQHBhcmFtIFtTdHJpbmddICAgdmFsdWUgICBBIEphdmFTY3JpcHQgdmFsdWVcbiAgICAjXG4gICAgIyBAcmV0dXJuIFtTdHJpbmddICBUaGUgcXVvdGVkLCBlc2NhcGVkIHN0cmluZ1xuICAgICNcbiAgICBAZXNjYXBlV2l0aERvdWJsZVF1b3RlczogKHZhbHVlKSAtPlxuICAgICAgICByZXN1bHQgPSBAUEFUVEVSTl9NQVBQSU5HX0VTQ0FQRUVTLnJlcGxhY2UgdmFsdWUsIChzdHIpID0+XG4gICAgICAgICAgICByZXR1cm4gQE1BUFBJTkdfRVNDQVBFRVNfVE9fRVNDQVBFRFtzdHJdXG4gICAgICAgIHJldHVybiAnXCInK3Jlc3VsdCsnXCInXG5cblxuICAgICMgRGV0ZXJtaW5lcyBpZiBhIEphdmFTY3JpcHQgdmFsdWUgd291bGQgcmVxdWlyZSBzaW5nbGUgcXVvdGluZyBpbiBZQU1MLlxuICAgICNcbiAgICAjIEBwYXJhbSBbU3RyaW5nXSAgIHZhbHVlICAgQSBKYXZhU2NyaXB0IHZhbHVlXG4gICAgI1xuICAgICMgQHJldHVybiBbQm9vbGVhbl0gdHJ1ZSBpZiB0aGUgdmFsdWUgd291bGQgcmVxdWlyZSBzaW5nbGUgcXVvdGVzLlxuICAgICNcbiAgICBAcmVxdWlyZXNTaW5nbGVRdW90aW5nOiAodmFsdWUpIC0+XG4gICAgICAgIHJldHVybiBAUEFUVEVSTl9TSU5HTEVfUVVPVElORy50ZXN0IHZhbHVlXG5cblxuICAgICMgRXNjYXBlcyBhbmQgc3Vycm91bmRzIGEgSmF2YVNjcmlwdCB2YWx1ZSB3aXRoIHNpbmdsZSBxdW90ZXMuXG4gICAgI1xuICAgICMgQHBhcmFtIFtTdHJpbmddICAgdmFsdWUgICBBIEphdmFTY3JpcHQgdmFsdWVcbiAgICAjXG4gICAgIyBAcmV0dXJuIFtTdHJpbmddICBUaGUgcXVvdGVkLCBlc2NhcGVkIHN0cmluZ1xuICAgICNcbiAgICBAZXNjYXBlV2l0aFNpbmdsZVF1b3RlczogKHZhbHVlKSAtPlxuICAgICAgICByZXR1cm4gXCInXCIrdmFsdWUucmVwbGFjZSgvJy9nLCBcIicnXCIpK1wiJ1wiXG5cblxubW9kdWxlLmV4cG9ydHMgPSBFc2NhcGVyXG5cbiIsIlxuY2xhc3MgRHVtcEV4Y2VwdGlvbiBleHRlbmRzIEVycm9yXG5cbiAgICBjb25zdHJ1Y3RvcjogKEBtZXNzYWdlLCBAcGFyc2VkTGluZSwgQHNuaXBwZXQpIC0+XG5cbiAgICB0b1N0cmluZzogLT5cbiAgICAgICAgaWYgQHBhcnNlZExpbmU/IGFuZCBAc25pcHBldD9cbiAgICAgICAgICAgIHJldHVybiAnPER1bXBFeGNlcHRpb24+ICcgKyBAbWVzc2FnZSArICcgKGxpbmUgJyArIEBwYXJzZWRMaW5lICsgJzogXFwnJyArIEBzbmlwcGV0ICsgJ1xcJyknXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiAnPER1bXBFeGNlcHRpb24+ICcgKyBAbWVzc2FnZVxuXG5tb2R1bGUuZXhwb3J0cyA9IER1bXBFeGNlcHRpb25cbiIsIlxuY2xhc3MgUGFyc2VFeGNlcHRpb24gZXh0ZW5kcyBFcnJvclxuXG4gICAgY29uc3RydWN0b3I6IChAbWVzc2FnZSwgQHBhcnNlZExpbmUsIEBzbmlwcGV0KSAtPlxuXG4gICAgdG9TdHJpbmc6IC0+XG4gICAgICAgIGlmIEBwYXJzZWRMaW5lPyBhbmQgQHNuaXBwZXQ/XG4gICAgICAgICAgICByZXR1cm4gJzxQYXJzZUV4Y2VwdGlvbj4gJyArIEBtZXNzYWdlICsgJyAobGluZSAnICsgQHBhcnNlZExpbmUgKyAnOiBcXCcnICsgQHNuaXBwZXQgKyAnXFwnKSdcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuICc8UGFyc2VFeGNlcHRpb24+ICcgKyBAbWVzc2FnZVxuXG5tb2R1bGUuZXhwb3J0cyA9IFBhcnNlRXhjZXB0aW9uXG4iLCJcblBhdHRlcm4gICAgICAgICA9IHJlcXVpcmUgJy4vUGF0dGVybidcblVuZXNjYXBlciAgICAgICA9IHJlcXVpcmUgJy4vVW5lc2NhcGVyJ1xuRXNjYXBlciAgICAgICAgID0gcmVxdWlyZSAnLi9Fc2NhcGVyJ1xuVXRpbHMgICAgICAgICAgID0gcmVxdWlyZSAnLi9VdGlscydcblBhcnNlRXhjZXB0aW9uICA9IHJlcXVpcmUgJy4vRXhjZXB0aW9uL1BhcnNlRXhjZXB0aW9uJ1xuRHVtcEV4Y2VwdGlvbiAgID0gcmVxdWlyZSAnLi9FeGNlcHRpb24vRHVtcEV4Y2VwdGlvbidcblxuIyBJbmxpbmUgWUFNTCBwYXJzaW5nIGFuZCBkdW1waW5nXG5jbGFzcyBJbmxpbmVcblxuICAgICMgUXVvdGVkIHN0cmluZyByZWd1bGFyIGV4cHJlc3Npb25cbiAgICBAUkVHRVhfUVVPVEVEX1NUUklORzogICAgICAgICAgICAgICAnKD86XCIoPzpbXlwiXFxcXFxcXFxdKig/OlxcXFxcXFxcLlteXCJcXFxcXFxcXF0qKSopXCJ8XFwnKD86W15cXCddKig/OlxcJ1xcJ1teXFwnXSopKilcXCcpJ1xuXG4gICAgIyBQcmUtY29tcGlsZWQgcGF0dGVybnNcbiAgICAjXG4gICAgQFBBVFRFUk5fVFJBSUxJTkdfQ09NTUVOVFM6ICAgICAgICAgbmV3IFBhdHRlcm4gJ15cXFxccyojLiokJ1xuICAgIEBQQVRURVJOX1FVT1RFRF9TQ0FMQVI6ICAgICAgICAgICAgIG5ldyBQYXR0ZXJuICdeJytAUkVHRVhfUVVPVEVEX1NUUklOR1xuICAgIEBQQVRURVJOX1RIT1VTQU5EX05VTUVSSUNfU0NBTEFSOiAgIG5ldyBQYXR0ZXJuICdeKC18XFxcXCspP1swLTksXSsoXFxcXC5bMC05XSspPyQnXG4gICAgQFBBVFRFUk5fU0NBTEFSX0JZX0RFTElNSVRFUlM6ICAgICAge31cblxuICAgICMgU2V0dGluZ3NcbiAgICBAc2V0dGluZ3M6IHt9XG5cblxuICAgICMgQ29uZmlndXJlIFlBTUwgaW5saW5lLlxuICAgICNcbiAgICAjIEBwYXJhbSBbQm9vbGVhbl0gIGV4Y2VwdGlvbk9uSW52YWxpZFR5cGUgIHRydWUgaWYgYW4gZXhjZXB0aW9uIG11c3QgYmUgdGhyb3duIG9uIGludmFsaWQgdHlwZXMgKGEgSmF2YVNjcmlwdCByZXNvdXJjZSBvciBvYmplY3QpLCBmYWxzZSBvdGhlcndpc2VcbiAgICAjIEBwYXJhbSBbRnVuY3Rpb25dIG9iamVjdERlY29kZXIgICAgICAgICAgIEEgZnVuY3Rpb24gdG8gZGVzZXJpYWxpemUgY3VzdG9tIG9iamVjdHMsIG51bGwgb3RoZXJ3aXNlXG4gICAgI1xuICAgIEBjb25maWd1cmU6IChleGNlcHRpb25PbkludmFsaWRUeXBlID0gbnVsbCwgb2JqZWN0RGVjb2RlciA9IG51bGwpIC0+XG4gICAgICAgICMgVXBkYXRlIHNldHRpbmdzXG4gICAgICAgIEBzZXR0aW5ncy5leGNlcHRpb25PbkludmFsaWRUeXBlID0gZXhjZXB0aW9uT25JbnZhbGlkVHlwZVxuICAgICAgICBAc2V0dGluZ3Mub2JqZWN0RGVjb2RlciA9IG9iamVjdERlY29kZXJcbiAgICAgICAgcmV0dXJuXG5cblxuICAgICMgQ29udmVydHMgYSBZQU1MIHN0cmluZyB0byBhIEphdmFTY3JpcHQgb2JqZWN0LlxuICAgICNcbiAgICAjIEBwYXJhbSBbU3RyaW5nXSAgIHZhbHVlICAgICAgICAgICAgICAgICAgIEEgWUFNTCBzdHJpbmdcbiAgICAjIEBwYXJhbSBbQm9vbGVhbl0gIGV4Y2VwdGlvbk9uSW52YWxpZFR5cGUgIHRydWUgaWYgYW4gZXhjZXB0aW9uIG11c3QgYmUgdGhyb3duIG9uIGludmFsaWQgdHlwZXMgKGEgSmF2YVNjcmlwdCByZXNvdXJjZSBvciBvYmplY3QpLCBmYWxzZSBvdGhlcndpc2VcbiAgICAjIEBwYXJhbSBbRnVuY3Rpb25dIG9iamVjdERlY29kZXIgICAgICAgICAgIEEgZnVuY3Rpb24gdG8gZGVzZXJpYWxpemUgY3VzdG9tIG9iamVjdHMsIG51bGwgb3RoZXJ3aXNlXG4gICAgI1xuICAgICMgQHJldHVybiBbT2JqZWN0XSAgQSBKYXZhU2NyaXB0IG9iamVjdCByZXByZXNlbnRpbmcgdGhlIFlBTUwgc3RyaW5nXG4gICAgI1xuICAgICMgQHRocm93IFtQYXJzZUV4Y2VwdGlvbl1cbiAgICAjXG4gICAgQHBhcnNlOiAodmFsdWUsIGV4Y2VwdGlvbk9uSW52YWxpZFR5cGUgPSBmYWxzZSwgb2JqZWN0RGVjb2RlciA9IG51bGwpIC0+XG4gICAgICAgICMgVXBkYXRlIHNldHRpbmdzIGZyb20gbGFzdCBjYWxsIG9mIElubGluZS5wYXJzZSgpXG4gICAgICAgIEBzZXR0aW5ncy5leGNlcHRpb25PbkludmFsaWRUeXBlID0gZXhjZXB0aW9uT25JbnZhbGlkVHlwZVxuICAgICAgICBAc2V0dGluZ3Mub2JqZWN0RGVjb2RlciA9IG9iamVjdERlY29kZXJcblxuICAgICAgICBpZiBub3QgdmFsdWU/XG4gICAgICAgICAgICByZXR1cm4gJydcblxuICAgICAgICB2YWx1ZSA9IFV0aWxzLnRyaW0gdmFsdWVcblxuICAgICAgICBpZiAwIGlzIHZhbHVlLmxlbmd0aFxuICAgICAgICAgICAgcmV0dXJuICcnXG5cbiAgICAgICAgIyBLZWVwIGEgY29udGV4dCBvYmplY3QgdG8gcGFzcyB0aHJvdWdoIHN0YXRpYyBtZXRob2RzXG4gICAgICAgIGNvbnRleHQgPSB7ZXhjZXB0aW9uT25JbnZhbGlkVHlwZSwgb2JqZWN0RGVjb2RlciwgaTogMH1cblxuICAgICAgICBzd2l0Y2ggdmFsdWUuY2hhckF0KDApXG4gICAgICAgICAgICB3aGVuICdbJ1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IEBwYXJzZVNlcXVlbmNlIHZhbHVlLCBjb250ZXh0XG4gICAgICAgICAgICAgICAgKytjb250ZXh0LmlcbiAgICAgICAgICAgIHdoZW4gJ3snXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gQHBhcnNlTWFwcGluZyB2YWx1ZSwgY29udGV4dFxuICAgICAgICAgICAgICAgICsrY29udGV4dC5pXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gQHBhcnNlU2NhbGFyIHZhbHVlLCBudWxsLCBbJ1wiJywgXCInXCJdLCBjb250ZXh0XG5cbiAgICAgICAgIyBTb21lIGNvbW1lbnRzIGFyZSBhbGxvd2VkIGF0IHRoZSBlbmRcbiAgICAgICAgaWYgQFBBVFRFUk5fVFJBSUxJTkdfQ09NTUVOVFMucmVwbGFjZSh2YWx1ZVtjb250ZXh0LmkuLl0sICcnKSBpc250ICcnXG4gICAgICAgICAgICB0aHJvdyBuZXcgUGFyc2VFeGNlcHRpb24gJ1VuZXhwZWN0ZWQgY2hhcmFjdGVycyBuZWFyIFwiJyt2YWx1ZVtjb250ZXh0LmkuLl0rJ1wiLidcblxuICAgICAgICByZXR1cm4gcmVzdWx0XG5cblxuICAgICMgRHVtcHMgYSBnaXZlbiBKYXZhU2NyaXB0IHZhcmlhYmxlIHRvIGEgWUFNTCBzdHJpbmcuXG4gICAgI1xuICAgICMgQHBhcmFtIFtPYmplY3RdICAgdmFsdWUgICAgICAgICAgICAgICAgICAgVGhlIEphdmFTY3JpcHQgdmFyaWFibGUgdG8gY29udmVydFxuICAgICMgQHBhcmFtIFtCb29sZWFuXSAgZXhjZXB0aW9uT25JbnZhbGlkVHlwZSAgdHJ1ZSBpZiBhbiBleGNlcHRpb24gbXVzdCBiZSB0aHJvd24gb24gaW52YWxpZCB0eXBlcyAoYSBKYXZhU2NyaXB0IHJlc291cmNlIG9yIG9iamVjdCksIGZhbHNlIG90aGVyd2lzZVxuICAgICMgQHBhcmFtIFtGdW5jdGlvbl0gb2JqZWN0RW5jb2RlciAgICAgICAgICAgQSBmdW5jdGlvbiB0byBzZXJpYWxpemUgY3VzdG9tIG9iamVjdHMsIG51bGwgb3RoZXJ3aXNlXG4gICAgI1xuICAgICMgQHJldHVybiBbU3RyaW5nXSAgVGhlIFlBTUwgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgSmF2YVNjcmlwdCBvYmplY3RcbiAgICAjXG4gICAgIyBAdGhyb3cgW0R1bXBFeGNlcHRpb25dXG4gICAgI1xuICAgIEBkdW1wOiAodmFsdWUsIGV4Y2VwdGlvbk9uSW52YWxpZFR5cGUgPSBmYWxzZSwgb2JqZWN0RW5jb2RlciA9IG51bGwpIC0+XG4gICAgICAgIGlmIG5vdCB2YWx1ZT9cbiAgICAgICAgICAgIHJldHVybiAnbnVsbCdcbiAgICAgICAgdHlwZSA9IHR5cGVvZiB2YWx1ZVxuICAgICAgICBpZiB0eXBlIGlzICdvYmplY3QnXG4gICAgICAgICAgICBpZiB2YWx1ZSBpbnN0YW5jZW9mIERhdGVcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUudG9JU09TdHJpbmcoKVxuICAgICAgICAgICAgZWxzZSBpZiBvYmplY3RFbmNvZGVyP1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IG9iamVjdEVuY29kZXIgdmFsdWVcbiAgICAgICAgICAgICAgICBpZiB0eXBlb2YgcmVzdWx0IGlzICdzdHJpbmcnIG9yIHJlc3VsdD9cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdFxuICAgICAgICAgICAgcmV0dXJuIEBkdW1wT2JqZWN0IHZhbHVlXG4gICAgICAgIGlmIHR5cGUgaXMgJ2Jvb2xlYW4nXG4gICAgICAgICAgICByZXR1cm4gKGlmIHZhbHVlIHRoZW4gJ3RydWUnIGVsc2UgJ2ZhbHNlJylcbiAgICAgICAgaWYgVXRpbHMuaXNEaWdpdHModmFsdWUpXG4gICAgICAgICAgICByZXR1cm4gKGlmIHR5cGUgaXMgJ3N0cmluZycgdGhlbiBcIidcIit2YWx1ZStcIidcIiBlbHNlIFN0cmluZyhwYXJzZUludCh2YWx1ZSkpKVxuICAgICAgICBpZiBVdGlscy5pc051bWVyaWModmFsdWUpXG4gICAgICAgICAgICByZXR1cm4gKGlmIHR5cGUgaXMgJ3N0cmluZycgdGhlbiBcIidcIit2YWx1ZStcIidcIiBlbHNlIFN0cmluZyhwYXJzZUZsb2F0KHZhbHVlKSkpXG4gICAgICAgIGlmIHR5cGUgaXMgJ251bWJlcidcbiAgICAgICAgICAgIHJldHVybiAoaWYgdmFsdWUgaXMgSW5maW5pdHkgdGhlbiAnLkluZicgZWxzZSAoaWYgdmFsdWUgaXMgLUluZmluaXR5IHRoZW4gJy0uSW5mJyBlbHNlIChpZiBpc05hTih2YWx1ZSkgdGhlbiAnLk5hTicgZWxzZSB2YWx1ZSkpKVxuICAgICAgICBpZiBFc2NhcGVyLnJlcXVpcmVzRG91YmxlUXVvdGluZyB2YWx1ZVxuICAgICAgICAgICAgcmV0dXJuIEVzY2FwZXIuZXNjYXBlV2l0aERvdWJsZVF1b3RlcyB2YWx1ZVxuICAgICAgICBpZiBFc2NhcGVyLnJlcXVpcmVzU2luZ2xlUXVvdGluZyB2YWx1ZVxuICAgICAgICAgICAgcmV0dXJuIEVzY2FwZXIuZXNjYXBlV2l0aFNpbmdsZVF1b3RlcyB2YWx1ZVxuICAgICAgICBpZiAnJyBpcyB2YWx1ZVxuICAgICAgICAgICAgcmV0dXJuICdcIlwiJ1xuICAgICAgICBpZiBVdGlscy5QQVRURVJOX0RBVEUudGVzdCB2YWx1ZVxuICAgICAgICAgICAgcmV0dXJuIFwiJ1wiK3ZhbHVlK1wiJ1wiO1xuICAgICAgICBpZiB2YWx1ZS50b0xvd2VyQ2FzZSgpIGluIFsnbnVsbCcsJ34nLCd0cnVlJywnZmFsc2UnXVxuICAgICAgICAgICAgcmV0dXJuIFwiJ1wiK3ZhbHVlK1wiJ1wiXG4gICAgICAgICMgRGVmYXVsdFxuICAgICAgICByZXR1cm4gdmFsdWU7XG5cblxuICAgICMgRHVtcHMgYSBKYXZhU2NyaXB0IG9iamVjdCB0byBhIFlBTUwgc3RyaW5nLlxuICAgICNcbiAgICAjIEBwYXJhbSBbT2JqZWN0XSAgIHZhbHVlICAgICAgICAgICAgICAgICAgIFRoZSBKYXZhU2NyaXB0IG9iamVjdCB0byBkdW1wXG4gICAgIyBAcGFyYW0gW0Jvb2xlYW5dICBleGNlcHRpb25PbkludmFsaWRUeXBlICB0cnVlIGlmIGFuIGV4Y2VwdGlvbiBtdXN0IGJlIHRocm93biBvbiBpbnZhbGlkIHR5cGVzIChhIEphdmFTY3JpcHQgcmVzb3VyY2Ugb3Igb2JqZWN0KSwgZmFsc2Ugb3RoZXJ3aXNlXG4gICAgIyBAcGFyYW0gW0Z1bmN0aW9uXSBvYmplY3RFbmNvZGVyICAgICAgICAgICBBIGZ1bmN0aW9uIGRvIHNlcmlhbGl6ZSBjdXN0b20gb2JqZWN0cywgbnVsbCBvdGhlcndpc2VcbiAgICAjXG4gICAgIyBAcmV0dXJuIHN0cmluZyBUaGUgWUFNTCBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBKYXZhU2NyaXB0IG9iamVjdFxuICAgICNcbiAgICBAZHVtcE9iamVjdDogKHZhbHVlLCBleGNlcHRpb25PbkludmFsaWRUeXBlLCBvYmplY3RTdXBwb3J0ID0gbnVsbCkgLT5cbiAgICAgICAgIyBBcnJheVxuICAgICAgICBpZiB2YWx1ZSBpbnN0YW5jZW9mIEFycmF5XG4gICAgICAgICAgICBvdXRwdXQgPSBbXVxuICAgICAgICAgICAgZm9yIHZhbCBpbiB2YWx1ZVxuICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoIEBkdW1wIHZhbFxuICAgICAgICAgICAgcmV0dXJuICdbJytvdXRwdXQuam9pbignLCAnKSsnXSdcblxuICAgICAgICAjIE1hcHBpbmdcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgb3V0cHV0ID0gW11cbiAgICAgICAgICAgIGZvciBrZXksIHZhbCBvZiB2YWx1ZVxuICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoIEBkdW1wKGtleSkrJzogJytAZHVtcCh2YWwpXG4gICAgICAgICAgICByZXR1cm4gJ3snK291dHB1dC5qb2luKCcsICcpKyd9J1xuXG5cbiAgICAjIFBhcnNlcyBhIHNjYWxhciB0byBhIFlBTUwgc3RyaW5nLlxuICAgICNcbiAgICAjIEBwYXJhbSBbT2JqZWN0XSAgIHNjYWxhclxuICAgICMgQHBhcmFtIFtBcnJheV0gICAgZGVsaW1pdGVyc1xuICAgICMgQHBhcmFtIFtBcnJheV0gICAgc3RyaW5nRGVsaW1pdGVyc1xuICAgICMgQHBhcmFtIFtPYmplY3RdICAgY29udGV4dFxuICAgICMgQHBhcmFtIFtCb29sZWFuXSAgZXZhbHVhdGVcbiAgICAjXG4gICAgIyBAcmV0dXJuIFtTdHJpbmddICBBIFlBTUwgc3RyaW5nXG4gICAgI1xuICAgICMgQHRocm93IFtQYXJzZUV4Y2VwdGlvbl0gV2hlbiBtYWxmb3JtZWQgaW5saW5lIFlBTUwgc3RyaW5nIGlzIHBhcnNlZFxuICAgICNcbiAgICBAcGFyc2VTY2FsYXI6IChzY2FsYXIsIGRlbGltaXRlcnMgPSBudWxsLCBzdHJpbmdEZWxpbWl0ZXJzID0gWydcIicsIFwiJ1wiXSwgY29udGV4dCA9IG51bGwsIGV2YWx1YXRlID0gdHJ1ZSkgLT5cbiAgICAgICAgdW5sZXNzIGNvbnRleHQ/XG4gICAgICAgICAgICBjb250ZXh0ID0gZXhjZXB0aW9uT25JbnZhbGlkVHlwZTogQHNldHRpbmdzLmV4Y2VwdGlvbk9uSW52YWxpZFR5cGUsIG9iamVjdERlY29kZXI6IEBzZXR0aW5ncy5vYmplY3REZWNvZGVyLCBpOiAwXG4gICAgICAgIHtpfSA9IGNvbnRleHRcblxuICAgICAgICBpZiBzY2FsYXIuY2hhckF0KGkpIGluIHN0cmluZ0RlbGltaXRlcnNcbiAgICAgICAgICAgICMgUXVvdGVkIHNjYWxhclxuICAgICAgICAgICAgb3V0cHV0ID0gQHBhcnNlUXVvdGVkU2NhbGFyIHNjYWxhciwgY29udGV4dFxuICAgICAgICAgICAge2l9ID0gY29udGV4dFxuXG4gICAgICAgICAgICBpZiBkZWxpbWl0ZXJzP1xuICAgICAgICAgICAgICAgIHRtcCA9IFV0aWxzLmx0cmltIHNjYWxhcltpLi5dLCAnICdcbiAgICAgICAgICAgICAgICBpZiBub3QodG1wLmNoYXJBdCgwKSBpbiBkZWxpbWl0ZXJzKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUGFyc2VFeGNlcHRpb24gJ1VuZXhwZWN0ZWQgY2hhcmFjdGVycyAoJytzY2FsYXJbaS4uXSsnKS4nXG5cbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgIyBcIm5vcm1hbFwiIHN0cmluZ1xuICAgICAgICAgICAgaWYgbm90IGRlbGltaXRlcnNcbiAgICAgICAgICAgICAgICBvdXRwdXQgPSBzY2FsYXJbaS4uXVxuICAgICAgICAgICAgICAgIGkgKz0gb3V0cHV0Lmxlbmd0aFxuXG4gICAgICAgICAgICAgICAgIyBSZW1vdmUgY29tbWVudHNcbiAgICAgICAgICAgICAgICBzdHJwb3MgPSBvdXRwdXQuaW5kZXhPZiAnICMnXG4gICAgICAgICAgICAgICAgaWYgc3RycG9zIGlzbnQgLTFcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0ID0gVXRpbHMucnRyaW0gb3V0cHV0WzAuLi5zdHJwb3NdXG5cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBqb2luZWREZWxpbWl0ZXJzID0gZGVsaW1pdGVycy5qb2luKCd8JylcbiAgICAgICAgICAgICAgICBwYXR0ZXJuID0gQFBBVFRFUk5fU0NBTEFSX0JZX0RFTElNSVRFUlNbam9pbmVkRGVsaW1pdGVyc11cbiAgICAgICAgICAgICAgICB1bmxlc3MgcGF0dGVybj9cbiAgICAgICAgICAgICAgICAgICAgcGF0dGVybiA9IG5ldyBQYXR0ZXJuICdeKC4rPykoJytqb2luZWREZWxpbWl0ZXJzKycpJ1xuICAgICAgICAgICAgICAgICAgICBAUEFUVEVSTl9TQ0FMQVJfQllfREVMSU1JVEVSU1tqb2luZWREZWxpbWl0ZXJzXSA9IHBhdHRlcm5cbiAgICAgICAgICAgICAgICBpZiBtYXRjaCA9IHBhdHRlcm4uZXhlYyBzY2FsYXJbaS4uXVxuICAgICAgICAgICAgICAgICAgICBvdXRwdXQgPSBtYXRjaFsxXVxuICAgICAgICAgICAgICAgICAgICBpICs9IG91dHB1dC5sZW5ndGhcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBQYXJzZUV4Y2VwdGlvbiAnTWFsZm9ybWVkIGlubGluZSBZQU1MIHN0cmluZyAoJytzY2FsYXIrJykuJ1xuXG5cbiAgICAgICAgICAgIGlmIGV2YWx1YXRlXG4gICAgICAgICAgICAgICAgb3V0cHV0ID0gQGV2YWx1YXRlU2NhbGFyIG91dHB1dCwgY29udGV4dFxuXG4gICAgICAgIGNvbnRleHQuaSA9IGlcbiAgICAgICAgcmV0dXJuIG91dHB1dFxuXG5cbiAgICAjIFBhcnNlcyBhIHF1b3RlZCBzY2FsYXIgdG8gWUFNTC5cbiAgICAjXG4gICAgIyBAcGFyYW0gW1N0cmluZ10gICBzY2FsYXJcbiAgICAjIEBwYXJhbSBbT2JqZWN0XSAgIGNvbnRleHRcbiAgICAjXG4gICAgIyBAcmV0dXJuIFtTdHJpbmddICBBIFlBTUwgc3RyaW5nXG4gICAgI1xuICAgICMgQHRocm93IFtQYXJzZUV4Y2VwdGlvbl0gV2hlbiBtYWxmb3JtZWQgaW5saW5lIFlBTUwgc3RyaW5nIGlzIHBhcnNlZFxuICAgICNcbiAgICBAcGFyc2VRdW90ZWRTY2FsYXI6IChzY2FsYXIsIGNvbnRleHQpIC0+XG4gICAgICAgIHtpfSA9IGNvbnRleHRcblxuICAgICAgICB1bmxlc3MgbWF0Y2ggPSBAUEFUVEVSTl9RVU9URURfU0NBTEFSLmV4ZWMgc2NhbGFyW2kuLl1cbiAgICAgICAgICAgIHRocm93IG5ldyBQYXJzZUV4Y2VwdGlvbiAnTWFsZm9ybWVkIGlubGluZSBZQU1MIHN0cmluZyAoJytzY2FsYXJbaS4uXSsnKS4nXG5cbiAgICAgICAgb3V0cHV0ID0gbWF0Y2hbMF0uc3Vic3RyKDEsIG1hdGNoWzBdLmxlbmd0aCAtIDIpXG5cbiAgICAgICAgaWYgJ1wiJyBpcyBzY2FsYXIuY2hhckF0KGkpXG4gICAgICAgICAgICBvdXRwdXQgPSBVbmVzY2FwZXIudW5lc2NhcGVEb3VibGVRdW90ZWRTdHJpbmcgb3V0cHV0XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIG91dHB1dCA9IFVuZXNjYXBlci51bmVzY2FwZVNpbmdsZVF1b3RlZFN0cmluZyBvdXRwdXRcblxuICAgICAgICBpICs9IG1hdGNoWzBdLmxlbmd0aFxuXG4gICAgICAgIGNvbnRleHQuaSA9IGlcbiAgICAgICAgcmV0dXJuIG91dHB1dFxuXG5cbiAgICAjIFBhcnNlcyBhIHNlcXVlbmNlIHRvIGEgWUFNTCBzdHJpbmcuXG4gICAgI1xuICAgICMgQHBhcmFtIFtTdHJpbmddICAgc2VxdWVuY2VcbiAgICAjIEBwYXJhbSBbT2JqZWN0XSAgIGNvbnRleHRcbiAgICAjXG4gICAgIyBAcmV0dXJuIFtTdHJpbmddICBBIFlBTUwgc3RyaW5nXG4gICAgI1xuICAgICMgQHRocm93IFtQYXJzZUV4Y2VwdGlvbl0gV2hlbiBtYWxmb3JtZWQgaW5saW5lIFlBTUwgc3RyaW5nIGlzIHBhcnNlZFxuICAgICNcbiAgICBAcGFyc2VTZXF1ZW5jZTogKHNlcXVlbmNlLCBjb250ZXh0KSAtPlxuICAgICAgICBvdXRwdXQgPSBbXVxuICAgICAgICBsZW4gPSBzZXF1ZW5jZS5sZW5ndGhcbiAgICAgICAge2l9ID0gY29udGV4dFxuICAgICAgICBpICs9IDFcblxuICAgICAgICAjIFtmb28sIGJhciwgLi4uXVxuICAgICAgICB3aGlsZSBpIDwgbGVuXG4gICAgICAgICAgICBjb250ZXh0LmkgPSBpXG4gICAgICAgICAgICBzd2l0Y2ggc2VxdWVuY2UuY2hhckF0KGkpXG4gICAgICAgICAgICAgICAgd2hlbiAnWydcbiAgICAgICAgICAgICAgICAgICAgIyBOZXN0ZWQgc2VxdWVuY2VcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0LnB1c2ggQHBhcnNlU2VxdWVuY2Ugc2VxdWVuY2UsIGNvbnRleHRcbiAgICAgICAgICAgICAgICAgICAge2l9ID0gY29udGV4dFxuICAgICAgICAgICAgICAgIHdoZW4gJ3snXG4gICAgICAgICAgICAgICAgICAgICMgTmVzdGVkIG1hcHBpbmdcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0LnB1c2ggQHBhcnNlTWFwcGluZyBzZXF1ZW5jZSwgY29udGV4dFxuICAgICAgICAgICAgICAgICAgICB7aX0gPSBjb250ZXh0XG4gICAgICAgICAgICAgICAgd2hlbiAnXSdcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG91dHB1dFxuICAgICAgICAgICAgICAgIHdoZW4gJywnLCAnICcsIFwiXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgIyBEbyBub3RoaW5nXG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBpc1F1b3RlZCA9IChzZXF1ZW5jZS5jaGFyQXQoaSkgaW4gWydcIicsIFwiJ1wiXSlcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBAcGFyc2VTY2FsYXIgc2VxdWVuY2UsIFsnLCcsICddJ10sIFsnXCInLCBcIidcIl0sIGNvbnRleHRcbiAgICAgICAgICAgICAgICAgICAge2l9ID0gY29udGV4dFxuXG4gICAgICAgICAgICAgICAgICAgIGlmIG5vdChpc1F1b3RlZCkgYW5kIHR5cGVvZih2YWx1ZSkgaXMgJ3N0cmluZycgYW5kICh2YWx1ZS5pbmRleE9mKCc6ICcpIGlzbnQgLTEgb3IgdmFsdWUuaW5kZXhPZihcIjpcXG5cIikgaXNudCAtMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICMgRW1iZWRkZWQgbWFwcGluZz9cbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gQHBhcnNlTWFwcGluZyAneycrdmFsdWUrJ30nXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRjaCBlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBObywgaXQncyBub3RcblxuXG4gICAgICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoIHZhbHVlXG5cbiAgICAgICAgICAgICAgICAgICAgLS1pXG5cbiAgICAgICAgICAgICsraVxuXG4gICAgICAgIHRocm93IG5ldyBQYXJzZUV4Y2VwdGlvbiAnTWFsZm9ybWVkIGlubGluZSBZQU1MIHN0cmluZyAnK3NlcXVlbmNlXG5cblxuICAgICMgUGFyc2VzIGEgbWFwcGluZyB0byBhIFlBTUwgc3RyaW5nLlxuICAgICNcbiAgICAjIEBwYXJhbSBbU3RyaW5nXSAgIG1hcHBpbmdcbiAgICAjIEBwYXJhbSBbT2JqZWN0XSAgIGNvbnRleHRcbiAgICAjXG4gICAgIyBAcmV0dXJuIFtTdHJpbmddICBBIFlBTUwgc3RyaW5nXG4gICAgI1xuICAgICMgQHRocm93IFtQYXJzZUV4Y2VwdGlvbl0gV2hlbiBtYWxmb3JtZWQgaW5saW5lIFlBTUwgc3RyaW5nIGlzIHBhcnNlZFxuICAgICNcbiAgICBAcGFyc2VNYXBwaW5nOiAobWFwcGluZywgY29udGV4dCkgLT5cbiAgICAgICAgb3V0cHV0ID0ge31cbiAgICAgICAgbGVuID0gbWFwcGluZy5sZW5ndGhcbiAgICAgICAge2l9ID0gY29udGV4dFxuICAgICAgICBpICs9IDFcblxuICAgICAgICAjIHtmb286IGJhciwgYmFyOmZvbywgLi4ufVxuICAgICAgICBzaG91bGRDb250aW51ZVdoaWxlTG9vcCA9IGZhbHNlXG4gICAgICAgIHdoaWxlIGkgPCBsZW5cbiAgICAgICAgICAgIGNvbnRleHQuaSA9IGlcbiAgICAgICAgICAgIHN3aXRjaCBtYXBwaW5nLmNoYXJBdChpKVxuICAgICAgICAgICAgICAgIHdoZW4gJyAnLCAnLCcsIFwiXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgKytpXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuaSA9IGlcbiAgICAgICAgICAgICAgICAgICAgc2hvdWxkQ29udGludWVXaGlsZUxvb3AgPSB0cnVlXG4gICAgICAgICAgICAgICAgd2hlbiAnfSdcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG91dHB1dFxuXG4gICAgICAgICAgICBpZiBzaG91bGRDb250aW51ZVdoaWxlTG9vcFxuICAgICAgICAgICAgICAgIHNob3VsZENvbnRpbnVlV2hpbGVMb29wID0gZmFsc2VcbiAgICAgICAgICAgICAgICBjb250aW51ZVxuXG4gICAgICAgICAgICAjIEtleVxuICAgICAgICAgICAga2V5ID0gQHBhcnNlU2NhbGFyIG1hcHBpbmcsIFsnOicsICcgJywgXCJcXG5cIl0sIFsnXCInLCBcIidcIl0sIGNvbnRleHQsIGZhbHNlXG4gICAgICAgICAgICB7aX0gPSBjb250ZXh0XG5cbiAgICAgICAgICAgICMgVmFsdWVcbiAgICAgICAgICAgIGRvbmUgPSBmYWxzZVxuXG4gICAgICAgICAgICB3aGlsZSBpIDwgbGVuXG4gICAgICAgICAgICAgICAgY29udGV4dC5pID0gaVxuICAgICAgICAgICAgICAgIHN3aXRjaCBtYXBwaW5nLmNoYXJBdChpKVxuICAgICAgICAgICAgICAgICAgICB3aGVuICdbJ1xuICAgICAgICAgICAgICAgICAgICAgICAgIyBOZXN0ZWQgc2VxdWVuY2VcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gQHBhcnNlU2VxdWVuY2UgbWFwcGluZywgY29udGV4dFxuICAgICAgICAgICAgICAgICAgICAgICAge2l9ID0gY29udGV4dFxuICAgICAgICAgICAgICAgICAgICAgICAgIyBTcGVjOiBLZXlzIE1VU1QgYmUgdW5pcXVlOyBmaXJzdCBvbmUgd2lucy5cbiAgICAgICAgICAgICAgICAgICAgICAgICMgUGFyc2VyIGNhbm5vdCBhYm9ydCB0aGlzIG1hcHBpbmcgZWFybGllciwgc2luY2UgbGluZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICMgYXJlIHByb2Nlc3NlZCBzZXF1ZW50aWFsbHkuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiBvdXRwdXRba2V5XSA9PSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXRba2V5XSA9IHZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICBkb25lID0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB3aGVuICd7J1xuICAgICAgICAgICAgICAgICAgICAgICAgIyBOZXN0ZWQgbWFwcGluZ1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBAcGFyc2VNYXBwaW5nIG1hcHBpbmcsIGNvbnRleHRcbiAgICAgICAgICAgICAgICAgICAgICAgIHtpfSA9IGNvbnRleHRcbiAgICAgICAgICAgICAgICAgICAgICAgICMgU3BlYzogS2V5cyBNVVNUIGJlIHVuaXF1ZTsgZmlyc3Qgb25lIHdpbnMuXG4gICAgICAgICAgICAgICAgICAgICAgICAjIFBhcnNlciBjYW5ub3QgYWJvcnQgdGhpcyBtYXBwaW5nIGVhcmxpZXIsIHNpbmNlIGxpbmVzXG4gICAgICAgICAgICAgICAgICAgICAgICAjIGFyZSBwcm9jZXNzZWQgc2VxdWVudGlhbGx5LlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgb3V0cHV0W2tleV0gPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0W2tleV0gPSB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgZG9uZSA9IHRydWVcbiAgICAgICAgICAgICAgICAgICAgd2hlbiAnOicsICcgJywgXCJcXG5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgIyBEbyBub3RoaW5nXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gQHBhcnNlU2NhbGFyIG1hcHBpbmcsIFsnLCcsICd9J10sIFsnXCInLCBcIidcIl0sIGNvbnRleHRcbiAgICAgICAgICAgICAgICAgICAgICAgIHtpfSA9IGNvbnRleHRcbiAgICAgICAgICAgICAgICAgICAgICAgICMgU3BlYzogS2V5cyBNVVNUIGJlIHVuaXF1ZTsgZmlyc3Qgb25lIHdpbnMuXG4gICAgICAgICAgICAgICAgICAgICAgICAjIFBhcnNlciBjYW5ub3QgYWJvcnQgdGhpcyBtYXBwaW5nIGVhcmxpZXIsIHNpbmNlIGxpbmVzXG4gICAgICAgICAgICAgICAgICAgICAgICAjIGFyZSBwcm9jZXNzZWQgc2VxdWVudGlhbGx5LlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgb3V0cHV0W2tleV0gPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0W2tleV0gPSB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgZG9uZSA9IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgIC0taVxuXG4gICAgICAgICAgICAgICAgKytpXG5cbiAgICAgICAgICAgICAgICBpZiBkb25lXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXG5cbiAgICAgICAgdGhyb3cgbmV3IFBhcnNlRXhjZXB0aW9uICdNYWxmb3JtZWQgaW5saW5lIFlBTUwgc3RyaW5nICcrbWFwcGluZ1xuXG5cbiAgICAjIEV2YWx1YXRlcyBzY2FsYXJzIGFuZCByZXBsYWNlcyBtYWdpYyB2YWx1ZXMuXG4gICAgI1xuICAgICMgQHBhcmFtIFtTdHJpbmddICAgc2NhbGFyXG4gICAgI1xuICAgICMgQHJldHVybiBbU3RyaW5nXSAgQSBZQU1MIHN0cmluZ1xuICAgICNcbiAgICBAZXZhbHVhdGVTY2FsYXI6IChzY2FsYXIsIGNvbnRleHQpIC0+XG4gICAgICAgIHNjYWxhciA9IFV0aWxzLnRyaW0oc2NhbGFyKVxuICAgICAgICBzY2FsYXJMb3dlciA9IHNjYWxhci50b0xvd2VyQ2FzZSgpXG5cbiAgICAgICAgc3dpdGNoIHNjYWxhckxvd2VyXG4gICAgICAgICAgICB3aGVuICdudWxsJywgJycsICd+J1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgICAgICB3aGVuICd0cnVlJ1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICB3aGVuICdmYWxzZSdcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIHdoZW4gJy5pbmYnXG4gICAgICAgICAgICAgICAgcmV0dXJuIEluZmluaXR5XG4gICAgICAgICAgICB3aGVuICcubmFuJ1xuICAgICAgICAgICAgICAgIHJldHVybiBOYU5cbiAgICAgICAgICAgIHdoZW4gJy0uaW5mJ1xuICAgICAgICAgICAgICAgIHJldHVybiBJbmZpbml0eVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGZpcnN0Q2hhciA9IHNjYWxhckxvd2VyLmNoYXJBdCgwKVxuICAgICAgICAgICAgICAgIHN3aXRjaCBmaXJzdENoYXJcbiAgICAgICAgICAgICAgICAgICAgd2hlbiAnISdcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0U3BhY2UgPSBzY2FsYXIuaW5kZXhPZignICcpXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiBmaXJzdFNwYWNlIGlzIC0xXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3RXb3JkID0gc2NhbGFyTG93ZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJzdFdvcmQgPSBzY2FsYXJMb3dlclswLi4uZmlyc3RTcGFjZV1cbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCBmaXJzdFdvcmRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGVuICchJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiBmaXJzdFNwYWNlIGlzbnQgLTFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZUludCBAcGFyc2VTY2FsYXIoc2NhbGFyWzIuLl0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hlbiAnIXN0cidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFV0aWxzLmx0cmltIHNjYWxhcls0Li5dXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hlbiAnISFzdHInXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBVdGlscy5sdHJpbSBzY2FsYXJbNS4uXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoZW4gJyEhaW50J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VJbnQoQHBhcnNlU2NhbGFyKHNjYWxhcls1Li5dKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGVuICchIWJvb2wnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBVdGlscy5wYXJzZUJvb2xlYW4oQHBhcnNlU2NhbGFyKHNjYWxhcls2Li5dKSwgZmFsc2UpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hlbiAnISFmbG9hdCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQoQHBhcnNlU2NhbGFyKHNjYWxhcls3Li5dKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGVuICchIXRpbWVzdGFtcCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFV0aWxzLnN0cmluZ1RvRGF0ZShVdGlscy5sdHJpbShzY2FsYXJbMTEuLl0pKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5sZXNzIGNvbnRleHQ/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0ID0gZXhjZXB0aW9uT25JbnZhbGlkVHlwZTogQHNldHRpbmdzLmV4Y2VwdGlvbk9uSW52YWxpZFR5cGUsIG9iamVjdERlY29kZXI6IEBzZXR0aW5ncy5vYmplY3REZWNvZGVyLCBpOiAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtvYmplY3REZWNvZGVyLCBleGNlcHRpb25PbkludmFsaWRUeXBlfSA9IGNvbnRleHRcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiBvYmplY3REZWNvZGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAjIElmIG9iamVjdERlY29kZXIgZnVuY3Rpb24gaXMgZ2l2ZW4sIHdlIGNhbiBkbyBjdXN0b20gZGVjb2Rpbmcgb2YgY3VzdG9tIHR5cGVzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmltbWVkU2NhbGFyID0gVXRpbHMucnRyaW0gc2NhbGFyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJzdFNwYWNlID0gdHJpbW1lZFNjYWxhci5pbmRleE9mKCcgJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIGZpcnN0U3BhY2UgaXMgLTFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2JqZWN0RGVjb2RlciB0cmltbWVkU2NhbGFyLCBudWxsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViVmFsdWUgPSBVdGlscy5sdHJpbSB0cmltbWVkU2NhbGFyW2ZpcnN0U3BhY2UrMS4uXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVubGVzcyBzdWJWYWx1ZS5sZW5ndGggPiAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YlZhbHVlID0gbnVsbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvYmplY3REZWNvZGVyIHRyaW1tZWRTY2FsYXJbMC4uLmZpcnN0U3BhY2VdLCBzdWJWYWx1ZVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIGV4Y2VwdGlvbk9uSW52YWxpZFR5cGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBQYXJzZUV4Y2VwdGlvbiAnQ3VzdG9tIG9iamVjdCBzdXBwb3J0IHdoZW4gcGFyc2luZyBhIFlBTUwgZmlsZSBoYXMgYmVlbiBkaXNhYmxlZC4nXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgICAgICAgICAgICAgd2hlbiAnMCdcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICcweCcgaXMgc2NhbGFyWzAuLi4yXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBVdGlscy5oZXhEZWMgc2NhbGFyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIFV0aWxzLmlzRGlnaXRzIHNjYWxhclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBVdGlscy5vY3REZWMgc2NhbGFyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIFV0aWxzLmlzTnVtZXJpYyBzY2FsYXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VGbG9hdCBzY2FsYXJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2NhbGFyXG4gICAgICAgICAgICAgICAgICAgIHdoZW4gJysnXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiBVdGlscy5pc0RpZ2l0cyBzY2FsYXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByYXcgPSBzY2FsYXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXN0ID0gcGFyc2VJbnQocmF3KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIHJhdyBpcyBTdHJpbmcoY2FzdClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhc3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByYXdcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgVXRpbHMuaXNOdW1lcmljIHNjYWxhclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZUZsb2F0IHNjYWxhclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiBAUEFUVEVSTl9USE9VU0FORF9OVU1FUklDX1NDQUxBUi50ZXN0IHNjYWxhclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZUZsb2F0KHNjYWxhci5yZXBsYWNlKCcsJywgJycpKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNjYWxhclxuICAgICAgICAgICAgICAgICAgICB3aGVuICctJ1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgVXRpbHMuaXNEaWdpdHMoc2NhbGFyWzEuLl0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgJzAnIGlzIHNjYWxhci5jaGFyQXQoMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC1VdGlscy5vY3REZWMoc2NhbGFyWzEuLl0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYXcgPSBzY2FsYXJbMS4uXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXN0ID0gcGFyc2VJbnQocmF3KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiByYXcgaXMgU3RyaW5nKGNhc3QpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gLWNhc3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC1yYXdcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgVXRpbHMuaXNOdW1lcmljIHNjYWxhclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZUZsb2F0IHNjYWxhclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiBAUEFUVEVSTl9USE9VU0FORF9OVU1FUklDX1NDQUxBUi50ZXN0IHNjYWxhclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZUZsb2F0KHNjYWxhci5yZXBsYWNlKCcsJywgJycpKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNjYWxhclxuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiBkYXRlID0gVXRpbHMuc3RyaW5nVG9EYXRlKHNjYWxhcilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiBVdGlscy5pc051bWVyaWMoc2NhbGFyKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZUZsb2F0IHNjYWxhclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiBAUEFUVEVSTl9USE9VU0FORF9OVU1FUklDX1NDQUxBUi50ZXN0IHNjYWxhclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZUZsb2F0KHNjYWxhci5yZXBsYWNlKCcsJywgJycpKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNjYWxhclxuXG5tb2R1bGUuZXhwb3J0cyA9IElubGluZVxuIiwiXG5JbmxpbmUgICAgICAgICAgPSByZXF1aXJlICcuL0lubGluZSdcblBhdHRlcm4gICAgICAgICA9IHJlcXVpcmUgJy4vUGF0dGVybidcblV0aWxzICAgICAgICAgICA9IHJlcXVpcmUgJy4vVXRpbHMnXG5QYXJzZUV4Y2VwdGlvbiAgPSByZXF1aXJlICcuL0V4Y2VwdGlvbi9QYXJzZUV4Y2VwdGlvbidcblxuIyBQYXJzZXIgcGFyc2VzIFlBTUwgc3RyaW5ncyB0byBjb252ZXJ0IHRoZW0gdG8gSmF2YVNjcmlwdCBvYmplY3RzLlxuI1xuY2xhc3MgUGFyc2VyXG5cbiAgICAjIFByZS1jb21waWxlZCBwYXR0ZXJuc1xuICAgICNcbiAgICBQQVRURVJOX0ZPTERFRF9TQ0FMQVJfQUxMOiAgICAgICAgICAgICAgbmV3IFBhdHRlcm4gJ14oPzooPzx0eXBlPiFbXlxcXFx8Pl0qKVxcXFxzKyk/KD88c2VwYXJhdG9yPlxcXFx8fD4pKD88bW9kaWZpZXJzPlxcXFwrfFxcXFwtfFxcXFxkK3xcXFxcK1xcXFxkK3xcXFxcLVxcXFxkK3xcXFxcZCtcXFxcK3xcXFxcZCtcXFxcLSk/KD88Y29tbWVudHM+ICsjLiopPyQnXG4gICAgUEFUVEVSTl9GT0xERURfU0NBTEFSX0VORDogICAgICAgICAgICAgIG5ldyBQYXR0ZXJuICcoPzxzZXBhcmF0b3I+XFxcXHx8PikoPzxtb2RpZmllcnM+XFxcXCt8XFxcXC18XFxcXGQrfFxcXFwrXFxcXGQrfFxcXFwtXFxcXGQrfFxcXFxkK1xcXFwrfFxcXFxkK1xcXFwtKT8oPzxjb21tZW50cz4gKyMuKik/JCdcbiAgICBQQVRURVJOX1NFUVVFTkNFX0lURU06ICAgICAgICAgICAgICAgICAgbmV3IFBhdHRlcm4gJ15cXFxcLSgoPzxsZWFkc3BhY2VzPlxcXFxzKykoPzx2YWx1ZT4uKz8pKT9cXFxccyokJ1xuICAgIFBBVFRFUk5fQU5DSE9SX1ZBTFVFOiAgICAgICAgICAgICAgICAgICBuZXcgUGF0dGVybiAnXiYoPzxyZWY+W14gXSspICooPzx2YWx1ZT4uKiknXG4gICAgUEFUVEVSTl9DT01QQUNUX05PVEFUSU9OOiAgICAgICAgICAgICAgIG5ldyBQYXR0ZXJuICdeKD88a2V5PicrSW5saW5lLlJFR0VYX1FVT1RFRF9TVFJJTkcrJ3xbXiBcXCdcIlxcXFx7XFxcXFtdLio/KSAqXFxcXDooXFxcXHMrKD88dmFsdWU+Lis/KSk/XFxcXHMqJCdcbiAgICBQQVRURVJOX01BUFBJTkdfSVRFTTogICAgICAgICAgICAgICAgICAgbmV3IFBhdHRlcm4gJ14oPzxrZXk+JytJbmxpbmUuUkVHRVhfUVVPVEVEX1NUUklORysnfFteIFxcJ1wiXFxcXFtcXFxce10uKj8pICpcXFxcOihcXFxccysoPzx2YWx1ZT4uKz8pKT9cXFxccyokJ1xuICAgIFBBVFRFUk5fREVDSU1BTDogICAgICAgICAgICAgICAgICAgICAgICBuZXcgUGF0dGVybiAnXFxcXGQrJ1xuICAgIFBBVFRFUk5fSU5ERU5UX1NQQUNFUzogICAgICAgICAgICAgICAgICBuZXcgUGF0dGVybiAnXiArJ1xuICAgIFBBVFRFUk5fVFJBSUxJTkdfTElORVM6ICAgICAgICAgICAgICAgICBuZXcgUGF0dGVybiAnKFxcbiopJCdcbiAgICBQQVRURVJOX1lBTUxfSEVBREVSOiAgICAgICAgICAgICAgICAgICAgbmV3IFBhdHRlcm4gJ15cXFxcJVlBTUxbOiBdW1xcXFxkXFxcXC5dKy4qXFxuJ1xuICAgIFBBVFRFUk5fTEVBRElOR19DT01NRU5UUzogICAgICAgICAgICAgICBuZXcgUGF0dGVybiAnXihcXFxcIy4qP1xcbikrJ1xuICAgIFBBVFRFUk5fRE9DVU1FTlRfTUFSS0VSX1NUQVJUOiAgICAgICAgICBuZXcgUGF0dGVybiAnXlxcXFwtXFxcXC1cXFxcLS4qP1xcbidcbiAgICBQQVRURVJOX0RPQ1VNRU5UX01BUktFUl9FTkQ6ICAgICAgICAgICAgbmV3IFBhdHRlcm4gJ15cXFxcLlxcXFwuXFxcXC5cXFxccyokJ1xuICAgIFBBVFRFUk5fRk9MREVEX1NDQUxBUl9CWV9JTkRFTlRBVElPTjogICB7fVxuXG4gICAgIyBDb250ZXh0IHR5cGVzXG4gICAgI1xuICAgIENPTlRFWFRfTk9ORTogICAgICAgMFxuICAgIENPTlRFWFRfU0VRVUVOQ0U6ICAgMVxuICAgIENPTlRFWFRfTUFQUElORzogICAgMlxuXG5cbiAgICAjIENvbnN0cnVjdG9yXG4gICAgI1xuICAgICMgQHBhcmFtIFtJbnRlZ2VyXSAgb2Zmc2V0ICBUaGUgb2Zmc2V0IG9mIFlBTUwgZG9jdW1lbnQgKHVzZWQgZm9yIGxpbmUgbnVtYmVycyBpbiBlcnJvciBtZXNzYWdlcylcbiAgICAjXG4gICAgY29uc3RydWN0b3I6IChAb2Zmc2V0ID0gMCkgLT5cbiAgICAgICAgQGxpbmVzICAgICAgICAgID0gW11cbiAgICAgICAgQGN1cnJlbnRMaW5lTmIgID0gLTFcbiAgICAgICAgQGN1cnJlbnRMaW5lICAgID0gJydcbiAgICAgICAgQHJlZnMgICAgICAgICAgID0ge31cblxuXG4gICAgIyBQYXJzZXMgYSBZQU1MIHN0cmluZyB0byBhIEphdmFTY3JpcHQgdmFsdWUuXG4gICAgI1xuICAgICMgQHBhcmFtIFtTdHJpbmddICAgdmFsdWUgICAgICAgICAgICAgICAgICAgQSBZQU1MIHN0cmluZ1xuICAgICMgQHBhcmFtIFtCb29sZWFuXSAgZXhjZXB0aW9uT25JbnZhbGlkVHlwZSAgdHJ1ZSBpZiBhbiBleGNlcHRpb24gbXVzdCBiZSB0aHJvd24gb24gaW52YWxpZCB0eXBlcyAoYSBKYXZhU2NyaXB0IHJlc291cmNlIG9yIG9iamVjdCksIGZhbHNlIG90aGVyd2lzZVxuICAgICMgQHBhcmFtIFtGdW5jdGlvbl0gb2JqZWN0RGVjb2RlciAgICAgICAgICAgQSBmdW5jdGlvbiB0byBkZXNlcmlhbGl6ZSBjdXN0b20gb2JqZWN0cywgbnVsbCBvdGhlcndpc2VcbiAgICAjXG4gICAgIyBAcmV0dXJuIFtPYmplY3RdICBBIEphdmFTY3JpcHQgdmFsdWVcbiAgICAjXG4gICAgIyBAdGhyb3cgW1BhcnNlRXhjZXB0aW9uXSBJZiB0aGUgWUFNTCBpcyBub3QgdmFsaWRcbiAgICAjXG4gICAgcGFyc2U6ICh2YWx1ZSwgZXhjZXB0aW9uT25JbnZhbGlkVHlwZSA9IGZhbHNlLCBvYmplY3REZWNvZGVyID0gbnVsbCkgLT5cbiAgICAgICAgQGN1cnJlbnRMaW5lTmIgPSAtMVxuICAgICAgICBAY3VycmVudExpbmUgPSAnJ1xuICAgICAgICBAbGluZXMgPSBAY2xlYW51cCh2YWx1ZSkuc3BsaXQgXCJcXG5cIlxuXG4gICAgICAgIGRhdGEgPSBudWxsXG4gICAgICAgIGNvbnRleHQgPSBAQ09OVEVYVF9OT05FXG4gICAgICAgIGFsbG93T3ZlcndyaXRlID0gZmFsc2VcbiAgICAgICAgd2hpbGUgQG1vdmVUb05leHRMaW5lKClcbiAgICAgICAgICAgIGlmIEBpc0N1cnJlbnRMaW5lRW1wdHkoKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlXG5cbiAgICAgICAgICAgICMgVGFiP1xuICAgICAgICAgICAgaWYgXCJcXHRcIiBpcyBAY3VycmVudExpbmVbMF1cbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUGFyc2VFeGNlcHRpb24gJ0EgWUFNTCBmaWxlIGNhbm5vdCBjb250YWluIHRhYnMgYXMgaW5kZW50YXRpb24uJywgQGdldFJlYWxDdXJyZW50TGluZU5iKCkgKyAxLCBAY3VycmVudExpbmVcblxuICAgICAgICAgICAgaXNSZWYgPSBtZXJnZU5vZGUgPSBmYWxzZVxuICAgICAgICAgICAgaWYgdmFsdWVzID0gQFBBVFRFUk5fU0VRVUVOQ0VfSVRFTS5leGVjIEBjdXJyZW50TGluZVxuICAgICAgICAgICAgICAgIGlmIEBDT05URVhUX01BUFBJTkcgaXMgY29udGV4dFxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUGFyc2VFeGNlcHRpb24gJ1lvdSBjYW5ub3QgZGVmaW5lIGEgc2VxdWVuY2UgaXRlbSB3aGVuIGluIGEgbWFwcGluZydcbiAgICAgICAgICAgICAgICBjb250ZXh0ID0gQENPTlRFWFRfU0VRVUVOQ0VcbiAgICAgICAgICAgICAgICBkYXRhID89IFtdXG5cbiAgICAgICAgICAgICAgICBpZiB2YWx1ZXMudmFsdWU/IGFuZCBtYXRjaGVzID0gQFBBVFRFUk5fQU5DSE9SX1ZBTFVFLmV4ZWMgdmFsdWVzLnZhbHVlXG4gICAgICAgICAgICAgICAgICAgIGlzUmVmID0gbWF0Y2hlcy5yZWZcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzLnZhbHVlID0gbWF0Y2hlcy52YWx1ZVxuXG4gICAgICAgICAgICAgICAgIyBBcnJheVxuICAgICAgICAgICAgICAgIGlmIG5vdCh2YWx1ZXMudmFsdWU/KSBvciAnJyBpcyBVdGlscy50cmltKHZhbHVlcy52YWx1ZSwgJyAnKSBvciBVdGlscy5sdHJpbSh2YWx1ZXMudmFsdWUsICcgJykuaW5kZXhPZignIycpIGlzIDBcbiAgICAgICAgICAgICAgICAgICAgaWYgQGN1cnJlbnRMaW5lTmIgPCBAbGluZXMubGVuZ3RoIC0gMSBhbmQgbm90IEBpc05leHRMaW5lVW5JbmRlbnRlZENvbGxlY3Rpb24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgYyA9IEBnZXRSZWFsQ3VycmVudExpbmVOYigpICsgMVxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VyID0gbmV3IFBhcnNlciBjXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJzZXIucmVmcyA9IEByZWZzXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLnB1c2ggcGFyc2VyLnBhcnNlKEBnZXROZXh0RW1iZWRCbG9jayhudWxsLCB0cnVlKSwgZXhjZXB0aW9uT25JbnZhbGlkVHlwZSwgb2JqZWN0RGVjb2RlcilcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5wdXNoIG51bGxcblxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgaWYgdmFsdWVzLmxlYWRzcGFjZXM/Lmxlbmd0aCBhbmQgbWF0Y2hlcyA9IEBQQVRURVJOX0NPTVBBQ1RfTk9UQVRJT04uZXhlYyB2YWx1ZXMudmFsdWVcblxuICAgICAgICAgICAgICAgICAgICAgICAgIyBUaGlzIGlzIGEgY29tcGFjdCBub3RhdGlvbiBlbGVtZW50LCBhZGQgdG8gbmV4dCBibG9jayBhbmQgcGFyc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIGMgPSBAZ2V0UmVhbEN1cnJlbnRMaW5lTmIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VyID0gbmV3IFBhcnNlciBjXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJzZXIucmVmcyA9IEByZWZzXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGJsb2NrID0gdmFsdWVzLnZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRlbnQgPSBAZ2V0Q3VycmVudExpbmVJbmRlbnRhdGlvbigpXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiBAaXNOZXh0TGluZUluZGVudGVkKGZhbHNlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJsb2NrICs9IFwiXFxuXCIrQGdldE5leHRFbWJlZEJsb2NrKGluZGVudCArIHZhbHVlcy5sZWFkc3BhY2VzLmxlbmd0aCArIDEsIHRydWUpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEucHVzaCBwYXJzZXIucGFyc2UgYmxvY2ssIGV4Y2VwdGlvbk9uSW52YWxpZFR5cGUsIG9iamVjdERlY29kZXJcblxuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLnB1c2ggQHBhcnNlVmFsdWUgdmFsdWVzLnZhbHVlLCBleGNlcHRpb25PbkludmFsaWRUeXBlLCBvYmplY3REZWNvZGVyXG5cbiAgICAgICAgICAgIGVsc2UgaWYgKHZhbHVlcyA9IEBQQVRURVJOX01BUFBJTkdfSVRFTS5leGVjIEBjdXJyZW50TGluZSkgYW5kIHZhbHVlcy5rZXkuaW5kZXhPZignICMnKSBpcyAtMVxuICAgICAgICAgICAgICAgIGlmIEBDT05URVhUX1NFUVVFTkNFIGlzIGNvbnRleHRcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFBhcnNlRXhjZXB0aW9uICdZb3UgY2Fubm90IGRlZmluZSBhIG1hcHBpbmcgaXRlbSB3aGVuIGluIGEgc2VxdWVuY2UnXG4gICAgICAgICAgICAgICAgY29udGV4dCA9IEBDT05URVhUX01BUFBJTkdcbiAgICAgICAgICAgICAgICBkYXRhID89IHt9XG5cbiAgICAgICAgICAgICAgICAjIEZvcmNlIGNvcnJlY3Qgc2V0dGluZ3NcbiAgICAgICAgICAgICAgICBJbmxpbmUuY29uZmlndXJlIGV4Y2VwdGlvbk9uSW52YWxpZFR5cGUsIG9iamVjdERlY29kZXJcbiAgICAgICAgICAgICAgICB0cnlcbiAgICAgICAgICAgICAgICAgICAga2V5ID0gSW5saW5lLnBhcnNlU2NhbGFyIHZhbHVlcy5rZXlcbiAgICAgICAgICAgICAgICBjYXRjaCBlXG4gICAgICAgICAgICAgICAgICAgIGUucGFyc2VkTGluZSA9IEBnZXRSZWFsQ3VycmVudExpbmVOYigpICsgMVxuICAgICAgICAgICAgICAgICAgICBlLnNuaXBwZXQgPSBAY3VycmVudExpbmVcblxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlXG5cbiAgICAgICAgICAgICAgICBpZiAnPDwnIGlzIGtleVxuICAgICAgICAgICAgICAgICAgICBtZXJnZU5vZGUgPSB0cnVlXG4gICAgICAgICAgICAgICAgICAgIGFsbG93T3ZlcndyaXRlID0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICBpZiB2YWx1ZXMudmFsdWU/LmluZGV4T2YoJyonKSBpcyAwXG4gICAgICAgICAgICAgICAgICAgICAgICByZWZOYW1lID0gdmFsdWVzLnZhbHVlWzEuLl1cbiAgICAgICAgICAgICAgICAgICAgICAgIHVubGVzcyBAcmVmc1tyZWZOYW1lXT9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUGFyc2VFeGNlcHRpb24gJ1JlZmVyZW5jZSBcIicrcmVmTmFtZSsnXCIgZG9lcyBub3QgZXhpc3QuJywgQGdldFJlYWxDdXJyZW50TGluZU5iKCkgKyAxLCBAY3VycmVudExpbmVcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmVmFsdWUgPSBAcmVmc1tyZWZOYW1lXVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiB0eXBlb2YgcmVmVmFsdWUgaXNudCAnb2JqZWN0J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBQYXJzZUV4Y2VwdGlvbiAnWUFNTCBtZXJnZSBrZXlzIHVzZWQgd2l0aCBhIHNjYWxhciB2YWx1ZSBpbnN0ZWFkIG9mIGFuIG9iamVjdC4nLCBAZ2V0UmVhbEN1cnJlbnRMaW5lTmIoKSArIDEsIEBjdXJyZW50TGluZVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiByZWZWYWx1ZSBpbnN0YW5jZW9mIEFycmF5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBNZXJnZSBhcnJheSB3aXRoIG9iamVjdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciB2YWx1ZSwgaSBpbiByZWZWYWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhW1N0cmluZyhpKV0gPz0gdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAjIE1lcmdlIG9iamVjdHNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3Iga2V5LCB2YWx1ZSBvZiByZWZWYWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhW2tleV0gPz0gdmFsdWVcblxuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiB2YWx1ZXMudmFsdWU/IGFuZCB2YWx1ZXMudmFsdWUgaXNudCAnJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWVzLnZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBAZ2V0TmV4dEVtYmVkQmxvY2soKVxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBjID0gQGdldFJlYWxDdXJyZW50TGluZU5iKCkgKyAxXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJzZXIgPSBuZXcgUGFyc2VyIGNcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlci5yZWZzID0gQHJlZnNcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlZCA9IHBhcnNlci5wYXJzZSB2YWx1ZSwgZXhjZXB0aW9uT25JbnZhbGlkVHlwZVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB1bmxlc3MgdHlwZW9mIHBhcnNlZCBpcyAnb2JqZWN0J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBQYXJzZUV4Y2VwdGlvbiAnWUFNTCBtZXJnZSBrZXlzIHVzZWQgd2l0aCBhIHNjYWxhciB2YWx1ZSBpbnN0ZWFkIG9mIGFuIG9iamVjdC4nLCBAZ2V0UmVhbEN1cnJlbnRMaW5lTmIoKSArIDEsIEBjdXJyZW50TGluZVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiBwYXJzZWQgaW5zdGFuY2VvZiBBcnJheVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICMgSWYgdGhlIHZhbHVlIGFzc29jaWF0ZWQgd2l0aCB0aGUgbWVyZ2Uga2V5IGlzIGEgc2VxdWVuY2UsIHRoZW4gdGhpcyBzZXF1ZW5jZSBpcyBleHBlY3RlZCB0byBjb250YWluIG1hcHBpbmcgbm9kZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAjIGFuZCBlYWNoIG9mIHRoZXNlIG5vZGVzIGlzIG1lcmdlZCBpbiB0dXJuIGFjY29yZGluZyB0byBpdHMgb3JkZXIgaW4gdGhlIHNlcXVlbmNlLiBLZXlzIGluIG1hcHBpbmcgbm9kZXMgZWFybGllclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICMgaW4gdGhlIHNlcXVlbmNlIG92ZXJyaWRlIGtleXMgc3BlY2lmaWVkIGluIGxhdGVyIG1hcHBpbmcgbm9kZXMuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIHBhcnNlZEl0ZW0gaW4gcGFyc2VkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVubGVzcyB0eXBlb2YgcGFyc2VkSXRlbSBpcyAnb2JqZWN0J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFBhcnNlRXhjZXB0aW9uICdNZXJnZSBpdGVtcyBtdXN0IGJlIG9iamVjdHMuJywgQGdldFJlYWxDdXJyZW50TGluZU5iKCkgKyAxLCBwYXJzZWRJdGVtXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgcGFyc2VkSXRlbSBpbnN0YW5jZW9mIEFycmF5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAjIE1lcmdlIGFycmF5IHdpdGggb2JqZWN0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgdmFsdWUsIGkgaW4gcGFyc2VkSXRlbVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGsgPSBTdHJpbmcoaSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bmxlc3MgZGF0YS5oYXNPd25Qcm9wZXJ0eShrKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhW2tdID0gdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBNZXJnZSBvYmplY3RzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3Iga2V5LCB2YWx1ZSBvZiBwYXJzZWRJdGVtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5sZXNzIGRhdGEuaGFzT3duUHJvcGVydHkoa2V5KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhW2tleV0gPSB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICMgSWYgdGhlIHZhbHVlIGFzc29jaWF0ZWQgd2l0aCB0aGUga2V5IGlzIGEgc2luZ2xlIG1hcHBpbmcgbm9kZSwgZWFjaCBvZiBpdHMga2V5L3ZhbHVlIHBhaXJzIGlzIGluc2VydGVkIGludG8gdGhlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBjdXJyZW50IG1hcHBpbmcsIHVubGVzcyB0aGUga2V5IGFscmVhZHkgZXhpc3RzIGluIGl0LlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciBrZXksIHZhbHVlIG9mIHBhcnNlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bmxlc3MgZGF0YS5oYXNPd25Qcm9wZXJ0eShrZXkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhW2tleV0gPSB2YWx1ZVxuXG4gICAgICAgICAgICAgICAgZWxzZSBpZiB2YWx1ZXMudmFsdWU/IGFuZCBtYXRjaGVzID0gQFBBVFRFUk5fQU5DSE9SX1ZBTFVFLmV4ZWMgdmFsdWVzLnZhbHVlXG4gICAgICAgICAgICAgICAgICAgIGlzUmVmID0gbWF0Y2hlcy5yZWZcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzLnZhbHVlID0gbWF0Y2hlcy52YWx1ZVxuICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgaWYgbWVyZ2VOb2RlXG4gICAgICAgICAgICAgICAgICAgICMgTWVyZ2Uga2V5c1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgbm90KHZhbHVlcy52YWx1ZT8pIG9yICcnIGlzIFV0aWxzLnRyaW0odmFsdWVzLnZhbHVlLCAnICcpIG9yIFV0aWxzLmx0cmltKHZhbHVlcy52YWx1ZSwgJyAnKS5pbmRleE9mKCcjJykgaXMgMFxuICAgICAgICAgICAgICAgICAgICAjIEhhc2hcbiAgICAgICAgICAgICAgICAgICAgIyBpZiBuZXh0IGxpbmUgaXMgbGVzcyBpbmRlbnRlZCBvciBlcXVhbCwgdGhlbiBpdCBtZWFucyB0aGF0IHRoZSBjdXJyZW50IHZhbHVlIGlzIG51bGxcbiAgICAgICAgICAgICAgICAgICAgaWYgbm90KEBpc05leHRMaW5lSW5kZW50ZWQoKSkgYW5kIG5vdChAaXNOZXh0TGluZVVuSW5kZW50ZWRDb2xsZWN0aW9uKCkpXG4gICAgICAgICAgICAgICAgICAgICAgICAjIFNwZWM6IEtleXMgTVVTVCBiZSB1bmlxdWU7IGZpcnN0IG9uZSB3aW5zLlxuICAgICAgICAgICAgICAgICAgICAgICAgIyBCdXQgb3ZlcndyaXRpbmcgaXMgYWxsb3dlZCB3aGVuIGEgbWVyZ2Ugbm9kZSBpcyB1c2VkIGluIGN1cnJlbnQgYmxvY2suXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiBhbGxvd092ZXJ3cml0ZSBvciBkYXRhW2tleV0gaXMgdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVtrZXldID0gbnVsbFxuXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIGMgPSBAZ2V0UmVhbEN1cnJlbnRMaW5lTmIoKSArIDFcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlciA9IG5ldyBQYXJzZXIgY1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VyLnJlZnMgPSBAcmVmc1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsID0gcGFyc2VyLnBhcnNlIEBnZXROZXh0RW1iZWRCbG9jaygpLCBleGNlcHRpb25PbkludmFsaWRUeXBlLCBvYmplY3REZWNvZGVyXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICMgU3BlYzogS2V5cyBNVVNUIGJlIHVuaXF1ZTsgZmlyc3Qgb25lIHdpbnMuXG4gICAgICAgICAgICAgICAgICAgICAgICAjIEJ1dCBvdmVyd3JpdGluZyBpcyBhbGxvd2VkIHdoZW4gYSBtZXJnZSBub2RlIGlzIHVzZWQgaW4gY3VycmVudCBibG9jay5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIGFsbG93T3ZlcndyaXRlIG9yIGRhdGFba2V5XSBpcyB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhW2tleV0gPSB2YWxcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICB2YWwgPSBAcGFyc2VWYWx1ZSB2YWx1ZXMudmFsdWUsIGV4Y2VwdGlvbk9uSW52YWxpZFR5cGUsIG9iamVjdERlY29kZXJcblxuICAgICAgICAgICAgICAgICAgICAjIFNwZWM6IEtleXMgTVVTVCBiZSB1bmlxdWU7IGZpcnN0IG9uZSB3aW5zLlxuICAgICAgICAgICAgICAgICAgICAjIEJ1dCBvdmVyd3JpdGluZyBpcyBhbGxvd2VkIHdoZW4gYSBtZXJnZSBub2RlIGlzIHVzZWQgaW4gY3VycmVudCBibG9jay5cbiAgICAgICAgICAgICAgICAgICAgaWYgYWxsb3dPdmVyd3JpdGUgb3IgZGF0YVtrZXldIGlzIHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVtrZXldID0gdmFsXG5cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAjIDEtbGluZXIgb3B0aW9uYWxseSBmb2xsb3dlZCBieSBuZXdsaW5lXG4gICAgICAgICAgICAgICAgbGluZUNvdW50ID0gQGxpbmVzLmxlbmd0aFxuICAgICAgICAgICAgICAgIGlmIDEgaXMgbGluZUNvdW50IG9yICgyIGlzIGxpbmVDb3VudCBhbmQgVXRpbHMuaXNFbXB0eShAbGluZXNbMV0pKVxuICAgICAgICAgICAgICAgICAgICB0cnlcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gSW5saW5lLnBhcnNlIEBsaW5lc1swXSwgZXhjZXB0aW9uT25JbnZhbGlkVHlwZSwgb2JqZWN0RGVjb2RlclxuICAgICAgICAgICAgICAgICAgICBjYXRjaCBlXG4gICAgICAgICAgICAgICAgICAgICAgICBlLnBhcnNlZExpbmUgPSBAZ2V0UmVhbEN1cnJlbnRMaW5lTmIoKSArIDFcbiAgICAgICAgICAgICAgICAgICAgICAgIGUuc25pcHBldCA9IEBjdXJyZW50TGluZVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBlXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgdHlwZW9mIHZhbHVlIGlzICdvYmplY3QnXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiB2YWx1ZSBpbnN0YW5jZW9mIEFycmF5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3QgPSB2YWx1ZVswXVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciBrZXkgb2YgdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3QgPSB2YWx1ZVtrZXldXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIHR5cGVvZiBmaXJzdCBpcyAnc3RyaW5nJyBhbmQgZmlyc3QuaW5kZXhPZignKicpIGlzIDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhID0gW11cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgYWxpYXMgaW4gdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5wdXNoIEByZWZzW2FsaWFzWzEuLl1dXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBkYXRhXG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlXG5cbiAgICAgICAgICAgICAgICBlbHNlIGlmIFV0aWxzLmx0cmltKHZhbHVlKS5jaGFyQXQoMCkgaW4gWydbJywgJ3snXVxuICAgICAgICAgICAgICAgICAgICB0cnlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBJbmxpbmUucGFyc2UgdmFsdWUsIGV4Y2VwdGlvbk9uSW52YWxpZFR5cGUsIG9iamVjdERlY29kZXJcbiAgICAgICAgICAgICAgICAgICAgY2F0Y2ggZVxuICAgICAgICAgICAgICAgICAgICAgICAgZS5wYXJzZWRMaW5lID0gQGdldFJlYWxDdXJyZW50TGluZU5iKCkgKyAxXG4gICAgICAgICAgICAgICAgICAgICAgICBlLnNuaXBwZXQgPSBAY3VycmVudExpbmVcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgZVxuXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFBhcnNlRXhjZXB0aW9uICdVbmFibGUgdG8gcGFyc2UuJywgQGdldFJlYWxDdXJyZW50TGluZU5iKCkgKyAxLCBAY3VycmVudExpbmVcblxuICAgICAgICAgICAgaWYgaXNSZWZcbiAgICAgICAgICAgICAgICBpZiBkYXRhIGluc3RhbmNlb2YgQXJyYXlcbiAgICAgICAgICAgICAgICAgICAgQHJlZnNbaXNSZWZdID0gZGF0YVtkYXRhLmxlbmd0aC0xXVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgbGFzdEtleSA9IG51bGxcbiAgICAgICAgICAgICAgICAgICAgZm9yIGtleSBvZiBkYXRhXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0S2V5ID0ga2V5XG4gICAgICAgICAgICAgICAgICAgIEByZWZzW2lzUmVmXSA9IGRhdGFbbGFzdEtleV1cblxuXG4gICAgICAgIGlmIFV0aWxzLmlzRW1wdHkoZGF0YSlcbiAgICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiBkYXRhXG5cblxuICAgIFxuICAgICMgUmV0dXJucyB0aGUgY3VycmVudCBsaW5lIG51bWJlciAodGFrZXMgdGhlIG9mZnNldCBpbnRvIGFjY291bnQpLlxuICAgICNcbiAgICAjIEByZXR1cm4gW0ludGVnZXJdICAgICBUaGUgY3VycmVudCBsaW5lIG51bWJlclxuICAgICNcbiAgICBnZXRSZWFsQ3VycmVudExpbmVOYjogLT5cbiAgICAgICAgcmV0dXJuIEBjdXJyZW50TGluZU5iICsgQG9mZnNldFxuICAgIFxuXG4gICAgIyBSZXR1cm5zIHRoZSBjdXJyZW50IGxpbmUgaW5kZW50YXRpb24uXG4gICAgI1xuICAgICMgQHJldHVybiBbSW50ZWdlcl0gICAgIFRoZSBjdXJyZW50IGxpbmUgaW5kZW50YXRpb25cbiAgICAjXG4gICAgZ2V0Q3VycmVudExpbmVJbmRlbnRhdGlvbjogLT5cbiAgICAgICAgcmV0dXJuIEBjdXJyZW50TGluZS5sZW5ndGggLSBVdGlscy5sdHJpbShAY3VycmVudExpbmUsICcgJykubGVuZ3RoXG5cblxuICAgICMgUmV0dXJucyB0aGUgbmV4dCBlbWJlZCBibG9jayBvZiBZQU1MLlxuICAgICNcbiAgICAjIEBwYXJhbSBbSW50ZWdlcl0gICAgICAgICAgaW5kZW50YXRpb24gVGhlIGluZGVudCBsZXZlbCBhdCB3aGljaCB0aGUgYmxvY2sgaXMgdG8gYmUgcmVhZCwgb3IgbnVsbCBmb3IgZGVmYXVsdFxuICAgICNcbiAgICAjIEByZXR1cm4gW1N0cmluZ10gICAgICAgICAgQSBZQU1MIHN0cmluZ1xuICAgICNcbiAgICAjIEB0aHJvdyBbUGFyc2VFeGNlcHRpb25dICAgV2hlbiBpbmRlbnRhdGlvbiBwcm9ibGVtIGFyZSBkZXRlY3RlZFxuICAgICNcbiAgICBnZXROZXh0RW1iZWRCbG9jazogKGluZGVudGF0aW9uID0gbnVsbCwgaW5jbHVkZVVuaW5kZW50ZWRDb2xsZWN0aW9uID0gZmFsc2UpIC0+XG4gICAgICAgIEBtb3ZlVG9OZXh0TGluZSgpXG5cbiAgICAgICAgaWYgbm90IGluZGVudGF0aW9uP1xuICAgICAgICAgICAgbmV3SW5kZW50ID0gQGdldEN1cnJlbnRMaW5lSW5kZW50YXRpb24oKVxuXG4gICAgICAgICAgICB1bmluZGVudGVkRW1iZWRCbG9jayA9IEBpc1N0cmluZ1VuSW5kZW50ZWRDb2xsZWN0aW9uSXRlbSBAY3VycmVudExpbmVcblxuICAgICAgICAgICAgaWYgbm90KEBpc0N1cnJlbnRMaW5lRW1wdHkoKSkgYW5kIDAgaXMgbmV3SW5kZW50IGFuZCBub3QodW5pbmRlbnRlZEVtYmVkQmxvY2spXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFBhcnNlRXhjZXB0aW9uICdJbmRlbnRhdGlvbiBwcm9ibGVtLicsIEBnZXRSZWFsQ3VycmVudExpbmVOYigpICsgMSwgQGN1cnJlbnRMaW5lXG4gICAgICAgICAgICBcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgbmV3SW5kZW50ID0gaW5kZW50YXRpb25cblxuXG4gICAgICAgIGRhdGEgPSBbQGN1cnJlbnRMaW5lW25ld0luZGVudC4uXV1cblxuICAgICAgICB1bmxlc3MgaW5jbHVkZVVuaW5kZW50ZWRDb2xsZWN0aW9uXG4gICAgICAgICAgICBpc0l0VW5pbmRlbnRlZENvbGxlY3Rpb24gPSBAaXNTdHJpbmdVbkluZGVudGVkQ29sbGVjdGlvbkl0ZW0gQGN1cnJlbnRMaW5lXG5cbiAgICAgICAgIyBDb21tZW50cyBtdXN0IG5vdCBiZSByZW1vdmVkIGluc2lkZSBhIHN0cmluZyBibG9jayAoaWUuIGFmdGVyIGEgbGluZSBlbmRpbmcgd2l0aCBcInxcIilcbiAgICAgICAgIyBUaGV5IG11c3Qgbm90IGJlIHJlbW92ZWQgaW5zaWRlIGEgc3ViLWVtYmVkZGVkIGJsb2NrIGFzIHdlbGxcbiAgICAgICAgcmVtb3ZlQ29tbWVudHNQYXR0ZXJuID0gQFBBVFRFUk5fRk9MREVEX1NDQUxBUl9FTkRcbiAgICAgICAgcmVtb3ZlQ29tbWVudHMgPSBub3QgcmVtb3ZlQ29tbWVudHNQYXR0ZXJuLnRlc3QgQGN1cnJlbnRMaW5lXG5cbiAgICAgICAgd2hpbGUgQG1vdmVUb05leHRMaW5lKClcbiAgICAgICAgICAgIGluZGVudCA9IEBnZXRDdXJyZW50TGluZUluZGVudGF0aW9uKClcblxuICAgICAgICAgICAgaWYgaW5kZW50IGlzIG5ld0luZGVudFxuICAgICAgICAgICAgICAgIHJlbW92ZUNvbW1lbnRzID0gbm90IHJlbW92ZUNvbW1lbnRzUGF0dGVybi50ZXN0IEBjdXJyZW50TGluZVxuXG4gICAgICAgICAgICBpZiBpc0l0VW5pbmRlbnRlZENvbGxlY3Rpb24gYW5kIG5vdCBAaXNTdHJpbmdVbkluZGVudGVkQ29sbGVjdGlvbkl0ZW0oQGN1cnJlbnRMaW5lKSBhbmQgaW5kZW50IGlzIG5ld0luZGVudFxuICAgICAgICAgICAgICAgIEBtb3ZlVG9QcmV2aW91c0xpbmUoKVxuICAgICAgICAgICAgICAgIGJyZWFrXG5cbiAgICAgICAgICAgIGlmIEBpc0N1cnJlbnRMaW5lQmxhbmsoKVxuICAgICAgICAgICAgICAgIGRhdGEucHVzaCBAY3VycmVudExpbmVbbmV3SW5kZW50Li5dXG4gICAgICAgICAgICAgICAgY29udGludWVcblxuICAgICAgICAgICAgaWYgcmVtb3ZlQ29tbWVudHMgYW5kIEBpc0N1cnJlbnRMaW5lQ29tbWVudCgpXG4gICAgICAgICAgICAgICAgaWYgaW5kZW50IGlzIG5ld0luZGVudFxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZVxuXG4gICAgICAgICAgICBpZiBpbmRlbnQgPj0gbmV3SW5kZW50XG4gICAgICAgICAgICAgICAgZGF0YS5wdXNoIEBjdXJyZW50TGluZVtuZXdJbmRlbnQuLl1cbiAgICAgICAgICAgIGVsc2UgaWYgMCBpcyBpbmRlbnRcbiAgICAgICAgICAgICAgICBAbW92ZVRvUHJldmlvdXNMaW5lKClcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBQYXJzZUV4Y2VwdGlvbiAnSW5kZW50YXRpb24gcHJvYmxlbS4nLCBAZ2V0UmVhbEN1cnJlbnRMaW5lTmIoKSArIDEsIEBjdXJyZW50TGluZVxuICAgICAgICBcblxuICAgICAgICByZXR1cm4gZGF0YS5qb2luIFwiXFxuXCJcbiAgICBcblxuICAgICMgTW92ZXMgdGhlIHBhcnNlciB0byB0aGUgbmV4dCBsaW5lLlxuICAgICNcbiAgICAjIEByZXR1cm4gW0Jvb2xlYW5dXG4gICAgI1xuICAgIG1vdmVUb05leHRMaW5lOiAtPlxuICAgICAgICBpZiBAY3VycmVudExpbmVOYiA+PSBAbGluZXMubGVuZ3RoIC0gMVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG5cbiAgICAgICAgQGN1cnJlbnRMaW5lID0gQGxpbmVzWysrQGN1cnJlbnRMaW5lTmJdO1xuXG4gICAgICAgIHJldHVybiB0cnVlXG5cblxuICAgICMgTW92ZXMgdGhlIHBhcnNlciB0byB0aGUgcHJldmlvdXMgbGluZS5cbiAgICAjXG4gICAgbW92ZVRvUHJldmlvdXNMaW5lOiAtPlxuICAgICAgICBAY3VycmVudExpbmUgPSBAbGluZXNbLS1AY3VycmVudExpbmVOYl1cbiAgICAgICAgcmV0dXJuXG5cblxuICAgICMgUGFyc2VzIGEgWUFNTCB2YWx1ZS5cbiAgICAjXG4gICAgIyBAcGFyYW0gW1N0cmluZ10gICB2YWx1ZSAgICAgICAgICAgICAgICAgICBBIFlBTUwgdmFsdWVcbiAgICAjIEBwYXJhbSBbQm9vbGVhbl0gIGV4Y2VwdGlvbk9uSW52YWxpZFR5cGUgIHRydWUgaWYgYW4gZXhjZXB0aW9uIG11c3QgYmUgdGhyb3duIG9uIGludmFsaWQgdHlwZXMgZmFsc2Ugb3RoZXJ3aXNlXG4gICAgIyBAcGFyYW0gW0Z1bmN0aW9uXSBvYmplY3REZWNvZGVyICAgICAgICAgICBBIGZ1bmN0aW9uIHRvIGRlc2VyaWFsaXplIGN1c3RvbSBvYmplY3RzLCBudWxsIG90aGVyd2lzZVxuICAgICNcbiAgICAjIEByZXR1cm4gW09iamVjdF0gQSBKYXZhU2NyaXB0IHZhbHVlXG4gICAgI1xuICAgICMgQHRocm93IFtQYXJzZUV4Y2VwdGlvbl0gV2hlbiByZWZlcmVuY2UgZG9lcyBub3QgZXhpc3RcbiAgICAjXG4gICAgcGFyc2VWYWx1ZTogKHZhbHVlLCBleGNlcHRpb25PbkludmFsaWRUeXBlLCBvYmplY3REZWNvZGVyKSAtPlxuICAgICAgICBpZiAwIGlzIHZhbHVlLmluZGV4T2YoJyonKVxuICAgICAgICAgICAgcG9zID0gdmFsdWUuaW5kZXhPZiAnIydcbiAgICAgICAgICAgIGlmIHBvcyBpc250IC0xXG4gICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5zdWJzdHIoMSwgcG9zLTIpXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZVsxLi5dXG5cbiAgICAgICAgICAgIGlmIEByZWZzW3ZhbHVlXSBpcyB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUGFyc2VFeGNlcHRpb24gJ1JlZmVyZW5jZSBcIicrdmFsdWUrJ1wiIGRvZXMgbm90IGV4aXN0LicsIEBjdXJyZW50TGluZVxuXG4gICAgICAgICAgICByZXR1cm4gQHJlZnNbdmFsdWVdXG5cblxuICAgICAgICBpZiBtYXRjaGVzID0gQFBBVFRFUk5fRk9MREVEX1NDQUxBUl9BTEwuZXhlYyB2YWx1ZVxuICAgICAgICAgICAgbW9kaWZpZXJzID0gbWF0Y2hlcy5tb2RpZmllcnMgPyAnJ1xuXG4gICAgICAgICAgICBmb2xkZWRJbmRlbnQgPSBNYXRoLmFicyhwYXJzZUludChtb2RpZmllcnMpKVxuICAgICAgICAgICAgaWYgaXNOYU4oZm9sZGVkSW5kZW50KSB0aGVuIGZvbGRlZEluZGVudCA9IDBcbiAgICAgICAgICAgIHZhbCA9IEBwYXJzZUZvbGRlZFNjYWxhciBtYXRjaGVzLnNlcGFyYXRvciwgQFBBVFRFUk5fREVDSU1BTC5yZXBsYWNlKG1vZGlmaWVycywgJycpLCBmb2xkZWRJbmRlbnRcbiAgICAgICAgICAgIGlmIG1hdGNoZXMudHlwZT9cbiAgICAgICAgICAgICAgICAjIEZvcmNlIGNvcnJlY3Qgc2V0dGluZ3NcbiAgICAgICAgICAgICAgICBJbmxpbmUuY29uZmlndXJlIGV4Y2VwdGlvbk9uSW52YWxpZFR5cGUsIG9iamVjdERlY29kZXJcbiAgICAgICAgICAgICAgICByZXR1cm4gSW5saW5lLnBhcnNlU2NhbGFyIG1hdGNoZXMudHlwZSsnICcrdmFsXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbFxuXG4gICAgICAgIHRyeVxuICAgICAgICAgICAgcmV0dXJuIElubGluZS5wYXJzZSB2YWx1ZSwgZXhjZXB0aW9uT25JbnZhbGlkVHlwZSwgb2JqZWN0RGVjb2RlclxuICAgICAgICBjYXRjaCBlXG4gICAgICAgICAgICAjIFRyeSB0byBwYXJzZSBtdWx0aWxpbmUgY29tcGFjdCBzZXF1ZW5jZSBvciBtYXBwaW5nXG4gICAgICAgICAgICBpZiB2YWx1ZS5jaGFyQXQoMCkgaW4gWydbJywgJ3snXSBhbmQgZSBpbnN0YW5jZW9mIFBhcnNlRXhjZXB0aW9uIGFuZCBAaXNOZXh0TGluZUluZGVudGVkKClcbiAgICAgICAgICAgICAgICB2YWx1ZSArPSBcIlxcblwiICsgQGdldE5leHRFbWJlZEJsb2NrKClcbiAgICAgICAgICAgICAgICB0cnlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIElubGluZS5wYXJzZSB2YWx1ZSwgZXhjZXB0aW9uT25JbnZhbGlkVHlwZSwgb2JqZWN0RGVjb2RlclxuICAgICAgICAgICAgICAgIGNhdGNoIGVcbiAgICAgICAgICAgICAgICAgICAgZS5wYXJzZWRMaW5lID0gQGdldFJlYWxDdXJyZW50TGluZU5iKCkgKyAxXG4gICAgICAgICAgICAgICAgICAgIGUuc25pcHBldCA9IEBjdXJyZW50TGluZVxuXG4gICAgICAgICAgICAgICAgICAgIHRocm93IGVcblxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGUucGFyc2VkTGluZSA9IEBnZXRSZWFsQ3VycmVudExpbmVOYigpICsgMVxuICAgICAgICAgICAgICAgIGUuc25pcHBldCA9IEBjdXJyZW50TGluZVxuXG4gICAgICAgICAgICAgICAgdGhyb3cgZVxuXG4gICAgICAgIHJldHVyblxuXG5cbiAgICAjIFBhcnNlcyBhIGZvbGRlZCBzY2FsYXIuXG4gICAgI1xuICAgICMgQHBhcmFtIFtTdHJpbmddICAgICAgIHNlcGFyYXRvciAgIFRoZSBzZXBhcmF0b3IgdGhhdCB3YXMgdXNlZCB0byBiZWdpbiB0aGlzIGZvbGRlZCBzY2FsYXIgKHwgb3IgPilcbiAgICAjIEBwYXJhbSBbU3RyaW5nXSAgICAgICBpbmRpY2F0b3IgICBUaGUgaW5kaWNhdG9yIHRoYXQgd2FzIHVzZWQgdG8gYmVnaW4gdGhpcyBmb2xkZWQgc2NhbGFyICgrIG9yIC0pXG4gICAgIyBAcGFyYW0gW0ludGVnZXJdICAgICAgaW5kZW50YXRpb24gVGhlIGluZGVudGF0aW9uIHRoYXQgd2FzIHVzZWQgdG8gYmVnaW4gdGhpcyBmb2xkZWQgc2NhbGFyXG4gICAgI1xuICAgICMgQHJldHVybiBbU3RyaW5nXSAgICAgIFRoZSB0ZXh0IHZhbHVlXG4gICAgI1xuICAgIHBhcnNlRm9sZGVkU2NhbGFyOiAoc2VwYXJhdG9yLCBpbmRpY2F0b3IgPSAnJywgaW5kZW50YXRpb24gPSAwKSAtPlxuICAgICAgICBub3RFT0YgPSBAbW92ZVRvTmV4dExpbmUoKVxuICAgICAgICBpZiBub3Qgbm90RU9GXG4gICAgICAgICAgICByZXR1cm4gJydcblxuICAgICAgICBpc0N1cnJlbnRMaW5lQmxhbmsgPSBAaXNDdXJyZW50TGluZUJsYW5rKClcbiAgICAgICAgdGV4dCA9ICcnXG5cbiAgICAgICAgIyBMZWFkaW5nIGJsYW5rIGxpbmVzIGFyZSBjb25zdW1lZCBiZWZvcmUgZGV0ZXJtaW5pbmcgaW5kZW50YXRpb25cbiAgICAgICAgd2hpbGUgbm90RU9GIGFuZCBpc0N1cnJlbnRMaW5lQmxhbmtcbiAgICAgICAgICAgICMgbmV3bGluZSBvbmx5IGlmIG5vdCBFT0ZcbiAgICAgICAgICAgIGlmIG5vdEVPRiA9IEBtb3ZlVG9OZXh0TGluZSgpXG4gICAgICAgICAgICAgICAgdGV4dCArPSBcIlxcblwiXG4gICAgICAgICAgICAgICAgaXNDdXJyZW50TGluZUJsYW5rID0gQGlzQ3VycmVudExpbmVCbGFuaygpXG5cblxuICAgICAgICAjIERldGVybWluZSBpbmRlbnRhdGlvbiBpZiBub3Qgc3BlY2lmaWVkXG4gICAgICAgIGlmIDAgaXMgaW5kZW50YXRpb25cbiAgICAgICAgICAgIGlmIG1hdGNoZXMgPSBAUEFUVEVSTl9JTkRFTlRfU1BBQ0VTLmV4ZWMgQGN1cnJlbnRMaW5lXG4gICAgICAgICAgICAgICAgaW5kZW50YXRpb24gPSBtYXRjaGVzWzBdLmxlbmd0aFxuXG5cbiAgICAgICAgaWYgaW5kZW50YXRpb24gPiAwXG4gICAgICAgICAgICBwYXR0ZXJuID0gQFBBVFRFUk5fRk9MREVEX1NDQUxBUl9CWV9JTkRFTlRBVElPTltpbmRlbnRhdGlvbl1cbiAgICAgICAgICAgIHVubGVzcyBwYXR0ZXJuP1xuICAgICAgICAgICAgICAgIHBhdHRlcm4gPSBuZXcgUGF0dGVybiAnXiB7JytpbmRlbnRhdGlvbisnfSguKikkJ1xuICAgICAgICAgICAgICAgIFBhcnNlcjo6UEFUVEVSTl9GT0xERURfU0NBTEFSX0JZX0lOREVOVEFUSU9OW2luZGVudGF0aW9uXSA9IHBhdHRlcm5cblxuICAgICAgICAgICAgd2hpbGUgbm90RU9GIGFuZCAoaXNDdXJyZW50TGluZUJsYW5rIG9yIG1hdGNoZXMgPSBwYXR0ZXJuLmV4ZWMgQGN1cnJlbnRMaW5lKVxuICAgICAgICAgICAgICAgIGlmIGlzQ3VycmVudExpbmVCbGFua1xuICAgICAgICAgICAgICAgICAgICB0ZXh0ICs9IEBjdXJyZW50TGluZVtpbmRlbnRhdGlvbi4uXVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgdGV4dCArPSBtYXRjaGVzWzFdXG5cbiAgICAgICAgICAgICAgICAjIG5ld2xpbmUgb25seSBpZiBub3QgRU9GXG4gICAgICAgICAgICAgICAgaWYgbm90RU9GID0gQG1vdmVUb05leHRMaW5lKClcbiAgICAgICAgICAgICAgICAgICAgdGV4dCArPSBcIlxcblwiXG4gICAgICAgICAgICAgICAgICAgIGlzQ3VycmVudExpbmVCbGFuayA9IEBpc0N1cnJlbnRMaW5lQmxhbmsoKVxuXG4gICAgICAgIGVsc2UgaWYgbm90RU9GXG4gICAgICAgICAgICB0ZXh0ICs9IFwiXFxuXCJcblxuXG4gICAgICAgIGlmIG5vdEVPRlxuICAgICAgICAgICAgQG1vdmVUb1ByZXZpb3VzTGluZSgpXG5cblxuICAgICAgICAjIFJlbW92ZSBsaW5lIGJyZWFrcyBvZiBlYWNoIGxpbmVzIGV4Y2VwdCB0aGUgZW1wdHkgYW5kIG1vcmUgaW5kZW50ZWQgb25lc1xuICAgICAgICBpZiAnPicgaXMgc2VwYXJhdG9yXG4gICAgICAgICAgICBuZXdUZXh0ID0gJydcbiAgICAgICAgICAgIGZvciBsaW5lIGluIHRleHQuc3BsaXQgXCJcXG5cIlxuICAgICAgICAgICAgICAgIGlmIGxpbmUubGVuZ3RoIGlzIDAgb3IgbGluZS5jaGFyQXQoMCkgaXMgJyAnXG4gICAgICAgICAgICAgICAgICAgIG5ld1RleHQgPSBVdGlscy5ydHJpbShuZXdUZXh0LCAnICcpICsgbGluZSArIFwiXFxuXCJcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIG5ld1RleHQgKz0gbGluZSArICcgJ1xuICAgICAgICAgICAgdGV4dCA9IG5ld1RleHRcblxuICAgICAgICBpZiAnKycgaXNudCBpbmRpY2F0b3JcbiAgICAgICAgICAgICMgUmVtb3ZlIGFueSBleHRyYSBzcGFjZSBvciBuZXcgbGluZSBhcyB3ZSBhcmUgYWRkaW5nIHRoZW0gYWZ0ZXJcbiAgICAgICAgICAgIHRleHQgPSBVdGlscy5ydHJpbSh0ZXh0KVxuXG4gICAgICAgICMgRGVhbCB3aXRoIHRyYWlsaW5nIG5ld2xpbmVzIGFzIGluZGljYXRlZFxuICAgICAgICBpZiAnJyBpcyBpbmRpY2F0b3JcbiAgICAgICAgICAgIHRleHQgPSBAUEFUVEVSTl9UUkFJTElOR19MSU5FUy5yZXBsYWNlIHRleHQsIFwiXFxuXCJcbiAgICAgICAgZWxzZSBpZiAnLScgaXMgaW5kaWNhdG9yXG4gICAgICAgICAgICB0ZXh0ID0gQFBBVFRFUk5fVFJBSUxJTkdfTElORVMucmVwbGFjZSB0ZXh0LCAnJ1xuXG4gICAgICAgIHJldHVybiB0ZXh0XG5cblxuICAgICMgUmV0dXJucyB0cnVlIGlmIHRoZSBuZXh0IGxpbmUgaXMgaW5kZW50ZWQuXG4gICAgI1xuICAgICMgQHJldHVybiBbQm9vbGVhbl0gICAgIFJldHVybnMgdHJ1ZSBpZiB0aGUgbmV4dCBsaW5lIGlzIGluZGVudGVkLCBmYWxzZSBvdGhlcndpc2VcbiAgICAjXG4gICAgaXNOZXh0TGluZUluZGVudGVkOiAoaWdub3JlQ29tbWVudHMgPSB0cnVlKSAtPlxuICAgICAgICBjdXJyZW50SW5kZW50YXRpb24gPSBAZ2V0Q3VycmVudExpbmVJbmRlbnRhdGlvbigpXG4gICAgICAgIEVPRiA9IG5vdCBAbW92ZVRvTmV4dExpbmUoKVxuXG4gICAgICAgIGlmIGlnbm9yZUNvbW1lbnRzXG4gICAgICAgICAgICB3aGlsZSBub3QoRU9GKSBhbmQgQGlzQ3VycmVudExpbmVFbXB0eSgpXG4gICAgICAgICAgICAgICAgRU9GID0gbm90IEBtb3ZlVG9OZXh0TGluZSgpXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHdoaWxlIG5vdChFT0YpIGFuZCBAaXNDdXJyZW50TGluZUJsYW5rKClcbiAgICAgICAgICAgICAgICBFT0YgPSBub3QgQG1vdmVUb05leHRMaW5lKClcblxuICAgICAgICBpZiBFT0ZcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuXG4gICAgICAgIHJldCA9IGZhbHNlXG4gICAgICAgIGlmIEBnZXRDdXJyZW50TGluZUluZGVudGF0aW9uKCkgPiBjdXJyZW50SW5kZW50YXRpb25cbiAgICAgICAgICAgIHJldCA9IHRydWVcblxuICAgICAgICBAbW92ZVRvUHJldmlvdXNMaW5lKClcblxuICAgICAgICByZXR1cm4gcmV0XG5cblxuICAgICMgUmV0dXJucyB0cnVlIGlmIHRoZSBjdXJyZW50IGxpbmUgaXMgYmxhbmsgb3IgaWYgaXQgaXMgYSBjb21tZW50IGxpbmUuXG4gICAgI1xuICAgICMgQHJldHVybiBbQm9vbGVhbl0gICAgIFJldHVybnMgdHJ1ZSBpZiB0aGUgY3VycmVudCBsaW5lIGlzIGVtcHR5IG9yIGlmIGl0IGlzIGEgY29tbWVudCBsaW5lLCBmYWxzZSBvdGhlcndpc2VcbiAgICAjXG4gICAgaXNDdXJyZW50TGluZUVtcHR5OiAtPlxuICAgICAgICB0cmltbWVkTGluZSA9IFV0aWxzLnRyaW0oQGN1cnJlbnRMaW5lLCAnICcpXG4gICAgICAgIHJldHVybiB0cmltbWVkTGluZS5sZW5ndGggaXMgMCBvciB0cmltbWVkTGluZS5jaGFyQXQoMCkgaXMgJyMnXG5cblxuICAgICMgUmV0dXJucyB0cnVlIGlmIHRoZSBjdXJyZW50IGxpbmUgaXMgYmxhbmsuXG4gICAgI1xuICAgICMgQHJldHVybiBbQm9vbGVhbl0gICAgIFJldHVybnMgdHJ1ZSBpZiB0aGUgY3VycmVudCBsaW5lIGlzIGJsYW5rLCBmYWxzZSBvdGhlcndpc2VcbiAgICAjXG4gICAgaXNDdXJyZW50TGluZUJsYW5rOiAtPlxuICAgICAgICByZXR1cm4gJycgaXMgVXRpbHMudHJpbShAY3VycmVudExpbmUsICcgJylcblxuXG4gICAgIyBSZXR1cm5zIHRydWUgaWYgdGhlIGN1cnJlbnQgbGluZSBpcyBhIGNvbW1lbnQgbGluZS5cbiAgICAjXG4gICAgIyBAcmV0dXJuIFtCb29sZWFuXSAgICAgUmV0dXJucyB0cnVlIGlmIHRoZSBjdXJyZW50IGxpbmUgaXMgYSBjb21tZW50IGxpbmUsIGZhbHNlIG90aGVyd2lzZVxuICAgICNcbiAgICBpc0N1cnJlbnRMaW5lQ29tbWVudDogLT5cbiAgICAgICAgIyBDaGVja2luZyBleHBsaWNpdGx5IHRoZSBmaXJzdCBjaGFyIG9mIHRoZSB0cmltIGlzIGZhc3RlciB0aGFuIGxvb3BzIG9yIHN0cnBvc1xuICAgICAgICBsdHJpbW1lZExpbmUgPSBVdGlscy5sdHJpbShAY3VycmVudExpbmUsICcgJylcblxuICAgICAgICByZXR1cm4gbHRyaW1tZWRMaW5lLmNoYXJBdCgwKSBpcyAnIydcblxuXG4gICAgIyBDbGVhbnVwcyBhIFlBTUwgc3RyaW5nIHRvIGJlIHBhcnNlZC5cbiAgICAjXG4gICAgIyBAcGFyYW0gW1N0cmluZ10gICB2YWx1ZSBUaGUgaW5wdXQgWUFNTCBzdHJpbmdcbiAgICAjXG4gICAgIyBAcmV0dXJuIFtTdHJpbmddICBBIGNsZWFuZWQgdXAgWUFNTCBzdHJpbmdcbiAgICAjXG4gICAgY2xlYW51cDogKHZhbHVlKSAtPlxuICAgICAgICBpZiB2YWx1ZS5pbmRleE9mKFwiXFxyXCIpIGlzbnQgLTFcbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWUuc3BsaXQoXCJcXHJcXG5cIikuam9pbihcIlxcblwiKS5zcGxpdChcIlxcclwiKS5qb2luKFwiXFxuXCIpXG5cbiAgICAgICAgIyBTdHJpcCBZQU1MIGhlYWRlclxuICAgICAgICBjb3VudCA9IDBcbiAgICAgICAgW3ZhbHVlLCBjb3VudF0gPSBAUEFUVEVSTl9ZQU1MX0hFQURFUi5yZXBsYWNlQWxsIHZhbHVlLCAnJ1xuICAgICAgICBAb2Zmc2V0ICs9IGNvdW50XG5cbiAgICAgICAgIyBSZW1vdmUgbGVhZGluZyBjb21tZW50c1xuICAgICAgICBbdHJpbW1lZFZhbHVlLCBjb3VudF0gPSBAUEFUVEVSTl9MRUFESU5HX0NPTU1FTlRTLnJlcGxhY2VBbGwgdmFsdWUsICcnLCAxXG4gICAgICAgIGlmIGNvdW50IGlzIDFcbiAgICAgICAgICAgICMgSXRlbXMgaGF2ZSBiZWVuIHJlbW92ZWQsIHVwZGF0ZSB0aGUgb2Zmc2V0XG4gICAgICAgICAgICBAb2Zmc2V0ICs9IFV0aWxzLnN1YlN0ckNvdW50KHZhbHVlLCBcIlxcblwiKSAtIFV0aWxzLnN1YlN0ckNvdW50KHRyaW1tZWRWYWx1ZSwgXCJcXG5cIilcbiAgICAgICAgICAgIHZhbHVlID0gdHJpbW1lZFZhbHVlXG5cbiAgICAgICAgIyBSZW1vdmUgc3RhcnQgb2YgdGhlIGRvY3VtZW50IG1hcmtlciAoLS0tKVxuICAgICAgICBbdHJpbW1lZFZhbHVlLCBjb3VudF0gPSBAUEFUVEVSTl9ET0NVTUVOVF9NQVJLRVJfU1RBUlQucmVwbGFjZUFsbCB2YWx1ZSwgJycsIDFcbiAgICAgICAgaWYgY291bnQgaXMgMVxuICAgICAgICAgICAgIyBJdGVtcyBoYXZlIGJlZW4gcmVtb3ZlZCwgdXBkYXRlIHRoZSBvZmZzZXRcbiAgICAgICAgICAgIEBvZmZzZXQgKz0gVXRpbHMuc3ViU3RyQ291bnQodmFsdWUsIFwiXFxuXCIpIC0gVXRpbHMuc3ViU3RyQ291bnQodHJpbW1lZFZhbHVlLCBcIlxcblwiKVxuICAgICAgICAgICAgdmFsdWUgPSB0cmltbWVkVmFsdWVcblxuICAgICAgICAgICAgIyBSZW1vdmUgZW5kIG9mIHRoZSBkb2N1bWVudCBtYXJrZXIgKC4uLilcbiAgICAgICAgICAgIHZhbHVlID0gQFBBVFRFUk5fRE9DVU1FTlRfTUFSS0VSX0VORC5yZXBsYWNlIHZhbHVlLCAnJ1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHZhbHVlXG5cblxuICAgICMgUmV0dXJucyB0cnVlIGlmIHRoZSBuZXh0IGxpbmUgc3RhcnRzIHVuaW5kZW50ZWQgY29sbGVjdGlvblxuICAgICNcbiAgICAjIEByZXR1cm4gW0Jvb2xlYW5dICAgICBSZXR1cm5zIHRydWUgaWYgdGhlIG5leHQgbGluZSBzdGFydHMgdW5pbmRlbnRlZCBjb2xsZWN0aW9uLCBmYWxzZSBvdGhlcndpc2VcbiAgICAjXG4gICAgaXNOZXh0TGluZVVuSW5kZW50ZWRDb2xsZWN0aW9uOiAoY3VycmVudEluZGVudGF0aW9uID0gbnVsbCkgLT5cbiAgICAgICAgY3VycmVudEluZGVudGF0aW9uID89IEBnZXRDdXJyZW50TGluZUluZGVudGF0aW9uKClcbiAgICAgICAgbm90RU9GID0gQG1vdmVUb05leHRMaW5lKClcblxuICAgICAgICB3aGlsZSBub3RFT0YgYW5kIEBpc0N1cnJlbnRMaW5lRW1wdHkoKVxuICAgICAgICAgICAgbm90RU9GID0gQG1vdmVUb05leHRMaW5lKClcblxuICAgICAgICBpZiBmYWxzZSBpcyBub3RFT0ZcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuXG4gICAgICAgIHJldCA9IGZhbHNlXG4gICAgICAgIGlmIEBnZXRDdXJyZW50TGluZUluZGVudGF0aW9uKCkgaXMgY3VycmVudEluZGVudGF0aW9uIGFuZCBAaXNTdHJpbmdVbkluZGVudGVkQ29sbGVjdGlvbkl0ZW0oQGN1cnJlbnRMaW5lKVxuICAgICAgICAgICAgcmV0ID0gdHJ1ZVxuXG4gICAgICAgIEBtb3ZlVG9QcmV2aW91c0xpbmUoKVxuXG4gICAgICAgIHJldHVybiByZXRcblxuXG4gICAgIyBSZXR1cm5zIHRydWUgaWYgdGhlIHN0cmluZyBpcyB1bi1pbmRlbnRlZCBjb2xsZWN0aW9uIGl0ZW1cbiAgICAjXG4gICAgIyBAcmV0dXJuIFtCb29sZWFuXSAgICAgUmV0dXJucyB0cnVlIGlmIHRoZSBzdHJpbmcgaXMgdW4taW5kZW50ZWQgY29sbGVjdGlvbiBpdGVtLCBmYWxzZSBvdGhlcndpc2VcbiAgICAjXG4gICAgaXNTdHJpbmdVbkluZGVudGVkQ29sbGVjdGlvbkl0ZW06IC0+XG4gICAgICAgIHJldHVybiBAY3VycmVudExpbmUgaXMgJy0nIG9yIEBjdXJyZW50TGluZVswLi4uMl0gaXMgJy0gJ1xuXG5cbm1vZHVsZS5leHBvcnRzID0gUGFyc2VyXG4iLCJcbiMgUGF0dGVybiBpcyBhIHplcm8tY29uZmxpY3Qgd3JhcHBlciBleHRlbmRpbmcgUmVnRXhwIGZlYXR1cmVzXG4jIGluIG9yZGVyIHRvIG1ha2UgWUFNTCBwYXJzaW5nIHJlZ2V4IG1vcmUgZXhwcmVzc2l2ZS5cbiNcbmNsYXNzIFBhdHRlcm5cblxuICAgICMgQHByb3BlcnR5IFtSZWdFeHBdIFRoZSBSZWdFeHAgaW5zdGFuY2VcbiAgICByZWdleDogICAgICAgICAgbnVsbFxuXG4gICAgIyBAcHJvcGVydHkgW1N0cmluZ10gVGhlIHJhdyByZWdleCBzdHJpbmdcbiAgICByYXdSZWdleDogICAgICAgbnVsbFxuXG4gICAgIyBAcHJvcGVydHkgW1N0cmluZ10gVGhlIGNsZWFuZWQgcmVnZXggc3RyaW5nICh1c2VkIHRvIGNyZWF0ZSB0aGUgUmVnRXhwIGluc3RhbmNlKVxuICAgIGNsZWFuZWRSZWdleDogICBudWxsXG5cbiAgICAjIEBwcm9wZXJ0eSBbT2JqZWN0XSBUaGUgZGljdGlvbmFyeSBtYXBwaW5nIG5hbWVzIHRvIGNhcHR1cmluZyBicmFja2V0IG51bWJlcnNcbiAgICBtYXBwaW5nOiAgICAgICAgbnVsbFxuXG4gICAgIyBDb25zdHJ1Y3RvclxuICAgICNcbiAgICAjIEBwYXJhbSBbU3RyaW5nXSByYXdSZWdleCBUaGUgcmF3IHJlZ2V4IHN0cmluZyBkZWZpbmluZyB0aGUgcGF0dGVyblxuICAgICNcbiAgICBjb25zdHJ1Y3RvcjogKHJhd1JlZ2V4LCBtb2RpZmllcnMgPSAnJykgLT5cbiAgICAgICAgY2xlYW5lZFJlZ2V4ID0gJydcbiAgICAgICAgbGVuID0gcmF3UmVnZXgubGVuZ3RoXG4gICAgICAgIG1hcHBpbmcgPSBudWxsXG5cbiAgICAgICAgIyBDbGVhbnVwIHJhdyByZWdleCBhbmQgY29tcHV0ZSBtYXBwaW5nXG4gICAgICAgIGNhcHR1cmluZ0JyYWNrZXROdW1iZXIgPSAwXG4gICAgICAgIGkgPSAwXG4gICAgICAgIHdoaWxlIGkgPCBsZW5cbiAgICAgICAgICAgIGNoYXIgPSByYXdSZWdleC5jaGFyQXQoaSlcbiAgICAgICAgICAgIGlmIGNoYXIgaXMgJ1xcXFwnXG4gICAgICAgICAgICAgICAgIyBJZ25vcmUgbmV4dCBjaGFyYWN0ZXJcbiAgICAgICAgICAgICAgICBjbGVhbmVkUmVnZXggKz0gcmF3UmVnZXhbaS4uaSsxXVxuICAgICAgICAgICAgICAgIGkrK1xuICAgICAgICAgICAgZWxzZSBpZiBjaGFyIGlzICcoJ1xuICAgICAgICAgICAgICAgICMgSW5jcmVhc2UgYnJhY2tldCBudW1iZXIsIG9ubHkgaWYgaXQgaXMgY2FwdHVyaW5nXG4gICAgICAgICAgICAgICAgaWYgaSA8IGxlbiAtIDJcbiAgICAgICAgICAgICAgICAgICAgcGFydCA9IHJhd1JlZ2V4W2kuLmkrMl1cbiAgICAgICAgICAgICAgICAgICAgaWYgcGFydCBpcyAnKD86J1xuICAgICAgICAgICAgICAgICAgICAgICAgIyBOb24tY2FwdHVyaW5nIGJyYWNrZXRcbiAgICAgICAgICAgICAgICAgICAgICAgIGkgKz0gMlxuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYW5lZFJlZ2V4ICs9IHBhcnRcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiBwYXJ0IGlzICcoPzwnXG4gICAgICAgICAgICAgICAgICAgICAgICAjIENhcHR1cmluZyBicmFja2V0IHdpdGggcG9zc2libHkgYSBuYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0dXJpbmdCcmFja2V0TnVtYmVyKytcbiAgICAgICAgICAgICAgICAgICAgICAgIGkgKz0gMlxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZSA9ICcnXG4gICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSBpICsgMSA8IGxlblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YkNoYXIgPSByYXdSZWdleC5jaGFyQXQoaSArIDEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgc3ViQ2hhciBpcyAnPidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xlYW5lZFJlZ2V4ICs9ICcoJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpKytcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgbmFtZS5sZW5ndGggPiAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAjIEFzc29jaWF0ZSBhIG5hbWUgd2l0aCBhIGNhcHR1cmluZyBicmFja2V0IG51bWJlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwcGluZyA/PSB7fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwcGluZ1tuYW1lXSA9IGNhcHR1cmluZ0JyYWNrZXROdW1iZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWUgKz0gc3ViQ2hhclxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaSsrXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFuZWRSZWdleCArPSBjaGFyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0dXJpbmdCcmFja2V0TnVtYmVyKytcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIGNsZWFuZWRSZWdleCArPSBjaGFyXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgY2xlYW5lZFJlZ2V4ICs9IGNoYXJcblxuICAgICAgICAgICAgaSsrXG5cbiAgICAgICAgQHJhd1JlZ2V4ID0gcmF3UmVnZXhcbiAgICAgICAgQGNsZWFuZWRSZWdleCA9IGNsZWFuZWRSZWdleFxuICAgICAgICBAcmVnZXggPSBuZXcgUmVnRXhwIEBjbGVhbmVkUmVnZXgsICdnJyttb2RpZmllcnMucmVwbGFjZSgnZycsICcnKVxuICAgICAgICBAbWFwcGluZyA9IG1hcHBpbmdcblxuXG4gICAgIyBFeGVjdXRlcyB0aGUgcGF0dGVybidzIHJlZ2V4IGFuZCByZXR1cm5zIHRoZSBtYXRjaGluZyB2YWx1ZXNcbiAgICAjXG4gICAgIyBAcGFyYW0gW1N0cmluZ10gc3RyIFRoZSBzdHJpbmcgdG8gdXNlIHRvIGV4ZWN1dGUgdGhlIHBhdHRlcm5cbiAgICAjXG4gICAgIyBAcmV0dXJuIFtBcnJheV0gVGhlIG1hdGNoaW5nIHZhbHVlcyBleHRyYWN0ZWQgZnJvbSBjYXB0dXJpbmcgYnJhY2tldHMgb3IgbnVsbCBpZiBub3RoaW5nIG1hdGNoZWRcbiAgICAjXG4gICAgZXhlYzogKHN0cikgLT5cbiAgICAgICAgQHJlZ2V4Lmxhc3RJbmRleCA9IDBcbiAgICAgICAgbWF0Y2hlcyA9IEByZWdleC5leGVjIHN0clxuXG4gICAgICAgIGlmIG5vdCBtYXRjaGVzP1xuICAgICAgICAgICAgcmV0dXJuIG51bGxcblxuICAgICAgICBpZiBAbWFwcGluZz9cbiAgICAgICAgICAgIGZvciBuYW1lLCBpbmRleCBvZiBAbWFwcGluZ1xuICAgICAgICAgICAgICAgIG1hdGNoZXNbbmFtZV0gPSBtYXRjaGVzW2luZGV4XVxuXG4gICAgICAgIHJldHVybiBtYXRjaGVzXG5cblxuICAgICMgVGVzdHMgdGhlIHBhdHRlcm4ncyByZWdleFxuICAgICNcbiAgICAjIEBwYXJhbSBbU3RyaW5nXSBzdHIgVGhlIHN0cmluZyB0byB1c2UgdG8gdGVzdCB0aGUgcGF0dGVyblxuICAgICNcbiAgICAjIEByZXR1cm4gW0Jvb2xlYW5dIHRydWUgaWYgdGhlIHN0cmluZyBtYXRjaGVkXG4gICAgI1xuICAgIHRlc3Q6IChzdHIpIC0+XG4gICAgICAgIEByZWdleC5sYXN0SW5kZXggPSAwXG4gICAgICAgIHJldHVybiBAcmVnZXgudGVzdCBzdHJcblxuXG4gICAgIyBSZXBsYWNlcyBvY2N1cmVuY2VzIG1hdGNoaW5nIHdpdGggdGhlIHBhdHRlcm4ncyByZWdleCB3aXRoIHJlcGxhY2VtZW50XG4gICAgI1xuICAgICMgQHBhcmFtIFtTdHJpbmddIHN0ciBUaGUgc291cmNlIHN0cmluZyB0byBwZXJmb3JtIHJlcGxhY2VtZW50c1xuICAgICMgQHBhcmFtIFtTdHJpbmddIHJlcGxhY2VtZW50IFRoZSBzdHJpbmcgdG8gdXNlIGluIHBsYWNlIG9mIGVhY2ggcmVwbGFjZWQgb2NjdXJlbmNlLlxuICAgICNcbiAgICAjIEByZXR1cm4gW1N0cmluZ10gVGhlIHJlcGxhY2VkIHN0cmluZ1xuICAgICNcbiAgICByZXBsYWNlOiAoc3RyLCByZXBsYWNlbWVudCkgLT5cbiAgICAgICAgQHJlZ2V4Lmxhc3RJbmRleCA9IDBcbiAgICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlIEByZWdleCwgcmVwbGFjZW1lbnRcblxuXG4gICAgIyBSZXBsYWNlcyBvY2N1cmVuY2VzIG1hdGNoaW5nIHdpdGggdGhlIHBhdHRlcm4ncyByZWdleCB3aXRoIHJlcGxhY2VtZW50IGFuZFxuICAgICMgZ2V0IGJvdGggdGhlIHJlcGxhY2VkIHN0cmluZyBhbmQgdGhlIG51bWJlciBvZiByZXBsYWNlZCBvY2N1cmVuY2VzIGluIHRoZSBzdHJpbmcuXG4gICAgI1xuICAgICMgQHBhcmFtIFtTdHJpbmddIHN0ciBUaGUgc291cmNlIHN0cmluZyB0byBwZXJmb3JtIHJlcGxhY2VtZW50c1xuICAgICMgQHBhcmFtIFtTdHJpbmddIHJlcGxhY2VtZW50IFRoZSBzdHJpbmcgdG8gdXNlIGluIHBsYWNlIG9mIGVhY2ggcmVwbGFjZWQgb2NjdXJlbmNlLlxuICAgICMgQHBhcmFtIFtJbnRlZ2VyXSBsaW1pdCBUaGUgbWF4aW11bSBudW1iZXIgb2Ygb2NjdXJlbmNlcyB0byByZXBsYWNlICgwIG1lYW5zIGluZmluaXRlIG51bWJlciBvZiBvY2N1cmVuY2VzKVxuICAgICNcbiAgICAjIEByZXR1cm4gW0FycmF5XSBBIGRlc3RydWN0dXJhYmxlIGFycmF5IGNvbnRhaW5pbmcgdGhlIHJlcGxhY2VkIHN0cmluZyBhbmQgdGhlIG51bWJlciBvZiByZXBsYWNlZCBvY2N1cmVuY2VzLiBGb3IgaW5zdGFuY2U6IFtcIm15IHJlcGxhY2VkIHN0cmluZ1wiLCAyXVxuICAgICNcbiAgICByZXBsYWNlQWxsOiAoc3RyLCByZXBsYWNlbWVudCwgbGltaXQgPSAwKSAtPlxuICAgICAgICBAcmVnZXgubGFzdEluZGV4ID0gMFxuICAgICAgICBjb3VudCA9IDBcbiAgICAgICAgd2hpbGUgQHJlZ2V4LnRlc3Qoc3RyKSBhbmQgKGxpbWl0IGlzIDAgb3IgY291bnQgPCBsaW1pdClcbiAgICAgICAgICAgIEByZWdleC5sYXN0SW5kZXggPSAwXG4gICAgICAgICAgICBzdHIgPSBzdHIucmVwbGFjZSBAcmVnZXgsICcnXG4gICAgICAgICAgICBjb3VudCsrXG4gICAgICAgIFxuICAgICAgICByZXR1cm4gW3N0ciwgY291bnRdXG5cblxubW9kdWxlLmV4cG9ydHMgPSBQYXR0ZXJuXG5cbiIsIlxuVXRpbHMgICA9IHJlcXVpcmUgJy4vVXRpbHMnXG5QYXR0ZXJuID0gcmVxdWlyZSAnLi9QYXR0ZXJuJ1xuXG4jIFVuZXNjYXBlciBlbmNhcHN1bGF0ZXMgdW5lc2NhcGluZyBydWxlcyBmb3Igc2luZ2xlIGFuZCBkb3VibGUtcXVvdGVkIFlBTUwgc3RyaW5ncy5cbiNcbmNsYXNzIFVuZXNjYXBlclxuXG4gICAgIyBSZWdleCBmcmFnbWVudCB0aGF0IG1hdGNoZXMgYW4gZXNjYXBlZCBjaGFyYWN0ZXIgaW5cbiAgICAjIGEgZG91YmxlIHF1b3RlZCBzdHJpbmcuXG4gICAgQFBBVFRFUk5fRVNDQVBFRF9DSEFSQUNURVI6ICAgICBuZXcgUGF0dGVybiAnXFxcXFxcXFwoWzBhYnRcXHRudmZyZSBcIlxcXFwvXFxcXFxcXFxOX0xQXXx4WzAtOWEtZkEtRl17Mn18dVswLTlhLWZBLUZdezR9fFVbMC05YS1mQS1GXXs4fSknO1xuXG5cbiAgICAjIFVuZXNjYXBlcyBhIHNpbmdsZSBxdW90ZWQgc3RyaW5nLlxuICAgICNcbiAgICAjIEBwYXJhbSBbU3RyaW5nXSAgICAgICB2YWx1ZSBBIHNpbmdsZSBxdW90ZWQgc3RyaW5nLlxuICAgICNcbiAgICAjIEByZXR1cm4gW1N0cmluZ10gICAgICBUaGUgdW5lc2NhcGVkIHN0cmluZy5cbiAgICAjXG4gICAgQHVuZXNjYXBlU2luZ2xlUXVvdGVkU3RyaW5nOiAodmFsdWUpIC0+XG4gICAgICAgIHJldHVybiB2YWx1ZS5yZXBsYWNlKCdcXCdcXCcnLCAnXFwnJylcblxuXG4gICAgIyBVbmVzY2FwZXMgYSBkb3VibGUgcXVvdGVkIHN0cmluZy5cbiAgICAjXG4gICAgIyBAcGFyYW0gW1N0cmluZ10gICAgICAgdmFsdWUgQSBkb3VibGUgcXVvdGVkIHN0cmluZy5cbiAgICAjXG4gICAgIyBAcmV0dXJuIFtTdHJpbmddICAgICAgVGhlIHVuZXNjYXBlZCBzdHJpbmcuXG4gICAgI1xuICAgIEB1bmVzY2FwZURvdWJsZVF1b3RlZFN0cmluZzogKHZhbHVlKSAtPlxuICAgICAgICBAX3VuZXNjYXBlQ2FsbGJhY2sgPz0gKHN0cikgPT5cbiAgICAgICAgICAgIHJldHVybiBAdW5lc2NhcGVDaGFyYWN0ZXIoc3RyKVxuXG4gICAgICAgICMgRXZhbHVhdGUgdGhlIHN0cmluZ1xuICAgICAgICByZXR1cm4gQFBBVFRFUk5fRVNDQVBFRF9DSEFSQUNURVIucmVwbGFjZSB2YWx1ZSwgQF91bmVzY2FwZUNhbGxiYWNrXG5cblxuICAgICMgVW5lc2NhcGVzIGEgY2hhcmFjdGVyIHRoYXQgd2FzIGZvdW5kIGluIGEgZG91YmxlLXF1b3RlZCBzdHJpbmdcbiAgICAjXG4gICAgIyBAcGFyYW0gW1N0cmluZ10gICAgICAgdmFsdWUgQW4gZXNjYXBlZCBjaGFyYWN0ZXJcbiAgICAjXG4gICAgIyBAcmV0dXJuIFtTdHJpbmddICAgICAgVGhlIHVuZXNjYXBlZCBjaGFyYWN0ZXJcbiAgICAjXG4gICAgQHVuZXNjYXBlQ2hhcmFjdGVyOiAodmFsdWUpIC0+XG4gICAgICAgIGNoID0gU3RyaW5nLmZyb21DaGFyQ29kZVxuICAgICAgICBzd2l0Y2ggdmFsdWUuY2hhckF0KDEpXG4gICAgICAgICAgICB3aGVuICcwJ1xuICAgICAgICAgICAgICAgIHJldHVybiBjaCgwKVxuICAgICAgICAgICAgd2hlbiAnYSdcbiAgICAgICAgICAgICAgICByZXR1cm4gY2goNylcbiAgICAgICAgICAgIHdoZW4gJ2InXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNoKDgpXG4gICAgICAgICAgICB3aGVuICd0J1xuICAgICAgICAgICAgICAgIHJldHVybiBcIlxcdFwiXG4gICAgICAgICAgICB3aGVuIFwiXFx0XCJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJcXHRcIlxuICAgICAgICAgICAgd2hlbiAnbidcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJcXG5cIlxuICAgICAgICAgICAgd2hlbiAndidcbiAgICAgICAgICAgICAgICByZXR1cm4gY2goMTEpXG4gICAgICAgICAgICB3aGVuICdmJ1xuICAgICAgICAgICAgICAgIHJldHVybiBjaCgxMilcbiAgICAgICAgICAgIHdoZW4gJ3InXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNoKDEzKVxuICAgICAgICAgICAgd2hlbiAnZSdcbiAgICAgICAgICAgICAgICByZXR1cm4gY2goMjcpXG4gICAgICAgICAgICB3aGVuICcgJ1xuICAgICAgICAgICAgICAgIHJldHVybiAnICdcbiAgICAgICAgICAgIHdoZW4gJ1wiJ1xuICAgICAgICAgICAgICAgIHJldHVybiAnXCInXG4gICAgICAgICAgICB3aGVuICcvJ1xuICAgICAgICAgICAgICAgIHJldHVybiAnLydcbiAgICAgICAgICAgIHdoZW4gJ1xcXFwnXG4gICAgICAgICAgICAgICAgcmV0dXJuICdcXFxcJ1xuICAgICAgICAgICAgd2hlbiAnTidcbiAgICAgICAgICAgICAgICAjIFUrMDA4NSBORVhUIExJTkVcbiAgICAgICAgICAgICAgICByZXR1cm4gY2goMHgwMDg1KVxuICAgICAgICAgICAgd2hlbiAnXydcbiAgICAgICAgICAgICAgICAjIFUrMDBBMCBOTy1CUkVBSyBTUEFDRVxuICAgICAgICAgICAgICAgIHJldHVybiBjaCgweDAwQTApXG4gICAgICAgICAgICB3aGVuICdMJ1xuICAgICAgICAgICAgICAgICMgVSsyMDI4IExJTkUgU0VQQVJBVE9SXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNoKDB4MjAyOClcbiAgICAgICAgICAgIHdoZW4gJ1AnXG4gICAgICAgICAgICAgICAgIyBVKzIwMjkgUEFSQUdSQVBIIFNFUEFSQVRPUlxuICAgICAgICAgICAgICAgIHJldHVybiBjaCgweDIwMjkpXG4gICAgICAgICAgICB3aGVuICd4J1xuICAgICAgICAgICAgICAgIHJldHVybiBVdGlscy51dGY4Y2hyKFV0aWxzLmhleERlYyh2YWx1ZS5zdWJzdHIoMiwgMikpKVxuICAgICAgICAgICAgd2hlbiAndSdcbiAgICAgICAgICAgICAgICByZXR1cm4gVXRpbHMudXRmOGNocihVdGlscy5oZXhEZWModmFsdWUuc3Vic3RyKDIsIDQpKSlcbiAgICAgICAgICAgIHdoZW4gJ1UnXG4gICAgICAgICAgICAgICAgcmV0dXJuIFV0aWxzLnV0ZjhjaHIoVXRpbHMuaGV4RGVjKHZhbHVlLnN1YnN0cigyLCA4KSkpXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmV0dXJuICcnXG5cbm1vZHVsZS5leHBvcnRzID0gVW5lc2NhcGVyXG4iLCJcblBhdHRlcm4gPSByZXF1aXJlICcuL1BhdHRlcm4nXG5cbiMgQSBidW5jaCBvZiB1dGlsaXR5IG1ldGhvZHNcbiNcbmNsYXNzIFV0aWxzXG5cbiAgICBAUkVHRVhfTEVGVF9UUklNX0JZX0NIQVI6ICAge31cbiAgICBAUkVHRVhfUklHSFRfVFJJTV9CWV9DSEFSOiAge31cbiAgICBAUkVHRVhfU1BBQ0VTOiAgICAgICAgICAgICAgL1xccysvZ1xuICAgIEBSRUdFWF9ESUdJVFM6ICAgICAgICAgICAgICAvXlxcZCskL1xuICAgIEBSRUdFWF9PQ1RBTDogICAgICAgICAgICAgICAvW14wLTddL2dpXG4gICAgQFJFR0VYX0hFWEFERUNJTUFMOiAgICAgICAgIC9bXmEtZjAtOV0vZ2lcblxuICAgICMgUHJlY29tcGlsZWQgZGF0ZSBwYXR0ZXJuXG4gICAgQFBBVFRFUk5fREFURTogICAgICAgICAgICAgIG5ldyBQYXR0ZXJuICdeJytcbiAgICAgICAgICAgICcoPzx5ZWFyPlswLTldWzAtOV1bMC05XVswLTldKScrXG4gICAgICAgICAgICAnLSg/PG1vbnRoPlswLTldWzAtOV0/KScrXG4gICAgICAgICAgICAnLSg/PGRheT5bMC05XVswLTldPyknK1xuICAgICAgICAgICAgJyg/Oig/OltUdF18WyBcXHRdKyknK1xuICAgICAgICAgICAgJyg/PGhvdXI+WzAtOV1bMC05XT8pJytcbiAgICAgICAgICAgICc6KD88bWludXRlPlswLTldWzAtOV0pJytcbiAgICAgICAgICAgICc6KD88c2Vjb25kPlswLTldWzAtOV0pJytcbiAgICAgICAgICAgICcoPzpcXC4oPzxmcmFjdGlvbj5bMC05XSopKT8nK1xuICAgICAgICAgICAgJyg/OlsgXFx0XSooPzx0ej5afCg/PHR6X3NpZ24+Wy0rXSkoPzx0el9ob3VyPlswLTldWzAtOV0/KScrXG4gICAgICAgICAgICAnKD86Oig/PHR6X21pbnV0ZT5bMC05XVswLTldKSk/KSk/KT8nK1xuICAgICAgICAgICAgJyQnLCAnaSdcblxuICAgICMgTG9jYWwgdGltZXpvbmUgb2Zmc2V0IGluIG1zXG4gICAgQExPQ0FMX1RJTUVaT05FX09GRlNFVDogICAgIG5ldyBEYXRlKCkuZ2V0VGltZXpvbmVPZmZzZXQoKSAqIDYwICogMTAwMFxuXG4gICAgIyBUcmltcyB0aGUgZ2l2ZW4gc3RyaW5nIG9uIGJvdGggc2lkZXNcbiAgICAjXG4gICAgIyBAcGFyYW0gW1N0cmluZ10gc3RyIFRoZSBzdHJpbmcgdG8gdHJpbVxuICAgICMgQHBhcmFtIFtTdHJpbmddIGNoYXIgVGhlIGNoYXJhY3RlciB0byB1c2UgZm9yIHRyaW1taW5nIChkZWZhdWx0OiAnXFxcXHMnKVxuICAgICNcbiAgICAjIEByZXR1cm4gW1N0cmluZ10gQSB0cmltbWVkIHN0cmluZ1xuICAgICNcbiAgICBAdHJpbTogKHN0ciwgY2hhciA9ICdcXFxccycpIC0+XG4gICAgICAgIHJldHVybiBzdHIudHJpbSgpXG4gICAgICAgIHJlZ2V4TGVmdCA9IEBSRUdFWF9MRUZUX1RSSU1fQllfQ0hBUltjaGFyXVxuICAgICAgICB1bmxlc3MgcmVnZXhMZWZ0P1xuICAgICAgICAgICAgQFJFR0VYX0xFRlRfVFJJTV9CWV9DSEFSW2NoYXJdID0gcmVnZXhMZWZ0ID0gbmV3IFJlZ0V4cCAnXicrY2hhcisnJytjaGFyKycqJ1xuICAgICAgICByZWdleExlZnQubGFzdEluZGV4ID0gMFxuICAgICAgICByZWdleFJpZ2h0ID0gQFJFR0VYX1JJR0hUX1RSSU1fQllfQ0hBUltjaGFyXVxuICAgICAgICB1bmxlc3MgcmVnZXhSaWdodD9cbiAgICAgICAgICAgIEBSRUdFWF9SSUdIVF9UUklNX0JZX0NIQVJbY2hhcl0gPSByZWdleFJpZ2h0ID0gbmV3IFJlZ0V4cCBjaGFyKycnK2NoYXIrJyokJ1xuICAgICAgICByZWdleFJpZ2h0Lmxhc3RJbmRleCA9IDBcbiAgICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlKHJlZ2V4TGVmdCwgJycpLnJlcGxhY2UocmVnZXhSaWdodCwgJycpXG5cblxuICAgICMgVHJpbXMgdGhlIGdpdmVuIHN0cmluZyBvbiB0aGUgbGVmdCBzaWRlXG4gICAgI1xuICAgICMgQHBhcmFtIFtTdHJpbmddIHN0ciBUaGUgc3RyaW5nIHRvIHRyaW1cbiAgICAjIEBwYXJhbSBbU3RyaW5nXSBjaGFyIFRoZSBjaGFyYWN0ZXIgdG8gdXNlIGZvciB0cmltbWluZyAoZGVmYXVsdDogJ1xcXFxzJylcbiAgICAjXG4gICAgIyBAcmV0dXJuIFtTdHJpbmddIEEgdHJpbW1lZCBzdHJpbmdcbiAgICAjXG4gICAgQGx0cmltOiAoc3RyLCBjaGFyID0gJ1xcXFxzJykgLT5cbiAgICAgICAgcmVnZXhMZWZ0ID0gQFJFR0VYX0xFRlRfVFJJTV9CWV9DSEFSW2NoYXJdXG4gICAgICAgIHVubGVzcyByZWdleExlZnQ/XG4gICAgICAgICAgICBAUkVHRVhfTEVGVF9UUklNX0JZX0NIQVJbY2hhcl0gPSByZWdleExlZnQgPSBuZXcgUmVnRXhwICdeJytjaGFyKycnK2NoYXIrJyonXG4gICAgICAgIHJlZ2V4TGVmdC5sYXN0SW5kZXggPSAwXG4gICAgICAgIHJldHVybiBzdHIucmVwbGFjZShyZWdleExlZnQsICcnKVxuXG5cbiAgICAjIFRyaW1zIHRoZSBnaXZlbiBzdHJpbmcgb24gdGhlIHJpZ2h0IHNpZGVcbiAgICAjXG4gICAgIyBAcGFyYW0gW1N0cmluZ10gc3RyIFRoZSBzdHJpbmcgdG8gdHJpbVxuICAgICMgQHBhcmFtIFtTdHJpbmddIGNoYXIgVGhlIGNoYXJhY3RlciB0byB1c2UgZm9yIHRyaW1taW5nIChkZWZhdWx0OiAnXFxcXHMnKVxuICAgICNcbiAgICAjIEByZXR1cm4gW1N0cmluZ10gQSB0cmltbWVkIHN0cmluZ1xuICAgICNcbiAgICBAcnRyaW06IChzdHIsIGNoYXIgPSAnXFxcXHMnKSAtPlxuICAgICAgICByZWdleFJpZ2h0ID0gQFJFR0VYX1JJR0hUX1RSSU1fQllfQ0hBUltjaGFyXVxuICAgICAgICB1bmxlc3MgcmVnZXhSaWdodD9cbiAgICAgICAgICAgIEBSRUdFWF9SSUdIVF9UUklNX0JZX0NIQVJbY2hhcl0gPSByZWdleFJpZ2h0ID0gbmV3IFJlZ0V4cCBjaGFyKycnK2NoYXIrJyokJ1xuICAgICAgICByZWdleFJpZ2h0Lmxhc3RJbmRleCA9IDBcbiAgICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlKHJlZ2V4UmlnaHQsICcnKVxuXG5cbiAgICAjIENoZWNrcyBpZiB0aGUgZ2l2ZW4gdmFsdWUgaXMgZW1wdHkgKG51bGwsIHVuZGVmaW5lZCwgZW1wdHkgc3RyaW5nLCBzdHJpbmcgJzAnKVxuICAgICNcbiAgICAjIEBwYXJhbSBbT2JqZWN0XSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2tcbiAgICAjXG4gICAgIyBAcmV0dXJuIFtCb29sZWFuXSB0cnVlIGlmIHRoZSB2YWx1ZSBpcyBlbXB0eVxuICAgICNcbiAgICBAaXNFbXB0eTogKHZhbHVlKSAtPlxuICAgICAgICByZXR1cm4gbm90KHZhbHVlKSBvciB2YWx1ZSBpcyAnJyBvciB2YWx1ZSBpcyAnMCdcblxuXG4gICAgIyBDb3VudHMgdGhlIG51bWJlciBvZiBvY2N1cmVuY2VzIG9mIHN1YlN0cmluZyBpbnNpZGUgc3RyaW5nXG4gICAgI1xuICAgICMgQHBhcmFtIFtTdHJpbmddIHN0cmluZyBUaGUgc3RyaW5nIHdoZXJlIHRvIGNvdW50IG9jY3VyZW5jZXNcbiAgICAjIEBwYXJhbSBbU3RyaW5nXSBzdWJTdHJpbmcgVGhlIHN1YlN0cmluZyB0byBjb3VudFxuICAgICMgQHBhcmFtIFtJbnRlZ2VyXSBzdGFydCBUaGUgc3RhcnQgaW5kZXhcbiAgICAjIEBwYXJhbSBbSW50ZWdlcl0gbGVuZ3RoIFRoZSBzdHJpbmcgbGVuZ3RoIHVudGlsIHdoZXJlIHRvIGNvdW50XG4gICAgI1xuICAgICMgQHJldHVybiBbSW50ZWdlcl0gVGhlIG51bWJlciBvZiBvY2N1cmVuY2VzXG4gICAgI1xuICAgIEBzdWJTdHJDb3VudDogKHN0cmluZywgc3ViU3RyaW5nLCBzdGFydCwgbGVuZ3RoKSAtPlxuICAgICAgICBjID0gMFxuICAgICAgICBcbiAgICAgICAgc3RyaW5nID0gJycgKyBzdHJpbmdcbiAgICAgICAgc3ViU3RyaW5nID0gJycgKyBzdWJTdHJpbmdcbiAgICAgICAgXG4gICAgICAgIGlmIHN0YXJ0P1xuICAgICAgICAgICAgc3RyaW5nID0gc3RyaW5nW3N0YXJ0Li5dXG4gICAgICAgIGlmIGxlbmd0aD9cbiAgICAgICAgICAgIHN0cmluZyA9IHN0cmluZ1swLi4ubGVuZ3RoXVxuICAgICAgICBcbiAgICAgICAgbGVuID0gc3RyaW5nLmxlbmd0aFxuICAgICAgICBzdWJsZW4gPSBzdWJTdHJpbmcubGVuZ3RoXG4gICAgICAgIGZvciBpIGluIFswLi4ubGVuXVxuICAgICAgICAgICAgaWYgc3ViU3RyaW5nIGlzIHN0cmluZ1tpLi4uc3VibGVuXVxuICAgICAgICAgICAgICAgIGMrK1xuICAgICAgICAgICAgICAgIGkgKz0gc3VibGVuIC0gMVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGNcblxuXG4gICAgIyBSZXR1cm5zIHRydWUgaWYgaW5wdXQgaXMgb25seSBjb21wb3NlZCBvZiBkaWdpdHNcbiAgICAjXG4gICAgIyBAcGFyYW0gW09iamVjdF0gaW5wdXQgVGhlIHZhbHVlIHRvIHRlc3RcbiAgICAjXG4gICAgIyBAcmV0dXJuIFtCb29sZWFuXSB0cnVlIGlmIGlucHV0IGlzIG9ubHkgY29tcG9zZWQgb2YgZGlnaXRzXG4gICAgI1xuICAgIEBpc0RpZ2l0czogKGlucHV0KSAtPlxuICAgICAgICBAUkVHRVhfRElHSVRTLmxhc3RJbmRleCA9IDBcbiAgICAgICAgcmV0dXJuIEBSRUdFWF9ESUdJVFMudGVzdCBpbnB1dFxuXG5cbiAgICAjIERlY29kZSBvY3RhbCB2YWx1ZVxuICAgICNcbiAgICAjIEBwYXJhbSBbU3RyaW5nXSBpbnB1dCBUaGUgdmFsdWUgdG8gZGVjb2RlXG4gICAgI1xuICAgICMgQHJldHVybiBbSW50ZWdlcl0gVGhlIGRlY29kZWQgdmFsdWVcbiAgICAjXG4gICAgQG9jdERlYzogKGlucHV0KSAtPlxuICAgICAgICBAUkVHRVhfT0NUQUwubGFzdEluZGV4ID0gMFxuICAgICAgICByZXR1cm4gcGFyc2VJbnQoKGlucHV0KycnKS5yZXBsYWNlKEBSRUdFWF9PQ1RBTCwgJycpLCA4KVxuXG5cbiAgICAjIERlY29kZSBoZXhhZGVjaW1hbCB2YWx1ZVxuICAgICNcbiAgICAjIEBwYXJhbSBbU3RyaW5nXSBpbnB1dCBUaGUgdmFsdWUgdG8gZGVjb2RlXG4gICAgI1xuICAgICMgQHJldHVybiBbSW50ZWdlcl0gVGhlIGRlY29kZWQgdmFsdWVcbiAgICAjXG4gICAgQGhleERlYzogKGlucHV0KSAtPlxuICAgICAgICBAUkVHRVhfSEVYQURFQ0lNQUwubGFzdEluZGV4ID0gMFxuICAgICAgICBpbnB1dCA9IEB0cmltKGlucHV0KVxuICAgICAgICBpZiAoaW5wdXQrJycpWzAuLi4yXSBpcyAnMHgnIHRoZW4gaW5wdXQgPSAoaW5wdXQrJycpWzIuLl1cbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KChpbnB1dCsnJykucmVwbGFjZShAUkVHRVhfSEVYQURFQ0lNQUwsICcnKSwgMTYpXG5cblxuICAgICMgR2V0IHRoZSBVVEYtOCBjaGFyYWN0ZXIgZm9yIHRoZSBnaXZlbiBjb2RlIHBvaW50LlxuICAgICNcbiAgICAjIEBwYXJhbSBbSW50ZWdlcl0gYyBUaGUgdW5pY29kZSBjb2RlIHBvaW50XG4gICAgI1xuICAgICMgQHJldHVybiBbU3RyaW5nXSBUaGUgY29ycmVzcG9uZGluZyBVVEYtOCBjaGFyYWN0ZXJcbiAgICAjXG4gICAgQHV0ZjhjaHI6IChjKSAtPlxuICAgICAgICBjaCA9IFN0cmluZy5mcm9tQ2hhckNvZGVcbiAgICAgICAgaWYgMHg4MCA+IChjICU9IDB4MjAwMDAwKVxuICAgICAgICAgICAgcmV0dXJuIGNoKGMpXG4gICAgICAgIGlmIDB4ODAwID4gY1xuICAgICAgICAgICAgcmV0dXJuIGNoKDB4QzAgfCBjPj42KSArIGNoKDB4ODAgfCBjICYgMHgzRilcbiAgICAgICAgaWYgMHgxMDAwMCA+IGNcbiAgICAgICAgICAgIHJldHVybiBjaCgweEUwIHwgYz4+MTIpICsgY2goMHg4MCB8IGM+PjYgJiAweDNGKSArIGNoKDB4ODAgfCBjICYgMHgzRilcblxuICAgICAgICByZXR1cm4gY2goMHhGMCB8IGM+PjE4KSArIGNoKDB4ODAgfCBjPj4xMiAmIDB4M0YpICsgY2goMHg4MCB8IGM+PjYgJiAweDNGKSArIGNoKDB4ODAgfCBjICYgMHgzRilcblxuXG4gICAgIyBSZXR1cm5zIHRoZSBib29sZWFuIHZhbHVlIGVxdWl2YWxlbnQgdG8gdGhlIGdpdmVuIGlucHV0XG4gICAgI1xuICAgICMgQHBhcmFtIFtTdHJpbmd8T2JqZWN0XSAgICBpbnB1dCAgICAgICBUaGUgaW5wdXQgdmFsdWVcbiAgICAjIEBwYXJhbSBbQm9vbGVhbl0gICAgICAgICAgc3RyaWN0ICAgICAgSWYgc2V0IHRvIGZhbHNlLCBhY2NlcHQgJ3llcycgYW5kICdubycgYXMgYm9vbGVhbiB2YWx1ZXNcbiAgICAjXG4gICAgIyBAcmV0dXJuIFtCb29sZWFuXSAgICAgICAgIHRoZSBib29sZWFuIHZhbHVlXG4gICAgI1xuICAgIEBwYXJzZUJvb2xlYW46IChpbnB1dCwgc3RyaWN0ID0gdHJ1ZSkgLT5cbiAgICAgICAgaWYgdHlwZW9mKGlucHV0KSBpcyAnc3RyaW5nJ1xuICAgICAgICAgICAgbG93ZXJJbnB1dCA9IGlucHV0LnRvTG93ZXJDYXNlKClcbiAgICAgICAgICAgIGlmIG5vdCBzdHJpY3RcbiAgICAgICAgICAgICAgICBpZiBsb3dlcklucHV0IGlzICdubycgdGhlbiByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIGlmIGxvd2VySW5wdXQgaXMgJzAnIHRoZW4gcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICBpZiBsb3dlcklucHV0IGlzICdmYWxzZScgdGhlbiByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIGlmIGxvd2VySW5wdXQgaXMgJycgdGhlbiByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIHJldHVybiAhIWlucHV0XG5cblxuXG4gICAgIyBSZXR1cm5zIHRydWUgaWYgaW5wdXQgaXMgbnVtZXJpY1xuICAgICNcbiAgICAjIEBwYXJhbSBbT2JqZWN0XSBpbnB1dCBUaGUgdmFsdWUgdG8gdGVzdFxuICAgICNcbiAgICAjIEByZXR1cm4gW0Jvb2xlYW5dIHRydWUgaWYgaW5wdXQgaXMgbnVtZXJpY1xuICAgICNcbiAgICBAaXNOdW1lcmljOiAoaW5wdXQpIC0+XG4gICAgICAgIEBSRUdFWF9TUEFDRVMubGFzdEluZGV4ID0gMFxuICAgICAgICByZXR1cm4gdHlwZW9mKGlucHV0KSBpcyAnbnVtYmVyJyBvciB0eXBlb2YoaW5wdXQpIGlzICdzdHJpbmcnIGFuZCAhaXNOYU4oaW5wdXQpIGFuZCBpbnB1dC5yZXBsYWNlKEBSRUdFWF9TUEFDRVMsICcnKSBpc250ICcnXG5cblxuICAgICMgUmV0dXJucyBhIHBhcnNlZCBkYXRlIGZyb20gdGhlIGdpdmVuIHN0cmluZ1xuICAgICNcbiAgICAjIEBwYXJhbSBbU3RyaW5nXSBzdHIgVGhlIGRhdGUgc3RyaW5nIHRvIHBhcnNlXG4gICAgI1xuICAgICMgQHJldHVybiBbRGF0ZV0gVGhlIHBhcnNlZCBkYXRlIG9yIG51bGwgaWYgcGFyc2luZyBmYWlsZWRcbiAgICAjXG4gICAgQHN0cmluZ1RvRGF0ZTogKHN0cikgLT5cbiAgICAgICAgdW5sZXNzIHN0cj8ubGVuZ3RoXG4gICAgICAgICAgICByZXR1cm4gbnVsbFxuXG4gICAgICAgICMgUGVyZm9ybSByZWd1bGFyIGV4cHJlc3Npb24gcGF0dGVyblxuICAgICAgICBpbmZvID0gQFBBVFRFUk5fREFURS5leGVjIHN0clxuICAgICAgICB1bmxlc3MgaW5mb1xuICAgICAgICAgICAgcmV0dXJuIG51bGxcblxuICAgICAgICAjIEV4dHJhY3QgeWVhciwgbW9udGgsIGRheVxuICAgICAgICB5ZWFyID0gcGFyc2VJbnQgaW5mby55ZWFyLCAxMFxuICAgICAgICBtb250aCA9IHBhcnNlSW50KGluZm8ubW9udGgsIDEwKSAtIDEgIyBJbiBqYXZhc2NyaXB0LCBqYW51YXJ5IGlzIDAsIGZlYnJ1YXJ5IDEsIGV0Yy4uLlxuICAgICAgICBkYXkgPSBwYXJzZUludCBpbmZvLmRheSwgMTBcblxuICAgICAgICAjIElmIG5vIGhvdXIgaXMgZ2l2ZW4sIHJldHVybiBhIGRhdGUgd2l0aCBkYXkgcHJlY2lzaW9uXG4gICAgICAgIHVubGVzcyBpbmZvLmhvdXI/XG4gICAgICAgICAgICBkYXRlID0gbmV3IERhdGUgRGF0ZS5VVEMoeWVhciwgbW9udGgsIGRheSlcbiAgICAgICAgICAgIHJldHVybiBkYXRlXG5cbiAgICAgICAgIyBFeHRyYWN0IGhvdXIsIG1pbnV0ZSwgc2Vjb25kXG4gICAgICAgIGhvdXIgPSBwYXJzZUludCBpbmZvLmhvdXIsIDEwXG4gICAgICAgIG1pbnV0ZSA9IHBhcnNlSW50IGluZm8ubWludXRlLCAxMFxuICAgICAgICBzZWNvbmQgPSBwYXJzZUludCBpbmZvLnNlY29uZCwgMTBcblxuICAgICAgICAjIEV4dHJhY3QgZnJhY3Rpb24sIGlmIGdpdmVuXG4gICAgICAgIGlmIGluZm8uZnJhY3Rpb24/XG4gICAgICAgICAgICBmcmFjdGlvbiA9IGluZm8uZnJhY3Rpb25bMC4uLjNdXG4gICAgICAgICAgICB3aGlsZSBmcmFjdGlvbi5sZW5ndGggPCAzXG4gICAgICAgICAgICAgICAgZnJhY3Rpb24gKz0gJzAnXG4gICAgICAgICAgICBmcmFjdGlvbiA9IHBhcnNlSW50IGZyYWN0aW9uLCAxMFxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBmcmFjdGlvbiA9IDBcblxuICAgICAgICAjIENvbXB1dGUgdGltZXpvbmUgb2Zmc2V0IGlmIGdpdmVuXG4gICAgICAgIGlmIGluZm8udHo/XG4gICAgICAgICAgICB0el9ob3VyID0gcGFyc2VJbnQgaW5mby50el9ob3VyLCAxMFxuICAgICAgICAgICAgaWYgaW5mby50el9taW51dGU/XG4gICAgICAgICAgICAgICAgdHpfbWludXRlID0gcGFyc2VJbnQgaW5mby50el9taW51dGUsIDEwXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgdHpfbWludXRlID0gMFxuXG4gICAgICAgICAgICAjIENvbXB1dGUgdGltZXpvbmUgZGVsdGEgaW4gbXNcbiAgICAgICAgICAgIHR6X29mZnNldCA9ICh0el9ob3VyICogNjAgKyB0el9taW51dGUpICogNjAwMDBcbiAgICAgICAgICAgIGlmICctJyBpcyBpbmZvLnR6X3NpZ25cbiAgICAgICAgICAgICAgICB0el9vZmZzZXQgKj0gLTFcblxuICAgICAgICAjIENvbXB1dGUgZGF0ZVxuICAgICAgICBkYXRlID0gbmV3IERhdGUgRGF0ZS5VVEMoeWVhciwgbW9udGgsIGRheSwgaG91ciwgbWludXRlLCBzZWNvbmQsIGZyYWN0aW9uKVxuICAgICAgICBpZiB0el9vZmZzZXRcbiAgICAgICAgICAgIGRhdGUuc2V0VGltZSBkYXRlLmdldFRpbWUoKSArIHR6X29mZnNldFxuXG4gICAgICAgIHJldHVybiBkYXRlXG5cblxuICAgICMgUmVwZWF0cyB0aGUgZ2l2ZW4gc3RyaW5nIGEgbnVtYmVyIG9mIHRpbWVzXG4gICAgI1xuICAgICMgQHBhcmFtIFtTdHJpbmddICAgc3RyICAgICBUaGUgc3RyaW5nIHRvIHJlcGVhdFxuICAgICMgQHBhcmFtIFtJbnRlZ2VyXSAgbnVtYmVyICBUaGUgbnVtYmVyIG9mIHRpbWVzIHRvIHJlcGVhdCB0aGUgc3RyaW5nXG4gICAgI1xuICAgICMgQHJldHVybiBbU3RyaW5nXSAgVGhlIHJlcGVhdGVkIHN0cmluZ1xuICAgICNcbiAgICBAc3RyUmVwZWF0OiAoc3RyLCBudW1iZXIpIC0+XG4gICAgICAgIHJlcyA9ICcnXG4gICAgICAgIGkgPSAwXG4gICAgICAgIHdoaWxlIGkgPCBudW1iZXJcbiAgICAgICAgICAgIHJlcyArPSBzdHJcbiAgICAgICAgICAgIGkrK1xuICAgICAgICByZXR1cm4gcmVzXG5cblxuICAgICMgUmVhZHMgdGhlIGRhdGEgZnJvbSB0aGUgZ2l2ZW4gZmlsZSBwYXRoIGFuZCByZXR1cm5zIHRoZSByZXN1bHQgYXMgc3RyaW5nXG4gICAgI1xuICAgICMgQHBhcmFtIFtTdHJpbmddICAgcGF0aCAgICAgICAgVGhlIHBhdGggdG8gdGhlIGZpbGVcbiAgICAjIEBwYXJhbSBbRnVuY3Rpb25dIGNhbGxiYWNrICAgIEEgY2FsbGJhY2sgdG8gcmVhZCBmaWxlIGFzeW5jaHJvbm91c2x5IChvcHRpb25hbClcbiAgICAjXG4gICAgIyBAcmV0dXJuIFtTdHJpbmddICBUaGUgcmVzdWx0aW5nIGRhdGEgYXMgc3RyaW5nXG4gICAgI1xuICAgIEBnZXRTdHJpbmdGcm9tRmlsZTogKHBhdGgsIGNhbGxiYWNrID0gbnVsbCkgLT5cbiAgICAgICAgeGhyID0gbnVsbFxuICAgICAgICBpZiB3aW5kb3c/XG4gICAgICAgICAgICBpZiB3aW5kb3cuWE1MSHR0cFJlcXVlc3RcbiAgICAgICAgICAgICAgICB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKVxuICAgICAgICAgICAgZWxzZSBpZiB3aW5kb3cuQWN0aXZlWE9iamVjdFxuICAgICAgICAgICAgICAgIGZvciBuYW1lIGluIFtcIk1zeG1sMi5YTUxIVFRQLjYuMFwiLCBcIk1zeG1sMi5YTUxIVFRQLjMuMFwiLCBcIk1zeG1sMi5YTUxIVFRQXCIsIFwiTWljcm9zb2Z0LlhNTEhUVFBcIl1cbiAgICAgICAgICAgICAgICAgICAgdHJ5XG4gICAgICAgICAgICAgICAgICAgICAgICB4aHIgPSBuZXcgQWN0aXZlWE9iamVjdChuYW1lKVxuXG4gICAgICAgIGlmIHhocj9cbiAgICAgICAgICAgICMgQnJvd3NlclxuICAgICAgICAgICAgaWYgY2FsbGJhY2s/XG4gICAgICAgICAgICAgICAgIyBBc3luY1xuICAgICAgICAgICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSAtPlxuICAgICAgICAgICAgICAgICAgICBpZiB4aHIucmVhZHlTdGF0ZSBpcyA0XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiB4aHIuc3RhdHVzIGlzIDIwMCBvciB4aHIuc3RhdHVzIGlzIDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayh4aHIucmVzcG9uc2VUZXh0KVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwpXG4gICAgICAgICAgICAgICAgeGhyLm9wZW4gJ0dFVCcsIHBhdGgsIHRydWVcbiAgICAgICAgICAgICAgICB4aHIuc2VuZCBudWxsXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAjIFN5bmNcbiAgICAgICAgICAgICAgICB4aHIub3BlbiAnR0VUJywgcGF0aCwgZmFsc2VcbiAgICAgICAgICAgICAgICB4aHIuc2VuZCBudWxsXG5cbiAgICAgICAgICAgICAgICBpZiB4aHIuc3RhdHVzIGlzIDIwMCBvciB4aHIuc3RhdHVzID09IDBcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHhoci5yZXNwb25zZVRleHRcblxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgICMgTm9kZS5qcy1saWtlXG4gICAgICAgICAgICByZXEgPSByZXF1aXJlXG4gICAgICAgICAgICBmcyA9IHJlcSgnZnMnKSAjIFByZXZlbnQgYnJvd3NlcmlmeSBmcm9tIHRyeWluZyB0byBsb2FkICdmcycgbW9kdWxlXG4gICAgICAgICAgICBpZiBjYWxsYmFjaz9cbiAgICAgICAgICAgICAgICAjIEFzeW5jXG4gICAgICAgICAgICAgICAgZnMucmVhZEZpbGUgcGF0aCwgKGVyciwgZGF0YSkgLT5cbiAgICAgICAgICAgICAgICAgICAgaWYgZXJyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayBudWxsXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrIFN0cmluZyhkYXRhKVxuXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgIyBTeW5jXG4gICAgICAgICAgICAgICAgZGF0YSA9IGZzLnJlYWRGaWxlU3luYyBwYXRoXG4gICAgICAgICAgICAgICAgaWYgZGF0YT9cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFN0cmluZyhkYXRhKVxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsXG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IFV0aWxzXG4iLCJcblBhcnNlciA9IHJlcXVpcmUgJy4vUGFyc2VyJ1xuRHVtcGVyID0gcmVxdWlyZSAnLi9EdW1wZXInXG5VdGlscyAgPSByZXF1aXJlICcuL1V0aWxzJ1xuXG4jIFlhbWwgb2ZmZXJzIGNvbnZlbmllbmNlIG1ldGhvZHMgdG8gbG9hZCBhbmQgZHVtcCBZQU1MLlxuI1xuY2xhc3MgWWFtbFxuXG4gICAgIyBQYXJzZXMgWUFNTCBpbnRvIGEgSmF2YVNjcmlwdCBvYmplY3QuXG4gICAgI1xuICAgICMgVGhlIHBhcnNlIG1ldGhvZCwgd2hlbiBzdXBwbGllZCB3aXRoIGEgWUFNTCBzdHJpbmcsXG4gICAgIyB3aWxsIGRvIGl0cyBiZXN0IHRvIGNvbnZlcnQgWUFNTCBpbiBhIGZpbGUgaW50byBhIEphdmFTY3JpcHQgb2JqZWN0LlxuICAgICNcbiAgICAjICBVc2FnZTpcbiAgICAjICAgICBteU9iamVjdCA9IFlhbWwucGFyc2UoJ3NvbWU6IHlhbWwnKTtcbiAgICAjICAgICBjb25zb2xlLmxvZyhteU9iamVjdCk7XG4gICAgI1xuICAgICMgQHBhcmFtIFtTdHJpbmddICAgaW5wdXQgICAgICAgICAgICAgICAgICAgQSBzdHJpbmcgY29udGFpbmluZyBZQU1MXG4gICAgIyBAcGFyYW0gW0Jvb2xlYW5dICBleGNlcHRpb25PbkludmFsaWRUeXBlICB0cnVlIGlmIGFuIGV4Y2VwdGlvbiBtdXN0IGJlIHRocm93biBvbiBpbnZhbGlkIHR5cGVzLCBmYWxzZSBvdGhlcndpc2VcbiAgICAjIEBwYXJhbSBbRnVuY3Rpb25dIG9iamVjdERlY29kZXIgICAgICAgICAgIEEgZnVuY3Rpb24gdG8gZGVzZXJpYWxpemUgY3VzdG9tIG9iamVjdHMsIG51bGwgb3RoZXJ3aXNlXG4gICAgI1xuICAgICMgQHJldHVybiBbT2JqZWN0XSAgVGhlIFlBTUwgY29udmVydGVkIHRvIGEgSmF2YVNjcmlwdCBvYmplY3RcbiAgICAjXG4gICAgIyBAdGhyb3cgW1BhcnNlRXhjZXB0aW9uXSBJZiB0aGUgWUFNTCBpcyBub3QgdmFsaWRcbiAgICAjXG4gICAgQHBhcnNlOiAoaW5wdXQsIGV4Y2VwdGlvbk9uSW52YWxpZFR5cGUgPSBmYWxzZSwgb2JqZWN0RGVjb2RlciA9IG51bGwpIC0+XG4gICAgICAgIHJldHVybiBuZXcgUGFyc2VyKCkucGFyc2UoaW5wdXQsIGV4Y2VwdGlvbk9uSW52YWxpZFR5cGUsIG9iamVjdERlY29kZXIpXG5cblxuICAgICMgUGFyc2VzIFlBTUwgZnJvbSBmaWxlIHBhdGggaW50byBhIEphdmFTY3JpcHQgb2JqZWN0LlxuICAgICNcbiAgICAjIFRoZSBwYXJzZUZpbGUgbWV0aG9kLCB3aGVuIHN1cHBsaWVkIHdpdGggYSBZQU1MIGZpbGUsXG4gICAgIyB3aWxsIGRvIGl0cyBiZXN0IHRvIGNvbnZlcnQgWUFNTCBpbiBhIGZpbGUgaW50byBhIEphdmFTY3JpcHQgb2JqZWN0LlxuICAgICNcbiAgICAjICBVc2FnZTpcbiAgICAjICAgICBteU9iamVjdCA9IFlhbWwucGFyc2VGaWxlKCdjb25maWcueW1sJyk7XG4gICAgIyAgICAgY29uc29sZS5sb2cobXlPYmplY3QpO1xuICAgICNcbiAgICAjIEBwYXJhbSBbU3RyaW5nXSAgIHBhdGggICAgICAgICAgICAgICAgICAgIEEgZmlsZSBwYXRoIHBvaW50aW5nIHRvIGEgdmFsaWQgWUFNTCBmaWxlXG4gICAgIyBAcGFyYW0gW0Jvb2xlYW5dICBleGNlcHRpb25PbkludmFsaWRUeXBlICB0cnVlIGlmIGFuIGV4Y2VwdGlvbiBtdXN0IGJlIHRocm93biBvbiBpbnZhbGlkIHR5cGVzLCBmYWxzZSBvdGhlcndpc2VcbiAgICAjIEBwYXJhbSBbRnVuY3Rpb25dIG9iamVjdERlY29kZXIgICAgICAgICAgIEEgZnVuY3Rpb24gdG8gZGVzZXJpYWxpemUgY3VzdG9tIG9iamVjdHMsIG51bGwgb3RoZXJ3aXNlXG4gICAgI1xuICAgICMgQHJldHVybiBbT2JqZWN0XSAgVGhlIFlBTUwgY29udmVydGVkIHRvIGEgSmF2YVNjcmlwdCBvYmplY3Qgb3IgbnVsbCBpZiB0aGUgZmlsZSBkb2Vzbid0IGV4aXN0LlxuICAgICNcbiAgICAjIEB0aHJvdyBbUGFyc2VFeGNlcHRpb25dIElmIHRoZSBZQU1MIGlzIG5vdCB2YWxpZFxuICAgICNcbiAgICBAcGFyc2VGaWxlOiAocGF0aCwgY2FsbGJhY2sgPSBudWxsLCBleGNlcHRpb25PbkludmFsaWRUeXBlID0gZmFsc2UsIG9iamVjdERlY29kZXIgPSBudWxsKSAtPlxuICAgICAgICBpZiBjYWxsYmFjaz9cbiAgICAgICAgICAgICMgQXN5bmNcbiAgICAgICAgICAgIFV0aWxzLmdldFN0cmluZ0Zyb21GaWxlIHBhdGgsIChpbnB1dCkgPT5cbiAgICAgICAgICAgICAgICByZXN1bHQgPSBudWxsXG4gICAgICAgICAgICAgICAgaWYgaW5wdXQ/XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IEBwYXJzZSBpbnB1dCwgZXhjZXB0aW9uT25JbnZhbGlkVHlwZSwgb2JqZWN0RGVjb2RlclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrIHJlc3VsdFxuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICBlbHNlXG4gICAgICAgICAgICAjIFN5bmNcbiAgICAgICAgICAgIGlucHV0ID0gVXRpbHMuZ2V0U3RyaW5nRnJvbUZpbGUgcGF0aFxuICAgICAgICAgICAgaWYgaW5wdXQ/XG4gICAgICAgICAgICAgICAgcmV0dXJuIEBwYXJzZSBpbnB1dCwgZXhjZXB0aW9uT25JbnZhbGlkVHlwZSwgb2JqZWN0RGVjb2RlclxuICAgICAgICAgICAgcmV0dXJuIG51bGxcblxuXG4gICAgIyBEdW1wcyBhIEphdmFTY3JpcHQgb2JqZWN0IHRvIGEgWUFNTCBzdHJpbmcuXG4gICAgI1xuICAgICMgVGhlIGR1bXAgbWV0aG9kLCB3aGVuIHN1cHBsaWVkIHdpdGggYW4gb2JqZWN0LCB3aWxsIGRvIGl0cyBiZXN0XG4gICAgIyB0byBjb252ZXJ0IHRoZSBvYmplY3QgaW50byBmcmllbmRseSBZQU1MLlxuICAgICNcbiAgICAjIEBwYXJhbSBbT2JqZWN0XSAgIGlucHV0ICAgICAgICAgICAgICAgICAgIEphdmFTY3JpcHQgb2JqZWN0XG4gICAgIyBAcGFyYW0gW0ludGVnZXJdICBpbmxpbmUgICAgICAgICAgICAgICAgICBUaGUgbGV2ZWwgd2hlcmUgeW91IHN3aXRjaCB0byBpbmxpbmUgWUFNTFxuICAgICMgQHBhcmFtIFtJbnRlZ2VyXSAgaW5kZW50ICAgICAgICAgICAgICAgICAgVGhlIGFtb3VudCBvZiBzcGFjZXMgdG8gdXNlIGZvciBpbmRlbnRhdGlvbiBvZiBuZXN0ZWQgbm9kZXMuXG4gICAgIyBAcGFyYW0gW0Jvb2xlYW5dICBleGNlcHRpb25PbkludmFsaWRUeXBlICB0cnVlIGlmIGFuIGV4Y2VwdGlvbiBtdXN0IGJlIHRocm93biBvbiBpbnZhbGlkIHR5cGVzIChhIEphdmFTY3JpcHQgcmVzb3VyY2Ugb3Igb2JqZWN0KSwgZmFsc2Ugb3RoZXJ3aXNlXG4gICAgIyBAcGFyYW0gW0Z1bmN0aW9uXSBvYmplY3RFbmNvZGVyICAgICAgICAgICBBIGZ1bmN0aW9uIHRvIHNlcmlhbGl6ZSBjdXN0b20gb2JqZWN0cywgbnVsbCBvdGhlcndpc2VcbiAgICAjXG4gICAgIyBAcmV0dXJuIFtTdHJpbmddICBBIFlBTUwgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgb3JpZ2luYWwgSmF2YVNjcmlwdCBvYmplY3RcbiAgICAjXG4gICAgQGR1bXA6IChpbnB1dCwgaW5saW5lID0gMiwgaW5kZW50ID0gNCwgZXhjZXB0aW9uT25JbnZhbGlkVHlwZSA9IGZhbHNlLCBvYmplY3RFbmNvZGVyID0gbnVsbCkgLT5cbiAgICAgICAgeWFtbCA9IG5ldyBEdW1wZXIoKVxuICAgICAgICB5YW1sLmluZGVudGF0aW9uID0gaW5kZW50XG5cbiAgICAgICAgcmV0dXJuIHlhbWwuZHVtcChpbnB1dCwgaW5saW5lLCAwLCBleGNlcHRpb25PbkludmFsaWRUeXBlLCBvYmplY3RFbmNvZGVyKVxuXG5cbiAgICAjIFJlZ2lzdGVycyAueW1sIGV4dGVuc2lvbiB0byB3b3JrIHdpdGggbm9kZSdzIHJlcXVpcmUoKSBmdW5jdGlvbi5cbiAgICAjXG4gICAgQHJlZ2lzdGVyOiAtPlxuICAgICAgICByZXF1aXJlX2hhbmRsZXIgPSAobW9kdWxlLCBmaWxlbmFtZSkgLT5cbiAgICAgICAgICAgICMgRmlsbCBpbiByZXN1bHRcbiAgICAgICAgICAgIG1vZHVsZS5leHBvcnRzID0gWUFNTC5wYXJzZUZpbGUgZmlsZW5hbWVcblxuICAgICAgICAjIFJlZ2lzdGVyIHJlcXVpcmUgZXh0ZW5zaW9ucyBvbmx5IGlmIHdlJ3JlIG9uIG5vZGUuanNcbiAgICAgICAgIyBoYWNrIGZvciBicm93c2VyaWZ5XG4gICAgICAgIGlmIHJlcXVpcmU/LmV4dGVuc2lvbnM/XG4gICAgICAgICAgICByZXF1aXJlLmV4dGVuc2lvbnNbJy55bWwnXSA9IHJlcXVpcmVfaGFuZGxlclxuICAgICAgICAgICAgcmVxdWlyZS5leHRlbnNpb25zWycueWFtbCddID0gcmVxdWlyZV9oYW5kbGVyXG5cblxuICAgICMgQWxpYXMgb2YgZHVtcCgpIG1ldGhvZCBmb3IgY29tcGF0aWJpbGl0eSByZWFzb25zLlxuICAgICNcbiAgICBAc3RyaW5naWZ5OiAoaW5wdXQsIGlubGluZSwgaW5kZW50LCBleGNlcHRpb25PbkludmFsaWRUeXBlLCBvYmplY3RFbmNvZGVyKSAtPlxuICAgICAgICByZXR1cm4gQGR1bXAgaW5wdXQsIGlubGluZSwgaW5kZW50LCBleGNlcHRpb25PbkludmFsaWRUeXBlLCBvYmplY3RFbmNvZGVyXG5cblxuICAgICMgQWxpYXMgb2YgcGFyc2VGaWxlKCkgbWV0aG9kIGZvciBjb21wYXRpYmlsaXR5IHJlYXNvbnMuXG4gICAgI1xuICAgIEBsb2FkOiAocGF0aCwgY2FsbGJhY2ssIGV4Y2VwdGlvbk9uSW52YWxpZFR5cGUsIG9iamVjdERlY29kZXIpIC0+XG4gICAgICAgIHJldHVybiBAcGFyc2VGaWxlIHBhdGgsIGNhbGxiYWNrLCBleGNlcHRpb25PbkludmFsaWRUeXBlLCBvYmplY3REZWNvZGVyXG5cblxuIyBFeHBvc2UgWUFNTCBuYW1lc3BhY2UgdG8gYnJvd3Nlclxud2luZG93Py5ZQU1MID0gWWFtbFxuXG5tb2R1bGUuZXhwb3J0cyA9IFlhbWxcblxuIl19
