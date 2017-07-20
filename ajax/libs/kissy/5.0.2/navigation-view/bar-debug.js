/*
Copyright 2014, modulex-navigation-view@1.0.1
MIT Licensed
build time: Thu, 16 Oct 2014 08:10:16 GMT
*/
modulex.add("navigation-view/bar", ["xtemplate/runtime","component/control","button"], function(require, exports, module) {
var xtemplateRuntime = require("xtemplate/runtime");
var componentControl = require("component/control");
var button = require("button");
/*
combined modules:
navigation-view/bar
navigation-view/bar/xtpl/tpl-render
navigation-view/bar/xtpl/tpl
*/
var navigationViewBarXtplTpl, navigationViewBarXtplTplRender, navigationViewBar;
navigationViewBarXtplTpl = function (exports) {
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
    function func0(scope, buffer, undefined) {
      var data = scope.data;
      var affix = scope.affix;
      buffer.data += '\r\n<div class="';
      pos.line = 2;
      var callRet1;
      callRet1 = callFnUtil(tpl, scope, {
        escape: 1,
        params: ['title-wrap']
      }, buffer, ['getBaseCssClasses']);
      buffer = buffer.writeEscaped(callRet1);
      buffer.data += '">\r\n    <div class="';
      pos.line = 3;
      var callRet2;
      callRet2 = callFnUtil(tpl, scope, {
        escape: 1,
        params: ['title']
      }, buffer, ['getBaseCssClasses']);
      buffer = buffer.writeEscaped(callRet2);
      buffer.data += '">';
      var id3 = (t = affix.title) !== undefined ? t : (t = data.title) !== undefined ? t : scope.resolveLooseUp(['title']);
      buffer = buffer.writeEscaped(id3);
      buffer.data += '</div>\r\n</div>\r\n';
      return buffer;
    }
    buffer.data += '';
    pos.line = 1;
    var id4 = (t = affix.withTitle) !== undefined ? t : (t = data.withTitle) !== undefined ? t : scope.resolveLooseUp(['withTitle']);
    buffer = ifCommand.call(tpl, scope, {
      params: [id4],
      fn: func0
    }, buffer);
    buffer.data += '\r\n<div class="';
    pos.line = 6;
    var callRet5;
    callRet5 = callFnUtil(tpl, scope, {
      escape: 1,
      params: ['content']
    }, buffer, ['getBaseCssClasses']);
    buffer = buffer.writeEscaped(callRet5);
    buffer.data += '">\r\n    <div class="';
    pos.line = 7;
    var callRet6;
    callRet6 = callFnUtil(tpl, scope, {
      escape: 1,
      params: ['center']
    }, buffer, ['getBaseCssClasses']);
    buffer = buffer.writeEscaped(callRet6);
    buffer.data += '"></div>\r\n</div>';
    return buffer;
  };
  ret.TPL_NAME = module.id || module.name;
  return exports;
}();
navigationViewBarXtplTplRender = function (exports) {
  var tpl = navigationViewBarXtplTpl;
  var XTemplateRuntime = xtemplateRuntime;
  var instance = new XTemplateRuntime(tpl);
  exports = function () {
    return instance.render.apply(instance, arguments);
  };
  return exports;
}();
navigationViewBar = function (exports) {
  var Control = componentControl;
  var Button = button;
  var tpl = navigationViewBarXtplTplRender;
  function createGhost(elem) {
    var ghost, width;
    ghost = elem.clone(true);
    ghost[0].id = elem[0].id + '-proxy';
    elem.parent().append(ghost);
    var offset = elem.offset();
    ghost.css('position', 'absolute');
    ghost.offset(offset);
    ghost.css({
      width: width = elem.css('width'),
      height: elem.css('height')
    });
    return ghost;
  }
  function anim(el, props, complete) {
    el.animate(props, {
      duration: 0.25,
      easing: 'ease-in-out',
      complete: complete
    });
  }
  function getAnimProps(self, backEl, backElProps, reverse) {
    var barElement = self.get('el'), titleElement = self.get('titleEl'), minOffset = Math.min(barElement[0].offsetWidth / 3, 200), newLeftWidth = backEl[0].offsetWidth, barWidth = barElement[0].offsetWidth, titleX = titleElement.offset().left - barElement.offset().left, titleWidth = titleElement[0].offsetWidth, oldBackWidth = backElProps.width, newOffset, oldOffset, backElAnims, titleAnims, omega, theta;
    if (reverse) {
      newOffset = -oldBackWidth;
      oldOffset = Math.min(titleX - oldBackWidth, minOffset);
    } else {
      oldOffset = -oldBackWidth;
      newOffset = Math.min(titleX, minOffset);
    }
    backElAnims = {
      element: {
        from: { transform: 'translateX(' + newOffset + 'px) translateZ(0)' },
        to: {
          transform: 'translateX(0) translateZ(0)',
          opacity: 1
        }
      },
      ghost: {
        to: {
          transform: 'translateX(' + oldOffset + 'px) translateZ(0)',
          opacity: 0
        }
      }
    };
    theta = -titleX + newLeftWidth;
    if (titleWidth > titleX) {
      omega = -titleX - titleWidth;
    }
    if (reverse) {
      oldOffset = barWidth - titleX - titleWidth;
      if (omega !== undefined) {
        newOffset = omega;
      } else {
        newOffset = theta;
      }
    } else {
      newOffset = barWidth - titleX - titleWidth;
      if (omega !== undefined) {
        oldOffset = omega;
      } else {
        oldOffset = theta;
      }
      newOffset = Math.max(0, newOffset);
    }
    titleAnims = {
      element: {
        from: { transform: 'translateX(' + newOffset + 'px) translateZ(0)' },
        to: {
          transform: 'translateX(0) translateZ(0)',
          opacity: 1
        }
      },
      ghost: {
        to: {
          transform: 'translateX(' + oldOffset + 'px) translateZ(0)',
          opacity: 0
        }
      }
    };
    return {
      back: backElAnims,
      title: titleAnims
    };
  }
  function onBackButtonClick() {
    this.fire('backward');
  }
  function onBack() {
    this.get('navigationView').pop();
  }
  function afterInnerViewChange(e) {
    this.set('title', e.newView.get('title') || '');
  }
  function beforeInnerViewChange(e) {
    var self = this;
    var oldView = e.oldView;
    var newView = e.newView;
    var backward = e.backward;
    if (oldView) {
      self[backward ? 'backward' : 'forward'](newView.get('title') || '');
    }
  }
  exports = Control.extend({
    initializer: function () {
      this._withTitle = this.get('withTitle');
      this._stack = [];
      this.publish('backward', {
        defaultFn: onBack,
        defaultTargetOnly: true
      });
    },
    renderUI: function () {
      var self = this, prefixCls = self.get('prefixCls');
      self._buttons = {};
      if (self.get('withBackButton')) {
        self._backBtn = new Button({
          prefixCls: prefixCls + 'navigation-bar-',
          elCls: prefixCls + 'navigation-bar-backward',
          elBefore: self.get('contentEl')[0].firstChild,
          visible: false,
          content: self.get('backText')
        }).render();
      }
    },
    bindUI: function () {
      if (this._backBtn) {
        this._backBtn.on('click', onBackButtonClick, this);
      }
      var navigationView = this.get('navigationView');
      navigationView.on('afterInnerViewChange', afterInnerViewChange, this);
      navigationView.on('beforeInnerViewChange', beforeInnerViewChange, this);
    },
    addButton: function (name, config) {
      var self = this, prefixCls = self.get('prefixCls');
      config.prefixCls = prefixCls + 'navigation-bar-';
      if (!config.elBefore && !config.render) {
        var align = config.align = config.align || 'left';
        if (align === 'left') {
          config.elBefore = self.get('centerEl');
        } else if (align === 'right') {
          config.render = self.get('contentEl');
        }
        delete config.align;
      }
      self._buttons[name] = new Button(config).render();
      return self._buttons[name];
    },
    insertButtonBefore: function (name, config, button) {
      config.elBefore = button.get('el');
      return this.addButton(name, config);
    },
    removeButton: function (name) {
      this._buttons[name].destroy();
      delete this._buttons[name];
    },
    getButton: function (name) {
      return this._buttons[name];
    },
    forward: function (title) {
      this._stack.push(title);
      this.go(title, true);
    },
    go: function (title, hasPrevious, reverse) {
      var self = this;
      var backBtn = self._backBtn;
      if (!(backBtn && self._withTitle)) {
        if (self._withTitle) {
          self.get('titleEl').html(title);
        }
        if (backBtn) {
          backBtn[hasPrevious ? 'show' : 'hide']();
        }
        return;
      }
      var backEl = backBtn.get('el');
      backEl.stop(true);
      if (self.ghostBackEl) {
        self.ghostBackEl.stop(true);
      }
      var backElProps = { width: backEl[0].offsetWidth };
      var ghostBackEl = createGhost(backEl);
      self.ghostBackEl = ghostBackEl;
      backEl.css('opacity', 0);
      backBtn[hasPrevious ? 'show' : 'hide']();
      if (self.ghostBackEl) {
        self.ghostBackEl.stop(true);
      }
      var anims = getAnimProps(self, backEl, backElProps, reverse);
      backEl.css(anims.back.element.from);
      if (backBtn.get('visible')) {
        anim(backEl, anims.back.element.to);
      }
      if (ghostBackEl.css('display') !== 'none') {
        anim(ghostBackEl, anims.back.ghost.to, function () {
          ghostBackEl.remove();
          self.ghostBackEl = null;
        });
      } else {
        ghostBackEl.remove();
        self.ghostBackEl = null;
      }
      var titleEl = self.get('titleEl');
      titleEl.stop(true);
      var ghostTitleEl = createGhost(titleEl.parent());
      self.ghostTitleEl = ghostTitleEl;
      titleEl.css('opacity', 0);
      self.set('title', title);
      titleEl.css(anims.title.element.from);
      anim(titleEl, anims.title.element.to);
      anim(ghostTitleEl, anims.title.ghost.to, function () {
        ghostTitleEl.remove();
        self.ghostTitleEl = null;
      });
    },
    backward: function (title) {
      if (this._stack.length) {
        this._stack.pop();
        this.go(title, this._stack.length, true);
      }
    },
    _onSetTitle: function (v) {
      var titleEl = this.get('titleEl');
      if (titleEl) {
        titleEl.html(v);
      }
    },
    _onSetBackText: function (v) {
      if (this._backBtn) {
        this._backBtn.set('content', v);
      }
    }
  }, {
    xclass: 'navigation-bar',
    ATTRS: {
      handleGestureEvents: { value: false },
      focusable: { value: false },
      allowTextSelection: { value: true },
      contentTpl: { value: tpl },
      centerEl: {
        selector: function () {
          return '.' + this.getBaseCssClass('center');
        }
      },
      contentEl: {
        selector: function () {
          return '.' + this.getBaseCssClass('content');
        }
      },
      titleEl: {
        selector: function () {
          return '.' + this.getBaseCssClass('title');
        }
      },
      title: {
        value: '',
        render: 1,
        sync: 0
      },
      withBackButton: { value: 1 },
      withTitle: {
        value: 1,
        render: 1,
        sync: 0
      },
      backText: {
        value: 'Back',
        render: 1,
        sync: 0
      }
    }
  });
  return exports;
}();
module.exports = navigationViewBar;
});