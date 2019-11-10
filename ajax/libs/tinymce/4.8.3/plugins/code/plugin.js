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
  var $_e90paoa1jm0ofy6v = {
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
  var $_6f8nd4a3jm0ofy6w = {
    setContent: setContent,
    getContent: getContent
  };

  var open = function (editor) {
    var minWidth = $_e90paoa1jm0ofy6v.getMinWidth(editor);
    var minHeight = $_e90paoa1jm0ofy6v.getMinHeight(editor);
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
        $_6f8nd4a3jm0ofy6w.setContent(editor, e.data.code);
      }
    });
    win.find('#code').value($_6f8nd4a3jm0ofy6w.getContent(editor));
  };
  var $_6ohe8ba0jm0ofy6t = { open: open };

  var register = function (editor) {
    editor.addCommand('mceCodeEditor', function () {
      $_6ohe8ba0jm0ofy6t.open(editor);
    });
  };
  var $_fvwfr9zjm0ofy6s = { register: register };

  var register$1 = function (editor) {
    editor.addButton('code', {
      icon: 'code',
      tooltip: 'Source code',
      onclick: function () {
        $_6ohe8ba0jm0ofy6t.open(editor);
      }
    });
    editor.addMenuItem('code', {
      icon: 'code',
      text: 'Source code',
      onclick: function () {
        $_6ohe8ba0jm0ofy6t.open(editor);
      }
    });
  };
  var $_h5j0na4jm0ofy6x = { register: register$1 };

  global.add('code', function (editor) {
    $_fvwfr9zjm0ofy6s.register(editor);
    $_h5j0na4jm0ofy6x.register(editor);
    return {};
  });
  function Plugin () {
  }

  return Plugin;

}());
})();
