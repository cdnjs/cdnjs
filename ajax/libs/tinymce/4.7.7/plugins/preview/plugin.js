(function () {
var preview = (function () {
  'use strict';

  var PluginManager = tinymce.util.Tools.resolve('tinymce.PluginManager');

  var Env = tinymce.util.Tools.resolve('tinymce.Env');

  var getPreviewDialogWidth = function (editor) {
    return parseInt(editor.getParam('plugin_preview_width', '650'), 10);
  };
  var getPreviewDialogHeight = function (editor) {
    return parseInt(editor.getParam('plugin_preview_height', '500'), 10);
  };
  var getContentStyle = function (editor) {
    return editor.getParam('content_style', '');
  };
  var $_d8zsqzi6jdud7be2 = {
    getPreviewDialogWidth: getPreviewDialogWidth,
    getPreviewDialogHeight: getPreviewDialogHeight,
    getContentStyle: getContentStyle
  };

  var Tools = tinymce.util.Tools.resolve('tinymce.util.Tools');

  var getPreviewHtml = function (editor) {
    var previewHtml;
    var headHtml = '';
    var encode = editor.dom.encode;
    var contentStyle = $_d8zsqzi6jdud7be2.getContentStyle(editor);
    headHtml += '<base href="' + encode(editor.documentBaseURI.getURI()) + '">';
    if (contentStyle) {
      headHtml += '<style type="text/css">' + contentStyle + '</style>';
    }
    Tools.each(editor.contentCSS, function (url) {
      headHtml += '<link type="text/css" rel="stylesheet" href="' + encode(editor.documentBaseURI.toAbsolute(url)) + '">';
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
    var preventClicksOnLinksScript = '<script>' + 'document.addEventListener && document.addEventListener("click", function(e) {' + 'for (var elm = e.target; elm; elm = elm.parentNode) {' + 'if (elm.nodeName === "A") {' + 'e.preventDefault();' + '}' + '}' + '}, false);' + '</script> ';
    var dirAttr = editor.settings.directionality ? ' dir="' + editor.settings.directionality + '"' : '';
    previewHtml = '<!DOCTYPE html>' + '<html>' + '<head>' + headHtml + '</head>' + '<body id="' + encode(bodyId) + '" class="mce-content-body ' + encode(bodyClass) + '"' + encode(dirAttr) + '>' + editor.getContent() + preventClicksOnLinksScript + '</body>' + '</html>';
    return previewHtml;
  };
  var injectIframeContent = function (editor, iframe, sandbox) {
    var previewHtml = getPreviewHtml(editor);
    if (!sandbox) {
      var doc = iframe.contentWindow.document;
      doc.open();
      doc.write(previewHtml);
      doc.close();
    } else {
      iframe.src = 'data:text/html;charset=utf-8,' + encodeURIComponent(previewHtml);
    }
  };
  var $_gardd9i7jdud7be4 = {
    getPreviewHtml: getPreviewHtml,
    injectIframeContent: injectIframeContent
  };

  var open = function (editor) {
    var sandbox = !Env.ie;
    var dialogHtml = '<iframe src="javascript:\'\'" frameborder="0"' + (sandbox ? ' sandbox="allow-scripts"' : '') + '></iframe>';
    var dialogWidth = $_d8zsqzi6jdud7be2.getPreviewDialogWidth(editor);
    var dialogHeight = $_d8zsqzi6jdud7be2.getPreviewDialogHeight(editor);
    editor.windowManager.open({
      title: 'Preview',
      width: dialogWidth,
      height: dialogHeight,
      html: dialogHtml,
      buttons: {
        text: 'Close',
        onclick: function (e) {
          e.control.parent().parent().close();
        }
      },
      onPostRender: function (e) {
        var iframeElm = e.control.getEl('body').firstChild;
        $_gardd9i7jdud7be4.injectIframeContent(editor, iframeElm, sandbox);
      }
    });
  };
  var $_b10or8i4jdud7be0 = { open: open };

  var register = function (editor) {
    editor.addCommand('mcePreview', function () {
      $_b10or8i4jdud7be0.open(editor);
    });
  };
  var $_7pcyaqi3jdud7bdz = { register: register };

  var register$1 = function (editor) {
    editor.addButton('preview', {
      title: 'Preview',
      cmd: 'mcePreview'
    });
    editor.addMenuItem('preview', {
      text: 'Preview',
      cmd: 'mcePreview',
      context: 'view'
    });
  };
  var $_8qvsphi9jdud7be7 = { register: register$1 };

  PluginManager.add('preview', function (editor) {
    $_7pcyaqi3jdud7bdz.register(editor);
    $_8qvsphi9jdud7be7.register(editor);
  });
  function Plugin () {
  }

  return Plugin;

}());
})();
