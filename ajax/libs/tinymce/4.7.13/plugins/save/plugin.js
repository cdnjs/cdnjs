(function () {
var save = (function () {
  'use strict';

  var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

  var global$1 = tinymce.util.Tools.resolve('tinymce.dom.DOMUtils');

  var global$2 = tinymce.util.Tools.resolve('tinymce.util.Tools');

  var enableWhenDirty = function (editor) {
    return editor.getParam('save_enablewhendirty', true);
  };
  var hasOnSaveCallback = function (editor) {
    return !!editor.getParam('save_onsavecallback');
  };
  var hasOnCancelCallback = function (editor) {
    return !!editor.getParam('save_oncancelcallback');
  };
  var $_8l09i7j6jh8lz151 = {
    enableWhenDirty: enableWhenDirty,
    hasOnSaveCallback: hasOnSaveCallback,
    hasOnCancelCallback: hasOnCancelCallback
  };

  var displayErrorMessage = function (editor, message) {
    editor.notificationManager.open({
      text: editor.translate(message),
      type: 'error'
    });
  };
  var save = function (editor) {
    var formObj;
    formObj = global$1.DOM.getParent(editor.id, 'form');
    if ($_8l09i7j6jh8lz151.enableWhenDirty(editor) && !editor.isDirty()) {
      return;
    }
    editor.save();
    if ($_8l09i7j6jh8lz151.hasOnSaveCallback(editor)) {
      editor.execCallback('save_onsavecallback', editor);
      editor.nodeChanged();
      return;
    }
    if (formObj) {
      editor.setDirty(false);
      if (!formObj.onsubmit || formObj.onsubmit()) {
        if (typeof formObj.submit === 'function') {
          formObj.submit();
        } else {
          displayErrorMessage(editor, 'Error: Form submit field collision.');
        }
      }
      editor.nodeChanged();
    } else {
      displayErrorMessage(editor, 'Error: No form element found.');
    }
  };
  var cancel = function (editor) {
    var h = global$2.trim(editor.startContent);
    if ($_8l09i7j6jh8lz151.hasOnCancelCallback(editor)) {
      editor.execCallback('save_oncancelcallback', editor);
      return;
    }
    editor.setContent(h);
    editor.undoManager.clear();
    editor.nodeChanged();
  };
  var $_9mbazj3jh8lz14y = {
    save: save,
    cancel: cancel
  };

  var register = function (editor) {
    editor.addCommand('mceSave', function () {
      $_9mbazj3jh8lz14y.save(editor);
    });
    editor.addCommand('mceCancel', function () {
      $_9mbazj3jh8lz14y.cancel(editor);
    });
  };
  var $_eyzj6nj2jh8lz14x = { register: register };

  var stateToggle = function (editor) {
    return function (e) {
      var ctrl = e.control;
      editor.on('nodeChange dirty', function () {
        ctrl.disabled($_8l09i7j6jh8lz151.enableWhenDirty(editor) && !editor.isDirty());
      });
    };
  };
  var register$1 = function (editor) {
    editor.addButton('save', {
      icon: 'save',
      text: 'Save',
      cmd: 'mceSave',
      disabled: true,
      onPostRender: stateToggle(editor)
    });
    editor.addButton('cancel', {
      text: 'Cancel',
      icon: false,
      cmd: 'mceCancel',
      disabled: true,
      onPostRender: stateToggle(editor)
    });
    editor.addShortcut('Meta+S', '', 'mceSave');
  };
  var $_3t71l4j7jh8lz152 = { register: register$1 };

  global.add('save', function (editor) {
    $_3t71l4j7jh8lz152.register(editor);
    $_eyzj6nj2jh8lz14x.register(editor);
  });
  function Plugin () {
  }

  return Plugin;

}());
})();
