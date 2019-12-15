/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 *
 * Version: 5.0.13 (2019-08-06)
 */
(function () {
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

    var global$1 = tinymce.util.Tools.resolve('tinymce.util.Tools');

    function isContentEditableFalse(node) {
      return node && node.nodeType === 1 && node.contentEditable === 'false';
    }
    function findAndReplaceDOMText(regex, node, replacementNode, captureGroup, schema) {
      var m;
      var matches = [];
      var text, count = 0, doc;
      var blockElementsMap, hiddenTextElementsMap, shortEndedElementsMap;
      doc = node.ownerDocument;
      blockElementsMap = schema.getBlockElements();
      hiddenTextElementsMap = schema.getWhiteSpaceElements();
      shortEndedElementsMap = schema.getShortEndedElements();
      function getMatchIndexes(m, captureGroup) {
        captureGroup = captureGroup || 0;
        if (!m[0]) {
          throw new Error('findAndReplaceDOMText cannot handle zero-length matches');
        }
        var index = m.index;
        if (captureGroup > 0) {
          var cg = m[captureGroup];
          if (!cg) {
            throw new Error('Invalid capture group');
          }
          index += m[0].indexOf(cg);
          m[0] = cg;
        }
        return [
          index,
          index + m[0].length,
          [m[0]]
        ];
      }
      function getText(node) {
        var txt;
        if (node.nodeType === 3) {
          return node.data;
        }
        if (hiddenTextElementsMap[node.nodeName] && !blockElementsMap[node.nodeName]) {
          return '';
        }
        txt = '';
        if (isContentEditableFalse(node)) {
          return '\n';
        }
        if (blockElementsMap[node.nodeName] || shortEndedElementsMap[node.nodeName]) {
          txt += '\n';
        }
        if (node = node.firstChild) {
          do {
            txt += getText(node);
          } while (node = node.nextSibling);
        }
        return txt;
      }
      function stepThroughMatches(node, matches, replaceFn) {
        var startNode, endNode, startNodeIndex, endNodeIndex, innerNodes = [], atIndex = 0, curNode = node, matchLocation = matches.shift(), matchIndex = 0;
        out:
          while (true) {
            if (blockElementsMap[curNode.nodeName] || shortEndedElementsMap[curNode.nodeName] || isContentEditableFalse(curNode)) {
              atIndex++;
            }
            if (curNode.nodeType === 3) {
              if (!endNode && curNode.length + atIndex >= matchLocation[1]) {
                endNode = curNode;
                endNodeIndex = matchLocation[1] - atIndex;
              } else if (startNode) {
                innerNodes.push(curNode);
              }
              if (!startNode && curNode.length + atIndex > matchLocation[0]) {
                startNode = curNode;
                startNodeIndex = matchLocation[0] - atIndex;
              }
              atIndex += curNode.length;
            }
            if (startNode && endNode) {
              curNode = replaceFn({
                startNode: startNode,
                startNodeIndex: startNodeIndex,
                endNode: endNode,
                endNodeIndex: endNodeIndex,
                innerNodes: innerNodes,
                match: matchLocation[2],
                matchIndex: matchIndex
              });
              atIndex -= endNode.length - endNodeIndex;
              startNode = null;
              endNode = null;
              innerNodes = [];
              matchLocation = matches.shift();
              matchIndex++;
              if (!matchLocation) {
                break;
              }
            } else if ((!hiddenTextElementsMap[curNode.nodeName] || blockElementsMap[curNode.nodeName]) && curNode.firstChild) {
              if (!isContentEditableFalse(curNode)) {
                curNode = curNode.firstChild;
                continue;
              }
            } else if (curNode.nextSibling) {
              curNode = curNode.nextSibling;
              continue;
            }
            while (true) {
              if (curNode.nextSibling) {
                curNode = curNode.nextSibling;
                break;
              } else if (curNode.parentNode !== node) {
                curNode = curNode.parentNode;
              } else {
                break out;
              }
            }
          }
      }
      function genReplacer(nodeName) {
        var makeReplacementNode;
        if (typeof nodeName !== 'function') {
          var stencilNode_1 = nodeName.nodeType ? nodeName : doc.createElement(nodeName);
          makeReplacementNode = function (fill, matchIndex) {
            var clone = stencilNode_1.cloneNode(false);
            clone.setAttribute('data-mce-index', matchIndex);
            if (fill) {
              clone.appendChild(doc.createTextNode(fill));
            }
            return clone;
          };
        } else {
          makeReplacementNode = nodeName;
        }
        return function (range) {
          var before;
          var after;
          var parentNode;
          var startNode = range.startNode;
          var endNode = range.endNode;
          var matchIndex = range.matchIndex;
          if (startNode === endNode) {
            var node_1 = startNode;
            parentNode = node_1.parentNode;
            if (range.startNodeIndex > 0) {
              before = doc.createTextNode(node_1.data.substring(0, range.startNodeIndex));
              parentNode.insertBefore(before, node_1);
            }
            var el = makeReplacementNode(range.match[0], matchIndex);
            parentNode.insertBefore(el, node_1);
            if (range.endNodeIndex < node_1.length) {
              after = doc.createTextNode(node_1.data.substring(range.endNodeIndex));
              parentNode.insertBefore(after, node_1);
            }
            node_1.parentNode.removeChild(node_1);
            return el;
          }
          before = doc.createTextNode(startNode.data.substring(0, range.startNodeIndex));
          after = doc.createTextNode(endNode.data.substring(range.endNodeIndex));
          var elA = makeReplacementNode(startNode.data.substring(range.startNodeIndex), matchIndex);
          for (var i = 0, l = range.innerNodes.length; i < l; ++i) {
            var innerNode = range.innerNodes[i];
            var innerEl = makeReplacementNode(innerNode.data, matchIndex);
            innerNode.parentNode.replaceChild(innerEl, innerNode);
          }
          var elB = makeReplacementNode(endNode.data.substring(0, range.endNodeIndex), matchIndex);
          parentNode = startNode.parentNode;
          parentNode.insertBefore(before, startNode);
          parentNode.insertBefore(elA, startNode);
          parentNode.removeChild(startNode);
          parentNode = endNode.parentNode;
          parentNode.insertBefore(elB, endNode);
          parentNode.insertBefore(after, endNode);
          parentNode.removeChild(endNode);
          return elB;
        };
      }
      text = getText(node);
      if (!text) {
        return;
      }
      if (regex.global) {
        while (m = regex.exec(text)) {
          matches.push(getMatchIndexes(m, captureGroup));
        }
      } else {
        m = text.match(regex);
        matches.push(getMatchIndexes(m, captureGroup));
      }
      if (matches.length) {
        count = matches.length;
        stepThroughMatches(node, matches, genReplacer(replacementNode));
      }
      return count;
    }
    var FindReplaceText = { findAndReplaceDOMText: findAndReplaceDOMText };

    var getElmIndex = function (elm) {
      var value = elm.getAttribute('data-mce-index');
      if (typeof value === 'number') {
        return '' + value;
      }
      return value;
    };
    var markAllMatches = function (editor, currentSearchState, regex) {
      var node, marker;
      marker = editor.dom.create('span', { 'data-mce-bogus': 1 });
      marker.className = 'mce-match-marker';
      node = editor.getBody();
      done(editor, currentSearchState, false);
      return FindReplaceText.findAndReplaceDOMText(regex, node, marker, false, editor.schema);
    };
    var unwrap = function (node) {
      var parentNode = node.parentNode;
      if (node.firstChild) {
        parentNode.insertBefore(node.firstChild, node);
      }
      node.parentNode.removeChild(node);
    };
    var findSpansByIndex = function (editor, index) {
      var nodes;
      var spans = [];
      nodes = global$1.toArray(editor.getBody().getElementsByTagName('span'));
      if (nodes.length) {
        for (var i = 0; i < nodes.length; i++) {
          var nodeIndex = getElmIndex(nodes[i]);
          if (nodeIndex === null || !nodeIndex.length) {
            continue;
          }
          if (nodeIndex === index.toString()) {
            spans.push(nodes[i]);
          }
        }
      }
      return spans;
    };
    var moveSelection = function (editor, currentSearchState, forward) {
      var searchState = currentSearchState.get();
      var testIndex = searchState.index;
      var dom = editor.dom;
      forward = forward !== false;
      if (forward) {
        if (testIndex + 1 === searchState.count) {
          testIndex = 0;
        } else {
          testIndex++;
        }
      } else {
        if (testIndex - 1 === -1) {
          testIndex = searchState.count - 1;
        } else {
          testIndex--;
        }
      }
      dom.removeClass(findSpansByIndex(editor, searchState.index), 'mce-match-marker-selected');
      var spans = findSpansByIndex(editor, testIndex);
      if (spans.length) {
        dom.addClass(findSpansByIndex(editor, testIndex), 'mce-match-marker-selected');
        editor.selection.scrollIntoView(spans[0]);
        return testIndex;
      }
      return -1;
    };
    var removeNode = function (dom, node) {
      var parent = node.parentNode;
      dom.remove(node);
      if (dom.isEmpty(parent)) {
        dom.remove(parent);
      }
    };
    var find = function (editor, currentSearchState, text, matchCase, wholeWord) {
      text = text.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
      text = text.replace(/\s/g, '[^\\S\\r\\n]');
      text = wholeWord ? '\\b' + text + '\\b' : text;
      var count = markAllMatches(editor, currentSearchState, new RegExp(text, matchCase ? 'g' : 'gi'));
      if (count) {
        var newIndex = moveSelection(editor, currentSearchState, true);
        currentSearchState.set({
          index: newIndex,
          count: count,
          text: text,
          matchCase: matchCase,
          wholeWord: wholeWord
        });
      }
      return count;
    };
    var next = function (editor, currentSearchState) {
      var index = moveSelection(editor, currentSearchState, true);
      currentSearchState.set(__assign({}, currentSearchState.get(), { index: index }));
    };
    var prev = function (editor, currentSearchState) {
      var index = moveSelection(editor, currentSearchState, false);
      currentSearchState.set(__assign({}, currentSearchState.get(), { index: index }));
    };
    var isMatchSpan = function (node) {
      var matchIndex = getElmIndex(node);
      return matchIndex !== null && matchIndex.length > 0;
    };
    var replace = function (editor, currentSearchState, text, forward, all) {
      var searchState = currentSearchState.get();
      var currentIndex = searchState.index;
      var i, nodes, node, matchIndex, currentMatchIndex, nextIndex = currentIndex;
      forward = forward !== false;
      node = editor.getBody();
      nodes = global$1.grep(global$1.toArray(node.getElementsByTagName('span')), isMatchSpan);
      for (i = 0; i < nodes.length; i++) {
        var nodeIndex = getElmIndex(nodes[i]);
        matchIndex = currentMatchIndex = parseInt(nodeIndex, 10);
        if (all || matchIndex === searchState.index) {
          if (text.length) {
            nodes[i].firstChild.nodeValue = text;
            unwrap(nodes[i]);
          } else {
            removeNode(editor.dom, nodes[i]);
          }
          while (nodes[++i]) {
            matchIndex = parseInt(getElmIndex(nodes[i]), 10);
            if (matchIndex === currentMatchIndex) {
              removeNode(editor.dom, nodes[i]);
            } else {
              i--;
              break;
            }
          }
          if (forward) {
            nextIndex--;
          }
        } else if (currentMatchIndex > currentIndex) {
          nodes[i].setAttribute('data-mce-index', String(currentMatchIndex - 1));
        }
      }
      currentSearchState.set(__assign({}, searchState, {
        count: all ? 0 : searchState.count - 1,
        index: nextIndex
      }));
      if (forward) {
        next(editor, currentSearchState);
      } else {
        prev(editor, currentSearchState);
      }
      return !all && currentSearchState.get().count > 0;
    };
    var done = function (editor, currentSearchState, keepEditorSelection) {
      var i, nodes, startContainer, endContainer;
      var searchState = currentSearchState.get();
      nodes = global$1.toArray(editor.getBody().getElementsByTagName('span'));
      for (i = 0; i < nodes.length; i++) {
        var nodeIndex = getElmIndex(nodes[i]);
        if (nodeIndex !== null && nodeIndex.length) {
          if (nodeIndex === searchState.index.toString()) {
            if (!startContainer) {
              startContainer = nodes[i].firstChild;
            }
            endContainer = nodes[i].firstChild;
          }
          unwrap(nodes[i]);
        }
      }
      currentSearchState.set(__assign({}, searchState, {
        index: -1,
        count: 0,
        text: ''
      }));
      if (startContainer && endContainer) {
        var rng = editor.dom.createRng();
        rng.setStart(startContainer, 0);
        rng.setEnd(endContainer, endContainer.data.length);
        if (keepEditorSelection !== false) {
          editor.selection.setRng(rng);
        }
        return rng;
      }
    };
    var hasNext = function (editor, currentSearchState) {
      return currentSearchState.get().count > 1;
    };
    var hasPrev = function (editor, currentSearchState) {
      return currentSearchState.get().count > 1;
    };

    var get = function (editor, currentState) {
      var done$1 = function (keepEditorSelection) {
        return done(editor, currentState, keepEditorSelection);
      };
      var find$1 = function (text, matchCase, wholeWord) {
        return find(editor, currentState, text, matchCase, wholeWord);
      };
      var next$1 = function () {
        return next(editor, currentState);
      };
      var prev$1 = function () {
        return prev(editor, currentState);
      };
      var replace$1 = function (text, forward, all) {
        return replace(editor, currentState, text, forward, all);
      };
      return {
        done: done$1,
        find: find$1,
        next: next$1,
        prev: prev$1,
        replace: replace$1
      };
    };
    var Api = { get: get };

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
      if (Object.freeze) {
        Object.freeze(me);
      }
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
    var isFunction = isType('function');

    var slice = Array.prototype.slice;
    var each = function (xs, f) {
      for (var i = 0, len = xs.length; i < len; i++) {
        var x = xs[i];
        f(x, i, xs);
      }
    };
    var from$1 = isFunction(Array.from) ? Array.from : function (x) {
      return slice.call(x);
    };

    var value = function () {
      var subject = Cell(Option.none());
      var clear = function () {
        subject.set(Option.none());
      };
      var set = function (s) {
        subject.set(Option.some(s));
      };
      var on = function (f) {
        subject.get().each(f);
      };
      var isSet = function () {
        return subject.get().isSome();
      };
      return {
        clear: clear,
        set: set,
        isSet: isSet,
        on: on
      };
    };

    var open = function (editor, currentSearchState) {
      var dialogApi = value();
      var matchcase = Cell(currentSearchState.get().matchCase);
      var wholewords = Cell(currentSearchState.get().wholeWord);
      editor.undoManager.add();
      var selectedText = global$1.trim(editor.selection.getContent({ format: 'text' }));
      function updateButtonStates(api) {
        var updateNext = hasNext(editor, currentSearchState) ? api.enable : api.disable;
        updateNext('next');
        var updatePrev = hasPrev(editor, currentSearchState) ? api.enable : api.disable;
        updatePrev('prev');
      }
      var disableAll = function (api, disable) {
        var buttons = [
          'replace',
          'replaceall',
          'prev',
          'next'
        ];
        var toggle = disable ? api.disable : api.enable;
        each(buttons, toggle);
      };
      function notFoundAlert(api) {
        editor.windowManager.alert('Could not find the specified string.', function () {
          api.focus('findtext');
        });
      }
      var reset = function (api) {
        done(editor, currentSearchState, false);
        disableAll(api, true);
        updateButtonStates(api);
      };
      var doFind = function (api) {
        var data = api.getData();
        var last = currentSearchState.get();
        if (!data.findtext.length) {
          reset(api);
          return;
        }
        if (last.text === data.findtext && last.matchCase === matchcase.get() && last.wholeWord === wholewords.get()) {
          next(editor, currentSearchState);
        } else {
          var count = find(editor, currentSearchState, data.findtext, matchcase.get(), wholewords.get());
          if (count <= 0) {
            notFoundAlert(api);
          }
          disableAll(api, count === 0);
        }
        updateButtonStates(api);
      };
      var initialData = {
        findtext: selectedText,
        replacetext: ''
      };
      var spec = {
        title: 'Find and Replace',
        size: 'normal',
        body: {
          type: 'panel',
          items: [
            {
              type: 'bar',
              items: [
                {
                  type: 'input',
                  name: 'findtext',
                  placeholder: 'Find',
                  maximized: true
                },
                {
                  type: 'button',
                  name: 'prev',
                  text: 'Previous',
                  icon: 'action-prev',
                  disabled: true,
                  borderless: true
                },
                {
                  type: 'button',
                  name: 'next',
                  text: 'Next',
                  icon: 'action-next',
                  disabled: true,
                  borderless: true
                }
              ]
            },
            {
              type: 'input',
              name: 'replacetext',
              placeholder: 'Replace with'
            }
          ]
        },
        buttons: [
          {
            type: 'menu',
            name: 'options',
            icon: 'preferences',
            tooltip: 'Preferences',
            align: 'start',
            fetch: function (done) {
              done([
                {
                  type: 'togglemenuitem',
                  text: 'Match case',
                  onAction: function (api) {
                    matchcase.set(!matchcase.get());
                    dialogApi.on(function (dApi) {
                      return dApi.focus('options');
                    });
                  },
                  active: matchcase.get()
                },
                {
                  type: 'togglemenuitem',
                  text: 'Find whole words only',
                  onAction: function (api) {
                    wholewords.set(!wholewords.get());
                    dialogApi.on(function (dApi) {
                      return dApi.focus('options');
                    });
                  },
                  active: wholewords.get()
                }
              ]);
            }
          },
          {
            type: 'custom',
            name: 'find',
            text: 'Find',
            primary: true
          },
          {
            type: 'custom',
            name: 'replace',
            text: 'Replace',
            disabled: true
          },
          {
            type: 'custom',
            name: 'replaceall',
            text: 'Replace All',
            disabled: true
          }
        ],
        initialData: initialData,
        onChange: function (api, details) {
          if (details.name === 'findtext' && currentSearchState.get().count > 0) {
            reset(api);
          }
        },
        onAction: function (api, details) {
          var data = api.getData();
          switch (details.name) {
          case 'find':
            doFind(api);
            break;
          case 'replace':
            if (!replace(editor, currentSearchState, data.replacetext)) {
              reset(api);
            } else {
              updateButtonStates(api);
            }
            break;
          case 'replaceall':
            replace(editor, currentSearchState, data.replacetext, true, true);
            reset(api);
            break;
          case 'prev':
            prev(editor, currentSearchState);
            updateButtonStates(api);
            break;
          case 'next':
            next(editor, currentSearchState);
            updateButtonStates(api);
            break;
          default:
            break;
          }
        },
        onSubmit: doFind,
        onClose: function () {
          editor.focus();
          done(editor, currentSearchState);
          editor.undoManager.add();
        }
      };
      dialogApi.set(editor.windowManager.open(spec, { inline: 'toolbar' }));
    };
    var Dialog = { open: open };

    var register = function (editor, currentSearchState) {
      editor.addCommand('SearchReplace', function () {
        Dialog.open(editor, currentSearchState);
      });
    };
    var Commands = { register: register };

    var showDialog = function (editor, currentSearchState) {
      return function () {
        Dialog.open(editor, currentSearchState);
      };
    };
    var register$1 = function (editor, currentSearchState) {
      editor.ui.registry.addMenuItem('searchreplace', {
        text: 'Find and replace...',
        shortcut: 'Meta+F',
        onAction: showDialog(editor, currentSearchState),
        icon: 'search'
      });
      editor.ui.registry.addButton('searchreplace', {
        tooltip: 'Find and replace',
        onAction: showDialog(editor, currentSearchState),
        icon: 'search'
      });
      editor.shortcuts.add('Meta+F', '', showDialog(editor, currentSearchState));
    };
    var Buttons = { register: register$1 };

    function Plugin () {
      global.add('searchreplace', function (editor) {
        var currentSearchState = Cell({
          index: -1,
          count: 0,
          text: '',
          matchCase: false,
          wholeWord: false
        });
        Commands.register(editor, currentSearchState);
        Buttons.register(editor, currentSearchState);
        return Api.get(editor, currentSearchState);
      });
    }

    Plugin();

}());
