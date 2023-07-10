import EyeIcon from 'primevue/icons/eye';
import EyeSlashIcon from 'primevue/icons/eyeslash';
import InputText from 'primevue/inputtext';
import OverlayEventBus from 'primevue/overlayeventbus';
import Portal from 'primevue/portal';
import { ZIndexUtils, DomHandler, ConnectedOverlayScrollHandler, UniqueComponentId } from 'primevue/utils';
import BaseComponent from 'primevue/basecomponent';
import { useStyle } from 'primevue/usestyle';
import { resolveComponent, openBlock, createElementBlock, mergeProps, createVNode, renderSlot, createBlock, resolveDynamicComponent, createCommentVNode, createElementVNode, toDisplayString, withCtx, Transition } from 'vue';

var styles = "\n.p-password {\n    display: inline-flex;\n}\n\n.p-password .p-password-panel {\n    min-width: 100%;\n}\n\n.p-password-meter {\n    height: 10px;\n}\n\n.p-password-strength {\n    height: 100%;\n    width: 0;\n    transition: width 1s ease-in-out;\n}\n\n.p-fluid .p-password {\n    display: flex;\n}\n\n.p-password-input::-ms-reveal,\n.p-password-input::-ms-clear {\n    display: none;\n}\n";
var inlineStyles = {
  root: function root(_ref) {
    var props = _ref.props;
    return {
      position: props.appendTo === 'self' ? 'relative' : undefined
    };
  }
};
var classes = {
  root: function root(_ref2) {
    var instance = _ref2.instance,
      props = _ref2.props;
    return ['p-password p-component p-inputwrapper', {
      'p-inputwrapper-filled': instance.filled,
      'p-inputwrapper-focus': instance.focused,
      'p-input-icon-right': props.toggleMask
    }];
  },
  input: function input(_ref3) {
    var props = _ref3.props;
    return ['p-password-input', {
      'p-disabled': props.disabled
    }];
  },
  panel: function panel(_ref4) {
    var instance = _ref4.instance;
    return ['p-password-panel p-component', {
      'p-input-filled': instance.$primevue.config.inputStyle === 'filled',
      'p-ripple-disabled': instance.$primevue.config.ripple === false
    }];
  },
  meter: 'p-password-meter',
  meterLabel: function meterLabel(_ref5) {
    var instance = _ref5.instance;
    return "p-password-strength ".concat(instance.meter ? instance.meter.strength : '');
  },
  info: 'p-password-info'
};
var _useStyle = useStyle(styles, {
    name: 'password',
    manual: true
  }),
  loadStyle = _useStyle.load;
var script$1 = {
  name: 'BasePassword',
  "extends": BaseComponent,
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
      type: String,
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
    'aria-labelledby': {
      type: String,
      "default": null
    },
    'aria-label': {
      type: String,
      "default": null
    }
  },
  css: {
    classes: classes,
    inlineStyles: inlineStyles,
    loadStyle: loadStyle
  },
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};

var script = {
  name: 'Password',
  "extends": script$1,
  emits: ['update:modelValue', 'change', 'focus', 'blur', 'invalid'],
  data: function data() {
    return {
      overlayVisible: false,
      meter: null,
      infoText: null,
      focused: false,
      unmasked: false
    };
  },
  mediumCheckRegExp: null,
  strongCheckRegExp: null,
  resizeListener: null,
  scrollHandler: null,
  overlay: null,
  mounted: function mounted() {
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
      ZIndexUtils.clear(this.overlay);
      this.overlay = null;
    }
  },
  methods: {
    onOverlayEnter: function onOverlayEnter(el) {
      ZIndexUtils.set('overlay', el, this.$primevue.config.zIndex.overlay);
      DomHandler.addStyles(el, {
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
      ZIndexUtils.clear(el);
    },
    alignOverlay: function alignOverlay() {
      if (this.appendTo === 'self') {
        DomHandler.relativePosition(this.overlay, this.$refs.input.$el);
      } else {
        this.overlay.style.minWidth = DomHandler.getOuterWidth(this.$refs.input.$el) + 'px';
        DomHandler.absolutePosition(this.overlay, this.$refs.input.$el);
      }
    },
    testStrength: function testStrength(str) {
      var level = 0;
      if (this.strongCheckRegExp.test(str)) level = 3;else if (this.mediumCheckRegExp.test(str)) level = 2;else if (str.length) level = 1;
      return level;
    },
    onInput: function onInput(event) {
      this.$emit('update:modelValue', event.target.value);
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
      if (!this.modelValue) return;
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
        this.scrollHandler = new ConnectedOverlayScrollHandler(this.$refs.input.$el, function () {
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
          if (_this2.overlayVisible && !DomHandler.isTouchDevice()) {
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
      OverlayEventBus.emit('overlay-click', {
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
      return UniqueComponentId() + '_panel';
    }
  },
  components: {
    PInputText: InputText,
    Portal: Portal,
    EyeSlashIcon: EyeSlashIcon,
    EyeIcon: EyeIcon
  }
};

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var _hoisted_1 = ["id"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_PInputText = resolveComponent("PInputText");
  var _component_Portal = resolveComponent("Portal");
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx('root'),
    style: _ctx.sx('root')
  }, _ctx.ptm('root'), {
    "data-pc-name": "password"
  }), [createVNode(_component_PInputText, mergeProps({
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
    onInput: $options.onInput,
    onFocus: $options.onFocus,
    onBlur: $options.onBlur,
    onKeyup: $options.onKeyUp,
    onInvalid: $options.onInvalid
  }, _objectSpread(_objectSpread({}, _ctx.inputProps), _ctx.ptm('input')), {
    unstyled: _ctx.unstyled
  }), null, 16, ["id", "type", "class", "style", "value", "aria-labelledby", "aria-label", "aria-controls", "aria-expanded", "placeholder", "required", "onInput", "onFocus", "onBlur", "onKeyup", "onInvalid", "unstyled"]), _ctx.toggleMask && $data.unmasked ? renderSlot(_ctx.$slots, "hideicon", {
    key: 0,
    onClick: $options.onMaskToggle
  }, function () {
    return [(openBlock(), createBlock(resolveDynamicComponent(_ctx.hideIcon ? 'i' : 'EyeSlashIcon'), mergeProps({
      "class": _ctx.hideIcon,
      onClick: $options.onMaskToggle
    }, _ctx.ptm('hideIcon')), null, 16, ["class", "onClick"]))];
  }) : createCommentVNode("", true), _ctx.toggleMask && !$data.unmasked ? renderSlot(_ctx.$slots, "showicon", {
    key: 1,
    onClick: $options.onMaskToggle
  }, function () {
    return [(openBlock(), createBlock(resolveDynamicComponent(_ctx.showIcon ? 'i' : 'EyeIcon'), mergeProps({
      "class": _ctx.showIcon,
      onClick: $options.onMaskToggle
    }, _ctx.ptm('showIcon')), null, 16, ["class", "onClick"]))];
  }) : createCommentVNode("", true), createElementVNode("span", mergeProps({
    "class": "p-hidden-accessible",
    "aria-live": "polite"
  }, _ctx.ptm('hiddenAccesible'), {
    "data-p-hidden-accessible": true
  }), toDisplayString($data.infoText), 17), createVNode(_component_Portal, {
    appendTo: _ctx.appendTo
  }, {
    "default": withCtx(function () {
      return [createVNode(Transition, {
        name: "p-connected-overlay",
        onEnter: $options.onOverlayEnter,
        onLeave: $options.onOverlayLeave,
        onAfterLeave: $options.onOverlayAfterLeave
      }, {
        "default": withCtx(function () {
          return [$data.overlayVisible ? (openBlock(), createElementBlock("div", mergeProps({
            key: 0,
            ref: $options.overlayRef,
            id: _ctx.panelId || $options.panelUniqueId,
            "class": [_ctx.cx('panel'), _ctx.panelClass],
            style: _ctx.panelStyle,
            onClick: _cache[0] || (_cache[0] = function () {
              return $options.onOverlayClick && $options.onOverlayClick.apply($options, arguments);
            })
          }, _objectSpread(_objectSpread({}, _ctx.panelProps), _ctx.ptm('panel'))), [renderSlot(_ctx.$slots, "header"), renderSlot(_ctx.$slots, "content", {}, function () {
            return [createElementVNode("div", mergeProps({
              "class": _ctx.cx('meter')
            }, _ctx.ptm('meter')), [createElementVNode("div", mergeProps({
              "class": _ctx.cx('meterLabel'),
              style: {
                width: $data.meter ? $data.meter.width : ''
              }
            }, _ctx.ptm('meterLabel')), null, 16)], 16), createElementVNode("div", mergeProps({
              "class": _ctx.cx('info')
            }, _ctx.ptm('info')), toDisplayString($data.infoText), 17)];
          }), renderSlot(_ctx.$slots, "footer")], 16, _hoisted_1)) : createCommentVNode("", true)];
        }),
        _: 3
      }, 8, ["onEnter", "onLeave", "onAfterLeave"])];
    }),
    _: 3
  }, 8, ["appendTo"])], 16);
}

script.render = render;

export { script as default };
