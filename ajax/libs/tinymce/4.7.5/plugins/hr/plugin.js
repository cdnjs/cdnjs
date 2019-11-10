(function () {
var hr = (function () {
  'use strict';

  var PluginManager = tinymce.util.Tools.resolve('tinymce.PluginManager');

  var register = function (editor) {
    editor.addCommand('InsertHorizontalRule', function () {
      editor.execCommand('mceInsertContent', false, '<hr />');
    });
  };
  var $_ay2azxbjjcq8h6kg = { register: register };

  var register$1 = function (editor) {
    editor.addButton('hr', {
      icon: 'hr',
      tooltip: 'Horizontal line',
      cmd: 'InsertHorizontalRule'
    });
    editor.addMenuItem('hr', {
      icon: 'hr',
      text: 'Horizontal line',
      cmd: 'InsertHorizontalRule',
      context: 'insert'
    });
  };
  var $_b46yssbkjcq8h6kh = { register: register$1 };

  PluginManager.add('hr', function (editor) {
    $_ay2azxbjjcq8h6kg.register(editor);
    $_b46yssbkjcq8h6kh.register(editor);
  });
  var Plugin = function () {
  };

  return Plugin;

}());
})()
