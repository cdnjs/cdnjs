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
  var $_bz5quda2jnlpb0vc = {
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
  var $_8gklpva4jnlpb0ve = {
    setContent: setContent,
    getContent: getContent
  };

  var open = function (editor) {
    var minWidth = $_bz5quda2jnlpb0vc.getMinWidth(editor);
    var minHeight = $_bz5quda2jnlpb0vc.getMinHeight(editor);
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
        $_8gklpva4jnlpb0ve.setContent(editor, e.data.code);
      }
    });
    win.find('#code').value($_8gklpva4jnlpb0ve.getContent(editor));
  };
  var $_3n8ypua1jnlpb0vb = { open: open };

  var register = function (editor) {
    editor.addCommand('mceCodeEditor', function () {
      $_3n8ypua1jnlpb0vb.open(editor);
    });
  };
  var $_4zjbyqa0jnlpb0v9 = { register: register };

  var register$1 = function (editor) {
    editor.addButton('code', {
      icon: 'code',
      tooltip: 'Source code',
      onclick: function () {
        $_3n8ypua1jnlpb0vb.open(editor);
      }
    });
    editor.addMenuItem('code', {
      icon: 'code',
      text: 'Source code',
      onclick: function () {
        $_3n8ypua1jnlpb0vb.open(editor);
      }
    });
  };
  var $_4hnrqya5jnlpb0vf = { register: register$1 };

  global.add('code', function (editor) {
    $_4zjbyqa0jnlpb0v9.register(editor);
    $_4hnrqya5jnlpb0vf.register(editor);
    return {};
  });
  function Plugin () {
  }

  return Plugin;

}());
})();
