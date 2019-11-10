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
  var $_fr6uym91jd09evml = {
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
  var $_8uqjeh93jd09evmm = {
    setContent: setContent,
    getContent: getContent
  };

  var open = function (editor) {
    var minWidth = $_fr6uym91jd09evml.getMinWidth(editor);
    var minHeight = $_fr6uym91jd09evml.getMinHeight(editor);
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
        $_8uqjeh93jd09evmm.setContent(editor, e.data.code);
      }
    });
    win.find('#code').value($_8uqjeh93jd09evmm.getContent(editor));
  };
  var $_6y34fq90jd09evmj = { open: open };

  var register = function (editor) {
    editor.addCommand('mceCodeEditor', function () {
      $_6y34fq90jd09evmj.open(editor);
    });
  };
  var $_5cbnc58zjd09evmi = { register: register };

  var register$1 = function (editor) {
    editor.addButton('code', {
      icon: 'code',
      tooltip: 'Source code',
      onclick: function () {
        $_6y34fq90jd09evmj.open(editor);
      }
    });
    editor.addMenuItem('code', {
      icon: 'code',
      text: 'Source code',
      onclick: function () {
        $_6y34fq90jd09evmj.open(editor);
      }
    });
  };
  var $_fo0ike94jd09evmn = { register: register$1 };

  PluginManager.add('code', function (editor) {
    $_5cbnc58zjd09evmi.register(editor);
    $_fo0ike94jd09evmn.register(editor);
    return {};
  });
  function Plugin () {
  }

  return Plugin;

}());
})()
