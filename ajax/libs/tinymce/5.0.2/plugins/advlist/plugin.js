/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 *
 * Version: 5.0.2 (2019-03-05)
 */
(function () {
var advlist = (function () {
    'use strict';

    var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

    var global$1 = tinymce.util.Tools.resolve('tinymce.util.Tools');

    var applyListFormat = function (editor, listName, styleValue) {
      var cmd = listName === 'UL' ? 'InsertUnorderedList' : 'InsertOrderedList';
      editor.execCommand(cmd, false, styleValue === false ? null : { 'list-style-type': styleValue });
    };
    var Actions = { applyListFormat: applyListFormat };

    var register = function (editor) {
      editor.addCommand('ApplyUnorderedListStyle', function (ui, value) {
        Actions.applyListFormat(editor, 'UL', value['list-style-type']);
      });
      editor.addCommand('ApplyOrderedListStyle', function (ui, value) {
        Actions.applyListFormat(editor, 'OL', value['list-style-type']);
      });
    };
    var Commands = { register: register };

    var getNumberStyles = function (editor) {
      var styles = editor.getParam('advlist_number_styles', 'default,lower-alpha,lower-greek,lower-roman,upper-alpha,upper-roman');
      return styles ? styles.split(/[ ,]/) : [];
    };
    var getBulletStyles = function (editor) {
      var styles = editor.getParam('advlist_bullet_styles', 'default,circle,square');
      return styles ? styles.split(/[ ,]/) : [];
    };
    var Settings = {
      getNumberStyles: getNumberStyles,
      getBulletStyles: getBulletStyles
    };

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

    var isChildOfBody = function (editor, elm) {
      return editor.$.contains(editor.getBody(), elm);
    };
    var isTableCellNode = function (node) {
      return node && /^(TH|TD)$/.test(node.nodeName);
    };
    var isListNode = function (editor) {
      return function (node) {
        return node && /^(OL|UL|DL)$/.test(node.nodeName) && isChildOfBody(editor, node);
      };
    };
    var getSelectedStyleType = function (editor) {
      var listElm = editor.dom.getParent(editor.selection.getNode(), 'ol,ul');
      var style = editor.dom.getStyle(listElm, 'listStyleType');
      return Option.from(style);
    };
    var ListUtils = {
      isTableCellNode: isTableCellNode,
      isListNode: isListNode,
      getSelectedStyleType: getSelectedStyleType
    };

    var findIndex = function (list, predicate) {
      for (var index = 0; index < list.length; index++) {
        var element = list[index];
        if (predicate(element)) {
          return index;
        }
      }
      return -1;
    };
    var styleValueToText = function (styleValue) {
      return styleValue.replace(/\-/g, ' ').replace(/\b\w/g, function (chr) {
        return chr.toUpperCase();
      });
    };
    var isWithinList = function (editor, e, nodeName) {
      var tableCellIndex = findIndex(e.parents, ListUtils.isTableCellNode);
      var parents = tableCellIndex !== -1 ? e.parents.slice(0, tableCellIndex) : e.parents;
      var lists = global$1.grep(parents, ListUtils.isListNode(editor));
      return lists.length > 0 && lists[0].nodeName === nodeName;
    };
    var addSplitButton = function (editor, id, tooltip, cmd, nodeName, styles) {
      editor.ui.registry.addSplitButton(id, {
        tooltip: tooltip,
        icon: nodeName === 'OL' ? 'ordered-list' : 'unordered-list',
        presets: 'listpreview',
        columns: 3,
        fetch: function (callback) {
          var items = global$1.map(styles, function (styleValue) {
            var iconStyle = nodeName === 'OL' ? 'num' : 'bull';
            var iconName = styleValue === 'disc' || styleValue === 'decimal' ? 'default' : styleValue;
            var itemValue = styleValue === 'default' ? '' : styleValue;
            var displayText = styleValueToText(styleValue);
            return {
              type: 'choiceitem',
              value: itemValue,
              icon: 'list-' + iconStyle + '-' + iconName,
              text: displayText,
              ariaLabel: displayText
            };
          });
          callback(items);
        },
        onAction: function () {
          return editor.execCommand(cmd);
        },
        onItemAction: function (splitButtonApi, value) {
          Actions.applyListFormat(editor, nodeName, value);
        },
        select: function (value) {
          var listStyleType = ListUtils.getSelectedStyleType(editor);
          return listStyleType.map(function (listStyle) {
            return value === listStyle;
          }).getOr(false);
        },
        onSetup: function (api) {
          var nodeChangeHandler = function (e) {
            api.setActive(isWithinList(editor, e, nodeName));
          };
          editor.on('nodeChange', nodeChangeHandler);
          return function () {
            return editor.off('nodeChange', nodeChangeHandler);
          };
        }
      });
    };
    var addButton = function (editor, id, tooltip, cmd, nodeName, styles) {
      editor.ui.registry.addToggleButton(id, {
        active: false,
        tooltip: tooltip,
        icon: nodeName === 'OL' ? 'ordered-list' : 'unordered-list',
        onSetup: function (api) {
          var nodeChangeHandler = function (e) {
            api.setActive(isWithinList(editor, e, nodeName));
          };
          editor.on('nodeChange', nodeChangeHandler);
          return function () {
            return editor.off('nodeChange', nodeChangeHandler);
          };
        },
        onAction: function () {
          return editor.execCommand(cmd);
        }
      });
    };
    var addControl = function (editor, id, tooltip, cmd, nodeName, styles) {
      if (styles.length > 0) {
        addSplitButton(editor, id, tooltip, cmd, nodeName, styles);
      } else {
        addButton(editor, id, tooltip, cmd, nodeName, styles);
      }
    };
    var register$1 = function (editor) {
      addControl(editor, 'numlist', 'Numbered list', 'InsertOrderedList', 'OL', Settings.getNumberStyles(editor));
      addControl(editor, 'bullist', 'Bullet list', 'InsertUnorderedList', 'UL', Settings.getBulletStyles(editor));
    };
    var Buttons = { register: register$1 };

    global.add('advlist', function (editor) {
      var hasPlugin = function (editor, plugin) {
        var plugins = editor.settings.plugins ? editor.settings.plugins : '';
        return global$1.inArray(plugins.split(/[ ,]/), plugin) !== -1;
      };
      if (hasPlugin(editor, 'lists')) {
        Buttons.register(editor);
        Commands.register(editor);
      }
    });
    function Plugin () {
    }

    return Plugin;

}());
})();
