(function () {
var code = (function () {
  'use strict';

  var PluginManager = tinymce.util.Tools.resolve('tinymce.PluginManager');

  var DOMUtils = tinymce.util.Tools.resolve('tinymce.dom.DOMUtils');

  var getMinWidth = function (editor) {
    return editor.getParam('code_dialog_width', 600);
  };
  var getMinHeight = function (editor) {
    return editor.getParam('code_dialog_height', Math.min(DOMUtils.DOM.getViewPort().h - 200, 500));
  };
  var $_d51mfj9aje4cbw2z = {
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
  var $_c0tu4r9cje4cbw30 = {
    setContent: setContent,
    getContent: getContent
  };

  var open = function (editor) {
    var minWidth = $_d51mfj9aje4cbw2z.getMinWidth(editor);
    var minHeight = $_d51mfj9aje4cbw2z.getMinHeight(editor);
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
        $_c0tu4r9cje4cbw30.setContent(editor, e.data.code);
      }
    });
    win.find('#code').value($_c0tu4r9cje4cbw30.getContent(editor));
  };
  var $_bkf1e399je4cbw2y = { open: open };

  var register = function (editor) {
    editor.addCommand('mceCodeEditor', function () {
      $_bkf1e399je4cbw2y.open(editor);
    });
  };
  var $_74j37p98je4cbw2x = { register: register };

  var register$1 = function (editor) {
    editor.addButton('code', {
      icon: 'code',
      tooltip: 'Source code',
      onclick: function () {
        $_bkf1e399je4cbw2y.open(editor);
      }
    });
    editor.addMenuItem('code', {
      icon: 'code',
      text: 'Source code',
      onclick: function () {
        $_bkf1e399je4cbw2y.open(editor);
      }
    });
  };
  var $_54zsp59dje4cbw31 = { register: register$1 };

  PluginManager.add('code', function (editor) {
    $_74j37p98je4cbw2x.register(editor);
    $_54zsp59dje4cbw31.register(editor);
    return {};
  });
  function Plugin () {
  }

  return Plugin;

}());
})();
