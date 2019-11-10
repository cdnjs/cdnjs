/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 *
 * Version: 5.0.6 (2019-05-22)
 */
(function () {
var anchor = (function () {
    'use strict';

    var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

    var isValidId = function (id) {
      return /^[A-Za-z][A-Za-z0-9\-:._]*$/.test(id);
    };
    var getId = function (editor) {
      var selectedNode = editor.selection.getNode();
      var isAnchor = selectedNode.tagName === 'A' && editor.dom.getAttrib(selectedNode, 'href') === '';
      return isAnchor ? selectedNode.getAttribute('id') || selectedNode.getAttribute('name') : '';
    };
    var insert = function (editor, id) {
      var selectedNode = editor.selection.getNode();
      var isAnchor = selectedNode.tagName === 'A' && editor.dom.getAttrib(selectedNode, 'href') === '';
      if (isAnchor) {
        selectedNode.removeAttribute('name');
        selectedNode.id = id;
        editor.undoManager.add();
      } else {
        editor.focus();
        editor.selection.collapse(true);
        editor.execCommand('mceInsertContent', false, editor.dom.createHTML('a', { id: id }));
      }
    };
    var Anchor = {
      isValidId: isValidId,
      getId: getId,
      insert: insert
    };

    var insertAnchor = function (editor, newId) {
      if (!Anchor.isValidId(newId)) {
        editor.windowManager.alert('Id should start with a letter, followed only by letters, numbers, dashes, dots, colons or underscores.');
        return true;
      } else {
        Anchor.insert(editor, newId);
        return false;
      }
    };
    var open = function (editor) {
      var currentId = Anchor.getId(editor);
      editor.windowManager.open({
        title: 'Anchor',
        size: 'normal',
        body: {
          type: 'panel',
          items: [{
              name: 'id',
              type: 'input',
              label: 'ID',
              placeholder: 'example'
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
        initialData: { id: currentId },
        onSubmit: function (api) {
          if (!insertAnchor(editor, api.getData().id)) {
            api.close();
          }
        }
      });
    };
    var Dialog = { open: open };

    var register = function (editor) {
      editor.addCommand('mceAnchor', function () {
        Dialog.open(editor);
      });
    };
    var Commands = { register: register };

    var isAnchorNode = function (node) {
      return !node.attr('href') && (node.attr('id') || node.attr('name')) && !node.firstChild;
    };
    var setContentEditable = function (state) {
      return function (nodes) {
        for (var i = 0; i < nodes.length; i++) {
          if (isAnchorNode(nodes[i])) {
            nodes[i].attr('contenteditable', state);
          }
        }
      };
    };
    var setup = function (editor) {
      editor.on('PreInit', function () {
        editor.parser.addNodeFilter('a', setContentEditable('false'));
        editor.serializer.addNodeFilter('a', setContentEditable(null));
      });
    };
    var FilterContent = { setup: setup };

    var register$1 = function (editor) {
      editor.ui.registry.addToggleButton('anchor', {
        icon: 'bookmark',
        tooltip: 'Anchor',
        onAction: function () {
          return editor.execCommand('mceAnchor');
        },
        onSetup: function (buttonApi) {
          return editor.selection.selectorChangedWithUnbind('a:not([href])', buttonApi.setActive).unbind;
        }
      });
      editor.ui.registry.addMenuItem('anchor', {
        icon: 'bookmark',
        text: 'Anchor...',
        onAction: function () {
          return editor.execCommand('mceAnchor');
        }
      });
    };
    var Buttons = { register: register$1 };

    global.add('anchor', function (editor) {
      FilterContent.setup(editor);
      Commands.register(editor);
      Buttons.register(editor);
    });
    function Plugin () {
    }

    return Plugin;

}());
})();
