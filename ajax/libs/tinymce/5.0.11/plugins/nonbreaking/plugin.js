/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 *
 * Version: 5.0.11 (2019-07-04)
 */
(function () {
    'use strict';

    var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

    var stringRepeat = function (string, repeats) {
      var str = '';
      for (var index = 0; index < repeats; index++) {
        str += string;
      }
      return str;
    };
    var isVisualCharsEnabled = function (editor) {
      return editor.plugins.visualchars ? editor.plugins.visualchars.isEnabled() : false;
    };
    var insertNbsp = function (editor, times) {
      var nbsp = isVisualCharsEnabled(editor) ? '<span class="mce-nbsp">&nbsp;</span>' : '&nbsp;';
      editor.insertContent(stringRepeat(nbsp, times));
      editor.dom.setAttrib(editor.dom.select('span.mce-nbsp'), 'data-mce-bogus', '1');
    };
    var Actions = { insertNbsp: insertNbsp };

    var register = function (editor) {
      editor.addCommand('mceNonBreaking', function () {
        Actions.insertNbsp(editor, 1);
      });
    };
    var Commands = { register: register };

    var global$1 = tinymce.util.Tools.resolve('tinymce.util.VK');

    var getKeyboardSpaces = function (editor) {
      var spaces = editor.getParam('nonbreaking_force_tab', 0);
      if (typeof spaces === 'boolean') {
        return spaces === true ? 3 : 0;
      } else {
        return spaces;
      }
    };
    var Settings = { getKeyboardSpaces: getKeyboardSpaces };

    var setup = function (editor) {
      var spaces = Settings.getKeyboardSpaces(editor);
      if (spaces > 0) {
        editor.on('keydown', function (e) {
          if (e.keyCode === global$1.TAB && !e.isDefaultPrevented()) {
            if (e.shiftKey) {
              return;
            }
            e.preventDefault();
            e.stopImmediatePropagation();
            Actions.insertNbsp(editor, spaces);
          }
        });
      }
    };
    var Keyboard = { setup: setup };

    var register$1 = function (editor) {
      editor.ui.registry.addButton('nonbreaking', {
        icon: 'non-breaking',
        tooltip: 'Nonbreaking space',
        onAction: function () {
          return editor.execCommand('mceNonBreaking');
        }
      });
      editor.ui.registry.addMenuItem('nonbreaking', {
        icon: 'non-breaking',
        text: 'Nonbreaking space',
        onAction: function () {
          return editor.execCommand('mceNonBreaking');
        }
      });
    };
    var Buttons = { register: register$1 };

    function Plugin () {
      global.add('nonbreaking', function (editor) {
        Commands.register(editor);
        Buttons.register(editor);
        Keyboard.setup(editor);
      });
    }

    Plugin();

}());
