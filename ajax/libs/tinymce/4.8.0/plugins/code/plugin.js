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
  var $_bkj0vta2jjgwebiu = {
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
  var $_bnaf14a4jjgwebiw = {
    setContent: setContent,
    getContent: getContent
  };

  var open = function (editor) {
    var minWidth = $_bkj0vta2jjgwebiu.getMinWidth(editor);
    var minHeight = $_bkj0vta2jjgwebiu.getMinHeight(editor);
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
        $_bnaf14a4jjgwebiw.setContent(editor, e.data.code);
      }
    });
    win.find('#code').value($_bnaf14a4jjgwebiw.getContent(editor));
  };
  var $_7n1iuxa1jjgwebit = { open: open };

  var register = function (editor) {
    editor.addCommand('mceCodeEditor', function () {
      $_7n1iuxa1jjgwebit.open(editor);
    });
  };
  var $_7j029sa0jjgwebis = { register: register };

  var register$1 = function (editor) {
    editor.addButton('code', {
      icon: 'code',
      tooltip: 'Source code',
      onclick: function () {
        $_7n1iuxa1jjgwebit.open(editor);
      }
    });
    editor.addMenuItem('code', {
      icon: 'code',
      text: 'Source code',
      onclick: function () {
        $_7n1iuxa1jjgwebit.open(editor);
      }
    });
  };
  var $_dv9koca5jjgwebix = { register: register$1 };

  global.add('code', function (editor) {
    $_7j029sa0jjgwebis.register(editor);
    $_dv9koca5jjgwebix.register(editor);
    return {};
  });
  function Plugin () {
  }

  return Plugin;

}());
})();
