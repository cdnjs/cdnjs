/*
Copyright 2014, modulex-menu@1.0.1
MIT Licensed
build time: Thu, 16 Oct 2014 07:37:48 GMT
*/
modulex.add("menu", ["util","component/container","component/extension/delegate-children","node","component/control","component/extension/align","component/extension/shim","component/extension/content-box","xtemplate/runtime"], function(require, exports, module) {
var _util_ = require("util");
var componentContainer = require("component/container");
var componentExtensionDelegateChildren = require("component/extension/delegate-children");
var node = require("node");
var componentControl = require("component/control");
var componentExtensionAlign = require("component/extension/align");
var componentExtensionShim = require("component/extension/shim");
var componentExtensionContentBox = require("component/extension/content-box");
var xtemplateRuntime = require("xtemplate/runtime");
/*
combined modules:
menu
menu/control
menu/menuitem
menu/check-menuitem
menu/xtpl/check-menuitem-render
menu/xtpl/check-menuitem
menu/radio-menuitem
menu/xtpl/radio-menuitem-render
menu/xtpl/radio-menuitem
menu/submenu
menu/xtpl/submenu-render
menu/xtpl/submenu
menu/popupmenu
*/
var menuControl, menuMenuitem, menuXtplCheckMenuitem, menuXtplRadioMenuitem, menuXtplSubmenu, menuPopupmenu, menuXtplCheckMenuitemRender, menuXtplRadioMenuitemRender, menuXtplSubmenuRender, menuCheckMenuitem, menuRadioMenuitem, menuSubmenu, _menu_;
menuControl = function (exports) {
  /**
   * @ignore
   * menu control for kissy,accommodate menu items
   * @author yiminghe@gmail.com
   */
  var util = _util_;
  var Container = componentContainer;
  var DelegateChildrenExtension = componentExtensionDelegateChildren;
  var KeyCode = node.Event.KeyCode;
  /**
   * KISSY Menu.
   * xclass: 'menu'.
   * @class KISSY.Menu
   * @extends KISSY.Component.Container
   */
  exports = Container.extend([DelegateChildrenExtension], {
    isMenu: 1,
    beforeCreateDom: function (renderData) {
      renderData.elAttrs.role = 'menu';
    },
    bindUI: function () {
      var self = this;
      self.on('afterHighlightedItemChange', afterHighlightedItemChange, self);
    },
    _onSetHighlightedItem: function (v, ev) {
      var highlightedItem;
      if (v && ev && (highlightedItem = ev.prevVal)) {
        highlightedItem.set('highlighted', false, { data: { byPassSetHighlightedItem: 1 } });
      }
    },
    _onSetVisible: function (v, e) {
      var self = this;
      self.callSuper(v, e);
      var highlightedItem;
      if (!v && (highlightedItem = self.get('highlightedItem'))) {
        highlightedItem.set('highlighted', false);
      }
    },
    getRootMenu: function () {
      return this;
    },
    handleMouseEnterInternal: function (e) {
      var self = this;
      self.callSuper(e);
      var rootMenu = self.getRootMenu();
      if (rootMenu !== self && rootMenu._popupAutoHideTimer) {
        clearTimeout(rootMenu._popupAutoHideTimer);
        rootMenu._popupAutoHideTimer = null;
      }
    },
    handleBlurInternal: function (e) {
      var self = this;
      self.callSuper(e);
      var highlightedItem;
      if (highlightedItem = self.get('highlightedItem')) {
        highlightedItem.set('highlighted', false);
      }
    },
    _getNextEnabledHighlighted: function (index, dir) {
      var children = this.get('children');
      var len = children.length;
      var cur = index;
      do {
        var c = children[cur];
        if (!c.get('disabled') && c.get('visible') !== false) {
          return children[cur];
        }
        cur = (cur + dir + len) % len;
      } while (cur !== index);
      return undefined;
    },
    handleKeyDownInternal: function (e) {
      var self = this;
      var highlightedItem = self.get('highlightedItem');
      if (highlightedItem && highlightedItem.handleKeyDownInternal(e)) {
        return true;
      }
      var children = self.get('children');
      var len = children.length;
      if (len === 0) {
        return undefined;
      }
      var index, destIndex, nextHighlighted;
      switch (e.keyCode) {
      case KeyCode.ESC:
        if (highlightedItem = self.get('highlightedItem')) {
          highlightedItem.set('highlighted', false);
        }
        break;
      case KeyCode.HOME:
        nextHighlighted = self._getNextEnabledHighlighted(0, 1);
        break;
      case KeyCode.END:
        nextHighlighted = self._getNextEnabledHighlighted(len - 1, -1);
        break;
      case KeyCode.UP:
        if (!highlightedItem) {
          destIndex = len - 1;
        } else {
          index = util.indexOf(highlightedItem, children);
          destIndex = (index - 1 + len) % len;
        }
        nextHighlighted = self._getNextEnabledHighlighted(destIndex, -1);
        break;
      case KeyCode.DOWN:
        if (!highlightedItem) {
          destIndex = 0;
        } else {
          index = util.indexOf(highlightedItem, children);
          destIndex = (index + 1 + len) % len;
        }
        nextHighlighted = self._getNextEnabledHighlighted(destIndex, 1);
        break;
      }
      if (nextHighlighted) {
        nextHighlighted.set('highlighted', true, { data: { fromKeyboard: 1 } });
        return true;
      } else {
        return undefined;
      }
    },
    containsElement: function (element) {
      var self = this;
      var $el = self.$el;
      if (!self.get('visible') || !$el) {
        return false;
      }
      if ($el && ($el[0] === element || $el.contains(element))) {
        return true;
      }
      var children = self.get('children');
      for (var i = 0, count = children.length; i < count; i++) {
        var child = children[i];
        if (child.containsElement && child.containsElement(element)) {
          return true;
        }
      }
      return false;
    }
  }, {
    ATTRS: {
      handleGestureEvents: { value: true },
      focusable: { value: true },
      allowTextSelection: { value: false },
      highlightedItem: { value: null },
      defaultChildCfg: {
        valueFn: function () {
          return { xclass: 'menuitem' };
        }
      }
    },
    xclass: 'menu'
  });
  function afterHighlightedItemChange(e) {
    if (e.target.isMenu) {
      var el = this.el, menuItem = e.newVal;
      el.setAttribute('aria-activedescendant', menuItem && menuItem.el.id || '');
    }
  }
  return exports;
}();
menuMenuitem = function (exports) {
  var Control = componentControl;
  var $ = node;
  exports = Control.extend({
    isMenuItem: 1,
    beforeCreateDom: function (renderData) {
      renderData.elAttrs.role = 'menuitem';
    },
    handleClickInternal: function (ev) {
      var self = this;
      self.callSuper(ev);
      ev.preventDefault();
      self.fire('click');
      return true;
    },
    _onSetHighlighted: function (v, e) {
      var self = this, parent = self.get('parent');
      self.callSuper(v, e);
      if (!(e && e.byPassSetHighlightedItem)) {
        if (self.get('rendered')) {
          parent.set('highlightedItem', v ? self : null);
        } else {
          if (v) {
            parent.set('highlightedItem', self);
          }
        }
      }
      if (v) {
        var el = self.$el, p = el.parent(function (e) {
            return $(e).css('overflow') !== 'visible';
          }, parent.get('el').parent());
        if (!p) {
          return;
        }
        el.scrollIntoView(p, {
          alignWithTop: true,
          allowHorizontalScroll: true,
          onlyScrollIfNeeded: true
        });
      }
    },
    containsElement: function (element) {
      var $el = this.$el;
      return $el && ($el[0] === element || $el.contains(element));
    }
  }, {
    ATTRS: {
      handleGestureEvents: { value: false },
      focusable: { value: false },
      allowTextSelection: { value: false }
    },
    xclass: 'menuitem'
  });
  return exports;
}();
menuXtplCheckMenuitem = function (exports) {
  var ret = exports = function checkMenuitem(undefined) {
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
      params: ['checkbox']
    }, buffer, ['getBaseCssClasses']);
    buffer = buffer.writeEscaped(callRet0);
    buffer.data += '">\r\n</div>\r\n<div class="';
    pos.line = 3;
    var callRet1;
    callRet1 = callFnUtil(tpl, scope, {
      escape: 1,
      params: ['content']
    }, buffer, ['getBaseCssClasses']);
    buffer = buffer.writeEscaped(callRet1);
    buffer.data += '">';
    var id2 = (t = affix.content) !== undefined ? t : (t = data.content) !== undefined ? t : scope.resolveLooseUp(['content']);
    buffer = buffer.write(id2);
    buffer.data += '</div>';
    return buffer;
  };
  ret.TPL_NAME = module.id || module.name;
  return exports;
}();
menuXtplRadioMenuitem = function (exports) {
  var ret = exports = function radioMenuitem(undefined) {
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
      params: ['radio']
    }, buffer, ['getBaseCssClasses']);
    buffer = buffer.writeEscaped(callRet0);
    buffer.data += '">\r\n</div>\r\n<div class="';
    pos.line = 3;
    var callRet1;
    callRet1 = callFnUtil(tpl, scope, {
      escape: 1,
      params: ['content']
    }, buffer, ['getBaseCssClasses']);
    buffer = buffer.writeEscaped(callRet1);
    buffer.data += '">';
    var id2 = (t = affix.content) !== undefined ? t : (t = data.content) !== undefined ? t : scope.resolveLooseUp(['content']);
    buffer = buffer.write(id2);
    buffer.data += '</div>';
    return buffer;
  };
  ret.TPL_NAME = module.id || module.name;
  return exports;
}();
menuXtplSubmenu = function (exports) {
  var ret = exports = function submenu(undefined) {
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
    buffer.data += '</div>\r\n<span class="';
    pos.line = 2;
    var id2 = (t = affix.prefixCls) !== undefined ? t : (t = data.prefixCls) !== undefined ? t : scope.resolveLooseUp(['prefixCls']);
    buffer = buffer.writeEscaped(id2);
    buffer.data += 'submenu-arrow">\u25BA</span>';
    return buffer;
  };
  ret.TPL_NAME = module.id || module.name;
  return exports;
}();
menuPopupmenu = function (exports) {
  var AlignExtension = componentExtensionAlign;
  var Shim = componentExtensionShim;
  var Menu = menuControl;
  var ContentBox = componentExtensionContentBox;
  exports = Menu.extend([
    ContentBox,
    Shim,
    AlignExtension
  ], {
    getRootMenu: function () {
      var self = this, cur = self, last;
      do {
        last = cur;
        cur = cur.get('parent');
      } while (cur && (cur.isMenuItem || cur.isMenu));
      return last;
    },
    handleMouseLeaveInternal: function (e) {
      var self = this;
      self.callSuper(e);
      if (self.get('autoHideOnMouseLeave')) {
        var rootMenu = self.getRootMenu();
        if (rootMenu !== this) {
          clearTimeout(rootMenu._popupAutoHideTimer);
          rootMenu._popupAutoHideTimer = setTimeout(function () {
            var item;
            if (item = rootMenu.get('highlightedItem')) {
              item.set('highlighted', false);
            }
          }, self.get('parent').get('menuDelay') * 1000);
        }
      }
    },
    isPopupMenu: 1,
    handleBlurInternal: function (e) {
      var self = this;
      self.callSuper(e);
      self.hide();
    }
  }, {
    ATTRS: {
      handleGestureEvents: { value: true },
      focusable: { value: false },
      allowTextSelection: { value: false },
      autoHideOnMouseLeave: {},
      visible: { value: false }
    },
    xclass: 'popupmenu'
  });
  return exports;
}();
menuXtplCheckMenuitemRender = function (exports) {
  var tpl = menuXtplCheckMenuitem;
  var XTemplateRuntime = xtemplateRuntime;
  var instance = new XTemplateRuntime(tpl);
  exports = function () {
    return instance.render.apply(instance, arguments);
  };
  return exports;
}();
menuXtplRadioMenuitemRender = function (exports) {
  var tpl = menuXtplRadioMenuitem;
  var XTemplateRuntime = xtemplateRuntime;
  var instance = new XTemplateRuntime(tpl);
  exports = function () {
    return instance.render.apply(instance, arguments);
  };
  return exports;
}();
menuXtplSubmenuRender = function (exports) {
  var tpl = menuXtplSubmenu;
  var XTemplateRuntime = xtemplateRuntime;
  var instance = new XTemplateRuntime(tpl);
  exports = function () {
    return instance.render.apply(instance, arguments);
  };
  return exports;
}();
menuCheckMenuitem = function (exports) {
  var MenuItem = menuMenuitem;
  var ContentBox = componentExtensionContentBox;
  var CheckMenuItemTpl = menuXtplCheckMenuitemRender;
  exports = MenuItem.extend([ContentBox], {
    beforeCreateDom: function (renderData) {
      if (renderData.checked) {
        renderData.elCls.push(this.getBaseCssClasses('checked'));
      }
    },
    _onSetChecked: function (v) {
      var self = this, cls = self.getBaseCssClasses('checked');
      self.$el[v ? 'addClass' : 'removeClass'](cls);
    },
    handleClickInternal: function (e) {
      var self = this;
      self.set('checked', !self.get('checked'));
      self.callSuper(e);
      return true;
    }
  }, {
    ATTRS: {
      contentTpl: { value: CheckMenuItemTpl },
      checked: {
        render: 1,
        sync: 0
      }
    },
    xclass: 'check-menuitem'
  });
  return exports;
}();
menuRadioMenuitem = function (exports) {
  var MenuItem = menuMenuitem;
  var ContentBox = componentExtensionContentBox;
  var RadioMenuItemTpl = menuXtplRadioMenuitemRender;
  exports = MenuItem.extend([ContentBox], {
    beforeCreateDom: function (renderData) {
      renderData.elAttrs.role = 'menuitemradio';
      if (renderData.selected) {
        renderData.elCls.push(this.getBaseCssClasses('selected'));
      }
    },
    _onSetSelected: function (v) {
      var self = this, cls = self.getBaseCssClasses('selected');
      self.$el[v ? 'addClass' : 'removeClass'](cls);
    },
    handleClickInternal: function (e) {
      var self = this;
      var rootMenu = self.get('parent').getRootMenu();
      var selectedItem = rootMenu.__selectedItem;
      if (selectedItem && selectedItem !== self) {
        selectedItem.set('selected', false);
      }
      rootMenu.__selectedItem = self;
      self.set('selected', true);
      self.callSuper(e);
      return true;
    },
    destructor: function () {
      var parent = this.get('parent');
      var rootMenu = parent && parent.getRootMenu();
      if (rootMenu && rootMenu.__selectedItem === this) {
        rootMenu.__selectedItem = null;
      }
    }
  }, {
    ATTRS: {
      contentTpl: { value: RadioMenuItemTpl },
      selected: {
        sync: 0,
        render: 1
      }
    },
    xclass: 'radio-menuitem'
  });
  return exports;
}();
menuSubmenu = function (exports) {
  var util = _util_;
  var SubMenuTpl = menuXtplSubmenuRender;
  var MenuItem = menuMenuitem;
  var ContentBox = componentExtensionContentBox;
  var KeyCode = node.Event.KeyCode;
  var MENU_DELAY = 0.15;
  function afterHighlightedChange(e) {
    var target = e.target, self = this;
    if (target !== self && target.isMenuItem && e.newVal) {
      self.clearHidePopupMenuTimers();
      if (!self.get('highlighted')) {
        self.set('highlighted', true);
        target.set('highlighted', false);
        target.set('highlighted', true);
      }
    }
  }
  exports = MenuItem.extend([ContentBox], {
    isSubMenu: 1,
    decorateDom: function (el) {
      var self = this;
      var prefixCls = self.get('prefixCls');
      var popupMenuEl = el.one('.' + prefixCls + 'popupmenu');
      var docBody = popupMenuEl[0].ownerDocument.body;
      docBody.insertBefore(popupMenuEl[0], docBody.firstChild);
      var PopupMenuClass = self.getComponentConstructorByNode(prefixCls, popupMenuEl);
      self.setInternal('menu', new PopupMenuClass({
        srcNode: popupMenuEl,
        prefixCls: prefixCls
      }));
    },
    bindUI: function () {
      var self = this;
      self.on('afterHighlightedChange', afterHighlightedChange, self);
    },
    clearShowPopupMenuTimers: function () {
      var showTimer;
      if (showTimer = this._showTimer) {
        showTimer.cancel();
        this._showTimer = null;
      }
    },
    clearHidePopupMenuTimers: function () {
      var dismissTimer;
      if (dismissTimer = this._dismissTimer) {
        dismissTimer.cancel();
        this._dismissTimer = null;
      }
    },
    clearSubMenuTimers: function () {
      this.clearHidePopupMenuTimers();
      this.clearShowPopupMenuTimers();
    },
    handleMouseLeaveInternal: function () {
      var self = this;
      self.set('highlighted', false, { data: { fromMouse: 1 } });
      self.clearSubMenuTimers();
      var menu = self.get('menu');
      if (menu.get('visible')) {
        self._dismissTimer = util.later(hideMenu, self.get('menuDelay') * 1000, false, self);
      }
    },
    handleMouseEnterInternal: function () {
      var self = this;
      self.set('highlighted', true, { data: { fromMouse: 1 } });
      self.clearSubMenuTimers();
      var menu = self.get('menu');
      if (!menu.get('visible')) {
        self._showTimer = util.later(showMenu, self.get('menuDelay') * 1000, false, self);
      }
    },
    _onSetHighlighted: function (v, e) {
      var self = this;
      self.callSuper(v, e);
      if (!e) {
        return;
      }
      if (e.fromMouse) {
        return;
      }
      if (v && !e.fromKeyboard) {
        showMenu.call(self);
      } else if (!v) {
        hideMenu.call(self);
      }
    },
    handleClickInternal: function (e) {
      showMenu.call(this);
      this.callSuper(e);
    },
    handleKeyDownInternal: function (e) {
      var self = this, menu = self.get('menu'), menuChildren, menuChild, hasKeyboardControl_ = menu.get('visible'), keyCode = e.keyCode;
      if (!hasKeyboardControl_) {
        if (keyCode === KeyCode.RIGHT) {
          showMenu.call(self);
          menuChildren = menu.get('children');
          if (menuChild = menuChildren[0]) {
            menuChild.set('highlighted', true, { data: { fromKeyboard: 1 } });
          }
        } else if (keyCode === KeyCode.ENTER) {
          return self.handleClickInternal(e);
        } else {
          return undefined;
        }
      } else if (!menu.handleKeyDownInternal(e)) {
        if (keyCode === KeyCode.LEFT) {
          self.set('highlighted', false);
          self.set('highlighted', true, { data: { fromKeyboard: 1 } });
        } else {
          return undefined;
        }
      }
      return true;
    },
    containsElement: function (element) {
      return this.get('menu').containsElement(element);
    },
    destructor: function () {
      var self = this, menu = self.get('menu');
      self.clearSubMenuTimers();
      menu.destroy();
    }
  }, {
    ATTRS: {
      contentTpl: { value: SubMenuTpl },
      menuDelay: { value: MENU_DELAY },
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
      }
    },
    xclass: 'submenu'
  });
  function showMenu() {
    var self = this, menu = self.get('menu');
    var align = {
      node: this.$el,
      points: [
        'tr',
        'tl'
      ],
      overflow: {
        adjustX: 1,
        adjustY: 1
      }
    };
    util.mix(menu.get('align'), align, false);
    menu.show();
    self.el.setAttribute('aria-haspopup', menu.get('el').attr('id'));
  }
  function hideMenu() {
    this.get('menu').hide();
  }
  return exports;
}();
_menu_ = function (exports) {
  var Menu = menuControl;
  Menu.Item = menuMenuitem;
  Menu.CheckItem = menuCheckMenuitem;
  Menu.RadioItem = menuRadioMenuitem;
  Menu.SubMenu = menuSubmenu;
  Menu.PopupMenu = menuPopupmenu;
  exports = Menu;
  Menu.version = '1.0.1';
  return exports;
}();
module.exports = _menu_;
});