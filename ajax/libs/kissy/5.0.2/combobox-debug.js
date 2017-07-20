/*
Copyright 2014, modulex-combobox@1.0.1
MIT Licensed
build time: Thu, 16 Oct 2014 07:42:37 GMT
*/
modulex.add("combobox", ["attribute","util","io","xtemplate/runtime","node","component/control","menu"], function(require, exports, module) {
var attribute = require("attribute");
var _util_ = require("util");
var io = require("io");
var xtemplateRuntime = require("xtemplate/runtime");
var node = require("node");
var componentControl = require("component/control");
var _menu_ = require("menu");
/*
combined modules:
combobox
combobox/control
combobox/xtpl/tpl-render
combobox/xtpl/tpl
combobox/local-data-source
combobox/remote-data-source
*/
var comboboxXtplTpl, comboboxLocalDataSource, comboboxRemoteDataSource, comboboxXtplTplRender, comboboxControl, combobox;
comboboxXtplTpl = function (exports) {
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
    function func2(scope, buffer, undefined) {
      var data = scope.data;
      var affix = scope.affix;
      buffer.data += '\r\n<div class="';
      pos.line = 6;
      var callRet3;
      callRet3 = callFnUtil(tpl, scope, {
        escape: 1,
        params: ['trigger']
      }, buffer, ['getBaseCssClasses']);
      buffer = buffer.writeEscaped(callRet3);
      buffer.data += '">\r\n    <div class="';
      pos.line = 7;
      var callRet4;
      callRet4 = callFnUtil(tpl, scope, {
        escape: 1,
        params: ['trigger-inner']
      }, buffer, ['getBaseCssClasses']);
      buffer = buffer.writeEscaped(callRet4);
      buffer.data += '">&#x25BC;</div>\r\n</div>\r\n';
      return buffer;
    }
    function func8(scope, buffer, undefined) {
      var data = scope.data;
      var affix = scope.affix;
      buffer.data += '\r\n    disabled\r\n    ';
      return buffer;
    }
    function func13(scope, buffer, undefined) {
      var data = scope.data;
      var affix = scope.affix;
      buffer.data += 'none';
      return buffer;
    }
    function func14(scope, buffer, undefined) {
      var data = scope.data;
      var affix = scope.affix;
      buffer.data += 'block';
      return buffer;
    }
    function func19(scope, buffer, undefined) {
      var data = scope.data;
      var affix = scope.affix;
      buffer.data += '\r\n         style="display:none"\r\n         ';
      return buffer;
    }
    buffer.data += '<div class="';
    var callRet0;
    callRet0 = callFnUtil(tpl, scope, {
      escape: 1,
      params: ['invalid-el']
    }, buffer, ['getBaseCssClasses']);
    buffer = buffer.writeEscaped(callRet0);
    buffer.data += '">\r\n    <div class="';
    pos.line = 2;
    var callRet1;
    callRet1 = callFnUtil(tpl, scope, {
      escape: 1,
      params: ['invalid-inner']
    }, buffer, ['getBaseCssClasses']);
    buffer = buffer.writeEscaped(callRet1);
    buffer.data += '"></div>\r\n</div>\r\n\r\n';
    pos.line = 5;
    pos.line = 5;
    var id5 = (t = affix.hasTrigger) !== undefined ? t : (t = data.hasTrigger) !== undefined ? t : scope.resolveLooseUp(['hasTrigger']);
    buffer = ifCommand.call(tpl, scope, {
      params: [id5],
      fn: func2
    }, buffer);
    buffer.data += '\r\n\r\n<div class="';
    pos.line = 11;
    var callRet6;
    callRet6 = callFnUtil(tpl, scope, {
      escape: 1,
      params: ['input-wrap']
    }, buffer, ['getBaseCssClasses']);
    buffer = buffer.writeEscaped(callRet6);
    buffer.data += '">\r\n\r\n    <input id="ks-combobox-input-';
    pos.line = 13;
    var id7 = (t = affix.id) !== undefined ? t : (t = data.id) !== undefined ? t : scope.resolveLooseUp(['id']);
    buffer = buffer.writeEscaped(id7);
    buffer.data += '"\r\n           aria-haspopup="true"\r\n           aria-autocomplete="list"\r\n           aria-haspopup="true"\r\n           role="autocomplete"\r\n           aria-expanded="false"\r\n\r\n    ';
    pos.line = 20;
    var id9 = (t = affix.disabled) !== undefined ? t : (t = data.disabled) !== undefined ? t : scope.resolveLooseUp(['disabled']);
    buffer = ifCommand.call(tpl, scope, {
      params: [id9],
      fn: func8
    }, buffer);
    buffer.data += '\r\n\r\n    autocomplete="off"\r\n    class="';
    pos.line = 25;
    var callRet10;
    callRet10 = callFnUtil(tpl, scope, {
      escape: 1,
      params: ['input']
    }, buffer, ['getBaseCssClasses']);
    buffer = buffer.writeEscaped(callRet10);
    buffer.data += '"\r\n\r\n    value="';
    pos.line = 27;
    var id11 = (t = affix.value) !== undefined ? t : (t = data.value) !== undefined ? t : scope.resolveLooseUp(['value']);
    buffer = buffer.writeEscaped(id11);
    buffer.data += '"\r\n    />\r\n\r\n\r\n    <label for="ks-combobox-input-';
    pos.line = 31;
    var id12 = (t = affix.id) !== undefined ? t : (t = data.id) !== undefined ? t : scope.resolveLooseUp(['id']);
    buffer = buffer.writeEscaped(id12);
    buffer.data += '"\r\n            style=\'display:';
    pos.line = 32;
    var id15 = (t = affix.value) !== undefined ? t : (t = data.value) !== undefined ? t : scope.resolveLooseUp(['value']);
    buffer = ifCommand.call(tpl, scope, {
      params: [id15],
      fn: func13,
      inverse: func14
    }, buffer);
    buffer.data += ';\'\r\n    class="';
    pos.line = 33;
    var callRet16;
    callRet16 = callFnUtil(tpl, scope, {
      escape: 1,
      params: ['placeholder']
    }, buffer, ['getBaseCssClasses']);
    buffer = buffer.writeEscaped(callRet16);
    buffer.data += '">\r\n    ';
    pos.line = 34;
    var id17 = (t = affix.placeholder) !== undefined ? t : (t = data.placeholder) !== undefined ? t : scope.resolveLooseUp(['placeholder']);
    buffer = buffer.writeEscaped(id17);
    buffer.data += '\r\n    </label>\r\n\r\n    <div class="';
    pos.line = 37;
    var callRet18;
    callRet18 = callFnUtil(tpl, scope, {
      escape: 1,
      params: ['clear']
    }, buffer, ['getBaseCssClasses']);
    buffer = buffer.writeEscaped(callRet18);
    buffer.data += '"\r\n         unselectable="on"\r\n         ';
    pos.line = 39;
    var id20 = (t = affix.value) !== undefined ? t : (t = data.value) !== undefined ? t : scope.resolveLooseUp(['value']);
    buffer = ifCommand.call(tpl, scope, {
      params: [!id20],
      fn: func19
    }, buffer);
    buffer.data += '\r\n         onmousedown="return false;"><div\r\n            class="';
    pos.line = 43;
    var callRet21;
    callRet21 = callFnUtil(tpl, scope, {
      escape: 1,
      params: ['clear-inner']
    }, buffer, ['getBaseCssClasses']);
    buffer = buffer.writeEscaped(callRet21);
    buffer.data += '">clear</div></div>\r\n</div>\r\n';
    return buffer;
  };
  ret.TPL_NAME = module.id || module.name;
  return exports;
}();
comboboxLocalDataSource = function (exports) {
  /**
   * @ignore
   * Local dataSource for ComboBox
   * @author yiminghe@gmail.com
   */
  var Attribute = attribute;
  var util = _util_;
  /**
   * Local dataSource for comboBox.
   * @extends Base
   * @class ComboBox.LocalDataSource
   */
  exports = Attribute.extend({
    fetchData: function (inputVal, callback, context) {
      var parse = this.get('parse'), data = this.get('data');
      data = parse(inputVal, data);
      callback.call(context, data);
    }
  }, {
    ATTRS: {
      data: { value: [] },
      parse: { value: parser }
    }
  });
  function parser(inputVal, data) {
    var ret = [], count = 0;
    if (!inputVal) {
      return data;
    }
    util.each(data, function (d) {
      if (d.indexOf(inputVal) !== -1) {
        ret.push(d);
      }
      count++;
    });
    return ret;
  }
  return exports;
}();
comboboxRemoteDataSource = function (exports) {
  var IO = io;
  var Attribute = attribute;
  exports = Attribute.extend({
    fetchData: function (inputVal, callback, context) {
      var self = this, v, paramName = self.get('paramName'), parse = self.get('parse'), cache = self.get('cache'), allowEmpty = self.get('allowEmpty');
      self.caches = self.caches || {};
      if (self.io) {
        self.io.abort();
        self.io = null;
      }
      if (!inputVal && allowEmpty !== true) {
        return callback.call(context, []);
      }
      if (cache) {
        if (v = self.caches[inputVal]) {
          return callback.call(context, v);
        }
      }
      var xhrCfg = self.get('xhrCfg');
      xhrCfg.data = xhrCfg.data || {};
      xhrCfg.data[paramName] = inputVal;
      xhrCfg.success = function (data) {
        if (parse) {
          data = parse(inputVal, data);
        }
        self.setInternal('data', data);
        if (cache) {
          self.caches[inputVal] = data;
        }
        callback.call(context, data);
      };
      self.io = IO(xhrCfg);
      return undefined;
    }
  }, {
    ATTRS: {
      paramName: { value: 'q' },
      allowEmpty: {},
      cache: {},
      parse: {},
      xhrCfg: {
        valueFn: function () {
          return {};
        }
      }
    }
  });
  return exports;
}();
comboboxXtplTplRender = function (exports) {
  var tpl = comboboxXtplTpl;
  var XTemplateRuntime = xtemplateRuntime;
  var instance = new XTemplateRuntime(tpl);
  exports = function () {
    return instance.render.apply(instance, arguments);
  };
  return exports;
}();
comboboxControl = function (exports) {
  var util = _util_;
  var $ = node;
  var Control = componentControl;
  var ComboboxTpl = comboboxXtplTplRender;
  var ComboBox;
  var KeyCode = $.Event.KeyCode;
  ComboBox = Control.extend({
    initializer: function () {
      this.publish('afterRenderData', { bubbles: false });
    },
    _savedValue: null,
    bindUI: function () {
      var self = this, input = self.get('input');
      input.on('input', onValueChange, self);
      self.on('click', onMenuItemClick, self);
      var menu = self.get('menu');
      if (menu.get('rendered')) {
        onMenuAfterRenderUI.call(self);
      } else {
        menu.on('afterRenderUI', onMenuAfterRenderUI, self);
      }
    },
    destructor: function () {
      var self = this;
      self.get('menu').destroy();
      self.$el.getWindow().detach('resize', onWindowResize, self);
    },
    normalizeData: function (data) {
      var self = this, contents, v, i, c;
      if (data && data.length) {
        data = data.slice(0, self.get('maxItemCount'));
        if (self.get('format')) {
          contents = self.get('format').call(self, self.getCurrentValue(), data);
        } else {
          contents = [];
        }
        for (i = 0; i < data.length; i++) {
          v = data[i];
          c = contents[i] = util.mix({
            content: v,
            textContent: v,
            value: v
          }, contents[i]);
        }
        return contents;
      }
      return contents;
    },
    getCurrentValue: function () {
      return this.get('value');
    },
    setCurrentValue: function (value, setCfg) {
      this.set('value', value, setCfg);
    },
    _onSetValue: function (v, e) {
      var self = this, clearEl = self.get('clearEl'), value;
      if (e.causedByInputEvent) {
        value = self.getCurrentValue();
        if (value === undefined) {
          self.set('collapsed', true);
          return;
        }
        self._savedValue = value;
        self.sendRequest(value);
      } else {
        self.get('input').val(v);
      }
      if (v && clearEl) {
        clearEl.show();
      } else if (!v && clearEl) {
        clearEl.hide();
      }
      var placeholderEl = self.get('placeholderEl');
      if (placeholderEl) {
        if (!v) {
          placeholderEl.show();
        } else {
          placeholderEl.hide();
        }
      }
    },
    handleFocusInternal: function () {
      var self = this;
      clearDismissTimer(self);
      if (self.get('invalidEl')) {
        setInvalid(self, false);
      }
    },
    handleBlurInternal: function (e) {
      var self = this;
      self.callSuper(e);
      delayHide(self);
      if (self.get('invalidEl')) {
        self.validate(function (error, val) {
          if (error) {
            if (!self.get('focused') && val === self.get('value')) {
              setInvalid(self, error);
            }
          } else {
            setInvalid(self, false);
          }
        });
      }
    },
    handleMouseDownInternal: function (e) {
      var self = this, target, clearEl, trigger;
      self.callSuper(e);
      target = e.target;
      trigger = self.get('trigger');
      clearEl = self.get('clearEl');
      if (trigger && (trigger[0] === target || trigger.contains(target))) {
        if (self.get('collapsed')) {
          self.focus();
          self.sendRequest('');
        } else {
          self.set('collapsed', true);
        }
        e.preventDefault();
      } else if (clearEl && (clearEl[0] === target || clearEl.contains(target))) {
        self.get('input').val('');
        self.setCurrentValue('', { data: { causedByInputEvent: 1 } });
        clearEl.hide();
      }
    },
    handleKeyDownInternal: function (e) {
      var self = this, updateInputOnDownUp, input, keyCode = e.keyCode, highlightedItem, handledByMenu, menu = self.get('menu');
      input = self.get('input');
      updateInputOnDownUp = self.get('updateInputOnDownUp');
      if (menu.get('visible')) {
        highlightedItem = menu.get('highlightedItem');
        if (updateInputOnDownUp && highlightedItem) {
          var menuChildren = menu.get('children');
          if (keyCode === KeyCode.DOWN && highlightedItem === getFirstEnabledItem(menuChildren.concat().reverse()) || keyCode === KeyCode.UP && highlightedItem === getFirstEnabledItem(menuChildren)) {
            self.setCurrentValue(self._savedValue);
            highlightedItem.set('highlighted', false);
            return true;
          }
        }
        handledByMenu = menu.handleKeyDownInternal(e);
        highlightedItem = menu.get('highlightedItem');
        if (keyCode === KeyCode.ESC) {
          self.set('collapsed', true);
          if (updateInputOnDownUp) {
            self.setCurrentValue(self._savedValue);
          }
          return true;
        }
        if (updateInputOnDownUp && util.inArray(keyCode, [
            KeyCode.DOWN,
            KeyCode.UP
          ])) {
          self.setCurrentValue(highlightedItem.get('textContent'));
        }
        if (keyCode === KeyCode.TAB && highlightedItem) {
          highlightedItem.handleClickInternal(e);
          if (self.get('multiple')) {
            return true;
          }
        }
        return handledByMenu;
      } else if (keyCode === KeyCode.DOWN || keyCode === KeyCode.UP) {
        var v = self.getCurrentValue();
        if (v !== undefined) {
          self.sendRequest(v);
          return true;
        }
      }
      return undefined;
    },
    validate: function (callback) {
      var self = this, validator = self.get('validator'), val = self.getCurrentValue();
      if (validator) {
        validator(val, function (error) {
          callback(error, val);
        });
      } else {
        callback(false, val);
      }
    },
    sendRequest: function (value) {
      var self = this, dataSource = self.get('dataSource');
      dataSource.fetchData(value, renderData, self);
    },
    getKeyEventTarget: function () {
      return this.get('input');
    },
    _onSetCollapsed: function (v) {
      var self = this, el = self.$el, menu = self.get('menu');
      if (v) {
        menu.hide();
      } else {
        clearDismissTimer(self);
        if (!menu.get('visible')) {
          if (self.get('matchElWidth')) {
            menu.render();
            var menuEl = menu.get('el');
            var borderWidth = (parseInt(menuEl.css('borderLeftWidth'), 10) || 0) + (parseInt(menuEl.css('borderRightWidth'), 10) || 0);
            menu.set('width', el[0].offsetWidth - borderWidth);
          }
          menu.show();
        }
      }
      this.get('input').attr('aria-expanded', !v);
    },
    _onSetDisabled: function (v, e) {
      this.callSuper(v, e);
      this.get('input').attr('disabled', v);
    }
  }, {
    ATTRS: {
      handleGestureEvents: { value: true },
      focusable: { value: true },
      allowTextSelection: { value: true },
      contentTpl: { value: ComboboxTpl },
      input: {
        selector: function () {
          return '.' + this.getBaseCssClass('input');
        }
      },
      value: {
        value: '',
        sync: 0,
        render: 1,
        parse: function () {
          return this.get('input').val();
        }
      },
      trigger: {
        selector: function () {
          return '.' + this.getBaseCssClass('trigger');
        }
      },
      placeholder: {
        render: 1,
        sync: 0,
        parse: function () {
          var placeHolder = this.get('placeholderEl');
          return placeHolder && placeHolder.html();
        }
      },
      placeholderEl: {
        selector: function () {
          return '.' + this.getBaseCssClass('placeholder');
        }
      },
      clearEl: {
        selector: function () {
          return '.' + this.getBaseCssClass('clear');
        }
      },
      validator: {},
      invalidEl: {
        selector: function () {
          return '.' + this.getBaseCssClass('invalid-el');
        }
      },
      hasTrigger: {
        value: true,
        sync: 0,
        render: 1
      },
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
            var align = {
              node: this.$el,
              points: [
                'bl',
                'tl'
              ],
              overflow: {
                adjustX: 1,
                adjustY: 1
              }
            };
            util.mix(m.get('align'), align, false);
          }
        }
      },
      collapsed: {
        render: 1,
        sync: 0,
        value: true
      },
      dataSource: {},
      maxItemCount: { value: 99999 },
      matchElWidth: { value: true },
      format: {},
      updateInputOnDownUp: { value: true },
      autoHighlightFirst: {},
      highlightMatchItem: { value: true }
    },
    xclass: 'combobox'
  });
  function getFirstEnabledItem(children) {
    for (var i = 0; i < children.length; i++) {
      if (!children[i].get('disabled')) {
        return children[i];
      }
    }
    return null;
  }
  function onMenuFocusout() {
    delayHide(this);
  }
  function onMenuFocusin() {
    var self = this;
    setTimeout(function () {
      clearDismissTimer(self);
    }, 0);
  }
  function onMenuMouseOver() {
    var self = this;
    self.focus();
    clearDismissTimer(self);
  }
  function onMenuMouseDown() {
    var self = this;
    self.setCurrentValue(self.getCurrentValue(), { force: 1 });
  }
  function onMenuAfterRenderUI(e) {
    var self = this, contentEl;
    var menu = self.get('menu');
    if (!e || menu === e.target) {
      var input = self.get('input');
      var el = menu.get('el');
      contentEl = menu.get('contentEl');
      input.attr('aria-owns', el.attr('id'));
      el.on('focusout', onMenuFocusout, self);
      el.on('focusin', onMenuFocusin, self);
      contentEl.on('mouseover', onMenuMouseOver, self);
      contentEl.on('mousedown', onMenuMouseDown, self);
      if (self.get('matchElWidth')) {
        el.getWindow().on('resize', onWindowResize, self);
      }
    }
  }
  function onWindowResize() {
    var self = this;
    var menu = self.get('menu');
    if (menu.get('visible')) {
      var el = self.get('el');
      var menuEl = menu.get('el');
      var borderWidth = (parseInt(menuEl.css('borderLeftWidth'), 10) || 0) + (parseInt(menuEl.css('borderRightWidth'), 10) || 0);
      menu.set('width', el[0].offsetWidth - borderWidth);
    }
  }
  function onMenuItemClick(e) {
    var item = e.target, self = this, textContent;
    if (item.isMenuItem) {
      textContent = item.get('textContent');
      self.setCurrentValue(textContent);
      self._savedValue = textContent;
      self.set('collapsed', true);
    }
  }
  function setInvalid(self, error) {
    var $el = self.$el, cls = self.getBaseCssClasses('invalid'), invalidEl = self.get('invalidEl');
    if (error) {
      $el.addClass(cls);
      invalidEl.attr('title', error);
      invalidEl.show();
    } else {
      $el.removeClass(cls);
      invalidEl.hide();
    }
  }
  function delayHide(self) {
    if (self._focusoutDismissTimer) {
      return;
    }
    self._focusoutDismissTimer = setTimeout(function () {
      if (self._focusoutDismissTimer) {
        self.set('collapsed', true);
      }
    }, 50);
  }
  function clearDismissTimer(self) {
    var t = self._focusoutDismissTimer;
    if (t) {
      clearTimeout(t);
      self._focusoutDismissTimer = null;
    }
  }
  function onValueChange(e) {
    this.set('value', e.target.value, { data: { causedByInputEvent: 1 } });
  }
  function renderData(data) {
    var self = this, children = [], val, matchVal, i, menu = self.get('menu');
    data = self.normalizeData(data);
    menu.set('highlightedItem', null);
    menu.removeChildren(true);
    if (data && data.length) {
      menu.addChildren(data);
      children = menu.get('children');
      val = self.getCurrentValue();
      if (self.get('highlightMatchItem')) {
        for (i = 0; i < children.length; i++) {
          if (children[i].get('textContent') === val) {
            children[i].set('highlighted', true);
            menu.set('highlightedItem', children[i]);
            matchVal = true;
            break;
          }
        }
      }
      if (!matchVal && self.get('autoHighlightFirst')) {
        for (i = 0; i < children.length; i++) {
          if (!children[i].get('disabled')) {
            children[i].set('highlighted', true);
            menu.set('highlightedItem', children[i]);
            break;
          }
        }
      }
      self.set('collapsed', false);
      self.fire('afterRenderData');
    } else {
      self.set('collapsed', true);
    }
  }
  exports = ComboBox;
  ComboBox.version = '1.0.1';
  return exports;
}();
combobox = function (exports) {
  var ComboBox = comboboxControl;
  var LocalDataSource = comboboxLocalDataSource;
  var RemoteDataSource = comboboxRemoteDataSource;
  ComboBox.LocalDataSource = LocalDataSource;
  ComboBox.RemoteDataSource = RemoteDataSource;
  exports = ComboBox;
  ComboBox.version = '1.0.1';
  return exports;
}();
module.exports = combobox;
});