(function () {
var hr = (function () {
  'use strict';

  var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

  var register = function (editor) {
    editor.addCommand('InsertHorizontalRule', function () {
      editor.execCommand('mceInsertContent', false, '<hr />');
    });
  };
  var $_c8b6blcnjk26xj9f = { register: register };

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
  var $_54bkewcojk26xj9g = { register: register$1 };

  global.add('hr', function (editor) {
    $_c8b6blcnjk26xj9f.register(editor);
    $_54bkewcojk26xj9g.register(editor);
  });
  function Plugin () {
  }

  return Plugin;

}());
})();
