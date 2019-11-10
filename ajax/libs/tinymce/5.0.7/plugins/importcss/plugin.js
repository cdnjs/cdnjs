/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 *
 * Version: 5.0.7 (2019-06-05)
 */
(function () {
var importcss = (function () {
    'use strict';

    var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

    var global$1 = tinymce.util.Tools.resolve('tinymce.dom.DOMUtils');

    var global$2 = tinymce.util.Tools.resolve('tinymce.EditorManager');

    var global$3 = tinymce.util.Tools.resolve('tinymce.Env');

    var global$4 = tinymce.util.Tools.resolve('tinymce.util.Tools');

    var shouldMergeClasses = function (editor) {
      return editor.getParam('importcss_merge_classes');
    };
    var shouldImportExclusive = function (editor) {
      return editor.getParam('importcss_exclusive');
    };
    var getSelectorConverter = function (editor) {
      return editor.getParam('importcss_selector_converter');
    };
    var getSelectorFilter = function (editor) {
      return editor.getParam('importcss_selector_filter');
    };
    var getCssGroups = function (editor) {
      return editor.getParam('importcss_groups');
    };
    var shouldAppend = function (editor) {
      return editor.getParam('importcss_append');
    };
    var getFileFilter = function (editor) {
      return editor.getParam('importcss_file_filter');
    };
    var Settings = {
      shouldMergeClasses: shouldMergeClasses,
      shouldImportExclusive: shouldImportExclusive,
      getSelectorConverter: getSelectorConverter,
      getSelectorFilter: getSelectorFilter,
      getCssGroups: getCssGroups,
      shouldAppend: shouldAppend,
      getFileFilter: getFileFilter
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

    var slice = Array.prototype.slice;
    var map = function (xs, f) {
      var len = xs.length;
      var r = new Array(len);
      for (var i = 0; i < len; i++) {
        var x = xs[i];
        r[i] = f(x, i, xs);
      }
      return r;
    };
    var push = Array.prototype.push;
    var flatten = function (xs) {
      var r = [];
      for (var i = 0, len = xs.length; i < len; ++i) {
        if (!Array.prototype.isPrototypeOf(xs[i]))
          throw new Error('Arr.flatten item ' + i + ' was not an array, input: ' + xs);
        push.apply(r, xs[i]);
      }
      return r;
    };
    var bind = function (xs, f) {
      var output = map(xs, f);
      return flatten(output);
    };
    var from = isFunction(Array.from) ? Array.from : function (x) {
      return slice.call(x);
    };

    var generate = function () {
      var ungroupedOrder = [];
      var groupOrder = [];
      var groups = {};
      var addItemToGroup = function (groupTitle, itemInfo) {
        if (groups[groupTitle]) {
          groups[groupTitle].push(itemInfo);
        } else {
          groupOrder.push(groupTitle);
          groups[groupTitle] = [itemInfo];
        }
      };
      var addItem = function (itemInfo) {
        ungroupedOrder.push(itemInfo);
      };
      var toFormats = function () {
        var groupItems = bind(groupOrder, function (g) {
          var items = groups[g];
          return items.length === 0 ? [] : [{
              title: g,
              items: items
            }];
        });
        return groupItems.concat(ungroupedOrder);
      };
      return {
        addItemToGroup: addItemToGroup,
        addItem: addItem,
        toFormats: toFormats
      };
    };

    var removeCacheSuffix = function (url) {
      var cacheSuffix = global$3.cacheSuffix;
      if (typeof url === 'string') {
        url = url.replace('?' + cacheSuffix, '').replace('&' + cacheSuffix, '');
      }
      return url;
    };
    var isSkinContentCss = function (editor, href) {
      var settings = editor.settings, skin = settings.skin !== false ? settings.skin || 'oxide' : false;
      if (skin) {
        var skinUrl = settings.skin_url ? editor.documentBaseURI.toAbsolute(settings.skin_url) : global$2.baseURL + '/skins/ui/' + skin;
        var contentSkinUrlPart = global$2.baseURL + '/skins/content/';
        return href === skinUrl + '/content' + (editor.inline ? '.inline' : '') + '.min.css' || href.indexOf(contentSkinUrlPart) !== -1;
      }
      return false;
    };
    var compileFilter = function (filter) {
      if (typeof filter === 'string') {
        return function (value) {
          return value.indexOf(filter) !== -1;
        };
      } else if (filter instanceof RegExp) {
        return function (value) {
          return filter.test(value);
        };
      }
      return filter;
    };
    var getSelectors = function (editor, doc, fileFilter) {
      var selectors = [], contentCSSUrls = {};
      function append(styleSheet, imported) {
        var href = styleSheet.href, rules;
        href = removeCacheSuffix(href);
        if (!href || !fileFilter(href, imported) || isSkinContentCss(editor, href)) {
          return;
        }
        global$4.each(styleSheet.imports, function (styleSheet) {
          append(styleSheet, true);
        });
        try {
          rules = styleSheet.cssRules || styleSheet.rules;
        } catch (e) {
        }
        global$4.each(rules, function (cssRule) {
          if (cssRule.styleSheet) {
            append(cssRule.styleSheet, true);
          } else if (cssRule.selectorText) {
            global$4.each(cssRule.selectorText.split(','), function (selector) {
              selectors.push(global$4.trim(selector));
            });
          }
        });
      }
      global$4.each(editor.contentCSS, function (url) {
        contentCSSUrls[url] = true;
      });
      if (!fileFilter) {
        fileFilter = function (href, imported) {
          return imported || contentCSSUrls[href];
        };
      }
      try {
        global$4.each(doc.styleSheets, function (styleSheet) {
          append(styleSheet);
        });
      } catch (e) {
      }
      return selectors;
    };
    var defaultConvertSelectorToFormat = function (editor, selectorText) {
      var format;
      var selector = /^(?:([a-z0-9\-_]+))?(\.[a-z0-9_\-\.]+)$/i.exec(selectorText);
      if (!selector) {
        return;
      }
      var elementName = selector[1];
      var classes = selector[2].substr(1).split('.').join(' ');
      var inlineSelectorElements = global$4.makeMap('a,img');
      if (selector[1]) {
        format = { title: selectorText };
        if (editor.schema.getTextBlockElements()[elementName]) {
          format.block = elementName;
        } else if (editor.schema.getBlockElements()[elementName] || inlineSelectorElements[elementName.toLowerCase()]) {
          format.selector = elementName;
        } else {
          format.inline = elementName;
        }
      } else if (selector[2]) {
        format = {
          inline: 'span',
          title: selectorText.substr(1),
          classes: classes
        };
      }
      if (Settings.shouldMergeClasses(editor) !== false) {
        format.classes = classes;
      } else {
        format.attributes = { class: classes };
      }
      return format;
    };
    var getGroupsBySelector = function (groups, selector) {
      return global$4.grep(groups, function (group) {
        return !group.filter || group.filter(selector);
      });
    };
    var compileUserDefinedGroups = function (groups) {
      return global$4.map(groups, function (group) {
        return global$4.extend({}, group, {
          original: group,
          selectors: {},
          filter: compileFilter(group.filter),
          item: {
            text: group.title,
            menu: []
          }
        });
      });
    };
    var isExclusiveMode = function (editor, group) {
      return group === null || Settings.shouldImportExclusive(editor) !== false;
    };
    var isUniqueSelector = function (editor, selector, group, globallyUniqueSelectors) {
      return !(isExclusiveMode(editor, group) ? selector in globallyUniqueSelectors : selector in group.selectors);
    };
    var markUniqueSelector = function (editor, selector, group, globallyUniqueSelectors) {
      if (isExclusiveMode(editor, group)) {
        globallyUniqueSelectors[selector] = true;
      } else {
        group.selectors[selector] = true;
      }
    };
    var convertSelectorToFormat = function (editor, plugin, selector, group) {
      var selectorConverter;
      if (group && group.selector_converter) {
        selectorConverter = group.selector_converter;
      } else if (Settings.getSelectorConverter(editor)) {
        selectorConverter = Settings.getSelectorConverter(editor);
      } else {
        selectorConverter = function () {
          return defaultConvertSelectorToFormat(editor, selector);
        };
      }
      return selectorConverter.call(plugin, selector, group);
    };
    var setup = function (editor) {
      editor.on('init', function (e) {
        var model = generate();
        var globallyUniqueSelectors = {};
        var selectorFilter = compileFilter(Settings.getSelectorFilter(editor));
        var groups = compileUserDefinedGroups(Settings.getCssGroups(editor));
        var processSelector = function (selector, group) {
          if (isUniqueSelector(editor, selector, group, globallyUniqueSelectors)) {
            markUniqueSelector(editor, selector, group, globallyUniqueSelectors);
            var format = convertSelectorToFormat(editor, editor.plugins.importcss, selector, group);
            if (format) {
              var formatName = format.name || global$1.DOM.uniqueId();
              editor.formatter.register(formatName, format);
              return global$4.extend({}, {
                title: format.title,
                format: formatName
              });
            }
          }
          return null;
        };
        global$4.each(getSelectors(editor, editor.getDoc(), compileFilter(Settings.getFileFilter(editor))), function (selector) {
          if (selector.indexOf('.mce-') === -1) {
            if (!selectorFilter || selectorFilter(selector)) {
              var selectorGroups = getGroupsBySelector(groups, selector);
              if (selectorGroups.length > 0) {
                global$4.each(selectorGroups, function (group) {
                  var menuItem = processSelector(selector, group);
                  if (menuItem) {
                    model.addItemToGroup(group.title, menuItem);
                  }
                });
              } else {
                var menuItem = processSelector(selector, null);
                if (menuItem) {
                  model.addItem(menuItem);
                }
              }
            }
          }
        });
        var items = model.toFormats();
        editor.fire('addStyleModifications', {
          items: items,
          replace: !Settings.shouldAppend(editor)
        });
      });
    };
    var ImportCss = {
      defaultConvertSelectorToFormat: defaultConvertSelectorToFormat,
      setup: setup
    };

    var get = function (editor) {
      var convertSelectorToFormat = function (selectorText) {
        return ImportCss.defaultConvertSelectorToFormat(editor, selectorText);
      };
      return { convertSelectorToFormat: convertSelectorToFormat };
    };
    var Api = { get: get };

    global.add('importcss', function (editor) {
      ImportCss.setup(editor);
      return Api.get(editor);
    });
    function Plugin () {
    }

    return Plugin;

}());
})();
