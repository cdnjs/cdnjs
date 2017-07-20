/*
Copyright 2014, modulex-component@1.0.3
MIT Licensed
build time: Thu, 16 Oct 2014 07:30:48 GMT
*/
modulex.add("component/extension/content-box", ["xtemplate/runtime"], function(require, exports, module) {
var xtemplateRuntime = require("xtemplate/runtime");
/*
combined modules:
component/extension/content-box
component/extension/content-box/xtpl/view-render
component/extension/content-box/xtpl/view
*/
var componentExtensionContentBoxXtplView, componentExtensionContentBoxXtplViewRender, componentExtensionContentBox;
componentExtensionContentBoxXtplView = function (exports) {
  exports = function view(undefined) {
    var t;
    var t0;
    var t1;
    var t2;
    var t3;
    var t4;
    var t5;
    var t6;
    var t7;
    var t8;
    var t9;
    var tpl = this;
    var root = tpl.root;
    var buffer = tpl.buffer;
    var scope = tpl.scope;
    var runtime = tpl.runtime;
    var name = tpl.name;
    var pos = tpl.pos;
    var data = scope.data;
    var affix = scope.affix;
    var nativeCommands = root.nativeCommands;
    var utils = root.utils;
    var callFnUtil = utils['callFn'];
    var callCommandUtil = utils['callCommand'];
    var rangeCommand = nativeCommands['range'];
    var foreachCommand = nativeCommands['foreach'];
    var forinCommand = nativeCommands['forin'];
    var eachCommand = nativeCommands['each'];
    var withCommand = nativeCommands['with'];
    var ifCommand = nativeCommands['if'];
    var setCommand = nativeCommands['set'];
    var includeCommand = nativeCommands['include'];
    var parseCommand = nativeCommands['parse'];
    var extendCommand = nativeCommands['extend'];
    var blockCommand = nativeCommands['block'];
    var macroCommand = nativeCommands['macro'];
    var debuggerCommand = nativeCommands['debugger'];
    buffer.data += '<div class="';
    pos.line = 1;
    var callRet0;
    callRet0 = callFnUtil(tpl, scope, {
      escape: 1,
      params: ['content']
    }, buffer, ['getBaseCssClasses']);
    buffer = buffer.writeEscaped(callRet0);
    buffer.data += '">';
    var id1 = (t = affix.content) !== undefined ? t : (t = data.content) !== undefined ? t : scope.resolveLooseUp(['content']);
    buffer = buffer.write(id1);
    buffer.data += '</div>';
    return buffer;
  };
  module.exports.TPL_NAME = module.id || module.name;
  return exports;
}();
componentExtensionContentBoxXtplViewRender = function (exports) {
  var tpl = componentExtensionContentBoxXtplView;
  var XTemplateRuntime = xtemplateRuntime;
  var instance = new XTemplateRuntime(tpl);
  exports = function () {
    return instance.render.apply(instance, arguments);
  };
  return exports;
}();
componentExtensionContentBox = function (exports) {
  function shortcut(self) {
    var contentEl = self.get('contentEl');
    self.$contentEl = self.$contentEl = contentEl;
    self.contentEl = self.contentEl = contentEl && contentEl[0];
  }
  var contentTpl = componentExtensionContentBoxXtplViewRender;
  function ContentBox() {
  }
  ContentBox.prototype = {
    __createDom: function () {
      shortcut(this);
    },
    __decorateDom: function () {
      shortcut(this);
    },
    getChildrenContainerEl: function () {
      return this.get('contentEl');
    },
    _onSetContent: function (v) {
      var contentEl = this.$contentEl;
      contentEl.html(v);
      if (!this.get('allowTextSelection')) {
        contentEl.unselectable();
      }
    }
  };
  ContentBox.ATTRS = {
    contentTpl: { value: contentTpl },
    contentEl: {
      selector: function () {
        return '.' + this.getBaseCssClass('content');
      }
    },
    content: {
      parse: function () {
        return this.get('contentEl').html();
      }
    }
  };
  exports = ContentBox;
  return exports;
}();
module.exports = componentExtensionContentBox;
});