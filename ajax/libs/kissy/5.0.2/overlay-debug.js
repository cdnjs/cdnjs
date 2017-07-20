/*
Copyright 2014, modulex-overlay@1.0.1
MIT Licensed
build time: Thu, 16 Oct 2014 07:52:58 GMT
*/
modulex.add("overlay", ["node","ua","event-dom/gesture/tap","util","xtemplate/runtime","component/container","component/extension/shim","component/extension/align","component/extension/content-box"], function(require, exports, module) {
var _node_ = require("node");
var ua = require("ua");
var eventDomGestureTap = require("event-dom/gesture/tap");
var _util_ = require("util");
var xtemplateRuntime = require("xtemplate/runtime");
var componentContainer = require("component/container");
var componentExtensionShim = require("component/extension/shim");
var componentExtensionAlign = require("component/extension/align");
var componentExtensionContentBox = require("component/extension/content-box");
/*
combined modules:
overlay
overlay/control
overlay/extension/loading
overlay/extension/mask
overlay/extension/overlay-effect
overlay/xtpl/overlay-render
overlay/xtpl/overlay
overlay/dialog
overlay/xtpl/dialog-render
overlay/xtpl/dialog
overlay/popup
*/
var overlayExtensionLoading, overlayExtensionMask, overlayExtensionOverlayEffect, overlayXtplOverlay, overlayXtplDialog, overlayXtplOverlayRender, overlayXtplDialogRender, overlayControl, overlayDialog, overlayPopup, overlay;
overlayExtensionLoading = function (exports) {
  /**
   * @ignore
   * loading mask support for overlay
   * @author yiminghe@gmail.com
   */
  var $ = _node_;
  /**
   * @class KISSY.Overlay.Extension.Loading
   * Loading extension class. Make component to be able to mask loading.
   */
  function Loading() {
  }
  Loading.prototype = {
    /**
     * mask component as loading
     * @chainable
     */
    loading: function () {
      var self = this;
      if (!self._loadingExtEl) {
        self._loadingExtEl = $('<div ' + 'class="' + self.get('prefixCls') + 'ext-loading"' + ' style="position: absolute;' + 'border: none;' + 'width: 100%;' + 'top: 0;' + 'left: 0;' + 'z-index: 99999;' + 'height:100%;' + '*height: expression(this.parentNode.offsetHeight);' + '"/>').appendTo(self.$el);
      }
      self._loadingExtEl.show();
    },
    /**
     * unmask component as loading
     * @chainable
     */
    unloading: function () {
      if (this._loadingExtEl) {
        this._loadingExtEl.hide();
      }
    }
  };
  exports = Loading;
  return exports;
}();
overlayExtensionMask = function (exports) {
  /**
   * @ignore
   * mask extension for kissy
   * @author yiminghe@gmail.com
   */
  var UA = ua, ie6 = UA.ie === 6, $ = _node_;
  var TapGesture = eventDomGestureTap;
  var tap = TapGesture.TAP;
  function docWidth() {
    return ie6 ? 'expression(KISSY.DOM.docWidth())' : '100%';
  }
  function docHeight() {
    return ie6 ? 'expression(KISSY.DOM.docHeight())' : '100%';
  }
  function initMask(self, hiddenCls) {
    var maskCls = self.getBaseCssClasses('mask'), mask = $('<div ' + ' style="width:' + docWidth() + ';' + 'left:0;' + 'top:0;' + 'height:' + docHeight() + ';' + 'position:' + (ie6 ? 'absolute' : 'fixed') + ';"' + ' class="' + maskCls + ' ' + hiddenCls + '">' + (ie6 ? '<' + 'iframe ' + 'style="position:absolute;' + 'left:' + '0' + ';' + 'top:' + '0' + ';' + 'background:red;' + 'width: expression(this.parentNode.offsetWidth);' + 'height: expression(this.parentNode.offsetHeight);' + 'filter:alpha(opacity=0);' + 'z-index:-1;"></iframe>' : '') + '</div>').prependTo('body');
    /*
     点 mask 焦点不转移
     */
    mask.unselectable();
    mask.on('mousedown', function (e) {
      e.preventDefault();
    });
    return mask;
  }
  /**
   * @class KISSY.Overlay.Extension.Mask
   * Mask extension class. Make component to be able to show with mask.
   */
  function Mask() {
  }
  Mask.ATTRS = {
    /**
     * Whether show mask layer when component shows and effect
     *
     * for example:
     *
     *      {
         *          // whether hide current component when click on mask
         *          closeOnClick: false,
         *          effect: 'fade', // slide
         *          duration: 0.5,
         *          easing: 'easingNone'
         *      }
     *
     * @cfg {Boolean|Object} mask
     */
    /**
     * @ignore
     */
    mask: { value: false },
    /**
     * Mask node of current component.
     * @type {KISSY.Node}
     * @property maskNode
     * @readonly
     */
    /**
     * @ignore
     */
    maskNode: {}
  };
  var NONE = 'none', effects = {
      fade: [
        'Out',
        'In'
      ],
      slide: [
        'Up',
        'Down'
      ]
    };
  function setMaskVisible(self, shown) {
    var maskNode = self.get('maskNode'), hiddenCls = self.getBaseCssClasses('mask-hidden');
    if (shown) {
      maskNode.removeClass(hiddenCls);
    } else {
      maskNode.addClass(hiddenCls);
    }
  }
  function processMask(mask, el, show, self) {
    var effect = mask.effect || NONE;
    setMaskVisible(self, show);
    if (effect === NONE) {
      return;
    }
    var duration = mask.duration, easing = mask.easing, m, index = show ? 1 : 0;
    // run complete fn to restore window's original height
    el.stop(1, 1);
    el.css('display', show ? NONE : 'block');
    m = effect + effects[effect][index];
    el[m](duration, function () {
      el.css('display', '');
    }, easing);
  }
  function afterVisibleChange(e) {
    var v, self = this, maskNode = self.get('maskNode');
    if (v = e.newVal) {
      var elZIndex = Number(self.$el.css('z-index'));
      if (!isNaN(elZIndex)) {
        maskNode.css('z-index', elZIndex);
      }
    }
    processMask(self.get('mask'), maskNode, v, self);
  }
  Mask.prototype = {
    __renderUI: function () {
      var self = this;
      if (self.get('mask')) {
        self.set('maskNode', initMask(self, self.get('visible') ? '' : self.getBaseCssClasses('mask-hidden')));
      }
    },
    __bindUI: function () {
      var self = this, maskNode, mask;
      if (mask = self.get('mask')) {
        maskNode = self.get('maskNode');
        if (mask.closeOnClick) {
          maskNode.on(tap, self.close, self);
        }
        self.on('afterVisibleChange', afterVisibleChange);
      }
    },
    __destructor: function () {
      var mask;
      if (mask = this.get('maskNode')) {
        mask.remove();
      }
    }
  };
  exports = Mask;
  return exports;
}();
overlayExtensionOverlayEffect = function (exports) {
  /**
   * @ignore
   * effect for overlay
   * @author yiminghe@gmail.com
   */
  var effects = {
    fade: [
      'Out',
      'In'
    ],
    slide: [
      'Up',
      'Down'
    ]
  };
  var util = _util_;
  function getGhost(self) {
    var el = self.$el, ghost = el.clone(true);
    ghost.css({
      visibility: 'hidden',
      overflow: 'hidden'
    }).addClass(self.get('prefixCls') + 'overlay-ghost');
    return self.__afterCreateEffectGhost(ghost);
  }
  function processTarget(self, show) {
    if (self.__effectGhost) {
      self.__effectGhost.stop(1, 1);
    }
    var el = self.$el, $ = _node_, effectCfg = self.get('effect'), target = $(effectCfg.target), duration = effectCfg.duration, targetBox = {
        width: target.width(),
        height: target.height()
      }, targetOffset = target.offset(), elBox = {
        width: el.width(),
        height: el.height()
      }, elOffset = el.offset(), from, to, fromOffset, toOffset, ghost = getGhost(self), easing = effectCfg.easing;
    ghost.insertAfter(el);
    if (show) {
      from = targetBox;
      fromOffset = targetOffset;
      to = elBox;
      toOffset = elOffset;
    } else {
      from = elBox;
      fromOffset = elOffset;
      to = targetBox;
      toOffset = targetOffset;
    }
    // get css left top value
    // in case overlay is inside a relative container
    ghost.offset(toOffset);
    util.mix(to, {
      left: ghost.css('left'),
      top: ghost.css('top')
    });
    el.css('visibility', 'hidden');
    ghost.css(from);
    ghost.offset(fromOffset);
    self.__effectGhost = ghost;
    ghost.css('visibility', 'visible');
    ghost.animate(to, {
      Anim: effectCfg.Anim,
      duration: duration,
      easing: easing,
      complete: function () {
        self.__effectGhost = null;
        ghost.remove();
        el.css('visibility', '');
      }
    });
  }
  function processEffect(self, show) {
    var el = self.$el, effectCfg = self.get('effect'), effect = effectCfg.effect || 'none', target = effectCfg.target;
    if (effect === 'none' && !target) {
      return;
    }
    if (target) {
      processTarget(self, show);
      return;
    }
    var duration = effectCfg.duration, easing = effectCfg.easing, index = show ? 1 : 0;
    // 队列中的也要移去
    // run complete fn to restore window's original height
    el.stop(1, 1);
    el.css({
      // must show, override box-render _onSetVisible
      visibility: 'visible',
      // fadeIn need display none, fadeOut need display block
      display: show ? 'none' : 'block'
    });
    var m = effect + effects[effect][index];
    el[m]({
      duration: duration,
      Anim: effectCfg.Anim,
      complete: function () {
        el.css({
          // need compute coordinates when show, so do not use display none for hide
          display: 'block',
          // restore to box-render _onSetVisible
          visibility: ''
        });
      },
      easing: easing
    });
  }
  function afterVisibleChange(e) {
    processEffect(this, e.newVal);
  }
  /**
   * effect extension for overlay
   * @class KISSY.Overlay.Extension.Effect
   */
  function OverlayEffect() {
  }
  OverlayEffect.ATTRS = {
    /**
     * Set v as overlay 's show effect
     *
     * - v.effect (String): Default:none.
     * can be set as 'fade' or 'slide'
     *
     * - v.target (String|KISS.Node):
     * The target node from which overlay should animate from while showing.
     *
     * - v.duration (Number): in seconds.
     * Default:0.5.
     *
     * - v.easing (String|Function):
     * for string see {@link KISSY.Anim.Easing} 's method name.
     *
     * @cfg {Object} effect
     * @member KISSY.Overlay
     */
    /**
     * @ignore
     */
    effect: {
      valueFn: function () {
        return {
          effect: '',
          target: null,
          duration: 0.5,
          easing: 'easeOut'
        };
      },
      setter: function (v) {
        var effect = v.effect;
        if (typeof effect === 'string' && !effects[effect]) {
          v.effect = '';
        }
      }
    }
  };
  OverlayEffect.prototype = {
    __afterCreateEffectGhost: function (ghost) {
      return ghost;
    },
    __bindUI: function () {
      this.on('afterVisibleChange', afterVisibleChange, this);
    }
  };
  exports = OverlayEffect;
  return exports;
}();
overlayXtplOverlay = function (exports) {
  /*compiled by xtemplate#3.3.1*/
  var ret = exports = function overlay(undefined) {
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
    function func1(scope, buffer, undefined) {
      var data = scope.data;
      var affix = scope.affix;
      buffer.data += '\r\n        <a href="javascript:void(\'close\')"\r\n           aria-label="Close"\r\n           class="';
      pos.line = 5;
      var callRet2;
      callRet2 = callFnUtil(tpl, scope, {
        escape: 1,
        params: ['close']
      }, buffer, ['getBaseCssClasses']);
      buffer = buffer.writeEscaped(callRet2);
      buffer.data += '"\r\n           role=\'button\'>\r\n            <span class="';
      pos.line = 7;
      var callRet3;
      callRet3 = callFnUtil(tpl, scope, {
        escape: 1,
        params: ['close-x']
      }, buffer, ['getBaseCssClasses']);
      buffer = buffer.writeEscaped(callRet3);
      buffer.data += '">';
      var id4 = (t = affix.closeText) !== undefined ? t : (t = data.closeText) !== undefined ? t : scope.resolveLooseUp(['closeText']);
      buffer = buffer.write(id4);
      buffer.data += '</span>\r\n        </a>\r\n    ';
      return buffer;
    }
    function func0(scope, buffer, undefined) {
      var data = scope.data;
      var affix = scope.affix;
      buffer.data += '\r\n    ';
      pos.line = 2;
      pos.line = 2;
      var id5 = (t = affix.closable) !== undefined ? t : (t = data.closable) !== undefined ? t : scope.resolveLooseUp(['closable']);
      buffer = ifCommand.call(tpl, scope, {
        params: [id5],
        fn: func1
      }, buffer);
      buffer.data += '\r\n';
      return buffer;
    }
    function func7(scope, buffer, undefined) {
      var data = scope.data;
      var affix = scope.affix;
      buffer.data += '\r\n        ';
      pos.line = 14;
      var id8 = (t = affix.content) !== undefined ? t : (t = data.content) !== undefined ? t : scope.resolveLooseUp(['content']);
      buffer = buffer.write(id8);
      buffer.data += '\r\n    ';
      return buffer;
    }
    buffer.data += '';
    pos.line = 1;
    buffer = blockCommand.call(tpl, scope, {
      params: ['ks-overlay-closable'],
      fn: func0
    }, buffer);
    buffer.data += '\r\n\r\n<div class="';
    pos.line = 12;
    var callRet6;
    callRet6 = callFnUtil(tpl, scope, {
      escape: 1,
      params: ['content']
    }, buffer, ['getBaseCssClasses']);
    buffer = buffer.writeEscaped(callRet6);
    buffer.data += '">\r\n    ';
    pos.line = 13;
    buffer = blockCommand.call(tpl, scope, {
      params: ['ks-overlay-content'],
      fn: func7
    }, buffer);
    buffer.data += '\r\n</div>';
    return buffer;
  };
  ret.TPL_NAME = module.id || module.name;
  return exports;
}();
overlayXtplDialog = function (exports) {
  /*compiled by xtemplate#3.3.1*/
  var ret = exports = function dialog(undefined) {
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
    function func3(scope, buffer, undefined) {
      var data = scope.data;
      var affix = scope.affix;
      buffer.data += '\r\n ';
      pos.line = 6;
      var id4 = (t = affix.xindex) !== undefined ? t : (t = data.xindex) !== undefined ? t : scope.resolveLooseUp(['xindex']);
      buffer = buffer.writeEscaped(id4);
      buffer.data += ':';
      var id5 = data;
      buffer = buffer.writeEscaped(id5);
      buffer.data += ';\r\n';
      return buffer;
    }
    function func9(scope, buffer, undefined) {
      var data = scope.data;
      var affix = scope.affix;
      buffer.data += '\r\n ';
      pos.line = 13;
      var id10 = (t = affix.xindex) !== undefined ? t : (t = data.xindex) !== undefined ? t : scope.resolveLooseUp(['xindex']);
      buffer = buffer.writeEscaped(id10);
      buffer.data += ':';
      var id11 = data;
      buffer = buffer.writeEscaped(id11);
      buffer.data += ';\r\n';
      return buffer;
    }
    function func15(scope, buffer, undefined) {
      var data = scope.data;
      var affix = scope.affix;
      buffer.data += '\r\n ';
      pos.line = 20;
      var id16 = (t = affix.xindex) !== undefined ? t : (t = data.xindex) !== undefined ? t : scope.resolveLooseUp(['xindex']);
      buffer = buffer.writeEscaped(id16);
      buffer.data += ':';
      var id17 = data;
      buffer = buffer.writeEscaped(id17);
      buffer.data += ';\r\n';
      return buffer;
    }
    function func1(scope, buffer, undefined) {
      var data = scope.data;
      var affix = scope.affix;
      buffer.data += '\r\n    <div class="';
      pos.line = 3;
      var callRet2;
      callRet2 = callFnUtil(tpl, scope, {
        escape: 1,
        params: ['header']
      }, buffer, ['getBaseCssClasses']);
      buffer = buffer.writeEscaped(callRet2);
      buffer.data += '"\r\n         style="\r\n';
      pos.line = 5;
      pos.line = 5;
      var id6 = (t = affix.headerStyle) !== undefined ? t : (t = data.headerStyle) !== undefined ? t : scope.resolveLooseUp(['headerStyle']);
      buffer = eachCommand.call(tpl, scope, {
        params: [id6],
        fn: func3
      }, buffer);
      buffer.data += '\r\n">';
      pos.line = 8;
      var id7 = (t = affix.headerContent) !== undefined ? t : (t = data.headerContent) !== undefined ? t : scope.resolveLooseUp(['headerContent']);
      buffer = buffer.write(id7);
      buffer.data += '</div>\r\n\r\n    <div class="';
      pos.line = 10;
      var callRet8;
      callRet8 = callFnUtil(tpl, scope, {
        escape: 1,
        params: ['body']
      }, buffer, ['getBaseCssClasses']);
      buffer = buffer.writeEscaped(callRet8);
      buffer.data += '"\r\n         style="\r\n';
      pos.line = 12;
      pos.line = 12;
      var id12 = (t = affix.bodyStyle) !== undefined ? t : (t = data.bodyStyle) !== undefined ? t : scope.resolveLooseUp(['bodyStyle']);
      buffer = eachCommand.call(tpl, scope, {
        params: [id12],
        fn: func9
      }, buffer);
      buffer.data += '\r\n">';
      pos.line = 15;
      var id13 = (t = affix.bodyContent) !== undefined ? t : (t = data.bodyContent) !== undefined ? t : scope.resolveLooseUp(['bodyContent']);
      buffer = buffer.write(id13);
      buffer.data += '</div>\r\n\r\n    <div class="';
      pos.line = 17;
      var callRet14;
      callRet14 = callFnUtil(tpl, scope, {
        escape: 1,
        params: ['footer']
      }, buffer, ['getBaseCssClasses']);
      buffer = buffer.writeEscaped(callRet14);
      buffer.data += '"\r\n         style="\r\n';
      pos.line = 19;
      pos.line = 19;
      var id18 = (t = affix.footerStyle) !== undefined ? t : (t = data.footerStyle) !== undefined ? t : scope.resolveLooseUp(['footerStyle']);
      buffer = eachCommand.call(tpl, scope, {
        params: [id18],
        fn: func15
      }, buffer);
      buffer.data += '\r\n">';
      pos.line = 22;
      var id19 = (t = affix.footerContent) !== undefined ? t : (t = data.footerContent) !== undefined ? t : scope.resolveLooseUp(['footerContent']);
      buffer = buffer.write(id19);
      buffer.data += '</div>\r\n    <div tabindex="0"></div>\r\n';
      return buffer;
    }
    buffer.data += '';
    var callRet0;
    runtime.extendTplName = './overlay';
    runtime.extendTplFn = overlayXtplOverlay;
    buffer = buffer.write(callRet0);
    buffer.data += '\r\n';
    pos.line = 2;
    buffer = blockCommand.call(tpl, scope, {
      params: ['ks-overlay-content'],
      fn: func1
    }, buffer);
    return buffer;
  };
  ret.TPL_NAME = module.id || module.name;
  return exports;
}();
overlayXtplOverlayRender = function (exports) {
  var tpl = overlayXtplOverlay;
  var XTemplateRuntime = xtemplateRuntime;
  var instance = new XTemplateRuntime(tpl);
  exports = function () {
    return instance.render.apply(instance, arguments);
  };
  return exports;
}();
overlayXtplDialogRender = function (exports) {
  var tpl = overlayXtplDialog;
  var XTemplateRuntime = xtemplateRuntime;
  var instance = new XTemplateRuntime(tpl);
  exports = function () {
    return instance.render.apply(instance, arguments);
  };
  return exports;
}();
overlayControl = function (exports) {
  var Container = componentContainer;
  var Shim = componentExtensionShim;
  var AlignExtension = componentExtensionAlign;
  var Loading = overlayExtensionLoading;
  var Mask = overlayExtensionMask;
  var OverlayEffect = overlayExtensionOverlayEffect;
  var ContentBox = componentExtensionContentBox;
  var OverlayTpl = overlayXtplOverlayRender;
  var HIDE = 'hide', actions = {
      hide: HIDE,
      destroy: 'destroy'
    };
  exports = Container.extend([
    ContentBox,
    Shim,
    Loading,
    AlignExtension,
    Mask,
    OverlayEffect
  ], {
    bindUI: function () {
      var self = this, closeBtn = self.get('closeBtn');
      if (closeBtn) {
        closeBtn.on('click', function (ev) {
          self.close();
          ev.preventDefault();
        });
      }
    },
    close: function () {
      var self = this;
      self[actions[self.get('closeAction')] || HIDE]();
      return self;
    }
  }, {
    ATTRS: {
      handleGestureEvents: { value: false },
      focusable: { value: false },
      allowTextSelection: { value: true },
      contentTpl: { value: OverlayTpl },
      closable: {
        value: false,
        sync: 0,
        render: 1,
        parse: function () {
          return !!this.get('closeBtn');
        }
      },
      closeBtn: {
        selector: function () {
          return '.' + this.getBaseCssClass('close');
        }
      },
      closeAction: { value: HIDE },
      closeText: {
        value: 'close',
        render: 1
      },
      visible: { value: false }
    },
    xclass: 'overlay'
  });
  return exports;
}();
overlayDialog = function (exports) {
  var util = _util_;
  var Overlay = overlayControl;
  var $ = _node_;
  var DialogTpl = overlayXtplDialogRender;
  function _setStdModRenderContent(self, part, v) {
    part = self.get(part);
    part.html(v);
  }
  var Dialog = Overlay.extend({
    beforeCreateDom: function (renderData) {
      util.mix(renderData.elAttrs, {
        role: 'dialog',
        'aria-labelledby': 'ks-stdmod-header-' + this.get('id')
      });
    },
    getChildrenContainerEl: function () {
      return this.get('body');
    },
    __afterCreateEffectGhost: function (ghost) {
      var self = this, elBody = self.get('body');
      ghost.all('.' + self.get('prefixCls') + 'stdmod-body').css({
        height: elBody.height(),
        width: elBody.width()
      }).html('');
      return ghost;
    },
    handleKeyDownInternal: function (e) {
      if (this.get('escapeToClose') && e.keyCode === $.Event.KeyCode.ESC) {
        if (!(e.target.nodeName.toLowerCase() === 'select' && !e.target.disabled)) {
          this.close();
          e.halt();
        }
        return;
      }
      trapFocus.call(this, e);
    },
    _onSetVisible: function (v, e) {
      var self = this, el = self.el;
      self.callSuper(v, e);
      if (v) {
        self.__lastActive = el.ownerDocument.activeElement;
        self.focus();
        el.setAttribute('aria-hidden', 'false');
      } else {
        el.setAttribute('aria-hidden', 'true');
        try {
          if (self.__lastActive) {
            self.__lastActive.focus();
          }
        } catch (ee) {
        }
      }
    },
    _onSetBodyContent: function (v) {
      _setStdModRenderContent(this, 'body', v);
    },
    _onSetHeaderContent: function (v) {
      _setStdModRenderContent(this, 'header', v);
    },
    _onSetFooterContent: function (v) {
      _setStdModRenderContent(this, 'footer', v);
    }
  }, {
    ATTRS: {
      focusable: { value: true },
      contentTpl: { value: DialogTpl },
      header: {
        selector: function () {
          return '.' + this.getBaseCssClass('header');
        }
      },
      body: {
        selector: function () {
          return '.' + this.getBaseCssClass('body');
        }
      },
      footer: {
        selector: function () {
          return '.' + this.getBaseCssClass('footer');
        }
      },
      bodyStyle: { sync: 0 },
      footerStyle: { render: 1 },
      headerStyle: { render: 1 },
      headerContent: {
        value: '',
        sync: 0,
        render: 1,
        parse: function () {
          return this.get('header').html();
        }
      },
      bodyContent: {
        value: '',
        sync: 0,
        render: 1,
        parse: function () {
          return this.get('body').html();
        }
      },
      footerContent: {
        value: '',
        sync: 0,
        render: 1,
        parse: function () {
          return this.get('footer').html();
        }
      },
      closable: { value: true },
      escapeToClose: { value: true }
    },
    xclass: 'dialog'
  });
  var KEY_TAB = $.Event.KeyCode.TAB;
  function trapFocus(e) {
    var self = this, keyCode = e.keyCode;
    if (keyCode !== KEY_TAB) {
      return;
    }
    var $el = self.$el;
    var node = $(e.target);
    var lastFocusItem = $el.last();
    if (node.equals($el) && e.shiftKey) {
      lastFocusItem[0].focus();
      e.halt();
    } else if (node.equals(lastFocusItem) && !e.shiftKey) {
      self.focus();
      e.halt();
    } else {
      if (node.equals($el) || $el.contains(node)) {
        return;
      }
    }
    e.halt();
  }
  exports = Dialog;
  return exports;
}();
overlayPopup = function (exports) {
  /**
   * @ignore
   * KISSY.Popup
   * @author qiaohua@taobao.com, yiminghe@gmail.com
   */
  var Overlay = overlayControl;
  var util = _util_;
  var $ = _node_;
  function bindTriggerMouse() {
    var self = this, trigger = self.get('trigger'), timer;
    self.__mouseEnterPopup = function (ev) {
      clearHiddenTimer.call(self);
      timer = util.later(function () {
        showing.call(self, ev);
        timer = undefined;
      }, self.get('mouseDelay') * 1000);
    };
    trigger.on('mouseenter', self.__mouseEnterPopup);
    self._mouseLeavePopup = function () {
      if (timer) {
        timer.cancel();
        timer = undefined;
      }
      setHiddenTimer.call(self);
    };
    trigger.on('mouseleave', self._mouseLeavePopup);
  }
  function setHiddenTimer() {
    var self = this;
    var delay = self.get('mouseDelay') * 1000;
    self._hiddenTimer = util.later(function () {
      hiding.call(self);
    }, delay);
  }
  function clearHiddenTimer() {
    var self = this;
    if (self._hiddenTimer) {
      self._hiddenTimer.cancel();
      self._hiddenTimer = undefined;
    }
  }
  function bindTriggerClick() {
    var self = this;
    self.__clickPopup = function (ev) {
      ev.preventDefault();
      if (self.get('toggle')) {
        (self.get('visible') ? hiding : showing).call(self, ev);
      } else {
        showing.call(self, ev);
      }
    };
    self.get('trigger').on('click', self.__clickPopup);
  }
  function showing(ev) {
    var self = this;
    self.set('currentTrigger', $(ev.target));
    self.show();
  }
  function hiding() {
    this.set('currentTrigger', undefined);
    this.hide();
  }
  /**
   * @class KISSY.Overlay.Popup
   * KISSY Popup Component.
   * xclass: 'popup'.
   * @extends KISSY.Overlay
   */
  exports = Overlay.extend({
    initializer: function () {
      var self = this, trigger = self.get('trigger');
      if (trigger) {
        if (self.get('triggerType') === 'mouse') {
          bindTriggerMouse.call(self);
        } else {
          bindTriggerClick.call(self);
        }
      }
    },
    bindUI: function () {
      var self = this, trigger = self.get('trigger');
      if (trigger) {
        if (self.get('triggerType') === 'mouse') {
          self.$el.on('mouseleave', setHiddenTimer, self).on('mouseenter', clearHiddenTimer, self);
        }
      }
    },
    destructor: function () {
      var self = this, $el = self.$el, t = self.get('trigger');
      if (t) {
        if (self.__clickPopup) {
          t.detach('click', self.__clickPopup);
        }
        if (self.__mouseEnterPopup) {
          t.detach('mouseenter', self.__mouseEnterPopup);
        }
        if (self._mouseLeavePopup) {
          t.detach('mouseleave', self._mouseLeavePopup);
        }
      }
      if ($el) {
        $el.detach('mouseleave', setHiddenTimer, self).detach('mouseenter', clearHiddenTimer, self);
      }
    }
  }, {
    ATTRS: {
      trigger: {
        setter: function (v) {
          return $(v);
        }
      },
      triggerType: { value: 'click' },
      currentTrigger: {},
      mouseDelay: { value: 0.1 },
      toggle: { value: false }
    },
    xclass: 'popup'
  });
  return exports;
}();
overlay = function (exports) {
  var O = overlayControl;
  var D = overlayDialog;
  var P = overlayPopup;
  O.Dialog = D;
  O.Popup = P;
  exports = O;
  O.version = '1.0.1';
  return exports;
}();
module.exports = overlay;
});