(function () {
var print = (function () {
  'use strict';

  var PluginManager = tinymce.util.Tools.resolve('tinymce.PluginManager');

  var register = function (editor) {
    editor.addCommand('mcePrint', function () {
      editor.getWin().print();
    });
  };
  var $_5oc6y3i2jcq8h7is = { register: register };

  var register$1 = function (editor) {
    editor.addButton('print', {
      title: 'Print',
      cmd: 'mcePrint'
    });
    editor.addMenuItem('print', {
      text: 'Print',
      cmd: 'mcePrint',
      icon: 'print'
    });
  };
  var $_4qmmp7i3jcq8h7it = { register: register$1 };

  PluginManager.add('print', function (editor) {
    $_5oc6y3i2jcq8h7is.register(editor);
    $_4qmmp7i3jcq8h7it.register(editor);
    editor.addShortcut('Meta+P', '', 'mcePrint');
  });
  var Plugin = function () {
  };

  return Plugin;

}());
})()
