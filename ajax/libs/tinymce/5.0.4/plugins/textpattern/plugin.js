/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 *
 * Version: 5.0.4 (2019-04-23)
 */
(function () {
var textpattern = (function (domGlobals) {
    'use strict';

    var Cell = function (initial) {
      var value = initial;
      var get = function () {
        return value;
      };
      var set = function (v) {
        value = v;
      };
      var clone = function () {
        return Cell(get());
      };
      return {
        get: get,
        set: set,
        clone: clone
      };
    };

    var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

    var noop = function () {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
    };
    var constant = function (value) {
      return function () {
        return value;
      };
    };
    var identity = function (x) {
      return x;
    };
    var die = function (msg) {
      return function () {
        throw new Error(msg);
      };
    };
    var never = constant(false);
    var always = constant(true);

    var never$1 = never;
    var always$1 = always;
    var none = function () {
      return NONE;
    };
    var NONE = function () {
      var eq = function (o) {
        return o.isNone();
      };
      var call = function (thunk) {
        return thunk();
      };
      var id = function (n) {
        return n;
      };
      var noop = function () {
      };
      var nul = function () {
        return null;
      };
      var undef = function () {
        return undefined;
      };
      var me = {
        fold: function (n, s) {
          return n();
        },
        is: never$1,
        isSome: never$1,
        isNone: always$1,
        getOr: id,
        getOrThunk: call,
        getOrDie: function (msg) {
          throw new Error(msg || 'error: getOrDie called on none.');
        },
        getOrNull: nul,
        getOrUndefined: undef,
        or: id,
        orThunk: call,
        map: none,
        ap: none,
        each: noop,
        bind: none,
        flatten: none,
        exists: never$1,
        forall: always$1,
        filter: none,
        equals: eq,
        equals_: eq,
        toArray: function () {
          return [];
        },
        toString: constant('none()')
      };
      if (Object.freeze)
        Object.freeze(me);
      return me;
    }();
    var some = function (a) {
      var constant_a = function () {
        return a;
      };
      var self = function () {
        return me;
      };
      var map = function (f) {
        return some(f(a));
      };
      var bind = function (f) {
        return f(a);
      };
      var me = {
        fold: function (n, s) {
          return s(a);
        },
        is: function (v) {
          return a === v;
        },
        isSome: always$1,
        isNone: never$1,
        getOr: constant_a,
        getOrThunk: constant_a,
        getOrDie: constant_a,
        getOrNull: constant_a,
        getOrUndefined: constant_a,
        or: self,
        orThunk: self,
        map: map,
        ap: function (optfab) {
          return optfab.fold(none, function (fab) {
            return some(fab(a));
          });
        },
        each: function (f) {
          f(a);
        },
        bind: bind,
        flatten: constant_a,
        exists: bind,
        forall: bind,
        filter: function (f) {
          return f(a) ? me : NONE;
        },
        equals: function (o) {
          return o.is(a);
        },
        equals_: function (o, elementEq) {
          return o.fold(never$1, function (b) {
            return elementEq(a, b);
          });
        },
        toArray: function () {
          return [a];
        },
        toString: function () {
          return 'some(' + a + ')';
        }
      };
      return me;
    };
    var from = function (value) {
      return value === null || value === undefined ? NONE : some(value);
    };
    var Option = {
      some: some,
      none: none,
      from: from
    };

    var typeOf = function (x) {
      if (x === null)
        return 'null';
      var t = typeof x;
      if (t === 'object' && Array.prototype.isPrototypeOf(x))
        return 'array';
      if (t === 'object' && String.prototype.isPrototypeOf(x))
        return 'string';
      return t;
    };
    var isType = function (type) {
      return function (value) {
        return typeOf(value) === type;
      };
    };
    var isString = isType('string');
    var isObject = isType('object');
    var isArray = isType('array');
    var isFunction = isType('function');

    var rawIndexOf = function () {
      var pIndexOf = Array.prototype.indexOf;
      var fastIndex = function (xs, x) {
        return pIndexOf.call(xs, x);
      };
      var slowIndex = function (xs, x) {
        return slowIndexOf(xs, x);
      };
      return pIndexOf === undefined ? slowIndex : fastIndex;
    }();
    var contains = function (xs, x) {
      return rawIndexOf(xs, x) > -1;
    };
    var map = function (xs, f) {
      var len = xs.length;
      var r = new Array(len);
      for (var i = 0; i < len; i++) {
        var x = xs[i];
        r[i] = f(x, i, xs);
      }
      return r;
    };
    var each = function (xs, f) {
      for (var i = 0, len = xs.length; i < len; i++) {
        var x = xs[i];
        f(x, i, xs);
      }
    };
    var filter = function (xs, pred) {
      var r = [];
      for (var i = 0, len = xs.length; i < len; i++) {
        var x = xs[i];
        if (pred(x, i, xs)) {
          r.push(x);
        }
      }
      return r;
    };
    var foldl = function (xs, f, acc) {
      each(xs, function (x) {
        acc = f(acc, x);
      });
      return acc;
    };
    var slowIndexOf = function (xs, x) {
      for (var i = 0, len = xs.length; i < len; ++i) {
        if (xs[i] === x) {
          return i;
        }
      }
      return -1;
    };
    var forall = function (xs, pred) {
      for (var i = 0, len = xs.length; i < len; ++i) {
        var x = xs[i];
        if (pred(x, i, xs) !== true) {
          return false;
        }
      }
      return true;
    };
    var slice = Array.prototype.slice;
    var sort = function (xs, comparator) {
      var copy = slice.call(xs, 0);
      copy.sort(comparator);
      return copy;
    };
    var head = function (xs) {
      return xs.length === 0 ? Option.none() : Option.some(xs[0]);
    };
    var from$1 = isFunction(Array.from) ? Array.from : function (x) {
      return slice.call(x);
    };

    var keys = Object.keys;
    var hasOwnProperty = Object.hasOwnProperty;
    var get = function (obj, key) {
      return has(obj, key) ? Option.from(obj[key]) : Option.none();
    };
    var has = function (obj, key) {
      return hasOwnProperty.call(obj, key);
    };

    var generate = function (cases) {
      if (!isArray(cases)) {
        throw new Error('cases must be an array');
      }
      if (cases.length === 0) {
        throw new Error('there must be at least one case');
      }
      var constructors = [];
      var adt = {};
      each(cases, function (acase, count) {
        var keys$1 = keys(acase);
        if (keys$1.length !== 1) {
          throw new Error('one and only one name per case');
        }
        var key = keys$1[0];
        var value = acase[key];
        if (adt[key] !== undefined) {
          throw new Error('duplicate key detected:' + key);
        } else if (key === 'cata') {
          throw new Error('cannot have a case named cata (sorry)');
        } else if (!isArray(value)) {
          throw new Error('case arguments must be an array');
        }
        constructors.push(key);
        adt[key] = function () {
          var argLength = arguments.length;
          if (argLength !== value.length) {
            throw new Error('Wrong number of arguments to case ' + key + '. Expected ' + value.length + ' (' + value + '), got ' + argLength);
          }
          var args = new Array(argLength);
          for (var i = 0; i < args.length; i++)
            args[i] = arguments[i];
          var match = function (branches) {
            var branchKeys = keys(branches);
            if (constructors.length !== branchKeys.length) {
              throw new Error('Wrong number of arguments to match. Expected: ' + constructors.join(',') + '\nActual: ' + branchKeys.join(','));
            }
            var allReqd = forall(constructors, function (reqKey) {
              return contains(branchKeys, reqKey);
            });
            if (!allReqd)
              throw new Error('Not all branches were specified when using match. Specified: ' + branchKeys.join(', ') + '\nRequired: ' + constructors.join(', '));
            return branches[key].apply(null, args);
          };
          return {
            fold: function () {
              if (arguments.length !== cases.length) {
                throw new Error('Wrong number of arguments to fold. Expected ' + cases.length + ', got ' + arguments.length);
              }
              var target = arguments[count];
              return target.apply(null, args);
            },
            match: match,
            log: function (label) {
              domGlobals.console.log(label, {
                constructors: constructors,
                constructor: key,
                params: args
              });
            }
          };
        };
      });
      return adt;
    };
    var Adt = { generate: generate };

    var comparison = Adt.generate([
      {
        bothErrors: [
          'error1',
          'error2'
        ]
      },
      {
        firstError: [
          'error1',
          'value2'
        ]
      },
      {
        secondError: [
          'value1',
          'error2'
        ]
      },
      {
        bothValues: [
          'value1',
          'value2'
        ]
      }
    ]);
    var partition = function (results) {
      var errors = [];
      var values = [];
      each(results, function (result) {
        result.fold(function (err) {
          errors.push(err);
        }, function (value) {
          values.push(value);
        });
      });
      return {
        errors: errors,
        values: values
      };
    };

    var value = function (o) {
      var is = function (v) {
        return o === v;
      };
      var or = function (opt) {
        return value(o);
      };
      var orThunk = function (f) {
        return value(o);
      };
      var map = function (f) {
        return value(f(o));
      };
      var mapError = function (f) {
        return value(o);
      };
      var each = function (f) {
        f(o);
      };
      var bind = function (f) {
        return f(o);
      };
      var fold = function (_, onValue) {
        return onValue(o);
      };
      var exists = function (f) {
        return f(o);
      };
      var forall = function (f) {
        return f(o);
      };
      var toOption = function () {
        return Option.some(o);
      };
      return {
        is: is,
        isValue: always,
        isError: never,
        getOr: constant(o),
        getOrThunk: constant(o),
        getOrDie: constant(o),
        or: or,
        orThunk: orThunk,
        fold: fold,
        map: map,
        mapError: mapError,
        each: each,
        bind: bind,
        exists: exists,
        forall: forall,
        toOption: toOption
      };
    };
    var error = function (message) {
      var getOrThunk = function (f) {
        return f();
      };
      var getOrDie = function () {
        return die(String(message))();
      };
      var or = function (opt) {
        return opt;
      };
      var orThunk = function (f) {
        return f();
      };
      var map = function (f) {
        return error(message);
      };
      var mapError = function (f) {
        return error(f(message));
      };
      var bind = function (f) {
        return error(message);
      };
      var fold = function (onError, _) {
        return onError(message);
      };
      return {
        is: never,
        isValue: never,
        isError: always,
        getOr: identity,
        getOrThunk: getOrThunk,
        getOrDie: getOrDie,
        or: or,
        orThunk: orThunk,
        fold: fold,
        map: map,
        mapError: mapError,
        each: noop,
        bind: bind,
        exists: never,
        forall: always,
        toOption: Option.none
      };
    };
    var Result = {
      value: value,
      error: error
    };

    var isInlinePattern = function (pattern) {
      return pattern.type === 'inline-command' || pattern.type === 'inline-format';
    };
    var isBlockPattern = function (pattern) {
      return pattern.type === 'block-command' || pattern.type === 'block-format';
    };
    var sortPatterns = function (patterns) {
      return sort(patterns, function (a, b) {
        if (a.start.length === b.start.length) {
          return 0;
        }
        return a.start.length > b.start.length ? -1 : 1;
      });
    };
    var normalizePattern = function (pattern) {
      var err = function (message) {
        return Result.error({
          message: message,
          pattern: pattern
        });
      };
      var formatOrCmd = function (name, onFormat, onCommand) {
        if (pattern.format !== undefined) {
          var formats = void 0;
          if (isArray(pattern.format)) {
            if (!forall(pattern.format, isString)) {
              return err(name + ' pattern has non-string items in the `format` array');
            }
            formats = pattern.format;
          } else if (isString(pattern.format)) {
            formats = [pattern.format];
          } else {
            return err(name + ' pattern has non-string `format` parameter');
          }
          return Result.value(onFormat(formats));
        } else if (pattern.cmd !== undefined) {
          if (!isString(pattern.cmd)) {
            return err(name + ' pattern has non-string `cmd` parameter');
          }
          return Result.value(onCommand(pattern.cmd, pattern.value));
        } else {
          return err(name + ' pattern is missing both `format` and `cmd` parameters');
        }
      };
      if (!isObject(pattern)) {
        return err('Raw pattern is not an object');
      }
      if (!isString(pattern.start)) {
        return err('Raw pattern is missing `start` parameter');
      }
      if (pattern.end !== undefined) {
        if (!isString(pattern.end)) {
          return err('Inline pattern has non-string `end` parameter');
        }
        if (pattern.start.length === 0 && pattern.end.length === 0) {
          return err('Inline pattern has empty `start` and `end` parameters');
        }
        var start_1 = pattern.start;
        var end_1 = pattern.end;
        if (end_1.length === 0) {
          end_1 = start_1;
          start_1 = '';
        }
        return formatOrCmd('Inline', function (format) {
          return {
            type: 'inline-format',
            start: start_1,
            end: end_1,
            format: format
          };
        }, function (cmd, value) {
          return {
            type: 'inline-command',
            start: start_1,
            end: end_1,
            cmd: cmd,
            value: value
          };
        });
      } else if (pattern.replacement !== undefined) {
        if (!isString(pattern.replacement)) {
          return err('Replacement pattern has non-string `replacement` parameter');
        }
        if (pattern.start.length === 0) {
          return err('Replacement pattern has empty `start` parameter');
        }
        return Result.value({
          type: 'inline-command',
          start: '',
          end: pattern.start,
          cmd: 'mceInsertContent',
          value: pattern.replacement
        });
      } else {
        if (pattern.start.length === 0) {
          return err('Block pattern has empty `start` parameter');
        }
        return formatOrCmd('Block', function (formats) {
          return {
            type: 'block-format',
            start: pattern.start,
            format: formats[0]
          };
        }, function (command, commandValue) {
          return {
            type: 'block-command',
            start: pattern.start,
            cmd: command,
            value: commandValue
          };
        });
      }
    };
    var denormalizePattern = function (pattern) {
      if (pattern.type === 'block-command') {
        return {
          start: pattern.start,
          cmd: pattern.cmd,
          value: pattern.value
        };
      } else if (pattern.type === 'block-format') {
        return {
          start: pattern.start,
          format: pattern.format
        };
      } else if (pattern.type === 'inline-command') {
        if (pattern.cmd === 'mceInsertContent' && pattern.start === '') {
          return {
            start: pattern.end,
            replacement: pattern.value
          };
        } else {
          return {
            start: pattern.start,
            end: pattern.end,
            cmd: pattern.cmd,
            value: pattern.value
          };
        }
      } else if (pattern.type === 'inline-format') {
        return {
          start: pattern.start,
          end: pattern.end,
          format: pattern.format.length === 1 ? pattern.format[0] : pattern.format
        };
      }
    };
    var createPatternSet = function (patterns) {
      return {
        inlinePatterns: filter(patterns, isInlinePattern),
        blockPatterns: sortPatterns(filter(patterns, isBlockPattern))
      };
    };

    var get$1 = function (patternsState) {
      var setPatterns = function (newPatterns) {
        var normalized = partition(map(newPatterns, normalizePattern));
        if (normalized.errors.length > 0) {
          var firstError = normalized.errors[0];
          throw new Error(firstError.message + ':\n' + JSON.stringify(firstError.pattern, null, 2));
        }
        patternsState.set(createPatternSet(normalized.values));
      };
      var getPatterns = function () {
        return map(patternsState.get().inlinePatterns, denormalizePattern).concat(map(patternsState.get().blockPatterns, denormalizePattern));
      };
      return {
        setPatterns: setPatterns,
        getPatterns: getPatterns
      };
    };
    var Api = { get: get$1 };

    var Global = typeof domGlobals.window !== 'undefined' ? domGlobals.window : Function('return this;')();

    var error$1 = function () {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      var console = Global.console;
      if (console) {
        if (console.error) {
          console.error.apply(console, args);
        } else {
          console.log.apply(console, args);
        }
      }
    };
    var defaultPatterns = [
      {
        start: '*',
        end: '*',
        format: 'italic'
      },
      {
        start: '**',
        end: '**',
        format: 'bold'
      },
      {
        start: '#',
        format: 'h1'
      },
      {
        start: '##',
        format: 'h2'
      },
      {
        start: '###',
        format: 'h3'
      },
      {
        start: '####',
        format: 'h4'
      },
      {
        start: '#####',
        format: 'h5'
      },
      {
        start: '######',
        format: 'h6'
      },
      {
        start: '1. ',
        cmd: 'InsertOrderedList'
      },
      {
        start: '* ',
        cmd: 'InsertUnorderedList'
      },
      {
        start: '- ',
        cmd: 'InsertUnorderedList'
      }
    ];
    var getPatternSet = function (editorSettings) {
      var patterns = get(editorSettings, 'textpattern_patterns').getOr(defaultPatterns);
      if (!isArray(patterns)) {
        error$1('The setting textpattern_patterns should be an array');
        return {
          inlinePatterns: [],
          blockPatterns: []
        };
      }
      var normalized = partition(map(patterns, normalizePattern));
      each(normalized.errors, function (err) {
        return error$1(err.message, err.pattern);
      });
      return createPatternSet(normalized.values);
    };

    var global$1 = tinymce.util.Tools.resolve('tinymce.util.Delay');

    var global$2 = tinymce.util.Tools.resolve('tinymce.util.VK');

    var zeroWidth = function () {
      return '\uFEFF';
    };

    var checkRange = function (str, substr, start) {
      if (substr === '')
        return true;
      if (str.length < substr.length)
        return false;
      var x = str.substr(start, start + substr.length);
      return x === substr;
    };
    var startsWith = function (str, prefix) {
      return checkRange(str, prefix, 0);
    };
    var endsWith = function (str, suffix) {
      return checkRange(str, suffix, str.length - suffix.length);
    };

    var global$3 = tinymce.util.Tools.resolve('tinymce.dom.TreeWalker');

    var global$4 = tinymce.util.Tools.resolve('tinymce.util.Tools');

    var ATTRIBUTE = domGlobals.Node.ATTRIBUTE_NODE;
    var CDATA_SECTION = domGlobals.Node.CDATA_SECTION_NODE;
    var COMMENT = domGlobals.Node.COMMENT_NODE;
    var DOCUMENT = domGlobals.Node.DOCUMENT_NODE;
    var DOCUMENT_TYPE = domGlobals.Node.DOCUMENT_TYPE_NODE;
    var DOCUMENT_FRAGMENT = domGlobals.Node.DOCUMENT_FRAGMENT_NODE;
    var ELEMENT = domGlobals.Node.ELEMENT_NODE;
    var TEXT = domGlobals.Node.TEXT_NODE;
    var PROCESSING_INSTRUCTION = domGlobals.Node.PROCESSING_INSTRUCTION_NODE;
    var ENTITY_REFERENCE = domGlobals.Node.ENTITY_REFERENCE_NODE;
    var ENTITY = domGlobals.Node.ENTITY_NODE;
    var NOTATION = domGlobals.Node.NOTATION_NODE;

    var isElement = function (node) {
      return node.nodeType === ELEMENT;
    };
    var isText = function (node) {
      return node.nodeType === TEXT;
    };
    var generatePath = function (root, node, offset) {
      if (offset < 0 || offset > node.data.length) {
        return Option.none();
      }
      var p = [offset];
      var current = node;
      while (current !== root && current.parentNode) {
        var parent = current.parentNode;
        for (var i = 0; i < parent.childNodes.length; i++) {
          if (parent.childNodes[i] === current) {
            p.push(i);
            break;
          }
        }
        current = parent;
      }
      return current === root ? Option.some(p.reverse()) : Option.none();
    };
    var generatePathRange = function (root, startNode, startOffset, endNode, endOffset) {
      return generatePath(root, startNode, startOffset).bind(function (start) {
        return generatePath(root, endNode, endOffset).map(function (end) {
          return {
            start: start,
            end: end
          };
        });
      });
    };
    var resolvePath = function (root, path) {
      var nodePath = path.slice();
      var offset = nodePath.pop();
      return foldl(nodePath, function (optNode, index) {
        return optNode.bind(function (node) {
          return Option.from(node.childNodes[index]);
        });
      }, Option.some(root)).bind(function (node) {
        if (isText(node) && offset >= 0 && offset <= node.data.length) {
          return Option.some({
            node: node,
            offset: offset
          });
        }
        return Option.none();
      });
    };
    var resolvePathRange = function (root, range) {
      return resolvePath(root, range.start).bind(function (_a) {
        var startNode = _a.node, startOffset = _a.offset;
        return resolvePath(root, range.end).map(function (_a) {
          var endNode = _a.node, endOffset = _a.offset;
          return {
            startNode: startNode,
            startOffset: startOffset,
            endNode: endNode,
            endOffset: endOffset
          };
        });
      });
    };

    var findPattern = function (patterns, text) {
      for (var i = 0; i < patterns.length; i++) {
        var pattern = patterns[i];
        if (text.indexOf(pattern.start) !== 0) {
          continue;
        }
        if (pattern.end && text.lastIndexOf(pattern.end) !== text.length - pattern.end.length) {
          continue;
        }
        return pattern;
      }
    };
    var textBefore = function (node, offset, block) {
      if (isText(node) && offset > 0) {
        return Option.some({
          node: node,
          offset: offset
        });
      }
      var startNode;
      if (offset > 0) {
        startNode = node.childNodes[offset - 1];
      } else {
        for (var current = node; current && current !== block && !startNode; current = current.parentNode) {
          startNode = current.previousSibling;
        }
      }
      var tw = new global$3(startNode, block);
      for (var current = tw.current(); current; current = tw.prev()) {
        if (isText(current) && current.length > 0) {
          return Option.some({
            node: current,
            offset: current.length
          });
        }
      }
      return Option.none();
    };
    var findInlinePatternStart = function (dom, pattern, node, offset, block, requireGap) {
      if (requireGap === void 0) {
        requireGap = false;
      }
      if (pattern.start.length === 0 && !requireGap) {
        return Option.some({
          node: node,
          offset: offset
        });
      }
      var sameBlockParent = function (spot) {
        return dom.getParent(spot.node, dom.isBlock) === block;
      };
      return textBefore(node, offset, block).filter(sameBlockParent).bind(function (_a) {
        var node = _a.node, offset = _a.offset;
        var text = node.data.substring(0, offset);
        var startPos = text.lastIndexOf(pattern.start);
        if (startPos === -1) {
          if (text.indexOf(pattern.end) !== -1) {
            return Option.none();
          }
          return findInlinePatternStart(dom, pattern, node, 0, block, requireGap && text.length === 0);
        }
        if (text.indexOf(pattern.end, startPos + pattern.start.length) !== -1) {
          return Option.none();
        }
        if (requireGap && startPos + pattern.start.length === text.length) {
          return Option.none();
        }
        return Option.some({
          node: node,
          offset: startPos
        });
      });
    };
    var findInlinePatternRec = function (dom, patterns, node, offset, block) {
      return textBefore(node, offset, block).bind(function (_a) {
        var endNode = _a.node, endOffset = _a.offset;
        var text = endNode.data.substring(0, endOffset);
        var _loop_1 = function (i) {
          var pattern = patterns[i];
          if (!endsWith(text, pattern.end)) {
            return 'continue';
          }
          var newOffset = endOffset - pattern.end.length;
          var hasContent = pattern.start.length > 0 && pattern.end.length > 0;
          var allowInner = hasContent ? Option.some(true) : Option.none();
          var recursiveMatch = allowInner.bind(function () {
            var patternsWithoutCurrent = patterns.slice();
            patternsWithoutCurrent.splice(i, 1);
            return findInlinePatternRec(dom, patternsWithoutCurrent, endNode, newOffset, block);
          }).fold(function () {
            var start = findInlinePatternStart(dom, pattern, endNode, newOffset, block, hasContent);
            return start.map(function (_a) {
              var startNode = _a.node, startOffset = _a.offset;
              var range = generatePathRange(dom.getRoot(), startNode, startOffset, endNode, endOffset).getOrDie('Internal constraint violation');
              return [{
                  pattern: pattern,
                  range: range
                }];
            });
          }, function (areas) {
            var outermostRange = resolvePathRange(dom.getRoot(), areas[areas.length - 1].range).getOrDie('Internal constraint violation');
            var start = findInlinePatternStart(dom, pattern, outermostRange.startNode, outermostRange.startOffset, block);
            return start.map(function (_a) {
              var startNode = _a.node, startOffset = _a.offset;
              var range = generatePathRange(dom.getRoot(), startNode, startOffset, endNode, endOffset).getOrDie('Internal constraint violation');
              return areas.concat([{
                  pattern: pattern,
                  range: range
                }]);
            });
          });
          if (recursiveMatch.isSome()) {
            return { value: recursiveMatch };
          }
        };
        for (var i = 0; i < patterns.length; i++) {
          var state_1 = _loop_1(i);
          if (typeof state_1 === 'object')
            return state_1.value;
        }
        return Option.none();
      });
    };
    var findNestedInlinePatterns = function (dom, patterns, rng, space) {
      if (rng.collapsed === false) {
        return [];
      }
      var block = dom.getParent(rng.startContainer, dom.isBlock);
      return findInlinePatternRec(dom, patterns, rng.startContainer, rng.startOffset - (space ? 1 : 0), block).getOr([]);
    };
    var findBlockPattern = function (dom, patterns, rng) {
      var block = dom.getParent(rng.startContainer, dom.isBlock);
      if (!(dom.is(block, 'p') && isElement(block))) {
        return Option.none();
      }
      var walker = new global$3(block, block);
      var node;
      var firstTextNode;
      while (node = walker.next()) {
        if (isText(node)) {
          firstTextNode = node;
          break;
        }
      }
      if (!firstTextNode) {
        return Option.none();
      }
      var pattern = findPattern(patterns, firstTextNode.data);
      if (!pattern) {
        return Option.none();
      }
      if (global$4.trim(block.textContent).length === pattern.start.length) {
        return Option.none();
      }
      return Option.some(pattern);
    };

    var unique = 0;
    var generate$1 = function (prefix) {
      var date = new Date();
      var time = date.getTime();
      var random = Math.floor(Math.random() * 1000000000);
      unique++;
      return prefix + '_' + random + unique + String(time);
    };

    var liftN = function (arr, f) {
      var r = [];
      for (var i = 0; i < arr.length; i++) {
        var x = arr[i];
        if (x.isSome()) {
          r.push(x.getOrDie());
        } else {
          return Option.none();
        }
      }
      return Option.some(f.apply(null, r));
    };
    function lift() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      var f = args.pop();
      return liftN(args, f);
    }

    var isCollapsed = function (start, end, root) {
      var walker = new global$3(start, root);
      while (walker.next()) {
        var node = walker.current();
        if (isText(node) && node.data.length === 0) {
          continue;
        }
        return node === end;
      }
      return false;
    };
    var applyInlinePatterns = function (editor, areas) {
      var dom = editor.dom;
      var newMarker = function (id) {
        return dom.create('span', {
          'data-mce-type': 'bookmark',
          'id': id
        });
      };
      var markerRange = function (ids) {
        var start = Option.from(dom.select('#' + ids.start)[0]);
        var end = Option.from(dom.select('#' + ids.end)[0]);
        return lift(start, end, function (start, end) {
          var range = dom.createRng();
          range.setStartAfter(start);
          if (!isCollapsed(start, end, dom.getRoot())) {
            range.setEndBefore(end);
          } else {
            range.collapse(true);
          }
          return range;
        });
      };
      var markerPrefix = generate$1('mce_');
      var markerIds = map(areas, function (_area, i) {
        return {
          start: markerPrefix + '_' + i + '_start',
          end: markerPrefix + '_' + i + '_end'
        };
      });
      var cursor = editor.selection.getBookmark();
      for (var i = areas.length - 1; i >= 0; i--) {
        var _a = areas[i], pattern = _a.pattern, range = _a.range;
        var _b = resolvePath(dom.getRoot(), range.end).getOrDie('Failed to resolve range[' + i + '].end'), endNode = _b.node, endOffset = _b.offset;
        var textOutsideRange = endOffset === 0 ? endNode : endNode.splitText(endOffset);
        textOutsideRange.parentNode.insertBefore(newMarker(markerIds[i].end), textOutsideRange);
        if (pattern.start.length > 0) {
          endNode.deleteData(endOffset - pattern.end.length, pattern.end.length);
        }
      }
      for (var i = 0; i < areas.length; i++) {
        var _c = areas[i], pattern = _c.pattern, range = _c.range;
        var _d = resolvePath(dom.getRoot(), range.start).getOrDie('Failed to resolve range.start'), startNode = _d.node, startOffset = _d.offset;
        var textInsideRange = startOffset === 0 ? startNode : startNode.splitText(startOffset);
        textInsideRange.parentNode.insertBefore(newMarker(markerIds[i].start), textInsideRange);
        if (pattern.start.length > 0) {
          textInsideRange.deleteData(0, pattern.start.length);
        } else {
          textInsideRange.deleteData(0, pattern.end.length);
        }
      }
      var _loop_1 = function (i) {
        var pattern = areas[i].pattern;
        var optRange = markerRange(markerIds[i]);
        optRange.each(function (range) {
          editor.selection.setRng(range);
          if (pattern.type === 'inline-format') {
            pattern.format.forEach(function (format) {
              editor.formatter.apply(format);
            });
          } else {
            editor.execCommand(pattern.cmd, false, pattern.value);
          }
        });
        dom.remove(markerIds[i].start);
        dom.remove(markerIds[i].end);
      };
      for (var i = 0; i < areas.length; i++) {
        _loop_1(i);
      }
      editor.selection.moveToBookmark(cursor);
    };
    var isBlockFormatName = function (name, formatter) {
      var formatSet = formatter.get(name);
      return isArray(formatSet) && head(formatSet).exists(function (format) {
        return has(format, 'block');
      });
    };
    var applyBlockPattern = function (editor, pattern) {
      var dom = editor.dom;
      var rng = editor.selection.getRng();
      var block = dom.getParent(rng.startContainer, dom.isBlock);
      if (!block || !dom.is(block, 'p') || !isElement(block)) {
        return;
      }
      var walker = new global$3(block, block);
      var node;
      var firstTextNode;
      while (node = walker.next()) {
        if (isText(node)) {
          firstTextNode = node;
          break;
        }
      }
      if (!firstTextNode) {
        return;
      }
      if (!startsWith(firstTextNode.data, pattern.start)) {
        return;
      }
      if (global$4.trim(block.textContent).length === pattern.start.length) {
        return;
      }
      var cursor = editor.selection.getBookmark();
      if (pattern.type === 'block-format') {
        if (isBlockFormatName(pattern.format, editor.formatter)) {
          editor.undoManager.transact(function () {
            firstTextNode.deleteData(0, pattern.start.length);
            editor.formatter.apply(pattern.format);
          });
        }
      } else if (pattern.type === 'block-command') {
        editor.undoManager.transact(function () {
          firstTextNode.deleteData(0, pattern.start.length);
          editor.execCommand(pattern.cmd, false, pattern.value);
        });
      }
      editor.selection.moveToBookmark(cursor);
    };

    var handleEnter = function (editor, patternSet) {
      var inlineAreas = findNestedInlinePatterns(editor.dom, patternSet.inlinePatterns, editor.selection.getRng(), false);
      var blockArea = findBlockPattern(editor.dom, patternSet.blockPatterns, editor.selection.getRng());
      if (editor.selection.isCollapsed() && (inlineAreas.length > 0 || blockArea.isSome())) {
        editor.undoManager.add();
        editor.undoManager.extra(function () {
          editor.execCommand('mceInsertNewLine');
        }, function () {
          editor.insertContent(zeroWidth());
          applyInlinePatterns(editor, inlineAreas);
          blockArea.each(function (pattern) {
            return applyBlockPattern(editor, pattern);
          });
          var range = editor.selection.getRng();
          var block = editor.dom.getParent(range.startContainer, editor.dom.isBlock);
          var spot = textBefore(range.startContainer, range.startOffset, block);
          editor.execCommand('mceInsertNewLine');
          spot.each(function (s) {
            if (s.node.data.charAt(s.offset - 1) === zeroWidth()) {
              s.node.deleteData(s.offset - 1, 1);
              if (editor.dom.isEmpty(s.node.parentNode)) {
                editor.dom.remove(s.node.parentNode);
              }
            }
          });
        });
        return true;
      }
      return false;
    };
    var handleInlineKey = function (editor, patternSet) {
      var areas = findNestedInlinePatterns(editor.dom, patternSet.inlinePatterns, editor.selection.getRng(), true);
      if (areas.length > 0) {
        editor.undoManager.transact(function () {
          applyInlinePatterns(editor, areas);
        });
      }
    };
    var checkKeyEvent = function (codes, event, predicate) {
      for (var i = 0; i < codes.length; i++) {
        if (predicate(codes[i], event)) {
          return true;
        }
      }
    };
    var checkKeyCode = function (codes, event) {
      return checkKeyEvent(codes, event, function (code, event) {
        return code === event.keyCode && global$2.modifierPressed(event) === false;
      });
    };
    var checkCharCode = function (chars, event) {
      return checkKeyEvent(chars, event, function (chr, event) {
        return chr.charCodeAt(0) === event.charCode;
      });
    };
    var KeyHandler = {
      handleEnter: handleEnter,
      handleInlineKey: handleInlineKey,
      checkCharCode: checkCharCode,
      checkKeyCode: checkKeyCode
    };

    var setup = function (editor, patternsState) {
      var charCodes = [
        ',',
        '.',
        ';',
        ':',
        '!',
        '?'
      ];
      var keyCodes = [32];
      editor.on('keydown', function (e) {
        if (e.keyCode === 13 && !global$2.modifierPressed(e)) {
          if (KeyHandler.handleEnter(editor, patternsState.get())) {
            e.preventDefault();
          }
        }
      }, true);
      editor.on('keyup', function (e) {
        if (KeyHandler.checkKeyCode(keyCodes, e)) {
          KeyHandler.handleInlineKey(editor, patternsState.get());
        }
      });
      editor.on('keypress', function (e) {
        if (KeyHandler.checkCharCode(charCodes, e)) {
          global$1.setEditorTimeout(editor, function () {
            KeyHandler.handleInlineKey(editor, patternsState.get());
          });
        }
      });
    };
    var Keyboard = { setup: setup };

    global.add('textpattern', function (editor) {
      var patternsState = Cell(getPatternSet(editor.settings));
      Keyboard.setup(editor, patternsState);
      return Api.get(patternsState);
    });
    function Plugin () {
    }

    return Plugin;

}(window));
})();
