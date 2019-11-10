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
  var $_2gs58k91jcq8h69z = {
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
  var $_9j6n6593jcq8h6a1 = {
    setContent: setContent,
    getContent: getContent
  };

  var open = function (editor) {
    var minWidth = $_2gs58k91jcq8h69z.getMinWidth(editor);
    var minHeight = $_2gs58k91jcq8h69z.getMinHeight(editor);
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
        $_9j6n6593jcq8h6a1.setContent(editor, e.data.code);
      }
    });
    win.find('#code').value($_9j6n6593jcq8h6a1.getContent(editor));
  };
  var $_dbpg4r90jcq8h69x = { open: open };

  var register = function (editor) {
    editor.addCommand('mceCodeEditor', function () {
      $_dbpg4r90jcq8h69x.open(editor);
    });
  };
  var $_cm6iwg8zjcq8h69w = { register: register };

  var register$1 = function (editor) {
    editor.addButton('code', {
      icon: 'code',
      tooltip: 'Source code',
      onclick: function () {
        $_dbpg4r90jcq8h69x.open(editor);
      }
    });
    editor.addMenuItem('code', {
      icon: 'code',
      text: 'Source code',
      onclick: function () {
        $_dbpg4r90jcq8h69x.open(editor);
      }
    });
  };
  var $_c6v0ka94jcq8h6a2 = { register: register$1 };

  PluginManager.add('code', function (editor) {
    $_cm6iwg8zjcq8h69w.register(editor);
    $_c6v0ka94jcq8h6a2.register(editor);
    return {};
  });
  var Plugin = function () {
  };

  return Plugin;

}());
})()
