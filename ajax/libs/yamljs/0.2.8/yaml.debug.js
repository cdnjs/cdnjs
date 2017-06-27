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
    var e, error, i, isQuoted, len, output, ref, value;
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
            } catch (error) {
              e = error;
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
    var alias, allowOverwrite, block, c, context, data, e, error, error1, error2, first, i, indent, isRef, j, k, key, l, lastKey, len, len1, len2, len3, lineCount, m, matches, mergeNode, n, name, parsed, parsedItem, parser, ref, ref1, ref2, refName, refValue, val, values;
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
        } catch (error) {
          e = error;
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
          } catch (error1) {
            e = error1;
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
          } catch (error2) {
            e = error2;
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
    var e, error, error1, foldedIndent, matches, modifiers, pos, ref, ref1, val;
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
    } catch (error) {
      e = error;
      if (((ref1 = value.charAt(0)) === '[' || ref1 === '{') && e instanceof ParseException && this.isNextLineIndented()) {
        value += "\n" + this.getNextEmbedBlock();
        try {
          return Inline.parse(value, exceptionOnInvalidType, objectDecoder);
        } catch (error1) {
          e = error1;
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
      if (Utils.trim(line, ' ').length === 0) {
        continue;
      }
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
          } catch (undefined) {}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9Vc2Vycy9qZXJlbXlmYS9Eb2N1bWVudHMvUHJvamV0cy95YW1sLmpzL3NyYy9EdW1wZXIuY29mZmVlIiwiL1VzZXJzL2plcmVteWZhL0RvY3VtZW50cy9Qcm9qZXRzL3lhbWwuanMvc3JjL0VzY2FwZXIuY29mZmVlIiwiL1VzZXJzL2plcmVteWZhL0RvY3VtZW50cy9Qcm9qZXRzL3lhbWwuanMvc3JjL0V4Y2VwdGlvbi9EdW1wRXhjZXB0aW9uLmNvZmZlZSIsIi9Vc2Vycy9qZXJlbXlmYS9Eb2N1bWVudHMvUHJvamV0cy95YW1sLmpzL3NyYy9FeGNlcHRpb24vUGFyc2VFeGNlcHRpb24uY29mZmVlIiwiL1VzZXJzL2plcmVteWZhL0RvY3VtZW50cy9Qcm9qZXRzL3lhbWwuanMvc3JjL0lubGluZS5jb2ZmZWUiLCIvVXNlcnMvamVyZW15ZmEvRG9jdW1lbnRzL1Byb2pldHMveWFtbC5qcy9zcmMvUGFyc2VyLmNvZmZlZSIsIi9Vc2Vycy9qZXJlbXlmYS9Eb2N1bWVudHMvUHJvamV0cy95YW1sLmpzL3NyYy9QYXR0ZXJuLmNvZmZlZSIsIi9Vc2Vycy9qZXJlbXlmYS9Eb2N1bWVudHMvUHJvamV0cy95YW1sLmpzL3NyYy9VbmVzY2FwZXIuY29mZmVlIiwiL1VzZXJzL2plcmVteWZhL0RvY3VtZW50cy9Qcm9qZXRzL3lhbWwuanMvc3JjL1V0aWxzLmNvZmZlZSIsIi9Vc2Vycy9qZXJlbXlmYS9Eb2N1bWVudHMvUHJvamV0cy95YW1sLmpzL3NyYy9ZYW1sLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0NBLElBQUE7O0FBQUEsS0FBQSxHQUFVLE9BQUEsQ0FBUSxTQUFSOztBQUNWLE1BQUEsR0FBVSxPQUFBLENBQVEsVUFBUjs7QUFJSjs7O0VBR0YsTUFBQyxDQUFBLFdB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QU8sUUFBUCxFQUFpQixzQkFBakIsRUFBeUMsYUFBekM7QUFDSCxXQUFPLElBQUMsQ0FBQSxTQUFELENBQVcsSUFBWCxFQUFpQixRQUFqQixFQUEyQixzQkFBM0IsRUFBbUQsYUFBbkQ7RUFESjs7Ozs7OztFQUtYLE1BQU0sQ0FBRSxJQUFSLEdBQWU7OztBQUdmLElBQU8sZ0RBQVA7RUFDSSxJQUFDLENBQUEsSUFBRCxHQUFRLEtBRFo7OztBQUdBLE1BQU0sQ0FBQyxPQUFQLEdBQWlCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlxuVXRpbHMgICA9IHJlcXVpcmUgJy4vVXRpbHMnXG5JbmxpbmUgID0gcmVxdWlyZSAnLi9JbmxpbmUnXG5cbiMgRHVtcGVyIGR1bXBzIEphdmFTY3JpcHQgdmFyaWFibGVzIHRvIFlBTUwgc3RyaW5ncy5cbiNcbmNsYXNzIER1bXBlclxuXG4gICAgIyBUaGUgYW1vdW50IG9mIHNwYWNlcyB0byB1c2UgZm9yIGluZGVudGF0aW9uIG9mIG5lc3RlZCBub2Rlcy5cbiAgICBAaW5kZW50YXRpb246ICAgNFxuXG5cbiAgICAjIER1bXBzIGEgSmF2YVNjcmlwdCB2YWx1ZSB0byBZQU1MLlxuICAgICNcbiAgICAjIEBwYXJhbSBbT2JqZWN0XSAgIGlucHV0ICAgICAgICAgICAgICAgICAgIFRoZSBKYXZhU2NyaXB0IHZhbHVlXG4gICAgIyBAcGFyYW0gW0ludGVnZXJdICBpbmxpbmUgICAgICAgICAgICAgICAgICBUaGUgbGV2ZWwgd2hlcmUgeW91IHN3aXRjaCB0byBpbmxpbmUgWUFNTFxuICAgICMgQHBhcmFtIFtJbnRlZ2VyXSAgaW5kZW50ICAgICAgICAgICAgICAgICAgVGhlIGxldmVsIG9mIGluZGVudGF0aW9uICh1c2VkIGludGVybmFsbHkpXG4gICAgIyBAcGFyYW0gW0Jvb2xlYW5dICBleGNlcHRpb25PbkludmFsaWRUeXBlICB0cnVlIGlmIGFuIGV4Y2VwdGlvbiBtdXN0IGJlIHRocm93biBvbiBpbnZhbGlkIHR5cGVzIChhIEphdmFTY3JpcHQgcmVzb3VyY2Ugb3Igb2JqZWN0KSwgZmFsc2Ugb3RoZXJ3aXNlXG4gICAgIyBAcGFyYW0gW0Z1bmN0aW9uXSBvYmplY3RFbmNvZGVyICAgICAgICAgICBBIGZ1bmN0aW9uIHRvIHNlcmlhbGl6ZSBjdXN0b20gb2JqZWN0cywgbnVsbCBvdGhlcndpc2VcbiAgICAjXG4gICAgIyBAcmV0dXJuIFtTdHJpbmddICBUaGUgWUFNTCByZXByZXNlbnRhdGlvbiBvZiB0aGUgSmF2YVNjcmlwdCB2YWx1ZVxuICAgICNcbiAgICBkdW1wOiAoaW5wdXQsIGlubGluZSA9IDAsIGluZGVudCA9IDAsIGV4Y2VwdGlvbk9uSW52YWxpZFR5cGUgPSBmYWxzZSwgb2JqZWN0RW5jb2RlciA9IG51bGwpIC0+XG4gICAgICAgIG91dHB1dCA9ICcnXG4gICAgICAgIHByZWZpeCA9IChpZiBpbmRlbnQgdGhlbiBVdGlscy5zdHJSZXBlYXQoJyAnLCBpbmRlbnQpIGVsc2UgJycpXG5cbiAgICAgICAgaWYgaW5saW5lIDw9IDAgb3IgdHlwZW9mKGlucHV0KSBpc250ICdvYmplY3QnIG9yIGlucHV0IGluc3RhbmNlb2YgRGF0ZSBvciBVdGlscy5pc0VtcHR5KGlucHV0KVxuICAgICAgICAgICAgb3V0cHV0ICs9IHByZWZpeCArIElubGluZS5kdW1wKGlucHV0LCBleGNlcHRpb25PbkludmFsaWRUeXBlLCBvYmplY3RFbmNvZGVyKVxuICAgICAgICBcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgaWYgaW5wdXQgaW5zdGFuY2VvZiBBcnJheVxuICAgICAgICAgICAgICAgIGZvciB2YWx1ZSBpbiBpbnB1dFxuICAgICAgICAgICAgICAgICAgICB3aWxsQmVJbmxpbmVkID0gKGlubGluZSAtIDEgPD0gMCBvciB0eXBlb2YodmFsdWUpIGlzbnQgJ29iamVjdCcgb3IgVXRpbHMuaXNFbXB0eSh2YWx1ZSkpXG5cbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0ICs9XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmVmaXggK1xuICAgICAgICAgICAgICAgICAgICAgICAgJy0nICtcbiAgICAgICAgICAgICAgICAgICAgICAgIChpZiB3aWxsQmVJbmxpbmVkIHRoZW4gJyAnIGVsc2UgXCJcXG5cIikgK1xuICAgICAgICAgICAgICAgICAgICAgICAgQGR1bXAodmFsdWUsIGlubGluZSAtIDEsIChpZiB3aWxsQmVJbmxpbmVkIHRoZW4gMCBlbHNlIGluZGVudCArIEBpbmRlbnRhdGlvbiksIGV4Y2VwdGlvbk9uSW52YWxpZFR5cGUsIG9iamVjdEVuY29kZXIpICtcbiAgICAgICAgICAgICAgICAgICAgICAgIChpZiB3aWxsQmVJbmxpbmVkIHRoZW4gXCJcXG5cIiBlbHNlICcnKVxuXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgZm9yIGtleSwgdmFsdWUgb2YgaW5wdXRcbiAgICAgICAgICAgICAgICAgICAgd2lsbEJlSW5saW5lZCA9IChpbmxpbmUgLSAxIDw9IDAgb3IgdHlwZW9mKHZhbHVlKSBpc250ICdvYmplY3QnIG9yIFV0aWxzLmlzRW1wdHkodmFsdWUpKVxuXG4gICAgICAgICAgICAgICAgICAgIG91dHB1dCArPVxuICAgICAgICAgICAgICAgICAgICAgICAgcHJlZml4ICtcbiAgICAgICAgICAgICAgICAgICAgICAgIElubGluZS5kdW1wKGtleSwgZXhjZXB0aW9uT25JbnZhbGlkVHlwZSwgb2JqZWN0RW5jb2RlcikgKyAnOicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgKGlmIHdpbGxCZUlubGluZWQgdGhlbiAnICcgZWxzZSBcIlxcblwiKSArXG4gICAgICAgICAgICAgICAgICAgICAgICBAZHVtcCh2YWx1ZSwgaW5saW5lIC0gMSwgKGlmIHdpbGxCZUlubGluZWQgdGhlbiAwIGVsc2UgaW5kZW50ICsgQGluZGVudGF0aW9uKSwgZXhjZXB0aW9uT25JbnZhbGlkVHlwZSwgb2JqZWN0RW5jb2RlcikgK1xuICAgICAgICAgICAgICAgICAgICAgICAgKGlmIHdpbGxCZUlubGluZWQgdGhlbiBcIlxcblwiIGVsc2UgJycpXG5cbiAgICAgICAgcmV0dXJuIG91dHB1dFxuXG5cbm1vZHVsZS5leHBvcnRzID0gRHVtcGVyXG4iLCJcblBhdHRlcm4gPSByZXF1aXJlICcuL1BhdHRlcm4nXG5cbiMgRXNjYXBlciBlbmNhcHN1bGF0ZXMgZXNjYXBpbmcgcnVsZXMgZm9yIHNpbmdsZVxuIyBhbmQgZG91YmxlLXF1b3RlZCBZQU1MIHN0cmluZ3MuXG5jbGFzcyBFc2NhcGVyXG5cbiAgICAjIE1hcHBpbmcgYXJyYXlzIGZvciBlc2NhcGluZyBhIGRvdWJsZSBxdW90ZWQgc3RyaW5nLiBUaGUgYmFja3NsYXNoIGlzXG4gICAgIyBmaXJzdCB0byBlbnN1cmUgcHJvcGVyIGVzY2FwaW5nLlxuICAgIEBMSVNUX0VTQ0FQRUVTOiAgICAgICAgICAgICAgICAgWydcXFxcJywgJ1xcXFxcXFxcJywgJ1xcXFxcIicsICdcIicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXHgwMFwiLCAgXCJcXHgwMVwiLCAgXCJcXHgwMlwiLCAgXCJcXHgwM1wiLCAgXCJcXHgwNFwiLCAgXCJcXHgwNVwiLCAgXCJcXHgwNlwiLCAgXCJcXHgwN1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFx4MDhcIiwgIFwiXFx4MDlcIiwgIFwiXFx4MGFcIiwgIFwiXFx4MGJcIiwgIFwiXFx4MGNcIiwgIFwiXFx4MGRcIiwgIFwiXFx4MGVcIiwgIFwiXFx4MGZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxceDEwXCIsICBcIlxceDExXCIsICBcIlxceDEyXCIsICBcIlxceDEzXCIsICBcIlxceDE0XCIsICBcIlxceDE1XCIsICBcIlxceDE2XCIsICBcIlxceDE3XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXHgxOFwiLCAgXCJcXHgxOVwiLCAgXCJcXHgxYVwiLCAgXCJcXHgxYlwiLCAgXCJcXHgxY1wiLCAgXCJcXHgxZFwiLCAgXCJcXHgxZVwiLCAgXCJcXHgxZlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjaCA9IFN0cmluZy5mcm9tQ2hhckNvZGUpKDB4MDA4NSksIGNoKDB4MDBBMCksIGNoKDB4MjAyOCksIGNoKDB4MjAyOSldXG4gICAgQExJU1RfRVNDQVBFRDogICAgICAgICAgICAgICAgICBbJ1xcXFxcXFxcJywgJ1xcXFxcIicsICdcXFxcXCInLCAnXFxcXFwiJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcXFwwXCIsICAgXCJcXFxceDAxXCIsIFwiXFxcXHgwMlwiLCBcIlxcXFx4MDNcIiwgXCJcXFxceDA0XCIsIFwiXFxcXHgwNVwiLCBcIlxcXFx4MDZcIiwgXCJcXFxcYVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxcXGJcIiwgICBcIlxcXFx0XCIsICAgXCJcXFxcblwiLCAgIFwiXFxcXHZcIiwgICBcIlxcXFxmXCIsICAgXCJcXFxcclwiLCAgIFwiXFxcXHgwZVwiLCBcIlxcXFx4MGZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcXFx4MTBcIiwgXCJcXFxceDExXCIsIFwiXFxcXHgxMlwiLCBcIlxcXFx4MTNcIiwgXCJcXFxceDE0XCIsIFwiXFxcXHgxNVwiLCBcIlxcXFx4MTZcIiwgXCJcXFxceDE3XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXFxceDE4XCIsIFwiXFxcXHgxOVwiLCBcIlxcXFx4MWFcIiwgXCJcXFxcZVwiLCAgIFwiXFxcXHgxY1wiLCBcIlxcXFx4MWRcIiwgXCJcXFxceDFlXCIsIFwiXFxcXHgxZlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXFxcXE5cIiwgXCJcXFxcX1wiLCBcIlxcXFxMXCIsIFwiXFxcXFBcIl1cblxuICAgIEBNQVBQSU5HX0VTQ0FQRUVTX1RPX0VTQ0FQRUQ6ICAgZG8gPT5cbiAgICAgICAgbWFwcGluZyA9IHt9XG4gICAgICAgIGZvciBpIGluIFswLi4uQExJU1RfRVNDQVBFRVMubGVuZ3RoXVxuICAgICAgICAgICAgbWFwcGluZ1tATElTVF9FU0NBUEVFU1tpXV0gPSBATElTVF9FU0NBUEVEW2ldXG4gICAgICAgIHJldHVybiBtYXBwaW5nXG5cbiAgICAjIENoYXJhY3RlcnMgdGhhdCB3b3VsZCBjYXVzZSBhIGR1bXBlZCBzdHJpbmcgdG8gcmVxdWlyZSBkb3VibGUgcXVvdGluZy5cbiAgICBAUEFUVEVSTl9DSEFSQUNURVJTX1RPX0VTQ0FQRTogIG5ldyBQYXR0ZXJuICdbXFxcXHgwMC1cXFxceDFmXXxcXHhjMlxceDg1fFxceGMyXFx4YTB8XFx4ZTJcXHg4MFxceGE4fFxceGUyXFx4ODBcXHhhOSdcblxuICAgICMgT3RoZXIgcHJlY29tcGlsZWQgcGF0dGVybnNcbiAgICBAUEFUVEVSTl9NQVBQSU5HX0VTQ0FQRUVTOiAgICAgIG5ldyBQYXR0ZXJuIEBMSVNUX0VTQ0FQRUVTLmpvaW4oJ3wnKS5zcGxpdCgnXFxcXCcpLmpvaW4oJ1xcXFxcXFxcJylcbiAgICBAUEFUVEVSTl9TSU5HTEVfUVVPVElORzogICAgICAgIG5ldyBQYXR0ZXJuICdbXFxcXHNcXCdcIjp7fVtcXFxcXSwmKiM/XXxeWy0/fDw+PSElQGBdJ1xuXG5cblxuICAgICMgRGV0ZXJtaW5lcyBpZiBhIEphdmFTY3JpcHQgdmFsdWUgd291bGQgcmVxdWlyZSBkb3VibGUgcXVvdGluZyBpbiBZQU1MLlxuICAgICNcbiAgICAjIEBwYXJhbSBbU3RyaW5nXSAgIHZhbHVlICAgQSBKYXZhU2NyaXB0IHZhbHVlIHZhbHVlXG4gICAgI1xuICAgICMgQHJldHVybiBbQm9vbGVhbl0gdHJ1ZSAgICBpZiB0aGUgdmFsdWUgd291bGQgcmVxdWlyZSBkb3VibGUgcXVvdGVzLlxuICAgICNcbiAgICBAcmVxdWlyZXNEb3VibGVRdW90aW5nOiAodmFsdWUpIC0+XG4gICAgICAgIHJldHVybiBAUEFUVEVSTl9DSEFSQUNURVJTX1RPX0VTQ0FQRS50ZXN0IHZhbHVlXG5cblxuICAgICMgRXNjYXBlcyBhbmQgc3Vycm91bmRzIGEgSmF2YVNjcmlwdCB2YWx1ZSB3aXRoIGRvdWJsZSBxdW90ZXMuXG4gICAgI1xuICAgICMgQHBhcmFtIFtTdHJpbmddICAgdmFsdWUgICBBIEphdmFTY3JpcHQgdmFsdWVcbiAgICAjXG4gICAgIyBAcmV0dXJuIFtTdHJpbmddICBUaGUgcXVvdGVkLCBlc2NhcGVkIHN0cmluZ1xuICAgICNcbiAgICBAZXNjYXBlV2l0aERvdWJsZVF1b3RlczogKHZhbHVlKSAtPlxuICAgICAgICByZXN1bHQgPSBAUEFUVEVSTl9NQVBQSU5HX0VTQ0FQRUVTLnJlcGxhY2UgdmFsdWUsIChzdHIpID0+XG4gICAgICAgICAgICByZXR1cm4gQE1BUFBJTkdfRVNDQVBFRVNfVE9fRVNDQVBFRFtzdHJdXG4gICAgICAgIHJldHVybiAnXCInK3Jlc3VsdCsnXCInXG5cblxuICAgICMgRGV0ZXJtaW5lcyBpZiBhIEphdmFTY3JpcHQgdmFsdWUgd291bGQgcmVxdWlyZSBzaW5nbGUgcXVvdGluZyBpbiBZQU1MLlxuICAgICNcbiAgICAjIEBwYXJhbSBbU3RyaW5nXSAgIHZhbHVlICAgQSBKYXZhU2NyaXB0IHZhbHVlXG4gICAgI1xuICAgICMgQHJldHVybiBbQm9vbGVhbl0gdHJ1ZSBpZiB0aGUgdmFsdWUgd291bGQgcmVxdWlyZSBzaW5nbGUgcXVvdGVzLlxuICAgICNcbiAgICBAcmVxdWlyZXNTaW5nbGVRdW90aW5nOiAodmFsdWUpIC0+XG4gICAgICAgIHJldHVybiBAUEFUVEVSTl9TSU5HTEVfUVVPVElORy50ZXN0IHZhbHVlXG5cblxuICAgICMgRXNjYXBlcyBhbmQgc3Vycm91bmRzIGEgSmF2YVNjcmlwdCB2YWx1ZSB3aXRoIHNpbmdsZSBxdW90ZXMuXG4gICAgI1xuICAgICMgQHBhcmFtIFtTdHJpbmddICAgdmFsdWUgICBBIEphdmFTY3JpcHQgdmFsdWVcbiAgICAjXG4gICAgIyBAcmV0dXJuIFtTdHJpbmddICBUaGUgcXVvdGVkLCBlc2NhcGVkIHN0cmluZ1xuICAgICNcbiAgICBAZXNjYXBlV2l0aFNpbmdsZVF1b3RlczogKHZhbHVlKSAtPlxuICAgICAgICByZXR1cm4gXCInXCIrdmFsdWUucmVwbGFjZSgvJy9nLCBcIicnXCIpK1wiJ1wiXG5cblxubW9kdWxlLmV4cG9ydHMgPSBFc2NhcGVyXG4iLCJcbmNsYXNzIER1bXBFeGNlcHRpb24gZXh0ZW5kcyBFcnJvclxuXG4gICAgY29uc3RydWN0b3I6IChAbWVzc2FnZSwgQHBhcnNlZExpbmUsIEBzbmlwcGV0KSAtPlxuXG4gICAgdG9TdHJpbmc6IC0+XG4gICAgICAgIGlmIEBwYXJzZWRMaW5lPyBhbmQgQHNuaXBwZXQ/XG4gICAgICAgICAgICByZXR1cm4gJzxEdW1wRXhjZXB0aW9uPiAnICsgQG1lc3NhZ2UgKyAnIChsaW5lICcgKyBAcGFyc2VkTGluZSArICc6IFxcJycgKyBAc25pcHBldCArICdcXCcpJ1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gJzxEdW1wRXhjZXB0aW9uPiAnICsgQG1lc3NhZ2VcblxubW9kdWxlLmV4cG9ydHMgPSBEdW1wRXhjZXB0aW9uXG4iLCJcbmNsYXNzIFBhcnNlRXhjZXB0aW9uIGV4dGVuZHMgRXJyb3JcblxuICAgIGNvbnN0cnVjdG9yOiAoQG1lc3NhZ2UsIEBwYXJzZWRMaW5lLCBAc25pcHBldCkgLT5cblxuICAgIHRvU3RyaW5nOiAtPlxuICAgICAgICBpZiBAcGFyc2VkTGluZT8gYW5kIEBzbmlwcGV0P1xuICAgICAgICAgICAgcmV0dXJuICc8UGFyc2VFeGNlcHRpb24+ICcgKyBAbWVzc2FnZSArICcgKGxpbmUgJyArIEBwYXJzZWRMaW5lICsgJzogXFwnJyArIEBzbmlwcGV0ICsgJ1xcJyknXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiAnPFBhcnNlRXhjZXB0aW9uPiAnICsgQG1lc3NhZ2VcblxubW9kdWxlLmV4cG9ydHMgPSBQYXJzZUV4Y2VwdGlvblxuIiwiXG5QYXR0ZXJuICAgICAgICAgPSByZXF1aXJlICcuL1BhdHRlcm4nXG5VbmVzY2FwZXIgICAgICAgPSByZXF1aXJlICcuL1VuZXNjYXBlcidcbkVzY2FwZXIgICAgICAgICA9IHJlcXVpcmUgJy4vRXNjYXBlcidcblV0aWxzICAgICAgICAgICA9IHJlcXVpcmUgJy4vVXRpbHMnXG5QYXJzZUV4Y2VwdGlvbiAgPSByZXF1aXJlICcuL0V4Y2VwdGlvbi9QYXJzZUV4Y2VwdGlvbidcbkR1bXBFeGNlcHRpb24gICA9IHJlcXVpcmUgJy4vRXhjZXB0aW9uL0R1bXBFeGNlcHRpb24nXG5cbiMgSW5saW5lIFlBTUwgcGFyc2luZyBhbmQgZHVtcGluZ1xuY2xhc3MgSW5saW5lXG5cbiAgICAjIFF1b3RlZCBzdHJpbmcgcmVndWxhciBleHByZXNzaW9uXG4gICAgQFJFR0VYX1FVT1RFRF9TVFJJTkc6ICAgICAgICAgICAgICAgJyg/OlwiKD86W15cIlxcXFxcXFxcXSooPzpcXFxcXFxcXC5bXlwiXFxcXFxcXFxdKikqKVwifFxcJyg/OlteXFwnXSooPzpcXCdcXCdbXlxcJ10qKSopXFwnKSdcblxuICAgICMgUHJlLWNvbXBpbGVkIHBhdHRlcm5zXG4gICAgI1xuICAgIEBQQVRURVJOX1RSQUlMSU5HX0NPTU1FTlRTOiAgICAgICAgIG5ldyBQYXR0ZXJuICdeXFxcXHMqIy4qJCdcbiAgICBAUEFUVEVSTl9RVU9URURfU0NBTEFSOiAgICAgICAgICAgICBuZXcgUGF0dGVybiAnXicrQFJFR0VYX1FVT1RFRF9TVFJJTkdcbiAgICBAUEFUVEVSTl9USE9VU0FORF9OVU1FUklDX1NDQUxBUjogICBuZXcgUGF0dGVybiAnXigtfFxcXFwrKT9bMC05LF0rKFxcXFwuWzAtOV0rKT8kJ1xuICAgIEBQQVRURVJOX1NDQUxBUl9CWV9ERUxJTUlURVJTOiAgICAgIHt9XG5cbiAgICAjIFNldHRpbmdzXG4gICAgQHNldHRpbmdzOiB7fVxuXG5cbiAgICAjIENvbmZpZ3VyZSBZQU1MIGlubGluZS5cbiAgICAjXG4gICAgIyBAcGFyYW0gW0Jvb2xlYW5dICBleGNlcHRpb25PbkludmFsaWRUeXBlICB0cnVlIGlmIGFuIGV4Y2VwdGlvbiBtdXN0IGJlIHRocm93biBvbiBpbnZhbGlkIHR5cGVzIChhIEphdmFTY3JpcHQgcmVzb3VyY2Ugb3Igb2JqZWN0KSwgZmFsc2Ugb3RoZXJ3aXNlXG4gICAgIyBAcGFyYW0gW0Z1bmN0aW9uXSBvYmplY3REZWNvZGVyICAgICAgICAgICBBIGZ1bmN0aW9uIHRvIGRlc2VyaWFsaXplIGN1c3RvbSBvYmplY3RzLCBudWxsIG90aGVyd2lzZVxuICAgICNcbiAgICBAY29uZmlndXJlOiAoZXhjZXB0aW9uT25JbnZhbGlkVHlwZSA9IG51bGwsIG9iamVjdERlY29kZXIgPSBudWxsKSAtPlxuICAgICAgICAjIFVwZGF0ZSBzZXR0aW5nc1xuICAgICAgICBAc2V0dGluZ3MuZXhjZXB0aW9uT25JbnZhbGlkVHlwZSA9IGV4Y2VwdGlvbk9uSW52YWxpZFR5cGVcbiAgICAgICAgQHNldHRpbmdzLm9iamVjdERlY29kZXIgPSBvYmplY3REZWNvZGVyXG4gICAgICAgIHJldHVyblxuXG5cbiAgICAjIENvbnZlcnRzIGEgWUFNTCBzdHJpbmcgdG8gYSBKYXZhU2NyaXB0IG9iamVjdC5cbiAgICAjXG4gICAgIyBAcGFyYW0gW1N0cmluZ10gICB2YWx1ZSAgICAgICAgICAgICAgICAgICBBIFlBTUwgc3RyaW5nXG4gICAgIyBAcGFyYW0gW0Jvb2xlYW5dICBleGNlcHRpb25PbkludmFsaWRUeXBlICB0cnVlIGlmIGFuIGV4Y2VwdGlvbiBtdXN0IGJlIHRocm93biBvbiBpbnZhbGlkIHR5cGVzIChhIEphdmFTY3JpcHQgcmVzb3VyY2Ugb3Igb2JqZWN0KSwgZmFsc2Ugb3RoZXJ3aXNlXG4gICAgIyBAcGFyYW0gW0Z1bmN0aW9uXSBvYmplY3REZWNvZGVyICAgICAgICAgICBBIGZ1bmN0aW9uIHRvIGRlc2VyaWFsaXplIGN1c3RvbSBvYmplY3RzLCBudWxsIG90aGVyd2lzZVxuICAgICNcbiAgICAjIEByZXR1cm4gW09iamVjdF0gIEEgSmF2YVNjcmlwdCBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBZQU1MIHN0cmluZ1xuICAgICNcbiAgICAjIEB0aHJvdyBbUGFyc2VFeGNlcHRpb25dXG4gICAgI1xuICAgIEBwYXJzZTogKHZhbHVlLCBleGNlcHRpb25PbkludmFsaWRUeXBlID0gZmFsc2UsIG9iamVjdERlY29kZXIgPSBudWxsKSAtPlxuICAgICAgICAjIFVwZGF0ZSBzZXR0aW5ncyBmcm9tIGxhc3QgY2FsbCBvZiBJbmxpbmUucGFyc2UoKVxuICAgICAgICBAc2V0dGluZ3MuZXhjZXB0aW9uT25JbnZhbGlkVHlwZSA9IGV4Y2VwdGlvbk9uSW52YWxpZFR5cGVcbiAgICAgICAgQHNldHRpbmdzLm9iamVjdERlY29kZXIgPSBvYmplY3REZWNvZGVyXG5cbiAgICAgICAgaWYgbm90IHZhbHVlP1xuICAgICAgICAgICAgcmV0dXJuICcnXG5cbiAgICAgICAgdmFsdWUgPSBVdGlscy50cmltIHZhbHVlXG5cbiAgICAgICAgaWYgMCBpcyB2YWx1ZS5sZW5ndGhcbiAgICAgICAgICAgIHJldHVybiAnJ1xuXG4gICAgICAgICMgS2VlcCBhIGNvbnRleHQgb2JqZWN0IHRvIHBhc3MgdGhyb3VnaCBzdGF0aWMgbWV0aG9kc1xuICAgICAgICBjb250ZXh0ID0ge2V4Y2VwdGlvbk9uSW52YWxpZFR5cGUsIG9iamVjdERlY29kZXIsIGk6IDB9XG5cbiAgICAgICAgc3dpdGNoIHZhbHVlLmNoYXJBdCgwKVxuICAgICAgICAgICAgd2hlbiAnWydcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBAcGFyc2VTZXF1ZW5jZSB2YWx1ZSwgY29udGV4dFxuICAgICAgICAgICAgICAgICsrY29udGV4dC5pXG4gICAgICAgICAgICB3aGVuICd7J1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IEBwYXJzZU1hcHBpbmcgdmFsdWUsIGNvbnRleHRcbiAgICAgICAgICAgICAgICArK2NvbnRleHQuaVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IEBwYXJzZVNjYWxhciB2YWx1ZSwgbnVsbCwgWydcIicsIFwiJ1wiXSwgY29udGV4dFxuXG4gICAgICAgICMgU29tZSBjb21tZW50cyBhcmUgYWxsb3dlZCBhdCB0aGUgZW5kXG4gICAgICAgIGlmIEBQQVRURVJOX1RSQUlMSU5HX0NPTU1FTlRTLnJlcGxhY2UodmFsdWVbY29udGV4dC5pLi5dLCAnJykgaXNudCAnJ1xuICAgICAgICAgICAgdGhyb3cgbmV3IFBhcnNlRXhjZXB0aW9uICdVbmV4cGVjdGVkIGNoYXJhY3RlcnMgbmVhciBcIicrdmFsdWVbY29udGV4dC5pLi5dKydcIi4nXG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdFxuXG5cbiAgICAjIER1bXBzIGEgZ2l2ZW4gSmF2YVNjcmlwdCB2YXJpYWJsZSB0byBhIFlBTUwgc3RyaW5nLlxuICAgICNcbiAgICAjIEBwYXJhbSBbT2JqZWN0XSAgIHZhbHVlICAgICAgICAgICAgICAgICAgIFRoZSBKYXZhU2NyaXB0IHZhcmlhYmxlIHRvIGNvbnZlcnRcbiAgICAjIEBwYXJhbSBbQm9vbGVhbl0gIGV4Y2VwdGlvbk9uSW52YWxpZFR5cGUgIHRydWUgaWYgYW4gZXhjZXB0aW9uIG11c3QgYmUgdGhyb3duIG9uIGludmFsaWQgdHlwZXMgKGEgSmF2YVNjcmlwdCByZXNvdXJjZSBvciBvYmplY3QpLCBmYWxzZSBvdGhlcndpc2VcbiAgICAjIEBwYXJhbSBbRnVuY3Rpb25dIG9iamVjdEVuY29kZXIgICAgICAgICAgIEEgZnVuY3Rpb24gdG8gc2VyaWFsaXplIGN1c3RvbSBvYmplY3RzLCBudWxsIG90aGVyd2lzZVxuICAgICNcbiAgICAjIEByZXR1cm4gW1N0cmluZ10gIFRoZSBZQU1MIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIEphdmFTY3JpcHQgb2JqZWN0XG4gICAgI1xuICAgICMgQHRocm93IFtEdW1wRXhjZXB0aW9uXVxuICAgICNcbiAgICBAZHVtcDogKHZhbHVlLCBleGNlcHRpb25PbkludmFsaWRUeXBlID0gZmFsc2UsIG9iamVjdEVuY29kZXIgPSBudWxsKSAtPlxuICAgICAgICBpZiBub3QgdmFsdWU/XG4gICAgICAgICAgICByZXR1cm4gJ251bGwnXG4gICAgICAgIHR5cGUgPSB0eXBlb2YgdmFsdWVcbiAgICAgICAgaWYgdHlwZSBpcyAnb2JqZWN0J1xuICAgICAgICAgICAgaWYgdmFsdWUgaW5zdGFuY2VvZiBEYXRlXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlLnRvSVNPU3RyaW5nKClcbiAgICAgICAgICAgIGVsc2UgaWYgb2JqZWN0RW5jb2Rlcj9cbiAgICAgICAgICAgICAgICByZXN1bHQgPSBvYmplY3RFbmNvZGVyIHZhbHVlXG4gICAgICAgICAgICAgICAgaWYgdHlwZW9mIHJlc3VsdCBpcyAnc3RyaW5nJyBvciByZXN1bHQ/XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHRcbiAgICAgICAgICAgIHJldHVybiBAZHVtcE9iamVjdCB2YWx1ZVxuICAgICAgICBpZiB0eXBlIGlzICdib29sZWFuJ1xuICAgICAgICAgICAgcmV0dXJuIChpZiB2YWx1ZSB0aGVuICd0cnVlJyBlbHNlICdmYWxzZScpXG4gICAgICAgIGlmIFV0aWxzLmlzRGlnaXRzKHZhbHVlKVxuICAgICAgICAgICAgcmV0dXJuIChpZiB0eXBlIGlzICdzdHJpbmcnIHRoZW4gXCInXCIrdmFsdWUrXCInXCIgZWxzZSBTdHJpbmcocGFyc2VJbnQodmFsdWUpKSlcbiAgICAgICAgaWYgVXRpbHMuaXNOdW1lcmljKHZhbHVlKVxuICAgICAgICAgICAgcmV0dXJuIChpZiB0eXBlIGlzICdzdHJpbmcnIHRoZW4gXCInXCIrdmFsdWUrXCInXCIgZWxzZSBTdHJpbmcocGFyc2VGbG9hdCh2YWx1ZSkpKVxuICAgICAgICBpZiB0eXBlIGlzICdudW1iZXInXG4gICAgICAgICAgICByZXR1cm4gKGlmIHZhbHVlIGlzIEluZmluaXR5IHRoZW4gJy5JbmYnIGVsc2UgKGlmIHZhbHVlIGlzIC1JbmZpbml0eSB0aGVuICctLkluZicgZWxzZSAoaWYgaXNOYU4odmFsdWUpIHRoZW4gJy5OYU4nIGVsc2UgdmFsdWUpKSlcbiAgICAgICAgaWYgRXNjYXBlci5yZXF1aXJlc0RvdWJsZVF1b3RpbmcgdmFsdWVcbiAgICAgICAgICAgIHJldHVybiBFc2NhcGVyLmVzY2FwZVdpdGhEb3VibGVRdW90ZXMgdmFsdWVcbiAgICAgICAgaWYgRXNjYXBlci5yZXF1aXJlc1NpbmdsZVF1b3RpbmcgdmFsdWVcbiAgICAgICAgICAgIHJldHVybiBFc2NhcGVyLmVzY2FwZVdpdGhTaW5nbGVRdW90ZXMgdmFsdWVcbiAgICAgICAgaWYgJycgaXMgdmFsdWVcbiAgICAgICAgICAgIHJldHVybiAnXCJcIidcbiAgICAgICAgaWYgVXRpbHMuUEFUVEVSTl9EQVRFLnRlc3QgdmFsdWVcbiAgICAgICAgICAgIHJldHVybiBcIidcIit2YWx1ZStcIidcIjtcbiAgICAgICAgaWYgdmFsdWUudG9Mb3dlckNhc2UoKSBpbiBbJ251bGwnLCd+JywndHJ1ZScsJ2ZhbHNlJ11cbiAgICAgICAgICAgIHJldHVybiBcIidcIit2YWx1ZStcIidcIlxuICAgICAgICAjIERlZmF1bHRcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuXG5cbiAgICAjIER1bXBzIGEgSmF2YVNjcmlwdCBvYmplY3QgdG8gYSBZQU1MIHN0cmluZy5cbiAgICAjXG4gICAgIyBAcGFyYW0gW09iamVjdF0gICB2YWx1ZSAgICAgICAgICAgICAgICAgICBUaGUgSmF2YVNjcmlwdCBvYmplY3QgdG8gZHVtcFxuICAgICMgQHBhcmFtIFtCb29sZWFuXSAgZXhjZXB0aW9uT25JbnZhbGlkVHlwZSAgdHJ1ZSBpZiBhbiBleGNlcHRpb24gbXVzdCBiZSB0aHJvd24gb24gaW52YWxpZCB0eXBlcyAoYSBKYXZhU2NyaXB0IHJlc291cmNlIG9yIG9iamVjdCksIGZhbHNlIG90aGVyd2lzZVxuICAgICMgQHBhcmFtIFtGdW5jdGlvbl0gb2JqZWN0RW5jb2RlciAgICAgICAgICAgQSBmdW5jdGlvbiBkbyBzZXJpYWxpemUgY3VzdG9tIG9iamVjdHMsIG51bGwgb3RoZXJ3aXNlXG4gICAgI1xuICAgICMgQHJldHVybiBzdHJpbmcgVGhlIFlBTUwgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgSmF2YVNjcmlwdCBvYmplY3RcbiAgICAjXG4gICAgQGR1bXBPYmplY3Q6ICh2YWx1ZSwgZXhjZXB0aW9uT25JbnZhbGlkVHlwZSwgb2JqZWN0U3VwcG9ydCA9IG51bGwpIC0+XG4gICAgICAgICMgQXJyYXlcbiAgICAgICAgaWYgdmFsdWUgaW5zdGFuY2VvZiBBcnJheVxuICAgICAgICAgICAgb3V0cHV0ID0gW11cbiAgICAgICAgICAgIGZvciB2YWwgaW4gdmFsdWVcbiAgICAgICAgICAgICAgICBvdXRwdXQucHVzaCBAZHVtcCB2YWxcbiAgICAgICAgICAgIHJldHVybiAnWycrb3V0cHV0LmpvaW4oJywgJykrJ10nXG5cbiAgICAgICAgIyBNYXBwaW5nXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIG91dHB1dCA9IFtdXG4gICAgICAgICAgICBmb3Iga2V5LCB2YWwgb2YgdmFsdWVcbiAgICAgICAgICAgICAgICBvdXRwdXQucHVzaCBAZHVtcChrZXkpKyc6ICcrQGR1bXAodmFsKVxuICAgICAgICAgICAgcmV0dXJuICd7JytvdXRwdXQuam9pbignLCAnKSsnfSdcblxuXG4gICAgIyBQYXJzZXMgYSBzY2FsYXIgdG8gYSBZQU1MIHN0cmluZy5cbiAgICAjXG4gICAgIyBAcGFyYW0gW09iamVjdF0gICBzY2FsYXJcbiAgICAjIEBwYXJhbSBbQXJyYXldICAgIGRlbGltaXRlcnNcbiAgICAjIEBwYXJhbSBbQXJyYXldICAgIHN0cmluZ0RlbGltaXRlcnNcbiAgICAjIEBwYXJhbSBbT2JqZWN0XSAgIGNvbnRleHRcbiAgICAjIEBwYXJhbSBbQm9vbGVhbl0gIGV2YWx1YXRlXG4gICAgI1xuICAgICMgQHJldHVybiBbU3RyaW5nXSAgQSBZQU1MIHN0cmluZ1xuICAgICNcbiAgICAjIEB0aHJvdyBbUGFyc2VFeGNlcHRpb25dIFdoZW4gbWFsZm9ybWVkIGlubGluZSBZQU1MIHN0cmluZyBpcyBwYXJzZWRcbiAgICAjXG4gICAgQHBhcnNlU2NhbGFyOiAoc2NhbGFyLCBkZWxpbWl0ZXJzID0gbnVsbCwgc3RyaW5nRGVsaW1pdGVycyA9IFsnXCInLCBcIidcIl0sIGNvbnRleHQgPSBudWxsLCBldmFsdWF0ZSA9IHRydWUpIC0+XG4gICAgICAgIHVubGVzcyBjb250ZXh0P1xuICAgICAgICAgICAgY29udGV4dCA9IGV4Y2VwdGlvbk9uSW52YWxpZFR5cGU6IEBzZXR0aW5ncy5leGNlcHRpb25PbkludmFsaWRUeXBlLCBvYmplY3REZWNvZGVyOiBAc2V0dGluZ3Mub2JqZWN0RGVjb2RlciwgaTogMFxuICAgICAgICB7aX0gPSBjb250ZXh0XG5cbiAgICAgICAgaWYgc2NhbGFyLmNoYXJBdChpKSBpbiBzdHJpbmdEZWxpbWl0ZXJzXG4gICAgICAgICAgICAjIFF1b3RlZCBzY2FsYXJcbiAgICAgICAgICAgIG91dHB1dCA9IEBwYXJzZVF1b3RlZFNjYWxhciBzY2FsYXIsIGNvbnRleHRcbiAgICAgICAgICAgIHtpfSA9IGNvbnRleHRcblxuICAgICAgICAgICAgaWYgZGVsaW1pdGVycz9cbiAgICAgICAgICAgICAgICB0bXAgPSBVdGlscy5sdHJpbSBzY2FsYXJbaS4uXSwgJyAnXG4gICAgICAgICAgICAgICAgaWYgbm90KHRtcC5jaGFyQXQoMCkgaW4gZGVsaW1pdGVycylcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFBhcnNlRXhjZXB0aW9uICdVbmV4cGVjdGVkIGNoYXJhY3RlcnMgKCcrc2NhbGFyW2kuLl0rJykuJ1xuXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgICMgXCJub3JtYWxcIiBzdHJpbmdcbiAgICAgICAgICAgIGlmIG5vdCBkZWxpbWl0ZXJzXG4gICAgICAgICAgICAgICAgb3V0cHV0ID0gc2NhbGFyW2kuLl1cbiAgICAgICAgICAgICAgICBpICs9IG91dHB1dC5sZW5ndGhcblxuICAgICAgICAgICAgICAgICMgUmVtb3ZlIGNvbW1lbnRzXG4gICAgICAgICAgICAgICAgc3RycG9zID0gb3V0cHV0LmluZGV4T2YgJyAjJ1xuICAgICAgICAgICAgICAgIGlmIHN0cnBvcyBpc250IC0xXG4gICAgICAgICAgICAgICAgICAgIG91dHB1dCA9IFV0aWxzLnJ0cmltIG91dHB1dFswLi4uc3RycG9zXVxuXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgam9pbmVkRGVsaW1pdGVycyA9IGRlbGltaXRlcnMuam9pbignfCcpXG4gICAgICAgICAgICAgICAgcGF0dGVybiA9IEBQQVRURVJOX1NDQUxBUl9CWV9ERUxJTUlURVJTW2pvaW5lZERlbGltaXRlcnNdXG4gICAgICAgICAgICAgICAgdW5sZXNzIHBhdHRlcm4/XG4gICAgICAgICAgICAgICAgICAgIHBhdHRlcm4gPSBuZXcgUGF0dGVybiAnXiguKz8pKCcram9pbmVkRGVsaW1pdGVycysnKSdcbiAgICAgICAgICAgICAgICAgICAgQFBBVFRFUk5fU0NBTEFSX0JZX0RFTElNSVRFUlNbam9pbmVkRGVsaW1pdGVyc10gPSBwYXR0ZXJuXG4gICAgICAgICAgICAgICAgaWYgbWF0Y2ggPSBwYXR0ZXJuLmV4ZWMgc2NhbGFyW2kuLl1cbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0ID0gbWF0Y2hbMV1cbiAgICAgICAgICAgICAgICAgICAgaSArPSBvdXRwdXQubGVuZ3RoXG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUGFyc2VFeGNlcHRpb24gJ01hbGZvcm1lZCBpbmxpbmUgWUFNTCBzdHJpbmcgKCcrc2NhbGFyKycpLidcblxuXG4gICAgICAgICAgICBpZiBldmFsdWF0ZVxuICAgICAgICAgICAgICAgIG91dHB1dCA9IEBldmFsdWF0ZVNjYWxhciBvdXRwdXQsIGNvbnRleHRcblxuICAgICAgICBjb250ZXh0LmkgPSBpXG4gICAgICAgIHJldHVybiBvdXRwdXRcblxuXG4gICAgIyBQYXJzZXMgYSBxdW90ZWQgc2NhbGFyIHRvIFlBTUwuXG4gICAgI1xuICAgICMgQHBhcmFtIFtTdHJpbmddICAgc2NhbGFyXG4gICAgIyBAcGFyYW0gW09iamVjdF0gICBjb250ZXh0XG4gICAgI1xuICAgICMgQHJldHVybiBbU3RyaW5nXSAgQSBZQU1MIHN0cmluZ1xuICAgICNcbiAgICAjIEB0aHJvdyBbUGFyc2VFeGNlcHRpb25dIFdoZW4gbWFsZm9ybWVkIGlubGluZSBZQU1MIHN0cmluZyBpcyBwYXJzZWRcbiAgICAjXG4gICAgQHBhcnNlUXVvdGVkU2NhbGFyOiAoc2NhbGFyLCBjb250ZXh0KSAtPlxuICAgICAgICB7aX0gPSBjb250ZXh0XG5cbiAgICAgICAgdW5sZXNzIG1hdGNoID0gQFBBVFRFUk5fUVVPVEVEX1NDQUxBUi5leGVjIHNjYWxhcltpLi5dXG4gICAgICAgICAgICB0aHJvdyBuZXcgUGFyc2VFeGNlcHRpb24gJ01hbGZvcm1lZCBpbmxpbmUgWUFNTCBzdHJpbmcgKCcrc2NhbGFyW2kuLl0rJykuJ1xuXG4gICAgICAgIG91dHB1dCA9IG1hdGNoWzBdLnN1YnN0cigxLCBtYXRjaFswXS5sZW5ndGggLSAyKVxuXG4gICAgICAgIGlmICdcIicgaXMgc2NhbGFyLmNoYXJBdChpKVxuICAgICAgICAgICAgb3V0cHV0ID0gVW5lc2NhcGVyLnVuZXNjYXBlRG91YmxlUXVvdGVkU3RyaW5nIG91dHB1dFxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBvdXRwdXQgPSBVbmVzY2FwZXIudW5lc2NhcGVTaW5nbGVRdW90ZWRTdHJpbmcgb3V0cHV0XG5cbiAgICAgICAgaSArPSBtYXRjaFswXS5sZW5ndGhcblxuICAgICAgICBjb250ZXh0LmkgPSBpXG4gICAgICAgIHJldHVybiBvdXRwdXRcblxuXG4gICAgIyBQYXJzZXMgYSBzZXF1ZW5jZSB0byBhIFlBTUwgc3RyaW5nLlxuICAgICNcbiAgICAjIEBwYXJhbSBbU3RyaW5nXSAgIHNlcXVlbmNlXG4gICAgIyBAcGFyYW0gW09iamVjdF0gICBjb250ZXh0XG4gICAgI1xuICAgICMgQHJldHVybiBbU3RyaW5nXSAgQSBZQU1MIHN0cmluZ1xuICAgICNcbiAgICAjIEB0aHJvdyBbUGFyc2VFeGNlcHRpb25dIFdoZW4gbWFsZm9ybWVkIGlubGluZSBZQU1MIHN0cmluZyBpcyBwYXJzZWRcbiAgICAjXG4gICAgQHBhcnNlU2VxdWVuY2U6IChzZXF1ZW5jZSwgY29udGV4dCkgLT5cbiAgICAgICAgb3V0cHV0ID0gW11cbiAgICAgICAgbGVuID0gc2VxdWVuY2UubGVuZ3RoXG4gICAgICAgIHtpfSA9IGNvbnRleHRcbiAgICAgICAgaSArPSAxXG5cbiAgICAgICAgIyBbZm9vLCBiYXIsIC4uLl1cbiAgICAgICAgd2hpbGUgaSA8IGxlblxuICAgICAgICAgICAgY29udGV4dC5pID0gaVxuICAgICAgICAgICAgc3dpdGNoIHNlcXVlbmNlLmNoYXJBdChpKVxuICAgICAgICAgICAgICAgIHdoZW4gJ1snXG4gICAgICAgICAgICAgICAgICAgICMgTmVzdGVkIHNlcXVlbmNlXG4gICAgICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoIEBwYXJzZVNlcXVlbmNlIHNlcXVlbmNlLCBjb250ZXh0XG4gICAgICAgICAgICAgICAgICAgIHtpfSA9IGNvbnRleHRcbiAgICAgICAgICAgICAgICB3aGVuICd7J1xuICAgICAgICAgICAgICAgICAgICAjIE5lc3RlZCBtYXBwaW5nXG4gICAgICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoIEBwYXJzZU1hcHBpbmcgc2VxdWVuY2UsIGNvbnRleHRcbiAgICAgICAgICAgICAgICAgICAge2l9ID0gY29udGV4dFxuICAgICAgICAgICAgICAgIHdoZW4gJ10nXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvdXRwdXRcbiAgICAgICAgICAgICAgICB3aGVuICcsJywgJyAnLCBcIlxcblwiXG4gICAgICAgICAgICAgICAgICAgICMgRG8gbm90aGluZ1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgaXNRdW90ZWQgPSAoc2VxdWVuY2UuY2hhckF0KGkpIGluIFsnXCInLCBcIidcIl0pXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gQHBhcnNlU2NhbGFyIHNlcXVlbmNlLCBbJywnLCAnXSddLCBbJ1wiJywgXCInXCJdLCBjb250ZXh0XG4gICAgICAgICAgICAgICAgICAgIHtpfSA9IGNvbnRleHRcblxuICAgICAgICAgICAgICAgICAgICBpZiBub3QoaXNRdW90ZWQpIGFuZCB0eXBlb2YodmFsdWUpIGlzICdzdHJpbmcnIGFuZCAodmFsdWUuaW5kZXhPZignOiAnKSBpc250IC0xIG9yIHZhbHVlLmluZGV4T2YoXCI6XFxuXCIpIGlzbnQgLTEpXG4gICAgICAgICAgICAgICAgICAgICAgICAjIEVtYmVkZGVkIG1hcHBpbmc/XG4gICAgICAgICAgICAgICAgICAgICAgICB0cnlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IEBwYXJzZU1hcHBpbmcgJ3snK3ZhbHVlKyd9J1xuICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2ggZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICMgTm8sIGl0J3Mgbm90XG5cblxuICAgICAgICAgICAgICAgICAgICBvdXRwdXQucHVzaCB2YWx1ZVxuXG4gICAgICAgICAgICAgICAgICAgIC0taVxuXG4gICAgICAgICAgICArK2lcblxuICAgICAgICB0aHJvdyBuZXcgUGFyc2VFeGNlcHRpb24gJ01hbGZvcm1lZCBpbmxpbmUgWUFNTCBzdHJpbmcgJytzZXF1ZW5jZVxuXG5cbiAgICAjIFBhcnNlcyBhIG1hcHBpbmcgdG8gYSBZQU1MIHN0cmluZy5cbiAgICAjXG4gICAgIyBAcGFyYW0gW1N0cmluZ10gICBtYXBwaW5nXG4gICAgIyBAcGFyYW0gW09iamVjdF0gICBjb250ZXh0XG4gICAgI1xuICAgICMgQHJldHVybiBbU3RyaW5nXSAgQSBZQU1MIHN0cmluZ1xuICAgICNcbiAgICAjIEB0aHJvdyBbUGFyc2VFeGNlcHRpb25dIFdoZW4gbWFsZm9ybWVkIGlubGluZSBZQU1MIHN0cmluZyBpcyBwYXJzZWRcbiAgICAjXG4gICAgQHBhcnNlTWFwcGluZzogKG1hcHBpbmcsIGNvbnRleHQpIC0+XG4gICAgICAgIG91dHB1dCA9IHt9XG4gICAgICAgIGxlbiA9IG1hcHBpbmcubGVuZ3RoXG4gICAgICAgIHtpfSA9IGNvbnRleHRcbiAgICAgICAgaSArPSAxXG5cbiAgICAgICAgIyB7Zm9vOiBiYXIsIGJhcjpmb28sIC4uLn1cbiAgICAgICAgc2hvdWxkQ29udGludWVXaGlsZUxvb3AgPSBmYWxzZVxuICAgICAgICB3aGlsZSBpIDwgbGVuXG4gICAgICAgICAgICBjb250ZXh0LmkgPSBpXG4gICAgICAgICAgICBzd2l0Y2ggbWFwcGluZy5jaGFyQXQoaSlcbiAgICAgICAgICAgICAgICB3aGVuICcgJywgJywnLCBcIlxcblwiXG4gICAgICAgICAgICAgICAgICAgICsraVxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmkgPSBpXG4gICAgICAgICAgICAgICAgICAgIHNob3VsZENvbnRpbnVlV2hpbGVMb29wID0gdHJ1ZVxuICAgICAgICAgICAgICAgIHdoZW4gJ30nXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvdXRwdXRcblxuICAgICAgICAgICAgaWYgc2hvdWxkQ29udGludWVXaGlsZUxvb3BcbiAgICAgICAgICAgICAgICBzaG91bGRDb250aW51ZVdoaWxlTG9vcCA9IGZhbHNlXG4gICAgICAgICAgICAgICAgY29udGludWVcblxuICAgICAgICAgICAgIyBLZXlcbiAgICAgICAgICAgIGtleSA9IEBwYXJzZVNjYWxhciBtYXBwaW5nLCBbJzonLCAnICcsIFwiXFxuXCJdLCBbJ1wiJywgXCInXCJdLCBjb250ZXh0LCBmYWxzZVxuICAgICAgICAgICAge2l9ID0gY29udGV4dFxuXG4gICAgICAgICAgICAjIFZhbHVlXG4gICAgICAgICAgICBkb25lID0gZmFsc2VcblxuICAgICAgICAgICAgd2hpbGUgaSA8IGxlblxuICAgICAgICAgICAgICAgIGNvbnRleHQuaSA9IGlcbiAgICAgICAgICAgICAgICBzd2l0Y2ggbWFwcGluZy5jaGFyQXQoaSlcbiAgICAgICAgICAgICAgICAgICAgd2hlbiAnWydcbiAgICAgICAgICAgICAgICAgICAgICAgICMgTmVzdGVkIHNlcXVlbmNlXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IEBwYXJzZVNlcXVlbmNlIG1hcHBpbmcsIGNvbnRleHRcbiAgICAgICAgICAgICAgICAgICAgICAgIHtpfSA9IGNvbnRleHRcbiAgICAgICAgICAgICAgICAgICAgICAgICMgU3BlYzogS2V5cyBNVVNUIGJlIHVuaXF1ZTsgZmlyc3Qgb25lIHdpbnMuXG4gICAgICAgICAgICAgICAgICAgICAgICAjIFBhcnNlciBjYW5ub3QgYWJvcnQgdGhpcyBtYXBwaW5nIGVhcmxpZXIsIHNpbmNlIGxpbmVzXG4gICAgICAgICAgICAgICAgICAgICAgICAjIGFyZSBwcm9jZXNzZWQgc2VxdWVudGlhbGx5LlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgb3V0cHV0W2tleV0gPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0W2tleV0gPSB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgZG9uZSA9IHRydWVcbiAgICAgICAgICAgICAgICAgICAgd2hlbiAneydcbiAgICAgICAgICAgICAgICAgICAgICAgICMgTmVzdGVkIG1hcHBpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gQHBhcnNlTWFwcGluZyBtYXBwaW5nLCBjb250ZXh0XG4gICAgICAgICAgICAgICAgICAgICAgICB7aX0gPSBjb250ZXh0XG4gICAgICAgICAgICAgICAgICAgICAgICAjIFNwZWM6IEtleXMgTVVTVCBiZSB1bmlxdWU7IGZpcnN0IG9uZSB3aW5zLlxuICAgICAgICAgICAgICAgICAgICAgICAgIyBQYXJzZXIgY2Fubm90IGFib3J0IHRoaXMgbWFwcGluZyBlYXJsaWVyLCBzaW5jZSBsaW5lc1xuICAgICAgICAgICAgICAgICAgICAgICAgIyBhcmUgcHJvY2Vzc2VkIHNlcXVlbnRpYWxseS5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIG91dHB1dFtrZXldID09IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dFtrZXldID0gdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbmUgPSB0cnVlXG4gICAgICAgICAgICAgICAgICAgIHdoZW4gJzonLCAnICcsIFwiXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICMgRG8gbm90aGluZ1xuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IEBwYXJzZVNjYWxhciBtYXBwaW5nLCBbJywnLCAnfSddLCBbJ1wiJywgXCInXCJdLCBjb250ZXh0XG4gICAgICAgICAgICAgICAgICAgICAgICB7aX0gPSBjb250ZXh0XG4gICAgICAgICAgICAgICAgICAgICAgICAjIFNwZWM6IEtleXMgTVVTVCBiZSB1bmlxdWU7IGZpcnN0IG9uZSB3aW5zLlxuICAgICAgICAgICAgICAgICAgICAgICAgIyBQYXJzZXIgY2Fubm90IGFib3J0IHRoaXMgbWFwcGluZyBlYXJsaWVyLCBzaW5jZSBsaW5lc1xuICAgICAgICAgICAgICAgICAgICAgICAgIyBhcmUgcHJvY2Vzc2VkIHNlcXVlbnRpYWxseS5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIG91dHB1dFtrZXldID09IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dFtrZXldID0gdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbmUgPSB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICAtLWlcblxuICAgICAgICAgICAgICAgICsraVxuXG4gICAgICAgICAgICAgICAgaWYgZG9uZVxuICAgICAgICAgICAgICAgICAgICBicmVha1xuXG4gICAgICAgIHRocm93IG5ldyBQYXJzZUV4Y2VwdGlvbiAnTWFsZm9ybWVkIGlubGluZSBZQU1MIHN0cmluZyAnK21hcHBpbmdcblxuXG4gICAgIyBFdmFsdWF0ZXMgc2NhbGFycyBhbmQgcmVwbGFjZXMgbWFnaWMgdmFsdWVzLlxuICAgICNcbiAgICAjIEBwYXJhbSBbU3RyaW5nXSAgIHNjYWxhclxuICAgICNcbiAgICAjIEByZXR1cm4gW1N0cmluZ10gIEEgWUFNTCBzdHJpbmdcbiAgICAjXG4gICAgQGV2YWx1YXRlU2NhbGFyOiAoc2NhbGFyLCBjb250ZXh0KSAtPlxuICAgICAgICBzY2FsYXIgPSBVdGlscy50cmltKHNjYWxhcilcbiAgICAgICAgc2NhbGFyTG93ZXIgPSBzY2FsYXIudG9Mb3dlckNhc2UoKVxuXG4gICAgICAgIHN3aXRjaCBzY2FsYXJMb3dlclxuICAgICAgICAgICAgd2hlbiAnbnVsbCcsICcnLCAnfidcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICAgICAgd2hlbiAndHJ1ZSdcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgd2hlbiAnZmFsc2UnXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICB3aGVuICcuaW5mJ1xuICAgICAgICAgICAgICAgIHJldHVybiBJbmZpbml0eVxuICAgICAgICAgICAgd2hlbiAnLm5hbidcbiAgICAgICAgICAgICAgICByZXR1cm4gTmFOXG4gICAgICAgICAgICB3aGVuICctLmluZidcbiAgICAgICAgICAgICAgICByZXR1cm4gSW5maW5pdHlcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBmaXJzdENoYXIgPSBzY2FsYXJMb3dlci5jaGFyQXQoMClcbiAgICAgICAgICAgICAgICBzd2l0Y2ggZmlyc3RDaGFyXG4gICAgICAgICAgICAgICAgICAgIHdoZW4gJyEnXG4gICAgICAgICAgICAgICAgICAgICAgICBmaXJzdFNwYWNlID0gc2NhbGFyLmluZGV4T2YoJyAnKVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgZmlyc3RTcGFjZSBpcyAtMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0V29yZCA9IHNjYWxhckxvd2VyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3RXb3JkID0gc2NhbGFyTG93ZXJbMC4uLmZpcnN0U3BhY2VdXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggZmlyc3RXb3JkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hlbiAnISdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgZmlyc3RTcGFjZSBpc250IC0xXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VJbnQgQHBhcnNlU2NhbGFyKHNjYWxhclsyLi5dKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoZW4gJyFzdHInXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBVdGlscy5sdHJpbSBzY2FsYXJbNC4uXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoZW4gJyEhc3RyJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gVXRpbHMubHRyaW0gc2NhbGFyWzUuLl1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGVuICchIWludCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KEBwYXJzZVNjYWxhcihzY2FsYXJbNS4uXSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hlbiAnISFib29sJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gVXRpbHMucGFyc2VCb29sZWFuKEBwYXJzZVNjYWxhcihzY2FsYXJbNi4uXSksIGZhbHNlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoZW4gJyEhZmxvYXQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZUZsb2F0KEBwYXJzZVNjYWxhcihzY2FsYXJbNy4uXSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hlbiAnISF0aW1lc3RhbXAnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBVdGlscy5zdHJpbmdUb0RhdGUoVXRpbHMubHRyaW0oc2NhbGFyWzExLi5dKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVubGVzcyBjb250ZXh0P1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dCA9IGV4Y2VwdGlvbk9uSW52YWxpZFR5cGU6IEBzZXR0aW5ncy5leGNlcHRpb25PbkludmFsaWRUeXBlLCBvYmplY3REZWNvZGVyOiBAc2V0dGluZ3Mub2JqZWN0RGVjb2RlciwgaTogMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7b2JqZWN0RGVjb2RlciwgZXhjZXB0aW9uT25JbnZhbGlkVHlwZX0gPSBjb250ZXh0XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgb2JqZWN0RGVjb2RlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBJZiBvYmplY3REZWNvZGVyIGZ1bmN0aW9uIGlzIGdpdmVuLCB3ZSBjYW4gZG8gY3VzdG9tIGRlY29kaW5nIG9mIGN1c3RvbSB0eXBlc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJpbW1lZFNjYWxhciA9IFV0aWxzLnJ0cmltIHNjYWxhclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3RTcGFjZSA9IHRyaW1tZWRTY2FsYXIuaW5kZXhPZignICcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiBmaXJzdFNwYWNlIGlzIC0xXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9iamVjdERlY29kZXIgdHJpbW1lZFNjYWxhciwgbnVsbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YlZhbHVlID0gVXRpbHMubHRyaW0gdHJpbW1lZFNjYWxhcltmaXJzdFNwYWNlKzEuLl1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bmxlc3Mgc3ViVmFsdWUubGVuZ3RoID4gMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJWYWx1ZSA9IG51bGxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2JqZWN0RGVjb2RlciB0cmltbWVkU2NhbGFyWzAuLi5maXJzdFNwYWNlXSwgc3ViVmFsdWVcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiBleGNlcHRpb25PbkludmFsaWRUeXBlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUGFyc2VFeGNlcHRpb24gJ0N1c3RvbSBvYmplY3Qgc3VwcG9ydCB3aGVuIHBhcnNpbmcgYSBZQU1MIGZpbGUgaGFzIGJlZW4gZGlzYWJsZWQuJ1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgICAgICAgICAgICAgIHdoZW4gJzAnXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAnMHgnIGlzIHNjYWxhclswLi4uMl1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gVXRpbHMuaGV4RGVjIHNjYWxhclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiBVdGlscy5pc0RpZ2l0cyBzY2FsYXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gVXRpbHMub2N0RGVjIHNjYWxhclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiBVdGlscy5pc051bWVyaWMgc2NhbGFyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQgc2NhbGFyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNjYWxhclxuICAgICAgICAgICAgICAgICAgICB3aGVuICcrJ1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgVXRpbHMuaXNEaWdpdHMgc2NhbGFyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmF3ID0gc2NhbGFyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzdCA9IHBhcnNlSW50KHJhdylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiByYXcgaXMgU3RyaW5nKGNhc3QpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjYXN0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmF3XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIFV0aWxzLmlzTnVtZXJpYyBzY2FsYXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VGbG9hdCBzY2FsYXJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgQFBBVFRFUk5fVEhPVVNBTkRfTlVNRVJJQ19TQ0FMQVIudGVzdCBzY2FsYXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VGbG9hdChzY2FsYXIucmVwbGFjZSgnLCcsICcnKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzY2FsYXJcbiAgICAgICAgICAgICAgICAgICAgd2hlbiAnLSdcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIFV0aWxzLmlzRGlnaXRzKHNjYWxhclsxLi5dKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICcwJyBpcyBzY2FsYXIuY2hhckF0KDEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAtVXRpbHMub2N0RGVjKHNjYWxhclsxLi5dKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmF3ID0gc2NhbGFyWzEuLl1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzdCA9IHBhcnNlSW50KHJhdylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgcmF3IGlzIFN0cmluZyhjYXN0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC1jYXN0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAtcmF3XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIFV0aWxzLmlzTnVtZXJpYyBzY2FsYXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VGbG9hdCBzY2FsYXJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgQFBBVFRFUk5fVEhPVVNBTkRfTlVNRVJJQ19TQ0FMQVIudGVzdCBzY2FsYXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VGbG9hdChzY2FsYXIucmVwbGFjZSgnLCcsICcnKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzY2FsYXJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgZGF0ZSA9IFV0aWxzLnN0cmluZ1RvRGF0ZShzY2FsYXIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGVcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgVXRpbHMuaXNOdW1lcmljKHNjYWxhcilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VGbG9hdCBzY2FsYXJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgQFBBVFRFUk5fVEhPVVNBTkRfTlVNRVJJQ19TQ0FMQVIudGVzdCBzY2FsYXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VGbG9hdChzY2FsYXIucmVwbGFjZSgnLCcsICcnKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzY2FsYXJcblxubW9kdWxlLmV4cG9ydHMgPSBJbmxpbmVcbiIsIlxuSW5saW5lICAgICAgICAgID0gcmVxdWlyZSAnLi9JbmxpbmUnXG5QYXR0ZXJuICAgICAgICAgPSByZXF1aXJlICcuL1BhdHRlcm4nXG5VdGlscyAgICAgICAgICAgPSByZXF1aXJlICcuL1V0aWxzJ1xuUGFyc2VFeGNlcHRpb24gID0gcmVxdWlyZSAnLi9FeGNlcHRpb24vUGFyc2VFeGNlcHRpb24nXG5cbiMgUGFyc2VyIHBhcnNlcyBZQU1MIHN0cmluZ3MgdG8gY29udmVydCB0aGVtIHRvIEphdmFTY3JpcHQgb2JqZWN0cy5cbiNcbmNsYXNzIFBhcnNlclxuXG4gICAgIyBQcmUtY29tcGlsZWQgcGF0dGVybnNcbiAgICAjXG4gICAgUEFUVEVSTl9GT0xERURfU0NBTEFSX0FMTDogICAgICAgICAgICAgIG5ldyBQYXR0ZXJuICdeKD86KD88dHlwZT4hW15cXFxcfD5dKilcXFxccyspPyg/PHNlcGFyYXRvcj5cXFxcfHw+KSg/PG1vZGlmaWVycz5cXFxcK3xcXFxcLXxcXFxcZCt8XFxcXCtcXFxcZCt8XFxcXC1cXFxcZCt8XFxcXGQrXFxcXCt8XFxcXGQrXFxcXC0pPyg/PGNvbW1lbnRzPiArIy4qKT8kJ1xuICAgIFBBVFRFUk5fRk9MREVEX1NDQUxBUl9FTkQ6ICAgICAgICAgICAgICBuZXcgUGF0dGVybiAnKD88c2VwYXJhdG9yPlxcXFx8fD4pKD88bW9kaWZpZXJzPlxcXFwrfFxcXFwtfFxcXFxkK3xcXFxcK1xcXFxkK3xcXFxcLVxcXFxkK3xcXFxcZCtcXFxcK3xcXFxcZCtcXFxcLSk/KD88Y29tbWVudHM+ICsjLiopPyQnXG4gICAgUEFUVEVSTl9TRVFVRU5DRV9JVEVNOiAgICAgICAgICAgICAgICAgIG5ldyBQYXR0ZXJuICdeXFxcXC0oKD88bGVhZHNwYWNlcz5cXFxccyspKD88dmFsdWU+Lis/KSk/XFxcXHMqJCdcbiAgICBQQVRURVJOX0FOQ0hPUl9WQUxVRTogICAgICAgICAgICAgICAgICAgbmV3IFBhdHRlcm4gJ14mKD88cmVmPlteIF0rKSAqKD88dmFsdWU+LiopJ1xuICAgIFBBVFRFUk5fQ09NUEFDVF9OT1RBVElPTjogICAgICAgICAgICAgICBuZXcgUGF0dGVybiAnXig/PGtleT4nK0lubGluZS5SRUdFWF9RVU9URURfU1RSSU5HKyd8W14gXFwnXCJcXFxce1xcXFxbXS4qPykgKlxcXFw6KFxcXFxzKyg/PHZhbHVlPi4rPykpP1xcXFxzKiQnXG4gICAgUEFUVEVSTl9NQVBQSU5HX0lURU06ICAgICAgICAgICAgICAgICAgIG5ldyBQYXR0ZXJuICdeKD88a2V5PicrSW5saW5lLlJFR0VYX1FVT1RFRF9TVFJJTkcrJ3xbXiBcXCdcIlxcXFxbXFxcXHtdLio/KSAqXFxcXDooXFxcXHMrKD88dmFsdWU+Lis/KSk/XFxcXHMqJCdcbiAgICBQQVRURVJOX0RFQ0lNQUw6ICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFBhdHRlcm4gJ1xcXFxkKydcbiAgICBQQVRURVJOX0lOREVOVF9TUEFDRVM6ICAgICAgICAgICAgICAgICAgbmV3IFBhdHRlcm4gJ14gKydcbiAgICBQQVRURVJOX1RSQUlMSU5HX0xJTkVTOiAgICAgICAgICAgICAgICAgbmV3IFBhdHRlcm4gJyhcXG4qKSQnXG4gICAgUEFUVEVSTl9ZQU1MX0hFQURFUjogICAgICAgICAgICAgICAgICAgIG5ldyBQYXR0ZXJuICdeXFxcXCVZQU1MWzogXVtcXFxcZFxcXFwuXSsuKlxcbidcbiAgICBQQVRURVJOX0xFQURJTkdfQ09NTUVOVFM6ICAgICAgICAgICAgICAgbmV3IFBhdHRlcm4gJ14oXFxcXCMuKj9cXG4pKydcbiAgICBQQVRURVJOX0RPQ1VNRU5UX01BUktFUl9TVEFSVDogICAgICAgICAgbmV3IFBhdHRlcm4gJ15cXFxcLVxcXFwtXFxcXC0uKj9cXG4nXG4gICAgUEFUVEVSTl9ET0NVTUVOVF9NQVJLRVJfRU5EOiAgICAgICAgICAgIG5ldyBQYXR0ZXJuICdeXFxcXC5cXFxcLlxcXFwuXFxcXHMqJCdcbiAgICBQQVRURVJOX0ZPTERFRF9TQ0FMQVJfQllfSU5ERU5UQVRJT046ICAge31cblxuICAgICMgQ29udGV4dCB0eXBlc1xuICAgICNcbiAgICBDT05URVhUX05PTkU6ICAgICAgIDBcbiAgICBDT05URVhUX1NFUVVFTkNFOiAgIDFcbiAgICBDT05URVhUX01BUFBJTkc6ICAgIDJcblxuXG4gICAgIyBDb25zdHJ1Y3RvclxuICAgICNcbiAgICAjIEBwYXJhbSBbSW50ZWdlcl0gIG9mZnNldCAgVGhlIG9mZnNldCBvZiBZQU1MIGRvY3VtZW50ICh1c2VkIGZvciBsaW5lIG51bWJlcnMgaW4gZXJyb3IgbWVzc2FnZXMpXG4gICAgI1xuICAgIGNvbnN0cnVjdG9yOiAoQG9mZnNldCA9IDApIC0+XG4gICAgICAgIEBsaW5lcyAgICAgICAgICA9IFtdXG4gICAgICAgIEBjdXJyZW50TGluZU5iICA9IC0xXG4gICAgICAgIEBjdXJyZW50TGluZSAgICA9ICcnXG4gICAgICAgIEByZWZzICAgICAgICAgICA9IHt9XG5cblxuICAgICMgUGFyc2VzIGEgWUFNTCBzdHJpbmcgdG8gYSBKYXZhU2NyaXB0IHZhbHVlLlxuICAgICNcbiAgICAjIEBwYXJhbSBbU3RyaW5nXSAgIHZhbHVlICAgICAgICAgICAgICAgICAgIEEgWUFNTCBzdHJpbmdcbiAgICAjIEBwYXJhbSBbQm9vbGVhbl0gIGV4Y2VwdGlvbk9uSW52YWxpZFR5cGUgIHRydWUgaWYgYW4gZXhjZXB0aW9uIG11c3QgYmUgdGhyb3duIG9uIGludmFsaWQgdHlwZXMgKGEgSmF2YVNjcmlwdCByZXNvdXJjZSBvciBvYmplY3QpLCBmYWxzZSBvdGhlcndpc2VcbiAgICAjIEBwYXJhbSBbRnVuY3Rpb25dIG9iamVjdERlY29kZXIgICAgICAgICAgIEEgZnVuY3Rpb24gdG8gZGVzZXJpYWxpemUgY3VzdG9tIG9iamVjdHMsIG51bGwgb3RoZXJ3aXNlXG4gICAgI1xuICAgICMgQHJldHVybiBbT2JqZWN0XSAgQSBKYXZhU2NyaXB0IHZhbHVlXG4gICAgI1xuICAgICMgQHRocm93IFtQYXJzZUV4Y2VwdGlvbl0gSWYgdGhlIFlBTUwgaXMgbm90IHZhbGlkXG4gICAgI1xuICAgIHBhcnNlOiAodmFsdWUsIGV4Y2VwdGlvbk9uSW52YWxpZFR5cGUgPSBmYWxzZSwgb2JqZWN0RGVjb2RlciA9IG51bGwpIC0+XG4gICAgICAgIEBjdXJyZW50TGluZU5iID0gLTFcbiAgICAgICAgQGN1cnJlbnRMaW5lID0gJydcbiAgICAgICAgQGxpbmVzID0gQGNsZWFudXAodmFsdWUpLnNwbGl0IFwiXFxuXCJcblxuICAgICAgICBkYXRhID0gbnVsbFxuICAgICAgICBjb250ZXh0ID0gQENPTlRFWFRfTk9ORVxuICAgICAgICBhbGxvd092ZXJ3cml0ZSA9IGZhbHNlXG4gICAgICAgIHdoaWxlIEBtb3ZlVG9OZXh0TGluZSgpXG4gICAgICAgICAgICBpZiBAaXNDdXJyZW50TGluZUVtcHR5KClcbiAgICAgICAgICAgICAgICBjb250aW51ZVxuXG4gICAgICAgICAgICAjIFRhYj9cbiAgICAgICAgICAgIGlmIFwiXFx0XCIgaXMgQGN1cnJlbnRMaW5lWzBdXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFBhcnNlRXhjZXB0aW9uICdBIFlBTUwgZmlsZSBjYW5ub3QgY29udGFpbiB0YWJzIGFzIGluZGVudGF0aW9uLicsIEBnZXRSZWFsQ3VycmVudExpbmVOYigpICsgMSwgQGN1cnJlbnRMaW5lXG5cbiAgICAgICAgICAgIGlzUmVmID0gbWVyZ2VOb2RlID0gZmFsc2VcbiAgICAgICAgICAgIGlmIHZhbHVlcyA9IEBQQVRURVJOX1NFUVVFTkNFX0lURU0uZXhlYyBAY3VycmVudExpbmVcbiAgICAgICAgICAgICAgICBpZiBAQ09OVEVYVF9NQVBQSU5HIGlzIGNvbnRleHRcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFBhcnNlRXhjZXB0aW9uICdZb3UgY2Fubm90IGRlZmluZSBhIHNlcXVlbmNlIGl0ZW0gd2hlbiBpbiBhIG1hcHBpbmcnXG4gICAgICAgICAgICAgICAgY29udGV4dCA9IEBDT05URVhUX1NFUVVFTkNFXG4gICAgICAgICAgICAgICAgZGF0YSA/PSBbXVxuXG4gICAgICAgICAgICAgICAgaWYgdmFsdWVzLnZhbHVlPyBhbmQgbWF0Y2hlcyA9IEBQQVRURVJOX0FOQ0hPUl9WQUxVRS5leGVjIHZhbHVlcy52YWx1ZVxuICAgICAgICAgICAgICAgICAgICBpc1JlZiA9IG1hdGNoZXMucmVmXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlcy52YWx1ZSA9IG1hdGNoZXMudmFsdWVcblxuICAgICAgICAgICAgICAgICMgQXJyYXlcbiAgICAgICAgICAgICAgICBpZiBub3QodmFsdWVzLnZhbHVlPykgb3IgJycgaXMgVXRpbHMudHJpbSh2YWx1ZXMudmFsdWUsICcgJykgb3IgVXRpbHMubHRyaW0odmFsdWVzLnZhbHVlLCAnICcpLmluZGV4T2YoJyMnKSBpcyAwXG4gICAgICAgICAgICAgICAgICAgIGlmIEBjdXJyZW50TGluZU5iIDwgQGxpbmVzLmxlbmd0aCAtIDEgYW5kIG5vdCBAaXNOZXh0TGluZVVuSW5kZW50ZWRDb2xsZWN0aW9uKClcbiAgICAgICAgICAgICAgICAgICAgICAgIGMgPSBAZ2V0UmVhbEN1cnJlbnRMaW5lTmIoKSArIDFcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlciA9IG5ldyBQYXJzZXIgY1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VyLnJlZnMgPSBAcmVmc1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5wdXNoIHBhcnNlci5wYXJzZShAZ2V0TmV4dEVtYmVkQmxvY2sobnVsbCwgdHJ1ZSksIGV4Y2VwdGlvbk9uSW52YWxpZFR5cGUsIG9iamVjdERlY29kZXIpXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEucHVzaCBudWxsXG5cbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIGlmIHZhbHVlcy5sZWFkc3BhY2VzPy5sZW5ndGggYW5kIG1hdGNoZXMgPSBAUEFUVEVSTl9DT01QQUNUX05PVEFUSU9OLmV4ZWMgdmFsdWVzLnZhbHVlXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICMgVGhpcyBpcyBhIGNvbXBhY3Qgbm90YXRpb24gZWxlbWVudCwgYWRkIHRvIG5leHQgYmxvY2sgYW5kIHBhcnNlXG4gICAgICAgICAgICAgICAgICAgICAgICBjID0gQGdldFJlYWxDdXJyZW50TGluZU5iKClcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlciA9IG5ldyBQYXJzZXIgY1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VyLnJlZnMgPSBAcmVmc1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBibG9jayA9IHZhbHVlcy52YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZW50ID0gQGdldEN1cnJlbnRMaW5lSW5kZW50YXRpb24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgQGlzTmV4dExpbmVJbmRlbnRlZChmYWxzZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBibG9jayArPSBcIlxcblwiK0BnZXROZXh0RW1iZWRCbG9jayhpbmRlbnQgKyB2YWx1ZXMubGVhZHNwYWNlcy5sZW5ndGggKyAxLCB0cnVlKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLnB1c2ggcGFyc2VyLnBhcnNlIGJsb2NrLCBleGNlcHRpb25PbkludmFsaWRUeXBlLCBvYmplY3REZWNvZGVyXG5cbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5wdXNoIEBwYXJzZVZhbHVlIHZhbHVlcy52YWx1ZSwgZXhjZXB0aW9uT25JbnZhbGlkVHlwZSwgb2JqZWN0RGVjb2RlclxuXG4gICAgICAgICAgICBlbHNlIGlmICh2YWx1ZXMgPSBAUEFUVEVSTl9NQVBQSU5HX0lURU0uZXhlYyBAY3VycmVudExpbmUpIGFuZCB2YWx1ZXMua2V5LmluZGV4T2YoJyAjJykgaXMgLTFcbiAgICAgICAgICAgICAgICBpZiBAQ09OVEVYVF9TRVFVRU5DRSBpcyBjb250ZXh0XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBQYXJzZUV4Y2VwdGlvbiAnWW91IGNhbm5vdCBkZWZpbmUgYSBtYXBwaW5nIGl0ZW0gd2hlbiBpbiBhIHNlcXVlbmNlJ1xuICAgICAgICAgICAgICAgIGNvbnRleHQgPSBAQ09OVEVYVF9NQVBQSU5HXG4gICAgICAgICAgICAgICAgZGF0YSA/PSB7fVxuXG4gICAgICAgICAgICAgICAgIyBGb3JjZSBjb3JyZWN0IHNldHRpbmdzXG4gICAgICAgICAgICAgICAgSW5saW5lLmNvbmZpZ3VyZSBleGNlcHRpb25PbkludmFsaWRUeXBlLCBvYmplY3REZWNvZGVyXG4gICAgICAgICAgICAgICAgdHJ5XG4gICAgICAgICAgICAgICAgICAgIGtleSA9IElubGluZS5wYXJzZVNjYWxhciB2YWx1ZXMua2V5XG4gICAgICAgICAgICAgICAgY2F0Y2ggZVxuICAgICAgICAgICAgICAgICAgICBlLnBhcnNlZExpbmUgPSBAZ2V0UmVhbEN1cnJlbnRMaW5lTmIoKSArIDFcbiAgICAgICAgICAgICAgICAgICAgZS5zbmlwcGV0ID0gQGN1cnJlbnRMaW5lXG5cbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZVxuXG4gICAgICAgICAgICAgICAgaWYgJzw8JyBpcyBrZXlcbiAgICAgICAgICAgICAgICAgICAgbWVyZ2VOb2RlID0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICBhbGxvd092ZXJ3cml0ZSA9IHRydWVcbiAgICAgICAgICAgICAgICAgICAgaWYgdmFsdWVzLnZhbHVlPy5pbmRleE9mKCcqJykgaXMgMFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmTmFtZSA9IHZhbHVlcy52YWx1ZVsxLi5dXG4gICAgICAgICAgICAgICAgICAgICAgICB1bmxlc3MgQHJlZnNbcmVmTmFtZV0/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFBhcnNlRXhjZXB0aW9uICdSZWZlcmVuY2UgXCInK3JlZk5hbWUrJ1wiIGRvZXMgbm90IGV4aXN0LicsIEBnZXRSZWFsQ3VycmVudExpbmVOYigpICsgMSwgQGN1cnJlbnRMaW5lXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZlZhbHVlID0gQHJlZnNbcmVmTmFtZV1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgdHlwZW9mIHJlZlZhbHVlIGlzbnQgJ29iamVjdCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUGFyc2VFeGNlcHRpb24gJ1lBTUwgbWVyZ2Uga2V5cyB1c2VkIHdpdGggYSBzY2FsYXIgdmFsdWUgaW5zdGVhZCBvZiBhbiBvYmplY3QuJywgQGdldFJlYWxDdXJyZW50TGluZU5iKCkgKyAxLCBAY3VycmVudExpbmVcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgcmVmVmFsdWUgaW5zdGFuY2VvZiBBcnJheVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICMgTWVyZ2UgYXJyYXkgd2l0aCBvYmplY3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgdmFsdWUsIGkgaW4gcmVmVmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVtTdHJpbmcoaSldID89IHZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBNZXJnZSBvYmplY3RzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIGtleSwgdmFsdWUgb2YgcmVmVmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVtrZXldID89IHZhbHVlXG5cbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgdmFsdWVzLnZhbHVlPyBhbmQgdmFsdWVzLnZhbHVlIGlzbnQgJydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlcy52YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gQGdldE5leHRFbWJlZEJsb2NrKClcblxuICAgICAgICAgICAgICAgICAgICAgICAgYyA9IEBnZXRSZWFsQ3VycmVudExpbmVOYigpICsgMVxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VyID0gbmV3IFBhcnNlciBjXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJzZXIucmVmcyA9IEByZWZzXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJzZWQgPSBwYXJzZXIucGFyc2UgdmFsdWUsIGV4Y2VwdGlvbk9uSW52YWxpZFR5cGVcblxuICAgICAgICAgICAgICAgICAgICAgICAgdW5sZXNzIHR5cGVvZiBwYXJzZWQgaXMgJ29iamVjdCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUGFyc2VFeGNlcHRpb24gJ1lBTUwgbWVyZ2Uga2V5cyB1c2VkIHdpdGggYSBzY2FsYXIgdmFsdWUgaW5zdGVhZCBvZiBhbiBvYmplY3QuJywgQGdldFJlYWxDdXJyZW50TGluZU5iKCkgKyAxLCBAY3VycmVudExpbmVcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgcGFyc2VkIGluc3RhbmNlb2YgQXJyYXlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAjIElmIHRoZSB2YWx1ZSBhc3NvY2lhdGVkIHdpdGggdGhlIG1lcmdlIGtleSBpcyBhIHNlcXVlbmNlLCB0aGVuIHRoaXMgc2VxdWVuY2UgaXMgZXhwZWN0ZWQgdG8gY29udGFpbiBtYXBwaW5nIG5vZGVzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBhbmQgZWFjaCBvZiB0aGVzZSBub2RlcyBpcyBtZXJnZWQgaW4gdHVybiBhY2NvcmRpbmcgdG8gaXRzIG9yZGVyIGluIHRoZSBzZXF1ZW5jZS4gS2V5cyBpbiBtYXBwaW5nIG5vZGVzIGVhcmxpZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAjIGluIHRoZSBzZXF1ZW5jZSBvdmVycmlkZSBrZXlzIHNwZWNpZmllZCBpbiBsYXRlciBtYXBwaW5nIG5vZGVzLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciBwYXJzZWRJdGVtIGluIHBhcnNlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bmxlc3MgdHlwZW9mIHBhcnNlZEl0ZW0gaXMgJ29iamVjdCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBQYXJzZUV4Y2VwdGlvbiAnTWVyZ2UgaXRlbXMgbXVzdCBiZSBvYmplY3RzLicsIEBnZXRSZWFsQ3VycmVudExpbmVOYigpICsgMSwgcGFyc2VkSXRlbVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIHBhcnNlZEl0ZW0gaW5zdGFuY2VvZiBBcnJheVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBNZXJnZSBhcnJheSB3aXRoIG9iamVjdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIHZhbHVlLCBpIGluIHBhcnNlZEl0ZW1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrID0gU3RyaW5nKGkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5sZXNzIGRhdGEuaGFzT3duUHJvcGVydHkoaylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVtrXSA9IHZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICMgTWVyZ2Ugb2JqZWN0c1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIGtleSwgdmFsdWUgb2YgcGFyc2VkSXRlbVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVubGVzcyBkYXRhLmhhc093blByb3BlcnR5KGtleSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVtrZXldID0gdmFsdWVcblxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICMgSWYgdGhlIHZhbHVlIGFzc29jaWF0ZWQgd2l0aCB0aGUga2V5IGlzIGEgc2luZ2xlIG1hcHBpbmcgbm9kZSwgZWFjaCBvZiBpdHMga2V5L3ZhbHVlIHBhaXJzIGlzIGluc2VydGVkIGludG8gdGhlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIyBjdXJyZW50IG1hcHBpbmcsIHVubGVzcyB0aGUga2V5IGFscmVhZHkgZXhpc3RzIGluIGl0LlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciBrZXksIHZhbHVlIG9mIHBhcnNlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bmxlc3MgZGF0YS5oYXNPd25Qcm9wZXJ0eShrZXkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhW2tleV0gPSB2YWx1ZVxuXG4gICAgICAgICAgICAgICAgZWxzZSBpZiB2YWx1ZXMudmFsdWU/IGFuZCBtYXRjaGVzID0gQFBBVFRFUk5fQU5DSE9SX1ZBTFVFLmV4ZWMgdmFsdWVzLnZhbHVlXG4gICAgICAgICAgICAgICAgICAgIGlzUmVmID0gbWF0Y2hlcy5yZWZcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzLnZhbHVlID0gbWF0Y2hlcy52YWx1ZVxuXG5cbiAgICAgICAgICAgICAgICBpZiBtZXJnZU5vZGVcbiAgICAgICAgICAgICAgICAgICAgIyBNZXJnZSBrZXlzXG4gICAgICAgICAgICAgICAgZWxzZSBpZiBub3QodmFsdWVzLnZhbHVlPykgb3IgJycgaXMgVXRpbHMudHJpbSh2YWx1ZXMudmFsdWUsICcgJykgb3IgVXRpbHMubHRyaW0odmFsdWVzLnZhbHVlLCAnICcpLmluZGV4T2YoJyMnKSBpcyAwXG4gICAgICAgICAgICAgICAgICAgICMgSGFzaFxuICAgICAgICAgICAgICAgICAgICAjIGlmIG5leHQgbGluZSBpcyBsZXNzIGluZGVudGVkIG9yIGVxdWFsLCB0aGVuIGl0IG1lYW5zIHRoYXQgdGhlIGN1cnJlbnQgdmFsdWUgaXMgbnVsbFxuICAgICAgICAgICAgICAgICAgICBpZiBub3QoQGlzTmV4dExpbmVJbmRlbnRlZCgpKSBhbmQgbm90KEBpc05leHRMaW5lVW5JbmRlbnRlZENvbGxlY3Rpb24oKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICMgU3BlYzogS2V5cyBNVVNUIGJlIHVuaXF1ZTsgZmlyc3Qgb25lIHdpbnMuXG4gICAgICAgICAgICAgICAgICAgICAgICAjIEJ1dCBvdmVyd3JpdGluZyBpcyBhbGxvd2VkIHdoZW4gYSBtZXJnZSBub2RlIGlzIHVzZWQgaW4gY3VycmVudCBibG9jay5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIGFsbG93T3ZlcndyaXRlIG9yIGRhdGFba2V5XSBpcyB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhW2tleV0gPSBudWxsXG5cbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgYyA9IEBnZXRSZWFsQ3VycmVudExpbmVOYigpICsgMVxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VyID0gbmV3IFBhcnNlciBjXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJzZXIucmVmcyA9IEByZWZzXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWwgPSBwYXJzZXIucGFyc2UgQGdldE5leHRFbWJlZEJsb2NrKCksIGV4Y2VwdGlvbk9uSW52YWxpZFR5cGUsIG9iamVjdERlY29kZXJcblxuICAgICAgICAgICAgICAgICAgICAgICAgIyBTcGVjOiBLZXlzIE1VU1QgYmUgdW5pcXVlOyBmaXJzdCBvbmUgd2lucy5cbiAgICAgICAgICAgICAgICAgICAgICAgICMgQnV0IG92ZXJ3cml0aW5nIGlzIGFsbG93ZWQgd2hlbiBhIG1lcmdlIG5vZGUgaXMgdXNlZCBpbiBjdXJyZW50IGJsb2NrLlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgYWxsb3dPdmVyd3JpdGUgb3IgZGF0YVtrZXldIGlzIHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFba2V5XSA9IHZhbFxuXG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICB2YWwgPSBAcGFyc2VWYWx1ZSB2YWx1ZXMudmFsdWUsIGV4Y2VwdGlvbk9uSW52YWxpZFR5cGUsIG9iamVjdERlY29kZXJcblxuICAgICAgICAgICAgICAgICAgICAjIFNwZWM6IEtleXMgTVVTVCBiZSB1bmlxdWU7IGZpcnN0IG9uZSB3aW5zLlxuICAgICAgICAgICAgICAgICAgICAjIEJ1dCBvdmVyd3JpdGluZyBpcyBhbGxvd2VkIHdoZW4gYSBtZXJnZSBub2RlIGlzIHVzZWQgaW4gY3VycmVudCBibG9jay5cbiAgICAgICAgICAgICAgICAgICAgaWYgYWxsb3dPdmVyd3JpdGUgb3IgZGF0YVtrZXldIGlzIHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVtrZXldID0gdmFsXG5cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAjIDEtbGluZXIgb3B0aW9uYWxseSBmb2xsb3dlZCBieSBuZXdsaW5lXG4gICAgICAgICAgICAgICAgbGluZUNvdW50ID0gQGxpbmVzLmxlbmd0aFxuICAgICAgICAgICAgICAgIGlmIDEgaXMgbGluZUNvdW50IG9yICgyIGlzIGxpbmVDb3VudCBhbmQgVXRpbHMuaXNFbXB0eShAbGluZXNbMV0pKVxuICAgICAgICAgICAgICAgICAgICB0cnlcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gSW5saW5lLnBhcnNlIEBsaW5lc1swXSwgZXhjZXB0aW9uT25JbnZhbGlkVHlwZSwgb2JqZWN0RGVjb2RlclxuICAgICAgICAgICAgICAgICAgICBjYXRjaCBlXG4gICAgICAgICAgICAgICAgICAgICAgICBlLnBhcnNlZExpbmUgPSBAZ2V0UmVhbEN1cnJlbnRMaW5lTmIoKSArIDFcbiAgICAgICAgICAgICAgICAgICAgICAgIGUuc25pcHBldCA9IEBjdXJyZW50TGluZVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBlXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgdHlwZW9mIHZhbHVlIGlzICdvYmplY3QnXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiB2YWx1ZSBpbnN0YW5jZW9mIEFycmF5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3QgPSB2YWx1ZVswXVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciBrZXkgb2YgdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3QgPSB2YWx1ZVtrZXldXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIHR5cGVvZiBmaXJzdCBpcyAnc3RyaW5nJyBhbmQgZmlyc3QuaW5kZXhPZignKicpIGlzIDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhID0gW11cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgYWxpYXMgaW4gdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5wdXNoIEByZWZzW2FsaWFzWzEuLl1dXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBkYXRhXG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlXG5cbiAgICAgICAgICAgICAgICBlbHNlIGlmIFV0aWxzLmx0cmltKHZhbHVlKS5jaGFyQXQoMCkgaW4gWydbJywgJ3snXVxuICAgICAgICAgICAgICAgICAgICB0cnlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBJbmxpbmUucGFyc2UgdmFsdWUsIGV4Y2VwdGlvbk9uSW52YWxpZFR5cGUsIG9iamVjdERlY29kZXJcbiAgICAgICAgICAgICAgICAgICAgY2F0Y2ggZVxuICAgICAgICAgICAgICAgICAgICAgICAgZS5wYXJzZWRMaW5lID0gQGdldFJlYWxDdXJyZW50TGluZU5iKCkgKyAxXG4gICAgICAgICAgICAgICAgICAgICAgICBlLnNuaXBwZXQgPSBAY3VycmVudExpbmVcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgZVxuXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFBhcnNlRXhjZXB0aW9uICdVbmFibGUgdG8gcGFyc2UuJywgQGdldFJlYWxDdXJyZW50TGluZU5iKCkgKyAxLCBAY3VycmVudExpbmVcblxuICAgICAgICAgICAgaWYgaXNSZWZcbiAgICAgICAgICAgICAgICBpZiBkYXRhIGluc3RhbmNlb2YgQXJyYXlcbiAgICAgICAgICAgICAgICAgICAgQHJlZnNbaXNSZWZdID0gZGF0YVtkYXRhLmxlbmd0aC0xXVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgbGFzdEtleSA9IG51bGxcbiAgICAgICAgICAgICAgICAgICAgZm9yIGtleSBvZiBkYXRhXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0S2V5ID0ga2V5XG4gICAgICAgICAgICAgICAgICAgIEByZWZzW2lzUmVmXSA9IGRhdGFbbGFzdEtleV1cblxuXG4gICAgICAgIGlmIFV0aWxzLmlzRW1wdHkoZGF0YSlcbiAgICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiBkYXRhXG5cblxuXG4gICAgIyBSZXR1cm5zIHRoZSBjdXJyZW50IGxpbmUgbnVtYmVyICh0YWtlcyB0aGUgb2Zmc2V0IGludG8gYWNjb3VudCkuXG4gICAgI1xuICAgICMgQHJldHVybiBbSW50ZWdlcl0gICAgIFRoZSBjdXJyZW50IGxpbmUgbnVtYmVyXG4gICAgI1xuICAgIGdldFJlYWxDdXJyZW50TGluZU5iOiAtPlxuICAgICAgICByZXR1cm4gQGN1cnJlbnRMaW5lTmIgKyBAb2Zmc2V0XG5cblxuICAgICMgUmV0dXJucyB0aGUgY3VycmVudCBsaW5lIGluZGVudGF0aW9uLlxuICAgICNcbiAgICAjIEByZXR1cm4gW0ludGVnZXJdICAgICBUaGUgY3VycmVudCBsaW5lIGluZGVudGF0aW9uXG4gICAgI1xuICAgIGdldEN1cnJlbnRMaW5lSW5kZW50YXRpb246IC0+XG4gICAgICAgIHJldHVybiBAY3VycmVudExpbmUubGVuZ3RoIC0gVXRpbHMubHRyaW0oQGN1cnJlbnRMaW5lLCAnICcpLmxlbmd0aFxuXG5cbiAgICAjIFJldHVybnMgdGhlIG5leHQgZW1iZWQgYmxvY2sgb2YgWUFNTC5cbiAgICAjXG4gICAgIyBAcGFyYW0gW0ludGVnZXJdICAgICAgICAgIGluZGVudGF0aW9uIFRoZSBpbmRlbnQgbGV2ZWwgYXQgd2hpY2ggdGhlIGJsb2NrIGlzIHRvIGJlIHJlYWQsIG9yIG51bGwgZm9yIGRlZmF1bHRcbiAgICAjXG4gICAgIyBAcmV0dXJuIFtTdHJpbmddICAgICAgICAgIEEgWUFNTCBzdHJpbmdcbiAgICAjXG4gICAgIyBAdGhyb3cgW1BhcnNlRXhjZXB0aW9uXSAgIFdoZW4gaW5kZW50YXRpb24gcHJvYmxlbSBhcmUgZGV0ZWN0ZWRcbiAgICAjXG4gICAgZ2V0TmV4dEVtYmVkQmxvY2s6IChpbmRlbnRhdGlvbiA9IG51bGwsIGluY2x1ZGVVbmluZGVudGVkQ29sbGVjdGlvbiA9IGZhbHNlKSAtPlxuICAgICAgICBAbW92ZVRvTmV4dExpbmUoKVxuXG4gICAgICAgIGlmIG5vdCBpbmRlbnRhdGlvbj9cbiAgICAgICAgICAgIG5ld0luZGVudCA9IEBnZXRDdXJyZW50TGluZUluZGVudGF0aW9uKClcblxuICAgICAgICAgICAgdW5pbmRlbnRlZEVtYmVkQmxvY2sgPSBAaXNTdHJpbmdVbkluZGVudGVkQ29sbGVjdGlvbkl0ZW0gQGN1cnJlbnRMaW5lXG5cbiAgICAgICAgICAgIGlmIG5vdChAaXNDdXJyZW50TGluZUVtcHR5KCkpIGFuZCAwIGlzIG5ld0luZGVudCBhbmQgbm90KHVuaW5kZW50ZWRFbWJlZEJsb2NrKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBQYXJzZUV4Y2VwdGlvbiAnSW5kZW50YXRpb24gcHJvYmxlbS4nLCBAZ2V0UmVhbEN1cnJlbnRMaW5lTmIoKSArIDEsIEBjdXJyZW50TGluZVxuXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIG5ld0luZGVudCA9IGluZGVudGF0aW9uXG5cblxuICAgICAgICBkYXRhID0gW0BjdXJyZW50TGluZVtuZXdJbmRlbnQuLl1dXG5cbiAgICAgICAgdW5sZXNzIGluY2x1ZGVVbmluZGVudGVkQ29sbGVjdGlvblxuICAgICAgICAgICAgaXNJdFVuaW5kZW50ZWRDb2xsZWN0aW9uID0gQGlzU3RyaW5nVW5JbmRlbnRlZENvbGxlY3Rpb25JdGVtIEBjdXJyZW50TGluZVxuXG4gICAgICAgICMgQ29tbWVudHMgbXVzdCBub3QgYmUgcmVtb3ZlZCBpbnNpZGUgYSBzdHJpbmcgYmxvY2sgKGllLiBhZnRlciBhIGxpbmUgZW5kaW5nIHdpdGggXCJ8XCIpXG4gICAgICAgICMgVGhleSBtdXN0IG5vdCBiZSByZW1vdmVkIGluc2lkZSBhIHN1Yi1lbWJlZGRlZCBibG9jayBhcyB3ZWxsXG4gICAgICAgIHJlbW92ZUNvbW1lbnRzUGF0dGVybiA9IEBQQVRURVJOX0ZPTERFRF9TQ0FMQVJfRU5EXG4gICAgICAgIHJlbW92ZUNvbW1lbnRzID0gbm90IHJlbW92ZUNvbW1lbnRzUGF0dGVybi50ZXN0IEBjdXJyZW50TGluZVxuXG4gICAgICAgIHdoaWxlIEBtb3ZlVG9OZXh0TGluZSgpXG4gICAgICAgICAgICBpbmRlbnQgPSBAZ2V0Q3VycmVudExpbmVJbmRlbnRhdGlvbigpXG5cbiAgICAgICAgICAgIGlmIGluZGVudCBpcyBuZXdJbmRlbnRcbiAgICAgICAgICAgICAgICByZW1vdmVDb21tZW50cyA9IG5vdCByZW1vdmVDb21tZW50c1BhdHRlcm4udGVzdCBAY3VycmVudExpbmVcblxuICAgICAgICAgICAgaWYgaXNJdFVuaW5kZW50ZWRDb2xsZWN0aW9uIGFuZCBub3QgQGlzU3RyaW5nVW5JbmRlbnRlZENvbGxlY3Rpb25JdGVtKEBjdXJyZW50TGluZSkgYW5kIGluZGVudCBpcyBuZXdJbmRlbnRcbiAgICAgICAgICAgICAgICBAbW92ZVRvUHJldmlvdXNMaW5lKClcbiAgICAgICAgICAgICAgICBicmVha1xuXG4gICAgICAgICAgICBpZiBAaXNDdXJyZW50TGluZUJsYW5rKClcbiAgICAgICAgICAgICAgICBkYXRhLnB1c2ggQGN1cnJlbnRMaW5lW25ld0luZGVudC4uXVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlXG5cbiAgICAgICAgICAgIGlmIHJlbW92ZUNvbW1lbnRzIGFuZCBAaXNDdXJyZW50TGluZUNvbW1lbnQoKVxuICAgICAgICAgICAgICAgIGlmIGluZGVudCBpcyBuZXdJbmRlbnRcbiAgICAgICAgICAgICAgICAgICAgY29udGludWVcblxuICAgICAgICAgICAgaWYgaW5kZW50ID49IG5ld0luZGVudFxuICAgICAgICAgICAgICAgIGRhdGEucHVzaCBAY3VycmVudExpbmVbbmV3SW5kZW50Li5dXG4gICAgICAgICAgICBlbHNlIGlmIFV0aWxzLmx0cmltKEBjdXJyZW50TGluZSkuY2hhckF0KDApIGlzICcjJ1xuICAgICAgICAgICAgICAgICMgRG9uJ3QgYWRkIGxpbmUgd2l0aCBjb21tZW50c1xuICAgICAgICAgICAgZWxzZSBpZiAwIGlzIGluZGVudFxuICAgICAgICAgICAgICAgIEBtb3ZlVG9QcmV2aW91c0xpbmUoKVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFBhcnNlRXhjZXB0aW9uICdJbmRlbnRhdGlvbiBwcm9ibGVtLicsIEBnZXRSZWFsQ3VycmVudExpbmVOYigpICsgMSwgQGN1cnJlbnRMaW5lXG5cblxuICAgICAgICByZXR1cm4gZGF0YS5qb2luIFwiXFxuXCJcblxuXG4gICAgIyBNb3ZlcyB0aGUgcGFyc2VyIHRvIHRoZSBuZXh0IGxpbmUuXG4gICAgI1xuICAgICMgQHJldHVybiBbQm9vbGVhbl1cbiAgICAjXG4gICAgbW92ZVRvTmV4dExpbmU6IC0+XG4gICAgICAgIGlmIEBjdXJyZW50TGluZU5iID49IEBsaW5lcy5sZW5ndGggLSAxXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcblxuICAgICAgICBAY3VycmVudExpbmUgPSBAbGluZXNbKytAY3VycmVudExpbmVOYl07XG5cbiAgICAgICAgcmV0dXJuIHRydWVcblxuXG4gICAgIyBNb3ZlcyB0aGUgcGFyc2VyIHRvIHRoZSBwcmV2aW91cyBsaW5lLlxuICAgICNcbiAgICBtb3ZlVG9QcmV2aW91c0xpbmU6IC0+XG4gICAgICAgIEBjdXJyZW50TGluZSA9IEBsaW5lc1stLUBjdXJyZW50TGluZU5iXVxuICAgICAgICByZXR1cm5cblxuXG4gICAgIyBQYXJzZXMgYSBZQU1MIHZhbHVlLlxuICAgICNcbiAgICAjIEBwYXJhbSBbU3RyaW5nXSAgIHZhbHVlICAgICAgICAgICAgICAgICAgIEEgWUFNTCB2YWx1ZVxuICAgICMgQHBhcmFtIFtCb29sZWFuXSAgZXhjZXB0aW9uT25JbnZhbGlkVHlwZSAgdHJ1ZSBpZiBhbiBleGNlcHRpb24gbXVzdCBiZSB0aHJvd24gb24gaW52YWxpZCB0eXBlcyBmYWxzZSBvdGhlcndpc2VcbiAgICAjIEBwYXJhbSBbRnVuY3Rpb25dIG9iamVjdERlY29kZXIgICAgICAgICAgIEEgZnVuY3Rpb24gdG8gZGVzZXJpYWxpemUgY3VzdG9tIG9iamVjdHMsIG51bGwgb3RoZXJ3aXNlXG4gICAgI1xuICAgICMgQHJldHVybiBbT2JqZWN0XSBBIEphdmFTY3JpcHQgdmFsdWVcbiAgICAjXG4gICAgIyBAdGhyb3cgW1BhcnNlRXhjZXB0aW9uXSBXaGVuIHJlZmVyZW5jZSBkb2VzIG5vdCBleGlzdFxuICAgICNcbiAgICBwYXJzZVZhbHVlOiAodmFsdWUsIGV4Y2VwdGlvbk9uSW52YWxpZFR5cGUsIG9iamVjdERlY29kZXIpIC0+XG4gICAgICAgIGlmIDAgaXMgdmFsdWUuaW5kZXhPZignKicpXG4gICAgICAgICAgICBwb3MgPSB2YWx1ZS5pbmRleE9mICcjJ1xuICAgICAgICAgICAgaWYgcG9zIGlzbnQgLTFcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnN1YnN0cigxLCBwb3MtMilcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlWzEuLl1cblxuICAgICAgICAgICAgaWYgQHJlZnNbdmFsdWVdIGlzIHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBQYXJzZUV4Y2VwdGlvbiAnUmVmZXJlbmNlIFwiJyt2YWx1ZSsnXCIgZG9lcyBub3QgZXhpc3QuJywgQGN1cnJlbnRMaW5lXG5cbiAgICAgICAgICAgIHJldHVybiBAcmVmc1t2YWx1ZV1cblxuXG4gICAgICAgIGlmIG1hdGNoZXMgPSBAUEFUVEVSTl9GT0xERURfU0NBTEFSX0FMTC5leGVjIHZhbHVlXG4gICAgICAgICAgICBtb2RpZmllcnMgPSBtYXRjaGVzLm1vZGlmaWVycyA/ICcnXG5cbiAgICAgICAgICAgIGZvbGRlZEluZGVudCA9IE1hdGguYWJzKHBhcnNlSW50KG1vZGlmaWVycykpXG4gICAgICAgICAgICBpZiBpc05hTihmb2xkZWRJbmRlbnQpIHRoZW4gZm9sZGVkSW5kZW50ID0gMFxuICAgICAgICAgICAgdmFsID0gQHBhcnNlRm9sZGVkU2NhbGFyIG1hdGNoZXMuc2VwYXJhdG9yLCBAUEFUVEVSTl9ERUNJTUFMLnJlcGxhY2UobW9kaWZpZXJzLCAnJyksIGZvbGRlZEluZGVudFxuICAgICAgICAgICAgaWYgbWF0Y2hlcy50eXBlP1xuICAgICAgICAgICAgICAgICMgRm9yY2UgY29ycmVjdCBzZXR0aW5nc1xuICAgICAgICAgICAgICAgIElubGluZS5jb25maWd1cmUgZXhjZXB0aW9uT25JbnZhbGlkVHlwZSwgb2JqZWN0RGVjb2RlclxuICAgICAgICAgICAgICAgIHJldHVybiBJbmxpbmUucGFyc2VTY2FsYXIgbWF0Y2hlcy50eXBlKycgJyt2YWxcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsXG5cbiAgICAgICAgdHJ5XG4gICAgICAgICAgICByZXR1cm4gSW5saW5lLnBhcnNlIHZhbHVlLCBleGNlcHRpb25PbkludmFsaWRUeXBlLCBvYmplY3REZWNvZGVyXG4gICAgICAgIGNhdGNoIGVcbiAgICAgICAgICAgICMgVHJ5IHRvIHBhcnNlIG11bHRpbGluZSBjb21wYWN0IHNlcXVlbmNlIG9yIG1hcHBpbmdcbiAgICAgICAgICAgIGlmIHZhbHVlLmNoYXJBdCgwKSBpbiBbJ1snLCAneyddIGFuZCBlIGluc3RhbmNlb2YgUGFyc2VFeGNlcHRpb24gYW5kIEBpc05leHRMaW5lSW5kZW50ZWQoKVxuICAgICAgICAgICAgICAgIHZhbHVlICs9IFwiXFxuXCIgKyBAZ2V0TmV4dEVtYmVkQmxvY2soKVxuICAgICAgICAgICAgICAgIHRyeVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gSW5saW5lLnBhcnNlIHZhbHVlLCBleGNlcHRpb25PbkludmFsaWRUeXBlLCBvYmplY3REZWNvZGVyXG4gICAgICAgICAgICAgICAgY2F0Y2ggZVxuICAgICAgICAgICAgICAgICAgICBlLnBhcnNlZExpbmUgPSBAZ2V0UmVhbEN1cnJlbnRMaW5lTmIoKSArIDFcbiAgICAgICAgICAgICAgICAgICAgZS5zbmlwcGV0ID0gQGN1cnJlbnRMaW5lXG5cbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZVxuXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgZS5wYXJzZWRMaW5lID0gQGdldFJlYWxDdXJyZW50TGluZU5iKCkgKyAxXG4gICAgICAgICAgICAgICAgZS5zbmlwcGV0ID0gQGN1cnJlbnRMaW5lXG5cbiAgICAgICAgICAgICAgICB0aHJvdyBlXG5cbiAgICAgICAgcmV0dXJuXG5cblxuICAgICMgUGFyc2VzIGEgZm9sZGVkIHNjYWxhci5cbiAgICAjXG4gICAgIyBAcGFyYW0gW1N0cmluZ10gICAgICAgc2VwYXJhdG9yICAgVGhlIHNlcGFyYXRvciB0aGF0IHdhcyB1c2VkIHRvIGJlZ2luIHRoaXMgZm9sZGVkIHNjYWxhciAofCBvciA+KVxuICAgICMgQHBhcmFtIFtTdHJpbmddICAgICAgIGluZGljYXRvciAgIFRoZSBpbmRpY2F0b3IgdGhhdCB3YXMgdXNlZCB0byBiZWdpbiB0aGlzIGZvbGRlZCBzY2FsYXIgKCsgb3IgLSlcbiAgICAjIEBwYXJhbSBbSW50ZWdlcl0gICAgICBpbmRlbnRhdGlvbiBUaGUgaW5kZW50YXRpb24gdGhhdCB3YXMgdXNlZCB0byBiZWdpbiB0aGlzIGZvbGRlZCBzY2FsYXJcbiAgICAjXG4gICAgIyBAcmV0dXJuIFtTdHJpbmddICAgICAgVGhlIHRleHQgdmFsdWVcbiAgICAjXG4gICAgcGFyc2VGb2xkZWRTY2FsYXI6IChzZXBhcmF0b3IsIGluZGljYXRvciA9ICcnLCBpbmRlbnRhdGlvbiA9IDApIC0+XG4gICAgICAgIG5vdEVPRiA9IEBtb3ZlVG9OZXh0TGluZSgpXG4gICAgICAgIGlmIG5vdCBub3RFT0ZcbiAgICAgICAgICAgIHJldHVybiAnJ1xuXG4gICAgICAgIGlzQ3VycmVudExpbmVCbGFuayA9IEBpc0N1cnJlbnRMaW5lQmxhbmsoKVxuICAgICAgICB0ZXh0ID0gJydcblxuICAgICAgICAjIExlYWRpbmcgYmxhbmsgbGluZXMgYXJlIGNvbnN1bWVkIGJlZm9yZSBkZXRlcm1pbmluZyBpbmRlbnRhdGlvblxuICAgICAgICB3aGlsZSBub3RFT0YgYW5kIGlzQ3VycmVudExpbmVCbGFua1xuICAgICAgICAgICAgIyBuZXdsaW5lIG9ubHkgaWYgbm90IEVPRlxuICAgICAgICAgICAgaWYgbm90RU9GID0gQG1vdmVUb05leHRMaW5lKClcbiAgICAgICAgICAgICAgICB0ZXh0ICs9IFwiXFxuXCJcbiAgICAgICAgICAgICAgICBpc0N1cnJlbnRMaW5lQmxhbmsgPSBAaXNDdXJyZW50TGluZUJsYW5rKClcblxuXG4gICAgICAgICMgRGV0ZXJtaW5lIGluZGVudGF0aW9uIGlmIG5vdCBzcGVjaWZpZWRcbiAgICAgICAgaWYgMCBpcyBpbmRlbnRhdGlvblxuICAgICAgICAgICAgaWYgbWF0Y2hlcyA9IEBQQVRURVJOX0lOREVOVF9TUEFDRVMuZXhlYyBAY3VycmVudExpbmVcbiAgICAgICAgICAgICAgICBpbmRlbnRhdGlvbiA9IG1hdGNoZXNbMF0ubGVuZ3RoXG5cblxuICAgICAgICBpZiBpbmRlbnRhdGlvbiA+IDBcbiAgICAgICAgICAgIHBhdHRlcm4gPSBAUEFUVEVSTl9GT0xERURfU0NBTEFSX0JZX0lOREVOVEFUSU9OW2luZGVudGF0aW9uXVxuICAgICAgICAgICAgdW5sZXNzIHBhdHRlcm4/XG4gICAgICAgICAgICAgICAgcGF0dGVybiA9IG5ldyBQYXR0ZXJuICdeIHsnK2luZGVudGF0aW9uKyd9KC4qKSQnXG4gICAgICAgICAgICAgICAgUGFyc2VyOjpQQVRURVJOX0ZPTERFRF9TQ0FMQVJfQllfSU5ERU5UQVRJT05baW5kZW50YXRpb25dID0gcGF0dGVyblxuXG4gICAgICAgICAgICB3aGlsZSBub3RFT0YgYW5kIChpc0N1cnJlbnRMaW5lQmxhbmsgb3IgbWF0Y2hlcyA9IHBhdHRlcm4uZXhlYyBAY3VycmVudExpbmUpXG4gICAgICAgICAgICAgICAgaWYgaXNDdXJyZW50TGluZUJsYW5rXG4gICAgICAgICAgICAgICAgICAgIHRleHQgKz0gQGN1cnJlbnRMaW5lW2luZGVudGF0aW9uLi5dXG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICB0ZXh0ICs9IG1hdGNoZXNbMV1cblxuICAgICAgICAgICAgICAgICMgbmV3bGluZSBvbmx5IGlmIG5vdCBFT0ZcbiAgICAgICAgICAgICAgICBpZiBub3RFT0YgPSBAbW92ZVRvTmV4dExpbmUoKVxuICAgICAgICAgICAgICAgICAgICB0ZXh0ICs9IFwiXFxuXCJcbiAgICAgICAgICAgICAgICAgICAgaXNDdXJyZW50TGluZUJsYW5rID0gQGlzQ3VycmVudExpbmVCbGFuaygpXG5cbiAgICAgICAgZWxzZSBpZiBub3RFT0ZcbiAgICAgICAgICAgIHRleHQgKz0gXCJcXG5cIlxuXG5cbiAgICAgICAgaWYgbm90RU9GXG4gICAgICAgICAgICBAbW92ZVRvUHJldmlvdXNMaW5lKClcblxuXG4gICAgICAgICMgUmVtb3ZlIGxpbmUgYnJlYWtzIG9mIGVhY2ggbGluZXMgZXhjZXB0IHRoZSBlbXB0eSBhbmQgbW9yZSBpbmRlbnRlZCBvbmVzXG4gICAgICAgIGlmICc+JyBpcyBzZXBhcmF0b3JcbiAgICAgICAgICAgIG5ld1RleHQgPSAnJ1xuICAgICAgICAgICAgZm9yIGxpbmUgaW4gdGV4dC5zcGxpdCBcIlxcblwiXG4gICAgICAgICAgICAgICAgaWYgbGluZS5sZW5ndGggaXMgMCBvciBsaW5lLmNoYXJBdCgwKSBpcyAnICdcbiAgICAgICAgICAgICAgICAgICAgbmV3VGV4dCA9IFV0aWxzLnJ0cmltKG5ld1RleHQsICcgJykgKyBsaW5lICsgXCJcXG5cIlxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgbmV3VGV4dCArPSBsaW5lICsgJyAnXG4gICAgICAgICAgICB0ZXh0ID0gbmV3VGV4dFxuXG4gICAgICAgIGlmICcrJyBpc250IGluZGljYXRvclxuICAgICAgICAgICAgIyBSZW1vdmUgYW55IGV4dHJhIHNwYWNlIG9yIG5ldyBsaW5lIGFzIHdlIGFyZSBhZGRpbmcgdGhlbSBhZnRlclxuICAgICAgICAgICAgdGV4dCA9IFV0aWxzLnJ0cmltKHRleHQpXG5cbiAgICAgICAgIyBEZWFsIHdpdGggdHJhaWxpbmcgbmV3bGluZXMgYXMgaW5kaWNhdGVkXG4gICAgICAgIGlmICcnIGlzIGluZGljYXRvclxuICAgICAgICAgICAgdGV4dCA9IEBQQVRURVJOX1RSQUlMSU5HX0xJTkVTLnJlcGxhY2UgdGV4dCwgXCJcXG5cIlxuICAgICAgICBlbHNlIGlmICctJyBpcyBpbmRpY2F0b3JcbiAgICAgICAgICAgIHRleHQgPSBAUEFUVEVSTl9UUkFJTElOR19MSU5FUy5yZXBsYWNlIHRleHQsICcnXG5cbiAgICAgICAgcmV0dXJuIHRleHRcblxuXG4gICAgIyBSZXR1cm5zIHRydWUgaWYgdGhlIG5leHQgbGluZSBpcyBpbmRlbnRlZC5cbiAgICAjXG4gICAgIyBAcmV0dXJuIFtCb29sZWFuXSAgICAgUmV0dXJucyB0cnVlIGlmIHRoZSBuZXh0IGxpbmUgaXMgaW5kZW50ZWQsIGZhbHNlIG90aGVyd2lzZVxuICAgICNcbiAgICBpc05leHRMaW5lSW5kZW50ZWQ6IChpZ25vcmVDb21tZW50cyA9IHRydWUpIC0+XG4gICAgICAgIGN1cnJlbnRJbmRlbnRhdGlvbiA9IEBnZXRDdXJyZW50TGluZUluZGVudGF0aW9uKClcbiAgICAgICAgRU9GID0gbm90IEBtb3ZlVG9OZXh0TGluZSgpXG5cbiAgICAgICAgaWYgaWdub3JlQ29tbWVudHNcbiAgICAgICAgICAgIHdoaWxlIG5vdChFT0YpIGFuZCBAaXNDdXJyZW50TGluZUVtcHR5KClcbiAgICAgICAgICAgICAgICBFT0YgPSBub3QgQG1vdmVUb05leHRMaW5lKClcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgd2hpbGUgbm90KEVPRikgYW5kIEBpc0N1cnJlbnRMaW5lQmxhbmsoKVxuICAgICAgICAgICAgICAgIEVPRiA9IG5vdCBAbW92ZVRvTmV4dExpbmUoKVxuXG4gICAgICAgIGlmIEVPRlxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG5cbiAgICAgICAgcmV0ID0gZmFsc2VcbiAgICAgICAgaWYgQGdldEN1cnJlbnRMaW5lSW5kZW50YXRpb24oKSA+IGN1cnJlbnRJbmRlbnRhdGlvblxuICAgICAgICAgICAgcmV0ID0gdHJ1ZVxuXG4gICAgICAgIEBtb3ZlVG9QcmV2aW91c0xpbmUoKVxuXG4gICAgICAgIHJldHVybiByZXRcblxuXG4gICAgIyBSZXR1cm5zIHRydWUgaWYgdGhlIGN1cnJlbnQgbGluZSBpcyBibGFuayBvciBpZiBpdCBpcyBhIGNvbW1lbnQgbGluZS5cbiAgICAjXG4gICAgIyBAcmV0dXJuIFtCb29sZWFuXSAgICAgUmV0dXJucyB0cnVlIGlmIHRoZSBjdXJyZW50IGxpbmUgaXMgZW1wdHkgb3IgaWYgaXQgaXMgYSBjb21tZW50IGxpbmUsIGZhbHNlIG90aGVyd2lzZVxuICAgICNcbiAgICBpc0N1cnJlbnRMaW5lRW1wdHk6IC0+XG4gICAgICAgIHRyaW1tZWRMaW5lID0gVXRpbHMudHJpbShAY3VycmVudExpbmUsICcgJylcbiAgICAgICAgcmV0dXJuIHRyaW1tZWRMaW5lLmxlbmd0aCBpcyAwIG9yIHRyaW1tZWRMaW5lLmNoYXJBdCgwKSBpcyAnIydcblxuXG4gICAgIyBSZXR1cm5zIHRydWUgaWYgdGhlIGN1cnJlbnQgbGluZSBpcyBibGFuay5cbiAgICAjXG4gICAgIyBAcmV0dXJuIFtCb29sZWFuXSAgICAgUmV0dXJucyB0cnVlIGlmIHRoZSBjdXJyZW50IGxpbmUgaXMgYmxhbmssIGZhbHNlIG90aGVyd2lzZVxuICAgICNcbiAgICBpc0N1cnJlbnRMaW5lQmxhbms6IC0+XG4gICAgICAgIHJldHVybiAnJyBpcyBVdGlscy50cmltKEBjdXJyZW50TGluZSwgJyAnKVxuXG5cbiAgICAjIFJldHVybnMgdHJ1ZSBpZiB0aGUgY3VycmVudCBsaW5lIGlzIGEgY29tbWVudCBsaW5lLlxuICAgICNcbiAgICAjIEByZXR1cm4gW0Jvb2xlYW5dICAgICBSZXR1cm5zIHRydWUgaWYgdGhlIGN1cnJlbnQgbGluZSBpcyBhIGNvbW1lbnQgbGluZSwgZmFsc2Ugb3RoZXJ3aXNlXG4gICAgI1xuICAgIGlzQ3VycmVudExpbmVDb21tZW50OiAtPlxuICAgICAgICAjIENoZWNraW5nIGV4cGxpY2l0bHkgdGhlIGZpcnN0IGNoYXIgb2YgdGhlIHRyaW0gaXMgZmFzdGVyIHRoYW4gbG9vcHMgb3Igc3RycG9zXG4gICAgICAgIGx0cmltbWVkTGluZSA9IFV0aWxzLmx0cmltKEBjdXJyZW50TGluZSwgJyAnKVxuXG4gICAgICAgIHJldHVybiBsdHJpbW1lZExpbmUuY2hhckF0KDApIGlzICcjJ1xuXG5cbiAgICAjIENsZWFudXBzIGEgWUFNTCBzdHJpbmcgdG8gYmUgcGFyc2VkLlxuICAgICNcbiAgICAjIEBwYXJhbSBbU3RyaW5nXSAgIHZhbHVlIFRoZSBpbnB1dCBZQU1MIHN0cmluZ1xuICAgICNcbiAgICAjIEByZXR1cm4gW1N0cmluZ10gIEEgY2xlYW5lZCB1cCBZQU1MIHN0cmluZ1xuICAgICNcbiAgICBjbGVhbnVwOiAodmFsdWUpIC0+XG4gICAgICAgIGlmIHZhbHVlLmluZGV4T2YoXCJcXHJcIikgaXNudCAtMVxuICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5zcGxpdChcIlxcclxcblwiKS5qb2luKFwiXFxuXCIpLnNwbGl0KFwiXFxyXCIpLmpvaW4oXCJcXG5cIilcblxuICAgICAgICAjIFN0cmlwIFlBTUwgaGVhZGVyXG4gICAgICAgIGNvdW50ID0gMFxuICAgICAgICBbdmFsdWUsIGNvdW50XSA9IEBQQVRURVJOX1lBTUxfSEVBREVSLnJlcGxhY2VBbGwgdmFsdWUsICcnXG4gICAgICAgIEBvZmZzZXQgKz0gY291bnRcblxuICAgICAgICAjIFJlbW92ZSBsZWFkaW5nIGNvbW1lbnRzXG4gICAgICAgIFt0cmltbWVkVmFsdWUsIGNvdW50XSA9IEBQQVRURVJOX0xFQURJTkdfQ09NTUVOVFMucmVwbGFjZUFsbCB2YWx1ZSwgJycsIDFcbiAgICAgICAgaWYgY291bnQgaXMgMVxuICAgICAgICAgICAgIyBJdGVtcyBoYXZlIGJlZW4gcmVtb3ZlZCwgdXBkYXRlIHRoZSBvZmZzZXRcbiAgICAgICAgICAgIEBvZmZzZXQgKz0gVXRpbHMuc3ViU3RyQ291bnQodmFsdWUsIFwiXFxuXCIpIC0gVXRpbHMuc3ViU3RyQ291bnQodHJpbW1lZFZhbHVlLCBcIlxcblwiKVxuICAgICAgICAgICAgdmFsdWUgPSB0cmltbWVkVmFsdWVcblxuICAgICAgICAjIFJlbW92ZSBzdGFydCBvZiB0aGUgZG9jdW1lbnQgbWFya2VyICgtLS0pXG4gICAgICAgIFt0cmltbWVkVmFsdWUsIGNvdW50XSA9IEBQQVRURVJOX0RPQ1VNRU5UX01BUktFUl9TVEFSVC5yZXBsYWNlQWxsIHZhbHVlLCAnJywgMVxuICAgICAgICBpZiBjb3VudCBpcyAxXG4gICAgICAgICAgICAjIEl0ZW1zIGhhdmUgYmVlbiByZW1vdmVkLCB1cGRhdGUgdGhlIG9mZnNldFxuICAgICAgICAgICAgQG9mZnNldCArPSBVdGlscy5zdWJTdHJDb3VudCh2YWx1ZSwgXCJcXG5cIikgLSBVdGlscy5zdWJTdHJDb3VudCh0cmltbWVkVmFsdWUsIFwiXFxuXCIpXG4gICAgICAgICAgICB2YWx1ZSA9IHRyaW1tZWRWYWx1ZVxuXG4gICAgICAgICAgICAjIFJlbW92ZSBlbmQgb2YgdGhlIGRvY3VtZW50IG1hcmtlciAoLi4uKVxuICAgICAgICAgICAgdmFsdWUgPSBAUEFUVEVSTl9ET0NVTUVOVF9NQVJLRVJfRU5ELnJlcGxhY2UgdmFsdWUsICcnXG5cbiAgICAgICAgIyBFbnN1cmUgdGhlIGJsb2NrIGlzIG5vdCBpbmRlbnRlZFxuICAgICAgICBsaW5lcyA9IHZhbHVlLnNwbGl0KFwiXFxuXCIpXG4gICAgICAgIHNtYWxsZXN0SW5kZW50ID0gLTFcbiAgICAgICAgZm9yIGxpbmUgaW4gbGluZXNcbiAgICAgICAgICAgIGNvbnRpbnVlIGlmIFV0aWxzLnRyaW0obGluZSwgJyAnKS5sZW5ndGggPT0gMFxuICAgICAgICAgICAgaW5kZW50ID0gbGluZS5sZW5ndGggLSBVdGlscy5sdHJpbShsaW5lKS5sZW5ndGhcbiAgICAgICAgICAgIGlmIHNtYWxsZXN0SW5kZW50IGlzIC0xIG9yIGluZGVudCA8IHNtYWxsZXN0SW5kZW50XG4gICAgICAgICAgICAgICAgc21hbGxlc3RJbmRlbnQgPSBpbmRlbnRcbiAgICAgICAgaWYgc21hbGxlc3RJbmRlbnQgPiAwXG4gICAgICAgICAgICBmb3IgbGluZSwgaSBpbiBsaW5lc1xuICAgICAgICAgICAgICAgIGxpbmVzW2ldID0gbGluZVtzbWFsbGVzdEluZGVudC4uXVxuICAgICAgICAgICAgdmFsdWUgPSBsaW5lcy5qb2luKFwiXFxuXCIpXG5cbiAgICAgICAgcmV0dXJuIHZhbHVlXG5cblxuICAgICMgUmV0dXJucyB0cnVlIGlmIHRoZSBuZXh0IGxpbmUgc3RhcnRzIHVuaW5kZW50ZWQgY29sbGVjdGlvblxuICAgICNcbiAgICAjIEByZXR1cm4gW0Jvb2xlYW5dICAgICBSZXR1cm5zIHRydWUgaWYgdGhlIG5leHQgbGluZSBzdGFydHMgdW5pbmRlbnRlZCBjb2xsZWN0aW9uLCBmYWxzZSBvdGhlcndpc2VcbiAgICAjXG4gICAgaXNOZXh0TGluZVVuSW5kZW50ZWRDb2xsZWN0aW9uOiAoY3VycmVudEluZGVudGF0aW9uID0gbnVsbCkgLT5cbiAgICAgICAgY3VycmVudEluZGVudGF0aW9uID89IEBnZXRDdXJyZW50TGluZUluZGVudGF0aW9uKClcbiAgICAgICAgbm90RU9GID0gQG1vdmVUb05leHRMaW5lKClcblxuICAgICAgICB3aGlsZSBub3RFT0YgYW5kIEBpc0N1cnJlbnRMaW5lRW1wdHkoKVxuICAgICAgICAgICAgbm90RU9GID0gQG1vdmVUb05leHRMaW5lKClcblxuICAgICAgICBpZiBmYWxzZSBpcyBub3RFT0ZcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuXG4gICAgICAgIHJldCA9IGZhbHNlXG4gICAgICAgIGlmIEBnZXRDdXJyZW50TGluZUluZGVudGF0aW9uKCkgaXMgY3VycmVudEluZGVudGF0aW9uIGFuZCBAaXNTdHJpbmdVbkluZGVudGVkQ29sbGVjdGlvbkl0ZW0oQGN1cnJlbnRMaW5lKVxuICAgICAgICAgICAgcmV0ID0gdHJ1ZVxuXG4gICAgICAgIEBtb3ZlVG9QcmV2aW91c0xpbmUoKVxuXG4gICAgICAgIHJldHVybiByZXRcblxuXG4gICAgIyBSZXR1cm5zIHRydWUgaWYgdGhlIHN0cmluZyBpcyB1bi1pbmRlbnRlZCBjb2xsZWN0aW9uIGl0ZW1cbiAgICAjXG4gICAgIyBAcmV0dXJuIFtCb29sZWFuXSAgICAgUmV0dXJucyB0cnVlIGlmIHRoZSBzdHJpbmcgaXMgdW4taW5kZW50ZWQgY29sbGVjdGlvbiBpdGVtLCBmYWxzZSBvdGhlcndpc2VcbiAgICAjXG4gICAgaXNTdHJpbmdVbkluZGVudGVkQ29sbGVjdGlvbkl0ZW06IC0+XG4gICAgICAgIHJldHVybiBAY3VycmVudExpbmUgaXMgJy0nIG9yIEBjdXJyZW50TGluZVswLi4uMl0gaXMgJy0gJ1xuXG5cbm1vZHVsZS5leHBvcnRzID0gUGFyc2VyXG4iLCJcbiMgUGF0dGVybiBpcyBhIHplcm8tY29uZmxpY3Qgd3JhcHBlciBleHRlbmRpbmcgUmVnRXhwIGZlYXR1cmVzXG4jIGluIG9yZGVyIHRvIG1ha2UgWUFNTCBwYXJzaW5nIHJlZ2V4IG1vcmUgZXhwcmVzc2l2ZS5cbiNcbmNsYXNzIFBhdHRlcm5cblxuICAgICMgQHByb3BlcnR5IFtSZWdFeHBdIFRoZSBSZWdFeHAgaW5zdGFuY2VcbiAgICByZWdleDogICAgICAgICAgbnVsbFxuXG4gICAgIyBAcHJvcGVydHkgW1N0cmluZ10gVGhlIHJhdyByZWdleCBzdHJpbmdcbiAgICByYXdSZWdleDogICAgICAgbnVsbFxuXG4gICAgIyBAcHJvcGVydHkgW1N0cmluZ10gVGhlIGNsZWFuZWQgcmVnZXggc3RyaW5nICh1c2VkIHRvIGNyZWF0ZSB0aGUgUmVnRXhwIGluc3RhbmNlKVxuICAgIGNsZWFuZWRSZWdleDogICBudWxsXG5cbiAgICAjIEBwcm9wZXJ0eSBbT2JqZWN0XSBUaGUgZGljdGlvbmFyeSBtYXBwaW5nIG5hbWVzIHRvIGNhcHR1cmluZyBicmFja2V0IG51bWJlcnNcbiAgICBtYXBwaW5nOiAgICAgICAgbnVsbFxuXG4gICAgIyBDb25zdHJ1Y3RvclxuICAgICNcbiAgICAjIEBwYXJhbSBbU3RyaW5nXSByYXdSZWdleCBUaGUgcmF3IHJlZ2V4IHN0cmluZyBkZWZpbmluZyB0aGUgcGF0dGVyblxuICAgICNcbiAgICBjb25zdHJ1Y3RvcjogKHJhd1JlZ2V4LCBtb2RpZmllcnMgPSAnJykgLT5cbiAgICAgICAgY2xlYW5lZFJlZ2V4ID0gJydcbiAgICAgICAgbGVuID0gcmF3UmVnZXgubGVuZ3RoXG4gICAgICAgIG1hcHBpbmcgPSBudWxsXG5cbiAgICAgICAgIyBDbGVhbnVwIHJhdyByZWdleCBhbmQgY29tcHV0ZSBtYXBwaW5nXG4gICAgICAgIGNhcHR1cmluZ0JyYWNrZXROdW1iZXIgPSAwXG4gICAgICAgIGkgPSAwXG4gICAgICAgIHdoaWxlIGkgPCBsZW5cbiAgICAgICAgICAgIF9jaGFyID0gcmF3UmVnZXguY2hhckF0KGkpXG4gICAgICAgICAgICBpZiBfY2hhciBpcyAnXFxcXCdcbiAgICAgICAgICAgICAgICAjIElnbm9yZSBuZXh0IGNoYXJhY3RlclxuICAgICAgICAgICAgICAgIGNsZWFuZWRSZWdleCArPSByYXdSZWdleFtpLi5pKzFdXG4gICAgICAgICAgICAgICAgaSsrXG4gICAgICAgICAgICBlbHNlIGlmIF9jaGFyIGlzICcoJ1xuICAgICAgICAgICAgICAgICMgSW5jcmVhc2UgYnJhY2tldCBudW1iZXIsIG9ubHkgaWYgaXQgaXMgY2FwdHVyaW5nXG4gICAgICAgICAgICAgICAgaWYgaSA8IGxlbiAtIDJcbiAgICAgICAgICAgICAgICAgICAgcGFydCA9IHJhd1JlZ2V4W2kuLmkrMl1cbiAgICAgICAgICAgICAgICAgICAgaWYgcGFydCBpcyAnKD86J1xuICAgICAgICAgICAgICAgICAgICAgICAgIyBOb24tY2FwdHVyaW5nIGJyYWNrZXRcbiAgICAgICAgICAgICAgICAgICAgICAgIGkgKz0gMlxuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYW5lZFJlZ2V4ICs9IHBhcnRcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiBwYXJ0IGlzICcoPzwnXG4gICAgICAgICAgICAgICAgICAgICAgICAjIENhcHR1cmluZyBicmFja2V0IHdpdGggcG9zc2libHkgYSBuYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0dXJpbmdCcmFja2V0TnVtYmVyKytcbiAgICAgICAgICAgICAgICAgICAgICAgIGkgKz0gMlxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZSA9ICcnXG4gICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSBpICsgMSA8IGxlblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YkNoYXIgPSByYXdSZWdleC5jaGFyQXQoaSArIDEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgc3ViQ2hhciBpcyAnPidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xlYW5lZFJlZ2V4ICs9ICcoJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpKytcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgbmFtZS5sZW5ndGggPiAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAjIEFzc29jaWF0ZSBhIG5hbWUgd2l0aCBhIGNhcHR1cmluZyBicmFja2V0IG51bWJlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwcGluZyA/PSB7fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwcGluZ1tuYW1lXSA9IGNhcHR1cmluZ0JyYWNrZXROdW1iZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWUgKz0gc3ViQ2hhclxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaSsrXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFuZWRSZWdleCArPSBfY2hhclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdHVyaW5nQnJhY2tldE51bWJlcisrXG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBjbGVhbmVkUmVnZXggKz0gX2NoYXJcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBjbGVhbmVkUmVnZXggKz0gX2NoYXJcblxuICAgICAgICAgICAgaSsrXG5cbiAgICAgICAgQHJhd1JlZ2V4ID0gcmF3UmVnZXhcbiAgICAgICAgQGNsZWFuZWRSZWdleCA9IGNsZWFuZWRSZWdleFxuICAgICAgICBAcmVnZXggPSBuZXcgUmVnRXhwIEBjbGVhbmVkUmVnZXgsICdnJyttb2RpZmllcnMucmVwbGFjZSgnZycsICcnKVxuICAgICAgICBAbWFwcGluZyA9IG1hcHBpbmdcblxuXG4gICAgIyBFeGVjdXRlcyB0aGUgcGF0dGVybidzIHJlZ2V4IGFuZCByZXR1cm5zIHRoZSBtYXRjaGluZyB2YWx1ZXNcbiAgICAjXG4gICAgIyBAcGFyYW0gW1N0cmluZ10gc3RyIFRoZSBzdHJpbmcgdG8gdXNlIHRvIGV4ZWN1dGUgdGhlIHBhdHRlcm5cbiAgICAjXG4gICAgIyBAcmV0dXJuIFtBcnJheV0gVGhlIG1hdGNoaW5nIHZhbHVlcyBleHRyYWN0ZWQgZnJvbSBjYXB0dXJpbmcgYnJhY2tldHMgb3IgbnVsbCBpZiBub3RoaW5nIG1hdGNoZWRcbiAgICAjXG4gICAgZXhlYzogKHN0cikgLT5cbiAgICAgICAgQHJlZ2V4Lmxhc3RJbmRleCA9IDBcbiAgICAgICAgbWF0Y2hlcyA9IEByZWdleC5leGVjIHN0clxuXG4gICAgICAgIGlmIG5vdCBtYXRjaGVzP1xuICAgICAgICAgICAgcmV0dXJuIG51bGxcblxuICAgICAgICBpZiBAbWFwcGluZz9cbiAgICAgICAgICAgIGZvciBuYW1lLCBpbmRleCBvZiBAbWFwcGluZ1xuICAgICAgICAgICAgICAgIG1hdGNoZXNbbmFtZV0gPSBtYXRjaGVzW2luZGV4XVxuXG4gICAgICAgIHJldHVybiBtYXRjaGVzXG5cblxuICAgICMgVGVzdHMgdGhlIHBhdHRlcm4ncyByZWdleFxuICAgICNcbiAgICAjIEBwYXJhbSBbU3RyaW5nXSBzdHIgVGhlIHN0cmluZyB0byB1c2UgdG8gdGVzdCB0aGUgcGF0dGVyblxuICAgICNcbiAgICAjIEByZXR1cm4gW0Jvb2xlYW5dIHRydWUgaWYgdGhlIHN0cmluZyBtYXRjaGVkXG4gICAgI1xuICAgIHRlc3Q6IChzdHIpIC0+XG4gICAgICAgIEByZWdleC5sYXN0SW5kZXggPSAwXG4gICAgICAgIHJldHVybiBAcmVnZXgudGVzdCBzdHJcblxuXG4gICAgIyBSZXBsYWNlcyBvY2N1cmVuY2VzIG1hdGNoaW5nIHdpdGggdGhlIHBhdHRlcm4ncyByZWdleCB3aXRoIHJlcGxhY2VtZW50XG4gICAgI1xuICAgICMgQHBhcmFtIFtTdHJpbmddIHN0ciBUaGUgc291cmNlIHN0cmluZyB0byBwZXJmb3JtIHJlcGxhY2VtZW50c1xuICAgICMgQHBhcmFtIFtTdHJpbmddIHJlcGxhY2VtZW50IFRoZSBzdHJpbmcgdG8gdXNlIGluIHBsYWNlIG9mIGVhY2ggcmVwbGFjZWQgb2NjdXJlbmNlLlxuICAgICNcbiAgICAjIEByZXR1cm4gW1N0cmluZ10gVGhlIHJlcGxhY2VkIHN0cmluZ1xuICAgICNcbiAgICByZXBsYWNlOiAoc3RyLCByZXBsYWNlbWVudCkgLT5cbiAgICAgICAgQHJlZ2V4Lmxhc3RJbmRleCA9IDBcbiAgICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlIEByZWdleCwgcmVwbGFjZW1lbnRcblxuXG4gICAgIyBSZXBsYWNlcyBvY2N1cmVuY2VzIG1hdGNoaW5nIHdpdGggdGhlIHBhdHRlcm4ncyByZWdleCB3aXRoIHJlcGxhY2VtZW50IGFuZFxuICAgICMgZ2V0IGJvdGggdGhlIHJlcGxhY2VkIHN0cmluZyBhbmQgdGhlIG51bWJlciBvZiByZXBsYWNlZCBvY2N1cmVuY2VzIGluIHRoZSBzdHJpbmcuXG4gICAgI1xuICAgICMgQHBhcmFtIFtTdHJpbmddIHN0ciBUaGUgc291cmNlIHN0cmluZyB0byBwZXJmb3JtIHJlcGxhY2VtZW50c1xuICAgICMgQHBhcmFtIFtTdHJpbmddIHJlcGxhY2VtZW50IFRoZSBzdHJpbmcgdG8gdXNlIGluIHBsYWNlIG9mIGVhY2ggcmVwbGFjZWQgb2NjdXJlbmNlLlxuICAgICMgQHBhcmFtIFtJbnRlZ2VyXSBsaW1pdCBUaGUgbWF4aW11bSBudW1iZXIgb2Ygb2NjdXJlbmNlcyB0byByZXBsYWNlICgwIG1lYW5zIGluZmluaXRlIG51bWJlciBvZiBvY2N1cmVuY2VzKVxuICAgICNcbiAgICAjIEByZXR1cm4gW0FycmF5XSBBIGRlc3RydWN0dXJhYmxlIGFycmF5IGNvbnRhaW5pbmcgdGhlIHJlcGxhY2VkIHN0cmluZyBhbmQgdGhlIG51bWJlciBvZiByZXBsYWNlZCBvY2N1cmVuY2VzLiBGb3IgaW5zdGFuY2U6IFtcIm15IHJlcGxhY2VkIHN0cmluZ1wiLCAyXVxuICAgICNcbiAgICByZXBsYWNlQWxsOiAoc3RyLCByZXBsYWNlbWVudCwgbGltaXQgPSAwKSAtPlxuICAgICAgICBAcmVnZXgubGFzdEluZGV4ID0gMFxuICAgICAgICBjb3VudCA9IDBcbiAgICAgICAgd2hpbGUgQHJlZ2V4LnRlc3Qoc3RyKSBhbmQgKGxpbWl0IGlzIDAgb3IgY291bnQgPCBsaW1pdClcbiAgICAgICAgICAgIEByZWdleC5sYXN0SW5kZXggPSAwXG4gICAgICAgICAgICBzdHIgPSBzdHIucmVwbGFjZSBAcmVnZXgsICcnXG4gICAgICAgICAgICBjb3VudCsrXG4gICAgICAgIFxuICAgICAgICByZXR1cm4gW3N0ciwgY291bnRdXG5cblxubW9kdWxlLmV4cG9ydHMgPSBQYXR0ZXJuXG5cbiIsIlxuVXRpbHMgICA9IHJlcXVpcmUgJy4vVXRpbHMnXG5QYXR0ZXJuID0gcmVxdWlyZSAnLi9QYXR0ZXJuJ1xuXG4jIFVuZXNjYXBlciBlbmNhcHN1bGF0ZXMgdW5lc2NhcGluZyBydWxlcyBmb3Igc2luZ2xlIGFuZCBkb3VibGUtcXVvdGVkIFlBTUwgc3RyaW5ncy5cbiNcbmNsYXNzIFVuZXNjYXBlclxuXG4gICAgIyBSZWdleCBmcmFnbWVudCB0aGF0IG1hdGNoZXMgYW4gZXNjYXBlZCBjaGFyYWN0ZXIgaW5cbiAgICAjIGEgZG91YmxlIHF1b3RlZCBzdHJpbmcuXG4gICAgQFBBVFRFUk5fRVNDQVBFRF9DSEFSQUNURVI6ICAgICBuZXcgUGF0dGVybiAnXFxcXFxcXFwoWzBhYnRcXHRudmZyZSBcIlxcXFwvXFxcXFxcXFxOX0xQXXx4WzAtOWEtZkEtRl17Mn18dVswLTlhLWZBLUZdezR9fFVbMC05YS1mQS1GXXs4fSknO1xuXG5cbiAgICAjIFVuZXNjYXBlcyBhIHNpbmdsZSBxdW90ZWQgc3RyaW5nLlxuICAgICNcbiAgICAjIEBwYXJhbSBbU3RyaW5nXSAgICAgICB2YWx1ZSBBIHNpbmdsZSBxdW90ZWQgc3RyaW5nLlxuICAgICNcbiAgICAjIEByZXR1cm4gW1N0cmluZ10gICAgICBUaGUgdW5lc2NhcGVkIHN0cmluZy5cbiAgICAjXG4gICAgQHVuZXNjYXBlU2luZ2xlUXVvdGVkU3RyaW5nOiAodmFsdWUpIC0+XG4gICAgICAgIHJldHVybiB2YWx1ZS5yZXBsYWNlKC9cXCdcXCcvZywgJ1xcJycpXG5cblxuICAgICMgVW5lc2NhcGVzIGEgZG91YmxlIHF1b3RlZCBzdHJpbmcuXG4gICAgI1xuICAgICMgQHBhcmFtIFtTdHJpbmddICAgICAgIHZhbHVlIEEgZG91YmxlIHF1b3RlZCBzdHJpbmcuXG4gICAgI1xuICAgICMgQHJldHVybiBbU3RyaW5nXSAgICAgIFRoZSB1bmVzY2FwZWQgc3RyaW5nLlxuICAgICNcbiAgICBAdW5lc2NhcGVEb3VibGVRdW90ZWRTdHJpbmc6ICh2YWx1ZSkgLT5cbiAgICAgICAgQF91bmVzY2FwZUNhbGxiYWNrID89IChzdHIpID0+XG4gICAgICAgICAgICByZXR1cm4gQHVuZXNjYXBlQ2hhcmFjdGVyKHN0cilcblxuICAgICAgICAjIEV2YWx1YXRlIHRoZSBzdHJpbmdcbiAgICAgICAgcmV0dXJuIEBQQVRURVJOX0VTQ0FQRURfQ0hBUkFDVEVSLnJlcGxhY2UgdmFsdWUsIEBfdW5lc2NhcGVDYWxsYmFja1xuXG5cbiAgICAjIFVuZXNjYXBlcyBhIGNoYXJhY3RlciB0aGF0IHdhcyBmb3VuZCBpbiBhIGRvdWJsZS1xdW90ZWQgc3RyaW5nXG4gICAgI1xuICAgICMgQHBhcmFtIFtTdHJpbmddICAgICAgIHZhbHVlIEFuIGVzY2FwZWQgY2hhcmFjdGVyXG4gICAgI1xuICAgICMgQHJldHVybiBbU3RyaW5nXSAgICAgIFRoZSB1bmVzY2FwZWQgY2hhcmFjdGVyXG4gICAgI1xuICAgIEB1bmVzY2FwZUNoYXJhY3RlcjogKHZhbHVlKSAtPlxuICAgICAgICBjaCA9IFN0cmluZy5mcm9tQ2hhckNvZGVcbiAgICAgICAgc3dpdGNoIHZhbHVlLmNoYXJBdCgxKVxuICAgICAgICAgICAgd2hlbiAnMCdcbiAgICAgICAgICAgICAgICByZXR1cm4gY2goMClcbiAgICAgICAgICAgIHdoZW4gJ2EnXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNoKDcpXG4gICAgICAgICAgICB3aGVuICdiJ1xuICAgICAgICAgICAgICAgIHJldHVybiBjaCg4KVxuICAgICAgICAgICAgd2hlbiAndCdcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJcXHRcIlxuICAgICAgICAgICAgd2hlbiBcIlxcdFwiXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiXFx0XCJcbiAgICAgICAgICAgIHdoZW4gJ24nXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiXFxuXCJcbiAgICAgICAgICAgIHdoZW4gJ3YnXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNoKDExKVxuICAgICAgICAgICAgd2hlbiAnZidcbiAgICAgICAgICAgICAgICByZXR1cm4gY2goMTIpXG4gICAgICAgICAgICB3aGVuICdyJ1xuICAgICAgICAgICAgICAgIHJldHVybiBjaCgxMylcbiAgICAgICAgICAgIHdoZW4gJ2UnXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNoKDI3KVxuICAgICAgICAgICAgd2hlbiAnICdcbiAgICAgICAgICAgICAgICByZXR1cm4gJyAnXG4gICAgICAgICAgICB3aGVuICdcIidcbiAgICAgICAgICAgICAgICByZXR1cm4gJ1wiJ1xuICAgICAgICAgICAgd2hlbiAnLydcbiAgICAgICAgICAgICAgICByZXR1cm4gJy8nXG4gICAgICAgICAgICB3aGVuICdcXFxcJ1xuICAgICAgICAgICAgICAgIHJldHVybiAnXFxcXCdcbiAgICAgICAgICAgIHdoZW4gJ04nXG4gICAgICAgICAgICAgICAgIyBVKzAwODUgTkVYVCBMSU5FXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNoKDB4MDA4NSlcbiAgICAgICAgICAgIHdoZW4gJ18nXG4gICAgICAgICAgICAgICAgIyBVKzAwQTAgTk8tQlJFQUsgU1BBQ0VcbiAgICAgICAgICAgICAgICByZXR1cm4gY2goMHgwMEEwKVxuICAgICAgICAgICAgd2hlbiAnTCdcbiAgICAgICAgICAgICAgICAjIFUrMjAyOCBMSU5FIFNFUEFSQVRPUlxuICAgICAgICAgICAgICAgIHJldHVybiBjaCgweDIwMjgpXG4gICAgICAgICAgICB3aGVuICdQJ1xuICAgICAgICAgICAgICAgICMgVSsyMDI5IFBBUkFHUkFQSCBTRVBBUkFUT1JcbiAgICAgICAgICAgICAgICByZXR1cm4gY2goMHgyMDI5KVxuICAgICAgICAgICAgd2hlbiAneCdcbiAgICAgICAgICAgICAgICByZXR1cm4gVXRpbHMudXRmOGNocihVdGlscy5oZXhEZWModmFsdWUuc3Vic3RyKDIsIDIpKSlcbiAgICAgICAgICAgIHdoZW4gJ3UnXG4gICAgICAgICAgICAgICAgcmV0dXJuIFV0aWxzLnV0ZjhjaHIoVXRpbHMuaGV4RGVjKHZhbHVlLnN1YnN0cigyLCA0KSkpXG4gICAgICAgICAgICB3aGVuICdVJ1xuICAgICAgICAgICAgICAgIHJldHVybiBVdGlscy51dGY4Y2hyKFV0aWxzLmhleERlYyh2YWx1ZS5zdWJzdHIoMiwgOCkpKVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJldHVybiAnJ1xuXG5tb2R1bGUuZXhwb3J0cyA9IFVuZXNjYXBlclxuIiwiXG5QYXR0ZXJuID0gcmVxdWlyZSAnLi9QYXR0ZXJuJ1xuXG4jIEEgYnVuY2ggb2YgdXRpbGl0eSBtZXRob2RzXG4jXG5jbGFzcyBVdGlsc1xuXG4gICAgQFJFR0VYX0xFRlRfVFJJTV9CWV9DSEFSOiAgIHt9XG4gICAgQFJFR0VYX1JJR0hUX1RSSU1fQllfQ0hBUjogIHt9XG4gICAgQFJFR0VYX1NQQUNFUzogICAgICAgICAgICAgIC9cXHMrL2dcbiAgICBAUkVHRVhfRElHSVRTOiAgICAgICAgICAgICAgL15cXGQrJC9cbiAgICBAUkVHRVhfT0NUQUw6ICAgICAgICAgICAgICAgL1teMC03XS9naVxuICAgIEBSRUdFWF9IRVhBREVDSU1BTDogICAgICAgICAvW15hLWYwLTldL2dpXG5cbiAgICAjIFByZWNvbXBpbGVkIGRhdGUgcGF0dGVyblxuICAgIEBQQVRURVJOX0RBVEU6ICAgICAgICAgICAgICBuZXcgUGF0dGVybiAnXicrXG4gICAgICAgICAgICAnKD88eWVhcj5bMC05XVswLTldWzAtOV1bMC05XSknK1xuICAgICAgICAgICAgJy0oPzxtb250aD5bMC05XVswLTldPyknK1xuICAgICAgICAgICAgJy0oPzxkYXk+WzAtOV1bMC05XT8pJytcbiAgICAgICAgICAgICcoPzooPzpbVHRdfFsgXFx0XSspJytcbiAgICAgICAgICAgICcoPzxob3VyPlswLTldWzAtOV0/KScrXG4gICAgICAgICAgICAnOig/PG1pbnV0ZT5bMC05XVswLTldKScrXG4gICAgICAgICAgICAnOig/PHNlY29uZD5bMC05XVswLTldKScrXG4gICAgICAgICAgICAnKD86XFwuKD88ZnJhY3Rpb24+WzAtOV0qKSk/JytcbiAgICAgICAgICAgICcoPzpbIFxcdF0qKD88dHo+WnwoPzx0el9zaWduPlstK10pKD88dHpfaG91cj5bMC05XVswLTldPyknK1xuICAgICAgICAgICAgJyg/OjooPzx0el9taW51dGU+WzAtOV1bMC05XSkpPykpPyk/JytcbiAgICAgICAgICAgICckJywgJ2knXG5cbiAgICAjIExvY2FsIHRpbWV6b25lIG9mZnNldCBpbiBtc1xuICAgIEBMT0NBTF9USU1FWk9ORV9PRkZTRVQ6ICAgICBuZXcgRGF0ZSgpLmdldFRpbWV6b25lT2Zmc2V0KCkgKiA2MCAqIDEwMDBcblxuICAgICMgVHJpbXMgdGhlIGdpdmVuIHN0cmluZyBvbiBib3RoIHNpZGVzXG4gICAgI1xuICAgICMgQHBhcmFtIFtTdHJpbmddIHN0ciBUaGUgc3RyaW5nIHRvIHRyaW1cbiAgICAjIEBwYXJhbSBbU3RyaW5nXSBfY2hhciBUaGUgY2hhcmFjdGVyIHRvIHVzZSBmb3IgdHJpbW1pbmcgKGRlZmF1bHQ6ICdcXFxccycpXG4gICAgI1xuICAgICMgQHJldHVybiBbU3RyaW5nXSBBIHRyaW1tZWQgc3RyaW5nXG4gICAgI1xuICAgIEB0cmltOiAoc3RyLCBfY2hhciA9ICdcXFxccycpIC0+XG4gICAgICAgIHJldHVybiBzdHIudHJpbSgpXG4gICAgICAgIHJlZ2V4TGVmdCA9IEBSRUdFWF9MRUZUX1RSSU1fQllfQ0hBUltfY2hhcl1cbiAgICAgICAgdW5sZXNzIHJlZ2V4TGVmdD9cbiAgICAgICAgICAgIEBSRUdFWF9MRUZUX1RSSU1fQllfQ0hBUltfY2hhcl0gPSByZWdleExlZnQgPSBuZXcgUmVnRXhwICdeJytfY2hhcisnJytfY2hhcisnKidcbiAgICAgICAgcmVnZXhMZWZ0Lmxhc3RJbmRleCA9IDBcbiAgICAgICAgcmVnZXhSaWdodCA9IEBSRUdFWF9SSUdIVF9UUklNX0JZX0NIQVJbX2NoYXJdXG4gICAgICAgIHVubGVzcyByZWdleFJpZ2h0P1xuICAgICAgICAgICAgQFJFR0VYX1JJR0hUX1RSSU1fQllfQ0hBUltfY2hhcl0gPSByZWdleFJpZ2h0ID0gbmV3IFJlZ0V4cCBfY2hhcisnJytfY2hhcisnKiQnXG4gICAgICAgIHJlZ2V4UmlnaHQubGFzdEluZGV4ID0gMFxuICAgICAgICByZXR1cm4gc3RyLnJlcGxhY2UocmVnZXhMZWZ0LCAnJykucmVwbGFjZShyZWdleFJpZ2h0LCAnJylcblxuXG4gICAgIyBUcmltcyB0aGUgZ2l2ZW4gc3RyaW5nIG9uIHRoZSBsZWZ0IHNpZGVcbiAgICAjXG4gICAgIyBAcGFyYW0gW1N0cmluZ10gc3RyIFRoZSBzdHJpbmcgdG8gdHJpbVxuICAgICMgQHBhcmFtIFtTdHJpbmddIF9jaGFyIFRoZSBjaGFyYWN0ZXIgdG8gdXNlIGZvciB0cmltbWluZyAoZGVmYXVsdDogJ1xcXFxzJylcbiAgICAjXG4gICAgIyBAcmV0dXJuIFtTdHJpbmddIEEgdHJpbW1lZCBzdHJpbmdcbiAgICAjXG4gICAgQGx0cmltOiAoc3RyLCBfY2hhciA9ICdcXFxccycpIC0+XG4gICAgICAgIHJlZ2V4TGVmdCA9IEBSRUdFWF9MRUZUX1RSSU1fQllfQ0hBUltfY2hhcl1cbiAgICAgICAgdW5sZXNzIHJlZ2V4TGVmdD9cbiAgICAgICAgICAgIEBSRUdFWF9MRUZUX1RSSU1fQllfQ0hBUltfY2hhcl0gPSByZWdleExlZnQgPSBuZXcgUmVnRXhwICdeJytfY2hhcisnJytfY2hhcisnKidcbiAgICAgICAgcmVnZXhMZWZ0Lmxhc3RJbmRleCA9IDBcbiAgICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlKHJlZ2V4TGVmdCwgJycpXG5cblxuICAgICMgVHJpbXMgdGhlIGdpdmVuIHN0cmluZyBvbiB0aGUgcmlnaHQgc2lkZVxuICAgICNcbiAgICAjIEBwYXJhbSBbU3RyaW5nXSBzdHIgVGhlIHN0cmluZyB0byB0cmltXG4gICAgIyBAcGFyYW0gW1N0cmluZ10gX2NoYXIgVGhlIGNoYXJhY3RlciB0byB1c2UgZm9yIHRyaW1taW5nIChkZWZhdWx0OiAnXFxcXHMnKVxuICAgICNcbiAgICAjIEByZXR1cm4gW1N0cmluZ10gQSB0cmltbWVkIHN0cmluZ1xuICAgICNcbiAgICBAcnRyaW06IChzdHIsIF9jaGFyID0gJ1xcXFxzJykgLT5cbiAgICAgICAgcmVnZXhSaWdodCA9IEBSRUdFWF9SSUdIVF9UUklNX0JZX0NIQVJbX2NoYXJdXG4gICAgICAgIHVubGVzcyByZWdleFJpZ2h0P1xuICAgICAgICAgICAgQFJFR0VYX1JJR0hUX1RSSU1fQllfQ0hBUltfY2hhcl0gPSByZWdleFJpZ2h0ID0gbmV3IFJlZ0V4cCBfY2hhcisnJytfY2hhcisnKiQnXG4gICAgICAgIHJlZ2V4UmlnaHQubGFzdEluZGV4ID0gMFxuICAgICAgICByZXR1cm4gc3RyLnJlcGxhY2UocmVnZXhSaWdodCwgJycpXG5cblxuICAgICMgQ2hlY2tzIGlmIHRoZSBnaXZlbiB2YWx1ZSBpcyBlbXB0eSAobnVsbCwgdW5kZWZpbmVkLCBlbXB0eSBzdHJpbmcsIHN0cmluZyAnMCcpXG4gICAgI1xuICAgICMgQHBhcmFtIFtPYmplY3RdIHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVja1xuICAgICNcbiAgICAjIEByZXR1cm4gW0Jvb2xlYW5dIHRydWUgaWYgdGhlIHZhbHVlIGlzIGVtcHR5XG4gICAgI1xuICAgIEBpc0VtcHR5OiAodmFsdWUpIC0+XG4gICAgICAgIHJldHVybiBub3QodmFsdWUpIG9yIHZhbHVlIGlzICcnIG9yIHZhbHVlIGlzICcwJyBvciAodmFsdWUgaW5zdGFuY2VvZiBBcnJheSBhbmQgdmFsdWUubGVuZ3RoIGlzIDApXG5cblxuICAgICMgQ291bnRzIHRoZSBudW1iZXIgb2Ygb2NjdXJlbmNlcyBvZiBzdWJTdHJpbmcgaW5zaWRlIHN0cmluZ1xuICAgICNcbiAgICAjIEBwYXJhbSBbU3RyaW5nXSBzdHJpbmcgVGhlIHN0cmluZyB3aGVyZSB0byBjb3VudCBvY2N1cmVuY2VzXG4gICAgIyBAcGFyYW0gW1N0cmluZ10gc3ViU3RyaW5nIFRoZSBzdWJTdHJpbmcgdG8gY291bnRcbiAgICAjIEBwYXJhbSBbSW50ZWdlcl0gc3RhcnQgVGhlIHN0YXJ0IGluZGV4XG4gICAgIyBAcGFyYW0gW0ludGVnZXJdIGxlbmd0aCBUaGUgc3RyaW5nIGxlbmd0aCB1bnRpbCB3aGVyZSB0byBjb3VudFxuICAgICNcbiAgICAjIEByZXR1cm4gW0ludGVnZXJdIFRoZSBudW1iZXIgb2Ygb2NjdXJlbmNlc1xuICAgICNcbiAgICBAc3ViU3RyQ291bnQ6IChzdHJpbmcsIHN1YlN0cmluZywgc3RhcnQsIGxlbmd0aCkgLT5cbiAgICAgICAgYyA9IDBcbiAgICAgICAgXG4gICAgICAgIHN0cmluZyA9ICcnICsgc3RyaW5nXG4gICAgICAgIHN1YlN0cmluZyA9ICcnICsgc3ViU3RyaW5nXG4gICAgICAgIFxuICAgICAgICBpZiBzdGFydD9cbiAgICAgICAgICAgIHN0cmluZyA9IHN0cmluZ1tzdGFydC4uXVxuICAgICAgICBpZiBsZW5ndGg/XG4gICAgICAgICAgICBzdHJpbmcgPSBzdHJpbmdbMC4uLmxlbmd0aF1cbiAgICAgICAgXG4gICAgICAgIGxlbiA9IHN0cmluZy5sZW5ndGhcbiAgICAgICAgc3VibGVuID0gc3ViU3RyaW5nLmxlbmd0aFxuICAgICAgICBmb3IgaSBpbiBbMC4uLmxlbl1cbiAgICAgICAgICAgIGlmIHN1YlN0cmluZyBpcyBzdHJpbmdbaS4uLnN1Ymxlbl1cbiAgICAgICAgICAgICAgICBjKytcbiAgICAgICAgICAgICAgICBpICs9IHN1YmxlbiAtIDFcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBjXG5cblxuICAgICMgUmV0dXJucyB0cnVlIGlmIGlucHV0IGlzIG9ubHkgY29tcG9zZWQgb2YgZGlnaXRzXG4gICAgI1xuICAgICMgQHBhcmFtIFtPYmplY3RdIGlucHV0IFRoZSB2YWx1ZSB0byB0ZXN0XG4gICAgI1xuICAgICMgQHJldHVybiBbQm9vbGVhbl0gdHJ1ZSBpZiBpbnB1dCBpcyBvbmx5IGNvbXBvc2VkIG9mIGRpZ2l0c1xuICAgICNcbiAgICBAaXNEaWdpdHM6IChpbnB1dCkgLT5cbiAgICAgICAgQFJFR0VYX0RJR0lUUy5sYXN0SW5kZXggPSAwXG4gICAgICAgIHJldHVybiBAUkVHRVhfRElHSVRTLnRlc3QgaW5wdXRcblxuXG4gICAgIyBEZWNvZGUgb2N0YWwgdmFsdWVcbiAgICAjXG4gICAgIyBAcGFyYW0gW1N0cmluZ10gaW5wdXQgVGhlIHZhbHVlIHRvIGRlY29kZVxuICAgICNcbiAgICAjIEByZXR1cm4gW0ludGVnZXJdIFRoZSBkZWNvZGVkIHZhbHVlXG4gICAgI1xuICAgIEBvY3REZWM6IChpbnB1dCkgLT5cbiAgICAgICAgQFJFR0VYX09DVEFMLmxhc3RJbmRleCA9IDBcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KChpbnB1dCsnJykucmVwbGFjZShAUkVHRVhfT0NUQUwsICcnKSwgOClcblxuXG4gICAgIyBEZWNvZGUgaGV4YWRlY2ltYWwgdmFsdWVcbiAgICAjXG4gICAgIyBAcGFyYW0gW1N0cmluZ10gaW5wdXQgVGhlIHZhbHVlIHRvIGRlY29kZVxuICAgICNcbiAgICAjIEByZXR1cm4gW0ludGVnZXJdIFRoZSBkZWNvZGVkIHZhbHVlXG4gICAgI1xuICAgIEBoZXhEZWM6IChpbnB1dCkgLT5cbiAgICAgICAgQFJFR0VYX0hFWEFERUNJTUFMLmxhc3RJbmRleCA9IDBcbiAgICAgICAgaW5wdXQgPSBAdHJpbShpbnB1dClcbiAgICAgICAgaWYgKGlucHV0KycnKVswLi4uMl0gaXMgJzB4JyB0aGVuIGlucHV0ID0gKGlucHV0KycnKVsyLi5dXG4gICAgICAgIHJldHVybiBwYXJzZUludCgoaW5wdXQrJycpLnJlcGxhY2UoQFJFR0VYX0hFWEFERUNJTUFMLCAnJyksIDE2KVxuXG5cbiAgICAjIEdldCB0aGUgVVRGLTggY2hhcmFjdGVyIGZvciB0aGUgZ2l2ZW4gY29kZSBwb2ludC5cbiAgICAjXG4gICAgIyBAcGFyYW0gW0ludGVnZXJdIGMgVGhlIHVuaWNvZGUgY29kZSBwb2ludFxuICAgICNcbiAgICAjIEByZXR1cm4gW1N0cmluZ10gVGhlIGNvcnJlc3BvbmRpbmcgVVRGLTggY2hhcmFjdGVyXG4gICAgI1xuICAgIEB1dGY4Y2hyOiAoYykgLT5cbiAgICAgICAgY2ggPSBTdHJpbmcuZnJvbUNoYXJDb2RlXG4gICAgICAgIGlmIDB4ODAgPiAoYyAlPSAweDIwMDAwMClcbiAgICAgICAgICAgIHJldHVybiBjaChjKVxuICAgICAgICBpZiAweDgwMCA+IGNcbiAgICAgICAgICAgIHJldHVybiBjaCgweEMwIHwgYz4+NikgKyBjaCgweDgwIHwgYyAmIDB4M0YpXG4gICAgICAgIGlmIDB4MTAwMDAgPiBjXG4gICAgICAgICAgICByZXR1cm4gY2goMHhFMCB8IGM+PjEyKSArIGNoKDB4ODAgfCBjPj42ICYgMHgzRikgKyBjaCgweDgwIHwgYyAmIDB4M0YpXG5cbiAgICAgICAgcmV0dXJuIGNoKDB4RjAgfCBjPj4xOCkgKyBjaCgweDgwIHwgYz4+MTIgJiAweDNGKSArIGNoKDB4ODAgfCBjPj42ICYgMHgzRikgKyBjaCgweDgwIHwgYyAmIDB4M0YpXG5cblxuICAgICMgUmV0dXJucyB0aGUgYm9vbGVhbiB2YWx1ZSBlcXVpdmFsZW50IHRvIHRoZSBnaXZlbiBpbnB1dFxuICAgICNcbiAgICAjIEBwYXJhbSBbU3RyaW5nfE9iamVjdF0gICAgaW5wdXQgICAgICAgVGhlIGlucHV0IHZhbHVlXG4gICAgIyBAcGFyYW0gW0Jvb2xlYW5dICAgICAgICAgIHN0cmljdCAgICAgIElmIHNldCB0byBmYWxzZSwgYWNjZXB0ICd5ZXMnIGFuZCAnbm8nIGFzIGJvb2xlYW4gdmFsdWVzXG4gICAgI1xuICAgICMgQHJldHVybiBbQm9vbGVhbl0gICAgICAgICB0aGUgYm9vbGVhbiB2YWx1ZVxuICAgICNcbiAgICBAcGFyc2VCb29sZWFuOiAoaW5wdXQsIHN0cmljdCA9IHRydWUpIC0+XG4gICAgICAgIGlmIHR5cGVvZihpbnB1dCkgaXMgJ3N0cmluZydcbiAgICAgICAgICAgIGxvd2VySW5wdXQgPSBpbnB1dC50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgICBpZiBub3Qgc3RyaWN0XG4gICAgICAgICAgICAgICAgaWYgbG93ZXJJbnB1dCBpcyAnbm8nIHRoZW4gcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICBpZiBsb3dlcklucHV0IGlzICcwJyB0aGVuIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgaWYgbG93ZXJJbnB1dCBpcyAnZmFsc2UnIHRoZW4gcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICBpZiBsb3dlcklucHV0IGlzICcnIHRoZW4gcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICByZXR1cm4gISFpbnB1dFxuXG5cblxuICAgICMgUmV0dXJucyB0cnVlIGlmIGlucHV0IGlzIG51bWVyaWNcbiAgICAjXG4gICAgIyBAcGFyYW0gW09iamVjdF0gaW5wdXQgVGhlIHZhbHVlIHRvIHRlc3RcbiAgICAjXG4gICAgIyBAcmV0dXJuIFtCb29sZWFuXSB0cnVlIGlmIGlucHV0IGlzIG51bWVyaWNcbiAgICAjXG4gICAgQGlzTnVtZXJpYzogKGlucHV0KSAtPlxuICAgICAgICBAUkVHRVhfU1BBQ0VTLmxhc3RJbmRleCA9IDBcbiAgICAgICAgcmV0dXJuIHR5cGVvZihpbnB1dCkgaXMgJ251bWJlcicgb3IgdHlwZW9mKGlucHV0KSBpcyAnc3RyaW5nJyBhbmQgIWlzTmFOKGlucHV0KSBhbmQgaW5wdXQucmVwbGFjZShAUkVHRVhfU1BBQ0VTLCAnJykgaXNudCAnJ1xuXG5cbiAgICAjIFJldHVybnMgYSBwYXJzZWQgZGF0ZSBmcm9tIHRoZSBnaXZlbiBzdHJpbmdcbiAgICAjXG4gICAgIyBAcGFyYW0gW1N0cmluZ10gc3RyIFRoZSBkYXRlIHN0cmluZyB0byBwYXJzZVxuICAgICNcbiAgICAjIEByZXR1cm4gW0RhdGVdIFRoZSBwYXJzZWQgZGF0ZSBvciBudWxsIGlmIHBhcnNpbmcgZmFpbGVkXG4gICAgI1xuICAgIEBzdHJpbmdUb0RhdGU6IChzdHIpIC0+XG4gICAgICAgIHVubGVzcyBzdHI/Lmxlbmd0aFxuICAgICAgICAgICAgcmV0dXJuIG51bGxcblxuICAgICAgICAjIFBlcmZvcm0gcmVndWxhciBleHByZXNzaW9uIHBhdHRlcm5cbiAgICAgICAgaW5mbyA9IEBQQVRURVJOX0RBVEUuZXhlYyBzdHJcbiAgICAgICAgdW5sZXNzIGluZm9cbiAgICAgICAgICAgIHJldHVybiBudWxsXG5cbiAgICAgICAgIyBFeHRyYWN0IHllYXIsIG1vbnRoLCBkYXlcbiAgICAgICAgeWVhciA9IHBhcnNlSW50IGluZm8ueWVhciwgMTBcbiAgICAgICAgbW9udGggPSBwYXJzZUludChpbmZvLm1vbnRoLCAxMCkgLSAxICMgSW4gamF2YXNjcmlwdCwgamFudWFyeSBpcyAwLCBmZWJydWFyeSAxLCBldGMuLi5cbiAgICAgICAgZGF5ID0gcGFyc2VJbnQgaW5mby5kYXksIDEwXG5cbiAgICAgICAgIyBJZiBubyBob3VyIGlzIGdpdmVuLCByZXR1cm4gYSBkYXRlIHdpdGggZGF5IHByZWNpc2lvblxuICAgICAgICB1bmxlc3MgaW5mby5ob3VyP1xuICAgICAgICAgICAgZGF0ZSA9IG5ldyBEYXRlIERhdGUuVVRDKHllYXIsIG1vbnRoLCBkYXkpXG4gICAgICAgICAgICByZXR1cm4gZGF0ZVxuXG4gICAgICAgICMgRXh0cmFjdCBob3VyLCBtaW51dGUsIHNlY29uZFxuICAgICAgICBob3VyID0gcGFyc2VJbnQgaW5mby5ob3VyLCAxMFxuICAgICAgICBtaW51dGUgPSBwYXJzZUludCBpbmZvLm1pbnV0ZSwgMTBcbiAgICAgICAgc2Vjb25kID0gcGFyc2VJbnQgaW5mby5zZWNvbmQsIDEwXG5cbiAgICAgICAgIyBFeHRyYWN0IGZyYWN0aW9uLCBpZiBnaXZlblxuICAgICAgICBpZiBpbmZvLmZyYWN0aW9uP1xuICAgICAgICAgICAgZnJhY3Rpb24gPSBpbmZvLmZyYWN0aW9uWzAuLi4zXVxuICAgICAgICAgICAgd2hpbGUgZnJhY3Rpb24ubGVuZ3RoIDwgM1xuICAgICAgICAgICAgICAgIGZyYWN0aW9uICs9ICcwJ1xuICAgICAgICAgICAgZnJhY3Rpb24gPSBwYXJzZUludCBmcmFjdGlvbiwgMTBcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgZnJhY3Rpb24gPSAwXG5cbiAgICAgICAgIyBDb21wdXRlIHRpbWV6b25lIG9mZnNldCBpZiBnaXZlblxuICAgICAgICBpZiBpbmZvLnR6P1xuICAgICAgICAgICAgdHpfaG91ciA9IHBhcnNlSW50IGluZm8udHpfaG91ciwgMTBcbiAgICAgICAgICAgIGlmIGluZm8udHpfbWludXRlP1xuICAgICAgICAgICAgICAgIHR6X21pbnV0ZSA9IHBhcnNlSW50IGluZm8udHpfbWludXRlLCAxMFxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHR6X21pbnV0ZSA9IDBcblxuICAgICAgICAgICAgIyBDb21wdXRlIHRpbWV6b25lIGRlbHRhIGluIG1zXG4gICAgICAgICAgICB0el9vZmZzZXQgPSAodHpfaG91ciAqIDYwICsgdHpfbWludXRlKSAqIDYwMDAwXG4gICAgICAgICAgICBpZiAnLScgaXMgaW5mby50el9zaWduXG4gICAgICAgICAgICAgICAgdHpfb2Zmc2V0ICo9IC0xXG5cbiAgICAgICAgIyBDb21wdXRlIGRhdGVcbiAgICAgICAgZGF0ZSA9IG5ldyBEYXRlIERhdGUuVVRDKHllYXIsIG1vbnRoLCBkYXksIGhvdXIsIG1pbnV0ZSwgc2Vjb25kLCBmcmFjdGlvbilcbiAgICAgICAgaWYgdHpfb2Zmc2V0XG4gICAgICAgICAgICBkYXRlLnNldFRpbWUgZGF0ZS5nZXRUaW1lKCkgKyB0el9vZmZzZXRcblxuICAgICAgICByZXR1cm4gZGF0ZVxuXG5cbiAgICAjIFJlcGVhdHMgdGhlIGdpdmVuIHN0cmluZyBhIG51bWJlciBvZiB0aW1lc1xuICAgICNcbiAgICAjIEBwYXJhbSBbU3RyaW5nXSAgIHN0ciAgICAgVGhlIHN0cmluZyB0byByZXBlYXRcbiAgICAjIEBwYXJhbSBbSW50ZWdlcl0gIG51bWJlciAgVGhlIG51bWJlciBvZiB0aW1lcyB0byByZXBlYXQgdGhlIHN0cmluZ1xuICAgICNcbiAgICAjIEByZXR1cm4gW1N0cmluZ10gIFRoZSByZXBlYXRlZCBzdHJpbmdcbiAgICAjXG4gICAgQHN0clJlcGVhdDogKHN0ciwgbnVtYmVyKSAtPlxuICAgICAgICByZXMgPSAnJ1xuICAgICAgICBpID0gMFxuICAgICAgICB3aGlsZSBpIDwgbnVtYmVyXG4gICAgICAgICAgICByZXMgKz0gc3RyXG4gICAgICAgICAgICBpKytcbiAgICAgICAgcmV0dXJuIHJlc1xuXG5cbiAgICAjIFJlYWRzIHRoZSBkYXRhIGZyb20gdGhlIGdpdmVuIGZpbGUgcGF0aCBhbmQgcmV0dXJucyB0aGUgcmVzdWx0IGFzIHN0cmluZ1xuICAgICNcbiAgICAjIEBwYXJhbSBbU3RyaW5nXSAgIHBhdGggICAgICAgIFRoZSBwYXRoIHRvIHRoZSBmaWxlXG4gICAgIyBAcGFyYW0gW0Z1bmN0aW9uXSBjYWxsYmFjayAgICBBIGNhbGxiYWNrIHRvIHJlYWQgZmlsZSBhc3luY2hyb25vdXNseSAob3B0aW9uYWwpXG4gICAgI1xuICAgICMgQHJldHVybiBbU3RyaW5nXSAgVGhlIHJlc3VsdGluZyBkYXRhIGFzIHN0cmluZ1xuICAgICNcbiAgICBAZ2V0U3RyaW5nRnJvbUZpbGU6IChwYXRoLCBjYWxsYmFjayA9IG51bGwpIC0+XG4gICAgICAgIHhociA9IG51bGxcbiAgICAgICAgaWYgd2luZG93P1xuICAgICAgICAgICAgaWYgd2luZG93LlhNTEh0dHBSZXF1ZXN0XG4gICAgICAgICAgICAgICAgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KClcbiAgICAgICAgICAgIGVsc2UgaWYgd2luZG93LkFjdGl2ZVhPYmplY3RcbiAgICAgICAgICAgICAgICBmb3IgbmFtZSBpbiBbXCJNc3htbDIuWE1MSFRUUC42LjBcIiwgXCJNc3htbDIuWE1MSFRUUC4zLjBcIiwgXCJNc3htbDIuWE1MSFRUUFwiLCBcIk1pY3Jvc29mdC5YTUxIVFRQXCJdXG4gICAgICAgICAgICAgICAgICAgIHRyeVxuICAgICAgICAgICAgICAgICAgICAgICAgeGhyID0gbmV3IEFjdGl2ZVhPYmplY3QobmFtZSlcblxuICAgICAgICBpZiB4aHI/XG4gICAgICAgICAgICAjIEJyb3dzZXJcbiAgICAgICAgICAgIGlmIGNhbGxiYWNrP1xuICAgICAgICAgICAgICAgICMgQXN5bmNcbiAgICAgICAgICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gLT5cbiAgICAgICAgICAgICAgICAgICAgaWYgeGhyLnJlYWR5U3RhdGUgaXMgNFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgeGhyLnN0YXR1cyBpcyAyMDAgb3IgeGhyLnN0YXR1cyBpcyAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soeGhyLnJlc3BvbnNlVGV4dClcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsKVxuICAgICAgICAgICAgICAgIHhoci5vcGVuICdHRVQnLCBwYXRoLCB0cnVlXG4gICAgICAgICAgICAgICAgeGhyLnNlbmQgbnVsbFxuICAgICAgICAgICAgXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgIyBTeW5jXG4gICAgICAgICAgICAgICAgeGhyLm9wZW4gJ0dFVCcsIHBhdGgsIGZhbHNlXG4gICAgICAgICAgICAgICAgeGhyLnNlbmQgbnVsbFxuXG4gICAgICAgICAgICAgICAgaWYgeGhyLnN0YXR1cyBpcyAyMDAgb3IgeGhyLnN0YXR1cyA9PSAwXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB4aHIucmVzcG9uc2VUZXh0XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICBlbHNlXG4gICAgICAgICAgICAjIE5vZGUuanMtbGlrZVxuICAgICAgICAgICAgcmVxID0gcmVxdWlyZVxuICAgICAgICAgICAgZnMgPSByZXEoJ2ZzJykgIyBQcmV2ZW50IGJyb3dzZXJpZnkgZnJvbSB0cnlpbmcgdG8gbG9hZCAnZnMnIG1vZHVsZVxuICAgICAgICAgICAgaWYgY2FsbGJhY2s/XG4gICAgICAgICAgICAgICAgIyBBc3luY1xuICAgICAgICAgICAgICAgIGZzLnJlYWRGaWxlIHBhdGgsIChlcnIsIGRhdGEpIC0+XG4gICAgICAgICAgICAgICAgICAgIGlmIGVyclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sgbnVsbFxuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayBTdHJpbmcoZGF0YSlcblxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICMgU3luY1xuICAgICAgICAgICAgICAgIGRhdGEgPSBmcy5yZWFkRmlsZVN5bmMgcGF0aFxuICAgICAgICAgICAgICAgIGlmIGRhdGE/XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBTdHJpbmcoZGF0YSlcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbFxuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBVdGlsc1xuIiwiXG5QYXJzZXIgPSByZXF1aXJlICcuL1BhcnNlcidcbkR1bXBlciA9IHJlcXVpcmUgJy4vRHVtcGVyJ1xuVXRpbHMgID0gcmVxdWlyZSAnLi9VdGlscydcblxuIyBZYW1sIG9mZmVycyBjb252ZW5pZW5jZSBtZXRob2RzIHRvIGxvYWQgYW5kIGR1bXAgWUFNTC5cbiNcbmNsYXNzIFlhbWxcblxuICAgICMgUGFyc2VzIFlBTUwgaW50byBhIEphdmFTY3JpcHQgb2JqZWN0LlxuICAgICNcbiAgICAjIFRoZSBwYXJzZSBtZXRob2QsIHdoZW4gc3VwcGxpZWQgd2l0aCBhIFlBTUwgc3RyaW5nLFxuICAgICMgd2lsbCBkbyBpdHMgYmVzdCB0byBjb252ZXJ0IFlBTUwgaW4gYSBmaWxlIGludG8gYSBKYXZhU2NyaXB0IG9iamVjdC5cbiAgICAjXG4gICAgIyAgVXNhZ2U6XG4gICAgIyAgICAgbXlPYmplY3QgPSBZYW1sLnBhcnNlKCdzb21lOiB5YW1sJyk7XG4gICAgIyAgICAgY29uc29sZS5sb2cobXlPYmplY3QpO1xuICAgICNcbiAgICAjIEBwYXJhbSBbU3RyaW5nXSAgIGlucHV0ICAgICAgICAgICAgICAgICAgIEEgc3RyaW5nIGNvbnRhaW5pbmcgWUFNTFxuICAgICMgQHBhcmFtIFtCb29sZWFuXSAgZXhjZXB0aW9uT25JbnZhbGlkVHlwZSAgdHJ1ZSBpZiBhbiBleGNlcHRpb24gbXVzdCBiZSB0aHJvd24gb24gaW52YWxpZCB0eXBlcywgZmFsc2Ugb3RoZXJ3aXNlXG4gICAgIyBAcGFyYW0gW0Z1bmN0aW9uXSBvYmplY3REZWNvZGVyICAgICAgICAgICBBIGZ1bmN0aW9uIHRvIGRlc2VyaWFsaXplIGN1c3RvbSBvYmplY3RzLCBudWxsIG90aGVyd2lzZVxuICAgICNcbiAgICAjIEByZXR1cm4gW09iamVjdF0gIFRoZSBZQU1MIGNvbnZlcnRlZCB0byBhIEphdmFTY3JpcHQgb2JqZWN0XG4gICAgI1xuICAgICMgQHRocm93IFtQYXJzZUV4Y2VwdGlvbl0gSWYgdGhlIFlBTUwgaXMgbm90IHZhbGlkXG4gICAgI1xuICAgIEBwYXJzZTogKGlucHV0LCBleGNlcHRpb25PbkludmFsaWRUeXBlID0gZmFsc2UsIG9iamVjdERlY29kZXIgPSBudWxsKSAtPlxuICAgICAgICByZXR1cm4gbmV3IFBhcnNlcigpLnBhcnNlKGlucHV0LCBleGNlcHRpb25PbkludmFsaWRUeXBlLCBvYmplY3REZWNvZGVyKVxuXG5cbiAgICAjIFBhcnNlcyBZQU1MIGZyb20gZmlsZSBwYXRoIGludG8gYSBKYXZhU2NyaXB0IG9iamVjdC5cbiAgICAjXG4gICAgIyBUaGUgcGFyc2VGaWxlIG1ldGhvZCwgd2hlbiBzdXBwbGllZCB3aXRoIGEgWUFNTCBmaWxlLFxuICAgICMgd2lsbCBkbyBpdHMgYmVzdCB0byBjb252ZXJ0IFlBTUwgaW4gYSBmaWxlIGludG8gYSBKYXZhU2NyaXB0IG9iamVjdC5cbiAgICAjXG4gICAgIyAgVXNhZ2U6XG4gICAgIyAgICAgbXlPYmplY3QgPSBZYW1sLnBhcnNlRmlsZSgnY29uZmlnLnltbCcpO1xuICAgICMgICAgIGNvbnNvbGUubG9nKG15T2JqZWN0KTtcbiAgICAjXG4gICAgIyBAcGFyYW0gW1N0cmluZ10gICBwYXRoICAgICAgICAgICAgICAgICAgICBBIGZpbGUgcGF0aCBwb2ludGluZyB0byBhIHZhbGlkIFlBTUwgZmlsZVxuICAgICMgQHBhcmFtIFtCb29sZWFuXSAgZXhjZXB0aW9uT25JbnZhbGlkVHlwZSAgdHJ1ZSBpZiBhbiBleGNlcHRpb24gbXVzdCBiZSB0aHJvd24gb24gaW52YWxpZCB0eXBlcywgZmFsc2Ugb3RoZXJ3aXNlXG4gICAgIyBAcGFyYW0gW0Z1bmN0aW9uXSBvYmplY3REZWNvZGVyICAgICAgICAgICBBIGZ1bmN0aW9uIHRvIGRlc2VyaWFsaXplIGN1c3RvbSBvYmplY3RzLCBudWxsIG90aGVyd2lzZVxuICAgICNcbiAgICAjIEByZXR1cm4gW09iamVjdF0gIFRoZSBZQU1MIGNvbnZlcnRlZCB0byBhIEphdmFTY3JpcHQgb2JqZWN0IG9yIG51bGwgaWYgdGhlIGZpbGUgZG9lc24ndCBleGlzdC5cbiAgICAjXG4gICAgIyBAdGhyb3cgW1BhcnNlRXhjZXB0aW9uXSBJZiB0aGUgWUFNTCBpcyBub3QgdmFsaWRcbiAgICAjXG4gICAgQHBhcnNlRmlsZTogKHBhdGgsIGNhbGxiYWNrID0gbnVsbCwgZXhjZXB0aW9uT25JbnZhbGlkVHlwZSA9IGZhbHNlLCBvYmplY3REZWNvZGVyID0gbnVsbCkgLT5cbiAgICAgICAgaWYgY2FsbGJhY2s/XG4gICAgICAgICAgICAjIEFzeW5jXG4gICAgICAgICAgICBVdGlscy5nZXRTdHJpbmdGcm9tRmlsZSBwYXRoLCAoaW5wdXQpID0+XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gbnVsbFxuICAgICAgICAgICAgICAgIGlmIGlucHV0P1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBAcGFyc2UgaW5wdXQsIGV4Y2VwdGlvbk9uSW52YWxpZFR5cGUsIG9iamVjdERlY29kZXJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayByZXN1bHRcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgIyBTeW5jXG4gICAgICAgICAgICBpbnB1dCA9IFV0aWxzLmdldFN0cmluZ0Zyb21GaWxlIHBhdGhcbiAgICAgICAgICAgIGlmIGlucHV0P1xuICAgICAgICAgICAgICAgIHJldHVybiBAcGFyc2UgaW5wdXQsIGV4Y2VwdGlvbk9uSW52YWxpZFR5cGUsIG9iamVjdERlY29kZXJcbiAgICAgICAgICAgIHJldHVybiBudWxsXG5cblxuICAgICMgRHVtcHMgYSBKYXZhU2NyaXB0IG9iamVjdCB0byBhIFlBTUwgc3RyaW5nLlxuICAgICNcbiAgICAjIFRoZSBkdW1wIG1ldGhvZCwgd2hlbiBzdXBwbGllZCB3aXRoIGFuIG9iamVjdCwgd2lsbCBkbyBpdHMgYmVzdFxuICAgICMgdG8gY29udmVydCB0aGUgb2JqZWN0IGludG8gZnJpZW5kbHkgWUFNTC5cbiAgICAjXG4gICAgIyBAcGFyYW0gW09iamVjdF0gICBpbnB1dCAgICAgICAgICAgICAgICAgICBKYXZhU2NyaXB0IG9iamVjdFxuICAgICMgQHBhcmFtIFtJbnRlZ2VyXSAgaW5saW5lICAgICAgICAgICAgICAgICAgVGhlIGxldmVsIHdoZXJlIHlvdSBzd2l0Y2ggdG8gaW5saW5lIFlBTUxcbiAgICAjIEBwYXJhbSBbSW50ZWdlcl0gIGluZGVudCAgICAgICAgICAgICAgICAgIFRoZSBhbW91bnQgb2Ygc3BhY2VzIHRvIHVzZSBmb3IgaW5kZW50YXRpb24gb2YgbmVzdGVkIG5vZGVzLlxuICAgICMgQHBhcmFtIFtCb29sZWFuXSAgZXhjZXB0aW9uT25JbnZhbGlkVHlwZSAgdHJ1ZSBpZiBhbiBleGNlcHRpb24gbXVzdCBiZSB0aHJvd24gb24gaW52YWxpZCB0eXBlcyAoYSBKYXZhU2NyaXB0IHJlc291cmNlIG9yIG9iamVjdCksIGZhbHNlIG90aGVyd2lzZVxuICAgICMgQHBhcmFtIFtGdW5jdGlvbl0gb2JqZWN0RW5jb2RlciAgICAgICAgICAgQSBmdW5jdGlvbiB0byBzZXJpYWxpemUgY3VzdG9tIG9iamVjdHMsIG51bGwgb3RoZXJ3aXNlXG4gICAgI1xuICAgICMgQHJldHVybiBbU3RyaW5nXSAgQSBZQU1MIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIG9yaWdpbmFsIEphdmFTY3JpcHQgb2JqZWN0XG4gICAgI1xuICAgIEBkdW1wOiAoaW5wdXQsIGlubGluZSA9IDIsIGluZGVudCA9IDQsIGV4Y2VwdGlvbk9uSW52YWxpZFR5cGUgPSBmYWxzZSwgb2JqZWN0RW5jb2RlciA9IG51bGwpIC0+XG4gICAgICAgIHlhbWwgPSBuZXcgRHVtcGVyKClcbiAgICAgICAgeWFtbC5pbmRlbnRhdGlvbiA9IGluZGVudFxuXG4gICAgICAgIHJldHVybiB5YW1sLmR1bXAoaW5wdXQsIGlubGluZSwgMCwgZXhjZXB0aW9uT25JbnZhbGlkVHlwZSwgb2JqZWN0RW5jb2RlcilcblxuXG4gICAgIyBSZWdpc3RlcnMgLnltbCBleHRlbnNpb24gdG8gd29yayB3aXRoIG5vZGUncyByZXF1aXJlKCkgZnVuY3Rpb24uXG4gICAgI1xuICAgIEByZWdpc3RlcjogLT5cbiAgICAgICAgcmVxdWlyZV9oYW5kbGVyID0gKG1vZHVsZSwgZmlsZW5hbWUpIC0+XG4gICAgICAgICAgICAjIEZpbGwgaW4gcmVzdWx0XG4gICAgICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IFlBTUwucGFyc2VGaWxlIGZpbGVuYW1lXG5cbiAgICAgICAgIyBSZWdpc3RlciByZXF1aXJlIGV4dGVuc2lvbnMgb25seSBpZiB3ZSdyZSBvbiBub2RlLmpzXG4gICAgICAgICMgaGFjayBmb3IgYnJvd3NlcmlmeVxuICAgICAgICBpZiByZXF1aXJlPy5leHRlbnNpb25zP1xuICAgICAgICAgICAgcmVxdWlyZS5leHRlbnNpb25zWycueW1sJ10gPSByZXF1aXJlX2hhbmRsZXJcbiAgICAgICAgICAgIHJlcXVpcmUuZXh0ZW5zaW9uc1snLnlhbWwnXSA9IHJlcXVpcmVfaGFuZGxlclxuXG5cbiAgICAjIEFsaWFzIG9mIGR1bXAoKSBtZXRob2QgZm9yIGNvbXBhdGliaWxpdHkgcmVhc29ucy5cbiAgICAjXG4gICAgQHN0cmluZ2lmeTogKGlucHV0LCBpbmxpbmUsIGluZGVudCwgZXhjZXB0aW9uT25JbnZhbGlkVHlwZSwgb2JqZWN0RW5jb2RlcikgLT5cbiAgICAgICAgcmV0dXJuIEBkdW1wIGlucHV0LCBpbmxpbmUsIGluZGVudCwgZXhjZXB0aW9uT25JbnZhbGlkVHlwZSwgb2JqZWN0RW5jb2RlclxuXG5cbiAgICAjIEFsaWFzIG9mIHBhcnNlRmlsZSgpIG1ldGhvZCBmb3IgY29tcGF0aWJpbGl0eSByZWFzb25zLlxuICAgICNcbiAgICBAbG9hZDogKHBhdGgsIGNhbGxiYWNrLCBleGNlcHRpb25PbkludmFsaWRUeXBlLCBvYmplY3REZWNvZGVyKSAtPlxuICAgICAgICByZXR1cm4gQHBhcnNlRmlsZSBwYXRoLCBjYWxsYmFjaywgZXhjZXB0aW9uT25JbnZhbGlkVHlwZSwgb2JqZWN0RGVjb2RlclxuXG5cbiMgRXhwb3NlIFlBTUwgbmFtZXNwYWNlIHRvIGJyb3dzZXJcbndpbmRvdz8uWUFNTCA9IFlhbWxcblxuIyBOb3QgaW4gdGhlIGJyb3dzZXI/XG51bmxlc3Mgd2luZG93P1xuICAgIEBZQU1MID0gWWFtbFxuXG5tb2R1bGUuZXhwb3J0cyA9IFlhbWxcbiJdfQ==
