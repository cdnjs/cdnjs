(function () {
var directionality = (function () {
  'use strict';

  var PluginManager = tinymce.util.Tools.resolve('tinymce.PluginManager');

  var Tools = tinymce.util.Tools.resolve('tinymce.util.Tools');

  var setDir = function (editor, dir) {
    var dom = editor.dom;
    var curDir;
    var blocks = editor.selection.getSelectedBlocks();
    if (blocks.length) {
      curDir = dom.getAttrib(blocks[0], 'dir');
      Tools.each(blocks, function (block) {
        if (!dom.getParent(block.parentNode, '*[dir="' + dir + '"]', dom.getRoot())) {
          dom.setAttrib(block, 'dir', curDir !== dir ? dir : null);
        }
      });
      editor.nodeChanged();
    }
  };
  var $_636z6sa2jcq8h6e4 = { setDir: setDir };

  var register = function (editor) {
    editor.addCommand('mceDirectionLTR', function () {
      $_636z6sa2jcq8h6e4.setDir(editor, 'ltr');
    });
    editor.addCommand('mceDirectionRTL', function () {
      $_636z6sa2jcq8h6e4.setDir(editor, 'rtl');
    });
  };
  var $_37k4yoa1jcq8h6e1 = { register: register };

  var generateSelector = function (dir) {
    var selector = [];
    Tools.each('h1 h2 h3 h4 h5 h6 div p'.split(' '), function (name) {
      selector.push(name + '[dir=' + dir + ']');
    });
    return selector.join(',');
  };
  var register$1 = function (editor) {
    editor.addButton('ltr', {
      title: 'Left to right',
      cmd: 'mceDirectionLTR',
      stateSelector: generateSelector('ltr')
    });
    editor.addButton('rtl', {
      title: 'Right to left',
      cmd: 'mceDirectionRTL',
      stateSelector: generateSelector('rtl')
    });
  };
  var $_66gv5ma4jcq8h6e6 = { register: register$1 };

  PluginManager.add('directionality', function (editor) {
    $_37k4yoa1jcq8h6e1.register(editor);
    $_66gv5ma4jcq8h6e6.register(editor);
  });
  var Plugin = function () {
  };

  return Plugin;

}());
})()
