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

  Escaper.LIST_ESCAPEES = ['\\', '\\\\', '\\"', '"', "\x00", "\x01", "\x02", "\x03", "\x04", "\x05", "\x06", "\x07", "\x08", "\x09", "\x0a", "\x0b", "\x0c", "\x0d", "\x0e", "\x0f", "\x10", "\x11", "\x12", "\x13", "\x14", "\x15", "\x16", "\x17", "\x18", "\x19", "\x1a", "\x1b", "\x1c", "\x1d", "\x1e", "\x1f", (ch = String.fromCharCode)(0x0085), ch(0x00A0), ch(0x2028), ch(0x2029)];

  Escaper.LIST_ESCAPED = ['\\\\', '\\"', '\\"', '\\"', "\\0", "\\x01", "\\x02", "\\x03", "\\x04", "\\x05", "\\x06", "\\a", "\\b", "\\t", "\\n", "\\v", "\\f", "\\r", "\\x0e", "\\x0f", "\\x10", "\\x11", "\\x12", "\\x13", "\\x14", "\\x15", "\\x16", "\\x17", "\\x18", "\\x19", "\\x1a", "\\e", "\\x1c", "\\x1d", "\\x1e", "\\x1f", "\\N", "\\_", "\\L", "\\P"];

  Escaper.MAPPING_ESCAPEES_TO_ESCAPED = (function() {
    var i, j, mapping, ref;
    mapping = {};
    for (i = j = 0, ref = Escaper.LIST_ESCAPEES.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
      mapping[Escaper.LIST_ESCAPEES[i]] = Escaper.LIST_ESCAPED[i];
    }
    return mapping;
  })();

  Escaper.PATTERN_CHARACTERS_TO_ESCAPE = new Pattern('[\\x00-\\x1f]|\xc2\x85|\xc2\xa0|\xe2\x80\xa8|\xe2\x80\xa9');

  Escaper.PATTERN_MAPPING_ESCAPEES = new Pattern(Escaper.LIST_ESCAPEES.join('|').split('\\').join('\\\\'));

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
    var _char, capturingBracketNumber, cleanedRegex, i, len, mapping, name, part, subChar;
    if (modifiers == null) {
      modifiers = '';
    }
    cleanedRegex = '';
    len = rawRegex.length;
    mapping = null;
    capturingBracketNumber = 0;
    i = 0;
    while (i < len) {
      _char = rawRegex.charAt(i);
      if (_char === '\\') {
        cleanedRegex += rawRegex.slice(i, +(i + 1) + 1 || 9e9);
        i++;
      } else if (_char === '(') {
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
            cleanedRegex += _char;
            capturingBracketNumber++;
          }
        } else {
          cleanedRegex += _char;
        }
      } else {
        cleanedRegex += _char;
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
    return value.replace(/\'\'/g, '\'');
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

  Utils.trim = function(str, _char) {
    var regexLeft, regexRight;
    if (_char == null) {
      _char = '\\s';
    }
    return str.trim();
    regexLeft = this.REGEX_LEFT_TRIM_BY_CHAR[_char];
    if (regexLeft == null) {
      this.REGEX_LEFT_TRIM_BY_CHAR[_char] = regexLeft = new RegExp('^' + _char + '' + _char + '*');
    }
    regexLeft.lastIndex = 0;
    regexRight = this.REGEX_RIGHT_TRIM_BY_CHAR[_char];
    if (regexRight == null) {
      this.REGEX_RIGHT_TRIM_BY_CHAR[_char] = regexRight = new RegExp(_char + '' + _char + '*$');
    }
    regexRight.lastIndex = 0;
    return str.replace(regexLeft, '').replace(regexRight, '');
  };

  Utils.ltrim = function(str, _char) {
    var regexLeft;
    if (_char == null) {
      _char = '\\s';
    }
    regexLeft = this.REGEX_LEFT_TRIM_BY_CHAR[_char];
    if (regexLeft == null) {
      this.REGEX_LEFT_TRIM_BY_CHAR[_char] = regexLeft = new RegExp('^' + _char + '' + _char + '*');
    }
    regexLeft.lastIndex = 0;
    return str.replace(regexLeft, '');
  };

  Utils.rtrim = function(str, _char) {
    var regexRight;
    if (_char == null) {
      _char = '\\s';
    }
    regexRight = this.REGEX_RIGHT_TRIM_BY_CHAR[_char];
    if (regexRight == null) {
      this.REGEX_RIGHT_TRIM_BY_CHAR[_char] = regexRight = new RegExp(_char + '' + _char + '*$');
    }
    regexRight.lastIndex = 0;
    return str.replace(regexRight, '');
  };

  Utils.isEmpty = function(value) {
    return !value || value === '' || value === '0' || (value instanceof Array && value.length === 0);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9Vc2Vycy9qZXJlbXlmYS9Eb2N1bWVudHMvUHJvamV0cy95YW1sLmpzL3NyYy9EdW1wZXIuY29mZmVlIiwiL1VzZXJzL2plcmVteWZhL0RvY3VtZW50cy9Qcm9qZXRzL3lhbWwuanMvc3JjL0VzY2FwZXIuY29mZmVlIiwiL1VzZXJzL2plcmVteWZhL0RvY3VtZW50cy9Qcm9qZXRzL3lhbWwuanMvc3JjL0V4Y2VwdGlvbi9EdW1wRXhjZXB0aW9uLmNvZmZlZSIsIi9Vc2Vycy9qZXJlbXlmYS9Eb2N1bWVudHMvUHJvamV0cy95YW1sLmpzL3NyYy9FeGNlcHRpb24vUGFyc2VFeGNlcHRpb24uY29mZmVlIiwiL1VzZXJzL2plcmVteWZhL0RvY3VtZW50cy9Qcm9qZXRzL3lhbWwuanMvc3JjL0lubGluZS5jb2ZmZWUiLCIvVXNlcnMvamVyZW15ZmEvRG9jdW1lbnRzL1Byb2pldHMveWFtbC5qcy9zcmMvUGFyc2VyLmNvZmZlZSIsIi9Vc2Vycy9qZXJlbXlmYS9Eb2N1bWVudHMvUHJvamV0cy95YW1sLmpzL3NyYy9QYXR0ZXJuLmNvZmZlZSIsIi9Vc2Vycy9qZXJlbXlmYS9Eb2N1bWVudHMvUHJvamV0cy95YW1sLmpzL3NyYy9VbmVzY2FwZXIuY29mZmVlIiwiL1VzZXJzL2plcmVteWZhL0RvY3VtZW50cy9Qcm9qZXRzL3lhbWwuanMvc3JjL1V0aWxzLmNvZmZlZSIsIi9Vc2Vycy9qZXJlbXlmYS9Eb2N1bWVudHMvUHJvamV0cy95YW1sLmpzL3NyYy9ZYW1sLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0NBLElBQUEscUJBQUE7O0FBQUEsS0FBQSxHQUFVLE9BQUEsQ0FBUSxTQUFSLENBQVYsQ0FBQTs7QUFBQSxNQUNBLEdBQVUsT0FBQSxDQUFRLFVBQVIsQ0FEVixDQUFB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LGFBQW5ELENBQVAsQ0FERztFQUFBLENBaEZQLENBQUE7O2NBQUE7O0lBekJKLENBQUE7OztFQThHQSxNQUFNLENBQUUsSUFBUixHQUFlO0NBOUdmOztBQWlIQSxJQUFPLGdEQUFQO0FBQ0ksRUFBQSxJQUFDLENBQUEsSUFBRCxHQUFRLElBQVIsQ0FESjtDQWpIQTs7QUFBQSxNQW9ITSxDQUFDLE9BQVAsR0FBaUIsSUFwSGpCLENBQUEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXG5VdGlscyAgID0gcmVxdWlyZSAnLi9VdGlscydcbklubGluZSAgPSByZXF1aXJlICcuL0lubGluZSdcblxuIyBEdW1wZXIgZHVtcHMgSmF2YVNjcmlwdCB2YXJpYWJsZXMgdG8gWUFNTCBzdHJpbmdzLlxuI1xuY2xhc3MgRHVtcGVyXG5cbiAgICAjIFRoZSBhbW91bnQgb2Ygc3BhY2VzIHRvIHVzZSBmb3IgaW5kZW50YXRpb24gb2YgbmVzdGVkIG5vZGVzLlxuICAgIEBpbmRlbnRhdGlvbjogICA0XG5cblxuICAgICMgRHVtcHMgYSBKYXZhU2NyaXB0IHZhbHVlIHRvIFlBTUwuXG4gICAgI1xuICAgICMgQHBhcmFtIFtPYmplY3RdICAgaW5wdXQgICAgICAgICAgICAgICAgICAgVGhlIEphdmFTY3JpcHQgdmFsdWVcbiAgICAjIEBwYXJhbSBbSW50ZWdlcl0gIGlubGluZSAgICAgICAgICAgICAgICAgIFRoZSBsZXZlbCB3aGVyZSB5b3Ugc3dpdGNoIHRvIGlubGluZSBZQU1MXG4gICAgIyBAcGFyYW0gW0ludGVnZXJdICBpbmRlbnQgICAgICAgICAgICAgICAgICBUaGUgbGV2ZWwgb2YgaW5kZW50YXRpb24gKHVzZWQgaW50ZXJuYWxseSlcbiAgICAjIEBwYXJhbSBbQm9vbGVhbl0gIGV4Y2VwdGlvbk9uSW52YWxpZFR5cGUgIHRydWUgaWYgYW4gZXhjZXB0aW9uIG11c3QgYmUgdGhyb3duIG9uIGludmFsaWQgdHlwZXMgKGEgSmF2YVNjcmlwdCByZXNvdXJjZSBvciBvYmplY3QpLCBmYWxzZSBvdGhlcndpc2VcbiAgICAjIEBwYXJhbSBbRnVuY3Rpb25dIG9iamVjdEVuY29kZXIgICAgICAgICAgIEEgZnVuY3Rpb24gdG8gc2VyaWFsaXplIGN1c3RvbSBvYmplY3RzLCBudWxsIG90aGVyd2lzZVxuICAgICNcbiAgICAjIEByZXR1cm4gW1N0cmluZ10gIFRoZSBZQU1MIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBKYXZhU2NyaXB0IHZhbHVlXG4gICAgI1xuICAgIGR1bXA6IChpbnB1dCwgaW5saW5lID0gMCwgaW5kZW50ID0gMCwgZXhjZXB0aW9uT25JbnZhbGlkVHlwZSA9IGZhbHNlLCBvYmplY3RFbmNvZGVyID0gbnVsbCkgLT5cbiAgICAgICAgb3V0cHV0ID0gJydcbiAgICAgICAgcHJlZml4ID0gKGlmIGluZGVudCB0aGVuIFV0aWxzLnN0clJlcGVhdCgnICcsIGluZGVudCkgZWxzZSAnJylcblxuICAgICAgICBpZiBpbmxpbmUgPD0gMCBvciB0eXBlb2YoaW5wdXQpIGlzbnQgJ29iamVjdCcgb3IgaW5wdXQgaW5zdGFuY2VvZiBEYXRlIG9yIFV0aWxzLmlzRW1wdHkoaW5wdXQpXG4gICAgICAgICAgICBvdXRwdXQgKz0gcHJlZml4ICsgSW5saW5lLmR1bXAoaW5wdXQsIGV4Y2VwdGlvbk9uSW52YWxpZFR5cGUsIG9iamVjdEVuY29kZXIpXG4gICAgICAgIFxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBpZiBpbnB1dCBpbnN0YW5jZW9mIEFycmF5XG4gICAgICAgICAgICAgICAgZm9yIHZhbHVlIGluIGlucHV0XG4gICAgICAgICAgICAgICAgICAgIHdpbGxCZUlubGluZWQgPSAoaW5saW5lIC0gMSA8PSAwIG9yIHR5cGVvZih2YWx1ZSkgaXNudCAnb2JqZWN0JyBvciBVdGlscy5pc0VtcHR5KHZhbHVlKSlcblxuICAgICAgICAgICAgICAgICAgICBvdXRwdXQgKz1cbiAgICAgICAgICAgICAgICAgICAgICAgIHByZWZpeCArXG4gICAgICAgICAgICAgICAgICAgICAgICAnLScgK1xuICAgICAgICAgICAgICAgICAgICAgICAgKGlmIHdpbGxCZUlubGluZWQgdGhlbiAnICcgZWxzZSBcIlxcblwiKSArXG4gICAgICAgICAgICAgICAgICAgICAgICBAZHVtcCh2YWx1ZSwgaW5saW5lIC0gMSwgKGlmIHdpbGxCZUlubGluZWQgdGhlbiAwIGVsc2UgaW5kZW50ICsgQGluZGVudGF0aW9uKSwgZXhjZXB0aW9uT25JbnZhbGlkVHlwZSwgb2JqZWN0RW5jb2RlcikgK1xuICAgICAgICAgICAgICAgICAgICAgICAgKGlmIHdpbGxCZUlubGluZWQgdGhlbiBcIlxcblwiIGVsc2UgJycpXG5cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBmb3Iga2V5LCB2YWx1ZSBvZiBpbnB1dFxuICAgICAgICAgICAgICAgICAgICB3aWxsQmVJbmxpbmVkID0gKGlubGluZSAtIDEgPD0gMCBvciB0eXBlb2YodmFsdWUpIGlzbnQgJ29iamVjdCcgb3IgVXRpbHMuaXNFbXB0eSh2YWx1ZSkpXG5cbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0ICs9XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmVmaXggK1xuICAgICAgICAgICAgICAgICAgICAgICAgSW5saW5lLmR1bXAoa2V5LCBleGNlcHRpb25PbkludmFsaWRUeXBlLCBvYmplY3RFbmNvZGVyKSArICc6JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAoaWYgd2lsbEJlSW5saW5lZCB0aGVuICcgJyBlbHNlIFwiXFxuXCIpICtcbiAgICAgICAgICAgICAgICAgICAgICAgIEBkdW1wKHZhbHVlLCBpbmxpbmUgLSAxLCAoaWYgd2lsbEJlSW5saW5lZCB0aGVuIDAgZWxzZSBpbmRlbnQgKyBAaW5kZW50YXRpb24pLCBleGNlcHRpb25PbkludmFsaWRUeXBlLCBvYmplY3RFbmNvZGVyKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAoaWYgd2lsbEJlSW5saW5lZCB0aGVuIFwiXFxuXCIgZWxzZSAnJylcblxuICAgICAgICByZXR1cm4gb3V0cHV0XG5cblxubW9kdWxlLmV4cG9ydHMgPSBEdW1wZXJcbiIsIlxuUGF0dGVybiA9IHJlcXVpcmUgJy4vUGF0dGVybidcblxuIyBFc2NhcGVyIGVuY2Fwc3VsYXRlcyBlc2NhcGluZyBydWxlcyBmb3Igc2luZ2xlXG4jIGFuZCBkb3VibGUtcXVvdGVkIFlBTUwgc3RyaW5ncy5cbmNsYXNzIEVzY2FwZXJcblxuICAgICMgTWFwcGluZyBhcnJheXMgZm9yIGVzY2FwaW5nIGEgZG91YmxlIHF1b3RlZCBzdHJpbmcuIFRoZSBiYWNrc2xhc2ggaXNcbiAgICAjIGZpcnN0IHRvIGVuc3VyZSBwcm9wZXIgZXNjYXBpbmcuXG4gICAgQExJU1RfRVNDQVBFRVM6ICAgICAgICAgICAgICAgICBbJ1xcXFwnLCAnXFxcXFxcXFwnLCAnXFxcXFwiJywgJ1wiJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxceDAwXCIsICBcIlxceDAxXCIsICBcIlxceDAyXCIsICBcIlxceDAzXCIsICBcIlxceDA0XCIsICBcIlxceDA1XCIsICBcIlxceDA2XCIsICBcIlxceDA3XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXHgwOFwiLCAgXCJcXHgwOVwiLCAgXCJcXHgwYVwiLCAgXCJcXHgwYlwiLCAgXCJcXHgwY1wiLCAgXCJcXHgwZFwiLCAgXCJcXHgwZVwiLCAgXCJcXHgwZlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFx4MTBcIiwgIFwiXFx4MTFcIiwgIFwiXFx4MTJcIiwgIFwiXFx4MTNcIiwgIFwiXFx4MTRcIiwgIFwiXFx4MTVcIiwgIFwiXFx4MTZcIiwgIFwiXFx4MTdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxceDE4XCIsICBcIlxceDE5XCIsICBcIlxceDFhXCIsICBcIlxceDFiXCIsICBcIlxceDFjXCIsICBcIlxceDFkXCIsICBcIlxceDFlXCIsICBcIlxceDFmXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNoID0gU3RyaW5nLmZyb21DaGFyQ29kZSkoMHgwMDg1KSwgY2goMHgwMEEwKSwgY2goMHgyMDI4KSwgY2goMHgyMDI5KV1cbiAgICBATElTVF9FU0NBUEVEOiAgICAgICAgICAgICAgICAgIFsnXFxcXFxcXFwnLCAnXFxcXFwiJywgJ1xcXFxcIicsICdcXFxcXCInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxcXDBcIiwgICBcIlxcXFx4MDFcIiwgXCJcXFxceDAyXCIsIFwiXFxcXHgwM1wiLCBcIlxcXFx4MDRcIiwgXCJcXFxceDA1XCIsIFwiXFxcXHgwNlwiLCBcIlxcXFxhXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXFxcYlwiLCAgIFwiXFxcXHRcIiwgICBcIlxcXFxuXCIsICAgXCJcXFxcdlwiLCAgIFwiXFxcXGZcIiwgICBcIlxcXFxyXCIsICAgXCJcXFxceDBlXCIsIFwiXFxcXHgwZlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxcXHgxMFwiLCBcIlxcXFx4MTFcIiwgXCJcXFxceDEyXCIsIFwiXFxcXHgxM1wiLCBcIlxcXFx4MTRcIiwgXCJcXFxceDE1XCIsIFwiXFxcXHgxNlwiLCBcIlxcXFx4MTdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcXFx4MThcIiwgXCJcXFxceDE5XCIsIFwiXFxcXHgxYVwiLCBcIlxcXFxlXCIsICAgXCJcXFxceDFjXCIsIFwiXFxcXHgxZFwiLCBcIlxcXFx4MWVcIiwgXCJcXFxceDFmXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXFxcTlwiLCBcIlxcXFxfXCIsIFwiXFxcXExcIiwgXCJcXFxcUFwiXVxuXG4gICAgQE1BUFBJTkdfRVNDQVBFRVNfVE9fRVNDQVBFRDogICBkbyA9PlxuICAgICAgICBtYXBwaW5nID0ge31cbiAgICAgICAgZm9yIGkgaW4gWzAuLi5ATElTVF9FU0NBUEVFUy5sZW5ndGhdXG4gICAgICAgICAgICBtYXBwaW5nW0BMSVNUX0VTQ0FQRUVTW2ldXSA9IEBMSVNUX0VTQ0FQRURbaV1cbiAgICAgICAgcmV0dXJuIG1hcHBpbmdcblxuICAgICMgQ2hhcmFjdGVycyB0aGF0IHdvdWxkIGNhdXNlIGEgZHVtcGVkIHN0cmluZyB0byByZXF1aXJlIGRvdWJsZSBxdW90aW5nLlxuICAgIEBQQVRURVJOX0NIQVJBQ1RFUlNfVE9fRVNDQVBFOiAgbmV3IFBhdHRlcm4gJ1tcXFxceDAwLVxcXFx4MWZdfFxceGMyXFx4ODV8XFx4YzJcXHhhMHxcXHhlMlxceDgwXFx4YTh8XFx4ZTJcXHg4MFxceGE5J1xuXG4gICAgIyBPdGhlciBwcmVjb21waWxlZCBwYXR0ZXJuc1xuICAgIEBQQVRURVJOX01BUFBJTkdfRVNDQVBFRVM6ICAgICAgbmV3IFBhdHRlcm4gQExJU1RfRVNDQVBFRVMuam9pbignfCcpLnNwbGl0KCdcXFxcJykuam9pbignXFxcXFxcXFwnKVxuICAgIEBQQVRURVJOX1NJTkdMRV9RVU9USU5HOiAgICAgICAgbmV3IFBhdHRlcm4gJ1tcXFxcc1xcJ1wiOnt9W1xcXFxdLCYqIz9dfF5bLT98PD49ISVAYF0nXG5cblxuXG4gICAgIyBEZXRlcm1pbmVzIGlmIGEgSmF2YVNjcmlwdCB2YWx1ZSB3b3VsZCByZXF1aXJlIGRvdWJsZSBxdW90aW5nIGluIFlBTUwuXG4gICAgI1xuICAgICMgQHBhcmFtIFtTdHJpbmddICAgdmFsdWUgICBBIEphdmFTY3JpcHQgdmFsdWUgdmFsdWVcbiAgICAjXG4gICAgIyBAcmV0dXJuIFtCb29sZWFuXSB0cnVlICAgIGlmIHRoZSB2YWx1ZSB3b3VsZCByZXF1aXJlIGRvdWJsZSBxdW90ZXMuXG4gICAgI1xuICAgIEByZXF1aXJlc0RvdWJsZVF1b3Rpbmc6ICh2YWx1ZSkgLT5cbiAgICAgICAgcmV0dXJuIEBQQVRURVJOX0NIQVJBQ1RFUlNfVE9fRVNDQVBFLnRlc3QgdmFsdWVcblxuXG4gICAgIyBFc2NhcGVzIGFuZCBzdXJyb3VuZHMgYSBKYXZhU2NyaXB0IHZhbHVlIHdpdGggZG91YmxlIHF1b3Rlcy5cbiAgICAjXG4gICAgIyBAcGFyYW0gW1N0cmluZ10gICB2YWx1ZSAgIEEgSmF2YVNjcmlwdCB2YWx1ZVxuICAgICNcbiAgICAjIEByZXR1cm4gW1N0cmluZ10gIFRoZSBxdW90ZWQsIGVzY2FwZWQgc3RyaW5nXG4gICAgI1xuICAgIEBlc2NhcGVXaXRoRG91YmxlUXVvdGVzOiAodmFsdWUpIC0+XG4gICAgICAgIHJlc3VsdCA9IEBQQVRURVJOX01BUFBJTkdfRVNDQVBFRVMucmVwbGFjZSB2YWx1ZSwgKHN0cikgPT5cbiAgICAgICAgICAgIHJldHVybiBATUFQUElOR19FU0NBUEVFU19UT19FU0NBUEVEW3N0cl1cbiAgICAgICAgcmV0dXJuICdcIicrcmVzdWx0KydcIidcblxuXG4gICAgIyBEZXRlcm1pbmVzIGlmIGEgSmF2YVNjcmlwdCB2YWx1ZSB3b3VsZCByZXF1aXJlIHNpbmdsZSBxdW90aW5nIGluIFlBTUwuXG4gICAgI1xuICAgICMgQHBhcmFtIFtTdHJpbmddICAgdmFsdWUgICBBIEphdmFTY3JpcHQgdmFsdWVcbiAgICAjXG4gICAgIyBAcmV0dXJuIFtCb29sZWFuXSB0cnVlIGlmIHRoZSB2YWx1ZSB3b3VsZCByZXF1aXJlIHNpbmdsZSBxdW90ZXMuXG4gICAgI1xuICAgIEByZXF1aXJlc1NpbmdsZVF1b3Rpbmc6ICh2YWx1ZSkgLT5cbiAgICAgICAgcmV0dXJuIEBQQVRURVJOX1NJTkdMRV9RVU9USU5HLnRlc3QgdmFsdWVcblxuXG4gICAgIyBFc2NhcGVzIGFuZCBzdXJyb3VuZHMgYSBKYXZhU2NyaXB0IHZhbHVlIHdpdGggc2luZ2xlIHF1b3Rlcy5cbiAgICAjXG4gICAgIyBAcGFyYW0gW1N0cmluZ10gICB2YWx1ZSAgIEEgSmF2YVNjcmlwdCB2YWx1ZVxuICAgICNcbiAgICAjIEByZXR1cm4gW1N0cmluZ10gIFRoZSBxdW90ZWQsIGVzY2FwZWQgc3RyaW5nXG4gICAgI1xuICAgIEBlc2NhcGVXaXRoU2luZ2xlUXVvdGVzOiAodmFsdWUpIC0+XG4gICAgICAgIHJldHVybiBcIidcIit2YWx1ZS5yZXBsYWNlKC8nL2csIFwiJydcIikrXCInXCJcblxuXG5tb2R1bGUuZXhwb3J0cyA9IEVzY2FwZXJcbiIsIlxuY2xhc3MgRHVtcEV4Y2VwdGlvbiBleHRlbmRzIEVycm9yXG5cbiAgICBjb25zdHJ1Y3RvcjogKEBtZXNzYWdlLCBAcGFyc2VkTGluZSwgQHNuaXBwZXQpIC0+XG5cbiAgICB0b1N0cmluZzogLT5cbiAgICAgICAgaWYgQHBhcnNlZExpbmU/IGFuZCBAc25pcHBldD9cbiAgICAgICAgICAgIHJldHVybiAnPER1bXBFeGNlcHRpb24+ICcgKyBAbWVzc2FnZSArICcgKGxpbmUgJyArIEBwYXJzZWRMaW5lICsgJzogXFwnJyArIEBzbmlwcGV0ICsgJ1xcJyknXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiAnPER1bXBFeGNlcHRpb24+ICcgKyBAbWVzc2FnZVxuXG5tb2R1bGUuZXhwb3J0cyA9IER1bXBFeGNlcHRpb25cbiIsIlxuY2xhc3MgUGFyc2VFeGNlcHRpb24gZXh0ZW5kcyBFcnJvclxuXG4gICAgY29uc3RydWN0b3I6IChAbWVzc2FnZSwgQHBhcnNlZExpbmUsIEBzbmlwcGV0KSAtPlxuXG4gICAgdG9TdHJpbmc6IC0+XG4gICAgICAgIGlmIEBwYXJzZWRMaW5lPyBhbmQgQHNuaXBwZXQ/XG4gICAgICAgICAgICByZXR1cm4gJzxQYXJzZUV4Y2VwdGlvbj4gJyArIEBtZXNzYWdlICsgJyAobGluZSAnICsgQHBhcnNlZExpbmUgKyAnOiBcXCcnICsgQHNuaXBwZXQgKyAnXFwnKSdcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuICc8UGFyc2VFeGNlcHRpb24+ICcgKyBAbWVzc2FnZVxuXG5tb2R1bGUuZXhwb3J0cyA9IFBhcnNlRXhjZXB0aW9uXG4iLCJcblBhdHRlcm4gICAgICAgICA9IHJlcXVpcmUgJy4vUGF0dGVybidcblVuZXNjYXBlciAgICAgICA9IHJlcXVpcmUgJy4vVW5lc2NhcGVyJ1xuRXNjYXBlciAgICAgICAgID0gcmVxdWlyZSAnLi9Fc2NhcGVyJ1xuVXRpbHMgICAgICAgICAgID0gcmVxdWlyZSAnLi9VdGlscydcblBhcnNlRXhjZXB0aW9uICA9IHJlcXVpcmUgJy4vRXhjZXB0aW9uL1BhcnNlRXhjZXB0aW9uJ1xuRHVtcEV4Y2VwdGlvbiAgID0gcmVxdWlyZSAnLi9FeGNlcHRpb24vRHVtcEV4Y2VwdGlvbidcblxuIyBJbmxpbmUgWUFNTCBwYXJzaW5nIGFuZCBkdW1waW5nXG5jbGFzcyBJbmxpbmVcblxuICAgICMgUXVvdGVkIHN0cmluZyByZWd1bGFyIGV4cHJlc3Npb25cbiAgICBAUkVHRVhfUVVPVEVEX1NUUklORzogICAgICAgICAgICAgICAnKD86XCIoPzpbXlwiXFxcXFxcXFxdKig/OlxcXFxcXFxcLlteXCJcXFxcXFxcXF0qKSopXCJ8XFwnKD86W15cXCddKig/OlxcJ1xcJ1teXFwnXSopKilcXCcpJ1xuXG4gICAgIyBQcmUtY29tcGlsZWQgcGF0dGVybnNcbiAgICAjXG4gICAgQFBBVFRFUk5fVFJBSUxJTkdfQ09NTUVOVFM6ICAgICAgICAgbmV3IFBhdHRlcm4gJ15cXFxccyojLiokJ1xuICAgIEBQQVRURVJOX1FVT1RFRF9TQ0FMQVI6ICAgICAgICAgICAgIG5ldyBQYXR0ZXJuICdeJytAUkVHRVhfUVVPVEVEX1NUUklOR1xuICAgIEBQQVRURVJOX1RIT1VTQU5EX05VTUVSSUNfU0NBTEFSOiAgIG5ldyBQYXR0ZXJuICdeKC18XFxcXCspP1swLTksXSsoXFxcXC5bMC05XSspPyQnXG4gICAgQFBBVFRFUk5fU0NBTEFSX0JZX0RFTElNSVRFUlM6ICAgICAge31cblxuICAgICMgU2V0dGluZ3NcbiAgICBAc2V0dGluZ3M6IHt9XG5cblxuICAgICMgQ29uZmlndXJlIFlBTUwgaW5saW5lLlxuICAgICNcbiAgICAjIEBwYXJhbSBbQm9vbGVhbl0gIGV4Y2VwdGlvbk9uSW52YWxpZFR5cGUgIHRydWUgaWYgYW4gZXhjZXB0aW9uIG11c3QgYmUgdGhyb3duIG9uIGludmFsaWQgdHlwZXMgKGEgSmF2YVNjcmlwdCByZXNvdXJjZSBvciBvYmplY3QpLCBmYWxzZSBvdGhlcndpc2VcbiAgICAjIEBwYXJhbSBbRnVuY3Rpb25dIG9iamVjdERlY29kZXIgICAgICAgICAgIEEgZnVuY3Rpb24gdG8gZGVzZXJpYWxpemUgY3VzdG9tIG9iamVjdHMsIG51bGwgb3RoZXJ3aXNlXG4gICAgI1xuICAgIEBjb25maWd1cmU6IChleGNlcHRpb25PbkludmFsaWRUeXBlID0gbnVsbCwgb2JqZWN0RGVjb2RlciA9IG51bGwpIC0+XG4gICAgICAgICMgVXBkYXRlIHNldHRpbmdzXG4gICAgICAgIEBzZXR0aW5ncy5leGNlcHRpb25PbkludmFsaWRUeXBlID0gZXhjZXB0aW9uT25JbnZhbGlkVHlwZVxuICAgICAgICBAc2V0dGluZ3Mub2JqZWN0RGVjb2RlciA9IG9iamVjdERlY29kZXJcbiAgICAgICAgcmV0dXJuXG5cblxuICAgICMgQ29udmVydHMgYSBZQU1MIHN0cmluZyB0byBhIEphdmFTY3JpcHQgb2JqZWN0LlxuICAgICNcbiAgICAjIEBwYXJhbSBbU3RyaW5nXSAgIHZhbHVlICAgICAgICAgICAgICAgICAgIEEgWUFNTCBzdHJpbmdcbiAgICAjIEBwYXJhbSBbQm9vbGVhbl0gIGV4Y2VwdGlvbk9uSW52YWxpZFR5cGUgIHRydWUgaWYgYW4gZXhjZXB0aW9uIG11c3QgYmUgdGhyb3duIG9uIGludmFsaWQgdHlwZXMgKGEgSmF2YVNjcmlwdCByZXNvdXJjZSBvciBvYmplY3QpLCBmYWxzZSBvdGhlcndpc2VcbiAgICAjIEBwYXJhbSBbRnVuY3Rpb25dIG9iamVjdERlY29kZXIgICAgICAgICAgIEEgZnVuY3Rpb24gdG8gZGVzZXJpYWxpemUgY3VzdG9tIG9iamVjdHMsIG51bGwgb3RoZXJ3aXNlXG4gICAgI1xuICAgICMgQHJldHVybiBbT2JqZWN0XSAgQSBKYXZhU2NyaXB0IG9iamVjdCByZXByZXNlbnRpbmcgdGhlIFlBTUwgc3RyaW5nXG4gICAgI1xuICAgICMgQHRocm93IFtQYXJzZUV4Y2VwdGlvbl1cbiAgICAjXG4gICAgQHBhcnNlOiAodmFsdWUsIGV4Y2VwdGlvbk9uSW52YWxpZFR5cGUgPSBmYWxzZSwgb2JqZWN0RGVjb2RlciA9IG51bGwpIC0+XG4gICAgICAgICMgVXBkYXRlIHNldHRpbmdzIGZyb20gbGFzdCBjYWxsIG9mIElubGluZS5wYXJzZSgpXG4gICAgICAgIEBzZXR0aW5ncy5leGNlcHRpb25PbkludmFsaWRUeXBlID0gZXhjZXB0aW9uT25JbnZhbGlkVHlwZVxuICAgICAgICBAc2V0dGluZ3Mub2JqZWN0RGVjb2RlciA9IG9iamVjdERlY29kZXJcblxuICAgICAgICBpZiBub3QgdmFsdWU/XG4gICAgICAgICAgICByZXR1cm4gJydcblxuICAgICAgICB2YWx1ZSA9IFV0aWxzLnRyaW0gdmFsdWVcblxuICAgICAgICBpZiAwIGlzIHZhbHVlLmxlbmd0aFxuICAgICAgICAgICAgcmV0dXJuICcnXG5cbiAgICAgICAgIyBLZWVwIGEgY29udGV4dCBvYmplY3QgdG8gcGFzcyB0aHJvdWdoIHN0YXRpYyBtZXRob2RzXG4gICAgICAgIGNvbnRleHQgPSB7ZXhjZXB0aW9uT25JbnZhbGlkVHlwZSwgb2JqZWN0RGVjb2RlciwgaTogMH1cblxuICAgICAgICBzd2l0Y2ggdmFsdWUuY2hhckF0KDApXG4gICAgICAgICAgICB3aGVuICdbJ1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IEBwYXJzZVNlcXVlbmNlIHZhbHVlLCBjb250ZXh0XG4gICAgICAgICAgICAgICAgKytjb250ZXh0LmlcbiAgICAgICAgICAgIHdoZW4gJ3snXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gQHBhcnNlTWFwcGluZyB2YWx1ZSwgY29udGV4dFxuICAgICAgICAgICAgICAgICsrY29udGV4dC5pXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gQHBhcnNlU2NhbGFyIHZhbHVlLCBudWxsLCBbJ1wiJywgXCInXCJdLCBjb250ZXh0XG5cbiAgICAgICAgIyBTb21lIGNvbW1lbnRzIGFyZSBhbGxvd2VkIGF0IHRoZSBlbmRcbiAgICAgICAgaWYgQFBBVFRFUk5fVFJBSUxJTkdfQ09NTUVOVFMucmVwbGFjZSh2YWx1ZVtjb250ZXh0LmkuLl0sICcnKSBpc250ICcnXG4gICAgICAgICAgICB0aHJvdyBuZXcgUGFyc2VFeGNlcHRpb24gJ1VuZXhwZWN0ZWQgY2hhcmFjdGVycyBuZWFyIFwiJyt2YWx1ZVtjb250ZXh0LmkuLl0rJ1wiLidcblxuICAgICAgICByZXR1cm4gcmVzdWx0XG5cblxuICAgICMgRHVtcHMgYSBnaXZlbiBKYXZhU2NyaXB0IHZhcmlhYmxlIHRvIGEgWUFNTCBzdHJpbmcuXG4gICAgI1xuICAgICMgQHBhcmFtIFtPYmplY3RdICAgdmFsdWUgICAgICAgICAgICAgICAgICAgVGhlIEphdmFTY3JpcHQgdmFyaWFibGUgdG8gY29udmVydFxuICAgICMgQHBhcmFtIFtCb29sZWFuXSAgZXhjZXB0aW9uT25JbnZhbGlkVHlwZSAgdHJ1ZSBpZiBhbiBleGNlcHRpb24gbXVzdCBiZSB0aHJvd24gb24gaW52YWxpZCB0eXBlcyAoYSBKYXZhU2NyaXB0IHJlc291cmNlIG9yIG9iamVjdCksIGZhbHNlIG90aGVyd2lzZVxuICAgICMgQHBhcmFtIFtGdW5jdGlvbl0gb2JqZWN0RW5jb2RlciAgICAgICAgICAgQSBmdW5jdGlvbiB0byBzZXJpYWxpemUgY3VzdG9tIG9iamVjdHMsIG51bGwgb3RoZXJ3aXNlXG4gICAgI1xuICAgICMgQHJldHVybiBbU3RyaW5nXSAgVGhlIFlBTUwgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgSmF2YVNjcmlwdCBvYmplY3RcbiAgICAjXG4gICAgIyBAdGhyb3cgW0R1bXBFeGNlcHRpb25dXG4gICAgI1xuICAgIEBkdW1wOiAodmFsdWUsIGV4Y2VwdGlvbk9uSW52YWxpZFR5cGUgPSBmYWxzZSwgb2JqZWN0RW5jb2RlciA9IG51bGwpIC0+XG4gICAgICAgIGlmIG5vdCB2YWx1ZT9cbiAgICAgICAgICAgIHJldHVybiAnbnVsbCdcbiAgICAgICAgdHlwZSA9IHR5cGVvZiB2YWx1ZVxuICAgICAgICBpZiB0eXBlIGlzICdvYmplY3QnXG4gICAgICAgICAgICBpZiB2YWx1ZSBpbnN0YW5jZW9mIERhdGVcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUudG9JU09TdHJpbmcoKVxuICAgICAgICAgICAgZWxzZSBpZiBvYmplY3RFbmNvZGVyP1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IG9iamVjdEVuY29kZXIgdmFsdWVcbiAgICAgICAgICAgICAgICBpZiB0eXBlb2YgcmVzdWx0IGlzICdzdHJpbmcnIG9yIHJlc3VsdD9cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdFxuICAgICAgICAgICAgcmV0dXJuIEBkdW1wT2JqZWN0IHZhbHVlXG4gICAgICAgIGlmIHR5cGUgaXMgJ2Jvb2xlYW4nXG4gICAgICAgICAgICByZXR1cm4gKGlmIHZhbHVlIHRoZW4gJ3RydWUnIGVsc2UgJ2ZhbHNlJylcbiAgICAgICAgaWYgVXRpbHMuaXNEaWdpdHModmFsdWUpXG4gICAgICAgICAgICByZXR1cm4gKGlmIHR5cGUgaXMgJ3N0cmluZycgdGhlbiBcIidcIit2YWx1ZStcIidcIiBlbHNlIFN0cmluZyhwYXJzZUludCh2YWx1ZSkpKVxuICAgICAgICBpZiBVdGlscy5pc051bWVyaWModmFsdWUpXG4gICAgICAgICAgICByZXR1cm4gKGlmIHR5cGUgaXMgJ3N0cmluZycgdGhlbiBcIidcIit2YWx1ZStcIidcIiBlbHNlIFN0cmluZyhwYXJzZUZsb2F0KHZhbHVlKSkpXG4gICAgICAgIGlmIHR5cGUgaXMgJ251bWJlcidcbiAgICAgICAgICAgIHJldHVybiAoaWYgdmFsdWUgaXMgSW5maW5pdHkgdGhlbiAnLkluZicgZWxzZSAoaWYgdmFsdWUgaXMgLUluZmluaXR5IHRoZW4gJy0uSW5mJyBlbHNlIChpZiBpc05hTih2YWx1ZSkgdGhlbiAnLk5hTicgZWxzZSB2YWx1ZSkpKVxuICAgICAgICBpZiBFc2NhcGVyLnJlcXVpcmVzRG91YmxlUXVvdGluZyB2YWx1ZVxuICAgICAgICAgICAgcmV0dXJuIEVzY2FwZXIuZXNjYXBlV2l0aERvdWJsZVF1b3RlcyB2YWx1ZVxuICAgICAgICBpZiBFc2NhcGVyLnJlcXVpcmVzU2luZ2xlUXVvdGluZyB2YWx1ZVxuICAgICAgICAgICAgcmV0dXJuIEVzY2FwZXIuZXNjYXBlV2l0aFNpbmdsZVF1b3RlcyB2YWx1ZVxuICAgICAgICBpZiAnJyBpcyB2YWx1ZVxuICAgICAgICAgICAgcmV0dXJuICdcIlwiJ1xuICAgICAgICBpZiBVdGlscy5QQVRURVJOX0RBVEUudGVzdCB2YWx1ZVxuICAgICAgICAgICAgcmV0dXJuIFwiJ1wiK3ZhbHVlK1wiJ1wiO1xuICAgICAgICBpZiB2YWx1ZS50b0xvd2VyQ2FzZSgpIGluIFsnbnVsbCcsJ34nLCd0cnVlJywnZmFsc2UnXVxuICAgICAgICAgICAgcmV0dXJuIFwiJ1wiK3ZhbHVlK1wiJ1wiXG4gICAgICAgICMgRGVmYXVsdFxuICAgICAgICByZXR1cm4gdmFsdWU7XG5cblxuICAgICMgRHVtcHMgYSBKYXZhU2NyaXB0IG9iamVjdCB0byBhIFlBTUwgc3RyaW5nLlxuICAgICNcbiAgICAjIEBwYXJhbSBbT2JqZWN0XSAgIHZhbHVlICAgICAgICAgICAgICAgICAgIFRoZSBKYXZhU2NyaXB0IG9iamVjdCB0byBkdW1wXG4gICAgIyBAcGFyYW0gW0Jvb2xlYW5dICBleGNlcHRpb25PbkludmFsaWRUeXBlICB0cnVlIGlmIGFuIGV4Y2VwdGlvbiBtdXN0IGJlIHRocm93biBvbiBpbnZhbGlkIHR5cGVzIChhIEphdmFTY3JpcHQgcmVzb3VyY2Ugb3Igb2JqZWN0KSwgZmFsc2Ugb3RoZXJ3aXNlXG4gICAgIyBAcGFyYW0gW0Z1bmN0aW9uXSBvYmplY3RFbmNvZGVyICAgICAgICAgICBBIGZ1bmN0aW9uIGRvIHNlcmlhbGl6ZSBjdXN0b20gb2JqZWN0cywgbnVsbCBvdGhlcndpc2VcbiAgICAjXG4gICAgIyBAcmV0dXJuIHN0cmluZyBUaGUgWUFNTCBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBKYXZhU2NyaXB0IG9iamVjdFxuICAgICNcbiAgICBAZHVtcE9iamVjdDogKHZhbHVlLCBleGNlcHRpb25PbkludmFsaWRUeXBlLCBvYmplY3RTdXBwb3J0ID0gbnVsbCkgLT5cbiAgICAgICAgIyBBcnJheVxuICAgICAgICBpZiB2YWx1ZSBpbnN0YW5jZW9mIEFycmF5XG4gICAgICAgICAgICBvdXRwdXQgPSBbXVxuICAgICAgICAgICAgZm9yIHZhbCBpbiB2YWx1ZVxuICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoIEBkdW1wIHZhbFxuICAgICAgICAgICAgcmV0dXJuICdbJytvdXRwdXQuam9pbignLCAnKSsnXSdcblxuICAgICAgICAjIE1hcHBpbmdcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgb3V0cHV0ID0gW11cbiAgICAgICAgICAgIGZvciBrZXksIHZhbCBvZiB2YWx1ZVxuICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoIEBkdW1wKGtleSkrJzogJytAZHVtcCh2YWwpXG4gICAgICAgICAgICByZXR1cm4gJ3snK291dHB1dC5qb2luKCcsICcpKyd9J1xuXG5cbiAgICAjIFBhcnNlcyBhIHNjYWxhciB0byBhIFlBTUwgc3RyaW5nLlxuICAgICNcbiAgICAjIEBwYXJhbSBbT2JqZWN0XSAgIHNjYWxhclxuICAgICMgQHBhcmFtIFtBcnJheV0gICAgZGVsaW1pdGVyc1xuICAgICMgQHBhcmFtIFtBcnJheV0gICAgc3RyaW5nRGVsaW1pdGVyc1xuICAgICMgQHBhcmFtIFtPYmplY3RdICAgY29udGV4dFxuICAgICMgQHBhcmFtIFtCb29sZWFuXSAgZXZhbHVhdGVcbiAgICAjXG4gICAgIyBAcmV0dXJuIFtTdHJpbmddICBBIFlBTUwgc3RyaW5nXG4gICAgI1xuICAgICMgQHRocm93IFtQYXJzZUV4Y2VwdGlvbl0gV2hlbiBtYWxmb3JtZWQgaW5saW5lIFlBTUwgc3RyaW5nIGlzIHBhcnNlZFxuICAgICNcbiAgICBAcGFyc2VTY2FsYXI6IChzY2FsYXIsIGRlbGltaXRlcnMgPSBudWxsLCBzdHJpbmdEZWxpbWl0ZXJzID0gWydcIicsIFwiJ1wiXSwgY29udGV4dCA9IG51bGwsIGV2YWx1YXRlID0gdHJ1ZSkgLT5cbiAgICAgICAgdW5sZXNzIGNvbnRleHQ/XG4gICAgICAgICAgICBjb250ZXh0ID0gZXhjZXB0aW9uT25JbnZhbGlkVHlwZTogQHNldHRpbmdzLmV4Y2VwdGlvbk9uSW52YWxpZFR5cGUsIG9iamVjdERlY29kZXI6IEBzZXR0aW5ncy5vYmplY3REZWNvZGVyLCBpOiAwXG4gICAgICAgIHtpfSA9IGNvbnRleHRcblxuICAgICAgICBpZiBzY2FsYXIuY2hhckF0KGkpIGluIHN0cmluZ0RlbGltaXRlcnNcbiAgICAgICAgICAgICMgUXVvdGVkIHNjYWxhclxuICAgICAgICAgICAgb3V0cHV0ID0gQHBhcnNlUXVvdGVkU2NhbGFyIHNjYWxhciwgY29udGV4dFxuICAgICAgICAgICAge2l9ID0gY29udGV4dFxuXG4gICAgICAgICAgICBpZiBkZWxpbWl0ZXJzP1xuICAgICAgICAgICAgICAgIHRtcCA9IFV0aWxzLmx0cmltIHNjYWxhcltpLi5dLCAnICdcbiAgICAgICAgICAgICAgICBpZiBub3QodG1wLmNoYXJBdCgwKSBpbiBkZWxpbWl0ZXJzKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUGFyc2VFeGNlcHRpb24gJ1VuZXhwZWN0ZWQgY2hhcmFjdGVycyAoJytzY2FsYXJbaS4uXSsnKS4nXG5cbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgIyBcIm5vcm1hbFwiIHN0cmluZ1xuICAgICAgICAgICAgaWYgbm90IGRlbGltaXRlcnNcbiAgICAgICAgICAgICAgICBvdXRwdXQgPSBzY2FsYXJbaS4uXVxuICAgICAgICAgICAgICAgIGkgKz0gb3V0cHV0Lmxlbmd0aFxuXG4gICAgICAgICAgICAgICAgIyBSZW1vdmUgY29tbWVudHNcbiAgICAgICAgICAgICAgICBzdHJwb3MgPSBvdXRwdXQuaW5kZXhPZiAnICMnXG4gICAgICAgICAgICAgICAgaWYgc3RycG9zIGlzbnQgLTFcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0ID0gVXRpbHMucnRyaW0gb3V0cHV0WzAuLi5zdHJwb3NdXG5cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBqb2luZWREZWxpbWl0ZXJzID0gZGVsaW1pdGVycy5qb2luKCd8JylcbiAgICAgICAgICAgICAgICBwYXR0ZXJuID0gQFBBVFRFUk5fU0NBTEFSX0JZX0RFTElNSVRFUlNbam9pbmVkRGVsaW1pdGVyc11cbiAgICAgICAgICAgICAgICB1bmxlc3MgcGF0dGVybj9cbiAgICAgICAgICAgICAgICAgICAgcGF0dGVybiA9IG5ldyBQYXR0ZXJuICdeKC4rPykoJytqb2luZWREZWxpbWl0ZXJzKycpJ1xuICAgICAgICAgICAgICAgICAgICBAUEFUVEVSTl9TQ0FMQVJfQllfREVMSU1JVEVSU1tqb2luZWREZWxpbWl0ZXJzXSA9IHBhdHRlcm5cbiAgICAgICAgICAgICAgICBpZiBtYXRjaCA9IHBhdHRlcm4uZXhlYyBzY2FsYXJbaS4uXVxuICAgICAgICAgICAgICAgICAgICBvdXRwdXQgPSBtYXRjaFsxXVxuICAgICAgICAgICAgICAgICAgICBpICs9IG91dHB1dC5sZW5ndGhcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBQYXJzZUV4Y2VwdGlvbiAnTWFsZm9ybWVkIGlubGluZSBZQU1MIHN0cmluZyAoJytzY2FsYXIrJykuJ1xuXG5cbiAgICAgICAgICAgIGlmIGV2YWx1YXRlXG4gICAgICAgICAgICAgICAgb3V0cHV0ID0gQGV2YWx1YXRlU2NhbGFyIG91dHB1dCwgY29udGV4dFxuXG4gICAgICAgIGNvbnRleHQuaSA9IGlcbiAgICAgICAgcmV0dXJuIG91dHB1dFxuXG5cbiAgICAjIFBhcnNlcyBhIHF1b3RlZCBzY2FsYXIgdG8gWUFNTC5cbiAgICAjXG4gICAgIyBAcGFyYW0gW1N0cmluZ10gICBzY2FsYXJcbiAgICAjIEBwYXJhbSBbT2JqZWN0XSAgIGNvbnRleHRcbiAgICAjXG4gICAgIyBAcmV0dXJuIFtTdHJpbmddICBBIFlBTUwgc3RyaW5nXG4gICAgI1xuICAgICMgQHRocm93IFtQYXJzZUV4Y2VwdGlvbl0gV2hlbiBtYWxmb3JtZWQgaW5saW5lIFlBTUwgc3RyaW5nIGlzIHBhcnNlZFxuICAgICNcbiAgICBAcGFyc2VRdW90ZWRTY2FsYXI6IChzY2FsYXIsIGNvbnRleHQpIC0+XG4gICAgICAgIHtpfSA9IGNvbnRleHRcblxuICAgICAgICB1bmxlc3MgbWF0Y2ggPSBAUEFUVEVSTl9RVU9URURfU0NBTEFSLmV4ZWMgc2NhbGFyW2kuLl1cbiAgICAgICAgICAgIHRocm93IG5ldyBQYXJzZUV4Y2VwdGlvbiAnTWFsZm9ybWVkIGlubGluZSBZQU1MIHN0cmluZyAoJytzY2FsYXJbaS4uXSsnKS4nXG5cbiAgICAgICAgb3V0cHV0ID0gbWF0Y2hbMF0uc3Vic3RyKDEsIG1hdGNoWzBdLmxlbmd0aCAtIDIpXG5cbiAgICAgICAgaWYgJ1wiJyBpcyBzY2FsYXIuY2hhckF0KGkpXG4gICAgICAgICAgICBvdXRwdXQgPSBVbmVzY2FwZXIudW5lc2NhcGVEb3VibGVRdW90ZWRTdHJpbmcgb3V0cHV0XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIG91dHB1dCA9IFVuZXNjYXBlci51bmVzY2FwZVNpbmdsZVF1b3RlZFN0cmluZyBvdXRwdXRcblxuICAgICAgICBpICs9IG1hdGNoWzBdLmxlbmd0aFxuXG4gICAgICAgIGNvbnRleHQuaSA9IGlcbiAgICAgICAgcmV0dXJuIG91dHB1dFxuXG5cbiAgICAjIFBhcnNlcyBhIHNlcXVlbmNlIHRvIGEgWUFNTCBzdHJpbmcuXG4gICAgI1xuICAgICMgQHBhcmFtIFtTdHJpbmddICAgc2VxdWVuY2VcbiAgICAjIEBwYXJhbSBbT2JqZWN0XSAgIGNvbnRleHRcbiAgICAjXG4gICAgIyBAcmV0dXJuIFtTdHJpbmddICBBIFlBTUwgc3RyaW5nXG4gICAgI1xuICAgICMgQHRocm93IFtQYXJzZUV4Y2VwdGlvbl0gV2hlbiBtYWxmb3JtZWQgaW5saW5lIFlBTUwgc3RyaW5nIGlzIHBhcnNlZFxuICAgICNcbiAgICBAcGFyc2VTZXF1ZW5jZTogKHNlcXVlbmNlLCBjb250ZXh0KSAtPlxuICAgICAgICBvdXRwdXQgPSBbXVxuICAgICAgICBsZW4gPSBzZXF1ZW5jZS5sZW5ndGhcbiAgICAgICAge2l9ID0gY29udGV4dFxuICAgICAgICBpICs9IDFcblxuICAgICAgICAjIFtmb28sIGJhciwgLi4uXVxuICAgICAgICB3aGlsZSBpIDwgbGVuXG4gICAgICAgICAgICBjb250ZXh0LmkgPSBpXG4gICAgICAgICAgICBzd2l0Y2ggc2VxdWVuY2UuY2hhckF0KGkpXG4gICAgICAgICAgICAgICAgd2hlbiAnWydcbiAgICAgICAgICAgICAgICAgICAgIyBOZXN0ZWQgc2VxdWVuY2VcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0LnB1c2ggQHBhcnNlU2VxdWVuY2Ugc2VxdWVuY2UsIGNvbnRleHRcbiAgICAgICAgICAgICAgICAgICAge2l9ID0gY29udGV4dFxuICAgICAgICAgICAgICAgIHdoZW4gJ3snXG4gICAgICAgICAgICAgICAgICAgICMgTmVzdGVkIG1hcHBpbmdcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0LnB1c2ggQHBhcnNlTWFwcGluZyBzZXF1ZW5jZSwgY29udGV4dFxuICAgICAgICAgICAgICAgICAgICB7aX0gPSBjb250ZXh0XG4gICAgICAgICAgICAgICAgd2hlbiAnXSdcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG91dHB1dFxuICAgICAgICAgICAgICAgIHdoZW4gJywnLCAnICcsIFwiXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgIyBEbyBub3RoaW5nXG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBpc1F1b3RlZCA9IChzZXF1ZW5jZS5jaGFyQXQoaSkgaW4gWydcIicsIFwiJ1wiXSlcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBAcGFyc2VTY2FsYXIgc2VxdWVuY2UsIFsnLCcsICddJ10sIFsnXCInLCBcIidcIl0sIGNvbnRleHRcbiAgICAgICAgICAgICAgICAgICAge2l9ID0gY29udGV4dFxuXG4gICAgICAgICAgICAgICAgICAgIGlmIG5vdChpc1F1b3RlZCkgYW5kIHR5cGVvZih2YWx1ZSkgaXMgJ3N0cmluZycgYW5kICh2YWx1ZS5pbmRleE9mKCc6ICcpIGlzbnQgLTEgb3IgdmFsdWUuaW5kZXhPZihcIjpcXG5cIikgaXNudCAtMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICMgRW1iZWRkZWQgbWFwcGluZz9cbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gQHBhcnNlTWFwcGluZyAneycrdmFsdWUrJ30nXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRjaCBlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBObywgaXQncyBub3RcblxuXG4gICAgICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoIHZhbHVlXG5cbiAgICAgICAgICAgICAgICAgICAgLS1pXG5cbiAgICAgICAgICAgICsraVxuXG4gICAgICAgIHRocm93IG5ldyBQYXJzZUV4Y2VwdGlvbiAnTWFsZm9ybWVkIGlubGluZSBZQU1MIHN0cmluZyAnK3NlcXVlbmNlXG5cblxuICAgICMgUGFyc2VzIGEgbWFwcGluZyB0byBhIFlBTUwgc3RyaW5nLlxuICAgICNcbiAgICAjIEBwYXJhbSBbU3RyaW5nXSAgIG1hcHBpbmdcbiAgICAjIEBwYXJhbSBbT2JqZWN0XSAgIGNvbnRleHRcbiAgICAjXG4gICAgIyBAcmV0dXJuIFtTdHJpbmddICBBIFlBTUwgc3RyaW5nXG4gICAgI1xuICAgICMgQHRocm93IFtQYXJzZUV4Y2VwdGlvbl0gV2hlbiBtYWxmb3JtZWQgaW5saW5lIFlBTUwgc3RyaW5nIGlzIHBhcnNlZFxuICAgICNcbiAgICBAcGFyc2VNYXBwaW5nOiAobWFwcGluZywgY29udGV4dCkgLT5cbiAgICAgICAgb3V0cHV0ID0ge31cbiAgICAgICAgbGVuID0gbWFwcGluZy5sZW5ndGhcbiAgICAgICAge2l9ID0gY29udGV4dFxuICAgICAgICBpICs9IDFcblxuICAgICAgICAjIHtmb286IGJhciwgYmFyOmZvbywgLi4ufVxuICAgICAgICBzaG91bGRDb250aW51ZVdoaWxlTG9vcCA9IGZhbHNlXG4gICAgICAgIHdoaWxlIGkgPCBsZW5cbiAgICAgICAgICAgIGNvbnRleHQuaSA9IGlcbiAgICAgICAgICAgIHN3aXRjaCBtYXBwaW5nLmNoYXJBdChpKVxuICAgICAgICAgICAgICAgIHdoZW4gJyAnLCAnLCcsIFwiXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgKytpXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuaSA9IGlcbiAgICAgICAgICAgICAgICAgICAgc2hvdWxkQ29udGludWVXaGlsZUxvb3AgPSB0cnVlXG4gICAgICAgICAgICAgICAgd2hlbiAnfSdcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG91dHB1dFxuXG4gICAgICAgICAgICBpZiBzaG91bGRDb250aW51ZVdoaWxlTG9vcFxuICAgICAgICAgICAgICAgIHNob3VsZENvbnRpbnVlV2hpbGVMb29wID0gZmFsc2VcbiAgICAgICAgICAgICAgICBjb250aW51ZVxuXG4gICAgICAgICAgICAjIEtleVxuICAgICAgICAgICAga2V5ID0gQHBhcnNlU2NhbGFyIG1hcHBpbmcsIFsnOicsICcgJywgXCJcXG5cIl0sIFsnXCInLCBcIidcIl0sIGNvbnRleHQsIGZhbHNlXG4gICAgICAgICAgICB7aX0gPSBjb250ZXh0XG5cbiAgICAgICAgICAgICMgVmFsdWVcbiAgICAgICAgICAgIGRvbmUgPSBmYWxzZVxuXG4gICAgICAgICAgICB3aGlsZSBpIDwgbGVuXG4gICAgICAgICAgICAgICAgY29udGV4dC5pID0gaVxuICAgICAgICAgICAgICAgIHN3aXRjaCBtYXBwaW5nLmNoYXJBdChpKVxuICAgICAgICAgICAgICAgICAgICB3aGVuICdbJ1xuICAgICAgICAgICAgICAgICAgICAgICAgIyBOZXN0ZWQgc2VxdWVuY2VcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gQHBhcnNlU2VxdWVuY2UgbWFwcGluZywgY29udGV4dFxuICAgICAgICAgICAgICAgICAgICAgICAge2l9ID0gY29udGV4dFxuICAgICAgICAgICAgICAgICAgICAgICAgIyBTcGVjOiBLZXlzIE1VU1QgYmUgdW5pcXVlOyBmaXJzdCBvbmUgd2lucy5cbiAgICAgICAgICAgICAgICAgICAgICAgICMgUGFyc2VyIGNhbm5vdCBhYm9ydCB0aGlzIG1hcHBpbmcgZWFybGllciwgc2luY2UgbGluZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICMgYXJlIHByb2Nlc3NlZCBzZXF1ZW50aWFsbHkuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiBvdXRwdXRba2V5XSA9PSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXRba2V5XSA9IHZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICBkb25lID0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB3aGVuICd7J1xuICAgICAgICAgICAgICAgICAgICAgICAgIyBOZXN0ZWQgbWFwcGluZ1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBAcGFyc2VNYXBwaW5nIG1hcHBpbmcsIGNvbnRleHRcbiAgICAgICAgICAgICAgICAgICAgICAgIHtpfSA9IGNvbnRleHRcbiAgICAgICAgICAgICAgICAgICAgICAgICMgU3BlYzogS2V5cyBNVVNUIGJlIHVuaXF1ZTsgZmlyc3Qgb25lIHdpbnMuXG4gICAgICAgICAgICAgICAgICAgICAgICAjIFBhcnNlciBjYW5ub3QgYWJvcnQgdGhpcyBtYXBwaW5nIGVhcmxpZXIsIHNpbmNlIGxpbmVzXG4gICAgICAgICAgICAgICAgICAgICAgICAjIGFyZSBwcm9jZXNzZWQgc2VxdWVudGlhbGx5LlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgb3V0cHV0W2tleV0gPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0W2tleV0gPSB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgZG9uZSA9IHRydWVcbiAgICAgICAgICAgICAgICAgICAgd2hlbiAnOicsICcgJywgXCJcXG5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgIyBEbyBub3RoaW5nXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gQHBhcnNlU2NhbGFyIG1hcHBpbmcsIFsnLCcsICd9J10sIFsnXCInLCBcIidcIl0sIGNvbnRleHRcbiAgICAgICAgICAgICAgICAgICAgICAgIHtpfSA9IGNvbnRleHRcbiAgICAgICAgICAgICAgICAgICAgICAgICMgU3BlYzogS2V5cyBNVVNUIGJlIHVuaXF1ZTsgZmlyc3Qgb25lIHdpbnMuXG4gICAgICAgICAgICAgICAgICAgICAgICAjIFBhcnNlciBjYW5ub3QgYWJvcnQgdGhpcyBtYXBwaW5nIGVhcmxpZXIsIHNpbmNlIGxpbmVzXG4gICAgICAgICAgICAgICAgICAgICAgICAjIGFyZSBwcm9jZXNzZWQgc2VxdWVudGlhbGx5LlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgb3V0cHV0W2tleV0gPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0W2tleV0gPSB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgZG9uZSA9IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgIC0taVxuXG4gICAgICAgICAgICAgICAgKytpXG5cbiAgICAgICAgICAgICAgICBpZiBkb25lXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXG5cbiAgICAgICAgdGhyb3cgbmV3IFBhcnNlRXhjZXB0aW9uICdNYWxmb3JtZWQgaW5saW5lIFlBTUwgc3RyaW5nICcrbWFwcGluZ1xuXG5cbiAgICAjIEV2YWx1YXRlcyBzY2FsYXJzIGFuZCByZXBsYWNlcyBtYWdpYyB2YWx1ZXMuXG4gICAgI1xuICAgICMgQHBhcmFtIFtTdHJpbmddICAgc2NhbGFyXG4gICAgI1xuICAgICMgQHJldHVybiBbU3RyaW5nXSAgQSBZQU1MIHN0cmluZ1xuICAgICNcbiAgICBAZXZhbHVhdGVTY2FsYXI6IChzY2FsYXIsIGNvbnRleHQpIC0+XG4gICAgICAgIHNjYWxhciA9IFV0aWxzLnRyaW0oc2NhbGFyKVxuICAgICAgICBzY2FsYXJMb3dlciA9IHNjYWxhci50b0xvd2VyQ2FzZSgpXG5cbiAgICAgICAgc3dpdGNoIHNjYWxhckxvd2VyXG4gICAgICAgICAgICB3aGVuICdudWxsJywgJycsICd+J1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgICAgICB3aGVuICd0cnVlJ1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICB3aGVuICdmYWxzZSdcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIHdoZW4gJy5pbmYnXG4gICAgICAgICAgICAgICAgcmV0dXJuIEluZmluaXR5XG4gICAgICAgICAgICB3aGVuICcubmFuJ1xuICAgICAgICAgICAgICAgIHJldHVybiBOYU5cbiAgICAgICAgICAgIHdoZW4gJy0uaW5mJ1xuICAgICAgICAgICAgICAgIHJldHVybiBJbmZpbml0eVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGZpcnN0Q2hhciA9IHNjYWxhckxvd2VyLmNoYXJBdCgwKVxuICAgICAgICAgICAgICAgIHN3aXRjaCBmaXJzdENoYXJcbiAgICAgICAgICAgICAgICAgICAgd2hlbiAnISdcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0U3BhY2UgPSBzY2FsYXIuaW5kZXhPZignICcpXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiBmaXJzdFNwYWNlIGlzIC0xXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3RXb3JkID0gc2NhbGFyTG93ZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJzdFdvcmQgPSBzY2FsYXJMb3dlclswLi4uZmlyc3RTcGFjZV1cbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCBmaXJzdFdvcmRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGVuICchJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiBmaXJzdFNwYWNlIGlzbnQgLTFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZUludCBAcGFyc2VTY2FsYXIoc2NhbGFyWzIuLl0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hlbiAnIXN0cidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFV0aWxzLmx0cmltIHNjYWxhcls0Li5dXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hlbiAnISFzdHInXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBVdGlscy5sdHJpbSBzY2FsYXJbNS4uXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoZW4gJyEhaW50J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VJbnQoQHBhcnNlU2NhbGFyKHNjYWxhcls1Li5dKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGVuICchIWJvb2wnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBVdGlscy5wYXJzZUJvb2xlYW4oQHBhcnNlU2NhbGFyKHNjYWxhcls2Li5dKSwgZmFsc2UpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hlbiAnISFmbG9hdCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQoQHBhcnNlU2NhbGFyKHNjYWxhcls3Li5dKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGVuICchIXRpbWVzdGFtcCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFV0aWxzLnN0cmluZ1RvRGF0ZShVdGlscy5sdHJpbShzY2FsYXJbMTEuLl0pKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5sZXNzIGNvbnRleHQ/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0ID0gZXhjZXB0aW9uT25JbnZhbGlkVHlwZTogQHNldHRpbmdzLmV4Y2VwdGlvbk9uSW52YWxpZFR5cGUsIG9iamVjdERlY29kZXI6IEBzZXR0aW5ncy5vYmplY3REZWNvZGVyLCBpOiAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtvYmplY3REZWNvZGVyLCBleGNlcHRpb25PbkludmFsaWRUeXBlfSA9IGNvbnRleHRcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiBvYmplY3REZWNvZGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAjIElmIG9iamVjdERlY29kZXIgZnVuY3Rpb24gaXMgZ2l2ZW4sIHdlIGNhbiBkbyBjdXN0b20gZGVjb2Rpbmcgb2YgY3VzdG9tIHR5cGVzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmltbWVkU2NhbGFyID0gVXRpbHMucnRyaW0gc2NhbGFyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJzdFNwYWNlID0gdHJpbW1lZFNjYWxhci5pbmRleE9mKCcgJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIGZpcnN0U3BhY2UgaXMgLTFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2JqZWN0RGVjb2RlciB0cmltbWVkU2NhbGFyLCBudWxsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViVmFsdWUgPSBVdGlscy5sdHJpbSB0cmltbWVkU2NhbGFyW2ZpcnN0U3BhY2UrMS4uXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVubGVzcyBzdWJWYWx1ZS5sZW5ndGggPiAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YlZhbHVlID0gbnVsbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvYmplY3REZWNvZGVyIHRyaW1tZWRTY2FsYXJbMC4uLmZpcnN0U3BhY2VdLCBzdWJWYWx1ZVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIGV4Y2VwdGlvbk9uSW52YWxpZFR5cGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBQYXJzZUV4Y2VwdGlvbiAnQ3VzdG9tIG9iamVjdCBzdXBwb3J0IHdoZW4gcGFyc2luZyBhIFlBTUwgZmlsZSBoYXMgYmVlbiBkaXNhYmxlZC4nXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgICAgICAgICAgICAgd2hlbiAnMCdcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICcweCcgaXMgc2NhbGFyWzAuLi4yXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBVdGlscy5oZXhEZWMgc2NhbGFyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIFV0aWxzLmlzRGlnaXRzIHNjYWxhclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBVdGlscy5vY3REZWMgc2NhbGFyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIFV0aWxzLmlzTnVtZXJpYyBzY2FsYXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VGbG9hdCBzY2FsYXJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2NhbGFyXG4gICAgICAgICAgICAgICAgICAgIHdoZW4gJysnXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiBVdGlscy5pc0RpZ2l0cyBzY2FsYXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByYXcgPSBzY2FsYXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXN0ID0gcGFyc2VJbnQocmF3KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIHJhdyBpcyBTdHJpbmcoY2FzdClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhc3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByYXdcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgVXRpbHMuaXNOdW1lcmljIHNjYWxhclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZUZsb2F0IHNjYWxhclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiBAUEFUVEVSTl9USE9VU0FORF9OVU1FUklDX1NDQUxBUi50ZXN0IHNjYWxhclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZUZsb2F0KHNjYWxhci5yZXBsYWNlKCcsJywgJycpKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNjYWxhclxuICAgICAgICAgICAgICAgICAgICB3aGVuICctJ1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgVXRpbHMuaXNEaWdpdHMoc2NhbGFyWzEuLl0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgJzAnIGlzIHNjYWxhci5jaGFyQXQoMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC1VdGlscy5vY3REZWMoc2NhbGFyWzEuLl0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYXcgPSBzY2FsYXJbMS4uXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXN0ID0gcGFyc2VJbnQocmF3KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiByYXcgaXMgU3RyaW5nKGNhc3QpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gLWNhc3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC1yYXdcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgVXRpbHMuaXNOdW1lcmljIHNjYWxhclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZUZsb2F0IHNjYWxhclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiBAUEFUVEVSTl9USE9VU0FORF9OVU1FUklDX1NDQUxBUi50ZXN0IHNjYWxhclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZUZsb2F0KHNjYWxhci5yZXBsYWNlKCcsJywgJycpKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNjYWxhclxuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiBkYXRlID0gVXRpbHMuc3RyaW5nVG9EYXRlKHNjYWxhcilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiBVdGlscy5pc051bWVyaWMoc2NhbGFyKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZUZsb2F0IHNjYWxhclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiBAUEFUVEVSTl9USE9VU0FORF9OVU1FUklDX1NDQUxBUi50ZXN0IHNjYWxhclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZUZsb2F0KHNjYWxhci5yZXBsYWNlKCcsJywgJycpKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNjYWxhclxuXG5tb2R1bGUuZXhwb3J0cyA9IElubGluZVxuIiwiXG5JbmxpbmUgICAgICAgICAgPSByZXF1aXJlICcuL0lubGluZSdcblBhdHRlcm4gICAgICAgICA9IHJlcXVpcmUgJy4vUGF0dGVybidcblV0aWxzICAgICAgICAgICA9IHJlcXVpcmUgJy4vVXRpbHMnXG5QYXJzZUV4Y2VwdGlvbiAgPSByZXF1aXJlICcuL0V4Y2VwdGlvbi9QYXJzZUV4Y2VwdGlvbidcblxuIyBQYXJzZXIgcGFyc2VzIFlBTUwgc3RyaW5ncyB0byBjb252ZXJ0IHRoZW0gdG8gSmF2YVNjcmlwdCBvYmplY3RzLlxuI1xuY2xhc3MgUGFyc2VyXG5cbiAgICAjIFByZS1jb21waWxlZCBwYXR0ZXJuc1xuICAgICNcbiAgICBQQVRURVJOX0ZPTERFRF9TQ0FMQVJfQUxMOiAgICAgICAgICAgICAgbmV3IFBhdHRlcm4gJ14oPzooPzx0eXBlPiFbXlxcXFx8Pl0qKVxcXFxzKyk/KD88c2VwYXJhdG9yPlxcXFx8fD4pKD88bW9kaWZpZXJzPlxcXFwrfFxcXFwtfFxcXFxkK3xcXFxcK1xcXFxkK3xcXFxcLVxcXFxkK3xcXFxcZCtcXFxcK3xcXFxcZCtcXFxcLSk/KD88Y29tbWVudHM+ICsjLiopPyQnXG4gICAgUEFUVEVSTl9GT0xERURfU0NBTEFSX0VORDogICAgICAgICAgICAgIG5ldyBQYXR0ZXJuICcoPzxzZXBhcmF0b3I+XFxcXHx8PikoPzxtb2RpZmllcnM+XFxcXCt8XFxcXC18XFxcXGQrfFxcXFwrXFxcXGQrfFxcXFwtXFxcXGQrfFxcXFxkK1xcXFwrfFxcXFxkK1xcXFwtKT8oPzxjb21tZW50cz4gKyMuKik/JCdcbiAgICBQQVRURVJOX1NFUVVFTkNFX0lURU06ICAgICAgICAgICAgICAgICAgbmV3IFBhdHRlcm4gJ15cXFxcLSgoPzxsZWFkc3BhY2VzPlxcXFxzKykoPzx2YWx1ZT4uKz8pKT9cXFxccyokJ1xuICAgIFBBVFRFUk5fQU5DSE9SX1ZBTFVFOiAgICAgICAgICAgICAgICAgICBuZXcgUGF0dGVybiAnXiYoPzxyZWY+W14gXSspICooPzx2YWx1ZT4uKiknXG4gICAgUEFUVEVSTl9DT01QQUNUX05PVEFUSU9OOiAgICAgICAgICAgICAgIG5ldyBQYXR0ZXJuICdeKD88a2V5PicrSW5saW5lLlJFR0VYX1FVT1RFRF9TVFJJTkcrJ3xbXiBcXCdcIlxcXFx7XFxcXFtdLio/KSAqXFxcXDooXFxcXHMrKD88dmFsdWU+Lis/KSk/XFxcXHMqJCdcbiAgICBQQVRURVJOX01BUFBJTkdfSVRFTTogICAgICAgICAgICAgICAgICAgbmV3IFBhdHRlcm4gJ14oPzxrZXk+JytJbmxpbmUuUkVHRVhfUVVPVEVEX1NUUklORysnfFteIFxcJ1wiXFxcXFtcXFxce10uKj8pICpcXFxcOihcXFxccysoPzx2YWx1ZT4uKz8pKT9cXFxccyokJ1xuICAgIFBBVFRFUk5fREVDSU1BTDogICAgICAgICAgICAgICAgICAgICAgICBuZXcgUGF0dGVybiAnXFxcXGQrJ1xuICAgIFBBVFRFUk5fSU5ERU5UX1NQQUNFUzogICAgICAgICAgICAgICAgICBuZXcgUGF0dGVybiAnXiArJ1xuICAgIFBBVFRFUk5fVFJBSUxJTkdfTElORVM6ICAgICAgICAgICAgICAgICBuZXcgUGF0dGVybiAnKFxcbiopJCdcbiAgICBQQVRURVJOX1lBTUxfSEVBREVSOiAgICAgICAgICAgICAgICAgICAgbmV3IFBhdHRlcm4gJ15cXFxcJVlBTUxbOiBdW1xcXFxkXFxcXC5dKy4qXFxuJ1xuICAgIFBBVFRFUk5fTEVBRElOR19DT01NRU5UUzogICAgICAgICAgICAgICBuZXcgUGF0dGVybiAnXihcXFxcIy4qP1xcbikrJ1xuICAgIFBBVFRFUk5fRE9DVU1FTlRfTUFSS0VSX1NUQVJUOiAgICAgICAgICBuZXcgUGF0dGVybiAnXlxcXFwtXFxcXC1cXFxcLS4qP1xcbidcbiAgICBQQVRURVJOX0RPQ1VNRU5UX01BUktFUl9FTkQ6ICAgICAgICAgICAgbmV3IFBhdHRlcm4gJ15cXFxcLlxcXFwuXFxcXC5cXFxccyokJ1xuICAgIFBBVFRFUk5fRk9MREVEX1NDQUxBUl9CWV9JTkRFTlRBVElPTjogICB7fVxuXG4gICAgIyBDb250ZXh0IHR5cGVzXG4gICAgI1xuICAgIENPTlRFWFRfTk9ORTogICAgICAgMFxuICAgIENPTlRFWFRfU0VRVUVOQ0U6ICAgMVxuICAgIENPTlRFWFRfTUFQUElORzogICAgMlxuXG5cbiAgICAjIENvbnN0cnVjdG9yXG4gICAgI1xuICAgICMgQHBhcmFtIFtJbnRlZ2VyXSAgb2Zmc2V0ICBUaGUgb2Zmc2V0IG9mIFlBTUwgZG9jdW1lbnQgKHVzZWQgZm9yIGxpbmUgbnVtYmVycyBpbiBlcnJvciBtZXNzYWdlcylcbiAgICAjXG4gICAgY29uc3RydWN0b3I6IChAb2Zmc2V0ID0gMCkgLT5cbiAgICAgICAgQGxpbmVzICAgICAgICAgID0gW11cbiAgICAgICAgQGN1cnJlbnRMaW5lTmIgID0gLTFcbiAgICAgICAgQGN1cnJlbnRMaW5lICAgID0gJydcbiAgICAgICAgQHJlZnMgICAgICAgICAgID0ge31cblxuXG4gICAgIyBQYXJzZXMgYSBZQU1MIHN0cmluZyB0byBhIEphdmFTY3JpcHQgdmFsdWUuXG4gICAgI1xuICAgICMgQHBhcmFtIFtTdHJpbmddICAgdmFsdWUgICAgICAgICAgICAgICAgICAgQSBZQU1MIHN0cmluZ1xuICAgICMgQHBhcmFtIFtCb29sZWFuXSAgZXhjZXB0aW9uT25JbnZhbGlkVHlwZSAgdHJ1ZSBpZiBhbiBleGNlcHRpb24gbXVzdCBiZSB0aHJvd24gb24gaW52YWxpZCB0eXBlcyAoYSBKYXZhU2NyaXB0IHJlc291cmNlIG9yIG9iamVjdCksIGZhbHNlIG90aGVyd2lzZVxuICAgICMgQHBhcmFtIFtGdW5jdGlvbl0gb2JqZWN0RGVjb2RlciAgICAgICAgICAgQSBmdW5jdGlvbiB0byBkZXNlcmlhbGl6ZSBjdXN0b20gb2JqZWN0cywgbnVsbCBvdGhlcndpc2VcbiAgICAjXG4gICAgIyBAcmV0dXJuIFtPYmplY3RdICBBIEphdmFTY3JpcHQgdmFsdWVcbiAgICAjXG4gICAgIyBAdGhyb3cgW1BhcnNlRXhjZXB0aW9uXSBJZiB0aGUgWUFNTCBpcyBub3QgdmFsaWRcbiAgICAjXG4gICAgcGFyc2U6ICh2YWx1ZSwgZXhjZXB0aW9uT25JbnZhbGlkVHlwZSA9IGZhbHNlLCBvYmplY3REZWNvZGVyID0gbnVsbCkgLT5cbiAgICAgICAgQGN1cnJlbnRMaW5lTmIgPSAtMVxuICAgICAgICBAY3VycmVudExpbmUgPSAnJ1xuICAgICAgICBAbGluZXMgPSBAY2xlYW51cCh2YWx1ZSkuc3BsaXQgXCJcXG5cIlxuXG4gICAgICAgIGRhdGEgPSBudWxsXG4gICAgICAgIGNvbnRleHQgPSBAQ09OVEVYVF9OT05FXG4gICAgICAgIGFsbG93T3ZlcndyaXRlID0gZmFsc2VcbiAgICAgICAgd2hpbGUgQG1vdmVUb05leHRMaW5lKClcbiAgICAgICAgICAgIGlmIEBpc0N1cnJlbnRMaW5lRW1wdHkoKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlXG5cbiAgICAgICAgICAgICMgVGFiP1xuICAgICAgICAgICAgaWYgXCJcXHRcIiBpcyBAY3VycmVudExpbmVbMF1cbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUGFyc2VFeGNlcHRpb24gJ0EgWUFNTCBmaWxlIGNhbm5vdCBjb250YWluIHRhYnMgYXMgaW5kZW50YXRpb24uJywgQGdldFJlYWxDdXJyZW50TGluZU5iKCkgKyAxLCBAY3VycmVudExpbmVcblxuICAgICAgICAgICAgaXNSZWYgPSBtZXJnZU5vZGUgPSBmYWxzZVxuICAgICAgICAgICAgaWYgdmFsdWVzID0gQFBBVFRFUk5fU0VRVUVOQ0VfSVRFTS5leGVjIEBjdXJyZW50TGluZVxuICAgICAgICAgICAgICAgIGlmIEBDT05URVhUX01BUFBJTkcgaXMgY29udGV4dFxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUGFyc2VFeGNlcHRpb24gJ1lvdSBjYW5ub3QgZGVmaW5lIGEgc2VxdWVuY2UgaXRlbSB3aGVuIGluIGEgbWFwcGluZydcbiAgICAgICAgICAgICAgICBjb250ZXh0ID0gQENPTlRFWFRfU0VRVUVOQ0VcbiAgICAgICAgICAgICAgICBkYXRhID89IFtdXG5cbiAgICAgICAgICAgICAgICBpZiB2YWx1ZXMudmFsdWU/IGFuZCBtYXRjaGVzID0gQFBBVFRFUk5fQU5DSE9SX1ZBTFVFLmV4ZWMgdmFsdWVzLnZhbHVlXG4gICAgICAgICAgICAgICAgICAgIGlzUmVmID0gbWF0Y2hlcy5yZWZcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzLnZhbHVlID0gbWF0Y2hlcy52YWx1ZVxuXG4gICAgICAgICAgICAgICAgIyBBcnJheVxuICAgICAgICAgICAgICAgIGlmIG5vdCh2YWx1ZXMudmFsdWU/KSBvciAnJyBpcyBVdGlscy50cmltKHZhbHVlcy52YWx1ZSwgJyAnKSBvciBVdGlscy5sdHJpbSh2YWx1ZXMudmFsdWUsICcgJykuaW5kZXhPZignIycpIGlzIDBcbiAgICAgICAgICAgICAgICAgICAgaWYgQGN1cnJlbnRMaW5lTmIgPCBAbGluZXMubGVuZ3RoIC0gMSBhbmQgbm90IEBpc05leHRMaW5lVW5JbmRlbnRlZENvbGxlY3Rpb24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgYyA9IEBnZXRSZWFsQ3VycmVudExpbmVOYigpICsgMVxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VyID0gbmV3IFBhcnNlciBjXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJzZXIucmVmcyA9IEByZWZzXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLnB1c2ggcGFyc2VyLnBhcnNlKEBnZXROZXh0RW1iZWRCbG9jayhudWxsLCB0cnVlKSwgZXhjZXB0aW9uT25JbnZhbGlkVHlwZSwgb2JqZWN0RGVjb2RlcilcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5wdXNoIG51bGxcblxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgaWYgdmFsdWVzLmxlYWRzcGFjZXM/Lmxlbmd0aCBhbmQgbWF0Y2hlcyA9IEBQQVRURVJOX0NPTVBBQ1RfTk9UQVRJT04uZXhlYyB2YWx1ZXMudmFsdWVcblxuICAgICAgICAgICAgICAgICAgICAgICAgIyBUaGlzIGlzIGEgY29tcGFjdCBub3RhdGlvbiBlbGVtZW50LCBhZGQgdG8gbmV4dCBibG9jayBhbmQgcGFyc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIGMgPSBAZ2V0UmVhbEN1cnJlbnRMaW5lTmIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VyID0gbmV3IFBhcnNlciBjXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJzZXIucmVmcyA9IEByZWZzXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGJsb2NrID0gdmFsdWVzLnZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRlbnQgPSBAZ2V0Q3VycmVudExpbmVJbmRlbnRhdGlvbigpXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiBAaXNOZXh0TGluZUluZGVudGVkKGZhbHNlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJsb2NrICs9IFwiXFxuXCIrQGdldE5leHRFbWJlZEJsb2NrKGluZGVudCArIHZhbHVlcy5sZWFkc3BhY2VzLmxlbmd0aCArIDEsIHRydWUpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEucHVzaCBwYXJzZXIucGFyc2UgYmxvY2ssIGV4Y2VwdGlvbk9uSW52YWxpZFR5cGUsIG9iamVjdERlY29kZXJcblxuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLnB1c2ggQHBhcnNlVmFsdWUgdmFsdWVzLnZhbHVlLCBleGNlcHRpb25PbkludmFsaWRUeXBlLCBvYmplY3REZWNvZGVyXG5cbiAgICAgICAgICAgIGVsc2UgaWYgKHZhbHVlcyA9IEBQQVRURVJOX01BUFBJTkdfSVRFTS5leGVjIEBjdXJyZW50TGluZSkgYW5kIHZhbHVlcy5rZXkuaW5kZXhPZignICMnKSBpcyAtMVxuICAgICAgICAgICAgICAgIGlmIEBDT05URVhUX1NFUVVFTkNFIGlzIGNvbnRleHRcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFBhcnNlRXhjZXB0aW9uICdZb3UgY2Fubm90IGRlZmluZSBhIG1hcHBpbmcgaXRlbSB3aGVuIGluIGEgc2VxdWVuY2UnXG4gICAgICAgICAgICAgICAgY29udGV4dCA9IEBDT05URVhUX01BUFBJTkdcbiAgICAgICAgICAgICAgICBkYXRhID89IHt9XG5cbiAgICAgICAgICAgICAgICAjIEZvcmNlIGNvcnJlY3Qgc2V0dGluZ3NcbiAgICAgICAgICAgICAgICBJbmxpbmUuY29uZmlndXJlIGV4Y2VwdGlvbk9uSW52YWxpZFR5cGUsIG9iamVjdERlY29kZXJcbiAgICAgICAgICAgICAgICB0cnlcbiAgICAgICAgICAgICAgICAgICAga2V5ID0gSW5saW5lLnBhcnNlU2NhbGFyIHZhbHVlcy5rZXlcbiAgICAgICAgICAgICAgICBjYXRjaCBlXG4gICAgICAgICAgICAgICAgICAgIGUucGFyc2VkTGluZSA9IEBnZXRSZWFsQ3VycmVudExpbmVOYigpICsgMVxuICAgICAgICAgICAgICAgICAgICBlLnNuaXBwZXQgPSBAY3VycmVudExpbmVcblxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlXG5cbiAgICAgICAgICAgICAgICBpZiAnPDwnIGlzIGtleVxuICAgICAgICAgICAgICAgICAgICBtZXJnZU5vZGUgPSB0cnVlXG4gICAgICAgICAgICAgICAgICAgIGFsbG93T3ZlcndyaXRlID0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICBpZiB2YWx1ZXMudmFsdWU/LmluZGV4T2YoJyonKSBpcyAwXG4gICAgICAgICAgICAgICAgICAgICAgICByZWZOYW1lID0gdmFsdWVzLnZhbHVlWzEuLl1cbiAgICAgICAgICAgICAgICAgICAgICAgIHVubGVzcyBAcmVmc1tyZWZOYW1lXT9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUGFyc2VFeGNlcHRpb24gJ1JlZmVyZW5jZSBcIicrcmVmTmFtZSsnXCIgZG9lcyBub3QgZXhpc3QuJywgQGdldFJlYWxDdXJyZW50TGluZU5iKCkgKyAxLCBAY3VycmVudExpbmVcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmVmFsdWUgPSBAcmVmc1tyZWZOYW1lXVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiB0eXBlb2YgcmVmVmFsdWUgaXNudCAnb2JqZWN0J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBQYXJzZUV4Y2VwdGlvbiAnWUFNTCBtZXJnZSBrZXlzIHVzZWQgd2l0aCBhIHNjYWxhciB2YWx1ZSBpbnN0ZWFkIG9mIGFuIG9iamVjdC4nLCBAZ2V0UmVhbEN1cnJlbnRMaW5lTmIoKSArIDEsIEBjdXJyZW50TGluZVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiByZWZWYWx1ZSBpbnN0YW5jZW9mIEFycmF5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBNZXJnZSBhcnJheSB3aXRoIG9iamVjdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciB2YWx1ZSwgaSBpbiByZWZWYWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhW1N0cmluZyhpKV0gPz0gdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAjIE1lcmdlIG9iamVjdHNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3Iga2V5LCB2YWx1ZSBvZiByZWZWYWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhW2tleV0gPz0gdmFsdWVcblxuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiB2YWx1ZXMudmFsdWU/IGFuZCB2YWx1ZXMudmFsdWUgaXNudCAnJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWVzLnZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBAZ2V0TmV4dEVtYmVkQmxvY2soKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBjID0gQGdldFJlYWxDdXJyZW50TGluZU5iKCkgKyAxXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJzZXIgPSBuZXcgUGFyc2VyIGNcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlci5yZWZzID0gQHJlZnNcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlZCA9IHBhcnNlci5wYXJzZSB2YWx1ZSwgZXhjZXB0aW9uT25JbnZhbGlkVHlwZVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB1bmxlc3MgdHlwZW9mIHBhcnNlZCBpcyAnb2JqZWN0J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBQYXJzZUV4Y2VwdGlvbiAnWUFNTCBtZXJnZSBrZXlzIHVzZWQgd2l0aCBhIHNjYWxhciB2YWx1ZSBpbnN0ZWFkIG9mIGFuIG9iamVjdC4nLCBAZ2V0UmVhbEN1cnJlbnRMaW5lTmIoKSArIDEsIEBjdXJyZW50TGluZVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiBwYXJzZWQgaW5zdGFuY2VvZiBBcnJheVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICMgSWYgdGhlIHZhbHVlIGFzc29jaWF0ZWQgd2l0aCB0aGUgbWVyZ2Uga2V5IGlzIGEgc2VxdWVuY2UsIHRoZW4gdGhpcyBzZXF1ZW5jZSBpcyBleHBlY3RlZCB0byBjb250YWluIG1hcHBpbmcgbm9kZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAjIGFuZCBlYWNoIG9mIHRoZXNlIG5vZGVzIGlzIG1lcmdlZCBpbiB0dXJuIGFjY29yZGluZyB0byBpdHMgb3JkZXIgaW4gdGhlIHNlcXVlbmNlLiBLZXlzIGluIG1hcHBpbmcgbm9kZXMgZWFybGllclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICMgaW4gdGhlIHNlcXVlbmNlIG92ZXJyaWRlIGtleXMgc3BlY2lmaWVkIGluIGxhdGVyIG1hcHBpbmcgbm9kZXMuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIHBhcnNlZEl0ZW0gaW4gcGFyc2VkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVubGVzcyB0eXBlb2YgcGFyc2VkSXRlbSBpcyAnb2JqZWN0J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFBhcnNlRXhjZXB0aW9uICdNZXJnZSBpdGVtcyBtdXN0IGJlIG9iamVjdHMuJywgQGdldFJlYWxDdXJyZW50TGluZU5iKCkgKyAxLCBwYXJzZWRJdGVtXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgcGFyc2VkSXRlbSBpbnN0YW5jZW9mIEFycmF5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAjIE1lcmdlIGFycmF5IHdpdGggb2JqZWN0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgdmFsdWUsIGkgaW4gcGFyc2VkSXRlbVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGsgPSBTdHJpbmcoaSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bmxlc3MgZGF0YS5oYXNPd25Qcm9wZXJ0eShrKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhW2tdID0gdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBNZXJnZSBvYmplY3RzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3Iga2V5LCB2YWx1ZSBvZiBwYXJzZWRJdGVtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5sZXNzIGRhdGEuaGFzT3duUHJvcGVydHkoa2V5KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhW2tleV0gPSB2YWx1ZVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBJZiB0aGUgdmFsdWUgYXNzb2NpYXRlZCB3aXRoIHRoZSBrZXkgaXMgYSBzaW5nbGUgbWFwcGluZyBub2RlLCBlYWNoIG9mIGl0cyBrZXkvdmFsdWUgcGFpcnMgaXMgaW5zZXJ0ZWQgaW50byB0aGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAjIGN1cnJlbnQgbWFwcGluZywgdW5sZXNzIHRoZSBrZXkgYWxyZWFkeSBleGlzdHMgaW4gaXQuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIGtleSwgdmFsdWUgb2YgcGFyc2VkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVubGVzcyBkYXRhLmhhc093blByb3BlcnR5KGtleSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFba2V5XSA9IHZhbHVlXG5cbiAgICAgICAgICAgICAgICBlbHNlIGlmIHZhbHVlcy52YWx1ZT8gYW5kIG1hdGNoZXMgPSBAUEFUVEVSTl9BTkNIT1JfVkFMVUUuZXhlYyB2YWx1ZXMudmFsdWVcbiAgICAgICAgICAgICAgICAgICAgaXNSZWYgPSBtYXRjaGVzLnJlZlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZXMudmFsdWUgPSBtYXRjaGVzLnZhbHVlXG5cblxuICAgICAgICAgICAgICAgIGlmIG1lcmdlTm9kZVxuICAgICAgICAgICAgICAgICAgICAjIE1lcmdlIGtleXNcbiAgICAgICAgICAgICAgICBlbHNlIGlmIG5vdCh2YWx1ZXMudmFsdWU/KSBvciAnJyBpcyBVdGlscy50cmltKHZhbHVlcy52YWx1ZSwgJyAnKSBvciBVdGlscy5sdHJpbSh2YWx1ZXMudmFsdWUsICcgJykuaW5kZXhPZignIycpIGlzIDBcbiAgICAgICAgICAgICAgICAgICAgIyBIYXNoXG4gICAgICAgICAgICAgICAgICAgICMgaWYgbmV4dCBsaW5lIGlzIGxlc3MgaW5kZW50ZWQgb3IgZXF1YWwsIHRoZW4gaXQgbWVhbnMgdGhhdCB0aGUgY3VycmVudCB2YWx1ZSBpcyBudWxsXG4gICAgICAgICAgICAgICAgICAgIGlmIG5vdChAaXNOZXh0TGluZUluZGVudGVkKCkpIGFuZCBub3QoQGlzTmV4dExpbmVVbkluZGVudGVkQ29sbGVjdGlvbigpKVxuICAgICAgICAgICAgICAgICAgICAgICAgIyBTcGVjOiBLZXlzIE1VU1QgYmUgdW5pcXVlOyBmaXJzdCBvbmUgd2lucy5cbiAgICAgICAgICAgICAgICAgICAgICAgICMgQnV0IG92ZXJ3cml0aW5nIGlzIGFsbG93ZWQgd2hlbiBhIG1lcmdlIG5vZGUgaXMgdXNlZCBpbiBjdXJyZW50IGJsb2NrLlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgYWxsb3dPdmVyd3JpdGUgb3IgZGF0YVtrZXldIGlzIHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFba2V5XSA9IG51bGxcblxuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICBjID0gQGdldFJlYWxDdXJyZW50TGluZU5iKCkgKyAxXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJzZXIgPSBuZXcgUGFyc2VyIGNcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlci5yZWZzID0gQHJlZnNcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbCA9IHBhcnNlci5wYXJzZSBAZ2V0TmV4dEVtYmVkQmxvY2soKSwgZXhjZXB0aW9uT25JbnZhbGlkVHlwZSwgb2JqZWN0RGVjb2RlclxuXG4gICAgICAgICAgICAgICAgICAgICAgICAjIFNwZWM6IEtleXMgTVVTVCBiZSB1bmlxdWU7IGZpcnN0IG9uZSB3aW5zLlxuICAgICAgICAgICAgICAgICAgICAgICAgIyBCdXQgb3ZlcndyaXRpbmcgaXMgYWxsb3dlZCB3aGVuIGEgbWVyZ2Ugbm9kZSBpcyB1c2VkIGluIGN1cnJlbnQgYmxvY2suXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiBhbGxvd092ZXJ3cml0ZSBvciBkYXRhW2tleV0gaXMgdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVtrZXldID0gdmFsXG5cbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHZhbCA9IEBwYXJzZVZhbHVlIHZhbHVlcy52YWx1ZSwgZXhjZXB0aW9uT25JbnZhbGlkVHlwZSwgb2JqZWN0RGVjb2RlclxuXG4gICAgICAgICAgICAgICAgICAgICMgU3BlYzogS2V5cyBNVVNUIGJlIHVuaXF1ZTsgZmlyc3Qgb25lIHdpbnMuXG4gICAgICAgICAgICAgICAgICAgICMgQnV0IG92ZXJ3cml0aW5nIGlzIGFsbG93ZWQgd2hlbiBhIG1lcmdlIG5vZGUgaXMgdXNlZCBpbiBjdXJyZW50IGJsb2NrLlxuICAgICAgICAgICAgICAgICAgICBpZiBhbGxvd092ZXJ3cml0ZSBvciBkYXRhW2tleV0gaXMgdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhW2tleV0gPSB2YWxcblxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICMgMS1saW5lciBvcHRpb25hbGx5IGZvbGxvd2VkIGJ5IG5ld2xpbmVcbiAgICAgICAgICAgICAgICBsaW5lQ291bnQgPSBAbGluZXMubGVuZ3RoXG4gICAgICAgICAgICAgICAgaWYgMSBpcyBsaW5lQ291bnQgb3IgKDIgaXMgbGluZUNvdW50IGFuZCBVdGlscy5pc0VtcHR5KEBsaW5lc1sxXSkpXG4gICAgICAgICAgICAgICAgICAgIHRyeVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBJbmxpbmUucGFyc2UgQGxpbmVzWzBdLCBleGNlcHRpb25PbkludmFsaWRUeXBlLCBvYmplY3REZWNvZGVyXG4gICAgICAgICAgICAgICAgICAgIGNhdGNoIGVcbiAgICAgICAgICAgICAgICAgICAgICAgIGUucGFyc2VkTGluZSA9IEBnZXRSZWFsQ3VycmVudExpbmVOYigpICsgMVxuICAgICAgICAgICAgICAgICAgICAgICAgZS5zbmlwcGV0ID0gQGN1cnJlbnRMaW5lXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IGVcblxuICAgICAgICAgICAgICAgICAgICBpZiB0eXBlb2YgdmFsdWUgaXMgJ29iamVjdCdcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIHZhbHVlIGluc3RhbmNlb2YgQXJyYXlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJzdCA9IHZhbHVlWzBdXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIGtleSBvZiB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJzdCA9IHZhbHVlW2tleV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgdHlwZW9mIGZpcnN0IGlzICdzdHJpbmcnIGFuZCBmaXJzdC5pbmRleE9mKCcqJykgaXMgMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEgPSBbXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciBhbGlhcyBpbiB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLnB1c2ggQHJlZnNbYWxpYXNbMS4uXV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGRhdGFcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWVcblxuICAgICAgICAgICAgICAgIGVsc2UgaWYgVXRpbHMubHRyaW0odmFsdWUpLmNoYXJBdCgwKSBpbiBbJ1snLCAneyddXG4gICAgICAgICAgICAgICAgICAgIHRyeVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIElubGluZS5wYXJzZSB2YWx1ZSwgZXhjZXB0aW9uT25JbnZhbGlkVHlwZSwgb2JqZWN0RGVjb2RlclxuICAgICAgICAgICAgICAgICAgICBjYXRjaCBlXG4gICAgICAgICAgICAgICAgICAgICAgICBlLnBhcnNlZExpbmUgPSBAZ2V0UmVhbEN1cnJlbnRMaW5lTmIoKSArIDFcbiAgICAgICAgICAgICAgICAgICAgICAgIGUuc25pcHBldCA9IEBjdXJyZW50TGluZVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBlXG5cbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUGFyc2VFeGNlcHRpb24gJ1VuYWJsZSB0byBwYXJzZS4nLCBAZ2V0UmVhbEN1cnJlbnRMaW5lTmIoKSArIDEsIEBjdXJyZW50TGluZVxuXG4gICAgICAgICAgICBpZiBpc1JlZlxuICAgICAgICAgICAgICAgIGlmIGRhdGEgaW5zdGFuY2VvZiBBcnJheVxuICAgICAgICAgICAgICAgICAgICBAcmVmc1tpc1JlZl0gPSBkYXRhW2RhdGEubGVuZ3RoLTFdXG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBsYXN0S2V5ID0gbnVsbFxuICAgICAgICAgICAgICAgICAgICBmb3Iga2V5IG9mIGRhdGFcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RLZXkgPSBrZXlcbiAgICAgICAgICAgICAgICAgICAgQHJlZnNbaXNSZWZdID0gZGF0YVtsYXN0S2V5XVxuXG5cbiAgICAgICAgaWYgVXRpbHMuaXNFbXB0eShkYXRhKVxuICAgICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIGRhdGFcblxuXG5cbiAgICAjIFJldHVybnMgdGhlIGN1cnJlbnQgbGluZSBudW1iZXIgKHRha2VzIHRoZSBvZmZzZXQgaW50byBhY2NvdW50KS5cbiAgICAjXG4gICAgIyBAcmV0dXJuIFtJbnRlZ2VyXSAgICAgVGhlIGN1cnJlbnQgbGluZSBudW1iZXJcbiAgICAjXG4gICAgZ2V0UmVhbEN1cnJlbnRMaW5lTmI6IC0+XG4gICAgICAgIHJldHVybiBAY3VycmVudExpbmVOYiArIEBvZmZzZXRcblxuXG4gICAgIyBSZXR1cm5zIHRoZSBjdXJyZW50IGxpbmUgaW5kZW50YXRpb24uXG4gICAgI1xuICAgICMgQHJldHVybiBbSW50ZWdlcl0gICAgIFRoZSBjdXJyZW50IGxpbmUgaW5kZW50YXRpb25cbiAgICAjXG4gICAgZ2V0Q3VycmVudExpbmVJbmRlbnRhdGlvbjogLT5cbiAgICAgICAgcmV0dXJuIEBjdXJyZW50TGluZS5sZW5ndGggLSBVdGlscy5sdHJpbShAY3VycmVudExpbmUsICcgJykubGVuZ3RoXG5cblxuICAgICMgUmV0dXJucyB0aGUgbmV4dCBlbWJlZCBibG9jayBvZiBZQU1MLlxuICAgICNcbiAgICAjIEBwYXJhbSBbSW50ZWdlcl0gICAgICAgICAgaW5kZW50YXRpb24gVGhlIGluZGVudCBsZXZlbCBhdCB3aGljaCB0aGUgYmxvY2sgaXMgdG8gYmUgcmVhZCwgb3IgbnVsbCBmb3IgZGVmYXVsdFxuICAgICNcbiAgICAjIEByZXR1cm4gW1N0cmluZ10gICAgICAgICAgQSBZQU1MIHN0cmluZ1xuICAgICNcbiAgICAjIEB0aHJvdyBbUGFyc2VFeGNlcHRpb25dICAgV2hlbiBpbmRlbnRhdGlvbiBwcm9ibGVtIGFyZSBkZXRlY3RlZFxuICAgICNcbiAgICBnZXROZXh0RW1iZWRCbG9jazogKGluZGVudGF0aW9uID0gbnVsbCwgaW5jbHVkZVVuaW5kZW50ZWRDb2xsZWN0aW9uID0gZmFsc2UpIC0+XG4gICAgICAgIEBtb3ZlVG9OZXh0TGluZSgpXG5cbiAgICAgICAgaWYgbm90IGluZGVudGF0aW9uP1xuICAgICAgICAgICAgbmV3SW5kZW50ID0gQGdldEN1cnJlbnRMaW5lSW5kZW50YXRpb24oKVxuXG4gICAgICAgICAgICB1bmluZGVudGVkRW1iZWRCbG9jayA9IEBpc1N0cmluZ1VuSW5kZW50ZWRDb2xsZWN0aW9uSXRlbSBAY3VycmVudExpbmVcblxuICAgICAgICAgICAgaWYgbm90KEBpc0N1cnJlbnRMaW5lRW1wdHkoKSkgYW5kIDAgaXMgbmV3SW5kZW50IGFuZCBub3QodW5pbmRlbnRlZEVtYmVkQmxvY2spXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFBhcnNlRXhjZXB0aW9uICdJbmRlbnRhdGlvbiBwcm9ibGVtLicsIEBnZXRSZWFsQ3VycmVudExpbmVOYigpICsgMSwgQGN1cnJlbnRMaW5lXG5cbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgbmV3SW5kZW50ID0gaW5kZW50YXRpb25cblxuXG4gICAgICAgIGRhdGEgPSBbQGN1cnJlbnRMaW5lW25ld0luZGVudC4uXV1cblxuICAgICAgICB1bmxlc3MgaW5jbHVkZVVuaW5kZW50ZWRDb2xsZWN0aW9uXG4gICAgICAgICAgICBpc0l0VW5pbmRlbnRlZENvbGxlY3Rpb24gPSBAaXNTdHJpbmdVbkluZGVudGVkQ29sbGVjdGlvbkl0ZW0gQGN1cnJlbnRMaW5lXG5cbiAgICAgICAgIyBDb21tZW50cyBtdXN0IG5vdCBiZSByZW1vdmVkIGluc2lkZSBhIHN0cmluZyBibG9jayAoaWUuIGFmdGVyIGEgbGluZSBlbmRpbmcgd2l0aCBcInxcIilcbiAgICAgICAgIyBUaGV5IG11c3Qgbm90IGJlIHJlbW92ZWQgaW5zaWRlIGEgc3ViLWVtYmVkZGVkIGJsb2NrIGFzIHdlbGxcbiAgICAgICAgcmVtb3ZlQ29tbWVudHNQYXR0ZXJuID0gQFBBVFRFUk5fRk9MREVEX1NDQUxBUl9FTkRcbiAgICAgICAgcmVtb3ZlQ29tbWVudHMgPSBub3QgcmVtb3ZlQ29tbWVudHNQYXR0ZXJuLnRlc3QgQGN1cnJlbnRMaW5lXG5cbiAgICAgICAgd2hpbGUgQG1vdmVUb05leHRMaW5lKClcbiAgICAgICAgICAgIGluZGVudCA9IEBnZXRDdXJyZW50TGluZUluZGVudGF0aW9uKClcblxuICAgICAgICAgICAgaWYgaW5kZW50IGlzIG5ld0luZGVudFxuICAgICAgICAgICAgICAgIHJlbW92ZUNvbW1lbnRzID0gbm90IHJlbW92ZUNvbW1lbnRzUGF0dGVybi50ZXN0IEBjdXJyZW50TGluZVxuXG4gICAgICAgICAgICBpZiBpc0l0VW5pbmRlbnRlZENvbGxlY3Rpb24gYW5kIG5vdCBAaXNTdHJpbmdVbkluZGVudGVkQ29sbGVjdGlvbkl0ZW0oQGN1cnJlbnRMaW5lKSBhbmQgaW5kZW50IGlzIG5ld0luZGVudFxuICAgICAgICAgICAgICAgIEBtb3ZlVG9QcmV2aW91c0xpbmUoKVxuICAgICAgICAgICAgICAgIGJyZWFrXG5cbiAgICAgICAgICAgIGlmIEBpc0N1cnJlbnRMaW5lQmxhbmsoKVxuICAgICAgICAgICAgICAgIGRhdGEucHVzaCBAY3VycmVudExpbmVbbmV3SW5kZW50Li5dXG4gICAgICAgICAgICAgICAgY29udGludWVcblxuICAgICAgICAgICAgaWYgcmVtb3ZlQ29tbWVudHMgYW5kIEBpc0N1cnJlbnRMaW5lQ29tbWVudCgpXG4gICAgICAgICAgICAgICAgaWYgaW5kZW50IGlzIG5ld0luZGVudFxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZVxuXG4gICAgICAgICAgICBpZiBpbmRlbnQgPj0gbmV3SW5kZW50XG4gICAgICAgICAgICAgICAgZGF0YS5wdXNoIEBjdXJyZW50TGluZVtuZXdJbmRlbnQuLl1cbiAgICAgICAgICAgIGVsc2UgaWYgVXRpbHMubHRyaW0oQGN1cnJlbnRMaW5lKS5jaGFyQXQoMCkgaXMgJyMnXG4gICAgICAgICAgICAgICAgIyBEb24ndCBhZGQgbGluZSB3aXRoIGNvbW1lbnRzXG4gICAgICAgICAgICBlbHNlIGlmIDAgaXMgaW5kZW50XG4gICAgICAgICAgICAgICAgQG1vdmVUb1ByZXZpb3VzTGluZSgpXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUGFyc2VFeGNlcHRpb24gJ0luZGVudGF0aW9uIHByb2JsZW0uJywgQGdldFJlYWxDdXJyZW50TGluZU5iKCkgKyAxLCBAY3VycmVudExpbmVcblxuXG4gICAgICAgIHJldHVybiBkYXRhLmpvaW4gXCJcXG5cIlxuXG5cbiAgICAjIE1vdmVzIHRoZSBwYXJzZXIgdG8gdGhlIG5leHQgbGluZS5cbiAgICAjXG4gICAgIyBAcmV0dXJuIFtCb29sZWFuXVxuICAgICNcbiAgICBtb3ZlVG9OZXh0TGluZTogLT5cbiAgICAgICAgaWYgQGN1cnJlbnRMaW5lTmIgPj0gQGxpbmVzLmxlbmd0aCAtIDFcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuXG4gICAgICAgIEBjdXJyZW50TGluZSA9IEBsaW5lc1srK0BjdXJyZW50TGluZU5iXTtcblxuICAgICAgICByZXR1cm4gdHJ1ZVxuXG5cbiAgICAjIE1vdmVzIHRoZSBwYXJzZXIgdG8gdGhlIHByZXZpb3VzIGxpbmUuXG4gICAgI1xuICAgIG1vdmVUb1ByZXZpb3VzTGluZTogLT5cbiAgICAgICAgQGN1cnJlbnRMaW5lID0gQGxpbmVzWy0tQGN1cnJlbnRMaW5lTmJdXG4gICAgICAgIHJldHVyblxuXG5cbiAgICAjIFBhcnNlcyBhIFlBTUwgdmFsdWUuXG4gICAgI1xuICAgICMgQHBhcmFtIFtTdHJpbmddICAgdmFsdWUgICAgICAgICAgICAgICAgICAgQSBZQU1MIHZhbHVlXG4gICAgIyBAcGFyYW0gW0Jvb2xlYW5dICBleGNlcHRpb25PbkludmFsaWRUeXBlICB0cnVlIGlmIGFuIGV4Y2VwdGlvbiBtdXN0IGJlIHRocm93biBvbiBpbnZhbGlkIHR5cGVzIGZhbHNlIG90aGVyd2lzZVxuICAgICMgQHBhcmFtIFtGdW5jdGlvbl0gb2JqZWN0RGVjb2RlciAgICAgICAgICAgQSBmdW5jdGlvbiB0byBkZXNlcmlhbGl6ZSBjdXN0b20gb2JqZWN0cywgbnVsbCBvdGhlcndpc2VcbiAgICAjXG4gICAgIyBAcmV0dXJuIFtPYmplY3RdIEEgSmF2YVNjcmlwdCB2YWx1ZVxuICAgICNcbiAgICAjIEB0aHJvdyBbUGFyc2VFeGNlcHRpb25dIFdoZW4gcmVmZXJlbmNlIGRvZXMgbm90IGV4aXN0XG4gICAgI1xuICAgIHBhcnNlVmFsdWU6ICh2YWx1ZSwgZXhjZXB0aW9uT25JbnZhbGlkVHlwZSwgb2JqZWN0RGVjb2RlcikgLT5cbiAgICAgICAgaWYgMCBpcyB2YWx1ZS5pbmRleE9mKCcqJylcbiAgICAgICAgICAgIHBvcyA9IHZhbHVlLmluZGV4T2YgJyMnXG4gICAgICAgICAgICBpZiBwb3MgaXNudCAtMVxuICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUuc3Vic3RyKDEsIHBvcy0yKVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWVbMS4uXVxuXG4gICAgICAgICAgICBpZiBAcmVmc1t2YWx1ZV0gaXMgdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFBhcnNlRXhjZXB0aW9uICdSZWZlcmVuY2UgXCInK3ZhbHVlKydcIiBkb2VzIG5vdCBleGlzdC4nLCBAY3VycmVudExpbmVcblxuICAgICAgICAgICAgcmV0dXJuIEByZWZzW3ZhbHVlXVxuXG5cbiAgICAgICAgaWYgbWF0Y2hlcyA9IEBQQVRURVJOX0ZPTERFRF9TQ0FMQVJfQUxMLmV4ZWMgdmFsdWVcbiAgICAgICAgICAgIG1vZGlmaWVycyA9IG1hdGNoZXMubW9kaWZpZXJzID8gJydcblxuICAgICAgICAgICAgZm9sZGVkSW5kZW50ID0gTWF0aC5hYnMocGFyc2VJbnQobW9kaWZpZXJzKSlcbiAgICAgICAgICAgIGlmIGlzTmFOKGZvbGRlZEluZGVudCkgdGhlbiBmb2xkZWRJbmRlbnQgPSAwXG4gICAgICAgICAgICB2YWwgPSBAcGFyc2VGb2xkZWRTY2FsYXIgbWF0Y2hlcy5zZXBhcmF0b3IsIEBQQVRURVJOX0RFQ0lNQUwucmVwbGFjZShtb2RpZmllcnMsICcnKSwgZm9sZGVkSW5kZW50XG4gICAgICAgICAgICBpZiBtYXRjaGVzLnR5cGU/XG4gICAgICAgICAgICAgICAgIyBGb3JjZSBjb3JyZWN0IHNldHRpbmdzXG4gICAgICAgICAgICAgICAgSW5saW5lLmNvbmZpZ3VyZSBleGNlcHRpb25PbkludmFsaWRUeXBlLCBvYmplY3REZWNvZGVyXG4gICAgICAgICAgICAgICAgcmV0dXJuIElubGluZS5wYXJzZVNjYWxhciBtYXRjaGVzLnR5cGUrJyAnK3ZhbFxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJldHVybiB2YWxcblxuICAgICAgICB0cnlcbiAgICAgICAgICAgIHJldHVybiBJbmxpbmUucGFyc2UgdmFsdWUsIGV4Y2VwdGlvbk9uSW52YWxpZFR5cGUsIG9iamVjdERlY29kZXJcbiAgICAgICAgY2F0Y2ggZVxuICAgICAgICAgICAgIyBUcnkgdG8gcGFyc2UgbXVsdGlsaW5lIGNvbXBhY3Qgc2VxdWVuY2Ugb3IgbWFwcGluZ1xuICAgICAgICAgICAgaWYgdmFsdWUuY2hhckF0KDApIGluIFsnWycsICd7J10gYW5kIGUgaW5zdGFuY2VvZiBQYXJzZUV4Y2VwdGlvbiBhbmQgQGlzTmV4dExpbmVJbmRlbnRlZCgpXG4gICAgICAgICAgICAgICAgdmFsdWUgKz0gXCJcXG5cIiArIEBnZXROZXh0RW1iZWRCbG9jaygpXG4gICAgICAgICAgICAgICAgdHJ5XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBJbmxpbmUucGFyc2UgdmFsdWUsIGV4Y2VwdGlvbk9uSW52YWxpZFR5cGUsIG9iamVjdERlY29kZXJcbiAgICAgICAgICAgICAgICBjYXRjaCBlXG4gICAgICAgICAgICAgICAgICAgIGUucGFyc2VkTGluZSA9IEBnZXRSZWFsQ3VycmVudExpbmVOYigpICsgMVxuICAgICAgICAgICAgICAgICAgICBlLnNuaXBwZXQgPSBAY3VycmVudExpbmVcblxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlXG5cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBlLnBhcnNlZExpbmUgPSBAZ2V0UmVhbEN1cnJlbnRMaW5lTmIoKSArIDFcbiAgICAgICAgICAgICAgICBlLnNuaXBwZXQgPSBAY3VycmVudExpbmVcblxuICAgICAgICAgICAgICAgIHRocm93IGVcblxuICAgICAgICByZXR1cm5cblxuXG4gICAgIyBQYXJzZXMgYSBmb2xkZWQgc2NhbGFyLlxuICAgICNcbiAgICAjIEBwYXJhbSBbU3RyaW5nXSAgICAgICBzZXBhcmF0b3IgICBUaGUgc2VwYXJhdG9yIHRoYXQgd2FzIHVzZWQgdG8gYmVnaW4gdGhpcyBmb2xkZWQgc2NhbGFyICh8IG9yID4pXG4gICAgIyBAcGFyYW0gW1N0cmluZ10gICAgICAgaW5kaWNhdG9yICAgVGhlIGluZGljYXRvciB0aGF0IHdhcyB1c2VkIHRvIGJlZ2luIHRoaXMgZm9sZGVkIHNjYWxhciAoKyBvciAtKVxuICAgICMgQHBhcmFtIFtJbnRlZ2VyXSAgICAgIGluZGVudGF0aW9uIFRoZSBpbmRlbnRhdGlvbiB0aGF0IHdhcyB1c2VkIHRvIGJlZ2luIHRoaXMgZm9sZGVkIHNjYWxhclxuICAgICNcbiAgICAjIEByZXR1cm4gW1N0cmluZ10gICAgICBUaGUgdGV4dCB2YWx1ZVxuICAgICNcbiAgICBwYXJzZUZvbGRlZFNjYWxhcjogKHNlcGFyYXRvciwgaW5kaWNhdG9yID0gJycsIGluZGVudGF0aW9uID0gMCkgLT5cbiAgICAgICAgbm90RU9GID0gQG1vdmVUb05leHRMaW5lKClcbiAgICAgICAgaWYgbm90IG5vdEVPRlxuICAgICAgICAgICAgcmV0dXJuICcnXG5cbiAgICAgICAgaXNDdXJyZW50TGluZUJsYW5rID0gQGlzQ3VycmVudExpbmVCbGFuaygpXG4gICAgICAgIHRleHQgPSAnJ1xuXG4gICAgICAgICMgTGVhZGluZyBibGFuayBsaW5lcyBhcmUgY29uc3VtZWQgYmVmb3JlIGRldGVybWluaW5nIGluZGVudGF0aW9uXG4gICAgICAgIHdoaWxlIG5vdEVPRiBhbmQgaXNDdXJyZW50TGluZUJsYW5rXG4gICAgICAgICAgICAjIG5ld2xpbmUgb25seSBpZiBub3QgRU9GXG4gICAgICAgICAgICBpZiBub3RFT0YgPSBAbW92ZVRvTmV4dExpbmUoKVxuICAgICAgICAgICAgICAgIHRleHQgKz0gXCJcXG5cIlxuICAgICAgICAgICAgICAgIGlzQ3VycmVudExpbmVCbGFuayA9IEBpc0N1cnJlbnRMaW5lQmxhbmsoKVxuXG5cbiAgICAgICAgIyBEZXRlcm1pbmUgaW5kZW50YXRpb24gaWYgbm90IHNwZWNpZmllZFxuICAgICAgICBpZiAwIGlzIGluZGVudGF0aW9uXG4gICAgICAgICAgICBpZiBtYXRjaGVzID0gQFBBVFRFUk5fSU5ERU5UX1NQQUNFUy5leGVjIEBjdXJyZW50TGluZVxuICAgICAgICAgICAgICAgIGluZGVudGF0aW9uID0gbWF0Y2hlc1swXS5sZW5ndGhcblxuXG4gICAgICAgIGlmIGluZGVudGF0aW9uID4gMFxuICAgICAgICAgICAgcGF0dGVybiA9IEBQQVRURVJOX0ZPTERFRF9TQ0FMQVJfQllfSU5ERU5UQVRJT05baW5kZW50YXRpb25dXG4gICAgICAgICAgICB1bmxlc3MgcGF0dGVybj9cbiAgICAgICAgICAgICAgICBwYXR0ZXJuID0gbmV3IFBhdHRlcm4gJ14geycraW5kZW50YXRpb24rJ30oLiopJCdcbiAgICAgICAgICAgICAgICBQYXJzZXI6OlBBVFRFUk5fRk9MREVEX1NDQUxBUl9CWV9JTkRFTlRBVElPTltpbmRlbnRhdGlvbl0gPSBwYXR0ZXJuXG5cbiAgICAgICAgICAgIHdoaWxlIG5vdEVPRiBhbmQgKGlzQ3VycmVudExpbmVCbGFuayBvciBtYXRjaGVzID0gcGF0dGVybi5leGVjIEBjdXJyZW50TGluZSlcbiAgICAgICAgICAgICAgICBpZiBpc0N1cnJlbnRMaW5lQmxhbmtcbiAgICAgICAgICAgICAgICAgICAgdGV4dCArPSBAY3VycmVudExpbmVbaW5kZW50YXRpb24uLl1cbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHRleHQgKz0gbWF0Y2hlc1sxXVxuXG4gICAgICAgICAgICAgICAgIyBuZXdsaW5lIG9ubHkgaWYgbm90IEVPRlxuICAgICAgICAgICAgICAgIGlmIG5vdEVPRiA9IEBtb3ZlVG9OZXh0TGluZSgpXG4gICAgICAgICAgICAgICAgICAgIHRleHQgKz0gXCJcXG5cIlxuICAgICAgICAgICAgICAgICAgICBpc0N1cnJlbnRMaW5lQmxhbmsgPSBAaXNDdXJyZW50TGluZUJsYW5rKClcblxuICAgICAgICBlbHNlIGlmIG5vdEVPRlxuICAgICAgICAgICAgdGV4dCArPSBcIlxcblwiXG5cblxuICAgICAgICBpZiBub3RFT0ZcbiAgICAgICAgICAgIEBtb3ZlVG9QcmV2aW91c0xpbmUoKVxuXG5cbiAgICAgICAgIyBSZW1vdmUgbGluZSBicmVha3Mgb2YgZWFjaCBsaW5lcyBleGNlcHQgdGhlIGVtcHR5IGFuZCBtb3JlIGluZGVudGVkIG9uZXNcbiAgICAgICAgaWYgJz4nIGlzIHNlcGFyYXRvclxuICAgICAgICAgICAgbmV3VGV4dCA9ICcnXG4gICAgICAgICAgICBmb3IgbGluZSBpbiB0ZXh0LnNwbGl0IFwiXFxuXCJcbiAgICAgICAgICAgICAgICBpZiBsaW5lLmxlbmd0aCBpcyAwIG9yIGxpbmUuY2hhckF0KDApIGlzICcgJ1xuICAgICAgICAgICAgICAgICAgICBuZXdUZXh0ID0gVXRpbHMucnRyaW0obmV3VGV4dCwgJyAnKSArIGxpbmUgKyBcIlxcblwiXG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBuZXdUZXh0ICs9IGxpbmUgKyAnICdcbiAgICAgICAgICAgIHRleHQgPSBuZXdUZXh0XG5cbiAgICAgICAgaWYgJysnIGlzbnQgaW5kaWNhdG9yXG4gICAgICAgICAgICAjIFJlbW92ZSBhbnkgZXh0cmEgc3BhY2Ugb3IgbmV3IGxpbmUgYXMgd2UgYXJlIGFkZGluZyB0aGVtIGFmdGVyXG4gICAgICAgICAgICB0ZXh0ID0gVXRpbHMucnRyaW0odGV4dClcblxuICAgICAgICAjIERlYWwgd2l0aCB0cmFpbGluZyBuZXdsaW5lcyBhcyBpbmRpY2F0ZWRcbiAgICAgICAgaWYgJycgaXMgaW5kaWNhdG9yXG4gICAgICAgICAgICB0ZXh0ID0gQFBBVFRFUk5fVFJBSUxJTkdfTElORVMucmVwbGFjZSB0ZXh0LCBcIlxcblwiXG4gICAgICAgIGVsc2UgaWYgJy0nIGlzIGluZGljYXRvclxuICAgICAgICAgICAgdGV4dCA9IEBQQVRURVJOX1RSQUlMSU5HX0xJTkVTLnJlcGxhY2UgdGV4dCwgJydcblxuICAgICAgICByZXR1cm4gdGV4dFxuXG5cbiAgICAjIFJldHVybnMgdHJ1ZSBpZiB0aGUgbmV4dCBsaW5lIGlzIGluZGVudGVkLlxuICAgICNcbiAgICAjIEByZXR1cm4gW0Jvb2xlYW5dICAgICBSZXR1cm5zIHRydWUgaWYgdGhlIG5leHQgbGluZSBpcyBpbmRlbnRlZCwgZmFsc2Ugb3RoZXJ3aXNlXG4gICAgI1xuICAgIGlzTmV4dExpbmVJbmRlbnRlZDogKGlnbm9yZUNvbW1lbnRzID0gdHJ1ZSkgLT5cbiAgICAgICAgY3VycmVudEluZGVudGF0aW9uID0gQGdldEN1cnJlbnRMaW5lSW5kZW50YXRpb24oKVxuICAgICAgICBFT0YgPSBub3QgQG1vdmVUb05leHRMaW5lKClcblxuICAgICAgICBpZiBpZ25vcmVDb21tZW50c1xuICAgICAgICAgICAgd2hpbGUgbm90KEVPRikgYW5kIEBpc0N1cnJlbnRMaW5lRW1wdHkoKVxuICAgICAgICAgICAgICAgIEVPRiA9IG5vdCBAbW92ZVRvTmV4dExpbmUoKVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICB3aGlsZSBub3QoRU9GKSBhbmQgQGlzQ3VycmVudExpbmVCbGFuaygpXG4gICAgICAgICAgICAgICAgRU9GID0gbm90IEBtb3ZlVG9OZXh0TGluZSgpXG5cbiAgICAgICAgaWYgRU9GXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcblxuICAgICAgICByZXQgPSBmYWxzZVxuICAgICAgICBpZiBAZ2V0Q3VycmVudExpbmVJbmRlbnRhdGlvbigpID4gY3VycmVudEluZGVudGF0aW9uXG4gICAgICAgICAgICByZXQgPSB0cnVlXG5cbiAgICAgICAgQG1vdmVUb1ByZXZpb3VzTGluZSgpXG5cbiAgICAgICAgcmV0dXJuIHJldFxuXG5cbiAgICAjIFJldHVybnMgdHJ1ZSBpZiB0aGUgY3VycmVudCBsaW5lIGlzIGJsYW5rIG9yIGlmIGl0IGlzIGEgY29tbWVudCBsaW5lLlxuICAgICNcbiAgICAjIEByZXR1cm4gW0Jvb2xlYW5dICAgICBSZXR1cm5zIHRydWUgaWYgdGhlIGN1cnJlbnQgbGluZSBpcyBlbXB0eSBvciBpZiBpdCBpcyBhIGNvbW1lbnQgbGluZSwgZmFsc2Ugb3RoZXJ3aXNlXG4gICAgI1xuICAgIGlzQ3VycmVudExpbmVFbXB0eTogLT5cbiAgICAgICAgdHJpbW1lZExpbmUgPSBVdGlscy50cmltKEBjdXJyZW50TGluZSwgJyAnKVxuICAgICAgICByZXR1cm4gdHJpbW1lZExpbmUubGVuZ3RoIGlzIDAgb3IgdHJpbW1lZExpbmUuY2hhckF0KDApIGlzICcjJ1xuXG5cbiAgICAjIFJldHVybnMgdHJ1ZSBpZiB0aGUgY3VycmVudCBsaW5lIGlzIGJsYW5rLlxuICAgICNcbiAgICAjIEByZXR1cm4gW0Jvb2xlYW5dICAgICBSZXR1cm5zIHRydWUgaWYgdGhlIGN1cnJlbnQgbGluZSBpcyBibGFuaywgZmFsc2Ugb3RoZXJ3aXNlXG4gICAgI1xuICAgIGlzQ3VycmVudExpbmVCbGFuazogLT5cbiAgICAgICAgcmV0dXJuICcnIGlzIFV0aWxzLnRyaW0oQGN1cnJlbnRMaW5lLCAnICcpXG5cblxuICAgICMgUmV0dXJucyB0cnVlIGlmIHRoZSBjdXJyZW50IGxpbmUgaXMgYSBjb21tZW50IGxpbmUuXG4gICAgI1xuICAgICMgQHJldHVybiBbQm9vbGVhbl0gICAgIFJldHVybnMgdHJ1ZSBpZiB0aGUgY3VycmVudCBsaW5lIGlzIGEgY29tbWVudCBsaW5lLCBmYWxzZSBvdGhlcndpc2VcbiAgICAjXG4gICAgaXNDdXJyZW50TGluZUNvbW1lbnQ6IC0+XG4gICAgICAgICMgQ2hlY2tpbmcgZXhwbGljaXRseSB0aGUgZmlyc3QgY2hhciBvZiB0aGUgdHJpbSBpcyBmYXN0ZXIgdGhhbiBsb29wcyBvciBzdHJwb3NcbiAgICAgICAgbHRyaW1tZWRMaW5lID0gVXRpbHMubHRyaW0oQGN1cnJlbnRMaW5lLCAnICcpXG5cbiAgICAgICAgcmV0dXJuIGx0cmltbWVkTGluZS5jaGFyQXQoMCkgaXMgJyMnXG5cblxuICAgICMgQ2xlYW51cHMgYSBZQU1MIHN0cmluZyB0byBiZSBwYXJzZWQuXG4gICAgI1xuICAgICMgQHBhcmFtIFtTdHJpbmddICAgdmFsdWUgVGhlIGlucHV0IFlBTUwgc3RyaW5nXG4gICAgI1xuICAgICMgQHJldHVybiBbU3RyaW5nXSAgQSBjbGVhbmVkIHVwIFlBTUwgc3RyaW5nXG4gICAgI1xuICAgIGNsZWFudXA6ICh2YWx1ZSkgLT5cbiAgICAgICAgaWYgdmFsdWUuaW5kZXhPZihcIlxcclwiKSBpc250IC0xXG4gICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnNwbGl0KFwiXFxyXFxuXCIpLmpvaW4oXCJcXG5cIikuc3BsaXQoXCJcXHJcIikuam9pbihcIlxcblwiKVxuXG4gICAgICAgICMgU3RyaXAgWUFNTCBoZWFkZXJcbiAgICAgICAgY291bnQgPSAwXG4gICAgICAgIFt2YWx1ZSwgY291bnRdID0gQFBBVFRFUk5fWUFNTF9IRUFERVIucmVwbGFjZUFsbCB2YWx1ZSwgJydcbiAgICAgICAgQG9mZnNldCArPSBjb3VudFxuXG4gICAgICAgICMgUmVtb3ZlIGxlYWRpbmcgY29tbWVudHNcbiAgICAgICAgW3RyaW1tZWRWYWx1ZSwgY291bnRdID0gQFBBVFRFUk5fTEVBRElOR19DT01NRU5UUy5yZXBsYWNlQWxsIHZhbHVlLCAnJywgMVxuICAgICAgICBpZiBjb3VudCBpcyAxXG4gICAgICAgICAgICAjIEl0ZW1zIGhhdmUgYmVlbiByZW1vdmVkLCB1cGRhdGUgdGhlIG9mZnNldFxuICAgICAgICAgICAgQG9mZnNldCArPSBVdGlscy5zdWJTdHJDb3VudCh2YWx1ZSwgXCJcXG5cIikgLSBVdGlscy5zdWJTdHJDb3VudCh0cmltbWVkVmFsdWUsIFwiXFxuXCIpXG4gICAgICAgICAgICB2YWx1ZSA9IHRyaW1tZWRWYWx1ZVxuXG4gICAgICAgICMgUmVtb3ZlIHN0YXJ0IG9mIHRoZSBkb2N1bWVudCBtYXJrZXIgKC0tLSlcbiAgICAgICAgW3RyaW1tZWRWYWx1ZSwgY291bnRdID0gQFBBVFRFUk5fRE9DVU1FTlRfTUFSS0VSX1NUQVJULnJlcGxhY2VBbGwgdmFsdWUsICcnLCAxXG4gICAgICAgIGlmIGNvdW50IGlzIDFcbiAgICAgICAgICAgICMgSXRlbXMgaGF2ZSBiZWVuIHJlbW92ZWQsIHVwZGF0ZSB0aGUgb2Zmc2V0XG4gICAgICAgICAgICBAb2Zmc2V0ICs9IFV0aWxzLnN1YlN0ckNvdW50KHZhbHVlLCBcIlxcblwiKSAtIFV0aWxzLnN1YlN0ckNvdW50KHRyaW1tZWRWYWx1ZSwgXCJcXG5cIilcbiAgICAgICAgICAgIHZhbHVlID0gdHJpbW1lZFZhbHVlXG5cbiAgICAgICAgICAgICMgUmVtb3ZlIGVuZCBvZiB0aGUgZG9jdW1lbnQgbWFya2VyICguLi4pXG4gICAgICAgICAgICB2YWx1ZSA9IEBQQVRURVJOX0RPQ1VNRU5UX01BUktFUl9FTkQucmVwbGFjZSB2YWx1ZSwgJydcblxuICAgICAgICAjIEVuc3VyZSB0aGUgYmxvY2sgaXMgbm90IGluZGVudGVkXG4gICAgICAgIGxpbmVzID0gdmFsdWUuc3BsaXQoXCJcXG5cIilcbiAgICAgICAgc21hbGxlc3RJbmRlbnQgPSAtMVxuICAgICAgICBmb3IgbGluZSBpbiBsaW5lc1xuICAgICAgICAgICAgaW5kZW50ID0gbGluZS5sZW5ndGggLSBVdGlscy5sdHJpbShsaW5lKS5sZW5ndGhcbiAgICAgICAgICAgIGlmIHNtYWxsZXN0SW5kZW50IGlzIC0xIG9yIGluZGVudCA8IHNtYWxsZXN0SW5kZW50XG4gICAgICAgICAgICAgICAgc21hbGxlc3RJbmRlbnQgPSBpbmRlbnRcbiAgICAgICAgaWYgc21hbGxlc3RJbmRlbnQgPiAwXG4gICAgICAgICAgICBmb3IgbGluZSwgaSBpbiBsaW5lc1xuICAgICAgICAgICAgICAgIGxpbmVzW2ldID0gbGluZVtzbWFsbGVzdEluZGVudC4uXVxuICAgICAgICAgICAgdmFsdWUgPSBsaW5lcy5qb2luKFwiXFxuXCIpXG5cbiAgICAgICAgcmV0dXJuIHZhbHVlXG5cblxuICAgICMgUmV0dXJucyB0cnVlIGlmIHRoZSBuZXh0IGxpbmUgc3RhcnRzIHVuaW5kZW50ZWQgY29sbGVjdGlvblxuICAgICNcbiAgICAjIEByZXR1cm4gW0Jvb2xlYW5dICAgICBSZXR1cm5zIHRydWUgaWYgdGhlIG5leHQgbGluZSBzdGFydHMgdW5pbmRlbnRlZCBjb2xsZWN0aW9uLCBmYWxzZSBvdGhlcndpc2VcbiAgICAjXG4gICAgaXNOZXh0TGluZVVuSW5kZW50ZWRDb2xsZWN0aW9uOiAoY3VycmVudEluZGVudGF0aW9uID0gbnVsbCkgLT5cbiAgICAgICAgY3VycmVudEluZGVudGF0aW9uID89IEBnZXRDdXJyZW50TGluZUluZGVudGF0aW9uKClcbiAgICAgICAgbm90RU9GID0gQG1vdmVUb05leHRMaW5lKClcblxuICAgICAgICB3aGlsZSBub3RFT0YgYW5kIEBpc0N1cnJlbnRMaW5lRW1wdHkoKVxuICAgICAgICAgICAgbm90RU9GID0gQG1vdmVUb05leHRMaW5lKClcblxuICAgICAgICBpZiBmYWxzZSBpcyBub3RFT0ZcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuXG4gICAgICAgIHJldCA9IGZhbHNlXG4gICAgICAgIGlmIEBnZXRDdXJyZW50TGluZUluZGVudGF0aW9uKCkgaXMgY3VycmVudEluZGVudGF0aW9uIGFuZCBAaXNTdHJpbmdVbkluZGVudGVkQ29sbGVjdGlvbkl0ZW0oQGN1cnJlbnRMaW5lKVxuICAgICAgICAgICAgcmV0ID0gdHJ1ZVxuXG4gICAgICAgIEBtb3ZlVG9QcmV2aW91c0xpbmUoKVxuXG4gICAgICAgIHJldHVybiByZXRcblxuXG4gICAgIyBSZXR1cm5zIHRydWUgaWYgdGhlIHN0cmluZyBpcyB1bi1pbmRlbnRlZCBjb2xsZWN0aW9uIGl0ZW1cbiAgICAjXG4gICAgIyBAcmV0dXJuIFtCb29sZWFuXSAgICAgUmV0dXJucyB0cnVlIGlmIHRoZSBzdHJpbmcgaXMgdW4taW5kZW50ZWQgY29sbGVjdGlvbiBpdGVtLCBmYWxzZSBvdGhlcndpc2VcbiAgICAjXG4gICAgaXNTdHJpbmdVbkluZGVudGVkQ29sbGVjdGlvbkl0ZW06IC0+XG4gICAgICAgIHJldHVybiBAY3VycmVudExpbmUgaXMgJy0nIG9yIEBjdXJyZW50TGluZVswLi4uMl0gaXMgJy0gJ1xuXG5cbm1vZHVsZS5leHBvcnRzID0gUGFyc2VyXG4iLCJcbiMgUGF0dGVybiBpcyBhIHplcm8tY29uZmxpY3Qgd3JhcHBlciBleHRlbmRpbmcgUmVnRXhwIGZlYXR1cmVzXG4jIGluIG9yZGVyIHRvIG1ha2UgWUFNTCBwYXJzaW5nIHJlZ2V4IG1vcmUgZXhwcmVzc2l2ZS5cbiNcbmNsYXNzIFBhdHRlcm5cblxuICAgICMgQHByb3BlcnR5IFtSZWdFeHBdIFRoZSBSZWdFeHAgaW5zdGFuY2VcbiAgICByZWdleDogICAgICAgICAgbnVsbFxuXG4gICAgIyBAcHJvcGVydHkgW1N0cmluZ10gVGhlIHJhdyByZWdleCBzdHJpbmdcbiAgICByYXdSZWdleDogICAgICAgbnVsbFxuXG4gICAgIyBAcHJvcGVydHkgW1N0cmluZ10gVGhlIGNsZWFuZWQgcmVnZXggc3RyaW5nICh1c2VkIHRvIGNyZWF0ZSB0aGUgUmVnRXhwIGluc3RhbmNlKVxuICAgIGNsZWFuZWRSZWdleDogICBudWxsXG5cbiAgICAjIEBwcm9wZXJ0eSBbT2JqZWN0XSBUaGUgZGljdGlvbmFyeSBtYXBwaW5nIG5hbWVzIHRvIGNhcHR1cmluZyBicmFja2V0IG51bWJlcnNcbiAgICBtYXBwaW5nOiAgICAgICAgbnVsbFxuXG4gICAgIyBDb25zdHJ1Y3RvclxuICAgICNcbiAgICAjIEBwYXJhbSBbU3RyaW5nXSByYXdSZWdleCBUaGUgcmF3IHJlZ2V4IHN0cmluZyBkZWZpbmluZyB0aGUgcGF0dGVyblxuICAgICNcbiAgICBjb25zdHJ1Y3RvcjogKHJhd1JlZ2V4LCBtb2RpZmllcnMgPSAnJykgLT5cbiAgICAgICAgY2xlYW5lZFJlZ2V4ID0gJydcbiAgICAgICAgbGVuID0gcmF3UmVnZXgubGVuZ3RoXG4gICAgICAgIG1hcHBpbmcgPSBudWxsXG5cbiAgICAgICAgIyBDbGVhbnVwIHJhdyByZWdleCBhbmQgY29tcHV0ZSBtYXBwaW5nXG4gICAgICAgIGNhcHR1cmluZ0JyYWNrZXROdW1iZXIgPSAwXG4gICAgICAgIGkgPSAwXG4gICAgICAgIHdoaWxlIGkgPCBsZW5cbiAgICAgICAgICAgIF9jaGFyID0gcmF3UmVnZXguY2hhckF0KGkpXG4gICAgICAgICAgICBpZiBfY2hhciBpcyAnXFxcXCdcbiAgICAgICAgICAgICAgICAjIElnbm9yZSBuZXh0IGNoYXJhY3RlclxuICAgICAgICAgICAgICAgIGNsZWFuZWRSZWdleCArPSByYXdSZWdleFtpLi5pKzFdXG4gICAgICAgICAgICAgICAgaSsrXG4gICAgICAgICAgICBlbHNlIGlmIF9jaGFyIGlzICcoJ1xuICAgICAgICAgICAgICAgICMgSW5jcmVhc2UgYnJhY2tldCBudW1iZXIsIG9ubHkgaWYgaXQgaXMgY2FwdHVyaW5nXG4gICAgICAgICAgICAgICAgaWYgaSA8IGxlbiAtIDJcbiAgICAgICAgICAgICAgICAgICAgcGFydCA9IHJhd1JlZ2V4W2kuLmkrMl1cbiAgICAgICAgICAgICAgICAgICAgaWYgcGFydCBpcyAnKD86J1xuICAgICAgICAgICAgICAgICAgICAgICAgIyBOb24tY2FwdHVyaW5nIGJyYWNrZXRcbiAgICAgICAgICAgICAgICAgICAgICAgIGkgKz0gMlxuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYW5lZFJlZ2V4ICs9IHBhcnRcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiBwYXJ0IGlzICcoPzwnXG4gICAgICAgICAgICAgICAgICAgICAgICAjIENhcHR1cmluZyBicmFja2V0IHdpdGggcG9zc2libHkgYSBuYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0dXJpbmdCcmFja2V0TnVtYmVyKytcbiAgICAgICAgICAgICAgICAgICAgICAgIGkgKz0gMlxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZSA9ICcnXG4gICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSBpICsgMSA8IGxlblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YkNoYXIgPSByYXdSZWdleC5jaGFyQXQoaSArIDEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgc3ViQ2hhciBpcyAnPidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xlYW5lZFJlZ2V4ICs9ICcoJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpKytcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgbmFtZS5sZW5ndGggPiAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAjIEFzc29jaWF0ZSBhIG5hbWUgd2l0aCBhIGNhcHR1cmluZyBicmFja2V0IG51bWJlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwcGluZyA/PSB7fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwcGluZ1tuYW1lXSA9IGNhcHR1cmluZ0JyYWNrZXROdW1iZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWUgKz0gc3ViQ2hhclxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaSsrXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFuZWRSZWdleCArPSBfY2hhclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdHVyaW5nQnJhY2tldE51bWJlcisrXG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBjbGVhbmVkUmVnZXggKz0gX2NoYXJcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBjbGVhbmVkUmVnZXggKz0gX2NoYXJcblxuICAgICAgICAgICAgaSsrXG5cbiAgICAgICAgQHJhd1JlZ2V4ID0gcmF3UmVnZXhcbiAgICAgICAgQGNsZWFuZWRSZWdleCA9IGNsZWFuZWRSZWdleFxuICAgICAgICBAcmVnZXggPSBuZXcgUmVnRXhwIEBjbGVhbmVkUmVnZXgsICdnJyttb2RpZmllcnMucmVwbGFjZSgnZycsICcnKVxuICAgICAgICBAbWFwcGluZyA9IG1hcHBpbmdcblxuXG4gICAgIyBFeGVjdXRlcyB0aGUgcGF0dGVybidzIHJlZ2V4IGFuZCByZXR1cm5zIHRoZSBtYXRjaGluZyB2YWx1ZXNcbiAgICAjXG4gICAgIyBAcGFyYW0gW1N0cmluZ10gc3RyIFRoZSBzdHJpbmcgdG8gdXNlIHRvIGV4ZWN1dGUgdGhlIHBhdHRlcm5cbiAgICAjXG4gICAgIyBAcmV0dXJuIFtBcnJheV0gVGhlIG1hdGNoaW5nIHZhbHVlcyBleHRyYWN0ZWQgZnJvbSBjYXB0dXJpbmcgYnJhY2tldHMgb3IgbnVsbCBpZiBub3RoaW5nIG1hdGNoZWRcbiAgICAjXG4gICAgZXhlYzogKHN0cikgLT5cbiAgICAgICAgQHJlZ2V4Lmxhc3RJbmRleCA9IDBcbiAgICAgICAgbWF0Y2hlcyA9IEByZWdleC5leGVjIHN0clxuXG4gICAgICAgIGlmIG5vdCBtYXRjaGVzP1xuICAgICAgICAgICAgcmV0dXJuIG51bGxcblxuICAgICAgICBpZiBAbWFwcGluZz9cbiAgICAgICAgICAgIGZvciBuYW1lLCBpbmRleCBvZiBAbWFwcGluZ1xuICAgICAgICAgICAgICAgIG1hdGNoZXNbbmFtZV0gPSBtYXRjaGVzW2luZGV4XVxuXG4gICAgICAgIHJldHVybiBtYXRjaGVzXG5cblxuICAgICMgVGVzdHMgdGhlIHBhdHRlcm4ncyByZWdleFxuICAgICNcbiAgICAjIEBwYXJhbSBbU3RyaW5nXSBzdHIgVGhlIHN0cmluZyB0byB1c2UgdG8gdGVzdCB0aGUgcGF0dGVyblxuICAgICNcbiAgICAjIEByZXR1cm4gW0Jvb2xlYW5dIHRydWUgaWYgdGhlIHN0cmluZyBtYXRjaGVkXG4gICAgI1xuICAgIHRlc3Q6IChzdHIpIC0+XG4gICAgICAgIEByZWdleC5sYXN0SW5kZXggPSAwXG4gICAgICAgIHJldHVybiBAcmVnZXgudGVzdCBzdHJcblxuXG4gICAgIyBSZXBsYWNlcyBvY2N1cmVuY2VzIG1hdGNoaW5nIHdpdGggdGhlIHBhdHRlcm4ncyByZWdleCB3aXRoIHJlcGxhY2VtZW50XG4gICAgI1xuICAgICMgQHBhcmFtIFtTdHJpbmddIHN0ciBUaGUgc291cmNlIHN0cmluZyB0byBwZXJmb3JtIHJlcGxhY2VtZW50c1xuICAgICMgQHBhcmFtIFtTdHJpbmddIHJlcGxhY2VtZW50IFRoZSBzdHJpbmcgdG8gdXNlIGluIHBsYWNlIG9mIGVhY2ggcmVwbGFjZWQgb2NjdXJlbmNlLlxuICAgICNcbiAgICAjIEByZXR1cm4gW1N0cmluZ10gVGhlIHJlcGxhY2VkIHN0cmluZ1xuICAgICNcbiAgICByZXBsYWNlOiAoc3RyLCByZXBsYWNlbWVudCkgLT5cbiAgICAgICAgQHJlZ2V4Lmxhc3RJbmRleCA9IDBcbiAgICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlIEByZWdleCwgcmVwbGFjZW1lbnRcblxuXG4gICAgIyBSZXBsYWNlcyBvY2N1cmVuY2VzIG1hdGNoaW5nIHdpdGggdGhlIHBhdHRlcm4ncyByZWdleCB3aXRoIHJlcGxhY2VtZW50IGFuZFxuICAgICMgZ2V0IGJvdGggdGhlIHJlcGxhY2VkIHN0cmluZyBhbmQgdGhlIG51bWJlciBvZiByZXBsYWNlZCBvY2N1cmVuY2VzIGluIHRoZSBzdHJpbmcuXG4gICAgI1xuICAgICMgQHBhcmFtIFtTdHJpbmddIHN0ciBUaGUgc291cmNlIHN0cmluZyB0byBwZXJmb3JtIHJlcGxhY2VtZW50c1xuICAgICMgQHBhcmFtIFtTdHJpbmddIHJlcGxhY2VtZW50IFRoZSBzdHJpbmcgdG8gdXNlIGluIHBsYWNlIG9mIGVhY2ggcmVwbGFjZWQgb2NjdXJlbmNlLlxuICAgICMgQHBhcmFtIFtJbnRlZ2VyXSBsaW1pdCBUaGUgbWF4aW11bSBudW1iZXIgb2Ygb2NjdXJlbmNlcyB0byByZXBsYWNlICgwIG1lYW5zIGluZmluaXRlIG51bWJlciBvZiBvY2N1cmVuY2VzKVxuICAgICNcbiAgICAjIEByZXR1cm4gW0FycmF5XSBBIGRlc3RydWN0dXJhYmxlIGFycmF5IGNvbnRhaW5pbmcgdGhlIHJlcGxhY2VkIHN0cmluZyBhbmQgdGhlIG51bWJlciBvZiByZXBsYWNlZCBvY2N1cmVuY2VzLiBGb3IgaW5zdGFuY2U6IFtcIm15IHJlcGxhY2VkIHN0cmluZ1wiLCAyXVxuICAgICNcbiAgICByZXBsYWNlQWxsOiAoc3RyLCByZXBsYWNlbWVudCwgbGltaXQgPSAwKSAtPlxuICAgICAgICBAcmVnZXgubGFzdEluZGV4ID0gMFxuICAgICAgICBjb3VudCA9IDBcbiAgICAgICAgd2hpbGUgQHJlZ2V4LnRlc3Qoc3RyKSBhbmQgKGxpbWl0IGlzIDAgb3IgY291bnQgPCBsaW1pdClcbiAgICAgICAgICAgIEByZWdleC5sYXN0SW5kZXggPSAwXG4gICAgICAgICAgICBzdHIgPSBzdHIucmVwbGFjZSBAcmVnZXgsICcnXG4gICAgICAgICAgICBjb3VudCsrXG4gICAgICAgIFxuICAgICAgICByZXR1cm4gW3N0ciwgY291bnRdXG5cblxubW9kdWxlLmV4cG9ydHMgPSBQYXR0ZXJuXG5cbiIsIlxuVXRpbHMgICA9IHJlcXVpcmUgJy4vVXRpbHMnXG5QYXR0ZXJuID0gcmVxdWlyZSAnLi9QYXR0ZXJuJ1xuXG4jIFVuZXNjYXBlciBlbmNhcHN1bGF0ZXMgdW5lc2NhcGluZyBydWxlcyBmb3Igc2luZ2xlIGFuZCBkb3VibGUtcXVvdGVkIFlBTUwgc3RyaW5ncy5cbiNcbmNsYXNzIFVuZXNjYXBlclxuXG4gICAgIyBSZWdleCBmcmFnbWVudCB0aGF0IG1hdGNoZXMgYW4gZXNjYXBlZCBjaGFyYWN0ZXIgaW5cbiAgICAjIGEgZG91YmxlIHF1b3RlZCBzdHJpbmcuXG4gICAgQFBBVFRFUk5fRVNDQVBFRF9DSEFSQUNURVI6ICAgICBuZXcgUGF0dGVybiAnXFxcXFxcXFwoWzBhYnRcXHRudmZyZSBcIlxcXFwvXFxcXFxcXFxOX0xQXXx4WzAtOWEtZkEtRl17Mn18dVswLTlhLWZBLUZdezR9fFVbMC05YS1mQS1GXXs4fSknO1xuXG5cbiAgICAjIFVuZXNjYXBlcyBhIHNpbmdsZSBxdW90ZWQgc3RyaW5nLlxuICAgICNcbiAgICAjIEBwYXJhbSBbU3RyaW5nXSAgICAgICB2YWx1ZSBBIHNpbmdsZSBxdW90ZWQgc3RyaW5nLlxuICAgICNcbiAgICAjIEByZXR1cm4gW1N0cmluZ10gICAgICBUaGUgdW5lc2NhcGVkIHN0cmluZy5cbiAgICAjXG4gICAgQHVuZXNjYXBlU2luZ2xlUXVvdGVkU3RyaW5nOiAodmFsdWUpIC0+XG4gICAgICAgIHJldHVybiB2YWx1ZS5yZXBsYWNlKC9cXCdcXCcvZywgJ1xcJycpXG5cblxuICAgICMgVW5lc2NhcGVzIGEgZG91YmxlIHF1b3RlZCBzdHJpbmcuXG4gICAgI1xuICAgICMgQHBhcmFtIFtTdHJpbmddICAgICAgIHZhbHVlIEEgZG91YmxlIHF1b3RlZCBzdHJpbmcuXG4gICAgI1xuICAgICMgQHJldHVybiBbU3RyaW5nXSAgICAgIFRoZSB1bmVzY2FwZWQgc3RyaW5nLlxuICAgICNcbiAgICBAdW5lc2NhcGVEb3VibGVRdW90ZWRTdHJpbmc6ICh2YWx1ZSkgLT5cbiAgICAgICAgQF91bmVzY2FwZUNhbGxiYWNrID89IChzdHIpID0+XG4gICAgICAgICAgICByZXR1cm4gQHVuZXNjYXBlQ2hhcmFjdGVyKHN0cilcblxuICAgICAgICAjIEV2YWx1YXRlIHRoZSBzdHJpbmdcbiAgICAgICAgcmV0dXJuIEBQQVRURVJOX0VTQ0FQRURfQ0hBUkFDVEVSLnJlcGxhY2UgdmFsdWUsIEBfdW5lc2NhcGVDYWxsYmFja1xuXG5cbiAgICAjIFVuZXNjYXBlcyBhIGNoYXJhY3RlciB0aGF0IHdhcyBmb3VuZCBpbiBhIGRvdWJsZS1xdW90ZWQgc3RyaW5nXG4gICAgI1xuICAgICMgQHBhcmFtIFtTdHJpbmddICAgICAgIHZhbHVlIEFuIGVzY2FwZWQgY2hhcmFjdGVyXG4gICAgI1xuICAgICMgQHJldHVybiBbU3RyaW5nXSAgICAgIFRoZSB1bmVzY2FwZWQgY2hhcmFjdGVyXG4gICAgI1xuICAgIEB1bmVzY2FwZUNoYXJhY3RlcjogKHZhbHVlKSAtPlxuICAgICAgICBjaCA9IFN0cmluZy5mcm9tQ2hhckNvZGVcbiAgICAgICAgc3dpdGNoIHZhbHVlLmNoYXJBdCgxKVxuICAgICAgICAgICAgd2hlbiAnMCdcbiAgICAgICAgICAgICAgICByZXR1cm4gY2goMClcbiAgICAgICAgICAgIHdoZW4gJ2EnXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNoKDcpXG4gICAgICAgICAgICB3aGVuICdiJ1xuICAgICAgICAgICAgICAgIHJldHVybiBjaCg4KVxuICAgICAgICAgICAgd2hlbiAndCdcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJcXHRcIlxuICAgICAgICAgICAgd2hlbiBcIlxcdFwiXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiXFx0XCJcbiAgICAgICAgICAgIHdoZW4gJ24nXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiXFxuXCJcbiAgICAgICAgICAgIHdoZW4gJ3YnXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNoKDExKVxuICAgICAgICAgICAgd2hlbiAnZidcbiAgICAgICAgICAgICAgICByZXR1cm4gY2goMTIpXG4gICAgICAgICAgICB3aGVuICdyJ1xuICAgICAgICAgICAgICAgIHJldHVybiBjaCgxMylcbiAgICAgICAgICAgIHdoZW4gJ2UnXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNoKDI3KVxuICAgICAgICAgICAgd2hlbiAnICdcbiAgICAgICAgICAgICAgICByZXR1cm4gJyAnXG4gICAgICAgICAgICB3aGVuICdcIidcbiAgICAgICAgICAgICAgICByZXR1cm4gJ1wiJ1xuICAgICAgICAgICAgd2hlbiAnLydcbiAgICAgICAgICAgICAgICByZXR1cm4gJy8nXG4gICAgICAgICAgICB3aGVuICdcXFxcJ1xuICAgICAgICAgICAgICAgIHJldHVybiAnXFxcXCdcbiAgICAgICAgICAgIHdoZW4gJ04nXG4gICAgICAgICAgICAgICAgIyBVKzAwODUgTkVYVCBMSU5FXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNoKDB4MDA4NSlcbiAgICAgICAgICAgIHdoZW4gJ18nXG4gICAgICAgICAgICAgICAgIyBVKzAwQTAgTk8tQlJFQUsgU1BBQ0VcbiAgICAgICAgICAgICAgICByZXR1cm4gY2goMHgwMEEwKVxuICAgICAgICAgICAgd2hlbiAnTCdcbiAgICAgICAgICAgICAgICAjIFUrMjAyOCBMSU5FIFNFUEFSQVRPUlxuICAgICAgICAgICAgICAgIHJldHVybiBjaCgweDIwMjgpXG4gICAgICAgICAgICB3aGVuICdQJ1xuICAgICAgICAgICAgICAgICMgVSsyMDI5IFBBUkFHUkFQSCBTRVBBUkFUT1JcbiAgICAgICAgICAgICAgICByZXR1cm4gY2goMHgyMDI5KVxuICAgICAgICAgICAgd2hlbiAneCdcbiAgICAgICAgICAgICAgICByZXR1cm4gVXRpbHMudXRmOGNocihVdGlscy5oZXhEZWModmFsdWUuc3Vic3RyKDIsIDIpKSlcbiAgICAgICAgICAgIHdoZW4gJ3UnXG4gICAgICAgICAgICAgICAgcmV0dXJuIFV0aWxzLnV0ZjhjaHIoVXRpbHMuaGV4RGVjKHZhbHVlLnN1YnN0cigyLCA0KSkpXG4gICAgICAgICAgICB3aGVuICdVJ1xuICAgICAgICAgICAgICAgIHJldHVybiBVdGlscy51dGY4Y2hyKFV0aWxzLmhleERlYyh2YWx1ZS5zdWJzdHIoMiwgOCkpKVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJldHVybiAnJ1xuXG5tb2R1bGUuZXhwb3J0cyA9IFVuZXNjYXBlclxuIiwiXG5QYXR0ZXJuID0gcmVxdWlyZSAnLi9QYXR0ZXJuJ1xuXG4jIEEgYnVuY2ggb2YgdXRpbGl0eSBtZXRob2RzXG4jXG5jbGFzcyBVdGlsc1xuXG4gICAgQFJFR0VYX0xFRlRfVFJJTV9CWV9DSEFSOiAgIHt9XG4gICAgQFJFR0VYX1JJR0hUX1RSSU1fQllfQ0hBUjogIHt9XG4gICAgQFJFR0VYX1NQQUNFUzogICAgICAgICAgICAgIC9cXHMrL2dcbiAgICBAUkVHRVhfRElHSVRTOiAgICAgICAgICAgICAgL15cXGQrJC9cbiAgICBAUkVHRVhfT0NUQUw6ICAgICAgICAgICAgICAgL1teMC03XS9naVxuICAgIEBSRUdFWF9IRVhBREVDSU1BTDogICAgICAgICAvW15hLWYwLTldL2dpXG5cbiAgICAjIFByZWNvbXBpbGVkIGRhdGUgcGF0dGVyblxuICAgIEBQQVRURVJOX0RBVEU6ICAgICAgICAgICAgICBuZXcgUGF0dGVybiAnXicrXG4gICAgICAgICAgICAnKD88eWVhcj5bMC05XVswLTldWzAtOV1bMC05XSknK1xuICAgICAgICAgICAgJy0oPzxtb250aD5bMC05XVswLTldPyknK1xuICAgICAgICAgICAgJy0oPzxkYXk+WzAtOV1bMC05XT8pJytcbiAgICAgICAgICAgICcoPzooPzpbVHRdfFsgXFx0XSspJytcbiAgICAgICAgICAgICcoPzxob3VyPlswLTldWzAtOV0/KScrXG4gICAgICAgICAgICAnOig/PG1pbnV0ZT5bMC05XVswLTldKScrXG4gICAgICAgICAgICAnOig/PHNlY29uZD5bMC05XVswLTldKScrXG4gICAgICAgICAgICAnKD86XFwuKD88ZnJhY3Rpb24+WzAtOV0qKSk/JytcbiAgICAgICAgICAgICcoPzpbIFxcdF0qKD88dHo+WnwoPzx0el9zaWduPlstK10pKD88dHpfaG91cj5bMC05XVswLTldPyknK1xuICAgICAgICAgICAgJyg/OjooPzx0el9taW51dGU+WzAtOV1bMC05XSkpPykpPyk/JytcbiAgICAgICAgICAgICckJywgJ2knXG5cbiAgICAjIExvY2FsIHRpbWV6b25lIG9mZnNldCBpbiBtc1xuICAgIEBMT0NBTF9USU1FWk9ORV9PRkZTRVQ6ICAgICBuZXcgRGF0ZSgpLmdldFRpbWV6b25lT2Zmc2V0KCkgKiA2MCAqIDEwMDBcblxuICAgICMgVHJpbXMgdGhlIGdpdmVuIHN0cmluZyBvbiBib3RoIHNpZGVzXG4gICAgI1xuICAgICMgQHBhcmFtIFtTdHJpbmddIHN0ciBUaGUgc3RyaW5nIHRvIHRyaW1cbiAgICAjIEBwYXJhbSBbU3RyaW5nXSBfY2hhciBUaGUgY2hhcmFjdGVyIHRvIHVzZSBmb3IgdHJpbW1pbmcgKGRlZmF1bHQ6ICdcXFxccycpXG4gICAgI1xuICAgICMgQHJldHVybiBbU3RyaW5nXSBBIHRyaW1tZWQgc3RyaW5nXG4gICAgI1xuICAgIEB0cmltOiAoc3RyLCBfY2hhciA9ICdcXFxccycpIC0+XG4gICAgICAgIHJldHVybiBzdHIudHJpbSgpXG4gICAgICAgIHJlZ2V4TGVmdCA9IEBSRUdFWF9MRUZUX1RSSU1fQllfQ0hBUltfY2hhcl1cbiAgICAgICAgdW5sZXNzIHJlZ2V4TGVmdD9cbiAgICAgICAgICAgIEBSRUdFWF9MRUZUX1RSSU1fQllfQ0hBUltfY2hhcl0gPSByZWdleExlZnQgPSBuZXcgUmVnRXhwICdeJytfY2hhcisnJytfY2hhcisnKidcbiAgICAgICAgcmVnZXhMZWZ0Lmxhc3RJbmRleCA9IDBcbiAgICAgICAgcmVnZXhSaWdodCA9IEBSRUdFWF9SSUdIVF9UUklNX0JZX0NIQVJbX2NoYXJdXG4gICAgICAgIHVubGVzcyByZWdleFJpZ2h0P1xuICAgICAgICAgICAgQFJFR0VYX1JJR0hUX1RSSU1fQllfQ0hBUltfY2hhcl0gPSByZWdleFJpZ2h0ID0gbmV3IFJlZ0V4cCBfY2hhcisnJytfY2hhcisnKiQnXG4gICAgICAgIHJlZ2V4UmlnaHQubGFzdEluZGV4ID0gMFxuICAgICAgICByZXR1cm4gc3RyLnJlcGxhY2UocmVnZXhMZWZ0LCAnJykucmVwbGFjZShyZWdleFJpZ2h0LCAnJylcblxuXG4gICAgIyBUcmltcyB0aGUgZ2l2ZW4gc3RyaW5nIG9uIHRoZSBsZWZ0IHNpZGVcbiAgICAjXG4gICAgIyBAcGFyYW0gW1N0cmluZ10gc3RyIFRoZSBzdHJpbmcgdG8gdHJpbVxuICAgICMgQHBhcmFtIFtTdHJpbmddIF9jaGFyIFRoZSBjaGFyYWN0ZXIgdG8gdXNlIGZvciB0cmltbWluZyAoZGVmYXVsdDogJ1xcXFxzJylcbiAgICAjXG4gICAgIyBAcmV0dXJuIFtTdHJpbmddIEEgdHJpbW1lZCBzdHJpbmdcbiAgICAjXG4gICAgQGx0cmltOiAoc3RyLCBfY2hhciA9ICdcXFxccycpIC0+XG4gICAgICAgIHJlZ2V4TGVmdCA9IEBSRUdFWF9MRUZUX1RSSU1fQllfQ0hBUltfY2hhcl1cbiAgICAgICAgdW5sZXNzIHJlZ2V4TGVmdD9cbiAgICAgICAgICAgIEBSRUdFWF9MRUZUX1RSSU1fQllfQ0hBUltfY2hhcl0gPSByZWdleExlZnQgPSBuZXcgUmVnRXhwICdeJytfY2hhcisnJytfY2hhcisnKidcbiAgICAgICAgcmVnZXhMZWZ0Lmxhc3RJbmRleCA9IDBcbiAgICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlKHJlZ2V4TGVmdCwgJycpXG5cblxuICAgICMgVHJpbXMgdGhlIGdpdmVuIHN0cmluZyBvbiB0aGUgcmlnaHQgc2lkZVxuICAgICNcbiAgICAjIEBwYXJhbSBbU3RyaW5nXSBzdHIgVGhlIHN0cmluZyB0byB0cmltXG4gICAgIyBAcGFyYW0gW1N0cmluZ10gX2NoYXIgVGhlIGNoYXJhY3RlciB0byB1c2UgZm9yIHRyaW1taW5nIChkZWZhdWx0OiAnXFxcXHMnKVxuICAgICNcbiAgICAjIEByZXR1cm4gW1N0cmluZ10gQSB0cmltbWVkIHN0cmluZ1xuICAgICNcbiAgICBAcnRyaW06IChzdHIsIF9jaGFyID0gJ1xcXFxzJykgLT5cbiAgICAgICAgcmVnZXhSaWdodCA9IEBSRUdFWF9SSUdIVF9UUklNX0JZX0NIQVJbX2NoYXJdXG4gICAgICAgIHVubGVzcyByZWdleFJpZ2h0P1xuICAgICAgICAgICAgQFJFR0VYX1JJR0hUX1RSSU1fQllfQ0hBUltfY2hhcl0gPSByZWdleFJpZ2h0ID0gbmV3IFJlZ0V4cCBfY2hhcisnJytfY2hhcisnKiQnXG4gICAgICAgIHJlZ2V4UmlnaHQubGFzdEluZGV4ID0gMFxuICAgICAgICByZXR1cm4gc3RyLnJlcGxhY2UocmVnZXhSaWdodCwgJycpXG5cblxuICAgICMgQ2hlY2tzIGlmIHRoZSBnaXZlbiB2YWx1ZSBpcyBlbXB0eSAobnVsbCwgdW5kZWZpbmVkLCBlbXB0eSBzdHJpbmcsIHN0cmluZyAnMCcpXG4gICAgI1xuICAgICMgQHBhcmFtIFtPYmplY3RdIHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVja1xuICAgICNcbiAgICAjIEByZXR1cm4gW0Jvb2xlYW5dIHRydWUgaWYgdGhlIHZhbHVlIGlzIGVtcHR5XG4gICAgI1xuICAgIEBpc0VtcHR5OiAodmFsdWUpIC0+XG4gICAgICAgIHJldHVybiBub3QodmFsdWUpIG9yIHZhbHVlIGlzICcnIG9yIHZhbHVlIGlzICcwJyBvciAodmFsdWUgaW5zdGFuY2VvZiBBcnJheSBhbmQgdmFsdWUubGVuZ3RoIGlzIDApXG5cblxuICAgICMgQ291bnRzIHRoZSBudW1iZXIgb2Ygb2NjdXJlbmNlcyBvZiBzdWJTdHJpbmcgaW5zaWRlIHN0cmluZ1xuICAgICNcbiAgICAjIEBwYXJhbSBbU3RyaW5nXSBzdHJpbmcgVGhlIHN0cmluZyB3aGVyZSB0byBjb3VudCBvY2N1cmVuY2VzXG4gICAgIyBAcGFyYW0gW1N0cmluZ10gc3ViU3RyaW5nIFRoZSBzdWJTdHJpbmcgdG8gY291bnRcbiAgICAjIEBwYXJhbSBbSW50ZWdlcl0gc3RhcnQgVGhlIHN0YXJ0IGluZGV4XG4gICAgIyBAcGFyYW0gW0ludGVnZXJdIGxlbmd0aCBUaGUgc3RyaW5nIGxlbmd0aCB1bnRpbCB3aGVyZSB0byBjb3VudFxuICAgICNcbiAgICAjIEByZXR1cm4gW0ludGVnZXJdIFRoZSBudW1iZXIgb2Ygb2NjdXJlbmNlc1xuICAgICNcbiAgICBAc3ViU3RyQ291bnQ6IChzdHJpbmcsIHN1YlN0cmluZywgc3RhcnQsIGxlbmd0aCkgLT5cbiAgICAgICAgYyA9IDBcbiAgICAgICAgXG4gICAgICAgIHN0cmluZyA9ICcnICsgc3RyaW5nXG4gICAgICAgIHN1YlN0cmluZyA9ICcnICsgc3ViU3RyaW5nXG4gICAgICAgIFxuICAgICAgICBpZiBzdGFydD9cbiAgICAgICAgICAgIHN0cmluZyA9IHN0cmluZ1tzdGFydC4uXVxuICAgICAgICBpZiBsZW5ndGg/XG4gICAgICAgICAgICBzdHJpbmcgPSBzdHJpbmdbMC4uLmxlbmd0aF1cbiAgICAgICAgXG4gICAgICAgIGxlbiA9IHN0cmluZy5sZW5ndGhcbiAgICAgICAgc3VibGVuID0gc3ViU3RyaW5nLmxlbmd0aFxuICAgICAgICBmb3IgaSBpbiBbMC4uLmxlbl1cbiAgICAgICAgICAgIGlmIHN1YlN0cmluZyBpcyBzdHJpbmdbaS4uLnN1Ymxlbl1cbiAgICAgICAgICAgICAgICBjKytcbiAgICAgICAgICAgICAgICBpICs9IHN1YmxlbiAtIDFcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBjXG5cblxuICAgICMgUmV0dXJucyB0cnVlIGlmIGlucHV0IGlzIG9ubHkgY29tcG9zZWQgb2YgZGlnaXRzXG4gICAgI1xuICAgICMgQHBhcmFtIFtPYmplY3RdIGlucHV0IFRoZSB2YWx1ZSB0byB0ZXN0XG4gICAgI1xuICAgICMgQHJldHVybiBbQm9vbGVhbl0gdHJ1ZSBpZiBpbnB1dCBpcyBvbmx5IGNvbXBvc2VkIG9mIGRpZ2l0c1xuICAgICNcbiAgICBAaXNEaWdpdHM6IChpbnB1dCkgLT5cbiAgICAgICAgQFJFR0VYX0RJR0lUUy5sYXN0SW5kZXggPSAwXG4gICAgICAgIHJldHVybiBAUkVHRVhfRElHSVRTLnRlc3QgaW5wdXRcblxuXG4gICAgIyBEZWNvZGUgb2N0YWwgdmFsdWVcbiAgICAjXG4gICAgIyBAcGFyYW0gW1N0cmluZ10gaW5wdXQgVGhlIHZhbHVlIHRvIGRlY29kZVxuICAgICNcbiAgICAjIEByZXR1cm4gW0ludGVnZXJdIFRoZSBkZWNvZGVkIHZhbHVlXG4gICAgI1xuICAgIEBvY3REZWM6IChpbnB1dCkgLT5cbiAgICAgICAgQFJFR0VYX09DVEFMLmxhc3RJbmRleCA9IDBcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KChpbnB1dCsnJykucmVwbGFjZShAUkVHRVhfT0NUQUwsICcnKSwgOClcblxuXG4gICAgIyBEZWNvZGUgaGV4YWRlY2ltYWwgdmFsdWVcbiAgICAjXG4gICAgIyBAcGFyYW0gW1N0cmluZ10gaW5wdXQgVGhlIHZhbHVlIHRvIGRlY29kZVxuICAgICNcbiAgICAjIEByZXR1cm4gW0ludGVnZXJdIFRoZSBkZWNvZGVkIHZhbHVlXG4gICAgI1xuICAgIEBoZXhEZWM6IChpbnB1dCkgLT5cbiAgICAgICAgQFJFR0VYX0hFWEFERUNJTUFMLmxhc3RJbmRleCA9IDBcbiAgICAgICAgaW5wdXQgPSBAdHJpbShpbnB1dClcbiAgICAgICAgaWYgKGlucHV0KycnKVswLi4uMl0gaXMgJzB4JyB0aGVuIGlucHV0ID0gKGlucHV0KycnKVsyLi5dXG4gICAgICAgIHJldHVybiBwYXJzZUludCgoaW5wdXQrJycpLnJlcGxhY2UoQFJFR0VYX0hFWEFERUNJTUFMLCAnJyksIDE2KVxuXG5cbiAgICAjIEdldCB0aGUgVVRGLTggY2hhcmFjdGVyIGZvciB0aGUgZ2l2ZW4gY29kZSBwb2ludC5cbiAgICAjXG4gICAgIyBAcGFyYW0gW0ludGVnZXJdIGMgVGhlIHVuaWNvZGUgY29kZSBwb2ludFxuICAgICNcbiAgICAjIEByZXR1cm4gW1N0cmluZ10gVGhlIGNvcnJlc3BvbmRpbmcgVVRGLTggY2hhcmFjdGVyXG4gICAgI1xuICAgIEB1dGY4Y2hyOiAoYykgLT5cbiAgICAgICAgY2ggPSBTdHJpbmcuZnJvbUNoYXJDb2RlXG4gICAgICAgIGlmIDB4ODAgPiAoYyAlPSAweDIwMDAwMClcbiAgICAgICAgICAgIHJldHVybiBjaChjKVxuICAgICAgICBpZiAweDgwMCA+IGNcbiAgICAgICAgICAgIHJldHVybiBjaCgweEMwIHwgYz4+NikgKyBjaCgweDgwIHwgYyAmIDB4M0YpXG4gICAgICAgIGlmIDB4MTAwMDAgPiBjXG4gICAgICAgICAgICByZXR1cm4gY2goMHhFMCB8IGM+PjEyKSArIGNoKDB4ODAgfCBjPj42ICYgMHgzRikgKyBjaCgweDgwIHwgYyAmIDB4M0YpXG5cbiAgICAgICAgcmV0dXJuIGNoKDB4RjAgfCBjPj4xOCkgKyBjaCgweDgwIHwgYz4+MTIgJiAweDNGKSArIGNoKDB4ODAgfCBjPj42ICYgMHgzRikgKyBjaCgweDgwIHwgYyAmIDB4M0YpXG5cblxuICAgICMgUmV0dXJucyB0aGUgYm9vbGVhbiB2YWx1ZSBlcXVpdmFsZW50IHRvIHRoZSBnaXZlbiBpbnB1dFxuICAgICNcbiAgICAjIEBwYXJhbSBbU3RyaW5nfE9iamVjdF0gICAgaW5wdXQgICAgICAgVGhlIGlucHV0IHZhbHVlXG4gICAgIyBAcGFyYW0gW0Jvb2xlYW5dICAgICAgICAgIHN0cmljdCAgICAgIElmIHNldCB0byBmYWxzZSwgYWNjZXB0ICd5ZXMnIGFuZCAnbm8nIGFzIGJvb2xlYW4gdmFsdWVzXG4gICAgI1xuICAgICMgQHJldHVybiBbQm9vbGVhbl0gICAgICAgICB0aGUgYm9vbGVhbiB2YWx1ZVxuICAgICNcbiAgICBAcGFyc2VCb29sZWFuOiAoaW5wdXQsIHN0cmljdCA9IHRydWUpIC0+XG4gICAgICAgIGlmIHR5cGVvZihpbnB1dCkgaXMgJ3N0cmluZydcbiAgICAgICAgICAgIGxvd2VySW5wdXQgPSBpbnB1dC50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgICBpZiBub3Qgc3RyaWN0XG4gICAgICAgICAgICAgICAgaWYgbG93ZXJJbnB1dCBpcyAnbm8nIHRoZW4gcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICBpZiBsb3dlcklucHV0IGlzICcwJyB0aGVuIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgaWYgbG93ZXJJbnB1dCBpcyAnZmFsc2UnIHRoZW4gcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICBpZiBsb3dlcklucHV0IGlzICcnIHRoZW4gcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICByZXR1cm4gISFpbnB1dFxuXG5cblxuICAgICMgUmV0dXJucyB0cnVlIGlmIGlucHV0IGlzIG51bWVyaWNcbiAgICAjXG4gICAgIyBAcGFyYW0gW09iamVjdF0gaW5wdXQgVGhlIHZhbHVlIHRvIHRlc3RcbiAgICAjXG4gICAgIyBAcmV0dXJuIFtCb29sZWFuXSB0cnVlIGlmIGlucHV0IGlzIG51bWVyaWNcbiAgICAjXG4gICAgQGlzTnVtZXJpYzogKGlucHV0KSAtPlxuICAgICAgICBAUkVHRVhfU1BBQ0VTLmxhc3RJbmRleCA9IDBcbiAgICAgICAgcmV0dXJuIHR5cGVvZihpbnB1dCkgaXMgJ251bWJlcicgb3IgdHlwZW9mKGlucHV0KSBpcyAnc3RyaW5nJyBhbmQgIWlzTmFOKGlucHV0KSBhbmQgaW5wdXQucmVwbGFjZShAUkVHRVhfU1BBQ0VTLCAnJykgaXNudCAnJ1xuXG5cbiAgICAjIFJldHVybnMgYSBwYXJzZWQgZGF0ZSBmcm9tIHRoZSBnaXZlbiBzdHJpbmdcbiAgICAjXG4gICAgIyBAcGFyYW0gW1N0cmluZ10gc3RyIFRoZSBkYXRlIHN0cmluZyB0byBwYXJzZVxuICAgICNcbiAgICAjIEByZXR1cm4gW0RhdGVdIFRoZSBwYXJzZWQgZGF0ZSBvciBudWxsIGlmIHBhcnNpbmcgZmFpbGVkXG4gICAgI1xuICAgIEBzdHJpbmdUb0RhdGU6IChzdHIpIC0+XG4gICAgICAgIHVubGVzcyBzdHI/Lmxlbmd0aFxuICAgICAgICAgICAgcmV0dXJuIG51bGxcblxuICAgICAgICAjIFBlcmZvcm0gcmVndWxhciBleHByZXNzaW9uIHBhdHRlcm5cbiAgICAgICAgaW5mbyA9IEBQQVRURVJOX0RBVEUuZXhlYyBzdHJcbiAgICAgICAgdW5sZXNzIGluZm9cbiAgICAgICAgICAgIHJldHVybiBudWxsXG5cbiAgICAgICAgIyBFeHRyYWN0IHllYXIsIG1vbnRoLCBkYXlcbiAgICAgICAgeWVhciA9IHBhcnNlSW50IGluZm8ueWVhciwgMTBcbiAgICAgICAgbW9udGggPSBwYXJzZUludChpbmZvLm1vbnRoLCAxMCkgLSAxICMgSW4gamF2YXNjcmlwdCwgamFudWFyeSBpcyAwLCBmZWJydWFyeSAxLCBldGMuLi5cbiAgICAgICAgZGF5ID0gcGFyc2VJbnQgaW5mby5kYXksIDEwXG5cbiAgICAgICAgIyBJZiBubyBob3VyIGlzIGdpdmVuLCByZXR1cm4gYSBkYXRlIHdpdGggZGF5IHByZWNpc2lvblxuICAgICAgICB1bmxlc3MgaW5mby5ob3VyP1xuICAgICAgICAgICAgZGF0ZSA9IG5ldyBEYXRlIERhdGUuVVRDKHllYXIsIG1vbnRoLCBkYXkpXG4gICAgICAgICAgICByZXR1cm4gZGF0ZVxuXG4gICAgICAgICMgRXh0cmFjdCBob3VyLCBtaW51dGUsIHNlY29uZFxuICAgICAgICBob3VyID0gcGFyc2VJbnQgaW5mby5ob3VyLCAxMFxuICAgICAgICBtaW51dGUgPSBwYXJzZUludCBpbmZvLm1pbnV0ZSwgMTBcbiAgICAgICAgc2Vjb25kID0gcGFyc2VJbnQgaW5mby5zZWNvbmQsIDEwXG5cbiAgICAgICAgIyBFeHRyYWN0IGZyYWN0aW9uLCBpZiBnaXZlblxuICAgICAgICBpZiBpbmZvLmZyYWN0aW9uP1xuICAgICAgICAgICAgZnJhY3Rpb24gPSBpbmZvLmZyYWN0aW9uWzAuLi4zXVxuICAgICAgICAgICAgd2hpbGUgZnJhY3Rpb24ubGVuZ3RoIDwgM1xuICAgICAgICAgICAgICAgIGZyYWN0aW9uICs9ICcwJ1xuICAgICAgICAgICAgZnJhY3Rpb24gPSBwYXJzZUludCBmcmFjdGlvbiwgMTBcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgZnJhY3Rpb24gPSAwXG5cbiAgICAgICAgIyBDb21wdXRlIHRpbWV6b25lIG9mZnNldCBpZiBnaXZlblxuICAgICAgICBpZiBpbmZvLnR6P1xuICAgICAgICAgICAgdHpfaG91ciA9IHBhcnNlSW50IGluZm8udHpfaG91ciwgMTBcbiAgICAgICAgICAgIGlmIGluZm8udHpfbWludXRlP1xuICAgICAgICAgICAgICAgIHR6X21pbnV0ZSA9IHBhcnNlSW50IGluZm8udHpfbWludXRlLCAxMFxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHR6X21pbnV0ZSA9IDBcblxuICAgICAgICAgICAgIyBDb21wdXRlIHRpbWV6b25lIGRlbHRhIGluIG1zXG4gICAgICAgICAgICB0el9vZmZzZXQgPSAodHpfaG91ciAqIDYwICsgdHpfbWludXRlKSAqIDYwMDAwXG4gICAgICAgICAgICBpZiAnLScgaXMgaW5mby50el9zaWduXG4gICAgICAgICAgICAgICAgdHpfb2Zmc2V0ICo9IC0xXG5cbiAgICAgICAgIyBDb21wdXRlIGRhdGVcbiAgICAgICAgZGF0ZSA9IG5ldyBEYXRlIERhdGUuVVRDKHllYXIsIG1vbnRoLCBkYXksIGhvdXIsIG1pbnV0ZSwgc2Vjb25kLCBmcmFjdGlvbilcbiAgICAgICAgaWYgdHpfb2Zmc2V0XG4gICAgICAgICAgICBkYXRlLnNldFRpbWUgZGF0ZS5nZXRUaW1lKCkgKyB0el9vZmZzZXRcblxuICAgICAgICByZXR1cm4gZGF0ZVxuXG5cbiAgICAjIFJlcGVhdHMgdGhlIGdpdmVuIHN0cmluZyBhIG51bWJlciBvZiB0aW1lc1xuICAgICNcbiAgICAjIEBwYXJhbSBbU3RyaW5nXSAgIHN0ciAgICAgVGhlIHN0cmluZyB0byByZXBlYXRcbiAgICAjIEBwYXJhbSBbSW50ZWdlcl0gIG51bWJlciAgVGhlIG51bWJlciBvZiB0aW1lcyB0byByZXBlYXQgdGhlIHN0cmluZ1xuICAgICNcbiAgICAjIEByZXR1cm4gW1N0cmluZ10gIFRoZSByZXBlYXRlZCBzdHJpbmdcbiAgICAjXG4gICAgQHN0clJlcGVhdDogKHN0ciwgbnVtYmVyKSAtPlxuICAgICAgICByZXMgPSAnJ1xuICAgICAgICBpID0gMFxuICAgICAgICB3aGlsZSBpIDwgbnVtYmVyXG4gICAgICAgICAgICByZXMgKz0gc3RyXG4gICAgICAgICAgICBpKytcbiAgICAgICAgcmV0dXJuIHJlc1xuXG5cbiAgICAjIFJlYWRzIHRoZSBkYXRhIGZyb20gdGhlIGdpdmVuIGZpbGUgcGF0aCBhbmQgcmV0dXJucyB0aGUgcmVzdWx0IGFzIHN0cmluZ1xuICAgICNcbiAgICAjIEBwYXJhbSBbU3RyaW5nXSAgIHBhdGggICAgICAgIFRoZSBwYXRoIHRvIHRoZSBmaWxlXG4gICAgIyBAcGFyYW0gW0Z1bmN0aW9uXSBjYWxsYmFjayAgICBBIGNhbGxiYWNrIHRvIHJlYWQgZmlsZSBhc3luY2hyb25vdXNseSAob3B0aW9uYWwpXG4gICAgI1xuICAgICMgQHJldHVybiBbU3RyaW5nXSAgVGhlIHJlc3VsdGluZyBkYXRhIGFzIHN0cmluZ1xuICAgICNcbiAgICBAZ2V0U3RyaW5nRnJvbUZpbGU6IChwYXRoLCBjYWxsYmFjayA9IG51bGwpIC0+XG4gICAgICAgIHhociA9IG51bGxcbiAgICAgICAgaWYgd2luZG93P1xuICAgICAgICAgICAgaWYgd2luZG93LlhNTEh0dHBSZXF1ZXN0XG4gICAgICAgICAgICAgICAgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KClcbiAgICAgICAgICAgIGVsc2UgaWYgd2luZG93LkFjdGl2ZVhPYmplY3RcbiAgICAgICAgICAgICAgICBmb3IgbmFtZSBpbiBbXCJNc3htbDIuWE1MSFRUUC42LjBcIiwgXCJNc3htbDIuWE1MSFRUUC4zLjBcIiwgXCJNc3htbDIuWE1MSFRUUFwiLCBcIk1pY3Jvc29mdC5YTUxIVFRQXCJdXG4gICAgICAgICAgICAgICAgICAgIHRyeVxuICAgICAgICAgICAgICAgICAgICAgICAgeGhyID0gbmV3IEFjdGl2ZVhPYmplY3QobmFtZSlcblxuICAgICAgICBpZiB4aHI/XG4gICAgICAgICAgICAjIEJyb3dzZXJcbiAgICAgICAgICAgIGlmIGNhbGxiYWNrP1xuICAgICAgICAgICAgICAgICMgQXN5bmNcbiAgICAgICAgICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gLT5cbiAgICAgICAgICAgICAgICAgICAgaWYgeGhyLnJlYWR5U3RhdGUgaXMgNFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgeGhyLnN0YXR1cyBpcyAyMDAgb3IgeGhyLnN0YXR1cyBpcyAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soeGhyLnJlc3BvbnNlVGV4dClcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsKVxuICAgICAgICAgICAgICAgIHhoci5vcGVuICdHRVQnLCBwYXRoLCB0cnVlXG4gICAgICAgICAgICAgICAgeGhyLnNlbmQgbnVsbFxuICAgICAgICAgICAgXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgIyBTeW5jXG4gICAgICAgICAgICAgICAgeGhyLm9wZW4gJ0dFVCcsIHBhdGgsIGZhbHNlXG4gICAgICAgICAgICAgICAgeGhyLnNlbmQgbnVsbFxuXG4gICAgICAgICAgICAgICAgaWYgeGhyLnN0YXR1cyBpcyAyMDAgb3IgeGhyLnN0YXR1cyA9PSAwXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB4aHIucmVzcG9uc2VUZXh0XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICBlbHNlXG4gICAgICAgICAgICAjIE5vZGUuanMtbGlrZVxuICAgICAgICAgICAgcmVxID0gcmVxdWlyZVxuICAgICAgICAgICAgZnMgPSByZXEoJ2ZzJykgIyBQcmV2ZW50IGJyb3dzZXJpZnkgZnJvbSB0cnlpbmcgdG8gbG9hZCAnZnMnIG1vZHVsZVxuICAgICAgICAgICAgaWYgY2FsbGJhY2s/XG4gICAgICAgICAgICAgICAgIyBBc3luY1xuICAgICAgICAgICAgICAgIGZzLnJlYWRGaWxlIHBhdGgsIChlcnIsIGRhdGEpIC0+XG4gICAgICAgICAgICAgICAgICAgIGlmIGVyclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sgbnVsbFxuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayBTdHJpbmcoZGF0YSlcblxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICMgU3luY1xuICAgICAgICAgICAgICAgIGRhdGEgPSBmcy5yZWFkRmlsZVN5bmMgcGF0aFxuICAgICAgICAgICAgICAgIGlmIGRhdGE/XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBTdHJpbmcoZGF0YSlcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbFxuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBVdGlsc1xuIiwiXG5QYXJzZXIgPSByZXF1aXJlICcuL1BhcnNlcidcbkR1bXBlciA9IHJlcXVpcmUgJy4vRHVtcGVyJ1xuVXRpbHMgID0gcmVxdWlyZSAnLi9VdGlscydcblxuIyBZYW1sIG9mZmVycyBjb252ZW5pZW5jZSBtZXRob2RzIHRvIGxvYWQgYW5kIGR1bXAgWUFNTC5cbiNcbmNsYXNzIFlhbWxcblxuICAgICMgUGFyc2VzIFlBTUwgaW50byBhIEphdmFTY3JpcHQgb2JqZWN0LlxuICAgICNcbiAgICAjIFRoZSBwYXJzZSBtZXRob2QsIHdoZW4gc3VwcGxpZWQgd2l0aCBhIFlBTUwgc3RyaW5nLFxuICAgICMgd2lsbCBkbyBpdHMgYmVzdCB0byBjb252ZXJ0IFlBTUwgaW4gYSBmaWxlIGludG8gYSBKYXZhU2NyaXB0IG9iamVjdC5cbiAgICAjXG4gICAgIyAgVXNhZ2U6XG4gICAgIyAgICAgbXlPYmplY3QgPSBZYW1sLnBhcnNlKCdzb21lOiB5YW1sJyk7XG4gICAgIyAgICAgY29uc29sZS5sb2cobXlPYmplY3QpO1xuICAgICNcbiAgICAjIEBwYXJhbSBbU3RyaW5nXSAgIGlucHV0ICAgICAgICAgICAgICAgICAgIEEgc3RyaW5nIGNvbnRhaW5pbmcgWUFNTFxuICAgICMgQHBhcmFtIFtCb29sZWFuXSAgZXhjZXB0aW9uT25JbnZhbGlkVHlwZSAgdHJ1ZSBpZiBhbiBleGNlcHRpb24gbXVzdCBiZSB0aHJvd24gb24gaW52YWxpZCB0eXBlcywgZmFsc2Ugb3RoZXJ3aXNlXG4gICAgIyBAcGFyYW0gW0Z1bmN0aW9uXSBvYmplY3REZWNvZGVyICAgICAgICAgICBBIGZ1bmN0aW9uIHRvIGRlc2VyaWFsaXplIGN1c3RvbSBvYmplY3RzLCBudWxsIG90aGVyd2lzZVxuICAgICNcbiAgICAjIEByZXR1cm4gW09iamVjdF0gIFRoZSBZQU1MIGNvbnZlcnRlZCB0byBhIEphdmFTY3JpcHQgb2JqZWN0XG4gICAgI1xuICAgICMgQHRocm93IFtQYXJzZUV4Y2VwdGlvbl0gSWYgdGhlIFlBTUwgaXMgbm90IHZhbGlkXG4gICAgI1xuICAgIEBwYXJzZTogKGlucHV0LCBleGNlcHRpb25PbkludmFsaWRUeXBlID0gZmFsc2UsIG9iamVjdERlY29kZXIgPSBudWxsKSAtPlxuICAgICAgICByZXR1cm4gbmV3IFBhcnNlcigpLnBhcnNlKGlucHV0LCBleGNlcHRpb25PbkludmFsaWRUeXBlLCBvYmplY3REZWNvZGVyKVxuXG5cbiAgICAjIFBhcnNlcyBZQU1MIGZyb20gZmlsZSBwYXRoIGludG8gYSBKYXZhU2NyaXB0IG9iamVjdC5cbiAgICAjXG4gICAgIyBUaGUgcGFyc2VGaWxlIG1ldGhvZCwgd2hlbiBzdXBwbGllZCB3aXRoIGEgWUFNTCBmaWxlLFxuICAgICMgd2lsbCBkbyBpdHMgYmVzdCB0byBjb252ZXJ0IFlBTUwgaW4gYSBmaWxlIGludG8gYSBKYXZhU2NyaXB0IG9iamVjdC5cbiAgICAjXG4gICAgIyAgVXNhZ2U6XG4gICAgIyAgICAgbXlPYmplY3QgPSBZYW1sLnBhcnNlRmlsZSgnY29uZmlnLnltbCcpO1xuICAgICMgICAgIGNvbnNvbGUubG9nKG15T2JqZWN0KTtcbiAgICAjXG4gICAgIyBAcGFyYW0gW1N0cmluZ10gICBwYXRoICAgICAgICAgICAgICAgICAgICBBIGZpbGUgcGF0aCBwb2ludGluZyB0byBhIHZhbGlkIFlBTUwgZmlsZVxuICAgICMgQHBhcmFtIFtCb29sZWFuXSAgZXhjZXB0aW9uT25JbnZhbGlkVHlwZSAgdHJ1ZSBpZiBhbiBleGNlcHRpb24gbXVzdCBiZSB0aHJvd24gb24gaW52YWxpZCB0eXBlcywgZmFsc2Ugb3RoZXJ3aXNlXG4gICAgIyBAcGFyYW0gW0Z1bmN0aW9uXSBvYmplY3REZWNvZGVyICAgICAgICAgICBBIGZ1bmN0aW9uIHRvIGRlc2VyaWFsaXplIGN1c3RvbSBvYmplY3RzLCBudWxsIG90aGVyd2lzZVxuICAgICNcbiAgICAjIEByZXR1cm4gW09iamVjdF0gIFRoZSBZQU1MIGNvbnZlcnRlZCB0byBhIEphdmFTY3JpcHQgb2JqZWN0IG9yIG51bGwgaWYgdGhlIGZpbGUgZG9lc24ndCBleGlzdC5cbiAgICAjXG4gICAgIyBAdGhyb3cgW1BhcnNlRXhjZXB0aW9uXSBJZiB0aGUgWUFNTCBpcyBub3QgdmFsaWRcbiAgICAjXG4gICAgQHBhcnNlRmlsZTogKHBhdGgsIGNhbGxiYWNrID0gbnVsbCwgZXhjZXB0aW9uT25JbnZhbGlkVHlwZSA9IGZhbHNlLCBvYmplY3REZWNvZGVyID0gbnVsbCkgLT5cbiAgICAgICAgaWYgY2FsbGJhY2s/XG4gICAgICAgICAgICAjIEFzeW5jXG4gICAgICAgICAgICBVdGlscy5nZXRTdHJpbmdGcm9tRmlsZSBwYXRoLCAoaW5wdXQpID0+XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gbnVsbFxuICAgICAgICAgICAgICAgIGlmIGlucHV0P1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBAcGFyc2UgaW5wdXQsIGV4Y2VwdGlvbk9uSW52YWxpZFR5cGUsIG9iamVjdERlY29kZXJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayByZXN1bHRcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgIyBTeW5jXG4gICAgICAgICAgICBpbnB1dCA9IFV0aWxzLmdldFN0cmluZ0Zyb21GaWxlIHBhdGhcbiAgICAgICAgICAgIGlmIGlucHV0P1xuICAgICAgICAgICAgICAgIHJldHVybiBAcGFyc2UgaW5wdXQsIGV4Y2VwdGlvbk9uSW52YWxpZFR5cGUsIG9iamVjdERlY29kZXJcbiAgICAgICAgICAgIHJldHVybiBudWxsXG5cblxuICAgICMgRHVtcHMgYSBKYXZhU2NyaXB0IG9iamVjdCB0byBhIFlBTUwgc3RyaW5nLlxuICAgICNcbiAgICAjIFRoZSBkdW1wIG1ldGhvZCwgd2hlbiBzdXBwbGllZCB3aXRoIGFuIG9iamVjdCwgd2lsbCBkbyBpdHMgYmVzdFxuICAgICMgdG8gY29udmVydCB0aGUgb2JqZWN0IGludG8gZnJpZW5kbHkgWUFNTC5cbiAgICAjXG4gICAgIyBAcGFyYW0gW09iamVjdF0gICBpbnB1dCAgICAgICAgICAgICAgICAgICBKYXZhU2NyaXB0IG9iamVjdFxuICAgICMgQHBhcmFtIFtJbnRlZ2VyXSAgaW5saW5lICAgICAgICAgICAgICAgICAgVGhlIGxldmVsIHdoZXJlIHlvdSBzd2l0Y2ggdG8gaW5saW5lIFlBTUxcbiAgICAjIEBwYXJhbSBbSW50ZWdlcl0gIGluZGVudCAgICAgICAgICAgICAgICAgIFRoZSBhbW91bnQgb2Ygc3BhY2VzIHRvIHVzZSBmb3IgaW5kZW50YXRpb24gb2YgbmVzdGVkIG5vZGVzLlxuICAgICMgQHBhcmFtIFtCb29sZWFuXSAgZXhjZXB0aW9uT25JbnZhbGlkVHlwZSAgdHJ1ZSBpZiBhbiBleGNlcHRpb24gbXVzdCBiZSB0aHJvd24gb24gaW52YWxpZCB0eXBlcyAoYSBKYXZhU2NyaXB0IHJlc291cmNlIG9yIG9iamVjdCksIGZhbHNlIG90aGVyd2lzZVxuICAgICMgQHBhcmFtIFtGdW5jdGlvbl0gb2JqZWN0RW5jb2RlciAgICAgICAgICAgQSBmdW5jdGlvbiB0byBzZXJpYWxpemUgY3VzdG9tIG9iamVjdHMsIG51bGwgb3RoZXJ3aXNlXG4gICAgI1xuICAgICMgQHJldHVybiBbU3RyaW5nXSAgQSBZQU1MIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIG9yaWdpbmFsIEphdmFTY3JpcHQgb2JqZWN0XG4gICAgI1xuICAgIEBkdW1wOiAoaW5wdXQsIGlubGluZSA9IDIsIGluZGVudCA9IDQsIGV4Y2VwdGlvbk9uSW52YWxpZFR5cGUgPSBmYWxzZSwgb2JqZWN0RW5jb2RlciA9IG51bGwpIC0+XG4gICAgICAgIHlhbWwgPSBuZXcgRHVtcGVyKClcbiAgICAgICAgeWFtbC5pbmRlbnRhdGlvbiA9IGluZGVudFxuXG4gICAgICAgIHJldHVybiB5YW1sLmR1bXAoaW5wdXQsIGlubGluZSwgMCwgZXhjZXB0aW9uT25JbnZhbGlkVHlwZSwgb2JqZWN0RW5jb2RlcilcblxuXG4gICAgIyBSZWdpc3RlcnMgLnltbCBleHRlbnNpb24gdG8gd29yayB3aXRoIG5vZGUncyByZXF1aXJlKCkgZnVuY3Rpb24uXG4gICAgI1xuICAgIEByZWdpc3RlcjogLT5cbiAgICAgICAgcmVxdWlyZV9oYW5kbGVyID0gKG1vZHVsZSwgZmlsZW5hbWUpIC0+XG4gICAgICAgICAgICAjIEZpbGwgaW4gcmVzdWx0XG4gICAgICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IFlBTUwucGFyc2VGaWxlIGZpbGVuYW1lXG5cbiAgICAgICAgIyBSZWdpc3RlciByZXF1aXJlIGV4dGVuc2lvbnMgb25seSBpZiB3ZSdyZSBvbiBub2RlLmpzXG4gICAgICAgICMgaGFjayBmb3IgYnJvd3NlcmlmeVxuICAgICAgICBpZiByZXF1aXJlPy5leHRlbnNpb25zP1xuICAgICAgICAgICAgcmVxdWlyZS5leHRlbnNpb25zWycueW1sJ10gPSByZXF1aXJlX2hhbmRsZXJcbiAgICAgICAgICAgIHJlcXVpcmUuZXh0ZW5zaW9uc1snLnlhbWwnXSA9IHJlcXVpcmVfaGFuZGxlclxuXG5cbiAgICAjIEFsaWFzIG9mIGR1bXAoKSBtZXRob2QgZm9yIGNvbXBhdGliaWxpdHkgcmVhc29ucy5cbiAgICAjXG4gICAgQHN0cmluZ2lmeTogKGlucHV0LCBpbmxpbmUsIGluZGVudCwgZXhjZXB0aW9uT25JbnZhbGlkVHlwZSwgb2JqZWN0RW5jb2RlcikgLT5cbiAgICAgICAgcmV0dXJuIEBkdW1wIGlucHV0LCBpbmxpbmUsIGluZGVudCwgZXhjZXB0aW9uT25JbnZhbGlkVHlwZSwgb2JqZWN0RW5jb2RlclxuXG5cbiAgICAjIEFsaWFzIG9mIHBhcnNlRmlsZSgpIG1ldGhvZCBmb3IgY29tcGF0aWJpbGl0eSByZWFzb25zLlxuICAgICNcbiAgICBAbG9hZDogKHBhdGgsIGNhbGxiYWNrLCBleGNlcHRpb25PbkludmFsaWRUeXBlLCBvYmplY3REZWNvZGVyKSAtPlxuICAgICAgICByZXR1cm4gQHBhcnNlRmlsZSBwYXRoLCBjYWxsYmFjaywgZXhjZXB0aW9uT25JbnZhbGlkVHlwZSwgb2JqZWN0RGVjb2RlclxuXG5cbiMgRXhwb3NlIFlBTUwgbmFtZXNwYWNlIHRvIGJyb3dzZXJcbndpbmRvdz8uWUFNTCA9IFlhbWxcblxuIyBOb3QgaW4gdGhlIGJyb3dzZXI/XG51bmxlc3Mgd2luZG93P1xuICAgIEBZQU1MID0gWWFtbFxuXG5tb2R1bGUuZXhwb3J0cyA9IFlhbWxcbiJdfQ==
