(function () {
var template = (function () {
  'use strict';

  var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

  var noop = function () {
    var x = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      x[_i] = arguments[_i];
    }
  };
  var noarg = function (f) {
    return function () {
      var x = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        x[_i] = arguments[_i];
      }
      return f();
    };
  };
  var compose = function (fa, fb) {
    return function () {
      var x = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        x[_i] = arguments[_i];
      }
      return fa(fb.apply(null, arguments));
    };
  };
  var constant = function (value) {
    return function () {
      return value;
    };
  };
  var identity = function (x) {
    return x;
  };
  var tripleEquals = function (a, b) {
    return a === b;
  };
  var curry = function (f) {
    var x = [];
    for (var _i = 1; _i < arguments.length; _i++) {
      x[_i - 1] = arguments[_i];
    }
    var args = new Array(arguments.length - 1);
    for (var i = 1; i < arguments.length; i++)
      args[i - 1] = arguments[i];
    return function () {
      var x = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        x[_i] = arguments[_i];
      }
      var newArgs = new Array(arguments.length);
      for (var j = 0; j < newArgs.length; j++)
        newArgs[j] = arguments[j];
      var all = args.concat(newArgs);
      return f.apply(null, all);
    };
  };
  var not = function (f) {
    return function () {
      var x = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        x[_i] = arguments[_i];
      }
      return !f.apply(null, arguments);
    };
  };
  var die = function (msg) {
    return function () {
      throw new Error(msg);
    };
  };
  var apply = function (f) {
    return f();
  };
  var call = function (f) {
    f();
  };
  var never = constant(false);
  var always = constant(true);
  var $_c33mcuq8jfuw8rxa = {
    noop: noop,
    noarg: noarg,
    compose: compose,
    constant: constant,
    identity: identity,
    tripleEquals: tripleEquals,
    curry: curry,
    not: not,
    die: die,
    apply: apply,
    call: call,
    never: never,
    always: always
  };

  var global$1 = tinymce.util.Tools.resolve('tinymce.util.Tools');

  var global$2 = tinymce.util.Tools.resolve('tinymce.util.XHR');

  var global$3 = tinymce.util.Tools.resolve('tinymce.dom.DOMUtils');

  var getCreationDateClasses = function (editor) {
    return editor.getParam('template_cdate_classes', 'cdate');
  };
  var getModificationDateClasses = function (editor) {
    return editor.getParam('template_mdate_classes', 'mdate');
  };
  var getSelectedContentClasses = function (editor) {
    return editor.getParam('template_selected_content_classes', 'selcontent');
  };
  var getPreviewReplaceValues = function (editor) {
    return editor.getParam('template_preview_replace_values');
  };
  var getTemplateReplaceValues = function (editor) {
    return editor.getParam('template_replace_values');
  };
  var getTemplates = function (editorSettings) {
    return editorSettings.templates;
  };
  var getCdateFormat = function (editor) {
    return editor.getParam('template_cdate_format', editor.getLang('template.cdate_format'));
  };
  var getMdateFormat = function (editor) {
    return editor.getParam('template_mdate_format', editor.getLang('template.mdate_format'));
  };
  var getDialogWidth = function (editor) {
    return editor.getParam('template_popup_width', 600);
  };
  var getDialogHeight = function (editor) {
    return Math.min(global$3.DOM.getViewPort().h, editor.getParam('template_popup_height', 500));
  };
  var $_e8v0etqcjfuw8rxh = {
    getCreationDateClasses: getCreationDateClasses,
    getModificationDateClasses: getModificationDateClasses,
    getSelectedContentClasses: getSelectedContentClasses,
    getPreviewReplaceValues: getPreviewReplaceValues,
    getTemplateReplaceValues: getTemplateReplaceValues,
    getTemplates: getTemplates,
    getCdateFormat: getCdateFormat,
    getMdateFormat: getMdateFormat,
    getDialogWidth: getDialogWidth,
    getDialogHeight: getDialogHeight
  };

  var addZeros = function (value, len) {
    value = '' + value;
    if (value.length < len) {
      for (var i = 0; i < len - value.length; i++) {
        value = '0' + value;
      }
    }
    return value;
  };
  var getDateTime = function (editor, fmt, date) {
    var daysShort = 'Sun Mon Tue Wed Thu Fri Sat Sun'.split(' ');
    var daysLong = 'Sunday Monday Tuesday Wednesday Thursday Friday Saturday Sunday'.split(' ');
    var monthsShort = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ');
    var monthsLong = 'January February March April May June July August September October November December'.split(' ');
    date = date || new Date();
    fmt = fmt.replace('%D', '%m/%d/%Y');
    fmt = fmt.replace('%r', '%I:%M:%S %p');
    fmt = fmt.replace('%Y', '' + date.getFullYear());
    fmt = fmt.replace('%y', '' + date.getYear());
    fmt = fmt.replace('%m', addZeros(date.getMonth() + 1, 2));
    fmt = fmt.replace('%d', addZeros(date.getDate(), 2));
    fmt = fmt.replace('%H', '' + addZeros(date.getHours(), 2));
    fmt = fmt.replace('%M', '' + addZeros(date.getMinutes(), 2));
    fmt = fmt.replace('%S', '' + addZeros(date.getSeconds(), 2));
    fmt = fmt.replace('%I', '' + ((date.getHours() + 11) % 12 + 1));
    fmt = fmt.replace('%p', '' + (date.getHours() < 12 ? 'AM' : 'PM'));
    fmt = fmt.replace('%B', '' + editor.translate(monthsLong[date.getMonth()]));
    fmt = fmt.replace('%b', '' + editor.translate(monthsShort[date.getMonth()]));
    fmt = fmt.replace('%A', '' + editor.translate(daysLong[date.getDay()]));
    fmt = fmt.replace('%a', '' + editor.translate(daysShort[date.getDay()]));
    fmt = fmt.replace('%%', '%');
    return fmt;
  };
  var $_7g4u63qejfuw8rxj = { getDateTime: getDateTime };

  var createTemplateList = function (editorSettings, callback) {
    return function () {
      var templateList = $_e8v0etqcjfuw8rxh.getTemplates(editorSettings);
      if (typeof templateList === 'function') {
        templateList(callback);
        return;
      }
      if (typeof templateList === 'string') {
        global$2.send({
          url: templateList,
          success: function (text) {
            callback(JSON.parse(text));
          }
        });
      } else {
        callback(templateList);
      }
    };
  };
  var replaceTemplateValues = function (editor, html, templateValues) {
    global$1.each(templateValues, function (v, k) {
      if (typeof v === 'function') {
        v = v(k);
      }
      html = html.replace(new RegExp('\\{\\$' + k + '\\}', 'g'), v);
    });
    return html;
  };
  var replaceVals = function (editor, e) {
    var dom = editor.dom, vl = $_e8v0etqcjfuw8rxh.getTemplateReplaceValues(editor);
    global$1.each(dom.select('*', e), function (e) {
      global$1.each(vl, function (v, k) {
        if (dom.hasClass(e, k)) {
          if (typeof vl[k] === 'function') {
            vl[k](e);
          }
        }
      });
    });
  };
  var hasClass = function (n, c) {
    return new RegExp('\\b' + c + '\\b', 'g').test(n.className);
  };
  var insertTemplate = function (editor, ui, html) {
    var el;
    var n;
    var dom = editor.dom;
    var sel = editor.selection.getContent();
    html = replaceTemplateValues(editor, html, $_e8v0etqcjfuw8rxh.getTemplateReplaceValues(editor));
    el = dom.create('div', null, html);
    n = dom.select('.mceTmpl', el);
    if (n && n.length > 0) {
      el = dom.create('div', null);
      el.appendChild(n[0].cloneNode(true));
    }
    global$1.each(dom.select('*', el), function (n) {
      if (hasClass(n, $_e8v0etqcjfuw8rxh.getCreationDateClasses(editor).replace(/\s+/g, '|'))) {
        n.innerHTML = $_7g4u63qejfuw8rxj.getDateTime(editor, $_e8v0etqcjfuw8rxh.getCdateFormat(editor));
      }
      if (hasClass(n, $_e8v0etqcjfuw8rxh.getModificationDateClasses(editor).replace(/\s+/g, '|'))) {
        n.innerHTML = $_7g4u63qejfuw8rxj.getDateTime(editor, $_e8v0etqcjfuw8rxh.getMdateFormat(editor));
      }
      if (hasClass(n, $_e8v0etqcjfuw8rxh.getSelectedContentClasses(editor).replace(/\s+/g, '|'))) {
        n.innerHTML = sel;
      }
    });
    replaceVals(editor, el);
    editor.execCommand('mceInsertContent', false, el.innerHTML);
    editor.addVisual();
  };
  var $_4x5j6jq9jfuw8rxe = {
    createTemplateList: createTemplateList,
    replaceTemplateValues: replaceTemplateValues,
    replaceVals: replaceVals,
    insertTemplate: insertTemplate
  };

  var register = function (editor) {
    editor.addCommand('mceInsertTemplate', $_c33mcuq8jfuw8rxa.curry($_4x5j6jq9jfuw8rxe.insertTemplate, editor));
  };
  var $_1kc7i2q7jfuw8rx6 = { register: register };

  var setup = function (editor) {
    editor.on('PreProcess', function (o) {
      var dom = editor.dom, dateFormat = $_e8v0etqcjfuw8rxh.getMdateFormat(editor);
      global$1.each(dom.select('div', o.node), function (e) {
        if (dom.hasClass(e, 'mceTmpl')) {
          global$1.each(dom.select('*', e), function (e) {
            if (dom.hasClass(e, editor.getParam('template_mdate_classes', 'mdate').replace(/\s+/g, '|'))) {
              e.innerHTML = $_7g4u63qejfuw8rxj.getDateTime(editor, dateFormat);
            }
          });
          $_4x5j6jq9jfuw8rxe.replaceVals(editor, e);
        }
      });
    });
  };
  var $_fer37mqfjfuw8rxl = { setup: setup };

  var insertIframeHtml = function (editor, win, html) {
    if (html.indexOf('<html>') === -1) {
      var contentCssLinks_1 = '';
      global$1.each(editor.contentCSS, function (url) {
        contentCssLinks_1 += '<link type="text/css" rel="stylesheet" href="' + editor.documentBaseURI.toAbsolute(url) + '">';
      });
      var bodyClass = editor.settings.body_class || '';
      if (bodyClass.indexOf('=') !== -1) {
        bodyClass = editor.getParam('body_class', '', 'hash');
        bodyClass = bodyClass[editor.id] || '';
      }
      html = '<!DOCTYPE html>' + '<html>' + '<head>' + contentCssLinks_1 + '</head>' + '<body class="' + bodyClass + '">' + html + '</body>' + '</html>';
    }
    html = $_4x5j6jq9jfuw8rxe.replaceTemplateValues(editor, html, $_e8v0etqcjfuw8rxh.getPreviewReplaceValues(editor));
    var doc = win.find('iframe')[0].getEl().contentWindow.document;
    doc.open();
    doc.write(html);
    doc.close();
  };
  var open = function (editor, templateList) {
    var win;
    var values = [];
    var templateHtml;
    if (!templateList || templateList.length === 0) {
      var message = editor.translate('No templates defined.');
      editor.notificationManager.open({
        text: message,
        type: 'info'
      });
      return;
    }
    global$1.each(templateList, function (template) {
      values.push({
        selected: !values.length,
        text: template.title,
        value: {
          url: template.url,
          content: template.content,
          description: template.description
        }
      });
    });
    var onSelectTemplate = function (e) {
      var value = e.control.value();
      if (value.url) {
        global$2.send({
          url: value.url,
          success: function (html) {
            templateHtml = html;
            insertIframeHtml(editor, win, templateHtml);
          }
        });
      } else {
        templateHtml = value.content;
        insertIframeHtml(editor, win, templateHtml);
      }
      win.find('#description')[0].text(e.control.value().description);
    };
    win = editor.windowManager.open({
      title: 'Insert template',
      layout: 'flex',
      direction: 'column',
      align: 'stretch',
      padding: 15,
      spacing: 10,
      items: [
        {
          type: 'form',
          flex: 0,
          padding: 0,
          items: [{
              type: 'container',
              label: 'Templates',
              items: {
                type: 'listbox',
                label: 'Templates',
                name: 'template',
                values: values,
                onselect: onSelectTemplate
              }
            }]
        },
        {
          type: 'label',
          name: 'description',
          label: 'Description',
          text: '\xA0'
        },
        {
          type: 'iframe',
          flex: 1,
          border: 1
        }
      ],
      onsubmit: function () {
        $_4x5j6jq9jfuw8rxe.insertTemplate(editor, false, templateHtml);
      },
      minWidth: $_e8v0etqcjfuw8rxh.getDialogWidth(editor),
      minHeight: $_e8v0etqcjfuw8rxh.getDialogHeight(editor)
    });
    win.find('listbox')[0].fire('select');
  };
  var $_28insoqhjfuw8rxo = { open: open };

  var showDialog = function (editor) {
    return function (templates) {
      $_28insoqhjfuw8rxo.open(editor, templates);
    };
  };
  var register$1 = function (editor) {
    editor.addButton('template', {
      title: 'Insert template',
      onclick: $_4x5j6jq9jfuw8rxe.createTemplateList(editor.settings, showDialog(editor))
    });
    editor.addMenuItem('template', {
      text: 'Template',
      onclick: $_4x5j6jq9jfuw8rxe.createTemplateList(editor.settings, showDialog(editor)),
      icon: 'template',
      context: 'insert'
    });
  };
  var $_bc10f6qgjfuw8rxm = { register: register$1 };

  global.add('template', function (editor) {
    $_bc10f6qgjfuw8rxm.register(editor);
    $_1kc7i2q7jfuw8rx6.register(editor);
    $_fer37mqfjfuw8rxl.setup(editor);
  });
  function Plugin () {
  }

  return Plugin;

}());
})();
