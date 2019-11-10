(function () {
var textpattern = (function () {
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

    var constant = function (value) {
      return function () {
        return value;
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
      var call$$1 = function (thunk) {
        return thunk();
      };
      var id = function (n) {
        return n;
      };
      var noop$$1 = function () {
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
        getOrThunk: call$$1,
        getOrDie: function (msg) {
          throw new Error(msg || 'error: getOrDie called on none.');
        },
        getOrNull: nul,
        getOrUndefined: undef,
        or: id,
        orThunk: call$$1,
        map: none,
        ap: none,
        each: noop$$1,
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
    var isFunction = isType('function');

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
    var slice = Array.prototype.slice;
    var sort = function (xs, comparator) {
      var copy = slice.call(xs, 0);
      copy.sort(comparator);
      return copy;
    };
    var from$1 = isFunction(Array.from) ? Array.from : function (x) {
      return slice.call(x);
    };

    var hasOwnProperty = Object.hasOwnProperty;
    var get = function (obj, key) {
      return has(obj, key) ? Option.some(obj[key]) : Option.none();
    };
    var has = function (obj, key) {
      return hasOwnProperty.call(obj, key);
    };

    var isInlinePattern = function (pattern) {
      return has(pattern, 'start') && has(pattern, 'end');
    };
    var isBlockPattern = function (pattern) {
      return !has(pattern, 'end') && !has(pattern, 'replacement');
    };
    var isReplacementPattern = function (pattern) {
      return has(pattern, 'replacement');
    };
    var sortPatterns = function (patterns) {
      return sort(patterns, function (a, b) {
        if (a.start.length === b.start.length) {
          return 0;
        }
        return a.start.length > b.start.length ? -1 : 1;
      });
    };
    var createPatternSet = function (patterns) {
      return {
        inlinePatterns: sortPatterns(filter(patterns, isInlinePattern)),
        blockPatterns: sortPatterns(filter(patterns, isBlockPattern)),
        replacementPatterns: filter(patterns, isReplacementPattern)
      };
    };

    var get$1 = function (patternsState) {
      var setPatterns = function (newPatterns) {
        patternsState.set(createPatternSet(newPatterns));
      };
      var getPatterns = function () {
        return patternsState.get().inlinePatterns.concat(patternsState.get().blockPatterns, patternsState.get().replacementPatterns);
      };
      return {
        setPatterns: setPatterns,
        getPatterns: getPatterns
      };
    };
    var Api = { get: get$1 };

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
        start: '***',
        end: '***',
        format: [
          'bold',
          'italic'
        ]
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
      return createPatternSet(patterns);
    };

    var global$1 = tinymce.util.Tools.resolve('tinymce.util.Delay');

    var global$2 = tinymce.util.Tools.resolve('tinymce.util.VK');

    var global$3 = tinymce.util.Tools.resolve('tinymce.dom.TreeWalker');

    var global$4 = tinymce.util.Tools.resolve('tinymce.util.Tools');

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
    var isMatchingPattern = function (pattern, text, offset, delta) {
      var textEnd = text.substr(offset - pattern.end.length - delta, pattern.end.length);
      return textEnd === pattern.end;
    };
    var hasContent = function (offset, delta, pattern) {
      return offset - delta - pattern.end.length - pattern.start.length > 0;
    };
    var findEndPattern = function (patterns, text, offset, delta) {
      var pattern, i;
      for (i = 0; i < patterns.length; i++) {
        pattern = patterns[i];
        if (pattern.end !== undefined && isMatchingPattern(pattern, text, offset, delta) && hasContent(offset, delta, pattern)) {
          return pattern;
        }
      }
    };
    var findInlinePattern = function (patterns, rng, space) {
      if (rng.collapsed === false) {
        return;
      }
      var container = rng.startContainer;
      var text = container.data;
      var delta = space === true ? 1 : 0;
      if (container.nodeType !== 3) {
        return;
      }
      var endPattern = findEndPattern(patterns, text, rng.startOffset, delta);
      if (endPattern === undefined) {
        return;
      }
      var endOffset = text.lastIndexOf(endPattern.end, rng.startOffset - delta);
      var startOffset = text.lastIndexOf(endPattern.start, endOffset - endPattern.end.length);
      endOffset = text.indexOf(endPattern.end, startOffset + endPattern.start.length);
      if (startOffset === -1) {
        return;
      }
      var patternRng = document.createRange();
      patternRng.setStart(container, startOffset);
      patternRng.setEnd(container, endOffset + endPattern.end.length);
      var startPattern = findPattern(patterns, patternRng.toString());
      if (endPattern === undefined || startPattern !== endPattern || container.data.length <= endPattern.start.length + endPattern.end.length) {
        return;
      }
      return {
        pattern: endPattern,
        startOffset: startOffset,
        endOffset: endOffset
      };
    };
    var findReplacementPattern = function (patterns, startSearch, text) {
      for (var i = 0; i < patterns.length; i++) {
        var index = text.lastIndexOf(patterns[i].start, startSearch);
        if (index !== -1) {
          return Option.some({
            pattern: patterns[i],
            startOffset: index
          });
        }
      }
      return Option.none();
    };

    var setSelection = function (editor, textNode, offset) {
      var newRng = editor.dom.createRng();
      newRng.setStart(textNode, offset);
      newRng.setEnd(textNode, offset);
      editor.selection.setRng(newRng);
    };
    var splitContainer = function (container, pattern, endOffset, startOffset) {
      container = startOffset > 0 ? container.splitText(startOffset) : container;
      container.splitText(endOffset - startOffset + pattern.end.length);
      container.deleteData(0, pattern.start.length);
      container.deleteData(container.data.length - pattern.end.length, pattern.end.length);
      return container;
    };
    var splitAndApply = function (editor, container, found) {
      var formatArray = global$4.isArray(found.pattern.format) ? found.pattern.format : [found.pattern.format];
      var validFormats = global$4.grep(formatArray, function (formatName) {
        var format = editor.formatter.get(formatName);
        return format && format[0].inline;
      });
      if (validFormats.length !== 0) {
        editor.undoManager.transact(function () {
          container = splitContainer(container, found.pattern, found.endOffset, found.startOffset);
          formatArray.forEach(function (format) {
            editor.formatter.apply(format, {}, container);
          });
        });
        return container;
      }
    };
    var applyInlinePattern = function (editor, patterns, space) {
      var rng = editor.selection.getRng();
      return Option.from(findInlinePattern(patterns, rng, space)).map(function (foundPattern) {
        return splitAndApply(editor, rng.startContainer, foundPattern);
      });
    };
    var applyInlinePatternSpace = function (editor, patterns) {
      applyInlinePattern(editor, patterns, true).each(function (wrappedTextNode) {
        var lastChar = wrappedTextNode.data.slice(-1);
        if (/[\u00a0 ]/.test(lastChar)) {
          wrappedTextNode.deleteData(wrappedTextNode.data.length - 1, 1);
          var lastCharNode = editor.dom.doc.createTextNode(lastChar);
          editor.dom.insertAfter(lastCharNode, wrappedTextNode.parentNode);
          setSelection(editor, lastCharNode, 1);
        }
      });
    };
    var applyInlinePatternEnter = function (editor, patterns) {
      applyInlinePattern(editor, patterns, false).each(function (wrappedTextNode) {
        setSelection(editor, wrappedTextNode, wrappedTextNode.data.length);
      });
    };
    var applyBlockPattern = function (editor, patterns) {
      var selection, dom, container, firstTextNode, node, format, textBlockElm, pattern, walker, rng, offset;
      selection = editor.selection;
      dom = editor.dom;
      if (!selection.isCollapsed()) {
        return;
      }
      textBlockElm = dom.getParent(selection.getStart(), 'p');
      if (textBlockElm) {
        walker = new global$3(textBlockElm, textBlockElm);
        while (node = walker.next()) {
          if (node.nodeType === 3) {
            firstTextNode = node;
            break;
          }
        }
        if (firstTextNode) {
          pattern = findPattern(patterns, firstTextNode.data);
          if (!pattern) {
            return;
          }
          rng = selection.getRng(true);
          container = rng.startContainer;
          offset = rng.startOffset;
          if (firstTextNode === container) {
            offset = Math.max(0, offset - pattern.start.length);
          }
          if (global$4.trim(firstTextNode.data).length === pattern.start.length) {
            return;
          }
          if (pattern.format) {
            format = editor.formatter.get(pattern.format);
            if (format && format[0].block) {
              firstTextNode.deleteData(0, pattern.start.length);
              editor.formatter.apply(pattern.format, {}, firstTextNode);
              rng.setStart(container, offset);
              rng.collapse(true);
              selection.setRng(rng);
            }
          }
          if (pattern.cmd) {
            editor.undoManager.transact(function () {
              firstTextNode.deleteData(0, pattern.start.length);
              editor.execCommand(pattern.cmd);
            });
          }
        }
      }
    };
    var replaceData = function (target, match) {
      target.deleteData(match.startOffset, match.pattern.start.length);
      target.insertData(match.startOffset, match.pattern.replacement);
    };
    var replaceMiddle = function (editor, target, match) {
      var startOffset = editor.selection.getRng().startOffset;
      replaceData(target, match);
      var newOffset = startOffset - match.pattern.start.length + match.pattern.replacement.length;
      setSelection(editor, target, newOffset);
    };
    var replaceEnd = function (editor, target, match) {
      replaceData(target, match);
      setSelection(editor, target, target.data.length);
    };
    var replace = function (editor, target, match) {
      if (match.startOffset < target.data.length) {
        replaceMiddle(editor, target, match);
      } else {
        replaceEnd(editor, target, match);
      }
    };
    var applyReplacementPattern = function (editor, patterns) {
      var rng = editor.selection.getRng();
      if (rng.collapsed && rng.startContainer.nodeType === 3) {
        var container_1 = rng.startContainer;
        findReplacementPattern(patterns, rng.startOffset, container_1.data).each(function (match) {
          replace(editor, container_1, match);
        });
      }
    };

    var handleEnter = function (editor, patternSet) {
      applyReplacementPattern(editor, patternSet.replacementPatterns);
      applyInlinePatternEnter(editor, patternSet.inlinePatterns);
      applyBlockPattern(editor, patternSet.blockPatterns);
    };
    var handleInlineKey = function (editor, patternSet) {
      applyReplacementPattern(editor, patternSet.replacementPatterns);
      applyInlinePatternSpace(editor, patternSet.inlinePatterns);
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
          KeyHandler.handleEnter(editor, patternsState.get());
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

}());
})();
