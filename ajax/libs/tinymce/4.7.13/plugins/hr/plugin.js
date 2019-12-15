(function () {
var hr = (function () {
  'use strict';

  var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

  var register = function (editor) {
    editor.addCommand('InsertHorizontalRule', function () {
      editor.execCommand('mceInsertContent', false, '<hr />');
    });
  };
  var $_dxcs8yc7jh8lz07d = { register: register };

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
  var $_dmdtoxc8jh8lz07e = { register: register$1 };

  global.add('hr', function (editor) {
    $_dxcs8yc7jh8lz07d.register(editor);
    $_dmdtoxc8jh8lz07e.register(editor);
  });
  function Plugin () {
  }

  return Plugin;

}());
})();
