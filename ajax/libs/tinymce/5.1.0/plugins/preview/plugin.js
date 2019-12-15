/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 *
 * Version: 5.1.0 (2019-10-17)
 */
(function () {
    'use strict';

    var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

    var global$1 = tinymce.util.Tools.resolve('tinymce.util.Tools');

    var getPreviewDialogWidth = function (editor) {
      return parseInt(editor.getParam('plugin_preview_width', '650'), 10);
    };
    var getPreviewDialogHeight = function (editor) {
      return parseInt(editor.getParam('plugin_preview_height', '500'), 10);
    };
    var getContentStyle = function (editor) {
      return editor.getParam('content_style', '');
    };
    var shouldUseContentCssCors = function (editor) {
      return editor.getParam('content_css_cors', false, 'boolean');
    };
    var Settings = {
      getPreviewDialogWidth: getPreviewDialogWidth,
      getPreviewDialogHeight: getPreviewDialogHeight,
      getContentStyle: getContentStyle,
      shouldUseContentCssCors: shouldUseContentCssCors
    };

    var global$2 = tinymce.util.Tools.resolve('tinymce.Env');

    var getPreviewHtml = function (editor) {
      var headHtml = '';
      var encode = editor.dom.encode;
      var contentStyle = Settings.getContentStyle(editor);
      headHtml += '<base href="' + encode(editor.documentBaseURI.getURI()) + '">';
      if (contentStyle) {
        headHtml += '<style type="text/css">' + contentStyle + '</style>';
      }
      var cors = Settings.shouldUseContentCssCors(editor) ? ' crossorigin="anonymous"' : '';
      global$1.each(editor.contentCSS, function (url) {
        headHtml += '<link type="text/css" rel="stylesheet" href="' + encode(editor.documentBaseURI.toAbsolute(url)) + '"' + cors + '>';
      });
      var bodyId = editor.settings.body_id || 'tinymce';
      if (bodyId.indexOf('=') !== -1) {
        bodyId = editor.getParam('body_id', '', 'hash');
        bodyId = bodyId[editor.id] || bodyId;
      }
      var bodyClass = editor.settings.body_class || '';
      if (bodyClass.indexOf('=') !== -1) {
        bodyClass = editor.getParam('body_class', '', 'hash');
        bodyClass = bodyClass[editor.id] || '';
      }
      var isMetaKeyPressed = global$2.mac ? 'e.metaKey' : 'e.ctrlKey && !e.altKey';
      var preventClicksOnLinksScript = '<script>' + 'document.addEventListener && document.addEventListener("click", function(e) {' + 'for (var elm = e.target; elm; elm = elm.parentNode) {' + 'if (elm.nodeName === "A" && !(' + isMetaKeyPressed + ')) {' + 'e.preventDefault();' + '}' + '}' + '}, false);' + '</script> ';
      var directionality = editor.getBody().dir;
      var dirAttr = directionality ? ' dir="' + encode(directionality) + '"' : '';
      var previewHtml = '<!DOCTYPE html>' + '<html>' + '<head>' + headHtml + '</head>' + '<body id="' + encode(bodyId) + '" class="mce-content-body ' + encode(bodyClass) + '"' + dirAttr + '>' + editor.getContent() + preventClicksOnLinksScript + '</body>' + '</html>';
      return previewHtml;
    };
    var IframeContent = { getPreviewHtml: getPreviewHtml };

    var open = function (editor) {
      var content = IframeContent.getPreviewHtml(editor);
      var dataApi = editor.windowManager.open({
        title: 'Preview',
        size: 'large',
        body: {
          type: 'panel',
          items: [{
              name: 'preview',
              type: 'iframe',
              sandboxed: true
            }]
        },
        buttons: [{
            type: 'cancel',
            name: 'close',
            text: 'Close',
            primary: true
          }],
        initialData: { preview: content }
      });
      dataApi.focus('close');
    };

    var register = function (editor) {
      editor.addCommand('mcePreview', function () {
        open(editor);
      });
    };
    var Commands = { register: register };

    var register$1 = function (editor) {
      editor.ui.registry.addButton('preview', {
        icon: 'preview',
        tooltip: 'Preview',
        onAction: function () {
          return editor.execCommand('mcePreview');
        }
      });
      editor.ui.registry.addMenuItem('preview', {
        icon: 'preview',
        text: 'Preview',
        onAction: function () {
          return editor.execCommand('mcePreview');
        }
      });
    };
    var Buttons = { register: register$1 };

    function Plugin () {
      global.add('preview', function (editor) {
        Commands.register(editor);
        Buttons.register(editor);
      });
    }

    Plugin();

}());
