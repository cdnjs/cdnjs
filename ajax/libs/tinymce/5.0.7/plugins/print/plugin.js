/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 *
 * Version: 5.0.7 (2019-06-05)
 */
(function () {
var print = (function () {
    'use strict';

    var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

    var register = function (editor) {
      editor.addCommand('mcePrint', function () {
        editor.getWin().print();
      });
    };
    var Commands = { register: register };

    var register$1 = function (editor) {
      editor.ui.registry.addButton('print', {
        icon: 'print',
        tooltip: 'Print',
        onAction: function () {
          return editor.execCommand('mcePrint');
        }
      });
      editor.ui.registry.addMenuItem('print', {
        text: 'Print...',
        icon: 'print',
        onAction: function () {
          return editor.execCommand('mcePrint');
        }
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
