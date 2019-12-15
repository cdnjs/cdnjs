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
  var $_3946dn9ajdud79zl = {
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
  var $_avuhvz9cjdud79zm = {
    setContent: setContent,
    getContent: getContent
  };

  var open = function (editor) {
    var minWidth = $_3946dn9ajdud79zl.getMinWidth(editor);
    var minHeight = $_3946dn9ajdud79zl.getMinHeight(editor);
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
        $_avuhvz9cjdud79zm.setContent(editor, e.data.code);
      }
    });
    win.find('#code').value($_avuhvz9cjdud79zm.getContent(editor));
  };
  var $_acaiv399jdud79zk = { open: open };

  var register = function (editor) {
    editor.addCommand('mceCodeEditor', function () {
      $_acaiv399jdud79zk.open(editor);
    });
  };
  var $_3nj3no98jdud79zi = { register: register };

  var register$1 = function (editor) {
    editor.addButton('code', {
      icon: 'code',
      tooltip: 'Source code',
      onclick: function () {
        $_acaiv399jdud79zk.open(editor);
      }
    });
    editor.addMenuItem('code', {
      icon: 'code',
      text: 'Source code',
      onclick: function () {
        $_acaiv399jdud79zk.open(editor);
      }
    });
  };
  var $_ctff7g9djdud79zn = { register: register$1 };

  PluginManager.add('code', function (editor) {
    $_3nj3no98jdud79zi.register(editor);
    $_ctff7g9djdud79zn.register(editor);
    return {};
  });
  function Plugin () {
  }

  return Plugin;

}());
})();
