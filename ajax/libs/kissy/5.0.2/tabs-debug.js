/*
Copyright 2014, modulex-tabs@1.0.1
MIT Licensed
build time: Thu, 16 Oct 2014 08:05:03 GMT
*/
modulex.add("tabs", ["toolbar","util","component/container","xtemplate/runtime","button","component/extension/content-box"], function(require, exports, module) {
var toolbar = require("toolbar");
var _util_ = require("util");
var componentContainer = require("component/container");
var xtemplateRuntime = require("xtemplate/runtime");
var button = require("button");
var componentExtensionContentBox = require("component/extension/content-box");
/*
combined modules:
tabs
tabs/bar
tabs/body
tabs/tab
tabs/xtpl/tab-render
tabs/xtpl/tab
tabs/panel
*/
var tabsBar, tabsBody, tabsXtplTab, tabsPanel, tabsXtplTabRender, tabsTab, tabs;
tabsBar = function (exports) {
  /**
   * @ignore
   * TabBar for KISSY.
   * @author yiminghe@gmail.com
   */
  var Toolbar = toolbar;
  var util = _util_;
  /**
   * tab bar container for tab tabs.xclass: 'tabs-bar'.
   * @class  KISSY.Tabs.Bar
   * @extends KISSY.Toolbar
   */
  var TabBar = Toolbar.extend({
    beforeCreateDom: function (renderData) {
      renderData.elAttrs.role = 'tablist';
    },
    bindUI: function () {
      var self = this;
      self.on('afterSelectedChange', function (e) {
        if (e.newVal && e.target.isTabsTab) {
          self.set('selectedTab', e.target);
        }
      });
    },
    syncUI: function () {
      var self = this, children = self.get('children');
      util.each(children, function (c) {
        if (c.get('selected')) {
          self.setInternal('selectedTab', c);
          return false;
        }
        return undefined;
      });
    },
    handleKeyDownInternal: function (e) {
      var self = this;
      var current = self.get('selectedTab');
      var next = self.getNextItemByKeyDown(e, current);
      if (typeof next === 'boolean') {
        return next;
      } else {
        next.set('selected', true);
        return true;
      }
    },
    _onSetSelectedTab: function (v, e) {
      var prev;
      if (v) {
        if (e && (prev = e.prevVal)) {
          prev.set('selected', false);
        }
        v.set('selected', true);
      }
    },
    _onSetHighlightedItem: function (v, e) {
      var self = this;
      self.callSuper(v, e);
      if (self.get('changeType') === 'mouse') {
        self._onSetSelectedTab.apply(self, arguments);
      }
    }
  }, {
    ATTRS: {
      selectedTab: {},
      changeType: { value: 'click' },
      defaultChildCfg: {
        valueFn: function () {
          return { xclass: 'tabs-tab' };
        }
      }
    },
    xclass: 'tabs-bar'
  });
  /**
   * tabs change type
   * @enum {String}  KISSY.Tabs.ChangeType
   */
  TabBar.ChangeType = {
    /**
     * click
     */
    CLICK: 'click',
    /**
     * mouse
     */
    MOUSE: 'mouse'
  };
  exports = TabBar;
  return exports;
}();
tabsBody = function (exports) {
  /**
   * @ignore
   * Body for tab panels.
   * @author yiminghe@gmail.com
   */
  var Container = componentContainer;
  var util = _util_;
  /**
   * tab body container for tab panels.xclass: 'tabs-body'.
   * @class  KISSY.Tabs.Body
   * @extends KISSY.Component.Container
   */
  var TabBody = Container.extend({
    bindUI: function () {
      var self = this;
      self.on('afterSelectedPanelIndexChange', function (e) {
        var children = self.get('children'), newIndex = e.newVal, hidePanel;
        if (children[newIndex]) {
          if (hidePanel = children[e.prevVal]) {
            hidePanel.set('selected', false);
          }
          self.selectPanelByIndex(newIndex);
        }
      });
    },
    syncUI: function () {
      var self = this, children = self.get('children');
      util.each(children, function (c, i) {
        if (c.get('selected')) {
          self.set('selectedPanelIndex', i);
          return false;
        }
        return undefined;
      });
    },
    createChild: function (index) {
      return checkLazy(this, 'createChild', index);
    },
    renderChild: function (index) {
      return checkLazy(this, 'renderChild', index);
    },
    selectPanelByIndex: function (newIndex) {
      this.get('children')[newIndex].set('selected', true);
      if (this.get('lazyRender')) {
        // lazy render
        this.renderChild(newIndex);
      }
    }
  }, {
    ATTRS: {
      allowTextSelection: { value: true },
      focusable: { value: false },
      handleGestureEvents: { value: false },
      selectedPanelIndex: {},
      lazyRender: {},
      defaultChildCfg: {
        valueFn: function () {
          return { xclass: 'tabs-panel' };
        }
      }
    },
    xclass: 'tabs-body'
  });
  function checkLazy(self, method, index) {
    if (self.get('lazyRender')) {
      var c = self.get('children')[index];
      if (!c.get('selected')) {
        return c;
      }
    }
    return TabBody.superclass[method].call(self, index);
  }
  exports = TabBody;
  return exports;
}();
tabsXtplTab = function (exports) {
  /*compiled by xtemplate#3.3.1*/
  var ret = exports = function tab(undefined) {
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
    function func2(scope, buffer, undefined) {
      var data = scope.data;
      var affix = scope.affix;
      buffer.data += '\r\n<span class="';
      pos.line = 3;
      var callRet3;
      callRet3 = callFnUtil(tpl, scope, {
        escape: 1,
        params: ['close']
      }, buffer, ['getBaseCssClasses']);
      buffer = buffer.writeEscaped(callRet3);
      buffer.data += '">close</span>\r\n';
      return buffer;
    }
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
    buffer.data += '</div>\r\n';
    pos.line = 2;
    pos.line = 2;
    var id4 = (t = affix.closable) !== undefined ? t : (t = data.closable) !== undefined ? t : scope.resolveLooseUp(['closable']);
    buffer = ifCommand.call(tpl, scope, {
      params: [id4],
      fn: func2
    }, buffer);
    return buffer;
  };
  ret.TPL_NAME = module.id || module.name;
  return exports;
}();
tabsPanel = function (exports) {
  /**
   * @ignore
   * single tab panel.
   * @author yiminghe@gmail.com
   */
  var Container = componentContainer;
  /**
   * KISSY.Tabs.Panel.xclass: 'tabs-panel'.
   * @class  KISSY.Tabs.Panel
   * @extends KISSY.Component.Container
   */
  exports = Container.extend({
    isTabsPanel: 1,
    beforeCreateDom: function (renderData) {
      var self = this;
      renderData.elAttrs.role = 'tabpanel';
      if (renderData.selected) {
        renderData.elCls.push(self.getBaseCssClasses('selected'));
      } else {
        renderData.elAttrs['aria-hidden'] = false;
      }
    },
    _onSetSelected: function (v) {
      var el = this.$el;
      var selectedCls = this.getBaseCssClasses('selected');
      el[v ? 'addClass' : 'removeClass'](selectedCls).attr('aria-hidden', !v);
    }
  }, {
    ATTRS: {
      allowTextSelection: { value: true },
      focusable: { value: false },
      handleGestureEvents: { value: false },
      selected: {
        render: 1,
        sync: 0,
        parse: function (el) {
          return el.hasClass(this.getBaseCssClass('selected'));
        }
      }
    },
    xclass: 'tabs-panel'
  });
  return exports;
}();
tabsXtplTabRender = function (exports) {
  var tpl = tabsXtplTab;
  var XTemplateRuntime = xtemplateRuntime;
  var instance = new XTemplateRuntime(tpl);
  exports = function () {
    return instance.render.apply(instance, arguments);
  };
  return exports;
}();
tabsTab = function (exports) {
  var Button = button;
  var TabTpl = tabsXtplTabRender;
  var ContentBox = componentExtensionContentBox;
  function close() {
    this.fire('afterTabClose');
  }
  exports = Button.extend([ContentBox], {
    initializer: function () {
      this.publish('beforeTabClose', {
        defaultFn: close,
        defaultTargetOnly: true
      });
    },
    isTabsTab: true,
    beforeCreateDom: function (renderData) {
      var attrs = renderData.elAttrs;
      attrs.role = 'tab';
      if (renderData.selected) {
        attrs['aria-selected'] = true;
        renderData.elCls.push(this.getBaseCssClasses('selected'));
      }
      if (renderData.closable) {
        renderData.elCls.push(this.getBaseCssClasses('closable'));
      }
    },
    handleClickInternal: function (e) {
      var self = this;
      if (self.get('closable')) {
        if (e.target === self.get('closeBtn')[0]) {
          self.fire('beforeTabClose');
          return;
        }
      }
      self.callSuper(e);
      self.set('selected', true);
    },
    _onSetSelected: function (v) {
      var el = this.$el;
      var selectedCls = this.getBaseCssClasses('selected');
      el[v ? 'addClass' : 'removeClass'](selectedCls).attr('aria-selected', !!v);
    }
  }, {
    ATTRS: {
      allowTextSelection: { value: false },
      focusable: { value: false },
      handleGestureEvents: { value: false },
      contentTpl: { value: TabTpl },
      closable: {
        value: false,
        render: 1,
        sync: 0,
        parse: function () {
          return !!this.get('closeBtn');
        }
      },
      closeBtn: {
        selector: function () {
          return '.' + this.getBaseCssClass('close');
        }
      },
      selected: {
        render: 1,
        sync: 0,
        parse: function (el) {
          return el.hasClass(this.getBaseCssClass('selected'));
        }
      }
    },
    xclass: 'tabs-tab'
  });
  return exports;
}();
tabs = function (exports) {
  var Container = componentContainer;
  var Bar = tabsBar;
  var Body = tabsBody;
  var Panel = tabsPanel;
  var CLS = 'top bottom left right';
  var util = _util_;
  var BarIndexMap = {
    top: 0,
    left: 0,
    bottom: 1,
    right: 0
  };
  function setBar(children, barOrientation, bar) {
    children[BarIndexMap[barOrientation]] = bar;
  }
  function setBody(children, barOrientation, body) {
    children[1 - BarIndexMap[barOrientation]] = body;
  }
  function afterTabClose(e) {
    this.removeItemByTab(e.target);
  }
  function afterSelectedTabChange(e) {
    this.setSelectedTab(e.newVal);
  }
  function fromTabItemConfigToTabConfig(item) {
    var ret = {};
    ret.content = item.title;
    ret.selected = item.selected;
    ret.closable = item.closable;
    return ret;
  }
  var Tabs = Container.extend({
    initializer: function () {
      var self = this, items = self.get('items');
      if (items) {
        var children = self.get('children'), barOrientation = self.get('barOrientation'), selected, prefixCls = self.get('prefixCls'), tabItem, panelItem, bar = {
            prefixCls: prefixCls,
            xclass: 'tabs-bar',
            changeType: self.get('changeType'),
            children: []
          }, body = {
            prefixCls: prefixCls,
            xclass: 'tabs-body',
            lazyRender: self.get('lazyRender'),
            children: []
          }, barChildren = bar.children, panels = body.children;
        util.each(items, function (item) {
          selected = selected || item.selected;
          barChildren.push(tabItem = fromTabItemConfigToTabConfig(item));
          panels.push(panelItem = {
            content: item.content,
            selected: item.selected
          });
        });
        if (!selected && barChildren.length) {
          barChildren[0].selected = true;
          panels[0].selected = true;
        }
        setBar(children, barOrientation, bar);
        setBody(children, barOrientation, body);
      }
    },
    beforeCreateDom: function (renderData) {
      renderData.elCls.push(this.getBaseCssClass(this.get('barOrientation')));
    },
    decorateDom: function () {
      this.get('bar').set('changeType', this.get('changeType'));
    },
    bindUI: function () {
      this.on('afterSelectedTabChange', afterSelectedTabChange);
      this.on('afterTabClose', afterTabClose);
    },
    addItem: function (item, index) {
      var self = this, bar = self.get('bar'), selectedTab, tabItem, panelItem, barChildren = bar.get('children'), body = self.get('body');
      if (typeof index === 'undefined') {
        index = barChildren.length;
      }
      tabItem = fromTabItemConfigToTabConfig(item);
      panelItem = { content: item.content };
      bar.addChild(tabItem, index);
      selectedTab = barChildren[index];
      body.addChild(panelItem, index);
      if (item.selected) {
        bar.set('selectedTab', selectedTab);
        body.set('selectedPanelIndex', index);
      }
      return self;
    },
    removeItemAt: function (index, destroy) {
      var self = this, bar = self.get('bar'), barCs = bar.get('children'), tab = bar.getChildAt(index), body = self.get('body');
      if (tab.get('selected')) {
        if (barCs.length === 1) {
          bar.set('selectedTab', null);
        } else if (index === 0) {
          bar.set('selectedTab', bar.getChildAt(index + 1));
        } else {
          bar.set('selectedTab', bar.getChildAt(index - 1));
        }
      }
      bar.removeChild(bar.getChildAt(index), destroy);
      body.removeChild(body.getChildAt(index), destroy);
      return self;
    },
    removeItemByTab: function (tab, destroy) {
      var index = util.indexOf(tab, this.get('bar').get('children'));
      return this.removeItemAt(index, destroy);
    },
    removeItemByPanel: function (panel, destroy) {
      var index = util.indexOf(panel, this.get('body').get('children'));
      return this.removeItemAt(index, destroy);
    },
    getSelectedTab: function () {
      var self = this, bar = self.get('bar'), child = null;
      util.each(bar.get('children'), function (c) {
        if (c.get('selected')) {
          child = c;
          return false;
        }
        return undefined;
      });
      return child;
    },
    getSelectedPanel: function () {
      var self = this, body = self.get('body'), child = null;
      util.each(body.get('children'), function (c) {
        if (c.get('selected')) {
          child = c;
          return false;
        }
        return undefined;
      });
      return child;
    },
    getTabs: function () {
      return this.get('bar').get('children');
    },
    getPanels: function () {
      return this.get('body').get('children');
    },
    getTabAt: function (index) {
      return this.get('bar').get('children')[index];
    },
    getPanelAt: function (index) {
      return this.get('body').get('children')[index];
    },
    setSelectedTab: function (tab) {
      var self = this, bar = self.get('bar'), body = self.get('body');
      bar.set('selectedTab', tab);
      body.set('selectedPanelIndex', util.indexOf(tab, bar.get('children')));
      return this;
    },
    setSelectedPanel: function (panel) {
      var self = this, bar = self.get('bar'), body = self.get('body'), selectedPanelIndex = util.indexOf(panel, body.get('children'));
      body.set('selectedPanelIndex', selectedPanelIndex);
      bar.set('selectedTab', self.getTabAt(selectedPanelIndex));
      return this;
    },
    _onSetBarOrientation: function (v) {
      var self = this, el = self.$el;
      el.removeClass(self.getBaseCssClass(CLS)).addClass(self.getBaseCssClass(v));
    }
  }, {
    version: '1.0.1',
    ATTRS: {
      handleGestureEvents: { value: false },
      allowTextSelection: { value: true },
      focusable: { value: false },
      items: {},
      changeType: {},
      lazyRender: { value: false },
      bar: {
        getter: function () {
          return this.get('children')[BarIndexMap[this.get('barOrientation')]];
        }
      },
      body: {
        getter: function () {
          return this.get('children')[1 - BarIndexMap[this.get('barOrientation')]];
        }
      },
      barOrientation: {
        render: 1,
        sync: 0,
        value: 'top',
        parse: function (el) {
          var orientation = el[0].className.match(/(top|bottom|left|right)\b/);
          return orientation && orientation[1] || undefined;
        }
      }
    },
    xclass: 'tabs'
  });
  Tabs.Orientation = {
    TOP: 'top',
    BOTTOM: 'bottom',
    LEFT: 'left',
    RIGHT: 'right'
  };
  Tabs.ChangeType = Bar.ChangeType;
  Tabs.Bar = Bar;
  Tabs.Body = Body;
  Tabs.Panel = Panel;
  exports = Tabs;
  return exports;
}();
module.exports = tabs;
});