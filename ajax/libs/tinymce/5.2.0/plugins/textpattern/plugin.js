/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 *
 * Version: 5.2.0 (2020-02-13)
 */
(function (domGlobals) {
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

    var __assign = function () {
      __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    function __spreadArrays() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++)
        s += arguments[i].length;
      for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
          r[k] = a[j];
      return r;
    }

    var noop = function () {
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
      var me = {
        fold: function (n, s) {
          return n();
        },
        is: never,
        isSome: never,
        isNone: always,
        getOr: id,
        getOrThunk: call,
        getOrDie: function (msg) {
          throw new Error(msg || 'error: getOrDie called on none.');
        },
        getOrNull: constant(null),
        getOrUndefined: constant(undefined),
        or: id,
        orThunk: call,
        map: none,
        each: noop,
        bind: none,
        exists: never,
        forall: always,
        filter: none,
        equals: eq,
        equals_: eq,
        toArray: function () {
          return [];
        },
        toString: constant('none()')
      };
      if (Object.freeze) {
        Object.freeze(me);
      }
      return me;
    }();
    var some = function (a) {
      var constant_a = constant(a);
      var self = function () {
        return me;
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
        isSome: always,
        isNone: never,
        getOr: constant_a,
        getOrThunk: constant_a,
        getOrDie: constant_a,
        getOrNull: constant_a,
        getOrUndefined: constant_a,
        or: self,
        orThunk: self,
        map: function (f) {
          return some(f(a));
        },
        each: function (f) {
          f(a);
        },
        bind: bind,
        exists: bind,
        forall: bind,
        filter: function (f) {
          return f(a) ? me : NONE;
        },
        toArray: function () {
          return [a];
        },
        toString: function () {
          return 'some(' + a + ')';
        },
        equals: function (o) {
          return o.is(a);
        },
        equals_: function (o, elementEq) {
          return o.fold(never, function (b) {
            return elementEq(a, b);
          });
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
      if (x === null) {
        return 'null';
      }
      var t = typeof x;
      if (t === 'object' && (Array.prototype.isPrototypeOf(x) || x.constructor && x.constructor.name === 'Array')) {
        return 'array';
      }
      if (t === 'object' && (String.prototype.isPrototypeOf(x) || x.constructor && x.constructor.name === 'String')) {
        return 'string';
      }
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

    var nativeSlice = Array.prototype.slice;
    var nativeIndexOf = Array.prototype.indexOf;
    var rawIndexOf = function (ts, t) {
      return nativeIndexOf.call(ts, t);
    };
    var contains = function (xs, x) {
      return rawIndexOf(xs, x) > -1;
    };
    var map = function (xs, f) {
      var len = xs.length;
      var r = new Array(len);
      for (var i = 0; i < len; i++) {
        var x = xs[i];
        r[i] = f(x, i);
      }
      return r;
    };
    var each = function (xs, f) {
      for (var i = 0, len = xs.length; i < len; i++) {
        var x = xs[i];
        f(x, i);
      }
    };
    var eachr = function (xs, f) {
      for (var i = xs.length - 1; i >= 0; i--) {
        var x = xs[i];
        f(x, i);
      }
    };
    var filter = function (xs, pred) {
      var r = [];
      for (var i = 0, len = xs.length; i < len; i++) {
        var x = xs[i];
        if (pred(x, i)) {
          r.push(x);
        }
      }
      return r;
    };
    var foldr = function (xs, f, acc) {
      eachr(xs, function (x) {
        acc = f(acc, x);
      });
      return acc;
    };
    var foldl = function (xs, f, acc) {
      each(xs, function (x) {
        acc = f(acc, x);
      });
      return acc;
    };
    var find = function (xs, pred) {
      for (var i = 0, len = xs.length; i < len; i++) {
        var x = xs[i];
        if (pred(x, i)) {
          return Option.some(x);
        }
      }
      return Option.none();
    };
    var forall = function (xs, pred) {
      for (var i = 0, len = xs.length; i < len; ++i) {
        var x = xs[i];
        if (pred(x, i) !== true) {
          return false;
        }
      }
      return true;
    };
    var sort = function (xs, comparator) {
      var copy = nativeSlice.call(xs, 0);
      copy.sort(comparator);
      return copy;
    };
    var head = function (xs) {
      return xs.length === 0 ? Option.none() : Option.some(xs[0]);
    };
    var from$1 = isFunction(Array.from) ? Array.from : function (x) {
      return nativeSlice.call(x);
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
          for (var i = 0; i < args.length; i++) {
            args[i] = arguments[i];
          }
          var match = function (branches) {
            var branchKeys = keys(branches);
            if (constructors.length !== branchKeys.length) {
              throw new Error('Wrong number of arguments to match. Expected: ' + constructors.join(',') + '\nActual: ' + branchKeys.join(','));
            }
            var allReqd = forall(constructors, function (reqKey) {
              return contains(branchKeys, reqKey);
            });
            if (!allReqd) {
              throw new Error('Not all branches were specified when using match. Specified: ' + branchKeys.join(', ') + '\nRequired: ' + constructors.join(', '));
            }
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
    var fromOption = function (opt, err) {
      return opt.fold(function () {
        return error(err);
      }, value);
    };
    var Result = {
      value: value,
      error: error,
      fromOption: fromOption
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
        return __spreadArrays(map(patternsState.get().inlinePatterns, denormalizePattern), map(patternsState.get().blockPatterns, denormalizePattern));
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
    var getForcedRootBlock = function (editor) {
      var block = editor.getParam('forced_root_block', 'p');
      if (block === false) {
        return '';
      } else if (block === true) {
        return 'p';
      } else {
        return block;
      }
    };

    var global$1 = tinymce.util.Tools.resolve('tinymce.util.Delay');

    var global$2 = tinymce.util.Tools.resolve('tinymce.util.VK');

    var zeroWidth = '\uFEFF';
    var nbsp = '\xA0';

    var global$3 = tinymce.util.Tools.resolve('tinymce.util.Tools');

    var global$4 = tinymce.util.Tools.resolve('tinymce.dom.DOMUtils');

    var global$5 = tinymce.util.Tools.resolve('tinymce.dom.TextSeeker');

    var point = function (container, offset) {
      return {
        container: container,
        offset: offset
      };
    };

    var isText = function (node) {
      return node.nodeType === domGlobals.Node.TEXT_NODE;
    };
    var cleanEmptyNodes = function (dom, node, isRoot) {
      if (node && dom.isEmpty(node) && !isRoot(node)) {
        var parent_1 = node.parentNode;
        dom.remove(node);
        cleanEmptyNodes(dom, parent_1, isRoot);
      }
    };
    var deleteRng = function (dom, rng, isRoot, clean) {
      if (clean === void 0) {
        clean = true;
      }
      var startParent = rng.startContainer.parentNode;
      var endParent = rng.endContainer.parentNode;
      rng.deleteContents();
      if (clean && !isRoot(rng.startContainer)) {
        if (isText(rng.startContainer) && rng.startContainer.data.length === 0) {
          dom.remove(rng.startContainer);
        }
        if (isText(rng.endContainer) && rng.endContainer.data.length === 0) {
          dom.remove(rng.endContainer);
        }
        cleanEmptyNodes(dom, startParent, isRoot);
        if (startParent !== endParent) {
          cleanEmptyNodes(dom, endParent, isRoot);
        }
      }
    };
    var isBlockFormatName = function (name, formatter) {
      var formatSet = formatter.get(name);
      return isArray(formatSet) && head(formatSet).exists(function (format) {
        return has(format, 'block');
      });
    };
    var isReplacementPattern = function (pattern) {
      return pattern.start.length === 0;
    };
    var getParentBlock = function (editor, rng) {
      var parentBlockOpt = Option.from(editor.dom.getParent(rng.startContainer, editor.dom.isBlock));
      if (getForcedRootBlock(editor) === '') {
        return parentBlockOpt.orThunk(function () {
          return Option.some(editor.getBody());
        });
      } else {
        return parentBlockOpt;
      }
    };

    var DOM = global$4.DOM;
    var alwaysNext = function (startNode) {
      return function (node) {
        return startNode === node ? -1 : 0;
      };
    };
    var isBoundary = function (dom) {
      return function (node) {
        return dom.isBlock(node) || contains([
          'BR',
          'IMG',
          'HR',
          'INPUT'
        ], node.nodeName) || dom.getContentEditable(node) === 'false';
      };
    };
    var textBefore = function (node, offset, rootNode) {
      if (isText(node) && offset >= 0) {
        return Option.some(point(node, offset));
      } else {
        var textSeeker = global$5(DOM);
        return Option.from(textSeeker.backwards(node, offset, alwaysNext(node), rootNode)).map(function (prev) {
          return point(prev.container, prev.container.data.length);
        });
      }
    };
    var textAfter = function (node, offset, rootNode) {
      if (isText(node) && offset >= node.length) {
        return Option.some(point(node, offset));
      } else {
        var textSeeker = global$5(DOM);
        return Option.from(textSeeker.forwards(node, offset, alwaysNext(node), rootNode)).map(function (prev) {
          return point(prev.container, 0);
        });
      }
    };
    var scanLeft = function (node, offset, rootNode) {
      if (!isText(node)) {
        return Option.none();
      }
      var text = node.textContent;
      if (offset >= 0 && offset <= text.length) {
        return Option.some(point(node, offset));
      } else {
        var textSeeker = global$5(DOM);
        return Option.from(textSeeker.backwards(node, offset, alwaysNext(node), rootNode)).bind(function (prev) {
          var prevText = prev.container.data;
          return scanLeft(prev.container, offset + prevText.length, rootNode);
        });
      }
    };
    var scanRight = function (node, offset, rootNode) {
      if (!isText(node)) {
        return Option.none();
      }
      var text = node.textContent;
      if (offset <= text.length) {
        return Option.some(point(node, offset));
      } else {
        var textSeeker = global$5(DOM);
        return Option.from(textSeeker.forwards(node, offset, alwaysNext(node), rootNode)).bind(function (next) {
          return scanRight(next.container, offset - text.length, rootNode);
        });
      }
    };
    var repeatLeft = function (dom, node, offset, process, rootNode) {
      var search = global$5(dom, isBoundary(dom));
      return Option.from(search.backwards(node, offset, process, rootNode));
    };

    var generatePath = function (root, node, offset) {
      if (isText(node) && (offset < 0 || offset > node.data.length)) {
        return [];
      }
      var p = [offset];
      var current = node;
      while (current !== root && current.parentNode) {
        var parent_1 = current.parentNode;
        for (var i = 0; i < parent_1.childNodes.length; i++) {
          if (parent_1.childNodes[i] === current) {
            p.push(i);
            break;
          }
        }
        current = parent_1;
      }
      return current === root ? p.reverse() : [];
    };
    var generatePathRange = function (root, startNode, startOffset, endNode, endOffset) {
      var start = generatePath(root, startNode, startOffset);
      var end = generatePath(root, endNode, endOffset);
      return {
        start: start,
        end: end
      };
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
        } else {
          return Option.some({
            node: node,
            offset: offset
          });
        }
      });
    };
    var resolvePathRange = function (root, range) {
      return resolvePath(root, range.start).bind(function (_a) {
        var startNode = _a.node, startOffset = _a.offset;
        return resolvePath(root, range.end).map(function (_a) {
          var endNode = _a.node, endOffset = _a.offset;
          var rng = domGlobals.document.createRange();
          rng.setStart(startNode, startOffset);
          rng.setEnd(endNode, endOffset);
          return rng;
        });
      });
    };
    var generatePathRangeFromRange = function (root, range) {
      return generatePathRange(root, range.startContainer, range.startOffset, range.endContainer, range.endOffset);
    };

    var stripPattern = function (dom, block, pattern) {
      var firstTextNode = textAfter(block, 0, block);
      firstTextNode.each(function (spot) {
        var node = spot.container;
        scanRight(node, pattern.start.length, block).each(function (end) {
          var rng = dom.createRng();
          rng.setStart(node, 0);
          rng.setEnd(end.container, end.offset);
          deleteRng(dom, rng, function (e) {
            return e === block;
          });
        });
      });
    };
    var applyPattern = function (editor, match) {
      var dom = editor.dom;
      var pattern = match.pattern;
      var rng = resolvePathRange(dom.getRoot(), match.range).getOrDie('Unable to resolve path range');
      getParentBlock(editor, rng).each(function (block) {
        if (pattern.type === 'block-format') {
          if (isBlockFormatName(pattern.format, editor.formatter)) {
            editor.undoManager.transact(function () {
              stripPattern(editor.dom, block, pattern);
              editor.formatter.apply(pattern.format);
            });
          }
        } else if (pattern.type === 'block-command') {
          editor.undoManager.transact(function () {
            stripPattern(editor.dom, block, pattern);
            editor.execCommand(pattern.cmd, false, pattern.value);
          });
        }
      });
      return true;
    };
    var findPattern = function (patterns, text) {
      var nuText = text.replace(nbsp, ' ');
      return find(patterns, function (pattern) {
        if (text.indexOf(pattern.start) !== 0 && nuText.indexOf(pattern.start) !== 0) {
          return false;
        }
        return true;
      });
    };
    var findPatterns = function (editor, patterns) {
      var dom = editor.dom;
      var rng = editor.selection.getRng();
      return getParentBlock(editor, rng).filter(function (block) {
        var forcedRootBlock = getForcedRootBlock(editor);
        var matchesForcedRootBlock = forcedRootBlock === '' && dom.is(block, 'body') || dom.is(block, forcedRootBlock);
        return block !== null && matchesForcedRootBlock;
      }).bind(function (block) {
        var blockText = block.textContent;
        var matchedPattern = findPattern(patterns, blockText);
        return matchedPattern.map(function (pattern) {
          if (global$3.trim(blockText).length === pattern.start.length) {
            return [];
          }
          return [{
              pattern: pattern,
              range: generatePathRange(dom.getRoot(), block, 0, block, 0)
            }];
        });
      }).getOr([]);
    };
    var applyMatches = function (editor, matches) {
      if (matches.length === 0) {
        return;
      }
      var bookmark = editor.selection.getBookmark();
      each(matches, function (match) {
        return applyPattern(editor, match);
      });
      editor.selection.moveToBookmark(bookmark);
    };

    var unique = 0;
    var generate$1 = function (prefix) {
      var date = new Date();
      var time = date.getTime();
      var random = Math.floor(Math.random() * 1000000000);
      unique++;
      return prefix + '_' + random + unique + String(time);
    };

    var checkRange = function (str, substr, start) {
      if (substr === '') {
        return true;
      }
      if (str.length < substr.length) {
        return false;
      }
      var x = str.substr(start, start + substr.length);
      return x === substr;
    };
    var endsWith = function (str, suffix) {
      return checkRange(str, suffix, str.length - suffix.length);
    };

    var newMarker = function (dom, id) {
      return dom.create('span', {
        'data-mce-type': 'bookmark',
        'id': id
      });
    };
    var rangeFromMarker = function (dom, marker) {
      var rng = dom.createRng();
      rng.setStartAfter(marker.start);
      rng.setEndBefore(marker.end);
      return rng;
    };
    var createMarker = function (dom, markerPrefix, pathRange) {
      var rng = resolvePathRange(dom.getRoot(), pathRange).getOrDie('Unable to resolve path range');
      var startNode = rng.startContainer;
      var endNode = rng.endContainer;
      var textEnd = rng.endOffset === 0 ? endNode : endNode.splitText(rng.endOffset);
      var textStart = rng.startOffset === 0 ? startNode : startNode.splitText(rng.startOffset);
      return {
        prefix: markerPrefix,
        end: textEnd.parentNode.insertBefore(newMarker(dom, markerPrefix + '-end'), textEnd),
        start: textStart.parentNode.insertBefore(newMarker(dom, markerPrefix + '-start'), textStart)
      };
    };
    var removeMarker = function (dom, marker, isRoot) {
      cleanEmptyNodes(dom, dom.get(marker.prefix + '-end'), isRoot);
      cleanEmptyNodes(dom, dom.get(marker.prefix + '-start'), isRoot);
    };

    var matchesPattern = function (dom, block, patternContent) {
      return function (element, offset) {
        var text = element.data;
        var searchText = text.substring(0, offset);
        var startEndIndex = searchText.lastIndexOf(patternContent.charAt(patternContent.length - 1));
        var startIndex = searchText.lastIndexOf(patternContent);
        if (startIndex !== -1) {
          return startIndex + patternContent.length;
        } else if (startEndIndex !== -1) {
          return startEndIndex + 1;
        } else {
          return -1;
        }
      };
    };
    var findPatternStartFromSpot = function (dom, pattern, block, spot) {
      var startPattern = pattern.start;
      var startSpot = repeatLeft(dom, spot.container, spot.offset, matchesPattern(dom, block, startPattern), block);
      return startSpot.bind(function (spot) {
        if (spot.offset >= startPattern.length) {
          var rng = dom.createRng();
          rng.setStart(spot.container, spot.offset - startPattern.length);
          rng.setEnd(spot.container, spot.offset);
          return Option.some(rng);
        } else {
          var offset = spot.offset - startPattern.length;
          return scanLeft(spot.container, offset, block).map(function (nextSpot) {
            var rng = dom.createRng();
            rng.setStart(nextSpot.container, nextSpot.offset);
            rng.setEnd(spot.container, spot.offset);
            return rng;
          }).filter(function (rng) {
            return rng.toString() === startPattern;
          }).orThunk(function () {
            return findPatternStartFromSpot(dom, pattern, block, point(spot.container, 0));
          });
        }
      });
    };
    var findPatternStart = function (dom, pattern, node, offset, block, requireGap) {
      if (requireGap === void 0) {
        requireGap = false;
      }
      if (pattern.start.length === 0 && !requireGap) {
        var rng = dom.createRng();
        rng.setStart(node, offset);
        rng.setEnd(node, offset);
        return Option.some(rng);
      }
      return textBefore(node, offset, block).bind(function (spot) {
        var start = findPatternStartFromSpot(dom, pattern, block, spot);
        return start.bind(function (startRange) {
          if (requireGap) {
            if (startRange.endContainer === spot.container && startRange.endOffset === spot.offset) {
              return Option.none();
            } else if (spot.offset === 0 && startRange.endContainer.textContent.length === startRange.endOffset) {
              return Option.none();
            }
          }
          return Option.some(startRange);
        });
      });
    };
    var findPattern$1 = function (editor, block, details) {
      var dom = editor.dom;
      var root = dom.getRoot();
      var pattern = details.pattern;
      var endNode = details.position.container;
      var endOffset = details.position.offset;
      return scanLeft(endNode, endOffset - details.pattern.end.length, block).bind(function (spot) {
        var endPathRng = generatePathRange(root, spot.container, spot.offset, endNode, endOffset);
        if (isReplacementPattern(pattern)) {
          return Option.some({
            matches: [{
                pattern: pattern,
                startRng: endPathRng,
                endRng: endPathRng
              }],
            position: spot
          });
        } else {
          var resultsOpt = findPatternsRec(editor, details.remainingPatterns, spot.container, spot.offset, block);
          var results_1 = resultsOpt.getOr({
            matches: [],
            position: spot
          });
          var pos = results_1.position;
          var start = findPatternStart(dom, pattern, pos.container, pos.offset, block, resultsOpt.isNone());
          return start.map(function (startRng) {
            var startPathRng = generatePathRangeFromRange(root, startRng);
            return {
              matches: results_1.matches.concat([{
                  pattern: pattern,
                  startRng: startPathRng,
                  endRng: endPathRng
                }]),
              position: point(startRng.startContainer, startRng.startOffset)
            };
          });
        }
      });
    };
    var findPatternsRec = function (editor, patterns, node, offset, block) {
      var dom = editor.dom;
      return textBefore(node, offset, dom.getRoot()).bind(function (endSpot) {
        var rng = dom.createRng();
        rng.setStart(block, 0);
        rng.setEnd(node, offset);
        var text = rng.toString();
        for (var i = 0; i < patterns.length; i++) {
          var pattern = patterns[i];
          if (!endsWith(text, pattern.end)) {
            continue;
          }
          var patternsWithoutCurrent = patterns.slice();
          patternsWithoutCurrent.splice(i, 1);
          var result = findPattern$1(editor, block, {
            pattern: pattern,
            remainingPatterns: patternsWithoutCurrent,
            position: endSpot
          });
          if (result.isSome()) {
            return result;
          }
        }
        return Option.none();
      });
    };
    var applyPattern$1 = function (editor, pattern, patternRange) {
      editor.selection.setRng(patternRange);
      if (pattern.type === 'inline-format') {
        each(pattern.format, function (format) {
          editor.formatter.apply(format);
        });
      } else {
        editor.execCommand(pattern.cmd, false, pattern.value);
      }
    };
    var applyReplacementPattern = function (editor, pattern, marker, isRoot) {
      var markerRange = rangeFromMarker(editor.dom, marker);
      deleteRng(editor.dom, markerRange, isRoot);
      applyPattern$1(editor, pattern, markerRange);
    };
    var applyPatternWithContent = function (editor, pattern, startMarker, endMarker, isRoot) {
      var dom = editor.dom;
      var markerEndRange = rangeFromMarker(dom, endMarker);
      var markerStartRange = rangeFromMarker(dom, startMarker);
      deleteRng(dom, markerStartRange, isRoot);
      deleteRng(dom, markerEndRange, isRoot);
      var patternMarker = {
        prefix: startMarker.prefix,
        start: startMarker.end,
        end: endMarker.start
      };
      var patternRange = rangeFromMarker(dom, patternMarker);
      applyPattern$1(editor, pattern, patternRange);
    };
    var addMarkers = function (dom, matches) {
      var markerPrefix = generate$1('mce_textpattern');
      var matchesWithEnds = foldr(matches, function (acc, match) {
        var endMarker = createMarker(dom, markerPrefix + ('_end' + acc.length), match.endRng);
        return acc.concat([__assign(__assign({}, match), { endMarker: endMarker })]);
      }, []);
      return foldr(matchesWithEnds, function (acc, match) {
        var idx = matchesWithEnds.length - acc.length - 1;
        var startMarker = isReplacementPattern(match.pattern) ? match.endMarker : createMarker(dom, markerPrefix + ('_start' + idx), match.startRng);
        return acc.concat([__assign(__assign({}, match), { startMarker: startMarker })]);
      }, []);
    };
    var findPatterns$1 = function (editor, patterns, space) {
      var rng = editor.selection.getRng();
      if (rng.collapsed === false) {
        return [];
      }
      return getParentBlock(editor, rng).bind(function (block) {
        var offset = rng.startOffset - (space ? 1 : 0);
        return findPatternsRec(editor, patterns, rng.startContainer, offset, block);
      }).fold(function () {
        return [];
      }, function (result) {
        return result.matches;
      });
    };
    var applyMatches$1 = function (editor, matches) {
      if (matches.length === 0) {
        return;
      }
      var dom = editor.dom;
      var bookmark = editor.selection.getBookmark();
      var matchesWithMarkers = addMarkers(dom, matches);
      each(matchesWithMarkers, function (match) {
        var block = dom.getParent(match.startMarker.start, dom.isBlock);
        var isRoot = function (node) {
          return node === block;
        };
        if (isReplacementPattern(match.pattern)) {
          applyReplacementPattern(editor, match.pattern, match.endMarker, isRoot);
        } else {
          applyPatternWithContent(editor, match.pattern, match.startMarker, match.endMarker, isRoot);
        }
        removeMarker(dom, match.endMarker, isRoot);
        removeMarker(dom, match.startMarker, isRoot);
      });
      editor.selection.moveToBookmark(bookmark);
    };

    var handleEnter = function (editor, patternSet) {
      if (!editor.selection.isCollapsed()) {
        return false;
      }
      var inlineMatches = findPatterns$1(editor, patternSet.inlinePatterns, false);
      var blockMatches = findPatterns(editor, patternSet.blockPatterns);
      if (blockMatches.length > 0 || inlineMatches.length > 0) {
        editor.undoManager.add();
        editor.undoManager.extra(function () {
          editor.execCommand('mceInsertNewLine');
        }, function () {
          editor.insertContent(zeroWidth);
          applyMatches$1(editor, inlineMatches);
          applyMatches(editor, blockMatches);
          var range = editor.selection.getRng();
          var spot = textBefore(range.startContainer, range.startOffset, editor.dom.getRoot());
          editor.execCommand('mceInsertNewLine');
          spot.each(function (s) {
            var node = s.container;
            if (node.data.charAt(s.offset - 1) === zeroWidth) {
              node.deleteData(s.offset - 1, 1);
              cleanEmptyNodes(editor.dom, node.parentNode, function (e) {
                return e === editor.dom.getRoot();
              });
            }
          });
        });
        return true;
      }
      return false;
    };
    var handleInlineKey = function (editor, patternSet) {
      var inlineMatches = findPatterns$1(editor, patternSet.inlinePatterns, true);
      if (inlineMatches.length > 0) {
        editor.undoManager.transact(function () {
          applyMatches$1(editor, inlineMatches);
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

    function Plugin () {
      global.add('textpattern', function (editor) {
        var patternsState = Cell(getPatternSet(editor.settings));
        Keyboard.setup(editor, patternsState);
        return Api.get(patternsState);
      });
    }

    Plugin();

}(window));
