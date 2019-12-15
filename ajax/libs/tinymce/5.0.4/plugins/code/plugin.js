/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 *
 * Version: 5.0.4 (2019-04-23)
 */
(function () {
var code = (function () {
    'use strict';

    var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

    var setContent = function (editor, html) {
      editor.focus();
      editor.undoManager.transact(function () {
        editor.setContent(html);
      });
      editor.selection.setCursorLocation();
      editor.nodeChanged();
    };
    var getContent = function (editor) {
      return editor.getContent({ source_view: true });
    };
    var Content = {
      setContent: setContent,
      getContent: getContent
    };

    var open = function (editor) {
      var editorContent = Content.getContent(editor);
      editor.windowManager.open({
        title: 'Source Code',
        size: 'large',
        body: {
          type: 'panel',
          items: [{
              type: 'textarea',
              name: 'code'
            }]
        },
        buttons: [
          {
            type: 'cancel',
            name: 'cancel',
            text: 'Cancel'
          },
          {
            type: 'submit',
            name: 'save',
            text: 'Save',
            primary: true
          }
        ],
        initialData: { code: editorContent },
        onSubmit: function (api) {
          Content.setContent(editor, api.getData().code);
          api.close();
        }
      });
    };
    var Dialog = { open: open };

    var register = function (editor) {
      editor.addCommand('mceCodeEditor', function () {
        Dialog.open(editor);
      });
    };
    var Commands = { register: register };

    var register$1 = function (editor) {
      editor.ui.registry.addButton('code', {
        icon: 'sourcecode',
        tooltip: 'Source code',
        onAction: function () {
          return Dialog.open(editor);
        }
      });
      editor.ui.registry.addMenuItem('code', {
        icon: 'sourcecode',
        text: 'Source code',
        onAction: function () {
          return Dialog.open(editor);
        }
      });
    };
    var Buttons = { register: register$1 };

    global.add('code', function (editor) {
      Commands.register(editor);
      Buttons.register(editor);
      return {};
    });
    function Plugin () {
    }

    return Plugin;

}());
})();
