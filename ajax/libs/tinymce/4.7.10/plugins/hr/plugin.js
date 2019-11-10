(function () {
var hr = (function () {
  'use strict';

  var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

  var register = function (editor) {
    editor.addCommand('InsertHorizontalRule', function () {
      editor.execCommand('mceInsertContent', false, '<hr />');
    });
  };
  var $_3sqdv0bwjfjm4kax = { register: register };

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
  var $_4inb7gbxjfjm4kay = { register: register$1 };

  global.add('hr', function (editor) {
    $_3sqdv0bwjfjm4kax.register(editor);
    $_4inb7gbxjfjm4kay.register(editor);
  });
  function Plugin () {
  }

  return Plugin;

}());
})();
