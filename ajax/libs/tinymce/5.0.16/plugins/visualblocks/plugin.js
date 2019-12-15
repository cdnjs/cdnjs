/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 *
 * Version: 5.0.16 (2019-09-24)
 */
(function () {
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

    var fireVisualBlocks = function (editor, state) {
      editor.fire('VisualBlocks', { state: state });
    };
    var Events = { fireVisualBlocks: fireVisualBlocks };

    var toggleVisualBlocks = function (editor, pluginUrl, enabledState) {
      var dom = editor.dom;
      dom.toggleClass(editor.getBody(), 'mce-visualblocks');
      enabledState.set(!enabledState.get());
      Events.fireVisualBlocks(editor, enabledState.get());
    };
    var VisualBlocks = { toggleVisualBlocks: toggleVisualBlocks };

    var register = function (editor, pluginUrl, enabledState) {
      editor.addCommand('mceVisualBlocks', function () {
        VisualBlocks.toggleVisualBlocks(editor, pluginUrl, enabledState);
      });
    };
    var Commands = { register: register };

    var isEnabledByDefault = function (editor) {
      return editor.getParam('visualblocks_default_state', false, 'boolean');
    };
    var Settings = { isEnabledByDefault: isEnabledByDefault };

    var setup = function (editor, pluginUrl, enabledState) {
      editor.on('PreviewFormats AfterPreviewFormats', function (e) {
        if (enabledState.get()) {
          editor.dom.toggleClass(editor.getBody(), 'mce-visualblocks', e.type === 'afterpreviewformats');
        }
      });
      editor.on('init', function () {
        if (Settings.isEnabledByDefault(editor)) {
          VisualBlocks.toggleVisualBlocks(editor, pluginUrl, enabledState);
        }
      });
      editor.on('remove', function () {
        editor.dom.removeClass(editor.getBody(), 'mce-visualblocks');
      });
    };
    var Bindings = { setup: setup };

    var toggleActiveState = function (editor, enabledState) {
      return function (api) {
        api.setActive(enabledState.get());
        var editorEventCallback = function (e) {
          return api.setActive(e.state);
        };
        editor.on('VisualBlocks', editorEventCallback);
        return function () {
          return editor.off('VisualBlocks', editorEventCallback);
        };
      };
    };
    var register$1 = function (editor, enabledState) {
      editor.ui.registry.addToggleButton('visualblocks', {
        icon: 'paragraph',
        tooltip: 'Show blocks',
        onAction: function () {
          return editor.execCommand('mceVisualBlocks');
        },
        onSetup: toggleActiveState(editor, enabledState)
      });
      editor.ui.registry.addToggleMenuItem('visualblocks', {
        text: 'Show blocks',
        onAction: function () {
          return editor.execCommand('mceVisualBlocks');
        },
        onSetup: toggleActiveState(editor, enabledState)
      });
    };
    var Buttons = { register: register$1 };

    function Plugin () {
      global.add('visualblocks', function (editor, pluginUrl) {
        var enabledState = Cell(false);
        Commands.register(editor, pluginUrl, enabledState);
        Buttons.register(editor, enabledState);
        Bindings.setup(editor, pluginUrl, enabledState);
      });
    }

    Plugin();

}());
