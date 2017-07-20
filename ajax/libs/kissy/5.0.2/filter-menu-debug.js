/*
Copyright 2014, modulex-filter-menu@1.0.1
MIT Licensed
build time: Thu, 16 Oct 2014 07:45:19 GMT
*/
modulex.add("filter-menu", ["xtemplate/runtime","menu","component/extension/content-box","util"], function(require, exports, module) {
var xtemplateRuntime = require("xtemplate/runtime");
var menu = require("menu");
var componentExtensionContentBox = require("component/extension/content-box");
var _util_ = require("util");
/*
combined modules:
filter-menu
filter-menu/xtpl/tpl-render
filter-menu/xtpl/tpl
*/
var filterMenuXtplTpl, filterMenuXtplTplRender, filterMenu;
filterMenuXtplTpl = function (exports) {
  var ret = exports = function tpl(undefined) {
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
    var callRet0;
    callRet0 = callFnUtil(tpl, scope, {
      escape: 1,
      params: ['input-wrap']
    }, buffer, ['getBaseCssClasses']);
    buffer = buffer.writeEscaped(callRet0);
    buffer.data += '">\r\n    <div class="';
    pos.line = 2;
    var callRet1;
    callRet1 = callFnUtil(tpl, scope, {
      escape: 1,
      params: ['placeholder']
    }, buffer, ['getBaseCssClasses']);
    buffer = buffer.writeEscaped(callRet1);
    buffer.data += '">\r\n        ';
    pos.line = 3;
    var id2 = (t = affix.placeholder) !== undefined ? t : (t = data.placeholder) !== undefined ? t : scope.resolveLooseUp(['placeholder']);
    buffer = buffer.writeEscaped(id2);
    buffer.data += '\r\n    </div>\r\n    <input class="';
    pos.line = 5;
    var callRet3;
    callRet3 = callFnUtil(tpl, scope, {
      escape: 1,
      params: ['input']
    }, buffer, ['getBaseCssClasses']);
    buffer = buffer.writeEscaped(callRet3);
    buffer.data += '"\r\n            autocomplete="off"/>\r\n</div>\r\n<div class="';
    pos.line = 8;
    var callRet4;
    callRet4 = callFnUtil(tpl, scope, {
      escape: 1,
      params: ['content']
    }, buffer, ['getBaseCssClasses']);
    buffer = buffer.writeEscaped(callRet4);
    buffer.data += '">';
    var id5 = (t = affix.content) !== undefined ? t : (t = data.content) !== undefined ? t : scope.resolveLooseUp(['content']);
    buffer = buffer.write(id5);
    buffer.data += '</div>';
    return buffer;
  };
  ret.TPL_NAME = module.id || module.name;
  return exports;
}();
filterMenuXtplTplRender = function (exports) {
  var tpl = filterMenuXtplTpl;
  var XTemplateRuntime = xtemplateRuntime;
  var instance = new XTemplateRuntime(tpl);
  exports = function () {
    return instance.render.apply(instance, arguments);
  };
  return exports;
}();
filterMenu = function (exports) {
  var Menu = menu;
  var FilterMenuTpl = filterMenuXtplTplRender;
  var HIT_CLS = 'menuitem-hit';
  var ContentBox = componentExtensionContentBox;
  var util = _util_;
  exports = Menu.extend([ContentBox], {
    bindUI: function () {
      var self = this, filterInput = self.get('filterInput');
      filterInput.on('input', self.handleFilterEvent, self);
    },
    handleMouseEnterInternal: function (e) {
      var self = this;
      self.callSuper(e);
      self.getKeyEventTarget()[0].select();
    },
    handleFilterEvent: function () {
      var self = this, str, filterInput = self.get('filterInput'), highlightedItem = self.get('highlightedItem');
      self.set('filterStr', filterInput.val());
      str = filterInput.val();
      if (self.get('allowMultiple')) {
        str = str.replace(/^.+,/, '');
      }
      if (!str && highlightedItem) {
        highlightedItem.set('highlighted', false);
      } else if (str && (!highlightedItem || !highlightedItem.get('visible'))) {
        highlightedItem = self._getNextEnabledHighlighted(0, 1);
        if (highlightedItem) {
          highlightedItem.set('highlighted', true);
        }
      }
    },
    _onSetFilterStr: function (v) {
      this.filterItems(v);
    },
    _onSetPlaceholder: function (v) {
      this.get('placeholderEl').html(v);
    },
    getKeyEventTarget: function () {
      return this.get('filterInput');
    },
    filterItems: function (str) {
      var self = this, prefixCls = self.get('prefixCls'), _placeholderEl = self.get('placeholderEl'), filterInput = self.get('filterInput');
      _placeholderEl[str ? 'hide' : 'show']();
      if (self.get('allowMultiple')) {
        var enteredItems = [], lastWord;
        var match = str.match(/(.+)[,\uff0c]\s*([^\uff0c,]*)/);
        var items = [];
        if (match) {
          items = match[1].split(/[,\uff0c]/);
        }
        if (/[,\uff0c]$/.test(str)) {
          enteredItems = [];
          if (match) {
            enteredItems = items;
            lastWord = items[items.length - 1];
            var item = self.get('highlightedItem'), content = item && item.get('content');
            if (content && content.indexOf(lastWord) > -1 && lastWord) {
              enteredItems[enteredItems.length - 1] = content;
            }
            filterInput.val(enteredItems.join(',') + ',');
          }
          str = '';
        } else {
          if (match) {
            str = match[2] || '';
          }
          enteredItems = items;
        }
        var oldEnteredItems = self.get('enteredItems');
        if (oldEnteredItems.length !== enteredItems.length) {
          self.set('enteredItems', enteredItems);
        }
      }
      var children = self.get('children'), strExp = str && new RegExp(util.escapeRegExp(str), 'ig');
      util.each(children, function (c) {
        var content = c.get('content');
        if (!str) {
          c.get('el').html(content);
          c.set('visible', true);
        } else {
          if (content.indexOf(str) > -1) {
            c.set('visible', true);
            c.get('el').html(content.replace(strExp, function (m) {
              return '<span class="' + prefixCls + HIT_CLS + '">' + m + '<' + '/span>';
            }));
          } else {
            c.set('visible', false);
          }
        }
      });
    },
    reset: function () {
      var self = this;
      self.set('filterStr', '');
      self.set('enteredItems', []);
      self.get('filterInput').val('');
    }
  }, {
    version: '1.0.1',
    ATTRS: {
      handleGestureEvents: { value: true },
      focusable: { value: true },
      allowTextSelection: { value: true },
      contentTpl: { value: FilterMenuTpl },
      filterInput: {
        selector: function () {
          return '.' + this.getBaseCssClass('input');
        }
      },
      filterInputWrap: {
        selector: function () {
          return '.' + this.getBaseCssClass('input-wrap');
        }
      },
      placeholder: {
        render: 1,
        sync: 0,
        parse: function () {
          var placeholderEl = this.get('placeholderEl');
          return placeholderEl && placeholderEl.html();
        }
      },
      placeholderEl: {
        selector: function () {
          return '.' + this.getBaseCssClass('placeholder');
        }
      },
      filterStr: {},
      enteredItems: { value: [] },
      allowMultiple: { value: false }
    },
    xclass: 'filter-menu'
  });
  return exports;
}();
module.exports = filterMenu;
});