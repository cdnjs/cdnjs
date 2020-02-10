(function () {
var print = (function () {
    'use strict';

    var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

    var global$1 = tinymce.util.Tools.resolve('tinymce.Env');

    var register = function (editor) {
      editor.addCommand('mcePrint', function () {
        if (global$1.ie && global$1.ie <= 11) {
          editor.getDoc().execCommand('print', false, null);
        } else {
          editor.getWin().print();
        }
      });
    };
    var Commands = { register: register };

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
    var Buttons = { register: register$1 };

    global.add('print', function (editor) {
      Commands.register(editor);
      Buttons.register(editor);
      editor.addShortcut('Meta+P', '', 'mcePrint');
    });
    function Plugin () {
    }

    return Plugin;

}());
})();
