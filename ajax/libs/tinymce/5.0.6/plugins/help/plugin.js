/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 *
 * Version: 5.0.6 (2019-05-22)
 */
(function () {
var help = (function () {
    'use strict';

    var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

    var constant = function (value) {
      return function () {
        return value;
      };
    };
    function curry(fn) {
      var initialArgs = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        initialArgs[_i - 1] = arguments[_i];
      }
      return function () {
        var restArgs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          restArgs[_i] = arguments[_i];
        }
        var all = initialArgs.concat(restArgs);
        return fn.apply(null, all);
      };
    }
    var not = function (f) {
      return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        return !f.apply(null, args);
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
    var find = function (xs, pred) {
      for (var i = 0, len = xs.length; i < len; i++) {
        var x = xs[i];
        if (pred(x, i, xs)) {
          return Option.some(x);
        }
      }
      return Option.none();
    };
    var slowIndexOf = function (xs, x) {
      for (var i = 0, len = xs.length; i < len; ++i) {
        if (xs[i] === x) {
          return i;
        }
      }
      return -1;
    };
    var slice = Array.prototype.slice;
    var from$1 = isFunction(Array.from) ? Array.from : function (x) {
      return slice.call(x);
    };

    var shortcuts = [
      {
        shortcuts: ['Meta + B'],
        action: 'Bold'
      },
      {
        shortcuts: ['Meta + I'],
        action: 'Italic'
      },
      {
        shortcuts: ['Meta + U'],
        action: 'Underline'
      },
      {
        shortcuts: ['Meta + A'],
        action: 'Select all'
      },
      {
        shortcuts: [
          'Meta + Y',
          'Meta + Shift + Z'
        ],
        action: 'Redo'
      },
      {
        shortcuts: ['Meta + Z'],
        action: 'Undo'
      },
      {
        shortcuts: ['Access + 1'],
        action: 'Header 1'
      },
      {
        shortcuts: ['Access + 2'],
        action: 'Header 2'
      },
      {
        shortcuts: ['Access + 3'],
        action: 'Header 3'
      },
      {
        shortcuts: ['Access + 4'],
        action: 'Header 4'
      },
      {
        shortcuts: ['Access + 5'],
        action: 'Header 5'
      },
      {
        shortcuts: ['Access + 6'],
        action: 'Header 6'
      },
      {
        shortcuts: ['Access + 7'],
        action: 'Paragraph'
      },
      {
        shortcuts: ['Access + 8'],
        action: 'Div'
      },
      {
        shortcuts: ['Access + 9'],
        action: 'Address'
      },
      {
        shortcuts: ['Alt + 0'],
        action: 'Open help dialog'
      },
      {
        shortcuts: ['Alt + F9'],
        action: 'Focus to menubar'
      },
      {
        shortcuts: ['Alt + F10'],
        action: 'Focus to toolbar'
      },
      {
        shortcuts: ['Alt + F11'],
        action: 'Focus to element path'
      },
      {
        shortcuts: ['Ctrl + F9'],
        action: 'Focus to contextual toolbar'
      },
      {
        shortcuts: ['Shift + Enter'],
        action: 'Open popup menu for split buttons'
      },
      {
        shortcuts: ['Meta + K'],
        action: 'Insert link (if link plugin activated)'
      },
      {
        shortcuts: ['Meta + S'],
        action: 'Save (if save plugin activated)'
      },
      {
        shortcuts: ['Meta + F'],
        action: 'Find (if searchreplace plugin activated)'
      },
      {
        shortcuts: ['Meta + Shift + F'],
        action: 'Switch to or from fullscreen mode'
      }
    ];
    var KeyboardShortcuts = { shortcuts: shortcuts };

    var keys = Object.keys;
    var hasOwnProperty = Object.hasOwnProperty;
    var has = function (obj, key) {
      return hasOwnProperty.call(obj, key);
    };

    var global$1 = tinymce.util.Tools.resolve('tinymce.Env');

    var convertText = function (source) {
      var mac = {
        alt: '&#x2325;',
        ctrl: '&#x2303;',
        shift: '&#x21E7;',
        meta: '&#x2318;',
        access: '&#x2303;&#x2325;'
      };
      var other = {
        meta: 'Ctrl ',
        access: 'Shift + Alt '
      };
      var replace = global$1.mac ? mac : other;
      var shortcut = source.split('+');
      var updated = map(shortcut, function (segment) {
        var search = segment.toLowerCase().trim();
        return has(replace, search) ? replace[search] : segment;
      });
      return global$1.mac ? updated.join('').replace(/\s/, '') : updated.join('+');
    };
    var ConvertShortcut = { convertText: convertText };

    var tab = function () {
      var shortcutList = map(KeyboardShortcuts.shortcuts, function (shortcut) {
        var shortcutText = map(shortcut.shortcuts, ConvertShortcut.convertText).join(' or ');
        return [
          shortcut.action,
          shortcutText
        ];
      });
      var tablePanel = {
        type: 'table',
        header: [
          'Action',
          'Shortcut'
        ],
        cells: shortcutList
      };
      return {
        title: 'Handy Shortcuts',
        items: [tablePanel]
      };
    };
    var KeyboardShortcutsTab = { tab: tab };

    var supplant = function (str, obj) {
      var isStringOrNumber = function (a) {
        var t = typeof a;
        return t === 'string' || t === 'number';
      };
      return str.replace(/\$\{([^{}]*)\}/g, function (fullMatch, key) {
        var value = obj[key];
        return isStringOrNumber(value) ? value.toString() : fullMatch;
      });
    };

    var global$2 = tinymce.util.Tools.resolve('tinymce.util.I18n');

    var urls = [
      {
        key: 'advlist',
        name: 'Advanced List'
      },
      {
        key: 'anchor',
        name: 'Anchor'
      },
      {
        key: 'autolink',
        name: 'Autolink'
      },
      {
        key: 'autoresize',
        name: 'Autoresize'
      },
      {
        key: 'autosave',
        name: 'Autosave'
      },
      {
        key: 'bbcode',
        name: 'BBCode'
      },
      {
        key: 'charmap',
        name: 'Character Map'
      },
      {
        key: 'code',
        name: 'Code'
      },
      {
        key: 'codesample',
        name: 'Code Sample'
      },
      {
        key: 'colorpicker',
        name: 'Color Picker'
      },
      {
        key: 'directionality',
        name: 'Directionality'
      },
      {
        key: 'emoticons',
        name: 'Emoticons'
      },
      {
        key: 'fullpage',
        name: 'Full Page'
      },
      {
        key: 'fullscreen',
        name: 'Full Screen'
      },
      {
        key: 'help',
        name: 'Help'
      },
      {
        key: 'hr',
        name: 'Horizontal Rule'
      },
      {
        key: 'image',
        name: 'Image'
      },
      {
        key: 'imagetools',
        name: 'Image Tools'
      },
      {
        key: 'importcss',
        name: 'Import CSS'
      },
      {
        key: 'insertdatetime',
        name: 'Insert Date/Time'
      },
      {
        key: 'legacyoutput',
        name: 'Legacy Output'
      },
      {
        key: 'link',
        name: 'Link'
      },
      {
        key: 'lists',
        name: 'Lists'
      },
      {
        key: 'media',
        name: 'Media'
      },
      {
        key: 'nonbreaking',
        name: 'Nonbreaking'
      },
      {
        key: 'noneditable',
        name: 'Noneditable'
      },
      {
        key: 'pagebreak',
        name: 'Page Break'
      },
      {
        key: 'paste',
        name: 'Paste'
      },
      {
        key: 'preview',
        name: 'Preview'
      },
      {
        key: 'print',
        name: 'Print'
      },
      {
        key: 'save',
        name: 'Save'
      },
      {
        key: 'searchreplace',
        name: 'Search and Replace'
      },
      {
        key: 'spellchecker',
        name: 'Spell Checker'
      },
      {
        key: 'tabfocus',
        name: 'Tab Focus'
      },
      {
        key: 'table',
        name: 'Table'
      },
      {
        key: 'template',
        name: 'Template'
      },
      {
        key: 'textcolor',
        name: 'Text Color'
      },
      {
        key: 'textpattern',
        name: 'Text Pattern'
      },
      {
        key: 'toc',
        name: 'Table of Contents'
      },
      {
        key: 'visualblocks',
        name: 'Visual Blocks'
      },
      {
        key: 'visualchars',
        name: 'Visual Characters'
      },
      {
        key: 'wordcount',
        name: 'Word Count'
      },
      {
        key: 'advcode',
        name: 'Advanced Code Editor*'
      },
      {
        key: 'formatpainter',
        name: 'Format Painter*'
      },
      {
        key: 'powerpaste',
        name: 'PowerPaste*'
      },
      {
        key: 'tinydrive',
        name: 'Tiny Drive*'
      },
      {
        key: 'tinymcespellchecker',
        name: 'Spell Checker Pro*'
      },
      {
        key: 'a11ychecker',
        name: 'Accessibility Checker*'
      },
      {
        key: 'linkchecker',
        name: 'Link Checker*'
      },
      {
        key: 'mentions',
        name: 'Mentions*'
      },
      {
        key: 'mediaembed',
        name: 'Enhanced Media Embed*'
      },
      {
        key: 'checklist',
        name: 'Checklist*'
      },
      {
        key: 'casechange',
        name: 'Case Change*'
      },
      {
        key: 'permanentpen',
        name: 'Permanent Pen*'
      },
      {
        key: 'pageembed',
        name: 'Page Embed*'
      },
      {
        key: 'tinycomments',
        name: 'Tiny Comments*'
      }
    ];
    var PluginUrls = { urls: urls };

    var tab$1 = function (editor) {
      var availablePlugins = function () {
        var premiumPlugins = [
          'Accessibility Checker',
          'Advanced Code Editor',
          'Case Change',
          'Checklist',
          'Tiny Comments',
          'Tiny Drive',
          'Enhanced Media Embed',
          'Format Painter',
          'Link Checker',
          'Mentions',
          'MoxieManager',
          'Page Embed',
          'Permanent Pen',
          'PowerPaste',
          'Spell Checker Pro'
        ];
        var premiumPluginList = map(premiumPlugins, function (plugin) {
          return '<li>' + global$2.translate(plugin) + '</li>';
        }).join('');
        return '<div data-mce-tabstop="1" tabindex="-1">' + '<p><b>' + global$2.translate('Premium plugins:') + '</b></p>' + '<ul>' + premiumPluginList + '<li style="list-style: none; margin-top: 1em;"><a href="https://www.tiny.cloud/pricing/?utm_campaign=editor_referral&utm_medium=help_dialog&utm_source=tinymce" target="_blank">' + global$2.translate('Learn more...') + '</a></li>' + '</ul>' + '</div>';
      };
      var makeLink = curry(supplant, '<a href="${url}" target="_blank" rel="noopener">${name}</a>');
      var maybeUrlize = function (editor, key) {
        return find(PluginUrls.urls, function (x) {
          return x.key === key;
        }).fold(function () {
          var getMetadata = editor.plugins[key].getMetadata;
          return typeof getMetadata === 'function' ? makeLink(getMetadata()) : key;
        }, function (x) {
          return makeLink({
            name: x.name,
            url: 'https://www.tiny.cloud/docs/plugins/' + x.key
          });
        });
      };
      var getPluginKeys = function (editor) {
        var keys$1 = keys(editor.plugins);
        return editor.settings.forced_plugins === undefined ? keys$1 : filter(keys$1, not(curry(contains, editor.settings.forced_plugins)));
      };
      var pluginLister = function (editor) {
        var pluginKeys = getPluginKeys(editor);
        var pluginLis = map(pluginKeys, function (key) {
          return '<li>' + maybeUrlize(editor, key) + '</li>';
        });
        var count = pluginLis.length;
        var pluginsString = pluginLis.join('');
        var html = '<p><b>' + global$2.translate([
          'Plugins installed ({0}):',
          count
        ]) + '</b></p>' + '<ul>' + pluginsString + '</ul>';
        return html;
      };
      var installedPlugins = function (editor) {
        if (editor == null) {
          return '';
        }
        return '<div data-mce-tabstop="1" tabindex="-1">' + pluginLister(editor) + '</div>';
      };
      var htmlPanel = {
        type: 'htmlpanel',
        presets: 'document',
        html: [
          installedPlugins(editor),
          availablePlugins()
        ].join('')
      };
      return {
        title: 'Plugins',
        items: [htmlPanel]
      };
    };
    var PluginsTab = { tab: tab$1 };

    var global$3 = tinymce.util.Tools.resolve('tinymce.EditorManager');

    var defaultPanel = function () {
      var getVersion = function (major, minor) {
        return major.indexOf('@') === 0 ? 'X.X.X' : major + '.' + minor;
      };
      var version = getVersion(global$3.majorVersion, global$3.minorVersion);
      var changeLogLink = '<a href="https://www.tinymce.com/docs/changelog/?utm_campaign=editor_referral&utm_medium=help_dialog&utm_source=tinymce" target="_blank">TinyMCE ' + version + '</a>';
      var htmlPanel = {
        type: 'htmlpanel',
        html: '<p>' + global$2.translate([
          'You are using {0}',
          changeLogLink
        ]) + '</p>',
        presets: 'document'
      };
      return htmlPanel;
    };
    var VersionPanel = { defaultPanel: defaultPanel };

    var getVersionPanel = function (editor) {
      return editor.getParam('help_version', VersionPanel.defaultPanel, 'function')();
    };
    var Settings = { getVersionPanel: getVersionPanel };

    var tab$2 = function (editor) {
      return {
        title: 'Version',
        items: [Settings.getVersionPanel(editor)]
      };
    };
    var VersionTab = { tab: tab$2 };

    var opener = function (editor) {
      return function () {
        var body = {
          type: 'tabpanel',
          tabs: [
            KeyboardShortcutsTab.tab(),
            PluginsTab.tab(editor),
            VersionTab.tab(editor)
          ]
        };
        editor.windowManager.open({
          title: 'Help',
          size: 'medium',
          body: body,
          buttons: [{
              type: 'cancel',
              name: 'close',
              text: 'Close',
              primary: true
            }],
          initialData: {}
        });
      };
    };
    var Dialog = { opener: opener };

    var register = function (editor) {
      editor.addCommand('mceHelp', Dialog.opener(editor));
    };
    var Commands = { register: register };

    var register$1 = function (editor) {
      editor.ui.registry.addButton('help', {
        icon: 'help',
        tooltip: 'Help',
        onAction: Dialog.opener(editor)
      });
      editor.ui.registry.addMenuItem('help', {
        text: 'Help',
        icon: 'help',
        shortcut: 'Alt+0',
        onAction: Dialog.opener(editor)
      });
    };
    var Buttons = { register: register$1 };

    global.add('help', function (editor) {
      Buttons.register(editor);
      Commands.register(editor);
      editor.shortcuts.add('Alt+0', 'Open help dialog', 'mceHelp');
    });
    function Plugin () {
    }

    return Plugin;

}());
})();
