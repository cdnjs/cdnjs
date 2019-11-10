(function () {
var hr = (function () {
  'use strict';

  var PluginManager = tinymce.util.Tools.resolve('tinymce.PluginManager');

  var register = function (editor) {
    editor.addCommand('InsertHorizontalRule', function () {
      editor.execCommand('mceInsertContent', false, '<hr />');
    });
  };
  var $_817bcvbjjd09evxv = { register: register };

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
  var $_f0wf0vbkjd09evxw = { register: register$1 };

  PluginManager.add('hr', function (editor) {
    $_817bcvbjjd09evxv.register(editor);
    $_f0wf0vbkjd09evxw.register(editor);
  });
  function Plugin () {
  }

  return Plugin;

}());
})()
