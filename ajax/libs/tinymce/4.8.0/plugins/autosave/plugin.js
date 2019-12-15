(function () {
var autosave = (function () {
  'use strict';

  var Cell = function (initial) {
    var value = initial;
    var get = function () {
      return value;
    };
    var set = function (v) {
      value = v;
    };
    var clone = function () {
      return Cell(get());
    };
    return {
      get: get,
      set: set,
      clone: clone
    };
  };

  var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

  var global$1 = tinymce.util.Tools.resolve('tinymce.util.LocalStorage');

  var global$2 = tinymce.util.Tools.resolve('tinymce.util.Tools');

  var fireRestoreDraft = function (editor) {
    return editor.fire('RestoreDraft');
  };
  var fireStoreDraft = function (editor) {
    return editor.fire('StoreDraft');
  };
  var fireRemoveDraft = function (editor) {
    return editor.fire('RemoveDraft');
  };
  var $_622yp69bjjgwebf3 = {
    fireRestoreDraft: fireRestoreDraft,
    fireStoreDraft: fireStoreDraft,
    fireRemoveDraft: fireRemoveDraft
  };

  var parse = function (time, defaultTime) {
    var multiples = {
      s: 1000,
      m: 60000
    };
    time = /^(\d+)([ms]?)$/.exec('' + (time || defaultTime));
    return (time[2] ? multiples[time[2]] : 1) * parseInt(time, 10);
  };
  var $_enzwb29djjgwebf5 = { parse: parse };

  var shouldAskBeforeUnload = function (editor) {
    return editor.getParam('autosave_ask_before_unload', true);
  };
  var getAutoSavePrefix = function (editor) {
    var prefix = editor.getParam('autosave_prefix', 'tinymce-autosave-{path}{query}{hash}-{id}-');
    prefix = prefix.replace(/\{path\}/g, document.location.pathname);
    prefix = prefix.replace(/\{query\}/g, document.location.search);
    prefix = prefix.replace(/\{hash\}/g, document.location.hash);
    prefix = prefix.replace(/\{id\}/g, editor.id);
    return prefix;
  };
  var shouldRestoreWhenEmpty = function (editor) {
    return editor.getParam('autosave_restore_when_empty', false);
  };
  var getAutoSaveInterval = function (editor) {
    return $_enzwb29djjgwebf5.parse(editor.settings.autosave_interval, '30s');
  };
  var getAutoSaveRetention = function (editor) {
    return $_enzwb29djjgwebf5.parse(editor.settings.autosave_retention, '20m');
  };
  var $_ax4dq99cjjgwebf4 = {
    shouldAskBeforeUnload: shouldAskBeforeUnload,
    getAutoSavePrefix: getAutoSavePrefix,
    shouldRestoreWhenEmpty: shouldRestoreWhenEmpty,
    getAutoSaveInterval: getAutoSaveInterval,
    getAutoSaveRetention: getAutoSaveRetention
  };

  var isEmpty = function (editor, html) {
    var forcedRootBlockName = editor.settings.forced_root_block;
    html = global$2.trim(typeof html === 'undefined' ? editor.getBody().innerHTML : html);
    return html === '' || new RegExp('^<' + forcedRootBlockName + '[^>]*>((\xA0|&nbsp;|[ \t]|<br[^>]*>)+?|)</' + forcedRootBlockName + '>|<br>$', 'i').test(html);
  };
  var hasDraft = function (editor) {
    var time = parseInt(global$1.getItem($_ax4dq99cjjgwebf4.getAutoSavePrefix(editor) + 'time'), 10) || 0;
    if (new Date().getTime() - time > $_ax4dq99cjjgwebf4.getAutoSaveRetention(editor)) {
      removeDraft(editor, false);
      return false;
    }
    return true;
  };
  var removeDraft = function (editor, fire) {
    var prefix = $_ax4dq99cjjgwebf4.getAutoSavePrefix(editor);
    global$1.removeItem(prefix + 'draft');
    global$1.removeItem(prefix + 'time');
    if (fire !== false) {
      $_622yp69bjjgwebf3.fireRemoveDraft(editor);
    }
  };
  var storeDraft = function (editor) {
    var prefix = $_ax4dq99cjjgwebf4.getAutoSavePrefix(editor);
    if (!isEmpty(editor) && editor.isDirty()) {
      global$1.setItem(prefix + 'draft', editor.getContent({
        format: 'raw',
        no_events: true
      }));
      global$1.setItem(prefix + 'time', new Date().getTime().toString());
      $_622yp69bjjgwebf3.fireStoreDraft(editor);
    }
  };
  var restoreDraft = function (editor) {
    var prefix = $_ax4dq99cjjgwebf4.getAutoSavePrefix(editor);
    if (hasDraft(editor)) {
      editor.setContent(global$1.getItem(prefix + 'draft'), { format: 'raw' });
      $_622yp69bjjgwebf3.fireRestoreDraft(editor);
    }
  };
  var startStoreDraft = function (editor, started) {
    var interval = $_ax4dq99cjjgwebf4.getAutoSaveInterval(editor);
    if (!started.get()) {
      setInterval(function () {
        if (!editor.removed) {
          storeDraft(editor);
        }
      }, interval);
      started.set(true);
    }
  };
  var restoreLastDraft = function (editor) {
    editor.undoManager.transact(function () {
      restoreDraft(editor);
      removeDraft(editor);
    });
    editor.focus();
  };
  var $_5e19kx98jjgwebez = {
    isEmpty: isEmpty,
    hasDraft: hasDraft,
    removeDraft: removeDraft,
    storeDraft: storeDraft,
    restoreDraft: restoreDraft,
    startStoreDraft: startStoreDraft,
    restoreLastDraft: restoreLastDraft
  };

  var curry = function (f, editor) {
    return function () {
      var args = Array.prototype.slice.call(arguments);
      return f.apply(null, [editor].concat(args));
    };
  };
  var get = function (editor) {
    return {
      hasDraft: curry($_5e19kx98jjgwebez.hasDraft, editor),
      storeDraft: curry($_5e19kx98jjgwebez.storeDraft, editor),
      restoreDraft: curry($_5e19kx98jjgwebez.restoreDraft, editor),
      removeDraft: curry($_5e19kx98jjgwebez.removeDraft, editor),
      isEmpty: curry($_5e19kx98jjgwebez.isEmpty, editor)
    };
  };
  var $_e3no6n97jjgwebey = { get: get };

  var global$3 = tinymce.util.Tools.resolve('tinymce.EditorManager');

  global$3._beforeUnloadHandler = function () {
    var msg;
    global$2.each(global$3.get(), function (editor) {
      if (editor.plugins.autosave) {
        editor.plugins.autosave.storeDraft();
      }
      if (!msg && editor.isDirty() && $_ax4dq99cjjgwebf4.shouldAskBeforeUnload(editor)) {
        msg = editor.translate('You have unsaved changes are you sure you want to navigate away?');
      }
    });
    return msg;
  };
  var setup = function (editor) {
    window.onbeforeunload = global$3._beforeUnloadHandler;
  };
  var $_1bgh849fjjgwebfq = { setup: setup };

  var postRender = function (editor, started) {
    return function (e) {
      var ctrl = e.control;
      ctrl.disabled(!$_5e19kx98jjgwebez.hasDraft(editor));
      editor.on('StoreDraft RestoreDraft RemoveDraft', function () {
        ctrl.disabled(!$_5e19kx98jjgwebez.hasDraft(editor));
      });
      $_5e19kx98jjgwebez.startStoreDraft(editor, started);
    };
  };
  var register = function (editor, started) {
    editor.addButton('restoredraft', {
      title: 'Restore last draft',
      onclick: function () {
        $_5e19kx98jjgwebez.restoreLastDraft(editor);
      },
      onPostRender: postRender(editor, started)
    });
    editor.addMenuItem('restoredraft', {
      text: 'Restore last draft',
      onclick: function () {
        $_5e19kx98jjgwebez.restoreLastDraft(editor);
      },
      onPostRender: postRender(editor, started),
      context: 'file'
    });
  };
  var $_3rv9zx9hjjgwebft = { register: register };

  global.add('autosave', function (editor) {
    var started = Cell(false);
    $_1bgh849fjjgwebfq.setup(editor);
    $_3rv9zx9hjjgwebft.register(editor, started);
    return $_e3no6n97jjgwebey.get(editor);
  });
  function Plugin () {
  }

  return Plugin;

}());
})();
