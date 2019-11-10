(function () {
var hr = (function () {
  'use strict';

  var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

  var register = function (editor) {
    editor.addCommand('InsertHorizontalRule', function () {
      editor.execCommand('mceInsertContent', false, '<hr />');
    });
  };
  var $_7m2n29cmjm0ofyjv = { register: register };

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
  var $_ubzb3cnjm0ofyjw = { register: register$1 };

  global.add('hr', function (editor) {
    $_7m2n29cmjm0ofyjv.register(editor);
    $_ubzb3cnjm0ofyjw.register(editor);
  });
  function Plugin () {
  }

  return Plugin;

}());
})();
