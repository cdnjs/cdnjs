/*
Copyright 2014, modulex-scroll-view@1.0.1
MIT Licensed
build time: Thu, 16 Oct 2014 08:08:10 GMT
*/
modulex.add("scroll-view/plugin/scrollbar", ["xtemplate/runtime","ua","util","component/control","event-dom/gesture/basic","event-dom/gesture/pan","feature","base"], function(require, exports, module) {
var xtemplateRuntime = require("xtemplate/runtime");
var ua = require("ua");
var _util_ = require("util");
var componentControl = require("component/control");
var eventDomGestureBasic = require("event-dom/gesture/basic");
var eventDomGesturePan = require("event-dom/gesture/pan");
var feature = require("feature");
var base = require("base");
/*
combined modules:
scroll-view/plugin/scrollbar
scroll-view/plugin/scrollbar/control
scroll-view/plugin/scrollbar/xtpl/tpl-render
scroll-view/plugin/scrollbar/xtpl/tpl
*/
var scrollViewPluginScrollbarXtplTpl, scrollViewPluginScrollbarXtplTplRender, scrollViewPluginScrollbarControl, scrollViewPluginScrollbar;
scrollViewPluginScrollbarXtplTpl = function (exports) {
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
    var id0 = (t = affix.axis) !== undefined ? t : (t = data.axis) !== undefined ? t : scope.resolveLooseUp(['axis']);
    var exp1 = id0;
    exp1 = id0 + '-arrow-up arrow-up';
    var callRet2;
    callRet2 = callFnUtil(tpl, scope, {
      escape: 1,
      params: [exp1]
    }, buffer, ['getBaseCssClasses']);
    buffer = buffer.writeEscaped(callRet2);
    buffer.data += '">\r\n    <a href="javascript:void(\'up\')">up</a>\r\n</div>\r\n<div class="';
    pos.line = 4;
    var id3 = (t = affix.axis) !== undefined ? t : (t = data.axis) !== undefined ? t : scope.resolveLooseUp(['axis']);
    var exp4 = id3;
    exp4 = id3 + '-arrow-down arrow-down';
    var callRet5;
    callRet5 = callFnUtil(tpl, scope, {
      escape: 1,
      params: [exp4]
    }, buffer, ['getBaseCssClasses']);
    buffer = buffer.writeEscaped(callRet5);
    buffer.data += '">\r\n    <a href="javascript:void(\'down\')">down</a>\r\n</div>\r\n<div class="';
    pos.line = 7;
    var id6 = (t = affix.axis) !== undefined ? t : (t = data.axis) !== undefined ? t : scope.resolveLooseUp(['axis']);
    var exp7 = id6;
    exp7 = id6 + '-track track';
    var callRet8;
    callRet8 = callFnUtil(tpl, scope, {
      escape: 1,
      params: [exp7]
    }, buffer, ['getBaseCssClasses']);
    buffer = buffer.writeEscaped(callRet8);
    buffer.data += '">\r\n<div class="';
    pos.line = 8;
    var id9 = (t = affix.axis) !== undefined ? t : (t = data.axis) !== undefined ? t : scope.resolveLooseUp(['axis']);
    var exp10 = id9;
    exp10 = id9 + '-drag drag';
    var callRet11;
    callRet11 = callFnUtil(tpl, scope, {
      escape: 1,
      params: [exp10]
    }, buffer, ['getBaseCssClasses']);
    buffer = buffer.writeEscaped(callRet11);
    buffer.data += '">\r\n<div class="';
    pos.line = 9;
    var id12 = (t = affix.axis) !== undefined ? t : (t = data.axis) !== undefined ? t : scope.resolveLooseUp(['axis']);
    var exp13 = id12;
    exp13 = id12 + '-drag-top';
    var callRet14;
    callRet14 = callFnUtil(tpl, scope, {
      escape: 1,
      params: [exp13]
    }, buffer, ['getBaseCssClasses']);
    buffer = buffer.writeEscaped(callRet14);
    buffer.data += '">\r\n</div>\r\n<div class="';
    pos.line = 11;
    var id15 = (t = affix.axis) !== undefined ? t : (t = data.axis) !== undefined ? t : scope.resolveLooseUp(['axis']);
    var exp16 = id15;
    exp16 = id15 + '-drag-center';
    var callRet17;
    callRet17 = callFnUtil(tpl, scope, {
      escape: 1,
      params: [exp16]
    }, buffer, ['getBaseCssClasses']);
    buffer = buffer.writeEscaped(callRet17);
    buffer.data += '">\r\n</div>\r\n<div class="';
    pos.line = 13;
    var id18 = (t = affix.axis) !== undefined ? t : (t = data.axis) !== undefined ? t : scope.resolveLooseUp(['axis']);
    var exp19 = id18;
    exp19 = id18 + '-drag-bottom';
    var callRet20;
    callRet20 = callFnUtil(tpl, scope, {
      escape: 1,
      params: [exp19]
    }, buffer, ['getBaseCssClasses']);
    buffer = buffer.writeEscaped(callRet20);
    buffer.data += '">\r\n</div>\r\n</div>\r\n</div>';
    return buffer;
  };
  ret.TPL_NAME = module.id || module.name;
  return exports;
}();
scrollViewPluginScrollbarXtplTplRender = function (exports) {
  var tpl = scrollViewPluginScrollbarXtplTpl;
  var XTemplateRuntime = xtemplateRuntime;
  var instance = new XTemplateRuntime(tpl);
  exports = function () {
    return instance.render.apply(instance, arguments);
  };
  return exports;
}();
scrollViewPluginScrollbarControl = function (exports) {
  var UA = ua;
  var util = _util_;
  var Control = componentControl;
  var BasicGesture = eventDomGestureBasic;
  var PanGesture = eventDomGesturePan;
  var ScrollBarTpl = scrollViewPluginScrollbarXtplTplRender;
  var MIN_BAR_LENGTH = 20;
  var SCROLLBAR_EVENT_NS = '.ks-scrollbar';
  function preventDefault(e) {
    e.preventDefault();
  }
  function onDragStartHandler(e) {
    e.halt();
    var self = this;
    self.startScroll = self.scrollView.get(self.scrollProperty);
  }
  function onDragHandler(e) {
    var self = this, diff = self.pageXyProperty === 'pageX' ? e.deltaX : e.deltaY, scrollView = self.scrollView, scrollType = self.scrollType, scrollCfg = {};
    scrollCfg[scrollType] = self.startScroll + diff / self.trackElSize * self.scrollLength;
    scrollView.scrollToWithBounds(scrollCfg);
    e.halt();
  }
  function onScrollViewReflow() {
    var self = this, scrollView = self.scrollView, trackEl = self.trackEl, scrollWHProperty = self.scrollWHProperty, whProperty = self.whProperty, clientWHProperty = self.clientWHProperty, dragWHProperty = self.dragWHProperty, ratio, trackElSize, barSize;
    if (scrollView.allowScroll[self.scrollType]) {
      self.scrollLength = scrollView[scrollWHProperty];
      trackElSize = self.trackElSize = whProperty === 'width' ? trackEl.offsetWidth : trackEl.offsetHeight;
      ratio = scrollView[clientWHProperty] / self.scrollLength;
      barSize = ratio * trackElSize;
      self.set(dragWHProperty, barSize);
      self.barSize = barSize;
      syncOnScroll(self);
      self.set('visible', true);
    } else {
      self.set('visible', false);
    }
  }
  function onScrollViewDisabled(e) {
    this.set('disabled', e.newVal);
  }
  function onScrollEnd() {
    var self = this;
    if (self.hideFn) {
      startHideTimer(self);
    }
  }
  function afterScrollChange() {
    var self = this;
    var scrollView = self.scrollView;
    if (!scrollView.allowScroll[self.scrollType]) {
      return;
    }
    clearHideTimer(self);
    self.set('visible', true);
    if (self.hideFn && !scrollView.isScrolling) {
      startHideTimer(self);
    }
    syncOnScroll(self);
  }
  function onUpDownBtnMouseDown(e) {
    e.halt();
    var self = this, scrollView = self.scrollView, scrollProperty = self.scrollProperty, scrollType = self.scrollType, step = scrollView.getScrollStep()[self.scrollType], target = e.target, direction = target === self.downBtn || self.$downBtn.contains(target) ? 1 : -1;
    clearInterval(self.mouseInterval);
    function doScroll() {
      var scrollCfg = {};
      scrollCfg[scrollType] = scrollView.get(scrollProperty) + direction * step;
      scrollView.scrollToWithBounds(scrollCfg);
    }
    self.mouseInterval = setInterval(doScroll, 100);
    doScroll();
  }
  function onTrackElMouseDown(e) {
    var self = this;
    var target = e.target;
    var dragEl = self.dragEl;
    var $dragEl = self.$dragEl;
    if (dragEl === target || $dragEl.contains(target)) {
      return;
    }
    var scrollType = self.scrollType, pageXy = self.pageXyProperty, trackEl = self.$trackEl, scrollView = self.scrollView, per = Math.max(0, (e[pageXy] - trackEl.offset()[scrollType] - self.barSize / 2) / self.trackElSize), scrollCfg = {};
    scrollCfg[scrollType] = per * self.scrollLength;
    scrollView.scrollToWithBounds(scrollCfg);
    e.halt();
  }
  function onUpDownBtnMouseUp() {
    clearInterval(this.mouseInterval);
  }
  function syncOnScroll(control) {
    var scrollType = control.scrollType, scrollView = control.scrollView, dragLTProperty = control.dragLTProperty, dragWHProperty = control.dragWHProperty, trackElSize = control.trackElSize, barSize = control.barSize, contentSize = control.scrollLength, val = scrollView.get(control.scrollProperty), maxScrollOffset = scrollView.maxScroll, minScrollOffset = scrollView.minScroll, minScroll = minScrollOffset[scrollType], maxScroll = maxScrollOffset[scrollType], dragVal;
    if (val > maxScroll) {
      dragVal = maxScroll / contentSize * trackElSize;
      control.set(dragWHProperty, barSize - (val - maxScroll));
      control.set(dragLTProperty, dragVal + barSize - control.get(dragWHProperty));
    } else if (val < minScroll) {
      dragVal = minScroll / contentSize * trackElSize;
      control.set(dragWHProperty, barSize - (minScroll - val));
      control.set(dragLTProperty, dragVal);
    } else {
      dragVal = val / contentSize * trackElSize;
      control.set(dragLTProperty, dragVal);
      control.set(dragWHProperty, barSize);
    }
  }
  function startHideTimer(self) {
    clearHideTimer(self);
    self.hideTimer = setTimeout(self.hideFn, self.get('hideDelay') * 1000);
  }
  function clearHideTimer(self) {
    if (self.hideTimer) {
      clearTimeout(self.hideTimer);
      self.hideTimer = null;
    }
  }
  function halt(e) {
    e.halt();
  }
  function bindDrag(self, disabled) {
    var action = disabled ? 'detach' : 'on';
    if (!self.get('autoHide')) {
      self.$dragEl[action]([
        'dragstart',
        'mousedown'
      ], preventDefault)[action](PanGesture.PAN_END, halt, self)[action](PanGesture.PAN_START, onDragStartHandler, self)[action](PanGesture.PAN, onDragHandler, self);
      util.each([
        self.$downBtn,
        self.$upBtn
      ], function (b) {
        b[action](BasicGesture.START, onUpDownBtnMouseDown, self)[action](BasicGesture.END, onUpDownBtnMouseUp, self);
      });
      self.$trackEl[action](BasicGesture.START, onTrackElMouseDown, self);
    }
  }
  var Feature = feature;
  var isTransform3dSupported = Feature.isTransform3dSupported();
  var transformVendorInfo = Feature.getCssVendorInfo('transform');
  var supportCss3 = !!transformVendorInfo;
  var methods = {
    initializer: function () {
      var self = this;
      var scrollType = self.scrollType = self.get('axis') === 'x' ? 'left' : 'top';
      var ucScrollType = util.ucfirst(scrollType);
      self.pageXyProperty = scrollType === 'left' ? 'pageX' : 'pageY';
      var wh = self.whProperty = scrollType === 'left' ? 'width' : 'height';
      var ucWH = util.ucfirst(wh);
      self.afterScrollChangeEvent = 'afterScroll' + ucScrollType + 'Change';
      self.scrollProperty = 'scroll' + ucScrollType;
      self.dragWHProperty = 'drag' + ucWH;
      self.dragLTProperty = 'drag' + ucScrollType;
      self.clientWHProperty = 'client' + ucWH;
      self.scrollWHProperty = 'scroll' + ucWH;
      self.scrollView = self.get('scrollView');
    },
    beforeCreateDom: function (renderData) {
      renderData.elCls.push(renderData.prefixCls + 'scrollbar-' + renderData.axis);
    },
    createDom: function () {
      var self = this;
      self.$dragEl = self.get('dragEl');
      self.$trackEl = self.get('trackEl');
      self.$downBtn = self.get('downBtn');
      self.$upBtn = self.get('upBtn');
      self.dragEl = self.$dragEl[0];
      self.trackEl = self.$trackEl[0];
      self.downBtn = self.$downBtn[0];
      self.upBtn = self.$upBtn[0];
    },
    bindUI: function () {
      var self = this, autoHide = self.get('autoHide'), scrollView = self.scrollView;
      if (autoHide) {
        self.hideFn = util.bind(self.hide, self);
      }
      scrollView.on(self.afterScrollChangeEvent + SCROLLBAR_EVENT_NS, afterScrollChange, self).on('scrollTouchEnd' + SCROLLBAR_EVENT_NS, onScrollEnd, self).on('afterDisabledChange' + SCROLLBAR_EVENT_NS, onScrollViewDisabled, self).on('reflow' + SCROLLBAR_EVENT_NS, onScrollViewReflow, self);
      bindDrag(self, self.get('disabled'));
    },
    syncUI: function () {
      onScrollViewReflow.call(this);
    },
    _onSetDragHeight: function (v) {
      this.dragEl.style.height = v + 'px';
    },
    _onSetDragWidth: function (v) {
      this.dragEl.style.width = v + 'px';
    },
    _onSetDragLeft: function (v) {
      this.dragEl.style.left = v + 'px';
    },
    _onSetDragTop: function (v) {
      this.dragEl.style.top = v + 'px';
    },
    _onSetDisabled: function (v) {
      this.callSuper(v);
      bindDrag(this, v);
    },
    destructor: function () {
      this.scrollView.detach(SCROLLBAR_EVENT_NS);
      clearHideTimer(this);
    }
  };
  if (supportCss3) {
    var transformProperty = transformVendorInfo.propertyName;
    methods._onSetDragLeft = function (v) {
      this.dragEl.style[transformProperty] = 'translateX(' + v + 'px)' + ' translateY(' + this.get('dragTop') + 'px)' + (isTransform3dSupported ? ' translateZ(0)' : '');
    };
    methods._onSetDragTop = function (v) {
      this.dragEl.style[transformProperty] = 'translateX(' + this.get('dragLeft') + 'px)' + ' translateY(' + v + 'px)' + (isTransform3dSupported ? ' translateZ(0)' : '');
    };
  }
  exports = Control.extend(methods, {
    ATTRS: {
      handleGestureEvents: { value: false },
      focusable: { value: false },
      allowTextSelection: { value: false },
      minLength: { value: MIN_BAR_LENGTH },
      scrollView: {},
      axis: { render: 1 },
      autoHide: { value: UA.ios },
      visible: {
        valueFn: function () {
          return !this.get('autoHide');
        }
      },
      hideDelay: { value: 0.1 },
      dragWidth: {
        setter: function (v) {
          var minLength = this.get('minLength');
          if (v < minLength) {
            return minLength;
          }
          return v;
        },
        render: 1
      },
      dragHeight: {
        setter: function (v) {
          var minLength = this.get('minLength');
          if (v < minLength) {
            return minLength;
          }
          return v;
        },
        render: 1
      },
      dragLeft: {
        render: 1,
        value: 0
      },
      dragTop: {
        render: 1,
        value: 0
      },
      dragEl: {
        selector: function () {
          return '.' + this.getBaseCssClass('drag');
        }
      },
      downBtn: {
        selector: function () {
          return '.' + this.getBaseCssClass('arrow-down');
        }
      },
      upBtn: {
        selector: function () {
          return '.' + this.getBaseCssClass('arrow-up');
        }
      },
      trackEl: {
        selector: function () {
          return '.' + this.getBaseCssClass('track');
        }
      },
      contentTpl: { value: ScrollBarTpl }
    },
    xclass: 'scrollbar'
  });
  return exports;
}();
scrollViewPluginScrollbar = function (exports) {
  var Base = base;
  var ScrollBar = scrollViewPluginScrollbarControl;
  function onScrollViewReflow() {
    var self = this;
    var scrollView = self.scrollView;
    var minLength = self.get('minLength');
    var autoHideX = self.get('autoHideX');
    var autoHideY = self.get('autoHideY');
    var cfg;
    if (!self.scrollBarX && scrollView.allowScroll.left) {
      cfg = {
        axis: 'x',
        scrollView: scrollView,
        elBefore: scrollView.$contentEl
      };
      if (minLength !== undefined) {
        cfg.minLength = minLength;
      }
      if (autoHideX !== undefined) {
        cfg.autoHide = autoHideX;
      }
      self.scrollBarX = new ScrollBar(cfg).render();
    }
    if (!self.scrollBarY && scrollView.allowScroll.top) {
      cfg = {
        axis: 'y',
        scrollView: scrollView,
        elBefore: scrollView.$contentEl
      };
      if (minLength !== undefined) {
        cfg.minLength = minLength;
      }
      if (autoHideY !== undefined) {
        cfg.autoHide = autoHideY;
      }
      self.scrollBarY = new ScrollBar(cfg).render();
    }
  }
  exports = Base.extend({
    pluginId: this.name,
    pluginBindUI: function (scrollView) {
      var self = this;
      self.scrollView = scrollView;
      scrollView.on('reflow', onScrollViewReflow, self);
    },
    pluginDestructor: function (scrollView) {
      var self = this;
      if (self.scrollBarX) {
        self.scrollBarX.destroy();
        self.scrollBarX = null;
      }
      if (self.scrollBarY) {
        self.scrollBarY.destroy();
        self.scrollBarY = null;
      }
      scrollView.detach('reflow', onScrollViewReflow, self);
    }
  }, {
    ATTRS: {
      minLength: {},
      autoHideX: {},
      autoHideY: {}
    }
  });
  return exports;
}();
module.exports = scrollViewPluginScrollbar;
});