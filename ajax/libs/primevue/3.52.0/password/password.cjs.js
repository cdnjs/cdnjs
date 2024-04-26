'use strict';

var EyeIcon = require('primevue/icons/eye');
var EyeSlashIcon = require('primevue/icons/eyeslash');
var InputText = require('primevue/inputtext');
var OverlayEventBus = require('primevue/overlayeventbus');
var Portal = require('primevue/portal');
var utils = require('primevue/utils');
var BaseComponent = require('primevue/basecomponent');
var PasswordStyle = require('primevue/password/style');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var EyeIcon__default = /*#__PURE__*/_interopDefaultLegacy(EyeIcon);
var EyeSlashIcon__default = /*#__PURE__*/_interopDefaultLegacy(EyeSlashIcon);
var InputText__default = /*#__PURE__*/_interopDefaultLegacy(InputText);
var OverlayEventBus__default = /*#__PURE__*/_interopDefaultLegacy(OverlayEventBus);
var Portal__default = /*#__PURE__*/_interopDefaultLegacy(Portal);
var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);
var PasswordStyle__default = /*#__PURE__*/_interopDefaultLegacy(PasswordStyle);

var script$1 = {
  name: 'BasePassword',
  "extends": BaseComponent__default["default"],
  props: {
    modelValue: String,
    promptLabel: {
      type: String,
      "default": null
    },
    mediumRegex: {
      type: String,
      "default": '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})' // eslint-disable-line
    },
    strongRegex: {
      type: String,
      "default": '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})' // eslint-disable-line
    },
    weakLabel: {
      type: String,
      "default": null
    },
    mediumLabel: {
      type: String,
      "default": null
    },
    strongLabel: {
      type: String,
      "default": null
    },
    feedback: {
      type: Boolean,
      "default": true
    },
    appendTo: {
      type: [String, Object],
      "default": 'body'
    },
    toggleMask: {
      type: Boolean,
      "default": false
    },
    hideIcon: {
      type: String,
      "default": undefined
    },
    showIcon: {
      type: String,
      "default": undefined
    },
    variant: {
      type: String,
      "default": null
    },
    invalid: {
      type: Boolean,
      "default": false
    },
    disabled: {
      type: Boolean,
      "default": false
    },
    placeholder: {
      type: String,
      "default": null
    },
    required: {
      type: Boolean,
      "default": false
    },
    inputId: {
      type: String,
      "default": null
    },
    inputClass: {
      type: [String, Object],
      "default": null
    },
    inputStyle: {
      type: Object,
      "default": null
    },
    inputProps: {
      type: null,
      "default": null
    },
    panelId: {
      type: String,
      "default": null
    },
    panelClass: {
      type: [String, Object],
      "default": null
    },
    panelStyle: {
      type: Object,
      "default": null
    },
    panelProps: {
      type: null,
      "default": null
    },
    ariaLabelledby: {
      type: String,
      "default": null
    },
    ariaLabel: {
      type: String,
      "default": null
    }
  },
  style: PasswordStyle__default["default"],
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};

var script = {
  name: 'Password',
  "extends": script$1,
  inheritAttrs: false,
  emits: ['update:modelValue', 'change', 'focus', 'blur', 'invalid'],
  data: function data() {
    return {
      id: this.$attrs.id,
      overlayVisible: false,
      meter: null,
      infoText: null,
      focused: false,
      unmasked: false
    };
  },
  watch: {
    '$attrs.id': function $attrsId(newValue) {
      this.id = newValue || utils.UniqueComponentId();
    }
  },
  mediumCheckRegExp: null,
  strongCheckRegExp: null,
  resizeListener: null,
  scrollHandler: null,
  overlay: null,
  mounted: function mounted() {
    this.id = this.id || utils.UniqueComponentId();
    this.infoText = this.promptText;
    this.mediumCheckRegExp = new RegExp(this.mediumRegex);
    this.strongCheckRegExp = new RegExp(this.strongRegex);
  },
  beforeUnmount: function beforeUnmount() {
    this.unbindResizeListener();
    if (this.scrollHandler) {
      this.scrollHandler.destroy();
      this.scrollHandler = null;
    }
    if (this.overlay) {
      utils.ZIndexUtils.clear(this.overlay);
      this.overlay = null;
    }
  },
  methods: {
    onOverlayEnter: function onOverlayEnter(el) {
      utils.ZIndexUtils.set('overlay', el, this.$primevue.config.zIndex.overlay);
      utils.DomHandler.addStyles(el, {
        position: 'absolute',
        top: '0',
        left: '0'
      });
      this.alignOverlay();
      this.bindScrollListener();
      this.bindResizeListener();
    },
    onOverlayLeave: function onOverlayLeave() {
      this.unbindScrollListener();
      this.unbindResizeListener();
      this.overlay = null;
    },
    onOverlayAfterLeave: function onOverlayAfterLeave(el) {
      utils.ZIndexUtils.clear(el);
    },
    alignOverlay: function alignOverlay() {
      if (this.appendTo === 'self') {
        utils.DomHandler.relativePosition(this.overlay, this.$refs.input.$el);
      } else {
        this.overlay.style.minWidth = utils.DomHandler.getOuterWidth(this.$refs.input.$el) + 'px';
        utils.DomHandler.absolutePosition(this.overlay, this.$refs.input.$el);
      }
    },
    testStrength: function testStrength(str) {
      var level = 0;
      if (this.strongCheckRegExp.test(str)) level = 3;else if (this.mediumCheckRegExp.test(str)) level = 2;else if (str.length) level = 1;
      return level;
    },
    onInput: function onInput(event) {
      this.$emit('update:modelValue', event.target.value);
      this.$emit('change', event);
    },
    onFocus: function onFocus(event) {
      this.focused = true;
      if (this.feedback) {
        this.setPasswordMeter(this.modelValue);
        this.overlayVisible = true;
      }
      this.$emit('focus', event);
    },
    onBlur: function onBlur(event) {
      this.focused = false;
      if (this.feedback) {
        this.overlayVisible = false;
      }
      this.$emit('blur', event);
    },
    onKeyUp: function onKeyUp(event) {
      if (this.feedback) {
        var value = event.target.value;
        var _this$checkPasswordSt = this.checkPasswordStrength(value),
          meter = _this$checkPasswordSt.meter,
          label = _this$checkPasswordSt.label;
        this.meter = meter;
        this.infoText = label;
        if (event.code === 'Escape') {
          this.overlayVisible && (this.overlayVisible = false);
          return;
        }
        if (!this.overlayVisible) {
          this.overlayVisible = true;
        }
      }
    },
    setPasswordMeter: function setPasswordMeter() {
      if (!this.modelValue) {
        this.meter = null;
        this.infoText = this.promptText;
        return;
      }
      var _this$checkPasswordSt2 = this.checkPasswordStrength(this.modelValue),
        meter = _this$checkPasswordSt2.meter,
        label = _this$checkPasswordSt2.label;
      this.meter = meter;
      this.infoText = label;
      if (!this.overlayVisible) {
        this.overlayVisible = true;
      }
    },
    checkPasswordStrength: function checkPasswordStrength(value) {
      var label = null;
      var meter = null;
      switch (this.testStrength(value)) {
        case 1:
          label = this.weakText;
          meter = {
            strength: 'weak',
            width: '33.33%'
          };
          break;
        case 2:
          label = this.mediumText;
          meter = {
            strength: 'medium',
            width: '66.66%'
          };
          break;
        case 3:
          label = this.strongText;
          meter = {
            strength: 'strong',
            width: '100%'
          };
          break;
        default:
          label = this.promptText;
          meter = null;
          break;
      }
      return {
        label: label,
        meter: meter
      };
    },
    onInvalid: function onInvalid(event) {
      this.$emit('invalid', event);
    },
    bindScrollListener: function bindScrollListener() {
      var _this = this;
      if (!this.scrollHandler) {
        this.scrollHandler = new utils.ConnectedOverlayScrollHandler(this.$refs.input.$el, function () {
          if (_this.overlayVisible) {
            _this.overlayVisible = false;
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
      var _this2 = this;
      if (!this.resizeListener) {
        this.resizeListener = function () {
          if (_this2.overlayVisible && !utils.DomHandler.isTouchDevice()) {
            _this2.overlayVisible = false;
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
    overlayRef: function overlayRef(el) {
      this.overlay = el;
    },
    onMaskToggle: function onMaskToggle() {
      this.unmasked = !this.unmasked;
    },
    onOverlayClick: function onOverlayClick(event) {
      OverlayEventBus__default["default"].emit('overlay-click', {
        originalEvent: event,
        target: this.$el
      });
    }
  },
  computed: {
    inputType: function inputType() {
      return this.unmasked ? 'text' : 'password';
    },
    filled: function filled() {
      return this.modelValue != null && this.modelValue.toString().length > 0;
    },
    weakText: function weakText() {
      return this.weakLabel || this.$primevue.config.locale.weak;
    },
    mediumText: function mediumText() {
      return this.mediumLabel || this.$primevue.config.locale.medium;
    },
    strongText: function strongText() {
      return this.strongLabel || this.$primevue.config.locale.strong;
    },
    promptText: function promptText() {
      return this.promptLabel || this.$primevue.config.locale.passwordPrompt;
    },
    panelUniqueId: function panelUniqueId() {
      return this.id + '_panel';
    }
  },
  components: {
    PInputText: InputText__default["default"],
    Portal: Portal__default["default"],
    EyeSlashIcon: EyeSlashIcon__default["default"],
    EyeIcon: EyeIcon__default["default"]
  }
};

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var _hoisted_1 = ["id"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_PInputText = vue.resolveComponent("PInputText");
  var _component_Portal = vue.resolveComponent("Portal");
  return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
    "class": _ctx.cx('root'),
    style: _ctx.sx('root')
  }, _ctx.ptmi('root')), [vue.createVNode(_component_PInputText, vue.mergeProps({
    ref: "input",
    id: _ctx.inputId,
    type: $options.inputType,
    "class": [_ctx.cx('input'), _ctx.inputClass],
    style: _ctx.inputStyle,
    value: _ctx.modelValue,
    "aria-labelledby": _ctx.ariaLabelledby,
    "aria-label": _ctx.ariaLabel,
    "aria-controls": _ctx.panelProps && _ctx.panelProps.id || _ctx.panelId || $options.panelUniqueId,
    "aria-expanded": $data.overlayVisible,
    "aria-haspopup": true,
    placeholder: _ctx.placeholder,
    required: _ctx.required,
    disabled: _ctx.disabled,
    variant: _ctx.variant,
    invalid: _ctx.invalid,
    onInput: $options.onInput,
    onFocus: $options.onFocus,
    onBlur: $options.onBlur,
    onKeyup: $options.onKeyUp,
    onInvalid: $options.onInvalid
  }, _ctx.inputProps, {
    pt: _ctx.ptm('input'),
    unstyled: _ctx.unstyled
  }), null, 16, ["id", "type", "class", "style", "value", "aria-labelledby", "aria-label", "aria-controls", "aria-expanded", "placeholder", "required", "disabled", "variant", "invalid", "onInput", "onFocus", "onBlur", "onKeyup", "onInvalid", "pt", "unstyled"]), _ctx.toggleMask && $data.unmasked ? vue.renderSlot(_ctx.$slots, "hideicon", {
    key: 0,
    onClick: $options.onMaskToggle,
    toggleCallback: $options.onMaskToggle
  }, function () {
    return [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.hideIcon ? 'i' : 'EyeSlashIcon'), vue.mergeProps({
      "class": [_ctx.cx('hideIcon'), _ctx.hideIcon],
      onClick: $options.onMaskToggle
    }, _ctx.ptm('hideIcon')), null, 16, ["class", "onClick"]))];
  }) : vue.createCommentVNode("", true), _ctx.toggleMask && !$data.unmasked ? vue.renderSlot(_ctx.$slots, "showicon", {
    key: 1,
    onClick: $options.onMaskToggle,
    toggleCallback: $options.onMaskToggle
  }, function () {
    return [(vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.showIcon ? 'i' : 'EyeIcon'), vue.mergeProps({
      "class": [_ctx.cx('showIcon'), _ctx.showIcon],
      onClick: $options.onMaskToggle
    }, _ctx.ptm('showIcon')), null, 16, ["class", "onClick"]))];
  }) : vue.createCommentVNode("", true), vue.createElementVNode("span", vue.mergeProps({
    "class": "p-hidden-accessible",
    "aria-live": "polite"
  }, _ctx.ptm('hiddenAccesible'), {
    "data-p-hidden-accessible": true
  }), vue.toDisplayString($data.infoText), 17), vue.createVNode(_component_Portal, {
    appendTo: _ctx.appendTo
  }, {
    "default": vue.withCtx(function () {
      return [vue.createVNode(vue.Transition, vue.mergeProps({
        name: "p-connected-overlay",
        onEnter: $options.onOverlayEnter,
        onLeave: $options.onOverlayLeave,
        onAfterLeave: $options.onOverlayAfterLeave
      }, _ctx.ptm('transition')), {
        "default": vue.withCtx(function () {
          return [$data.overlayVisible ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
            key: 0,
            ref: $options.overlayRef,
            id: _ctx.panelId || $options.panelUniqueId,
            "class": [_ctx.cx('panel'), _ctx.panelClass],
            style: _ctx.panelStyle,
            onClick: _cache[0] || (_cache[0] = function () {
              return $options.onOverlayClick && $options.onOverlayClick.apply($options, arguments);
            })
          }, _objectSpread(_objectSpread({}, _ctx.panelProps), _ctx.ptm('panel'))), [vue.renderSlot(_ctx.$slots, "header"), vue.renderSlot(_ctx.$slots, "content", {}, function () {
            return [vue.createElementVNode("div", vue.mergeProps({
              "class": _ctx.cx('meter')
            }, _ctx.ptm('meter')), [vue.createElementVNode("div", vue.mergeProps({
              "class": _ctx.cx('meterLabel'),
              style: {
                width: $data.meter ? $data.meter.width : ''
              }
            }, _ctx.ptm('meterLabel')), null, 16)], 16), vue.createElementVNode("div", vue.mergeProps({
              "class": _ctx.cx('info')
            }, _ctx.ptm('info')), vue.toDisplayString($data.infoText), 17)];
          }), vue.renderSlot(_ctx.$slots, "footer")], 16, _hoisted_1)) : vue.createCommentVNode("", true)];
        }),
        _: 3
      }, 16, ["onEnter", "onLeave", "onAfterLeave"])];
    }),
    _: 3
  }, 8, ["appendTo"])], 16);
}

script.render = render;

module.exports = script;
