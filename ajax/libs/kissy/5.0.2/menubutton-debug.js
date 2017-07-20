/*
Copyright 2014, modulex-menubutton@1.0.2
MIT Licensed
build time: Thu, 16 Oct 2014 08:45:06 GMT
*/
modulex.add("menubutton", ["menu","xtemplate/runtime","button","component/extension/content-box","util","node"], function(require, exports, module) {
var _menu_ = require("menu");
var xtemplateRuntime = require("xtemplate/runtime");
var button = require("button");
var componentExtensionContentBox = require("component/extension/content-box");
var _util_ = require("util");
var node = require("node");
/*
combined modules:
menubutton
menubutton/control
menubutton/xtpl/tpl-render
menubutton/xtpl/tpl
menubutton/select
menubutton/option
*/
var menubuttonXtplTpl, menubuttonOption, menubuttonXtplTplRender, menubuttonControl, menubuttonSelect, menubutton;
menubuttonXtplTpl = function (exports) {
  /*compiled by xtemplate#3.3.1*/
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
      params: ['content']
    }, buffer, ['getBaseCssClasses']);
    buffer = buffer.writeEscaped(callRet0);
    buffer.data += '">';
    var id1 = (t = affix.content) !== undefined ? t : (t = data.content) !== undefined ? t : scope.resolveLooseUp(['content']);
    buffer = buffer.write(id1);
    buffer.data += '</div>\r\n<div class="';
    pos.line = 2;
    var callRet2;
    callRet2 = callFnUtil(tpl, scope, {
      escape: 1,
      params: ['dropdown']
    }, buffer, ['getBaseCssClasses']);
    buffer = buffer.writeEscaped(callRet2);
    buffer.data += '">\r\n    <div class="';
    pos.line = 3;
    var callRet3;
    callRet3 = callFnUtil(tpl, scope, {
      escape: 1,
      params: ['dropdown-inner']
    }, buffer, ['getBaseCssClasses']);
    buffer = buffer.writeEscaped(callRet3);
    buffer.data += '">\r\n    </div>\r\n</div>';
    return buffer;
  };
  ret.TPL_NAME = module.id || module.name;
  return exports;
}();
menubuttonOption = function (exports) {
  /**
   * represent a menu option , just make it selectable and can have select status
   * @ignore
   * @author yiminghe@gmail.com
   */
  var Menu = _menu_;
  /**
   * Option for Select component.
   * xclass: 'option'.
   * @class KISSY.MenuButton.Option
   * @extends KISSY.Menu.Item
   */
  exports = Menu.RadioItem.extend({}, {
    ATTRS: { textContent: {} },
    xclass: 'option'
  });
  return exports;
}();
menubuttonXtplTplRender = function (exports) {
  var tpl = menubuttonXtplTpl;
  var XTemplateRuntime = xtemplateRuntime;
  var instance = new XTemplateRuntime(tpl);
  exports = function () {
    return instance.render.apply(instance, arguments);
  };
  return exports;
}();
menubuttonControl = function (exports) {
  var Button = button;
  var ContentBox = componentExtensionContentBox;
  var KeyCode = node.Event.KeyCode;
  var MenuButtonTpl = menubuttonXtplTplRender;
  var util = _util_;
  exports = Button.extend([ContentBox], {
    isMenuButton: 1,
    decorateDom: function (el) {
      var self = this, prefixCls = self.get('prefixCls');
      var popupMenuEl = el.one('.' + prefixCls + 'popupmenu');
      var docBody = popupMenuEl[0].ownerDocument.body;
      docBody.insertBefore(popupMenuEl[0], docBody.firstChild);
      var PopupMenuClass = this.getComponentConstructorByNode(prefixCls, popupMenuEl);
      self.setInternal('menu', new PopupMenuClass({
        srcNode: popupMenuEl,
        prefixCls: prefixCls
      }));
    },
    beforeCreateDom: function (renderData) {
      util.mix(renderData.elAttrs, {
        'aria-expanded': 'false',
        'aria-haspopup': 'true'
      });
    },
    _onSetCollapsed: function (v) {
      var self = this, menu = self.get('menu');
      var el = self.$el;
      var cls = self.getBaseCssClass('open');
      el[v ? 'removeClass' : 'addClass'](cls).attr('aria-expanded', !v);
      if (v) {
        menu.hide();
      } else {
        if (!menu.get('visible')) {
          var align = {
            node: el,
            points: [
              'bl',
              'tl'
            ],
            overflow: {
              adjustX: 1,
              adjustY: 1
            }
          };
          util.mix(menu.get('align'), align, false);
          if (self.get('matchElWidth')) {
            menu.render();
            var menuEl = menu.get('el');
            var borderWidth = (parseInt(menuEl.css('borderLeftWidth'), 10) || 0) + (parseInt(menuEl.css('borderRightWidth'), 10) || 0);
            menu.set('width', menu.get('align').node[0].offsetWidth - borderWidth);
          }
          menu.show();
          el.attr('aria-haspopup', menu.get('el').attr('id'));
        }
      }
    },
    bindUI: function () {
      var self = this;
      self.on('afterHighlightedItemChange', onMenuAfterHighlightedItemChange, self);
      self.on('click', onMenuItemClick, self);
    },
    handleKeyDownInternal: function (e) {
      var self = this, keyCode = e.keyCode, type = String(e.type), menu = self.get('menu');
      if (keyCode === KeyCode.SPACE) {
        e.preventDefault();
        if (type !== 'keyup') {
          return undefined;
        }
      } else if (type !== 'keydown') {
        return undefined;
      }
      if (menu.get('rendered') && menu.get('visible')) {
        var handledByMenu = menu.handleKeyDownInternal(e);
        if (keyCode === KeyCode.ESC) {
          self.set('collapsed', true);
          return true;
        }
        return handledByMenu;
      }
      if (keyCode === KeyCode.SPACE || keyCode === KeyCode.DOWN || keyCode === KeyCode.UP) {
        self.set('collapsed', false);
        return true;
      }
      return undefined;
    },
    handleClickInternal: function () {
      var self = this;
      self.set('collapsed', !self.get('collapsed'));
    },
    handleBlurInternal: function (e) {
      var self = this;
      self.callSuper(e);
      self.set('collapsed', true);
    },
    addItem: function (item, index) {
      var menu = this.get('menu');
      menu.addChild(item, index);
    },
    removeItem: function (c, destroy) {
      var menu = this.get('menu');
      menu.removeChild(c, destroy);
    },
    removeItems: function (destroy) {
      var menu = this.get('menu');
      if (menu) {
        if (menu.removeChildren) {
          menu.removeChildren(destroy);
        } else if (menu.children) {
          menu.children = [];
        }
      }
    },
    getItemAt: function (index) {
      var menu = this.get('menu');
      return menu.get('rendered') && menu.getChildAt(index);
    },
    _onSetDisabled: function (v) {
      this.callSuper(v);
      if (v) {
        this.set('collapsed', true);
      }
    },
    destructor: function () {
      this.get('menu').destroy();
    }
  }, {
    ATTRS: {
      handleGestureEvents: { value: true },
      focusable: { value: true },
      allowTextSelection: { value: false },
      contentTpl: { value: MenuButtonTpl },
      matchElWidth: { value: true },
      collapseOnClick: { value: false },
      menu: {
        getter: function (v) {
          v = v || {};
          if (!v.isControl) {
            v.xclass = v.xclass || 'popupmenu';
            v = this.createComponent(v);
            this.setInternal('menu', v);
          }
          return v;
        },
        setter: function (m) {
          if (m.isControl) {
            m.setInternal('parent', this);
          }
        }
      },
      collapsed: {
        value: true,
        render: 1,
        sync: 0
      }
    },
    xclass: 'menu-button'
  });
  function onMenuItemClick(e) {
    if (e.target.isMenuItem && this.get('collapseOnClick')) {
      this.set('collapsed', true);
    }
  }
  function onMenuAfterHighlightedItemChange(e) {
    if (e.target.isMenu) {
      var el = this.el, menuItem = e.newVal;
      el.setAttribute('aria-activedescendant', menuItem && menuItem.el.id || '');
    }
  }
  return exports;
}();
menubuttonSelect = function (exports) {
  var $ = node;
  var MenuButton = menubuttonControl;
  var util = _util_;
  function getSelectedItem(self) {
    var menu = self.get('menu'), cs = menu.children || menu.get && menu.get('children') || [], value = self.get('value'), c, i;
    for (i = 0; i < cs.length; i++) {
      c = cs[i];
      if (getItemValue(c) === value) {
        return c;
      }
    }
    return null;
  }
  function getItemValue(c) {
    var v;
    if (c) {
      if (c.get) {
        if ((v = c.get('value')) === undefined) {
          v = c.get('textContent') || c.get('content');
        }
      } else {
        if ((v = c.value) === undefined) {
          v = c.textContent || c.content;
        }
      }
    }
    return v;
  }
  function deSelectAllExcept(self) {
    var menu = self.get('menu'), value = self.get('value'), cs = menu && menu.get && menu.get('children');
    util.each(cs, function (c) {
      if (c && c.set) {
        c.set('selected', getItemValue(c) === value);
      }
    });
  }
  function _handleMenuShow(e) {
    var self = this, selectedItem = getSelectedItem(self), m = self.get('menu');
    if (e.target === m) {
      var item = selectedItem || m.getChildAt(0);
      if (item) {
        item.set('highlighted', true);
      }
      if (selectedItem) {
        selectedItem.set('selected', true);
      }
    }
  }
  function _updateCaption(self) {
    var item = getSelectedItem(self), textContent = item && (item.textContent || item.get && item.get('textContent')), content = item && (item.content || item.get && item.get('content'));
    self.set('content', textContent || content || self.get('defaultCaption'));
  }
  function handleMenuClick(e) {
    var self = this, target = e.target;
    if (target.isMenuItem) {
      var newValue = getItemValue(target), oldValue = self.get('value');
      self.set('value', newValue);
      if (newValue !== oldValue) {
        self.fire('change', {
          prevVal: oldValue,
          newVal: newValue
        });
      }
    }
  }
  var Select = MenuButton.extend({
    bindUI: function () {
      this.on('click', handleMenuClick, this);
      this.on('show', _handleMenuShow, this);
    },
    removeItems: function () {
      var self = this;
      self.callSuper.apply(self, arguments);
      self.set('value', null);
    },
    removeItem: function (c, destroy) {
      var self = this;
      self.callSuper(c, destroy);
      if (c.get('value') === self.get('value')) {
        self.set('value', null);
      }
    },
    _onSetValue: function () {
      var self = this;
      deSelectAllExcept(self);
      _updateCaption(self);
    },
    _onSetDefaultCaption: function () {
      _updateCaption(this);
    }
  }, {
    ATTRS: {
      value: {},
      defaultCaption: { value: '' },
      collapseOnClick: { value: true }
    },
    decorate: function (element, cfg) {
      element = $(element);
      cfg = cfg || {};
      cfg.elBefore = element;
      var name, allItems = [], select, selectedItem = null, curValue = element.val(), options = element.all('option');
      options.each(function (option) {
        var item = {
          xclass: 'option',
          content: option.text(),
          elCls: option.attr('class'),
          value: option.val()
        };
        if (curValue === option.val()) {
          selectedItem = {
            content: item.content,
            value: item.value
          };
        }
        allItems.push(item);
      });
      cfg.menu = cfg.menu || cfg.menuCfg || {};
      cfg.menu.children = allItems;
      delete cfg.menuCfg;
      select = new Select(util.mix(cfg, selectedItem)).render();
      if (name = element.attr('name')) {
        var input = $('<input' + ' type="hidden"' + ' name="' + name + '" value="' + curValue + '">').insertBefore(element, undefined);
        select.on('afterValueChange', function (e) {
          input.val(e.newVal || '');
        });
      }
      element.remove();
      return select;
    },
    xclass: 'select'
  });
  exports = Select;
  return exports;
}();
menubutton = function (exports) {
  var MenuButton = menubuttonControl;
  var Select = menubuttonSelect;
  MenuButton.Select = Select;
  MenuButton.Option = menubuttonOption;
  exports = MenuButton;
  MenuButton.version = '1.0.2';
  return exports;
}();
module.exports = menubutton;
});