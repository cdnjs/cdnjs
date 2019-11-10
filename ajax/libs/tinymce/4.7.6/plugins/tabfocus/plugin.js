(function () {
var tabfocus = (function () {
  'use strict';

  var PluginManager = tinymce.util.Tools.resolve('tinymce.PluginManager');

  var DOMUtils = tinymce.util.Tools.resolve('tinymce.dom.DOMUtils');

  var EditorManager = tinymce.util.Tools.resolve('tinymce.EditorManager');

  var Env = tinymce.util.Tools.resolve('tinymce.Env');

  var Delay = tinymce.util.Tools.resolve('tinymce.util.Delay');

  var Tools = tinymce.util.Tools.resolve('tinymce.util.Tools');

  var VK = tinymce.util.Tools.resolve('tinymce.util.VK');

  var getTabFocusElements = function (editor) {
    return editor.getParam('tabfocus_elements', ':prev,:next');
  };
  var getTabFocus = function (editor) {
    return editor.getParam('tab_focus', getTabFocusElements(editor));
  };
  var $_10p5r2jcjd09ewzh = { getTabFocus: getTabFocus };

  var DOM = DOMUtils.DOM;
  var tabCancel = function (e) {
    if (e.keyCode === VK.TAB && !e.ctrlKey && !e.altKey && !e.metaKey) {
      e.preventDefault();
    }
  };
  var setup = function (editor) {
    function tabHandler(e) {
      var x, el, v, i;
      if (e.keyCode !== VK.TAB || e.ctrlKey || e.altKey || e.metaKey || e.isDefaultPrevented()) {
        return;
      }
      function find(direction) {
        el = DOM.select(':input:enabled,*[tabindex]:not(iframe)');
        function canSelectRecursive(e) {
          return e.nodeName === 'BODY' || e.type !== 'hidden' && e.style.display !== 'none' && e.style.visibility !== 'hidden' && canSelectRecursive(e.parentNode);
        }
        function canSelect(el) {
          return /INPUT|TEXTAREA|BUTTON/.test(el.tagName) && EditorManager.get(e.id) && el.tabIndex !== -1 && canSelectRecursive(el);
        }
        Tools.each(el, function (e, i) {
          if (e.id === editor.id) {
            x = i;
            return false;
          }
        });
        if (direction > 0) {
          for (i = x + 1; i < el.length; i++) {
            if (canSelect(el[i])) {
              return el[i];
            }
          }
        } else {
          for (i = x - 1; i >= 0; i--) {
            if (canSelect(el[i])) {
              return el[i];
            }
          }
        }
        return null;
      }
      v = Tools.explode($_10p5r2jcjd09ewzh.getTabFocus(editor));
      if (v.length === 1) {
        v[1] = v[0];
        v[0] = ':prev';
      }
      if (e.shiftKey) {
        if (v[0] === ':prev') {
          el = find(-1);
        } else {
          el = DOM.get(v[0]);
        }
      } else {
        if (v[1] === ':next') {
          el = find(1);
        } else {
          el = DOM.get(v[1]);
        }
      }
      if (el) {
        var focusEditor = EditorManager.get(el.id || el.name);
        if (el.id && focusEditor) {
          focusEditor.focus();
        } else {
          Delay.setTimeout(function () {
            if (!Env.webkit) {
              window.focus();
            }
            el.focus();
          }, 10);
        }
        e.preventDefault();
      }
    }
    editor.on('init', function () {
      if (editor.inline) {
        DOM.setAttrib(editor.getBody(), 'tabIndex', null);
      }
      editor.on('keyup', tabCancel);
      if (Env.gecko) {
        editor.on('keypress keydown', tabHandler);
      } else {
        editor.on('keydown', tabHandler);
      }
    });
  };
  var $_2zphlpj5jd09ewzc = { setup: setup };

  PluginManager.add('tabfocus', function (editor) {
    $_2zphlpj5jd09ewzc.setup(editor);
  });
  function Plugin () {
  }

  return Plugin;

}());
})()
