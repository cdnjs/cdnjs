(function () {
var importcss = (function () {
  'use strict';

  var PluginManager = tinymce.util.Tools.resolve('tinymce.PluginManager');

  var DOMUtils = tinymce.util.Tools.resolve('tinymce.dom.DOMUtils');

  var EditorManager = tinymce.util.Tools.resolve('tinymce.EditorManager');

  var Env = tinymce.util.Tools.resolve('tinymce.Env');

  var Tools = tinymce.util.Tools.resolve('tinymce.util.Tools');

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
  var $_fb9djdwjd09ewd1 = {
    shouldMergeClasses: shouldMergeClasses,
    shouldImportExclusive: shouldImportExclusive,
    getSelectorConverter: getSelectorConverter,
    getSelectorFilter: getSelectorFilter,
    getCssGroups: getCssGroups,
    shouldAppend: shouldAppend,
    getFileFilter: getFileFilter
  };

  var removeCacheSuffix = function (url) {
    var cacheSuffix = Env.cacheSuffix;
    if (typeof url === 'string') {
      url = url.replace('?' + cacheSuffix, '').replace('&' + cacheSuffix, '');
    }
    return url;
  };
  var isSkinContentCss = function (editor, href) {
    var settings = editor.settings, skin = settings.skin !== false ? settings.skin || 'lightgray' : false;
    if (skin) {
      var skinUrl = settings.skin_url ? editor.documentBaseURI.toAbsolute(settings.skin_url) : EditorManager.baseURL + '/skins/' + skin;
      return href === skinUrl + '/content' + (editor.inline ? '.inline' : '') + '.min.css';
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
      Tools.each(styleSheet.imports, function (styleSheet) {
        append(styleSheet, true);
      });
      try {
        rules = styleSheet.cssRules || styleSheet.rules;
      } catch (e) {
      }
      Tools.each(rules, function (cssRule) {
        if (cssRule.styleSheet) {
          append(cssRule.styleSheet, true);
        } else if (cssRule.selectorText) {
          Tools.each(cssRule.selectorText.split(','), function (selector) {
            selectors.push(Tools.trim(selector));
          });
        }
      });
    }
    Tools.each(editor.contentCSS, function (url) {
      contentCSSUrls[url] = true;
    });
    if (!fileFilter) {
      fileFilter = function (href, imported) {
        return imported || contentCSSUrls[href];
      };
    }
    try {
      Tools.each(doc.styleSheets, function (styleSheet) {
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
    var inlineSelectorElements = Tools.makeMap('a,img');
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
    if ($_fb9djdwjd09ewd1.shouldMergeClasses(editor) !== false) {
      format.classes = classes;
    } else {
      format.attributes = { class: classes };
    }
    return format;
  };
  var getGroupsBySelector = function (groups, selector) {
    return Tools.grep(groups, function (group) {
      return !group.filter || group.filter(selector);
    });
  };
  var compileUserDefinedGroups = function (groups) {
    return Tools.map(groups, function (group) {
      return Tools.extend({}, group, {
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
    return group === null || $_fb9djdwjd09ewd1.shouldImportExclusive(editor) !== false;
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
    } else if ($_fb9djdwjd09ewd1.getSelectorConverter(editor)) {
      selectorConverter = $_fb9djdwjd09ewd1.getSelectorConverter(editor);
    } else {
      selectorConverter = function () {
        return defaultConvertSelectorToFormat(editor, selector);
      };
    }
    return selectorConverter.call(plugin, selector, group);
  };
  var setup = function (editor) {
    editor.on('renderFormatsMenu', function (e) {
      var globallyUniqueSelectors = {};
      var selectorFilter = compileFilter($_fb9djdwjd09ewd1.getSelectorFilter(editor)), ctrl = e.control;
      var groups = compileUserDefinedGroups($_fb9djdwjd09ewd1.getCssGroups(editor));
      var processSelector = function (selector, group) {
        if (isUniqueSelector(editor, selector, group, globallyUniqueSelectors)) {
          markUniqueSelector(editor, selector, group, globallyUniqueSelectors);
          var format = convertSelectorToFormat(editor, editor.plugins.importcss, selector, group);
          if (format) {
            var formatName = format.name || DOMUtils.DOM.uniqueId();
            editor.formatter.register(formatName, format);
            return Tools.extend({}, ctrl.settings.itemDefaults, {
              text: format.title,
              format: formatName
            });
          }
        }
        return null;
      };
      if (!$_fb9djdwjd09ewd1.shouldAppend(editor)) {
        ctrl.items().remove();
      }
      Tools.each(getSelectors(editor, e.doc || editor.getDoc(), compileFilter($_fb9djdwjd09ewd1.getFileFilter(editor))), function (selector) {
        if (selector.indexOf('.mce-') === -1) {
          if (!selectorFilter || selectorFilter(selector)) {
            var selectorGroups = getGroupsBySelector(groups, selector);
            if (selectorGroups.length > 0) {
              Tools.each(selectorGroups, function (group) {
                var menuItem = processSelector(selector, group);
                if (menuItem) {
                  group.item.menu.push(menuItem);
                }
              });
            } else {
              var menuItem = processSelector(selector, null);
              if (menuItem) {
                ctrl.add(menuItem);
              }
            }
          }
        }
      });
      Tools.each(groups, function (group) {
        if (group.item.menu.length > 0) {
          ctrl.add(group.item);
        }
      });
      e.control.renderNew();
    });
  };
  var $_2ll1badrjd09ewcv = {
    defaultConvertSelectorToFormat: defaultConvertSelectorToFormat,
    setup: setup
  };

  var get = function (editor) {
    var convertSelectorToFormat = function (selectorText) {
      return $_2ll1badrjd09ewcv.defaultConvertSelectorToFormat(editor, selectorText);
    };
    return { convertSelectorToFormat: convertSelectorToFormat };
  };
  var $_6z3rqddqjd09ewcs = { get: get };

  PluginManager.add('importcss', function (editor) {
    $_2ll1badrjd09ewcv.setup(editor);
    return $_6z3rqddqjd09ewcs.get(editor);
  });
  function Plugin () {
  }

  return Plugin;

}());
})()
