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
  var $_byxbroa2jk26xivd = {
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
  var $_8bd43oa4jk26xivf = {
    setContent: setContent,
    getContent: getContent
  };

  var open = function (editor) {
    var minWidth = $_byxbroa2jk26xivd.getMinWidth(editor);
    var minHeight = $_byxbroa2jk26xivd.getMinHeight(editor);
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
        $_8bd43oa4jk26xivf.setContent(editor, e.data.code);
      }
    });
    win.find('#code').value($_8bd43oa4jk26xivf.getContent(editor));
  };
  var $_3lhnq3a1jk26xiva = { open: open };

  var register = function (editor) {
    editor.addCommand('mceCodeEditor', function () {
      $_3lhnq3a1jk26xiva.open(editor);
    });
  };
  var $_76xvz9a0jk26xiv9 = { register: register };

  var register$1 = function (editor) {
    editor.addButton('code', {
      icon: 'code',
      tooltip: 'Source code',
      onclick: function () {
        $_3lhnq3a1jk26xiva.open(editor);
      }
    });
    editor.addMenuItem('code', {
      icon: 'code',
      text: 'Source code',
      onclick: function () {
        $_3lhnq3a1jk26xiva.open(editor);
      }
    });
  };
  var $_7q69y6a5jk26xivg = { register: register$1 };

  global.add('code', function (editor) {
    $_76xvz9a0jk26xiv9.register(editor);
    $_7q69y6a5jk26xivg.register(editor);
    return {};
  });
  function Plugin () {
  }

  return Plugin;

}());
})();
