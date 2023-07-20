import Portal from 'primevue/portal';
import ToastEventBus from 'primevue/toasteventbus';
import { ZIndexUtils, ObjectUtils, UniqueComponentId } from 'primevue/utils';
import BaseComponent from 'primevue/basecomponent';
import { useStyle } from 'primevue/usestyle';
import CheckIcon from 'primevue/icons/check';
import ExclamationTriangleIcon from 'primevue/icons/exclamationtriangle';
import InfoCircleIcon from 'primevue/icons/infocircle';
import TimesIcon from 'primevue/icons/times';
import TimesCircleIcon from 'primevue/icons/timescircle';
import Ripple from 'primevue/ripple';
import { resolveDirective, openBlock, createElementBlock, mergeProps, createElementVNode, Fragment, createBlock, resolveDynamicComponent, toDisplayString, normalizeProps, withDirectives, createCommentVNode, resolveComponent, withCtx, createVNode, TransitionGroup, renderList } from 'vue';

function _typeof$2(obj) { "@babel/helpers - typeof"; return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$2(obj); }
function _defineProperty$2(obj, key, value) { key = _toPropertyKey$2(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$2(arg) { var key = _toPrimitive$2(arg, "string"); return _typeof$2(key) === "symbol" ? key : String(key); }
function _toPrimitive$2(input, hint) { if (_typeof$2(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$2(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var styles = "\n.p-toast {\n    width: 25rem;\n}\n\n.p-toast-message-content {\n    display: flex;\n    align-items: flex-start;\n}\n\n.p-toast-message-text {\n    flex: 1 1 auto;\n}\n\n.p-toast-top-center {\n    transform: translateX(-50%);\n}\n\n.p-toast-bottom-center {\n    transform: translateX(-50%);\n}\n\n.p-toast-center {\n    min-width: 20vw;\n    transform: translate(-50%, -50%);\n}\n\n.p-toast-icon-close {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    overflow: hidden;\n    position: relative;\n}\n\n.p-toast-icon-close.p-link {\n    cursor: pointer;\n}\n\n/* Animations */\n.p-toast-message-enter-from {\n    opacity: 0;\n    -webkit-transform: translateY(50%);\n    -ms-transform: translateY(50%);\n    transform: translateY(50%);\n}\n\n.p-toast-message-leave-from {\n    max-height: 1000px;\n}\n\n.p-toast .p-toast-message.p-toast-message-leave-to {\n    max-height: 0;\n    opacity: 0;\n    margin-bottom: 0;\n    overflow: hidden;\n}\n\n.p-toast-message-enter-active {\n    -webkit-transition: transform 0.3s, opacity 0.3s;\n    transition: transform 0.3s, opacity 0.3s;\n}\n\n.p-toast-message-leave-active {\n    -webkit-transition: max-height 0.45s cubic-bezier(0, 1, 0, 1), opacity 0.3s, margin-bottom 0.3s;\n    transition: max-height 0.45s cubic-bezier(0, 1, 0, 1), opacity 0.3s, margin-bottom 0.3s;\n}\n";

// Position
var inlineStyles = {
  root: function root(_ref) {
    var position = _ref.position;
    return {
      position: 'fixed',
      top: position === 'top-right' || position === 'top-left' || position === 'top-center' ? '20px' : position === 'center' ? '50%' : null,
      right: (position === 'top-right' || position === 'bottom-right') && '20px',
      bottom: (position === 'bottom-left' || position === 'bottom-right' || position === 'bottom-center') && '20px',
      left: position === 'top-left' || position === 'bottom-left' ? '20px' : position === 'center' || position === 'top-center' || position === 'bottom-center' ? '50%' : null
    };
  }
};
var classes = {
  root: function root(_ref2) {
    var props = _ref2.props,
      instance = _ref2.instance;
    return ['p-toast p-component p-toast-' + props.position, {
      'p-input-filled': instance.$primevue.config.inputStyle === 'filled',
      'p-ripple-disabled': instance.$primevue.config.ripple === false
    }];
  },
  container: function container(_ref3) {
    var props = _ref3.props;
    return ['p-toast-message', {
      'p-toast-message-info': props.message.severity === 'info' || props.message.severity === undefined,
      'p-toast-message-warn': props.message.severity === 'warn',
      'p-toast-message-error': props.message.severity === 'error',
      'p-toast-message-success': props.message.severity === 'success'
    }];
  },
  content: 'p-toast-message-content',
  icon: function icon(_ref4) {
    var _ref5;
    var props = _ref4.props;
    return ['p-toast-message-icon', (_ref5 = {}, _defineProperty$2(_ref5, props.infoIcon, props.message.severity === 'info'), _defineProperty$2(_ref5, props.warnIcon, props.message.severity === 'warn'), _defineProperty$2(_ref5, props.errorIcon, props.message.severity === 'error'), _defineProperty$2(_ref5, props.successIcon, props.message.severity === 'success'), _ref5)];
  },
  text: 'p-toast-message-text',
  summary: 'p-toast-summary',
  detail: 'p-toast-detail',
  closeButton: 'p-toast-icon-close p-link',
  closeIcon: 'p-toast-icon-close-icon'
};
var _useStyle = useStyle(styles, {
    name: 'toast',
    manual: true
  }),
  loadStyle = _useStyle.load;
var script$2 = {
  name: 'BaseToast',
  "extends": BaseComponent,
  props: {
    group: {
      type: String,
      "default": null
    },
    position: {
      type: String,
      "default": 'top-right'
    },
    autoZIndex: {
      type: Boolean,
      "default": true
    },
    baseZIndex: {
      type: Number,
      "default": 0
    },
    breakpoints: {
      type: Object,
      "default": null
    },
    closeIcon: {
      type: String,
      "default": undefined
    },
    infoIcon: {
      type: String,
      "default": undefined
    },
    warnIcon: {
      type: String,
      "default": undefined
    },
    errorIcon: {
      type: String,
      "default": undefined
    },
    successIcon: {
      type: String,
      "default": undefined
    },
    closeButtonProps: {
      type: null,
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

var script$1 = {
  name: 'ToastMessage',
  hostName: 'Toast',
  "extends": BaseComponent,
  emits: ['close'],
  closeTimeout: null,
  props: {
    message: {
      type: null,
      "default": null
    },
    templates: {
      type: Object,
      "default": null
    },
    closeIcon: {
      type: String,
      "default": null
    },
    infoIcon: {
      type: String,
      "default": null
    },
    warnIcon: {
      type: String,
      "default": null
    },
    errorIcon: {
      type: String,
      "default": null
    },
    successIcon: {
      type: String,
      "default": null
    },
    closeButtonProps: {
      type: null,
      "default": null
    }
  },
  mounted: function mounted() {
    var _this = this;
    if (this.message.life) {
      this.closeTimeout = setTimeout(function () {
        _this.close({
          message: _this.message,
          type: 'life-end'
        });
      }, this.message.life);
    }
  },
  beforeUnmount: function beforeUnmount() {
    this.clearCloseTimeout();
  },
  methods: {
    close: function close(params) {
      this.$emit('close', params);
    },
    onCloseClick: function onCloseClick() {
      this.clearCloseTimeout();
      this.close({
        message: this.message,
        type: 'close'
      });
    },
    clearCloseTimeout: function clearCloseTimeout() {
      if (this.closeTimeout) {
        clearTimeout(this.closeTimeout);
        this.closeTimeout = null;
      }
    }
  },
  computed: {
    iconComponent: function iconComponent() {
      return {
        info: !this.infoIcon && InfoCircleIcon,
        success: !this.successIcon && CheckIcon,
        warn: !this.warnIcon && ExclamationTriangleIcon,
        error: !this.errorIcon && TimesCircleIcon
      }[this.message.severity];
    },
    closeAriaLabel: function closeAriaLabel() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.close : undefined;
    }
  },
  components: {
    TimesIcon: TimesIcon,
    InfoCircleIcon: InfoCircleIcon,
    CheckIcon: CheckIcon,
    ExclamationTriangleIcon: ExclamationTriangleIcon,
    TimesCircleIcon: TimesCircleIcon
  },
  directives: {
    ripple: Ripple
  }
};

function _typeof$1(obj) { "@babel/helpers - typeof"; return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof$1(obj); }
function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty$1(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty$1(obj, key, value) { key = _toPropertyKey$1(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey$1(arg) { var key = _toPrimitive$1(arg, "string"); return _typeof$1(key) === "symbol" ? key : String(key); }
function _toPrimitive$1(input, hint) { if (_typeof$1(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof$1(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var _hoisted_1 = ["aria-label"];
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  var _directive_ripple = resolveDirective("ripple");
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx('container'),
    role: "alert",
    "aria-live": "assertive",
    "aria-atomic": "true"
  }, _ctx.ptm('container')), [createElementVNode("div", mergeProps({
    "class": [_ctx.cx('content'), $props.message.contentStyleClass]
  }, _ctx.ptm('content')), [!$props.templates.message ? (openBlock(), createElementBlock(Fragment, {
    key: 0
  }, [(openBlock(), createBlock(resolveDynamicComponent($props.templates.icon ? $props.templates.icon : $options.iconComponent && $options.iconComponent.name ? $options.iconComponent : 'span'), mergeProps({
    "class": _ctx.cx('icon')
  }, _ctx.ptm('icon')), null, 16, ["class"])), createElementVNode("div", mergeProps({
    "class": _ctx.cx('text')
  }, _ctx.ptm('text')), [createElementVNode("span", mergeProps({
    "class": _ctx.cx('summary')
  }, _ctx.ptm('summary')), toDisplayString($props.message.summary), 17), createElementVNode("div", mergeProps({
    "class": _ctx.cx('detail')
  }, _ctx.ptm('detail')), toDisplayString($props.message.detail), 17)], 16)], 64)) : (openBlock(), createBlock(resolveDynamicComponent($props.templates.message), {
    key: 1,
    message: $props.message
  }, null, 8, ["message"])), $props.message.closable !== false ? (openBlock(), createElementBlock("div", normalizeProps(mergeProps({
    key: 2
  }, _ctx.ptm('buttonContainer'))), [withDirectives((openBlock(), createElementBlock("button", mergeProps({
    "class": _ctx.cx('closeButton'),
    type: "button",
    "aria-label": $options.closeAriaLabel,
    onClick: _cache[0] || (_cache[0] = function () {
      return $options.onCloseClick && $options.onCloseClick.apply($options, arguments);
    }),
    autofocus: ""
  }, _objectSpread$1(_objectSpread$1(_objectSpread$1({}, $props.closeButtonProps), _ctx.ptm('button')), _ctx.ptm('closeButton'))), [(openBlock(), createBlock(resolveDynamicComponent($props.templates.closeicon || 'TimesIcon'), mergeProps({
    "class": [_ctx.cx('closeIcon'), $props.closeIcon]
  }, _objectSpread$1(_objectSpread$1({}, _ctx.ptm('buttonIcon')), _ctx.ptm('closeIcon'))), null, 16, ["class"]))], 16, _hoisted_1)), [[_directive_ripple]])], 16)) : createCommentVNode("", true)], 16)], 16);
}

script$1.render = render$1;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var messageIdx = 0;
var script = {
  name: 'Toast',
  "extends": script$2,
  inheritAttrs: false,
  emits: ['close', 'life-end'],
  data: function data() {
    return {
      messages: []
    };
  },
  styleElement: null,
  mounted: function mounted() {
    ToastEventBus.on('add', this.onAdd);
    ToastEventBus.on('remove-group', this.onRemoveGroup);
    ToastEventBus.on('remove-all-groups', this.onRemoveAllGroups);
    if (this.breakpoints) {
      this.createStyle();
    }
  },
  beforeUnmount: function beforeUnmount() {
    this.destroyStyle();
    if (this.$refs.container && this.autoZIndex) {
      ZIndexUtils.clear(this.$refs.container);
    }
    ToastEventBus.off('add', this.onAdd);
    ToastEventBus.off('remove-group', this.onRemoveGroup);
    ToastEventBus.off('remove-all-groups', this.onRemoveAllGroups);
  },
  methods: {
    add: function add(message) {
      if (message.id == null) {
        message.id = messageIdx++;
      }
      this.messages = [].concat(_toConsumableArray(this.messages), [message]);
    },
    remove: function remove(params) {
      var index = -1;
      for (var i = 0; i < this.messages.length; i++) {
        if (this.messages[i] === params.message) {
          index = i;
          break;
        }
      }
      this.messages.splice(index, 1);
      this.$emit(params.type, {
        message: params.message
      });
    },
    onAdd: function onAdd(message) {
      if (this.group == message.group) {
        this.add(message);
      }
    },
    onRemoveGroup: function onRemoveGroup(group) {
      if (this.group === group) {
        this.messages = [];
      }
    },
    onRemoveAllGroups: function onRemoveAllGroups() {
      this.messages = [];
    },
    onEnter: function onEnter() {
      this.$refs.container.setAttribute(this.attributeSelector, '');
      if (this.autoZIndex) {
        ZIndexUtils.set('modal', this.$refs.container, this.baseZIndex || this.$primevue.config.zIndex.modal);
      }
    },
    onLeave: function onLeave() {
      var _this = this;
      if (this.$refs.container && this.autoZIndex && ObjectUtils.isEmpty(this.messages)) {
        setTimeout(function () {
          ZIndexUtils.clear(_this.$refs.container);
        }, 200);
      }
    },
    createStyle: function createStyle() {
      if (!this.styleElement && !this.isUnstyled) {
        this.styleElement = document.createElement('style');
        this.styleElement.type = 'text/css';
        document.head.appendChild(this.styleElement);
        var innerHTML = '';
        for (var breakpoint in this.breakpoints) {
          var breakpointStyle = '';
          for (var styleProp in this.breakpoints[breakpoint]) {
            breakpointStyle += styleProp + ':' + this.breakpoints[breakpoint][styleProp] + '!important;';
          }
          innerHTML += "\n                        @media screen and (max-width: ".concat(breakpoint, ") {\n                            .p-toast[").concat(this.attributeSelector, "] {\n                                ").concat(breakpointStyle, "\n                            }\n                        }\n                    ");
        }
        this.styleElement.innerHTML = innerHTML;
      }
    },
    destroyStyle: function destroyStyle() {
      if (this.styleElement) {
        document.head.removeChild(this.styleElement);
        this.styleElement = null;
      }
    }
  },
  computed: {
    attributeSelector: function attributeSelector() {
      return UniqueComponentId();
    }
  },
  components: {
    ToastMessage: script$1,
    Portal: Portal
  }
};

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_ToastMessage = resolveComponent("ToastMessage");
  var _component_Portal = resolveComponent("Portal");
  return openBlock(), createBlock(_component_Portal, null, {
    "default": withCtx(function () {
      return [createElementVNode("div", mergeProps({
        ref: "container",
        "class": _ctx.cx('root'),
        style: _ctx.sx('root', true, {
          position: _ctx.position
        })
      }, _objectSpread(_objectSpread({}, _ctx.$attrs), _ctx.ptm('root'))), [createVNode(TransitionGroup, mergeProps({
        name: "p-toast-message",
        tag: "div",
        onEnter: $options.onEnter,
        onLeave: $options.onLeave
      }, _ctx.ptm('message')), {
        "default": withCtx(function () {
          return [(openBlock(true), createElementBlock(Fragment, null, renderList($data.messages, function (msg) {
            return openBlock(), createBlock(_component_ToastMessage, {
              key: msg.id,
              message: msg,
              templates: _ctx.$slots,
              closeIcon: _ctx.closeIcon,
              infoIcon: _ctx.infoIcon,
              warnIcon: _ctx.warnIcon,
              errorIcon: _ctx.errorIcon,
              successIcon: _ctx.successIcon,
              closeButtonProps: _ctx.closeButtonProps,
              onClose: _cache[0] || (_cache[0] = function ($event) {
                return $options.remove($event);
              }),
              pt: _ctx.pt
            }, null, 8, ["message", "templates", "closeIcon", "infoIcon", "warnIcon", "errorIcon", "successIcon", "closeButtonProps", "pt"]);
          }), 128))];
        }),
        _: 1
      }, 16, ["onEnter", "onLeave"])], 16)];
    }),
    _: 1
  });
}

script.render = render;

export { script as default };
