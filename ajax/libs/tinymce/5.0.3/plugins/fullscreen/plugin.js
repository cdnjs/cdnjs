/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 *
 * Version: 5.0.3 (2019-03-19)
 */
(function () {
var fullscreen = (function (domGlobals) {
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

    var get = function (fullscreenState) {
      return {
        isFullscreen: function () {
          return fullscreenState.get() !== null;
        }
      };
    };
    var Api = { get: get };

    var global$1 = tinymce.util.Tools.resolve('tinymce.dom.DOMUtils');

    var fireFullscreenStateChanged = function (editor, state) {
      editor.fire('FullscreenStateChanged', { state: state });
    };
    var Events = { fireFullscreenStateChanged: fireFullscreenStateChanged };

    var DOM = global$1.DOM;
    var getWindowSize = function () {
      var w;
      var h;
      var win = domGlobals.window;
      var doc = domGlobals.document;
      var body = doc.body;
      if (body.offsetWidth) {
        w = body.offsetWidth;
        h = body.offsetHeight;
      }
      if (win.innerWidth && win.innerHeight) {
        w = win.innerWidth;
        h = win.innerHeight;
      }
      return {
        w: w,
        h: h
      };
    };
    var getScrollPos = function () {
      var vp = DOM.getViewPort();
      return {
        x: vp.x,
        y: vp.y
      };
    };
    var setScrollPos = function (pos) {
      domGlobals.window.scrollTo(pos.x, pos.y);
    };
    var toggleFullscreen = function (editor, fullscreenState) {
      var body = domGlobals.document.body;
      var documentElement = domGlobals.document.documentElement;
      var editorContainerStyle;
      var editorContainer, iframe, iframeStyle;
      var fullscreenInfo = fullscreenState.get();
      var resize = function () {
        DOM.setStyle(iframe, 'height', getWindowSize().h - (editorContainer.clientHeight - iframe.clientHeight));
      };
      var removeResize = function () {
        DOM.unbind(domGlobals.window, 'resize', resize);
      };
      editorContainer = editor.getContainer();
      editorContainerStyle = editorContainer.style;
      iframe = editor.getContentAreaContainer().firstChild;
      iframeStyle = iframe.style;
      if (!fullscreenInfo) {
        var newFullScreenInfo = {
          scrollPos: getScrollPos(),
          containerWidth: editorContainerStyle.width,
          containerHeight: editorContainerStyle.height,
          iframeWidth: iframeStyle.width,
          iframeHeight: iframeStyle.height,
          resizeHandler: resize,
          removeHandler: removeResize
        };
        iframeStyle.width = iframeStyle.height = '100%';
        editorContainerStyle.width = editorContainerStyle.height = '';
        DOM.addClass(body, 'tox-fullscreen');
        DOM.addClass(documentElement, 'tox-fullscreen');
        DOM.addClass(editorContainer, 'tox-fullscreen');
        DOM.bind(domGlobals.window, 'resize', resize);
        editor.on('remove', removeResize);
        resize();
        fullscreenState.set(newFullScreenInfo);
        Events.fireFullscreenStateChanged(editor, true);
      } else {
        iframeStyle.width = fullscreenInfo.iframeWidth;
        iframeStyle.height = fullscreenInfo.iframeHeight;
        if (fullscreenInfo.containerWidth) {
          editorContainerStyle.width = fullscreenInfo.containerWidth;
        }
        if (fullscreenInfo.containerHeight) {
          editorContainerStyle.height = fullscreenInfo.containerHeight;
        }
        DOM.removeClass(body, 'tox-fullscreen');
        DOM.removeClass(documentElement, 'tox-fullscreen');
        DOM.removeClass(editorContainer, 'tox-fullscreen');
        setScrollPos(fullscreenInfo.scrollPos);
        DOM.unbind(domGlobals.window, 'resize', fullscreenInfo.resizeHandler);
        editor.off('remove', fullscreenInfo.removeHandler);
        fullscreenState.set(null);
        Events.fireFullscreenStateChanged(editor, false);
      }
    };
    var Actions = { toggleFullscreen: toggleFullscreen };

    var register = function (editor, fullscreenState) {
      editor.addCommand('mceFullScreen', function () {
        Actions.toggleFullscreen(editor, fullscreenState);
      });
    };
    var Commands = { register: register };

    var makeSetupHandler = function (editor, fullscreenState) {
      return function (api) {
        api.setActive(fullscreenState.get() !== null);
        var editorEventCallback = function (e) {
          return api.setActive(e.state);
        };
        editor.on('FullscreenStateChanged', editorEventCallback);
        return function () {
          return editor.off('FullscreenStateChanged', editorEventCallback);
        };
      };
    };
    var register$1 = function (editor, fullscreenState) {
      editor.ui.registry.addToggleMenuItem('fullscreen', {
        text: 'Fullscreen',
        shortcut: 'Meta+Shift+F',
        onAction: function () {
          return editor.execCommand('mceFullScreen');
        },
        onSetup: makeSetupHandler(editor, fullscreenState)
      });
      editor.ui.registry.addToggleButton('fullscreen', {
        tooltip: 'Fullscreen',
        icon: 'fullscreen',
        onAction: function () {
          return editor.execCommand('mceFullScreen');
        },
        onSetup: makeSetupHandler(editor, fullscreenState)
      });
    };
    var Buttons = { register: register$1 };

    global.add('fullscreen', function (editor) {
      var fullscreenState = Cell(null);
      if (editor.settings.inline) {
        return Api.get(fullscreenState);
      }
      Commands.register(editor, fullscreenState);
      Buttons.register(editor, fullscreenState);
      editor.addShortcut('Meta+Shift+F', '', 'mceFullScreen');
      return Api.get(fullscreenState);
    });
    function Plugin () {
    }

    return Plugin;

}(window));
})();
