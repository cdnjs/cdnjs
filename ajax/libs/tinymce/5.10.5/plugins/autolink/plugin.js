/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 *
 * Version: 5.10.5 (2022-05-25)
 */
(function () {
    'use strict';

    var global$1 = tinymce.util.Tools.resolve('tinymce.PluginManager');

    var checkRange = function (str, substr, start) {
      return substr === '' || str.length >= substr.length && str.substr(start, start + substr.length) === substr;
    };
    var contains = function (str, substr) {
      return str.indexOf(substr) !== -1;
    };
    var startsWith = function (str, prefix) {
      return checkRange(str, prefix, 0);
    };

    var global = tinymce.util.Tools.resolve('tinymce.Env');

    var link = function () {
      return /(?:[A-Za-z][A-Za-z\d.+-]{0,14}:\/\/(?:[-.~*+=!&;:'%@?^${}(),\w]+@)?|www\.|[-;:&=+$,.\w]+@)[A-Za-z\d-]+(?:\.[A-Za-z\d-]+)*(?::\d+)?(?:\/(?:[-+~=.,%()\/\w]*[-+~=%()\/\w])?)?(?:\?(?:[-.~*+=!&;:'%@?^${}(),\/\w]+))?(?:#(?:[-.~*+=!&;:'%@?^${}(),\/\w]+))?/g;
    };

    var defaultLinkPattern = new RegExp('^' + link().source + '$', 'i');
    var getAutoLinkPattern = function (editor) {
      return editor.getParam('autolink_pattern', defaultLinkPattern);
    };
    var getDefaultLinkTarget = function (editor) {
      return editor.getParam('default_link_target', false);
    };
    var getDefaultLinkProtocol = function (editor) {
      return editor.getParam('link_default_protocol', 'http', 'string');
    };

    var rangeEqualsBracketOrSpace = function (rangeString) {
      return /^[(\[{ \u00a0]$/.test(rangeString);
    };
    var isTextNode = function (node) {
      return node.nodeType === 3;
    };
    var isElement = function (node) {
      return node.nodeType === 1;
    };
    var handleBracket = function (editor) {
      return parseCurrentLine(editor, -1);
    };
    var handleSpacebar = function (editor) {
      return parseCurrentLine(editor, 0);
    };
    var handleEnter = function (editor) {
      return parseCurrentLine(editor, -1);
    };
    var scopeIndex = function (container, index) {
      if (index < 0) {
        index = 0;
      }
      if (isTextNode(container)) {
        var len = container.data.length;
        if (index > len) {
          index = len;
        }
      }
      return index;
    };
    var setStart = function (rng, container, offset) {
      if (!isElement(container) || container.hasChildNodes()) {
        rng.setStart(container, scopeIndex(container, offset));
      } else {
        rng.setStartBefore(container);
      }
    };
    var setEnd = function (rng, container, offset) {
      if (!isElement(container) || container.hasChildNodes()) {
        rng.setEnd(container, scopeIndex(container, offset));
      } else {
        rng.setEndAfter(container);
      }
    };
    var hasProtocol = function (url) {
      return /^([A-Za-z][A-Za-z\d.+-]*:\/\/)|mailto:/.test(url);
    };
    var isPunctuation = function (char) {
      return /[?!,.;:]/.test(char);
    };
    var parseCurrentLine = function (editor, endOffset) {
      var end, endContainer, bookmark, text, prev, len, rngText;
      var autoLinkPattern = getAutoLinkPattern(editor);
      var defaultLinkTarget = getDefaultLinkTarget(editor);
      if (editor.dom.getParent(editor.selection.getNode(), 'a[href]') !== null) {
        return;
      }
      var rng = editor.selection.getRng().cloneRange();
      if (rng.startOffset < 5) {
        prev = rng.endContainer.previousSibling;
        if (!prev) {
          if (!rng.endContainer.firstChild || !rng.endContainer.firstChild.nextSibling) {
            return;
          }
          prev = rng.endContainer.firstChild.nextSibling;
        }
        len = prev.length;
        setStart(rng, prev, len);
        setEnd(rng, prev, len);
        if (rng.endOffset < 5) {
          return;
        }
        end = rng.endOffset;
        endContainer = prev;
      } else {
        endContainer = rng.endContainer;
        if (!isTextNode(endContainer) && endContainer.firstChild) {
          while (!isTextNode(endContainer) && endContainer.firstChild) {
            endContainer = endContainer.firstChild;
          }
          if (isTextNode(endContainer)) {
            setStart(rng, endContainer, 0);
            setEnd(rng, endContainer, endContainer.nodeValue.length);
          }
        }
        if (rng.endOffset === 1) {
          end = 2;
        } else {
          end = rng.endOffset - 1 - endOffset;
        }
      }
      var start = end;
      do {
        setStart(rng, endContainer, end >= 2 ? end - 2 : 0);
        setEnd(rng, endContainer, end >= 1 ? end - 1 : 0);
        end -= 1;
        rngText = rng.toString();
      } while (!rangeEqualsBracketOrSpace(rngText) && end - 2 >= 0);
      if (rangeEqualsBracketOrSpace(rng.toString())) {
        setStart(rng, endContainer, end);
        setEnd(rng, endContainer, start);
        end += 1;
      } else if (rng.startOffset === 0) {
        setStart(rng, endContainer, 0);
        setEnd(rng, endContainer, start);
      } else {
        setStart(rng, endContainer, end);
        setEnd(rng, endContainer, start);
      }
      text = rng.toString();
      if (isPunctuation(text.charAt(text.length - 1))) {
        setEnd(rng, endContainer, start - 1);
      }
      text = rng.toString().trim();
      var matches = text.match(autoLinkPattern);
      var protocol = getDefaultLinkProtocol(editor);
      if (matches) {
        var url = matches[0];
        if (startsWith(url, 'www.')) {
          url = protocol + '://' + url;
        } else if (contains(url, '@') && !hasProtocol(url)) {
          url = 'mailto:' + url;
        }
        bookmark = editor.selection.getBookmark();
        editor.selection.setRng(rng);
        editor.execCommand('createlink', false, url);
        if (defaultLinkTarget !== false) {
          editor.dom.setAttrib(editor.selection.getNode(), 'target', defaultLinkTarget);
        }
        editor.selection.moveToBookmark(bookmark);
        editor.nodeChanged();
      }
    };
    var setup = function (editor) {
      var autoUrlDetectState;
      editor.on('keydown', function (e) {
        if (e.keyCode === 13) {
          return handleEnter(editor);
        }
      });
      if (global.browser.isIE()) {
        editor.on('focus', function () {
          if (!autoUrlDetectState) {
            autoUrlDetectState = true;
            try {
              editor.execCommand('AutoUrlDetect', false, true);
            } catch (ex) {
            }
          }
        });
        return;
      }
      editor.on('keypress', function (e) {
        if (e.keyCode === 41 || e.keyCode === 93 || e.keyCode === 125) {
          return handleBracket(editor);
        }
      });
      editor.on('keyup', function (e) {
        if (e.keyCode === 32) {
          return handleSpacebar(editor);
        }
      });
    };

    function Plugin () {
      global$1.add('autolink', function (editor) {
        setup(editor);
      });
    }

    Plugin();

}());
