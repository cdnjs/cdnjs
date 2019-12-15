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
  var $_co65cu9ojh8lyzwe = {
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
  var $_foko8h9qjh8lyzwf = {
    setContent: setContent,
    getContent: getContent
  };

  var open = function (editor) {
    var minWidth = $_co65cu9ojh8lyzwe.getMinWidth(editor);
    var minHeight = $_co65cu9ojh8lyzwe.getMinHeight(editor);
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
        $_foko8h9qjh8lyzwf.setContent(editor, e.data.code);
      }
    });
    win.find('#code').value($_foko8h9qjh8lyzwf.getContent(editor));
  };
  var $_e52w2l9njh8lyzwc = { open: open };

  var register = function (editor) {
    editor.addCommand('mceCodeEditor', function () {
      $_e52w2l9njh8lyzwc.open(editor);
    });
  };
  var $_curgce9mjh8lyzwb = { register: register };

  var register$1 = function (editor) {
    editor.addButton('code', {
      icon: 'code',
      tooltip: 'Source code',
      onclick: function () {
        $_e52w2l9njh8lyzwc.open(editor);
      }
    });
    editor.addMenuItem('code', {
      icon: 'code',
      text: 'Source code',
      onclick: function () {
        $_e52w2l9njh8lyzwc.open(editor);
      }
    });
  };
  var $_y8a369rjh8lyzwg = { register: register$1 };

  global.add('code', function (editor) {
    $_curgce9mjh8lyzwb.register(editor);
    $_y8a369rjh8lyzwg.register(editor);
    return {};
  });
  function Plugin () {
  }

  return Plugin;

}());
})();
