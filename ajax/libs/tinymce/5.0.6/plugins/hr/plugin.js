/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 *
 * Version: 5.0.6 (2019-05-22)
 */
(function () {
var hr = (function () {
    'use strict';

    var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

    var register = function (editor) {
      editor.addCommand('InsertHorizontalRule', function () {
        editor.execCommand('mceInsertContent', false, '<hr />');
      });
    };
    var Commands = { register: register };

    var register$1 = function (editor) {
      editor.ui.registry.addButton('hr', {
        icon: 'horizontal-rule',
        tooltip: 'Horizontal line',
        onAction: function () {
          return editor.execCommand('InsertHorizontalRule');
        }
      });
      editor.ui.registry.addMenuItem('hr', {
        icon: 'horizontal-rule',
        text: 'Horizontal line',
        onAction: function () {
          return editor.execCommand('InsertHorizontalRule');
        }
      });
    };
    var Buttons = { register: register$1 };

    global.add('hr', function (editor) {
      Commands.register(editor);
      Buttons.register(editor);
    });
    function Plugin () {
    }

    return Plugin;

}());
})();
