(function () {
var textcolor = (function () {
  'use strict';

  var PluginManager = tinymce.util.Tools.resolve('tinymce.PluginManager');

  var getCurrentColor = function (editor, format) {
    var color;
    editor.dom.getParents(editor.selection.getStart(), function (elm) {
      var value;
      if (value = elm.style[format === 'forecolor' ? 'color' : 'background-color']) {
        color = value;
      }
    });
    return color;
  };
  var mapColors = function (colorMap) {
    var i;
    var colors = [];
    for (i = 0; i < colorMap.length; i += 2) {
      colors.push({
        text: colorMap[i + 1],
        color: '#' + colorMap[i]
      });
    }
    return colors;
  };
  var applyFormat = function (editor, format, value) {
    editor.undoManager.transact(function () {
      editor.focus();
      editor.formatter.apply(format, { value: value });
      editor.nodeChanged();
    });
  };
  var removeFormat = function (editor, format) {
    editor.undoManager.transact(function () {
      editor.focus();
      editor.formatter.remove(format, { value: null }, null, true);
      editor.nodeChanged();
    });
  };
  var $_bp1kbpq6je4cbz8o = {
    getCurrentColor: getCurrentColor,
    mapColors: mapColors,
    applyFormat: applyFormat,
    removeFormat: removeFormat
  };

  var register = function (editor) {
    editor.addCommand('mceApplyTextcolor', function (format, value) {
      $_bp1kbpq6je4cbz8o.applyFormat(editor, format, value);
    });
    editor.addCommand('mceRemoveTextcolor', function (format) {
      $_bp1kbpq6je4cbz8o.removeFormat(editor, format);
    });
  };
  var $_eflnsgq5je4cbz8m = { register: register };

  var DOMUtils = tinymce.util.Tools.resolve('tinymce.dom.DOMUtils');

  var Tools = tinymce.util.Tools.resolve('tinymce.util.Tools');

  var defaultColorMap = [
    '000000',
    'Black',
    '993300',
    'Burnt orange',
    '333300',
    'Dark olive',
    '003300',
    'Dark green',
    '003366',
    'Dark azure',
    '000080',
    'Navy Blue',
    '333399',
    'Indigo',
    '333333',
    'Very dark gray',
    '800000',
    'Maroon',
    'FF6600',
    'Orange',
    '808000',
    'Olive',
    '008000',
    'Green',
    '008080',
    'Teal',
    '0000FF',
    'Blue',
    '666699',
    'Grayish blue',
    '808080',
    'Gray',
    'FF0000',
    'Red',
    'FF9900',
    'Amber',
    '99CC00',
    'Yellow green',
    '339966',
    'Sea green',
    '33CCCC',
    'Turquoise',
    '3366FF',
    'Royal blue',
    '800080',
    'Purple',
    '999999',
    'Medium gray',
    'FF00FF',
    'Magenta',
    'FFCC00',
    'Gold',
    'FFFF00',
    'Yellow',
    '00FF00',
    'Lime',
    '00FFFF',
    'Aqua',
    '00CCFF',
    'Sky blue',
    '993366',
    'Red violet',
    'FFFFFF',
    'White',
    'FF99CC',
    'Pink',
    'FFCC99',
    'Peach',
    'FFFF99',
    'Light yellow',
    'CCFFCC',
    'Pale green',
    'CCFFFF',
    'Pale cyan',
    '99CCFF',
    'Light sky blue',
    'CC99FF',
    'Plum'
  ];
  var getTextColorMap = function (editor) {
    return editor.getParam('textcolor_map', defaultColorMap);
  };
  var getForeColorMap = function (editor) {
    return editor.getParam('forecolor_map', getTextColorMap(editor));
  };
  var getBackColorMap = function (editor) {
    return editor.getParam('backcolor_map', getTextColorMap(editor));
  };
  var getTextColorRows = function (editor) {
    return editor.getParam('textcolor_rows', 5);
  };
  var getTextColorCols = function (editor) {
    return editor.getParam('textcolor_cols', 8);
  };
  var getForeColorRows = function (editor) {
    return editor.getParam('forecolor_rows', getTextColorRows(editor));
  };
  var getBackColorRows = function (editor) {
    return editor.getParam('backcolor_rows', getTextColorRows(editor));
  };
  var getForeColorCols = function (editor) {
    return editor.getParam('forecolor_cols', getTextColorCols(editor));
  };
  var getBackColorCols = function (editor) {
    return editor.getParam('backcolor_cols', getTextColorCols(editor));
  };
  var getColorPickerCallback = function (editor) {
    return editor.getParam('color_picker_callback', null);
  };
  var hasColorPicker = function (editor) {
    return typeof getColorPickerCallback(editor) === 'function';
  };
  var $_4fgkjbqaje4cbz8v = {
    getForeColorMap: getForeColorMap,
    getBackColorMap: getBackColorMap,
    getForeColorRows: getForeColorRows,
    getBackColorRows: getBackColorRows,
    getForeColorCols: getForeColorCols,
    getBackColorCols: getBackColorCols,
    getColorPickerCallback: getColorPickerCallback,
    hasColorPicker: hasColorPicker
  };

  var I18n = tinymce.util.Tools.resolve('tinymce.util.I18n');

  var getHtml = function (cols, rows, colorMap, hasColorPicker) {
    var colors, color, html, last, x, y, i, count = 0;
    var id = DOMUtils.DOM.uniqueId('mcearia');
    var getColorCellHtml = function (color, title) {
      var isNoColor = color === 'transparent';
      return '<td class="mce-grid-cell' + (isNoColor ? ' mce-colorbtn-trans' : '') + '">' + '<div id="' + id + '-' + count++ + '"' + ' data-mce-color="' + (color ? color : '') + '"' + ' role="option"' + ' tabIndex="-1"' + ' style="' + (color ? 'background-color: ' + color : '') + '"' + ' title="' + I18n.translate(title) + '">' + (isNoColor ? '&#215;' : '') + '</div>' + '</td>';
    };
    colors = $_bp1kbpq6je4cbz8o.mapColors(colorMap);
    colors.push({
      text: I18n.translate('No color'),
      color: 'transparent'
    });
    html = '<table class="mce-grid mce-grid-border mce-colorbutton-grid" role="list" cellspacing="0"><tbody>';
    last = colors.length - 1;
    for (y = 0; y < rows; y++) {
      html += '<tr>';
      for (x = 0; x < cols; x++) {
        i = y * cols + x;
        if (i > last) {
          html += '<td></td>';
        } else {
          color = colors[i];
          html += getColorCellHtml(color.color, color.text);
        }
      }
      html += '</tr>';
    }
    if (hasColorPicker) {
      html += '<tr>' + '<td colspan="' + cols + '" class="mce-custom-color-btn">' + '<div id="' + id + '-c" class="mce-widget mce-btn mce-btn-small mce-btn-flat" ' + 'role="button" tabindex="-1" aria-labelledby="' + id + '-c" style="width: 100%">' + '<button type="button" role="presentation" tabindex="-1">' + I18n.translate('Custom...') + '</button>' + '</div>' + '</td>' + '</tr>';
      html += '<tr>';
      for (x = 0; x < cols; x++) {
        html += getColorCellHtml('', 'Custom color');
      }
      html += '</tr>';
    }
    html += '</tbody></table>';
    return html;
  };
  var $_8n98ftqbje4cbz8y = { getHtml: getHtml };

  var setDivColor = function setDivColor(div, value) {
    div.style.background = value;
    div.setAttribute('data-mce-color', value);
  };
  var onButtonClick = function (editor) {
    return function (e) {
      var ctrl = e.control;
      if (ctrl._color) {
        editor.execCommand('mceApplyTextcolor', ctrl.settings.format, ctrl._color);
      } else {
        editor.execCommand('mceRemoveTextcolor', ctrl.settings.format);
      }
    };
  };
  var onPanelClick = function (editor, cols) {
    return function (e) {
      var buttonCtrl = this.parent();
      var value;
      var currentColor = $_bp1kbpq6je4cbz8o.getCurrentColor(editor, buttonCtrl.settings.format);
      var selectColor = function (value) {
        buttonCtrl.hidePanel();
        buttonCtrl.color(value);
        editor.execCommand('mceApplyTextcolor', buttonCtrl.settings.format, value);
      };
      var resetColor = function () {
        buttonCtrl.hidePanel();
        buttonCtrl.resetColor();
        editor.execCommand('mceRemoveTextcolor', buttonCtrl.settings.format);
      };
      if (DOMUtils.DOM.getParent(e.target, '.mce-custom-color-btn')) {
        buttonCtrl.hidePanel();
        var colorPickerCallback = $_4fgkjbqaje4cbz8v.getColorPickerCallback(editor);
        colorPickerCallback.call(editor, function (value) {
          var tableElm = buttonCtrl.panel.getEl().getElementsByTagName('table')[0];
          var customColorCells, div, i;
          customColorCells = Tools.map(tableElm.rows[tableElm.rows.length - 1].childNodes, function (elm) {
            return elm.firstChild;
          });
          for (i = 0; i < customColorCells.length; i++) {
            div = customColorCells[i];
            if (!div.getAttribute('data-mce-color')) {
              break;
            }
          }
          if (i === cols) {
            for (i = 0; i < cols - 1; i++) {
              setDivColor(customColorCells[i], customColorCells[i + 1].getAttribute('data-mce-color'));
            }
          }
          setDivColor(div, value);
          selectColor(value);
        }, currentColor);
      }
      value = e.target.getAttribute('data-mce-color');
      if (value) {
        if (this.lastId) {
          DOMUtils.DOM.get(this.lastId).setAttribute('aria-selected', false);
        }
        e.target.setAttribute('aria-selected', true);
        this.lastId = e.target.id;
        if (value === 'transparent') {
          resetColor();
        } else {
          selectColor(value);
        }
      } else if (value !== null) {
        buttonCtrl.hidePanel();
      }
    };
  };
  var renderColorPicker = function (editor, foreColor) {
    return function () {
      var cols = foreColor ? $_4fgkjbqaje4cbz8v.getForeColorCols(editor) : $_4fgkjbqaje4cbz8v.getBackColorCols(editor);
      var rows = foreColor ? $_4fgkjbqaje4cbz8v.getForeColorRows(editor) : $_4fgkjbqaje4cbz8v.getBackColorRows(editor);
      var colorMap = foreColor ? $_4fgkjbqaje4cbz8v.getForeColorMap(editor) : $_4fgkjbqaje4cbz8v.getBackColorMap(editor);
      var hasColorPicker = $_4fgkjbqaje4cbz8v.hasColorPicker(editor);
      return $_8n98ftqbje4cbz8y.getHtml(cols, rows, colorMap, hasColorPicker);
    };
  };
  var register$1 = function (editor) {
    editor.addButton('forecolor', {
      type: 'colorbutton',
      tooltip: 'Text color',
      format: 'forecolor',
      panel: {
        role: 'application',
        ariaRemember: true,
        html: renderColorPicker(editor, true),
        onclick: onPanelClick(editor, $_4fgkjbqaje4cbz8v.getForeColorCols(editor))
      },
      onclick: onButtonClick(editor)
    });
    editor.addButton('backcolor', {
      type: 'colorbutton',
      tooltip: 'Background color',
      format: 'hilitecolor',
      panel: {
        role: 'application',
        ariaRemember: true,
        html: renderColorPicker(editor, false),
        onclick: onPanelClick(editor, $_4fgkjbqaje4cbz8v.getBackColorCols(editor))
      },
      onclick: onButtonClick(editor)
    });
  };
  var $_ea4yagq7je4cbz8q = { register: register$1 };

  PluginManager.add('textcolor', function (editor) {
    $_eflnsgq5je4cbz8m.register(editor);
    $_ea4yagq7je4cbz8q.register(editor);
  });
  function Plugin () {
  }

  return Plugin;

}());
})();
