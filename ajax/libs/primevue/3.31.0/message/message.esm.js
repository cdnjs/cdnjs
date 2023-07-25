import CheckIcon from 'primevue/icons/check';
import ExclamationTriangleIcon from 'primevue/icons/exclamationtriangle';
import InfoCircleIcon from 'primevue/icons/infocircle';
import TimesIcon from 'primevue/icons/times';
import TimesCircleIcon from 'primevue/icons/timescircle';
import Ripple from 'primevue/ripple';
import BaseComponent from 'primevue/basecomponent';
import { useStyle } from 'primevue/usestyle';
import { resolveComponent, resolveDirective, openBlock, createBlock, Transition, withCtx, withDirectives, createElementVNode, mergeProps, renderSlot, resolveDynamicComponent, createElementBlock, createCommentVNode, vShow } from 'vue';

var styles = "\n.p-message-wrapper {\n    display: flex;\n    align-items: center;\n}\n\n.p-message-close {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}\n\n.p-message-close.p-link {\n    margin-left: auto;\n    overflow: hidden;\n    position: relative;\n}\n\n.p-message-enter-from {\n    opacity: 0;\n}\n\n.p-message-enter-active {\n    transition: opacity 0.3s;\n}\n\n.p-message.p-message-leave-from {\n    max-height: 1000px;\n}\n\n.p-message.p-message-leave-to {\n    max-height: 0;\n    opacity: 0;\n    margin: 0 !important;\n}\n\n.p-message-leave-active {\n    overflow: hidden;\n    transition: max-height 0.3s cubic-bezier(0, 1, 0, 1), opacity 0.3s, margin 0.15s;\n}\n\n.p-message-leave-active .p-message-close {\n    display: none;\n}\n";
var classes = {
  root: function root(_ref) {
    var props = _ref.props;
    return 'p-message p-component p-message-' + props.severity;
  },
  wrapper: 'p-message-wrapper',
  icon: 'p-message-icon',
  text: 'p-message-text',
  closeButton: 'p-message-close p-link',
  closeIcon: 'p-message-close-icon'
};
var _useStyle = useStyle(styles, {
    name: 'message',
    manual: true
  }),
  loadStyle = _useStyle.load;
var script$1 = {
  name: 'BaseMessage',
  "extends": BaseComponent,
  props: {
    severity: {
      type: String,
      "default": 'info'
    },
    closable: {
      type: Boolean,
      "default": true
    },
    sticky: {
      type: Boolean,
      "default": true
    },
    life: {
      type: Number,
      "default": 3000
    },
    icon: {
      type: String,
      "default": undefined
    },
    closeIcon: {
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
    loadStyle: loadStyle
  },
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};

var script = {
  name: 'Message',
  "extends": script$1,
  emits: ['close'],
  timeout: null,
  data: function data() {
    return {
      visible: true
    };
  },
  mounted: function mounted() {
    if (!this.sticky) {
      this.closeAfterDelay();
    }
  },
  methods: {
    close: function close(event) {
      this.visible = false;
      this.$emit('close', event);
    },
    closeAfterDelay: function closeAfterDelay() {
      var _this = this;
      setTimeout(function () {
        _this.visible = false;
      }, this.life);
    }
  },
  computed: {
    iconComponent: function iconComponent() {
      return {
        info: InfoCircleIcon,
        success: CheckIcon,
        warn: ExclamationTriangleIcon,
        error: TimesCircleIcon
      }[this.severity];
    },
    closeAriaLabel: function closeAriaLabel() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.close : undefined;
    }
  },
  directives: {
    ripple: Ripple
  },
  components: {
    TimesIcon: TimesIcon,
    InfoCircleIcon: InfoCircleIcon,
    CheckIcon: CheckIcon,
    ExclamationTriangleIcon: ExclamationTriangleIcon,
    TimesCircleIcon: TimesCircleIcon
  }
};

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var _hoisted_1 = ["aria-label"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_TimesIcon = resolveComponent("TimesIcon");
  var _directive_ripple = resolveDirective("ripple");
  return openBlock(), createBlock(Transition, {
    name: "p-message",
    appear: ""
  }, {
    "default": withCtx(function () {
      return [withDirectives(createElementVNode("div", mergeProps({
        "class": _ctx.cx('root'),
        role: "alert",
        "aria-live": "assertive",
        "aria-atomic": "true"
      }, _ctx.ptm('root'), {
        "data-pc-name": "message"
      }), [createElementVNode("div", mergeProps({
        "class": _ctx.cx('wrapper')
      }, _ctx.ptm('wrapper')), [renderSlot(_ctx.$slots, "messageicon", {
        "class": "p-message-icon"
      }, function () {
        return [(openBlock(), createBlock(resolveDynamicComponent(_ctx.icon ? 'span' : $options.iconComponent), mergeProps({
          "class": [_ctx.cx('icon'), _ctx.icon]
        }, _ctx.ptm('icon')), null, 16, ["class"]))];
      }), createElementVNode("div", mergeProps({
        "class": ["p-message-text", _ctx.cx('text')]
      }, _ctx.ptm('text')), [renderSlot(_ctx.$slots, "default")], 16), _ctx.closable ? withDirectives((openBlock(), createElementBlock("button", mergeProps({
        key: 0,
        "class": _ctx.cx('closeButton'),
        "aria-label": $options.closeAriaLabel,
        type: "button",
        onClick: _cache[0] || (_cache[0] = function ($event) {
          return $options.close($event);
        })
      }, _objectSpread(_objectSpread(_objectSpread({}, _ctx.closeButtonProps), _ctx.ptm('button')), _ctx.ptm('closeButton'))), [renderSlot(_ctx.$slots, "closeicon", {}, function () {
        return [_ctx.closeIcon ? (openBlock(), createElementBlock("i", mergeProps({
          key: 0,
          "class": [_ctx.cx('closeIcon'), _ctx.closeIcon]
        }, _objectSpread(_objectSpread({}, _ctx.ptm('buttonIcon')), _ctx.ptm('closeIcon'))), null, 16)) : (openBlock(), createBlock(_component_TimesIcon, mergeProps({
          key: 1,
          "class": [_ctx.cx('closeIcon'), _ctx.closeIcon]
        }, _objectSpread(_objectSpread({}, _ctx.ptm('buttonIcon')), _ctx.ptm('closeIcon'))), null, 16, ["class"]))];
      })], 16, _hoisted_1)), [[_directive_ripple]]) : createCommentVNode("", true)], 16)], 16), [[vShow, $data.visible]])];
    }),
    _: 3
  });
}

script.render = render;

export { script as default };
