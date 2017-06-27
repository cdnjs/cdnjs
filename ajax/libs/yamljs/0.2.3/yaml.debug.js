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
      } else if (Utils.ltrim(this.currentLine).charAt(0) === '#') {

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
    var count, i, indent, j, l, len, len1, line, lines, ref, ref1, ref2, smallestIndent, trimmedValue;
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
    lines = value.split("\n");
    smallestIndent = -1;
    for (j = 0, len = lines.length; j < len; j++) {
      line = lines[j];
      indent = line.length - Utils.ltrim(line).length;
      if (smallestIndent === -1 || indent < smallestIndent) {
        smallestIndent = indent;
      }
    }
    if (smallestIndent > 0) {
      for (i = l = 0, len1 = lines.length; l < len1; i = ++l) {
        line = lines[i];
        lines[i] = line.slice(smallestIndent);
      }
      value = lines.join("\n");
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

if (typeof window === "undefined" || window === null) {
  this.YAML = Yaml;
}

module.exports = Yaml;



},{"./Dumper":1,"./Parser":6,"./Utils":9}]},{},[10])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9Vc2Vycy9qZXJlbXlmYS9Eb2N1bWVudHMvUHJvamV0cy95YW1sLmpzL3NyYy9EdW1wZXIuY29mZmVlIiwiL1VzZXJzL2plcmVteWZhL0RvY3VtZW50cy9Qcm9qZXRzL3lhbWwuanMvc3JjL0VzY2FwZXIuY29mZmVlIiwiL1VzZXJzL2plcmVteWZhL0RvY3VtZW50cy9Qcm9qZXRzL3lhbWwuanMvc3JjL0V4Y2VwdGlvbi9EdW1wRXhjZXB0aW9uLmNvZmZlZSIsIi9Vc2Vycy9qZXJlbXlmYS9Eb2N1bWVudHMvUHJvamV0cy95YW1sLmpzL3NyYy9FeGNlcHRpb24vUGFyc2VFeGNlcHRpb24uY29mZmVlIiwiL1VzZXJzL2plcmVteWZhL0RvY3VtZW50cy9Qcm9qZXRzL3lhbWwuanMvc3JjL0lubGluZS5jb2ZmZWUiLCIvVXNlcnMvamVyZW15ZmEvRG9jdW1lbnRzL1Byb2pldHMveWFtbC5qcy9zcmMvUGFyc2VyLmNvZmZlZSIsIi9Vc2Vycy9qZXJlbXlmYS9Eb2N1bWVudHMvUHJvamV0cy95YW1sLmpzL3NyYy9QYXR0ZXJuLmNvZmZlZSIsIi9Vc2Vycy9qZXJlbXlmYS9Eb2N1bWVudHMvUHJvamV0cy95YW1sLmpzL3NyYy9VbmVzY2FwZXIuY29mZmVlIiwiL1VzZXJzL2plcmVteWZhL0RvY3VtZW50cy9Qcm9qZXRzL3lhbWwuanMvc3JjL1V0aWxzLmNvZmZlZSIsIi9Vc2Vycy9qZXJlbXlmYS9Eb2N1bWVudHMvUHJvamV0cy95YW1sLmpzL3NyYy9ZYW1sLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0NBLElBQUEscUJBQUE7O0FBQUEsS0FBQSxHQUFVLE9BQUEsQ0FBUSxTQUFSLENBQVYsQ0FBQTs7QUFBQSxNQUNBLEdBQVUsT0FBQSxDQUFRLFVBQVIsQ0FEVixDQUFB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Q0FESjtDQWpIQTs7QUFBQSxNQW9ITSxDQUFDLE9BQVAsR0FBaUIsSUFwSGpCLENBQUEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXG5VdGlscyAgID0gcmVxdWlyZSAnLi9VdGlscydcbklubGluZSAgPSByZXF1aXJlICcuL0lubGluZSdcblxuIyBEdW1wZXIgZHVtcHMgSmF2YVNjcmlwdCB2YXJpYWJsZXMgdG8gWUFNTCBzdHJpbmdzLlxuI1xuY2xhc3MgRHVtcGVyXG5cbiAgICAjIFRoZSBhbW91bnQgb2Ygc3BhY2VzIHRvIHVzZSBmb3IgaW5kZW50YXRpb24gb2YgbmVzdGVkIG5vZGVzLlxuICAgIEBpbmRlbnRhdGlvbjogICA0XG5cblxuICAgICMgRHVtcHMgYSBKYXZhU2NyaXB0IHZhbHVlIHRvIFlBTUwuXG4gICAgI1xuICAgICMgQHBhcmFtIFtPYmplY3RdICAgaW5wdXQgICAgICAgICAgICAgICAgICAgVGhlIEphdmFTY3JpcHQgdmFsdWVcbiAgICAjIEBwYXJhbSBbSW50ZWdlcl0gIGlubGluZSAgICAgICAgICAgICAgICAgIFRoZSBsZXZlbCB3aGVyZSB5b3Ugc3dpdGNoIHRvIGlubGluZSBZQU1MXG4gICAgIyBAcGFyYW0gW0ludGVnZXJdICBpbmRlbnQgICAgICAgICAgICAgICAgICBUaGUgbGV2ZWwgb2YgaW5kZW50YXRpb24gKHVzZWQgaW50ZXJuYWxseSlcbiAgICAjIEBwYXJhbSBbQm9vbGVhbl0gIGV4Y2VwdGlvbk9uSW52YWxpZFR5cGUgIHRydWUgaWYgYW4gZXhjZXB0aW9uIG11c3QgYmUgdGhyb3duIG9uIGludmFsaWQgdHlwZXMgKGEgSmF2YVNjcmlwdCByZXNvdXJjZSBvciBvYmplY3QpLCBmYWxzZSBvdGhlcndpc2VcbiAgICAjIEBwYXJhbSBbRnVuY3Rpb25dIG9iamVjdEVuY29kZXIgICAgICAgICAgIEEgZnVuY3Rpb24gdG8gc2VyaWFsaXplIGN1c3RvbSBvYmplY3RzLCBudWxsIG90aGVyd2lzZVxuICAgICNcbiAgICAjIEByZXR1cm4gW1N0cmluZ10gIFRoZSBZQU1MIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBKYXZhU2NyaXB0IHZhbHVlXG4gICAgI1xuICAgIGR1bXA6IChpbnB1dCwgaW5saW5lID0gMCwgaW5kZW50ID0gMCwgZXhjZXB0aW9uT25JbnZhbGlkVHlwZSA9IGZhbHNlLCBvYmplY3RFbmNvZGVyID0gbnVsbCkgLT5cbiAgICAgICAgb3V0cHV0ID0gJydcbiAgICAgICAgcHJlZml4ID0gKGlmIGluZGVudCB0aGVuIFV0aWxzLnN0clJlcGVhdCgnICcsIGluZGVudCkgZWxzZSAnJylcblxuICAgICAgICBpZiBpbmxpbmUgPD0gMCBvciB0eXBlb2YoaW5wdXQpIGlzbnQgJ29iamVjdCcgb3IgaW5wdXQgaW5zdGFuY2VvZiBEYXRlIG9yIFV0aWxzLmlzRW1wdHkoaW5wdXQpXG4gICAgICAgICAgICBvdXRwdXQgKz0gcHJlZml4ICsgSW5saW5lLmR1bXAoaW5wdXQsIGV4Y2VwdGlvbk9uSW52YWxpZFR5cGUsIG9iamVjdEVuY29kZXIpXG4gICAgICAgIFxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBpZiBpbnB1dCBpbnN0YW5jZW9mIEFycmF5XG4gICAgICAgICAgICAgICAgZm9yIHZhbHVlIGluIGlucHV0XG4gICAgICAgICAgICAgICAgICAgIHdpbGxCZUlubGluZWQgPSAoaW5saW5lIC0gMSA8PSAwIG9yIHR5cGVvZih2YWx1ZSkgaXNudCAnb2JqZWN0JyBvciBVdGlscy5pc0VtcHR5KHZhbHVlKSlcblxuICAgICAgICAgICAgICAgICAgICBvdXRwdXQgKz1cbiAgICAgICAgICAgICAgICAgICAgICAgIHByZWZpeCArXG4gICAgICAgICAgICAgICAgICAgICAgICAnLScgK1xuICAgICAgICAgICAgICAgICAgICAgICAgKGlmIHdpbGxCZUlubGluZWQgdGhlbiAnICcgZWxzZSBcIlxcblwiKSArXG4gICAgICAgICAgICAgICAgICAgICAgICBAZHVtcCh2YWx1ZSwgaW5saW5lIC0gMSwgKGlmIHdpbGxCZUlubGluZWQgdGhlbiAwIGVsc2UgaW5kZW50ICsgQGluZGVudGF0aW9uKSwgZXhjZXB0aW9uT25JbnZhbGlkVHlwZSwgb2JqZWN0RW5jb2RlcikgK1xuICAgICAgICAgICAgICAgICAgICAgICAgKGlmIHdpbGxCZUlubGluZWQgdGhlbiBcIlxcblwiIGVsc2UgJycpXG5cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBmb3Iga2V5LCB2YWx1ZSBvZiBpbnB1dFxuICAgICAgICAgICAgICAgICAgICB3aWxsQmVJbmxpbmVkID0gKGlubGluZSAtIDEgPD0gMCBvciB0eXBlb2YodmFsdWUpIGlzbnQgJ29iamVjdCcgb3IgVXRpbHMuaXNFbXB0eSh2YWx1ZSkpXG5cbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0ICs9XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmVmaXggK1xuICAgICAgICAgICAgICAgICAgICAgICAgSW5saW5lLmR1bXAoa2V5LCBleGNlcHRpb25PbkludmFsaWRUeXBlLCBvYmplY3RFbmNvZGVyKSArICc6JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAoaWYgd2lsbEJlSW5saW5lZCB0aGVuICcgJyBlbHNlIFwiXFxuXCIpICtcbiAgICAgICAgICAgICAgICAgICAgICAgIEBkdW1wKHZhbHVlLCBpbmxpbmUgLSAxLCAoaWYgd2lsbEJlSW5saW5lZCB0aGVuIDAgZWxzZSBpbmRlbnQgKyBAaW5kZW50YXRpb24pLCBleGNlcHRpb25PbkludmFsaWRUeXBlLCBvYmplY3RFbmNvZGVyKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAoaWYgd2lsbEJlSW5saW5lZCB0aGVuIFwiXFxuXCIgZWxzZSAnJylcblxuICAgICAgICByZXR1cm4gb3V0cHV0XG5cblxubW9kdWxlLmV4cG9ydHMgPSBEdW1wZXJcbiIsIlxuUGF0dGVybiA9IHJlcXVpcmUgJy4vUGF0dGVybidcblxuIyBFc2NhcGVyIGVuY2Fwc3VsYXRlcyBlc2NhcGluZyBydWxlcyBmb3Igc2luZ2xlXG4jIGFuZCBkb3VibGUtcXVvdGVkIFlBTUwgc3RyaW5ncy5cbmNsYXNzIEVzY2FwZXJcblxuICAgICMgTWFwcGluZyBhcnJheXMgZm9yIGVzY2FwaW5nIGEgZG91YmxlIHF1b3RlZCBzdHJpbmcuIFRoZSBiYWNrc2xhc2ggaXNcbiAgICAjIGZpcnN0IHRvIGVuc3VyZSBwcm9wZXIgZXNjYXBpbmcuXG4gICAgQExJU1RfRVNDQVBFRVM6ICAgICAgICAgICAgICAgICBbJ1xcXFxcXFxcJywgJ1xcXFxcIicsICdcIicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXHgwMFwiLCAgXCJcXHgwMVwiLCAgXCJcXHgwMlwiLCAgXCJcXHgwM1wiLCAgXCJcXHgwNFwiLCAgXCJcXHgwNVwiLCAgXCJcXHgwNlwiLCAgXCJcXHgwN1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFx4MDhcIiwgIFwiXFx4MDlcIiwgIFwiXFx4MGFcIiwgIFwiXFx4MGJcIiwgIFwiXFx4MGNcIiwgIFwiXFx4MGRcIiwgIFwiXFx4MGVcIiwgIFwiXFx4MGZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxceDEwXCIsICBcIlxceDExXCIsICBcIlxceDEyXCIsICBcIlxceDEzXCIsICBcIlxceDE0XCIsICBcIlxceDE1XCIsICBcIlxceDE2XCIsICBcIlxceDE3XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXHgxOFwiLCAgXCJcXHgxOVwiLCAgXCJcXHgxYVwiLCAgXCJcXHgxYlwiLCAgXCJcXHgxY1wiLCAgXCJcXHgxZFwiLCAgXCJcXHgxZVwiLCAgXCJcXHgxZlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjaCA9IFN0cmluZy5mcm9tQ2hhckNvZGUpKDB4MDA4NSksIGNoKDB4MDBBMCksIGNoKDB4MjAyOCksIGNoKDB4MjAyOSldXG4gICAgQExJU1RfRVNDQVBFRDogICAgICAgICAgICAgICAgICBbJ1xcXFxcIicsICdcXFxcXFxcXCcsICdcXFxcXCInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxcXDBcIiwgICBcIlxcXFx4MDFcIiwgXCJcXFxceDAyXCIsIFwiXFxcXHgwM1wiLCBcIlxcXFx4MDRcIiwgXCJcXFxceDA1XCIsIFwiXFxcXHgwNlwiLCBcIlxcXFxhXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXFxcYlwiLCAgIFwiXFxcXHRcIiwgICBcIlxcXFxuXCIsICAgXCJcXFxcdlwiLCAgIFwiXFxcXGZcIiwgICBcIlxcXFxyXCIsICAgXCJcXFxceDBlXCIsIFwiXFxcXHgwZlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxcXHgxMFwiLCBcIlxcXFx4MTFcIiwgXCJcXFxceDEyXCIsIFwiXFxcXHgxM1wiLCBcIlxcXFx4MTRcIiwgXCJcXFxceDE1XCIsIFwiXFxcXHgxNlwiLCBcIlxcXFx4MTdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcXFx4MThcIiwgXCJcXFxceDE5XCIsIFwiXFxcXHgxYVwiLCBcIlxcXFxlXCIsICAgXCJcXFxceDFjXCIsIFwiXFxcXHgxZFwiLCBcIlxcXFx4MWVcIiwgXCJcXFxceDFmXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXFxcTlwiLCBcIlxcXFxfXCIsIFwiXFxcXExcIiwgXCJcXFxcUFwiXVxuXG4gICAgQE1BUFBJTkdfRVNDQVBFRVNfVE9fRVNDQVBFRDogICBkbyA9PlxuICAgICAgICBtYXBwaW5nID0ge31cbiAgICAgICAgZm9yIGkgaW4gWzAuLi5ATElTVF9FU0NBUEVFUy5sZW5ndGhdXG4gICAgICAgICAgICBtYXBwaW5nW0BMSVNUX0VTQ0FQRUVTW2ldXSA9IEBMSVNUX0VTQ0FQRURbaV1cbiAgICAgICAgcmV0dXJuIG1hcHBpbmcgXG5cbiAgICAjIENoYXJhY3RlcnMgdGhhdCB3b3VsZCBjYXVzZSBhIGR1bXBlZCBzdHJpbmcgdG8gcmVxdWlyZSBkb3VibGUgcXVvdGluZy5cbiAgICBAUEFUVEVSTl9DSEFSQUNURVJTX1RPX0VTQ0FQRTogIG5ldyBQYXR0ZXJuICdbXFxcXHgwMC1cXFxceDFmXXxcXHhjMlxceDg1fFxceGMyXFx4YTB8XFx4ZTJcXHg4MFxceGE4fFxceGUyXFx4ODBcXHhhOSdcblxuICAgICMgT3RoZXIgcHJlY29tcGlsZWQgcGF0dGVybnNcbiAgICBAUEFUVEVSTl9NQVBQSU5HX0VTQ0FQRUVTOiAgICAgIG5ldyBQYXR0ZXJuIEBMSVNUX0VTQ0FQRUVTLmpvaW4oJ3wnKVxuICAgIEBQQVRURVJOX1NJTkdMRV9RVU9USU5HOiAgICAgICAgbmV3IFBhdHRlcm4gJ1tcXFxcc1xcJ1wiOnt9W1xcXFxdLCYqIz9dfF5bLT98PD49ISVAYF0nXG5cblxuXG4gICAgIyBEZXRlcm1pbmVzIGlmIGEgSmF2YVNjcmlwdCB2YWx1ZSB3b3VsZCByZXF1aXJlIGRvdWJsZSBxdW90aW5nIGluIFlBTUwuXG4gICAgI1xuICAgICMgQHBhcmFtIFtTdHJpbmddICAgdmFsdWUgICBBIEphdmFTY3JpcHQgdmFsdWUgdmFsdWVcbiAgICAjXG4gICAgIyBAcmV0dXJuIFtCb29sZWFuXSB0cnVlICAgIGlmIHRoZSB2YWx1ZSB3b3VsZCByZXF1aXJlIGRvdWJsZSBxdW90ZXMuXG4gICAgI1xuICAgIEByZXF1aXJlc0RvdWJsZVF1b3Rpbmc6ICh2YWx1ZSkgLT5cbiAgICAgICAgcmV0dXJuIEBQQVRURVJOX0NIQVJBQ1RFUlNfVE9fRVNDQVBFLnRlc3QgdmFsdWVcblxuXG4gICAgIyBFc2NhcGVzIGFuZCBzdXJyb3VuZHMgYSBKYXZhU2NyaXB0IHZhbHVlIHdpdGggZG91YmxlIHF1b3Rlcy5cbiAgICAjXG4gICAgIyBAcGFyYW0gW1N0cmluZ10gICB2YWx1ZSAgIEEgSmF2YVNjcmlwdCB2YWx1ZVxuICAgICNcbiAgICAjIEByZXR1cm4gW1N0cmluZ10gIFRoZSBxdW90ZWQsIGVzY2FwZWQgc3RyaW5nXG4gICAgI1xuICAgIEBlc2NhcGVXaXRoRG91YmxlUXVvdGVzOiAodmFsdWUpIC0+XG4gICAgICAgIHJlc3VsdCA9IEBQQVRURVJOX01BUFBJTkdfRVNDQVBFRVMucmVwbGFjZSB2YWx1ZSwgKHN0cikgPT5cbiAgICAgICAgICAgIHJldHVybiBATUFQUElOR19FU0NBUEVFU19UT19FU0NBUEVEW3N0cl1cbiAgICAgICAgcmV0dXJuICdcIicrcmVzdWx0KydcIidcblxuXG4gICAgIyBEZXRlcm1pbmVzIGlmIGEgSmF2YVNjcmlwdCB2YWx1ZSB3b3VsZCByZXF1aXJlIHNpbmdsZSBxdW90aW5nIGluIFlBTUwuXG4gICAgI1xuICAgICMgQHBhcmFtIFtTdHJpbmddICAgdmFsdWUgICBBIEphdmFTY3JpcHQgdmFsdWVcbiAgICAjXG4gICAgIyBAcmV0dXJuIFtCb29sZWFuXSB0cnVlIGlmIHRoZSB2YWx1ZSB3b3VsZCByZXF1aXJlIHNpbmdsZSBxdW90ZXMuXG4gICAgI1xuICAgIEByZXF1aXJlc1NpbmdsZVF1b3Rpbmc6ICh2YWx1ZSkgLT5cbiAgICAgICAgcmV0dXJuIEBQQVRURVJOX1NJTkdMRV9RVU9USU5HLnRlc3QgdmFsdWVcblxuXG4gICAgIyBFc2NhcGVzIGFuZCBzdXJyb3VuZHMgYSBKYXZhU2NyaXB0IHZhbHVlIHdpdGggc2luZ2xlIHF1b3Rlcy5cbiAgICAjXG4gICAgIyBAcGFyYW0gW1N0cmluZ10gICB2YWx1ZSAgIEEgSmF2YVNjcmlwdCB2YWx1ZVxuICAgICNcbiAgICAjIEByZXR1cm4gW1N0cmluZ10gIFRoZSBxdW90ZWQsIGVzY2FwZWQgc3RyaW5nXG4gICAgI1xuICAgIEBlc2NhcGVXaXRoU2luZ2xlUXVvdGVzOiAodmFsdWUpIC0+XG4gICAgICAgIHJldHVybiBcIidcIit2YWx1ZS5yZXBsYWNlKC8nL2csIFwiJydcIikrXCInXCJcblxuXG5tb2R1bGUuZXhwb3J0cyA9IEVzY2FwZXJcblxuIiwiXG5jbGFzcyBEdW1wRXhjZXB0aW9uIGV4dGVuZHMgRXJyb3JcblxuICAgIGNvbnN0cnVjdG9yOiAoQG1lc3NhZ2UsIEBwYXJzZWRMaW5lLCBAc25pcHBldCkgLT5cblxuICAgIHRvU3RyaW5nOiAtPlxuICAgICAgICBpZiBAcGFyc2VkTGluZT8gYW5kIEBzbmlwcGV0P1xuICAgICAgICAgICAgcmV0dXJuICc8RHVtcEV4Y2VwdGlvbj4gJyArIEBtZXNzYWdlICsgJyAobGluZSAnICsgQHBhcnNlZExpbmUgKyAnOiBcXCcnICsgQHNuaXBwZXQgKyAnXFwnKSdcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuICc8RHVtcEV4Y2VwdGlvbj4gJyArIEBtZXNzYWdlXG5cbm1vZHVsZS5leHBvcnRzID0gRHVtcEV4Y2VwdGlvblxuIiwiXG5jbGFzcyBQYXJzZUV4Y2VwdGlvbiBleHRlbmRzIEVycm9yXG5cbiAgICBjb25zdHJ1Y3RvcjogKEBtZXNzYWdlLCBAcGFyc2VkTGluZSwgQHNuaXBwZXQpIC0+XG5cbiAgICB0b1N0cmluZzogLT5cbiAgICAgICAgaWYgQHBhcnNlZExpbmU/IGFuZCBAc25pcHBldD9cbiAgICAgICAgICAgIHJldHVybiAnPFBhcnNlRXhjZXB0aW9uPiAnICsgQG1lc3NhZ2UgKyAnIChsaW5lICcgKyBAcGFyc2VkTGluZSArICc6IFxcJycgKyBAc25pcHBldCArICdcXCcpJ1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gJzxQYXJzZUV4Y2VwdGlvbj4gJyArIEBtZXNzYWdlXG5cbm1vZHVsZS5leHBvcnRzID0gUGFyc2VFeGNlcHRpb25cbiIsIlxuUGF0dGVybiAgICAgICAgID0gcmVxdWlyZSAnLi9QYXR0ZXJuJ1xuVW5lc2NhcGVyICAgICAgID0gcmVxdWlyZSAnLi9VbmVzY2FwZXInXG5Fc2NhcGVyICAgICAgICAgPSByZXF1aXJlICcuL0VzY2FwZXInXG5VdGlscyAgICAgICAgICAgPSByZXF1aXJlICcuL1V0aWxzJ1xuUGFyc2VFeGNlcHRpb24gID0gcmVxdWlyZSAnLi9FeGNlcHRpb24vUGFyc2VFeGNlcHRpb24nXG5EdW1wRXhjZXB0aW9uICAgPSByZXF1aXJlICcuL0V4Y2VwdGlvbi9EdW1wRXhjZXB0aW9uJ1xuXG4jIElubGluZSBZQU1MIHBhcnNpbmcgYW5kIGR1bXBpbmdcbmNsYXNzIElubGluZVxuXG4gICAgIyBRdW90ZWQgc3RyaW5nIHJlZ3VsYXIgZXhwcmVzc2lvblxuICAgIEBSRUdFWF9RVU9URURfU1RSSU5HOiAgICAgICAgICAgICAgICcoPzpcIig/OlteXCJcXFxcXFxcXF0qKD86XFxcXFxcXFwuW15cIlxcXFxcXFxcXSopKilcInxcXCcoPzpbXlxcJ10qKD86XFwnXFwnW15cXCddKikqKVxcJyknXG5cbiAgICAjIFByZS1jb21waWxlZCBwYXR0ZXJuc1xuICAgICNcbiAgICBAUEFUVEVSTl9UUkFJTElOR19DT01NRU5UUzogICAgICAgICBuZXcgUGF0dGVybiAnXlxcXFxzKiMuKiQnXG4gICAgQFBBVFRFUk5fUVVPVEVEX1NDQUxBUjogICAgICAgICAgICAgbmV3IFBhdHRlcm4gJ14nK0BSRUdFWF9RVU9URURfU1RSSU5HXG4gICAgQFBBVFRFUk5fVEhPVVNBTkRfTlVNRVJJQ19TQ0FMQVI6ICAgbmV3IFBhdHRlcm4gJ14oLXxcXFxcKyk/WzAtOSxdKyhcXFxcLlswLTldKyk/JCdcbiAgICBAUEFUVEVSTl9TQ0FMQVJfQllfREVMSU1JVEVSUzogICAgICB7fVxuXG4gICAgIyBTZXR0aW5nc1xuICAgIEBzZXR0aW5nczoge31cblxuXG4gICAgIyBDb25maWd1cmUgWUFNTCBpbmxpbmUuXG4gICAgI1xuICAgICMgQHBhcmFtIFtCb29sZWFuXSAgZXhjZXB0aW9uT25JbnZhbGlkVHlwZSAgdHJ1ZSBpZiBhbiBleGNlcHRpb24gbXVzdCBiZSB0aHJvd24gb24gaW52YWxpZCB0eXBlcyAoYSBKYXZhU2NyaXB0IHJlc291cmNlIG9yIG9iamVjdCksIGZhbHNlIG90aGVyd2lzZVxuICAgICMgQHBhcmFtIFtGdW5jdGlvbl0gb2JqZWN0RGVjb2RlciAgICAgICAgICAgQSBmdW5jdGlvbiB0byBkZXNlcmlhbGl6ZSBjdXN0b20gb2JqZWN0cywgbnVsbCBvdGhlcndpc2VcbiAgICAjXG4gICAgQGNvbmZpZ3VyZTogKGV4Y2VwdGlvbk9uSW52YWxpZFR5cGUgPSBudWxsLCBvYmplY3REZWNvZGVyID0gbnVsbCkgLT5cbiAgICAgICAgIyBVcGRhdGUgc2V0dGluZ3NcbiAgICAgICAgQHNldHRpbmdzLmV4Y2VwdGlvbk9uSW52YWxpZFR5cGUgPSBleGNlcHRpb25PbkludmFsaWRUeXBlXG4gICAgICAgIEBzZXR0aW5ncy5vYmplY3REZWNvZGVyID0gb2JqZWN0RGVjb2RlclxuICAgICAgICByZXR1cm5cblxuXG4gICAgIyBDb252ZXJ0cyBhIFlBTUwgc3RyaW5nIHRvIGEgSmF2YVNjcmlwdCBvYmplY3QuXG4gICAgI1xuICAgICMgQHBhcmFtIFtTdHJpbmddICAgdmFsdWUgICAgICAgICAgICAgICAgICAgQSBZQU1MIHN0cmluZ1xuICAgICMgQHBhcmFtIFtCb29sZWFuXSAgZXhjZXB0aW9uT25JbnZhbGlkVHlwZSAgdHJ1ZSBpZiBhbiBleGNlcHRpb24gbXVzdCBiZSB0aHJvd24gb24gaW52YWxpZCB0eXBlcyAoYSBKYXZhU2NyaXB0IHJlc291cmNlIG9yIG9iamVjdCksIGZhbHNlIG90aGVyd2lzZVxuICAgICMgQHBhcmFtIFtGdW5jdGlvbl0gb2JqZWN0RGVjb2RlciAgICAgICAgICAgQSBmdW5jdGlvbiB0byBkZXNlcmlhbGl6ZSBjdXN0b20gb2JqZWN0cywgbnVsbCBvdGhlcndpc2VcbiAgICAjXG4gICAgIyBAcmV0dXJuIFtPYmplY3RdICBBIEphdmFTY3JpcHQgb2JqZWN0IHJlcHJlc2VudGluZyB0aGUgWUFNTCBzdHJpbmdcbiAgICAjXG4gICAgIyBAdGhyb3cgW1BhcnNlRXhjZXB0aW9uXVxuICAgICNcbiAgICBAcGFyc2U6ICh2YWx1ZSwgZXhjZXB0aW9uT25JbnZhbGlkVHlwZSA9IGZhbHNlLCBvYmplY3REZWNvZGVyID0gbnVsbCkgLT5cbiAgICAgICAgIyBVcGRhdGUgc2V0dGluZ3MgZnJvbSBsYXN0IGNhbGwgb2YgSW5saW5lLnBhcnNlKClcbiAgICAgICAgQHNldHRpbmdzLmV4Y2VwdGlvbk9uSW52YWxpZFR5cGUgPSBleGNlcHRpb25PbkludmFsaWRUeXBlXG4gICAgICAgIEBzZXR0aW5ncy5vYmplY3REZWNvZGVyID0gb2JqZWN0RGVjb2RlclxuXG4gICAgICAgIGlmIG5vdCB2YWx1ZT9cbiAgICAgICAgICAgIHJldHVybiAnJ1xuXG4gICAgICAgIHZhbHVlID0gVXRpbHMudHJpbSB2YWx1ZVxuXG4gICAgICAgIGlmIDAgaXMgdmFsdWUubGVuZ3RoXG4gICAgICAgICAgICByZXR1cm4gJydcblxuICAgICAgICAjIEtlZXAgYSBjb250ZXh0IG9iamVjdCB0byBwYXNzIHRocm91Z2ggc3RhdGljIG1ldGhvZHNcbiAgICAgICAgY29udGV4dCA9IHtleGNlcHRpb25PbkludmFsaWRUeXBlLCBvYmplY3REZWNvZGVyLCBpOiAwfVxuXG4gICAgICAgIHN3aXRjaCB2YWx1ZS5jaGFyQXQoMClcbiAgICAgICAgICAgIHdoZW4gJ1snXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gQHBhcnNlU2VxdWVuY2UgdmFsdWUsIGNvbnRleHRcbiAgICAgICAgICAgICAgICArK2NvbnRleHQuaVxuICAgICAgICAgICAgd2hlbiAneydcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBAcGFyc2VNYXBwaW5nIHZhbHVlLCBjb250ZXh0XG4gICAgICAgICAgICAgICAgKytjb250ZXh0LmlcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBAcGFyc2VTY2FsYXIgdmFsdWUsIG51bGwsIFsnXCInLCBcIidcIl0sIGNvbnRleHRcblxuICAgICAgICAjIFNvbWUgY29tbWVudHMgYXJlIGFsbG93ZWQgYXQgdGhlIGVuZFxuICAgICAgICBpZiBAUEFUVEVSTl9UUkFJTElOR19DT01NRU5UUy5yZXBsYWNlKHZhbHVlW2NvbnRleHQuaS4uXSwgJycpIGlzbnQgJydcbiAgICAgICAgICAgIHRocm93IG5ldyBQYXJzZUV4Y2VwdGlvbiAnVW5leHBlY3RlZCBjaGFyYWN0ZXJzIG5lYXIgXCInK3ZhbHVlW2NvbnRleHQuaS4uXSsnXCIuJ1xuXG4gICAgICAgIHJldHVybiByZXN1bHRcblxuXG4gICAgIyBEdW1wcyBhIGdpdmVuIEphdmFTY3JpcHQgdmFyaWFibGUgdG8gYSBZQU1MIHN0cmluZy5cbiAgICAjXG4gICAgIyBAcGFyYW0gW09iamVjdF0gICB2YWx1ZSAgICAgICAgICAgICAgICAgICBUaGUgSmF2YVNjcmlwdCB2YXJpYWJsZSB0byBjb252ZXJ0XG4gICAgIyBAcGFyYW0gW0Jvb2xlYW5dICBleGNlcHRpb25PbkludmFsaWRUeXBlICB0cnVlIGlmIGFuIGV4Y2VwdGlvbiBtdXN0IGJlIHRocm93biBvbiBpbnZhbGlkIHR5cGVzIChhIEphdmFTY3JpcHQgcmVzb3VyY2Ugb3Igb2JqZWN0KSwgZmFsc2Ugb3RoZXJ3aXNlXG4gICAgIyBAcGFyYW0gW0Z1bmN0aW9uXSBvYmplY3RFbmNvZGVyICAgICAgICAgICBBIGZ1bmN0aW9uIHRvIHNlcmlhbGl6ZSBjdXN0b20gb2JqZWN0cywgbnVsbCBvdGhlcndpc2VcbiAgICAjXG4gICAgIyBAcmV0dXJuIFtTdHJpbmddICBUaGUgWUFNTCBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBKYXZhU2NyaXB0IG9iamVjdFxuICAgICNcbiAgICAjIEB0aHJvdyBbRHVtcEV4Y2VwdGlvbl1cbiAgICAjXG4gICAgQGR1bXA6ICh2YWx1ZSwgZXhjZXB0aW9uT25JbnZhbGlkVHlwZSA9IGZhbHNlLCBvYmplY3RFbmNvZGVyID0gbnVsbCkgLT5cbiAgICAgICAgaWYgbm90IHZhbHVlP1xuICAgICAgICAgICAgcmV0dXJuICdudWxsJ1xuICAgICAgICB0eXBlID0gdHlwZW9mIHZhbHVlXG4gICAgICAgIGlmIHR5cGUgaXMgJ29iamVjdCdcbiAgICAgICAgICAgIGlmIHZhbHVlIGluc3RhbmNlb2YgRGF0ZVxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZS50b0lTT1N0cmluZygpXG4gICAgICAgICAgICBlbHNlIGlmIG9iamVjdEVuY29kZXI/XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gb2JqZWN0RW5jb2RlciB2YWx1ZVxuICAgICAgICAgICAgICAgIGlmIHR5cGVvZiByZXN1bHQgaXMgJ3N0cmluZycgb3IgcmVzdWx0P1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0XG4gICAgICAgICAgICByZXR1cm4gQGR1bXBPYmplY3QgdmFsdWVcbiAgICAgICAgaWYgdHlwZSBpcyAnYm9vbGVhbidcbiAgICAgICAgICAgIHJldHVybiAoaWYgdmFsdWUgdGhlbiAndHJ1ZScgZWxzZSAnZmFsc2UnKVxuICAgICAgICBpZiBVdGlscy5pc0RpZ2l0cyh2YWx1ZSlcbiAgICAgICAgICAgIHJldHVybiAoaWYgdHlwZSBpcyAnc3RyaW5nJyB0aGVuIFwiJ1wiK3ZhbHVlK1wiJ1wiIGVsc2UgU3RyaW5nKHBhcnNlSW50KHZhbHVlKSkpXG4gICAgICAgIGlmIFV0aWxzLmlzTnVtZXJpYyh2YWx1ZSlcbiAgICAgICAgICAgIHJldHVybiAoaWYgdHlwZSBpcyAnc3RyaW5nJyB0aGVuIFwiJ1wiK3ZhbHVlK1wiJ1wiIGVsc2UgU3RyaW5nKHBhcnNlRmxvYXQodmFsdWUpKSlcbiAgICAgICAgaWYgdHlwZSBpcyAnbnVtYmVyJ1xuICAgICAgICAgICAgcmV0dXJuIChpZiB2YWx1ZSBpcyBJbmZpbml0eSB0aGVuICcuSW5mJyBlbHNlIChpZiB2YWx1ZSBpcyAtSW5maW5pdHkgdGhlbiAnLS5JbmYnIGVsc2UgKGlmIGlzTmFOKHZhbHVlKSB0aGVuICcuTmFOJyBlbHNlIHZhbHVlKSkpXG4gICAgICAgIGlmIEVzY2FwZXIucmVxdWlyZXNEb3VibGVRdW90aW5nIHZhbHVlXG4gICAgICAgICAgICByZXR1cm4gRXNjYXBlci5lc2NhcGVXaXRoRG91YmxlUXVvdGVzIHZhbHVlXG4gICAgICAgIGlmIEVzY2FwZXIucmVxdWlyZXNTaW5nbGVRdW90aW5nIHZhbHVlXG4gICAgICAgICAgICByZXR1cm4gRXNjYXBlci5lc2NhcGVXaXRoU2luZ2xlUXVvdGVzIHZhbHVlXG4gICAgICAgIGlmICcnIGlzIHZhbHVlXG4gICAgICAgICAgICByZXR1cm4gJ1wiXCInXG4gICAgICAgIGlmIFV0aWxzLlBBVFRFUk5fREFURS50ZXN0IHZhbHVlXG4gICAgICAgICAgICByZXR1cm4gXCInXCIrdmFsdWUrXCInXCI7XG4gICAgICAgIGlmIHZhbHVlLnRvTG93ZXJDYXNlKCkgaW4gWydudWxsJywnficsJ3RydWUnLCdmYWxzZSddXG4gICAgICAgICAgICByZXR1cm4gXCInXCIrdmFsdWUrXCInXCJcbiAgICAgICAgIyBEZWZhdWx0XG4gICAgICAgIHJldHVybiB2YWx1ZTtcblxuXG4gICAgIyBEdW1wcyBhIEphdmFTY3JpcHQgb2JqZWN0IHRvIGEgWUFNTCBzdHJpbmcuXG4gICAgI1xuICAgICMgQHBhcmFtIFtPYmplY3RdICAgdmFsdWUgICAgICAgICAgICAgICAgICAgVGhlIEphdmFTY3JpcHQgb2JqZWN0IHRvIGR1bXBcbiAgICAjIEBwYXJhbSBbQm9vbGVhbl0gIGV4Y2VwdGlvbk9uSW52YWxpZFR5cGUgIHRydWUgaWYgYW4gZXhjZXB0aW9uIG11c3QgYmUgdGhyb3duIG9uIGludmFsaWQgdHlwZXMgKGEgSmF2YVNjcmlwdCByZXNvdXJjZSBvciBvYmplY3QpLCBmYWxzZSBvdGhlcndpc2VcbiAgICAjIEBwYXJhbSBbRnVuY3Rpb25dIG9iamVjdEVuY29kZXIgICAgICAgICAgIEEgZnVuY3Rpb24gZG8gc2VyaWFsaXplIGN1c3RvbSBvYmplY3RzLCBudWxsIG90aGVyd2lzZVxuICAgICNcbiAgICAjIEByZXR1cm4gc3RyaW5nIFRoZSBZQU1MIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIEphdmFTY3JpcHQgb2JqZWN0XG4gICAgI1xuICAgIEBkdW1wT2JqZWN0OiAodmFsdWUsIGV4Y2VwdGlvbk9uSW52YWxpZFR5cGUsIG9iamVjdFN1cHBvcnQgPSBudWxsKSAtPlxuICAgICAgICAjIEFycmF5XG4gICAgICAgIGlmIHZhbHVlIGluc3RhbmNlb2YgQXJyYXlcbiAgICAgICAgICAgIG91dHB1dCA9IFtdXG4gICAgICAgICAgICBmb3IgdmFsIGluIHZhbHVlXG4gICAgICAgICAgICAgICAgb3V0cHV0LnB1c2ggQGR1bXAgdmFsXG4gICAgICAgICAgICByZXR1cm4gJ1snK291dHB1dC5qb2luKCcsICcpKyddJ1xuXG4gICAgICAgICMgTWFwcGluZ1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBvdXRwdXQgPSBbXVxuICAgICAgICAgICAgZm9yIGtleSwgdmFsIG9mIHZhbHVlXG4gICAgICAgICAgICAgICAgb3V0cHV0LnB1c2ggQGR1bXAoa2V5KSsnOiAnK0BkdW1wKHZhbClcbiAgICAgICAgICAgIHJldHVybiAneycrb3V0cHV0LmpvaW4oJywgJykrJ30nXG5cblxuICAgICMgUGFyc2VzIGEgc2NhbGFyIHRvIGEgWUFNTCBzdHJpbmcuXG4gICAgI1xuICAgICMgQHBhcmFtIFtPYmplY3RdICAgc2NhbGFyXG4gICAgIyBAcGFyYW0gW0FycmF5XSAgICBkZWxpbWl0ZXJzXG4gICAgIyBAcGFyYW0gW0FycmF5XSAgICBzdHJpbmdEZWxpbWl0ZXJzXG4gICAgIyBAcGFyYW0gW09iamVjdF0gICBjb250ZXh0XG4gICAgIyBAcGFyYW0gW0Jvb2xlYW5dICBldmFsdWF0ZVxuICAgICNcbiAgICAjIEByZXR1cm4gW1N0cmluZ10gIEEgWUFNTCBzdHJpbmdcbiAgICAjXG4gICAgIyBAdGhyb3cgW1BhcnNlRXhjZXB0aW9uXSBXaGVuIG1hbGZvcm1lZCBpbmxpbmUgWUFNTCBzdHJpbmcgaXMgcGFyc2VkXG4gICAgI1xuICAgIEBwYXJzZVNjYWxhcjogKHNjYWxhciwgZGVsaW1pdGVycyA9IG51bGwsIHN0cmluZ0RlbGltaXRlcnMgPSBbJ1wiJywgXCInXCJdLCBjb250ZXh0ID0gbnVsbCwgZXZhbHVhdGUgPSB0cnVlKSAtPlxuICAgICAgICB1bmxlc3MgY29udGV4dD9cbiAgICAgICAgICAgIGNvbnRleHQgPSBleGNlcHRpb25PbkludmFsaWRUeXBlOiBAc2V0dGluZ3MuZXhjZXB0aW9uT25JbnZhbGlkVHlwZSwgb2JqZWN0RGVjb2RlcjogQHNldHRpbmdzLm9iamVjdERlY29kZXIsIGk6IDBcbiAgICAgICAge2l9ID0gY29udGV4dFxuXG4gICAgICAgIGlmIHNjYWxhci5jaGFyQXQoaSkgaW4gc3RyaW5nRGVsaW1pdGVyc1xuICAgICAgICAgICAgIyBRdW90ZWQgc2NhbGFyXG4gICAgICAgICAgICBvdXRwdXQgPSBAcGFyc2VRdW90ZWRTY2FsYXIgc2NhbGFyLCBjb250ZXh0XG4gICAgICAgICAgICB7aX0gPSBjb250ZXh0XG5cbiAgICAgICAgICAgIGlmIGRlbGltaXRlcnM/XG4gICAgICAgICAgICAgICAgdG1wID0gVXRpbHMubHRyaW0gc2NhbGFyW2kuLl0sICcgJ1xuICAgICAgICAgICAgICAgIGlmIG5vdCh0bXAuY2hhckF0KDApIGluIGRlbGltaXRlcnMpXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBQYXJzZUV4Y2VwdGlvbiAnVW5leHBlY3RlZCBjaGFyYWN0ZXJzICgnK3NjYWxhcltpLi5dKycpLidcblxuICAgICAgICBlbHNlXG4gICAgICAgICAgICAjIFwibm9ybWFsXCIgc3RyaW5nXG4gICAgICAgICAgICBpZiBub3QgZGVsaW1pdGVyc1xuICAgICAgICAgICAgICAgIG91dHB1dCA9IHNjYWxhcltpLi5dXG4gICAgICAgICAgICAgICAgaSArPSBvdXRwdXQubGVuZ3RoXG5cbiAgICAgICAgICAgICAgICAjIFJlbW92ZSBjb21tZW50c1xuICAgICAgICAgICAgICAgIHN0cnBvcyA9IG91dHB1dC5pbmRleE9mICcgIydcbiAgICAgICAgICAgICAgICBpZiBzdHJwb3MgaXNudCAtMVxuICAgICAgICAgICAgICAgICAgICBvdXRwdXQgPSBVdGlscy5ydHJpbSBvdXRwdXRbMC4uLnN0cnBvc11cblxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGpvaW5lZERlbGltaXRlcnMgPSBkZWxpbWl0ZXJzLmpvaW4oJ3wnKVxuICAgICAgICAgICAgICAgIHBhdHRlcm4gPSBAUEFUVEVSTl9TQ0FMQVJfQllfREVMSU1JVEVSU1tqb2luZWREZWxpbWl0ZXJzXVxuICAgICAgICAgICAgICAgIHVubGVzcyBwYXR0ZXJuP1xuICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuID0gbmV3IFBhdHRlcm4gJ14oLis/KSgnK2pvaW5lZERlbGltaXRlcnMrJyknXG4gICAgICAgICAgICAgICAgICAgIEBQQVRURVJOX1NDQUxBUl9CWV9ERUxJTUlURVJTW2pvaW5lZERlbGltaXRlcnNdID0gcGF0dGVyblxuICAgICAgICAgICAgICAgIGlmIG1hdGNoID0gcGF0dGVybi5leGVjIHNjYWxhcltpLi5dXG4gICAgICAgICAgICAgICAgICAgIG91dHB1dCA9IG1hdGNoWzFdXG4gICAgICAgICAgICAgICAgICAgIGkgKz0gb3V0cHV0Lmxlbmd0aFxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFBhcnNlRXhjZXB0aW9uICdNYWxmb3JtZWQgaW5saW5lIFlBTUwgc3RyaW5nICgnK3NjYWxhcisnKS4nXG5cblxuICAgICAgICAgICAgaWYgZXZhbHVhdGVcbiAgICAgICAgICAgICAgICBvdXRwdXQgPSBAZXZhbHVhdGVTY2FsYXIgb3V0cHV0LCBjb250ZXh0XG5cbiAgICAgICAgY29udGV4dC5pID0gaVxuICAgICAgICByZXR1cm4gb3V0cHV0XG5cblxuICAgICMgUGFyc2VzIGEgcXVvdGVkIHNjYWxhciB0byBZQU1MLlxuICAgICNcbiAgICAjIEBwYXJhbSBbU3RyaW5nXSAgIHNjYWxhclxuICAgICMgQHBhcmFtIFtPYmplY3RdICAgY29udGV4dFxuICAgICNcbiAgICAjIEByZXR1cm4gW1N0cmluZ10gIEEgWUFNTCBzdHJpbmdcbiAgICAjXG4gICAgIyBAdGhyb3cgW1BhcnNlRXhjZXB0aW9uXSBXaGVuIG1hbGZvcm1lZCBpbmxpbmUgWUFNTCBzdHJpbmcgaXMgcGFyc2VkXG4gICAgI1xuICAgIEBwYXJzZVF1b3RlZFNjYWxhcjogKHNjYWxhciwgY29udGV4dCkgLT5cbiAgICAgICAge2l9ID0gY29udGV4dFxuXG4gICAgICAgIHVubGVzcyBtYXRjaCA9IEBQQVRURVJOX1FVT1RFRF9TQ0FMQVIuZXhlYyBzY2FsYXJbaS4uXVxuICAgICAgICAgICAgdGhyb3cgbmV3IFBhcnNlRXhjZXB0aW9uICdNYWxmb3JtZWQgaW5saW5lIFlBTUwgc3RyaW5nICgnK3NjYWxhcltpLi5dKycpLidcblxuICAgICAgICBvdXRwdXQgPSBtYXRjaFswXS5zdWJzdHIoMSwgbWF0Y2hbMF0ubGVuZ3RoIC0gMilcblxuICAgICAgICBpZiAnXCInIGlzIHNjYWxhci5jaGFyQXQoaSlcbiAgICAgICAgICAgIG91dHB1dCA9IFVuZXNjYXBlci51bmVzY2FwZURvdWJsZVF1b3RlZFN0cmluZyBvdXRwdXRcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgb3V0cHV0ID0gVW5lc2NhcGVyLnVuZXNjYXBlU2luZ2xlUXVvdGVkU3RyaW5nIG91dHB1dFxuXG4gICAgICAgIGkgKz0gbWF0Y2hbMF0ubGVuZ3RoXG5cbiAgICAgICAgY29udGV4dC5pID0gaVxuICAgICAgICByZXR1cm4gb3V0cHV0XG5cblxuICAgICMgUGFyc2VzIGEgc2VxdWVuY2UgdG8gYSBZQU1MIHN0cmluZy5cbiAgICAjXG4gICAgIyBAcGFyYW0gW1N0cmluZ10gICBzZXF1ZW5jZVxuICAgICMgQHBhcmFtIFtPYmplY3RdICAgY29udGV4dFxuICAgICNcbiAgICAjIEByZXR1cm4gW1N0cmluZ10gIEEgWUFNTCBzdHJpbmdcbiAgICAjXG4gICAgIyBAdGhyb3cgW1BhcnNlRXhjZXB0aW9uXSBXaGVuIG1hbGZvcm1lZCBpbmxpbmUgWUFNTCBzdHJpbmcgaXMgcGFyc2VkXG4gICAgI1xuICAgIEBwYXJzZVNlcXVlbmNlOiAoc2VxdWVuY2UsIGNvbnRleHQpIC0+XG4gICAgICAgIG91dHB1dCA9IFtdXG4gICAgICAgIGxlbiA9IHNlcXVlbmNlLmxlbmd0aFxuICAgICAgICB7aX0gPSBjb250ZXh0XG4gICAgICAgIGkgKz0gMVxuXG4gICAgICAgICMgW2ZvbywgYmFyLCAuLi5dXG4gICAgICAgIHdoaWxlIGkgPCBsZW5cbiAgICAgICAgICAgIGNvbnRleHQuaSA9IGlcbiAgICAgICAgICAgIHN3aXRjaCBzZXF1ZW5jZS5jaGFyQXQoaSlcbiAgICAgICAgICAgICAgICB3aGVuICdbJ1xuICAgICAgICAgICAgICAgICAgICAjIE5lc3RlZCBzZXF1ZW5jZVxuICAgICAgICAgICAgICAgICAgICBvdXRwdXQucHVzaCBAcGFyc2VTZXF1ZW5jZSBzZXF1ZW5jZSwgY29udGV4dFxuICAgICAgICAgICAgICAgICAgICB7aX0gPSBjb250ZXh0XG4gICAgICAgICAgICAgICAgd2hlbiAneydcbiAgICAgICAgICAgICAgICAgICAgIyBOZXN0ZWQgbWFwcGluZ1xuICAgICAgICAgICAgICAgICAgICBvdXRwdXQucHVzaCBAcGFyc2VNYXBwaW5nIHNlcXVlbmNlLCBjb250ZXh0XG4gICAgICAgICAgICAgICAgICAgIHtpfSA9IGNvbnRleHRcbiAgICAgICAgICAgICAgICB3aGVuICddJ1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3V0cHV0XG4gICAgICAgICAgICAgICAgd2hlbiAnLCcsICcgJywgXCJcXG5cIlxuICAgICAgICAgICAgICAgICAgICAjIERvIG5vdGhpbmdcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIGlzUXVvdGVkID0gKHNlcXVlbmNlLmNoYXJBdChpKSBpbiBbJ1wiJywgXCInXCJdKVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IEBwYXJzZVNjYWxhciBzZXF1ZW5jZSwgWycsJywgJ10nXSwgWydcIicsIFwiJ1wiXSwgY29udGV4dFxuICAgICAgICAgICAgICAgICAgICB7aX0gPSBjb250ZXh0XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgbm90KGlzUXVvdGVkKSBhbmQgdHlwZW9mKHZhbHVlKSBpcyAnc3RyaW5nJyBhbmQgKHZhbHVlLmluZGV4T2YoJzogJykgaXNudCAtMSBvciB2YWx1ZS5pbmRleE9mKFwiOlxcblwiKSBpc250IC0xKVxuICAgICAgICAgICAgICAgICAgICAgICAgIyBFbWJlZGRlZCBtYXBwaW5nP1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBAcGFyc2VNYXBwaW5nICd7Jyt2YWx1ZSsnfSdcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoIGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAjIE5vLCBpdCdzIG5vdFxuXG5cbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0LnB1c2ggdmFsdWVcblxuICAgICAgICAgICAgICAgICAgICAtLWlcblxuICAgICAgICAgICAgKytpXG5cbiAgICAgICAgdGhyb3cgbmV3IFBhcnNlRXhjZXB0aW9uICdNYWxmb3JtZWQgaW5saW5lIFlBTUwgc3RyaW5nICcrc2VxdWVuY2VcblxuXG4gICAgIyBQYXJzZXMgYSBtYXBwaW5nIHRvIGEgWUFNTCBzdHJpbmcuXG4gICAgI1xuICAgICMgQHBhcmFtIFtTdHJpbmddICAgbWFwcGluZ1xuICAgICMgQHBhcmFtIFtPYmplY3RdICAgY29udGV4dFxuICAgICNcbiAgICAjIEByZXR1cm4gW1N0cmluZ10gIEEgWUFNTCBzdHJpbmdcbiAgICAjXG4gICAgIyBAdGhyb3cgW1BhcnNlRXhjZXB0aW9uXSBXaGVuIG1hbGZvcm1lZCBpbmxpbmUgWUFNTCBzdHJpbmcgaXMgcGFyc2VkXG4gICAgI1xuICAgIEBwYXJzZU1hcHBpbmc6IChtYXBwaW5nLCBjb250ZXh0KSAtPlxuICAgICAgICBvdXRwdXQgPSB7fVxuICAgICAgICBsZW4gPSBtYXBwaW5nLmxlbmd0aFxuICAgICAgICB7aX0gPSBjb250ZXh0XG4gICAgICAgIGkgKz0gMVxuXG4gICAgICAgICMge2ZvbzogYmFyLCBiYXI6Zm9vLCAuLi59XG4gICAgICAgIHNob3VsZENvbnRpbnVlV2hpbGVMb29wID0gZmFsc2VcbiAgICAgICAgd2hpbGUgaSA8IGxlblxuICAgICAgICAgICAgY29udGV4dC5pID0gaVxuICAgICAgICAgICAgc3dpdGNoIG1hcHBpbmcuY2hhckF0KGkpXG4gICAgICAgICAgICAgICAgd2hlbiAnICcsICcsJywgXCJcXG5cIlxuICAgICAgICAgICAgICAgICAgICArK2lcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5pID0gaVxuICAgICAgICAgICAgICAgICAgICBzaG91bGRDb250aW51ZVdoaWxlTG9vcCA9IHRydWVcbiAgICAgICAgICAgICAgICB3aGVuICd9J1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3V0cHV0XG5cbiAgICAgICAgICAgIGlmIHNob3VsZENvbnRpbnVlV2hpbGVMb29wXG4gICAgICAgICAgICAgICAgc2hvdWxkQ29udGludWVXaGlsZUxvb3AgPSBmYWxzZVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlXG5cbiAgICAgICAgICAgICMgS2V5XG4gICAgICAgICAgICBrZXkgPSBAcGFyc2VTY2FsYXIgbWFwcGluZywgWyc6JywgJyAnLCBcIlxcblwiXSwgWydcIicsIFwiJ1wiXSwgY29udGV4dCwgZmFsc2VcbiAgICAgICAgICAgIHtpfSA9IGNvbnRleHRcblxuICAgICAgICAgICAgIyBWYWx1ZVxuICAgICAgICAgICAgZG9uZSA9IGZhbHNlXG5cbiAgICAgICAgICAgIHdoaWxlIGkgPCBsZW5cbiAgICAgICAgICAgICAgICBjb250ZXh0LmkgPSBpXG4gICAgICAgICAgICAgICAgc3dpdGNoIG1hcHBpbmcuY2hhckF0KGkpXG4gICAgICAgICAgICAgICAgICAgIHdoZW4gJ1snXG4gICAgICAgICAgICAgICAgICAgICAgICAjIE5lc3RlZCBzZXF1ZW5jZVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBAcGFyc2VTZXF1ZW5jZSBtYXBwaW5nLCBjb250ZXh0XG4gICAgICAgICAgICAgICAgICAgICAgICB7aX0gPSBjb250ZXh0XG4gICAgICAgICAgICAgICAgICAgICAgICAjIFNwZWM6IEtleXMgTVVTVCBiZSB1bmlxdWU7IGZpcnN0IG9uZSB3aW5zLlxuICAgICAgICAgICAgICAgICAgICAgICAgIyBQYXJzZXIgY2Fubm90IGFib3J0IHRoaXMgbWFwcGluZyBlYXJsaWVyLCBzaW5jZSBsaW5lc1xuICAgICAgICAgICAgICAgICAgICAgICAgIyBhcmUgcHJvY2Vzc2VkIHNlcXVlbnRpYWxseS5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIG91dHB1dFtrZXldID09IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dFtrZXldID0gdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbmUgPSB0cnVlXG4gICAgICAgICAgICAgICAgICAgIHdoZW4gJ3snXG4gICAgICAgICAgICAgICAgICAgICAgICAjIE5lc3RlZCBtYXBwaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IEBwYXJzZU1hcHBpbmcgbWFwcGluZywgY29udGV4dFxuICAgICAgICAgICAgICAgICAgICAgICAge2l9ID0gY29udGV4dFxuICAgICAgICAgICAgICAgICAgICAgICAgIyBTcGVjOiBLZXlzIE1VU1QgYmUgdW5pcXVlOyBmaXJzdCBvbmUgd2lucy5cbiAgICAgICAgICAgICAgICAgICAgICAgICMgUGFyc2VyIGNhbm5vdCBhYm9ydCB0aGlzIG1hcHBpbmcgZWFybGllciwgc2luY2UgbGluZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICMgYXJlIHByb2Nlc3NlZCBzZXF1ZW50aWFsbHkuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiBvdXRwdXRba2V5XSA9PSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXRba2V5XSA9IHZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICBkb25lID0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB3aGVuICc6JywgJyAnLCBcIlxcblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAjIERvIG5vdGhpbmdcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBAcGFyc2VTY2FsYXIgbWFwcGluZywgWycsJywgJ30nXSwgWydcIicsIFwiJ1wiXSwgY29udGV4dFxuICAgICAgICAgICAgICAgICAgICAgICAge2l9ID0gY29udGV4dFxuICAgICAgICAgICAgICAgICAgICAgICAgIyBTcGVjOiBLZXlzIE1VU1QgYmUgdW5pcXVlOyBmaXJzdCBvbmUgd2lucy5cbiAgICAgICAgICAgICAgICAgICAgICAgICMgUGFyc2VyIGNhbm5vdCBhYm9ydCB0aGlzIG1hcHBpbmcgZWFybGllciwgc2luY2UgbGluZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICMgYXJlIHByb2Nlc3NlZCBzZXF1ZW50aWFsbHkuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiBvdXRwdXRba2V5XSA9PSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXRba2V5XSA9IHZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICBkb25lID0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgLS1pXG5cbiAgICAgICAgICAgICAgICArK2lcblxuICAgICAgICAgICAgICAgIGlmIGRvbmVcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcblxuICAgICAgICB0aHJvdyBuZXcgUGFyc2VFeGNlcHRpb24gJ01hbGZvcm1lZCBpbmxpbmUgWUFNTCBzdHJpbmcgJyttYXBwaW5nXG5cblxuICAgICMgRXZhbHVhdGVzIHNjYWxhcnMgYW5kIHJlcGxhY2VzIG1hZ2ljIHZhbHVlcy5cbiAgICAjXG4gICAgIyBAcGFyYW0gW1N0cmluZ10gICBzY2FsYXJcbiAgICAjXG4gICAgIyBAcmV0dXJuIFtTdHJpbmddICBBIFlBTUwgc3RyaW5nXG4gICAgI1xuICAgIEBldmFsdWF0ZVNjYWxhcjogKHNjYWxhciwgY29udGV4dCkgLT5cbiAgICAgICAgc2NhbGFyID0gVXRpbHMudHJpbShzY2FsYXIpXG4gICAgICAgIHNjYWxhckxvd2VyID0gc2NhbGFyLnRvTG93ZXJDYXNlKClcblxuICAgICAgICBzd2l0Y2ggc2NhbGFyTG93ZXJcbiAgICAgICAgICAgIHdoZW4gJ251bGwnLCAnJywgJ34nXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgICAgIHdoZW4gJ3RydWUnXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgIHdoZW4gJ2ZhbHNlJ1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgd2hlbiAnLmluZidcbiAgICAgICAgICAgICAgICByZXR1cm4gSW5maW5pdHlcbiAgICAgICAgICAgIHdoZW4gJy5uYW4nXG4gICAgICAgICAgICAgICAgcmV0dXJuIE5hTlxuICAgICAgICAgICAgd2hlbiAnLS5pbmYnXG4gICAgICAgICAgICAgICAgcmV0dXJuIEluZmluaXR5XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgZmlyc3RDaGFyID0gc2NhbGFyTG93ZXIuY2hhckF0KDApXG4gICAgICAgICAgICAgICAgc3dpdGNoIGZpcnN0Q2hhclxuICAgICAgICAgICAgICAgICAgICB3aGVuICchJ1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3RTcGFjZSA9IHNjYWxhci5pbmRleE9mKCcgJylcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIGZpcnN0U3BhY2UgaXMgLTFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJzdFdvcmQgPSBzY2FsYXJMb3dlclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0V29yZCA9IHNjYWxhckxvd2VyWzAuLi5maXJzdFNwYWNlXVxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIGZpcnN0V29yZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoZW4gJyEnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIGZpcnN0U3BhY2UgaXNudCAtMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50IEBwYXJzZVNjYWxhcihzY2FsYXJbMi4uXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGVuICchc3RyJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gVXRpbHMubHRyaW0gc2NhbGFyWzQuLl1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGVuICchIXN0cidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFV0aWxzLmx0cmltIHNjYWxhcls1Li5dXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hlbiAnISFpbnQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZUludChAcGFyc2VTY2FsYXIoc2NhbGFyWzUuLl0pKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoZW4gJyEhYm9vbCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFV0aWxzLnBhcnNlQm9vbGVhbihAcGFyc2VTY2FsYXIoc2NhbGFyWzYuLl0pLCBmYWxzZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGVuICchIWZsb2F0J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VGbG9hdChAcGFyc2VTY2FsYXIoc2NhbGFyWzcuLl0pKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoZW4gJyEhdGltZXN0YW1wJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gVXRpbHMuc3RyaW5nVG9EYXRlKFV0aWxzLmx0cmltKHNjYWxhclsxMS4uXSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bmxlc3MgY29udGV4dD9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQgPSBleGNlcHRpb25PbkludmFsaWRUeXBlOiBAc2V0dGluZ3MuZXhjZXB0aW9uT25JbnZhbGlkVHlwZSwgb2JqZWN0RGVjb2RlcjogQHNldHRpbmdzLm9iamVjdERlY29kZXIsIGk6IDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge29iamVjdERlY29kZXIsIGV4Y2VwdGlvbk9uSW52YWxpZFR5cGV9ID0gY29udGV4dFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIG9iamVjdERlY29kZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICMgSWYgb2JqZWN0RGVjb2RlciBmdW5jdGlvbiBpcyBnaXZlbiwgd2UgY2FuIGRvIGN1c3RvbSBkZWNvZGluZyBvZiBjdXN0b20gdHlwZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyaW1tZWRTY2FsYXIgPSBVdGlscy5ydHJpbSBzY2FsYXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0U3BhY2UgPSB0cmltbWVkU2NhbGFyLmluZGV4T2YoJyAnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgZmlyc3RTcGFjZSBpcyAtMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvYmplY3REZWNvZGVyIHRyaW1tZWRTY2FsYXIsIG51bGxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJWYWx1ZSA9IFV0aWxzLmx0cmltIHRyaW1tZWRTY2FsYXJbZmlyc3RTcGFjZSsxLi5dXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5sZXNzIHN1YlZhbHVlLmxlbmd0aCA+IDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViVmFsdWUgPSBudWxsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9iamVjdERlY29kZXIgdHJpbW1lZFNjYWxhclswLi4uZmlyc3RTcGFjZV0sIHN1YlZhbHVlXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgZXhjZXB0aW9uT25JbnZhbGlkVHlwZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFBhcnNlRXhjZXB0aW9uICdDdXN0b20gb2JqZWN0IHN1cHBvcnQgd2hlbiBwYXJzaW5nIGEgWUFNTCBmaWxlIGhhcyBiZWVuIGRpc2FibGVkLidcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICAgICAgICAgICAgICB3aGVuICcwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgJzB4JyBpcyBzY2FsYXJbMC4uLjJdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFV0aWxzLmhleERlYyBzY2FsYXJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgVXRpbHMuaXNEaWdpdHMgc2NhbGFyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFV0aWxzLm9jdERlYyBzY2FsYXJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgVXRpbHMuaXNOdW1lcmljIHNjYWxhclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZUZsb2F0IHNjYWxhclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzY2FsYXJcbiAgICAgICAgICAgICAgICAgICAgd2hlbiAnKydcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIFV0aWxzLmlzRGlnaXRzIHNjYWxhclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhdyA9IHNjYWxhclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc3QgPSBwYXJzZUludChyYXcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgcmF3IGlzIFN0cmluZyhjYXN0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FzdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJhd1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiBVdGlscy5pc051bWVyaWMgc2NhbGFyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQgc2NhbGFyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIEBQQVRURVJOX1RIT1VTQU5EX05VTUVSSUNfU0NBTEFSLnRlc3Qgc2NhbGFyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQoc2NhbGFyLnJlcGxhY2UoJywnLCAnJykpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2NhbGFyXG4gICAgICAgICAgICAgICAgICAgIHdoZW4gJy0nXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiBVdGlscy5pc0RpZ2l0cyhzY2FsYXJbMS4uXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAnMCcgaXMgc2NhbGFyLmNoYXJBdCgxKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gLVV0aWxzLm9jdERlYyhzY2FsYXJbMS4uXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhdyA9IHNjYWxhclsxLi5dXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc3QgPSBwYXJzZUludChyYXcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIHJhdyBpcyBTdHJpbmcoY2FzdClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAtY2FzdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gLXJhd1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiBVdGlscy5pc051bWVyaWMgc2NhbGFyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQgc2NhbGFyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIEBQQVRURVJOX1RIT1VTQU5EX05VTUVSSUNfU0NBTEFSLnRlc3Qgc2NhbGFyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQoc2NhbGFyLnJlcGxhY2UoJywnLCAnJykpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2NhbGFyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIGRhdGUgPSBVdGlscy5zdHJpbmdUb0RhdGUoc2NhbGFyKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRlXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIFV0aWxzLmlzTnVtZXJpYyhzY2FsYXIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQgc2NhbGFyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIEBQQVRURVJOX1RIT1VTQU5EX05VTUVSSUNfU0NBTEFSLnRlc3Qgc2NhbGFyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQoc2NhbGFyLnJlcGxhY2UoJywnLCAnJykpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2NhbGFyXG5cbm1vZHVsZS5leHBvcnRzID0gSW5saW5lXG4iLCJcbklubGluZSAgICAgICAgICA9IHJlcXVpcmUgJy4vSW5saW5lJ1xuUGF0dGVybiAgICAgICAgID0gcmVxdWlyZSAnLi9QYXR0ZXJuJ1xuVXRpbHMgICAgICAgICAgID0gcmVxdWlyZSAnLi9VdGlscydcblBhcnNlRXhjZXB0aW9uICA9IHJlcXVpcmUgJy4vRXhjZXB0aW9uL1BhcnNlRXhjZXB0aW9uJ1xuXG4jIFBhcnNlciBwYXJzZXMgWUFNTCBzdHJpbmdzIHRvIGNvbnZlcnQgdGhlbSB0byBKYXZhU2NyaXB0IG9iamVjdHMuXG4jXG5jbGFzcyBQYXJzZXJcblxuICAgICMgUHJlLWNvbXBpbGVkIHBhdHRlcm5zXG4gICAgI1xuICAgIFBBVFRFUk5fRk9MREVEX1NDQUxBUl9BTEw6ICAgICAgICAgICAgICBuZXcgUGF0dGVybiAnXig/Oig/PHR5cGU+IVteXFxcXHw+XSopXFxcXHMrKT8oPzxzZXBhcmF0b3I+XFxcXHx8PikoPzxtb2RpZmllcnM+XFxcXCt8XFxcXC18XFxcXGQrfFxcXFwrXFxcXGQrfFxcXFwtXFxcXGQrfFxcXFxkK1xcXFwrfFxcXFxkK1xcXFwtKT8oPzxjb21tZW50cz4gKyMuKik/JCdcbiAgICBQQVRURVJOX0ZPTERFRF9TQ0FMQVJfRU5EOiAgICAgICAgICAgICAgbmV3IFBhdHRlcm4gJyg/PHNlcGFyYXRvcj5cXFxcfHw+KSg/PG1vZGlmaWVycz5cXFxcK3xcXFxcLXxcXFxcZCt8XFxcXCtcXFxcZCt8XFxcXC1cXFxcZCt8XFxcXGQrXFxcXCt8XFxcXGQrXFxcXC0pPyg/PGNvbW1lbnRzPiArIy4qKT8kJ1xuICAgIFBBVFRFUk5fU0VRVUVOQ0VfSVRFTTogICAgICAgICAgICAgICAgICBuZXcgUGF0dGVybiAnXlxcXFwtKCg/PGxlYWRzcGFjZXM+XFxcXHMrKSg/PHZhbHVlPi4rPykpP1xcXFxzKiQnXG4gICAgUEFUVEVSTl9BTkNIT1JfVkFMVUU6ICAgICAgICAgICAgICAgICAgIG5ldyBQYXR0ZXJuICdeJig/PHJlZj5bXiBdKykgKig/PHZhbHVlPi4qKSdcbiAgICBQQVRURVJOX0NPTVBBQ1RfTk9UQVRJT046ICAgICAgICAgICAgICAgbmV3IFBhdHRlcm4gJ14oPzxrZXk+JytJbmxpbmUuUkVHRVhfUVVPVEVEX1NUUklORysnfFteIFxcJ1wiXFxcXHtcXFxcW10uKj8pICpcXFxcOihcXFxccysoPzx2YWx1ZT4uKz8pKT9cXFxccyokJ1xuICAgIFBBVFRFUk5fTUFQUElOR19JVEVNOiAgICAgICAgICAgICAgICAgICBuZXcgUGF0dGVybiAnXig/PGtleT4nK0lubGluZS5SRUdFWF9RVU9URURfU1RSSU5HKyd8W14gXFwnXCJcXFxcW1xcXFx7XS4qPykgKlxcXFw6KFxcXFxzKyg/PHZhbHVlPi4rPykpP1xcXFxzKiQnXG4gICAgUEFUVEVSTl9ERUNJTUFMOiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBQYXR0ZXJuICdcXFxcZCsnXG4gICAgUEFUVEVSTl9JTkRFTlRfU1BBQ0VTOiAgICAgICAgICAgICAgICAgIG5ldyBQYXR0ZXJuICdeICsnXG4gICAgUEFUVEVSTl9UUkFJTElOR19MSU5FUzogICAgICAgICAgICAgICAgIG5ldyBQYXR0ZXJuICcoXFxuKikkJ1xuICAgIFBBVFRFUk5fWUFNTF9IRUFERVI6ICAgICAgICAgICAgICAgICAgICBuZXcgUGF0dGVybiAnXlxcXFwlWUFNTFs6IF1bXFxcXGRcXFxcLl0rLipcXG4nXG4gICAgUEFUVEVSTl9MRUFESU5HX0NPTU1FTlRTOiAgICAgICAgICAgICAgIG5ldyBQYXR0ZXJuICdeKFxcXFwjLio/XFxuKSsnXG4gICAgUEFUVEVSTl9ET0NVTUVOVF9NQVJLRVJfU1RBUlQ6ICAgICAgICAgIG5ldyBQYXR0ZXJuICdeXFxcXC1cXFxcLVxcXFwtLio/XFxuJ1xuICAgIFBBVFRFUk5fRE9DVU1FTlRfTUFSS0VSX0VORDogICAgICAgICAgICBuZXcgUGF0dGVybiAnXlxcXFwuXFxcXC5cXFxcLlxcXFxzKiQnXG4gICAgUEFUVEVSTl9GT0xERURfU0NBTEFSX0JZX0lOREVOVEFUSU9OOiAgIHt9XG5cbiAgICAjIENvbnRleHQgdHlwZXNcbiAgICAjXG4gICAgQ09OVEVYVF9OT05FOiAgICAgICAwXG4gICAgQ09OVEVYVF9TRVFVRU5DRTogICAxXG4gICAgQ09OVEVYVF9NQVBQSU5HOiAgICAyXG5cblxuICAgICMgQ29uc3RydWN0b3JcbiAgICAjXG4gICAgIyBAcGFyYW0gW0ludGVnZXJdICBvZmZzZXQgIFRoZSBvZmZzZXQgb2YgWUFNTCBkb2N1bWVudCAodXNlZCBmb3IgbGluZSBudW1iZXJzIGluIGVycm9yIG1lc3NhZ2VzKVxuICAgICNcbiAgICBjb25zdHJ1Y3RvcjogKEBvZmZzZXQgPSAwKSAtPlxuICAgICAgICBAbGluZXMgICAgICAgICAgPSBbXVxuICAgICAgICBAY3VycmVudExpbmVOYiAgPSAtMVxuICAgICAgICBAY3VycmVudExpbmUgICAgPSAnJ1xuICAgICAgICBAcmVmcyAgICAgICAgICAgPSB7fVxuXG5cbiAgICAjIFBhcnNlcyBhIFlBTUwgc3RyaW5nIHRvIGEgSmF2YVNjcmlwdCB2YWx1ZS5cbiAgICAjXG4gICAgIyBAcGFyYW0gW1N0cmluZ10gICB2YWx1ZSAgICAgICAgICAgICAgICAgICBBIFlBTUwgc3RyaW5nXG4gICAgIyBAcGFyYW0gW0Jvb2xlYW5dICBleGNlcHRpb25PbkludmFsaWRUeXBlICB0cnVlIGlmIGFuIGV4Y2VwdGlvbiBtdXN0IGJlIHRocm93biBvbiBpbnZhbGlkIHR5cGVzIChhIEphdmFTY3JpcHQgcmVzb3VyY2Ugb3Igb2JqZWN0KSwgZmFsc2Ugb3RoZXJ3aXNlXG4gICAgIyBAcGFyYW0gW0Z1bmN0aW9uXSBvYmplY3REZWNvZGVyICAgICAgICAgICBBIGZ1bmN0aW9uIHRvIGRlc2VyaWFsaXplIGN1c3RvbSBvYmplY3RzLCBudWxsIG90aGVyd2lzZVxuICAgICNcbiAgICAjIEByZXR1cm4gW09iamVjdF0gIEEgSmF2YVNjcmlwdCB2YWx1ZVxuICAgICNcbiAgICAjIEB0aHJvdyBbUGFyc2VFeGNlcHRpb25dIElmIHRoZSBZQU1MIGlzIG5vdCB2YWxpZFxuICAgICNcbiAgICBwYXJzZTogKHZhbHVlLCBleGNlcHRpb25PbkludmFsaWRUeXBlID0gZmFsc2UsIG9iamVjdERlY29kZXIgPSBudWxsKSAtPlxuICAgICAgICBAY3VycmVudExpbmVOYiA9IC0xXG4gICAgICAgIEBjdXJyZW50TGluZSA9ICcnXG4gICAgICAgIEBsaW5lcyA9IEBjbGVhbnVwKHZhbHVlKS5zcGxpdCBcIlxcblwiXG5cbiAgICAgICAgZGF0YSA9IG51bGxcbiAgICAgICAgY29udGV4dCA9IEBDT05URVhUX05PTkVcbiAgICAgICAgYWxsb3dPdmVyd3JpdGUgPSBmYWxzZVxuICAgICAgICB3aGlsZSBAbW92ZVRvTmV4dExpbmUoKVxuICAgICAgICAgICAgaWYgQGlzQ3VycmVudExpbmVFbXB0eSgpXG4gICAgICAgICAgICAgICAgY29udGludWVcblxuICAgICAgICAgICAgIyBUYWI/XG4gICAgICAgICAgICBpZiBcIlxcdFwiIGlzIEBjdXJyZW50TGluZVswXVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBQYXJzZUV4Y2VwdGlvbiAnQSBZQU1MIGZpbGUgY2Fubm90IGNvbnRhaW4gdGFicyBhcyBpbmRlbnRhdGlvbi4nLCBAZ2V0UmVhbEN1cnJlbnRMaW5lTmIoKSArIDEsIEBjdXJyZW50TGluZVxuXG4gICAgICAgICAgICBpc1JlZiA9IG1lcmdlTm9kZSA9IGZhbHNlXG4gICAgICAgICAgICBpZiB2YWx1ZXMgPSBAUEFUVEVSTl9TRVFVRU5DRV9JVEVNLmV4ZWMgQGN1cnJlbnRMaW5lXG4gICAgICAgICAgICAgICAgaWYgQENPTlRFWFRfTUFQUElORyBpcyBjb250ZXh0XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBQYXJzZUV4Y2VwdGlvbiAnWW91IGNhbm5vdCBkZWZpbmUgYSBzZXF1ZW5jZSBpdGVtIHdoZW4gaW4gYSBtYXBwaW5nJ1xuICAgICAgICAgICAgICAgIGNvbnRleHQgPSBAQ09OVEVYVF9TRVFVRU5DRVxuICAgICAgICAgICAgICAgIGRhdGEgPz0gW11cblxuICAgICAgICAgICAgICAgIGlmIHZhbHVlcy52YWx1ZT8gYW5kIG1hdGNoZXMgPSBAUEFUVEVSTl9BTkNIT1JfVkFMVUUuZXhlYyB2YWx1ZXMudmFsdWVcbiAgICAgICAgICAgICAgICAgICAgaXNSZWYgPSBtYXRjaGVzLnJlZlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZXMudmFsdWUgPSBtYXRjaGVzLnZhbHVlXG5cbiAgICAgICAgICAgICAgICAjIEFycmF5XG4gICAgICAgICAgICAgICAgaWYgbm90KHZhbHVlcy52YWx1ZT8pIG9yICcnIGlzIFV0aWxzLnRyaW0odmFsdWVzLnZhbHVlLCAnICcpIG9yIFV0aWxzLmx0cmltKHZhbHVlcy52YWx1ZSwgJyAnKS5pbmRleE9mKCcjJykgaXMgMFxuICAgICAgICAgICAgICAgICAgICBpZiBAY3VycmVudExpbmVOYiA8IEBsaW5lcy5sZW5ndGggLSAxIGFuZCBub3QgQGlzTmV4dExpbmVVbkluZGVudGVkQ29sbGVjdGlvbigpXG4gICAgICAgICAgICAgICAgICAgICAgICBjID0gQGdldFJlYWxDdXJyZW50TGluZU5iKCkgKyAxXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJzZXIgPSBuZXcgUGFyc2VyIGNcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlci5yZWZzID0gQHJlZnNcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEucHVzaCBwYXJzZXIucGFyc2UoQGdldE5leHRFbWJlZEJsb2NrKG51bGwsIHRydWUpLCBleGNlcHRpb25PbkludmFsaWRUeXBlLCBvYmplY3REZWNvZGVyKVxuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLnB1c2ggbnVsbFxuXG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBpZiB2YWx1ZXMubGVhZHNwYWNlcz8ubGVuZ3RoIGFuZCBtYXRjaGVzID0gQFBBVFRFUk5fQ09NUEFDVF9OT1RBVElPTi5leGVjIHZhbHVlcy52YWx1ZVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAjIFRoaXMgaXMgYSBjb21wYWN0IG5vdGF0aW9uIGVsZW1lbnQsIGFkZCB0byBuZXh0IGJsb2NrIGFuZCBwYXJzZVxuICAgICAgICAgICAgICAgICAgICAgICAgYyA9IEBnZXRSZWFsQ3VycmVudExpbmVOYigpXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJzZXIgPSBuZXcgUGFyc2VyIGNcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlci5yZWZzID0gQHJlZnNcblxuICAgICAgICAgICAgICAgICAgICAgICAgYmxvY2sgPSB2YWx1ZXMudmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGVudCA9IEBnZXRDdXJyZW50TGluZUluZGVudGF0aW9uKClcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIEBpc05leHRMaW5lSW5kZW50ZWQoZmFsc2UpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmxvY2sgKz0gXCJcXG5cIitAZ2V0TmV4dEVtYmVkQmxvY2soaW5kZW50ICsgdmFsdWVzLmxlYWRzcGFjZXMubGVuZ3RoICsgMSwgdHJ1ZSlcblxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5wdXNoIHBhcnNlci5wYXJzZSBibG9jaywgZXhjZXB0aW9uT25JbnZhbGlkVHlwZSwgb2JqZWN0RGVjb2RlclxuXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEucHVzaCBAcGFyc2VWYWx1ZSB2YWx1ZXMudmFsdWUsIGV4Y2VwdGlvbk9uSW52YWxpZFR5cGUsIG9iamVjdERlY29kZXJcblxuICAgICAgICAgICAgZWxzZSBpZiAodmFsdWVzID0gQFBBVFRFUk5fTUFQUElOR19JVEVNLmV4ZWMgQGN1cnJlbnRMaW5lKSBhbmQgdmFsdWVzLmtleS5pbmRleE9mKCcgIycpIGlzIC0xXG4gICAgICAgICAgICAgICAgaWYgQENPTlRFWFRfU0VRVUVOQ0UgaXMgY29udGV4dFxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUGFyc2VFeGNlcHRpb24gJ1lvdSBjYW5ub3QgZGVmaW5lIGEgbWFwcGluZyBpdGVtIHdoZW4gaW4gYSBzZXF1ZW5jZSdcbiAgICAgICAgICAgICAgICBjb250ZXh0ID0gQENPTlRFWFRfTUFQUElOR1xuICAgICAgICAgICAgICAgIGRhdGEgPz0ge31cblxuICAgICAgICAgICAgICAgICMgRm9yY2UgY29ycmVjdCBzZXR0aW5nc1xuICAgICAgICAgICAgICAgIElubGluZS5jb25maWd1cmUgZXhjZXB0aW9uT25JbnZhbGlkVHlwZSwgb2JqZWN0RGVjb2RlclxuICAgICAgICAgICAgICAgIHRyeVxuICAgICAgICAgICAgICAgICAgICBrZXkgPSBJbmxpbmUucGFyc2VTY2FsYXIgdmFsdWVzLmtleVxuICAgICAgICAgICAgICAgIGNhdGNoIGVcbiAgICAgICAgICAgICAgICAgICAgZS5wYXJzZWRMaW5lID0gQGdldFJlYWxDdXJyZW50TGluZU5iKCkgKyAxXG4gICAgICAgICAgICAgICAgICAgIGUuc25pcHBldCA9IEBjdXJyZW50TGluZVxuXG4gICAgICAgICAgICAgICAgICAgIHRocm93IGVcblxuICAgICAgICAgICAgICAgIGlmICc8PCcgaXMga2V5XG4gICAgICAgICAgICAgICAgICAgIG1lcmdlTm9kZSA9IHRydWVcbiAgICAgICAgICAgICAgICAgICAgYWxsb3dPdmVyd3JpdGUgPSB0cnVlXG4gICAgICAgICAgICAgICAgICAgIGlmIHZhbHVlcy52YWx1ZT8uaW5kZXhPZignKicpIGlzIDBcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZk5hbWUgPSB2YWx1ZXMudmFsdWVbMS4uXVxuICAgICAgICAgICAgICAgICAgICAgICAgdW5sZXNzIEByZWZzW3JlZk5hbWVdP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBQYXJzZUV4Y2VwdGlvbiAnUmVmZXJlbmNlIFwiJytyZWZOYW1lKydcIiBkb2VzIG5vdCBleGlzdC4nLCBAZ2V0UmVhbEN1cnJlbnRMaW5lTmIoKSArIDEsIEBjdXJyZW50TGluZVxuXG4gICAgICAgICAgICAgICAgICAgICAgICByZWZWYWx1ZSA9IEByZWZzW3JlZk5hbWVdXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIHR5cGVvZiByZWZWYWx1ZSBpc250ICdvYmplY3QnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFBhcnNlRXhjZXB0aW9uICdZQU1MIG1lcmdlIGtleXMgdXNlZCB3aXRoIGEgc2NhbGFyIHZhbHVlIGluc3RlYWQgb2YgYW4gb2JqZWN0LicsIEBnZXRSZWFsQ3VycmVudExpbmVOYigpICsgMSwgQGN1cnJlbnRMaW5lXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIHJlZlZhbHVlIGluc3RhbmNlb2YgQXJyYXlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAjIE1lcmdlIGFycmF5IHdpdGggb2JqZWN0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIHZhbHVlLCBpIGluIHJlZlZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFbU3RyaW5nKGkpXSA/PSB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICMgTWVyZ2Ugb2JqZWN0c1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciBrZXksIHZhbHVlIG9mIHJlZlZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFba2V5XSA/PSB2YWx1ZVxuXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIHZhbHVlcy52YWx1ZT8gYW5kIHZhbHVlcy52YWx1ZSBpc250ICcnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZXMudmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IEBnZXROZXh0RW1iZWRCbG9jaygpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGMgPSBAZ2V0UmVhbEN1cnJlbnRMaW5lTmIoKSArIDFcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlciA9IG5ldyBQYXJzZXIgY1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VyLnJlZnMgPSBAcmVmc1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VkID0gcGFyc2VyLnBhcnNlIHZhbHVlLCBleGNlcHRpb25PbkludmFsaWRUeXBlXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHVubGVzcyB0eXBlb2YgcGFyc2VkIGlzICdvYmplY3QnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFBhcnNlRXhjZXB0aW9uICdZQU1MIG1lcmdlIGtleXMgdXNlZCB3aXRoIGEgc2NhbGFyIHZhbHVlIGluc3RlYWQgb2YgYW4gb2JqZWN0LicsIEBnZXRSZWFsQ3VycmVudExpbmVOYigpICsgMSwgQGN1cnJlbnRMaW5lXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIHBhcnNlZCBpbnN0YW5jZW9mIEFycmF5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBJZiB0aGUgdmFsdWUgYXNzb2NpYXRlZCB3aXRoIHRoZSBtZXJnZSBrZXkgaXMgYSBzZXF1ZW5jZSwgdGhlbiB0aGlzIHNlcXVlbmNlIGlzIGV4cGVjdGVkIHRvIGNvbnRhaW4gbWFwcGluZyBub2Rlc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICMgYW5kIGVhY2ggb2YgdGhlc2Ugbm9kZXMgaXMgbWVyZ2VkIGluIHR1cm4gYWNjb3JkaW5nIHRvIGl0cyBvcmRlciBpbiB0aGUgc2VxdWVuY2UuIEtleXMgaW4gbWFwcGluZyBub2RlcyBlYXJsaWVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBpbiB0aGUgc2VxdWVuY2Ugb3ZlcnJpZGUga2V5cyBzcGVjaWZpZWQgaW4gbGF0ZXIgbWFwcGluZyBub2Rlcy5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgcGFyc2VkSXRlbSBpbiBwYXJzZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5sZXNzIHR5cGVvZiBwYXJzZWRJdGVtIGlzICdvYmplY3QnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUGFyc2VFeGNlcHRpb24gJ01lcmdlIGl0ZW1zIG11c3QgYmUgb2JqZWN0cy4nLCBAZ2V0UmVhbEN1cnJlbnRMaW5lTmIoKSArIDEsIHBhcnNlZEl0ZW1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiBwYXJzZWRJdGVtIGluc3RhbmNlb2YgQXJyYXlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICMgTWVyZ2UgYXJyYXkgd2l0aCBvYmplY3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciB2YWx1ZSwgaSBpbiBwYXJzZWRJdGVtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgayA9IFN0cmluZyhpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVubGVzcyBkYXRhLmhhc093blByb3BlcnR5KGspXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFba10gPSB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAjIE1lcmdlIG9iamVjdHNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciBrZXksIHZhbHVlIG9mIHBhcnNlZEl0ZW1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bmxlc3MgZGF0YS5oYXNPd25Qcm9wZXJ0eShrZXkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFba2V5XSA9IHZhbHVlXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAjIElmIHRoZSB2YWx1ZSBhc3NvY2lhdGVkIHdpdGggdGhlIGtleSBpcyBhIHNpbmdsZSBtYXBwaW5nIG5vZGUsIGVhY2ggb2YgaXRzIGtleS92YWx1ZSBwYWlycyBpcyBpbnNlcnRlZCBpbnRvIHRoZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICMgY3VycmVudCBtYXBwaW5nLCB1bmxlc3MgdGhlIGtleSBhbHJlYWR5IGV4aXN0cyBpbiBpdC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3Iga2V5LCB2YWx1ZSBvZiBwYXJzZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5sZXNzIGRhdGEuaGFzT3duUHJvcGVydHkoa2V5KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVtrZXldID0gdmFsdWVcblxuICAgICAgICAgICAgICAgIGVsc2UgaWYgdmFsdWVzLnZhbHVlPyBhbmQgbWF0Y2hlcyA9IEBQQVRURVJOX0FOQ0hPUl9WQUxVRS5leGVjIHZhbHVlcy52YWx1ZVxuICAgICAgICAgICAgICAgICAgICBpc1JlZiA9IG1hdGNoZXMucmVmXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlcy52YWx1ZSA9IG1hdGNoZXMudmFsdWVcblxuXG4gICAgICAgICAgICAgICAgaWYgbWVyZ2VOb2RlXG4gICAgICAgICAgICAgICAgICAgICMgTWVyZ2Uga2V5c1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgbm90KHZhbHVlcy52YWx1ZT8pIG9yICcnIGlzIFV0aWxzLnRyaW0odmFsdWVzLnZhbHVlLCAnICcpIG9yIFV0aWxzLmx0cmltKHZhbHVlcy52YWx1ZSwgJyAnKS5pbmRleE9mKCcjJykgaXMgMFxuICAgICAgICAgICAgICAgICAgICAjIEhhc2hcbiAgICAgICAgICAgICAgICAgICAgIyBpZiBuZXh0IGxpbmUgaXMgbGVzcyBpbmRlbnRlZCBvciBlcXVhbCwgdGhlbiBpdCBtZWFucyB0aGF0IHRoZSBjdXJyZW50IHZhbHVlIGlzIG51bGxcbiAgICAgICAgICAgICAgICAgICAgaWYgbm90KEBpc05leHRMaW5lSW5kZW50ZWQoKSkgYW5kIG5vdChAaXNOZXh0TGluZVVuSW5kZW50ZWRDb2xsZWN0aW9uKCkpXG4gICAgICAgICAgICAgICAgICAgICAgICAjIFNwZWM6IEtleXMgTVVTVCBiZSB1bmlxdWU7IGZpcnN0IG9uZSB3aW5zLlxuICAgICAgICAgICAgICAgICAgICAgICAgIyBCdXQgb3ZlcndyaXRpbmcgaXMgYWxsb3dlZCB3aGVuIGEgbWVyZ2Ugbm9kZSBpcyB1c2VkIGluIGN1cnJlbnQgYmxvY2suXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiBhbGxvd092ZXJ3cml0ZSBvciBkYXRhW2tleV0gaXMgdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVtrZXldID0gbnVsbFxuXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIGMgPSBAZ2V0UmVhbEN1cnJlbnRMaW5lTmIoKSArIDFcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlciA9IG5ldyBQYXJzZXIgY1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VyLnJlZnMgPSBAcmVmc1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsID0gcGFyc2VyLnBhcnNlIEBnZXROZXh0RW1iZWRCbG9jaygpLCBleGNlcHRpb25PbkludmFsaWRUeXBlLCBvYmplY3REZWNvZGVyXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICMgU3BlYzogS2V5cyBNVVNUIGJlIHVuaXF1ZTsgZmlyc3Qgb25lIHdpbnMuXG4gICAgICAgICAgICAgICAgICAgICAgICAjIEJ1dCBvdmVyd3JpdGluZyBpcyBhbGxvd2VkIHdoZW4gYSBtZXJnZSBub2RlIGlzIHVzZWQgaW4gY3VycmVudCBibG9jay5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIGFsbG93T3ZlcndyaXRlIG9yIGRhdGFba2V5XSBpcyB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhW2tleV0gPSB2YWxcblxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgdmFsID0gQHBhcnNlVmFsdWUgdmFsdWVzLnZhbHVlLCBleGNlcHRpb25PbkludmFsaWRUeXBlLCBvYmplY3REZWNvZGVyXG5cbiAgICAgICAgICAgICAgICAgICAgIyBTcGVjOiBLZXlzIE1VU1QgYmUgdW5pcXVlOyBmaXJzdCBvbmUgd2lucy5cbiAgICAgICAgICAgICAgICAgICAgIyBCdXQgb3ZlcndyaXRpbmcgaXMgYWxsb3dlZCB3aGVuIGEgbWVyZ2Ugbm9kZSBpcyB1c2VkIGluIGN1cnJlbnQgYmxvY2suXG4gICAgICAgICAgICAgICAgICAgIGlmIGFsbG93T3ZlcndyaXRlIG9yIGRhdGFba2V5XSBpcyB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFba2V5XSA9IHZhbFxuXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgIyAxLWxpbmVyIG9wdGlvbmFsbHkgZm9sbG93ZWQgYnkgbmV3bGluZVxuICAgICAgICAgICAgICAgIGxpbmVDb3VudCA9IEBsaW5lcy5sZW5ndGhcbiAgICAgICAgICAgICAgICBpZiAxIGlzIGxpbmVDb3VudCBvciAoMiBpcyBsaW5lQ291bnQgYW5kIFV0aWxzLmlzRW1wdHkoQGxpbmVzWzFdKSlcbiAgICAgICAgICAgICAgICAgICAgdHJ5XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IElubGluZS5wYXJzZSBAbGluZXNbMF0sIGV4Y2VwdGlvbk9uSW52YWxpZFR5cGUsIG9iamVjdERlY29kZXJcbiAgICAgICAgICAgICAgICAgICAgY2F0Y2ggZVxuICAgICAgICAgICAgICAgICAgICAgICAgZS5wYXJzZWRMaW5lID0gQGdldFJlYWxDdXJyZW50TGluZU5iKCkgKyAxXG4gICAgICAgICAgICAgICAgICAgICAgICBlLnNuaXBwZXQgPSBAY3VycmVudExpbmVcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgZVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIHR5cGVvZiB2YWx1ZSBpcyAnb2JqZWN0J1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgdmFsdWUgaW5zdGFuY2VvZiBBcnJheVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0ID0gdmFsdWVbMF1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3Iga2V5IG9mIHZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0ID0gdmFsdWVba2V5XVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiB0eXBlb2YgZmlyc3QgaXMgJ3N0cmluZycgYW5kIGZpcnN0LmluZGV4T2YoJyonKSBpcyAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSA9IFtdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIGFsaWFzIGluIHZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEucHVzaCBAcmVmc1thbGlhc1sxLi5dXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gZGF0YVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZVxuXG4gICAgICAgICAgICAgICAgZWxzZSBpZiBVdGlscy5sdHJpbSh2YWx1ZSkuY2hhckF0KDApIGluIFsnWycsICd7J11cbiAgICAgICAgICAgICAgICAgICAgdHJ5XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gSW5saW5lLnBhcnNlIHZhbHVlLCBleGNlcHRpb25PbkludmFsaWRUeXBlLCBvYmplY3REZWNvZGVyXG4gICAgICAgICAgICAgICAgICAgIGNhdGNoIGVcbiAgICAgICAgICAgICAgICAgICAgICAgIGUucGFyc2VkTGluZSA9IEBnZXRSZWFsQ3VycmVudExpbmVOYigpICsgMVxuICAgICAgICAgICAgICAgICAgICAgICAgZS5zbmlwcGV0ID0gQGN1cnJlbnRMaW5lXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IGVcblxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBQYXJzZUV4Y2VwdGlvbiAnVW5hYmxlIHRvIHBhcnNlLicsIEBnZXRSZWFsQ3VycmVudExpbmVOYigpICsgMSwgQGN1cnJlbnRMaW5lXG5cbiAgICAgICAgICAgIGlmIGlzUmVmXG4gICAgICAgICAgICAgICAgaWYgZGF0YSBpbnN0YW5jZW9mIEFycmF5XG4gICAgICAgICAgICAgICAgICAgIEByZWZzW2lzUmVmXSA9IGRhdGFbZGF0YS5sZW5ndGgtMV1cbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIGxhc3RLZXkgPSBudWxsXG4gICAgICAgICAgICAgICAgICAgIGZvciBrZXkgb2YgZGF0YVxuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdEtleSA9IGtleVxuICAgICAgICAgICAgICAgICAgICBAcmVmc1tpc1JlZl0gPSBkYXRhW2xhc3RLZXldXG5cblxuICAgICAgICBpZiBVdGlscy5pc0VtcHR5KGRhdGEpXG4gICAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gZGF0YVxuXG5cblxuICAgICMgUmV0dXJucyB0aGUgY3VycmVudCBsaW5lIG51bWJlciAodGFrZXMgdGhlIG9mZnNldCBpbnRvIGFjY291bnQpLlxuICAgICNcbiAgICAjIEByZXR1cm4gW0ludGVnZXJdICAgICBUaGUgY3VycmVudCBsaW5lIG51bWJlclxuICAgICNcbiAgICBnZXRSZWFsQ3VycmVudExpbmVOYjogLT5cbiAgICAgICAgcmV0dXJuIEBjdXJyZW50TGluZU5iICsgQG9mZnNldFxuXG5cbiAgICAjIFJldHVybnMgdGhlIGN1cnJlbnQgbGluZSBpbmRlbnRhdGlvbi5cbiAgICAjXG4gICAgIyBAcmV0dXJuIFtJbnRlZ2VyXSAgICAgVGhlIGN1cnJlbnQgbGluZSBpbmRlbnRhdGlvblxuICAgICNcbiAgICBnZXRDdXJyZW50TGluZUluZGVudGF0aW9uOiAtPlxuICAgICAgICByZXR1cm4gQGN1cnJlbnRMaW5lLmxlbmd0aCAtIFV0aWxzLmx0cmltKEBjdXJyZW50TGluZSwgJyAnKS5sZW5ndGhcblxuXG4gICAgIyBSZXR1cm5zIHRoZSBuZXh0IGVtYmVkIGJsb2NrIG9mIFlBTUwuXG4gICAgI1xuICAgICMgQHBhcmFtIFtJbnRlZ2VyXSAgICAgICAgICBpbmRlbnRhdGlvbiBUaGUgaW5kZW50IGxldmVsIGF0IHdoaWNoIHRoZSBibG9jayBpcyB0byBiZSByZWFkLCBvciBudWxsIGZvciBkZWZhdWx0XG4gICAgI1xuICAgICMgQHJldHVybiBbU3RyaW5nXSAgICAgICAgICBBIFlBTUwgc3RyaW5nXG4gICAgI1xuICAgICMgQHRocm93IFtQYXJzZUV4Y2VwdGlvbl0gICBXaGVuIGluZGVudGF0aW9uIHByb2JsZW0gYXJlIGRldGVjdGVkXG4gICAgI1xuICAgIGdldE5leHRFbWJlZEJsb2NrOiAoaW5kZW50YXRpb24gPSBudWxsLCBpbmNsdWRlVW5pbmRlbnRlZENvbGxlY3Rpb24gPSBmYWxzZSkgLT5cbiAgICAgICAgQG1vdmVUb05leHRMaW5lKClcblxuICAgICAgICBpZiBub3QgaW5kZW50YXRpb24/XG4gICAgICAgICAgICBuZXdJbmRlbnQgPSBAZ2V0Q3VycmVudExpbmVJbmRlbnRhdGlvbigpXG5cbiAgICAgICAgICAgIHVuaW5kZW50ZWRFbWJlZEJsb2NrID0gQGlzU3RyaW5nVW5JbmRlbnRlZENvbGxlY3Rpb25JdGVtIEBjdXJyZW50TGluZVxuXG4gICAgICAgICAgICBpZiBub3QoQGlzQ3VycmVudExpbmVFbXB0eSgpKSBhbmQgMCBpcyBuZXdJbmRlbnQgYW5kIG5vdCh1bmluZGVudGVkRW1iZWRCbG9jaylcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUGFyc2VFeGNlcHRpb24gJ0luZGVudGF0aW9uIHByb2JsZW0uJywgQGdldFJlYWxDdXJyZW50TGluZU5iKCkgKyAxLCBAY3VycmVudExpbmVcblxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBuZXdJbmRlbnQgPSBpbmRlbnRhdGlvblxuXG5cbiAgICAgICAgZGF0YSA9IFtAY3VycmVudExpbmVbbmV3SW5kZW50Li5dXVxuXG4gICAgICAgIHVubGVzcyBpbmNsdWRlVW5pbmRlbnRlZENvbGxlY3Rpb25cbiAgICAgICAgICAgIGlzSXRVbmluZGVudGVkQ29sbGVjdGlvbiA9IEBpc1N0cmluZ1VuSW5kZW50ZWRDb2xsZWN0aW9uSXRlbSBAY3VycmVudExpbmVcblxuICAgICAgICAjIENvbW1lbnRzIG11c3Qgbm90IGJlIHJlbW92ZWQgaW5zaWRlIGEgc3RyaW5nIGJsb2NrIChpZS4gYWZ0ZXIgYSBsaW5lIGVuZGluZyB3aXRoIFwifFwiKVxuICAgICAgICAjIFRoZXkgbXVzdCBub3QgYmUgcmVtb3ZlZCBpbnNpZGUgYSBzdWItZW1iZWRkZWQgYmxvY2sgYXMgd2VsbFxuICAgICAgICByZW1vdmVDb21tZW50c1BhdHRlcm4gPSBAUEFUVEVSTl9GT0xERURfU0NBTEFSX0VORFxuICAgICAgICByZW1vdmVDb21tZW50cyA9IG5vdCByZW1vdmVDb21tZW50c1BhdHRlcm4udGVzdCBAY3VycmVudExpbmVcblxuICAgICAgICB3aGlsZSBAbW92ZVRvTmV4dExpbmUoKVxuICAgICAgICAgICAgaW5kZW50ID0gQGdldEN1cnJlbnRMaW5lSW5kZW50YXRpb24oKVxuXG4gICAgICAgICAgICBpZiBpbmRlbnQgaXMgbmV3SW5kZW50XG4gICAgICAgICAgICAgICAgcmVtb3ZlQ29tbWVudHMgPSBub3QgcmVtb3ZlQ29tbWVudHNQYXR0ZXJuLnRlc3QgQGN1cnJlbnRMaW5lXG5cbiAgICAgICAgICAgIGlmIGlzSXRVbmluZGVudGVkQ29sbGVjdGlvbiBhbmQgbm90IEBpc1N0cmluZ1VuSW5kZW50ZWRDb2xsZWN0aW9uSXRlbShAY3VycmVudExpbmUpIGFuZCBpbmRlbnQgaXMgbmV3SW5kZW50XG4gICAgICAgICAgICAgICAgQG1vdmVUb1ByZXZpb3VzTGluZSgpXG4gICAgICAgICAgICAgICAgYnJlYWtcblxuICAgICAgICAgICAgaWYgQGlzQ3VycmVudExpbmVCbGFuaygpXG4gICAgICAgICAgICAgICAgZGF0YS5wdXNoIEBjdXJyZW50TGluZVtuZXdJbmRlbnQuLl1cbiAgICAgICAgICAgICAgICBjb250aW51ZVxuXG4gICAgICAgICAgICBpZiByZW1vdmVDb21tZW50cyBhbmQgQGlzQ3VycmVudExpbmVDb21tZW50KClcbiAgICAgICAgICAgICAgICBpZiBpbmRlbnQgaXMgbmV3SW5kZW50XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlXG5cbiAgICAgICAgICAgIGlmIGluZGVudCA+PSBuZXdJbmRlbnRcbiAgICAgICAgICAgICAgICBkYXRhLnB1c2ggQGN1cnJlbnRMaW5lW25ld0luZGVudC4uXVxuICAgICAgICAgICAgZWxzZSBpZiBVdGlscy5sdHJpbShAY3VycmVudExpbmUpLmNoYXJBdCgwKSBpcyAnIydcbiAgICAgICAgICAgICAgICAjIERvbid0IGFkZCBsaW5lIHdpdGggY29tbWVudHNcbiAgICAgICAgICAgIGVsc2UgaWYgMCBpcyBpbmRlbnRcbiAgICAgICAgICAgICAgICBAbW92ZVRvUHJldmlvdXNMaW5lKClcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBQYXJzZUV4Y2VwdGlvbiAnSW5kZW50YXRpb24gcHJvYmxlbS4nLCBAZ2V0UmVhbEN1cnJlbnRMaW5lTmIoKSArIDEsIEBjdXJyZW50TGluZVxuXG5cbiAgICAgICAgcmV0dXJuIGRhdGEuam9pbiBcIlxcblwiXG5cblxuICAgICMgTW92ZXMgdGhlIHBhcnNlciB0byB0aGUgbmV4dCBsaW5lLlxuICAgICNcbiAgICAjIEByZXR1cm4gW0Jvb2xlYW5dXG4gICAgI1xuICAgIG1vdmVUb05leHRMaW5lOiAtPlxuICAgICAgICBpZiBAY3VycmVudExpbmVOYiA+PSBAbGluZXMubGVuZ3RoIC0gMVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG5cbiAgICAgICAgQGN1cnJlbnRMaW5lID0gQGxpbmVzWysrQGN1cnJlbnRMaW5lTmJdO1xuXG4gICAgICAgIHJldHVybiB0cnVlXG5cblxuICAgICMgTW92ZXMgdGhlIHBhcnNlciB0byB0aGUgcHJldmlvdXMgbGluZS5cbiAgICAjXG4gICAgbW92ZVRvUHJldmlvdXNMaW5lOiAtPlxuICAgICAgICBAY3VycmVudExpbmUgPSBAbGluZXNbLS1AY3VycmVudExpbmVOYl1cbiAgICAgICAgcmV0dXJuXG5cblxuICAgICMgUGFyc2VzIGEgWUFNTCB2YWx1ZS5cbiAgICAjXG4gICAgIyBAcGFyYW0gW1N0cmluZ10gICB2YWx1ZSAgICAgICAgICAgICAgICAgICBBIFlBTUwgdmFsdWVcbiAgICAjIEBwYXJhbSBbQm9vbGVhbl0gIGV4Y2VwdGlvbk9uSW52YWxpZFR5cGUgIHRydWUgaWYgYW4gZXhjZXB0aW9uIG11c3QgYmUgdGhyb3duIG9uIGludmFsaWQgdHlwZXMgZmFsc2Ugb3RoZXJ3aXNlXG4gICAgIyBAcGFyYW0gW0Z1bmN0aW9uXSBvYmplY3REZWNvZGVyICAgICAgICAgICBBIGZ1bmN0aW9uIHRvIGRlc2VyaWFsaXplIGN1c3RvbSBvYmplY3RzLCBudWxsIG90aGVyd2lzZVxuICAgICNcbiAgICAjIEByZXR1cm4gW09iamVjdF0gQSBKYXZhU2NyaXB0IHZhbHVlXG4gICAgI1xuICAgICMgQHRocm93IFtQYXJzZUV4Y2VwdGlvbl0gV2hlbiByZWZlcmVuY2UgZG9lcyBub3QgZXhpc3RcbiAgICAjXG4gICAgcGFyc2VWYWx1ZTogKHZhbHVlLCBleGNlcHRpb25PbkludmFsaWRUeXBlLCBvYmplY3REZWNvZGVyKSAtPlxuICAgICAgICBpZiAwIGlzIHZhbHVlLmluZGV4T2YoJyonKVxuICAgICAgICAgICAgcG9zID0gdmFsdWUuaW5kZXhPZiAnIydcbiAgICAgICAgICAgIGlmIHBvcyBpc250IC0xXG4gICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5zdWJzdHIoMSwgcG9zLTIpXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZVsxLi5dXG5cbiAgICAgICAgICAgIGlmIEByZWZzW3ZhbHVlXSBpcyB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUGFyc2VFeGNlcHRpb24gJ1JlZmVyZW5jZSBcIicrdmFsdWUrJ1wiIGRvZXMgbm90IGV4aXN0LicsIEBjdXJyZW50TGluZVxuXG4gICAgICAgICAgICByZXR1cm4gQHJlZnNbdmFsdWVdXG5cblxuICAgICAgICBpZiBtYXRjaGVzID0gQFBBVFRFUk5fRk9MREVEX1NDQUxBUl9BTEwuZXhlYyB2YWx1ZVxuICAgICAgICAgICAgbW9kaWZpZXJzID0gbWF0Y2hlcy5tb2RpZmllcnMgPyAnJ1xuXG4gICAgICAgICAgICBmb2xkZWRJbmRlbnQgPSBNYXRoLmFicyhwYXJzZUludChtb2RpZmllcnMpKVxuICAgICAgICAgICAgaWYgaXNOYU4oZm9sZGVkSW5kZW50KSB0aGVuIGZvbGRlZEluZGVudCA9IDBcbiAgICAgICAgICAgIHZhbCA9IEBwYXJzZUZvbGRlZFNjYWxhciBtYXRjaGVzLnNlcGFyYXRvciwgQFBBVFRFUk5fREVDSU1BTC5yZXBsYWNlKG1vZGlmaWVycywgJycpLCBmb2xkZWRJbmRlbnRcbiAgICAgICAgICAgIGlmIG1hdGNoZXMudHlwZT9cbiAgICAgICAgICAgICAgICAjIEZvcmNlIGNvcnJlY3Qgc2V0dGluZ3NcbiAgICAgICAgICAgICAgICBJbmxpbmUuY29uZmlndXJlIGV4Y2VwdGlvbk9uSW52YWxpZFR5cGUsIG9iamVjdERlY29kZXJcbiAgICAgICAgICAgICAgICByZXR1cm4gSW5saW5lLnBhcnNlU2NhbGFyIG1hdGNoZXMudHlwZSsnICcrdmFsXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbFxuXG4gICAgICAgIHRyeVxuICAgICAgICAgICAgcmV0dXJuIElubGluZS5wYXJzZSB2YWx1ZSwgZXhjZXB0aW9uT25JbnZhbGlkVHlwZSwgb2JqZWN0RGVjb2RlclxuICAgICAgICBjYXRjaCBlXG4gICAgICAgICAgICAjIFRyeSB0byBwYXJzZSBtdWx0aWxpbmUgY29tcGFjdCBzZXF1ZW5jZSBvciBtYXBwaW5nXG4gICAgICAgICAgICBpZiB2YWx1ZS5jaGFyQXQoMCkgaW4gWydbJywgJ3snXSBhbmQgZSBpbnN0YW5jZW9mIFBhcnNlRXhjZXB0aW9uIGFuZCBAaXNOZXh0TGluZUluZGVudGVkKClcbiAgICAgICAgICAgICAgICB2YWx1ZSArPSBcIlxcblwiICsgQGdldE5leHRFbWJlZEJsb2NrKClcbiAgICAgICAgICAgICAgICB0cnlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIElubGluZS5wYXJzZSB2YWx1ZSwgZXhjZXB0aW9uT25JbnZhbGlkVHlwZSwgb2JqZWN0RGVjb2RlclxuICAgICAgICAgICAgICAgIGNhdGNoIGVcbiAgICAgICAgICAgICAgICAgICAgZS5wYXJzZWRMaW5lID0gQGdldFJlYWxDdXJyZW50TGluZU5iKCkgKyAxXG4gICAgICAgICAgICAgICAgICAgIGUuc25pcHBldCA9IEBjdXJyZW50TGluZVxuXG4gICAgICAgICAgICAgICAgICAgIHRocm93IGVcblxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGUucGFyc2VkTGluZSA9IEBnZXRSZWFsQ3VycmVudExpbmVOYigpICsgMVxuICAgICAgICAgICAgICAgIGUuc25pcHBldCA9IEBjdXJyZW50TGluZVxuXG4gICAgICAgICAgICAgICAgdGhyb3cgZVxuXG4gICAgICAgIHJldHVyblxuXG5cbiAgICAjIFBhcnNlcyBhIGZvbGRlZCBzY2FsYXIuXG4gICAgI1xuICAgICMgQHBhcmFtIFtTdHJpbmddICAgICAgIHNlcGFyYXRvciAgIFRoZSBzZXBhcmF0b3IgdGhhdCB3YXMgdXNlZCB0byBiZWdpbiB0aGlzIGZvbGRlZCBzY2FsYXIgKHwgb3IgPilcbiAgICAjIEBwYXJhbSBbU3RyaW5nXSAgICAgICBpbmRpY2F0b3IgICBUaGUgaW5kaWNhdG9yIHRoYXQgd2FzIHVzZWQgdG8gYmVnaW4gdGhpcyBmb2xkZWQgc2NhbGFyICgrIG9yIC0pXG4gICAgIyBAcGFyYW0gW0ludGVnZXJdICAgICAgaW5kZW50YXRpb24gVGhlIGluZGVudGF0aW9uIHRoYXQgd2FzIHVzZWQgdG8gYmVnaW4gdGhpcyBmb2xkZWQgc2NhbGFyXG4gICAgI1xuICAgICMgQHJldHVybiBbU3RyaW5nXSAgICAgIFRoZSB0ZXh0IHZhbHVlXG4gICAgI1xuICAgIHBhcnNlRm9sZGVkU2NhbGFyOiAoc2VwYXJhdG9yLCBpbmRpY2F0b3IgPSAnJywgaW5kZW50YXRpb24gPSAwKSAtPlxuICAgICAgICBub3RFT0YgPSBAbW92ZVRvTmV4dExpbmUoKVxuICAgICAgICBpZiBub3Qgbm90RU9GXG4gICAgICAgICAgICByZXR1cm4gJydcblxuICAgICAgICBpc0N1cnJlbnRMaW5lQmxhbmsgPSBAaXNDdXJyZW50TGluZUJsYW5rKClcbiAgICAgICAgdGV4dCA9ICcnXG5cbiAgICAgICAgIyBMZWFkaW5nIGJsYW5rIGxpbmVzIGFyZSBjb25zdW1lZCBiZWZvcmUgZGV0ZXJtaW5pbmcgaW5kZW50YXRpb25cbiAgICAgICAgd2hpbGUgbm90RU9GIGFuZCBpc0N1cnJlbnRMaW5lQmxhbmtcbiAgICAgICAgICAgICMgbmV3bGluZSBvbmx5IGlmIG5vdCBFT0ZcbiAgICAgICAgICAgIGlmIG5vdEVPRiA9IEBtb3ZlVG9OZXh0TGluZSgpXG4gICAgICAgICAgICAgICAgdGV4dCArPSBcIlxcblwiXG4gICAgICAgICAgICAgICAgaXNDdXJyZW50TGluZUJsYW5rID0gQGlzQ3VycmVudExpbmVCbGFuaygpXG5cblxuICAgICAgICAjIERldGVybWluZSBpbmRlbnRhdGlvbiBpZiBub3Qgc3BlY2lmaWVkXG4gICAgICAgIGlmIDAgaXMgaW5kZW50YXRpb25cbiAgICAgICAgICAgIGlmIG1hdGNoZXMgPSBAUEFUVEVSTl9JTkRFTlRfU1BBQ0VTLmV4ZWMgQGN1cnJlbnRMaW5lXG4gICAgICAgICAgICAgICAgaW5kZW50YXRpb24gPSBtYXRjaGVzWzBdLmxlbmd0aFxuXG5cbiAgICAgICAgaWYgaW5kZW50YXRpb24gPiAwXG4gICAgICAgICAgICBwYXR0ZXJuID0gQFBBVFRFUk5fRk9MREVEX1NDQUxBUl9CWV9JTkRFTlRBVElPTltpbmRlbnRhdGlvbl1cbiAgICAgICAgICAgIHVubGVzcyBwYXR0ZXJuP1xuICAgICAgICAgICAgICAgIHBhdHRlcm4gPSBuZXcgUGF0dGVybiAnXiB7JytpbmRlbnRhdGlvbisnfSguKikkJ1xuICAgICAgICAgICAgICAgIFBhcnNlcjo6UEFUVEVSTl9GT0xERURfU0NBTEFSX0JZX0lOREVOVEFUSU9OW2luZGVudGF0aW9uXSA9IHBhdHRlcm5cblxuICAgICAgICAgICAgd2hpbGUgbm90RU9GIGFuZCAoaXNDdXJyZW50TGluZUJsYW5rIG9yIG1hdGNoZXMgPSBwYXR0ZXJuLmV4ZWMgQGN1cnJlbnRMaW5lKVxuICAgICAgICAgICAgICAgIGlmIGlzQ3VycmVudExpbmVCbGFua1xuICAgICAgICAgICAgICAgICAgICB0ZXh0ICs9IEBjdXJyZW50TGluZVtpbmRlbnRhdGlvbi4uXVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgdGV4dCArPSBtYXRjaGVzWzFdXG5cbiAgICAgICAgICAgICAgICAjIG5ld2xpbmUgb25seSBpZiBub3QgRU9GXG4gICAgICAgICAgICAgICAgaWYgbm90RU9GID0gQG1vdmVUb05leHRMaW5lKClcbiAgICAgICAgICAgICAgICAgICAgdGV4dCArPSBcIlxcblwiXG4gICAgICAgICAgICAgICAgICAgIGlzQ3VycmVudExpbmVCbGFuayA9IEBpc0N1cnJlbnRMaW5lQmxhbmsoKVxuXG4gICAgICAgIGVsc2UgaWYgbm90RU9GXG4gICAgICAgICAgICB0ZXh0ICs9IFwiXFxuXCJcblxuXG4gICAgICAgIGlmIG5vdEVPRlxuICAgICAgICAgICAgQG1vdmVUb1ByZXZpb3VzTGluZSgpXG5cblxuICAgICAgICAjIFJlbW92ZSBsaW5lIGJyZWFrcyBvZiBlYWNoIGxpbmVzIGV4Y2VwdCB0aGUgZW1wdHkgYW5kIG1vcmUgaW5kZW50ZWQgb25lc1xuICAgICAgICBpZiAnPicgaXMgc2VwYXJhdG9yXG4gICAgICAgICAgICBuZXdUZXh0ID0gJydcbiAgICAgICAgICAgIGZvciBsaW5lIGluIHRleHQuc3BsaXQgXCJcXG5cIlxuICAgICAgICAgICAgICAgIGlmIGxpbmUubGVuZ3RoIGlzIDAgb3IgbGluZS5jaGFyQXQoMCkgaXMgJyAnXG4gICAgICAgICAgICAgICAgICAgIG5ld1RleHQgPSBVdGlscy5ydHJpbShuZXdUZXh0LCAnICcpICsgbGluZSArIFwiXFxuXCJcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIG5ld1RleHQgKz0gbGluZSArICcgJ1xuICAgICAgICAgICAgdGV4dCA9IG5ld1RleHRcblxuICAgICAgICBpZiAnKycgaXNudCBpbmRpY2F0b3JcbiAgICAgICAgICAgICMgUmVtb3ZlIGFueSBleHRyYSBzcGFjZSBvciBuZXcgbGluZSBhcyB3ZSBhcmUgYWRkaW5nIHRoZW0gYWZ0ZXJcbiAgICAgICAgICAgIHRleHQgPSBVdGlscy5ydHJpbSh0ZXh0KVxuXG4gICAgICAgICMgRGVhbCB3aXRoIHRyYWlsaW5nIG5ld2xpbmVzIGFzIGluZGljYXRlZFxuICAgICAgICBpZiAnJyBpcyBpbmRpY2F0b3JcbiAgICAgICAgICAgIHRleHQgPSBAUEFUVEVSTl9UUkFJTElOR19MSU5FUy5yZXBsYWNlIHRleHQsIFwiXFxuXCJcbiAgICAgICAgZWxzZSBpZiAnLScgaXMgaW5kaWNhdG9yXG4gICAgICAgICAgICB0ZXh0ID0gQFBBVFRFUk5fVFJBSUxJTkdfTElORVMucmVwbGFjZSB0ZXh0LCAnJ1xuXG4gICAgICAgIHJldHVybiB0ZXh0XG5cblxuICAgICMgUmV0dXJucyB0cnVlIGlmIHRoZSBuZXh0IGxpbmUgaXMgaW5kZW50ZWQuXG4gICAgI1xuICAgICMgQHJldHVybiBbQm9vbGVhbl0gICAgIFJldHVybnMgdHJ1ZSBpZiB0aGUgbmV4dCBsaW5lIGlzIGluZGVudGVkLCBmYWxzZSBvdGhlcndpc2VcbiAgICAjXG4gICAgaXNOZXh0TGluZUluZGVudGVkOiAoaWdub3JlQ29tbWVudHMgPSB0cnVlKSAtPlxuICAgICAgICBjdXJyZW50SW5kZW50YXRpb24gPSBAZ2V0Q3VycmVudExpbmVJbmRlbnRhdGlvbigpXG4gICAgICAgIEVPRiA9IG5vdCBAbW92ZVRvTmV4dExpbmUoKVxuXG4gICAgICAgIGlmIGlnbm9yZUNvbW1lbnRzXG4gICAgICAgICAgICB3aGlsZSBub3QoRU9GKSBhbmQgQGlzQ3VycmVudExpbmVFbXB0eSgpXG4gICAgICAgICAgICAgICAgRU9GID0gbm90IEBtb3ZlVG9OZXh0TGluZSgpXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHdoaWxlIG5vdChFT0YpIGFuZCBAaXNDdXJyZW50TGluZUJsYW5rKClcbiAgICAgICAgICAgICAgICBFT0YgPSBub3QgQG1vdmVUb05leHRMaW5lKClcblxuICAgICAgICBpZiBFT0ZcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuXG4gICAgICAgIHJldCA9IGZhbHNlXG4gICAgICAgIGlmIEBnZXRDdXJyZW50TGluZUluZGVudGF0aW9uKCkgPiBjdXJyZW50SW5kZW50YXRpb25cbiAgICAgICAgICAgIHJldCA9IHRydWVcblxuICAgICAgICBAbW92ZVRvUHJldmlvdXNMaW5lKClcblxuICAgICAgICByZXR1cm4gcmV0XG5cblxuICAgICMgUmV0dXJucyB0cnVlIGlmIHRoZSBjdXJyZW50IGxpbmUgaXMgYmxhbmsgb3IgaWYgaXQgaXMgYSBjb21tZW50IGxpbmUuXG4gICAgI1xuICAgICMgQHJldHVybiBbQm9vbGVhbl0gICAgIFJldHVybnMgdHJ1ZSBpZiB0aGUgY3VycmVudCBsaW5lIGlzIGVtcHR5IG9yIGlmIGl0IGlzIGEgY29tbWVudCBsaW5lLCBmYWxzZSBvdGhlcndpc2VcbiAgICAjXG4gICAgaXNDdXJyZW50TGluZUVtcHR5OiAtPlxuICAgICAgICB0cmltbWVkTGluZSA9IFV0aWxzLnRyaW0oQGN1cnJlbnRMaW5lLCAnICcpXG4gICAgICAgIHJldHVybiB0cmltbWVkTGluZS5sZW5ndGggaXMgMCBvciB0cmltbWVkTGluZS5jaGFyQXQoMCkgaXMgJyMnXG5cblxuICAgICMgUmV0dXJucyB0cnVlIGlmIHRoZSBjdXJyZW50IGxpbmUgaXMgYmxhbmsuXG4gICAgI1xuICAgICMgQHJldHVybiBbQm9vbGVhbl0gICAgIFJldHVybnMgdHJ1ZSBpZiB0aGUgY3VycmVudCBsaW5lIGlzIGJsYW5rLCBmYWxzZSBvdGhlcndpc2VcbiAgICAjXG4gICAgaXNDdXJyZW50TGluZUJsYW5rOiAtPlxuICAgICAgICByZXR1cm4gJycgaXMgVXRpbHMudHJpbShAY3VycmVudExpbmUsICcgJylcblxuXG4gICAgIyBSZXR1cm5zIHRydWUgaWYgdGhlIGN1cnJlbnQgbGluZSBpcyBhIGNvbW1lbnQgbGluZS5cbiAgICAjXG4gICAgIyBAcmV0dXJuIFtCb29sZWFuXSAgICAgUmV0dXJucyB0cnVlIGlmIHRoZSBjdXJyZW50IGxpbmUgaXMgYSBjb21tZW50IGxpbmUsIGZhbHNlIG90aGVyd2lzZVxuICAgICNcbiAgICBpc0N1cnJlbnRMaW5lQ29tbWVudDogLT5cbiAgICAgICAgIyBDaGVja2luZyBleHBsaWNpdGx5IHRoZSBmaXJzdCBjaGFyIG9mIHRoZSB0cmltIGlzIGZhc3RlciB0aGFuIGxvb3BzIG9yIHN0cnBvc1xuICAgICAgICBsdHJpbW1lZExpbmUgPSBVdGlscy5sdHJpbShAY3VycmVudExpbmUsICcgJylcblxuICAgICAgICByZXR1cm4gbHRyaW1tZWRMaW5lLmNoYXJBdCgwKSBpcyAnIydcblxuXG4gICAgIyBDbGVhbnVwcyBhIFlBTUwgc3RyaW5nIHRvIGJlIHBhcnNlZC5cbiAgICAjXG4gICAgIyBAcGFyYW0gW1N0cmluZ10gICB2YWx1ZSBUaGUgaW5wdXQgWUFNTCBzdHJpbmdcbiAgICAjXG4gICAgIyBAcmV0dXJuIFtTdHJpbmddICBBIGNsZWFuZWQgdXAgWUFNTCBzdHJpbmdcbiAgICAjXG4gICAgY2xlYW51cDogKHZhbHVlKSAtPlxuICAgICAgICBpZiB2YWx1ZS5pbmRleE9mKFwiXFxyXCIpIGlzbnQgLTFcbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWUuc3BsaXQoXCJcXHJcXG5cIikuam9pbihcIlxcblwiKS5zcGxpdChcIlxcclwiKS5qb2luKFwiXFxuXCIpXG5cbiAgICAgICAgIyBTdHJpcCBZQU1MIGhlYWRlclxuICAgICAgICBjb3VudCA9IDBcbiAgICAgICAgW3ZhbHVlLCBjb3VudF0gPSBAUEFUVEVSTl9ZQU1MX0hFQURFUi5yZXBsYWNlQWxsIHZhbHVlLCAnJ1xuICAgICAgICBAb2Zmc2V0ICs9IGNvdW50XG5cbiAgICAgICAgIyBSZW1vdmUgbGVhZGluZyBjb21tZW50c1xuICAgICAgICBbdHJpbW1lZFZhbHVlLCBjb3VudF0gPSBAUEFUVEVSTl9MRUFESU5HX0NPTU1FTlRTLnJlcGxhY2VBbGwgdmFsdWUsICcnLCAxXG4gICAgICAgIGlmIGNvdW50IGlzIDFcbiAgICAgICAgICAgICMgSXRlbXMgaGF2ZSBiZWVuIHJlbW92ZWQsIHVwZGF0ZSB0aGUgb2Zmc2V0XG4gICAgICAgICAgICBAb2Zmc2V0ICs9IFV0aWxzLnN1YlN0ckNvdW50KHZhbHVlLCBcIlxcblwiKSAtIFV0aWxzLnN1YlN0ckNvdW50KHRyaW1tZWRWYWx1ZSwgXCJcXG5cIilcbiAgICAgICAgICAgIHZhbHVlID0gdHJpbW1lZFZhbHVlXG5cbiAgICAgICAgIyBSZW1vdmUgc3RhcnQgb2YgdGhlIGRvY3VtZW50IG1hcmtlciAoLS0tKVxuICAgICAgICBbdHJpbW1lZFZhbHVlLCBjb3VudF0gPSBAUEFUVEVSTl9ET0NVTUVOVF9NQVJLRVJfU1RBUlQucmVwbGFjZUFsbCB2YWx1ZSwgJycsIDFcbiAgICAgICAgaWYgY291bnQgaXMgMVxuICAgICAgICAgICAgIyBJdGVtcyBoYXZlIGJlZW4gcmVtb3ZlZCwgdXBkYXRlIHRoZSBvZmZzZXRcbiAgICAgICAgICAgIEBvZmZzZXQgKz0gVXRpbHMuc3ViU3RyQ291bnQodmFsdWUsIFwiXFxuXCIpIC0gVXRpbHMuc3ViU3RyQ291bnQodHJpbW1lZFZhbHVlLCBcIlxcblwiKVxuICAgICAgICAgICAgdmFsdWUgPSB0cmltbWVkVmFsdWVcblxuICAgICAgICAgICAgIyBSZW1vdmUgZW5kIG9mIHRoZSBkb2N1bWVudCBtYXJrZXIgKC4uLilcbiAgICAgICAgICAgIHZhbHVlID0gQFBBVFRFUk5fRE9DVU1FTlRfTUFSS0VSX0VORC5yZXBsYWNlIHZhbHVlLCAnJ1xuXG4gICAgICAgICMgRW5zdXJlIHRoZSBibG9jayBpcyBub3QgaW5kZW50ZWRcbiAgICAgICAgbGluZXMgPSB2YWx1ZS5zcGxpdChcIlxcblwiKVxuICAgICAgICBzbWFsbGVzdEluZGVudCA9IC0xXG4gICAgICAgIGZvciBsaW5lIGluIGxpbmVzXG4gICAgICAgICAgICBpbmRlbnQgPSBsaW5lLmxlbmd0aCAtIFV0aWxzLmx0cmltKGxpbmUpLmxlbmd0aFxuICAgICAgICAgICAgaWYgc21hbGxlc3RJbmRlbnQgaXMgLTEgb3IgaW5kZW50IDwgc21hbGxlc3RJbmRlbnRcbiAgICAgICAgICAgICAgICBzbWFsbGVzdEluZGVudCA9IGluZGVudFxuICAgICAgICBpZiBzbWFsbGVzdEluZGVudCA+IDBcbiAgICAgICAgICAgIGZvciBsaW5lLCBpIGluIGxpbmVzXG4gICAgICAgICAgICAgICAgbGluZXNbaV0gPSBsaW5lW3NtYWxsZXN0SW5kZW50Li5dXG4gICAgICAgICAgICB2YWx1ZSA9IGxpbmVzLmpvaW4oXCJcXG5cIilcblxuICAgICAgICByZXR1cm4gdmFsdWVcblxuXG4gICAgIyBSZXR1cm5zIHRydWUgaWYgdGhlIG5leHQgbGluZSBzdGFydHMgdW5pbmRlbnRlZCBjb2xsZWN0aW9uXG4gICAgI1xuICAgICMgQHJldHVybiBbQm9vbGVhbl0gICAgIFJldHVybnMgdHJ1ZSBpZiB0aGUgbmV4dCBsaW5lIHN0YXJ0cyB1bmluZGVudGVkIGNvbGxlY3Rpb24sIGZhbHNlIG90aGVyd2lzZVxuICAgICNcbiAgICBpc05leHRMaW5lVW5JbmRlbnRlZENvbGxlY3Rpb246IChjdXJyZW50SW5kZW50YXRpb24gPSBudWxsKSAtPlxuICAgICAgICBjdXJyZW50SW5kZW50YXRpb24gPz0gQGdldEN1cnJlbnRMaW5lSW5kZW50YXRpb24oKVxuICAgICAgICBub3RFT0YgPSBAbW92ZVRvTmV4dExpbmUoKVxuXG4gICAgICAgIHdoaWxlIG5vdEVPRiBhbmQgQGlzQ3VycmVudExpbmVFbXB0eSgpXG4gICAgICAgICAgICBub3RFT0YgPSBAbW92ZVRvTmV4dExpbmUoKVxuXG4gICAgICAgIGlmIGZhbHNlIGlzIG5vdEVPRlxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG5cbiAgICAgICAgcmV0ID0gZmFsc2VcbiAgICAgICAgaWYgQGdldEN1cnJlbnRMaW5lSW5kZW50YXRpb24oKSBpcyBjdXJyZW50SW5kZW50YXRpb24gYW5kIEBpc1N0cmluZ1VuSW5kZW50ZWRDb2xsZWN0aW9uSXRlbShAY3VycmVudExpbmUpXG4gICAgICAgICAgICByZXQgPSB0cnVlXG5cbiAgICAgICAgQG1vdmVUb1ByZXZpb3VzTGluZSgpXG5cbiAgICAgICAgcmV0dXJuIHJldFxuXG5cbiAgICAjIFJldHVybnMgdHJ1ZSBpZiB0aGUgc3RyaW5nIGlzIHVuLWluZGVudGVkIGNvbGxlY3Rpb24gaXRlbVxuICAgICNcbiAgICAjIEByZXR1cm4gW0Jvb2xlYW5dICAgICBSZXR1cm5zIHRydWUgaWYgdGhlIHN0cmluZyBpcyB1bi1pbmRlbnRlZCBjb2xsZWN0aW9uIGl0ZW0sIGZhbHNlIG90aGVyd2lzZVxuICAgICNcbiAgICBpc1N0cmluZ1VuSW5kZW50ZWRDb2xsZWN0aW9uSXRlbTogLT5cbiAgICAgICAgcmV0dXJuIEBjdXJyZW50TGluZSBpcyAnLScgb3IgQGN1cnJlbnRMaW5lWzAuLi4yXSBpcyAnLSAnXG5cblxubW9kdWxlLmV4cG9ydHMgPSBQYXJzZXJcbiIsIlxuIyBQYXR0ZXJuIGlzIGEgemVyby1jb25mbGljdCB3cmFwcGVyIGV4dGVuZGluZyBSZWdFeHAgZmVhdHVyZXNcbiMgaW4gb3JkZXIgdG8gbWFrZSBZQU1MIHBhcnNpbmcgcmVnZXggbW9yZSBleHByZXNzaXZlLlxuI1xuY2xhc3MgUGF0dGVyblxuXG4gICAgIyBAcHJvcGVydHkgW1JlZ0V4cF0gVGhlIFJlZ0V4cCBpbnN0YW5jZVxuICAgIHJlZ2V4OiAgICAgICAgICBudWxsXG5cbiAgICAjIEBwcm9wZXJ0eSBbU3RyaW5nXSBUaGUgcmF3IHJlZ2V4IHN0cmluZ1xuICAgIHJhd1JlZ2V4OiAgICAgICBudWxsXG5cbiAgICAjIEBwcm9wZXJ0eSBbU3RyaW5nXSBUaGUgY2xlYW5lZCByZWdleCBzdHJpbmcgKHVzZWQgdG8gY3JlYXRlIHRoZSBSZWdFeHAgaW5zdGFuY2UpXG4gICAgY2xlYW5lZFJlZ2V4OiAgIG51bGxcblxuICAgICMgQHByb3BlcnR5IFtPYmplY3RdIFRoZSBkaWN0aW9uYXJ5IG1hcHBpbmcgbmFtZXMgdG8gY2FwdHVyaW5nIGJyYWNrZXQgbnVtYmVyc1xuICAgIG1hcHBpbmc6ICAgICAgICBudWxsXG5cbiAgICAjIENvbnN0cnVjdG9yXG4gICAgI1xuICAgICMgQHBhcmFtIFtTdHJpbmddIHJhd1JlZ2V4IFRoZSByYXcgcmVnZXggc3RyaW5nIGRlZmluaW5nIHRoZSBwYXR0ZXJuXG4gICAgI1xuICAgIGNvbnN0cnVjdG9yOiAocmF3UmVnZXgsIG1vZGlmaWVycyA9ICcnKSAtPlxuICAgICAgICBjbGVhbmVkUmVnZXggPSAnJ1xuICAgICAgICBsZW4gPSByYXdSZWdleC5sZW5ndGhcbiAgICAgICAgbWFwcGluZyA9IG51bGxcblxuICAgICAgICAjIENsZWFudXAgcmF3IHJlZ2V4IGFuZCBjb21wdXRlIG1hcHBpbmdcbiAgICAgICAgY2FwdHVyaW5nQnJhY2tldE51bWJlciA9IDBcbiAgICAgICAgaSA9IDBcbiAgICAgICAgd2hpbGUgaSA8IGxlblxuICAgICAgICAgICAgY2hhciA9IHJhd1JlZ2V4LmNoYXJBdChpKVxuICAgICAgICAgICAgaWYgY2hhciBpcyAnXFxcXCdcbiAgICAgICAgICAgICAgICAjIElnbm9yZSBuZXh0IGNoYXJhY3RlclxuICAgICAgICAgICAgICAgIGNsZWFuZWRSZWdleCArPSByYXdSZWdleFtpLi5pKzFdXG4gICAgICAgICAgICAgICAgaSsrXG4gICAgICAgICAgICBlbHNlIGlmIGNoYXIgaXMgJygnXG4gICAgICAgICAgICAgICAgIyBJbmNyZWFzZSBicmFja2V0IG51bWJlciwgb25seSBpZiBpdCBpcyBjYXB0dXJpbmdcbiAgICAgICAgICAgICAgICBpZiBpIDwgbGVuIC0gMlxuICAgICAgICAgICAgICAgICAgICBwYXJ0ID0gcmF3UmVnZXhbaS4uaSsyXVxuICAgICAgICAgICAgICAgICAgICBpZiBwYXJ0IGlzICcoPzonXG4gICAgICAgICAgICAgICAgICAgICAgICAjIE5vbi1jYXB0dXJpbmcgYnJhY2tldFxuICAgICAgICAgICAgICAgICAgICAgICAgaSArPSAyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhbmVkUmVnZXggKz0gcGFydFxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIHBhcnQgaXMgJyg/PCdcbiAgICAgICAgICAgICAgICAgICAgICAgICMgQ2FwdHVyaW5nIGJyYWNrZXQgd2l0aCBwb3NzaWJseSBhIG5hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHR1cmluZ0JyYWNrZXROdW1iZXIrK1xuICAgICAgICAgICAgICAgICAgICAgICAgaSArPSAyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lID0gJydcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlIGkgKyAxIDwgbGVuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViQ2hhciA9IHJhd1JlZ2V4LmNoYXJBdChpICsgMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiBzdWJDaGFyIGlzICc+J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGVhbmVkUmVnZXggKz0gJygnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkrK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiBuYW1lLmxlbmd0aCA+IDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICMgQXNzb2NpYXRlIGEgbmFtZSB3aXRoIGEgY2FwdHVyaW5nIGJyYWNrZXQgbnVtYmVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXBwaW5nID89IHt9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXBwaW5nW25hbWVdID0gY2FwdHVyaW5nQnJhY2tldE51bWJlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZSArPSBzdWJDaGFyXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpKytcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYW5lZFJlZ2V4ICs9IGNoYXJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHR1cmluZ0JyYWNrZXROdW1iZXIrK1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgY2xlYW5lZFJlZ2V4ICs9IGNoYXJcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBjbGVhbmVkUmVnZXggKz0gY2hhclxuXG4gICAgICAgICAgICBpKytcblxuICAgICAgICBAcmF3UmVnZXggPSByYXdSZWdleFxuICAgICAgICBAY2xlYW5lZFJlZ2V4ID0gY2xlYW5lZFJlZ2V4XG4gICAgICAgIEByZWdleCA9IG5ldyBSZWdFeHAgQGNsZWFuZWRSZWdleCwgJ2cnK21vZGlmaWVycy5yZXBsYWNlKCdnJywgJycpXG4gICAgICAgIEBtYXBwaW5nID0gbWFwcGluZ1xuXG5cbiAgICAjIEV4ZWN1dGVzIHRoZSBwYXR0ZXJuJ3MgcmVnZXggYW5kIHJldHVybnMgdGhlIG1hdGNoaW5nIHZhbHVlc1xuICAgICNcbiAgICAjIEBwYXJhbSBbU3RyaW5nXSBzdHIgVGhlIHN0cmluZyB0byB1c2UgdG8gZXhlY3V0ZSB0aGUgcGF0dGVyblxuICAgICNcbiAgICAjIEByZXR1cm4gW0FycmF5XSBUaGUgbWF0Y2hpbmcgdmFsdWVzIGV4dHJhY3RlZCBmcm9tIGNhcHR1cmluZyBicmFja2V0cyBvciBudWxsIGlmIG5vdGhpbmcgbWF0Y2hlZFxuICAgICNcbiAgICBleGVjOiAoc3RyKSAtPlxuICAgICAgICBAcmVnZXgubGFzdEluZGV4ID0gMFxuICAgICAgICBtYXRjaGVzID0gQHJlZ2V4LmV4ZWMgc3RyXG5cbiAgICAgICAgaWYgbm90IG1hdGNoZXM/XG4gICAgICAgICAgICByZXR1cm4gbnVsbFxuXG4gICAgICAgIGlmIEBtYXBwaW5nP1xuICAgICAgICAgICAgZm9yIG5hbWUsIGluZGV4IG9mIEBtYXBwaW5nXG4gICAgICAgICAgICAgICAgbWF0Y2hlc1tuYW1lXSA9IG1hdGNoZXNbaW5kZXhdXG5cbiAgICAgICAgcmV0dXJuIG1hdGNoZXNcblxuXG4gICAgIyBUZXN0cyB0aGUgcGF0dGVybidzIHJlZ2V4XG4gICAgI1xuICAgICMgQHBhcmFtIFtTdHJpbmddIHN0ciBUaGUgc3RyaW5nIHRvIHVzZSB0byB0ZXN0IHRoZSBwYXR0ZXJuXG4gICAgI1xuICAgICMgQHJldHVybiBbQm9vbGVhbl0gdHJ1ZSBpZiB0aGUgc3RyaW5nIG1hdGNoZWRcbiAgICAjXG4gICAgdGVzdDogKHN0cikgLT5cbiAgICAgICAgQHJlZ2V4Lmxhc3RJbmRleCA9IDBcbiAgICAgICAgcmV0dXJuIEByZWdleC50ZXN0IHN0clxuXG5cbiAgICAjIFJlcGxhY2VzIG9jY3VyZW5jZXMgbWF0Y2hpbmcgd2l0aCB0aGUgcGF0dGVybidzIHJlZ2V4IHdpdGggcmVwbGFjZW1lbnRcbiAgICAjXG4gICAgIyBAcGFyYW0gW1N0cmluZ10gc3RyIFRoZSBzb3VyY2Ugc3RyaW5nIHRvIHBlcmZvcm0gcmVwbGFjZW1lbnRzXG4gICAgIyBAcGFyYW0gW1N0cmluZ10gcmVwbGFjZW1lbnQgVGhlIHN0cmluZyB0byB1c2UgaW4gcGxhY2Ugb2YgZWFjaCByZXBsYWNlZCBvY2N1cmVuY2UuXG4gICAgI1xuICAgICMgQHJldHVybiBbU3RyaW5nXSBUaGUgcmVwbGFjZWQgc3RyaW5nXG4gICAgI1xuICAgIHJlcGxhY2U6IChzdHIsIHJlcGxhY2VtZW50KSAtPlxuICAgICAgICBAcmVnZXgubGFzdEluZGV4ID0gMFxuICAgICAgICByZXR1cm4gc3RyLnJlcGxhY2UgQHJlZ2V4LCByZXBsYWNlbWVudFxuXG5cbiAgICAjIFJlcGxhY2VzIG9jY3VyZW5jZXMgbWF0Y2hpbmcgd2l0aCB0aGUgcGF0dGVybidzIHJlZ2V4IHdpdGggcmVwbGFjZW1lbnQgYW5kXG4gICAgIyBnZXQgYm90aCB0aGUgcmVwbGFjZWQgc3RyaW5nIGFuZCB0aGUgbnVtYmVyIG9mIHJlcGxhY2VkIG9jY3VyZW5jZXMgaW4gdGhlIHN0cmluZy5cbiAgICAjXG4gICAgIyBAcGFyYW0gW1N0cmluZ10gc3RyIFRoZSBzb3VyY2Ugc3RyaW5nIHRvIHBlcmZvcm0gcmVwbGFjZW1lbnRzXG4gICAgIyBAcGFyYW0gW1N0cmluZ10gcmVwbGFjZW1lbnQgVGhlIHN0cmluZyB0byB1c2UgaW4gcGxhY2Ugb2YgZWFjaCByZXBsYWNlZCBvY2N1cmVuY2UuXG4gICAgIyBAcGFyYW0gW0ludGVnZXJdIGxpbWl0IFRoZSBtYXhpbXVtIG51bWJlciBvZiBvY2N1cmVuY2VzIHRvIHJlcGxhY2UgKDAgbWVhbnMgaW5maW5pdGUgbnVtYmVyIG9mIG9jY3VyZW5jZXMpXG4gICAgI1xuICAgICMgQHJldHVybiBbQXJyYXldIEEgZGVzdHJ1Y3R1cmFibGUgYXJyYXkgY29udGFpbmluZyB0aGUgcmVwbGFjZWQgc3RyaW5nIGFuZCB0aGUgbnVtYmVyIG9mIHJlcGxhY2VkIG9jY3VyZW5jZXMuIEZvciBpbnN0YW5jZTogW1wibXkgcmVwbGFjZWQgc3RyaW5nXCIsIDJdXG4gICAgI1xuICAgIHJlcGxhY2VBbGw6IChzdHIsIHJlcGxhY2VtZW50LCBsaW1pdCA9IDApIC0+XG4gICAgICAgIEByZWdleC5sYXN0SW5kZXggPSAwXG4gICAgICAgIGNvdW50ID0gMFxuICAgICAgICB3aGlsZSBAcmVnZXgudGVzdChzdHIpIGFuZCAobGltaXQgaXMgMCBvciBjb3VudCA8IGxpbWl0KVxuICAgICAgICAgICAgQHJlZ2V4Lmxhc3RJbmRleCA9IDBcbiAgICAgICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlIEByZWdleCwgJydcbiAgICAgICAgICAgIGNvdW50KytcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBbc3RyLCBjb3VudF1cblxuXG5tb2R1bGUuZXhwb3J0cyA9IFBhdHRlcm5cblxuIiwiXG5VdGlscyAgID0gcmVxdWlyZSAnLi9VdGlscydcblBhdHRlcm4gPSByZXF1aXJlICcuL1BhdHRlcm4nXG5cbiMgVW5lc2NhcGVyIGVuY2Fwc3VsYXRlcyB1bmVzY2FwaW5nIHJ1bGVzIGZvciBzaW5nbGUgYW5kIGRvdWJsZS1xdW90ZWQgWUFNTCBzdHJpbmdzLlxuI1xuY2xhc3MgVW5lc2NhcGVyXG5cbiAgICAjIFJlZ2V4IGZyYWdtZW50IHRoYXQgbWF0Y2hlcyBhbiBlc2NhcGVkIGNoYXJhY3RlciBpblxuICAgICMgYSBkb3VibGUgcXVvdGVkIHN0cmluZy5cbiAgICBAUEFUVEVSTl9FU0NBUEVEX0NIQVJBQ1RFUjogICAgIG5ldyBQYXR0ZXJuICdcXFxcXFxcXChbMGFidFxcdG52ZnJlIFwiXFxcXC9cXFxcXFxcXE5fTFBdfHhbMC05YS1mQS1GXXsyfXx1WzAtOWEtZkEtRl17NH18VVswLTlhLWZBLUZdezh9KSc7XG5cblxuICAgICMgVW5lc2NhcGVzIGEgc2luZ2xlIHF1b3RlZCBzdHJpbmcuXG4gICAgI1xuICAgICMgQHBhcmFtIFtTdHJpbmddICAgICAgIHZhbHVlIEEgc2luZ2xlIHF1b3RlZCBzdHJpbmcuXG4gICAgI1xuICAgICMgQHJldHVybiBbU3RyaW5nXSAgICAgIFRoZSB1bmVzY2FwZWQgc3RyaW5nLlxuICAgICNcbiAgICBAdW5lc2NhcGVTaW5nbGVRdW90ZWRTdHJpbmc6ICh2YWx1ZSkgLT5cbiAgICAgICAgcmV0dXJuIHZhbHVlLnJlcGxhY2UoJ1xcJ1xcJycsICdcXCcnKVxuXG5cbiAgICAjIFVuZXNjYXBlcyBhIGRvdWJsZSBxdW90ZWQgc3RyaW5nLlxuICAgICNcbiAgICAjIEBwYXJhbSBbU3RyaW5nXSAgICAgICB2YWx1ZSBBIGRvdWJsZSBxdW90ZWQgc3RyaW5nLlxuICAgICNcbiAgICAjIEByZXR1cm4gW1N0cmluZ10gICAgICBUaGUgdW5lc2NhcGVkIHN0cmluZy5cbiAgICAjXG4gICAgQHVuZXNjYXBlRG91YmxlUXVvdGVkU3RyaW5nOiAodmFsdWUpIC0+XG4gICAgICAgIEBfdW5lc2NhcGVDYWxsYmFjayA/PSAoc3RyKSA9PlxuICAgICAgICAgICAgcmV0dXJuIEB1bmVzY2FwZUNoYXJhY3RlcihzdHIpXG5cbiAgICAgICAgIyBFdmFsdWF0ZSB0aGUgc3RyaW5nXG4gICAgICAgIHJldHVybiBAUEFUVEVSTl9FU0NBUEVEX0NIQVJBQ1RFUi5yZXBsYWNlIHZhbHVlLCBAX3VuZXNjYXBlQ2FsbGJhY2tcblxuXG4gICAgIyBVbmVzY2FwZXMgYSBjaGFyYWN0ZXIgdGhhdCB3YXMgZm91bmQgaW4gYSBkb3VibGUtcXVvdGVkIHN0cmluZ1xuICAgICNcbiAgICAjIEBwYXJhbSBbU3RyaW5nXSAgICAgICB2YWx1ZSBBbiBlc2NhcGVkIGNoYXJhY3RlclxuICAgICNcbiAgICAjIEByZXR1cm4gW1N0cmluZ10gICAgICBUaGUgdW5lc2NhcGVkIGNoYXJhY3RlclxuICAgICNcbiAgICBAdW5lc2NhcGVDaGFyYWN0ZXI6ICh2YWx1ZSkgLT5cbiAgICAgICAgY2ggPSBTdHJpbmcuZnJvbUNoYXJDb2RlXG4gICAgICAgIHN3aXRjaCB2YWx1ZS5jaGFyQXQoMSlcbiAgICAgICAgICAgIHdoZW4gJzAnXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNoKDApXG4gICAgICAgICAgICB3aGVuICdhJ1xuICAgICAgICAgICAgICAgIHJldHVybiBjaCg3KVxuICAgICAgICAgICAgd2hlbiAnYidcbiAgICAgICAgICAgICAgICByZXR1cm4gY2goOClcbiAgICAgICAgICAgIHdoZW4gJ3QnXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiXFx0XCJcbiAgICAgICAgICAgIHdoZW4gXCJcXHRcIlxuICAgICAgICAgICAgICAgIHJldHVybiBcIlxcdFwiXG4gICAgICAgICAgICB3aGVuICduJ1xuICAgICAgICAgICAgICAgIHJldHVybiBcIlxcblwiXG4gICAgICAgICAgICB3aGVuICd2J1xuICAgICAgICAgICAgICAgIHJldHVybiBjaCgxMSlcbiAgICAgICAgICAgIHdoZW4gJ2YnXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNoKDEyKVxuICAgICAgICAgICAgd2hlbiAncidcbiAgICAgICAgICAgICAgICByZXR1cm4gY2goMTMpXG4gICAgICAgICAgICB3aGVuICdlJ1xuICAgICAgICAgICAgICAgIHJldHVybiBjaCgyNylcbiAgICAgICAgICAgIHdoZW4gJyAnXG4gICAgICAgICAgICAgICAgcmV0dXJuICcgJ1xuICAgICAgICAgICAgd2hlbiAnXCInXG4gICAgICAgICAgICAgICAgcmV0dXJuICdcIidcbiAgICAgICAgICAgIHdoZW4gJy8nXG4gICAgICAgICAgICAgICAgcmV0dXJuICcvJ1xuICAgICAgICAgICAgd2hlbiAnXFxcXCdcbiAgICAgICAgICAgICAgICByZXR1cm4gJ1xcXFwnXG4gICAgICAgICAgICB3aGVuICdOJ1xuICAgICAgICAgICAgICAgICMgVSswMDg1IE5FWFQgTElORVxuICAgICAgICAgICAgICAgIHJldHVybiBjaCgweDAwODUpXG4gICAgICAgICAgICB3aGVuICdfJ1xuICAgICAgICAgICAgICAgICMgVSswMEEwIE5PLUJSRUFLIFNQQUNFXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNoKDB4MDBBMClcbiAgICAgICAgICAgIHdoZW4gJ0wnXG4gICAgICAgICAgICAgICAgIyBVKzIwMjggTElORSBTRVBBUkFUT1JcbiAgICAgICAgICAgICAgICByZXR1cm4gY2goMHgyMDI4KVxuICAgICAgICAgICAgd2hlbiAnUCdcbiAgICAgICAgICAgICAgICAjIFUrMjAyOSBQQVJBR1JBUEggU0VQQVJBVE9SXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNoKDB4MjAyOSlcbiAgICAgICAgICAgIHdoZW4gJ3gnXG4gICAgICAgICAgICAgICAgcmV0dXJuIFV0aWxzLnV0ZjhjaHIoVXRpbHMuaGV4RGVjKHZhbHVlLnN1YnN0cigyLCAyKSkpXG4gICAgICAgICAgICB3aGVuICd1J1xuICAgICAgICAgICAgICAgIHJldHVybiBVdGlscy51dGY4Y2hyKFV0aWxzLmhleERlYyh2YWx1ZS5zdWJzdHIoMiwgNCkpKVxuICAgICAgICAgICAgd2hlbiAnVSdcbiAgICAgICAgICAgICAgICByZXR1cm4gVXRpbHMudXRmOGNocihVdGlscy5oZXhEZWModmFsdWUuc3Vic3RyKDIsIDgpKSlcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZXR1cm4gJydcblxubW9kdWxlLmV4cG9ydHMgPSBVbmVzY2FwZXJcbiIsIlxuUGF0dGVybiA9IHJlcXVpcmUgJy4vUGF0dGVybidcblxuIyBBIGJ1bmNoIG9mIHV0aWxpdHkgbWV0aG9kc1xuI1xuY2xhc3MgVXRpbHNcblxuICAgIEBSRUdFWF9MRUZUX1RSSU1fQllfQ0hBUjogICB7fVxuICAgIEBSRUdFWF9SSUdIVF9UUklNX0JZX0NIQVI6ICB7fVxuICAgIEBSRUdFWF9TUEFDRVM6ICAgICAgICAgICAgICAvXFxzKy9nXG4gICAgQFJFR0VYX0RJR0lUUzogICAgICAgICAgICAgIC9eXFxkKyQvXG4gICAgQFJFR0VYX09DVEFMOiAgICAgICAgICAgICAgIC9bXjAtN10vZ2lcbiAgICBAUkVHRVhfSEVYQURFQ0lNQUw6ICAgICAgICAgL1teYS1mMC05XS9naVxuXG4gICAgIyBQcmVjb21waWxlZCBkYXRlIHBhdHRlcm5cbiAgICBAUEFUVEVSTl9EQVRFOiAgICAgICAgICAgICAgbmV3IFBhdHRlcm4gJ14nK1xuICAgICAgICAgICAgJyg/PHllYXI+WzAtOV1bMC05XVswLTldWzAtOV0pJytcbiAgICAgICAgICAgICctKD88bW9udGg+WzAtOV1bMC05XT8pJytcbiAgICAgICAgICAgICctKD88ZGF5PlswLTldWzAtOV0/KScrXG4gICAgICAgICAgICAnKD86KD86W1R0XXxbIFxcdF0rKScrXG4gICAgICAgICAgICAnKD88aG91cj5bMC05XVswLTldPyknK1xuICAgICAgICAgICAgJzooPzxtaW51dGU+WzAtOV1bMC05XSknK1xuICAgICAgICAgICAgJzooPzxzZWNvbmQ+WzAtOV1bMC05XSknK1xuICAgICAgICAgICAgJyg/OlxcLig/PGZyYWN0aW9uPlswLTldKikpPycrXG4gICAgICAgICAgICAnKD86WyBcXHRdKig/PHR6Plp8KD88dHpfc2lnbj5bLStdKSg/PHR6X2hvdXI+WzAtOV1bMC05XT8pJytcbiAgICAgICAgICAgICcoPzo6KD88dHpfbWludXRlPlswLTldWzAtOV0pKT8pKT8pPycrXG4gICAgICAgICAgICAnJCcsICdpJ1xuXG4gICAgIyBMb2NhbCB0aW1lem9uZSBvZmZzZXQgaW4gbXNcbiAgICBATE9DQUxfVElNRVpPTkVfT0ZGU0VUOiAgICAgbmV3IERhdGUoKS5nZXRUaW1lem9uZU9mZnNldCgpICogNjAgKiAxMDAwXG5cbiAgICAjIFRyaW1zIHRoZSBnaXZlbiBzdHJpbmcgb24gYm90aCBzaWRlc1xuICAgICNcbiAgICAjIEBwYXJhbSBbU3RyaW5nXSBzdHIgVGhlIHN0cmluZyB0byB0cmltXG4gICAgIyBAcGFyYW0gW1N0cmluZ10gY2hhciBUaGUgY2hhcmFjdGVyIHRvIHVzZSBmb3IgdHJpbW1pbmcgKGRlZmF1bHQ6ICdcXFxccycpXG4gICAgI1xuICAgICMgQHJldHVybiBbU3RyaW5nXSBBIHRyaW1tZWQgc3RyaW5nXG4gICAgI1xuICAgIEB0cmltOiAoc3RyLCBjaGFyID0gJ1xcXFxzJykgLT5cbiAgICAgICAgcmV0dXJuIHN0ci50cmltKClcbiAgICAgICAgcmVnZXhMZWZ0ID0gQFJFR0VYX0xFRlRfVFJJTV9CWV9DSEFSW2NoYXJdXG4gICAgICAgIHVubGVzcyByZWdleExlZnQ/XG4gICAgICAgICAgICBAUkVHRVhfTEVGVF9UUklNX0JZX0NIQVJbY2hhcl0gPSByZWdleExlZnQgPSBuZXcgUmVnRXhwICdeJytjaGFyKycnK2NoYXIrJyonXG4gICAgICAgIHJlZ2V4TGVmdC5sYXN0SW5kZXggPSAwXG4gICAgICAgIHJlZ2V4UmlnaHQgPSBAUkVHRVhfUklHSFRfVFJJTV9CWV9DSEFSW2NoYXJdXG4gICAgICAgIHVubGVzcyByZWdleFJpZ2h0P1xuICAgICAgICAgICAgQFJFR0VYX1JJR0hUX1RSSU1fQllfQ0hBUltjaGFyXSA9IHJlZ2V4UmlnaHQgPSBuZXcgUmVnRXhwIGNoYXIrJycrY2hhcisnKiQnXG4gICAgICAgIHJlZ2V4UmlnaHQubGFzdEluZGV4ID0gMFxuICAgICAgICByZXR1cm4gc3RyLnJlcGxhY2UocmVnZXhMZWZ0LCAnJykucmVwbGFjZShyZWdleFJpZ2h0LCAnJylcblxuXG4gICAgIyBUcmltcyB0aGUgZ2l2ZW4gc3RyaW5nIG9uIHRoZSBsZWZ0IHNpZGVcbiAgICAjXG4gICAgIyBAcGFyYW0gW1N0cmluZ10gc3RyIFRoZSBzdHJpbmcgdG8gdHJpbVxuICAgICMgQHBhcmFtIFtTdHJpbmddIGNoYXIgVGhlIGNoYXJhY3RlciB0byB1c2UgZm9yIHRyaW1taW5nIChkZWZhdWx0OiAnXFxcXHMnKVxuICAgICNcbiAgICAjIEByZXR1cm4gW1N0cmluZ10gQSB0cmltbWVkIHN0cmluZ1xuICAgICNcbiAgICBAbHRyaW06IChzdHIsIGNoYXIgPSAnXFxcXHMnKSAtPlxuICAgICAgICByZWdleExlZnQgPSBAUkVHRVhfTEVGVF9UUklNX0JZX0NIQVJbY2hhcl1cbiAgICAgICAgdW5sZXNzIHJlZ2V4TGVmdD9cbiAgICAgICAgICAgIEBSRUdFWF9MRUZUX1RSSU1fQllfQ0hBUltjaGFyXSA9IHJlZ2V4TGVmdCA9IG5ldyBSZWdFeHAgJ14nK2NoYXIrJycrY2hhcisnKidcbiAgICAgICAgcmVnZXhMZWZ0Lmxhc3RJbmRleCA9IDBcbiAgICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlKHJlZ2V4TGVmdCwgJycpXG5cblxuICAgICMgVHJpbXMgdGhlIGdpdmVuIHN0cmluZyBvbiB0aGUgcmlnaHQgc2lkZVxuICAgICNcbiAgICAjIEBwYXJhbSBbU3RyaW5nXSBzdHIgVGhlIHN0cmluZyB0byB0cmltXG4gICAgIyBAcGFyYW0gW1N0cmluZ10gY2hhciBUaGUgY2hhcmFjdGVyIHRvIHVzZSBmb3IgdHJpbW1pbmcgKGRlZmF1bHQ6ICdcXFxccycpXG4gICAgI1xuICAgICMgQHJldHVybiBbU3RyaW5nXSBBIHRyaW1tZWQgc3RyaW5nXG4gICAgI1xuICAgIEBydHJpbTogKHN0ciwgY2hhciA9ICdcXFxccycpIC0+XG4gICAgICAgIHJlZ2V4UmlnaHQgPSBAUkVHRVhfUklHSFRfVFJJTV9CWV9DSEFSW2NoYXJdXG4gICAgICAgIHVubGVzcyByZWdleFJpZ2h0P1xuICAgICAgICAgICAgQFJFR0VYX1JJR0hUX1RSSU1fQllfQ0hBUltjaGFyXSA9IHJlZ2V4UmlnaHQgPSBuZXcgUmVnRXhwIGNoYXIrJycrY2hhcisnKiQnXG4gICAgICAgIHJlZ2V4UmlnaHQubGFzdEluZGV4ID0gMFxuICAgICAgICByZXR1cm4gc3RyLnJlcGxhY2UocmVnZXhSaWdodCwgJycpXG5cblxuICAgICMgQ2hlY2tzIGlmIHRoZSBnaXZlbiB2YWx1ZSBpcyBlbXB0eSAobnVsbCwgdW5kZWZpbmVkLCBlbXB0eSBzdHJpbmcsIHN0cmluZyAnMCcpXG4gICAgI1xuICAgICMgQHBhcmFtIFtPYmplY3RdIHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVja1xuICAgICNcbiAgICAjIEByZXR1cm4gW0Jvb2xlYW5dIHRydWUgaWYgdGhlIHZhbHVlIGlzIGVtcHR5XG4gICAgI1xuICAgIEBpc0VtcHR5OiAodmFsdWUpIC0+XG4gICAgICAgIHJldHVybiBub3QodmFsdWUpIG9yIHZhbHVlIGlzICcnIG9yIHZhbHVlIGlzICcwJ1xuXG5cbiAgICAjIENvdW50cyB0aGUgbnVtYmVyIG9mIG9jY3VyZW5jZXMgb2Ygc3ViU3RyaW5nIGluc2lkZSBzdHJpbmdcbiAgICAjXG4gICAgIyBAcGFyYW0gW1N0cmluZ10gc3RyaW5nIFRoZSBzdHJpbmcgd2hlcmUgdG8gY291bnQgb2NjdXJlbmNlc1xuICAgICMgQHBhcmFtIFtTdHJpbmddIHN1YlN0cmluZyBUaGUgc3ViU3RyaW5nIHRvIGNvdW50XG4gICAgIyBAcGFyYW0gW0ludGVnZXJdIHN0YXJ0IFRoZSBzdGFydCBpbmRleFxuICAgICMgQHBhcmFtIFtJbnRlZ2VyXSBsZW5ndGggVGhlIHN0cmluZyBsZW5ndGggdW50aWwgd2hlcmUgdG8gY291bnRcbiAgICAjXG4gICAgIyBAcmV0dXJuIFtJbnRlZ2VyXSBUaGUgbnVtYmVyIG9mIG9jY3VyZW5jZXNcbiAgICAjXG4gICAgQHN1YlN0ckNvdW50OiAoc3RyaW5nLCBzdWJTdHJpbmcsIHN0YXJ0LCBsZW5ndGgpIC0+XG4gICAgICAgIGMgPSAwXG4gICAgICAgIFxuICAgICAgICBzdHJpbmcgPSAnJyArIHN0cmluZ1xuICAgICAgICBzdWJTdHJpbmcgPSAnJyArIHN1YlN0cmluZ1xuICAgICAgICBcbiAgICAgICAgaWYgc3RhcnQ/XG4gICAgICAgICAgICBzdHJpbmcgPSBzdHJpbmdbc3RhcnQuLl1cbiAgICAgICAgaWYgbGVuZ3RoP1xuICAgICAgICAgICAgc3RyaW5nID0gc3RyaW5nWzAuLi5sZW5ndGhdXG4gICAgICAgIFxuICAgICAgICBsZW4gPSBzdHJpbmcubGVuZ3RoXG4gICAgICAgIHN1YmxlbiA9IHN1YlN0cmluZy5sZW5ndGhcbiAgICAgICAgZm9yIGkgaW4gWzAuLi5sZW5dXG4gICAgICAgICAgICBpZiBzdWJTdHJpbmcgaXMgc3RyaW5nW2kuLi5zdWJsZW5dXG4gICAgICAgICAgICAgICAgYysrXG4gICAgICAgICAgICAgICAgaSArPSBzdWJsZW4gLSAxXG4gICAgICAgIFxuICAgICAgICByZXR1cm4gY1xuXG5cbiAgICAjIFJldHVybnMgdHJ1ZSBpZiBpbnB1dCBpcyBvbmx5IGNvbXBvc2VkIG9mIGRpZ2l0c1xuICAgICNcbiAgICAjIEBwYXJhbSBbT2JqZWN0XSBpbnB1dCBUaGUgdmFsdWUgdG8gdGVzdFxuICAgICNcbiAgICAjIEByZXR1cm4gW0Jvb2xlYW5dIHRydWUgaWYgaW5wdXQgaXMgb25seSBjb21wb3NlZCBvZiBkaWdpdHNcbiAgICAjXG4gICAgQGlzRGlnaXRzOiAoaW5wdXQpIC0+XG4gICAgICAgIEBSRUdFWF9ESUdJVFMubGFzdEluZGV4ID0gMFxuICAgICAgICByZXR1cm4gQFJFR0VYX0RJR0lUUy50ZXN0IGlucHV0XG5cblxuICAgICMgRGVjb2RlIG9jdGFsIHZhbHVlXG4gICAgI1xuICAgICMgQHBhcmFtIFtTdHJpbmddIGlucHV0IFRoZSB2YWx1ZSB0byBkZWNvZGVcbiAgICAjXG4gICAgIyBAcmV0dXJuIFtJbnRlZ2VyXSBUaGUgZGVjb2RlZCB2YWx1ZVxuICAgICNcbiAgICBAb2N0RGVjOiAoaW5wdXQpIC0+XG4gICAgICAgIEBSRUdFWF9PQ1RBTC5sYXN0SW5kZXggPSAwXG4gICAgICAgIHJldHVybiBwYXJzZUludCgoaW5wdXQrJycpLnJlcGxhY2UoQFJFR0VYX09DVEFMLCAnJyksIDgpXG5cblxuICAgICMgRGVjb2RlIGhleGFkZWNpbWFsIHZhbHVlXG4gICAgI1xuICAgICMgQHBhcmFtIFtTdHJpbmddIGlucHV0IFRoZSB2YWx1ZSB0byBkZWNvZGVcbiAgICAjXG4gICAgIyBAcmV0dXJuIFtJbnRlZ2VyXSBUaGUgZGVjb2RlZCB2YWx1ZVxuICAgICNcbiAgICBAaGV4RGVjOiAoaW5wdXQpIC0+XG4gICAgICAgIEBSRUdFWF9IRVhBREVDSU1BTC5sYXN0SW5kZXggPSAwXG4gICAgICAgIGlucHV0ID0gQHRyaW0oaW5wdXQpXG4gICAgICAgIGlmIChpbnB1dCsnJylbMC4uLjJdIGlzICcweCcgdGhlbiBpbnB1dCA9IChpbnB1dCsnJylbMi4uXVxuICAgICAgICByZXR1cm4gcGFyc2VJbnQoKGlucHV0KycnKS5yZXBsYWNlKEBSRUdFWF9IRVhBREVDSU1BTCwgJycpLCAxNilcblxuXG4gICAgIyBHZXQgdGhlIFVURi04IGNoYXJhY3RlciBmb3IgdGhlIGdpdmVuIGNvZGUgcG9pbnQuXG4gICAgI1xuICAgICMgQHBhcmFtIFtJbnRlZ2VyXSBjIFRoZSB1bmljb2RlIGNvZGUgcG9pbnRcbiAgICAjXG4gICAgIyBAcmV0dXJuIFtTdHJpbmddIFRoZSBjb3JyZXNwb25kaW5nIFVURi04IGNoYXJhY3RlclxuICAgICNcbiAgICBAdXRmOGNocjogKGMpIC0+XG4gICAgICAgIGNoID0gU3RyaW5nLmZyb21DaGFyQ29kZVxuICAgICAgICBpZiAweDgwID4gKGMgJT0gMHgyMDAwMDApXG4gICAgICAgICAgICByZXR1cm4gY2goYylcbiAgICAgICAgaWYgMHg4MDAgPiBjXG4gICAgICAgICAgICByZXR1cm4gY2goMHhDMCB8IGM+PjYpICsgY2goMHg4MCB8IGMgJiAweDNGKVxuICAgICAgICBpZiAweDEwMDAwID4gY1xuICAgICAgICAgICAgcmV0dXJuIGNoKDB4RTAgfCBjPj4xMikgKyBjaCgweDgwIHwgYz4+NiAmIDB4M0YpICsgY2goMHg4MCB8IGMgJiAweDNGKVxuXG4gICAgICAgIHJldHVybiBjaCgweEYwIHwgYz4+MTgpICsgY2goMHg4MCB8IGM+PjEyICYgMHgzRikgKyBjaCgweDgwIHwgYz4+NiAmIDB4M0YpICsgY2goMHg4MCB8IGMgJiAweDNGKVxuXG5cbiAgICAjIFJldHVybnMgdGhlIGJvb2xlYW4gdmFsdWUgZXF1aXZhbGVudCB0byB0aGUgZ2l2ZW4gaW5wdXRcbiAgICAjXG4gICAgIyBAcGFyYW0gW1N0cmluZ3xPYmplY3RdICAgIGlucHV0ICAgICAgIFRoZSBpbnB1dCB2YWx1ZVxuICAgICMgQHBhcmFtIFtCb29sZWFuXSAgICAgICAgICBzdHJpY3QgICAgICBJZiBzZXQgdG8gZmFsc2UsIGFjY2VwdCAneWVzJyBhbmQgJ25vJyBhcyBib29sZWFuIHZhbHVlc1xuICAgICNcbiAgICAjIEByZXR1cm4gW0Jvb2xlYW5dICAgICAgICAgdGhlIGJvb2xlYW4gdmFsdWVcbiAgICAjXG4gICAgQHBhcnNlQm9vbGVhbjogKGlucHV0LCBzdHJpY3QgPSB0cnVlKSAtPlxuICAgICAgICBpZiB0eXBlb2YoaW5wdXQpIGlzICdzdHJpbmcnXG4gICAgICAgICAgICBsb3dlcklucHV0ID0gaW5wdXQudG9Mb3dlckNhc2UoKVxuICAgICAgICAgICAgaWYgbm90IHN0cmljdFxuICAgICAgICAgICAgICAgIGlmIGxvd2VySW5wdXQgaXMgJ25vJyB0aGVuIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgaWYgbG93ZXJJbnB1dCBpcyAnMCcgdGhlbiByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIGlmIGxvd2VySW5wdXQgaXMgJ2ZhbHNlJyB0aGVuIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgaWYgbG93ZXJJbnB1dCBpcyAnJyB0aGVuIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgcmV0dXJuICEhaW5wdXRcblxuXG5cbiAgICAjIFJldHVybnMgdHJ1ZSBpZiBpbnB1dCBpcyBudW1lcmljXG4gICAgI1xuICAgICMgQHBhcmFtIFtPYmplY3RdIGlucHV0IFRoZSB2YWx1ZSB0byB0ZXN0XG4gICAgI1xuICAgICMgQHJldHVybiBbQm9vbGVhbl0gdHJ1ZSBpZiBpbnB1dCBpcyBudW1lcmljXG4gICAgI1xuICAgIEBpc051bWVyaWM6IChpbnB1dCkgLT5cbiAgICAgICAgQFJFR0VYX1NQQUNFUy5sYXN0SW5kZXggPSAwXG4gICAgICAgIHJldHVybiB0eXBlb2YoaW5wdXQpIGlzICdudW1iZXInIG9yIHR5cGVvZihpbnB1dCkgaXMgJ3N0cmluZycgYW5kICFpc05hTihpbnB1dCkgYW5kIGlucHV0LnJlcGxhY2UoQFJFR0VYX1NQQUNFUywgJycpIGlzbnQgJydcblxuXG4gICAgIyBSZXR1cm5zIGEgcGFyc2VkIGRhdGUgZnJvbSB0aGUgZ2l2ZW4gc3RyaW5nXG4gICAgI1xuICAgICMgQHBhcmFtIFtTdHJpbmddIHN0ciBUaGUgZGF0ZSBzdHJpbmcgdG8gcGFyc2VcbiAgICAjXG4gICAgIyBAcmV0dXJuIFtEYXRlXSBUaGUgcGFyc2VkIGRhdGUgb3IgbnVsbCBpZiBwYXJzaW5nIGZhaWxlZFxuICAgICNcbiAgICBAc3RyaW5nVG9EYXRlOiAoc3RyKSAtPlxuICAgICAgICB1bmxlc3Mgc3RyPy5sZW5ndGhcbiAgICAgICAgICAgIHJldHVybiBudWxsXG5cbiAgICAgICAgIyBQZXJmb3JtIHJlZ3VsYXIgZXhwcmVzc2lvbiBwYXR0ZXJuXG4gICAgICAgIGluZm8gPSBAUEFUVEVSTl9EQVRFLmV4ZWMgc3RyXG4gICAgICAgIHVubGVzcyBpbmZvXG4gICAgICAgICAgICByZXR1cm4gbnVsbFxuXG4gICAgICAgICMgRXh0cmFjdCB5ZWFyLCBtb250aCwgZGF5XG4gICAgICAgIHllYXIgPSBwYXJzZUludCBpbmZvLnllYXIsIDEwXG4gICAgICAgIG1vbnRoID0gcGFyc2VJbnQoaW5mby5tb250aCwgMTApIC0gMSAjIEluIGphdmFzY3JpcHQsIGphbnVhcnkgaXMgMCwgZmVicnVhcnkgMSwgZXRjLi4uXG4gICAgICAgIGRheSA9IHBhcnNlSW50IGluZm8uZGF5LCAxMFxuXG4gICAgICAgICMgSWYgbm8gaG91ciBpcyBnaXZlbiwgcmV0dXJuIGEgZGF0ZSB3aXRoIGRheSBwcmVjaXNpb25cbiAgICAgICAgdW5sZXNzIGluZm8uaG91cj9cbiAgICAgICAgICAgIGRhdGUgPSBuZXcgRGF0ZSBEYXRlLlVUQyh5ZWFyLCBtb250aCwgZGF5KVxuICAgICAgICAgICAgcmV0dXJuIGRhdGVcblxuICAgICAgICAjIEV4dHJhY3QgaG91ciwgbWludXRlLCBzZWNvbmRcbiAgICAgICAgaG91ciA9IHBhcnNlSW50IGluZm8uaG91ciwgMTBcbiAgICAgICAgbWludXRlID0gcGFyc2VJbnQgaW5mby5taW51dGUsIDEwXG4gICAgICAgIHNlY29uZCA9IHBhcnNlSW50IGluZm8uc2Vjb25kLCAxMFxuXG4gICAgICAgICMgRXh0cmFjdCBmcmFjdGlvbiwgaWYgZ2l2ZW5cbiAgICAgICAgaWYgaW5mby5mcmFjdGlvbj9cbiAgICAgICAgICAgIGZyYWN0aW9uID0gaW5mby5mcmFjdGlvblswLi4uM11cbiAgICAgICAgICAgIHdoaWxlIGZyYWN0aW9uLmxlbmd0aCA8IDNcbiAgICAgICAgICAgICAgICBmcmFjdGlvbiArPSAnMCdcbiAgICAgICAgICAgIGZyYWN0aW9uID0gcGFyc2VJbnQgZnJhY3Rpb24sIDEwXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGZyYWN0aW9uID0gMFxuXG4gICAgICAgICMgQ29tcHV0ZSB0aW1lem9uZSBvZmZzZXQgaWYgZ2l2ZW5cbiAgICAgICAgaWYgaW5mby50ej9cbiAgICAgICAgICAgIHR6X2hvdXIgPSBwYXJzZUludCBpbmZvLnR6X2hvdXIsIDEwXG4gICAgICAgICAgICBpZiBpbmZvLnR6X21pbnV0ZT9cbiAgICAgICAgICAgICAgICB0el9taW51dGUgPSBwYXJzZUludCBpbmZvLnR6X21pbnV0ZSwgMTBcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICB0el9taW51dGUgPSAwXG5cbiAgICAgICAgICAgICMgQ29tcHV0ZSB0aW1lem9uZSBkZWx0YSBpbiBtc1xuICAgICAgICAgICAgdHpfb2Zmc2V0ID0gKHR6X2hvdXIgKiA2MCArIHR6X21pbnV0ZSkgKiA2MDAwMFxuICAgICAgICAgICAgaWYgJy0nIGlzIGluZm8udHpfc2lnblxuICAgICAgICAgICAgICAgIHR6X29mZnNldCAqPSAtMVxuXG4gICAgICAgICMgQ29tcHV0ZSBkYXRlXG4gICAgICAgIGRhdGUgPSBuZXcgRGF0ZSBEYXRlLlVUQyh5ZWFyLCBtb250aCwgZGF5LCBob3VyLCBtaW51dGUsIHNlY29uZCwgZnJhY3Rpb24pXG4gICAgICAgIGlmIHR6X29mZnNldFxuICAgICAgICAgICAgZGF0ZS5zZXRUaW1lIGRhdGUuZ2V0VGltZSgpICsgdHpfb2Zmc2V0XG5cbiAgICAgICAgcmV0dXJuIGRhdGVcblxuXG4gICAgIyBSZXBlYXRzIHRoZSBnaXZlbiBzdHJpbmcgYSBudW1iZXIgb2YgdGltZXNcbiAgICAjXG4gICAgIyBAcGFyYW0gW1N0cmluZ10gICBzdHIgICAgIFRoZSBzdHJpbmcgdG8gcmVwZWF0XG4gICAgIyBAcGFyYW0gW0ludGVnZXJdICBudW1iZXIgIFRoZSBudW1iZXIgb2YgdGltZXMgdG8gcmVwZWF0IHRoZSBzdHJpbmdcbiAgICAjXG4gICAgIyBAcmV0dXJuIFtTdHJpbmddICBUaGUgcmVwZWF0ZWQgc3RyaW5nXG4gICAgI1xuICAgIEBzdHJSZXBlYXQ6IChzdHIsIG51bWJlcikgLT5cbiAgICAgICAgcmVzID0gJydcbiAgICAgICAgaSA9IDBcbiAgICAgICAgd2hpbGUgaSA8IG51bWJlclxuICAgICAgICAgICAgcmVzICs9IHN0clxuICAgICAgICAgICAgaSsrXG4gICAgICAgIHJldHVybiByZXNcblxuXG4gICAgIyBSZWFkcyB0aGUgZGF0YSBmcm9tIHRoZSBnaXZlbiBmaWxlIHBhdGggYW5kIHJldHVybnMgdGhlIHJlc3VsdCBhcyBzdHJpbmdcbiAgICAjXG4gICAgIyBAcGFyYW0gW1N0cmluZ10gICBwYXRoICAgICAgICBUaGUgcGF0aCB0byB0aGUgZmlsZVxuICAgICMgQHBhcmFtIFtGdW5jdGlvbl0gY2FsbGJhY2sgICAgQSBjYWxsYmFjayB0byByZWFkIGZpbGUgYXN5bmNocm9ub3VzbHkgKG9wdGlvbmFsKVxuICAgICNcbiAgICAjIEByZXR1cm4gW1N0cmluZ10gIFRoZSByZXN1bHRpbmcgZGF0YSBhcyBzdHJpbmdcbiAgICAjXG4gICAgQGdldFN0cmluZ0Zyb21GaWxlOiAocGF0aCwgY2FsbGJhY2sgPSBudWxsKSAtPlxuICAgICAgICB4aHIgPSBudWxsXG4gICAgICAgIGlmIHdpbmRvdz9cbiAgICAgICAgICAgIGlmIHdpbmRvdy5YTUxIdHRwUmVxdWVzdFxuICAgICAgICAgICAgICAgIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpXG4gICAgICAgICAgICBlbHNlIGlmIHdpbmRvdy5BY3RpdmVYT2JqZWN0XG4gICAgICAgICAgICAgICAgZm9yIG5hbWUgaW4gW1wiTXN4bWwyLlhNTEhUVFAuNi4wXCIsIFwiTXN4bWwyLlhNTEhUVFAuMy4wXCIsIFwiTXN4bWwyLlhNTEhUVFBcIiwgXCJNaWNyb3NvZnQuWE1MSFRUUFwiXVxuICAgICAgICAgICAgICAgICAgICB0cnlcbiAgICAgICAgICAgICAgICAgICAgICAgIHhociA9IG5ldyBBY3RpdmVYT2JqZWN0KG5hbWUpXG5cbiAgICAgICAgaWYgeGhyP1xuICAgICAgICAgICAgIyBCcm93c2VyXG4gICAgICAgICAgICBpZiBjYWxsYmFjaz9cbiAgICAgICAgICAgICAgICAjIEFzeW5jXG4gICAgICAgICAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IC0+XG4gICAgICAgICAgICAgICAgICAgIGlmIHhoci5yZWFkeVN0YXRlIGlzIDRcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIHhoci5zdGF0dXMgaXMgMjAwIG9yIHhoci5zdGF0dXMgaXMgMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKHhoci5yZXNwb25zZVRleHQpXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbClcbiAgICAgICAgICAgICAgICB4aHIub3BlbiAnR0VUJywgcGF0aCwgdHJ1ZVxuICAgICAgICAgICAgICAgIHhoci5zZW5kIG51bGxcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICMgU3luY1xuICAgICAgICAgICAgICAgIHhoci5vcGVuICdHRVQnLCBwYXRoLCBmYWxzZVxuICAgICAgICAgICAgICAgIHhoci5zZW5kIG51bGxcblxuICAgICAgICAgICAgICAgIGlmIHhoci5zdGF0dXMgaXMgMjAwIG9yIHhoci5zdGF0dXMgPT0gMFxuICAgICAgICAgICAgICAgICAgICByZXR1cm4geGhyLnJlc3BvbnNlVGV4dFxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgIyBOb2RlLmpzLWxpa2VcbiAgICAgICAgICAgIHJlcSA9IHJlcXVpcmVcbiAgICAgICAgICAgIGZzID0gcmVxKCdmcycpICMgUHJldmVudCBicm93c2VyaWZ5IGZyb20gdHJ5aW5nIHRvIGxvYWQgJ2ZzJyBtb2R1bGVcbiAgICAgICAgICAgIGlmIGNhbGxiYWNrP1xuICAgICAgICAgICAgICAgICMgQXN5bmNcbiAgICAgICAgICAgICAgICBmcy5yZWFkRmlsZSBwYXRoLCAoZXJyLCBkYXRhKSAtPlxuICAgICAgICAgICAgICAgICAgICBpZiBlcnJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrIG51bGxcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sgU3RyaW5nKGRhdGEpXG5cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAjIFN5bmNcbiAgICAgICAgICAgICAgICBkYXRhID0gZnMucmVhZEZpbGVTeW5jIHBhdGhcbiAgICAgICAgICAgICAgICBpZiBkYXRhP1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gU3RyaW5nKGRhdGEpXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGxcblxuXG5cbm1vZHVsZS5leHBvcnRzID0gVXRpbHNcbiIsIlxuUGFyc2VyID0gcmVxdWlyZSAnLi9QYXJzZXInXG5EdW1wZXIgPSByZXF1aXJlICcuL0R1bXBlcidcblV0aWxzICA9IHJlcXVpcmUgJy4vVXRpbHMnXG5cbiMgWWFtbCBvZmZlcnMgY29udmVuaWVuY2UgbWV0aG9kcyB0byBsb2FkIGFuZCBkdW1wIFlBTUwuXG4jXG5jbGFzcyBZYW1sXG5cbiAgICAjIFBhcnNlcyBZQU1MIGludG8gYSBKYXZhU2NyaXB0IG9iamVjdC5cbiAgICAjXG4gICAgIyBUaGUgcGFyc2UgbWV0aG9kLCB3aGVuIHN1cHBsaWVkIHdpdGggYSBZQU1MIHN0cmluZyxcbiAgICAjIHdpbGwgZG8gaXRzIGJlc3QgdG8gY29udmVydCBZQU1MIGluIGEgZmlsZSBpbnRvIGEgSmF2YVNjcmlwdCBvYmplY3QuXG4gICAgI1xuICAgICMgIFVzYWdlOlxuICAgICMgICAgIG15T2JqZWN0ID0gWWFtbC5wYXJzZSgnc29tZTogeWFtbCcpO1xuICAgICMgICAgIGNvbnNvbGUubG9nKG15T2JqZWN0KTtcbiAgICAjXG4gICAgIyBAcGFyYW0gW1N0cmluZ10gICBpbnB1dCAgICAgICAgICAgICAgICAgICBBIHN0cmluZyBjb250YWluaW5nIFlBTUxcbiAgICAjIEBwYXJhbSBbQm9vbGVhbl0gIGV4Y2VwdGlvbk9uSW52YWxpZFR5cGUgIHRydWUgaWYgYW4gZXhjZXB0aW9uIG11c3QgYmUgdGhyb3duIG9uIGludmFsaWQgdHlwZXMsIGZhbHNlIG90aGVyd2lzZVxuICAgICMgQHBhcmFtIFtGdW5jdGlvbl0gb2JqZWN0RGVjb2RlciAgICAgICAgICAgQSBmdW5jdGlvbiB0byBkZXNlcmlhbGl6ZSBjdXN0b20gb2JqZWN0cywgbnVsbCBvdGhlcndpc2VcbiAgICAjXG4gICAgIyBAcmV0dXJuIFtPYmplY3RdICBUaGUgWUFNTCBjb252ZXJ0ZWQgdG8gYSBKYXZhU2NyaXB0IG9iamVjdFxuICAgICNcbiAgICAjIEB0aHJvdyBbUGFyc2VFeGNlcHRpb25dIElmIHRoZSBZQU1MIGlzIG5vdCB2YWxpZFxuICAgICNcbiAgICBAcGFyc2U6IChpbnB1dCwgZXhjZXB0aW9uT25JbnZhbGlkVHlwZSA9IGZhbHNlLCBvYmplY3REZWNvZGVyID0gbnVsbCkgLT5cbiAgICAgICAgcmV0dXJuIG5ldyBQYXJzZXIoKS5wYXJzZShpbnB1dCwgZXhjZXB0aW9uT25JbnZhbGlkVHlwZSwgb2JqZWN0RGVjb2RlcilcblxuXG4gICAgIyBQYXJzZXMgWUFNTCBmcm9tIGZpbGUgcGF0aCBpbnRvIGEgSmF2YVNjcmlwdCBvYmplY3QuXG4gICAgI1xuICAgICMgVGhlIHBhcnNlRmlsZSBtZXRob2QsIHdoZW4gc3VwcGxpZWQgd2l0aCBhIFlBTUwgZmlsZSxcbiAgICAjIHdpbGwgZG8gaXRzIGJlc3QgdG8gY29udmVydCBZQU1MIGluIGEgZmlsZSBpbnRvIGEgSmF2YVNjcmlwdCBvYmplY3QuXG4gICAgI1xuICAgICMgIFVzYWdlOlxuICAgICMgICAgIG15T2JqZWN0ID0gWWFtbC5wYXJzZUZpbGUoJ2NvbmZpZy55bWwnKTtcbiAgICAjICAgICBjb25zb2xlLmxvZyhteU9iamVjdCk7XG4gICAgI1xuICAgICMgQHBhcmFtIFtTdHJpbmddICAgcGF0aCAgICAgICAgICAgICAgICAgICAgQSBmaWxlIHBhdGggcG9pbnRpbmcgdG8gYSB2YWxpZCBZQU1MIGZpbGVcbiAgICAjIEBwYXJhbSBbQm9vbGVhbl0gIGV4Y2VwdGlvbk9uSW52YWxpZFR5cGUgIHRydWUgaWYgYW4gZXhjZXB0aW9uIG11c3QgYmUgdGhyb3duIG9uIGludmFsaWQgdHlwZXMsIGZhbHNlIG90aGVyd2lzZVxuICAgICMgQHBhcmFtIFtGdW5jdGlvbl0gb2JqZWN0RGVjb2RlciAgICAgICAgICAgQSBmdW5jdGlvbiB0byBkZXNlcmlhbGl6ZSBjdXN0b20gb2JqZWN0cywgbnVsbCBvdGhlcndpc2VcbiAgICAjXG4gICAgIyBAcmV0dXJuIFtPYmplY3RdICBUaGUgWUFNTCBjb252ZXJ0ZWQgdG8gYSBKYXZhU2NyaXB0IG9iamVjdCBvciBudWxsIGlmIHRoZSBmaWxlIGRvZXNuJ3QgZXhpc3QuXG4gICAgI1xuICAgICMgQHRocm93IFtQYXJzZUV4Y2VwdGlvbl0gSWYgdGhlIFlBTUwgaXMgbm90IHZhbGlkXG4gICAgI1xuICAgIEBwYXJzZUZpbGU6IChwYXRoLCBjYWxsYmFjayA9IG51bGwsIGV4Y2VwdGlvbk9uSW52YWxpZFR5cGUgPSBmYWxzZSwgb2JqZWN0RGVjb2RlciA9IG51bGwpIC0+XG4gICAgICAgIGlmIGNhbGxiYWNrP1xuICAgICAgICAgICAgIyBBc3luY1xuICAgICAgICAgICAgVXRpbHMuZ2V0U3RyaW5nRnJvbUZpbGUgcGF0aCwgKGlucHV0KSA9PlxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IG51bGxcbiAgICAgICAgICAgICAgICBpZiBpbnB1dD9cbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gQHBhcnNlIGlucHV0LCBleGNlcHRpb25PbkludmFsaWRUeXBlLCBvYmplY3REZWNvZGVyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgcmVzdWx0XG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgICMgU3luY1xuICAgICAgICAgICAgaW5wdXQgPSBVdGlscy5nZXRTdHJpbmdGcm9tRmlsZSBwYXRoXG4gICAgICAgICAgICBpZiBpbnB1dD9cbiAgICAgICAgICAgICAgICByZXR1cm4gQHBhcnNlIGlucHV0LCBleGNlcHRpb25PbkludmFsaWRUeXBlLCBvYmplY3REZWNvZGVyXG4gICAgICAgICAgICByZXR1cm4gbnVsbFxuXG5cbiAgICAjIER1bXBzIGEgSmF2YVNjcmlwdCBvYmplY3QgdG8gYSBZQU1MIHN0cmluZy5cbiAgICAjXG4gICAgIyBUaGUgZHVtcCBtZXRob2QsIHdoZW4gc3VwcGxpZWQgd2l0aCBhbiBvYmplY3QsIHdpbGwgZG8gaXRzIGJlc3RcbiAgICAjIHRvIGNvbnZlcnQgdGhlIG9iamVjdCBpbnRvIGZyaWVuZGx5IFlBTUwuXG4gICAgI1xuICAgICMgQHBhcmFtIFtPYmplY3RdICAgaW5wdXQgICAgICAgICAgICAgICAgICAgSmF2YVNjcmlwdCBvYmplY3RcbiAgICAjIEBwYXJhbSBbSW50ZWdlcl0gIGlubGluZSAgICAgICAgICAgICAgICAgIFRoZSBsZXZlbCB3aGVyZSB5b3Ugc3dpdGNoIHRvIGlubGluZSBZQU1MXG4gICAgIyBAcGFyYW0gW0ludGVnZXJdICBpbmRlbnQgICAgICAgICAgICAgICAgICBUaGUgYW1vdW50IG9mIHNwYWNlcyB0byB1c2UgZm9yIGluZGVudGF0aW9uIG9mIG5lc3RlZCBub2Rlcy5cbiAgICAjIEBwYXJhbSBbQm9vbGVhbl0gIGV4Y2VwdGlvbk9uSW52YWxpZFR5cGUgIHRydWUgaWYgYW4gZXhjZXB0aW9uIG11c3QgYmUgdGhyb3duIG9uIGludmFsaWQgdHlwZXMgKGEgSmF2YVNjcmlwdCByZXNvdXJjZSBvciBvYmplY3QpLCBmYWxzZSBvdGhlcndpc2VcbiAgICAjIEBwYXJhbSBbRnVuY3Rpb25dIG9iamVjdEVuY29kZXIgICAgICAgICAgIEEgZnVuY3Rpb24gdG8gc2VyaWFsaXplIGN1c3RvbSBvYmplY3RzLCBudWxsIG90aGVyd2lzZVxuICAgICNcbiAgICAjIEByZXR1cm4gW1N0cmluZ10gIEEgWUFNTCBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBvcmlnaW5hbCBKYXZhU2NyaXB0IG9iamVjdFxuICAgICNcbiAgICBAZHVtcDogKGlucHV0LCBpbmxpbmUgPSAyLCBpbmRlbnQgPSA0LCBleGNlcHRpb25PbkludmFsaWRUeXBlID0gZmFsc2UsIG9iamVjdEVuY29kZXIgPSBudWxsKSAtPlxuICAgICAgICB5YW1sID0gbmV3IER1bXBlcigpXG4gICAgICAgIHlhbWwuaW5kZW50YXRpb24gPSBpbmRlbnRcblxuICAgICAgICByZXR1cm4geWFtbC5kdW1wKGlucHV0LCBpbmxpbmUsIDAsIGV4Y2VwdGlvbk9uSW52YWxpZFR5cGUsIG9iamVjdEVuY29kZXIpXG5cblxuICAgICMgUmVnaXN0ZXJzIC55bWwgZXh0ZW5zaW9uIHRvIHdvcmsgd2l0aCBub2RlJ3MgcmVxdWlyZSgpIGZ1bmN0aW9uLlxuICAgICNcbiAgICBAcmVnaXN0ZXI6IC0+XG4gICAgICAgIHJlcXVpcmVfaGFuZGxlciA9IChtb2R1bGUsIGZpbGVuYW1lKSAtPlxuICAgICAgICAgICAgIyBGaWxsIGluIHJlc3VsdFxuICAgICAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBZQU1MLnBhcnNlRmlsZSBmaWxlbmFtZVxuXG4gICAgICAgICMgUmVnaXN0ZXIgcmVxdWlyZSBleHRlbnNpb25zIG9ubHkgaWYgd2UncmUgb24gbm9kZS5qc1xuICAgICAgICAjIGhhY2sgZm9yIGJyb3dzZXJpZnlcbiAgICAgICAgaWYgcmVxdWlyZT8uZXh0ZW5zaW9ucz9cbiAgICAgICAgICAgIHJlcXVpcmUuZXh0ZW5zaW9uc1snLnltbCddID0gcmVxdWlyZV9oYW5kbGVyXG4gICAgICAgICAgICByZXF1aXJlLmV4dGVuc2lvbnNbJy55YW1sJ10gPSByZXF1aXJlX2hhbmRsZXJcblxuXG4gICAgIyBBbGlhcyBvZiBkdW1wKCkgbWV0aG9kIGZvciBjb21wYXRpYmlsaXR5IHJlYXNvbnMuXG4gICAgI1xuICAgIEBzdHJpbmdpZnk6IChpbnB1dCwgaW5saW5lLCBpbmRlbnQsIGV4Y2VwdGlvbk9uSW52YWxpZFR5cGUsIG9iamVjdEVuY29kZXIpIC0+XG4gICAgICAgIHJldHVybiBAZHVtcCBpbnB1dCwgaW5saW5lLCBpbmRlbnQsIGV4Y2VwdGlvbk9uSW52YWxpZFR5cGUsIG9iamVjdEVuY29kZXJcblxuXG4gICAgIyBBbGlhcyBvZiBwYXJzZUZpbGUoKSBtZXRob2QgZm9yIGNvbXBhdGliaWxpdHkgcmVhc29ucy5cbiAgICAjXG4gICAgQGxvYWQ6IChwYXRoLCBjYWxsYmFjaywgZXhjZXB0aW9uT25JbnZhbGlkVHlwZSwgb2JqZWN0RGVjb2RlcikgLT5cbiAgICAgICAgcmV0dXJuIEBwYXJzZUZpbGUgcGF0aCwgY2FsbGJhY2ssIGV4Y2VwdGlvbk9uSW52YWxpZFR5cGUsIG9iamVjdERlY29kZXJcblxuXG4jIEV4cG9zZSBZQU1MIG5hbWVzcGFjZSB0byBicm93c2VyXG53aW5kb3c/LllBTUwgPSBZYW1sXG5cbiMgTm90IGluIHRoZSBicm93c2VyP1xudW5sZXNzIHdpbmRvdz9cbiAgICBAWUFNTCA9IFlhbWxcblxubW9kdWxlLmV4cG9ydHMgPSBZYW1sXG4iXX0=
