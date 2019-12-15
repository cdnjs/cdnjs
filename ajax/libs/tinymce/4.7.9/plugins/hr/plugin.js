(function () {
var hr = (function () {
  'use strict';

  var PluginManager = tinymce.util.Tools.resolve('tinymce.PluginManager');

  var register = function (editor) {
    editor.addCommand('InsertHorizontalRule', function () {
      editor.execCommand('mceInsertContent', false, '<hr />');
    });
  };
  var $_ej2ugebsje5o2tmx = { register: register };

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
  var $_9ot34mbtje5o2tmy = { register: register$1 };

  PluginManager.add('hr', function (editor) {
    $_ej2ugebsje5o2tmx.register(editor);
    $_9ot34mbtje5o2tmy.register(editor);
  });
  function Plugin () {
  }

  return Plugin;

}());
})();
