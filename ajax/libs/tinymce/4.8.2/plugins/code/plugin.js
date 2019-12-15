(function () {
var code = (function () {
  'use strict';

  var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

  var global$1 = tinymce.util.Tools.resolve('tinymce.dom.DOMUtils');

  var getMinWidth = function (editor) {
    return editor.getParam('code_dialog_width', 600);
  };
  var getMinHeight = function (editor) {
    return editor.getParam('code_dialog_height', Math.min(global$1.DOM.getViewPort().h - 200, 500));
  };
  var $_2agnwba2jkmcwo8k = {
    getMinWidth: getMinWidth,
    getMinHeight: getMinHeight
  };

  var setContent = function (editor, html) {
    editor.focus();
    editor.undoManager.transact(function () {
      editor.setContent(html);
    });
    editor.selection.setCursorLocation();
    editor.nodeChanged();
  };
  var getContent = function (editor) {
    return editor.getContent({ source_view: true });
  };
  var $_gf01w3a4jkmcwo8n = {
    setContent: setContent,
    getContent: getContent
  };

  var open = function (editor) {
    var minWidth = $_2agnwba2jkmcwo8k.getMinWidth(editor);
    var minHeight = $_2agnwba2jkmcwo8k.getMinHeight(editor);
    var win = editor.windowManager.open({
      title: 'Source code',
      body: {
        type: 'textbox',
        name: 'code',
        multiline: true,
        minWidth: minWidth,
        minHeight: minHeight,
        spellcheck: false,
        style: 'direction: ltr; text-align: left'
      },
      onSubmit: function (e) {
        $_gf01w3a4jkmcwo8n.setContent(editor, e.data.code);
      }
    });
    win.find('#code').value($_gf01w3a4jkmcwo8n.getContent(editor));
  };
  var $_4xs1xna1jkmcwo8j = { open: open };

  var register = function (editor) {
    editor.addCommand('mceCodeEditor', function () {
      $_4xs1xna1jkmcwo8j.open(editor);
    });
  };
  var $_atmzsea0jkmcwo8i = { register: register };

  var register$1 = function (editor) {
    editor.addButton('code', {
      icon: 'code',
      tooltip: 'Source code',
      onclick: function () {
        $_4xs1xna1jkmcwo8j.open(editor);
      }
    });
    editor.addMenuItem('code', {
      icon: 'code',
      text: 'Source code',
      onclick: function () {
        $_4xs1xna1jkmcwo8j.open(editor);
      }
    });
  };
  var $_f9f308a5jkmcwo8o = { register: register$1 };

  global.add('code', function (editor) {
    $_atmzsea0jkmcwo8i.register(editor);
    $_f9f308a5jkmcwo8o.register(editor);
    return {};
  });
  function Plugin () {
  }

  return Plugin;

}());
})();
