'use strict';

var OverlayEventBus = require('primevue/overlayeventbus');
var Portal = require('primevue/portal');
var utils = require('primevue/utils');
var BaseComponent = require('primevue/basecomponent');
var ColorPickerStyle = require('primevue/colorpicker/style');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var OverlayEventBus__default = /*#__PURE__*/_interopDefaultLegacy(OverlayEventBus);
var Portal__default = /*#__PURE__*/_interopDefaultLegacy(Portal);
var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
var ColorPickerStyle__default = /*#__PURE__*/_interopDefaultLegacy(ColorPickerStyle);

var script$1 = {
  name: 'BaseColorPicker',
  "extends": BaseComponent__default["default"],
  props: {
    modelValue: {
      type: null,
      "default": null
    },
    defaultColor: {
      type: null,
      "default": 'ff0000'
    },
    inline: {
      type: Boolean,
      "default": false
    },
    format: {
      type: String,
      "default": 'hex'
    },
    disabled: {
      type: Boolean,
      "default": false
    },
    tabindex: {
      type: String,
      "default": null
    },
    autoZIndex: {
      type: Boolean,
      "default": true
    },
    baseZIndex: {
      type: Number,
      "default": 0
    },
    appendTo: {
      type: [String, Object],
      "default": 'body'
    },
    panelClass: null
  },
  style: ColorPickerStyle__default["default"],
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};

var script = {
  name: 'ColorPicker',
  "extends": script$1,
  inheritAttrs: false,
  emits: ['update:modelValue', 'change', 'show', 'hide'],
  data: function data() {
    return {
      overlayVisible: false
    };
  },
  hsbValue: null,
  outsideClickListener: null,
  documentMouseMoveListener: null,
  documentMouseUpListener: null,
  scrollHandler: null,
  resizeListener: null,
  hueDragging: null,
  colorDragging: null,
  selfUpdate: null,
  picker: null,
  colorSelector: null,
  colorHandle: null,
  hueView: null,
  hueHandle: null,
  watch: {
    modelValue: {
      immediate: true,
      handler: function handler(newValue) {
        this.hsbValue = this.toHSB(newValue);
        if (this.selfUpdate) this.selfUpdate = false;else this.updateUI();
      }
    }
  },
  beforeUnmount: function beforeUnmount() {
    this.unbindOutsideClickListener();
    this.unbindDragListeners();
    this.unbindResizeListener();
    if (this.scrollHandler) {
      this.scrollHandler.destroy();
      this.scrollHandler = null;
    }
    if (this.picker && this.autoZIndex) {
      utils.ZIndexUtils.clear(this.picker);
    }
    this.clearRefs();
  },
  mounted: function mounted() {
    this.updateUI();
  },
  methods: {
    pickColor: function pickColor(event) {
      var rect = this.colorSelector.getBoundingClientRect();
      var top = rect.top + (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0);
      var left = rect.left + document.body.scrollLeft;
      var saturation = Math.floor(100 * Math.max(0, Math.min(150, (event.pageX || event.changedTouches[0].pageX) - left)) / 150);
      var brightness = Math.floor(100 * (150 - Math.max(0, Math.min(150, (event.pageY || event.changedTouches[0].pageY) - top))) / 150);
      this.hsbValue = this.validateHSB({
        h: this.hsbValue.h,
        s: saturation,
        b: brightness
      });
      this.selfUpdate = true;
      this.updateColorHandle();
      this.updateInput();
      this.updateModel(event);
    },
    pickHue: function pickHue(event) {
      var top = this.hueView.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0);
      this.hsbValue = this.validateHSB({
        h: Math.floor(360 * (150 - Math.max(0, Math.min(150, (event.pageY || event.changedTouches[0].pageY) - top))) / 150),
        s: 100,
        b: 100
      });
      this.selfUpdate = true;
      this.updateColorSelector();
      this.updateHue();
      this.updateModel(event);
      this.updateInput();
    },
    updateModel: function updateModel(event) {
      var value = this.modelValue;
      switch (this.format) {
        case 'hex':
          value = this.HSBtoHEX(this.hsbValue);
          break;
        case 'rgb':
          value = this.HSBtoRGB(this.hsbValue);
          break;
        case 'hsb':
          value = this.hsbValue;
          break;
      }
      this.$emit('update:modelValue', value);
      this.$emit('change', {
        event: event,
        value: value
      });
    },
    updateColorSelector: function updateColorSelector() {
      if (this.colorSelector) {
        var hsbValue = this.validateHSB({
          h: this.hsbValue.h,
          s: 100,
          b: 100
        });
        this.colorSelector.style.backgroundColor = '#' + this.HSBtoHEX(hsbValue);
      }
    },
    updateColorHandle: function updateColorHandle() {
      if (this.colorHandle) {
        this.colorHandle.style.left = Math.floor(150 * this.hsbValue.s / 100) + 'px';
        this.colorHandle.style.top = Math.floor(150 * (100 - this.hsbValue.b) / 100) + 'px';
      }
    },
    updateHue: function updateHue() {
      if (this.hueHandle) {
        this.hueHandle.style.top = Math.floor(150 - 150 * this.hsbValue.h / 360) + 'px';
      }
    },
    updateInput: function updateInput() {
      if (this.$refs.input) {
        this.$refs.input.style.backgroundColor = '#' + this.HSBtoHEX(this.hsbValue);
      }
    },
    updateUI: function updateUI() {
      this.updateHue();
      this.updateColorHandle();
      this.updateInput();
      this.updateColorSelector();
    },
    validateHSB: function validateHSB(hsb) {
      return {
        h: Math.min(360, Math.max(0, hsb.h)),
        s: Math.min(100, Math.max(0, hsb.s)),
        b: Math.min(100, Math.max(0, hsb.b))
      };
    },
    validateRGB: function validateRGB(rgb) {
      return {
        r: Math.min(255, Math.max(0, rgb.r)),
        g: Math.min(255, Math.max(0, rgb.g)),
        b: Math.min(255, Math.max(0, rgb.b))
      };
    },
    validateHEX: function validateHEX(hex) {
      var len = 6 - hex.length;
      if (len > 0) {
        var o = [];
        for (var i = 0; i < len; i++) {
          o.push('0');
        }
        o.push(hex);
        hex = o.join('');
      }
      return hex;
    },
    HEXtoRGB: function HEXtoRGB(hex) {
      var hexValue = parseInt(hex.indexOf('#') > -1 ? hex.substring(1) : hex, 16);
      return {
        r: hexValue >> 16,
        g: (hexValue & 0x00ff00) >> 8,
        b: hexValue & 0x0000ff
      };
    },
    HEXtoHSB: function HEXtoHSB(hex) {
      return this.RGBtoHSB(this.HEXtoRGB(hex));
    },
    RGBtoHSB: function RGBtoHSB(rgb) {
      var hsb = {
        h: 0,
        s: 0,
        b: 0
      };
      var min = Math.min(rgb.r, rgb.g, rgb.b);
      var max = Math.max(rgb.r, rgb.g, rgb.b);
      var delta = max - min;
      hsb.b = max;
      hsb.s = max !== 0 ? 255 * delta / max : 0;
      if (hsb.s !== 0) {
        if (rgb.r === max) {
          hsb.h = (rgb.g - rgb.b) / delta;
        } else if (rgb.g === max) {
          hsb.h = 2 + (rgb.b - rgb.r) / delta;
        } else {
          hsb.h = 4 + (rgb.r - rgb.g) / delta;
        }
      } else {
        hsb.h = -1;
      }
      hsb.h *= 60;
      if (hsb.h < 0) {
        hsb.h += 360;
      }
      hsb.s *= 100 / 255;
      hsb.b *= 100 / 255;
      return hsb;
    },
    HSBtoRGB: function HSBtoRGB(hsb) {
      var rgb = {
        r: null,
        g: null,
        b: null
      };
      var h = Math.round(hsb.h);
      var s = Math.round(hsb.s * 255 / 100);
      var v = Math.round(hsb.b * 255 / 100);
      if (s === 0) {
        rgb = {
          r: v,
          g: v,
          b: v
        };
      } else {
        var t1 = v;
        var t2 = (255 - s) * v / 255;
        var t3 = (t1 - t2) * (h % 60) / 60;
        if (h === 360) h = 0;
        if (h < 60) {
          rgb.r = t1;
          rgb.b = t2;
          rgb.g = t2 + t3;
        } else if (h < 120) {
          rgb.g = t1;
          rgb.b = t2;
          rgb.r = t1 - t3;
        } else if (h < 180) {
          rgb.g = t1;
          rgb.r = t2;
          rgb.b = t2 + t3;
        } else if (h < 240) {
          rgb.b = t1;
          rgb.r = t2;
          rgb.g = t1 - t3;
        } else if (h < 300) {
          rgb.b = t1;
          rgb.g = t2;
          rgb.r = t2 + t3;
        } else if (h < 360) {
          rgb.r = t1;
          rgb.g = t2;
          rgb.b = t1 - t3;
        } else {
          rgb.r = 0;
          rgb.g = 0;
          rgb.b = 0;
        }
      }
      return {
        r: Math.round(rgb.r),
        g: Math.round(rgb.g),
        b: Math.round(rgb.b)
      };
    },
    RGBtoHEX: function RGBtoHEX(rgb) {
      var hex = [rgb.r.toString(16), rgb.g.toString(16), rgb.b.toString(16)];
      for (var key in hex) {
        if (hex[key].length === 1) {
          hex[key] = '0' + hex[key];
        }
      }
      return hex.join('');
    },
    HSBtoHEX: function HSBtoHEX(hsb) {
      return this.RGBtoHEX(this.HSBtoRGB(hsb));
    },
    toHSB: function toHSB(value) {
      var hsb;
      if (value) {
        switch (this.format) {
          case 'hex':
            hsb = this.HEXtoHSB(value);
            break;
          case 'rgb':
            hsb = this.RGBtoHSB(value);
            break;
          case 'hsb':
            hsb = value;
            break;
        }
      } else {
        hsb = this.HEXtoHSB(this.defaultColor);
      }
      return hsb;
    },
    onOverlayEnter: function onOverlayEnter(el) {
      this.updateUI();
      this.alignOverlay();
      this.bindOutsideClickListener();
      this.bindScrollListener();
      this.bindResizeListener();
      if (this.autoZIndex) {
        utils.ZIndexUtils.set('overlay', el, this.baseZIndex, this.$primevue.config.zIndex.overlay);
      }
      this.$emit('show');
    },
    onOverlayLeave: function onOverlayLeave() {
      this.unbindOutsideClickListener();
      this.unbindScrollListener();
      this.unbindResizeListener();
      this.clearRefs();
      this.$emit('hide');
    },
    onOverlayAfterLeave: function onOverlayAfterLeave(el) {
      if (this.autoZIndex) {
        utils.ZIndexUtils.clear(el);
      }
    },
    alignOverlay: function alignOverlay() {
      if (this.appendTo === 'self') utils.DomHandler.relativePosition(this.picker, this.$refs.input);else utils.DomHandler.absolutePosition(this.picker, this.$refs.input);
    },
    onInputClick: function onInputClick() {
      if (this.disabled) {
        return;
      }
      this.overlayVisible = !this.overlayVisible;
    },
    onInputKeydown: function onInputKeydown(event) {
      switch (event.code) {
        case 'Space':
          this.overlayVisible = !this.overlayVisible;
          event.preventDefault();
          break;
        case 'Escape':
        case 'Tab':
          this.overlayVisible = false;
          break;
      }
    },
    onColorMousedown: function onColorMousedown(event) {
      if (this.disabled) {
        return;
      }
      this.bindDragListeners();
      this.onColorDragStart(event);
    },
    onColorDragStart: function onColorDragStart(event) {
      if (this.disabled) {
        return;
      }
      this.colorDragging = true;
      this.pickColor(event);
      this.$el.setAttribute('p-colorpicker-dragging', 'true');
      !this.isUnstyled && utils.DomHandler.addClass(this.$el, 'p-colorpicker-dragging');
      event.preventDefault();
    },
    onDrag: function onDrag(event) {
      if (this.colorDragging) {
        this.pickColor(event);
        event.preventDefault();
      }
      if (this.hueDragging) {
        this.pickHue(event);
        event.preventDefault();
      }
    },
    onDragEnd: function onDragEnd() {
      this.colorDragging = false;
      this.hueDragging = false;
      this.$el.setAttribute('p-colorpicker-dragging', 'false');
      !this.isUnstyled && utils.DomHandler.removeClass(this.$el, 'p-colorpicker-dragging');
      this.unbindDragListeners();
    },
    onHueMousedown: function onHueMousedown(event) {
      if (this.disabled) {
        return;
      }
      this.bindDragListeners();
      this.onHueDragStart(event);
    },
    onHueDragStart: function onHueDragStart(event) {
      if (this.disabled) {
        return;
      }
      this.hueDragging = true;
      this.pickHue(event);
      !this.isUnstyled && utils.DomHandler.addClass(this.$el, 'p-colorpicker-dragging');
    },
    isInputClicked: function isInputClicked(event) {
      return this.$refs.input && this.$refs.input.isSameNode(event.target);
    },
    bindDragListeners: function bindDragListeners() {
      this.bindDocumentMouseMoveListener();
      this.bindDocumentMouseUpListener();
    },
    unbindDragListeners: function unbindDragListeners() {
      this.unbindDocumentMouseMoveListener();
      this.unbindDocumentMouseUpListener();
    },
    bindOutsideClickListener: function bindOutsideClickListener() {
      var _this = this;
      if (!this.outsideClickListener) {
        this.outsideClickListener = function (event) {
          if (_this.overlayVisible && _this.picker && !_this.picker.contains(event.target) && !_this.isInputClicked(event)) {
            _this.overlayVisible = false;
          }
        };
        document.addEventListener('click', this.outsideClickListener);
      }
    },
    unbindOutsideClickListener: function unbindOutsideClickListener() {
      if (this.outsideClickListener) {
        document.removeEventListener('click', this.outsideClickListener);
        this.outsideClickListener = null;
      }
    },
    bindScrollListener: function bindScrollListener() {
      var _this2 = this;
      if (!this.scrollHandler) {
        this.scrollHandler = new utils.ConnectedOverlayScrollHandler(this.$refs.container, function () {
          if (_this2.overlayVisible) {
            _this2.overlayVisible = false;
          }
        });
      }
      this.scrollHandler.bindScrollListener();
    },
    unbindScrollListener: function unbindScrollListener() {
      if (this.scrollHandler) {
        this.scrollHandler.unbindScrollListener();
      }
    },
    bindResizeListener: function bindResizeListener() {
      var _this3 = this;
      if (!this.resizeListener) {
        this.resizeListener = function () {
          if (_this3.overlayVisible && !utils.DomHandler.isTouchDevice()) {
            _this3.overlayVisible = false;
          }
        };
        window.addEventListener('resize', this.resizeListener);
      }
    },
    unbindResizeListener: function unbindResizeListener() {
      if (this.resizeListener) {
        window.removeEventListener('resize', this.resizeListener);
        this.resizeListener = null;
      }
    },
    bindDocumentMouseMoveListener: function bindDocumentMouseMoveListener() {
      if (!this.documentMouseMoveListener) {
        this.documentMouseMoveListener = this.onDrag.bind(this);
        document.addEventListener('mousemove', this.documentMouseMoveListener);
      }
    },
    unbindDocumentMouseMoveListener: function unbindDocumentMouseMoveListener() {
      if (this.documentMouseMoveListener) {
        document.removeEventListener('mousemove', this.documentMouseMoveListener);
        this.documentMouseMoveListener = null;
      }
    },
    bindDocumentMouseUpListener: function bindDocumentMouseUpListener() {
      if (!this.documentMouseUpListener) {
        this.documentMouseUpListener = this.onDragEnd.bind(this);
        document.addEventListener('mouseup', this.documentMouseUpListener);
      }
    },
    unbindDocumentMouseUpListener: function unbindDocumentMouseUpListener() {
      if (this.documentMouseUpListener) {
        document.removeEventListener('mouseup', this.documentMouseUpListener);
        this.documentMouseUpListener = null;
      }
    },
    pickerRef: function pickerRef(el) {
      this.picker = el;
    },
    colorSelectorRef: function colorSelectorRef(el) {
      this.colorSelector = el;
    },
    colorHandleRef: function colorHandleRef(el) {
      this.colorHandle = el;
    },
    hueViewRef: function hueViewRef(el) {
      this.hueView = el;
    },
    hueHandleRef: function hueHandleRef(el) {
      this.hueHandle = el;
    },
    clearRefs: function clearRefs() {
      this.picker = null;
      this.colorSelector = null;
      this.colorHandle = null;
      this.hueView = null;
      this.hueHandle = null;
    },
    onOverlayClick: function onOverlayClick(event) {
      OverlayEventBus__default["default"].emit('overlay-click', {
        originalEvent: event,
        target: this.$el
      });
    }
  },
  components: {
    Portal: Portal__default["default"]
  }
};

var _hoisted_1 = ["tabindex", "disabled"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_Portal = vue.resolveComponent("Portal");
  return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
    ref: "container",
    "class": _ctx.cx('root')
  }, _ctx.ptmi('root')), [!_ctx.inline ? (vue.openBlock(), vue.createElementBlock("input", vue.mergeProps({
    key: 0,
    ref: "input",
    type: "text",
    "class": _ctx.cx('input'),
    readonly: "readonly",
    tabindex: _ctx.tabindex,
    disabled: _ctx.disabled,
    onClick: _cache[0] || (_cache[0] = function () {
      return $options.onInputClick && $options.onInputClick.apply($options, arguments);
    }),
    onKeydown: _cache[1] || (_cache[1] = function () {
      return $options.onInputKeydown && $options.onInputKeydown.apply($options, arguments);
    })
  }, _ctx.ptm('input')), null, 16, _hoisted_1)) : vue.createCommentVNode("", true), vue.createVNode(_component_Portal, {
    appendTo: _ctx.appendTo,
    disabled: _ctx.inline
  }, {
    "default": vue.withCtx(function () {
      return [vue.createVNode(vue.Transition, vue.mergeProps({
        name: "p-connected-overlay",
        onEnter: $options.onOverlayEnter,
        onLeave: $options.onOverlayLeave,
        onAfterLeave: $options.onOverlayAfterLeave
      }, _ctx.ptm('transition')), {
        "default": vue.withCtx(function () {
          return [(_ctx.inline ? true : $data.overlayVisible) ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
            key: 0,
            ref: $options.pickerRef,
            "class": [_ctx.cx('panel'), _ctx.panelClass],
            onClick: _cache[10] || (_cache[10] = function () {
              return $options.onOverlayClick && $options.onOverlayClick.apply($options, arguments);
            })
          }, _ctx.ptm('panel')), [vue.createElementVNode("div", vue.mergeProps({
            "class": _ctx.cx('content')
          }, _ctx.ptm('content')), [vue.createElementVNode("div", vue.mergeProps({
            ref: $options.colorSelectorRef,
            "class": _ctx.cx('selector'),
            onMousedown: _cache[2] || (_cache[2] = function ($event) {
              return $options.onColorMousedown($event);
            }),
            onTouchstart: _cache[3] || (_cache[3] = function ($event) {
              return $options.onColorDragStart($event);
            }),
            onTouchmove: _cache[4] || (_cache[4] = function ($event) {
              return $options.onDrag($event);
            }),
            onTouchend: _cache[5] || (_cache[5] = function ($event) {
              return $options.onDragEnd();
            })
          }, _ctx.ptm('selector')), [vue.createElementVNode("div", vue.mergeProps({
            "class": _ctx.cx('color')
          }, _ctx.ptm('color')), [vue.createElementVNode("div", vue.mergeProps({
            ref: $options.colorHandleRef,
            "class": _ctx.cx('colorHandle')
          }, _ctx.ptm('colorHandle')), null, 16)], 16)], 16), vue.createElementVNode("div", vue.mergeProps({
            ref: $options.hueViewRef,
            "class": _ctx.cx('hue'),
            onMousedown: _cache[6] || (_cache[6] = function ($event) {
              return $options.onHueMousedown($event);
            }),
            onTouchstart: _cache[7] || (_cache[7] = function ($event) {
              return $options.onHueDragStart($event);
            }),
            onTouchmove: _cache[8] || (_cache[8] = function ($event) {
              return $options.onDrag($event);
            }),
            onTouchend: _cache[9] || (_cache[9] = function ($event) {
              return $options.onDragEnd();
            })
          }, _ctx.ptm('hue')), [vue.createElementVNode("div", vue.mergeProps({
            ref: $options.hueHandleRef,
            "class": _ctx.cx('hueHandle')
          }, _ctx.ptm('hueHandle')), null, 16)], 16)], 16)], 16)) : vue.createCommentVNode("", true)];
        }),
        _: 1
      }, 16, ["onEnter", "onLeave", "onAfterLeave"])];
    }),
    _: 1
  }, 8, ["appendTo", "disabled"])], 16);
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = "\n.p-colorpicker {\n    display: inline-block;\n}\n.p-colorpicker-dragging {\n    cursor: pointer;\n}\n.p-colorpicker-overlay {\n    position: relative;\n}\n.p-colorpicker-panel {\n    position: relative;\n    width: 193px;\n    height: 166px;\n}\n.p-colorpicker-overlay-panel {\n    position: absolute;\n    top: 0;\n    left: 0;\n}\n.p-colorpicker-preview {\n    cursor: pointer;\n}\n.p-colorpicker-panel .p-colorpicker-content {\n    position: relative;\n}\n.p-colorpicker-panel .p-colorpicker-color-selector {\n    width: 150px;\n    height: 150px;\n    top: 8px;\n    left: 8px;\n    position: absolute;\n}\n.p-colorpicker-panel .p-colorpicker-color {\n    width: 150px;\n    height: 150px;\n}\n.p-colorpicker-panel .p-colorpicker-color-handle {\n    position: absolute;\n    top: 0px;\n    left: 150px;\n    border-radius: 100%;\n    width: 10px;\n    height: 10px;\n    border-width: 1px;\n    border-style: solid;\n    margin: -5px 0 0 -5px;\n    cursor: pointer;\n    opacity: 0.85;\n}\n.p-colorpicker-panel .p-colorpicker-hue {\n    width: 17px;\n    height: 150px;\n    top: 8px;\n    left: 167px;\n    position: absolute;\n    opacity: 0.85;\n}\n.p-colorpicker-panel .p-colorpicker-hue-handle {\n    position: absolute;\n    top: 150px;\n    left: 0px;\n    width: 21px;\n    margin-left: -2px;\n    margin-top: -5px;\n    height: 10px;\n    border-width: 2px;\n    border-style: solid;\n    opacity: 0.85;\n    cursor: pointer;\n}\n";
styleInject(css_248z);

script.render = render;

module.exports = script;
