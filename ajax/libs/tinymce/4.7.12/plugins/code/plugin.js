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
  var $_99yz6i9ojgqkwz63 = {
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
  var $_7hapjz9qjgqkwz65 = {
    setContent: setContent,
    getContent: getContent
  };

  var open = function (editor) {
    var minWidth = $_99yz6i9ojgqkwz63.getMinWidth(editor);
    var minHeight = $_99yz6i9ojgqkwz63.getMinHeight(editor);
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
        $_7hapjz9qjgqkwz65.setContent(editor, e.data.code);
      }
    });
    win.find('#code').value($_7hapjz9qjgqkwz65.getContent(editor));
  };
  var $_7upvi69njgqkwz62 = { open: open };

  var register = function (editor) {
    editor.addCommand('mceCodeEditor', function () {
      $_7upvi69njgqkwz62.open(editor);
    });
  };
  var $_9r22vf9mjgqkwz61 = { register: register };

  var register$1 = function (editor) {
    editor.addButton('code', {
      icon: 'code',
      tooltip: 'Source code',
      onclick: function () {
        $_7upvi69njgqkwz62.open(editor);
      }
    });
    editor.addMenuItem('code', {
      icon: 'code',
      text: 'Source code',
      onclick: function () {
        $_7upvi69njgqkwz62.open(editor);
      }
    });
  };
  var $_cjj7u09rjgqkwz66 = { register: register$1 };

  global.add('code', function (editor) {
    $_9r22vf9mjgqkwz61.register(editor);
    $_cjj7u09rjgqkwz66.register(editor);
    return {};
  });
  function Plugin () {
  }

  return Plugin;

}());
})();
