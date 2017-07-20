/*
Copyright 2014, modulex-component@1.0.3
MIT Licensed
build time: Thu, 16 Oct 2014 07:30:48 GMT
*/
modulex.add("component/control", ["xtemplate/runtime","util","node","event-dom/gesture/basic","event-dom/gesture/tap","base","ua","feature"], function(require, exports, module) {
var xtemplateRuntime = require("xtemplate/runtime");
var _util_ = require("util");
var _node_ = require("node");
var eventDomGestureBasic = require("event-dom/gesture/basic");
var eventDomGestureTap = require("event-dom/gesture/tap");
var base = require("base");
var ua = require("ua");
var feature = require("feature");
/*
combined modules:
component/control
component/control/manager
component/control/xtpl/view-render
component/control/xtpl/view
*/
var componentControlManager, componentControlXtplView, componentControlXtplViewRender, componentControl;
componentControlManager = function (exports) {
  /**
   * @ignore
   * storage for component
   * @author yiminghe@gmail.com
   */
  var basePriority = 0, Manager,
    // 不带前缀 prefixCls
    /*
     'menu' :{
     constructor:Menu
     }
     */
    uis = {}, componentInstances = {};
  /**
   * @class KISSY.Component.Manager
   * @member Component
   * @singleton
   * Manage component metadata.
   */
  exports = Manager = {
    __instances: componentInstances,
    addComponent: function (component) {
      componentInstances[component.get('id')] = component;
    },
    removeComponent: function (component) {
      delete componentInstances[component.get('id')];
    },
    getComponent: function (id) {
      return componentInstances[id];
    },
    createComponent: function (component, parent) {
      var ChildConstructor, xclass;
      if (component) {
        if (!component.isControl && parent) {
          if (!component.prefixCls) {
            component.prefixCls = parent.get('prefixCls');
          }
          if (!component.xclass && component.prefixXClass) {
            component.xclass = component.prefixXClass;
            if (component.xtype) {
              component.xclass += '-' + component.xtype;
            }
          }
        }
        if (!component.isControl && (xclass = component.xclass)) {
          ChildConstructor = Manager.getConstructorByXClass(xclass);
          if (!ChildConstructor) {
            throw new Error('can not find class by xclass desc : ' + xclass);
          }
          component = new ChildConstructor(component);
        }
        if (component.isControl && parent) {
          component.setInternal('parent', parent);
        }
      }
      return component;
    },
    getConstructorByXClass: function (classNames) {
      var cs = classNames.split(/\s+/), p = -1, t, i, uic, ui = null;
      for (i = 0; i < cs.length; i++) {
        uic = uis[cs[i]];
        if (uic && (t = uic.priority) > p) {
          p = t;
          ui = uic.constructor;
        }
      }
      return ui;
    },
    setConstructorByXClass: function (className, ComponentConstructor) {
      uis[className] = {
        constructor: ComponentConstructor,
        priority: basePriority++
      };
    }
  };
  return exports;
}();
componentControlXtplView = function (exports) {
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
    function func2(scope, buffer, undefined) {
      var data = scope.data;
      var affix = scope.affix;
      buffer.data += '\r\n ';
      pos.line = 4;
      var id3 = data;
      buffer = buffer.writeEscaped(id3);
      buffer.data += '\r\n';
      return buffer;
    }
    function func5(scope, buffer, undefined) {
      var data = scope.data;
      var affix = scope.affix;
      buffer.data += '\r\n ';
      pos.line = 9;
      var id6 = (t = affix.xindex) !== undefined ? t : (t = data.xindex) !== undefined ? t : scope.resolveLooseUp(['xindex']);
      buffer = buffer.writeEscaped(id6);
      buffer.data += '="';
      var id7 = data;
      buffer = buffer.writeEscaped(id7);
      buffer.data += '"\r\n';
      return buffer;
    }
    function func9(scope, buffer, undefined) {
      var data = scope.data;
      var affix = scope.affix;
      buffer.data += '\r\n ';
      pos.line = 14;
      var id10 = (t = affix.xindex) !== undefined ? t : (t = data.xindex) !== undefined ? t : scope.resolveLooseUp(['xindex']);
      buffer = buffer.writeEscaped(id10);
      buffer.data += ':';
      var id11 = data;
      buffer = buffer.writeEscaped(id11);
      buffer.data += ';\r\n';
      return buffer;
    }
    buffer.data += '<div id="';
    var id0 = (t = affix.id) !== undefined ? t : (t = data.id) !== undefined ? t : scope.resolveLooseUp(['id']);
    buffer = buffer.writeEscaped(id0);
    buffer.data += '"\r\n class="';
    pos.line = 2;
    var callRet1;
    callRet1 = callFnUtil(tpl, scope, { escape: 1 }, buffer, ['getBaseCssClasses']);
    buffer = buffer.writeEscaped(callRet1);
    buffer.data += '\r\n';
    pos.line = 3;
    pos.line = 3;
    var id4 = (t = affix.elCls) !== undefined ? t : (t = data.elCls) !== undefined ? t : scope.resolveLooseUp(['elCls']);
    buffer = eachCommand.call(tpl, scope, {
      params: [id4],
      fn: func2
    }, buffer);
    buffer.data += '\r\n"\r\n\r\n';
    pos.line = 8;
    pos.line = 8;
    var id8 = (t = affix.elAttrs) !== undefined ? t : (t = data.elAttrs) !== undefined ? t : scope.resolveLooseUp(['elAttrs']);
    buffer = eachCommand.call(tpl, scope, {
      params: [id8],
      fn: func5
    }, buffer);
    buffer.data += '\r\n\r\nstyle="\r\n';
    pos.line = 13;
    pos.line = 13;
    var id12 = (t = affix.elStyle) !== undefined ? t : (t = data.elStyle) !== undefined ? t : scope.resolveLooseUp(['elStyle']);
    buffer = eachCommand.call(tpl, scope, {
      params: [id12],
      fn: func9
    }, buffer);
    buffer.data += '\r\n">';
    return buffer;
  };
  module.exports.TPL_NAME = module.id || module.name;
  return exports;
}();
componentControlXtplViewRender = function (exports) {
  var tpl = componentControlXtplView;
  var XTemplateRuntime = xtemplateRuntime;
  var instance = new XTemplateRuntime(tpl);
  exports = function () {
    return instance.render.apply(instance, arguments);
  };
  return exports;
}();
componentControl = function (exports) {
  var util = _util_;
  var $ = _node_;
  var BasicGesture = eventDomGestureBasic;
  var TapGesture = eventDomGestureTap;
  var Manager = componentControlManager;
  var Base = base;
  var startTpl = componentControlXtplViewRender;
  var UA = ua;
  var Feature = feature;
  var __getHook = Base.prototype.__getHook;
  var endTpl = '</div>';
  var isTouchGestureSupported = Feature.isTouchGestureSupported();
  var noop = util.noop;
  var trim = util.trim;
  var doc = document;
  function normalExtras(extras) {
    if (!extras) {
      extras = [''];
    }
    if (typeof extras === 'string') {
      extras = extras.split(/\s+/);
    }
    return extras;
  }
  function prefixExtra(prefixCls, componentCls, extras) {
    var cls = '', i = 0, l = extras.length, e, prefix = prefixCls + componentCls;
    for (; i < l; i++) {
      e = extras[i];
      e = e ? '-' + e : e;
      cls += ' ' + prefix + e;
    }
    return cls;
  }
  function pxSetter(v) {
    if (typeof v === 'number') {
      v += 'px';
    }
    return v;
  }
  function applyParser(srcNode) {
    var self = this, attr, attrName, ret;
    var attrs = self.getAttrs();
    for (attrName in attrs) {
      attr = attrs[attrName];
      if (attr.parse) {
        ret = attr.parse.call(self, srcNode);
        if (ret !== undefined) {
          self.setInternal(attrName, ret);
        }
      }
    }
  }
  function findComponentCss(css, prefixCls) {
    var csses = css.split(/\s+/);
    var newCss = [];
    for (var i = 0, l = csses.length; i < l; i++) {
      var c = util.trim(csses[i]);
      if (c && util.startsWith(c, prefixCls)) {
        newCss.push(c.substring(prefixCls.length));
      }
    }
    return newCss.join(' ');
  }
  var Control = exports = Base.extend({
    isControl: true,
    bindInternal: noop,
    syncInternal: noop,
    initializer: function () {
      var self = this;
      var attrName, attr;
      var attrs = self.getAttrs();
      self.renderData = {};
      self.childrenElSelectors = {};
      self.renderCommands = {
        getBaseCssClasses: function (_, options) {
          return self.getBaseCssClasses(options && options.params && options.params[0]);
        },
        getBaseCssClass: function getBaseCssClassCmd() {
          return self.getBaseCssClass(arguments[1].params[0]);
        }
      };
      for (attrName in attrs) {
        attr = attrs[attrName];
        if (attr.selector) {
          self.childrenElSelectors[attrName] = attr.selector;
        }
      }
    },
    beforeCreateDom: function (renderData) {
      var self = this, width, height, visible, elAttrs = self.get('elAttrs'), disabled, attrs = self.getAttrs(), attrName, attr, elStyle = self.get('elStyle'), zIndex, elCls = self.get('elCls');
      for (attrName in attrs) {
        attr = attrs[attrName];
        if (attr.render) {
          renderData[attrName] = self.get(attrName);
        }
      }
      width = renderData.width;
      height = renderData.height;
      visible = renderData.visible;
      zIndex = renderData.zIndex;
      if (width) {
        elStyle.width = pxSetter(width);
      }
      if (height) {
        elStyle.height = pxSetter(height);
      }
      if (zIndex) {
        elStyle['z-index'] = zIndex;
      }
      if (!visible) {
        elCls.push(self.getBaseCssClasses('hidden'));
      }
      if (disabled = self.get('disabled')) {
        elCls.push(self.getBaseCssClasses('disabled'));
        elAttrs['aria-disabled'] = 'true';
      }
      if (self.get('highlighted')) {
        elCls.push(self.getBaseCssClasses('hover'));
      }
    },
    createDom: function () {
      var self = this;
      var html = self.renderTpl(startTpl) + self.renderTpl(self.get('contentTpl')) + endTpl;
      self.$el = $(html);
      self.el = self.$el[0];
      self.fillChildrenElsBySelectors();
    },
    decorateDom: function (srcNode) {
      var self = this;
      self.$el = srcNode;
      self.el = srcNode[0];
      self.fillChildrenElsBySelectors();
      applyParser.call(self, srcNode);
    },
    renderUI: function () {
      var self = this;
      Manager.addComponent(self);
      var $el = self.$el;
      if (!self.get('allowTextSelection')) {
        $el.unselectable();
      }
      if (!self.get('srcNode')) {
        var render = self.get('render'), renderBefore = self.get('elBefore');
        if (renderBefore) {
          $el.insertBefore(renderBefore, undefined);
        } else if (render) {
          $el.appendTo(render, undefined);
        } else {
          $el.appendTo(doc.body, undefined);
        }
      }
    },
    bindUI: function () {
      var self = this;
      if (self.get('focusable')) {
        var keyEventTarget = self.getKeyEventTarget();
        keyEventTarget.on('focus', self.handleFocus, self).on('blur', self.handleBlur, self).on('keydown', self.handleKeydown, self);
        if (UA.ieMode < 9) {
          keyEventTarget.attr('hideFocus', true);
        }
        keyEventTarget.attr('tabindex', self.get('disabled') ? '-1' : '0');
      }
      if (self.get('handleGestureEvents')) {
        self.$el.on('mouseenter', self.handleMouseEnter, self).on('mouseleave', self.handleMouseLeave, self).on('contextmenu', self.handleContextMenu, self).on(BasicGesture.START, self.handleMouseDown, self).on(BasicGesture.END, self.handleMouseUp, self).on(TapGesture.TAP, self.handleClick, self);
      }
    },
    syncUI: noop,
    create: function () {
      var self = this;
      if (!self.get('created')) {
        self.fire('beforeCreateDom');
        var srcNode = self.get('srcNode');
        if (srcNode) {
          self.decorateDom(srcNode);
        }
        self.beforeCreateDom(self.renderData, self.renderCommands, self.childrenElSelectors);
        if (!srcNode) {
          self.createDom();
        }
        self.__callPluginsMethod('pluginCreateDom');
        self.fire('afterCreateDom');
        self.setInternal('created', true);
      }
      return self;
    },
    render: function () {
      var self = this;
      if (!self.get('rendered')) {
        self.create();
        self.fire('beforeRenderUI');
        self.renderUI();
        self.__callPluginsMethod('pluginRenderUI');
        self.fire('afterRenderUI');
        self.fire('beforeBindUI');
        Control.superclass.bindInternal.call(self);
        self.bindUI();
        self.__callPluginsMethod('pluginBindUI');
        self.fire('afterBindUI');
        self.fire('beforeSyncUI');
        Control.superclass.syncInternal.call(self);
        self.syncUI();
        self.__callPluginsMethod('pluginSyncUI');
        self.fire('afterSyncUI');
        self.setInternal('rendered', true);
      }
      return self;
    },
    plug: function (plugin) {
      var self = this, p, plugins = self.get('plugins');
      self.callSuper(plugin);
      p = plugins[plugins.length - 1];
      if (self.get('rendered')) {
        if (p.pluginCreateDom) {
          p.pluginCreateDom(self);
        }
        if (p.pluginRenderUI) {
          p.pluginCreateDom(self);
        }
        if (p.pluginBindUI) {
          p.pluginBindUI(self);
        }
        if (p.pluginSyncUI) {
          p.pluginSyncUI(self);
        }
      } else if (self.get('created')) {
        if (p.pluginCreateDom) {
          p.pluginCreateDom(self);
        }
      }
      return self;
    },
    getKeyEventTarget: function () {
      return this.$el;
    },
    handleMouseEnter: function (ev) {
      if (!this.get('disabled')) {
        this.handleMouseEnterInternal(ev);
      }
    },
    handleMouseEnterInternal: function (ev) {
      this.set('highlighted', !!ev);
    },
    handleMouseLeave: function (ev) {
      if (!this.get('disabled')) {
        this.handleMouseLeaveInternal(ev);
      }
    },
    handleMouseLeaveInternal: function (ev) {
      var self = this;
      self.set('active', false);
      self.set('highlighted', !ev);
    },
    handleMouseDown: function (ev) {
      if (!this.get('disabled')) {
        this.handleMouseDownInternal(ev);
      }
    },
    handleMouseDownInternal: function (ev) {
      var self = this, n, isMouseActionButton = ev.which === 1;
      if (isMouseActionButton || isTouchGestureSupported) {
        if (self.get('activeable')) {
          self.set('active', true);
        }
        if (self.get('focusable')) {
          self.focus();
        }
        if (!self.get('allowTextSelection') && ev.gestureType === 'mouse') {
          n = ev.target.nodeName;
          n = n && n.toLowerCase();
          if (n !== 'input' && n !== 'textarea' && n !== 'button') {
            ev.preventDefault();
          }
        }
      }
    },
    handleMouseUp: function (ev) {
      if (!this.get('disabled')) {
        this.handleMouseUpInternal(ev);
      }
    },
    handleMouseUpInternal: function (ev) {
      var self = this;
      if (self.get('active') && (ev.which === 1 || isTouchGestureSupported)) {
        self.set('active', false);
      }
    },
    handleContextMenu: function (ev) {
      if (!this.get('disabled')) {
        this.handleContextMenuInternal(ev);
      }
    },
    handleContextMenuInternal: function () {
    },
    handleFocus: function () {
      if (!this.get('disabled')) {
        this.handleFocusInternal();
      }
    },
    handleFocusInternal: function () {
      this.focus();
      this.fire('focus');
    },
    handleBlur: function () {
      if (!this.get('disabled')) {
        this.handleBlurInternal();
      }
    },
    handleBlurInternal: function () {
      this.blur();
      this.fire('blur');
    },
    handleKeydown: function (ev) {
      var self = this;
      if (!this.get('disabled') && self.handleKeyDownInternal(ev)) {
        ev.halt();
        return true;
      }
      return undefined;
    },
    handleKeyDownInternal: function (ev) {
      if (ev.keyCode === $.Event.KeyCode.ENTER) {
        return this.handleClickInternal(ev);
      }
      return undefined;
    },
    handleClick: function (ev) {
      if (!this.get('disabled')) {
        this.handleClickInternal(ev);
      }
    },
    handleClickInternal: function () {
      var self = this;
      if (self.get('focusable')) {
        self.focus();
      }
    },
    $: function (selector) {
      return this.$el.all(selector);
    },
    $one: function (selector) {
      return this.$el.one(selector);
    },
    fillChildrenElsBySelectors: function (childrenElSelectors) {
      var self = this, el = self.$el, childName, selector;
      childrenElSelectors = childrenElSelectors || self.childrenElSelectors;
      for (childName in childrenElSelectors) {
        selector = childrenElSelectors[childName];
        var node = selector.call(self, el);
        if (typeof node === 'string') {
          node = self.$one(node);
        }
        self.setInternal(childName, node);
      }
    },
    renderTpl: function (tpl, renderData, renderCommands) {
      var self = this;
      renderData = renderData || self.renderData;
      renderCommands = renderCommands || self.renderCommands;
      return tpl(renderData, { commands: renderCommands });
    },
    getComponentConstructorByNode: function (prefixCls, childNode) {
      var cls = childNode[0].className;
      if (cls) {
        cls = findComponentCss(cls, prefixCls);
        return Manager.getConstructorByXClass(cls);
      }
      return null;
    },
    getComponentCssClasses: function () {
      var self = this;
      if (self.componentCssClasses) {
        return self.componentCssClasses;
      }
      var constructor = self.constructor, xclass, re = [];
      while (constructor && !constructor.prototype.hasOwnProperty('isControl')) {
        xclass = constructor.xclass;
        if (xclass) {
          re.push(xclass);
        }
        constructor = constructor.superclass && constructor.superclass.constructor;
      }
      self.componentCssClasses = re;
      return re;
    },
    getBaseCssClasses: function (extras) {
      extras = normalExtras(extras);
      var componentCssClasses = this.getComponentCssClasses(), i = 0, cls = '', l = componentCssClasses.length, prefixCls = this.get('prefixCls');
      for (; i < l; i++) {
        cls += prefixExtra(prefixCls, componentCssClasses[i], extras);
      }
      return trim(cls);
    },
    getBaseCssClass: function (extras) {
      return trim(prefixExtra(this.get('prefixCls'), this.getComponentCssClasses()[0], normalExtras(extras)));
    },
    createComponent: function (cfg, parent) {
      return Manager.createComponent(cfg, parent || this);
    },
    show: function () {
      var self = this;
      self.render();
      self.set('visible', true);
      return self;
    },
    hide: function () {
      var self = this;
      self.set('visible', false);
      return self;
    },
    focus: function () {
      if (this.get('focusable')) {
        this.set('focused', true);
      }
    },
    blur: function () {
      if (this.get('focusable')) {
        this.set('focused', false);
      }
    },
    move: function (x, y) {
      this.set({
        x: x,
        y: y
      });
    },
    _onSetWidth: function (w) {
      this.$el.width(w);
    },
    _onSetHeight: function (h) {
      this.$el.height(h);
    },
    _onSetContent: function (c) {
      var el = this.$el;
      el.html(c);
      if (!this.get('allowTextSelection')) {
        el.unselectable();
      }
    },
    _onSetVisible: function (visible) {
      var self = this, el = self.$el, hiddenCls = self.getBaseCssClasses('hidden');
      if (visible) {
        el.removeClass(hiddenCls);
      } else {
        el.addClass(hiddenCls);
      }
      this.fire(visible ? 'show' : 'hide');
    },
    _onSetHighlighted: function (v) {
      var self = this, componentCls = self.getBaseCssClasses('hover'), el = self.$el;
      el[v ? 'addClass' : 'removeClass'](componentCls);
    },
    _onSetDisabled: function (v) {
      var self = this, componentCls = self.getBaseCssClasses('disabled'), el = self.$el;
      el[v ? 'addClass' : 'removeClass'](componentCls).attr('aria-disabled', v);
      if (self.get('focusable')) {
        self.getKeyEventTarget().attr('tabindex', v ? -1 : 0);
      }
    },
    _onSetActive: function (v) {
      var self = this, componentCls = self.getBaseCssClasses('active');
      self.$el[v ? 'addClass' : 'removeClass'](componentCls).attr('aria-pressed', !!v);
    },
    _onSetZIndex: function (v) {
      this.$el.css('z-index', v);
    },
    _onSetFocused: function (v) {
      var target = this.getKeyEventTarget()[0];
      if (v) {
        try {
          target.focus();
        } catch (e) {
        }
      } else {
        if (target.ownerDocument.activeElement === target) {
          target.ownerDocument.body.focus();
        }
      }
      var self = this, el = self.$el, componentCls = self.getBaseCssClasses('focused');
      el[v ? 'addClass' : 'removeClass'](componentCls);
    },
    _onSetX: function (x) {
      this.$el.offset({ left: x });
    },
    _onSetY: function (y) {
      this.$el.offset({ top: y });
    },
    destructor: function (destroy) {
      var self = this;
      Manager.removeComponent(self);
      if (destroy !== false && self.$el) {
        self.$el.remove();
      }
    }
  }, {
    __hooks__: {
      beforeCreateDom: __getHook('__beforeCreateDom'),
      createDom: __getHook('__createDom'),
      decorateDom: __getHook('__decorateDom'),
      renderUI: __getHook('__renderUI'),
      bindUI: __getHook('__bindUI'),
      syncUI: __getHook('__syncUI')
    },
    name: 'control',
    ATTRS: {
      contentTpl: {
        value: function (data) {
          return data.content;
        }
      },
      content: {
        parse: function (el) {
          return el.html();
        },
        render: 1,
        sync: 0,
        value: ''
      },
      width: {
        render: 1,
        sync: 0
      },
      height: {
        render: 1,
        sync: 0
      },
      elCls: {
        render: 1,
        valueFn: function () {
          return [];
        },
        setter: function (v) {
          if (typeof v === 'string') {
            v = v.split(/\s+/);
          }
          return v || [];
        }
      },
      elStyle: {
        render: 1,
        valueFn: function () {
          return {};
        }
      },
      elAttrs: {
        render: 1,
        valueFn: function () {
          return {};
        }
      },
      x: {},
      y: {},
      xy: {
        setter: function (v) {
          var self = this, xy = util.makeArray(v);
          if (xy.length) {
            if (xy[0] !== undefined) {
              self.set('x', xy[0]);
            }
            if (xy[1] !== undefined) {
              self.set('y', xy[1]);
            }
          }
          return v;
        },
        getter: function () {
          return [
            this.get('x'),
            this.get('y')
          ];
        }
      },
      zIndex: {
        render: 1,
        sync: 0
      },
      visible: {
        render: 1,
        sync: 0,
        value: true
      },
      activeable: { value: true },
      focused: {},
      active: { value: false },
      highlighted: {
        render: 1,
        sync: 0,
        value: false
      },
      disabled: {
        render: 1,
        sync: 0,
        value: false,
        parse: function (el) {
          return el.hasClass(this.getBaseCssClass('disabled'));
        }
      },
      rendered: { value: false },
      created: { value: false },
      render: {},
      id: {
        render: 1,
        parse: function (el) {
          var id = el.attr('id');
          if (!id) {
            id = util.guid('ks-component');
            el.attr('id', id);
          }
          return id;
        },
        valueFn: function () {
          return util.guid('ks-component');
        }
      },
      elBefore: {},
      el: {
        getter: function () {
          return this.$el;
        }
      },
      srcNode: {
        setter: function (v) {
          return $(v);
        }
      },
      handleGestureEvents: { value: false },
      focusable: { value: false },
      allowTextSelection: { value: true },
      prefixCls: {
        render: 1,
        value: 'ks-'
      },
      prefixXClass: {},
      parent: {
        setter: function (p, prev) {
          if (prev = this.get('parent')) {
            this.removeTarget(prev);
          }
          if (p) {
            this.addTarget(p);
          }
        }
      }
    }
  });
  Control.extend = function extend(extensions, px, sx) {
    var args = util.makeArray(arguments), self = this, xclass, argsLen = args.length, last = args[argsLen - 1];
    if (last && (xclass = last.xclass)) {
      last.name = xclass;
    }
    var NewClass = Base.extend.apply(self, arguments);
    NewClass.extend = extend;
    if (xclass) {
      Manager.setConstructorByXClass(xclass, NewClass);
    }
    return NewClass;
  };
  Control.Manager = Manager;
  return exports;
}();
module.exports = componentControl;
});