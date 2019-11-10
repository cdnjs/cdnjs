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
  var $_8n2vxo9hjfuw8oox = {
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
  var $_c8v5dw9jjfuw8ooz = {
    setContent: setContent,
    getContent: getContent
  };

  var open = function (editor) {
    var minWidth = $_8n2vxo9hjfuw8oox.getMinWidth(editor);
    var minHeight = $_8n2vxo9hjfuw8oox.getMinHeight(editor);
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
        $_c8v5dw9jjfuw8ooz.setContent(editor, e.data.code);
      }
    });
    win.find('#code').value($_c8v5dw9jjfuw8ooz.getContent(editor));
  };
  var $_8yugbi9gjfuw8oow = { open: open };

  var register = function (editor) {
    editor.addCommand('mceCodeEditor', function () {
      $_8yugbi9gjfuw8oow.open(editor);
    });
  };
  var $_5kgtxs9fjfuw8oov = { register: register };

  var register$1 = function (editor) {
    editor.addButton('code', {
      icon: 'code',
      tooltip: 'Source code',
      onclick: function () {
        $_8yugbi9gjfuw8oow.open(editor);
      }
    });
    editor.addMenuItem('code', {
      icon: 'code',
      text: 'Source code',
      onclick: function () {
        $_8yugbi9gjfuw8oow.open(editor);
      }
    });
  };
  var $_ei78kz9kjfuw8op0 = { register: register$1 };

  global.add('code', function (editor) {
    $_5kgtxs9fjfuw8oov.register(editor);
    $_ei78kz9kjfuw8op0.register(editor);
    return {};
  });
  function Plugin () {
  }

  return Plugin;

}());
})();
